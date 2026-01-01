"use client";

import React, { useRef, useEffect } from 'react';
import AgentRedVisualization from './agent-red/AgentRedVisualization';
import ContactFormCTA from './ContactFormCTA';
import SectorGrid from './agent-red/SectorGrid';
import { Target, Terminal, Network, Zap, Crosshair, Shield, Globe, Database, Cloud, Wifi, GitBranch, Box as BoxIcon, Search, FileCode, CheckCircle, Eye, Share2, ChevronDown, AlertTriangle, GitMerge } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLiveNews } from '../services/liveData';
import { OXOTLogo } from './branding/OXOTLogo';
import { PageHeader } from './branding/PageHeader';
import { useTranslations } from '@/i18n';

// --- PARTICLES DATA ---
const CONCEPTS = [
    { text: "Confirmation Bias", type: "BIAS" },
    { text: "Openness", type: "BIG5" },
    { text: "Dominance", type: "DISC" },
    { text: "Normalcy Bias", type: "BIAS" },
    { text: "Neuroticism", type: "BIG5" },
    { text: "Compliance", type: "DISC" },
    { text: "Groupthink", type: "SOC" },
    { text: "Authority Bias", type: "BIAS" },
    { text: "Anchoring", type: "BIAS" },
    { text: "Conscientiousness", type: "BIG5" },
    { text: "Influence", type: "DISC" },
    { text: "Sunk Cost", type: "BIAS" },
    { text: "Agreeableness", type: "BIG5" },
    { text: "Mimetic Desire", type: "SOC" },
    { text: "Steadiness", type: "DISC" }
];

export default function AgentRedPage() {
    const { t } = useTranslations();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const { news, loading: newsLoading } = useLiveNews('cybersecurity threat');

    // Fallback ticker items if news is loading or empty
    const defaultTickerItems = t.agentRed.squad.ticker ? Object.values(t.agentRed.squad.ticker) : [];

    const tickerItems = news.length > 0
        ? news.map(n => `LIVE: ${n.title} - ${n.source.name}`)
        : defaultTickerItems;

    // Particle Animation Logic
    const particlesRef = useRef(CONCEPTS.map(() => ({
        x: 0, y: 0,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: 120 + Math.random() * 180,
        speed: 0.001 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2
    })));

    useEffect(() => {
        let animationFrame: number;
        let time = 0;
        const animate = () => {
            time += 0.01;
            particlesRef.current.forEach((p, i) => {
                p.angle += p.speed;
                const r = p.orbitRadius + Math.sin(time + p.phase) * 20;
                const targetX = Math.cos(p.angle) * r;
                const targetY = Math.sin(p.angle * 0.8) * (r * 0.8);
                p.x += (targetX - p.x) * 0.05;
                p.y += (targetY - p.y) * 0.05;
                const el = document.getElementById(`concept-${i}`);
                if (el) {
                    const noiseX = Math.sin(time * 2 + p.phase) * 5;
                    const noiseY = Math.cos(time * 1.5 + p.phase) * 5;
                    el.style.transform = `translate(${p.x + noiseX}px, ${p.y + noiseY}px)`;
                    el.style.opacity = `${0.2 + Math.sin(time + p.phase) * 0.15}`;
                }
            });
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const squad = [
        {
            name: "CLOUD WRAITH",
            role: t.agentRed.squad.sections.personas.agents.wraith.role,
            desc: t.agentRed.squad.sections.personas.agents.wraith.desc,
            icon: <Cloud className="w-8 h-8 text-oxot-blue" />
        },
        {
            name: "SIGNAL PHANTOM",
            role: t.agentRed.squad.sections.personas.agents.phantom.role,
            desc: t.agentRed.squad.sections.personas.agents.phantom.desc,
            icon: <Wifi className="w-8 h-8 text-oxot-gold" />
        },
        {
            name: "THE MOLE",
            role: t.agentRed.squad.sections.personas.agents.mole.role,
            desc: t.agentRed.squad.sections.personas.agents.mole.desc,
            icon: <GitBranch className="w-8 h-8 text-oxot-blue-light" />
        },
        {
            name: "SANDBOX ZERO",
            role: t.agentRed.squad.sections.personas.agents.sandbox.role,
            desc: t.agentRed.squad.sections.personas.agents.sandbox.desc,
            icon: <BoxIcon className="w-8 h-8 text-oxot-red" />
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent text-gray-300 font-sans selection:bg-primary/30 selection:text-white overflow-hidden">

            {/* Global Background (handled by TerminalFrame) */}


            {/* HERO SECTION: RED LEADER (Restored with Framer Motion) */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 p-4">
                <motion.div style={{ opacity, scale }} className="text-center max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8 flex flex-col items-center gap-6"
                    >
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 bg-red-950 blur-[60px] opacity-20 animate-pulse"></div>
                            <div className="absolute inset-0 border border-red-900/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-4 border border-red-900/40 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                            <Target className="w-20 h-20 text-red-500 relative z-10 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                        </div>
                    </motion.div>

                    <PageHeader
                        title={t.agentRed.hero.title}
                        subtitle={t.agentRed.hero.subtitle}
                        variant="hero"
                        accent="red"
                        className="mb-12"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono" dangerouslySetInnerHTML={{ __html: t.agentRed.hero.description }} />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">{t.agentRed.hero.scroll}</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </motion.div>
            </section>

            {/* SECTION: THE ULTIMATE PREDATOR (Migrated Terminal) */}
            <section className="relative py-20 px-4 z-10 bg-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/30 text-red-400 text-xs font-mono tracking-widest mb-8">
                                <Zap className="w-3 h-3" /> {t.agentRed.predator.badge}
                            </div>
                            <h2 className="text-2xl font-black text-white mb-6 leading-tight">
                                {t.agentRed.predator.title}<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">{t.agentRed.predator.titleHighlight}</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                {t.agentRed.predator.description}
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
                                        <Terminal className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{t.agentRed.predator.cards.kali.title}</h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            {t.agentRed.predator.cards.kali.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
                                        <Network className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{t.agentRed.predator.cards.gnn.title}</h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            {t.agentRed.predator.cards.gnn.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
                                        <GitMerge className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{t.agentRed.predator.cards.swarm.title}</h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            {t.agentRed.predator.cards.swarm.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl">
                                {/* Terminal Visualization */}
                                <div className="font-mono text-xs md:text-sm space-y-2">
                                    <div className="flex gap-2 text-gray-500 border-b border-white/5 pb-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-oxot-red/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-oxot-gold/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-oxot-blue/20"></div>
                                        <span className="ml-auto">red_leader@aeon-core:~</span>
                                    </div>

                                    <div className="text-oxot-gold">{t.agentRed.predator.terminal.init}</div>
                                    <div className="text-gray-400">{t.agentRed.predator.terminal.target}</div>
                                    <div className="text-gray-400">{t.agentRed.predator.terminal.analysis}</div>
                                    <div className="text-gray-400">{t.agentRed.predator.terminal.scan}</div>
                                    <div className="text-oxot-gold">{t.agentRed.predator.terminal.optimization}</div>
                                    <div className="text-oxot-blue-light">{t.agentRed.predator.terminal.instantiating}</div>
                                    <div className="text-gray-500 animate-pulse">_</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION: DASHBOARD VISUALIZATION (Existing) */}
            <section className="relative z-10 py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="flex items-center gap-4 text-xs md:text-sm uppercase tracking-widest text-gray-500 font-mono mb-8">
                        <span className="w-8 h-px bg-primary"></span>
                        <span>Live Operations Dashboard</span>
                    </div>
                    <AgentRedVisualization />
                </div>
            </section>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">

                {/* Section 4: Agent Zero Framework */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-8 md:p-12"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

                    {/* Live Ticker */}
                    <div className="bg-red-950/20 border-y border-red-900/30 py-2 overflow-hidden flex items-center gap-4 mb-12">
                        <div className="px-4 text-xs font-bold bg-red-900 text-red-100 animate-pulse whitespace-nowrap">
                            {t.agentRed.squad.tickerLabel}
                        </div>
                        <div className="flex-1 overflow-hidden relative h-6">
                            <motion.div
                                animate={{ x: [1000, -2000] }}
                                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                                className="absolute whitespace-nowrap flex gap-16 text-sm text-red-400/80"
                            >
                                {tickerItems.map((item, i) => (
                                    <span key={i} className="flex items-center gap-2">
                                        <AlertTriangle size={12} />
                                        {item}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                        <span className="w-3 h-12 bg-primary mr-6 block rounded-full shadow-[0_0_15px_rgba(0,224,176,0.6)]"></span>
                        {t.agentRed.squad.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                        <div>
                            <h4 className="text-xl font-bold text-secondary mb-6 font-mono flex items-center gap-3">
                                <span className="text-gray-600">01 //</span> {t.agentRed.squad.sections.personas.title}
                            </h4>
                            <p className="mb-6 text-gray-400" dangerouslySetInnerHTML={{ __html: t.agentRed.squad.sections.personas.desc }} />

                            {/* Replaced Text List with Visual Cards */}
                            <div className="grid grid-cols-1 gap-4">
                                {squad.map((agent, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-primary/30 transition-colors group"
                                    >
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                {agent.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{agent.name}</h3>
                                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">{agent.role}</div>
                                            <p className="text-gray-400 text-sm leading-relaxed">{agent.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-secondary mb-6 font-mono flex items-center gap-3">
                                <span className="text-gray-600">02 //</span> {t.agentRed.squad.sections.provisioning.title}
                            </h4>
                            <p className="mb-6 text-gray-400">
                                {t.agentRed.squad.sections.provisioning.desc}
                            </p>
                            <ul className="space-y-4 text-gray-400">
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-primary/30 transition-colors">
                                    <strong className="text-white block mb-1">{t.agentRed.squad.sections.provisioning.items.global.title}</strong>
                                    {t.agentRed.squad.sections.provisioning.items.global.desc}
                                </li>
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-primary/30 transition-colors">
                                    <strong className="text-white block mb-1">{t.agentRed.squad.sections.provisioning.items.tool.title}</strong>
                                    {t.agentRed.squad.sections.provisioning.items.tool.desc}
                                </li>
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-primary/30 transition-colors">
                                    <strong className="text-white block mb-1">{t.agentRed.squad.sections.provisioning.items.code.title}</strong>
                                    {t.agentRed.squad.sections.provisioning.items.code.desc}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-12">
                        <h4 className="text-xl font-bold text-secondary mb-6 font-mono flex items-center gap-3">
                            <span className="text-gray-600">03 //</span> {t.agentRed.squad.sections.simulation.title}
                        </h4>
                        <p className="mb-8 text-gray-400 max-w-3xl" dangerouslySetInnerHTML={{ __html: t.agentRed.squad.sections.simulation.desc }} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            <div className="bg-black/40 p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 text-primary">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <strong className="text-white block mb-2 text-lg">{t.agentRed.squad.sections.simulation.cards.sandbox.title}</strong>
                                {t.agentRed.squad.sections.simulation.cards.sandbox.desc}
                            </div>
                            <div className="bg-black/40 p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 text-primary">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <strong className="text-white block mb-2 text-lg">{t.agentRed.squad.sections.simulation.cards.exploit.title}</strong>
                                {t.agentRed.squad.sections.simulation.cards.exploit.desc}
                            </div>
                            <div className="bg-black/40 p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 text-primary">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <strong className="text-white block mb-2 text-lg">{t.agentRed.squad.sections.simulation.cards.validation.title}</strong>
                                {t.agentRed.squad.sections.simulation.cards.validation.desc}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section 5: Deep Knowledge Graph */}
                <section>
                    <h3 className="text-2xl font-black text-white mb-12 text-center tracking-tight leading-tight">
                        {t.agentRed.graph.title}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">{t.agentRed.graph.titleHighlight}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {/* Deep OSINT Card */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                                        <Globe className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{t.agentRed.graph.cards.osint.title}</h4>
                                </div>
                                <ul className="space-y-4 text-sm text-gray-400">
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">01</span><span><strong className="text-white">{t.agentRed.graph.cards.osint.items.rfp.title}</strong> {t.agentRed.graph.cards.osint.items.rfp.desc}</span></li>
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">02</span><span><strong className="text-white">{t.agentRed.graph.cards.osint.items.jobs.title}</strong> {t.agentRed.graph.cards.osint.items.jobs.desc}</span></li>
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">03</span><span><strong className="text-white">{t.agentRed.graph.cards.osint.items.profiling.title}</strong> {t.agentRed.graph.cards.osint.items.profiling.desc}</span></li>
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">04</span><span><strong className="text-white">{t.agentRed.graph.cards.osint.items.darkweb.title}</strong> {t.agentRed.graph.cards.osint.items.darkweb.desc}</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Supply Chain Card */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-oxot-red/20 to-oxot-gold/20 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-oxot-red/10 rounded-xl border border-oxot-red/20 group-hover:bg-oxot-red/20 transition-colors">
                                        <Network className="w-8 h-8 text-oxot-red" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{t.agentRed.graph.cards.supply.title}</h4>
                                </div>
                                <ul className="space-y-4 text-sm text-gray-400">
                                    <li className="flex gap-3"><span className="text-oxot-red font-mono">01</span><span><strong className="text-white">{t.agentRed.graph.cards.supply.items.suppliers.title}</strong> {t.agentRed.graph.cards.supply.items.suppliers.desc}</span></li>
                                    <li className="flex gap-3"><span className="text-oxot-red font-mono">02</span><span><strong className="text-white">{t.agentRed.graph.cards.supply.items.manuals.title}</strong> {t.agentRed.graph.cards.supply.items.manuals.desc}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-lighter/80 p-10 border border-white/5 rounded-xl relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
                        <h4 className="text-xl font-bold text-white mb-6 relative z-10">{t.agentRed.graph.sectors.title}</h4>
                        <p className="text-gray-400 mb-8 relative z-10 max-w-2xl">
                            {t.agentRed.graph.sectors.desc}
                        </p>

                        {/* New Sector Grid Component */}
                        <SectorGrid />

                    </div>
                </section>

                {/* Section 6: 20-Hop Knowledge Graph Traversal */}
                <section className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent"></div>

                    {/* Header */}
                    <div className="relative z-10 mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-widest mb-6">
                            <Network className="w-3 h-3" /> {t.agentRed.traversal.badge}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                            {t.agentRed.traversal.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">{t.agentRed.traversal.titleHighlight}</span> {t.agentRed.traversal.suffix}
                        </h3>
                        <p className="text-gray-400 max-w-4xl text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t.agentRed.traversal.description }} />
                    </div>

                    {/* The Core Value Proposition */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="text-red-500 text-3xl font-black mb-2">Level 0</div>
                            <div className="text-white font-bold mb-2">{t.agentRed.traversal.cards.l0.title}</div>
                            <p className="text-gray-500 text-sm">{t.agentRed.traversal.cards.l0.desc}</p>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="text-orange-500 text-3xl font-black mb-2">Level 1</div>
                            <div className="text-white font-bold mb-2">{t.agentRed.traversal.cards.l1.title}</div>
                            <p className="text-gray-500 text-sm">{t.agentRed.traversal.cards.l1.desc}</p>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="text-oxot-gold text-3xl font-black mb-2">GGNN</div>
                            <div className="text-white font-bold mb-2">{t.agentRed.traversal.cards.ggnn.title}</div>
                            <p className="text-gray-500 text-sm">{t.agentRed.traversal.cards.ggnn.desc}</p>
                        </div>
                    </div>

                    {/* Exponential Complexity Visualization */}
                    <div className="relative z-10 bg-black/50 border border-white/10 rounded-xl p-8 mb-8">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-white mb-4">{t.agentRed.traversal.complexity.title}</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-4">
                                        <span className="text-red-400 font-mono w-20">{t.agentRed.traversal.complexity.l1.label}</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div></div>
                                        <span className="text-gray-500">{t.agentRed.traversal.complexity.l1.desc}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-orange-400 font-mono w-20">{t.agentRed.traversal.complexity.l5.label}</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div></div>
                                        <span className="text-gray-500">{t.agentRed.traversal.complexity.l5.desc}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-oxot-gold font-mono w-20">{t.agentRed.traversal.complexity.l10.label}</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-oxot-gold h-2 rounded-full" style={{ width: '50%' }}></div></div>
                                        <span className="text-gray-500">{t.agentRed.traversal.complexity.l10.desc}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-mono w-20 font-bold">{t.agentRed.traversal.complexity.l20.label}</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-gradient-to-r from-oxot-red via-oxot-gold to-oxot-gold h-2 rounded-full" style={{ width: '100%' }}></div></div>
                                        <span className="text-white font-bold">{t.agentRed.traversal.complexity.l20.desc}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-px h-32 bg-white/10 hidden lg:block"></div>
                            <div className="lg:w-80 text-center lg:text-left">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">20</div>
                                <div className="text-white font-bold">{t.agentRed.traversal.complexity.hops}</div>
                                <p className="text-gray-500 text-xs mt-2">{t.agentRed.traversal.complexity.hopsDesc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Example Attack Chain */}
                    <div className="relative z-10">
                        <h4 className="text-sm font-mono text-red-400 mb-4 uppercase tracking-widest">{t.agentRed.traversal.chain.title}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {[
                                { hop: '1-3', label: t.agentRed.traversal.chain.steps.vuln, icon: <FileCode className="w-4 h-4" /> },
                                { hop: '4-8', label: t.agentRed.traversal.chain.steps.deps, icon: <GitBranch className="w-4 h-4" /> },
                                { hop: '9-12', label: t.agentRed.traversal.chain.steps.servers, icon: <Database className="w-4 h-4" /> },
                                { hop: '13-17', label: t.agentRed.traversal.chain.steps.bridge, icon: <Network className="w-4 h-4" /> },
                                { hop: '18-20', label: t.agentRed.traversal.chain.steps.impact, icon: <AlertTriangle className="w-4 h-4" /> }
                            ].map((step, i) => (
                                <div key={i} className="bg-black/40 border border-white/10 rounded-lg p-3 text-center hover:border-red-500/50 transition-colors">
                                    <div className="text-red-400 font-mono text-xs mb-1">Hop {step.hop}</div>
                                    <div className="text-white flex items-center justify-center gap-2">
                                        {step.icon}
                                        <span className="text-xs">{step.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 7: Golden Scenarios - Detailed Static Cards */}
                <section>
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/20 text-red-400 text-xs font-mono tracking-widest mb-6">
                            <Crosshair className="w-3 h-3" /> {t.agentRed.scenarios.badge}
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4">
                            {t.agentRed.scenarios.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{t.agentRed.scenarios.titleHighlight}</span>
                        </h3>
                        <p className="text-gray-400 max-w-3xl">
                            {t.agentRed.scenarios.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Scenario A: Supply Chain Injection */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                                        <FileCode className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">{t.agentRed.scenarios.cards.supply.title}</h4>
                                        <div className="text-xs font-mono text-red-400">MITRE ATT&CK: T1195.001</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-red-500/20 text-red-400 rounded-full">HIGH IMPACT</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                {t.agentRed.scenarios.cards.supply.desc}
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">{t.agentRed.scenarios.killChainTitle}</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.supply.steps.recon.label}:</strong> {t.agentRed.scenarios.cards.supply.steps.recon.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.supply.steps.weaponize.label}:</strong> {t.agentRed.scenarios.cards.supply.steps.weaponize.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.supply.steps.deliver.label}:</strong> {t.agentRed.scenarios.cards.supply.steps.deliver.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.supply.steps.exploit.label}:</strong> {t.agentRed.scenarios.cards.supply.steps.exploit.desc}</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">{t.agentRed.scenarios.impactTitle}</h5>
                                <p className="text-gray-500 text-xs">{t.agentRed.scenarios.cards.supply.impact}</p>
                            </div>
                        </div>

                        {/* Scenario B: Insider Threat */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                                        <Eye className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">{t.agentRed.scenarios.cards.insider.title}</h4>
                                        <div className="text-xs font-mono text-orange-400">MITRE ATT&CK: T1020, T1078</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full">STEALTH</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                {t.agentRed.scenarios.cards.insider.desc}
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">{t.agentRed.scenarios.killChainTitle}</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.insider.steps.access.label}:</strong> {t.agentRed.scenarios.cards.insider.steps.access.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.insider.steps.collection.label}:</strong> {t.agentRed.scenarios.cards.insider.steps.collection.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.insider.steps.staging.label}:</strong> {t.agentRed.scenarios.cards.insider.steps.staging.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.insider.steps.exfil.label}:</strong> {t.agentRed.scenarios.cards.insider.steps.exfil.desc}</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-orange-400 uppercase tracking-widest mb-2">{t.agentRed.scenarios.impactTitle}</h5>
                                <p className="text-gray-500 text-xs">{t.agentRed.scenarios.cards.insider.impact}</p>
                            </div>
                        </div>

                        {/* Scenario C: Ransomware Blitz */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-oxot-gold/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-oxot-gold/10 rounded-xl flex items-center justify-center border border-oxot-gold/20">
                                        <Zap className="w-6 h-6 text-oxot-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">{t.agentRed.scenarios.cards.ransomware.title}</h4>
                                        <div className="text-xs font-mono text-oxot-gold">MITRE ATT&CK: T1486, T1489</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-oxot-gold/20 text-oxot-gold rounded-full">DESTRUCTIVE</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                {t.agentRed.scenarios.cards.ransomware.desc}
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">{t.agentRed.scenarios.killChainTitle}</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ransomware.steps.access.label}:</strong> {t.agentRed.scenarios.cards.ransomware.steps.access.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ransomware.steps.lateral.label}:</strong> {t.agentRed.scenarios.cards.ransomware.steps.lateral.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ransomware.steps.inhibit.label}:</strong> {t.agentRed.scenarios.cards.ransomware.steps.inhibit.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ransomware.steps.impact.label}:</strong> {t.agentRed.scenarios.cards.ransomware.steps.impact.desc}</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-oxot-gold uppercase tracking-widest mb-2">{t.agentRed.scenarios.impactTitle}</h5>
                                <p className="text-gray-500 text-xs">{t.agentRed.scenarios.cards.ransomware.impact}</p>
                            </div>
                        </div>

                        {/* Scenario D: OT Bridge Jump */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-oxot-blue/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-oxot-blue/10 rounded-xl flex items-center justify-center border border-oxot-blue/20">
                                        <Network className="w-6 h-6 text-oxot-blue" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">{t.agentRed.scenarios.cards.ot.title}</h4>
                                        <div className="text-xs font-mono text-oxot-blue-light">MITRE ATT&CK for ICS: T0886</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-oxot-blue/20 text-oxot-blue-light rounded-full">CRITICAL</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                {t.agentRed.scenarios.cards.ot.desc}
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">{t.agentRed.scenarios.killChainTitle}</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ot.steps.access.label}:</strong> {t.agentRed.scenarios.cards.ot.steps.access.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ot.steps.discovery.label}:</strong> {t.agentRed.scenarios.cards.ot.steps.discovery.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ot.steps.pivot.label}:</strong> {t.agentRed.scenarios.cards.ot.steps.pivot.desc}</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">{t.agentRed.scenarios.cards.ot.steps.control.label}:</strong> {t.agentRed.scenarios.cards.ot.steps.control.desc}</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-oxot-blue-light uppercase tracking-widest mb-2">{t.agentRed.scenarios.impactTitle}</h5>
                                <p className="text-gray-500 text-xs">{t.agentRed.scenarios.cards.ot.impact}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <ContactFormCTA
                    variant="red"
                    headline={t.agentRed.cta.headline}
                    subheadline={t.agentRed.cta.subheadline}
                />
            </div>
        </div>
    );
}
