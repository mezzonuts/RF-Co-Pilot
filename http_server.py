"""http_server.py — Development server untuk Knowledge Vault (browser, bukan Tauri window).

Jalankan:
  python http_server.py
  
Buka: http://localhost:8000
"""

import os
import sys
import json
import mimetypes
import io
import base64
import sqlite3
import time
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import urllib.request
import urllib.error

# Add Python path untuk imports backend
sys.path.insert(0, str(Path(__file__).parent / "src-tauri" / "python"))

from telecom_agent.vault_api import build_tree, get_file_content, build_knowledge_graph, search_vault
from telecom_agent.vault_ingest import get_vault_engine

VAULT_ROOT = Path("C:/Users/PC/Documents/Obsidian/Dika/wiki")
DIST_DIR = Path(__file__).parent / "dist"
MEMORY_DIR = Path("D:/AI NOTE/AI Agent For telco/memory")
MEMORY_FILE = MEMORY_DIR / "rf_memory.json"
LOCAL_MEMORY = Path(__file__).parent / ".rf_memory.json"

# ── 9Router helper: baca API key dari DB tanpa expose di frontend ──
def _get_9router_key():
    try:
        db = Path.home() / "AppData/Roaming/9router/db/data.sqlite"
        if not db.exists():
            db = Path("C:/Users/PC/AppData/Roaming/9router/db/data.sqlite")
        con = sqlite3.connect(str(db))
        cur = con.cursor()
        cur.execute("SELECT hex(key) FROM apiKeys LIMIT 1")
        row = cur.fetchone()
        con.close()
        if row and row[0]:
            return bytes.fromhex(row[0]).decode()
    except Exception as e:
        print(f"_get_9router_key err: {e}")
    return None

def _forward_to_9router(payload: dict, api_key: str = None):
    """Forward chat payload ke 9Router dengan fallback model."""
    key = api_key or _get_9router_key()
    if not key:
        return None, "9Router API key tidak ditemukan di db/data.sqlite"
    requested = payload.get("model") or "cx/gpt-5.5"
    fallbacks = [requested, "cx/gpt-5.4-mini", "cx/gpt-5.5", "cx/gpt-5.6-terra", "cx/gpt-5.6-luna"]
    seen=set(); fbs=[]
    for m in fallbacks:
        if m not in seen:
            seen.add(m); fbs.append(m)
    last_err = None
    for mdl in fbs:
        body = dict(payload)
        body["model"] = mdl
        if "stream" not in body:
            body["stream"] = False
        data = json.dumps(body).encode()
        req = urllib.request.Request("http://localhost:20128/v1/chat/completions", data=data, headers={"Content-Type":"application/json","Authorization": f"Bearer {key}"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                j = json.loads(r.read().decode())
                msg = (j.get("choices") or [{}])[0].get("message",{}).get("content","")
                if not msg.strip() and mdl != fbs[-1]:
                    last_err = f"empty response from {mdl}"
                    continue
                return j, None
        except urllib.error.HTTPError as e:
            try:
                b = e.read().decode()
            except:
                b = str(e)
            last_err = b[:800]
            if e.code in (402,403,429,500,502,503) and mdl != fbs[-1]:
                time.sleep(0.6)
                continue
            return None, last_err
        except Exception as e:
            last_err = str(e)[:800]
            if mdl != fbs[-1]:
                time.sleep(0.6)
                continue
            return None, last_err
    return None, last_err or "unknown error"

def _parse_excel_b64(b64: str, file_name: str = ""):
    """Decode base64 xlsx/xls -> {sheetsData, info}. Loops through all sheets."""
    try:
        raw = base64.b64decode(b64)
        import openpyxl
        wb = openpyxl.load_workbook(io.BytesIO(raw), data_only=True, read_only=True)
        
        sheets_data = {}
        all_sheets = wb.sheetnames
        
        # Limit processing to first 15 sheets to avoid OOM/Timeout
        for sn in all_sheets[:15]:
            ws = wb[sn]
            # row_count can be slow in read_only if not cached, but usually okay for typical files
            # get_highest_row is old, max_row is current
            rows_iter = ws.iter_rows(values_only=True)
            try:
                first_row = next(rows_iter, None)
            except:
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
                "rows": count, # count after header
                "cols": len(hdr),
                "header": hdr,
                "preview": preview
            }
            
        wb.close()
        
        # Summary info
        active_sheet = all_sheets[0]
        s_data = sheets_data[active_sheet]
        info = f"File: {file_name} \u2022 {len(all_sheets)} sheets \u2022 Active: {active_sheet} ({s_data['rows']} rows)"
        
        # Auto-detect "raw" or "data" sheet for better default info
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

def _parse_csv_text(text: str, file_name: str = ""):
    """Parse CSV/TXT text -> {header, preview, info}."""
    try:
        lines = [l for l in text.splitlines() if l.strip()]
        if not lines:
            return {"ok": False, "error": "File kosong"}
        import csv
        import io as _io
        sample = "\n".join(lines[:3])
        try:
            dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
            delim = dialect.delimiter
        except:
            counts = {d: sample.count(d) for d in [",",";","\t","|"]}
            delim = max(counts, key=counts.get) or ","
        reader = csv.reader(_io.StringIO(text), delimiter=delim)
        all_rows = list(reader)
        if not all_rows:
            return {"ok": False, "error": "Tidak ada rows"}
        hdr = [c.strip() for c in all_rows[0]]
        preview = [[c.strip() for c in r] for r in all_rows[1:6]]
       # human-readable delimiter label
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

def _load_memory():
    """Load memory from disk (projects + userMemory)."""
    for fp in [MEMORY_FILE, LOCAL_MEMORY]:
        try:
            if fp.exists():
                j = json.loads(fp.read_text(encoding="utf-8"))
                # normalize
                if "projects" not in j:
                    j["projects"] = []
                return j
        except Exception as e:
            print(f"_load_memory err {fp}: {e}")
    return {"projects": [], "userMemory": None}

def _save_memory(data: dict):
    try:
        MEMORY_DIR.mkdir(parents=True, exist_ok=True)
        txt = json.dumps(data, ensure_ascii=False, indent=2)
        MEMORY_FILE.write_text(txt, encoding="utf-8")
        LOCAL_MEMORY.write_text(txt, encoding="utf-8")
        return True
    except Exception as e:
        print(f"_save_memory err: {e}")
        import traceback; traceback.print_exc()
        return False

# ── Export builders (real .xlsx / .pptx) ──
def _build_excel_bytes() -> bytes:
    import openpyxl
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "KPI Summary"
    ws["A1"] = "Cluster C1 — KPI Summary (TelecomAgent)"
    ws["A1"].font = Font(bold=True, color="7c3aed", size=14)
    ws["A2"] = "Generated: DT_Jakarta_C1_0409.csv  \u2022  142.3k rows  \u2022  847 cells"
    ws["A2"].font = Font(size=9, color="71717a", italic=True)
    data = [
        ["KPI", "Value", "Target", "Status"],
        ["RSRP \u2265 -100 dBm", "94.2%", "95%", "\u2717 below"],
        ["SINR \u2265 5 dB", "81.4%", "80%", "\u2713"],
        ["DL Throughput", "42.7 Mbps", "30 Mbps", "\u2713"],
        ["RSRP Avg", "-87.3 dBm", "\u2014", "\u2014"],
        ["SINR Avg", "7.2 dB", "\u2014", "\u2014"],
    ]
    thin = Side(style="thin", color="D4D4D8")
    border = Border(left=thin, right=thin, top=thin, bottom=thin)
    for r, row in enumerate(data, start=4):
        for c, val in enumerate(row, start=1):
            cell = ws.cell(row=r, column=c, value=val)
            cell.border = border
            cell.alignment = Alignment(horizontal="center" if c > 1 else "left", vertical="center")
            if r == 4:
                cell.font = Font(bold=True, color="FFFFFF", size=10)
                cell.fill = PatternFill("solid", fgColor="7c3aed")
            else:
                cell.font = Font(size=10)
    ws.column_dimensions["A"].width = 22
    ws.column_dimensions["B"].width = 16
    ws.column_dimensions["C"].width = 14
    ws.column_dimensions["D"].width = 14
    ws2 = wb.create_sheet("Worst Spots")
    ws2["A1"] = "Top 5 Worst Spots \u2014 RCA Engine"
    ws2["A1"].font = Font(bold=True, size=12, color="7c3aed")
    hdr = ["#", "Cell", "Issue", "RSRP", "SINR", "Rekomendasi"]
    for c, h in enumerate(hdr, 1):
        cell = ws2.cell(row=3, column=c, value=h)
        cell.font = Font(bold=True, color="FFFFFF", size=10)
        cell.fill = PatternFill("solid", fgColor="7c3aed")
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = border
    rows = [
        [1, "JKT_1023_2", "Overshooting", "-108", "2.1", "downtilt 3\u00b0\u21925\u00b0"],
        [2, "JKT_1018_1", "PCI confusion", "-102", "3.4", "PCI 148\u2192312"],
        [3, "JKT_1015_1", "Missing neighbor", "-99", "4.0", "Add nbr \u21921022_2"],
        [4, "JKT_1040_3", "Weak coverage", "-110", "1.8", "tilt + azimuth"],
        [5, "JKT_1022_2", "HO fail", "-105", "2.5", "CIO tuning"],
    ]
    for r, row in enumerate(rows, start=4):
        for c, val in enumerate(row, 1):
            cell = ws2.cell(row=r, column=c, value=val)
            cell.font = Font(size=10)
            cell.alignment = Alignment(horizontal="center" if c != 2 else "left", vertical="center")
            cell.border = border
    ws2.column_dimensions["B"].width = 16
    ws2.column_dimensions["C"].width = 16
    ws2.column_dimensions["F"].width = 22
    ws3 = wb.create_sheet("Raw Sample")
    ws3["A1"] = "Sample rows (first 5) \u2014 DT_Jakarta_C1_0409.csv"
    ws3["A1"].font = Font(italic=True, size=9, color="71717a")
    sample_hdr = ["Time", "Lat", "Lon", "RSRP", "SINR", "DL Thr", "Cell"]
    for c, h in enumerate(sample_hdr, 1):
        cell = ws3.cell(row=3, column=c, value=h)
        cell.font = Font(bold=True, color="FFFFFF", size=9)
        cell.fill = PatternFill("solid", fgColor="27272a")
        cell.alignment = Alignment(horizontal="center")
    sample = [
        ["10:00:01", "-6.208", "106.845", "-92", "8.1", "45.2", "JKT_1023_2"],
        ["10:00:05", "-6.209", "106.846", "-88", "7.5", "52.1", "JKT_1023_2"],
        ["10:00:10", "-6.210", "106.847", "-108", "2.1", "5.3", "JKT_1023_2"],
        ["10:00:15", "-6.211", "106.848", "-85", "9.2", "61.0", "JKT_1018_1"],
        ["10:00:20", "-6.212", "106.849", "-99", "4.0", "22.4", "JKT_1015_1"],
    ]
    for r, row in enumerate(sample, start=4):
        for c, val in enumerate(row, 1):
            ws3.cell(row=r, column=c, value=val).font = Font(size=9)
    for c in range(1, 8):
        ws3.column_dimensions[openpyxl.utils.get_column_letter(c)].width = 14
    bio = io.BytesIO()
    wb.save(bio)
    return bio.getvalue()

def _build_pptx_bytes() -> bytes:
    from pptx import Presentation
    from pptx.util import Inches, Pt
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

    prs = Presentation()
    prs.slide_width = Inches(13.33)
    prs.slide_height = Inches(7.5)

    def bg(slide, rgb=(10, 10, 15)):
        fill = slide.background.fill
        fill.solid()
        fill.fore_color.rgb = RGBColor(*rgb)

    def title_box(slide, text, sub=None):
        tx = slide.shapes.add_textbox(Inches(0.6), Inches(0.35), Inches(12), Inches(0.7))
        tf = tx.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = text
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = RGBColor(0x7C, 0x3A, 0xED)
        if sub:
            tx2 = slide.shapes.add_textbox(Inches(0.6), Inches(1.0), Inches(12), Inches(0.4))
            tf2 = tx2.text_frame
            tf2.word_wrap = True
            p2 = tf2.paragraphs[0]
            p2.text = sub
            p2.font.size = Pt(11)
            p2.font.color.rgb = RGBColor(0xA1, 0xA1, 0xAA)

    def bullets(slide, items, left=0.6, top=1.6, w=12, h=5):
        tx = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(w), Inches(h))
        tf = tx.text_frame
        tf.word_wrap = True
        for i, b in enumerate(items):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            p.text = b
            p.level = 0
            p.font.size = Pt(13)
            p.font.color.rgb = RGBColor(0xE4, 0xE4, 0xE7)
            p.space_after = Pt(7)

    def kpi_table(slide):
        from pptx.util import Emu
        rows, cols = 4, 4
        tbl = slide.shapes.add_table(rows, cols, Inches(0.6), Inches(1.7), Inches(12), Inches(2.2)).table
        hdr = ["KPI", "Value", "Target", "Status"]
        vals = [
            ["RSRP \u2265 -100 dBm", "94.2%", "95%", "\u2717 below"],
            ["SINR \u2265 5 dB", "81.4%", "80%", "\u2713"],
            ["DL Throughput", "42.7 Mbps", "30 Mbps", "\u2713"],
        ]
        for c, h in enumerate(hdr):
            cell = tbl.cell(0, c)
            cell.text = h
            cell.fill.solid()
            cell.fill.fore_color.rgb = RGBColor(0x7C, 0x3A, 0xED)
            for par in cell.text_frame.paragraphs:
                par.alignment = PP_ALIGN.CENTER
                run = par.runs[0]
                run.font.size = Pt(10)
                run.font.bold = True
                run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        for r, row in enumerate(vals, 1):
            for c, v in enumerate(row):
                cell = tbl.cell(r, c)
                cell.text = v
                for par in cell.text_frame.paragraphs:
                    par.alignment = PP_ALIGN.CENTER if c > 0 else PP_ALIGN.LEFT
                    run = par.runs[0]
                    run.font.size = Pt(10)

    # Slide 1: Cover
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg(s)
    title_box(s, "Cluster C1 \u2014 Executive Summary", "DT_Jakarta_C1_0409.csv  \u2022  142.3k rows  \u2022  847 cells  \u2022  TelecomAgent RF Co-Pilot")
    bullets(s, [
        "RSRP \u2265 -100 dBm: 94.2%  (target 95% \u2014 slightly below)",
        "SINR \u2265 5 dB: 81.4%  (target 80% \u2713)",
        "Avg DL Throughput: 42.7 Mbps  \u2022  RSRP Avg -87.3 dBm  \u2022  SINR Avg 7.2 dB",
        "Next: 5 worst spots + RCA recommendations \u2192 slides 4\u20135",
    ], top=1.9)
    # Slide 2
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg(s)
    title_box(s, "KPI Overview")
    kpi_table(s)
    # Slide 3
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg(s)
    title_box(s, "Coverage Map \u2014 RSRP Distribution")
    bullets(s, [
        "Heatmap: RSRP distribution across Cluster Jabodetabek C1 (Folium/GeoJSON placeholder)",
        "Hotspot lemah: koridor Jl. Sudirman \u2013 Kuningan (RSRP -105 s.d. -110 dBm)",
        "Overshooting terdeteksi: JKT_1023_2 azimuth 120\u00b0 \u2192 perlu downtilt",
    ])
    # Slide 4
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg(s)
    title_box(s, "Top 5 Worst Spots")
    bullets(s, [
        "1. JKT_1023_2 \u2014 RSRP -108 dBm / SINR 2.1 dB \u2014 Overshooting \u2192 downtilt 3\u00b0\u21925\u00b0",
        "2. JKT_1018_1 \u2194 1020_3 \u2014 PCI confusion 148\u2192312 \u2192 re-plan PCI",
        "3. JKT_1015_1 \u2192 1022_2 \u2014 Missing neighbor, 42 HO fails \u2192 Add neighbor",
        "4. JKT_1040_3 \u2014 Weak coverage -110 dBm \u2192 tilt + azimuth optimization",
        "5. JKT_1022_2 \u2014 HO fail cluster \u2192 CIO tuning",
    ])
    # Slide 5
    s = prs.slides.add_slide(prs.slide_layouts[6])
    bg(s)
    title_box(s, "Recommendations \u2014 RCA Engine")
    bullets(s, [
        "Downtilt JKT_1023_2 3\u00b0\u21925\u00b0 (priority 1) \u2014 estimasi +4% RSRP \u2265-100",
        "PCI re-plan 148 \u2192 312 untuk JKT_1018_1 / 1020_3 \u2014 cegah collision",
        "Add neighbor JKT_1015_1 \u2192 JKT_1022_2 \u2014 turunkan HO fail 42 \u2192 <5",
        "Follow-up Drive Test 7 hari setelah perubahan \u2014 validate KPI",
        "Export: Excel detail (3 sheets) + raw sample \u2192 D:\\TelecomReports\\",
    ])
    bio = io.BytesIO()
    prs.save(bio)
    return bio.getvalue()

class VaultAPIHandler(SimpleHTTPRequestHandler):
    """HTTP handler untuk frontend + API backend."""

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        # API routes
        if path == "/api/chat":
            key = _get_9router_key()
            self.send_json({"ok": bool(key), "key_len": len(key) if key else 0, "hint": "POST {messages:[{role,content}]} ke /api/chat"})
            return
        if path == "/api/memory":
            self.send_json(_load_memory())
            return

        if path == "/api/vault/tree":
            self.send_json({"tree": build_tree(VAULT_ROOT)})

        elif path == "/api/vault/file":
            file_path = query.get("path", [""])[0]
            if not file_path:
                return self.send_error(400, "Missing path parameter")
            content = get_file_content(file_path)
            if not content:
                return self.send_error(404, "File not found")
            self.send_json(content)

        elif path == "/api/vault/graph":
            self.send_json(build_knowledge_graph())

        elif path == "/api/vault/search":
            q = query.get("q", [""])[0]
            limit = int(query.get("limit", [20])[0])
            if not q:
                return self.send_error(400, "Missing q parameter")
            results = search_vault(q, limit)
            self.send_json(results)

        elif path == "/api/vault/ingest":
            return self.send_error(405, "Use POST for ingest")

        elif path == "/api/export/excel":
            return self.serve_excel()

        elif path == "/api/export/pptx":
            return self.serve_pptx()

        # Serve static files from dist/ (html/js/css/fonts + mockup)
        elif path == "/" or path.endswith(".html") or path.endswith(".js") or path.endswith(".css") or path.endswith(".woff2") or path.endswith(".woff") or path.endswith(".ttf"):
            self.serve_static(path)
        else:
            # fallback: try serve_static anyway (covers /telecom_agent_ui.html etc)
            self.serve_static(path)

    def do_HEAD(self):
        self.do_GET()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/api/chat":
            try:
                clen = int(self.headers.get("Content-Length", 0) or 0)
                raw = self.rfile.read(clen) if clen else b"{}"
                body = json.loads(raw.decode() or "{}")
                if "messages" not in body:
                    return self.send_error(400, "messages required")
                if "model" not in body or not body["model"]:
                    body["model"] = "cx/gpt-5.4-mini"
                result, err = _forward_to_9router(body)
                if err:
                    return self.send_error(502, f"9Router error: {err}")
                self.send_json(result)
            except Exception as e:
                import traceback; traceback.print_exc()
                self.send_error(500, f"/api/chat failed: {e}")
            return

        if path == "/api/parse":
            try:
                clen = int(self.headers.get("Content-Length", 0) or 0)
                raw = self.rfile.read(clen) if clen else b"{}"
                data = json.loads(raw.decode() or "{}")
                fname = (data.get("fileName") or data.get("file_name") or "").strip()
                content = data.get("content") or data.get("b64") or ""
                is_b64 = bool(data.get("isBase64") or data.get("is_base64"))
                ext = fname.rsplit(".",1)[-1].lower() if "." in fname else ""
                if ext in ("xlsx","xls") or is_b64:
                    if "," in content and ";base64" in content:
                        content = content.split(",",1)[1]
                    res = _parse_excel_b64(content, fname)
                    self.send_json(res)
                else:
                    res = _parse_csv_text(content, fname)
                    self.send_json(res)
            except Exception as e:
                import traceback; traceback.print_exc()
                self.send_error(500, f"/api/parse failed: {e}")
            return

        if path == "/api/memory":
            try:
                clen = int(self.headers.get("Content-Length", 0) or 0)
                raw = self.rfile.read(clen) if clen else b"{}"
                body = json.loads(raw.decode() or "{}")
                mem = _load_memory()
                action = body.get("action")
                if action == "archive" and body.get("project"):
                    mem.setdefault("projects", []).append(body["project"])
                    if body.get("userMemory"):
                        mem["userMemory"] = body["userMemory"]
                    _save_memory(mem)
                    self.send_json({"ok": True, "projects": mem["projects"]})
                elif action == "update_user" and body.get("userMemory"):
                    mem["userMemory"] = body["userMemory"]
                    _save_memory(mem)
                    self.send_json({"ok": True})
                elif action == "clear":
                    _save_memory({"projects": [], "userMemory": None})
                    self.send_json({"ok": True})
                else:
                    if "projects" in body:
                        mem["projects"] = body["projects"]
                    if "userMemory" in body:
                        mem["userMemory"] = body["userMemory"]
                    _save_memory(mem)
                    self.send_json(mem)
            except Exception as e:
                import traceback; traceback.print_exc()
                self.send_error(500, f"/api/memory failed: {e}")
            return

        if path == "/api/vault/ingest":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(content_length)
                data = json.loads(body)

                file_name = data.get("fileName", "unknown")
                file_content = data.get("content", "")

                engine = get_vault_engine()
                result = engine.ingest_content(file_name, file_content)

                self.send_json(result)
            except Exception as e:
                self.send_error(400, f"Ingest failed: {str(e)}")
        else:
            self.send_error(404, "Not found")

    def serve_excel(self):
        try:
            data = _build_excel_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            self.send_header("Content-Disposition", 'attachment; filename="Cluster_C1_KPI.xlsx"')
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, f"Excel build failed: {e}")

    def serve_pptx(self):
        try:
            data = _build_pptx_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
            self.send_header("Content-Disposition", 'attachment; filename="Cluster_C1_Report.pptx"')
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, f"PPTX build failed: {e}")

    def serve_static(self, path: str):
        """Serve static files from dist/ directory."""
        if path == "/":
            path = "/index.html"

        file_path = DIST_DIR / path.lstrip("/")

        # prevent directory traversal
        try:
            file_path = file_path.resolve()
            if not str(file_path).startswith(str(DIST_DIR.resolve())):
                return self.send_error(403, "Access denied")
        except:
            return self.send_error(403, "Access denied")

        if not file_path.exists():
            return self.send_error(404, f"File not found: {path}")

        if file_path.is_dir():
            return self.send_error(403, "Directory access denied")

        mime_type, _ = mimetypes.guess_type(str(file_path))
        if not mime_type:
            mime_type = "application/octet-stream"

        try:
            with open(file_path, "rb") as f:
                content = f.read()

            self.send_response(200)
            self.send_header("Content-Type", mime_type)
            self.send_header("Content-Length", len(content))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f"Error reading file: {str(e)}")

    def send_json(self, data):
        """Send JSON response."""
        response = json.dumps(data, default=str)
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(response))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(response.encode())

    def send_error(self, code, message=""):
        """Send error response as JSON."""
        response = json.dumps({"error": message or f"HTTP {code}"})
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", len(response))
        self.end_headers()
        self.wfile.write(response.encode())

    def log_message(self, format, *args):
        """Log request."""
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == "__main__":
    if not DIST_DIR.exists():
        print(f"Error: {DIST_DIR} not found. Run `npm run build` first.")
        sys.exit(1)

    PORT = 8000
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, VaultAPIHandler)

    print(f"\U0001f680 Knowledge Vault server started on http://localhost:{PORT}")
    print(f"   Frontend: http://localhost:{PORT}")
    print(f"   API: http://localhost:{PORT}/api/vault/*")
    print(f"   Vault root: {VAULT_ROOT}")
    print(f"\nPress Ctrl+C to stop.")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\u2713 Server stopped.")
        sys.exit(0)
