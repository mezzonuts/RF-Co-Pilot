# rf-copilot — TelecomAgent RF Co-Pilot

Tauri + React + Python sidecar untuk RF engineering 4G/5G — Agent Workspace, Knowledge Vault (Obsidian-style), 6 Skills, LLM config manual (Hermes-style).

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

## Fitur
- **Agent Workspace** — 3 panel: Left 260px (Projects / Recent Tasks / Skills), Center (Chat + execution log mono 11px), Right 360px (Live Preview Excel/PPT/Map)
- **Knowledge Vault** — tree 3 kolom (Vault list / Viewer / Graph), search, drag-drop ingest .md/.txt/.pdf/.docx
- **Tools & Skills** — 8 tools (DT Parser, KPI, PostGIS, Excel, PPTX, Coverage Map, RCA, Vault Indexer) + 6 skills toggle on/off
- **LLM Settings** — provider Ollama/OpenRouter/OpenAI/Anthropic/HF/Custom, model, base URL, API key, temperature
- **v0.4 Baru**: GET /api/vault/retrieve?q=RSRP (hybrid), GET /api/vault/stats, POST /api/vault/reindex (rebuild vector+graph), POST /api/chat sekarang Vault-grounded + clarification + gap capture

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
4. Buka browser: **http://localhost:8000** — Agent (default), klik tab **Vault** untuk cek vault

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

## Vault (opsional)
- http_server.py serve frontend dist/ + API /api/vault/* dari vault C:/Users/kamu/Documents/Obsidian/Dika/wiki
- Buat folder tersebut jika belum ada; isi dengan .md (atomic/sources/concepts/entities)
- Ingest: drag-drop file ke panel Vault kiri, atau POST /api/vault/ingest
- Jika pypdf/python-docx belum install, .pdf/.docx skip — .md/.txt tetap jalan:
```bat
pip install pypdf python-docx
```
- **v0.4**: setelah ingest, cache vault auto-invalidate; atau manual POST /api/vault/reindex untuk rebuild LanceDB. Cek GET /api/vault/stats

## Arsitektur
- **v0.4 Vault-First**: [rf-copilot-v0.4-architecture.html](./rf-copilot-v0.4-architecture.html) + [ARCHITECTURE_v0.4.md](./ARCHITECTURE_v0.4.md)
- **v0.3 (arsip)**: [rf-copilot-architecture.html](./rf-copilot-architecture.html) + [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Obsidian Vault**: [obsidian-vault-architecture.html](./obsidian-vault-architecture.html) + [OBSIDIAN_VAULT_ARCHITECTURE.md](./OBSIDIAN_VAULT_ARCHITECTURE.md)

## Struktur
```
rf-copilot/
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
- **v0.4 (feat/v0.4-vault-grounded-loop)** — Vault-First grounding, hybrid retrieval (FTS5+LanceDB+graph), dual-mode A/B, sufficiency gate + clarification loop, self-improvement (log.md + raw/drafts), sidecar/ modularisasi, architecture diagram baru (lama dipertahankan).
- **v0.3** — AgentWorkspace mockup-identical, Vault blank fix, Tailwind CDN, memory self-improve (rf_memory.json), Excel multi-sheet (Power Query Raw).

## Build binary (opsional, butuh Rust)
```bat
cargo tauri build
```

## Catatan
- dist/ dan node_modules/ tidak di-commit (.gitignore)
- Jangan commit API key / token — pakai placeholder [REDACTED]
- Branch aktif: feat/v0.4-vault-grounded-loop (v0.3 tetap di branch v0.3)
