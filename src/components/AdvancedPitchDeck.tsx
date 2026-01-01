'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, Target, TrendingUp, BarChart3,
    Users, ArrowRight, Zap, Globe, Shield, Crown, Terminal,
    CheckCircle, XCircle, Minus, DollarSign, Building, Briefcase,
    Map, PieChart, Activity, Award, Rocket, Handshake, ExternalLink,
    Play, Pause, Sliders, Layers, Database, Brain, Sparkles, Lock,
    Network, Server, Cpu
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { services, regions, getServicesByTier, marketSummary, ServiceData } from '@/data/services-portfolio';
import { enhancements, tiers, EnhancementTier } from '@/data/enhancements-index';
import { OXOTLogo } from './branding/OXOTLogo';

// --- DATA & CONSTANTS ---

const SLIDE_VARIANTS = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
    })
};

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const SWIPE_POWER = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const MARKET_STATS = [
    { label: 'AI Cyber Market', value: '$47.8B', growth: '+25.3%', desc: 'Global Market 2025' },
    { label: 'Europe OT Security', value: '$5.8B', growth: '+9.5%', desc: 'Driven by NIS2/IEC 62443' },
    { label: 'Due Diligence', value: '$16.7B', growth: '+7.4%', desc: 'M&A Advisory Market (2034)' },
];

const COMPETITOR_MATRIX = [
    { name: 'Thales / Airbus', type: 'Legacy Sovereign', focus: 'Hardware/Encryption', gap: 'Bolt-on AI, Non-Native' },
    { name: 'Darktrace', type: 'Challenger', focus: 'Network AI', gap: 'No Physics/Psychometrics' },
    { name: 'Palo Alto', type: 'Leader', focus: 'Platform', gap: 'Not OT-Native' },
    { name: 'Big 4 Audit', type: 'Service', focus: 'Compliance', gap: 'Manual Checkboxes' },
];

const COMPETITOR_DATA = [
    {
        category: "Legacy Sovereign",
        examples: "Thales, Airbus, Atos",
        icon: Building,
        desc: "Trusted but archaic. They rely on 'bolt-on' AI analysis significantly lagging behind zero-day threats. Their core DNA is hardware and consulting, not cognitive autonomy.",
        weakness: "Reactive & Slow"
    },
    {
        category: "Global Platforms",
        examples: "Palo Alto, Microsoft",
        icon: Globe,
        desc: "Massive scale but generic. They lack the specific OT/ICS physics models required for NIS2 compliance in critical infrastructure.",
        weakness: "Broad but Shallow"
    },
    {
        category: "AI Challengers",
        examples: "Darktrace, SentinelOne",
        icon: Brain,
        desc: "AI-native but limited scope. They focus on network packets or endpoints, missing the proprietary 'Signal Physics' and 'Psychometrics' of AEON.",
        weakness: "High False Positives"
    }
];

// --- SUB-COMPONENTS ---

const SlideContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`h-full w-full max-w-[1800px] mx-auto px-12 py-8 flex flex-col justify-center relative ${className}`}>
        {children}
    </div>
);

const SlideHeader = ({ title, subtitle, accent = "gold" }: { title: string, subtitle: string, accent?: "gold" | "blue" | "red" }) => (
    <div className="mb-8 border-b border-white/10 pb-4 shrink-0">
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs font-mono tracking-[0.2em] uppercase mb-2 ${accent === 'gold' ? 'text-oxot-gold' : accent === 'blue' ? 'text-oxot-blue' : 'text-oxot-red'
                }`}
        >
            {subtitle}
        </motion.div>
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
        >
            {title}
        </motion.h2>
    </div>
);

// --- SLIDES ---

const IntroSlide = () => (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-oxot-gold/20 via-oxot-blue/10 to-transparent rounded-full blur-[100px] animate-pulse" />
        </div>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative z-10 mb-12">
            <OXOTLogo size="xl" animated />
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                SOVEREIGN <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-gold to-amber-200">INTELLIGENCE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Strategic Market Assessment & Portfolio Composition <br />
                <span className="text-oxot-blue font-mono text-sm mt-4 block">CONFIDENTIAL // INTERNAL LEADERSHIP REVIEW</span>
            </p>
        </motion.div>
    </div>
);

const MarketSlide = () => (
    <SlideContainer>
        <SlideHeader title="THE MARKET MOMENT" subtitle="Why Now?" accent="blue" />

        <div className="grid grid-cols-12 gap-8 h-full max-h-[70vh] items-center">
            {/* Left Col: The Narrative */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">The Perfect Storm</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Three converging forces have created a unique 18-month window. With the <strong>Global AI in Cybersecurity market hitting $47.8B</strong> (25% CAGR) and Europe's OT security demand surging due to regulation, the time to capture the sovereign market is now.
                    </p>
                </div>

                <div className="space-y-4">
                    {[
                        { title: 'NIS2 & IEC 62443', desc: 'Mandatory EU compliance forces €100B+ spend on accountability.', icon: Shield, color: 'text-oxot-gold' },
                        { title: 'OT/IT Convergence', desc: 'Air gaps are gone. Industrial systems are now exposed.', icon: Network, color: 'text-oxot-blue' },
                        { title: 'AI-Native Warfare', desc: 'Traditional tools cannot catch AI-generated attacks.', icon: Brain, color: 'text-oxot-red' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-4 hover:bg-white/10 transition-colors"
                        >
                            <div className={`p-2 rounded-lg bg-black/50 ${item.color}`}>
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{item.title}</h4>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right Col: The Data */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-4 h-full content-center">
                {MARKET_STATS.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className={`${i === 0 ? 'col-span-2 bg-gradient-to-br from-oxot-blue/20 to-black' : 'bg-white/5'} p-8 rounded-2xl border border-white/10 flex flex-col justify-between`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-gray-400 text-sm font-mono uppercase">{stat.desc}</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${i === 0 ? 'bg-oxot-blue text-white' : 'bg-white/10 text-green-400'}`}>{stat.growth}</span>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
                            <div className="text-5xl md:text-6xl font-black text-white">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}

                {/* Competitor Mini-Matrix */}
                <div className="col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h4 className="text-gray-400 text-xs font-mono uppercase mb-4">Competitive Gap Analysis</h4>
                    <div className="grid grid-cols-4 gap-4">
                        {COMPETITOR_MATRIX.map((comp, i) => (
                            <div key={i} className="text-center">
                                <div className="text-white font-bold text-sm mb-1">{comp.name}</div>
                                <div className="text-[10px] text-red-400 bg-red-400/10 py-1 px-2 rounded border border-red-400/20">{comp.gap}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </SlideContainer>
);

const CompetitionSlide = () => (
    <SlideContainer>
        <SlideHeader title="THE SOVEREIGN GAP" subtitle="Competitive Landscape" accent="red" />

        <div className="grid grid-cols-12 gap-8 h-full items-center">
            {/* Context */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
                <h3 className="text-3xl font-black text-white">Why We Win</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                    The market is polarized between archaic "Sovereign" hardware giants and generic US-based cloud platforms.
                </p>
                <p className="text-white font-bold text-xl border-l-4 border-oxot-gold pl-4">
                    OXOT is the only <span className="text-oxot-blue">AI-Native</span> solution built specifically for <span className="text-oxot-gold">Sovereign Critical Infrastructure</span>.
                </p>

                <div className="mt-8 p-6 bg-gradient-to-r from-oxot-blue/20 to-transparent rounded-xl border border-oxot-blue/30">
                    <div className="text-xs font-mono text-oxot-blue uppercase mb-2">Our Advantage</div>
                    <div className="text-2xl font-black text-white">Full Cognitive Autonomy</div>
                    <div className="text-sm text-gray-400 mt-2">We don't just alert. We fix.</div>
                </div>
            </div>

            {/* Comparison Cards */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 gap-4">
                {COMPETITOR_DATA.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-xl border border-white/10 bg-white/5 flex items-center gap-6 group hover:bg-white/10 transition-colors"
                    >
                        <div className="p-4 rounded-full bg-black/50 text-white group-hover:text-oxot-gold transition-colors">
                            <item.icon size={32} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-lg font-bold text-white">{item.category}</h4>
                                <span className="text-xs font-mono text-gray-500 uppercase">{item.examples}</span>
                            </div>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                        <div className="w-px h-12 bg-white/10 mx-2" />
                        <div className="w-32 text-right">
                            <div className="text-[10px] text-gray-500 uppercase font-bold">Weakness</div>
                            <div className="text-red-400 font-bold text-sm">{item.weakness}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </SlideContainer>
);

const PortfolioSlide = () => {
    const [activeTier, setActiveTier] = useState<'Gold' | 'Blue' | 'Red'>('Gold');
    const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

    return (
        <SlideContainer>
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4 shrink-0">
                <div>
                    <div className="text-xs font-mono tracking-[0.2em] uppercase text-oxot-gold mb-2">Capabilities</div>
                    <h2 className="text-4xl font-black text-white">INTEGRATED PORTFOLIO</h2>
                </div>
                <div className="flex gap-2">
                    {['Gold', 'Blue', 'Red'].map((tier) => (
                        <button
                            key={tier}
                            onClick={() => { setActiveTier(tier as any); setSelectedService(null); }}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeTier === tier
                                ? `bg-oxot-${tier.toLowerCase()} text-white shadow-lg shadow-oxot-${tier.toLowerCase()}/20`
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {tier} TEAM
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 h-full max-h-[70vh] overflow-hidden">
                {/* Service List */}
                <div className="col-span-12 lg:col-span-4 space-y-3 overflow-y-auto pr-2 max-h-full scrollbar-thin">
                    {getServicesByTier(activeTier).map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setSelectedService(s)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all group ${selectedService?.id === s.id
                                ? `bg-oxot-${activeTier.toLowerCase()}/20 border-oxot-${activeTier.toLowerCase()} shadow-lg`
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className={`text-xs font-mono ${selectedService?.id === s.id ? 'text-white' : 'text-gray-500'}`}>{s.priority} // {s.research}</span>
                                {s.disruptionLevel === 'Disruptor' && <Sparkles size={12} className="text-amber-400" />}
                            </div>
                            <h4 className={`font-bold transition-colors ${selectedService?.id === s.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{s.name}</h4>
                        </motion.div>
                    ))}
                </div>

                {/* Service Detail View */}
                <div className="col-span-12 lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col h-full">
                    <AnimatePresence mode="wait">
                        {selectedService ? (
                            <motion.div
                                key={selectedService.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-6 shrink-0">
                                    <div>
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 bg-oxot-${selectedService.tierColor === '#FFD700' ? 'gold' : selectedService.tierColor === '#0042D6' ? 'blue' : 'red'}/20 text-oxot-${selectedService.tier === 'Gold' ? 'gold' : selectedService.tier === 'Blue' ? 'blue' : 'red'}`}>
                                            {selectedService.tier} Team // {selectedService.priority}
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-2">{selectedService.name}</h3>
                                        <p className="text-xl text-gray-300 font-light">{selectedService.elevatorPitch}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 uppercase font-mono">Pricing (Ent)</div>
                                        <div className="text-2xl font-black text-white">€{(selectedService.pricing.enterprise.min / 1000).toFixed(0)}k - {(selectedService.pricing.enterprise.max / 1000).toFixed(0)}k</div>
                                        <div className="text-xs text-gray-400">{selectedService.pricing.model}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-8 overflow-y-auto flex-1 pr-1 scrollbar-thin">
                                    <div className="space-y-4">
                                        <h5 className="text-white font-bold flex items-center gap-2 sticky top-0 bg-[#0f0f0f] py-2 z-10"><Target size={16} /> Business Value</h5>
                                        <p className="text-sm text-gray-400 leading-relaxed">{selectedService.details?.business}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h5 className="text-white font-bold flex items-center gap-2 sticky top-0 bg-[#0f0f0f] py-2 z-10"><Cpu size={16} /> Technical Theory</h5>
                                        <p className="text-sm text-gray-400 leading-relaxed">{selectedService.details?.technical}</p>
                                    </div>
                                </div>

                                <div className="mt-auto grid grid-cols-3 gap-4 shrink-0">
                                    {selectedService.financialImpact.slice(0, 3).map((impact, i) => (
                                        <div key={i} className="p-4 bg-black/40 rounded-lg border border-white/5">
                                            <div className="text-xs text-gray-500 mb-1">{impact.metric}</div>
                                            <div className="text-lg font-bold text-green-400">{impact.improvement}</div>
                                            <div className="text-xs text-gray-600 mt-1">From {impact.without} to {impact.with}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                <div className="p-6 rounded-full bg-white/5 mb-4"><Layers size={48} /></div>
                                <p>Select a service to view strategic details</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </SlideContainer>
    );
};

const EnhancementsSlide = () => {
    const [hoveredTier, setHoveredTier] = useState<string | null>(null);

    return (
        <SlideContainer>
            <SlideHeader title="VALUE MULTIPLIERS" subtitle="27 API Enhancements" accent="gold" />

            <div className="relative h-[60vh] flex items-center justify-center">
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-black border border-white/10 z-10 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                    <div className="text-center">
                        <div className="text-4xl font-black text-white">API</div>
                        <div className="text-xs text-oxot-gold font-mono tracking-wider">CORE ENGINE</div>
                    </div>
                </div>

                {/* Orbital Tiers */}
                <div className="w-full h-full grid grid-cols-5 gap-4 relative z-20 items-center">
                    {tiers.map((tier, i) => {
                        const tierEnhancements = enhancements.filter(e => e.tier === tier.id);
                        const isHovered = hoveredTier === tier.id;

                        return (
                            <div
                                key={tier.id}
                                className={`flex flex-col transition-all duration-300 h-[80%] ${hoveredTier && !isHovered ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}
                                onMouseEnter={() => setHoveredTier(tier.id)}
                                onMouseLeave={() => setHoveredTier(null)}
                            >
                                <div
                                    className="p-4 rounded-xl border mb-4 text-center transition-all bg-black/40 backdrop-blur-sm shrink-0"
                                    style={{ borderColor: tier.color, boxShadow: isHovered ? `0 0 20px -5px ${tier.color}` : 'none' }}
                                >
                                    <div className="text-xs font-bold uppercase mb-1" style={{ color: tier.color }}>{tier.name.split(':')[0]}</div>
                                    <div className="text-[10px] text-gray-400 h-8 overflow-hidden">{tier.name.split(':')[1]}</div>
                                </div>

                                <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-none hover:scrollbar-thin">
                                    {tierEnhancements.map((e) => (
                                        <div
                                            key={e.id}
                                            className="p-2 rounded bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-crosshair group"
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[9px] font-mono text-gray-500">{e.id}</span>
                                                <div className={`w-1 h-1 rounded-full ${e.status === 'COMPLETE' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                            </div>
                                            <div className="text-[10px] text-gray-300 font-medium leading-tight group-hover:text-white">{e.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-center mt-8 text-gray-500 text-sm font-mono shrink-0">
                23 Completed / 2 In-Progress / 2 Planned
            </div>
        </SlideContainer>
    );
};

const FinancialComposerSlide = () => {
    const [strategy, setStrategy] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
    const [focus, setFocus] = useState<'product' | 'service'>('service');

    // Realistic growth projections by year (€M ARR)
    const yearlyProjections = {
        conservative: [0.8, 2.5, 6.0, 10.5, 15.0],
        balanced: [1.2, 4.5, 12.0, 20.5, 28.0],
        aggressive: [2.0, 8.0, 22.0, 38.0, 55.0]
    };

    const metrics = {
        conservative: { margin: 45, ltv: 2.8, cac: 9, burn: 1.2 },
        balanced: { margin: 60, ltv: 3.2, cac: 12, burn: 2.5 },
        aggressive: { margin: 75, ltv: 4.5, cac: 18, burn: 4.8 }
    };

    const current = metrics[strategy];
    const yearData = yearlyProjections[strategy];
    const maxARR = Math.max(...yearlyProjections.aggressive);

    return (
        <SlideContainer>
            <SlideHeader title="FINANCIAL COMPOSER" subtitle="Strategic Modeling" accent="red" />

            <div className="grid grid-cols-12 gap-8 h-full items-center">
                {/* Controls */}
                <div className="col-span-12 lg:col-span-4 space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10 h-fit">
                    <div>
                        <label className="text-sm text-gray-400 font-bold mb-3 block flex items-center gap-2"><Rocket size={16} /> Growth Strategy</label>
                        <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
                            {['conservative', 'balanced', 'aggressive'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStrategy(s as any)}
                                    className={`flex-1 py-2 text-xs font-bold rounded capitalize transition-all ${strategy === s ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-400 font-bold mb-3 block flex items-center gap-2"><Briefcase size={16} /> Revenue Mix</label>
                        <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
                            {['product', 'service'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFocus(f as any)}
                                    className={`flex-1 py-2 text-xs font-bold rounded capitalize transition-all ${focus === f ? 'bg-oxot-blue text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    {f === 'product' ? 'SaaS / API' : 'Consulting'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                        <div className="p-3 bg-black/30 rounded-lg">
                            <div className="text-[10px] text-gray-500 uppercase">CAC Payback</div>
                            <div className="text-lg font-black text-white">{current.cac} mo</div>
                        </div>
                        <div className="p-3 bg-black/30 rounded-lg">
                            <div className="text-[10px] text-gray-500 uppercase">Monthly Burn</div>
                            <div className="text-lg font-black text-oxot-red">€{current.burn}M</div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 h-full max-h-[65vh] justify-center">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-5 bg-gradient-to-br from-oxot-gold/20 to-black rounded-2xl border border-oxot-gold/30">
                            <div className="text-xs text-gray-400 mb-1 font-mono uppercase">Y5 ARR Target</div>
                            <div className="text-4xl font-black text-oxot-gold">€{yearData[4]}M</div>
                            <div className="text-xs text-green-400 mt-1 flex items-center gap-1"><TrendingUp size={12} /> {strategy === 'aggressive' ? '3.6x' : strategy === 'balanced' ? '2.3x' : '1.5x'} baseline</div>
                        </div>
                        <div className="p-5 bg-black/40 rounded-2xl border border-white/10">
                            <div className="text-xs text-gray-400 mb-1 font-mono uppercase">Gross Margin</div>
                            <div className="text-4xl font-black text-white">{focus === 'product' ? current.margin + 15 : current.margin}%</div>
                        </div>
                        <div className="p-5 bg-black/40 rounded-2xl border border-white/10">
                            <div className="text-xs text-gray-400 mb-1 font-mono uppercase">LTV:CAC</div>
                            <div className="text-4xl font-black text-white">{focus === 'product' ? current.ltv + 1.3 : current.ltv}x</div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="flex-1 bg-black/30 rounded-2xl border border-white/10 p-6 relative min-h-[250px]">
                        <div className="absolute top-4 left-6 text-xs font-mono text-gray-500 uppercase">ARR Growth Trajectory (€M)</div>

                        {/* Y-Axis Labels */}
                        <div className="absolute left-2 top-12 bottom-12 flex flex-col justify-between text-[10px] text-gray-600 font-mono">
                            <span>€{maxARR}M</span>
                            <span>€{(maxARR / 2).toFixed(0)}M</span>
                            <span>€0</span>
                        </div>

                        {/* Chart Area */}
                        <div className="ml-10 h-full pt-8 pb-2 flex items-end justify-around gap-4">
                            {yearData.map((arr, i) => {
                                const heightPercent = (arr / maxARR) * 100;
                                const isHighlight = i === 4; // Year 5
                                return (
                                    <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: `${heightPercent}%`, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                            className={`w-full max-w-[60px] rounded-t-lg relative group cursor-pointer ${isHighlight
                                                ? 'bg-gradient-to-t from-oxot-gold/60 to-oxot-gold border border-oxot-gold'
                                                : 'bg-gradient-to-t from-oxot-blue/40 to-oxot-blue/70 border border-oxot-blue/50'
                                                }`}
                                        >
                                            {/* Value Label on Hover */}
                                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                                                €{arr}M
                                            </div>
                                            {/* Always visible value inside bar for larger bars */}
                                            {heightPercent > 30 && (
                                                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                                                    €{arr}M
                                                </div>
                                            )}
                                        </motion.div>
                                        <div className={`text-xs font-mono ${isHighlight ? 'text-oxot-gold font-bold' : 'text-gray-500'}`}>
                                            Y{i + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Strategy Description */}
                    <div className="text-center text-sm text-gray-400 font-mono">
                        {strategy === 'conservative' && 'Low burn, steady growth. Optimal for bootstrapped or capital-efficient models.'}
                        {strategy === 'balanced' && 'Moderate investment with strong unit economics. Ideal for Series A trajectory.'}
                        {strategy === 'aggressive' && 'High burn, hypergrowth. Requires significant capital but captures market quickly.'}
                    </div>
                </div>
            </div>
        </SlideContainer>
    );
};


const DecisionSlide = () => (
    <div className="h-full flex flex-col items-center justify-center px-16 relative">
        <OXOTLogo size="lg" />
        <h2 className="text-5xl font-black text-white mt-8 mb-12">DECISION MATRIX</h2>

        <div className="grid grid-cols-3 gap-6 w-full max-w-6xl text-left">
            {[
                { title: 'Authorize Q1 Launch', desc: 'Approve Blue Team P1 services for immediate GTM.', impact: '€250k Launch Rev' },
                { title: 'Approve Partner Program', desc: 'Authorize 30-40% margin channel strategy.', impact: 'Scale Multiplier' },
                { title: 'Confirm EU First Focus', desc: 'Target NIS2 compliance wave in Europe.', impact: 'Market Fit' }
            ].map((d, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-white/5 border border-white/10 hover:border-oxot-gold hover:bg-oxot-gold/10 rounded-2xl transition-all cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="bg-black/40 p-3 rounded-lg text-white group-hover:text-oxot-gold transition-colors font-black text-xl">0{i + 1}</div>
                        <CheckCircle className="text-gray-600 group-hover:text-oxot-gold transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{d.title}</h3>
                    <p className="text-gray-400 mb-6">{d.desc}</p>
                    <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                        <span className="text-xs font-mono text-gray-500">IMPACT</span>
                        <span className="text-sm font-bold text-white">{d.impact}</span>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-16 text-gray-500 font-mono text-sm">
            AEON CYBER DIGITAL TWIN // CORPORATE STRATEGY 2025
        </div>
    </div>
);

// --- MAIN WRAPPER ---

export default function AdvancedPitchDeck() {
    const [[slideIndex, direction], setPage] = useState([0, 0]);

    // Slide registry
    const slides = [
        IntroSlide,
        MarketSlide,
        CompetitionSlide,
        PortfolioSlide,
        EnhancementsSlide,
        FinancialComposerSlide,
        DecisionSlide
    ];

    const CurrentSlide = slides[slideIndex];

    const paginate = (newDirection: number) => {
        const nextIndex = slideIndex + newDirection;
        if (nextIndex >= 0 && nextIndex < slides.length) {
            setPage([nextIndex, newDirection]);
        }
    };

    // Keyboard nav
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') paginate(1);
            if (e.key === 'ArrowLeft') paginate(-1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slideIndex]);

    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden relative">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-50 pointer-events-none">
                <div className="flex items-center gap-4">
                    <span className="text-oxot-gold font-black tracking-widest text-lg">OXOT</span>
                    <span className="h-4 w-px bg-white/20" />
                    <span className="text-xs text-gray-500 font-mono uppercase">Strategic Assessment</span>
                </div>
                <div className="text-xs font-mono text-gray-600 pointer-events-auto">
                    SLIDE {slideIndex + 1} / {slides.length}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="h-full w-full pt-16 pb-20 relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={slideIndex}
                        custom={direction}
                        variants={SLIDE_VARIANTS}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = SWIPE_POWER(offset.x, velocity.x);

                            if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
                                paginate(1);
                            } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
                                paginate(-1);
                            }
                        }}
                        className="h-full w-full absolute top-0 left-0"
                    >
                        <CurrentSlide />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-center gap-8 z-50 bg-gradient-to-t from-black via-black/80 to-transparent">
                <button
                    onClick={() => paginate(-1)}
                    disabled={slideIndex === 0}
                    className="p-3 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all z-50"
                >
                    <ChevronLeft />
                </button>

                <div className="flex gap-2 z-50">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const dir = i > slideIndex ? 1 : -1;
                                setPage([i, dir]);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? 'w-8 bg-oxot-gold' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => paginate(1)}
                    disabled={slideIndex === slides.length - 1}
                    className="p-3 rounded-full hover:bg-white/10 disabled:opacity-20 transition-all z-50"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
