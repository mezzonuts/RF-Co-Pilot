"""qdrant_client.py — Qdrant Vector DB abstraction layer.

- Qdrant: semantic search untuk KPI trends, anomaly candidates, coverage patterns
- Fallback: QdrantLite (in-memory, pure Python) untuk dev/test tanpa Docker
- Collections: kpi_metrics, cell_coverage, anomalies
"""

from typing import Dict, List, Optional, Tuple, Any
import logging
import uuid
import os

logger = logging.getLogger(__name__)

try:
    from qdrant_client import QdrantClient
    from qdrant_client.models import PointStruct, VectorParams, Distance, Filter, FieldCondition, Range
    QDRANT_AVAILABLE = True
except ImportError:
    QDRANT_AVAILABLE = False
    logger.warning("qdrant-client not installed, using QdrantLite fallback")

    class PointStruct:  # type: ignore[no-redef]
        def __init__(self, id: str, vector: list, payload: dict):
            self.id = id
            self.vector = vector
            self.payload = payload

    class VectorParams:  # type: ignore[no-redef]
        def __init__(self, size: int, distance: str):
            self.size = size
            self.distance = distance

    class Distance:  # type: ignore[no-redef]
        COSINE = "Cosine"

class QdrantLite:
    """In-memory Qdrant-compatible client for dev/test."""
    
    def __init__(self, path: str = ":memory:"):
        self.path = path
        self.collections: Dict[str, List[Dict]] = {}
        self.vectors: Dict[str, Dict[str, List[float]]] = {}
        logger.info("QdrantLite initialized (in-memory fallback)")
    
    def create_collection(self, collection_name: str, vectors_config: Dict) -> None:
        """Create a new collection."""
        self.collections[collection_name] = []
        self.vectors[collection_name] = {}
        logger.debug(f"Created collection: {collection_name}")
    
    def upsert(self, collection_name: str, points: List[PointStruct]) -> None:
        """Upsert points into collection."""
        if collection_name not in self.collections:
            self.create_collection(collection_name, {"size": 8, "distance": "Cosine"})
        
        for point in points:
            if isinstance(point, PointStruct):
                point_dict = {
                    "id": point.id,
                    "payload": point.payload,
                    "vector": point.vector
                }
            else:
                point_dict = point
            
            self.collections[collection_name].append(point_dict)
            if hasattr(point, 'vector') and point.vector:
                self.vectors[collection_name][point_dict["id"]] = point.vector
        
        logger.debug(f"Upserted {len(points)} points to {collection_name}")
    
    def search(self, collection_name: str, query_vector: List[float], 
               limit: int = 5) -> List[Dict]:
        """Simple cosine similarity search."""
        if collection_name not in self.collections:
            return []
        
        results = []
        for point in self.collections[collection_name]:
            if point["id"] not in self.vectors[collection_name]:
                continue
            vector = self.vectors[collection_name][point["id"]]
            
            # Cosine similarity
            dot_product = sum(a * b for a, b in zip(query_vector, vector))
            norm_query = (sum(a * a for a in query_vector) ** 0.5)
            norm_vector = (sum(b * b for b in vector) ** 0.5)
            
            if norm_query > 0 and norm_vector > 0:
                similarity = dot_product / (norm_query * norm_vector)
            else:
                similarity = 0.0
            
            results.append({
                "id": point["id"],
                "score": similarity,
                "payload": point["payload"]
            })
        
        # Sort by score desc and return top-k
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:limit]
    
    def close(self):
        """Close connection."""
        logger.info("QdrantLite closed")


def get_qdrant_client() -> Optional[Any]:
    """Get Qdrant client (production or Lite fallback)."""
    if QDRANT_AVAILABLE:
        try:
            client = QdrantClient(url="http://localhost:6333")
            client.get_collections()
            logger.info("Connected to production Qdrant")
            return client
        except Exception as e:
            logger.warning(f"Qdrant production not available: {e}, using Lite")
    
    return QdrantLite()


class QdrantClientManager:
    """Manager for Qdrant collections used in RF Co-Pilot."""
    
    COLLECTIONS = {
        "kpi_metrics": VectorParams(size=8, distance=Distance.COSINE),
        "coverage_patterns": VectorParams(size=8, distance=Distance.COSINE),
        "anomalies": VectorParams(size=8, distance=Distance.COSINE)
    }
    
    def __init__(self):
        self.client = get_qdrant_client()
        self._initialized = False
    
    def init_schema(self) -> None:
        """Create all required collections."""
        if not self.client:
            logger.error("Qdrant client not available")
            return
        
        if isinstance(self.client, QdrantLite):
            for name in self.COLLECTIONS:
                self.client.create_collection(name, self.COLLECTIONS[name])
            self._initialized = True
            logger.info("QdrantLite schema initialized")
        else:
            # Production Qdrant
            try:
                for name, config in self.COLLECTIONS.items():
                    self.client.recreate_collection(
                        collection_name=name,
                        vectors_config=config
                    )
                self._initialized = True
                logger.info("Production Qdrant schema initialized")
            except Exception as e:
                logger.error(f"Failed to initialize Qdrant: {e}")
    
    def insert_kpi_metrics(self, metrics: List[Dict]) -> None:
        """Insert KPI metrics for temporal trend analysis."""
        if not self._initialized or not self.client:
            return
        
        points = []
        for m in metrics:
            # Convert KPI dict to 8-dim vector: [avg_rsrp, p50_rsrp, p95_rsrp, avg_sinr, ...]
            vector = self._kpi_to_vector(m)
            points.append(PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload=m
            ))
        
        self.client.upsert(collection_name="kpi_metrics", points=points)
        logger.info(f"Inserted {len(points)} KPI metrics")
    
    def insert_coverage_pattern(self, pattern: Dict) -> None:
        """Insert coverage pattern for anomaly detection."""
        if not self._initialized or not self.client:
            return
        
        vector = self._coverage_to_vector(pattern)
        self.client.upsert(collection_name="coverage_patterns", points=[PointStruct(
            id=str(uuid.uuid4()),
            vector=vector,
            payload=pattern
        )])
    
    def search_similar_kpi(self, kpi_sample: Dict, limit: int = 5) -> List[Dict]:
        """Find similar KPI patterns (for anomaly detection)."""
        if not self._initialized or not self.client:
            return []
        
        vector = self._kpi_to_vector(kpi_sample)
        results = self.client.search(
            collection_name="kpi_metrics",
            query_vector=vector,
            limit=limit
        )
        return [r["payload"] for r in results]
    
    def search_coverage_gaps(self, location: Dict[str, float], limit: int = 5) -> List[Dict]:
        """Search for coverage patterns near a location (nearest-neighbor)."""
        if not self._initialized or not self.client:
            return []
        
        vector = [location.get("lat", 0), location.get("lon", 0)]
        # Pad to 8 dims
        vector.extend([0.0] * (8 - len(vector)))
        
        results = self.client.search(
            collection_name="coverage_patterns",
            query_vector=vector,
            limit=limit
        )
        return [r["payload"] for r in results]
    
    def _kpi_to_vector(self, kpi: Dict) -> List[float]:
        """Convert KPI dict to 8-dim embedding vector."""
        return [
            kpi.get("avg_rsrp", 0.0) or -100.0,
            kpi.get("p50_rsrp", 0.0) or -100.0,
            kpi.get("p95_rsrp", 0.0) or -100.0,
            kpi.get("avg_sinr", 0.0) or -10.0,
            kpi.get("avg_throughput_dl", 0.0) or 0.0,
            kpi.get("avg_throughput_ul", 0.0) or 0.0,
            kpi.get("bler", 0.0) or 0.0,
            kpi.get("cqi", 0.0) or 0.0
        ]
    
    def _coverage_to_vector(self, coverage: Dict) -> List[float]:
        """Convert coverage pattern to 8-dim vector."""
        return [
            coverage.get("lat", 0.0),
            coverage.get("lon", 0.0),
            coverage.get("rsrp_avg", 0.0) or -100.0,
            coverage.get("sinr_avg", 0.0) or -10.0,
            coverage.get("rsrp_std", 0.0) or 0.0,
            coverage.get("sinr_std", 0.0) or 0.0,
            coverage.get("cell_count", 0),
            coverage.get("cluster_id", 0)
        ]
    
    def close(self):
        """Close client connection."""
        if hasattr(self.client, 'close'):
            self.client.close()
        logger.info("QdrantClientManager closed")


# Global instance
_qdrant_manager: Optional[QdrantClientManager] = None

def get_qdrant_manager() -> Optional[QdrantClientManager]:
    """Get or create Qdrant manager."""
    global _qdrant_manager
    if _qdrant_manager is None:
        _qdrant_manager = QdrantClientManager()
        _qdrant_manager.init_schema()
    return _qdrant_manager

def reset_qdrant():
    """Reset global Qdrant manager (for testing)."""
    global _qdrant_manager
    if _qdrant_manager:
        _qdrant_manager.close()
    _qdrant_manager = None
