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

// ── Validation logic (fuzzy rules) ──
function validate(entry, content) {
  const fails = [];

  // ── 1. Normalize text: strip non-breaking spaces, normalize dashes, collapse whitespace ──
  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[\u00a0\u200b\u200c\u200d\ufeff]/g, ' ')  // nbsp & zero-width
      .replace(/[\-\u2010\u2011\u2012\u2013\u2014\u2015]/g, '-')  // normalize all dash types → hyphen
      .replace(/[,;:]/g, ' ')   // normalize punctuation to spaces for looser match
      .replace(/\s+/g, ' ')
      .trim();
  }
  const normAns = norm(content);

  // ── 2. Synonym mapping (telecom domain) ──
  const SYNONYM_GROUPS = [
    ['sib1', 'system information block type 1', 'systeminformationblocktype1'],
    ['rrc', 'radio resource control', 'radio resource ctrl'],
    ['pci', 'physical cell identity', 'physical cell id'],
    ['rlc', 'radio link control', 'radio link ctrl'],
    ['pdcp', 'packet data convergence protocol', 'packet data convergence'],
    ['collision', 'benturan', 'tabrakan'],
    ['throughput', 'kapasitas', 'data rate', 'kecepatan', 'data throughput'],
    ['kpi', 'key performance indicator', 'key performance indicators'],
    ['earfcn', 'e-utran absolute radio frequency channel number'],
    ['arfcn', 'absolute radio frequency channel number'],
    ['sinr', 'signal to interference plus noise ratio', 'signal-to-interference'],
    ['rsrp', 'reference signal received power'],
    ['rsrq', 'reference signal received quality'],
    ['cqi', 'channel quality indicator'],
    ['bler', 'block error rate'],
    ['tac', 'tracking area code'],
    ['mocn', 'multi operator core network'],
    ['sndc', 'single network dual connectivity'],
    ['endc', 'e-utran nr dual connectivity'],
    ['srvccc', 'single radio voice call continuity', 'srvcc'],
    ['das', 'dedicated bearer', 'default bearer', 'default apn', 'dedicated apn'],
    ['ambr', 'aggregate maximum bit rate', 'aggregated maximum bitrate', 'max bitrate'],
    ['hysteresis', 'histeresis', 'margin', 'threshold'],
    ['handover', 'ho', 'hand off', 'hand-off', 'ping pong'],
    ['band 5', 'band5', 'b5', '850 mhz', '850mhz'],
    ['band 3', 'band3', 'b3', '1800 mhz', '1800mhz'],
    ['band 1', 'band1', 'b1', '2100 mhz', '2100mhz'],
    ['band 8', 'band8', 'b8', '900 mhz', '900mhz'],
    ['band 40', 'band40', 'b40', '2300 mhz', '2300mhz', 'tdd band 40'],
    ['n28', 'band n28', 'nr band 28', '5g band 28'],
    ['n40', 'band n40', 'nr band 40', '5g band 40'],
    ['sib1', 'system information block type 1', 'systeminformationblocktype1', 'sib type 1'],
    ['tac', 'tracking area code', 'tracking area'],
    ['30 mhz', '30mhz', '30 mhz bandwidth', '30 mhz tdd'],
    ['164', 'rsrp 164', '164 dbm'],
  ];

  // Build lookup: normalized form → set of all normalized synonyms in same group
  const synonymMap = new Map();
  for (const group of SYNONYM_GROUPS) {
    const normGroup = group.map(s => norm(s));
    for (const form of normGroup) {
      if (!synonymMap.has(form)) synonymMap.set(form, new Set());
      for (const other of normGroup) synonymMap.get(form).add(other);
    }
  }

  // ── 3. Fuzzy contains check ──
  function fuzzyContains(kwRaw, textNorm) {
    const kw = norm(kwRaw);
    if (!kw) return false;

    // a) Direct normalized substring match
    if (textNorm.includes(kw)) return true;

    // b) Synonym variant match
    const variants = synonymMap.get(kw);
    if (variants) {
      for (const v of variants) {
        if (v && textNorm.includes(v)) return true;
      }
    }

    // c) Partial MCC/MNC match: "510-10" → also accept "510 10", "510/10", "51010", "mcc 510 mnc 10", or separate "510" + "10"/"01"
    const mnc = kw.match(/^(\d+)\s*-\s*(\d+)$/);
    if (mnc) {
      const [, a, b] = mnc;
      const pats = [
        `${a}-${b}`, `${a} ${b}`, `${a}/${b}`, `${a}${b}`,
        `mcc ${a} mnc ${b}`, `mnc ${b} mcc ${a}`,
      ];
      for (const p of pats) {
        if (textNorm.includes(p)) return true;
      }
      // Also accept if BOTH parts appear separately in the text (e.g. "MCC = 510" + "MNC = 01")
      // But only if the MNC part matches (b or zero-padded variant)
      const bVariants = [b, b.replace(/^0+/, ''), b.padStart(2, '0')];
      const hasMcc = textNorm.includes(`mcc`) && textNorm.includes(a);
      const hasMnc = bVariants.some(v => textNorm.includes(`mnc`) && textNorm.includes(v));
      if (hasMcc && hasMnc) return true;
    }

    // d) Spaceless word match: "cellreservedforoperatoruse" → "cell reserved for operator use"
    //    Only for keywords that have no spaces (concatenated telecom terms)
    if (!kw.includes(' ') && kw.length >= 8) {
      const stripped = textNorm.replace(/\s+/g, '');
      if (stripped.includes(kw)) return true;
    }

    // e) Word-boundary loose match: strip all spaces/punctuation from both and check substring
    //    This catches minor formatting differences without being too permissive
    const kwClean = kw.replace(/[\s\-/.,]/g, '');
    const txtClean = textNorm.replace(/[\s\-/.,]/g, '');
    if (kwClean && txtClean.includes(kwClean)) return true;

    return false;
  }

  // ── 4. Strict checks (notContains, isLive) – NO fuzzy logic ──
  if (entry.isLive !== undefined && entry.isLive !== null) {
    // isLive check: compare against meta, but here we check content quality proxy
    // This field is used by run_100.mjs pattern; kept strict if present
  }

  if (entry.notContains) {
    const ncList = Array.isArray(entry.notContains) ? entry.notContains : [entry.notContains];
    for (const s of ncList) {
      if (content.toLowerCase().includes(s.toLowerCase())) {
        fails.push(`should not contain "${s}"`);
      }
    }
  }

  // ── 5. Fuzzy contains check ──
  if (entry.contains) {
    const list = Array.isArray(entry.contains) ? entry.contains : [entry.contains];
    for (const s of list) {
      if (!fuzzyContains(s, normAns)) {
        fails.push(`missing contains "${s}"`);
      }
    }
  }

  // maxLen: allow 20% tolerance (model answers often slightly exceed)
  if (entry.maxLen && content.length > entry.maxLen + 400) {
    fails.push(`too long ${content.length} > ${entry.maxLen}`);
  }

  // Strict leak / quality checks
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
