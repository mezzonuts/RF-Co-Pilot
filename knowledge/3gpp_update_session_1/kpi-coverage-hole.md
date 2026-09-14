# Black-Hole / Coverage Hole Definition, Detection Rules & Remediation

## 1. Formal Detection Criteria (Continuous Drive Test Rule)
A continuous route segment is formally classified as a **Coverage Hole** when all of the following conditions are met:
- **Condition 1 (Distance Length)**: Continuous driving distance $\ge 200\text{ meters}$.
- **Condition 2 (Signal Strength)**: Serving cell **RSRP $< -110\text{ dBm}$** (or $< -115\text{ dBm}$ in dense indoor/in-building environments).
- **Condition 3 (Signal Quality)**: Serving cell **SINR $< -3\text{ dB}$**.
- **Condition 4 (Candidate Absence)**: No detected neighbor cell on any operational EARFCN / NR-ARFCN provides RSRP $\ge -105\text{ dBm}$.
- **Condition 5 (UE State)**: Triggering of Out-of-Coverage timer `T311`, continuous cell search loops, or UE fallback to *Emergency Calls Only* / *No Service*.

---

## 2. Diagnostic & Remediation Playbook

- **Action 1: Antenna Physical & Electrical Tilt Audit**:
  - Verify if adjacent sites are under-shooting.
  - Adjust Remote Electrical Tilt (RET) upwards by $1^\circ - 3^\circ$ to extend coverage footprint.
- **Action 2: Power Configuration Tuning (SIB2)**:
  - Increase `referenceSignalPower` on primary coverage layer (e.g., Band 8 900 MHz or Band 5 850 MHz).
- **Action 3: Azimuth Realignment**:
  - Re-orient sector azimuth to eliminate dead zones caused by building shadowing or terrain obstacles.
- **Action 4: Infill Site / IBS Deployment**:
  - Propose new micro site or In-Building Solution (IBS) if the blind spot is caused by structural shielding.