import pytest
from telecom_agent.database import SQLiteBackend, get_db, reset_db

@pytest.fixture
def db():
    """Fixture: fresh in-memory SQLite database."""
    reset_db()
    backend = get_db(use_sqlite=True, db_path=":memory:")
    yield backend
    reset_db()

def test_init_schema(db):
    """Test schema initialization."""
    # Tables should exist after init
    cursor = db.conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='cell_master'")
    assert cursor.fetchone() is not None
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='dt_logs'")
    assert cursor.fetchone() is not None

def test_insert_cell_success(db):
    """Test inserting a cell."""
    cell = {
        'site_id': 'JKT_001',
        'cell_id': 'JKT_001_1',
        'lat': -6.2088,
        'lon': 106.8456,
        'azimuth': 120,
        'band': 'n78',
        'pci': 148
    }
    db.insert_cell(cell)
    
    cells = db.query_cells_by_band('n78')
    assert len(cells) == 1
    assert cells[0]['cell_id'] == 'JKT_001_1'
    assert cells[0]['pci'] == 148

def test_insert_cell_missing_required(db):
    """Test insert fails without required fields."""
    cell = {'site_id': 'JKT_001'}  # Missing cell_id, lat, lon
    with pytest.raises(ValueError, match="Missing required fields"):
        db.insert_cell(cell)

def test_insert_cell_upsert(db):
    """Test that insert_cell upserts (replaces) existing."""
    cell_v1 = {
        'site_id': 'JKT_001',
        'cell_id': 'JKT_001_1',
        'lat': -6.2088,
        'lon': 106.8456,
        'pci': 100
    }
    db.insert_cell(cell_v1)
    
    cell_v2 = {
        'site_id': 'JKT_001',
        'cell_id': 'JKT_001_1',  # Same cell_id
        'lat': -6.2089,
        'lon': 106.8457,
        'pci': 200  # Updated PCI
    }
    db.insert_cell(cell_v2)
    
    cells = db.query_cells_by_band(None)
    # Force query without band filter
    cursor = db.conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM cell_master WHERE cell_id = ?", ('JKT_001_1',))
    count = cursor.fetchone()[0]
    assert count == 1  # Only one row for this cell

def test_query_cells_by_area(db):
    """Test spatial query (bounding box)."""
    cells_to_insert = [
        {'site_id': 'JKT_001', 'cell_id': 'JKT_001_1', 'lat': -6.20, 'lon': 106.84, 'band': 'n78'},
        {'site_id': 'JKT_002', 'cell_id': 'JKT_002_1', 'lat': -6.21, 'lon': 106.85, 'band': 'n78'},
        {'site_id': 'JKT_003', 'cell_id': 'JKT_003_1', 'lat': -6.50, 'lon': 106.50, 'band': 'n78'},
    ]
    for cell in cells_to_insert:
        db.insert_cell(cell)
    
    # Query area around first two cells
    result = db.query_cells_by_area(lat_min=-6.25, lat_max=-6.15, lon_min=106.80, lon_max=106.90)
    assert len(result) == 2
    assert all(c['band'] == 'n78' for c in result)

def test_insert_dt_log_batch(db):
    """Test batch insert of DT logs."""
    logs = [
        {'lat': -6.2088, 'lon': 106.8456, 'rsrp': -95, 'sinr': 12, 'serving_pci': 148, 'cluster_id': 'C1'},
        {'lat': -6.2089, 'lon': 106.8457, 'rsrp': -105, 'sinr': 3, 'serving_pci': 149, 'cluster_id': 'C1'},
        {'lat': -6.2090, 'lon': 106.8458, 'rsrp': -90, 'sinr': 15, 'serving_pci': 148, 'cluster_id': 'C1'},
    ]
    
    count = db.insert_dt_log_batch(logs)
    assert count == 3
    
    # Query by area
    result = db.query_dt_logs_by_area(lat_min=-6.21, lat_max=-6.20, lon_min=106.84, lon_max=106.85)
    assert len(result) >= 3

def test_insert_dt_log_batch_empty(db):
    """Test empty batch insert."""
    count = db.insert_dt_log_batch([])
    assert count == 0

def test_dt_log_batch_partial_failure(db):
    """Test batch insert continues even if one log fails."""
    logs = [
        {'lat': -6.2088, 'lon': 106.8456, 'rsrp': -95, 'cluster_id': 'C1'},
        {'lat': None, 'lon': None, 'rsrp': -100, 'cluster_id': 'C1'},  # Missing lat/lon
        {'lat': -6.2089, 'lon': 106.8457, 'rsrp': -105, 'cluster_id': 'C1'},
    ]
    
    count = db.insert_dt_log_batch(logs)
    # Should insert valid logs despite failures
    assert count >= 1
