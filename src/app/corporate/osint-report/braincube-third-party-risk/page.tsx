'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, AlertTriangle, Shield, Cpu, Lock, Target,
    Zap, Network, Server, Bug, FileWarning, CheckCircle2
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// BRAINCUBE THIRD-PARTY RISK PAGE
// Complete content from OFI_Braincube_third-party risk.md (109 lines)
// =============================================================================

const ATTACK_VECTORS = [
    {
        title: 'AI Model Poisoning',
        icon: <Bug size={20} />,
        description: 'Adversaries could manipulate the machine learning models that drive setpoint recommendations, causing subtle quality degradation over time.',
        severity: 'HIGH',
        color: 'text-red-400'
    },
    {
        title: 'Command Injection to PLCs',
        icon: <Cpu size={20} />,
        description: 'Braincube\'s direct write-access to PLCs could be exploited to inject malicious commands that alter production parameters.',
        severity: 'CRITICAL',
        color: 'text-red-500'
    },
    {
        title: 'Data Exfiltration',
        icon: <FileWarning size={20} />,
        description: 'Proprietary cocoa formulas, roasting profiles, and processing parameters could be stolen via the cloud connection.',
        severity: 'HIGH',
        color: 'text-orange-400'
    },
    {
        title: 'Supply Chain Attack',
        icon: <Network size={20} />,
        description: 'A SolarWinds-style attack through Braincube\'s software update mechanism could compromise multiple facilities simultaneously.',
        severity: 'CRITICAL',
        color: 'text-red-500'
    }
];

const RISK_FRAMING = [
    {
        question: 'What happens if Braincube\'s AI is compromised?',
        answer: 'A poisoned model could push harmful setpoints (e.g., wrong temperatures) to PLCs, causing yield loss, quality defects, or even safety incidents.',
        icon: <AlertTriangle size={18} />
    },
    {
        question: 'Who else is using Braincube?',
        answer: 'Braincube is used across multiple food/CPG manufacturers. A breach at one customer could expose attack patterns applicable to ofi.',
        icon: <Network size={18} />
    },
    {
        question: 'Is ofi auditing Braincube\'s security posture?',
        answer: 'Under NIS2, ofi is legally required to ensure supply chain security. This includes mandatory security assessments of critical third parties like Braincube.',
        icon: <Shield size={18} />
    }
];

const MITIGATIONS = [
    {
        title: 'Third-Party Security Assessment',
        description: 'Conduct IEC 62443-based audit of Braincube\'s security architecture and development practices.',
        priority: 'IMMEDIATE'
    },
    {
        title: 'Network Segmentation',
        description: 'Implement data diodes or unidirectional security gateways between Braincube edge devices and critical PLC networks.',
        priority: 'HIGH'
    },
    {
        title: 'Anomaly Detection',
        description: 'Deploy OT-specific behavioral analytics to detect abnormal setpoint changes pushed from Braincube AI.',
        priority: 'HIGH'
    },
    {
        title: 'Incident Response Plan',
        description: 'Develop Braincube-specific playbook for isolating the platform if compromise is detected.',
        priority: 'MEDIUM'
    },
    {
        title: 'Contractual Security Requirements',
        description: 'Negotiate security SLAs including penetration testing reports, SOC 2 Type II attestation, and breach notification timelines.',
        priority: 'MEDIUM'
    }
];

export default function BraincubeThirdPartyRiskPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            {/* Navigation Menu */}
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-black/60 border-b border-red-500/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <AlertTriangle className="text-red-400" size={16} />
                    <span className="text-red-400 font-mono text-xs tracking-widest">
                        OSINT // SENSITIVE // THIRD-PARTY RISK ASSESSMENT
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: OFI_Braincube_third-party risk.md</span>
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
                        <AlertTriangle className="text-red-400" size={24} />
                        <span className="text-red-400 text-xs font-mono tracking-[0.3em]">
                            CRITICAL RISK ASSESSMENT
                        </span>
                    </div>

                    <PageHeader
                        title="Braincube Third-Party Risk"
                        subtitle="OT Attack Vector Analysis & Mitigation Strategy"
                        variant="hero"
                        accent="gold"
                    />

                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg max-w-3xl">
                        <p className="text-grey leading-relaxed">
                            <span className="text-oxot-gold font-bold">STRATEGIC FRAMING:</span> This document frames
                            <span className="text-red-400 font-semibold"> Braincube</span> as a unique security insight
                            that positions OXOT as a differentiated partner. No other SOC provider has publicly highlighted
                            this specific third-party risk in the context of ofi's operations.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* What is Braincube Section */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Cpu className="text-orange-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">
                            WHAT IS BRAINCUBE AND WHAT DOES IT TOUCH?
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-orange-400 font-mono text-sm mb-4">TECHNOLOGY OVERVIEW</h3>
                            <div className="space-y-4 text-grey text-sm leading-relaxed">
                                <p>
                                    <span className="text-white font-semibold">Braincube</span> is a French Industrial IoT
                                    platform specializing in manufacturing optimization through AI/ML. It deploys edge
                                    computing nodes within OT networks to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 pl-4">
                                    <li>Collect real-time data from SCADA systems and PLCs</li>
                                    <li>Create "Product Clone" digital twins of production batches</li>
                                    <li>Run CrossRank AI algorithms to identify optimal setpoints</li>
                                    <li><span className="text-red-400 font-semibold">Push recommended setpoints directly to PLCs</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500">
                            <h3 className="text-red-400 font-mono text-sm mb-4">CRITICAL ACCESS POINTS</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Server className="text-red-400 mt-1" size={18} />
                                    <div>
                                        <p className="text-white font-semibold text-sm">Direct PLC Access</p>
                                        <p className="text-grey text-xs">
                                            Braincube has write-access to Rockwell ControlLogix and Siemens S7 PLCs
                                            controlling critical cocoa roasting and tempering processes.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Network className="text-orange-400 mt-1" size={18} />
                                    <div>
                                        <p className="text-white font-semibold text-sm">Cloud Connectivity</p>
                                        <p className="text-grey text-xs">
                                            Edge nodes maintain persistent connections to Braincube's cloud platform
                                            for model updates and analytics.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Zap className="text-yellow-400 mt-1" size={18} />
                                    <div>
                                        <p className="text-white font-semibold text-sm">Production Impact</p>
                                        <p className="text-grey text-xs">
                                            Reported 6.5% yield increase and 25% throughput improvement at ofi's
                                            flagship cocoa facility — demonstrating production-critical integration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Attack Vectors Section */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Target className="text-red-500" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">
                            WHY THIS IS A HIGH-VALUE ATTACK VECTOR
                        </h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        The combination of <span className="text-red-400">direct PLC access</span>,
                        <span className="text-orange-400"> cloud connectivity</span>, and
                        <span className="text-yellow-400"> AI-driven decision-making</span> creates
                        a uniquely attractive target for sophisticated adversaries.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {ATTACK_VECTORS.map((vector, i) => (
                            <motion.div
                                key={vector.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg bg-red-500/10 ${vector.color}`}>
                                        {vector.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-white font-semibold">{vector.title}</h3>
                                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${vector.severity === 'CRITICAL'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-orange-500/20 text-orange-400'
                                                }`}>
                                                {vector.severity}
                                            </span>
                                        </div>
                                        <p className="text-grey text-sm leading-relaxed">
                                            {vector.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Risk Framing Section */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">
                            HOW TO FRAME THIS RISK TO THE CUSTOMER
                        </h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        When positioning this insight with ofi stakeholders, frame the conversation around
                        proactive risk management rather than fear:
                    </p>

                    <div className="space-y-4">
                        {RISK_FRAMING.map((frame, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-oxot-gold/10 text-oxot-gold">
                                        {frame.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-oxot-gold font-semibold mb-2">"{frame.question}"</h4>
                                        <p className="text-grey text-sm leading-relaxed">{frame.answer}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Vendor Comparison / Mitigation Section */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <CheckCircle2 className="text-emerald-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">
                            MITIGATION RECOMMENDATIONS
                        </h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        OXOT's recommended approach positions security controls that protect the Braincube integration
                        while preserving operational benefits:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MITIGATIONS.map((mit, i) => (
                            <motion.div
                                key={mit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-5 rounded-lg bg-white/5 border border-white/10"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${mit.priority === 'IMMEDIATE'
                                        ? 'bg-red-500/20 text-red-400'
                                        : mit.priority === 'HIGH'
                                            ? 'bg-orange-500/20 text-orange-400'
                                            : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {mit.priority}
                                    </span>
                                </div>
                                <h4 className="text-white font-semibold mb-2">{mit.title}</h4>
                                <p className="text-grey text-xs leading-relaxed">{mit.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* IEC 62443 Alignment */}
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-emerald-400" size={20} />
                            <h4 className="text-white font-bold">IEC 62443 Alignment</h4>
                        </div>
                        <p className="text-grey text-sm leading-relaxed mb-4">
                            All mitigations align with <span className="text-emerald-400 font-semibold">IEC 62443</span> standards
                            for industrial automation security:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-3 bg-black/40 rounded-lg">
                                <p className="text-emerald-400 font-mono text-xs mb-1">62443-2-4</p>
                                <p className="text-grey text-[10px]">Security program requirements for IACS service providers</p>
                            </div>
                            <div className="p-3 bg-black/40 rounded-lg">
                                <p className="text-emerald-400 font-mono text-xs mb-1">62443-3-3</p>
                                <p className="text-grey text-[10px]">System security requirements and security levels</p>
                            </div>
                            <div className="p-3 bg-black/40 rounded-lg">
                                <p className="text-emerald-400 font-mono text-xs mb-1">62443-4-1</p>
                                <p className="text-grey text-[10px]">Secure product development lifecycle requirements</p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • Third-Party Risk Assessment
                    </div>
                    <div>
                        <span className="text-red-400">END OF REPORT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
