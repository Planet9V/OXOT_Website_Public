'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield, AlertTriangle, TrendingUp, TrendingDown,
    Activity, Zap, Network, ChevronRight, Info
} from 'lucide-react'

// Rating scale data
const RATINGS = [
    { grade: 'A', label: 'Excellent', color: '#22c55e', range: '0.00 - 0.15', description: 'Minimal cyber debt. Strong security posture.' },
    { grade: 'B', label: 'Good', color: '#84cc16', range: '0.15 - 0.30', description: 'Manageable risk. Minor remediation needed.' },
    { grade: 'C', label: 'Moderate', color: '#eab308', range: '0.30 - 0.50', description: 'Significant remediation required.' },
    { grade: 'D', label: 'Poor', color: '#f97316', range: '0.50 - 0.70', description: 'Material cyber debt. Price adjustment warranted.' },
    { grade: 'F', label: 'Fail', color: '#ef4444', range: '0.70 - 1.00', description: 'Deal-breaking risk. Walk away or heavy discount.' }
]

// Component breakdown weights
const COMPONENTS = [
    { name: 'Ising Collapse Probability', weight: 0.30, icon: Network, description: 'Network susceptibility to cascading failure under attack' },
    { name: 'Cascade Extent', weight: 0.25, icon: Activity, description: 'Expected fraction of assets compromised from initial breach' },
    { name: 'Spectral Radius', weight: 0.20, icon: Zap, description: 'Maximum eigenvalue indicating propagation speed' },
    { name: 'Patch Velocity', weight: 0.15, icon: TrendingUp, description: 'Mean time to remediate vulnerabilities' },
    { name: 'Incident History', weight: 0.10, icon: AlertTriangle, description: 'Prior breach count relative to asset count' }
]

interface Props {
    rating?: 'A' | 'B' | 'C' | 'D' | 'F'
    score?: number
    interactive?: boolean
}

export default function CyberDurabilityGauge({ rating = 'C', score = 0.42, interactive = true }: Props) {
    const [expanded, setExpanded] = useState(false)
    const [hoveredComponent, setHoveredComponent] = useState<number | null>(null)

    const currentRating = RATINGS.find(r => r.grade === rating) || RATINGS[2]
    const gaugePosition = score * 100 // 0-100%

    return (
        <div className="relative">
            {/* Main Gauge Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-black to-gray-900 border border-white/10 rounded-2xl p-8 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
                            MCDE Analysis Result
                        </div>
                        <h3 className="text-2xl font-black text-white">Cyber Durability Rating</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={20} className="text-gray-500" />
                        <span className="text-xs text-gray-500 font-mono">AEON DIGITAL TWIN</span>
                    </div>
                </div>

                {/* Large Grade Display */}
                <div className="flex items-center gap-8 mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Circular gauge background */}
                        <div className="w-32 h-32 rounded-full border-4 border-gray-800 flex items-center justify-center relative">
                            {/* Animated ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="58"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    className="text-gray-800"
                                />
                                <motion.circle
                                    cx="64"
                                    cy="64"
                                    r="58"
                                    fill="none"
                                    stroke={currentRating.color}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: score }}
                                    transition={{ duration: 1.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    style={{
                                        strokeDasharray: '1 1',
                                    }}
                                />
                            </svg>
                            {/* Grade letter */}
                            <span
                                className="text-6xl font-black"
                                style={{ color: currentRating.color }}
                            >
                                {rating}
                            </span>
                        </div>
                    </motion.div>

                    <div className="flex-1">
                        <div className="text-lg font-bold text-white mb-1">{currentRating.label}</div>
                        <div className="text-sm text-gray-400 mb-4">{currentRating.description}</div>

                        {/* Score bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono text-gray-500">
                                <span>Composite Score</span>
                                <span>{(score * 100).toFixed(0)}/100</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${gaugePosition}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    viewport={{ once: true }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: currentRating.color }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rating Scale Legend */}
                <div className="flex gap-1 mb-6">
                    {RATINGS.map((r, i) => (
                        <div
                            key={i}
                            className={`flex-1 h-2 rounded-sm transition-opacity ${r.grade === rating ? 'opacity-100' : 'opacity-40'}`}
                            style={{ backgroundColor: r.color }}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-600 mb-6">
                    <span>A (Excellent)</span>
                    <span>F (Fail)</span>
                </div>

                {/* Expandable Component Breakdown */}
                {interactive && (
                    <>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <span className="text-sm font-medium text-white">View Component Breakdown</span>
                            <ChevronRight
                                size={16}
                                className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {expanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 space-y-3">
                                        {COMPONENTS.map((comp, i) => {
                                            const Icon = comp.icon
                                            const componentScore = Math.random() * 0.6 + 0.2 // Simulated
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.05] transition-colors"
                                                    onMouseEnter={() => setHoveredComponent(i)}
                                                    onMouseLeave={() => setHoveredComponent(null)}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Icon size={16} className="text-oxot-blue" />
                                                        <span className="text-sm font-medium text-white flex-1">{comp.name}</span>
                                                        <span className="text-xs font-mono text-gray-500">{(comp.weight * 100).toFixed(0)}% weight</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${componentScore * 100}%` }}
                                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                                            className="h-full bg-gradient-to-r from-oxot-blue to-blue-400 rounded-full"
                                                        />
                                                    </div>
                                                    {hoveredComponent === i && (
                                                        <motion.p
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="text-xs text-gray-500 mt-2"
                                                        >
                                                            {comp.description}
                                                        </motion.p>
                                                    )}
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}

                {/* Decorative */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-oxot-blue/5 to-transparent pointer-events-none" />
            </motion.div>
        </div>
    )
}
