---
title: "Training Dataset: 36104-g00"
type: source
source_file: "36104-g00.txt"
category: "01_RAN_L2_L3"
tags: ["3gpp", "dataset", "training", "01_ran_l2_l3"]
---
3GPP TS 36.104 V16.0.0 (2018-12)
Technical Specification
3rd Generation Partnership Project;
Technical Specification Group Radio Access Network;
Evolved Universal Terrestrial Radio Access (E-UTRA);
Base Station (BS) radio transmission and reception
(Release 16)
	
The present document has been developed within the 3rd Generation Partnership Project (3GPP TM) and may be further elaborated for the purposes of 3GPP.
The present document has not been subject to any approval process by the 3GPP Organizational Partners and shall not be implemented.	
This Specification is provided for future development work within 3GPP only. The Organizational Partners accept no liability for any use of this Specification.
Specifications and reports for implementation of the 3GPP TM system should be obtained via the 3GPP Organizational Partners' Publications Offices.
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
© 2018, 3GPP Organizational Partners (ARIB, ATIS, CCSA, ETSI, TSDSI, TTA, TTC).
All rights reserved.
UMTS™ is a Trade Mark of ETSI registered for the benefit of its members
3GPP™ is a Trade Mark of ETSI registered for the benefit of its Members and of the 3GPP Organizational Partners
LTE™ is a Trade Mark of ETSI registered for the benefit of its Members and of the 3GPP Organizational Partners
GSM® and the GSM logo are registered and owned by the GSM Association
Contents
Foreword	9
1	Scope	10
2	References	10
3	Definitions, symbols and abbreviations	11
3.1	Definitions	11
3.2	Symbols	14
3.3	Abbreviations	15
4	General	17
4.1	Relationship between minimum requirements and test requirements	17
4.2	Base station classes	17
4.3	Regional requirements	17
4.4	Applicability of requirements	18
4.5	Requirements for BS capable of multi-band operation	19
5	Operating bands and channel arrangement	19
5.1	General	19
5.2	Void	20
5.3	Void	20
5.4	Void	20
5.5	Operating bands	20
5.6	Channel bandwidth	22
5.7	Channel arrangement	27
5.7.1	Channel spacing	27
5.7.1A	CA Channel spacing	27
5.7.2	Channel raster	27
5.7.3	Carrier frequency and EARFCN	27
5.7.4	EARFCN sets for uplink transmissions on multiple Scells configured in Band 46	30
5.8	Requirements for contiguous and non-contiguous spectrum	31
6	Transmitter characteristics	31
6.1	General	31
6.2	Base station output power	31
6.2.1	Minimum requirement	32
6.2.2	Additional requirement (regional)	32
6.2.3	Home BS output power for adjacent UTRA channel protection	33
6.2.4	Home BS output power for adjacent E-UTRA channel protection	34
6.2.5	Home BS Output Power for co-channel E-UTRA protection	35
6.3	Output power dynamics	36
6.3.1	RE Power control dynamic range	36
6.3.1.1	Minimum requirements	36
6.3.2	Total power dynamic range	36
6.3.2.1	Minimum requirements	36
6.3.3	NB-IoT RB power dynamic range for in-band or guard band operation	37
6.3.3.1	Minimum Requirement	37
6.4	Transmit ON/OFF power	37
6.4.1	Transmitter OFF power	37
6.4.1.1	Minimum Requirement	37
6.4.2	Transmitter transient period	37
6.4.2.1	Minimum requirements	38
6.5	Transmitted signal quality	38
6.5.1	Frequency error	38
6.5.1.1	Minimum requirement	38
6.5.2	Error Vector Magnitude	39
6.5.3	Time alignment error	39
6.5.3.1	Minimum Requirement	39
6.5.4	DL RS power	40
6.5.4.1	Minimum requirements	40
6.6	Unwanted emissions	40
6.6.1	Occupied bandwidth	40
6.6.1.1	Minimum requirement	41
6.6.2	Adjacent Channel Leakage power Ratio (ACLR)	41
6.6.2.1	Minimum requirement	41
6.6.2.2	Cumulative ACLR requirement in non-contiguous spectrum	43
6.6.3	Operating band unwanted emissions	45
6.6.3.1	Minimum requirements for Wide Area BS (Category A)	47
6.6.3.2	Minimum requirements for Wide Area BS (Category B)	49
6.6.3.2.1	Category B requirements (Option 1)	49
6.6.3.2.2	Category B (Option 2)	53
6.6.3.2A	Minimum requirements for Local Area BS (Category A and B)	55
6.6.3.2B	Minimum requirements for Home BS (Category A and B)	56
6.6.3.2C	Minimum requirements for Medium Range BS (Category A and B)	57
6.6.3.2D	Minimum requirements for Local Area and Medium Range BS in Band 46 (Category A and B)	59
6.6.3.2E	Minimum requirements for standalone NB-IoT Wide Area BS	60
6.6.3.2F	Minimum requirements for standalone NB-IoT Local Area BS	60
6.6.3.2G	Minimum requirements for standalone NB-IoT Home BS (Category A and B)	61
6.6.3.2H	Minimum requirements for standalone NB-IoT Medium Range BS	62
6.6.3.3	Additional requirements	63
6.6.4	Transmitter spurious emissions	68
6.6.4.1	Mandatory Requirements	68
6.6.4.1.1	Spurious emissions (Category A)	68
6.6.4.1.2	Spurious emissions (Category B)	69
6.6.4.2	Protection of the BS receiver of own or different BS	69
6.6.4.2.1	Minimum Requirement	69
6.6.4.3	Additional spurious emissions requirements	69
6.6.4.3.1	Minimum Requirement	69
6.6.4.4	Co-location with other base stations	83
6.6.4.4.1	Minimum Requirement	84
6.7	Transmitter intermodulation	93
6.7.1	Minimum requirement	93
6.7.2	Additional requirement for Band 41	94
7	Receiver characteristics	95
7.1	General	95
7.2	Reference sensitivity level	95
7.2.1	Minimum requirement	95
7.3	Dynamic range	100
7.3.1	Minimum requirement	101
7.4	In-channel selectivity	106
7.4.1	Minimum requirement	106
7.5	Adjacent Channel Selectivity (ACS) and narrow-band blocking	113
7.5.1	Minimum requirement	113
7.6	Blocking	124
7.6.1	General blocking requirement	124
7.6.1.1	Minimum requirement	125
7.6.2	Co-location with other base stations	140
7.6.2.1	Minimum requirement	141
7.6.3	Additional requirement (regional)	149
7.7	Receiver spurious emissions	149
7.7.1	Minimum requirement	149
7.8	Receiver intermodulation	150
7.8.1	Minimum requirement	150
8	Performance requirement	165
8.1	General	165
8.2	Performance requirements for PUSCH	165
8.2.1	Requirements in multipath fading propagation conditions	165
8.2.1.1	Minimum requirements	166
8.2.2	Requirements for UL timing adjustment	179
8.2.2.1	Minimum requirements	180
8.2.3	Requirements for high speed train	180
8.2.3.1	Minimum requirements	181
8.2.4	Requirements for HARQ-ACK multiplexed on PUSCH	181
8.2.4.1	 Minimum requirement	182
8.2.5	Requirements for PUSCH with TTI bundling and enhanced HARQ pattern	182
8.2.5.1	Minimum requirements	183
8.2.6	Enhanced performance requirement type A in multipath fading propagation conditions with synchronous interference	183
8.2.6.1	Minimum requirements	184
8.2.6A	Enhanced performance requirement type A in multipath fading propagation conditions with asynchronous interference	186
8.2.6A.1	Minimum requirements	187
8.2.7	Requirements for PUSCH supporting coverage enhancement	188
8.2.8	Requirements for PUSCH of Frame structure type 3	190
8.2.9	Enhanced performance requirement type B in multipath fading propagation conditions	191
8.2.9.1	Minimum requirements	193
8.2.10	Requirements for PUSCH supporting subPRB transmission	195
8.3	Performance requirements for PUCCH	197
8.3.1	DTX to ACK performance	197
8.3.1.1	 Minimum requirement	197
8.3.2	ACK missed detection requirements for single user PUCCH format 1a	197
8.3.2.1	Minimum requirements	198
8.3.3	CQI performance requirements for PUCCH format 2	198
8.3.3.1	Minimum requirements	198
8.3.4	ACK missed detection requirements for multi user PUCCH format 1a	199
8.3.4.1	Minimum requirement	199
8.3.5	ACK missed detection requirements for PUCCH format 1b with Channel Selection	199
8.3.5.1	Minimum requirements	200
8.3.6	ACK missed detection requirements for PUCCH format 3	200
8.3.6.1	Minimum requirements	200
8.3.7	NACK to ACK requirements for PUCCH format 3	201
8.3.7.1	Minimum requirement	201
8.3.8	CQI performance requirements for PUCCH format 2 with DTX detection	201
8.3.8.1	Minimum requirements	202
8.3.9	PUCCH performance requirements for coverage enhancement	202
8.3.9.1	DTX to ACK performance	202
8.3.9.1.1	Minimum requirement	202
8.3.9.2	ACK missed detection requirements for single user PUCCH format 1a	202
8.3.9.2.1	Minimum requirements	202
8.3.9.3	CQI performance requirements for PUCCH format 2	203
8.3.9.3.1	Minimum requirements	203
8.3.10	ACK missed detection requirements for PUCCH format 4	203
8.3.10.1	Minimum requirements	203
8.3.11	ACK missed detection requirements for PUCCH format 5	204
8.3.11.1	Minimum requirements	204
8.4	Performance requirements for PRACH	205
8.4.1	PRACH False alarm probability	205
8.4.1.1	Minimum requirement	205
8.4.2	PRACH detection requirements	205
8.4.2.1	Minimum requirements	205
8.5	Performance requirements for Narrowband IoT	207
8.5.1	Requirements for NPUSCH format 1	207
8.5.1.1	Requirements	207
8.5.1.1.1	Minimum requirements	207
8.5.2	Performance requirements for NPUSCH format 2	208
8.5.2.1	DTX to ACK performance	208
8.5.2.1.1	Minimum requirement	208
8.5.2.2	ACK missed detection requirements	209
8.5.2.2.1	Minimum requirements	209
8.5.3	Performance requirements for NPRACH	209
8.5.3.1	NPRACH False alarm probability	209
8.5.3.1.1	Minimum requirement	209
8.5.3.2	NPRACH detection requirements	209
8.5.3.2.1	Minimum requirements	210
8.6	Performance requirements for subslot-PUSCH	210
8.6.1	Requirements	210
8.6.1.1	Minimum requirements	210
8.7	Performance requirements for SPUCCH	211
8.7.1	ACK missed detection requirements for single user SPUCCH format 1a	211
8.7.1.1	Minimum requirements	211
8.7.2	ACK missed detection requirements for SPUCCH format 4	211
8.7.2.1	Minimum requirements	212
9	Void	213
Annex A (normative):	 Reference measurement channels	214
A.1	Fixed Reference Channels for reference sensitivity and in-channel selectivity (QPSK, R=1/3)	215
A.2	Fixed Reference Channels for dynamic range (16QAM, R=2/3)	216
A.3	Fixed Reference Channels for performance requirements (QPSK 1/3)	216
A.4	Fixed Reference Channels for performance requirements (16QAM 3/4)	217
A.5	Fixed Reference Channels for performance requirements (64QAM 5/6)	217
A.6	PRACH Test preambles	217
A.7	Fixed Reference Channels for UL timing adjustment (Scenario 1)	218
A.8	Fixed Reference Channels for UL timing adjustment (Scenario 2)	219
A.9	Multi user PUCCH test	219
A.10	PUCCH transmission on two antenna ports test	219
A.11	Fixed Reference Channel for PUSCH with TTI bundling and enhanced HARQ pattern	220
A.12	Fixed Reference Channels for performance requirements (QPSK 0.36)	220
A.13	Fixed Reference Channels for performance requirements (16QAM 1/2)	221
A.14	Fixed Reference Channels for NB-IOT reference sensitivity (π/2 BPSK, R=1/3)	221
A.15	Fixed Reference Channels for NB-IoT dynamic range (π/4 QPSK, R=2/3)	221
A.16	Fixed Reference Channels for NB-IoT NPUSCH format 1	222
A.16.1	One PRB	222
A.17	Fixed Reference Channels for performance requirements (256QAM 5/6)	223
A.18	Fixed Reference Channels for PUSCH transmission in UpPTS (16QAM 0.65)	223
A.19	Fixed Reference Channels for PUSCH transmission in UpPTS (256QAM 0.69)	224
A.20 Fixed Reference Channels for PUSCH of Frame structure type 3	224
A.21	Fixed Reference Channels for performance requirements (QPSK 3/5)	225
A.22	Fixed Reference Channels for performance requirements (64QAM 1/2)	226
A.23	Fixed Reference Channels for SubPRB allocation reference sensitivity (π/2 BPSK, R=1/3)	226
A.24	Fixed Reference Channel for subslot-PUSCH	227
A.25	Fixed Reference Channels for PUSCH with SubPRB transmission	227
Annex B (normative):	 Propagation conditions	228
B.1	Static propagation condition	228
B.2	Multi-path fading propagation conditions	228
B.3	High speed train condition	229
B.4	Moving propagation conditions	230
B.5	Multi-Antenna channel models	231
B.5.1	Definition of MIMO Correlation Matrices	231
B.5.2	MIMO Correlation Matrices at High, Medium and Low Level	232
B.5A	Multi-Antenna channel models using cross polarized antennas	234
B.5A.1	Definition of MIMO Correlation Matrices using cross polarized antennas	235
B.5A.2	Spatial Correlation Matrices at UE and eNB sides	235
B.5A.2.1	Spatial Correlation Matrices at UE side	235
B.5A.2.2	Spatial Correlation Matrices at eNB side	236
B.5A.3	MIMO Correlation Matrices using cross polarized antennas	236
B.6	Interference model for enhanced performance requirements type A and type B	236
B.6.1	Dominant interferer proportion	236
B.6.2	Interference model for synchronous scenario	237
B.6.3	Interference model for asynchronous scenario	237
Annex C (normative):	 Characteristics of the interfering signals	238
Annex D (normative):	 Environmental requirements for the BS equipment	239
Annex E (normative):	 Error Vector Magnitude	240
E.1	Reference point for measurement	240
E.2	Basic unit of measurement	240
E.3	Modified signal under test	241
E.4	Estimation of frequency offset	241
E.5	Estimation of time offset	241
E.5.1	Window length	242
E.6	Estimation of TX chain amplitude and frequency response parameters	243
E.7	Averaged EVM	244
Annex F (Informative):	Unwanted emission requirements for multi-carrier BS	246
F.1	General	246
F.2	Multi-carrier BS of different E-UTRA channel bandwidths	246
F.3	Multi-carrier BS of E-UTRA and UTRA	246
Annex G (Informative):	Regional requirement for protection of DTT	247
G.1	Regional requirement for protection of DTT	247
G.2	Regional requirement for Public Safety LTE BS in Korea	247
Annex H (Informative):	 Calculation of EIRP based on manufacturer declarations and site specific conditions	250
H.1	Calculation of EIRP based on manufacturer declarations and site specific conditions	250
Annex I (Informative):	 Change history	251
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
The present document establishes the minimum RF characteristics and minimum performance requirements of E-UTRA, E-UTRA with NB-IoT or NB-IoT Base Station (BS).
2	References
The following documents contain provisions which, through reference in this text, constitute provisions of the present document.
-	References are either specific (identified by date of publication, edition number, version number, etc.) or non-specific.
-	For a specific reference, subsequent revisions do not apply.
-	For a non-specific reference, the latest version applies. In the case of a reference to a 3GPP document (including a GSM document), a non-specific reference implicitly refers to the latest version of that document in the same Release as the present document.
 [1]	3GPP TR 21.905: "Vocabulary for 3GPP Specifications".
[2]	ITU-R Recommendation SM.329: "Unwanted emissions in the spurious domain".
[3]	ITU-R Recommendation M.1545: "Measurement uncertainty as it applies to test limits for the terrestrial component of International Mobile Telecommunications-2000".
[4]	3GPP TS 36.141: "Evolved Universal Terrestrial Radio Access (E-UTRA); Base Station (BS) conformance testing".
[5]	ITU-R recommendation SM.328: "Spectra and bandwidth of emissions".
[6]	3GPP TS 25.104: "Base Station (BS) radio transmission and reception (FDD)".
[7]	3GPP TS 25.105: "Base Station (BS) radio transmission and reception (TDD)".
[8]	3GPP TR 25.942: "RF system scenarios".
[9]	3GPP TR 36.942: "E-UTRA RF system scenarios".
[10]	3GPP TS 36.211: "Evolved Universal Terrestrial Radio Access (E-UTRA); Physical Channels and Modulation".
[11]	3GPP TS 36.213: "Evolved Universal Terrestrial Radio Access (E-UTRA); Physical layer procedures".
[12]	ECC/DEC/(09)03 "Harmonised conditions for MFCN in the band 790-862 MHz", 30 Oct. 2009
[13]	IEC 60721-3-3 (2002): "Classification of environmental conditions - Part 3: Classification of groups of environmental parameters and their severities - Section 3: Stationary use at weather protected locations".
[14]	IEC 60721-3-4 (1995): "Classification of environmental conditions - Part 3: Classification of groups of environmental parameters and their severities - Section 4: Stationary use at non-weather protected locations".
[15]	3GPP TS 37.104: "E-UTRA, UTRA and GSM/EDGE; Multi-Standard Radio (MSR) Base Station (BS) radio transmission and reception ".
[16]	CEPT ECC Decision (13)03, "The harmonised use of the frequency band 1452-1492 MHz for Mobile/Fixed Communications Networks Supplemental Downlink (MFCN SDL)".
[17]	3GPP TS 36.211: "Evolved Universal Terrestrial Radio Access (E-UTRA); Physical channels and modulation".
[18]	3GPP TS 36.213: "Evolved Universal Terrestrial Radio Access (E-UTRA); Physical layer procedures".
[19]	CEPT ECC Decision (17)06, "The harmonised use of the frequency bands 1427-1452 MHz and 1492-1518 MHz for Mobile/Fixed Communications Networks Supplemental Downlink (MFCN SDL)".
3	Definitions, symbols and abbreviations
3.1	Definitions
For the purposes of the present document, the terms and definitions given in TR 21.905 [1] and the following apply. A term defined in the present document takes precedence over the definition of the same term, if any, in TR 21.905 [1].
Aggregated Channel Bandwidth: RF bandwidth in which a base station transmits and/or receives multiple contiguously aggregated carriers.
NOTE:	The Aggregated Channel Bandwidth is measured in MHz.
Base station receive period: time during which the base station is receiving data subframes or UpPTS.
Base Station RF Bandwidth: RF bandwidth in which a base station transmits and/or receives single or multiple carrier(s) within a supported operating band.
NOTE:	In single E-UTRA carrier operation, the Base Station RF Bandwidth is equal to the channel bandwidth.
Base Station RF Bandwidth edge: frequency of one of the edges of the Base Station RF Bandwidth.
Carrier: modulated waveform conveying the E-UTRA or UTRA physical channels
Carrier aggregation: aggregation of two or more component carriers in order to support wider transmission bandwidths
Carrier aggregation band: a set of one or more operating bands across which multiple carriers are aggregated with a specific set of technical requirements.
NOTE:	Carrier aggregation band(s) for an E-UTRA BS is declared by the manufacturer according to the designations in Tables 5.5-2 to 5.5-4.
Channel bandwidth: RF bandwidth supporting a single E-UTRA RF carrier with the transmission bandwidth configured in the uplink or downlink of a cell.
NOTE:	The channel bandwidth is measured in MHz and is used as a reference for transmitter and receiver RF requirements.
Channel edge: lowest or highest frequency of the E-UTRA carrier, separated by the channel bandwidth.
Contiguous carriers: set of two or more carriers configured in a spectrum block where there are no RF requirements based on co-existence for un-coordinated operation within the spectrum block.
Contiguous spectrum: spectrum consisting of a contiguous block of spectrum with no sub-block gap(s).
DL RS power: resource element power of Downlink Reference Symbol.
DL NRS power: resource element power of Downlink Narrowband Reference Signal.
Downlink operating band: part of the operating band designated for downlink.
Enhanced performance requirements type A: This defines performance requirements assuming baseline receiver as demodulation reference signal based linear minimum mean square error interference rejection combining.
Enhanced performance requirements type B: This defines performance requirements assuming baseline receiver as code word level interference cancellation for intra-cell inter-user interference plus demodulation reference signal based linear minimum mean square error interference rejection combining for inter-cell interference.
Highest carrier: carrier with the highest carrier centre frequency transmitted/received in a specified operating band.
Inter RF Bandwidth gap: frequency gap between two consecutive Base Station RF Bandwidths that are placed within two supported operating bands.
Inter-band carrier aggregation: carrier aggregation of component carriers in different operating bands.
NOTE:	Carriers aggregated in each band can be contiguous or non-contiguous.
Inter-band gap: The frequency gap between two supported consecutive operating bands.
Intra-band contiguous carrier aggregation: contiguous carriers aggregated in the same operating band.
Intra-band non-contiguous carrier aggregation: non-contiguous carriers aggregated in the same operating band.
Lower sub-block edge: frequency at the lower edge of one sub-block.
NOTE:	It is used as a frequency reference point for both transmitter and receiver requirements.
Lowest carrier: carrier with the lowest carrier centre frequency transmitted/received in a specified operating band.
Maximum output power: mean power level per carrier of the base station measured at the antenna connector in a specified reference condition.
Maximum throughput: maximum achievable throughput for a reference measurement channel.
Mean power: power measured in the channel bandwidth of the carrier.
NOTE:	The period of measurement shall be at least one subframe (1ms), unless otherwise stated.
Measurement bandwidth: RF bandwidth in which an emission level is specified.
Multi-band base station: base station characterized by the ability of its transmitter and/or receiver to process two or more carriers in common active RF components simultaneously, where at least one carrier is configured at a different operating band (which is not a sub-band or superseding-band of another supported operating band) than the other carrier(s).
Multi-band transmitter: transmitter characterized by the ability to process two or more carriers in common active RF components simultaneously, where at least one carrier is configured at a different operating band  (which is not a sub-band or superseding-band of another supported operating band) than the other carrier(s).
Multi-band receiver: receiver characterized by the ability to process two or more carriers in common active RF components simultaneously, where at least one carrier is configured at a different operating band  (which is not a sub-band or superseding-band of another supported operating band) than the other carrier(s).
Multi-carrier transmission configuration: set of one or more contiguous or non-contiguous carriers that a BS is able to transmit simultaneously according to the manufacturer’s specification.
NB-IoT In-band operation: NB-IoT is operating in-band when it utilizes the resource block(s) within a normal E-UTRA carrier
NB-IoT guard band operation: NB-IoT is operating in guard band when it utilizes the unused resource block(s) within a E-UTRA carrier’s guard-band.
NB-IoT standalone operation: NB-IoT is operating standalone when it utilizes its own spectrum, for example the spectrum currently being used by GERAN systems as a replacement of one or more GSM carriers, as well as scattered spectrum for potential IoT deployment.
Non-contiguous spectrum: spectrum consisting of two or more sub-blocks separated by sub-block gap(s).
Occupied bandwidth: width of a frequency band such that, below the lower and above the upper frequency limits, the mean powers emitted are each equal to a specified percentage β/2 of the total mean power of a given emission.
Operating band: frequency range in which E-UTRA operates (paired or unpaired), that is defined with a specific set of technical requirements.
NOTE:	The operating band(s) for an E-UTRA BS is declared by the manufacturer according to the designations in table 5.5-1.
Output power: mean power of one carrier of the base station, delivered to a load with resistance equal to the nominal load impedance of the transmitter.
Radio Bandwidth: frequency difference between the upper edge of the highest used carrier and the lower edge of the lowest used carrier.
Rated output power: mean power level per carrier that the manufacturer has declared to be available at the antenna connector during the transmitter ON period.
RE power control dynamic range: difference between the power of a RE and the average RE power for a BS at maximum output power for a specified reference condition.
RRC filtered mean power: mean power of an UTRA carrier as measured through a root raised cosine filter with roll-off factor  and a bandwidth equal to the chip rate of the radio access mode.
NOTE 1:	The RRC filtered mean power of a perfectly modulated UTRA signal is 0.246 dB lower than the mean power of the same signal.
sTTI: A transmission time interval (TTI) of either one slot or one subslot as defined in [10] on either uplink or downlink.
Sub-band: A sub-band of an operating band contains a part of the uplink and downlink frequency range of the operating band.
Sub-block: one contiguous allocated block of spectrum for transmission and reception by the same base station.
NOTE:	There may be multiple instances of sub-blocks within aBase Station RF Bandwidth.
Sub-block bandwidth: bandwidth of one sub-block.
Sub-block gap: frequency gap between two consecutive sub-blocks within a Bae Station RF Bandwidth, where the RF requirements in the gap are based on co-existence for un-coordinated operation.
Superseding-band: A superseding-band of an operating band includes the whole of the uplink and downlink frequency range of the operating band.
Synchronized operation: operation of TDD in two different systems, where no simultaneous uplink and downlink occur.
Throughput: number of payload bits successfully received per second for a reference measurement channel in a specified reference condition.
Total power dynamic range: difference between the maximum and the minimum transmit power of an OFDM symbol for a specified reference condition.
Transmission bandwidth: RF Bandwidth of an instantaneous transmission from a UE or BS, measured in resource block units.
Transmission bandwidth configuration: highest transmission bandwidth allowed for uplink or downlink in a given channel bandwidth, measured in resource block units.
Transmitter ON period: time period during which the BS transmitter is transmitting data and/or reference symbols, i.e. data subframes or DwPTS.
Transmitter OFF period: time period during which the BS transmitter is not allowed to transmit.
Transmitter transient period: time period during which the transmitter is changing from the OFF period to the ON period or vice versa.
Unsynchronized operation: operation of TDD in two different systems, where the conditions for synchronized operation are not met.
Uplink operating band: part of the operating band designated for uplink.
Upper sub-block edge: frequency at the upper edge of one sub-block.
NOTE:	It is used as a frequency reference point for both transmitter and receiver requirements.
3.2	Symbols
For the purposes of the present document, the following symbols apply:
	Roll-off factor
	Percentage of the mean transmitted power emitted outside the occupied bandwidth on the assigned channel
BW	Bandwidth
BWChannel	Channel bandwidth
BWChannel_CA	Aggregated Channel Bandwidth, expressed in MHz. BWChannel_CA= Fedge_high- Fedge_low.
BWChannel,block	Sub-block bandwidth, expressed in MHz. BWChannel,block= Fedge,block,high- Fedge,block,low.
BWConfig	Transmission bandwidth configuration, expressed in MHz, where BWConfig = NRB x 180 kHz in the uplink and BWConfig = 15 kHz + NRB x 180 kHz in the downlink.
CA_X	Intra-band contiguous CA of component carriers in one sub-block within band X where X is the applicable E-UTRA operating band
CA_X-X	Intra-band non-contiguous CA of component carriers in two sub-blocks within band X where X is the applicable E-UTRA operating band
CA_X-Y	Inter-band CA of component carrier(s) in one sub-block within band X and component carrier(s) in one sub-block within Band Y where X and Y are the applicable E-UTRA operating bands
CA_X-X-Y	CA of component carriers in two sub-blocks within Band X and component carrier(s) in one sub-block within Band Y where X and Y are the applicable E-UTRA operating bands
f	Frequency
f	Separation between the channel edge frequency and the nominal -3dB point of the measuring filter closest to the carrier frequency
fmax	The largest value of f used for defining the requirement
FC	Carrier centre frequency
FC,block, high	Centre frequency of the highest transmitted/received carrier in a sub-block.
FC,block, low	Centre frequency of the lowest transmitted/received carrier in a sub-block.
FC_low	The carrier centre frequency of the lowest carrier, expressed in MHz.
FC_high	The carrier centre frequency of the highest carrier, expressed in MHz.
Fedge_low	The lower edge of Aggregated Channel Bandwidth, expressed in MHz. Fedge_low = FC_low - Foffset.
Fedge_high	The upper edge of Aggregated Channel Bandwidth, expressed in MHz. Fedge_high = FC_high + Foffset.
Fedge,block,low	The lower sub-block edge, where Fedge,block,low = FC,block,low - Foffset.
Fedge,block,high	The upper sub-block edge, where Fedge,block,high = FC,block,high + Foffset.
Foffset	Frequency offset from FC_high to the upper Base Station RF Bandwidth edge, or from F C,block, high to the upper sub-block edge, or FC_low to the lower Base Station RF Bandwidth edge, or from FC,block, low to the lower sub-block edge.
Ffilter	Filter centre frequency
f_offset	Separation between the channel edge frequency and the centre of the measuring filter
f_offsetmax	The maximum value of f_offset used for defining the requirement
FDL_low	The lowest frequency of the downlink operating band
FDL_high	The highest frequency of the downlink operating band
FUL_low	The lowest frequency of the uplink operating band
FUL_high	The highest frequency of the uplink operating band
Gant	Net antenna gain
MDL	Offset of NB-IoT Downlink channel number to Downlink EARFCN
MUL	Offset of NB-IoT Uplink channel number to Uplink EARFCN
Nant	Number of transmitter antennas
NDL	Downlink EARFCN
NOffs-DL	Offset used for calculating downlink EARFCN
NOffs-UL	Offset used for calculating uplink EARFCN
NCS	Number of Cyclic shifts for preamble generation in PRACH
NRB	Transmission bandwidth configuration, expressed in units of resource blocks
NUL	Uplink EARFCN
P10MHz	Maximum output Power within 10 MHz
PEIRP,N	EIRP level for channel N
PEIRP,N,MAX	Maximum EIRP level for channel N
PEM,N	Declared emission level for channel N
PEM,B32,B75,B76,ind	Declared emission level in Band 32, Band 75 and Band 76, ind=a, b, c
PEM,B32,ind	Declared emission level in Band 32, ind=d, e
PEM,B50,B74,B75,ind	Declared emission level for Band 50, Band 74 and Band 75, ind=a,b
Pmax,c	Maximum carrier output power
Pout	Output power (per carrier)
Prated,c	Rated output power (per carrier)
PREFSENS	Reference Sensitivity power level
TA	Timing advance command, as defined in [11]
	Basic time unit, as defined in [10]
Wgap	Sub-block gap or Inter RF Bandwidth gap size
3.3	Abbreviations
For the purposes of the present document, the abbreviations given in TR 21.905 [1] and the following apply. An abbreviation defined in the present document takes precedence over the definition of the same abbreviation, if any, in TR 21.905 [1].
ACLR	Adjacent Channel Leakage Ratio
ACK	Acknowledgement (in HARQ protocols)
ACS	Adjacent Channel Selectivity
AWGN	Additive White Gaussian Noise
BS	Base Station
CA	Carrier Aggregation
CACLR	Cumulative ACLR
CP	Cyclic prefix
CRC	Cyclic Redundancy Check
CW	Continuous Wave
DC	Direct Current
DFT	Discrete Fourier Transformation
DIP	Dominant Interferer Proportion
DTT	Digital Terrestrial Television
DTX	Discontinuous Transmission
DwPTS	Downlink part of the special subframe (for TDD operation)
EARFCN	E-UTRA Absolute Radio Frequency Channel Number
EIRP	Effective Isotropic Radiated Power
EPA	Extended Pedestrian A model	
ETU	Extended Typical Urban model
E-UTRA	Evolved UTRA
EVA	Extended Vehicular A model
EVM	Error Vector Magnitude
FDD	Frequency Division Duplex
FFT	Fast Fourier Transformation
FRC	Fixed Reference Channel
GP	Guard Period (for TDD operation)
GSM	Global System for Mobile communications
HARQ	Hybrid Automatic Repeat Request
ICS	In-Channel Selectivity
ITU-R	Radiocommunication Sector of the ITU
LA	Local Area
LNA	Low Noise Amplifier
MCS	Modulation and Coding Scheme
MFCN	Mobile/Fixed Communications Network
MR	Medium Range
NB-IoT	Narrowband – Internet of Things
NPDSCH	Narrowband Physical Downlink Shared Channel
NPUSCH	Narrowband Physical Uplink Shared Channel
NRS	Narrowband Refernce Signal
OFDM	Orthogonal Frequency Division Multiplex
OOB	Out-of-band
PA	Power Amplifier
PBCH	Physical Broadcast Channel
PDCCH	Physical Downlink Control Channel
PDSCH	Physical Downlink Shared Channel
PUSCH	Physical Uplink Shared Channel
PUCCH	Physical Uplink Control Channel
PRACH	Physical Random Access Channel
QAM	Quadrature Amplitude Modulation
QPSK	Quadrature Phase-Shift Keying
RAT	Radio Access Technology
RB	Resource Block
RE	Resource Element
RF	Radio Frequency
RMS	Root Mean Square (value)
RS	Reference Symbol
RX	Receiver
RRC	Root Raised Cosine
SINR	Signal-to-Interference-and-Noise Ratio
SNR	Signal-to-Noise Ratio
sPDCCH	shortened Physical Downlink Control Channel
sPDSCH	shortened Physical Downlink Shared Channel
TA	Timing Advance
TDD	Time Division Duplex
TX	Transmitter
UE	User Equipment
WA	Wide Area
4	General
4.1	Relationship between minimum requirements and test requirements
The Minimum Requirements given in this specification make no allowance for measurement uncertainty. The test specification TS 36.141 [4] Annex G defines Test Tolerances. These Test Tolerances are individually calculated for each test. The Test Tolerances are used to relax the Minimum Requirements in this specification to create Test Requirements.
The measurement results returned by the Test System are compared - without any modification - against the Test Requirements as defined by the shared risk principle.
The Shared Risk principle is defined in ITU-R M.1545 [3].
4.2	Base station classes
The requirements in this specification apply to Wide Area Base Stations, Medium Range Base Stations, Local Area Base Stations and Home Base Stations unless otherwise stated. 
Wide Area Base Stations are characterised by requirements derived from Macro Cell scenarios with a BS to UE minimum coupling loss equal to 70 dB. The Wide Area Base Station class has the same requirements as the base station for General Purpose application in Release 8.
Medium Range Base Stations are characterised by requirements derived from Micro Cell scenarios with a BS to UE minimum coupling loss equal to 53 dB.
Local Area Base Stations are characterised by requirements derived from Pico Cell scenarios with a BS to UE minimum coupling loss equal to 45 dB.
Home Base Stations are characterised by requirements derived from Femto Cell scenarios.
4.3	Regional requirements
Some requirements in the present document may only apply in certain regions either as optional requirements or set by local and regional regulation as mandatory requirements. It is normally not stated in the 3GPP specifications under what exact circumstances that the requirements apply, since this is defined by local or regional regulation.
Table 4.3-1 lists all requirements that may be applied differently in different regions.
Table 4.3-1: List of regional requirements
4.4	Applicability of requirements
For BS that is E-UTRA (single-RAT), E-UTRA with NB-IoT (in band and/or guard band) or standalone NB-IoT capable only, MBMS (including 15 kHz, 7.5 kHz and 1.25 kHz subcarrier spacing), the requirements in the present document are applicable and additional conformance to TS 37.104 [15] is optional. For a BS additionally conforming to TS 37.104 [15], conformance to some of the RF requirements in the present document can be demonstrated through the corresponding requirements in TS 37.104 [15] as listed in Table 4.4-1.
Table 4.4-1: Alternative RF minimum requirements for a BS additionally conforming to TS 37.104 [15]
4.5	Requirements for BS capable of multi-band operation
For BS capable of multi-band operation, the RF requirements in clause 6 and 7 apply for each supported operating band unless otherwise stated. For some requirements it is explicitly stated that specific additions or exclusions to the requirement apply for BS capable of multi-band operation.
For BS capable of multi-band operation, various structures in terms of combinations of different transmitter and receiver implementations (multi-band or single band) with mapping of transceivers to one or more antenna port(s) in different ways are possible. In the case where multiple bands are mapped on an antenna connector, the exclusions or provisions for multi-band capable BS are applicable to this antenna connector. In the case where a single band is mapped on an antenna connector, the following applies:
-	Single-band ACLR, operating band unwanted emissions, transmitter spurious emissions, transmitter intermodulation and receiver spurious emissions requirements apply to this antenna connector that is mapped to single-band.
-	If the BS is configured for single-band operation, single-band requirements shall apply to this antenna connector configured for single-band operation and no exclusions or provisions for multi-band capable BS are applicable. Single-band requirements are tested separately at the antenna connector configured for single-band operation, with all other antenna connectors terminated.
For a band supported by a Base Station where the transmitted carriers are not processed in active RF components together with carriers in any other band, single-band transmitter requirements shall apply. For a band supported by a Base Station where the received carriers are not processed in active RF components together with carriers in any other band, single-band receiver requirements shall apply.
For a BS capable of multi-band operation supporting bands for TDD, the RF requirements in the present specification assume synchronized operation, where no simultaneous uplink and downlink occur between the supported operating bands.
The RF requirements in the present specification are FFS for multi-band operation supporting bands for both FDD and TDD.
5	Operating bands and channel arrangement
5.1	General
The channel arrangements presented in this clause are based on the operating bands and channel bandwidths defined in the present release of specifications.
NOTE:	Other operating bands and channel bandwidths may be considered in future releases.
5.2	Void
5.3	Void
5.4	Void
5.5	Operating bands
E-UTRA is designed to operate in the operating bands defined in Table 5.5-1. Unless stated otherwise, requirements specified for the TDD duplex mode apply for downlink and uplink operations in Frame Structure Type 2 [4].
NB-IoT is designed to operate in the E-UTRA operating bands 1, 2, 3, 4, 5, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 25, 26, 28, 31, 41 (in certain regions), 65, 66, 70, 71, 72, 73, 74, 85 which are defined in Table 5.5-1.
Table 5.5-1 E-UTRA frequency bands


Table 5.5-1A Sub-bands for Band 46
Table 5.5-2: Void
Table 5.5-3: Void
Table 5.5-3A: Void
Table 5.5-3B: Void
Table 5.5-3C: Void
Table 5.5-4: Void
Table 5.5-5: Void
Table 5.5-6: Void
5.6	Channel bandwidth
For E-UTRA, requirements in present document are specified for the channel bandwidths listed in Table 5.6-1.
Table 5.6-1 Transmission bandwidth configuration NRB in E-UTRA channel bandwidths
For E-UTRA, figure 5.6-1 shows the relation between the channel bandwidth (BWChannel) and the transmission bandwidth configuration (NRB). The channel edges are defined as the lowest and highest frequencies of the carrier separated by the channel bandwidth, i.e. at FC +/- BWChannel /2.
Figure 5.6-1 Definition of Channel Bandwidth and Transmission Bandwidth Configuration for one E-UTRA carrier
Figure 5.6-2 illustrates the Aggregated Channel Bandwidth for intra-band carrier aggregation.
Figure 5.6-2 Definition of Aggregated Channel Bandwidth for intra-band carrier aggregation
The lower edge of the Aggregated Channel Bandwidth (BWChannel_CA) is defined as Fedge_low = FC_low - Foffset. The upper edge of the Aggregated Channel Bandwidth is defined as Fedge_high = FC_high + Foffset. The Aggregated Channel Bandwidth, BWChannel_CA, is defined as follows:
	BWChannel_CA = Fedge_high - Fedge_low [MHz]
Figure 5.6-3 illustrates the sub-block bandwidth for a BS operating in non-contiguous spectrum
Figure 5.6-3 Definition of sub-block bandwidth for intra-band non-contiguous spectrum
The lower sub-block edge of the sub-block bandwidth (BWChannel,block) is defined as Fedge,block, low = FC,block,low - Foffset. The upper sub-block edge of the sub-block bandwidth is defined as Fedge,block,high = FC,block,high + Foffset. The sub-block bandwidth, BWChannel,block, is defined as follows:
	BWChannel,block = Fedge,block,high - Fedge,block,low [MHz]
Foffset is defined in Table 5.6-2 below where BWChannel is defined in Table 5.6-1.
Table 5.6-2: Definition of Foffset
NOTE 1:	Foffset  is calculated separately for each Base Station RF Bandwidth edge / sub-block edge.
NOTE 2:	The values of BWChannel_CA/BWChannel,block for UE and BS are the same if the channel bandwidths of lowest and the highest component carriers are identical.
For NB-IoT, requirements in present document are specified for the channel bandwidths listed in Table 5.6-3.
Table 5.6-3: Transmission bandwidth configuration NRB, Ntone 15kHz and Ntone 3.75kHz in NB-IoT channel bandwidth
For NB-IoT standalone operation, figure 5.6-4 shows the relation between the channel bandwidth (BWChannel) and the transmission bandwidth configuration (NRB, Ntone 15kHz and Ntone 3.75kHz) for NB-IoT standalone operation. The channel edges are defined as the lowest and highest frequencies of the carrier separated by the channel bandwidth, i.e. at FC +/- BWChannel /2.
For NB-IoT standalone operation, NB-IoT requirements for receiver and transmitter shall apply with a frequency offset Foffset  as defined in Table 5.6-3A.
Table 5.6-3A: Foffset for NB-IoT standalone operation
Figure 5.6-4 Definition of Channel Bandwidth and Transmission Bandwidth Configuration for NB-IoT standalone operation
For NB-IoT in-band operation, figure 5.6-5 shows the relation between the channel bandwidth (BWChannel) and the transmission bandwidth configuration (NRB, Ntone 15kHz and Ntone 3.75kHz) . The channel edges are defined as the lowest and highest frequencies of the carrier separated by the channel bandwidth, i.e. at FC +/- BWChannel /2.
Figure 5.6-5 Definition of Channel Bandwidth and Transmission Bandwidth Configuration for NB-IoT in-band operation
For NB-IoT guard band operation, figure 5.6-6 shows the relation between the channel bandwidth (BWChannel) and the transmission bandwidth configuration (NRB, Ntone 15kHz and Ntone 3.75kHz). The channel edges are defined as the lowest and highest frequencies of the carrier separated by the channel bandwidth, i.e. at FC +/- BWChannel /2.
Figure 5.6-6 Definition of Channel Bandwidth and Transmission Bandwidth Configuration for NB-IoT guard band operation
5.7	Channel arrangement
5.7.1	Channel spacing
The spacing between carriers will depend on the deployment scenario, the size of the frequency block available and the channel bandwidths. The nominal channel spacing between two adjacent E-UTRA carriers is defined as following:
	Nominal Channel spacing = (BWChannel(1) + BWChannel(2))/2
where BWChannel(1) and BWChannel(2) are the channel bandwidths of the two respective E-UTRA carriers. The channel spacing can be adjusted to optimize performance in a particular deployment scenario.
For 20MHz carriers in Band 46, the requirements apply for both 19.8 MHz and 20.1 MHz nominal carrier spacing.
CA Channel spacing
For intra-band contiguously aggregated carriers the channel spacing between adjacent component carriers shall be multiple of 300 kHz.
The nominal channel spacing between two adjacent aggregated E-UTRA carriers is defined as follows:
where BWChannel(1) and BWChannel(2) are the channel bandwidths of the two respective E-UTRA component carriers according to Table 5.6-1 with values in MHz. The channel spacing for intra-band contiguous carrier aggregation can be adjusted to any multiple of 300 kHz less than the nominal channel spacing to optimize performance in a particular deployment scenario.
For intra-band contiguous carrier aggregation with two or more component carriers in Band 46, the requirements apply for both 19.8 MHz and 20.1 MHz nominal carrier spacing between two 20 MHz component carriers, and for 15.0 MHz nominal carrier spacing between 10 MHz and 20 MHz component carriers.
5.7.2	Channel raster
The channel raster is 100 kHz for all bands, which means that the carrier centre frequency must be an integer multiple of 100 kHz. 
5.7.3	Carrier frequency and EARFCN
The carrier frequency in the uplink and downlink is designated by the E-UTRA Absolute Radio Frequency Channel Number (EARFCN) in the range 0 - 262143. The relation between EARFCN and the carrier frequency in MHz for the downlink is given by the following equation, where FDL_low and NOffs-DL are given in table 5.7.3-1 and NDL is the downlink EARFCN.
	FDL = FDL_low + 0.1(NDL – NOffs-DL)
The relation between EARFCN and the carrier frequency in MHz for the uplink is given by the following equation where FUL_low and NOffs-UL are given in table 5.7.3-1 and NUL is the uplink EARFCN.
	FUL = FUL_low + 0.1(NUL – NOffs-UL)
The carrier frequency of NB-IoT in the downlink is designated by the E-UTRA Absolute Radio Frequency Channel Number (EARFCN) in the range 0 – 262143 and the Offset of NB-IoT Channel Number to EARFCN in the range {-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,-0.5,0,1,2,3,4,5,6,7,8,9}. The relation between EARFCN, Offset of NB-IoT Channel Number to EARFCN and the carrier frequency in MHz for the downlink is given by the following equation, where FDL is the downlink carrier frequency of NB-IoT, FDL_low and NOffs-DL are given in table 5.7.3-1, NDL is the downlink EARFCN, MDL is the Offset of NB-IoT Channel Number to downlink EARFCN.
	FDL = FDL_low + 0.1(NDL – NOffs-DL) + 0.0025*(2MDL+1)
The carrier frequency of NB-IoT in the uplink is designated by the E-UTRA Absolute Radio Frequency Channel Number (EARFCN) in the range 0 –262143, and the Offset of NB-IoT Channel Number to EARFCN in the range {-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9} for FDD and in the range {-11,-10,-9.5,-9,-8.5,-8,-7.5,-7,-6.5,-6,-5.5,-5,  -4.5,-4,-3.5,-3,-2.5,-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10, 11} for TDD. The relation between EARFCN, Offset of NB-IoT Channel Number to EARFCN and the carrier frequency in MHz for the uplink is given by the following equation, where FUL is the uplink carrier frequency of NB-IoT, FUL_low and NOffs-UL are given in table 5.7.3-1, NUL is the uplink EARFCN, MUL is the Offset of NB-IoT Channel Number to uplink EARFCN.
	FUL = FUL_low + 0.1(NUL – NOffs-UL) + 0.0025*(2MUL)
NOTE 1:	For NB-IoT, NDL or NUL is different than the value of EARFCN that corresponds to E-UTRA downlink or uplink carrier frequency for in-band and guard band operation.
NOTE 2:	MDL = -0.5 is not applicable for in-band and guard band operation.
NOTE 3:	For the carrier including NPSS/NSSS for in-band and guard band operation, MDL is selected from {-2,-1,0,1}.
NOTE 4:	For the carrier including NPSS/NSSS for stand-alone operation, MDL = -0.5.
Table 5.7.3-1: E-UTRA channel numbers
5.7.4	EARFCN sets for uplink transmissions on multiple Scells configured in Band 46
On a configured set of carriers with carrier frequencies that are a subset of any of the following sets of EARFCN, if the eNB schedules a UE to transmit in a subframe on the configured set of carriers, and if the UL grants scheduling PUSCH transmissions on any of the said set of carriers indicate Type 1 channel access procedure, and if the same ‘PUSCH starting position’ is indicated for all carriers, transmissions in accordance with the conditions for Type 2 channel access specified in clause 15.2.1 of [11] are allowed:
-	for sets of two Scells: {47090, 47290}, {47490, 47690}, {47890, 48090}, {48290, 48490}, {50290, 50490}, {50690, 50890}, {51090, 51290}, {51490, 51690}, {51890, 52090}
-	for sets of four Scells: {47090, 47290, 47490, 47690}, {47890, 48090, 48290, 48490}, {50290, 50490, 50690, 50890}, {51090, 51290, 51490, 51690}
-	[for sets of eight Scells: {47090, 47290, 47490, 47690, 47890, 48090, 48290, 48490}, {50290, 50490, 50690, 50890, 51090, 51290, 51490, 51690}]
5.8	Requirements for contiguous and non-contiguous spectrum
A spectrum allocation where the BS operates can either be contiguous or non-contiguous. Unless otherwise stated, the requirements in the present specification apply for BS configured for both contiguous spectrum operation and non-contiguous spectrum operation.
For BS operation in non-contiguous spectrum, some requirements apply also inside the sub-block gaps. For each such requirement, it is stated how the limits apply relative to the sub-block edges.
6	Transmitter characteristics
6.1	General
Unless otherwise stated, the requirements in clause 6 are expressed for a single transmitter antenna connector. In case of multi-carrier transmission with one or multiple transmitter antenna connectors, transmit diversity or MIMO transmission, the requirements apply for each transmitter antenna connector.
Unless otherwise stated, the transmitter characteristics are specified at the BS antenna connector (test port A) with a full complement of transceivers for the configuration in normal operating conditions. If any external apparatus such as a TX amplifier, a filter or the combination of such devices is used, requirements apply at the far end antenna connector (port B).
Unless otherwise stated the requirements in clause 6 applies at all times, i.e. during the Transmitter ON period, the Transmitter OFF period and the Transmitter transient period.
Unless otherwise stated the requirements for NB-IoT in clause 6 applies for all operation modes (In-band operation, Guard-band operation and Stand-alone operation).
Figure 6.1-1: Transmitter test ports
6.2	Base station output power
Output power, Pout, of the base station is the mean power of one carrier delivered to a load with resistance equal to the nominal load impedance of the transmitter.
Rated total output power of the base station is the mean power for BS operating in single carrier, multi-carrier, or carrier aggregation configurations that the manufacturer has declared to be available at the antenna connector during the transmitter ON period.
Maximum output power (Pmax,c) of the base station is the mean power level per carrier measured at the antenna connector during the transmitter ON period in a specified reference condition.
Rated output power, Prated,c, of the base station is the mean power level per carrier for BS operating in single carrier, multi-carrier, or carrier aggregation configurations that the manufacturer has declared to be available at the antenna connector during the transmitter ON period.
NOTE:	Different Prated,c may be declared for different configurations.
NOTE:	For NB-IoT in-band and guard band operation, the LTE carrier and NB-IoT carrier shall be seen as a single carrier occupied LTE channel bandwidth, the output power over this carrier is shared between LTE and NB-IoT. This note is applied for Pout, Rated total output power, Pmax,c and Prated,c.
The rated output power, Prated,c, of the BS shall be as specified in Table 6.2-1.
Table 6.2-1: Base Station rated output power
In addition for Band 46 operation, the BS may have to comply with the applicable BS power limits established regionally, when deployed in regions where those limits apply and under the conditions declared by the manufacturer. The regional requirements may be in the form of conducted power, power spectral density, EIRP and other types of limits. In case of regulatory limits based on EIRP, assessment of the EIRP level is described in Annex H.
In addition for Band 49 operation in US, the BS EIRP power limit established by FCC for Category A CBSDs (Citizens Broadband Radio Service Devices) applies. Assessment of the EIRP level is described in Annex H.
In addition for Band 85 NB-IoT standalone operation, the BS rated output power limit of 43 dBm applies over the NB-IoT carriers in the range 728-729 MHz of the DL operating band. The BS output power limit of 43 dBm shall be considered as shared among all NB-IoT carriers in the 728-729 MHz frequency range or as the maximum value per NB-IoT carrier in the case where only one NB-IoT carrier is deployed in 728-729 MHz frequency range.
6.2.1	Minimum requirement
In normal conditions, the base station maximum output power, Pmax,c, shall remain within +2 dB and -2 dB of the rated output power, Prated,c, declared by the manufacturer.
In extreme conditions, the base station maximum output power, Pmax,c, shall remain within +2.5 dB and -2.5 dB of the rated output power, Prated,c, declared by the manufacturer.
In certain regions, the minimum requirement for normal conditions may apply also for some conditions outside the range of conditions defined as normal.
6.2.2	Additional requirement (regional)
For Band 34 operation in Japan, the rated output power, Prated,c, declared by the manufacturer shall be less than or equal to the values specified in Table  6.2.2-1.
Table 6.2.2-1: Regional requirements for Band 34 for rated output power declared by the manufacturer.
For Band 41 operation in Japan, the rated output power, Prated,c,  per BS declared by the manufacturer shall be less than or equal to the values specified in Table -2.
Table -2: Regional requirements for Band 41 for rated output power declared by the manufacturer.
6.2.3	Home BS output power for adjacent UTRA channel protection
The E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS shall be capable of adjusting the transmitter output power to minimize the interference level on the adjacent channels licensed to other operators in the same geographical area while optimize the Home BS coverage. These requirements are only applicable to Home BS. The requirements in this clause are applicable for AWGN radio propagation conditions.
The output power, Pout, of the E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS shall be as specified in Table 6.2.3-1 under the following input conditions:
-	CPICH Êc, measured in dBm, is the code power of the Primary CPICH on one of the adjacent channels present at the Home BS antenna connector for the CPICH received on the adjacent channels. If Tx diversity is applied on the Primary CPICH, CPICH Êc shall be the sum in [W] of the code powers of the Primary CPICH transmitted from each antenna. 
-	Ioh, measured in dBm, is the total received power density, including signals and interference but excluding the own Home BS signal, present at the Home BS antenna connector on the Home BS operating channel.
In case that both adjacent channels are licensed to other operators, the most stringent limit shall apply for Pout. In the case when one of the adjacent channels is licensed to an E-UTRA operator while the other adjacent channel is licensed to an UTRA operator, the more stringent limit of this subclause and subclause 6.2.4 shall apply for Pout. In case the Home BS’s operating channel and both adjacent channels are licensed to the same operator, the requirements of this clause do not apply.
The input conditions defined for the requirements in this section are specified at the antenna connector of the Home BS. For Home BS receivers with diversity, the requirements apply to each antenna connector separately, with the other one(s) terminated or disabled. The requirements are otherwise unchanged. For Home BS(s) without measurement capability, a reference antenna with a gain of 0 dBi is assumed for converting these power levels into field strength requirements.
Table 6.2.3-1: Home BS output power for adjacent operator UTRA channel protection
Note 1:	The Home BS transmitter output power specified in Table 6.2.3-1 assumes a Home BS reference antenna gain of 0 dBi, an target outage zone of 47dB around the Home BS for an UE on the adjacent channel, with an allowance of 2 dB for measurement errors, an ACIR of 33 dB, an adjacent channel UE CPICH Ec/Io target of -18 dB and the same CPICH Êc value at the adjacent channel UE as for the Home BS.
Note 2:	For CPICH Êc < -105dBm, the requirements in subclauses 6.2.1 and 6.2.2 apply.
Note 3:	The output power Pout is the sum transmit power across all the antennas of the Home BS, with each transmit power measured at the respective antenna connectors.
6.2.4	Home BS output power for adjacent E-UTRA channel protection
The E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS shall be capable of adjusting the transmitter output power to minimize the interference level on the adjacent channels licensed to other operators in the same geographical area while optimize the Home BS coverage. These requirements are only applicable to Home BS. The requirements in this clause are applicable for AWGN radio propagation conditions.
The output power, Pout, of the E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS shall be as specified in Table 6.2. 4-1 under the following input conditions:
-	CRS Ês, measured in dBm, is the Reference Signal Received Power per resource element on one of the adjacent channels present at the Home BS antenna connector for the Reference Signal received on the adjacent channels. For CRS Ês determination, the cell-specific reference signal R0 according TS 36.211 [3] shall be used. If the Home BS can reliably detect that multiple TX antennas are used for transmission on the adjacent channel, it may use the average in [W] of the CRS Ês on all detected antennas. 
-	Ioh, measured in dBm, is the total received power density, including signals and interference but excluding the own Home BS signal, present at the Home BS antenna connector on the Home BS operating channel.
In case that both adjacent channels are licensed to other operators, the most stringent limit shall apply for Pout. In the case when one of the adjacent channels is licensed to an E-UTRA operator while the other adjacent channel is licensed to an UTRA operator, the more stringent limit of this subclause and subclause 6.2.3 shall apply for Pout. In case the E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS’s operating channel and both adjacent channels are licensed to the same operator, the requirements of this clause do not apply.
The input conditions defined for the requirements in this section are specified at the antenna connector of the Home BS. For E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS receivers with diversity, the requirements apply to each antenna connector separately, with the other one(s) terminated or disabled. The requirements are otherwise unchanged. For Home BS(s) without measurement capability, a reference antenna with a gain of 0 dBi is assumed for converting these power levels into field strength requirements.
Table 6.2. 4-1: Home BS output power for adjacent operator E-UTRA channel protection
Note 1:	The E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS transmitter output power specified in Table 6.2. 4-1 assumes a Home BS reference antenna gain of 0 dBi, an target outage zone of 47dB around the Home BS for an UE on the adjacent channel, with an allowance of 2 dB for measurement errors, an ACIR of 30 dB, an adjacent channel UE Ês/Iot target of -6 dB and the same CRS Ês value at the adjacent channel UE as for the Home BS.
Note 2:	For CRS Ês < -127dBm, the requirements in subclauses 6.2.1 and 6.2.2 apply.
Note 3:	The output power Pout is the sum transmit power across all the antennas of the Home BS, with each transmit power measured at the respective antenna connectors.
Note 4:	 is the number of downlink resource blocks in the own E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS channel.
Note 5:	 is the number of subcarriers in a resource block, .
6.2.5	Home BS Output Power for co-channel E-UTRA protection
To minimize the co-channel DL interference to non-CSG macro UEs operating in close proximity while optimizing the CSG Home BS coverage, E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS may adjust its output power according to the requirements set out in this clause. These requirements are only applicable to E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS. The requirements in this clause are applicable for AWGN radio propagation conditions.
For E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS that supports the requirements in this clause, the output power, Pout, of the Home BS shall be as specified in Table 6.2.5-1 under the following input conditions:
-	CRS Ês, measured in dBm, is the Reference Signal Received Power per resource element present at the Home BS antenna connector received from the co-channel Wide Area BS. For CRS Ês determination, the cell-specific reference signal R0 according TS 36.211 [10] shall be used. If the Home BS can reliably detect that multiple TX antenna ports are used for transmission by the co-channel Wide Area Base Station, it may use the average in [W] of the CRS Ês on all detected TX antenna ports, including R0.
-	Ioh, measured in dBm, is the total received DL power, including all interference but excluding the own Home BS signal, present at the Home BS antenna connector on the Home BS operating channel.
-	Iob, measured in dBm, is the uplink received interference power, including thermal noise, within one physical resource block’s bandwidth of resource elements as defined in TS 36.214, present at the Home BS antenna connector on the Home BS operating channel.
The input conditions defined for the requirements in this section are specified at the antenna connector of the Home BS. For E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS receivers with diversity, the requirements apply to each antenna connector separately, with the other one(s) terminated or disabled. The requirements are otherwise unchanged. For E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS(s) without measurement capability, a reference antenna with a gain of 0 dBi is assumed for converting these power levels into field strength requirements.
Table 6.2.5-1: Home BS output power for co-channel E-UTRA channel protection
Note 1:	Only the option supported by the E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS shall be tested.
Note 2:	For CRS Ês < -127dBm, or Iob ≤ -103 dBm when Option 2 is supported, the requirements in sub-clauses 6.2.1 and 6.2.2 apply.
Note 3:	The output power, Pout, is the sum of transmits power across all the antennas of the Home BS, with each transmit power measured at the respective antenna connectors.
Note 4:	 is the number of downlink resource blocks in the own E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS channel.
Note 5:	 is the number of subcarriers in a resource block, .
Note 6:	X is a network configurable parameter.
Note 7:	Pmin can be lower dependent on the E-UTRA or E-UTRA with NB-IoT or NB-IoT Home BS total dynamic range.
Note 8:	Other input conditions and output power to be applied for network scenarios other than co-channel E-UTRA macro channel protection shall not be precluded.
6.3	Output power dynamics
The requirements in subclause 6.3 apply during the transmitter ON period. Transmit signal quality (as specified in subclause 6.5) shall be maintained for the output power dynamics requirements of this Clause.
Power control is used to limit the interference level.
6.3.1	RE Power control dynamic range
The RE power control dynamic range is the difference between the power of an RE and the average RE power for a BS at maximum output power for a specified reference condition.
6.3.1.1	Minimum requirements
RE power control dynamic range:
Table 6.3.1.1-1 E-UTRA BS RE power control dynamic range
6.3.2	Total power dynamic range
The total power dynamic range is the difference between the maximum and the minimum transmit power of an OFDM symbol for a specified reference condition.
NOTE 1:	The upper limit of the dynamic range is the OFDM symbol power for a BS at maximum output power. The lower limit of the dynamic range is the OFDM symbol power for a BS when one resource block is transmitted. The OFDM symbol shall carry PDSCH or sPDSCH and not contain RS, PBCH or synchronisation signals.
NOTE 2:	The requirement does not apply to Band 46.
6.3.2.1	Minimum requirements
The downlink (DL) total power dynamic range for each E-UTRA carrier shall be larger than or equal to the level in Table 6.3.2.1-1.
Table 6.3.2.1-1 E-UTRA BS total power dynamic range
6.3.3	NB-IoT RB power dynamic range for in-band or guard band operation
The NB-IoT RB power dynamic range (or NB-IoT power boosting) for guard band operation is the difference between the power of NB-IoT RB (which occupies 180kHz in guard band of an E-UTRA carrier) and the average power over all RBs (from both NB-IoT and the E-UTRA carrier containing the NB-IoT RB).
The NB-IoT RB power dynamic range (or NB-IoT power boosting) for in-band operation is the difference between the average power of NB-IoT REs (which occupy certain REs in a RB of an E-UTRA carrier) and the average power over all REs (from both NB-IoT and the E-UTRA carrier containing the NB-IoT REs).
6.3.3.1	Minimum Requirement
NB-IoT power dynamic range shall be larger than or equal to +6dB, except for guard band operation with E-UTRA 5 MHz channel bandwidth signal where BS manufacturer shall declare the NB-IoT dynamic range power it could support. (in this version of the specification).
The +6 dB power dynamic range is only required for one NB-IoT RB for both in-band and guard band operation modes.
For guard band operation, this NB-IoT RB should be placed adjacent to the E-UTRA RB edge as close as possible (i.e., away from edge of channel bandwidth).
6.4	Transmit ON/OFF power
The requirements in subclause 6.4 are only applied for E-UTRA, E-UTRA with NB-IoT and NB-IoT TDD BS.
Transmitter OFF power
Transmitter OFF power is defined as the mean power measured over 70 us filtered with a square filter of bandwidth equal to the transmission bandwidth configuration of the BS (BWConfig) centred on the assigned channel frequency during  the transmitter OFF period.
For BS supporting intra-band contiguous CA, the transmitter OFF power is defined as the mean power measured over 70 us filtered with a square filter of bandwidth equal to the Aggregated Channel Bandwidth BWChannel_CA centred on (Fedge_high+Fedge_low)/2 during the transmitter OFF period.
.1	Minimum Requirement
The transmitter OFF power spectral density shall be less than -85dBm/MHz.
For BS capable of multi-band operation, the requirement is only applicable during the transmitter OFF period in all supported operating bands.
6.4.2	Transmitter transient period
The transmitter transient period is the time period during which the transmitter is changing from the OFF period to the ON period or vice versa. The transmitter transient period is illustrated in Figure 6.4.2-1.
Figure 6.4.2-1 Illustration of the relations of transmitter ON period, transmitter OFF period and transmitter transient period.
6.4.2.1	Minimum requirements
The transmitter transient period shall be shorter than the values listed in Table 6.4.2.1-1.
Table 6.4.2.1-1 Minimum requirements for the transmitter transient period
6.5	Transmitted signal quality
The requirements in subclause 6.5 apply to the transmitter ON period.
6.5.1	Frequency error
Frequency error is the measure of the difference between the actual BS transmit frequency and the assigned frequency. The same source shall be used for RF frequency and data clock generation.
6.5.1.1	Minimum requirement
For E-UTRA, the modulated carrier frequency of each E-UTRA carrier configured by the BS shall be accurate to within the accuracy range given in Table -1 observed over a period of one subframe (1ms).
For NB-IoT, the modulated carrier frequency of each NB-IoT carrier configured by the BS shall be accurate to within the accuracy range given in Table 6.5.1-1 observed over a period of one subframe (1ms).
Table 6.5.1-1:  Frequency error minimum requirement
6.5.2	Error Vector Magnitude
The Error Vector Magnitude is a measure of the difference between the ideal symbols and the measured symbols after the equalization. This difference is called the error vector. The equaliser parameters are estimated as defined in Annex E. The EVM result is defined as the square root of the ratio of the mean error vector power to the mean reference power expressed in percent.
For E-UTRA, for all bandwidths, the EVM measurement shall be performed for each E-UTRA carrier over all allocated resource blocks and downlink subframes within 10ms measurement periods for subframe TTI, and over all allocated resource blocks and downlink sTTIs within 10ms measurement periods for sTTI. The boundaries of the EVM measurement periods need not be aligned with radio frame boundaries. The EVM value is then calculated as the mean square root of the measured values. The EVM of each E-UTRA carrier for different modulation schemes on PDSCH or sPDSCH shall be better than the limits in table 6.5.2-1:
Table 6.5.2-1: EVM requirements for E-UTRA carrier
For NB-IoT, for all bandwidths, the EVM measurement shall be performed for each NB-IoT carrier over all allocated resource and downlink subframes within 10ms measurement periods. The boundaries of the EVM measurement periods need not be aligned with radio frame boundaries. The EVM value is then calculated as the mean square root of the measured values. The EVM of each NB-IoT carrier on NB-PDSCH shall be better than the limits in Table 6.5.2-2:
Table 6.5.2-2: EVM requirements for NB-IoT carrier
6.5.3	Time alignment error
This requirement applies to frame timing in TX diversity, MIMO transmission, carrier aggregation and their combinations.
Frames of the LTE signals present at the BS transmitter antenna port(s) are not perfectly aligned in time. In relation to each other, the RF signals present at the BS transmitter antenna port(s) experience certain timing differences.
For a specific set of signals/transmitter configuration/transmission mode, time alignment error (TAE) is defined as the largest timing difference between any two signals.
6.5.3.1	Minimum Requirement
For E-UTRA:
-	For MIMO or TX diversity transmissions, at each carrier frequency, TAE shall not exceed 65 ns.
-	For intra-band contiguous carrier aggregation, with or without MIMO or TX diversity, TAE shall not exceed 130 ns.
-	For intra-band non-contiguous carrier aggregation, with or without MIMO or TX diversity, TAE shall not exceed 260 ns.
-	For inter-band carrier aggregation, with or without MIMO or TX diversity, TAE shall not exceed 260ns.
For NB-IoT:
-	For TX diversity transmissions, at each carrier frequency, TAE shall not exceed 65 ns.
6.5.4	DL RS power
For E-UTRA, DL RS power is the resource element power of the Downlink Reference Symbol.
The absolute DL RS power is indicated on the DL-SCH. The absolute accuracy is defined as the maximum deviation between the DL RS power indicated on the DL-SCH and the DL RS power of each E-UTRA carrier at the BS antenna connector.
For NB-IoT, DL NRS power is the resource element power of the Downlink Narrow-band Reference Signal.
The absolute DL NRS power is indicated on the DL-SCH. The absolute accuracy is defined as the maximum deviation between the DL NRS power indicated on the DL-SCH and the DL NRS power of each NB-IoT carrier at the BS antenna connector.
6.5.4.1	Minimum requirements
For E-UTRA, DL RS power of each E-UTRA carrier shall be within  2.1 dB of the DL RS power indicated on the DL-SCH.
For NB-IoT, DL NRS power of each NB-IoT carrier shall be within  2.1 dB of the DL NRS power indicated on the DL-SCH.
6.6	Unwanted emissions
Unwanted emissions consist of out-of-band emissions and spurious emissions [2]. Out of band emissions are unwanted emissions immediately outside the channel bandwidth resulting from the modulation process and non-linearity in the transmitter but excluding spurious emissions. Spurious emissions are emissions which are caused by unwanted transmitter effects such as harmonics emission, parasitic emission, intermodulation products and frequency conversion products, but exclude out of band emissions.
The out-of-band emissions requirement for the BS transmitter is specified both in terms of Adjacent Channel Leakage power Ratio (ACLR) and Operating band unwanted emissions. The Operating band unwanted emissions define all unwanted emissions in each supported downlink operating band plus the frequency ranges 10 MHz above and 10 MHz below each band. Unwanted emissions outside of this frequency range are limited by a spurious emissions requirement.
For a BS supporting multi-carrier or intra-band contiguous CA, the unwanted emissions requirements apply to channel bandwidths of the outermost carrier larger than or equal to 5 MHz.
There is in addition a requirement for occupied bandwidth.
6.6.1	Occupied bandwidth
The occupied bandwidth is the width of a frequency band such that, below the lower and above the upper frequency limits, the mean powers emitted are each equal to a specified percentage /2 of the total mean transmitted power. See also ITU-R Recommendation SM.328 [5].
The value of /2 shall be taken as 0.5%.
The requirement applies during the transmitter ON period.
6.6.1.1	Minimum requirement
For E-UTRA, the occupied bandwidth for each E-UTRA carrier shall be less than the channel bandwidth as defined in Table 5.6-1. For intra-band contiguous CA, the occupied bandwidth shall be less than or equal to the Aggregated Channel Bandwidth as defined in subclause 5.6. For Band 46 operation in Japan, the occupied bandwidth for each 20MHz channel bandwidth E-UTRA carrier assigned within 5150-5350 MHz and 5470-5725 MHz shall be less than or equal to 19 MHz and 19.7MHz respectively.
For NB-IoT in-band operation, the occupied bandwidth for each E-UTRA carrier with NB-IoT shall be less than the channel bandwidth as defined in Table 5.6-1.
For NB-IoT guard band operation, the occupied bandwidth for each E-UTRA carrier with NB-IoT shall be less than the channel bandwidth as defined in Table 5.6-1 for channel bandwidth larger than or equal to 5 MHz.
For NB-IoT standalone operation, the occupied bandwidth for each NB-IoT carrier shall be less than the channel bandwidth as defined in Table 5.6-3.
6.6.2	Adjacent Channel Leakage power Ratio (ACLR)
Adjacent Channel Leakage power Ratio (ACLR) is the ratio of the filtered mean power centred on the assigned channel frequency to the filtered mean power centred on an adjacent channel frequency.
The requirements shall apply outside the Base Station RF Bandwidth or Radio Bandwidth whatever the type of transmitter considered (single carrier or multi-carrier) and for all transmission modes foreseen by the manufacturer's specification.
For a E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band) BS operating in non-contiguous spectrum, the ACLR also applies for the first adjacent channel inside any sub-block gap with a gap size Wgap ≥ 15MHz or Wgap ≥ 60MHz for Band 46. The ACLR requirement for the second adjacent channel applies inside any sub-block gap with a gap size Wgap ≥ 20 MHz or Wgap ≥ 80MHz for Band 46. The CACLR requirement in subclause 6.6.2.2 applies in sub block gaps for the frequency ranges defined in Table 6.6.2.2-1/2/2a.
For a E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band) BS operating in multiple bands, where multiple bands are mapped onto the same antenna connector, the ACLR also applies for the first adjacent channel inside any Inter RF Bandwidth gap with a gap size Wgap ≥ 15MHz. The ACLR requirement for the second adjacent channel applies inside any Inter RF Bandwidth gap with a gap size Wgap ≥ 20 MHz. The CACLR requirement in subclause 6.6.2.2 applies in Inter RF Bandwidth gaps for the frequency ranges defined in Table 6.6.2.2-1/2.
The requirement applies during the transmitter ON period.
6.6.2.1	Minimum requirement
The ACLR is defined with a square filter of bandwidth equal to the transmission bandwidth configuration of the transmitted signal (BWConfig) centred on the assigned channel frequency and a filter centred on the adjacent channel frequency according to the tables below.
For Category A Wide Area BS, either the ACLR limits in the tables below or the absolute limit of -13dBm/MHz shall apply, whichever is less stringent.
For Category B Wide Area BS, either the ACLR limits in the tables below or the absolute limit of -15dBm/MHz shall apply, whichever is less stringent.
For Medium Range BS, either the ACLR limits in the tables below or the absolute limit of -25 dBm/MHz shall apply, whichever is less stringent.
For Local Area BS, either the ACLR limits in the tables below or the absolute limit of -32dBm/MHz shall apply, whichever is less stringent.
For Home BS, either the ACLR limits in the tables below or the absolute limit of -50dBm/MHz shall apply, whichever is less stringent.
The ACLR requirements in Tables 6.6.2.1-1 to 6.6.2.1-4 (except Table 6.6.2.1-2b) apply to BS that supports E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band), in any operating band except for Band 46. The ACLR requirements for Band 46 are in Table 6.6.2.1-2a and 6.6.2.1-5. The ACLR requirements in Table 6.6.2.1-2b and 6.6.2.1-6 apply to BS that supports standalone NB-IoT.
For operation in paired spectrum, the ACLR shall be higher than the value specified in Table 6.6.2.1-1.
Table 6.6.2.1-1: Base Station ACLR in paired spectrum
For operation in unpaired spectrum, the ACLR shall be higher than the value specified in Table 6.6.2.1-2.
Table 6.6.2.1-2: Base Station ACLR in unpaired spectrum with synchronized operation
For operation in Band 46, the ACLR shall be higher than the value specified in Table 6.6.2.1-2a.
Table 6.6.2.1-2a: Base Station ACLR in Band 46
For standalone NB-IoT operation in paired spectrum, the ACLR shall be higher than the value specified in Table 6.6.2.1-2b.
Table 6.6.2.1-2b: Base Station ACLR for standalone NB-IoT operation in paired spectrum
For operation in non-contiguous paired spectrum or multiple bands, the ACLR shall be higher than the value specified in Table 6.6.2.1-3.
Table 6.6.2.1-3: Base Station ACLR in non-contiguous paired spectrum or multiple bands
For operation in non-contiguous unpaired spectrum or multiple bands, the ACLR shall be higher than the value specified in Table 6.6.2.1-4.
Table 6.6.2.1-4: Base Station ACLR in non-contiguous unpaired spectrum or multiple bands
For operation in non-contiguous spectrum in Band 46, the ACLR shall be higher than the value specified in Table 6.6.2.1-5.
Table 6.6.2.1-5: Base Station ACLR in non-contiguous spectrum in Band 46
6.6.2.2	Cumulative ACLR requirement in non-contiguous spectrum
The following requirement applies for the sub-block or Inter RF Bandwidth gap sizes listed in Table 6.6.2.2-1/2/2a,
-	Inside a sub-block gap within an operating band for a BS operating in non-contiguous spectrum.
-	Inside an Inter RF Bandwidth gap for a BS operating in multiple bands, where multiple bands are mapped on the same antenna connector.
The Cumulative Adjacent Channel Leakage power Ratio (CACLR) in a sub-block gap or the Inter RF Bandwidth gap is the ratio of:
a)	the sum of the filtered mean power centred on the assigned channel frequencies for the two carriers adjacent to each side of the sub-block gap or the Inter RF Bandwidth gap, and
b)	the filtered mean power centred on a frequency channel adjacent to one of the respective sub-block edges or Base Station RF Bandwidth edges.
The assumed filter for the adjacent channel frequency is defined in Table 6.6.2.2-1/2/2a and the filters on the assigned channels are defined in Table 6.6.2.2-3.
For Wide Area Category A BS, either the CACLR limits in Table 6.6.2.2-1/2 or the absolute limit of -13dBm/MHz shall apply, whichever is less stringent.
For Wide Area Category B BS, either the CACLR limits in Table 6.6.2.2-1/2 or the absolute limit of -15dBm/MHz shall apply, whichever is less stringent.
For Medium Range BS, either the CACLR limits in Table 6.6.2.2-1/2/2a or the absolute limit of -25 dBm/MHz shall apply, whichever is less stringent.
For Local Area BS, either the CACLR limits in Table 6.6.2.2-1/2/2a or the absolute limit of -32 dBm/MHz shall apply, whichever is less stringent.
The ACLR requirements in Tables 6.6.2.2-1 and 6.6.2.2-2 apply to BS that supports E-UTRA, in any operating band except for Band 46. The ACLR requirements for Band 46 are in Table 6.6.2.2-2a.
For operation in non-contiguous spectrum or multiple bands, the CACLR for E-UTRA carriers located on either side of the sub-block gap or the Inter RF Bandwidth gap shall be higher than the value specified in Table 6.6.2.2-1/2.
Table 6.6.2.2-1: Base Station CACLR in non-contiguous paired spectrum or multiple bands
Table 6.6.2.2-2: Base Station CACLR in non-contiguous unpaired spectrum or multiple bands
For operation in non-contiguous spectrum in Band 46, the CACLR for E-UTRA carriers located on either side of the sub-block gap shall be higher than the value specified in Table 6.6.2.2-2a.
Table 6.6.2.2-2a: Base Station CACLR in non-contiguous spectrum in Band 46
Table 6.6.2.2-3: Filter parameters for the assigned channel
6.6.3	Operating band unwanted emissions
Unless otherwise stated, the Operating band unwanted emission limits are defined from 10 MHz below the lowest frequency of each supported downlink operating band up to 10 MHz above the highest frequency of each supported downlink operating band.
The requirements shall apply whatever the type of transmitter considered (single carrier or multi-carrier) and for all transmission modes foreseen by the manufacturer's specification. In addition, for a BS operating in non-contiguous spectrum, the requirements apply inside any sub-block gap. In addition, for a BS operating in multiple bands, the requirements apply inside any Inter RF Bandwidth gap.
For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the single-band requirements apply and the cumulative evaluation of the emission limit in the Inter RF Bandwidth gap are not applicable.
For a BS supporting E-UTRA with NB-IoT guard band operation, the Operating band unwanted emissions requirements apply to E-UTRA carrier with channel bandwidth larger than or equal to 5 MHz.
The unwanted emission limits in the part of the downlink operating band that falls in the spurious domain are consistent with ITU-R Recommendation SM.329 [2].
Emissions shall not exceed the maximum levels specified in the tables below, where:
-	f is the separation between the Base Station RF Bandwidth edge frequency and the nominal -3dB point of the measuring filter closest to the carrier frequency.
-	f_offset is the separation between the Base Station RF Bandwidth edge frequency and the centre of the measuring filter.
-	f_offsetmax is the offset to the frequency 10 MHz outside the downlink operating band.
-	fmax is equal to f_offsetmax minus half of the bandwidth of the measuring filter.
For E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band) BS operating in multiple bands, inside any Inter RF Bandwidth gaps with Wgap < 20 MHz, emissions shall not exceed the cumulative sum of the minimum requirements specified at the Base Station RF Bandwidth edges on each side of the Inter RF Bandwidth gap. The minimum requirement for Base Station RF Bandwidth edge is specified in Tables 6.6.3.1-1 to 6.6.3.3-3 below, where in this case:
-	f is the separation between the Base Station RF Bandwidth edge frequency and the nominal -3 dB point of the measuring filter closest to the Base Station RF Bandwidth edge.
-	f_offset is the separation between the Base Station RF Bandwidth edge frequency and the centre of the measuring filter.
-	f_offsetmax is equal to the Inter RF Bandwidth gap minus half of the bandwidth of the measuring filter.
-	fmax is equal to f_offsetmax minus half of the bandwidth of the measuring filter.
For BS capable of multi-band operation where multiple bands are mapped on the same antenna connector, the operating band unwanted emission limits apply also in a supported operating band without any carrier transmitted, in the case where there are carrier(s) transmitted in other supported operating band(s). In this case where there is no carrier transmitted in an operating band, the operating band unwanted emission limit, as defined in the tables of the present subclause for the largest frequency offset (fmax), of a band where there is no carrier transmitted shall apply from 10 MHz below the lowest frequency, up to 10 MHz above the highest frequency of the supported downlink operating band without any carrier transmitted. And no cumulative limit is applied in the inter-band gap between a supported downlink operating band with carrier(s) transmitted and a supported downlink operating band without any carrier transmitted.
For a multicarrier E-UTRA BS or BS configured for intra-band contiguous or non-contiguous carrier aggregation the definitions above apply to the lower edge of the carrier transmitted at the lowest carrier frequency and the upper edge of the carrier transmitted at the highest carrier frequency within a specified frequency band.
In addition inside any sub-block gap for a BS operating in non-contiguous spectrum, emissions shall not exceed the cumulative sum of the minimum requirements specified for the adjacent sub blocks on each side of the sub block gap. The minimum requirement for each sub block is specified in Tables 6.6.3.1-1 to 6.6.3.3-3 below, where in this case:
-	f is the separation between the sub block edge frequency and the nominal -3 dB point of the measuring filter closest to the sub block edge.
-	f_offset is the separation between the sub block edge frequency and the centre of the measuring filter.
-	f_offsetmax is equal to the sub block gap bandwidth minus half of the bandwidth of the measuring filter.
-	fmax is equal to f_offsetmax minus half of the bandwidth of the measuring filter.
For Wide Area BS, the requirements of either subclause 6.6.3.1 (Category A limits) or subclause 6.6.3.2 (Category B limits) shall apply.
For Local Area BS, the requirements of subclause 6.6.3.2A shall apply (Category A and B).
For Home BS, the requirements of subclause .2B shall apply (Category A and B).
For Medium Range BS, the requirements in subclause 6.6.3.2C shall apply (Category A and B).
The application of either Category A or Category B limits shall be the same as for Transmitter spurious emissions (Mandatory Requirements) in subclause 6.6.4.1.
The requirements of subclauses 6.6.3.1 and 6.6.3.2 apply to Wide Area BS that supports E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band). The requirements for Wide Area BS that supports NB-IoT standalone are in subclause 6.6.3.2E.
The requirements of subclauses 6.6.3.2A apply to Local Area BS that supports E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band). The requirements for Local Area BS that supports NB-IoT standalone are in subclause 6.6.3.2F.
The requirements of subclauses 6.6.3.2B apply to Home BS that supports E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band). The requirements for Home BS that supports NB-IoT standalone are in subclause 6.6.3.2G.
The requirements of subclauses 6.6.3.2C apply to Medium Range BS that supports E-UTRA or  E-UTRA with NB-IoT (in-band and/or guard band). The requirements for Medium Range BS that supports NB-IoT standalone are in subclause 6.6.3.2H.
6.6.3.1	Minimum requirements for Wide Area BS (Category A)
For E-UTRA BS operating in Bands 5, 6, 8, 12, 13, 14, 17, 18, 19, 26, 27, 28, 29, 31, 44, 68, 71, 72, 73, 85 emissions shall not exceed the maximum levels specified in Tables 6.6.3.1-1 to 6.6.3.1-3.
Table 6.6.3.1-1: Wide Area BS operating band unwanted emission limits for 1.4 MHz channel bandwidth (E-UTRA bands <1GHz) for Category A
Table 6.6.3.1-2: Wide Area BS operating band unwanted emission limits for 3 MHz channel bandwidth (E-UTRA bands <1GHz) for Category A
Table 6.6.3.1-3: Wide Area BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth (E-UTRA bands <1GHz) for Category A
For E-UTRA BS operating in Bands 1, 2, 3, 4, 7, 9, 10, 11, 21, 22, 23, 24, 25, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 48, 50, 52, 65, 66, 69, 70, 74, 75 emissions shall not exceed the maximum levels specified in Tables 6.6.3.1-4 to 6.6.3.1-6:
Table 6.6.3.1-4: Wide Area BS operating band unwanted emission limits for 1.4 MHz channel bandwidth (E-UTRA bands >1GHz) for Category A
Table 6.6.3.1-5: Wide Area BS operating band unwanted emission limits for 3 MHz channel bandwidth (E-UTRA bands >1GHz) for Category A
Table 6.6.3.1-6: Wide Area BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth (E-UTRA bands >1GHz) for Category A
6.6.3.2	Minimum requirements for Wide Area BS (Category B)
For Category B Operating band unwanted emissions, there are two options for the limits that may be applied regionally. Either the limits in subclause 6.6.3.2.1 or subclause 6.6.3.2.2 shall be applied.
6.6.3.2.1	Category B requirements (Option 1)
For E-UTRA BS operating in Bands 5, 8, 12, 13, 14, 17, 20, 26, 27, 28, 29, 31, 44, 68, 67, 71, 72, 73, 85 emissions shall not exceed the maximum levels specified in Tables 6.6.3.2.1-1 to 6.6.3.2.1-3:
Table 6.6.3.2.1-1: Wide Area BS operating band unwanted emission limits for 1.4 MHz channel bandwidth (E-UTRA bands <1GHz) for Category B
Table 6.6.3.2.1-2: Wide Area BS operating band unwanted emission limits for 3 MHz channel bandwidth (E-UTRA bands <1GHz) for Category B
Table 6.6.3.2.1-3: Wide Area BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth (E-UTRA bands <1GHz) for Category B
For E-UTRA BS operating in Bands 1, 2, 3, 4, 7, 10, 22, 25, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 48, 50, 52, 65, 66, 69, 70, 75 emissions shall not exceed the maximum levels specified in Tables 6.6.3.2.1-4 to 6.6.3.2.1-6:
Table 6.6.3.2.1-4: Wide Area BS operating band unwanted emission limits for 1.4 MHz channel bandwidth (E-UTRA bands >1GHz) for Category B
Table 6.6.3.2.1-5: Wide Area BS operating band unwanted emission limits for 3 MHz channel bandwidth (E-UTRA bands >1GHz) for Category B
Table 6.6.3.2.1-6: Wide Area BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth (E-UTRA bands >1GHz) for Category B
6.6.3.2.2	Category B (Option 2)
The limits in this subclause are intended for Europe and may be applied regionally for BS operating in band 1, 3, 8, 32, 33, 34 or 65.
For a BS operating in band 1, 3, 8, 32, 33, 34 or 65 emissions shall not exceed the maximum levels specified in Table 6.6.3.2.2-1 below for 5, 10, 15 and 20 MHz channel bandwidth:
Table 6.6.3.2.2-1: Regional Wide Area BS operating band unwanted emission limits in band 1, 3, 8, 32, 33, 34 or 65 for 5, 10, 15 and 20 MHz channel bandwidth for Category B
For a BS operating in band 3, 8 or 65, emissions shall not exceed the maximum levels specified in Table 6.6.3.2.2-2 below for 3 MHz channel bandwidth:  
Table 6.6.3.2.2-2: Regional Wide Area BS operating band unwanted emission limits in band 3, 8 or 65 for 3 MHz channel bandwidth for Category B
For a BS operating in band 3, 8 or 65, emissions shall not exceed the maximum levels specified in Table 6.6.3.2.2-3 below for 1.4 MHz channel bandwidth:
Table 6.6.3.2.2-3: Regional Wide Area BS operating band unwanted emission limits in band 3, 8 or 65 for 1.4 MHz channel bandwidth for Category B
6.6.3.2A	Minimum requirements for Local Area BS (Category A and B)
For Local Area BS, emissions shall not exceed the maximum levels specified in Tables 6.6.3.2A-1 to 6.6.3.2A-3.
Table 6.6.3.2A-1: Local Area BS operating band unwanted emission limits for 1.4 MHz channel bandwidth
Table 6.6.3.2A-2: Local Area BS operating band unwanted emission limits for 3 MHz channel bandwidth
Table 6.6.3.2A-3: Local Area BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth
.2B	Minimum requirements for Home BS (Category A and B)
For Home BS, emissions shall not exceed the maximum levels specified in Tables .2B-1 to 6.6.3.2B-3.
Table .2B-1: Home BS operating band unwanted emission limits for 1.4 MHz channel bandwidth
Table .2B-2: Home BS operating band unwanted emission limits for 3 MHz channel bandwidth
Table .2B-3: Home BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth
6.6.3.2C	Minimum requirements for Medium Range BS (Category A and B)
For Medium Range BS, emissions shall not exceed the maximum levels specified in Tables 6.6.3.2C-1 to 6.6.3.2C-6.
Table 6.6.3.2C-1: Medium Range BS operating band unwanted emission limits for 1.4 MHz channel bandwidth, 31 < Prated,c  38 dBm
Table 6.6.3.2C-2: Medium Range BS operating band unwanted emission limits for 1.4 MHz channel bandwidth, Prated,c  31 dBm
Table 6.6.3.2C-3: Medium Range BS operating band unwanted emission limits for 3 MHz channel bandwidth, 31 < Prated,c  38 dBm
Table 6.6.3.2C-4: Medium Range BS operating band unwanted emission limits for 3 MHz channel bandwidth, Prated,c  31 dBm
Table 6.6.3.2C-5: Medium Range BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth, 31< Prated,c  38 dBm
Table 6.6.3.2C-6: Medium Range BS operating band unwanted emission limits for 5, 10, 15 and 20 MHz channel bandwidth, Prated,c  31 dBm
6.6.3.2D	Minimum requirements for Local Area and Medium Range BS in Band 46 (Category A and B)
For Local Area and Medium Range BS operating in Band 46, emissions shall not exceed the maximum levels specified in Tables 6.6.3.2D-1 and Tables 6.6.3.2D-2.
Table 6.6.3.2D-1: Local Area and Medium Range BS operating band unwanted emission limits in Band 46 for 20MHz channel bandwidth
Table 6.6.3.2D-2: Local Area and Medium Range BS operating band unwanted emission limits in Band 46 for 10MHz channel bandwidth
6.6.3.2E	Minimum requirements for standalone NB-IoT Wide Area BS
For standalone NB-IoT BS, emissions shall not exceed the maximum levels specified in Tables 6.6.3.2E-1.
Table 6.6.3.2E-1: Standalone NB-IoT BS operating band unwanted emission limits
6.6.3.2F	Minimum requirements for standalone NB-IoT Local Area BS
For standalone NB-IoT local area BS, emissions shall not exceed the maximum levels specified in Tables 6.6.3.2H-1.
Table 6.6.3.2F-1: Standalone NB-IoT local area BS operating band unwanted emission limits
.2G	Minimum requirements for standalone NB-IoT Home BS (Category A and B)
For standalone NB-IoT Home BS, emissions shall not exceed the maximum levels specified in Table .2G-1.
Table .2G-1: Standalone NB-IoT Home BS operating band unwanted emission limits (E-UTRA bands ≤3GHz)
6.6.3.2H	Minimum requirements for standalone NB-IoT Medium Range BS
For standalone NB-IoT medium range BS (maximum output power 31 < Prated,c  38 dBm), emissions shall not exceed the maximum levels specified in Tables 6.6.3.2H-1.
Table 6.6.3.2H-1: Standalone NB-IoT medium range BS operating band unwanted emission limits, BS maximum output power 31 < Prated,c  38 dBm
For standalone NB-IoT medium range BS (maximum output power Prated,c  31 dBm), emissions shall not exceed the maximum levels specified in Tables 6.6.3.2H-2.
Table 6.6.3.2H-2: Standalone NB-IoT medium range BS operating band unwanted emission limits, BS maximum output power Prated,c  31 dBm
6.6.3.3	Additional requirements
These requirements may be applied for the protection of other systems operating inside or near each supported E-UTRA, E-UTRA with NB-IoT and NB-IoT BS downlink operating band. The limits may apply as an optional protection of such systems that are deployed in the same geographical area as the E-UTRA, E-UTRA with NB-IoT and NB-IoT BS, or they may be set by local or regional regulation as a mandatory requirement for an E-UTRA operating band. It is in some cases not stated in the present document whether a requirement is mandatory or under what exact circumstances that a limit applies, since this is set by local or regional regulation. An overview of regional requirements in the present document is given in subclause 4.3.
In certain regions the following requirement may apply. For E-UTRA, E-UTRA with NB-IoT and NB-IoT BS operating in Bands 5, 26, 27 or 28, emissions shall not exceed the maximum levels specified in Tables 6.6.3.3-1.
Table 6.6.3.3-1: Additional operating band unwanted emission limits for E-UTRA bands <1GHz
In certain regions the following requirement may apply. For E-UTRA, E-UTRA with NB-IoT and NB-IoT BS operating in Bands 2, 4, 10, 23, 25, 30, 35, 36, 41, 66, 70, emissions shall not exceed the maximum levels specified in Table 6.6.3.3-2.
Table 6.6.3.3-2: Additional operating band unwanted emission limits for E-UTRA bands>1GHz
In certain regions the following requirement may apply. For E-UTRA, E-UTRA with NB-IoT and NB-IoT BS operating in Bands 12, 13, 14, 17, 29, 71, 85 emissions shall not exceed the maximum levels specified in Table 6.6.3.3-3.
Table 6.6.3.3-3: Additional operating band unwanted emission limits for E-UTRA (bands 12, 13, 14, 17, 29, 71 and 85)
In certain regions, the following requirements may apply to an E-UTRA, E-UTRA with NB-IoT and NB-IoT TDD BS operating in the same geographic area and in the same operating band as another E-UTRA TDD system without synchronisation. For this case the emissions shall not exceed -52 dBm/MHz in each supported downlink operating band except in:
-	The frequency range from 10 MHz below the lower channel edge to the frequency 10 MHz above the upper channel edge of each supported band.
In certain regions the following requirement may apply for protection of DTT. For E-UTRA BS operating in Band 20, the level of emissions in the band 470-790 MHz, measured in an 8MHz filter bandwidth on centre frequencies Ffilter according to Table 6.6.3.3-4, shall not exceed the  maximum emission level PEM,N declared by the manufacturer.  This requirement applies in the frequency range 470-790 MHz even though part of the range falls in the spurious domain.
Table 6.6.3.3-4: Declared emissions levels for protection of DTT
Note:	The regional requirement is defined in terms of EIRP (effective isotropic radiated power), which is dependent on both the BS emissions at the antenna connector and the deployment (including antenna gain and feeder loss). The requirement defined above provides the characteristics of the base station needed to verify compliance with the regional requirement. Compliance with the regional requirement can be determined using the method outlined in Annex G.
In certain regions the following requirement may apply for the protection of systems operating in frequency bands adjacent to band 1 as defined in clause 5.5, in geographic areas in which both an adjacent band service E-UTRA are deployed.
The power of any spurious emission shall not exceed:
Table 6.6.3.3-5: Emissions limits for protection of adjacent band services
In regions where FCC regulation applies, requirements for protection of GPS according to FCC Order DA 10-534 applies for operation in Band 24. The following normative requirement covers the base station, to be used together with other information about the site installation to verify compliance with the requirement in FCC Order DA 10-534. The requirement applies to BS operating in Band 24 to ensure that appropriate interference protection is provided to the 1559 – 1610 MHz band. This requirement applies to the frequency range 1559-1610 MHz, even though part of this range falls within the spurious domain.
The level of emissions in the 1559 – 1610 MHz band, measured in measurement bandwidth according to Table 6.6.3.3-6 shall not exceed the maximum emission levels PE_1MHz and PE_1kHz declared by the manufacturer.
Table 6.6.3.3-6: Declared emissions levels for protection of the 1559-1610 MHz band
Note:	The regional requirement in FCC Order DA 10-534 is defined in terms of EIRP (effective isotropic radiated power), which is dependent on both the BS emissions at the antenna connector and the deployment (including antenna gain and feeder loss). The EIRP level is calculated using: PEIRP = PE + Gant where PE denotes the BS unwanted emission level at the antenna connector, Gant equals the BS antenna gain minus feeder loss. The requirement defined above provides the characteristics of the base station needed to verify compliance with the regional requirement.
The following requirement may apply to E-UTRA BS operating in Band 41 in certain regions. Emissions shall not exceed the maximum levels specified in Table .3-7.
Table .3-7: Additional operating band unwanted emission limits for Band 41
In certain regions, the following requirements may apply to E-UTRA BS operating in Band 32 within 1452-1492 MHz, in Band 75 within 1432-1517 MHz and in Band 76 within 1427-1432 MHz. The level of operating band unwanted emissions, measured on centre frequencies f_offset with filter bandwidth, according to Table 6.6.3.3-8, shall neither exceed the maximum emission level PEM,B32,B75,B76,a ,  PEM,B32,B75,B76,b nor PEM,B32,B75,B76,c declared by the manufacturer.
For Band 32, this requirement applies in the frequency range 1452-1492 MHz when non-Mobile/Fixed Communications Network (MFCN) services are deployed in adjacent frequency ranges, while it applies also within 1427-1452 MHz and/or 1492-1517 MHz when MFCN services are deployed in such frequency ranges, even though part of the ranges falls in the spurious domain. For Band 75, this requirement applies in the frequency range 1427-1517 MHz. For Band 76, this requirement applies in the frequency range 1432-1517 MHz even though part of the range falls in the spurious domain.
Table .3-8: Declared operating band 32, 75 and 76 unwanted emission within 1427-1517 MHz
NOTE:	The regional requirement, included in [19], is defined in terms of EIRP per antenna, which is dependent on both the BS emissions at the antenna connector and the deployment (including antenna gain and feeder loss). The requirement defined above provides the characteristics of the base station needed to verify compliance with the regional requirement. The assessment of the EIRP level is described in Annex H.
In certain regions, the following requirement may apply to E-UTRA BS operating in Band 32 within 1452-1492 MHz for the protection of non-MFCN services in spectrum adjacent to the frequency range 1452-1492 MHz. The level of emissions, measured on centre frequencies Ffilter with filter bandwidth according to Table 6.6.3.3-9, shall neither exceed the maximum emission level PEM,B32,d nor PEM,B32,e declared by the manufacturer. This requirement applies in the frequency range 1429-1518MHz even though part of the range falls in the spurious domain.
Table 6.6.3.3-9: Operating band 32 declared emission outside 1452-1492 MHz
NOTE:	The regional requirement, included in [16], is defined in terms of EIRP, which is dependent on both the BS emissions at the antenna connector and the deployment (including antenna gain and feeder loss). The requirement defined above provides the characteristics of the base station needed to verify compliance with the regional requirement. The assessment of the EIRP level is described in Annex H.
In certain regions, the following requirement may apply to BS operating in Band 50 and Band 75 within 1492-1517 MHz and in Band 74 within 1492-1518 MHz. The level of emissions, measured on centre frequencies Ffilter with filter bandwidth according to Table 6.6.3.3-9A, shall neither exceed the maximum emission level PEM,B50,B74,B75,a nor PEM,B50,B74,B75,b declared by the manufacturer.
Table 6.6.3.3-9A: Operating band 50, 74 and 75 declared emission above 1518 MHz
NOTE:	The regional requirement, included in [19], is defined in terms of EIRP, which is dependent on both the BS emissions at the antenna connector and the deployment (including antenna gain and feeder loss). The requirement defined above provides the characteristics of the base station needed to verify compliance with the regional requirement. The assessment of the EIRP level is described in Annex H.
In certain regions, the following requirement may apply to E-UTRA BS operating in Band 50 and Band 75 within 1432-1452 MHz, and in Band 51 and Band 76. Emissions shall not exceed the maximum levels specified in Table 6.6.3.3-9B.
Table 6.6.3.3-9B: Additional operating band unwanted emission limits for BS operating in Band 50 and 75 within 1432-1452 MHz, and in Band 51 and 76
In addition for Band 46 operation, the BS may have to comply with the applicable operating band unwanted emission limits established regionally, when deployed in regions where those limits apply and under the conditions declared by the manufacturer. The regional requirements may be in the form of conducted power, power spectral density, EIRP and other types of limits. In case of regulatory limits based on EIRP, assessment of the EIRP level is described in Annex H.
In certain regions the following requirement may apply to E-UTRA BS operating in Band 45. Emissions shall not exceed the maximum levels specified in Table .3-10.
Table 6.6.3.3-10: Emissions limits for protection of adjacent band services
The following requirement may apply to E-UTRA BS operating in Band 48 and Band 49 in certain regions. Emissions shall not exceed the maximum levels specified in Table 6.6.3.3-11.
Table 6.6.3.3-11: Additional operating band unwanted emission limits for Band 48 and Band 49
The following requirement may apply to E-UTRA BS operating in Band 53 in certain regions. Emissions shall not exceed the maximum levels specified in Table 6.6.3.3-12.
Table 6.6.3.3-12: Additional operating band unwanted emission limits for Band 53
The following notes are common to all subclauses in 6.6.3:
NOTE 6:	Local or regional regulations may specify another excluded frequency range, which may include frequencies where synchronised E-UTRA TDD systems operate.
NOTE 7:	E-UTRA TDD base stations that are synchronized can transmit without these additional co-existence requirements.
NOTE 8:	As a general rule for the requirements in subclause , the resolution bandwidth of the measuring equipment should be equal to the measurement bandwidth. However, to improve measurement accuracy, sensitivity and efficiency, the resolution bandwidth may be smaller than the measurement bandwidth. When the resolution bandwidth is smaller than the measurement bandwidth, the result should be integrated over the measurement bandwidth in order to obtain the equivalent noise bandwidth of the measurement bandwidth.
NOTE 9:	This frequency range ensures that the range of values of f_offset is continuous.
NOTE 10:	The requirement is not applicable when fmax < 10 MHz.
NOTE 11:	For Home BS, the parameter P is defined as the aggregated maximum output power of all transmit antenna connectors of Home BS.
6.6.4	Transmitter spurious emissions
The transmitter spurious emission limits apply from 9 kHz to 12.75 GHz, excluding the frequency range from 10 MHz below the lowest frequency of the downlink operating band up to 10 MHz above the highest frequency of the downlink operating band. For BS capable of multi-band operation where multiple bands are mapped on the same antenna connector, this exclusion applies for each supported operating band. For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the single-band requirements apply and the multi-band exclusions and provisions are not applicable. Exceptions are the requirements in Table 6.6.4.3.1-2, Table 6.6.4.3.1-3, and specifically stated exceptions in Table 6.6.4.3.1-1 that apply also closer than 10 MHz from the downlink operating band and Table 6.6.4.3.1-1a that applies inside the downlink operating band. For some operating bands the upper frequency limit is higher than 12.75 GHz.
The requirements shall apply to BS that supports E-UTRA or  E-UTRA with NB-IoT in-band/guard band operation or NB-IoT standalone operation.
The requirements shall apply whatever the type of transmitter considered (single carrier or multi-carrier). It applies for all transmission modes foreseen by the manufacturer's specification. Unless otherwise stated, all requirements are measured as mean power (RMS).
6.6.4.1	Mandatory Requirements
The requirements of either subclause 6.6.4.1.1 (Category A limits) or subclause 6.6.4.1.2 (Category B limits) shall apply. The application of either Category A or Category B limits shall be the same as for Operating band unwanted emissions in subclause 6.6.3.
6.6.4.1.1	Spurious emissions (Category A)
6.6.4.1.1.1	Minimum Requirement
The power of any spurious emission shall not exceed the limits in Table 6.6.4.1.1.1-1
Table 6.6.4.1.1.1-1: BS Spurious emission limits, Category A
6.6.4.1.2	Spurious emissions (Category B)
6.6.4.1.2.1	Minimum Requirement
The power of any spurious emission shall not exceed the limits in Table 6.6.4.1.2.1-1
Table 6.6.4.1.2.1-1: BS Spurious emissions limits, Category B
6.6.4.2	Protection of the BS receiver of own or different BS
This requirement shall be applied for E-UTRA FDD operation in order to prevent the receivers of the BSs being desensitised by emissions from a BS transmitter. It is measured at the transmit antenna port for any type of BS which has common or separate Tx/Rx antenna ports.
6.6.4.2.1	Minimum Requirement
The power of any spurious emission shall not exceed the limits in Table 6.6.4.2-1.
Table 6.6.4.2-1: BS Spurious emissions limits for protection of the BS receiver
6.6.4.3	Additional spurious emissions requirements
These requirements may be applied for the protection of system operating in frequency ranges other than the E-UTRA BS downlink operating band. The limits may apply as an optional protection of such systems that are deployed in the same geographical area as the E-UTRA BS, or they may be set by local or regional regulation as a mandatory requirement for an E-UTRA operating band. It is in some cases not stated in the present document whether a requirement is mandatory or under what exact circumstances that a limit applies, since this is set by local or regional regulation. An overview of regional requirements in the present document is given in subclause 4.3.
Some requirements may apply for the protection of specific equipment (UE, MS and/or BS) or equipment operating in specific systems (GSM, CDMA, UTRA, E-UTRA, NR, etc.) as listed below.
6.6.4.3.1	Minimum Requirement
The power of any spurious emission shall not exceed the limits of Table 6.6.4.3.1-1 for a BS where requirements for co-existence with the system listed in the first column apply. For BS capable of multi-band operation, the exclusions and conditions in the Note column of Table 6.6.4.3.1-1 apply for each supported operating band. For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the exclusions and conditions in the Note column of Table 6.6.4.3.1-1 apply for the operating band supported at that antenna connector.
Table 6.6.4.3.1-1: BS Spurious emissions limits for E-UTRA BS for co-existence with systems operating in other frequency bands
Additional co-existence requirements in Table 6.6.4.3.1-1a may apply for some regions.
Table .3.1-1a: BS Spurious emissions limits for E-UTRA BS for co-existence with systems operating in Band 46
NOTE 1:	As defined in the scope for spurious emissions in this clause, except for the cases where the noted requirements apply to a BS operating in Band 25, Band 27, Band 28 or Band 29, the co-existence requirements in Table 6.6.4.3.1-1 do not apply for the 10 MHz frequency range immediately outside the downlink operating band (see Table 5.5-1). Emission limits for this excluded frequency range may be covered by local or regional requirements.
NOTE 2:	Table 6.6.4.3.1-1 assumes that two operating bands, where the frequency ranges in Table 5.5-1 would be overlapping, are not deployed in the same geographical area. For such a case of operation with overlapping frequency arrangements in the same geographical area, special co-existence requirements may apply that are not covered by the 3GPP specifications.
NOTE 3:	TDD base stations deployed in the same geographical area, that are synchronized and use the same or adjacent operating bands can transmit without additional co-existence requirements. For unsynchronized base stations (except in Band 46), special co-existence requirements may apply that are not covered by the 3GPP specifications.
NOTE 5:	For E-UTRA Band 28 BS, specific solutions may be required to fulfil the spurious emissions limits for E-UTRA BS for co-existence with E-UTRA Band 27 UL operating band.
NOTE 6:	For E-UTRA Band 29 BS, specific solutions may be required to fulfil the spurious emissions limits for E-UTRA BS for co-existence with UTRA Band XII or E-UTRA Band 12 UL operating band, E-UTRA Band 17 UL operating band or E-UTRA Band 85 UL operating band.
The power of any spurious emission shall not exceed the limits of Table .3.1-1A for a Home BS where requirements for co-existence with a Home BS type listed in the first column apply.
Table .3.1-1A: Home BS Spurious emissions limits for co-existence with Home BS operating in other frequency bands
NOTE 1:	As defined in the scope for spurious emissions in this clause, except for the cases where the noted requirements apply to a BS operating in Band 27, Band 28 or Band 29, the coexistence requirements in Table .3.1-1A do not apply for the 10 MHz frequency range immediately outside the Home BS transmit frequency range of a downlink operating band (see Table 5.5-1). Emission limits for this excluded frequency range may be covered by local or regional requirements.
NOTE 2:	Table .3.1-1A assumes that two operating bands, where the frequency ranges in Table 5.5-1 would be overlapping, are not deployed in the same geographical area. For such a case of operation with overlapping frequency arrangements in the same geographical area, special co-existence requirements may apply that are not covered by the 3GPP specifications.
NOTE 3:	TDD base stations deployed in the same geographical area, that are synchronized and use the same or adjacent operating bands can transmit without additional co-existence requirements. For unsynchronized base stations, special co-existence requirements may apply that are not covered by the 3GPP specifications.
NOTE 4:	For E-UTRA Band 28 BS, specific solutions may be required to fulfil the spurious emissions limits for E-UTRA BS for co-existence with E-UTRA Band 27 UL operating band.
NOTE 5:	For E-UTRA Band 29 BS, specific solutions may be required to fulfil the spurious emissions limits for E-UTRA BS for co-existence with UTRA Band XII or E-UTRA Band 12 UL operating band, E-UTRA Band 17 UL operating band or E-UTRA Band 85 UL operating band.
The following requirement may be applied for the protection of PHS. This requirement is also applicable at specified frequencies falling between 10 MHz below the lowest BS transmitter frequency of the downlink operating band and 10 MHz above the highest BS transmitter frequency of the downlink operating band.
The power of any spurious emission shall not exceed:
Table 6.6.4.3.1-2: E-UTRA BS Spurious emissions limits for BS for co-existence with PHS
The following requirement shall be applied to BS operating in Bands 13 and 14 to ensure that appropriate interference protection is provided to 700 MHz public safety operations. This requirement is also applicable at the frequency range from 10 MHz below the lowest frequency of the BS downlink operating band up to 10 MHz above the highest frequency of the BS downlink operating band.
The power of any spurious emission shall not exceed:
Table 6.6.4.3.1-3: BS Spurious emissions limits for protection of 700 MHz public safety operations
Table 6.6.4.3.1-4: Void
The following requirement shall be applied to BS operating in Band 26 to ensure that appropriate interference protection is provided to 800 MHz public safety operations. This requirement is also applicable at the frequency range from 10 MHz below the lowest frequency of the BS downlink operating band up to 10 MHz above the highest frequency of the BS downlink operating band.
The power of any spurious emission shall not exceed:
Table 6.6.4.3.1-5: BS Spurious emissions limits for protection of 800 MHz public safety operations
The following requirement may apply to E-UTRA BS operating in Band 41 in certain regions. This requirement is also applicable at the frequency range from 10 MHz below the lowest frequency of the BS downlink operating band up to 10 MHz above the highest frequency of the BS downlink operating band.
The power of any spurious emission shall not exceed:
Table .3.1-6: Additional E-UTRA BS Spurious emissions limits for Band 41
The following requirement may apply to E-UTRA BS operating in Band 30 in certain regions. This requirement is also applicable at the frequency range from 10 MHz below the lowest frequency of the BS downlink operating band up to 10 MHz above the highest frequency of the BS downlink operating band.
The power of any spurious emission shall not exceed:
Table 6.6.4.3.1-7: Additional E-UTRA BS Spurious emissions limits for Band 30
In addition for Band 46 operation, the BS may have to comply with the applicable spurious emission limits established regionally, when deployed in regions where those limits apply and under the conditions declared by the manufacturer. The regional requirements may be in the form of conducted power, power spectral density, EIRP and other types of limits. In case of regulatory limits based on EIRP, assessment of the EIRP level is described in Annex H.
The following requirement may apply to E-UTRA BS operating in Band 48 and Band 49 in certain regions. The power of any spurious emission shall not exceed:
Table 6.6.4.3.1-8: Additional E-UTRA BS Spurious emissions limits for Band 48 and Band 49
6.6.4.4	Co-location with other base stations
These requirements may be applied for the protection of other BS receivers when GSM900, DCS1800, PCS1900, GSM850, CDMA850, UTRA FDD, UTRA TDD and/or E-UTRA BS are co-located with an E-UTRA BS.
The requirements assume a 30 dB coupling loss between transmitter and receiver and are based on co-location with base stations of the same class.
6.6.4.4.1	Minimum Requirement
The power of any spurious emission shall not exceed the limits of Table 6.6.4.4.1-1 for a Wide Area BS where requirements for co-location with a BS type listed in the first column apply. For BS capable of multi-band operation, the exclusions and conditions in the Note column of Table 6.6.4.4.1-1 apply for each supported operating band. For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the exclusions and conditions in the Note column of Table 6.6.4.4.1-1 apply for the operating band supported at that antenna connector.
Table 6.6.4.4.1-1: BS Spurious emissions limits for Wide Area BS co-located with another BS
The power of any spurious emission shall not exceed the limits of Table .4.1-2 for a Local Area BS where requirements for co-location with a BS type listed in the first column apply. For BS capable of multi-band operation, the exclusions and conditions in the Note column of Table 6.6.4.4.1-2 apply for each supported operating band. For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the exclusions and conditions in the Note column of Table 6.6.4.4.1-2 apply for the operating band supported at that antenna connector.
Table .4.1-2: BS Spurious emissions limits for Local Area BS co-located with another BS
The power of any spurious emission shall not exceed the limits of Table 6.6.4.4.1-3 for a Medium Range BS where requirements for co-location with a BS type listed in the first column apply. For BS capable of multi-band operation, the exclusions and conditions in the Note column of Table 6.6.4.4.1-3 apply for each supported operating band. For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the exclusions and conditions in the Note column of Table 6.6.4.4.1-3 apply for the operating band supported at that antenna connector.
Table 6.6.4.4.1-3: BS Spurious emissions limits for Medium range BS co-located with another BS
NOTE 1:	As defined in the scope for spurious emissions in this clause, the co-location requirements in Table 6.6.4.4.1-1 to Table 6.6.4.4.1-3 do not apply for the 10 MHz frequency range immediately outside the BS transmit frequency range of a downlink operating band (see Table 5.5-1). The current state-of-the-art technology does not allow a single generic solution for co-location with other system on adjacent frequencies for 30dB BS-BS minimum coupling loss. However, there are certain site-engineering solutions that can be used. These techniques are addressed in TR 25.942 [8].
NOTE 2:	Table 6.6.4.4.1-1 to Table 6.6.4.4.1-3 assume that two operating bands, where the corresponding BS transmit and receive frequency ranges in Table 5.5-1 would be overlapping, are not deployed in the same geographical area. For such a case of operation with overlapping frequency arrangements in the same geographical area, special co-location requirements may apply that are not covered by the 3GPP specifications.
NOTE 3:	Co-located TDD base stations that are synchronized and using the same or adjacent operating band can transmit without special co-locations requirements. For unsynchronized base stations (except in Band 46), special co-location requirements may apply that are not covered by the 3GPP specifications.
6.7	Transmitter intermodulation
The transmit intermodulation requirement is a measure of the capability of the transmitter to inhibit the generation of signals in its non linear elements caused by presence of the wanted signal and an interfering signal reaching the transmitter via the antenna. The requirement applies during the transmitter ON period and the transmitter transient period.
For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the single-band requirements apply regardless of the interfering signals position relative to the Inter RF Bandwidth gap.
6.7.1	Minimum requirement
The transmitter intermodulation level is the power of the intermodulation products when an E-UTRA signal of channel bandwidth 5 MHz as an interfering signal is injected into the antenna connector.
The transmitter intermodulation level shall not exceed the unwanted emission limits in subclauses 6.6.2, 6.6.3 and 6.6.4 in the presence of an E-UTRA interfering signal according to Table 6.7.1-1, Table 6.7.1-2 and Table 6.7.1-3.
The requirement is applicable outside the Base Station RF Bandwidth or Radio Bandwidth. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges or Radio Bandwidth edges.
For a BS operating in non-contiguous spectrum, the requirement is also applicable inside a sub-block gap for interfering signal offsets where the interfering signal falls completely within the sub-block gap. The interfering signal offset is defined relative to the sub-block edges.
For a BS capable of multi-band operation, the requirement applies relative to the Base Station RF Bandwidth edges of each supported operating band. In case the Inter RF Bandwidth gap is less than 15 MHz, the requirement in the gap applies only for interfering signal offsets where the interfering signal falls completely within the Inter RF Bandwidth gap.
For E-UTRA, the wanted signal and interfering signal centre frequency offset shall be as in Table 6.7.1-1.
Table 6.7.1-1 Interfering and wanted signals for the Transmitter intermodulation requirement for E-UTRA
For NB-IoT in-band and guard band operation, the wanted signal and interfering signal centre frequency offset shall be as in Table 6.7.1-2.
Table 6.7.1-2 Interfering and wanted signals for the Transmitter intermodulation requirement for NB-IoT in-band and guard band operations
For NB-IoT standalone operation, the wanted signal and interfering signal centre frequency offset shall be as in Table 6.7.1-3.
Table 6.7.1-3 Interfering and wanted signals for the Transmitter intermodulation requirement for standalone NB-IoT
6.7.2	Additional requirement for Band 41
In certain regions the following requirement may apply. For E-UTRA BS operating in Band 41, the transmitter intermodulation level shall not exceed the maximum levels specified in Table 6.6.2.1-2 with a square filter in the first adjacent channel, Table 6.6.3.3-7 and Table .3.1-6 in the presence of an interfering signal according to Table 6.7.2-1.
Table 6.7.2-1 Interfering and wanted signals for the additional transmitter intermodulation requirement for Band 41
7	Receiver characteristics
7.1	General
The requirements in clause 7 are expressed for a single receiver antenna connector. For receivers with antenna diversity, the requirements apply for each receiver antenna connector.
Unless otherwise stated, the receiver characteristics are specified at the BS antenna connector (test port A) with a full complement of transceivers for the configuration in normal operating conditions. For FDD operation the requirements in clause 7 shall be met with the transmitter(s) on. If any external apparatus such as a RX amplifier, a filter or the combination of such devices is used, requirements apply at the far end antenna connector (port B).
NOTE:	In normal operating conditions the BS in FDD operation is configured to transmit and receive at the same time. The transmitter may be off for some of the tests as specifed in 36.141 [4].
Unless otherwise stated the requirements in clause 7 apply during the base station receive period.
Figure 7.1: Receiver test ports
The throughput requirements defined for the receiver characteristics in this clause do not assume HARQ retransmissions.
When the BS is configured to receive multiple carriers, all the throughput requirements are applicable for each received carrier. For ACS, blocking and intermodulation characteristics, the negative offsets of the interfering signal apply relative to the lower Base Station RF Bandwidth edge and positive offsets of the interfering signal apply relative to the upper Base Station RF Bandwidth edge.
NOTE:	Requirements may only be supported for certain frequency ranges within the operating band(s). These frequency ranges could be different for NB.-IoT comparing to E-UTRA.
NOTE:	For E-UTRA BS with NB-IoT (in band and/or guard band) or standalone NB-IoT BS, requirements are defined for 15 kHz sub-carrier spacing and 3.75 kHz sub-carrier spacing. A NB-IoT Base Station supports 15 kHz sub-carrier spacing, 3.75 kHz sub-carrier spacing, or both.
7.2	Reference sensitivity level
The reference sensitivity power level PREFSENS is the minimum mean power received at the antenna connector at which a throughput requirement shall be met for a specified reference measurement channel.
7.2.1	Minimum requirement
For E-UTRA, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.2.1-1 for Wide Area BS, in Table 7.2.1-2 for Local Area BS, in Table 7.2.1-3 for Home BS and in Table 7.2.1-4 for Medium Range BS.
Table 7.2.1-1: E-UTRA Wide Area BS reference sensitivity levels
Table -2: E-UTRA Local Area BS reference sensitivity levels
Table -3: E-UTRA Home BS reference sensitivity levels
Table 7.2.1-4: E-UTRA Medium Range BS reference sensitivity levels
For NB-IoT standalone BS or E-UTRA BS with NB-IoT (in-band and/or guard band), NB-IoT throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.2.1-5 for Wide Area BS, in Table 7.2.1-5a for Local Area BS, in Table 7.2.1-5b for Home BS and in Table 7.2.1-5c for Medium Range BS.
Table 7.2.1-5: NB-IoT Wide Area BS reference sensitivity levels
Table 7.2.1-5a: NB-IoT Local Area BS reference sensitivity levels
Table 7.2.1-5b: NB-IoT Home BS reference sensitivity levels
Table 7.2.1-5c: NB-IoT Medium Range BS reference sensitivity levels
Table 7.2.1-6: Void
For E-UTRA BS with subPRB allocation, subPRB allocation throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.2.1-7 for Wide Area BS, in Table 7.2.1-7a for Local Area BS, in Table 7.2.1-7b for Home BS and in Table 7.2.1-7c for Medium Range BS.
Table 7.2.1-7: SubPRB allocation for Wide Area BS reference sensitivity levels
Table 7.2.1-7a: subPRB allocation for Local Area BS reference sensitivity levels
Table 7.2.1-7b: subPRB allocation for Home BS reference sensitivity levels
Table 7.2.1-7c: subPRB allocation for Medium Range BS reference sensitivity levels
7.3	Dynamic range
The dynamic range is specified as a measure of the capability of the receiver to receive a wanted signal in the presence of an interfering signal inside the received channel bandwidth. In this condition a throughput requirement shall be met for a specified reference measurement channel. The interfering signal for the dynamic range requirement is an AWGN signal.
7.3.1	Minimum requirement
For E-UTRA, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-1 for Wide Area BS, in Table 7.3.1-2 for Local Area BS, in Table 7.3.1-3 for Home BS and in Table 7.3.1-4 for Medium Range BS.
Table 7.3.1-1: Wide Area BS dynamic range for E-UTRA carrier
Table -2: Local Area BS dynamic range for E-UTRA carrier
Table -3: Home BS dynamic range for E-UTRA carrier
Table 7.3.1-4: Medium Range BS dynamic range for E-UTRA carrier
For NB-IoT standalone operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-5 for Wide Area BS.
Table 7.3.1-5: Wide Area BS dynamic range for NB-IoT standalone operation
For NB-IoT in-band or guard band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-6 for Wide Area BS.
Table 7.3.1-6: Wide Area BS dynamic range for NB-IoT in-band or guard band operation
For NB-IoT standalone operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-7 for Local Area BS
Table 7.3.1-7: Local  Area BS dynamic range for NB-IoT standalone operation
For NB-IoT in-band or guard band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-8 for Local Area BS.
Table 7.3.1-8: Local Area BS dynamic range for NB-IoT in-band or guard band operation
For NB-IoT standalone operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-9 for Home BS
Table 7.3.1-9: Home BS dynamic range for NB-IoT standalone operation
For NB-IoT in-band or guard band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-10 for Home BS.
Table 7.3.1-10: Home BS dynamic range for NB-IoT in-band or guard band operation
For NB-IoT standalone operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-11 for Medium Range BS
Table 7.3.1-11: Medium Range BS dynamic range for NB-IoT standalone operation
For NB-IoT in-band or guard band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.3.1-12 for Medium Range BS.
Table 7.3.1-12: Medium Range BS dynamic range for NB-IoT in-band or guard band operation
7.4	In-channel selectivity
In-channel selectivity (ICS) is a measure of the receiver ability to receive a wanted signal at its assigned resource block locations in the presence of an interfering signal received at a larger power spectral density. In this condition a throughput requirement shall be met for a specified reference measurement channel. The interfering signal shall be an E-UTRA signal as specified in Annex C and shall be time aligned with the wanted signal.
7.4.1	Minimum requirement
For E-UTRA, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.4.1-1 for Wide Area BS, in Table 7.4.1-2 for Local Area BS, in Table 7.4.1-3 for Home BS and in Table 7.4.1-4 for Medium Range BS.
Table 7.4.1-1 Wide Area BS in-channel selectivity for E-UTRA
Table -2 Local Area BS in-channel selectivity for E-UTRA
Table -3 Home BS in-channel selectivity for E-UTRA
Table 7.4.1-4 Medium Range BS in-channel selectivity for E-UTRA
For NB-IoT in-band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.4.1-5 and Table 7.4.1-6 for Wide Area BS.
Table 7.4.1-5 Wide Area BS in-channel selectivity for NB-IoT in-band operation with 15kHz channel spacing
Table 7.4.1-6 Wide Area BS in-channel selectivity for NB-IoT in-band operation with 3.75kHz channel spacing
For NB-IoT in-band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.4.1-7 and Table 7.4.1-8 for Local Area BS.
Table 7.4.1-7 Local Area BS in-channel selectivity for NB-IoT in-band operation with 15kHz channel spacing
Table 7.4.1-8 Local Area BS in-channel selectivity for NB-IoT in-band operation with 3.75kHz channel spacing
For NB-IoT in-band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.4.1-9 and Table 7.4.1-10 for Home BS.
Table 7.4.1-9 Home BS in-channel selectivity for NB-IoT in-band operation with 15kHz channel spacing
Table 7.4.1-10 Home BS in-channel selectivity for NB-IoT in-band operation with 3.75kHz channel spacing
For NB-IoT in-band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel as specified in Annex A with parameters specified in Table 7.4.1-11 and Table 7.4.1-12 for Medium Range BS.
Table 7.4.1-11 Medium Range BS in-channel selectivity for NB-IoT in-band operation with 15kHz channel spacing
Table 7.4.1-12 Medium Range BS in-channel selectivity for NB-IoT in-band operation with 3.75kHz channel spacing
7.5	Adjacent Channel Selectivity (ACS) and narrow-band blocking
Adjacent channel selectivity (ACS) is a measure of the receiver ability to receive a wanted signal at its assigned channel frequency in the presence of an adjacent channel signal with a specified centre frequency offset of the interfering signal to the band edge of a victim system. For E-UTRA or E-UTRA with NB-IoT (in-band and/or guard band operation) BS, the interfering signal shall be an E-UTRA signal as specified in Annex C. For NB-IoT standalone BS, the interfering signal shall be a NB-IoT signal as specified in Annex C.
7.5.1	Minimum requirement
The throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel.
For E-UTRA Wide Area BS, the wanted and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1 and 7.5.1-2 for narrowband blocking and in Table 7.5.1-3 for ACS. The reference measurement channel for the wanted signal is identified in Table 7.2.1-1 for each channel bandwidth and further specified in Annex A.
For E-UTRA Medium Range BS, the wanted and the interfering signal coupled to the BS antenna input are specified in Tables -1 and 7.5.1-2 for narrowband blocking and in Table 7.5.1-6 for ACS. Narrowband blocking requirements are not applied for Band 46. The reference measurement channel for the wanted signal is identified in Table 7.2.1-4 for each channel bandwidth and further specified in Annex A.
For E-UTRA Local Area BS, the wanted and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1 and 7.5.1-2 for narrowband blocking and in Table 7.5.1-4 for ACS. Narrowband blocking requirements are not applied for Band 46. The reference measurement channel for the wanted signal is identified in Table 7.2.1-2 for each channel bandwidth and further specified in Annex A.
For E-UTRA Home BS, the wanted and the interfering signal coupled to the BS antenna input are specified in Tables -1 and 7.5.1-2 for narrowband blocking and in Table 7.5.1-5 for ACS. The reference measurement channel for the wanted signal is identified in Table 7.2.1-3 for each channel bandwidth and further specified in Annex A.
For NB-IoT in-band operation Wide Area BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1a and 7.5.1-2 for narrowband blocking and in Table 7.5.1-3a for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5 for each sub-carrier spacing and further specified in Annex A.
For NB-IoT guard band operation Wide Area BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1b and 7.5.1-2 for narrowband blocking and in Table 7.5.1-3b for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5 for each sub-carrier spacing and further specified in Annex A.
For NB-IoT standalone operation Wide Area BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1c and 7.5.1-2a for narrowband blocking and in Table 7.5.1-3c for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5 for each sub-carrier spacing and further specified in Annex A.
For NB-IoT in-band operation Local Area BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1a and 7.5.1-2 for narrowband blocking and in Table 7.5.1-4a for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5a for each sub-carrier spacing and further specified in Annex A.
For NB-IoT guard band operation Local Area BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1b and 7.5.1-2 for narrowband blocking and in Table 7.5.1-4b for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5a for each sub-carrier spacing and further specified in Annex A.
For NB-IoT standalone operation Loca Area BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1c and 7.5.1-2a for narrowband blocking and in Table 7.5.1-4c for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5a for each sub-carrier spacing and further specified in Annex A.
For NB-IoT in-band operation Medium Range BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1a and 7.5.1-2 for narrowband blocking and in Table 7.5.1-5a for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5b for each sub-carrier spacing and further specified in Annex A.
For NB-IoT guard band operation Medium Range BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1b and 7.5.1-2 for narrowband blocking and in Table 7.5.1-5b for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5c for each sub-carrier spacing and further specified in Annex A.
For NB-IoT standalone operation Medium Range BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1c and 7.5.1-2a for narrowband blocking and in Table 7.5.1-5c for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5c for each sub-carrier spacing and further specified in Annex A.
For NB-IoT in-band operation Home BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1a and 7.5.1-2 for narrowband blocking and in Table 7.5.1-5a for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5c for each sub-carrier spacing and further specified in Annex A.
For NB-IoT guard band operation Home BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1b and 7.5.1-2 for narrowband blocking and in Table 7.5.1-5b for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5b for each sub-carrier spacing and further specified in Annex A.
For NB-IoT standalone operation Home BS, the wanted signal and the interfering signal coupled to the BS antenna input are specified in Tables 7.5.1-1c and 7.5.1-2a for narrowband blocking and in Table 7.5.1-5c for ACS. The reference measurement channel for the NB-IoT wanted signal is identified in Table 7.2.1-5b for each sub-carrier spacing and further specified in Annex A.
The ACS and narrowband blocking requirement is applicable outside the Base Station RF Bandwidth or Radio Bandwidth. The interfering signal offset is defined relative to the Base station RF Bandwidth edges or Radio Bandwidth edges.
For a E-UTRA BS operating in non-contiguous spectrum within any operating band, the ACS requirement applies in addition inside any sub-block gap, in case the sub-block gap size is at least as wide as the E-UTRA interfering signal in Table 7.5.1-3, 7.5.1-4 and 7.5.1-6. The interfering signal offset is defined relative to the sub-block edges inside the sub-block gap.
For a E-UTRA BS capable of multi-band operation, the ACS requirement applies in addition inside any Inter RF Bandwidth gap, in case the Inter RF Bandwidth gap size is at least as wide as the E-UTRA interfering signal in Tables 7.5.1-3, 7.5.1-4 and 7.5.1-6. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges inside the Inter RF Bandwidth gap.
For a E-UTRA BS operating in non-contiguous spectrum within any operating band, the narrowband blocking requirement applies in addition inside any sub-block gap, in case the sub-block gap size is at least as wide as the channel bandwidth of the E-UTRA interfering signal in Table 7.5.1-2. The interfering signal offset is defined relative to the sub-block edges inside the sub-block gap.
For a E-UTRA BS capable of multi-band operation, the narrowband blocking requirement applies in addition inside any Inter RF Bandwidth gap, in case the Inter RF Bandwidth gap size is at least as wide as the E-UTRA interfering signal in Table 7.5.1-2. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges inside the Inter RF Bandwidth gap.
Table 7.5.1-1: Narrowband blocking requirement for E-UTRA BS
Table 7.5.1-1a: Narrowband blocking requirement for NB-IoT in-band operation BS
Table 7.5.1-1b: Narrowband blocking requirement for NB-IoT guard band operation BS
Table 7.5.1-1c: Narrowband blocking requirement for NB-IoT standalone
Table 7.5.1-2: Interfering signal for Narrowband blocking requirement for E-UTRA BS
Table 7.5.1-2a: Interfering signal for Narrowband blocking requirement for NB-IoT standalone operation BS
Table 7.5.1-3: Adjacent channel selectivity for E-UTRA Wide Area BS
Table 7.5.1-3a: Adjacent channel selectivity for NB-IoT in-band operation Wide Area BS
Table 7.5.1-3b: Adjacent channel selectivity NB-IoT guard band operation Wide Area BS
Table 7.5.1-3c: Adjacent channel selectivity for NB-IoT standalone Wide Area BS
Table 7.5.1-4: Adjacent channel selectivity for E-UTRA Local Area BS
Table 7.5.1-4a: Adjacent channel selectivity for NB-IoT in-band operation Local Area BS
Table 7.5.1-4b: Adjacent channel selectivity NB-IoT guard band operation Local Area BS
Table 7.5.1-4c: Adjacent channel selectivity for NB-IoT standalone Local Area BS
Table -5: Adjacent channel selectivity for E-UTRA Home BS
Table 7.5.1-5a: Adjacent channel selectivity for NB-IoT in-band operation Home BS
Table 7.5.1-5b: Adjacent channel selectivity NB-IoT guard band operation Home BS
Table 7.5.1-5c: Adjacent channel selectivity for NB-IoT standalone Home BS
Table 7.5.1-6: Adjacent channel selectivity for E-UTRA Medium Range BS
Table 7.5.1-6a: Adjacent channel selectivity for NB-IoT in-band operation Medium Range BS
Table 7.5.1-6b: Adjacent channel selectivity NB-IoT guard band operation Medium Range BS
Table 7.5.1-6c: Adjacent channel selectivity for NB-IoT standalone Medium Range BS
7.6	Blocking
7.6.1	General blocking requirement
The blocking characteristics is a measure of the receiver ability to receive a wanted signal at its assigned channel in the presence of an unwanted interferer, which are either a 1.4MHz, 3MHz or 5MHz E-UTRA signal for in-band blocking or a CW signal for out-of-band blocking. The interfering signal shall be an E-UTRA signal as specified in Annex C.
7.6.1.1	Minimum requirement
For E-UTRA, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted and an interfering signal coupled to BS antenna input using the parameters in Tables 7.6.1.1-1, 7.6.1.1-1a, 7.6.1.1-1b, 7.6.1.1-1c and 7.6.1.1-2. The reference measurement channel for the wanted signal is identified in Table 7.2.1-1, 7.2.1-2, 7.2.1-3 and 7.2.1-4 for each channel bandwidth and further specified in Annex A.
The blocking requirement is applicable outside the Base Station RF Bandwidth or Radio Bandwidth. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges or Radio Bandwidth edges.
For a BS operating in non-contiguous spectrum within any operating band, the blocking requirement applies in addition inside any sub-block gap, in case the sub-block gap size is at least as wide as twice the interfering signal minimum offset in Table 7.6.1.1-2. The interfering signal offset is defined relative to the sub-block edges inside the sub-block gap.
For a BS capable of multi-band operation, the requirement in the in-band blocking frequency ranges applies for each supported operating band. The requirement applies in addition inside any Inter RF Bandwidth gap, in case the Inter RF Bandwidth gap size is at least as wide as twice the interfering signal minimum offset in Table 7.6.1.1-2.
For a BS capable of multi-band operation, the requirement in the out-of-band blocking frequency ranges apply for each operating band, with the exception that the in-band blocking frequency ranges of all supported operating bands according to Tables 7.6.1.1-1, 7.6.1.1-1a and 7.6.1.1-1c shall be excluded from the out-of-band blocking requirement.
Table 7.6.1.1-1: Blocking performance requirement for Wide Area BS for E-UTRA
NOTE:	Table 7.6.1.1-1 assumes that two operating bands, where the downlink operating band (see Table 5.5-1) of one band would be within the in-band blocking region of the other band, are not deployed in the same geographical area.
Table 7.6.1.1-1a: Blocking performance requirement for Local Area BS for E-UTRA
NOTE:	Table 7.6.1.1-1a assumes that two operating bands, where the downlink operating band (see Table 5.5-1) of one band would be within the in-band blocking region of the other band, are not deployed  in the same geographical area.
Table .1-1b: Blocking performance requirement for Home BS for E-UTRA
NOTE:	Table 7.6.1.1-1b assumes that two operating bands, where the downlink operating band (see Table 5.5-1) of one band would be within the in-band blocking region of the other band, are not deployed in the same geographical area.
Table 7.6.1.1-1c: Blocking performance requirement for Medium Range BS for E-UTRA
NOTE:	Table 7.6.1.1-1c assumes that two operating bands, where the downlink operating band (see Table 5.5-1) of one band would be within the in-band blocking region of the other band, are not deployed in the same geographical area.
Table 7.6.1.1-2: Interfering signals for blocking performance requirement
For NB-IoT standalone operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted and an interfering signal coupled to BS antenna input using the parameters in Tables 7.6.1.1-3, 7.6.1.1-3a, 7.6.1.1-3b, 7.6.1.1-3c and 7.6.1.1-4. The reference measurement channel for the wanted signal is identified in Table 7.2.1-5, 7.2.1-5a, 7.2.1-5b and 7.2.1-5c and further specified in Annex A.
The blocking requirement is applicable outside the Base Station RF Bandwidth or Radio Bandwidth. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges or Radio Bandwidth edges.
Table 7.6.1.1-3: Blocking performance requirement for Wide Area BS for NB-IoT standalone operation
Table 7.6.1.1-3a: Blocking performance requirement for Local Area BS for NB-IoT standalone operation
Table 7.6.1.1-3b: Blocking performance requirement for Home BS for NB-IoT standalone operation
Table 7.6.1.1-3c: Blocking performance requirement for Medium Range BS for NB-IoT standalone operation
NOTE:	Tables 7.6.1.1-3, 7.6.1.1-3a, 7.6.1.1-3b and 7.6.1.1-3c assumes that two operating bands, where the downlink operating band (see Table 5.5-1) of one band would be within the in-band blocking region of the other band, are not deployed in the same geographical area.
Table 7.6.1.1-4: Interfering signals for blocking performance requirement for NB-IoT standalone operation
For E-UTRA with NB-IoT in-band/guard band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted and an interfering signal coupled to BS antenna input using the parameters in Tables 7.6.1.1-5, 7.6.1.1-5a, 7.6.1.1-5b, 7.6.1.1-5c and 7.6.1.1-6. The reference measurement channel for the wanted signal is identified in Table 7.2.1-1, 7.2.1-2, 7.2.1-3 and 7.2.1-4 for each channel bandwidth for E-UTRA, Table 7.2.1-5, 7.2.1-5a, 7.2.1-5b and 7.2.1-5c for NB-IoT and further specified in Annex A.
The blocking requirement is applicable outside the Base Station RF Bandwidth or Radio Bandwidth. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges or Radio Bandwidth edges.
Table 7.6.1.1-5: Blocking performance requirement for Wide Area BS for E-UTRA with NB-IoT in-band/guard band operation
Table 7.6.1.1-5a: Blocking performance requirement for Local Area BS for E-UTRA with NB-IoT in-band/guard band operation
Table 7.6.1.1-5b: Blocking performance requirement for Home BS for E-UTRA with NB-IoT in-band/guard band operation
Table 7.6.1.1-5c: Blocking performance requirement for Medium Range BS for E-UTRA with NB-IoT in-band/guard band operation
NOTE:	Tables 7.6.1.1-5, 7.6.1.1-5a and 7.6.1.1-5b assume that two operating bands, where the downlink operating band (see Table 5.5-1) of one band would be within the in-band blocking region of the other band, are not deployed in the same geographical area.
Table 7.6.1.1-6: Interfering signals for blocking performance requirement for E-UTRA with NB-IoT in-band/guard band operation
7.6.2	Co-location with other base stations
This additional blocking requirement may be applied for the protection of E-UTRA and NB-IoT BS receivers when GSM, CDMA, UTRA, E-UTRA, NR or NB-IoT BS operating in a different frequency band are co-located with an E-UTRA or NB-IoT BS. The requirement is applicable to all channel bandwidths supported by the E-UTRA BS and E-UTRA with NB-IoT in-band/guard band operation.
The requirements in this clause assume a 30 dB coupling loss between interfering transmitter and E-UTRA or NB-IoT BS receiver and are based on co-location with base stations of the same class.
7.6.2.1	Minimum requirement
The throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted and an interfering signal coupled to BS antenna input using the parameters in Table 7.6.2.1-1 for Wide Area BS, in Table 7.6.2.1-2 for Local Area BS and in Table 7.6.2.1-3 for Medium Range BS. The reference measurement channel for the wanted signal is identified in Tables 7.2.1-1, 7.2.1-2 and 7.2.1-4 for each channel bandwidth for E-UTRA, Table 7.2.1-5 for NB-IoT and further specified in Annex A.
Table 7.6.2.1-1: Blocking performance requirement for E-UTRA and NB-IoT Wide Area BS when co-located with BS in other frequency bands.
Table .1-2: Blocking performance requirement for E-UTRA and NB-IoT Local Area BS when co-located with BS in other frequency bands.
Table 7.6.2.1-3: Blocking performance requirement for E-UTRA and NB-IoT Medium Range BS when co-located with BS in other frequency bands.
7.6.3	Additional requirement (regional)
For the Public Safety LTE BS in Korea from 718 to 728 MHz in band 28, the wanted and the interfering signal coupled to the BS antenna input are specified in Tables G-2.2, G-2.3, G-2.4 and G-2.5 for the blocking requirements. The reference measurement channel for the wanted signal is A.1-3 for 10 MHz channel bandwidth and further specified in Annex A.
7.7	Receiver spurious emissions
The spurious emissions power is the power of emissions generated or amplified in a receiver that appear at the BS receiver antenna connector. The requirements apply to all BS with separate RX and TX antenna ports. In this case for FDD BS the test shall be performed when both TX and RX are on, with the TX port terminated.
For TDD BS with common RX and TX antenna port the requirement applies during the Transmitter OFF period. For FDD BS with common RX and TX antenna port the transmitter spurious emission as specified in clause 6.6.4 is valid.
For BS capable of multi-band operation where multiple bands are mapped on separate antenna connectors, the single-band requirements apply and the excluded frequency range is only applicable for the operating band supported on each antenna connector.
The requirements shall apply to BS that supports E-UTRA or  E-UTRA with NB-IoT in-band/guard band operation or NB-IoT standalone operation.
7.7.1	Minimum requirement
The power of any spurious emission shall not exceed the levels in Table 7.7.1-1:
Table 7.7.1-1: General spurious emission minimum requirement
In addition to the requirements in Table 7.7.1-1, the power of any spurious emission shall not exceed the levels specified for Protection of the E-UTRA FDD BS receiver of own or different BS in subclause 6.6.4.2 and for Co-existence with other systems in the same geographical area in subclause 6.6.4.3. In addition, the co-existence requirements for co-located base stations specified in subclause 6.6.4.4 may also be applied.
7.8	Receiver intermodulation
Third and higher order mixing of the two interfering RF signals can produce an interfering signal in the band of the desired channel.  Intermodulation response rejection is a measure of the capability of the receiver to receive a wanted signal on its assigned channel frequency in the presence of two interfering signals which have a specific frequency relationship to the wanted signal. Interfering signals shall be a CW signal and an E-UTRA signal as specified in Annex C.
7.8.1	Minimum requirement
For E-UTRA, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted signal at the assigned channel frequency and two interfering signals coupled to the BS antenna input, with the conditions specified in Tables 7.8.1-1 and 7.8.1-2 for intermodulation performance and in Tables 7.8.1-3, 7.8.1-4, 7.8.1-5 and 7.8.1-6 for narrowband intermodulation performance. Narrowband intermodulation requirements are not applied for Band 46. The reference measurement channel for the wanted signal is identified in Table 7.2.1-1, Table 7.2.1-2, Table 7.2.1-3 and Table 7.2.1-4 for each channel bandwidth and further specified in Annex A.
For NB-IoT in-band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted signal at the assigned channel frequency and two interfering signals coupled to the BS antenna input, with the conditions specified in Tables 7.8.1-1a and 7.8.1-2 for intermodulation performance and in Tables 7.8.1-3a, 7.8.1-4a, 7.8.1-5a and 7.8.1-6a for narrowband intermodulation performance. The reference measurement channel for the wanted signal is identified in Tables 7.2.1-5, 7.2.1-5a, 7.2.1-5b and 7.2.1-5c and further specified in Annex A.
For NB-IoT guard band operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted signal at the assigned channel frequency and two interfering signals coupled to the BS antenna input, with the conditions specified in Tables 7.8.1-1b and 7.8.1-2 for intermodulation performance and in Tables 7.8.1-3b, 7.8.1-4b, 7.8.1-5b and 7.8.1-6b for narrowband intermodulation performance. The reference measurement channel for the wanted signal is identified in Tables 7.2.1-5, 7.2.1-5a, 7.2.1-5b and 7.2.1-5c and further specified in Annex A.
For NB-IoT standalone operation, the throughput shall be ≥ 95% of the maximum throughput of the reference measurement channel, with a wanted signal at the assigned channel frequency and two interfering signals coupled to the BS antenna input, with the conditions specified in Tables 7.8.1-1c and 7.8.1-2a for intermodulation performance and in Tables 7.8.1-3c, 7.8.1-4c, 7.8.1-5c and 7.8.1-6c for narrowband intermodulation performance. The reference measurement channel for the wanted signal is identified in Tables 7.2.1-5, 7.2.1-5a and 7.2.1-5c and further specified in Annex A.
The receiver intermodulation requirement is applicable outside the Base Station RF Bandwidth or Radio Bandwidth edges. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges or Radio Bandwidth edges.
For a BS operating in non-contiguous spectrum within any operating band, the narrowband intermodulation requirement applies in addition inside any sub-block gap in case the sub-block gap is at least as wide as the channel bandwidth of the E-UTRA interfering signal in Table 7.8.1-3. The interfering signal offset is defined relative to the sub-block edges inside the sub-block gap.
For a BS capable of multi-band operation, the intermodulation requirement applies in addition inside any Inter RF Bandwidth gap, in case the gap size is at least twice as wide as the E-UTRA interfering signal centre frequency offset from the Base Station RF Bandwidth edge.
For a BS capable of multi-band operation, the narrowband intermodulation requirement applies in addition inside any Inter RF Bandwidth gap in case the gap size is at least as wide as the E-UTRA interfering signal in Tables 7.8.1-3, 7.8.1-4 and 7.8.1-6. The interfering signal offset is defined relative to the Base Station RF Bandwidth edges inside the Inter RF Bandwidth gap.
Table 7.8.1-1: Intermodulation performance requirement for E-UTRA
Table 7.8.1-1a: Intermodulation performance requirement for E-UTRA with NB-IoT in-band operation BS
Table 7.8.1-1b: Intermodulation performance requirement for E-UTRA with NB-IoT guard band operation BS
Table 7.8.1-1c: Intermodulation performance requirement for NB-IoT standalone
Table 7.8.1-2: Interfering signal for Intermodulation performance requirement for E-UTRA or E-UTRA with NB-IoT in-band/guard band operation BS
Table 7.8.1-2a: Interfering signal for Intermodulation performance requirement for NB-IoT standalone operation BS
Table 7.8.1-3: Narrowband intermodulation performance requirement for Wide Area BS for E-UTRA
Table 7.8.1-3a: Narrowband intermodulation performance requirement for Wide Area BS for E-UTRA with NB-IoT in-band operation BS
Table 7.8.1-3b: Narrowband intermodulation performance requirement for Wide Area BS for E-UTRA with NB-IoT guard band operation BS
Table 7.8.1-3c: Narrowband intermodulation performance requirement for Wide Area BS for NB-IoT standalone
Table -4: Narrowband intermodulation performance requirement for Local Area BS for E-UTRA
Table 7.8.1-4a: Narrowband intermodulation performance requirement for Local Area BS for E-UTRA with NB-IoT in-band operation BS
Table 7.8.1-4b: Narrowband intermodulation performance requirement for Local Area BS for E-UTRA with NB-IoT guard band operation BS
Table 7.8.1-4c: Narrowband intermodulation performance requirement for Local Area BS for NB-IoT standalone
Table -5: Narrowband intermodulation performance requirement for Home BS for E-UTRA
Table 7.8.1-5a: Narrowband intermodulation performance requirement for Home BS for E-UTRA with NB-IoT in-band operation BS
Table 7.8.1-5b: Narrowband intermodulation performance requirement for Home BS for E-UTRA with NB-IoT guard band operation BS
Table 7.8.1-5c: Narrowband intermodulation performance requirement for Home BS for NB-IoT standalone
Table 7.8.1-6: Narrowband intermodulation performance requirement for Medium Range BS for E-UTRA
Table 7.8.1-6a: Narrowband intermodulation performance requirement for Medium Range BS for E-UTRA with NB-IoT in-band operation BS
Table 7.8.1-6b: Narrowband intermodulation performance requirement for Medium Range BS for E-UTRA with NB-IoT guard band operation BS
Table 7.8.1-6c: Narrowband intermodulation performance requirement for Medium Range BS for NB-IoT standalone
8	Performance requirement
8.1	General
Performance requirements for the BS are specified for the fixed reference channels defined in Annex A and the propagation conditions in Annex B. The requirements only apply to those FRCs that are supported by the base station.
Unless stated otherwise, performance requirements apply for a single carrier only. Performance requirements for a BS supporting carrier aggregation are defined in terms of single carrier requirements. For FDD operation the requirements in clause 8 shall be met with the transmitter(s) on.
NOTE:	In normal operating conditions the BS in FDD operation is configured to transmit and receive at the same time. The transmitter may be off for some of the tests as specifed in 36.141 [4].
The SNR used in this clause is specified based on a single carrier and defined as:
SNR = S / N
Where:
S	is the total signal energy in the subframe on a single antenna port.
N	is the noise energy in a bandwidth corresponding to the transmission bandwidth over the duration of a subframe.
For enhanced performance requirements type A and type B, the SINR used in this clause is specified based on a single carrier and defined as:
Where:
	is the total signal energy of one intra-cell UE in the subframe on a single antenna port.
	is the summation of the received energy of the strongest inter-cell interferers explicitly defined in a test procedure plus the white noise energy N, in a bandwidth corresponding to the transmission bandwidth over the duration of a subframe on a single antenna port. The respective energy of each inter-cell interferer relative to  is defined by its associated DIP value.
8.2	Performance requirements for PUSCH
8.2.1	Requirements in multipath fading propagation conditions
The performance requirement of PUSCH is determined by a minimum required throughput for a given SNR. The required throughput is expressed as a fraction of maximum throughput for the FRCs listed in Annex A. The performance requirements assume HARQ retransmissions. For 2Tx test the HARQ retransmissions for two codewords are independent. The requirements defined based on FRC in Annex A.17 apply to the BS supporting PUSCH with 256QAM. The requirements defined based on FRC in Annex A.18 apply to the BS supporting PUSCH transmission in UpPTS. The requirements defined based on FRC in Annex A.19 apply to the BS supporting both PUSCH transmission in UpPTS and PUSCH with 256QAM. For PUSCH transmission in UpPTS, the special subframe configuration is 10 as specified in 36.211 [10] Table 4.2-1, and during the test only special subframe is scheduled.
Table 8.2.1-1 Test parameters for testing PUSCH
8.2.1.1	Minimum requirements
The throughput shall be equal to or larger than the fraction of maximum throughput stated in the tables 8.2.1.1-1 to 8.2.1.1-6 at the given SNR for 1Tx and in tables 8.2.1.1-7 to 8.2.1.1-12 for 2Tx two layer spatial multiplexing transmission.
Table 8.2.1.1-1 Minimum requirements for PUSCH, 1.4 MHz Channel Bandwidth, 1Tx
Table 8.2.1.1-2 Minimum requirements for PUSCH, 3 MHz Channel Bandwidth, 1Tx
Table 8.2.1.1-3 Minimum requirements for PUSCH, 5 MHz Channel Bandwidth, 1Tx
Table 8.2.1.1-4 Minimum requirements for PUSCH, 10 MHz Channel Bandwidth, 1Tx
Table 8.2.1.1-5 Minimum requirements for PUSCH, 15 MHz Channel Bandwidth, 1Tx
Table 8.2.1.1-6 Minimum requirements for PUSCH, 20 MHz Channel Bandwidth, 1Tx
Table 8.2.1.1-7 Minimum requirements for PUSCH, 1.4 MHz Channel Bandwidth, 2Tx
Table 8.2.1.1-8 Minimum requirements for PUSCH, 3 MHz Channel Bandwidth, 2Tx
Table 8.2.1.1-9 Minimum requirements for PUSCH, 5 MHz Channel Bandwidth, 2Tx
Table 8.2.1.1-10 Minimum requirements for PUSCH, 10 MHz Channel Bandwidth, 2Tx
Table 8.2.1.1-11 Minimum requirements for PUSCH, 15 MHz Channel Bandwidth, 2Tx
Table 8.2.1.1-12 Minimum requirements for PUSCH, 20 MHz Channel Bandwidth, 2Tx
8.2.2	Requirements for UL timing adjustment
The performance requirement of UL timing adjustment is determined by a minimum required throughput for the moving UE at given SNR. The performance requirements assume HARQ retransmissions. The performance requirements for UL timing adjustment scenario 2 defined in Annex B.4 are optional.
In the tests for UL timing adjustment, two signals are configured, one being transmitted by a moving UE and the other being transmitted by a stationary UE. The transmission of SRS from UE is optional. FRC parameters in Table A.7-1 and Table A.8-1 are applied for both UEs. The received power for both UEs is the same. The resource blocks allocated for both UEs are consecutive. In Scenario 2, Doppler shift is not taken into account.
This requirement shall not be applied to Local Area BS and Home BS.
Table 8.2.2-1 Test parameters for testing UL timing adjustment
8.2.2.1	Minimum requirements
The throughput shall be ≥ 70% of the maximum throughput of the reference measurement channel as specified in Annex A for the moving UE at the SNR given in table 8.2.2.1-1.
Table 8.2.2.1-1 Minimum requirements for UL timing adjustment
8.2.3	Requirements for high speed train
The performance requirement of PUSCH for high speed train is determined by a minimum required throughput for a given SNR. The required throughput is expressed as a fraction of maximum throughput for the FRCs listed in Annex A. The performance requirements assume HARQ retransmissions. The performance requirements for high speed train are optional.
This requirement shall not be applied to Local Area BS and Home BS.
Table 8.2.3-1 Test parameters for high speed train
8.2.3.1	Minimum requirements
The throughput shall be equal to or larger than the fraction of maximum throughput stated in table 8.2.3.1-1 at the given SNR.
Table 8.2.3.1-1 Minimum requirements of PUSCH for high speed train
8.2.4	Requirements for HARQ-ACK multiplexed on PUSCH
Two performance requirements are defined for HARQ-ACK multiplexed on PUSCH: ACK false detection and ACK missed detection requirements.
The ACK false detection probability for PUSCH is the probability that ACK is detected when data only is sent on symbols where HARQ-ACK information can be allocated (i.e. by puncturing data).
The ACK missed detection probability for HARQ-ACK multiplexed on PUSCH is the conditional probability of not detecting an ACK when it was sent on PUSCH resources.
In the tests for ACK missed detection on PUSCH, data is punctured by the control information (i.e. ACK/NACK) in both slots within subframe on symbols as specified in 36.212.
In both tests none of CQI, RI nor SRS is transmitted. Tests are to be performed for one bit HARQ-ACK information (O = 1).
8.2.4.1		Minimum requirement
The ACK false detection probability as well as the ACK missed detection probability for HARQ-ACK multiplexed on PUSCH shall not exceed 1% at PUSCH power settings presented in table 8.2.4.1-1.
Table 8.2.4.1-1 Minimum requirements for HARQ-ACK multiplexed on PUSCH
8.2.5	Requirements for PUSCH with TTI bundling and enhanced HARQ pattern
The performance requirement of PUSCH configured with TTI bundling and enhanced HARQ pattern, as specified in 36.213 [11] clause 8 and 8.0, is determined by residual block error probability (BLER) after HARQ retransmission. The performance is measured by the required SNR at residual BLER of 2% for the FRCs listed in Annex A.11. The residual BLER is defined as follows:
where:
-	A is the number of incorrectly decoded transport blocks after HARQ retransmission.
-	B is the number of transmitted transport blocks (retransmitted transport blocks are not counted repetitively).
The requirement is applicable for FDD. TTI bundling and enhanced HARQ pattern are enabled in the tests.
Table 8.2.5-1: Test parameters for PUSCH with TTI bundling and enhanced HARQ pattern
8.2.5.1	Minimum requirements
The residual BLER shall not exceed 2% at the given SNR in Table 8.2.5.1-1.
Table 8.2.5.1-1: Minimum requirements for PUSCH with TTI bundling and enhanced HARQ pattern
8.2.6	Enhanced performance requirement type A in multipath fading propagation conditions with synchronous interference
The enhanced performance requirement type A of PUSCH is determined by a minimum required throughput for a given SINR. The required throughput is expressed as a fraction of maximum throughput for the FRCs listed in Annex A. The performance requirements assume HARQ retransmissions.
The purpose is to verify the demodulation performance when the wanted PUSCH signal in the serving cell is interfered by PUSCH of one or two dominant interferer(s) applying the interference model defined in clause B.6.2.
The requirements apply to the BS supporting the enhanced performance requirements type A.
The requirements apply to the BS receiving the synchronous interference i.e., the interference is time-synchronous with the tested signal.
Table 8.2.6-1: Test parameters for enhanced performance requirement type A
8.2.6.1	Minimum requirements
The throughput shall be equal to or larger than the fraction of maximum throughput stated in the tables 8.2.6.1-1 to 8.2.6.1-6 at the given SINR.
Table 8.2.6.1-1: Enhanced performance requirement type A for PUSCH, 1.4 MHz Channel Bandwidth
Table 8.2.6.1-2: Enhanced performance requirement type A for PUSCH, 3 MHz Channel Bandwidth
Table 8.2.6.1-3: Enhanced performance requirement type A for PUSCH, 5 MHz Channel Bandwidth
Table 8.2.6.1-4: Enhanced performance requirement type A for PUSCH, 10 MHz Channel Bandwidth
Table 8.2.6.1-5: Enhanced performance requirement type A for PUSCH, 15 MHz Channel Bandwidth
Table 8.2.6.1-6: Enhanced performance requirement type A for PUSCH, 20 MHz Channel Bandwidth
8.2.6A	Enhanced performance requirement type A in multipath fading propagation conditions with asynchronous interference
The enhanced performance requirement type A of PUSCH is determined by a minimum required throughput for a given SINR. The required throughput is expressed as a fraction of maximum throughput for the FRCs listed in Annex A. The performance requirements assume HARQ retransmissions.
The purpose is to verify the demodulation performance when the wanted PUSCH signal in the serving cell is interfered by PUSCH of two interferers from the same interfering cell, applying the interference model defined in clause B.6.3.
The requirements apply to the BS supporting the enhanced performance requirements type A.
The requirements apply to the BS receiving the asynchronous interference i.e., the interference is time-asynchronous with the tested signal.
Table 8.2.6A-1: Test parameters for enhanced performance requirement type A
8.2.6A.1	Minimum requirements
The throughput shall be equal to or larger than the fraction of maximum throughput stated in the tables 8.2.6A.1-1 to 8.2.6A.1-6 at the given SINR.
Table 8.2.6A.1-1 Enhanced performance requirement type A for PUSCH, 1.4 MHz Channel Bandwidth
Table 8.2.6A.1-2 Enhanced performance requirement type A for PUSCH, 3 MHz Channel Bandwidth
Table 8.2.6A.1-3 Enhanced performance requirement type A for PUSCH, 5 MHz Channel Bandwidth
Table 8.2.6A.1-4: Enhanced performance requirement type A for PUSCH, 10 MHz Channel Bandwidth
Table 8.2.6A.1-5: Enhanced performance requirement type A for PUSCH, 15 MHz Channel Bandwidth
Table 8.2.6A.1-6: Enhanced performance requirement type A for PUSCH, 20 MHz Channel Bandwidth
8.2.7	Requirements for PUSCH supporting coverage enhancement
For the parameters specified in Table 8.2.7-1 the throughput shall be equal to or larger than the fraction of maximum throughput stated in the tables8.2.7-2 to 8.2.7-11 at the given SNR.
Table 8.2.7-1 Test Parameters for PUSCH
Table 8.2.7-2 Minimum requirements for PUSCH, 3 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.7-3 Minimum requirements for PUSCH, 5 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.7-4 Minimum requirements for PUSCH, 10 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.7-5 Minimum requirements for PUSCH, 15 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.7-6 Minimum requirements for PUSCH, 20 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.7-7 Minimum requirements for PUSCH, 3 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.7-8 Minimum requirements for PUSCH, 5 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.7-9 Minimum requirements for PUSCH, 10 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.7-10 Minimum requirements for PUSCH, 15 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.7-11 Minimum requirements for PUSCH, 20 MHz Channel Bandwidth for Mode B, 1Tx
8.2.8	Requirements for PUSCH of Frame structure type 3
For the parameters specified in Table 8.2.8-1 the throughput shall be equal to or larger than the fraction of maximum throughput stated in the tables 8.2.8-2 at the given SNR when the PUSCH is transmitted with Frame structure type 3.
Table 8.2.8-1: Test Parameters for PUSCH with frame structure type 3
Table 8.2.8-2: Minimum requirements for PUSCH, 20 MHz Channel Bandwidth, 1Tx
8.2.9	Enhanced performance requirement type B in multipath fading propagation conditions
The purpose is to verify the demodulation performance when there are multiple co-scheduled intra-cell UEs in the serving cell and one inter-cell interfering UE in the negiboring cell. The PUSCH of all the intra-cell UEs are wanted signal for the BS.
The enhanced performance requirement type B of PUSCH is determined by a minimum required throughput for a given SINR. The required throughput is expressed as a fraction of maximum sum throughput of all the intra-cell UEs for the FRCs listed in Annex A. The performance requirements assume HARQ retransmissions.
The requirements apply to the BS supporting the enhanced performance requirements type B.
Table 8.2.9-1: Test parameters for enhanced performance requirement type B, 2 RX antennas
Table 8.2.9-2: Test parameters for enhanced performance requirement type B, 4 RX antennas
8.2.9.1	Minimum requirements
The throughput shall be equal to or larger than the fraction of maximum throughput stated in the tables 8.2.9.1-1 to 8.2.9.1-6 at the given SINR.
Table 8.2.9.1-1: Enhanced performance requirement type B for PUSCH, 1.4 MHz Channel Bandwidth
Table 8.2.9.1-2: Enhanced performance requirement type B for PUSCH, 3 MHz Channel Bandwidth
Table 8.2.9.1-3: Enhanced performance requirement type B for PUSCH, 5 MHz Channel Bandwidth
Table 8.2.9.1-4: Enhanced performance requirement type B for PUSCH, 10 MHz Channel Bandwidth
Table 8.2.9.1-5: Enhanced performance requirement type B for PUSCH, 15 MHz Channel Bandwidth
Table 8.2.9.1-6: Enhanced performance requirement type B for PUSCH, 20 MHz Channel Bandwidth
8.2.10	Requirements for PUSCH supporting subPRB transmission
For the parameters specified in Table 8.2.10-1 the throughput shall be equal to or larger than the fraction of maximum throughput stated in the tables8.2.10-2 to 8.2.10-11 at the given SNR.
The requirements apply to the BS supporting the PUSCH with subPRB transmission.
Table 8.2.10-1: Test Parameters for PUSCH
Table 8.2.10-2: Minimum requirements for PUSCH, 3 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.10-3: Minimum requirements for PUSCH, 5 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.10-4: Minimum requirements for PUSCH, 10 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.10-5: Minimum requirements for PUSCH, 15 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.10-6: Minimum requirements for PUSCH, 20 MHz Channel Bandwidth for Mode A, 1Tx
Table 8.2.10-7: Minimum requirements for PUSCH, 3 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.10-8: Minimum requirements for PUSCH, 5 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.10-9: Minimum requirements for PUSCH, 10 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.10-10: Minimum requirements for PUSCH, 15 MHz Channel Bandwidth for Mode B, 1Tx
Table 8.2.10-11: Minimum requirements for PUSCH, 20 MHz Channel Bandwidth for Mode B, 1Tx
8.3	Performance requirements for PUCCH
8.3.1	DTX to ACK performance
The DTX to ACK requirement is valid for any number of receive antennas, for all frame structures and for any channel bandwidth.
The DTX to ACK probability for multi user PUCCH case denotes the probability that ACK is detected when nothing is sent on the wanted signal and the interfering signals are present.
8.3.1.1		Minimum requirement
The DTX to ACK probability, i.e. the probability that ACK is detected when nothing was sent, shall not exceed 1%, where the performance measure definition is as follows:
,
where:
●	#(false ACK bits) denotes the number of detected ACK bits.
●	#(ACK/NACK bits) denotes the number of encoded bits per sub-frame
●	#(PUCCH DTX) denotes the number of DTX occasions
8.3.2	ACK missed detection requirements for single user PUCCH format 1a
The ACK missed detection probability is the probability of not detecting an ACK when an ACK was sent.
ACK/NACK repetitions are disabled for PUCCH transmission.
Test parameters for PUCCH transmission on two antenna ports are presented in Annex A.10.
8.3.2.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.3.2.1-1 for 1Tx and in table 8.3.2.1-2 for 2Tx case.
Table 8.3.2.1-1 Minimum requirements for single user PUCCH format 1a, 1Tx
Table 8.3.2.1-2 Minimum requirements for single user PUCCH format 1a, 2Tx
8.3.3	CQI performance requirements for PUCCH format 2
The CQI block error probability (BLER) is defined as the conditional probability of incorrectly decoding the CQI information when the CQI information is sent. All CQI information shall be decoded (no exclusion due to DTX).
The CQI information bit payload per sub-frame is equal to 4 bits.
Test parameters for PUCCH transmission on two antenna ports are presented in Annex A.10.
8.3.3.1	Minimum requirements
The CQI block error probability shall not exceed 1% at the SNR given in table 8.3.3.1-1 for 1Tx and in table 8.3.3.1-2 for 2Tx case.
Table 8.3.3.1-1 Minimum requirements for PUCCH format 2, 1Tx
Table 8.3.3.1-2 Minimum requirements for PUCCH format 2, 2Tx
8.3.4	ACK missed detection requirements for multi user PUCCH format 1a
The ACK missed detection probability is the conditional probability of not detecting an ACK on the wanted signal in the presence of the wanted signal and the interfering signals.
Test parameters for multi user PUCCH case are presented in Annex A.9.
ACK/NACK repetitions are disabled for PUCCH transmission.
8.3.4.1	Minimum requirement
The ACK missed detection probability for multi user PUCCH case shall not exceed 1% at the SNR given in table 8.3.4.1-1.
Table 8.3.4.1-1 Minimum requirements for multi user PUCCH case
8.3.5	ACK missed detection requirements for PUCCH format 1b with Channel Selection
The ACK missed detection probability is the probability of not detecting an ACK bit when an ACK bit was sent on particular channel, with each missed ACK bit counted as one error.
The number of encoded ACK bits per sub-frame is equal to 4 bits (AAAA),
ACK/NACK repetitions are disabled for PUCCH transmission.
This requirement is applicable for FDD and TDD.
8.3.5.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.3.5.1-1.
Table 8.3.5.1-1 Minimum requirements for PUCCH format 1b with Channel Selection
8.3.6	ACK missed detection requirements for PUCCH format 3
The ACK missed detection probability is the probability of not detecting an ACK bit when an ACK bit was sent on the particular bit position, with each missed ACK bit being accounted as one error.
The number of encoded ACK/NACK bits per sub-frame is defined for two cases as presented below:
●	4AN bits: applicable for FDD and TDD
●	16AN bits : applicable for TDD
ACK/NACK repetitions are disabled for PUCCH transmission. Random codeword selection is assumed.
8.3.6.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.3.6.1-1 and table 8.3.6.1-2, for 4 and 16 AN bits per sub-frame, respectively.
Table 8.3.6.1-1 Minimum requirements for PUCCH format 3, 4AN bits
Table 8.3.6.1-2 Minimum requirements for PUCCH format 3, 16AN bits
8.3.7	NACK to ACK requirements for PUCCH format 3
The NACK to ACK detection probability is the probability that an ACK bit is falsely detected when an NACK bit was sent on the particular bit position, where the NACK to ACK detection probability is defined as follows:
,
where:
●	denotes the total number of NACK bits transmitted
●	denotes the number of NACK bits decoded as ACK bits at the receiver, i.e. the number of received ACK bits
●	NACK bits in the definition do not contain the NACK bits which are mapped from DTX, i.e. NACK bits received when DTX is sent should not be considered.
ACK/NACK repetitions are disabled for PUCCH transmission. Random codeword selection is assumed.
Note: NACK to ACK requirement only applies to the PUCCH format3 16AN bits cases.
8.3.7.1	Minimum requirement
The NACK to ACK probability shall not exceed 0,1% at the SNR given in table 8.3.7.1-1 for 16 AN bits.
Table 8.3.7.1-1 Minimum requirements for PUCCH format 3, 16AN bits
8.3.8	CQI performance requirements for PUCCH format 2 with DTX detection
The requirements in this subclause apply to a BS supporting PUCCH format 2 with DTX. It is optional for a BS to support PUCCH format 2 with DTX.
A BS may meet the PUCCH format 2 requirements specified in Section 8.3.8.1 instead of requirements specified in Section 8.3.3.1.
The CQI block error probability (BLER) is defined as the sum of the:
-	conditional probability of incorrectly decoding the CQI information when the CQI information is sent and
-	conditional probability of detecting UE transmission as DTX, when the CQI information is sent.
The CQI false alarm probability is defined as the conditional probability of false detecting the CQI information transmitted from UE when no CQI information is sent.
The CQI information bit payload per sub-frame is equal to 4 bits.
Test parameters for PUCCH transmission on two antenna ports are presented in Annex A.10.
8.3.8.1	Minimum requirements
The CQI false alarm probability and the CQI block error probability shall not exceed 10% and 1%, respectively, at the SNR given in table 8.3.8.1-1.
Table 8.3.8.1-1 Minimum requirements for PUCCH format 2 with DTX detection
8.3.9	PUCCH performance requirements for coverage enhancement
8.3.9.1	DTX to ACK performance
The DTX to ACK requirement is valid for any number of receive antennas, for all frame structures and for any channel bandwidth.
8.3.9.1.1	Minimum requirement
The DTX to ACK probability, i.e. the probability that ACK is detected when nothing is sent per PUCCH transmission, shall not exceed 1% per PUCCH transmission. A PUCCH transmission may take multiple subframes due to PUCCH transmission repetition. The performance measure is defined as follows:
,
where:
-	#(false ACK bits) denotes the number of detected ACK bits per PUCCH transmission.
-	#(ACK/NACK bits) denotes the number of encoded bits per PUCCH transmission.
-	#(PUCCH DTX) denotes the number of DTX occasions per PUCCH transmission.
8.3.9.2	ACK missed detection requirements for single user PUCCH format 1a
The ACK missed detection probability is the probability of not detecting an ACK when an ACK is sent.
8.3.9.2.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.3.9.2.1-1 for 1Tx.
Table 8.3.9.2.1-1 Minimum requirements for single user PUCCH format 1a, 1Tx
8.3.9.3	CQI performance requirements for PUCCH format 2
The CQI block error probability (BLER) is defined as the conditional probability of incorrectly decoding the CQI information when the CQI information is sent per PUCCH transmission. A PUCCH transmission may take multiple subframes due to PUCCH transmission repetition. All CQI information shall be decoded (no exclusion due to DTX).
The CQI information bit payload per PUCCH transmission is equal to 4 bits.
8.3.9.3.1	Minimum requirements
The CQI block error probability shall not exceed 1% at the SNR given in table 8.3. 9.3.1-1 for 1Tx.
Table 8.3.9.3.1-1 Minimum requirements for PUCCH format 2, 1Tx
8.3.10	ACK missed detection requirements for PUCCH format 4
The ACK missed detection probability is the probability of not detecting an ACK bit when an ACK bit was sent on the particular bit position, with each missed ACK bit being accounted as one error.
The number of encoded ACK/NACK bits per sub-frame is defined for two cases as presented below:
●	24AN bits with 1PRB allocated
●	64AN bits with 2PRB allocated
The requirements are applicable for FDD only, TDD only and TDD-FDD CA.
The requirements are applicable for both PUCCH on PCell and PUCCH on SCell.
ACK/NACK repetitions are disabled for PUCCH transmission. DAI based codebook size determination is disabled.  Random codeword selection is assumed.
8.3.10.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.3.10.1-1 and table 8.3.10.1-2 for 24 AN bits with 1 PRB allocated and 64 AN bits with 2 PRB allocated per sub-frame, respectively.
Table 8.3.10.1-1 Minimum requirements for PUCCH format 4, 24AN bits with 1 PRB allocated
Table 8.3.10.1-2 Minimum requirements for PUCCH format 4, 64AN bits with 2 PRB allocated
8.3.11	ACK missed detection requirements for PUCCH format 5
The ACK missed detection probability is the probability of not detecting an ACK bit when an ACK bit was sent on the particular bit position, with each missed ACK bit being accounted as one error.
The number of encoded ACK/NACK bits per sub-frame is equal to 24 bits.
The requirement is applicable for FDD only, TDD only and TDD-FDD CA. The requirement is applicable for both PUCCH on PCell and PUCCH on SCell.
ACK/NACK repetitions are disabled for PUCCH transmission. DAI based codebook size determination is disabled. Random codeword selection is assumed.
8.3.11.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.3.11.1-1.
Table 8.3.11.1-1 Minimum requirements for PUCCH format 5
8.4	Performance requirements for PRACH
8.4.1	PRACH False alarm probability
The false alarm requirement is valid for any number of receive antennas, for all frame structures and for any channel bandwidth.
The false alarm probability is the conditional total probability of erroneous detection of the preamble (i.e. erroneous detection from any detector) when input is only noise.
8.4.1.1	Minimum requirement
The false alarm probability shall be less than or equal to 0.1%.
8.4.2	PRACH detection requirements
The probability of detection is the conditional probability of correct detection of the preamble when the signal is present. There are several error cases – detecting different preamble than the one that was sent, not detecting a preamble at all or correct preamble detection but with the wrong timing estimation. For AWGN, a timing estimation error occurs if the estimation error of the timing of the strongest path is larger than 1.04us. For ETU70 and EPA1, a timing estimation error occurs if the estimation error of the timing of the strongest path is larger than 2.08us. The strongest path for the timing estimation error refers to the strongest path (i.e. average of the delay of all paths having the same highest gain = 310ns for ETU) in the power delay profile.
The test preambles for normal mode are listed in table A.6-1 and the test preambles for high speed mode restriced set type A are listed in A.6-2. The test preambles for coverage enhancement are listed in table A.6-3. The test preambles for high speed mode restriced set type B are listed in A.6-4.
8.4.2.1	Minimum requirements
The probability of detection shall be equal to or exceed 99% for the SNR levels listed in Tables 8.4.2.1-1 to 8.4.2.1-5.
The requirements for Burst format 4 are optional and only valid for base stations supporting TDD. The requirements for high speed mode restricted set type A (table 8.4.2.1-2) and high speed mode restricted set type B (table 8.4.2.1-5) are only valid for the base stations supporting high speed mode restricted set A and restricted set type B respectively.
The requirements for coverage enhancement (Tables 8.4.2.1-3 and 8.4.2.1-4) are only valid for the base stations supporting coverage enhancement.
Table 8.4.2.1-1 PRACH missed detection requirements for Normal Mode
The requirements in Table .1-2 shall not be applied to Local Area BS and Home BS.
Table 8.4.2.1-2 PRACH missed detection requirements for High speed Mode restricted set type A
Table 8.4.2.1-3 PRACH missed detection requirements for coverage enhancement (PRACH frequency hopping OFF)
Table 8.4.2.1-4 PRACH missed detection requirements for coverage enhancement (PRACH frequency hopping ON)
Table 8.4.2.1-5 PRACH missed detection requirements for High speed Mode restricted set type B
8.5	Performance requirements for Narrowband IoT
8.5.1	Requirements for NPUSCH format 1
8.5.1.1	Requirements
The performance requirement of NPUSCH format 1 is determined by a minimum required throughput for a given SNR. The required throughput is expressed as a fraction of maximum throughput for the FRCs listed in Annex A16. The performance requirements assume HARQ retransmissions.
An NB-IoT Base Station supports 15 kHz subcarrier spacing requirements, or 3.75 kHz subcarrier spacing requirements, or both.
For 15kHz subcarrier spacing single-subcarrier/multi-subcarrier, the demodulation requirements apply for the supported number of subcarriers.
Table 8.5.1.1-1: Test parameters
8.5.1.1.1	Minimum requirements
The throughput shall be equal to or larger than the fraction of maximum throughput stated in table 8.5.1.1.1-1 for the single-subcarrier of 3.75KHz subcarrier spacing,  in table 8.5.1.1.1-2 for 15KHz subcarrier spacing at the given SNR for 1Tx, and in table 8.5.1.1.1-3 for multi-subcarrier of 15KHz subcarrier spacing at the given SNR for 1Tx.
Table 8.5.1.1.1-1: Minimum requirements for NPUSCH format 1, 200KHz Channel Bandwidth, 3.75KHz subcarrier spacing, 1Tx
Table 8.5.1.1.1-2: Minimum requirements for NPUSCH format 1, 200KHz Channel Bandwidth, 15KHz subcarrier spacing, single subcarrier, 1Tx
Table 8.5.1.1.1-3: Minimum requirements for NPUSCH format 1, 200KHz Channel Bandwidth, 15KHz subcarrier spacing, multiple subcarriers, 1Tx
8.5.2	Performance requirements for NPUSCH format 2
8.5.2.1	DTX to ACK performance
The DTX to ACK probability for NPUSCH format 2 case denotes the probability that ACK is detected when nothing is sent on the wanted signal and only the noise is present per NPUSCH format 2 transmission.
An NB-IoT Base Station supports 15 KHz sub-carrier spacing requirements, or 3.75 KHz sub-carrier spacing requirements, or both.
8.5.2.1.1	Minimum requirement
The DTX to ACK probability, i.e. the probability that ACK is detected when nothing was sent, shall not exceed 1% per NPUSCH format 2 transmission. Where the performance measure definition is as follows:
	
where:
-	#(false ACK bits) denotes the number of detected ACK bits.
-	#(ACK/NACK bits) denotes the number of HARQ-ACK information bit per NPUSCH format 2 transmission.
-	#( NPUSCH format 2 DTX) denotes the number of DTX occasions.
8.5.2.2	ACK missed detection requirements
The ACK missed detection probability is the probability of not detecting an ACK when an ACK was sent per NPUSCH format 2 transmission.
8.5.2.2.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.5.2.2.1-1 and table 8.5.2.2.1-2 for 1Tx case.
Table 8.5.2.2.1-1: Minimum requirements for NPUSCH format 2, 200KHz Channel Bandwidth, 3.75KHz subcarrier spacing, 1Tx
Table 8.5.2.2.1-2: Minimum requirements for NPUSCH format 2, 200KHz Channel Bandwidth, 15KHz subcarrier spacing, 1Tx
8.5.3	Performance requirements for NPRACH
8.5.3.1	NPRACH False alarm probability
The false alarm requirement is valid for any number of receive antennas, for all repetition numbers and for any number of subcarriers.
The false alarm probability is the conditional total probability of erroneous detection of the preamble (i.e. erroneous detection from any detector) when input is only noise.
8.5.3.1.1	Minimum requirement
The false alarm probability shall be less than or equal to 0.1%.
8.5.3.2	NPRACH detection requirements
The probability of detection is the conditional probability of correct detection of the preamble when the signal is present. There are several error cases – detecting different preamble than the one that was sent, not detecting a preamble at all or correct preamble detection but with the wrong timing estimation. A timing estimation error occurs if the estimation error of the timing of the strongest path is larger than 3.646us. The strongest path for the timing estimation error refers to the strongest path in the power delay profile.
Table 8.5.3.2-1 Test preambles for NPRACH
8.5.3.2.1	Minimum requirements
The probability of detection shall be equal to or exceed 99% for the SNR levels listed in table 8.5.3.2.1-1.
Table 8.5.3.2.1-1 NPRACH missed detection requirements
8.6	Performance requirements for subslot-PUSCH
8.6.1	Requirements
The performance requirement of subslot-PUSCH is determined by a minimum required throughput for a given SNR. The required throughput is expressed as a fraction of maximum throughput for the FRCs listed in Annex A. The performance requirements assume HARQ retransmissions. The requirements defined based on FRC in Annex A.23 apply to the BS supporting subslot-PUSCH.
Table 8.6.1-1: Test parameters for testing subslot-PUSCH
8.6.1.1	Minimum requirements
The throughput shall be equal to or larger than the fraction of maximum throughput stated in the Tables 8.6.1.1-1 to 8.6.1.1-4 at the given SNR for 1Tx.
Table 8.6.1.1-1: Minimum requirements for PUSCH, 5 MHz Channel Bandwidth, 1Tx
Table 8.6.1.1-2: Minimum requirements for PUSCH, 10 MHz Channel Bandwidth, 1Tx
Table 8.6.1.1-3: Minimum requirements for PUSCH, 15 MHz Channel Bandwidth, 1Tx
Table 8.6.1.1-4: Minimum requirements for PUSCH, 20 MHz Channel Bandwidth, 1Tx
8.7	Performance requirements for SPUCCH
8.7.1	ACK missed detection requirements for single user SPUCCH format 1a
The ACK missed detection probability is the probability of not detecting an ACK when an ACK was sent.
8.7.1.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in Table 8.7.1.1-1.
Table 8.7.1.1-1: Minimum requirements for single user SPUCCH format 1a, 1Tx
8.7.2	ACK missed detection requirements for SPUCCH format 4
The ACK missed detection probability is the probability of not detecting an ACK bit when an ACK bit was sent on the particular bit position, with each missed ACK bit being accounted as one error. 
The number of encoded ACK/NACK bits per subslot is 3. The transmitted subslots include both subslot with =2 and subslot with =3.
8.7.2.1	Minimum requirements
The ACK missed detection probability shall not exceed 1% at the SNR given in table 8.7.2.1-1 for 3 AN bits per subslot.
Table 8.7.2.1-1: Minimum requirements for SPUCCH format 4, 3AN bits
9	Void
Annex A (normative): 
Reference measurement channels
The parameters for the reference measurement channels are specified in clause A.1 for E-UTRA reference sensitivity and in-channel selectivity and in clause A.2 for dynamic range.
A schematic overview of the encoding process for the E-UTRA reference measurement channels is provided in Figure A-1.
E-UTRA receiver requirements in the present document are defined with a throughput stated relative to the Maximum throughput of the FRC. The Maximum throughput for an FRC equals the Payload size * the Number of uplink subframes per second. For FDD, 1000 uplink sub-frames per second are used.
The parameters for the reference measurement channels are specified in clause A.12 for NB-IoT reference sensitivity and in clause A.13 for dynamic range.
A schematic overview of the encoding process for the NB-IoT reference measurement channels is provided in Figure A-2.
NB-IoT receiver requirements in the present document are defined with a throughput stated relative to the Maximum throughput of the FRC. The Maximum throughput for an FRC equals the Payload size / (Number of Resource Unit * time to send one Resource Unit).
Figure A-1. Schematic overview of the encoding process
Figure A-2. Schematic overview of the encoding process for NB-IoT
A.1	Fixed Reference Channels for reference sensitivity and in-channel selectivity (QPSK, R=1/3)
The parameters for the reference measurement channels are specified in Table A.1-1 for reference sensitivity and in-channel selectivity.
Table A.1-1 FRC parameters for reference sensitivity and in-channel selectivity
A.2	Fixed Reference Channels for dynamic range (16QAM, R=2/3)
The parameters for the reference measurement channels are specified in Table A.2-1 for dynamic range.
Table A.2-1 FRC parameters for dynamic range
A.3	Fixed Reference Channels for performance requirements (QPSK 1/3)
Table A.3-1 FRC parameters for performance requirements (QPSK 1/3)
A.4	Fixed Reference Channels for performance requirements (16QAM 3/4)
Table A.4-1 FRC parameters for performance requirements (16QAM 3/4)
A.5	Fixed Reference Channels for performance requirements (64QAM 5/6)
Table A.5-1 FRC parameters for performance requirements (64QAM 5/6)
A.6	PRACH Test preambles
Table A.6-1 Test preambles for Normal Mode
Table A.6-2 Test preambles for High speed Mode restricted set type A
Table A.6-3 Test preambles for coverage enhancement
Table A.6-4 Test preambles for High speed Mode restricted set type B
A.7	Fixed Reference Channels for UL timing adjustment (Scenario 1)
Table A.7-1 FRC parameters for UL timing adjustment (Scenario 1)
A.8	Fixed Reference Channels for UL timing adjustment (Scenario 2)
Table A.8-1 FRC parameters for UL timing adjustment (Scenario 2)
A.9	Multi user PUCCH test
Table A.9-1 Test parameters for multi user PUCCH case
A.10	PUCCH transmission on two antenna ports test
Table A.10-1 Test parameters for PUCCH transmission on two antenna ports case
A.11	Fixed Reference Channel for PUSCH with TTI bundling and enhanced HARQ pattern
Table A.11-1 FRC parameters for PUSCH with TTI bundling and enhanced HARQ pattern
A.12	Fixed Reference Channels for performance requirements (QPSK 0.36)
Table A.12-1 FRC parameters for performance requirements (QPSK 0.36)
A.13	Fixed Reference Channels for performance requirements (16QAM 1/2)
Table A.13-1 FRC parameters for performance requirements (16QAM 1/2)
A.14	Fixed Reference Channels for NB-IOT reference sensitivity (π/2 BPSK, R=1/3)
The parameters for the reference measurement channels are specified in Table A.14-1 for reference sensitivity.
Table A.14-1 FRC parameters for reference sensitivity and in-channel selectivity
A.15	Fixed Reference Channels for NB-IoT dynamic range (π/4 QPSK, R=2/3)
The parameters for the reference measurement channels are specified in Table A.15-1 for NB-IoT dynamic range.
Table A.15-1 FRC parameters for NB-IoT dynamic range
A.16	Fixed Reference Channels for NB-IoT NPUSCH format 1
A.16.1	One PRB
Table A.16.1-1: FRC parameters for NB-IoT NPUSCH format 1
A.17	Fixed Reference Channels for performance requirements (256QAM 5/6)
Table A.17-1 FRC parameters for performance requirements (256QAM 5/6)
A.18	Fixed Reference Channels for PUSCH transmission in UpPTS (16QAM 0.65)
Table A.18-1: FRC parameters for PUSCH transmission in UpPTS (16QAM 0.65)
A.19	Fixed Reference Channels for PUSCH transmission in UpPTS (256QAM 0.69)
Table A.19-1: FRC parameters for PUSCH transmission in UpPTS (256QAM 0.69)
A.20 Fixed Reference Channels for PUSCH of Frame structure type 3
Table A.20-1: FRC parameters for performance requirements (QPSK 1/3)
Table A.20-2 FRC parameters for performance requirements (16QAM 3/4)
A.21	Fixed Reference Channels for performance requirements (QPSK 3/5)
Table A.21-1 FRC parameters for performance requirements (QPSK 3/5)
A.22	Fixed Reference Channels for performance requirements (64QAM 1/2)
Table A.22-1 FRC parameters for performance requirements (64QAM 1/2)
A.23	Fixed Reference Channels for SubPRB allocation reference sensitivity (π/2 BPSK, R=1/3)
The parameters for the reference measurement channels are specified in Table A.23-1 for reference sensitivity.
Table A.23-1 FRC parameters for reference sensitivity and in-channel selectivity
A.24	Fixed Reference Channel for subslot-PUSCH
Table A.24-1: FRC parameters for performance requirements (16QAM 3/4)
A.25	Fixed Reference Channels for PUSCH with SubPRB transmission
Table A.25-1: FRC parameters for performance requirements (subPRB transmission)
Annex B (normative): 
Propagation conditions
B.1	Static propagation condition
The propagation for the static performance measurement is an Additive White Gaussian Noise (AWGN) environment. No fading or multi-paths exist for this propagation model.
B.2	Multi-path fading propagation conditions
Tables B.2-1 – B.2-3 show multi-path delay profiles that are used for the performance measurements in multi-path fading environment. All taps have classical Doppler spectrum, defined as:
(CLASS)		for f  -fD, fD.
Table B.2-1 Extended Pedestrian A model (EPA)
Table B.2-2 Extended Vehicular A model (EVA)
Table B.2-3 Extended Typical Urban model (ETU)
A multipath fading propagation condition is defined by a combination of a multi-path delay profile and a maximum Doppler frequency fD which is either 5, 70 or 300 Hz. In addidion, 200 Hz Doppler frequency is specified for UL timing adjustment performance requirement.
For carrier aggregation requirements, the fading of the signals for each carrier shall be independent.
B.3	High speed train condition
High speed train conditions are as follows:
Scenario 1: Open space
Scenario 3: Tunnel for multi-antennas
The high speed train conditions for the test of the baseband performance are two non-fading propagation channels in both scenarios. For BS with Rx diversity defined in scenario 1, the Doppler shift variation is the same between antennas.
Doppler shift for both scenarios is given by:
		(B.3.1)
where  is the Doppler shift and  is the maximum Doppler frequency. The cosine of angle is given by:
	, 	(B.3.2)	
,                            (B.3.3)
,                            (B.3.4)
where  is the initial distance of the train from BS, and  is BS-Railway track distance, both in meters;  is the velocity of the train in m/s,  is time in seconds.
Doppler shift and cosine angle is given by equation B.3.1 and B.3.2-B.3.4 respectively, where the required input parameters listed in table B.3-1 and the resulting Doppler shift shown in Figure B.3-1 and B.3-2 are applied for all frequency bands.
Table B.3-1: Parameters for high speed train conditions
NOTE1:	Parameters for HST conditions in table B.3-1 including  and Doppler shift trajectories presented on figures B.3-1 and B.3-2 were derived from Band1 and are applied for performance verification in all frequency bands.
Figure B.3-1: Doppler shift trajectory for scenario 1
Figure B.3-2: Doppler shift trajectory for scenario 3
B.4	Moving propagation conditions
Figure B.4-1 illustrates the moving propagation conditions for the test of the UL timing adjustment performance. The time difference between the reference timing and the first tap is according Equation (B.4-1). The timing difference between moving UE and stationary UE is equal to Δτ - (TA 31)16Ts. The relative timing among all taps is fixed. The parameters for the moving propagation conditions are shown in Table B.4-1.
Figure B.4-1: Moving propagation conditions
                                                       (B.4-1)
Table B.4-1: Parameters for UL timing adjustment
NOTE 1:	Multipath fading propagation conditions for Scenario 1 were derived for Band 1 with additional rounding applied to the Doppler frequency calculated for the specified UE speed.
NOTE 2:	In Scenario 2, Doppler shift is not taken into account.
B.5	Multi-Antenna channel models
The MIMO channel correlation matrices defined in B.5 apply for the antenna configuration using uniform linear arrays at both UE and eNodeB.
B.5.1	Definition of MIMO Correlation Matrices
Table B.5.1-1 defines the correlation matrix for the eNodeB:
Table B.5.1-1 eNodeB correlation matrix
Table B.5.1-2 defines the correlation matrix for the UE:
Table B.5.1-2 UE correlation matrix
Table B.5.1-3 defines the channel spatial correlation matrix. The parameters α and β in Table B.5.1-3 defines the spatial correlation between the antennas at the eNodeB and UE respectively.
Table B.5.1-3:  correlation matrices
For cases with more antennas at either eNodeB or UE or both, the channel spatial correlation matrix can still be expressed as the Kronecker product of  and  according to .
B.5.2	MIMO Correlation Matrices at High, Medium and Low Level
The  and  for different correlation types are given in Table B.5.2-1.
Table B.5.2-1 Correlation for High Medium and Low Level
The correlation matrices for high, medium and low correlation are defined in Table B.5.2-2, B.5.2-3 and B.5.2-4 as below.
The values in Table B.5.2-2 have been adjusted for the 2x4 and 4x4 high correlation cases to insure the correlation matrix is positive semi-definite after round-off to 4 digit precision.  This is done using the equation:
Where the value “a” is a scaling factor such that the smallest value is used to obtain a positive semi-definite result.  For the 2x4 high correlation case, a=0.00010. For the 4x4 high correlation case, a=0.00012.
The same method is used to adjust the 4x4 medium correlation matrix in Table B.5.2-3 to insure the correlation matrix is positive semi-definite after round-off to 4 digit precision with a =0.00012.
Table B.5.2-2: MIMO correlation matrices for high correlation
Table B.5.2-3: MIMO correlation matrices for medium correlation
Table B.5.2-4: MIMO correlation matrices for low correlation
In Table B.5.2-4,  is a  identity matrix.
NOTE:	For completeness, the 1x2 cases were defined for high, medium and low correlation but for Rel-8 onwards for 1Tx, performance requirements exist only for low correlation.
B.5A	Multi-Antenna channel models using cross polarized antennas
The MIMO channel correlation matrices defined in B.5A apply to two cases as presented below:
-	One TX antenna and multiple RX antennas case, with cross polarized antennas used at eNodeB
-	Multiple TX antennas and multiple RX antennas case, with cross polarized antennas used at both UE and eNodeB
The cross-polarized antenna elements with +/-45 degrees polarization slant angles are deployed at eNB. For one TX antenna case, antenna element with +90 degree polarization slant angle is deployed at UE. For multiple TX antennas case, cross-polarized antenna elements with +90/0 degrees polarization slant angles are deployed at UE.
For the cross-polarized antennas, the N antennas are labelled such that antennas for one polarization are listed from 1 to N/2 and antennas for the other polarization are listed from N/2+1 to N, where N is the number of TX or RX antennas.
B.5A.1	Definition of MIMO Correlation Matrices using cross polarized antennas
For the channel spatial correlation matrix, the following is used:
Where
-	 is the spatial correlation matrix at the UE with same polarization,
-	 is the spatial correlation matrix at the eNB with same polarization,
-	 is a polarization correlation matrix,
-	 is a permutation matrix, and
-	denotes transpose.
Table B.5A.1-1 defines the polarization correlation matrix.
Table B.5A.1-1 Polarization correlation matrix
The matrixis defined as
where  and  is the number of TX and RX antennas respectively, and  is the ceiling operator.
The matrix  is used to map the spatial correlation coefficients in accordance with the antenna element labelling system described in B.5A.
B.5A.2	Spatial Correlation Matrices at UE and eNB sides
B.5A.2.1	Spatial Correlation Matrices at UE side
For 1-antenna transmitter, .
For 2-antenna transmitter using one pair of cross-polarized antenna elements, .
For 4-antenna transmitter using two pairs of cross-polarized antenna elements, .
B.5A.2.2	Spatial Correlation Matrices at eNB side
For 2-antenna receiver using one pair of cross-polarized antenna elements, .
For 4-antenna receiver using two pairs of cross-polarized antenna elements, .
For 8-antenna receiver using four pairs of cross-polarized antenna elements, .
B.5A.3	MIMO Correlation Matrices using cross polarized antennas
The values for parameters α, β and γ for low spatial correlation are given in Table B.5A.3-1.
Table B.5A.3-1	Values for parameters α,  and γ
The correlation matrices for low spatial correlation are defined in Table B.5A.3-2 as below.
Table B.5A.3-2	MIMO correlation matrices for low spatial correlation
In Table B.5A.3-2,  is a  identity matrix.
B.6	Interference model for enhanced performance requirements type A and type B
This clause provides a description for the modelling of inter-cell interfering UE transmissions for enhanced performance requirements type A and type B, including: definition of dominant interferer proportion, interference model for synchronous scenario and interference model for asynchronous scenario.
B.6.1	Dominant interferer proportion
Each inter-cell interferer involved in enhanced performance requirements type A and type B is characterized by its associated dominant interferer proportion (DIP) value:
 ( = 1,…, )
where   is the received energy from the i-th strongest inter-cell interferer involved in the requirement scenario and  where  is the the energy of the white noise source consistent with the definition provided in subclause 8.1 and  is the total number of simultaneously transmitted inter-cell interferers involved in a given requirement scenario.
B.6.2	Interference model for synchronous scenario
This subclause provides interference modelling for each explicitly modelled inter-cell interferer in the requirement scenario where the inter-cell interferer(s) are time-synchronous with the tested signal.
In each subframe, each interferer shall transmit 16QAM randomly modulated data over the entire PUSCH region and the same resource blocks as the tested signal. Demodulation reference signal, configured according to Table 8.2.6-1 for enhanced performance requirements type A, and Table 8.2.9-1 to Table 8.2.9-2 for enhanced performance requirements type B, is transmitted associated with the transmission of PUSCH.
B.6.3	Interference model for asynchronous scenario
This subclause provides interference modelling for each explicitly modelled inter-cell interferer in the requirement scenario where the inter-cell interferer(s) are time-asynchronous with the tested signal.
Two interfering UEs from the same interfering cell, named interferer 1-1 and interferer 1-2, are modelled. Interferer 1-1 and interferer 1-2 shall transmit 16QAM randomly modulated data over the entire PUSCH region and the same resource blocks as the tested signal, respectively in the even subframes and odd subframes, as illustrated in Figure B.6.3-1. Demodulation reference signal, configured according to Table 8.2.6A-1, is transmitted associated with the transmission of PUSCH. The transmissions of both interferer 1-1 and interferer 1-2 are delayed with respect to the tested signal by 0.33 ms.
Figure B.6.3-1: Configuration of asynchronous interferers
Annex C (normative): 
Characteristics of the interfering signals
For E-UTRA or E-UTRA with NB-IoT (in-band and/or guard band operation) BS, the interfering signal shall be a PUSCH containing data and reference symbols. Normal cyclic prefix is used. The data content shall be uncorrelated to the wanted signal and modulated according to clause 5 of TS36.211. Mapping of PUSCH modulation to receiver requirement are specified in table C-1.1.
Table C-1: Modulation of the interfering signal
For NB-IoT standalone BS, the interfering signal shall be a NPUSCH containing data and reference symbols. Normal cyclic prefix is used. The data content shall be uncorrelated to the wanted signal and modulated according to clause 10.1 of TS36.211. Mapping of NPUSCH modulation to receiver requirement are specified in table C-2.
Table C-2: Modulation of the interfering signal – NB-IoT
Annex D (normative): 
Environmental requirements for the BS equipment
The BS equipment shall fulfil all the requirements in the full range of environmental conditions for the relevant environmental class from the relevant IEC specifications listed below
60 721-3-3	"Stationary use at weather protected locations" [13]
60 721-3-4	"Stationary use at non weather protected locations" [14]
Normally it should be sufficient for all tests to be conducted using normal test conditions except where otherwise stated. For guidance on the use of test conditions to be used in order to show compliance refer to TS 36.141.
Annex E (normative): 
Error Vector Magnitude
E.1	Reference point for measurement
The EVM shall be measured at the point after the FFT and a zero-forcing (ZF) equalizer in the receiver, as depicted in Figure E.1-1 below.
Figure E.1-1: Reference point for EVM measurement
E.2	Basic unit of measurement
The basic unit of EVM measurement is defined over one subframe (1ms) for subframe TTI and over one sTTI when supporting sTTI feature in the time domain and  subcarriers (180kHz) in the frequency domain:
where
 is the set of symbols with the considered modulation scheme being active within the subframe or within the sTTI,
is the set of subcarriers within the  subcarriers with the considered modulation scheme being active in symbol t,
 is the ideal signal reconstructed by the measurement equipment in accordance with relevant Tx models,
 is the modified signal under test defined in E.3.
Note:	Although the basic unit of measurement is one subframe or one sTTI, the equalizer is calculated over 10 subframe measurement periods to reduce the impact of noise in the reference symbols. The boundaries of the 10 subframe measurement periods need not be aligned with radio frame boundaries.
E.3	Modified signal under test
Implicit in the definition of EVM is an assumption that the receiver is able to compensate a number of transmitter impairments. The signal under test is equalised and decoded according to:
where
 is the time domain samples of the signal under test.
 is the sample timing difference between the FFT processing window in relation to nominal timing of the ideal signal. Note that two timing offsets are determined, the corresponding EVM is measured and the maximum used as described in E.7.
 is the RF frequency offset.
 is the phase response of the TX chain.
 is the amplitude response of the TX chain.
E.4	Estimation of frequency offset
The observation period for determining the frequency offset  shall be 1 ms.
E.5	Estimation of time offset
The observation period for determining the sample timing difference shall be 1 ms.
In the following   represents the middle sample of the EVM window of length  (defined in E.5.1)  or the last sample of the first window half if is even.
is estimated so that the EVM window of length  is centred on  the measured cyclic prefix of the considered OFDM symbol. To minimize the estimation error the timing shall be based on the primary synchronization signal and reference signals. To limit time distortion of any transmit filter the reference signals in the 1 outer RBs are not taken into account in the timing estimation
Two values for  are determined:
 and
 where  if  is odd and  if is even.
When the cyclic prefix length varies from symbol to symbol (e.g. time multiplexed MBMS and unicast) then   shall be further restricted to the subset of symbols with the considered modulation scheme being active and with the considered cyclic prefix length type.
E.5.1	Window length
Table E.5.1-1 and Table E.5.1-1a below specify EVM window length (W) for normal CP, the cyclic prefix length  is 160 for symbols 0 and 144 for symbols 1-6.
Table E.5.1-2, Table E.5.1-2a and Table E.5.1-2b specify the EVM window length (W) for extended CP for 15 kHz, 7.5 kHz and 1.25 kHz sub-carrier spacing, the cyclic prefix length  is 512, 1024 and 6144 respectively.
Table E.5.1-1: EVM window length for normal CP for E-UTRA
Table E.5.1-1a: EVM window length for normal CP for NB-IoT
Table E.5.1-2 EVM window length for extended CP for 15 kHz sub-carrier spacing
Table E.5.1-2a EVM window length for extended CP for 7.5 kHz sub-carrier spacing
Table E.5.1-2b EVM window length for extended CP for 1.25 kHz sub-carrier spacing
E.6	Estimation of TX chain amplitude and frequency response parameters
The equalizer coefficients and  are determined as follows:
1.	Calculate the complex ratios (amplitude and phase) of the post-FFT acquired signal  and the post-FFT Ideal signal , for each reference symbol, over 10 subframes. This process creates a set of complex ratios:
Where the post-FFT Ideal signal  is constructed by the measuring equipment according to the relevant TX specifications, using the following parameters: restricted content: i.e. nominal Reference Symbols and the Primary Synchronisation Channel, (all other modulation symbols are set to 0 V), nominal carrier frequency,  nominal amplitude and phase for each applicable subcarrier, nominal timing.
2.	Perform time averaging at each reference signal subcarrier of the complex ratios, the time-averaging length is 10 subframes. Prior to the averaging of the phases  an unwrap operation must be performed according to the following definition: The unwrap operation corrects the radian phase angles of  by adding multiples of 2*PI when absolute phase jumps between consecutive time instances ti are greater then or equal to the jump tolerance of PI radians. This process creates an average amplitude and phase for each reference signal subcarrier (i.e. every third subcarrier with the exception of the reference subcarrier spacing across the DC subcarrier).
	Where N is the number of reference symbol time-domain locations ti from Z’(f,t) for each reference signal subcarrier .
3.	The equalizer coefficients for amplitude and phase  and  at the reference signal subcarriers  are obtained by computing the moving average in the frequency domain of the time-averaged reference signal subcarriers, i.e. every third subcarrier. The moving average window size is 19. For reference subcarriers at or near the edge of the channel the window size is reduced accordingly as per figure E.6-1.
4.	Perform linear interpolation from the equalizer coefficients  and  to compute coefficients ,  for each subcarrier.
Figure E.6-1: Reference subcarrier smoothing in the frequency domain
E.7	Averaged EVM
EVM is averaged over all allocated downlink resource blocks with the considered modulation scheme in the frequency domain, and a minimum of 10 downlink subframes:
For FDD the averaging in the time domain equals the 10 subframe duration of the 10 subframes measurement period from the equalizer estimation step.
For TDD the averaging in the time domain can be calculated from subframes of different frames and should have a minimum of 10 subframes averaging length. TDD special fields (DwPTS and GP) are not included in the averaging.
Where Ni is the number of resource blocks with the considered modulation scheme in subframe or sTTI i and Ndl is the number of allocated downlink subframes or sTTI in one frame.
The EVM requirements shall be tested against the maximum of  the RMS average at the window W extremities of the EVM measurements:
Thus   is calculated using in the expressions above and is calculated using  in the  calculation.
Thus we get:
The averaged EVM with the minimum averaging length of at least 10 subframes is then achieved by further averaging of the  results
, 
Annex F (Informative): Unwanted emission requirements for multi-carrier BS
F.1	General
In subclause 6.6, unwanted emission requirements for single carrier or multi-carrier BS are specified. This multi-carrier BS corresponds to a multi-carrier BS for E-UTRA, or a BS supporting intra-band contiguous CA. The following two pragmatic scenarios are considered in this annex:
-	multi-carrier BS of different E-UTRA channel bandwidths, covering all scenarios except the channel bandwidth of the outermost carrier less than 5 MHz
-	multi-carrier BS of E-UTRA and UTRA, covering all scenarios except the channel bandwidth of the outermost carrier less than 5 MHz.
All scenarios for channel bandwidths of the outermost carrier less than 5 MHz are for further study.  The guidelines below assumes that the power spectral density of the multiple carriers is the same. All other combinations of multiple carriers are ffs.
Note 1:	Further information and analysis for these scenarios can be found in TR 36.942 [9].
F.2	Multi-carrier BS of different E-UTRA channel bandwidths
For a multi-carrier E-UTRA BS transmitting a group of carriers of different channel bandwidths, the channel bandwidth of the outermost carriers (≥5 MHz) should be considered for ACLR and Operating band unwanted emission requirements. That is, the corresponding requirements for the channel bandwidth of each of the outermost carriers should be applied at the respective side of the group of transmitted carriers.
F.3	Multi-carrier BS of E-UTRA and UTRA
For a multi-carrier BS transmitting a group of carriers of E-UTRA and UTRA, the RAT being used on the outermost carriers (≥5 MHz) should be considered for ACLR and Operating band unwanted emission requirements. That is, the corresponding requirements for the RAT being used on each of the outermost carriers should be applied at the respective side of the group of transmitted carriers.
Annex G (Informative):	Regional requirement for protection of DTT
G.1	Regional requirement for protection of DTT
The European Communications Committee (ECC) has adopted the “ECC Decision on harmonised conditions for Mobile/Fixed Communications Networks operating in the band 790-862 MHz” [12] applicable for BS operating in band 20. The decision defines a requirement for “Out-of-block BEM baseline requirements for ‘mobile/fixed communications network’ (MFCN) base stations within the spectrum allocated to the broadcasting (DTT) service”, where three different cases A, B, and C for protecting broadcasting DTT are defined. These cases can be applied on a per-channel and/or per-region basis, i.e. for the same channel different cases can be applied in different geographic areas (e.g. area related to DTT coverage) and different cases can be applied to different channels in the same geographic area.
For band 20, compliance with the regulatory requirements in Europe referenced above can be assessed based on the manufacturer’s declaration of PEM,N specified in subclause 6.6.3.3, together with the deployment characteristics. Maximum output Power in 10 MHz (P10MHz) is also declared by the manufacturer. The parameters Gant and Nant are deployment specific parameters related to the deployment of the BS, where Gant is the antenna gain and Nant is the number of antennas.
For each channel (N) the EIRP level is calculated using: PEIRP,N = PEM,N + Gant  + 10*log(Nant ). The regulatory requirement in [12] limits the EIRP level to the Maximum level in Table G-1 for the protection case(s) defined in the regulation.
Table G-1: EIRP limits for protection of broadcasting (DTT) service
G.2	Regional requirement for Public Safety LTE BS in Korea
Public Safety LTE (PS-LTE) service, commercial mobile service and Broadcasting are closely allocated for Band 28 in Korea. By making more strong blocking requirements, it provides more flexible site selection to locate for the PS-LTE BS and also it protects the uplink performance degradation. RRA (National Radio Research Agency) Announce 2015-30, "Article 17 of Technical Requirements of the Other Service Radio Equipment for Simple radio station, Space station and Earth station (Radio Equipment for Integrated Public Network)".
Figure G.2-1 Frequency Allocation in Korea
Table G-2.1: PS-LTE frequency band in Korea
Table G-2.2: Blocking requirement for Wide Area BS, PS-LTE in Korea
Table G-2.3: Blocking requirement for Local Area BS, PS-LTE in Korea
Table G-2.4: Blocking requirement for Home BS, PS-LTE in Korea
Table G-2.5: Blocking requirement for E-UTRA Medium Range BS, PS-LTE in Korea
Annex H (Informative): 
Calculation of EIRP based on manufacturer declarations and site specific conditions
H.1	Calculation of EIRP based on manufacturer declarations and site specific conditions
Some regional requirements are defined per effective isotropic radiated power (EIRP), which is a combination of the transmitted power (or in some cases spectral density) and the effective antenna gain which is a site specific condition. Such requirements may be applied per antenna, per cell, or per base station. It shall be noted that the definition of BS or cell may differ between regulations. Where the regulator prescribes a method for EIRP calculation, that method supersedes the proposed assessment in this annex.
The 3GPP specifications mandate manufacturer declarations of the (conducted) output power or power spectral density per connector for the base station under the reference conditions stated as a way to accommodate the referred regional requirements without putting requirements on the local site conditions.
For the case when the base station manufacturer maximum output power or unwanted emission declarations apply per antenna connector, the maximum EIRP can be estimated using the following formulas:
EIRP per antenna:	PEIRP = PTx + GAnt
EIRP per cell or per BS:	PEIRPcell =10 * log (∑10PEIRPn/10)
In case the EIRP requirement is set per polarisation, the summation shall be made per polarisation.
"PEIRP" is the resulting effective isotropic radiated power (or radiated power spectral density) resulting from the power (or power spectral density) declared by the manufacturer in dBm (or dBm/measurement BW).
"PTx" is the conducted power or power spectral density declared by the manufacturer in dBm (or dBm/measurement BW)
"GAnt" is the effective antenna gain, calculated as the antenna gain (dBi) minus the loss of the site infrastructure connecting the BS antenna connector with the antenna (dB) for the applied frequency. The antenna nominal gain is only applicable within a certain frequency range.
"n" is the index number of the co-located antennas illuminating the same cell. PEIRPn is the PEIRP of the n:th antenna.
"Cell" is in this annex used in the sense that it is the limited geographical area covered by the carrier transmitted from one site.
Annex I (Informative): 
Change history