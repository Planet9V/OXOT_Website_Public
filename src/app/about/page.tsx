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

// ==================== LEADERSHIP DATA ====================
const LEADERSHIP = [
    {
        name: "Dr. Adriaan van der Berg",
        title: "Founder & CEO",
        bio: "Former NATO Cyber Command. 15+ years protecting European critical infrastructure. PhD in Computational Threat Modeling from TU Delft.",
        credibility: "Ex-NATO Cyber Command",
        image: null // Placeholder
    },
    {
        name: "Elena Kowalski",
        title: "Chief Technology Officer",
        bio: "Former Principal Engineer at a Fortune 50 defense contractor. Creator of the E27 Prediction Engine. Author of 12 patents in adversarial ML.",
        credibility: "12 Patents in AI/ML",
        image: null
    },
    {
        name: "Marcus Chen",
        title: "Chief Intelligence Officer",
        bio: "20 years in signals intelligence across Five Eyes nations. Pioneered psychometric profiling for cyber attribution. Fluent in Mandarin, Russian, Arabic.",
        credibility: "Ex-Five Eyes Intel",
        image: null
    },
    {
        name: "Ingrid Müller",
        title: "Chief Operations Officer",
        bio: "Former SOC Director for a European energy grid operator. Led incident response during multiple nation-state attacks. ICS/SCADA specialist.",
        credibility: "Grid Security Expert",
        image: null
    }
]

// ==================== MAIN COMPONENT ====================
export default function AboutPage() {
    const { t } = useTranslations()
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
                    <div className="text-xs font-mono text-white/60 uppercase tracking-[0.2em] mb-6">
                        Sovereign Intelligence // Amsterdam, Netherlands
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-gold-light via-oxot-gold to-yellow-600">OXOT</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                        From the heart of Europe, we build the <span className="text-white font-bold">immune system</span> for
                        the world's most critical infrastructure.
                    </p>

                    <div className="flex justify-center gap-6 mt-12">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400">
                            <MapPin size={14} className="text-oxot-blue" /> Amsterdam HQ
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400">
                            <Globe size={14} className="text-oxot-gold" /> Global Operations
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-gray-400">
                            <Shield size={14} className="text-oxot-red" /> 16 Critical Sectors
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
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Our Origin</h2>
                    <div className="text-xs font-mono text-gray-500">A MISSION, NOT A JOB</div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            OXOT was born from a simple but urgent truth: <span className="text-white font-bold">the world's critical infrastructure is incredibly fragile</span>—and AI is accelerating the risks toward a tipping point.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Two Netherlands natives and one American, we spent years working closely together across the globe—power grids, water treatment facilities, manufacturing plants, transportation networks. We saw firsthand how interconnected and vulnerable these systems really are.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            When AI arrived, we didn't see opportunity for replacement. We saw <span className="text-oxot-red-light font-medium">acceleration of risk</span>. A state change—potentially for the worse. We worry about reliable energy, clean water, and healthy food for our children and grandchildren. <span className="text-white font-medium">This is not a joke to us.</span>
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            So we came together with a different vision: <span className="text-white font-medium">enhance human expertise and capabilities, not replace them</span>. Use mathematics and formulas—the McKenney-Lacan Calculus—to shift from reactive to proactive. Analyze massive amounts of information to calculate probabilities. Focus not just on technology, but on <span className="text-oxot-gold font-medium">people and psychology</span>.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            We built <span className="text-oxot-blue font-bold">AEON</span>: our AI-powered Digital Twin with specialized subminds—Red, Blue, and Gold domains of expertise—and a curious nature. AEON exists to assist and complement our team and our customers, helping critical infrastructure organizations worldwide become <span className="text-white font-medium">anti-fragile</span>.
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
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white">The AEON Philosophy</h2>
                    <div className="text-xs font-mono text-gray-500">THINK CREATIVELY // ACT DECISIVELY</div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-oxot-blue/30 transition-colors">
                        <Eye className="text-oxot-blue mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-3">Predictive Over Reactive</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Traditional security waits for attacks. We simulate thousands of attack scenarios before
                            adversaries even begin reconnaissance. The Digital Twin sees what's coming.
                        </p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-oxot-red/30 transition-colors">
                        <Users className="text-oxot-red mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-3">Adversary Psychology</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            We profile threat actors like behavioral scientists. Understanding cognitive biases,
                            cultural patterns, and psychological triggers lets us predict their next move.
                        </p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-oxot-gold/30 transition-colors">
                        <Lock className="text-oxot-gold mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-3">Sovereign Control</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your data stays yours. EU-hosted, GDPR-native, with on-premise deployment options.
                            We believe critical infrastructure deserves digital sovereignty.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== LEADERSHIP TEAM ========== */}
            <section className="space-y-12">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Leadership</h2>
                    <div className="text-xs font-mono text-gray-500">THE HUMANS BEHIND THE TWIN</div>
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
