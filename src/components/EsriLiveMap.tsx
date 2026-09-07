import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';

export interface MapSamplePoint {
  id: string;
  rowIdx: number;
  lat: number;
  lon: number;
  rsrp: number;
  sinr: number;
  tput?: number;
  cellId: string;
  pci?: string;
  color: string;
}

export interface MapWorstSpot {
  spot: string;
  rsrp: string;
  sinr: string;
  rawRsrp: number;
  rawSinr: number;
  issue: string;
  rec: string;
  lat?: number;
  lon?: number;
}

export interface CellTower {
  id: string;
  name: string;
  lat: number;
  lon: number;
  azimuths: number[];
  color: string;
}

export interface EsriLiveMapProps {
  samples: MapSamplePoint[];
  worstSpots: MapWorstSpot[];
  cellTowers?: CellTower[];
  selectedSpot?: any;
  onSelectSample?: (rowIdx: number, sample: MapSamplePoint) => void;
  onSelectWorstSpot?: (spot: MapWorstSpot) => void;
  showSectors?: boolean;
  showSamples?: boolean;
  showWorstSpots?: boolean;
}

// ── Free Esri Basemap Services (Public, No API Key Required) ──
const ESRI_BASEMAPS = {
  darkGray: {
    name: 'Esri Dark Gray',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    reference: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16,
  },
  satellite: {
    name: 'Esri Satellite',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    reference: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 19,
  },
  streets: {
    name: 'Esri Streets',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, TomTom',
    maxZoom: 19,
  },
  topo: {
    name: 'Esri Topographic',
    base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, USGS, NOAA',
    maxZoom: 19,
  },
};

type BasemapKey = keyof typeof ESRI_BASEMAPS;

// Geodesic coordinate calculation for antenna azimuth sector wedges
function getDestinationLatLng(lat: number, lon: number, distanceMeters: number, bearingDeg: number): [number, number] {
  const R = 6371e3; // Earth radius
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const deg = (rad: number) => (rad * 180) / Math.PI;
  const φ1 = rad(lat);
  const λ1 = rad(lon);
  const θ = rad(bearingDeg);

  const φ2 = Math.asin(Math.sin(φ1) * Math.cos(distanceMeters / R) + Math.cos(φ1) * Math.sin(distanceMeters / R) * Math.cos(θ));
  const λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(distanceMeters / R) * Math.cos(φ1), Math.cos(distanceMeters / R) - Math.sin(φ1) * Math.sin(φ2));

  return [deg(φ2), deg(λ2)];
}

function createSectorPolygon(lat: number, lon: number, azimuth: number, beamwidth = 65, radiusMeters = 320): [number, number][] {
  const points: [number, number][] = [[lat, lon]];
  const startAngle = azimuth - beamwidth / 2;
  const endAngle = azimuth + beamwidth / 2;
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const angle = startAngle + (i / steps) * (endAngle - startAngle);
    points.push(getDestinationLatLng(lat, lon, radiusMeters, angle));
  }
  points.push([lat, lon]);
  return points;
}

export default function EsriLiveMap({
  samples,
  worstSpots,
  cellTowers = [],
  selectedSpot,
  onSelectSample,
  onSelectWorstSpot,
  showSectors = true,
  showSamples = true,
  showWorstSpots = true,
}: EsriLiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const refTileLayerRef = useRef<L.TileLayer | null>(null);

  // Layer groups
  const sampleGroupRef = useRef<L.LayerGroup | null>(null);
  const towerGroupRef = useRef<L.LayerGroup | null>(null);
  const worstGroupRef = useRef<L.LayerGroup | null>(null);
  const routeGroupRef = useRef<L.Polyline | null>(null);

  const [activeBasemap, setActiveBasemap] = useState<BasemapKey>('darkGray');
  const [showRouteLine, setShowRouteLine] = useState(true);
  const [mapCenterInfo, setMapCenterInfo] = useState<string>('Live Sync Active');

  // Compute bounding center or fallback
  const mapCenter = useMemo<[number, number]>(() => {
    if (samples.length > 0) {
      const validPoints = samples.filter(s => !isNaN(s.lat) && !isNaN(s.lon));
      if (validPoints.length > 0) {
        const avgLat = validPoints.reduce((acc, p) => acc + p.lat, 0) / validPoints.length;
        const avgLon = validPoints.reduce((acc, p) => acc + p.lon, 0) / validPoints.length;
        return [avgLat, avgLon];
      }
    }
    return [-6.2185, 106.8250]; // Default: Jakarta RF Cluster
  }, [samples]);

  // ── Initialize Leaflet Map ──
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    // Add minimal zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Initial Esri Base Tile Layer
    const cfg = ESRI_BASEMAPS[activeBasemap];
    const baseLayer = L.tileLayer(cfg.base, {
      maxZoom: cfg.maxZoom,
      attribution: cfg.attribution,
    }).addTo(map);
    baseTileLayerRef.current = baseLayer;

    // Optional reference/labels layer (for Dark Gray & Satellite)
    if ('reference' in cfg && cfg.reference) {
      const refLayer = L.tileLayer(cfg.reference, { maxZoom: cfg.maxZoom }).addTo(map);
      refTileLayerRef.current = refLayer;
    }

    // Initialize Layer Groups
    sampleGroupRef.current = L.layerGroup().addTo(map);
    towerGroupRef.current = L.layerGroup().addTo(map);
    worstGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    // Fix map rendering sizing upon mount & container visibility
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // ── Switch Esri Basemap Layer ──
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
    }
    if (refTileLayerRef.current) {
      map.removeLayer(refTileLayerRef.current);
      refTileLayerRef.current = null;
    }

    const cfg = ESRI_BASEMAPS[activeBasemap];
    const newBase = L.tileLayer(cfg.base, {
      maxZoom: cfg.maxZoom,
      attribution: cfg.attribution,
    }).addTo(map);
    baseTileLayerRef.current = newBase;

    if ('reference' in cfg && cfg.reference) {
      const newRef = L.tileLayer(cfg.reference, { maxZoom: cfg.maxZoom }).addTo(map);
      refTileLayerRef.current = newRef;
    }
  }, [activeBasemap]);

  // ── Sync Sample Points & Route Polyline ──
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = sampleGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();
    if (routeGroupRef.current) {
      map.removeLayer(routeGroupRef.current);
      routeGroupRef.current = null;
    }

    if (!showSamples || samples.length === 0) return;

    const latlngs: [number, number][] = [];

    samples.forEach(s => {
      if (isNaN(s.lat) || isNaN(s.lon)) return;
      latlngs.push([s.lat, s.lon]);

      // Circle marker for RF sample
      const marker = L.circleMarker([s.lat, s.lon], {
        radius: 5,
        fillColor: s.color,
        color: '#0d0d12',
        weight: 1.5,
        opacity: 0.9,
        fillOpacity: 0.9,
      });

      // Tooltip with RF info
      marker.bindTooltip(
        `<b>${s.cellId}</b><br/>RSRP: <span style="color:${s.color};font-weight:bold">${s.rsrp} dBm</span><br/>SINR: ${s.sinr} dB`,
        {
          direction: 'top',
          className: 'custom-rf-tooltip',
          offset: [0, -5],
        }
      );

      // Popup with full interactive card
      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;font-size:11px;min-width:160px;color:#18181b;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;border-bottom:1px solid #e4e4e7;padding-bottom:2px;">
            <b style="color:#4f46e5;">${s.cellId}</b>
            <span style="font-size:9px;background:#f4f4f5;padding:1px 4px;border-radius:3px;">Row #${s.rowIdx + 1}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:4px;">
            <div><b>RSRP:</b> <span style="color:${s.color};font-weight:700;">${s.rsrp} dBm</span></div>
            <div><b>SINR:</b> ${s.sinr} dB</div>
            <div><b>Throughput:</b> ${s.tput ?? 'N/A'} M</div>
            <div><b>PCI:</b> ${s.pci ?? 'N/A'}</div>
          </div>
          <div style="font-size:9px;color:#71717a;margin-top:4px;">
            📍 ${s.lat.toFixed(5)}, ${s.lon.toFixed(5)}
          </div>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectSample) onSelectSample(s.rowIdx, s);
      });

      marker.addTo(group);
    });

    // Draw connecting drive test trajectory polyline
    if (showRouteLine && latlngs.length > 1) {
      const polyline = L.polyline(latlngs, {
        color: '#38bdf8',
        weight: 2,
        opacity: 0.5,
        dashArray: '4, 4',
      }).addTo(map);
      routeGroupRef.current = polyline;
    }

    // Auto-fit bounds if we have points and this is initial or big update
    if (latlngs.length > 0) {
      setMapCenterInfo(`${latlngs.length} Points Synced`);
    }
  }, [samples, showSamples, showRouteLine]);

  // ── Sync Cell Towers & Sector Lobes ──
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = towerGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();
    if (!showSectors || cellTowers.length === 0) return;

    cellTowers.forEach(tower => {
      // 1. Tower Base Marker
      const towerIcon = L.divIcon({
        className: 'custom-tower-marker',
        html: `
          <div style="
            width: 22px; height: 22px;
            background: #111118;
            border: 2px solid ${tower.color};
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.5);
            cursor: pointer;
          ">
            <span style="width: 6px; height: 6px; background: #fff; border-radius: 50%;"></span>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      const tMarker = L.marker([tower.lat, tower.lon], { icon: towerIcon });
      tMarker.bindTooltip(`<b>${tower.name}</b><br/>${tower.azimuths.length} Sectors (${tower.azimuths.join('°, ')}°)`, {
        direction: 'top',
        offset: [0, -10],
      });
      tMarker.addTo(group);

      // 2. Sector Azimuth Wedges
      tower.azimuths.forEach((az, idx) => {
        const polyCoords = createSectorPolygon(tower.lat, tower.lon, az, 60, 260);
        const sectorPolygon = L.polygon(polyCoords, {
          color: tower.color,
          weight: 1,
          opacity: 0.7,
          fillColor: tower.color,
          fillOpacity: 0.22,
        });

        sectorPolygon.bindTooltip(
          `<b>${tower.id}_Sec${idx + 1}</b><br/>Azimuth: <b>${az}°</b><br/>Site: ${tower.name}`,
          { direction: 'center' }
        );

        sectorPolygon.addTo(group);

        // Center centerline of antenna beam
        const beamTip = getDestinationLatLng(tower.lat, tower.lon, 280, az);
        L.polyline([[tower.lat, tower.lon], beamTip], {
          color: tower.color,
          weight: 1.5,
          opacity: 0.85,
        }).addTo(group);
      });
    });
  }, [cellTowers, showSectors]);

  // ── Sync Worst Spots (Pulsing High-Priority Markers) ──
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = worstGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();
    if (!showWorstSpots || worstSpots.length === 0) return;

    worstSpots.forEach((ws, idx) => {
      // Find coordinates from worst spot or fallback to sample
      let lat = ws.lat;
      let lon = ws.lon;

      if (!lat || !lon) {
        // Find matching cell in samples
        const found = samples.find(s => s.cellId === ws.spot);
        if (found) {
          lat = found.lat;
          lon = found.lon;
        } else if (samples[idx]) {
          lat = samples[idx].lat;
          lon = samples[idx].lon;
        }
      }

      if (!lat || !lon || isNaN(lat) || isNaN(lon)) return;

      const markerHtml = `
        <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 26px; height: 26px; border-radius: 50%; background: #ef4444; opacity: 0.45; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; width: 14px; height: 14px; border-radius: 50%; background: #ef4444; border: 2px solid #fff; box-shadow: 0 0 8px #ef4444;"></div>
        </div>
      `;

      const worstIcon = L.divIcon({
        className: 'worst-spot-icon',
        html: markerHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const wMarker = L.marker([lat, lon], { icon: worstIcon });
      wMarker.bindPopup(`
        <div style="font-family:Inter,sans-serif;font-size:11px;min-width:180px;color:#18181b;">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #ef4444;padding-bottom:3px;margin-bottom:4px;">
            <b style="color:#ef4444;font-size:12px;">⚠️ Worst Spot: ${ws.spot}</b>
          </div>
          <div style="margin-bottom:4px;">
            <b>RSRP:</b> <span style="color:#ef4444;font-weight:700;">${ws.rsrp}</span> | <b>SINR:</b> ${ws.sinr}
          </div>
          <div style="background:#fef2f2;border:1px solid #fecaca;padding:4px 6px;border-radius:4px;margin-bottom:4px;">
            <b style="color:#991b1b;">RCA Issue:</b><br/>${ws.issue}
          </div>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:4px 6px;border-radius:4px;">
            <b style="color:#166534;">Recommendation:</b><br/>${ws.rec}
          </div>
        </div>
      `);

      wMarker.on('click', () => {
        if (onSelectWorstSpot) onSelectWorstSpot(ws);
      });

      wMarker.addTo(group);
    });
  }, [worstSpots, samples, showWorstSpots]);

  // ── Reactive Focus when selectedSpot changes ──
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedSpot) return;

    let targetLat: number | undefined;
    let targetLon: number | undefined;

    if (selectedSpot.lat && selectedSpot.lon) {
      targetLat = Number(selectedSpot.lat);
      targetLon = Number(selectedSpot.lon);
    } else {
      const match = samples.find(s => s.cellId === selectedSpot.id || s.cellId === selectedSpot.site);
      if (match) {
        targetLat = match.lat;
        targetLon = match.lon;
      }
    }

    if (targetLat && targetLon && !isNaN(targetLat) && !isNaN(targetLon)) {
      map.flyTo([targetLat, targetLon], 16, { animate: true, duration: 0.8 });
    }
  }, [selectedSpot, samples]);

  // Handle "Fit to Bounds" button
  const handleFitBounds = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const validPoints = samples.filter(s => !isNaN(s.lat) && !isNaN(s.lon));
    if (validPoints.length > 0) {
      const bounds = L.latLngBounds(validPoints.map(p => [p.lat, p.lon]));
      map.fitBounds(bounds, { padding: [30, 30] });
    } else {
      map.setView([-6.2185, 106.8250], 14);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 8 }}>
      {/* ── Subheader Controls Bar ── */}
      <div
        style={{
          background: '#14141d',
          border: '1px solid #27272a',
          borderRadius: 8,
          padding: '6px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Row 1: Basemap Selector (Free Esri Services) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 10, color: '#38bdf8', fontWeight: 700, letterSpacing: '0.04em' }}>ESRI BASEMAP:</span>
          </div>

          <div style={{ display: 'flex', gap: 2, background: '#0a0a0f', padding: 2, borderRadius: 6, border: '1px solid #27272a' }}>
            {(['darkGray', 'satellite', 'streets', 'topo'] as BasemapKey[]).map(key => (
              <button
                key={key}
                onClick={() => setActiveBasemap(key)}
                style={{
                  padding: '3px 7px',
                  fontSize: 10,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeBasemap === key ? 600 : 400,
                  background: activeBasemap === key ? '#2563eb' : 'transparent',
                  color: activeBasemap === key ? '#fff' : '#a1a1aa',
                  whiteSpace: 'nowrap',
                }}
                title={`Gunakan basemap gratis Esri: ${ESRI_BASEMAPS[key].name}`}
              >
                {key === 'darkGray' ? 'Dark' : key === 'satellite' ? 'Satellite' : key === 'streets' ? 'Streets' : 'Topo'}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Layer & Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => setShowRouteLine(v => !v)}
              style={{
                padding: '2px 6px',
                fontSize: 9,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                background: showRouteLine ? '#0369a1' : '#27272a',
                color: showRouteLine ? '#e0f2fe' : '#71717a',
              }}
              title="Tampilkan garis lintasan drive test"
            >
              Route Line
            </button>

            <button
              onClick={handleFitBounds}
              style={{
                padding: '2px 6px',
                fontSize: 9,
                borderRadius: 4,
                border: '1px solid #3f3f46',
                cursor: 'pointer',
                background: '#181822',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
              title="Pusatkan peta ke semua sampel data"
            >
              <i className="ri-focus-3-line"></i> Center Data
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                fontSize: 9,
                color: '#4ade80',
                background: '#052e16',
                border: '1px solid #166534',
                borderRadius: 4,
                padding: '1px 5px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {mapCenterInfo}
            </span>
          </div>
        </div>
      </div>

      {/* ── Leaflet Interactive GIS Canvas ── */}
      <div
        style={{
          flex: 1,
          minHeight: 280,
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid #27272a',
          position: 'relative',
        }}
      >
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: 280, background: '#0a0a0f' }} />

        {/* Floating RF Signal Color Legend */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            zIndex: 1000,
            background: 'rgba(17, 17, 24, 0.88)',
            backdropFilter: 'blur(4px)',
            border: '1px solid #27272a',
            borderRadius: 6,
            padding: '5px 8px',
            fontSize: 9,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ fontWeight: 600, color: '#e4e4e7', marginBottom: 1 }}>RSRP Coverage</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
            <span style={{ color: '#d4d4d8' }}>≥ -85 dBm (Exc)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#84cc16' }}></span>
            <span style={{ color: '#d4d4d8' }}>-85 to -95 (Good)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }}></span>
            <span style={{ color: '#d4d4d8' }}>-95 to -105 (Fair)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}></span>
            <span style={{ color: '#d4d4d8' }}>&lt; -105 dBm (Poor)</span>
          </div>
        </div>

        {/* Free Esri Attribution Ribbon */}
        <div
          style={{
            position: 'absolute',
            bottom: 2,
            right: 8,
            zIndex: 1000,
            fontSize: '8px',
            color: '#a1a1aa',
            background: 'rgba(10, 10, 15, 0.75)',
            padding: '1px 5px',
            borderRadius: 3,
            pointerEvents: 'none',
          }}
        >
          Basemap: Esri (Free ArcGIS Online)
        </div>
      </div>
    </div>
  );
}
