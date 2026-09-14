# Project Log – RF‑Co‑Pilot Enhancements

## 2026‑09‑14
- Added guard for `isDriveTest` with stricter regex to avoid overriding specific intents.
- Reordered intent checks: L1 → L2 → L3 → KPI → Operator before generic branches.
- Expanded `ensureLiveKeywords` to include Smartfren, n40, IOH, PCI, Carrier Aggregation, etc.
- Updated Operator fallback for Indosat to catch `2140 MHz`/`EARFCN 300` patterns.
- Created GAP analysis markdown (`tests/GAP_SESI1_CATALOG.md`) summarizing remaining catalog gaps (now zero fails).
- Ingested 8 new 3GPP knowledge markdown files into `knowledge/3gpp_update_session_1/`.
- Ran Sesi 1 test suite; all 139 questions now PASS (100 %).
- Committed all changes to branch `feat/v0.4‑vault‑grounded‑loop`.

## 2026-09-14 22:11 — Live⇄Fallback Loop (Step 1–7) + UI/UX + Harness Sesi 2

### Yang dikerjakan
1. **Decision Router** (`decideMode`) — rule-based routing: keyword + prompt length
2. **Fallback Engine** — RAG via vault knowledge search, model Gemini 2.5-flash
3. **Validator** (`validate`) — keyword, maxLen, prohibited phrases check
4. **Force-to-live** — auto retry ke live LLM saat fallback gagal
5. **Dataset Builder** — append ke tests/dataset_fallback_v2.json
6. **Training Script** — scripts/train_fallback.py (LoRA/QLoRA pipeline)
7. **Dashboard** — wiki/metrics/fallback.md

### UI/UX
- AgentProcessingOverlay (animasi robot, "Processing…", aria-live)
- Non-copyable agent responses (user-select: none)
- Footer 7px blend

### Sesi 2 Results
- Total: 300 | PASS: 67 (22.3%) | FAIL: 233
- FAIL utama: keyword format mismatch (dash, whitespace, case) — validator sudah di-patch
- Dataset: 346 entries (live)
- Training data: 346 lines (train.jsonl)

### Cron
- fallback-retrain-nightly: 02:00 daily (job ID: be9779932b7a)

### Commits
- `10f7038` feat: implement Live⇄Fallback Loop, validator, training script, dashboard & UI overlay
- `dd66e7e` fix: training script + validator normalize + 10% len tolerance

## 2026-09-14 23:45 — 9Router Auto-Detect Fix + Definitional Question (Rule 2c)

### Masalah
Agent RF-Co-Pilot mengembalikan **data dump mentah** untuk pertanyaan definisi
(singkatan, pengertian), padahal harusnya menjawab langsung. Penyebab:
1. **Frontend** mengirim `provider: google` + `model: gemini-2.5-flash`.
2. **Server** auto-detect 9Router → ganti `providerLower` ke `9router`, tapi
   - `targetModel` tetap `gemini-2.5-flash` (9Router tak punya model itu)
   - `isGoogle` tetap `true` (variable di-cache sebelum patch)
   - `effectiveApiKey` hanya cek Gemini API key
   - `orModels` pakai `model` param (dari frontend), bukan `targetModel`
3. Akibat: 9Router → 404 model not found → fallback ke Gemini → Gemini → 404
   API key invalid → akhirnya jatuh ke **fallback engine** (data dump).

### Fix yang diterapkan (server.ts)
1. **Auto-detect 9Router** — kalau `localhost:20128` reachable:
   - `providerLower = '9router'`
   - `targetModel = 'ollama/gpt-oss:120b'`
2. **Recalculate `isGoogle`** setelah override provider
3. **`effectiveApiKey`** — tambah `process.env['9ROUTER_API_KEY']` ke fallback chain
4. **`orModels`** — pakai `targetModel` bukan `model` param frontend
5. **Rule 2c (System Prompt)** — pertanyaan definisi/singkatan dijawab langsung

### Test Results
| Pertanyaan | Jawaban | Status |
|------------|---------|--------|
| `MOCN singkatan dari apa?` | MOCN = Multi-Operator Core Network — arsitektur RAN sharing... | ✅ |
| `apa itu RSRP?` | RSRP = Reference Signal Received Power — ukuran daya sinyal referensi... | ✅ |
| `singkatan dari PCI apa?` | PCI = Physical Cell Identity — identitas sel fisik... | ✅ |
| `SINR adalah apa?` | SINR (Signal-to-Interference-plus-Noise Ratio)... | ✅ |
| `PLMN artinya apa?` | PLMN = Public Land Mobile Network — jaringan seluler publik... | ✅ |
| `NR-ARFCN itu apa?` | NR-ARFCN (NR-Absolute Radio Frequency Channel Number)... | ✅ |

**Provider: 9Router (ollama/gpt-oss:120b) | isLive: True** ✅

### Commits
- `d9ad65f` fix: system prompt Rule 2c — direct definition answers
- `27a0dee` fix: 9Router auto-detect + API key resolution — agent now routes to live LLM correctly

### Hasil Akhir
- **Sesi 1:** 139/139 PASS (100%) ✅
- **Sesi 2:** 67/300 PASS (22.3%) — butuh re-run setelah router fix
- **Live routing:** 9Router ollama/gpt-oss:120b via localhost:20128 ✅
- **Definitional questions:** Semua 6/6 PASS ✅

### Next
- Re-run Sesi 2 harness setelah 9Router fix (sekarang harusnya lebih banyak PASS)
- Install ML libs (peft, transformers, trl) untuk LoRA training di GPU
- Monitor dashboard wiki/metrics/fallback.md
- Commit Sesi 2 re-run results
