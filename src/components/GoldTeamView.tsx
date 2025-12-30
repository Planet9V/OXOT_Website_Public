'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Briefcase, ShieldCheck, Ruler,
    ArrowRight, Globe, ChevronDown,
    Crown, Scale, GraduationCap,
    Users, Activity, Zap, Layers,
    FileText, Lightbulb, Building2, Train,
    Droplets, Factory, Shield, Award,
    CheckCircle, Clock, Target, TrendingUp,
    Gavel // Added local icon for Law/Liability if available, otherwise fallback to Scale
} from 'lucide-react';
import Link from 'next/link';
import GoldTeamGraph from './GoldTeamGraph';
import ContactFormCTA from './ContactFormCTA';
import { useTranslations } from '@/i18n';

export const GoldTeamView = () => {
    const { t } = useTranslations();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent text-gray-300 font-sans selection:bg-yellow-500/30 selection:text-white overflow-hidden">

            {/* HERO SECTION: GOLD TEAM */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 p-4">
                <motion.div style={{ opacity, scale }} className="text-center max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute inset-0 bg-oxot-gold blur-[60px] opacity-10 animate-pulse"></div>
                            <div className="absolute inset-0 border border-oxot-gold/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute inset-4 border border-oxot-gold/40 rounded-full border-dashed animate-[spin_30s_linear_infinite_reverse]"></div>
                            <Crown className="w-16 h-16 text-oxot-gold relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-black tracking-tighter mb-4 text-white leading-none uppercase"
                    >
                        {t.goldTeam.hero.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-tight mb-6">
                            <span className="text-oxot-gold font-medium">{t.goldTeam.hero.subtitle}</span> — {t.goldTeam.hero.tagline}
                        </p>
                        <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            {t.goldTeam.hero.description}
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">{t.goldTeam.hero.scroll}</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </motion.div>
            </section>

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

                {/* WHY OXOT DIFFERENTIATORS - ENHANCED */}
                <section className="relative">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-500/3 rounded-full blur-[100px]" />
                        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px]" />
                    </div>

                    <div className="relative text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oxot-gold/10 border border-oxot-gold/20 text-oxot-gold text-xs font-mono tracking-widest mb-6"
                        >
                            <Award className="w-3 h-3" /> {t.goldTeam.why.badge}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xl md:text-2xl font-bold text-white mb-4"
                        >
                            {t.goldTeam.why.title} <span className="text-oxot-gold">{t.goldTeam.why.highlight}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-gray-400 max-w-3xl mx-auto text-sm"
                        >
                            {t.goldTeam.why.description}
                        </motion.p>
                    </div>

                    {/* Enhanced Cards with Animations */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Connecting line (desktop only) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent -translate-y-1/2 z-0" />

                        {[
                            {
                                icon: <Shield size={18} />,
                                title: t.goldTeam.why.cards.expert.title,
                                desc: t.goldTeam.why.cards.expert.desc,
                                color: "oxot-blue"
                            },
                            {
                                icon: <Zap size={18} />,
                                title: t.goldTeam.why.cards.ai.title,
                                desc: t.goldTeam.why.cards.ai.desc,
                                color: "oxot-gold"
                            },
                            {
                                icon: <Globe size={18} />,
                                title: t.goldTeam.why.cards.global.title,
                                desc: t.goldTeam.why.cards.global.desc,
                                color: "oxot-gold"
                            },
                            {
                                icon: <GraduationCap size={18} />,
                                title: t.goldTeam.why.cards.executive.title,
                                desc: t.goldTeam.why.cards.executive.desc,
                                color: "oxot-red"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="relative z-10 group h-full"
                            >
                                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 h-full hover:border-oxot-gold/30 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg bg-${item.color}/10 text-${item.color}`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-white font-bold text-sm group-hover:text-oxot-gold transition-colors">{item.title}</h3>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed pl-1">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* STRATEGIC SERVICES - ENHANCED BENTO LAYOUT */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow"></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.15em]">{t.goldTeam.services.title}</h2>
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow"></div>
                    </div>

                    {/* HERO CARDS: IEC 62443 & NIS2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        {/* Hero Card 1: IEC 62443 Architecture */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link href="/architecture" className="block h-full">
                                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-oxot-gold/40 transition-all duration-300">

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-oxot-gold/10 border border-oxot-gold/20 text-oxot-gold">
                                                <Ruler size={18} />
                                            </div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-oxot-gold transition-colors">{t.goldTeam.services.iec.title}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 pl-1">
                                            {t.goldTeam.services.iec.desc}
                                        </p>
                                        <div className="flex items-center gap-4 pl-1">
                                            <span className="inline-flex items-center gap-2 text-xs font-bold text-oxot-gold group-hover:gap-3 transition-all">
                                                {t.goldTeam.services.iec.link} <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Hero Card 2: NIS2 Directive Compliance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link href="/services" className="block h-full">
                                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-oxot-blue/40 transition-all duration-300">

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-oxot-blue/10 border border-oxot-blue/20 text-oxot-blue-light">
                                                <Scale size={18} />
                                            </div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-oxot-blue-light transition-colors">{t.goldTeam.services.nis2.title}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 pl-1">
                                            {t.goldTeam.services.nis2.desc} <span className="text-oxot-blue-light font-bold">{t.goldTeam.services.nis2.personalLiability}</span>.
                                        </p>
                                        <div className="flex items-center gap-4 pl-1">
                                            <span className="inline-flex items-center gap-2 text-xs font-bold text-oxot-blue-light group-hover:gap-3 transition-all">
                                                {t.goldTeam.services.nis2.link} <ArrowRight size={14} />
                                            </span>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-1 text-[9px] bg-oxot-blue/10 text-oxot-blue-light rounded">{t.goldTeam.services.nis2.badges.article}</span>
                                                <span className="px-2 py-1 text-[9px] bg-oxot-red/10 text-oxot-red-light rounded">{t.goldTeam.services.nis2.badges.liability}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* SECONDARY SERVICE GRID (4 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* M&A Due Diligence */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link href="/acquisitions" className="block h-full">
                                <div className="relative h-full bg-white/5 border-l-4 border-l-oxot-gold border border-white/10 rounded-r-xl p-5 hover:border-oxot-gold/30 transition-all duration-300 overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-oxot-gold/10 text-oxot-gold">
                                                <Briefcase size={18} />
                                            </div>
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-gold transition-colors">{t.goldTeam.services.ma.title}</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            {t.goldTeam.services.ma.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Crisis War Gaming */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link href="/services" className="block h-full">
                                <div className="relative h-full bg-white/5 border-l-4 border-l-oxot-red border border-white/10 rounded-r-xl p-5 hover:border-oxot-red/30 transition-all duration-300 overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-oxot-red/10 text-oxot-red">
                                                <Activity size={18} />
                                            </div>
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-red transition-colors">{t.goldTeam.services.warGaming.title}</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            {t.goldTeam.services.warGaming.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* SOC Modernization */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link href="/soc" className="block h-full">
                                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-oxot-blue/40 transition-all duration-300 overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-oxot-blue/10 text-oxot-blue-light">
                                                <Users size={18} />
                                            </div>
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-blue-light transition-colors">{t.goldTeam.services.soc.title}</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            {t.goldTeam.services.soc.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Digital Transformation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <Link href="/services" className="block h-full">
                                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-oxot-gold/40 transition-all duration-300 overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-oxot-gold/10 text-oxot-gold">
                                                <TrendingUp size={18} />
                                            </div>
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-gold transition-colors">{t.goldTeam.services.digital.title}</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            {t.goldTeam.services.digital.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                    </div>
                </section>

                {/* IEC 62443 PROGRAM MANAGEMENT */}
                <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxot-gold/10 border border-oxot-gold/20 text-oxot-gold text-[10px] font-mono tracking-widest mb-4">
                                <Scale className="w-3 h-3" /> {t.goldTeam.program.badge}
                            </div>
                            <h2 className="text-lg font-bold text-white mb-4 leading-tight">
                                {t.goldTeam.program.title} <span className="text-oxot-gold">{t.goldTeam.program.highlight}</span>
                            </h2>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                {t.goldTeam.program.description}
                                <span className="text-white font-bold"> {t.goldTeam.program.report}</span>,
                                <span className="text-white font-bold"> {t.goldTeam.program.plan}</span>, {t.common.close === "Sluiten" ? "en" : t.common.close === "Schließen" ? "und" : "and"}
                                <span className="text-white font-bold"> {t.goldTeam.program.handover}</span>.
                            </p>
                            <p className="text-gray-500 text-xs mb-6 italic border-l-2 border-oxot-gold/50 pl-3">
                                {t.goldTeam.program.note}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="px-3 py-1.5 bg-oxot-gold/10 border border-oxot-gold/30 rounded text-[10px] text-oxot-gold font-bold">NIS2</div>
                                <div className="px-3 py-1.5 bg-oxot-blue/10 border border-oxot-blue/30 rounded text-[10px] text-oxot-blue-light font-bold">IEC 62443</div>
                                <div className="px-3 py-1.5 bg-oxot-blue/10 border border-oxot-blue/30 rounded text-[10px] text-oxot-blue-light font-bold">TS 50701</div>
                                <div className="px-3 py-1.5 bg-oxot-red/10 border border-oxot-red/30 rounded text-[10px] text-oxot-red-light font-bold">ISO 27001</div>
                            </div>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-5">
                            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                <Layers className="text-oxot-gold" size={16} /> {t.goldTeam.program.lifecycleTitle}
                            </h4>
                            <div className="space-y-3 text-xs">
                                {t.goldTeam.program.phases.map((step, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2 bg-white/5 rounded border border-white/5">
                                        <div className="w-6 h-6 rounded-full bg-oxot-gold/20 flex items-center justify-center text-oxot-gold font-bold text-[10px] shrink-0">{i + 1}</div>
                                        <div>
                                            <div className="text-white font-bold text-[11px]">{step.phase}</div>
                                            <div className="text-gray-500 text-[10px]">{step.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRODUCT & INTEGRATOR TESTING CALLOUT */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-oxot-red/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="text-oxot-red" size={24} />
                            <h3 className="text-white font-bold text-sm">{t.goldTeam.testing.product.title}</h3>
                        </div>
                        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                            {t.goldTeam.testing.product.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 text-[9px]">
                            {t.goldTeam.testing.product.badges.map((badge, i) => (
                                <span key={i} className="px-2 py-1 bg-oxot-red/10 text-oxot-red-light rounded">{badge}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-oxot-blue/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Factory className="text-oxot-blue-light" size={24} />
                            <h3 className="text-white font-bold text-sm">{t.goldTeam.testing.integrator.title}</h3>
                        </div>
                        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                            {t.goldTeam.testing.integrator.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 text-[9px]">
                            {t.goldTeam.testing.integrator.badges.map((badge, i) => (
                                <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light rounded">{badge}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* INDUSTRY VERTICALS */}
                <section className="bg-black/30 border border-white/10 rounded-2xl p-10">
                    <div className="text-center mb-12">
                        <h2 className="text-xl font-bold text-white mb-4">{t.goldTeam.sectors.title}</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm">{t.goldTeam.sectors.desc}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { icon: <Zap className="w-6 h-6" />, name: t.goldTeam.sectors.list.energy },
                            { icon: <Train className="w-6 h-6" />, name: t.goldTeam.sectors.list.rail },
                            { icon: <Droplets className="w-6 h-6" />, name: t.goldTeam.sectors.list.water },
                            { icon: <Factory className="w-6 h-6" />, name: t.goldTeam.sectors.list.manufacturing },
                            { icon: <Shield className="w-6 h-6" />, name: t.goldTeam.sectors.list.defense }
                        ].map((sector, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 text-center hover:border-oxot-gold/30 transition-colors">
                                <div className="text-oxot-gold mb-2 flex justify-center">{sector.icon}</div>
                                <div className="text-white text-sm font-medium">{sector.name}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* VISUALIZATION SECTION (Moved lower) */}
                <section>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxot-gold/10 border border-oxot-gold/20 text-oxot-gold text-xs font-mono tracking-widest mb-6">
                                <Layers className="w-3 h-3" /> {t.goldTeam.lattice.badge}
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                                {t.goldTeam.lattice.title} <span className="text-oxot-gold">{t.goldTeam.lattice.highlight}</span>
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {t.goldTeam.lattice.description}
                            </p>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <Scale className="w-5 h-5 text-oxot-gold" />
                                    <span className="text-gray-400 text-sm">{t.goldTeam.lattice.badges.compliance}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-oxot-gold" />
                                    <span className="text-gray-400 text-sm">{t.goldTeam.lattice.badges.zeroTrust}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative h-[400px]"
                        >
                            <GoldTeamGraph />
                            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-white/10 p-3 rounded text-xs font-mono text-gray-500">
                                <span className="text-oxot-gold font-bold">{t.goldTeam.lattice.liveLabel}</span>
                            </div>
                        </motion.div>
                    </div >
                </section >

                {/* CTA Section */}
                < ContactFormCTA
                    variant="gold"
                    headline={t.goldTeam.cta.headline}
                    subheadline={t.goldTeam.cta.subheadline}
                />

            </div >
        </div >
    );
};
