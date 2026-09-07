"""
Modul **vault_engine** – v0.4 – menambah manajemen pengetahuan dari Obsidian Vault.

## Fitur Utama
- **Front‑matter parser** (`parser.py`): baca YAML pada setiap catatan atomic, ekstrak `domain`, `quality`, `tags`, dan `[[Wikilinks]]`.
- **Graph builder** (`graph.py`): buat jaringan `networkx` dari semua `[[Wikilinks]]` (1‑hop) untuk ekspansi pengetahuan.
- **Vector indexer** (`indexer.py`): gunakan **FastEmbed ONNX** (model `sentence-transformers/all-MiniLM-L6-v2`) → **LanceDB** (file‑based) untuk pencarian semantik.
- **Hybrid retriever** (`retriever.py`): gabungkan skor **BM25** (SQLite `FTS5`) + **vektor** (LanceDB) + **graph‑expansion** (node‑neighbor) → ranking final.

## Cara Pakai (internal)
```python
from sidecar.vault_engine.parser import load_atomic_notes
from sidecar.vault_engine.graph import build_graph
from sidecar.vault_engine.indexer import build_vector_index
from sidecar.vault_engine.retriever import hybrid_retrieve

notes = load_atomic_notes('C:/Users/PC/Documents/Obsidian/Dika/wiki/atomic')
G = build_graph(notes)
build_vector_index(notes, db_path='sidecar/db/lancedb_data')
results = hybrid_retrieve(query='threshold RSRP -80 dBm', top_k=5)
```

- **Output**: list dict `{'path','score','type'}` yang siap dipakai di **prompt_builder** untuk injection konteks.
- **Cache**: indeks vektor di‑update otomatis bila folder `wiki/atomic/` berubah (watchdog + timestamp).
"""
