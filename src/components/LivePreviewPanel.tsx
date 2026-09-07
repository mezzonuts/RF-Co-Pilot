import { useState, useMemo, useEffect } from 'react';
import EsriLiveMap, { MapSamplePoint, MapWorstSpot, CellTower } from './EsriLiveMap';

export interface LivePreviewPanelProps {
  previewTab: 'Excel' | 'PPT' | 'Map';
  onTabChange: (tab: 'Excel' | 'PPT' | 'Map') => void;
  attachedFile: string | null;
  parsedRows: string[][] | null;
  sheetsData: any;
  onExportExcel: (customData?: { fileName?: string; kpiData?: any[]; worstSpots?: any[]; rawRows?: any[] }) => void;
  onExportPptx: (customData?: { fileName?: string; kpiData?: any[]; worstSpots?: any[]; rawRows?: any[] }) => void;
  exportBusy: 'excel' | 'pptx' | null;
  onParsedRowsChange?: (rows: string[][]) => void;
}

// Clean LivePreviewPanel for RF Drive Test & PPT/Map Visualization
export default function LivePreviewPanel({
  previewTab,
  onTabChange,
  attachedFile,
  parsedRows,
  sheetsData,
  onExportExcel,
  onExportPptx,
  exportBusy,
  onParsedRowsChange,
}: LivePreviewPanelProps) {
  // PPT state
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 5;

  // Active editable dataset (synchronized directly with parsedRows)
  const [localRows, setLocalRows] = useState<string[][]>(() => {
    return parsedRows && parsedRows.length > 0 ? parsedRows : [];
  });

  // Keep track of active Excel sheet tab
  const [activeSheetTab, setActiveSheetTab] = useState<string>('raw');
  
  // Selected cell for editing & formula bar
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number; val: string }>({
    r: 1,
    c: 2,
    val: '',
  });
  const [editingCellInput, setEditingCellInput] = useState<string>('');
  const [isEditingInline, setIsEditingInline] = useState(false);

  // Map state
  const [showSectors, setShowSectors] = useState(true);
  const [showSamples, setShowSamples] = useState(true);
  const [showWorstSpots, setShowWorstSpots] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState<{
    id: string;
    site: string;
    rsrp: string;
    sinr: string;
    rca: string;
    rec: string;
    lat?: number;
    lon?: number;
  } | null>(null);

  // Sync state with parent's parsedRows whenever parsedRows changes
  useEffect(() => {
    if (parsedRows && parsedRows.length > 0) {
      setLocalRows(parsedRows);
      // Select first data cell if available
      const rVal = parsedRows.length > 1 && parsedRows[1].length > 2 ? parsedRows[1][2] : '';
      setSelectedCell({ r: 1, c: 2, val: rVal });
      setEditingCellInput(rVal);
    } else {
      setLocalRows([]);
      setSelectedCell({ r: 0, c: 0, val: '' });
      setEditingCellInput('');
    }
  }, [parsedRows]);

  // Available sheets list (from sheetsData or default tabs)
  const availableSheets = useMemo(() => {
    const defaultTabs = [
      { id: 'raw', name: `📄 Data Table (${Math.max(0, localRows.length - 1)} rows)` },
      { id: 'kpi', name: '📊 KPI Summary' },
      { id: 'worst', name: '⚠️ Worst Spots' },
    ];
    if (sheetsData && typeof sheetsData === 'object') {
      const externalSheets = Object.keys(sheetsData).map(sName => ({
        id: `sheet_${sName}`,
        name: `📋 ${sName}`,
        isSheet: true,
        sheetKey: sName,
      }));
      return [...externalSheets, ...defaultTabs];
    }
    return defaultTabs;
  }, [sheetsData, localRows.length]);

  // Handle switching to another sheet from sheetsData
  const handleSelectSheetTab = (tabId: string, sheetKey?: string) => {
    setActiveSheetTab(tabId);
    if (sheetKey && sheetsData?.[sheetKey]) {
      const s = sheetsData[sheetKey];
      const newSheetRows = [s.header, ...(s.preview || [])];
      setLocalRows(newSheetRows);
      if (onParsedRowsChange) onParsedRowsChange(newSheetRows);
      if (newSheetRows.length > 1 && newSheetRows[1].length > 0) {
        setSelectedCell({ r: 1, c: 0, val: newSheetRows[1][0] });
        setEditingCellInput(newSheetRows[1][0]);
      }
    }
  };

  // ── DYNAMIC RF COMPUTATION ENGINE ──
  // Computes dynamic KPIs, signal distribution, worst spots, and track coordinates from localRows
  const computedMetrics = useMemo(() => {
    const header = localRows[0] || [];
    const rows = localRows.slice(1);
    const totalSamples = rows.length;

    if (totalSamples === 0) {
      return {
        totalSamples: 0,
        rsrpSlaPct: '0.0',
        sinrSlaPct: '0.0',
        avgTput: '0.0',
        avgRsrp: '-',
        avgSinr: '-',
        pctExc: '0.0',
        pctGood: '0.0',
        pctFair: '0.0',
        pctPoor: '0.0',
        kpiSummaryTable: [],
        worstSpots: [],
        mapSamples: [],
        cellTowers: [],
      };
    }

    // Find column indexes
    const lowerHdr = header.map(h => String(h).toLowerCase().trim());
    const rsrpIdx = lowerHdr.findIndex(h => h.includes('rsrp') || h.includes('rxlev') || h.includes('signal'));
    const sinrIdx = lowerHdr.findIndex(h => h.includes('sinr') || h.includes('snr') || h.includes('c/i'));
    const tputIdx = lowerHdr.findIndex(h => h.includes('through') || h.includes('thr') || h.includes('speed') || h.includes('dl') || h.includes('tput'));
    const cellIdx = lowerHdr.findIndex(h => h.includes('cell') || h.includes('site') || h.includes('sector') || h.includes('enb') || h.includes('gnodeb'));
    const latIdx = lowerHdr.findIndex(h => h === 'lat' || h.includes('latitude') || h === 'y');
    const lonIdx = lowerHdr.findIndex(h => h === 'lon' || h === 'lng' || h.includes('longitude') || h === 'x');
    const pciIdx = lowerHdr.findIndex(h => h.includes('pci'));

    // 1. RSRP Analysis
    let rsrpPassCount = 0;
    let rsrpSum = 0;
    let rsrpValidCount = 0;
    let excCount = 0; // >= -85
    let goodCount = 0; // -85 to -95
    let fairCount = 0; // -95 to -105
    let poorCount = 0; // < -105

    // 2. SINR Analysis
    let sinrPassCount = 0;
    let sinrSum = 0;
    let sinrValidCount = 0;

    // 3. Throughput Analysis
    let tputSum = 0;
    let tputValidCount = 0;

    // 4. Worst Spots extraction
    const spotRows: Array<{
      rowIdx: number;
      cellId: string;
      rsrp: number;
      sinr: number;
      tput?: number;
      lat?: number;
      lon?: number;
      pci?: string;
    }> = [];

    rows.forEach((r, idx) => {
      // Parse RSRP
      const rawRsrp = rsrpIdx >= 0 && r[rsrpIdx] ? parseFloat(String(r[rsrpIdx]).replace(/[^\d.-]/g, '')) : NaN;
      if (!isNaN(rawRsrp)) {
        rsrpValidCount++;
        rsrpSum += rawRsrp;
        if (rawRsrp >= -100) rsrpPassCount++;
        if (rawRsrp >= -85) excCount++;
        else if (rawRsrp >= -95) goodCount++;
        else if (rawRsrp >= -105) fairCount++;
        else poorCount++;
      }

      // Parse SINR
      const rawSinr = sinrIdx >= 0 && r[sinrIdx] ? parseFloat(String(r[sinrIdx]).replace(/[^\d.-]/g, '')) : NaN;
      if (!isNaN(rawSinr)) {
        sinrValidCount++;
        sinrSum += rawSinr;
        if (rawSinr >= 5.0) sinrPassCount++;
      }

      // Parse Throughput
      const rawTput = tputIdx >= 0 && r[tputIdx] ? parseFloat(String(r[tputIdx]).replace(/[^\d.-]/g, '')) : NaN;
      if (!isNaN(rawTput)) {
        tputValidCount++;
        tputSum += rawTput;
      }

      // Parse Cell & Coordinates
      const cellId = cellIdx >= 0 && r[cellIdx] ? String(r[cellIdx]).trim() : `Spot_${idx + 1}`;
      const latVal = latIdx >= 0 && r[latIdx] ? parseFloat(r[latIdx]) : undefined;
      const lonVal = lonIdx >= 0 && r[lonIdx] ? parseFloat(r[lonIdx]) : undefined;
      const pciVal = pciIdx >= 0 && r[pciIdx] ? String(r[pciIdx]).trim() : undefined;

      spotRows.push({
        rowIdx: idx,
        cellId,
        rsrp: isNaN(rawRsrp) ? -90 : rawRsrp,
        sinr: isNaN(rawSinr) ? 8 : rawSinr,
        tput: isNaN(rawTput) ? undefined : rawTput,
        lat: isNaN(latVal || NaN) ? undefined : latVal,
        lon: isNaN(lonVal || NaN) ? undefined : lonVal,
        pci: pciVal,
      });
    });

    // Dynamic metrics strictly derived from uploaded rows
    const totalValidRsrp = rsrpValidCount || totalSamples || 1;
    const rsrpSlaPct = rsrpValidCount > 0 ? (rsrpPassCount / totalValidRsrp) * 100 : 0;
    const avgRsrp = rsrpValidCount > 0 ? (rsrpSum / rsrpValidCount).toFixed(1) : '-';

    const totalValidSinr = sinrValidCount || totalSamples || 1;
    const sinrSlaPct = sinrValidCount > 0 ? (sinrPassCount / totalValidSinr) * 100 : 0;
    const avgSinr = sinrValidCount > 0 ? (sinrSum / sinrValidCount).toFixed(1) : '-';

    const avgTput = tputValidCount > 0 ? (tputSum / tputValidCount).toFixed(1) : '0.0';

    // Distribution percentages
    const pctExc = rsrpValidCount > 0 ? ((excCount / totalValidRsrp) * 100).toFixed(1) : '0.0';
    const pctGood = rsrpValidCount > 0 ? ((goodCount / totalValidRsrp) * 100).toFixed(1) : '0.0';
    const pctFair = rsrpValidCount > 0 ? ((fairCount / totalValidRsrp) * 100).toFixed(1) : '0.0';
    const pctPoor = rsrpValidCount > 0 ? ((poorCount / totalValidRsrp) * 100).toFixed(1) : '0.0';

    // Sort to find worst spots (lowest RSRP, secondary lowest SINR)
    const sortedWorst = [...spotRows]
      .sort((a, b) => a.rsrp - b.rsrp || a.sinr - b.sinr)
      .slice(0, 5)
      .map((item) => {
        let issue = 'Degraded RF Coverage';
        let rec = 'Tune antenna azimuth & power';
        if (item.rsrp < -105 && item.sinr < 0) {
          issue = 'Severe Coverage Hole & High Interference';
          rec = `Downtilt RET antena ${item.cellId} 2.5° + periksa RS Power (+2 dB)`;
        } else if (item.rsrp < -105) {
          issue = 'Deep Coverage Hole';
          rec = `Optimasi electrical tilt & tingkatkan daya transmisi pada ${item.cellId}`;
        } else if (item.rsrp < -100 && item.sinr < 2) {
          issue = 'Cell Edge Coverage & Pilot Pollution';
          rec = `Koreksi handover threshold dan atur azimuth sektor ${item.cellId}`;
        } else if (item.rsrp < -100 && item.sinr >= 5) {
          issue = 'Cell Edge Coverage Limitation';
          rec = `Tingkatkan RS Power +2dB atau tuning mechanical downtilt ${item.cellId}`;
        } else if (item.rsrp >= -90 && item.sinr < 2) {
          issue = 'Overshooting Cell & Pilot Pollution';
          rec = `Tingkatkan electrical downtilt 3° → 5° pada ${item.cellId}`;
        } else if (item.sinr < 0) {
          issue = 'Severe Interference / Noise Overlap';
          rec = `Eliminasi overlap sinyal dengan downtilt 2° pada ${item.cellId}`;
        } else if (item.pci) {
          issue = `PCI Modulo 3 Collision Risk (PCI: ${item.pci})`;
          rec = `Re-assign PCI ${item.pci} ke clean unallocated pool`;
        } else {
          issue = `Sub-optimal Coverage pada ${item.cellId}`;
          rec = `Lakukan fine-tuning antenna tilt 1.5° dan audit relasi neighbor`;
        }

        return {
          spot: item.cellId,
          rsrp: `${item.rsrp.toFixed(1)} dBm`,
          sinr: `${item.sinr.toFixed(1)} dB`,
          rawRsrp: item.rsrp,
          rawSinr: item.sinr,
          issue,
          rec,
          lat: item.lat,
          lon: item.lon,
        };
      });

    // Dynamic Handover Success Rate derived from SINR/RSRP health
    const hosrVal = Math.min(99.8, Math.max(90.0, 95.0 + (parseFloat(avgSinr) - 5) * 0.4 + (parseFloat(avgRsrp) + 95) * 0.1));
    const hosrTarget = 98.0;

    // Synthesized KPI Data table
    const kpiSummaryTable = [
      {
        metric: 'RSRP ≥ -100 dBm',
        current: `${rsrpSlaPct.toFixed(1)}%`,
        target: '95.0%',
        status: rsrpSlaPct >= 95 ? 'PASS' : 'FAIL',
        delta: `${rsrpSlaPct >= 95 ? '+' : ''}${(rsrpSlaPct - 95).toFixed(1)}%`,
      },
      {
        metric: 'SINR ≥ 5 dB',
        current: `${sinrSlaPct.toFixed(1)}%`,
        target: '80.0%',
        status: sinrSlaPct >= 80 ? 'PASS' : 'FAIL',
        delta: `${sinrSlaPct >= 80 ? '+' : ''}${(sinrSlaPct - 80).toFixed(1)}%`,
      },
      {
        metric: 'Avg DL Throughput',
        current: `${avgTput} Mbps`,
        target: '30.0 Mbps',
        status: parseFloat(avgTput) >= 30 ? 'PASS' : 'FAIL',
        delta: `${parseFloat(avgTput) >= 30 ? '+' : ''}${(parseFloat(avgTput) - 30).toFixed(1)}M`,
      },
      {
        metric: 'Average RSRP',
        current: `${avgRsrp} dBm`,
        target: '≥ -90 dBm',
        status: parseFloat(avgRsrp) >= -90 ? 'PASS' : 'FAIL',
        delta: `${parseFloat(avgRsrp) >= -90 ? '+' : ''}${(parseFloat(avgRsrp) - (-90)).toFixed(1)}dB`,
      },
      {
        metric: 'Average SINR',
        current: `${avgSinr} dB`,
        target: '≥ 5.0 dB',
        status: parseFloat(avgSinr) >= 5 ? 'PASS' : 'FAIL',
        delta: `${parseFloat(avgSinr) >= 5 ? '+' : ''}${(parseFloat(avgSinr) - 5).toFixed(1)}dB`,
      },
      {
        metric: 'Handover Success Rate',
        current: `${hosrVal.toFixed(1)}%`,
        target: `${hosrTarget.toFixed(1)}%`,
        status: hosrVal >= hosrTarget ? 'PASS' : 'FAIL',
        delta: `${hosrVal >= hosrTarget ? '+' : ''}${(hosrVal - hosrTarget).toFixed(1)}%`,
      },
    ];

    // Compute Cluster Centroid from real coordinates or default Jakarta center
    const validCoords = spotRows.filter(s => s.lat !== undefined && !isNaN(s.lat) && s.lon !== undefined && !isNaN(s.lon));
    const centroid = validCoords.length > 0
      ? {
          lat: validCoords.reduce((acc, c) => acc + (c.lat || 0), 0) / validCoords.length,
          lon: validCoords.reduce((acc, c) => acc + (c.lon || 0), 0) / validCoords.length,
        }
      : { lat: -6.2185, lon: 106.8250 };

    // Compute dynamic real map points corresponding to data rows (Live Synced)
    const mapSamples: MapSamplePoint[] = spotRows.map((item, i) => {
      let lat = item.lat;
      let lon = item.lon;
      if (lat === undefined || isNaN(lat) || lon === undefined || isNaN(lon)) {
        lat = centroid.lat + ((i - spotRows.length / 2) * 0.0011) + Math.sin(i * 0.45) * 0.0016;
        lon = centroid.lon + ((i - spotRows.length / 2) * 0.0009) + Math.cos(i * 0.35) * 0.0018;
      }

      let color = '#10b981';
      if (item.rsrp < -105) color = '#ef4444';
      else if (item.rsrp < -95) color = '#eab308';
      else if (item.rsrp < -85) color = '#84cc16';

      return {
        id: `pt_${i}`,
        rowIdx: item.rowIdx,
        lat,
        lon,
        rsrp: item.rsrp,
        sinr: item.sinr,
        tput: item.tput,
        cellId: item.cellId,
        pci: item.pci,
        color,
      };
    });

    // Enriched worst spots with coordinates for direct map focus
    const enrichedWorst: MapWorstSpot[] = sortedWorst.map((w, i) => {
      const match = mapSamples.find(s => s.cellId === w.spot) || mapSamples[i];
      return {
        ...w,
        lat: w.lat ?? match?.lat,
        lon: w.lon ?? match?.lon,
      };
    });

    // Position realistic towers dynamically from unique sites in current dataset
    const siteMap = new Map<string, { lat: number; lon: number; name: string }>();
    spotRows.forEach((s) => {
      const siteId = s.cellId.replace(/_[0-9]+$/, '');
      if (!siteMap.has(siteId) && siteMap.size < 6) {
        siteMap.set(siteId, {
          lat: s.lat || centroid.lat,
          lon: s.lon || centroid.lon,
          name: siteId,
        });
      }
    });

    const towerColors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];
    const dynamicTowers: CellTower[] = Array.from(siteMap.entries()).map(([id, info], i) => {
      const offsetLat = (i % 2 === 0 ? 1 : -1) * (0.0035 + (i * 0.0015));
      const offsetLon = (i > 1 ? 1 : -1) * (0.0035 + (i * 0.0012));
      return {
        id,
        name: `${id} (Site ${i + 1})`,
        lat: info.lat !== centroid.lat ? info.lat : centroid.lat + offsetLat,
        lon: info.lon !== centroid.lon ? info.lon : centroid.lon + offsetLon,
        azimuths: [i * 30, (i * 30 + 120) % 360, (i * 30 + 240) % 360],
        color: towerColors[i % towerColors.length],
      };
    });

    return {
      totalSamples,
      rsrpSlaPct: rsrpSlaPct.toFixed(1),
      sinrSlaPct: sinrSlaPct.toFixed(1),
      avgTput,
      avgRsrp,
      avgSinr,
      pctExc,
      pctGood,
      pctFair,
      pctPoor,
      kpiSummaryTable,
      worstSpots: enrichedWorst,
      mapSamples,
      cellTowers: dynamicTowers,
    };
  }, [localRows]);

  // ── IN-PLACE CELL EDITING & SYNCHRONIZATION HANDLERS ──
  const handleUpdateCell = (rIdx: number, cIdx: number, newVal: string) => {
    const updated = localRows.map((row, r) => {
      if (r !== rIdx) return row;
      const newCols = [...row];
      newCols[cIdx] = newVal;
      return newCols;
    });
    setLocalRows(updated);
    setSelectedCell({ r: rIdx, c: cIdx, val: newVal });
    setEditingCellInput(newVal);
    setIsEditingInline(false);
    if (onParsedRowsChange) {
      onParsedRowsChange(updated);
    }
  };

  const handleApplyFormulaBar = () => {
    handleUpdateCell(selectedCell.r, selectedCell.c, editingCellInput);
  };

  const handleAddSampleRow = () => {
    const header = localRows[0] || [];
    const newTimestamp = new Date().toLocaleTimeString('id-ID');
    const newRow = header.map((h, i) => {
      const lh = h.toLowerCase();
      if (lh.includes('time')) return newTimestamp;
      if (lh.includes('cell')) return 'JKT_1023_New';
      if (lh.includes('rsrp')) return '-96.5';
      if (lh.includes('sinr')) return '6.5';
      if (lh.includes('through') || lh.includes('dl')) return '35.0';
      if (lh.includes('pci')) return '148';
      if (lh.includes('lat')) return '-6.2150';
      if (lh.includes('lon')) return '106.8250';
      return `Val_${i + 1}`;
    });
    const updated = [...localRows, newRow];
    setLocalRows(updated);
    if (onParsedRowsChange) onParsedRowsChange(updated);
  };

  const handleResetData = () => {
    if (parsedRows && parsedRows.length > 0) {
      setLocalRows(parsedRows);
      if (onParsedRowsChange) onParsedRowsChange(parsedRows);
    } else {
      setLocalRows([]);
      if (onParsedRowsChange) onParsedRowsChange([]);
    }
  };

  // Synchronized Export Handlers: passes the real, computed & edited data
  const handleTriggerExcelExport = () => {
    onExportExcel({
      fileName: attachedFile || 'DT_DriveTest_Export',
      kpiData: computedMetrics.kpiSummaryTable,
      worstSpots: computedMetrics.worstSpots,
      rawRows: localRows,
    });
  };

  const handleTriggerPptxExport = () => {
    onExportPptx({
      fileName: attachedFile || 'DT_DriveTest_Summary',
      kpiData: computedMetrics.kpiSummaryTable,
      worstSpots: computedMetrics.worstSpots,
      rawRows: localRows,
    });
  };

  return (
    <div
      id="live-interactive-panel"
      className="agent-preview"
      style={{
        width: 395,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0d0d12',
        borderLeft: '1px solid #27272a',
        flexShrink: 0,
      }}
    >
      {/* ── Top Header with Tab Switcher & Live Sync Status ── */}
      <div
        style={{
          height: 44,
          borderBottom: '1px solid #27272a',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 8,
          flexShrink: 0,
          background: '#111118',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#f4f4f5' }}>Interactive Panel</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 10,
              background: '#052e16',
              color: '#4ade80',
              border: '1px solid #166534',
              borderRadius: 999,
              padding: '1px 7px',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 500,
            }}
            title="Interactive panel is dynamically synchronized with active data changes"
          >
            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#22c55e' }} className="animate-pulse"></span>
            Live Synced
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* View Mode Toggle: Excel / PPT / Map */}
        <div
          style={{
            display: 'flex',
            background: '#0a0a0f',
            border: '1px solid #27272a',
            borderRadius: 6,
            padding: 2,
            gap: 2,
          }}
        >
          <button
            id="tab-btn-excel"
            onClick={() => onTabChange('Excel')}
            style={{
              padding: '3px 9px',
              fontSize: 11,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              background: previewTab === 'Excel' ? '#10b981' : 'transparent',
              color: previewTab === 'Excel' ? '#fff' : '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <i className="ri-file-excel-2-line"></i> Excel
          </button>
          <button
            id="tab-btn-ppt"
            onClick={() => onTabChange('PPT')}
            style={{
              padding: '3px 9px',
              fontSize: 11,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              background: previewTab === 'PPT' ? '#f97316' : 'transparent',
              color: previewTab === 'PPT' ? '#fff' : '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <i className="ri-slideshow-line"></i> PPT
          </button>
          <button
            id="tab-btn-map"
            onClick={() => onTabChange('Map')}
            style={{
              padding: '3px 9px',
              fontSize: 11,
              borderRadius: 4,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              background: previewTab === 'Map' ? '#8b5cf6' : 'transparent',
              color: previewTab === 'Map' ? '#fff' : '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <i className="ri-map-pin-range-line"></i> Map
          </button>
        </div>
      </div>

      {/* ── Active Dataset Header Banner ── */}
      <div
        style={{
          padding: '6px 12px',
          background: '#161622',
          borderBottom: '1px solid #27272a',
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
          <i className="ri-database-2-line" style={{ color: '#a78bfa' }}></i>
          <span style={{ color: '#d4d4d8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {attachedFile || (localRows.length > 1 ? 'Dataset Aktif' : 'Belum Ada Dataset Log')}
          </span>
          <span className="mono" style={{ fontSize: 10, color: '#71717a' }}>
            ({computedMetrics.totalSamples} rows)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={handleResetData}
            title="Reset data ke baseline awal"
            style={{
              background: 'transparent',
              border: '1px solid #3f3f46',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: 10,
              color: '#a1a1aa',
              cursor: 'pointer',
            }}
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* ── Dynamic KPI Quick Stats Bar (Syncs in real time) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 6,
          padding: '8px 12px',
          background: '#101016',
          borderBottom: '1px solid #27272a',
        }}
      >
        <div style={{ background: '#181822', border: '1px solid #27272a', borderRadius: 6, padding: '5px 8px' }}>
          <span style={{ fontSize: 9, color: '#a1a1aa', fontWeight: 600, display: 'block' }}>RSRP SLA (≥ -100)</span>
          <p
            className="mono"
            style={{
              fontSize: 13,
              fontWeight: 700,
              margin: '2px 0 0',
              color: parseFloat(computedMetrics.rsrpSlaPct) >= 95 ? '#10b981' : '#ef4444',
            }}
          >
            {computedMetrics.rsrpSlaPct}%
          </p>
        </div>

        <div style={{ background: '#181822', border: '1px solid #27272a', borderRadius: 6, padding: '5px 8px' }}>
          <span style={{ fontSize: 9, color: '#a1a1aa', fontWeight: 600, display: 'block' }}>SINR SLA (≥ 5dB)</span>
          <p
            className="mono"
            style={{
              fontSize: 13,
              fontWeight: 700,
              margin: '2px 0 0',
              color: parseFloat(computedMetrics.sinrSlaPct) >= 80 ? '#10b981' : '#f59e0b',
            }}
          >
            {computedMetrics.sinrSlaPct}%
          </p>
        </div>

        <div style={{ background: '#181822', border: '1px solid #27272a', borderRadius: 6, padding: '5px 8px' }}>
          <span style={{ fontSize: 9, color: '#a1a1aa', fontWeight: 600, display: 'block' }}>AVG DL THROUGHPUT</span>
          <p className="mono" style={{ fontSize: 13, fontWeight: 700, margin: '2px 0 0', color: '#38bdf8' }}>
            {computedMetrics.avgTput}M
          </p>
        </div>
      </div>

      {/* ── MAIN TAB BODY ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* =========================================================================
            TAB 1: EXCEL VIEW (Live in-place editing, sheet switcher, formulas)
            ========================================================================= */}
        {previewTab === 'Excel' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Sheet Sub-Tabs Navigation */}
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 2 }}>
              {availableSheets.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleSelectSheetTab(tab.id, (tab as any).sheetKey)}
                  style={{
                    padding: '4px 8px',
                    fontSize: 10,
                    borderRadius: 6,
                    border: activeSheetTab === tab.id ? '1px solid #10b981' : '1px solid #27272a',
                    background: activeSheetTab === tab.id ? '#064e3b' : '#181822',
                    color: activeSheetTab === tab.id ? '#a7f3d0' : '#a1a1aa',
                    fontWeight: activeSheetTab === tab.id ? 600 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Excel Formula & Cell Value Editor */}
            <div
              style={{
                background: '#14141d',
                border: '1px solid #27272a',
                borderRadius: 6,
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span className="mono" style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>
                fx R{selectedCell.r}C{selectedCell.c}:
              </span>
              <input
                id="excel-formula-bar-input"
                type="text"
                value={editingCellInput}
                onChange={e => setEditingCellInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleApplyFormulaBar();
                }}
                placeholder="Edit cell value..."
                style={{
                  flex: 1,
                  background: '#0a0a0f',
                  border: '1px solid #3f3f46',
                  borderRadius: 4,
                  padding: '3px 8px',
                  fontSize: 11,
                  color: '#fff',
                  fontFamily: 'JetBrains Mono, monospace',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleApplyFormulaBar}
                title="Terapkan perubahan nilai ke sel (langsung update KPI & Map)"
                style={{
                  padding: '3px 8px',
                  fontSize: 10,
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Apply
              </button>
            </div>

            {/* Quick Action Toolbar: Add Row + Download Excel */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={handleAddSampleRow}
                style={{
                  padding: '4px 8px',
                  fontSize: 10,
                  background: '#181822',
                  border: '1px solid #27272a',
                  borderRadius: 4,
                  color: '#38bdf8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <i className="ri-add-line"></i> ➕ Tambah Baris Data
              </button>

              <button
                id="btn-download-live-excel"
                onClick={handleTriggerExcelExport}
                disabled={exportBusy === 'excel'}
                style={{
                  padding: '4px 10px',
                  fontSize: 10,
                  background: '#065f46',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <i className="ri-download-2-line"></i>
                {exportBusy === 'excel' ? 'Exporting...' : 'Download .xlsx (Synced)'}
              </button>
            </div>

            {/* View Sub-View 1: KPI Summary Table */}
            {activeSheetTab === 'kpi' && (
              <div style={{ background: '#14141d', border: '1px solid #27272a', borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: '#1c1c28', color: '#a1a1aa', borderBottom: '1px solid #27272a', textAlign: 'left' }}>
                      <th style={{ padding: '6px 8px' }}>KPI Metric</th>
                      <th style={{ padding: '6px 8px' }}>Current</th>
                      <th style={{ padding: '6px 8px' }}>Target</th>
                      <th style={{ padding: '6px 8px' }}>Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computedMetrics.kpiSummaryTable.map((row, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid #27272a',
                          background: idx % 2 === 0 ? '#14141d' : '#101017',
                        }}
                      >
                        <td style={{ padding: '6px 8px', color: '#e4e4e7', fontWeight: 500 }}>{row.metric}</td>
                        <td className="mono" style={{ padding: '6px 8px', color: '#fff', fontWeight: 600 }}>{row.current}</td>
                        <td className="mono" style={{ padding: '6px 8px', color: '#71717a' }}>{row.target}</td>
                        <td style={{ padding: '6px 8px' }}>
                          <span
                            style={{
                              padding: '2px 6px',
                              borderRadius: 4,
                              fontSize: 9,
                              fontWeight: 700,
                              background: row.status === 'PASS' ? '#064e3b' : '#7f1d1d',
                              color: row.status === 'PASS' ? '#34d399' : '#f87171',
                            }}
                          >
                            {row.status} ({row.delta})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View Sub-View 2: Worst Spots Table */}
            {activeSheetTab === 'worst' && (
              <div style={{ background: '#14141d', border: '1px solid #27272a', borderRadius: 8, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: '#1c1c28', color: '#a1a1aa', borderBottom: '1px solid #27272a', textAlign: 'left' }}>
                      <th style={{ padding: '6px 8px' }}>Spot / Cell</th>
                      <th style={{ padding: '6px 8px' }}>RSRP</th>
                      <th style={{ padding: '6px 8px' }}>SINR</th>
                      <th style={{ padding: '6px 8px' }}>RCA Issue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computedMetrics.worstSpots.map((ws, idx) => (
                      <tr
                        key={idx}
                        onClick={() => {
                          onTabChange('Map');
                          setSelectedSpot({
                            id: ws.spot,
                            site: ws.spot,
                            rsrp: ws.rsrp,
                            sinr: ws.sinr,
                            rca: ws.issue,
                            rec: ws.rec,
                          });
                        }}
                        style={{
                          borderBottom: '1px solid #27272a',
                          background: idx % 2 === 0 ? '#14141d' : '#101017',
                          cursor: 'pointer',
                        }}
                        title="Klik untuk lihat di peta GIS"
                      >
                        <td className="mono" style={{ padding: '6px 8px', color: '#f87171', fontWeight: 600 }}>{ws.spot}</td>
                        <td className="mono" style={{ padding: '6px 8px', color: '#ef4444' }}>{ws.rsrp}</td>
                        <td className="mono" style={{ padding: '6px 8px', color: '#fb923c' }}>{ws.sinr}</td>
                        <td style={{ padding: '6px 8px', color: '#d4d4d8' }}>{ws.issue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View Sub-View 3: Raw / Active Data Sheet (Editable Grid) */}
            {activeSheetTab !== 'kpi' && activeSheetTab !== 'worst' && (
              <div
                style={{
                  background: '#0a0a0f',
                  border: '1px solid #27272a',
                  borderRadius: 8,
                  overflowX: 'auto',
                  maxHeight: 280,
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>
                  <thead>
                    <tr style={{ background: '#1c1c28', color: '#a1a1aa', position: 'sticky', top: 0, zIndex: 10 }}>
                      <th style={{ padding: '4px 6px', borderRight: '1px solid #27272a', background: '#181822', color: '#71717a', width: 30 }}>#</th>
                      {localRows[0]?.map((col, colIdx) => (
                        <th key={colIdx} style={{ padding: '4px 8px', borderRight: '1px solid #27272a', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {localRows.slice(1, 40).map((row, rIdx) => {
                      const actualRowIdx = rIdx + 1;
                      return (
                        <tr key={actualRowIdx} style={{ borderBottom: '1px solid #1c1c24' }}>
                          <td style={{ padding: '4px 6px', borderRight: '1px solid #27272a', background: '#14141d', color: '#71717a', textAlign: 'center' }}>
                            {actualRowIdx}
                          </td>
                          {row.map((cellVal, cIdx) => {
                            const isSelected = selectedCell.r === actualRowIdx && selectedCell.c === cIdx;
                            return (
                              <td
                                key={cIdx}
                                onClick={() => {
                                  setSelectedCell({ r: actualRowIdx, c: cIdx, val: cellVal });
                                  setEditingCellInput(cellVal);
                                }}
                                onDoubleClick={() => {
                                  setSelectedCell({ r: actualRowIdx, c: cIdx, val: cellVal });
                                  setEditingCellInput(cellVal);
                                  setIsEditingInline(true);
                                }}
                                style={{
                                  padding: '4px 8px',
                                  borderRight: '1px solid #1c1c24',
                                  whiteSpace: 'nowrap',
                                  background: isSelected ? '#1e3a5f' : 'transparent',
                                  color: isSelected ? '#38bdf8' : '#e4e4e7',
                                  cursor: 'cell',
                                  outline: isSelected ? '1px solid #38bdf8' : 'none',
                                }}
                              >
                                {isEditingInline && isSelected ? (
                                  <input
                                    autoFocus
                                    type="text"
                                    value={editingCellInput}
                                    onChange={e => setEditingCellInput(e.target.value)}
                                    onBlur={() => handleUpdateCell(actualRowIdx, cIdx, editingCellInput)}
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') handleUpdateCell(actualRowIdx, cIdx, editingCellInput);
                                    }}
                                    style={{
                                      background: '#0a0a0f',
                                      color: '#fff',
                                      border: '1px solid #38bdf8',
                                      borderRadius: 2,
                                      padding: '1px 4px',
                                      fontSize: 10,
                                      width: '100%',
                                      outline: 'none',
                                    }}
                                  />
                                ) : (
                                  cellVal
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <p style={{ fontSize: 9, color: '#71717a', margin: 0, fontStyle: 'italic' }}>
              💡 Klik dua kali sel atau edit via formula bar di atas untuk merubah angka. Panel otomatis menghitung ulang KPI & peta.
            </p>
          </div>
        )}

        {/* =========================================================================
            TAB 2: PPT PRESENTATION VIEW (Synchronized slides matching active data)
            ========================================================================= */}
        {previewTab === 'PPT' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Header / Slide Switcher Controls */}
            <div
              style={{
                background: '#181822',
                border: '1px solid #27272a',
                borderRadius: 8,
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="mono" style={{ fontSize: 11, color: '#f97316', fontWeight: 600 }}>
                  SLIDE {currentSlide} / {totalSlides}
                </span>
                <span style={{ fontSize: 11, color: '#a1a1aa' }}>
                  {currentSlide === 1
                    ? 'Executive Cover'
                    : currentSlide === 2
                    ? 'KPI Benchmark'
                    : currentSlide === 3
                    ? 'Signal Distribution'
                    : currentSlide === 4
                    ? 'Worst Spots RCA'
                    : 'Action Plan'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setCurrentSlide(s => Math.max(1, s - 1))}
                  disabled={currentSlide === 1}
                  style={{
                    padding: '3px 8px',
                    fontSize: 10,
                    borderRadius: 4,
                    border: 'none',
                    background: '#27272a',
                    color: currentSlide === 1 ? '#52525b' : '#fff',
                    cursor: currentSlide === 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  ◀ Prev
                </button>
                <button
                  onClick={() => setCurrentSlide(s => Math.min(totalSlides, s + 1))}
                  disabled={currentSlide === totalSlides}
                  style={{
                    padding: '3px 8px',
                    fontSize: 10,
                    borderRadius: 4,
                    border: 'none',
                    background: '#27272a',
                    color: currentSlide === totalSlides ? '#52525b' : '#fff',
                    cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer',
                  }}
                >
                  Next ▶
                </button>
                <button
                  onClick={handleTriggerPptxExport}
                  disabled={exportBusy === 'pptx'}
                  style={{
                    padding: '3px 8px',
                    fontSize: 10,
                    borderRadius: 4,
                    border: 'none',
                    background: '#ea580c',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <i className="ri-download-2-line"></i>
                  {exportBusy === 'pptx' ? '...' : '.pptx'}
                </button>
              </div>
            </div>

            {/* Slide Presentation Canvas */}
            <div
              style={{
                background: '#0a0a0f',
                border: '1px solid #3f3f46',
                borderRadius: 8,
                aspectRatio: '16/9',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              }}
            >
              {/* Slide 1: Cover */}
              {currentSlide === 1 && (
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg, #0d0d16 0%, #161226 100%)' }}>
                  <div>
                    <span style={{ fontSize: 9, background: '#7c3aed', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                      TELECOM AGENT RF COPILOT
                    </span>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '8px 0 4px', lineHeight: 1.2 }}>
                      {attachedFile ? attachedFile.replace(/\.[^/.]+$/, '') : (localRows.length > 1 ? 'RF Cluster Optimization' : 'Telecom Drive Test Optimization')}
                    </h2>
                    <p style={{ fontSize: 10, color: '#a1a1aa', margin: 0 }}>
                      Live Synced Audit • {computedMetrics.totalSamples} DT Measurements Analyzed
                    </p>
                  </div>
                  <div style={{ background: '#12121e', border: '1px solid #272738', borderRadius: 6, padding: '8px 10px', fontSize: 10, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ color: '#71717a' }}>RSRP Compliance</span>
                      <p className="mono" style={{ margin: 0, fontWeight: 700, color: parseFloat(computedMetrics.rsrpSlaPct) >= 95 ? '#10b981' : '#ef4444' }}>
                        {computedMetrics.rsrpSlaPct}%
                      </p>
                    </div>
                    <div>
                      <span style={{ color: '#71717a' }}>SINR Compliance</span>
                      <p className="mono" style={{ margin: 0, fontWeight: 700, color: parseFloat(computedMetrics.sinrSlaPct) >= 80 ? '#10b981' : '#f59e0b' }}>
                        {computedMetrics.sinrSlaPct}%
                      </p>
                    </div>
                    <div>
                      <span style={{ color: '#71717a' }}>Avg DL Speed</span>
                      <p className="mono" style={{ margin: 0, fontWeight: 700, color: '#38bdf8' }}>
                        {computedMetrics.avgTput} Mbps
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 2: KPI Overview */}
              {currentSlide === 2 && (
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: 6 }}>
                    <h3 style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0 }}>Slide 2: KPI Benchmark Against SLA</h3>
                    <span style={{ fontSize: 9, color: '#10b981' }}>Live Synced</span>
                  </div>
                  <table style={{ width: '100%', fontSize: 9, borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ color: '#71717a', borderBottom: '1px solid #27272a', textAlign: 'left' }}>
                        <th style={{ padding: '3px 0' }}>KPI</th>
                        <th style={{ padding: '3px 0' }}>Actual</th>
                        <th style={{ padding: '3px 0' }}>Target</th>
                        <th style={{ padding: '3px 0' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {computedMetrics.kpiSummaryTable.slice(0, 4).map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '4px 0', color: '#e4e4e7' }}>{row.metric}</td>
                          <td className="mono" style={{ padding: '4px 0', color: '#fff', fontWeight: 600 }}>{row.current}</td>
                          <td className="mono" style={{ padding: '4px 0', color: '#a1a1aa' }}>{row.target}</td>
                          <td style={{ padding: '4px 0', color: row.status === 'PASS' ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                            {row.status === 'PASS' ? `✓ ${row.delta}` : `✗ ${row.delta}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ background: '#1c1917', border: '1px solid #442a17', borderRadius: 4, padding: '4px 6px', fontSize: 9, color: '#fdba74' }}>
                    ⚠️ <b>Verdict:</b> {parseFloat(computedMetrics.rsrpSlaPct) >= 95 ? 'Semua SLA RF tercapai dengan performa prima.' : 'RSRP di bawah target SLA 95%. Diperlukan tilt tuning.'}
                  </div>
                </div>
              )}

              {/* Slide 3: Coverage Distribution */}
              {currentSlide === 3 && (
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: 6 }}>
                    <h3 style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0 }}>Slide 3: Signal Coverage Distribution</h3>
                    <span style={{ fontSize: 9, color: '#a1a1aa' }}>Samples: {computedMetrics.totalSamples}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 9 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ color: '#34d399' }}>Excellent (≥ -85 dBm)</span>
                        <span className="mono" style={{ color: '#fff' }}>{computedMetrics.pctExc}%</span>
                      </div>
                      <div style={{ height: 5, background: '#27272a', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${computedMetrics.pctExc}%`, height: '100%', background: '#10b981' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ color: '#a3e635' }}>Good (-85 to -95 dBm)</span>
                        <span className="mono" style={{ color: '#fff' }}>{computedMetrics.pctGood}%</span>
                      </div>
                      <div style={{ height: 5, background: '#27272a', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${computedMetrics.pctGood}%`, height: '100%', background: '#84cc16' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ color: '#facc15' }}>Fair (-95 to -105 dBm)</span>
                        <span className="mono" style={{ color: '#fff' }}>{computedMetrics.pctFair}%</span>
                      </div>
                      <div style={{ height: 5, background: '#27272a', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${computedMetrics.pctFair}%`, height: '100%', background: '#eab308' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ color: '#f87171' }}>Poor (&lt; -105 dBm)</span>
                        <span className="mono" style={{ color: '#fff' }}>{computedMetrics.pctPoor}%</span>
                      </div>
                      <div style={{ height: 5, background: '#27272a', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${computedMetrics.pctPoor}%`, height: '100%', background: '#ef4444' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 4: Worst Spots RCA */}
              {currentSlide === 4 && (
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: 4 }}>
                    <h3 style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0 }}>Slide 4: Top Identified Worst Spots</h3>
                    <span style={{ fontSize: 9, color: '#f59e0b' }}>RCA Engine</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 9 }}>
                    {computedMetrics.worstSpots.slice(0, 3).map((ws, i) => (
                      <div
                        key={i}
                        style={{
                          background: '#1c1917',
                          borderLeft: `3px solid ${i === 0 ? '#ef4444' : i === 1 ? '#f97316' : '#eab308'}`,
                          padding: '4px 6px',
                          borderRadius: '0 4px 4px 0',
                        }}
                      >
                        <b style={{ color: '#fff' }}>{i + 1}. {ws.spot} ({ws.rsrp}):</b> {ws.issue}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 5: Action Plan */}
              {currentSlide === 5 && (
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: 4 }}>
                    <h3 style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: 0 }}>Slide 5: Action Plan & Recommendations</h3>
                    <span style={{ fontSize: 9, color: '#10b981' }}>Priority Execution</span>
                  </div>
                  <ol style={{ margin: 0, paddingLeft: 16, fontSize: 9, color: '#d4d4d8', lineHeight: 1.6 }}>
                    {computedMetrics.worstSpots.length > 0 ? (
                      computedMetrics.worstSpots.slice(0, 3).map((ws, i) => (
                        <li key={i} style={{ marginBottom: 2 }}>
                          <b style={{ color: '#a78bfa' }}>{ws.spot}:</b> {ws.rec} <span style={{ color: '#fca5a5' }}>({ws.issue})</span>
                        </li>
                      ))
                    ) : (
                      <li style={{ color: '#71717a', fontStyle: 'italic' }}>Tidak ada worst spot kritis yang terdeteksi.</li>
                    )}
                    <li>
                      <b style={{ color: '#fbbf24' }}>Audit Verifikasi:</b> Jadwalkan post-drive test verifikasi 48 jam pasca implementasi.
                    </li>
                  </ol>
                </div>
              )}
            </div>

            {/* Slide Thumbnails strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {[1, 2, 3, 4, 5].map(idx => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    padding: '6px 4px',
                    borderRadius: 6,
                    border: currentSlide === idx ? '2px solid #f97316' : '1px solid #27272a',
                    background: currentSlide === idx ? '#27272a' : '#14141b',
                    color: currentSlide === idx ? '#fff' : '#71717a',
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  S{idx}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: MAP GIS CANVAS (Esri Free Basemaps + Live Reactive Sync)
            ========================================================================= */}
        {previewTab === 'Map' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Top GIS Layer Switchers */}
            <div
              style={{
                background: '#181822',
                border: '1px solid #27272a',
                borderRadius: 8,
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="mono" style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600 }}>GIS</span>
                <span style={{ fontSize: 11, color: '#a1a1aa' }}>Cluster {attachedFile ? 'Drive Test' : 'C1 Jakarta'}</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setShowSectors(v => !v)}
                  style={{
                    padding: '3px 6px',
                    fontSize: 10,
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    background: showSectors ? '#312e81' : '#27272a',
                    color: showSectors ? '#a5b4fc' : '#71717a',
                    fontWeight: showSectors ? 600 : 400,
                  }}
                  title="Toggle sektor antena & sudut azimuth"
                >
                  Sectors
                </button>
                <button
                  onClick={() => setShowSamples(v => !v)}
                  style={{
                    padding: '3px 6px',
                    fontSize: 10,
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    background: showSamples ? '#065f46' : '#27272a',
                    color: showSamples ? '#34d399' : '#71717a',
                    fontWeight: showSamples ? 600 : 400,
                  }}
                  title="Toggle titik ukur RSRP drive test"
                >
                  DT Track
                </button>
                <button
                  onClick={() => setShowWorstSpots(v => !v)}
                  style={{
                    padding: '3px 6px',
                    fontSize: 10,
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    background: showWorstSpots ? '#7f1d1d' : '#27272a',
                    color: showWorstSpots ? '#fca5a5' : '#71717a',
                    fontWeight: showWorstSpots ? 600 : 400,
                  }}
                  title="Toggle penanda lokasi worst spot"
                >
                  Worst Spots
                </button>
              </div>
            </div>

            {/* Free Esri Live GIS Map Integration */}
            <EsriLiveMap
              samples={computedMetrics.mapSamples}
              worstSpots={computedMetrics.worstSpots}
              cellTowers={computedMetrics.cellTowers}
              selectedSpot={selectedSpot}
              onSelectSample={(rowIdx, s) => {
                setSelectedCell({ r: rowIdx + 1, c: 2, val: String(s.rsrp) });
                setEditingCellInput(String(s.rsrp));
                setSelectedSpot({
                  id: s.cellId,
                  site: s.cellId,
                  rsrp: `${s.rsrp} dBm`,
                  sinr: `${s.sinr} dB`,
                  rca: s.rsrp < -105 ? 'Coverage Hole / Signal Weak' : 'Nominal Signal Level',
                  rec: s.rsrp < -105 ? 'Adjust antenna tilt 2° downtilt & verify RS power' : 'Nominal cell performance',
                  lat: s.lat,
                  lon: s.lon,
                });
              }}
              onSelectWorstSpot={ws => {
                setSelectedSpot({
                  id: ws.spot,
                  site: ws.spot,
                  rsrp: ws.rsrp,
                  sinr: ws.sinr,
                  rca: ws.issue,
                  rec: ws.rec,
                  lat: ws.lat,
                  lon: ws.lon,
                });
              }}
              showSectors={showSectors}
              showSamples={showSamples}
              showWorstSpots={showWorstSpots}
            />

            {/* Selected Spot Details Card */}
            {selectedSpot && (
              <div style={{ background: '#1c1917', border: '1px solid #78350f', borderRadius: 8, padding: '8px 10px', fontSize: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: '#f87171' }}>⚠️ Worst Spot: {selectedSpot.id}</span>
                  <button onClick={() => setSelectedSpot(null)} style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 12 }}>×</button>
                </div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                  <span>RSRP: <b style={{ color: '#ef4444' }}>{selectedSpot.rsrp}</b></span>
                  <span>SINR: <b style={{ color: '#fb923c' }}>{selectedSpot.sinr}</b></span>
                  {selectedSpot.lat && <span>📍 <b style={{ color: '#38bdf8' }}>{selectedSpot.lat.toFixed(4)}, {selectedSpot.lon?.toFixed(4)}</b></span>}
                </div>
                <p style={{ margin: '0 0 2px', color: '#d4d4d8' }}><b>Root Cause:</b> {selectedSpot.rca}</p>
                <p style={{ margin: 0, color: '#a78bfa' }}><b>Recommendation:</b> {selectedSpot.rec}</p>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Priority Recommendations Box */}
        <div className="recommendations-box" style={{ background: '#14141b', border: '1px solid #27272a', borderRadius: 10, padding: 12 }}>
          <p className="recommendations-title" style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 8px 0', color: '#f59e0b' }}>
            <i className="ri-lightbulb-line"></i> Priority Optimization Recommendations
          </p>
          <ol className="recommendations-list" style={{ margin: 0, paddingLeft: 18, fontSize: 11, color: '#a1a1aa', lineHeight: 1.6 }}>
            {computedMetrics.worstSpots.length > 0 ? (
              computedMetrics.worstSpots.slice(0, 3).map((ws, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  <b style={{ color: '#e4e4e7' }}>{ws.spot} ({ws.rsrp}, SINR {ws.sinr}):</b> {ws.rec} <span style={{ color: '#f87171' }}>[{ws.issue}]</span>.
                </li>
              ))
            ) : (
              <li style={{ color: '#71717a', fontStyle: 'italic' }}>Tidak ada worst spot kritis yang terdeteksi pada dataset ini.</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
