# rf-copilot — TelecomAgent RF Co-Pilot

Tauri + React + Python sidecar untuk RF engineering 4G/5G — Agent Workspace, **Knowledge Vault default 3GPP 4G/5G (24 specs, 28 files, auto-load)**, Skill-Aware, LLM multi-provider.

## UPDATE Branch v0.4 — Vault-First Grounded Loop
> Branch: `feat/v0.4-vault-grounded-loop` — lihat [ARCHITECTURE_v0.4.md](./ARCHITECTURE_v0.4.md) & diagram [rf-copilot-v0.4-architecture.html](./rf-copilot-v0.4-architecture.html) (arsitektur v0.3 lama tetap di [rf-copilot-architecture.html](./rf-copilot-architecture.html))

Pada v0.3 LLM dipanggil langsung (rentan halusinasi). **v0.4 Vault-First** mengubah alur menjadi:

1. **Obsidian Vault = Single Source of Truth** — wiki/atomic/, wiki/synthesis/, raw/ (Karpathy LLM Wiki paradigm).
2. **Hybrid Retrieval** — SQLite FTS5 (BM25) + LanceDB + FastEmbed ONNX (vector) + NetworkX 1-hop Wikilinks graph → RRF ranker (sidecar/vault_engine/).
3. **Dual-Mode Engine**
   - **Mode A (Batch DT Analysis)**: CSV/XLSX → threshold matching ke Vault → grounded RCA & rekomendasi tilt/PCI/neighbor.
   - **Mode B (Interactive Q&A)**: Q&A engineer dengan Grounding Contract ketat.
4. **Sufficiency Gate & Clarification Loop** — validasi kelengkapan data sebelum panggil LLM; jika kurang/ambigu, AI bertanya balik (sidecar/agent/sufficiency_gate.py) alih-alih berasumsi.
5. **Self-Improvement Loop** — gap SOP/parameter dicatat ke wiki/log.md + draf raw/drafts/ untuk review engineer (Human-in-the-Loop, sidecar/agent/self_improvement.py).

Fallback aman: tanpa lancedb/fastembed tetap grounded via FTS5 + graph (vector opsional).

## 📚 Vault Default Basic Knowledge — 3GPP 4G/5G (Auto-load)

> **Saat `npm run build && node dist/server.cjs`, aplikasi langsung punya 3GPP Knowledge Vault — tanpa download ulang.** Log boot: `[vault] basic knowledge loaded: 29 new notes — manifest=v1.0-2026-09-08`.

| Kategori | Specs | Files | Isi kunci (troubleshooting clause) |
|---|---|---|---|
| `01_RAN_L2_L3` | 12 | 15 | TS 38.331 RRC (5.3/5.4/5.5 A1-A6/B1-B2/5.7/6.2-6.3), 38.321 MAC (5.1 RACH/5.4 SR/5.15 BFR), 38.322/323 RLC/PDCP, 38.211/213/300/104, 36.331/300/211/104 |
| `02_CORE_NAS_INTERFACES` | 5 | 5 | TS 24.501 NAS 5GS Cause #7/#11/#15/#27/#31 & #26/#27/#28/#31/#38, 38.413 NGAP (8.2/8.4/9.3.1.2), 38.423 XnAP (8.2/9.2.1.1), 24.301, 36.413 |
| `03_PROCEDURES_FLOWS` | 3 | 3 | TS 23.501/502 (Registration, PDU Session, HO Xn/N2, QoS 5QI, Slicing), 23.401 (EPC Attach/TAU/Bearer) |
| `04_VOICE_SERVICES` | 2 | 3 | TS 24.229 IMS SIP 4xx/5xx/6xx + SDP 6.1, 23.216 SRVCC |
| `05_OAM_PM_KPIS` | 2 | 2 | TS 28.552 (5.1.1 gNB RRC / 5.1.2 UE Context / 5.1.3 PDU / 5.1.5 HO counters), 32.425 (E-RAB CDR) |

**Total: 24 specs, 28 files (15+5+3+3+2), ~140M docx/doc asli + 384K wrappers.**

- **Repo `vault/`** (default app vault, ter-commit):
  - `vault/sources/*.md` — 28 wrapper `.md` (frontmatter `type: source`, `category`, `clause`, `tags: [3gpp]`, extract 20k char via `python-docx`; OLE `.doc` = stub + clause list) — langsung RAG/searchable.
  - `vault/3gpp/<kategori>/*.{docx,doc,xsd}` — 28 binary asli (mirror `D:/3gpp_pdf/3gpp/`), **di-ignore git** (`.gitignore: vault/3gpp/**/*.docx|doc|xsd`) — tetap lokal, 5x `.gitkeep` preserve folder.
  - `vault/manifest.json` `v1.0-2026-09-08` + `vault/README.md` + `vault/3gpp/README.md`.
- **Loader**: `server.ts:loadVaultBasicKnowledge()` — baca `vault/sources/*.md` + `manifest.json` on startup, idempotent dedup by `path/name`, cap 40k body, `vaultNotes = INITIAL(6) + vault(28) = 36` (verify `/api/vault/*` tanpa upload).
- **Mirror luar repo**: `D:/3gpp_pdf/3gpp/<kategori>/` (staging 139M) + `C:/Users/PC/Documents/Obsidian/Dika/wiki/{3gpp,sources}` (28 md) — sync via script di bawah.
- **Sync / rehydrate** (kapan pun, idempotent, retry 3x):
  ```bat
  C:/Users/PC/AppData/Local/Python/pythoncore-3.14-64/python.exe scripts/download_3gpp.py
  :: atau cron Hermes:
  C:/Users/PC/AppData/Local/Python/pythoncore-3.14-64/python.exe C:/Users/PC/AppData/Local/hermes/scripts/sync_3gpp.py
  :: cek:
  curl http://127.0.0.1:3000/api/vault/stats
  ```
- `package.json:files` sudah include `vault`, `skills`, `scripts/download_3gpp.py` — `npm publish` ikut bawa basic knowledge.

## Fitur
- **Agent Workspace** — 3 panel: Left 260px (Projects / Recent Tasks / Skills), Center (Chat + execution log mono 11px), Right 360px (Live Preview Excel/PPT/Map)
- **Knowledge Vault** — tree 3 kolom (Vault list / Viewer / Graph), search, drag-drop ingest .md/.txt/.pdf/.docx — **default sudah terisi 28 wrapper 3GPP (auto-load), RAG siap pakai**
- **Tools & Skills** — 8 tools (DT Parser, KPI, PostGIS, Excel, PPTX, Coverage Map, RCA, Vault Indexer) + 6 built-in RF + 22 external (+ Pandas default raw-first) = 29 skills auto-select top-3 (toggle on/off, `skills_state.json`)
- **LLM Settings** — provider Ollama/OpenRouter/OpenAI/Anthropic/HF/Custom + 9Router `http://localhost:20128/v1` (`my-combo`), Google AI Studio (`gemini-2.5-flash`), auto-detect `baseUrl` + multi-key env
- **v0.4 Baru**: GET /api/vault/retrieve?q=RSRP (hybrid), GET /api/vault/stats, POST /api/vault/reindex, POST /api/chat Vault-grounded + Pandas raw-first (`df.shape/columns/dtypes/isna/describe/nunique` sebelum KPI) + benchmark deterministic 4397 sampel + sanitizer `###/**/__/$$` clean

## Syarat
- **Node.js >= 18** + NPM (wajib)
- **Python >= 3.11** (opsional — hanya untuk Knowledge Vault API http_server.py; Agent Workspace jalan tanpa Python)
- Tidak butuh Rust / Docker / PostgreSQL untuk dev & preview
- **v0.4 Vector (opsional)**: pip install lancedb fastembed untuk semantic search; tanpa ini hybrid fallback ke FTS5+graph tetap jalan

## Install — NPM-only (paling mudah)

### Opsi A: Download ZIP (tanpa Git)
1. Buka https://github.com/mezzonuts/RF-Co-Pilot → tombol hijau **Code → Download ZIP**
2. Extract ZIP ke mis. D:/rf-copilot atau C:/Users/Nama/Desktop/rf-copilot
3. Buka **Command Prompt** (Win+R → cmd) atau **PowerShell**, lalu:
```bat
cd D:/rf-copilot/rf-copilot
npm install
npm run build
python http_server.py
```
4. Buka browser: **http://localhost:8000** — Agent (default), klik tab **Vault** untuk cek vault (sudah terisi 28 wrapper 3GPP)

### Opsi B: Git clone (untuk update mudah)
```bat
git clone https://github.com/mezzonuts/RF-Co-Pilot.git
cd RF-Co-Pilot/rf-copilot
git checkout feat/v0.4-vault-grounded-loop
npm install
npm run build
python http_server.py
```
→ http://localhost:8000

### Dev mode (Vite HMR, tanpa Python)
```bat
npm run dev
# → http://localhost:5173  (Vault API tidak aktif di mode ini)
```

### Wrapper CLI
```bat
npx rf-copilot dev      # = npm run dev
npx rf-copilot build    # = npm run build
npx rf-copilot preview  # preview dist/
```

## Vault & Basic Knowledge
- `vault/` di repo = default — **tidak perlu setup Obsidian**; app langsung RAG 3GPP 4G/5G. Opsional: `http_server.py` serve `dist/` + `/api/vault/*` dari vault eksternal `C:/Users/kamu/Documents/Obsidian/Dika/wiki` (jika ada).
- Buat folder wiki tersebut jika belum ada; isi dengan .md (atomic/sources/concepts/entities) — akan merge dengan `vault/sources`.
- Ingest tambahan: drag-drop file ke panel Vault kiri, atau POST /api/vault/ingest
- Jika pypdf/python-docx belum install, .pdf/.docx skip — .md/.txt tetap jalan:
```bat
pip install pypdf python-docx
```
- **v0.4**: setelah ingest, cache vault auto-invalidate; atau manual POST /api/vault/reindex untuk rebuild LanceDB. Cek GET /api/vault/stats — `[vault] basic knowledge loaded: 29 new notes` di boot log.

## Arsitektur
- **v0.4 Vault-First**: [rf-copilot-v0.4-architecture.html](./rf-copilot-v0.4-architecture.html) + [ARCHITECTURE_v0.4.md](./ARCHITECTURE_v0.4.md)
- **Vault 3GPP**: [vault/README.md](./vault/README.md) + [vault/3gpp/README.md](./vault/3gpp/README.md) + [vault/manifest.json](./vault/manifest.json)
- **v0.3 (arsip)**: [rf-copilot-architecture.html](./rf-copilot-architecture.html) + [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Obsidian Vault**: [obsidian-vault-architecture.html](./obsidian-vault-architecture.html) + [OBSIDIAN_VAULT_ARCHITECTURE.md](./OBSIDIAN_VAULT_ARCHITECTURE.md)

## Struktur
```
rf-copilot/
  vault/                          # [v0.4] default app vault (basic knowledge 3GPP)
    manifest.json                 # v1.0-2026-09-08, 24 specs / 28 files
    README.md                     # kategori + clause mapping
    sources/*.md                  # 28 wrappers (commit, 384K)
    3gpp/<kategori>/*.{docx,doc}  # 28 binaries (local, .gitignored, .gitkeep)
  scripts/download_3gpp.py        # rehydrate 24 specs 5 kategori (commit)
  scripts/inject_3gpp.py          # legacy injector
  skills/                         # bundled skills (29KB) + pandas/
  src/components/AgentWorkspace.*  # 3-panel Agent (mockup-identical)
  src/components/KnowledgeVault.*  # Vault 3-kolom + graph SVG
  src/App.tsx                      # Topbar 44px + tab Agent/Vault/Tools/Skills + LLM modal
  src-tauri/python/telecom_agent/  # vault_api.py, vault_ingest.py (legacy, tetap dipakai)
  sidecar/                         # [v0.4] Vault-First engine
    parsers/   excel.py, csv_parser.py
    export/    excel.py, pptx.py
    vault_engine/ parser.py, graph.py, indexer.py, retriever.py  # FTS5+LanceDB+graph
    agent/     router_client.py, prompt_builder.py, sufficiency_gate.py, self_improvement.py
    db/        lancedb_data/ (gitignored), rf_copilot.db (FTS5 + memory)
  http_server.py                   # dev server (frontend + vault API) port 8000 — v0.4 wired
  dist/                            # hasil build (di-ignore git)
```

## Changelog
- **v0.4 `2c8beeb` (vault basic knowledge)** — 3GPP Knowledge Vault sebagai default app vault: 24 specs / 28 files / 5 kategori, `vault/sources` 28 wrappers + manifest, `server.ts:loadVaultBasicKnowledge()` auto-load, `package.json:files` include vault, rehydrate script `download_3gpp.py`.
- **v0.4 `0e528f5` (Pandas raw-first)** — inject Pandas sebagai default skill, `selectRelevantSkills` boost +5 untuk log/DT/CSV/RSRP/SINR/throughput, systemPrompt RAW-FIRST (`shape/columns/dtypes/isna/describe/nunique` + audit multi-parameter sebelum KPI).
- **v0.4 `42bb719` (provider auto-detect)** — `baseUrl` → provider (localhost:20128→9Router `my-combo`, generativelanguage→Google, openrouter→OpenRouter), multi-key env, no model force-normalize.
- **v0.4 `9198c90`/`4c12024` (benchmark + sanitizer)** — deterministic speedtest 4397 sampel, `sanitizePlainText()` clean `###/**/__/$$`, PORT env fix.
- **v0.4 `5c8a906` (Skill-Aware)** — 22 external + 6 RF = 28 skills, `loadSkillsCatalog()` 5s cache, `selectRelevantSkills` + `buildSkillContextBlock()` before-LLM, 5 REST `/api/skills/*`.
- **v0.3** — AgentWorkspace mockup-identical, Vault blank fix, Tailwind CDN, memory self-improve (rf_memory.json), Excel multi-sheet (Power Query Raw).

## Build binary (opsional, butuh Rust)
```bat
cargo tauri build
```

## Catatan
- dist/ dan node_modules/ tidak di-commit (.gitignore)
- Jangan commit API key / token — pakai placeholder [REDACTED]
- Branch aktif: feat/v0.4-vault-grounded-loop (v0.3 tetap di branch v0.3)
