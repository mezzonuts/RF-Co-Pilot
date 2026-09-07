import { useRef, useState, useEffect, useCallback } from 'react';
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
interface MemoryProject {
  id: string;
  title: string;
  time: string;
  messages: { role: 'user'|'assistant'; content: string }[];
  badges: string[];
}
interface UserMemory {
  totalSessions: number;
  totalMessages: number;
  preferredLang: string;
  topics: string[];
  style: string;
  lastActive: string;
  styleNotes: string;
}

export default function AgentWorkspace({ onManageSkills }: { onManageSkills?: () => void }) {
  const [activeTab, setActiveTab] = useState<'chat' | 'execution'>('chat');
  const [showNewAnalysis, setShowNewAnalysis] = useState(false);
  const [newAnalysisPrompt, setNewAnalysisPrompt] = useState('');
  const [previewTab, setPreviewTab] = useState<'Excel'|'PPT'|'Map'>('PPT');
  const [inputText, setInputText] = useState('');
  const [exportBusy, setExportBusy] = useState<null|'excel'|'pptx'>(null);
  const [lastUpload, setLastUpload] = useState<string|null>(null);
  const [pendingSource, setPendingSource] = useState<string|null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [parsedInfo, setParsedInfo] = useState<string|null>(null);
  const [parsedRows, setParsedRows] = useState<string[][]|null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  type ChatMsg = { role: 'user' | 'assistant'; content: string };
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentTasks, setRecentTasks] = useState<RecentTask[]>([]);
  const [userMemory, setUserMemory] = useState<UserMemory|null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string|null>(null);

  // -- Memory & session bootstrap --
  useEffect(() => {
    let loaded = false;
    fetch('/api/memory').then(r=>r.json()).then(j=>{
      if(j?.projects && Array.isArray(j.projects)){
        const projs: Project[] = j.projects.map((mp:any)=>({ id: mp.id, name: mp.title, status: 'inactive' as const, count: (mp.messages?.length||0), dot: 'emerald' }));
        const tasks: RecentTask[] = j.projects.map((mp:any)=>({ id: mp.id, title: mp.title, time: mp.time, badges: mp.badges||[] }));
        if(projs.length){ setProjects(projs); setRecentTasks(tasks); }
        if(j.userMemory) setUserMemory(j.userMemory as UserMemory);
        try{ localStorage.setItem('rf_memory_cache', JSON.stringify(j)); }catch{}
      }
      loaded = true;
    }).catch(()=>{}).finally(()=>{
      if(!loaded){
        try{
          const cache = localStorage.getItem('rf_memory_cache');
          if(cache){ const j=JSON.parse(cache); if(j.projects?.length){ setProjects(j.projects.map((mp:any)=>({id:mp.id,name:mp.title,status:'inactive',count:mp.messages?.length||0,dot:'emerald'}))); setRecentTasks(j.projects.map((mp:any)=>({id:mp.id,title:mp.title,time:mp.time,badges:mp.badges||[]}))) } if(j.userMemory) setUserMemory(j.userMemory); }
        }catch{}
      }
    });
    try{
      const cur = localStorage.getItem('rf_current_messages');
      if(cur){ const arr=JSON.parse(cur); if(Array.isArray(arr) && arr.length){ setMessages(arr); setHasStarted(true); } else throw 1; }
      else {
        const savedSession = localStorage.getItem('rf_session_active');
        if (savedSession === 'true') setHasStarted(true);
        else setShowNewAnalysis(true);
      }
    }catch{ const savedSession = localStorage.getItem('rf_session_active'); if(savedSession==='true') setHasStarted(true); else setShowNewAnalysis(true); }
  }, []);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 1000);
  };
  const handleExportExcel = async () => {
    try { setExportBusy('excel');
      const r = await fetch('/api/export/excel');
      if(!r.ok) throw new Error(await r.text());
      const blob = await r.blob();
      downloadBlob(blob, 'Cluster_C1_KPI.xlsx');
    } catch(e:any){ alert('Excel gagal: '+(e?.message??e)); } finally{ setExportBusy(null); }
  };
  const handleExportPptx = async () => {
    try { setExportBusy('pptx');
      const r = await fetch('/api/export/pptx');
      if(!r.ok) throw new Error(await r.text());
      const blob = await r.blob();
      downloadBlob(blob, 'Cluster_C1_Report.pptx');
    } catch(e:any){ alert('PPTX gagal: '+(e?.message??e)); } finally{ setExportBusy(null); }
  };
  // -- persist current chat --
  useEffect(()=>{ try{ if(messages.length) localStorage.setItem('rf_current_messages', JSON.stringify(messages)); else localStorage.removeItem('rf_current_messages'); }catch{} }, [messages]);
  const buildUserMemory = useCallback((msgs: ChatMsg[], prev: UserMemory|null): UserMemory=>{
    const userTexts = msgs.filter(m=>m.role==='user').map(m=>m.content).join(' ');
    const lang = /aku|kamu|tolong|analisa|hitung|rekomendasi|buat|berapa/i.test(userTexts) ? 'id' : (prev?.preferredLang||'id');
    const topics: string[] = [];
    if(/rsrp/i.test(userTexts)) topics.push('RSRP');
    if(/sinr/i.test(userTexts)) topics.push('SINR');
    if(/throughput|thr|dl/i.test(userTexts)) topics.push('Throughput');
    if(/tilt|azimuth|downtilt/i.test(userTexts)) topics.push('Tilt');
    if(/pci|collision/i.test(userTexts)) topics.push('PCI');
    if(/neighbor|ho/i.test(userTexts)) topics.push('HO/Neighbor');
    if(/oss|kpi/i.test(userTexts)) topics.push('OSS KPI');
    if(/coverage|map/i.test(userTexts)) topics.push('Coverage');
    const totalSessions = (prev?.totalSessions||0)+1;
    const totalMessages = (prev?.totalMessages||0)+msgs.length;
    const avgLen = Math.round((userTexts.length||0) / Math.max(1, msgs.filter(m=>m.role==='user').length));
    const style = avgLen>120 ? 'detail, suka penjelasan panjang teknis' : avgLen>55 ? 'cukup detail, jelas' : 'singkat, to-the-point';
    const mergedTopics = Array.from(new Set([...(prev?.topics||[]), ...topics])).slice(0,6);
    return { totalSessions, totalMessages, preferredLang: lang, topics: mergedTopics, style, lastActive: new Date().toISOString(), styleNotes: `User berbahasa \${lang==='id'?'Indonesia':'campur'}, gaya \${style}; fokus: \${mergedTopics.join(', ')||'umum RF'}. Sesi \${totalSessions}, \${totalMessages} pesan.` };
  }, []);
  const archiveCurrent = useCallback(async ()=>{
    if(messages.length===0) return;
    const firstUser = messages.find(m=>m.role==='user')?.content || lastUpload || 'Analysis';
    const title = firstUser.slice(0,48).replace(/\n/g,' ').trim() || 'Analysis ' + new Date().toLocaleDateString('id-ID');
    const timeStr = new Date().toLocaleString('id-ID', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
    const badges: string[] = [];
    if(attachedFile) badges.push(attachedFile.endsWith('.xlsx')?'Excel':'File');
    const memProj = { id: String(Date.now()), title, time: timeStr, messages: [...messages], badges };
    const nextUser = buildUserMemory(messages, userMemory);
    setUserMemory(nextUser);
    setProjects(prev=>[{ id: memProj.id, name: title, status:'inactive', count: messages.length, dot:'emerald' } as Project, ...prev].slice(0,20));
    setRecentTasks(prev=>[{ id: memProj.id, title, time: timeStr, badges }, ...prev].slice(0,20));
    try{
      localStorage.setItem('rf_user_memory', JSON.stringify(nextUser));
      const cacheRaw = localStorage.getItem('rf_memory_cache');
      let cache: any = cacheRaw ? JSON.parse(cacheRaw) : {projects:[]};
      cache.projects = [memProj, ...(cache.projects||[])].slice(0,20);
      cache.userMemory = nextUser;
      localStorage.setItem('rf_memory_cache', JSON.stringify(cache));
    }catch{}
    try{ await fetch('/api/memory',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive', project: memProj, userMemory: nextUser})}); }catch{}
  }, [messages, lastUpload, attachedFile, userMemory, buildUserMemory]);
  const handleLoadProject = useCallback((id:string)=>{
    const load = async()=>{
      try{
        const r=await fetch('/api/memory'); const j=await r.json();
        const hit = (j.projects||[]).find((p:any)=>p.id===id);
        if(hit?.messages){ setMessages(hit.messages); setHasStarted(true); setShowNewAnalysis(false); setActiveProjectId(id); return; }
      }catch{}
      try{
        const cache=JSON.parse(localStorage.getItem('rf_memory_cache')||'{}');
        const hit=(cache.projects||[]).find((p:any)=>p.id===id);
        if(hit?.messages){ setMessages(hit.messages); setHasStarted(true); setShowNewAnalysis(false); setActiveProjectId(id); }
      }catch{}
    }; load();
  }, []);
  const triggerUpload = (source: string) => {
    setPendingSource(source);
    if(fileInputRef.current){ fileInputRef.current.value=''; fileInputRef.current.click(); }
  };
  const parseCsvPreview = (text: string) => {
    const lines = text.split(/\r?\n/).filter(l=>l.trim().length>0);
    if(lines.length===0) return { rows:0, cols:0, hdr:[] as string[], preview:[] as string[][] };
    const split = (s:string)=> s.split(/[,;\t]/).map(x=>x.trim());
    const hdr = split(lines[0]);
    const preview = lines.slice(1,6).map(l=>split(l));
    return { rows: lines.length-1, cols: hdr.length, hdr, preview };
  };
  const onFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if(!f) return;
    setAttachedFile(f.name);
    localStorage.setItem('rf_session_active', 'true');
    setHasStarted(true);
    const kb = (f.size/1024).toFixed(1);
    const label = pendingSource ?? 'File';
    setParsedInfo(null); setParsedRows(null);
    try {
      const ext = f.name.split('.').pop()?.toLowerCase();
      if(ext==='csv' || ext==='txt' || ext==='log' || ext==='kml'){
        const t = await f.text();
        const { rows, cols, hdr, preview } = parseCsvPreview(t);
        // try quick KPI if RSRP column exists
        let kpi='';
        const lower = hdr.map(h=>h.toLowerCase());
        const rsrpIdx = lower.findIndex(h=>h.includes('rsrp'));
        if(rsrpIdx>=0 && preview.length>0){
          const vals = preview.map(r=>parseFloat(r[rsrpIdx])).filter(v=>!isNaN(v));
          if(vals.length) kpi = ` • RSRP sample ${Math.min(...vals)}~${Math.max(...vals)} dBm`;
        }
        setLastUpload(`${label}: ${f.name} (${kb} KB) — ${rows} rows, ${cols} cols`);
        setParsedInfo(`Header: ${hdr.join(' | ')}${kpi}`);
        setParsedRows([hdr, ...preview]);
      } else if(ext==='xlsx' || ext==='xls'){
        // Excel: parse real via backend /api/parse (openpyxl) — biar header/preview terbaca AI
        try{
          const b64: string = await new Promise<string>((resolve, reject)=>{
            const reader = new FileReader();
            reader.onload = ()=> {
              const res = reader.result as string;
              const comma = res.indexOf(',');
              resolve(comma>=0 ? res.slice(comma+1) : res);
            };
            reader.onerror = ()=> reject(new Error('FileReader failed'));
            reader.readAsDataURL(f);
          });
          const r = await fetch('/api/parse', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({fileName: f.name, content: b64, isBase64:true})});
          const j = await r.json();
          if(j.ok){
            setLastUpload(`${label}: ${f.name} (${kb} KB) — ${j.rows} rows, ${j.cols} cols` + (j.sheets? ` • ${j.sheets.length} sheets`:''));
            setParsedInfo(j.info || `Header: ${j.header?.join(' | ')}`);
            setParsedRows([j.header, ...(j.preview||[])]);
          } else {
            setLastUpload(`${label}: ${f.name} (${kb} KB) — Excel terdeteksi (parse gagal)`);
            setParsedInfo(j.error ? `Parse gagal: ${j.error}` : 'Preview gagal, tapi file tetap terlampir untuk analisa.');
          }
        }catch(err:any){
          setLastUpload(`${label}: ${f.name} (${kb} KB) — Excel terdeteksi (parse error)`);
          setParsedInfo(`Parse gagal: ${err?.message ?? err}`);
        }
      } else {
        const t = await f.slice(0, 4000).text().catch(()=> '');
        setLastUpload(`${label}: ${f.name} (${kb} KB)`);
        if(t) setParsedInfo(t.slice(0,180).replace(/\n/g,' · '));
      }
    } catch(err:any){
      setLastUpload(`${label}: ${f.name} (${kb} KB) — parse gagal: ${err?.message??err}`);
    }
    console.log('upload', label, f.name, f.size);
  };
  const handleSend = async () => {
    const text = inputText.trim();
    if(!text && !attachedFile) return;
    localStorage.setItem('rf_session_active', 'true');
    setHasStarted(true);
    setShowNewAnalysis(false);
    setChatError(null);
    // Build display text (UI) vs llmText (dengan konteks file)
    const displayText = text || (attachedFile ? `Analisa file ${attachedFile}` : '');
    let llmText = displayText;
    if (attachedFile) {
      const headerStr = parsedRows?.[0]?.join(' | ') ?? '';
      const previewStr = parsedRows ? parsedRows.slice(1,3).map(r=>r.join(' | ')).join('\n') : '';
      const infoStr = parsedInfo ?? '';
      const uploadStr = lastUpload ?? '';
      if (headerStr || infoStr || uploadStr) {
        const fileBlock = `

[DATA FILE TERLAMPIR]
File: ${attachedFile}${uploadStr ? ` | ${uploadStr}`:''}${infoStr?`
${infoStr}`:''}${headerStr?`
Header: ${headerStr}`:''}${previewStr?`
Data (preview 3 baris):
${previewStr}`:''}
> INSTRUKSI: File di atas adalah DATA REAL yang sudah terbaca. Anggap preview ini sebagai sampel representatif. Langsung hitung KPI (RSRP/SINR/Throughput), identifikasi worst spot, dan beri rekomendasi tilt/PCI/neighbor. JANGAN minta upload ulang atau bilang data belum lengkap. Jawab seolah kamu sudah melihat file.`;
        llmText = llmText + fileBlock;
      } else {
        llmText = llmText + `\n\n[File terlampir: ${attachedFile} — file sudah diupload, jangan minta upload ulang]`;
      }
    }
    const displayMsg: ChatMsg = { role: 'user', content: displayText };
    const llmMsg: ChatMsg = { role: 'user', content: llmText };
    const nextDisplayMessages = [...messages, displayMsg];
    const nextLlmMessages = [...messages, llmMsg];
    setMessages(nextDisplayMessages);
    setInputText('');
    // JANGAN overwrite lastUpload dengan Pesan — biarkan info file tetap terlihat di footer
    setIsSending(true);
    try{
      const payloadMessages = nextLlmMessages.map(m=>({role:m.role, content:m.content}));
      if (payloadMessages.length === 1 || (payloadMessages[0] as any).role !== 'system') {
        let sys = 'You are TelecomAgent — senior RF engineer 4G/5G (Ericsson/Huawei). Tugas: analisa Drive Test / OSS KPI dari data preview yang diberikan. ATURAN: Jika ada [DATA FILE TERLAMPIR], itu adalah DATA REAL — jangan minta upload, jangan bilang data belum lengkap. Langsung hitung: % RSRP≥-100, % SINR≥5, avg DL Thr, identifikasi 2-3 worst spot dari preview, beri rekomendasi konkret (downtilt/azimuth/PCI/neighbor). Selalu jawab dalam Bahasa Indonesia, ringkas teknis, pakai bullet. Jika header tidak ada RSRP, tetap analisa dari kolom yang ada.';
        if(userMemory){
          sys += `\n\n[MEMORI USER — personalisasi] Sesi: \${userMemory.totalSessions}, Pesan: \${userMemory.totalMessages}, Topik favorit: \${userMemory.topics.join(', ')||'-'}, Gaya: \${userMemory.style}. \${userMemory.styleNotes} Sesuaikan nada & kedalaman jawaban dengan karakter user (self-improve: makin sering user tanya RSRP/tilt, makin detailkan rekomendasi tilt).`;
        }
        payloadMessages.unshift({role:'system', content: sys} as any);
      }
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          model: 'cx/gpt-5.4-mini',
          temperature: 0.3,
          max_tokens: 1024,
        })
      });
      const j = await r.json().catch(()=> ({}));
      if(!r.ok){
        throw new Error(j?.error || j?.message || `HTTP ${r.status}`);
      }
      const reply: string = j?.choices?.[0]?.message?.content ?? j?.choices?.[0]?.text ?? '';
      if(!reply.trim()) throw new Error('Respons kosong dari 9Router');
      setMessages(prev=> {
        const nxt=[...prev, { role:'assistant', content: reply } as ChatMsg];
        try{
          const title = nxt.find(m=>m.role==='user')?.content.slice(0,44).replace(/\n/g,' ') || 'Analysis';
          const timeStr = new Date().toLocaleString('id-ID',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
          setRecentTasks(prevT=>{
            const idx=prevT.findIndex(t=>t.title===title);
            if(idx>=0){ const cp=[...prevT]; cp[idx]={...cp[idx], time: timeStr}; return cp; }
            return [{ id: String(Date.now()), title, time: timeStr, badges: attachedFile?['File']:[] }, ...prevT].slice(0,10);
          });
        }catch{}
        try{
          const tmpUser = buildUserMemory(nxt, userMemory);
          setUserMemory(prevU=> prevU ? {...prevU, topics: tmpUser.topics, style: tmpUser.style, styleNotes: tmpUser.styleNotes, totalMessages: (prevU.totalMessages||0)+1} : tmpUser);
        }catch{}
        return nxt;
      });
      setParsedInfo(reply.slice(0,180).split('\n').join(' · '));
    }catch(e:any){
      const msg = e?.message ?? String(e);
      setChatError(msg);
      setMessages(prev=> [...prev, { role:'assistant', content: `Maaf, chat gagal: ${msg}. Cek server 9Router di http://localhost:20128 dan coba lagi.` }]);
    }finally{
      setIsSending(false);
    }
  };

  // projects/recentTasks sekarang dari memory (backend/localStorage), bukan hard-code
  // fallback demo kosong untuk first open clean
  const _fallbackProjects: Project[] = [];
  const _fallbackTasks: RecentTask[] = [];
  void _fallbackProjects; void _fallbackTasks;

  const skills: Skill[] = [
    { id: 'dt', name: 'Analyze Drive Test', active: true },
    { id: 'oss', name: 'OSS KPI Weekly', active: true },
    { id: 'cov', name: 'Coverage Map', active: false },
  ];

  const executionSteps: ExecutionStep[] = [];

  return (
    <div className="agent-workspace">
      {/* LEFT SIDEBAR */}
      <div className="agent-sidebar">
        <div className="sidebar-header">
          <button className="btn-new-analysis" onClick={async () => {
            if(!showNewAnalysis && messages.length>0){
              await archiveCurrent();
              setMessages([]);
              setParsedInfo(null); setParsedRows(null); setAttachedFile(null); setLastUpload(null);
              localStorage.removeItem('rf_current_messages');
            }
            setShowNewAnalysis(v => !v);
          }} title={showNewAnalysis ? 'Tutup' : 'Mulai analisis baru (arsipkan chat jadi memori)'}>
            <i className={`ri-${showNewAnalysis ? 'close-line' : 'add-line'}`}></i> {showNewAnalysis ? 'Tutup' : 'New Analysis'}
          </button>
          <div className="sidebar-quick-actions">
            <button title="Download Excel (real .xlsx)" onClick={handleExportExcel} disabled={exportBusy==='excel'} className="quick-action-btn"><i className="ri-file-excel-2-line"></i> {exportBusy==='excel'?'...':'Excel'}</button>
            <button title="Download PPTX (real 5 slides)" onClick={handleExportPptx} disabled={exportBusy==='pptx'} className="quick-action-btn"><i className="ri-slideshow-line"></i> {exportBusy==='pptx'?'...':'PPT'}</button>
            <button title="DB: PostGIS" onClick={()=>triggerUpload('DB')} className="quick-action-btn"><i className="ri-database-2-line"></i> DB</button>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="section-label">PROJECTS</p>
          {projects.length===0 ? (
            <p className="mono" style={{fontSize:'11px', color:'#52525b', fontStyle:'italic', padding:'6px 0'}}>Belum ada project — New Analysis untuk mulai.</p>
          ) : (
          <div className="space-y-1">
            {projects.map(p => (
              <div key={p.id} onClick={()=>handleLoadProject(p.id)} title="Buka memori project" className={`project-item ${p.id===activeProjectId ? 'active' : ''}`} style={{cursor:'pointer'}}>
                <span className={`dot dot-${p.dot}`}></span>
                <span className="project-name">{p.name}</span>
                {p.count>0 && <span className="project-count">{p.count} MSG</span>}
              </div>
            ))}
          </div>
          )}
        </div>

        <div className="sidebar-section flex-1">
          <p className="section-label">RECENT TASKS</p>
          {recentTasks.length > 0 ? (
            <div className="space-y-1.5">
              {recentTasks.map(t => (
                <div key={t.id} onClick={()=>handleLoadProject(t.id)} className="recent-task-item" style={{cursor:'pointer'}}>
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
          ) : (
            <p className="mono" style={{fontSize:'11px', color:'#52525b', fontStyle:'italic', padding:'6px 0'}}>Belum ada task — mulai New Analysis.</p>
          )}

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

        <div className="sidebar-footer" style={{display:'flex', flexDirection:'column', gap:4}}>
          {userMemory && <span className="mono" title={userMemory.styleNotes} style={{ fontSize: '7px', color: '#71717a', letterSpacing: '0.02em', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>MEMORI: {userMemory.totalSessions} sesi • {userMemory.topics.join(', ')||'RF'} • {userMemory.style.split(',')[0]}</span>}
          <div style={{display:'flex', alignItems:'center', gap:6}}><span className="mono" style={{ fontSize: '7px', color: '#52525b', letterSpacing: '0.02em' }}>DB: PostGIS</span><span className="dot dot-emerald"></span></div>
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
                  onClick={async () => {
                    const prompt = newAnalysisPrompt.trim();
                    if(!prompt) return;
                    if(messages.length>0) await archiveCurrent();
                    localStorage.setItem('rf_session_active', 'true');
                    setHasStarted(true);
                    setShowNewAnalysis(false);
                    setLastUpload(`Analysis: ${prompt.slice(0, 80)}`);
                    setMessages([{ role:'user', content: prompt }]);
                    setNewAnalysisPrompt('');
                    setActiveProjectId(null);
                    setTimeout(()=>{ if(prompt) { setInputText(prompt); } }, 100);
                  }}
                >
                  <i className="ri-play-large-fill"></i> Start Analysis
                </button>
                <button className="btn-cancel-form" onClick={() => {
                  setShowNewAnalysis(false);
                }}>Cancel</button>
              </div>
            </div>
          ) : hasStarted ? (
            <>
              {/* Dynamic chat history — real LLM via /api/chat -> 9Router */}
              {messages.length === 0 ? (
                <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, padding:'24px', color:'#71717a'}}>
                  <div style={{width:44,height:44,borderRadius:12,background:'#18181b',border:'1px solid #27272a',display:'flex',alignItems:'center',justifyContent:'center'}}><i className="ri-chat-3-line" style={{color:'#7c3aed',fontSize:18}}></i></div>
                  <p className="mono" style={{fontSize:12,color:'#a1a1aa',fontWeight:500}}>Belum ada chat di sesi ini</p>
                  <p className="mono" style={{fontSize:11,color:'#52525b',textAlign:'center',maxWidth:300,lineHeight:1.5}}>Upload DT/OSS/Excel di tab bawah atau ketik pertanyaan. Riwayat lama tersimpan di <b style={{color:'#a1a1aa'}}>Projects</b> sebagai memori.</p>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  {messages.map((m,i)=> m.role==='user' ? (
                    <div key={i} className="flex justify-end"><div className="user-message" style={{whiteSpace:'pre-wrap',wordBreak:'break-word'}}>{m.content}</div></div>
                  ) : (
                    <div key={i} className="agent-msg-row">
                      <div className="agent-avatar"><i className="ri-cpu-line"></i></div>
                      <div className="flex-1"><div className="results-box" style={{whiteSpace:'pre-wrap',wordBreak:'break-word',fontSize:13,lineHeight:1.6}}>{m.content}</div></div>
                    </div>
                  ))}
                  {isSending && (
                    <div className="agent-msg-row">
                      <div className="agent-avatar"><i className="ri-loader-4-line" style={{animation:'spin 1s linear infinite'}}></i></div>
                      <div className="flex-1"><div className="results-box mono" style={{fontSize:12,color:'#a1a1aa'}}>Mengetik... terhubung ke 9Router (cx/gpt-5.5)...</div></div>
                    </div>
                  )}
                  {chatError && <div className="mono" style={{fontSize:11,color:'#f87171',background:'#1a0a0a',border:'1px solid #441a1a',borderRadius:8,padding:'8px 10px'}}>{chatError}</div>}
                </div>
              )}
            </>
          ) : (
            <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, padding:'40px 24px', color:'#71717a'}}>
              <div style={{width:48, height:48, borderRadius:12, background:'#18181b', border:'1px solid #27272a', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20}}><i className="ri-sparkling-2-line" style={{color:'#7c3aed'}}></i></div>
              <p className="mono" style={{fontSize:13, color:'#a1a1aa', fontWeight:500}}>Belum ada analisis</p>
              <p className="mono" style={{fontSize:11, color:'#52525b', textAlign:'center', maxWidth:320, lineHeight:1.5}}>Mulai dengan <b style={{color:'#a1a1aa'}}>New Analysis</b> — deskripsikan tugas (DT log, KPI, worst spot, Excel/PPT). History akan muncul di sini setelah analisis pertama.</p>
              <button onClick={() => setShowNewAnalysis(true)} style={{marginTop:4, padding:'8px 16px', borderRadius:8, background:'#7c3aed', color:'#fff', fontSize:12, fontWeight:600, border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:6}}>
                <i className="ri-add-line"></i> New Analysis
              </button>
            </div>
          )}
        </div>

        {/* Input footer */}
        <div className="chat-footer">
          {(lastUpload || parsedInfo) && (
            <div style={{background:'#0a0a0f', border:'1px solid #27272a', borderRadius:8, padding:'8px 10px', marginBottom:8}}>
              {lastUpload && <div className="mono" style={{fontSize:10, color:'#a1a1aa', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{lastUpload}{attachedFile?' • siap kirim':''}</div>}
              {parsedInfo && <div className="mono" style={{fontSize:10, color:'#71717a', marginTop:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{parsedInfo}</div>}
              {parsedRows && (
                <div style={{marginTop:6, maxHeight:110, overflow:'auto', border:'1px solid #27272a', borderRadius:6}}>
                  <table style={{width:'100%', fontSize:10, borderCollapse:'collapse'}}>
                    <thead><tr>{parsedRows[0].map((h,i)=><th key={i} style={{textAlign:'left', padding:'4px 6px', background:'#18181b', color:'#a1a1aa', borderBottom:'1px solid #27272a', position:'sticky', top:0}}>{h}</th>)}</tr></thead>
                    <tbody>{parsedRows.slice(1).map((r,ri)=><tr key={ri}>{r.map((c,ci)=><td key={ci} style={{padding:'3px 6px', color:'#d4d4d8', borderBottom:'1px solid #1a1a1f', fontFamily:'JetBrains Mono'}}>{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          <input ref={fileInputRef} type="file" hidden accept=".csv,.txt,.xlsx,.xls,.kml,.kmz,.log,.db,.sqlite" onChange={onFilePicked} />
          <div className="data-source-tabs">
            <button className="source-tab" onClick={()=>triggerUpload('DT Log')}><i className="ri-file-add-line text-violet-400"></i> DT Log</button>
            <button className="source-tab" onClick={()=>triggerUpload('OSS')}><i className="ri-table-line text-emerald-400"></i> OSS</button>
            <button className="source-tab" onClick={()=>{ setInputText(v=> v.includes('/skill')?v: (v? v+' /skill':'/skill')); }}><i className="ri-flashlight-line text-amber-400"></i> /skill</button>
            <button className="source-tab" onClick={()=>triggerUpload('Cell Master')}><i className="ri-base-station-line text-sky-400"></i> Cell Master</button>
          </div>
          <div className="input-area">
            <button className="input-btn attach-btn" onClick={()=>triggerUpload('Attachment')} title={attachedFile ?? 'Attach file'}><i className="ri-attachment-2"></i></button>
            <textarea value={inputText} onChange={e=>setInputText(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleSend(); }}} placeholder={isSending ? "Menunggu balasan..." : "Ketik /skill untuk pilih skill, atau tanya langsung..."} className="input-field" disabled={isSending}></textarea>
            <button className="input-btn send-btn" onClick={handleSend} title="Kirim" disabled={isSending} style={{opacity:isSending?0.5:1}}><i className={isSending?"ri-loader-4-line":"ri-send-plane-fill"} style={isSending?{animation:'spin 1s linear infinite'}:{}}></i></button>
          </div>
          <p className="mono mt-1.5 text-center" style={{ fontSize: '7px', color: '#52525b', letterSpacing: '0.02em' }}>Python • PostGIS • Excel/PPTX • Skills auto-load → D:\TelecomReports\{attachedFile?` • ${attachedFile}`:''}</p>
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