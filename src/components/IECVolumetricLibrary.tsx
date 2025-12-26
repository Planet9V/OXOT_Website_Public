'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, Shield, Settings, Server, Cpu, FileText, ChevronRight, X } from 'lucide-react'

// IEC 62443 LIBRARY DATA
const VOLUMES = [
    {
        id: '1-X',
        title: 'General',
        subtitle: 'Concepts & Models',
        color: 'from-blue-600 to-blue-900',
        icon: Book,
        stats: '7 Foundational Reqs',
        description: 'Defines the terminology, concepts, and models for IACS security.',
        artifacts: [
            { id: '1-1', name: 'Terminology & Concepts' },
            { id: '1-2', name: 'Master Glossary' },
            { id: '1-3', name: 'System Security Compliance Metrics' },
            { id: '1-4', name: 'IACS Security Lifecycle' }
        ]
    },
    {
        id: '2-X',
        title: 'Policies & Procedures',
        subtitle: 'Asset Owner',
        color: 'from-purple-600 to-purple-900',
        icon: Shield,
        stats: 'CSMS Program',
        description: 'Guidance for establishing a Cyber Security Management System (CSMS).',
        artifacts: [
            { id: '2-1', name: 'CSMS Requirements' },
            { id: '2-2', name: 'Protection Levels' },
            { id: '2-3', name: 'Patch Management' },
            { id: '2-4', name: 'Service Provider Requirements' }
        ]
    },
    {
        id: '3-X',
        title: 'System',
        subtitle: 'Risk & Design',
        color: 'from-cyan-600 to-cyan-900',
        icon: Server,
        stats: 'Zones & Conduits',
        description: 'Technical requirements for system design and risk assessment.',
        artifacts: [
            { id: '3-1', name: 'Security Technologies' },
            { id: '3-2', name: 'Risk Assessment (ZCR)' },
            { id: '3-3', name: 'System Security Requirements' }
        ]
    },
    {
        id: '4-X',
        title: 'Component',
        subtitle: 'Product Development',
        color: 'from-orange-600 to-orange-900',
        icon: Cpu,
        stats: 'Secure SDLC',
        description: 'Requirements for secure product development and component hardening.',
        artifacts: [
            { id: '4-1', name: 'Secure Product Development (SDL)' },
            { id: '4-2', name: 'Component Security Specs' }
        ]
    }
]

export default function IECVolumetricLibrary() {
    const [selectedVolume, setSelectedVolume] = useState<string | null>(null)

    return (
        <div className="w-full h-[500px] relative perspective-1000 flex items-center justify-center gap-6 p-10 bg-black/20 rounded-2xl border border-white/5 overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 pointer-events-none" />

            {/* VOLUMES (Books) */}
            <div className={`flex gap-8 transition-all duration-500 ${selectedVolume ? 'opacity-30 blur-sm scale-90' : 'opacity-100'}`}>
                {VOLUMES.map((vol) => (
                    <motion.div
                        key={vol.id}
                        layoutId={`book-${vol.id}`}
                        onClick={() => setSelectedVolume(vol.id)}
                        className="relative group cursor-pointer"
                        whileHover={{ y: -20, rotateY: -10 }}
                    >
                        {/* Spine / Side */}
                        <div className={`w-12 h-64 bg-gradient-to-r ${vol.color} rounded-l-md border-l border-white/20 shadow-[10px_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-between py-4 relative z-10 transform-style-3d`}>
                            <div className="text-[10px] font-mono text-white/70 rotate-90 whitespace-nowrap">{vol.id}</div>
                            <div className="text-lg font-black text-white rotate-90 tracking-widest whitespace-nowrap mt-auto mb-auto">{vol.title.split(' ')[0]}</div>
                            <vol.icon size={16} className="text-white/50 mb-2" />
                        </div>

                        {/* Cover Preview (Angled) */}
                        <div className={`absolute top-0 left-12 w-40 h-64 bg-gradient-to-br ${vol.color} rounded-r-md border-t border-b border-r border-white/20 origin-left transform rotate-y-[-15deg] group-hover:rotate-y-[-30deg] transition-transform duration-300 opacity-80 shadow-2xl flex flex-col p-4`}>
                            <div className="text-2xl font-black text-white/20 absolute bottom-2 right-2">{vol.id}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* EXPANDED VIEW OVERLAY */}
            <AnimatePresence>
                {selectedVolume && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-8 flex gap-8 z-50 shadow-2xl"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedVolume(null); }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        {(() => {
                            const vol = VOLUMES.find(v => v.id === selectedVolume)!
                            return (
                                <>
                                    {/* Left: Book Visual */}
                                    <div className={`w-1/3 bg-gradient-to-br ${vol.color} rounded-lg shadow-2xl flex flex-col p-8 relative overflow-hidden`}>
                                        <vol.icon size={120} className="text-white/10 absolute -bottom-10 -right-10" />
                                        <div className="text-4xl font-black text-white mb-2">{vol.id}</div>
                                        <div className="text-2xl font-bold text-white/90">{vol.title}</div>
                                        <div className="text-sm font-mono text-white/60 mt-2 border-t border-white/20 pt-2">{vol.subtitle}</div>

                                        <div className="mt-auto">
                                            <div className="text-[10px] uppercase tracking-widest text-white/50">Core Focus</div>
                                            <div className="text-lg font-bold text-white">{vol.stats}</div>
                                        </div>
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <FileText className="text-cyan-400" />
                                            Standard Artifacts
                                        </h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {vol.artifacts.map((artifact) => (
                                                <div key={artifact.id} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="font-mono text-cyan-500 text-sm">{artifact.id}</div>
                                                        <div className="font-medium text-gray-200">{artifact.name}</div>
                                                    </div>
                                                    <ChevronRight className="text-gray-600 group-hover:text-white transition-colors" size={16} />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                                            <h4 className="text-sm font-bold text-blue-400 mb-1">Knowledge Base Integration</h4>
                                            <p className="text-xs text-gray-400">
                                                Based on the "IEC 62443 Complete Guide" (Oct 2025). This volume defines
                                                critical compliance requirements for {vol.subtitle.toLowerCase()}.
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
