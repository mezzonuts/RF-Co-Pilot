# Architecture RF-Copilot v0.3

RF-Copilot adalah aplikasi asisten teknis untuk RF/Telecom Engineer yang dibangun menggunakan arsitektur **Tauri + React + Python Sidecar**. Aplikasi ini difokuskan pada analisis data Drive Test, KPI OSS, dan optimasi jaringan (Tilt, PCI, Neighbor).

## Diagram Arsitektur
Lihat diagram visual interaktif di: [rf-copilot-architecture.html](./rf-copilot-architecture.html)

## Komponen Utama

### 1. Frontend Layer (React + Vite)
- **Framework**: React v18 dengan TypeScript.
- **Styling**: Tailwind CSS untuk UI yang clean dan responsif.
- **Icons**: Remix Icon CDN.
- **Komponen Inti**: `AgentWorkspace.tsx` yang menangani logika chat, upload file, dan pratinjau data (Excel/PPTX/Map).

### 2. Backend Layer (Python Sidecar)
- **Server**: `http_server.py` menjalankan HTTP server lokal di port 8000.
- **Fungsi**:
    - **Parsing**: Menggunakan `openpyxl` untuk membaca file Excel (termasuk 13-sheet Power Query) dan CSV.
    - **Export**: Menggunakan `python-pptx` dan `openpyxl` untuk generate laporan PowerPoint dan Excel secara dinamis.
    - **Security**: Mendeteksi API Key 9Router secara otomatis dari database SQLite lokal tanpa mengeksposnya ke frontend.

### 3. Data & Memory Layer
- **Persistent Memory**: `rf_memory.json` menyimpan riwayat proyek, sesi chat, dan profil preferensi user (bahasa, topik favorit).
- **Spatial Data**: PostGIS digunakan untuk analisis geospasial data drive test.
- **Knowledge Base**: Terintegrasi dengan Obsidian Vault (Markdown wiki) di `C:/Users/PC/Documents/Obsidian/Dika/wiki`.

### 4. AI Engine (9Router Proxy)
- Menggunakan 9Router sebagai gateway LLM lokal (port 20128).
- Model fallback: `cx/gpt-5.4-mini` -> `cx/gpt-5.5` -> `cx/gpt-5.6`.
- **Self-Improvement**: AI membaca memori user dari sesi sebelumnya untuk menyesuaikan nada dan detail teknis jawaban.

## Alur Data
1. **Input**: User mengunggah file (XLSX/CSV) via UI.
2. **Parsing**: Python Sidecar memproses file dan mengirimkan preview (header/rows) kembali ke UI.
3. **Reasoning**: UI mengirimkan konteks data + prompt ke 9Router.
4. **Memory**: Hasil analisis diarsipkan ke `rf_memory.json` saat user menekan "New Analysis".
5. **Output**: User dapat mengekspor hasil ke PPTX atau Excel permanen.

---
*Dokumentasi ini dibuat otomatis oleh Hermes Agent.*
