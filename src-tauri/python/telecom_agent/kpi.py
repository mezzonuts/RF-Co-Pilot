"""KPI Calculations — Drive Test KPI aggregation

Fase 1 TODO:
- calc_avg_kpi(df) → avg RSRP/RSRQ/SINR per cell
- calc_percentile_kpi(df, p=[5,10,25,50,75,90,95]) → coverage quality assessment
- find_worst_spots(df, n=5) → lat/lon dengan RSRP < threshold
- calc_throughput_stats(df) → avg/min/max throughput per cell/band
"""

from typing import Optional, Dict, List
import polars as pl


def calc_avg_kpi(df: pl.DataFrame) -> Dict[str, float]:
    """
    Calculate average KPI across all data points.
    
    Returns: {cell_id: {rsrp_avg, rsrq_avg, sinr_avg, throughput_avg}}
    
    TODO: Implement in Phase 1
    """
    raise NotImplementedError("Phase 1: implement with polars groupby")


def calc_percentile_kpi(df: pl.DataFrame, percentiles: List[int] = [5, 25, 50, 75, 95]) -> Dict:
    """
    Calculate percentile KPI for coverage quality assessment.
    
    RSRP percentiles: 
      - p5 = worst 5%
      - p50 = median
      - p95 = best 5%
    
    Used for CQI prediction, interference detection.
    """
    raise NotImplementedError("Phase 1")


def find_worst_spots(df: pl.DataFrame, n: int = 5, threshold_rsrp: int = -110) -> List[Dict]:
    """
    Find N worst spots (lowest RSRP, highest interference).
    
    Returns: [{lat, lon, cell_id, rsrp, rsrq, sinr}, ...]
    
    Used in RCA Engine untuk identify problem areas.
    """
    raise NotImplementedError("Phase 1")


def calc_throughput_stats(df: pl.DataFrame) -> Dict:
    """Aggregate throughput stats per cell/band."""
    raise NotImplementedError("Phase 1")
