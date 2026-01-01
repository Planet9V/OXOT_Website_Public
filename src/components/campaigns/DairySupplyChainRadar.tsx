'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Radar, AlertTriangle, Truck, Factory, Milk,
    TrendingDown, Shield, ChevronRight, Activity, Thermometer
} from 'lucide-react'

// "Grass to Glass" visibility metrics
const RISK_SCENARIOS = [
    { name: 'Milk Collection (Ransomware)', impact: '€12M/day', color: '#ef4444', description: 'Logistics Halt' },
    { name: 'Borculo Plant (ICS Malware)', impact: '€45M/week', color: '#f97316', description: 'Production Stop' },
    { name: 'Quality Data (Manipulation)', impact: 'Recall', color: '#eab308', description: 'Safety Violation' },
    { name: 'Cold Chain (IoT Attack)', impact: 'Spoilage', color: '#22c55e', description: 'Asset Loss' } // Green because we catch it? Or maybe red/orange. Let's make it orange.
]

// Supply Chain Tree
const SUPPLY_CHAIN_TREE = [
    {
        name: 'FrieslandCampina Global',
        depth: 0,
        health: 0.92,
        children: [
            {
                name: 'Member Farms (10,000+)',
                depth: 1,
                health: 0.78,
                alert: 'Unpatched Milking Robots',
                children: [
                    { name: 'Lely Astronaut A5', depth: 2, health: 0.65, children: [] },
                    { name: 'DeLaval VMS', depth: 2, health: 0.82, children: [] },
                    { name: 'Farm Network Gateway', depth: 2, health: 0.45, alert: 'Default Credentials', children: [] }
                ]
            },
            {
                name: 'Logistics & Collection',
                depth: 1,
                health: 0.88,
                children: [
                    { name: 'RMO Truck OT', depth: 2, health: 0.85, children: [] },
                    { name: 'Route Planning (IT)', depth: 2, health: 0.95, children: [] }
                ]
            },
            {
                name: 'Processing (Borculo)',
                depth: 1,
                health: 0.62,
                alert: 'Legacy PLC Vulnerabilities',
                children: [
                    {
                        name: 'Whey Protein Line 1',
                        depth: 2,
                        health: 0.58,
                        alert: 'Air-gap Bridged',
                        children: [
                            { name: 'Siemens S7-300', depth: 3, health: 0.40, alert: 'End of Life', children: [] },
                            { name: 'HMI Workstation', depth: 3, health: 0.75, children: [] }
                        ]
                    },
                    { name: 'Evaporation Unit', depth: 2, health: 0.85, children: [] }
                ]
            }
        ]
    }
]

interface Node {
    name: string
    depth: number
    health: number
    alert?: string
    children: Node[]
}

const ChainNode = ({ node, isLast = false }: { node: Node, isLast?: boolean }) => {
    const [expanded, setExpanded] = useState(node.depth < 2)
    const hasChildren = node.children.length > 0

    const getHealthColor = (health: number) => {
        if (health >= 0.8) return '#22c55e'
        if (health >= 0.6) return '#eab308'
        if (health >= 0.4) return '#f97316'
        return '#ef4444'
    }

    const getIcon = (depth: number, name: string) => {
        if (depth === 0) return <Shield size={16} className="text-oxot-blue" />
        if (name.includes('Farm')) return <Milk size={16} className="text-gray-400" /> // Use Milk icon for farms? Or leaf. Milk fits.
        if (name.includes('Truck')) return <Truck size={16} className="text-gray-400" />
        if (name.includes('Line') || name.includes('Plant')) return <Factory size={16} className="text-gray-400" />
        if (name.includes('Unit')) return <Thermometer size={16} className="text-gray-400" />
        return <Activity size={16} className="text-gray-400" />
    }

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                    ${node.alert ? 'bg-oxot-gold/10 border border-oxot-gold/30' : 'hover:bg-white/[0.05]'}
                `}
                style={{ marginLeft: node.depth * 24 }}
                onClick={() => hasChildren && setExpanded(!expanded)}
            >
                {/* Connector lines */}
                {node.depth > 0 && (
                    <div className="absolute left-0 top-0 bottom-0 flex items-center" style={{ left: (node.depth - 1) * 24 + 12 }}>
                        <div className="w-4 h-px bg-gray-700" />
                    </div>
                )}

                {/* Expand indicator */}
                {hasChildren && (
                    <ChevronRight
                        size={14}
                        className={`text-gray-500 transition-transform ${expanded ? 'rotate-90' : ''}`}
                    />
                )}
                {!hasChildren && <div className="w-3.5" />}

                {/* Icon */}
                {getIcon(node.depth, node.name)}

                {/* Name */}
                <span className="text-sm font-mono text-white flex-1">{node.name}</span>

                {/* Health indicator */}
                <div className="flex items-center gap-2">
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getHealthColor(node.health) }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        {(node.health * 100).toFixed(0)}%
                    </span>
                </div>

                {/* Alert badge */}
                {node.alert && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-oxot-gold/20 rounded text-oxot-gold text-[10px]">
                        <AlertTriangle size={10} />
                        {node.alert}
                    </div>
                )}
            </motion.div>

            {/* Children */}
            {expanded && hasChildren && (
                <div>
                    {node.children.map((child, i) => (
                        <ChainNode
                            key={child.name}
                            node={child}
                            isLast={i === node.children.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function DairySupplyChainRadar() {
    const [visibilityScore] = useState(0.42)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            {/* Header Card */}
            <div className="bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 bg-white/5">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="text-xs font-mono text-oxot-gold uppercase tracking-widest mb-1">
                                Grass to Glass Visibility
                            </div>
                            <h3 className="text-xl font-black text-white">Supply Chain Nerve Center</h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Real-time OT asset visibility from farm to processing.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-xs text-gray-500">Visibility Score</div>
                                <div className="text-2xl font-black text-oxot-gold">{(visibilityScore * 100).toFixed(0)}%</div>
                            </div>
                            <Radar size={32} className="text-oxot-gold" />
                        </div>
                    </div>
                </div>

                {/* Risks Scenarios */}
                <div className="p-6 border-b border-white/5">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                        Modeled Disruption Scenarios
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {RISK_SCENARIOS.map((risk, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-center hover:bg-white/5 transition-colors"
                            >
                                <div
                                    className="text-lg font-bold mb-1"
                                    style={{ color: risk.color }}
                                >
                                    {risk.impact}
                                </div>
                                <div className="text-xs text-white font-medium mb-1">{risk.name}</div>
                                <div className="text-[10px] text-gray-500">{risk.description}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tree Visualization */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                            Live Asset Topology
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500" /> Secure
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-yellow-500" /> Warning
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500" /> Critical
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/50 border border-white/5 rounded-xl p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {SUPPLY_CHAIN_TREE.map((node) => (
                            <ChainNode key={node.name} node={node} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Insight Banner */}
            <div className="p-4 bg-oxot-blue/5 border-l-2 border-oxot-blue rounded-r-xl flex items-start gap-3">
                <Activity size={20} className="text-oxot-blue flex-shrink-0 mt-0.5" />
                <div>
                    <div className="text-oxot-blue font-bold text-sm">Strategic Insight: Borculo Expansion</div>
                    <p className="text-gray-400 text-xs mt-1">
                        Doubling production capacity at Borculo increases the attack surface. Legacy PLCs (S7-300) in the existing line must be segmented from the new high-efficiency expanded lines to prevent lateral movement.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
