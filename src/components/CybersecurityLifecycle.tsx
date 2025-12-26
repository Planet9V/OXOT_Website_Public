'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Search, PenTool, Wrench, CheckCircle, RefreshCw, Activity, Lock } from 'lucide-react'

// IEC 62443 LIFECYCLE PHASES
const PHASES = [
    {
        id: 'assess',
        title: 'Assess',
        icon: Search,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        desc: 'High-Level Risk Assessment & Zone Partitioning',
        standards: ['IEC 62443-3-2', 'ZCR 1-7'],
        details: [
            'Identify System under Consideration (SuC)',
            'Perform High-Level Risk Assessment',
            'Partition into Zones & Conduits',
            'Determine Security Level Targets (SL-T)'
        ]
    },
    {
        id: 'design',
        title: 'Design',
        icon: PenTool,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        desc: 'Security Requirements & Architecture',
        standards: ['IEC 62443-3-3', 'SR 1-7'],
        details: [
            'Define Foundational Requirements (FR)',
            'Design Defense-in-Depth Architecture',
            'Select Countermeasures',
            'Document Cybersecurity Requirements'
        ]
    },
    {
        id: 'implement',
        title: 'Implement',
        icon: Wrench,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        desc: 'System Build & Configuration',
        standards: ['IEC 62443-2-4', 'IEC 62443-4-1'],
        details: [
            'Secure Component Integration',
            'Network Segmentation Implementation',
            'Access Control Configuration',
            'Patching & Hardening'
        ]
    },
    {
        id: 'verify',
        title: 'Verify',
        icon: CheckCircle,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        desc: 'SAT & Verification',
        standards: ['IEC 62443-2-1', 'FAT/SAT'],
        details: [
            'Verify Security Levels (SL-A)',
            'Penetration Testing',
            'FAT/SAT Security Testing',
            'Compliance Auditing'
        ]
    },
    {
        id: 'maintain',
        title: 'Maintain',
        icon: RefreshCw,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        desc: 'Operations & Maintenance',
        standards: ['IEC 62443-2-3', 'Patch Mgmt'],
        details: [
            'Continuous Monitoring',
            'Patch Management',
            'Incident Response',
            'Periodic Re-assessment'
        ]
    }
]

export default function CybersecurityLifecycle() {
    const [activePhaseIndex, setActivePhaseIndex] = useState(0)
    const activePhase = PHASES[activePhaseIndex]

    // Auto-cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setActivePhaseIndex(prev => (prev + 1) % PHASES.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/20 p-8 rounded-2xl border border-white/5">
            {/* LEFT: CIRCULAR VISUALIZATION */}
            <div className="relative aspect-square flex items-center justify-center">
                {/* Central Hub */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-32 h-32 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center p-4 text-center shadow-2xl">
                        <Lock size={24} className="text-white mb-2" />
                        <div className="text-xs font-mono text-gray-400">CSMS</div>
                        <div className="text-sm font-bold text-white">LIFECYCLE</div>
                    </div>
                </div>

                {/* Orbiting Phases */}
                <div className="absolute inset-0 animate-spin-slow">
                    {PHASES.map((phase, index) => {
                        const angle = (index * 360) / PHASES.length
                        const radius = 120 // px
                        // Calculate position
                        const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius
                        const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius

                        const isActive = index === activePhaseIndex

                        return (
                            <motion.button
                                onClick={() => setActivePhaseIndex(index)}
                                key={phase.id}
                                className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full border flex items-center justify-center transition-all duration-500
                                    ${isActive ? `scale-125 z-20 ${phase.bg} ${phase.border} shadow-[0_0_30px_rgba(255,255,255,0.2)]` : 'bg-black/60 border-white/10 scale-100 hover:scale-110'}`}
                                style={{
                                    left: `50%`,
                                    top: `50%`,
                                    transform: `translate(${x}px, ${y}px)`
                                }}
                            >
                                <phase.icon className={isActive ? phase.color : 'text-gray-500'} size={24} />
                            </motion.button>
                        )
                    })}
                </div>

                {/* Connecting Rings */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <circle cx="50%" cy="50%" r="120" stroke="currentColor" strokeWidth="1" fill="none" className="text-white" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="80" stroke="currentColor" strokeWidth="1" fill="none" className="text-white" />
                </svg>
            </div>

            {/* RIGHT: DETAIL PANEL */}
            <div className="h-full flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePhase.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 p-32 bg-gradient-to-br ${activePhase.color.replace('text-', 'from-')}/10 to-transparent blur-3xl opacity-20`} />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`text-5xl font-black ${activePhase.color} opacity-20`}>{(activePhaseIndex + 1).toString().padStart(2, '0')}</span>
                                <div>
                                    <h3 className={`text-2xl font-bold text-white`}>{activePhase.title} Phase</h3>
                                    <div className="text-sm text-gray-400 font-mono">{activePhase.standards.join(' • ')}</div>
                                </div>
                            </div>

                            <p className="text-lg text-gray-200 mb-6">{activePhase.desc}</p>

                            <div className="space-y-3">
                                {activePhase.details.map((detail, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${activePhase.color.replace('text-', 'bg-')}`} />
                                        <span className="text-sm text-gray-300">{detail}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-500 font-mono">
                                <span>OUTPUT ARTIFACTS REQUIRED</span>
                                <Activity size={14} className={activePhase.color} />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
