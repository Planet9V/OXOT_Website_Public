'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cpu, Radio, Gauge, Settings, Zap, Thermometer,
    Activity, AlertTriangle, ChevronRight, X, Shield,
    Server, Database, Wifi, Box, Skull, Cloud, Lock,
    Network, Globe, Eye, Layers, Router, Power,
    Factory, Building, Cable, HardDrive, Monitor
} from 'lucide-react'

// ==================== COMPREHENSIVE DATA ====================

// 8 Zones for IEC 62443 architecture
const ZONES = [
    { id: 'zone-cloud', name: 'AEON Cloud (Digital Twin)', sl: 2, x: 20, y: 20, width: 280, height: 140, color: 'purple' },
    { id: 'zone-dmz', name: 'Level 4: Enterprise DMZ', sl: 3, x: 320, y: 20, width: 400, height: 100, color: 'blue' },
    { id: 'zone-local-aeon', name: 'AEON Blue Team Server', sl: 4, x: 20, y: 180, width: 280, height: 160, color: 'cyan' },
    { id: 'zone-control', name: 'Level 3: Site Operations', sl: 3, x: 320, y: 140, width: 400, height: 120, color: 'yellow' },
    { id: 'zone-scada', name: 'Level 2: SCADA/DCS', sl: 4, x: 320, y: 280, width: 400, height: 120, color: 'orange' },
    { id: 'zone-plc', name: 'Level 1: Field Controllers', sl: 3, x: 320, y: 420, width: 400, height: 100, color: 'red' },
    { id: 'zone-process', name: 'Level 0: Process/OT', sl: 2, x: 320, y: 540, width: 400, height: 100, color: 'gray' },
    { id: 'zone-ext', name: 'External Connections', sl: 1, x: 740, y: 20, width: 180, height: 200, color: 'slate' },
]

// 45+ Components across all zones
const COMPONENTS = [
    // === AEON CLOUD ===
    { id: 'aeon-core', type: 'cloud', name: 'AEON Core', zone: 'zone-cloud', sl: 2, status: 'online', x: 60, y: 50, desc: 'Central Digital Twin Engine' },
    { id: 'aeon-red', type: 'server', name: 'Red Team AI', zone: 'zone-cloud', sl: 2, status: 'online', x: 140, y: 50, desc: 'Attack Simulation' },
    { id: 'aeon-gold', type: 'server', name: 'Gold Team', zone: 'zone-cloud', sl: 2, status: 'online', x: 220, y: 50, desc: 'Business Context' },
    { id: 'threat-intel', type: 'database', name: 'Threat Intel DB', zone: 'zone-cloud', sl: 2, status: 'online', x: 100, y: 110, desc: 'CVE/EPSS/APT Data' },
    { id: 'sim-engine', type: 'cpu', name: 'Simulation', zone: 'zone-cloud', sl: 2, status: 'online', x: 180, y: 110, desc: 'Attack Path Analysis' },

    // === DATA DIODE / DMZ ===
    { id: 'data-diode', type: 'lock', name: 'Data Diode', zone: 'zone-dmz', sl: 3, status: 'online', x: 360, y: 55, desc: 'Unidirectional Gateway' },
    { id: 'fw-ext', type: 'shield', name: 'Edge Firewall', zone: 'zone-dmz', sl: 3, status: 'online', x: 440, y: 55, desc: 'Palo Alto PA-5260' },
    { id: 'jump-srv', type: 'server', name: 'Jump Server', zone: 'zone-dmz', sl: 3, status: 'online', x: 520, y: 55, desc: 'Privileged Access' },
    { id: 'siem-fwd', type: 'database', name: 'SIEM Forwarder', zone: 'zone-dmz', sl: 3, status: 'online', x: 600, y: 55, desc: 'Splunk UF' },
    { id: 'proxy', type: 'router', name: 'Proxy Server', zone: 'zone-dmz', sl: 3, status: 'online', x: 680, y: 55, desc: 'Zscaler ZPA' },

    // === LOCAL AEON BLUE TEAM ===
    { id: 'blue-srv', type: 'server', name: 'Blue Team Server', zone: 'zone-local-aeon', sl: 4, status: 'online', x: 60, y: 220, desc: 'On-Premise AEON' },
    { id: 'telemetry', type: 'database', name: 'Telemetry Store', zone: 'zone-local-aeon', sl: 4, status: 'online', x: 140, y: 220, desc: 'Local Event DB' },
    { id: 'local-twin', type: 'cpu', name: 'Local Twin', zone: 'zone-local-aeon', sl: 4, status: 'online', x: 220, y: 220, desc: 'Facility Model' },
    { id: 'collector', type: 'network', name: 'Collector', zone: 'zone-local-aeon', sl: 4, status: 'online', x: 100, y: 280, desc: 'OT Protocol Parser' },
    { id: 'decision-eng', type: 'cpu', name: 'Decision Engine', zone: 'zone-local-aeon', sl: 4, status: 'online', x: 180, y: 280, desc: 'Autonomous Response' },

    // === SITE OPERATIONS (Level 3) ===
    { id: 'historian', type: 'database', name: 'Historian', zone: 'zone-control', sl: 3, status: 'online', x: 360, y: 180, desc: 'OSIsoft PI' },
    { id: 'eng-ws', type: 'monitor', name: 'Eng Workstation', zone: 'zone-control', sl: 3, status: 'online', x: 440, y: 180, desc: 'PLC Programming' },
    { id: 'ot-fw', type: 'shield', name: 'OT Firewall', zone: 'zone-control', sl: 3, status: 'online', x: 520, y: 180, desc: 'Fortinet FortiGate' },
    { id: 'patch-srv', type: 'server', name: 'Patch Server', zone: 'zone-control', sl: 3, status: 'online', x: 600, y: 180, desc: 'WSUS/Ansible' },
    { id: 'av-srv', type: 'shield', name: 'Antivirus', zone: 'zone-control', sl: 3, status: 'online', x: 680, y: 180, desc: 'CrowdStrike' },

    // === SCADA/DCS (Level 2) ===
    { id: 'scada-srv', type: 'server', name: 'SCADA Server', zone: 'zone-scada', sl: 4, status: 'online', x: 360, y: 320, desc: 'Wonderware' },
    { id: 'hmi-1', type: 'monitor', name: 'HMI #1', zone: 'zone-scada', sl: 4, status: 'online', x: 440, y: 320, desc: 'Operator Station' },
    { id: 'hmi-2', type: 'monitor', name: 'HMI #2', zone: 'zone-scada', sl: 4, status: 'warning', x: 520, y: 320, desc: 'Backup Station' },
    { id: 'dcs-ctrl', type: 'cpu', name: 'DCS Controller', zone: 'zone-scada', sl: 4, status: 'online', x: 600, y: 320, desc: 'Honeywell PKS' },
    { id: 'sis', type: 'shield', name: 'Safety PLC', zone: 'zone-scada', sl: 4, status: 'online', x: 680, y: 320, desc: 'Triconex TriStation' },

    // === FIELD CONTROLLERS (Level 1) ===
    { id: 'plc-1', type: 'cpu', name: 'PLC Power', zone: 'zone-plc', sl: 3, status: 'online', x: 360, y: 460, desc: 'S7-1500' },
    { id: 'plc-2', type: 'cpu', name: 'PLC HVAC', zone: 'zone-plc', sl: 3, status: 'online', x: 440, y: 460, desc: 'Allen-Bradley' },
    { id: 'plc-3', type: 'cpu', name: 'PLC Process', zone: 'zone-plc', sl: 3, status: 'warning', x: 520, y: 460, desc: 'Modicon M340' },
    { id: 'rtu-1', type: 'cpu', name: 'RTU', zone: 'zone-plc', sl: 3, status: 'online', x: 600, y: 460, desc: 'SEL-2411' },
    { id: 'io-rack', type: 'harddrive', name: 'Remote I/O', zone: 'zone-plc', sl: 3, status: 'online', x: 680, y: 460, desc: 'Profinet' },

    // === PROCESS / OT (Level 0) ===
    { id: 'gen-1', type: 'power', name: 'Generator 1', zone: 'zone-process', sl: 2, status: 'online', x: 360, y: 580, desc: 'CAT 3516B' },
    { id: 'gen-2', type: 'power', name: 'Generator 2', zone: 'zone-process', sl: 2, status: 'online', x: 420, y: 580, desc: 'CAT 3516B' },
    { id: 'ups', type: 'power', name: 'UPS System', zone: 'zone-process', sl: 2, status: 'online', x: 480, y: 580, desc: 'Vertiv EXL' },
    { id: 'chiller', type: 'factory', name: 'Chiller', zone: 'zone-process', sl: 2, status: 'online', x: 540, y: 580, desc: 'York YVWA' },
    { id: 'crah', type: 'factory', name: 'CRAH Unit', zone: 'zone-process', sl: 2, status: 'online', x: 600, y: 580, desc: 'Liebert CRV' },
    { id: 'pdu', type: 'power', name: 'PDU', zone: 'zone-process', sl: 2, status: 'online', x: 660, y: 580, desc: 'Raritan PX3' },
    { id: 'bms', type: 'cpu', name: 'BMS', zone: 'zone-process', sl: 2, status: 'online', x: 720, y: 580, desc: 'Metasys NAE' },

    // === EXTERNAL CONNECTIONS ===
    { id: 'vendor-vpn', type: 'globe', name: 'Vendor VPN', zone: 'zone-ext', sl: 1, status: 'online', x: 780, y: 60, desc: 'Remote Access' },
    { id: 'internet', type: 'cloud', name: 'Internet', zone: 'zone-ext', sl: 1, status: 'online', x: 860, y: 60, desc: 'Public Network' },
    { id: 'isp-1', type: 'router', name: 'ISP Primary', zone: 'zone-ext', sl: 1, status: 'online', x: 780, y: 120, desc: 'AT&T MPLS' },
    { id: 'isp-2', type: 'router', name: 'ISP Backup', zone: 'zone-ext', sl: 1, status: 'online', x: 860, y: 120, desc: 'Verizon LTE' },
    { id: 'cloud-siem', type: 'database', name: 'Cloud SIEM', zone: 'zone-ext', sl: 1, status: 'online', x: 820, y: 180, desc: 'Splunk Cloud' },
]

// Data Flows (connections between components)
const DATA_FLOWS = [
    // Cloud to Local Blue Team (via Data Diode)
    { id: 'f1', from: 'aeon-core', to: 'data-diode', protocol: 'Threat Intel', color: 'purple' },
    { id: 'f2', from: 'data-diode', to: 'blue-srv', protocol: 'One-Way Feed', color: 'cyan' },
    { id: 'f3', from: 'blue-srv', to: 'fw-ext', protocol: 'Encrypted Upload', color: 'cyan' },
    { id: 'f4', from: 'fw-ext', to: 'aeon-core', protocol: 'Telemetry/Logs', color: 'purple' },

    // Blue Team to OT Network
    { id: 'f5', from: 'collector', to: 'ot-fw', protocol: 'SPAN/TAP', color: 'green' },
    { id: 'f6', from: 'collector', to: 'local-twin', protocol: 'Asset Update', color: 'cyan' },
    { id: 'f7', from: 'decision-eng', to: 'ot-fw', protocol: 'Block Rules', color: 'red' },

    // DMZ flows
    { id: 'f8', from: 'siem-fwd', to: 'cloud-siem', protocol: 'HEC', color: 'blue' },
    { id: 'f9', from: 'jump-srv', to: 'eng-ws', protocol: 'RDP', color: 'yellow' },
    { id: 'f10', from: 'vendor-vpn', to: 'proxy', protocol: 'SSL VPN', color: 'slate' },

    // Site Operations
    { id: 'f11', from: 'historian', to: 'scada-srv', protocol: 'OPC-UA', color: 'orange' },
    { id: 'f12', from: 'eng-ws', to: 'plc-1', protocol: 'S7Comm', color: 'yellow' },
    { id: 'f13', from: 'patch-srv', to: 'hmi-1', protocol: 'WSUS', color: 'blue' },

    // SCADA to Field
    { id: 'f14', from: 'scada-srv', to: 'plc-1', protocol: 'Modbus TCP', color: 'orange' },
    { id: 'f15', from: 'hmi-1', to: 'plc-2', protocol: 'Profinet', color: 'orange' },
    { id: 'f16', from: 'dcs-ctrl', to: 'rtu-1', protocol: 'DNP3', color: 'orange' },
    { id: 'f17', from: 'sis', to: 'plc-3', protocol: 'TSAA', color: 'red' },

    // Field to Process
    { id: 'f18', from: 'plc-1', to: 'gen-1', protocol: 'Modbus RTU', color: 'gray' },
    { id: 'f19', from: 'plc-1', to: 'gen-2', protocol: 'Modbus RTU', color: 'gray' },
    { id: 'f20', from: 'plc-1', to: 'ups', protocol: 'SNMPv3', color: 'gray' },
    { id: 'f21', from: 'plc-2', to: 'chiller', protocol: 'BACnet/IP', color: 'gray' },
    { id: 'f22', from: 'plc-2', to: 'crah', protocol: 'Modbus RTU', color: 'gray' },
    { id: 'f23', from: 'plc-3', to: 'bms', protocol: 'BACnet/IP', color: 'gray' },
]

// Icon mapping
const ICON_MAP: Record<string, any> = {
    cpu: Cpu, server: Server, database: Database, cloud: Cloud,
    shield: Shield, lock: Lock, network: Network, router: Router,
    monitor: Monitor, harddrive: HardDrive, power: Power, factory: Factory,
    globe: Globe, building: Building
}

const STATUS_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    online: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400' },
    warning: { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-400' },
    critical: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' },
}

const ZONE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: 'bg-purple-900/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    blue: { bg: 'bg-blue-900/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    cyan: { bg: 'bg-cyan-900/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    yellow: { bg: 'bg-yellow-900/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    orange: { bg: 'bg-orange-900/10', border: 'border-orange-500/30', text: 'text-orange-400' },
    red: { bg: 'bg-red-900/10', border: 'border-red-500/30', text: 'text-red-400' },
    gray: { bg: 'bg-gray-900/10', border: 'border-gray-500/30', text: 'text-gray-400' },
    slate: { bg: 'bg-slate-900/10', border: 'border-slate-500/30', text: 'text-slate-400' },
}

// ==================== MAIN COMPONENT ====================
export default function EngineeringCanvas() {
    const [selectedComponent, setSelectedComponent] = useState<typeof COMPONENTS[0] | null>(null)
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
    const [isPanning, setIsPanning] = useState(false)
    const [startPan, setStartPan] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button === 0) {
            setIsPanning(true)
            setStartPan({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning) {
            setPanOffset({ x: e.clientX - startPan.x, y: e.clientY - startPan.y })
        }
    }

    const handleMouseUp = () => setIsPanning(false)

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.1 : 0.1
        setZoom(prev => Math.max(0.5, Math.min(2, prev + delta)))
    }

    const getComponentPosition = (id: string) => {
        const comp = COMPONENTS.find(c => c.id === id)
        return comp ? { x: comp.x + 25, y: comp.y + 15 } : { x: 0, y: 0 }
    }

    return (
        <div className="relative border border-white/10 rounded-xl overflow-hidden bg-black/40">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/60">
                <div>
                    <h3 className="text-white font-bold text-sm flex items-center gap-2">
                        <Layers size={14} className="text-cyan-400" />
                        Interactive Engineering Canvas
                    </h3>
                    <p className="text-[10px] text-gray-500">IEC 62443 Zone Architecture • {COMPONENTS.length} Assets • {DATA_FLOWS.length} Connections</p>
                </div>
                <div className="flex gap-2 text-[10px]">
                    <button onClick={() => setZoom(z => Math.min(2, z + 0.2))} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 hover:text-white">+</button>
                    <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 hover:text-white">−</button>
                    <button onClick={() => { setZoom(1); setPanOffset({ x: 0, y: 0 }) }} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 hover:text-white">Reset</button>
                </div>
            </div>

            {/* Canvas Area */}
            <div
                ref={containerRef}
                className="relative h-[650px] overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                <div
                    className="absolute"
                    style={{
                        transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                        transformOrigin: '0 0',
                    }}
                >
                    {/* Zones */}
                    {ZONES.map(zone => {
                        const colors = ZONE_COLORS[zone.color]
                        return (
                            <div
                                key={zone.id}
                                className={`absolute rounded-lg border ${colors.bg} ${colors.border}`}
                                style={{ left: zone.x, top: zone.y, width: zone.width, height: zone.height }}
                            >
                                <div className="absolute top-1 left-2 flex items-center gap-2">
                                    <span className={`text-[9px] font-mono ${colors.text}`}>{zone.name}</span>
                                    <span className="text-[8px] text-gray-600 font-mono">SL-{zone.sl}</span>
                                </div>
                            </div>
                        )
                    })}

                    {/* Data Flows (SVG Lines) */}
                    <svg className="absolute inset-0 w-[1000px] h-[700px] pointer-events-none">
                        {DATA_FLOWS.map(flow => {
                            const from = getComponentPosition(flow.from)
                            const to = getComponentPosition(flow.to)
                            const colors: Record<string, string> = {
                                purple: '#a855f7', blue: '#3b82f6', cyan: '#22d3ee',
                                yellow: '#eab308', orange: '#f97316', red: '#ef4444',
                                gray: '#6b7280', green: '#22c55e', slate: '#64748b'
                            }
                            return (
                                <g key={flow.id}>
                                    <line
                                        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                                        stroke={colors[flow.color] || '#444'}
                                        strokeWidth="1.5"
                                        strokeDasharray="4 2"
                                        opacity="0.6"
                                    />
                                </g>
                            )
                        })}
                    </svg>

                    {/* Components */}
                    {COMPONENTS.map(comp => {
                        const Icon = ICON_MAP[comp.type] || Box
                        const statusColor = STATUS_COLORS[comp.status]
                        return (
                            <motion.div
                                key={comp.id}
                                whileHover={{ scale: 1.15, zIndex: 50 }}
                                onClick={(e) => { e.stopPropagation(); setSelectedComponent(comp) }}
                                className={`absolute w-[50px] h-[30px] rounded border flex items-center justify-center cursor-pointer transition-all
                                    ${statusColor.bg} ${statusColor.border} hover:shadow-lg`}
                                style={{ left: comp.x, top: comp.y }}
                            >
                                <Icon size={14} className={statusColor.text} />
                                <div className="absolute -bottom-3 text-[7px] text-gray-400 whitespace-nowrap font-mono truncate max-w-[60px]">
                                    {comp.name}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Component Detail Panel */}
            <AnimatePresence>
                {selectedComponent && (
                    <motion.div
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        className="absolute right-0 top-0 bottom-0 w-72 bg-black/95 border-l border-white/10 p-4 z-50 overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-white font-bold text-sm">{selectedComponent.name}</h4>
                            <button onClick={() => setSelectedComponent(null)} className="text-gray-500 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="space-y-3 text-xs">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Type</span>
                                <span className="text-white capitalize">{selectedComponent.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Zone</span>
                                <span className="text-white">{ZONES.find(z => z.id === selectedComponent.zone)?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Security Level</span>
                                <span className="text-white">SL-{selectedComponent.sl}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <span className={STATUS_COLORS[selectedComponent.status].text}>{selectedComponent.status}</span>
                            </div>
                            {selectedComponent.desc && (
                                <div className="pt-2 border-t border-white/10">
                                    <span className="text-gray-400">{selectedComponent.desc}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 flex gap-4 text-[8px] text-gray-500 bg-black/80 p-2 rounded">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Online</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Warning</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Critical</span>
                <span className="text-gray-600">• Drag to pan • Scroll to zoom</span>
            </div>
        </div>
    )
}
