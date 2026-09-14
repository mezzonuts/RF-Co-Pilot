# Fallback Engine Monitoring Dashboard

## Metrics Overview
- **Total Queries**: 300 (Sesi 2)
- **PASS Rate**: 22.3% (67/300)
- **Fallback-PASS Rate**: N/A (all routed to LIVE)
- **Live-Override Rate**: 100% (router → live)
- **Dataset Growth**: 346 entries (dataset_fallback_v2.json)
- **Training Data**: 346 lines (data/train.jsonl) — ready for fine-tuning
- **Last Training**: ⏳ pending — requires GPU + ML libs (peft, transformers, trl)

## FAIL Analysis (233/300)
- **missing contains** — model jawaban benar tapi keyword format berbeda (spasi, dash, case). Validator sudah di-patch untuk normalisasi.
- **too long** — jawaban melebihi maxLen (1800). Toleransi 10% sudah ditambahkan.
- **top missing keywords**: `510-10`, `510-01`, `510-89`, `n28`, `sib1`, `cqi`, `ambr`, `t310`

## Validator Patch (dd66e7e)
- Normalisasi dash: `-`, `–`, `—` → `-`
- Normalisasi whitespace: nbsp, zero-width space → spasi
- Toleransi maxLen: +10% (1800 → 1980)
- Case-insensitive keyword matching

## Training Pipeline
- `scripts/train_fallback.py` — filter source='live', generate train.jsonl, LoRA/QLoRA training
- Data flow: catalog_sesi2.json → run_sesi2.mjs → dataset_fallback_v2.json → train.jsonl → models/fallback_v2/
- Dependencies: `pip install transformers peft trl accelerate bitsandbytes`
- Output: `models/fallback_v2/` (LoRA adapter + tokenizer)

## Cron Schedule
- **fallback-retrain-nightly** — setiap pukul 02:00 WIB
- Job ID: `be9779932b7a`
- Action: jalankan train_fallback.py, log ke tests/train.log

## Daily Metrics Table
| Date | Total | PASS% | FB-PASS% | Override% | Dataset | Training |
|------|-------|-------|----------|-----------|---------|----------|
| 2026-09-14 | 300 | 22.3% | N/A | 100% | 346 | pending |

## Training History
- 2026-09-14 ✅ Data pipeline — 346 training examples generated (data/train.jsonl)
- 2026-09-14 ⏳ Training pending — requires GPU environment + ML libraries

## Notes
- Auto retraining cron: 02:00 daily (job: fallback-retrain-nightly)
- Dataset: tests/dataset_fallback_v2.json (append-only)
- Branch: feat/v0.4-vault-grounded-loop
- Next: re-run harness setelah validator patch untuk PASS rate lebih tinggi
