# 3GPP Knowledge Vault — 4G/5G Troubleshooting (Hermes Vault)

Sumber: 3GPP FTP Archive Rel-16 g00 — folder `D:\3gpp_pdf\` (docx/doc asli + wrapper md)
Vault inject: `C:\Users\PC\Documents\Obsidian\Dika\wiki\sources\` + mirror `wiki/3gpp/<category>/`
Cron: `3gpp-spec-sync` (`sync_3gpp.py`) — monthly tgl 1 jam 00:00

```
3GPP Knowledge Vault
├── 01_RAN_L2_L3 (Radio Access Network Protocols)
├── 02_CORE_NAS_INTERFACES (Signaling, Protocols & Cause Codes)
├── 03_PROCEDURES_FLOWS (End-to-End Signaling & Architecture)
├── 04_VOICE_SERVICES (VoLTE, VoNR, EPS Fallback & IMS)
└── 05_OAM_PM_KPIS (Performance Measurements & Counters)
```

## 01_RAN_L2_L3 — Radio Access Network L2 & L3

### 1.1 5G NR Access Stratum
| Spec | Judul | Klausa Kunci / Troubleshooting |
|------|-------|-------------------------------|
| TS 38.331 | NR RRC | 5.3 RRC Connection Mgmt (Setup/Reconf/Reest/Release/Resume), 5.4 Paging & SI, 5.5 Measurements & Mobility A1/A2/A3/A4/A5/A6/B1/B2, 5.7 Error Handling SCG/MCG Failure/RLF, 6.2/6.3 PDU & IE parser |
| TS 38.321 | NR MAC | 5.1 RACH (preamble/RAR/contention fail), 5.4 SR & BSR, 5.15 Beam Failure Recovery (mmWave/Sub-6) |
| TS 38.322 | NR RLC | 5.2 Data transfer & ARQ (window stall, max retransmission) |
| TS 38.323 | NR PDCP | 5.1/5.2 Integrity/Ciphering fail, discard & reordering |
| TS 38.211 | NR Physical channels & modulation | Frame/slot, DMRS, SSB |
| TS 38.213 | NR L1 control procedures | Power control, scheduling, HARQ |
| TS 38.300 | NR & NG-RAN Overall Description | Stage-2 architecture |
| TS 38.104 | NR BS radio Tx/Rx | RF requirements |

### 1.2 4G LTE Access Stratum
| Spec | Judul | Klausa Kunci |
|------|-------|-------------|
| TS 36.331 | E-UTRA RRC | 5.3 Connection Control (reconfigurationFailure/handoverFailure), 5.5 Measurement A1-A5/B1/B2, 6.2 IE RadioResourceConfigDedicated |
| TS 36.300 | E-UTRA Overall description | L2/L3 architecture |
| TS 36.211 | E-UTRA Physical channels | L1 structure |
| TS 36.104 | E-UTRA BS radio Tx/Rx | RF requirements |

## 02_CORE_NAS_INTERFACES — Core & NAS Cause Codes

### 2.1 5G System Core & Control Plane
| Spec | Interface | Klausa Kunci |
|------|-----------|-------------|
| TS 24.501 | NAS 5GS (UE-AMF/SMF) | 5.4/5.5 5GMM (Registration/Dereg/Service Req), 6.4 5GSM (PDU Session), 9.11.3 Annex A 5GMM Causes #7, #11, #15, #27, #31, 9.11.4 Annex B 5GSM Causes #26, #27, #28, #31, #38 |
| TS 38.413 | NGAP (gNB-AMF) | 8.2 PDU Session Resource Mgmt, 8.4 HO via N2, 9.3.1.2 Cause IEs (Radio Network/Transport/NAS/Protocol/Misc) |
| TS 38.423 | XnAP (gNB-gNB) | 8.2 HO Preparation/Execution via Xn, 9.2.1.1 Xn Causes |

### 2.2 4G EPC & Control Plane
| Spec | Interface | Klausa Kunci |
|------|-----------|-------------|
| TS 24.301 | NAS EPS (UE-MME) | 5.5 EMM (Attach/Detach/TAU), 6.5 ESM (Bearer), 9.9.3 EMM Causes #9/#15, 9.9.4 ESM Causes #32/#33 |
| TS 36.413 | S1AP (eNB-MME) | 8.2/8.3 E-RAB Mgmt, 9.2.1.3 Cause IE |

## 03_PROCEDURES_FLOWS — End-to-End Call Flows & Architecture
| Spec | Judul | Klausa Kunci |
|------|-------|-------------|
| TS 23.501 | 5GS System Architecture Stage 2 | 5.6 Network Functions (AMF/SMF/UPF/PCF/UDM), 5.7 QoS Model 5QI/ARP/GBR, 5.15 Network Slicing S-NSSAI |
| TS 23.502 | 5GS Procedures Stage 2 | 4.2.2 Registration/Auth, 4.3.2 PDU Session Establishment, 4.9 HO (Xn vs N2), 4.13.4 EPS Fallback for IMS Voice |
| TS 23.401 | GPRS enhancements for E-UTRAN (LTE Core) | 5.3.2 Attach, 5.3.3 TAU, 5.4.1 Dedicated Bearer (QCI1 VoLTE), 5.5.1 Intra-LTE HO (S1 vs X2) |

## 04_VOICE_SERVICES — VoLTE, VoNR, EPS Fallback & IMS
| Spec | Judul | Klausa Kunci |
|------|-------|-------------|
| TS 24.229 | IMS SIP/SDP call control | 5.1 UE IMS Registration, Clause 6 SIP Methods & Response 4xx/5xx/6xx (486 Busy, 488 Not Acceptable, 503 Unavailable), 6.1 SDP Offer/Answer codec AMR-WB/EVS |
| TS 23.216 | SRVCC | 6.2 E-UTRAN→3G/2G SRVCC procedures (troubleshoot HO voice 4G→legacy) |

## 05_OAM_PM_KPIS — Performance Measurements & Counters
| Spec | Judul | Klausa Kunci |
|------|-------|-------------|
| TS 28.552 | 5G Performance measurements | 5.1.1 gNB RRC counters (setup attempts/success/fail), 5.1.2 UE Context Drop, 5.1.3 PDU Session Resource, 5.1.5 Mobility/HO counters |
| TS 32.425 | E-UTRAN Performance measurements (LTE) | 4.1 RRC, 4.2 E-RAB Setup/Retainability (CDR), 4.3 HO |

## File Mapping (D:\3gpp_pdf\3gpp\)

```
3gpp/
├── 01_RAN_L2_L3/
│   ├── 36300-g00.docx (+ 36300_g00.md)
│   ├── 36331-g00.docx
│   ├── 36211-g00_*.docx (4 parts)
│   ├── 36104-g00.docx
│   ├── 38300-g00.docx
│   ├── 38211-g00.docx
│   ├── 38213-g00.docx
│   ├── 38104-g00.docx
│   ├── 38331-g00.docx
│   ├── 38321-g00.docx (NR MAC) *
│   ├── 38322-g00.docx (NR RLC) *
│   └── 38323-g00.docx (NR PDCP) *
├── 02_CORE_NAS_INTERFACES/
│   ├── 24501-g00.zip/.doc (24.501 NAS 5GS) *
│   ├── 38413-g00.docx (38.413 NGAP) *
│   ├── 38423-g00.docx (38.423 XnAP) *
│   ├── 24301-g00.zip (24.301 NAS EPS) *
│   └── 36413-g00.docx (36.413 S1AP) *
├── 03_PROCEDURES_FLOWS/
│   ├── 23501-g00.doc (23.501)
│   ├── 23502-g00.zip (23.502) *
│   └── 23401-g00.doc (23.401)
├── 04_VOICE_SERVICES/
│   ├── 24229-g00.zip (24.229 IMS) *
│   └── 23216-g00.zip (23.216 SRVCC) *
└── 05_OAM_PM_KPIS/
    ├── 28552-g00.zip (28.552) *
    └── 32425-g00.zip (32.425) *

* = tambahan dari Knowledge Vault Architecture (13 file baru, total 27 doc)
```

## Struktur Vault

- `D:\3gpp_pdf\` — arsip asli 3GPP (.doc/.docx/.zip)
- `D:\3gpp_pdf\3gpp\<category>\` — file terorganisir per kategori vault
- `wiki/3gpp/<category>/` — mirror copy untuk browsing Obsidian
- `wiki/sources/<spec>_g00.md` — wrapper markdown injeksi (frontmatter source + klausa troubleshooting + ekstrak teks terpotong 20k char) — langsung terbaca RAG
- `wiki/index.md` — katalog `## Sources` otomatis ter-update
- `wiki/log.md` — append-only `ingest | 3GPP Specs` per sync

## Cronjob

- Job `3gpp-spec-sync` @ `sync_3gpp.py` — `0 0 1 * *` (monthly tgl 1 00:00)
- Script: `C:\Users\PC\AppData\Local\hermes\scripts\sync_3gpp.py` (download ZIP → extract ke kategori → docx→md wrapper → inject vault → update index/log)
- Manual: `python C:\Users\PC\AppData\Local\hermes\scripts\sync_3gpp.py` atau `python "D:\AI NOTE\AI Agent For telco\rf-copilot\scripts\download_3gpp.py"`
