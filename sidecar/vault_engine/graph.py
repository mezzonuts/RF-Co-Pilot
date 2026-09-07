"""
vault_engine/graph.py — NetworkX in-memory graph untuk 1-hop [[Wikilinks]]

Membangun DiGraph dari atomic notes: node = judul note, edge = wikilink.
Dipakai retriever untuk graph-expansion (seed hits → 1-hop neighbours).
"""
from __future__ import annotations
import networkx as nx

def build_graph(notes: list[dict]) -> nx.DiGraph:
    """
    notes: output dari parser.load_atomic_notes() — each dict has
           metadata.title, links (list wikilink strings), path
    returns: DiGraph
    """
    G = nx.DiGraph()
    # add nodes first
    for n in notes:
        title = (n.get("metadata") or {}).get("title") or n["path"]
        G.add_node(title, path=n["path"], metadata=n.get("metadata", {}), content=n.get("content","")[:800])
        # also index by filename stem as alias
        stem = n["path"].replace("\\","/").split("/")[-1].replace(".md","")
        if stem != title:
            # alias node points to same path (for wikilink resolution)
            G.add_node(stem, alias_of=title)
    # add edges
    for n in notes:
        src = (n.get("metadata") or {}).get("title") or n["path"]
        for link in n.get("links", []):
            # wikilink may be "RSRP" or "RSRP|display" — take before |
            target = link.split("|")[0].strip()
            # only add if target exists as node (or create dangling)
            if not G.has_node(target):
                G.add_node(target, dangling=True)
            G.add_edge(src, target)
    return G


def one_hop_expand(G: nx.DiGraph, seed_titles: list[str], limit_per_seed: int = 3) -> list[str]:
    """Ambil tetangga 1-hop dari seed_titles (outgoing + incoming)."""
    expanded: set[str] = set()
    for t in seed_titles:
        if not G.has_node(t):
            continue
        for _, nb in G.out_edges(t):
            expanded.add(nb)
            if len(expanded) >= limit_per_seed * len(seed_titles):
                break
        for nb, _ in G.in_edges(t):
            expanded.add(nb)
            if len(expanded) >= limit_per_seed * len(seed_titles):
                break
    # filter dangling alias
    return [x for x in expanded if x not in seed_titles][: limit_per_seed * len(seed_titles)]

def graph_stats(G: nx.DiGraph) -> dict:
    return {
        "nodes": G.number_of_nodes(),
        "edges": G.number_of_edges(),
        "dangling": sum(1 for _, d in G.nodes(data=True) if d.get("dangling")),
    }
