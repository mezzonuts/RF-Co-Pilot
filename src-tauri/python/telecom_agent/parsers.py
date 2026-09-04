"""DT Log Parsers — Drive Test CSV/TXT parsing

Phase 1: Parse vendor-specific DT formats (TEMS, NRT, generic) → normalized Polars DataFrame.

Supported vendors:
- "generic": Standard CSV [Timestamp, Latitude, Longitude, CellID, Band, RSRP, RSRQ, SINR, ...]
- "tems": Ericsson TEMS CSV (vendor-specific column names)
- "nrt": Nokia NRT TXT (tab-delimited)
- "nemo": Huawei NEMO CSV

Common output schema:
  [timestamp, lat, lon, cell_id, band, rsrp, rsrq, sinr, dl_throughput, ul_throughput, ...]
"""

import polars as pl
from pathlib import Path
from typing import Optional, Dict
from datetime import datetime


# Vendor column mappings
VENDOR_SCHEMAS = {
    "generic": {
        "timestamp": "Timestamp",
        "lat": "Latitude",
        "lon": "Longitude",
        "cell_id": "CellID",
        "band": "Band",
        "rsrp": "RSRP",
        "rsrq": "RSRQ",
        "sinr": "SINR",
        "dl_throughput": "DL_Throughput",
        "ul_throughput": "UL_Throughput",
    },
    "tems": {
        "timestamp": "Time",
        "lat": "Latitude",
        "lon": "Longitude",
        "cell_id": "Cell Name",
        "band": "Band",
        "rsrp": "RSRP (dBm)",
        "rsrq": "RSRQ (dB)",
        "sinr": "SINR (dB)",
        "dl_throughput": "DL TP (Mbps)",
        "ul_throughput": "UL TP (Mbps)",
    },
    "nrt": {
        "timestamp": "TIME",
        "lat": "LAT",
        "lon": "LON",
        "cell_id": "CELLID",
        "band": "BAND",
        "rsrp": "RSRP",
        "rsrq": "RSRQ",
        "sinr": "CINR",
        "dl_throughput": "DLTPUT",
        "ul_throughput": "ULTPUT",
    },
}


def parse_dt_csv(filepath: str, vendor: str = "generic") -> pl.DataFrame:
    """
    Parse Drive Test CSV log into normalized DataFrame.
    
    Args:
        filepath: path to CSV file (e.g., DT_Jakarta_20260904.csv)
        vendor: "generic", "tems", "nrt", "nemo" — affects column mapping
    
    Returns:
        pl.DataFrame with normalized schema [timestamp, lat, lon, cell_id, band, rsrp, rsrq, sinr, ...]
    
    Raises:
        FileNotFoundError: if file not found
        ValueError: if vendor not supported or required columns missing
    """
    file_path = Path(filepath)
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {filepath}")
    
    # Read CSV
    df = pl.read_csv(filepath)
    
    # Normalize schema
    df_norm = normalize_dt_schema(df, vendor=vendor)
    
    return df_norm


def parse_dt_txt(filepath: str, vendor: str = "nrt") -> pl.DataFrame:
    """
    Parse NRT/ASCII DT log (tab-delimited).
    
    Args:
        filepath: path to TXT file
        vendor: "nrt" (default) or "tems_txt"
    
    Returns:
        Normalized DataFrame
    """
    file_path = Path(filepath)
    if not file_path.exists():
        raise FileNotFoundError(f"File not found: {filepath}")
    
    # Read TXT (tab-delimited)
    df = pl.read_csv(filepath, separator="\t")
    
    # Normalize
    df_norm = normalize_dt_schema(df, vendor=vendor)
    
    return df_norm


def normalize_dt_schema(df: pl.DataFrame, vendor: str = "generic") -> pl.DataFrame:
    """
    Normalize vendor DT columns to common schema.
    
    Common output schema:
      - timestamp (datetime)
      - lat, lon (float)
      - cell_id (str, e.g., "JKT_1023_2")
      - band (str, e.g., "n78", "b3")
      - rsrp (int, dBm) — Signal Strength
      - rsrq (int, dB) — Signal Quality
      - sinr (int, dB) — Interference + Noise Ratio
      - dl_throughput (float, Mbps)
      - ul_throughput (float, Mbps)
    
    Args:
        df: Raw DataFrame (vendor-specific columns)
        vendor: Vendor schema to use for mapping
    
    Returns:
        Normalized DataFrame with consistent column names and types
    
    Raises:
        ValueError: if vendor not in VENDOR_SCHEMAS or required columns missing
    """
    if vendor not in VENDOR_SCHEMAS:
        raise ValueError(f"Vendor '{vendor}' not supported. Choose from {list(VENDOR_SCHEMAS.keys())}")
    
    schema_map = VENDOR_SCHEMAS[vendor]
    
    # Check if all required columns exist in input
    for norm_col, vendor_col in schema_map.items():
        if vendor_col not in df.columns:
            raise ValueError(f"Required column '{vendor_col}' not found in CSV. Available: {df.columns}")
    
    # Rename columns to normalized names
    rename_dict = {v: k for k, v in schema_map.items()}
    df_renamed = df.rename(rename_dict)
    
    # Select only normalized columns (drop extra columns)
    normalized_cols = list(schema_map.keys())
    df_normalized = df_renamed.select(normalized_cols)
    
    # Convert types
    df_normalized = df_normalized.with_columns([
        pl.col("timestamp").str.to_datetime("%Y-%m-%d %H:%M:%S").alias("timestamp"),
        pl.col("lat").cast(pl.Float32),
        pl.col("lon").cast(pl.Float32),
        pl.col("cell_id").cast(pl.Utf8),
        pl.col("band").cast(pl.Utf8),
        pl.col("rsrp").cast(pl.Int16),
        pl.col("rsrq").cast(pl.Int16),
        pl.col("sinr").cast(pl.Int16),
        pl.col("dl_throughput").cast(pl.Float32),
        pl.col("ul_throughput").cast(pl.Float32),
    ])
    
    return df_normalized


if __name__ == "__main__":
    # CLI test: python -m telecom_agent.parsers --file <path> --vendor <vendor> --output <path>
    import sys
    import json
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Parse Drive Test CSV/TXT logs into normalized Polars DataFrame",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python -m telecom_agent.parsers --file dt_sample.csv --vendor generic
  python -m telecom_agent.parsers --file dt_sample.csv --vendor tems --output result.json
        """
    )
    parser.add_argument("--file", required=True, help="Path to DT log file (CSV or TXT)")
    parser.add_argument("--vendor", default="generic", 
                       choices=list(VENDOR_SCHEMAS.keys()),
                       help="Vendor format (default: generic)")
    parser.add_argument("--output", help="Output JSON file (optional; stdout if omitted)")
    
    args = parser.parse_args()
    
    try:
        df = parse_dt_csv(args.file, vendor=args.vendor)
        result = {
            "status": "success",
            "rows": len(df),
            "columns": df.columns,
            "sample": df.head(3).to_dicts(),
        }
        
        output_text = json.dumps(result, indent=2, default=str)
        
        if args.output:
            with open(args.output, 'w') as f:
                f.write(output_text)
            print(f"✓ Parsed {len(df)} rows → {args.output}")
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
