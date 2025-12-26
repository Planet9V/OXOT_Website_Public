'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, Check, X, ChevronRight, Info, AlertTriangle, Database, Zap, Activity, Layers, Sigma } from 'lucide-react'

// --- IEC 62443-3-3 FR DATA (Consolidated) ---
const FR_DATA = [
    {
        id: 'FR 1',
        name: 'Identification & Authentication',
        icon: Shield,
        color: 'cyan',
        description: 'Identify and authenticate all users (humans, software processes, and devices) before allowing access.',
        controls: [
            { id: 'SR 1.1', name: 'Human User Identification', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.2', name: 'Software/Device ID', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.3', name: 'Account Management', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.5', name: 'Authenticator Mgmt', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.7', name: 'Password Strength', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 1.13', name: 'Untrusted Networks', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 2',
        name: 'Use Control',
        icon: Lock,
        color: 'purple',
        description: 'Enforce authorization policies to control usage of the system.',
        controls: [
            { id: 'SR 2.1', name: 'Authorization Enforcement', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.8', name: 'Auditable Events', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.4', name: 'Mobile Code', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 2.12', name: 'Non-repudiation', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 3',
        name: 'System Integrity',
        icon: Activity,
        color: 'green',
        description: 'Protect the integrity of the control system against unauthorized manipulation.',
        controls: [
            { id: 'SR 3.1', name: 'Communication Integrity', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.2', name: 'Malicious Code Protection', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 3.6', name: 'Deterministic Output', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 4',
        name: 'Data Confidentiality',
        icon: Database,
        color: 'blue',
        description: 'Ensure the confidentiality of information on communication channels and in data repositories.',
        controls: [
            { id: 'SR 4.1', name: 'Information Confidentiality', sl1: false, sl2: true, sl3: true, sl4: true },
            { id: 'SR 4.3', name: 'Use of Cryptography', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 5',
        name: 'Restricted Data Flow',
        icon: Layers,
        color: 'yellow',
        description: 'Segment the control system via zones and conduits to limit the flow of data.',
        controls: [
            { id: 'SR 5.1', name: 'Network Segmentation', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 5.2', name: 'Zone Boundary Protection', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 5.4', name: 'Application Partitioning', sl1: false, sl2: false, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 6',
        name: 'Timely Response to Events',
        icon: Zap,
        color: 'orange',
        description: ' Respond to security violations by notifying the proper authority, reporting needed evidence of the violation, and taking timely corrective action.',
        controls: [
            { id: 'SR 6.1', name: 'Audit Log Accessibility', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 6.2', name: 'Continuous Monitoring', sl1: false, sl2: true, sl3: true, sl4: true }
        ]
    },
    {
        id: 'FR 7',
        name: 'Resource Availability',
        icon: Sigma,
        color: 'red',
        description: 'Ensure the availability of the control system against the degradation or denial of essential services.',
        controls: [
            { id: 'SR 7.1', name: 'DoS Protection', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.3', name: 'System Backup', sl1: true, sl2: true, sl3: true, sl4: true },
            { id: 'SR 7.8', name: 'Component Inventory', sl1: false, sl2: true, sl3: true, sl4: true }
        ]
    }
]

const SECURITY_LEVELS = [
    { id: 'SL-1', label: 'SL 1', desc: 'Protection against casual or coincidental violation.', bg: 'bg-oxot-blue/10', border: 'border-oxot-blue/30', text: 'text-oxot-blue', icon: Check },
    { id: 'SL-2', label: 'SL 2', desc: 'Protection against intentional violation using simple means.', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-500', icon: Shield },
    { id: 'SL-3', label: 'SL 3', desc: 'Protection against intentional violation using sophisticated means.', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500', icon: AlertTriangle },
    { id: 'SL-4', label: 'SL 4', desc: 'Protection against intentional violation using sophisticated means with extended resources.', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500', icon: Lock },
]

export default function IECFrameworkMatrix() {
    const [activeFR, setActiveFR] = useState<string | null>(null)
    const [hoveredCell, setHoveredCell] = useState<{ fr: string, sl: string } | null>(null)

    return (
        <div className="w-full">
            {/* MATRIX HEADER */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-1 mb-1 sticky top-0 z-20 bg-black/90 backdrop-blur-sm py-4 border-b border-white/10">
                <div className="flex items-end px-4">
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Foundational Requirement</span>
                </div>
                {SECURITY_LEVELS.map(sl => (
                    <div key={sl.id} className={`flex flex-col items-center justify-center p-3 rounded-t-lg mx-1 ${sl.bg} border-t border-x ${sl.border}`}>
                        <span className={`text-xl font-black font-mono ${sl.text}`}>{sl.label}</span>
                        <span className="text-[10px] text-center text-gray-400 leading-tight mt-1 hidden md:block px-2">{sl.desc}</span>
                    </div>
                ))}
            </div>

            {/* MATRIX BODY */}
            <div className="space-y-1">
                {FR_DATA.map((fr) => (
                    <div key={fr.id} className="relative group">
                        {/* THE ROW */}
                        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-1">
                            {/* FR Label */}
                            <motion.button
                                onClick={() => setActiveFR(activeFR === fr.id ? null : fr.id)}
                                className={`
                                    text-left p-4 rounded-l-lg border-l-4 transition-all
                                    flex items-center gap-3
                                    ${activeFR === fr.id ? `bg-${fr.color}-950/40 border-${fr.color}-500` : 'bg-white/5 border-transparent hover:bg-white/10'}
                                `}
                            >
                                <div className={`p-2 rounded bg-${fr.color}-500/20 text-${fr.color}-400`}>
                                    <fr.icon size={18} />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">{fr.id}</div>
                                    <div className="text-gray-400 text-xs hidden md:block">{fr.name}</div>
                                </div>
                                <ChevronRight size={16} className={`ml-auto text-gray-500 transition-transform ${activeFR === fr.id ? 'rotate-90' : ''}`} />
                            </motion.button>

                            {/* SL Cells */}
                            {['sl1', 'sl2', 'sl3', 'sl4'].map((slKey, idx) => {
                                // Calculate coverage for this SL
                                const totalControls = fr.controls.length
                                const activeControls = fr.controls.filter(c => (c as any)[slKey]).length
                                const percentage = Math.round((activeControls / totalControls) * 100)
                                const isFull = percentage === 100
                                const slData = SECURITY_LEVELS[idx]

                                return (
                                    <div
                                        key={slKey}
                                        onMouseEnter={() => setHoveredCell({ fr: fr.id, sl: slKey })}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        className={`
                                            relative flex flex-col items-center justify-center p-2
                                            bg-white/5 border border-white/5 hover:bg-white/10 cursor-help transition-colors
                                            ${activeFR === fr.id ? `bg-${fr.color}-900/10` : ''}
                                        `}
                                    >
                                        <div className={`text-xl font-bold ${isFull ? slData.text : 'text-gray-600'}`}>
                                            {activeControls}
                                        </div>
                                        <div className="text-[9px] text-gray-500 uppercase font-mono">Controls</div>

                                        {/* Coverage Bar */}
                                        <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${isFull ? slData.bg.replace('/10', '') : 'bg-gray-600'}`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* EXPANDED DETAILS PANEL */}
                        <AnimatePresence>
                            {activeFR === fr.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className={`mx-4 mb-4 p-6 bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-b-xl border-t-0 shadow-inner`}>
                                        <div className="flex items-start gap-8">
                                            <div className="flex-1 space-y-4">
                                                <h4 className={`text-lg font-bold text-${fr.color}-400 flex items-center gap-2`}>
                                                    <fr.icon size={20} />
                                                    {fr.name} Detail
                                                </h4>
                                                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{fr.description}</p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                    {fr.controls.map(control => (
                                                        <div key={control.id} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5 hover:border-white/10">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xs font-mono text-gray-500">{control.id}</span>
                                                                <span className="text-sm text-gray-300">{control.name}</span>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                {[control.sl1, control.sl2, control.sl3, control.sl4].map((isActive, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-2 h-4 rounded-sm ${isActive ? SECURITY_LEVELS[i].bg.replace('/10', '') : 'bg-gray-800'}`}
                                                                        title={`Required at ${SECURITY_LEVELS[i].label}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* AI INSIGHT SIDER */}
                                            <div className="w-72 shrink-0 p-4 bg-oxot-gold/5 border border-oxot-gold/20 rounded-xl hidden xl:block">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="p-1.5 bg-oxot-gold rounded text-black"><Zap size={14} fill="currentColor" /></div>
                                                    <span className="text-oxot-gold font-bold text-xs uppercase tracking-widest">OXOT AI Insight</span>
                                                </div>
                                                <p className="text-xs text-oxot-gold/80 leading-relaxed mb-4">
                                                    Our <strong>CyberRail AI</strong> automatically maps your assets to {fr.id} requirements.
                                                    <br /><br />
                                                    Common Check: <em>Are all {fr.name.split(' ')[0]} assets correctly tagged in the Digital Twin?</em>
                                                </p>
                                                <button className="w-full py-2 bg-oxot-gold text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-yellow-400 transition-colors">
                                                    Run AI Audit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}
