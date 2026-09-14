"""Train fine‑tuning fallback model with LoRA/QLoRA.

Reads tests/dataset_fallback_v2.json, filters rows where source == 'live',
generates data/train.jsonl in OpenAI chat format, then trains a causal LM
with PEFT LoRA and saves to models/fallback_v2/.
"""

import json
import os
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_PATH = BASE_DIR / "tests" / "dataset_fallback_v2.json"
TRAIN_PATH = BASE_DIR / "data" / "train.jsonl"
MODEL_OUT = BASE_DIR / "models" / "fallback_v2"


# ---------------------------------------------------------------------------
# 1. Load & filter dataset
# ---------------------------------------------------------------------------
def load_and_filter() -> list[dict]:
    """Load dataset_fallback_v2.json and keep only source == 'live' rows."""
    with open(DATASET_PATH, "r", encoding="utf-8") as f:
        raw = json.load(f)

    # Support both list and dict-with-entries formats
    if isinstance(raw, dict):
        entries = raw.get("entries", raw.get("data", []))
    else:
        entries = raw

    live = [e for e in entries if e.get("source") == "live"]
    print(f"[INFO] {len(entries)} total entries, {len(live)} with source='live'")
    return live


# ---------------------------------------------------------------------------
# 2. Generate OpenAI-format train.jsonl
# ---------------------------------------------------------------------------
def generate_train_jsonl(entries: list[dict]) -> None:
    """Write data/train.jsonl with {messages:[{role,content}], completion} format."""
    TRAIN_PATH.parent.mkdir(parents=True, exist_ok=True)

    count = 0
    with open(TRAIN_PATH, "w", encoding="utf-8") as f:
        for entry in entries:
            prompt = entry.get("prompt", "")
            answer = None
            if entry.get("live") and entry["live"].get("answer"):
                answer = entry["live"]["answer"]
            elif entry.get("fallback") and entry["fallback"].get("answer"):
                answer = entry["fallback"]["answer"]
            if answer is None:
                continue
            obj = {
                "messages": [{"role": "user", "content": prompt}],
                "completion": answer,
            }
            f.write(json.dumps(obj, ensure_ascii=False) + "\n")
            count += 1

    print(f"[INFO] Wrote {count} training examples to {TRAIN_PATH}")


# ---------------------------------------------------------------------------
# 3. Train with LoRA/QLoRA
# ---------------------------------------------------------------------------
def train() -> None:
    """Fine-tune with PEFT LoRA and save model to models/fallback_v2/."""
    try:
        from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
        from transformers import (
            AutoModelForCausalLM,
            AutoTokenizer,
            TrainingArguments,
            BitsAndBytesConfig,
        )
        from trl import SFTTrainer
    except ImportError as exc:
        raise ImportError(
            "Required libraries missing. Install: "
            "pip install transformers peft trl accelerate bitsandbytes"
        ) from exc

    # --- Hyper-parameters (adjust as needed) ---
    MODEL_ID = "gpt2"  # Change to your base model (e.g. "meta-llama/Llama-2-7b-hf")
    LR = 2e-4
    BATCH_SIZE = 4
    GRADIENT_ACCUM = 4
    EPOCHS = 3

    # Load tokenizer & model
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # 4-bit quantization for QLoRA
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype="float16",
    )
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        quantization_config=bnb_config,
        device_map="auto",
    )
    model = prepare_model_for_kbit_training(model)

    # LoRA config
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
    )
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    # Load training data
    with open(TRAIN_PATH, "r", encoding="utf-8") as f:
        train_data = [json.loads(line) for line in f if line.strip()]

    # Training arguments
    training_args = TrainingArguments(
        output_dir=str(MODEL_OUT),
        per_device_train_batch_size=BATCH_SIZE,
        gradient_accumulation_steps=GRADIENT_ACCUM,
        learning_rate=LR,
        num_train_epochs=EPOCHS,
        save_strategy="no",
        logging_steps=10,
        fp16=True,
        report_to="none",
    )

    # Trainer
    trainer = SFTTrainer(
        model=model,
        train_dataset=train_data,
        tokenizer=tokenizer,
        args=training_args,
    )

    print("[INFO] Starting training…")
    trainer.train()

    # Save final model & tokenizer
    MODEL_OUT.mkdir(parents=True, exist_ok=True)
    trainer.model.save_pretrained(MODEL_OUT)
    tokenizer.save_pretrained(MODEL_OUT)
    print(f"[INFO] Model saved to {MODEL_OUT}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    entries = load_and_filter()
    generate_train_jsonl(entries)
    train()
