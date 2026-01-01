# OFI Technology Vulnerabilities - CVE Database

**Report Period:** 2024-2025  
**Last Updated:** December 31, 2025  
**Classification:** OSINT // UNCLASSIFIED

---

## Executive Summary

This document catalogs critical vulnerabilities affecting OFI's technology stack. Priority is given to CVEs with:
- CVSS ≥ 7.0
- Manufacturing/food processing relevance
- Remote exploitation potential

---

## Rockwell Automation Vulnerabilities

OFI uses Rockwell ControlLogix and FactoryTalk across processing facilities.

### Critical (CVSS ≥ 9.0)

| CVE | CVSS v4 | Product | Description | OFI Impact |
|-----|---------|---------|-------------|------------|
| **CVE-2024-10386** | 9.3 | FactoryTalk ThinManager | DB manipulation via crafted packets | CRITICAL - HMI access |
| **CVE-2025-7353** | 9.0+ | ControlLogix Ethernet | RCE via web debugger - memory dump/modify | CRITICAL - PLC control |

### High (CVSS 7.0-8.9)

| CVE | CVSS | Product | Description | OFI Impact |
|-----|------|---------|-------------|------------|
| **CVE-2025-9364** | 8.7 | LogixAI (Redis) | Sensitive data access, no auth required | HIGH - Analytics exposure |
| **CVE-2025-7970** | 8.7 | FactoryTalk Activation Manager v5.00 | Traffic decryption, session hijack | HIGH - License servers |
| **CVE-2024-6077** | 8.7 | ControlLogix, CompactLogix, GuardLogix | Remote DoS, manual restart required | HIGH - Production outage |
| **CVE-2024-3493** | 8.6 | ControlLogix 5580, CompactLogix 5380 | DoS via malformed packet | HIGH - Processing lines |
| **CVE-2025-9161** | 7.3 | FactoryTalk Optix v1.5.0-1.5.7 | RCE via MQTT remote plugin load | MEDIUM - Edge systems |
| **CVE-2025-9160** | 7.0 | CompactLogix 5480 (Win10 1607) | Physical access RCE | MEDIUM - Maintenance |

### Remediation Status

| CVE | Patch Available | Recommended Version |
|-----|-----------------|---------------------|
| CVE-2025-7970 | Yes | v5.02+ |
| CVE-2025-9161 | Yes | v1.6.0+ |
| CVE-2025-9160 | Yes | v35.014+ |
| CVE-2024-3493 | Yes | April 2024 patch |

---

## Siemens Vulnerabilities

OFI uses Siemens S7-1500, S7-300/400, WinCC SCADA systems.

### Known Vulnerabilities (Historical Reference)

| CVE | CVSS | Product | Description |
|-----|------|---------|-------------|
| CVE-2019-13945 | 7.1 | S7-1500 CPU | Boot sequence bypass |
| CVE-2022-38465 | 9.8 | S7-1500 (multiple) | Private key extraction |
| CVE-2023-28489 | 9.8 | CP-8050/8031 | Web server RCE |

### Recommended Mitigations
1. Network segmentation (IEC 62443 zones)
2. Disable unused services
3. Apply latest firmware updates
4. Enable access control lists

---

## SAP S/4HANA Vulnerabilities

OFI runs SAP S/4HANA (RISE with SAP on AWS) with Joule AI.

### IT/OT Integration Risks

| Risk Category | Description | Severity |
|---------------|-------------|----------|
| API Gateway Bypass | SAP → SCADA command injection | CRITICAL |
| Joule AI Data Leakage | Process recipes exposed via AI | HIGH |
| RFC Destination Exploits | Lateral movement to OT | HIGH |
| BAPI Manipulation | ERP data integrity | MEDIUM |

### Recommended Controls
1. API security gateways between SAP and OT
2. Joule AI data classification policies
3. RFC destination hardening
4. Transaction logging and monitoring

---

## Braincube Platform Risks

**CRITICAL THIRD-PARTY RISK**: Braincube has direct PLC access.

### Attack Scenarios

| Scenario | Entry Point | Impact | Likelihood |
|----------|-------------|--------|------------|
| AI Model Poisoning | Compromised training data | Quality degradation | MEDIUM |
| Command Injection | Braincube API to PLCs | Process manipulation | HIGH |
| Data Exfiltration | Proprietary formula theft | IP loss | HIGH |
| Supply Chain Attack | Braincube compromise (SolarWinds-style) | 120 plants affected | MEDIUM |

### Technical Concerns
- **No publicly disclosed CVEs** for Braincube platform
- Limited security visibility (third-party SaaS)
- Direct API connections to manufacturing PLCs
- 6.5% yield increase = critical dependency

### Required Controls
1. Braincube API behavioral baselining
2. Anomaly detection on PLC commands
3. Independent safety validation layer
4. Vendor security assessment (SOC 2, penetration testing)

---

## Nutanix Hybrid Cloud Vulnerabilities

OFI uses Nutanix for hybrid cloud (99.999% uptime SLA).

### IT/OT Boundary Risks

| Risk | Description | Mitigation |
|------|-------------|------------|
| Hypervisor Escape | VM to host breakout | Patch hypervisor, segment OT VMs |
| Management Plane Exposure | Prism access from OT | Network segmentation |
| Snapshot Theft | OT configs in backups | Encrypted backups, access control |

---

## General ICS Vulnerabilities (2024-2025)

### Erlang/OTP SSH (Affects IoT Devices)
- **CVE-2025-32433** - CVSS 10.0
- Unauthenticated RCE
- Fixed in OTP-27.3.3+
- **OFI Impact**: IoT sensors, edge devices

### Protocol Vulnerabilities

| Protocol | Issue | OFI Usage |
|----------|-------|-----------|
| Modbus TCP | No authentication | PLC communications |
| OPC UA | Certificate validation | Historian connections |
| MQTT | Broker security | Edge analytics |

---

## Vulnerability Prioritization for OFI

### Immediate Action Required

1. **CVE-2024-10386** (FactoryTalk ThinManager) - Patch immediately
2. **CVE-2025-7353** (ControlLogix web debugger) - Disable feature or patch
3. **Braincube API access** - Implement monitoring

### 30-Day Remediation

1. All Rockwell High-severity CVEs
2. SAP/OT integration security review
3. Nutanix network segmentation audit

### 90-Day Program

1. Full vulnerability assessment across 120+ plants
2. Standardized patching program
3. OT-specific vulnerability scanning deployment

---

## Sources

1. CISA ICS-CERT Advisories 2024-2025
2. Rockwell Automation Security Advisories
3. Siemens ProductCERT
4. Industrial Cyber News Analysis
5. runZero Rockwell Vulnerability Research
