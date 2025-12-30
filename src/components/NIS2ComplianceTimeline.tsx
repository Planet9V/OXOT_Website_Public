'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Search, FileText, Shield, Code, TestTube, Award,
    RefreshCw, ChevronRight, CheckCircle, Clock, Star
} from 'lucide-react'

// 12-Month Compliance Timeline
const TIMELINE_PHASES = [
    {
        phase: 1,
        title: 'Assessment & Analysis',
        months: '1-3',
        color: '#3B82F6', // Blue
        icon: Search,
        description: 'Understand your scope and current posture',
        milestones: [
            { title: 'Scope Determination', description: 'Identify if your organization falls under NIS2', week: 1, oxot: true },
            { title: 'Asset Inventory', description: 'Map critical systems and data flows', week: 2, oxot: true },
            { title: 'Risk Assessment', description: 'Evaluate threats and vulnerabilities', week: 4, oxot: true },
            { title: 'Gap Analysis', description: 'Compare current state to NIS2 requirements', week: 8, oxot: true },
            { title: 'Remediation Roadmap', description: 'Prioritized action plan with timelines', week: 12, oxot: true }
        ]
    },
    {
        phase: 2,
        title: 'Governance Implementation',
        months: '4-6',
        color: '#D4AF37', // Gold
        icon: FileText,
        description: 'Establish policies, procedures, and accountability',
        milestones: [
            { title: 'Board Approval', description: 'Management body sign-off on cybersecurity strategy', week: 14, oxot: true },
            { title: 'Policy Development', description: 'Create/update security policies per Article 21', week: 16, oxot: true },
            { title: 'Role Definition', description: 'Assign cybersecurity responsibilities', week: 18, oxot: false },
            { title: 'Training Program', description: 'Management and staff awareness training', week: 20, oxot: true },
            { title: 'Supply Chain Review', description: 'Assess and document supplier security', week: 24, oxot: true }
        ]
    },
    {
        phase: 3,
        title: 'Technical Implementation',
        months: '7-9',
        color: '#22c55e',
        icon: Code,
        description: 'Deploy controls and security measures',
        milestones: [
            { title: 'Access Controls', description: 'Implement MFA and least privilege', week: 28, oxot: false },
            { title: 'Incident Detection', description: 'Deploy monitoring and detection capabilities', week: 30, oxot: true },
            { title: 'Business Continuity', description: 'Establish backup and recovery procedures', week: 32, oxot: true },
            { title: 'Encryption Deployment', description: 'Implement cryptographic controls', week: 34, oxot: false },
            { title: 'Vulnerability Management', description: 'Establish patching and disclosure processes', week: 36, oxot: true }
        ]
    },
    {
        phase: 4,
        title: 'Testing & Certification',
        months: '10-12',
        color: '#3b82f6',
        icon: TestTube,
        description: 'Validate controls and prepare for compliance',
        milestones: [
            { title: 'Internal Audit', description: 'Comprehensive security assessment', week: 40, oxot: true },
            { title: 'Penetration Testing', description: 'Technical security validation', week: 42, oxot: true },
            { title: 'Incident Response Drill', description: 'Test notification procedures', week: 44, oxot: true },
            { title: 'Evidence Compilation', description: 'Prepare compliance documentation', week: 46, oxot: true },
            { title: 'Authority Registration', description: 'Register with national competent authority', week: 48, oxot: true }
        ]
    }
]

// Ongoing maintenance phase
const ONGOING_PHASE = {
    title: 'Continuous Compliance',
    color: '#d4af37',
    icon: RefreshCw,
    activities: [
        'Quarterly security reviews',
        'Annual full audits',
        'Continuous threat monitoring',
        'Regular training updates',
        'Policy review and updates',
        'Supplier reassessment'
    ]
}

export default function NIS2ComplianceTimeline() {
    const [activePhase, setActivePhase] = useState<number | null>(null)

    return (
        <div className="space-y-8">
            {/* Timeline Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="text-[10px] font-mono text-oxot-blue uppercase tracking-widest mb-1">
                        12-MONTH IMPLEMENTATION ROADMAP
                    </div>
                    <h3 className="text-xl font-bold text-white">
                        Your Path to NIS2 Compliance
                    </h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                        <Star size={12} className="text-oxot-gold" />
                        <span className="text-gray-400">OXOT Engagement Points</span>
                    </div>
                </div>
            </div>

            {/* Phase Overview Bar */}
            <div className="relative">
                <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-gray-800">
                    {TIMELINE_PHASES.map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            whileInView={{ width: '25%' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full cursor-pointer relative group"
                            style={{ backgroundColor: phase.color }}
                            onClick={() => setActivePhase(activePhase === i ? null : i)}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-mono text-white whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                                    Phase {phase.phase}: Months {phase.months}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Month markers */}
                <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
                    <span>Month 1</span>
                    <span>Month 3</span>
                    <span>Month 6</span>
                    <span>Month 9</span>
                    <span>Month 12</span>
                </div>
            </div>

            {/* Phase Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {TIMELINE_PHASES.map((phase, i) => {
                    const Icon = phase.icon
                    const isActive = activePhase === i

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`
                                relative bg-white/[0.02] border rounded-xl overflow-hidden cursor-pointer
                                transition-all duration-300 hover:bg-white/[0.04]
                                ${isActive ? 'border-white/30 ring-2' : 'border-white/5'}
                            `}
                            style={{
                                borderTopWidth: 3,
                                borderTopColor: phase.color,
                                boxShadow: isActive ? `0 0 0 2px ${phase.color}` : 'none'
                            }}
                            onClick={() => setActivePhase(isActive ? null : i)}
                        >
                            <div className="p-4">
                                {/* Phase Number */}
                                <div className="flex items-center justify-between mb-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                                        style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                                    >
                                        {phase.phase}
                                    </div>
                                    <span className="text-xs font-mono text-gray-500">
                                        Months {phase.months}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon size={14} style={{ color: phase.color }} />
                                    <h4 className="text-white font-semibold text-sm">{phase.title}</h4>
                                </div>

                                <p className="text-gray-500 text-xs mb-3">{phase.description}</p>

                                {/* Milestone Count */}
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">
                                        {phase.milestones.length} milestones
                                    </span>
                                    <ChevronRight
                                        size={14}
                                        className={`transform transition-transform ${isActive ? 'rotate-90' : ''}`}
                                        style={{ color: phase.color }}
                                    />
                                </div>
                            </div>

                            {/* Expanded Milestones */}
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="border-t border-white/5 p-4 space-y-3"
                                >
                                    {phase.milestones.map((milestone, j) => (
                                        <div
                                            key={j}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle
                                                size={14}
                                                className="mt-0.5 flex-shrink-0"
                                                style={{ color: phase.color }}
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white text-sm font-medium">
                                                        {milestone.title}
                                                    </span>
                                                    {milestone.oxot && (
                                                        <Star size={10} className="text-oxot-gold" />
                                                    )}
                                                </div>
                                                <p className="text-gray-500 text-xs">{milestone.description}</p>
                                                <span className="text-[10px] font-mono text-gray-600">
                                                    Week {milestone.week}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Ongoing Phase */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-oxot-gold/10 to-blue-500/10 border border-oxot-gold/30 rounded-xl p-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${ONGOING_PHASE.color}20` }}
                    >
                        <ONGOING_PHASE.icon size={20} style={{ color: ONGOING_PHASE.color }} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold">{ONGOING_PHASE.title}</h4>
                        <p className="text-oxot-gold/60 text-xs">Year 2 and beyond</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {ONGOING_PHASE.activities.map((activity, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 p-2 bg-white/[0.02] rounded-lg"
                        >
                            <RefreshCw size={12} style={{ color: ONGOING_PHASE.color }} />
                            <span className="text-xs text-gray-400">{activity}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Key Dates Banner */}
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { date: 'Jan 2023', event: 'Entered Force (EU)', status: 'complete' },
                    { date: 'Oct 17, 2024', event: 'Member State Transposition', status: 'complete', note: 'Deadline missed by many' },
                    { date: 'Late 2024', event: 'National Laws Effective', status: 'active' },
                    { date: '2025', event: 'Company Compliance', status: 'active', note: 'Varies by country' }
                ].map((item, i) => (
                    <div
                        key={i}
                        className={`
                            p-4 rounded-lg border text-center relative
                            ${item.status === 'active'
                                ? 'bg-oxot-blue/10 border-oxot-blue/30'
                                : 'bg-white/[0.02] border-white/5'}
                        `}
                    >
                        <div className={`text-lg font-bold ${item.status === 'active' ? 'text-oxot-blue' : 'text-gray-400'}`}>
                            {item.date}
                        </div>
                        <div className="text-xs text-gray-500">{item.event}</div>
                        {item.note && (
                            <div className="text-[10px] text-yellow-500/80 mt-1 font-mono">{item.note}</div>
                        )}
                        {item.status === 'complete' && (
                            <CheckCircle size={12} className="text-green-400 mx-auto mt-2" />
                        )}
                        {item.status === 'active' && (
                            <Clock size={12} className="text-oxot-blue mx-auto mt-2 animate-pulse" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
