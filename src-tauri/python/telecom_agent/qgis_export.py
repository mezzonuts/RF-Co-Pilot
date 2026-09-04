import polars as pl
from typing import Dict, List, Optional, Tuple
import logging
import json
import os
from .logging_config import setup_logging

logger = setup_logging(__name__)

def export_to_qgis_csv(
    df: pl.DataFrame, 
    output_path: str,
    lat_col: str = 'lat',
    lon_col: str = 'lon',
    kpi_cols: List[str] = ['rsrp', 'sinr']
) -> str:
    """
    Export DataFrame to a QGIS-friendly CSV with Geometry info.
    QGIS can auto-detect lat/lon columns, but we ensure they exist.
    """
    if df.is_empty():
        raise ValueError("Cannot export empty DataFrame to QGIS CSV")
    
    # Filter only available columns
    available_cols = [lat_col, lon_col] + [c for c in kpi_cols if c in df.columns]
    
    try:
        # Select and drop nulls in coordinates
        export_df = df.select(available_cols).drop_nulls(subset=[lat_col, lon_col])
        
        if export_df.is_empty():
            raise ValueError(f"No valid coordinates found in columns {lat_col}/{lon_col}")
            
        export_df.write_csv(output_path)
        logger.info(f"Exported {len(export_df)} rows to QGIS CSV: {output_path}")
        return output_path
    except Exception as e:
        logger.error(f"Failed to export QGIS CSV: {str(e)}")
        raise

def generate_qgs_project(
    csv_path: str,
    project_name: str,
    output_dir: str
) -> str:
    """
    Generate a simple .qgs (XML) file that QGIS can open directly.
    This creates a project that already has the CSV layer loaded.
    Note: Real implementation would use a template to define symbology (color ramps).
    """
    abs_csv_path = os.path.abspath(csv_path).replace('\\', '/')
    project_path = os.path.join(output_dir, f"{project_name}.qgs")
    
    # Simple XML template for QGIS 3.x
    qgs_content = f"""<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis projectname="{project_name}" version="3.28.0-Firenze">
  <projectlayers>
    <maplayer autoRefreshEnabled="0" geometry="Point" type="vector">
      <id>{project_name}_layer</id>
      <datasource>file:///{abs_csv_path}?type=csv&amp;xField=lon&amp;yField=lat&amp;spatialIndex=yes&amp;subsetIndex=no&amp;watchFile=no</datasource>
      <layername>Drive Test Points</layername>
      <provider encoding="UTF-8">delimitedtext</provider>
    </maplayer>
  </projectlayers>
</qgis>
"""
    with open(project_path, 'w', encoding='utf-8') as f:
        f.write(qgs_content)
    
    logger.info(f"Generated QGIS Project: {project_path}")
    return project_path
