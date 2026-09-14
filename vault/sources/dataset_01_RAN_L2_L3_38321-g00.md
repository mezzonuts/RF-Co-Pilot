---
title: "Training Dataset: 38321-g00"
type: source
source_file: "38321-g00.txt"
category: "01_RAN_L2_L3"
tags: ["3gpp", "dataset", "training", "01_ran_l2_l3"]
---
3GPP TS 38.321 V16.0.0 (2020-03)
Technical Specification
3rd Generation Partnership Project;
Technical Specification Group Radio Access Network;
NR;
Medium Access Control (MAC) protocol specification
(Release 16)
	
The present document has been developed within the 3rd Generation Partnership Project (3GPP TM) and may be further elaborated for the purposes of 3GPP.
The present document has not been subject to any approval process by the 3GPP Organizational Partners and shall not be implemented.
This Specification is provided for future development work within 3GPP only. The Organizational Partners accept no liability for any use of this Specification.
Specifications and Reports for implementation of the 3GPP TM system should be obtained via the 3GPP Organizational Partners' Publications Offices.
3GPP
Postal address
3GPP support office address
650 Route des Lucioles - Sophia Antipolis
Valbonne - FRANCE
Tel.: +33 4 92 94 42 00 Fax: +33 4 93 65 47 16
Internet
http://www.3gpp.org
Copyright Notification
No part may be reproduced except as authorized by written permission.
The copyright and the foregoing restriction extend to reproduction in all media.
© 2020, 3GPP Organizational Partners (ARIB, ATIS, CCSA, ETSI, TSDSI, TTA, TTC).
All rights reserved.
UMTS™ is a Trade Mark of ETSI registered for the benefit of its members
3GPP™ is a Trade Mark of ETSI registered for the benefit of its Members and of the 3GPP Organizational Partners
LTE™ is a Trade Mark of ETSI registered for the benefit of its Members and of the 3GPP Organizational Partners
GSM® and the GSM logo are registered and owned by the GSM Association
Contents
Foreword	7
1	Scope	8
2	References	8
3	Definitions, symbols and abbreviations	9
3.1	Definitions	9
3.2	Abbreviations	10
4	General	11
4.1	Introduction	11
4.2	MAC architecture	11
4.2.1	General	11
4.2.2	MAC Entities	11
4.3	Services	13
4.3.1	Services provided to upper layers	13
4.3.2	Services expected from physical layer	13
4.4	Functions	13
4.5	Channel structure	14
4.5.1	General	14
4.5.2	Transport Channels	14
4.5.3	Logical Channels	14
4.5.4	Mapping of Transport Channels to Logical Channels	15
4.5.4.1	General	15
4.5.4.2	Uplink mapping	15
4.5.4.3	Downlink mapping	15
4.5.4.4	Sidelink mapping	15
5	MAC procedures	16
5.1	Random Access procedure	16
5.1.1	Random Access procedure initialization	16
5.1.1a	Initialization of variables specific to Random Access type	20
5.1.2	Random Access Resource selection	21
5.1.2a	Random Access Resource selection for 2-step RA type	24
5.1.3	Random Access Preamble transmission	26
5.1.3a	MSGA transmission	26
5.1.4	Random Access Response reception	27
5.1.4a	MSGB reception and contention resolution for 2-step RA type	29
5.1.5	Contention Resolution	32
5.1.6	Completion of the Random Access procedure	34
5.2	Maintenance of Uplink Time Alignment	34
5.3	DL-SCH data transfer	36
5.3.1	DL Assignment reception	36
5.3.2	HARQ operation	37
5.3.2.1	HARQ Entity	37
5.3.2.2	HARQ process	38
5.3.3	Disassembly and demultiplexing	39
5.4	UL-SCH data transfer	39
5.4.1	UL Grant reception	39
5.4.2	HARQ operation	42
5.4.2.1	HARQ Entity	42
5.4.2.2	HARQ process	45
5.4.3	Multiplexing and assembly	46
5.4.3.1	Logical Channel Prioritization	46
5.4.3.1.1	General	46
5.4.3.1.2	Selection of logical channels	47
5.4.3.1.3	Allocation of resources	47
5.4.3.2	Multiplexing of MAC Control Elements and MAC SDUs	49
5.4.4	Scheduling Request	49
5.4.5	Buffer Status Reporting	51
5.4.6	Power Headroom Reporting	54
5.5	PCH reception	56
5.6	BCH reception	56
5.7	Discontinuous Reception (DRX)	56
5.8	Transmission and reception without dynamic scheduling	60
5.8.1	Downlink	60
5.8.2	Uplink	60
5.8.3	Sidelink	62
5.9	Activation/Deactivation of SCells	63
5.10	Activation/Deactivation of PDCP duplication	65
5.11	MAC reconfiguration	66
5.12	MAC Reset	66
5.13	Handling of unknown, unforeseen and erroneous protocol data	66
5.14	Handling of measurement gaps	67
5.15	Bandwidth Part (BWP) operation	67
5.15.1	Downlink and Uplink	67
5.15.2	Sidelink	70
5.16	SUL operation	70
5.17	Beam Failure Detection and Recovery procedure	71
5.18	Handling of MAC CEs	72
5.18.1	General	72
5.18.2	Activation/Deactivation of Semi-persistent CSI-RS/CSI-IM resource set	73
5.18.3	Aperiodic CSI Trigger State Subselection	73
5.18.4	Activation/Deactivation of UE-specific PDSCH TCI state	73
5.18.5	Indication of TCI state for UE-specific PDCCH	73
5.18.6	Activation/Deactivation of Semi-persistent CSI reporting on PUCCH	74
5.18.7	Activation/Deactivation of Semi-persistent SRS	74
5.18.8	Activation/Deactivation of spatial relation of PUCCH resource	74
5.18.9	Activation/Deactivation of semi-persistent ZP CSI-RS resource set	74
5.18.10	Recommended Bit Rate	74
5.18.11	Enhanced Activation/Deactivation of UE-specific PDSCH TCI state	75
5.18.12	Activation/Deactivation of enhanced spatial relation of PUCCH resource	75
5.18.13	Indication of spatial relation of Aperiodic SRS	76
5.18.14	Activation/Deactivation of Pathloss Reference RS of SRS	76
5.18.15	Activation/Deactivation of Pathloss Reference RS of PUSCH	76
5.18.16	Activation/Deactivation of SRS resource for CC list	76
5.18.17	Activation/Deactivation of Semi-persistent Positioning SRS	76
5.19	Data inactivity monitoring	77
5.20	Guard symbols for IAB	77
5.21	LBT operation	78
5.21.1	General	78
5.21.2	LBT failure detection and recovery procedure	78
5.22	SL-SCH Data transfer	79
5.22.1	SL-SCH Data transmission	79
5.22.1.1	SL Grant reception and SCI transmission	79
5.22.1.2	TX resource (re-)selection check	83
5.22.1.3	Sidelink HARQ operation	84
5.22.1.3.1	Sidelink HARQ Entity	84
5.22.1.3.2	PSFCH reception	85
5.22.1.4	Multiplexing and assembly	85
5.22.1.4.1	Logical channel prioritization	86
5.22.1.4.1.1	General	86
5.22.1.4.1.2	Selection of logical channels	86
5.22.1.4.1.3	Allocation of sidelink resources	87
5.22.1.4.2	Multiplexing of MAC SDUs	87
5.22.1.5	Scheduling Request	87
5.22.1.6	Buffer Status Reporting	88
5.22.1.7	CSI Reporting	90
5.22.2	SL-SCH Data reception	90
5.22.2.1	SCI reception	90
5.22.2.2	Sidelink HARQ operation	91
5.22.2.2.1	Sidelink HARQ Entity	91
5.22.2.2.2	Sidelink process	91
5.22.2.3	Disassembly and demultiplexing	92
5.23	SL-BCH data transfer	92
5.23.1	SL-BCH data transmission	92
5.23.2	SL-BCH data reception	92
6	Protocol Data Units, formats and parameters	93
6.1	Protocol Data Units	93
6.1.1	General	93
6.1.2	MAC PDU (DL-SCH and UL-SCH except transparent MAC and Random Access Response)	93
6.1.3	MAC Control Elements (CEs)	96
6.1.3.1	Buffer Status Report MAC CEs	96
6.1.3.2	C-RNTI MAC CE	100
6.1.3.3	UE Contention Resolution Identity MAC CE	100
6.1.3.4	Timing Advance Command MAC CE	100
6.1.3.4a	Absolute Timing Advance Command MAC CE	101
6.1.3.5	DRX Command MAC CE	101
6.1.3.6	Long DRX Command MAC CE	101
6.1.3.7	Configured Grant Confirmation MAC CE	101
6.1.3.8	Single Entry PHR MAC CE	101
6.1.3.9	Multiple Entry PHR MAC CE	102
6.1.3.10	SCell Activation/Deactivation MAC CEs	105
6.1.3.11	Duplication Activation/Deactivation MAC CE	106
6.1.3.12	SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE	106
6.1.3.13	Aperiodic CSI Trigger State Subselection MAC CE	107
6.1.3.14	TCI States Activation/Deactivation for UE-specific PDSCH MAC CE	108
6.1.3.15	TCI State Indication for UE-specific PDCCH MAC CE	109
6.1.3.16	SP CSI reporting on PUCCH Activation/Deactivation MAC CE	109
6.1.3.17	SP SRS Activation/Deactivation MAC CE	110
6.1.3.18	PUCCH spatial relation Activation/Deactivation MAC CE	111
6.1.3.19	SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE	112
6.1.3.20	Recommended bit rate MAC CE	112
6.1.3.21	Timing Delta MAC CE	113
6.1.3.22	Guard Symbols MAC CE	114
6.1.3.23	BFR MAC CEs	114
6.1.3.24	Enhanced TCI States Activation/Deactivation for UE-specific PDSCH MAC CE	116
6.1.3.25	Enhanced PUCCH spatial relation Activation/Deactivation MAC CE	116
6.1.3.26	AP SRS spatial relation Indication MAC CE	117
6.1.3.27	SRS Pathloss Reference RS Activation/Deactivation MAC CE	118
6.1.3.28	PUSCH Pathloss Reference RS Activation/Deactivation MAC CE	119
6.1.3.29	CC list-based SRS Activation/Deactivation MAC CE	119
6.1.3.30	LBT failure MAC CE	119
6.1.3.31	Multiple Entry Configured Grant Confirmation MAC CE	120
6.1.3.32	Duplication RLC Activation/Deactivation MAC CE	120
6.1.3.33	Sidelink Buffer Status Report MAC CEs	121
6.1.3.34	Sidelink Configured Grant Confirmation MAC CE	122
6.1.3.35	Sidelink CSI Reporting MAC CE	122
6.1.3.36	SP Positioning SRS Activation/Deactivation MAC CE	123
6.1.4	MAC PDU (transparent MAC)	125
6.1.5	MAC PDU (Random Access Response)	126
6.1.5a	MAC PDU (MSGB)	126
6.1.6	MAC PDU (SL-SCH)	128
6.2	Formats and parameters	129
6.2.1	MAC subheader for DL-SCH and UL-SCH	129
6.2.2	MAC subheader for Random Access Response	131
6.2.2a	MAC subheader for MSGB	132
6.2.3	MAC payload for Random Access Response	132
6.2.3a	MAC payload for MSGB	133
6.2.4	MAC subheader for SL-SCH	134
7	Variables and constants	135
7.1	RNTI values	135
7.2	Backoff Parameter values	136
7.3	DELTA_PREAMBLE values	137
7.4	PRACH Mask Index values	138
Annex A (informative): Change history	139
Foreword
This Technical Specification has been produced by the 3rd Generation Partnership Project (3GPP).
The contents of the present document are subject to continuing work within the TSG and may change following formal TSG approval. Should the TSG modify the contents of the present document, it will be re-released by the TSG with an identifying change of release date and an increase in version number as follows:
Version x.y.z
where:
x	the first digit:
1	presented to TSG for information;
2	presented to TSG for approval;
3	or greater indicates TSG approved document under change control.
y	the second digit is incremented for all changes of substance, i.e. technical enhancements, corrections, updates, etc.
z	the third digit is incremented when editorial only changes have been incorporated in the document.
1	Scope
The present document specifies the NR MAC protocol.
2	References
The following documents contain provisions which, through reference in this text, constitute provisions of the present document.
-	References are either specific (identified by date of publication, edition number, version number, etc.) or non-specific.
-	For a specific reference, subsequent revisions do not apply.
-	For a non-specific reference, the latest version applies. In the case of a reference to a 3GPP document (including a GSM document), a non-specific reference implicitly refers to the latest version of that document in the same Release as the present document.
[1]	3GPP TR 21.905: "Vocabulary for 3GPP Specifications".
[2]	3GPP TS 38.300: "NR; Overall description; Stage 2".
[3]	3GPP TS 38.322: "NR; Radio Link Control (RLC) protocol specification".
[4]	3GPP TS 38.323: "NR; Packet Data Convergence Protocol (PDCP) protocol specification".
[5]	3GPP TS 38.331: "NR; Radio Resource Control (RRC); Protocol specification".
[6]	3GPP TS 38.213: "NR; Physical Layer Procedures for control".
[7]	3GPP TS 38.214: "NR; Physical Layer Procedures for data".
[8]	3GPP TS 38.211: "NR; Physical channels and modulation".
[9]	3GPP TS 38.212: "NR; Multiplexing and channel coding".
[10]	Void.
[11]	3GPP TS 38.133: "NR; Requirements for support of radio resource management".
[12]	3GPP TS 36.133: "Evolved Universal Terrestrial Radio Access (E-UTRA); Requirements for support of radio resource management".
[13]	3GPP TS 26.114: "Technical Specification Group Services and System Aspects; IP Multimedia Subsystem (IMS); Multimedia Telephony; Media handling and interaction".
[14]	3GPP TS 38.101-1: "NR; User Equipment (UE) radio transmission and reception; Part 1: Range 1 Standalone".
[15]	3GPP TS 38.101-2: "NR; User Equipment (UE) radio transmission and reception; Part 2: Range 2 Standalone".
[16]	3GPP TS 38.101-3: "NR; User Equipment (UE) radio transmission and reception; Part 3: Range 1 and Range 2 Interworking operation with other radios".
[17]	3GPP TS 36.213: "Evolved Universal Terrestrial Radio Access (E-UTRA); Physical Layer Procedures".
[18]	3GPP TS 37.213: "Physical layer procedures for shared spectrum channel access".
[19]	3GPP TS 23.287: "Architecture enhancements for 5G System (5GS) to support Vehicle-to-Everything (V2X) services ".
[20]	3GPP TS 23.285: "Architecture enhancements for V2X services".
[21]	3GPP TS 36.331: "Evolved Universal Terrestrial Radio Access (E-UTRA); Radio Resource Control (RRC); Protocol specification".
[22]	3GPP TS 36.321: "Evolved Universal Terrestrial Radio Access (E-UTRA); Medium Access Control (MAC); Protocol specification".
[23]	3GPP TS 37.355: "Evolved Universal Terrestrial Radio Access (E-UTRA); LTE Positioning Protocol (LPP)".
3	Definitions, symbols and abbreviations
3.1	Definitions
For the purposes of the present document, the terms and definitions given in TR 21.905 [1] and the following apply. A term defined in the present document takes precedence over the definition of the same term, if any, in TR 21.905 [1].
Dormant BWP: The dormant BWP is one of downlink BWPs configured by the network via dedicated RRC signaling. In the dormant BWP, the UE stop monitoring PDCCH on/for the SCell, but continues performing CSI measurements, Automatic Gain Control (AGC) and beam management, if configured.
HARQ information: HARQ information for DL-SCH, for UL-SCH, or for SL-SCH transmissions consists of New Data Indicator (NDI), Transport Block size (TBS), Redundancy Version (RV), and HARQ process ID.
IAB-donor: gNB that provides network access to UEs via a network of backhaul and access links.
IAB-node: RAN node that supports NR access links to UEs and NR backhaul links to parent nodes and child nodes.
Listen Before Talk: A procedure according to which transmissions are not performed if the channel is identified as being occupied, see TS 37.213 [18].
Msg3: Message transmitted on UL-SCH containing a C-RNTI MAC CE or CCCH SDU, submitted from upper layer and associated with the UE Contention Resolution Identity, as part of a Random Access procedure.
NR backhaul link: NR link used for backhauling between an IAB-node and an IAB-donor-gNB, and between IAB-nodes in case of a multi-hop backhauling.
NR sidelink communication: AS functionality enabling at least V2X Communication as defined in TS 23.287 [19], between two or more nearby UEs, using NR technology but not traversing any network node.
PDCCH occasion: A time duration (i.e. one or a consecutive number of symbols) during which the MAC entity is configured to monitor the PDCCH.
Serving Cell: A PCell, a PSCell, or an SCell in TS 38.331 [5].
Sidelink transmission information: Sidelink transmission information included in a SCI for a SL-SCH transmission consists of Sidelink HARQ information including NDI, RV, Sidelink process ID, Source Layer-1 ID and Destination Layer-1 ID, and Sidelink QoS information including a priority, a communication range and location information.
Special Cell: For Dual Connectivity operation the term Special Cell refers to the PCell of the MCG or the PSCell of the SCG depending on if the MAC entity is associated to the MCG or the SCG, respectively. Otherwise the term Special Cell refers to the PCell. A Special Cell supports PUCCH transmission and contention-based Random Access, and is always activated.
Timing Advance Group: A group of Serving Cells that is configured by RRC and that, for the cells with a UL configured, using the same timing reference cell and the same Timing Advance value. A Timing Advance Group containing the SpCell of a MAC entity is referred to as Primary Timing Advance Group (PTAG), whereas the term Secondary Timing Advance Group (STAG) refers to other TAGs.
V2X sidelink communication: AS functionality enabling V2X Communication as defined in TS 23.285 [20], between nearby UEs, using E-UTRA technology but not traversing any network node.
NOTE:	A timer is running once it is started, until it is stopped or until it expires; otherwise it is not running. A timer can be started if it is not running or restarted if it is running. A Timer is always started or restarted from its initial value. The duration of a timer is not updated until they are stopped or expires (e.g. due to BWP switching).
3.2	Abbreviations
For the purposes of the present document, the abbreviations given in TR 21.905 [1] and the following apply. An abbreviation defined in the present document takes precedence over the definition of the same abbreviation, if any, in TR 21.905 [1].
AP	Aperiodic
BFR	Beam Failure Recovery
BSR	Buffer Status Report
BWP	Bandwidth Part
CE	Control Element
CG	Cell Group
CI-RNTI	Cancellation Indication RNTI
CSI	Channel State Information
CSI-IM	CSI Intereference Measurement
CSI-RS	CSI Reference Signal
CS-RNTI	Configured Scheduling RNTI
DAPS	Dual Active Protocol Stack
DCP	DCI with CRC scrambled by PS-RNTI
DL-PRS	DownLink-Positioning Reference Signal
IAB	Integrated Access and Backhaul
INT-RNTI	Interruption RNTI
LBT	Listen Before Talk
LCG	Logical Channel Group
LCP	Logical Channel Prioritization
MCG	Master Cell Group
NUL	Normal Uplink
NZP CSI-RS	Non-Zero Power CSI-RS
PDB	Packet Delay Budget
PHR	Power Headroom Report
PS-RNTI	Power Saving RNTI
PTAG	Primary Timing Advance Group
QCL	Quasi-colocation
RS	Reference Signal
SCG	Secondary Cell Group
SFI-RNTI	Slot Format Indication RNTI
SI	System Information
SL-RNTI	Sidelink RNTI
SLCS-RNTI	Sidelink Configured Scheduling RNTI
SpCell	Special Cell
SP	Semi-Persistent
SP-CSI-RNTI	Semi-Persistent CSI RNTI
SPS	Semi-Persistent Scheduling
SR	Scheduling Request
SS	Synchronization Signals
SSB	Synchronization Signal Block
STAG	Secondary Timing Advance Group
SUL	Supplementary Uplink
TAG	Timing Advance Group
TCI	Transmission Configuration Indicator
TPC-SRS-RNTI	Transmit Power Control-Sounding Reference Symbols-RNTI
UCI	Uplink Control Information
V2X	Vehicle-to-Everything
ZP CSI-RS	Zero Power CSI-RS
4	General
4.1	Introduction
The objective of this clause is to describe the MAC architecture and the MAC entity of the UE from a functional point of view.
4.2	MAC architecture
4.2.1	General
This clause describes a model of the MAC i.e. it does not specify or restrict implementations.
RRC is in control of the MAC configuration.
4.2.2	MAC Entities
The MAC entity of the UE handles the following transport channels:
-	Broadcast Channel (BCH);
-	Downlink Shared Channel(s) (DL-SCH);
-	Paging Channel (PCH);
-	Uplink Shared Channel(s) (UL-SCH);
-	Random Access Channel(s) (RACH).
When the UE is configured with SCG, two MAC entities are configured to the UE: one for the MCG and one for the SCG.
When the UE is configured with DAPS handover, two MAC entities are used by the UE: one for the source cell (source MAC entity) and one for the target cell (target MAC entity).
The functions of the different MAC entities in the UE operate independently unless otherwise specified. The timers and parameters used in each MAC entity are configured independently unless otherwise specified. The Serving Cells, C-RNTI, radio bearers, logical channels, upper and lower layer entities, LCGs, and HARQ entities considered by each MAC entity refer to those mapped to that MAC entity unless otherwise specified.
If the MAC entity is configured with one or more SCells, there are multiple DL-SCH and there may be multiple UL-SCH as well as multiple RACH per MAC entity; one DL-SCH, one UL-SCH, and one RACH on the SpCell, one DL-SCH, zero or one UL-SCH and zero or one RACH for each SCell.
If the MAC entity is not configured with any SCell, there is one DL-SCH, one UL-SCH, and one RACH per MAC entity.
Figure 4.2.2-1 illustrates one possible structure of the MAC entity when SCG is not configured and for each MAC entity during DAPS handover.
Editor's Note: FFS which functions will be supported by the source and target MAC entity in DAPS HO.
Figure 4.2.2-1: MAC structure overview
Figure 4.2.2-2 illustrates one possible structure for the MAC entities when MCG and SCG are configured.
Figure 4.2.2-2: MAC structure overview with two MAC entities
In addition, the MAC entity of the UE handles the following transport channel for sidelink:
-	Sidelink Shared Channel (SL-SCH);
-	Sidelink Broadcast Channel (SL-BCH).
Figure 4.2.2-3 illustrates one possible structure for the MAC entity when sidelink is configured.
Figure 4.2.2-3: MAC structure overview for sidelink
4.3	Services
4.3.1	Services provided to upper layers
The MAC sublayer provides the following services to upper layers:
-	data transfer;
-	radio resource allocation.
4.3.2	Services expected from physical layer
The MAC sublayer expects the following services from the physical layer:
-	data transfer services;
-	signalling of HARQ feedback;
-	signalling of Scheduling Request;
-	measurements (e.g. Channel Quality Indication (CQI)).
4.4	Functions
The MAC sublayer supports the following functions:
-	mapping between logical channels and transport channels;
-	multiplexing of MAC SDUs from one or different logical channels onto transport blocks (TB) to be delivered to the physical layer on transport channels;
-	demultiplexing of MAC SDUs to one or different logical channels from transport blocks (TB) delivered from the physical layer on transport channels;
-	scheduling information reporting;
-	error correction through HARQ;
-	logical channel prioritisation;
-	priority handling between overlapping resources of one UE;
-	radio resource selection.
The relevance of MAC functions for uplink and downlink is indicated in Table 4.4-1.
Table 4.4-1: The link direction association of MAC functions.
4.5	Channel structure
4.5.1	General
The MAC sublayer operates on the channels defined below; transport channels are SAPs between MAC and Layer 1, logical channels are SAPs between MAC and RLC.
4.5.2	Transport Channels
The MAC sublayer uses the transport channels listed in Table 4.5.2-1 below.
Table 4.5.2-1: Transport channels used by MAC
4.5.3	Logical Channels
The MAC sublayer provides data transfer services on logical channels. To accommodate different kinds of data transfer services, multiple types of logical channels are defined i.e. each supporting transfer of a particular type of information.
Each logical channel type is defined by what type of information is transferred.
The MAC sublayer provides the control and traffic channels listed in Table 4.5.3-1 below.
Table 4.5.3-1: Logical channels provided by MAC.
4.5.4	Mapping of Transport Channels to Logical Channels
4.5.4.1	General
The MAC entity is responsible for mapping logical channels onto transport channels. This mapping depends on the multiplexing that is configured by RRC.
4.5.4.2	Uplink mapping
The uplink logical channels can be mapped as described in Table 4.5.4.2-1.
Table 4.5.4.2-1: Uplink channel mapping.
4.5.4.3	Downlink mapping
The downlink logical channels can be mapped as described in Table 4.5.4.3-1.
Table 4.5.4.3-1: Downlink channel mapping.
4.5.4.4	Sidelink mapping
The sidelink logical channels can be mapped as described in Table 4.5.4.4-1.
Table 4.5.4.4-1: Sidelink channel mapping.
5	MAC procedures
5.1	Random Access procedure
5.1.1	Random Access procedure initialization
The Random Access procedure described in this clause is initiated by a PDCCH order, by the MAC entity itself, or by RRC for the events in accordance with TS 38.300 [2]. There is only one Random Access procedure ongoing at any point in time in a MAC entity. The Random Access procedure on an SCell shall only be initiated by a PDCCH order with ra-PreambleIndex different from 0b000000.
NOTE 1:	If a new Random Access procedure is triggered while another is already ongoing in the MAC entity, it is up to UE implementation whether to continue with the ongoing procedure or start with the new procedure (e.g. for SI request).
NOTE 2:	If there was an ongoing Random Access procedure that is triggered by a PDCCH order while the UE receives another PDCCH order indicating the same Random Access Preamble, PRACH mask index and uplink carrier, the Random Access procedure is considered as the same Random Access procedure as the ongoing one and not initialized again.
RRC configures the following parameters for the Random Access procedure:
-	prach-ConfigurationIndex: the available set of PRACH occasions for the transmission of the Random Access Preamble for Msg1. These are also applicable to the MSGA PRACH if the PRACH occasions are shared between 2-step and 4-step RA types;
-	msgA-prach-ConfigurationIndex: the available set of PRACH occasions for the transmission of the Random Access Preamble for MSGA in 2-step RA type;
-	preambleReceivedTargetPower: initial Random Access Preamble power;
-	rsrp-ThresholdSSB: an RSRP threshold for the selection of the SSB for 4-step RA type. If the Random Access procedure is initiated for beam failure recovery, rsrp-ThresholdSSB used for the selection of the SSB within candidateBeamRSList refers to rsrp-ThresholdSSB in BeamFailureRecoveryConfig IE;
-	rsrp-ThresholdCSI-RS: an RSRP threshold for the selection of CSI-RS for 4-step RA type. If the Random Access procedure is initiated for beam failure recovery, rsrp-ThresholdCSI-RS is equal to rsrp-ThresholdSSB in BeamFailureRecoveryConfig IE;
-	msgA-RSRP-ThresholdSSB: an RSRP threshold for the selection of the SSB for 2-step RA type. If the Random Access procedure is initiated for beam failure recovery, msgA-RSRP-ThresholdSSB used for the selection of the SSB within candidateBeamRSList refers to msgA-RSRP-ThresholdSSB in BeamFailureRecoveryConfig IE;
-	msgA-RSRP-ThresholdCSI-RS: an RSRP threshold for the selection of CSI-RS for 2-step RA type. If the Random Access procedure is initiated for beam failure recovery, msgA-RSRP-ThresholdCSI-RS is equal to msgA-RSRP-ThresholdSSB in BeamFailureRecoveryConfig IE;
-	rsrp-ThresholdSSB-SUL: an RSRP threshold for the selection between the NUL carrier and the SUL carrier;
-	msgA-RSRP-Threshold: an RSRP threshold for selection between 2-step RA type and 4-step RA type when both 2-step and 4-step RA type Random Access Resources are configured in the UL BWP for NUL;
-	msgA-RSRP-ThresholdSUL: an RSRP threshold for selection between 2-step RA type and 4-step RA type when both 2-step and 4-step RA type Random Access Resources are configured in the UL BWP for SUL;
-	msgA-TransMax: The maximum number of MSGA transmissions when both 4-step and 2-step RA type Random Access Resources are configured;
-	candidateBeamRSList: a list of reference signals (CSI-RS and/or SSB) identifying the candidate beams for recovery and the associated Random Access parameters;
-	recoverySearchSpaceId: the search space identity for monitoring the response of the beam failure recovery request;
-	powerRampingStep: the power-ramping factor;
-	msgA-PreamblePowerRampingStep: the power ramping factor for MSGA preamble;
-	powerRampingStepHighPriority: the power-ramping factor in case of prioritized Random Access procedure;
-	scalingFactorBI: a scaling factor for prioritized Random Access procedure;
-	ra-PreambleIndex: Random Access Preamble;
-	ra-ssb-OccasionMaskIndex: defines PRACH occasion(s) associated with an SSB in which the MAC entity may transmit a Random Access Preamble (see clause 7.4);
-	msgA-SSB-SharedRO-MaskIndex: Indicates the subset of 4-step RA type PRACH occasions shared with 2-step RA type PRACH occasions for each SSB. If 2-step RA type PRACH occasions are shared with 4-step RA type PRACH occasions and msgA-SSB-SharedRO-MaskIndex is not configured, then all 4-step RA type PRACH occasions are available for 2-step RA type (see clause 7.4);
-	ra-OccasionList: defines PRACH occasion(s) associated with a CSI-RS in which the MAC entity may transmit a Random Access Preamble;
-	ra-PreambleStartIndex: the starting index of Random Access Preamble(s) for on-demand SI request;
-	preambleTransMax: the maximum number of Random Access Preamble transmission;
-	ssb-perRACH-OccasionAndCB-PreamblesPerSSB: defines the number of SSBs mapped to each PRACH occasion for 4-step RA type and the number of contention-based Random Access Preambles mapped to each SSB;
-	msgA-SSB-PerRACH-OccasionAndCB-PreamblesPerSSB: defines the number of SSBs mapped to each PRACH occasion for 2-step RA type and the number of contention-based Random Access Preambles mapped to each SSB;
-	if groupBconfigured is configured, then Random Access Preambles group B is configured for 4-step RA type.
-	Amongst the contention-based Random Access Preambles associated with an SSB (as defined in TS 38.213 [6]), the first numberOfRA-PreamblesGroupA Random Access Preambles belong to Random Access Preambles group A. The remaining Random Access Preambles associated with the SSB belong to Random Access Preambles group B (if configured).
-	if groupB-ConfiguredTwoStepRA is configured, then Random Access Preambles group B is configured for 2-step RA type.
-	Amongst the contention-based Random Access Preambles for 2-step RA type associated with an SSB (as defined in TS 38.213 [6]), the first msgA-numberOfRA-PreamblesGroupA Random Access Preambles belong to Random Access Preambles group A. The remaining Random Access Preambles associated with the SSB belong to Random Access Preambles group B (if configured).
NOTE 2:	If Random Access Preambles group B is supported by the cell Random Access Preambles group B is included for each SSB.
-	if Random Access Preambles group B is configured for 4-step RA type:
-	ra-Msg3SizeGroupA: the threshold to determine the groups of Random Access Preambles for 4-step RA type;
-	msg3-DeltaPreamble: ∆PREAMBLE_Msg3 in TS 38.213 [6];
-	messagePowerOffsetGroupB: the power offset for preamble selection;
-	numberOfRA-PreamblesGroupA: defines the number of Random Access Preambles in Random Access Preamble group A for each SSB.
-	if Random Access Preambles group B is configured for 2-step RA type:
-	msgA-DeltaPreamble: ∆PREAMBLE_MsgA in TS 38.213 [6];
-	msgA-messagePowerOffsetGroupB: the power offset for preamble selection configured as messagePowerOffsetGroupB included in GroupB-ConfiguredTwoStepRA;
-	msgA-numberOfRA-PreamblesGroupA: defines the number of Random Access Preambles in Random Access Preamble group A for each SSB configured as numberofRA-PreamblesGroupA in GroupB-ConfiguredTwoStepRA.
-	ra-MsgASizeGroupA: the threshold to determine the groups of Random Access Preambles for 2-step RA type.
-	the set of Random Access Preambles and/or PRACH occasions for SI request, if any;
-	the set of Random Access Preambles and/or PRACH occasions for beam failure recovery request, if any;
-	the set of Random Access Preambles and/or PRACH occasions for reconfiguration with sync, if any;
-	ra-ResponseWindow: the time window to monitor RA response(s) (SpCell only);
-	ra-ContentionResolutionTimer: the Contention Resolution Timer (SpCell only);
-	msgB-ResponseWindow: the time window to monitor RA response(s) for 2-step RA type (SpCell only).
In addition, the following information for related Serving Cell is assumed to be available for UEs:
-	if Random Access Preambles group B is configured:
-	if the Serving Cell for the Random Access procedure is configured with supplementary uplink as specified in TS 38.331 [5], and SUL carrier is selected for performing Random Access Procedure:
-	PCMAX,f,c of the SUL carrier as specified in TS 38.101-1 [14], TS 38.101-2 [15], and TS 38.101-3 [16].
-	else:
-	PCMAX,f,c of the NUL carrier as specified in TS 38.101-1 [14], TS 38.101-2 [15], and TS 38.101-3 [16].
The following UE variables are used for the Random Access procedure:
-	PREAMBLE_INDEX;
-	PREAMBLE_TRANSMISSION_COUNTER;
-	PREAMBLE_POWER_RAMPING_COUNTER;
-	PREAMBLE_POWER_RAMPING_STEP;
-	PREAMBLE_RECEIVED_TARGET_POWER;
-	PREAMBLE_BACKOFF;
-	PCMAX;
-	SCALING_FACTOR_BI;
-	TEMPORARY_C-RNTI;
-	RA_TYPE;
-	POWER_OFFSET_2STEP_RA;
-	MSGA_PREAMBLE_POWER_RAMPING_STEP;
-	RSRP_THRESHOLD_RA_TYPE_SELECTION.
When the Random Access procedure is initiated on a Serving Cell, the MAC entity shall:
1>	flush the Msg3 buffer;
1>	flush the MSGA buffer;
1>	set the PREAMBLE_TRANSMISSION_COUNTER to 1;
1>	set the PREAMBLE_POWER_RAMPING_COUNTER to 1;
1>	set the PREAMBLE_BACKOFF to 0 ms;
1>	set POWER_OFFSET_2STEP_RA to 0 dB;
1>	if the carrier to use for the Random Access procedure is explicitly signalled:
2>	select the signalled carrier for performing Random Access procedure;
2>	set the PCMAX to PCMAX,f,c of the signalled carrier.
1>	else if the carrier to use for the Random Access procedure is not explicitly signalled; and
1>	if the Serving Cell for the Random Access procedure is configured with supplementary uplink as specified in TS 38.331 [5]; and
1>	if the RSRP of the downlink pathloss reference is less than rsrp-ThresholdSSB-SUL:
2>	select the SUL carrier for performing Random Access procedure;
2>	set the PCMAX to PCMAX,f,c of the SUL carrier;
2>	set the RSRP_THRESHOLD_RA_TYPE_SELECTION to msgA-RSRP-ThresholdSUL.
1>	else:
2>	select the NUL carrier for performing Random Access procedure;
2>	set the PCMAX to PCMAX,f,c of the NUL carrier;
2>	set the RSRP_THRESHOLD_RA_TYPE_SELECTION to msgA-RSRP-Threshold.
1>	perform the BWP operation as specified in clause 5.15;
1>	if the Random Access procedure is initiated by PDCCH order and if the ra-PreambleIndex explicitly provided by PDCCH is not 0b000000; or
1>	if the Random Access procedure was initiated for SI request (as specified in TS 38.331 [5]) and the Random Access Resources for SI request have been explicitly provided by RRC; or
1>	if the Random Access procedure was initiated for beam failure recovery (as specified in clause 5.17) and if the contention-free Random Access Resources for beam failure recovery request for 4-step RA type have been explicitly provided by RRC for the BWP selected for Random Access procedure; or
1>	if the Random Access procedure was initiated for reconfiguration with sync and if the contention-free Random Access Resources for 4-step RA type have been explicitly provided in rach-ConfigDedicated for the BWP selected for Random Access procedure:
2>	set the RA_TYPE to 4-stepRA.
1>	else if the BWP selected for Random Access procedure is configured with both 2-step and 4-step RA type Random Access Resources and the RSRP of the downlink pathloss reference is above RSRP_THRESHOLD_RA_TYPE_SELECTION; or
1>	if the BWP selected for Random Access procedure is only configured with 2-step RA type Random Access resources (i.e. no 4-step RACH RA type resources configured); or
1>	if the Random Access procedure was initiated for reconfiguration with sync and if the contention-free Random Access Resources for 2-step RA type have been explicitly provided in rach-ConfigDedicated for the BWP selected for Random Access procedure:
2>	set the RA_TYPE to 2-stepRA.
1>	else:
2>	set the RA_TYPE to 4-stepRA.
1>	perform initialization of variables specific to Random Access type as specified in clause 5.1.1a;
1>	if RA_TYPE is set to 2-stepRA:
2>	perform the Random Access Resource selection procedure for 2-step RA type (see clause 5.1.2a).
1>	else:
2>	perform the Random Access Resource selection procedure (see clause 5.1.2).
5.1.1a	Initialization of variables specific to Random Access type
The MAC entity shall:
1>	if RA_TYPE is set to 2-stepRA:
2>	set PREAMBLE_POWER_RAMPING_STEP to msgA-PreamblePowerRampingStep;
2>	set SCALING_FACTOR_BI to 1;
2>	set preambleTransMax to preambleTransMax included in the RACH-ConfigGenericTwoStepRA;
2>	if the Random Access procedure was initiated for beam failure recovery (as specified in clause 5.17); and
2>	if beamFailureRecoveryConfig is configured for the active UL BWP of the selected carrier:
3>	if ra-PrioritizationTwoStep is configured in the beamFailureRecoveryConfig:
4>	set PREAMBLE_POWER_RAMPING_STEP to the powerRampingStepHighPriority included in the ra-PrioritizationTwoStep in beamFailureRecoveryConfig.
4>	if scalingFactorBI is configured in the ra-PrioritizationTwoStep in beamFailureRecoveryConfig:
5>	set SCALING_FACTOR_BI to the scalingFactorBI.
2>	else if the Random Access procedure was initiated for handover; and
2>	if rach-ConfigDedicated is configured for the selected carrier:
3>	if ra-PrioritizationTwoStep is configured in the rach-ConfigDedicated:
4>	set PREAMBLE_POWER_RAMPING_STEP to the powerRampingStepHighPriority included in the ra-PrioritizationTwoStep in rach-ConfigDedicated.
4>	if scalingFactorBI is configured in ra-PrioritizationTwoStep in the rach-ConfigDedicated:
5>	set SCALING_FACTOR_BI to the scalingFactorBI.
2>	if ra-PrioritizationForAccessIdentityTwoStep is configured for the selected carrier; and
2>	if one or more Access Identities has been explicitly provided by RRC; and
2>	if for at least one of these Access Identities the corresponding bit in the ra-PriorizationForAI is set to one:
3>	if powerRampingStepHighPriority is configured in the ra-PrioritizationForAccessIdentityTwoStep:
4>	set PREAMBLE_POWER_RAMPING_STEP to the powerRampingStepHighPriority.
3>	if scalingFactorBI is configured in the ra-PrioritizationForAccessIdentityTwoStep:
4>	set SCALING_FACTOR_BI to the scalingFactorBI.
2>	set MSGA_PREAMBLE_POWER_RAMPING_STEP to PREAMBLE_POWER_RAMPING_STEP.
1>	else (i.e. RA_TYPE is set to 4-stepRA):
2>	set PREAMBLE_POWER_RAMPING_STEP to powerRampingStep;
2>	set SCALING_FACTOR_BI to 1;
2>	set preambleTransMax to preambleTransMax included in the RACH-ConfigGeneric;
2>	if the Random Access procedure was initiated for SpCell beam failure recovery (as specified in clause 5.17); and
2>	if beamFailureRecoveryConfig is configured for the active UL BWP of the selected carrier:
3>	start the beamFailureRecoveryTimer, if configured;
3>	apply the parameters powerRampingStep, preambleReceivedTargetPower, and preambleTransMax configured in the beamFailureRecoveryConfig;
3>	if powerRampingStepHighPriority is configured in the beamFailureRecoveryConfig:
4>	set PREAMBLE_POWER_RAMPING_STEP to the powerRampingStepHighPriority.
3>	else:
4>	set PREAMBLE_POWER_RAMPING_STEP to powerRampingStep.
3>	if scalingFactorBI is configured in the beamFailureRecoveryConfig:
4>	set SCALING_FACTOR_BI to the scalingFactorBI.
2>	else if the Random Access procedure was initiated for handover; and
2>	if rach-ConfigDedicated is configured for the selected carrier:
3>	if powerRampingStepHighPriority is configured in the rach-ConfigDedicated:
4>	set PREAMBLE_POWER_RAMPING_STEP to the powerRampingStepHighPriority.
3>	if scalingFactorBI is configured in the rach-ConfigDedicated:
4>	set SCALING_FACTOR_BI to the scalingFactorBI.
2>	if ra-PrioritizationForAccessIdentity is configured for the selected carrier; and
2>	if one or more Access Identities has been explicitly provided by RRC; and
2>	if for at least one of these Access Identities the corresponding bit in the ra-PriorizationForAI is set to one:
3>	if powerRampingStepHighPriority is configured in the ra-PrioritizationForAccessIdentity:
4>	set PREAMBLE_POWER_RAMPING_STEP to the powerRampingStepHighPriority.
3>	if scalingFactorBI is configured in the ra-PrioritizationForAccessIdentity:
4>	set SCALING_FACTOR_BI to the scalingFactorBI.
2>	if RA_TYPE is switched from 2-stepRA to 4-step RA during this Random Access procedure:
3>	set POWER_OFFSET_2STEP_RA to (PREAMBLE_POWER_RAMPING_COUNTER – 1) × (MSGA_PREAMBLE_POWER_RAMPING_STEP – PREAMBLE_POWER_RAMPING).
5.1.2	Random Access Resource selection
If the selected RA_TYPE is set to 4-stepRA, the MAC entity shall:
1>	if the Random Access procedure was initiated for SpCell beam failure recovery (as specified in clause 5.17); and
1>	if the beamFailureRecoveryTimer (in clause 5.17) is either running or not configured; and
1>	if the contention-free Random Access Resources for beam failure recovery request associated with any of the SSBs and/or CSI-RSs have been explicitly provided by RRC; and
1>	if at least one of the SSBs with SS-RSRP above rsrp-ThresholdSSB amongst the SSBs in candidateBeamRSList or the CSI-RSs with CSI-RSRP above rsrp-ThresholdCSI-RS amongst the CSI-RSs in candidateBeamRSList is available:
2>	select an SSB with SS-RSRP above rsrp-ThresholdSSB amongst the SSBs in candidateBeamRSList or a CSI-RS with CSI-RSRP above rsrp-ThresholdCSI-RS amongst the CSI-RSs in candidateBeamRSList;
2>	if CSI-RS is selected, and there is no ra-PreambleIndex associated with the selected CSI-RS:
3>	set the PREAMBLE_INDEX to a ra-PreambleIndex corresponding to the SSB in candidateBeamRSList which is quasi-colocated with the selected CSI-RS as specified in TS 38.214 [7].
2>	else:
3>	set the PREAMBLE_INDEX to a ra-PreambleIndex corresponding to the selected SSB or CSI-RS from the set of Random Access Preambles for beam failure recovery request.
1>	else if the ra-PreambleIndex has been explicitly provided by PDCCH; and
1>	if the ra-PreambleIndex is not 0b000000:
2>	set the PREAMBLE_INDEX to the signalled ra-PreambleIndex;
2>	select the SSB signalled by PDCCH.
1>	else if the contention-free Random Access Resources associated with SSBs have been explicitly provided in rach-ConfigDedicated and at least one SSB with SS-RSRP above rsrp-ThresholdSSB amongst the associated SSBs is available:
2>	select an SSB with SS-RSRP above rsrp-ThresholdSSB amongst the associated SSBs;
2>	set the PREAMBLE_INDEX to a ra-PreambleIndex corresponding to the selected SSB.
1>	else if the contention-free Random Access Resources associated with CSI-RSs have been explicitly provided in rach-ConfigDedicated and at least one CSI-RS with CSI-RSRP above rsrp-ThresholdCSI-RS amongst the associated CSI-RSs is available:
2>	select a CSI-RS with CSI-RSRP above rsrp-ThresholdCSI-RS amongst the associated CSI-RSs;
2>	set the PREAMBLE_INDEX to a ra-PreambleIndex corresponding to the selected CSI-RS.
1>	else if the Random Access procedure was initiated for SI request (as specified in TS 38.331 [5]); and
1>	if the Random Access Resources for SI request have been explicitly provided by RRC:
2>	if at least one of the SSBs with SS-RSRP above rsrp-ThresholdSSB is available:
3>	select an SSB with SS-RSRP above rsrp-ThresholdSSB.
2>	else:
3>	select any SSB.
2>	select a Random Access Preamble corresponding to the selected SSB, from the Random Access Preamble(s) determined according to ra-PreambleStartIndex as specified in TS 38.331 [5];
2>	set the PREAMBLE_INDEX to selected Random Access Preamble.
1>	else (i.e. for the contention-based Random Access preamble selection):
2>	if at least one of the SSBs with SS-RSRP above rsrp-ThresholdSSB is available:
3>	select an SSB with SS-RSRP above rsrp-ThresholdSSB.
2>	else:
3>	select any SSB.
2>	if the RA_TYPE is switched from 2-stepRA to 4-stepRA:
3>	if a Random Access Preambles group was selected during the current Random Access procedure:
4>	select the same group of Random Access Preambles as was selected for the 2-step RA type.
3>	else:
4>	if Random Access Preambles group B is configured; and
4>	if the transport block size of the MSGA payload configured in the rach-ConfigDedicated corresponds to the transport block size of the MSGA payload associated with Random Access Preambles group B:
5>	select the Random Access Preambles group B.
4>	else:
5>	select the Random Access Preambles group A.
2>	else if Msg3 buffer is empty:
3>	if Random Access Preambles group B is configured:
4>	if the potential Msg3 size (UL data available for transmission plus MAC header and, where required, MAC CEs) is greater than ra-Msg3SizeGroupA and the pathloss is less than PCMAX (of the Serving Cell performing the Random Access Procedure) – preambleReceivedTargetPower – msg3-DeltaPreamble – messagePowerOffsetGroupB; or
4>	if the Random Access procedure was initiated for the CCCH logical channel and the CCCH SDU size plus MAC subheader is greater than ra-Msg3SizeGroupA:
5>	select the Random Access Preambles group B.
4>	else:
5>	select the Random Access Preambles group A.
3>	else:
4>	select the Random Access Preambles group A.
2>	else (i.e. Msg3 is being retransmitted):
3>	select the same group of Random Access Preambles as was used for the Random Access Preamble transmission attempt corresponding to the first transmission of Msg3.
2>	select a Random Access Preamble randomly with equal probability from the Random Access Preambles associated with the selected SSB and the selected Random Access Preambles group.
2>	set the PREAMBLE_INDEX to the selected Random Access Preamble.
1>	if the Random Access procedure was initiated for SI request (as specified in TS 38.331 [5]); and
1>	if ra-AssociationPeriodIndex and si-RequestPeriod are configured:
2>	determine the next available PRACH occasion from the PRACH occasions corresponding to the selected SSB in the association period given by ra-AssociationPeriodIndex in the si-RequestPeriod permitted by the restrictions given by the ra-ssb-OccasionMaskIndex if configured (the MAC entity shall select a PRACH occasion randomly with equal probability amongst the consecutive PRACH occasions according to clause 8.1 of TS 38.213 [6] corresponding to the selected SSB).
1>	else if an SSB is selected above:
2>	determine the next available PRACH occasion from the PRACH occasions corresponding to the selected SSB permitted by the restrictions given by the ra-ssb-OccasionMaskIndex if configured or indicated by PDCCH (the MAC entity shall select a PRACH occasion randomly with equal probability amongst the consecutive PRACH occasions according to clause 8.1 of TS 38.213 [6], corresponding to the selected SSB; the MAC entity may take into account the possible occurrence of measurement gaps when determining the next available PRACH occasion corresponding to the selected SSB).
1>	else if a CSI-RS is selected above:
2>	if there is no contention-free Random Access Resource associated with the selected CSI-RS:
3>	determine the next available PRACH occasion from the PRACH occasions, permitted by the restrictions given by the ra-ssb-OccasionMaskIndex if configured, corresponding to the SSB in candidateBeamRSList which is quasi-colocated with the selected CSI-RS as specified in TS 38.214 [7] (the MAC entity shall select a PRACH occasion randomly with equal probability amongst the consecutive PRACH occasions according to clause 8.1 of TS 38.213 [6], corresponding to the SSB which is quasi-colocated with the selected CSI-RS; the MAC entity may take into account the possible occurrence of measurement gaps when determining the next available PRACH occasion corresponding to the SSB which is quasi-colocated with the selected CSI-RS).
2>	else:
3>	determine the next available PRACH occasion from the PRACH occasions in ra-OccasionList corresponding to the selected CSI-RS (the MAC entity shall select a PRACH occasion randomly with equal probability amongst the PRACH occasions occurring simultaneously but on different subcarriers, corresponding to the selected CSI-RS; the MAC entity may take into account the possible occurrence of measurement gaps when determining the next available PRACH occasion corresponding to the selected CSI-RS).
1>	perform the Random Access Preamble transmission procedure (see clause 5.1.3).
NOTE 1:	When the UE determines if there is an SSB with SS-RSRP above rsrp-ThresholdSSB or a CSI-RS with CSI-RSRP above rsrp-ThresholdCSI-RS, the UE uses the latest unfiltered L1-RSRP measurement.
NOTE 2:	For a UE operating in a semi-static channel access mode as described in TS 37.213 [18], Random Access Resources overlapping with the idle time of a fixed frame period are not considered for selection.
5.1.2a	Random Access Resource selection for 2-step RA type
If the selected RA_TYPE is set to 2-stepRA, the MAC entity shall:
1>	if the contention-free 2-step RA type Resources associated with SSBs have been explicitly provided in rach-ConfigDedicated and at least one SSB with SS-RSRP above msgA-RSRP-ThresholdSSB amongst the associated SSBs is available:
2>	select an SSB with SS-RSRP above msgA-RSRP-ThresholdSSB amongst the associated SSBs;
2>	set the PREAMBLE_INDEX to a ra-PreambleIndex corresponding to the selected SSB.
1>	else if the contention-free 2-step RA type Resources associated with CSI-RSs have been explicitly provided in rach-ConfigDedicated and at least one CSI-RS with CSI-RSRP above msgA-RSRP-ThresholdCSI-RS amongst the associated CSI-RSs is available:
2>	select a CSI-RS with CSI-RSRP above msgA-RSRP-ThresholdCSI-RS amongst the associated CSI-RSs;
2>	set the PREAMBLE_INDEX to a ra-PreambleIndex corresponding to the selected CSI-RS.
1>	else (i.e. for the contention-based Random Access Preamble selection):
2>	if at least one of the SSBs with SS-RSRP above msgA-RSRP-ThresholdSSB is available:
3>	select an SSB with SS-RSRP above msgA-RSRP-ThresholdSSB.
2>	else:
3>	select any SSB.
2>	if contention-free Random Access Resources for 2-step RA type have not been configured and if Random Access Preambles group has not yet been selected during the current Random Access procedure:
3>	if Random Access Preambles group B for 2-step RA type is configured:
4>	if the potential MSGA payload size (UL data available for transmission plus MAC header and, where required, MAC CEs) is greater than the ra-MsgASizeGroupA and the pathloss is less than PCMAX (of the Serving Cell performing the Random Access Procedure) – msgA-PreambleReceivedTargetPower – msgA-DeltaPreamble – msgA-messagePowerOffsetGroupB; or
4>	if the Random Access procedure was initiated for the CCCH logical channel and the CCCH SDU size plus MAC subheader is greater than ra-MsgASizeGroupA:
5>	select the Random Access Preambles group B.
4>	else:
5>	select the Random Access Preambles group A.
3>	else:
4>	select the Random Access Preambles group A.
2>	else if contention-free Random Access Resources for 2-step RA type have been configured and if Random Access Preambles group has not yet been selected during the current Random Access procedure:
3>	if Random Access Preambles group B for 2-step RA type is configured; and
3>	if the transport block size of the MSGA payload configured in the rach-ConfigDedicated corresponds to the transport block size of the MSGA payload associated with Random Access Preambles group B:
4>	select the Random Access Preambles group B.
3>	else:
4>	select the Random Access Preambles group A.
2>	else (i.e. Random Access preambles group has been selected during the current Random Access procedure):
3>	select the same group of Random Access Preambles as was used for the Random Access Preamble transmission attempt corresponding to the earlier transmission of MSGA.
2>	select a Random Access Preamble randomly with equal probability from the 2-step RA type Random Access Preambles associated with the selected SSB and the selected Random Access Preambles group;
2>	set the PREAMBLE_INDEX to the selected Random Access Preamble;
1>	determine the next available PRACH occasion from the PRACH occasions corresponding to the selected SSB permitted by the restrictions given by the msgA-SSB-SharedRO-MaskIndex if configured and ra-ssb-OccasionMaskIndex if configured (the MAC entity shall select a PRACH occasion randomly with equal probability among the consecutive PRACH occasions allocated for 2-step RA type according to clause 8.1 of TS 38.213 [6], corresponding to the selected SSB; the MAC entity may take into account the possible occurrence of measurement gaps when determining the next available PRACH occasion corresponding to the selected SSB);
1>	determine the UL grant and the associated HARQ information for the PUSCH resource of MSGA associated with the selected preamble and PRACH occasion according to clause 8.1A of TS 38.213 [6];
1>	deliver the UL grant and the associated HARQ information to the HARQ entity;
1>	perform the MSGA transmission procedure (see clause 5.1.3a).
NOTE:	To determine if there is an SSB with SS-RSRP above msgA-RSRP-ThresholdSSB, the UE uses the latest unfiltered L1-RSRP measurement.
5.1.3	Random Access Preamble transmission
The MAC entity shall, for each Random Access Preamble:
1>	if PREAMBLE_TRANSMISSION_COUNTER is greater than one; and
1>	if the notification of suspending power ramping counter has not been received from lower layers; and
1>	if LBT failure indication was not received from lower layers for the last Random Access Preamble transmission; and
1>	if SSB or CSI-RS selected is not changed from the selection in the last Random Access Preamble transmission:
2>	increment PREAMBLE_POWER_RAMPING_COUNTER by 1.
1>	select the value of DELTA_PREAMBLE according to clause 7.3;
1>	set PREAMBLE_RECEIVED_TARGET_POWER to preambleReceivedTargetPower + DELTA_PREAMBLE + (PREAMBLE_POWER_RAMPING_COUNTER – 1) × PREAMBLE_POWER_RAMPING_STEP + POWER_OFFSET_2STEP_RA;
1>	except for contention-free Random Access Preamble for beam failure recovery request, compute the RA-RNTI associated with the PRACH occasion in which the Random Access Preamble is transmitted;
1>	instruct the physical layer to transmit the Random Access Preamble using the selected PRACH occasion, corresponding RA-RNTI (if available), PREAMBLE_INDEX and PREAMBLE_RECEIVED_TARGET_POWER.
1>	if LBT failure indication is received from lower layers for this Random Access Preamble transmission:
2>	perform the Random Access Resource selection procedure (see clause 5.1.2).
The RA-RNTI associated with the PRACH occasion in which the Random Access Preamble is transmitted, is computed as:
RA-RNTI = 1 + s_id + 14 × t_id + 14 × 80 × f_id + 14 × 80 × 8 × ul_carrier_id
where s_id is the index of the first OFDM symbol of the PRACH occasion (0 ≤ s_id < 14), t_id is the index of the first slot of the PRACH occasion in a system frame (0 ≤ t_id < 80), where the subcarrier spacing to determine t_id is based on the value of μ specified in clause 5.3.2 in TS 38.211 [8], f_id is the index of the PRACH occasion in the frequency domain (0 ≤ f_id < 8), and ul_carrier_id is the UL carrier used for Random Access Preamble transmission (0 for NUL carrier, and 1 for SUL carrier).
5.1.3a	MSGA transmission
The MAC entity shall, for each MSGA:
1>	if PREAMBLE_TRANSMISSION_COUNTER is greater than one; and
1>	if the notification of suspending power ramping counter has not been received from lower layers; and
1>	if LBT failure indication was not received from lower layers for the last MSGA Random Access Preamble transmission; and
1>	if SSB or CSI-RS selected is not changed from the selection in the last Random Access Preamble transmission:
2>	increment PREAMBLE_POWER_RAMPING_COUNTER by 1.
1>	select the value of DELTA_PREAMBLE according to clause 7.3;
1>	set PREAMBLE_RECEIVED_TARGET_POWER to preambleReceivedTargetPower + DELTA_PREAMBLE + (PREAMBLE_POWER_RAMPING_COUNTER – 1) × PREAMBLE_POWER_RAMPING_STEP;
1>	if this is the first MSGA transmission within this Random Access procedure:
2>	if the transmission is not being made for the CCCH logical channel:
3>	indicate to the Multiplexing and assembly entity to include a C-RNTI MAC CE in the subsequent uplink transmission.
2>	obtain the MAC PDU to transmit from the Multiplexing and assembly entity and store it in the MSGA buffer.
1>	compute the MSGB-RNTI associated with the PRACH occasion in which the Random Access Preamble is transmitted;
1>	instruct the physical layer to transmit the MSGA using the selected PRACH occasion and the associated PUSCH resource, using the corresponding RA-RNTI, MSGB-RNTI, PREAMBLE_INDEX, PREAMBLE_RECEIVED_TARGET_POWER, preambleReceivedTargetPower, and the amount of power ramping applied to the latest MSGA preamble transmission (i.e. (PREAMBLE_POWER_RAMPING_COUNTER – 1) × PREAMBLE_POWER_RAMPING_STEP);
1>	if LBT failure indication is received from lower layers for the transmission of this MSGA Random Access Preamble:
2>	instruct the physical layer to cancel the transmission of the MSGA payload on the associated PUSCH resource;
2>	perform the Random Access Resource selection procedure for 2-step RA type (see clause 5.1.2a).
NOTE:	The MSGA transmission includes the transmission of the PRACH Preamble as well as the contents of the MSGA buffer in the PUSCH resource corresponding to the selected PRACH occasion and PREAMBLE_INDEX (see TS 38.213 [6])
The MSGB-RNTI associated with the PRACH occasion in which the Random Access Preamble is transmitted, is computed as:
MSGB-RNTI = 1 + s_id + 14 × t_id + 14 × 80 × f_id + 14 × 80 × 8 × ul_carrier_id + 14 × 80 × 8 × 2
where s_id is the index of the first OFDM symbol of the PRACH occasion (0 ≤ s_id < 14), t_id is the index of the first slot of the PRACH occasion in a system frame (0 ≤ t_id < 80), where the subcarrier spacing to determine t_id is based on the value of μ specified in clause 5.3.2 in TS 38.211 [8], f_id is the index of the PRACH occasion in the frequency domain (0 ≤ f_id < 8), and ul_carrier_id is the UL carrier used for Random Access Preamble transmission (0 for NUL carrier, and 1 for SUL carrier). The RA-RNTI is calculated as specified in clause 5.1.3.
5.1.4	Random Access Response reception
Once the Random Access Preamble is transmitted and regardless of the possible occurrence of a measurement gap, the MAC entity shall:
1>	if the contention-free Random Access Preamble for beam failure recovery request was transmitted by the MAC entity:
2>	start the ra-ResponseWindow configured in BeamFailureRecoveryConfig at the first PDCCH occasion as specified in TS 38.213 [6] from the end of the Random Access Preamble transmission;
2>	monitor for a PDCCH transmission on the search space indicated by recoverySearchSpaceId of the SpCell identified by the C-RNTI while ra-ResponseWindow is running.
1>	else:
2>	start the ra-ResponseWindow configured in RACH-ConfigCommon at the first PDCCH occasion as specified in TS 38.213 [6] from the end of the Random Access Preamble transmission;
2>	monitor the PDCCH of the SpCell for Random Access Response(s) identified by the RA-RNTI while the ra-ResponseWindow is running.
1>	if notification of a reception of a PDCCH transmission on the search space indicated by recoverySearchSpaceId is received from lower layers on the Serving Cell where the preamble was transmitted; and
1>	if PDCCH transmission is addressed to the C-RNTI; and
1>	if the contention-free Random Access Preamble for beam failure recovery request was transmitted by the MAC entity:
2>	consider the Random Access procedure successfully completed.
1>	else if a valid (as specified in TS 38.213 [6]) downlink assignment has been received on the PDCCH for the RA-RNTI and the received TB is successfully decoded:
2>	if the Random Access Response contains a MAC subPDU with Backoff Indicator:
3>	set the PREAMBLE_BACKOFF to value of the BI field of the MAC subPDU using Table 7.2-1, multiplied with SCALING_FACTOR_BI.
2>	else:
3>	set the PREAMBLE_BACKOFF to 0 ms.
2>	if the Random Access Response contains a MAC subPDU with Random Access Preamble identifier corresponding to the transmitted PREAMBLE_INDEX (see clause 5.1.3):
3>	consider this Random Access Response reception successful.
2>	if the Random Access Response reception is considered successful:
3>	if the Random Access Response includes a MAC subPDU with RAPID only:
4>	consider this Random Access procedure successfully completed;
4>	indicate the reception of an acknowledgement for SI request to upper layers.
3>	else:
4>	apply the following actions for the Serving Cell where the Random Access Preamble was transmitted:
5>	process the received Timing Advance Command (see clause 5.2);
5>	indicate the preambleReceivedTargetPower and the amount of power ramping applied to the latest Random Access Preamble transmission to lower layers (i.e. (PREAMBLE_POWER_RAMPING_COUNTER – 1) × PREAMBLE_POWER_RAMPING_STEP);
5>	if the Random Access procedure for an SCell is performed on uplink carrier where pusch-Config is not configured:
6>	ignore the received UL grant.
5>	else:
6>	process the received UL grant value and indicate it to the lower layers.
4>	if the Random Access Preamble was not selected by the MAC entity among the contention-based Random Access Preamble(s):
5>	consider the Random Access procedure successfully completed.
4>	else:
5>	set the TEMPORARY_C-RNTI to the value received in the Random Access Response;
5>	if this is the first successfully received Random Access Response within this Random Access procedure:
6>	if the transmission is not being made for the CCCH logical channel:
7>	indicate to the Multiplexing and assembly entity to include a C-RNTI MAC CE in the subsequent uplink transmission.
6>	obtain the MAC PDU to transmit from the Multiplexing and assembly entity and store it in the Msg3 buffer.
NOTE:	If within a Random Access procedure, an uplink grant provided in the Random Access Response for the same group of contention-based Random Access Preambles has a different size than the first uplink grant allocated during that Random Access procedure, the UE behavior is not defined.
1>	if ra-ResponseWindow configured in BeamFailureRecoveryConfig expires and if a PDCCH transmission on the search space indicated by recoverySearchSpaceId addressed to the C-RNTI has not been received on the Serving Cell where the preamble was transmitted; or
1>	if ra-ResponseWindow configured in RACH-ConfigCommon expires, and if the Random Access Response containing Random Access Preamble identifiers that matches the transmitted PREAMBLE_INDEX has not been received:
2>	consider the Random Access Response reception not successful;
2>	increment PREAMBLE_TRANSMISSION_COUNTER by 1;
2>	if PREAMBLE_TRANSMISSION_COUNTER = preambleTransMax + 1:
3>	if the Random Access Preamble is transmitted on the SpCell:
4>	indicate a Random Access problem to upper layers;
4>	if this Random Access procedure was triggered for SI request:
5>	consider the Random Access procedure unsuccessfully completed.
3>	else if the Random Access Preamble is transmitted on an SCell:
4>	consider the Random Access procedure unsuccessfully completed.
2>	if the Random Access procedure is not completed:
3>	select a random backoff time according to a uniform distribution between 0 and the PREAMBLE_BACKOFF;
3>	if the criteria (as defined in clause 5.1.2) to select contention-free Random Access Resources is met during the backoff time:
4>	perform the Random Access Resource selection procedure (see clause 5.1.2);
3>	else if the Random Access procedure for an SCell is performed on uplink carrier where pusch-Config is not configured:
4>	delay the subsequent Random Access transmission until the Random Access Procedure is triggered by a PDCCH order with the same ra-PreambleIndex, ra-ssb-OccasionMaskIndex and UL/SUL indicator TS 38.212 [9].
3>	else:
4>	perform the Random Access Resource selection procedure (see clause 5.1.2) after the backoff time.
The MAC entity may stop ra-ResponseWindow (and hence monitoring for Random Access Response(s)) after successful reception of a Random Access Response containing Random Access Preamble identifiers that matches the transmitted PREAMBLE_INDEX.
HARQ operation is not applicable to the Random Access Response reception.
5.1.4a	MSGB reception and contention resolution for 2-step RA type
Once the MSGA preamble is transmitted, regardless of the possible occurrence of a measurement gap, the MAC entity shall:
1>	start the msgB-ResponseWindow at the first PDCCH occasion from the end of the MSGA transmission as specified in TS 38.213 [6];
1>	monitor the PDCCH of the SpCell for a Random Access Response identified by MSGB-RNTI while the msgB-ResponseWindow is running;
1>	if C-RNTI MAC CE was included in the MSGA:
2>	monitor the PDCCH of the SpCell for Random Access Response identified by the C-RNTI while the msgB-ResponseWindow is running;
1>	if notification of a reception of a PDCCH transmission of the SpCell is received from lower layers:
2>	if the C-RNTI MAC CE was included in MSGA:
3>	if the Random Access procedure was initiated for beam failure recovery (as specified in clause 5.17) and the PDCCH transmission is addressed to the C-RNTI:
4>	consider this Random Access Response reception successful;
4>	stop the msgB-ResponseWindow;
4>	consider this Random Access procedure successfully completed.
3>	else if the timeAlignmentTimer associated with the PTAG is running:
4>	if the PDCCH transmission is addressed to the C-RNTI and contains a UL grant for a new transmission:
5>	consider this Random Access Response reception successful;
5>	stop the msgB-ResponseWindow;
5>	consider this Random Access procedure successfully completed.
3>	else:
4>	if a downlink assignment has been received on the PDCCH for the C-RNTI and the received TB is successfully decoded:
5>	if the MAC PDU contains the Absolute Timing Advance Command MAC CE subPDU:
6>	process the received Timing Advance Command (see clause 5.2);
6>	consider this Random Access Response reception successful;
6>	stop the msgB-ResponseWindow;
6>	consider this Random Access procedure successfully completed and finish the disassembly and demultiplexing of the MAC PDU.
2>	if a downlink assignment has been received on the PDCCH for the MSGB-RNTI and it includes the two LSB bits of the SFN corresponding to the PRACH occasion used to transmit the Random Access Preamble of MSGA and the received TB is successfully decoded:
3>	if the MSGB contains a MAC subPDU with Backoff Indicator:
4>	set the PREAMBLE_BACKOFF to value of the BI field of the MAC subPDU using Table 7.2-1, multiplied with SCALING_FACTOR_BI.
3>	else:
4>	set the PREAMBLE_BACKOFF to 0 ms.
3>	if the MSGB contains a fallbackRAR MAC subPDU; and
3>	if the Random Access Preamble identifier in the MAC subPDU matches the transmitted PREAMBLE_INDEX (see clause 5.1.3a):
4>	consider this Random Access Response reception successful;
4>	apply the following actions for the SpCell:
5>	process the received Timing Advance Command (see clause 5.2);
5>	indicate the preambleReceivedTargetPower and the amount of power ramping applied to the latest Random Access Preamble transmission to lower layers (i.e. (PREAMBLE_POWER_RAMPING_COUNTER – 1) × PREAMBLE_POWER_RAMPING_STEP);
5>	if the Random Access Preamble was not selected by the MAC entity among the contention-based Random Access Preamble(s):
6>	consider the Random Access procedure successfully completed.
5>	else:
6>	set the TEMPORARY_C-RNTI to the value received in the Random Access Response;
5>	if the Msg3 buffer is empty:
6>	obtain the MAC PDU to transmit from the MSGA buffer and store it in the Msg3 buffer;
5>	process the received UL grant value and indicate it to the lower layers and proceed with Msg3 transmission;
NOTE:	If within a 2-step RA type procedure, an uplink grant provided in the fallback RAR has a different size than the MSGA payload, the UE behavior is not defined.
3>	else if the MSGB contains a successRAR MAC subPDU; and
3>	if the CCCH SDU was included in the MSGA and the UE Contention Resolution Identity in the MAC subPDU matches the CCCH SDU:
4>	stop msgB-ResponseWindow;
4>	if this Random Access procedure was initiated for SI request:
5>	indicate the reception of an acknowledgement for SI request to upper layers.
4>	else:
5>	set the C-RNTI to the value received in the successRAR;
5>	apply the following actions for the SpCell:
6>	process the received Timing Advance Command (see clause 5.2);
6>	indicate the preambleReceivedTargetPower and the amount of power ramping applied to the latest Random Access Preamble transmission to lower layers (i.e. (PREAMBLE_POWER_RAMPING_COUNTER – 1) × PREAMBLE_POWER_RAMPING_STEP);
4>	deliver the TPC, PUCCH resource Indicator and HARQ feedback Timing Indicator received in successRAR to lower layers.
4>	consider this Random Access Response reception successful;
4>	consider this Random Access procedure successfully completed;
4>	finish the disassembly and demultiplexing of the MAC PDU.
1>	if msgB -ResponseWindow expires, and the Random Access Response Reception has not been considered as successful based on descriptions above:
2>	increment PREAMBLE_TRANSMISSION_COUNTER by 1;
2>	if PREAMBLE_TRANSMISSION_COUNTER = preambleTransMax + 1:
3>	indicate a Random Access problem to upper layers;
3>	if this Random Access procedure was triggered for SI request:
4>	consider this Random Access procedure unsuccessfully completed.
2>	if the Random Access procedure is not completed:
3>	if msgA-TransMax is configured and PREAMBLE_TRANSMISSION_COUNTER = msgA-TransMax + 1:
4>	set the RA_TYPE to 4-stepRA;
4>	perform initialization of variables specific to Random Access type as specified in clause 5.1.1a;
4>	if the Msg3 buffer is empty:
5>	obtain the MAC PDU to transmit from the MSGA buffer and store it in the Msg3 buffer;
4>	flush HARQ buffer used for the transmission of MAC PDU in the MSGA buffer;
4>	discard explicitly signalled contention-free 2-step RA type Random Access Resources, if any;
4>	perform the Random Access Resource selection procedure as specified in clause 5.1.2.
3>	else:
4>	select a random backoff time according to a uniform distribution between 0 and the PREAMBLE_BACKOFF;
4>	if the criteria (as defined in clause 5.1.2a) to select contention-free Random Access Resources is met during the backoff time:
5>	perform the Random Access Resource selection procedure for 2-step RA type Random Access (see clause 5.1.2a);
4>	else:
5>	perform the Random Access Resource selection procedure for 2-step RA type Random Access (see clause 5.1.2a) after the backoff time.
Upon receiving a fallbackRAR, the MAC entity may stop msgB-ResponseWindow once the Random Access Response reception is considered as successful.
5.1.5	Contention Resolution
Once Msg3 is transmitted, regardless of LBT failure indication from lower layers for Msg3, the MAC entity shall:
1>	start the ra-ContentionResolutionTimer and restart the ra-ContentionResolutionTimer at each HARQ retransmission in the first symbol after the end of the Msg3 transmission;
1>	monitor the PDCCH while the ra-ContentionResolutionTimer is running regardless of the possible occurrence of a measurement gap;
1>	if notification of a reception of a PDCCH transmission of the SpCell is received from lower layers:
2>	if the C-RNTI MAC CE was included in Msg3:
3>	if the Random Access procedure was initiated for beam failure recovery (as specified in clause 5.17) and the PDCCH transmission is addressed to the C-RNTI; or
3>	if the Random Access procedure was initiated by a PDCCH order and the PDCCH transmission is addressed to the C-RNTI; or
3>	if the Random Access procedure was initiated by the MAC sublayer itself or by the RRC sublayer and the PDCCH transmission is addressed to the C-RNTI and contains a UL grant for a new transmission:
4>	consider this Contention Resolution successful;
4>	stop ra-ContentionResolutionTimer;
4>	discard the TEMPORARY_C-RNTI;
4>	consider this Random Access procedure successfully completed.
2>	else if the CCCH SDU was included in Msg3 and the PDCCH transmission is addressed to its TEMPORARY_C-RNTI:
3>	if the MAC PDU is successfully decoded:
4>	stop ra-ContentionResolutionTimer;
4>	if the MAC PDU contains a UE Contention Resolution Identity MAC CE; and
4>	if the UE Contention Resolution Identity in the MAC CE matches the CCCH SDU transmitted in Msg3:
5>	consider this Contention Resolution successful and finish the disassembly and demultiplexing of the MAC PDU;
5>	if this Random Access procedure was initiated for SI request:
6>	indicate the reception of an acknowledgement for SI request to upper layers.
5>	else:
6>	set the C-RNTI to the value of the TEMPORARY_C-RNTI;
5>	discard the TEMPORARY_C-RNTI;
5>	consider this Random Access procedure successfully completed.
4>	else:
5>	discard the TEMPORARY_C-RNTI;
5>	consider this Contention Resolution not successful and discard the successfully decoded MAC PDU.
1>	if ra-ContentionResolutionTimer expires:
2>	discard the TEMPORARY_C-RNTI;
2>	consider the Contention Resolution not successful.
1>	if the Contention Resolution is considered not successful:
2>	flush the HARQ buffer used for transmission of the MAC PDU in the Msg3 buffer;
2>	increment PREAMBLE_TRANSMISSION_COUNTER by 1;
2>	if PREAMBLE_TRANSMISSION_COUNTER = preambleTransMax + 1:
3>	indicate a Random Access problem to upper layers.
3>	if this Random Access procedure was triggered for SI request:
4>	consider the Random Access procedure unsuccessfully completed.
2>	if the Random Access procedure is not completed:
3>	if the RA_TYPE is set to 4-stepRA:
4>	select a random backoff time according to a uniform distribution between 0 and the PREAMBLE_BACKOFF;
4>	if the criteria (as defined in clause 5.1.2) to select contention-free Random Access Resources is met during the backoff time:
5>	perform the Random Access Resource selection procedure (see clause 5.1.2);
4>	else:
5>	perform the Random Access Resource selection procedure (see clause 5.1.2) after the backoff time.
3>	else (i.e. the RA_TYPE is set to 2-stepRA):
4>	if msgA-TransMax is configured and PREAMBLE_TRANSMISSION_COUNTER = msgA-TransMax + 1:
5>	set the RA_TYPE to 4-stepRA;
5>	perform initialization of variables specific to Random Access type as specified in clause 5.1.1a;
5>	flush HARQ buffer used for the transmission of MAC PDU in the MSGA buffer;
5>	discard explicitly signalled contention-free 2-step RA type Random Access Resources, if any;
5>	perform the Random Access Resource selection as specified in clause 5.1.2.
4>	else:
5>	select a random backoff time according to a uniform distribution between 0 and the PREAMBLE_BACKOFF;
5>	if the criteria (as defined in clause 5.1.2a) to select contention-free Random Access Resources is met during the backoff time:
6>	perform the Random Access Resource selection procedure for 2-step RA type as specified in clause 5.1.2a.
5>	else:
6>	perform the Random Access Resource selection for 2-step RA type procedure (see clause 5.1.2a) after the backoff time.
5.1.6	Completion of the Random Access procedure
Upon completion of the Random Access procedure, the MAC entity shall:
1>	discard any explicitly signalled contention-free Random Access Resources for 2-step RA type and 4-step RA type except the 4-step RA type contention-free Random Access Resources for beam failure recovery request, if any;
1>	flush the HARQ buffer used for transmission of the MAC PDU in the Msg3 buffer and the MSGA buffer;
1>	if the Random Access procedure towards target cell for DAPS handover is successfully completed:
2>	indicate the successful completion of the Random Access procedure to the upper layers.
Editor's Note: FFS if Msg.B for 2-step RACH works the same.
5.2	Maintenance of Uplink Time Alignment
RRC configures the following parameters for the maintenance of UL time alignment:
-	timeAlignmentTimer (per TAG) which controls how long the MAC entity considers the Serving Cells belonging to the associated TAG to be uplink time aligned.
The MAC entity shall:
1>	when a Timing Advance Command MAC CE is received, and if an NTA (as defined in TS 38.211 [8]) has been maintained with the indicated TAG:
2>	apply the Timing Advance Command for the indicated TAG;
2>	start or restart the timeAlignmentTimer associated with the indicated TAG.
1>	when a Timing Advance Command is received in a Random Access Response message for a Serving Cell belonging to a TAG or in a MSGB for an SpCell:
2>	if the Random Access Preamble was not selected by the MAC entity among the contention-based Random Access Preamble:
3>	apply the Timing Advance Command for this TAG;
3>	start or restart the timeAlignmentTimer associated with this TAG.
2>	else if the timeAlignmentTimer associated with this TAG is not running:
3>	apply the Timing Advance Command for this TAG;
3>	start the timeAlignmentTimer associated with this TAG;
3>	when the Contention Resolution is considered not successful as described in clause 5.1.5; or
3>	when the Contention Resolution is considered successful for SI request as described in clause 5.1.5, after transmitting HARQ feedback for MAC PDU including UE Contention Resolution Identity MAC CE:
4>	stop timeAlignmentTimer associated with this TAG.
2>	else:
3>	ignore the received Timing Advance Command.
1>	when an Absolute Timing Advance Command is received in response to a MSGA transmission including C-RNTI MAC CE as specified in clause 5.1.4a:
2>	apply the Timing Advance Command for PTAG;
2>	start or restart the timeAlignmentTimer associated with PTAG.
1>	when a timeAlignmentTimer expires:
2>	if the timeAlignmentTimer is associated with the PTAG:
3>	flush all HARQ buffers for all Serving Cells;
3>	notify RRC to release PUCCH for all Serving Cells, if configured;
3>	notify RRC to release SRS for all Serving Cells, if configured;
3>	clear any configured downlink assignments and configured uplink grants;
3>	clear any PUSCH resource for semi-persistent CSI reporting;
3>	consider all running timeAlignmentTimers as expired;
3>	maintain NTA (defined in TS 38.211 [8]) of all TAGs.
2>	else if the timeAlignmentTimer is associated with an STAG, then for all Serving Cells belonging to this TAG:
3>	flush all HARQ buffers;
3>	notify RRC to release PUCCH, if configured;
3>	notify RRC to release SRS, if configured;
3>	clear any configured downlink assignments and configured uplink grants;
3>	clear any PUSCH resource for semi-persistent CSI reporting;
3>	maintain NTA (defined in TS 38.211 [8]) of this TAG.
When the MAC entity stops uplink transmissions for an SCell due to the fact that the maximum uplink transmission timing difference between TAGs of the MAC entity or the maximum uplink transmission timing difference between TAGs of any MAC entity of the UE is exceeded, the MAC entity considers the timeAlignmentTimer associated with the SCell as expired.
The MAC entity shall not perform any uplink transmission on a Serving Cell except the Random Access Preamble and MSGA transmission when the timeAlignmentTimer associated with the TAG to which this Serving Cell belongs is not running. Furthermore, when the timeAlignmentTimer associated with the PTAG is not running, the MAC entity shall not perform any uplink transmission on any Serving Cell except the Random Access Preamble and MSGA transmission on the SpCell.
5.3	DL-SCH data transfer
5.3.1	DL Assignment reception
Downlink assignments received on the PDCCH both indicate that there is a transmission on a DL-SCH for a particular MAC entity and provide the relevant HARQ information.
When the MAC entity has a C-RNTI, Temporary C-RNTI, or CS-RNTI, the MAC entity shall for each PDCCH occasion during which it monitors PDCCH and for each Serving Cell:
1>	if a downlink assignment for this PDCCH occasion and this Serving Cell has been received on the PDCCH for the MAC entity's C-RNTI, or Temporary C-RNTI:
2>	if this is the first downlink assignment for this Temporary C-RNTI:
3>	consider the NDI to have been toggled.
2>	if the downlink assignment is for the MAC entity's C-RNTI, and if the previous downlink assignment indicated to the HARQ entity of the same HARQ process was either a downlink assignment received for the MAC entity's CS-RNTI or a configured downlink assignment:
3>	consider the NDI to have been toggled regardless of the value of the NDI.
2>	indicate the presence of a downlink assignment and deliver the associated HARQ information to the HARQ entity.
1>	else if a downlink assignment for this PDCCH occasion has been received for this Serving Cell on the PDCCH for the MAC entity's CS-RNTI:
2>	if the NDI in the received HARQ information is 1:
3>	consider the NDI for the corresponding HARQ process not to have been toggled;
3>	indicate the presence of a downlink assignment for this Serving Cell and deliver the associated HARQ information to the HARQ entity.
2>	if the NDI in the received HARQ information is 0:
3>	if PDCCH contents indicate SPS deactivation:
4>	clear the configured downlink assignment for this Serving Cell (if any);
4>	if the timeAlignmentTimer, associated with the TAG containing the Serving Cell on which the HARQ feedback is to be transmitted, is running:
5>	indicate a positive acknowledgement for the SPS deactivation to the physical layer.
3>	else if PDCCH content indicates SPS activation:
4>	store the downlink assignment for this Serving Cell and the associated HARQ information as configured downlink assignment;
4>	initialise or re-initialise the configured downlink assignment for this Serving Cell to start in the associated PDSCH duration and to recur according to rules in clause 5.8.1;
For each Serving Cell and each configured downlink assignment, if configured and activated, the MAC entity shall:
1>	if the PDSCH duration of the configured downlink assignment does not overlap with the PDSCH duration of a downlink assignment received on the PDCCH for this Serving Cell:
2>	instruct the physical layer to receive, in this PDSCH duration, transport block on the DL-SCH according to the configured downlink assignment and to deliver it to the HARQ entity;
2>	set the HARQ Process ID to the HARQ Process ID associated with this PDSCH duration;
2>	consider the NDI bit for the corresponding HARQ process to have been toggled;
2>	indicate the presence of a configured downlink assignment and deliver the stored HARQ information to the HARQ entity.
Editor's Note: The text above may need to be updated after confirmation of RAN1 working assumption: In case of collision only between more than one SPS PDSCHs each without a corresponding PDCCH, a UE is not required to decode SPS PDSCHs other than the SPS PDSCH with the lowest SPS configuration index among collided SPS PDSCHs. - The UE shall report HARQ-ACK feedback only for the SPS PDSCH with the lowest SPS configuration index among collided SPS PDSCHs
For configured downlink assignments without harq-ProcID-Offset, the HARQ Process ID associated with the slot where the DL transmission starts is derived from the following equation:
HARQ Process ID = [floor (CURRENT_slot × 10 / (numberOfSlotsPerFrame × periodicity))] modulo nrofHARQ-Processes
where CURRENT_slot = [(SFN × numberOfSlotsPerFrame) + slot number in the frame] and numberOfSlotsPerFrame refers to the number of consecutive slots per frame as specified in TS 38.211 [8].
NOTE:	In case of unaligned SFN across carriers in a cell group, the SFN of the concerned Serving Cell is used to calculate the HARQ Process ID used for configured downlink assignments.
For configured downlink assignments with harq-ProcID-Offset, the HARQ Process ID associated with the slot where the DL transmission starts is derived from the following equation:
HARQ Process ID = [floor (CURRENT_slot / periodicity)] modulo nrofHARQ-Processes + harq-ProcID-Offset
where CURRENT_slot = [(SFN × numberOfSlotsPerFrame) + slot number in the frame] and numberOfSlotsPerFrame refers to the number of consecutive slots per frame as specified in TS 38.211 [8].
When the MAC entity needs to read BCCH, the MAC entity may, based on the scheduling information from RRC:
1>	if a downlink assignment for this PDCCH occasion has been received on the PDCCH for the SI-RNTI;
2>	indicate a downlink assignment and redundancy version for the dedicated broadcast HARQ process to the HARQ entity.
5.3.2	HARQ operation
5.3.2.1	HARQ Entity
The MAC entity includes a HARQ entity for each Serving Cell, which maintains a number of parallel HARQ processes. Each HARQ process is associated with a HARQ process identifier. The HARQ entity directs HARQ information and associated TBs received on the DL-SCH to the corresponding HARQ processes (see clause 5.3.2.2).
The number of parallel DL HARQ processes per HARQ entity is specified in TS 38.214 [7]. The dedicated broadcast HARQ process is used for BCCH.
The HARQ process supports one TB when the physical layer is not configured for downlink spatial multiplexing. The HARQ process supports one or two TBs when the physical layer is configured for downlink spatial multiplexing.
When the MAC entity is configured with pdsch-AggregationFactor > 1, the parameter pdsch-AggregationFactor provides the number of transmissions of a TB within a bundle of the downlink assignment. Bundling operation relies on the HARQ entity for invoking the same HARQ process for each transmission that is part of the same bundle. After the initial transmission, pdsch-AggregationFactor – 1 HARQ retransmissions follow within a bundle.
The MAC entity shall:
1>	if a downlink assignment has been indicated:
2>	allocate the TB(s) received from the physical layer and the associated HARQ information to the HARQ process indicated by the associated HARQ information.
1>	if a downlink assignment has been indicated for the broadcast HARQ process:
2>	allocate the received TB to the broadcast HARQ process.
5.3.2.2	HARQ process
When a transmission takes place for the HARQ process, one or two (in case of downlink spatial multiplexing) TBs and the associated HARQ information are received from the HARQ entity.
For each received TB and associated HARQ information, the HARQ process shall:
1>	if the NDI, when provided, has been toggled compared to the value of the previous received transmission corresponding to this TB; or
1>	if the HARQ process is equal to the broadcast process, and this is the first received transmission for the TB according to the system information schedule indicated by RRC; or
1>	if this is the very first received transmission for this TB (i.e. there is no previous NDI for this TB):
2>	consider this transmission to be a new transmission.
1>	else:
2>	consider this transmission to be a retransmission.
The MAC entity then shall:
1>	if this is a new transmission:
2>	attempt to decode the received data.
1>	else if this is a retransmission:
2>	if the data for this TB has not yet been successfully decoded:
3>	instruct the physical layer to combine the received data with the data currently in the soft buffer for this TB and attempt to decode the combined data.
1>	if the data which the MAC entity attempted to decode was successfully decoded for this TB; or
1>	if the data for this TB was successfully decoded before:
2>	if the HARQ process is equal to the broadcast process:
3>	deliver the decoded MAC PDU to upper layers.
2>	else if this is the first successful decoding of the data for this TB:
3>	deliver the decoded MAC PDU to the disassembly and demultiplexing entity.
1>	else:
2>	instruct the physical layer to replace the data in the soft buffer for this TB with the data which the MAC entity attempted to decode.
1>	if the HARQ process is associated with a transmission indicated with a Temporary C-RNTI and the Contention Resolution is not yet successful (see clause 5.1.5); or
1>	if the HARQ process is associated with a transmission indicated with a MSGB-RNTI and the Random Access procedure is not yet successfully completed (see clause 5.1.4a); or
1>	if the HARQ process is equal to the broadcast process; or
1>	if the timeAlignmentTimer, associated with the TAG containing the Serving Cell on which the HARQ feedback is to be transmitted, is stopped or expired:
2>	not instruct the physical layer to generate acknowledgement(s) of the data in this TB.
1>	else:
2>	instruct the physical layer to generate acknowledgement(s) of the data in this TB.
The MAC entity shall ignore NDI received in all downlink assignments on PDCCH for its Temporary C-RNTI when determining if NDI on PDCCH for its C-RNTI has been toggled compared to the value in the previous transmission.
NOTE:	If the MAC entity receives a retransmission with a TB size different from the last TB size signalled for this TB, the UE behavior is left up to UE implementation.
5.3.3	Disassembly and demultiplexing
The MAC entity shall disassemble and demultiplex a MAC PDU as defined in clauses 6.1.2 and 6.1.5a.
5.4	UL-SCH data transfer
5.4.1	UL Grant reception
Uplink grant is either received dynamically on the PDCCH, in a Random Access Response, configured semi-persistently by RRC or determined to be associated with the PUSCH resource of MSGA as specified in clause 5.1.2a. The MAC entity shall have an uplink grant to transmit on the UL-SCH. To perform the requested transmissions, the MAC layer receives HARQ information from lower layers. An uplink grant addressed to CS-RNTI with NDI = 0 is considered as a configured uplink grant. An uplink grant addressed to CS-RNTI with NDI = 1 is considered as a dynamic uplink grant.
If the MAC entity has a C-RNTI, a Temporary C-RNTI, or CS-RNTI, the MAC entity shall for each PDCCH occasion and for each Serving Cell belonging to a TAG that has a running timeAlignmentTimer and for each grant received for this PDCCH occasion:
1>	if an uplink grant for this Serving Cell has been received on the PDCCH for the MAC entity's C-RNTI or Temporary C-RNTI; or
1>	if an uplink grant has been received in a Random Access Response:
2>	if the uplink grant is for MAC entity's C-RNTI and if the previous uplink grant delivered to the HARQ entity for the same HARQ process was either an uplink grant received for the MAC entity's CS-RNTI or a configured uplink grant:
3>	consider the NDI to have been toggled for the corresponding HARQ process regardless of the value of the NDI.
2>	if the uplink grant is for MAC entity's C-RNTI, and the identified HARQ process is configured for a configured uplink grant:
3>	start or restart the configuredGrantTimer for the correponding HARQ process, if configured.
3>	stop the cg-RetransmissionTimer for the correponding HARQ process, if running.
2>	deliver the uplink grant and the associated HARQ information to the HARQ entity.
1>	else if an uplink grant for this PDCCH occasion has been received for this Serving Cell on the PDCCH for the MAC entity's CS-RNTI:
2>	if the NDI in the received HARQ information is 1:
3>	consider the NDI for the corresponding HARQ process not to have been toggled;
3>	start or restart the configuredGrantTimer for the corresponding HARQ process, if configured;
3>	stop the cg-RetransmissionTimer for the correponding HARQ process, if running;
3>	deliver the uplink grant and the associated HARQ information to the HARQ entity.
2>	else if the NDI in the received HARQ information is 0:
3>	if PDCCH contents indicate configured grant Type 2 deactivation:
4>	trigger configured uplink grant confirmation.
3>	else if PDCCH contents indicate configured grant Type 2 activation:
4>	trigger configured uplink grant confirmation;
4>	store the uplink grant for this Serving Cell and the associated HARQ information as configured uplink grant;
4>	initialise or re-initialise the configured uplink grant for this Serving Cell to start in the associated PUSCH duration and to recur according to rules in clause 5.8.2;
4>	stop the configuredGrantTimer for the corresponding HARQ process, if running;
4>	stop the cg-RetransmissionTimer for the correponding HARQ process, if running.
For each Serving Cell and each configured uplink grant, if configured and activated, the MAC entity shall:
1>	if the MAC entity is configured with lch-basedPrioritization; or
1>	if the PUSCH duration of the configured uplink grant does not overlap with the PUSCH duration of an uplink grant received on the PDCCH or in a Random Access Response for this Serving Cell or with a transmission of MSGA payload:
2>	set the HARQ Process ID to the HARQ Process ID associated with this PUSCH duration;
2>	if, for the corresponding HARQ process, the configuredGrantTimer is not running and cg-RetransmissionTimer is not configured (i.e. new transmission):
3>	consider the NDI bit for the corresponding HARQ process to have been toggled;
3>	deliver the configured uplink grant and the associated HARQ information to the HARQ entity.
2>	else if the cg-RetransmissionTimer for the corresponding HARQ process is configured and not running, then for the corresponding HARQ process:
3>	if the configuredGrantTimer is not running, and the HARQ process is not pending (i.e. new transmission):
4>	consider the NDI bit to have been toggled;
4>	deliver the configured uplink grant and the associated HARQ information to the HARQ entity.
3>	else if the previous uplink grant delivered to the HARQ entity for the same HARQ process was a configured uplink grant (i.e. retransmission on configured grant):
4>	deliver the configured uplink grant and the associated HARQ information to the HARQ entity.
Editor's Note: It is FFS whether SR/data prioritization can be a separate configurable parameter from data/data prioritization.
For configured uplink grants neither configured with harq-ProcID-Offset2 nor with cg-RetransmissionTimer, the HARQ Process ID associated with the first symbol of a UL transmission is derived from the following equation:
HARQ Process ID = [floor(CURRENT_symbol/periodicity)] modulo nrofHARQ-Processes
For configured uplink grants with harq-ProcID-Offset2, the HARQ Process ID associated with the first symbol of a UL transmission is derived from the following equation:
HARQ Process ID = [floor(CURRENT_symbol / periodicity)] modulo nrofHARQ-Processes + harq-ProcID-Offset2
where CURRENT_symbol = (SFN × numberOfSlotsPerFrame × numberOfSymbolsPerSlot + slot number in the frame × numberOfSymbolsPerSlot + symbol number in the slot), and numberOfSlotsPerFrame and numberOfSymbolsPerSlot refer to the number of consecutive slots per frame and the number of consecutive symbols per slot, respectively as specified in TS 38.211 [8].
For configured uplink grants configured with cg-RetransmissionTimer, the UE implementation select an HARQ Process ID among the HARQ process IDs available for the configured grant configuration. The UE shall prioritize retransmissions before initial transmissions. The UE shall toggle the NDI in the CG-UCI for new transmissions and not toggle the NDI in the CG-UCI in retransmissions.
NOTE 1:	CURRENT_symbol refers to the symbol index of the first transmission occasion of a repetition bundle that takes place.
NOTE 2:	A HARQ process is configured for a configured uplink grant where harq-ProcID-Offset2 is not configured, if the configured uplink grant is activated and the associated HARQ process ID is less than nrofHARQ-Processes. A HARQ process is configured for a configured uplink grant where harq-ProcID-Offset2 is configured, if the configured uplink grant is activated and the associated HARQ process ID is greater than or equal to harq-ProcID-Offset2 and less than sum of harq-ProcID-Offset2 and nrofHARQ-Processes for the configured grant configuration.
NOTE 3:	If the MAC entity receives a grant in a Random Access Response (i.e. MAC RAR or fallbackRAR) or determines a grant as specified in clause 5.1.2a for MSGA payload and if the MAC entity also receives an overlapping grant for its C-RNTI or CS-RNTI, requiring concurrent transmissions on the SpCell, the MAC entity may choose to continue with either the grant for its RA-RNTI/MSGB-RNTI/the MSGA payload transmission or the grant for its C-RNTI or CS-RNTI.
NOTE 4:	In case of unaligned SFN across carriers in a cell group, the SFN of the concerned Serving Cell is used to calculate the HARQ Process ID used for configured uplink grants.
NOTE 5:	A HARQ process is not shared between different configured grant configurations.
For the MAC entity configured with lch-basedPrioritization, priority of an uplink grant is determined by the highest priority among priorities of the logical channels with data available that are multiplexed or can be multiplexed in the MAC PDU, according to the mapping restrictions as described in clause 5.4.3.1.2.
Editor's Note: Priority determination considering MAC CE is FFS.
When the MAC entity is configured, with lch-basedPrioritization, for each uplink grant which is not already a de-prioritized uplink grant:
1>	if this uplink grant is addressed to CS-RNTI with NDI = 1 or C-RNTI:
2>	if there is no overlapping PUSCH duration of a configured uplink grant, in the same BWP whose priority is higher than the priority of the uplink grant; and
2>	if there is no overlapping PUCCH resource with an SR transmission where the priority of the logical channel that triggered the SR is higher than the priority of the uplink grant:
3>	this uplink grant is a prioritized uplink grant;
3>	the other overlapping uplink grant(s), if any, is a de-prioritized uplink grant.
1>	else if this uplink grant is a configured uplink grant:
2>	if there is no overlapping PUSCH duration of another configured uplink grant, in the same BWP, whose priority is higher than the priority of the uplink grant; and
2>	if there is no overlapping PUSCH duration of an uplink grant addressed to CS-RNTI with NDI = 1 or C-RNTI, in the same BWP, whose priority is higher than or equal to the priority of the uplink grant; and
2>	if there is no overlapping PUCCH resource with an SR transmission where the priority of the logical channel that triggered the SR is higher than the priority of the uplink grant:
3>	this uplink grant is a prioritized uplink grant;
3>	the other overlapping uplink grant(s), if any, is a de-prioritized uplink grant.
NOTE 6:	If there is overlapping PUSCH duration of at least two configured uplink grants whose priorities are equal, the prioritized uplink grant is determined by UE implementation.
5.4.2	HARQ operation
5.4.2.1	HARQ Entity
The MAC entity includes a HARQ entity for each Serving Cell with configured uplink (including the case when it is configured with supplementaryUplink), which maintains a number of parallel HARQ processes.
The number of parallel UL HARQ processes per HARQ entity is specified in TS 38.214 [7].
Each HARQ process supports one TB.
Each HARQ process is associated with a HARQ process identifier. For UL transmission with UL grant in RA Response or for UL transmission for MSGA payload, HARQ process identifier 0 is used.
NOTE:	When a single DCI is used to schedule multiple PUSCH, the UE is allowed to map generated TB(s) internally to different HARQ processes in case of LBT failure(s), i.e. UE may transmit a new TB on any HARQ process in the grants that have the same TBS, the same RV and the NDIs indicate new transmission.
The number of transmissions of a TB within a bundle of the dynamic grant or configured grant is given by REPETITION_NUMBER as follows:
-	For a dynamic grant, REPETITION_NUMBER is set to a value provided by lower layers, as specified in clause 6.1.2.1 of TS 38.214 [7];
-	For a configured grant, REPETITION_NUMBER is set to a value provided by lower layers, as specified in clause 6.1.2.3 of TS 38.214 [7].
If REPETITION_NUMBER > 1, after the initial transmission, REPETITION_NUMBER – 1 HARQ retransmissions follow within a bundle. For both dynamic grant and configured uplink grant, bundling operation relies on the HARQ entity for invoking the same HARQ process for each transmission that is part of the same bundle. Within a bundle, HARQ retransmissions are triggered without waiting for feedback from previous transmission according to REPETITION_NUMBER for a dynamic grant or configured uplink grant. Each transmission within a bundle is a separate uplink grant after the initial uplink grant within a bundle is delivered to the HARQ entity.
For each transmission within a bundle of the dynamic grant, the sequence of redundancy versions is determined according to clause 6.1.2.1 of TS 38.214 [7]. For each transmission within a bundle of the configured uplink grant, the sequence of redundancy versions is determined according to clause 6.1.2.3 of TS 38.214 [7].
For configured uplink grants configured with cg-RetransmissionTimer, the redundancy version zero is used for initial transmissions and UE implementation selects redundancy version for retransmissions.
For each uplink grant, the HARQ entity shall:
1>	identify the HARQ process associated with this grant, and for each identified HARQ process:
2>	if the received grant was not addressed to a Temporary C-RNTI on PDCCH, and the NDI provided in the associated HARQ information has been toggled compared to the value in the previous transmission of this TB of this HARQ process; or
2>	if the uplink grant was received on PDCCH for the C-RNTI and the HARQ buffer of the identified process is empty; or
2>	if the uplink grant was received in a Random Access Response (i.e. in a MAC RAR or a fallback RAR); or
2>	if the uplink grant was determined as specified in clause 5.1.2a for the transmission of the MSGA payload; or
2>	if the uplink grant was received on PDCCH for the C-RNTI in ra-ResponseWindow and this PDCCH successfully completed the Random Access procedure initiated for beam failure recovery; or
2>	if the uplink grant is part of a bundle of the configured uplink grant, and may be used for initial transmission according to clause 6.1.2.3 of TS 38.214 [7], and if no MAC PDU has been obtained for this bundle:
3>	if there is a MAC PDU in the MSGA buffer and the uplink grant determined as specified in clause 5.1.2a for the transmission of the MSGA payload was selected:
4>	obtain the MAC PDU to transmit from the MsgA buffer.
3>	else if there is a MAC PDU in the Msg3 buffer and the uplink grant was received in a fallbackRAR:
4>	obtain the MAC PDU to transmit from the Msg3 buffer.
3>	else if there is a MAC PDU in the Msg3 buffer and the uplink grant was received in a MAC RAR; or:
3>	if there is a MAC PDU in the Msg3 buffer and the uplink grant was received on PDCCH for the C-RNTI in ra-ResponseWindow and this PDCCH successfully completed the Random Access procedure initiated for beam failure recovery:
4>	obtain the MAC PDU to transmit from the Msg3 buffer.
4>	if the uplink grant size does not match with size of the obtained MAC PDU; and
4>	if the Random Access procedure was successfully completed upon receiving the uplink grant:
5>	indicate to the Multiplexing and assembly entity to include MAC subPDU(s) carrying MAC SDU from the obtained MAC PDU in the subsequent uplink transmission;
5>	obtain the MAC PDU to transmit from the Multiplexing and assembly entity.
3>	else if this uplink grant is a configured grant which is a prioritized uplink grant; and
3>	if the configured grant is configured with autonomousReTx; and
3>	if the previous configured uplink grant for this HARQ process was de-prioritized; and
3>	if a MAC PDU had already been obtained for this HARQ process; and
3>	if a transmission of the obtained MAC PDU has not been performed:
4>	consider the MAC PDU has been obtained.
3>	else if the MAC entity is not configured with lch-basedPrioritization; or
3>	if this uplink grant is a prioritized uplink grant:
4>	obtain the MAC PDU to transmit from the Multiplexing and assembly entity, if any;
3>	if a MAC PDU to transmit has been obtained:
4>	deliver the MAC PDU and the uplink grant and the HARQ information of the TB to the identified HARQ process;
4>	instruct the identified HARQ process to trigger a new transmission;
4>	if the uplink grant is a configured uplink grant:
5>	start or restart the configuredGrantTimer, if configured, for the corresponding HARQ process when the transmission is performed;
5>	start or restart the cg-RetransmissionTimer, if configured, for the corresponding HARQ process when the transmission is performed.
4>	if the uplink grant is addressed to C-RNTI, and the identified HARQ process is configured for a configured uplink grant:
5>	start or restart the configuredGrantTimer, if configured, for the corresponding HARQ process when the transmission is performed.
4>	if cg-RetransmissionTimer is configured for the identified HARQ process:
5>	if the transmission is performed:
6>	consider the identified HARQ process as not pending.
5>	else:
6>	consider the identified HARQ process as pending.
3>	else:
4>	flush the HARQ buffer of the identified HARQ process.
2>	else (i.e. retransmission):
3>	if the uplink grant received on PDCCH was addressed to CS-RNTI and if the HARQ buffer of the identified process is empty; or
3>	if the uplink grant is part of a bundle and if no MAC PDU has been obtained for this bundle; or
3>	if the uplink grant is part of a bundle of the configured uplink grant, and the PUSCH duration of the uplink grant overlaps with a PUSCH duration of another uplink grant received on the PDCCH or an uplink grant received in a Random Access Response (i.e. MAC RAR or fallbackRAR) or an uplink grant determined as specified in clause 5.1.2a for MSGA payload for this Serving Cell; or:
3>	if the MAC entity is configured with lch-basedPrioritization and this uplink grant is not a prioritized uplink grant:
4>	ignore the uplink grant.
3>	else:
4>	deliver the uplink grant and the HARQ information (redundancy version) of the TB to the identified HARQ process;
4>	instruct the identified HARQ process to trigger a retransmission;
4>	if the uplink grant is addressed to CS-RNTI; or
4>	if the uplink grant is addressed to C-RNTI, and the identified HARQ process is configured for a configured uplink grant:
5>	start or restart the configuredGrantTimer, if configured, for the corresponding HARQ process when the transmission is performed.
4>	if the uplink grant is a configured uplink grant:
5>	if the identified HARQ process is pending:
6>	start or restart the configuredGrantTimer for the corresponding HARQ process when the transmission is performed;
5>	start or restart the cg-RetransmissionTimer, if configured, for the corresponding HARQ process when the transmission is performed.
4>	if the identified HARQ process is pending and the transmission is performed:
5>	consider the identified HARQ process as not pending.
When determining if NDI has been toggled compared to the value in the previous transmission the MAC entity shall ignore NDI received in all uplink grants on PDCCH for its Temporary C-RNTI.
Editor's Note:	How to fix "HARQ buffer is flushed when the autonomous (re)transmission is deprioritized again" is FFS.
5.4.2.2	HARQ process
Each HARQ process is associated with a HARQ buffer.
New transmissions are performed on the resource and with the MCS indicated on PDCCH or indicated in the Random Access Response (i.e. MAC RAR or fallbackRAR), or signalled in RRC or determined as specified in clause 5.1.2a for MSGA payload. Retransmissions are performed on the resource and, if provided, with the MCS indicated on PDCCH, or on the same resource and with the same MCS as was used for last made transmission attempt within a bundle, or on stored configured uplink grant resources and stored MCS when cg-RetransmissionTimer is configured. Retransmissions with the same HARQ process may be performed on any configured grant configuration if the configured grant configurations have the same TBS.
When cg-RetransmissionTimer is configured and the HARQ entity obtains a MAC PDU to transmit, the corresponding HARQ process is considered to be pending. A pending HARQ process is pending until a transmission is performed on that HARQ process or until the HARQ process is flushed.
If the HARQ entity requests a new transmission for a TB, the HARQ process shall:
1>	store the MAC PDU in the associated HARQ buffer;
1>	store the uplink grant received from the HARQ entity;
1>	generate a transmission as described below.
If the HARQ entity requests a retransmission for a TB, the HARQ process shall:
1>	store the uplink grant received from the HARQ entity;
1>	generate a transmission as described below.
To generate a transmission for a TB, the HARQ process shall:
1>	if the MAC PDU was obtained from the Msg3 buffer; or
1>	if the MAC PDU was obtained from the MSGA buffer; or
1>	if there is no measurement gap at the time of the transmission and, in case of retransmission, the retransmission does not collide with a transmission for a MAC PDU obtained from the Msg3 buffer or the MSGA buffer:
2>	if there are neither transmission of NR sidelink communication nor transmission of V2X sidelink communication at the time of the transmission; or
2>	if there are both a sidelink grant for transmission of NR sidelink communication and a configured grant for transmission of V2X sidelink communication on SL-SCH as described in clause 5.14.1.2.2 of TS 36.321 [22] at the time of the transmission, and neither the transmission of NR sidelink communication is prioritized as described in clause 5.22.1.3.1 nor the transmissions of V2X sidelink communication is prioritized as described in clause 5.4.2.2 of TS 36.321 [22]; or
2>	if there are both a sidelink grant for transmission of NR sidelink communication and a configured grant for transmission of V2X sidelink communication on SL-SCH as described in clause 5.14.1.2.2 of TS 36.321 [22] at the time of the transmission, and the value of the highest priority of the logical channel(s) in the MAC PDU is lower than ul-PrioritizationThres if ul-PrioritizationThres is configured; or
2>	if there are both a sidelink grant for transmission of NR sidelink communication and a configured grant for transmission of V2X sidelink communication on SL-SCH as described in clause 5.14.1.2.2 of TS 36.321 [22] at the time of the transmission, and the MAC entity is able to perform this UL transmission simultaneously with both the transmission of NR sidelink communication which is prioritized as described in clause 5.22.1.3.1 and the transmissions of V2X sidelink communication which are prioritized as described in clause 5.14.1.2.2 of TS 36.321 [22]; or
2>	if there is a configured grant for transmission of V2X sidelink communication on SL-SCH as described in clause 5.14.1.2.2 of TS 36.321 [22] at the time of the transmission, and either none of the transmissions of V2X sidelink communication is prioritized as described in clause 5.4.2.2 of TS 36.321 [22] or the MAC entity is able to perform this UL transmission simultaneously with the transmissions of V2X sidelink communication which are prioritized as described in clause 5.14.1.2.2 of TS 36.321 [22]; or
2>	if there is a sidelink grant for transmission of NR sidelink communication at the time of the transmission, and if the transmission of NR sidelink communication is not prioritized as described in clause 5.22.1.3.1, or the value of the highest priority of the logical channel(s) in the MAC PDU is lower than ul-PrioritizationThres if ul-PrioritizationThres is configured, or there is a sidelink grant for transmission of NR sidelink communication at the time of the transmission, and the MAC entity is able to perform this UL transmission simultaneously with the transmission of NR sidelink communication which is prioritized as described in clause 5.22.1.3.1:
NOTE 1:	Among the UL transmissions where the MAC entity is able to perform the transmission of NR sidelink communication prioritized simultaneously, if there are more than one UL transmission which the MAC entity is not able to perform simultaneously, it is up to UE implementation whether this UL transmission is performed.
NOTE 2:	Among the UL transmissions that the MAC entity is able to perform simultaneously with all transmissions of V2X sidelink communication prioritized, if there are more than one UL transmission which the MAC entity is not able to perform simultaneously, it is up to UE implementation whether this UL transmission is performed.
NOTE 3:	Among the UL transmissions where the MAC entity is able to perform the transmission of NR sidelink communication prioritized simultaneously with all transmissions of V2X sidelink communication prioritized, if there are more than one UL transmission which the MAC entity is not able to perform simultaneously, it is up to UE implementation whether this UL transmission is performed.
NOTE 4:	If there is a configured grant for transmission of V2X sidelink communication on SL-SCH as described in clause 5.14.1.2.2 of TS 36.321 [22] at the time of the transmission, and the MAC entity is not able to perform this UL transmission simultaneously with the transmission of V2X sidelink communication, and prioritization-related information is not available prior to the time of the transmission due to processing time restriction, it is up to UE implementation whether this UL transmission is performed.
3>	instruct the physical layer to generate a transmission according to the stored uplink grant.
If a HARQ process receives downlink feedback information, the HARQ process shall:
1>	stop the cg-RetransmissionTimer, if running;
1>	if acknowledgement is indicated:
2>	stop the configuredGrantTimer, if running.
If the configuredGrantTimer expires for a HARQ process, the HARQ process shall:
1>	stop the cg-RetransmissionTimer, if running.
5.4.3	Multiplexing and assembly
5.4.3.1	Logical Channel Prioritization
5.4.3.1.1	General
The Logical Channel Prioritization (LCP) procedure is applied whenever a new transmission is performed.
RRC controls the scheduling of uplink data by signalling for each logical channel per MAC entity:
-	priority where an increasing priority value indicates a lower priority level;
-	prioritisedBitRate which sets the Prioritized Bit Rate (PBR);
-	bucketSizeDuration which sets the Bucket Size Duration (BSD).
RRC additionally controls the LCP procedure by configuring mapping restrictions for each logical channel:
-	allowedSCS-List which sets the allowed Subcarrier Spacing(s) for transmission;
-	maxPUSCH-Duration which sets the maximum PUSCH duration allowed for transmission;
-	configuredGrantType1Allowed which sets whether a configured grant Type 1 can be used for transmission;
-	allowedServingCells which sets the allowed cell(s) for transmission;
-	allowedCG-List which sets the allowed configured grant(s) for transmission;
-	allowedPHY-PriorityIndex which sets the allowed PHY priority index(es) of a dynamic grant for transmission.
The following UE variable is used for the Logical channel prioritization procedure:
-	Bj which is maintained for each logical channel j.
The MAC entity shall initialize Bj of the logical channel to zero when the logical channel is established.
For each logical channel j, the MAC entity shall:
1>	increment Bj by the product PBR × T before every instance of the LCP procedure, where T is the time elapsed since Bj was last incremented;
1>	if the value of Bj is greater than the bucket size (i.e. PBR × BSD):
2>	set Bj to the bucket size.
NOTE:	The exact moment(s) when the UE updates Bj between LCP procedures is up to UE implementation, as long as Bj is up to date at the time when a grant is processed by LCP.
5.4.3.1.2	Selection of logical channels
The MAC entity shall, when a new transmission is performed:
1>	select the logical channels for each UL grant that satisfy all the following conditions:
2>	the set of allowed Subcarrier Spacing index values in allowedSCS-List, if configured, includes the Subcarrier Spacing index associated to the UL grant; and
2>	maxPUSCH-Duration, if configured, is larger than or equal to the PUSCH transmission duration associated to the UL grant; and
2>	configuredGrantType1Allowed, if configured, is set to true in case the UL grant is a Configured Grant Type 1; and
2>	allowedServingCells, if configured, includes the Cell information associated to the UL grant. Does not apply to logical channels associated with a DRB configured with PDCP duplication within the same MAC entity (i.e. CA duplication) for which PDCP duplication is deactivated; and
2>	allowedCG-List, if configured, includes the configured grant index associated to the UL grant; and
2>	allowedPHY-PriorityIndex, if configured, includes the priority index (as specified in clause 9 of TS 38.213 [6]) associated to the dynamic UL grant.
NOTE:	The Subcarrier Spacing index, PUSCH transmission duration, Cell information, and priority index are included in Uplink transmission information received from lower layers for the corresponding scheduled uplink transmission.
5.4.3.1.3	Allocation of resources
The MAC entity shall, when a new transmission is performed:
1>	allocate resources to the logical channels as follows:
2>	logical channels selected in clause 5.4.3.1.2 for the UL grant with Bj > 0 are allocated resources in a decreasing priority order. If the PBR of a logical channel is set to infinity, the MAC entity shall allocate resources for all the data that is available for transmission on the logical channel before meeting the PBR of the lower priority logical channel(s);
2>	decrement Bj by the total size of MAC SDUs served to logical channel j above;
2>	if any resources remain, all the logical channels selected in clause 5.4.3.1.2 are served in a strict decreasing priority order (regardless of the value of Bj) until either the data for that logical channel or the UL grant is exhausted, whichever comes first. Logical channels configured with equal priority should be served equally.
NOTE 1:	The value of Bj can be negative.
If the MAC entity is requested to simultaneously transmit multiple MAC PDUs, or if the MAC entity receives the multiple UL grants within one or more coinciding PDCCH occasions (i.e. on different Serving Cells), it is up to UE implementation in which order the grants are processed.
The UE shall also follow the rules below during the scheduling procedures above:
-	the UE should not segment an RLC SDU (or partially transmitted SDU or retransmitted RLC PDU) if the whole SDU (or partially transmitted SDU or retransmitted RLC PDU) fits into the remaining resources of the associated MAC entity;
-	if the UE segments an RLC SDU from the logical channel, it shall maximize the size of the segment to fill the grant of the associated MAC entity as much as possible;
-	the UE should maximise the transmission of data;
-	if the MAC entity is given a UL grant size that is equal to or larger than 8 bytes while having data available and allowed (according to clause 5.4.3.1) for transmission, the MAC entity shall not transmit only padding BSR and/or padding.
The MAC entity shall not generate a MAC PDU for the HARQ entity if the following conditions are satisfied:
-	the MAC entity is configured with skipUplinkTxDynamic with value true and the grant indicated to the HARQ entity was addressed to a C-RNTI, or the grant indicated to the HARQ entity is a configured uplink grant; and
-	there is no aperiodic CSI requested for this PUSCH transmission as specified in TS 38.212 [9]; and
-	the MAC PDU includes zero MAC SDUs; and
-	the MAC PDU includes only the periodic BSR and there is no data available for any LCG, or the MAC PDU includes only the padding BSR.
Logical channels shall be prioritised in accordance with the following order (highest priority listed first):
-	C-RNTI MAC CE or data from UL-CCCH;
-	Configured Grant Confirmation MAC CE or BFR MAC CE or Multiple Entry Configured Grant Confirmation MAC CE;
-	Sidelink Configured Grant Confirmation MAC CE;
-	LBT failure MAC CE;
-	MAC CE for SL-BSR prioritized according to clause 5.22.1.6;
-	MAC CE for BSR, with exception of BSR included for padding;
-	Single Entry PHR MAC CE or Multiple Entry PHR MAC CE;
-	MAC CE for the number of Desired Guard Symbols;
-	MAC CE for Pre-emptive BSR;
-	MAC CE for SL-BSR, with exception of SL-BSR prioritized according to clause 5.22.1.6 and SL-BSR included for padding;
-	data from any Logical Channel, except data from UL-CCCH;
-	MAC CE for Recommended bit rate query;
-	MAC CE for BSR included for padding;
-	MAC CE for SL-BSR included for padding.
NOTE 2:	Prioritization between Configured Grant Confirmation MAC CE and BFR MAC CE is up to UE implementation.
5.4.3.2	Multiplexing of MAC Control Elements and MAC SDUs
The MAC entity shall multiplex MAC CEs and MAC SDUs in a MAC PDU according to clauses 5.4.3.1 and 6.1.2.
NOTE:	Content of a MAC PDU does not change after being built for transmission on a dynamic uplink grant, regardless of LBT outcome.
5.4.4	Scheduling Request
The Scheduling Request (SR) is used for requesting UL-SCH resources for new transmission.
The MAC entity may be configured with zero, one, or more SR configurations. An SR configuration consists of a set of PUCCH resources for SR across different BWPs and cells. For a logical channel or for SCell beam failure recovery (see clause 5.17) and for consistent LBT failure (see clause 5.21), at most one PUCCH resource for SR is configured per BWP.
Each SR configuration corresponds to one or more logical channels or to SCell beam failure recovery and/or to consistent LBT failure. Each logical channel, and consistent LBT failure, may be mapped to zero or one SR configuration, which is configured by RRC. The SR configuration of the logical channel that triggered a BSR other than Pre-emptive BSR (clause 5.4.5) or the SCell beam failure recovery or the consistent LBT failure (clause 5.21) (if such a configuration exists) is considered as corresponding SR configuration for the triggered SR. Any SR configuration may be used for an SR triggered by Pre-emptive BSR (clause 5.4.5).
RRC configures the following parameters for the scheduling request procedure:
-	sr-ProhibitTimer (per SR configuration);
-	sr-TransMax (per SR configuration).
The following UE variables are used for the scheduling request procedure:
-	SR_COUNTER (per SR configuration).
If an SR is triggered and there are no other SRs pending corresponding to the same SR configuration, the MAC entity shall set the SR_COUNTER of the corresponding SR configuration to 0.
When an SR is triggered, it shall be considered as pending until it is cancelled.
Except for SCell beam failure recovery, all pending SR(s) for BSR triggered according to the BSR procedure (clause 5.4.5) prior to the MAC PDU assembly shall be cancelled and each respective sr-ProhibitTimer shall be stopped when the MAC PDU is transmitted, regardless of LBT failure indication from lower layers, and this PDU includes a Long or Short BSR MAC CE which contains buffer status up to (and including) the last event that triggered a BSR (see clause 5.4.5) prior to the MAC PDU assembly. Except for SCell beam failure recovery, all pending SR(s) for BSR triggered according to the BSR procedure (clause 5.4.5) shall be cancelled and each respective sr-ProhibitTimer shall be stopped when the UL grant(s) can accommodate all pending data available for transmission. Pending SR triggered prior to the MAC PDU assembly for beam failure recovery of an SCell shall be cancelled when the MAC PDU is transmitted and this PDU includes an SCell BFR MAC CE or truncated SCell BFR MAC CE which contains beam failure recovery information of that SCell. If all the SR(s) triggered for SCell beam failure recovery are cancelled the MAC entity shall stop sr-ProhibitTimer of corresponding SR configuration.
The MAC entity shall for each pending SR triggered by consistent LBT failure:
1>	if a MAC PDU is transmitted, regardless of LBT failure indication from lower layers, and the MAC PDU includes an LBT failure MAC CE that indicates consistent LBT failure for the Serving Cell that triggered this SR; or
1>	if the corresponding consistent LBT failure is cancelled (see clause 5.21):
2>	cancel the pending SR and stop the corresponding sr-ProhibitTimer.
Only PUCCH resources on a BWP which is active at the time of SR transmission occasion are considered valid.
As long as at least one SR is pending, the MAC entity shall for each pending SR:
1>	if the MAC entity has no valid PUCCH resource configured for the pending SR:
2>	initiate a Random Access procedure (see clause 5.1) on the SpCell and cancel the pending SR.
1>	else, for the SR configuration corresponding to the pending SR:
2>	when the MAC entity has an SR transmission occasion on the valid PUCCH resource for SR configured; and
2>	if sr-ProhibitTimer is not running at the time of the SR transmission occasion; and
2>	if the PUCCH resource for the SR transmission occasion does not overlap with a measurement gap:
3>	if the PUCCH resource for the SR transmission occasion overlaps with neither a UL-SCH resource nor an SL-SCH resource; or
3>	if the MAC entity is configured with lch-basedPrioritization, and the PUCCH resource for the SR transmission occasion overlaps with any UL-SCH resource(s), and the priority of the logical channel that triggered SR is higher than the priority of the uplink grant(s) for any UL-SCH resource(s) where the priority of the uplink grant is determined as specified in clause 5.4.1; or
3>	if a SL-SCH resource overlaps with the PUCCH resource for the SR transmission occasion for the pending SR triggered as specfied in clause 5.4.5, and the MAC entity is not able to perform this SR transmission simultaneously with the transmission of the SL-SCH resource, and either transmission on the SL-SCH resource is not prioritized as described in clause 5.22.1.3.1 or the priority value of the logical channel that triggered SR is lower than ul-Prioritizationthres, if configured; or
3>	if a SL-SCH resource overlaps with the PUCCH resource for the SR transmission occasion for the pending SR triggered as specfied in clause 5.22.1.5, and the MAC entity is not able to perform this SR transmission simultaneously with the transmission of the SL-SCH resource, and the priority of the triggered SR determined as specified in clause 5.22.1.5 is higher than the priority of the MAC PDU determined as specified in clause 5.22.1.3.1 for the SL-SCH resource:
4>	the other overlapping uplink grant(s), if any, is a de-prioritized uplink grant;
4>	if SR_COUNTER < sr-TransMax:
5>	instruct the physical layer to signal the SR on one valid PUCCH resource for SR;
5>	if LBT failure indication is not received from lower layers:
5>	increment SR_COUNTER by 1;
6>	start the sr-ProhibitTimer.
4>	else:
5>	notify RRC to release PUCCH for all Serving Cells;
5>	notify RRC to release SRS for all Serving Cells;
5>	clear any configured downlink assignments and uplink grants;
5>	clear any PUSCH resources for semi-persistent CSI reporting;
5>	initiate a Random Access procedure (see clause 5.1) on the SpCell and cancel all pending SRs.
NOTE 1:	Except for SR for SCell beam failure recovery, the selection of which valid PUCCH resource for SR to signal SR on when the MAC entity has more than one overlapping valid PUCCH resource for the SR transmission occasion is left to UE implementation.
NOTE 2:	If more than one individual SR triggers an instruction from the MAC entity to the PHY layer to signal the SR on the same valid PUCCH resource, the SR_COUNTER for the relevant SR configuration is incremented only once.
NOTE 3:	When the MAC entity has pending SR for SCell beam failure recovery and the MAC entity has one or more PUCCH resources overlapping with PUCCH resource for SCell beam failure recovery for the SR transmission occasion, the MAC entity considers only the PUCCH resource for SCell beam failure recovery as valid.
NOTE 4:	For a UE operating in a semi-static channel access mode as described in TS 37.213 [18], PUCCH resources overlapping with the idle time of a fixed frame period are not considered valid.
The MAC entity may stop, if any, ongoing Random Access procedure due to a pending SR for BSR which has no valid PUCCH resources configured, which was initiated by MAC entity prior to the MAC PDU assembly. The ongoing Random Access procedure may be stopped when the MAC PDU is transmitted, regardless of LBT failure indication from lower layers, using a UL grant other than a UL grant provided by Random Access Response or a UL grant determined as specified in clause 5.1.2a for the transmission of the MSGA payload, and this PDU includes a BSR MAC CE which contains buffer status up to (and including) the last event that triggered a BSR (see clause 5.4.5) prior to the MAC PDU assembly, or when the UL grant(s) can accommodate all pending data available for transmission. The ongoing Random Access procedure due to a pending SR for BFR of an SCell may be stopped when the MAC PDU is transmitted using a UL grant other than a UL grant provided by Random Access Response and this PDU contains an SCell BFR MAC CE or truncated SCell BFR MAC CE which includes beam failure recovery information of that SCell.
Editor's Note: It is FFS how Random Access procedures started due to consistent LBT failures are cancelled.
5.4.5	Buffer Status Reporting
The Buffer Status reporting (BSR) procedure is used to provide the serving gNB with information about UL data volume in the MAC entity. In the case of IAB, it is additionally used by an IAB-MT to provide its parent IAB-DU with the information about the amount of the data expected to arrive at the MT of the IAB node from its child node(s) and or UE(s) connected to it. This BSR is referred to as Pre-emptive BSR.
For BSR other than Pre-emptive BSR, RRC configures the following parameters to control the BSR:
-	periodicBSR-Timer;
-	retxBSR-Timer;
-	logicalChannelSR-DelayTimerApplied;
-	logicalChannelSR-DelayTimer;
-	logicalChannelSR-Mask;
-	logicalChannelGroup.
Each logical channel may be allocated to an LCG using the logicalChannelGroup. The maximum number of LCGs is eight.
The MAC entity determines the amount of UL data available for a logical channel according to the data volume calculation procedure in TSs 38.322 [3] and 38.323 [4].
A BSR other than Pre-emptive BSR shall be triggered if any of the following events occur:
-	UL data, for a logical channel which belongs to an LCG, becomes available to the MAC entity; and either
-	this UL data belongs to a logical channel with higher priority than the priority of any logical channel containing available UL data which belong to any LCG; or
-	none of the logical channels which belong to an LCG contains any available UL data.
	in which case the BSR is referred below to as 'Regular BSR';
-	UL resources are allocated and number of padding bits is equal to or larger than the size of the Buffer Status Report MAC CE plus its subheader, in which case the BSR is referred below to as 'Padding BSR';
-	retxBSR-Timer expires, and at least one of the logical channels which belong to an LCG contains UL data, in which case the BSR is referred below to as 'Regular BSR';
-	periodicBSR-Timer expires, in which case the BSR is referred below to as 'Periodic BSR'.
NOTE 1:	When Regular BSR triggering events occur for multiple logical channels simultaneously, each logical channel triggers one separate Regular BSR.
If configured, Pre-emptive BSR may be triggered for the specific case of an IAB-MT if any of the following events occur:
-	UL grant is provided to child IAB node or UE;
-	BSR is received from child IAB node or UE.
For Regular BSR, the MAC entity shall:
1>	if the BSR is triggered for a logical channel for which logicalChannelSR-DelayTimerApplied with value true is configured by upper layers:
2>	start or restart the logicalChannelSR-DelayTimer.
1>	else:
2>	if running, stop the logicalChannelSR-DelayTimer.
For Regular and Periodic BSR, the MAC entity shall:
1>	if more than one LCG has data available for transmission when the MAC PDU containing the BSR is to be built:
2>	report Long BSR for all LCGs which have data available for transmission.
1>	else:
2>	report Short BSR.
For Padding BSR, the MAC entity shall:
1>	if the number of padding bits is equal to or larger than the size of the Short BSR plus its subheader but smaller than the size of the Long BSR plus its subheader:
2>	if more than one LCG has data available for transmission when the BSR is to be built:
3>	if the number of padding bits is equal to the size of the Short BSR plus its subheader:
4>	report Short Truncated BSR of the LCG with the highest priority logical channel with data available for transmission.
3>	else:
4>	report Long Truncated BSR of the LCG(s) with the logical channels having data available for transmission following a decreasing order of the highest priority logical channel (with or without data available for transmission) in each of these LCG(s), and in case of equal priority, in increasing order of LCGID.
2>	else:
3>	report Short BSR.
1>	else if the number of padding bits is equal to or larger than the size of the Long BSR plus its subheader:
2>	report Long BSR for all LCGs which have data available for transmission.
For Pre-emptive BSR, the MAC entity shall:
1>	report Pre-emptive BSR.
For BSR triggered by retxBSR-Timer expiry, the MAC entity considers that the logical channel that triggered the BSR is the highest priority logical channel that has data available for transmission at the time the BSR is triggered.
The MAC entity shall:
1>	if the Buffer Status reporting procedure determines that at least one BSR other than Pre-emptive BSR has been triggered and not cancelled:
2>	if UL-SCH resources are available for a new transmission and the UL-SCH resources can accommodate the BSR MAC CE plus its subheader as a result of logical channel prioritization:
3>	instruct the Multiplexing and Assembly procedure to generate the BSR MAC CE(s);
3>	start or restart periodicBSR-Timer except when all the generated BSRs are long or short Truncated BSRs;
3>	start or restart retxBSR-Timer.
2>	if a Regular BSR has been triggered and logicalChannelSR-DelayTimer is not running:
3>	if there is no UL-SCH resource available for a new transmission; or
3>	if the MAC entity is configured with configured uplink grant(s) and the Regular BSR was triggered for a logical channel for which logicalChannelSR-Mask is set to false; or
3>	if the UL-SCH resources available for a new transmission do not meet the LCP mapping restrictions (see clause 5.4.3.1) configured for the logical channel that triggered the BSR:
4>	trigger a Scheduling Request.
1>	if the Buffer Status reporting procedure determines that at least one Pre-emptive BSR has been triggered and not cancelled:
2>	if UL-SCH resources are available for a new transmission and the UL-SCH resources can accommodate the Pre-emptive BSR MAC CE plus its subheader as a result of logical channel prioritization:
3>	instruct the Multiplexing and Assembly procedure to generate the Pre-emptive BSR MAC CE.
2>	else:
3>	trigger a Scheduling Request.
NOTE 2:	UL-SCH resources are considered available if the MAC entity has an active configuration for either type of configured uplink grants, or if the MAC entity has received a dynamic uplink grant, or if both of these conditions are met. If the MAC entity has determined at a given point in time that UL-SCH resources are available, this need not imply that UL-SCH resources are available for use at that point in time.
For the case when Pre-emptive BSR is being sent, a MAC PDU may contain one BSR MAC CE for Pre-emptive BSR, and one BSR MAC CE for BSR other than Pre-emptive BSR. A MAC PDU not containing a BSR MAC CE for Pre-emptive BSR shall contain at most one BSR MAC CE, even when multiple events have triggered a BSR. The Regular BSR and the Periodic BSR shall have precedence over the padding BSR.
The MAC entity shall restart retxBSR-Timer upon reception of a grant for transmission of new data on any UL-SCH.
All triggered BSRs other than Pre-emptive BSR may be cancelled when the UL grant(s) can accommodate all pending data available for transmission but is not sufficient to additionally accommodate the BSR MAC CE plus its subheader. All BSRs other than Pre-emptive BSR triggered prior to MAC PDU assembly shall be cancelled when a MAC PDU is transmitted, regardless of LBT failure indication from lower layers, and this PDU includes a Long or Short BSR MAC CE which contains buffer status up to (and including) the last event that triggered a BSR prior to the MAC PDU assembly. A Pre-emptive BSR shall be cancelled when a MAC PDU is transmitted and this PDU includes the corresponding Pre-emptive BSR MAC CE.
NOTE 3:	MAC PDU assembly can happen at any point in time between uplink grant reception and actual transmission of the corresponding MAC PDU. BSR and SR can be triggered after the assembly of a MAC PDU which contains a BSR MAC CE, but before the transmission of this MAC PDU. In addition, BSR and SR can be triggered during MAC PDU assembly.
NOTE 4:	Pre-emptive BSR may be used for the case of dual-connected IAB node. It is up to network implementation to work out the associated MAC entity or entities, and the associated expected amount of data. For the case of dual-connected IAB node, there may be ambiguity in Pre-emptive BSR calculations and interpretation by the receiving nodes in case where BH RLC channels mapped to different egress Cell Groups are not mapped to different ingress LCGs.
NOTE 5:	If a HARQ process is configured with cg-RetransmissionTimer and if the BSR is already included in a MAC PDU for transmission by this HARQ process, but not yet transmitted by lower layers, it is up to UE implementation how to handle the BSR content.
5.4.6	Power Headroom Reporting
The Power Headroom reporting procedure is used to provide the serving gNB with the following information:
-	Type 1 power headroom: the difference between the nominal UE maximum transmit power and the estimated power for UL-SCH transmission per activated Serving Cell;
-	Type 2 power headroom: the difference between the nominal UE maximum transmit power and the estimated power for UL-SCH and PUCCH transmission on SpCell of the other MAC entity (i.e. E-UTRA MAC entity in EN-DC, NE-DC, and NGEN-DC cases);
-	Type 3 power headroom: the difference between the nominal UE maximum transmit power and the estimated power for SRS transmission per activated Serving Cell.
RRC controls Power Headroom reporting by configuring the following parameters:
-	phr-PeriodicTimer;
-	phr-ProhibitTimer;
-	phr-Tx-PowerFactorChange;
-	phr-Type2OtherCell;
-	phr-ModeOtherCG;
-	multiplePHR.
A Power Headroom Report (PHR) shall be triggered if any of the following events occur:
-	phr-ProhibitTimer expires or has expired and the path loss has changed more than phr-Tx-PowerFactorChange dB for at least one activated Serving Cell of any MAC entity which is used as a pathloss reference since the last transmission of a PHR in this MAC entity when the MAC entity has UL resources for new transmission;
NOTE 1:	The path loss variation for one cell assessed above is between the pathloss measured at present time on the current pathloss reference and the pathloss measured at the transmission time of the last transmission of PHR on the pathloss reference in use at that time, irrespective of whether the pathloss reference has changed in between.
-	phr-PeriodicTimer expires;
-	upon configuration or reconfiguration of the power headroom reporting functionality by upper layers, which is not used to disable the function;
-	activation of an SCell of any MAC entity with configured uplink;
-	addition of the PSCell (i.e. PSCell is newly added or changed);
-	phr-ProhibitTimer expires or has expired, when the MAC entity has UL resources for new transmission, and the following is true for any of the activated Serving Cells of any MAC entity with configured uplink:
-	there are UL resources allocated for transmission or there is a PUCCH transmission on this cell, and the required power backoff due to power management (as allowed by P-MPRc as specified in TS 38.101-1 [14], TS 38.101-2 [15], and TS 38.101-3 [16]) for this cell has changed more than phr-Tx-PowerFactorChange dB since the last transmission of a PHR when the MAC entity had UL resources allocated for transmission or PUCCH transmission on this cell.
NOTE 2:	The MAC entity should avoid triggering a PHR when the required power backoff due to power management decreases only temporarily (e.g. for up to a few tens of milliseconds) and it should avoid reflecting such temporary decrease in the values of PCMAX,f,c/PH when a PHR is triggered by other triggering conditions.
NOTE 3:	If a HARQ process is configured with cg-RetransmissionTimer and if the PHR is already included in a MAC PDU for transmission by this HARQ process, but not yet transmitted by lower layers, it is up to UE implementation how to handle the PHR content.
If the MAC entity has UL resources allocated for a new transmission the MAC entity shall:
1>	if it is the first UL resource allocated for a new transmission since the last MAC reset:
2>	start phr-PeriodicTimer;
1>	if the Power Headroom reporting procedure determines that at least one PHR has been triggered and not cancelled; and
1>	if the allocated UL resources can accommodate the MAC CE for PHR which the MAC entity is configured to transmit, plus its subheader, as a result of LCP as defined in clause 5.4.3.1:
2>	if multiplePHR with value true is configured:
3>	for each activated Serving Cell with configured uplink associated with any MAC entity:
4>	obtain the value of the Type 1 or Type 3 power headroom for the corresponding uplink carrier as specified in clause 7.7 of TS 38.213 [6];
4>	if this MAC entity has UL resources allocated for transmission on this Serving Cell; or
4>	if the other MAC entity, if configured, has UL resources allocated for transmission on this Serving Cell and phr-ModeOtherCG is set to real by upper layers:
5>	obtain the value for the corresponding PCMAX,f,c field from the physical layer.
3>	if phr-Type2OtherCell with value true is configured:
4>	if the other MAC entity is E-UTRA MAC entity:
5>	obtain the value of the Type 2 power headroom for the SpCell of the other MAC entity (i.e. E-UTRA MAC entity);
5>	if phr-ModeOtherCG is set to real by upper layers:
6>	obtain the value for the corresponding PCMAX,f,c field for the SpCell of the other MAC entity (i.e. E-UTRA MAC entity) from the physical layer.
3>	instruct the Multiplexing and Assembly procedure to generate and transmit the Multiple Entry PHR MAC CE as defined in clause 6.1.3.9 based on the values reported by the physical layer.
2>	else (i.e. Single Entry PHR format is used):
3>	obtain the value of the Type 1 power headroom from the physical layer for the corresponding uplink carrier of the PCell;
3>	obtain the value for the corresponding PCMAX,f,c field from the physical layer;
3>	instruct the Multiplexing and Assembly procedure to generate and transmit the Single Entry PHR MAC CE as defined in clause 6.1.3.8 based on the values reported by the physical layer.
2>	start or restart phr-PeriodicTimer;
2>	start or restart phr-ProhibitTimer;
2>	cancel all triggered PHR(s).
5.5	PCH reception
When the MAC entity needs to receive PCH, the MAC entity shall:
1>	if a PCH assignment has been received on the PDCCH for the P-RNTI:
2>	attempt to decode the TB on the PCH as indicated by the PDCCH information;
2>	if the TB on the PCH has been successfully decoded:
3>	deliver the decoded MAC PDU to upper layers.
5.6	BCH reception
When the MAC entity needs to receive BCH, the MAC entity shall:
1>	receive and attempt to decode the BCH;
1>	if a TB on the BCH has been successfully decoded:
2>	deliver the decoded MAC PDU to upper layers.
5.7	Discontinuous Reception (DRX)
The MAC entity may be configured by RRC with a DRX functionality that controls the UE's PDCCH monitoring activity for the MAC entity's C-RNTI, CI-RNTI, CS-RNTI, INT-RNTI, SFI-RNTI, SP-CSI-RNTI, TPC-PUCCH-RNTI, TPC-PUSCH-RNTI, and TPC-SRS-RNTI. When using DRX operation, the MAC entity shall also monitor PDCCH according to requirements found in other clauses of this specification. When in RRC_CONNECTED, if DRX is configured, for all the activated Serving Cells, the MAC entity may monitor the PDCCH discontinuously using the DRX operation specified in this clause; otherwise the MAC entity shall monitor the PDCCH as specified in TS 38.213 [6].
RRC controls DRX operation by configuring the following parameters:
-	drx-onDurationTimer: the duration at the beginning of a DRX Cycle;
-	drx-SlotOffset: the delay before starting the drx-onDurationTimer;
-	drx-InactivityTimer: the duration after the PDCCH occasion in which a PDCCH indicates a new UL or DL transmission for the MAC entity;
-	drx-RetransmissionTimerDL (per DL HARQ process except for the broadcast process): the maximum duration until a DL retransmission is received;
-	drx-RetransmissionTimerUL (per UL HARQ process): the maximum duration until a grant for UL retransmission is received;
-	drx-LongCycleStartOffset: the Long DRX cycle and drx-StartOffset which defines the subframe where the Long and Short DRX Cycle starts;
-	drx-ShortCycle (optional): the Short DRX cycle;
-	drx-ShortCycleTimer (optional): the duration the UE shall follow the Short DRX cycle;
-	drx-HARQ-RTT-TimerDL (per DL HARQ process except for the broadcast process): the minimum duration before a DL assignment for HARQ retransmission is expected by the MAC entity;
-	drx-HARQ-RTT-TimerUL (per UL HARQ process): the minimum duration before a UL HARQ retransmission grant is expected by the MAC entity;
-	ps-Wakeup (optional): the configuration to start associated drx-onDurationTimer in case DCP is monitored but not detected;
-	ps-Periodic_CSI_Transmit (optional): the configuration to report periodic CSI during the time duration indicated by drx-onDurationTimer in case DCP is configured but associated drx-onDurationTimer is not started;
-	ps-TransmitPeriodicL1-RSRP (optional): the configuration to transmit periodic L1-RSRP report(s) during the time duration indicated by drx-onDurationTimer in case DCP is configured but associated drx-onDurationTimer is not started.
When a DRX cycle is configured, the Active Time includes the time while:
-	drx-onDurationTimer or drx-InactivityTimer or drx-RetransmissionTimerDL or drx-RetransmissionTimerUL or ra-ContentionResolutionTimer (as described in clause 5.1.5) is running; or
-	a Scheduling Request is sent on PUCCH and is pending (as described in clause 5.4.4); or
-	a PDCCH indicating a new transmission addressed to the C-RNTI of the MAC entity has not been received after successful reception of a Random Access Response for the Random Access Preamble not selected by the MAC entity among the contention-based Random Access Preamble (as described in clause 5.1.4).
When DRX is configured, the MAC entity shall:
1>	if a MAC PDU is received in a configured downlink assignment:
2>	start the drx-HARQ-RTT-TimerDL for the corresponding HARQ process in the first symbol after the end of the corresponding transmission carrying the DL HARQ feedback;
2>	stop the drx-RetransmissionTimerDL for the corresponding HARQ process.
1>	if a MAC PDU is transmitted in a configured uplink grant:
2>	start the drx-HARQ-RTT-TimerUL for the corresponding HARQ process in the first symbol after the end of the first repetition of the corresponding PUSCH transmission;
2>	stop the drx-RetransmissionTimerUL for the corresponding HARQ process.
1>	if a drx-HARQ-RTT-TimerDL expires:
2>	if the data of the corresponding HARQ process was not successfully decoded:
3>	start the drx-RetransmissionTimerDL for the corresponding HARQ process in the first symbol after the expiry of drx-HARQ-RTT-TimerDL.
1>	if a drx-HARQ-RTT-TimerUL expires:
2>	start the drx-RetransmissionTimerUL for the corresponding HARQ process in the first symbol after the expiry of drx-HARQ-RTT-TimerUL.
1>	if a DRX Command MAC CE or a Long DRX Command MAC CE is received:
2>	stop drx-onDurationTimer;
2>	stop drx-InactivityTimer.
1>	if drx-InactivityTimer expires or a DRX Command MAC CE is received:
2>	if the Short DRX cycle is configured:
3>	start or restart drx-ShortCycleTimer in the first symbol after the expiry of drx-InactivityTimer or in the first symbol after the end of DRX Command MAC CE reception;
3>	use the Short DRX Cycle.
2>	else:
3>	use the Long DRX cycle.
1>	if drx-ShortCycleTimer expires:
2>	use the Long DRX cycle.
1>	if a Long DRX Command MAC CE is received:
2>	stop drx-ShortCycleTimer;
2>	use the Long DRX cycle.
1>	if the Short DRX Cycle is used, and [(SFN × 10) + subframe number] modulo (drx-ShortCycle) = (drx-StartOffset) modulo (drx-ShortCycle):
2>	start drx-onDurationTimer after drx-SlotOffset from the beginning of the subframe.
1>	if the Long DRX Cycle is used, and [(SFN × 10) + subframe number] modulo (drx-LongCycle) = drx-StartOffset:
2>	if DCP is configured for the active DL BWP:
3>	if DCP indication associated with the current DRX Cycle received from lower layer indicated to start drx-onDurationTimer, as specified in TS 38.213 [6]; or
3>	if all DCP occasion(s) in time domain, as specified in TS 38.213 [6], associated with the current DRX Cycle occurred in Active Time considering grants/assignments/DRX Command MAC CE/Long DRX Command MAC CE received and Scheduling Request sent until 4 ms prior to start of the last DCP occasion, or within BWP switching interruption length, or during a measurement gap; or
3>	if ps-Wakeup is configured with value true and DCP indication associated with the current DRX Cycle has not been received from lower layers:
4>	start drx-onDurationTimer after drx-SlotOffset from the beginning of the subframe.
2>	else:
3>	start drx-onDurationTimer after drx-SlotOffset from the beginning of the subframe.
NOTE 1:	In case of unaligned SFN across carriers in a cell group, the SFN of the SpCell is used to calculate the DRX duration.
1>	if the MAC entity is in Active Time:
2>	monitor the PDCCH as specified in TS 38.213 [6];
2>	if the PDCCH indicates a DL transmission:
3>	start the drx-HARQ-RTT-TimerDL for the corresponding HARQ process in the first symbol after the end of the corresponding transmission carrying the DL HARQ feedback, regardless of LBT failure indication from lower layers;
NOTE 2:	When HARQ feedback is postponed by PDSCH-to-HARQ_feedback timing indicating a non-numerical k1 value, as specified in TS 38.213 [6], the corresponding transmission opportunity to send the DL HARQ feedback is indicated in a later PDCCH requesting the HARQ-ACK feedback.
3>	stop the drx-RetransmissionTimerDL for the corresponding HARQ process.
3>	if the PDSCH-to-HARQ_feedback timing indicate a non-numerical k1 value as specified in TS 38.213 [6]:
4>	start the drx-RetransmissionTimerDL in the first symbol after the PDSCH transmission for the corresponding HARQ process.
2>	if the PDCCH indicates a UL transmission:
3>	start the drx-HARQ-RTT-TimerUL for the corresponding HARQ process in the first symbol after the end of the first repetition of the corresponding PUSCH transmission, regardless of LBT failure indication from lower layers;
3>	stop the drx-RetransmissionTimerUL for the corresponding HARQ process.
2>	if the PDCCH indicates a new transmission (DL or UL):
3>	start or restart drx-InactivityTimer in the first symbol after the end of the PDCCH reception.
1>	if DCP is configured for the active DL BWP; and
1>	if the current symbol n occurs within drx-onDurationTimer duration; and
1>	if drx-onDurationTimer associated with the current DRX cycle is not started as specified in this clause; and
1>	if the MAC entity would not be in Active Time considering grants/assignments/DRX Command MAC CE/Long DRX Command MAC CE received and Scheduling Request sent until 4 ms prior to symbol n when evaluating all DRX Active Time conditions as specified in this clause:
2>	not transmit periodic SRS and semi-persistent SRS defined in TS 38.214 [7];
2>	not report semi-persistent CSI configured on PUSCH;
2>	if ps-Periodic_CSI_Transmit is not configured with value true:
3>	if ps-TransmitPeriodicL1-RSRP is not configured with value true:
4>	not report periodic CSI on PUCCH.
3>	else:
4>	not report periodic CSI on PUCCH, except L1-RSRP report(s).
1>	else:
2>	in current symbol n, if the MAC entity would not be in Active Time considering grants/assignments/DRX Command MAC CE/Long DRX Command MAC CE received and Scheduling Request sent until 4 ms prior to symbol n when evaluating all DRX Active Time conditions as specified in this clause:
3>	not transmit periodic SRS and semi-persistent SRS defined in TS 38.214 [7];
3>	not report CSI on PUCCH and semi-persistent CSI configured on PUSCH.
2>	if CSI masking (csi-Mask) is setup by upper layers:
3>	in current symbol n, if drx-onDurationTimer would not be running considering grants/assignments/DRX Command MAC CE/Long DRX Command MAC CE received until 4 ms prior to symbol n when evaluating all DRX Active Time conditions as specified in this clause:
4>	not report CSI on PUCCH.
NOTE 3:	If a UE multiplexes a CSI configured on PUCCH with other overlapping UCI(s) according to the procedure specified in TS 38.213 [6] clause 9.2.5 and this CSI multiplexed with other UCI(s) would be reported on a PUCCH resource outside DRX Active Time, it is up to UE implementation whether to report this CSI multiplexed with other UCI(s).
Regardless of whether the MAC entity is monitoring PDCCH or not, the MAC entity transmits HARQ feedback, aperiodic CSI on PUSCH, and aperiodic SRS defined in TS 38.214 [7] when such is expected.
The MAC entity needs not to monitor the PDCCH if it is not a complete PDCCH occasion (e.g. the Active Time starts or ends in the middle of a PDCCH occasion).
5.8	Transmission and reception without dynamic scheduling
5.8.1	Downlink
Semi-Persistent Scheduling (SPS) is configured by RRC per Serving Cell and per BWP. Multiple assignments can be active simultaneously in the same BWP. Activation and deactivation of the DL SPS are independent among the Serving Cells.
For the DL SPS, a DL assignment is provided by PDCCH, and stored or cleared based on L1 signalling indicating SPS activation or deactivation.
RRC configures the following parameters when the SPS is configured:
-	cs-RNTI: CS-RNTI for activation, deactivation, and retransmission;
-	nrofHARQ-Processes: the number of configured HARQ processes for SPS;
-	harq-ProcID-Offset: Offset of HARQ process for SPS;
-	periodicity: periodicity of configured downlink assignment for SPS.
When the SPS is released by upper layers, all the corresponding configurations shall be released.
After a downlink assignment is configured for SPS, the MAC entity shall consider sequentially that the Nth downlink assignment occurs in the slot for which:
(numberOfSlotsPerFrame × SFN + slot number in the frame) =
[(numberOfSlotsPerFrame × SFNstart time + slotstart time) + N × periodicity × numberOfSlotsPerFrame / 10] modulo (1024 × numberOfSlotsPerFrame)
where SFNstart time and slotstart time are the SFN and slot, respectively, of the first transmission of PDSCH where the configured downlink assignment was (re-)initialised.
NOTE:	In case of unaligned SFN across carriers in a cell group, the SFN of the concerned Serving Cell is used to calculate the occurrences of configured downlink assignments.
5.8.2	Uplink
There are three types of transmission without dynamic grant:
-	configured grant Type 1 where an uplink grant is provided by RRC, and stored as configured uplink grant;
-	configured grant Type 2 where an uplink grant is provided by PDCCH, and stored or cleared as configured uplink grant based on L1 signalling indicating configured uplink grant activation or deactivation;
-	retransmissions on a stored configured uplink grant of Type 1 or Type 2 configured with cg-RetransmissionTimer.
Type 1 and Type 2 are configured by RRC per Serving Cell and per BWP. Multiple configurations can be active simultaneously in the same BWP. For Type 2, activation and deactivation are independent among the Serving Cells. For the same BWP, the MAC entity can be configured with both Type 1 and Type 2.
RRC configures the following parameters when the configured grant Type 1 is configured:
-	cs-RNTI: CS-RNTI for retransmission;
-	periodicity: periodicity of the configured grant Type 1;
-	timeDomainOffset: Offset of a resource with respect to SFN = timeReferenceSFN in time domain;
-	timeDomainAllocation: Allocation of configured uplink grant in time domain which contains startSymbolAndLength (i.e. SLIV in TS 38.214 [7]);
-	nrofHARQ-Processes: the number of HARQ processes for configured grant;
-	harq-ProcID-Offset: offset of HARQ process for configured grant for operation with shared spectrum channel access;
-	harq-ProcID-Offset2: offset of HARQ process for configured grant;
-	timeReferenceSFN: SFN used for determination of the offset of a resource in time domain. The UE uses the closest SFN with the indicated number preceding the reception of the configured grant configuration.
RRC configures the following parameters when the configured grant Type 2 is configured:
-	cs-RNTI: CS-RNTI for activation, deactivation, and retransmission;
-	periodicity: periodicity of the configured grant Type 2;
-	nrofHARQ-Processes: the number of HARQ processes for configured grant;
-	harq-ProcID-Offset: offset of HARQ process for configured grant for operation with shared spectrum channel access;
-	harq-ProcID-Offset2: offset of HARQ process for configured grant.
RRC configures the following parameters when retransmissions on configured uplink grant is configured:
-	cg-RetransmissionTimer: the duration after a configured grant (re)transmission of a HARQ process when the UE shall not autonomously retransmit that HARQ process.
Upon configuration of a configured grant Type 1 for a Serving Cell by upper layers, the MAC entity shall:
1>	store the uplink grant provided by upper layers as a configured uplink grant for the indicated Serving Cell;
1>	initialise or re-initialise the configured uplink grant to start in the symbol according to timeDomainOffset and S (derived from SLIV as specified in TS 38.214 [7]), and to reoccur with periodicity.
After an uplink grant is configured for a configured grant Type 1, the MAC entity shall consider sequentially that the Nth uplink grant occurs in the symbol for which:
[(SFN × numberOfSlotsPerFrame × numberOfSymbolsPerSlot) + (slot number in the frame × numberOfSymbolsPerSlot) + symbol number in the slot] =
 (timeReferenceSFN × numberOfSlotsPerFrame × numberOfSymbolsPerSlot + timeDomainOffset × numberOfSymbolsPerSlot + S + N × periodicity) modulo (1024 × numberOfSlotsPerFrame × numberOfSymbolsPerSlot).
Editor's Note: The step of determining the closest N needs to be added.
After an uplink grant is configured for a configured grant Type 2, the MAC entity shall consider sequentially that the Nth uplink grant occurs in the symbol for which:
[(SFN × numberOfSlotsPerFrame × numberOfSymbolsPerSlot) + (slot number in the frame × numberOfSymbolsPerSlot) + symbol number in the slot] =
[(SFNstart time × numberOfSlotsPerFrame × numberOfSymbolsPerSlot + slotstart time × numberOfSymbolsPerSlot + symbolstart time) + N × periodicity] modulo (1024 × numberOfSlotsPerFrame × numberOfSymbolsPerSlot).
where SFNstart time, slotstart time, and symbolstart time are the SFN, slot, and symbol, respectively, of the first transmission opportunity of PUSCH where the configured uplink grant was (re-)initialised.
NOTE:	In case of unaligned SFN across carriers in a cell group, the SFN of the concerned Serving Cell is used to calculate the occurrences of configured uplink grants.
When the configured uplink grant is released by upper layers, all the corresponding configurations shall be released and all corresponding uplink grants shall be cleared.
The MAC entity shall:
1>	if at least one configured uplink grant confirmation has been triggered and not cancelled; and
1>	if the MAC entity has UL resources allocated for new transmission:
2>	if the MAC entity is configured with configuredGrantConfigList:
3>	instruct the Multiplexing and Assembly procedure to generate a Multiple Entry Configured Grant Confirmation MAC CE as defined in clause 6.1.3.31.
2>	else:
3>	instruct the Multiplexing and Assembly procedure to generate a Configured Grant Confirmation MAC CE as defined in clause 6.1.3.7.
2>	cancel the triggered configured uplink grant confirmation.
For a configured grant Type 2, the MAC entity shall clear the configured uplink grant(s) immediately after first transmission of Configured Grant Confirmation MAC CE or Multiple Entry Configured Grant Confirmation MAC CE which confirms the configured uplink grant deactivation.
Retransmissions are done by:
-	repetition of configured uplink grants; or
-	receiving uplink grants addressed to CS-RNTI; or
-	retransmission on configured uplink grants.
5.8.3	Sidelink
There are two types of transmission without dynamic grant:
-	configured grant Type 1 where an sidelink grant is provided by RRC, and stored as configured sidelink grant;
-	configured grant Type 2 where an sidelink grant is provided by PDCCH, and stored or cleared as configured sidelink grant based on L1 signalling indicating configured sidelink grant activation or deactivation.
Type 1 and/or Type 2 are configured with a single BWP. Multiple configurations of up to [8] configured grants (including both Type 1 and Type 2, if configured) can be active simultaneously on the BWP.
RRC configures the following parameters when the configured grant Type 1 is configured, as specified in TS 38.331 [5] or TS 36.331 [21]:
-	sl-ConfigIndexCG: the identifier of a configured grant for sidelink;
-	sl-CS-RNTI: SLCS-RNTI for retransmission;
-	sl-periodCG: periodicity of the configured grant Type 1;
-	sl-TimeOffsetCGType1: Offset of a resource with respect to [SFN = 0] in time domain;
-	sl-TimeResourceCGType1: time resource location of the configured grant Type 1;
-	sl-CG-MaxTransNumList: the maximum number of times that a TB can be transmitted using the configured grant.
RRC configures the following parameters when the configured grant Type 2 is configured, as specified in TS 38.331 [5]:
-	sl-ConfigIndexCG: the identifier of a configured grant for sidelink;
-	sl-CS-RNTI: SLCS-RNTI for activation, deactivation, and retransmission;
-	sl-periodCG: periodicity of the configured grant Type 2;
-	sl-CG-MaxTransNumList: the maximum number of times that a TB can be transmitted using the configured grant.
Upon configuration of a configured grant Type 1, the MAC entity shall for each configured sidelink grant:
1>	store the sidelink grant provided by upper layers as a configured sidelink grant;
1>	initialise or re-initialise the configured sidelink grant to determine PSCCH duration(s) and PSSCH duration(s) according to sl-TimeOffsetCGType1 and sl-TimeResourceCGType1, and to reoccur with sl-periodCG for transmissions of multiple MAC PDUs according to clause 8.1.2 of TS 38.214 [7].
When a configured sidelink grant is released by upper layers, all the corresponding configurations shall be released and all corresponding sidelink grants shall be cleared.
The MAC entity shall:
1>	if the configured sidelink grant confirmation has been triggered and not cancelled; and
1>	if the MAC entity has UL resources allocated for new transmission:
2>	instruct the Multiplexing and Assembly procedure to generate a Sidelink Configured Grant Confirmation MAC CE as defined in clause 6.1.3.34;
2>	cancel the triggered configured sidelink grant confirmation.
For a configured grant Type 2, the MAC entity shall clear the corresponding configured sidelink grant immediately after first transmission of Configured Grant Confirmation triggered by the configured sidelink grant deactivation.
5.9	Activation/Deactivation of SCells
If the MAC entity is configured with one or more SCells, the network may activate and deactivate the configured SCells. Upon configuration of an SCell, the SCell is deactivated unless the parameter sCellState is set to activated for the SCell within RRCReconfiguration message.
The configured SCell(s) is activated and deactivated by:
-	receiving the SCell Activation/Deactivation MAC CE described in clause 6.1.3.10;
-	configuring sCellDeactivationTimer timer per configured SCell (except the SCell configured with PUCCH, if any): the associated SCell is deactivated upon its expiry.
The MAC entity shall for each configured SCell:
1>	if an SCell is configured with sCellState is set to activated upon SCell configuration, or an SCell Activation/Deactivation MAC CE is received activating the SCell:
2>	if firstActiveDownlinkBWP-Id is not set to dormant BWP:
3>	activate the SCell according to the timing defined in TS 38.213 [6]; i.e. apply normal SCell operation including:
4>	SRS transmissions on the SCell;
4>	CSI reporting for the SCell;
4>	PDCCH monitoring on the SCell;
4>	PDCCH monitoring for the SCell;
4>	PUCCH transmissions on the SCell, if configured.
3>	if the SCell was deactivated prior to receiving this SCell Activation/Deactivation MAC CE:
4>	activate the DL BWP and UL BWP indicated by firstActiveDownlinkBWP-Id and firstActiveUplinkBWP-Id respectively;
3>	start or restart the sCellDeactivationTimer associated with the SCell according to the timing defined in TS 38.213 [6];
3>	(re-)initialize any suspended configured uplink grants of configured grant Type 1 associated with this SCell according to the stored configuration, if any, and to start in the symbol according to rules in clause 5.8.2;
3>	trigger PHR according to clause 5.4.6.
2>	else if firstActiveDownlinkBWP-Id is set to dormant BWP:
3>	stop the bwp-InactivityTimer of this Serving Cell, if running.
3>	not monitor the PDCCH on the BWP;
3>	not monitor the PDCCH for the BWP;
3>	not receive DL-SCH on the BWP;
3>	perform CSI measurement for the BWP, if configured;
3>	stop all the UL behavior, i.e. stop any UL transmission, suspend any configured uplink grant Type 1 associated with the SCell, clear any configured uplink grant of configured grant Type 2 associated with the SCell;
3>	if configured, perform beam failure detection and beam failure recovery for the SCell if beam failure is detected;
3>	if the SCell was deactivated prior to receiving this SCell Activation/Deactivation MAC CE:
4>	activate the DL BWP and UL BWP indicated by firstActiveDownlinkBWP-Id and firstActiveUplinkBWP-Id respectively;
3>	else if an SCell is configured with sCellState is set to activated upon SCell configuration:
4>	activate the DL BWP and UL BWP indicated by firstActiveDownlinkBWP-Id and firstActiveUplinkBWP-Id respectively;
3>	start or restart the sCellDeactivationTimer associated with the SCell according to the timing defined in TS 38.213 [6].
1>	else if an SCell Activation/Deactivation MAC CE is received deactivating the SCell; or
1>	if the sCellDeactivationTimer associated with the activated SCell expires:
2>	deactivate the SCell according to the timing defined in TS 38.213 [6];
2>	stop the sCellDeactivationTimer associated with the SCell;
2>	stop the bwp-InactivityTimer associated with the SCell;
2>	deactivate any active BWP associated with the SCell;
2>	clear any configured downlink assignment and any configured uplink grant Type 2 associated with the SCell respectively;
2>	clear any PUSCH resource for semi-persistent CSI reporting associated with the SCell;
2>	suspend any configured uplink grant Type 1 associated with the SCell;
2>	cancel all the triggered BFRs (see clause 5.17) for this Serving Cell;
2>	flush all HARQ buffers associated with the SCell;
2>	cancel, if any, triggered consistent LBT failure for the SCell.
1>	if PDCCH on the activated SCell indicates an uplink grant or downlink assignment; or
1>	if PDCCH on the Serving Cell scheduling the activated SCell indicates an uplink grant or a downlink assignment for the activated SCell; or
1>	if a MAC PDU is transmitted in a configured uplink grant or received in a configured downlink assignment:
2>	restart the sCellDeactivationTimer associated with the SCell.
1>	if the SCell is deactivated:
2>	not transmit SRS on the SCell;
2>	not report CSI for the SCell;
2>	not transmit on UL-SCH on the SCell;
2>	not transmit on RACH on the SCell;
2>	not monitor the PDCCH on the SCell;
2>	not monitor the PDCCH for the SCell;
2>	not transmit PUCCH on the SCell.
HARQ feedback for the MAC PDU containing SCell Activation/Deactivation MAC CE shall not be impacted by PCell, PSCell and PUCCH SCell interruptions due to SCell activation/deactivation in TS 38.133 [11].
When SCell is deactivated, the ongoing Random Access procedure on the SCell, if any, is aborted.
5.10	Activation/Deactivation of PDCP duplication
If one or more DRBs are configured with PDCP duplication, the network may activate and deactivate the PDCP duplication for all or a subset of associated RLC entities for the configured DRB(s).
The PDCP duplication for the configured DRB(s) is activated and deactivated by:
-	receiving the Duplication Activation/Deactivation MAC CE described in clause 6.1.3.11;
-	receiving the Duplication RLC Activation/Deactivation MAC CE described in clause 6.1.3.32;
-	indication by RRC.
The PDCP duplication for all or a subset of associated RLC entities for the configured DRB(s) is activated and deactivated by:
-	receiving the Duplication RLC Activation/Deactivation MAC CE described in clause 6.1.3.32;
-	indication by RRC.
The MAC entity shall for each DRB configured with PDCP duplication:
1>	if a Duplication Activation/Deactivation MAC CE is received activating the PDCP duplication of the DRB:
2>	indicate the activation of PDCP duplication of the DRB to upper layers.
1>	if a Duplication Activation/Deactivation MAC CE is received deactivating the PDCP duplication of the DRB:
2>	indicate the deactivation of PDCP duplication of the DRB to upper layers.
Editor's Note: It is an FFS whether and how Rel-15 MAC CE turns on and off PDCP duplication with more than 2 RLC entities.
1>	if a Duplication RLC Activation/Deactivation MAC CE is received activating PDCP duplication for associated RLC entities of a DRB configured with PDCP duplication:
2>	indicate the activation of PDCP duplication for the indicated secondary RLC entity(ies) of the DRB to upper layers.
1>	if a Duplication RLC Activation/Deactivation MAC CE is received deactivating PDCP duplication for associated RLC entities of a DRB configured with PDCP duplication:
2>	indicate the deactivation of PDCP duplication for the indicated secondary RLC entity(ies) of the DRB to upper layers.
5.11	MAC reconfiguration
When a reconfiguration of the MAC entity is requested by upper layers, the MAC entity shall:
1>	initialize the corresponding HARQ entity upon addition of an SCell;
1>	remove the corresponding HARQ entity upon removal of an SCell;
1>	apply the new value for timers when the timer is (re)started;
1>	apply the new maximum parameter value when counters are initialized;
1>	apply immediately the configurations received from upper layers for other parameters.
5.12	MAC Reset
If a reset of the MAC entity is requested by upper layers, the MAC entity shall:
1>	initialize Bj for each logical channel to zero;
1>	stop (if running) all timers;
1>	consider all timeAlignmentTimers as expired and perform the corresponding actions in clause 5.2;
1>	set the NDIs for all uplink HARQ processes to the value 0;
1>	stop, if any, ongoing RACH procedure;
1>	discard explicitly signalled contention-free Random Access Resources for 4-step RA type and 2-step RA type, if any;
1>	flush Msg3 buffer;
1>	flush MSGA buffer;
1>	cancel, if any, triggered Scheduling Request procedure;
1>	cancel, if any, triggered Buffer Status Reporting procedure;
1>	cancel, if any, triggered Power Headroom Reporting procedure;
1>	cancel, if any, triggered consistent LBT failure;
1>	cancel, if any, triggered Sidelink Buffer Status Reporting procedure;
1>	flush the soft buffers for all DL HARQ processes;
1>	for each DL HARQ process, consider the next received transmission for a TB as the very first transmission;
1>	release, if any, Temporary C-RNTI;
1>	reset BFI_COUNTER;
1>	reset LBT_COUNTER.
5.13	Handling of unknown, unforeseen and erroneous protocol data
When a MAC entity receives a MAC PDU for the MAC entity's C-RNTI or CS-RNTI, or by the configured downlink assignment, containing a Reserved LCID value, or an LCID value the MAC Entity does not support, the MAC entity shall at least:
1>	discard the received subPDU and any remaining subPDUs in the MAC PDU.
When a MAC entity receives a MAC PDU for the MAC entity's C-RNTI or CS-RNTI, or by the configured downlink assignment, containing an LCID value which is not configured, the MAC entity shall at least:
1>	discard the received subPDU.
When a MAC entity receives a MAC PDU on SL-SCH containing a Reserved LCID value for broadcast or groupcast, or an LCID value which is not configured, the MAC entity shall:
1>	discard the received subPDU.
5.14	Handling of measurement gaps
During a measurement gap, the MAC entity shall, on the Serving Cell(s) in the corresponding frequency range of the measurement gap configured by measGapConfig as specified in TS 38.331 [5]:
1>	not perform the transmission of HARQ feedback, SR, and CSI;
1>	not report SRS;
1>	not transmit on UL-SCH except for Msg3 or the MSGA payload as specified in clause 5.4.2.2;
1>	if the ra-ResponseWindow or the ra-ContentionResolutionTimer or the msgB-ResponseWindow is running:
2>	monitor the PDCCH as specified in clauses 5.1.4 and 5.1.5.
1>	else:
2>	not monitor the PDCCH;
2>	not receive on DL-SCH.
5.15	Bandwidth Part (BWP) operation
5.15.1	Downlink and Uplink
In addition to clause 12 of TS 38.213 [6], this clause specifies requirements on BWP operation.
A Serving Cell may be configured with one or multiple BWPs, and the maximum number of BWP per Serving Cell is specified in TS 38.213 [6].
The BWP switching for a Serving Cell is used to activate an inactive BWP and deactivate an active BWP at a time. The BWP switching is controlled by the PDCCH indicating a downlink assignment or an uplink grant, by the bwp-InactivityTimer, by RRC signalling, or by the MAC entity itself upon initiation of Random Access procedure or upon detection of consistent LBT failure on SpCell. Upon RRC (re-)configuration of firstActiveDownlinkBWP-Id and/or firstActiveUplinkBWP-Id for SpCell or activation of an SCell, the DL BWP and/or UL BWP indicated by firstActiveDownlinkBWP-Id and/or firstActiveUplinkBWP-Id respectively (as specified in TS 38.331 [5]) is active without receiving PDCCH indicating a downlink assignment or an uplink grant. The active BWP for a Serving Cell is indicated by either RRC or PDCCH (as specified in TS 38.213 [6]). For unpaired spectrum, a DL BWP is paired with a UL BWP, and BWP switching is common for both UL and DL.
Entering or leaving dormant BWP is done by BWP switching. It is controlled per SCell or per dormancy SCell group by the PDCCH (as specified in TS 38.212 [9]). The dormancy SCell group configuration indicated by dormancySCellGroups and dormant BWP configuration for one SCell indicated by dormantDownlinkBWP-Id are configured by RRC signalling as described in TS 38.331 [5]. Upon reception of the PDCCH indicating leaving dormant BWP from SpCell outside active time, the DL BWP indicated by firstOutsideActiveTimeBWP-Id (as specified in TS 38.331 [5]) is activated. Upon reception of the PDCCH indicating leaving dormant BWP from SpCell within active time, the DL BWP indicated by firstWithinActiveTimeBWP-Id (as specified in TS 38.331 [5]) is activated. Upon reception of the PDCCH indicating entering dormant BWP, the DL BWP indicated by dormantDownlinkBWP-Id (as specified in TS 38.331 [5]) is activated. The dormant BWP configuration for SpCell or PUCCH SCell is not supported.
For each activated Serving Cell configured with a BWP, the MAC entity shall:
1>	if a BWP is activated and it is not the dormant BWP:
2>	transmit on UL-SCH on the BWP;
2>	transmit on RACH on the BWP, if PRACH occasions are configured;
2>	monitor the PDCCH on the BWP;
2>	transmit PUCCH on the BWP, if configured;
2>	report CSI for the BWP;
2>	transmit SRS on the BWP, if configured;
2>	receive DL-SCH on the BWP;
2>	(re-)initialize any suspended configured uplink grants of configured grant Type 1 on the active BWP according to the stored configuration, if any, and to start in the symbol according to rules in clause 5.8.2;
2>	if consistent LBT failure recovery is configured:
3>	stop the lbt-FailureDetectionTimer, if running;
3>	set LBT_COUNTER to 0;
3>	monitor LBT failure indications from lower layers as specified in clause 5.21.2.
1>	if a BWP is activated and it is dormant BWP for an SCell:
2>	stop the bwp-InactivityTimer of this Serving Cell, if running.
2>	not monitor the PDCCH on the BWP;
2>	not monitor the PDCCH for the BWP;
2>	not receive DL-SCH on the BWP;
2>	perform CSI measurement for the BWP, if configured;
2>	stop all the UL behavior, i.e. stop any UL transmission, suspend any configured uplink grant Type 1 associated with the SCell, clear any configured uplink grant of configured grant Type 2 associated with the SCell;
2>	if configured, perform beam failure detection and beam failure recovery for the SCell if beam failure is detected.
1>	if a BWP is deactivated:
2>	not transmit on UL-SCH on the BWP;
2>	not transmit on RACH on the BWP;
2>	not monitor the PDCCH on the BWP;
2>	not transmit PUCCH on the BWP;
2>	not report CSI for the BWP;
2>	not transmit SRS on the BWP;
2>	not receive DL-SCH on the BWP;
2>	clear any configured downlink assignment and configured uplink grant of configured grant Type 2 on the BWP;
2>	suspend any configured uplink grant of configured grant Type 1 on the inactive BWP.
Upon initiation of the Random Access procedure on a Serving Cell, after the selection of carrier for performing Random Access procedure as specified in clause 5.1.1, the MAC entity shall for the selected carrier of this Serving Cell:
1>	if PRACH occasions are not configured for the active UL BWP:
2>	switch the active UL BWP to BWP indicated by initialUplinkBWP;
2>	if the Serving Cell is an SpCell:
3>	switch the active DL BWP to BWP indicated by initialDownlinkBWP.
1>	else:
2>	if the Serving Cell is an SpCell:
3>	if the active DL BWP does not have the same bwp-Id as the active UL BWP:
4>	switch the active DL BWP to the DL BWP with the same bwp-Id as the active UL BWP.
1>	stop the bwp-InactivityTimer associated with the active DL BWP of this Serving Cell, if running.
1>	if the Serving Cell is SCell:
2>	stop the bwp-InactivityTimer associated with the active DL BWP of SpCell, if running.
1>	perform the Random Access procedure on the active DL BWP of SpCell and active UL BWP of this Serving Cell.
If the MAC entity receives a PDCCH for BWP switching of a Serving Cell, the MAC entity shall:
1>	if there is no ongoing Random Access procedure associated with this Serving Cell; or
1>	if the ongoing Random Access procedure associated with this Serving Cell is successfully completed upon reception of this PDCCH addressed to C-RNTI (as specified in clauses 5.1.4, 5.1.4a, and 5.1.5):
2>	cancel, if any, triggered consistent LBT failure for this Serving Cell;
2>	perform BWP switching to a BWP indicated by the PDCCH.
If the MAC entity receives a PDCCH for BWP switching for a Serving Cell(s) or a dormancy SCell group(s) while a Random Access procedure associated with that Serving Cell is ongoing in the MAC entity, it is up to UE implementation whether to switch BWP or ignore the PDCCH for BWP switching, except for the PDCCH reception for BWP switching addressed to the C-RNTI for successful Random Access procedure completion (as specified in clauses 5.1.4, 5.1.4a, and 5.1.5) in which case the UE shall perform BWP switching to a BWP indicated by the PDCCH. Upon reception of the PDCCH for BWP switching other than successful contention resolution, if the MAC entity decides to perform BWP switching, the MAC entity shall stop the ongoing Random Access procedure and initiate a Random Access procedure after performing the BWP switching; if the MAC decides to ignore the PDCCH for BWP switching, the MAC entity shall continue with the ongoing Random Access procedure on the Serving Cell.
Upon reception of RRC (re-)configuration for BWP switching for a Serving Cell while a Random Access procedure associated with that Serving Cell is ongoing in the MAC entity, the MAC entity shall stop the ongoing Random Access procedure and initiate a Random Access procedure after performing the BWP switching.
Upon reception of RRC (re-)configuration for BWP switching for a Serving Cell, cancel any triggered LBT failure in this Serving Cell.
The MAC entity shall for each activated Serving Cell configured with bwp-InactivityTimer:
1>	if the defaultDownlinkBWP-Id is configured, and the active DL BWP is not the BWP indicated by the defaultDownlinkBWP-Id, and the active DL BWP is not the BWP indicated by the dormantDownlinkBWP-Id if configured; or
1>	if the defaultDownlinkBWP-Id is not configured, and the active DL BWP is not the initialDownlinkBWP, and the active DL BWP is not the BWP indicated by the dormantDownlinkBWP-Id if configured:
2>	if a PDCCH addressed to C-RNTI or CS-RNTI indicating downlink assignment or uplink grant is received on the active BWP; or
2>	if a PDCCH addressed to C-RNTI or CS-RNTI indicating downlink assignment or uplink grant is received for the active BWP; or
2>	if a MAC PDU is transmitted in a configured uplink grant or received in a configured downlink assignment:
3>	if there is no ongoing Random Access procedure associated with this Serving Cell; or
3>	if the ongoing Random Access procedure associated with this Serving Cell is successfully completed upon reception of this PDCCH addressed to C-RNTI (as specified in clauses 5.1.4, 5.1.4a and 5.1.5):
4>	start or restart the bwp-InactivityTimer associated with the active DL BWP.
2>	if the bwp-InactivityTimer associated with the active DL BWP expires:
3>	if the defaultDownlinkBWP-Id is configured:
4>	perform BWP switching to a BWP indicated by the defaultDownlinkBWP-Id.
3>	else:
4>	perform BWP switching to the initialDownlinkBWP.
NOTE:	If a Random Access procedure is initiated on an SCell, both this SCell and the SpCell are associated with this Random Access procedure.
1>	if a PDCCH for BWP switching is received, and the MAC entity switches the active DL BWP:
2>	if the defaultDownlinkBWP-Id is configured, and the MAC entity switches to the DL BWP which is not indicated by the defaultDownlinkBWP-Id and is not indicated by the dormantDownlinkBWP-Id if configured; or
2>	if the defaultDownlinkBWP-Id is not configured, and the MAC entity switches to the DL BWP which is not the initialDownlinkBWP and is not indicated by the dormantDownlinkBWP-Id if configured:
3>	start or restart the bwp-InactivityTimer associated with the active DL BWP.
5.15.2	Sidelink
In addition to clause xx of TS 38.213 [6], this clause specifies requirements on BWP operation for sidelink.
The MAC entity is configured with at most a single SL BWP where sidelink transmission and reception are performed.
For a BWP, the MAC entity shall:
1>	if the BWP is activated:
2>	transmit PSBCH on the BWP, if configured;
2>	transmit PSCCH on the BWP;
2>	transmit SL-SCH on the BWP;
2>	receive PSFCH on the BWP, if configured.
2>	receive PSBCH on the BWP, if configured;
2>	receive PSCCH on the BWP;
2>	receive SL-SCH on the BWP;
2>	transmit PSFCH on the BWP, if configured.
5.16	SUL operation
The Supplementary UL (SUL) carrier can be configured as a complement to the normal UL (NUL) carrier. Switching between the NUL carrier and the SUL carrier means that the UL transmissions move from one carrier to the other carrier, which is done by:
-	an indication in DCI;
-	the Random Access procedure as specified in clause 5.1.1.
If the MAC entity receives a UL grant indicating an SUL switch while a Random Access procedure is ongoing, the MAC entity shall ignore the UL grant.
The Serving Cell configured with supplementaryUplink belongs to a single TAG.
5.17	Beam Failure Detection and Recovery procedure
The MAC entity may be configured by RRC per Serving Cell with a beam failure recovery procedure which is used for indicating to the serving gNB of a new SSB or CSI-RS when beam failure is detected on the serving SSB(s)/CSI-RS(s). Beam failure is detected by counting beam failure instance indication from the lower layers to the MAC entity. If beamFailureRecoveryConfig is reconfigured by upper layers during an ongoing Random Access procedure for beam failure recovery for SpCell, the MAC entity shall stop the ongoing Random Access procedure and initiate a Random Access procedure using the new configuration.
RRC configures the following parameters in the BeamFailureRecoveryConfig and the RadioLinkMonitoringConfig for the Beam Failure Detection and Recovery procedure:
-	beamFailureInstanceMaxCount for the beam failure detection;
-	beamFailureDetectionTimer for the beam failure detection;
-	beamFailureRecoveryTimer for the beam failure recovery procedure;
-	rsrp-ThresholdSSB: an RSRP threshold for the beam failure recovery;
-	powerRampingStep: powerRampingStep for the beam failure recovery;
-	powerRampingStepHighPriority: powerRampingStepHighPriority for the beam failure recovery;
-	preambleReceivedTargetPower: preambleReceivedTargetPower for the beam failure recovery;
-	preambleTransMax: preambleTransMax for the beam failure recovery;
-	scalingFactorBI: scalingFactorBI for the beam failure recovery;
-	ssb-perRACH-Occasion: ssb-perRACH-Occasion for the beam failure recovery;
-	ra-ResponseWindow: the time window to monitor response(s) for the beam failure recovery using contention-free Random Access Preamble;
-	prach-ConfigurationIndex: prach-ConfigurationIndex for the beam failure recovery;
-	ra-ssb-OccasionMaskIndex: ra-ssb-OccasionMaskIndex for the beam failure recovery;
-	ra-OccasionList: ra-OccasionList for the beam failure recovery.
Editors Note: The specific parameters for SCell BFR will be replicated here after they are settled.
The following UE variables are used for the beam failure detection procedure:
-	BFI_COUNTER: counter for beam failure instance indication which is initially set to 0.
The MAC entity shall for each Serving Cell configured for beam failure detection:
1>	if beam failure instance indication has been received from lower layers:
2>	start or restart the beamFailureDetectionTimer;
2>	increment BFI_COUNTER by 1;
2>	if BFI_COUNTER >= beamFailureInstanceMaxCount:
3>	if the Serving Cell is SCell:
4>	trigger a BFR for this Serving Cell;
3>	else:
4>	initiate a Random Access procedure (see clause 5.1) on the SpCell.
1>	if the beamFailureDetectionTimer expires; or
1>	if beamFailureDetectionTimer, beamFailureInstanceMaxCount, or any of the reference signals used for beam failure detection is reconfigured by upper layers associated with this Serving Cell:
2>	set BFI_COUNTER to 0.
1>	if the Serving Cell is SpCell and the Random Access procedure is successfully completed (see clause 5.1):
2>	set BFI_COUNTER to 0;
2>	stop the beamFailureRecoveryTimer, if configured;
2>	consider the Beam Failure Recovery procedure successfully completed.
1>	else if the Serving Cell is SCell, and a PDCCH addressed to C-RNTI indicating uplink grant for a new transmission is received for the HARQ process used for the transmission of the SCell BFR MAC CE or truncated SCell BFR MAC CE which contains beam failure recovery information of this Serving Cell; or
1>	if the SCell is deactivated as specified in clause 5.9:
2>	set BFI_COUNTER to 0;
2>	consider the Beam Failure Recovery procedure successfully completed and cancel all the triggered BFRs for this Serving Cell.
The MAC entity shall:
1>	if the Beam Failure Recovery procedure determines that at least one BFR has been triggered and not cancelled:
2>	if UL-SCH resources are available for a new transmission:
3>	if the UL-SCH resources can accommodate the SCell BFR MAC CE plus its subheader as a result of LCP:
4>	instruct the Multiplexing and Assembly procedure to generate the SCell BFR MAC CE.
3>	else if the UL-SCH resources can accommodate the truncated SCell BFR MAC CE plus its subheader as a result of LCP:
4>	instruct the Multiplexing and Assembly procedure to generate the truncated SCell BFR MAC CE.
2>	else:
3>	trigger the SR for SCell beam failure recovery.
5.18	Handling of MAC CEs
5.18.1	General
This clause specifies the requirements upon reception of the following MAC CEs:
-	SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE;
-	Aperiodic CSI Trigger State Subselection MAC CE;
-	TCI States Activation/Deactivation for UE-specific PDSCH MAC CE;
-	TCI State Indication for UE-specific PDCCH MAC CE;
-	SP CSI reporting on PUCCH Activation/Deactivation MAC CE;
-	SP SRS Activation/Deactivation MAC CE;
-	PUCCH spatial relation Activation/Deactivation MAC CE;
-	SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE;
-	Recommended Bit Rate MAC CE;
-	Enhanced PUCCH spatial relation Activation/Deactivation MAC CE;
-	AP SRS spatial relation Indication MAC CE;
-	SRS Pathloss Reference RS Activation/Deactivation MAC CE;
-	PUSCH Pathloss Reference RS Activation/Deactivation MAC CE;
-	CC list-based SRS Activation/Deactivation MAC CE.
5.18.2	Activation/Deactivation of Semi-persistent CSI-RS/CSI-IM resource set
The network may activate and deactivate the configured Semi-persistent CSI-RS/CSI-IM resource sets of a Serving Cell by sending the SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE described in clause 6.1.3.12. The configured Semi-persistent CSI-RS/CSI-IM resource sets are initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives an SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE.
5.18.3	Aperiodic CSI Trigger State Subselection
The network may select among the configured aperiodic CSI trigger states of a Serving Cell by sending the Aperiodic CSI Trigger State Subselection MAC CE described in clause 6.1.3.13.
The MAC entity shall:
1>	if the MAC entity receives an Aperiodic CSI trigger State Subselection MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding Aperiodic CSI trigger State Subselection MAC CE.
5.18.4	Activation/Deactivation of UE-specific PDSCH TCI state
The network may activate and deactivate the configured TCI states for PDSCH of a Serving Cell or a CC list by sending the TCI States Activation/Deactivation for UE-specific PDSCH MAC CE described in clause 6.1.3.14. The configured TCI states for PDSCH are initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives a TCI States Activation/Deactivation for UE-specific PDSCH MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the TCI States Activation/Deactivation for UE-specific PDSCH MAC CE.
5.18.5	Indication of TCI state for UE-specific PDCCH
The network may indicate a TCI state for PDCCH reception for a CORESET of a Serving Cell or a CC list by sending the TCI State Indication for UE-specific PDCCH MAC CE described in clause 6.1.3.15.
The MAC entity shall:
1>	if the MAC entity receives a TCI State Indication for UE-specific PDCCH MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the TCI State Indication for UE-specific PDCCH MAC CE.
5.18.6	Activation/Deactivation of Semi-persistent CSI reporting on PUCCH
The network may activate and deactivate the configured Semi-persistent CSI reporting on PUCCH of a Serving Cell by sending the SP CSI reporting on PUCCH Activation/Deactivation MAC CE described in clause 6.1.3.16. The configured Semi-persistent CSI reporting on PUCCH is initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives an SP CSI reporting on PUCCH Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the SP CSI reporting on PUCCH Activation/Deactivation MAC CE.
5.18.7	Activation/Deactivation of Semi-persistent SRS
The network may activate and deactivate the configured Semi-persistent SRS resource sets of a Serving Cell by sending the SP SRS Activation/Deactivation MAC CE described in clause 6.1.3.17. The configured Semi-persistent SRS resource sets are initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives an SP SRS Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the SP SRS Activation/Deactivation MAC CE.
5.18.8	Activation/Deactivation of spatial relation of PUCCH resource
The network may activate and deactivate a spatial relation for a PUCCH resource of a Serving Cell by sending the PUCCH spatial relation Activation/Deactivation MAC CE described in clause 6.1.3.18.
The MAC entity shall:
1>	if the MAC entity receives a PUCCH spatial relation Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the PUCCH spatial relation Activation/Deactivation MAC CE.
5.18.9	Activation/Deactivation of semi-persistent ZP CSI-RS resource set
The network may activate and deactivate the configured Semi-persistent ZP CSI-RS resource set of a Serving Cell by sending the SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE described in clause 6.1.3.19. The configured Semi-persistent ZP CSI-RS resource sets are initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives an SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE.
5.18.10	Recommended Bit Rate
The recommended bit rate procedure is used to provide the MAC entity with information about the bit rate which the gNB recommends. The bit rate is the recommended bit rate of the physical layer. Averaging window of default value 2000 ms will apply as specified in TS 26.114 [13].
The gNB may transmit the Recommended bit rate MAC CE to the MAC entity to indicate the recommended bit rate for the UE for a specific logical channel and a specific direction (either uplink or downlink). Upon reception of a Recommended bit rate MAC CE the MAC entity shall:
-	indicate to upper layers the recommended bit rate for the indicated logical channel and direction.
The MAC entity may request the gNB to indicate the recommended bit rate for a specific logical channel and a specific direction. If the MAC entity is requested by upper layers to query the gNB for the recommended bit rate for a logical channel and for a direction (i.e. for uplink or downlink), the MAC entity shall:
1>	if a Recommended bit rate query for this logical channel and this direction has not been triggered:
2>	trigger a Recommended bit rate query for this logical channel, direction, and desired bit rate.
If the MAC entity has UL resources allocated for new transmission the MAC entity shall:
1>	for each Recommended bit rate query that the Recommended Bit Rate procedure determines has been triggered and not cancelled:
2>	if bitRateQueryProhibitTimer for the logical channel and the direction of this Recommended bit rate query is configured, and it is not running; and
2>	if the MAC entity has UL resources allocated for new transmission and the allocated UL resources can accommodate a Recommended bit rate MAC CE plus its subheader as a result of LCP as defined in clause 5.4.3.1:
3>	instruct the Multiplexing and Assembly procedure to generate the Recommended bit rate MAC CE for the logical channel and the direction of this Recommended bit rate query;
3>	start the bitRateQueryProhibitTimer for the logical channel and the direction of this Recommended bit rate query;
3>	cancel this Recommended bit rate query.
5.18.11	Enhanced Activation/Deactivation of UE-specific PDSCH TCI state
The network may activate and deactivate the configured TCI states for the codepoint of the DCI Transmission configuration indication field as specified in TS 38.212 [9] for PDSCH of a Serving Cell by sending the Enhanced TCI States Activation/Deactivation for UE-specific PDSCH MAC CE described in clause 6.1.3.24. The configured TCI states for PDSCH are initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives an Enhanced TCI States Activation/Deactivation for UE-specific PDSCH MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the Enhanced TCI States Activation/Deactivation for UE-specific PDSCH MAC CE.
5.18.12	Activation/Deactivation of enhanced spatial relation of PUCCH resource
The network may activate and deactivate a spatial relation for a PUCCH resource or a PUCCH resource group of a Serving Cell by sending the Enhanced PUCCH spatial relation Activation/Deactivation MAC CE described in clause 6.1.3.25.
The MAC entity shall:
1>	if the MAC entity receives an Enhanced PUCCH spatial relation Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the Enhanced PUCCH spatial relation Activation/Deactivation MAC CE.
5.18.13	Indication of spatial relation of Aperiodic SRS
The network may indicate the spatial relation info of an aperiodic SRS resource sets of a Serving Cell by sending the AP SRS spatial relation Indication MAC CE described in clause 6.1.3.26.
The MAC entity shall:
1>	if the MAC entity receives an AP SRS spatial relation Indication MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the AP SRS spatial relation Indication MAC CE.
5.18.14	Activation/Deactivation of Pathloss Reference RS of SRS
The network may activate and deactivate a pathloss reference RS for a SRS resource of a Serving Cell by sending the SRS Pathloss Reference RS Activation/Deactivation MAC CE described in clause 6.1.3.27.
The MAC entity shall:
1>	if the MAC entity receives a SRS Pathloss Reference RS Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the SRS Pathloss Reference RS Activation/Deactivation MAC CE.
5.18.15	Activation/Deactivation of Pathloss Reference RS of PUSCH
The network may activate and deactivate a pathloss reference RS for PUSCH of a Serving Cell by sending the PUSCH Pathloss Reference RS Activation/Deactivation MAC CE described in clause 6.1.3.28.
The MAC entity shall:
1>	if the MAC entity receives a PUSCH Pathloss Reference RS Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the PUSCH Pathloss Reference RS Activation/Deactivation MAC CE.
5.18.16	Activation/Deactivation of SRS resource for CC list
The network may activate and deactivate the configured SRS resource of a CC list by sending the CC list-based SRS Activation/Deactivation MAC CE described in clause 6.1.3.29. The configured SP SRS resource are initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives a CC list-based SRS Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the CC list-based SRS Activation/Deactivation MAC CE.
Editor's note: May need further update after the MAC CE format has been determined. FFS further update the naming of CC list after the RRC discussion is stable.
5.18.17	Activation/Deactivation of Semi-persistent Positioning SRS
The network may activate and deactivate the configured resource sets of Semi-persistent Positioning SRS of a Serving Cell by sending the SP Positioning SRS Activation/Deactivation MAC CE described in clause 6.1.3.36. The configured resource sets Semi-persistent Positioning SRS are initially deactivated upon configuration and after a handover.
The MAC entity shall:
1>	if the MAC entity receives an SP Positioning SRS Activation/Deactivation MAC CE on a Serving Cell:
2>	indicate to lower layers the information regarding the SP Positioning SRS Activation/Deactivation MAC CE.
5.19	Data inactivity monitoring
The UE may be configured by RRC with a Data inactivity monitoring functionality, when in RRC_CONNECTED. RRC controls Data inactivity operation by configuring the timer dataInactivityTimer.
When dataInactivityTimer is configured, the UE shall:
1>	if any MAC entity receives a MAC SDU for DTCH logical channel, DCCH logical channel, or CCCH logical channel; or
1>	if any MAC entity transmits a MAC SDU for DTCH logical channel, or DCCH logical channel, regardless of LBT failure indication from lower layers:
2>	start or restart dataInactivityTimer.
1>	if the dataInactivityTimer expires:
2>	indicate the expiry of the dataInactivityTimer to upper layers.
5.20	Guard symbols for IAB
For IAB operation, the MAC entity on the IAB-DU or IAB-donor DU should reserve a sufficient number of symbols at the beginning and the end of each slot to allow the child IAB-node to switch operation from its IAB-DU to its IAB-MT function and operation from its IAB-MT function to its IAB-DU. The MAC entity on the IAB-DU or IAB-donor DU informs the child node about the number of guard symbols it provides via the Provided Guard Symbol MAC CE. The IAB-MT on the child node can inform the IAB-DU or IAB-donor DU about the number of guard symbols desired via the Desired Guard Symbol MAC CE.
Upon reception of a Provided Guard Symbol MAC CE the MAC entity shall:
-	indicate to lower layers the number of provided guard symbols and the SCS configuration.
The MAC entity may:
1>	if a Desired Guard Symbol query has not been triggered:
2>	trigger a Desired Guard Symbol query.
If the MAC entity has UL resources allocated for new transmission the MAC entity shall:
1>	for each Desired Guard Symbol query that the Desired Guard Symbol procedure determines has been triggered and not cancelled:
2>	if the allocated UL resources can accommodate a Desired Guard Symbol MAC CE plus its subheader as a result of LCP as defined in clause 5.4.3.1:
3>	instruct the Multiplexing and Assembly procedure to generate the Desired Guard Symbol MAC CE;
3>	cancel this Desired Guard Symbol query.
A separate value for the number of guard symbols is specified for each of the following eight switching scenarios (see Table 5.20-1).
Table 5.20-1: Switching scenarios and relevant guard symbols
5.21	LBT operation
5.21.1	General
The lower layer may perform an LBT procedure, see TS 37.213 [18], according to which a transmission is not performed if the channel is identified as being occupied. When lower layer performs an LBT procedure before a transmission and the transmission is not performed, an LBT failure indication is sent to the MAC entity from lower layers. Unless otherwise specified, when LBT procedure is performed, actions related to "is transmitted" and "transmission is performed" shall not be performed if an LBT failure indication is received from lower layers.
5.21.2	LBT failure detection and recovery procedure
The MAC entity may be configured by RRC with a consistent LBT failure recovery procedure. Consistent LBT failure is detected per UL BWP by counting LBT failure indications, for all UL transmissions, from the lower layers to the MAC entity.
RRC configures the following parameters in the lbt-FailureRecoveryConfig:
-	lbt-FailureInstanceMaxCount for the consistent LBT failure detection;
-	lbt-FailureDetectionTimer for the consistent LBT failure detection;
The following UE variable is used for the consistent LBT failure detection procedure:
-	LBT_COUNTER: counter for LBT failure indication which is initially set to 0.
For each activated Serving Cell configured with lbt-FailureRecoveryConfig, the MAC entity shall:
1>	if LBT failure indication has been received from lower layers:
2>	start or restart the lbt-FailureDetectionTimer;
2>	increment LBT_COUNTER by 1;
2>	if LBT_COUNTER >= lbt-FailureInstanceMaxCount:
3>	trigger consistent LBT failure for the active UL BWP in this Serving Cell;
3>	if this Serving Cell is the SpCell:
4>	if consistent LBT failure has been triggered in all UL BWPs configured with PRACH occasions on same carrier in this Serving Cell:
5>	indicate consistent LBT failure to upper layers.
4>	else:
5>	stop any ongoing Random Access procedure in this Serving Cell;
5>	switch the active UL BWP to an UL BWP, on same carrier in this Serving Cell, configured with PRACH occasion and for which consistent LBT failure has not been triggered;
5>	initiate a Random Access Procedure (as specified in clause 5.1.1).
1>	if the lbt-FailureDetectionTimer expires; or
1>	if lbt-FailureDetectionTimer or lbt-FailureInstanceMaxCount is reconfigured by upper layers:
2>	set LBT_COUNTER to 0.
The MAC entity shall:
1>	if consistent LBT failure has been triggered, and not cancelled, in the SpCell; and
1>	if UL-SCH resources are available for a new transmission in the SpCell and these UL-SCH resources can accommodate the LBT failure MAC CE plus its subheader as a result of logical channel prioritization:
2>	instruct the Multiplexing and Assembly procedure to generate the LBT failure MAC CE.
1>	else if consistent LBT failure has been triggered, and not cancelled, in at least one SCell:
2>	if UL-SCH resources are available for a new transmission in a Serving Cell for which consistent LBT failure has not been triggered and these UL-SCH resources can accommodate the LBT failure MAC CE plus its subheader as a result of logical channel prioritization:
3>	instruct the Multiplexing and Assembly procedure to generate the LBT failure MAC CE.
2>	else:
3>	trigger a Scheduling Request for LBT failure MAC CE.
1>	if a MAC PDU is transmitted and this PDU includes the LBT failure MAC CE:
2>	cancel the triggered consistent LBT failure in SCell(s) indicating consistent LBT failure in the transmitted LBT failure MAC CE.
1>	if consistent LBT failure is triggered and not cancelled in the active UL BWP of the SpCell; and
1>	the Random Access procedure is considered successfully completed (see clause 5.1) in the SpCell:
2>	cancel the triggered consistent LBT failure(s) in the SpCell.
5.22	SL-SCH Data transfer
5.22.1	SL-SCH Data transmission
5.22.1.1	SL Grant reception and SCI transmission
Sidelink grant is received dynamically on the PDCCH, configured semi-persistently by RRC or autonomously selected by the MAC entity. The MAC entity shall have a sidelink grant on an active SL BWP to determine a set of PSCCH duration(s) in which transmission of SCI occurs and a set of PSSCH duration(s) in which transmission of SL-SCH associated with the SCI occurs.
If the MAC entity has been configured by RRC to transmit using a SL-RNTI or SLCS-RNTI as indicated in TS 38.331 [5] or TS 36.331 [21], the MAC entity shall for each PDCCH occasion and for each grant received for this PDCCH occasion:
1>	if a sidelink grant has been received on the PDCCH for the MAC entity's SL-RNTI:
2>	if the NDI received on the PDCCH has been not toggled compared to the value in the previously received HARQ information for the HARQ Process ID:
3>	use the received sidelink grant to determine PSCCH duration(s) and PSSCH duration(s) for one or more retransmissions of a single MAC PDU for the corresponding Sidelink process according to clause 8.1.2 of TS 38.214 [7].
2>	else:
3>	use the received sidelink grant to determine PSCCH duration(s) and PSSCH duration(s) for initial transmission and, if available, retransmission(s) of a single MAC PDU according to clause 8.1.2 of TS 38.214 [7].
2>	consider the received sidelink grant to be a configured sidelink grant;
2>	if a configured sidelink grant is available for retransmission(s) of a MAC PDU which has been positively acknowledged as specified in clause 5.22.1.3.3:
3>	clear the PSCCH duration(s) and PSSCH duration(s) corresponding to retransmission(s) of the MAC PDU from the configured sidelink grant.
1>	else if a sidelink grant has been received on the PDCCH for the MAC entity's SLCS-RNTI:
2>	if PDCCH contents indicate retransmission(s) for an activated configured sidelink grant:
3>	use the received sidelink grant to determine PSCCH duration(s) and PSSCH duration(s) for one or more retransmissions of a single MAC PDU according to clause 8.1.2 of TS 38.214 [7].
2>	else if PDCCH contents indicate configured grant Type 2 deactivation for a configured sidelink grant:
3>	clear the configured sidelink grant, if available;
3>	trigger configured sidelink grant confirmation for the configured sidelink grant.
2>	else if PDCCH contents indicate configured grant Type 2 activation for a configured sidelink grant:
3>	trigger configured sidelink grant confirmation for the configured sidelink grant;
3>	store the configured sidelink grant;
3>	initialise or re-initialise the configured sidelink grant to determine the set of PSCCH durations and the set of PSSCH durations for transmissions of multiple MAC PDUs according to clause 8.1.2 of TS 38.214 [7].
If the MAC entity has been configured by RRC to transmit using pool(s) of resources in a carrier as indicated in TS 38.331 [5] or TS 36.331 [21] based on sensing or random selection, the MAC entity shall for each Sidelink process:
NOTE 1:	If the MAC entity has been configured by RRC to transmit using SL-RNTI or SLCS-RNTI but is configured by RRC to transmit using a pool of resources in a carrier as indicated in TS 38.331 [5], the MAC entity can create a configured sidelink grant on the pool of resources only after releasing other configured sidelink grant(s), if any.
1>	if the MAC entity has selected to create a configured sidelink grant corresponding to transmissions of multiple MAC PDUs, and SL data is available in a logical channel:
2>	perform the TX resource (re-)selection check as specified in clause 5.22.1.2;
NOTE 2:	The MAC entity continuously performs the TX resource (re-)selection check until the corresponding pool of resources is released by RRC or the MAC entity decides to cancel creating a configured sidelink grant corresponding to transmissions of multiple MAC PDUs.
2>	if the TX resource (re-)selection is triggered as the result of the TX resource (re-)selection check:
3>	select one of the allowed values configured by RRC in sl-ResourceReservePeriodList and set the resource reservation interval with the selected value;
3>	randomly select, with equal probability, an integer value in the interval [5, 15] for the resource reservation interval higher than or equal to 100ms and set SL_RESOURCE_RESELECTION_COUNTER to the selected value;
3>	select the number of HARQ retransmissions from the allowed numbers that are configured by RRC in sl-MaxTxTransNumPSSCH included in sl-PSSCH-TxConfigList and, if configured by upper layers, overlapped in sl-MaxTxTransNumPSSCH indicated in sl-CBR-PSSCH-TxConfigList for the highest priority of the logical channel(s) allowed on the carrier and the CBR measured by lower layers according to TS 38.2xx [xx] if CBR measurement results are available or the corresponding sl-defaultTxConfigIndex configured by RRC if CBR measurement results are not available;
3>	select an amount of frequency resources within the range that is configured by RRC between sl-MinSubChannelNumPSSCH and sl-MaxSubchannelNumPSSCH included in sl-PSSCH-TxConfigList and, if configured by RRC, overlapped between MinSubChannelNumPSSCH and MaxSubchannelNumPSSCH indicated in sl-CBR-PSSCH-TxConfigList for the highest priority of the logical channel(s) allowed on the carrier and the CBR measured by lower layers according to TS 38.2xx [xx] if CBR measurement results are available or the corresponding sl-defaultTxConfigIndex configured by RRC if CBR measurement results are not available;
3>	randomly select the time and frequency resources for one transmission opportunity from the resources indicated by the physical layer according to clause 8.1.4 of TS 38.214 [7], according to the amount of selected frequency resources and the remaining PDB of SL data available in the logical channel(s) allowed on the carrier.
3>	use the randomly selected resource to select a set of periodic resources spaced by the resource reservation interval for transmissions of PSCCH and PSSCH corresponding to the number of transmission opportunities of MAC PDUs determined in TS 38.214 [7];
3>	if one or more HARQ retransmissions are selected:
4>	if there are available resources left in the resources indicated by the physical layer according to clause 8.1.4 of TS 38.214 [7] for more transmission opportunities:
5>	randomly select the time and frequency resources for one or more transmission opportunities from the available resources, according to the amount of selected frequency resources, the selected number of HARQ retransmissions and the remaining PDB of SL data available in the logical channel(s) allowed on the carrier;
5>	use the randomly selected resource to select a set of periodic resources spaced by the resource reservation interval for transmissions of PSCCH and PSSCH corresponding to the number of retransmission opportunities of the MAC PDUs determined in TS 38.214 [7];
5>	consider the first set of transmission opportunities as the new transmission opportunities and the other set of transmission opportunities as the retransmission opportunities;
5>	consider the set of new transmission opportunities and retransmission opportunities as the selected sidelink grant.
3>	else:
4>	consider the set as the selected sidelink grant.
3>	use the selected sidelink grant to determine the set of PSCCH durations and the set of PSSCH durations according to TS 38.214 [7];
3>	consider the selected sidelink grant to be a configured sidelink grant.
2>	else if SL_RESOURCE_RESELECTION_COUNTER = 0 and when SL_RESOURCE_RESELECTION_COUNTER was equal to 1 the MAC entity randomly selected, with equal probability, a value in the interval [0, 1] which is less than or equal to the probability configured by upper layers in sl-ProbResourceKeep:
3>	clear the configured sidelink grant, if available;
3>	randomly select, with equal probability, an integer value in the interval [5, 15] for the resource reservation interval higher than or equal to 100ms and set SL_RESOURCE_RESELECTION_COUNTER to the selected value;
3>	use the previously selected sidelink grant for the number of transmissions of the MAC PDUs determined in TS 38.214 [7] with the resource reservation interval to determine the set of PSCCH durations and the set of PSSCH durations according to TS 38.214 [7];
3>	consider the selected sidelink grant to be a configured sidelink grant.
1>	if the MAC entity has selected to create a configured sidelink grant corresponding to transmission(s) of a single MAC PDU, and if SL data is available in a logical channel or a SL-CSI reporting is triggered:
2>	perform the TX resource (re-)selection check as specified in clause 5.22.1.2;
2>	if the TX resource (re-)selection is triggered as the result of the TX resource (re-)selection check:
3>	select the number of HARQ retransmissions from the allowed numbers that are configured by RRC in sl-MaxTxTransNumPSSCH included in sl-PSSCH-TxConfigList and, if configured by RRC, overlapped in sl-MaxTxTransNumPSSCH indicated in sl-CBR-PSSCH-TxConfigList for the highest priority of the logical channel(s) allowed on the carrier and the CBR measured by lower layers according to TS 38.2xx [xx] if CBR measurement results are available or the corresponding sl-defaultTxConfigIndex configured by RRC if CBR measurement results are not available;
3>	select an amount of frequency resources within the range that is configured by RRC between sl-MinSubChannelNumPSSCH and sl-MaxSubChannelNumPSSCH included in sl-PSSCH-TxConfigList and, if configured by RRC, overlapped between sl-MinSubChannelNumPSSCH and sl-MaxSubChannelNumPSSCH indicated in sl-CBR-PSSCH-TxConfigList for the highest priority of the logical channel(s) allowed on the carrier and the CBR measured by lower layers according to TS 38.2xx [xx] if CBR measurement results are available or the corresponding sl-defaultTxConfigIndex configured by RRC if CBR measurement results are not available;
3>	randomly select the time and frequency resources for one transmission opportunity from the resources indicated by the physical layer according to clause 8.1.4 of TS 38.214 [7], according to the amount of selected frequency resources and the remaining PDB of SL data available in the logical channel(s) allowed on the carrier;
3>	if one or more HARQ retransmissions are selected:
4>	if there are available resources left in the resources indicated by the physical layer according to clause 8.1.4 of TS 38.214 [7] for more transmission opportunities:
5>	randomly select the time and frequency resources for one or more transmission opportunities from the available resources, according to the amount of selected frequency resources, the selected number of HARQ retransmissions and the remaining PDB of SL data available in the logical channel(s) allowed on the carrier;
5>	consider a transmission opportunity which comes first in time as the new transmission opportunity and a transmission opportunity which comes later in time as the retransmission opportunity;
5>	consider both of the transmission opportunities as the selected sidelink grant;
3>	else:
4>	consider the set as the selected sidelink grant;
3>	use the selected sidelink grant to determine PSCCH duration(s) and PSSCH duration(s) according to TS 38.214 [7];
3>	consider the selected sidelink grant to be a configured sidelink grant.
1>	if a configured sidelink grant is available for retransmission(s) of a MAC PDU which has been positively acknowledged as specified in clause 5.22.1.3.3:
2>	clear the PSCCH duration(s) and PSSCH duration(s) corresponding to retransmission(s) of the MAC PDU from the configured sidelink grant.
The MAC entity shall for each PSSCH duration:
1>	for each configured sidelink grant occurring in this PSSCH duration:
2>	if the MAC entity has been configured by RRC to transmit using a SL-RNTI or SLCS-RNTI:
3>	select a MCS which is, if configured, within the range that is configured by RRC between sl-MinMCS-PSSCH and sl-MaxMCS-PSSCH included in SL-ScheduledConfig.
2>	else:
3>	select a MCS which is, if configured, within the range that is configured by RRC between sl-MinMCS-PSSCH and sl-MaxMCS-PSSCH included in sl-PSSCH-TxConfigList and, if configured by RRC, overlapped between sl-MinMCS-PSSCH and sl-MaxMCS-PSSCH indicated in sl-CBR-PSSCH-TxConfigList for the highest priority of the sidelink logical channel(s) in the MAC PDU and the CBR measured by RRC according to TS 38.2xx [xx] if CBR measurement results are available or the corresponding sl-defaultTxConfigIndex configured by RRC if CBR measurement results are not available.
NOTE 3:	MCS selection is up to UE implementation if the MCS or the corresponding range is not configured by upper layers.
2>	deliver the sidelink grant, the selected MCS, and the associated HARQ information to the Sidelink HARQ Entity for this PSSCH duration.
5.22.1.2	TX resource (re-)selection check
If the TX resource (re-)selection check procedure is triggered for a Sidelink process according to clause 5.22.1.1, the MAC entity shall for the Sidelink process:
1>	if SL_RESOURCE_RESELECTION_COUNTER = 0 and when SL_RESOURCE_RESELECTION_COUNTER was equal to 1 the MAC entity randomly selected, with equal probability, a value in the interval [0, 1] which is above the probability configured by upper layers in sl-ProbResourceKeep; or
1>	if a pool of resources is configured or reconfigured by upper layers; or
1>	if there is no configured sidelink grant; or
1>	if neither transmission nor retransmission has been performed by the MAC entity on any resource indicated in the configured sidelink grant during the last [second]; or
1>	if sl-ReselectAfter is configured and the number of consecutive unused transmission opportunities on resources indicated in the configured sidelink grant is equal to sl-ReselectAfter; or
1>	if the configured sidelink grant cannot accommodate a RLC SDU by using the maximum allowed MCS configured by upper layers in sl-MaxMCS-PSSCH and the MAC entity selects not to segment the RLC SDU; or
NOTE 1:	If the configured sidelink grant cannot accommodate the RLC SDU, it is left for UE implementation whether to perform segmentation or sidelink resource reselection.
1>	if transmission(s) with the configured sidelink grant cannot fulfil the latency requirement of the data in a logical channel according to the associated priority, and the MAC entity selects not to perform transmission(s) corresponding to a single MAC PDU; or
NOTE 2:	If the latency requirement is not met, it is left for UE implementation whether to perform transmission(s) corresponding to single MAC PDU or sidelink resource reselection.
1>	if a sidelink transmission is scheduled by any received SCI indicating a higher priority than the prority of the logical channel and expected to overlap with a resource of the configured sidelink grant, and a measured result on SL-RSRP associated with the sidelink transmission is higher than [threshold]:
2>	clear the configured sidelink grant associated to the Sidelink process, if available;
2>	trigger the TX resource (re-)selection.
5.22.1.3	Sidelink HARQ operation
5.22.1.3.1	Sidelink HARQ Entity
The MAC entity includes at most one Sidelink HARQ entity for transmission on SL-SCH, which maintains a number of parallel Sidelink processes.
The maximum number of transmitting Sidelink processes associated with the Sidelink HARQ Entity is [TBD1]. A sidelink process may be configured for transmissions of multiple MAC PDUs. For transmissions of multiple MAC PDUs, the maximum number of transmitting Sidelink processes associated with the Sidelink HARQ Entity is [TBD2].
A delivered sidelink grant and its associated Sidelink transmission information are associated with a Sidelink process. Each Sidelink process supports one TB.
For each sidelink grant, the Sidelink HARQ Entity shall:
1>	if the MAC entity determines that the the sidelink grant is used for initial transmission; and
1>	if no MAC PDU has been obtained:
NOTE 1:	For the configured grant Type 1 and 2, whether a sidelink grant is used for initial transmission or retransmission is up to UE implementation.
2>	associate a Sidelink process to this grant, and for each associated Sidelink process:
3>	obtain the MAC PDU to transmit from the Multiplexing and assembly entity, if any;
3>	if a MAC PDU to transmit has been obtained:
4>	determines Sidelink tranmssion information of the TB for the source and destination pair of the MAC PDU as follows:
5>	set the Source Layer-1 ID to the 16 MSB of the Source Layer-2 ID of the MAC PDU;
5>	set the Destination Layer-1 ID to the 8 MSB of the Destination Layer-2 ID of the MAC PDU;
5>	consider the NDI to have been toggled and set the NDI to the toggled value;
NOTE 2:	The initial value of the NDI set to the very first transmission for the Sidelink HARQ Entity is left to UE implementation.
5>	associate the Sidelink process to a Sidelink process ID;
NOTE 3:	How UE determine Sidelink process ID in SCI is left to UE implementation for NR sidelink.
5>	enable HARQ feedback, if sl-HARQ-FeedbackEnabled has been set to Enabled for the logical channel(s) in the MAC PDU;
5>	set the priority to the value of the highest priority of the logical channel(s) and a MAC CE, if any, if included, in the MAC PDU;
5>	set the communication range to the value of the longest communication range of the logical channel(s) in the MAC PDU, if configured;
5>	set the location information to the Zone_id determined as specified in TS 38.331 [5], if configured.
4>	deliver the MAC PDU, the sideink grant and the Sidelink transmission information of the TB to the associated Sidelink process;
4>	instruct the associated Sidelink process to trigger a new transmission.
3>	else:
4>	flush the HARQ buffer of the associated Sidelink process.
1>	else (i.e. retransmission):
2>	identify the Sidelink process associated with this grant, and for each associated Sidelink process:
3>	if sl-MaxTransNum corresponding to the highest priority of the logical channel(s) in the MAC PDU has been configured in sl-CG-MaxTransNumList for the sidelink grant by RRC and the maximum number of transmissions of the MAC PDU has been reached to sl-MaxTransNum; or
3>	if a positive acknowledgement to a transmission of the MAC PDU has been received according to clause 5.22.1.3.3; or
1>	if only a negative acknowledgement was enabled in the SCI and no negative acknowledgement was received prioritized as specified in clause 5.4.2.2, and the sidelink transmission is prioritized over uplink transmission:
2>	instruct the physical layer to transmit SCI according to the stored sidelink grant with the associated Sidelink transmission information;
2>	instruct the physical layer to generate a transmission according to the stored sidelink grant;
2>	if sl-HARQ-FeedbackEnabled has been set to enabled for the logical channel(s) in the MAC PDU:
3>	instructs the physical layer to monitor PSFCH for the transmission as specified in TS 38.2xx [x].
1>	if this transmission corresponds to the last transmission of the MAC PDU:
2>	decrement SL_RESOURCE_RESELECTION_COUNTER by 1, if available.
The transmission of the MAC PDU is prioritized over uplink transmissions of the MAC entity or the other MAC entity if the following conditions are met:
1>	if the MAC entity is not able to perform this sidelink transmission simultaneously with all uplink transmissions at the time of the transmission, and
1>	if uplink transmission is neither prioritized as specified in clause 5.4.2.2 nor prioritized by upper layer according to TS [24.386] [xx]; and
1>	if the value of the highest priority of logical channel(s) and a MAC CE in the MAC PDU is lower than sl-PrioritizationThres if sl-PrioritizationThres is configured.
NOTE 4:	If the MAC entity is not able to perform this sidelink transmission simultaneously with all uplink transmissions as specified in clause 5.4.2.2 of TS 36.321 [22] at the time of the transmission, and prioritization-related information is not available prior to the time of this sidelink transmission due to processing time restriction, it is up to UE implementation whether this sidelink transmission is performed.
5.22.1.3.2	PSFCH reception
The MAC entity shall for each PSSCH transmission:
1>	if an acknowledgement corresponding to the transmission in clause 5.22.1.3.1 is obtained from the physical layer:
2>	deliver the acknowledgement to the corresponding Sidelink HARQ entity for the Sidelink process;
1>	else:
2>	deliver a negative acknowledgement to the corresponding Sidelink HARQ entity for the Sidelink process;
1>	if sl-PUCCH-Config is configured by RRC:
2>	instruct the physical layer to signal the acknowledgement corresponding to the transmission on the PUCCH according to clause 16.5 of TS 38.213 [6].
5.22.1.4	Multiplexing and assembly
For PDU(s) associated with one SCI, MAC shall consider only logical channels with the same Source Layer-2 ID-Destination Layer-2 ID pair for one of unicast, groupcast and broadcast which is associated with the pair. Multiple transmissions for different Sidelink processes are allowed to be independently performed in different PSSCH durations.
5.22.1.4.1	Logical channel prioritization
5.22.1.4.1.1	General
The sidelink Logical Channel Prioritization procedure is applied whenever a new transmission is performed.
RRC controls the scheduling of sidelink data by signalling for each logical channel:
-	sl-Priority where an increasing priority value indicates a lower priority level;
-	sl-PrioritisedBitRate which sets the sidelink Prioritized Bit Rate (sPBR);
-	sl-BucketSizeDuration which sets the sidelink Bucket Size Duration (sBSD).
RRC additionally controls the LCP procedure by configuring mapping restrictions for each logical channel:
-	sl-configuredSLGrantType1Allowed which sets whether a configured grant Type 1 can be used for sidelink transmission.
The following UE variable is used for the Logical channel prioritization procedure:
-	SBj which is maintained for each logical channel j.
The MAC entity shall initialize SBj of the logical channel to zero when the logical channel is established.
For each logical channel j, the MAC entity shall:
1>	increment SBj by the product sPBR × T before every instance of the LCP procedure, where T is the time elapsed since SBj was last incremented;
1>	if the value of SBj is greater than the sidelink bucket size (i.e. sPBR × sBSD):
2>	set SBj to the sidelink bucket size.
NOTE:	The exact moment(s) when the UE updates SBj between LCP procedures is up to UE implementation, as long as SBj is up to date at the time when a grant is processed by LCP.
5.22.1.4.1.2	Selection of logical channels
The MAC entity shall for each SCI corresponding to a new transmission:
1>	select a Destination associated to one of unicast, groupcast and broadcast, having the logical channel with the highest priority or the MAC CE, among the logical channels that satisfy all the following conditions and MAC CE(s), if any, for the SL grant associated to the SCI:
2>	SL data is available for transmission; and
2>	SBj > 0, in case there is any logical channel having SBj > 0; and
2>	sl-configuredSLGrantType1Allowed, if configured, is set to true in case the SL grant is a Configured Grant Type 1.
NOTE:	If multiple Destinations have the logical channels satisfying all conditions above with the same highest priority or if multiple Destinations have the MAC CE, which Destination is selected among them is up to UE implementation.
1>	select the logical channels satisfying all the following conditions among the logical channels belonging to the selected Destination:
2>	SL data is available for transmission; and
2>	sl-configuredSLGrantType1Allowed, if configured, is set to true in case the SL grant is a Configured Grant Type 1.
5.22.1.4.1.3	Allocation of sidelink resources
The MAC entity shall for each SCI corresponding to a new transmission:
1>	allocate resources to the logical channels as follows:
2>	logical channels selected in clause 5.22.1.4.1.2 for the SL grant with SBj > 0 are allocated resources in a decreasing priority order. If the SL-PBR of a logical channel is set to infinity, the MAC entity shall allocate resources for all the data that is available for transmission on the logical channel before meeting the sPBR of the lower priority logical channel(s);
2>	decrement SBj by the total size of MAC SDUs served to logical channel j above;
2>	if any resources remain, all the logical channels selected in clause 5.22.1.4.1.2 are served in a strict decreasing priority order (regardless of the value of SBj) until either the data for that logical channel or the SL grant is exhausted, whichever comes first. Logical channels configured with equal priority should be served equally.
NOTE:	The value of SBj can be negative.
The UE shall also follow the rules below during the SL scheduling procedures above:
-	the UE should not segment an RLC SDU (or partially transmitted SDU or retransmitted RLC PDU) if the whole SDU (or partially transmitted SDU or retransmitted RLC PDU) fits into the remaining resources of the associated MAC entity;
-	if the UE segments an RLC SDU from the logical channel, it shall maximize the size of the segment to fill the grant of the associated MAC entity as much as possible;
-	the UE should maximise the transmission of data;
-	if the MAC entity is given a sidelink grant size that is equal to or larger than 12 bytes while having data available and allowed (according to clause 5.22.1.4.1) for transmission, the MAC entity shall not transmit only padding;
-	A logical channel configured with sl-HARQ-FeedbackEnabled set to enabled and a logical channel configured with sl-HARQ-FeedbackEnabled set to disabled cannot be multiplexed into the same MAC PDU.
The MAC entity shall not generate a MAC PDU for the HARQ entity if the following conditions are satisfied:
-	there is no Sidelink CSI Reporting MAC CE generated for this PSSCH transmission as specified in clause 5.22.1.7; and
-	the MAC PDU includes zero MAC SDUs.
Logical channels shall be prioritised in accordance with the following order (highest priority listed first):
-	data from SCCH;
-	Sidelink CSI Reporting MAC CE;
-	data from any STCH.
5.22.1.4.2	Multiplexing of MAC SDUs
The MAC entity shall multiplex MAC SDUs in a MAC PDU according to clauses 5.22.1.3.1 and 6.1.6.
5.22.1.5	Scheduling Request
In addition to clause 5.4.4, the Scheduling Request (SR) is also used for requesting SL-SCH resources for new transmission when triggered by the Sidelink BSR (clause 5.22.1.6) or the SL-CSI reporting (clause 5.22.1.7). If configured, the MAC entity performs the SR procedure as specified in this clause unless otherwise specified in clause 5.4.4.
The SR configuration of the logical channel that triggered the Sidelink BSR (clause 5.22.1.6) (if such a configuration exists) is also considered as corresponding SR configuration for the triggered SR (clause 5.4.4). The priority of the triggered SR corresponds to the priority of the logical channel.
If the SL-CSI reporting procedure is enabled by RRC, the SL-CSI reporting is mapped to [zero or] one SR configuration for all PC5-RRC connections established by RRC. The SR configuration of the SL-CSI reporting triggered according to 5.22.1.7 is considered as corresponding SR configuration for the triggered SR (clause 5.4.4). The priority of the triggered SR corresponds to the priority of the SL-CSI reporting.
All pending SR(s) triggered according to the Sidelink BSR procedure (clause 5.22.1.6) prior to the MAC PDU assembly shall be cancelled and each respective sr-ProhibitTimer shall be stopped when the MAC PDU is transmitted and this PDU includes a Sidelink BSR MAC CE which contains buffer status up to (and including) the last event that triggered a Sidelink BSR (see clause 5.22.1.4) prior to the MAC PDU assembly.
All pending SR(s) triggered according to the Sidelink BSR procedure (clause 5.22.1.6) shall be cancelled and each respective sr-ProhibitTimer shall be stopped when the SL grant(s) can accommodate all pending data available for transmission in sidelink.
[The pending SR triggered according to the SL-CSI reporting shall be cancelled and each respective sr-ProhibitTimer shall be stopped when the SL grant(s) can accommodate all SL-CSI reporting(s) that have been triggered but not cancelled.] All pending SR(s) triggered by either Sidelink BSR or Sidelink CSI report shall be cancelled, when RRC configures autonomous resource selection.
5.22.1.6	Buffer Status Reporting
The Sidelink Buffer Status reporting (SL-BSR) procedure is used to provide the serving gNB with information about SL data volume in the MAC entity.
RRC configures the following parameters to control the SL-BSR:
-	periodicBSR-Timer;
-	retxBSR-Timer;
-	sl-logicalChannelSR-DelayTimerApplied;
-	logicalChannelSR-DelayTimer;
-	sl-logicalChannelGroup.
Each logical channel which belongs to a Destination is allocated to an LCG as specified in TS 38.331 [5] or TS 36.331 [21]. The maximum number of LCGs is eight.
The MAC entity determines the amount of SL data available for a logical channel according to the data volume calculation procedure in TSs 38.322 [3] and 38.323 [4].
A SL-BSR shall be triggered if any of the following events occur:
1>	if the MAC entity has a SL-RNTI or SLCS-RNTI:
2>	SL data, for a logical channel of a Destination, becomes available to the MAC entity; and either
3>	this SL data belongs to a logical channel with higher priority than the priorities of the logical channels containing available SL data which belong to any LCG belonging to the same Destination; or
3>	none of the logical channels which belong to an LCG belonging to the same Destination contains any available SL data.
in which case the SL-BSR is referred below to as 'Regular SL-BSR';
2>	UL resources are allocated and number of padding bits remaining after a Padding BSR has been triggered is equal to or larger than the size of the SL-BSR MAC CE plus its subheader, in which case the SL-BSR is referred below to as 'Padding SL-BSR';
2>	retxBSR-Timer expires, and at least one of the logical channels which belong to an LCG contains SL data, in which case the SL-BSR is referred below to as 'Regular SL-BSR';
2>	periodicBSR-Timer expires, in which case the SL-BSR is referred below to as 'Periodic SL-BSR'.
1>	else:
2>	An SL-RNTI is configured by RRC and SL data is available for transmission in the RLC entity or in the PDCP entity, in which case the Sidelink BSR is referred below to as "Regular Sidelink BSR".
For Regular SL-BSR, the MAC entity shall:
1>	if the SL-BSR is triggered for a logical channel for which sl-logicalChannelSR-DelayTimerApplied with value true is configured by upper layers:
2>	start or restart the logicalChannelSR-DelayTimer.
1>	else:
2>	if running, stop the logicalChannelSR-DelayTimer.
For Regular and Periodic SL-BSR, the MAC entity shall:
1>	if sl-PrioritizationThres is configured and the value of the highest priority of the logical channels that belong to any LCG and contain SL data for any Destination is lower than sl-PrioritizationThres; and
1>	if either ul-PrioritizationThres is not configured or ul-PrioritizationThres is configured and the value of the highest priority of the logical channels that belong to any LCG and contain UL data is equal to or higher than ul-PrioritizationThres according to clause 5.4.5:
2>	prioritize the LCG(s) for the Destination(s).
1>	if the Buffer Status reporting procedure determines that at least one BSR has been triggered and not cancelled according to clause 5.4.5 and the UL grant cannot accommodate a SL-BSR MAC CE containing buffer status only for all prioritized LCGs having data available for transmission plus the subheader of the SL-BSR according to clause 5.4.3.1.3, in case the SL-BSR is considered as not prioritized:
3>	report Truncated SL-BSR containing buffer status for as many prioritized LCGs having data available for transmission as possible, taking the number of bits in the UL grant into consideration;
3>	prioritize the SL-BSR for logical channel prioritization specified in clause 5.4.3.1.
1>	else if the number of bits in the UL grant is expected to be equal to or larger than the size of a SL-BSR containing buffer status for all LCGs having data available for transmission plus the subheader of the SL-BSR according to clause 5.4.3.1.3:
2>	report SL-BSR containing buffer status for all LCGs having data available for transmission.
1>	else:
2>	report Truncated SL-BSR containing buffer status for as many LCGs having data available for transmission as possible, taking the number of bits in the UL grant into consideration.
For Padding BSR:
1>	if the number of padding bits remaining after a Padding BSR has been triggered is equal to or larger than the size of a SL-BSR containing buffer status for all LCGs having data available for transmission plus its subheader:
2>	report SL-BSR containing buffer status for all LCGs having data available for transmission;
1>	else:
2>	report Truncated SL-BSR containing buffer status for as many LCGs having data available for transmission as possible, taking the number of bits in the UL grant into consideration.
For SL-BSR triggered by retxBSR-Timer expiry, the MAC entity considers that the logical channel that triggered the SL-BSR is the highest priority logical channel that has data available for transmission at the time the SL-BSR is triggered.
The MAC entity shall:
1>	if the sidelink Buffer Status reporting procedure determines that at least one SL-BSR has been triggered and not cancelled:
2>	if UL-SCH resources are available for a new transmission and the UL-SCH resources can accommodate the SL-BSR MAC CE plus its subheader as a result of logical channel prioritization according to clause 5.4.3.1:
3>	instruct the Multiplexing and Assembly procedure in clause 5.4.3 to generate the SL-BSR MAC CE(s);
3>	start or restart periodicBSR-Timer except when all the generated SL-BSRs are Truncated SL-BSRs;
3>	start or restart retxBSR-Timer.
2>	if a Regular SL-BSR has been triggered and logicalChannelSR-DelayTimer is not running:
3>	if there is no UL-SCH resource available for a new transmission:
4>	trigger a Scheduling Request.
NOTE 1:	UL-SCH resources are considered available if the MAC entity has an active configuration for either type of configured uplink grants, or if the MAC entity has received a dynamic uplink grant, or if both of these conditions are met. If the MAC entity has determined at a given point in time that UL-SCH resources are available, this need not imply that UL-SCH resources are available for use at that point in time.
A MAC PDU shall contain at most one SL-BSR MAC CE, even when multiple events have triggered a SL-BSR. The Regular SL-BSR and the Periodic SL-BSR shall have precedence over the padding SL-BSR.
The MAC entity shall restart retxBSR-Timer upon reception of an SL grant for transmission of new data on any SL-SCH.
All triggered SL-BSRs may be cancelled when the SL grant(s) can accommodate all pending data available for transmission. All BSRs triggered prior to MAC PDU assembly shall be cancelled when a MAC PDU is transmitted and this PDU includes a SL-BSR MAC CE which contains buffer status up to (and including) the last event that triggered a SL-BSR prior to the MAC PDU assembly. All triggered SL-BSRs shall be cancelled, and retx-BSR-Timer and periodic-BSR-Timer shall be stopped, when RRC configures autonomous resource selection.
NOTE 2:	MAC PDU assembly can happen at any point in time between uplink grant reception and actual transmission of the corresponding MAC PDU. SL-BSR and SR can be triggered after the assembly of a MAC PDU which contains a SL-BSR MAC CE, but before the transmission of this MAC PDU. In addition, SL-BSR and SR can be triggered during MAC PDU assembly.
5.22.1.7	CSI Reporting
The Sidelink Channel State Information (SL-CSI) reporting procedure is used to provide a peer UE with sidelink channel state information as specified in clause 8.5 of TS 38.214 [7].
The MAC entity shall for each pair of the Source Layer-2 ID and the Destination Layer-2 ID:
1>	if the SL-CSI reporting has been triggered by a SCI and not cancelled:
2>	if the MAC entity has SL resources allocated for new transmission:
3>	instruct the Multiplexing and Assembly procedure to generate a Sidelink CSI Reporting MAC CE as defined in clause 6.1.3.35;
3>	cancel the triggered SL-CSI reporting.
2>	else if the MAC entity has been configured by RRC to transmit using a SL-RNTI or SLCS-RNTI:
3>	trigger a Scheduling Request.
5.22.2	SL-SCH Data reception
5.22.2.1	SCI reception
SCI indicate if there is a transmission on SL-SCH and provide the relevant HARQ information. A SCI consists of two parts: the 1st stage SCI on PSCCH and the 2nd stage SCI on PSSCH as specified in clause 8.1 of TS 38.214 [7].
The MAC entity shall:
1>	for each PSCCH duration during which the MAC entity monitors PSCCH:
2>	if a 1st stage SCI for this PSSCH duration has been received on the PSCCH:
3>	determine the set of PSSCH durations in which reception of a 2nd stage SCI and the transport block occur using the received part of the SCI;
3>	if the 2nd stage SCI for this PSSCH duration has been received on the PSSCH:
4>	store the SCI as a valid SCI for the PSSCH durations corresponding to transmission(s) of the transport block and the associated HARQ information and QoS information;
1>	for each PSSCH duration for which the MAC entity has a valid SCI:
2>	deliver the SCI and the associated Sidelink transmission information to the Sidelink HARQ Entity.
5.22.2.2	Sidelink HARQ operation
5.22.2.2.1	Sidelink HARQ Entity
There is at most one Sidelink HARQ Entity at the MAC entity for reception of the SL-SCH, which maintains a number of parallel Sidelink processes.
Each Sidelink process is associated with SCI in which the MAC entity is interested. This interest is as determined by the Destination Layer-1 ID and the Source Layer-1 ID of the SCI. The Sidelink HARQ Entity directs Sidelink transmission information and associated TBs received on the SL-SCH to the corresponding Sidelink processes.
The number of Receiving Sidelink processes associated with the Sidelink HARQ Entity is defined in [TBD].
For each PSSCH duration, the Sidelink HARQ Entity shall:
1>	for each SCI valid for this PSSCH duration:
2>	if the NDI has been toggled compared to the value of the previous received transmission corresponding to this TB or this is the very first received transmission for this TB:
3>	allocate the TB received from the physical layer and the associated Sidelink transmission information to an unoccupied Sidelink process, associate the Sidelink process with this SCI and consider this transmission to be a new transmission.
NOTE:	When a new TB arrives, if there is no unoccupied Sidelink process in the Sidelink HARQ entity, how to manage receiving Sidelink processes is up to UE implementation.
1>	for each Sidelink process:
2>	if the NDI has been not toggled compared to the value of the previous received transmission corresponding to this TB for the Sidelink process according to its associated SCI:
3>	allocate the TB received from the physical layer to the Sidelink process and consider this transmission to be a retransmission.
2>	else if the HARQ buffer of the Sidelink process is not empty:
3>	flush the HARQ buffer.
5.22.2.2.2	Sidelink process
For each PSSCH duration where a transmission takes place for the Sidelink process, one TB and the associated HARQ information is received from the Sidelink HARQ Entity.
For each received TB and associated Sidelink transmission information, the Sidelink process shall:
1>	if this is a new transmission:
2>	attempt to decode the received data.
1>	else if this is a retransmission:
2>	if the data for this TB has not yet been successfully decoded:
3>	instruct the physical layer to combine the received data with the data currently in the soft buffer for this TB and attempt to decode the combined data.
1>	if the data which the MAC entity attempted to decode was successfully decoded for this TB; or
1>	if the data for this TB was successfully decoded before:
2>	if this is the first successful decoding of the data for this TB, if the SRC field of the decoded MAC PDU subheader is equal to the 16 MSB of any of the Source Layer-2 ID(s) of the UE for which the 8 LSB are equal to the Source ID in the corresponding SCI, and if the DST field of the decoded MAC PDU subheader is equal to the 8 MSB of any of the Destination Layer-2 ID(s) of the UE for which the 16 LSB are equal to the Destination ID in the corresponding SCI:
3>	deliver the decoded MAC PDU to the disassembly and demultiplexing entity;
3>	consider the Sidelink process as unoccupied.
1>	else:
2>	instruct the physical layer to replace the data in the soft buffer for this TB with the data which the MAC entity attempted to decode.
1>	if HARQ feedback is enabled by the SCI:
2>	if HARQ feedback corresponding to this TB is configured with [a separate PSFCH resource]; or
2>	if HARQ feedback corresponding to this TB is configured with [a shared PSFCH resource] and the communication range calculated with the location information of the associated Sidelink transmission information according to TS 38.331 is smaller or equal to the communication range indicated in the associated Sidelink transmission:
3>	instruct the physical layer to generate acknowledgement(s) of the data in this TB.
5.22.2.3	Disassembly and demultiplexing
The MAC entity shall disassemble and demultiplex a MAC PDU as defined in clause 6.1.6.
5.23	SL-BCH data transfer
5.23.1	SL-BCH data transmission
When instructed to send SL-BCH, the MAC entity shall:
1>	obtain the MAC PDU to transmit from SBCCH;
1>	deliver the MAC PDU to the physical layer and instruct it to generate a transmission.
5.23.2	SL-BCH data reception
When the MAC entity needs to receive SL-BCH, the MAC entity shall:
1>	receive and attempt to decode the SL-BCH;
1>	if a TB on the SL-BCH has been successfully decoded:
2>	deliver the decoded MAC PDU to upper layers.
6	Protocol Data Units, formats and parameters
6.1	Protocol Data Units
6.1.1	General
A MAC PDU is a bit string that is byte aligned (i.e. multiple of 8 bits) in length. In the figures in clause 6, bit strings are represented by tables in which the most significant bit is the leftmost bit of the first line of the table, the least significant bit is the rightmost bit on the last line of the table, and more generally the bit string is to be read from left to right and then in the reading order of the lines. The bit order of each parameter field within a MAC PDU is represented with the first and most significant bit in the leftmost bit and the last and least significant bit in the rightmost bit.
A MAC SDU is a bit string that is byte aligned (i.e. multiple of 8 bits) in length. A MAC SDU is included into a MAC PDU from the first bit onward.
A MAC CE is a bit string that is byte aligned (i.e. multiple of 8 bits) in length.
A MAC subheader is a bit string that is byte aligned (i.e. multiple of 8 bits) in length. Each MAC subheader is placed immediately in front of the corresponding MAC SDU, MAC CE, or padding.
The MAC entity shall ignore the value of the Reserved bits in downlink MAC PDUs.
6.1.2	MAC PDU (DL-SCH and UL-SCH except transparent MAC and Random Access Response)
A MAC PDU consists of one or more MAC subPDUs. Each MAC subPDU consists of one of the following:
-	A MAC subheader only (including padding);
-	A MAC subheader and a MAC SDU;
-	A MAC subheader and a MAC CE;
-	A MAC subheader and padding.
The MAC SDUs are of variable sizes.
Each MAC subheader corresponds to either a MAC SDU, a MAC CE, or padding.
A MAC subheader except for fixed sized MAC CE, padding, and a MAC SDU containing UL CCCH consists of the header fields R/F/LCID/(eLCID)/L. A MAC subheader for fixed sized MAC CE, padding, and a MAC SDU containing UL CCCH consists of the two header fields R/LCID.
Figure 6.1.2-1: R/F/LCID/(eLCID)/L MAC subheader with 8-bit L field
Figure 6.1.2-2: R/F/LCID/(eLCID)/L MAC subheader with 16-bit L field
Figure 6.1.2-3: R/LCID/(eLCID) MAC subheader
MAC CEs are placed together. DL MAC subPDU(s) with MAC CE(s) is placed before any MAC subPDU with MAC SDU and MAC subPDU with padding as depicted in Figure 6.1.2-4. UL MAC subPDU(s) with MAC CE(s) is placed after all the MAC subPDU(s) with MAC SDU and before the MAC subPDU with padding in the MAC PDU as depicted in Figure 6.1.2-5. The size of padding can be zero.
Figure 6.1.2-4: Example of a DL MAC PDU
Figure 6.1.2-5: Example of a UL MAC PDU
A maximum of one MAC PDU can be transmitted per TB per MAC entity.
6.1.3	MAC Control Elements (CEs)
6.1.3.1	Buffer Status Report MAC CEs
Buffer Status Report (BSR) MAC CEs consist of either:
-	Short BSR format (fixed size); or
-	Long BSR format (variable size); or
-	Short Truncated BSR format (fixed size);
-	Long Truncated BSR format (variable size); or
-	Pre-emptive BSR format (variable size).
The BSR formats are identified by MAC subheaders with LCIDs as specified in Table 6.2.1-2.
The fields in the BSR MAC CE are defined as follows:
-	LCG ID: The Logical Channel Group ID field identifies the group of logical channel(s) whose buffer status is being reported. The length of the field is 3 bits;
-	LCGi: For the Long BSR format, this field indicates the presence of the Buffer Size field for the logical channel group i. The LCGi field set to 1 indicates that the Buffer Size field for the logical channel group i is reported. The LCGi field set to 0 indicates that the Buffer Size field for the logical channel group i is not reported. For the Long Truncated BSR format, this field indicates whether logical channel group i has data available. The LCGi field set to 1 indicates that logical channel group i has data available. The LCGi field set to 0 indicates that logical channel group i does not have data available;
-	Buffer Size: The Buffer Size field identifies the total amount of data available according to the data volume calculation procedure in TSs 38.322 [3] and 38.323 [4] across all logical channels of a logical channel group after the MAC PDU has been built (i.e. after the logical channel prioritization procedure, which may result the value of the Buffer Size field to zero). The amount of data is indicated in number of bytes. The size of the RLC and MAC headers are not considered in the buffer size computation. The length of this field for the Short BSR format and the Short Truncated BSR format is 5 bits. The length of this field for the Long BSR format and the Long Truncated BSR format is 8 bits. The values for the 5-bit and 8-bit Buffer Size fields are shown in Tables 6.1.3.1-1 and 6.1.3.1-2, respectively. For the Long BSR format and the Long Truncated BSR format, the Buffer Size fields are included in ascending order based on the LCGi. For the Long Truncated BSR format the number of Buffer Size fields included is maximised, while not exceeding the number of padding bits. For the Pre-emptive BSR, the Buffer Size field identifies the total amount of the data expected to arrive at the IAB-MT of the node where the Pre-emptive BSR is triggered. Pre-emptive BSR is identical to the Long BSR format.
NOTE 1:	For the Pre-emptive BSR, if configured, the LCGs to be reported, the expected data volume calculation, the exact time to report Pre-emptive BSR and the associated LCH are left to implementation.
NOTE 2:	The mapping of LCGs between the ingress and egress links of an IAB node for purposes of determining expected change in occupancy of IAB-MT buffers (to be reported as Pre-emptive BSR) is left to implementation.
NOTE 3:	The number of the Buffer Size fields in the Long BSR and Long Truncated BSR format can be zero.
Figure 6.1.3.1-1: Short BSR and Short Truncated BSR MAC CE
Figure 6.1.3.1-2: Long BSR, Long Truncated BSR, and Pre-emptive BSR MAC CE
Table 6.1.3.1-1: Buffer size levels (in bytes) for 5-bit Buffer Size field
Table 6.1.3.1-2: Buffer size levels (in bytes) for 8-bit Buffer Size field
6.1.3.2	C-RNTI MAC CE
The C-RNTI MAC CE is identified by MAC subheader with LCID as specified in Table 6.2.1-2.
It has a fixed size and consists of a single field defined as follows (Figure 6.1.3.2-1):
-	C-RNTI: This field contains the C-RNTI of the MAC entity. The length of the field is 16 bits.
Figure 6.1.3.2-1: C-RNTI MAC CE
6.1.3.3	UE Contention Resolution Identity MAC CE
The UE Contention Resolution Identity MAC CE is identified by MAC subheader with LCID as specified in Table 6.2.1-1.
It has a fixed 48-bit size and consists of a single field defined as follows (Figure 6.1.3.3-1):
-	UE Contention Resolution Identity: This field contains the UL CCCH SDU. If the UL CCCH SDU is longer than 48 bits, this field contains the first 48 bits of the UL CCCH SDU.
Figure 6.1.3.3-1: UE Contention Resolution Identity MAC CE
6.1.3.4	Timing Advance Command MAC CE
The Timing Advance Command MAC CE is identified by MAC subheader with LCID as specified in Table 6.2.1-1.
It has a fixed size and consists of a single octet defined as follows (Figure 6.1.3.4-1):
-	TAG Identity (TAG ID): This field indicates the TAG Identity of the addressed TAG. The TAG containing the SpCell has the TAG Identity 0. The length of the field is 2 bits;
-	Timing Advance Command: This field indicates the index value TA (0, 1, 2… 63) used to control the amount of timing adjustment that MAC entity has to apply (as specified in TS 38.213 [6]). The length of the field is 6 bits.
Figure 6.1.3.4-1: Timing Advance Command MAC CE
6.1.3.4a	Absolute Timing Advance Command MAC CE
The Absolute Timing Advance Command MAC CE is identified by MAC subheader with LCID as specified in Table 6.2.1-1.
It has a fixed size and consists of two octets defined as follows (Figure 6.1.3.4a-1):
-	Timing Advance Command: This field indicates the index value TA used to control the amount of timing adjustment that the MAC entity has to apply in TS 38.213 [6]. The size of the field is 12 bits;
-	R: Reserved bit, set to "0".
Figure 6.1.3.4a-1: Absolute Timing Advance Command MAC CE
6.1.3.5	DRX Command MAC CE
The DRX Command MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1.
It has a fixed size of zero bits.
6.1.3.6	Long DRX Command MAC CE
The Long DRX Command MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1.
It has a fixed size of zero bits.
6.1.3.7	Configured Grant Confirmation MAC CE
The Configured Grant Confirmation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-2.
It has a fixed size of zero bits.
6.1.3.8	Single Entry PHR MAC CE
The Single Entry PHR MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-2.
It has a fixed size and consists of two octets defined as follows (figure 6.1.3.8-1):
-	R: Reserved bit, set to 0;
-	Power Headroom (PH): This field indicates the power headroom level. The length of the field is 6 bits. The reported PH and the corresponding power headroom levels are shown in Table 6.1.3.8-1 below (the corresponding measured values in dB are specified in TS 38.133 [11]);
-	PCMAX,f,c: This field indicates the PCMAX,f,c (as specified in TS 38.213 [6]) used for calculation of the preceding PH field. The reported PCMAX,f,c and the corresponding nominal UE transmit power levels are shown in Table 6.1.3.8-2 (the corresponding measured values in dBm are specified in TS 38.133 [11]).
Figure 6.1.3.8-1: Single Entry PHR MAC CE
Table 6.1.3.8-1: Power Headroom levels for PHR
Table 6.1.3.8-2: Nominal UE transmit power level for PHR
6.1.3.9	Multiple Entry PHR MAC CE
The Multiple Entry PHR MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-2.
It has a variable size, and includes the bitmap, a Type 2 PH field and an octet containing the associated PCMAX,f,c field (if reported) for SpCell of the other MAC entity, a Type 1 PH field and an octet containing the associated PCMAX,f,c field (if reported) for the PCell. It further includes, in ascending order based on the ServCellIndex, one or multiple of Type X PH fields and octets containing the associated PCMAX,f,c fields (if reported) for Serving Cells other than PCell indicated in the bitmap. X is either 1 or 3 according to TS 38.213 [6] and TS 36.213 [17].
The presence of Type 2 PH field for SpCell of the other MAC entity is configured by phr-Type2OtherCell with value true.
A single octet bitmap is used for indicating the presence of PH per Serving Cell when the highest ServCellIndex of Serving Cell with configured uplink is less than 8, otherwise four octets are used.
The MAC entity determines whether PH value for an activated Serving Cell is based on real transmission or a reference format by considering the configured grant(s) and downlink control information which has been received until and including the PDCCH occasion in which the first UL grant for a new transmission that can accommodate the MAC CE for PHR as a result of LCP as defined in clause 5.4.3.1 is received since a PHR has been triggered if the PHR MAC CE is reported on an uplink grant received on the PDCCH or until the first uplink symbol of PUSCH transmission minus PUSCH preparation time as defined in clause 7.7 of TS 38.213 [6] if the PHR MAC CE is reported on a configured grant.
For a band combination in which the UE does not support dynamic power sharing, the UE may omit the octets containing Power Headroom field and PCMAX,f,c field for Serving Cells in the other MAC entity except for the PCell in the other MAC entity and the reported values of Power Headroom and PCMAX,f,c for the PCell are up to UE implementation.
The PHR MAC CEs are defined as follows:
-	Ci: This field indicates the presence of a PH field for the Serving Cell with ServCellIndex i as specified in TS 38.331 [5]. The Ci field set to 1 indicates that a PH field for the Serving Cell with ServCellIndex i is reported. The Ci field set to 0 indicates that a PH field for the Serving Cell with ServCellIndex i is not reported;
-	R: Reserved bit, set to 0;
-	V: This field indicates if the PH value is based on a real transmission or a reference format. For Type 1 PH, the V field set to 0 indicates real transmission on PUSCH and the V field set to 1 indicates that a PUSCH reference format is used. For Type 2 PH, the V field set to 0 indicates real transmission on PUCCH and the V field set to 1 indicates that a PUCCH reference format is used. For Type 3 PH, the V field set to 0 indicates real transmission on SRS and the V field set to 1 indicates that an SRS reference format is used. Furthermore, for Type 1, Type 2, and Type 3 PH, the V field set to 0 indicates the presence of the octet containing the associated PCMAX,f,c field, and the V field set to 1 indicates that the octet containing the associated PCMAX,f,c field is omitted;
-	Power Headroom (PH): This field indicates the power headroom level. The length of the field is 6 bits. The reported PH and the corresponding power headroom levels are shown in Table 6.1.3.8-1 (the corresponding measured values in dB for the NR Serving Cell are specified in TS 38.133 [11] while the corresponding measured values in dB for the E-UTRA Serving Cell are specified in TS 36.133 [12]);
-	P: This field indicates whether the MAC entity applies power backoff due to power management (as allowed by P-MPRc as specified in TS 38.101-1 [14], TS 38.101-2 [15], and TS 38.101-3 [16]). The MAC entity shall set the P field to 1 if the corresponding PCMAX,f,c field would have had a different value if no power backoff due to power management had been applied;
-	PCMAX,f,c: If present, this field indicates the PCMAX,f,c (as specified in TS 38.213 [6]) for the NR Serving Cell and the PCMAX,c or P̃CMAX,c (as specified in TS 36.213 [17]) for the E-UTRA Serving Cell used for calculation of the preceding PH field. The reported PCMAX,f,c and the corresponding nominal UE transmit power levels are shown in Table 6.1.3.8-2 (the corresponding measured values in dBm for the NR Serving Cell are specified in TS 38.133 [11] while the corresponding measured values in dBm for the E-UTRA Serving Cell are specified in TS 36.133 [12]).
Figure 6.1.3.9-1: Multiple Entry PHR MAC CE with the highest ServCellIndex of Serving Cell with configured uplink is less than 8
Figure 6.1.3.9-2: Multiple Entry PHR MAC CE with the highest ServCellIndex of Serving Cell with configured uplink is equal to or higher than 8
6.1.3.10	SCell Activation/Deactivation MAC CEs
The SCell Activation/Deactivation MAC CE of one octet is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size and consists of a single octet containing seven C-fields and one R-field. The SCell Activation/Deactivation MAC CE with one octet is defined as follows (Figure 6.1.3.10-1).
The SCell Activation/Deactivation MAC CE of four octets is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size and consists of four octets containing 31 C-fields and one R-field. The SCell Activation/Deactivation MAC CE of four octets is defined as follows (Figure 6.1.3.10-2).
-	Ci: If there is an SCell configured for the MAC entity with SCellIndex i as specified in TS 38.331 [5], this field indicates the activation/deactivation status of the SCell with SCellIndex i, else the MAC entity shall ignore the Ci field. The Ci field is set to 1 to indicate that the SCell with SCellIndex i shall be activated. The Ci field is set to 0 to indicate that the SCell with SCellIndex i shall be deactivated;
-	R: Reserved bit, set to 0.
Figure 6.1.3.10-1: SCell Activation/Deactivation MAC CE of one octet
Figure 6.1.3.10-2: SCell Activation/Deactivation MAC CE of four octets
6.1.3.11	Duplication Activation/Deactivation MAC CE
The Duplication Activation/Deactivation MAC CE of one octet is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size and consists of a single octet containing eight D-fields. The Duplication Activation/Deactivation MAC CE is defined, for a MAC entity, as follows (Figure 6.1.3.11-1).
-	Di: This field indicates the activation/deactivation status of the PDCP duplication of DRB i where i is the ascending order of the DRB ID among the DRBs configured with PDCP duplication and with RLC entity(ies) associated with this MAC entity. The Di field is set to 1 to indicate that the PDCP duplication of DRB i shall be activated. The Di field is set to 0 to indicate that the PDCP duplication of DRB i shall be deactivated.
Figure 6.1.3.11-1: Duplication Activation/Deactivation MAC CE
6.1.3.12	SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE
The SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a variable size and consists of the following fields:
-	A/D: This field indicates whether to activate or deactivate indicated SP CSI-RS and CSI-IM resource set(s). The field is set to 1 to indicate activation, otherwise it indicates deactivation;
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits;
-	BWP ID: This field indicates a DL BWP for which the MAC CE applies as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits;
-	SP CSI-RS resource set ID: This field contains an index of NZP-CSI-RS-ResourceSet containing Semi Persistent NZP CSI-RS resources, as specified in TS 38.331 [5], indicating the Semi Persistent NZP CSI-RS resource set, which shall be activated or deactivated. The length of the field is 6 bits;
-	IM: This field indicates the presence of the octet containing SP CSI-IM resource set ID field. If the IM field is set to 1, the octet containing SP CSI-IM resource set ID field is present. If IM field is set to 0, the octet containing SP CSI-IM resource set ID field is not present;
-	SP CSI-IM resource set ID: This field contains an index of CSI-IM-ResourceSet containing Semi Persistent CSI-IM resources, as specified in TS 38.331 [5], indicating the Semi Persistent CSI-IM resource set, which shall be activated or deactivated. The length of the field is 6 bits;
-	TCI State IDi: This field contains TCI-StateId, as specified in TS 38.331 [5], of a TCI State, which is used as QCL source for the resource within the Semi Persistent NZP CSI-RS resource set indicated by SP CSI-RS resource set ID field. TCI State ID0 indicates TCI State for the first resource within the set, TCI State ID1 for the second one and so on. The length of the field is 7 bits. If the A/D field is set to 0, the octets containing TCI State ID field(s) are not present;
-	R: Reserved bit, set to 0.
Figure 6.1.3.12-1: SP CSI-RS/CSI-IM Resource Set Activation/Deactivation MAC CE
6.1.3.13	Aperiodic CSI Trigger State Subselection MAC CE
The Aperiodic CSI Trigger State Subselection MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a variable size consisting of following fields:
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits;
-	BWP ID: This field indicates a DL BWP for which the MAC CE applies as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits;
-	Ti: This field indicates the selection status of the Aperiodic Trigger States configured within aperiodicTriggerStateList or aperiodicTriggerStateListForDCI-Format0-2 depending on how D field is set, as specified in TS 38.331 [5]. T0 refers to the first trigger state within the list, T1 to the second one and so on. If the list does not contain entry with index i, MAC entity shall ignore the Ti field. The Ti field is set to 1 to indicate that the Aperiodic Trigger State i shall be mapped to the codepoint of the DCI CSI request field, as specified in TS 38.214 [7]. The codepoint to which the Aperiodic Trigger State is mapped is determined by its ordinal position among all the Aperiodic Trigger States with Ti field set to 1, i.e. the first Aperiodic Trigger State with Ti field set to 1 shall be mapped to the codepoint value 1, second Aperiodic Trigger State with Ti field set to 1 shall be mapped to the codepoint value 2 and so on. The maximum number of mapped Aperiodic Trigger States is 63;
-	D: This field indicates which aperiodic CSI trigger state list this MAC CE refers to. If the field is set to 0, the Ti fields indicate the Aperiodic Trigger States configured within aperiodicTriggerStateList; if the field is set to 1, the Ti field indicate the Aperiodic Trigger States configured within aperiodicTriggerStateListForDCI-Format0-2.
Figure 6.1.3.13-1: Aperiodic CSI Trigger State Subselection MAC CE
6.1.3.14	TCI States Activation/Deactivation for UE-specific PDSCH MAC CE
The TCI States Activation/Deactivation for UE-specific PDSCH MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a variable size consisting of following fields:
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits. If the indicated Serving Cell is configured as part of a CC-list as specified in TS 38.331 [5], this MAC CE applies to all the CCs in the CC list;
-	BWP ID: This field indicates a DL BWP for which the MAC CE applies as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits. This field is ignored if this MAC CE applies to a CC list;
-	Ti: If there is a TCI state with TCI-StateId i as specified in TS 38.331 [5], this field indicates the activation/deactivation status of the TCI state with TCI-StateId i, otherwise MAC entity shall ignore the Ti field. The Ti field is set to 1 to indicate that the TCI state with TCI-StateId i shall be activated and mapped to the codepoint of the DCI Transmission Configuration Indication field, as specified in TS 38.214 [7]. The Ti field is set to 0 to indicate that the TCI state with TCI-StateId i shall be deactivated and is not mapped to the codepoint of the DCI Transmission Configuration Indication field. The codepoint to which the TCI State is mapped is determined by its ordinal position among all the TCI States with Ti field set to 1, i.e. the first TCI State with Ti field set to 1 shall be mapped to the codepoint value 0, second TCI State with Ti field set to 1 shall be mapped to the codepoint value 1 and so on. The maximum number of activated TCI states is 8;
-	CORESET Pool ID: This field indicates that mapping between the activated TCI states and the codepoint of the DCI Transmission Configuration Indication set by field Ti is specific to the ControlResourceSetId configured with CORESET Pool ID as specified in TS 38.331 [5]. This field is set to 1 indicates that this MAC CE shall be applied for the DL transmission scheduled by CORESET with the CORESET pool ID equal to 1, otherwise, this MAC CE shall be applied for the DL transmission scheduled by CORESET pool ID equal to 0.
Figure 6.1.3.14-1: TCI States Activation/Deactivation for UE-specific PDSCH MAC CE
6.1.3.15	TCI State Indication for UE-specific PDCCH MAC CE
The TCI State Indication for UE-specific PDCCH MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size of 16 bits with following fields:
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits. If the indicated serving cell is configured as part of a CC-list as specified in TS 38.331 [5], this MAC CE applies to all the CCs in the CC list;
-	CORESET ID: This field indicates a Control Resource Set identified with ControlResourceSetId as specified in TS 38.331 [5], for which the TCI State is being indicated. In case the value of the field is 0, the field refers to the Control Resource Set configured by controlResourceSetZero as specified in TS 38.331 [5]. The length of the field is 4 bits;
-	TCI State ID: This field indicates the TCI state identified by TCI-StateId as specified in TS 38.331 [5] applicable to the Control Resource Set identified by CORESET ID field. If the field of CORESET ID is set to 0, this field indicates a TCI-StateId for a TCI state of the first 64 TCI-states configured by tci-States-ToAddModList and tci-States-ToReleaseList in the PDSCH-Config in the active BWP. If the field of CORESET ID is set to the other value than 0, this field indicates a TCI-StateId configured by tci-StatesPDCCH-ToAddList and tci-StatesPDCCH-ToReleaseList in the controlResourceSet identified by the indicated CORESET ID. The length of the field is 7 bits.
Figure 6.1.3.15-1: TCI State Indication for UE-specific PDCCH MAC CE
6.1.3.16	SP CSI reporting on PUCCH Activation/Deactivation MAC CE
The SP CSI reporting on PUCCH Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size of 16 bits with following fields:
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits;
-	BWP ID: This field indicates a UL BWP for which the MAC CE applies as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits;
-	Si: This field indicates the activation/deactivation status of the Semi-Persistent CSI report configuration within csi-ReportConfigToAddModList, as specified in TS 38.331 [5]. S0 refers to the report configuration which includes PUCCH resources for SP CSI reporting in the indicated BWP and has the lowest CSI-ReportConfigId within the list with type set to semiPersistentOnPUCCH, S1 to the report configuration which includes PUCCH resources for SP CSI reporting in the indicated BWP and has the second lowest CSI-ReportConfigId and so on. If the number of report configurations within the list with type set to semiPersistentOnPUCCH in the indicated BWP is less than i + 1, MAC entity shall ignore the Si field. The Si field is set to 1 to indicate that the corresponding Semi-Persistent CSI report configuration shall be activated. The Si field is set to 0 to indicate that the corresponding Semi-Persistent CSI report configuration i shall be deactivated;
-	R: Reserved bit, set to 0.
Figure 6.1.3.16-1: SP CSI reporting on PUCCH Activation/Deactivation MAC CE
6.1.3.17	SP SRS Activation/Deactivation MAC CE
The SP SRS Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a variable size with following fields:
-	A/D: This field indicates whether to activate or deactivate indicated SP SRS resource set. The field is set to 1 to indicate activation, otherwise it indicates deactivation;
-	SRS Resource Set's Cell ID: This field indicates the identity of the Serving Cell, which contains activated/deactivated SP SRS Resource Set. If the C field is set to 0, this field also indicates the identity of the Serving Cell which contains all resources indicated by the Resource IDi fields. The length of the field is 5 bits;
-	SRS Resource Set's BWP ID: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], which contains activated/deactivated SP SRS Resource Set. If the C field is set to 0, this field also indicates the identity of the BWP which contains all resources indicated by the Resource IDi fields. The length of the field is 2 bits;
-	C: This field indicates whether the octets containing Resource Serving Cell ID field(s) and Resource BWP ID field(s) are present. If this field is set to 1, the octets containing Resource Serving Cell ID field(s) and Resource BWP ID field(s) are present, otherwise they are not present;
-	SUL: This field indicates whether the MAC CE applies to the NUL carrier or SUL carrier configuration. This field is set to 1 to indicate that it applies to the SUL carrier configuration, and it is set to 0 to indicate that it applies to the NUL carrier configuration;
-	SP SRS Resource Set ID: This field indicates the SP SRS Resource Set ID identified by SRS-ResourceSetId as specified in TS 38.331 [5], which is to be activated or deactivated. The length of the field is 4 bits;
-	Fi: This field indicates the type of a resource used as a spatial relationship for SRS resource within SP SRS Resource Set indicated with SP SRS Resource Set ID field. F0 refers to the first SRS resource within the resource set, F1 to the second one and so on. The field is set to 1 to indicate NZP CSI-RS resource index is used, and it is set to 0 to indicate either SSB index or SRS resource index is used. The length of the field is 1 bit. This field is only present if MAC CE is used for activation, i.e. the A/D field is set to 1;
-	Resource IDi: This field contains an identifier of the resource used for spatial relationship derivation for SRS resource i. Resource ID0 refers to the first SRS resource within the resource set, Resource ID1 to the second one and so on. If Fi is set to 0, and the first bit of this field is set to 1, the remainder of this field contains SSB-Index as specified in TS 38.331 [5]. If Fi is set to 0, and the first bit of this field is set to 0, the remainder of this field contains SRS-ResourceId as specified in TS 38.331 [5]. The length of the field is 7 bits. This field is only present if MAC CE is used for activation, i.e. the A/D field is set to 1;
-	Resource Serving Cell IDi: This field indicates the identity of the Serving Cell on which the resource used for spatial relationship derivation for SRS resource i is located. The length of the field is 5 bits;
-	Resource BWP IDi: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], on which the resource used for spatial relationship derivation for SRS resource i is located. The length of the field is 2 bits;
-	R: Reserved bit, set to 0.
Figure 6.1.3.17-1: SP SRS Activation/Deactivation MAC CE
6.1.3.18	PUCCH spatial relation Activation/Deactivation MAC CE
The PUCCH spatial relation Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size of 24 bits with following fields:
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits;
-	BWP ID: This field indicates a UL BWP for which the MAC CE applies as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits;
-	PUCCH Resource ID: This field contains an identifier of the PUCCH resource ID identified by PUCCH-ResourceId as specified in TS 38.331 [5]. The length of the field is 7 bits;
-	Si: If there is a PUCCH Spatial Relation Info with PUCCH-SpatialRelationInfoId as specified in TS 38.331 [5], configured for the uplink bandwidth part indicated by BWP ID field, Si indicates the activation status of PUCCH Spatial Relation Info with PUCCH-SpatialRelationInfoId equal to i + 1, otherwise MAC entity shall ignore this field. The Si field is set to 1 to indicate PUCCH Spatial Relation Info with PUCCH-SpatialRelationInfoId equal to i + 1 shall be activated. The Si field is set to 0 to indicate PUCCH Spatial Relation Info with PUCCH-SpatialRelationInfoId equal to i + 1 shall be deactivated. Only a single PUCCH Spatial Relation Info can be active for a PUCCH Resource at a time;
-	R: Reserved bit, set to 0.
Figure 6.1.3.18-1: PUCCH spatial relation Activation/Deactivation MAC CE
6.1.3.19	SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE
The SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size of 16 bits with following fields:
-	A/D: This field indicates whether to activate or deactivate indicated SP ZP CSI-RS resource set. The field is set to 1 to indicate activation, otherwise it indicates deactivation;
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits;
-	BWP ID: This field indicates a DL BWP for which the MAC CE applies as the codepoint value of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits;
-	SP ZP CSI-RS resource set ID: This field contains an index of sp-ZP-CSI-RS-ResourceSetsToAddModList, as specified in TS 38.331 [5], indicating the Semi Persistent ZP CSI-RS resource set, which shall be activated or deactivated. The length of the field is 4 bits;
-	R: Reserved bit, set to 0.
Figure 6.1.3.19-1: SP ZP CSI-RS Resource Set Activation/Deactivation MAC CE
6.1.3.20	Recommended bit rate MAC CE
The Recommended bit rate MAC CE is identified by a MAC subheader with LCID as specified in Tables 6.2.1-1 and 6.2.1-2 for bit rate recommendation message from the gNB to the UE and bit rate recommendation query message from the UE to the gNB, respectively. It has a fixed size and consists of two octets defined as follows (Figure 6.1.3.20-1):
-	LCID: This field indicates the identity of the logical channel for which the recommended bit rate or the recommended bit rate query is applicable. The length of the field is 6 bits;
-	Uplink/Downlink (UL/DL): This field indicates whether the recommended bit rate or the recommended bit rate query applies to uplink or downlink. The length of the field is 1 bit. The UL/DL field set to 0 indicates downlink. The UL/DL field set to 1 indicates uplink;
-	Bit Rate: This field indicates an index to Table 6.1.3.20-1. The length of the field is 6 bits. For bit rate recommendation the value indicates the recommended bit rate. For bit rate recommendation query the value indicates the desired bit rate;
-	X: Bit rate multiplier. For UEs supporting recommended bit rate multiplier, when bitRateMultiplier is configured for the logical channel indicated by LCID field, X field set to "1" indicates the actual value of bit rate is the value corresponding to the index indicated by the Bit Rate field multiplied by bitRateMultiplier as specified in TS 38.331 [5].
-	R: reserved bit, set to 0.
Figure 6.1.3.20-1: Recommended bit rate MAC CE
Table 6.1.3.20-1: Values (kbit/s) for Bit Rate field
6.1.3.21	Timing Delta MAC CE
The Timing Delta MAC CE is identified by MAC subheader with LCID as specified in Table 6.2.1-1.
It has a fixed size and consists of two octets defined as follows (Figure 6.1.3.21-1):
-	R: Reserved bit, set to 0;
-	T_delta: This field indicates the index value of Tdelta (0, 1, 2… 1199) used to control the amount of timing adjustment that MAC entity indicates (as specified in TS 38.213 [6]). The length of the field is 11 bits.
Figure 6.1.3.21-1: Timing Delta MAC CE
6.1.3.22	Guard Symbols MAC CE
The Guard Symbols MAC CE is identified by the MAC subheader LCIDs as specified in Table 6.2.1-1 for DL-SCH and in Table 6.2.1-2 for UL-SCH.
It has fixed size and consists of four octets defined as follows (Figure 6.1.3.22-1):
-	R: Reserved bit, set to 0;
-	Sub-carrier spacing (SCS): This field indicates the subcarrier spacing used as reference for the guard spacing. The length of this field is 2bits. The values for the SCS field are shown in Table 6.1.3.22-2.
-	Number of Guard Symbols (NmbGSi): This field indicates the number of guard symbols for the switching scenario shown in Table 5.20-1. The number of guard symbols can take values within the range of 0..4. Higher values 5-7 are reserved.
Figure 6.1.3.22-1: Guard Symbol MAC CE
Table 6.1.3.22-2: Subcarrier spacing for Guard Symbols MAC CE
Editors Note: The cell information is not signalled explicitly i.e. it is not included in the Guard Symbol MAC CE. It is FFS whether the information received in the Guard Symbol MAC CE applies only to the cell on which it is received, or to the entire cell group (if configured).
6.1.3.23	BFR MAC CEs
The BFR MAC CEs consists of either:
-	SCell BFR MAC CE; or
-	Truncated SCell BFR MAC CE.
The BFR MAC CEs are identified by a MAC subheader with LCID as specified in Table 6.2.1-2.
BFR MAC CE has a variable size. It includes a bitmap and in ascending order based on the ServCellIndex, beam failure recovery information i.e. octets containing candidate beam availability indication (AC) for SCells indicated in the bitmap. A single octet bitmap is used when the highest ServCellIndex of this MAC entity's SCell configured with beam failure detection is less than 8, otherwise four octets are used.
The fields in the BFR MAC CEs are defined as follows:
-	Ci (SCell BFR MAC CE): This field indicates beam failure detection (as specified in clause 5.17) and the presence of an octet containing the AC field for the SCell with ServCellIndex i as specified in TS 38.331 [5]. If the Ci field set to 1, beam failure is detected and the octet containing the AC field is present for the SCell with ServCellIndex i. If the Ci field set to 0, the beam failure is not detected and octet containing the AC field is not present for the SCell with ServCellIndex i. The octets containing the AC field are present in ascending order based on the ServCellIndex;
-	Ci (Truncated SCell BFR MAC CE): This field indicates beam failure detection (as specified in clause 5.17) for the SCell with ServCellIndex i as specified in TS 38.331 [5]. If the Ci field set to 1, beam failure is detected and the octet containing the AC field for the SCell with ServCellIndex i may be present. If the Ci field set to 0, the beam failure is not detected and the octet containing the AC field is not present for the SCell with ServCellIndex i. The octets containing the AC field, if present, are incuded in ascending order based on the ServCellIndex. The number of octets containing the AC field included is maximised, while not exceeding the available grant size;
NOTE:	The number of the octets containing the AC field in the Truncated SCell BFR format can be zero.
-	AC: This field indicates the presence of the Candidate RS ID field in this octet. If at least one of the SSBs with SS-RSRP above rsrp-ThresholdBFR amongst the SSBs in candidateBeamRSSCellList or the CSI-RSs with CSI-RSRP above rsrp-ThresholdBFR amongst the CSI-RSs in candidateBeamRSSCellList is available, the AC field is set to 1; otherwise, it is set to 0. If the AC field set to 1, the Candidate RS ID field is present. If the AC field set to 0, R bits are present instead;
-	Candidate RS ID: This field is set to the index of an SSB with SS-RSRP above rsrp-ThresholdBFR amongst the SSBs in candidateBeamRSSCellList or to the index of a CSI-RS with CSI-RSRP above rsrp-ThresholdBFR amongst the CSI-RSs in candidateBeamRSSCellList. The length of this field is 6 bits.
-	R: Reserved bit, set to 0.
Figure 6.1.3.23-1: SCell BFR and Truncated SCell BFR MAC CE with the highest ServCellIndex of this MAC entity's SCell configured with BFD is less than 8
Figure 6.1.3.23-2: SCell BFR and Truncated SCell BFR MAC CE with the highest ServCellIndex of this MAC entity's SCell configured with BFD is equal to or higher than 8
6.1.3.24	Enhanced TCI States Activation/Deactivation for UE-specific PDSCH MAC CE
The Enhanced TCI States Activation/Deactivation for UE-specific PDSCH MAC CE is identified by a MAC PDU subheader with LCID as specified in Table 6.2.1-1. It has a variable size consisting of following fields:
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits;
-	BWP ID: This field indicates a DL BWP for which the MAC CE applies as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits;
-	Ci: This field indicates whether the octet containing TCI state IDi,2 is present. If this field is set to "1", the octet containing TCI state IDi,2 is present. If this field is set to "0", the octet containing TCI state IDi,2 is not present;
-	TCI state IDi,j: This field indicates the TCI state identified by TCI-StateId as specified in TS 38.331 [5], where i is the index of the codepoint of the DCI Transmission configuration indication field as specified in TS 38.212 [9] and TCI state IDi,j denotes the jth TCI state indicated for the ith codepoint in the DCI Transmission Configuration Indication field. The TCI codepoint to which the TCI States are mapped is determined by its ordinal position among all the TCI codepoints with sets of TCI state IDi,j fields, i.e. the first TCI codepoint with TCI state ID0,1 and TCI state ID0,2 shall be mapped to the codepoint value 0, the second TCI codepoint with TCI state ID1,1 and TCI state ID1,2 shall be mapped to the codepoint value 1 and so on. The TCI state IDi,2 is optional based on the indication of the Ci field. The maximum number of activated TCI codepoint is 8 and the maximum number of TCI states mapped to a TCI codepoint is 2.
-	R: Reserved bit, set to "0".
Figure 6.1.3.24-1: Enhanced TCI States Activation/Deactivation for UE-specific PDSCH MAC CE
6.1.3.25	Enhanced PUCCH spatial relation Activation/Deactivation MAC CE
The Enhanced PUCCH spatial relation Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a variable size with following fields:
-	Serving Cell ID: This field indicates the identity of the Serving Cell for which the MAC CE applies. The length of the field is 5 bits;
-	BWP ID: This field indicates a UL BWP for which the MAC CE applies as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9]. The length of the BWP ID field is 2 bits;
-	PUCCH Resource ID: This field contains an identifier of the PUCCH resource ID identified by PUCCH-ResourceId as specified in TS 38.331 [5]. The length of the field is 7 bits. If the indicated PUCCH Resource is configured as part of a PUCCH Group as specified in TS 38.331 [5], no other PUCCH Resources within the same PUCCH group are indicated in the MAC CE, and this MAC CE applies to all the PUCCH Resources in the PUCCH group
-	Spatial Relation Info ID: This field contains an identifier of the PUCCH Spatial Relation Info ID identified by PUCCH-SpatialRelationInfoId as specified in TS 38.331 [5]. The length of the field is 6 bits;
-	R: Reserved bit, set to 0.
Figure 6.1.3.25-1: Enhanced PUCCH spatial relation Activation/Deactivation MAC CE
Editor's note: Whether to allow multiple PUCCH resources in a MAC CE.
6.1.3.26	AP SRS spatial relation Indication MAC CE
The AP SRS spatial relation Indication MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a variable size with following fields:
-	SRS Resource Set's Cell ID: This field indicates the identity of the Serving Cell, which contains the indicated AP SRS Resource Set. If the C field is set to 0, this field also indicates the identity of the Serving Cell which contains all resources indicated by the Resource IDi fields. The length of the field is 5 bits;
-	SRS Resource Set's BWP ID: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], which contains the indicated AP SRS Resource Set. If the C field is set to 0, this field also indicates the identity of the BWP which contains all resources indicated by the Resource IDi fields. The length of the field is 2 bits;
-	C: This field indicates whether the octets containing Resource Serving Cell ID field(s) and Resource BWP ID field(s) are present. If this field is set to 1, the octets containing Resource Serving Cell ID field(s) and Resource BWP ID field(s) are present, otherwise they are not present;
-	SUL: This field indicates whether the MAC CE applies to the NUL carrier or SUL carrier configuration. This field is set to 1 to indicate that it applies to the SUL carrier configuration, and it is set to 0 to indicate that it applies to the NUL carrier configuration;
-	AP SRS Resource Set ID: This field indicates the AP SRS Resource Set ID identified by SRS-ResourceSetId as specified in TS 38.331 [5]. The length of the field is 4 bits;
-	Fi: This field indicates the type of a resource used as a spatial relationship for SRS resource within AP SRS Resource Set indicated with AP SRS Resource Set ID field. F0 refers to the first SRS resource within the resource set, F1 to the second one and so on. The field is set to 1 to indicate NZP CSI-RS resource index is used, and it is set to 0 to indicate either SSB index or SRS resource index is used. The length of the field is 1 bit. This field is only present if MAC CE is used for activation, i.e. the A/D field is set to 1;
-	Resource IDi: This field contains an identifier of the resource used for spatial relationship derivation for SRS resource i. Resource ID0 refers to the first SRS resource within the resource set, Resource ID1 to the second one and so on. If Fi is set to 0, and the first bit of this field is set to 1, the remainder of this field contains SSB-Index as specified in TS 38.331 [5]. If Fi is set to 0, and the first bit of this field is set to 0, the remainder of this field contains SRS-ResourceId as specified in TS 38.331 [5]. The length of the field is 7 bits.
-	Resource Serving Cell IDi: This field indicates the identity of the Serving Cell on which the resource used for spatial relationship derivation for SRS resource i is located. The length of the field is 5 bits;
-	Resource BWP IDi: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], on which the resource used for spatial relationship derivation for SRS resource i is located. The length of the field is 2 bits;
-	R: Reserved bit, set to 0.
Figure 6.1.3.26-1: AP SRS spatial relation Indication MAC CE
6.1.3.27	SRS Pathloss Reference RS Activation/Deactivation MAC CE
The SRS Pathloss Reference RS Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size of 24 bits:
-	Serving Cell ID: This field indicates the identity of the Serving Cell, which contains activated SRS Resource Set. The length of the field is 5 bits;
-	BWP ID: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], which contains activated SRS Resource Set. The length of the field is 2 bits;
-	SRS Resource Set ID: This field indicates the SRS Resource Set ID identified by SRS-ResourceSetId as specified in TS 38.331 [5]. The length of the field is 4 bits;
-	Pathloss reference RS ID: This field indicates the SRS Resource Set ID identified by pathlossReferenceRS as specified in TS 38.331 [5]. The length of the field is 6 bits;
-	R: Reserved bit, set to 0.
Figure 6.1.3.27-1: SRS Pathloss Reference RS Activation/Deactivation MAC CE
6.1.3.28	PUSCH Pathloss Reference RS Activation/Deactivation MAC CE
The PUSCH Pathloss Reference RS Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size of 24 bits:
-	Serving Cell ID: This field indicates the identity of the Serving Cell, which contains activated/deactivated SRS Resource Set. The length of the field is 5 bits;
-	BWP ID: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], which contains activated/deactivated SRS Resource Set. The length of the field is 2 bits;
-	SRI ID : This field indicates the SRI PUSCH power control ID identified by sri-PUSCH-PowerControlId as specified in TS 38.331 [5]. The length of the field is 4 bits;
-	PUSCH Pathloss Reference RS ID: This field indicates the PUSCH Pathloss Reference RS ID identified by PUSCH-PathlossReferenceRS-Id as specified in TS 38.331 [5], which is to be activated/deactivated. The length of the field is 6 bits;
-	R: Reserved bit, set to 0.
Figure 6.1.3.28-1: PUSCH Pathloss Reference RS Activation/Deactivation MAC CE
6.1.3.29	CC list-based SRS Activation/Deactivation MAC CE
The CC list-based SRS Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1.
Figure 6.1.3.29-1: CC list-based SRS Activation/Deactivation MAC CE
Editor's note: The format is TBD after RAN1 reply the LS. If RAN1 reply will say this MAC CE is activated per SRS resource set, we can reuse the single CC MAC CEs.
6.1.3.30	LBT failure MAC CE
The LBT failure MAC CE of one octet is identified by a MAC subheader with LCID as specified in Table 6.2.1-2. It has a fixed size and consists of a single octet containing 8 C-fields as follows (Figure 6.1.3.30-1):
The LBT failure MAC CE of four octets is identified by a MAC subheader with LCID as specified in Table 6.2.1-2. It has a fixed size and consists of four octets containing 32 C-fields as follows (Figure 6.1.3.30-2):
-	Ci: If there is a Serving Cell configured for the MAC entity with ServCellIndex i as specified in TS 38.331 [5] and if consistent LBT failure have been triggered and not cancelled in this Serving Cell, the field is set to 1, otherwise the field is set to 0.
Figure 6.1.3.30-1: LBT failure MAC CE of one octet
Figure 6.1.3.30-2: LBT failure MAC CE of four octets
6.1.3.31	Multiple Entry Configured Grant Confirmation MAC CE
The Multiple Entry Configured Grant Confirmation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-2. It has a fixed size and consists of a four octets containing 32 CG-fields. The Multiple Entry Configured Grant Confirmation MAC CE is defined as follows (Figure 6.1.3.31-1).
-	CGi: This field indicates whether PDCCH indicating activation or deactivation of configured uplink grant with ConfiguredGrantConfigIndexMAC i has been received. The CGi field is set to 1 to indicate that PDCCH indicating activation or deactivation of type 2 configured uplink grant with ConfiguredGrantConfigIndexMAC i has been received. The CGi field is set to 0 to indicate that PDCCH indicating activation or deactivation of type 2 configured uplink grant with ConfiguredGrantConfigIndexMAC i has not been received.
Figure 6.1.3.31-1: Multiple Entry Configured Grant Confirmation MAC CE
6.1.3.32	Duplication RLC Activation/Deactivation MAC CE
The Duplication RLC Activation/Deactivation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-1. It has a fixed size and consists of a single octet defined as follows (Figure 6.1.3.32-1).
-	DRB ID: This field indicates the identity of DRB for which the MAC CE applies. The length of the field is 5 bits;
-	RLCi: This field indicates the activation/deactivation status of PDCP duplication for the RLC entity i where i is ascending order of logical channel ID of secondary RLC entities in the order of MCG and SCG, for the DRB. The RLCi field is set to 1 to indicate that the PDCP duplication for the RLC entity i shall be activated. The RLCi field is set to 0 to indicate that the PDCP duplication for the RLC entity i shall be deactivated.
Figure 6.1.3.32-1: Duplication RLC Activation/Deactivation MAC CE
Editor's Note: It is assumed that index i for RLCi field is determined by ascending order of logical channel ID of secondary RLC entities in MCG and SCG. But it may need a confirmation.
6.1.3.33	Sidelink Buffer Status Report MAC CEs
Sidelink Buffer Status Report (SL-BSR) MAC CEs consist of either:
-	SL-BSR format (variable size); or
-	Truncated SL-BSR format (variable size).
SL-BSR and Truncated SL-BSR MAC control elements consist of one Destination Index field, one LCG ID field and one corresponding Buffer Size field per reported target group.
The SL-BSR formats are identified by MAC subheaders with LCIDs as specified in in Table 6.2.1-2.
The fields in the SL-BSR MAC CE are defined as follows:
-	Destination Index: The Destination Index field identifies the destination. The length of this field is 5 bits. The value is set to one index among index(es) associated to same destination reported in [v2x-DestinationInfoList]. If multiple such lists are reported, the value is indexed sequentially across all the lists in the same order as specified in TS 38.331 [5];
-	LCG ID: The Logical Channel Group ID field identifies the group of logical channel(s) whose SL buffer status is being reported. The length of the field is 3 bits;
-	Buffer Size: The Buffer Size field identifies the total amount of data available according to the SL data volume calculation procedure in TSs 38.322 [3] and 38.323 [4] across all logical channels of a logical channel group of a destination after the MAC PDU has been built (i.e. after the logical channel prioritization procedure, which may result the value of the Buffer Size field to zero). The amount of data is indicated in number of bytes. The size of the RLC and MAC headers are not considered in the buffer size computation. The length of this field is 8 bits. The values for the Buffer Size field are shown in Table 6.1.3.1-2, respectively. For the SL-BSR format and the Truncated SL-BSR format, the Buffer Size fields are included in ascending order based on the LCGi. For the Truncated SL-BSR format the number of Buffer Size fields included is maximised, while not exceeding the number of padding bits.
NOTE:	The number of the Buffer Size fields in the SL-BSR and Truncated SL-BSR format can be zero.
Figure 6.1.3.33-1: SL-BSR and Truncated SL-BSR MAC control element
6.1.3.34	Sidelink Configured Grant Confirmation MAC CE
The Sidelink Configured Grant Confirmation MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.1-2. The Sidelink Configured Grant Confirmation MAC CE is defined as follows (Figure 6.1.3.34-1):
-	Ci: If there is a configured grant Type 2 with sl-ConfigIndexCG i configured for the MAC entity as specified in TS 38.331 [5], this field indicates the confirmation to activation/deactivation of the configured grant with sl-ConfigIndexCG i, else the MAC entity shall ignore the Ci field. The Ci field is set to 1 to confirm that the configured grant with sl-ConfigIndexCG i shall be activated. The Ci field is set to 0 to indicate that the configured grant with sl-ConfigIndexCG i shall be deactivated;
-	R: Reserved bit, set to 0.
Figure 6.1.3.34-1: Sidelink Configured Grant Confirmation MAC CE
6.1.3.35	Sidelink CSI Reporting MAC CE
The Sidelink CSI Reporting MAC CE is identified by a MAC subheader with LCID as specified in Table 6.2.4-1. The priority of the Sidelink CSI Reporting MAC CE is fixed to '1'. The Sidelink CSI Reporting MAC CE is defined as follows (Figure 6.1.3.35-1):
-	RI: This field indicates the derived value of the Rank Indicator for sidelink CSI reporting as specified in clause 8.5 of TS 38.214 [7]. The length of the field is 1 bit;
-	CQI: This field indicates the derived value of the Channel Quality Indicator for sidelink CSI reporting as specified in clause 8.5 of TS 38.214 [7]. The length of the field is 4 bit;
-	R: Reserved bit, set to 0.
Figure 6.1.3.35-1: Sidelink CSI Reporting MAC CE
6.1.3.36	SP Positioning SRS Activation/Deactivation MAC CE
The SP Positioning SRS Activation/Deactivation MAC CE is identified by a MAC subheader with LCID and eLCID as specified in Table 6.2.1-1. It has a variable size with following fields:
-	A/D: This field indicates whether to activate or deactivate indicated SP Positioning SRS resource set. The field is set to 1 to indicate activation, otherwise it indicates deactivation;
-	Positioning SRS Resource Set's Cell ID: This field indicates the identity of the Serving Cell, which contains activated/deactivated SP Positioning SRS Resource Set. If the C field is set to 0, this field also indicates the identity of the Serving Cell which contains all resources indicated by the Spatial Relation for Resource IDi fields, if present. The length of the field is 5 bits;
-	Positioning SRS Resource Set's BWP ID: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], which contains activated/deactivated SP Positioning SRS Resource Set. If the C field is set to 0, this field also indicates the identity of the BWP which contains all resources indicated by the Spatial Relation for Resource IDi fields, if present. The length of the field is 2 bits;
-	C: This field indicates whether the octets containing Resource Serving Cell ID field(s) and Resource BWP ID field(s) withn the field Spatial Relation for Resource ID i are present, except for Spatial Relation Resource IDi with DL-PRS or SSB. When A/D is set to 1, if this field is set to 1, the octets containing Resource Serving Cell ID field(s) and Resource BWP ID field(s) in the field Spatial Relation for Resource IDi are present, otherwise they are not present. When A/D is set to 0, this field is always set to 0 that they are not present;
-	SUL: This field indicates whether the MAC CE applies to the NUL carrier or SUL carrier configuration. This field is set to 1 to indicate that it applies to the SUL carrier configuration, and it is set to 0 to indicate that it applies to the NUL carrier configuration;
-	Positoining SRS Resource Set ID: This field indicates the SP Positioning SRS Resource Set identified by SRS-PosResourceSetId as specified in TS 38.331 [5], which is to be activated or deactivated. The length of the field is 4 bits;
-	Spatial Relation for Resource IDi: The field Spatial Relation for Resource IDi is only present if MAC CE is used for activation, i.e. the A/D field is set to 1. M is the total number of Positioning SRS resource(s) configured under the SP Positioning SRS resource set indicated by the field Positioning SRS Resource Set ID. There are 4 types of Spatial Relation for Resource IDi, which is indicated by the F (F0 and F1) field within. The fields within Spatial Relation for Resource IDi are shown in Figures 6.1.3.36-2 to 6.1.3.36-5 for the 4 types of Spatial Relations for Resource IDi;
-	R: Reserved bit, set to 0.
Figure 6.1.3.36-1: SP Positioning SRS Activation/Deactivation MAC CE
Figure 6.1.3.36-2: Spatial Relation for Resource IDi with NZP CSI-RS
Figure 6.1.3.36-3: Spatial Relation for Resource IDi with SSB
Figure 6.1.3.36-4: Spatial Relation for Resource IDi with SRS
Figure 6.1.3.36-5: Spatial Relation for Resource IDi with DL-PRS
The field Spatial Relation for Resource IDi consists of the following fields:
-	F0: This field indicates the type of a resource used as a spatial relation for the ith Positioning SRS resource within the Positioning SRS Resource Set indicated with the field Positioning SRS Resource Set ID. The field is set to 00 to indicate NZP CSI-RS resource index is used; it is set to 01 to indicate SSB index is used; it is set to 10 to indicate SRS resource index is used; it is set to 11 to indicate DL-PRS index is used. The length of the field is 2 bits;
-	F1: This field indicates the type of SRS resource used as spatial relation for the ith Positioning SRS resource within the SP Positioning SRS Resource Set indicated with the field Positioning SRS Resource Set ID when F0 is set to 10. The field is set to 0 to indicate SRS resource index SRS-ResourceId as defined in TS 38.331 [5] is used; the field is set to 1 to indicate Positioning SRS resource index SRS-PosResourceId as defined in TS 38.331 [5] is used;
-	NZP CSI-RS Resource ID: This field contains an index of NZP-CSI-RS-ResourceID, as specified in TS 38.331 [5], indicating the NZP CSI-RS resource, which is used to derive the spatial relation for the positioning SRS. The length of the field is 8 bits;
-	SSB index: This field contains an index of SSB SSB-Index as specified in TS 38.331 [5] and/or TS 37.355 [23]. The length of the field is 6 bits;
-	PCI: This field contains physical cell identity PhysCellId as specified in TS 38.331 [5] and/or TS 37.355 [23]. The length of the field is 10 bits;
-	SRS resource ID: When F1 is set to 0, the field indicates an index for SRS resource SRS-ResourceId as defined in TS 38.331 [5]; When F1 is set to 1, the field indicates an index for Positioning SRS resource SRS-PosResourceId as defined in TS 38.331 [5]. The length of the field is 5 bits;
-	DL-PRS Resource Set ID: This field contains an index for DL-PRS Resource Set nr-DL-PRS-ResourceSetId as defined in TS 37.355 [23]. The length of the field is 3 bits;
-	DL-PRS Resource ID: This field contains an index for DL-PRS resource nr-DL-PRS-Resource ID as defined in TS 37.355 [23]. The length of the field is 6 bits;
-	DL-PRS ID: This field contains an identity for DL-PRS resource dl-PRS-ID as defined in TS 37.355 [23]. The length of the field is 8 bits;
-	Resource Serving Cell IDi: This field indicates the identity of the Serving Cell on which the resource used for spatial relationship derivation for the ith Positioning SRS resource is located. The length of the field is 5 bits;
-	Resource BWP IDi: This field indicates a UL BWP as the codepoint of the DCI bandwidth part indicator field as specified in TS 38.212 [9], on which the resource used for spatial relationship derivation for the ith Positioning SRS resource is located. The length of the field is 2 bits.
6.1.4	MAC PDU (transparent MAC)
A MAC PDU consists solely of a MAC SDU whose size is aligned to a TB; as described in Figure 6.1.4-1. This MAC PDU is used for transmissions on PCH, BCH, DL-SCH including BCCH, and SL-BCH.
Figure 6.1.4-1: Example of MAC PDU (transparent MAC)
6.1.5	MAC PDU (Random Access Response)
A MAC PDU consists of one or more MAC subPDUs and optionally padding. Each MAC subPDU consists one of the following:
-	a MAC subheader with Backoff Indicator only;
-	a MAC subheader with RAPID only (i.e. acknowledgment for SI request);
-	a MAC subheader with RAPID and MAC RAR.
A MAC subheader with Backoff Indicator consists of five header fields E/T/R/R/BI as described in Figure 6.1.5-1. A MAC subPDU with Backoff Indicator only is placed at the beginning of the MAC PDU, if included. 'MAC subPDU(s) with RAPID only' and 'MAC subPDU(s) with RAPID and MAC RAR' can be placed anywhere between MAC subPDU with Backoff Indicator only (if any) and padding (if any).
A MAC subheader with RAPID consists of three header fields E/T/RAPID as described in Figure 6.1.5-2.
Padding is placed at the end of the MAC PDU if present. Presence and length of padding is implicit based on TB size, size of MAC subPDU(s).
Figure 6.1.5-1: E/T/R/R/BI MAC subheader
Figure 6.1.5-2: E/T/RAPID MAC subheader
Figure 6.1.5-3: Example of MAC PDU consisting of MAC RARs
6.1.5a	MAC PDU (MSGB)
A MAC PDU consists of one or more MAC subPDUs and optionally padding. Each MAC subPDU consists one of the following:
-	a MAC subheader with Backoff Indicator only;
-	a MAC subheader and fallbackRAR;
-	a MAC subheader and successRAR;
-	a MAC subheader and MAC SDU for CCCH or DCCH;
-	a MAC subheader and padding.
A MAC subheader with Backoff Indicator consists of five header fields E/T1/T2/R/BI as described in Figure 6.1.5a-1. A MAC subPDU with Backoff Indicator only is placed at the beginning of the MAC PDU, if included.
A MAC subheader for fallbackRAR consists of three header fields E/T1/RAPID as described in Figure 6.1.5a-2. A MAC subheader for successRAR consists of eight header fields E/T1/T2/S/R/R/R/R as described in Figure 6.1.5a-3. A MAC subheader for MAC SDU consists of the four header fields R/F/LCID/L as described in Figure 6.1.2-1 and Figure 6.1.2-2.
At most one 'MAC subPDU for success RAR' indicating presence of 'MAC subPDU(s) for MAC SDU' is included in a MAC PDU. MAC subPDU(s) for MAC SDU are placed immediately after the 'MAC subPDU for success RAR' indicating presence of 'MAC subPDU(s) for MAC SDU'.
If MAC PDU includes MAC subPDU(s) for MAC SDU, the last MAC subPDU for MAC SDU is placed before MAC subPDU with padding as depicted in Figure 6.1.5a-4. Otherwise, the last MAC subPDU in MAC PDU is placed before padding as depicted in Figure 6.1.5a-5. The MAC subPDU with padding includes R/R/LCID MAC subheader as described in Figure 6.1.2-3 and padding. The size of padding in the MAC subPDU with padding can be zero. The length of padding is implicit based on TB size, size of MAC subPDU(s).
Figure 6.1.5a-1: BI MAC subheader
Figure 6.1.5a-2: FallbackRAR MAC subheader
Figure 6.1.5a-3: SuccessRAR MAC subheader
Figure 6.1.5a-4: Example of a MSGB MAC PDU with MAC SDU(s)
Figure 6.1.5a-5: Example of a MSGB MAC PDU without MAC SDU(s)
6.1.6	MAC PDU (SL-SCH)
A MAC PDU consists of one SL-SCH subheader and one or more MAC subPDUs. Each MAC subPDU consists of one of the following:
-	A MAC subheader only (including padding);
-	A MAC subheader and a MAC SDU;
-	A MAC subheader and a MAC CE;
-	A MAC subheader and padding.
The MAC SDUs are of variable sizes.
Each MAC subheader except SL-SCH subheader corresponds to either a MAC SDU, a MAC CE, or padding.
The SL-SCH subheader is of a fixed size and consists of the seven header fields [V/R/R/R/R/SRC/DST].
Figure 6.1.6-1: SL-SCH MAC subheader
A MAC subheader except for padding consists of the four header fields R/F/LCID/L as depicted in Figure 6.1.2-1 (with 8-bit L field) and Figure 6.1.2-2 (with 16-bit L field). A MAC subheader for MAC CE and padding consists of the two header fields R/LCID as depicted in Figure 6.1.2-3.
SL MAC subPDU(s) with MAC SDU(s) is placed after the SL-SCH subheader and before the MAC subPDU with a MAC CE and the MAC subPDU with padding in the MAC PDU as depicted in Figure 6.1.6-2. SL MAC subPDU with a MAC CE is placed after all the MAC subPDU(s) with MAC SDU and before the MAC subPDU with padding in the MAC PDU as depicted in Figure 6.1.6-2. The size of padding can be zero.
 
Figure 6.1.6-2: Example of a SL MAC PDU
A maximum of one MAC PDU can be transmitted per TB per MAC entity.
6.2	Formats and parameters
6.2.1	MAC subheader for DL-SCH and UL-SCH
The MAC subheader consists of the following fields:
-	LCID: The Logical Channel ID field identifies the logical channel instance of the corresponding MAC SDU or the type of the corresponding MAC CE or padding as described in Tables 6.2.1-1 and 6.2.1-2 for the DL-SCH and UL-SCH respectively. There is one LCID field per MAC subheader. The LCID field size is 6 bits. If the LCID field is set to 34, one additional octet is present in the MAC subheader containing the eLCID field and follow the octet containing LCID field. If the LCID field is set to 33, two additional octets are present in the MAC subheader containing the eLCID field and these two additional octets follow the octet containing LCID field;
-	eLCID: The extended Logical Channel ID field identifies the logical channel instance of the corresponding MAC SDU as described in tables 6.2.1-1a, 6.2.1-1b, 6.2.1-2a and 6.2.1-2b for the DL-SCH and UL-SCH respectively. The size of the eLCID field is either 8 bits or 16 bits.
NOTE 1:	The extended Logical Channel ID space using two-octet eLCID and the relevant MAC subheader format is used, only when configured, on the NR backhaul links between IAB nodes or between IAB node and IAB Donor.
-	L: The Length field indicates the length of the corresponding MAC SDU or variable-sized MAC CE in bytes. There is one L field per MAC subheader except for subheaders corresponding to fixed-sized MAC CEs, padding, and MAC SDUs containing UL CCCH. The size of the L field is indicated by the F field;
-	F: The Format field indicates the size of the Length field. There is one F field per MAC subheader except for subheaders corresponding to fixed-sized MAC CEs, padding, and MAC SDUs containing UL CCCH. The size of the F field is 1 bit. The value 0 indicates 8 bits of the Length field. The value 1 indicates 16 bits of the Length field;
-	R: Reserved bit, set to 0.
The MAC subheader is octet aligned.
Table 6.2.1-1 Values of LCID for DL-SCH
Table 6.2.1-1a Values of two-octet eLCID for DL-SCH
Table 6.2.1-1b Values of one-octet eLCID for DL-SCH
Table 6.2.1-2 Values of LCID for UL-SCH
Table 6.2.1-2a Values of two-octet eLCID for UL-SCH
Table 6.2.1-2b Values of one-octet eLCID for UL-SCH
NOTE 2:	For the eLCID space, the 16-bit codepoint 000…00 (all zeros) corresponds to the index value of 320, while the 16-bit codepoint 111…11 (all ones) corresponds to the index value of 216 + 319.
6.2.2	MAC subheader for Random Access Response
The MAC subheader consists of the following fields:
-	E: The Extension field is a flag indicating if the MAC subPDU including this MAC subheader is the last MAC subPDU or not in the MAC PDU. The E field is set to "1" to indicate at least another MAC subPDU follows. The E field is set to "0" to indicate that the MAC subPDU including this MAC subheader is the last MAC subPDU in the MAC PDU;
-	T: The Type field is a flag indicating whether the MAC subheader contains a Random Access Preamble ID or a Backoff Indicator. The T field is set to "0" to indicate the presence of a Backoff Indicator field in the subheader (BI). The T field is set to "1" to indicate the presence of a Random Access Preamble ID field in the subheader (RAPID);
-	R: Reserved bit, set to "0";
-	BI: The Backoff Indicator field identifies the overload condition in the cell. The size of the BI field is 4 bits;
-	RAPID: The Random Access Preamble IDentifier field identifies the transmitted Random Access Preamble (see clause 5.1.3). The size of the RAPID field is 6 bits. If the RAPID in the MAC subheader of a MAC subPDU corresponds to one of the Random Access Preambles configured for SI request, MAC RAR is not included in the MAC subPDU.
The MAC subheader is octet aligned.
6.2.2a	MAC subheader for MSGB
The MAC subheader consists of the following fields:
-	E: The Extension field is a flag indicating if the MAC subPDU including this MAC subheader is the last MAC subPDU (other than MAC subPDU for MAC SDU) or not in the MAC PDU. The E field is set to "1" to indicate at least another MAC subPDU (other than MAC subPDU for MAC SDU) follows. The E field is set to "0" to indicate that the MAC subPDU including this MAC subheader is the last MAC subPDU (other than MAC subPDU for MAC SDU) in the MAC PDU;
-	T1: The T1 field is a flag indicating whether the MAC subheader contains a Random Access Preamble ID or T2. The T1 field is set to "1" to indicate the presence of a Random Access Preamble ID field in the subheader (RAPID). The T1 field is set to "0" to indicate the presence of T2 field in the subheader;
-	T2: The T2 field is a flag indicating whether the MAC subheader contains a Backoff Indicator (BI) or a MAC SDU indicator (S). The T2 field is set to "0" to indicate the presence of a Backoff Indicator field in the subheader. The T2 field is set to "1" to indicate the presence of the S field in the subheader;
-	S: This field indicates whether 'MAC subPDU(s) for MAC SDU' follow the MAC subPDU including this MAC subheader or not; The S field is set to "1" to indicate presence of 'MAC subPDU(s) for MAC SDU'. The S field is set to "0" to indicate absence of 'MAC subPDU(s) for MAC SDU';
-	R: Reserved bit, set to "0";
-	BI: The Backoff Indicator field identifies the overload condition in the cell. The size of the BI field is 4 bits;
-	RAPID: The Random Access Preamble IDentifier field identifies the transmitted Random Access Preamble (see clause 5.1.3). The size of the RAPID field is 6 bits.
The MAC subheader is octet aligned.
6.2.3	MAC payload for Random Access Response
The MAC RAR is of fixed size as depicted in Figure 6.2.3-1, and consists of the following fields:
-	R: Reserved bit, set to "0";
-	Timing Advance Command: The Timing Advance Command field indicates the index value TA used to control the amount of timing adjustment that the MAC entity has to apply in TS 38.213 [6]. The size of the Timing Advance Command field is 12 bits;
-	UL Grant: The Uplink Grant field indicates the resources to be used on the uplink in TS 38.213 [6]. The size of the UL Grant field is 27 bits;
-	Temporary C-RNTI: The Temporary C-RNTI field indicates the temporary identity that is used by the MAC entity during Random Access. The size of the Temporary C-RNTI field is 16 bits.
The MAC RAR is octet aligned.
Figure 6.2.3-1: MAC RAR
6.2.3a	MAC payload for MSGB
The fallbackRAR is of fixed size as depicted in Figure 6.2.3a-1, and consists of the following fields:
-	R: Reserved bit, set to "0";
-	Timing Advance Command: The Timing Advance Command field indicates the index value TA used to control the amount of timing adjustment that the MAC entity has to apply in TS 38.213 [6]. The size of the Timing Advance Command field is 12 bits;
-	UL Grant: The Uplink Grant field indicates the resources to be used on the uplink in TS 38.213 [6]. The size of the UL Grant field is 27 bits;
-	Temporary C-RNTI: The Temporary C-RNTI field indicates the temporary identity that is used by the MAC entity during Random Access. The size of the Temporary C-RNTI field is 16 bits.
The fallbackRAR is octet aligned.
Figure 6.2.3a-1: fallbackRAR
The successRAR is of fixed size as depicted in Figure 6.2.3a-2, and consists of the following fields:
-	UE Contention Resolution Identity: This field contains the UL CCCH SDU. If the UL CCCH SDU is longer than 48 bits, this field contains the first 48 bits of the UL CCCH SDU.
-	R: Reserved bit, set to "0";
-	TPC: The TPC command for the PUCCH resource containing HARQ feedback for MSGB, as specified in TS 38.213 [6]. The size of the TPC field is 2 bits;
-	HARQ Feedback Timing Indicator: The PDSCH-to-HARQ feedback timing indicator field for MSGB HARQ feedback as specified in 38.213 [6]. The size of the HARQ Feedback Timing Indicator field is 3 bits;
-	PUCCH Resource Indicator: The PUCCH resource indicator for HARQ feedback for MSGB, as specified in TS 38.213[6]. The size of the PUCCH resource Indicator field is 4 bits;
-	Timing Advance Command: The Timing Advance Command field indicates the index value TA used to control the amount of timing adjustment that the MAC entity has to apply in TS 38.213 [6]. The size of the Timing Advance Command field is 12 bits;
-	C-RNTI: The C-RNTI field indicates the identity that is used by the MAC entity upon completion of Random Access. The size of the C-RNTI field is 16 bits.
The successRAR is octet aligned.
Figure 6.2.3a-2: successRAR
6.2.4	MAC subheader for SL-SCH
The MAC subheader consists of the following fields:
-	V: The MAC PDU format version number field indicates which version of the SL-SCH subheader is used. The V field size is 4 bits;]
-	SRC: The SRC field carries the 16 most significant bits of the Source Layer-2 ID field set to the identifier provided by upper layers as defined in TS 23.287 [19]. The length of the field is 16 bits;
-	DST: The DST field carries the 8 most significant bits of the Destination Layer-2 ID set to the identifier provided by upper layers as defined in TS 23.287 [19]. [If the V field is set to "1", this identifier is a unicast identifier. If the V field is set to "2", this identifier is a groupcast identifier. If the V field is set to "3", this identifier is a broadcast identifier. The length of the field is 8 bits;
-	LCID: The Logical Channel ID field identifies the logical channel instance or the type of the corresponding MAC CE within the scope of one Source Layer-2 ID and Destination Layer-2 ID pair of the corresponding MAC SDU or padding as described in Tables 6.2.4-1 for SL-SCH. There is one LCID field per MAC subheader except for SL-SCH subheader. The LCID field size is 6 bits;
-	L: The Length field indicates the length of the corresponding MAC SDU in bytes. There is one L field per MAC subheader except for subheaders corresponding to the SL-SCH subheader or padding. The size of the L field is indicated by the F field;
-	F: The Format field indicates the size of the Length field. There is one F field per MAC subheader except for subheaders corresponding to the SL-SCH subheader or padding. The size of the F field is 1 bit. The value 0 indicates 8 bits of the Length field. The value 1 indicates 16 bits of the Length field;
-	R: Reserved bit, set to 0.
The MAC subheader is octet aligned.
Table 6.2.4-1 Values of LCID for SL-SCH
7	Variables and constants
7.1	RNTI values
RNTI values are presented in Table 7.1-1.
Table 7.1-1: RNTI values.
Table 7.1-2: RNTI usage.
7.2	Backoff Parameter values
Backoff Parameter values are presented in Table 7.2-1.
Table 7.2-1: Backoff Parameter values.
7.3	DELTA_PREAMBLE values
The DELTA_PREAMBLE preamble format based power offset values are presented in Tables 7.3-1 and 7.3-2.
Table 7.3-1: DELTA_PREAMBLE values for long preamble formats.
Table 7.3-2: DELTA_PREAMBLE values for short preamble formats.
where μ is the sub-carrier spacing configuration determined by msg1-SubcarrierSpacing and Table 4.2-1 in TS 38.211 [8], and the preamble formats are given by prach-ConfigurationIndex and Tables 6.3.3.2-2 and 6.3.3.2-3 in TS 38.211 [8].
7.4	PRACH Mask Index values
Table 7.4-1: PRACH Mask Index values
Annex A (informative):
Change history