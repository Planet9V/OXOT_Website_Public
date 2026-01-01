# OFI Intelligence Gap Analysis & OSINT Enhancement Strategy

## 1. Critical Analysis of Current Information

**Current State:**
The existing data tells a strong "Corporate & Strategic" story. We know *who* they are, *what* they sell, *where* they operate, and *why* they are transforming (IPO, Smart Factory).
- **Strengths:** Corporate Structure, Strategic Goals (IPO, Sustainability), Main OT Platforms (Braincube, SAP, Rockwell), Key Facility locations.
- **Weaknesses (Attacker Perspective):** The data is too "clean". It lacks the "dirty" details a real attacker looks for—misconfigurations, specific human targets, shadow IT, and legacy infrastructure rot.

**Identified Intelligence Gaps (The "Attacker's View"):**

1.  **Digital Infrastructure & External Attack Surface**:
    *   *Gap:* We know they use AWS/Azure, but what are their ASNs? IP Ranges?
    *   *Attacker Value:* Identifying exposed RDP/VPN endpoints or forgotten testing servers.
    *   *Missing Data:* Specific exposed ports (e.g., Modbus 502, S7 102) on public IPs.

2.  **Human Terrain & Social Engineering Vectors**:
    *   *Gap:* We list C-suite, but attackers target mid-level engineers/admins. Who are the "Mindsprint" devs posting on GitHub?
    *   *Attacker Value:* Spear-phishing targets with privileges but less training than C-suite.
    *   *Missing Data:* Names/Roles of specific OT engineers, PLC programmers, or Cloud Architects.

3.  **Shadow IT & Subsidiary Chaos**:
    *   *Gap:* Acquisitions like Olde Thompson or Club Coffee often have legacy IT that isn't fully integrated.
    *   *Attacker Value:* The "soft underbelly"—attacking the less secure subsidiary to pivot into the main OFI network.
    *   *Missing Data:* Legacy domains or email systems of acquired companies still in use.

4.  **Specific OT/ICS Vulnerability Details**:
    *   *Gap:* We know they use "Siemens", but which series? S7-300 (EoL)? S7-1500? Firmware versions?
    *   *Attacker Value:* Tailoring exploits (e.g., specific CVEs) rather than generic attacks.
    *   *Missing Data:* Specific hardware models found in Zaan or Tokoroa photos/reports.

5.  **Supply Chain Dependencies (Non-Digital)**:
    *   *Gap:* Who moves their goods? Logistics partners have valid credentials to OFI portals.
    *   *Attacker Value:* Compromising a small logistics trucking firm to steal credentials for Olam Direct.
    *   *Missing Data:* Specific 3PL providers and shipping lines used.

---

## 2. Perplexity OSINT Prompts

We will use these 10 prompts to harvest the missing "Attacker Perspective" data.

1.  **Network_Recon**: "Provide a list of Autonomous System Numbers (ASNs) and IP address ranges registered to Olam International, Olam Food Ingredients (OFI), and Mindsprint. Identify any known public-facing subdomains related to 'dev', 'staging', or 'vpn'."
2.  **Shadow_IT_Acquisitions**: "Identify legacy domains, email servers, and IT infrastructure still active for OFI's recent acquisitions: Olde Thompson, Club Coffee, and BT Cocoa. Are there separate employee portals for these subsidiaries?"
3.  **Human_INT_Mindsprint**: "List key technical job roles and senior engineering personnel at Mindsprint (formerly Olam Technology Services) based on public LinkedIn and GitHub profiles. Focus on profiles mentioning 'SAP Security', 'OT Security', or 'Cloud Architecture'."
4.  **OT_Hardware_Fingerprinting**: "Analyze public technical case studies, engineering brochures, or contractor portfolios regarding Olam Food Ingredients' facilities in Koog aan de Zaan (Cocoa) and Tokoroa (Dairy). What specific Siemens or Rockwell PLC models (e.g., ControlLogix 5580, S7-300) are mentioned?"
5.  **Exposed_Services_Shodan**: "Summarize recent OSINT findings or Shodan dorks related to Olam/OFI. Are there reports of exposed Industrial Control Systems protocols (Modbus, BACnet, EtherNet/IP) associated with Olam's IP space?"
6.  **Supply_Chain_Logistics**: "Identify the major third-party logistics (3PL) providers, shipping lines, and warehousing partners used by Olam Food Ingredients for global cocoa and coffee distribution. Do any have integrated IT portals with OFI?"
7.  **Executive_Pattern_of_Life**: "Detail recent speaking engagements, conference attendance, and travel patterns for OFI executives A. Shekhar (CEO) and Rishi Kalra (CFO) in 2024-2025. What specific hotels or conference centers do they frequent?"
8.  **Breach_History_Deep**: "Search for mentions of Olam, OFI, or Mindsprint in data leak dumps, ransomware negotiation chat logs (e.g., LockBit, Akira), or dark web marketplaces selling corporate credentials from 2023-2025."
9.  **SaaS_Vendor_Ecosystem**: "Map the SaaS ecosystem of Olam Food Ingredients. Beyond SAP, what specific platforms are used for HR (Workday?), CRM (Salesforce?), ticketing (ServiceNow?), and collaboration (Teams/Slack)?"
10. **Physical_Security_Intel**: "Provide open-source intelligence on the physical security measures of OFI's Tokoroa Dairy implementation and Shanghai Customer Solution Center. Mention fencing, guard providers, or access control system brands (e.g., HID, Lenel) cited in construction reports."

---

## 3. Enhancement Strategy

Other than simply "adding data" to the existing pages, we will create a new **"Attacker View" Dashboard** component (`AttackerView.tsx`).

**Strategy:**
1.  **Create `OFI_Attacker_Profile.md`**: Consolidate all 10 search results into a "Red Team Dossier".
2.  **Enhance `TechnologyRisks.tsx`**: Add the specific hardware models and SaaS risks found.
3.  **Enhance `SecurityRiskSection.tsx`**: Add a "Digital Footprint" section showing exposed ASN/IP stats.
4.  **Update `IntelligenceReport.tsx`**: Add the "Mindsprint Developer Exposure" and "Shadow IT" sections.
