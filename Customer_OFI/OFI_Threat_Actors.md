# OFI Threat Actor Profile Database

**Last Updated:** December 31, 2025  
**Classification:** OSINT // UNCLASSIFIED

---

## Ransomware Groups Targeting Food & Agriculture

### Tier 1 - Active Against Sector (2024-2025)

#### RansomHub
| Attribute | Details |
|-----------|---------|
| **Status** | DOMINANT (Post-LockBit vacuum) |
| **First Observed** | February 2024 |
| **Primary TTPs** | T1486 (Data Encrypted), T1567 (Exfiltration), T1190 (Exploit Public-Facing App) |
| **Ransom Model** | Double extortion (encrypt + leak) |
| **Notable Victims** | Food processors, agricultural distributors |
| **OFI Relevance** | HIGH - Active against food manufacturing |

#### Akira
| Attribute | Details |
|-----------|---------|
| **Status** | HIGHLY ACTIVE |
| **First Observed** | March 2023 |
| **Primary TTPs** | T1078 (Valid Accounts), T1021 (Remote Services), T1486 |
| **Ransom Model** | Double extortion, data theft priority |
| **Notable Victims** | Agricultural cooperatives, rural providers |
| **OFI Relevance** | HIGH - Targets agricultural supply chain |

#### LockBit 3.0
| Attribute | Details |
|-----------|---------|
| **Status** | MODERATE (Disrupted by law enforcement) |
| **First Observed** | June 2022 |
| **Primary TTPs** | T1059 (Command Interpreter), T1047 (WMI), T1486 |
| **Ransom Model** | RaaS (Ransomware-as-a-Service), affiliate model |
| **Notable Victims** | JBS (historical reference), meat processors |
| **OFI Relevance** | MEDIUM - Reduced capacity but still active |

#### Hunters International
| Attribute | Details |
|-----------|---------|
| **Status** | RISING |
| **First Observed** | October 2023 (Hive spinoff) |
| **Primary TTPs** | T1567 (Exfiltration), T1486, T1071 (App Layer Protocol) |
| **Ransom Model** | Data extortion prioritized over encryption |
| **Notable Victims** | Dairy, poultry processing |
| **OFI Relevance** | HIGH - Dairy operations specifically targeted |

#### Clop
| Attribute | Details |
|-----------|---------|
| **Status** | MODERATE |
| **First Observed** | 2019 |
| **Primary TTPs** | T1190 (Exploit Public-Facing), MOVEit/GoAnywhere exploits |
| **Ransom Model** | Mass exploitation of file transfer services |
| **Notable Victims** | Grain traders, commodity exchanges |
| **OFI Relevance** | MEDIUM - File sharing services |

---

### Tier 2 - Opportunistic Against Sector

#### Play
| Attribute | Details |
|-----------|---------|
| **Status** | Active |
| **Primary TTPs** | T1078, T1059, intermittent encryption |
| **OFI Relevance** | LOW - No specific food sector targeting |

#### BlackBasta
| Attribute | Details |
|-----------|---------|
| **Status** | Active |
| **Primary TTPs** | T1566 (Phishing), T1486 |
| **OFI Relevance** | LOW - Manufacturing general |

---

## APT Groups with Agricultural Interest

### APT28 (Fancy Bear)
| Attribute | Details |
|-----------|---------|
| **Attribution** | Russia (GRU Unit 26165) |
| **Focus** | Commodity markets, grain supply intelligence |
| **Primary TTPs** | T1566 (Spearphishing), T1078 (Credential Access) |
| **Historical Targets** | Commodity trading firms, agricultural ministries |
| **OFI Relevance** | MEDIUM - Grain/commodity intelligence |

### APT41 (Winnti Group)
| Attribute | Details |
|-----------|---------|
| **Attribution** | China (MSS-linked) |
| **Focus** | Agricultural IP theft, seed technology, formulas |
| **Primary TTPs** | T1190, T1505 (Web Shell), T1087 (Discovery) |
| **Historical Targets** | Agricultural biotech, food science R&D |
| **OFI Relevance** | HIGH - Proprietary recipe/formula theft risk |

### Sandworm
| Attribute | Details |
|-----------|---------|
| **Attribution** | Russia (GRU Unit 74455) |
| **Focus** | Critical infrastructure disruption |
| **Primary TTPs** | T0831 (ICS Manipulation), T0826 (Loss of Availability) |
| **Historical Targets** | Ukraine power grid, industrial systems |
| **OFI Relevance** | MEDIUM - Geopolitical escalation scenario |

---

## MITRE ATT&CK Mapping for Food Sector

### Initial Access (Most Common)
| Technique | ID | Sector Usage |
|-----------|-----|--------------|
| Spearphishing Attachment | T1566.001 | 45% of incidents |
| Exploit Public-Facing Application | T1190 | 25% of incidents |
| Valid Accounts | T1078 | 20% of incidents |
| Supply Chain Compromise | T1195 | 10% of incidents |

### Impact (Food-Specific)
| Technique | ID | Description |
|-----------|-----|-------------|
| Data Encrypted for Impact | T1486 | Production system encryption |
| Inhibit Response Function | T0800 | PLC/SCADA disruption |
| Loss of Availability | T0826 | Plant shutdown |
| Manipulation of Control | T0831 | Process tampering (safety risk) |

---

## Threat Actor Infrastructure

### Indicators of Compromise (IoCs)

#### RansomHub
- C2 Domains: `.onion` based (TOR hidden services)
- Bitcoin wallets: Rotating per victim
- Kill chain: Initial Access → Lateral Movement → Data Staging → Encryption

#### Common Attack Infrastructure
| Resource | Usage |
|----------|-------|
| Cobalt Strike | Post-exploitation framework |
| Mimikatz | Credential harvesting |
| PsExec | Lateral movement |
| Rclone | Data exfiltration |
| AnyDesk | Persistent access |

---

## Threat Timeline (2024-2025)

### Q4 2024
- LockBit disruption created power vacuum
- RansomHub filled gap rapidly
- Food sector targeting intensified

### Q1 2025
- 84 incidents (doubled vs. Q1 2024)
- Hunters International emerged as dairy specialist
- South Africa/Siberia high-profile attacks

### Q2-Q3 2025
- Small/mid-size farms targeted
- Supply chain interconnections exploited
- CISA exercises revealed gaps

---

## OFI-Specific Threat Assessment

### Highest Risk Actors

1. **RansomHub** - Active against food manufacturing, double extortion
2. **APT41** - Formula/IP theft risk (cocoa, dairy processes)
3. **Hunters International** - Dairy processing specialization

### Attack Vectors Most Likely

1. **Phishing** → SAP/O365 credentials → Lateral to OT
2. **Braincube Compromise** → Direct PLC access (supply chain)
3. **Remote Services** → VPN exploitation → 120 plants at risk
4. **Insider** → Olam Direct app (2.8M farmer devices)

### Recommended Monitoring

| Actor Type | Detection Focus |
|------------|-----------------|
| Ransomware | Cobalt Strike beacons, mass file encryption |
| APT | Long-dwell, lateral movement, data staging |
| Insider | Unusual data access, after-hours activity |

---

## Sources

1. CISA/FBI Joint Advisories 2024-2025
2. MITRE ATT&CK Framework (Enterprise & ICS)
3. Food and Ag-ISAC Threat Bulletins
4. Mandiant Threat Intelligence Reports
5. Recorded Future Criminal Underground Analysis
