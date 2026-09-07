"""
sidecar/vault_engine/__init__.py — public API untuk vault_engine v0.4

Re-export utama supaya import ringkas:
  from sidecar.vault_engine import load_atomic_notes, build_graph, hybrid_retrieve
"""
from .parser import load_atomic_notes
from .graph import build_graph, one_hop_expand, graph_stats
from .indexer import build_vector_index, vector_search
from .retriever import hybrid_retrieve, format_context_for_prompt

__all__ = [
    "load_atomic_notes",
    "build_graph",
    "one_hop_expand",
    "graph_stats",
    "build_vector_index",
    "vector_search",
    "hybrid_retrieve",
    "format_context_for_prompt",
]
