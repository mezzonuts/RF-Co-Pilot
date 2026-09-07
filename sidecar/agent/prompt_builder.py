"""
sidecar/agent/prompt_builder.py — Grounded Context Injector & JSON Schema Enforcer (v0.4)

Membangun system prompt yang mengikat LLM ke Vault + file preview,
dengan Grounding Contract ketat untuk mencegah halusinasi.
"""
from __future__ import annotations
import json
from typing import List, Dict


GROUNDING_CONTRACT = """\
KONTRAK GROUNDING (WAJIB DIPATUHI):
1. Jawab HANYA dari KONTEKS VAULT dan DATA FILE yang diberikan di bawah.
2. Jika data/threshold tidak ada di konteks → jawab "Not available in source." lalu sebutkan gap.
3. Jangan mengarang threshold KPI, rumus, atau SOP vendor yang tidak ada di konteks.
4. Selalu sebutkan sumber: [[Judul Note]] atau File: <nama> (sheet X).
5. Jika konteks tidak cukup untuk menjawab → minta klarifikasi spesifik, jangan berasumsi.
"""

SYSTEM_BASE = (
    "You are TelecomAgent — senior RF engineer 4G/5G (Ericsson/Huawei). "
    "Tugas: analisa Drive Test / OSS KPI dari data preview + konteks Vault yang diberikan. "
    "Jawab dalam Bahasa Indonesia, ringkas teknis, pakai bullet."
)

# Mode-specific system additions
MODE_A_HINT = (
    "MODE A — Batch DT Analysis: Ekstraksi KPI → threshold matching ke Vault → RCA & rekomendasi konkret "
    "(downtilt/azimuth/PCI/neighbor). Hitung % RSRP≥-100, % SINR≥5, avg DL Thr dari preview jika ada."
)
MODE_B_HINT = (
    "MODE B — Interactive Q&A: Jawab pertanyaan engineer dengan Grounding Contract ketat. "
    "Jika pertanyaan butuh file/threshold yang belum ada, minta klarifikasi."
)


def build_grounded_messages(
    messages: List[Dict],
    vault_context: str = "",
    file_context: str = "",
    user_memory: Dict | None = None,
    mode: str = "auto",
    enforce_json: Dict | None = None,
) -> List[Dict]:
    """
    Inject grounded context ke dalam messages.

    messages: list {role, content} dari frontend (sudah termasuk user query + file block lama)
    vault_context: hasil format_context_for_prompt(hits)
    file_context: string preview file (jika belum ada di messages)
    user_memory: dict dari /api/memory
    mode: "A" | "B" | "auto"
    enforce_json: optional JSON schema dict untuk response_format
    returns: new messages list dengan system di depan
    """
    # detect mode if auto
    if mode == "auto":
        last_user = next((m.get("content","") for m in reversed(messages) if m.get("role")=="user"), "")
        # heuristic: jika ada file_context atau kata KPI/analisa/batch → Mode A, else B
        if file_context or any(k in last_user.lower() for k in ["kpi", "rsrp", "sinr", "throughput", "analisa", "analyse", "worst spot", "tilt", "pci"]):
            mode = "A"
        else:
            mode = "B"

    mode_hint = MODE_A_HINT if mode == "A" else MODE_B_HINT

    sys_parts = [SYSTEM_BASE, mode_hint, GROUNDING_CONTRACT]

    if vault_context and vault_context.strip():
        sys_parts.append(f"KONTEKS VAULT (Hybrid Retrieval — FTS5 + Vector + Graph 1-hop):\n{vault_context}")
    else:
        sys_parts.append("KONTEKS VAULT: (tidak ada konteks relevan — tandai gap jika butuh SOP)")

    if file_context and file_context.strip():
        # file_context sudah ada di user message block, tapi kita duplikat di system untuk grounding kuat
        sys_parts.append(f"DATA FILE PREVIEW:\n{file_context}")

    if user_memory:
        try:
            topics = ", ".join(user_memory.get("topics", []) or []) or "-"
            style = user_memory.get("style", "-")
            notes = user_memory.get("styleNotes", "")
            sys_parts.append(
                f"[MEMORI USER] Sesi: {user_memory.get('totalSessions','?')}, "
                f"Topik favorit: {topics}, Gaya: {style}. {notes}"
            )
        except Exception:
            pass

    sys_content = "\n\n".join(sys_parts)

    # optional JSON schema enforcement note
    if enforce_json:
        sys_content += f"\n\nFORMAT OUTPUT (JSON Schema — WAJIB valid JSON):\n{json.dumps(enforce_json, ensure_ascii=False, indent=2)}"

    # build new messages: system + original (but strip existing system if any)
    filtered = [m for m in messages if m.get("role") != "system"]
    return [{"role": "system", "content": sys_content}] + filtered


def build_clarification_prompt(missing: str, question: str) -> str:
    """Helper untuk format balasan klarifikasi (dipakai sufficiency_gate)."""
    return (
        f"Untuk menjawab dengan akurat saya butuh klarifikasi:\n"
        f"- Yang kurang: {missing}\n"
        f"- Pertanyaan: {question}\n"
        f"Silakan lengkapi (upload file, sebutkan sheet, atau jelaskan threshold yang dimaksud)."
    )
