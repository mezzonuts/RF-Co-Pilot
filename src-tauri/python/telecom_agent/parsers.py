"""DT Log Parsers — Drive Test CSV/TXT parsing

Fase 1 TODO:
- Parse TEMS CSV: [timestamp, lat, lon, cell_id, band, rsrp, rsrq, sinr, throughput, ...]
- Parse NRT TXT: similar format, tab-delimited
- Normalize columns → consistent schema
- Handle vendor-specific formats (Ericsson, Huawei, Nokia)
"""

import polars as pl
from pathlib import Path
from typing import Optional


def parse_dt_csv(filepath: str, vendor: str = "generic") -> pl.DataFrame:
    """
    Parse Drive Test CSV log into DataFrame.
    
    Args:
        filepath: path to CSV file (e.g., DT_Jakarta_20260904.csv)
        vendor: "generic", "tems", "nrt", "nemo" — affects column mapping
    
    Returns:
        pl.DataFrame with columns: [timestamp, lat, lon, cell_id, band, rsrp, rsrq, sinr, ...]
    
    TODO: Implement in Phase 1
    """
    raise NotImplementedError("Phase 1: implement polars.read_csv + vendor-specific normalization")


def parse_dt_txt(filepath: str) -> pl.DataFrame:
    """Parse NRT/ASCII DT log (tab-delimited)."""
    raise NotImplementedError("Phase 1")


def normalize_dt_schema(df: pl.DataFrame) -> pl.DataFrame:
    """
    Normalize vendor DT columns to common schema.
    
    Common schema:
      - timestamp (datetime)
      - lat, lon (float)
      - cell_id (str, e.g., "JKT_1023_2")
      - band (str, e.g., "n78", "b3")
      - rsrp (int, dBm)
      - rsrq (int, dB)
      - sinr (int, dB)
      - throughput (float, Mbps)
    """
    raise NotImplementedError("Phase 1")
