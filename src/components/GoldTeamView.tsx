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
                        GOLD TEAM
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg md:text-xl text-gray-400 font-light leading-tight mb-6">
                            <span className="text-oxot-gold font-medium">Elite Advisory Practice</span> — Strategic. Certified. Sovereign.
                        </p>
                        <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            World-class IEC 62443 consulting for critical infrastructure. We architect security, guide digital transformation, and deliver board-level strategic advisory where compliance meets executive liability.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Explore</span>
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
                            <Award className="w-3 h-3" /> WHY OXOT
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xl md:text-2xl font-bold text-white mb-4"
                        >
                            Not Just Consultants. <span className="text-oxot-gold">Elite Architects.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-gray-400 max-w-3xl mx-auto text-sm"
                        >
                            We combine deep OT/ICS expertise with AI-augmented analysis capabilities that no traditional consultancy can match.
                        </motion.p>
                    </div>

                    {/* Enhanced Cards with Animations */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Connecting line (desktop only) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent -translate-y-1/2 z-0" />

                        {[
                            {
                                icon: <Shield size={18} />,
                                title: "Deep OT/ICS Expertise",
                                desc: "Not just IT security—true operational technology specialists with hands-on SCADA, PLC, and ICS experience.",
                                color: "oxot-blue"
                            },
                            {
                                icon: <Zap size={18} />,
                                title: "AI-Augmented Analysis",
                                desc: "Every engagement is powered by the AEON Digital Twin, providing insights impossible through manual assessment alone.",
                                color: "oxot-gold"
                            },
                            {
                                icon: <Globe size={18} />,
                                title: "Global Infrastructure",
                                desc: "Experience across 5 continents securing power grids, rail systems, water utilities, and national defense installations.",
                                color: "oxot-gold"
                            },
                            {
                                icon: <GraduationCap size={18} />,
                                title: "Executive Fluency",
                                desc: "Board-ready deliverables, CISO-level strategic advisory, and risk translation that resonates with leadership.",
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
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.15em]">Strategic Services</h2>
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
                                            <h3 className="text-sm font-bold text-white group-hover:text-oxot-gold transition-colors">IEC 62443 Architecture</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 pl-1">
                                            Design security zones and conduits compliant with the gold standard for industrial cybersecurity. From gap analysis to certification readiness.
                                        </p>
                                        <div className="flex items-center gap-4 pl-1">
                                            <span className="inline-flex items-center gap-2 text-xs font-bold text-oxot-gold group-hover:gap-3 transition-all">
                                                Explore Architecture <ArrowRight size={14} />
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
                                            <h3 className="text-sm font-bold text-white group-hover:text-oxot-blue-light transition-colors">NIS2 Directive & Board Liability</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 pl-1">
                                            Ensure compliance for "Essential" and "Important" entities. We address cybersecurity risk management, incident reporting, and the new <span className="text-oxot-blue-light font-bold">personal management liability</span> provisions.
                                        </p>
                                        <div className="flex items-center gap-4 pl-1">
                                            <span className="inline-flex items-center gap-2 text-xs font-bold text-oxot-blue-light group-hover:gap-3 transition-all">
                                                Explore Compliance <ArrowRight size={14} />
                                            </span>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-1 text-[9px] bg-oxot-blue/10 text-oxot-blue-light rounded">Article 20</span>
                                                <span className="px-2 py-1 text-[9px] bg-oxot-red/10 text-oxot-red-light rounded">Liability</span>
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
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-gold transition-colors">M&A Cyber Due Diligence</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            Know exactly what you're inheriting. We map hidden liabilities in 72 hours.
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
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-red transition-colors">Crisis War Gaming</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            Live-fire simulations. Stress your team against realistic nation-state adversaries.
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
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-blue-light transition-colors">SOC Modernization</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            Transform from 'Alert Fatigue' to 'Predictive Intelligence' in 90 days.
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
                                            <h4 className="text-white text-sm font-bold group-hover:text-oxot-gold transition-colors">Digital Transformation</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed pl-1">
                                            Secure migration to cloud-enabled OT infrastructure.
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
                                <Scale className="w-3 h-3" /> FULL LIFECYCLE SUPPORT
                            </div>
                            <h2 className="text-lg font-bold text-white mb-4 leading-tight">
                                IEC 62443 <span className="text-oxot-gold">Program Management</span>
                            </h2>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                We manage complete IEC 62443 cybersecurity programs for large-scale projects—from
                                initial high-level design and requirements setting through to the final
                                <span className="text-white font-bold"> Security Report</span>,
                                <span className="text-white font-bold"> Cybersecurity Management Plan</span>, and
                                <span className="text-white font-bold"> Handover documentation</span>.
                            </p>
                            <p className="text-gray-500 text-xs mb-6 italic border-l-2 border-oxot-gold/50 pl-3">
                                Our AI-enabled <span className="text-oxot-gold">IEC 62443 Workshop application</span> is tied directly to
                                AEON Core, ensuring efficient, consistent, and auditable IEC 62443 processes, artifacts, and outcomes.
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
                                <Layers className="text-oxot-gold" size={16} /> Program Lifecycle
                            </h4>
                            <div className="space-y-3 text-xs">
                                {[
                                    { phase: "1. High-Level Design", desc: "System architecture, zone/conduit definition, SL-T targets" },
                                    { phase: "2. Requirements Specification", desc: "FR mapping, SRS development, risk-based requirements" },
                                    { phase: "3. Design & Implementation", desc: "Detailed design, vendor coordination, security controls" },
                                    { phase: "4. Verification & Validation", desc: "Testing, penetration testing, compliance verification" },
                                    { phase: "5. Security Report", desc: "Final assessment, residual risk documentation" },
                                    { phase: "6. CSMS & Handover", desc: "Cybersecurity Management Plan, operational handover" }
                                ].map((step, i) => (
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
                            <h3 className="text-white font-bold text-sm">Product Testing (IEC 62443-4-2)</h3>
                        </div>
                        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                            Independent security testing of OT/ICS products against IEC 62443-4-2 component requirements.
                            We help vendors achieve certification readiness and identify vulnerabilities before market release.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[9px]">
                            <span className="px-2 py-1 bg-oxot-red/10 text-oxot-red-light rounded">PLCs</span>
                            <span className="px-2 py-1 bg-oxot-red/10 text-oxot-red-light rounded">HMIs</span>
                            <span className="px-2 py-1 bg-oxot-red/10 text-oxot-red-light rounded">RTUs</span>
                            <span className="px-2 py-1 bg-oxot-red/10 text-oxot-red-light rounded">Embedded Devices</span>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-oxot-blue/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Factory className="text-oxot-blue-light" size={24} />
                            <h3 className="text-white font-bold text-sm">Integrator/Builder Assessment (IEC 62443-2-4)</h3>
                        </div>
                        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                            Security capability assessments for system integrators and automation builders.
                            We verify secure development practices, project delivery processes, and maintenance procedures.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[9px]">
                            <span className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light rounded">SDLC Review</span>
                            <span className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light rounded">Project Delivery</span>
                            <span className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light rounded">Maintenance</span>
                            <span className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light rounded">Certification Prep</span>
                        </div>
                    </div>
                </section>

                {/* INDUSTRY VERTICALS */}
                <section className="bg-black/30 border border-white/10 rounded-2xl p-10">
                    <div className="text-center mb-12">
                        <h2 className="text-xl font-bold text-white mb-4">Critical Infrastructure Expertise</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm">Sector-specific experience where security is not optional—it's existential.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                            { icon: <Zap className="w-6 h-6" />, name: "Energy & Utilities" },
                            { icon: <Train className="w-6 h-6" />, name: "Transportation & Rail" },
                            { icon: <Droplets className="w-6 h-6" />, name: "Water & Wastewater" },
                            { icon: <Factory className="w-6 h-6" />, name: "Manufacturing" },
                            { icon: <Shield className="w-6 h-6" />, name: "National Defense" }
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
                                <Layers className="w-3 h-3" /> STRATEGIC LATTICE
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                                Governance Meets <span className="text-oxot-gold">Intelligence</span>
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Gold Team consultants don't work in isolation. Every engagement is informed by the AEON Digital Twin—providing real-time threat intelligence, asset visibility, and predictive risk modeling that transforms advisory from reactive to proactive.
                            </p>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <Scale className="w-5 h-5 text-oxot-gold" />
                                    <span className="text-gray-400 text-sm">NIS2 / IEC 62443</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-oxot-gold" />
                                    <span className="text-gray-400 text-sm">Zero Trust Ready</span>
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
                                <span className="text-oxot-gold font-bold">LIVE:</span> Strategic Lattice Interconnect
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
