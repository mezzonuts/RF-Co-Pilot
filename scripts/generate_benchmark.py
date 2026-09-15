#!/usr/bin/env python3
"""
RF-Co-Pilot Benchmark Report Generator
=======================================
Reads 3 CSV files (webtest, videotest, speedtest) and generates
a comprehensive benchmark Excel report matching the CET BOX format.

Usage:
  python scripts/generate_benchmark.py tests/benchmark_data/
  python scripts/generate_benchmark.py tests/benchmark_data/ --output reports/benchmark.xlsx
"""

import argparse
import os
import sys
from datetime import datetime

import pandas as pd
import numpy as np

# ── Operator mapping (Indonesia MCC 510) ──
MNC_MAP = {
    '10': 'Telkomsel',
    '01': 'Indosat',
    '11': 'XL Smart',
    '28': 'Smartfren',
    '89': 'Hutchison',
    '00': 'Test',
}

RF_COLS = ['RSRP', 'RSRQ', 'SINR', 'LTESNR', 'SsRSRP', 'SsRSRQ', 'SsSINR',
           'Band', 'PCI', 'TAC', 'eNB ID', 'gNB ID', 'LAC', 'CID']


def classify_isp(row):
    """Classify ISP from MNC column or ISP column."""
    mnc = str(row.get('MNC', '')).strip().zfill(2)
    if mnc in MNC_MAP:
        return MNC_MAP[mnc]
    isp_raw = str(row.get('ISP', '')).lower()
    if 'telkomsel' in isp_raw:
        return 'Telkomsel'
    elif 'indosat' in isp_raw:
        return 'Indosat'
    elif 'xl' in isp_raw:
        return 'XL Smart'
    elif 'smartfren' in isp_raw:
        return 'Smartfren'
    elif 'hutchison' in isp_raw or 'three' in isp_raw:
        return 'Hutchison'
    return 'Other'


def load_csv(path, test_type):
    """Load and enrich a CSV with ISP classification."""
    df = pd.read_csv(path, low_memory=False, dtype=str)
    df['ISP_Class'] = df.apply(classify_isp, axis=1)
    df['TestType'] = test_type

    # Convert numeric columns
    num_cols = {
        'speedtest': ['DL', 'UL', 'PING', 'JITTER', 'Signal Strength'],
        'webtest': ['Throughput', 'Loading Time'],
        'videotest': ['Throughput', 'Up Throughput', 'Initial Buffering', 'Re Buffering', 'Duration'],
    }
    for col in num_cols.get(test_type, []):
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    # RF numeric
    for col in ['RSRP', 'RSRQ', 'SINR', 'LTESNR', 'SsRSRP', 'SsRSRQ', 'SsSINR', 'Band', 'PCI']:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    return df


def summarize_by_group_isp(df, value_col, test_type):
    """Aggregate metrics per Group × ISP."""
    groups = df.groupby(['Group', 'ISP_Class'])

    agg_dict = {value_col: ['mean', 'min', 'max', 'median', 'count']}

    # Add RF stats if available
    for rf in ['RSRP', 'SINR', 'SsRSRP', 'SsSINR']:
        if rf in df.columns:
            agg_dict[rf] = ['mean', 'min']

    # Extra columns per test type
    if test_type == 'speedtest':
        for extra in ['UL', 'PING', 'JITTER']:
            if extra in df.columns:
                agg_dict[extra] = ['mean', 'min', 'max']
    elif test_type == 'webtest':
        if 'Loading Time' in df.columns:
            agg_dict['Loading Time'] = ['mean', 'min', 'max']
    elif test_type == 'videotest':
        for extra in ['Up Throughput', 'Initial Buffering', 'Re Buffering']:
            if extra in df.columns:
                agg_dict[extra] = ['mean', 'min', 'max']

    summary = groups.agg(agg_dict)
    summary.columns = ['_'.join(col).strip('_') for col in summary.columns]
    summary = summary.reset_index()
    return summary


def find_rf_issues(df):
    """Detect POI locations with RF problems."""
    issues = []

    # Low RSRP
    if 'RSRP' in df.columns:
        low_rsrp = df[df['RSRP'] < -110].groupby(['Group', 'ISP_Class']).agg(
            count=('RSRP', 'count'),
            avg_rsrp=('RSRP', 'mean'),
            min_rsrp=('RSRP', 'min'),
        ).reset_index()
        low_rsrp['Issue'] = 'Low RSRP (< -110 dBm)'
        issues.append(low_rsrp)

    # Low SINR
    if 'SINR' in df.columns:
        low_sinr = df[df['SINR'] < 0].groupby(['Group', 'ISP_Class']).agg(
            count=('SINR', 'count'),
            avg_sinr=('SINR', 'mean'),
            min_sinr=('SINR', 'min'),
        ).reset_index()
        low_sinr['Issue'] = 'Low SINR (< 0 dB)'
        issues.append(low_sinr)

    # SsSINR (5G)
    if 'SsSINR' in df.columns:
        low_ss = df[df['SsSINR'] < 0].groupby(['Group', 'ISP_Class']).agg(
            count=('SsSINR', 'count'),
            avg_ss=('SsSINR', 'mean'),
            min_ss=('SsSINR', 'min'),
        ).reset_index()
        low_ss['Issue'] = 'Low SsSINR (< 0 dB) 5G'
        issues.append(low_ss)

    if issues:
        return pd.concat(issues, ignore_index=True)
    return pd.DataFrame(columns=['Group', 'ISP_Class', 'count', 'Issue'])


def build_summary_per_poi(speed_df, web_df, video_df):
    """Build Summary Per POI table matching Excel format."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']
    rows = []

    # Get all unique groups
    all_groups = set()
    for df in [speed_df, web_df, video_df]:
        all_groups.update(df['Group'].dropna().unique())

    for group in sorted([g for g in all_groups if isinstance(g, str)]):
        row = {'Group': group}

        for isp in isps:
            prefix = isp.replace(' ', '_')

            # Speedtest
            sdf = speed_df[(speed_df['Group'] == group) & (speed_df['ISP_Class'] == isp)]
            row[f'Speed_DL_Avg_{prefix}'] = sdf['DL'].mean() if len(sdf) > 0 else None
            row[f'Speed_DL_Min_{prefix}'] = sdf['DL'].min() if len(sdf) > 0 else None
            row[f'Speed_DL_Max_{prefix}'] = sdf['DL'].max() if len(sdf) > 0 else None
            row[f'Speed_UL_Avg_{prefix}'] = sdf['UL'].mean() if len(sdf) > 0 else None
            row[f'Speed_Ping_Avg_{prefix}'] = sdf['PING'].mean() if len(sdf) > 0 else None
            row[f'Speed_Attempt_{prefix}'] = len(sdf)

            # Webtest
            wdf = web_df[(web_df['Group'] == group) & (web_df['ISP_Class'] == isp)]
            row[f'Web_Throughput_Avg_{prefix}'] = wdf['Throughput'].mean() if len(wdf) > 0 else None
            row[f'Web_Loading_Avg_{prefix}'] = wdf['Loading Time'].mean() if len(wdf) > 0 else None
            row[f'Web_Attempt_{prefix}'] = len(wdf)

            # Videotest
            vdf = video_df[(video_df['Group'] == group) & (video_df['ISP_Class'] == isp)]
            row[f'Video_Throughput_Avg_{prefix}'] = vdf['Throughput'].mean() if len(vdf) > 0 else None
            row[f'Video_Buffering_Avg_{prefix}'] = vdf['Initial Buffering'].mean() if len(vdf) > 0 else None
            row[f'Video_Attempt_{prefix}'] = len(vdf)

        rows.append(row)

    return pd.DataFrame(rows)


def build_overall_summary(speed_df, web_df, video_df):
    """Build Overall Summary row."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']
    rows = []

    for isp in isps:
        sdf = speed_df[speed_df['ISP_Class'] == isp]
        wdf = web_df[web_df['ISP_Class'] == isp]
        vdf = video_df[video_df['ISP_Class'] == isp]

        rows.append({
            'ISP': isp,
            'Speedtest_DL_Avg': sdf['DL'].mean() if len(sdf) > 0 else None,
            'Speedtest_DL_Min': sdf['DL'].min() if len(sdf) > 0 else None,
            'Speedtest_DL_Max': sdf['DL'].max() if len(sdf) > 0 else None,
            'Speedtest_UL_Avg': sdf['UL'].mean() if len(sdf) > 0 else None,
            'Speedtest_Ping_Avg': sdf['PING'].mean() if len(sdf) > 0 else None,
            'Speedtest_Attempt': len(sdf),
            'Webtest_Throughput_Avg': wdf['Throughput'].mean() if len(wdf) > 0 else None,
            'Webtest_Loading_Avg': wdf['Loading Time'].mean() if len(wdf) > 0 else None,
            'Webtest_Attempt': len(wdf),
            'Videotest_Throughput_Avg': vdf['Throughput'].mean() if len(vdf) > 0 else None,
            'Videotest_Buffering_Avg': vdf['Initial Buffering'].mean() if len(vdf) > 0 else None,
            'Videotest_Attempt': len(vdf),
        })

    return pd.DataFrame(rows)


def build_ranking(speed_df, web_df, video_df):
    """Rank ISPs per POI group."""
    isps = ['Telkomsel', 'Indosat', 'XL Smart']
    rows = []

    all_groups = set()
    for df in [speed_df, web_df, video_df]:
        all_groups.update(df['Group'].dropna().unique())

    for group in sorted([g for g in all_groups if isinstance(g, str)]):
        for isp in isps:
            sdf = speed_df[(speed_df['Group'] == group) & (speed_df['ISP_Class'] == isp)]
            wdf = web_df[(web_df['Group'] == group) & (web_df['ISP_Class'] == isp)]
            vdf = video_df[(video_df['Group'] == group) & (video_df['ISP_Class'] == isp)]

            rows.append({
                'Group': group,
                'ISP': isp,
                'Speed_DL_Avg': sdf['DL'].mean() if len(sdf) > 0 else 0,
                'Speed_UL_Avg': sdf['UL'].mean() if len(sdf) > 0 else 0,
                'Web_Throughput_Avg': wdf['Throughput'].mean() if len(wdf) > 0 else 0,
                'Video_Throughput_Avg': vdf['Throughput'].mean() if len(vdf) > 0 else 0,
                'Speed_Attempt': len(sdf),
                'Web_Attempt': len(wdf),
                'Video_Attempt': len(vdf),
            })

    rdf = pd.DataFrame(rows)
    if len(rdf) > 0:
        # Rank per group
        for metric in ['Speed_DL_Avg', 'Speed_UL_Avg', 'Web_Throughput_Avg', 'Video_Throughput_Avg']:
            rdf[f'Rank_{metric}'] = rdf.groupby('Group')[metric].rank(ascending=False, method='min').astype(int)

    return rdf


def generate_report(data_dir, output_path):
    """Main: read CSVs → process → write Excel."""
    print(f"[benchmark] Reading CSVs from {data_dir}...")

    speed_df = load_csv(os.path.join(data_dir, 'speedtest.csv'), 'speedtest')
    web_df = load_csv(os.path.join(data_dir, 'webtest.csv'), 'webtest')
    video_df = load_csv(os.path.join(data_dir, 'videotest.csv'), 'videotest')

    print(f"  Speedtest: {len(speed_df)} rows, {speed_df['ISP_Class'].value_counts().to_dict()}")
    print(f"  Webtest:   {len(web_df)} rows, {web_df['ISP_Class'].value_counts().to_dict()}")
    print(f"  Videotest: {len(video_df)} rows, {video_df['ISP_Class'].value_counts().to_dict()}")

    # Build tables
    print("[benchmark] Building summary tables...")
    summary_poi = build_summary_per_poi(speed_df, web_df, video_df)
    overall = build_overall_summary(speed_df, web_df, video_df)
    ranking = build_ranking(speed_df, web_df, video_df)
    rf_issues = find_rf_issues(speed_df)

    # Per-ISP aggregation
    speed_agg = summarize_by_group_isp(speed_df, 'DL', 'speedtest')
    web_agg = summarize_by_group_isp(web_df, 'Throughput', 'webtest')
    video_agg = summarize_by_group_isp(video_df, 'Throughput', 'videotest')

    # Write Excel
    os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
    print(f"[benchmark] Writing Excel to {output_path}...")

    with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
        # Sheet 1: Summary Per POI
        summary_poi.to_excel(writer, sheet_name='Summary Per POI', index=False)

        # Sheet 2: Overall Summary
        overall.to_excel(writer, sheet_name='Overall Summary', index=False)

        # Sheet 3: Ranking per Group
        ranking.to_excel(writer, sheet_name='Ranking Per POI', index=False)

        # Sheet 4: Speedtest Detail
        speed_agg.to_excel(writer, sheet_name='Speedtest Agg', index=False)

        # Sheet 5: Webtest Detail
        web_agg.to_excel(writer, sheet_name='Webtest Agg', index=False)

        # Sheet 6: Videotest Detail
        video_agg.to_excel(writer, sheet_name='Videotest Agg', index=False)

        # Sheet 7: RF Issues
        rf_issues.to_excel(writer, sheet_name='RF Issues', index=False)

        # Sheet 8: Raw Speedtest
        speed_df.head(1000).to_excel(writer, sheet_name='Raw Speedtest (1K)', index=False)

        # Sheet 9: Raw Webtest
        web_df.head(1000).to_excel(writer, sheet_name='Raw Webtest (1K)', index=False)

        # Sheet 10: Raw Videotest
        video_df.head(1000).to_excel(writer, sheet_name='Raw Videotest (1K)', index=False)

    print(f"[benchmark] ✅ Report generated: {output_path}")
    print(f"  Sheets: 10")
    print(f"  Total rows processed: {len(speed_df) + len(web_df) + len(video_df)}")

    return output_path


def main():
    parser = argparse.ArgumentParser(description='RF-Co-Pilot Benchmark Report Generator')
    parser.add_argument('data_dir', help='Directory containing speedtest.csv, webtest.csv, videotest.csv')
    parser.add_argument('--output', '-o', default=None, help='Output Excel path (default: reports/benchmark_{date}.xlsx)')
    args = parser.parse_args()

    if not os.path.isdir(args.data_dir):
        print(f"Error: {args.data_dir} not found")
        sys.exit(1)

    date_str = datetime.now().strftime('%Y-%m-%d')
    output = args.output or f'reports/benchmark_{date_str}.xlsx'

    generate_report(args.data_dir, output)


if __name__ == '__main__':
    main()
