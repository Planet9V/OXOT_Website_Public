'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, Network, Shield, Cpu, Brain, Leaf,
    AlertTriangle, Lock, Building2, User, Server, Zap
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// AI PARTNERSHIPS PAGE - Complete content from OFI_Cybersecurity_AI_partnerships.md
// =============================================================================

const AI_PARTNERS = [
    {
        name: 'Mindsprint',
        category: 'AI Engine',
        icon: <Brain size={24} />,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
        description: 'Originally Olam Group\'s internal IT division, Mindsprint is now a standalone partner that serves as ofi\'s primary digital engine. They have developed proprietary Generative AI (GenAI) applications, including a multi-lingual omnichannel conversational assistant for employees in remote plantations and an intelligent manufacturing AI-cloud platform that optimizes production quality by suggesting mathematically validated setpoints.'
    },
    {
        name: 'Braincube',
        category: 'Industrial IoT',
        icon: <Cpu size={24} />,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        description: 'ofi has a strategic partnership with this French Industrial IoT provider to deploy "Product Clone" digital twin technology and AI at its flagship cocoa plants. Braincube\'s CrossRank AI algorithm analyzes thousands of variables to prescribe optimal setpoints directly to production lines, resulting in a 6.5% yield increase and a 25% improvement in throughput.'
    },
    {
        name: 'Ai Palette',
        category: 'Consumer Foresight',
        icon: <Network size={24} />,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        description: 'ofi partners with this Singapore-based AI startup to power its consumer foresight engine. The platform uses AI to analyze social media, e-commerce, and reviews across 21 countries and 16 languages to predict flavor and category trends, which informs product development at ofi\'s Customer Solution Centers.'
    },
    {
        name: 'Brightseed',
        category: 'Biosciences AI',
        icon: <Leaf size={24} />,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        description: 'ofi Spices collaborates with this biosciences data company to utilize its Forager® AI platform. This AI researches complex molecular structures in black pepper to identify bioactive compounds and their potential health benefits.'
    },
    {
        name: 'SAP (Joule)',
        category: 'Enterprise AI',
        icon: <Server size={24} />,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/30',
        description: 'ofi uses SAP S/4HANA with the Joule AI co-pilot as its enterprise-level AI layer. This system is integrated with manufacturing execution systems to provide predictive maintenance and automated quality control for cocoa roasting and dairy pasteurization.'
    },
    {
        name: 'Beewise',
        category: 'Robotics AI',
        icon: <Zap size={24} />,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        description: 'In its California almond orchards, ofi has replaced thousands of traditional hives with the BeeHome™, an AI and robotics-powered hive that provides automated, remote beekeeping to protect pollinators.'
    },
    {
        name: 'Terrascope',
        category: 'Carbon AI',
        icon: <Leaf size={24} />,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        description: 'An Olam-incubated venture, this SaaS platform uses machine learning and data science to measure Scope 3 greenhouse gas emissions across ofi\'s complex supply chains.'
    }
];

const CYBER_PARTNERS = [
    {
        name: 'Mindsprint (MSSP)',
        role: 'Managed Security Service Provider',
        icon: <Shield size={20} />,
        color: 'text-blue-400',
        description: 'Mindsprint acts as ofi\'s MSSP, managing its security operations center (SOC) and cyber defense strategies.'
    },
    {
        name: 'GuardianEye',
        role: 'AI-Powered Security Platform',
        icon: <Network size={20} />,
        color: 'text-cyan-400',
        description: 'Mindsprint provides ofi with GuardianEye, an AI-powered cybersecurity platform that offers external attack surface management and 24/7 proactive threat detection.'
    },
    {
        name: 'Claroty & Nozomi Networks',
        role: 'OT Security Specialists',
        icon: <Lock size={20} />,
        color: 'text-red-400',
        description: 'Because ofi operates 120+ facilities with heavy industrial assets, it leverages specialized OT security tools likely from partners such as Claroty or Nozomi Networks to monitor industrial control systems (ICS) and protect the IT/OT boundary.'
    },
    {
        name: 'Fortinet & Dynatrace',
        role: 'Network Security & Observability',
        icon: <Server size={20} />,
        color: 'text-orange-400',
        description: 'These vendors are identified as key components of the broader cybersecurity ecosystem for network security and observability.'
    },
    {
        name: 'Imperva',
        role: 'Application & Edge Security',
        icon: <Shield size={20} />,
        color: 'text-purple-400',
        description: 'ofi utilizes Imperva for application and edge security, protecting its digital platforms from external threats.'
    },
    {
        name: 'Nutanix',
        role: 'Micro-segmentation & HA',
        icon: <Building2 size={20} />,
        color: 'text-emerald-400',
        description: 'ofi uses the Nutanix Cloud Platform and Nutanix Flow to achieve high availability and implement micro-segmentation, which prevents lateral movement of cyber threats between IT and OT zones.'
    }
];

export default function AIPartnershipsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            {/* Navigation Menu */}
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-black/60 border-b border-violet-500/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-violet-400 font-mono text-xs tracking-widest">
                        OSINT // UNCLASSIFIED // TECHNOLOGY PARTNERSHIPS
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: OFI_Cybersecurity_AI_partnerships.md</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="min-h-[50vh] flex flex-col justify-center px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <Link
                        href="/corporate/osint-report"
                        className="inline-flex items-center gap-2 text-grey hover:text-white text-sm mb-6 transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Back to OSINT Report
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Network className="text-violet-400" size={24} />
                        <span className="text-violet-400 text-xs font-mono tracking-[0.3em]">
                            STRATEGIC INTELLIGENCE REPORT
                        </span>
                    </div>

                    <PageHeader
                        title="AI & Cybersecurity Partnerships"
                        subtitle="ofi Technology Partner Ecosystem Analysis"
                        variant="hero"
                        accent="blue"
                    />

                    <p className="text-grey max-w-3xl mt-6 leading-relaxed">
                        This strategic intelligence report, prepared by <span className="text-oxot-gold font-semibold">OXOT</span>,
                        identifies the primary technology partners and internal entities responsible for the
                        <span className="text-violet-400"> Artificial Intelligence (AI)</span> and
                        <span className="text-cyan-400"> Cybersecurity</span> architecture of
                        <span className="text-white font-semibold"> olam food ingredients (ofi)</span>.
                        Under its "Hyper everything" digital mandate, ofi has transitioned from a traditional
                        agribusiness to a tech-enabled solutions provider, leveraging a complex ecosystem of
                        startups and enterprise leaders.
                    </p>
                </ScrollReveal>
            </section>

            {/* AI Partnerships Section */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Brain className="text-violet-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">
                            I. ARTIFICIAL INTELLIGENCE (AI) PARTNERSHIPS
                        </h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        ofi utilizes AI across its entire "plant-to-palate" value chain, ranging from consumer trend
                        prediction to industrial process optimization.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {AI_PARTNERS.map((partner, i) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-6 rounded-xl border ${partner.borderColor} ${partner.bgColor} backdrop-blur-sm`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${partner.bgColor} ${partner.color}`}>
                                        {partner.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-white font-bold text-lg">{partner.name}</h3>
                                            <span className={`text-[10px] px-2 py-0.5 rounded ${partner.bgColor} ${partner.color} font-mono`}>
                                                {partner.category}
                                            </span>
                                        </div>
                                        <p className="text-grey text-sm leading-relaxed">
                                            {partner.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Cybersecurity Partnerships Section */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="text-cyan-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">
                            II. CYBERSECURITY PARTNERSHIPS AND INFRASTRUCTURE
                        </h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        ofi treats cybersecurity as a board-level governance priority, particularly as it prepares
                        for its London Stock Exchange IPO and navigates the <span className="text-red-400 font-semibold">EU NIS2 Directive</span>.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CYBER_PARTNERS.map((partner, i) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={partner.color}>{partner.icon}</span>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm">{partner.name}</h4>
                                        <span className="text-grey text-[10px] font-mono">{partner.role}</span>
                                    </div>
                                </div>
                                <p className="text-grey text-xs leading-relaxed">
                                    {partner.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Strategic Leadership */}
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                        <div className="flex items-center gap-3 mb-3">
                            <User className="text-cyan-400" size={20} />
                            <h4 className="text-white font-bold">Strategic Leadership</h4>
                        </div>
                        <p className="text-grey text-sm">
                            The internal cybersecurity posture is led by <span className="text-cyan-400 font-semibold">Felix Mathew</span> (Deputy CISO),
                            who oversees the integration of these third-party security services with ofi's manufacturing reality.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Strategic Alignment Section */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <AlertTriangle className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">
                            III. STRATEGIC ALIGNMENT AND CYBER RISKS
                        </h2>
                    </div>

                    <div className="glass-panel p-8 rounded-xl border-l-4 border-l-oxot-gold">
                        <p className="text-grey leading-relaxed mb-6">
                            ofi's technology partners are increasingly focused on the "Compliance Cliff," specifically
                            the <span className="text-red-400 font-semibold">EU Deforestation Regulation (EUDR)</span> 2025 deadline.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <h5 className="text-emerald-400 font-mono text-sm mb-2">TRACT</h5>
                                <p className="text-grey text-xs">
                                    A traceability venture co-founded by Olam, critical for providing the tamper-proof
                                    data integrity required to avoid export bans and regulatory penalties.
                                </p>
                            </div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <h5 className="text-blue-400 font-mono text-sm mb-2">AtSource</h5>
                                <p className="text-grey text-xs">
                                    Platform critical for providing the tamper-proof data integrity required to
                                    avoid export bans and regulatory penalties under EUDR compliance.
                                </p>
                            </div>
                        </div>

                        {/* Critical Finding Alert */}
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-red-400 mt-0.5" size={18} />
                                <div>
                                    <h5 className="text-red-400 font-semibold text-sm mb-2">
                                        OXOT CRITICAL FINDING
                                    </h5>
                                    <p className="text-grey text-sm leading-relaxed">
                                        <span className="text-oxot-gold font-semibold">OXOT</span> has identified that
                                        the deep integration of third-party AI platforms like <span className="text-orange-400">Braincube</span> creates a
                                        high-value attack vector, necessitating specialized audits to ensure these AI
                                        recommendations do not become backdoors for industrial sabotage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • AI Partnership Analysis
                    </div>
                    <div>
                        <span className="text-violet-400">END OF REPORT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
