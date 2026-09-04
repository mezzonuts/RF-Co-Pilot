import React, { useState, useRef } from 'react'
import { useParserCommand, useHealthCheck } from './hooks/useParserCommand'

type Tab = 'agent' | 'vault' | 'tools' | 'skills'

export default function App() {
  const [tab, setTab] = useState<Tab>('agent')
  const [llmOpen, setLlmOpen] = useState(false)
  const [skillSearch, setSkillSearch] = useState('')
  const [skillCategory, setSkillCategory] = useState('all')
  
  // Parser & KPI state
  const { isPending: parseLoading, data: parseData, error: parseError, parseFile, computeKPI } = useParserCommand()
  const { isOk: sidecaOk, check: checkHealth } = useHealthCheck()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [kpiAction, setKpiAction] = useState<'avg_kpi' | 'percentile' | 'worst_spots' | 'throughput'>('avg_kpi')

  const skills = [
    { id: 'analyze-dt', name: 'Analyze Drive Test', cat: 'drive-test', desc: 'Parse CSV/TXT DT logs, hitung KPI RSRP/SINR/Throughput, detect 5 worst spots, generate Excel.', tags: ['drive-test','kpi','excel'], active: true },
    { id: 'gen-pptx', name: 'Generate PPTX Report', cat: 'reporting', desc: 'Convert KPI Excel → 5-slide executive deck (cover, summary, map, worst spots, rekomendasi).', tags: ['reporting','pptx'], active: true },
    { id: 'oss-kpi', name: 'OSS KPI Weekly Report', cat: 'kpi', desc: 'Aggregate Ericsson/Huawei/Nokia counters, trending per cell, flag degradasi >5%.', tags: ['oss','kpi','trending'], active: true },
    { id: 'rca', name: 'RCA Engine', cat: 'rca', desc: 'Rule-based + RAG diagnostics: overshooting, PCI collision, missing neighbor → actionable fix.', tags: ['rca','postgis'], active: true },
    { id: 'coverage', name: 'Coverage Map', cat: 'optimization', desc: 'Generate RSRP/SINR heatmap PNG via Folium + GeoJSON overlay azimuth & tilt.', tags: ['folium','optimization'], active: false },
    { id: 'tilt', name: 'Tilt Optimizer', cat: 'optimization', desc: 'Slope-based electronic tilt suggestion — minimize overshooting, maximize overlap.', tags: ['optimization','tilt'], active: false },
  ]

  const filtered = skills.filter(s => {
    const catOk = skillCategory === 'all' || s.cat === skillCategory
    const qOk = !skillSearch || s.name.toLowerCase().includes(skillSearch.toLowerCase())
    return catOk && qOk
  })

  // Handle file drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const filePath = files[0].path || files[0].name
      setSelectedFile(filePath)
    }
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].path || e.target.files[0].name)
    }
  }

  // Parse file
  const handleParse = async () => {
    if (!selectedFile) return
    try {
      await parseFile(selectedFile, 'generic')
    } catch (err) {
      console.error('Parse failed:', err)
    }
  }

  // Compute KPI
  const handleComputeKPI = async () => {
    if (!selectedFile) return
    try {
      await computeKPI(selectedFile, kpiAction, 'generic')
    } catch (err) {
      console.error('KPI computation failed:', err)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0f', color: '#e4e4e7', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* TOPBAR */}
      <div style={{ height: 44, background: '#111117', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📡</div>
          <span style={{ fontWeight: 600, fontSize: 14 }}>TelecomAgent</span>
          <span style={{ fontSize: 11, background: '#27272a', border: '1px solid #3f3f46', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', color: '#a1a1aa' }}>RF COPILOT v0.3</span>
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#0a0a0f', border: '1px solid #27272a', borderRadius: 999, padding: 4 }}>
          {(['agent','vault','tools','skills'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer',
              background: tab===t ? '#fff' : 'transparent', color: tab===t ? '#000' : '#a1a1aa'
            }}>{t==='agent'?'Agent':t==='vault'?'Vault':t==='tools'?'Tools':'Skills'}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: sidecaOk ? '#22c55e' : '#ef4444', fontFamily: 'monospace' }}>{sidecaOk ? '✓ Sidecar OK' : '✗ Sidecar offline'}</span>
        <button onClick={checkHealth} title="Check sidecar health" style={{ width: 28, height: 28, background: '#27272a', border: '1px solid #3f3f46', borderRadius: 8, cursor: 'pointer' }}>🔄</button>
        <button onClick={() => setLlmOpen(true)} title="LLM Settings" style={{ width: 28, height: 28, background: '#27272a', border: '1px solid #3f3f46', borderRadius: 8, cursor: 'pointer' }}>⚙️</button>
        <div style={{ width: 28, height: 28, borderRadius: 999, background: '#27272a', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT SIDEBAR */}
        <div style={{ width: 260, background: '#0f0f14', borderRight: '1px solid #27272a', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 12 }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', padding: '8px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>+ Select DT File</button>
            <input ref={fileInputRef} type="file" onChange={handleFileSelect} accept=".csv,.txt" style={{ display: 'none' }} />
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <span style={{ flex: 1, background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '6px', fontSize: 11, textAlign: 'center' }}>📊 Excel</span>
              <span style={{ flex: 1, background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '6px', fontSize: 11, textAlign: 'center' }}>📑 PPT</span>
              <span style={{ flex: 1, background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '6px', fontSize: 11, textAlign: 'center' }}>🗄️ DB</span>
            </div>
          </div>
          <div style={{ padding: '8px 12px', fontSize: 10, fontWeight: 600, letterSpacing: 1, color: '#71717a' }}>FILE INFO</div>
          <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
            {selectedFile ? (
              <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#a1a1aa' }}>{selectedFile.split('/').pop()}</div>
                <button onClick={handleParse} disabled={parseLoading} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '6px', borderRadius: 4, fontSize: 11, cursor: 'pointer', opacity: parseLoading ? 0.5 : 1 }}>
                  {parseLoading ? '⏳ Parsing...' : '▶ Parse'}
                </button>
              </div>
            ) : (
              <div style={{ padding: '6px 10px', color: '#a1a1aa', fontSize: 11 }}>No file selected</div>
            )}
          </div>
          {selectedFile && parseData && (
            <div style={{ padding: '12px', flex: 1, overflowY: 'auto' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, color: '#71717a', marginBottom: 8 }}>PARSE RESULT</div>
              <div style={{ background: '#1a1a22', border: '1px solid #27272a', borderRadius: 8, padding: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>✓ Parsed {parseData.rows} rows</div>
                <div style={{ fontSize: 10, color: '#71717a', fontFamily: 'monospace', marginTop: 4 }}>{parseData.columns?.length} columns</div>
              </div>
            </div>
          )}
        </div>

        {/* CENTER */}
        <div style={{ flex: 1, overflow: 'auto', background: '#0a0a0f' }}>
          {tab === 'agent' && (
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div style={{ height: 40, borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#71717a' }}>DT LOG PARSER</span>
                  <span style={{ fontSize: 11, background: '#18181b', border: '1px solid #27272a', padding: '2px 8px', borderRadius: 999, color: '#a1a1aa' }}>{selectedFile ? '✓ ready' : '○ select file'}</span>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {selectedFile && !parseData && (
                    <div style={{ background: '#14141b', border: '1px dashed #3f3f46', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>📄 File selected</div>
                      <div style={{ fontSize: 11, color: '#a1a1aa', marginBottom: 16 }}>{selectedFile.split('/').pop()}</div>
                      <button onClick={handleParse} disabled={parseLoading} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
                        {parseLoading ? 'Parsing...' : 'Parse File'}
                      </button>
                    </div>
                  )}
                  {parseError && (
                    <div style={{ background: '#7f1d1d', border: '1px solid #991b1b', borderRadius: 12, padding: 12, color: '#fca5a5' }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Error</div>
                      <div style={{ fontSize: 11 }}>{parseError}</div>
                    </div>
                  )}
                  {parseData && 'rows' in parseData && (
                    <div style={{ background: '#14141b', border: '1px solid #27272a', borderRadius: 12, padding: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>✓ Parse Result</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
                        <div style={{ background: '#0a0a0f', border: '1px solid #27272a', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#71717a' }}>Rows</div>
                          <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>{parseData.rows}</div>
                        </div>
                        <div style={{ background: '#0a0a0f', border: '1px solid #27272a', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                          <div style={{ fontSize: 10, color: '#71717a' }}>Columns</div>
                          <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>{parseData.columns?.length}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ padding: 12, borderTop: '1px solid #27272a', background: '#0f0f14' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select value={kpiAction} onChange={(e) => setKpiAction(e.target.value as any)} style={{ background: '#14141b', border: '1px solid #27272a', borderRadius: 8, padding: '6px 10px', color: '#e4e4e7', outline: 'none', fontSize: 11 }}>
                      <option value="avg_kpi">Avg KPI per Cell</option>
                      <option value="percentile">Percentile (p5-p95)</option>
                      <option value="worst_spots">Worst 5 Spots</option>
                      <option value="throughput">Throughput Stats</option>
                    </select>
                    <button onClick={handleComputeKPI} disabled={!selectedFile || parseLoading} style={{ flex: 1, background: '#ea580c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 500, opacity: !selectedFile || parseLoading ? 0.5 : 1 }}>
                      Compute KPI
                    </button>
                  </div>
                </div>
              </div>
              {/* LIVE PREVIEW */}
              <div style={{ width: 360, background: '#0f0f14', borderLeft: '1px solid #27272a', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 40, borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#71717a' }}>KPI RESULTS</span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, background: '#18181b', border: '1px solid #27272a', padding: '4px 8px', borderRadius: 8 }}>{kpiAction}</span>
                </div>
                <div style={{ padding: 12, overflowY: 'auto' }}>
                  {parseData && 'result' in parseData ? (
                    <div style={{ background: '#14141b', border: '1px solid #27272a', borderRadius: 12, padding: 12 }}>
                      <pre style={{ fontSize: 10, color: '#a1a1aa', overflow: 'auto', maxHeight: 400 }}>
                        {JSON.stringify(parseData.result, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: '#71717a', textAlign: 'center', paddingTop: 40 }}>
                      Parse a file and compute KPI to see results here.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {tab === 'vault' && (
            <div style={{ padding: 24 }}>
              <h1 style={{ fontSize: 18, fontWeight: 700 }}>Knowledge Vault</h1>
              <p style={{ fontSize: 12, color: '#71717a', fontFamily: 'monospace' }}>Obsidian-style • 127 notes • 342 links • Qdrant RAG indexed</p>
            </div>
          )}
          {tab === 'tools' && (
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#71717a', marginBottom: 12 }}>AVAILABLE TOOLS</div>
            </div>
          )}
          {tab === 'skills' && (
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#71717a' }}>SKILLS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LLM SETTINGS MODAL */}
      {llmOpen && (
        <>
          <div onClick={()=>setLlmOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 40 }} />
          <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: 440, background: '#0f0f14', borderLeft: '1px solid #27272a', zIndex: 50, overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <div style={{ height: 56, borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', position: 'sticky', top: 0, background: '#0f0f14' }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>⚙️ LLM Configuration</span>
              <button onClick={()=>setLlmOpen(false)} style={{ width: 28, height: 28, background: '#18181b', border: '1px solid #27272a', borderRadius: 8, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div><div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#71717a', marginBottom: 8 }}>PROVIDER</div><select style={{ width: '100%', background: '#14141b', border: '1px solid #27272a', borderRadius: 8, padding: '10px 12px', color: '#e4e4e7', outline: 'none' }}><option>Ollama (Local)</option></select></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
