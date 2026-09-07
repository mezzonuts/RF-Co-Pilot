"""
sidecar/agent/sufficiency_gate.py — Validasi kelengkapan data & Clarification generator (v0.4)

Memeriksa apakah konteks (file preview + vault hits) cukup untuk menjawab query user.
Jika tidak cukup, hasilkan pertanyaan klarifikasi spesifik agar LLM tidak berhalusinasi.
"""
from __future__ import annotations
import re
from typing import List, Dict


# Keywords yang menandakan query butuh data file
FILE_DEPENDENT_PATTERNS = [
    r"\bkpi\b", r"\brsrp\b", r"\bsinr\b", r"\bthroughput\b", r"\bthr\b",
    r"\banalisa\b", r"\banalisis\b", r"worst\s*spot", r"\btilt\b", r"\bpci\b",
    r"\bneighbor\b", r"\bneighbour\b", r"\bdrive\s*test\b", r"\bdt\b",
    r"\bcluster\b", r"\bcell\b", r"\bcoverage\b",
]

# Keywords yang menandakan query butuh threshold/SOP dari vault
VAULT_DEPENDENT_PATTERNS = [
    r"\bthreshold\b", r"\btarget\b", r"\bsop\b", r"\b Standar\b",
    r"\bformula\b", r"\bdefinisi\b", r"apa itu", r"\bparameter\b",
]

TELCO_KPIS = ["rsrp", "rsrq", "sinr", "rssi", "cqi", "throughput", "pci", "earfcn", "mcs", "prb", "handover"]


def _needs_file(query: str) -> bool:
    q = query.lower()
    return any(re.search(p, q) for p in FILE_DEPENDENT_PATTERNS)

def _needs_vault(query: str) -> bool:
    q = query.lower()
    return any(re.search(p, q) for p in VAULT_DEPENDENT_PATTERNS) or any(k in q for k in TELCO_KPIS)

def _has_file_context(messages: List[Dict], file_context: str = "") -> bool:
    if file_context and len(file_context.strip()) > 20:
        return True
    # cek apakah ada [DATA FILE TERLAMPIR] di messages
    for m in messages:
        c = (m.get("content") or "")
        if "[DATA FILE TERLAMPIR]" in c or "Header" in c and "rows" in c.lower():
            return True
    return False

def _has_vault_context(vault_hits: List[Dict] | None) -> bool:
    return bool(vault_hits and len(vault_hits) > 0)

def check_sufficiency(
    query: str,
    vault_hits: List[Dict] | None = None,
    file_context: str = "",
    messages: List[Dict] | None = None,
) -> Dict:
    """
    Validasi kelengkapan konteks untuk query.

    Returns:
      {"enough": bool, "missing": str|None, "question": str|None, "mode": "A"|"B"}
    - enough=True → lanjut ke LLM
    - enough=False → frontend harus tampilkan question sebagai klarifikasi (tanpa panggil LLM)
    """
    messages = messages or []
    q_low = query.lower().strip()

    # 1) Query kosong / terlalu pendek
    if len(q_low) < 3:
        return {"enough": False, "missing": "query kosong", "question": "Bisa jelaskan lebih detail apa yang ingin dianalisa?", "mode": "B"}

    # definisional (Mode B) — jangan paksa file walau menyebut KPI
    is_definition = any(p in q_low for p in ["apa itu", "definisi", "apa arti", "jelaskan", "threshold", "formula", "standar", "sop", "parameter"])

    needs_file = _needs_file(query) and not is_definition
    needs_vault = _needs_vault(query)
    has_file = _has_file_context(messages, file_context)
    has_vault = _has_vault_context(vault_hits)

    # 2) Mode A: butuh file tapi file belum ada
    if needs_file and not has_file:
        if any(w in q_low for w in ["halo", "hai", "hello", "help", "bantuan"]):
            return {"enough": True, "missing": None, "question": None, "mode": "B"}
        return {
            "enough": False,
            "missing": "data file DT/OSS belum terlampir",
            "question": "Untuk analisa KPI (RSRP/SINR/Throughput) saya butuh file DT Log / Excel / OSS. Silakan upload via tombol DT Log / OSS / Attachment, atau sebutkan sheet yang mau dianalisa.",
            "mode": "A",
        }

    # 3) Butuh vault threshold tapi vault kosong (gap)
    if needs_vault and not has_vault:
        # tetap lanjut ke LLM tapi dengan flag gap — LLM akan jawab "Not available in source"
        # sufficiency tetap True, tapi self_improvement akan catat gap
        return {"enough": True, "missing": "threshold/SOP tidak ditemukan di vault", "question": None, "mode": "B", "gap": True}

    # 4) File ada tapi header tidak mengandung KPI yang ditanya
    if has_file and needs_file:
        # cek file_context mengandung KPI yang ditanya
        fc_low = (file_context or "").lower()
        # jika query menyebut RSRP tapi file_context tidak ada rsrp
        for kpi in TELCO_KPIS:
            if kpi in q_low and kpi not in fc_low:
                # hanya warning, tetap lanjut tapi minta klarifikasi
                return {
                    "enough": True,
                    "missing": f"kolom {kpi.upper()} tidak terlihat di preview file",
                    "question": None,
                    "mode": "A",
                    "warning": f"Kolom {kpi.upper()} tidak terdeteksi di header preview. Jika ada di sheet lain, sebutkan nama sheet (mis. Raw) atau upload file yang benar.",
                }

    return {"enough": True, "missing": None, "question": None, "mode": "A" if needs_file else "B"}


def build_clarification_reply(missing: str, question: str) -> str:
    """Format balasan klarifikasi untuk user (ditampilkan sebagai assistant message tanpa panggil LLM)."""
    return (
        f"🔍 **Klarifikasi dibutuhkan**\n\n"
        f"- **Yang kurang:** {missing}\n"
        f"- **Pertanyaan:** {question}\n\n"
        f"Silakan lengkapi agar analisa grounded ke Vault & data file (tanpa asumsi)."
    )
