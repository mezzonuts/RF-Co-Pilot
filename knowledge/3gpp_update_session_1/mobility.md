# Layer 3 RRC Mobility, Handover Events, SIB Broadcasting & NAS Procedures

## 1. Handover Measurement Events (3GPP TS 36.331 / TS 38.331)

### A. Intra-LTE & Inter-Frequency Measurement Events
- **Event A1**: Serving cell becomes better than absolute threshold:
  $$M_{Serv} - Hyst > Thresh$$
  - Action: Deactivate inter-frequency/inter-RAT measurements to conserve UE battery.
- **Event A2**: Serving cell becomes worse than absolute threshold:
  $$M_{Serv} + Hyst < Thresh$$
  - Action: Activate measurement gaps and search neighbor carriers/RATs.
- **Event A3**: Neighbor cell becomes offset better than Serving cell:
  $$M_{Neigh} + Ofn + Ocn - Hyst > M_{Serv} + Ofs + Ocs + Off$$
  - Action: Trigger intra-frequency / inter-frequency handover.
- **Event A4**: Neighbor cell becomes better than absolute threshold.
- **Event A5**: Serving cell becomes worse than $Thresh_1$ AND Neighbor cell becomes better than $Thresh_2$:
  $$M_{Serv} + Hyst < Thresh_1 \quad \text{AND} \quad M_{Neigh} - Hyst > Thresh_2$$
  - Action: Trigger inter-frequency handover in coverage-edge scenarios.

### B. Inter-RAT (LTE to NR / 3G) Measurement Events
- **Event B1**: Inter-RAT Neighbor becomes better than absolute threshold (Triggers 5G NSA SgNB Addition).
- **Event B2**: Serving LTE cell becomes worse than $Thresh_1$ AND Inter-RAT Neighbor becomes better than $Thresh_2$ (Triggers Inter-RAT Handover).

---

## 2. Handover Failure RCA & Optimization Playbook

### A. Too Late Handover
- **Diagnostic Criteria**: RLF occurs in serving cell during channel degradation before UE receives `RRCConnectionReconfiguration (mobilityControlInfo)`. UE re-establishes in neighbor cell.
- **Remediation**:
  1. Reduce `timeToTrigger` (TTT) (e.g., from 320ms to 100ms).
  2. Lower `a3-Offset` and `hysteresis`.
  3. Increase Cell Individual Offset (`CIO`) of the target cell.

### B. Too Early Handover
- **Diagnostic Criteria**: Handover executes successfully, but UE immediately suffers RLF in target cell ($< 1\text{ second}$) and re-establishes back in source cell.
- **Remediation**:
  1. Increase `timeToTrigger` (TTT).
  2. Increase `hysteresis` to avoid triggering on momentary signal peaks.

### C. Handover to Wrong Cell
- **Diagnostic Criteria**: Handover executes to Cell B, but fails immediately and re-establishes in Cell C.
- **Remediation**: Audit neighbor relations (ANR) and correct neighbor cell priorities.

---

## 3. System Information Blocks (SIB) Breakdown

- **MasterInformationBlock (MIB)**: Broadcasts DL bandwidth, PHICH configuration, and System Frame Number (SFN) on PBCH.
- **SIB1 (Cell Access & PLMN)**:
  - Broadcasts `plmn-IdentityList`, `trackingAreaCode` (TAC), `cellIdentity`.
  - Defines cell selection criteria $S_{rxlev} > 0$ via `q-RxLevMin` and `q-RxLevMinOffset`.
  - Broadcasts `cellBarred` and `cellReservedForOperatorUse`.
- **SIB2 (Radio Resource Configuration)**:
  - Broadcasts `referenceSignalPower`, PRACH configuration (`prach-Config`), and UL bandwidth.
- **SIB3 / SIB4 / SIB5**:
  - Cell reselection parameters for intra-frequency, inter-frequency, and inter-RAT neighbors.

---

## 4. NAS (Non-Access Stratum) EMM & 5GMM Reject Causes (TS 24.301 / TS 24.501)

| Reject Cause Code | NAS Cause Description | Root Cause Mechanism | Resolution Playbook |
|---|---|---|---|
| **Cause #15** | *No Suitable Cells In tracking area* | UE is forbidden from camping in this specific TAC (roaming/MOCN boundary issue). | Audit TAC broadcast in SIB1 and check HSS/UDM roaming profiles. |
| **Cause #19** | *ESM failure / PDU Session rejected* | Core network rejected default bearer setup (APN/DNN string mismatch or missing QoS profile). | Verify APN profile string on UE and PGW/SMF subscription tables. |
| **Cause #7** | *EPS / 5GS services not allowed* | Core network rejected SIM credentials (invalid subscription or blacklisted IMEI). | Check EIR equipment blacklist and HSS/UDM authentication parameters. |
| **Cause #9** | *UE identity cannot be derived* | MME/AMF failed to resolve IMSI from GUTI provided by UE during Attach/TAU. | Audit S10 / N26 inter-core interfaces and enforce IMSI identity request fallback. |

---

## 5. 5G NSA (EN-DC Option 3X) SgNB Addition Sequence (3GPP TS 37.340)
1. **Measurement Trigger**: MeNB (LTE Anchor) configures B1 measurement event on UE.
2. **Measurement Report**: UE detects 5G NR (n40/n1) and sends `MeasurementReport` (Event B1).
3. **SgNB Addition Request**: MeNB sends `SgNB Addition Request` to gNodeB over X2-C interface.
4. **SgNB Addition Acknowledge**: gNodeB allocates radio resources and responds with `SgNB Addition Request Acknowledge` containing NR RRC configuration.
5. **RRC Connection Reconfiguration**: MeNB forwards NR configuration to UE via LTE RRC.
6. **Reconfiguration Complete**: UE applies config and sends `RRCConnectionReconfigurationComplete` to MeNB.
7. **Random Access (RACH)**: UE performs RACH to gNodeB to synchronize Uplink timing.