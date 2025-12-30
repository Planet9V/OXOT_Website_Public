'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Search, ArrowRight, LayoutGrid, List,
    Brain, Layers, Sigma, Lock, Activity,
    Network, Database, ChevronRight, Zap,
    Globe, Server, Cpu, FileCode, ChevronDown
} from 'lucide-react'
import { OXOTLogo } from './branding/OXOTLogo'
import { PageHeader } from './branding/PageHeader'
import dynamic from 'next/dynamic'
import { CoreLinkProvider, useCoreLink } from '@/components/CoreLinkContext'
import { THEORY_MODULES, TheoryCategory } from './AEONTheoryManifest'
import { CoreHeroVisualization } from '@/components/CoreHeroVisualization'

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
    loading: () => <div className="h-full flex items-center justify-center text-oxot-red animate-pulse">Initializing Physics Engine...</div>
})

export default function AEONCoreHub() {
    return (
        <div className="min-h-screen w-full bg-[#050505] relative overflow-hidden text-white font-sans selection:bg-oxot-gold/30">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-oxot-blue/10 via-transparent to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-oxot-blue/5 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-oxot-gold/5 rounded-full blur-[120px]" />
            </div>

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 p-4 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <CoreHeroVisualization />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 text-center flex flex-col items-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8"
                    >
                        <OXOTLogo size="lg" animated={true} />
                    </motion.div>

                    <PageHeader
                        title="AEON CORE"
                        subtitle="System Core // Titan v4.1 // The Neural Engine of Sovereign Digital Immunity."
                        variant="hero"
                        accent="blue"
                        className="mb-12"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
                            Exploring the 16 Super Labels, the E27 Prediction Pipeline, and the
                            Ontology of Risk that drives autonomous decision making.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">Initialize Interface</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </motion.div>
            </section>

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-24">
                <CoreLinkProvider>
                    <AEONCoreHubContent />
                </CoreLinkProvider>
            </div>
        </div>
    )
}

function AEONCoreHubContent() {
    const [activeModule, setActiveModule] = useState<string>('mind')

    const CORE_MODULES = [
        { id: 'mind', label: 'Sovereign Logic', sub: 'The Mind', icon: Brain, bg: 'bg-oxot-blue/20', border: 'border-oxot-blue/50', color: 'text-oxot-blue' },
        { id: 'body', label: '7-Layer Arch', sub: 'The Body', icon: Layers, bg: 'bg-green-500/20', border: 'border-green-500/50', color: 'text-green-500' },
        { id: 'physics', label: 'Neural Physics', sub: 'The Law', icon: Sigma, bg: 'bg-oxot-red/20', border: 'border-oxot-red/50', color: 'text-oxot-red' }
    ]

    return (
        <>
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center">
                    <div>
                        <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
                            <Activity className="text-oxot-blue animate-pulse" size={20} />
                            AEON<span className="text-gray-500">_CORE</span>
                        </h1>
                        <span className="text-[9px] text-gray-400 tracking-[0.3em] uppercase">Private Research Lab v4.1</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 mx-6" />

                    {/* Navigation Pills */}
                    <div className="flex gap-2">
                        {CORE_MODULES.map((mod) => (
                            <button
                                key={mod.id}
                                onClick={() => setActiveModule(mod.id)}
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
            <main className="min-h-screen">
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
        </>
    )
}

function TheoryCard({ module, viewMode }: { module: any, viewMode: 'grid' | 'list' }) {
    const Icon = module.icon

    // Category Color Mapping
    const catColor = {
        'Structure': 'text-cyan-400 group-hover:text-cyan-300',
        'Dynamics': 'text-purple-400 group-hover:text-purple-300',
        'Cognition': 'text-amber-400 group-hover:text-amber-300',
        'Security': 'text-red-400 group-hover:text-red-300',
        'Economics': 'text-emerald-400 group-hover:text-emerald-300'
    }[module.category as string] || 'text-blue-400'

    const catBorder = {
        'Structure': 'group-hover:border-cyan-500/50',
        'Dynamics': 'group-hover:border-purple-500/50',
        'Cognition': 'group-hover:border-amber-500/50',
        'Security': 'group-hover:border-red-500/50',
        'Economics': 'group-hover:border-emerald-500/50'
    }[module.category as string] || 'group-hover:border-blue-500/50'

    if (viewMode === 'list') {
        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group relative overflow-hidden bg-black/40 border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300 ${catBorder}`}
            >
                <Link href={`/theory/${module.slug}`} className="flex items-center gap-6 p-6">
                    <div className={`p-3 rounded-lg bg-white/5 ${catColor} transition-colors`}>
                        <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-white group-hover:text-oxot-gold transition-colors truncate">{module.title}</h3>
                            <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 ${catColor} opacity-70`}>
                                {module.category}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{module.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
            </motion.div>
        )
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`group relative h-full flex flex-col bg-black/40 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 ${catBorder}`}
        >
            <Link href={`/theory/${module.slug}`} className="flex flex-col h-full p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg bg-white/5 ${catColor} transition-colors`}>
                        <Icon size={24} />
                    </div>
                    <span className={`text-[9px] uppercase font-mono px-2 py-1 rounded border border-white/10 bg-white/5 ${catColor} opacity-70`}>
                        {module.category}
                    </span>
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-oxot-gold transition-colors leading-tight">
                        {module.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {module.description}
                    </p>
                </div>

                <div className="mt-6 flex items-center text-xs font-mono text-gray-600 group-hover:text-white transition-colors uppercase tracking-wider">
                    <span>Explore Module</span>
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </Link>
        </motion.div>
    )
}
