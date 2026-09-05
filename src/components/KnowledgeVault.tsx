import { useState, useEffect, useCallback } from 'react';
import './KnowledgeVault.css';

interface TreeNode { name: string; path: string; type: string; children?: TreeNode[]; title?: string }
interface FileContent { path: string; name?: string; title?: string; frontmatter: Record<string,any>; body: string; }
interface GraphData { nodes: { id: string; label: string; type?: string; color?: string }[]; edges: { from?: string; to?: string; source?: string; target?: string }[]; }

function flattenFiles(nodes: TreeNode[]): TreeNode[] {
  const out: TreeNode[] = [];
  for (const n of nodes) {
    if (n.type === 'file') out.push(n);
    const ch = (n as any).children as TreeNode[] | undefined;
    if (ch) out.push(...flattenFiles(ch));
  }
  return out;
}
function fileIcon(name: string) {
  const l = name.toLowerCase();
  if (l.startsWith('skill')) return { cls: 'ri-quill-pen-line', color: '#a78bfa' };
  if (l.includes('38.211')) return { cls: 'ri-file-text-line', color: '#38bdf8' };
  if (l.includes('38.331')) return { cls: 'ri-file-text-line', color: '#a78bfa' };
  return { cls: 'ri-file-text-line', color: '#71717a' };
}
function normPath(p: string) { return p.replace(/\\/g, '/'); }

export default function KnowledgeVault() {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedPath, setSelectedPath] = useState<string|null>(null);
  const [selected, setSelected] = useState<FileContent|null>(null);
  const [graph, setGraph] = useState<GraphData|null>(null);
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string,boolean>>({});
  const [dragOver, setDragOver] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string|null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true); setErr(null);
      const tRes = await fetch('/api/vault/tree').then(r=>{ if(!r.ok) throw new Error('tree '+r.status); return r.json(); });
      const gRes = await fetch('/api/vault/graph').then(r=>{ if(!r.ok) throw new Error('graph '+r.status); return r.json(); });
      const t: TreeNode[] = (tRes as any).tree ?? tRes;
      setTree(t);
      setGraph(gRes as GraphData);
      const files = flattenFiles(t);
      if (files.length && !selectedPath) {
        const first = files[0].path;
        setSelectedPath(first);
        try {
          const f = await fetch('/api/vault/file?path='+encodeURIComponent(first)).then(r=>r.json());
          if ((f as any).error) throw new Error((f as any).error);
          setSelected(f as FileContent);
        } catch (e) { /* keep list visible even if first file fails */ console.warn('first file load failed', e); }
      }
    } catch (e:any) { setErr(String(e?.message ?? e)); } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openFile = async (path: string) => {
    setSelectedPath(path);
    try {
      const r = await fetch('/api/vault/file?path='+encodeURIComponent(path));
      const j = await r.json();
      if (!r.ok || (j as any).error) throw new Error((j as any).error ?? 'not found');
      setSelected(j as FileContent);
      setErr(null);
    } catch (e:any) { setErr(String(e?.message ?? e)); }
  };

  const doSearch = async () => {
    if (!search.trim()) return;
    try {
      const r = await fetch('/api/vault/search?q='+encodeURIComponent(search)+'&limit=20').then(x=>x.json());
      const arr = Array.isArray(r) ? r : (r as any).results ?? [];
      if (arr.length) openFile(arr[0].path);
      else setMsg('Tidak ada hasil untuk "'+search+'"');
    } catch (e:any) { setErr(String(e)); }
  };

  const ingestFiles = async (files: FileList|File[]) => {
    for (const f of Array.from(files)) {
      if (!/\.(pdf|docx|txt|md)$/i.test(f.name)) { setMsg('Skip '+f.name+' — format tidak didukung'); continue; }
      setMsg('⏳ Meng-ingest '+f.name+'...');
      try {
        const text = await f.text();
        const r = await fetch('/api/vault/ingest', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ fileName: f.name, content: text }) }).then(x=>x.json());
        setMsg('✓ '+f.name+' — '+((r as any).chunks ?? '')+' chunks');
        load();
      } catch (e:any) { setMsg('✗ '+f.name+': '+String(e).slice(0,120)); }
    }
  };

  const isFolder = (n: TreeNode) => n.type==='folder' || (n as any).type==='dir';
  const groups = (() => {
    const out: { label:string; icon:string; files:TreeNode[]; key:string }[] = [];
    for (const n of tree) {
      if (isFolder(n) && (n as any).children) {
        const children = (n as any).children as TreeNode[];
        const files = children.filter((c:TreeNode)=>c.type==='file');
        const subs = children.filter((c:TreeNode)=> isFolder(c));
        let icon = 'ri-folder-3-line';
        const low = n.name.toLowerCase();
        if (low.includes('spec') || low.includes('3gpp')) icon='ri-file-paper-line';
        else if (low.includes('skill')) icon='ri-flashlight-line';
        out.push({ label:n.name, icon, files, key: normPath(n.path) });
        for (const sf of subs) {
          const inner = ((sf as any).children as TreeNode[] | undefined)?.filter((c:TreeNode)=>c.type==='file') ?? [];
          if (inner.length) out.push({ label: sf.name, icon:'ri-folder-3-line', files: inner, key: normPath(sf.path) });
        }
        // also handle nested file case: if atomic has no direct files, don't push empty
        if (files.length===0 && subs.length===0) {
          // leaf folder with no files — skip
        }
      } else if (n.type==='file') {
        let root = out.find(x=>x.label==='__root');
        if (!root) { root={label:'__root', icon:'ri-file-line', files:[], key:'__root'}; out.push(root); }
        root.files.push(n);
      }
    }
    // dedupe empty groups
    return out.filter(g=> g.files.length>0 || g.label==='__root');
  })();
  const flatFiles = flattenFiles(tree);

  // Always render shell — even during loading/error — so preview is never blank
  return (
    <div style={{display:'flex',flex:1,overflow:'hidden',minHeight:0,height:'100%',background:'#0a0a0f',color:'#e4e4e7'}}>

      {/* LEFT */}
      <div
        style={{width:240,background:'#0f0f14',borderRight:'1px solid #27272a',display:'flex',flexDirection:'column',flexShrink:0,minHeight:0}}
        onDragOver={e=>{e.preventDefault();setDragOver(true);}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={e=>{e.preventDefault();setDragOver(false);if(e.dataTransfer.files.length) ingestFiles(e.dataTransfer.files);}}
      >
        <div style={{height:40,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',padding:'0 12px',gap:8,flexShrink:0}}>
          <i className="ri-folder-3-line" style={{color:'#71717a'}} />
          <span style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a'}}>VAULT</span>
          <button onClick={()=> (document.getElementById('vault-search-input') as HTMLInputElement)?.focus()} title="Search" style={{marginLeft:'auto',width:24,height:24,background:'#18181b',border:'1px solid #27272a',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><i className="ri-search-line" style={{fontSize:12,color:'#a1a1aa'}} /></button>
        </div>
        <div style={{padding:'8px 8px 10px',borderBottom:'1px solid #27272a'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,background:'#09090b',border:'1px solid #27272a',borderRadius:6,padding:'6px 8px'}}>
            <i className="ri-search-line" style={{color:'#52525b',fontSize:12}} />
            <input id="vault-search-input" value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=> e.key==='Enter' && doSearch()} placeholder="Search vault..." style={{flex:1,background:'transparent',outline:'none',border:'none',fontSize:12,color:'#e4e4e7'}} />
          </div>
          <div style={{display:'flex',gap:6,marginTop:8}}>
            <label style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:6,background:'#18181b',border:'1px dashed #3f3f46',borderRadius:6,padding:'6px 8px',cursor:'pointer',fontSize:11,color:'#a1a1aa'}}>
              <i className="ri-upload-2-line" style={{fontSize:12}} /> Drop / Click
              <input type="file" hidden multiple accept=".pdf,.docx,.txt,.md" onChange={e=> e.target.files && ingestFiles(e.target.files)} />
            </label>
            <button onClick={load} title="Refresh" style={{width:28,height:28,background:'#18181b',border:'1px solid #27272a',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><i className="ri-refresh-line" style={{color:'#a1a1aa',fontSize:12}} /></button>
          </div>
          {msg && <div style={{marginTop:8,fontSize:11,fontFamily:'JetBrains Mono, monospace',background:'#18181b',border:'1px solid #27272a',borderRadius:6,padding:'6px 8px',color:'#a1a1aa',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{msg}</div>}
          {err && <div style={{marginTop:8,fontSize:11,background:'#450a0a',border:'1px solid #7f1d1d',borderRadius:6,padding:'6px 8px',color:'#fca5a5',wordBreak:'break-word'}}>{err}</div>}
        </div>
        <div style={{padding:8,overflowY:'auto',flex:1,minHeight:0,fontSize:12}}>
          {loading ? <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:11,color:'#52525b',padding:'8px 4px'}}>Loading vault...</div>
            : (!groups.length && flatFiles.length===0) ? <div style={{color:'#52525b',padding:'8px 4px',fontSize:12}}>Vault kosong — drop file untuk mulai.</div>
            : groups.map(g=>{
                const isRoot = g.label==='__root';
                const isCollapsed = !!collapsed[g.key];
                return (
                  <div key={g.key} style={{marginBottom:8}}>
                    {!isRoot && (
                      <p onClick={()=>setCollapsed(s=>({...s,[g.key]:!s[g.key]}))} style={{fontSize:10,fontWeight:600,letterSpacing:1,color:'#71717a',display:'flex',alignItems:'center',gap:4,cursor:'pointer',userSelect:'none',margin:'0 0 4px 0'}}>
                        <i className={isCollapsed?'ri-arrow-right-s-line':'ri-arrow-down-s-line'} />
                        <i className={g.icon} /> {g.label}
                        <span style={{marginLeft:'auto',fontFamily:'JetBrains Mono, monospace',color:'#52525b'}}>{g.files.length}</span>
                      </p>
                    )}
                    {!isCollapsed && (
                      <div style={{marginTop:4,paddingLeft:10,marginLeft: isRoot?0:6,borderLeft: isRoot?'none':'1px solid #27272a',display:'flex',flexDirection:'column',gap:2}}>
                        {g.files.map(f=>{
                          const active = selectedPath===f.path;
                          const ic = fileIcon(f.name);
                          return (
                            <div key={f.path} onClick={()=>openFile(f.path)} title={f.path} style={{padding:'4px 6px',display:'flex',alignItems:'center',gap:6,cursor:'pointer',borderRadius:6,background: active?'#18181b':'transparent', color: active?'#fff':'#a1a1aa'}}>
                              <i className={ic.cls} style={{color: active?'#a78bfa':ic.color,flexShrink:0}} />
                              <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.name.replace(/\.md$/i,'')}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
          }
          <div style={{marginTop:12}}>
            <p style={{fontSize:10,fontWeight:600,letterSpacing:1,color:'#52525b'}}>TAGS</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:4,marginTop:6}}>
              <span style={{fontSize:10,background:'#1e1b4b',color:'#a5b4fc',border:'1px solid #4338ca',padding:'2px 6px',borderRadius:999}}>#handover</span>
              <span style={{fontSize:10,background:'#082f49',color:'#7dd3fc',border:'1px solid #0369a1',padding:'2px 6px',borderRadius:999}}>#rsrp</span>
              <span style={{fontSize:10,background:'#451a03',color:'#fcd34d',border:'1px solid #92400e',padding:'2px 6px',borderRadius:999}}>#pci</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div style={{flex:1,display:'flex',flexDirection:'column',background:'#0a0a0f',minWidth:0,minHeight:0}}>
        <div style={{height:40,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',padding:'0 12px',gap:8,flexShrink:0}}>
          <span style={{fontSize:12,fontFamily:'JetBrains Mono, monospace',color:'#a1a1aa',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{selected ? (selected.title ?? selected.name ?? selected.path).replace(/\.md$/i,'') : '—'}</span>
          {selected?.frontmatter?.domain && <span style={{fontSize:10,background:'#7c3aed',color:'#fff',padding:'2px 6px',borderRadius:4,fontWeight:500,marginLeft:6}}>{String(selected.frontmatter.domain)}</span>}
          {selected && <span style={{fontSize:10,background:'#022c22',color:'#34d399',border:'1px solid #065f46',padding:'2px 6px',borderRadius:4,marginLeft:6}}>RAG Indexed ✓</span>}
        </div>
        <div style={{flex:1,overflowY:'auto',padding:24}}>
          {!selected ? <div style={{fontSize:13, color:'#52525b',fontFamily:'JetBrains Mono, monospace'}}>Pilih file di kiri untuk melihat isinya.</div>
            : (
            <div style={{maxWidth:720}}>
              <h1 style={{fontSize:20,fontWeight:700,color:'#fff',margin:0}}>{String(selected.frontmatter.title ?? selected.title ?? (selected.name ?? '').replace(/\.md$/i,''))}</h1>
              {selected.frontmatter.source && <p style={{fontSize:11,color:'#71717a',fontFamily:'JetBrains Mono, monospace',marginTop:4}}>{String(selected.frontmatter.source)}</p>}
              {selected.frontmatter.tags && (
                <div style={{display:'flex',flexWrap:'wrap',gap:4,marginTop:8}}>
                  {(Array.isArray(selected.frontmatter.tags) ? selected.frontmatter.tags : String(selected.frontmatter.tags).split(',')).map((t:any)=>String(t).trim()).filter(Boolean).map((t:string)=>(
                    <span key={t} style={{fontSize:10,background:'#18181b',border:'1px solid #27272a',color:'#a1a1aa',padding:'2px 6px',borderRadius:999,fontFamily:'JetBrains Mono, monospace'}}>{t.startsWith('#')?t:'#'+t}</span>
                  ))}
                </div>
              )}
              <div style={{marginTop:16,display:'flex',flexDirection:'column',gap:10,fontSize:13,lineHeight:1.6,color:'#d4d4d8'}}>
                {(selected.body ?? '').split('\n').map((line,i)=>{
                  const t=line.trim();
                  if (!t) return <div key={i} style={{height:4}}/>;
                  if (t.startsWith('>')) return <blockquote key={i} style={{borderLeft:'2px solid #7c3aed',paddingLeft:12,color:'#a1a1aa',fontStyle:'italic',margin:0}}>{t.slice(1).trim()}</blockquote>;
                  if (t.includes('[[')) {
                    const parts=t.split(/(\[\[.*?\]\])/g);
                    return <div key={i} style={{background:'#14141b',border:'1px solid #27272a',borderRadius:8,padding:'10px 12px',fontFamily:'JetBrains Mono, monospace',fontSize:12}}><span style={{color:'#71717a'}}>Linked: </span>{parts.map((p,j)=>p.startsWith('[[') ? <a key={j} style={{color:'#a78bfa',textDecoration:'underline',cursor:'pointer'}}>{p}</a> : <span key={j}>{p}</span>)}</div>;
                  }
                  if (t.startsWith('#')) return <div key={i} style={{fontWeight:700,color:'#fff',fontSize: t.startsWith('# ') ? 16 : 14}}>{t.replace(/^#+\s*/, '')}</div>;
                  return <div key={i}>{t}</div>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT GRAPH */}
      <div style={{width:280,background:'#0f0f14',borderLeft:'1px solid #27272a',display:'flex',flexDirection:'column',flexShrink:0,minHeight:0}}>
        <div style={{height:40,borderBottom:'1px solid #27272a',display:'flex',alignItems:'center',padding:'0 12px',flexShrink:0}}>
          <span style={{fontSize:11,fontWeight:600,letterSpacing:1,color:'#71717a'}}>GRAPH</span>
          <span style={{marginLeft:'auto',fontSize:11,color:'#71717a',fontFamily:'JetBrains Mono, monospace'}}>{graph ? graph.nodes.length+' • '+graph.edges.length : '—'}</span>
        </div>
        <div style={{flex:1,position:'relative',overflow:'hidden',background:'#0a0a0f'}}>
          {!graph || graph.nodes.length===0 ? <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'JetBrains Mono, monospace',fontSize:11,color:'#52525b'}}>No graph yet</div>
            : (
            <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 280 200">
              {graph.edges.slice(0,80).map((e:any,i)=>{
                const from = (e.from ?? e.source) as string;
                const to = (e.to ?? e.target) as string;
                const a=graph.nodes.findIndex(n=>n.id===from);
                const b=graph.nodes.findIndex(n=>n.id===to);
                if (a<0||b<0) return null;
                const ax=140+Math.cos(a*1.1)*(40+(a%3)*30), ay=40+Math.sin(a*1.1)*40+(a%4)*18;
                const bx=140+Math.cos(b*1.1)*(40+(b%3)*30), by=40+Math.sin(b*1.1)*40+(b%4)*18;
                return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} stroke="#3f3f46" strokeWidth={0.9} opacity={0.9} />;
              })}
              {graph.nodes.slice(0,22).map((n,i)=>{
                const cx=140+Math.cos(i*1.1)*(40+(i%3)*30), cy=40+Math.sin(i*1.1)*40+(i%4)*18;
                const r=i===0?14:i<4?11:9;
                const fill=i===0?'#7c3aed':i%4===1?'#0e7490':i%4===2?'#9a3412':i%4===3?'#14532d':'#422006';
                const stroke=i===0?'#a78bfa':i%4===1?'#38bdf8':i%4===2?'#fb923c':i%4===3?'#4ade80':'#fbbf24';
                return <g key={n.id}><circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={i===0?2:1.2} />
                  <text x={cx} y={cy+3} textAnchor="middle" fontSize={r>11?6:r>9?5:4} fill="white" fontWeight={600} style={{fontFamily:'Inter, sans-serif'}}>{n.label.slice(0,5)}</text></g>;
              })}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
