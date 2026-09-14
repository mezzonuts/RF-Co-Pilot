# Layer 1 RF Root Cause Analysis (RCA), Impairments & Interference Troubleshooting

## 1. RF Key Performance Indicators (KPI) Matrix & Thresholds

| KPI Parameter | Ideal / Excellent | Good / Acceptable | Poor / Edge | Critical Degradation |
|---|---|---|---|---|
| **RSRP (Reference Signal Received Power)** | $\ge -80\text{ dBm}$ | $-80\text{ to } -95\text{ dBm}$ | $-95\text{ to } -110\text{ dBm}$ | $< -110\text{ dBm}$ (Coverage Hole) |
| **RSRQ (Reference Signal Received Quality)** | $\ge -6\text{ dB}$ | $-7\text{ to } -11\text{ dB}$ | $-12\text{ to } -16\text{ dB}$ | $< -16\text{ dB}$ (High Interference) |
| **SINR (Signal-to-Interference-plus-Noise Ratio)** | $\ge 20\text{ dB}$ | $10\text{ to } 19\text{ dB}$ | $0\text{ to } 9\text{ dB}$ | $< 0\text{ dB}$ (Severe Collision) |
| **Downlink BLER (Block Error Rate)** | $< 1\%$ | $1 - 5\%$ | $5 - 10\%$ | $> 10\%$ (High Retransmission) |
| **CQI (Channel Quality Indicator)** | $13 - 15$ | $9 - 12$ | $5 - 8$ | $1 - 4$ (Fallback QPSK) |

---

## 2. Pilot Pollution Diagnostics & Mitigation
- **Definition**: Presence of $\ge 4$ candidate cells with similar signal strengths where no dominant cell exists ($\Delta\text{RSRP} \le 3\text{ dB}$).
- **Observable Signatures**:
  - High RSRP (e.g., $-75\text{ dBm}$ to $-85\text{ dBm}$) accompanied by very low SINR ($< 2\text{ dB}$).
  - Rapid fluctuations in active serving cell ID (ping-pong cell reselection).
  - High DL BLER, severe MCS drop (fallback to MCS 0–4), degraded throughput despite high signal strength.
- **Root Causes**:
  - Antenna overshooting caused by improper electrical/mechanical down-tilt.
  - Excessive base station transmit power (`referenceSignalPower` set too high).
  - Unfavorable site topology / cross-water signal propagation.
- **Remediation Steps**:
  1. Increase electrical down-tilt via Remote Electrical Tilt (RET) on non-dominant sectors.
  2. Reduce `referenceSignalPower` in SIB2.
  3. Modify Handover Cell Individual Offsets (CIO) to enforce cell dominance.

---

## 3. Physical Cell ID (PCI) Planning, Collision, Confusion & Modulo Rules

### A. Mathematical Formula (3GPP TS 36.211 Section 6.11)
$$PCI = 3 \times N_{ID}^{(1)} + N_{ID}^{(2)}$$
- $N_{ID}^{(1)} \in [0..167]$: Physical-layer Cell-Identity Group.
- $N_{ID}^{(2)} \in [0..2]$: Physical-layer Sub-Identity.
- Total PCI pool: 504 (LTE) / 1008 (5G NR).

### B. Classification of PCI Impairments
1. **PCI Collision**:
   - Condition: Two co-channel neighboring cells share the exact same PCI.
   - Impact: UE cannot distinguish Cell-specific Reference Signals (CRS) or SSB; causes severe synchronization failure and immediate RLF.
2. **PCI Confusion**:
   - Condition: Serving cell has two distinct neighbors that share the exact same PCI.
   - Impact: eNodeB/gNodeB cannot identify the target cell when processing UE `MeasurementReport`, causing Handover Failure.
3. **PCI Modulo 3 Interference (Mod 3)**:
   - Condition: Co-channel neighbor cells share identical $N_{ID}^{(2)} = PCI \pmod 3$.
   - Impact: Downlink CRS and PBCH DMRS subcarrier resource elements overlap identically, causing severe RS-to-RS interference and SINR collapse.
4. **PCI Modulo 30 Interference (Mod 30)**:
   - Condition: Neighbor cells share identical $PCI \pmod{30}$.
   - Impact: Uplink DMRS base sequence collision on PUSCH, resulting in high Uplink BLER and MCS fallback.

---

## 4. Hardware Impairments: PIM, Spurious, Cross-Feeder & Doppler Shift

### A. Passive Intermodulation (PIM)
- **Root Cause**: Non-linear junctions in the RF path (corroded connectors, loose jumpers, oxidized metal objects in antenna beam).
- **Mechanism**: High-power Downlink carrier frequencies mix ($2f_1 - f_2$ or $2f_2 - f_1$) and land directly on the Uplink receive band.
- **Signature**: Uplink RSSI / RTWP spikes ($> -90\text{ dBm}$) during high Downlink traffic hours; Uplink SINR collapses while Downlink RSRP remains good.

### B. Spurious Emission & External Interference
- **Root Cause**: Faulty power amplifiers, damaged cavity filters, or unauthorized wideband repeaters emitting out-of-band noise into cellular bands.
- **Signature**: High noise floor across all PRBs regardless of cell traffic load.

### C. Cross-Feeder
- **Root Cause**: Physical RF cables swapped between Sector TX/RX Main and Diversity ports or between Sector 1 and Sector 2.
- **Signature**: Handover failures occurring in predictable patterns; UE physically pointing at Sector A beam receives SIB info mapped to Sector B.

### D. Doppler Shift & Carrier Frequency Offset (CFO)
- **Formula**: $f_d = \frac{v}{c} f_c \cos(\theta)$
- **Impact**: In High-Speed Train scenarios ($> 120\text{ km/h}$), Doppler shift breaks OFDM subcarrier orthogonality, leading to inter-carrier interference (ICI) and Rank Indicator (RI) collapse.

---

## 5. Timing Advance (TA), Extended CP & Path Loss Formula

### A. Timing Advance Resolution (3GPP TS 36.213 Section 4.2.3)
- Basic time unit: $T_s = \frac{1}{30.72\text{ MHz}} \approx 32.55\text{ ns}$.
- Distance resolution per TA step ($16 T_s$):
  $$\Delta d = \frac{c \times 16 \times T_s}{2} \approx 78.12\text{ meters}$$

### B. Extended Cyclic Prefix (Extended CP) & TA80
- **Normal CP**: $4.7\text{ \mu s}$ duration ($\approx 1.4\text{ km}$ multipath spread limit).
- **Extended CP**: $16.67\text{ \mu s}$ duration ($\approx 5.0\text{ km}$ multipath spread limit), eliminating Inter-Symbol Interference (ISI) in coastal and long-range rural sites (TA80+).

### C. Path Loss Calculation Formula (SIB2 Reference)
$$PL\text{ (dB)} = \text{referenceSignalPower} - \text{RSRP}$$