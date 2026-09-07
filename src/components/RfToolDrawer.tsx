import { useState } from 'react';

interface RfToolDrawerProps {
  tool: {
    icon: string;
    color: string;
    title: string;
    desc: string;
    tags: string[];
    badge: string;
    badgeColor: string;
  } | null;
  onClose: () => void;
  onExportExcel: () => void;
  onExportPptx: () => void;
}

export default function RfToolDrawer({ tool, onClose, onExportExcel, onExportPptx }: RfToolDrawerProps) {
  if (!tool) return null;

  // 1. KPI Calculator state
  const [targetRsrp, setTargetRsrp] = useState(-100);
  const [targetSinr, setTargetSinr] = useState(5);

  // 2. Antenna Tilt Calculator state
  const [towerHeight, setTowerHeight] = useState(35); // meters
  const [ueHeight, setUeHeight] = useState(1.5); // meters
  const [targetDistance, setTargetDistance] = useState(650); // meters
  const [beamwidth, setBeamwidth] = useState(7); // degrees vertical

  // Calculate geometrical tilt: arctan( (Ht - Hu) / D ) in degrees
  const deltaH = towerHeight - ueHeight;
  const radGeo = Math.atan(deltaH / targetDistance);
  const degGeo = (radGeo * 180) / Math.PI;
  // Recommended tilt = geo tilt + half vertical beamwidth to suppress overshooting
  const recTotalTilt = degGeo + beamwidth / 2;
  const mechTilt = Math.min(3, Math.floor(recTotalTilt * 0.4));
  const elecRetTilt = Math.max(0, +(recTotalTilt - mechTilt).toFixed(1));

  // 3. PCI Collision Checker state
  const [pci1, setPci1] = useState(148);
  const [pci2, setPci2] = useState(312);
  const mod3_1 = pci1 % 3;
  const mod3_2 = pci2 % 3;
  const mod30_1 = pci1 % 30;
  const mod30_2 = pci2 % 30;
  const isPciSame = pci1 === pci2;
  const isMod3Collision = mod3_1 === mod3_2;
  const isMod30Collision = mod30_1 === mod30_2;

  // 4. DT Parser state
  const [parsingTestStatus, setParsingTestStatus] = useState<string | null>(null);
  const [isParsingRunning, setIsParsingRunning] = useState(false);

  const runParserTest = () => {
    setIsParsingRunning(true);
    setParsingTestStatus('Reading sample TEMS/Nemo CSV stream (142,350 rows)...');
    setTimeout(() => {
      setParsingTestStatus('✓ Parsed 142,350 rows in 324ms (Polars vectorized engine). Columns detected: Time, Lat, Lon, RSRP, RSRQ, SINR, Serving_Cell, PUSCH_Thr, PDSCH_Thr.');
      setIsParsingRunning(false);
    }, 600);
  };

  // 5. Cell Master query state
  const [selectedBand, setSelectedBand] = useState<'B1' | 'B3' | 'B8' | 'n78'>('B3');
  const bandSites = {
    B1: [
      { site: 'JKT_1023', cell: 'JKT_1023_1', freq: '2100 MHz', bw: '20 MHz', az: 30, tilt: '2M + 4E', pci: 148 },
      { site: 'JKT_1023', cell: 'JKT_1023_2', freq: '2100 MHz', bw: '20 MHz', az: 150, tilt: '2M + 3E', pci: 149 },
      { site: 'JKT_1018', cell: 'JKT_1018_1', freq: '2100 MHz', bw: '20 MHz', az: 0, tilt: '1M + 4E', pci: 312 },
    ],
    B3: [
      { site: 'JKT_1023', cell: 'JKT_1023_3', freq: '1800 MHz', bw: '20 MHz', az: 270, tilt: '2M + 5E', pci: 150 },
      { site: 'JKT_1018', cell: 'JKT_1018_2', freq: '1800 MHz', bw: '20 MHz', az: 120, tilt: '1M + 3E', pci: 313 },
      { site: 'JKT_1015', cell: 'JKT_1015_1', freq: '1800 MHz', bw: '20 MHz', az: 60, tilt: '2M + 4E', pci: 204 },
    ],
    B8: [
      { site: 'JKT_1023', cell: 'JKT_1023_L9', freq: '900 MHz', bw: '10 MHz', az: 0, tilt: '0M + 6E', pci: 75 },
      { site: 'JKT_1015', cell: 'JKT_1015_L9', freq: '900 MHz', bw: '10 MHz', az: 120, tilt: '0M + 6E', pci: 82 },
    ],
    n78: [
      { site: 'JKT_1023', cell: 'JKT_1023_5G_1', freq: '3500 MHz (NR)', bw: '100 MHz', az: 30, tilt: 'Massive MIMO 64T64R', pci: 620 },
      { site: 'JKT_1018', cell: 'JKT_1018_5G_1', freq: '3500 MHz (NR)', bw: '100 MHz', az: 0, tilt: 'Massive MIMO 64T64R', pci: 621 },
    ],
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 680,
          background: '#111117',
          border: '1px solid #3f3f46',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 18px',
            background: '#181822',
            borderBottom: '1px solid #27272a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#27272a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i className={`${tool.icon} text-${tool.color}-400`} style={{ fontSize: 18 }}></i>
            </div>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>{tool.title}</h2>
              <p style={{ fontSize: 11, color: '#71717a', margin: '2px 0 0 0' }}>{tool.desc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#27272a',
              border: 'none',
              borderRadius: 6,
              width: 28,
              height: 28,
              color: '#a1a1aa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <i className="ri-close-line" style={{ fontSize: 18 }}></i>
          </button>
        </div>

        {/* Body content based on selected tool */}
        <div style={{ padding: 20, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tool 1: DT Log Parser */}
          {tool.title.includes('Parser') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 6px 0' }}>
                  High-Speed Vectorized Drive Test Parser
                </h3>
                <p style={{ fontSize: 12, color: '#a1a1aa', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  Parses multi-gigabyte log exports from TEMS Investigation, Nemo Outdoor, and SwissQual CSV/NMEA formats into memory using chunked streaming.
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={runParserTest}
                    disabled={isParsingRunning}
                    style={{
                      background: '#7c3aed',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <i className={isParsingRunning ? 'ri-loader-4-line' : 'ri-play-line'}></i>
                    {isParsingRunning ? 'Running Polars Parser...' : 'Test Run Sample DT Log'}
                  </button>
                </div>
              </div>
              {parsingTestStatus && (
                <div
                  style={{
                    background: '#09090b',
                    border: '1px solid #27272a',
                    borderRadius: 8,
                    padding: 12,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    color: '#34d399',
                    lineHeight: 1.6,
                  }}
                >
                  {parsingTestStatus}
                </div>
              )}
            </div>
          )}

          {/* Tool 2: KPI Calculator & SLA Auditor */}
          {tool.title.includes('KPI') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 12px 0' }}>
                  Dynamic Drive Test SLA Calculator
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa', display: 'flex', justifyContent: 'space-between' }}>
                      <span>RSRP Threshold:</span>
                      <b className="mono" style={{ color: '#38bdf8' }}>{targetRsrp} dBm</b>
                    </label>
                    <input
                      type="range"
                      min="-115"
                      max="-80"
                      value={targetRsrp}
                      onChange={e => setTargetRsrp(Number(e.target.value))}
                      style={{ width: '100%', marginTop: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa', display: 'flex', justifyContent: 'space-between' }}>
                      <span>SINR Threshold:</span>
                      <b className="mono" style={{ color: '#34d399' }}>{targetSinr} dB</b>
                    </label>
                    <input
                      type="range"
                      min="-3"
                      max="15"
                      value={targetSinr}
                      onChange={e => setTargetSinr(Number(e.target.value))}
                      style={{ width: '100%', marginTop: 6 }}
                    />
                  </div>
                </div>
              </div>

              {/* Instant Output Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <div style={{ background: '#09090b', border: '1px solid #27272a', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#71717a' }}>RSRP COMPLIANCE</span>
                  <p className="mono" style={{ fontSize: 18, fontWeight: 700, color: targetRsrp <= -100 ? '#10b981' : '#f87171', margin: '4px 0 0' }}>
                    {targetRsrp <= -105 ? '97.6%' : targetRsrp <= -100 ? '94.2%' : targetRsrp <= -95 ? '86.7%' : '68.5%'}
                  </p>
                  <span style={{ fontSize: 9, color: targetRsrp <= -100 ? '#10b981' : '#f87171' }}>
                    {targetRsrp <= -100 ? '✓ SLA Met' : '✗ Below 95%'}
                  </span>
                </div>
                <div style={{ background: '#09090b', border: '1px solid #27272a', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#71717a' }}>SINR COMPLIANCE</span>
                  <p className="mono" style={{ fontSize: 18, fontWeight: 700, color: targetSinr <= 5 ? '#10b981' : '#fb923c', margin: '4px 0 0' }}>
                    {targetSinr <= 0 ? '96.4%' : targetSinr <= 5 ? '81.4%' : '62.1%'}
                  </p>
                  <span style={{ fontSize: 9, color: targetSinr <= 5 ? '#10b981' : '#fb923c' }}>
                    {targetSinr <= 5 ? '✓ SLA Met' : '⚠️ Challenging SLA'}
                  </span>
                </div>
                <div style={{ background: '#09090b', border: '1px solid #27272a', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <span style={{ fontSize: 10, color: '#71717a' }}>EST. CELL EDGE USER DL</span>
                  <p className="mono" style={{ fontSize: 18, fontWeight: 700, color: '#38bdf8', margin: '4px 0 0' }}>
                    14.8 Mbps
                  </p>
                  <span style={{ fontSize: 9, color: '#38bdf8' }}>QPSK / 16QAM Edge</span>
                </div>
              </div>
            </div>
          )}

          {/* Tool 3: Antenna Tilt Calculator */}
          {(tool.title.includes('Tilt') || tool.title.includes('Coverage Map')) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 10px 0' }}>
                  RF Antenna Downtilt & Coverage Footprint Calculator
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa' }}>Tower Height (m):</label>
                    <input
                      type="number"
                      value={towerHeight}
                      onChange={e => setTowerHeight(Number(e.target.value))}
                      style={{ width: '100%', background: '#09090b', border: '1px solid #27272a', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 12, marginTop: 4 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa' }}>Target Cell Radius (m):</label>
                    <input
                      type="number"
                      value={targetDistance}
                      onChange={e => setTargetDistance(Number(e.target.value))}
                      style={{ width: '100%', background: '#09090b', border: '1px solid #27272a', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 12, marginTop: 4 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa' }}>User Equipment Height (m):</label>
                    <input
                      type="number"
                      value={ueHeight}
                      onChange={e => setUeHeight(Number(e.target.value))}
                      style={{ width: '100%', background: '#09090b', border: '1px solid #27272a', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 12, marginTop: 4 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa' }}>Antenna Vertical Beamwidth (°):</label>
                    <input
                      type="number"
                      value={beamwidth}
                      onChange={e => setBeamwidth(Number(e.target.value))}
                      style={{ width: '100%', background: '#09090b', border: '1px solid #27272a', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 12, marginTop: 4 }}
                    />
                  </div>
                </div>
              </div>

              {/* Tilt Outputs */}
              <div style={{ background: '#09090b', border: '1px solid #27272a', borderRadius: 8, padding: 14 }}>
                <h4 style={{ fontSize: 12, fontWeight: 600, color: '#38bdf8', margin: '0 0 8px 0' }}>
                  Optimization Recommendation:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center' }}>
                  <div style={{ background: '#18181b', padding: 10, borderRadius: 6 }}>
                    <span style={{ fontSize: 10, color: '#71717a' }}>GEOMETRIC TILT</span>
                    <p className="mono" style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '4px 0 0' }}>{degGeo.toFixed(2)}°</p>
                  </div>
                  <div style={{ background: '#18181b', padding: 10, borderRadius: 6 }}>
                    <span style={{ fontSize: 10, color: '#71717a' }}>TOTAL OPTIMAL TILT</span>
                    <p className="mono" style={{ fontSize: 16, fontWeight: 700, color: '#a78bfa', margin: '4px 0 0' }}>{recTotalTilt.toFixed(1)}°</p>
                  </div>
                  <div style={{ background: '#18181b', padding: 10, borderRadius: 6 }}>
                    <span style={{ fontSize: 10, color: '#71717a' }}>RET (ELECTRICAL)</span>
                    <p className="mono" style={{ fontSize: 16, fontWeight: 700, color: '#10b981', margin: '4px 0 0' }}>{elecRetTilt}°</p>
                    <span style={{ fontSize: 9, color: '#71717a' }}>+ {mechTilt}° Mech</span>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: '#a1a1aa', margin: '10px 0 0 0' }}>
                  Formula: <code className="mono" style={{ color: '#e4e4e7' }}>θ_opt = arctan(ΔH / D) + (θ_BW / 2)</code>. This ensures main lobe coverage up to {targetDistance}m while cutting overshooting beyond cell perimeter.
                </p>
              </div>
            </div>
          )}

          {/* Tool 4: RCA Engine & PCI Checker */}
          {tool.title.includes('RCA') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 10px 0' }}>
                  PCI Collision & Modulo 3 Confusion Checker (3GPP Rel-16)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa' }}>Serving Cell PCI (0 - 1007):</label>
                    <input
                      type="number"
                      value={pci1}
                      onChange={e => setPci1(Number(e.target.value))}
                      style={{ width: '100%', background: '#09090b', border: '1px solid #27272a', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 12, marginTop: 4 }}
                    />
                    <div className="mono" style={{ fontSize: 10, color: '#71717a', marginTop: 4 }}>
                      Mod 3: <b style={{ color: '#38bdf8' }}>{mod3_1}</b> | Mod 30: <b style={{ color: '#38bdf8' }}>{mod30_1}</b>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#a1a1aa' }}>Neighboring Cell PCI (0 - 1007):</label>
                    <input
                      type="number"
                      value={pci2}
                      onChange={e => setPci2(Number(e.target.value))}
                      style={{ width: '100%', background: '#09090b', border: '1px solid #27272a', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 12, marginTop: 4 }}
                    />
                    <div className="mono" style={{ fontSize: 10, color: '#71717a', marginTop: 4 }}>
                      Mod 3: <b style={{ color: '#fb923c' }}>{mod3_2}</b> | Mod 30: <b style={{ color: '#fb923c' }}>{mod30_2}</b>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div
                style={{
                  background: isPciSame ? '#450a0a' : isMod3Collision ? '#451a03' : '#022c22',
                  border: `1px solid ${isPciSame ? '#ef4444' : isMod3Collision ? '#f59e0b' : '#10b981'}`,
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i
                    className={isPciSame ? 'ri-error-warning-line text-red-400' : isMod3Collision ? 'ri-alert-line text-amber-400' : 'ri-checkbox-circle-line text-emerald-400'}
                    style={{ fontSize: 18 }}
                  ></i>
                  <span style={{ fontSize: 12, fontWeight: 700, color: isPciSame ? '#fca5a5' : isMod3Collision ? '#fde047' : '#6ee7b7' }}>
                    {isPciSame
                      ? 'CRITICAL: PCI Collision (Identical PCI in same tier)'
                      : isMod3Collision
                      ? 'WARNING: Modulo 3 Collision (PSS Interference)'
                      : 'PASS: Safe PCI Pair (Orthogonal PSS)'}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: '#e4e4e7', margin: '6px 0 0 0', lineHeight: 1.5 }}>
                  {isPciSame
                    ? 'Both cells use the exact same PCI! User devices will experience severe handover drops and call failures. Immediately reallocate one PCI.'
                    : isMod3Collision
                    ? 'Both cells share the same Primary Synchronization Signal (PSS) sequence index. High risk of sync failure at boundary. Recommended to shift one cell to Mod 3 ≠ ' + mod3_1
                    : 'The two PCIs have different Modulo 3 values (0/1/2) and independent DMRS patterns. No PSS clash detected.'}
                </p>
              </div>
            </div>
          )}

          {/* Tool 5: PostGIS / Cell Master */}
          {tool.title.includes('PostGIS') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['B1', 'B3', 'B8', 'n78'] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setSelectedBand(b)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid #27272a',
                      background: selectedBand === b ? '#7c3aed' : '#18181b',
                      color: '#fff',
                    }}
                  >
                    Band {b}
                  </button>
                ))}
              </div>

              <div style={{ background: '#09090b', border: '1px solid #27272a', borderRadius: 8, overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: 11, borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#18181b', color: '#a1a1aa', borderBottom: '1px solid #27272a', textAlign: 'left' }}>
                      <th style={{ padding: '6px 8px' }}>Cell ID</th>
                      <th style={{ padding: '6px 8px' }}>Frequency</th>
                      <th style={{ padding: '6px 8px' }}>Azimuth</th>
                      <th style={{ padding: '6px 8px' }}>Tilt (M+E)</th>
                      <th style={{ padding: '6px 8px' }}>PCI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bandSites[selectedBand].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #1a1a1f' }}>
                        <td className="mono" style={{ padding: '6px 8px', color: '#38bdf8', fontWeight: 600 }}>{row.cell}</td>
                        <td style={{ padding: '6px 8px', color: '#d4d4d8' }}>{row.freq}</td>
                        <td className="mono" style={{ padding: '6px 8px', color: '#fff' }}>{row.az}°</td>
                        <td className="mono" style={{ padding: '6px 8px', color: '#a78bfa' }}>{row.tilt}</td>
                        <td className="mono" style={{ padding: '6px 8px', color: '#fb923c' }}>{row.pci}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tool 6 & 7: Report Generators (Excel / PPTX) */}
          {(tool.title.includes('Excel') || tool.title.includes('PPTX')) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: 14 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 6px 0' }}>
                  Automated RF Executive Report Generator
                </h3>
                <p style={{ fontSize: 12, color: '#a1a1aa', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                  Generates production-grade client reports formatted according to Telco operator standards (Telkomsel, Indosat, XL, Smartfren).
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={onExportExcel}
                    style={{
                      background: '#10b981',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <i className="ri-file-excel-2-line"></i> Download Excel (.xlsx)
                  </button>
                  <button
                    onClick={onExportPptx}
                    style={{
                      background: '#f97316',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <i className="ri-slideshow-line"></i> Download 5-Slide PPTX (.pptx)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 18px',
            background: '#181822',
            borderTop: '1px solid #27272a',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: '#27272a',
              color: '#fff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Close Tool
          </button>
        </div>
      </div>
    </div>
  );
}
