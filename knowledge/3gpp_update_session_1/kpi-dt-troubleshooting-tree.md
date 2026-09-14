# Drive Test Diagnostic Decision Tree & End-to-End Troubleshooting

## 1. Diagnostic Decision Workflow
- **Issue Category 1: Throughput Degradation**:
  - Check Serving Cell RSRP:
    - If RSRP $< -110\text{ dBm}$ $\rightarrow$ Classify as **Coverage Hole**.
    - If RSRP $\ge -85\text{ dBm}$ $\rightarrow$ Evaluate SINR and Physical Resource Block (PRB) utilization.
  - Check Serving Cell SINR:
    - If SINR $< 0\text{ dB}$ (while RSRP is strong) $\rightarrow$ Classify as **Pilot Pollution** or **PCI Modulo 3 Interference**.
    - If SINR $\ge 15\text{ dB}$ $\rightarrow$ Check PRB Utilization metric.
  - Check PRB Utilization:
    - If PRB Utilization $> 90\%$ $\rightarrow$ Classify as **Cell Congestion (Resource Saturation)**.
    - If PRB Utilization $< 20\%$ $\rightarrow$ Classify as **Transmission / Core / Backhaul Bottleneck** or TCP Window limitation.

- **Issue Category 2: Voice Quality Degradation & Call Drops**:
  - Check Packet Loss Rate (PLR):
    - If PLR $> 2\%$ $\rightarrow$ Check QCI 1 / 5QI 1 GBR Bearer priority and ROHC activation.
  - Check Delay Variation (Jitter):
    - If Jitter $> 30\text{ ms}$ $\rightarrow$ Check Jitter Buffer Management (JBM) and eNodeB scheduler delay budget.
  - Check Signal Coverage:
    - If RSRP $< -115\text{ dBm}$ during call $\rightarrow$ Classify as **Coverage Hole / Missing Neighbor Relation (ANR)**.

---

## 2. Decision Tree Summary Matrix

| Observed DT Symptom | Primary Root Cause | Second-Level Metric to Check | Corrective Action |
|---|---|---|---|
| Strong RSRP, Low SINR, High BLER | Pilot Pollution / Mod 3 Conflict | Candidate cells with $\Delta\text{RSRP} \le 3\text{ dB}$ | Adjust Antenna Tilt (RET) / Remap PCI |
| Strong RSRP, High SINR, Low Throughput | PRB Congestion / Saturation | PRB Utilization $> 90\%$ | Enable Carrier Aggregation / Offload to NR |
| Poor RSRP, Poor SINR across 200m | Coverage Hole | No neighbor $\ge -105\text{ dBm}$ | Antenna Up-tilt / Propose Infill Site |
| Good RSRP, Low VoLTE MOS Score | Jitter / Packet Drop on QCI 1 | Jitter $> 30\text{ ms}$, PLR $> 2\%$ | Verify GBR Scheduler & Enable ROHC |