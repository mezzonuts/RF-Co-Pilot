import { useState, useRef, useMemo } from 'react'
import { useParserCommand, useHealthCheck, type ParseResult, type KPIResult } from './hooks/useParserCommand'
import { useReporting, useQgisExport, useQdrantSearch, useDbCommands } from './hooks/useBackendCommands'
import AgentWorkspace from './components/AgentWorkspace';
import KnowledgeVault from './components/KnowledgeVault';

function isParseResult(d: ParseResult | KPIResult): d is ParseResult { return 'rows' in d && 'columns' in d }
function isKPIResult(d: ParseResult | KPIResult): d is KPIResult { return 'result' in d && 'action' in d }

type Tab = 'agent' | 'vault' | 'tools' | 'skills'
type Provider = 'ollama'|'openrouter'|'openai'|'anthropic'|'hf'|'custom'

const MODELS: Record<Provider,string[]> = {
  ollama: ['qwen2.5:32b','qwen2.5:72b','llama3.3:70b','deepseek-r1:32b','mistral-nemo:12b'],
  openrouter: ['qwen/qwen-2.5-32b','anthropic/claude-3.5-sonnet','openai/gpt-4o'],
  openai: ['gpt-4o','gpt-4o-mini','o1-preview'],
  anthropic: ['claude-3-5-sonnet-20241022','claude-3-5-haiku-20241022'],
  hf: ['Qwen/Qwen2.5-32B-Instruct','meta-llama/Llama-3.3-70B-Instruct'],
  custom: ['custom-model'],
}

export default function App() {
  const [tab, setTab] = useState<Tab>('agent')
  const [llmOpen, setLlmOpen] = useState(false)
  const [skillDetailId, setSkillDetailId] = useState<string|null>(null)
  const [newSkillOpen, setNewSkillOpen] = useState(false)

  // LLM settings state — mirrors mock
  const [provider, setProvider] = useState<Provider>('ollama')
  const [model, setModel] = useState('qwen2.5:32b')
  const [baseUrl, setBaseUrl] = useState('http://localhost:11434/v1')
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [temp, setTemp] = useState(0.30)
  const [maxTokens, setMaxTokens] = useState(4096)
  const [ctxWindow, setCtxWindow] = useState('32K')
  const [systemPrompt, setSystemPrompt] = useState('You are TelecomAgent — expert RF engineer for 4G/5G. Help optimize networks using precise technical knowledge. Always cite 3GPP/vendor sources when relevant. Generate Excel/PPT outputs via tools.')
  const [testResult, setTestResult] = useState<{msg:string, ok:boolean}|null>(null)
  const [testing, setTesting] = useState(false)

  // Skills
  const [skillSearch, setSkillSearch] = useState('')
  const [skillCategory, setSkillCategory] = useState('all')
  const [skillsOn, setSkillsOn] = useState<Record<string,boolean>>({
    'analyze-dt': true, 'gen-pptx': true, 'oss-kpi': true, 'rca': true, 'coverage': false, 'tilt': false,
  })
  const allSkills = [
    { id:'analyze-dt', name:'Analyze Drive Test', cat:'drive-test', desc:'Parse CSV/TXT DT logs, hitung KPI (RSRP/SINR/Throughput), detect 5 worst spots, generate Excel report.', tags:['drive-test','kpi','excel','autopilot'], file:'SKILL - Analyze Drive Test.md', icon:'ri-route-line', color:'violet' },
    { id:'gen-pptx', name:'Generate PPTX Report', cat:'reporting', desc:'Convert KPI Excel → 5-slide executive deck (cover, summary, coverage map, worst spots, recommendations).', tags:['reporting','pptx'], file:'SKILL - Generate PPTX Report.md', icon:'ri-slideshow-line', color:'orange' },
    { id:'oss-kpi', name:'OSS KPI Weekly Report', cat:'kpi', desc:'Aggregate Ericsson/Huawei/Nokia counters, trending per cell, flag degradation >5%.', tags:['oss','kpi','trending'], file:'SKILL - OSS KPI Weekly Report.md', icon:'ri-bar-chart-box-line', color:'sky' },
    { id:'rca', name:'RCA Engine', cat:'rca', desc:'Rule-based + RAG diagnostics: overshooting, PCI collision, missing neighbor → actionable fix.', tags:['rca','postgis'], file:'SKILL - RCA Engine.md', icon:'ri-bug-line', color:'amber' },
    { id:'coverage', name:'Coverage Map', cat:'optimization', desc:'Generate RSRP/SINR heatmap PNG via Folium + GeoJSON — overlay cell azimuth & tilt.', tags:['folium','optimization'], file:'SKILL - Coverage Map.md', icon:'ri-map-2-line', color:'zinc' },
    { id:'tilt', name:'Tilt Optimizer', cat:'optimization', desc:'Slope-based electronic tilt suggestion per cell — minimize overshooting, maximize overlap control.', tags:['optimization','tilt'], file:'SKILL - Tilt Optimizer.md', icon:'ri-compass-3-line', color:'zinc' },
  ]
  const activeCount = useMemo(()=> Object.values(skillsOn).filter(Boolean).length, [skillsOn])
  const filteredSkills = allSkills.filter(s => {
    const catOk = skillCategory==='all' || s.cat===skillCategory
    const qOk = !skillSearch || s.name.toLowerCase().includes(skillSearch.toLowerCase())
    return catOk && qOk
  })
  const toggleSkill = (id:string) => setSkillsOn(prev=>({...prev,[id]:!prev[id]}))

  // Provider change — mirrors mock onProviderChange
  const onProviderChange = (p:Provider) => {
    setProvider(p)
    const first = MODELS[p][0]
    if (first) setModel(first)
    if (p==='ollama') setBaseUrl('http://localhost:11434/v1')
    setTestResult(null)
  }
  const doTestLLM = () => {
    setTesting(true); setTestResult(null)
    setTimeout(()=>{ setTesting(false); setTestResult({msg:'✓ Connected — '+model+' responded in 412ms', ok:true}) }, 900)
  }
  const llmStatusText = `${model} • ${activeCount} skills on`

  // Backend hooks (kept for future wiring)
  const { isPending: parseLoading, data: parseData, error: parseError, parseFile, computeKPI } = useParserCommand()
  const { pending: repLoading, exportReport } = useReporting()

  const tools = [
    { icon:'ri-file-csv-line', color:'violet', title:'DT Log Parser', desc:'Parse TEMS/Nemo CSV — polars', tags:['Python','Polars'], badge:'READY', badgeColor:'emerald' },
    { icon:'ri-bar-chart-2-line', color:'emerald', title:'KPI Calculator', desc:'RSRP, SINR, Throughput stats', tags:['DuckDB'], badge:'READY', badgeColor:'emerald' },
    { icon:'ri-database-line', color:'sky', title:'PostGIS Query', desc:'Cell Master + spatial joins', tags:['PostGIS'], badge:'READY', badgeColor:'emerald' },
    { icon:'ri-file-excel-2-line', color:'emerald', title:'Excel Generator', desc:'Automated xlsx with pivot', tags:['Openpyxl'], badge:'READY', badgeColor:'emerald' },
    { icon:'ri-slideshow-line', color:'orange', title:'PPTX Generator', desc:'Executive summary deck', tags:['python-pptx'], badge:'READY', badgeColor:'emerald' },
    { icon:'ri-map-2-line', color:'amber', title:'Coverage Map', desc:'RSRP/SINR heatmap PNG', tags:['Folium'], badge:'BETA', badgeColor:'amber' },
    { icon:'ri-lightbulb-line', color:'amber', title:'RCA Engine', desc:'Root cause analysis rules', tags:['Qdrant RAG'], badge:'BETA', badgeColor:'amber' },
    { icon:'ri-book-mark-line', color:'violet', title:'Vault Indexer', desc:'3GPP & vendor doc index', tags:['Qdrant','RAG'], badge:'READY', badgeColor:'emerald' },
  ]

  const hintText = provider==='ollama' ? 'Local — no API key needed. Pastikan Ollama running.'
    : provider==='openrouter' ? 'OpenRouter — 1 key untuk banyak model.'
    : provider==='openai' ? 'OpenAI API — butuh sk-...'
    : provider==='anthropic' ? 'Anthropic API.'
    : 'Custom endpoint — isi Base URL + API key jika perlu.'

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',background:'#0a0a0f',color:'#e4e4e7',fontFamily:'Inter, system-ui, sans-serif'}} className="select-none">
      {/* TOPBAR — pixel match mock: h-[44px] bg-[#111117] */}
      <div style={{height:44,background:'#111117',borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',padding:'0 12px',gap:12,flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:28,height:28,borderRadius:8,background:'linear-gradient(135deg,#7c3aed,#4f46e5)',display:'flex',alignItems:'center',justifyContent:'center'}}><i className="ri-signal-cellular-3-line" style={{color:'#fff',fontSize:16}}></i></div>
          <span style={{fontWeight:600,fontSize:14,letterSpacing:-0.2}}>TelecomAgent</span>
          <span style={{fontSize:11,background:'#27272a',border:'1px solid #3f3f46',padding:'2px 6px',borderRadius:4,fontFamily:'JetBrains Mono, monospace',color:'#a1a1aa',fontWeight:500}}>RF COPILOT v0.3</span>
        </div>
        <div style={{height:20,width:1,background:'#27272a',margin:'0 4px'}} />
        <div style={{display:'flex',alignItems:'center',gap:4,background:'#0a0a0f',border:'1px solid #27272a',borderRadius:999,padding:4}}>
          {(['agent','vault','tools','skills'] as Tab[]).map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{padding:'4px 12px',borderRadius:999,fontSize:12,fontWeight:500,border:'none',cursor:'pointer',background:tab===t?'#fff':'transparent',color:tab===t?'#000':'#a1a1aa',textTransform:'capitalize'}}>{t}</button>
          ))}
        </div>
        <div style={{flex:1}} />
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          <span style={{width:8,height:8,background:'#10b981',borderRadius:999,display:'inline-block'}} className="animate-pulse" />
          <span className="mono" style={{fontSize:12,color:'#a1a1aa',fontFamily:'JetBrains Mono, monospace'}}>{llmStatusText}</span>
          <div style={{height:16,width:1,background:'#3f3f46',margin:'0 4px'}} />
          <button onClick={()=>setLlmOpen(true)} title="LLM Settings" style={{width:28,height:28,background:'#27272a',border:'1px solid #3f3f46',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><i className="ri-settings-3-line" style={{color:'#a1a1aa',fontSize:14}}></i></button>
          <button onClick={()=>setTab('skills')} title="Skills" style={{width:28,height:28,background:'#27272a',border:'1px solid #3f3f46',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><i className="ri-flashlight-line" style={{color:'#a1a1aa',fontSize:14}}></i></button>
          <div style={{width:28,height:28,borderRadius:999,background:'#27272a',border:'1px solid #3f3f46',display:'flex',alignItems:'center',justifyContent:'center'}}><i className="ri-user-3-line" style={{color:'#a1a1aa'}}></i></div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{display:'flex',flex:1,overflow:'hidden'}}>
        {tab==='agent' && <AgentWorkspace onManageSkills={()=>setTab('skills')} />}
        {tab==='vault' && <KnowledgeVault />}

        {tab==='tools' && (
          <div style={{flex:1,display:'flex',flexDirection:'column',background:'#0a0a0f',overflow:'hidden'}}>
            <div style={{height:40,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',padding:'0 16px',gap:8}}>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a'}}>AVAILABLE TOOLS</span>
              <span style={{fontSize:11,background:'#18181b',border:'1px solid #27272a',padding:'2px 8px',borderRadius:999,fontFamily:'JetBrains Mono, monospace',color:'#71717a'}}>8 tools • dipanggil via Skills</span>
              <button onClick={()=>setTab('skills')} style={{marginLeft:'auto',fontSize:12,background:'#7c3aed',color:'#fff',border:'none',padding:'4px 12px',borderRadius:8,cursor:'pointer'}}>Manage Skills →</button>
            </div>
            <div style={{flex:1,overflowY:'auto',padding:16}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {tools.map(t=>(
                  <div key={t.title} className="skill-card" style={{background:'#14141b',border:'1px solid #27272a',borderRadius:12,padding:12}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}><i className={t.icon} style={{color: t.color==='violet'?'#a78bfa':t.color==='emerald'?'#34d399':t.color==='sky'?'#38bdf8':t.color==='orange'?'#fb923c':'#fbbf24',fontSize:18}}></i><span style={{fontSize:10,background: t.badgeColor==='emerald'?'#022c22':'#422006',color: t.badgeColor==='emerald'?'#34d399':'#fbbf24',border:'1px solid '+ (t.badgeColor==='emerald'?'#065f46':'#92400e'),padding:'2px 6px',borderRadius:4}}>{t.badge}</span></div>
                    <p style={{fontSize:12,fontWeight:600}}>{t.title}</p><p style={{fontSize:11,color:'#71717a',marginTop:4}}>{t.desc}</p>
                    <div style={{display:'flex',gap:4,marginTop:8}}>{t.tags.map(tag=><span key={tag} style={{fontSize:10,background:'#27272a',padding:'2px 6px',borderRadius:4}}>{tag}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==='skills' && (
          <div style={{flex:1,display:'flex',flexDirection:'column',background:'#0a0a0f',overflow:'hidden'}}>
            <div style={{height:40,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',padding:'0 16px',gap:12}}>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a'}}>SKILLS</span>
              <span style={{fontSize:11,background:'#18181b',border:'1px solid #27272a',padding:'2px 8px',borderRadius:999,fontFamily:'JetBrains Mono, monospace',color:'#71717a'}}>{allSkills.length} skills • {activeCount} active</span>
              <div style={{flex:1}} />
              <div style={{position:'relative',display:'flex',alignItems:'center'}}>
                <i className="ri-search-line" style={{position:'absolute',left:8,fontSize:12,color:'#71717a'}}></i>
                <input value={skillSearch} onChange={e=>setSkillSearch(e.target.value)} placeholder="Search skills..." style={{background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'6px 12px 6px 28px',fontSize:12,width:200,outline:'none',color:'#e4e4e7'}} />
              </div>
              <button onClick={()=>setNewSkillOpen(true)} style={{background:'#7c3aed',color:'#fff',border:'none',padding:'6px 12px',borderRadius:8,fontSize:12,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',gap:6}}><i className="ri-add-line"></i> New Skill</button>
            </div>
            <div style={{padding:'8px 16px',borderBottom:'1px solid rgba(39,39,42,0.5)',display:'flex',gap:6,overflowX:'auto'}}>
              {[
                {id:'all',label:'All'},{id:'drive-test',label:'Drive Test'},{id:'reporting',label:'Reporting'},{id:'rca',label:'RCA'},{id:'kpi',label:'KPI'},{id:'optimization',label:'Optimization'},
              ].map(c=>(
                <button key={c.id} onClick={()=>setSkillCategory(c.id)} style={{fontSize:11,padding:'4px 10px',borderRadius:999,whiteSpace:'nowrap',border:'1px solid #27272a',background: skillCategory===c.id ? '#fff' : '#18181b', color: skillCategory===c.id ? '#000' : '#a1a1aa', fontWeight: skillCategory===c.id ? 600 : 400, cursor:'pointer'}}>{c.label}</button>
              ))}
            </div>
            <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:8}}>
              {filteredSkills.map(s=>{
                const isOn = !!skillsOn[s.id]
                return (
                  <div key={s.id} onClick={()=>setSkillDetailId(s.id)} style={{background:'#14141b',border:'1px solid #27272a',borderRadius:12,padding:12,display:'flex',gap:12,cursor:'pointer',opacity:isOn?1:0.6}}>
                    <div style={{width:36,height:36,borderRadius:8,background: isOn ? (s.color==='violet'?'rgba(124,58,237,0.2)':s.color==='orange'?'rgba(234,88,12,0.2)':s.color==='sky'?'rgba(14,116,144,0.2)':'rgba(245,158,11,0.2)') : 'rgba(63,63,70,0.2)',border:'1px solid '+(isOn?(s.color==='violet'?'rgba(124,58,237,0.3)':s.color==='orange'?'rgba(234,88,12,0.3)':s.color==='sky'?'rgba(14,116,144,0.3)':'rgba(245,158,11,0.3)'):'rgba(63,63,70,0.3)'),display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><i className={s.icon} style={{color: isOn ? (s.color==='violet'?'#a78bfa':s.color==='orange'?'#fb923c':s.color==='sky'?'#38bdf8':'#fbbf24') : '#71717a'}}></i></div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                        <span style={{fontSize:13,fontWeight:600,color: isOn?'#fff':'#d4d4d8'}}>{s.name}</span>
                        <span style={{fontSize:10,background: isOn?'#022c22':'#27272a',color: isOn?'#34d399':'#a1a1aa',border:'1px solid '+(isOn?'#065f46':'#3f3f46'),padding:'2px 6px',borderRadius:4}}>{isOn?'ACTIVE':'OFF'}</span>
                        <span style={{fontSize:10,fontFamily:'JetBrains Mono, monospace',color:'#71717a'}}>{s.file}</span>
                      </div>
                      <p style={{fontSize:12,color: isOn?'#a1a1aa':'#71717a',marginTop:4,lineHeight:1.5}}>{s.desc}</p>
                      <div style={{display:'flex',gap:4,marginTop:8,flexWrap:'wrap'}}>{s.tags.map(t=><span key={t} style={{fontSize:10,background:'#27272a',border:'1px solid #3f3f46',padding:'2px 6px',borderRadius:4,fontFamily:'JetBrains Mono, monospace'}}>{t}</span>)}</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8,flexShrink:0}}>
                      <div onClick={e=>{e.stopPropagation();toggleSkill(s.id)}} style={{width:36,height:20,background: isOn?'#7c3aed':'#27272a',borderRadius:999,position:'relative',cursor:'pointer',transition:'background 0.2s'}}><div style={{position:'absolute',top:2,left: isOn?18:2,width:16,height:16,background:'#fff',borderRadius:999,transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.3)'}} /></div>
                      <span style={{fontSize:11,color:'#a78bfa'}}>View →</span>
                    </div>
                  </div>
                )
              })}
              <div style={{marginTop:8,padding:12,background:'#14141b',border:'1px dashed #3f3f46',borderRadius:12,textAlign:'center'}}>
                <p style={{fontSize:12,color:'#a1a1aa'}}><i className="ri-lightbulb-line"></i> Skills = file <span style={{fontFamily:'JetBrains Mono, monospace',color:'#a78bfa'}}>SKILL - *.md</span> di vault. Edit langsung di Vault atau klik New Skill.</p>
                <p style={{fontSize:11,color:'#71717a',marginTop:4}}>Mirip Hermes: YAML frontmatter (title, description, tags) + steps + pitfalls.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LLM MODAL — Hermes-style */}
      {llmOpen && (
        <>
          <div onClick={()=>setLlmOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(4px)',zIndex:40}} />
          <div style={{position:'fixed',right:0,top:0,bottom:0,width:440,background:'#0f0f14',borderLeft:'1px solid #27272a',zIndex:50,overflowY:'auto',boxShadow:'0 20px 40px rgba(0,0,0,0.6)',display:'flex',flexDirection:'column'}}>
            <div style={{height:56,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',position:'sticky',top:0,background:'#0f0f14',flexShrink:0}}>
              <span style={{fontWeight:600,fontSize:14,display:'flex',alignItems:'center',gap:8}}><i className="ri-settings-3-line" style={{color:'#a78bfa'}}></i> LLM Configuration</span>
              <button onClick={()=>setLlmOpen(false)} style={{width:28,height:28,background:'#18181b',border:'1px solid #27272a',borderRadius:8,cursor:'pointer'}}><i className="ri-close-line"></i></button>
            </div>
            <div style={{padding:16,display:'flex',flexDirection:'column',gap:20}}>
              <div>
                <div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>PROVIDER</div>
                <select value={provider} onChange={e=>onProviderChange(e.target.value as Provider)} style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'10px 12px',color:'#e4e4e7',outline:'none'}}>
                  <option value="ollama">Ollama (Local)</option>
                  <option value="openrouter">OpenRouter</option>
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="hf">Hugging Face Inference</option>
                  <option value="custom">Custom OpenAI-compatible</option>
                </select>
                <p style={{fontSize:11,color:'#71717a',marginTop:6,fontFamily:'JetBrains Mono, monospace'}}>{hintText}</p>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>MODEL</div>
                <select value={model} onChange={e=>setModel(e.target.value)} style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'10px 12px',color:'#e4e4e7',outline:'none'}}>
                  {MODELS[provider].map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <button style={{fontSize:11,background:'#18181b',border:'1px solid #27272a',padding:'4px 10px',borderRadius:8}}><i className="ri-refresh-line"></i> Refresh models</button>
                  <button style={{fontSize:11,background:'#18181b',border:'1px solid #27272a',padding:'4px 10px',borderRadius:8}}>ollama list</button>
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>BASE URL</div>
                <input value={baseUrl} onChange={e=>setBaseUrl(e.target.value)} style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 12px',color:'#e4e4e7',fontFamily:'JetBrains Mono, monospace',fontSize:13,outline:'none'}} />
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>API KEY <span style={{fontWeight:400,textTransform:'none',letterSpacing:0,color:'#71717a'}}>— untuk cloud provider</span></div>
                <div style={{position:'relative'}}>
                  <input type={showKey?'text':'password'} value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-... / sk-or-..." style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 36px 8px 12px',color:'#e4e4e7',fontFamily:'JetBrains Mono, monospace',fontSize:13,outline:'none'}} />
                  <button onClick={()=>setShowKey(v=>!v)} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',width:24,height:24,background:'transparent',border:'none',cursor:'pointer',color:'#71717a'}}><i className={showKey?'ri-eye-off-line':'ri-eye-line'}></i></button>
                </div>
                <p style={{fontSize:10,color:'#71717a',marginTop:4}}>Disimpan lokal (encrypted). Tidak dikirim kemana-mana.</p>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>TEMPERATURE <span style={{fontFamily:'JetBrains Mono, monospace',fontWeight:400,textTransform:'none',letterSpacing:0,color:'#a1a1aa'}}>{temp.toFixed(2)}</span></div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <input type="range" min={0} max={1} step={0.05} value={temp} onChange={e=>setTemp(parseFloat(e.target.value))} style={{flex:1,accentColor:'#7c3aed'}} />
                  <span style={{fontSize:11,color:'#71717a',whiteSpace:'nowrap'}}>Deterministik → Kreatif</span>
                </div>
                <p style={{fontSize:11,color:'#71717a',marginTop:4}}>0.1–0.3 untuk analisis KPI (presisi), 0.7+ untuk brainstorming.</p>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div><div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>MAX TOKENS</div><input type="number" value={maxTokens} onChange={e=>setMaxTokens(parseInt(e.target.value)||4096)} style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 12px',color:'#e4e4e7',fontFamily:'JetBrains Mono, monospace',outline:'none'}} /></div>
                <div><div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>CONTEXT WINDOW</div>
                  <select value={ctxWindow} onChange={e=>setCtxWindow(e.target.value)} style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 12px',color:'#e4e4e7',outline:'none'}}>
                    <option>8K</option><option>32K</option><option>128K</option><option>200K</option>
                  </select>
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>SYSTEM PROMPT</div>
                <textarea rows={4} value={systemPrompt} onChange={e=>setSystemPrompt(e.target.value)} style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 12px',color:'#e4e4e7',fontFamily:'JetBrains Mono, monospace',fontSize:12,outline:'none',resize:'none'}} />
              </div>
              <div style={{background:'#14141b',border:'1px solid #27272a',borderRadius:12,padding:12,display:'flex',flexDirection:'column',gap:8}}>
                <p style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a'}}>RAG & TOOLS</p>
                <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,cursor:'pointer'}}><input type="checkbox" defaultChecked style={{accentColor:'#7c3aed'}} /> RAG enabled (Qdrant) <span style={{marginLeft:'auto',fontSize:11,color:'#71717a',fontFamily:'JetBrains Mono, monospace'}}>3 collections</span></label>
                <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,cursor:'pointer'}}><input type="checkbox" defaultChecked style={{accentColor:'#7c3aed'}} /> Auto-index Vault (.md → vectors)</label>
                <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,cursor:'pointer'}}><input type="checkbox" defaultChecked style={{accentColor:'#7c3aed'}} /> Graph-aware traversal</label>
                <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,cursor:'pointer'}}><input type="checkbox" defaultChecked style={{accentColor:'#7c3aed'}} /> Skill auto-load on chat</label>
              </div>
              <button onClick={doTestLLM} disabled={testing} style={{width:'100%',background:'#18181b',border:'1px solid #27272a',padding:'10px',borderRadius:8,fontSize:13,cursor:'pointer',color:'#e4e4e7'}}><i className="ri-plug-line"></i> {testing?'Testing...':'Test Connection'}</button>
              {testResult && <p style={{fontSize:12,textAlign:'center',color: testResult.ok?'#34d399':'#f87171'}}>{testResult.msg}</p>}
              <div style={{display:'flex',gap:8,paddingTop:8,borderTop:'1px solid #27272a'}}>
                <button onClick={()=>setLlmOpen(false)} style={{flex:1,background:'#18181b',border:'1px solid #27272a',padding:'10px',borderRadius:8,fontSize:13,cursor:'pointer',color:'#e4e4e7'}}>Cancel</button>
                <button onClick={()=>setLlmOpen(false)} style={{flex:1,background:'#7c3aed',border:'none',padding:'10px',borderRadius:8,fontSize:13,fontWeight:500,cursor:'pointer',color:'#fff'}}>Save & Apply</button>
              </div>
              <p style={{fontSize:11,color:'#71717a',textAlign:'center'}}>Config disimpan di <span style={{fontFamily:'JetBrains Mono, monospace'}}>config.yaml</span> — hot-reload tanpa restart.</p>
            </div>
          </div>
        </>
      )}

      {/* SKILL DETAIL MODAL */}
      {skillDetailId && (
        <>
          <div onClick={()=>setSkillDetailId(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(4px)',zIndex:40}} />
          <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
            <div style={{background:'#0f0f14',border:'1px solid #27272a',borderRadius:16,width:'100%',maxWidth:640,maxHeight:'85vh',overflow:'hidden',display:'flex',flexDirection:'column',boxShadow:'0 20px 40px rgba(0,0,0,0.6)'}}>
              <div style={{height:56,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',padding:'0 20px',gap:12,flexShrink:0}}>
                <div style={{width:32,height:32,borderRadius:8,background:'rgba(124,58,237,0.2)',border:'1px solid rgba(124,58,237,0.3)',display:'flex',alignItems:'center',justifyContent:'center'}}><i className="ri-quill-pen-line" style={{color:'#a78bfa'}}></i></div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:13,fontWeight:600}}>{allSkills.find(s=>s.id===skillDetailId)?.name}</p>
                  <p style={{fontSize:11,fontFamily:'JetBrains Mono, monospace',color:'#71717a'}}>{allSkills.find(s=>s.id===skillDetailId)?.file}</p>
                </div>
                <button onClick={()=>setSkillDetailId(null)} style={{width:28,height:28,background:'#18181b',border:'1px solid #27272a',borderRadius:8,cursor:'pointer'}}><i className="ri-close-line"></i></button>
              </div>
              <div style={{flex:1,overflowY:'auto',padding:20,display:'flex',flexDirection:'column',gap:16,fontSize:13}}>
                <div style={{background:'#14141b',border:'1px solid #27272a',borderRadius:12,padding:12}}>
                  <p style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:8}}>FRONTMATTER (YAML)</p>
                  <pre style={{fontFamily:'JetBrains Mono, monospace',fontSize:11,color:'#d4d4d8',whiteSpace:'pre-wrap'}}>{`---\ntitle: "${allSkills.find(s=>s.id===skillDetailId)?.name}"\ndescription: "${allSkills.find(s=>s.id===skillDetailId)?.desc.slice(0,40)}..."\ntags: [${allSkills.find(s=>s.id===skillDetailId)?.tags.join(', ')}]\n---`}</pre>
                </div>
                <div><p style={{fontSize:12,fontWeight:600,marginBottom:8}}>Trigger phrases</p><ul style={{fontSize:12,color:'#a1a1aa',paddingLeft:16,display:'flex',flexDirection:'column',gap:4}}><li>"Analisa log DT_Jakarta.csv"</li><li>"Hitung KPI RSRP/SINR/Throughput"</li><li>"Cari 5 worst spot"</li></ul></div>
                <div><p style={{fontSize:12,fontWeight:600,marginBottom:8}}>Steps (ringkas)</p><ol style={{fontSize:12,color:'#a1a1aa',paddingLeft:16,display:'flex',flexDirection:'column',gap:4}}><li>Parse CSV/TXT → DataFrame (polars)</li><li>Join cell_master via PostGIS</li><li>Calc KPI + worst spots</li><li>Generate Excel (.xlsx) + preview</li></ol></div>
                <div style={{background:'rgba(120,53,15,0.3)',border:'1px solid rgba(146,64,14,0.5)',borderRadius:8,padding:12}}>
                  <p style={{fontSize:12,fontWeight:600,color:'#fbbf24',display:'flex',alignItems:'center',gap:6}}><i className="ri-error-warning-line"></i> Pitfalls</p>
                  <p style={{fontSize:12,color:'#a1a1aa',marginTop:4}}>Pastikan CSV header sesuai (RSRP, SINR). Jika TXT/NRT format, gunakan parser terpisah.</p>
                </div>
              </div>
              <div style={{padding:16,borderTop:'1px solid #27272a',display:'flex',gap:8}}>
                <button onClick={()=>setSkillDetailId(null)} style={{flex:1,background:'#18181b',border:'1px solid #27272a',padding:'8px',borderRadius:8,fontSize:13,cursor:'pointer'}}>Close</button>
                <button style={{flex:1,background:'#18181b',border:'1px solid #27272a',padding:'8px',borderRadius:8,fontSize:13,cursor:'pointer'}}><i className="ri-edit-line"></i> Edit .md</button>
                <button style={{flex:1,background:'#7c3aed',color:'#fff',border:'none',padding:'8px',borderRadius:8,fontSize:13,fontWeight:500,cursor:'pointer'}}>Test Skill</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* NEW SKILL MODAL */}
      {newSkillOpen && (
        <>
          <div onClick={()=>setNewSkillOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(4px)',zIndex:40}} />
          <div style={{position:'fixed',inset:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
            <div style={{background:'#0f0f14',border:'1px solid #27272a',borderRadius:16,width:'100%',maxWidth:560,overflow:'hidden',display:'flex',flexDirection:'column',boxShadow:'0 20px 40px rgba(0,0,0,0.6)'}}>
              <div style={{height:56,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 20px',flexShrink:0}}>
                <span style={{fontSize:14,fontWeight:600}}>New Skill</span>
                <button onClick={()=>setNewSkillOpen(false)} style={{width:28,height:28,background:'#18181b',border:'1px solid #27272a',borderRadius:8,cursor:'pointer'}}><i className="ri-close-line"></i></button>
              </div>
              <div style={{padding:20,display:'flex',flexDirection:'column',gap:16}}>
                <div><div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:6}}>SKILL NAME</div><input placeholder="e.g. Handover Analyzer" style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 12px',fontSize:13,outline:'none',color:'#e4e4e7'}} /></div>
                <div><div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:6}}>DESCRIPTION (when to use)</div><input placeholder="Use when analyzing handover failures..." style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 12px',fontSize:13,outline:'none',color:'#e4e4e7'}} /></div>
                <div><div style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a',marginBottom:6}}>TAGS (comma separated)</div><input placeholder="handover, kpi, rca" style={{width:'100%',background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'8px 12px',fontSize:13,fontFamily:'JetBrains Mono, monospace',outline:'none',color:'#e4e4e7'}} /></div>
                <p style={{fontSize:12,color:'#71717a'}}>File akan dibuat: <span style={{fontFamily:'JetBrains Mono, monospace',color:'#a78bfa'}}>SKILL - [Name].md</span> dari template.</p>
              </div>
              <div style={{padding:16,borderTop:'1px solid #27272a',display:'flex',gap:8}}>
                <button onClick={()=>setNewSkillOpen(false)} style={{flex:1,background:'#18181b',border:'1px solid #27272a',padding:'8px',borderRadius:8,fontSize:13,cursor:'pointer'}}>Cancel</button>
                <button onClick={()=>{alert('Skill file akan dibuat dari SKILL - Template.md → isi title/description/tags lalu save.'); setNewSkillOpen(false)}} style={{flex:1,background:'#7c3aed',color:'#fff',border:'none',padding:'8px',borderRadius:8,fontSize:13,fontWeight:500,cursor:'pointer'}}>Create from Template</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
