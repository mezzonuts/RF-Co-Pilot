# 🚀 Panduan Instalasi rf-copilot — untuk PEMULA (tanpa pengalaman IT)

## 📋 Apa yang Kamu Butuhkan
1. **Computer** Windows / Mac / Linux
2. **Internet**
3. **Waktu** ~5 menit

---

## 📥 Langkah 1: Install Node.js (sekali saja)

1. Buka browser → **https://nodejs.org** → klik **Download Node.js (LTS)**
2. Buka file installer (`node-v20.x.x-x64.msi` di Windows) → Next terus → Install
3. **Restart computer**

Cek di Terminal/Command Prompt:
```bash
node --version   # v20.x.x
npm --version    # 9.x atau 10.x
```

---

## 📦 Langkah 2: Download rf-copilot

### Opsi A — Download ZIP (paling mudah, tanpa Git)
1. Buka **https://github.com/mezzonuts/RF-Co-Pilot**
2. Tombol hijau **Code → Download ZIP**
3. Extract ZIP ke folder mudah, mis:
   - `D:\rf-copilot` atau `C:\Users\NamaKamu\Desktop\rf-copilot`

### Opsi B — Git clone (biar gampang update)
```bash
git clone https://github.com/mezzonuts/RF-Co-Pilot.git
cd RF-Co-Pilot/rf-copilot
git checkout v0.3
```

---

## ▶️ Langkah 3: Jalankan rf-copilot

Buka **Command Prompt** (Win+R → `cmd`) atau **PowerShell**, lalu:

```bat
cd D:\rf-copilot\rf-copilot
npm install
npm run build
python http_server.py
```

> `npm install` hanya sekali (2-5 menit). `npm run build` compile frontend ke `dist/`. `python http_server.py` menyalakan aplikasi + vault API.

Buka browser: **http://localhost:8000**

- Tab **Agent** = Agent Workspace (chat, execution log, preview Excel/PPT/Map) — langsung jalan tanpa Python
- Tab **Vault** = Knowledge Vault (butuh Python, lihat bawah) — kalau vault kosong, drag-drop file `.md/.txt` ke panel kiri

### Dev mode (tanpa Vault API)
```bash
npm run dev
# → http://localhost:5173  (hanya Agent, Vault tidak aktif)
```

### Wrapper CLI (alternatif)
```bash
npx rf-copilot dev      # dev server
npx rf-copilot build    # build
npx rf-copilot preview  # preview dist/
```

---

## 🗂️ Vault (opsional tapi direkomendasikan)

Vault menyimpan knowledge base di `C:\Users\<kamu>\Documents\Obsidian\Dika\wiki`.
Jika folder belum ada, buat manual atau biarkan `http_server.py` yang pakai — drop file `.md/.txt` ke panel Vault kiri untuk ingest.

- `.md` / `.txt` → langsung jalan
- `.pdf` / `.docx` → butuh:
```bash
pip install pypdf python-docx
```

API vault:
- `GET /api/vault/tree` — struktur folder
- `GET /api/vault/file?path=...` — isi file + frontmatter
- `GET /api/vault/graph` — graph wikilinks
- `POST /api/vault/ingest` — ingest dari browser

---

## ✅ Verifikasi
1. Browser di `http://localhost:8000` muncul topbar **TelecomAgent — RF Co-Pilot v0.3** dengan tab Agent/Vault/Tools/Skills
2. Klik **Vault** → kiri muncul group `atomic`, `concepts`, dll. (tidak blank)
3. Jika Vault blank → hard refresh **Ctrl+F5**, cek Terminal tidak ada error `NameError`

---

## 🐛 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `npm is not recognized` | Restart PC, install ulang Node.js dari nodejs.org |
| `Cannot find module` | `npm install` lagi |
| Port 8000 dipakai | `python http_server.py` gagal → ubah `PORT = 8000` di `http_server.py` jadi 8001, atau kill proses lama |
| `pypdf not installed` | `pip install pypdf python-docx` (opsional) |
| Vault blank / Loading terus | Hard refresh Ctrl+F5, cek `curl http://localhost:8000/api/vault/tree` harus 200 |
| Halaman putih | Cek `dist/` ada `index.html` + `assets/index-*.js` — jika tidak ada jalankan `npm run build` |

## 📚 Commands

| Command | Fungsi |
|---------|--------|
| `npm install` | Install dependencies (sekali) |
| `npm run build` | Build produksi → `dist/` |
| `python http_server.py` | Jalankan app + Vault API di :8000 |
| `npm run dev` | Dev server Vite di :5173 |
| `Ctrl+C` | Stop server |

---
**Selamat mencoba! 🚀 Branch aktif: `v0.3`**
