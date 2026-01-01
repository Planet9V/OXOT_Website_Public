'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Server, Network, Database, Cpu, Monitor, Plus, Trash2,
    Edit2, CheckCircle, AlertTriangle, X, Upload, Download,
    Search, Filter, ChevronDown, Sparkles, Loader2
} from 'lucide-react'

// ============================================================
// TYPES
// ============================================================

export interface Asset {
    id: string
    name: string
    type: 'PLC' | 'HMI' | 'Workstation' | 'Server' | 'Network' | 'Sensor' | 'Safety' | 'Other'
    zone: string
    ip?: string
    vendor?: string
    model?: string
    firmware?: string
    criticality: 'Critical' | 'High' | 'Medium' | 'Low'
    slTarget?: number
    aiAnalysis?: string
    protocols?: string[]
}

interface AssetInventoryProps {
    assets: Asset[]
    onAddAsset: (asset: Asset) => void
    onUpdateAsset: (id: string, data: Partial<Asset>) => void
    onDeleteAsset: (id: string) => void
    onAIEnrich?: (asset: Asset) => Promise<string>
}

// ============================================================
// CONSTANTS
// ============================================================

const ASSET_TYPES = [
    { value: 'PLC', label: 'PLC/RTU', icon: Cpu, color: 'purple' },
    { value: 'HMI', label: 'HMI', icon: Monitor, color: 'blue' },
    { value: 'Workstation', label: 'Workstation', icon: Monitor, color: 'cyan' },
    { value: 'Server', label: 'Server', icon: Server, color: 'green' },
    { value: 'Network', label: 'Network', icon: Network, color: 'yellow' },
    { value: 'Sensor', label: 'Sensor/IO', icon: Cpu, color: 'pink' },
    { value: 'Safety', label: 'Safety System', icon: AlertTriangle, color: 'red' },
    { value: 'Other', label: 'Other', icon: Database, color: 'gray' }
]

const CRITICALITY_COLORS = {
    Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Low: 'bg-green-500/20 text-green-400 border-green-500/30'
}

const ZONE_LEVELS = [
    { level: 0, name: 'Enterprise', color: 'blue' },
    { level: 1, name: 'Site Business', color: 'cyan' },
    { level: 2, name: 'Site Operations', color: 'green' },
    { level: 3, name: 'Control', color: 'yellow' },
    { level: 4, name: 'Process', color: 'orange' },
    { level: 5, name: 'Safety', color: 'red' }
]

// ============================================================
// ASSET FORM MODAL
// ============================================================

const AssetFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    editAsset
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (asset: Omit<Asset, 'id'>) => void
    editAsset?: Asset | null
}) => {
    const [formData, setFormData] = useState<Omit<Asset, 'id'>>({
        name: editAsset?.name || '',
        type: editAsset?.type || 'PLC',
        zone: editAsset?.zone || 'Zone 3',
        ip: editAsset?.ip || '',
        vendor: editAsset?.vendor || '',
        model: editAsset?.model || '',
        firmware: editAsset?.firmware || '',
        criticality: editAsset?.criticality || 'Medium',
        slTarget: editAsset?.slTarget || 2,
        protocols: editAsset?.protocols || []
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
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {editAsset ? 'Edit Asset' : 'Add New Asset'}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Asset Name */}
                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Asset Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            placeholder="e.g., Safety PLC Main"
                        />
                    </div>

                    {/* Type & Zone Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Asset Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as Asset['type'] })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                {ASSET_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Zone
                            </label>
                            <select
                                value={formData.zone}
                                onChange={e => setFormData({ ...formData, zone: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                {ZONE_LEVELS.map(zone => (
                                    <option key={zone.level} value={`Zone ${zone.level}`}>
                                        Level {zone.level}: {zone.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* IP & Vendor Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                IP Address
                            </label>
                            <input
                                type="text"
                                value={formData.ip}
                                onChange={e => setFormData({ ...formData, ip: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                                placeholder="192.168.1.100"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Vendor
                            </label>
                            <input
                                type="text"
                                value={formData.vendor}
                                onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                                placeholder="e.g., Siemens"
                            />
                        </div>
                    </div>

                    {/* Model & Firmware Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Model
                            </label>
                            <input
                                type="text"
                                value={formData.model}
                                onChange={e => setFormData({ ...formData, model: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                                placeholder="e.g., S7-1500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Firmware Version
                            </label>
                            <input
                                type="text"
                                value={formData.firmware}
                                onChange={e => setFormData({ ...formData, firmware: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                                placeholder="e.g., V2.9.4"
                            />
                        </div>
                    </div>

                    {/* Criticality & SL Target Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Criticality
                            </label>
                            <select
                                value={formData.criticality}
                                onChange={e => setFormData({ ...formData, criticality: e.target.value as Asset['criticality'] })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                SL-Target
                            </label>
                            <select
                                value={formData.slTarget}
                                onChange={e => setFormData({ ...formData, slTarget: parseInt(e.target.value) })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                <option value={1}>SL-1 (Basic)</option>
                                <option value={2}>SL-2 (Common)</option>
                                <option value={3}>SL-3 (Enhanced)</option>
                                <option value={4}>SL-4 (Hardened)</option>
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
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
                            {editAsset ? 'Save Changes' : 'Add Asset'}
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

export default function AssetInventoryModule({
    assets,
    onAddAsset,
    onUpdateAsset,
    onDeleteAsset,
    onAIEnrich
}: AssetInventoryProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState<string | null>(null)
    const [filterZone, setFilterZone] = useState<string | null>(null)
    const [enrichingId, setEnrichingId] = useState<string | null>(null)

    // Filtered assets
    const filteredAssets = assets.filter(asset => {
        const matchesSearch = !searchQuery ||
            asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.ip?.includes(searchQuery)
        const matchesType = !filterType || asset.type === filterType
        const matchesZone = !filterZone || asset.zone === filterZone
        return matchesSearch && matchesType && matchesZone
    })

    // Group by zone
    const assetsByZone = filteredAssets.reduce((acc, asset) => {
        if (!acc[asset.zone]) acc[asset.zone] = []
        acc[asset.zone].push(asset)
        return acc
    }, {} as Record<string, Asset[]>)

    const handleAddAsset = (data: Omit<Asset, 'id'>) => {
        onAddAsset({
            ...data,
            id: crypto.randomUUID()
        })
    }

    const handleEditAsset = (data: Omit<Asset, 'id'>) => {
        if (editingAsset) {
            onUpdateAsset(editingAsset.id, data)
        }
        setEditingAsset(null)
    }

    const handleEnrich = async (asset: Asset) => {
        if (!onAIEnrich) return
        setEnrichingId(asset.id)
        try {
            const analysis = await onAIEnrich(asset)
            onUpdateAsset(asset.id, { aiAnalysis: analysis })
        } catch (e) {
            console.error('AI enrichment failed:', e)
        }
        setEnrichingId(null)
    }

    const stats = {
        total: assets.length,
        critical: assets.filter(a => a.criticality === 'Critical').length,
        byType: ASSET_TYPES.reduce((acc, type) => {
            acc[type.value] = assets.filter(a => a.type === type.value).length
            return acc
        }, {} as Record<string, number>)
    }

    return (
        <div className="space-y-6">
            {/* Header & Stats */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Database className="text-oxot-gold" />
                            Asset Inventory
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            IEC 62443-2-1 requires a comprehensive inventory of all IACS assets
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-oxot-gold text-black font-bold rounded-lg hover:bg-yellow-500 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Asset
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-white">{stats.total}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Total Assets</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-red-500/20">
                        <div className="text-2xl font-black text-red-400">{stats.critical}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Critical Assets</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-white">{Object.keys(assetsByZone).length}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Zones</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-white">
                            {assets.filter(a => a.aiAnalysis).length}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">AI Analyzed</div>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search assets by name, vendor, or IP..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                    />
                </div>
                <select
                    value={filterType || ''}
                    onChange={e => setFilterType(e.target.value || null)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                >
                    <option value="">All Types</option>
                    {ASSET_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
                <select
                    value={filterZone || ''}
                    onChange={e => setFilterZone(e.target.value || null)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                >
                    <option value="">All Zones</option>
                    {ZONE_LEVELS.map(zone => (
                        <option key={zone.level} value={`Zone ${zone.level}`}>Zone {zone.level}</option>
                    ))}
                </select>
            </div>

            {/* Asset Table */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800/50 border-b border-white/5">
                        <tr>
                            <th className="text-left px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">Asset</th>
                            <th className="text-left px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">Type</th>
                            <th className="text-left px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">Zone</th>
                            <th className="text-left px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">Vendor</th>
                            <th className="text-left px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">IP</th>
                            <th className="text-left px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">Criticality</th>
                            <th className="text-left px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">SL-T</th>
                            <th className="text-right px-4 py-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredAssets.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                                    <Database size={32} className="mx-auto mb-3 opacity-50" />
                                    <p>No assets found</p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="mt-3 text-oxot-gold hover:underline text-sm"
                                    >
                                        Add your first asset
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            filteredAssets.map(asset => {
                                const typeInfo = ASSET_TYPES.find(t => t.value === asset.type)
                                const TypeIcon = typeInfo?.icon || Database
                                return (
                                    <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg bg-${typeInfo?.color}-500/20 flex items-center justify-center`}>
                                                    <TypeIcon size={16} className={`text-${typeInfo?.color}-400`} />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-white block">{asset.name}</span>
                                                    {asset.model && (
                                                        <span className="text-[10px] text-slate-500">{asset.model}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-1 rounded bg-${typeInfo?.color}-500/20 text-${typeInfo?.color}-400`}>
                                                {typeInfo?.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-300">{asset.zone}</td>
                                        <td className="px-4 py-3 text-sm text-slate-400">{asset.vendor || '-'}</td>
                                        <td className="px-4 py-3 text-sm font-mono text-slate-400">{asset.ip || '-'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[10px] px-2 py-1 rounded border font-bold ${CRITICALITY_COLORS[asset.criticality]}`}>
                                                {asset.criticality}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-mono text-oxot-gold">SL-{asset.slTarget || 2}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {onAIEnrich && (
                                                    <button
                                                        onClick={() => handleEnrich(asset)}
                                                        disabled={enrichingId === asset.id}
                                                        className="p-1.5 hover:bg-purple-500/20 rounded text-purple-400"
                                                        title="AI Analyze"
                                                    >
                                                        {enrichingId === asset.id ? (
                                                            <Loader2 size={14} className="animate-spin" />
                                                        ) : (
                                                            <Sparkles size={14} />
                                                        )}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => { setEditingAsset(asset); setIsModalOpen(true) }}
                                                    className="p-1.5 hover:bg-slate-700 rounded text-slate-400"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => onDeleteAsset(asset.id)}
                                                    className="p-1.5 hover:bg-red-500/20 rounded text-red-400"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* AI Analysis Panel */}
            {assets.some(a => a.aiAnalysis) && (
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-purple-400 mb-4 flex items-center gap-2">
                        <Sparkles size={16} />
                        AI Risk Insights
                    </h3>
                    <div className="space-y-3">
                        {assets.filter(a => a.aiAnalysis).map(asset => (
                            <div key={asset.id} className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/10">
                                <div className="text-xs font-bold text-white mb-2">{asset.name}</div>
                                <p className="text-xs text-slate-400 leading-relaxed">{asset.aiAnalysis}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <AssetFormModal
                        isOpen={isModalOpen}
                        onClose={() => { setIsModalOpen(false); setEditingAsset(null) }}
                        onSubmit={editingAsset ? handleEditAsset : handleAddAsset}
                        editAsset={editingAsset}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
