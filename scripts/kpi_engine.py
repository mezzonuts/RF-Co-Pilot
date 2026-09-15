#!/usr/bin/env python3
"""
RF-Co-Pilot Adaptive KPI Engine
================================
Auto-detects CSV column patterns, maps to known RF/telecom KPIs,
and performs flexible aggregation without hardcoded column names.

Usage:
  python scripts/kpi_engine.py <csv_file> [--knowledge scripts/kpi_knowledge.json]
  python scripts/kpi_engine.py <csv_dir> --all
"""
import argparse, json, os, sys, re
import pandas as pd
import numpy as np
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
KNOWLEDGE_PATH = SCRIPT_DIR / 'kpi_knowledge.json'

def load_knowledge(path=None):
    p = path or KNOWLEDGE_PATH
    with open(p, 'r', encoding='utf-8') as f:
        return json.load(f)

def normalize_col(name):
    """Normalize column name for fuzzy matching."""
    s = str(name).lower().strip()
    s = re.sub(r'[^a-z0-9]+', '_', s)
    s = s.strip('_')
    return s

def fuzzy_match_col(col_name, aliases, threshold=0.6):
    """Match a column name against a list of aliases using multiple strategies."""
    norm = normalize_col(col_name)
    # Exact match
    if norm in aliases:
        return 1.0
    # Substring match
    for alias in aliases:
        if alias in norm or norm in alias:
            return 0.9
    # Token overlap
    col_tokens = set(norm.split('_'))
    best = 0
    for alias in aliases:
        alias_tokens = set(alias.split('_'))
        if not alias_tokens:
            continue
        overlap = col_tokens & alias_tokens
        score = len(overlap) / max(len(col_tokens), len(alias_tokens))
        best = max(best, score)
    return best

# Columns to skip (row numbers, empty, etc.)
SKIP_COLUMNS = {'no', 'index', 'idx', 'row', 'rownum', 'num', 'id', '_'}

def detect_columns(df, knowledge):
    """Auto-detect column mappings using KPI knowledge base."""
    mappings = {}
    column_patterns = knowledge.get('column_patterns', {})
    used_patterns = set()
    
    for col in df.columns:
        # Skip row number / index columns
        norm_check = normalize_col(col)
        if norm_check in SKIP_COLUMNS or norm_check.startswith('_'):
            continue
        # Skip columns with all zeros or all same values
        if df[col].nunique() <= 1:
            continue
        norm = normalize_col(col)
        best_match = None
        best_score = 0
        
        for pattern_name, pattern_info in column_patterns.items():
            if pattern_name in used_patterns:
                continue
            aliases = pattern_info.get('aliases', [])
            score = fuzzy_match_col(norm, aliases)
            if score > best_score and score >= 0.7:
                best_score = score
                best_match = pattern_name
        
        if best_match:
            mappings[col] = {
                'pattern': best_match,
                'score': best_score,
                'type': column_patterns[best_match]['type'],
                'kpi_group': column_patterns[best_match]['kpi_group'],
                'unit': column_patterns[best_match].get('unit', ''),
                'description': column_patterns[best_match].get('description', ''),
                'stats': column_patterns[best_match].get('stats', []),
                'quality_thresholds': column_patterns[best_match].get('quality_thresholds', {}),
                'quality_labels': column_patterns[best_match].get('quality_labels', {}),
            }
            used_patterns.add(best_match)
    
    return mappings

def detect_test_type(df, knowledge):
    """Detect the test type based on column patterns."""
    col_names = [normalize_col(c) for c in df.columns]
    test_types = knowledge.get('test_type_keywords', {})
    scores = {}
    
    for test_type, keywords in test_types.items():
        score = 0
        for kw in keywords:
            for cn in col_names:
                if kw in cn or cn in kw:
                    score += 1
                    break
        scores[test_type] = score
    
    if not scores:
        return 'generic'
    best = max(scores, key=scores.get)
    return best if scores[best] >= 2 else 'generic'

def detect_operator(col_series, knowledge):
    """Classify operator from column values using MNC or name patterns."""
    op_patterns = knowledge.get('operator_name_patterns', {})
    mnc_map = knowledge.get('operator_mnc', {})
    
    def classify(val):
        s = str(val).strip()
        # Check MNC
        if s in mnc_map:
            return mnc_map[s]['name']
        s_lower = s.lower()
        for op_name, patterns in op_patterns.items():
            for p in patterns:
                if p in s_lower:
                    return op_name.capitalize()
        return s if s else 'Unknown'
    
    return col_series.apply(classify)

def compute_quality_label(value, thresholds, labels=None):
    """Classify a value into quality tier."""
    if not thresholds:
        return ''
    ex = thresholds.get('excellent')
    good = thresholds.get('good')
    fair = thresholds.get('fair')
    poor = thresholds.get('poor')
    
    if labels:
        if ex is not None and value >= ex:
            return labels.get('excellent', 'excellent')
        if good is not None and value >= good:
            return labels.get('good', 'good')
        if fair is not None and value >= fair:
            return labels.get('fair', 'fair')
        return labels.get('poor', 'poor')
    
    # Default for signal (higher is better, negative dBm)
    if 'rsrp' in str(thresholds):
        return 'good' if value >= -90 else 'fair' if value >= -100 else 'poor'
    return 'good'

def compute_numeric_stats(series, stats_list):
    """Compute requested statistics for a numeric series."""
    s = pd.to_numeric(series, errors='coerce').dropna()
    if len(s) == 0:
        return {}
    
    results = {}
    for stat in stats_list:
        if stat == 'avg':
            results['avg'] = round(float(s.mean()), 2)
        elif stat == 'median':
            results['median'] = round(float(s.median()), 2)
        elif stat == 'min':
            results['min'] = round(float(s.min()), 2)
        elif stat == 'max':
            results['max'] = round(float(s.max()), 2)
        elif stat == 'std':
            results['std'] = round(float(s.std()), 2)
        elif stat == 'sum':
            results['sum'] = round(float(s.sum()), 2)
        elif stat == 'count':
            results['count'] = int(len(s))
        elif stat == 'p5':
            results['p5'] = round(float(s.quantile(0.05)), 2)
        elif stat == 'p50':
            results['p50'] = round(float(s.quantile(0.50)), 2)
        elif stat == 'p95':
            results['p95'] = round(float(s.quantile(0.95)), 2)
        elif stat == 'p99':
            results['p99'] = round(float(s.quantile(0.99)), 2)
    return results

def compute_categorical_stats(series, stats_list):
    """Compute requested statistics for a categorical series."""
    results = {}
    for stat in stats_list:
        if stat == 'unique_count':
            results['unique_count'] = int(series.nunique())
        elif stat == 'top_values':
            vc = series.value_counts().head(5)
            results['top_values'] = {str(k): int(v) for k, v in vc.items()}
        elif stat == 'value_counts':
            vc = series.value_counts()
            results['value_counts'] = {str(k): int(v) for k, v in vc.items()}
    return results

def analyze_csv(csv_path, knowledge=None):
    """Main analysis: detect columns, map KPIs, compute stats."""
    if knowledge is None:
        knowledge = load_knowledge()
    
    df = pd.read_csv(csv_path, low_memory=False, dtype=str)
    
    # Detect test type
    test_type = detect_test_type(df, knowledge)
    
    # Detect column mappings
    col_mappings = detect_columns(df, knowledge)
    
    # Detect operator column
    op_col = None
    group_col = None
    for orig_col, mapping in col_mappings.items():
        if mapping['pattern'] == 'operator':
            op_col = orig_col
        if mapping['pattern'] == 'group':
            group_col = orig_col
    
    operator_map = None
    if op_col:
        operator_map = detect_operator(df[op_col], knowledge)
    
    # Compute stats per detected column
    all_stats = {}
    for orig_col, mapping in col_mappings.items():
        col_type = mapping['type']
        stats_list = mapping['stats']
        
        if col_type == 'numeric':
            numeric_vals = pd.to_numeric(df[orig_col], errors='coerce')
            all_stats[orig_col] = {
                'pattern': mapping['pattern'],
                'description': mapping['description'],
                'unit': mapping['unit'],
                'kpi_group': mapping['kpi_group'],
                'overall': compute_numeric_stats(df[orig_col], stats_list),
                'quality_thresholds': mapping.get('quality_thresholds', {}),
                'quality_labels': mapping.get('quality_labels', {}),
            }
            # Quality distribution
            thresholds = mapping.get('quality_thresholds', {})
            if thresholds and numeric_vals.notna().sum() > 0:
                quality_dist = {}
                for val in numeric_vals.dropna():
                    label = 'fair'  # default
                    thresholds_list = [
                        ('excellent', thresholds.get('excellent')),
                        ('good', thresholds.get('good')),
                        ('fair', thresholds.get('fair')),
                        ('poor', thresholds.get('poor')),
                    ]
                    # Check thresholds
                    ex_v = thresholds.get('excellent')
                    good_v = thresholds.get('good')
                    fair_v = thresholds.get('fair')
                    if ex_v is not None and good_v is not None:
                        if val >= ex_v: label = 'excellent'
                        elif val >= good_v: label = 'good'
                        elif fair_v is not None and val >= fair_v: label = 'fair'
                        else: label = 'poor'
                    quality_dist[label] = quality_dist.get(label, 0) + 1
                total = sum(quality_dist.values())
                all_stats[orig_col]['quality_distribution'] = {
                    k: {'count': v, 'pct': round(v/total*100, 1)} 
                    for k, v in sorted(quality_dist.items(), key=lambda x: x[1], reverse=True)
                }
        
        elif col_type == 'categorical':
            all_stats[orig_col] = {
                'pattern': mapping['pattern'],
                'description': mapping['description'],
                'kpi_group': mapping['kpi_group'],
                'overall': compute_categorical_stats(df[orig_col], stats_list),
            }
        
        elif col_type == 'identifier':
            all_stats[orig_col] = {
                'pattern': mapping['pattern'],
                'description': mapping['description'],
                'kpi_group': mapping['kpi_group'],
                'overall': compute_categorical_stats(df[orig_col], stats_list),
            }
    
    # Compute per-operator breakdown if operator detected
    per_operator = {}
    if operator_map is not None and op_col:
        df['_op_class'] = operator_map
        for op in sorted(df['_op_class'].unique()):
            if op == 'Unknown' or not op:
                continue
            op_df = df[df['_op_class'] == op]
            op_stats = {}
            for orig_col, mapping in col_mappings.items():
                if orig_col == op_col:
                    continue
                if mapping['type'] == 'numeric':
                    op_stats[orig_col] = compute_numeric_stats(op_df[orig_col], mapping['stats'])
            per_operator[op] = {
                'sample_count': len(op_df),
                'metrics': op_stats,
            }
    
    return {
        'file': os.path.basename(csv_path),
        'total_rows': len(df),
        'columns_total': len(df.columns),
        'columns_detected': len(col_mappings),
        'test_type': test_type,
        'column_mappings': {k: v['pattern'] for k, v in col_mappings.items()},
        'column_details': col_mappings,
        'stats': all_stats,
        'per_operator': per_operator,
    }

def format_report(result):
    """Format analysis result as clean text report."""
    lines = []
    lines.append(f"Analisis: {result['file']}")
    lines.append(f"Total baris: {result['total_rows']} | Kolom terdeteksi: {result['columns_detected']}/{result['columns_total']}")
    lines.append(f"Tipe test: {result['test_type']}")
    lines.append("")
    
    # Column mapping
    lines.append("KOLOM TERDETEKSI")
    for col, pattern in result['column_mappings'].items():
        detail = result['column_details'][col]
        desc = detail.get('description', pattern)
        unit = detail.get('unit', '')
        lines.append(f"  {col} -> {desc} ({unit}) [score: {detail.get('score', 0):.1f}]")
    lines.append("")
    
    # Stats per metric
    lines.append("STATISTIK PER METRIK")
    for col, stats in result['stats'].items():
        desc = stats.get('description', col)
        unit = stats.get('unit', '')
        overall = stats.get('overall', {})
        lines.append(f"\n  {desc} ({unit}):")
        for k, v in overall.items():
            lines.append(f"    {k}: {v}")
        
        # Quality distribution
        qd = stats.get('quality_distribution', {})
        if qd:
            lines.append(f"    Quality breakdown:")
            for label, info in qd.items():
                lines.append(f"      {label}: {info['count']} ({info['pct']}%)")
    
    # Per operator
    if result['per_operator']:
        lines.append(f"\nPER OPERATOR ({len(result['per_operator'])} detected)")
        for op, op_data in result['per_operator'].items():
            lines.append(f"\n  {op} ({op_data['sample_count']} samples):")
            for metric, mstats in op_data['metrics'].items():
                avg_val = mstats.get('avg', mstats.get('unique_count', ''))
                med_val = mstats.get('median', '')
                mn = mstats.get('min', '')
                mx = mstats.get('max', '')
                parts = []
                if avg_val != '': parts.append(f"avg={avg_val}")
                if med_val != '': parts.append(f"med={med_val}")
                if mn != '' and mx != '': parts.append(f"range=[{mn}, {mx}]")
                if parts:
                    lines.append(f"    {metric}: {', '.join(parts)}")
    
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='RF-Co-Pilot Adaptive KPI Engine')
    parser.add_argument('input', help='CSV file or directory of CSVs')
    parser.add_argument('--all', action='store_true', help='Process all CSVs in directory')
    parser.add_argument('--knowledge', default=None, help='Path to kpi_knowledge.json')
    parser.add_argument('--output', '-o', default=None, help='Output report file (default: stdout)')
    parser.add_argument('--json', action='store_true', help='Output raw JSON instead of text')
    args = parser.parse_args()
    
    knowledge = load_knowledge(args.knowledge)
    
    files = []
    if os.path.isdir(args.input):
        for f in sorted(os.listdir(args.input)):
            if f.endswith('.csv'):
                files.append(os.path.join(args.input, f))
    else:
        files.append(args.input)
    
    all_results = []
    reports = []
    
    for csv_file in files:
        print(f"[kpi_engine] Analyzing {csv_file}...", file=sys.stderr)
        result = analyze_csv(csv_file, knowledge)
        all_results.append(result)
        reports.append(format_report(result))
    
    if args.json:
        output = json.dumps(all_results, indent=2, ensure_ascii=False)
    else:
        output = '\n\n' + '='*60 + '\n\n'.join(reports)
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"[kpi_engine] Report saved to {args.output}", file=sys.stderr)
    else:
        print(output)

if __name__ == '__main__':
    main()
