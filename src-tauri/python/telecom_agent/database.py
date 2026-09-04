"""database.py — PostGIS & SQLite backend for Cell Master & DT Logs.

- PostGIS: spatial queries on cell locations & coverage areas
- SQLite: fallback for dev/test (no spatial index, but works locally)
- Schema: Cell Master (site_id, cell_id, lat/lon, band, PCI, etc)
         DT Logs (timestamp, lat/lon, rsrp, sinr, serving_pci, etc)
"""

import sqlite3
from typing import Dict, List, Optional, Tuple, Any
import logging
from datetime import datetime
import os

logger = logging.getLogger(__name__)

class DatabaseBackend:
    """Abstract backend for Cell Master & DT Logs."""
    
    def init_schema(self) -> None:
        raise NotImplementedError()
    
    def insert_cell(self, cell_data: Dict[str, Any]) -> None:
        raise NotImplementedError()
    
    def query_cells_by_band(self, band: str) -> List[Dict]:
        raise NotImplementedError()
    
    def insert_dt_log_batch(self, logs: List[Dict]) -> int:
        raise NotImplementedError()
    
    def query_dt_logs_by_area(self, lat_min: float, lat_max: float, lon_min: float, lon_max: float) -> List[Dict]:
        raise NotImplementedError()

class SQLiteBackend(DatabaseBackend):
    """SQLite backend for dev/test (no spatial extensions)."""
    
    def __init__(self, db_path: str = ":memory:"):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row
        logger.info(f"SQLiteBackend initialized at {db_path}")
    
    def init_schema(self) -> None:
        """Create Cell Master & DT Logs tables."""
        cursor = self.conn.cursor()
        
        # Cell Master table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS cell_master (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                site_id TEXT NOT NULL,
                cell_id TEXT NOT NULL UNIQUE,
                lat REAL NOT NULL,
                lon REAL NOT NULL,
                azimuth INTEGER,
                mech_tilt REAL,
                elec_tilt REAL,
                height REAL,
                band TEXT,
                earfcn INTEGER,
                nrarfcn INTEGER,
                pci INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # DT Logs table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS dt_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TIMESTAMP NOT NULL,
                lat REAL NOT NULL,
                lon REAL NOT NULL,
                rsrp INTEGER,
                rsrq INTEGER,
                sinr INTEGER,
                serving_pci INTEGER,
                neighbor_pci TEXT,
                throughput_dl REAL,
                throughput_ul REAL,
                cqi INTEGER,
                bler REAL,
                cluster_id TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create indices for faster queries
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_cell_band ON cell_master(band)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_cell_pci ON cell_master(pci)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_dt_cluster ON dt_logs(cluster_id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_dt_serving_pci ON dt_logs(serving_pci)")
        
        self.conn.commit()
        logger.info("Schema initialized successfully")
    
    def insert_cell(self, cell_data: Dict[str, Any]) -> None:
        """Insert or update a cell in master."""
        cursor = self.conn.cursor()
        
        # Validate required fields
        required = ['site_id', 'cell_id', 'lat', 'lon']
        if not all(k in cell_data for k in required):
            raise ValueError(f"Missing required fields: {required}")
        
        cursor.execute("""
            INSERT OR REPLACE INTO cell_master 
            (site_id, cell_id, lat, lon, azimuth, mech_tilt, elec_tilt, 
             height, band, earfcn, nrarfcn, pci, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        """, (
            cell_data['site_id'],
            cell_data['cell_id'],
            cell_data['lat'],
            cell_data['lon'],
            cell_data.get('azimuth'),
            cell_data.get('mech_tilt'),
            cell_data.get('elec_tilt'),
            cell_data.get('height'),
            cell_data.get('band'),
            cell_data.get('earfcn'),
            cell_data.get('nrarfcn'),
            cell_data.get('pci')
        ))
        self.conn.commit()
        logger.debug(f"Inserted/updated cell: {cell_data['cell_id']}")
    
    def query_cells_by_band(self, band: str) -> List[Dict]:
        """Query all cells by band."""
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM cell_master WHERE band = ?", (band,))
        return [dict(row) for row in cursor.fetchall()]
    
    def query_cells_by_area(self, lat_min: float, lat_max: float, 
                           lon_min: float, lon_max: float) -> List[Dict]:
        """Query cells within bounding box (simple 2D rect, not spatial)."""
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT * FROM cell_master 
            WHERE lat BETWEEN ? AND ? AND lon BETWEEN ? AND ?
        """, (lat_min, lat_max, lon_min, lon_max))
        return [dict(row) for row in cursor.fetchall()]
    
    def insert_dt_log_batch(self, logs: List[Dict]) -> int:
        """Batch insert DT logs."""
        if not logs:
            return 0
        
        cursor = self.conn.cursor()
        count = 0
        
        for log in logs:
            try:
                cursor.execute("""
                    INSERT INTO dt_logs 
                    (timestamp, lat, lon, rsrp, rsrq, sinr, serving_pci, 
                     neighbor_pci, throughput_dl, throughput_ul, cqi, bler, cluster_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    log.get('timestamp', datetime.now().isoformat()),
                    log['lat'],
                    log['lon'],
                    log.get('rsrp'),
                    log.get('rsrq'),
                    log.get('sinr'),
                    log.get('serving_pci'),
                    log.get('neighbor_pci'),
                    log.get('throughput_dl'),
                    log.get('throughput_ul'),
                    log.get('cqi'),
                    log.get('bler'),
                    log.get('cluster_id')
                ))
                count += 1
            except Exception as e:
                logger.warning(f"Failed to insert DT log: {e}")
                continue
        
        self.conn.commit()
        logger.info(f"Inserted {count}/{len(logs)} DT logs")
        return count
    
    def query_dt_logs_by_area(self, lat_min: float, lat_max: float, 
                             lon_min: float, lon_max: float) -> List[Dict]:
        """Query DT logs within bounding box."""
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT * FROM dt_logs 
            WHERE lat BETWEEN ? AND ? AND lon BETWEEN ? AND ?
        """, (lat_min, lat_max, lon_min, lon_max))
        return [dict(row) for row in cursor.fetchall()]
    
    def close(self):
        """Close database connection."""
        self.conn.close()
        logger.info("Database connection closed")

# Global instance (lazy-loaded)
_db_instance: Optional[DatabaseBackend] = None

def get_db(use_sqlite: bool = True, db_path: str = ":memory:") -> DatabaseBackend:
    """Get or create database backend."""
    global _db_instance
    if _db_instance is None:
        _db_instance = SQLiteBackend(db_path=db_path)
        _db_instance.init_schema()
    return _db_instance

def reset_db():
    """Reset global database instance (for testing)."""
    global _db_instance
    if _db_instance:
        _db_instance.close()
    _db_instance = None
