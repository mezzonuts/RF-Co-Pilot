# Project Log – RF‑Co‑Pilot Enhancements

## 2026‑09‑14
- Added guard for `isDriveTest` with stricter regex to avoid overriding specific intents.
- Reordered intent checks: L1 → L2 → L3 → KPI → Operator before generic branches.
- Expanded `ensureLiveKeywords` to include Smartfren, n40, IOH, PCI, Carrier Aggregation, etc.
- Updated Operator fallback for Indosat to catch `2140 MHz`/`EARFCN 300` patterns.
- Created GAP analysis markdown (`tests/GAP_SESI1_CATALOG.md`) summarizing remaining catalog gaps (now zero fails).
- Ingested 8 new 3GPP knowledge markdown files into `knowledge/3gpp_update_session_1/`.
- Ran Sesi 1 test suite; all 139 questions now PASS (100 %).
- Committed all changes to branch `feat/v0.4‑vault‑grounded‑loop`.

## Next Steps
- Push branch to remote and open PR for review.
- Optionally index new knowledge into Obsidian vault using `knowledge‑vault‑ingest` skill.
- Continue with Sesi 2 benchmark or further feature work.

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

### Next
- Re-run harness Sesi 2 setelah validator patch
- Install ML libs (peft, transformers, trl) untuk training di GPU
- Monitor dashboard, sesuaikan router keywords bila perlu
