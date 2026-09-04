import pytest
import polars as pl
from pathlib import Path
from telecom_agent.parsers import parse_dt_csv, parse_dt_txt, normalize_dt_schema, VENDOR_SCHEMAS

@pytest.fixture
def sample_csv(tmp_path):
    """Fixture providing a temporary generic DT CSV file."""
    csv_file = tmp_path / "dt_sample.csv"
    csv_file.write_text(
        "Timestamp,Latitude,Longitude,CellID,Band,RSRP,RSRQ,SINR,DL_Throughput,UL_Throughput\n"
        "2026-09-04 08:00:00,-6.2085,106.8456,JKT_1023_2,B3,-95,-8,8,45.2,12.1\n"
        "2026-09-04 08:00:15,-6.2086,106.8457,JKT_1023_2,B3,-94,-7,9,48.5,13.5\n"
    )
    return str(csv_file)

def test_parse_dt_csv_success(sample_csv):
    """Test successful CSV parsing."""
    df = parse_dt_csv(sample_csv, vendor="generic")
    assert isinstance(df, pl.DataFrame)
    assert len(df) == 2
    assert "timestamp" in df.columns
    assert "rsrp" in df.columns
    assert df["rsrp"][0] == -95

def test_file_not_found():
    """Test FileNotFoundError when file doesn't exist."""
    with pytest.raises(FileNotFoundError):
        parse_dt_csv("non_existent_file.csv")

def test_invalid_vendor(sample_csv):
    """Test ValueError for unsupported vendor."""
    with pytest.raises(ValueError, match="Vendor 'invalid_vendor' not supported"):
        parse_dt_csv(sample_csv, vendor="invalid_vendor")

def test_missing_column(tmp_path):
    """Test ValueError when required column is missing."""
    bad_csv = tmp_path / "bad.csv"
    bad_csv.write_text("Timestamp,Latitude\n2026-09-04 08:00:00,-6.2085\n")
    
    with pytest.raises(ValueError, match="Required column"):
        parse_dt_csv(str(bad_csv), vendor="generic")
