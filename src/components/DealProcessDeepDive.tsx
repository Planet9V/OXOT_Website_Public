'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, Scale, ShieldAlert, CheckCircle, Search, ArrowRight, Clock, Users, DollarSign, Shield, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

// Real M&A transaction data with deep details
const DEAL_PHASES = [
    {
        id: 'origination',
        label: '1. Origination',
        shortLabel: 'Origination',
        icon: Search,
        duration: '30-45 days',
        description: 'Sourcing, screening, and initial engagement',
        keyMetrics: [
            { label: 'Buyers Contacted', value: '50-100', icon: Users },
            { label: 'Avg NDA Length', value: '15-20 pg', icon: FileText },
            { label: 'CIM Size', value: '80-150 pg', icon: FileText },
        ],
        activities: [
            { task: 'Investment bank engaged', detail: 'Lazard, Goldman, JP Morgan - 2-3% fee', status: 'complete', owner: 'Seller' },
            { task: 'Teaser circulation', detail: '50-100 qualified buyers receive 2-page overview', status: 'complete', owner: 'Advisor' },
            { task: 'NDA execution', detail: '12-18 month standstill, cleanup provisions', status: 'complete', owner: 'Legal' },
            { task: 'CIM distribution', detail: 'Full financials, market analysis, growth strategy', status: 'complete', owner: 'Advisor' },
            { task: 'Management Q&A', detail: '3-5 calls with CEO/CFO', status: 'complete', owner: 'Management' },
            { task: 'Site visits', detail: '2-3 key facilities toured', status: 'complete', owner: 'Buyer' }
        ],
        documents: [
            { name: 'Teaser', pages: '2', purpose: 'Non-confidential overview' },
            { name: 'NDA', pages: '15-20', purpose: 'Confidentiality + standstill' },
            { name: 'CIM', pages: '80-150', purpose: 'Comprehensive info memorandum' }
        ],
        realExample: {
            deal: 'Blackstone / QTS Realty',
            timeline: [
                'Nov 2020: Teaser to infrastructure funds',
                'Dec 2020: NDA signed (18mo standstill)',
                'Jan 2021: CIM released - $450M EBITDA',
                'Feb 2021: Site visits to Dallas, Richmond'
            ]
        },
        oxotValue: {
            title: 'OXOT Early Engagement',
            discovered: [
                'Early CIM cyber posture review',
                'Site visit infrastructure reconnaissance',
                'Preliminary OT/ICS risk identification',
                'Data room requirements advisory'
            ],
            impact: 'Shapes DD scope before LOI submission'
        }
    },
    {
        id: 'diligence',
        label: '2. Due Diligence',
        shortLabel: 'Due Diligence',
        icon: FileText,
        duration: '60-90 days',
        description: 'Comprehensive validation and valuation',
        keyMetrics: [
            { label: 'VDR Documents', value: '10,000+', icon: FileText },
            { label: 'DD Streams', value: '4-6', icon: Shield },
            { label: 'Cyber Gap', value: '0%', icon: ShieldAlert },
        ],
        activities: [
            { task: 'VDR population', detail: '10,000+ documents indexed', status: 'complete', owner: 'Seller' },
            { task: 'Management presentations', detail: 'Full-day ops deep dive', status: 'complete', owner: 'Management' },
            { task: 'Financial DD (QoE)', detail: 'Big 4 EBITDA analysis', status: 'complete', owner: 'Buyer' },
            { task: 'Legal DD', detail: 'Top 25 contracts, IP, litigation', status: 'complete', owner: 'Buyer' },
            { task: 'Technical/Cyber DD', detail: 'OT security, NERC CIP ← OXOT', status: 'oxot', owner: 'OXOT' },
            { task: 'Environmental Phase I/II', detail: 'Site contamination testing', status: 'complete', owner: 'Buyer' }
        ],
        ddStreams: [
            { stream: 'Financial DD', provider: 'Big 4', cost: '$500K-1M', coverage: '95%' },
            { stream: 'Legal DD', provider: 'K&E, Latham', cost: '$750K-1.5M', coverage: '100%' },
            { stream: 'Environmental', provider: 'ERM, AECOM', cost: '$150-300K', coverage: '100%' },
            { stream: 'Cyber DD', provider: 'OXOT', cost: '$200-400K', coverage: '0%', isGap: true }
        ],
        documents: [
            { name: 'Process Letter', pages: '5-8', purpose: 'VDR access & schedule' },
            { name: 'VDR Index', pages: '20-50', purpose: '10K+ file directory' },
            { name: 'QoE Report', pages: '40-60', purpose: 'EBITDA adjustments' },
            { name: 'Tech DD Report', pages: '60-100', purpose: 'OXOT delivers this' }
        ],
        oxotValue: {
            title: 'OXOT Discovery Value',
            discovered: [
                'BlueKeep vulnerability on 42 servers',
                'NERC CIP-007 non-compliance (68 day patch lag)',
                'Flat L2 network - no segmentation',
                '180 EOL Windows 2008 instances'
            ],
            impact: '$15M purchase price adjustment'
        },
        realExample: {
            deal: 'KKR & GIP / CyrusOne',
            timeline: [
                'Oct 2021: VDR opened - 12K documents',
                'Oct-Nov: DD across 25 data centers',
                'Finding: Legacy cooling EOL, no VLANs',
                'Result: $15M price adjustment'
            ]
        }
    },
    {
        id: 'execution',
        label: '3. Execution',
        shortLabel: 'Execution',
        icon: Scale,
        duration: '30-60 days',
        description: 'Structuring, negotiation, and signing',
        keyMetrics: [
            { label: 'Exclusivity', value: '60-90 days', icon: Clock },
            { label: 'SPA Length', value: '200-300 pg', icon: FileText },
            { label: 'Escrow', value: '10-15%', icon: DollarSign },
        ],
        activities: [
            { task: 'LOI submitted', detail: 'Price, exclusivity, breakup fee, deposit', status: 'complete', owner: 'Buyer' },
            { task: 'SPA drafting', detail: '200-300 pages reps/warranties', status: 'complete', owner: 'Legal' },
            { task: 'Regulatory filings', detail: 'HSR, CFIUS, sector approvals', status: 'complete', owner: 'Legal' },
            { task: 'Financing commitment', detail: 'Debt + equity structure', status: 'complete', owner: 'Buyer' },
            { task: 'Disclosure schedules', detail: '50-100 pages of exceptions', status: 'complete', owner: 'Seller' },
            { task: 'Retention planning', detail: 'Key employee golden handcuffs', status: 'complete', owner: 'HR' }
        ],
        documents: [
            { name: 'LOI', pages: '10-15', purpose: 'Non-binding price & terms' },
            { name: 'SPA', pages: '200-300', purpose: 'Definitive agreement' },
            { name: 'Disclosure Schedules', pages: '50-100', purpose: 'SPA exceptions' },
            { name: 'Financing Commitment', pages: '30-50', purpose: 'Debt structure' }
        ],
        realExample: {
            deal: 'Emerson / National Instruments',
            timeline: [
                'May 2022: Initial LOI $48/share (rejected)',
                'Jan 2023: Hostile bid - strategic review',
                'Apr 2023: Friendly SPA at $60/share',
                'Escrow: $820M (10% of $8.2B)'
            ]
        },
        oxotValue: {
            title: 'OXOT Deal Structuring',
            discovered: [
                'Cyber indemnity clauses for SPA',
                'Technical debt CapEx in disclosure schedules',
                'Insurance coverage gap analysis',
                'Remediation timeline for escrow release'
            ],
            impact: 'Protects purchase price with evidence-based negotiations'
        }
    },
    {
        id: 'closing',
        label: '4. Closing & Integration',
        shortLabel: 'Closing',
        icon: CheckCircle,
        duration: '30-90 days',
        description: 'Transfer of control and Day 1 readiness',
        keyMetrics: [
            { label: 'HSR Clearance', value: '~30 days', icon: Clock },
            { label: 'TSA Duration', value: '12-24 mo', icon: Calendar },
            { label: '100-Day Plan', value: 'Critical', icon: Shield },
        ],
        activities: [
            { task: 'Regulatory approvals', detail: 'HSR, CFIUS clearance', status: 'complete', owner: 'Regulators' },
            { task: 'Financing closes', detail: 'Debt drawdown + equity', status: 'complete', owner: 'Lenders' },
            { task: 'Funds flow', detail: 'Wire execution, escrow fund', status: 'complete', owner: 'Banks' },
            { task: 'TSA activated', detail: '12-24 mo transition services', status: 'complete', owner: 'Seller' },
            { task: '100-Day Plan kickoff', detail: 'Cyber roadmap ← OXOT pre-work', status: 'oxot', owner: 'Buyer' },
            { task: 'Leadership transitions', detail: 'Board seats, C-suite changes', status: 'complete', owner: 'Management' }
        ],
        documents: [
            { name: 'Funds Flow Memo', pages: '10-20', purpose: 'Wire instructions' },
            { name: 'TSA', pages: '50-80', purpose: 'Transition services' },
            { name: '100-Day Plan', pages: '30-40', purpose: 'Integration roadmap' }
        ],
        oxotValue: {
            title: 'OXOT 100-Day Integration',
            discovered: [
                'Pre-close cyber roadmap eliminates Day 1 surprises',
                'Remediation in 100-day plan - no emergency incidents',
                'OXOT findings drive proactive vs reactive response',
                'TSA cyber handoff coordination'
            ],
            impact: 'Accelerates value realization by 3-6 months'
        },
        realExample: {
            deal: 'Blackstone / QTS Realty',
            timeline: [
                'June 7, 2021: SPA signed ($78/share)',
                'July 15: HSR clearance (38 days)',
                'Aug 12: 98% shareholder approval',
                'Aug 31: Closed (85 days sign-to-close)'
            ]
        }
    }
];

// Phase color mapping - strict OXOT style guide (blue, grey, gold only)
const getPhaseColors = (phaseIndex: number) => {
    // All phases use consistent blue/grey styling, differentiated by intensity
    const baseColors = {
        bg: 'bg-oxot-blue/10',
        border: 'border-oxot-blue/30',
        text: 'text-oxot-blue',
        glow: 'shadow-[0_0_20px_rgba(56,189,248,0.15)]'
    };
    return baseColors;
};

export default function DealProcessDeepDive() {
    const [selectedPhase, setSelectedPhase] = useState<string>('origination');
    const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);

    const AUTO_CYCLE_DURATION = 6000; // 6 seconds per phase

    const activePhase = DEAL_PHASES.find(p => p.id === selectedPhase) || DEAL_PHASES[0];
    const activePhaseIndex = DEAL_PHASES.findIndex(p => p.id === selectedPhase);
    const Icon = activePhase.icon;
    const phaseColors = getPhaseColors(activePhaseIndex);
    const hasOxotValue = activePhase.id === 'diligence' || activePhase.id === 'closing';

    // Auto-cycle through phases
    const goToNextPhase = useCallback(() => {
        const nextIndex = (activePhaseIndex + 1) % DEAL_PHASES.length;
        setSelectedPhase(DEAL_PHASES[nextIndex].id);
        setProgress(0);
    }, [activePhaseIndex]);

    // Auto-play effect
    useEffect(() => {
        if (!isAutoPlaying) return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    goToNextPhase();
                    return 0;
                }
                return prev + (100 / (AUTO_CYCLE_DURATION / 50));
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [isAutoPlaying, goToNextPhase]);

    // Reset progress when phase changes manually
    const handlePhaseChange = (phaseId: string) => {
        setSelectedPhase(phaseId);
        setProgress(0);
        setIsAutoPlaying(false);
    };

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header with Controls */}
                <motion.div
                    className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            <span className="text-white">The Anatomy of a </span>
                            <span className="text-oxot-blue">Deal</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-2xl">
                            M&A is a rigorous science of risk transfer. Explore how major infrastructure deals move through the process.
                        </p>
                    </div>

                    {/* Playback Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className={`p-2 rounded-lg border transition-all ${isAutoPlaying
                                ? 'bg-oxot-blue/20 border-oxot-blue/50 text-oxot-blue'
                                : 'bg-white/5 border-white/20 text-gray-400 hover:text-white'
                                }`}
                        >
                            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        <button
                            onClick={() => {
                                setSelectedPhase('origination');
                                setProgress(0);
                            }}
                            className="p-2 rounded-lg bg-white/5 border border-white/20 text-gray-400 hover:text-white transition-all"
                        >
                            <RotateCcw size={16} />
                        </button>
                        <span className="text-xs text-gray-500 font-mono ml-2">
                            {isAutoPlaying ? 'AUTO' : 'MANUAL'}
                        </span>
                    </div>
                </motion.div>

                {/* Compact Phase Cards with Progress */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {DEAL_PHASES.map((phase, idx) => {
                        const PhaseIcon = phase.icon;
                        const isActive = phase.id === selectedPhase;
                        const isPast = idx < activePhaseIndex;
                        const colors = getPhaseColors(idx);

                        return (
                            <motion.button
                                key={phase.id}
                                onClick={() => handlePhaseChange(phase.id)}
                                className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all ${isActive
                                    ? `${colors.bg} ${colors.border} ${colors.glow}`
                                    : isPast
                                        ? 'bg-white/5 border-white/20'
                                        : 'bg-black/20 border-white/10 hover:border-white/20'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Progress bar for active phase */}
                                {isActive && isAutoPlaying && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-oxot-blue"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}

                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${isActive ? colors.bg : 'bg-white/5'} ${isActive ? colors.border : 'border-white/10'} border`}>
                                        <PhaseIcon className={isActive ? colors.text : 'text-gray-500'} size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-bold mb-0.5 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                            {phase.shortLabel}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                            <Clock size={10} />
                                            <span>{phase.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkmark for completed phases */}
                                {isPast && (
                                    <div className="absolute top-2 right-2">
                                        <CheckCircle className="text-gray-600" size={14} />
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Phase Detail Panel - Redesigned Layout */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedPhase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`rounded-2xl border ${phaseColors.border} ${phaseColors.bg} p-6 md:p-8`}
                    >
                        {/* Phase Header with Key Metrics */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
                            {/* Left: Title & Description */}
                            <div className="flex items-start gap-4 flex-1">
                                <motion.div
                                    className={`p-4 rounded-xl ${phaseColors.bg} border ${phaseColors.border}`}
                                    animate={{
                                        boxShadow: [
                                            '0 0 20px rgba(255,255,255,0.05)',
                                            '0 0 40px rgba(255,255,255,0.1)',
                                            '0 0 20px rgba(255,255,255,0.05)'
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Icon className={phaseColors.text} size={32} />
                                </motion.div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{activePhase.label}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{activePhase.description}</p>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className={`flex items-center gap-1.5 px-3 py-1 ${phaseColors.bg} rounded border ${phaseColors.border}`}>
                                            <Clock size={12} className={phaseColors.text} />
                                            <span className={`text-xs font-medium ${phaseColors.text}`}>{activePhase.duration}</span>
                                        </div>
                                        {hasOxotValue && (
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-oxot-gold/10 rounded border border-oxot-gold/30">
                                                <Shield size={12} className="text-oxot-gold" />
                                                <span className="text-xs font-medium text-oxot-gold">OXOT Value Add</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Key Metrics Cards */}
                            {activePhase.keyMetrics && (
                                <div className="flex gap-3">
                                    {activePhase.keyMetrics.map((metric, i) => {
                                        const MetricIcon = metric.icon;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="px-4 py-3 bg-black/30 rounded-lg border border-white/10 text-center min-w-[90px]"
                                            >
                                                <MetricIcon className="text-gray-500 mx-auto mb-1" size={14} />
                                                <div className={`text-lg font-bold ${phaseColors.text}`}>{metric.value}</div>
                                                <div className="text-[9px] text-gray-500 uppercase tracking-wide">{metric.label}</div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* 3-Column Layout: Activities | Documents + DD | Real Example */}
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Column 1: Activities */}
                            <div className="lg:col-span-1">
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
                                            className={`p-3 rounded-lg border ${activity.status === 'oxot'
                                                ? 'bg-oxot-gold/10 border-oxot-gold/30'
                                                : 'bg-black/30 border-white/5'
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${activity.status === 'oxot' ? 'bg-oxot-gold' : 'bg-gray-600'
                                                    }`} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-white font-medium">{activity.task}</div>
                                                    <div className="text-[10px] text-gray-500">{activity.detail}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Column 2: Documents + DD Streams */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Key Documents - Now in sidebar */}
                                <div>
                                    <div className="text-xs uppercase font-medium text-gray-400 mb-3 flex items-center gap-2">
                                        <FileText size={12} />
                                        Key Documents
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {activePhase.documents.map((doc, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="p-3 bg-black/30 rounded-lg border border-white/5 flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <FileText size={12} className={phaseColors.text} />
                                                    <span className="text-xs text-white font-medium">{doc.name}</span>
                                                </div>
                                                <span className="text-[10px] text-gray-500 font-mono">{doc.pages}p</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* DD Streams (Due Diligence only) */}
                                {activePhase.id === 'diligence' && activePhase.ddStreams && (
                                    <div>
                                        <div className="text-xs uppercase font-medium text-gray-400 mb-3 flex items-center gap-2">
                                            <Shield size={12} />
                                            DD Streams
                                        </div>
                                        <div className="space-y-2">
                                            {activePhase.ddStreams.map((stream, i) => (
                                                <div
                                                    key={i}
                                                    className={`p-2 rounded-lg border ${stream.isGap
                                                        ? 'bg-oxot-gold/10 border-oxot-gold/30'
                                                        : 'bg-black/30 border-white/5'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-white font-medium">{stream.stream}</span>
                                                        <span className={`text-[10px] font-bold ${stream.isGap ? 'text-oxot-gold' : 'text-gray-500'}`}>
                                                            {stream.coverage}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Column 3: Real Example + OXOT Value */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* OXOT Value Box - Shows for ALL phases */}
                                {activePhase.oxotValue && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 bg-gradient-to-br from-oxot-gold/15 to-oxot-gold/5 rounded-xl border border-oxot-gold/30"
                                    >
                                        <div className="text-xs uppercase font-bold text-oxot-gold mb-3 flex items-center gap-2">
                                            <Shield size={12} />
                                            {activePhase.oxotValue.title || 'OXOT Value'}
                                        </div>
                                        <div className="space-y-1.5 mb-3">
                                            {activePhase.oxotValue.discovered.map((finding: string, i: number) => (
                                                <div key={i} className="flex items-start gap-2 text-[10px] text-gray-300">
                                                    <span className="text-oxot-gold">•</span>
                                                    <span>{finding}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-2 border-t border-oxot-gold/20">
                                            <div className="text-xs text-white font-bold">{activePhase.oxotValue.impact}</div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Real Transaction */}
                                {activePhase.realExample && (
                                    <div>
                                        <div className="text-xs uppercase font-medium text-gray-400 mb-3 flex items-center gap-2">
                                            <Calendar size={12} />
                                            {activePhase.realExample.deal}
                                        </div>
                                        <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                                            <div className="space-y-2">
                                                {activePhase.realExample.timeline.map((event, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-2 text-[11px] text-gray-400"
                                                    >
                                                        <ChevronRight size={10} className={`${phaseColors.text} flex-shrink-0 mt-0.5`} />
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
