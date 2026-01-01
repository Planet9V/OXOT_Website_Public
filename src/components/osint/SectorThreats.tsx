'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar, TrendingUp, AlertTriangle, Globe, ChevronDown,
    Building2, Zap, DollarSign, Target, Activity, BarChart3
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// SECTOR THREAT DATA
// =============================================================================

const SECTOR_DATA = {
    summary: {
        total2024: 212,
        yoyIncrease: 27,
        q4Spike: 118,
        sectorRank: 6,
        avgIncidentsPerMonth: 18
    },
    quarters: [
        {
            period: 'Q1 2025',
            incidents: 84,
            trend: '+101%',
            highlight: 'Attacks doubled vs Q1 2024',
            topActors: ['RansomHub', 'Hunters International'],
            majorIncidents: [
                { name: 'South Africa Chicken Producer', subsector: 'Poultry', date: 'March 2025', damages: '$1M+', actor: 'Unknown' },
                { name: 'Siberian Dairy Plant', subsector: 'Dairy', date: 'March 2025', damages: 'Unknown', actor: 'Unknown' },
            ]
        },
        {
            period: 'Q4 2024',
            incidents: 52,
            trend: '+118%',
            highlight: 'RansomHub emerged dominant post-LockBit',
            topActors: ['RansomHub', 'Akira', 'Clop'],
            majorIncidents: [
                { name: 'Ahold Delhaize (Stop & Shop)', subsector: 'Grocery Retail', date: 'Nov 2024', damages: 'Inventory disruption', actor: 'Unknown' },
            ]
        },
        {
            period: 'Q3 2024',
            incidents: 48,
            trend: '+25%',
            highlight: 'Supply chain interconnections exploited',
            topActors: ['LockBit 3.0', 'BlackBasta'],
            majorIncidents: [
                { name: 'United Natural Foods', subsector: 'Grocery Wholesale', date: 'June 2024', damages: 'Online ordering shutdown', actor: 'Unknown' },
            ]
        },
        {
            period: 'Q2 2024',
            incidents: 45,
            trend: '+20%',
            highlight: 'Legacy OT/ICS primary entry vector',
            topActors: ['LockBit 3.0', 'ALPHV/BlackCat'],
            majorIncidents: [
                { name: 'AGCO (Farm Equipment)', subsector: 'Agriculture Equipment', date: 'Ongoing', damages: 'Manufacturing disruption', actor: 'Unknown' },
            ]
        },
    ],
    subsectorRisks: [
        { name: 'Meat Processing', risk: 'CRITICAL', attacks2024: 45, avgDamage: '$5-20M' },
        { name: 'Dairy Processing', risk: 'HIGH', attacks2024: 28, avgDamage: '$2-10M' },
        { name: 'Grain & Commodities', risk: 'HIGH', attacks2024: 35, avgDamage: '$3-15M' },
        { name: 'Produce & Fresh Foods', risk: 'MEDIUM', attacks2024: 22, avgDamage: '$1-5M' },
        { name: 'Cocoa & Coffee', risk: 'MEDIUM', attacks2024: 15, avgDamage: '$2-8M' },
        { name: 'Spices & Nuts', risk: 'LOW', attacks2024: 8, avgDamage: '$500K-2M' },
    ],
    ttps: [
        { tactic: 'Double Extortion', percentage: 53, description: 'Encryption + data leak threats' },
        { tactic: 'Supply Chain Targeting', percentage: 22, description: 'Just-in-time delivery disruption' },
        { tactic: 'OT/IoT Exploitation', percentage: 15, description: 'Automated systems, sensors' },
        { tactic: 'Credential Harvesting', percentage: 10, description: 'Lateral movement IT→OT' },
    ]
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function QuarterCard({ quarter, index }: { quarter: typeof SECTOR_DATA.quarters[0]; index: number }) {
    const [expanded, setExpanded] = useState(index === 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel rounded-xl overflow-hidden"
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <Calendar className="text-oxot-gold" size={20} />
                    <div className="text-left">
                        <div className="text-white font-semibold">{quarter.period}</div>
                        <div className="text-grey text-sm">{quarter.highlight}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">{quarter.incidents}</div>
                        <div className="text-red-400 text-sm font-mono">{quarter.trend}</div>
                    </div>
                    <ChevronDown className={`text-grey transition-transform ${expanded ? 'rotate-180' : ''}`} size={20} />
                </div>
            </button>
            {expanded && (
                <div className="border-t border-white/10 p-5 space-y-4">
                    <div>
                        <h4 className="text-xs font-mono text-oxot-gold mb-2">TOP THREAT ACTORS</h4>
                        <div className="flex flex-wrap gap-2">
                            {quarter.topActors.map((actor, i) => (
                                <span key={actor} className={`text-xs px-3 py-1 rounded-full border ${i === 0 ? 'text-red-400 bg-red-500/10 border-red-500/30' :
                                        'text-grey bg-white/5 border-white/10'
                                    }`}>
                                    {actor}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-mono text-oxot-gold mb-2">MAJOR INCIDENTS</h4>
                        <div className="space-y-2">
                            {quarter.majorIncidents.map((incident, i) => (
                                <div key={i} className="p-3 bg-black/30 rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-white text-sm">{incident.name}</span>
                                        <span className="text-grey text-xs">{incident.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-grey">
                                        <span className="px-2 py-0.5 bg-white/5 rounded">{incident.subsector}</span>
                                        <span className="text-orange-400">{incident.damages}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function SubsectorRiskChart() {
    return (
        <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-oxot-gold" size={20} />
                <h3 className="text-white font-semibold">Subsector Risk Analysis</h3>
            </div>
            <div className="space-y-3">
                {SECTOR_DATA.subsectorRisks.map((sector) => (
                    <div key={sector.name} className="flex items-center gap-4">
                        <div className="w-32 text-sm text-grey truncate">{sector.name}</div>
                        <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden relative">
                            <div
                                className={`h-full rounded-full ${sector.risk === 'CRITICAL' ? 'bg-red-500' :
                                        sector.risk === 'HIGH' ? 'bg-orange-500' :
                                            sector.risk === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                style={{ width: `${(sector.attacks2024 / 50) * 100}%` }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-mono">
                                {sector.attacks2024} attacks
                            </span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${sector.risk === 'CRITICAL' ? 'text-red-400 bg-red-500/10' :
                                sector.risk === 'HIGH' ? 'text-orange-400 bg-orange-500/10' :
                                    sector.risk === 'MEDIUM' ? 'text-yellow-400 bg-yellow-500/10' :
                                        'text-green-400 bg-green-500/10'
                            }`}>
                            {sector.risk}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function SectorThreats() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <ScrollReveal>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">SECTOR THREAT INTELLIGENCE</span>
                    </div>
                    <PageHeader
                        title="Food & Agriculture Threats"
                        subtitle="Monthly attack reports and trend analysis for OFI's operating sectors (July 2023 - December 2025)"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Summary Stats */}
            <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-white mb-1">{SECTOR_DATA.summary.total2024}</div>
                        <div className="text-xs text-grey">Total Attacks 2024</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-red-400 mb-1">+{SECTOR_DATA.summary.yoyIncrease}%</div>
                        <div className="text-xs text-grey">YoY Increase</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-orange-400 mb-1">+{SECTOR_DATA.summary.q4Spike}%</div>
                        <div className="text-xs text-grey">Q4 2024 Spike</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-oxot-gold mb-1">#{SECTOR_DATA.summary.sectorRank}</div>
                        <div className="text-xs text-grey">Most Targeted Sector</div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Quarterly Timeline */}
            <ScrollReveal>
                <div className="mb-8">
                    <h3 className="text-sm font-mono text-oxot-gold mb-4">QUARTERLY INCIDENT TIMELINE</h3>
                    <div className="space-y-4">
                        {SECTOR_DATA.quarters.map((quarter, i) => (
                            <QuarterCard key={quarter.period} quarter={quarter} index={i} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Subsector Risks */}
            <ScrollReveal>
                <div className="mb-8">
                    <SubsectorRiskChart />
                </div>
            </ScrollReveal>

            {/* TTPs */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="text-oxot-gold" size={20} />
                        <h3 className="text-white font-semibold">Common Attack Tactics (2024-2025)</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {SECTOR_DATA.ttps.map((ttp) => (
                            <div key={ttp.tactic} className="p-4 bg-black/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-medium">{ttp.tactic}</span>
                                    <span className="text-oxot-gold font-mono">{ttp.percentage}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-oxot-gold rounded-full" style={{ width: `${ttp.percentage}%` }} />
                                </div>
                                <div className="text-grey text-xs">{ttp.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* OFI Relevance */}
            <ScrollReveal>
                <div className="mt-8 p-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-red-400 mt-1" size={20} />
                        <div>
                            <h4 className="text-red-400 font-semibold mb-2">OFI Sector Exposure Analysis</h4>
                            <p className="text-grey text-sm">
                                OFI operates across <strong className="text-white">5 subsectors</strong> (Cocoa, Coffee, Dairy, Nuts, Spices)
                                with varying risk profiles. Dairy processing faces elevated risk with dedicated threat actors (Hunters International).
                                The company's 120+ facilities and integrated supply chain create substantial attack surface.
                            </p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
