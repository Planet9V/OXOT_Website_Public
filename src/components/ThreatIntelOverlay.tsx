'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield, AlertTriangle, Terminal, X, ChevronRight,
    Database, Activity, Lock, TrendingUp, Bug, FileCode, CheckCircle
} from 'lucide-react'

interface ThreatIntelOverlayProps {
    isOpen: boolean
    onClose: () => void
    componentName: string
    assetId: string
    epssScore: number
    cves: Array<{ id: string, cvss: number, description: string }>
    frs: string[]
    zone: string
}

const MATRIX_CHARS = '0123456789ABCDEF'

const ThreatIntelOverlay: React.FC<ThreatIntelOverlayProps> = ({
    isOpen, onClose, componentName, assetId, epssScore, cves, frs, zone
}) => {
    const [activeTab, setActiveTab] = useState<'epss' | 'frs' | 'exploits'>('epss')
    const [matrixStream, setMatrixStream] = useState<string[]>([])

    // Matrix Rain Effect for "Exploits" tab
    useEffect(() => {
        if (isOpen && activeTab === 'exploits') {
            const interval = setInterval(() => {
                setMatrixStream(prev => {
                    const newLine = Array(40).fill(0).map(() => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join(' ')
                    return [newLine, ...prev.slice(0, 15)]
                })
            }, 50)
            return () => clearInterval(interval)
        }
    }, [isOpen, activeTab])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl bg-black/90 border border-white/20 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded bg-red-500/20 text-red-400 animate-pulse`}>
                            <Activity size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white font-mono tracking-tight">THREAT_INTEL_CONSOLE</h2>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                                <span>TARGET: {assetId}</span>
                                <span className="text-gray-600">|</span>
                                <span>ZONE: {zone}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Layout */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Nav */}
                    <div className="w-64 border-r border-white/10 bg-black/40 p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('epss')}
                            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-all
                ${activeTab === 'epss' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <TrendingUp size={16} /> EPSS Dynamics
                        </button>
                        <button
                            onClick={() => setActiveTab('frs')}
                            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-all
                ${activeTab === 'frs' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <Shield size={16} /> IEC 62443 FRs
                        </button>
                        <button
                            onClick={() => setActiveTab('exploits')}
                            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 text-sm font-bold transition-all
                ${activeTab === 'exploits' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            <Bug size={16} /> Active Exploits
                        </button>
                    </div>

                    {/* Main Panel */}
                    <div className="flex-1 p-6 overflow-y-auto bg-black relative">
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {activeTab === 'epss' && (
                                <motion.div
                                    key="epss"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="p-6 rounded-xl bg-orange-900/10 border border-orange-500/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 text-orange-500/20 text-[60px] font-black leading-none opacity-20 text-right">AEON<br />CALCULUS</div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Aeon Threat Calculus</h3>

                                        {/* Prioritization Badge */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`px-4 py-2 rounded-lg font-black text-xl tracking-widest border
                            ${(Math.max(...cves.map(c => c.cvss)) >= 9 || epssScore > 0.2)
                                                    ? 'bg-red-600 text-white border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse'
                                                    : (Math.max(...cves.map(c => c.cvss)) >= 7 || epssScore > 0.05)
                                                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                                                        : 'bg-green-500/20 text-green-400 border-green-500/50'}`}>
                                                {(Math.max(...cves.map(c => c.cvss)) >= 9 || epssScore > 0.2) ? 'PRIORITY: NOW' :
                                                    (Math.max(...cves.map(c => c.cvss)) >= 7 || epssScore > 0.05) ? 'PRIORITY: NEXT' : 'PRIORITY: NEVER'}
                                            </div>
                                            <div className="text-xs text-gray-500 font-mono">
                                                {(Math.max(...cves.map(c => c.cvss)) >= 9 || epssScore > 0.2) ? 'IMMEDIATE ACTION REQUIRED. EXPLOIT IMMINENT.' :
                                                    (Math.max(...cves.map(c => c.cvss)) >= 7 || epssScore > 0.05) ? 'SCHEDULE REMEDIATION IN NEXT MAINTENANCE WINDOW.' : 'RISK ACCEPTABLE / MONITORING ONLY.'}
                                            </div>
                                        </div>

                                        <div className="flex items-end gap-2 mb-4">
                                            <span className="text-5xl font-mono font-bold text-orange-400">{(epssScore * 100).toFixed(2)}%</span>
                                            <span className="text-sm text-gray-400 mb-2">Probability of exploitation in next 30 days</span>
                                        </div>

                                        {/* Math Visualization */}
                                        <div className="bg-black/80 rounded-lg p-4 font-mono text-sm border border-white/10 mb-4">
                                            <div className="text-gray-500 mb-2">// Asset Cumulative Probability Calculation</div>
                                            <div className="text-green-400 text-lg">P(Asset) = 1 - Π(1 - p_cve)</div>
                                            <div className="mt-2 text-gray-400 pl-4 border-l-2 border-white/10 text-xs">
                                                Derived from {cves.length} active vectors.
                                                Weighted by <strong>Network Reachability</strong> and <strong>PoC Availability</strong>.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feature Importance Mockup */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <h4 className="text-sm font-bold text-gray-300 mb-3">Top Predictive Features (XGBoost)</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-400">Vendor: {componentName.split(' ')[0]}</span>
                                                    <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 w-[85%]" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-400">Vector: Network (AV:N)</span>
                                                    <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 w-[72%]" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-400">PoC: Available</span>
                                                    <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-500 w-[94%]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            <h4 className="text-sm font-bold text-gray-300 mb-3">Threat Context</h4>
                                            <p className="text-xs text-gray-400 leading-relaxed">
                                                This asset is in <strong>{zone}</strong>. Based on network reachability (Vector: Network) and public Proof-of-Concept availability, the priority is elevated.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'frs' && (
                                <motion.div
                                    key="frs"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Shield className="text-cyan-400" />
                                        IEC 62443 Foundational Requirements
                                    </h3>

                                    <div className="grid grid-cols-1 gap-3">
                                        {frs.map((fr, idx) => (
                                            <div key={idx} className="bg-cyan-900/10 border border-cyan-500/20 p-4 rounded-lg flex items-start gap-4">
                                                <div className="p-2 bg-cyan-500/20 rounded text-cyan-400 font-bold text-xs shrink-0">
                                                    {fr}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">
                                                        {fr.includes('FR1') ? 'Identification and Authentication Control' :
                                                            fr.includes('FR2') ? 'Use Control' :
                                                                fr.includes('FR3') ? 'System Integrity' :
                                                                    fr.includes('FR4') ? 'Data Confidentiality' :
                                                                        fr.includes('FR5') ? 'Restricted Data Flow' :
                                                                            fr.includes('FR6') ? 'Timely Response to Events' :
                                                                                'Resource Availability'}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">
                                                        Required for {zone} compliance. Ensure component implements specific CRs (Component Requirements) for this FR.
                                                    </p>
                                                </div>
                                                <CheckCircle size={16} className="text-green-500 shrink-0 ml-auto" />
                                            </div>
                                        ))}
                                    </div>

                                    <a href="/workshop#fr-section" className="block w-full text-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-cyan-400 font-bold transition-all">
                                        Open Full Compliance Workshop &rarr;
                                    </a>
                                </motion.div>
                            )}

                            {activeTab === 'exploits' && (
                                <motion.div
                                    key="exploits"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 h-full flex flex-col"
                                >
                                    <div className="bg-black border border-green-500/30 rounded-lg p-4 font-mono text-xs text-green-500 flex-1 overflow-hidden relative">
                                        <div className="absolute top-2 right-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-red-500 font-bold">LIVE FEED</span>
                                        </div>

                                        {/* CVE Details */}
                                        {cves.map(cve => (
                                            <div key={cve.id} className="mb-4 text-gray-300">
                                                <span className="text-red-400 font-bold">[{cve.id}]</span> <span className="text-yellow-400">CVSS {cve.cvss}</span>
                                                <div className="pl-4 border-l border-green-900 mt-1 opacity-80">
                                                    {cve.description}
                                                </div>
                                                <div className="mt-2 text-blue-400 pl-4">
                                                    &gt; msfconsole -x "use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_tcp; run"
                                                </div>
                                            </div>
                                        ))}

                                        {/* Mock Matrix Stream */}
                                        <div className="opacity-30 mt-8 pointer-events-none select-none">
                                            {matrixStream.map((line, i) => (
                                                <div key={i}>{line}</div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div >
                </div >
            </motion.div >
        </div >
    )
}

export default ThreatIntelOverlay
