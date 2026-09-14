# Sesi 1 — 139 Pertanyaan Industri Telco Indonesia — Hasil Test

Ringkasan: Total 139 | PASS 122 | FAIL 17 | Live 122/139 | Fallback 0/0

| # | Mode | Pertanyaan | Status | Latency | Isu |
|---|------|------------|--------|---------|-----|
| 1 | live | Dari kolom CSV: `MCC=510`, `MNC=10`, `EARFCN=1850`, `Bandwidth=20MHz`. | PASS | 125ms | - |
| 2 | live | Diberikan cuplikan log: `PLMN: 510-01` dan `510-89` terdeteksi pada ce | PASS | 96ms | - |
| 3 | live | Log scanner mendeteksi `MCC=510`, `MNC=11`, `EARFCN=9400` (Band 8, 900 | PASS | 124ms | - |
| 4 | live | Diberikan data DT: `MCC=510`, `MNC=28`, `EARFCN=38950` (Band 40 TDD).  | PASS | 52ms | - |
| 5 | live | Log 5G NSA menunjukkan `Anchor Cell: EARFCN 1300 (Band 3)` dan `Second | PASS | 74ms | - |
| 6 | live | Sebuah file CSV drive test tidak memiliki header nama operator, tetapi | PASS | 86ms | - |
| 7 | live | Analisis baris log berikut: `TAC=12044, eNodeB_ID=401235, Cell_ID=1, M | PASS | 57ms | - |
| 8 | live | Log DT menunjukkan `Dual SIM Dual Active (DSDA)`: SIM1 terhubung ke `5 | PASS | 85ms | - |
| 9 | live | Scanner menangkap broadcast SIB1 dengan parameter `CellReservedForOper | PASS | 70ms | - |
| 10 | live | Dari log CSV di jalur tol Trans-Jawa, terdeteksi handover beruntun ant | PASS | 69ms | - |
| 11 | live | Mengapa keberadaan alokasi spektrum LTE Band 8 (900 MHz) pada `MNC=10` | PASS | 42ms | - |
| 12 | live | Parsing log berikut: `NR-ARFCN: 156400`, `SSB Subcarrier Spacing: 15 k | PASS | 69ms | - |
| 13 | live | Diberikan data log DT: `Cell_A (PCI 120, EARFCN 1850)` berpindah ke `C | PASS | 53ms | - |
| 14 | live | Log menunjukkan UE melakukan `Inter-PLMN Handover` darurat dari `510-2 | PASS | 40ms | - |
| 15 | live | Identifikasi operator dari log 5G SA: `PLMN: 510-01`, `gNodeB_ID: 9910 | PASS | 62ms | - |
| 16 | live | Pada log TEMS, terbaca parameter `E-UTRA Band = 40 (2300 - 2400 MHz)`. | PASS | 64ms | - |
| 17 | live | Ditemukan log 2G: `BCCH ARFCN=65`, `BSIC=43`, `MCC=510`, `MNC=10`. Ten | PASS | 70ms | - |
| 18 | live | Log CSV menampilkan cell switching cepat antara `510-11 B1 (15MHz)` da | PASS | 63ms | - |
| 19 | live | Analisis data CSV di kawasan IKN (Ibu Kota Nusantara): Terdeteksi log  | PASS | 69ms | - |
| 20 | live | Sebuah drive test mengumpulkan data di Selat Sunda (penyeberangan Mera | PASS | 100ms | - |
| 21 | live | Parsing log CSV: `Carrier Aggregation (CA) State: Configured (2C: B3+B | FAIL | 63ms | missing contains "510" |
| 22 | live | Pada log area pedesaan Sumatera, `510-10` memancarkan `LTE B8 (5 MHz)` | PASS | 62ms | - |
| 23 | live | Diberikan baris log: `RRCConnectionReconfiguration: mobilityControlInf | FAIL | 45ms | missing contains "510" |
| 24 | live | Log DT menampilkan nilai `PCI=0` pada `MNC=89` di area padat Bandung.  | FAIL | 63ms | missing contains "pci" |
| 25 | live | Dari log file CSV, bagaimana cara memvalidasi apakah pengukuran dilaku | FAIL | 39ms | missing contains "510" |
| 26 | live | Log DT: `RSRP = -78 dBm`, `RSRQ = -19 dB`, `SINR = -3 dB`. Identifikas | PASS | 70ms | - |
| 27 | live | Diberikan cuplikan CSV: ```csv Lat,Long,PCI,EARFCN,RSRP,SINR -6.1751,1 | PASS | 57ms | - |
| 28 | live | Log drive test menunjukkan `RSRP = -118 dBm`, `SINR = -5 dB`, `Serving | PASS | 70ms | - |
| 29 | live | Terdeteksi lonjakan nilai `RSSI` yang sangat tinggi (-50 dBm) namun `R | PASS | 69ms | - |
| 30 | live | Diberikan data timeseries CSV: `Serving Cell RSRP` stabil di -85 dBm,  | PASS | 90ms | - |
| 31 | live | Log 5G NR NSA: `SS-RSRP = -82 dBm`, `SS-SINR = 24 dB`, tetapi throughp | PASS | 57ms | - |
| 32 | live | Jelaskan perbedaan interpretasi fisik antara `SS-RSRP` (Synchronizatio | PASS | 47ms | - |
| 33 | live | Parsing log: `Timing Advance (TA) = 0`, `RSRP = -105 dBm` di lantai 25 | PASS | 79ms | - |
| 34 | live | Pada log 4G LTE, ditemukan `PCI Collision` antara dua cell pada radius | FAIL | 77ms | missing contains "collision" |
| 35 | live | Terjadi `PCI Confusion`: Serving cell memiliki dua tetangga berbeda de | PASS | 86ms | - |
| 36 | live | Log CSV menampilkan: `Antenna Ports: 4T4R`, `CQI = 15`, `MCS Index = 2 | PASS | 65ms | - |
| 37 | live | Diberikan data DT: `Uplink SINR = -6 dB`, `PUSCH Power = 23 dBm (Max P | PASS | 103ms | - |
| 38 | live | Bagaimana cara mendeteksi anomali *Cross-Feeder Antenna* (koneksi jump | PASS | 56ms | - |
| 39 | live | Log scanner spectrum analyser menunjukkan sinyal *Spurious Emission* p | PASS | 75ms | - |
| 40 | live | Terdeteksi degradasi `RxQual = 7` pada log 2G GSM saat `RxLev = -65 dB | PASS | 60ms | - |
| 41 | live | Diberikan log 5G SA: `Beam Index ID` sering berganti (*Beam Hunting /  | PASS | 74ms | - |
| 42 | live | Pada area sub-urban, log mencatat `RSRP = -95 dBm`, `SINR = 8 dB`, nam | PASS | 66ms | - |
| 43 | live | Analisis log DT: `Downlink MCS` berfluktuasi liar antara `MCS 2` dan ` | PASS | 70ms | - |
| 44 | live | Dari log CSV, tentukan formula untuk menghitung `Path Loss (PL)` pada  | PASS | 44ms | - |
| 45 | live | Diberikan cuplikan log: `PUSCH Power Control: P0_Nominal_PUSCH = -76 d | PASS | 66ms | - |
| 46 | live | Log scanner outdoor mencatat level sinyal `P-SS (Primary Sync Signal)` | PASS | 64ms | - |
| 47 | live | Identifikasi kondisi *Sleeping Cell* dari data drive test: RSRP terdet | PASS | 79ms | - |
| 48 | live | Pada log MIMO 2x2 LTE, nilai `Condition Number` matriks kanal sangat t | PASS | 71ms | - |
| 49 | live | Di area pertambangan remote, log menunjukkan `TA = 80` pada LTE Band 8 | PASS | 57ms | - |
| 50 | live | Mengapa nilai `RSRQ` yang buruk (-18 dB) pada kondisi cell load 100% ( | PASS | 63ms | - |
| 51 | live | Log DT 5G FR1 mencatat `SSB Beam Sweeping` gagal mendeteksi beam terba | PASS | 75ms | - |
| 52 | live | Terjadi lonjakan `Downlink Carrier Frequency Offset (CFO) > 1.5 kHz` p | PASS | 61ms | - |
| 53 | live | Diberikan kolom log CSV: `Subframe_Type`, `Slot_Number`, `PDCCH_Symbol | PASS | 57ms | - |
| 54 | live | Log menunjukkan nilai `CQI = 4` secara konstan selama 3 menit saat UE  | PASS | 71ms | - |
| 55 | live | Pada pengukuran 4G Band 3 (1800 MHz), terdeteksi interferensi PIM (Pas | PASS | 87ms | - |
| 56 | live | Log mencatat nilai `PRACH RSSI = -85 dBm` (sangat tinggi) di base stat | PASS | 59ms | - |
| 57 | live | Analisis korelasi pada CSV: Saat `RSRP` turun dari -80 dBm ke -105 dBm | PASS | 64ms | - |
| 58 | live | Pada log 5G mmWave (28 GHz), terjadi drop sinyal tiba-tiba sebesar 25  | FAIL | 54ms | missing contains "rsrp" |
| 59 | live | Diberikan data DT: `Serving Cell: Band 1 (2100 MHz)`, `Neighbor Cell:  | PASS | 56ms | - |
| 60 | live | Log scanner mencatat `Center Frequency Offset = +500 Hz` pada site eNo | PASS | 60ms | - |
| 61 | live | Log CSV mencatat: `DL Resource Block (RB) Allocation = 100%`, `Downlin | PASS | 81ms | - |
| 62 | live | Diberikan data: `HARQ Retransmission Rate (DL) = 28%`, `MAC BLER = 22% | PASS | 76ms | - |
| 63 | live | Pada log RLC layer, terjadi `RLC Max Re-establishment Exceeded` yang b | PASS | 46ms | - |
| 64 | live | Analisis anomali scheduler: Dua UE dengan profil identik (`CQI=12`, `R | PASS | 80ms | - |
| 65 | live | Diberikan data log MAC Layer: `Buffer Status Report (BSR) Index = 62`  | PASS | 82ms | - |
| 66 | live | Log PDCP mencatat `Out-of-Sequence Packet Delivery` yang masif saat tr | PASS | 48ms | - |
| 67 | live | Terjadi lonjakan `PDCP Discard Rate` saat streaming video resolusi 4K. | PASS | 63ms | - |
| 68 | live | Log CSV menampilkan: `MAC Layer HARQ Round Trip Time (RTT)` rata-rata  | PASS | 77ms | - |
| 69 | live | UE mengirimkan `Scheduling Request (SR)` pada PUCCH secara berulang hi | PASS | 94ms | - |
| 70 | live | Parsing log 5G SA: `SDAP (Service Data Adaptation Protocol)` gagal mem | PASS | 64ms | - |
| 71 | live | Diberikan log PDCP: `Robust Header Compression (ROHC)` diaktifkan untu | PASS | 60ms | - |
| 72 | live | Log mencatat `RLC Unacknowledged Mode (UM)` digunakan untuk Voice payl | PASS | 44ms | - |
| 73 | live | Terdeteksi `Duplicate Packet Detection` yang tinggi pada PDCP layer sa | PASS | 85ms | - |
| 74 | live | Pada log CSV, nilai `Carrier Aggregation (CA) SCell DL MAC Act/Deact M | PASS | 69ms | - |
| 75 | live | Analisis log: `Uplink Power Headroom (PHR) = 0 dB` dilaporkan dalam MA | PASS | 61ms | - |
| 76 | live | Terjadi drop throughput secara tajam saat speedtest TCP. Log transport | FAIL | 97ms | missing contains "rlc" |
| 77 | live | Diberikan data log L2: `MAC PDU Subheader Error / CRC Failure` terjadi | PASS | 99ms | - |
| 78 | live | Pada koneksi 5G NR, parameter subcarrier spacing berubah dari $\mu=0$  | PASS | 93ms | - |
| 79 | live | Log mencatat UE menerima `DCI Format 1A` (Fallback scheduling) alih-al | PASS | 61ms | - |
| 80 | live | Analisis kegagalan `Semi-Persistent Scheduling (SPS)` pada VoLTE: eNod | PASS | 144ms | - |
| 81 | live | Terjadi anomali pada log CSV: `MAC Layer DL Throughput = 80 Mbps`, tet | FAIL | 77ms | missing contains "pdcp" |
| 82 | live | Diberikan data: `CQI Reporting Mode = Periodic (PUCCH)` vs `Aperiodic  | PASS | 61ms | - |
| 83 | live | Log mencatat nilai `T-Reordering Timer` pada RLC AM terlalu rendah (10 | PASS | 69ms | - |
| 84 | live | Parsing log EN-DC: `Split Bearer PDCP Routing Ratio` diset 80% ke NR d | PASS | 70ms | - |
| 85 | live | Bagaimana cara memvalidasi dari log CSV bahwa suatu sesi download data | PASS | 88ms | - |
| 86 | live | Log DT mencatat urutan pesan signaling: `RRCConnectionRequest` -> `RRC | PASS | 55ms | - |
| 87 | live | Diberikan cuplikan log RRC: ```text 10:14:02.100 UE -> eNB: Measuremen | PASS | 110ms | - |
| 88 | live | UE mengalami *Handover Ping-Pong* antara Site A (PCI 210) dan Site B ( | PASS | 66ms | - |
| 89 | live | Log NAS layer mencatat pesan `Attach Reject` dengan `EMM Cause = 15 (N | PASS | 70ms | - |
| 90 | live | Analisis log signaling: UE mengirim `RRCConnectionReestablishmentReque | PASS | 55ms | - |
| 91 | live | Pada log DT 4G-to-2G Circuit Switched Fallback (CSFB), terjadi call se | PASS | 94ms | - |
| 92 | live | Log DT mencatat `Event A2` (Serving becomes worse than threshold) ter- | PASS | 120ms | - |
| 93 | live | Parsing pesan RRC `MeasurementReport`: - Serving Cell: PCI 50, RSRP -1 | PASS | 78ms | - |
| 94 | live | Log NAS mencatat `Service Reject` dengan `EMM Cause = 19 (ESM failure) | PASS | 68ms | - |
| 95 | live | Diberikan data signaling: UE menerima `RRCConnectionReconfiguration` y | PASS | 54ms | - |
| 96 | live | Terjadi kegagalan koneksi 5G NSA: Pesan signaling `SgNB Addition Reque | PASS | 65ms | - |
| 97 | live | Log mencatat urutan: UE mengalami RLF, lalu mengirim `RRCConnectionRee | PASS | 5022ms | - |
| 98 | live | Pada log RRC SIB broadcasting, parameter `q-RxLevMin` diset ke `-128 d | FAIL | 4754ms | TypeError: fetch failed |
| 99 | live | UE mengirim `Tracking Area Update (TAU) Request` saat melintasi batas  | PASS | 4839ms | - |
| 100 | live | Analisis pesan `RRCConnectionSetupComplete`: Parameter `selectedPLMN-I | PASS | 214ms | - |
| 101 | live | Log DT menunjukkan `Event A5` terkonfigurasi dengan threshold: `Thresh | FAIL | 162ms | missing contains "handover" |
| 102 | live | Terdeteksi signaling storm pada log DT: UE bolak-balik melakukan trans | PASS | 181ms | - |
| 103 | live | Log menunjukkan panggilan VoLTE gagal dengan SIP signaling `SIP/2.0 48 | PASS | 71ms | - |
| 104 | live | Parsing pesan `SecurityModeCommand` pada log NAS: Terjadi `Integrity C | PASS | 68ms | - |
| 105 | live | Diberikan log 5G SA: UE mengirim `Registration Request` dengan `5G-GUT | FAIL | 79ms | missing contains "rrc" |
| 106 | live | Terjadi kasus *Too Early Handover*: UE berpindah dari Cell A ke Cell B | PASS | 115ms | - |
| 107 | live | Pada log DT jalur kereta api, terdeteksi parameter `Time-to-Trigger (T | PASS | 86ms | - |
| 108 | live | UE menerima pesan `RRCConnectionRelease` dengan `redirectedCarrierInfo | FAIL | 98ms | missing contains "rrc" |
| 109 | live | Diberikan cuplikan log: `Paging` message dengan `ue-Identity: s-TMSI`  | PASS | 68ms | - |
| 110 | live | Analisis kegagalan `EPS Fallback` pada 5G SA: Saat menerima panggilan  | PASS | 67ms | - |
| 111 | live | Pada log LTE, terdeteksi parameter `cellReselectionPriority` yang iden | PASS | 37ms | - |
| 112 | live | Log NAS mencatat `Detach Request (Type: Re-attach required, Cause: Net | PASS | 62ms | - |
| 113 | live | Parsing log RRC: `SIB3` parameter `s-IntraSearch = 62 dB` ($31 \times  | PASS | 60ms | - |
| 114 | live | Diberikan kasus: UE terhubung ke Cell Macro, mendeteksi sinyal Small C | PASS | 85ms | - |
| 115 | live | Log 5G NSA menunjukkan `X2 Setup Failure` antara eNodeB eksisting (Ven | PASS | 107ms | - |
| 116 | live | Terjadi *Handover to Wrong Cell*: UE terhubung ke Cell A, melaporkan C | PASS | 89ms | - |
| 117 | live | UE mengirim `RRCConnectionReconfigurationComplete` untuk mengaktifkan  | FAIL | 63ms | missing contains "rrc" |
| 118 | live | Log NAS mencatat `P-TMSI Reallocation Command` gagal direspon pada jar | PASS | 56ms | - |
| 119 | live | Analisis pesan `UECapabilityInformation`: UE melaporkan dukungan `E-UT | PASS | 69ms | - |
| 120 | live | Dari log CSV, buat logika IF-THEN deterministik untuk mengklasifikasik | PASS | 70ms | - |
| 121 | live | Diberikan baris log CSV berikut: ```csv Timestamp,RSRP,RSRQ,SINR,DL_Th | PASS | 94ms | - |
| 122 | live | Diberikan data drive test CSV rute sepanjang 10 km: Ditemukan 15 kali  | PASS | 113ms | - |
| 123 | live | Parsing log throughput berikut: - RSRP: -98 dBm - SINR: 4 dB - Allocat | PASS | 126ms | - |
| 124 | live | Log DT menampilkan area *Black-hole / Blind Spot*: RSRP turun bertahap | PASS | 64ms | - |
| 125 | live | Diberikan matriks CSV dari 1,000 baris log: Tentukan formula korelasi  | PASS | 65ms | - |
| 126 | live | Terjadi anomali KPI `Accessibility Failure`: `RRC Setup Success Rate = | FAIL | 54ms | missing contains "kpi" |
| 127 | live | Log CSV mencatat nilai `HTTP Latency / TTFB (Time to First Byte)` sebe | PASS | 71ms | - |
| 128 | live | Diberikan cuplikan data Drive Test: ```csv PCI_1,RSRP_1,PCI_2,RSRP_2,P | PASS | 72ms | - |
| 129 | live | Pada log pengujian stationary di kawasan industri Cikarang, ditemukan  | PASS | 74ms | - |
| 130 | live | Log drive test mencatat parameter `CQI = 15` dan `SINR = 25 dB`, tetap | FAIL | 67ms | missing contains "throughput" |
| 131 | live | Terjadi lonjakan `Retainability KPI Failure (Drop Call Rate)` saat UE  | PASS | 125ms | - |
| 132 | live | Diberikan data log CSV: `FTP Download` multi-thread mencapai 90 Mbps,  | PASS | 133ms | - |
| 133 | live | Analisis log CSV drive test: Nilai `VoLTE MOS (Mean Opinion Score)` dr | PASS | 93ms | - |
| 134 | live | Pada pengujian 5G NSA di Surabaya, KPI `End-to-End DL Throughput` terc | PASS | 73ms | - |
| 135 | live | Diberikan log data DT: Terjadi `Call Setup Time (CST)` selama 7.5 deti | PASS | 75ms | - |
| 136 | live | Parsing CSV: ```csv Time,Event,Serving_PCI,Target_PCI,HO_Duration_ms 0 | FAIL | 51ms | missing contains "throughput" |
| 137 | live | Log mencatat anomali: `Attach Success Rate = 100%`, namun `Dedicated B | PASS | 80ms | - |
| 138 | live | Pada log CSV, bagaimana cara mengidentifikasi secara otomatis segmen j | PASS | 74ms | - |
| 139 | live | Ter | FAIL | 28ms | missing contains "throughput" |

Kriteria: PASS jika mengandung keyword expect (telkomsel/xl/smartfren/mocn/band/rsrp/sinr dll), tidak mengandung "Skill aktif", panjang <3500, dan tidak hardcode Google di live.

Hasil: **NOT READY ⛔**
