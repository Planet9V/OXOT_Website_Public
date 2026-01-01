'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import {
    AlertTriangle, AlertCircle, Shield, CheckCircle, X, Plus,
    Target, Skull, ChevronRight, Sparkles, Loader2, TrendingUp,
    TrendingDown, Minus, GripVertical, ExternalLink, Edit2
} from 'lucide-react'

// ============================================================
// TYPES
// ============================================================

export interface RiskScenario {
    id: string
    title: string
    description?: string
    assetId?: string
    assetName?: string
    status: 'identified' | 'analyzing' | 'mitigated' | 'accepted' | 'transferred'
    impact: 1 | 2 | 3 | 4 | 5
    likelihood: 1 | 2 | 3 | 4 | 5
    threatActor?: string
    threatVector?: string
    consequence?: string
    countermeasures?: string[]
    aiSuggestion?: string
    frAffected?: string[]
}

interface RiskBoardProps {
    risks: RiskScenario[]
    onAddRisk: (risk: RiskScenario) => void
    onUpdateRisk: (id: string, data: Partial<RiskScenario>) => void
    onDeleteRisk: (id: string) => void
    onAIAnalyze?: (risk: RiskScenario) => Promise<string>
    assets?: { id: string; name: string }[]
}

// ============================================================
// CONSTANTS
// ============================================================

const STATUS_COLUMNS = [
    { id: 'identified', title: 'Identified', color: 'red', icon: AlertTriangle },
    { id: 'analyzing', title: 'Analyzing', color: 'yellow', icon: Target },
    { id: 'mitigated', title: 'Mitigated', color: 'green', icon: Shield },
    { id: 'accepted', title: 'Accepted', color: 'blue', icon: CheckCircle }
]

const IMPACT_LABELS = ['', 'Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic']
const LIKELIHOOD_LABELS = ['', 'Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain']

const THREAT_ACTORS = [
    { id: 'script-kiddie', name: 'Script Kiddie', sl: 1 },
    { id: 'insider', name: 'Malicious Insider', sl: 2 },
    { id: 'hacktivist', name: 'Hacktivist', sl: 2 },
    { id: 'organized-crime', name: 'Organized Crime', sl: 3 },
    { id: 'nation-state', name: 'Nation State (APT)', sl: 4 }
]

const THREAT_VECTORS = [
    'Remote Exploit',
    'Phishing/Social Engineering',
    'Malware Infection',
    'Physical Access',
    'Supply Chain Compromise',
    'Credential Theft',
    'Protocol Abuse',
    'Configuration Error'
]

// ============================================================
// HELPERS
// ============================================================

const getRiskScore = (impact: number, likelihood: number) => impact * likelihood

const getRiskLevel = (score: number): { level: string; color: string } => {
    if (score <= 4) return { level: 'Low', color: 'green' }
    if (score <= 9) return { level: 'Medium', color: 'yellow' }
    if (score <= 16) return { level: 'High', color: 'orange' }
    return { level: 'Critical', color: 'red' }
}

// ============================================================
// RISK CARD COMPONENT
// ============================================================

const RiskCard = ({
    risk,
    onUpdate,
    onDelete,
    onAIAnalyze,
    isAnalyzing
}: {
    risk: RiskScenario
    onUpdate: (data: Partial<RiskScenario>) => void
    onDelete: () => void
    onAIAnalyze?: () => void
    isAnalyzing?: boolean
}) => {
    const riskScore = getRiskScore(risk.impact, risk.likelihood)
    const { level, color } = getRiskLevel(riskScore)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800/80 border border-white/5 rounded-lg p-4 hover:border-oxot-gold/30 transition-colors group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <GripVertical size={14} className="text-slate-600 cursor-grab" />
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold bg-${color}-500/20 text-${color}-400 border border-${color}-500/30`}>
                        {level} ({riskScore})
                    </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onAIAnalyze && (
                        <button
                            onClick={onAIAnalyze}
                            disabled={isAnalyzing}
                            className="p-1 hover:bg-purple-500/20 rounded text-purple-400"
                            title="AI Analyze"
                        >
                            {isAnalyzing ? (
                                <Loader2 size={12} className="animate-spin" />
                            ) : (
                                <Sparkles size={12} />
                            )}
                        </button>
                    )}
                    <button onClick={onDelete} className="p-1 hover:bg-red-500/20 rounded text-red-400">
                        <X size={12} />
                    </button>
                </div>
            </div>

            {/* Title */}
            <h4 className="text-sm font-bold text-white mb-2 leading-tight">{risk.title}</h4>

            {/* Asset Reference */}
            {risk.assetName && (
                <div className="text-[10px] text-slate-500 mb-2 flex items-center gap-1">
                    <Target size={10} />
                    {risk.assetName}
                </div>
            )}

            {/* Risk Matrix Mini */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-slate-900/50 rounded p-2">
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Impact</div>
                    <div className="flex items-center gap-1">
                        <div className={`text-xs font-bold text-${color}-400`}>{risk.impact}</div>
                        <span className="text-[10px] text-slate-400">/ 5</span>
                    </div>
                </div>
                <div className="bg-slate-900/50 rounded p-2">
                    <div className="text-[10px] text-slate-500 uppercase mb-0.5">Likelihood</div>
                    <div className="flex items-center gap-1">
                        <div className={`text-xs font-bold text-${color}-400`}>{risk.likelihood}</div>
                        <span className="text-[10px] text-slate-400">/ 5</span>
                    </div>
                </div>
            </div>

            {/* Threat Details */}
            {(risk.threatActor || risk.threatVector) && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {risk.threatActor && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded">
                            {risk.threatActor}
                        </span>
                    )}
                    {risk.threatVector && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded">
                            {risk.threatVector}
                        </span>
                    )}
                </div>
            )}

            {/* FR Affected */}
            {risk.frAffected && risk.frAffected.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {risk.frAffected.map(fr => (
                        <span key={fr} className="text-[10px] px-1.5 py-0.5 bg-oxot-gold/20 text-oxot-gold rounded font-mono">
                            {fr}
                        </span>
                    ))}
                </div>
            )}

            {/* AI Suggestion */}
            {risk.aiSuggestion && (
                <div className="mt-3 p-2 bg-purple-900/20 border border-purple-500/20 rounded text-[10px] text-purple-300">
                    <div className="flex items-center gap-1 mb-1 text-purple-400 font-bold">
                        <Sparkles size={10} />
                        AI Insight
                    </div>
                    {risk.aiSuggestion}
                </div>
            )}

            {/* Countermeasures */}
            {risk.countermeasures && risk.countermeasures.length > 0 && (
                <div className="mt-3 border-t border-white/5 pt-3">
                    <div className="text-[10px] text-slate-500 uppercase mb-1">Countermeasures</div>
                    <ul className="space-y-1">
                        {risk.countermeasures.map((cm, i) => (
                            <li key={i} className="text-[10px] text-slate-400 flex items-start gap-1">
                                <CheckCircle size={10} className="text-green-400 mt-0.5 flex-shrink-0" />
                                {cm}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    )
}

// ============================================================
// ADD RISK MODAL
// ============================================================

const AddRiskModal = ({
    isOpen,
    onClose,
    onSubmit,
    assets
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (risk: Omit<RiskScenario, 'id'>) => void
    assets?: { id: string; name: string }[]
}) => {
    const [formData, setFormData] = useState<Omit<RiskScenario, 'id'>>({
        title: '',
        description: '',
        assetId: '',
        assetName: '',
        status: 'identified',
        impact: 3,
        likelihood: 3,
        threatActor: '',
        threatVector: '',
        consequence: '',
        frAffected: []
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const selectedAsset = assets?.find(a => a.id === formData.assetId)
        onSubmit({
            ...formData,
            assetName: selectedAsset?.name || formData.assetName
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
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Add Risk Scenario</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Risk Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            placeholder="e.g., Unauthorized remote access to Safety PLC"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none h-20 resize-none"
                            placeholder="Describe the risk scenario..."
                        />
                    </div>

                    {/* Asset Selection */}
                    {assets && assets.length > 0 && (
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Affected Asset
                            </label>
                            <select
                                value={formData.assetId}
                                onChange={e => setFormData({ ...formData, assetId: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                <option value="">Select an asset...</option>
                                {assets.map(asset => (
                                    <option key={asset.id} value={asset.id}>{asset.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Threat Actor & Vector */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Threat Actor
                            </label>
                            <select
                                value={formData.threatActor}
                                onChange={e => setFormData({ ...formData, threatActor: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                <option value="">Select...</option>
                                {THREAT_ACTORS.map(actor => (
                                    <option key={actor.id} value={actor.name}>
                                        {actor.name} (SL-{actor.sl})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Attack Vector
                            </label>
                            <select
                                value={formData.threatVector}
                                onChange={e => setFormData({ ...formData, threatVector: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                <option value="">Select...</option>
                                {THREAT_VECTORS.map(vector => (
                                    <option key={vector} value={vector}>{vector}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Impact & Likelihood */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Impact (1-5)
                            </label>
                            <select
                                value={formData.impact}
                                onChange={e => setFormData({ ...formData, impact: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n} - {IMPACT_LABELS[n]}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                                Likelihood (1-5)
                            </label>
                            <select
                                value={formData.likelihood}
                                onChange={e => setFormData({ ...formData, likelihood: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-oxot-gold focus:outline-none"
                            >
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n} - {LIKELIHOOD_LABELS[n]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Risk Matrix Preview */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-[10px] text-slate-500 uppercase mb-2">Risk Score Preview</div>
                        {(() => {
                            const score = formData.impact * formData.likelihood
                            const { level, color } = getRiskLevel(score)
                            return (
                                <div className="flex items-center gap-3">
                                    <div className={`text-3xl font-black text-${color}-400`}>{score}</div>
                                    <div>
                                        <div className={`text-sm font-bold text-${color}-400`}>{level} Risk</div>
                                        <div className="text-[10px] text-slate-500">
                                            {formData.impact} × {formData.likelihood}
                                        </div>
                                    </div>
                                </div>
                            )
                        })()}
                    </div>

                    {/* FR Affected */}
                    <div>
                        <label className="text-xs text-slate-400 uppercase tracking-wider mb-1 block">
                            Foundational Requirements Affected
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {['FR1', 'FR2', 'FR3', 'FR4', 'FR5', 'FR6', 'FR7'].map(fr => (
                                <button
                                    key={fr}
                                    type="button"
                                    onClick={() => {
                                        const current = formData.frAffected || []
                                        setFormData({
                                            ...formData,
                                            frAffected: current.includes(fr)
                                                ? current.filter(f => f !== fr)
                                                : [...current, fr]
                                        })
                                    }}
                                    className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${(formData.frAffected || []).includes(fr)
                                            ? 'bg-oxot-gold/20 text-oxot-gold border border-oxot-gold/30'
                                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    {fr}
                                </button>
                            ))}
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
                            Add Risk
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

export default function RiskBoardModule({
    risks,
    onAddRisk,
    onUpdateRisk,
    onDeleteRisk,
    onAIAnalyze,
    assets
}: RiskBoardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [analyzingId, setAnalyzingId] = useState<string | null>(null)

    // Group risks by status
    const risksByStatus = useMemo(() => {
        return STATUS_COLUMNS.reduce((acc, col) => {
            acc[col.id] = risks.filter(r => r.status === col.id)
            return acc
        }, {} as Record<string, RiskScenario[]>)
    }, [risks])

    // Stats
    const stats = useMemo(() => {
        const total = risks.length
        const critical = risks.filter(r => getRiskScore(r.impact, r.likelihood) > 16).length
        const mitigated = risks.filter(r => r.status === 'mitigated').length
        const avgScore = total > 0
            ? Math.round(risks.reduce((sum, r) => sum + getRiskScore(r.impact, r.likelihood), 0) / total)
            : 0
        return { total, critical, mitigated, avgScore }
    }, [risks])

    const handleAddRisk = (data: Omit<RiskScenario, 'id'>) => {
        onAddRisk({
            ...data,
            id: crypto.randomUUID()
        })
    }

    const handleStatusChange = (riskId: string, newStatus: string) => {
        onUpdateRisk(riskId, { status: newStatus as RiskScenario['status'] })
    }

    const handleAIAnalyze = async (risk: RiskScenario) => {
        if (!onAIAnalyze) return
        setAnalyzingId(risk.id)
        const suggestion = await onAIAnalyze(risk)
        onUpdateRisk(risk.id, { aiSuggestion: suggestion })
        setAnalyzingId(null)
    }

    return (
        <div className="space-y-6">
            {/* Header & Stats */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <AlertTriangle className="text-oxot-gold" />
                            Risk Assessment Board
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                            IEC 62443-3-2: Security Risk Assessment for System Design
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-oxot-gold text-black font-bold rounded-lg hover:bg-yellow-500 flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Risk
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-white">{stats.total}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Total Risks</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-red-500/20">
                        <div className="text-2xl font-black text-red-400">{stats.critical}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Critical Risks</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
                        <div className="text-2xl font-black text-green-400">{stats.mitigated}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Mitigated</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="text-2xl font-black text-oxot-gold">{stats.avgScore}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">Avg. Risk Score</div>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-4 gap-4">
                {STATUS_COLUMNS.map(column => {
                    const Icon = column.icon
                    const columnRisks = risksByStatus[column.id] || []

                    return (
                        <div key={column.id} className="bg-slate-900/30 rounded-xl border border-white/5 overflow-hidden">
                            {/* Column Header */}
                            <div className={`px-4 py-3 border-b border-white/5 bg-${column.color}-500/10`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon size={16} className={`text-${column.color}-400`} />
                                        <span className="font-bold text-white text-sm">{column.title}</span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full bg-${column.color}-500/20 text-${column.color}-400 font-bold`}>
                                        {columnRisks.length}
                                    </span>
                                </div>
                            </div>

                            {/* Column Content */}
                            <div className="p-3 space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto">
                                <AnimatePresence mode="popLayout">
                                    {columnRisks.map(risk => (
                                        <RiskCard
                                            key={risk.id}
                                            risk={risk}
                                            onUpdate={(data) => onUpdateRisk(risk.id, data)}
                                            onDelete={() => onDeleteRisk(risk.id)}
                                            onAIAnalyze={onAIAnalyze ? () => handleAIAnalyze(risk) : undefined}
                                            isAnalyzing={analyzingId === risk.id}
                                        />
                                    ))}
                                </AnimatePresence>

                                {columnRisks.length === 0 && (
                                    <div className="h-32 flex items-center justify-center text-slate-600 text-xs">
                                        No risks in this stage
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* 5x5 Risk Matrix Visualization */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Risk Matrix (5×5)
                </h3>
                <div className="grid grid-cols-6 gap-1">
                    {/* Y-axis label */}
                    <div className="flex items-center justify-center">
                        <span className="text-[10px] text-slate-500 -rotate-90 whitespace-nowrap">IMPACT</span>
                    </div>
                    {/* Matrix */}
                    {[5, 4, 3, 2, 1].map(impact => (
                        <React.Fragment key={impact}>
                            {[1, 2, 3, 4, 5].map(likelihood => {
                                const score = impact * likelihood
                                const { color } = getRiskLevel(score)
                                const matchingRisks = risks.filter(r => r.impact === impact && r.likelihood === likelihood)

                                return (
                                    <div
                                        key={`${impact}-${likelihood}`}
                                        className={`aspect-square rounded flex items-center justify-center text-[10px] font-bold bg-${color}-500/20 text-${color}-400 border border-${color}-500/20 relative group`}
                                    >
                                        {matchingRisks.length > 0 ? (
                                            <>
                                                <span>{matchingRisks.length}</span>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 rounded text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                                    {matchingRisks.map(r => r.title).join(', ')}
                                                </div>
                                            </>
                                        ) : (
                                            <span className="opacity-30">{score}</span>
                                        )}
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                    {/* X-axis label */}
                    <div />
                    <div className="col-span-5 flex justify-center mt-2">
                        <span className="text-[10px] text-slate-500">LIKELIHOOD →</span>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <AddRiskModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddRisk}
                        assets={assets}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
