"""Tests for qdrant_client.py — QdrantLite fallback (no Docker needed)."""
import pytest
from telecom_agent.qdrant_client import QdrantLite, QdrantClientManager, reset_qdrant, get_qdrant_manager, PointStruct


@pytest.fixture
def lite():
    return QdrantLite()


@pytest.fixture
def manager():
    reset_qdrant()
    m = QdrantClientManager()
    m.init_schema()
    yield m
    reset_qdrant()


def test_lite_create_and_upsert_search(lite):
    lite.create_collection("test_col", {"size": 8, "distance": "Cosine"})
    points = [
        PointStruct(id="1", vector=[1, 0, 0, 0, 0, 0, 0, 0], payload={"name": "a"}),
        PointStruct(id="2", vector=[0, 1, 0, 0, 0, 0, 0, 0], payload={"name": "b"}),
    ]
    lite.upsert("test_col", points)
    results = lite.search("test_col", query_vector=[1, 0, 0, 0, 0, 0, 0, 0], limit=1)
    assert len(results) == 1
    assert results[0]["payload"]["name"] == "a"
    assert results[0]["score"] > 0.99


def test_lite_search_empty_collection(lite):
    results = lite.search("nonexistent", query_vector=[1]*8)
    assert results == []


def test_lite_search_zero_vector(lite):
    lite.create_collection("col", {"size": 8, "distance": "Cosine"})
    lite.upsert("col", [PointStruct(id="1", vector=[1, 0, 0, 0, 0, 0, 0, 0], payload={"x": 1})])
    results = lite.search("col", query_vector=[0]*8, limit=5)
    assert len(results) == 1
    assert results[0]["score"] == 0.0


def test_manager_init_schema(manager):
    assert manager._initialized is True
    assert "kpi_metrics" in manager.client.collections
    assert "coverage_patterns" in manager.client.collections


def test_manager_insert_and_search_kpi(manager):
    metrics = [
        {"avg_rsrp": -85, "p50_rsrp": -86, "p95_rsrp": -80, "avg_sinr": 12, "avg_throughput_dl": 150, "avg_throughput_ul": 30, "bler": 0.01, "cqi": 12},
        {"avg_rsrp": -110, "p50_rsrp": -112, "p95_rsrp": -105, "avg_sinr": -2, "avg_throughput_dl": 5, "avg_throughput_ul": 2, "bler": 0.2, "cqi": 4},
    ]
    manager.insert_kpi_metrics(metrics)
    # Query with similar to first metric — should return first as top hit
    similar = manager.search_similar_kpi(metrics[0], limit=1)
    assert len(similar) == 1
    assert similar[0]["avg_rsrp"] == -85


def test_manager_search_coverage_gaps(manager):
    manager.insert_coverage_pattern({"lat": -6.2, "lon": 106.8, "rsrp_avg": -90, "sinr_avg": 10, "rsrp_std": 5, "sinr_std": 2, "cell_count": 3, "cluster_id": 1})
    manager.insert_coverage_pattern({"lat": -6.9, "lon": 107.6, "rsrp_avg": -100, "sinr_avg": 2, "rsrp_std": 8, "sinr_std": 4, "cell_count": 1, "cluster_id": 2})
    results = manager.search_coverage_gaps({"lat": -6.2, "lon": 106.8}, limit=5)
    assert len(results) >= 1


def test_manager_not_initialized_returns_empty():
    reset_qdrant()
    m = QdrantClientManager()
    # not calling init_schema
    assert m.search_similar_kpi({"avg_rsrp": -90}) == []
    assert m.search_coverage_gaps({"lat": 0, "lon": 0}) == []
    reset_qdrant()


def test_kpi_to_vector_defaults(manager):
    v = manager._kpi_to_vector({})
    assert len(v) == 8
    assert v[0] == -100.0  # default avg_rsrp


def test_coverage_to_vector(manager):
    v = manager._coverage_to_vector({"lat": 1.0, "lon": 2.0})
    assert len(v) == 8
    assert v[0] == 1.0
    assert v[1] == 2.0
