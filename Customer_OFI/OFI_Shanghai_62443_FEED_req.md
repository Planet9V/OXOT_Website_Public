<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Checklist to include IEC 62443 in FEED documents for Shanghai CSCs

Including IEC 62443 in FEED for the Shanghai CSC means baking security into scope, architecture, and vendor specs rather than adding it at SAT. Use this as a **checklist you hand to the engineering / FEED lead**.

## Scope and objectives

- Define **IACS in scope** for the CSC: pilot lines, labs, test rigs, building automation that touch product or demos.[^1][^2]
- Add **cybersecurity posture** as an explicit FEED KPI alongside throughput, OEE, safety, and energy.[^3][^1]
- Decide **target Security Levels (SL)** per IEC 62443 (e.g., SL2 for labs, SL3 for any safety‑critical or customer-facing demo lines).[^4][^5]


## Risk assessment and CSRS

- Perform a **high‑level cyber risk assessment** for the CSC as part of FEED (use IEC 62443‑3‑2 style approach).[^2][^6]
- Define the **System under Consideration (SuC)** and document external interfaces (corporate network, cloud, vendors).[^2]
- Create an initial **Cyber Security Requirements Specification (CSRS)** before major package procurement.[^7][^2]


## Zones, conduits, and architecture

- Produce a **zones and conduits diagram** for the CSC (engineering labs, OT network, DMZ, corporate IT, vendor access).[^8][^9]
- Assign **Security Level Targets** to each zone (SLT per IEC 62443‑3‑3) and record justification in FEED.[^5][^10]
- Specify **network segmentation** requirements:
    - Separate OT from IT; dedicated OT VLANs and firewalled conduits.[^9][^5]
    - DMZ for data exchange (historians, integration with SAP/Braincube, etc.).[^11][^5]
    - Remote/vendor access via jump hosts, not direct to controllers.[^6][^5]


## Technical requirements in FEED specs

- Identity \& access: unique accounts, RBAC, MFA for remote access, password policies for all OT systems.[^12][^5]
- System integrity: hardening baselines for PLCs, HMIs, servers; patch and configuration management expectations.[^13][^5]
- Data confidentiality and integrity: encryption for data crossing IT/OT and cloud interfaces; logging for changes to critical parameters.[^3][^11]
- Monitoring: requirement for **OT monitoring / logging** (syslog, NetFlow, or dedicated ICS security sensors) with export to SOC/SIEM.[^5][^3]


## Supplier and package requirements

- State in all **EPC and vendor RFQs** that OT systems must comply with relevant IEC 62443 parts (e.g., 4‑1 for secure development, 4‑2 for components).[^14][^13][^12]
- Require vendors to provide:
    - Secure development lifecycle evidence (SDL, patch policy, vulnerability disclosure).[^14][^13]
    - Hardening guides and recommended firewall rules for their equipment.[^13][^5]
    - Default‑credential removal and role-based access preconfigured.[^5]


## Testing, FAT/SAT, and commissioning

- Embed **cybersecurity test cases** into FAT/SAT scripts: account management, logging, network segregation verification.[^15][^5]
- Define **acceptance criteria**: no default passwords, no flat networks between IT and OT, all logging enabled as per CSRS.[^6][^5]
- Include a **cybersecurity punch‑list** in commissioning: open ports reviewed, firewall rules validated, remote access paths tested and documented.[^1][^15]


## Documentation and handover

- Ensure FEED deliverables include:
    - Zones \& conduits drawings, SL assignments, and CSRS.[^10][^6]
    - Updated OT/IT architecture diagrams with security devices identified.[^8][^9]
    - Cybersecurity O\&M guidance (patching, backup, incident response contacts).[^11][^5]
- Align documentation with **IEC 62443 and NIST manufacturing profile** language so it can be reused for audits and insurance.[^16][^13]

If you want, the next step can be a one‑page “Shanghai CSC IEC 62443 FEED Checklist” formatted as a table you can paste directly into the FEED template or an internal design standard.
<span style="display:none">[^17][^18][^19][^20]</span>

<div align="center">⁂</div>

[^1]: https://utthunga.com/blogs/why-integrated-feed-is-the-control-point-your-greenfield-project-cant-ignore/

[^2]: https://studylib.net/doc/25398976/dnvgl-rp-g108

[^3]: https://www.elisity.com/blog/cybersecurity-for-food-manufacturing-in-2025-protecting-modern-production-operations

[^4]: https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards

[^5]: https://www.rockwellautomation.com/en-us/company/news/blogs/iec-62443-security-guide.html

[^6]: https://www.entelec.org/wp-content/uploads/2022/05/Zones-and-Conduits.pdf

[^7]: https://www.slideshare.net/slideshow/building-cybersecurity-into-a-greenfield-ics-project/75758665

[^8]: https://becolve.com/en/blog/design-of-zones-conduits-and-channels-according-to-the-iec-62443-isa99-standard-in-a-4-0-industry/

[^9]: https://www.cisco.com/c/en/us/products/collateral/security/isaiec-62443-3-3-wp.html

[^10]: https://jaatun.no/papers/2024/Zones-and-Conduits.pdf

[^11]: https://www.txone.com/white-papers/essence-of-isa-iec-62443-implementation/

[^12]: https://segura.security/post/iec-62443-4-2-compliance-guide/

[^13]: https://industrialcyber.co/features/the-essential-guide-to-the-iec-62443-industrial-cybersecurity-standards/

[^14]: https://cip-documentation.readthedocs.io/en/latest/security/CIP-Security-Checklists.html

[^15]: https://www.exida.com.sg/wp-content/uploads/2022/04/ICS-Cybersecurity-Lifecycle.pdf

[^16]: https://www.nist.gov/system/files/documents/2017/06/12/manufacturing_profile_29apr2016.pdf

[^17]: https://shieldworkz.com/ebooks/ics-security-for-food-beverage-manufacturers-best-practices-guide

[^18]: https://shieldworkz.com/blogs/iec-62443-compliance-guide-for-small-manufacturers

[^19]: https://gca.isa.org/blog/how-to-define-zones-and-conduits

[^20]: https://industrialcyber.co/expert/sinclair-koelemij/the-anatomy-of-plant-design-and-the-ot-cyber-attack-part-1/

