'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Target, TrendingUp, BarChart3,
    Users, ArrowRight, Zap, Globe, Shield, Crown, Terminal,
    CheckCircle, XCircle, Minus, DollarSign, Building, Briefcase,
    Map, PieChart, Activity, Award, Rocket, Handshake, ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { services, regions, getServicesByTier, marketSummary } from '@/data/services-portfolio';
import { enhancements, tiers } from '@/data/enhancements-index';

// ============== DATA ==============

// Regional consulting rates (market research)
const REGIONAL_RATES = {
    NA: { min: 150, max: 300, currency: '$', region: 'North America' },
    EU: { min: 100, max: 250, currency: '€', region: 'Europe' },
    APAC: { min: 30, max: 120, currency: '$', region: 'Asia-Pacific' },
    LATAM: { min: 50, max: 100, currency: '$', region: 'Latin America' }
};

// Competitive landscape
const COMPETITORS = [
    { name: 'CrowdStrike', type: 'Leader', strengths: ['Brand recognition', 'Cloud-native', 'Large install base'], weaknesses: ['No on-premise', 'Generic AI', 'High cost'] },
    { name: 'Palo Alto', type: 'Leader', strengths: ['Full stack', 'Enterprise sales', 'Partner network'], weaknesses: ['Complexity', 'Integration overhead', 'No psychometrics'] },
    { name: 'Mandiant', type: 'Challenger', strengths: ['Threat intel', 'IR expertise', 'APT research'], weaknesses: ['Consulting focus', 'Limited automation', 'Now Google-owned'] },
    { name: 'Recorded Future', type: 'Niche', strengths: ['TI feeds', 'Dark web', 'API-first'], weaknesses: ['No detection', 'No response', 'Data only'] }
];

// SWOT data
const SWOT = {
    strengths: [
        'Unique mathematical foundations (McKenney-Lacan, GGNN)',
        'On-premise privacy (critical for NIS2/GDPR)',
        'Multi-tier integrated offering (Gold/Blue/Red)',
        'Deep theory-to-practice applied research'
    ],
    weaknesses: [
        'Pre-revenue stage, limited market validation',
        'Small team, capacity constraints',
        'No enterprise sales track record',
        'Long R&D cycles to production'
    ],
    opportunities: [
        'NIS2 compliance deadline driving €500B EU spend',
        'OT/IT convergence creating new attack surfaces',
        'AI-native security gap (current tools retrofitted)',
        'Critical infrastructure protection mandates'
    ],
    threats: [
        'CrowdStrike/Palo Alto market dominance',
        'Talent competition from big tech',
        'Long enterprise sales cycles (12-18 months)',
        'Economic downturn reducing security budgets'
    ]
};

// Magic Quadrant positioning
const QUADRANT_SERVICES = [
    // Visionaries (high vision, lower execution)
    { name: 'Zero-Day Physics', x: 25, y: 80, tier: 'Blue' },
    { name: 'TTP Prediction', x: 30, y: 75, tier: 'Blue' },
    { name: 'Team Psychometrics', x: 20, y: 85, tier: 'Gold' },
    // Challengers (high execution, lower vision)
    { name: 'On-Premise Intel', x: 70, y: 40, tier: 'Blue' },
    { name: 'Propagation Control', x: 75, y: 45, tier: 'Blue' },
    { name: 'Attack Path GGNN', x: 65, y: 35, tier: 'Red' },
    // Niche Players (lower both)
    { name: 'M&A Due Diligence', x: 35, y: 30, tier: 'Gold' },
    { name: 'Red Team Ops', x: 40, y: 25, tier: 'Red' },
    // Market Leaders (reference)
    { name: 'CrowdStrike', x: 85, y: 70, tier: 'competitor' },
    { name: 'Palo Alto', x: 80, y: 65, tier: 'competitor' },
];

// ARR Projections
const ARR_SCENARIOS = {
    conservative: { y1: 1.2, y2: 3.5, y3: 8, y4: 15, y5: 25 },
    base: { y1: 2.5, y2: 7, y3: 15, y4: 30, y5: 50 },
    aggressive: { y1: 4, y2: 12, y3: 28, y4: 55, y5: 100 }
};

// Slide definitions
const slides = [
    { id: 1, type: 'title', title: 'OXOT', subtitle: 'Strategic Market Assessment 2025' },
    { id: 2, type: 'executive', title: 'Executive Summary', subtitle: 'Key Insights & Decision Points' },
    { id: 3, type: 'market', title: 'Market Opportunity', subtitle: 'TAM / SAM / SOM Analysis' },
    { id: 4, type: 'swot', title: 'SWOT Analysis', subtitle: 'Strategic Positioning' },
    { id: 5, type: 'quadrant', title: 'Market Position', subtitle: 'Magic Quadrant Analysis' },
    { id: 6, type: 'portfolio', title: 'Service Portfolio', subtitle: '13 Integrated Capabilities' },
    { id: 7, type: 'enhancements', title: 'API Enhancements', subtitle: '27 Predictive Capabilities' },
    { id: 8, type: 'competitive', title: 'Competitive Landscape', subtitle: 'Differentiation Matrix' },
    { id: 9, type: 'pricing', title: 'Regional Pricing', subtitle: 'Global Rate Cards' },
    { id: 10, type: 'revenue', title: 'Revenue Models', subtitle: 'ARR & Partner Economics' },
    { id: 11, type: 'gtm', title: 'Go-To-Market', subtitle: '3-Phase Strategy' },
    { id: 12, type: 'financials', title: 'Financial Projections', subtitle: '5-Year ARR Forecast' },
    { id: 13, type: 'asks', title: 'Strategic Decisions', subtitle: 'Leadership Action Items' }
];

// ============== SLIDE COMPONENTS ==============

const TitleSlide = () => (
    <div className="h-full flex flex-col items-center justify-center text-center relative">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <Image src="/Logos_OXOT_Gold_White/OXOT_GW_Dark.svg" alt="OXOT" width={350} height={120} className="mx-auto mb-8" priority />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
                STRATEGIC <span className="text-oxot-gold">MARKET ASSESSMENT</span>
            </h1>
            <p className="text-xl text-gray-500 font-mono">Internal Leadership Review // Q1 2025</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-16 text-sm text-gray-600 font-mono">
            CONFIDENTIAL — INTERNAL USE ONLY
        </motion.div>
    </div>
);

const ExecutiveSummarySlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-12">
            <div>
                <h2 className="text-3xl font-black text-white mb-6">KEY INSIGHTS</h2>
                <div className="space-y-4">
                    {[
                        { num: '1', text: 'Global cybersecurity market is $245B with 12.6% CAGR — critical infrastructure segment growing fastest', color: 'text-green-400' },
                        { num: '2', text: 'Our unique mathematical approach (McKenney-Lacan, GGNN) creates defensible moat vs. commoditized solutions', color: 'text-oxot-gold' },
                        { num: '3', text: 'NIS2 deadline + OT/IT convergence = 18-month window for market entry', color: 'text-oxot-blue' }
                    ].map((item, i) => (
                        <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                            <span className={`text-2xl font-black ${item.color}`}>{item.num}</span>
                            <p className="text-gray-300">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-black text-white mb-6">DECISION POINTS</h2>
                <div className="space-y-3">
                    {[
                        'Prioritize Blue Team P1 services for Q1-Q2 launch',
                        'Target EU market first (NIS2 compliance demand)',
                        'Partner channel strategy: 30-40% margin allocation',
                        'Direct enterprise sales team: 3 senior AEs',
                        'Pilot program: 5 design partners at €50K each'
                    ].map((item, i) => (
                        <motion.div key={i} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 p-3 bg-oxot-gold/10 border border-oxot-gold/30 rounded-lg">
                            <CheckCircle size={18} className="text-oxot-gold flex-shrink-0" />
                            <span className="text-white text-sm">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
);

const MarketOpportunitySlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-8">MARKET SIZING</h2>
            <div className="grid grid-cols-3 gap-8 mb-8">
                {[
                    { label: 'TAM', value: '$245B', desc: 'Global Cybersecurity', detail: '12.6% CAGR through 2030', color: 'border-gray-500' },
                    { label: 'SAM', value: '$42B', desc: 'OT/IT Critical Infrastructure', detail: 'Energy, Healthcare, Manufacturing', color: 'border-oxot-blue' },
                    { label: 'SOM', value: '€500M', desc: '5-Year Target', detail: '150 enterprise clients × €3.3M avg', color: 'border-oxot-gold' }
                ].map((item, i) => (
                    <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.15 }} className={`p-6 bg-white/5 border-l-4 ${item.color} rounded-r-xl`}>
                        <div className="text-xs font-mono text-gray-500 mb-2">{item.label}</div>
                        <div className="text-4xl font-black text-white mb-2">{item.value}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                        <div className="text-xs text-gray-600 mt-2">{item.detail}</div>
                    </motion.div>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[
                    { region: 'North America', size: '$98B', growth: '11%' },
                    { region: 'Europe', size: '$67B', growth: '14%' },
                    { region: 'Asia-Pacific', size: '$52B', growth: '16%' },
                    { region: 'Latin America', size: '$12B', growth: '13%' }
                ].map((item, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                        <div className="text-lg font-bold text-white">{item.size}</div>
                        <div className="text-xs text-gray-500">{item.region}</div>
                        <div className="text-xs text-green-400 mt-1">+{item.growth} CAGR</div>
                    </div>
                ))}
            </div>
        </motion.div>
    </div>
);

const SWOTSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">SWOT ANALYSIS</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2"><CheckCircle size={18} /> STRENGTHS</h3>
                    <ul className="space-y-2">
                        {SWOT.strengths.map((s, i) => <li key={i} className="text-sm text-gray-300 flex items-start gap-2"><span className="text-green-400 mt-1">•</span>{s}</li>)}
                    </ul>
                </div>
                {/* Weaknesses */}
                <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2"><XCircle size={18} /> WEAKNESSES</h3>
                    <ul className="space-y-2">
                        {SWOT.weaknesses.map((w, i) => <li key={i} className="text-sm text-gray-300 flex items-start gap-2"><span className="text-red-400 mt-1">•</span>{w}</li>)}
                    </ul>
                </div>
                {/* Opportunities */}
                <div className="p-5 bg-oxot-blue/10 border border-oxot-blue/30 rounded-xl">
                    <h3 className="text-lg font-bold text-oxot-blue mb-3 flex items-center gap-2"><TrendingUp size={18} /> OPPORTUNITIES</h3>
                    <ul className="space-y-2">
                        {SWOT.opportunities.map((o, i) => <li key={i} className="text-sm text-gray-300 flex items-start gap-2"><span className="text-oxot-blue mt-1">•</span>{o}</li>)}
                    </ul>
                </div>
                {/* Threats */}
                <div className="p-5 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><Zap size={18} /> THREATS</h3>
                    <ul className="space-y-2">
                        {SWOT.threats.map((t, i) => <li key={i} className="text-sm text-gray-300 flex items-start gap-2"><span className="text-orange-400 mt-1">•</span>{t}</li>)}
                    </ul>
                </div>
            </div>
        </motion.div>
    </div>
);

const QuadrantSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">MAGIC QUADRANT POSITIONING</h2>
            <div className="relative w-full h-[400px] bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                {/* Axes */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 uppercase tracking-wider">Completeness of Vision →</div>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 uppercase tracking-wider">Ability to Execute →</div>

                {/* Quadrant labels */}
                <div className="absolute top-8 left-8 text-xs text-gray-600 uppercase">Niche Players</div>
                <div className="absolute top-8 right-8 text-xs text-gray-600 uppercase">Visionaries</div>
                <div className="absolute bottom-8 left-8 text-xs text-gray-600 uppercase">Challengers</div>
                <div className="absolute bottom-8 right-8 text-xs text-gray-600 uppercase">Leaders</div>

                {/* Grid lines */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />

                {/* Data points */}
                {QUADRANT_SERVICES.map((svc, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className={`absolute w-3 h-3 rounded-full cursor-pointer group ${svc.tier === 'Gold' ? 'bg-oxot-gold' :
                            svc.tier === 'Blue' ? 'bg-oxot-blue' :
                                svc.tier === 'Red' ? 'bg-oxot-red' :
                                    'bg-gray-400'
                            }`}
                        style={{ left: `${svc.x}%`, bottom: `${svc.y}%`, transform: 'translate(-50%, 50%)' }}
                    >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/20 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            {svc.name}
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="flex gap-6 mt-4 justify-center">
                <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-oxot-gold" /> Gold Team</div>
                <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-oxot-blue" /> Blue Team</div>
                <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-oxot-red" /> Red Team</div>
                <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-gray-400" /> Competitors</div>
            </div>
        </motion.div>
    </div>
);

const PortfolioSlide = () => {
    const goldServices = getServicesByTier('Gold');
    const blueServices = getServicesByTier('Blue');
    const redServices = getServicesByTier('Red');

    return (
        <div className="h-full flex flex-col justify-center px-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-3xl font-black text-white mb-6">SERVICE PORTFOLIO & THEORY</h2>
                <div className="grid grid-cols-3 gap-4">
                    {/* Gold */}
                    <div className="p-4 bg-oxot-gold/10 border border-oxot-gold/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3"><Crown size={18} className="text-oxot-gold" /><span className="font-bold text-oxot-gold">GOLD TEAM</span></div>
                        <div className="space-y-2">
                            {goldServices.map(s => (
                                <Link key={s.id} href={s.theoryLink || '#'} className="block p-2 bg-black/20 hover:bg-oxot-gold/20 border border-transparent hover:border-oxot-gold/30 rounded transition-all group">
                                    <div className="flex justify-between items-start">
                                        <div className="text-xs text-white font-medium group-hover:text-oxot-gold transition-colors">{s.name}</div>
                                        <ExternalLink size={10} className="text-gray-600 group-hover:text-oxot-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-[10px] text-oxot-gold/80 mt-1">€{(s.pricing.medium.min / 1000).toFixed(0)}K-{(s.pricing.medium.max / 1000).toFixed(0)}K</div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-oxot-gold/20 text-xs text-gray-500">Strategic Advisory • Psychometric • Governance</div>
                    </div>
                    {/* Blue */}
                    <div className="p-4 bg-oxot-blue/10 border border-oxot-blue/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3"><Shield size={18} className="text-oxot-blue" /><span className="font-bold text-oxot-blue">BLUE TEAM</span></div>
                        <div className="space-y-2">
                            {blueServices.map(s => (
                                <Link key={s.id} href={s.theoryLink || '#'} className="block p-2 bg-black/20 hover:bg-oxot-blue/20 border border-transparent hover:border-oxot-blue/30 rounded transition-all group">
                                    <div className="flex justify-between items-start">
                                        <div className="text-xs text-white font-medium group-hover:text-oxot-blue transition-colors">{s.name}</div>
                                        <ExternalLink size={10} className="text-gray-600 group-hover:text-oxot-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-[10px] text-oxot-blue/80 mt-1">€{(s.pricing.medium.min / 1000).toFixed(0)}K-{(s.pricing.medium.max / 1000).toFixed(0)}K</div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-oxot-blue/20 text-xs text-gray-500">Detection • Response • Defense Automation</div>
                    </div>
                    {/* Red */}
                    <div className="p-4 bg-oxot-red/10 border border-oxot-red/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3"><Terminal size={18} className="text-oxot-red" /><span className="font-bold text-oxot-red">RED TEAM</span></div>
                        <div className="space-y-2">
                            {redServices.map(s => (
                                <Link key={s.id} href={s.theoryLink || '#'} className="block p-2 bg-black/20 hover:bg-oxot-red/20 border border-transparent hover:border-oxot-red/30 rounded transition-all group">
                                    <div className="flex justify-between items-start">
                                        <div className="text-xs text-white font-medium group-hover:text-oxot-red transition-colors">{s.name}</div>
                                        <ExternalLink size={10} className="text-gray-600 group-hover:text-oxot-red opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-[10px] text-oxot-red/80 mt-1">€{(s.pricing.medium.min / 1000).toFixed(0)}K-{(s.pricing.medium.max / 1000).toFixed(0)}K</div>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-oxot-red/20 text-xs text-gray-500">Offensive Security • Attack Simulation</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const CompetitiveSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">COMPETITIVE LANDSCAPE</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="p-3 text-left text-xs text-gray-500">CAPABILITY</th>
                            <th className="p-3 text-center text-xs text-oxot-gold">OXOT</th>
                            <th className="p-3 text-center text-xs text-gray-500">CrowdStrike</th>
                            <th className="p-3 text-center text-xs text-gray-500">Palo Alto</th>
                            <th className="p-3 text-center text-xs text-gray-500">Mandiant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { cap: 'On-Premise Deployment', oxot: true, cs: false, pa: 'partial', md: true },
                            { cap: 'Mathematical AI Foundations', oxot: true, cs: false, pa: false, md: false },
                            { cap: 'Psychometric Analysis', oxot: true, cs: false, pa: false, md: false },
                            { cap: 'Zero-Day Physics Detection', oxot: true, cs: false, pa: false, md: false },
                            { cap: 'Attack Path Prediction', oxot: true, cs: 'partial', pa: true, md: 'partial' },
                            { cap: 'Threat Intelligence', oxot: true, cs: true, pa: true, md: true },
                            { cap: 'Incident Response', oxot: true, cs: true, pa: true, md: true },
                            { cap: 'NIS2/IEC-62443 Focused', oxot: true, cs: 'partial', pa: 'partial', md: 'partial' }
                        ].map((row: any, i: number) => (
                            <tr key={i} className="border-b border-white/5">
                                <td className="p-3 text-sm text-white">{row.cap}</td>
                                <td className="p-3 text-center">{(row as any).oxot === true ? <CheckCircle size={16} className="text-green-400 mx-auto" /> : (row as any).oxot === 'partial' ? <Minus size={16} className="text-yellow-400 mx-auto" /> : <XCircle size={16} className="text-red-400/50 mx-auto" />}</td>
                                <td className="p-3 text-center">{(row as any).cs === true ? <CheckCircle size={16} className="text-green-400 mx-auto" /> : (row as any).cs === 'partial' ? <Minus size={16} className="text-yellow-400 mx-auto" /> : <XCircle size={16} className="text-red-400/50 mx-auto" />}</td>
                                <td className="p-3 text-center">{(row as any).pa === true ? <CheckCircle size={16} className="text-green-400 mx-auto" /> : (row as any).pa === 'partial' ? <Minus size={16} className="text-yellow-400 mx-auto" /> : <XCircle size={16} className="text-red-400/50 mx-auto" />}</td>
                                <td className="p-3 text-center">{(row as any).md === true ? <CheckCircle size={16} className="text-green-400 mx-auto" /> : (row as any).md === 'partial' ? <Minus size={16} className="text-yellow-400 mx-auto" /> : <XCircle size={16} className="text-red-400/50 mx-auto" />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 p-4 bg-oxot-gold/10 border border-oxot-gold/30 rounded-lg">
                <div className="text-sm text-oxot-gold font-bold mb-1">Key Differentiator</div>
                <div className="text-sm text-gray-300">Only solution combining mathematical AI foundations (McKenney-Lacan, GGNN), on-premise privacy, and integrated psychometric analysis for critical infrastructure.</div>
            </div>
        </motion.div>
    </div>
);

const PricingSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">REGIONAL PRICING STRATEGY</h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
                {Object.entries(REGIONAL_RATES).map(([key, rate]) => (
                    <div key={key} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="text-lg font-bold text-white mb-2">{rate.region}</div>
                        <div className="text-2xl font-black text-oxot-gold">{rate.currency}{rate.min}-{rate.max}</div>
                        <div className="text-xs text-gray-500">per hour consulting</div>
                        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
                            Multiplier: {regions[key]?.multiplier || 1}x base
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-sm font-bold text-white mb-2">SMB Tier</div>
                    <div className="text-oxot-gold font-mono">€40K - €150K/yr</div>
                    <div className="text-xs text-gray-500 mt-1">1-5 services, limited scope</div>
                </div>
                <div className="p-4 bg-oxot-gold/10 border border-oxot-gold/30 rounded-xl">
                    <div className="text-sm font-bold text-white mb-2">Mid-Market</div>
                    <div className="text-oxot-gold font-mono">€150K - €500K/yr</div>
                    <div className="text-xs text-gray-500 mt-1">5-10 services, full team</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-sm font-bold text-white mb-2">Enterprise</div>
                    <div className="text-oxot-gold font-mono">€500K - €2M/yr</div>
                    <div className="text-xs text-gray-500 mt-1">Full portfolio, dedicated team</div>
                </div>
            </div>
        </motion.div>
    </div>
);

const RevenueSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">REVENUE MODELS</h2>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Channel Mix</h3>
                    <div className="space-y-3">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white">Direct Sales</span>
                                <span className="text-oxot-gold font-mono">60%</span>
                            </div>
                            <div className="text-xs text-gray-500">Enterprise deals, €500K+ ACV</div>
                            <div className="text-xs text-green-400">100% margin</div>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white">Partner Channel</span>
                                <span className="text-oxot-gold font-mono">30%</span>
                            </div>
                            <div className="text-xs text-gray-500">Resellers, MSSPs, SI partners</div>
                            <div className="text-xs text-green-400">60-70% margin (30-40% partner)</div>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white">Self-Service API</span>
                                <span className="text-oxot-gold font-mono">10%</span>
                            </div>
                            <div className="text-xs text-gray-500">SMB, usage-based</div>
                            <div className="text-xs text-green-400">85% margin</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">ARR by Service Type</h3>
                    <div className="space-y-2">
                        {[
                            { name: 'Subscription Services', pct: 70, arr: '€175M', example: 'On-Prem Intel, Propagation Ctrl' },
                            { name: 'Project-Based', pct: 20, arr: '€50M', example: 'M&A Due Diligence, Red Team' },
                            { name: 'Usage/API', pct: 10, arr: '€25M', example: 'API calls, data feeds' }
                        ].map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-white">{item.name}</span>
                                    <span className="text-oxot-gold">{item.pct}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-oxot-gold" style={{ width: `${item.pct}%` }} />
                                </div>
                                <div className="text-xs text-gray-500">{item.example}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
);

const GTMSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">GO-TO-MARKET STRATEGY</h2>
            <div className="grid grid-cols-3 gap-6">
                {[
                    { phase: 'PHASE 1', title: 'PROVE', timeline: 'Q1-Q2 2025', color: 'oxot-gold', items: ['5 design partners', 'Blue Team P1 services only', 'EU market focus (NIS2)', '€250K pilot revenue'] },
                    { phase: 'PHASE 2', title: 'SCALE', timeline: 'Q3-Q4 2025', color: 'oxot-blue', items: ['15 customers', 'Full Gold/Blue portfolio', 'Partner channel launch', '€2.5M ARR target'] },
                    { phase: 'PHASE 3', title: 'EXPAND', timeline: '2026+', color: 'green-400', items: ['50+ customers', 'NA market entry', 'Red Team services', '€15M ARR target'] }
                ].map((phase, i) => (
                    <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.15 }} className={`p-6 bg-${phase.color}/10 border border-${phase.color}/30 rounded-xl`} style={{ backgroundColor: `var(--${phase.color}, rgba(212,164,24,0.1))`, borderColor: `var(--${phase.color}, rgba(212,164,24,0.3))` }}>
                        <div className={`text-xs font-mono text-${phase.color} mb-1`} style={{ color: phase.color === 'oxot-gold' ? '#D4A418' : phase.color === 'oxot-blue' ? '#0042D6' : '#22C55E' }}>{phase.phase}</div>
                        <div className="text-2xl font-black text-white mb-1">{phase.title}</div>
                        <div className="text-xs text-gray-500 mb-4">{phase.timeline}</div>
                        <ul className="space-y-2">
                            {phase.items.map((item, j) => (
                                <li key={j} className="text-sm text-gray-300 flex items-center gap-2">
                                    <ArrowRight size={12} className="text-gray-500" />{item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </div>
);

const FinancialsSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">5-YEAR ARR PROJECTIONS</h2>
            <div className="grid grid-cols-5 gap-4 mb-6">
                {['Y1', 'Y2', 'Y3', 'Y4', 'Y5'].map((year, i) => (
                    <div key={year} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                        <div className="text-xs text-gray-500 mb-2">{year}</div>
                        <div className="text-3xl font-black text-oxot-gold">€{ARR_SCENARIOS.base[`y${i + 1}` as keyof typeof ARR_SCENARIOS.base]}M</div>
                        <div className="text-xs text-gray-500 mt-2">
                            <span className="text-gray-600">Low: €{ARR_SCENARIOS.conservative[`y${i + 1}` as keyof typeof ARR_SCENARIOS.conservative]}M</span>
                        </div>
                        <div className="text-xs text-green-400">
                            High: €{ARR_SCENARIOS.aggressive[`y${i + 1}` as keyof typeof ARR_SCENARIOS.aggressive]}M
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-2xl font-black text-white">75%</div>
                    <div className="text-xs text-gray-500">Gross Margin Target</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-2xl font-black text-white">€45K</div>
                    <div className="text-xs text-gray-500">CAC Target</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-2xl font-black text-white">3.5x</div>
                    <div className="text-xs text-gray-500">LTV/CAC Ratio</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-2xl font-black text-white">18mo</div>
                    <div className="text-xs text-gray-500">Payback Period</div>
                </div>
            </div>
        </motion.div>
    </div>
);

const EnhancementsSlide = () => (
    <div className="h-full flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-black text-white mb-6">API ENHANCEMENTS</h2>
            <div className="grid grid-cols-5 gap-3">
                {tiers.map(tier => (
                    <div key={tier.id} className="flex flex-col gap-2 h-full">
                        <div className="p-3 rounded-xl border border-white/10 bg-white/5 h-[80px]" style={{ borderColor: tier.color }}>
                            <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: tier.color }}>
                                {tier.name.split(':')[0]}
                            </div>
                            <div className="text-[9px] text-gray-400 leading-tight">
                                {tier.description}
                            </div>
                        </div>
                        <div className="space-y-1.5 overflow-y-auto max-h-[50vh] pr-1 scrollbar-thin scrollbar-thumb-white/10">
                            {enhancements.filter(e => e.tier === tier.id).map(e => (
                                <Link
                                    key={e.id}
                                    href="/corporate/enhancements"
                                    className="block p-2 rounded bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group"
                                >
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className="text-[9px] font-mono text-gray-500 group-hover:text-white transition-colors">{e.id}</span>
                                        {e.status === 'COMPLETE' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]" />}
                                    </div>
                                    <div className="text-[10px] text-gray-300 font-medium leading-tight group-hover:text-white transition-colors">
                                        {e.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-between items-center px-2">
                <div className="text-xs text-gray-500">27 total enhancements across 5 strategic tiers</div>
                <Link href="/corporate/enhancements" className="text-xs text-oxot-gold hover:text-white transition-colors flex items-center gap-1">
                    View Full Catalog <ArrowRight size={12} />
                </Link>
            </div>
        </motion.div>
    </div>
);

const AsksSlide = () => (
    <div className="h-full flex flex-col items-center justify-center px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl text-center">
            <Image src="/Logos_OXOT_Gold_White/OXOT_GW_Dark.svg" alt="OXOT" width={200} height={70} className="mx-auto mb-8" />
            <h2 className="text-4xl font-black text-white mb-8">STRATEGIC DECISIONS REQUIRED</h2>
            <div className="grid grid-cols-2 gap-4 text-left mb-8">
                {[
                    { num: '1', ask: 'Approve Blue Team P1 launch roadmap for Q1 2025' },
                    { num: '2', ask: 'Authorize €500K pilot program with 5 design partners' },
                    { num: '3', ask: 'Confirm EU-first market entry strategy (NIS2 focus)' },
                    { num: '4', ask: 'Approve partner channel terms (30-40% margin)' },
                    { num: '5', ask: 'Greenlight 3 senior AE hires for direct sales' },
                    { num: '6', ask: 'Set €2.5M ARR target for end of 2025' }
                ].map((item, i) => (
                    <motion.div key={i} initial={{ x: i % 2 === 0 ? -20 : 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex gap-3 p-3 bg-oxot-gold/10 border border-oxot-gold/30 rounded-lg">
                        <span className="text-xl font-black text-oxot-gold">{item.num}</span>
                        <span className="text-white text-sm">{item.ask}</span>
                    </motion.div>
                ))}
            </div>
            <div className="text-sm text-gray-500 font-mono">Next Step: Schedule 60-min decision session with leadership team</div>
        </motion.div>
    </div>
);

// ============== MAIN COMPONENT ==============

export default function BusinessPitchDeck() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1)), []);
    const prevSlide = useCallback(() => setCurrentSlide(prev => Math.max(prev - 1, 0)), []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    const slide = slides[currentSlide];

    const renderSlide = () => {
        switch (slide.type) {
            case 'title': return <TitleSlide />;
            case 'executive': return <ExecutiveSummarySlide />;
            case 'market': return <MarketOpportunitySlide />;
            case 'swot': return <SWOTSlide />;
            case 'quadrant': return <QuadrantSlide />;
            case 'portfolio': return <PortfolioSlide />;
            case 'enhancements': return <EnhancementsSlide />;
            case 'competitive': return <CompetitiveSlide />;
            case 'pricing': return <PricingSlide />;
            case 'revenue': return <RevenueSlide />;
            case 'gtm': return <GTMSlide />;
            case 'financials': return <FinancialsSlide />;
            case 'asks': return <AsksSlide />;
            default: return null;
        }
    };

    return (
        <div className="h-screen bg-black text-white overflow-hidden relative">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
                <motion.div className="h-full bg-oxot-gold" initial={{ width: 0 }} animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>

            {/* Slide content */}
            <AnimatePresence mode="wait">
                <motion.div key={currentSlide} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="h-full">
                    {renderSlide()}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
                <button onClick={prevSlide} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-30" disabled={currentSlide === 0}>
                    <ChevronLeft size={20} />
                </button>
                <div className="flex gap-1.5">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => setCurrentSlide(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-oxot-gold scale-150' : 'bg-white/30 hover:bg-white/50'}`} />
                    ))}
                </div>
                <button onClick={nextSlide} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-30" disabled={currentSlide === slides.length - 1}>
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-8 right-8 text-xs font-mono text-gray-600 z-50">
                {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>

            {/* Controls hint */}
            <div className="absolute bottom-8 left-8 text-xs font-mono text-gray-600 z-50">← → or Space</div>

            {/* Watermark */}
            <div className="absolute top-4 right-4 opacity-20 z-50">
                <Image src="/Logos_OXOT_Gold_White/OX_LOGO_alone_Dark.svg" alt="" width={30} height={30} />
            </div>
        </div>
    );
}
