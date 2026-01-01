<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# How to state SL TM and SL C targets in FEED

In FEED, SL‑T and SL‑C should be stated **formally and unambiguously** so engineers, suppliers, and OT security all know the targets and what must be delivered. Use simple, repeatable wording tied to IEC 62443 terms.

***

## 1. Concepts to reflect in FEED

- **SL‑T (Target Security Level):**
The **risk‑based security goal** for each zone/conduit in the system, defined by the asset owner using IEC 62443‑3‑2 and expressed on the SL 0–4 scale.[^1][^2][^3]
- **SL‑C (Capability Security Level):**
The maximum security level each **system or component can natively support**, based on IEC 62443‑3‑3 (system SRs) and 62443‑4‑2 (component CRs).[^4][^5][^1]
- Relationship you want FEED to enforce:
**SL‑C ≥ SL‑T**, and at commissioning **SL‑A ≥ SL‑T** for each zone/conduit.[^6][^7][^4]

***

## 2. Template wording for SL‑T in FEED

Use this structure in the **Cybersecurity Requirements / Architecture** section:

> “Security Levels shall be defined in accordance with **IEC 62443‑3‑2 and IEC 62443‑3‑3**. For each security zone and conduit in the Shanghai CSC System under Consideration (SuC), a **Target Security Level (SL‑T)** on the 0–4 scale shall be assigned based on the cyber risk assessment.”

Then define per‑zone targets in a table, for example:


| Zone / Conduit | Description | SL‑T | Rationale |
| :-- | :-- | :-- | :-- |
| Z1 – Demo / Pilot Line OT | Customer‑facing demo line PLCs, HMIs, safety I/O | **SL‑T = 3** | Must withstand deliberate, skilled attacks with moderate resources. [^2][^8] |
| Z2 – Lab / Application Dev | Non‑production test rigs, dev systems | **SL‑T = 2** | Protection against intentional misuse with basic tools. [^2][^3] |
| Z3 – OT–IT DMZ | Historians, integration servers, jump hosts | **SL‑T = 2** | Conduit between corporate IT and OT zones. [^3][^9] |
| Z4 – Building Automation | HVAC, lighting, non‑critical BMS | **SL‑T = 1** | Protection against casual misuse. [^2] |

Boilerplate sentence to include under the table:

> “The **Cybersecurity Requirements Specification (CSRS)** shall record SL‑T values and justifications for all zones and conduits as required by IEC 62443‑3‑2.”[^3][^10]

***

## 3. Template wording for SL‑C in FEED

In the **Vendor / Package Requirements** section, specify SL‑C like this:

> “All IACS components (PLCs, RTUs, HMIs, embedded devices, host systems, networking and security devices) supplied for the Shanghai CSC shall demonstrate **Capability Security Levels (SL‑C)** in accordance with **IEC 62443‑3‑3 and IEC 62443‑4‑2**. For each zone, component SL‑C **shall be equal to or greater than the SL‑T** defined for that zone.”[^5][^11][^1][^4]

Then specify what information vendors must provide:

- “Each vendor **shall provide an SL‑C declaration** for their product, including:
    - Mapping of the product’s security functions to relevant **System Requirements (SR)** or **Component Requirements (CR)** and Requirement Enhancements (RE) from IEC 62443‑3‑3 / 62443‑4‑2.[^12][^1]
    - The maximum SL‑C (0–4) for each FR category (FR1–FR7).[^12][^5]
    - Any **compensating countermeasures** needed if SL‑C < SL‑T for a given FR, so the integrator can design to meet SL‑T. ”[^13][^1][^6]

You can also add a simple compliance rule:

> “For all zones in the CSC SuC, **SL‑C (component) ≥ SL‑T (zone)** shall be used as the minimum selection criterion. Where this is not feasible, the FEED shall identify and cost **compensating controls** needed to achieve SL‑T.”[^7][^6][^4]

***

## 4. Short, “copy‑paste” examples

Use these exact sentences in FEED:

- **Global statement:**
    - “Security Levels shall follow IEC 62443 conventions: **SL‑T** (Target) set by risk assessment, **SL‑C** (Capability) declared by suppliers, and **SL‑A** (Achieved) verified during acceptance testing. The design intent is to achieve **SL‑A ≥ SL‑T** for all zones, using components with **SL‑C ≥ SL‑T**.”[^8][^1][^6]
- **Per‑zone requirement:**
    - “Zone Z1 – Demo / Pilot OT shall achieve **SL‑T = 3** for FR1–FR7. All PLCs, HMIs, and network devices within Z1 shall have **SL‑C ≥ 3** for the same foundational requirements or be supplemented with compensating controls defined in the CSRS.”[^2][^7][^12]
- **Vendor requirement:**
    - “The supplier shall provide documentation demonstrating that the proposed component meets **IEC 62443‑4‑2** and supports **SL‑C = 2** (minimum) for Identification \& Authentication, Use Control, System Integrity, and Restricted Data Flow.”[^11][^5][^12]

***

If you want, the next step can be a **ready‑to‑drop FEED table** with columns: Zone, SL‑T, Required SL‑C by FR, and “Example wording for technical spec” so you can hand it directly to the Shanghai CSC engineering team.
<span style="display:none">[^14][^15][^16][^17][^18][^19][^20][^21][^22]</span>

<div align="center">⁂</div>

[^1]: https://www.dragos.com/blog/isa-iec-62443-concepts

[^2]: https://gca.isa.org/blog/a-practical-approach-to-adopting-the-iec-62443-standards

[^3]: https://industrialcyber.co/features/the-essential-guide-to-the-iec-62443-industrial-cybersecurity-standards/

[^4]: https://www.isa.org/intech-home/2018/september-october/departments/new-standard-specifies-security-capabilities-for-c

[^5]: https://gca.isa.org/hubfs/ISAGCA Quick Start Guide FINAL.pdf

[^6]: https://www.linkedin.com/pulse/why-two-types-security-level-definitions-iec-62443-sajath-sathar-dql3f

[^7]: https://www.instmc.org/_userfiles/pages/groupfiles/cyber_security/wp_implementing_iec_62443_security_levels_in_industrial_control_applications_1.pdf

[^8]: https://www.rockwellautomation.com/en-us/company/news/blogs/iec-62443-security-guide.html

[^9]: https://www.cisco.com/c/en/us/products/collateral/security/isaiec-62443-3-3-wp.html

[^10]: https://securityboulevard.com/2024/04/complete-guide-to-isa-iec-62443-3-2-risk-assessments-for-industrial-automation-and-control-systems/

[^11]: https://www.keyfactor.com/blog/iec-62443-4-2-technical-security-requirements-for-iacs-components/

[^12]: https://www.iriusrisk.com/resources-blog/industrial-automation-control-systems

[^13]: https://www.radiflow.com/wp-content/uploads/practical-guidelines-62443.pdf

[^14]: https://www.iriusrisk.com/resources-blog/62443-example-1-sl-a-to-sl-t-basic-component

[^15]: https://www.graftholders.com/iec-62443-security-levels-explained/

[^16]: https://www.youtube.com/watch?v=xre1TzqorOU

[^17]: https://www.exida.com/blog/iec-62443-levels-levels-and-more-levels

[^18]: https://www.linkedin.com/posts/ersangrampatnaik_otcybersecurity-iec62443-securitylevels-activity-7338924279511560192-rKJ_

[^19]: https://en.wikipedia.org/wiki/IEC_62443

[^20]: https://aws.amazon.com/blogs/iot/guidance-on-using-isa-iec-62443-for-iiot-projects/

[^21]: https://waterfall-security.com/ot-insights-center/ot-cybersecurity-insights-center/the-essential-guide-to-isa-iec-62443/

[^22]: https://www.controleng.com/dont-overshoot-your-security-target/

