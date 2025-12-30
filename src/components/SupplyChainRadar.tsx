'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Radar, AlertTriangle, Clock, Package, GitBranch,
    TrendingDown, Shield, ChevronRight, Bug
} from 'lucide-react'

// Lead time case studies from RSCH-28
const CASE_STUDIES = [
    { name: 'Log4j (2021)', leadTime: 18, color: '#ef4444', description: 'CVE-2021-44228' },
    { name: 'Spring4Shell (2022)', leadTime: 12, color: '#f97316', description: 'CVE-2022-22965' },
    { name: 'OpenSSL (2022)', leadTime: 21, color: '#eab308', description: 'CVE-2022-3602' },
    { name: 'xz Backdoor (2024)', leadTime: 35, color: '#22c55e', description: 'CVE-2024-3094' }
]

// Example dependency tree
const DEPENDENCY_TREE = [
    {
        name: 'Your Application',
        depth: 0,
        health: 0.95,
        children: [
            {
                name: 'express@4.18.2',
                depth: 1,
                health: 0.88,
                children: [
                    { name: 'body-parser@1.20.1', depth: 2, health: 0.92, children: [] },
                    {
                        name: 'qs@6.11.0',
                        depth: 2,
                        health: 0.75,
                        alert: 'Maintainer departure detected',
                        children: [
                            { name: 'side-channel@1.0.4', depth: 3, health: 0.82, children: [] }
                        ]
                    }
                ]
            },
            {
                name: 'lodash@4.17.21',
                depth: 1,
                health: 0.45,
                alert: 'Commit rate dropped 60%',
                children: []
            },
            {
                name: 'axios@1.4.0',
                depth: 1,
                health: 0.68,
                alert: '3 security researcher mentions',
                children: [
                    { name: 'follow-redirects@1.15.2', depth: 2, health: 0.72, children: [] }
                ]
            }
        ]
    }
]

interface DepNode {
    name: string
    depth: number
    health: number
    alert?: string
    children: DepNode[]
}

const DependencyNode = ({ node, isLast = false }: { node: DepNode, isLast?: boolean }) => {
    const [expanded, setExpanded] = useState(node.depth < 2)
    const hasChildren = node.children.length > 0

    const getHealthColor = (health: number) => {
        if (health >= 0.8) return '#22c55e'
        if (health >= 0.6) return '#eab308'
        if (health >= 0.4) return '#f97316'
        return '#ef4444'
    }

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                    ${node.alert ? 'bg-yellow-500/10 border border-yellow-500/30' : 'hover:bg-white/[0.05]'}
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

                {/* Package icon */}
                <Package size={16} className="text-gray-400" />

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
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 rounded text-yellow-400 text-[10px]">
                        <AlertTriangle size={10} />
                        {node.alert}
                    </div>
                )}
            </motion.div>

            {/* Children */}
            {expanded && hasChildren && (
                <div>
                    {node.children.map((child, i) => (
                        <DependencyNode
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

export default function SupplyChainRadar() {
    const [butterflyScore] = useState(0.35)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            {/* Header Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-oxot-gold/20 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="text-xs font-mono text-oxot-gold uppercase tracking-widest mb-1">
                                N-th Order Dependency Intelligence
                            </div>
                            <h3 className="text-xl font-black text-white">Supply Chain Butterfly Radar</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Detect vulnerabilities 3 weeks before public disclosure
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-xs text-gray-500">Butterfly Score</div>
                                <div className="text-2xl font-black text-oxot-gold">{(butterflyScore * 100).toFixed(0)}</div>
                            </div>
                            <Radar size={32} className="text-oxot-gold" />
                        </div>
                    </div>
                </div>

                {/* Lead Time Advantage */}
                <div className="p-6 border-b border-white/5">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                        Proven Lead Time Advantage
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {CASE_STUDIES.map((study, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-center"
                            >
                                <div
                                    className="text-3xl font-black mb-1"
                                    style={{ color: study.color }}
                                >
                                    +{study.leadTime}d
                                </div>
                                <div className="text-sm text-white font-medium">{study.name}</div>
                                <div className="text-xs text-gray-500">{study.description}</div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-oxot-gold/10 border border-oxot-gold/20 rounded-lg text-center">
                        <span className="text-sm text-oxot-gold">
                            <strong className="text-white">Average:</strong> 21.5 days before public disclosure
                        </span>
                    </div>
                </div>

                {/* Dependency Tree Visualization */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                            Target Company Dependency Health
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500" /> Healthy
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-yellow-500" /> Warning
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500" /> Critical
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/50 border border-white/5 rounded-xl p-4 max-h-96 overflow-y-auto">
                        {DEPENDENCY_TREE.map((node) => (
                            <DependencyNode key={node.name} node={node} />
                        ))}
                    </div>
                </div>
            </div>

            {/* M&A Impact Banner */}
            <div className="p-4 bg-gradient-to-r from-blue-900/10 to-transparent border-l-2 border-oxot-blue rounded-r-xl flex items-start gap-3">
                <Bug size={20} className="text-oxot-blue flex-shrink-0 mt-0.5" />
                <div>
                    <div className="text-oxot-blue font-bold text-sm">M&A Due Diligence Insight</div>
                    <p className="text-gray-400 text-xs mt-1">
                        The target's software supply chain shows 3 packages with declining health metrics.
                        This indicates potential future vulnerabilities that should be factored into the
                        cyber debt calculation and post-close remediation timeline.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
