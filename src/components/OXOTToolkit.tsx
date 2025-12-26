'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Layers, FileText, Zap, ChevronRight, Layout } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic imports for heavy components
const EngineeringCanvas = dynamic(() => import('@/components/EngineeringCanvas'), { ssr: false })

export default function OXOTToolkit() {
    const [activeTab, setActiveTab] = useState<'workflow' | 'workshop' | 'canvas'>('workflow')

    const tabs = [
        {
            id: 'workflow',
            label: 'Workflow Architect',
            subtitle: 'Implementation Kanban',
            icon: FileText,
            color: 'blue'
        },
        {
            id: 'workshop',
            label: 'Live Workshop',
            subtitle: 'Interactive App',
            icon: Shield,
            color: 'gold'
        },
        {
            id: 'canvas',
            label: 'Engineering Canvas',
            subtitle: 'Zone Architecture',
            icon: Layers,
            color: 'cyan'
        }
    ]

    return (
        <div className="w-full space-y-8">
            {/* TABS HEADER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    const colorClasses = {
                        blue: isActive ? 'bg-oxot-blue/20 border-oxot-blue text-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-oxot-blue/50 hover:text-gray-300',
                        gold: isActive ? 'bg-oxot-gold/20 border-oxot-gold text-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-oxot-gold/50 hover:text-gray-300',
                        cyan: isActive ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-transparent border-white/10 text-gray-500 hover:border-cyan-500/50 hover:text-gray-300',
                    }
                    const activeColor = colorClasses[tab.color as keyof typeof colorClasses]

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                relative p-6 rounded-xl border-2 transition-all duration-300 text-left group
                                ${activeColor}
                            `}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <tab.icon size={24} className={isActive ? `text-white` : `text-gray-600 group-hover:text-gray-400`} />
                                {isActive && <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                            </div>
                            <div className="font-bold text-lg">{tab.label}</div>
                            <div className="text-xs font-mono uppercase tracking-wider opacity-60">{tab.subtitle}</div>
                        </button>
                    )
                })}
            </div>

            {/* CONTENT AREA */}
            <div className="relative min-h-[800px] border border-white/10 rounded-2xl overflow-hidden bg-slate-950 shadow-2xl">
                <AnimatePresence mode="wait">
                    {activeTab === 'workflow' && (
                        <motion.div
                            key="workflow"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-[800px]"
                        >
                            <div className="absolute top-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur z-10 border-b border-white/5 flex justify-between items-center">
                                <span className="text-xs font-mono text-oxot-blue uppercase tracking-widest flex items-center gap-2">
                                    <FileText size={14} /> Workflow Management Module
                                </span>
                            </div>
                            <iframe
                                src="/Site-8-IEC62443_workshop/iec62443_dashboard.html"
                                className="w-full h-full border-0 pt-12"
                                title="IEC 62443 Workflow Architect"
                            />
                        </motion.div>
                    )}

                    {activeTab === 'workshop' && (
                        <motion.div
                            key="workshop"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-[1200px]"
                        >
                            <div className="absolute top-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur z-10 border-b border-white/5 flex justify-between items-center">
                                <span className="text-xs font-mono text-oxot-gold uppercase tracking-widest flex items-center gap-2">
                                    <Shield size={14} /> Interactive Workshop Module
                                </span>
                            </div>
                            <iframe
                                src="/Site-8-IEC62443_workshop/iec62443_live.html"
                                className="w-full h-full border-0 pt-12"
                                title="IEC 62443 Live Workshop"
                            />
                        </motion.div>
                    )}

                    {activeTab === 'canvas' && (
                        <motion.div
                            key="canvas"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="w-full min-h-[800px] bg-slate-950 p-6"
                        >
                            <div className="mb-6 pb-4 border-b border-white/5 flex justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Engineering Canvas</h3>
                                    <p className="text-gray-400 text-sm">Interactive Zone Architecture & Asset Map</p>
                                </div>
                                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                                    <Layers size={14} /> Architecture Module
                                </span>
                            </div>
                            <EngineeringCanvas />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
