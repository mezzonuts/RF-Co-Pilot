# RF Co-Pilot Smart Fallback — Vault-First, Human, Memory-Aware Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Perbaiki chat fallback agar tidak template: `halo=halo biasa`, `Apa itu RSRP=definisi`, vault-first (54 notes 3GPP) + web-second, summarize context, human tone — sambil BYOK live (9Router/Google) tetap jalan sebagai jalur utama.

**Architecture:** Live LLM tetap prioritas (`doFetchLLM` → `isLive:true`). Jika live gagal / key kosong → fallback smart (30-40 baris): intent scorer ringan + vault search in-memory + summary builder + humanizer. Tidak ada LLM offline berat, semua deterministik agar BYOK tidak terganggu.

**Tech Stack:** Node/Express `server.ts`, React `src/App.tsx` + `src/components/AgentWorkspace.tsx`, vault in-memory `vaultNotes[]` (loadVaultBasicKnowledge), Vite build, curl validation.

---

## 1. Current Context / Assumptions

- `server.ts` ~1580 baris: `app.post('/api/chat')` ambil `messages[]`, `provider/model/baseUrl/apiKey`, auto-detect `providerLower` dari `baseUrl`, resolve `effectiveApiKey`, coba `doFetchLLM` (Google SDK + OpenAI-compatible `/chat/completions`), kalau sukses return `isLive:true`. Kalau gagal → fallback domain engine dengan `if/else if` regex berurutan.
- Bug sudah di-fix di sesi ini: `AgentWorkspace.tsx` + `App.tsx` sekarang kirim `baseUrl` (LLMConfig `baseUrl?:string`), `onProviderChange('9router')` set `http://localhost:20128/v1`. Build sukses `435.85kB`, server `vault_cached=54`, `[vault] basic knowledge loaded: 47 new — total 54`.
- Bug fallback yang masih ada (ter-repro via curl): `isDriveTest = /rsrp|sinr/` match kata tunggal → `Apa itu RSRP?` masuk audit `Hasil Audit Drive Test Cluster C1` bukan definisi. Greeting `halo` selalu keluar blok panjang `Provider: Google... Kenapa model ini dipakai 1.2.3.` + banner `Skill aktif: [pandas]...` di content → terasa template.
- Vault: 5 pilar `01_RAN_L2_L3 ... 05_OAM_PM_KPIS`, 24 specs/28 wrappers + dataset_training, manifest `v1.0-2026-09-08`, dimuat via `loadVaultBasicKnowledge()` ke `vaultNotes[]` (in-memory). Endpoint `/api/vault/search` & `/api/vault/stats` sudah ada tapi fallback tidak memanggil vault sama sekali (hanya `skillContext` dari `selectRelevantSkills`).
- 9Router: combo `my-combo` 36 models, `apiKeys.key = sk-48e...9658` (masked 35 char) → `stream:false` 401, tapi server proxy internal masih bisa live jika key valid. BYOK goal: `Test Connection` kirim `baseUrl+apiKey` → `✓ Connected — 9router (my-combo) [Live API]`.
- User request: (1) memory: `halo` cukup halo biasa, jangan ulang template, simpan history; (2) reasoning ringan ganti regex hardcode; (3) vault-first, web-second niche RF; (4) vault bisa summarize cluster/history dan berulang saat knowledge baru + fallback harus bisa summarize bukan template; (5) humanizer.

## 2. Mengapa Langkah Pertama Offline & Apa Itu 30-40 Baris

**Mengapa offline dulu (tanpa LLM eksternal) — tapi BYOK tetap jalan:**
- Offline = deterministik & gratis: tidak tergantung internet/token, latensi <100ms, data DT/KPI tidak keluar jaringan, mudah di-debug. Jadi demo & vault-first bisa jalan bahkan sebelum key valid.
- Bukan berarti mematikan BYOK. Arsitektur `live dulu → fallback` tetap: jika `effectiveApiKey.length>5` dan `doFetchLLM` sukses → `isLive:true` langsung return (human by LLM). Fallback hanya safety net saat key kosong/401. Fix `baseUrl` kemarin sudah buka jalur BYOK, jadi offline + live coexist.
- Trade-off yang user setujui: offline demo *tidak perlu* dipertahankan sebagai mode terpisah; BYOK live adalah jalur utama, fallback smart hanya penolong saat offline/401.

**Apa itu 30-40 baris patch:**
- Bukan bloat, tapi modul kecil: `detectIntent()` ~8 baris, `searchVault()` ~10 baris, `buildVaultSummary()` ~8 baris, `handleEdu()` ~10 baris, `humanize()` ~4 baris. Total 30-40 baris jika ditulis terpisah dan bisa di-test per fungsi. Patch kemarin yang ganti `isEdu` prioritas sudah 20 baris — menambah vault search + summarize akan di kisaran itu.

## 3. Proposed Approach

1. **Live-first:** Jangan ubah `doFetchLLM`. Fallback hanya dieksekusi `if (!liveResult)`.
2. **Memory-aware:** Fallback baca `messages.slice(-8)` bukan cuma `lastUserMsg`. `halo` 1 kata + history kosong → jawab 1 kalimat. `halo` di tengah percakapan → jawab konteks.
3. **Intent scorer:** Enum `GREETING | EDU | BENCHMARK | TILT | PCI | HANDOVER | DRIVETEST_TASK | WORST | UNKNOWN` dengan skor keyword, `EDU` menang atas `DRIVETEST` jika ada `apa itu/jelaskan`.
4. **Vault-first:** `searchVault(query)` pakai `vaultNotes` in-memory (sudah ada), filter `title/content` case-insensitive, skor, ambil top 2-3 snippet ±300 char. Inject ke `skillContext` / jawaban edukasi dengan sitasi `TS 36.214 Sec X` atau `vault: <path>`.
5. **Web-second:** Jika `vaultHits.length==0` dan intent EDU/UNKNOWN → `fetch` web (opsional, pakai `web_search` tool atau simple `fetch` ke search API; jika tidak ada key → skip dan jawab generik + saran tambah vault).
6. **Summarize:** `summarizeCluster(messages, vaultHits)` → gabung `vault graph 54 nodes` ringkas + 5 pesan terakhir → 2-3 kalimat to-the-point. Dipanggil untuk intent `ringkas/summarize/context` dan untuk memperkaya jawaban EDU.
7. **Humanizer:** Hapus blok `Provider: Google... Kenapa dipakai` dari greeting fallback; pindah `Skill aktif:` dari `content` ke `meta.skillsApplied` saja (UI sudah render badge). Jawaban 1-2 paragraf, bahasa Indonesia santai, akhiri 1 follow-up question, tanpa `###`/`**`/`$$`.

## 4. Step-by-Step Plan (Bite-Sized, 2-5 menit per task)

### Task 1: Repro & Baseline (validasi bug sekarang)
**Files:** — (read-only)
**Step 1:** Jalankan server `PORT=3000 node dist/server.cjs` (cek `vault_cached=54`).
**Step 2:** `curl /api/chat` 4 case: `halo`, `Apa itu RSRP?`, `jelaskan RSRP dan SINR`, `apa itu PCI` → catat masih `Fallback` + audit ngaco.
**Step 3:** Simpan output sebagai expected-before di plan. **Commit:** tidak perlu.

### Task 2: Memory — halo = halo aja
**Files:** Modify `server.ts:1221-1240` (handler `/api/chat`).
**Step 1: Write failing test (curl):** `halo` → harus `<80 char` dan tidak mengandung `Kenapa model ini dipakai`.
**Step 2: Implement:** Ganti `const lastUserMsg = ...slice(-1)` jadi `const history = messages.filter(m=>m.role==='user'||m.role==='assistant').slice(-8)`; `lastUserMsg` tetap last, tapi greeting handler cek `history.length<=2` → `reply = Halo Andika! 👋 Siap bantu — mau tanya RSRP/SINR atau upload DT log?` (1 kalimat).
**Step 3:** `curl halo` → pass. **Step 4:** Build `npm run build`. **Commit:** `fix(chat): memory-aware greeting, halo = 1 kalimat human`

### Task 3: Reasoning Ringan — Intent Scorer (ganti regex hardcode)
**Files:** Modify `server.ts:1388-1410`.
**Step 1:** Tulis `enum Intent { GREETING, EDU, BENCHMARK, TILT, PCI, HANDOVER, DRIVETEST, WORST, UNKNOWN }` + `function detectIntent(msg:string, history:any[]):Intent` dengan prioritas `GREETING > EDU > BENCHMARK > TILT > PCI > HANDOVER > DRIVETEST > WORST`.
**Step 2:** EDU pattern: `/apa itu|apa arti|definisi|jelaskan|uraikan|tolong jelaskan|bagaimana|mengapa|kenapa|fungsi/i`; DRIVETEST dipersempit: `/drive\s*test|\bdt\b|throughput|cluster|\.csv|\blog\b|worst\s*spot|hitung.*kpi|analisa.*log/i` (HAPUS `\brsrp\b|\bsinr\b` dan `\bkpi\b` lone).
**Step 3:** `switch(detectIntent(...))` ganti `if/else if` lama. **Test:** `Apa itu RSRP` → EDU, `analisa RSRP cluster C1` → DRIVETEST. **Commit:** `feat(chat): intent scorer EDU > DRIVETEST, human routing`

### Task 4: Vault-First Search (in-memory)
**Files:** Modify `server.ts` (tambah helper `searchVault(query:string, limit=3)`).
**Step 1:** Implement baca `vaultNotes` global (yang sudah di-load), bukan `fs.readdir` tiap request. Skor: `title match +2, content match +1`, filter `q.length>=3`, potong snippet 300 char, sertakan `path` & `category`.
**Step 2:** Di handler, sebelum fallback: `const vaultHits = searchVault(lastUserMsg, 3)`. Jika intent EDU → inject sitasi: `Rujukan vault: ${hits.map(h=>h.path).join(', ')}` atau `TS 36.214 Sec 5.1.1` jika ada.
**Step 3:** Test: `curl /api/vault/search?q=RSRP` harus hit, `Apa itu RSRP` → balasan mengandung `vault:` atau `TS`. **Commit:** `feat(vault): vault-first search in fallback, inject sitasi 3GPP`

### Task 5: Web-Second (opsional, hanya jika vault miss)
**Files:** Modify `server.ts` (tambah `async function webFallback(query)`).
**Step 1:** Jika `vaultHits.length==0 && intent EDU/UNKNOWN` → coba `fetch` ke search (pakai `web_search` jika tersedia, else skip). Timeout 2s, jika gagal → jangan error, fallback ke generik `Belum ada di vault — coba tambah report lapangan atau tanya spesifik`.
**Step 2:** Test: `Apa itu 6G RIS` (tidak ada di vault) → harus `web:` atau pesan `belum ada di vault`. **Commit:** `feat(chat): web-second fallback jika vault miss`

### Task 6: Summary Context — Vault Graph + History
**Files:** Modify `server.ts` (tambah `buildSummary(history, vaultHits)`).
**Step 1:** Jika user ketik `/ringkas|summary|buatkan ringkasan|context cluster/` → kumpulkan `vaultNotes` count per kategori (5 pilar) + 5 pesan terakhir → ringkas: `Vault 54 notes (RAN 15, CORE 5...) — percakapan: halal RSRP, tanya SINR → ringkasan 2 kalimat`.
**Step 2:** Fallback juga bisa summarize tanpa LLM: format `Ringkasan konteks: ...` to-the-point, berulang otomatis saat `vaultNotes` bertambah (karena baca live in-memory).
**Step 3:** Test: `ringkas konteks cluster C1` → harus keluar `Ringkasan`. **Commit:** `feat(chat): summarize vault+history, reusable untuk experience knowledge`

### Task 7: Humanizer — Hapus Template dari Content
**Files:** Modify `server.ts:1518-1553` (finalReply) + `src/App.tsx`/`AgentWorkspace.tsx` (UI badge).
**Step 1:** Hapus `Skill aktif: [...]` dari `finalReply` content; hanya kirim di `meta.skillsApplied` & `skillContextBlock`. Hapus blok `Provider: Google AI Studio... Kenapa dipakai 1.2.3.` dari greeting; sediakan hanya jika user eksplisit tanya `model apa dipakai?`.
**Step 2:** Batasi `sanitizePlainText` tetap, tapi jawaban fallback maksimal 2 paragraf + 1 follow-up `Mau saya jelaskan SINR juga?`.
**Step 3:** Test: semua curl EDU → tidak ada `Skill aktif:` di body, hanya di `meta`. **Commit:** `style(chat): humanize fallback, pindah skill badge ke meta`

### Task 8: BYOK Live Path — Pastikan Tetap Jalan (verifikasi, bukan offline)
**Files:** Verify `server.ts:1240-1260` + `src/App.tsx:125-145` + `AgentWorkspace.tsx:51-55,410-425` (sudah di-patch baseUrl).
**Step 1:** Test `Test Connection` dengan `provider:9router, baseUrl:http://localhost:20128/v1, apiKey:<valid>` → harus `isLive:true, provider:9router`. Jika masih 401 → instruk user isi key valid dari dashboard 9Router (bukan `sk-48e...` masked di sqlite).
**Step 2:** `halo` via live → harus `isLive:true` dan human (bukan template). **Commit:** `chore(byok): verify baseUrl wiring, live-first intact` (jika perlu tweak).

### Task 9: Integration Test & Build
**Files:** —
**Step 1:** `npm run build` → `dist/server.cjs 74k` OK, `tsc --noEmit`.
**Step 2:** Full curl suite 7 case: `halo`, `Apa itu RSRP`, `apa itu SINR`, `apa itu PCI`, `buat report benchmark`, `tilt`, `ringkas konteks` → semua pass human + vault sitasi.
**Step 3:** `curl /api/vault/stats` → 54, `/api/vault/search?q=5GMM` → hit. **Commit:** `test: integration fallback smart suite pass`

### Task 10: Docs & Vault Experience Knowledge Prep
**Files:** `vault/README.md`, `.hermes/plans/*`, `D:/AI NOTE/AI Agent For telco/logs/coding/2026-09-14_smart-fallback.md`
**Step 1:** Update `vault/README.md`: jelaskan vault sebagai basic + experience knowledge (report lapangan future).
**Step 2:** Tulis log coding + commit `docs: smart fallback vault-first plan implemented`. **Push** `feat/v0.4-vault-grounded-loop`.

## 5. Files Likely to Change
- `server.ts` (utama: intent, vault search, summary, humanizer, handler)
- `src/components/AgentWorkspace.tsx` (LLMConfig baseUrl sudah, hanya UI badge)
- `src/App.tsx` (doTestLLM baseUrl sudah, mungkin hilangkan skill banner di content)
- `vault/manifest.json` (update `experienceKnowledge:true` saat tambah report lapangan nanti)
- `vault/README.md` (dokumentasi vault-first)

## 6. Tests / Validation
- `curl /api/health` → `{"status":"ok"}`
- `curl /api/vault/stats` → `vault_cached=54`
- `curl /api/chat {halo}` → 1 kalimat, `isLive:false` jika no key, `isLive:true` jika BYOK valid, tidak ada `Kenapa model...`
- `curl /api/chat {Apa itu RSRP}` → `Reference Signal Received Power` + `TS 36.214` + `Excellent >= -80`, tidak ada `Hasil Audit Cluster C1`
- `curl /api/chat {Apa itu RSRP? jelaskan SINR juga}` → definisi keduanya
- `curl /api/chat {ringkas konteks}` → ringkasan vault+history 2-3 kalimat
- `vaultHits` inject: cek `skillContextBlock` mengandung `vault:`
- BYOK: `curl /api/chat {say hello, provider:9router, baseUrl:..., apiKey:<valid>}` → `isLive:true, provider:9router`

## 7. Risks, Tradeoffs, Open Questions
- **Risk:** Intent scorer masih keyword-based → bisa misclassify `RSRP bagus tapi throughput jelek` (seharusnya DRIVETEST bukan EDU). Mitigasi: EDU hanya jika ada `apa itu/jelaskan`, otherwise fallback ke DRIVETEST/human.
- **Risk:** `vaultNotes` in-memory belum ada ranking → snippet kurang relevan. Mitigasi: skor title>content, limit 3, potong 300 char.
- **Risk:** Web-second tanpa API key → skip gracefully, jangan bikin fallback error.
- **Tradeoff:** Offline deterministik vs live LLM human — live human lebih baik, tapi fallback smart jamin tetap human saat offline. BYOK live tetap prioritas, fallback tidak ganggu live path.
- **Open Q:** Sumber web search mana? (opsi: `web_search` tool Hermes, atau fetch biasa). Perlu key? Untuk MVP bisa skip web, cukup vault + generik.
- **Open Q:** Experience knowledge (report lapangan) format md seperti apa? Rencana: `vault/experience/YYYY-MM-DD_<cluster>.md` dengan frontmatter `category: experience, tags: [cluster, tilt, pci]`, auto-index via `loadVaultBasicKnowledge()` → summary otomatis ikut.

---
*Plan saved: `.hermes/plans/2026-09-14_041000-rf-smart-fallback-vault-first.md` — ready to execute via subagent-driven-development per task.*
