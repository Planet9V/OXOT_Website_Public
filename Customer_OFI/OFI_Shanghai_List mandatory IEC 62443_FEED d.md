<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# List mandatory IEC 62443 clauses to cite in FEED documents

For FEED, you don’t need to quote every line of IEC 62443; you anchor the design to the key parts and concepts that drive architecture, vendor specs, and testing.

Below is a concise list of **“must‑cite” IEC 62443 parts/clauses** that should appear in Shanghai CSC FEED documents.

***

## Core standards to reference

Include these as normative references in the FEED “codes and standards” section:

- **IEC 62443‑1‑1 / ISA‑62443‑1‑1** – Concepts, models, terminology
    - Use to justify: zones \& conduits model, security levels, foundational requirements (FRs).[^1][^2]
- **IEC 62443‑3‑2** – Risk assessment \& system partitioning
    - FEED language:
        - Define the *System under Consideration (SuC)*.
        - Partition SuC into **zones and conduits** and assign **Security Level Targets (SL‑T)** based on risk assessment.[^3][^2][^4]
- **IEC 62443‑3‑3** – System security requirements \& security levels
    - FEED language:
        - The CSC IACS **shall meet IEC 62443‑3‑3 system requirements (SRs) aligned to SL‑T for each zone**.
        - Reference the **7 Foundational Requirements (FR1–FR7)** as the baseline control set: Identification \& Authentication, Use Control, System Integrity, Data Confidentiality, Restricted Data Flow, Timely Response to Events, Resource Availability.[^5][^6][^3][^1]
- **IEC 62443‑4‑1** – Secure development lifecycle (for vendors)
    - FEED language (in RFQs/specs for OEMs, integrators):
        - Suppliers of automation and control components **shall have a secure product development lifecycle compliant with IEC 62443‑4‑1** (requirements covering requirements management, design, implementation, verification/validation, patch and vulnerability management, and product end‑of‑life).[^6][^7][^8]
- **IEC 62443‑4‑2** – Component technical security requirements
    - FEED language:
        - PLCs, HMIs, network and host devices **shall be capable of meeting IEC 62443‑4‑2 Component Requirements (CRs)** at the SL required for their zone (e.g., SL 2 or SL 3).
        - Vendors must declare supported **Security Level‑Capability (SL‑C)** per device.[^9][^10][^8][^3]

***

## Mandatory design concepts to call out

These aren’t “clauses” by number, but concepts FEED must treat as requirements:

### 1. Zones and conduits (3‑2 / 3‑3)

- FEED shall deliver:
    - A **zones and conduits diagram** for Shanghai CSC OT/IT, aligned with IEC 62443‑3‑2.[^2][^4][^3][^6]
    - Assigned **SL‑T per zone** with rationale in the Cybersecurity Requirements Specification (CSRS).[^11][^3]


### 2. Security levels (SL‑T, SL‑C, SL‑A)

- FEED shall:
    - Define **SL‑T** for each zone/conduit (e.g., SL 2 for labs, SL 3 for safety‑critical/demo lines).[^11][^9][^1]
    - Require components with appropriate **SL‑C** (per 3‑3 / 4‑2) and design to achieve **SL‑A** (achieved level).[^9][^11]


### 3. Foundational Requirements (FR1–FR7) mapped to SRs

In the system requirements section of FEED, explicitly state that the design must implement IEC 62443‑3‑3 SRs aligned to these FRs:[^3][^1][^5][^6]

- **FR1 – Identification \& Authentication Control (IAC/AC)**
- **FR2 – Use Control (UC)**
- **FR3 – System Integrity (SI)**
- **FR4 – Data Confidentiality (DC)**
- **FR5 – Restricted Data Flow (RDF)**
- **FR6 – Timely Response to Events (TRE)**
- **FR7 – Resource Availability (RA)**

***

## Concrete wording you can paste into FEED

You can adapt the following boilerplate into the “Cybersecurity” section of the Shanghai CSC FEED:

- “The Industrial Automation and Control System (IACS) for the Shanghai Customer Solutions Center shall be designed and implemented in accordance with **IEC 62443 series**, specifically **IEC 62443‑1‑1, 62443‑3‑2, 62443‑3‑3, 62443‑4‑1, and 62443‑4‑2**.”[^1][^6][^3]
- “The FEED contractor shall define the **System under Consideration (SuC)** and perform a cyber risk assessment in line with **IEC 62443‑3‑2**, partitioning the SuC into security **zones and conduits** and assigning **Security Level Targets (SL‑T)** for each.”[^4][^2][^3]
- “System design shall meet the **System Requirements (SRs)** and relevant Requirement Enhancements of **IEC 62443‑3‑3** to satisfy the seven **Foundational Requirements (FR1–FR7)** at the agreed SL‑T for each zone.”[^5][^6][^3][^1]
- “All control system **components** (PLCs, HMIs, embedded devices, host devices, network devices, security appliances) shall comply with **IEC 62443‑4‑2** at the required **Security Level‑Capability (SL‑C)**, and suppliers shall provide declarations of compliance and mapping of their products to the relevant Component Requirements (CRs).”[^10][^8][^9][^3]
- “All automation and security vendors shall demonstrate a **secure development lifecycle** conformant with **IEC 62443‑4‑1**, including documented processes for vulnerability handling, patch management, and end‑of‑life.”[^7][^8][^6]

If you want, the next step can be a **Markdown table** that you can drop directly into the FEED template, mapping each cited IEC 62443 part to: “Design responsibility,” “Evidence required,” and “Applies to (system vs component vs vendor).”
<span style="display:none">[^12][^13][^14][^15][^16][^17][^18][^19]</span>

<div align="center">⁂</div>

[^1]: https://www.fortinet.com/resources/cyberglossary/iec-62443

[^2]: https://www.securitycompass.com/blog/everything-you-need-to-know-about-iec-62443/

[^3]: https://industrialcyber.co/features/the-essential-guide-to-the-iec-62443-industrial-cybersecurity-standards/

[^4]: https://securityboulevard.com/2024/04/complete-guide-to-isa-iec-62443-3-2-risk-assessments-for-industrial-automation-and-control-systems/

[^5]: https://www.spe-aberdeen.org/wp-content/uploads/2019/11/0930_3_Foundational-Reqmts-IEC62443-Emerson.pdf

[^6]: https://www.cisco.com/c/en/us/products/collateral/security/isaiec-62443-3-3-wp.html

[^7]: https://kontron-ais.com/en/resources/blog/cybersecurity-standards

[^8]: https://cybellum.com/resources-files/Complying_with_IEC62443_Cybellum_Web.pdf

[^9]: https://www.exida.com/blog/iec-62443-levels-levels-and-more-levels

[^10]: https://www.keyfactor.com/blog/iec-62443-4-2-technical-security-requirements-for-iacs-components/

[^11]: https://www.dragos.com/blog/isa-iec-62443-concepts

[^12]: https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards

[^13]: https://isasecure.org/hubfs/Webinars/Webinars PDFs/2019-August-8-Webinar.pdf?hsLang=en

[^14]: https://www.rockwellautomation.com/en-us/company/news/blogs/iec-62443-security-guide.html

[^15]: https://www.upguard.com/blog/isa-62443-3-3-2013

[^16]: https://www.dragos.com/blog/isa-iec-62443-overview

[^17]: https://waterfall-security.com/ot-insights-center/ot-cybersecurity-insights-center/the-essential-guide-to-isa-iec-62443/

[^18]: https://www.nozominetworks.com/blog/isa-iec-62443-explained-best-practices-for-iacs-security

[^19]: https://www.parasoft.com/learning-center/automate-isa-iec-62443-compliance/

