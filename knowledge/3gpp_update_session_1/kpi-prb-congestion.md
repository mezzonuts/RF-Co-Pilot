# Throughput vs PRB Congestion Root Cause Analysis (Cikarang Case Study)

## 1. Congestion Behavioral Profile (Day vs Night Scenario)

- **Daytime Scenario (Peak Traffic / Busy Hours)**:
  - Radio Environment: Excellent RF quality.
  - Serving Cell RSRP: $-82\text{ dBm}$.
  - Serving Cell SINR: $18\text{ dB}$.
  - CQI Report: 14 (Supports 64QAM / 256QAM modulation).
  - PRB Utilization: Continuously $> 95\%$.
  - User DL Throughput: Drops severely to $< 2\text{ Mbps}$.
  - Root Cause: **Radio Resource Saturation (PRB Congestion)**. The available bandwidth is sliced among hundreds of concurrent active RRC connected users.

- **Nighttime Scenario (Off-Peak Hours)**:
  - Radio Environment: Identical RF quality.
  - Serving Cell RSRP: $-82\text{ dBm}$.
  - Serving Cell SINR: $18\text{ dB}$.
  - CQI Report: 14.
  - PRB Utilization: Low ($< 15\%$).
  - User DL Throughput: Achieves theoretical maximum ($> 140\text{ Mbps}$).
  - Conclusion: RF layer is healthy; degradation during daytime is purely capacity-driven.

---

## 2. Step-by-Step Optimization & Mitigation Playbook

- **Step 1: Multi-Carrier Aggregation (CA)**:
  - Configure Carrier Aggregation combining primary Band 3 (20 MHz) with secondary carriers (Band 1 15 MHz + Band 40 20 MHz).
- **Step 2: Dynamic Spectrum Sharing (DSS) & 5G NR Offloading**:
  - Deploy 5G NR Band n40 (100 MHz) to absorb high-bandwidth video and data traffic.
- **Step 3: Scheduler Weight & Admission Control**:
  - Adjust Downlink Proportional Fair scheduler coefficients ($\alpha$ parameter).
  - Tune Admission Control thresholds to avoid radio link starvation for connected users.