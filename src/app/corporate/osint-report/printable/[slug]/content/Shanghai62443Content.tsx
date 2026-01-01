'use client';

import React from 'react';

export default function Shanghai62443Content() {
    return (
        <article className="prose prose-lg max-w-none print:prose-sm">
            <h1>Checklist to Include IEC 62443 in FEED Documents</h1>
            <p className="text-xl text-gray-600 mb-8">Shanghai Customer Solution Centre (CSC)</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <p className="text-sm">
                    Including IEC 62443 in FEED for the Shanghai CSC means baking security into scope,
                    architecture, and vendor specs rather than adding it at SAT. Use this as a
                    <strong> checklist to hand to the engineering / FEED lead</strong>.
                </p>
            </div>

            <section className="avoid-break">
                <h2>1. Scope and Objectives</h2>
                <ul className="space-y-2">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Define <strong>IACS in scope</strong> for the CSC: pilot lines, labs, test rigs,
                        building automation that touch product or demos.
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Add <strong>cybersecurity posture</strong> as an explicit FEED KPI alongside
                        throughput, OEE, safety, and energy.
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Decide <strong>target Security Levels (SL)</strong> per IEC 62443
                        (e.g., SL2 for labs, SL3 for safety-critical or customer-facing demo lines).
                    </li>
                </ul>
            </section>

            <section className="avoid-break">
                <h2>2. Risk Assessment and CSRS</h2>
                <ul className="space-y-2">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Perform a <strong>high-level cyber risk assessment</strong> for the CSC as part of
                        FEED (use IEC 62443-3-2 style approach).
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Define the <strong>System under Consideration (SuC)</strong> and document external
                        interfaces (corporate network, cloud, vendors).
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Create an initial <strong>Cyber Security Requirements Specification (CSRS)</strong>
                        before major package procurement.
                    </li>
                </ul>
            </section>

            <section className="page-break-before avoid-break">
                <h2>3. Zones, Conduits, and Architecture</h2>
                <ul className="space-y-2">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Produce a <strong>zones and conduits diagram</strong> for the CSC
                        (engineering labs, OT network, DMZ, corporate IT, vendor access).
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Assign <strong>Security Level Targets</strong> to each zone (SLT per IEC 62443-3-3)
                        and record justification in FEED.
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Specify <strong>network segmentation</strong> requirements:
                        <ul className="ml-6 mt-2 space-y-1">
                            <li>Separate OT from IT; dedicated OT VLANs and firewalled conduits</li>
                            <li>DMZ for data exchange (historians, integration with SAP/Braincube, etc.)</li>
                            <li>Remote/vendor access via jump hosts, not direct to controllers</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section className="avoid-break">
                <h2>4. Technical Requirements in FEED Specs</h2>

                <h3>4.1 Identity & Access</h3>
                <ul className="space-y-1">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Unique accounts for all users
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Role-Based Access Control (RBAC)
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        MFA for remote access
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Password policies for all OT systems
                    </li>
                </ul>

                <h3>4.2 System Integrity</h3>
                <ul className="space-y-1">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Hardening baselines for PLCs, HMIs, servers
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Patch management expectations
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Configuration management procedures
                    </li>
                </ul>

                <h3>4.3 Data Confidentiality and Integrity</h3>
                <ul className="space-y-1">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Encryption for data crossing IT/OT and cloud interfaces
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Logging for changes to critical parameters
                    </li>
                </ul>

                <h3>4.4 Monitoring</h3>
                <ul className="space-y-1">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Requirement for <strong>OT monitoring/logging</strong> (syslog, NetFlow, or dedicated ICS sensors)
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Export to SOC/SIEM
                    </li>
                </ul>
            </section>

            <section className="page-break-before avoid-break">
                <h2>5. Supplier and Package Requirements</h2>
                <ul className="space-y-2">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        State in all <strong>EPC and vendor RFQs</strong> that OT systems must comply with
                        relevant IEC 62443 parts (e.g., 4-1 for secure development, 4-2 for components).
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Require vendors to provide:
                        <ul className="ml-6 mt-2 space-y-1">
                            <li>Secure development lifecycle evidence (SDL, patch policy, vulnerability disclosure)</li>
                            <li>Hardening guides and recommended firewall rules</li>
                            <li>Default-credential removal and role-based access preconfigured</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section className="avoid-break">
                <h2>6. Testing, FAT/SAT, and Commissioning</h2>
                <ul className="space-y-2">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Embed <strong>cybersecurity test cases</strong> into FAT/SAT scripts:
                        account management, logging, network segregation verification.
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Define <strong>acceptance criteria</strong>: no default passwords, no flat networks
                        between IT and OT, all logging enabled as per CSRS.
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Include a <strong>cybersecurity punch-list</strong> in commissioning: open ports reviewed,
                        firewall rules validated, remote access paths tested and documented.
                    </li>
                </ul>
            </section>

            <section className="avoid-break">
                <h2>7. Documentation and Handover</h2>
                <p>Ensure FEED deliverables include:</p>
                <ul className="space-y-2">
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Zones & conduits drawings, SL assignments, and CSRS
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Updated OT/IT architecture diagrams with security devices identified
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Cybersecurity O&M guidance (patching, backup, incident response contacts)
                    </li>
                    <li>
                        <input type="checkbox" className="mr-2" disabled />
                        Align documentation with <strong>IEC 62443 and NIST manufacturing profile</strong>
                        language for audits and insurance
                    </li>
                </ul>
            </section>

            <section className="page-break-before avoid-break">
                <h2>IEC 62443 Quick Reference</h2>
                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-3 text-left">Standard Part</th>
                            <th className="p-3 text-left">Focus Area</th>
                            <th className="p-3 text-left">Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-3 font-mono">62443-2-1</td>
                            <td className="p-3">Security Management System</td>
                            <td className="p-3">Organization policies and procedures</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3 font-mono">62443-3-2</td>
                            <td className="p-3">Security Risk Assessment</td>
                            <td className="p-3">Risk assessment methodology for FEED</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3 font-mono">62443-3-3</td>
                            <td className="p-3">System Security Requirements</td>
                            <td className="p-3">Zone SL-T assignments and requirements</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3 font-mono">62443-4-1</td>
                            <td className="p-3">Secure Development Lifecycle</td>
                            <td className="p-3">Vendor SDL requirements in RFQs</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3 font-mono">62443-4-2</td>
                            <td className="p-3">Component Security Requirements</td>
                            <td className="p-3">Technical requirements for PLCs, HMIs</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="avoid-break">
                <h2>Security Level Definitions</h2>
                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-3 text-center">SL</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Typical Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-3 text-center font-bold">SL 0</td>
                            <td className="p-3">No security requirements</td>
                            <td className="p-3">Isolated, non-critical systems</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3 text-center font-bold">SL 1</td>
                            <td className="p-3">Prevention of unauthorized access</td>
                            <td className="p-3">Basic IACS with minimal risk</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3 text-center font-bold">SL 2</td>
                            <td className="p-3">Prevention using simple means</td>
                            <td className="p-3">Labs, test environments</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3 text-center font-bold">SL 3</td>
                            <td className="p-3">Prevention using sophisticated means</td>
                            <td className="p-3">Customer-facing demos, safety systems</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3 text-center font-bold">SL 4</td>
                            <td className="p-3">Prevention against nation-state actors</td>
                            <td className="p-3">Critical infrastructure, high-value targets</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <div className="mt-12 pt-6 border-t-2 border-[#c9a227]">
                <p className="text-sm text-gray-500 font-mono">
                    END OF CHECKLIST • OXOT SOVEREIGN INTELLIGENCE • IEC 62443 COMPLIANCE PROTOCOL
                </p>
            </div>
        </article>
    );
}
