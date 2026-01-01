'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Layers, ArrowRight, Plus, X, Edit2, Trash2, Lock,
    Shield, Network, Server, Database, Cpu, AlertTriangle,
    ChevronDown, ChevronUp, Settings, Eye, EyeOff, Save,
    Download, Upload, Sparkles, Loader2
} from 'lucide-react'

// ============================================================
// TYPES
// ============================================================

export interface Zone {
    id: string
    name: string
    level: 0 | 1 | 2 | 3 | 4 | 5
    description: string
    slTarget: 1 | 2 | 3 | 4
    assets: string[]
    color: string
    x: number
    y: number
    width: number
    height: number
}

export interface Conduit {
    id: string
    name: string
    fromZone: string
    toZone: string
    dataFlow: string
    protocols: string[]
    securityControls: string[]
    slRequired: 1 | 2 | 3 | 4
    encrypted: boolean
    monitored: boolean
}

interface ZoneConduitEditorProps {
    zones: Zone[]
    conduits: Conduit[]
    assets?: { id: string; name: string; zone?: string }[]
    onAddZone: (zone: Zone) => void
    onUpdateZone: (id: string, data: Partial<Zone>) => void
    onDeleteZone: (id: string) => void
    onAddConduit: (conduit: Conduit) => void
    onUpdateConduit: (id: string, data: Partial<Conduit>) => void
    onDeleteConduit: (id: string) => void
    onAIScan?: () => Promise<string>
}

// ============================================================
// CONSTANTS
// ============================================================

const ZONE_LEVELS = [
    { level: 0, name: 'Enterprise', color: '#3B82F6', desc: 'Business/IT systems' },
    { level: 1, name: 'Site Business', color: '#06B6D4', desc: 'Site-level business planning' },
    { level: 2, name: 'Site Operations', color: '#10B981', desc: 'Operations management' },
    { level: 3, name: 'Control', color: '#EAB308', desc: 'Supervisory control (HMI/SCADA)' },
    { level: 4, name: 'Process', color: '#F97316', desc: 'Direct process control (PLC/RTU)' },
    { level: 5, name: 'Safety', color: '#EF4444', desc: 'Safety instrumented systems' }
]

const COMMON_PROTOCOLS = [
    'Modbus/TCP', 'Modbus RTU', 'OPC UA', 'OPC DA', 'EtherNet/IP',
    'PROFINET', 'DNP3', 'IEC 61850', 'MQTT', 'HTTP/HTTPS',
    'SSH/SFTP', 'RDP', 'VNC', 'S7comm', 'BACnet'
]

const SECURITY_CONTROLS = [
    'Firewall', 'IDS/IPS', 'Data Diode', 'Jump Server', 'VPN',
    'Encryption', 'Authentication', 'Logging', 'Rate Limiting',
    'Protocol Validation', 'Anti-Malware Gateway', 'DMZ'
]

// ============================================================
// ZONE CARD
// ============================================================

const ZoneCard = ({
    zone,
    assetCount,
    conduitCount,
    isSelected,
    onClick,
    onEdit,
    onDelete
}: {
    zone: Zone
    assetCount: number
    conduitCount: number
    isSelected: boolean
    onClick: () => void
    onEdit: () => void
    onDelete: () => void
}) => {
    const levelInfo = ZONE_LEVELS.find(l => l.level === zone.level)

    return (
        <motion.div
            layout
            onClick={onClick}
            className={`bg-slate-800/80 border-2 rounded-xl p-4 cursor-pointer transition-all ${isSelected
                    ? 'border-oxot-gold shadow-lg shadow-oxot-gold/10'
                    : 'border-white/5 hover:border-white/20'
                }`}
            style={{ borderLeftColor: levelInfo?.color, borderLeftWidth: 4 }}
        >
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span
                            className="text-[10px] px-2 py-0.5 rounded font-mono font-bold"
                            style={{ backgroundColor: `${levelInfo?.color}20`, color: levelInfo?.color }}
                        >
                            L{zone.level}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-oxot-gold/20 text-oxot-gold font-mono">
                            SL-{zone.slTarget}
                        </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{zone.name}</h4>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit() }}
                        className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                    >
                        <Edit2 size={12} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete() }}
                        className="p-1.5 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            <p className="text-[10px] text-slate-500 mb-3">{zone.description || levelInfo?.desc}</p>

            <div className="flex items-center gap-3 text-[10px]">
                <div className="flex items-center gap-1 text-slate-400">
                    <Server size={10} />
                    {assetCount} assets
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                    <Network size={10} />
                    {conduitCount} conduits
                </div>
            </div>
        </motion.div>
    )
}

// ============================================================
// CONDUIT ROW
// ============================================================

const ConduitRow = ({
    conduit,
    zones,
    isSelected,
    onClick,
    onDelete
}: {
    conduit: Conduit
    zones: Zone[]
    isSelected: boolean
    onClick: () => void
    onDelete: () => void
}) => {
    const fromZone = zones.find(z => z.id === conduit.fromZone)
    const toZone = zones.find(z => z.id === conduit.toZone)
    const fromLevel = ZONE_LEVELS.find(l => l.level === fromZone?.level)
    const toLevel = ZONE_LEVELS.find(l => l.level === toZone?.level)

    return (
        <motion.div
            layout
            onClick={onClick}
            className={`bg-slate-800/50 border rounded-lg p-3 cursor-pointer transition-all ${isSelected
                    ? 'border-oxot-gold'
                    : 'border-white/5 hover:border-white/20'
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* From Zone */}
                    <div className="text-center">
                        <span
                            className="text-[10px] px-2 py-0.5 rounded font-mono block mb-0.5"
                            style={{ backgroundColor: `${fromLevel?.color}20`, color: fromLevel?.color }}
                        >
                            L{fromZone?.level}
                        </span>
                        <span className="text-[10px] text-slate-400">{fromZone?.name}</span>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center px-2">
                        <ArrowRight size={14} className="text-slate-500" />
                        <span className="text-[8px] text-slate-600 mt-0.5">{conduit.name}</span>
                    </div>

                    {/* To Zone */}
                    <div className="text-center">
                        <span
                            className="text-[10px] px-2 py-0.5 rounded font-mono block mb-0.5"
                            style={{ backgroundColor: `${toLevel?.color}20`, color: toLevel?.color }}
                        >
                            L{toZone?.level}
                        </span>
                        <span className="text-[10px] text-slate-400">{toZone?.name}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Security Indicators */}
                    <div className="flex items-center gap-1">
                        {conduit.encrypted && (
                            <div className="p-1 bg-green-500/20 rounded" title="Encrypted">
                                <Lock size={10} className="text-green-400" />
                            </div>
                        )}
                        {conduit.monitored && (
                            <div className="p-1 bg-blue-500/20 rounded" title="Monitored">
                                <Eye size={10} className="text-blue-400" />
                            </div>
                        )}
                        <span className="text-[10px] px-1.5 py-0.5 bg-oxot-gold/20 text-oxot-gold rounded font-mono">
                            SL-{conduit.slRequired}
                        </span>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete() }}
                        className="p-1.5 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400"
                    >
                        <Trash2 size={12} />
                    </button>
                </div>
            </div>

            {/* Protocols & Controls */}
            {(conduit.protocols.length > 0 || conduit.securityControls.length > 0) && (
                <div className="mt-2 pt-2 border-t border-white/5 flex flex-wrap gap-1">
                    {conduit.protocols.slice(0, 3).map(p => (
                        <span key={p} className="text-[8px] px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded">
                            {p}
                        </span>
                    ))}
                    {conduit.securityControls.slice(0, 3).map(c => (
                        <span key={c} className="text-[8px] px-1.5 py-0.5 bg-blue-900/30 text-blue-400 rounded">
                            {c}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    )
}

// ============================================================
// ADD ZONE MODAL
// ============================================================

const AddZoneModal = ({
    isOpen,
    onClose,
    onSubmit,
    editZone
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (zone: Omit<Zone, 'id'>) => void
    editZone?: Zone | null
}) => {
    const [formData, setFormData] = useState<Omit<Zone, 'id'>>({
        name: editZone?.name || '',
        level: editZone?.level ?? 3,
        description: editZone?.description || '',
        slTarget: editZone?.slTarget ?? 2,
        assets: editZone?.assets || [],
        color: editZone?.color || '#EAB308',
        x: editZone?.x ?? 0,
        y: editZone?.y ?? 0,
        width: editZone?.width ?? 200,
        height: editZone?.height ?? 150
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const levelInfo = ZONE_LEVELS.find(l => l.level === formData.level)
        onSubmit({
            ...formData,
            color: levelInfo?.color || formData.color
        })
        onClose()
    }

    if (!isOpen) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {editZone ? 'Edit Zone' : 'Add Security Zone'}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Zone Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            placeholder="e.g., Process Control DMZ"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Purdue Level
                            </label>
                            <select
                                value={formData.level}
                                onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) as Zone['level'] })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                {ZONE_LEVELS.map(level => (
                                    <option key={level.level} value={level.level}>
                                        L{level.level}: {level.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                SL-Target
                            </label>
                            <select
                                value={formData.slTarget}
                                onChange={e => setFormData({ ...formData, slTarget: parseInt(e.target.value) as Zone['slTarget'] })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                <option value={1}>SL-1 (Basic)</option>
                                <option value={2}>SL-2 (Common)</option>
                                <option value={3}>SL-3 (Enhanced)</option>
                                <option value={4}>SL-4 (Hardened)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none h-20 resize-none"
                            placeholder="Describe the zone's purpose..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold rounded-lg border border-slate-700 hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-oxot-gold text-black font-bold rounded-lg hover:bg-yellow-500"
                        >
                            {editZone ? 'Save Changes' : 'Add Zone'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}

// ============================================================
// ADD CONDUIT MODAL
// ============================================================

const AddConduitModal = ({
    isOpen,
    onClose,
    onSubmit,
    zones
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (conduit: Omit<Conduit, 'id'>) => void
    zones: Zone[]
}) => {
    const [formData, setFormData] = useState<Omit<Conduit, 'id'>>({
        name: '',
        fromZone: zones[0]?.id || '',
        toZone: zones[1]?.id || '',
        dataFlow: '',
        protocols: [],
        securityControls: [],
        slRequired: 2,
        encrypted: false,
        monitored: false
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        onClose()
    }

    if (!isOpen) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Add Conduit</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Conduit Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            placeholder="e.g., CON-L3-L4-01"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                From Zone
                            </label>
                            <select
                                value={formData.fromZone}
                                onChange={e => setFormData({ ...formData, fromZone: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                {zones.map(zone => (
                                    <option key={zone.id} value={zone.id}>
                                        L{zone.level}: {zone.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                To Zone
                            </label>
                            <select
                                value={formData.toZone}
                                onChange={e => setFormData({ ...formData, toZone: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                {zones.map(zone => (
                                    <option key={zone.id} value={zone.id}>
                                        L{zone.level}: {zone.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Data Flow Description
                        </label>
                        <input
                            type="text"
                            value={formData.dataFlow}
                            onChange={e => setFormData({ ...formData, dataFlow: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            placeholder="e.g., Process data polling, Setpoint commands"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">
                            Protocols
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {COMMON_PROTOCOLS.map(protocol => (
                                <button
                                    key={protocol}
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            protocols: formData.protocols.includes(protocol)
                                                ? formData.protocols.filter(p => p !== protocol)
                                                : [...formData.protocols, protocol]
                                        })
                                    }}
                                    className={`px-2 py-1 rounded text-[10px] transition-colors ${formData.protocols.includes(protocol)
                                            ? 'bg-oxot-gold/20 text-oxot-gold border border-oxot-gold/30'
                                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    {protocol}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block">
                            Security Controls
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {SECURITY_CONTROLS.map(control => (
                                <button
                                    key={control}
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            securityControls: formData.securityControls.includes(control)
                                                ? formData.securityControls.filter(c => c !== control)
                                                : [...formData.securityControls, control]
                                        })
                                    }}
                                    className={`px-2 py-1 rounded text-[10px] transition-colors ${formData.securityControls.includes(control)
                                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    {control}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                SL Required
                            </label>
                            <select
                                value={formData.slRequired}
                                onChange={e => setFormData({ ...formData, slRequired: parseInt(e.target.value) as Conduit['slRequired'] })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                <option value={1}>SL-1</option>
                                <option value={2}>SL-2</option>
                                <option value={3}>SL-3</option>
                                <option value={4}>SL-4</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="encrypted"
                                checked={formData.encrypted}
                                onChange={e => setFormData({ ...formData, encrypted: e.target.checked })}
                                className="w-4 h-4 rounded bg-slate-800 border-slate-600"
                            />
                            <label htmlFor="encrypted" className="text-xs text-slate-300">Encrypted</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="monitored"
                                checked={formData.monitored}
                                onChange={e => setFormData({ ...formData, monitored: e.target.checked })}
                                className="w-4 h-4 rounded bg-slate-800 border-slate-600"
                            />
                            <label htmlFor="monitored" className="text-xs text-slate-300">Monitored</label>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 bg-slate-800 text-slate-300 font-bold rounded-lg border border-slate-700 hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-oxot-gold text-black font-bold rounded-lg hover:bg-yellow-500"
                        >
                            Add Conduit
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ZoneConduitEditorModule({
    zones,
    conduits,
    assets,
    onAddZone,
    onUpdateZone,
    onDeleteZone,
    onAddConduit,
    onUpdateConduit,
    onDeleteConduit,
    onAIScan
}: ZoneConduitEditorProps) {
    const [isZoneModalOpen, setIsZoneModalOpen] = useState(false)
    const [isConduitModalOpen, setIsConduitModalOpen] = useState(false)
    const [editingZone, setEditingZone] = useState<Zone | null>(null)
    const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null)
    const [selectedConduitId, setSelectedConduitId] = useState<string | null>(null)
    const [isScanning, setIsScanning] = useState(false)
    const [scanResult, setScanResult] = useState<string | null>(null)

    // Group zones by level
    const zonesByLevel = useMemo(() => {
        return ZONE_LEVELS.reduce((acc, level) => {
            acc[level.level] = zones.filter(z => z.level === level.level)
            return acc
        }, {} as Record<number, Zone[]>)
    }, [zones])

    const handleAddZone = (data: Omit<Zone, 'id'>) => {
        onAddZone({
            ...data,
            id: crypto.randomUUID()
        })
    }

    const handleEditZone = (data: Omit<Zone, 'id'>) => {
        if (editingZone) {
            onUpdateZone(editingZone.id, data)
        }
        setEditingZone(null)
    }

    const handleAddConduit = (data: Omit<Conduit, 'id'>) => {
        onAddConduit({
            ...data,
            id: crypto.randomUUID()
        })
    }

    const handleAIScan = async () => {
        if (!onAIScan) return
        setIsScanning(true)
        const result = await onAIScan()
        setScanResult(result)
        setIsScanning(false)
    }

    const getConduitCountForZone = (zoneId: string) => {
        return conduits.filter(c => c.fromZone === zoneId || c.toZone === zoneId).length
    }

    const getAssetCountForZone = (zoneId: string) => {
        return assets?.filter(a => a.zone === zoneId).length || zones.find(z => z.id === zoneId)?.assets.length || 0
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Layers className="text-oxot-gold" />
                            Zone & Conduit Definition
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            IEC 62443-3-2: Define security zones and conduits for network segmentation
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {onAIScan && (
                            <button
                                onClick={handleAIScan}
                                disabled={isScanning}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg flex items-center gap-2"
                            >
                                {isScanning ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Sparkles size={16} />
                                )}
                                AI Scan
                            </button>
                        )}
                        <button
                            onClick={() => setIsZoneModalOpen(true)}
                            className="px-4 py-2 bg-oxot-gold text-black font-bold rounded-lg hover:bg-yellow-500 flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Add Zone
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-white">{zones.length}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Zones</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-white">{conduits.length}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Conduits</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-oxot-gold">
                            {new Set(zones.map(z => z.level)).size}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Levels Used</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-green-400">
                            {conduits.filter(c => c.encrypted).length}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Encrypted Conduits</div>
                    </div>
                </div>
            </div>

            {/* AI Scan Result */}
            {scanResult && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4"
                >
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                            <Sparkles size={14} />
                            AI Security Analysis
                        </h3>
                        <button onClick={() => setScanResult(null)} className="text-purple-400 hover:text-white">
                            <X size={14} />
                        </button>
                    </div>
                    <p className="text-xs text-slate-300 whitespace-pre-wrap">{scanResult}</p>
                </motion.div>
            )}

            {/* Purdue Model Visualization */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Purdue Model Layers
                </h3>

                <div className="space-y-3">
                    {ZONE_LEVELS.map(level => {
                        const levelZones = zonesByLevel[level.level] || []

                        return (
                            <div key={level.level} className="relative">
                                {/* Level Header */}
                                <div
                                    className="flex items-center gap-3 mb-2 py-2 px-3 rounded-lg border-l-4"
                                    style={{
                                        borderLeftColor: level.color,
                                        backgroundColor: `${level.color}10`
                                    }}
                                >
                                    <span
                                        className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                                        style={{ backgroundColor: `${level.color}20`, color: level.color }}
                                    >
                                        L{level.level}
                                    </span>
                                    <span className="text-sm font-bold text-white">{level.name}</span>
                                    <span className="text-[10px] text-slate-500">{level.desc}</span>
                                    <span className="ml-auto text-[10px] text-slate-400">
                                        {levelZones.length} zones
                                    </span>
                                </div>

                                {/* Zones in this level */}
                                {levelZones.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 ml-6">
                                        {levelZones.map(zone => (
                                            <ZoneCard
                                                key={zone.id}
                                                zone={zone}
                                                assetCount={getAssetCountForZone(zone.id)}
                                                conduitCount={getConduitCountForZone(zone.id)}
                                                isSelected={selectedZoneId === zone.id}
                                                onClick={() => setSelectedZoneId(zone.id)}
                                                onEdit={() => { setEditingZone(zone); setIsZoneModalOpen(true) }}
                                                onDelete={() => onDeleteZone(zone.id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Conduits Section */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Network size={16} className="text-oxot-gold" />
                        Conduit Definitions
                    </h3>
                    <button
                        onClick={() => setIsConduitModalOpen(true)}
                        disabled={zones.length < 2}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus size={12} />
                        Add Conduit
                    </button>
                </div>

                {zones.length < 2 ? (
                    <div className="text-center py-8 text-slate-500 text-xs">
                        Add at least 2 zones to create conduits
                    </div>
                ) : conduits.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-xs">
                        No conduits defined. Add conduits to connect zones.
                    </div>
                ) : (
                    <div className="space-y-2">
                        {conduits.map(conduit => (
                            <ConduitRow
                                key={conduit.id}
                                conduit={conduit}
                                zones={zones}
                                isSelected={selectedConduitId === conduit.id}
                                onClick={() => setSelectedConduitId(conduit.id)}
                                onDelete={() => onDeleteConduit(conduit.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isZoneModalOpen && (
                    <AddZoneModal
                        isOpen={isZoneModalOpen}
                        onClose={() => { setIsZoneModalOpen(false); setEditingZone(null) }}
                        onSubmit={editingZone ? handleEditZone : handleAddZone}
                        editZone={editingZone}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isConduitModalOpen && (
                    <AddConduitModal
                        isOpen={isConduitModalOpen}
                        onClose={() => setIsConduitModalOpen(false)}
                        onSubmit={handleAddConduit}
                        zones={zones}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
