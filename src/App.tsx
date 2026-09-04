import { useState } from 'react'

type Tab = 'agent' | 'vault' | 'tools' | 'skills'
type Provider = 'ollama' | 'openrouter' | 'openai' | 'anthropic'

const SKILLS = [
  { id:'analyze-dt', name:'Analyze Drive Test', desc:'Parse DT CSV → KPI → Excel', tags:['parser','kpi'], on:true },
  { id:'gen-pptx', name:'Generate PPTX Report', desc:'Excel → PPTX 5 slide deck', tags:['reporting'], on:true },
  { id:'oss-kpi', name:'OSS KPI Weekly', desc:'Trending KPI mingguan', tags:['kpi'], on:true },
  { id:'rca', name:'RCA Engine', desc:'Root cause analysis', tags:['rca'], on:true },
  { id:'coverage', name:'Coverage Map', desc:'Heatmap RSRP/SINR (Folium)', tags:['optimization'], on:false },
  { id:'tilt', name:'Tilt Optimizer', desc:'Rekomendasi tilt elektrik', tags:['optimization'], on:false },
]

export default function App(){
  const [tab,setTab]=useState<Tab>('agent')
  const [skills,setSkills]=useState(SKILLS)
  const [showLLM,setShowLLM]=useState(false)
  const [provider,setProvider]=useState<Provider>('ollama')
  const [model,setModel]=useState('qwen2.5:32b')
  const [temp,setTemp]=useState(0.3)
  const [filter,setFilter]=useState('all')

  const active=skills.filter(s=>s.on).length
  const filtered = filter==='all' ? skills : skills.filter(s=>s.tags.includes(filter))

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Topbar */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight">rf-copilot</span>
          <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">TelecomAgent v0.1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 mono hidden sm:inline">{model} • {active} skills on</span>
          <button onClick={()=>setShowLLM(true)} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700">⚙ LLM Settings</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
        {([
          ['agent','Agent Workspace'],
          ['vault','Knowledge Vault'],
          ['tools','Tools'],
          ['skills','Skills'],
        ] as const).map(([k,label])=>(
          <button key={k} onClick={()=>setTab(k)} className={`text-xs px-3 py-1.5 rounded-lg border ${tab===k?'bg-violet-600 border-violet-500 text-white':'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'}`}>{label}</button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {tab==='agent' && (
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-2">Agent Workspace — chat + tools</div>
              <div className="space-y-2 text-sm">
                <div className="bg-zinc-800 rounded-lg p-3"><span className="text-violet-400">skill load:</span> SKILL - Analyze Drive Test.md ✓<br/><span className="text-zinc-400">Drop DT CSV untuk mulai — akan generate KPI Excel otomatis.</span></div>
                <div className="bg-zinc-800 rounded-lg p-3 border border-violet-900/50">Contoh prompt: <code className="bg-zinc-700 px-1 rounded">Analisa DT_Jakarta.csv, cari 5 worst spot</code></div>
              </div>
              <div className="mt-3 flex gap-2">
                <input placeholder="Ketik prompt…  (/skill untuk trigger)" className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-600" />
                <button className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm">Send</button>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="text-xs text-zinc-500 mb-2">Live Preview — kosong (akan tampil Excel/PPT/Map setelah run skill)</div>
              <div className="h-32 border border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-xs text-zinc-600">Preview 360px</div>
            </div>
          </div>
        )}

        {tab==='vault' && (
          <div className="grid grid-cols-[220px_1fr_280px] gap-3 h-[60vh]">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs">
              <div className="font-semibold mb-2">Vault — D:\TelecomVault\</div>
              <div className="space-y-1 text-zinc-400">
                <div>📁 3GPP/</div><div className="pl-4">TS 38.331 - RRC.md</div>
                <div>📁 Vendor/</div><div className="pl-4">Huawei Hedex - HO.md</div>
                <div>📁 RCA/</div><div className="pl-4">Overshooting.md</div>
                <div>📁 SOP/</div>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
              <div className="text-xs text-zinc-500 mb-2">Editor — [[Wikilinks]] + #tags + backlinks</div>
              <div className="bg-zinc-950 rounded-lg p-3 text-xs mono text-zinc-300 whitespace-pre-wrap">{`# Overshooting — RCA

Cell [[JKT_1023_2]] overshooting ke cluster [[JKT_1024]].
Tag: #tilt #pci #rsrp

> 3GPP 38.331 §5.3 — RRC Reconfiguration

Agent Note: cek tilts di [[Tilt Optimizer]]`}</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs">
              <div className="font-semibold mb-2">Graph — 127 nodes / 342 links</div>
              <div className="h-40 bg-zinc-950 rounded-lg flex items-center justify-center text-zinc-600">react-force-graph placeholder</div>
              <div className="mt-2 text-zinc-500">RAG traversal: RRC → HO → PCI → RCA</div>
            </div>
          </div>
        )}

        {tab==='tools' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              ['Drive Test','Parser + KPI'],
              ['Performance','OSS counters'],
              ['Optimasi','Tilt / PCI'],
              ['Coverage Map','Folium heatmap'],
              ['Cell DB','PostGIS query'],
              ['RAG Search','Qdrant vault'],
              ['Report','Excel / PPTX'],
              ['Python','Sidecar status'],
            ].map(([t,d])=>(
              <div key={t} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="text-sm font-medium">{t}</div>
                <div className="text-xs text-zinc-500">{d}</div>
                <div className="mt-2 text-xs"><span className="w-2 h-2 inline-block bg-emerald-500 rounded-full mr-1"/>ready</div>
              </div>
            ))}
          </div>
        )}

        {tab==='skills' && (
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex gap-2">
              {['all','parser','kpi','rca','optimization','reporting'].map(f=>(
                <button key={f} onClick={()=>setFilter(f)} className={`text-xs px-2.5 py-1 rounded-full border ${filter===f?'bg-violet-600 border-violet-500':'bg-zinc-800 border-zinc-700 text-zinc-400'}`}>{f}</button>
              ))}
              <span className="ml-auto text-xs text-zinc-500">{active} on / {skills.length} total</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {filtered.map(s=>(
                <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div><div className="text-sm font-medium">{s.name}</div><div className="text-xs text-zinc-500">{s.desc}</div></div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={skills.find(x=>x.id===s.id)?.on} onChange={()=>setSkills(prev=>prev.map(x=>x.id===s.id?{...x,on:!x.on}:x))} className="sr-only peer" />
                      <div className="w-9 h-5 bg-zinc-700 peer-checked:bg-violet-600 rounded-full peer transition"></div>
                    </label>
                  </div>
                  <div className="flex gap-1">{s.tags.map(t=><span key={t} className="text-[10px] bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded-full text-zinc-400">#{t}</span>)}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-lg p-3">Skills = file <code>SKILL - *.md</code> dengan YAML frontmatter (title/description/tags). Toggle on/off = enable/disable. File ada di <code>D:\AI NOTE\AI Agent For telco\</code></div>
          </div>
        )}
      </div>

      {/* LLM Modal */}
      {showLLM && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={()=>setShowLLM(false)}>
          <div onClick={e=>e.stopPropagation()} className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between"><h2 className="font-semibold">LLM Settings — manual (Hermes-style)</h2><button onClick={()=>setShowLLM(false)} className="text-zinc-500 hover:text-zinc-200">✕</button></div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <label>Provider<select value={provider} onChange={e=>setProvider(e.target.value as Provider)} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5"><option value="ollama">Ollama (Local)</option><option value="openrouter">OpenRouter</option><option value="openai">OpenAI</option><option value="anthropic">Anthropic</option></select></label>
              <label>Model<input value={model} onChange={e=>setModel(e.target.value)} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5" placeholder="qwen2.5:32b" /></label>
              <label>Base URL<input placeholder={provider==='ollama'?'http://localhost:11434/v1':'https://api.openrouter.ai/api/v1'} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs" /></label>
              <label>API Key<input type="password" placeholder={provider==='ollama'?'(kosong untuk lokal)':'sk-...'} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5" /></label>
            </div>
            <label className="block text-sm">Temperature: {temp}<input type="range" min={0} max={1} step={0.1} value={temp} onChange={e=>setTemp(parseFloat(e.target.value))} className="w-full" /></label>
            <label className="block text-sm">System Prompt<textarea rows={3} defaultValue="Kamu adalah RF Engineer assistant untuk jaringan 4G/5G…" className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs" /></label>
            <div className="flex gap-2 justify-end"><button className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg">Test Connection</button><button onClick={()=>setShowLLM(false)} className="text-xs bg-violet-600 px-4 py-1.5 rounded-lg">Save & Apply</button></div>
            <div className="text-[11px] text-zinc-500">Config disimpan ke config.yaml — hot reload tanpa restart. Mirip Hermes manual LLM config.</div>
          </div>
        </div>
      )}
    </div>
  )
}
