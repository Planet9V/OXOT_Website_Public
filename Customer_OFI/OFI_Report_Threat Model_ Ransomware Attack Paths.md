# **Comprehensive Cyber Threat Intelligence Monitor: Olam Food Ingredients (OFI) Strategic Threat Model & Security Posture Analysis**

## **1\. Executive Strategic Assessment and Geopolitical Context**

The global food and agriculture sector has emerged as a primary theater for both criminal extortion and state-sponsored strategic pre-positioning. As digital transformation accelerates within this critical infrastructure, the attack surface expands exponentially, creating new vulnerabilities in what was once a relatively isolated domain. This report provides an exhaustive, forensic-level threat model for Olam Food Ingredients (OFI), a global leader in natural and sustainable ingredient solutions. Following its 2020 reorganization from Olam International, OFI operates as a distinct entity with a complex, interconnected architecture spanning 120 manufacturing facilities and a sourcing network of over 2.8 million farmers globally.1

This analysis synthesizes current threat intelligence to construct a full MITRE ATT\&CK threat model encompassing Enterprise IT, Industrial Control Systems (ICS), and Mobile domains. The assessment reveals that OFI’s operational resilience is challenged by a "convergence of threats." On one front, the organization faces relentless pressure from financially motivated ransomware cartels—specifically Akira, Black Basta, and RansomHub—who view the food supply chain’s low tolerance for downtime as a leverage point for "double extortion" schemes.3 On the other, state-sponsored actors, notably the People’s Republic of China (PRC)-linked Volt Typhoon and the Democratic People's Republic of Korea (DPRK)-linked Lazarus Group, are actively targeting critical infrastructure and fintech platforms, presenting risks of espionage, sabotage, and financial theft.6

OFI's aggressive adoption of Industry 4.0 technologies—exemplified by the deployment of the cloud-native Plex Smart Manufacturing Platform at its Olde Thompson subsidiary, advanced automation partnerships with GEA and Tetra Pak in its New Zealand dairy operations, and the "OFI Direct" mobile ecosystem for farmer engagement—has inextricably linked its physical production capabilities with its digital integrity.8 The analysis draws upon recent high-profile incidents, such as the ransomware attacks on Dole, JBS, and Ahold Delhaize, to project potential attack vectors against OFI’s specific architectural dependencies.11 By mapping these threats to granular MITRE techniques, this report offers a predictive framework to anticipate and mitigate future incursions.

## ---

**2\. Organizational Architecture and Expanded Attack Surface**

To accurately model threats, one must first delineate the "terrain" of the target. OFI’s organizational structure, post-reorganization, presents a hybrid environment where legacy industrial assets coexist with cutting-edge cloud infrastructure. This hybridity is the primary driver of OFI’s cyber risk profile.

### **2.1 Corporate Structure and Subsidiary Interdependencies**

OFI was established to unlock shareholder value by separating the food ingredients business from Olam Agri and the Remaining Olam Group.1 While this separation clarifies business strategy, it introduces significant cybersecurity complexities typically associated with de-mergers, such as the migration of legacy assets, the potential for orphaned infrastructure, and the duplication of Active Directory (AD) forests.

The organization operates through five primary ingredient platforms, each with unique geographical and technological footprints:

* **Cocoa:** This platform operates sophisticated processing facilities in the Netherlands and Germany (specifically Koog aan de Zaan and Mannheim), as well as in Brazil, Côte d'Ivoire, Indonesia, and Singapore.14 The European facilities are notable for integrating circular biomass boilers, which use cocoa shells for power, introducing distinct Industrial Internet of Things (IIoT) vulnerabilities.  
* **Coffee:** Involves complex global sourcing and processing value chains that rely on continuous logistics data.  
* **Dairy:** OFI has invested heavily in New Zealand, developing a state-of-the-art processing facility in Tokoroa that utilizes advanced spray dryer technology.15  
* **Nuts:** This vertical includes major subsidiaries like Hughson Nut in California, a leading almond processor with large-scale industrial facilities.16  
* **Spices:** This platform includes Olde Thompson, headquartered in Oxnard, California, and facilities in Las Cruces, New Mexico. Olde Thompson is a critical node due to its "smart factory" status and extensive retail distribution network.8

Subsidiary Risk Analysis:  
The acquisition and integration of subsidiaries create a heterogeneous IT/OT environment. For instance, Olde Thompson utilizes the Plex Smart Manufacturing Platform, a cloud-native Enterprise Resource Planning (ERP) system.8 This shifts the risk profile from traditional on-premise server security to cloud credential management and API security. If an adversary were to compromise the cloud Identity Provider (IdP) associated with Plex, they could theoretically disrupt production schedules, manipulate inventory data, or exfiltrate customer lists across Olde Thompson's manufacturing lines without ever touching a physical server. Similarly, Hughson Nut’s integration of solar photovoltaic (PV) systems for energy generation introduces energy-sector IoT risks into the food processing environment.17

### **2.2 Digital Infrastructure and Industry 4.0 Adoption**

OFI’s business strategy relies heavily on digitalization to ensure traceability and sustainability, which are key market differentiators. The "AtSource" platform and the "OFI Direct" mobile application are central to this strategy, creating a digital thread that stretches from the smallholder farmer to the retail shelf.10

The technological dependencies creating the attack surface include:

* **Cloud Dependency:** The shift to platforms like Plex and the historical use of global ERPs (such as SAP, common in Olam’s history) indicates a heavy reliance on cloud availability and integrity.  
* **IoT and SCADA:** The manufacturing facilities utilize industrial automation from vendors such as Rockwell Automation (Allen-Bradley PLCs), Siemens, and Wonderware (AVEVA).18 These systems are often the target of "living off the land" attacks where adversaries use built-in system tools to manipulate processes.  
* **Mobile Ecosystem:** The OFI Direct Farmer app connects millions of smallholders to the corporate network for payments and supply chain management. This creates a massive, geographically distributed endpoint perimeter that is largely unmanaged and comprised of personal devices.21

### **2.3 The "Smart Factory" Convergence**

OFI’s manufacturing sites, such as the dairy plant in Tokoroa, New Zealand, are constructed with partners like GEA and Tetra Pak.9 These facilities utilize "Factory OS" and similar Manufacturing Execution Systems (MES) that bridge the gap between enterprise IT and plant floor OT. The integration of GEA’s Codex automation solutions or Tetra Pak’s PlantMaster introduces third-party software supply chain risks. A vulnerability in the update mechanism of these critical software suites could grant an attacker root access to the production controllers.

**Table 1: OFI Technology Stack and Associated Attack Vectors**

| Domain | Vendor/System | Function | Primary Attack Vector |
| :---- | :---- | :---- | :---- |
| **ERP / Cloud** | Plex (Rockwell Automation) | Manufacturing Execution, Inventory | Credential Stuffing, API Abuse, Cloud Misconfiguration, Phishing of Admins |
| **ICS Hardware** | Rockwell Automation (Allen-Bradley) | PLCs (Conveyors, Roasters, Grinders) | Firmware Exploitation, Logic Manipulation (Stuxnet-style), Man-in-the-Middle on CIP |
| **ICS Software** | Wonderware (AVEVA), Siemens | HMI (Human Machine Interface), SCADA | Remote Code Execution (RCE) via unpatched Windows hosts, Screen Manipulation |
| **Processing** | GEA, Tetra Pak | Dairy/Liquid Processing Automation | Supply Chain Compromise of maintenance software, Remote Service Access exploitation |
| **Mobile** | OFI Direct (Android/iOS) | Farmer Payments, Traceability | Malicious App Updates, API Key Extraction, Banking Trojans (e.g., Chameleon) |
| **Energy** | Solar PV Systems (Centrica) | Power Generation (Olde Thompson/Hughson) | IoT Botnets (Mirai variants), Manipulation of Inverters to cut power |

## ---

**3\. Enterprise IT Threat Modeling (MITRE Enterprise Matrix)**

The Enterprise IT environment serves as the nervous system of OFI, handling logistics, finance, HR, and strategic communications. It is also the primary entry point for most adversaries, who then seek to pivot laterally into more sensitive OT environments or data repositories.

### **3.1 Primary Threat Actor Profiles: The Ransomware Cartels**

Based on recent intelligence concerning the food and agriculture sector, three specific ransomware groups pose the most acute threat to OFI’s enterprise environment.

* **Akira Ransomware (G1015):**  
  * **Profile:** Akira has been explicitly identified as targeting the manufacturing and food sectors in 2024 and 2025\. They are a "double extortion" group, meaning they steal data before encrypting it to ensure payment even if backups exist.3  
  * **Tactics:** They heavily target Cisco VPNs that lack Multi-Factor Authentication (MFA) and have recently shifted focus to encrypting Linux and VMware ESXi environments. Given OFI’s likely use of virtualization for its global servers, this is a critical risk.  
* **Black Basta (G1014):**  
  * **Profile:** A highly sophisticated group often linked to the defunct Conti syndicate. They are known to target the food and beverage sector aggressively.4  
  * **Tactics:** They frequently use the Qakbot malware as a loader, delivered via email phishing campaigns. This suggests that OFI’s employee email accounts—particularly those in procurement and sales who deal with external files—are the primary perimeter.  
* **RansomHub:**  
  * **Profile:** A newer Ransomware-as-a-Service (RaaS) group that has aggressively targeted the food sector in 2024-2025, filling the void left by the LockBit crackdown.5  
  * **Tactics:** They recruit affiliates by offering high payouts (up to 90%), leading to a higher volume of attacks. They are known for exploiting vulnerabilities in network edge devices (Citrix, Fortinet) to gain initial access.

### **3.2 MITRE ATT\&CK Enterprise Scenario: The Akira Kill Chain**

We will analyze a high-probability attack scenario where **Akira** targets OFI’s enterprise network to paralyze logistics and demand a ransom.

#### **Phase 1: Initial Access**

* **T1133 \- External Remote Services:** Akira operators scan OFI’s public-facing IP space for VPN gateways. Intelligence indicates they specifically target Cisco AnyConnect instances vulnerable to CVE-2023-20269 or accounts that do not strictly enforce MFA.22 Given OFI’s global workforce, remote access infrastructure is a necessary and large attack surface.  
* **T1566.001 \- Phishing: Spearphishing Attachment:** Alternatively, affiliates may target OFI procurement officers with emails disguised as invoices from suppliers. These emails contain malicious PDFs or ZIP files that execute Qakbot or similar loaders.4

#### **Phase 2: Execution and Persistence**

* **T1059.001 \- Command and Scripting Interpreter: PowerShell:** Once inside, the adversary utilizes PowerShell to execute malicious scripts. Akira often uses PowerShell to delete Volume Shadow Copies (T1490) immediately to prevent easy recovery.  
* **T1136.001 \- Create Account: Local Account:** To maintain persistence, the attacker creates a hidden local administrator account on the compromised jump box. This allows them to re-enter the network even if the compromised user changes their password.

#### **Phase 3: Credential Access and Defense Evasion**

* **T1003.001 \- OS Credential Dumping: LSASS Memory:** The attacker runs a tool like Mimikatz or a custom variant to dump the LSASS memory process. Their goal is to harvest credentials of a "Domain Administrator" or a service account with elevated privileges.3  
* **T1562.001 \- Impair Defenses: Disable or Modify Tools:** Before deploying the encryptor, Akira operators will attempt to terminate Endpoint Detection and Response (EDR) agents (e.g., SentinelOne, CrowdStrike) using "Bring Your Own Vulnerable Driver" (BYOVD) techniques to blind the Security Operations Center (SOC).

#### **Phase 4: Discovery and Lateral Movement**

* **T1087 \- Account Discovery:** The attacker maps the Active Directory to identify high-value targets. In OFI’s case, they would specifically look for accounts associated with "Plex," "SAP," or "Finance."  
* **T1021.001 \- Remote Services: Remote Desktop Protocol (RDP):** Using the harvested administrative credentials, the attacker moves laterally from the initial patient zero (e.g., a laptop in the sales department) to the Domain Controllers and the backup servers. This lateral movement is crucial for staging the enterprise-wide encryption.

#### **Phase 5: Exfiltration and Impact**

* **T1567.002 \- Exfiltration Over Web Service: Exfiltration to Cloud Storage:** Before encryption, the attacker uses a tool like Rclone to upload terabytes of sensitive data—proprietary spice recipes from Olde Thompson, farmer PII from the OFI Direct database, and financial records—to a cloud storage service like Mega.nz. This data is the leverage for the ransom.5  
* **T1486 \- Data Encrypted for Impact:** Finally, the ransomware payload is deployed via Group Policy Object (GPO) or PsExec to all reachable servers. This encrypts the ERP databases (stopping orders) and file shares (locking intellectual property). Operations at distribution centers halt as the "pick and pack" systems go offline.

### **3.3 The Ahold Delhaize Precedent: Third-Party Risk**

The massive breach of Ahold Delhaize in late 2024 via **INC Ransom** serves as a critical warning for OFI.13 Ahold Delhaize is a likely customer or partner of OFI.

* **Risk:** If OFI’s systems are integrated with customers like Ahold Delhaize for Just-In-Time (JIT) inventory (via EDI or API), a breach at the customer can propagate upstream to OFI.  
* **T1199 \- Trusted Relationship:** Attackers exploit the trust between OFI and its partners. If OFI uses a shared portal for invoicing or logistics with Ahold, compromised credentials from the Ahold breach could be used to gain valid access to OFI’s internal systems.

## ---

**4\. Industrial Control Systems (ICS) Threat Modeling (MITRE ICS Matrix)**

The most critical operational risk for OFI lies in its industrial control systems. A disruption here halts physical production, causes the spoilage of perishable goods (dairy, cocoa), and results in immediate financial loss and reputational damage.

### **4.1 ICS Asset Identification and Vulnerability Landscape**

Research indicates a diverse ICS landscape across OFI’s global footprint, shaped by regional preferences and acquisitions.

* **Rockwell Automation (Allen-Bradley):** This architecture is predominant in OFI’s U.S. operations, including Olde Thompson and Hughson Nut. Documents regarding water usage in relevant municipalities often reference "Allen-Bradley Micrologix" and "LC3000 PLCs," suggesting these are the standard for local infrastructure connected to OFI’s plants.19  
* **Siemens (Simatic S7):** This is the standard for European heavy industry and is likely the core of the cocoa processing facilities in Germany and the Netherlands.14  
* **Wonderware (AVEVA):** Often used as the HMI/SCADA layer sitting on top of the PLCs. Vulnerabilities in Wonderware InTouch are frequent targets for ransomware groups seeking to bridge the IT/OT gap.20  
* **GEA & Tetra Pak:** The Tokoroa dairy plant utilizes specialized automation from these vendors.9 These systems often use proprietary protocols for process control, wrapped in standard Ethernet for monitoring.

### **4.2 MITRE ATT\&CK for ICS: The Volt Typhoon Scenario**

State-sponsored actors like **Volt Typhoon** (PRC) represent a different category of threat: strategic pre-positioning. Unlike ransomware groups that seek immediate payout, Volt Typhoon seeks to infiltrate critical infrastructure (including food and agriculture) to maintain long-term access for potential disruption during a geopolitical conflict.6

**Scenario:** **Pre-Positioning in Dairy Processing Infrastructure**

#### **Phase 1: Initial Access (ICS)**

* **T0886 \- Remote Services:** Volt Typhoon is known for compromising SOHO routers and edge devices (e.g., Fortinet, Cisco) to mask their origin. They might target a smaller, less secure OFI distribution center or a third-party maintenance vendor (e.g., an HVAC contractor) to gain access to the corporate network.  
* **T0819 \- Exploit Public-Facing Application:** If OFI has exposed any HMI web servers to the internet for remote monitoring (a common "Industry 4.0" misconfiguration), Volt Typhoon will exploit vulnerabilities in these web services to gain a foothold directly in the OT DMZ.

#### **Phase 2: Execution and Discovery**

* **T0861 \- Scripting:** Once inside the network, Volt Typhoon heavily utilizes "Living off the Land" (LOTL) techniques. They use built-in Windows tools like netsh, wmic, and PowerShell to explore the network without dropping malware files that might trigger antivirus alerts.27  
* **T0801 \- Monitor Process State:** The adversary passively listens to the network traffic (using tools like Wireshark installed on a compromised engineering workstation) to understand the "normal" operations of the dairy spray dryers. They identify the specific Modbus or EtherNet/IP commands used to control temperature and pressure.

#### **Phase 3: Lateral Movement to OT**

* **T0843 \- Program Download:** Adversaries target the Engineering Workstation (running Rockwell Studio 5000 or Siemens TIA Portal). These workstations are the "keys to the kingdom" as they are the only devices authorized to reprogram the PLCs.  
* **T0855 \- Unauthorized Command Message:** If network segmentation is poor—a common finding in the food and beverage sector—attackers can send command messages directly to the PLCs from the compromised IT network.

#### **Phase 4: Impact (Disruption and Destruction)**

* **T0836 \- Modify Parameter:** In a conflict scenario, the attacker subtly alters the "set point" for the pasteurization process. In the dairy industry, temperature precision is vital for food safety. If the temperature is lowered by 2 degrees, the milk may not be safe, but the HMI is manipulated to show "Normal." This leads to the production of tainted product, massive recalls, and reputational ruin.  
* **T0831 \- Manipulation of Control:** A more destructive attack involves sending a "Stop" command to cooling systems while keeping heating systems active (e.g., in cocoa roasters or nut dryers). This can cause physical damage to the equipment (fire risk) and long-term facility downtime.

### **4.3 Specific Vulnerabilities in OFI’s ICS Stack**

The integration of **biomass boilers** in OFI’s cocoa factories 14 introduces a specific IIoT vector. These systems require precise control loops to manage steam pressure and fuel feed. If these controllers are networked for remote monitoring, they become a unique entry point for attackers looking to cause physical effects.

Similarly, the **Olde Thompson Solar PV system** 28 represents a converged IT/OT asset. Solar inverters are increasingly targeted by botnets (like Mirai variants). Compromising the energy management system could allow an attacker to cut power to the facility, bypassing traditional grid redundancies and halting production lines.

## ---

**5\. Mobile and Agricultural FinTech Threat Modeling (MITRE Mobile Matrix)**

OFI’s "OFI Direct" and "OFI Direct Farmer" applications represent a new frontier in agricultural cybersecurity. These apps handle financial transactions (payments to farmers) and sensitive supply chain data, connecting millions of unmanaged devices to OFI's core.

### **5.1 Mobile Asset Analysis**

* **Application:** OFI Direct / OFI Direct Farmer.21  
* **Platform:** Primarily Android (due to market share in developing regions like Indonesia, Africa, and South America), and iOS.  
* **Developer:** MINDSPRINT (OFI’s digital technology arm).  
* **Function:** Farmer payments, supply chain traceability, agronomy advice.

### **5.2 Detailed Attack Path Analysis (Mobile)**

**Threat Scenario:** **Supply Chain Financial Fraud via Malicious Update**

* **Threat Actor:** Financially motivated cybercriminals using banking trojans (e.g., "Chameleon" or "GodFather") or state-sponsored actors like Lazarus Group seeking illicit funds.7

#### **Phase 1: Initial Access**

* **T1474.003 \- Supply Chain Compromise: Software Supply Chain:**  
  * *Mechanism:* Attackers compromise the CI/CD pipeline of MINDSPRINT or the Google Play Store developer account used to publish the app. They inject malicious code into a legitimate update of "OFI Direct." Supply chain attacks have surged in 2025, making this a high-probability vector.31  
  * *Impact:* The malicious update is pushed to over 550,000 farmers automatically.

#### **Phase 2: Credential Access**

* **T1412 \- Capture SMS Messages:**  
  * *Mechanism:* The malicious app update requests the READ\_SMS permission (or abuses Android Accessibility Services \- T1453). Since the app is used for payments, it likely uses SMS-based One-Time Passwords (OTP) for Two-Factor Authentication (2FA). The malware intercepts these OTPs before the user sees them.  
  * *Context:* Banking trojans like Chameleon explicitly target this mechanism to bypass biometric authentication on Android devices.

#### **Phase 3: Collection and Network Effects**

* **T1409 \- Access Stored Application Data:**  
  * *Mechanism:* The malware scrapes local data from the app’s sandbox to find transaction history, farmer IDs, and wallet balances.  
* **T1437 \- Application Layer Protocol:**  
  * *Mechanism:* The compromised phones act as a botnet. They can send thousands of fraudulent payment requests to OFI’s API servers. If the API endpoints lack proper rate limiting 33, this could overwhelm the system (DDoS) or drain accounts through micro-transactions.

### **5.3 API Security and Data Leakage**

The mobile apps communicate with OFI’s backend servers via APIs.

* **Vulnerability:** Broken Object Level Authorization (BOLA). If the API endpoints do not correctly validate that the user requesting data is the owner of that data, an attacker could iterate through Farmer IDs and harvest PII (Personally Identifiable Information), geolocation data, and financial records for the entire user base. This data is highly valuable for competitors or for targeted phishing campaigns.

## ---

**6\. Threat Actor Profiling: Criminal vs. State-Sponsored**

OFI’s global nature exposes it to a diverse spectrum of threat actors. The analysis suggests a bifurcation of threats: Criminal Extortion aiming for quick profit, and State-Sponsored actors aiming for strategic disruption or long-term funding.

### **6.1 Criminal Groups: The Ransomware Cartels**

* **Akira:** This group is currently the most significant criminal threat to the manufacturing sector. Their shift to targeting ESXi virtual machines aims to cripple the backend infrastructure of companies like OFI. Their use of legitimate credentials (T1078) makes them hard to detect.22  
* **Black Basta:** Known for the sheer speed of their attacks. They often move from initial access (via Qakbot) to domain-wide encryption in under 48 hours. Their targeting of the food and beverage sector suggests they understand the industry's low tolerance for latency and spoilage.4  
* **RansomHub:** As a newer entrant, they are aggressive and unpredictable. Their business model relies on a vast network of affiliates, meaning the skill level of the attacker can vary wildly—from "script kiddies" using purchased credentials to sophisticated hackers deploying zero-day exploits.5

### **6.2 State-Sponsored Actors: Strategic Pre-Positioning**

Given the critical nature of food security, OFI is a strategic target for state actors.

* **Volt Typhoon (China):**  
  * *Strategic Goal:* Disruption of critical infrastructure during a conflict.  
  * *Relevance to OFI:* OFI’s U.S. subsidiaries (Olde Thompson, Hughson Nut) are deeply embedded in the U.S. food supply chain. Volt Typhoon’s "Living off the Land" techniques allow them to remain undetected in OT networks for years, waiting for a trigger event to disrupt operations.6  
  * *Primary Target:* Operational Technology (OT) systems and SCADA networks controlling food processing.  
* **Lazarus Group (North Korea):**  
  * *Strategic Goal:* Financial theft to fund the DPRK regime.  
  * *Relevance to OFI:* Lazarus targets banks, cryptocurrency exchanges, and fintech platforms. With OFI entering the fintech space via "OFI Direct" payments to farmers, the central treasury and payment gateways of OFI are prime targets.  
  * *Primary Tactic:* Spear-phishing using job recruitment lures (T1566.002) sent to OFI’s finance or IT administrators via LinkedIn or email.7

## ---

**7\. Strategic Mitigation and Defense Recommendations**

Based on the forensic MITRE threat model, OFI must implement a "Defense-in-Depth" strategy that prioritizes the protection of high-value assets and the segregation of critical networks.

### **7.1 ICS/OT Security Hardening**

1. **Strict Network Segmentation (Purdue Model Implementation):** Implement a rigid Industrial Demilitarized Zone (IDMZ) between the Enterprise IT network (Level 4\) and the Plant OT network (Level 3/2). OFI must ensure that a compromise in the Plex ERP system (Cloud/IT) cannot directly communicate with the Allen-Bradley PLCs on the manufacturing floor. All traffic between these zones must be proxied and inspected.  
2. **Passive OT Monitoring:** Deploy OT-specific network monitoring solutions (e.g., Dragos, Nozomi, or Claroty) in major plants like Tokoroa and Koog aan de Zaan. These tools can detect the specific industrial protocols (CIP, S7, Modbus) and alert on anomalies, such as a "Stop" command sent to a boiler at 2 AM or a firmware update initiated from an unauthorized IP address.  
3. **Secure Remote Access:** Eliminate direct RDP access to engineering workstations. Implement a Secure Remote Access (SRA) solution that requires MFA and provides a recorded session for any vendor (e.g., GEA technicians) accessing the plant network.

### **7.2 Enterprise and Cloud Defense**

1. **Phishing-Resistant MFA:** Deploy FIDO2/WebAuthn hardware tokens (e.g., YubiKeys) for all administrators, especially those with access to the Plex ERP, SAP, and financial systems. This neutralizes the adversary-in-the-middle (AiTM) phishing tactics used by groups like Lazarus and Black Basta.  
2. **Ransomware Simulation and Immutable Backups:** Conduct regular "Purple Team" exercises simulating an Akira ransomware attack. Verify that backup systems are immutable (cannot be deleted or encrypted by the attacker) and air-gapped (offline), ensuring recovery is possible without paying a ransom.  
3. **Vulnerability Management of Edge Devices:** Prioritize the patching of edge devices (VPNs, Firewalls). The window between a Common Vulnerabilities and Exposures (CVE) disclosure and exploitation by groups like RansomHub has narrowed to days.

### **7.3 Mobile and Supply Chain Security**

1. **App Vetting and SBOM:** Implement a rigorous Software Bill of Materials (SBOM) analysis for the "OFI Direct" app. Automatically scan for vulnerable third-party libraries and hardcoded API keys before every release.  
2. **API Hardening:** Implement OAuth 2.0 and strict rate limiting on all APIs serving the mobile applications to prevent mass data harvesting. Use "Certificate Pinning" to prevent Man-in-the-Middle attacks on the communication between the app and the server.  
3. **Farmer Awareness:** While challenging, providing basic cyber hygiene education (e.g., "OFI will never ask for your OTP") directly within the app interface can reduce the success rate of social engineering attacks targeting the user base.

## **8\. Conclusion**

Olam Food Ingredients (OFI) operates a highly sophisticated, global supply chain that is essential to the world's food security. However, its architectural complexity—spanning legacy industrial control systems, modern cloud ERPs, and distributed mobile fintech applications—creates a fragmented and vast attack surface.

The threat modeling indicates that OFI is facing a critical convergence of risks. Financially motivated ransomware groups like Akira and RansomHub view the food sector as a high-probability target for extortion due to the industry's inability to tolerate downtime. Simultaneously, state-sponsored actors like Volt Typhoon view OFI’s infrastructure as strategic terrain for geopolitical leverage.

To secure its future, OFI must move beyond traditional perimeter defenses. It must adopt a proactive, threat-informed defense strategy that anticipates the specific techniques of these actors. By treating the IT/OT boundary as a critical defensive line, hardening the software supply chain of its digital platforms, and ensuring total visibility into its industrial assets, OFI can build the resilience necessary to withstand the inevitability of future cyber incursions.

# ---

**Appendix: MITRE ATT\&CK Mapping Tables**

### **Table A1: Enterprise IT \- Ransomware (Akira/Black Basta)**

| Tactic | Technique ID | Technique Name | Context & Mitigation |
| :---- | :---- | :---- | :---- |
| **Initial Access** | **T1566** | Phishing | **Context:** Black Basta uses Qakbot via email. **Mitigation:** User Training, Email Sandboxing, DMARC/SPF/DKIM. |
| **Initial Access** | **T1133** | External Remote Services | **Context:** Akira targets Cisco VPNs without MFA. **Mitigation:** FIDO2 MFA, VPN Patching, Geo-blocking. |
| **Execution** | **T1059** | Command & Scripting Interpreter | **Context:** PowerShell used for lateral movement. **Mitigation:** PowerShell Constrained Language Mode, EDR. |
| **Credential Access** | **T1003** | OS Credential Dumping | **Context:** Mimikatz used to dump LSASS. **Mitigation:** Credential Guard, LSASS Protection enabled. |
| **Impact** | **T1490** | Inhibit System Recovery | **Context:** Deletion of Shadow Copies. **Mitigation:** Immutable Backups, Offline Tape/Cloud Storage. |

### **Table A2: ICS/OT \- Disruption (Volt Typhoon)**

| Tactic | Technique ID | Technique Name | Context & Mitigation |
| :---- | :---- | :---- | :---- |
| **Initial Access** | **T0886** | Remote Services | **Context:** Compromising vendor support links. **Mitigation:** Disable RDP, Use Secure Remote Access Broker. |
| **Initial Access** | **T0819** | Exploit Public-Facing App | **Context:** Exposed HMI web interfaces. **Mitigation:** Remove HMIs from Internet, Web Application Firewall. |
| **Impair Process Control** | **T0855** | Unauthorized Command Message | **Context:** Sending commands to PLCs. **Mitigation:** Deep Packet Inspection (DPI) Firewalls for OT Protocols. |
| **Impact** | **T0836** | Modify Parameter | **Context:** Changing temperature set points. **Mitigation:** Change Management, Integrity Checks on Set Points. |

### **Table A3: Mobile \- Supply Chain (Financial Fraud)**

| Tactic | Technique ID | Technique Name | Context & Mitigation |
| :---- | :---- | :---- | :---- |
| **Initial Access** | **T1474** | Supply Chain Compromise | **Context:** Malicious code in app updates. **Mitigation:** Code Signing, SBOM, App Store Monitoring. |
| **Credential Access** | **T1412** | Capture SMS Messages | **Context:** Intercepting OTPs for payments. **Mitigation:** Move from SMS OTP to App-Based Authenticator. |
| **Command & Control** | **T1437** | Application Layer Protocol | **Context:** Botnet traffic to APIs. **Mitigation:** API Rate Limiting, Certificate Pinning. |

#### **Works cited**

1. Our Re-organisation \- Olam Group, accessed December 31, 2025, [https://www.olamgroup.com/investors/our-re-organisation.html](https://www.olamgroup.com/investors/our-re-organisation.html)  
2. Global Food and Beverage Ingredient and Solutions Supplier \- ofi, accessed December 31, 2025, [https://www.ofi.com/en-us/about](https://www.ofi.com/en-us/about)  
3. \#StopRansomware: Akira Ransomware \- Internet Crime Complaint Center (IC3), accessed December 31, 2025, [https://www.ic3.gov/CSA/2025/251113.pdf](https://www.ic3.gov/CSA/2025/251113.pdf)  
4. Black Basta Ransomware \- Everything You Need to Know \- Tata Communications, accessed December 31, 2025, [https://www.tatacommunications.com/knowledge-base/mdr/black-basta-ransomware-guide](https://www.tatacommunications.com/knowledge-base/mdr/black-basta-ransomware-guide)  
5. RansomHub Ransomware: TTPs, News, & Insights for 2025 \- BitSight Technologies, accessed December 31, 2025, [https://www.bitsight.com/blog/guide-to-ransomhub-ransomware-2025](https://www.bitsight.com/blog/guide-to-ransomhub-ransomware-2025)  
6. China's ambitions "to hold at risk US and allied critical infrastructure, shape US decision-making in a time of crisis, and use cyber capabilities to augment PRC geopolitical objectives." \- Congress.gov, accessed December 31, 2025, [https://www.congress.gov/crs\_external\_products/IF/HTML/IF12798.web.html](https://www.congress.gov/crs_external_products/IF/HTML/IF12798.web.html)  
7. Lazarus Group \- Wikipedia, accessed December 31, 2025, [https://en.wikipedia.org/wiki/Lazarus\_Group](https://en.wikipedia.org/wiki/Lazarus_Group)  
8. Olde Thompson | Rockwell Automation | Plex | US, accessed December 31, 2025, [https://plex.rockwellautomation.com/en-us/olde-thompson.html](https://plex.rockwellautomation.com/en-us/olde-thompson.html)  
9. CONTRACTOR NAMED FOR HIGH-TECH DAIRY PLANT \- NZ Food Technology News, accessed December 31, 2025, [https://www.foodtechnology.co.nz/content/contractor-named-for-high-tech-dairy-plant/](https://www.foodtechnology.co.nz/content/contractor-named-for-high-tech-dairy-plant/)  
10. ofi Direct, accessed December 31, 2025, [https://www.ofi.com/en-us/sustainability/ofi-direct](https://www.ofi.com/en-us/sustainability/ofi-direct)  
11. Dole's Cybersecurity Update | Dole, accessed December 31, 2025, [https://www.dole.com/press/2023/dole-experiences-cybersecurity-incident](https://www.dole.com/press/2023/dole-experiences-cybersecurity-incident)  
12. Cybersecurity for Food Manufacturing in 2025: Protecting Modern Production Operations, accessed December 31, 2025, [https://www.elisity.com/blog/cybersecurity-for-food-manufacturing-in-2025-protecting-modern-production-operations](https://www.elisity.com/blog/cybersecurity-for-food-manufacturing-in-2025-protecting-modern-production-operations)  
13. The Ahold Delhaize USA Breach: How a Single Click Can Cost Millions, accessed December 31, 2025, [https://www.cyberdefensemagazine.com/the-ahold-delhaize-usa-breach-how-a-single-click-can-cost-millions/](https://www.cyberdefensemagazine.com/the-ahold-delhaize-usa-breach-how-a-single-click-can-cost-millions/)  
14. Olam food ingredients turn cocoa shells into factory power \- ofi, accessed December 31, 2025, [https://www.ofi.com/en-us/news-and-events/press-release/olam-food-ingredients-turns-cocoa-shells-into-power-to-fuel-factory](https://www.ofi.com/en-us/news-and-events/press-release/olam-food-ingredients-turns-cocoa-shells-into-power-to-fuel-factory)  
15. Olam Food Ingredients (OFI) details plans for commissioning of New Zealand dairy processing plant, accessed December 31, 2025, [https://www.olamgroup.com/news/all-news/press-release/olam-food-ingredients-details-plans-for-commissioning-of-new-zealand-dairy-processing-plant.html](https://www.olamgroup.com/news/all-news/press-release/olam-food-ingredients-details-plans-for-commissioning-of-new-zealand-dairy-processing-plant.html)  
16. Locations \- OFI, accessed December 31, 2025, [https://www.oficareers.com/pages/locations](https://www.oficareers.com/pages/locations)  
17. Hughson Nut Cracks Open Brand-New 586 Kilowatt Solar System With Cenergy Power, accessed December 31, 2025, [https://www.prnewswire.com/news-releases/hughson-nut-cracks-open-brand-new-586-kilowatt-solar-system-with-cenergy-power-146437085.html](https://www.prnewswire.com/news-releases/hughson-nut-cracks-open-brand-new-586-kilowatt-solar-system-with-cenergy-power-146437085.html)  
18. WATER ISSUES COMMITTEE MEETING WITH BOARD OF DIRECTORS \* ORANGE COUNTY WATER DISTRICT Wednesday, October 8, 2025 12:00 pm, Boardroom, accessed December 31, 2025, [https://www.ocwd.com/wp-content/uploads/WIC\_20251008-1.pdf](https://www.ocwd.com/wp-content/uploads/WIC_20251008-1.pdf)  
19. AES2 Statement of Qualifications Water System SCADA Upgrades \- IIS Windows Server, accessed December 31, 2025, [https://time.ci.kalispell.mt.us/WebLink/DocView.aspx?id=130671\&dbid=0\&repo=Kalispell](https://time.ci.kalispell.mt.us/WebLink/DocView.aspx?id=130671&dbid=0&repo=Kalispell)  
20. 2015 Facility Plan \- San Elijo Joint Powers Authority, accessed December 31, 2025, [https://www.sejpa.org/images/pdf/San%20Elijo%20Facility%20Plan.pdf](https://www.sejpa.org/images/pdf/San%20Elijo%20Facility%20Plan.pdf)  
21. ofi Direct Farmer \- Apps on Google Play, accessed December 31, 2025, [https://play.google.com/store/apps/details?id=com.olam.fsp.farmer](https://play.google.com/store/apps/details?id=com.olam.fsp.farmer)  
22. Akira Ransomware's Shift to Target Critical Infrastructure and Linux \- ExtraHop, accessed December 31, 2025, [https://www.extrahop.com/blog/akira-ransomware-s-shift-to-target-critical-infrastructure-and-linux](https://www.extrahop.com/blog/akira-ransomware-s-shift-to-target-critical-infrastructure-and-linux)  
23. From Farm to Fallout: Ransomware's Impact on the Food Chain \- TXOne Networks, accessed December 31, 2025, [https://www.txone.com/blog/from-farm-to-fallout-ransomwares-impact-on-the-food-chain/](https://www.txone.com/blog/from-farm-to-fallout-ransomwares-impact-on-the-food-chain/)  
24. Food Retail Giant's Breach: 2.2 Million Employees Affected \- BankInfoSecurity, accessed December 31, 2025, [https://www.bankinfosecurity.com/food-retail-giants-breach-22-million-employees-affected-a-28842](https://www.bankinfosecurity.com/food-retail-giants-breach-22-million-employees-affected-a-28842)  
25. GEA dairy processing industry, accessed December 31, 2025, [https://www.gea.com/en/dairy-processing/](https://www.gea.com/en/dairy-processing/)  
26. The Latent Storm: Volt Typhoon and Supply Chain Vulnerabilities | TXOne Networks, accessed December 31, 2025, [https://www.txone.com/blog/volt-typhoon-and-supply-chain-vulnerabilities/](https://www.txone.com/blog/volt-typhoon-and-supply-chain-vulnerabilities/)  
27. PRC State-Sponsored Actors Compromise and Maintain Persistent Access to U.S. Critical Infrastructure | CISA, accessed December 31, 2025, [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a)  
28. Olde Thompson saves $100k a year with solar power \- Centrica Business Solutions, accessed December 31, 2025, [https://www.centricabusinesssolutions.com/us/case-study/olde-thompson-saves-100k-year-solar-power](https://www.centricabusinesssolutions.com/us/case-study/olde-thompson-saves-100k-year-solar-power)  
29. ofi Direct Dairy Farmer \- App Store \- Apple, accessed December 31, 2025, [https://apps.apple.com/nz/app/ofi-direct-dairy-farmer/id1660449467](https://apps.apple.com/nz/app/ofi-direct-dairy-farmer/id1660449467)  
30. Phishing, Technique T1660 \- Mobile | MITRE ATT\&CK®, accessed December 31, 2025, [https://attack.mitre.org/techniques/T1660/](https://attack.mitre.org/techniques/T1660/)  
31. 12 Months That Changed Supply Chain Security \- Silobreaker, accessed December 31, 2025, [https://www.silobreaker.com/blog/cyber-threats/supply-chain-attacks-in-2025-a-month-by-month-summary/](https://www.silobreaker.com/blog/cyber-threats/supply-chain-attacks-in-2025-a-month-by-month-summary/)  
32. Supply Chain Attacks Surge in 2025: Double the Usual Rate \- Cyble, accessed December 31, 2025, [https://cyble.com/blog/supply-chain-attacks-double-in-2025/](https://cyble.com/blog/supply-chain-attacks-double-in-2025/)  
33. Fintech cybersecurity: Application security risks and challenges you need to know, accessed December 31, 2025, [https://onsecurity.io/article/fintech-cybersecurity-application-security-risks-and-challenges-you-need-to-know/](https://onsecurity.io/article/fintech-cybersecurity-application-security-risks-and-challenges-you-need-to-know/)  
34. Lazarus Group: A criminal syndicate with a flag | Barracuda Networks Blog, accessed December 31, 2025, [https://blog.barracuda.com/2025/09/23/lazarus-group--a-criminal-syndicate-with-a-flag](https://blog.barracuda.com/2025/09/23/lazarus-group--a-criminal-syndicate-with-a-flag)