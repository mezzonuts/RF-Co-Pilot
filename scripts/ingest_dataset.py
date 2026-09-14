import os
import shutil
import json
from pathlib import Path

# Paths
DATASET_TRAINING_DIR = Path(r"D:\3gpp\dataset_training")
APP_VAULT_DIR = Path(r"D:\AI NOTE\AI Agent For telco\rf-copilot\vault")
VAULT_SOURCES_DIR = APP_VAULT_DIR / "sources"
VAULT_DATASET_DIR = APP_VAULT_DIR / "dataset"

# Ensure dirs exist
VAULT_SOURCES_DIR.mkdir(parents=True, exist_ok=True)
VAULT_DATASET_DIR.mkdir(parents=True, exist_ok=True)

def create_md_wrapper(file_path: Path, dest_md: Path, category: str):
    stem = file_path.stem
    ext = file_path.suffix.lower()
    
    try:
        if ext in ['.txt', '.json', '.jsonl']:
            content = file_path.read_text(encoding='utf-8', errors='ignore')
            # Extract first 500 chars for a preview in the body if needed, 
            # but usually server.ts loads the whole body.
            
            title = f"Training Dataset: {stem}"
            tags = ["3gpp", "dataset", "training"]
            if category:
                tags.append(category.lower())
            
            frontmatter = [
                "---",
                f"title: \"{title}\"",
                f"type: source",
                f"source_file: \"{file_path.name}\"",
                f"category: \"{category}\"",
                f"tags: {json.dumps(tags)}",
                "---",
                ""
            ]
            
            # For JSON/JSONL, wrap in code block for better rendering in vault viewer
            if ext in ['.json', '.jsonl']:
                body = f"```json\n{content[:20000]}\n```" # Cap body at 20k for safety
                if len(content) > 20000:
                    body += "\n\n... (content truncated, see original file) ..."
            else:
                body = content
                
            dest_md.write_text("\n".join(frontmatter) + body, encoding='utf-8')
            return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
    return False

def ingest():
    processed_count = 0
    print(f"Starting ingestion from {DATASET_TRAINING_DIR}...")
    
    for root, dirs, files in os.walk(DATASET_TRAINING_DIR):
        root_path = Path(root)
        category = root_path.name if root_path != DATASET_TRAINING_DIR else "General"
        
        # Create mirror subfolder in vault/dataset
        relative_path = root_path.relative_to(DATASET_TRAINING_DIR)
        dest_binary_subdir = VAULT_DATASET_DIR / relative_path
        dest_binary_subdir.mkdir(parents=True, exist_ok=True)
        
        for file in files:
            file_path = root_path / file
            ext = file_path.suffix.lower()
            
            if ext in ['.txt', '.json', '.jsonl', '.csv']:
                # 1. Copy original
                shutil.copy2(file_path, dest_binary_subdir / file)
                
                # 2. Create MD wrapper
                md_name = f"dataset_{relative_path.as_posix().replace('/', '_')}_{file_path.stem}.md".replace("__", "_").replace("dataset_.", "dataset")
                dest_md = VAULT_SOURCES_DIR / md_name
                
                if create_md_wrapper(file_path, dest_md, category):
                    processed_count += 1
                    print(f"  [OK] {file} -> {md_name}")

    print(f"\nIngestion complete. Total files processed: {processed_count}")

if __name__ == "__main__":
    ingest()
