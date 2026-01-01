'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, ChevronDown, CheckSquare, FileText, Settings, Shield,
    Lock, LayoutTemplate, Briefcase, Table, AlertTriangle, Layers
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// SHANGHAI CSC IEC 62443 FEED SPECIFICATIONS PAGE
// Content from OFI_mandatory_62443_FEED.md and OFI_FEED_targets.md
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

const CORE_STANDARDS = [
    { code: 'IEC 62443‑1‑1', title: 'Concepts, models, terminology', use: 'Justify zones & conduits model, security levels, foundational requirements.' },
    { code: 'IEC 62443‑3‑2', title: 'Risk assessment & system partitioning', use: 'Partition SuC into zones/conduits and assign Security Level Targets (SL‑T).' },
    { code: 'IEC 62443‑3‑3', title: 'System security requirements & SLs', use: 'Meet SRs aligned to SL‑T (FR1–FR7).' },
    { code: 'IEC 62443‑4‑1', title: 'Secure development lifecycle', use: 'Mandate for vendors/OEMs (secure design, implementation, patch management).' },
    { code: 'IEC 62443‑4‑2', title: 'Component technical security requirements', use: 'PLCs/HMIs must meet Component Requirements (CRs) at required SL‑C.' },
    { code: 'IEC 62443‑2‑4', title: 'Security program requirements for service providers', use: 'Requirements for integration and maintenance service providers.' }
];

const FEED_ZONES = [
    { zone: 'Z1 – Demo / Pilot Line OT', desc: 'Customer‑facing demo line PLCs, HMIs, safety I/O', slt: 'SL‑T = 3', rationale: 'Must withstand deliberate, skilled attacks with moderate resources.' },
    { zone: 'Z2 – Lab / Application Dev', desc: 'Non‑production test rigs, dev systems', slt: 'SL‑T = 2', rationale: 'Protection against intentional misuse with basic tools.' },
    { zone: 'Z3 – OT–IT DMZ', desc: 'Historians, integration servers, jump hosts', slt: 'SL‑T = 2', rationale: 'Conduit between corporate IT and OT zones.' },
    { zone: 'Z4 – Building Automation', desc: 'HVAC, lighting, non‑critical BMS', slt: 'SL‑T = 1', rationale: 'Protection against casual misuse.' },
];

const FOUNDATIONAL_REQS = [
    'FR1 – Identification & Authentication Control (IAC/AC)',
    'FR2 – Use Control (UC)',
    'FR3 – System Integrity (SI)',
    'FR4 – Data Confidentiality (DC)',
    'FR5 – Restricted Data Flow (RDF)',
    'FR6 – Timely Response to Events (TRE)',
    'FR7 – Resource Availability (RA)'
];

export default function ShanghaiIECPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-emerald-950/30 border-b border-emerald-500/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <CheckSquare className="text-emerald-500" size={16} />
                    <span className="text-emerald-500 font-mono text-xs tracking-widest">
                        OSINT // ENGINEERING SPECS // SHANGHAI FEED
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: OFI_mandatory_62443_FEED.md</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="min-h-[50vh] flex flex-col justify-center px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <Link href="/corporate/osint-report" className="inline-flex items-center gap-2 text-grey hover:text-white text-sm mb-6 transition-colors">
                        <ChevronLeft size={16} />
                        Back to OSINT Report
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Settings className="text-cyan-400" size={24} />
                        <span className="text-cyan-400 text-xs font-mono tracking-[0.3em]">FRONT END ENGINEERING DESIGN (FEED)</span>
                    </div>

                    <PageHeader
                        title="Shanghai Customer Solutions Center (CSC)"
                        subtitle="Mandatory IEC 62443 Clauses & Security Level Targets for Engineering Design"
                        variant="hero"
                        accent="green"
                    />

                    <div className="mt-8 max-w-4xl">
                        <p className="text-grey leading-relaxed">
                            This specification defines the <span className="text-white font-semibold">"must-cite" IEC 62443 parts and clauses</span> that must appear
                            in the Shanghai CSC FEED documents. It establishes the cybersecurity design basis, defining Zones & Conduits,
                            Security Level Targets (SL-T), and foundational requirements for all IACS components and vendors.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 1: Core Standards */}
            <section className="px-6 lg:px-16  py-16 bg-emerald-900/5 border-y border-emerald-500/10">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Briefcase className="text-emerald-500" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">1. CORE STANDARDS (NORMATIVE REFERENCES)</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CORE_STANDARDS.map((std, i) => (
                            <div key={i} className="glass-panel p-6 rounded-xl border-l-2 border-l-emerald-500 hover:bg-white/5 transition-colors">
                                <h3 className="text-emerald-400 font-mono font-bold mb-2">{std.code}</h3>
                                <p className="text-white text-sm font-semibold mb-2">{std.title}</p>
                                <p className="text-grey text-xs">{std.use}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 2: Design Concepts */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <LayoutTemplate className="text-cyan-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">2. MANDATORY DESIGN CONCEPTS</h2>
                    </div>

                    <Accordion title="1. Zones & Conduits (3-2 / 3-3)" icon={<Layers size={18} />} defaultOpen>
                        <div className="space-y-4 text-sm text-grey">
                            <p>FEED shall deliver:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>A <span className="text-white font-semibold">zones and conduits diagram</span> for Shanghai CSC OT/IT, aligned with IEC 62443‑3‑2.</li>
                                <li>Assigned <span className="text-white font-semibold">SL‑T per zone</span> with rationale in the Cybersecurity Requirements Specification (CSRS).</li>
                            </ul>
                        </div>
                    </Accordion>

                    <Accordion title="2. Security Levels (SL-T, SL-C, SL-A)" icon={<Shield size={18} />}>
                        <div className="space-y-4 text-sm text-grey">
                            <p>FEED shall:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Define <span className="text-white font-semibold">SL‑T (Target)</span> for each zone/conduit (based on risk assessment).</li>
                                <li>Require components with appropriate <span className="text-white font-semibold">SL‑C (Capability)</span> per 3‑3 / 4‑2.</li>
                                <li>Design so that <span className="text-white font-semibold">SL‑A (Achieved) ≥ SL‑T</span> at commissioning.</li>
                            </ul>
                        </div>
                    </Accordion>

                    <Accordion title="3. Foundational Requirements (FR1-FR7)" icon={<Lock size={18} />}>
                        <div className="grid md:grid-cols-2 gap-4">
                            {FOUNDATIONAL_REQS.map((fr, i) => (
                                <div key={i} className="p-3 bg-white/5 rounded border border-white/10 text-xs text-grey">
                                    {fr}
                                </div>
                            ))}
                        </div>
                    </Accordion>
                </ScrollReveal>
            </section>

            {/* Section 3: Zone Definition Table */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Table className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">3. ZONE & SECURITY LEVEL TARGETS</h2>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white/10 text-oxot-gold font-mono text-xs uppercase">
                                <tr>
                                    <th className="p-4">Zone / Conduit</th>
                                    <th className="p-4">Description</th>
                                    <th className="p-4 text-center">SL-T</th>
                                    <th className="p-4">Rationale</th>
                                </tr>
                            </thead>
                            <tbody className="bg-black/60 text-grey text-xs">
                                {FEED_ZONES.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-semibold text-white">{row.zone}</td>
                                        <td className="p-4">{row.desc}</td>
                                        <td className="p-4 text-center font-mono font-bold text-emerald-400">{row.slt}</td>
                                        <td className="p-4 italic">{row.rationale}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 4: Boilerplate Specification Wording */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <FileText className="text-purple-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">4. BOILERPLATE SPECIFICATION LANGUAGE</h2>
                    </div>

                    <p className="text-grey text-sm mb-6">Use these exact sentences in the FEED "Cybersecurity Requirements" section:</p>

                    <div className="space-y-6">
                        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-l-purple-500 font-mono text-xs text-grey leading-relaxed">
                            <span className="block text-purple-400 font-bold mb-2">GLOBAL STATEMENT:</span>
                            “The Industrial Automation and Control System (IACS) for the Shanghai Customer Solutions Center shall be designed and implemented in accordance with IEC 62443 series, specifically IEC 62443‑1‑1, 62443‑3‑2, 62443‑3‑3, 62443‑4‑1, and 62443‑4‑2.”
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-l-purple-500 font-mono text-xs text-grey leading-relaxed">
                            <span className="block text-purple-400 font-bold mb-2">VENDOR REQUIREMENT:</span>
                            “All automation and security vendors shall demonstrate a secure development lifecycle conformant with IEC 62443‑4‑1, including documented processes for vulnerability handling, patch management, and end‑of‑life.”
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border-l-4 border-l-purple-500 font-mono text-xs text-grey leading-relaxed">
                            <span className="block text-purple-400 font-bold mb-2">COMPONENT COMPLIANCE:</span>
                            “All control system components (PLCs, HMIs, embedded devices) shall comply with IEC 62443‑4‑2 at the required Security Level‑Capability (SL‑C). Vendors must provide SL-C declarations for each product.”
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • FEED Specification
                    </div>
                    <div>
                        <span className="text-emerald-500">IEC 62443 COMPLIANT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
