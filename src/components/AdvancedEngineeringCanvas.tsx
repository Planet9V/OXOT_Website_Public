'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Server, Activity, Shield, Zap, Lock, Database,
    Thermometer, AlertTriangle, CheckCircle, Search,
    Cpu, Network, Globe, Radio, Workflow, Building2,
    DoorOpen, Fan, Power, KeyRound, MonitorSpeaker,
    ThermometerSun, Flame, Router, LucideIcon
} from 'lucide-react'

// ====================================================================================
// IEC 62443 ZONE & CONDUIT REFERENCE (ZCR) - DATA CENTER INITIAL RISK ASSESSMENT (IRA)
// ====================================================================================

// Zone Definitions following IEC 62443-3-2
const ZONES = [
    { id: 1, name: 'Enterprise Zone', sl: 1, color: 'blue', description: 'Corporate IT, ERP, Business Applications' },
    { id: 2, name: 'DMZ / Data Diode', sl: 2, color: 'yellow', description: 'Air-gapped boundary between IT and OT' },
    { id: 3, name: 'Building Management (BMS)', sl: 2, color: 'purple', description: 'HVAC, Lighting, Environmental Controls' },
    { id: 4, name: 'Physical Access Control (PACS)', sl: 3, color: 'pink', description: 'Door controllers, Biometrics, CCTV' },
    { id: 5, name: 'Critical Power Systems', sl: 3, color: 'amber', description: 'Generators, UPS, Switchgear, PDUs' },
    { id: 6, name: 'Cooling Infrastructure', sl: 2, color: 'cyan', description: 'Chillers, CRAHs, Pumps, Cooling Towers' },
    { id: 7, name: 'Data Hall (Compute)', sl: 4, color: 'green', description: 'Servers, Storage, Core Networking' },
    { id: 8, name: 'Fire & Life Safety (SIS)', sl: 4, color: 'red', description: 'Fire suppression, Detection, Emergency systems' },
]

// Conduit Definitions (connections between zones)
const CONDUITS = [
    { id: 'C1', from: 1, to: 2, protocol: 'HTTPS/TLS 1.3', bidirectional: false, name: 'Enterprise → DMZ' },
    { id: 'C2', from: 2, to: 3, protocol: 'BACnet Secure', bidirectional: true, name: 'DMZ ↔ BMS' },
    { id: 'C3', from: 2, to: 4, protocol: 'OSDP v2', bidirectional: true, name: 'DMZ ↔ PACS' },
    { id: 'C4', from: 2, to: 5, protocol: 'Modbus/TCP (TLS)', bidirectional: true, name: 'DMZ ↔ Power' },
    { id: 'C5', from: 2, to: 6, protocol: 'BACnet/IP', bidirectional: true, name: 'DMZ ↔ Cooling' },
    { id: 'C6', from: 5, to: 6, protocol: 'Hardwired 4-20mA', bidirectional: false, name: 'Power → Cooling' },
    { id: 'C7', from: 3, to: 6, protocol: 'BACnet/IP', bidirectional: true, name: 'BMS ↔ Cooling' },
    { id: 'C8', from: 7, to: 2, protocol: 'Data Diode (Unidirectional)', bidirectional: false, name: 'Compute → DMZ' },
    { id: 'C9', from: 8, to: 5, protocol: 'Relay/Hardwired', bidirectional: false, name: 'Fire → Power EPO' },
    { id: 'C10', from: 8, to: 6, protocol: 'Relay/Hardwired', bidirectional: false, name: 'Fire → Cooling Stop' },
    { id: 'C11', from: 4, to: 7, protocol: 'RS-485', bidirectional: false, name: 'PACS → Data Hall' },
]

// Complete Equipment Database (20+ systems)
const EQUIPMENT_DB = [
    // === ZONE 1: ENTERPRISE ===
    {
        id: 'erp-01', name: 'SAP S/4HANA', type: 'ERP System', zone: 1, sl: 1,
        stats: { vendor: 'SAP', protocol: 'HTTPS', port: '443', risk: 'Data Exfiltration' },
        fr: ['FR1-IAC', 'FR4-DC']
    },
    {
        id: 'dcim-01', name: 'Schneider EcoStruxure', type: 'DCIM Platform', zone: 1, sl: 1,
        stats: { vendor: 'Schneider Electric', protocol: 'REST API', port: '8443', risk: 'Credential Theft' },
        fr: ['FR1-IAC', 'FR6-TRE']
    },

    // === ZONE 2: DMZ ===
    {
        id: 'fw-01', name: 'Palo Alto PA-5260', type: 'NGFW', zone: 2, sl: 2,
        stats: { vendor: 'Palo Alto', protocol: 'Multiple', port: 'N/A', risk: 'Firewall Bypass' },
        fr: ['FR5-RDF', 'FR3-SI']
    },
    {
        id: 'dd-01', name: 'Waterfall Unidirectional', type: 'Data Diode', zone: 2, sl: 3,
        stats: { vendor: 'Waterfall Security', protocol: 'Hardware Enforced', port: 'N/A', risk: 'Physical Tampering' },
        fr: ['FR5-RDF']
    },

    // === ZONE 3: BMS ===
    {
        id: 'bms-01', name: 'Johnson Controls Metasys', type: 'BMS Controller', zone: 3, sl: 2,
        stats: { vendor: 'Johnson Controls', protocol: 'BACnet/IP', port: '47808', risk: 'Setpoint Manipulation' },
        fr: ['FR1-IAC', 'FR3-SI']
    },
    {
        id: 'led-01', name: 'Philips Dynalite', type: 'Lighting Control', zone: 3, sl: 1,
        stats: { vendor: 'Signify', protocol: 'DALI', port: 'Wired', risk: 'Nuisance Attack' },
        fr: ['FR7-RA']
    },
    {
        id: 'env-01', name: 'Vaisala HMT330', type: 'Environmental Sensor', zone: 3, sl: 2,
        stats: { vendor: 'Vaisala', protocol: 'Modbus RTU', port: 'RS-485', risk: 'Sensor Spoofing' },
        fr: ['FR3-SI']
    },

    // === ZONE 4: PACS ===
    {
        id: 'pacs-01', name: 'Lenel OnGuard', type: 'Access Control Server', zone: 4, sl: 3,
        stats: { vendor: 'Carrier', protocol: 'OSDP', port: 'TCP 20000', risk: 'Unauthorized Entry' },
        fr: ['FR1-IAC', 'FR2-UC']
    },
    {
        id: 'bio-01', name: 'HID Iris Scanner', type: 'Biometric Reader', zone: 4, sl: 3,
        stats: { vendor: 'HID Global', protocol: 'Wiegand/OSDP', port: 'Wired', risk: 'Biometric Bypass' },
        fr: ['FR1-IAC']
    },
    {
        id: 'cctv-01', name: 'Axis Q6135-LE', type: 'PTZ Camera', zone: 4, sl: 2,
        stats: { vendor: 'Axis', protocol: 'RTSP/ONVIF', port: '554', risk: 'Video Tampering' },
        fr: ['FR6-TRE', 'FR4-DC']
    },
    {
        id: 'door-01', name: 'Assa Abloy IN120', type: 'Smart Lock', zone: 4, sl: 3,
        stats: { vendor: 'Assa Abloy', protocol: 'OSDP v2', port: 'Wired', risk: 'Lock Bypass' },
        fr: ['FR1-IAC']
    },

    // === ZONE 5: CRITICAL POWER ===
    {
        id: 'gen-01', name: 'Caterpillar 3516B', type: 'Diesel Generator', zone: 5, sl: 3,
        stats: { vendor: 'Caterpillar', protocol: 'Modbus TCP', port: '502', power: '2000 kVA', risk: 'Command Injection' },
        fr: ['FR7-RA', 'FR3-SI']
    },
    {
        id: 'gen-02', name: 'Mitsubishi MGS1500', type: 'Diesel Generator', zone: 5, sl: 3,
        stats: { vendor: 'Mitsubishi', protocol: 'Modbus TCP', port: '502', power: '1500 kVA', risk: 'Command Injection' },
        fr: ['FR7-RA', 'FR3-SI']
    },
    {
        id: 'ats-01', name: 'Eaton ATC-300', type: 'Auto Transfer Switch', zone: 5, sl: 3,
        stats: { vendor: 'Eaton', protocol: 'Modbus RTU', port: 'RS-485', risk: 'Transfer Failure' },
        fr: ['FR7-RA']
    },
    {
        id: 'ups-01', name: 'Vertiv EXL S1', type: 'UPS System', zone: 5, sl: 3,
        stats: { vendor: 'Vertiv', protocol: 'SNMPv3', port: '161', capacity: '1200 kVA', risk: 'DoS Attack' },
        fr: ['FR7-RA', 'FR1-IAC']
    },
    {
        id: 'swgr-01', name: 'ABB SafePlus', type: 'Medium Voltage Switchgear', zone: 5, sl: 4,
        stats: { vendor: 'ABB', protocol: 'IEC 61850', port: '102', voltage: '15kV', risk: 'Arc Flash Trigger' },
        fr: ['FR7-RA', 'FR3-SI']
    },
    {
        id: 'pdu-01', name: 'Vertiv Geist rPDU', type: 'Rack PDU', zone: 5, sl: 2,
        stats: { vendor: 'Vertiv', protocol: 'SNMPv3', port: '161', outlets: '42x C13', risk: 'Outlet Switching' },
        fr: ['FR2-UC']
    },
    {
        id: 'pdu-02', name: 'Raritan PX3', type: 'Intelligent PDU', zone: 5, sl: 2,
        stats: { vendor: 'Legrand', protocol: 'REST/JSON', port: '8443', outlets: '24x C19', risk: 'Remote Kill' },
        fr: ['FR2-UC', 'FR1-IAC']
    },

    // === ZONE 6: COOLING ===
    {
        id: 'chiller-01', name: 'York YVWA', type: 'Centrifugal Chiller', zone: 6, sl: 2,
        stats: { vendor: 'Johnson Controls', protocol: 'BACnet/IP', port: '47808', tonnage: '1000 TR', risk: 'Setpoint Attack' },
        fr: ['FR5-RDF', 'FR3-SI']
    },
    {
        id: 'chiller-02', name: 'Trane CVHF', type: 'Screw Chiller', zone: 6, sl: 2,
        stats: { vendor: 'Trane', protocol: 'BACnet/IP', port: '47808', tonnage: '500 TR', risk: 'Setpoint Attack' },
        fr: ['FR5-RDF']
    },
    {
        id: 'crah-01', name: 'Liebert CRV', type: 'In-Row Cooling', zone: 6, sl: 2,
        stats: { vendor: 'Vertiv', protocol: 'Modbus RTU', port: 'RS-485', capacity: '40 kW', risk: 'Fan Manipulation' },
        fr: ['FR3-SI']
    },
    {
        id: 'tower-01', name: 'SPX Marley NC', type: 'Cooling Tower', zone: 6, sl: 2,
        stats: { vendor: 'SPX', protocol: 'BACnet/IP', port: '47808', cells: '4', risk: 'Fan Speed Attack' },
        fr: ['FR7-RA']
    },
    {
        id: 'pump-01', name: 'Grundfos CR', type: 'Chilled Water Pump', zone: 6, sl: 2,
        stats: { vendor: 'Grundfos', protocol: 'Modbus TCP', port: '502', flow: '1500 GPM', risk: 'VFD Manipulation' },
        fr: ['FR7-RA']
    },

    // === ZONE 7: DATA HALL (COMPUTE) ===
    {
        id: 'core-01', name: 'Cisco Nexus 9500', type: 'Core Switch', zone: 7, sl: 4,
        stats: { vendor: 'Cisco', protocol: 'NX-OS/VXLAN', port: 'Multiple', risk: 'VLAN Hopping' },
        fr: ['FR5-RDF', 'FR1-IAC']
    },
    {
        id: 'spine-01', name: 'Arista 7280R3', type: 'Spine Switch', zone: 7, sl: 3,
        stats: { vendor: 'Arista', protocol: 'EVPN/VXLAN', port: 'Multiple', risk: 'BGP Hijack' },
        fr: ['FR5-RDF']
    },
    {
        id: 'edge-01', name: 'Dell PowerEdge XR11', type: 'Edge Compute', zone: 7, sl: 4,
        stats: { vendor: 'Dell', protocol: 'iDRAC9', port: '443', spec: 'Mil-Spec', risk: 'Physical Access' },
        fr: ['FR1-IAC', 'FR3-SI']
    },
    {
        id: 'storage-01', name: 'NetApp AFF A800', type: 'All-Flash Storage', zone: 7, sl: 3,
        stats: { vendor: 'NetApp', protocol: 'NFS/iSCSI', port: '2049/3260', encrypt: 'FIPS 140-2', risk: 'Ransomware' },
        fr: ['FR4-DC', 'FR3-SI']
    },
    {
        id: 'hpc-01', name: 'NVIDIA DGX H100', type: 'AI/ML Cluster', zone: 7, sl: 4,
        stats: { vendor: 'NVIDIA', protocol: 'InfiniBand', port: 'IB', gpus: '8x H100', risk: 'Model Poisoning' },
        fr: ['FR4-DC']
    },

    // === ZONE 8: FIRE & LIFE SAFETY (SIS) ===
    {
        id: 'sis-01', name: 'Triconex Tricon CX', type: 'Safety Controller', zone: 8, sl: 4,
        stats: { vendor: 'Schneider', protocol: 'TSAA', port: 'Tristation', arch: 'TMR', risk: 'TRITON Attack' },
        fr: ['FR7-RA', 'FR3-SI'], isSafety: true
    },
    {
        id: 'fire-01', name: 'Marioff HI-FOG', type: 'Water Mist Suppression', zone: 8, sl: 4,
        stats: { vendor: 'Carrier', protocol: 'Hardwired', port: 'Relay', trigger: 'VESDA', risk: 'False Discharge' },
        fr: ['FR7-RA'], isSafety: true
    },
    {
        id: 'vesda-01', name: 'Xtralis VESDA-E', type: 'Smoke Detection', zone: 8, sl: 3,
        stats: { vendor: 'Honeywell', protocol: 'Modbus', port: 'RS-485', sensitivity: '0.005%', risk: 'Sensor Blinding' },
        fr: ['FR6-TRE'], isSafety: true
    },
    {
        id: 'epo-01', name: 'Emergency Power Off', type: 'EPO System', zone: 8, sl: 4,
        stats: { vendor: 'Various', protocol: 'Hardwired NC', port: 'Relay', activation: 'Dual-key', risk: 'Accidental Trigger' },
        fr: ['FR7-RA'], isSafety: true
    },
]

// Zone color mapping
const ZONE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'bg-blue-900/20', border: 'border-blue-500/30', text: 'text-blue-400' },
    yellow: { bg: 'bg-yellow-900/20', border: 'border-yellow-500/30', text: 'text-yellow-400' },
    purple: { bg: 'bg-purple-900/20', border: 'border-purple-500/30', text: 'text-purple-400' },
    pink: { bg: 'bg-pink-900/20', border: 'border-pink-500/30', text: 'text-pink-400' },
    amber: { bg: 'bg-amber-900/20', border: 'border-amber-500/30', text: 'text-amber-400' },
    cyan: { bg: 'bg-cyan-900/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    green: { bg: 'bg-green-900/20', border: 'border-green-500/30', text: 'text-green-400' },
    red: { bg: 'bg-red-900/20', border: 'border-red-500/30', text: 'text-red-400' },
}

// Zone icon mapping
const ZONE_ICONS: Record<number, LucideIcon> = {
    1: Building2,
    2: Shield,
    3: ThermometerSun,
    4: DoorOpen,
    5: Power,
    6: Fan,
    7: Server,
    8: Flame,
}

export default function AdvancedEngineeringCanvas() {
    const [selectedAsset, setSelectedAsset] = useState<typeof EQUIPMENT_DB[0] | null>(null)
    const [selectedZone, setSelectedZone] = useState<number | null>(null)
    const [viewMode, setViewMode] = useState<'zones' | 'conduits' | 'assets'>('zones')

    const getZoneAssets = (zoneId: number) => EQUIPMENT_DB.filter(e => e.zone === zoneId)
    const getZone = (zoneId: number) => ZONES.find(z => z.id === zoneId)

    return (
        <div className="flex flex-col h-full bg-transparent text-gray-100 overflow-hidden relative">

            {/* TOP TOOLBAR */}
            <div className="absolute top-4 right-6 z-40 flex gap-2">
                {(['zones', 'conduits', 'assets'] as const).map(mode => (
                    <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-4 py-2 text-xs font-bold font-mono uppercase rounded-lg border backdrop-blur-md transition-all
                            ${viewMode === mode
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                : 'bg-black/40 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}
                    >
                        {mode}
                    </button>
                ))}
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex overflow-hidden">

                {/* LEFT: ZONE/CONDUIT VISUALIZATION */}
                <div className="flex-1 p-6 overflow-y-auto">

                    {viewMode === 'zones' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {ZONES.map(zone => {
                                    const colors = ZONE_COLORS[zone.color]
                                    const ZoneIcon = ZONE_ICONS[zone.id]
                                    const assets = getZoneAssets(zone.id)
                                    return (
                                        <motion.button
                                            key={zone.id}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                                            className={`p-4 rounded-xl border text-left transition-all ${colors.bg} ${colors.border}
                                                ${selectedZone === zone.id ? 'ring-2 ring-cyan-500' : ''}`}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                                                    <ZoneIcon size={20} className={colors.text} />
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold text-sm">Zone {zone.id}</div>
                                                    <div className={`text-xs ${colors.text}`}>SL-{zone.sl}</div>
                                                </div>
                                            </div>
                                            <div className="text-white text-xs font-medium mb-1">{zone.name}</div>
                                            <div className="text-gray-500 text-[10px] mb-3">{zone.description}</div>
                                            <div className="flex items-center justify-between text-[10px]">
                                                <span className="text-gray-600">{assets.length} Assets</span>
                                                <span className={colors.text}>View →</span>
                                            </div>
                                        </motion.button>
                                    )
                                })}
                            </div>

                            {/* Selected Zone Detail */}
                            <AnimatePresence>
                                {selectedZone && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-black/40 border border-white/10 rounded-xl p-6"
                                    >
                                        {(() => {
                                            const zone = getZone(selectedZone)!
                                            const colors = ZONE_COLORS[zone.color]
                                            const assets = getZoneAssets(selectedZone)
                                            return (
                                                <>
                                                    <h3 className={`text-xl font-bold ${colors.text} mb-4`}>{zone.name}</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {assets.map(asset => (
                                                            <button
                                                                key={asset.id}
                                                                onClick={() => setSelectedAsset(asset)}
                                                                className={`p-3 rounded-lg border text-left transition-all
                                                                    ${selectedAsset?.id === asset.id
                                                                        ? 'bg-cyan-900/30 border-cyan-500/50'
                                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                                            >
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    {asset.isSafety
                                                                        ? <Shield size={14} className="text-red-400" />
                                                                        : <Server size={14} className="text-gray-400" />
                                                                    }
                                                                    <span className="text-white text-sm font-medium">{asset.name}</span>
                                                                </div>
                                                                <div className="text-gray-500 text-[10px]">{asset.type}</div>
                                                                <div className="flex gap-2 mt-2 flex-wrap">
                                                                    <span className="text-[9px] px-1.5 py-0.5 bg-white/10 text-gray-400 rounded">SL-{asset.sl}</span>
                                                                    <span className="text-[9px] px-1.5 py-0.5 bg-red-900/30 text-red-400 rounded">{asset.stats.risk}</span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )
                                        })()}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {viewMode === 'conduits' && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">Network Conduits (Data Flows)</h3>
                            <div className="grid gap-3">
                                {CONDUITS.map(conduit => {
                                    const fromZone = getZone(conduit.from)!
                                    const toZone = getZone(conduit.to)!
                                    const fromColors = ZONE_COLORS[fromZone.color]
                                    const toColors = ZONE_COLORS[toZone.color]
                                    return (
                                        <div key={conduit.id} className="p-4 bg-black/40 border border-white/10 rounded-xl flex items-center gap-4">
                                            <div className="text-xs font-mono text-gray-600 w-12">{conduit.id}</div>
                                            <div className={`px-3 py-1 rounded ${fromColors.bg} border ${fromColors.border} ${fromColors.text} text-xs`}>
                                                Z{conduit.from}
                                            </div>
                                            <div className="text-gray-500 text-xs">{conduit.bidirectional ? '↔' : '→'}</div>
                                            <div className={`px-3 py-1 rounded ${toColors.bg} border ${toColors.border} ${toColors.text} text-xs`}>
                                                Z{conduit.to}
                                            </div>
                                            <div className="flex-1 text-gray-400 text-xs">{conduit.name}</div>
                                            <div className="text-[10px] font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">{conduit.protocol}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {viewMode === 'assets' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">All Assets ({EQUIPMENT_DB.length})</h3>
                                <div className="text-xs text-gray-500 font-mono">IEC 62443-3-3 Mapping</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {EQUIPMENT_DB.map(asset => {
                                    const zone = getZone(asset.zone)!
                                    const colors = ZONE_COLORS[zone.color]
                                    return (
                                        <button
                                            key={asset.id}
                                            onClick={() => setSelectedAsset(asset)}
                                            className={`p-3 rounded-lg border text-left transition-all
                                                ${selectedAsset?.id === asset.id
                                                    ? 'bg-cyan-900/30 border-cyan-500/50'
                                                    : `${colors.bg} ${colors.border} hover:bg-white/10`}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white text-sm font-medium">{asset.name}</span>
                                                <span className={`text-[9px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>Z{asset.zone}</span>
                                            </div>
                                            <div className="text-gray-500 text-[10px] mb-2">{asset.type}</div>
                                            <div className="flex gap-1 flex-wrap">
                                                {asset.fr?.map(fr => (
                                                    <span key={fr} className="text-[8px] px-1 py-0.5 bg-white/10 text-gray-400 rounded">{fr}</span>
                                                ))}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: ASSET DETAIL PANEL */}
                <AnimatePresence>
                    {selectedAsset && (
                        <motion.div
                            initial={{ x: 400, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 400, opacity: 0 }}
                            className="w-96 bg-black/90 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">{selectedAsset.name}</h2>
                                <button onClick={() => setSelectedAsset(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400">
                                    ✕
                                </button>
                            </div>

                            {/* Zone & SL Badge */}
                            <div className="flex gap-3 mb-6">
                                {(() => {
                                    const zone = getZone(selectedAsset.zone)!
                                    const colors = ZONE_COLORS[zone.color]
                                    return (
                                        <div className={`px-3 py-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                                            <div className="text-[10px] text-gray-500">Zone</div>
                                            <div className={`text-lg font-bold ${colors.text}`}>{zone.id}</div>
                                        </div>
                                    )
                                })()}
                                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                                    <div className="text-[10px] text-gray-500">Security Level</div>
                                    <div className="text-lg font-bold text-white">SL-{selectedAsset.sl}</div>
                                </div>
                            </div>

                            {/* Type */}
                            <div className="mb-6 p-3 bg-white/5 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase mb-1">Equipment Type</div>
                                <div className="text-white font-medium">{selectedAsset.type}</div>
                            </div>

                            {/* Stats/Specs */}
                            <div className="mb-6">
                                <div className="text-[10px] text-gray-500 uppercase mb-2">Technical Specifications</div>
                                <div className="space-y-2">
                                    {Object.entries(selectedAsset.stats).filter(([k]) => k !== 'risk').map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-white/5">
                                            <span className="text-gray-400 text-xs capitalize">{key}</span>
                                            <span className="text-white text-xs font-mono">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FR Mapping */}
                            {selectedAsset.fr && (
                                <div className="mb-6">
                                    <div className="text-[10px] text-gray-500 uppercase mb-2">IEC 62443-3-3 Requirements</div>
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedAsset.fr.map(fr => (
                                            <span key={fr} className="px-2 py-1 bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 text-[10px] rounded">
                                                {fr}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Risk */}
                            <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl">
                                <h4 className="text-xs font-bold text-red-500 mb-2 flex items-center gap-2">
                                    <AlertTriangle size={12} /> PRIMARY THREAT VECTOR
                                </h4>
                                <p className="text-xs text-red-200/80 leading-relaxed">
                                    <strong>{selectedAsset.stats.risk}</strong>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* BOTTOM STATS BAR */}
            <div className="bg-black/80 border-t border-white/10 px-6 py-3 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <div className="flex gap-6">
                    <span><strong className="text-white">{ZONES.length}</strong> Zones</span>
                    <span><strong className="text-white">{CONDUITS.length}</strong> Conduits</span>
                    <span><strong className="text-white">{EQUIPMENT_DB.length}</strong> Assets</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-green-400">● IRA COMPLETE</span>
                    <span>Last Updated: {new Date().toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}
