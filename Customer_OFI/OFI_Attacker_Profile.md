# OFI Critical Attacker Profile (Red Team Dossier)

> **CLASSIFICATION**: OXOT-CONFIDENTIAL // RED TEAM EYES ONLY
> **TARGET**: Olam Food Ingredients (ofi)
> **DATE**: 2025-12-31

## Executive Summary
Olam Food Ingredients presents a **"Hard Shell, Soft Underbelly"** profile.
- **Hard Shell**: Corporate IT (Olam Group) is opaque, with strong OPSEC. No public leaks, generic ISP presence (Tata), and no visible executive patterns of life.
- **Soft Underbelly**: A sprawling, globally distributed **Custom Application Ecosystem** (AtSource, Jiva, Olam Direct) used by 2.8 million farmers and 300+ customers. These platforms likely lack the hardening of standard enterprise SaaS.

---

## 1. Digital Attack Surface

### A. Network Infrastructure
- **ISP**: Tata Communications (AS6453).
- **IP Range**: 180.87.142.0/24 (Olam International).
- **Assessment**: Corporate perimeter is tight. No "easy" RDP/SMB exposures found via passive OSINT.

### B. The "Crown Jewels" of Vulnerability: Custom Apps
Instead of attacking the well-defended corporate mail servers, the primary vector is the **AgriTech Ecosystem**.
1.  **Olam Direct**:
    - *Function*: Mobile app for 2.8M farmers to sell produce.
    - *Vector*: API endpoints for pricing and transactions. Likely vulnerable to **IDOR** (Insecure Direct Object References) allowing data enumeration.
    - *Impact*: Supply chain disruption, financial fraud.
2.  **AtSource**:
    - *Function*: Sustainability tracking for 300+ enterprise customers (Nestlé, etc.).
    - *Vector*: Tenant isolation failure. Can Customer A see Customer B's data?
    - *Impact*: IP theft, reputable damage.
3.  **Jiva**:
    - *Function*: AI-driven agronomy advisory.
    - *Vector*: AI Model Poisoning. Feeding bad crop data to cause yield failure.

---

## 2. Human Terrain & Social Engineering

### A. Mindsprint (The IT Arm)
- **Key Targets**:
    - **Sagar P. V** (CTO): High value, high difficulty.
    - **Venkatesh Subramaniam** (CISO): Hardened target.
    - **Siddharth Satpute** (Head of Industry Solutions): Moderate value, likely handles Supply Chain apps.
- **Vector**: "Recruitment" lures targeting "SAP Security" or "AI/ML Engineers" for Jiva.

### B. The "Invisible" Supply Chain
- **Logistics**: While specific 3PLs are hidden, the **entry points** are the physical loading docks at **Koog aan de Zaan** and **Tokoroa**.
- **Vector**: Cloned "Visitor" or "Contractor" badges. No specific HID/Lenel systems were identified, suggesting generic/legacy access controls at older acquired sites.

---

## 3. Technology Risks (Specific)

### A. OT/ICS Hardware
- **Inferred Stack**: While specific models are scrubbed, the "Zaan Cluster" (ex-ADM) likely runs **Legacy Siemens S7-300/400** (common in EU cocoa processing from that era).
- **Tokoroa**: likely **Rockwell ControlLogix** (standard for NZ/AU dairy greenfield).
- **Risk**: The mix of Greenfield (Tokoroa) and Brownfield (Koog) creates inconsistent security policies.

### B. Third-Party Risk
- **Braincube**: (Previously identified) Critical risk due to direct PLC access.
- **Mindsprint**: As the MSP, a compromise of Mindsprint is a "Skeleton Key" to all of OFI.

---

## 4. Operational Gaps (Attacker Opportunities)
1.  **Acquisition Integration**: Olde Thompson, Club Coffee, and BT Cocoa. No public "one-network" standard found.
    *   *Opportunity*: Attack the "Club Coffee" employee portal (likely older) to pivot into OFI Global.
2.  **AI/Data Integrity**: Jiva and Braincube rely on massive data ingestion.
    *   *Opportunity*: **Data Poisoning**. Subtle shifts in temperature/moisture data could ruin a cocoa harvest without triggering IT alarms.

---

## 5. Recommended Red Team Scenarios
1.  **"Harvest Rot"**: Compromise **Jiva** app API to send incorrect fertilizer/pesticide advice to 10k farmers.
2.  **"Golden Ticket"**: Compromise a **Mindsprint** developer's GitHub/laptop to push malicious code to **AtSource**.
3.  **"Logistics Jam"**: DDOS or corrupt the **Olam Direct** pricing feed during peak harvest, causing farmers to sell elsewhere.
