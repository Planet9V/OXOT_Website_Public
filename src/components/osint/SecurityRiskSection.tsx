'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Shield, AlertTriangle, Activity, Target, Server, Lock,
    TrendingUp, Users, Globe, ChevronRight, ChevronLeft, ExternalLink,
    FileWarning, Bug, Zap, Network, Eye, Calendar,
    ChevronDown, BarChart3, Skull
} from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslations } from '@/i18n';

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function RiskGauge({ level }: { level: string }) {
    const colors: Record<string, string> = {
        'CRITICAL': 'bg-red-500',
        'HIGH': 'bg-orange-500',
        'MEDIUM': 'bg-yellow-500',
        'LOW': 'bg-green-500'
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colors[level] || 'bg-grey'} animate-pulse`} />
            <span className={`text-sm font-mono ${level === 'CRITICAL' || level === 'HIGH' ? 'text-red-400' : 'text-yellow-400'}`}>
                {level}
            </span>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, trend, color = 'blue' }: {
    icon: any;
    label: string;
    value: string | number;
    trend?: string;
    color?: string;
}) {
    const colorClasses: Record<string, string> = {
        blue: 'text-oxot-blue',
        red: 'text-red-400',
        gold: 'text-oxot-gold',
        green: 'text-green-400'
    };

    return (
        <div className="glass-panel p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
                <Icon className={colorClasses[color]} size={20} />
                {trend && <span className="text-[10px] text-red-400 font-mono">+{trend}</span>}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-grey">{label}</div>
        </div>
    );
}

function ThreatActorBadge({ name, rank }: { name: string; rank: number }) {
    const colors = ['bg-red-500/20 text-red-400 border-red-500/40',
        'bg-orange-500/20 text-orange-400 border-orange-500/40',
        'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
        'bg-grey/20 text-grey border-grey/40'];
    return (
        <span className={`px-3 py-1 text-xs font-mono rounded-full border ${colors[rank] || colors[3]}`}>
            #{rank + 1} {name}
        </span>
    );
}

function SubpageCard({ item, index }: { item: any; index: number }) {
    const Icon = item.icon;

    return (
        <motion.a
            href={item.link}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6 rounded-xl group hover:border-oxot-gold/40 transition-all cursor-pointer block"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-oxot-gold/10 rounded-lg">
                    <Icon className="text-oxot-gold" size={24} />
                </div>
                <ChevronRight className="text-grey group-hover:text-oxot-gold transition-colors" size={20} />
            </div>
            <h4 className="text-white font-semibold mb-2">{item.title}</h4>
            <p className="text-grey text-sm">{item.description}</p>
        </motion.a>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function SecurityRiskSection() {
    const { t } = useTranslations();

    // Alias for cleaner access to security translations
    const security = t.osint.security;

    const SECURITY_DATA = useMemo(() => ({
        overview: {
            riskLevel: security.overview.riskLevel,
            lastAssessment: '2025-12-31',
            incidentsYTD: 0,
            vulnerabilities: { critical: 2, high: 6, medium: 12 },
            compliance: {
                iec62443: security.overview.statusInProgress,
                nis2: security.overview.statusPending,
                fssc22000: security.overview.statusCertified
            }
        },
        sectorThreatHighlights: {
            totalAttacks2024: 212,
            yoyIncrease: '27%',
            q4Spike: '118%',
            topActors: ['RansomHub', 'Akira', 'LockBit 3.0', 'Hunters International']
        },
        mitreStats: {
            icsTechniques: 26,
            criticalTechniques: 8,
            highTechniques: 12
        },
        technologyRisks: [
            { name: 'Braincube AI', risk: 'CRITICAL', reason: security.techRisks.risks.braincube.reason },
            { name: 'Rockwell ControlLogix', risk: 'HIGH', reason: security.techRisks.risks.rockwell.reason },
            { name: 'SAP S/4HANA', risk: 'HIGH', reason: security.techRisks.risks.sap.reason },
            { name: 'Siemens S7-1500', risk: 'MEDIUM', reason: security.techRisks.risks.siemens.reason },
        ],
        subpages: [
            { id: 'mitre', title: security.subpages.mitre.title, icon: Target, description: security.subpages.mitre.description, link: '/corporate/osint-report/security/mitre' },
            { id: 'sectors', title: security.subpages.sectors.title, icon: Globe, description: security.subpages.sectors.description, link: '/corporate/osint-report/security/sectors' },
            { id: 'technology', title: security.subpages.technology.title, icon: Server, description: security.subpages.technology.description, link: '/corporate/osint-report/security/technology' },
            { id: 'iec62443', title: security.subpages.iec62443.title, icon: Shield, description: security.subpages.iec62443.description, link: '/corporate/osint-report/security/iec62443' },
            { id: 'attacker', title: security.subpages.attacker.title, icon: Skull, description: security.subpages.attacker.description, link: '/corporate/osint-report/security/attacker-view' },
        ]
    }), [security]);

    return (
        <div className="space-y-12">
            {/* Header */}
            <ScrollReveal>
                <Link href="/corporate/osint-report" className="inline-flex items-center gap-2 text-grey hover:text-white text-sm mb-6 transition-colors">
                    <ChevronLeft size={16} />
                    {security.backLink}
                </Link>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="text-red-400" size={24} />
                            <h2 className="heading-2 text-white">{security.title}</h2>
                        </div>
                        <p className="text-grey">{security.subtitle}</p>
                    </div>
                    <RiskGauge level={SECURITY_DATA.overview.riskLevel} />
                </div>
            </ScrollReveal>

            {/* Key Metrics */}
            <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        icon={AlertTriangle}
                        label={security.overview.sectorAttacks}
                        value={SECURITY_DATA.sectorThreatHighlights.totalAttacks2024}
                        trend={SECURITY_DATA.sectorThreatHighlights.yoyIncrease}
                        color="red"
                    />
                    <StatCard
                        icon={Target}
                        label={security.overview.mitreTechniques}
                        value={SECURITY_DATA.mitreStats.icsTechniques}
                        color="gold"
                    />
                    <StatCard
                        icon={Bug}
                        label={security.overview.criticalCves}
                        value={SECURITY_DATA.overview.vulnerabilities.critical}
                        color="red"
                    />
                    <StatCard
                        icon={Shield}
                        label={security.overview.iecStatus}
                        value={SECURITY_DATA.overview.compliance.iec62443}
                        color="blue"
                    />
                </div>
            </ScrollReveal>

            {/* Threat Actor Landscape */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500">
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="text-red-400" size={20} />
                        <h3 className="text-white font-semibold">{security.threatActors.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {SECURITY_DATA.sectorThreatHighlights.topActors.map((actor, i) => (
                            <ThreatActorBadge key={actor} name={actor} rank={i} />
                        ))}
                    </div>
                    <p className="text-grey text-sm" dangerouslySetInnerHTML={{ __html: security.threatActors.description }} />
                </div>
            </ScrollReveal>

            {/* Technology Risk Summary */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Server className="text-oxot-gold" size={20} />
                        <h3 className="text-white font-semibold">{security.techRisks.title}</h3>
                    </div>
                    <div className="space-y-3">
                        {SECURITY_DATA.technologyRisks.map((tech, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                <div>
                                    <div className="text-white font-medium text-sm">{tech.name}</div>
                                    <div className="text-grey text-xs">{tech.reason}</div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded border ${tech.risk === 'CRITICAL' ? 'text-red-400 bg-red-500/10 border-red-500/30' :
                                    tech.risk === 'HIGH' ? 'text-orange-400 bg-orange-500/10 border-orange-500/30' :
                                        'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
                                    }`}>
                                    {tech.risk}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Critical Finding Alert */}
            <ScrollReveal>
                <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-500/20 rounded-lg mt-1">
                            <FileWarning className="text-red-400" size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-red-400 font-semibold mb-1">{security.criticalAlert.title}</h4>
                            <p className="text-grey text-sm mb-3">
                                {security.criticalAlert.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded">{security.criticalAlert.tags.poisoning}</span>
                                <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded">{security.criticalAlert.tags.injection}</span>
                                <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded">{security.criticalAlert.tags.exfiltration}</span>
                                <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded">{security.criticalAlert.tags.supplyChain}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Subpage Navigation */}
            <ScrollReveal>
                <div className="mb-4">
                    <h3 className="text-sm font-mono text-oxot-gold mb-4">{security.subpages.header}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {SECURITY_DATA.subpages.map((item, i) => (
                            <SubpageCard key={item.id} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Compliance Status */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Lock className="text-oxot-blue" size={20} />
                        <h3 className="text-white font-semibold">{security.compliance.title}</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-sm">{security.compliance.iec.label}</span>
                                <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">{SECURITY_DATA.overview.compliance.iec62443}</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '35%' }} />
                            </div>
                            <div className="text-grey text-xs mt-2">{security.compliance.iec.desc}</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-sm">{security.compliance.nis2.label}</span>
                                <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">{SECURITY_DATA.overview.compliance.nis2}</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 rounded-full" style={{ width: '20%' }} />
                            </div>
                            <div className="text-grey text-xs mt-2">{security.compliance.nis2.desc}</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white text-sm">{security.compliance.fssc.label}</span>
                                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">{SECURITY_DATA.overview.compliance.fssc22000}</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                            </div>
                            <div className="text-grey text-xs mt-2">{security.compliance.fssc.desc}</div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
