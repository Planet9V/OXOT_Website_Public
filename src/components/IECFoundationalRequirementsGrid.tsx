'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Info, ExternalLink, Filter } from 'lucide-react'

// --- IEC 62443-3-3 FR & SR MATRIX (Complete 7 Foundational Requirements) ---
const FR_DATA = [
    {
        id: 'FR 1', name: 'Identification & Authentication Control (IAC)', color: 'cyan',
        srs: [
            { id: 'SR 1.1', name: 'Human User Identification & Authentication', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.2', name: 'Software Process & Device Identification', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.3', name: 'Account Management', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.4', name: 'Identifier Management', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.5', name: 'Authenticator Management', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.6', name: 'Wireless Access Management', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.7', name: 'Strength of Password-Based Authentication', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.8', name: 'Public Key Infrastructure Certificates', sl1: false, sl2: false, sl3: true, sl4: true },
            { id: 'SR 1.9', name: 'Strength of Public Key Authentication', sl1: false, sl2: false, sl3: true, sl4: true },
            { id: 'SR 1.10', name: 'Authenticator Feedback', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.11', name: 'Unsuccessful Login Attempts', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.12', name: 'System Use Notification', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.13', name: 'Access via Untrusted Networks', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 2', name: 'Use Control (UC)', color: 'purple',
        srs: [
            { id: 'SR 2.1', name: 'Authorization Enforcement', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.2', name: 'Wireless Use Control', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.3', name: 'Use Control for Portable & Mobile Devices', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.4', name: 'Mobile Code', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.5', name: 'Session Lock', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.6', name: 'Remote Session Termination', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.7', name: 'Concurrent Session Control', sl1: false, sl2: false, sl3: true, sl4: true },
            { id: 'SR 2.8', name: 'Auditable Events', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.9', name: 'Audit Storage Capacity', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.10', name: 'Response to Audit Processing Failures', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.11', name: 'Timestamps', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.12', name: 'Non-repudiation', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 3', name: 'System Integrity (SI)', color: 'green',
        srs: [
            { id: 'SR 3.1', name: 'Communication Integrity', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.2', name: 'Malicious Code Protection', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.3', name: 'Security Functionality Verification', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.4', name: 'Software & Information Integrity', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.5', name: 'Input Validation', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.6', name: 'Deterministic Output', sl1: false, sl2: false, sl3: true, sl4: true },
            { id: 'SR 3.7', name: 'Error Handling', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.8', name: 'Session Integrity', sl1: false, sl2: false, sl3: true, sl4: true },
            { id: 'SR 3.9', name: 'Protection of Audit Information', sl1: false, sl2: true, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 4', name: 'Data Confidentiality (DC)', color: 'blue',
        srs: [
            { id: 'SR 4.1', name: 'Information Confidentiality', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 4.2', name: 'Information Persistence', sl1: false, sl2: false, sl3: true, sl4: true },
            { id: 'SR 4.3', name: 'Use of Cryptography', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 5', name: 'Restricted Data Flow (RDF)', color: 'yellow',
        srs: [
            { id: 'SR 5.1', name: 'Network Segmentation', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 5.2', name: 'Zone Boundary Protection', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 5.3', name: 'General Purpose Person-to-Person Communication Restrictions', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 5.4', name: 'Application Partitioning', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 6', name: 'Timely Response to Events (TRE)', color: 'orange',
        srs: [
            { id: 'SR 6.1', name: 'Audit Log Accessibility', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 6.2', name: 'Continuous Monitoring', sl1: false, sl2: true, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 7', name: 'Resource Availability (RA)', color: 'red',
        srs: [
            { id: 'SR 7.1', name: 'Denial of Service Protection', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.2', name: 'Resource Management', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.3', name: 'Control System Backup', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.4', name: 'Control System Recovery & Reconstitution', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.5', name: 'Emergency Power', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.6', name: 'Network & Security Configuration Settings', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.7', name: 'Least Functionality', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.8', name: 'Control System Component Inventory', sl1: false, sl2: true, sl3: true, sl4: true }
        ]
    }
]

export default function IECFoundationalRequirementsGrid() {
    const [filterSL, setFilterSL] = useState<number | null>(null)

    return (
        <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl">

            {/* HEADER CONTROLS */}
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5">
                <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        <Check className="text-green-500" />
                        IEC 62443-3-3 COMPLIANCE MATRIX
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Foundational Requirements (FR) & System Requirements (SR) Applicability</p>
                </div>

                <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/10">
                    <div className="px-3 py-1 text-xs font-bold text-gray-500 flex items-center gap-1">
                        <Filter size={12} /> FILTER SL:
                    </div>
                    {[1, 2, 3, 4].map(sl => (
                        <button
                            key={sl}
                            onClick={() => setFilterSL(filterSL === sl ? null : sl)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all
                                ${filterSL === sl
                                    ? sl === 4 ? 'bg-red-600 text-white' : sl === 3 ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white'}`}
                        >
                            SL-{sl}
                        </button>
                    ))}
                </div>
            </div>

            {/* DATA GRID */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/50 text-gray-500 text-xs uppercase tracking-widest border-b border-white/10">
                            <th className="p-4 font-normal w-24">ID</th>
                            <th className="p-4 font-normal">Requirement Name</th>
                            <th className="p-4 font-normal w-16 text-center text-green-700/80">SL-1</th>
                            <th className="p-4 font-normal w-16 text-center text-yellow-700/80">SL-2</th>
                            <th className="p-4 font-normal w-16 text-center text-orange-700/80">SL-3</th>
                            <th className="p-4 font-normal w-16 text-center text-red-700/80">SL-4</th>
                            <th className="p-4 font-normal w-16">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FR_DATA.map((fr) => (
                            <React.Fragment key={fr.id}>
                                {/* FR HEADER ROW */}
                                <tr className={`bg-${fr.color}-900/20 border-t border-${fr.color}-500/20`}>
                                    <td colSpan={7} className="p-4">
                                        <div className={`flex items-center gap-2 font-bold text-${fr.color}-400`}>
                                            <span className="px-2 py-0.5 bg-black/40 rounded text-xs">{fr.id}</span>
                                            {fr.name}
                                        </div>
                                    </td>
                                </tr>

                                {/* SR ROWS */}
                                {fr.srs.map((sr, idx) => {
                                    // Filter Logic
                                    if (filterSL && !sr[`sl${filterSL}` as keyof typeof sr]) return null

                                    return (
                                        <tr key={sr.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            <td className="p-4 font-mono text-xs text-gray-500 group-hover:text-white">{sr.id}</td>
                                            <td className="p-4 text-sm text-gray-300 font-medium">{sr.name}</td>

                                            {/* CHECKBOXES */}
                                            {[1, 2, 3, 4].map(slLevel => {
                                                const active = sr[`sl${slLevel}` as keyof typeof sr]
                                                const color = slLevel === 4 ? 'red' : slLevel === 3 ? 'orange' : slLevel === 2 ? 'yellow' : 'green'

                                                return (
                                                    <td key={slLevel} className="p-4 text-center">
                                                        {active ? (
                                                            <div className={`w-4 h-4 rounded-sm bg-${color}-500/20 border border-${color}-500/50 mx-auto flex items-center justify-center`}>
                                                                <Check size={10} className={`text-${color}-500`} />
                                                            </div>
                                                        ) : (
                                                            <div className="w-4 h-4 rounded-sm bg-white/5 border border-white/10 mx-auto" />
                                                        )}
                                                    </td>
                                                )
                                            })}

                                            <td className="p-4 text-center">
                                                <button className="p-1.5 hover:bg-white/10 rounded text-gray-600 hover:text-cyan-400">
                                                    <ExternalLink size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-black/50 border-t border-white/10 text-xs text-center text-gray-500">
                Displaying {FR_DATA.reduce((acc, fr) => acc + fr.srs.length, 0)} System Requirements (SRs).
                Updated Oct 2025 per "Comlete Guide".
            </div>
        </div>
    )
}
