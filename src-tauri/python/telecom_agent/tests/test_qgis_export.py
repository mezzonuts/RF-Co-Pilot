import pytest
import polars as pl
import os
import tempfile
from telecom_agent.qgis_export import export_to_qgis_csv, generate_qgs_project

def test_export_to_qgis_csv_success():
    df = pl.DataFrame({
        'lat': [-6.2088, -6.2089],
        'lon': [106.8456, 106.8457],
        'rsrp': [-95, -105],
        'sinr': [12, 3]
    })
    
    with tempfile.TemporaryDirectory() as tmpdir:
        output_csv = os.path.join(tmpdir, "test_qgis.csv")
        res = export_to_qgis_csv(df, output_csv)
        assert os.path.exists(res)
        
        # Verify written content
        read_back = pl.read_csv(res)
        assert len(read_back) == 2
        assert 'lat' in read_back.columns
        assert 'rsrp' in read_back.columns

def test_export_to_qgis_csv_empty():
    df = pl.DataFrame()
    with tempfile.TemporaryDirectory() as tmpdir:
        output_csv = os.path.join(tmpdir, "test_empty.csv")
        with pytest.raises(ValueError, match="Cannot export empty DataFrame"):
            export_to_qgis_csv(df, output_csv)

def test_generate_qgs_project():
    with tempfile.TemporaryDirectory() as tmpdir:
        dummy_csv = os.path.join(tmpdir, "data.csv")
        with open(dummy_csv, "w") as f:
            f.write("lat,lon,rsrp\n-6.2,106.8,-95\n")
            
        project_path = generate_qgs_project(dummy_csv, "TestProject", tmpdir)
        assert os.path.exists(project_path)
        with open(project_path, "r") as f:
            content = f.read()
            assert "TestProject" in content
            assert "data.csv" in content
