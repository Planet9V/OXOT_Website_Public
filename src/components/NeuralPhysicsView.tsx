'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sigma, FunctionSquare, Network, Activity,
    Zap, GitBranch, RefreshCw, Play, Pause,
    Variable, ArrowRight
} from 'lucide-react'
import { useCoreLink } from '@/components/CoreLinkContext'
import EquationSolver from '@/components/core/EquationSolver'

// --- VISUALIZATION COMPONENTS ---



const GGNNVisualizer = () => {
    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 h-[400px] relative overflow-hidden group hover:border-oxot-blue/50 transition-colors flex flex-col">
            <div className="flex justify-between items-center mb-4 z-10">
                <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                    <Network size={16} className="text-oxot-blue" />
                    Neural Propagation
                </h3>
                <div className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/10 font-mono text-gray-400">
                    Gated Graph Neural Network (GGNN)
                </div>
            </div>

            {/* Canvas Placeholder for now - replaced by CSS animation */}
            <div className="flex-1 relative flex items-center justify-center">
                {/* Central Node */}
                <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] z-20 animate-pulse" />

                {/* Orbital Nodes */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-20 h-1 bg-gradient-to-r from-transparent via-oxot-blue/50 to-transparent origin-left"
                        style={{ rotate: i * 60 }}
                        animate={{ opacity: [0.2, 0.8, 0.2], scaleX: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-oxot-blue rounded-full" />
                    </motion.div>
                ))}

                {/* Secondary Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                    <circle cx="50%" cy="50%" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-gray-600 animate-[spin_10s_linear_infinite]" />
                    <circle cx="50%" cy="50%" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-gray-700 animate-[spin_20s_linear_infinite_reverse]" />
                </svg>
            </div>

            <div className="mt-4 flex gap-4 text-[10px] font-mono text-gray-500">
                <div>Nodes: <span className="text-white">1,402</span></div>
                <div>Edges: <span className="text-white">8,291</span></div>
                <div>Epoch: <span className="text-white">42</span></div>
            </div>
        </div>
    )
}

const EntropyMetric = () => {
    const { entropy, systemStatus } = useCoreLink()

    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-oxot-red/50 transition-colors">
            <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2 mb-6">
                <Activity size={16} className="text-oxot-red" />
                System Entropy (S)
            </h3>

            <div className="flex items-end gap-2 mb-2">
                <div className="text-3xl font-black text-white tracking-tighter">{entropy}</div>
                <div className={`text-xs mb-2 font-bold flex items-center ${systemStatus === 'NOMINAL' ? 'text-green-500' : 'text-oxot-red'}`}>
                    <Variable size={10} className="mr-1" /> {systemStatus}
                </div>
            </div>

            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-oxot-red"
                    animate={{ width: `${(entropy / 10) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed">
                Current measure of disorder within the cognitive graph.
                S = -Σ p_i ln p_i. Critical limit: 5.0.
            </p>
        </div>
    )
}

const UnifiedTensorField = () => {
    // DISC traits (behavioral tendencies)
    const discTraits = ['D', 'I', 'S', 'C'];
    // OCEAN traits (Big Five personality)
    const oceanTraits = ['O', 'C', 'E', 'A', 'N'];
    // Dark Triad dimensions
    const darkTriad = [
        { label: 'M', name: 'Machiavellianism', color: '#8b0000' },
        { label: 'N', name: 'Narcissism', color: '#4a0080' },
        { label: 'P', name: 'Psychopathy', color: '#1a1a2e' }
    ];
    // Tier-1 Cognitive Biases (from RSCH-34)
    const cognitiveBiases = [
        { abbr: 'AUTH', name: 'Authority Bias' },
        { abbr: 'SCAR', name: 'Scarcity Bias' },
        { abbr: 'SOC', name: 'Social Proof' },
        { abbr: 'ANCH', name: 'Anchoring' },
        { abbr: 'CONF', name: 'Confirmation' },
        { abbr: 'AVAIL', name: 'Availability' }
    ];
    // Lacanian registers
    const lacanRegisters = [
        { label: 'R', name: 'Real', color: '#D60000', desc: 'Zero-days, Trauma' },
        { label: 'S', name: 'Symbolic', color: '#00aaff', desc: 'Law, Protocol' },
        { label: 'I', name: 'Imaginary', color: '#00ff88', desc: 'Interface, Trust' }
    ];

    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-oxot-gold/50 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2 mb-1">
                        <Sigma size={16} className="text-oxot-gold" />
                        Unified Psychometric Tensor
                    </h3>
                    <p className="text-[10px] text-gray-500 font-mono">
                        McKenney-Lacan Calculus: P = (DISC ⊗ OCEAN) ⊕ DarkTriad ⊕ Biases
                    </p>
                </div>
                <div className="text-[9px] px-2 py-1 bg-oxot-gold/10 rounded border border-oxot-gold/20 font-mono text-oxot-gold">
                    35+ Dimensions
                </div>
            </div>

            {/* Main Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Layer 1: DISC ⊗ OCEAN Base Tensor (20D) */}
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                    <div className="text-[9px] font-mono text-oxot-blue uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-oxot-blue rounded-full animate-pulse" />
                        Base Tensor (20D)
                    </div>

                    {/* 4x5 Grid representing DISC ⊗ OCEAN */}
                    <div className="relative">
                        {/* Column labels: OCEAN */}
                        <div className="flex justify-end mb-1 pr-1">
                            <div className="flex gap-1">
                                {oceanTraits.map((trait, i) => (
                                    <div key={trait} className="w-5 text-center text-[8px] font-mono text-cyan-400/70">
                                        {trait}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Grid with row labels: DISC */}
                        <div className="flex">
                            {/* Row labels */}
                            <div className="flex flex-col gap-1 mr-1">
                                {discTraits.map((trait) => (
                                    <div key={trait} className="h-5 flex items-center text-[8px] font-mono text-oxot-gold/70">
                                        {trait}
                                    </div>
                                ))}
                            </div>

                            {/* Tensor cells */}
                            <div className="grid grid-cols-5 gap-1">
                                {discTraits.map((d, di) => (
                                    oceanTraits.map((o, oi) => (
                                        <motion.div
                                            key={`${d}${o}`}
                                            className="w-5 h-5 rounded-sm bg-gradient-to-br from-oxot-blue/30 to-oxot-gold/20 border border-white/10"
                                            animate={{
                                                opacity: [0.4, 0.8, 0.4],
                                                scale: [0.95, 1, 0.95]
                                            }}
                                            transition={{
                                                duration: 2 + (di + oi) * 0.2,
                                                repeat: Infinity,
                                                delay: (di * 5 + oi) * 0.1
                                            }}
                                        />
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 text-[8px] text-gray-500 font-mono">
                        P = DISC ⊗ OCEAN
                    </div>
                </div>

                {/* Layer 2: Dark Triad Modulation (3D) */}
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                    <div className="text-[9px] font-mono text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Dark Triad (3D)
                    </div>

                    {/* Triangle visualization */}
                    <div className="relative h-24 flex items-center justify-center">
                        <svg viewBox="0 0 100 80" className="w-full h-full max-w-[120px]">
                            {/* Triangle */}
                            <motion.polygon
                                points="50,5 95,75 5,75"
                                fill="none"
                                stroke="url(#darkTriadGradient)"
                                strokeWidth="2"
                                animate={{
                                    strokeDashoffset: [0, 20],
                                    opacity: [0.6, 1, 0.6]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                strokeDasharray="5 3"
                            />
                            {/* Gradient definition */}
                            <defs>
                                <linearGradient id="darkTriadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b0000" />
                                    <stop offset="50%" stopColor="#4a0080" />
                                    <stop offset="100%" stopColor="#1a1a2e" />
                                </linearGradient>
                            </defs>
                            {/* Vertex labels */}
                            <text x="50" y="4" textAnchor="middle" className="fill-red-500 text-[8px] font-bold">M</text>
                            <text x="97" y="78" textAnchor="start" className="fill-purple-400 text-[8px] font-bold">N</text>
                            <text x="3" y="78" textAnchor="end" className="fill-gray-400 text-[8px] font-bold">P</text>
                            {/* Center glow */}
                            <motion.circle
                                cx="50"
                                cy="52"
                                r="8"
                                fill="rgba(138, 43, 226, 0.3)"
                                animate={{ r: [6, 10, 6], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </svg>
                    </div>

                    <div className="mt-2 space-y-1">
                        {darkTriad.map((dt) => (
                            <div key={dt.label} className="flex items-center gap-2 text-[8px]">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dt.color }} />
                                <span className="text-gray-500">{dt.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Layer 3: Cognitive Bias Gauge Field (12D) */}
                <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                    <div className="text-[9px] font-mono text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        Cognitive Biases (12D)
                    </div>

                    {/* Bias wave visualization */}
                    <div className="relative h-24 overflow-hidden rounded">
                        <svg viewBox="0 0 120 60" className="w-full h-full">
                            {cognitiveBiases.map((bias, i) => (
                                <motion.path
                                    key={bias.abbr}
                                    d={`M 0 ${10 + i * 8} Q 30 ${5 + i * 8 + (i % 2) * 10}, 60 ${10 + i * 8} T 120 ${10 + i * 8}`}
                                    fill="none"
                                    stroke={`rgba(255, 165, 0, ${0.3 + i * 0.1})`}
                                    strokeWidth="1.5"
                                    animate={{
                                        d: [
                                            `M 0 ${10 + i * 8} Q 30 ${5 + i * 8}, 60 ${10 + i * 8} T 120 ${10 + i * 8}`,
                                            `M 0 ${10 + i * 8} Q 30 ${15 + i * 8}, 60 ${10 + i * 8} T 120 ${10 + i * 8}`,
                                            `M 0 ${10 + i * 8} Q 30 ${5 + i * 8}, 60 ${10 + i * 8} T 120 ${10 + i * 8}`
                                        ]
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </svg>

                        {/* Bias labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                            {cognitiveBiases.slice(0, 3).map((bias) => (
                                <span key={bias.abbr} className="text-[7px] text-orange-400/60 font-mono">
                                    {bias.abbr}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-2 text-[8px] text-gray-500 font-mono">
                        B = [Authority, Scarcity, ...]
                    </div>
                </div>
            </div>

            {/* Lacanian Filter & Output */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
                    <span>↓</span>
                    <span className="text-white/60">LACANIAN FILTER ℒ</span>
                    <span>↓</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* RSI Register Output */}
            <div className="flex justify-center gap-4 mb-4">
                {lacanRegisters.map((reg, i) => (
                    <motion.div
                        key={reg.label}
                        className="flex flex-col items-center"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2"
                            style={{
                                borderColor: reg.color,
                                color: reg.color,
                                boxShadow: `0 0 15px ${reg.color}40`
                            }}
                        >
                            {reg.label}
                        </div>
                        <div className="text-[8px] text-gray-500 mt-1">{reg.desc}</div>
                    </motion.div>
                ))}
            </div>

            {/* Musical Score Output */}
            <div className="flex items-center justify-center gap-3 py-3 bg-black/30 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-500 font-mono">OUTPUT:</span>
                <div className="flex items-center gap-2 text-oxot-gold">
                    <span className="text-lg">♪</span>
                    <span className="text-xs font-mono">M(t) = Σᵢ ∫ Bᵢ(t) · K(t-τ) dτ</span>
                    <span className="text-lg">♫</span>
                </div>
                <span className="text-[9px] text-gray-600 font-mono">Musical Score</span>
            </div>

            {/* Footer Formula */}
            <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <code className="text-[10px] text-gray-400 font-mono">
                    R&apos;&apos; = (P<sub>DISC⊗OCEAN</sub> ⊕ P<sub>DarkTriad</sub> ⊕ B<sub>Biases</sub>)<sup>T</sup> · T&apos;&apos; · A&apos;&apos;
                </code>
                <div className="text-[8px] text-gray-600 mt-1">
                    Source: RSCH-07, RSCH-33, RSCH-34, RSCH-37 | McKenney-Lacan Enhancement Analysis
                </div>
            </div>
        </div>
    )
}


export default function NeuralPhysicsView() {
    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Equations & Metrics */}
                <div className="space-y-6">
                    <EquationSolver />
                    <EntropyMetric />
                </div>

                {/* Center Column: Main Visualization (GGNN) */}
                <div className="lg:col-span-2">
                    <GGNNVisualizer />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Full width lower section for Tensors */}
                <div className="lg:col-span-3">
                    <UnifiedTensorField />
                </div>
            </div>
        </div>
    )
}
