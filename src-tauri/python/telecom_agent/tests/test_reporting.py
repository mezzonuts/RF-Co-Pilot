"""Tests for reporting.py."""
import os, tempfile
import pytest
import polars as pl
from telecom_agent.reporting import export_excel_report, export_pdf_report, generate_rsrp_histogram

SAMPLE_DF = pl.DataFrame({
    "RSRP": [-95, -102, -88, -110, -92],
    "SINR": [12, 5, 18, 2, 10],
    "Throughput_DL_Mbps": [150, 30, 280, 5, 120],
})
KPI = {"avg_rsrp": -97.4, "avg_sinr": 9.4, "samples": 5}


def test_export_excel_report(tmp_path):
    out = str(tmp_path / "report.xlsx")
    result = export_excel_report(SAMPLE_DF, out, kpi_summary=KPI)
    assert os.path.exists(result)
    assert os.path.getsize(result) > 1000


def test_export_excel_empty_df(tmp_path):
    out = str(tmp_path / "empty.xlsx")
    empty = pl.DataFrame({"RSRP": []}).cast({"RSRP": pl.Int64})
    result = export_excel_report(empty, out, kpi_summary={"samples": 0})
    assert os.path.exists(result)


def test_export_excel_with_chart(tmp_path):
    png = generate_rsrp_histogram(SAMPLE_DF)
    # matplotlib missing on py3.14 → png is None, should still succeed
    out = str(tmp_path / "with_chart.xlsx")
    charts = {"RSRP Histogram": png} if png else None
    result = export_excel_report(SAMPLE_DF, out, kpi_summary=KPI, charts=charts)
    assert os.path.exists(result)


def test_export_pdf_report(tmp_path):
    out = str(tmp_path / "report.pdf")
    result = export_pdf_report(out, title="Test Report", kpi_summary=KPI)
    assert os.path.exists(result)
    assert os.path.getsize(result) > 500
    # PDF magic
    with open(result, "rb") as f:
        assert f.read(4) == b"%PDF"


def test_export_pdf_with_chart(tmp_path):
    png = generate_rsrp_histogram(SAMPLE_DF)
    charts = {"RSRP Histogram": png} if png else None
    out = str(tmp_path / "chart.pdf")
    result = export_pdf_report(out, kpi_summary=KPI, charts=charts)
    assert os.path.exists(result)


def test_generate_histogram_no_matplotlib_or_empty():
    # Should return None gracefully, not raise
    empty = pl.DataFrame({"RSRP": []}).cast({"RSRP": pl.Int64})
    result = generate_rsrp_histogram(empty)
    assert result is None  # no matplotlib on this env → None

    no_col = pl.DataFrame({"foo": [1, 2, 3]})
    assert generate_rsrp_histogram(no_col) is None
