'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain, Layers, Sigma, Lock, Activity,
    Network, Database, ChevronRight, Zap,
    Globe, Server, Cpu, FileCode
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { CoreLinkProvider, useCoreLink } from '@/components/CoreLinkContext'

// Grid Background Component
const GridBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_100%)]" />
    </div>
)

// HUD Status Component
const CoreStatusHUD = () => {
    const { systemStatus, variableR0 } = useCoreLink()

    const statusColor =
        systemStatus === 'BREACH' ? 'text-red-600 animate-pulse' :
            systemStatus === 'CRITICAL' ? 'text-oxot-red animate-pulse' :
                systemStatus === 'WARNING' ? 'text-yellow-500' :
                    'text-green-500'

    return (
        <div className="hidden md:flex items-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColor.split(' ')[0]} ${statusColor.includes('animate') ? 'animate-pulse' : ''}`} />
                <span className={statusColor}>System {systemStatus}</span>
            </div>
            <div className="flex items-center gap-2">
                <Lock size={12} />
                Encrypted [R0: {variableR0}]
            </div>
            <div>
                Latency: <span className="text-white">12ms</span>
            </div>
        </div>
    )
}

// Dynamic Imports for the massive sections
const E27View = dynamic(() => import('@/components/E27View'), {
    loading: () => <div className="h-full flex items-center justify-center text-oxot-blue animate-pulse">Initializing Neural Digital Twin...</div>
})

const SevenLayerArchitectureView = dynamic(() => import('@/components/SevenLayerArchitectureView'), {
    loading: () => <div className="h-full flex items-center justify-center text-green-500 animate-pulse">Loading Structural Integrity Models...</div>
})

const NeuralPhysicsView = dynamic(() => import('@/components/NeuralPhysicsView'), {
    loading: () => <div className="h-full flex items-center justify-center text-oxot-red animate-pulse">Calibrating Physics Engine...</div>
})

export default function AEONCoreHub() {
    return (
        <CoreLinkProvider>
            <AEONCoreHubContent />
        </CoreLinkProvider>
    )
}

function AEONCoreHubContent() {
    const [activeModule, setActiveModule] = useState<'mind' | 'body' | 'physics'>('mind')

    const modules = [
        {
            id: 'mind',
            label: 'The Mind',
            sub: 'Sovereign Logic',
            icon: Brain,
            color: 'text-oxot-blue',
            border: 'border-oxot-blue',
            bg: 'bg-oxot-blue/10'
        },
        {
            id: 'body',
            label: 'The Body',
            sub: 'Architecture',
            icon: Layers,
            color: 'text-green-500',
            border: 'border-green-500',
            bg: 'bg-green-500/10'
        },
        {
            id: 'physics',
            label: 'Neural Physics',
            sub: 'Applied Calculus',
            icon: Sigma,
            color: 'text-oxot-red',
            border: 'border-oxot-red',
            bg: 'bg-oxot-red/10'
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-oxot-blue/30 overflow-x-hidden">
            <GridBackground />

            {/* TOP BAR / HUD */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
                            <Activity className="text-oxot-blue animate-pulse" size={20} />
                            AEON<span className="text-gray-500">_CORE</span>
                        </h1>
                        <span className="text-[9px] text-gray-400 tracking-[0.3em] uppercase">Private Research Lab v4.1</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 mx-2" />

                    {/* Navigation Pills */}
                    <div className="flex gap-2">
                        {modules.map((mod) => (
                            <button
                                key={mod.id}
                                onClick={() => setActiveModule(mod.id as any)}
                                className={`
                                    relative px-4 py-2 rounded-lg border flex items-center gap-3 transition-all duration-300 group
                                    ${activeModule === mod.id
                                        ? `${mod.bg} ${mod.border} ${mod.color}`
                                        : 'bg-transparent border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}
                                `}
                            >
                                <mod.icon size={16} />
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{mod.label}</span>
                                    <span className="text-[8px] opacity-70 uppercase hidden md:block">{mod.sub}</span>
                                </div>
                                {activeModule === mod.id && (
                                    <motion.div
                                        layoutId="active-nav-glow"
                                        className={`absolute inset-0 ${mod.bg} blur-xl -z-10 bg-opacity-50`}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side Status */}
                <CoreStatusHUD />
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="pt-20 px-6 pb-24 relative z-10 max-w-[1920px] mx-auto min-h-screen">
                <AnimatePresence mode="wait">
                    {activeModule === 'mind' && (
                        <motion.div
                            key="mind"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            <div className="mb-8 border-l-2 border-oxot-blue pl-4 py-2">
                                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Sovereign Logic</h2>
                                <p className="text-gray-400 max-w-2xl">
                                    The "Mind" of the Digital Twin. Exploring the 16 Super Labels, the E27 Prediction Pipeline, and the
                                    Ontology of Risk that drives decision making.
                                </p>
                            </div>
                            {/* Embedding existing simple view for now, will enhance later */}
                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <E27View />
                            </div>
                        </motion.div>
                    )}

                    {activeModule === 'body' && (
                        <motion.div
                            key="body"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            <div className="mb-8 border-l-2 border-green-500 pl-4 py-2">
                                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">7-Layer Architecture</h2>
                                <p className="text-gray-400 max-w-2xl">
                                    The "Body" of the Digital Twin. A structural breakdown from Physical processes (Layer 0)
                                    up to the Governance and Social layers (Layer 7).
                                </p>
                            </div>
                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <SevenLayerArchitectureView />
                            </div>
                        </motion.div>
                    )}

                    {activeModule === 'physics' && (
                        <motion.div
                            key="physics"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full"
                        >
                            <div className="col-span-full mb-8 border-l-2 border-oxot-red pl-4 py-2">
                                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Neural Physics</h2>
                                <p className="text-gray-400 max-w-2xl">
                                    The mathematical laws that govern the system. Detailed breakdowns of the
                                    McKenney-Lacan Calculus, Gated Graph Neural Networks, and Fluid Dynamics models.
                                </p>
                            </div>

                            {/* Interactive Physics Module */}
                            <NeuralPhysicsView />

                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}
