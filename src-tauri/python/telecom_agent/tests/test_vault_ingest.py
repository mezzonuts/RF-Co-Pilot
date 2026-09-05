"""test_vault_ingest.py — Unit tests untuk vault_ingest.py."""

import pytest
import tempfile
from pathlib import Path
import json
import sys

# Add parent dir to path untuk import
sys.path.insert(0, str(Path(__file__).parent.parent))
from vault_ingest import VaultIngestEngine


@pytest.fixture
def temp_vault():
    """Create temporary vault structure untuk testing."""
    with tempfile.TemporaryDirectory() as tmpdir:
        vault_root = Path(tmpdir) / "test_vault"
        vault_root.mkdir()
        
        # Create vault structure
        (vault_root / "raw").mkdir()
        (vault_root / "raw" / "archives").mkdir()
        (vault_root / "raw" / "assets").mkdir()
        (vault_root / "wiki").mkdir()
        (vault_root / "wiki" / "atomic").mkdir()
        (vault_root / "wiki" / "concepts").mkdir()
        (vault_root / "wiki" / "entities").mkdir()
        (vault_root / "wiki" / "sources").mkdir()
        (vault_root / "templates").mkdir()
        
        yield vault_root


@pytest.fixture
def engine(temp_vault):
    """Create VaultIngestEngine dengan temp vault."""
    return VaultIngestEngine(vault_root=temp_vault)


class TestExtract:
    """Test text extraction dari berbagai format."""
    
    def test_extract_txt(self, engine, temp_vault):
        """Extract text dari .txt file."""
        txt_file = temp_vault / "raw" / "test.txt"
        txt_file.write_text("RSRP adalah Reference Signal Received Power.\nSINR adalah signal-to-noise ratio.\n")
        
        text, metadata = engine.extract_text(txt_file)
        
        assert "RSRP" in text
        assert "SINR" in text
        assert metadata["format"] == "txt"
        assert metadata["char_count"] > 0
    
    def test_extract_markdown(self, engine, temp_vault):
        """Extract text dari .md file."""
        md_file = temp_vault / "raw" / "test.md"
        md_file.write_text("# LTE Coverage\n\n## RSRP Metrics\n\nRSRP > -100 dBm is good.\n")
        
        text, metadata = engine.extract_text(md_file)
        
        assert "Coverage" in text
        assert "RSRP" in text
        assert metadata["format"] == "md"


class TestChunk:
    """Test text chunking."""
    
    def test_chunk_basic(self, engine):
        """Basic chunking dengan overlap."""
        text = "A" * 500 + "\n" + "B" * 500 + "\n" + "C" * 500
        
        chunks = engine.chunk_text(text)
        
        assert len(chunks) >= 2
        for chunk in chunks:
            assert chunk["size"] <= engine.CHUNK_SIZE + 100  # Allow slight overflow
            assert "text" in chunk
            assert "id" in chunk
    
    def test_chunk_preserves_overlap(self, engine):
        """Overlap harus preserve content antar chunk."""
        text = "First part. " * 100 + "Middle part. " * 100 + "Last part. " * 100
        
        chunks = engine.chunk_text(text)
        
        # Join all chunks, ada overlap
        full_text = "".join(c["text"] for c in chunks)
        assert "First" in full_text
        assert "Middle" in full_text
        assert "Last" in full_text


class TestConceptExtraction:
    """Test concept/entity extraction."""
    
    def test_extract_headings(self, engine):
        """Extract concepts dari markdown headings."""
        text = """# LTE Overview
## RSRP Measurement
### RSRP Formula

Some content here.

## SINR Analysis

More content.
"""
        
        concepts, entities = engine.extract_concepts(text, "test.md")
        
        assert any("RSRP" in c for c in concepts)
        assert any("SINR" in c for c in concepts)
        assert any("LTE" in c for c in concepts)
    
    def test_extract_telco_terms(self, engine):
        """Extract telecom-specific terms."""
        text = """
        The RSRP value was -95 dBm. SINR showed 5 dB.
        Coverage was good with handover to adjacent cell.
        EARFCN 2110 was used for LTE Band 3.
        CQI reached 14 and MCS 20.
        BLER is below 1 percent.
        """
        
        concepts, entities = engine.extract_concepts(text, "telco.txt")
        
        # Check key telco terms are extracted (case-insensitive)
        telco_terms = ["RSRP", "SINR", "EARFCN", "CQI", "MCS", "BLER"]
        for term in telco_terms:
            assert any(term in c.upper() for c in concepts), f"{term} should be extracted in {[c.upper() for c in concepts]}"


class TestAtomicNoteGeneration:
    """Test atomic note generation."""
    
    def test_generate_atomic_note(self, engine):
        """Generate 1 atomic note dari concept."""
        concept = "RSRP"
        text = "RSRP is Reference Signal Received Power. It measures signal strength. RSRP > -100 dBm is considered good."
        source = "test.txt"
        
        atomic = engine.generate_atomic_note(concept, text, source)
        
        assert atomic["title"] == concept
        assert atomic["type"] == "atomic-note"
        assert atomic["status"] == "draft"
        assert atomic["quality"] > 0
        assert atomic["domain"] == "telecommunications"
        assert "definition" in atomic
        assert "practical_application" in atomic
    
    def test_quality_score(self, engine):
        """Quality score harus reflect content quality."""
        # High quality: term repeated, long context, example
        good_text = "RSRP (Reference Signal Received Power) is critical. RSRP measures... RSRP indicates... For example, RSRP > -100 dBm"
        good_atomic = engine.generate_atomic_note("RSRP", good_text, "test.txt")
        
        # Low quality: term only mentioned once
        bad_text = "RSRP is mentioned here."
        bad_atomic = engine.generate_atomic_note("RSRP", bad_text, "test.txt")
        
        assert good_atomic["quality"] > bad_atomic["quality"]


class TestWritePages:
    """Test wiki page writing."""
    
    def test_write_atomic_note(self, engine):
        """Write atomic note ke file."""
        atomic = {
            "title": "RSRP",
            "type": "atomic-note",
            "domain": "telecommunications",
            "parent": "",
            "source": "test.txt",
            "status": "draft",
            "quality": 85,
            "quality_flags": [],
            "related": [],
            "tags": ["atomic", "telecommunications"],
            "created": "2026-01-15",
            "updated": "2026-01-15",
            "sources": ["test.txt"],
            "definition": "Reference Signal Received Power",
            "key_points": ["Measures signal strength", "Unit: dBm"],
            "formula": "RSRP = power of one RE",
            "practical_application": "Used in coverage planning",
            "related_concepts": []
        }
        
        path = engine.write_atomic_note(atomic)
        
        assert path.exists()
        assert path.name == "rsrp.md"
        content = path.read_text()
        assert "RSRP" in content
        assert "draft" in content
        assert "85" in content
    
    def test_write_source_page(self, engine):
        """Write source page ke file."""
        metadata = {"format": "txt", "char_count": 5000, "extracted_at": "2026-01-15T10:00:00"}
        concepts = ["RSRP", "SINR", "LTE"]
        
        path = engine.write_source_page("My Document", metadata, concepts)
        
        assert path.exists()
        content = path.read_text()
        assert "My Document" in content
        assert "RSRP" in content
        assert "5000" in content


class TestIndexAndLog:
    """Test index.md dan log.md updates."""
    
    def test_update_index(self, engine):
        """Update wiki/index.md dengan atomic notes."""
        # Create initial index
        (engine.wiki_dir / "index.md").write_text("""# Wiki Index

## Atomic Notes

## Concepts

## Sources
""")
        
        atoms = [
            {"title": "RSRP", "quality": 85},
            {"title": "SINR", "quality": 80}
        ]
        concepts = ["LTE", "Coverage"]
        
        engine.update_index(atoms, concepts, "test.txt")
        
        index = (engine.wiki_dir / "index.md").read_text()
        assert "RSRP" in index
        assert "SINR" in index
        assert "LTE" in index
        assert "85" in index
    
    def test_append_log(self, engine):
        """Append entry ke wiki/log.md."""
        atoms = [
            {"title": "RSRP", "quality": 85, "status": "draft"},
            {"title": "SINR", "quality": 80, "status": "draft"}
        ]
        
        engine.append_log("test.txt", pages_created=3, pages_updated=0, 
                         concepts=["RSRP", "SINR"], atomic_notes=atoms)
        
        log = (engine.wiki_dir / "log.md").read_text()
        assert "ingest | test.txt" in log
        assert "Pages created: 3" in log
        assert "RSRP" in log


class TestMainWorkflow:
    """Test end-to-end ingest workflow."""
    
    def test_ingest_txt_file(self, engine, temp_vault):
        """Full ingest workflow untuk .txt file."""
        # Create sample file
        txt_file = temp_vault / "raw" / "sample.txt"
        txt_file.write_text("""# LTE Coverage Analysis

## RSRP Measurements

RSRP (Reference Signal Received Power) is a key metric.
RSRP values below -120 dBm indicate poor coverage.

## SINR Analysis

SINR measures signal-to-noise ratio.
Good SINR is > 5 dB.

## Drive Test Results

Coverage was analyzed via drive test.
Handover success rate was 98%.
""")
        
        result = engine.ingest_file(txt_file)
        
        assert result["status"] == "success"
        assert result["concepts"] > 0
        assert result["atomic_notes"] > 0
        assert "Ingested" in result["message"]
        assert "atomic notes" in result["message"]
        
        # Check files were created
        assert (engine.wiki_dir / "sources" / "sample.md").exists()
        atoms = list((engine.wiki_dir / "atomic").glob("*.md"))
        assert len(atoms) > 0
        
        # Check index was updated
        index = (engine.wiki_dir / "index.md").read_text()
        assert "Atomic Notes" in index
        
        # Check log was appended
        log = (engine.wiki_dir / "log.md").read_text()
        assert "ingest | sample.txt" in log
        
        # Check file was archived
        assert not txt_file.exists()
        assert (temp_vault / "raw" / "archives" / "sample.txt").exists()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
