import fs from 'fs';
import path from 'path';

const BASE = 'http://127.0.0.1:3000/api/chat';
const CATALOG = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tests/catalog_sesi1.json'), 'utf-8'));
const LIVE = {
  provider: '9router',
  model: 'ollama/gpt-oss:120b',
  baseUrl: 'http://localhost:20128/v1',
  apiKey: process.env['9ROUTER_API_KEY'] || process.env['9ROUTER_API_KEY_FALLBACK'] || '[REDACTED]',
  temperature: 0.3,
  max_tokens: 700,
};
const FALLBACK = {
  provider: 'google',
  model: 'gemini-2.5-flash',
  temperature: 0.3,
  max_tokens: 700,
};

function buildBody(entry) {
  const cfg = entry.mode === 'live' ? LIVE : FALLBACK;
  return {
    messages: [{ role: 'user', content: entry.q }],
    provider: cfg.provider,
    model: cfg.model,
    baseUrl: cfg.baseUrl,
    apiKey: cfg.apiKey,
    temperature: cfg.temperature,
    max_tokens: cfg.max_tokens,
  };
}

function check(expect, meta, content) {
  const fails = [];
  if (expect.isLive !== undefined && meta.isLive !== expect.isLive) fails.push(`isLive expected ${expect.isLive} got ${meta.isLive}`);
  if (expect.contains) {
    for (const s of expect.contains) if (!content.toLowerCase().includes(s.toLowerCase())) fails.push(`missing contains "${s}"`);
  }
  if (expect.notContains) {
    for (const s of expect.notContains) if (content.toLowerCase().includes(s.toLowerCase())) fails.push(`should not contain "${s}"`);
  }
  if (expect.maxLen && content.length > expect.maxLen) fails.push(`too long ${content.length} > ${expect.maxLen}`);
  if (expect.isLive === true && content.includes('Google AI Studio')) fails.push('hardcode Google AI Studio in live');
  return fails;
}

async function runOne(entry) {
  const body = buildBody(entry);
  const t0 = Date.now();
  let res, json, err;
  try {
    res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const text = await res.text();
    try { json = JSON.parse(text); } catch { err = `non-json ${text.slice(0,300)}`; }
  } catch (e) { err = String(e); }
  const latency = Date.now() - t0;
  if (err) return { id: entry.id, q: entry.q, mode: entry.mode, ok: false, fails: [err], latency, meta: null, content: '' };
  const meta = json.meta || {};
  const content = json.choices?.[0]?.message?.content || '';
  const fails = check(entry.expect || {}, meta, content);
  if ((entry.expect?.isLive === true) && !content.trim()) fails.push('empty content for live');
  return {
    id: entry.id, q: entry.q, mode: entry.mode, tags: entry.tags,
    ok: fails.length === 0,
    fails, latency, meta, contentLen: content.length,
    snippet: content.slice(0, 240).replace(/\n/g, ' '),
  };
}

async function main() {
  const CONCURRENCY = 3;
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < CATALOG.length) {
      const i = idx++;
      const entry = CATALOG[i];
      const r = await runOne(entry);
      await new Promise(res=>setTimeout(res, 800));
      results.push(r);
      const status = r.ok ? 'PASS' : 'FAIL';
      console.log(`[${String(r.id).padStart(3,'0')}] ${status} (${r.latency}ms) isLive=${r.meta?.isLive} q="${r.q.slice(0,65)}" ${r.fails.length ? '-> ' + r.fails.join(' | ') : ''}`);
    }
  }
  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
  results.sort((a,b)=>a.id-b.id);
  const pass = results.filter(r=>r.ok).length;
  const fail = results.length - pass;
  const avgLatency = Math.round(results.reduce((s,r)=>s+r.latency,0)/results.length);
  const livePass = results.filter(r=>r.mode==='live' && r.ok).length;
  const liveTotal = results.filter(r=>r.mode==='live').length;
  const fbPass = results.filter(r=>r.mode==='fallback' && r.ok).length;
  const fbTotal = results.filter(r=>r.mode==='fallback').length;
  console.log('\n=== SUMMARY ===');
  console.log(`Total: ${results.length} | PASS ${pass} | FAIL ${fail} | avg ${avgLatency}ms`);
  console.log(`Live: ${livePass}/${liveTotal} | Fallback: ${fbPass}/${fbTotal}`);
  fs.writeFileSync(path.join(process.cwd(), 'tests/results_sesi1.json'), JSON.stringify({ summary:{ total: results.length, pass, fail, avgLatency, livePass, liveTotal, fbPass, fbTotal }, results }, null, 2), 'utf-8');
  fs.writeFileSync(path.join(process.cwd(), 'tests/results_sesi1.md'), buildMarkdown(pass, fail, results), 'utf-8');
  console.log('Saved tests/results_sesi1.json + .md');
  const releaseOk = fail === 0;
  console.log('\n=== RELEASE GATE SESI1 ===');
  if (releaseOk) console.log('READY TO RELEASE — all sesi1 cases PASS');
  else console.log('NOT READY — failures detected');
}

function buildMarkdown(pass, fail, results) {
  const livePass = results.filter(r=>r.mode==='live' && r.ok).length;
  const liveTotal = results.filter(r=>r.mode==='live').length;
  const fbPass = results.filter(r=>r.mode==='fallback' && r.ok).length;
  const fbTotal = results.filter(r=>r.mode==='fallback').length;
  let md = `# Sesi 1 — 139 Pertanyaan Industri Telco Indonesia — Hasil Test\n\n`;
  md += `Ringkasan: Total ${results.length} | PASS ${pass} | FAIL ${fail} | Live ${livePass}/${liveTotal} | Fallback ${fbPass}/${fbTotal}\n\n`;
  md += `| # | Mode | Pertanyaan | Status | Latency | Isu |\n`;
  md += `|---|------|------------|--------|---------|-----|\n`;
  for (const r of results) {
    const isu = r.fails.length ? r.fails.join('; ').replace(/\|/g,'/').slice(0,100) : '-';
    md += `| ${r.id} | ${r.mode} | ${r.q.slice(0,70).replace(/\|/g,'/')} | ${r.ok?'PASS':'FAIL'} | ${r.latency}ms | ${isu} |\n`;
  }
  md += `\nKriteria: PASS jika mengandung keyword expect (telkomsel/xl/smartfren/mocn/band/rsrp/sinr dll), tidak mengandung "Skill aktif", panjang <3500, dan tidak hardcode Google di live.\n\n`;
  md += `Hasil: **${fail===0?'READY ✅':'NOT READY ⛔'}**\n`;
  return md;
}

main().catch(e=>{ console.error(e); process.exit(1); });
