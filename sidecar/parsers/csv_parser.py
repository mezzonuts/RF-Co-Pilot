"""
sidecar/parsers/csv_parser.py — Parser DT CSV/TXT (csv stdlib, no pandas required)
"""
from __future__ import annotations
import csv
import io as _io

def parse_csv_text(text: str, file_name: str = "") -> dict:
    """Parse CSV/TXT text -> {header, preview, info}."""
    try:
        lines = [l for l in text.splitlines() if l.strip()]
        if not lines:
            return {"ok": False, "error": "File kosong"}
        sample = "\n".join(lines[:3])
        try:
            dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
            delim = dialect.delimiter
        except Exception:
            counts = {d: sample.count(d) for d in [",",";","\t","|"]}
            delim = max(counts, key=counts.get) or ","
        reader = csv.reader(_io.StringIO(text), delimiter=delim)
        all_rows = list(reader)
        if not all_rows:
            return {"ok": False, "error": "Tidak ada rows"}
        hdr = [c.strip() for c in all_rows[0]]
        preview = [[c.strip() for c in r] for r in all_rows[1:6]]
        delim_label = {"\t": "TAB", ",": ",", ";": ";", "|": "|"} .get(delim, delim)
        info = f"Delimiter '{delim_label}' \u2022 {len(all_rows)-1} rows \u2022 {len(hdr)} cols"
        lower = [h.lower() for h in hdr]
        for key in ["rsrp","sinr","throughput","dl","rsrq","time","lat","lon","cell"]:
            idx = next((i for i,h in enumerate(lower) if key in h), -1)
            if idx>=0 and preview:
                info += f" \u2022 has {key.upper()}"
        return {"ok": True, "header": hdr, "preview": preview, "info": info, "rows": len(all_rows)-1, "cols": len(hdr), "fileName": file_name}
    except Exception as e:
        return {"ok": False, "error": str(e)[:600]}
