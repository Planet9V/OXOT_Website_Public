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

const TensorField = () => {
    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 h-[300px] relative overflow-hidden group hover:border-purple-500/50 transition-colors flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-wider flex items-center gap-2 mb-4">
                <GitBranch size={16} className="text-purple-500" />
                Psychometric Tensor Field
            </h3>

            <div className="flex-1 rounded border border-white/5 bg-black/20 relative overflow-hidden">
                {/* Simulated Field Visual */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-purple-500/20 rounded-full blur-xl"
                            style={{
                                width: Math.random() * 100 + 50 + 'px',
                                height: Math.random() * 100 + 50 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                animation: `float ${Math.random() * 5 + 5}s infinite alternate ease-in-out`
                            }}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-black text-white/20 mb-2">T_ij</div>
                        <div className="text-[10px] text-purple-400 font-mono tracking-widest uppercase">DISC x OCEAN Mapping</div>
                    </div>
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
                    <TensorField />
                </div>
            </div>
        </div>
    )
}
