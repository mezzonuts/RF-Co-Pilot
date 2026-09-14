---
title: "Training Dataset: 36211-g00_s09-sxx"
type: source
source_file: "36211-g00_s09-sxx.txt"
category: "01_RAN_L2_L3"
tags: ["3gpp", "dataset", "training", "01_ran_l2_l3"]
---
9	Sidelink
9.1	Overview
A sidelink is used for ProSe direct communication and ProSe direct discovery between UEs. 
9.1.1	Physical channels
A sidelink physical channel corresponds to a set of resource elements carrying information originating from higher layers and is the interface defined between 3GPP TS 36.212 [3] and the present document 3GPP TS 36.211. The following sidelink physical channels are defined:
-	Physical Sidelink Shared Channel, PSSCH
-	Physical Sidelink Control Channel, PSCCH
-	Physical Sidelink Discovery Channel, PSDCH
-	Physical Sidelink Broadcast Channel, PSBCH
Generation of the baseband signal representing the different physical sidelink channels is illustrated in Figrue 5.3-1.
9.1.2	Physical signals
A sidelink physical signal is used by the physical layer but does not carry information originating from higher layers. The following sidelink physical signals are defined:
-	Demodulation reference signal
-	Synchronization signal
9.1.3	Handling of simultaneous sidelink and uplink/downlink transmissions
For a given frequency, on an uplink subframe included in discTxGapConfig [9], a UE shall not transmit an uplink transmission that is not a PRACH transmission and that is partly or completely overlapping in time with a PSDCH transmission or a SLSS transmission for PSDCH by the same UE. Else, for a given carrier frequency and sidelink transmission mode 1 or 2 or sidelink discovery, a UE shall not transmit a sidelink signal or channel overlapping partly or completely in time with an uplink transmission from the same UE. 
For a given carrier frequency, no PSDCH, PSCCH, or PSSCH transmission shall occur from a UE in a sidelink subframe configured for synchronization purposes by the higher-layer parameters
-	syncOffsetIndicator1 or syncOffsetIndicator2 in [9] if the UE has no serving cell fulfilling the S criterion according to [10, clause 5.2.3.2], or
-	syncOffsetIndicator in commSyncConfig or discSyncConfig which includes txParameters in [9] if the UE has a serving cell fulfilling the S criterion according to [10, clause 5.2.3.2]. The UE may assume the same configuration in commSyncConfig and discSyncConfig.
For a given carrier frequency, with the exception of PSSCH transmissions with transmission mode 1 and same sidelink cyclic prefix as PUSCH, no sidelink transmissions shall occur in sidelink subframe  from a UE if uplink SRS is transmitted from the same UE in uplink subframe .
A UE with limited transmission capabilities, on an uplink subframe included in discTxGapConfig [9], shall first prioritize a PSDCH transmission or a SLSS transmission for PSDCH over an uplink transmission that is not a PRACH transmission. Else, a UE with limited transmission capabilities shall at a given time first prioritize uplink transmissions, followed by sidelink transmission mode 1 or 2 or sidelink discovery. 
A UE with limited transmission capabilities shall at a given time prioritize sidelink communication transmissions (PSSS, SSSS, PSBCH, PSSCH, PSCCH) over sidelink discovery transmissions (PSDCH).
A UE with limited reception capabilities, on a downlink subframe included in discRxGapConfig [9], shall first prioritize reception of PSDCH or reception of SLSS for PSDCH over downlink reception. Else, a UE with limited reception capabilities shall at a given time first prioritize downlink reception over sidelink reception.
A UE with limited reception capabilities shall at a given time first prioritize sidelink communication reception, sidelink discovery reception on carriers configured by the eNodeB, and last sidelink discovery reception on carriers not configured by the eNodeB.
9.2	Slot structure and physical resources
Sidelink transmissions are organized into radio frames with a duration of , each consisting of 20 slots of duration . A sidelink subframe consists of two consecutive slots, starting with an even-numbered slot. 
9.2.1	Resource grid
A transmitted physical channel or signal in a slot is described by a resource grid of  subcarriers and  SC-FDMA symbols. The sidelink bandwidth  if the S criterion according to [10, clause 5.2.3.2] is fulfilled for a serving cell having the same uplink carrier frequency as the sidelink, otherwise a preconfigured value is used [9].
The sidelink cyclic prefix is configured independently for type 1 discovery, type 2B discovery, sidelink transmission mode 1, sidelink transmission mode 2, control signalling, and PSBCH and synchronization signals. Configuration is per resource pool for discovery, sidelink transmission mode 2, and control signalling. The PSBCH and synchronization signals always use the same cyclic prefix. 
Only normal cyclic prefix is supported for PSSCH, PSCCH, PSBCH, and synchronization signals for a sidelink configured with transmission mode 3 or 4.
The resource grid is illustrated in Figure 5.2.1-1. 
An antenna port is defined such that the channel over which a symbol on the antenna port is conveyed can be inferred from the channel over which another symbol on the same antenna port is conveyed. There is one resource grid per antenna port. The antenna ports used for transmission of a physical channel or signal are shown in Table 9.2.1-1. 
Table 9.2.1-1: Antenna ports used for different physical channels and signals
9.2.2	Resource elements
Each element in the resource grid is called a resource element and is uniquely defined by the index pair  in a slot where  and  are the indices in the frequency and time domains, respectively. Resource element  on antenna port  corresponds to the complex value . When there is no risk for confusion, or no particular antenna port is specified, the index  may be dropped. 
Quantities  corresponding to resource elements not used for transmission of a physical channel or a physical signal in a slot shall be set to zero.

9.2.3	Resource blocks
A physical resource block is defined as consecutive SC-FDMA symbols in the time domain and consecutive subcarriers in the frequency domain, where  and  are given by Table 9.2.3-1. A physical resource block in the sidelink thus consists of  resource elements, corresponding to one slot in the time domain and 180 kHz in the frequency domain.
Table 9.2.3-1: Resource block parameters
The relation between the physical resource block number  in the frequency domain and resource elements  in a slot is given by
9.2.4	Resource pool
The subframe pools and resource block pools are defined in [4].
For PSSCH, the number of the current slot in the subframe pool , where  is the number of the current slot within the current sidelink subframe  with  equal to the subscript of , defined in clauses 14.1.4 and 14.2.3 of [4] for sidelink transmission modes 1 and 2, respectively; and where  is the number of the current slot within the current sidelink subframe  with  equal to the subscript of , defined in clauses 14.1.1.5 of [4] for sidelink transmission modes 3 and 4.
9.2.5	Guard period
The last SC-FDMA symbol in a sidelink subframe serves as a guard period and shall not be used for sidelink transmission.
9.3	Physical Sidelink Shared Channel
9.3.1	Scrambling
The block of bits , where  is the number of bits transmitted on the physical sidelink shared channel in one subframe shall be scrambled according to clause 5.3.1.
The scrambling sequence generator shall be initialised with  at the start of every PSSCH subframe where
-	for sidelink transmission modes 1 and 2,  is destination identity obtained from the sidelink control channel, and
-	for sidelink transmission modes 3 and 4,  with  and  given by clause 5.1.1 in [3] equals the decimal representation of CRC on the PSCCH transmitted in the same subframe as the PSSCH.
9.3.2	Modulation
Modulation shall be done according to clause 5.3.2. Table 9.3.2-1 specifies the modulation mappings applicable for the physical sidelink shared channel. 
Table 9.3.2-1: PSSCH modulation schemes
9.3.3	Layer mapping
Layer mapping shall be done according to clause 5.3.2A assuming a single antenna port, .
9.3.4	Transform precoding
Transform precoding shall be done according to clause 5.3.3 with  and  replaced by  and , respectively.
9.3.5	Precoding
Precoding shall be done according to clause 5.3.3A assuming a single antenna port, .
9.3.6	Mapping to physical resources
The block of complex-valued symbols  shall be multiplied with the amplitude scaling factor  in order to conform to the transmit power  specified in [4], and mapped in sequence starting with  to physical resource blocks on antenna port  and assigned for transmission of PSSCH. The mapping to resource elements  corresponding to the physical resource blocks assigned for transmission and not used for transmission of reference signals shall be in increasing order of first the index , then the index, starting with the first slot in the subframe. If Transmission Format of SCI format 1 is set to 1, the resource elements in the last SC-FDMA symbol within a subframe shall not considered in the mapping process. Otherwise, the resource elements in the last SC-FDMA symbol within a subframe shall be counted in the mapping process but not transmitted.
If sidelink frequency hopping is disabled the set of physical resource blocks to be used for transmission is given by  where  is obtained from [4, clause 14.1.1.2.1]. 
If sidelink frequency hopping with type 1 hopping is enabled, the set of physical resource blocks to be used for transmission is given by [4].
If sidelink frequency hopping with predefined hopping pattern is enabled, the set of physical resource blocks to be used for transmission is given by the sidelink control information together with a predefined pattern in clause 5.3.4 with the following exceptions:
-	only inter-subframe hopping shall be used
-	the number of subbands  is given by higher layers as described in [4, clause 14.1.1.2]
-	the quantity  is given by higher layers as described in [4, clause 14.1.1.2]
-	the quantity  where  is given by clause 9.2.4
-	the quantity  
-	the pseudo-random sequence generator is initialized at the start of each slot fulfilling  with the initialization value  given by hoppingParameter-r12 in [9]
-	the quantity  shall be replaced by , given by [4, clause 14.1.1.2.1]
-	for sidelink transmission mode 1
-	
-	for sidelink transmission mode 2
-	 where  is given by [4, clause 14.1.3]
-	the quantity  shall be replaced by , given by [4, clause 14.1.1.4]
-	the physical resource block to use for transmission  with  given by [4, clause 14.1.3]
9.4	Physical Sidelink Control Channel
9.4.1	Scrambling
The block of bits , where  is the number of bits transmitted on the physical sidelink control channel in one subframe shall be scrambled according to clause 5.3.1.
The scrambling sequence generator shall be initialised with  at the start of every PSCCH subframe.
9.4.2	Modulation
Modulation shall be done according to clause 5.3.2. Table 9.4.2-1 specifies the modulation mappings applicable for the physical sidelink control channel. 
Table 9.4.2-1: PSCCH modulation schemes
9.4.3	Layer mapping
Layer mapping shall be done according to clause 5.3.2A assuming a single antenna port, .
9.4.4	Transform precoding
Transform precoding shall be done according to clause 5.3.3 with  and  replaced by  and , respectively.
9.4.5	Precoding
Precoding shall be done according to clause 5.3.3A assuming a single antenna port, .
9.4.6	Mapping to physical resources
The block of complex-valued symbols  shall be multiplied with the amplitude scaling factor  in order to conform to the transmit power  specified in [4], and mapped in sequence starting with  to physical resource blocks on antenna port  and assigned for transmission of PSCCH. The mapping to resource elements  corresponding to the physical resource blocks assigned for transmission and not used for transmission of reference signals shall be in increasing order of first the index , then the index, starting with the first slot in the subframe. Resource elements in the last SC-FDMA symbol within a subframe shall be counted in the mapping process but not transmitted.
9.5	Physical Sidelink Discovery Channel
9.5.1	Scrambling
The block of bits , where  is the number of bits transmitted on the physical sidelink discovery channel in one subframe shall be scrambled according to clause 5.3.1.
The scrambling sequence generator shall be initialised with  at the start of each PSDCH subframe.
9.5.2	Modulation
Modulation shall be done according to clause 5.3.2. Table 9.5.2-1 specifies the modulation mappings applicable for the physical sidelink discovery channel. 
Table 9.5.2-1: Sidelink modulation schemes
9.5.3	Layer mapping
Layer mapping shall be done according to clause 5.3.2A assuming a single antenna port, .
9.5.4	Transform precoding
Transform precoding shall be done according to clause 5.3.3 with  and  replaced by  and , respectively.
9.5.5	Precoding
Precoding shall be done according to clause 5.3.3A assuming a single antenna port, .
9.5.6	Mapping to physical resources
The block of complex-valued symbols  shall be multiplied with the amplitude scaling factor  in order to conform to the transmit power  specified in [4], and mapped in sequence starting with  to physical resource blocks on antenna port  and assigned for transmission of PSDCH. The mapping to resource elements  corresponding to the physical resource blocks assigned for transmission and not used for transmission of reference signals shall be in increasing order of first the index , then the index, starting with the first slot in the subframe. Resource elements in the last SC-FDMA symbol within a subframe shall be counted in the mapping process but not transmitted.
The set of physical resource blocks that shall be used are given by [4, clause 14.3.1].
9.6	Physical Sidelink Broadcast Channel
9.6.1	Scrambling
The block of bits , where  is the number of bits transmitted on the physical sidelink broadcast channel in one subframe, shall be scrambled according to clause 5.3.1. The scrambling sequence generator shall be initialised at the start of every PSBCH subframe with .
9.6.2	Modulation
Modulation shall be done according to clause 5.3.2. Table 9.6.2-1 specifies the modulation mappings applicable for the physical sidelink broadcast channel. 
Table 9.6.2-1: PSBCH modulation schemes
9.6.3	Layer mapping
Layer mapping shal be done according to clause 5.3.2A assuming a single antenna port, .
9.6.4	Transform precoding
Transform precoding shall be done according to clause 5.3.3 with  and  replaced by  and , respectively.
9.6.5	Precoding
Precoding shall be done according to clause 5.3.3A assuming a single antenna port, .
9.6.6	Mapping to physical resources
The block of complex-valued symbols  shall be multiplied with the amplitude scaling factor  in order to conform to the transmit power  specified in [4], and mapped in sequence starting with  to physical resource blocks on antenna port . The PSBCH shall use the same set of resource blocks as the synchronization signal. The mapping to resource elements  corresponding to the physical resource blocks used for the PSBCH and not used for transmission of reference signals or synchronization signals shall be in increasing order of first the index , then the index , starting with the first slot in the subframe. The resource-element index  given by
Resource elements in the last SC-FDMA symbol within a subframe should be counted in the mapping process but not transmitted.
9.7	Sidelink Synchronization Signals
A physical-layer sidelink synchronization identity is represented by , divided into two sets id_net and id_oon consisting of identities  and , respectively. 
9.7.1	Primary sidelink synchronization signal
The primary sidelink synchronization signal is transmitted in two adjacent SC-FDMA symbols in the same subframe.
9.7.1.1	Sequence generation
Each of the two sequences  used for the primary sidelink synchronization signal in the two SC-FDMA symbols is given by clause 6.11.1.1 with root index  if  and  otherwise.
9.7.1.2	Mapping to resource elements
The sequence  shall be multiplied with the amplitude scaling factor  and mapped to resource elements on antenna port 1020 in the first slot in the subframe according to
9.7.2	Secondary sidelink synchronization signal
The secondary sidelink synchronization signal is transmitted in two adjacent SC-FDMA symbols in the same subframe.
9.7.2.1	Sequence generation
Each of the two sequences  used for the secondary sidelink synchronization signal is given by clause 6.11.2.1 assuming 
-	subframe 0 with  and  for transmission modes 1 and 2, and
-	subframe 5 for transmission modes 3 and 4.
9.7.2.2	Mapping to resource elements
The sequence  shall be multiplied with the amplitude scaling factor  in order to conform to the transmit power specified in clause 14.4 in 3GPP TS 36.213 [4] and mapped to resource elements on antenna port 1020 in the second slot in the subframe according to
9.8	Demodulation reference signals
Demodulation reference signals associated with PSSCH, PSCCH, PSDCH, and PSBCH transmission shall be transmitted according to PUSCH in clause 5.5.2.1 with the following exceptions:
-	The parameters in Tables 9.8-1, 9.8-2, and 9.8-3 shall be used.
-	The term PUSCH shall be replaced by PSSCH, PSCCH, PSDCH or PSBCH, depending on the physical channel to which the reference signal is associated.
-	Antenna ports are given by Table 9.2-1.
-	The set of physical resource blocks used in the mapping process shall be identical to the corresponding PSSCH/PSCCH/PSDCH/PSBCH transmission.
-	The index  in the mapping process in clause 5.5.2.1.2 corresponding to the case where higher-layer parameter ul-DMRS-IFDMA is not set shall be identical to that for the corresponding PSSCH/PSCCH/PSDCH/PSBCH transmission. 
-	For sidelink transmission modes 3 and 4 on the PSSCH and PSCCH, the mapping shall use  and  for the first slot in the subframe and  and  for the second slot in the subframe.
-	For sidelink transmission modes 3 and 4 on the PSBCH, the mapping shall use  and  for the first slot in the subframe and  for the second slot in the subframe.
-	For sidelink transmission modes 1 and 2, the pseudo-random sequence generator in clause 5.5.1.3 shall be initialized at the start of each slot fulfilling . For sidelink transmission modes 3 and 4 the pseudo-random sequence generator in clause 5.5.1.3 shall be initialized at the start of each slot fulfilling .
-	For sidelink transmission modes 3 and 4 on the PSCCH, the cyclic shift  to be applied for all DM-RS in a subframe shall be chosen according to clause 14.2.1 of [4]. 
-	For sidelink transmission modes 1and 2 and sidelink discovery, the quantity  in clause 5.5.2.1.1 takes the values  and for sidelink transmission modes 3and 4, the quantity  in clause 5.5.2.1.1 takes the values  for PSSCH and  for PSBCH.
-	For sidelink transmission modes 3 and 4, the quantity  equals the decimal representation of CRC on the PSCCH transmitted in the same subframe as the PSSCH according to  with  and  given by clause 5.1.1 in [3].
Table 9.8-1: Reference signal parameters for PSSCH.
Table 9.8-2: Reference signal parameters for PSCCH.
Table 9.8-3: Reference signal parameters for PSDCH and PSBCH.
9.9	SC-FDMA baseband signal generation
The time-continuous signal  for antenna port  in SC-FDMA symbol  in a sidelink slot is defined by clause 5.6 with  replaced by .
The cyclic prefix length for each sidelink channel or signal may differ from that configured for uplink transmissions.
9.10	Timing
Transmission of a sidelink radio frame number  from the UE shall start  seconds before the start of the corresponding timing reference frame at the UE. The UE is not required to receive sidelink or downlink transmissions earlier than  after the end of a sidelink transmission.
For PSDCH transmission and sidelink synchronization signal transmission for PSDCH:
if the UE has a serving cell fulfilling the S criterion according to [10, clause 5.2.3.2] 
-	the timing of reference radio frame  equals that of downlink radio frame  of the cell c as given in Clause 14.3.1 of [4] and
-	 is given by clause 8.1,
otherwise 
-	the timing of reference radio frame  is implicitly obtained from [4] and
-	.
For all other sidelink transmissions:
if the UE has a serving cell fulfilling the S criterion according to [10, clause 5.2.3.2]
-	the timing of reference radio frame  equals that of downlink radio frame  in the cell with the same uplink carrier frequency as the sidelink and
-	 is given by clause 8.1,
otherwise 
-	the timing of reference radio frame  is implicitly obtained from [4] and
-	.
Figure 9.9-1: Sidelink timing relation.
The quantity  differs between channels and signals according to
10	Narrowband IoT
10.0	General
10.0.1	Frame structure
10.0.1.1	Frame structure type 1
Frame structure type 1 is applicable to FDD operation only.
10.0.1.2	Frame structure type 2
Frame structure type 2 is applicable to TDD operation only.
The following restrictions apply: 
-	Uplink-downlink configuration 0 and 6 are not supported.
-	UpPTS is not used for NPUSCH or NPRACH.
-	DwPTS and UpPTS in special subframe configuration 10 is not used for transmissions. 
-	On an NB-IoT carrier for which higher-layer parameter operationModeInfo indicates inband-SamePCI or inband-DifferentPCI, or higher-layer parameter inbandCarrierInfo is present, or on an NB-IoT carrier for SystemInformationBlockType1-NB for which sib1-carrierInfo indicates non-anchor and the value of the higher layer parameter sib-GuardbandInfo is set to sib-GuardbandInbandSamePCI or sib-GuardbandinbandDiffPCI, DwPTS in special subframe configuration 0 and 5 for normal cyclic prefix is not used for NPDCCH and NPDSCH transmission.
10.1	Uplink
10.1.1	Overview
10.1.1.1	Physical channels
The following narrowband physical channels are defined:
-	Narrowband Physical Uplink Shared Channel, NPUSCH
-	Narrowband Physical Random-Access Channel, NPRACH
10.1.1.2	Physical signals
The following uplink narrowband physical signals are defined:
-	Narrowband demodulation reference signal
10.1.2	Slot structure and physical resources
10.1.2.1	Resource grid
A transmitted physical channel or signal in a slot is described by one or several resource grids of  subcarriers and  SC-FDMA symbols. The resource grid is illustrated in Figure 10.1.2.1-1. The slot number within a radio frame is denoted  where  for  and  for .
Figure 10.1.2.1-1: Uplink resource grid for NB-IoT
The uplink bandwidth in terms of subcarriers , and the slot duration  are given in Table 10.1.2.1-1.
Table 10.1.2.1-1: NB-IoT parameters.
A single antenna port  is used for all uplink transmissions.
10.1.2.2	Resource elements
Each element in the resource grid is called a resource element and is uniquely defined by the index pair  in a slot where  and  are the indices in the frequency and time domains, respectively. Resource element  corresponds to the complex value . Quantities  corresponding to resource elements not used for transmission of a physical channel or a physical signal in a slot shall be set to zero.
10.1.2.3	Resource unit
Resource units are used to describe the mapping of the NPUSCH to resource elements. A resource unit is defined as  SC-FDMA symbols in the time domain and consecutive subcarriers in the frequency domain, where  and  are given by Tables 10.1.2.3-1 and 10.1.2.3-2 for frame structure types 1 and 2, respectively.
Table 10.1.2.3-1: Supported combinations of , , and  for frame structure type 1.
Table 10.1.2.3-2: Supported combinations of , , and  for frame structure type 2.
10.1.3	Narrowband physical uplink shared channel
The narrowband physical uplink shared channel supports two formats:
-	NPUSCH format 1, used to carry the UL-SCH
-	NPUSCH format 2, used to carry uplink control information
10.1.3.1	Scrambling
Scrambling shall be done according to clause 5.3.1. The scrambling sequence generator shall be initialised with  where  is the first slot of the transmission of the codeword. In case of NPUSCH repetitions, the scrambling sequence shall be reinitialised according to the above formula after every  transmissions of the codeword with  and  set to the first slot and the frame, respectively, used for the transmission of the repetition. The quantity  is given by clause 10.1.3.6.
10.1.3.2	Modulation
Modulation shall be done according to clause 5.3.2 resulting in a block of modulated symbols . Table 10.1.3.2-1 specifies the modulation mappings applicable for the narrowband physical uplink shared channel. 
The block of modulated symbols shall be multiplied with a code  resulting in a block of modulation symbols  according to
	
where
-	 in case a positive scheduling request according to [4] is to be transmitted using NPUSCH format 2
-	 otherwise
Table 10.1.3.2-1: NPUSCH modulation schemes
10.1.3.3	Layer mapping
Layer mapping shall be done according to clause 5.3.2A with  using  instead of .
10.1.3.4	Transform precoding
Transform precoding shall be done according to clause 5.3.3 with  and  replaced by .
10.1.3.5	Precoding
Precoding shall be done according to clause 5.3.3A assuming a single antenna port.
10.1.3.6	Mapping to physical resources
Each NPUSCH codeword can be mapped to one or more than one resource units, , as given by clause 16.5.1.2 of 3GPP TS 36.213 [4], each of which shall be transmitted  times.
The block of complex-valued symbols  shall be multiplied with the amplitude scaling factor  in order to conform to the transmit power specified in [4], and mapped in sequence starting with  to subcarriers assigned for transmission of NPUSCH. The mapping to resource elements  corresponding to the subcarriers assigned for transmission and not used for transmission of reference signals, shall be in increasing order of first the index , then the index, starting with the first slot in the assigned resource unit.
After mapping to slots, the  slots shall be repeated  additional times, before continuing the mapping of  to the following slot, where
For NPUSCH Format 1 and 2 on frame structure type 2 with , 
-	the NPUSCH transmission is carried out in the first set of  slots spanning over two contiguous uplink subframes not overlapping with any uplink subframe configured as invalid; 
-	for TDD configuration 1 and 4, if the starting position for the NPUSCH is indicated as the second of the two contiguous uplink subframes, the NPUSCH transmission is postponed until the start of two consecutive uplink subframes.
If a mapping to  slots or a repetition of the mapping contains a resource element which overlaps with 
-	any configured NPRACH resource according to NPRACH-ConfigSIB-NB, or 
-	any configured NPRACH resource according to nprach-ParametersList and if the UE indicates multiCarrier-NPRACH as supported, or
-	any configured NPRACH resource configured for Early Data Transmission and if the NPUSCH transmission is during an Early Data Transmission procedure [12, Clause 7.3b],
then,
-	for  the NPUSCH transmission in overlapped slots is postponed until the next  slots not overlapping with any configured NPRACH resource. 
-	for  the NPUSCH transmission in overlapped  slots is postponed until the next  slots starting with the first slot satisfying  and not overlapping with any configured NPRACH resource.
NPRACH gaps as defined in section 10.1.6.1 are not part of the NPRACH resource. For frame structure type 2, the valid uplink subframes which are not used for NPRACH transmission when it is not possible to map G symbol groups back-to-back are not part of the NPRACH resource. The mapping of  is then repeated until  slots have been transmitted. After transmissions and/or postponements due to NPRACH of  time units, for frame structure type 1, a gap of  time units shall be inserted where the NPUSCH transmission is postponed. The portion of a postponement due to NPRACH which coincides with a gap is counted as part of the gap.
When higher layer parameter npusch-AllSymbols is set to false, resource elements in SC-FDMA symbols overlapping with a symbol configured with SRS according to srs-SubframeConfig shall be counted in the NPUSCH mapping but not used for transmission of the NPUSCH. When higher layer parameter npusch-AllSymbols is set to true, all symbols are transmitted.
If higher layer parameter valid-subframe-config-UL or slot-reserved-resource-config-UL is configured, and the Resource reservation field in the DCI is set to 1, then in case of NPUSCH transmission associated with C-RNTI or SPS C-RNTI,
-	In a subframe that is fully reserved, the NPUSCH transmission is postponed until the next NB-IoT uplink subframe that is not fully reserved.
-	In a subframe that is partially reserved, the reserved SC-FDMA symbols shall be counted in the NPUSCH mapping but not used for transmission of the NPUSCH.
10.1.4	Demodulation reference signal
10.1.4.1	Reference signal sequence
10.1.4.1.1	Reference signal sequence for 
The reference signal sequence for  is defined by 
where the binary sequence  is defined by clause 7.2 and shall be initialised with  at the start of the NPUSCH transmission. The quantity  is given by Table 10.1.4.1.1-1 where  for NPUSCH format 2, and for NPUSCH format 1if group hopping is not enabled, and by clause 10.1.4.1.3 if group hopping is enabled for NPUSCH format 1.
Table 10.1.4.1.1-1: Definition of  
The reference signal sequence for NPUSCH format 1 is given by:
The reference signal sequence for NPUSCH format 2 is given by
where is defined in Table 5.5.2.2.1-2 with the sequence index chosen according to  with . For frame structure type 1, . For frame structure type 2,  for and  for .
10.1.4.1.2	Reference signal sequence for 
The reference signal sequences for is defined by a cyclic shift  of a base sequence according to 
,
where  is given by Table 10.1.4.1.2-1 for , Table 10.1.4.1.2-2 for  and Table 5.5.1.2-1 for . 
If group hopping is not enabled, the base sequence index  is given by higher layer parameters threeTone-BaseSequence, sixTone-BaseSequence, and twelveTone-BaseSequence for , , and , respectively. If not signalled by higher layers, the base sequence is given by
If group hopping is enabled, the base sequence index  is given by clause 10.1.4.1.3.
The cyclic shift  for  and  is derived from higher layer parameters threeTone-CyclicShift and sixTone-CyclicShift, respectively, as defined in Table 10.1.4.1.2-3. For , if pur-NPUSCH-cyclic-shift is configured it provides the value of  and the cyclic shift  in a slot  is given as , otherwise .
Table 10.1.4.1.2-1: Definition of  for 
Table 10.1.4.1.2-2: Definition of  for 
Table 10.1.4.1.2-3: Definition of  
10.1.4.1.3	Group hopping
For the reference signal for NPUSCH format 1, sequence-group hopping can be enabled where the sequence-group number  in slot  of a radio frame  is defined by a group hopping pattern  and a sequence-shift pattern  according to
where the number of reference signal sequences available for each resource unit size, is given by Table 10.1.4.1.3-1.
Table 10.1.4.1.3-1: Definition of 
Sequence-group hopping can be enabled or disabled by means of the cell-specific parameter groupHoppingEnabled provided by higher layers. Sequence-group hopping for NPUSCH can be disabled for a certain UE through the higher-layer parameter groupHoppingDisabled despite being enabled on a cell basis unless the NPUSCH transmission corresponds to a Random Access Response Grant or a retransmission of the same transport block as part of the contention based random access procedure. 
The group-hopping pattern  is given by
	
where  for . When , for frame structure type 1,  is the slot number  of the first slot of the resource unit and for frame structure type 2,  is the frame number  of the first slot of the resource unit. The pseudo-random sequence  is defined by clause 7.2. The pseudo-random sequence generator shall be initialized with  at the beginning of the resource unit for and in every even slot for .
The sequence-shift pattern  is given by 
where is given by higher-layer parameter groupAssignmentNPUSCH. If no value is signalled, .
10.1.4.2	Mapping to physical resources
The sequence  shall be multiplied with the amplitude scaling factor  and mapped in sequence starting with  to the sub-carriers. 
The set of sub-carriers used in the mapping process shall be identical to the corresponding NPUSCH transmission as defined in clause 10.1.3.6. 
The mapping to resource elements  shall be in increasing order of first, then , and finally the slot number. The values of the symbol index  in a slot are given in Table 10.1.4.2-1.
Table 10.1.4.2-1: Demodulation reference signal location for NPUSCH. 
If higher layer parameter valid-subframe-config-UL or slot-reserved-resource-config-UL is configured, and the Resource reservation field in the DCI is set to 1, then in case of NPUSCH transmission associated with C-RNTI or SPS C-RNTI,
-	In a slot that is fully reserved, the demodulation reference signal transmission is dropped.
-	In a SC-FDMA symbol that is reserved, the demodulation reference signal transmission is dropped.
10.1.5	SC-FDMA baseband signal generation
For , the time-continuous signal  in SC-FDMA symbol  in a slot is defined by clause 5.6 with the quantity  replaced by .
For , the time-continuous signal  for sub-carrier index in SC-FDMA symbol  in an uplink slot is defined by 
for  where parameters for  and  are given in Table 10.1.5-1,  is the modulation value of symbol , and the phase rotation  is defined by
where   is the number of transport blocks defined in 16.5.1 of 336.213 [4]. If  >1 and interleaving between codewords is applied according to clause 16.5.1 of 3GPP TS 36.213 [4], then the symbol counter  is reset at the start of the transmission and incremented for each symbol during the transmission. For other cases, the symbol counter  is reset to 0 at the start of each NPUSCH codeword transmission and incremented for each symbol during the transmission the NPUSCH codeword.
Table 10.1.5-1: SC-FDMA parameters for 
The SC-FDMA symbols in a slot shall be transmitted in increasing order of , starting with , where SC-FDMA symbol starts at time  within the slot. For , the remaining  in  are not transmitted and used for guard period.
Only normal CP is supported for Narrowband IoT uplink in this release of the specification.
10.1.6	Narrowband physical random-access channel
10.1.6.1	Time and frequency structure
The physical layer random access preamble is based on single-subcarrier frequency-hopping symbol groups. A symbol group is illustrated in Figure 10.1.6.1-1, consisting of a cyclic prefix of length  and a sequence of  identical symbols with total length. The total number of symbol groups in a preamble repetition unit is denoted by . The number of time-contiguous symbol groups is given by . 
The parameter values for frame structures 1 and 2 are listed in Tables 10.1.6.1-1 and 10.1.6.1-2, respectively.
Figure 10.1.6.1-1: Random access symbol group
Table 10.1.6.1-1: Random access preamble parameters for frame structure type 1
Table 10.1.6.1-2: Random access preamble parameters for frame structure type 2
The preamble consisting of  symbol groups shall be transmitted  times. For frame structure type 2, when an invalid uplink subframe overlaps the transmission of  symbol groups without a gap, the  symbol groups are dropped. For frame structure type 2, the transmission of  symbol groups are aligned with the subframe boundary.
The transmission of a random-access preamble, if triggered by the MAC layer, is restricted to certain time and frequency resources.
A NPRACH configuration provided by higher layers contains the following:
-	NPRACH resource periodicity  (nprach-Periodicity),
-	frequency location of the first subcarrier allocated to NPRACH  (nprach-SubcarrierOffset),
-	number of subcarriers allocated to NPRACH  (nprach-NumSubcarriers), 
-	number of starting sub-carriers allocated to UE initiated random access  (nprach-NumCBRA-StartSubcarriers),
-	number of NPRACH repetitions per attempt  (numRepetitionsPerPreambleAttempt),
-	NPRACH starting time  (nprach-StartTime),
-	Fraction for calculating starting subcarrier index for the range of NPRACH subcarriers reserved for indication of UE support for multi-tone msg3 transmission  (nprach-SubcarrierMSG3-RangeStart).
NPRACH transmission can start only  time units after the start of a radio frame fulfilling . For frame structure type 1, after transmissions of  time units for preamble formats 0 and 1, or  time units for preamble format 2, a gap of  time units shall be inserted.
NPRACH configurations where  are invalid.
The NPRACH starting subcarriers allocated to UE initiated random access are split in two sets of subcarriers,  and , where the second set, if present, indicate UE support for multi-tone msg3 transmission.
The frequency location of the NPRACH transmission is constrained within  sub-carriers, and within  subcarriers when preamble format 2 as described in Table 10.1.6.1-1 is configured. Frequency hopping shall be used within the 12 subcarriers and 36 subcarriers when preamble format 2 as described in Table 10.1.6.1-1 is configured, where the frequency location of the ith symbol group is given by  where . The quantity  depends on the frame structure.
For frame structure type 1:
-	if ,  for preamble formats 0 and 1 as described in Table 10.1.6.1-1:
where  with  being the subcarrier selected by the MAC layer from , and the pseudo random sequence  is given by clause 7.2. The pseudo random sequence generator shall be initialised with .
-	if ,  for preamble format 2 as described in Table 10.1.6.1-1:
	
	
	
where  with  being the subcarrier selected by the MAC layer from , and the pseudo random sequence  is given by clause 7.2. The pseudo random sequence generator shall be initialised with . 
For frame structure type 2:
-	if ,  for preamble formats 0, 1, and 2 as described in Table 10.1.6.1-2:
	
	
	
	
where  with  being the subcarrier selected by the MAC layer from , and the pseudo random sequence  is given by clause 7.2. The pseudo random sequence generator shall be initialised with . 
-	if ,  for preamble formats 0-a, 1-a, as described in Table 10.1.6.1-2:
	
	
	
where  with  being the subcarrier selected by the MAC layer from , and the pseudo random sequence  is given by clause 7.2. The pseudo random sequence generator shall be initialised with . 
10.1.6.2	Baseband signal generation
The time-continuous random-access signal  for symbol group  is defined by
	
where ,  is an amplitude scaling factor in order to conform to the transmit power  specified in clause 16.3.1 in 3GPP TS 36.213 [4], ,  accounts for the difference in subcarrier spacing between the random access preamble and uplink data transmission, and the location in the frequency domain controlled by the parameter  is derived from clause 10.1.6.1. The variable is given by Table 10.1.6.2-1.
Table 10.1.6.2-1: Random access baseband parameters
10.1.7	Modulation and upconversion
Modulation and upconversion to the carrier frequency of the complex-valued baseband signal or the complex-valued NPRACH baseband signal is shown in Figure 5.8-1. The filtering required prior to transmission is defined by the requirements in 3GPP TS 36.101 [7]. 
10.2	Downlink
10.2.1	Overview
10.2.1.1	Physical channels
A downlink narrowband physical channel corresponds to a set of resource elements carrying information originating from higher layers and is the interface defined between 3GPP TS 36.212 [3] and the present document 3GPP TS 36.211.
The following downlink physical channels are defined:
-	Narrowband Physical Downlink Shared Channel, NPDSCH
-	Narrowband Physical Broadcast Channel, NPBCH
-	Narrowband Physical Downlink Control Channel, NPDCCH
10.2.1.2	Physical signals
A downlink narrowband physical signal corresponds to a set of resource elements used by the physical layer but does not carry information originating from higher layers. The following downlink physical signals are defined:
-	Narrowband reference signal, NRS
-	Narrowband synchronization signal
-	Narrowband positioning reference signal, NPRS
-	Narrowband wake up signal, NWUS
10.2.2	Slot structure and physical resource elements
10.2.2.1	Resource grid
The transmitted signal on one antenna port in each slot is described by a resource grid of size one resource block as defined in clause 6.2.3. 
Only  is supported. 
Narrowband positioning reference signals are transmitted on antenna port . The channel over which a symbol on antenna port  is conveyed can be inferred from the channel over which another symbol on the same antenna port is conveyed only within  consecutive subframes where
-	if the higher layer parameter nprsBitmap is configured ,  equals the length of the nprsBitmap;
-	if the higher layer parameter nprsBitmap is not configured,  where  is configured by higher layers.
10.2.2.2	Resource elements
Resource elements are defined according to clause 6.2.2.
10.2.2.3	Guard period for half-duplex FDD operation
Only type-B half-duplex FDD operation is supported.
10.2.2.4	Guard period for TDD operation
For frame structure type 2, if a NB-IoT UE is configured with higher layer parameter twoHARQ-ProcessesConfig, a guard period is created by the UE by
-	not receiving the first part of the first OFDM symbol of a downlink subframe immediately following an uplink subframe from the same UE for 15-kHz subcarrier spacing on an NB-IoT carrier for which higher-layer parameter operationModeInfo indicates guardband or standalone, or higher-layer parameter inbandCarrierInfo is not present.
10.2.3	Narrowband physical downlink shared channel
10.2.3.1	Scrambling
Scrambling shall be done according to clause 6.3.1. If the NPDSCH is carrying the BCCH, the scrambling sequence generator shall be initialised with . Otherwise, the scrambling sequence generator shall be initialised with  whereis the first slot of the transmission of the codeword.
In case of NPDSCH repetitions and the NPDSCH carrying the BCCH, the scrambling sequence generator shall be reinitialized according to the expression above for each repetition.
In case of NPDSCH repetitions and the NPDSCH is not carrying the BCCH, the scrambling sequence generator shall be reinitialized according to the expression above after every  transmission of the codeword withand set to the first slot and the frame, respectively, used for the transmission of the repetition.
10.2.3.2	Modulation
Modulation shall be done according to clause 6.3.2 using one of the modulation schemes in Table 10.2.3-1
Table 10.2.3-1: Modulation schemes
10.2.3.3	Layer mapping and precoding
Layer mapping and precoding shall be done according to clause 6.6.3 using the same set of antenna ports as the NPBCH.
10.2.3.4	Mapping to resource elements
Each NPDSCH codeword can be mapped to one or more than one subframes, , as given by clause 16.4.1.3 of 3GPP TS 36.213 [4], each of which shall be transmitted  times.
For each of the antenna ports used for transmission of the physical channel, the block of complex-valued symbols  shall be mapped to resource elements  which meet all of the following criteria in the current subframe: 
-	the subframe is not used for transmission of NPBCH, NPSS, or NSSS, and 
-	except in a special subframe when , they are assumed by the UE not to be used for NRS, and
-	they are not overlapping with resource elements used for CRS as defined in clause 6 (if any), and
-	the index  in the first slot in a subframe fulfils  where is given by clause 16.4.1.4 of 3GPP TS 36.213 [4], and
-	in addition, for frame structure type 2
-	in a special subframe, if , they are in DwPTS
-	in a special subframe, if , they are not NRS locations in subframes which are not special subframes.
The mapping of  in sequence starting with  to resource elements  on antenna port  meeting the criteria above shall be in increasing order of first the index  and then the index, starting with the first slot and ending with the second slot in a subframe. For NPDSCH not carrying BCCH, after mapping to a subframe, the subframe shall be repeated for  additional subframes, before continuing the mapping of  to the following subframe. 
The resource elements in a special subframe that are not part of DwPTS are counted but not used in the mapping if . When , the resource elements in a special subframe assumed by the UE for NRSs are counted but not used in the mapping if . 
For frame structure type 1, for NPDSCH associated with C-RNTI when interferenceRandomisationConfig is used according to [11], or NPDSCH associated with RA-RNTI, TC-RNTI or P-RNTI and transmitted in an NB-IoT carrier configured by SystemInformationBlockType22-NB, or NPDSCH associated with C-RNTI in an NB-IoT carrier configured by SystemInformationBlockType22-NB when RadioResourceConfigDedicted-NB is not configured by higher layer, or NPDSCH associated with G-RNTI or SC-RNTI, or for frame structure type 2, for NPDSCH not carrying the BCCH, define as the block of complex-valued symbols mapped to subframe number  and radio frame number . Each complex-valued symbol  shall be multiplied with before its transmission, with 
	
where the scrambling sequence is given by clause 7.2 and shall be initialized at the start of each subframe with .
The mapping of  is then repeated until  subframes have been transmitted. For frame structure type 2, the resource elements in a special subframe that are not part of DwPTS are counted but not used in the repetition. When , the resource elements in a special subframe assumed by the UE for NRSs are counted but not used in the repetition. 
For NPDSCH carrying BCCH, the  is mapped to  subframes in sequence and then repeated until  subframes have been transmitted, where 
-	 for mapping NPDSCH carrying SystemInformationBlockType1-NB to subframe #3 for frame structure type 1;
-	 otherwise. 
The NPDSCH transmission can be configured by higher layers with transmission gaps where the NPSDCH transmission is postponed. There are no gaps in the NPDSCH transmission if where  is given by the higher layer parameter dl-GapThreshold and  is given by [4]. The gap starting frame and subframe is given by  where the gap periodicity,, is given by the higher layer parameter dl-GapPeriodicity. The gap duration in number of subframes is given by , where  is given by the higher layer parameter dl-GapDurationCoeff. For NPDSCH carrying the BCCH there are no gaps in the transmission. 
The UE shall not expect NPDSCH in subframe  if it is not a NB-IoT downlink subframe, except for transmissions of NPDSCH carrying SystemInformationBlockType1-NB in 
-	subframes 3 and 4 for frame structure type 1; and
-	subframes 0, 4, and 5 for frame structure type 2. 
In case of NPDSCH transmissions, in subframes that are not NB-IoT downlink subframes, the NPDSCH transmission is postponed until the next NB-IoT downlink subframe. 
If higher layer parameter valid-subframe-config-DL or slot-reserved-resource-config-DL is configured, and the Resource reservation field in the DCI is set to 1, then in case of NPDSCH transmission associated with C-RNTI,
-	In a subframe that is fully reserved, the NPDSCH transmission is postponed until the next NB-IoT downlink subframe that is not fully reserved.
-	In a subframe that is partially reserved, the reserved OFDM symbols shall be counted in the NPDSCH mapping but not used for transmission of the NPDSCH.
10.2.4	Narrowband physical broadcast channel
10.2.4.1	Scrambling
Scrambling shall be done according to clause 6.6.1 with  denoting the number of bits to be transmitted on the NPBCH.  equals 1600 for normal cyclic prefix. The scrambling sequence shall be initialised with  in radio frames fulfilling.
10.2.4.2	Modulation
Modulation shall be done according to clause 6.6.2 using the modulation scheme in Table 10.2.4.2-1
Table 10.2.4.2-1: Modulation schemes for NPBCH
10.2.4.3	Layer mapping and precoding
Layer mapping and precoding shall be done according to clause 6.6.3 with . The UE shall assume antenna ports 2000 and 2001 are used for the transmission of the narrowband physical broadcast channel. 
10.2.4.4	Mapping to resource elements
The block of complex-valued symbols for each antenna port is transmitted in subframe 0 for frame structure type 1 or subframe 9 for frame structure type 2 during 64 consecutive radio frames starting in each radio frame fulfilling . The quantity  for normal cyclic prefix. Define as the block of complex-valued symbols to be transmitted in subframe 0 for frame structure type 1 or subframe 9 for frame structure type 2 of radio frame , as ,  with  for normal cyclic prefix, and
where the scrambling sequence ,  is given by clause 7.2, and shall be initialized at the start of each radio frame with . The block of complex-valued symbols  shall be mapped in sequence starting with  to resource elements . The mapping to resource elements  not reserved for transmission of reference signals shall be in increasing order of first the index, then the index . The first three OFDM symbols in a subframe shall not be used in the mapping process. 
For the purpose of the mapping, the UE shall assume cell-specific reference signals for antenna ports 0-3 and narrowband reference signals for antenna ports 2000 and 2001 being present irrespective of the actual configuration. The frequency shift of the cell-specific reference signals shall be calculated by replacing with  in the calculation of in clause 6.10.1.2. 
10.2.5	Narrowband physical downlink control channel
10.2.5.1	NPDCCH formats
The narrowband physical downlink control channel carries control information. A narrowband physical control channel is transmitted on an aggregation of one or two consecutive narrowband control channel elements (NCCEs), where a narrowband control channel element corresponds to 6 consecutive subcarriers in a subframe where NCCE 0 occupies subcarriers 0 through 5 and NCCE 1 occupies subcarriers 6 through 11. The NPDCCH supports multiple formats as listed in Table 10.2.5.1-1. For NPDCCH format 1, both NCCEs belong to the same subframe.
One or two NPDCCHs can be transmitted in a subframe.
Table 10.2.5.1-1: Supported NPDCCH formats
10.2.5.2	Scrambling
Scrambling shall be done according to clause 6.8.2. The scrambling sequence shall be initialised at the start of subframe k0 according to [4] Clause 16.6 and after every 4th NPDCCH subframe with  where is the first slot of the NPDCCH subframe in which scrambling is (re-)initialized.
10.2.5.3	Modulation
Modulation shall be done according to clause 6.8.3 using the modulation scheme in Table 10.2.5.3-1
Table 10.2.5.3-1: Modulation schemes
10.2.5.4	Layer mapping and precoding
Layer mapping and precoding shall be done according to clause 6.6.3 using the same set of antenna ports as the NPBCH.
10.2.5.5	Mapping to resource elements
The block of complex-valued symbols  shall be mapped in sequence starting with  to resource elements  on the associated antenna port which meet all of the following criteria: 
-	they are part of the NCCE(s) assigned for the NPDCCH transmission, and
-	they are not used for transmission of NPBCH, NPSS, or NSSS , and 
-	except in a special subframe when NPDCCH is transmitted in more than one subframe, they are assumed by the UE not to be used for NRS, and
-	they are not overlapping with resource elements used for CRS as defined in clause 6 (if any), and
-	the index  in the first slot in a subframe fulfils  where is given by clause 16.6.1 of 3GPP TS 36.213 [4], 
-	in addition, for frame structure Type 2, 
-	in a special subframe where the NPDCCH is transmitted in one subframe, they are in DwPTS
-	in a special subframe where the NPDCCH is transmitted in more than one subframe, they are not NRS locations when the subframe is not a special subframe.
The mapping to resource elements  on antenna port  meeting the criteria above shall be in increasing order of first the index  and then the index, starting with the first slot and ending with the second slot in a subframe. Denote  as the complex-valued symbols that are mapped to resource elements meeting the criteria above in subframe , with the insertion of <NIL> elements in the locations of resource elements which are not part of the NCCE(s) assigned for the NPDCCH transmission. 
If the NPDCCH is transmitted in more than one subframe, the resource elements in a special subframe that are not part of DwPTS are counted but not used in the mapping. When , the resource elements in a special subframe assumed by the UE for NRSs are counted but not used in the mapping if the NPDCCH is transmitted in more than one subframe.
For frame structure type 1, for NPDCCH associated with RA-RNTI, TC-RNTI or P-RNTI and transmitted in an NB-IoT carrier configured by SystemInformationBlockType22-NB, or NPDCCH associated with C-RNTI in an NB-IoT carrier configured by SystemInformationBlockType22-NB when RadioResourceConfigDedicted-NB is not configured by higher layer, or NPDCCH associated with G-RNTI or SC-RNTI, or for NPDCCH associated with C-RNTI when interferenceRandomisationConfig is used according to [11], or for frame structure type 2, each complex-valued symbol , shall be multiplied with ,where 
	
where the scrambling sequence  is given by clause 7.2 and shall be initialized at the start of each subframe with .
The NPDCCH transmission can be configured by higher layers with transmissions gaps where the NPDCCH transmission is postponed. The configuration is the same as described for NPDSCH in clause 10.2.3.4.
The UE shall not expect NPDCCH in subframe  if it is not a NB-IoT downlink subframe. In case of NPDCCH transmissions, in subframes that are not NB-IoT downlink subframes, the NPDCCH transmission is postponed until the next NB-IoT downlink subframe. 
If higher layer parameter valid-subframe-config-DL or slot-reserved-resource-config-DL is configured, then in case of NPDCCH transmission associated with C-RNTI,
-	In a subframe that is fully reserved, the NPDCCH transmission is postponed until the next NB-IoT downlink subframe that is not fully reserved.
-	In a subframe that is partially reserved, the reserved OFDM symbols shall be counted in the NPDCCH mapping but not used for transmission of the NPDCCH.
10.2.6	Narrowband reference signal (NRS)
Before a UE obtains operationModeInfo:
-	If frame structure type 1 is used, the UE may assume narrowband reference signals (NRSs) are transmitted in subframes #0 and #4 and in subframes #9 not containing NSSS. 
-	If frame structure type 2 is used, the UE may assume narrowband reference signals (NRSs) are transmitted in subframes #9 and in subframes #0 not containing NSSS.
On an NB-IoT carrier for which a UE receives higher-layer parameter operationModeInfo indicating guardband or standalone.
-	If frame structure type 1 is used, before the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #0, #1, #3, #4 and in subframes #9 not containing NSSS. 
-	If frame structure type 2 is used, before the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #9, and in subframes #0 not containing NSSS, and in subframes #4 if subframes #4 is configured for SystemInformationBlockType1-NB transmissions.
-	If frame structure type 1 is used, after the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #0, #1, #3, #4, subframes #9 not containing NSSS, and in NB-IoT downlink subframes. 
-	If frame structure type 2 is used, after the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #9, subframes #0 not containing NSSS, in subframes #4 if subframes #4 is configured for SystemInformationBlockType1-NB transmissions, and in NB-IoT downlink subframes. 
On an NB-IoT carrier for SystemInformationBlockType1-NB for which sib1-carrierInfo-NB indicates non-anchor for frame structure type 2, before the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #0 and #5. After the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #0, #5, and in NB-IoT downlink subframes indicated by tdd-SI-SubframesBitmap.
On an NB-IoT carrier for which DL-CarrierConfigCommon-NB is present and no inbandCarrierInfo is present.
-	If frame structure type 1 is used and when an NB-IoT UE is configured by higher layers to decode NPDCCH with CRC scrambled by the P-RNTI and higher-layer indicates nrs-NonAnchor-config is enabled, the UE first determines the starting subframe of NPDCCH search space associated with NRS transmission according to [10]. 
-	If higher-layer nB is configured as fourT, the UE may assume NRSs are transmitted in the 10th NB-IoT DL subframes before the determined starting subframe of NPDCCH search space. 
-	If higher-layer nB is configured as twoT, the UE may assume NRSs are transmitted in the 9th and 10th NB-IoT DL subframes before the determined starting subframe of NPDCCH search space. 
-	If higher-layer nB is configured as oneT, the UE may assume NRSs are transmitted in the 6th, 7th, 8th, 9th and 10th NB-IoT DL subframes before the determined starting subframe of NPDCCH search space. 
-	For other nB values, the UE may assume NRSs are transmitted in 10 NB-IoT DL subframes before the determined starting subframe of NPDCCH search space.
-	When an NB-IoT UE is configured by higher layers to decode NPDCCH with CRC scrambled by the P-RNTI, the UE may assume NRSs are transmitted in the NPDCCH candidate where the UE finds a DCI with CRC scrambled by the P-RNTI. The UE may also assume NRSs are transmitted in 10 NB-IoT DL subframes before and in 4 NB-IoT DL subframes after the NPDCCH candidate where the UE finds a DCI with CRC scrambled by the P-RNTI, where NB-IoT DL subframes without NRS are not counted. If the DCI with CRC scrambled by the P-RNTI schedules a NPDSCH, the UE may assume NRSs are transmitted in the NB-IoT DL subframes carrying the NPDSCH as well as in 4 NB-IoT DL subframes before and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. 
-	During the window controlled by higher layers where the UE shall attempt to decode the NPDCCH with DCI scrambled by RA-RNTI (see [8], clause 5.1.4), the UE may assume NRSs are transmitted in the Type-2 CSS configured by higher layers, as well as in 10 NB-IoT DL subframes before and in 4 NB-IoT DL subframes after each Type-2 CSS, where NB-IoT DL subframes without NRS are not counted. If a DCI scrambled by the RA-RNTI is detected, the UE may assume NRSs are transmitted in the NPDSCH scheduled by the DCI scrambled by the RA-RNTI, as well as in 4 NB-IoT DL subframes before and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. In addition, when the UE attempts to decode a DCI with CRC scrambled by the RA-RNTI as well as receiving the NPDSCH scheduled by the DCI scrambled by the RA-RNTI, the UE may assume NRSs are transmitted in subframes #0, #1, #3, #4 and #9.
-	During random access procedure, when an NB-IoT UE is configured by higher layers to decode NPDCCH with CRC scrambled by the temporary C-RNTI and/or the C-RNTI, before the DCI scrambled by temporary C-RNTI and/or C-RNTI is detected, the UE may assume NRSs are transmitted in the Type-2 CSS configured by higher layers, as well as in 10 NB-IoT DL subframes before the start of each Type-2 CSS and in 4 NB-IoT DL subframes after the end of each Type-2 CSS until the mac-ContentionResolutionTimer expires, where NB-IoT DL subframes without NRS are not counted. If a DCI scrambled by the temporary C-RNTI or C-RNTI is detected, the UE may assume NRSs are transmitted in the NPDSCH scheduled by the DCI scrambled by the temporary C-RNTI or C-RNTI as well as in 4 NB-IoT DL subframes before and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. 
-	An NB-IoT UE may assume NRSs are transmitted in NB-IoT DL subframes that are used for Type1A-NPDCCH common search space, and Type2A-NPDCCH common search space, as well as in 10 NB-IoT DL subframes prior and in 4 NB-IoT DL subframes after each Type1A-NPDCCH common search space and Type2A-NPDCCH common search space. A UE may assume NRSs are transmitted in NB-IoT DL subframes carrying NPDSCH scheduled by DCI CRC scrambled by G-RNTI or SC-RNTI as well as 4 NB-IoT DL subframes prior and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. 
-	In other cases, if frame structure typ1 is used, the UE may assume NRSs are transmitted in subframes #0, #1, #3, #4, #9, and in NB-IoT downlink subframes and shall not expect NRSs in other downlink subframes.
On an NB-IoT carrier for which a UE receives higher-layer parameter operationModeInfo indicating inband-SamePCI or inband-DifferentPCI.
-	If frame structure type 1 is used, before the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #0, #4 and in subframes #9 not containing NSSS, and in subframes #3 which contain SystemInformationBlockType1-NB when additionalTransmissionSIB1 is configured as TRUE. 
-	If frame structure type 2 is used, before the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #9, and in subframes #0 not containing NSSS, and in subframes #4 if subframes #4 is configured for SystemInformationBlockType1-NB transmissions.
-	If frame structure type 1 is used, after the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #0, #4, subframes #9 not containing NSSS, subframes #3 which contain SystemInformationBlockType1-NB when additionalTransmissionSIB1 is configured as TRUE, and in NB-IoT downlink subframes. 
-	If frame structure type 2 is used, after the UE obtains SystemInformationBlockType1-NB, the UE may assume narrowband reference signals are transmitted in subframes #9, subframes #0 not containing NSSS, in subframes #4 if subframes #4 is configured for SystemInformationBlockType1-NB transmissions, and in NB-IoT downlink subframes
On an NB-IoT carrier for which DL-CarrierConfigCommon-NB is present and inbandCarrierInfo is present: 
-	If frame structure type 1 is used, when an NB-IoT UE is configured by higher layers to decode NPDCCH with CRC scrambled by the P-RNTI and higher-layer indicates nrs-NonAnchor-config is enabled, the UE first determines the starting subframe of NPDCCH search space associated with NRS transmission according to [10].  
-	If higher-layer nB is configured as fourT, the UE may assume NRSs are transmitted in the 10th NB-IoT DL subframes before the determined starting subframe of NPDCCH search space. 
-	If higher-layer nB is configured as twoT, the UE may assume NRSs are transmitted in 9th and 10th NB-IoT DL subframes before the determined starting subframe of NPDCCH search space. 
-	If higher-layer nB is configured as oneT, the UE may assume NRSs are transmitted in 6th, 7th, 8th, 9th and 10th NB-IoT DL subframes before the determined starting subframe of NPDCCH search space. 
-	For other nB values, the UE may assume NRSs are transmitted in 10 NB-IoT DL subframes before the determined starting subframe of NPDCCH search space.
-	When an NB-IoT UE is configured by higher layers to decode NPDCCH with CRC scrambled by the P-RNTI, the UE may assume NRSs are transmitted in the NPDCCH candidate where the UE finds a DCI with CRC scrambled by the P-RNTI. The UE may also assume NRSs are transmitted in10 NB-IoT DL subframes before and in 4 NB-IoT DL subframes after the NPDCCH candidate, where NB-IoT DL subframes without NRS are not counted. If the DCI with CRC scrambled by the P-RNTI schedules a NPDSCH, the UE may assume NRSs are transmitted in the NB-IoT DL subframes carrying the NPDSCH as well as 4 NB-IoT DL subframes before and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. 
-	During random access procedure, during the window controlled by higher layers where the UE shall attempt to decode the NPDCCH with DCI scrambled by RA-RNTI (see [8], clause 5.1.4), before the DCI scrambled by RA-RNTI is detected, the UE may assume NRSs are transmitted in the Type-2 CSS configured by higher layers, as well as in 10 NB-IoT DL subframes before and in 4 NB-IoT DL subframes after the start of each Type-2 CSS, where NB-IoT DL subframes without NRS are not counted. If a DCI scrambled by the RA-RNTI is detected, the UE may assume NRSs are transmitted in the NPDSCH scheduled by the DCI scrambled by the RA-RNTI, as well as in 4 NB-IoT DL subframes before and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. In addition, when the UE attempts to decode a DCI with CRC scrambled by the RA-RNTI as well as receiving the NPDSCH scheduled by the DCI scrambled by the RA-RNTI, the UE may assume NRSs are transmitted in subframes #0, #4 and #9.
-	During random access procedure, when an NB-IoT UE is configured by higher layers to decode NPDCCH with CRC scrambled by the temporary C-RNTI and/or the C-RNTI, before the DCI scrambled by temporary C-RNTI and/or C-RNTI, is detected, the UE may assume NRSs are transmitted in the Type-2 CSS configured by higher layers, as well as in 10 NB-IoT DL subframes before the start of each Type-2 CSS and in 4 NB-IoT DL subframes after the end of each Type-2 CSS until the mac-ContentionResolutionTimer expires, where NB-IoT DL subframes without NRS are not counted. If a DCI scrambled by the temporary C-RNTI or C-RNTI is detected, the UE may assume NRSs are transmitted in the NPDSCH scheduled by the DCI scrambled by the temporary C-RNTI or C-RNTI as well as in 4 NB-IoT DL subframes before and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. 
-	An NB-IoT UE may assume NRSs are transmitted in NB-IoT DL subframes that are used for Type1A-NPDCCH common search space, and Type2A-NPDCCH common search space, as well as in 10 NB-IoT DL subframes prior and in 4 NB-IoT DL subframes after each Type1A-NPDCCH common search space and Type2A-NPDCCH common search space, where NB-IoT DL subframes without NRS are not counted. A UE may assume NRSs are transmitted in NB-IoT DL subframes carrying NPDSCH scheduled by DCI CRC scrambled by G-RNTI or SC-RNTI as well as in 4 NB-IoT DL subframes prior and after the scheduled NPDSCH, where NB-IoT DL subframes without NRS are not counted. 
-	In other cases, if frame structure type 1 is used, the UE may assume NRSs are transmitted in subframes #0, #4, #9, and in NB-IoT downlink subframes and shall not expect NRSs in other downlink subframes.
On an NB-IoT carrier for which DL-CarrierConfigDedicated-NB is present and no inbandCarrierInfo is present:
-	If frame structure type 1 is used, the UE may assume NRSs are transmitted in subframes #0, #1, #3, #4, #9, and in NB-IoT downlink subframes and shall not expect NRSs in other downlink subframes.
On an NB-IoT carrier for which DL-CarrierConfigDedicated-NB is present and inbandCarrierInfo is present:
-	If frame structure type 1 is used, the UE may assume NRSs are transmitted in subframes #0, #4, #9, and in NB-IoT downlink subframes and shall not expect NRSs in other downlink subframes.
An NB-IoT UE may assume NRSs are not transmitted in subframes that are configured by higher layer parameter nprsBitmap for narrowband positioning reference signal transmission.
10.2.6.1	Sequence generation
The narrowband reference sequence shall be initialised according to clause 6.10.1.1 where  is replaced with .
10.2.6.2	Mapping to resource elements
Narrowband reference signals are transmitted on one or two antenna ports . 
If the higher layer indicates UE may assume that  is equal to , UE may assume 
-	the number of antenna ports for the cell-specific reference signals as defined in clause 6.10.1 is the same as for the narrowband reference signals, 
-	the antenna ports for cell-specific reference signals {0, 1} are equivalent to antenna ports for narrowband reference signals {2000, 2001}, respectively, and
-	the cell-specific reference signals are available in all subframes where the narrowband reference signals are available. 
If the higher layer does not indicate UE may assume that  is equal to , UE may assume
-	the number of antenna port for the cell-specific reference signals as defined in clause 6.10.1 is obtained from the higher layer parameter eutra-NumCRS-Ports,
-	the cell-specific reference signals are available in all subframes where the narrowband reference signals are available, and
	the cell-specific frequency shift for cell-specific reference signals as defined in clause 6.10.1.2 is given by . 
The reference signal sequence  shall be mapped to complex-valued modulation symbols  used as reference symbols for antenna port  in slot  according to 
where
When frame structure type 2 is used, the following values of  apply for the generation of NRSs in special subframes
-	in each slot for special subframe configurations {3, 4, 8}
-	in the first slot for special subframe configurations {9, 10}
-	in the first slot for special subframe configurations {1, 2, 6, 7}. 
The variables  and  define the position in the frequency domain for the different reference signals where  is given by
The cell-specific frequency shift is given by .
Resource elements  used for transmission of narrowband reference signals on any of the antenna ports in a slot shall not be used for any transmission on any other antenna port in the same slot and set to zero.
Narrowband reference signals shall not be transmitted in subframes containing NPSS or NSSS. 
For frame structure type 2, narrowband reference signals shall not be transmitted in special subframe for configurations 0 and 5.
Figure 10.2.6.2-1 illustrates the resource elements used for reference signal transmission according to the above definition. The notation  is used to denote a resource element used for reference signal transmission on antenna port. 
Figure 10.2.6.2-1. Mapping of downlink narrowband reference signals (normal cyclic prefix)
10.2.6A	Narrowband positioning reference signal (NPRS)
Narrowband positioning reference signals (NPRSs) shall only be transmitted in resource blocks in NB-IoT carriers configured for NPRS transmission. In a subframe configured for NPRS transmission, the starting positions of the OFDM symbols configured for NPRS transmission shall be identical to those in a subframe in which all OFDM symbols have the same cyclic prefix length as the OFDM symbols configured for NPRS transmission. NPRS are defined for and normal CP only.
NPRSs are transmitted on antenna port 2006. 
10.2.6A.1	Sequence generation
The NPRS sequence  is defined by
where  is the slot number within a radio frame,  is the OFDM symbol number within the slot. The pseudo-random sequence  is defined in clause 7.2. The pseudo-random sequence generator shall be initialised with
at the start of each OFDM symbol where  equals  unless configured by higher layers and where 
10.2.6A.2	Mapping to resource elements
For an NB-IoT carrier which is configured for NPRS transmission, the reference signal sequence  shall be mapped to complex-valued modulation symbols  used as reference signal for antenna port  in slot  according to, for Type 1 NPRS:  
	
or for Type 2 NPRS:
	
according to higher layer configuration, where
-	when the higher layer parameter operationModeInfoNPRS for the configured NB-IoT carrier is set to in-band
where  is signalled by higher layers nprs-SequenceInfo, and  if the higher layer parameter nprs-SequenceInfo indicates is odd, and  if the higher layer parameter nprs-SequenceInfo indicates is even.
-	when the higher layer parameter operationModeInfoNPRS for the configured NB-IoT carrier is set to standalone or guard-band
and where . If is not configured by higher layers, . The number of PBCH antenna ports is signalled by higher layers. 
If higher layer parameter nprsBitmap is not configured, resource elements in OFDM symbols 5 and 6 in each slot shall not be used for transmission of NPRS. If the configured periodicity of Type 1 NPRS is equal to that of Type 2 NPRS, the UE is not expected to be configured with overlapped resource elements between Type 1 NPRS and Type 2 NPRS. Otherwise, a resource element configured for Type 1 NPRS shall not be used for Type 2 NPRS.
Figure 10.2.6A.2-1: Mapping of NPRS (operationModeInfoNPRS is set to in-band, nprsBitmap configured)
Figure 10.2.6A.2-2: Mapping of NPRS (operationModeInfoNPRS is set to standalone or guard-band, nprsBitmap configured)
10.2.6A.3	NPRS subframe configuration
On a NB-IoT DL carrier configured for NPRS transmission, an NB-IoT UE can assume NPRSs are transmitted in DL subframes configured by all higher layer parameters nprsBitmap, the NB-IoT carrier-specific subframe configuration period  the NB-IoT-carrier-specific starting subframe offset  and the number of consecutive downlink subframes  where NPRS shall be transmitted. If frame structure type 2 is used, the UE shall not assume NPRSs are transmitted in special subframes.
-	If ,  and  are not configured for an NB-IoT downlink carrier configured for NPRS transmission, an NB-IoT UE shall assume NPRSs are transmitted in downlink subframes configured by higher layer parameter nprsBitmap. 
-	If nprsBitmap is not configured for an NB-IoT downlink carrier configured for NPRS transmission, an NB-IoT UE shall assume NPRSs are transmitted in downlink subframes configured by the higher layer parameters ,  and .
-	If the higher layer parameter operationModeInfoNPRS for the configured NB-IoT carrier is set to in-band, the higher layer parameters nprsBitmap shall be configured.
-	If ,  and  are configured, the NPRS instances in the first subframe of the  downlink subframes, shall satisfy .
The NPRSs shall not be mapped to resource elements  allocated to resource blocks of NPBCH, NPSS, NSSS, or SystemInformationBlock-Type1-NB regardless of their antenna port .
10.2.6B	Narrowband wake up signal (NWUS)
10.2.6B.1	Sequence generation
The NWUS sequence  in subframe  is defined by 
	
	
	
	
	
	
where  is the actual duration of NWUS as defined in [4]. For a UE not configured with group NWUS, . For a UE configured with group NWUS,  for , where  is determined by the UE group to which the UE is associated as determined by higher layers [10]. The common NWUS sequence shall be determined by  unless the resource is shared with non-group NWUS and common NWUS is configured to be non-group NWUS in which case .
The scrambling sequence  is given by clause 7.2, and shall be initialized at the start of the NWUS with
	
where  is the first frame of the first PO to which the NWUS is associated,  is the first slot of the first PO to which the NWUS is associated and  indicates the group NWUS resource to which the UE is associated. For a UE not configured with group NWUS, , whereas for a UE configured with group NWUS,  is determined by higher layers [10].
10.2.6B.2	Mapping to resource elements
The same antenna port shall be used for all symbols of the NWUS within a subframe. The UE shall not assume that the NWUS is transmitted on the same antenna port as any of the downlink reference signals or synchronization signals. If only one NRS port is configured by the eNB, the UE may assume the transmission of all NWUS subframes is using the same antenna port; otherwise, the UE may assume the same antenna port is used for NWUS transmission in DL subframes w0+2n and w0+2n+1, where w0 is the first DL subframe of the NWUS transmission as specified in [4], and n=0,1.
The NWUS sequence is mapped to the set of subframes in the actual NWUS duration as defined in [4], where in a subframe #4 in which SystemInformationBlockType1-NB is transmitted or a subframe in which an SI message is transmitted, the subframe is counted in the NWUS mapping but not used for transmission of NWUS.On an NB-IoT carrier for which a UE receives higher-layer parameter operationModeInfo indicating inband-SamePCI, inband-DifferentPCI, guardband or standalone or on an NB-IoT carrier for which DL-CarrierConfigCommon-NB is present, the NWUS sequence  shall be mapped to resource elements  in sequence, starting with  in increasing order of first the index  over the 12 assigned subcarriers and then the index  in each subframe in which NWUS is transmitted.
Additionally, on an NB-IoT carrier for which a UE receives higher-layer parameter operationModeInfo indicating guardband or standalone, or on an NB-IoT carrier for which DL-CarrierConfigCommon-NB is present and no inbandCarrierInfo is present, the resource mapping for the first three OFDM symbols in the subframe is performed as follows:
-	The resource element (k,7) is mapped to resource element (k,0) of every index k over 12 assigned subcarriers 
-	The resource element (k,8) is mapped to resource element (k,1) of every index k over 12 assigned subcarriers
-	The resource element (k,9) is mapped to resource element (k,2) of every index k over 12 assigned subcarriers
A resource element  overlapping with resource elements where cell-specific reference signals according to clause 6.10 are transmitted or NRSs according to clause 10.2.6 are transmitted shall not be used for NWUS transmission but is counted in the mapping process.
10.2.7	Synchronization signals
There are 504 unique physical-layer cell identities indicated by the narrowband secondary synchronization signal.
10.2.7.1	Narrowband primary synchronization signal (NPSS)
10.2.7.1.1	Sequence generation
The sequence  used for the narrowband primary synchronization signal is generated from a frequency-domain Zadoff-Chu sequence according to
where the Zadoff-Chu root sequence index  and for different symbol indices  is given by Table 10.2.7.1.1-1.
Table 10.2.7.1.1-1: Definition of .
10.2.7.1.2	Mapping to resource elements
The same antenna port shall be used for all symbols of the narrowband primary synchronization signal within a subframe.
UE shall not assume that the narrowband primary synchronization signal is transmitted on the same antenna port as any of the downlink reference signals. The UE shall not assume that the transmissions of the narrowband primary synchronization signal in a given subframe use the same antenna port, or ports, as the narrowband primary synchronization signal in any other subframe.
The sequences  shall be mapped to resource elements  in increasing order of first the index  and then the index  in subframe 5 in every radio frame. For resource elements  overlapping with resource elements where cell-specific reference signals according to clause 6.10 are transmitted, the corresponding sequence element  is not used for the NPSS but counted in the mapping process.
10.2.7.2	Narrowband secondary synchronization signal (NSSS)
10.2.7.2.1	Sequence generation
The sequence  used for the narrowband secondary synchronization signal is generated from a frequency-domain Zadoff-Chu sequence according to
where
The binary sequence  is given by Table 10.2.7.2.1-1. The cyclic shift in frame number  is given by 
.
Table 10.2.7.2.1-1: Definition of .
10.2.7.2.2	Mapping to resource elements
The same antenna port shall be used for all symbols of the narrowband secondary synchronization signal within a subframe.
The UE shall not assume that the narrowband secondary synchronization signal is transmitted on the same antenna port as any of the downlink reference signals. The UE shall not assume that the transmissions of the narrowband secondary synchronization signal in a given subframe use the same antenna port, or ports, as the narrowband secondary synchronization signal in any other subframe. 
If indicated by higher layer, a UE may assume different precoders are applied for NSSS transmission in a number of consecutive NSSS occasions signalled by higher layer.
The sequence  shall be mapped to resource elements  in sequence starting with  in increasing order of first the index  over the 12 assigned subcarriers and then the index over the assigned last  symbols of subframe 9 for frame structure type 1 or subframe 0 for frame structure type 2  in radio frames fulfilling , where  is given by Table 10.2.7.2.2-1.
Table 10.2.7.2.2-1: NSSS number of symbols
For resource elements  overlapping with resource elements where cell-specific reference signals according to clause 6.10 are transmitted, the corresponding sequence element  is not used for the NSSS but counted in the mapping process.
10.2.8	OFDM baseband signal generation
For an NB-IoT carrier 
-	for which the higher layer parameter operationModeInfo indicates 'inband-DifferentPCI ' and for all NB-IoT downlink physical channels and signals except NPRS,
-	for which the higher layer parameter operationModeInfo indicates 'Guardband ' or 'Standalone ',
-	for an NB-IoT carrier for which the higher layer parameter CarrierConfigDedicated-NB or DL-CarrierConfigCommon-NB is present and no inbandCarrierInfo is present, or 
-	for an NB-IoT carrier for which the higher layer parameters CarrierConfigDedicated-NB or DL-CarrierConfigCommon-NB is present and inbandCarrierInfo is present and the higher layers do not indicate  is the same as  and for all NB-IoT downlink physical channels and signals except NPRS,
the time-continuous signal  on antenna port  in OFDM symbol  in a downlink slot is defined by 
for where , ,  and  is the content of resource element  on antenna port . 
Otherwise, the time-continuous signal  on antenna port  in OFDM symbol , where  is the OFDM symbol index from the start of the last even-numbered subframe, is defined by
for  where  and,  if resource element is used for Narrowband IoT except for NPRS, and 0 otherwise including NPRS. The quantity  is the frequency location of the center of the Narrowband IoT PRB minus the frequency location of the center of the LTE signal. 
Only normal CP is supported for Narrowband IoT downlink in this release of the specification.
10.2.9	Modulation and upconversion
Modulation and upconversion to the carrier frequency of the complex-valued OFDM baseband signal for each antenna port is shown in Figure 6.13-1. The filtering required prior to transmission is defined by the requirements in 3GPP TS 36.104 [6].
Annex A (informative):
Change history