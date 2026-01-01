'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, ChevronDown, ShieldAlert, BadgeAlert, Layers,
    Database, Activity, Lock, Eye, Server, Cpu, Globe,
    Codesandbox, Terminal, AlertTriangle, FileText
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// NIS2 REQUIREMENTS & PANOPTICON PROTOCOL PAGE
// Content from NIS2.md
// =============================================================================

interface AccordionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function Accordion({ title, icon, children, defaultOpen = false }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-white/10 rounded-xl overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="text-cyan-400">{icon}</div>
                    <span className="text-white font-semibold text-left">{title}</span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="text-grey" size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-black/40 border-t border-white/5">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function NIS2RequirementsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-red-950/30 border-b border-red-500/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ShieldAlert className="text-red-500" size={16} />
                    <span className="text-red-500 font-mono text-xs tracking-widest">
                        OSINT // REGULATORY COMPLIANCE // NIS2 DIRECTIVE
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: NIS2.md (Panopticon Protocol)</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="min-h-[60vh] flex flex-col justify-center px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <Link href="/corporate/osint-report" className="inline-flex items-center gap-2 text-grey hover:text-white text-sm mb-6 transition-colors">
                        <ChevronLeft size={16} />
                        Back to OSINT Report
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Eye className="text-cyan-400" size={24} />
                        <span className="text-cyan-400 text-xs font-mono tracking-[0.3em]">THE PANOPTICON PROTOCOL</span>
                    </div>

                    <PageHeader
                        title="NIS2 Supply Chain Compliance Architecture"
                        subtitle="Deep OSINT & Industrial-Grade Visualization for the All-Hazards Doctrine"
                        variant="hero"
                        accent="red"
                    />

                    <div className="mt-8 max-w-4xl">
                        <p className="text-grey leading-relaxed text-lg">
                            The European Union has enacted the <span className="text-white font-semibold">NIS2 Directive (Directive (EU) 2022/2555)</span>,
                            fundamentally altering the liability landscape for essential entities. This report details the
                            <span className="text-cyan-400 font-mono mx-2">Panopticon Protocol</span>—a next-generation threat intelligence architecture
                            combining Deep OSINT tradecraft with industrial clean engineering to meet Article 21's strict supply chain security mandates.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 1: The Strategic Imperative */}
            <section className="px-6 lg:px-16  py-16 bg-red-900/5 border-y border-red-500/10">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <BadgeAlert className="text-red-500" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">1. STRATEGIC IMPERATIVE: THE "ALL-HAZARDS" DOCTRINE</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500">
                            <h3 className="text-red-400 font-bold mb-4">Article 21: Supply Chain Security</h3>
                            <p className="text-grey text-sm mb-4">
                                NIS2 Article 21 is the operational core of the directive. It explicitly obliges entities to manage security-related aspects
                                concerning relationships with direct suppliers. This implies a mandate for deep visibility:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-white">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                                    <span><span className="font-bold text-red-400">Map the Dependency Graph:</span> Identifying Tier 2 and Tier 3 digital dependencies.</span>
                                </li>
                                <li className="flex gap-3 text-sm text-white">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                                    <span><span className="font-bold text-red-400">Assess Overall Quality:</span> Moving beyond ISO certifications to technical verification (patching, encryption, BGP stability).</span>
                                </li>
                                <li className="flex gap-3 text-sm text-white">
                                    <div className="min-w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                                    <span><span className="font-bold text-red-400">Continuous Monitoring:</span> Real-time vigilance against technical failures and malicious attacks.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                                <h4 className="text-oxot-gold font-mono text-sm mb-2">VS. LEGACY VRM</h4>
                                <p className="text-grey text-sm">
                                    Traditional Vendor Risk Management (VRM) is "compliance theater"—relying on spreadsheets where vendors self-attest to security.
                                    <span className="text-white block mt-2 font-semibold">Deep OSINT captures reality.</span>
                                    It doesn't ask if data is encrypted; it scans the TLS handshake to verify it.
                                </p>
                            </div>
                            <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                                <h4 className="text-cyan-400 font-mono text-sm mb-2">THE DEEP OSINT VALUE PROP</h4>
                                <ul className="grid grid-cols-2 gap-2 text-xs text-grey font-mono">
                                    <li className="flex items-center gap-2"><Globe size={12} /> Routing Signals (BGP)</li>
                                    <li className="flex items-center gap-2"><Server size={12} /> Infrastructure Signals</li>
                                    <li className="flex items-center gap-2"><Codesandbox size={12} /> Application Signals</li>
                                    <li className="flex items-center gap-2"><Lock size={12} /> Dark Web Signals</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>



            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • Regulatory Compliance
                    </div>
                    <div>
                        <span className="text-red-400">NIS2 DIRECTIVE</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
