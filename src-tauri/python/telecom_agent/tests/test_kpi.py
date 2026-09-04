import pytest
import polars as pl
from telecom_agent.kpi import calc_avg_kpi, calc_percentile_kpi, find_worst_spots, calc_throughput_stats

@pytest.fixture
def sample_df():
    """Fixture providing a normalized DataFrame for testing KPI calculations."""
    return pl.DataFrame({
        "timestamp": ["2026-09-04 08:00:00", "2026-09-04 08:00:15", "2026-09-04 08:00:30"],
        "lat": [-6.2085, -6.2086, -6.2087],
        "lon": [106.8456, 106.8457, 106.8458],
        "cell_id": ["JKT_1023_2", "JKT_1023_2", "JKT_1024_1"],
        "band": ["B3", "B3", "B3"],
        "rsrp": [-95, -94, -115],
        "rsrq": [-8, -7, -18],
        "sinr": [8, 9, 2],
        "dl_throughput": [45.2, 48.5, 8.3],
        "ul_throughput": [12.1, 13.5, 1.2],
    })

def test_calc_avg_kpi(sample_df):
    """Test average KPI calculation per cell."""
    result = calc_avg_kpi(sample_df)
    assert "JKT_1023_2" in result
    assert result["JKT_1023_2"]["rsrp_avg"] == -94.5
    assert result["JKT_1023_2"]["sample_count"] == 2
    assert "JKT_1024_1" in result
    assert result["JKT_1024_1"]["rsrp_avg"] == -115.0

def test_calc_percentile_kpi(sample_df):
    """Test percentile KPI calculation."""
    result = calc_percentile_kpi(sample_df, percentiles=[50])
    assert "rsrp" in result
    assert result["rsrp"][50] == -95.0

def test_find_worst_spots(sample_df):
    """Test finding worst spots below threshold."""
    worst = find_worst_spots(sample_df, n=1, threshold_rsrp=-110)
    assert len(worst) == 1
    assert worst[0]["cell_id"] == "JKT_1024_1"
    assert worst[0]["rsrp"] == -115

def test_calc_throughput_stats(sample_df):
    """Test throughput stats per cell and band."""
    stats = calc_throughput_stats(sample_df)
    assert "JKT_1023_2|B3" in stats
    assert stats["JKT_1023_2|B3"]["dl_avg"] == 46.85
