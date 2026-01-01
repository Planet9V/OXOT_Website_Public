# OFI Sector Threat Report - Food & Agriculture Cybersecurity Incidents

**Report Period:** July 2023 - December 2025  
**Last Updated:** December 31, 2025  
**Classification:** OSINT // UNCLASSIFIED

---

## Executive Summary

The food and agriculture sector experienced a **dramatic surge in cyberattacks** from 2023-2025:

| Metric | 2023 | 2024 | 2025 (Projected) |
|--------|------|------|------------------|
| Ransomware Incidents | 167 | 212 | 340+ |
| YoY Increase | - | +27% | +60% |
| Sector Ranking | 7th | 6th | 5th |
| Q4 Spike | Baseline | +118% | TBD |

**Key Findings:**
- Food/Ag accounted for **5.8% of global ransomware volume** in 2024
- **84 incidents in Q1 2025 alone** (attacks doubled vs. Q1 2024)
- Power vacuum from LockBit/ALPHV disruptions enabled RansomHub dominance

---

## Threat Actor Landscape

### Active Ransomware Groups (2024-2025)

| Group | Activity Level | Primary TTPs | Notable Targets |
|-------|---------------|--------------|-----------------|
| **RansomHub** | DOMINANT | Double extortion, supply chain | Food processors, distributors |
| **Akira** | HIGH | Data theft, encryption | Agricultural cooperatives |
| **LockBit 3.0** | MODERATE | RaaS, affiliate model | Meat processing |
| **Hunters International** | RISING | Data extortion priority | Dairy, poultry |
| **Clop** | MODERATE | File-sharing exploits | Grain/commodity traders |

### APT Groups with Agricultural Interest

| Group | Nation-State | Focus Areas |
|-------|-------------|-------------|
| APT28 (Fancy Bear) | Russia | Commodity markets, grain supplies |
| APT41 | China | Agricultural IP, seed technology |
| Sandworm | Russia | Critical infrastructure disruption |

---

## Monthly Incident Summary

### 2025

#### Q1 2025 (January - March)
- **84 ransomware incidents** across food/ag sector
- **101% increase** vs. same period 2024
- Notable incidents:
  - **March 2025**: South Africa's largest chicken producer - $1M+ damages
  - **March 2025**: Largest dairy plant in southern Siberia - Production halted

#### Q2 2025 (April - June)
- Trend: Continued escalation
- Focus shift to small/mid-size farms and regional processors
- CISA Cyber Storm exercises revealed info-sharing gaps

---

### 2024

#### Q4 2024 (October - December)
- **118% spike** vs. Q4 2023
- RansomHub emerged as dominant actor post-LockBit takedown
- Grocery retail targeted: Ahold Delhaize (Stop & Shop) inventory disruptions

#### Q3 2024 (July - September)
- United Natural Foods - Online ordering shutdown
- Focus on supply chain interconnections
- Just-in-time delivery vulnerabilities exploited

#### Q2 2024 (April - June)
- AGCO manufacturing disruptions continued
- Legacy OT/ICS systems primary entry vector
- CVE-2024-3493 (Rockwell) exploited in wild

#### Q1 2024 (January - March)
- Baseline: ~14 incidents/month
- Double extortion becoming standard TTP

---

### 2023

#### Q3-Q4 2023 (July - December)
- **167 total incidents** for year
- Sector ranked 7th most targeted globally
- Dole attack ripple effects continued ($10.5M impact)
- AGCO (farm equipment) disruptions

---

## Attack Vector Analysis

### Primary Entry Points

| Vector | Prevalence | OFI Relevance |
|--------|-----------|---------------|
| Phishing/Social Engineering | 45% | HIGH - 87K employees |
| Exposed Remote Services | 25% | HIGH - 120+ plants |
| Supply Chain Compromise | 15% | CRITICAL - Braincube, vendors |
| Legacy OT/ICS Exploitation | 10% | CRITICAL - PLCs, SCADA |
| Insider Threat | 5% | MEDIUM - 2.8M farmer network |

### Tactics, Techniques, and Procedures (TTPs)

1. **Double Extortion** - Encryption + data leak threats (53% of attacks)
2. **Supply Chain Targeting** - Just-in-time delivery disruption
3. **OT/IoT Exploitation** - Automated systems (GPS tractors, milk sensors)
4. **Credential Harvesting** - Lateral movement from IT to OT

---

## Sector-Specific Incidents

### Dairy Processing
- **March 2025**: Siberian dairy plant - Production halt, unknown damages
- **2024**: Multiple European incidents (details classified)
- **Risk Level**: HIGH - Pasteurization safety-critical

### Poultry/Meat Processing
- **March 2025**: South Africa chicken producer - $1M+ confirmed
- **2021 (Reference)**: JBS - $11M ransom paid
- **Risk Level**: CRITICAL - High-value targets

### Produce/Fresh Foods
- **2023**: Dole - $10.5M total impact
- **Risk Level**: MEDIUM - Supply chain exposure

### Commodity Trading/Grain
- **Ongoing**: Clop targeting file-sharing services
- **Risk Level**: MEDIUM - Market manipulation potential

---

## Regulatory Response

### Food and Ag-ISAC Growth
- Membership increased significantly 2024-2025
- PASS (Prioritization and Scoring System) deployed
- Enhanced threat intelligence sharing

### Government Actions
- CISA advisories increased frequency
- Cyber Storm VIII exercises identified gaps
- Congressional attention (Rep. Nunn cybersecurity bills)

---

## Recommendations for OFI

### Immediate (0-30 days)
1. Validate backup/recovery for all 120+ plants
2. Review Braincube API access controls
3. Tabletop exercise: ransomware scenario

### Short-term (30-90 days)
1. Implement network segmentation IT/OT
2. Deploy OT monitoring (Claroty/Nozomi style)
3. Vendor security assessments (Braincube priority)

### Long-term (90+ days)
1. IEC 62443 certification program
2. 24/7 SOC with OT visibility
3. Supply chain risk management program

---

## Sources

1. Food and Ag-ISAC Quarterly Reports 2024-2025
2. FDD Analysis: "Cybercriminals Targeting U.S. Food and Agriculture" (Feb 2025)
3. Halcyon Research: "Ransomware Attacks on Agriculture Doubled" (2025)
4. TXOne Networks: "From Farm to Fallout" (2024)
5. Purdue Agribusiness Cybersecurity Report (2025)
6. CISA ICS Advisories 2024-2025
7. Checkpoint August 2025 Threat Report
