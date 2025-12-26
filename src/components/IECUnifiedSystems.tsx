'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, PenTool, Wrench, CheckCircle, RefreshCw,
    Book, Shield, Server, Cpu, Activity, Lock, ChevronRight, FileText
} from 'lucide-react'

// --- DATA: LIFECYCLE with Embeded Standard References ---
const LIFECYCLE_DATA = [
    {
        id: 'assess',
        title: 'Assess',
        subtitle: 'Risk Assessment',
        icon: Search,
        color: 'yellow',
        desc: 'Identify the System under Consideration (SuC), perform detailed risk assessments, and partition the architecture into Zones & Conduits.',
        standards: [
            { id: '3-2', code: 'IEC 62443-3-2', name: 'Risk Assessment & Design', type: 'core' },
            { id: '1-1', code: 'IEC 62443-1-1', name: 'Terminology & Concepts', type: 'ref' }
        ],
        tasks: ['Define SuC & Zones', 'High-Level Risk Assessment', 'Determine SL Targets']
    },
    {
        id: 'design',
        title: 'Design',
        subtitle: 'System Architecture',
        icon: PenTool,
        color: 'blue',
        desc: 'Develop the cybersecurity requirements specification (CRS) and design detailed countermeasures based on Foundational Requirements.',
        standards: [
            { id: '3-3', code: 'IEC 62443-3-3', name: 'System Security Requirements', type: 'core' },
            { id: '4-2', code: 'IEC 62443-4-2', name: 'Component Tech Specs', type: 'ref' }
        ],
        tasks: ['Cybersecurity Requirements (CRS)', 'Defense-in-Depth Design', 'Select Security Controls']
    },
    {
        id: 'implement',
        title: 'Implement',
        subtitle: 'Build & Secure',
        icon: Wrench,
        color: 'purple',
        desc: 'Integrate secure components, configure network segmentation, and implement hardening measures according to design specs.',
        standards: [
            { id: '2-4', code: 'IEC 62443-2-4', name: 'Service Provider Policies', type: 'core' },
            { id: '4-1', code: 'IEC 62443-4-1', name: 'Secure Development Lifecycle', type: 'ref' }
        ],
        tasks: ['Component Integration', 'Hardening & Patching', 'Network Segmentation']
    },
    {
        id: 'verify',
        title: 'Verify',
        subtitle: 'Test & Validate',
        icon: CheckCircle,
        color: 'green',
        desc: 'Conduct Factory (FAT) and Site (SAT) Acceptance Testing to verify that achieved Security Levels meet the targets.',
        standards: [
            { id: '2-1', code: 'IEC 62443-2-1', name: 'CSMS Requirements', type: 'ref' },
            { id: 'FAT', code: 'FAT/SAT', name: 'Acceptance Testing', type: 'core' }
        ],
        tasks: ['Penetration Testing', 'FAT / SAT execution', 'Verify SL-A >= SL-T']
    },
    {
        id: 'maintain',
        title: 'Maintain',
        subtitle: 'Ops & Support',
        icon: RefreshCw,
        color: 'cyan',
        desc: 'Ensure continuous security through monitoring, patch management, and incident response throughout the asset lifecycle.',
        standards: [
            { id: '2-3', code: 'IEC 62443-2-3', name: 'Patch Management', type: 'core' },
            { id: '2-1', code: 'IEC 62443-2-1', name: 'CSMS Operations', type: 'ref' }
        ],
        tasks: ['Continuous Monitoring', 'Patch Management', 'Incident Response']
    }
]

// --- DATA: STANDARD DETAILS ---
const STANDARD_DETAILS: Record<string, { title: string, subtitle: string, desc: string, series: string }> = {
    '1-1': { title: 'Terminology & Concepts', subtitle: 'IEC 62443-1-1', series: 'General (1-X)', desc: 'Defines the common terminology, concepts, and models for Industrial Automation and Control Systems (IACS) security.' },
    '3-2': { title: 'Risk Assessment (ZCR)', subtitle: 'IEC 62443-3-2', series: 'System (3-X)', desc: 'Establishes requirements for defining the System under Consideration (SuC), performing risk assessments, and partitioning into Zones and Conduits.' },
    '3-3': { title: 'System Security Requirements', subtitle: 'IEC 62443-3-3', series: 'System (3-X)', desc: 'Specifies the security requirements for the IACS system based on the Foundational Requirements (FRs) and Security Levels (SLs).' },
    '4-2': { title: 'Component Tech Specs', subtitle: 'IEC 62443-4-2', series: 'Component (4-X)', desc: 'Details the technical security requirements for IACS components (embedded devices, network components, host devices, software applications).' },
    '2-4': { title: 'Service Provider Policies', subtitle: 'IEC 62443-2-4', series: 'Policies (2-X)', desc: 'Specifies requirements for IACS service providers, including integration, maintenance, and legacy support.' },
    '4-1': { title: 'Secure Development Lifecycle', subtitle: 'IEC 62443-4-1', series: 'Component (4-X)', desc: 'Defines the process requirements for the secure development of products used in IACS.' },
    '2-1': { title: 'CSMS Requirements', subtitle: 'IEC 62443-2-1', series: 'Policies (2-X)', desc: 'Defines the elements necessary to establish a Cyber Security Management System (CSMS) for IACS assets.' },
    '2-3': { title: 'Patch Management', subtitle: 'IEC 62443-2-3', series: 'Policies (2-X)', desc: 'Provides requirements and guidance for patch management in the IACS environment.' },
    'FAT': { title: 'Acceptance Testing', subtitle: 'FAT / SAT', series: 'Verification', desc: 'Site Acceptance Testing (SAT) and Factory Acceptance Testing (FAT) to validatethe implementation against the security requirements.' }
}

export default function IECUnifiedSystems() {
    const [activeIdx, setActiveIdx] = useState(0)
    const [selectedStdId, setSelectedStdId] = useState<string | null>(null)
    const activePhase = LIFECYCLE_DATA[activeIdx]

    const selectedStd = selectedStdId ? STANDARD_DETAILS[selectedStdId] : null

    return (
        <div className="w-full">
            {/* 1. TOP NAV: PROGRESS LINE */}
            <div className="relative flex items-center justify-between mb-8 px-4 h-16">
                {/* Connecting Line */}
                <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-white/10 -z-10" />

                {LIFECYCLE_DATA.map((phase, i) => {
                    const isActive = i === activeIdx
                    const isPast = i < activeIdx

                    return (
                        <button
                            key={phase.id}
                            onClick={() => { setActiveIdx(i); setSelectedStdId(null); }}
                            className={`
                                relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300
                                ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'}
                            `}
                        >
                            <div className={`
                                w-12 h-12 rounded-full border-2 flex items-center justify-center bg-black transition-colors duration-300
                                ${isActive ? `border-${phase.color}-500 text-${phase.color}-500 shadow-[0_0_20px_rgba(var(--${phase.color}-rgb),0.5)]` :
                                    isPast ? `border-gray-500 text-gray-500` : 'border-gray-800 text-gray-800'}
                            `}>
                                <phase.icon size={20} />
                            </div>
                            <span className={`
                                absolute top-14 text-xs font-bold uppercase tracking-wider
                                ${isActive ? `text-${phase.color}-400 opacity-100` : 'text-gray-600 opacity-60'}
                            `}>
                                {phase.title}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* 2. BENTO GRID MAIN STAGE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[500px]">

                {/* A. MISSION CONTROL (The Active Phase) - COL SPAN 5 */}
                <div className="lg:col-span-5 relative group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePhase.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-slate-900/50 border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className={`absolute -top-20 -right-20 w-64 h-64 bg-${activePhase.color}-600/20 blur-3xl rounded-full`} />

                            <div className="flex flex-col h-full z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest bg-${activePhase.color}-900/50 text-${activePhase.color}-400 border border-${activePhase.color}-500/30`}>
                                        Phase 0{activeIdx + 1}
                                    </div>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                <h2 className="text-4xl font-black text-white mb-2">{activePhase.title}</h2>
                                <h3 className={`text-xl text-${activePhase.color}-400 mb-6`}>{activePhase.subtitle}</h3>

                                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                    {activePhase.desc}
                                </p>

                                <div className="mt-auto space-y-3">
                                    <h4 className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-4">Execution Checklist</h4>
                                    {activePhase.tasks.map((task, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5">
                                            <div className={`w-5 h-5 rounded-full border border-${activePhase.color}-500/50 flex items-center justify-center`}>
                                                <div className={`w-2 h-2 rounded-full bg-${activePhase.color}-500`} />
                                            </div>
                                            <span className="text-sm text-gray-300 font-medium">{task}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* B. STANDARDS LIBRARY LOCKER - COL SPAN 4 */}
                <div className="lg:col-span-4 flex flex-col gap-6 relative">
                    <div className="h-full bg-slate-950 border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Book size={18} className="text-gray-400" />
                                Required Standards
                            </h3>
                            <Activity size={16} className={`text-${activePhase.color}-500 animate-pulse`} />
                        </div>

                        <div className="space-y-4 relative z-10">
                            <AnimatePresence mode="wait">
                                {activePhase.standards.map((std, i) => (
                                    <motion.div
                                        key={activePhase.id + std.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => setSelectedStdId(std.id)}
                                        className="group cursor-pointer"
                                    >
                                        <div className={`
                                            p-4 rounded-xl border transition-all duration-300 relative overflow-hidden
                                            ${std.type === 'core'
                                                ? `bg-gradient-to-r from-${activePhase.color}-900/20 to-transparent border-${activePhase.color}-500/50 hover:border-${activePhase.color}-400`
                                                : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}
                                            ${selectedStdId === std.id ? 'ring-2 ring-white/50' : ''}
                                        `}>
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-xs font-mono font-bold ${std.type === 'core' ? `text-${activePhase.color}-400` : 'text-gray-500'}`}>
                                                    {std.code}
                                                </span>
                                                {std.type === 'core' && <div className={`w-2 h-2 rounded-full bg-${activePhase.color}-500 shadow-[0_0_10px_currentColor]`} />}
                                            </div>
                                            <div className="font-bold text-gray-200 group-hover:text-white">{std.name}</div>

                                            {/* Click hint */}
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight size={16} className="text-white/50" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* STANDARD DETAIL OVERLAY */}
                        <AnimatePresence>
                            {selectedStd && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl z-20 p-6 flex flex-col"
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedStdId(null); }}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <Shield size={20} />
                                    </button>

                                    <div className={`text-xs font-bold uppercase tracking-widest text-${activePhase.color}-500 mb-2`}>
                                        {selectedStd.series}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-1">{selectedStd.subtitle}</h3>
                                    <h4 className="text-lg font-bold text-gray-400 mb-6">{selectedStd.title}</h4>

                                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                                        {selectedStd.desc}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-white/10">
                                        <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-2">Included Artifacts</div>
                                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                                            <FileText size={12} />
                                            <span>Full Text PDF</span>
                                            <span className="mx-2 text-gray-700">|</span>
                                            <Activity size={12} />
                                            <span>Compliance Checklist</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* C. KEY OUTCOME METRIC - COL SPAN 3 */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className={`h-full bg-gradient-to-b from-${activePhase.color}-900/10 to-black border border-${activePhase.color}-500/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center`}>
                        <div className={`w-20 h-20 rounded-full bg-${activePhase.color}-500/20 flex items-center justify-center mb-4 ring-1 ring-${activePhase.color}-500/50`}>
                            <Lock size={32} className={`text-${activePhase.color}-400`} />
                        </div>
                        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Phase Outcome</div>
                        <div className="text-3xl font-black text-white">Target SL-3</div>
                        <div className="text-sm text-gray-400 mt-2">Verified Security Level</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
