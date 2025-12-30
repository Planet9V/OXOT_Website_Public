'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Shield, Globe, AlertTriangle, CheckCircle, ChevronDown,
    Building2, Scale, Calendar, FileText, Users, Briefcase,
    Target, Layers, Lock, Activity, Award, Clock
} from 'lucide-react'
import { GlowCard } from '@/components/ui/GlowCard'
import TelemetryTicker from '@/components/TelemetryTicker'
import ContactFormCTA from '@/components/ContactFormCTA'

import dynamic from 'next/dynamic'

// Dynamic imports for heavy components
const NIS2EuropeGlobe = dynamic(() => import('@/components/NIS2EuropeGlobe'), { ssr: false })
const NIS2RequirementsGrid = dynamic(() => import('@/components/NIS2RequirementsGrid'), { ssr: false })
const NIS2SectorMatrix = dynamic(() => import('@/components/NIS2SectorMatrix'), { ssr: false })
const NIS2PenaltiesChart = dynamic(() => import('@/components/NIS2PenaltiesChart'), { ssr: false })
const NIS2ComplianceTimeline = dynamic(() => import('@/components/NIS2ComplianceTimeline'), { ssr: false })

// OXOT Services for NIS2
const OXOT_SERVICES = [
    {
        icon: Target,
        title: 'Gap Assessment & Readiness',
        description: 'Comprehensive evaluation of your current cybersecurity posture against NIS2 requirements',
        color: '#3B82F6' // Blue
    },
    {
        icon: FileText,
        title: 'Policy & Procedure Development',
        description: 'Development of compliant security policies, procedures, and governance frameworks',
        color: '#22c55e'
    },
    {
        icon: Lock,
        title: 'Technical Implementation',
        description: 'Deployment of security controls, monitoring systems, and protective measures',
        color: '#3b82f6'
    },
    {
        icon: Activity,
        title: 'Incident Response Program',
        description: 'Building and testing incident detection, response, and notification capabilities',
        color: '#D4AF37' // Gold (was red)
    },
    {
        icon: Layers,
        title: 'Supply Chain Risk Management',
        description: 'Assessment and management of third-party and supplier security risks',
        color: '#f59e0b'
    },
    {
        icon: Award,
        title: 'Audit & Certification Support',
        description: 'Preparation for regulatory audits and compliance certification',
        color: '#d4af37'
    }
]

// Why OXOT differentiators
const DIFFERENTIATORS = [
    { stat: '15+', label: 'Years OT/ICS Security Experience' },
    { stat: 'IEC 62443', label: 'Certified Expertise' },
    { stat: '50+', label: 'Critical Infrastructure Clients' },
    { stat: '24/7', label: 'Incident Response Capability' }
]

export default function NIS2Page() {
    return (
        <div className="min-h-screen bg-transparent text-gray-100 relative">

            {/* TELEMETRY TICKER */}
            <div className="fixed bottom-0 left-0 right-0 z-[100]">
                <TelemetryTicker />
            </div>

            {/* HERO SECTION */}
            <section className="h-screen flex flex-col justify-center items-center relative px-6 text-center">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-mono tracking-[0.2em] mb-8 uppercase"
                    >
                        <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse"></span>
                        EU NIS2 Directive Compliance
                    </motion.div>

                    {/* Large Typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-12"
                    >
                        The <span className="text-transparent bg-clip-text bg-gradient-to-br from-oxot-blue to-blue-300">EU Cybersecurity</span><br />
                        <span className="text-oxot-gold">Mandate.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mb-12"
                    >
                        The Network and Information Security Directive 2 (NIS2) is the EU's most comprehensive
                        cybersecurity legislation. Non-compliance means massive fines and personal liability for executives.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid md:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-12"
                    >
                        <div className="space-y-4 relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-4xl font-black text-white group-hover:text-oxot-blue transition-colors">18</div>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Critical sectors covered across <strong className="text-white">two annexes</strong>.
                            </p>
                        </div>
                        <div className="space-y-4 relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-4xl font-black text-white group-hover:text-red-500 transition-colors">€10M</div>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Maximum fines or <strong className="text-white">2% of global turnover</strong>.
                            </p>
                        </div>
                        <div className="space-y-4 relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-4xl font-black text-white group-hover:text-yellow-400 transition-colors">Oct 2024</div>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Full enforcement <strong className="text-white">deadline passed</strong>.
                            </p>
                        </div>
                        <div className="space-y-4 relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-4xl font-black text-white group-hover:text-oxot-blue transition-colors">160K+</div>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Entities now <strong className="text-white">in scope</strong> across EU.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
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

            {/* SCROLLING CONTENT SECTIONS */}
            <div className="max-w-7xl mx-auto px-6 space-y-32 pb-32">

                {/* SECTION 1: Overview */}

                <section id="overview">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Understanding the Directive
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">What is NIS2?</h2>
                    </div>
                    <OverviewContent />
                </section>


                {/* SECTION 2: Europe Map */}

                <section id="europe-map">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Implementation Status Across EU
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Transposition Map</h2>
                    </div>
                    <div className="mt-8">
                        <NIS2EuropeGlobe />
                    </div>
                </section>


                {/* SECTION 3: Requirements Grid */}

                <section id="requirements">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Article 21 Obligations
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Security Measures</h2>
                    </div>
                    <div className="mt-8">
                        <NIS2RequirementsGrid />
                    </div>
                </section>


                {/* SECTION 4: Sector Coverage */}

                <section id="sectors">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-blue-light text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Who Must Comply
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Sectors in Scope</h2>
                    </div>
                    <div className="mt-8">
                        <NIS2SectorMatrix />
                    </div>
                </section>


                {/* SECTION 5: Penalties */}

                <section id="penalties">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Scale className="w-4 h-4" />
                            The Cost of Non-Compliance
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Penalties & Sanctions</h2>
                    </div>
                    <div className="mt-8">
                        <NIS2PenaltiesChart />
                    </div>
                </section>


                {/* SECTION 6: Compliance Timeline */}

                <section id="timeline">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Your Implementation Roadmap
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Compliance Timeline</h2>
                    </div>
                    <div className="mt-8">
                        <NIS2ComplianceTimeline />
                    </div>
                </section>


                {/* SECTION 7: OXOT Services */}

                <section id="services">
                    <div className="mb-12 border-b border-oxot-gold/30 pb-6">
                        <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Your Compliance Partner
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">OXOT NIS2 Services</h2>
                    </div>

                    {/* Why OXOT */}
                    <div className="grid md:grid-cols-4 gap-4 mb-12">
                        {DIFFERENTIATORS.map((diff, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 bg-oxot-gold/5 border border-oxot-gold/20 rounded-xl"
                            >
                                <div className="text-3xl font-black text-oxot-gold mb-2">{diff.stat}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">{diff.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Service Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {OXOT_SERVICES.map((service, i) => {
                            const Icon = service.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <GlowCard className="p-6 h-full" glowColor={`${service.color}30`}>
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                            style={{ backgroundColor: `${service.color}20` }}
                                        >
                                            <Icon size={24} style={{ color: service.color }} />
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                                        <p className="text-gray-400 text-sm">{service.description}</p>
                                    </GlowCard>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* IEC 62443 Cross-sell */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-oxot-gold/10 to-yellow-500/10 border border-oxot-gold/30 rounded-xl">
                        <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
                            <div className="w-12 h-12 rounded-xl bg-oxot-gold/20 flex items-center justify-center flex-shrink-0">
                                <Shield size={24} className="text-oxot-gold" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg mb-2">NIS2 + IEC 62443 = Complete OT Security</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    NIS2 compliance is enhanced by IEC 62443 certification. Our integrated approach covers both
                                    regulatory compliance and industrial security best practices, providing defense-in-depth
                                    for your critical infrastructure.
                                </p>
                                <a
                                    href="/iec62443"
                                    className="inline-flex items-center gap-2 text-oxot-gold text-sm font-medium hover:underline"
                                >
                                    Explore IEC 62443 Services →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>


                {/* CTA Section */}

                <section>
                    <ContactFormCTA
                        variant="blue"
                        headline="Ready for NIS2 Compliance?"
                        subheadline="Don't wait for enforcement action. Get expert guidance to achieve and maintain compliance."
                        serviceOptions={[
                            { value: 'nis2-assessment', label: 'NIS2 Gap Assessment', color: 'blue' },
                            { value: 'nis2-implementation', label: 'Full Implementation Program', color: 'gold' },
                            { value: 'nis2-audit', label: 'Audit Preparation', color: 'blue' }
                        ]}
                    />
                </section>

            </div>
        </div>
    )
}


// ==================== OVERVIEW CONTENT ====================
const OverviewContent = () => (
    <div className="grid lg:grid-cols-2 gap-8">
        {/* The Challenge */}
        <GlowCard className="p-8" glowColor="rgba(220, 38, 38, 0.15)">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <AlertTriangle className="text-red-500" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">The Challenge</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Why NIS2 Exists</p>
                </div>
            </div>
            <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                    <span className="text-red-500 text-lg">•</span>
                    <span>Fragmented cybersecurity laws across EU member states</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-red-500 text-lg">•</span>
                    <span>Increasing cyber attacks on critical infrastructure</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-red-500 text-lg">•</span>
                    <span>Supply chain vulnerabilities exposing entire sectors</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-red-500 text-lg">•</span>
                    <span>Inconsistent incident reporting and response</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-red-500 text-lg">•</span>
                    <span>Lack of executive accountability for cybersecurity</span>
                </li>
            </ul>
        </GlowCard>

        {/* The Solution */}
        <GlowCard className="p-8" glowColor="rgba(59, 130, 246, 0.15)">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-oxot-blue/20 border border-oxot-blue/30 flex items-center justify-center">
                    <Shield className="text-oxot-blue" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">The Solution</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">NIS2 Directive</p>
                </div>
            </div>
            <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-blue flex-shrink-0 mt-0.5" size={16} />
                    <span>Harmonized cybersecurity baseline across all 27 EU states</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-blue flex-shrink-0 mt-0.5" size={16} />
                    <span>Expanded scope covering 18 critical sectors</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-blue flex-shrink-0 mt-0.5" size={16} />
                    <span>Mandatory supply chain security requirements</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-blue flex-shrink-0 mt-0.5" size={16} />
                    <span>Strict incident reporting: 24h/72h/30d deadlines</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-blue flex-shrink-0 mt-0.5" size={16} />
                    <span>Personal liability for management and board members</span>
                </li>
            </ul>
        </GlowCard>
    </div>
)
