import os
import shutil
from pathlib import Path
try:
    import docx
except ImportError:
    print("python-docx not found. Please install it with: pip install python-docx")
    exit(1)

# Paths
BASE_DIR = Path(r"D:\3gpp_pdf")
SUB_DIR = BASE_DIR / "3gpp"
VAULT_SOURCES = Path(r"C:\Users\PC\Documents\Obsidian\Dika\wiki\sources")
LOG_PATH = Path(r"C:\Users\PC\Documents\Obsidian\Dika\wiki\log.md")
INDEX_PATH = Path(r"C:\Users\PC\Documents\Obsidian\Dika\wiki\index.md")

def extract_text_from_docx(path):
    try:
        doc = docx.Document(path)
        return "\n".join([p.text for p in doc.paragraphs])
    except Exception as e:
        return f"Error extracting text: {e}"

def run():
    SUB_DIR.mkdir(parents=True, exist_ok=True)
    VAULT_SOURCES.mkdir(parents=True, exist_ok=True)
    
    injected_files = []
    
    # Process files in BASE_DIR (newly downloaded)
    for file in list(BASE_DIR.glob("*.docx")):
        # 3. simpan di folder 3gpp/
        dest_sub = SUB_DIR / file.name
        if dest_sub.exists():
            os.remove(dest_sub)
        shutil.move(str(file), str(dest_sub))
        
        # 4. dan inject
        print(f"Injecting {dest_sub.name}...")
        text = extract_text_from_docx(dest_sub)
        
        # Create MD file
        md_filename = dest_sub.stem.lower().replace("-", "_") + ".md"
        md_path = VAULT_SOURCES / md_filename
        
        # Frontmatter
        fm = (
            "---\n"
            f"title: \"3GPP TS {dest_sub.stem}\"\n"
            "type: \"source\"\n"
            "created: \"2026-09-08\"\n"
            "updated: \"2026-09-08\"\n"
            f"sources: [\"{dest_sub.name}\"]\n"
            "tags: [\"3gpp\", \"standard\", \"telco\"]\n"
            "---\n\n"
        )
        
        # Write to vault (head only for safety, docx can be huge)
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(fm)
            f.write(text[:20000]) # Limit to 20k chars for performance
            if len(text) > 20000:
                f.write("\n\n... (Content truncated for vault preview)")
        
        injected_files.append((dest_sub.stem, md_filename))

    # Update Log
    if injected_files:
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write(f"\n\n## [2026-09-08] ingest | 3GPP Specs Injection\n")
            f.write(f"- Source: {SUB_DIR}\n")
            f.write(f"- Files processed: {len(injected_files)}\n")
            for stem, md in injected_files:
                f.write(f"  - [[{md}|3GPP TS {stem}]]\n")

    # Update Index
    if injected_files:
        content = INDEX_PATH.read_text(encoding="utf-8")
        if "## Sources" in content:
            new_entries = ""
            for stem, md in injected_files:
                entry = f"- [[{md[:-3]}]] - 3GPP Technical Specification {stem}\n"
                if entry not in content:
                    new_entries += entry
            
            if new_entries:
                updated_content = content.replace("## Sources\n", f"## Sources\n{new_entries}")
                INDEX_PATH.write_text(updated_content, encoding="utf-8")

    print(f"Successfully injected {len(injected_files)} files into Vault.")

if __name__ == "__main__":
    run()
