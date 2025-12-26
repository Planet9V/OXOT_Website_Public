'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Server, Zap, Thermometer, Shield, Lock, Database, AlertTriangle,
    ChevronRight, Building, Eye, Layers, Activity, Network, Radio
} from 'lucide-react'

// ==================== DATACENTER ZONE DATA ====================
const DC_ZONES = [
    {
        id: 'Z1',
        name: 'Enterprise IT',
        slTier2: 2, slTier4: 2,
        color: 'green',
        description: 'Corporate laptops, file servers, ERP systems. Assumed "dirty" network.',
        assets: ['User Workstations', 'File Servers', 'Email Servers', 'ERP Systems'],
        frPrimary: ['FR1-IAC', 'FR2-UC'],
        rationale: 'Large, complex network with many human users. Focus on boundary enforcement.',
        icon: Server
    },
    {
        id: 'Z2',
        name: 'DC IT (Compute)',
        slTier2: 2, slTier4: 3,
        color: 'cyan',
        description: 'Server racks, storage arrays, hypervisors. Core revenue-generating assets.',
        assets: ['Dell PowerEdge R750', 'NetApp AFF A900', 'VMware vSphere Cluster'],
        frPrimary: ['FR7-RA', 'FR3-SI', 'FR4-DC'],
        rationale: 'Tier III/IV criticality mandates SL-3 for sophisticated threat protection.',
        icon: Database
    },
    {
        id: 'Z3',
        name: 'IT/OT DMZ',
        slTier2: 2, slTier4: 3,
        color: 'orange',
        description: 'Jump servers, patch servers, API gateways. Buffer zone between Enterprise and OT.',
        assets: ['Bastion Hosts', 'WSUS Server', 'Remote Access Gateway'],
        frPrimary: ['FR3-SI', 'FR5-RDF'],
        rationale: 'Boundary must be as secure as the critical zones it protects.',
        icon: Shield
    },
    {
        id: 'Z4',
        name: 'DCIM & Monitoring',
        slTier2: 2, slTier4: 3,
        color: 'purple',
        description: 'DCIM servers, EPMS dashboards, BMS visualization. High-value reconnaissance target.',
        assets: ['Nlyte dcTrack', 'Schneider PowerLogic PM8000', 'Siemens Desigo CC'],
        frPrimary: ['FR3-SI', 'FR4-DC'],
        rationale: 'Compromise provides "map" for attacker - full visibility into OT systems.',
        icon: Eye
    },
    {
        id: 'Z5A',
        name: 'Power Systems (A)',
        slTier2: 2, slTier4: 3,
        color: 'red',
        description: 'UPS, PDU, generator for A-chain. Catastrophic consequence zone.',
        assets: ['Vertiv Liebert EXL S1', 'ServerTech PDU', 'Caterpillar 3516B Gen', 'ASCO 7000 ATS'],
        frPrimary: ['FR7-RA', 'FR3-SI'],
        rationale: 'Tier III/IV: Catastrophic consequence requires SL-3. No single cyber failure allowed.',
        icon: Zap
    },
    {
        id: 'Z5B',
        name: 'Power Systems (B)',
        slTier2: 2, slTier4: 3,
        color: 'red',
        description: 'UPS, PDU, generator for B-chain. Must be cyber-isolated from A-chain for 2N.',
        assets: ['Vertiv Liebert EXL S1 (B)', 'ServerTech PDU (B)', 'Caterpillar Gen (B)'],
        frPrimary: ['FR7-RA', 'FR3-SI'],
        rationale: 'Duplicated zone prevents common-mode cyber failure in Tier IV.',
        icon: Zap
    },
    {
        id: 'Z6A',
        name: 'Cooling Systems (A)',
        slTier2: 2, slTier4: 3,
        color: 'blue',
        description: 'CRAC, chiller, in-row cooling for A-chain. HVAC attack vector.',
        assets: ['Liebert DS CRAC', 'York YVAA Chiller', 'APC InRow RC'],
        frPrimary: ['FR7-RA', 'FR3-SI'],
        rationale: 'Thermal shutdown in minutes if compromised. Must be SL-3 for availability.',
        icon: Thermometer
    },
    {
        id: 'Z6B',
        name: 'Cooling Systems (B)',
        slTier2: 2, slTier4: 3,
        color: 'blue',
        description: 'CRAC, chiller, in-row cooling for B-chain. Cyber-isolated from A.',
        assets: ['Liebert DS CRAC (B)', 'York Chiller (B)', 'APC InRow (B)'],
        frPrimary: ['FR7-RA', 'FR3-SI'],
        rationale: 'Duplicated zone for 2N fault tolerance.',
        icon: Thermometer
    },
    {
        id: 'Z7',
        name: 'Physical Security',
        slTier2: 2, slTier4: 2,
        color: 'yellow',
        description: 'Access control panels, CCTV, biometrics. Compliance/security breach vector.',
        assets: ['HID iCLASS Readers', 'Milestone XProtect NVR', 'Suprema Biometric'],
        frPrimary: ['FR3-SI', 'FR2-UC'],
        rationale: 'Not immediate-downtime vector but critical for compliance. SL-2 baseline.',
        icon: Lock
    }
]

// ==================== CONDUIT DATA ====================
const CONDUITS = [
    { id: 'C-1-3', from: 'Z1', to: 'Z3', label: 'Enterprise→DMZ', protocol: 'SSH/RDP' },
    { id: 'C-3-4', from: 'Z3', to: 'Z4', label: 'DMZ→Monitoring', protocol: 'HTTPS/Patch' },
    { id: 'C-4-5A', from: 'Z4', to: 'Z5A', label: 'Monitoring→Power-A', protocol: 'Modbus (RO)' },
    { id: 'C-4-5B', from: 'Z4', to: 'Z5B', label: 'Monitoring→Power-B', protocol: 'Modbus (RO)' },
    { id: 'C-4-6A', from: 'Z4', to: 'Z6A', label: 'Monitoring→Cooling-A', protocol: 'BACnet (RO)' },
    { id: 'C-4-6B', from: 'Z4', to: 'Z6B', label: 'Monitoring→Cooling-B', protocol: 'BACnet (RO)' },
    { id: 'C-4-7', from: 'Z4', to: 'Z7', label: 'Monitoring→Security', protocol: 'SNMP' },
]

// ==================== MAIN COMPONENT ====================
export default function DatacenterZoneExamples() {
    const [selectedZone, setSelectedZone] = useState<string | null>(null)
    const [selectedTier, setSelectedTier] = useState<2 | 4>(4)

    const zone = selectedZone ? DC_ZONES.find(z => z.id === selectedZone) : null

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Building size={24} className="text-purple-400" />
                        Datacenter Zone Examples
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        IEC 62443 zone architecture for Tier II/III/IV datacenters
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedTier(2)}
                        className={`px-4 py-2 rounded text-sm font-mono transition-all ${selectedTier === 2
                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                            }`}
                    >
                        Tier II (7 Zones)
                    </button>
                    <button
                        onClick={() => setSelectedTier(4)}
                        className={`px-4 py-2 rounded text-sm font-mono transition-all ${selectedTier === 4
                                ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                            }`}
                    >
                        Tier IV (9 Zones)
                    </button>
                </div>
            </div>

            {/* Zone Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {DC_ZONES
                    .filter(z => selectedTier === 4 || !['Z5B', 'Z6B'].includes(z.id))
                    .map(z => {
                        const Icon = z.icon
                        const sl = selectedTier === 4 ? z.slTier4 : z.slTier2
                        return (
                            <button
                                key={z.id}
                                onClick={() => setSelectedZone(z.id)}
                                className={`p-4 rounded-xl border transition-all text-left ${selectedZone === z.id
                                        ? `bg-${z.color}-500/20 border-${z.color}-500/50`
                                        : 'bg-black/40 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Icon size={16} className={`text-${z.color}-400`} />
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sl >= 3 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        SL-{sl}
                                    </span>
                                </div>
                                <div className="text-xs font-mono text-gray-500">{z.id}</div>
                                <div className="text-sm font-bold text-white truncate">{z.name}</div>
                            </button>
                        )
                    })}
            </div>

            {/* Zone Detail */}
            <AnimatePresence>
                {zone && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 bg-black/40 border border-white/10 rounded-xl"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-${zone.color}-500/20 text-${zone.color}-400`}>
                                        {zone.id}
                                    </span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${(selectedTier === 4 ? zone.slTier4 : zone.slTier2) >= 3
                                            ? 'bg-red-500/20 text-red-400'
                                            : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        SL-T {selectedTier === 4 ? zone.slTier4 : zone.slTier2}
                                    </span>
                                </div>
                                <h4 className="text-xl font-bold text-white">{zone.name}</h4>
                                <p className="text-sm text-gray-400 mt-1">{zone.description}</p>
                            </div>
                            <button onClick={() => setSelectedZone(null)} className="text-gray-500 hover:text-white">✕</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Assets */}
                            <div className="p-4 bg-white/5 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase mb-2 flex items-center gap-1">
                                    <Server size={10} /> Key Assets
                                </div>
                                <ul className="space-y-1">
                                    {zone.assets.map((a, i) => (
                                        <li key={i} className="text-xs text-white font-mono">• {a}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* FRs */}
                            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                <div className="text-[10px] text-cyan-400 uppercase mb-2 flex items-center gap-1">
                                    <Shield size={10} /> Primary FRs
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {zone.frPrimary.map(fr => (
                                        <span key={fr} className="px-2 py-1 bg-cyan-500/20 text-xs text-cyan-400 rounded font-mono">{fr}</span>
                                    ))}
                                </div>
                                <a href="#fr-section" className="mt-2 flex items-center gap-1 text-[10px] text-cyan-400 hover:underline">
                                    <ChevronRight size={10} /> View FR details below
                                </a>
                            </div>

                            {/* Rationale */}
                            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                                <div className="text-[10px] text-purple-400 uppercase mb-2 flex items-center gap-1">
                                    <AlertTriangle size={10} /> SL-T Rationale
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed">{zone.rationale}</p>
                            </div>
                        </div>

                        {/* Conduits from this zone */}
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="text-[10px] text-gray-500 uppercase mb-2 flex items-center gap-1">
                                <Network size={10} /> Conduits (Data Flows)
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {CONDUITS.filter(c => c.from === zone.id || c.to === zone.id).map(c => (
                                    <div key={c.id} className="px-3 py-1.5 bg-white/5 rounded border border-white/10 text-xs">
                                        <span className="text-cyan-400 font-mono">{c.id}</span>
                                        <span className="text-gray-500 mx-2">:</span>
                                        <span className="text-white">{c.label}</span>
                                        <span className="text-gray-600 ml-2">({c.protocol})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tier to SL Summary */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Activity size={14} className="text-cyan-400" />
                    Uptime Tier → SL-T Mapping Summary
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-[10px]">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-2 text-gray-500">Zone</th>
                                <th className="text-center py-2 text-green-400">Tier I</th>
                                <th className="text-center py-2 text-yellow-400">Tier II</th>
                                <th className="text-center py-2 text-orange-400">Tier III</th>
                                <th className="text-center py-2 text-red-400">Tier IV</th>
                                <th className="text-left py-2 text-gray-500">FRs</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono">
                            {[
                                { zone: 'Z5 Power OT', t1: 2, t2: 2, t3: 3, t4: 3, frs: 'FR7-RA, FR3-SI' },
                                { zone: 'Z6 Cooling OT', t1: 2, t2: 2, t3: 3, t4: 3, frs: 'FR7-RA, FR3-SI' },
                                { zone: 'Z4 DCIM', t1: 2, t2: 2, t3: 3, t4: 3, frs: 'FR4-DC, FR3-SI' },
                                { zone: 'Z2 DC IT', t1: 2, t2: 2, t3: 3, t4: 3, frs: 'FR7-RA, FR4-DC' },
                                { zone: 'Z7 Physical', t1: 2, t2: 2, t3: 2, t4: 2, frs: 'FR3-SI, FR2-UC' },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-2 text-white">{row.zone}</td>
                                    <td className="py-2 text-center"><span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">SL-{row.t1}</span></td>
                                    <td className="py-2 text-center"><span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">SL-{row.t2}</span></td>
                                    <td className="py-2 text-center"><span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400">SL-{row.t3}</span></td>
                                    <td className="py-2 text-center"><span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">SL-{row.t4}</span></td>
                                    <td className="py-2 text-cyan-400">{row.frs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                    <strong>Key Insight:</strong> Tier III/IV facilities require SL-3 for Power (Z5) and Cooling (Z6) zones due to catastrophic consequence of downtime. Tier IV additionally requires zone duplication (A/B chains) to prevent common-mode cyber failures.
                </div>
            </div>

            {/* Link to SOC */}
            <a
                href="/soc#datacenter"
                className="flex items-center justify-center gap-2 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/20 transition-all"
            >
                <Building size={16} />
                <span className="font-bold">View Interactive 3D Datacenter Model</span>
                <ChevronRight size={16} />
            </a>
        </div>
    )
}
