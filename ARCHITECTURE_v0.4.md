# TECHNICAL SPECIFICATION: RF-Copilot v0.4
## Target Branch: `feat/v0.4-vault-grounded-loop`
## Focus: Vault-First Grounding, Hybrid Retrieval (Vector + Graph), Clarification Loop & Self-Improvement Pipeline

---

## 1. Executive Summary & Objective

Pada arsitektur v0.3, Python Sidecar memanggil LLM (9Router Proxy `:20128`) secara langsung tanpa filter pengetahuan domain, sehingga LLM rentan berhalusinasi dan memberikan rekomendasi RF generik. 

Pada **v0.4**, sistem diubah menjadi **Vault-First Architecture**:
1. **Obsidian Vault sebagai Single Source of Truth**: Mengadopsi *Karpathy LLM Wiki Paradigm* (`wiki/atomic/`, `wiki/synthesis/`, `raw/`).
2. **Hybrid Knowledge Retrieval**: Kombinasi SQLite FTS5 (BM25 keyword telco) + LanceDB (Vector Semantic via FastEmbed ONNX) + 1-Hop `[[Wikilinks]]` Graph Expansion.
3. **Dual-Mode Engine**: 
   - **Mode A (Batch DT Analysis)**: Ekstraksi KPI CSV/XLSX ➔ Threshold Matching ke Vault ➔ Grounded RCA & Rekomendasi.
   - **Mode B (Interactive Chat)**: Q&A engineer dengan *Grounding Contract* ketat.
4. **Agentic Judgement & Clarification Loop**: AI memvalidasi kelengkapan data sebelum memanggil LLM. Jika ambigu/kurang, AI bertanya balik ke user alih-alih berasumsi.
5. **Self-Improvement Loop**: Jika ada SOP/parameter yang belum terdaftar di Vault, agent mencatat gap ke `wiki/log.md` dan membuat draf catatan baru di `raw/drafts/` untuk di-review engineer (*Human-in-the-Loop*).

---

## 2. Directory Structure Updates

```text
sidecar/
├── http_server.py                 # Endpoint FastAPI/HTTP Server
├── parsers/                       # Parser DT CSV/XLSX (openpyxl, pandas/polars)
├── export/                        # Generator PPTX & XLSX
├── vault_engine/                  # [BARU - v0.4] Modul Manajemen Vault
│   ├── __init__.py
│   ├── parser.py                  # Parse frontmatter YAML, Markdown heading, [[Wikilinks]]
│   ├── graph.py                   # NetworkX in-memory representation untuk 1-hop links
│   ├── indexer.py                 # FastEmbed + LanceDB local vector database
│   └── retriever.py               # Hybrid Ranker (FTS5 BM25 + Vector + Graph Expander)
├── agent/                         # [BARU - v0.4] Modul Agentic Loop & LLM
│   ├── __init__.py
│   ├── router_client.py           # 9Router OpenAI-compatible client (:20128)
│   ├── prompt_builder.py          # Grounded Context Injector & JSON Schema Enforcer
│   ├── sufficiency_gate.py        # Validasi kelengkapan data & Clarification generator
│   └── self_improvement.py       # Gap catcher, log.md appender, raw/drafts generator
└── db/
    ├── lancedb_data/              # File embedded LanceDB (in-process, gitignored)
    └── rf_copilot.db              # SQLite (FTS5 virtual table + local memory)
```

---

## 3. Arsitektur Diagram v0.4
Diagram arsitektur visual interaktif untuk v0.4 tersedia di:
- [`rf-copilot-v0.4-architecture.html`](./rf-copilot-v0.4-architecture.html) (Arsitektur v0.4 Vault-First & Hybrid Retrieval)
- Arsitektur v0.3 lama tetap dipertahankan di: [`rf-copilot-architecture.html`](./rf-copilot-architecture.html)
