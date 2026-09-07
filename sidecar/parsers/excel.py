"""
sidecar/parsers/excel.py — Parser DT Excel (openpyxl, pure python)

Mengekstrak multi-sheet (hingga 15 sheet) untuk kasus Power Query `Raw` sheet.
Dipakai http_server /api/parse dan vault ingest.
"""
from __future__ import annotations
import io
import base64

def parse_excel_b64(b64: str, file_name: str = "") -> dict:
    """Decode base64 xlsx/xls -> {sheetsData, info}. Loops through all sheets."""
    try:
        raw = base64.b64decode(b64)
        import openpyxl
        wb = openpyxl.load_workbook(io.BytesIO(raw), data_only=True, read_only=True)

        sheets_data = {}
        all_sheets = wb.sheetnames

        for sn in all_sheets[:15]:
            ws = wb[sn]
            rows_iter = ws.iter_rows(values_only=True)
            try:
                first_row = next(rows_iter, None)
            except Exception:
                first_row = None

            if not first_row:
                sheets_data[sn] = {"rows": 0, "cols": 0, "header": [], "preview": []}
                continue

            hdr = [str(c).strip() if c is not None else "" for c in first_row]
            preview = []
            count = 0
            for r in rows_iter:
                if count < 5:
                    preview.append([str(c) if c is not None else "" for c in r])
                count += 1

            sheets_data[sn] = {
                "rows": count,
                "cols": len(hdr),
                "header": hdr,
                "preview": preview
            }

        wb.close()

        active_sheet = all_sheets[0] if all_sheets else ""
        s_data = sheets_data.get(active_sheet, {"rows": 0})
        info = f"File: {file_name} \u2022 {len(all_sheets)} sheets \u2022 Active: {active_sheet} ({s_data['rows']} rows)"

        raw_names = [s for s in all_sheets if any(k in s.lower() for k in ["raw", "data", "log", "export"])]
        if raw_names:
            target = raw_names[0]
            t_data = sheets_data[target]
            info += f" \u2022 Found data in '{target}' ({t_data['rows']} rows)"

        return {
            "ok": True,
            "info": info,
            "sheets": all_sheets,
            "sheetsData": sheets_data,
            "activeSheet": active_sheet,
            "fileName": file_name,
            "totalRows": sum(s["rows"] for s in sheets_data.values()),
            "totalCols": sum(s["cols"] for s in sheets_data.values())
        }
    except Exception as e:
        import traceback; traceback.print_exc()
        return {"ok": False, "error": str(e)[:600]}
