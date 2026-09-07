"""
vault_engine/indexer.py — FastEmbed ONNX + LanceDB local vector store

Fallback: jika lancedb/fastembed belum ter-install, indexer jadi no-op
dan retriever otomatis hanya pakai FTS5 + graph (tetap grounded).
Install untuk vector penuh:
  pip install lancedb fastembed
"""
from __future__ import annotations
from pathlib import Path
import hashlib, json, os

LANCEDB_DIR_DEFAULT = Path(__file__).parent.parent / "db" / "lancedb_data"
TABLE_NAME = "vault_vectors"

def _hash_notes(notes: list[dict]) -> str:
    h = hashlib.sha256()
    for n in sorted(notes, key=lambda x: x["path"]):
        h.update(n["path"].encode())
        h.update((n.get("content","")[:500]).encode())
    return h.hexdigest()[:12]

def build_vector_index(
    notes: list[dict],
    db_path: Path | str | None = None,
    model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
    force: bool = False,
) -> dict:
    """
    Build / refresh LanceDB table dari atomic notes.
    notes: list dari parser.load_atomic_notes()
    returns: {"ok": bool, "count": int, "reason": str}
    """
    if not notes:
        return {"ok": False, "count": 0, "reason": "no notes"}
    try:
        import lancedb  # type: ignore
        from fastembed import TextEmbedding  # type: ignore
    except ImportError as e:
        return {"ok": False, "count": 0, "reason": f"vector deps missing: {e} — pip install lancedb fastembed"}

    db_path = Path(db_path) if db_path else LANCEDB_DIR_DEFAULT
    db_path.mkdir(parents=True, exist_ok=True)
    try:
        db = lancedb.connect(str(db_path))
    except Exception as e:
        return {"ok": False, "count": 0, "reason": f"lancedb connect failed: {e}"}

    # cache check via manifest
    manifest = db_path / "_manifest.json"
    cur_hash = _hash_notes(notes)
    if not force and manifest.exists():
        try:
            prev = json.loads(manifest.read_text(encoding="utf-8"))
            if prev.get("hash") == cur_hash and TABLE_NAME in db.table_names():
                return {"ok": True, "count": prev.get("count", 0), "reason": "cached"}
        except Exception:
            pass

    # embed
    try:
        emb_model = TextEmbedding(model_name=model_name)
    except Exception as e:
        return {"ok": False, "count": 0, "reason": f"FastEmbed load failed ({model_name}): {e}"}

    texts = []
    metas = []
    for n in notes:
        meta = n.get("metadata") or {}
        title = meta.get("title") or Path(n["path"]).stem
        # compact doc for embedding: title + key points snippet
        doc = f"{title}. {(n.get('content','')[:800])}"
        texts.append(doc)
        metas.append({"path": n["path"], "title": title, "tags": ",".join(meta.get("tags", []) or [])})

    try:
        vectors = list(emb_model.embed(texts))  # list of np arrays
    except Exception as e:
        return {"ok": False, "count": 0, "reason": f"embed failed: {e}"}

    # prepare rows
    import pyarrow as pa  # lancedb dependency
    rows = []
    for meta, vec in zip(metas, vectors):
        rows.append({"title": meta["title"], "path": meta["path"], "tags": meta["tags"], "vector": vec, "text": texts[metas.index(meta)][:1200]})

    # create / overwrite table
    try:
        if TABLE_NAME in db.table_names():
            db.drop_table(TABLE_NAME)
        tbl = db.create_table(TABLE_NAME, data=rows)
        # manifest
        manifest.write_text(json.dumps({"hash": cur_hash, "count": len(rows), "model": model_name}), encoding="utf-8")
        return {"ok": True, "count": len(rows), "reason": "built"}
    except Exception as e:
        return {"ok": False, "count": 0, "reason": f"lancedb write failed: {e}"}


def vector_search(query: str, db_path: Path | str | None = None, top_k: int = 8) -> list[dict]:
    """Semantic search via LanceDB+FastEmbed. Returns [] jika deps/db missing."""
    try:
        import lancedb
        from fastembed import TextEmbedding
    except ImportError:
        return []
    db_path = Path(db_path) if db_path else LANCEDB_DIR_DEFAULT
    if not (db_path / "_manifest.json").exists():
        return []
    try:
        db = lancedb.connect(str(db_path))
        if TABLE_NAME not in db.table_names():
            return []
        tbl = db.open_table(TABLE_NAME)
        emb_model = TextEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")
        qvec = list(emb_model.embed([query]))[0]
        res = tbl.search(qvec).limit(top_k).to_list()
        # normalize to {title, path, score, text}
        out = []
        for r in res:
            out.append({
                "title": r.get("title",""),
                "path": r.get("path",""),
                "score": float(r.get("_distance", 1.0)),
                "text": r.get("text","")[:600],
                "source": "vector",
            })
        return out
    except Exception:
        return []
