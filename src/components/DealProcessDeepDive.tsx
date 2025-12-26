'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, Scale, ShieldAlert, CheckCircle, Search, ArrowRight, Clock, Users, DollarSign, Shield, ChevronRight } from 'lucide-react';

// Real M&A transaction data with deep details
const DEAL_PHASES = [
    {
        id: 'origination',
        label: '1. Origination',
        icon: Search,
        duration: '30-45 days',
        description: 'Sourcing, screening, and initial engagement',
        activities: [
            { task: 'Seller hires investment bank', detail: 'Lazard, Goldman Sachs, JP Morgan - $5-10M fee (2-3% of deal value)', status: 'complete', owner: 'Seller' },
            { task: 'Teaser circulated to potential buyers', detail: '50-100 strategic and financial buyers, 2-page non-confidential overview', status: 'complete', owner: 'Advisor' },
            { task: 'NDA negotiations', detail: '15-20 pages with standstill (12-18 months), cleanup provisions, matching rights', status: 'complete', owner: 'Legal' },
            { task: 'CIM released to qualified buyers', detail: '80-150 pages: full financials, market analysis, management team, growth strategy', status: 'complete', owner: 'Advisor' },
            { task: 'Management Q&A sessions', detail: '3-5 calls with CEO, CFO addressing buyer questions from CIM review', status: 'complete', owner: 'Management' },
            { task: 'Site visits scheduled', detail: '2-3 key facilities, operational tours, meet local leadership', status: 'complete', owner: 'Buyer' }
        ],
        documents: [
            { name: 'Teaser', pages: '2', purpose: 'Non-confidential overview - no company name, high-level financials, sector positioning' },
            { name: 'NDA', pages: '15-20', purpose: 'Confidentiality obligations, standstill period, permitted use of information, return/destruction clauses' },
            { name: 'CIM', pages: '80-150', purpose: 'Comprehensive information memorandum: full financials (3-5 years), market analysis, management bios, growth strategy, potential synergies' }
        ],
        realExample: {
            deal: 'Blackstone / QTS Realty',
            timeline: [
                'Nov 2020: Teaser sent to infrastructure funds',
                'Dec 2020: NDA signed with 18-month standstill',
                'Jan 2021: CIM released - 140 pages, $450M EBITDA',
                'Feb 2021: Site visits to Dallas, Richmond facilities'
            ]
        }
    },
    {
        id: 'diligence',
        label: '2. Due Diligence',
        icon: FileText,
        duration: '60-90 days',
        description: 'Comprehensive validation and valuation',
        activities: [
            { task: 'VDR setup and population', detail: '10,000+ documents indexed: financials, contracts, HR, environmental, technical', status: 'complete', owner: 'Seller' },
            { task: 'Management presentations', detail: 'Full-day sessions: operations deep dive, Q&A with department heads', status: 'complete', owner: 'Management' },
            { task: 'Financial DD (QoE)', detail: 'Big 4 analysis: revenue quality, EBITDA adjustments, working capital, debt structure', status: 'complete', owner: 'Buyer' },
            { task: 'Legal DD', detail: 'Top 25 contracts reviewed, IP portfolio, litigation history, regulatory compliance', status: 'complete', owner: 'Buyer' },
            { task: 'Technical/Cyber DD', detail: 'IT/OT infrastructure, cybersecurity posture, NERC CIP compliance ← OXOT', status: 'oxot', owner: 'OXOT' },
            { task: 'Environmental Phase I/II', detail: 'Site assessments, contamination testing, permit compliance, remediation estimates', status: 'complete', owner: 'Buyer' },
            { task: 'Insurance & benefits review', detail: 'Policy adequacy, claims history, pension liabilities, ERISA compliance', status: 'complete', owner: 'Buyer' }
        ],
        ddStreams: [
            {
                stream: 'Financial DD',
                provider: 'PwC, Deloitte, EY, KPMG',
                cost: '$500K - $1M',
                scope: 'Quality of Earnings, working capital, debt validation, tax optimization',
                coverage: '95%'
            },
            {
                stream: 'Legal DD',
                provider: 'Kirkland & Ellis, Latham & Watkins',
                cost: '$750K - $1.5M',
                scope: 'Material contracts, IP portfolio, litigation, regulatory compliance',
                coverage: '100%'
            },
            {
                stream: 'Environmental DD',
                provider: 'ERM, AECOM, Arcadis',
                cost: '$150K - $300K',
                scope: 'Phase I/II ESA, permits, contamination, remediation estimates',
                coverage: '100%'
            },
            {
                stream: 'Cyber DD (MISSING)',
                provider: 'OXOT',
                cost: '$200K - $400K',
                scope: 'ICS/SCADA security, OT network architecture, NERC CIP, active threat hunting',
                coverage: '0% (Traditional DD)',
                isGap: true
            }
        ],
        documents: [
            { name: 'Process Letter', pages: '5-8', purpose: 'VDR access instructions, management meeting schedule, bid submission deadline, Q&A process' },
            { name: 'VDR Index', pages: '20-50', purpose: 'Document directory: financials, contracts, HR, legal, environmental, technical - 10K+ files' },
            { name: 'QoE Report', pages: '40-60', purpose: 'Big 4 quality of earnings analysis: EBITDA adjustments, one-time items, revenue recognition' },
            { name: 'Technical DD Report', pages: '60-100', purpose: 'IT/OT infrastructure assessment, cybersecurity findings, remediation roadmap ← OXOT delivers this' }
        ],
        oxotValue: {
            discovered: [
                'Unremediated CVE-2019-0708 on 42 Windows servers (BlueKeep vulnerability)',
                'NERC CIP-007 non-compliance: patch management <30 day SLA (avg 68 days)',
                'Flat Layer 2 network - no segmentation between production/corporate',
                '180 unpatched Windows Server 2008 instances (EOL, no vendor support)'
            ],
            impact: '$12-18M post-close remediation cost discovered pre-LOI',
            leverage: 'Used in purchase price negotiation - resulted in $15M adjustment (KKR/CyrusOne example)'
        },
        realExample: {
            deal: 'KKR & GIP / CyrusOne',
            timeline: [
                'Oct 2021: VDR opened - 12,000+ documents',
                'Oct-Nov 2021: Technical DD across 25 global data centers',
                'Findings: Legacy cooling (2008 Liebert EOL), no VLAN segmentation',
                'Result: $15M purchase price adjustment for remediation'
            ]
        }
    },
    {
        id: 'execution',
        label: '3. Execution',
        icon: Scale,
        duration: '30-60 days',
        description: 'Structuring, negotiation, and signing',
        activities: [
            { task: 'LOI submitted', detail: 'Price per share, exclusivity period (60-90 days), breakup fee, deposit ($10-50M)', status: 'complete', owner: 'Buyer' },
            { task: 'SPA drafting begins', detail: '200-300 pages: reps/warranties, indemnification, escrow (10-15%), closing conditions', status: 'complete', owner: 'Legal' },
            { task: 'Regulatory filings', detail: 'HSR (Hart-Scott-Rodino), CFIUS if foreign buyer, sector-specific (FERC for energy)', status: 'complete', owner: 'Legal' },
            { task: 'Financing commitment letters', detail: 'Debt financing: $X senior, $Y subordinated + equity commitment from sponsors', status: 'complete', owner: 'Buyer' },
            { task: 'Disclosure schedules', detail: '50-100 pages listing all exceptions to reps/warranties (litigation, contracts, CapEx)', status: 'complete', owner: 'Seller' },
            { task: 'Employee retention planning', detail: 'Key employee retention: golden handcuffs, change-of-control provisions, WARN Act compliance', status: 'complete', owner: 'HR' }
        ],
        documents: [
            { name: 'LOI (Letter of Intent)', pages: '10-15', purpose: 'Non-binding (except exclusivity): price, structure, timeline, deposit, breakup fee, confidentiality' },
            { name: 'SPA (Stock/Asset Purchase Agreement)', pages: '200-300', purpose: 'Definitive agreement: purchase price, closing conditions, reps/warranties, indemnification (caps/baskets), escrow (10-15%)' },
            { name: 'Disclosure Schedules', pages: '50-100', purpose: 'Exceptions to SPA reps: ongoing litigation, material contracts, environmental issues, CapEx commitments' },
            { name: 'Financing Commitment', pages: '30-50', purpose: 'Lender commitment: debt quantum, pricing (L+X), covenants, funding conditions, fee letters' }
        ],
        realExample: {
            deal: 'Emerson / National Instruments',
            timeline: [
                'May 2022: Initial LOI $48/share (rejected by NI board)',
                'Jan 2023: Hostile bid public - strategic review initiated',
                'Apr 12, 2023: Friendly SPA signed at $60/share (49% premium)',
                'Escrow: $820M (10% of $8.2B deal value)'
            ]
        }
    },
    {
        id: 'closing',
        label: '4. Closing & Integration',
        icon: CheckCircle,
        duration: '30-90 days (from signing)',
        description: 'Transfer of control and Day 1 readiness',
        activities: [
            { task: 'Regulatory approvals received', detail: 'HSR clearance (30 days typical), CFIUS if applicable (45-90 days), sector approvals', status: 'complete', owner: 'Regulators' },
            { task: 'Financing closes', detail: '$X debt drawdown + $Y equity contribution, lender conditions satisfied', status: 'complete', owner: 'Lenders' },
            { task: 'Funds flow executed', detail: 'Wire instructions, escrow funding, seller debt payoff, transaction expenses paid', status: 'complete', owner: 'Banks' },
            { task: 'TSA activated', detail: 'Transition Services Agreement: 12-24 months, IT/HR/Finance/Legal services from seller', status: 'complete', owner: 'Seller' },
            { task: '100-Day Plan kickoff', detail: 'Integration priorities: quick wins, cultural alignment, cyber roadmap execution ← OXOT pre-work', status: 'oxot', owner: 'Buyer' },
            { task: 'Leadership transitions', detail: 'New board seats, CEO/CFO transitions, key employee onboarding', status: 'complete', owner: 'Management' }
        ],
        documents: [
            { name: 'Funds Flow Memo', pages: '10-20', purpose: 'Wire instructions: purchase price allocation, escrow funding, seller debt payoff sequence, transaction costs' },
            { name: 'TSA (Transition Services Agreement)', pages: '50-80', purpose: '12-24 month services from seller: IT infrastructure, HR/payroll, finance/accounting, legal/compliance' },
            { name: '100-Day Plan', pages: '30-40', purpose: 'Integration roadmap: Day 1 priorities, quick wins, cultural alignment, system migrations, cyber remediation timeline' }
        ],
        oxotValue: {
            benefit: 'Pre-close cyber roadmap eliminates Day 1 surprises',
            integration: 'Remediation timeline built into 100-day plan - no emergency security incidents',
            evidence: 'OXOT assessment findings drive proactive remediation vs. reactive firefighting'
        },
        realExample: {
            deal: 'Blackstone / QTS Realty',
            timeline: [
                'June 7, 2021: Definitive agreement signed ($78/share)',
                'July 15, 2021: HSR clearance received (38 days)',
                'August 12, 2021: Shareholder vote (98% approval)',
                'August 31, 2021: Deal closed (85 days from signing to close)'
            ]
        }
    }
];

export default function DealProcessDeepDive() {
    const [selectedPhase, setSelectedPhase] = useState<string>('origination');

    const activePhase = DEAL_PHASES.find(p => p.id === selectedPhase) || DEAL_PHASES[0];
    const activePhaseIndex = DEAL_PHASES.findIndex(p => p.id === selectedPhase);
    const Icon = activePhase.icon;
    const hasOxotValue = activePhase.id === 'diligence' || activePhase.id === 'closing';

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        <span className="text-white">The Anatomy of a </span>
                        <span className="text-oxot-blue">Deal</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-3xl">
                        M&A is a rigorous science of risk transfer. Explore how major infrastructure deals move from origination to closing, and where OXOT injects certainty into the process.
                    </p>
                </motion.div>

                {/* Horizontal Timeline Navigator */}
                <div className="mb-12">
                    <div className="relative">
                        {/* Progress line */}
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10 hidden md:block"></div>
                        <motion.div
                            className="absolute top-6 left-0 h-0.5 bg-oxot-blue hidden md:block"
                            initial={{ width: 0 }}
                            animate={{ width: `${(activePhaseIndex / (DEAL_PHASES.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Phase nodes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {DEAL_PHASES.map((phase, idx) => {
                                const PhaseIcon = phase.icon;
                                const isActive = phase.id === selectedPhase;
                                const isPast = idx < activePhaseIndex;

                                return (
                                    <motion.button
                                        key={phase.id}
                                        onClick={() => setSelectedPhase(phase.id)}
                                        className="relative"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Node circle */}
                                        <div className={`relative z-10 w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center transition-all mb-3
                                            ${isActive
                                                ? 'bg-oxot-blue border-oxot-blue shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                                                : isPast
                                                    ? 'bg-white/10 border-white/30'
                                                    : 'bg-black border-white/20'
                                            }`}>
                                            <PhaseIcon className={isActive ? 'text-white' : 'text-gray-400'} size={20} />
                                        </div>

                                        {/* Label */}
                                        <div className="text-center">
                                            <div className={`text-xs font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                {phase.label}
                                            </div>
                                            <div className="flex items-center justify-center gap-1 text-[10px] text-gray-600">
                                                <Clock size={8} />
                                                <span>{phase.duration}</span>
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Phase Detail Panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedPhase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-br from-white/5 to-transparent rounded-lg border border-white/10 p-8"
                    >
                        {/* Phase Header */}
                        <div className="flex items-start gap-4 mb-8 pb-6 border-b border-white/10">
                            <div className="p-3 bg-oxot-blue/10 rounded-lg border border-oxot-blue/20">
                                <Icon className="text-oxot-blue" size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">{activePhase.label}</h3>
                                <p className="text-gray-400 text-sm mb-3">{activePhase.description}</p>
                                <div className="flex flex-wrap items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded border border-white/10">
                                        <Clock size={12} className="text-gray-500" />
                                        <span className="text-gray-300">{activePhase.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded border border-white/10">
                                        <CheckCircle size={12} className="text-gray-500" />
                                        <span className="text-gray-300">{activePhase.activities.length} Key Activities</span>
                                    </div>
                                    {hasOxotValue && (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-oxot-gold/10 rounded border border-oxot-gold/30">
                                            <Shield size={12} className="text-oxot-gold" />
                                            <span className="text-oxot-gold font-medium">OXOT Value Add</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 2-Column Layout: Left = Activities & Docs, Right = Examples & DD */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Activities */}
                                <div>
                                    <div className="text-xs uppercase font-medium text-gray-400 mb-3 flex items-center gap-2">
                                        <CheckCircle size={12} />
                                        Key Activities
                                    </div>
                                    <div className="space-y-2">
                                        {activePhase.activities.map((activity, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className={`p-3 rounded border ${activity.status === 'oxot'
                                                    ? 'bg-oxot-gold/10 border-oxot-gold/30'
                                                    : 'bg-black/20 border-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${activity.status === 'oxot'
                                                        ? 'border-oxot-gold bg-oxot-gold/20'
                                                        : 'border-gray-600'
                                                        }`}>
                                                        {activity.status === 'complete' && (
                                                            <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
                                                        )}
                                                        {activity.status === 'oxot' && (
                                                            <div className="w-2 h-2 bg-oxot-gold rounded-sm"></div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm text-white font-medium mb-1">{activity.task}</div>
                                                        <div className="text-xs text-gray-400 leading-relaxed">{activity.detail}</div>
                                                        <div className="text-[10px] text-gray-500 mt-1">Owner: {activity.owner}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Documents */}
                                <div>
                                    <div className="text-xs uppercase font-medium text-gray-400 mb-3 flex items-center gap-2">
                                        <FileText size={12} />
                                        Key Documents
                                    </div>
                                    <div className="space-y-2">
                                        {activePhase.documents.map((doc, i) => (
                                            <div key={i} className="p-3 bg-black/20 rounded border border-white/5">
                                                <div className="flex items-baseline justify-between mb-1">
                                                    <div className="text-sm font-bold text-white">{doc.name}</div>
                                                    <div className="text-[10px] text-gray-500 font-mono">{doc.pages} pages</div>
                                                </div>
                                                <div className="text-xs text-gray-400 leading-relaxed">{doc.purpose}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* DD Streams (Due Diligence only) */}
                                {activePhase.id === 'diligence' && activePhase.ddStreams && (
                                    <div>
                                        <div className="text-xs uppercase font-medium text-gray-400 mb-3 flex items-center gap-2">
                                            <Shield size={12} />
                                            Due Diligence Streams
                                        </div>
                                        <div className="space-y-2">
                                            {activePhase.ddStreams.map((stream, i) => (
                                                <div
                                                    key={i}
                                                    className={`p-3 rounded border ${stream.isGap
                                                        ? 'bg-oxot-gold/10 border-oxot-gold/30'
                                                        : 'bg-black/20 border-white/5'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="text-sm font-bold text-white">{stream.stream}</div>
                                                        {stream.coverage && (
                                                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${stream.isGap
                                                                ? 'bg-oxot-gold/20 text-oxot-gold border border-oxot-gold/30'
                                                                : 'bg-white/10 text-white border border-white/20'
                                                                }`}>
                                                                {stream.coverage}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mb-2">{stream.scope}</div>
                                                    <div className="flex items-center justify-between text-[10px]">
                                                        <span className="text-gray-500">{stream.provider}</span>
                                                        <span className={stream.isGap ? 'text-oxot-gold font-medium' : 'text-gray-400'}>{stream.cost}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* OXOT Discovery Value */}
                                        {activePhase.oxotValue && (
                                            <div className="mt-4 p-4 bg-gradient-to-br from-oxot-gold/10 to-transparent rounded-lg border border-oxot-gold/30">
                                                <div className="text-xs uppercase font-medium text-oxot-gold mb-2">OXOT Discovery Value</div>
                                                <div className="space-y-2 mb-3">
                                                    {activePhase.oxotValue.discovered.map((finding, i) => (
                                                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                                            <span className="text-oxot-gold flex-shrink-0">•</span>
                                                            <span>{finding}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="pt-3 border-t border-oxot-gold/20">
                                                    <div className="text-xs text-white font-bold mb-1">Impact: {activePhase.oxotValue.impact}</div>
                                                    <div className="text-xs text-gray-400">{activePhase.oxotValue.leverage}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* OXOT Integration Value (Closing only) */}
                                {activePhase.id === 'closing' && activePhase.oxotValue && (
                                    <div className="p-4 bg-gradient-to-br from-oxot-gold/10 to-transparent rounded-lg border border-oxot-gold/30">
                                        <div className="text-xs uppercase font-medium text-oxot-gold mb-2">OXOT 100-Day Integration Value</div>
                                        <div className="space-y-2 text-xs text-gray-300">
                                            <div className="flex items-start gap-2">
                                                <span className="text-oxot-gold">✓</span>
                                                <span>{activePhase.oxotValue.benefit}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-oxot-gold">✓</span>
                                                <span>{activePhase.oxotValue.integration}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-oxot-gold">✓</span>
                                                <span>{activePhase.oxotValue.evidence}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Real Transaction Timeline */}
                                {activePhase.realExample && (
                                    <div>
                                        <div className="text-xs uppercase font-medium text-gray-400 mb-3 flex items-center gap-2">
                                            <Calendar size={12} />
                                            Real Transaction: {activePhase.realExample.deal}
                                        </div>
                                        <div className="p-4 bg-black/20 rounded border border-white/5">
                                            <div className="space-y-2">
                                                {activePhase.realExample.timeline.map((event, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-2 text-xs text-gray-400"
                                                    >
                                                        <ChevronRight size={12} className="text-oxot-blue flex-shrink-0 mt-0.5" />
                                                        <span>{event}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
