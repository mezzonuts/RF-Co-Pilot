# Indonesian Cellular Operators, Spectrum Allocation, EARFCN/NR-ARFCN & MOCN Specifications

## 1. MNC to Operator Mapping (Kominfo SDPPI & 3GPP Reference)
- **PLMN 510-10**: PT Telekomunikasi Selular (Telkomsel)
  - MCC: `510`
  - MNC: `10`
  - Core Tech: 2G GSM, 4G LTE-A, 5G NR NSA/SA, VoLTE (QCI 1 Default)
- **PLMN 510-01**: PT Indosat Tbk (Indosat Ooredoo Hutchison - IM3)
  - MCC: `510`
  - MNC: `01`
  - Core Tech: 4G LTE-A, 5G NR NSA, MOCN Core Integration
- **PLMN 510-89**: PT Indosat Tbk (Indosat Ooredoo Hutchison - Tri 3)
  - MCC: `510`
  - MNC: `89`
  - Core Tech: 4G LTE-A, 5G NR NSA, MOCN RAN Sharing
- **PLMN 510-11**: PT XL Axiata Tbk (XL / AXIS)
  - MCC: `510`
  - MNC: `11`
  - Core Tech: 2G GSM, 4G LTE-A, 5G NR NSA, NB-IoT Refarmed
- **PLMN 510-28**: PT Smartfren Telecom Tbk (Smartfren)
  - MCC: `510`
  - MNC: `28`
  - Core Tech: 4G LTE-A, 5G NR, Pure 4G/5G Network (No Legacy 2G/3G)

---

## 2. Spectrum Band & Channel Number (EARFCN & NR-ARFCN) Reference Table

| No | Operator | PLMN | Band | EARFCN / NR-ARFCN DL | Carrier Freq DL (MHz) | Bandwidth | Duplex Mode | Role / Use Case |
|---|---|---|---|---|---|---|---|---|
| 1 | Telkomsel | 510-10 | Band 8 | 3775 | 957.5 MHz | 15 MHz | FDD | LTE Coverage / NB-IoT Deep Indoor |
| 2 | Telkomsel | 510-10 | Band 3 | 1850 | 1870.0 MHz | 20 MHz | FDD | LTE Primary Anchor / Carrier Aggregation |
| 3 | Telkomsel | 510-10 | Band 1 | 150 | 2135.0 MHz | 15 MHz | FDD | LTE Capacity Layer / DSS |
| 4 | Telkomsel | 510-10 | Band 40 | 38950 | 2320.0 MHz | 50 MHz | TDD | LTE-A High Density / Macro Capacity |
| 5 | Telkomsel | 510-10 | Band n40 | 632000 | 2300.0 MHz | 100 MHz | TDD | 5G NR Commercial & IKN High Throughput |
| 6 | Telkomsel | 510-10 | Band n1 | 427000 | 2135.0 MHz | 20 MHz | FDD | 5G NR NSA Anchor / DSS |
| 7 | Telkomsel | 510-10 | Band n28 | 156400 | 782.0 MHz | 2x10 MHz | FDD | 5G NR Sub-1GHz Wide Coverage |
| 8 | IOH (IM3) | 510-01 | Band 8 | 3525 | 932.5 MHz | 10 MHz | FDD | LTE Low-band Coverage |
| 9 | IOH (IM3) | 510-01 | Band 3 | 1525 | 1837.5 MHz | 2x15 MHz | FDD | LTE Primary Data Carrier |
| 10 | IOH (IM3) | 510-01 | Band 1 | 500 | 2150.0 MHz | 15 MHz | FDD | LTE Mid-band Capacity |
| 11 | IOH (IM3) | 510-01 | Band 40 | 39150 | 2340.0 MHz | 10 MHz | TDD | LTE Supplementary Capacity |
| 12 | IOH (Tri) | 510-89 | Band 3 | 1350 | 1820.0 MHz | 10 MHz | FDD | LTE Primary Data Carrier |
| 13 | IOH (Tri) | 510-89 | Band 1 | 275 | 2147.5 MHz | 10 MHz | FDD | LTE Capacity Carrier |
| 14 | IOH (Joint)| 510-01/89| Band n3 | 367500 | 1837.5 MHz | 20 MHz | FDD | 5G NR NSA Shared MOCN Spectrum |
| 15 | XL Axiata | 510-11 | Band 8 | 3475 | 927.5 MHz | 10 MHz | FDD | LTE / NB-IoT Indoor Penetration |
| 16 | XL Axiata | 510-11 | Band 3 | 1700 | 1855.0 MHz | 2x15 MHz | FDD | LTE Primary Layer Anchor |
| 17 | XL Axiata | 510-11 | Band 1 | 375 | 2157.5 MHz | 15 MHz | FDD | LTE Mid-band Capacity |
| 18 | XL Axiata | 510-11 | Band 40 | 39350 | 2360.0 MHz | 20 MHz | TDD | LTE TDD Supplemental Capacity |
| 19 | XL Axiata | 510-11 | Band n28 | 155000 | 775.0 MHz | 2x10 MHz | FDD | 5G NR 700 MHz Low-band Layer |
| 20 | Smartfren | 510-28 | Band 5 | 2475 | 876.5 MHz | 10 MHz | FDD | LTE Primary Coverage Anchor |
| 21 | Smartfren | 510-28 | Band 40 | 39850 | 2380.0 MHz | 30 MHz | TDD | LTE-A Multi-carrier Aggregation |

---

## 3. Mathematical Formula for Frequency Conversion

### A. 4G LTE EARFCN Calculation (3GPP TS 36.101 Section 5.7.3)
- **Downlink Frequency Formula**:
  $$F_{DL} = F_{DL\_Low} + 0.1 \times (EARFCN - N_{Offs\_DL})$$
- **Uplink Frequency Formula**:
  $$F_{UL} = F_{UL\_Low} + 0.1 \times (EARFCN_{UL} - N_{Offs\_UL})$$

### B. 5G NR Global Frequency Calculation (3GPP TS 38.104 Section 5.4.2)
- **Global Frequency Formula**:
  $$F_{REF} = F_{REF\_Offs} + \Delta F_{Global} \times (N_{REF} - N_{REF\_Offs})$$
- **Channel Raster Definition**:
  - Frequency range $0 - 3000\text{ MHz}$: $\Delta F_{Global} = 5\text{ kHz}$, $F_{REF\_Offs} = 0\text{ MHz}$, $N_{REF\_Offs} = 0$
  - Frequency range $3000 - 24250\text{ MHz}$: $\Delta F_{Global} = 15\text{ kHz}$, $F_{REF\_Offs} = 3000\text{ MHz}$, $N_{REF\_Offs} = 600000$

---

## 4. Multi-Operator Core Network (MOCN) Architecture & IOH Roaming

### A. MOCN Protocol Specification (3GPP TS 23.251 & TS 36.331)
- **Shared RAN Topology**: A single physical eNodeB or gNodeB connects simultaneously to multiple Core Network nodes via distinct S1-MME / NG-C interfaces.
- **Broadcast System Information**: SIB1 contains `plmn-IdentityList` array listing multiple PLMN IDs (`510-01` and `510-89`).
- **Cell Reservation & Access Parameters**:
  - `cellReservedForOperatorUse`: Set to `false` for both PLMNs to allow camping.
  - `cellBarred`: Set to `notBarred`.
  - `trackingAreaCode` (TAC): Common or individual TAC mapping per PLMN.
  - `Cell Global Identity (CGI)`: $CGI = MCC + MNC + TAC + Cell\ ID$.

### B. IOH Toll-Free Internal Roaming Mechanism
- Seamless inter-PLMN handover between `510-01` and `510-89` is enabled via S1-flex / NG-Core direct mapping, eliminating national roaming tariffs (IOH toll-free integration).

---

## 5. Band 8 Refarming for NB-IoT Indoor Penetration

### A. Technical Superiority of Band 8 (900 MHz)
- **Maximum Coupling Loss (MCL)**: Reaches **164 dB** (vs 144 dB on standard LTE B3/B1), allowing penetrations through concrete walls and basements.
- **Power Spectral Density (PSD) Boost**: Supports +20 dB boost on Narrowband Physical Uplink Shared Channel (NPUSCH).
- **Deployment Mode**: In-band, Guard-band, or Standalone within the 10–15 MHz carrier.

---

## 6. 5G NR Peak Throughput Calculation (IKN n40 100MHz Reference)

### A. 3GPP TS 38.306 Section 4.1.2 Throughput Formula
$$\text{Data Rate (Mbps)} = 10^{-6} \times \sum_{j=1}^{J} \left( v_{Layers}^{(j)} \cdot Q_m^{(j)} \cdot f^{(j)} \cdot R_{max} \cdot \frac{12 \cdot N_{PRB}^{BW(j),\mu}}{T_s^{\mu}} \cdot (1 - OH^{(j)}) \right)$$

### B. Input Parameter Set (Telkomsel n40 IKN Deployment)
- **Carrier Bandwidth**: 100 MHz on Band n40 (2300 MHz).
- **Subcarrier Spacing ($\mu$)**: $\mu = 1$ ($30\text{ kHz}$ SCS).
- **Resource Block Count ($N_{PRB}$)**: $N_{PRB} = 273$.
- **OFDM Symbol Duration ($T_s^{\mu}$)**: $T_s^{\mu} = \frac{10^{-3}}{14 \times 2^\mu} \approx 3.57 \times 10^{-5}\text{ s}$.
- **MIMO Layers ($v$)**: 4 layers (4x4 Downlink MIMO).
- **Modulation Order ($Q_m$)**: 8 (256QAM).
- **Max Code Rate ($R_{max}$)**: $948 / 1024 \approx 0.92578$.
- **Scaling Factor ($f$)**: 1.0.
- **Overhead Factor ($OH$)**: 0.14 (DL control channels, CSI-RS, SSB, DMRS).
- **TDD Slot Ratio Factor**: $\approx 74.3\%$ (DDDSU frame pattern).

### C. Final Theoretical Result
- **Downlink Theoretical Peak**: **1.54 Gbps – 1.62 Gbps**.