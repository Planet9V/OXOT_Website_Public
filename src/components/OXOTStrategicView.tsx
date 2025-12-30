'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Brain, Shield, TrendingUp, Users, Zap, Target,
    BarChart3, Clock, ChevronRight, Sparkles, Building2,
    Lock, Globe, DollarSign, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { BackgroundEffect } from './BackgroundEffect';
import ContactFormCTA from './ContactFormCTA';

import { services, marketSummary, getPriorityServices } from '@/data/services-portfolio';
import { expertPersonas, strategicConsensus } from '@/data/expert-personas';
import { enhancementStats, tiers } from '@/data/enhancements-index';

export default function OXOTStrategicView() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const [activePersona, setActivePersona] = useState(0);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-oxot-gold/30 text-slate-300">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-15 filter grayscale contrast-125">
                <BackgroundEffect />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-oxot-gold via-oxot-gold-light to-white origin-left z-50"
                style={{ scaleX }}
            />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 pb-40">

                {/* Hero Section - Pitch Deck Opening */}
                <HeroSection />

                {/* Value Proposition Grid */}
                <div className="mt-32">
                    <ValuePropositionGrid />
                </div>

                {/* Market Opportunity */}
                <div className="mt-32">
                    <MarketOpportunity />
                </div>

                {/* Expert Persona Analysis Carousel */}
                <div className="mt-32">
                    <ExpertAnalysisSection
                        personas={expertPersonas}
                        activePersona={activePersona}
                        setActivePersona={setActivePersona}
                    />
                </div>

                {/* Service Tier Overview */}
                <div className="mt-32">
                    <ServiceTierOverview />
                </div>

                {/* Priority Services Spotlight */}
                <div className="mt-32">
                    <PriorityServicesSpotlight />
                </div>

                {/* Enhancements Preview */}
                <div className="mt-32">
                    <EnhancementsPreview />
                </div>

                {/* Strategic Consensus */}
                <div className="mt-32">
                    <StrategicConsensusSection />
                </div>

                {/* Navigation Links */}
                <div className="mt-32">
                    <NavigationLinks />
                </div>

                {/* CTA */}
                <div className="mt-40">
                    <ContactFormCTA
                        variant="gold"
                        headline="Ready to Transform Your Security Posture?"
                        subheadline="OXOT's AEON Cyber Digital Twin provides predictive threat intelligence that anticipates attacks before they happen."
                        serviceOptions={[
                            { value: 'pilot', label: '90-Day Proof of Value Pilot', color: 'cyan' },
                            { value: 'assessment', label: 'Strategic Portfolio Assessment', color: 'yellow' },
                            { value: 'briefing', label: 'Executive Briefing', color: 'red' }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

// ==================== SUB-COMPONENTS ====================

const HeroSection = () => {
    return (
        <section className="min-h-[85vh] flex flex-col justify-center relative">
            <div className="max-w-5xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-oxot-gold/10 border border-oxot-gold/30 rounded-full text-oxot-gold text-xs font-mono tracking-[0.2em] mb-8 uppercase">
                    <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse" />
                    OXOT Strategic Portfolio 2025
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-12"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-oxot-gold to-white">Cyber Psychohistory</span><br />
                    <span className="text-white">Predict. Prevent. Protect.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12"
                >
                    The AEON Cyber Digital Twin platform delivers predictive threat prevention
                    using breakthrough mathematical models that forecast security events
                    <span className="text-oxot-gold font-semibold"> 90 days in advance</span>.
                </motion.p>

                <div className="grid md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
                    <StatBlock
                        value="€42B+"
                        label="Total Addressable Market"
                        color="text-oxot-gold"
                    />
                    <StatBlock
                        value="13"
                        label="Production-Ready Services"
                        color="text-blue-400"
                    />
                    <StatBlock
                        value="94%"
                        label="Digital Twin Completion"
                        color="text-oxot-blue"
                    />
                    <StatBlock
                        value="3-5yr"
                        label="Sustainable Moat"
                        color="text-oxot-blue-light"
                    />
                </div>
            </div>
        </section>
    );
};

const StatBlock = ({ value, label, color }: { value: string; label: string; color: string }) => (
    <div className="space-y-2 relative group">
        <div className={`text-4xl font-black ${color} group-hover:scale-105 transition-transform`}>
            {value}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed font-light uppercase tracking-wide">
            {label}
        </p>
    </div>
);

const ValuePropositionGrid = () => {
    const props = [
        {
            icon: Brain,
            title: 'Cyber Psychohistory',
            description: 'Mathematical prediction of security events using organizational behavior patterns—a paradigm shift from reactive to predictive security.',
            color: 'text-oxot-gold',
            bgColor: 'bg-oxot-gold/10',
            borderColor: 'border-oxot-gold/30'
        },
        {
            icon: Shield,
            title: 'Complete Digital Twin',
            description: 'Technical, Organizational, Attacker, and Event twins working in concert—94% complete with the Lacanian framework for explaining resource misallocation.',
            color: 'text-oxot-blue',
            bgColor: 'bg-oxot-blue/10',
            borderColor: 'border-oxot-blue/30'
        },
        {
            icon: Zap,
            title: '8-Second Containment',
            description: 'Neural physics propagation control stops ransomware in 8 seconds, not 45 minutes—using epidemic math to isolate super-spreader machines.',
            color: 'text-oxot-gold',
            bgColor: 'bg-oxot-gold/10',
            borderColor: 'border-oxot-gold/30'
        },
        {
            icon: Lock,
            title: 'On-Premise First',
            description: 'Enterprise-grade AI that never sends your data outside your network—because privacy isn\'t optional for critical infrastructure.',
            color: 'text-oxot-blue-light',
            bgColor: 'bg-oxot-blue/10',
            borderColor: 'border-oxot-blue/30'
        }
    ];

    return (
        <section>
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                Strategic Differentiators
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-12">
                Why AEON Wins
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {props.map((prop, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`p-8 rounded-2xl ${prop.bgColor} border ${prop.borderColor} hover:border-opacity-60 transition-all group`}
                    >
                        <prop.icon className={`w-10 h-10 ${prop.color} mb-6`} />
                        <h3 className="text-xl font-bold text-white mb-3">{prop.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{prop.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const MarketOpportunity = () => {
    return (
        <section>
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                Market Analysis
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-12">
                A Category-Defining Opportunity
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* TAM/SAM/SOM Visual */}
                <div className="relative h-[400px] flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-oxot-gold/10 to-oxot-gold/5 border border-oxot-gold/20 flex flex-col items-center justify-start pt-2"
                    >
                        <div className="text-center">
                            <div className="text-3xl font-black text-oxot-gold">€42B</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">TAM</div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-oxot-blue/20 to-oxot-blue/10 border border-oxot-blue/30 flex flex-col items-center justify-start pt-3"
                    >
                        <div className="text-center">
                            <div className="text-2xl font-black text-oxot-blue">€10B</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">SAM</div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-oxot-blue-light/30 to-oxot-blue-light/20 border border-oxot-blue-light/40 flex flex-col items-center justify-center p-2 backdrop-blur-sm"
                    >
                        <div className="text-center">
                            <div className="text-xl font-black text-oxot-blue-light">€500M</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">5yr SOM</div>
                        </div>
                    </motion.div>
                </div>

                {/* Market Stats */}
                <div className="space-y-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <TrendingUp className="w-8 h-8 text-oxot-blue" />
                            <div>
                                <div className="text-2xl font-bold text-white">20% CAGR</div>
                                <div className="text-sm text-gray-400">Market Growth Rate</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Driven by NIS2 enforcement, SEC disclosure rules, and escalating ransomware attacks on critical infrastructure.
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Target className="w-8 h-8 text-oxot-gold" />
                            <div>
                                <div className="text-2xl font-bold text-white">Zero Direct Competitors</div>
                                <div className="text-sm text-gray-400">In Cyber Psychohistory</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Category-defining platform with 3-5 year sustainable moat. Adjacent vendors lack prediction capabilities.
                        </p>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Globe className="w-8 h-8 text-oxot-blue" />
                            <div>
                                <div className="text-2xl font-bold text-white">EMEA First</div>
                                <div className="text-sm text-gray-400">Go-to-Market Strategy</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            NIS2 compliance urgency creates immediate demand. Target €3.2M ARR in Year 1 with 15 enterprise customers.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
};

interface ExpertAnalysisSectionProps {
    personas: typeof expertPersonas;
    activePersona: number;
    setActivePersona: (index: number) => void;
}

const ExpertAnalysisSection = ({ personas, activePersona, setActivePersona }: ExpertAnalysisSectionProps) => {
    const persona = personas[activePersona];

    return (
        <section>
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                Multi-Agent Strategic Analysis
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                11 Expert Perspectives
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl">
                Strategic recommendations synthesized from multiple expert domains including marketing, finance, operations, and compliance.
            </p>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Persona Selector */}
                <div className="space-y-2">
                    {personas.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setActivePersona(i)}
                            className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${i === activePersona
                                ? 'bg-oxot-gold/20 border border-oxot-gold/40 text-oxot-gold'
                                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <span className="text-xl">{p.avatar}</span>
                            <div className="min-w-0">
                                <div className="text-sm font-medium truncate">{p.name}</div>
                                <div className="text-xs text-gray-500 truncate">{p.title}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active Persona Detail */}
                <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="flex items-start gap-6 mb-8">
                        <div className="text-5xl">{persona.avatar}</div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">{persona.name}</h3>
                            <div className="text-oxot-gold">{persona.title}</div>
                            <div className="text-gray-500 text-sm">{persona.organization}</div>
                        </div>
                    </div>

                    <blockquote className="text-xl text-gray-300 italic border-l-4 border-oxot-gold pl-6 mb-8">
                        "{persona.quote}"
                    </blockquote>

                    <div className="bg-oxot-gold/10 border border-oxot-gold/30 rounded-xl p-6 mb-8">
                        <div className="text-oxot-gold text-xs font-mono uppercase tracking-wider mb-2">Key Recommendation</div>
                        <p className="text-white font-medium">{persona.keyRecommendation}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-oxot-blue font-bold mb-3 text-sm uppercase tracking-wide">Strengths</h4>
                            <ul className="space-y-2">
                                {persona.detailedAnalysis.strengths.map((s, i) => (
                                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                        <span className="text-oxot-blue mt-1">+</span> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-oxot-red font-bold mb-3 text-sm uppercase tracking-wide">Concerns</h4>
                            <ul className="space-y-2">
                                {persona.detailedAnalysis.concerns.map((c, i) => (
                                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                        <span className="text-oxot-red mt-1">−</span> {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-oxot-blue-light font-bold mb-3 text-sm uppercase tracking-wide">Priority Services</h4>
                            <div className="flex flex-wrap gap-2">
                                {persona.detailedAnalysis.priorityServices.map(id => {
                                    const service = services.find(s => s.id === id);
                                    return service ? (
                                        <span
                                            key={id}
                                            className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                                            style={{ borderLeft: `3px solid ${service.tierColor}` }}
                                        >
                                            {service.name.split(' ').slice(0, 2).join(' ')}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServiceTierOverview = () => {
    const tierData = [
        {
            name: 'GOLD',
            color: '#FFD700',
            description: 'Psychometric & Organizational Intelligence',
            count: services.filter(s => s.tier === 'Gold').length,
            icon: Sparkles,
            examples: ['Real-Time Insurance', 'Cognitive Digital Twin', 'Team Optimization']
        },
        {
            name: 'BLUE',
            color: '#0042D6',
            description: 'Technical Intelligence & Defense',
            count: services.filter(s => s.tier === 'Blue').length,
            icon: Shield,
            examples: ['On-Premise TI', 'Neural Physics', 'Zero-Day Detection']
        },
        {
            name: 'RED',
            color: '#D60000',
            description: 'Offensive Security & Attack Simulation',
            count: services.filter(s => s.tier === 'Red').length,
            icon: Target,
            examples: ['Attack Path Prediction', 'GGNN Analysis']
        }
    ];

    return (
        <section>
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                Service Classification
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-12">
                Three-Tier Service Architecture
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {tierData.map((tier, i) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-opacity-60 transition-all"
                        style={{ borderTopColor: tier.color, borderTopWidth: '4px' }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <tier.icon className="w-8 h-8" style={{ color: tier.color }} />
                            <div>
                                <div className="text-2xl font-black" style={{ color: tier.color }}>{tier.name}</div>
                                <div className="text-sm text-gray-400">{tier.count} Services</div>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6">{tier.description}</p>
                        <div className="space-y-2">
                            {tier.examples.map((ex, j) => (
                                <div key={j} className="text-sm text-gray-500 flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4" style={{ color: tier.color }} />
                                    {ex}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const PriorityServicesSpotlight = () => {
    const p1Services = getPriorityServices();

    return (
        <section>
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                Year 1 Priority
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                5 Priority Services for Launch
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl">
                These P1 services have readiness rating of 4+, strong market demand, and can deliver ROI within 90 days.
            </p>

            <div className="space-y-4">
                {p1Services.map((service, i) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            <div className="flex items-center gap-4 flex-1">
                                <div
                                    className="w-2 h-12 rounded-full"
                                    style={{ backgroundColor: service.tierColor }}
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-white">{service.name}</h3>
                                    <p className="text-sm text-gray-400">{service.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6 lg:gap-12 text-center lg:text-right">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase mb-1">3 Months</div>
                                    <div className="text-sm text-oxot-blue-light">{service.timeline.threeMonths}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase mb-1">9 Months</div>
                                    <div className="text-sm text-oxot-blue">{service.timeline.nineMonths}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase mb-1">1 Year</div>
                                    <div className="text-sm text-oxot-gold">{service.timeline.oneYear}</div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-xs text-gray-500 uppercase mb-1">Enterprise</div>
                                <div className="text-lg font-bold text-oxot-gold">
                                    €{(service.pricing.enterprise.min / 1000).toFixed(0)}K - €{(service.pricing.enterprise.max / 1000).toFixed(0)}K
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const EnhancementsPreview = () => {
    return (
        <section>
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                API Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-12">
                <span className="text-oxot-gold">{enhancementStats.complete}</span>/{enhancementStats.total} Enhancements Complete
            </h2>

            <div className="grid md:grid-cols-5 gap-4 mb-8">
                {tiers.map((tier, i) => (
                    <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
                        style={{ borderTopColor: tier.color, borderTopWidth: '3px' }}
                    >
                        <div className="text-2xl font-black text-white mb-2">{tier.name.split(':')[0].replace('Tier ', '')}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{tier.name.split(':')[1]?.trim()}</div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link
                    href="/corporate/enhancements"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-oxot-gold/20 border border-oxot-gold/40 rounded-full text-oxot-gold hover:bg-oxot-gold/30 transition-all"
                >
                    View All Enhancements <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
};

const StrategicConsensusSection = () => {
    return (
        <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-oxot-gold/10 via-transparent to-oxot-blue/10 border border-oxot-gold/20">
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                Multi-Agent Consensus
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-8">
                Strategic Recommendations
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Year 1 Targets</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-black/50 rounded-xl text-center">
                            <div className="text-3xl font-black text-oxot-gold">€3.2M</div>
                            <div className="text-xs text-gray-500 uppercase">ARR</div>
                        </div>
                        <div className="p-4 bg-black/50 rounded-xl text-center">
                            <div className="text-3xl font-black text-oxot-blue">15</div>
                            <div className="text-xs text-gray-500 uppercase">Customers</div>
                        </div>
                        <div className="p-4 bg-black/50 rounded-xl text-center">
                            <div className="text-3xl font-black text-oxot-blue-light">€213K</div>
                            <div className="text-xs text-gray-500 uppercase">Avg Deal</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Key Messages</h3>
                    <ul className="space-y-2">
                        {strategicConsensus.keyMessages.slice(0, 4).map((msg, i) => (
                            <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className="text-oxot-gold mt-0.5">▸</span> {msg}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const NavigationLinks = () => {
    const links = [
        {
            title: 'Services Portfolio',
            description: 'Interactive pricing calculator, detailed service profiles, and timeline visualization',
            href: '/corporate/services-portfolio',
            icon: BarChart3,
            color: 'text-oxot-blue'
        },
        {
            title: 'API Enhancements',
            description: 'Complete catalog of 27 enhancements organized by tier with dependencies',
            href: '/corporate/enhancements',
            icon: Zap,
            color: 'text-oxot-gold'
        }
    ];

    return (
        <section>
            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                Explore Further
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-12">
                Detailed Documentation
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {links.map((link, i) => (
                    <Link key={i} href={link.href}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group cursor-pointer"
                        >
                            <link.icon className={`w-10 h-10 ${link.color} mb-6`} />
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-oxot-gold transition-colors">
                                {link.title}
                                <ArrowRight className="inline-block w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-gray-400">{link.description}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
