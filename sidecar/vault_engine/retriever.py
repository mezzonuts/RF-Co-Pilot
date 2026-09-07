"""
vault_engine/retriever.py — Hybrid Ranker (FTS5 BM25 + Vector + Graph Expansion)

Menggabungkan 3 sinyal menjadi ranking final via Reciprocal Rank Fusion (RRF).
Tetap grounded meski LanceDB belum ter-install (fallback FTS5+Graph).
"""
from __future__ import annotations
import re
import sqlite3
from pathlib import Path
from typing import List, Dict

try:
    from .indexer import vector_search
    from .graph import one_hop_expand
except ImportError:
    vector_search = lambda *a, **k: []  # type: ignore
    one_hop_expand = lambda *a, **k: []  # type: ignore


def _fts5_search(query: str, notes: List[dict], top_k: int = 8) -> List[dict]:
    """BM25 via SQLite FTS5 in-memory. Fallback ke keyword scan jika gagal."""
    if not notes or not query.strip():
        return []
    # sanitise FTS5 query: keep alphanum + keep telco tokens like RSRP/SINR
    # FTS5 syntax: tokenization; escape quotes
    fts_q = re.sub(r'["\']', " ", query)
    # take keywords (split, filter stopwords short)
    tokens = [t for t in re.findall(r"[A-Za-z0-9_/\-]+", fts_q) if len(t) >= 2]
    if not tokens:
        return []
    # FTS5 OR query — biar recall tinggi untuk telco abbreviations
    fts_expr = " OR ".join(tokens[:12])

    try:
        con = sqlite3.connect(":memory:")
        con.execute("CREATE VIRTUAL TABLE vault USING fts5(title, content, tokenize='porter unicode61')")
        # insert
        for n in notes:
            meta = n.get("metadata") or {}
            title = meta.get("title") or Path(n["path"]).stem
            body = (n.get("content") or "")[:4000]
            con.execute("INSERT INTO vault(title, content) VALUES (?,?)", (title, body))
        # query with bm25 ranking (lower is better; we invert)
        cur = con.execute(
            "SELECT title, content, rank FROM vault WHERE vault MATCH ? ORDER BY rank LIMIT ?",
            (fts_expr, top_k * 2),
        )
        rows = cur.fetchall()
        con.close()
        out: List[dict] = []
        for title, content, rank in rows:
            # rank is negative bm25; convert to score 0..1 (higher better)
            # FTS5 rank is negative; e.g. -2.3 → score ~2.3
            score = float(-rank) if rank else 0.0
            # find original path
            path = next((n["path"] for n in notes if (n.get("metadata") or {}).get("title") == title or Path(n["path"]).stem == title), "")
            out.append({"title": title, "path": path, "score": score, "text": content[:600], "source": "fts5", "raw_rank": rank})
        # sort desc score
        out.sort(key=lambda x: x["score"], reverse=True)
        return out[:top_k]
    except Exception as e:
        # fallback: simple keyword scan + tf count
        q_low = query.lower()
        scored = []
        for n in notes:
            meta = n.get("metadata") or {}
            title = meta.get("title") or Path(n["path"]).stem
            body = (n.get("content") or "").lower()
            hay = f"{title.lower()} {body}"
            hits = sum(1 for tok in tokens if tok.lower() in hay)
            if hits:
                scored.append({"title": title, "path": n["path"], "score": float(hits), "text": (n.get("content") or "")[:600], "source": "keyword"})
        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_k]


def _rrf_fuse(ranked_lists: List[List[dict]], k: int = 60) -> List[dict]:
    """
    Reciprocal Rank Fusion.
    ranked_lists: each is sorted list of dicts with 'path' or 'title' as key.
    Returns fused list sorted by RRF score desc.
    """
    scores: Dict[str, float] = {}
    payload: Dict[str, dict] = {}
    for lst in ranked_lists:
        for rank, item in enumerate(lst, start=1):
            key = item.get("path") or item.get("title")
            if not key:
                continue
            # RRF formula: 1 / (k + rank)
            scores[key] = scores.get(key, 0.0) + 1.0 / (k + rank)
            # keep best payload (highest original score)
            if key not in payload or item.get("score", 0) > payload[key].get("score", 0):
                payload[key] = item
    fused = []
    for key, rrf_score in scores.items():
        item = dict(payload[key])
        item["rrf_score"] = rrf_score
        fused.append(item)
    fused.sort(key=lambda x: x["rrf_score"], reverse=True)
    return fused


def hybrid_retrieve(
    query: str,
    notes: List[dict] | None = None,
    graph=None,
    top_k: int = 6,
    expand_hops: int = 2,
) -> List[dict]:
    """
    Hybrid retrieval utama untuk v0.4.
    - notes: jika None, auto-load dari wiki/atomic
    - graph: NetworkX DiGraph (opsional) untuk 1-hop expansion
    Returns: list top_k dict {title, path, text, rrf_score, source}
    """
    # lazy load notes if not supplied
    if notes is None:
        try:
            from .parser import load_atomic_notes
            vault_root = Path("C:/Users/PC/Documents/Obsidian/Dika/wiki/atomic")
            if vault_root.exists():
                notes = load_atomic_notes(str(vault_root))
            else:
                notes = []
        except Exception:
            notes = []
    if not notes:
        return []

    # 1) FTS5 / BM25
    fts_hits = _fts5_search(query, notes, top_k=top_k)

    # 2) Vector (LanceDB + FastEmbed) — may be []
    try:
        vec_hits = vector_search(query, top_k=top_k)
    except Exception:
        vec_hits = []

    # 3) Fuse FTS5 + Vector via RRF
    lists_to_fuse: List[List[dict]] = []
    if fts_hits:
        lists_to_fuse.append(fts_hits)
    if vec_hits:
        lists_to_fuse.append(vec_hits)

    if not lists_to_fuse:
        return []

    fused = _rrf_fuse(lists_to_fuse)

    # 4) Graph 1-hop expansion — inject neighbours of top seeds
    if graph is not None and fused:
        try:
            seed_titles = [x["title"] for x in fused[:3]]
            expanded_titles = one_hop_expand(graph, seed_titles, limit_per_seed=expand_hops)
            # map title -> note
            title_to_note = {}
            for n in notes:
                t = (n.get("metadata") or {}).get("title") or Path(n["path"]).stem
                title_to_note[t] = n
                # also stem alias
                stem = Path(n["path"]).stem
                if stem not in title_to_note:
                    title_to_note[stem] = n
            for et in expanded_titles:
                if et in [x["title"] for x in fused]:
                    continue
                note = title_to_note.get(et)
                if note:
                    fused.append({
                        "title": et,
                        "path": note["path"],
                        "text": (note.get("content") or "")[:600],
                        "score": 0.5,
                        "rrf_score": 0.15,  # lower than direct hits
                        "source": "graph:1hop",
                    })
        except Exception:
            pass

    # final trim + sort
    fused.sort(key=lambda x: x.get("rrf_score", 0), reverse=True)
    return fused[:top_k]


def format_context_for_prompt(hits: List[dict], max_chars: int = 3500) -> str:
    """Format hits menjadi context block untuk prompt_builder."""
    if not hits:
        return "(tidak ada konteks vault yang relevan — jawab dengan prinsip umum RF dan tandai gap)"
    parts = []
    total = 0
    for h in hits:
        block = f"[{h.get('source','vault')}] {h.get('title','')} — {h.get('path','')}\n{h.get('text','')[:700]}"
        if total + len(block) > max_chars:
            break
        parts.append(block)
        total += len(block)
    return "\n\n---\n\n".join(parts)
