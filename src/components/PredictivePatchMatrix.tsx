'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ReferenceLine, AreaChart, Area
} from 'recharts'
import {
    AlertTriangle, Shield, CheckCircle, Activity, Play,
    TrendingUp, TrendingDown, Clock, Zap, Target
} from 'lucide-react'

// ==================== TYPES ====================
interface CVE {
    id: string
    score: number // EPSS 0-1
    tippingPoint: number // Granovetter Threshold
    description: string
    status: 'new' | 'investigating' | 'patching' | 'deferred'
    timestamp: string
}

// ==================== MATH UTILS ====================
// Granovetter Threshold Model:
// N(t+1) = N(t) + (1 - N(t)) * F(N(t))
// where F(x) is the distribution of thresholds
const generateThresholdData = () => {
    const data = []
    let adoption = 0
    const threshold = 0.45 // Tipping point

    for (let i = 0; i < 50; i++) {
        // Hamiltonian energy function simulation
        const energy = Math.random() * 0.1
        // Epidemic spreading logic
        if (adoption > threshold) {
            adoption += (1 - adoption) * 0.2 // Cascade effect
        } else {
            adoption += energy * 0.1 // Slow growth
        }

        data.push({
            time: i,
            adoption: Math.min(adoption * 100, 100),
            threshold: threshold * 100,
            risk: adoption > threshold ? 'High' : 'Low'
        })
    }
    return data
}

// ==================== MAIN COMPONENT ====================
export default function PredictivePatchMatrix() {
    const [data, setData] = useState(generateThresholdData())
    const [ingestionFeed, setIngestionFeed] = useState<CVE[]>([
        { id: 'CVE-2024-0001', score: 0.98, tippingPoint: 0.8, description: 'VPN Bypass', status: 'new', timestamp: '14:20:01' },
        { id: 'CVE-2024-1111', score: 0.12, tippingPoint: 0.5, description: 'UPS RCE', status: 'investigating', timestamp: '14:19:45' }
    ])

    // Real-time pulse simulation
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate live data updates
            if (Math.random() > 0.7) {
                const newCVE = {
                    id: `CVE-2025-${Math.floor(Math.random() * 9000) + 1000}`,
                    score: Math.random(),
                    tippingPoint: 0.4 + Math.random() * 0.4,
                    description: ['Heap Overflow', 'SQL Injection', 'RCE', 'Auth Bypass'][Math.floor(Math.random() * 4)],
                    status: 'new' as const,
                    timestamp: new Date().toLocaleTimeString()
                }
                setIngestionFeed(prev => [newCVE, ...prev].slice(0, 5))
            }
            // Regenerate graph slight variation
            setData(prev => prev.map(p => ({
                ...p,
                adoption: Math.min(100, Math.max(0, p.adoption + (Math.random() - 0.4)))
            })))
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left: Granovetter Threshold Graph */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <Activity className="text-cyan-400" size={18} />
                            Aeon Threat Calculus
                        </h3>
                        <p className="text-[10px] text-gray-400 font-mono uppercase">Hamiltonian Pulse / Granovetter Threshold</p>
                    </div>
                    <div className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-bold animate-pulse">
                        CRITICALITY: HIGH
                    </div>
                </div>

                <div className="flex-1 min-h-[250px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="time" hide />
                            <YAxis domain={[0, 100]} stroke="#666" fontSize={10} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                itemStyle={{ fontSize: '12px' }}
                            />
                            <ReferenceLine y={45} stroke="red" strokeDasharray="3 3" label={{ value: 'Tipping Point', fill: 'red', fontSize: 10 }} />
                            <Line
                                type="monotone"
                                dataKey="adoption"
                                stroke="#06b6d4"
                                strokeWidth={2}
                                dot={false}
                                animationDuration={1000}
                            />
                            <Area type="monotone" dataKey="adoption" fill="url(#colorAdoption)" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Math Overlay */}
                    <div className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur rounded border border-white/5 text-[9px] font-mono text-gray-400 pointer-events-none">
                        H = -∑ J_ij * σ_i * σ_j
                    </div>
                </div>
            </div>

            {/* Right: Ingestion & Decision Matrix */}
            <div className="flex flex-col gap-4">
                {/* Decision Logic Cards */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-lg text-center">
                        <div className="text-xs text-red-400 font-bold mb-1">NOW (Immediate)</div>
                        <div className="text-2xl font-black text-white">4</div>
                        <div className="text-[9px] text-gray-500">EPSS &gt; 0.8</div>
                    </div>
                    <div className="p-3 bg-yellow-950/30 border border-yellow-500/30 rounded-lg text-center">
                        <div className="text-xs text-yellow-400 font-bold mb-1">NEXT (Maint)</div>
                        <div className="text-2xl font-black text-white">12</div>
                        <div className="text-[9px] text-gray-500">EPSS 0.2 - 0.8</div>
                    </div>
                    <div className="p-3 bg-green-950/30 border border-green-500/30 rounded-lg text-center">
                        <div className="text-xs text-green-400 font-bold mb-1">NEVER (Defer)</div>
                        <div className="text-2xl font-black text-white">48</div>
                        <div className="text-[9px] text-gray-500">EPSS &lt; 0.2</div>
                    </div>
                </div>

                {/* Ingestion Feed */}
                <div className="flex-1 bg-black/40 border border-white/10 rounded-xl overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                            <Zap size={12} className="text-yellow-400" />
                            Live Ingestion Stream
                        </span>
                        <span className="text-[9px] text-gray-500 font-mono">Real-time CVE Feed</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                        <AnimatePresence>
                            {ingestionFeed.map((cve) => (
                                <motion.div
                                    key={cve.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`p-2 rounded border text-xs flex items-center justify-between
                                    ${cve.score > cve.tippingPoint
                                            ? 'bg-red-950/20 border-red-500/30'
                                            : 'bg-zinc-900/50 border-white/5'}`}
                                >
                                    <div>
                                        <div className={`font-mono font-bold ${cve.score > cve.tippingPoint ? 'text-red-400' : 'text-gray-300'}`}>
                                            {cve.id}
                                        </div>
                                        <div className="text-[10px] text-gray-500">{cve.description}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-bold ${cve.score > cve.tippingPoint ? 'text-red-400' : 'text-cyan-400'}`}>
                                            {(cve.score * 100).toFixed(0)}%
                                        </div>
                                        <div className="text-[9px] text-gray-600 font-mono">{cve.timestamp}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
