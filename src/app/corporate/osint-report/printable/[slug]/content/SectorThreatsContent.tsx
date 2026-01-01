'use client';

import React from 'react';

export default function SectorThreatsContent() {
    return (
        <article className="prose prose-lg max-w-none print:prose-sm">
            <h1>OFI Sector Threat Report</h1>
            <p className="text-xl text-gray-600 mb-2">Food & Agriculture Cybersecurity Incidents</p>
            <p className="text-sm text-gray-500 mb-8">
                Report Period: July 2023 - December 2025 | Classification: OSINT // UNCLASSIFIED
            </p>

            <section className="avoid-break">
                <h2>Executive Summary</h2>
                <p>
                    The food and agriculture sector experienced a <strong>dramatic surge in cyberattacks</strong>
                    from 2023-2025, with ransomware incidents more than doubling.
                </p>

                <table className="w-full border-collapse my-6">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-3 text-left">Metric</th>
                            <th className="p-3 text-center">2023</th>
                            <th className="p-3 text-center">2024</th>
                            <th className="p-3 text-center">2025 (Projected)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-3 font-semibold">Ransomware Incidents</td>
                            <td className="p-3 text-center">167</td>
                            <td className="p-3 text-center">212</td>
                            <td className="p-3 text-center font-bold text-red-600">340+</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3 font-semibold">YoY Increase</td>
                            <td className="p-3 text-center">—</td>
                            <td className="p-3 text-center">+27%</td>
                            <td className="p-3 text-center font-bold text-red-600">+60%</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3 font-semibold">Sector Ranking</td>
                            <td className="p-3 text-center">7th</td>
                            <td className="p-3 text-center">6th</td>
                            <td className="p-3 text-center">5th</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3 font-semibold">Q4 Spike</td>
                            <td className="p-3 text-center">Baseline</td>
                            <td className="p-3 text-center font-bold">+118%</td>
                            <td className="p-3 text-center">TBD</td>
                        </tr>
                    </tbody>
                </table>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                    <h4 className="font-bold text-yellow-700">Key Findings</h4>
                    <ul className="text-sm mt-2 space-y-1">
                        <li>Food/Ag accounted for <strong>5.8% of global ransomware volume</strong> in 2024</li>
                        <li><strong>84 incidents in Q1 2025 alone</strong> (attacks doubled vs. Q1 2024)</li>
                        <li>Power vacuum from LockBit/ALPHV disruptions enabled RansomHub dominance</li>
                    </ul>
                </div>
            </section>

            <section className="page-break-before avoid-break">
                <h2>Threat Actor Landscape</h2>

                <h3>Active Ransomware Groups (2024-2025)</h3>
                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-2 text-left">Group</th>
                            <th className="p-2 text-left">Activity Level</th>
                            <th className="p-2 text-left">Primary TTPs</th>
                            <th className="p-2 text-left">Notable Targets</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 font-semibold text-red-600">RansomHub</td>
                            <td className="p-2"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">DOMINANT</span></td>
                            <td className="p-2">Double extortion, supply chain</td>
                            <td className="p-2">Food processors, distributors</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2 font-semibold text-orange-600">Akira</td>
                            <td className="p-2"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">HIGH</span></td>
                            <td className="p-2">Data theft, encryption</td>
                            <td className="p-2">Agricultural cooperatives</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">LockBit 3.0</td>
                            <td className="p-2"><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">MODERATE</span></td>
                            <td className="p-2">RaaS, affiliate model</td>
                            <td className="p-2">Meat processing</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2 font-semibold text-purple-600">Hunters Intl</td>
                            <td className="p-2"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">RISING</span></td>
                            <td className="p-2">Data extortion priority</td>
                            <td className="p-2">Dairy, poultry</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">Clop</td>
                            <td className="p-2"><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">MODERATE</span></td>
                            <td className="p-2">File-sharing exploits</td>
                            <td className="p-2">Grain/commodity traders</td>
                        </tr>
                    </tbody>
                </table>

                <h3>APT Groups with Agricultural Interest</h3>
                <table className="w-full border-collapse my-6 text-sm">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-2 text-left">Group</th>
                            <th className="p-2 text-left">Nation-State</th>
                            <th className="p-2 text-left">Focus Areas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">APT28 (Fancy Bear)</td>
                            <td className="p-2">Russia</td>
                            <td className="p-2">Commodity markets, grain supplies</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-2 font-semibold">APT41</td>
                            <td className="p-2">China</td>
                            <td className="p-2">Agricultural IP, seed technology</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">Sandworm</td>
                            <td className="p-2">Russia</td>
                            <td className="p-2">Critical infrastructure disruption</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="page-break-before avoid-break">
                <h2>Attack Vector Analysis</h2>

                <h3>Primary Entry Points</h3>
                <table className="w-full border-collapse my-6">
                    <thead>
                        <tr className="bg-[#1a3a5f] text-white">
                            <th className="p-3 text-left">Vector</th>
                            <th className="p-3 text-center">Prevalence</th>
                            <th className="p-3 text-left">OFI Relevance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-3">Phishing/Social Engineering</td>
                            <td className="p-3 text-center font-bold">45%</td>
                            <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">HIGH</span> - 87K employees</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3">Exposed Remote Services</td>
                            <td className="p-3 text-center font-bold">25%</td>
                            <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">HIGH</span> - 120+ plants</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3">Supply Chain Compromise</td>
                            <td className="p-3 text-center font-bold">15%</td>
                            <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">CRITICAL</span> - Braincube, vendors</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="p-3">Legacy OT/ICS Exploitation</td>
                            <td className="p-3 text-center font-bold">10%</td>
                            <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">CRITICAL</span> - PLCs, SCADA</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3">Insider Threat</td>
                            <td className="p-3 text-center font-bold">5%</td>
                            <td className="p-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">MEDIUM</span> - 2.8M farmer network</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Tactics, Techniques, and Procedures (TTPs)</h3>
                <ol>
                    <li><strong>Double Extortion</strong> - Encryption + data leak threats (53% of attacks)</li>
                    <li><strong>Supply Chain Targeting</strong> - Just-in-time delivery disruption</li>
                    <li><strong>OT/IoT Exploitation</strong> - Automated systems (GPS tractors, milk sensors)</li>
                    <li><strong>Credential Harvesting</strong> - Lateral movement from IT to OT</li>
                </ol>
            </section>

            <section className="page-break-before avoid-break">
                <h2>Sector-Specific Incidents</h2>

                <div className="grid gap-4 my-6">
                    <div className="border border-cyan-200 rounded-lg p-4">
                        <h4 className="font-bold text-cyan-700">Dairy Processing</h4>
                        <ul className="text-sm mt-2 space-y-1">
                            <li><strong>March 2025:</strong> Siberian dairy plant - Production halt</li>
                            <li><strong>2024:</strong> Multiple European incidents</li>
                            <li><strong>Risk Level:</strong> <span className="text-red-600 font-bold">HIGH</span> - Pasteurization safety-critical</li>
                        </ul>
                    </div>

                    <div className="border border-red-200 rounded-lg p-4">
                        <h4 className="font-bold text-red-700">Poultry/Meat Processing</h4>
                        <ul className="text-sm mt-2 space-y-1">
                            <li><strong>March 2025:</strong> South Africa chicken producer - $1M+ confirmed</li>
                            <li><strong>2021 Reference:</strong> JBS - $11M ransom paid</li>
                            <li><strong>Risk Level:</strong> <span className="text-red-600 font-bold">CRITICAL</span> - High-value targets</li>
                        </ul>
                    </div>

                    <div className="border border-green-200 rounded-lg p-4">
                        <h4 className="font-bold text-green-700">Produce/Fresh Foods</h4>
                        <ul className="text-sm mt-2 space-y-1">
                            <li><strong>2023:</strong> Dole - $10.5M total impact</li>
                            <li><strong>Risk Level:</strong> <span className="text-yellow-600 font-bold">MEDIUM</span> - Supply chain exposure</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="avoid-break">
                <h2>Recommendations for OFI</h2>

                <h3>Immediate (0-30 days)</h3>
                <ol>
                    <li>Validate backup/recovery for all 120+ plants</li>
                    <li>Review Braincube API access controls</li>
                    <li>Tabletop exercise: ransomware scenario</li>
                </ol>

                <h3>Short-term (30-90 days)</h3>
                <ol>
                    <li>Implement network segmentation IT/OT</li>
                    <li>Deploy OT monitoring (Claroty/Nozomi style)</li>
                    <li>Vendor security assessments (Braincube priority)</li>
                </ol>

                <h3>Long-term (90+ days)</h3>
                <ol>
                    <li>IEC 62443 certification program</li>
                    <li>24/7 SOC with OT visibility</li>
                    <li>Supply chain risk management program</li>
                </ol>
            </section>

            <div className="mt-12 pt-6 border-t-2 border-[#c9a227]">
                <p className="text-sm text-gray-500 font-mono">
                    END OF REPORT • Sources: Food and Ag-ISAC, FDD, Halcyon Research, TXOne, CISA
                </p>
            </div>
        </article>
    );
}
