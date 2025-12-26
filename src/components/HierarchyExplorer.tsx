'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronRight, ChevronDown, Building, Server, Cpu, Box,
    Layers, Radio, AlertTriangle, Shield, Database, Code,
    Factory, Zap, Settings, Lock, Fan, Activity
} from 'lucide-react'

// ==================== TYPES ====================
interface TreeNode {
    id: string
    name: string
    type: 'sector' | 'facility' | 'zone' | 'row' | 'rack' | 'device' | 'component' | 'vulnerability'
    sl?: number
    children?: TreeNode[]
    metadata?: Record<string, string>
    epss?: number
    cve?: string
}

// ==================== HIERARCHY DATA ====================
const FACILITY_TREE: TreeNode = {
    id: 'sector-datacenter',
    name: 'Data Center Infrastructure (Tier III)',
    type: 'sector',
    children: [
        {
            id: 'facility-aeon-dc1',
            name: 'AEON Prime Facility',
            type: 'facility',
            sl: 4,
            children: [
                {
                    id: 'zone-7',
                    name: 'Zone 7: Data Hall A',
                    type: 'zone',
                    sl: 4,
                    metadata: { access: 'Biometric', cooling: 'Cold Aisle' },
                    children: [
                        {
                            id: 'row-01',
                            name: 'Row 01 (Mission Critical)',
                            type: 'row',
                            children: [
                                {
                                    id: 'rack-01-a',
                                    name: 'Rack 01-A',
                                    type: 'rack',
                                    children: [
                                        {
                                            id: 'srv-db-01',
                                            name: 'Database Cluster Node 1',
                                            type: 'device',
                                            metadata: { model: 'Dell PowerEdge R750', os: 'RHEL 8' },
                                            children: [
                                                {
                                                    id: 'bmc-01',
                                                    name: 'iDRAC Controller',
                                                    type: 'component',
                                                    children: [
                                                        { id: 'cve-bmc', name: 'CVE-2024-9999 (RCE)', type: 'vulnerability', epss: 0.98, cve: 'CVE-2024-9999' }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'zone-5',
                    name: 'Zone 5: Power Room',
                    type: 'zone',
                    sl: 3,
                    children: [
                        {
                            id: 'gen-01',
                            name: 'Caterpillar 3516B Gen 1',
                            type: 'device',
                            metadata: { protocol: 'Modbus TCP', cap: '2000kW' },
                            children: [
                                {
                                    id: 'ctrl-gen',
                                    name: 'EMCP 4.4 Controller',
                                    type: 'component',
                                    children: [
                                        { id: 'cve-modbus', name: 'Modbus Coil Injection', type: 'vulnerability', epss: 0.45 }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'zone-6',
                    name: 'Zone 6: Cooling Yard',
                    type: 'zone',
                    sl: 2,
                    children: [
                        {
                            id: 'chiller-01',
                            name: 'York YVAA Chiller 1',
                            type: 'device',
                            metadata: { protocol: 'BACnet/IP' }
                        }
                    ]
                }
            ]
        }
    ]
}

// ==================== ICON MAP ====================
const ICON_MAP = {
    sector: Building,
    facility: Factory,
    zone: Shield,
    row: Layers,
    rack: Box,
    device: Server,
    component: Cpu,
    vulnerability: AlertTriangle,
}

const TYPE_COLORS = {
    sector: 'text-purple-400',
    facility: 'text-cyan-400',
    zone: 'text-blue-400',
    row: 'text-indigo-400',
    rack: 'text-green-400',
    device: 'text-yellow-400',
    component: 'text-orange-400',
    vulnerability: 'text-red-400',
}

// ==================== TREE NODE COMPONENT ====================
const TreeNodeItem = ({ node, depth = 0 }: { node: TreeNode; depth?: number }) => {
    const [isExpanded, setIsExpanded] = useState(depth < 3)
    const hasChildren = node.children && node.children.length > 0
    const Icon = ICON_MAP[node.type]
    const colorClass = TYPE_COLORS[node.type]

    return (
        <div className="select-none text-left">
            <motion.div
                className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer
          hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-white/20`}
                style={{ paddingLeft: depth * 12 + 4 }}
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
            >
                {/* Expand/Collapse Icon */}
                <div className="w-3 h-3 flex items-center justify-center shrink-0">
                    {hasChildren ? (
                        isExpanded ? (
                            <ChevronDown size={10} className="text-gray-500" />
                        ) : (
                            <ChevronRight size={10} className="text-gray-500" />
                        )
                    ) : (
                        <div className="w-1 h-1 rounded-full bg-gray-700" />
                    )}
                </div>

                {/* Type Icon */}
                <Icon size={12} className={colorClass} />

                {/* Name */}
                <span className={`text-[10px] truncate ${node.type === 'vulnerability' ? 'text-red-400 font-mono font-bold' : 'text-zinc-300'}`}>
                    {node.name}
                </span>

                {/* SL Badge */}
                {node.sl && (
                    <span className={`ml-auto text-[8px] font-mono px-1 py-0.5 rounded
            ${node.sl >= 4 ? 'bg-red-500/20 text-red-400' :
                            node.sl >= 3 ? 'bg-orange-500/20 text-orange-400' :
                                'bg-yellow-500/20 text-yellow-400'}`}>
                        SL-{node.sl}
                    </span>
                )}

                {/* EPSS Badge */}
                {node.epss && (
                    <span className={`ml-2 text-[8px] font-mono px-1 py-0.5 rounded
            ${node.epss > 0.5 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
                        {(node.epss * 100).toFixed(0)}%
                    </span>
                )}
            </motion.div>

            {/* Children */}
            <AnimatePresence>
                {hasChildren && isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        {/* Connecting Guide Line */}
                        {depth > 0 && (
                            <div className="absolute w-px bg-white/5" style={{ left: depth * 12 + 8, top: 0, bottom: 0 }} />
                        )}
                        {node.children!.map(child => (
                            <TreeNodeItem key={child.id} node={child} depth={depth + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ==================== MAIN COMPONENT ====================
export default function HierarchyExplorer() {
    return (
        <div className="h-full bg-black/40 border border-white/10 rounded-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/40 shrink-0">
                <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                        <Layers size={14} className="text-cyan-400" />
                        Hierarchy
                    </h3>
                    <p className="text-[10px] text-gray-500">Tier III Data Center Asset Tree</p>
                </div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-[9px] font-mono border border-purple-500/30">
                    62443 ZONES
                </div>
            </div>

            {/* Tree View */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <TreeNodeItem node={FACILITY_TREE} />
            </div>

            {/* Footer Stats */}
            <div className="p-2 border-t border-white/10 bg-black/40 flex justify-between text-[9px] text-gray-500">
                <span>Total Assets: 1,420</span>
                <span>Vulnerabilities: <span className="text-red-400">3 Critical</span></span>
            </div>
        </div>
    )
}
