import os, shutil, zipfile, requests, time
from pathlib import Path
try:
    import docx
except ImportError:
    docx = None

TARGET_DIR = Path(r"D:\3gpp_pdf")
SUB_DIR = TARGET_DIR / "3gpp"
VAULT_3GPP = Path(r"C:\Users\PC\Documents\Obsidian\Dika\wiki\3gpp")
VAULT_SOURCES = Path(r"C:\Users\PC\Documents\Obsidian\Dika\wiki\sources")
LOG_PATH = Path(r"C:\Users\PC\Documents\Obsidian\Dika\wiki\log.md")
INDEX_PATH = Path(r"C:\Users\PC\Documents\Obsidian\Dika\wiki\index.md")

CATEGORIES = [
    "01_RAN_L2_L3",
    "02_CORE_NAS_INTERFACES",
    "03_PROCEDURES_FLOWS",
    "04_VOICE_SERVICES",
    "05_OAM_PM_KPIS",
]

# Keep for backward compat — also used by sync_3gpp.py
SPECS = {
    "LTE_Overall":       ("https://www.3gpp.org/ftp/Specs/archive/36_series/36.300/36300-g00.zip", "01_RAN_L2_L3"),
    "LTE_Phys":          ("https://www.3gpp.org/ftp/Specs/archive/36_series/36.211/36211-g00.zip", "01_RAN_L2_L3"),
    "LTE_RRC":           ("https://www.3gpp.org/ftp/Specs/archive/36_series/36.331/36331-g00.zip", "01_RAN_L2_L3"),
    "LTE_BS_RF":         ("https://www.3gpp.org/ftp/Specs/archive/36_series/36.104/36104-g00.zip", "01_RAN_L2_L3"),
    "NR_Overall":        ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.300/38300-g00.zip", "01_RAN_L2_L3"),
    "NR_Phys":           ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.211/38211-g00.zip", "01_RAN_L2_L3"),
    "NR_L1_Proc":        ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.213/38213-g00.zip", "01_RAN_L2_L3"),
    "NR_RRC":            ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.331/38331-g00.zip", "01_RAN_L2_L3"),
    "NR_BS_RF":          ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.104/38104-g00.zip", "01_RAN_L2_L3"),
    "NR_MAC":            ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.321/38321-g00.zip", "01_RAN_L2_L3"),
    "NR_RLC":            ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.322/38322-g00.zip", "01_RAN_L2_L3"),
    "NR_PDCP":           ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.323/38323-g00.zip", "01_RAN_L2_L3"),
    "NAS_5GS":           ("https://www.3gpp.org/ftp/Specs/archive/24_series/24.501/24501-g00.zip", "02_CORE_NAS_INTERFACES"),
    "NGAP":              ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.413/38413-g00.zip", "02_CORE_NAS_INTERFACES"),
    "XnAP":              ("https://www.3gpp.org/ftp/Specs/archive/38_series/38.423/38423-g00.zip", "02_CORE_NAS_INTERFACES"),
    "NAS_EPS":           ("https://www.3gpp.org/ftp/Specs/archive/24_series/24.301/24301-g00.zip", "02_CORE_NAS_INTERFACES"),
    "S1AP":              ("https://www.3gpp.org/ftp/Specs/archive/36_series/36.413/36413-g00.zip", "02_CORE_NAS_INTERFACES"),
    "5GC_Arch":          ("https://www.3gpp.org/ftp/Specs/archive/23_series/23.501/23501-g00.zip", "03_PROCEDURES_FLOWS"),
    "5GS_Procedures":    ("https://www.3gpp.org/ftp/Specs/archive/23_series/23.502/23502-g00.zip", "03_PROCEDURES_FLOWS"),
    "EPC_Arch":          ("https://www.3gpp.org/ftp/Specs/archive/23_series/23.401/23401-g00.zip", "03_PROCEDURES_FLOWS"),
    "IMS_SIP":           ("https://www.3gpp.org/ftp/Specs/archive/24_series/24.229/24229-g00.zip", "04_VOICE_SERVICES"),
    "SRVCC":             ("https://www.3gpp.org/ftp/Specs/archive/23_series/23.216/23216-g00.zip", "04_VOICE_SERVICES"),
    "PM_5G":             ("https://www.3gpp.org/ftp/Specs/archive/28_series/28.552/28552-g00.zip", "05_OAM_PM_KPIS"),
    "PM_LTE":            ("https://www.3gpp.org/ftp/Specs/archive/32_series/32.425/32425-g00.zip", "05_OAM_PM_KPIS"),
}

CLAUSES = {
    "38331": "TS 38.331 NR RRC — 5.3 RRC Connection, 5.4 Paging/SI, 5.5 Measurements A1-A6/B1-B2, 5.7 Failure, 6.2/6.3 IEs",
    "38321": "TS 38.321 NR MAC — 5.1 RACH, 5.4 SR/BSR, 5.15 Beam Failure Recovery",
    "38322": "TS 38.322 NR RLC — 5.2 ARQ, window stall",
    "38323": "TS 38.323 NR PDCP — 5.1/5.2 Integrity/Ciphering, discard",
    "36331": "TS 36.331 LTE RRC — 5.3 Connection, 5.5 Measurements, 6.2 IEs",
    "24501": "TS 24.501 NAS 5GS — 5GMM 5.4/5.5, 5GSM 6.4, Causes 5GMM #7/11/15/27/31, 5GSM #26/27/28/31/38",
    "38413": "TS 38.413 NGAP (gNB-AMF) — 8.2 PDU Session, 8.4 HO N2, 9.3.1.2 Causes",
    "38423": "TS 38.423 XnAP (gNB-gNB) — 8.2 HO via Xn, 9.2.1.1 Causes",
    "24301": "TS 24.301 NAS EPS — 5.5 EMM, 6.5 ESM, EMM/ESM Causes",
    "36413": "TS 36.413 S1AP (eNB-MME) — 8.2/8.3 E-RAB, 9.2.1.3 Causes",
    "23501": "TS 23.501 5GS Architecture — 5.6 NFs, 5.7 QoS 5QI, 5.15 Slicing",
    "23502": "TS 23.502 5GS Procedures — 4.2.2 Registration, 4.3.2 PDU Session, 4.9 HO, 4.13.4 EPS Fallback",
    "23401": "TS 23.401 EPC Architecture LTE — 5.3.2 Attach, 5.3.3 TAU, 5.4.1 Bearer, 5.5.1 HO",
    "24229": "TS 24.229 IMS SIP/SDP — SIP 4xx/5xx/6xx, SDP codec",
    "23216": "TS 23.216 SRVCC — E-UTRAN to 3G/2G HO voice",
    "28552": "TS 28.552 5G PM — 5.1.1 RRC, 5.1.2 UE Context, 5.1.3 PDU Session, 5.1.5 Mobility",
    "32425": "TS 32.425 LTE PM — 4.1 RRC, 4.2 E-RAB CDR, 4.3 HO",
}

# Back-compat: some callers import SPECS as simple url dict (old code did SPECS[k]=url).
# Provide flat view as well for any external import expecting string values.
SPECS_FLAT = {k: v[0] for k, v in SPECS.items()}

def extract_text(path: Path) -> str:
    if path.suffix.lower() == ".docx" and docx is not None:
        try:
            d = docx.Document(str(path))
            return "\n".join(p.text for p in d.paragraphs)
        except Exception as e:
            return f"[docx extract error {e} – {path.name}]"
    elif path.suffix.lower() == ".doc":
        return f"[OLE .doc binary – {path.name} {path.stat().st_size} bytes – buka dengan MS Word/LibreOffice. Wrapper hanya metadata klausa.]"
    else:
        try:
            return path.read_text(encoding="utf-8", errors="ignore")[:20000]
        except Exception as e:
            return f"[extract error {e}]"

def download_and_inject():
    for cat in CATEGORIES:
        (SUB_DIR / cat).mkdir(parents=True, exist_ok=True)
        (VAULT_3GPP / cat).mkdir(parents=True, exist_ok=True)
    VAULT_SOURCES.mkdir(parents=True, exist_ok=True)
    # migrate flat files if any remain
    for leftover in list(SUB_DIR.glob("*.docx")) + list(SUB_DIR.glob("*.doc")):
        if leftover.parent == SUB_DIR:
            nl = leftover.name.lower()
            cat = "01_RAN_L2_L3"
            if any(k in nl for k in ["23501","23502","23401"]): cat = "03_PROCEDURES_FLOWS"
            elif any(k in nl for k in ["24501","38413","38423","24301","36413"]): cat = "02_CORE_NAS_INTERFACES"
            elif any(k in nl for k in ["24229","23216"]): cat = "04_VOICE_SERVICES"
            elif any(k in nl for k in ["28552","32425"]): cat = "05_OAM_PM_KPIS"
            dest = SUB_DIR / cat / leftover.name
            vdest = VAULT_3GPP / cat / leftover.name
            if not dest.exists():
                shutil.move(str(leftover), str(dest))
                shutil.copy2(dest, vdest)
    print(f"Starting 3GPP Sync to {SUB_DIR} ...")
    injected = []
    for name, (url, cat) in SPECS.items():
        cat_dir = SUB_DIR / cat
        vault_cat = VAULT_3GPP / cat
        url_stem = Path(url).stem.replace("-g00","").lower()
        skip = any(f.stat().st_size > 1000 for f in cat_dir.glob(f"*{url_stem}*"))
        if skip:
            print(f"  SKIP {name} [{cat}] – already exists")
            continue
        zip_path = TARGET_DIR / f"{name}.zip"
        print(f"Downloading {name} [{cat}] ...")
        ok = False
        for attempt in range(1, 4):
            try:
                r = requests.get(url, stream=True, timeout=90)
                r.raw.decode_content = True
                if r.status_code == 200:
                    with open(zip_path, "wb") as f:
                        shutil.copyfileobj(r.raw, f)
                    with zipfile.ZipFile(zip_path, "r") as z:
                        for member in z.namelist():
                            mname = Path(member).name
                            if not mname: continue
                            target = cat_dir / mname
                            vtarget = vault_cat / mname
                            with z.open(member) as src, open(target, "wb") as dst:
                                shutil.copyfileobj(src, dst)
                            shutil.copy2(target, vtarget)
                            text = extract_text(target)
                            md_name = target.stem.lower().replace("-", "_") + ".md"
                            md_path = VAULT_SOURCES / md_name
                            key = "".join(c for c in target.stem if c.isdigit())[:5]
                            clause = CLAUSES.get(key, "")
                            fm = f"---\ntitle: \"3GPP {target.stem}\"\ntype: source\ncreated: 2026-09-08\nupdated: 2026-09-08\nsources: ['{target.name}']\ntags: [3gpp, {cat.lower()}, telco]\ncategory: {cat}\nclause: \"{clause}\"\n---\n\n> {clause}\n\n"
                            md_path.write_text(fm + text[:20000] + ("\n\n... (truncated)" if len(text) > 20000 else ""), encoding="utf-8")
                            injected.append(md_name)
                    zip_path.unlink(missing_ok=True)
                    ok = True
                    break
                else:
                    print(f"  [HTTP {r.status_code}] attempt {attempt}")
                    time.sleep(2)
            except Exception as e:
                print(f"  [Error {name} attempt {attempt}] {e}")
                time.sleep(3)
        if not ok:
            print(f"  FAILED {name}")
    if injected:
        uniq = sorted(set(injected))
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write(f"\n\n## [2026-09-08] ingest | 3GPP Knowledge Vault Sync (27 specs)\n- Source: {SUB_DIR}\n- Categories: {', '.join(CATEGORIES)}\n- Files injected: {len(uniq)}\n")
            for m in uniq: f.write(f"  - [[{m}]]\n")
        try:
            content = INDEX_PATH.read_text(encoding="utf-8")
            if "## Sources" in content:
                new_entries = ""
                for m in uniq:
                    stem = m[:-3]
                    entry = f"- [[{stem}]] - 3GPP Spec {stem}\n"
                    if stem not in content: new_entries += entry
                if new_entries:
                    content = content.replace("## Sources\n", f"## Sources\n{new_entries}")
                    INDEX_PATH.write_text(content, encoding="utf-8")
        except Exception as e:
            print(f"  [index skip] {e}")
    print(f"Done. Total injected this run: {len(set(injected))} | Total specs: {len(SPECS)}")

if __name__ == "__main__":
    download_and_inject()
