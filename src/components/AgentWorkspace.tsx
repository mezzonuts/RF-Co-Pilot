import { useRef, useState } from 'react';
import './AgentWorkspace.css';

interface ExecutionStep {
  id: string;
  icon: string;
  color: string;
  text: string;
  status: 'running' | 'done' | 'pending';
  result?: string;
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  count: number;
  dot: string;
}

interface RecentTask {
  id: string;
  title: string;
  time: string;
  badges: string[];
}

interface Skill {
  id: string;
  name: string;
  active: boolean;
}

export default function AgentWorkspace({ onManageSkills }: { onManageSkills?: () => void }) {
  const [activeTab, setActiveTab] = useState<'chat' | 'execution'>('chat');
  const [showNewAnalysis, setShowNewAnalysis] = useState(false);
  const [newAnalysisPrompt, setNewAnalysisPrompt] = useState('');
  const [previewTab, setPreviewTab] = useState<'Excel'|'PPT'|'Map'>('PPT');
  const [inputText, setInputText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const projects: Project[] = [
    { id: 'jkt', name: 'Cluster Jabodetabek', status: 'active', count: 12, dot: 'emerald' },
    { id: 'sby', name: 'Cluster Surabaya', status: 'inactive', count: 0, dot: 'zinc' },
    { id: 'bali', name: '5G Trial Bali', status: 'inactive', count: 0, dot: 'amber' },
  ];

  const recentTasks: RecentTask[] = [
    { id: '1', title: 'DT Cluster 1 — RSRP Analysis', time: '2 jam lalu • 98% RSRP ≥ -100dBm', badges: ['Excel ✓', 'PPT ✓'] },
    { id: '2', title: 'OSS KPI Weekly — HOSR Drop', time: 'Kemarin • 3 cells degraded', badges: [] },
    { id: '3', title: 'PCI Collision Audit', time: '3 hari lalu', badges: [] },
  ];

  const skills: Skill[] = [
    { id: 'dt', name: 'Analyze Drive Test', active: true },
    { id: 'oss', name: 'OSS KPI Weekly', active: true },
    { id: 'cov', name: 'Coverage Map', active: false },
  ];

  const executionSteps: ExecutionStep[] = [
    { id: '1', icon: 'ri-flashlight-line', color: 'violet', text: 'skill load: SKILL - Analyze Drive Test.md', status: 'done', result: '✓ active' },
    { id: '2', icon: 'ri-code-s-slash-line', color: 'emerald', text: 'parse_dt_log("DT_Jakarta_C1_0409.csv")', status: 'done', result: '✓ 142.3k rows' },
    { id: '3', icon: 'ri-database-2-line', color: 'sky', text: 'query PostGIS: join cell_master', status: 'done', result: '✓ 847 cells' },
    { id: '4', icon: 'ri-bar-chart-line', color: 'amber', text: 'calc KPI: RSRP/SINR/DL Thr', status: 'running', result: 'running...' },
  ];

  return (
    <div className="agent-workspace">
      {/* LEFT SIDEBAR */}
      <div className="agent-sidebar">
        <div className="sidebar-header">
          <button className="btn-new-analysis" onClick={() => setShowNewAnalysis(v => !v)} title={showNewAnalysis ? 'Tutup' : 'Mulai analisis baru'}>
            <i className={`ri-${showNewAnalysis ? 'close-line' : 'add-line'}`}></i> {showNewAnalysis ? 'Tutup' : 'New Analysis'}
          </button>
          <div className="sidebar-quick-actions">
            <button title="Excel" className="quick-action-btn"><i className="ri-file-excel-2-line"></i> Excel</button>
            <button title="PPT" className="quick-action-btn"><i className="ri-slideshow-line"></i> PPT</button>
            <button title="DB" className="quick-action-btn"><i className="ri-database-2-line"></i> DB</button>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="section-label">PROJECTS</p>
          <div className="space-y-1">
            {projects.map(p => (
              <div key={p.id} className={`project-item ${p.status === 'active' ? 'active' : ''}`}>
                <span className={`dot dot-${p.dot}`}></span>
                <span className="project-name">{p.name}</span>
                {p.status === 'active' && <span className="project-count">{p.count} LOGS</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section flex-1">
          <p className="section-label">RECENT TASKS</p>
          <div className="space-y-1.5">
            {recentTasks.map(t => (
              <div key={t.id} className="recent-task-item">
                <p className="task-title" title={t.title}>{t.title}</p>
                <p className="task-meta mono" title={t.time}>{t.time}</p>
                {t.badges.length > 0 && (
                  <div className="task-badges">
                    {t.badges.map((b, i) => (
                      <span key={i} className={`task-badge ${b.includes('Excel') ? 'task-badge-excel' : b.includes('PPT') ? 'task-badge-ppt' : 'task-badge-generic'}`}>{b}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="section-label mt-4">ACTIVE SKILLS</p>
          <div className="space-y-1">
            {skills.map(s => (
              <div key={s.id} className="skill-item">
                <span className={`dot dot-${s.active ? 'emerald' : 'zinc'}`}></span>
                <span className="skill-name">{s.name}</span>
                <span className="skill-status">{s.active ? 'on' : 'off'}</span>
              </div>
            ))}
            <button className="manage-skills-btn" onClick={onManageSkills}>Manage skills →</button>
          </div>
        </div>

        <div className="sidebar-footer">
          <span className="mono" style={{ fontSize: '7px', color: '#52525b', letterSpacing: '0.02em' }}>DB: PostGIS</span>
          <span className="dot dot-emerald"></span>
        </div>
      </div>

      {/* CENTER CHAT */}
      <div className="agent-center">
        <div className="center-header">
          <span className="header-label">AGENT CHAT</span>
          <span className="header-status mono">auto-tool • excel • pptx • postgis • skills:4</span>
          <div className="flex-1"></div>
          <button className="header-btn"><i className="ri-history-line"></i> History</button>
        </div>

        <div className="chat-area">
          {showNewAnalysis ? (
            <div className="new-analysis-form">
              <div className="new-analysis-welcome">
                <i className="ri-sparkles-line"></i>
                <h2>Start New Analysis</h2>
              </div>
              <textarea
                className="new-analysis-textarea"
                placeholder="Deskripsikan tugas…&#10;&#10;Contoh:&#10;• Analisa DT Cluster Jakarta, hitung KPI RSRP/SINR&#10;• Cari 5 worst spot dan beri rekomendasi tilt&#10;• Generate Excel + PPT dengan 5 slide&#10;&#10;Agent akan memilih skill & tools yang sesuai automatically."
                value={newAnalysisPrompt}
                onChange={e => setNewAnalysisPrompt(e.target.value)}
              />
              <div className="new-analysis-footer">
                <button
                  className="btn-start-now"
                  disabled={!newAnalysisPrompt.trim()}
                  onClick={() => {
                    console.log('Start analysis:', newAnalysisPrompt);
                    setShowNewAnalysis(false);
                    setNewAnalysisPrompt('');
                  }}
                >
                  <i className="ri-play-large-fill"></i> Start Analysis
                </button>
                <button className="btn-cancel-form" onClick={() => setShowNewAnalysis(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              {/* User message */}
              <div className="flex justify-end">
                <div className="user-message">
                  Analisa log DT_Jakarta_C1_0409.csv, hitung KPI RSRP/SINR/Throughput, cari 5 worst spot + rekomendasi tilt & neighbor, generate Excel + PPT 5 slide.
                </div>
              </div>

              {/* Agent response */}
              <div className="agent-msg-row">
                <div className="agent-avatar">
                  <i className="ri-cpu-line"></i>
                </div>
                <div className="flex-1 space-y-2">
                  {/* Execution log */}
                  <div className="execution-box">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="pulse-dot"></span>
                      Agent memanggil skill: <span className="skill-tag">Analyze Drive Test</span>
                    </div>
                    <div className="mt-2 space-y-1.5 mono text-[11px]">
                      {executionSteps.map(step => (
                        <div key={step.id} className="execution-step">
                          <i className={`${step.icon} text-${step.color}-400`}></i>
                          <span className="flex-1">{step.text}</span>
                          <span className={`status-${step.status}`}>{step.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="results-box">
                    <p className="text-sm"><b>Hasil cepat:</b> RSRP ≥ -100 dBm = 94.2% (target 95% — <span className="text-amber-400">slightly below</span>), SINR ≥ 5 dB = 81.4%, Avg DL 42.7 Mbps. 5 worst spot terdeteksi (skill logic).</p>
                    <div className="kpi-grid">
                      <div className="kpi-card">
                        <p className="kpi-label">RSRP AVG</p>
                        <p className="kpi-value">-87.3 dBm</p>
                      </div>
                      <div className="kpi-card">
                        <p className="kpi-label">SINR AVG</p>
                        <p className="kpi-value">7.2 dB</p>
                      </div>
                      <div className="kpi-card">
                        <p className="kpi-label">DL AVG</p>
                        <p className="kpi-value">42.7 Mbps</p>
                      </div>
                    </div>
                    <div className="export-buttons">
                      <button className="export-btn btn-excel"><i className="ri-file-excel-2-line"></i> Download Excel</button>
                      <button className="export-btn btn-pptx"><i className="ri-slideshow-line"></i> Download PPTX</button>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-2 mono">Next: skill <span className="text-violet-400">Generate PPTX Report</span> auto-triggered → 5 slides</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Input footer */}
        <div className="chat-footer">
          <div className="data-source-tabs">
            <button className="source-tab"><i className="ri-file-add-line text-violet-400"></i> DT Log</button>
            <button className="source-tab"><i className="ri-table-line text-emerald-400"></i> OSS</button>
            <button className="source-tab"><i className="ri-flashlight-line text-amber-400"></i> /skill</button>
            <button className="source-tab"><i className="ri-base-station-line text-sky-400"></i> Cell Master</button>
          </div>
          <div className="input-area">
            <button className="input-btn attach-btn"><i className="ri-attachment-2"></i></button>
            <textarea placeholder="Ketik /skill untuk pilih skill, atau tanya langsung..." className="input-field"></textarea>
            <button className="input-btn send-btn"><i className="ri-send-plane-fill"></i></button>
          </div>
          <p className="mono mt-1.5 text-center" style={{ fontSize: '7px', color: '#52525b', letterSpacing: '0.02em' }}>Python • PostGIS • Excel/PPTX • Skills auto-load → D:\TelecomReports\</p>
        </div>
      </div>

      {/* RIGHT PREVIEW */}
      <div className="agent-preview">
        <div className="preview-header">
          <span className="header-label">LIVE PREVIEW</span>
          <div className="preview-tabs">
            {(['Excel','PPT','Map'] as const).map(t=>(
              <button key={t} className={`preview-tab ${previewTab===t?'active':''}`} onClick={()=>setPreviewTab(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="preview-area">
          {/* Slide card */}
          <div className="slide-card">
            <div className="slide-header">
              <p className="slide-title">Cluster C1 — Executive Summary</p>
              <span className="slide-number">Slide 1/5</span>
            </div>
            <div className="slide-content">
              <div className="coverage-map">
                <i className="ri-map-2-line"></i> Coverage Map • RSRP distribution
              </div>
              <table className="kpi-table">
                <thead>
                  <tr>
                    <th>KPI</th>
                    <th>Value</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>RSRP ≥-100</td>
                    <td className="mono">94.2%</td>
                    <td className="text-amber-600">95% ✗</td>
                  </tr>
                  <tr>
                    <td>SINR ≥5dB</td>
                    <td className="mono">81.4%</td>
                    <td className="text-emerald-600">80% ✓</td>
                  </tr>
                  <tr>
                    <td>DL Thr</td>
                    <td className="mono">42.7 Mbps</td>
                    <td className="text-emerald-600">30 ✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="recommendations-box">
            <p className="recommendations-title">
              <i className="ri-lightbulb-line"></i> Rekomendasi (via RCA Engine skill)
            </p>
            <ol className="recommendations-list">
              <li><b>JKT_1023_2</b> — downtilt 3°→5° (overshooting)</li>
              <li><b>JKT_1018_1 ↔ 1020_3</b> — PCI confusion (148→312)</li>
              <li><b>Add Neighbor</b> JKT_1015_1 → 1022_2 (42 HO fails)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
