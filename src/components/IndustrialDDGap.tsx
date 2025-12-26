'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Shield, Scale, Leaf, Lock, ChevronDown, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Real DD coverage comparison with detailed findings
const DD_CATEGORIES = [
    {
        category: 'Financial Due Diligence',
        covered: true,
        IconComponent: Scale,
        typical_scope: 'EBITDA quality, working capital, debt structure, tax liabilities, financial projections',
        what_they_check: [
            { item: 'Quality of Earnings (QoE) analysis', detail: 'Revenue recognition, non-recurring items, EBITDA normalization adjustments', coverage: '95%' },
            { item: 'Working capital review', detail: 'Days sales outstanding, inventory turnover, payables management', coverage: '90%' },
            { item: 'Debt & off-balance sheet liabilities', detail: 'Credit agreements, leases, pension obligations, contingent liabilities', coverage: '100%' },
            { item: 'Tax structure & NOLs', detail: 'Effective tax rate, deferred tax assets, transfer pricing, nexus issues', coverage: '85%' }
        ],
        what_they_miss: [
            { item: 'Cyber incident financial impact modeling', gap: 'No quantification of ransomware downtime costs or data breach liabilities', risk: 'Medium' },
            { item: 'Technology debt capitalization analysis', gap: 'EOL systems treated as CapEx, not security remediation OpEx', risk: 'Low' }
        ],
        providers: 'Big 4 (PwC, Deloitte, EY, KPMG), FTI Consulting, Alvarez & Marsal'
    },
    {
        category: 'Legal Due Diligence',
        covered: true,
        IconComponent: Shield,
        typical_scope: 'Material contracts, IP portfolio, litigation history, regulatory compliance, corporate structure',
        what_they_check: [
            { item: 'Material contract review', detail: 'Customer/supplier agreements, change of control provisions, termination rights', coverage: '100%' },
            { item: 'IP ownership & encumbrances', detail: 'Patents, trademarks, copyrights, licensing agreements, open source usage', coverage: '80%' },
            { item: 'Litigation & regulatory matters', detail: 'Pending litigation, regulatory investigations, consent decrees', coverage: '100%' },
            { item: 'Employment & labor compliance', detail: 'Union agreements, WARN Act, wage & hour claims, benefits plans', coverage: '90%' }
        ],
        what_they_miss: [
            { item: 'Cyber insurance policy adequacy', gap: 'No analysis of silent cyber exclusions, war/terrorism clauses, or sublimit sufficiency vs. actual exposure', risk: 'High' },
            { item: 'GDPR/CCPA compliance posture', gap: 'No technical audit of data processing agreements, cross-border transfers, or deletion capabilities', risk: 'High' },
            { item: 'Breach notification obligations', gap: 'No assessment of incident response plan, notification timeline capability, or multi-jurisdictional exposure', risk: 'Critical' }
        ],
        providers: 'Kirkland & Ellis, Latham & Watkins, Simpson Thacher, Ropes & Gray'
    },
    {
        category: 'Environmental Due Diligence',
        covered: true,
        IconComponent: Leaf,
        typical_scope: 'Phase I/II ESA, contamination, permits, compliance with EPA/state regulations',
        what_they_check: [
            { item: 'Phase I Environmental Site Assessment', detail: 'Historical use, records review, site reconnaissance, interviews', coverage: '100%' },
            { item: 'Hazardous materials & contamination', detail: 'USTs, ASTs, soil/groundwater testing, ongoing remediation', coverage: '95%' },
            { item: 'Air & water permits', detail: 'CAA Title V, NPDES, stormwater, compliance history', coverage: '100%' },
            { item: 'Waste management practices', detail: 'RCRA compliance, manifest tracking, disposal sites, generator status', coverage: '90%' }
        ],
        what_they_miss: [
            { item: 'SCADA/BMS cyber-physical safety risks', gap: 'No assessment of cyberattack impact on emissions controls, wastewater treatment, or safety systems', risk: 'Critical' },
            { item: 'ICS ransomware environmental consequence', gap: 'Uncontrolled chemical release, permit exceedance, or EPA violation due to control system compromise', risk: 'High' }
        ],
        providers: 'ERM, AECOM, Arcadis, Ramboll, Trinity Consultants'
    },
    {
        category: 'Industrial Cybersecurity',
        covered: false,
        highlight: true,
        IconComponent: Lock,
        typical_scope: 'ICS/SCADA security, OT network architecture, sector-specific compliance, active threat assessment',
        what_they_check: [
            { item: 'No traditional provider has this capability', detail: 'Financial and legal DD teams lack OT security expertise', coverage: '0%' }
        ],
        what_they_miss: [
            { item: 'ICS/SCADA vulnerability assessment', gap: 'No scanning or testing of PLCs, RTUs, HMIs, DCS, or SCADA servers for CVEs, misconfigurations, or vendor EOL status', risk: 'Critical' },
            { item: 'OT network architecture review', gap: 'No Purdue Model compliance check, IT/OT segmentation analysis, or industrial firewall deployment verification', risk: 'Critical' },
            { item: 'Sector-specific regulatory compliance', gap: 'No NERC CIP (energy), TSA directives (pipelines), FDA 21 CFR Part 11 (pharma), or NIST SP 800-82 (manufacturing) assessment', risk: 'Critical' },
            { item: 'Active threat hunting in OT environment', gap: 'No IOC searches, behavioral analytics, or adversary TTPs detection specific to industrial environments (e.g., Volt Typhoon, PIPEDREAM)', risk: 'Critical' },
            { item: 'Supply chain & vendor cyber risk', gap: 'No SBOM analysis, vendor remote access review, or third-party OT integrator security posture assessment', risk: 'High' },
            { item: 'Safety system cyber-physical impact', gap: 'No analysis of cyberattack impact on SIS, emergency shutdown systems, or process safety (per IEC 61508/61511)', risk: 'Critical' },
            { item: 'Incident response & recovery capability', gap: 'No OT-specific IR playbook review, backup/restore testing for control systems, or manual operation contingency validation', risk: 'High' },
            { item: 'Workforce OT security awareness', gap: 'No assessment of engineering team cyber hygiene, USB policy, or insider threat controls in production environments', risk: 'Medium' }
        ],
        providers: 'OXOT, Dragos (OT threat intel only), Claroty (visibility tool vendor), Mandiant (incident response, not proactive DD)'
    }
];

export default function IndustrialDDGap() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'coverage' | 'gaps'>('gaps');

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg mb-6">
                        <AlertTriangle className="text-gray-400" size={14} />
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">The Industrial Cybersecurity Blind Spot</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        <span className="text-white">What Traditional DD </span>
                        <span className="text-gray-500">Misses</span>
                    </h2>

                    <p className="text-gray-400 text-sm max-w-3xl mx-auto mb-8">
                        Standard M&A due diligence processes weren't designed for the complexity of industrial control systems and operational technology networks
                    </p>

                    {/* View Toggle */}
                    <div className="inline-flex p-1 bg-black/40 rounded-lg border border-white/10">
                        <button
                            onClick={() => setViewMode('coverage')}
                            className={`px-4 py-2 rounded text-sm font-medium transition-all ${viewMode === 'coverage'
                                ? 'bg-white/10 text-white'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            What They Check
                        </button>
                        <button
                            onClick={() => setViewMode('gaps')}
                            className={`px-4 py-2 rounded text-sm font-medium transition-all ${viewMode === 'gaps'
                                ? 'bg-white/10 text-white'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            What They Miss
                        </button>
                    </div>
                </motion.div>

                {/* Categories - Accordion Style */}
                <div className="space-y-3">
                    {DD_CATEGORIES.map((category, idx) => {
                        const isExpanded = expandedCategory === category.category;
                        const isHighlight = category.highlight;
                        const Icon = category.IconComponent;

                        return (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative"
                            >
                                {/* Subtle glow for Industrial Cybersecurity */}
                                {isHighlight && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-oxot-gold/10 via-oxot-blue/5 to-transparent rounded-lg blur-xl opacity-50 pointer-events-none"
                                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                )}

                                <motion.div
                                    layout
                                    className={`relative rounded-lg border backdrop-blur-xl transition-all ${isHighlight
                                        ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-oxot-gold/40 hover:border-oxot-gold/60 shadow-[0_0_30px_rgba(251,191,36,0.15)]'
                                        : 'bg-black/20 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    {/* Category Header - Clickable */}
                                    <button
                                        onClick={() => setExpandedCategory(isExpanded ? null : category.category)}
                                        className="w-full p-6 text-left"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon & Status */}
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    className={`p-3 rounded-lg border ${isHighlight ? 'bg-oxot-gold/10 border-oxot-gold/30' : 'bg-white/5 border-white/10'
                                                        }`}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Icon size={24} className={isHighlight ? 'text-oxot-gold' : 'text-gray-400'} />
                                                </motion.div>

                                                <motion.div whileHover={{ scale: 1.1 }}>
                                                    {category.covered ? (
                                                        <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                                                            <CheckCircle2 size={20} className="text-gray-400" />
                                                        </div>
                                                    ) : (
                                                        <div className="p-2 bg-oxot-gold/10 border border-oxot-gold/30 rounded-lg">
                                                            <XCircle size={20} className="text-oxot-gold" />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Category Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className={`text-lg font-bold mb-1 ${isHighlight ? 'text-white' : 'text-gray-300'}`}>
                                                            {category.category}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 mb-2">{category.typical_scope}</p>
                                                    </div>
                                                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                                                        <ChevronDown className={isHighlight ? 'text-oxot-gold' : 'text-gray-500'} size={18} />
                                                    </motion.div>
                                                </div>

                                                {/* Quick Stats */}
                                                {!isExpanded && (
                                                    <div className="flex items-center gap-4 mt-3 text-xs">
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle2 size={12} className="text-gray-500" />
                                                            <span className="text-gray-400">{category.what_they_check.length} areas checked</span>
                                                        </div>
                                                        <span className="text-gray-600">•</span>
                                                        <div className="flex items-center gap-2">
                                                            {category.what_they_miss.length > 0 && (
                                                                <>
                                                                    <AlertTriangle size={12} className={isHighlight ? 'text-oxot-gold' : 'text-gray-500'} />
                                                                    <span className={isHighlight ? 'text-oxot-gold font-medium' : 'text-gray-400'}>
                                                                        {category.what_they_miss.length} critical gaps
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ type: "spring", bounce: 0 }}
                                                className="px-6 pb-6"
                                            >
                                                <div className="pt-4 border-t border-white/10">
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        {/* Standard Coverage */}
                                                        <div>
                                                            <div className="text-xs uppercase font-medium text-gray-400 mb-3">
                                                                {isHighlight ? 'Traditional Coverage' : 'Standard Coverage'}
                                                            </div>
                                                            <div className="space-y-2">
                                                                {category.what_they_check.map((item, i) => (
                                                                    <div key={i} className="p-3 bg-black/20 rounded border border-white/5">
                                                                        <div className="flex items-start justify-between mb-1">
                                                                            <div className="text-sm font-medium text-white">{item.item}</div>
                                                                            {item.coverage && (
                                                                                <div className="px-2 py-0.5 bg-white/10 text-white rounded text-[10px] font-bold">
                                                                                    {item.coverage}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="text-xs text-gray-400">{item.detail}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Critical Gaps */}
                                                        <div>
                                                            <div className={`text-xs uppercase font-medium mb-3 ${isHighlight ? 'text-oxot-gold' : 'text-gray-400'
                                                                }`}>
                                                                {isHighlight ? 'What OXOT Covers' : 'Critical Gaps'}
                                                            </div>
                                                            <div className="space-y-2">
                                                                {category.what_they_miss.map((item, i) => (
                                                                    <div key={i} className={`p-3 rounded border ${isHighlight
                                                                        ? 'bg-oxot-gold/10 border-oxot-gold/30'
                                                                        : 'bg-black/20 border-white/5'
                                                                        }`}>
                                                                        <div className="flex items-start justify-between mb-1">
                                                                            <div className={`text-sm font-medium ${isHighlight ? 'text-white' : 'text-gray-300'}`}>
                                                                                {item.item}
                                                                            </div>
                                                                            {item.risk && (
                                                                                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.risk === 'Critical' ? 'bg-red-950/50 text-red-400' :
                                                                                    item.risk === 'High' ? 'bg-orange-950/50 text-orange-400' :
                                                                                        item.risk === 'Medium' ? 'bg-yellow-950/50 text-yellow-400' :
                                                                                            'bg-gray-800 text-gray-400'
                                                                                    }`}>
                                                                                    {item.risk}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="text-xs text-gray-400">{item.gap}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Provider Info */}
                                                    <div className="mt-4 pt-4 border-t border-white/10">
                                                        <div className="text-[10px] uppercase font-medium text-gray-500 mb-1">Typical Providers</div>
                                                        <div className="text-xs text-gray-400">{category.providers}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA - OXOT Branded */}
                <motion.div
                    className="mt-12 relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.01 }}
                >
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.08), transparent)',
                            backgroundSize: '200% 100%'
                        }}
                        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="relative p-8 bg-gradient-to-br from-black/60 to-black/40 rounded-lg border border-oxot-gold/30 group-hover:border-oxot-gold/50 transition-all shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-4">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-oxot-gold/20 to-oxot-gold/10 border border-oxot-gold/40 rounded-lg">
                                    <Lock className="text-oxot-gold" size={18} />
                                    <span className="text-oxot-gold text-sm font-bold uppercase tracking-wider">OXOT Services</span>
                                </div>

                                <h4 className="text-white font-bold text-xl">
                                    Industrial Cybersecurity Specialists for M&A Due Diligence
                                </h4>

                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                    OXOT provides the <span className="text-oxot-gold font-medium">only specialized industrial cybersecurity due diligence service</span> designed for PE firms and strategic acquirers. Our team has conducted <span className="text-white font-medium">on-site OT/ICS assessments</span> across energy, manufacturing, semiconductors, and critical infrastructure sectors worldwide.
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <div className="px-3 py-1 bg-white/5 border border-oxot-gold/20 rounded text-xs text-gray-300">
                                        <span className="text-oxot-gold">✓</span> NERC CIP Compliance
                                    </div>
                                    <div className="px-3 py-1 bg-white/5 border border-oxot-gold/20 rounded text-xs text-gray-300">
                                        <span className="text-oxot-gold">✓</span> ICS/SCADA Security
                                    </div>
                                    <div className="px-3 py-1 bg-white/5 border border-oxot-gold/20 rounded text-xs text-gray-300">
                                        <span className="text-oxot-gold">✓</span> OT Network Architecture
                                    </div>
                                    <div className="px-3 py-1 bg-white/5 border border-oxot-gold/20 rounded text-xs text-gray-300">
                                        <span className="text-oxot-gold">✓</span> Threat Intelligence
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <motion.div
                                    className="text-center p-6 bg-gradient-to-br from-oxot-gold/10 to-transparent rounded-lg border border-oxot-gold/30 min-w-[220px] group-hover:border-oxot-gold/50 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-xs text-oxot-gold uppercase font-medium mb-2 tracking-wider">Global Experience</div>
                                    <motion.div
                                        className="text-3xl font-bold text-white mb-1"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                    >
                                        40+
                                    </motion.div>
                                    <div className="text-xs text-gray-400 uppercase">
                                        Facility Assessments
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-2">
                                        Energy • Manufacturing • Semiconductors
                                    </div>
                                </motion.div>

                                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="text-xs text-gray-400 uppercase mb-1">Trusted By</div>
                                    <div className="text-sm font-bold text-white">Leading PE Firms</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
