"""reporting.py — PDF & Excel reporting engine with charts."""
import io
import logging
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)

try:
    import polars as pl
    POLARS_AVAILABLE = True
except ImportError:
    POLARS_AVAILABLE = False

try:
    import xlsxwriter  # noqa: F401
    XLSXWRITER_AVAILABLE = True
except ImportError:
    XLSXWRITER_AVAILABLE = False

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import mm
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image as RLImage
    from reportlab.lib.styles import getSampleStyleSheet
    from reportlab.lib import colors
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False

try:
    import matplotlib.pyplot as plt
    import matplotlib
    matplotlib.use("Agg")
    MATPLOTLIB_AVAILABLE = True
except ImportError:
    MATPLOTLIB_AVAILABLE = False

CHART_DPI = 150


def _chart_to_png_bytes(fig) -> bytes:
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=CHART_DPI, bbox_inches="tight")
    plt.close(fig)
    buf.seek(0)
    return buf.read()


def generate_rsrp_histogram(df, bins: int = 20) -> Optional[bytes]:
    """Return PNG bytes of RSRP histogram, or None if unavailable."""
    if not MATPLOTLIB_AVAILABLE or df is None or df.is_empty():
        return None
    col = "RSRP" if "RSRP" in df.columns else ("rsrp" if "rsrp" in df.columns else None)
    if col is None:
        return None
    values = df[col].drop_nulls().to_list()
    if not values:
        return None
    fig, ax = plt.subplots(figsize=(6, 3.5))
    ax.hist(values, bins=bins, color="#2563eb", edgecolor="white")
    ax.set_xlabel("RSRP (dBm)"); ax.set_ylabel("Count"); ax.set_title("RSRP Distribution")
    ax.grid(True, alpha=0.3)
    return _chart_to_png_bytes(fig)


def generate_throughput_boxplot(df) -> Optional[bytes]:
    """Return PNG bytes of throughput boxplot."""
    if not MATPLOTLIB_AVAILABLE or df is None or df.is_empty():
        return None
    cols = [c for c in ["Throughput_DL_Mbps", "Throughput_UL_Mbps", "throughput_dl", "throughput_ul"] if c in df.columns]
    if not cols:
        return None
    data = [df[c].drop_nulls().to_list() for c in cols]
    fig, ax = plt.subplots(figsize=(6, 3.5))
    ax.boxplot(data, labels=cols)
    ax.set_title("Throughput Boxplot"); ax.grid(True, alpha=0.3)
    return _chart_to_png_bytes(fig)


def export_excel_report(df, output_path: str, kpi_summary: Optional[Dict] = None, charts: Optional[Dict[str, bytes]] = None) -> str:
    """Export DataFrame + KPI summary + charts to Excel. Returns output_path."""
    if not XLSXWRITER_AVAILABLE:
        raise ImportError("xlsxwriter not installed. Run: pip install xlsxwriter")
    import xlsxwriter as xw

    wb = xw.Workbook(output_path)
    ws_data = wb.add_worksheet("Data")
    ws_kpi = wb.add_worksheet("KPI Summary")
    header_fmt = wb.add_format({"bold": True, "bg_color": "#2563eb", "font_color": "white", "border": 1})
    cell_fmt = wb.add_format({"border": 1})

    # Data sheet
    cols = df.columns if df is not None and not df.is_empty() else []
    for c, name in enumerate(cols):
        ws_data.write(0, c, name, header_fmt)
        ws_data.set_column(c, c, 14)
    if df is not None and not df.is_empty():
        rows = df.to_dicts()
        for r, row in enumerate(rows, start=1):
            for c, name in enumerate(cols):
                ws_data.write(r, c, row.get(name), cell_fmt)

    # KPI sheet
    if kpi_summary:
        ws_kpi.write(0, 0, "Metric", header_fmt)
        ws_kpi.write(0, 1, "Value", header_fmt)
        ws_kpi.set_column(0, 0, 28); ws_kpi.set_column(1, 1, 18)
        for r, (k, v) in enumerate(kpi_summary.items(), start=1):
            ws_kpi.write(r, 0, k, cell_fmt)
            ws_kpi.write(r, 1, str(v), cell_fmt)

    # Charts sheet if provided
    if charts:
        ws_charts = wb.add_worksheet("Charts")
        row = 0
        for title, png_bytes in charts.items():
            if png_bytes is None:
                continue
            # Write image from bytes via temp handling — xlsxwriter needs file or BytesIO via image_data
            ws_charts.write(row, 0, title, header_fmt)
            row += 1
            ws_charts.insert_image(row, 0, f"{title}.png", {"image_data": io.BytesIO(png_bytes), "x_scale": 0.7, "y_scale": 0.7})
            row += 18

    wb.close()
    logger.info(f"Excel report written to {output_path}")
    return output_path


def export_pdf_report(output_path: str, title: str = "RF Co-Pilot Report", kpi_summary: Optional[Dict] = None, charts: Optional[Dict[str, bytes]] = None) -> str:
    """Export KPI summary + charts to PDF. Returns output_path."""
    if not REPORTLAB_AVAILABLE:
        raise ImportError("reportlab not installed. Run: pip install reportlab")
    styles = getSampleStyleSheet()
    doc = SimpleDocTemplate(output_path, pagesize=A4, topMargin=18*mm, bottomMargin=18*mm)
    story = []
    story.append(Paragraph(title, styles["Title"]))
    story.append(Spacer(1, 8*mm))
    story.append(Paragraph("Generated by RF Co-Pilot", styles["Normal"]))
    story.append(Spacer(1, 6*mm))

    if kpi_summary:
        data = [["Metric", "Value"]] + [[k, str(v)] for k, v in kpi_summary.items()]
        t = Table(data, colWidths=[70*mm, 70*mm])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2563eb")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("ALIGN", (0, 0), (-1, -1), "LEFT"),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f1f5f9")]),
        ]))
        story.append(t)
        story.append(Spacer(1, 6*mm))

    if charts:
        for chart_title, png_bytes in charts.items():
            if png_bytes is None:
                continue
            story.append(Paragraph(chart_title, styles["Heading3"]))
            story.append(RLImage(io.BytesIO(png_bytes), width=150*mm, height=85*mm))
            story.append(Spacer(1, 4*mm))

    doc.build(story)
    logger.info(f"PDF report written to {output_path}")
    return output_path
