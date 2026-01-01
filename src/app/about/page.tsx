'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Shield, Target, Terminal, Building, Globe, MapPin, Users,
    CheckCircle, Award, Radio, Database, Zap, Eye, Lock, Heart,
    Linkedin, Mail, ArrowRight
} from 'lucide-react'
import ContactFormCTA from '@/components/ContactFormCTA'
import { useTranslations } from '@/i18n'
import GlobalPresenceMap from '@/components/GlobalPresenceMap'
import Link from 'next/link'

// Data moved inside component for translation access

// ==================== MAIN COMPONENT ====================
export default function AboutPage() {
    const { t } = useTranslations()

    const LEADERSHIP = [
        {
            name: t.about.leadership.roles.ceo.name,
            title: t.about.leadership.roles.ceo.title,
            bio: t.about.leadership.roles.ceo.bio,
            credibility: t.about.leadership.roles.ceo.credibility,
        },
        {
            name: t.about.leadership.roles.cto.name,
            title: t.about.leadership.roles.cto.title,
            bio: t.about.leadership.roles.cto.bio,
            credibility: t.about.leadership.roles.cto.credibility,
        },
        {
            name: t.about.leadership.roles.cio.name,
            title: t.about.leadership.roles.cio.title,
            bio: t.about.leadership.roles.cio.bio,
            credibility: t.about.leadership.roles.cio.credibility,
        },
        {
            name: t.about.leadership.roles.coo.name,
            title: t.about.leadership.roles.coo.title,
            bio: t.about.leadership.roles.coo.bio,
            credibility: t.about.leadership.roles.coo.credibility,
        }
    ]

    const VALUES = [
        { title: t.about.values.list.sovereignty.title, desc: t.about.values.list.sovereignty.desc, icon: Lock, color: 'text-oxot-gold', border: 'hover:border-oxot-gold/30' },
        { title: t.about.values.list.privacy.title, desc: t.about.values.list.privacy.desc, icon: Eye, color: 'text-oxot-blue', border: 'hover:border-oxot-blue/30' },
        { title: t.about.values.list.resilience.title, desc: t.about.values.list.resilience.desc, icon: Shield, color: 'text-oxot-red', border: 'hover:border-oxot-red/30' },
        { title: t.about.values.list.transparency.title, desc: t.about.values.list.transparency.desc, icon: CheckCircle, color: 'text-gray-200', border: 'hover:border-white/30' }
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-32 pb-20">

            {/* ========== HERO SECTION ========== */}
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* OXOT Logo */}
                    <motion.img
                        src="/Logos_OXOT_Gold_White/OXOT_GW_Dark.svg"
                        alt="OXOT"
                        className="h-24 md:h-32 mx-auto mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />

                    <div className="text-xs font-mono text-white/60 uppercase tracking-[0.2em] mb-6">
                        {t.about.hero.badge}
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8">
                        {t.about.hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-gold-light via-oxot-gold to-yellow-600">{t.about.hero.titleHighlight}</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                        {t.about.hero.description}
                    </p>

                    <div className="flex justify-center gap-6 mt-12">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400">
                            <MapPin size={14} className="text-oxot-blue" /> {t.about.hero.locations.hq}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400">
                            <Globe size={14} className="text-oxot-gold" /> {t.about.hero.locations.global}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400">
                            <Shield size={14} className="text-oxot-red" /> {t.about.hero.locations.sectors}
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 animate-bounce">
                    <div className="w-6 h-10 border-2 border-oxot-gold/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-oxot-gold rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* ========== ORIGIN STORY ========== */}
            <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white">{t.about.origin.title}</h2>
                    <div className="text-xs font-mono text-gray-500">{t.about.origin.subtitle}</div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {t.about.origin.p1}
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            {t.about.origin.p2}
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            {t.about.origin.p3}
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-oxot-blue/10 to-oxot-red/10 rounded-3xl blur-3xl"></div>
                        <div className="relative p-8 bg-black/60 border border-white/10 rounded-2xl space-y-6">
                            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">The Founding Conviction</div>
                            <blockquote className="text-2xl font-bold text-white leading-snug italic">
                                "Reliable energy, clean water, and healthy food for our grandchildren—that's what we're protecting. <span className="text-oxot-blue-light">AI should enhance human judgment, not replace it.</span>"
                            </blockquote>
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-oxot-blue to-oxot-blue-light flex items-center justify-center">
                                        <span className="text-white font-black text-sm">NL</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">Co-Founder</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-oxot-gold to-yellow-600 flex items-center justify-center">
                                        <span className="text-white font-black text-sm">NL</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">Co-Founder</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-oxot-red to-red-600 flex items-center justify-center">
                                        <span className="text-white font-black text-sm">US</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">Co-Founder</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== PHILOSOPHY: THE AEON MANIFESTO ========== */}
            <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white">{t.about.values.title}</h2>
                    <div className="text-xs font-mono text-gray-500">{t.about.values.subtitle}</div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {VALUES.map((value, i) => (
                        <div key={i} className={`p-8 bg-white/5 border border-white/10 rounded-2xl ${value.border} transition-colors`}>
                            <value.icon className={`${value.color} mb-4`} size={32} />
                            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {value.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== LEADERSHIP TEAM ========== */}
            <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white">{t.about.leadership.title}</h2>
                    <div className="text-xs font-mono text-gray-500">{t.about.leadership.subtitle}</div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {LEADERSHIP.map((leader, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all group"
                        >
                            {/* Avatar Placeholder */}
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-oxot-blue to-oxot-blue-light flex items-center justify-center">
                                <span className="text-white font-black text-2xl">
                                    {leader.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-oxot-blue-light transition-colors">{leader.name}</h3>
                                <p className="text-xs text-oxot-blue font-mono uppercase tracking-widest mb-3">{leader.title}</p>
                                <p className="text-xs text-gray-400 leading-relaxed mb-4">{leader.bio}</p>
                                <div className="inline-block px-3 py-1 bg-oxot-blue/10 text-oxot-blue-light text-[10px] font-mono uppercase rounded border border-oxot-blue/20">
                                    {leader.credibility}
                                </div>
                            </div>

                            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-white/10">
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-oxot-blue/20 transition-colors">
                                    <Linkedin size={14} className="text-gray-400" />
                                </button>
                                <button className="p-2 bg-white/5 rounded-lg hover:bg-oxot-blue/20 transition-colors">
                                    <Mail size={14} className="text-gray-400" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ========== GLOBAL PRESENCE (3D MAP) ========== */}
            <section className="space-y-8">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Global Presence</h2>
                        <p className="text-sm text-gray-400 mt-2">Distributed intelligence network spanning three continents.</p>
                    </div>
                    <div className="text-xs font-mono text-gray-500">DISTRIBUTED INTELLIGENCE</div>
                </div>

                {/* 3D Globe Map */}
                <GlobalPresenceMap />

                {/* Location Cards */}

            </section>

            {/* ========== ENGAGEMENT MODELS (SIMPLIFIED) ========== */}
            <section id="engagement" className="space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold uppercase tracking-tight text-white mb-4">Three Pathways to Sovereign Security</h2>
                    <p className="text-gray-400">
                        Choose the engagement that fits your operational maturity. Each pathway leads to a more resilient, anti-fragile organization.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* BLUE */}
                    <a href="#contact-cta" className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-oxot-blue/50 transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-oxot-blue/10 rounded-xl border border-oxot-blue/20">
                                <Shield className="text-oxot-blue-light group-hover:scale-110 transition-transform" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-oxot-blue">BLUE</h3>
                                <p className="text-oxot-blue-light/60 font-mono text-[10px] uppercase tracking-widest">Defense Operations</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Deploy autonomous defense systems that think faster than the adversary. Our Cognitive SOC integrates 293 real-time threat profiles to predict attacks before execution, transforming your security posture from reactive firefighting to pre-cognitive dominance.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {["SOC Enhancement", "Managed SOC", "Threat Hunting", "Detection Engineering"].map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light text-[10px] font-mono uppercase rounded">{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-oxot-blue font-bold text-sm group-hover:gap-4 transition-all">
                            Get Started <ArrowRight size={16} />
                        </div>
                    </a>

                    {/* GOLD */}
                    <a href="#contact-cta" className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-oxot-gold/50 transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-oxot-gold/10 rounded-xl border border-oxot-gold/20">
                                <Target className="text-oxot-gold group-hover:scale-110 transition-transform" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-oxot-gold">GOLD</h3>
                                <p className="text-yellow-200/60 font-mono text-[10px] uppercase tracking-widest">Strategic Advisory</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Align cybersecurity with business survival. We provide sovereign-grade architecture for critical infrastructure (IEC 62443), board-level governance, and M&A due diligence. Ensure your organization is resilient by design and compliant with global standards like NIS2.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {["IEC 62443", "M&A Due Diligence", "War Gaming", "Compliance"].map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-oxot-gold/10 text-oxot-gold text-[10px] font-mono uppercase rounded">{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-oxot-gold font-bold text-sm group-hover:gap-4 transition-all">
                            Get Started <ArrowRight size={16} />
                        </div>
                    </a>

                    {/* RED */}
                    <a href="#contact-cta" className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-oxot-red/50 transition-all">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-oxot-red/10 rounded-xl border border-oxot-red/20">
                                <Terminal className="text-oxot-red group-hover:scale-110 transition-transform" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-oxot-red">RED</h3>
                                <p className="text-red-200/60 font-mono text-[10px] uppercase tracking-widest">Offensive Security</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Face the reality of a state-sponsored attack before it happens. Red Leader Squadron utilizes AI-orchestrated offensives to stress-test your defenses to their breaking point. If there is a way in—physical, digital, or human—we will find it.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {["Pentesting", "APT Emulation", "Purple Team", "Crisis Simulation"].map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-oxot-red/10 text-oxot-red text-[10px] font-mono uppercase rounded">{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-oxot-red font-bold text-sm group-hover:gap-4 transition-all">
                            Get Started <ArrowRight size={16} />
                        </div>
                    </a>

                </div>

                {/* Arrow pointing down */}
                <div className="flex justify-center">
                    <div className="animate-bounce p-3 bg-white/5 border border-white/10 rounded-full">
                        <ArrowRight className="text-white rotate-90" size={20} />
                    </div>
                </div>
            </section>

            {/* ========== TRUST MARKERS ========== */}
            <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Trust & Compliance</h2>
                    <div className="text-xs font-mono text-gray-500">CERTIFICATIONS & STANDARDS</div>
                </div>

                <div className="grid md:grid-cols-5 gap-6">
                    {[
                        { title: "ISO 27001", desc: "Information Security Management" },
                        { title: "IEC 62443", desc: "Industrial Cybersecurity" },
                        { title: "NIS2", desc: "EU Network & Information Security" },
                        { title: "SOC 2 Type II", desc: "Security & Availability" },
                        { title: "GDPR Native", desc: "EU Data Sovereignty" },
                    ].map((cert, i) => (
                        <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
                            <Award className="text-oxot-gold mx-auto mb-3" size={28} />
                            <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                            <p className="text-xs text-gray-400">{cert.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
                    <p className="text-lg text-gray-300 font-light">
                        Trusted by organizations across <span className="text-white font-bold">16 critical infrastructure sectors</span> worldwide.
                    </p>
                    <div className="flex justify-center gap-8 mt-6 text-xs font-mono text-gray-500 uppercase tracking-widest">
                        <span>Energy</span>
                        <span>Water</span>
                        <span>Transportation</span>
                        <span>Healthcare</span>
                        <span>Defense</span>
                        <span>Manufacturing</span>
                    </div>
                </div>
            </section>

            {/* ========== CTA ========== */}
            <div id="contact-cta">
                <ContactFormCTA
                    variant="blue"
                    headline={t.about.cta.headline}
                    subheadline={t.about.cta.subheadline}
                    serviceOptions={[
                        { value: 'blue', label: t.about.cta.serviceOptions.blue, color: 'cyan' },
                        { value: 'gold', label: t.about.cta.serviceOptions.gold, color: 'yellow' },
                        { value: 'red', label: t.about.cta.serviceOptions.red, color: 'red' },
                        { value: 'other', label: t.about.cta.serviceOptions.general, color: 'gray' }
                    ]}
                />
            </div>

        </div>
    )
}
