"""vault_api.py — REST API untuk Knowledge Vault viewer.

Endpoints:
- GET /vault/tree → tree struktur vault (left panel)
- GET /vault/file?path=... → isi file + frontmatter (center panel)
- GET /vault/graph → knowledge graph edges (right panel)
- POST /vault/search?q=... → search files
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Optional, Any
from datetime import datetime
import yaml
import logging

logger = logging.getLogger(__name__)

VAULT_ROOT = Path("C:/Users/PC/Documents/Obsidian/Dika/wiki")


def parse_frontmatter(content: str) -> tuple[Dict, str]:
    """Extract YAML frontmatter + body dari markdown file."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if match:
        try:
            fm = yaml.safe_load(match.group(1)) or {}
            body = match.group(2)
            return fm, body
        except yaml.YAMLError as e:
            logger.warning(f"Failed to parse frontmatter: {e}")
            return {}, content
    return {}, content


def extract_wikilinks(content: str) -> List[str]:
    """Extract [[wikilink]] references dari markdown content."""
    links = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', content)
    return links


def build_tree(root: Path, prefix: str = "") -> List[Dict]:
    """Bangun tree structure untuk left panel navigator."""
    items = []
    try:
        entries = sorted(root.iterdir(), key=lambda x: (not x.is_dir(), x.name.lower()))
        for entry in entries:
            if entry.name.startswith('.'):
                continue
            
            node = {
                "name": entry.name,
                "path": str(entry.relative_to(VAULT_ROOT)),
                "type": "dir" if entry.is_dir() else "file"
            }
            
            if entry.is_dir():
                node["children"] = build_tree(entry, prefix + "  ")
            else:
                # Extract title dari frontmatter jika ada
                if entry.suffix == ".md":
                    try:
                        content = entry.read_text(encoding='utf-8')
                        fm, _ = parse_frontmatter(content)
                        node["title"] = fm.get("title", entry.stem)
                    except:
                        node["title"] = entry.stem
            
            items.append(node)
    except Exception as e:
        logger.error(f"Error building tree for {root}: {e}")
    
    return items


def get_file_content(relative_path: str) -> Optional[Dict]:
    """Ambil isi file dengan frontmatter."""
    file_path = VAULT_ROOT / relative_path
    
    if not file_path.exists() or not file_path.is_file():
        return None
    
    try:
        content = file_path.read_text(encoding='utf-8')
        fm, body = parse_frontmatter(content)
        
        # Extract wikilinks
        links = extract_wikilinks(content)
        
        return {
            "path": relative_path,
            "title": fm.get("title", file_path.stem),
            "type": fm.get("type", "note"),
            "domain": fm.get("domain", ""),
            "status": fm.get("status", ""),
            "quality": fm.get("quality", 0),
            "frontmatter": fm,
            "body": body,
            "wikilinks": links,
            "created": fm.get("created", ""),
            "updated": fm.get("updated", "")
        }
    except Exception as e:
        logger.error(f"Error reading file {file_path}: {e}")
        return None


def build_knowledge_graph() -> Dict:
    """Bangun knowledge graph dari semua wikilinks."""
    nodes = []
    edges = []
    node_map = {}
    
    try:
        for md_file in VAULT_ROOT.rglob("*.md"):
            if md_file.name.startswith('_'):
                continue
            
            rel_path = str(md_file.relative_to(VAULT_ROOT))
            try:
                content = md_file.read_text(encoding='utf-8')
                fm, body = parse_frontmatter(content)
                
                title = fm.get("title", md_file.stem)
                file_type = fm.get("type", "note")
                domain = fm.get("domain", "")
                
                node_id = md_file.stem
                node_map[title] = node_id
                
                # Color by type
                color_map = {
                    "atomic-note": "#7c3aed",  # violet
                    "concept": "#06b6d4",       # cyan
                    "entity": "#f59e0b",        # amber
                    "source": "#10b981",        # emerald
                    "synthesis": "#ec4899"      # pink
                }
                
                nodes.append({
                    "id": node_id,
                    "label": title,
                    "type": file_type,
                    "domain": domain,
                    "color": color_map.get(file_type, "#6b7280"),
                    "size": 15
                })
                
                # Extract wikilinks → edges
                links = extract_wikilinks(body)
                for link in links:
                    if link != title:  # skip self-links
                        edges.append({
                            "source": node_id,
                            "target": link,
                            "label": "related"
                        })
            
            except Exception as e:
                logger.warning(f"Error processing {md_file}: {e}")
                continue
    
    except Exception as e:
        logger.error(f"Error building graph: {e}")
    
    return {
        "nodes": nodes,
        "edges": edges,
        "nodeMap": node_map
    }


def search_vault(query: str, limit: int = 20) -> List[Dict]:
    """Full-text search dalam vault."""
    results = []
    query_lower = query.lower()
    
    try:
        for md_file in VAULT_ROOT.rglob("*.md"):
            if len(results) >= limit:
                break
            
            rel_path = str(md_file.relative_to(VAULT_ROOT))
            
            try:
                content = md_file.read_text(encoding='utf-8')
                fm, body = parse_frontmatter(content)
                
                title = fm.get("title", md_file.stem)
                
                # Score: title match > body match
                score = 0
                if query_lower in title.lower():
                    score += 100
                if query_lower in body.lower():
                    score += 10
                
                if score > 0:
                    results.append({
                        "path": rel_path,
                        "title": title,
                        "type": fm.get("type", "note"),
                        "score": score,
                        "preview": body[:150] + "..." if len(body) > 150 else body
                    })
            except:
                continue
        
        results.sort(key=lambda x: x["score"], reverse=True)
    except Exception as e:
        logger.error(f"Search error: {e}")
    
    return results


# Export for Tauri command
def get_vault_api():
    return {
        "tree": build_tree(VAULT_ROOT),
        "graph": build_knowledge_graph(),
        "search": search_vault
    }
