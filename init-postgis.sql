-- init-postgis.sql — Initialize PostGIS schema for RF-Copilot
-- Runs automatically when postgres container starts

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Cell Master table
CREATE TABLE IF NOT EXISTS cell_master (
    id SERIAL PRIMARY KEY,
    site_id VARCHAR(50) NOT NULL,
    cell_id VARCHAR(50) NOT NULL UNIQUE,
    lat DECIMAL(10, 8) NOT NULL,
    lon DECIMAL(11, 8) NOT NULL,
    azimuth SMALLINT,
    tilt SMALLINT,
    band VARCHAR(10),
    pci INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spatial index on cell locations
CREATE INDEX idx_cell_geom ON cell_master USING GIST (
    ST_GeomFromText('POINT(' || lon || ' ' || lat || ')', 4326)
);
CREATE INDEX idx_cell_band ON cell_master(band);
CREATE INDEX idx_cell_site ON cell_master(site_id);

-- DT Log table (daily partitioning ready)
CREATE TABLE IF NOT EXISTS dt_logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    lat DECIMAL(10, 8) NOT NULL,
    lon DECIMAL(11, 8) NOT NULL,
    rsrp SMALLINT,
    sinr SMALLINT,
    throughput_dl INTEGER,
    throughput_ul INTEGER,
    cell_id VARCHAR(50),
    band VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cell FOREIGN KEY (cell_id) REFERENCES cell_master(cell_id) ON DELETE SET NULL
);

-- Indexes for DT logs
CREATE INDEX idx_dt_timestamp ON dt_logs(timestamp);
CREATE INDEX idx_dt_cell ON dt_logs(cell_id);
CREATE INDEX idx_dt_band ON dt_logs(band);
CREATE INDEX idx_dt_geom ON dt_logs USING GIST (
    ST_GeomFromText('POINT(' || lon || ' ' || lat || ')', 4326)
);

-- KPI Summary table (for caching)
CREATE TABLE IF NOT EXISTS kpi_summary (
    id SERIAL PRIMARY KEY,
    cell_id VARCHAR(50) NOT NULL REFERENCES cell_master(cell_id),
    date DATE NOT NULL,
    avg_rsrp DECIMAL(5, 2),
    avg_sinr DECIMAL(5, 2),
    avg_throughput_dl INTEGER,
    avg_throughput_ul INTEGER,
    p5_rsrp DECIMAL(5, 2),
    p95_rsrp DECIMAL(5, 2),
    samples INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cell_id, date)
);

CREATE INDEX idx_kpi_cell_date ON kpi_summary(cell_id, date);

-- Grant privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO telecom;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO telecom;
