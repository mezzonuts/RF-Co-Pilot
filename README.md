# rf-copilot — TelecomAgent RF Co-Pilot

Tauri + React + Python sidecar untuk RF engineering 4G/5G — Agent Workspace, Knowledge Vault (Obsidian-style), 6 Skills, LLM config manual (Hermes-style).

## Fitur
- **Agent Workspace** — 3 panel: Left 260px (Projects / Recent Tasks / Skills), Center (Chat + execution log mono 11px), Right 360px (Live Preview Excel/PPT/Map)
- **Knowledge Vault** — tree 3 kolom (Vault list / Viewer / Graph), search, drag-drop ingest `.md/.txt/.pdf/.docx`
- **Tools & Skills** — 8 tools (DT Parser, KPI, PostGIS, Excel, PPTX, Coverage Map, RCA, Vault Indexer) + 6 skills toggle on/off
- **LLM Settings** — provider Ollama/OpenRouter/OpenAI/Anthropic/HF/Custom, model, base URL, API key, temperature

## Syarat
- **Node.js ≥ 18** + NPM (wajib)
- **Python ≥ 3.11** (opsional — hanya untuk Knowledge Vault API `http_server.py`; Agent Workspace jalan tanpa Python)
- Tidak butuh Rust / Docker / PostgreSQL untuk dev & preview

## Install — NPM-only (paling mudah)

### Opsi A: Download ZIP (tanpa Git)
1. Buka https://github.com/mezzonuts/RF-Co-Pilot → tombol hijau **Code → Download ZIP**
2. Extract ZIP ke mis. `D:\rf-copilot` atau `C:\Users\Nama\Desktop\rf-copilot`
3. Buka **Command Prompt** (Win+R → `cmd`) atau **PowerShell**, lalu:
```bat
cd D:\rf-copilot\rf-copilot
npm install
npm run build
python http_server.py
```
4. Buka browser: **http://localhost:8000** — Agent (default), klik tab **Vault** untuk cek vault

### Opsi B: Git clone (untuk update mudah)
```bat
git clone https://github.com/mezzonuts/RF-Co-Pilot.git
cd RF-Co-Pilot\rf-copilot
git checkout v0.3
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
- `http_server.py` serve frontend `dist/` + API `/api/vault/*` dari vault `C:\Users\<kamu>\Documents\Obsidian\Dika\wiki`
- Buat folder tersebut jika belum ada; isi dengan `.md` (atomic/sources/concepts/entities)
- Ingest: drag-drop file ke panel Vault kiri, atau POST `/api/vault/ingest`
- Jika `pypdf`/`python-docx` belum install, `.pdf/.docx` skip — `.md/.txt` tetap jalan:
```bat
pip install pypdf python-docx
```

## Struktur
```
rf-copilot/
  src/components/AgentWorkspace.*  # 3-panel Agent (mockup-identical)
  src/components/KnowledgeVault.*  # Vault 3-kolom + graph SVG
  src/App.tsx                      # Topbar 44px + tab Agent/Vault/Tools/Skills + LLM modal
  src-tauri/python/telecom_agent/  # vault_api.py, vault_ingest.py
  http_server.py                   # dev server (frontend + vault API) port 8000
  dist/                            # hasil build (di-ignore git)
```

## Build binary (opsional, butuh Rust)
```bat
cargo tauri build
```

## Catatan
- `dist/` dan `node_modules/` tidak di-commit (`.gitignore`)
- Jangan commit API key / token — pakai placeholder `[REDACTED]`
- Branch aktif: `v0.3`
