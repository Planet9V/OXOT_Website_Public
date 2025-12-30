'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play, RotateCcw, Activity, Zap, Network,
    CheckCircle, XCircle, Clock, AlertTriangle,
    TrendingUp, ArrowRight
} from 'lucide-react'

// Simulation phases
const SIMULATION_PHASES = [
    { id: 'ising', name: 'Ising Phase Transition', icon: Zap, duration: 1500, description: 'Modeling network as spin system, testing collapse probability' },
    { id: 'granovetter', name: 'Granovetter Cascade', icon: Activity, duration: 1200, description: 'Simulating threshold-based propagation dynamics' },
    { id: 'spectral', name: 'Spectral Analysis', icon: Network, duration: 1000, description: 'Computing adjacency matrix eigenvalues' }
]

// Comparison data
const COMPARISON_DATA = {
    traditional: {
        label: 'Traditional DD',
        detectionRate: 22,
        avgCost: 5200000,
        timeline: '18 months',
        color: '#6b7280'
    },
    mcde: {
        label: 'MCDE Analysis',
        detectionRate: 87.5,
        avgCost: 1100000,
        timeline: '12 months',
        color: '#D4AF37' // oxot-gold
    }
}

export default function MCDESimulator() {
    const [isRunning, setIsRunning] = useState(false)
    const [currentPhase, setCurrentPhase] = useState(-1)
    const [completedPhases, setCompletedPhases] = useState<number[]>([])
    const [showResults, setShowResults] = useState(false)

    const runSimulation = async () => {
        setIsRunning(true)
        setShowResults(false)
        setCompletedPhases([])

        for (let i = 0; i < SIMULATION_PHASES.length; i++) {
            setCurrentPhase(i)
            await new Promise(resolve => setTimeout(resolve, SIMULATION_PHASES[i].duration))
            setCompletedPhases(prev => [...prev, i])
        }

        setCurrentPhase(-1)
        setIsRunning(false)
        setShowResults(true)
    }

    const reset = () => {
        setIsRunning(false)
        setCurrentPhase(-1)
        setCompletedPhases([])
        setShowResults(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="text-xs font-mono text-oxot-blue uppercase tracking-widest mb-1">
                            Interactive Demo
                        </div>
                        <h3 className="text-xl font-black text-white">M&A Cyber Due Diligence Engine</h3>
                        <p className="text-sm text-gray-500 mt-1">Stress-test target network before you buy</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={runSimulation}
                            disabled={isRunning}
                            className="flex items-center gap-2 px-4 py-2 bg-oxot-gold text-black font-bold text-sm rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Play size={16} />
                            {isRunning ? 'Simulating...' : 'Run Simulation'}
                        </button>
                        <button
                            onClick={reset}
                            className="p-2 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <RotateCcw size={16} className="text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Simulation Phases */}
            <div className="p-6 border-b border-white/10">
                <div className="grid md:grid-cols-3 gap-4">
                    {SIMULATION_PHASES.map((phase, i) => {
                        const Icon = phase.icon
                        const isActive = currentPhase === i
                        const isComplete = completedPhases.includes(i)

                        return (
                            <motion.div
                                key={phase.id}
                                className={`
                                    p-4 rounded-xl border transition-all
                                    ${isActive ? 'bg-oxot-blue/10 border-oxot-blue/50' :
                                        isComplete ? 'bg-oxot-gold/10 border-oxot-gold/30' :
                                            'bg-white/[0.02] border-white/5'}
                                `}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`
                                        w-8 h-8 rounded-lg flex items-center justify-center
                                        ${isActive ? 'bg-oxot-blue/20' : isComplete ? 'bg-oxot-gold/20' : 'bg-white/5'}
                                    `}>
                                        {isComplete ? (
                                            <CheckCircle size={16} className="text-oxot-gold" />
                                        ) : isActive ? (
                                            <Icon size={16} className="text-oxot-blue animate-pulse" />
                                        ) : (
                                            <Icon size={16} className="text-gray-500" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-bold ${isActive ? 'text-oxot-blue' : isComplete ? 'text-oxot-gold' : 'text-white'}`}>
                                        {phase.name}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">{phase.description}</p>

                                {isActive && (
                                    <div className="mt-3">
                                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: phase.duration / 1000 }}
                                                className="h-full bg-oxot-blue rounded-full"
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Results Comparison */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-white/10"
                    >
                        <div className="p-6">
                            <div className="text-xs font-mono text-oxot-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <CheckCircle size={14} />
                                Simulation Complete
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Traditional DD */}
                                <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <XCircle size={16} className="text-gray-400" />
                                        <span className="text-sm font-bold text-gray-400">{COMPARISON_DATA.traditional.label}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Detection Rate</span>
                                            <span className="text-lg font-bold text-gray-400">{COMPARISON_DATA.traditional.detectionRate}%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Avg Post-Merger Cost</span>
                                            <span className="text-lg font-bold text-red-400">${(COMPARISON_DATA.traditional.avgCost / 1000000).toFixed(1)}M</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Integration Timeline</span>
                                            <span className="text-lg font-bold text-gray-400">{COMPARISON_DATA.traditional.timeline}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* MCDE */}
                                <div className="p-4 bg-oxot-gold/10 border border-oxot-gold/30 rounded-xl relative overflow-hidden">
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-oxot-gold text-black text-[10px] font-bold rounded uppercase">
                                        Recommended
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <CheckCircle size={16} className="text-oxot-gold" />
                                        <span className="text-sm font-bold text-oxot-gold">{COMPARISON_DATA.mcde.label}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Detection Rate</span>
                                            <span className="text-lg font-bold text-oxot-gold">{COMPARISON_DATA.mcde.detectionRate}%</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Avg Post-Merger Cost</span>
                                            <span className="text-lg font-bold text-white">${(COMPARISON_DATA.mcde.avgCost / 1000000).toFixed(1)}M</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">Integration Timeline</span>
                                            <span className="text-lg font-bold text-white">{COMPARISON_DATA.mcde.timeline}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Improvement Stats */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="text-center p-3 bg-oxot-blue/10 border border-oxot-blue/20 rounded-lg">
                                    <div className="text-2xl font-black text-oxot-blue">3.9×</div>
                                    <div className="text-xs text-gray-500">Better Detection</div>
                                </div>
                                <div className="text-center p-3 bg-oxot-gold/10 border border-oxot-gold/20 rounded-lg">
                                    <div className="text-2xl font-black text-oxot-gold">-79%</div>
                                    <div className="text-xs text-gray-500">Cyber Costs</div>
                                </div>
                                <div className="text-center p-3 bg-white/5 border border-white/10 rounded-lg">
                                    <div className="text-2xl font-black text-white">-33%</div>
                                    <div className="text-xs text-gray-500">Timeline</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Quote */}
            <div className="p-4 bg-gradient-to-r from-oxot-blue/5 to-transparent">
                <p className="text-sm text-gray-400 italic text-center">
                    "Before you buy a company, let us stress-test their network."
                </p>
            </div>
        </motion.div>
    )
}
