"""KPI Calculations — Drive Test KPI aggregation

Phase 1: Compute KPI metrics dari normalized DT DataFrame (Polars).

Functions:
- calc_avg_kpi(df) → average RSRP/RSRQ/SINR per cell
- calc_percentile_kpi(df, percentiles) → coverage quality assessment (p5, p25, p50, p75, p95)
- find_worst_spots(df, n, threshold) → top N worst locations
- calc_throughput_stats(df) → DL/UL throughput aggregation
"""

import polars as pl
from typing import Dict, List, Optional


def calc_avg_kpi(df: pl.DataFrame) -> Dict[str, Dict[str, float]]:
    """
    Calculate average KPI per cell.
    
    Args:
        df: Normalized DT DataFrame [timestamp, lat, lon, cell_id, band, rsrp, rsrq, sinr, ...]
    
    Returns:
        {
            "JKT_1023_2": {
                "rsrp_avg": -95.2,
                "rsrq_avg": -7.8,
                "sinr_avg": 8.5,
                "dl_tp_avg": 45.3,
                "ul_tp_avg": 12.5,
                "sample_count": 5,
                "bands": ["B3"]
            },
            ...
        }
    
    Example output:
        {
            "JKT_1023_2": {"rsrp_avg": -95.2, "sample_count": 5, ...},
            "JKT_1024_1": {"rsrp_avg": -115.0, "sample_count": 4, ...},
            "JKT_1025_3": {"rsrp_avg": -105.0, "sample_count": 5, ...}
        }
    """
    # Group by cell_id dan aggregate (Polars v1 uses group_by)
    kpi_agg = df.group_by("cell_id").agg([
        pl.col("rsrp").mean().alias("rsrp_avg"),
        pl.col("rsrq").mean().alias("rsrq_avg"),
        pl.col("sinr").mean().alias("sinr_avg"),
        pl.col("dl_throughput").mean().alias("dl_tp_avg"),
        pl.col("ul_throughput").mean().alias("ul_tp_avg"),
        pl.col("cell_id").count().alias("sample_count"),
        pl.col("band").unique().alias("bands"),
    ])
    
    # Convert to dict
    result = {}
    for row in kpi_agg.iter_rows(named=True):
        cell_id = row["cell_id"]
        result[cell_id] = {
            "rsrp_avg": round(row["rsrp_avg"], 2),
            "rsrq_avg": round(row["rsrq_avg"], 2),
            "sinr_avg": round(row["sinr_avg"], 2),
            "dl_tp_avg": round(row["dl_tp_avg"], 2),
            "ul_tp_avg": round(row["ul_tp_avg"], 2),
            "sample_count": row["sample_count"],
            "bands": row["bands"] if isinstance(row["bands"], list) else [row["bands"]],
        }
    
    return result


def calc_percentile_kpi(
    df: pl.DataFrame,
    percentiles: List[int] = [5, 25, 50, 75, 95]
) -> Dict[str, Dict[int, float]]:
    """
    Calculate percentile KPI for coverage quality assessment.
    
    Percentiles:
      - p5 (5th): worst 5% coverage
      - p25 (25th): poor coverage
      - p50 (50th): median
      - p75 (75th): good coverage
      - p95 (95th): best 5% coverage
    
    Used for predicting CQI, detecting interference.
    
    Args:
        df: Normalized DataFrame
        percentiles: List of percentiles to compute [5, 25, 50, 75, 95]
    
    Returns:
        {
            "rsrp": {5: -118, 25: -110, 50: -105, 75: -98, 95: -92},
            "rsrq": {5: -19, 25: -15, 50: -9, 75: -6, 95: -3},
            "sinr": {5: 1, 25: 3, 50: 6, 75: 8, 95: 10},
        }
    """
    result = {}
    
    for metric in ["rsrp", "rsrq", "sinr"]:
        if metric in df.columns:
            percentile_values = {}
            for p in percentiles:
                val = df.select(pl.col(metric).quantile(p / 100.0)).item()
                percentile_values[p] = round(val, 2) if val is not None else None
            result[metric] = percentile_values
    
    return result


def find_worst_spots(
    df: pl.DataFrame,
    n: int = 5,
    threshold_rsrp: int = -110
) -> List[Dict]:
    """
    Find N worst spots (lowest RSRP or highest interference).
    
    Args:
        df: Normalized DataFrame
        n: Number of worst spots to return
        threshold_rsrp: RSRP threshold (dBm) — spots below this are "bad"
    
    Returns:
        [
            {
                "rank": 1,
                "lat": -6.2087,
                "lon": 106.8458,
                "cell_id": "JKT_1024_1",
                "band": "B3",
                "rsrp": -115,
                "rsrq": -18,
                "sinr": 2,
                "timestamp": "2026-09-04 08:00:30"
            },
            ...
        ]
    
    Used in RCA engine untuk identify problem areas.
    """
    # Filter spots below threshold
    worst_df = df.filter(pl.col("rsrp") < threshold_rsrp)
    
    # Sort by RSRP (ascending = worst first)
    worst_sorted = worst_df.sort("rsrp").head(n)
    
    # Convert to list of dicts with rank
    result = []
    for idx, row in enumerate(worst_sorted.iter_rows(named=True), 1):
        result.append({
            "rank": idx,
            "lat": round(row["lat"], 6),
            "lon": round(row["lon"], 6),
            "cell_id": row["cell_id"],
            "band": row["band"],
            "rsrp": row["rsrp"],
            "rsrq": row["rsrq"],
            "sinr": row["sinr"],
            "timestamp": str(row["timestamp"]),
        })
    
    return result


def calc_throughput_stats(df: pl.DataFrame) -> Dict[str, Dict]:
    """
    Aggregate throughput stats per cell and band.
    
    Args:
        df: Normalized DataFrame
    
    Returns:
        {
            "JKT_1023_2|B3": {
                "dl_avg": 48.9,
                "dl_min": 45.2,
                "dl_max": 52.3,
                "ul_avg": 13.5,
                "ul_min": 12.1,
                "ul_max": 14.7,
                "samples": 5
            },
            ...
        }
    """
    tp_agg = df.group_by(["cell_id", "band"]).agg([
        pl.col("dl_throughput").mean().alias("dl_avg"),
        pl.col("dl_throughput").min().alias("dl_min"),
        pl.col("dl_throughput").max().alias("dl_max"),
        pl.col("ul_throughput").mean().alias("ul_avg"),
        pl.col("ul_throughput").min().alias("ul_min"),
        pl.col("ul_throughput").max().alias("ul_max"),
        pl.col("dl_throughput").count().alias("samples"),
    ])
    
    result = {}
    for row in tp_agg.iter_rows(named=True):
        key = f"{row['cell_id']}|{row['band']}"
        result[key] = {
            "dl_avg": round(row["dl_avg"], 2),
            "dl_min": round(row["dl_min"], 2),
            "dl_max": round(row["dl_max"], 2),
            "ul_avg": round(row["ul_avg"], 2),
            "ul_min": round(row["ul_min"], 2),
            "ul_max": round(row["ul_max"], 2),
            "samples": row["samples"],
        }
    
    return result


if __name__ == "__main__":
    # CLI test: python -m telecom_agent.kpi --file <parsed_csv> --action <action> --output <path>
    import sys
    import json
    import argparse
    from telecom_agent.parsers import parse_dt_csv
    
    parser = argparse.ArgumentParser(
        description="Calculate KPI metrics from Drive Test logs",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python -m telecom_agent.kpi --file dt_sample.csv --action avg_kpi
  python -m telecom_agent.kpi --file dt_sample.csv --action worst_spots --output result.json
  python -m telecom_agent.kpi --file dt_sample.csv --action percentile
        """
    )
    parser.add_argument("--file", required=True, help="Path to DT log CSV file")
    parser.add_argument("--action", default="avg_kpi",
                       choices=["avg_kpi", "percentile", "worst_spots", "throughput"],
                       help="KPI calculation action (default: avg_kpi)")
    parser.add_argument("--vendor", default="generic",
                       help="Vendor format for CSV parsing (default: generic)")
    parser.add_argument("--output", help="Output JSON file (optional; stdout if omitted)")
    
    args = parser.parse_args()
    
    try:
        # Parse DT CSV first
        df = parse_dt_csv(args.file, vendor=args.vendor)
        
        # Compute KPI based on action
        if args.action == "avg_kpi":
            result = calc_avg_kpi(df)
        elif args.action == "percentile":
            result = calc_percentile_kpi(df)
        elif args.action == "worst_spots":
            result = find_worst_spots(df, n=5, threshold_rsrp=-110)
        elif args.action == "throughput":
            result = calc_throughput_stats(df)
        else:
            raise ValueError(f"Unknown action: {args.action}")
        
        output_result = {
            "status": "success",
            "action": args.action,
            "rows_processed": len(df),
            "result": result,
        }
        
        output_text = json.dumps(output_result, indent=2, default=str)
        
        if args.output:
            with open(args.output, 'w') as f:
                f.write(output_text)
            print(f"✓ KPI {args.action} computed → {args.output}")
        else:
            print(output_text)
            
    except FileNotFoundError as e:
        error_result = {"status": "error", "message": f"File not found: {str(e)}"}
        print(json.dumps(error_result, indent=2), file=sys.stderr)
        sys.exit(1)
    except ValueError as e:
        error_result = {"status": "error", "message": f"Validation error: {str(e)}"}
        print(json.dumps(error_result, indent=2), file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        error_result = {"status": "error", "message": f"Unexpected error: {str(e)}"}
        print(json.dumps(error_result, indent=2), file=sys.stderr)
        sys.exit(1)
