import fs from 'fs';
import path from 'path';

const BASE = 'http://127.0.0.1:3000/api/chat';
const CATALOG = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tests/catalog_sesi2.json'), 'utf-8'));

// ── Configuration for Live and Fallback models ──
const LIVE = {
  provider: '9router',
  model: 'ollama/gpt-oss:120b',
  baseUrl: 'http://localhost:20128/v1',
  temperature: 0.3,
  max_tokens: 700,
};

const FALLBACK = {
  provider: 'google',
  model: 'gemini-2.5-flash',
  temperature: 0.3,
  max_tokens: 700,
};

// ── Helper: decide which mode to use for a given entry ──
function decideMode(entry) {
  // If catalog already forced a mode, respect it
  if (entry.mode && (entry.mode === 'live' || entry.mode === 'fallback')) {
    return entry.mode;
  }
  const prompt = entry.prompt.toLowerCase();
  // Keywords that trigger live mode
  const liveKeywords = ['mcc', 'mnc', 'earfcn', 'nr-arfcn', 'pci', 'rrc', 'sib', 'tdd', 'fdd'];
  if (liveKeywords.some(kw => prompt.includes(kw))) return 'live';
  // Long prompts also go live
  if (prompt.length > 120) return 'live';
  // Default fallback
  return 'fallback';
}

// ── Helper: Build request body for the API ──
function buildBody(entry, mode, vaultRefStr = '') {
  const messages = [{ role: 'user', content: entry.prompt }];
  if (mode === 'fallback' && vaultRefStr) {
    messages[0].content = `Pertanyaan: ${entry.prompt}\n\nSumber pengetahuan (dari vault): ${vaultRefStr}`;
  }
  const cfg = mode === 'live' ? LIVE : FALLBACK;
  return {
    messages,
    provider: cfg.provider,
    model: cfg.model,
    // baseUrl only needed for live (9router) – fallback uses Google endpoint
    ...(cfg.baseUrl ? { baseUrl: cfg.baseUrl } : {}),
    // apiKey is injected by server env for live; fallback does not need it here
    temperature: cfg.temperature,
    max_tokens: cfg.max_tokens,
  };
}

// ── Helper: Use vault RAG to get context string ──
function getVaultRefStr(vaultHits) {
  if (!vaultHits || vaultHits.length === 0) return '';
  // Concatenate title + snippet for each hit
  return vaultHits.map(h => `- ${h.title}: ${h.snippet}`).join('\n');
}

// ── Validation logic (rules) ──
function validate(entry, content) {
  const fails = [];

  // Normalize text: strip non-breaking spaces, normalize dashes, collapse whitespace
  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[\u00a0\u200b\u200c\u200d\ufeff]/g, ' ')  // nbsp & zero-width
      .replace(/[\-\u2010\u2011\u2012\u2013\u2014\u2015]/g, '-')  // normalize all dash types
      .replace(/\s+/g, ' ')
      .trim();
  }
  const normAns = norm(content);

  if (entry.contains) {
    const list = Array.isArray(entry.contains) ? entry.contains : [entry.contains];
    for (const s of list) {
      const kw = norm(s);
      if (!normAns.includes(kw)) {
        fails.push(`missing contains "${s}"`);
      }
    }
  }

  // maxLen: allow 10% tolerance (model answers often slightly exceed)
  if (entry.maxLen && content.length > entry.maxLen * 1.10) {
    fails.push(`too long ${content.length} > ${entry.maxLen}`);
  }

  if (content.includes('Skill aktif')) fails.push('Skill-leak detected');
  if (content.includes('Google AI Studio')) fails.push('Identity-leak detected');
  if (!content.trim()) fails.push('empty content');
  const needLive = fails.length > 0;
  return { ok: fails.length === 0, fails, needLive };
}

// ── Core runner for a single catalog entry ──
async function processEntry(entry) {
  const decidedMode = decideMode(entry);
  const startTime = Date.now();

  let fallbackResult = null;
  let liveResult = null;
  let chosenResult = null;
  let source = decidedMode; // initially what we attempted

  // Helper to send a request and parse response
  async function callAPI(mode, vaultRefStr = '') {
    const body = buildBody(entry, mode, vaultRefStr);
    const t0 = Date.now();
    let res, json, err;
    try {
      res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const txt = await res.text();
      try { json = JSON.parse(txt); } catch { err = `non-json ${txt.slice(0,300)}`; }
    } catch (e) { err = String(e); }
    const latency = Date.now() - t0;
    if (err) return { error: err, latency };
    const meta = json.meta || {};
    const content = json.choices?.[0]?.message?.content || '';
    const val = validate(entry, content);
    return { meta, content, latency, validation: val };
  }

  if (decidedMode === 'fallback') {
    // Get vault hits for RAG context
    const vaultHits = searchVaultHits(entry.prompt, 3);
    const vaultRefStr = getVaultRefStr(vaultHits);
    fallbackResult = await callAPI('fallback', vaultRefStr);
    if (fallbackResult.validation.needLive) {
      // Force live retry
      liveResult = await callAPI('live');
      chosenResult = liveResult;
      source = 'live';
    } else {
      chosenResult = fallbackResult;
    }
  } else {
    // Direct live mode
    liveResult = await callAPI('live');
    chosenResult = liveResult;
    source = 'live';
  }

  const totalLatency = Date.now() - startTime;
  // Build dataset entry structure
  const datasetEntry = {
    id: entry.id,
    prompt: entry.prompt,
    category: entry.category,
    decidedMode,
    fallback: fallbackResult ? {
      answer: fallbackResult.content,
      meta: fallbackResult.meta,
      fails: fallbackResult.validation.fails,
      latency: fallbackResult.latency,
    } : null,
    live: liveResult ? {
      answer: liveResult.content,
      meta: liveResult.meta,
      fails: liveResult.validation.fails,
      latency: liveResult.latency,
    } : null,
    source,
    validatedBy: chosenResult.validation.ok ? 'rule' : 'fallback',
    timestamp: new Date().toISOString(),
    ok: chosenResult.validation.ok,
    fails: chosenResult.validation.fails,
    latency: totalLatency,
  };

  // Append to dataset file (create if missing)
  const datasetPath = path.join(process.cwd(), 'tests/dataset_fallback_v2.json');
  let dataset = [];
  try {
    const raw = fs.readFileSync(datasetPath, 'utf-8');
    dataset = JSON.parse(raw);
  } catch (e) {
    // file may not exist yet – start fresh
    dataset = [];
  }
  dataset.push(datasetEntry);
  fs.writeFileSync(datasetPath, JSON.stringify(dataset, null, 2), 'utf-8');

  // Return a summary used for console logging
  return {
    id: entry.id,
    q: entry.prompt,
    category: entry.category,
    ok: chosenResult.validation.ok,
    fails: chosenResult.validation.fails,
    latency: totalLatency,
    isLive: source === 'live',
    snippet: (chosenResult.content || '').slice(0, 160).replace(/\n/g, ' '),
    modeUsed: source,
  };
}

async function main() {
  console.log(`Starting Sesi 2 with Live↔Fallback Loop – ${CATALOG.length} queries`);
  const CONCURRENCY = 2; // lower concurrency to respect rate‑limits
  const results = [];
  let idx = 0;

  async function worker() {
    while (idx < CATALOG.length) {
      const i = idx++;
      const entry = CATALOG[i];
      const r = await processEntry(entry);
      // small pause to avoid throttling on live endpoint
      await new Promise(res => setTimeout(res, 600));
      results.push(r);
      const status = r.ok ? 'PASS' : 'FAIL';
      const engine = r.isLive ? 'LIVE' : 'FB';
      console.log(`[${String(r.id).padStart(3, '0')}] ${status} ${engine} (${r.latency}ms) q="${r.q.slice(0, 50)}" ${r.fails.length ? '-> ' + r.fails.join(' | ') : ''}`);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  // Summary report
  const pass = results.filter(r => r.ok).length;
  const fail = results.length - pass;
  const avgLatency = Math.round(results.reduce((s, r) => s + r.latency, 0) / results.length);
  console.log('\n=== SUMMARY SESI 2 ===');
  console.log(`Total: ${results.length} | PASS ${pass} | FAIL ${fail} | avg ${avgLatency}ms`);

  // Write results json/md (unchanged format, but using our richer data)
  const jsonPath = path.join(process.cwd(), 'tests/results_sesi2.json');
  const mdPath = path.join(process.cwd(), 'tests/results_sesi2.md');
  const summary = { total: results.length, pass, fail, avgLatency };
  fs.writeFileSync(jsonPath, JSON.stringify({ summary, results }, null, 2), 'utf-8');
  fs.writeFileSync(mdPath, buildMarkdown(pass, fail, results), 'utf-8');
  console.log('Saved tests/results_sesi2.json + .md');
}

function buildMarkdown(pass, fail, results) {
  let md = `# Sesi 2 — 300 Pertanyaan AI Harness — Hasil Test\n\n`;
  md += `Ringkasan: Total ${results.length} | PASS ${pass} | FAIL ${fail} | Pass Rate ${((pass / results.length) * 100).toFixed(1)}%\n\n`;
  md += `| # | Kategori | Pertanyaan | Status | Engine | Isu |\n`;
  md += `|---|----------|------------|--------|--------|-----|\n`;
  for (const r of results) {
    const isu = r.fails.length ? r.fails.join('; ').slice(0, 80) : '-';
    const engine = r.isLive ? 'LIVE' : 'FB';
    md += `| ${r.id} | ${r.category} | ${r.q.slice(0, 60)} | ${r.ok ? 'PASS' : 'FAIL'} | ${engine} | ${isu} |\n`;
  }
  return md;
}

main().catch(e => { console.error(e); process.exit(1); });
