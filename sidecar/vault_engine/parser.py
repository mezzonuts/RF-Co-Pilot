"""
Parser for atomic notes in the Obsidian vault.
Extracts front‑matter YAML and wikilinks.
"""
import os, yaml, re
from pathlib import Path

def load_atomic_notes(root: str):
    """Load all *.md files under ``root`` (including subfolders).
    Returns a list of dicts with keys: ``path``, ``metadata`` (dict), ``content`` (str), ``links`` (list)."""
    notes = []
    root_path = Path(root)
    for md_path in root_path.rglob('*.md'):
        text = md_path.read_text(encoding='utf-8')
        # Split front‑matter
        fm_match = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
        if not fm_match:
            continue
        fm_raw, body = fm_match.groups()
        meta = yaml.safe_load(fm_raw)
        # Find wikilinks [[...]]
        links = re.findall(r"\[\[(.+?)\]\]", body)
        notes.append({
            'path': str(md_path),
            'metadata': meta,
            'content': body,
            'links': links,
        })
    return notes
