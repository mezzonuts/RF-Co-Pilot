"""database.py — stub akses PostGIS & Qdrant.

- PostGIS: join DT points dengan cell_master (spatial)
- Qdrant: RAG vault untuk 3GPP specs & SKILL docs
"""

def query_postgis(sql: str):
    """Eksekusi query PostGIS (via psycopg).""" 
    raise NotImplementedError("Belum diimplementasi — stub")

def query_qdrant(collection: str, query: str, top_k: int = 5):
    """Semantic search di Qdrant vault.""" 
    raise NotImplementedError("Belum diimplementasi — stub")
