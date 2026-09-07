# Arsitektur Knowledge Vault (Obsidian Wiki)

> **Lokasi Vault:** `C:\Users\PC\Documents\Obsidian\Dika`  
> **Referensi Kontrak:** [`AGENTS.md`](../AGENTS.md) — LLM Wiki paradigm (Karpathy)

## Ringkasan Format: Terstruktur, Bukan Narasi Bebas

Catatan di vault saat ini **SANGAT TERSTRUKTUR**, bukan teks bebas. Setiap file mengikuti kontrak ketat dari `AGENTS.md`:

### 1. Frontmatter YAML (wajib di setiap file)
```yaml
---
title: "RSRP"
type: "atomic-note"
domain: "telecommunications"
parent: ""
source: "test_telecom_report.txt"
status: "draft"          # draft → needs-review → approved → published
quality: 60
quality_flags: []
related: []
tags: ["atomic", "telecommunications"]
created: "2026-09-05"
updated: "2026-09-05"
sources: ["test_telecom_report.txt"]
---
```

### 2. Body Template (Atomic Notes)
Setiap atomic note wajib punya:
- `## Definition` — definisi 1 konsep
- `## Key Points` — bullet points (bisa berisi **tabel KPI threshold** jika ada di sumber)
- `## Formula` — rumus (atau `Not available in source.` — anti-halusinasi)
- `## Practical Application` — interpretasi, **bullet troubleshooting** vendor (Ericsson/Huawei)
- `## Related Concepts` — 2-5 `[[Wikilinks]]` untuk graph view
- `## Source` — sumber buku/halaman

**Prinsip Atomicity (Balanced — Track A):** `1 note = 1 konsep = ±150-250 kata`. Contoh saat ini: `rsrp.md`, `sinr.md`, `throughput.md`, `handover.md`, `cqi.md` — semua di `wiki/atomic/`.

### 3. Struktur Direktori (Dika/)
```
Dika/
├── AGENTS.md           # Kontrak & schema (LLM baca ini dulu)
├── raw/                # Sumber immutable (PDF/TXT/DOCX) — TIDAK PERNAH diubah LLM
│   ├── assets/
│   └── archives/       # File dipindah kesini setelah ingest sukses
├── wiki/               # Milik LLM — auto-generate
│   ├── index.md        # Katalog isi (update tiap ingest)
│   ├── log.md          # Audit log append-only
│   ├── atomic/         # Atomic notes per konsep
│   │   ├── rsrp.md, sinr.md, throughput.md ...
│   │   ├── telco/      # >50 atom → subfolder
│   │   ├── data-analysis/
│   │   └── python/
│   ├── sources/        # Ringkasan per dokumen sumber
│   ├── entities/       # Orang/Org/Tempat
│   ├── concepts/       # Topik makro multi-konsep
│   ├── synthesis/      # Analisis cross-cutting
│   └── use-cases/      # Hasil /analize (decision matrix)
```

### 4. Workflow & Quality
- **LLM owns wiki:** Human cuma kurasi `raw/`, LLM yang nulis `wiki/`.
- **Setiap operasi** wajib update `index.md` + `log.md`.
- **Quality Score 0-100:** `clarity 25 + single-concept 20 + completeness 15 + source 15 + example 10 + relations 10 + practical 5 - duplicate`. Saat ini sampel `rsrp.md` skor **60/100** (masih `draft`, `Practical Application` belum ada tabel threshold).
- **Anti-halusinasi:** Jika threshold/formula tidak ada di sumber → tulis `Not available in source.`
- **Wikilinks graph:** `RSRP --related--> RSRQ --used-by--> LTE Coverage --analyzed-by--> Drive Test`.

## Diagram Visual
Lihat: [`obsidian-vault-architecture.html`](./obsidian-vault-architecture.html) — SVG dark-theme interaktif.

## Kualitas Saat Ini (Observasi)
- Format **sudah terstruktur** sesuai `Atomic.md` (ada `tags`, `domain`, `related`).
- Isi masih **template/generic** — contoh `rsrp.md` hanya `Key Points: Parameter Utama - RSRP indikator kekuatan sinyal`, belum ada tabel `RSRP ≥-80 Excellent, -80~-90 Good...` atau bullet `Jika RSRP <-110 → cek tilt/azimuth`.
- **Saran tune-up:** Jika sumber asli (OSS export / drive test) punya tabel KPI, LLM akan ekstrak jadi tabel markdown + tag vendor (`#ericsson`, `#huawei`) otomatis saat ingest berikutnya.

---
*Dibuat oleh Hermes Agent — 2026-09-07*
