# Layer 2 Protocol Stack, Scheduler Mechanics, HARQ/RLC, and QoS Architecture

## 1. Radio Scheduler Algorithms Comparison

| Scheduler Type | Allocation Metric Formula | Pros | Cons | Use Case |
|---|---|---|---|---|
| **Round Robin (RR)** | Equal resource allocation ($1/N$) | 100% user fairness | Degrades total cell capacity | Benchmarking / Lab tests |
| **Max C/I (Max Rate)** | $\arg\max_k (R_k)$ | Maximizes aggregate cell throughput | Starves cell-edge users | Throughput demo sites |
| **Proportional Fair (PF)** | $\arg\max_k \left( \frac{R_k(t)}{T_k(t)}^\alpha \right)$ | Optimal balance between throughput and user fairness | Higher computational complexity | Default commercial 4G/5G deployment |

- $R_k(t)$: Instantaneous data rate based on CQI/SINR at time $t$.
- $T_k(t)$: Historical average throughput of user $k$.

---

## 2. Layer 2 Sublayers Deep Dive: MAC, RLC, PDCP

### A. MAC Sublayer & HARQ Mechanics (3GPP TS 36.321 / TS 38.321)
- **Functions**: Uplink/Downlink scheduling, Buffer Status Report (BSR) handling, Power Headroom Report (PHR) evaluation, HARQ process management.
- **HARQ Operation**: Fast Stop-and-Wait protocol (8 processes in FDD, up to 16 in TDD).
- **Target BLER**: Target first-transmission residual BLER is tuned to **10%**.
- **Soft Combining**: Incremental Redundancy (IR) transmitting new parity bits vs Chase Combining (CC) repeating identical bits.

### B. RLC Sublayer Modes & Parameters (3GPP TS 36.322 / TS 38.322)
- **RLC AM (Acknowledged Mode)**: Lossless transmission for signaling and data. Triggered when HARQ exhausts retransmissions.
  - `t-PollRetransmit`: Timer waiting for Status PDU from receiver.
  - `pollPDU` / `pollByte`: Frequency threshold for requesting receiver status reports.
  - `maxRetxThreshold`: Maximum allowed RLC retransmissions (e.g., 4, 8, 16, 32). Exceeding this threshold triggers **Radio Link Failure (RLF)** to RRC.
  - `t-Reordering`: Timer preventing out-of-order delivery to PDCP.
- **RLC UM (Unacknowledged Mode)**: No ARQ retransmission; used for delay-sensitive real-time services (VoLTE audio, video streaming).
- **RLC TM (Transparent Mode)**: No headers; used for BCCH/PCCH broadcasting (MIB, SIB, Paging).

### C. PDCP Sublayer Features (3GPP TS 36.323 / TS 38.323)
- **PDCP Discard Timer**:
  - Starts upon packet arrival in PDCP buffer.
  - When timer expires (e.g., $100\text{ ms}$ for VoLTE QCI 1, $500\text{ ms}$ for default data), the PDCP layer discards the stale packet to prevent radio buffer bloat.
- **Robust Header Compression (ROHC)**:
  - Compresses 40-byte IPv4/UDP/RTP or 60-byte IPv6/UDP/RTP headers down to **2–4 bytes**.
  - Reduces packet overhead for AMR-WB voice payloads ($31\text{ bytes}$) by $> 50\%$.

---

## 3. Dynamic Scheduling Grants: DCI, BSR & PHR

### A. Downlink Control Information (DCI) Formats (3GPP TS 36.212 / TS 38.212)
- **DCI Format 0 / 0_0 / 0_1**: Carries Uplink scheduling grant (PRB allocation, MCS, PUSCH power control).
- **DCI Format 1A / 1_0 / 1_1**: Carries Downlink scheduling assignment (PRB allocation, MCS, HARQ process ID, RV).
- **DCI Format 2 / 2_0 / 2_1**: MIMO transmission modes, dynamic slot format indicator.

### B. Uplink Reporting Mechanisms
- **Buffer Status Report (BSR)**: UE informs eNodeB/gNodeB how much data is pending in Uplink L2 buffers (Logical Channel Groups 0–3).
- **Power Headroom Report (PHR)**: UE reports remaining transmit power margin before reaching $P_{CMAX}$ (Uplink power ceiling).

---

## 4. 5G QoS Architecture & SDAP Flow Mapping (3GPP TS 23.501 & TS 37.324)
- **SDAP (Service Data Adaptation Protocol)**: Maps 5G QoS Flows to Data Radio Bearers (DRB) and marks QoS Flow IDs (QFI) in Downlink/Uplink packets.

| Bearer Type | QCI (4G) | 5QI (5G) | Resource Type | Priority | Packet Delay Budget | Packet Error Rate | Example Service |
|---|---|---|---|---|---|---|---|
| **Voice** | 1 | 1 | GBR | 2 | 100 ms | $10^{-2}$ | VoLTE / VoNR Voice Call |
| **Video Live** | 2 | 2 | GBR | 4 | 150 ms | $10^{-3}$ | Live Interactive Video Streaming |
| **IMS Signaling**| 5 | 5 | Non-GBR | 1 | 100 ms | $10^{-6}$ | SIP Register, SIP Invite |
| **Default Data** | 9 | 9 | Non-GBR | 9 | 300 ms | $10^{-6}$ | General Web Browsing, TCP Traffic |