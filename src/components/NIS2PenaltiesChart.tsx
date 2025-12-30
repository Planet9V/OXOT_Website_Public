'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Euro, Scale, Users, Ban, FileWarning, Building2 } from 'lucide-react'

// Penalty structure
const PENALTIES = {
    essential: {
        maxFine: '€10 million',
        percentTurnover: '2%',
        description: 'Maximum of €10 million OR 2% of total worldwide annual turnover (whichever is higher)',
        color: '#D4AF37', // Gold
        examples: ['Energy operators', 'Healthcare providers', 'Digital infrastructure', 'Banking']
    },
    important: {
        maxFine: '€7 million',
        percentTurnover: '1.4%',
        description: 'Maximum of €7 million OR 1.4% of total worldwide annual turnover (whichever is higher)',
        color: '#64748b', // Slate/Gray - keep it subdued
        examples: ['Manufacturing', 'Food production', 'Postal services', 'Waste management']
    }
}

// Non-monetary sanctions
const NON_MONETARY_SANCTIONS = [
    { icon: FileWarning, title: 'Mandatory Security Audits', description: 'Competent authorities can require comprehensive security audits' },
    { icon: Ban, title: 'Operational Restrictions', description: 'Temporary suspension of activities or services until compliance' },
    { icon: Users, title: 'Management Liability', description: 'Individual accountability for board members and executives' },
    { icon: Building2, title: 'Public Disclosure', description: 'Public naming of non-compliant entities and nature of breach' }
]

// Personal liability information
const PERSONAL_LIABILITY = {
    title: 'Management Body Accountability',
    details: [
        'Board members must approve cybersecurity measures',
        'Executives must oversee implementation',
        'Mandatory cybersecurity training for management',
        'Temporary ban from management roles for gross negligence',
        'Personal liability for failure to comply'
    ]
}

// Country-specific examples (where different from baseline)
const COUNTRY_VARIATIONS = [
    { country: 'Germany', note: 'BSI may impose additional sector-specific requirements', color: '#fbbf24' },
    { country: 'France', note: 'ANSSI can mandate immediate remediation actions', color: '#3b82f6' },
    { country: 'Italy', note: 'ACN enforces with graduated penalty structure', color: '#22c55e' },
    { country: 'Netherlands', note: 'Sector regulators may add industry-specific fines', color: '#f97316' },
    { country: 'Belgium', note: 'Multi-framework approach may increase compliance burden', color: '#3b82f6' }
]

export default function NIS2PenaltiesChart() {
    return (
        <div className="space-y-8">
            {/* Main Penalty Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Essential Entities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 overflow-hidden"
                >
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-oxot-gold/5 rounded-full blur-3xl" />

                    <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="text-oxot-gold" size={20} />
                            <span className="text-oxot-gold font-bold uppercase tracking-wider text-sm">Essential Entities</span>
                        </div>

                        <div className="space-y-4">
                            {/* Maximum Fine */}
                            <div>
                                <div className="text-5xl font-black text-white" style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}>{PENALTIES.essential.maxFine}</div>
                                <div className="text-gray-500 text-sm mt-1">OR</div>
                                <div className="text-3xl font-bold text-white mt-1">
                                    {PENALTIES.essential.percentTurnover} <span className="text-lg font-normal text-gray-400">of global turnover</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">(whichever is higher)</div>
                            </div>

                            {/* Visual Bar */}
                            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="h-full bg-gradient-to-r from-oxot-gold to-yellow-600 rounded-full"
                                />
                            </div>

                            {/* Examples */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {PENALTIES.essential.examples.map((ex, i) => (
                                    <span key={i} className="px-2 py-1 bg-oxot-gold/10 text-oxot-gold text-xs rounded border border-oxot-gold/20">
                                        {ex}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Important Entities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 overflow-hidden"
                >
                    {/* Decorative */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-oxot-blue/5 rounded-full blur-3xl" />

                    <div className="relative">
                        <div className="flex items-center gap-2 mb-4">
                            <Scale className="text-oxot-blue" size={20} />
                            <span className="text-oxot-blue font-bold uppercase tracking-wider text-sm">Important Entities</span>
                        </div>

                        <div className="space-y-4">
                            {/* Maximum Fine */}
                            <div>
                                <div className="text-5xl font-black text-white">{PENALTIES.important.maxFine}</div>
                                <div className="text-gray-500 text-sm mt-1">OR</div>
                                <div className="text-3xl font-bold text-white mt-1">
                                    {PENALTIES.important.percentTurnover} <span className="text-lg font-normal text-gray-400">of global turnover</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">(whichever is higher)</div>
                            </div>

                            {/* Visual Bar */}
                            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '70%' }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="h-full bg-gradient-to-r from-oxot-blue to-blue-600 rounded-full"
                                />
                            </div>

                            {/* Examples */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {PENALTIES.important.examples.map((ex, i) => (
                                    <span key={i} className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded border border-white/10">
                                        {ex}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Non-Monetary Sanctions */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Ban size={16} className="text-gray-400" />
                    Non-Monetary Sanctions
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {NON_MONETARY_SANCTIONS.map((sanction, i) => {
                        const Icon = sanction.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] transition-colors"
                            >
                                <Icon size={20} className="text-cyan-400 mb-3" />
                                <div className="text-white font-semibold text-sm mb-1">{sanction.title}</div>
                                <p className="text-gray-500 text-xs">{sanction.description}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Personal Liability */}
            <div className="bg-gradient-to-r from-oxot-blue/10 to-oxot-gold/10 border border-oxot-blue/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-oxot-blue/20 flex items-center justify-center">
                        <Users size={20} className="text-oxot-blue" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">{PERSONAL_LIABILITY.title}</h3>
                        <p className="text-oxot-blue/60 text-xs">Article 32 - Supervision and enforcement</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {PERSONAL_LIABILITY.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle size={14} className="text-oxot-gold mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{detail}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Country Variations */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Euro size={16} className="text-cyan-400" />
                    Country-Specific Enforcement Variations
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                    While NIS2 sets minimum penalty thresholds, member states may implement stricter requirements.
                </p>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {COUNTRY_VARIATIONS.map((variation, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="p-3 rounded-lg border"
                            style={{
                                backgroundColor: `${variation.color}10`,
                                borderColor: `${variation.color}30`
                            }}
                        >
                            <div className="font-bold text-sm mb-1" style={{ color: variation.color }}>
                                {variation.country}
                            </div>
                            <p className="text-xs text-gray-400">{variation.note}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Warning Banner */}
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                    <div className="text-red-400 font-bold text-sm">Enforcement is Active</div>
                    <p className="text-red-200/60 text-xs mt-1">
                        As of October 18, 2024, NIS2 is fully enforceable across the EU. The European Commission has initiated
                        infringement proceedings against 23 member states for delayed transposition. Organizations should assume
                        full enforcement regardless of national transposition status.
                    </p>
                </div>
            </div>
        </div>
    )
}
