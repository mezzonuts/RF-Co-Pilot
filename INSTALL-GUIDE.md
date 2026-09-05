# 🚀 Panduan Instalasi rf-copilot — untuk PEMULA (tanpa pengalaman IT)

---

## 📋 Apa yang Kamu Butuhkan

1. **Computer** (Windows/Mac/Linux)
2. **Internet** (untuk download)
3. **Waktu** (~5 menit)
4. **Kesabaran** 😊

---

## 📥 Langkah 1: Install Node.js (5 menit)

**Node.js** adalah platform yang diperlukan untuk menjalankan rf-copilot.

### A. Download Node.js

1. Buka browser (Chrome, Firefox, Edge, atau Safari)
2. Kunjungi: **https://nodejs.org**
3. Klik tombol **"Download Node.js (LTS)"**  
   (LTS = versi yang paling stabil)

   ![Download button di nodejs.org](https://nodejs.org/static/images/download-buttons.png)

### B. Install Node.js

1. Buka file yang baru saja didownload (`node-v20.x.x-x64.msi` di Windows)
2. Klik **Next** terus sampai selesai
3. Pastikan centang **"Automatically install necessary tools"** (jika muncul)
4. Klik **Install**

### C. Restart Computer

Setelah install selesai:
- **Restart computer** kamu (penting!)
- Ini agar perubahan sistem menjadi aktif

---

## 📦 Langkah 2: Install rf-copilot (3 menit)

### A. Download rf-copilot

1. Buka browser
2. Kunjungi: **https://github.com/mezzonuts/RF-Co-Pilot**
3. Klik tombol hijau **"Code"** → pilih **"Download ZIP"**

   ![Download ZIP](https://docs.github.com/assets/cb-12608/images/help/repository/download-repository-download-zip-button.png)

### B. Ekstrak File

1. Cari file `RF-Co-Pilot-main.zip` di folder **Downloads**
2. Klik kanan → **Extract All** (Windows) atau **Extract Here** (Mac/Linux)

### C. Copy ke Folder yang Mudah Dijangkau

1. Buka folder yang baru diekstrak (`RF-Co-Pilot-main`)
2. Copy **seluruh isi folder** ini:
   ```
   📁 RF-Co-Pilot-main/
   ├── 📄 README.md
   ├── 📄 package.json
   ├── 📁 bin/
   ├── 📁 src/
   ├── 📁 dist/
   └── 📄 index.html
   ```

3. Paste ke folder yang mudah, misalnya:
   ```
   C:\Users\[NamaKamu]\Desktop\rf-copilot
   ```
   atau
   ```
   D:\rf-copilot
   ```

### D. Buka Terminal (Command Prompt)

#### Windows:
1. Tekan tombol **Windows** + **R**
2. Ketik: `cmd` → tekan **Enter**
3. Atau: Klik **Start** → ketik "Command Prompt" → buka

#### Mac:
1. Buka **Finder** → **Applications** → **Utilities** → **Terminal**

#### Linux:
1. Tekan **Ctrl** + **Alt** + **T**

---

## ▶️ Langkah 3: Jalankan rf-copilot (2 menit)

### A. Masuk ke Folder rf-copilot

Di terminal/komando prompt, ketik:
```bash
cd C:\Users\[NamaKamu]\Desktop\rf-copilot
```
*(Ganti `[NamaKamu]` dengan nama user kamu)*

Atau jika kamu letakkan di `D:\rf-copilot`:
```bash
cd D:\rf-copilot
```

### B. Install Semua Dependencies

Ketik perintah ini dan tekan **Enter**:
```bash
npm install
```

⏳ Tunggu sampai muncul pesan:
```
added XXX packages in XXs
```
*(biasanya 2-5 menit, tergantung internet)*

### C. Jalankan Aplikasi

Ketik:
```bash
npm run dev
```

✅ Jika berhasil, kamu akan melihat:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🌐 Langkah 4: Buka rf-copilot di Browser

1. Buka browser (Chrome/Firefox/Edge)
2. Ketik di address bar: `http://localhost:5173`
3. Tekan **Enter**
4. rf-copilot sudah running! 🎉

---

## ✅ Verifikasi Instalasi

### Cek apakah Node.js terinstall:

```bash
node --version
# Harus muncul: v20.x.x (atau versi lebih baru)
```

```bash
npm --version
# Harus muncul: 9.x.x atau 10.x.x
```

### Cek apakah rf-copilot berjalan:

1. Browser terbuka di `http://localhost:5173`
2. Halaman menampilkan judul "rf-copilot"
3. Ada tombol-tombol untuk upload file

---

## 🐛 Troubleshooting (Jika Ada Masalah)

### ❌ Error: "npm is not recognized"

**Solusi:** Node.js belum terinstall dengan benar
1. Restart computer
2. Install ulang Node.js dari https://nodejs.org
3. Pastikan centang "Automatically install necessary tools"

### ❌ Error: "Cannot find module..."

**Solusi:** Install dependencies lagi
```bash
npm install
```

### ❌ Port 5173 sudah digunakan

**Solusi:** Ubah port
```bash
npm run dev -- --port 3000
```
Kemudian buka: `http://localhost:3000`

### ❌ Slow download saat npm install

**Solusi:** Coba lagi (kemungkinan masalah internet sesaat)

### ❌ Halaman blank/tidak muncul

**Solusi:** 
1. Refresh browser (**F5** atau **Ctrl+R**)
2. Coba browser lain (Chrome/Firefox/Edge)
3. Cek di Terminal apakah ada error merah

---

## 📚 Panduan Singkat Commands

| Command | Fungsi |
|---------|--------|
| `npm install` | Install semua dependensi (jalankan sekali) |
| `npm run dev` | Jalankan aplikasi (dev server) |
| `npm run build` | Build versi produksi |
| `npm run preview` | Preview hasil build |
| `Ctrl + C` | Stop aplikasi yang sedang jalan |

---

## 🎯 Langkah Selanjutnya

1. ✅ Upload file DT logs (CSV) dari provider telekom
2. ✅ Lihat Hasil KPI di dashboard
3. ✅ Export laporan Excel/PDF
4. ✅ Cari cell dengan KPI serupa (Qdrant search)

---

## 🆘 Butuh Bantuan?

Jika masih ada masalah:
1. Baca error message dengan cermat
2. Copy dan cari di Google
3. Cek folder `logs/coding/` untuk dokumentasi teknis

---

**Selamat mencoba! 🚀**
