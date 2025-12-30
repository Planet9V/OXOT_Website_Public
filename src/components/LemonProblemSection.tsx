'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    AlertTriangle, FileQuestion, XCircle, CheckCircle,
    ClipboardList, Eye, TrendingUp, Shield
} from 'lucide-react'

// Traditional vs MCDE comparison
const COMPARISON = {
    traditional: [
        { category: 'Technical', approach: 'Vulnerability scan', limitation: 'Point-in-time snapshot', icon: Eye },
        { category: 'Process', approach: 'Questionnaire', limitation: 'Self-reported, biased', icon: ClipboardList },
        { category: 'Legal', approach: 'Compliance checklist', limitation: 'Binary (compliant/not)', icon: FileQuestion },
        { category: 'Insurance', approach: 'Policy review', limitation: 'Backward-looking', icon: Shield }
    ],
    mcde: [
        { category: 'Technical', approach: 'Full network ingestion', advantage: 'Complete topology', icon: Eye },
        { category: 'Process', approach: 'Behavioral simulation', advantage: 'Predictive dynamics', icon: TrendingUp },
        { category: 'Legal', approach: 'Quantified liability', advantage: 'Dollar-denominated', icon: FileQuestion },
        { category: 'Insurance', approach: 'Risk-adjusted pricing', advantage: 'Forward-looking', icon: Shield }
    ]
}

// Famous M&A cyber failures
const CASE_STUDIES = [
    { company: 'Marriott/Starwood', issue: '$28M GDPR fine', discovered: 'Post-close', year: 2018 },
    { company: 'Verizon/Yahoo', issue: '$350M price reduction', discovered: 'Pre-close', year: 2017 },
    { company: 'Dole/Total Produce', issue: 'Undisclosed incidents', discovered: 'Post-close', year: 2018 }
]

export default function LemonProblemSection() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-white/10 pb-6">
                <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    The Akerlof Problem in M&A
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                    Detecting <span className="text-oxot-gold">Cyber Lemons.</span>
                </h2>
            </div>

            {/* The Lemon Problem Explanation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-8"
            >
                {/* Theory Card */}
                <div className="p-6 bg-gradient-to-br from-gray-900 via-black to-black border border-oxot-gold/20 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl">🍋</div>
                        <div>
                            <h3 className="text-xl font-bold text-white">The "Lemon" Problem</h3>
                            <p className="text-xs text-oxot-gold mb-1">Akerlof's Market for Lemons (1970)</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        In M&A, <strong className="text-white">information asymmetry</strong> favors sellers.
                        They know their vulnerabilities. Buyers rely on questionnaires and attestations.
                        The result is <strong className="text-oxot-gold">adverse selection</strong> for
                        cyber-insecure targets.
                    </p>
                    <div className="grid grid-cols-3 gap-2 p-3 bg-white/[0.03] rounded-lg border border-white/5">
                        <div className="text-center">
                            <div className="text-2xl font-black text-oxot-gold">60%</div>
                            <div className="text-[10px] text-gray-500 uppercase">Discover issues post-close</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-red-500">$5.2M</div>
                            <div className="text-[10px] text-gray-500 uppercase">Avg incident cost</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-orange-400">22%</div>
                            <div className="text-[10px] text-gray-500 uppercase">Traditional detection rate</div>
                        </div>
                    </div>
                </div>

                {/* Notable Failures */}
                <div className="p-6 bg-gradient-to-br from-gray-900 via-black to-black border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <XCircle size={24} className="text-red-500" />
                        <div>
                            <h3 className="text-xl font-bold text-white">Notable Lemons</h3>
                            <p className="text-xs text-red-400/60">When cyber DD failed</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {CASE_STUDIES.map((study, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/5"
                            >
                                <div>
                                    <div className="text-sm font-bold text-white">{study.company}</div>
                                    <div className="text-xs text-gray-500">{study.year}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-red-400">{study.issue}</div>
                                    <div className="text-xs text-gray-500">Discovered {study.discovered}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Comparison Table */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Traditional DD */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <XCircle size={20} className="text-gray-500" />
                        <h3 className="text-lg font-bold text-gray-400">Traditional Due Diligence</h3>
                    </div>
                    <div className="space-y-3">
                        {COMPARISON.traditional.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div key={i} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                                    <Icon size={16} className="text-gray-600 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-400">{item.category}</span>
                                            <span className="text-xs text-gray-600">{item.approach}</span>
                                        </div>
                                        <div className="text-xs text-red-400/60 mt-1">⚠ {item.limitation}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* MCDE Approach */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-6 bg-gradient-to-br from-oxot-blue/10 to-transparent border border-oxot-blue/30 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-oxot-blue text-white text-[10px] font-bold rounded uppercase">
                        AEON MCDE
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle size={20} className="text-oxot-blue" />
                        <h3 className="text-lg font-bold text-white">OXOT MCDE Approach</h3>
                    </div>
                    <div className="space-y-3">
                        {COMPARISON.mcde.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div key={i} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg border border-oxot-blue/10">
                                    <Icon size={16} className="text-oxot-blue mt-0.5" />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-white">{item.category}</span>
                                            <span className="text-xs text-oxot-blue/80">{item.approach}</span>
                                        </div>
                                        <div className="text-xs text-green-400/80 mt-1">✓ {item.advantage}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Quote */}
            <div className="p-6 bg-gradient-to-r from-gray-900 to-black border-l-2 border-oxot-gold rounded-r-xl text-center">
                <p className="text-lg text-white italic mb-2">
                    "We replace subjective assessments with <strong className="text-oxot-gold">objective simulation</strong>."
                </p>
                <p className="text-sm text-gray-500">
                    Ingest target network topology. Stress-test via physics-based models. Quantify risk as a dollar value.
                </p>
            </div>
        </div>
    )
}
