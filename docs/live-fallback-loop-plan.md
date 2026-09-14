# 🔄 Live ⇄ Fallback Loop with Self-Learning — Implementation Plan

**Branch:** `feat/v0.4-vault-grounded-loop`  
**Author:** RF-Co-Pilot Team  
**Created:** 2026-09-16  

---

## 🎯 Objective

Membangun sistem dimana:
1. **Router** memutuskan apakah pertanyaan harus diproses oleh **Live LLM** atau **Fallback Engine**.
2. **Fallback Engine** (RAG + model kecil) mencoba menjawab.
3. **Judge/Validator** mengecek kecukupan jawaban.
4. Bila jawaban **kurang memadai** → **force-to-live** otomatis (tanpa konfirmasi user).
5. Semua Q&A disimpan ke **dataset_fallback_v2.json** untuk **fine-tuning**.
6. **Cron job** menjalankan fine-tuning secara periodik.
7. **Dashboard** di Obsidian vault menampilkan metrik kualitas.

---

## 📋 Tahapan Implementasi

### Tahap 1 — Decision Router (`decideMode`)

**File:** `tests/run_sesi2.mjs` (utility function)  
**Deskripsi:** Fungsi yang memutuskan mode (`live` atau `fallback`) berdasarkan aturan:
- Jika pertanyaan mengandung MCC/MNC/EARFCN/NR-ARFCN/PCI/RRC/SIB/TDD/FDD → **live**.
- Jika panjang prompt > 120 karakter → **live**.
- Jika pertanyaan bersifat konseptual/generik → **fallback**.
- Jika `mode` sudah ditentukan di `catalog_sesi2.json` → gunakan itu.

**Output:** `function decideMode(entry): 'live' | 'fallback'`

---

### Tahap 2 — Fallback Engine (RAG via Vault)

**File:** `src/hooks/useFallbackEngine.js`  
**Deskripsi:** Fallback engine yang:
- Menggunakan **knowledge-vault-ingest** skill untuk mencari dokumen 3GPP relevan.
- Melakukan RAG query terhadap vault (54 notes, 5 kategori).
- Jika ditemukan snippet relevan → sertakan dalam prompt untuk model fallback (`google/gemini-2.5-flash`).

**Flow:**
```
Entry → searchVaultHits(q, 3) → vaultRefStr
→ buildBody dengan context: `Pertanyaan: ${entry.prompt}\n\nSumber pengetahuan (dari vault): ${vaultRefStr}`
```

---

### Tahap 3 — Validator (Judge)

**File:** `tests/validator.js`  
**Deskripsi:** Fungsi `validate(entry, answer, meta)` yang:
1. **Rule-based check:** Periksa `entry.contains` (keyword), `maxLen`, dan larangan (`Skill aktif`, `Google AI Studio`).
2. **LLM-as-Judge (opsional):** Jika rule check gagal, panggil live model untuk menilai apakah jawaban sudah cukup.

**Output:** `{ ok: bool, fails: string[], needLive: bool }`

---

### Tahap 4 — Dataset Builder

**File:** `tests/dataset_builder.js`  
**Deskripsi:** Setiap query menghasilkan entri yang disimpan ke `tests/dataset_fallback_v2.json` (append-only):
```json
{
  "id": 1,
  "prompt": "Berapakah MCC dan MNC untuk operator Telkomsel?",
  "category": "Operator & Spectrum",
  "decidedMode": "fallback",
  "fallback": { "answer": "...", "meta": {...}, "fails": [...] },
  "live": { "answer": "...", "meta": {...}, "fails": [...] },
  "source": "fallback" | "live",
  "validatedBy": "rule" | "llm-judge",
  "timestamp": "2026-09-16T09:00:00Z"
}
```

---

### Tahap 5 — Force-to-Live + Retry

**File:** `tests/run_sesi2.mjs` (loop)  
**Deskripsi:** Jika validator menemukan jawaban kurang memadai:
1. **Tambahkan 1 retry** dengan mode `live` (max 1 kali).
2. Simpan kedua versi (fallback & live) ke dataset.
3. **Tanpa perlu konfirmasi user** — sepenuhnya otomatis.

---

### Tahap 6 — Fine-Tuning Pipeline

**File:** `scripts/train_fallback.py`  
**Deskripsi:** Script Python yang:
1. Membaca `tests/dataset_fallback_v2.json`.
2. Men-generate `data/train.jsonl` (format OpenAI fine-tuning).
3. Menjalankan **LoRA/QLoRA training** (transformers + peft).
4. Menyimpan model ke `models/fallback_v2/`.

**Cron job:**
```yaml
name: "retrain-fallback"
schedule: "0 2 * * *"  # setiap malam 02:00
prompt: |
  #!python
  import subprocess
  subprocess.run(["python","scripts/train_fallback.py"], check=True)
  subprocess.run(["git","add","models/fallback_v2"], check=True)
  subprocess.run(["git","commit","-m","Update fallback model"], check=True)
  subprocess.run(["git","push"], check=True)
```

---

### Tahap 7 — Monitoring Dashboard

**File:** `wiki/metrics/fallback.md` (Obsidian vault)  
**Deskripsi:** Dashboard markdown dengan metrik:
- Total queries, PASS %, FAIL %.
- Fallback-pass %, Live-override %.
- Dataset growth (entries per day).
- Status training terakhir.

---

## 🤖 Sub-Agent Feasibility

**Ya, semuanya bisa dikerjakan dengan sub-agent.** Berikut strategi delegasi:

| Tahap | Sub-Agent | Role | Reason |
|-------|-----------|------|--------|
| 1-2 | `deleg_t1_router_fallback` | `leaf` | Menulis `decideMode` + `useFallbackEngine`. |
| 3-5 | `deleg_t3_validator_builder` | `leaf` | Menulis `validator.js` + `dataset_builder.js` + `force-to-live` loop. |
| 6 | `deleg_t6_trainer` | `leaf` | Menulis `train_fallback.py` + cron-job. |
| 7 | `deleg_t7_dashboard` | `leaf` | Menulis `wiki/metrics/fallback.md`. |
| UI | `deleg_ui_overlay` | `leaf` | Mengintegrasikan `AgentProcessingOverlay` ke `AgentWorkspace.tsx`. |
| Build & Test | `deleg_build_test` | `leaf` | Menjalankan `npm run build` dan `run_sesi2.mjs`. |

**Total sub-agents: 6 (parallel)** — setiap sub-agent bekerja secara independen.

---

## 📊 Acceptance Criteria

| Metric | Target |
|--------|--------|
| **Sesi 2 PASS rate (live)** | ≥ 95% |
| **Sesi 2 PASS rate (fallback)** | ≥ 80% |
| **Dataset entries** | 300 (1 per question) |
| **Retraining frequency** | 1x/day (cron) |
| **Dashboard** | Metrics visible in Obsidian |
| **No "Google AI Studio" leak** | 0 occurrences in live output |
| **No "Skill aktif" leak** | 0 occurrences |
| **Force-to-live automatic** | No user confirmation required |
