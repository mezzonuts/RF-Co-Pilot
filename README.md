
# rf-copilot — TelecomAgent

Tauri + React desktop app untuk engineering telekomunikasi mobile.

## Features
- Agent Workspace (chat‑based workflow)
- Knowledge Vault (Obsidian‑style)
- 6 Skills (module‑based tools)
- LLM manual config (Hermes‑style)

## Quick Start (NPM‑only)
```bash
# 1️⃣ Install semua dependensi (Node / NPM)
npm install

# 2️⃣ Jalankan server development (React + Vite)
npm run dev          # → http://localhost:5173

# 3️⃣ Build versi produksi (output ke ./dist)
npm run build

# 4️⃣ Preview build produksi
npm run preview
```

> **Catatan:** Perintah di atas tidak membutuhkan Rust, Docker, atau PostgreSQL. Hanya cukup Node ≥ 18 dan NPM.

## Build binary (optional – requires Rust toolchain)
Jika ingin menghasilkan binary desktop Tauri:
```bash
cargo tauri build   # pastikan `cargo` dan `rustup` ter‑install
```
Atau gunakan wrapper CLI yang sudah disediakan:
```bash
npx rf-copilot dev      # dev server
npx rf-copilot build    # build
npx rf-copilot preview  # preview hasil build
```

## Production setup (optional)
*Untuk penggunaan PostGIS & Qdrant, ikuti `logs/coding/07 - Production Setup Guide.md`.*
