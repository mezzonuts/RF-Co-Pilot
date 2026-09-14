# VoLTE / VoNR Audio Quality KPIs, MOS Degradation & Jitter Analysis (3GPP TS 26.114)

## 1. Mean Opinion Score (MOS) Evaluation Standards
- **Evaluation Scale**: Continuous range from $1.0$ (Unacceptable) to $5.0$ (Excellent).
- **Commercial Benchmark Targets**:
  - Target MOS $\ge 3.8$: For AMR-WB codec ($12.65\text{ kbps}$ or $23.85\text{ kbps}$).
  - Target MOS $\ge 4.1$: For Enhanced Voice Services (EVS) codec.

---

## 2. Root Cause Analysis for Audio Degradation

- **Factor 1: Packet Loss Rate (PLR)**:
  - Threshold: Degradation occurs when PLR $> 2\%$.
  - Impact: Causes speech clipping, metallic distortion, and missing syllables.
  - Root Cause: Radio link retransmissions exhausted or PDCP queue discards.

- **Factor 2: Packet Delay Variation (Jitter)**:
  - Threshold: Degradation occurs when Jitter $> 30\text{ ms}$.
  - Impact: Exceeds the adaptive window of the UE Jitter Buffer Management (JBM), causing buffer under-runs and forced packet drops.
  - Root Cause: Transport network queue congestion or bursty Downlink scheduling.

- **Factor 3: QCI 1 / 5QI 1 Bearer Misconfiguration**:
  - Requirement: Voice media MUST be mapped to QCI 1 (4G) or 5QI 1 (5G) with Guaranteed Bit Rate (GBR).
  - Impact: If incorrectly assigned to Non-GBR (QCI 9), voice packets are scheduled with low priority behind bulk TCP data.

- **Factor 4: ROHC (Robust Header Compression) Disabled**:
  - Impact: Uncompressed IP/UDP/RTP headers consume up to 60 bytes for a 31-byte voice payload, wasting over $50\%$ of PRB capacity.