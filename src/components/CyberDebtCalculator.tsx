'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    DollarSign, AlertTriangle, Wrench, TrendingDown,
    Calculator, FileText, ChevronDown, Briefcase
} from 'lucide-react'

// Example calculation breakdown
const DEFAULT_BREAKDOWN = {
    criticalVulns: { count: 50, costPer: 50000, total: 2500000 },
    highVulns: { count: 200, costPer: 10000, total: 2000000 },
    expectedBreach: { probability: 0.30, impact: 15000000, total: 4500000 },
    totalDebt: 9000000
}

interface Props {
    targetName?: string
    breakdown?: typeof DEFAULT_BREAKDOWN
}

export default function CyberDebtCalculator({ targetName = 'Target Corp', breakdown = DEFAULT_BREAKDOWN }: Props) {
    const [animatedTotal, setAnimatedTotal] = useState(0)
    const [showDetails, setShowDetails] = useState(false)

    // Animate the total counter
    useEffect(() => {
        const duration = 2000
        const steps = 60
        const increment = breakdown.totalDebt / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= breakdown.totalDebt) {
                setAnimatedTotal(breakdown.totalDebt)
                clearInterval(timer)
            } else {
                setAnimatedTotal(current)
            }
        }, duration / steps)
        return () => clearInterval(timer)
    }, [breakdown.totalDebt])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs font-mono text-oxot-gold uppercase tracking-widest mb-1">
                            Valuation Adjustment Required
                        </div>
                        <h3 className="text-xl font-black text-white">Cyber Debt Quantification</h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-oxot-gold/10 flex items-center justify-center">
                        <Calculator size={24} className="text-oxot-gold" />
                    </div>
                </div>
            </div>

            {/* Main Total Display */}
            <div className="p-8 text-center bg-black/40">
                <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-2">
                    Total Cyber Debt for {targetName}
                </div>
                <motion.div
                    className="text-5xl md:text-6xl font-black text-red-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ textShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}
                >
                    {formatCurrency(animatedTotal)}
                </motion.div>
                <div className="text-sm text-gray-400 mt-2">
                    Recommended: Reduce offer by this amount or require escrow
                </div>
            </div>

            {/* Breakdown Section */}
            <div className="px-6 pb-6 pt-6">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors group"
                >
                    <span className="text-sm font-medium text-white flex items-center gap-2">
                        <FileText size={16} className="text-oxot-gold group-hover:text-white transition-colors" />
                        View Calculation Breakdown
                    </span>
                    <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                    />
                </button>

                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 space-y-4">
                                {/* Remediation Cost Section */}
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Wrench size={16} className="text-oxot-gold" />
                                        <span className="text-sm font-bold text-white">Remediation Cost</span>
                                    </div>

                                    {/* Critical Vulns */}
                                    <div className="flex items-center justify-between py-2 border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            <span className="text-sm text-gray-400">Critical Vulnerabilities</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-mono text-white">
                                                {breakdown.criticalVulns.count} × {formatCurrency(breakdown.criticalVulns.costPer)}
                                            </div>
                                            <div className="text-xs text-gray-500">= {formatCurrency(breakdown.criticalVulns.total)}</div>
                                        </div>
                                    </div>

                                    {/* High Vulns */}
                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                                            <span className="text-sm text-gray-400">High Vulnerabilities</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-mono text-white">
                                                {breakdown.highVulns.count} × {formatCurrency(breakdown.highVulns.costPer)}
                                            </div>
                                            <div className="text-xs text-gray-500">= {formatCurrency(breakdown.highVulns.total)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expected Loss Section */}
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertTriangle size={16} className="text-red-400" />
                                        <span className="text-sm font-bold text-white">Expected Loss</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            <span className="text-sm text-gray-400">Expected Breach</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-mono text-white">
                                                P={breakdown.expectedBreach.probability} × {formatCurrency(breakdown.expectedBreach.impact)}
                                            </div>
                                            <div className="text-xs text-gray-500">= {formatCurrency(breakdown.expectedBreach.total)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Formula Display */}
                                <div className="p-4 bg-blue-900/10 border border-oxot-blue/20 rounded-lg">
                                    <div className="text-xs font-mono text-oxot-blue mb-2">MCDE FORMULA</div>
                                    <code className="text-sm text-white block">
                                        CyberDebt = RemediationCost + ExpectedLoss
                                    </code>
                                    <code className="text-xs text-gray-400 block mt-1">
                                        = ({formatCurrency(breakdown.criticalVulns.total)} + {formatCurrency(breakdown.highVulns.total)}) + {formatCurrency(breakdown.expectedBreach.total)}
                                    </code>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Recommendation Banner */}
            <div className="p-4 bg-gradient-to-r from-red-500/10 via-transparent to-transparent border-t border-red-500/20 flex items-start gap-3">
                <Briefcase size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                    <div className="text-white font-bold text-sm">Negotiation Recommendation</div>
                    <p className="text-gray-400 text-xs mt-1">
                        Require <strong className="text-red-400">{formatCurrency(breakdown.criticalVulns.total + breakdown.highVulns.total)}</strong> escrow for post-close
                        remediation. Include cyber-specific reps & warranties with indemnification for pre-close breaches.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
