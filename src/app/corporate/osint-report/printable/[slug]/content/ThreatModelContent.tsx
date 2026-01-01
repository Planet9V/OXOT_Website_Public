'use client';

import React from 'react';

export default function ThreatModelContent() {
    return (
        <article className="prose prose-lg max-w-none print:prose-sm">
            <h1>Comprehensive Cyber Threat Intelligence Monitor</h1>
            <p className="text-xl text-gray-600 mb-8">
                Olam Food Ingredients (OFI) Strategic Threat Model & Security Posture Analysis
            </p>

            <section className="avoid-break">
                <h2>1. Executive Strategic Assessment</h2>
                <p>
                    The global food and agriculture sector has emerged as a primary theater for both criminal
                    extortion and state-sponsored strategic pre-positioning. This report provides an exhaustive,
                    forensic-level threat model for Olam Food Ingredients (OFI), synthesizing current threat
                    intelligence to construct a full MITRE ATT&CK threat model encompassing Enterprise IT,
                    Industrial Control Systems (ICS), and Mobile domains.
                </p>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
                    <h4 className="font-bold text-red-700">Convergence of Threats</h4>
                    <ul className="text-sm mt-2 space-y-1">
                        <li>Financially motivated ransomware cartels: <strong>Akira, Black Basta, RansomHub</strong></li>
                        <li>State-sponsored actors: <strong>Volt Typhoon (PRC), Lazarus Group (DPRK)</strong></li>
                        <li>Attack surface: 120 manufacturing facilities, 2.8 million farmer network</li>
                    </ul>
                </div>
            </section>

            <section className="page-break-before avoid-break">
                <h2>2. Organizational Architecture & Attack Surface</h2>

                <h3>2.1 Technology Stack and Attack Vectors</h3>
                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-2 text-left">Domain</th>
                            <th className="p-2 text-left">Vendor/System</th>
                            <th className="p-2 text-left">Primary Attack Vector</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">ERP/Cloud</td>
                            <td className="p-2">Plex (Rockwell)</td>
                            <td className="p-2">Credential Stuffing, API Abuse, Cloud Misconfiguration</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2 font-semibold">ICS Hardware</td>
                            <td className="p-2">Rockwell Allen-Bradley</td>
                            <td className="p-2">Firmware Exploitation, Logic Manipulation, MitM on CIP</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">ICS Software</td>
                            <td className="p-2">Wonderware/AVEVA, Siemens</td>
                            <td className="p-2">RCE via unpatched Windows, Screen Manipulation</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2 font-semibold">Processing</td>
                            <td className="p-2">GEA, Tetra Pak</td>
                            <td className="p-2">Supply Chain Compromise, Remote Service Access</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">Mobile</td>
                            <td className="p-2">OFI Direct (Android/iOS)</td>
                            <td className="p-2">Malicious Updates, API Key Extraction, Banking Trojans</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="page-break-before avoid-break">
                <h2>3. Enterprise IT Threat Modeling (MITRE Enterprise)</h2>

                <h3>3.1 Primary Threat Actor Profiles</h3>

                <div className="grid gap-4 my-6">
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <h4 className="font-bold text-red-700">Akira Ransomware (G1015)</h4>
                        <p className="text-sm mt-2">
                            Explicitly targeting manufacturing and food sectors. Uses "double extortion"
                            (data theft + encryption). Targets Cisco VPNs without MFA and VMware ESXi environments.
                        </p>
                    </div>

                    <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                        <h4 className="font-bold text-orange-700">Black Basta (G1014)</h4>
                        <p className="text-sm mt-2">
                            Linked to Conti syndicate. Uses Qakbot malware via phishing. Known for rapid attacks -
                            initial access to domain-wide encryption in under 48 hours.
                        </p>
                    </div>

                    <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                        <h4 className="font-bold text-yellow-700">RansomHub</h4>
                        <p className="text-sm mt-2">
                            Newer RaaS group filling LockBit vacuum. Offers 90% affiliate payouts.
                            Exploits network edge devices (Citrix, Fortinet).
                        </p>
                    </div>
                </div>

                <h3>3.2 MITRE ATT&CK Mapping: Ransomware Kill Chain</h3>
                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-2 text-left">Tactic</th>
                            <th className="p-2 text-left">Technique</th>
                            <th className="p-2 text-left">Context & Mitigation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Initial Access</td>
                            <td className="p-2 font-mono text-xs">T1566 Phishing</td>
                            <td className="p-2">Qakbot via email. Mitigate: User Training, Email Sandboxing</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2">Initial Access</td>
                            <td className="p-2 font-mono text-xs">T1133 External Remote Services</td>
                            <td className="p-2">Cisco VPNs without MFA. Mitigate: FIDO2 MFA, VPN Patching</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Execution</td>
                            <td className="p-2 font-mono text-xs">T1059 Command & Scripting</td>
                            <td className="p-2">PowerShell for lateral movement. Mitigate: Constrained Language Mode</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2">Credential Access</td>
                            <td className="p-2 font-mono text-xs">T1003 OS Credential Dumping</td>
                            <td className="p-2">Mimikatz for LSASS. Mitigate: Credential Guard, LSASS Protection</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Impact</td>
                            <td className="p-2 font-mono text-xs">T1490 Inhibit System Recovery</td>
                            <td className="p-2">Shadow Copy deletion. Mitigate: Immutable/Offline Backups</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="page-break-before avoid-break">
                <h2>4. ICS/OT Threat Modeling (MITRE ICS Matrix)</h2>

                <h3>4.1 ICS Asset Landscape</h3>
                <ul>
                    <li><strong>Rockwell Automation (Allen-Bradley):</strong> US operations (Olde Thompson, Hughson Nut)</li>
                    <li><strong>Siemens (Simatic S7):</strong> European facilities (Germany, Netherlands)</li>
                    <li><strong>Wonderware (AVEVA):</strong> HMI/SCADA layer</li>
                    <li><strong>GEA & Tetra Pak:</strong> Tokoroa dairy plant automation</li>
                </ul>

                <h3>4.2 Volt Typhoon Scenario: Pre-Positioning Attack</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                    <p className="text-sm">
                        <strong>Scenario:</strong> State-sponsored actor (PRC) seeks long-term access for potential
                        disruption during geopolitical conflict. Uses "Living off the Land" techniques to remain
                        undetected in OT networks for years.
                    </p>
                </div>

                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-2 text-left">Tactic</th>
                            <th className="p-2 text-left">Technique</th>
                            <th className="p-2 text-left">Context & Mitigation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Initial Access</td>
                            <td className="p-2 font-mono text-xs">T0886 Remote Services</td>
                            <td className="p-2">Compromising SOHO routers/vendor links. Mitigate: Secure Remote Access</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2">Impair Process</td>
                            <td className="p-2 font-mono text-xs">T0855 Unauthorized Command</td>
                            <td className="p-2">Commands to PLCs. Mitigate: DPI Firewalls for OT protocols</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">Impact</td>
                            <td className="p-2 font-mono text-xs">T0836 Modify Parameter</td>
                            <td className="p-2">Alter pasteurization temp. Mitigate: Set point integrity checks</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="page-break-before avoid-break">
                <h2>5. Mobile & FinTech Threat Modeling</h2>

                <p>
                    OFI's "OFI Direct" applications connect millions of farmers to corporate systems for payments
                    and supply chain data, creating a massive unmanaged endpoint perimeter.
                </p>

                <h3>5.1 Supply Chain Financial Fraud Scenario</h3>
                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-2 text-left">Tactic</th>
                            <th className="p-2 text-left">Technique</th>
                            <th className="p-2 text-left">Context</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Initial Access</td>
                            <td className="p-2 font-mono text-xs">T1474 Supply Chain Compromise</td>
                            <td className="p-2">Malicious code in app updates pushed to 550K+ farmers</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2">Credential Access</td>
                            <td className="p-2 font-mono text-xs">T1412 Capture SMS Messages</td>
                            <td className="p-2">Intercepting OTPs for payment 2FA bypass</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2">C2</td>
                            <td className="p-2 font-mono text-xs">T1437 Application Layer Protocol</td>
                            <td className="p-2">Botnet sending fraudulent payment requests</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="page-break-before avoid-break">
                <h2>6. Strategic Mitigation Recommendations</h2>

                <h3>6.1 ICS/OT Security Hardening</h3>
                <ol>
                    <li><strong>Network Segmentation:</strong> Implement Purdue Model IDMZ between IT (Level 4) and OT (Level 3/2)</li>
                    <li><strong>Passive OT Monitoring:</strong> Deploy Dragos/Nozomi/Claroty in major plants</li>
                    <li><strong>Secure Remote Access:</strong> Eliminate direct RDP; require MFA for all vendor access</li>
                </ol>

                <h3>6.2 Enterprise & Cloud Defense</h3>
                <ol>
                    <li><strong>Phishing-Resistant MFA:</strong> FIDO2/WebAuthn hardware tokens for administrators</li>
                    <li><strong>Immutable Backups:</strong> Air-gapped, offline backup strategy</li>
                    <li><strong>Edge Device Patching:</strong> Prioritize VPN/Firewall CVEs (days to exploitation)</li>
                </ol>

                <h3>6.3 Mobile & Supply Chain</h3>
                <ol>
                    <li><strong>App SBOM:</strong> Software Bill of Materials analysis before every release</li>
                    <li><strong>API Hardening:</strong> OAuth 2.0, rate limiting, certificate pinning</li>
                    <li><strong>Farmer Awareness:</strong> In-app security education ("OFI will never ask for OTP")</li>
                </ol>
            </section>

            <div className="mt-12 pt-6 border-t-2 border-[#c9a227]">
                <p className="text-sm text-gray-500 font-mono">
                    END OF REPORT • OXOT SOVEREIGN INTELLIGENCE • MITRE ATT&CK FRAMEWORK v14
                </p>
            </div>
        </article>
    );
}
