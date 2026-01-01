'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, ChevronDown, Building, Globe, Layers, Users,
    Briefcase, Zap, Cpu, AlertTriangle, TrendingUp, Anchor,
    FileText, Network, Crosshair
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// OFI STRUCTURE INTELLIGENCE REPORT PAGE
// Complete content from OFI_Structure_Intellignece_Report.md
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
                    <span className="text-white font-semibold">{title}</span>
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
                        <div className="p-6 bg-black/40">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const EXECUTIVE_SUMMARY_POINTS = [
    {
        title: 'Core Identity',
        desc: 'Distinct operating group created in 2020. Focus on 5 platforms: cocoa, coffee, dairy, nuts, spices. Shift from commodity supplier to solutions-led partner.',
        icon: <Users size={18} className="text-oxot-gold" />
    },
    {
        title: 'Operational Scale',
        desc: '120+ manufacturing plants, 19 innovation centers. Network of ~2.4M farmers. Vertically integrated from farm-gate to advanced processing.',
        icon: <Globe size={18} className="text-cyan-400" />
    },
    {
        title: 'Strategic Direction',
        desc: 'Accelerating transition up the value chain (Ingredients & Solutions). Digitization via AtSource. Preparation for potential IPO.',
        icon: <TrendingUp size={18} className="text-emerald-400" />
    },
    {
        title: 'Risks & Opportunities',
        desc: 'Risks: EUDR, NIS2 compliance, commodity volatility, cyber threats. Opportunities: High-value ingredients (NZ dairy), monetizing digital platforms.',
        icon: <AlertTriangle size={18} className="text-red-400" />
    }
];

const SUBSIDIARY_TABLE = [
    { name: 'Club Coffee', role: 'Custom coffee roaster (acquired)', loc: 'Toronto, Canada' },
    { name: 'Seda Outspan Iberia', role: 'Soluble coffee factory', loc: 'Palencia, Spain' },
    { name: 'Unicao', role: 'Cocoa processing brand', loc: 'Abidjan, Côte d\'Ivoire' },
    { name: 'Olam Food Ingredients Spain', role: 'Macao brand cocoa milling', loc: 'Valencia, Spain' },
    { name: 'ofi North America', role: 'Regional HQ', loc: 'Chicago, IL, USA' },
    { name: 'Olam Cocoa B.V.', role: 'Key subsidiary', loc: 'Netherlands' },
];

const LEADERSHIP_TABLE = [
    { name: 'Lim Ah Doo', title: 'Director / Chair of Nomination', unit: 'Olam Group Limited' },
    { name: 'Sunny George Verghese', title: 'Director', unit: 'Olam Group Limited' },
    { name: 'Vivek Verma', title: 'Managing Director & CEO, Coffee', unit: 'ofi' },
    { name: 'Ramanarayanan Mahadevan', title: 'CEO', unit: 'Jiva Ag' },
    { name: 'Pankaj Lunawat', title: 'Country Head, Jiva Indonesia', unit: 'Jiva Ag' },
    { name: 'Allison Kopf', title: 'CEO, TRACT', unit: 'Nupo Ventures' },
];

const PROCESSING_SITES = [
    { region: 'North America', sites: ['Bolingbrook, IL (Cocoa)', 'Las Cruces, NM (Spices)', 'Hanford, CA (Garlic/Onion)', 'Fresno, CA (Spices IEC)', 'Boardman, OR (Spices)', 'Toronto, ON (Coffee)'] },
    { region: 'Europe', sites: ['Koog aan de Zaan, NL (Cocoa/Energy)', 'Mannheim, DE (Cocoa)', 'Valencia, ES (Macao Cocoa)', 'Palencia, ES (Coffee)'] },
    { region: 'Asia-Pacific', sites: ['Tokoroa, NZ (Dairy)', 'Vietnam (7 Spice/Nut Factories)', 'Johor, MY (Dairy)'] },
    { region: 'Africa & South America', sites: ['Abidjan, CI (Unicao Cocoa)', 'San Pedro, CI (Cocoa)', 'Ghana & Nigeria (Cocoa Cake/Butter)', 'Linhares, BR (Soluble Coffee)'] },
];

const TECH_STACK = [
    { category: 'Enterprise IT', items: ['SAP S/4HANA (Cloud Private Edition on AWS)', 'Mindsprint (Implementation Partner)', 'AtSource (Sustainability Platform)', 'Olam Direct (Farmer Procurement)', 'Agrotools (Deforestation Check)'] },
    { category: 'Operational Tech (OT)', items: ['Braincube (IIoT Platform)', 'PlantPAx DCS (Rockwell Automation)', 'Siemens Automation', 'AVEVA/Wonderware (SCADA)', 'Cryogenic Milling (Spices)', 'Nozzle Atomizer Dryers (Dairy)'] },
];

const CHRONOLOGY = [
    { date: 'Oct 2019', event: 'Launch of Cocoa Compass sustainability initiative.' },
    { date: '2020', event: 'ofi officially formed as distinct operating group.' },
    { date: 'Late 2023', event: 'Opening of Phase 1 Tokoroa Dairy Plant (NZ).' },
    { date: 'Dec 2024', event: 'Mighty Earth report on Ghana cocoa challenges.' },
    { date: 'Feb 2025', event: 'Olam Group sells 44.58% stake in Olam Agri to SALIC.' },
    { date: 'Aug 2025', event: 'Closure of Jiva Ag digital platform to conserve cash.' },
    { date: 'Dec 30, 2025', event: 'EUDR Compliance Deadline.' },
];

const DISCREPANCIES = [
    { item: 'Employee Count', desc: 'Olam Factsheet says 14,975; LeadIQ estimates ~10,000.' },
    { item: 'Farmer Network', desc: 'Annual Report says ~2.4 million; Factsheet claims 3.5 million.' },
    { item: 'Innovation Centers', desc: 'Sources vary between 12, 15, and 19 (Annual Report).' },
    { item: 'Stock Symbol', desc: 'LeadIQ lists "TEAF" (incorrect - belongs to unrelated fund). ofi is private/pre-IPO.' },
];

export default function StructureIntelligencePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-black/60 border-b border-cyan-500/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Building className="text-cyan-400" size={16} />
                    <span className="text-cyan-400 font-mono text-xs tracking-widest">
                        OSINT // CORPORATE INTELLIGENCE // OFI
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: OFI_Structure_Intellignece_Report.md</span>
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
                        <Globe className="text-cyan-400" size={24} />
                        <span className="text-cyan-400 text-xs font-mono tracking-[0.3em]">INTELLIGENCE BRIEFING</span>
                    </div>

                    <PageHeader
                        title="Intelligence Report: Olam Food Ingredients (ofi)"
                        subtitle="Consolidated Analysis of Corporate Structure, Operational Scale, Strategic Posture, and Risk Landscape"
                        variant="hero"
                        accent="blue"
                    />

                    <div className="mt-8 max-w-4xl">
                        <p className="text-grey leading-relaxed">
                            This report provides a consolidated intelligence overview of <span className="text-white font-semibold">Olam Food Ingredients (ofi)</span>,
                            a significant entity within the global food ingredients market. Formed through strategic reorganization, ofi has established itself as a
                            specialized provider of value-added ingredient solutions across cocoa, coffee, dairy, nuts, and spices.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 1: Executive Summary */}
            <section className="px-6 lg:px-16  py-16 bg-cyan-900/5 border-y border-cyan-500/10">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Briefcase className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">1. EXECUTIVE SUMMARY</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {EXECUTIVE_SUMMARY_POINTS.map((point, i) => (
                            <motion.div
                                key={point.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-xl"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    {point.icon}
                                    <h3 className="text-white font-bold">{point.title}</h3>
                                </div>
                                <p className="text-grey text-sm">{point.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 2: Corporate Anatomy */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Layers className="text-purple-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">2. CORPORATE ANATOMY</h2>
                    </div>

                    <Accordion title="2.1 Key Operating Groups" icon={<Network size={18} />} defaultOpen>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-white font-semibold mb-2">ofi (olam food ingredients)</h4>
                                <p className="text-grey text-sm">Principal group delivering value-added ingredients across 5 platforms.</p>
                            </div>
                            <div>
                                <h4 className="text-purple-400 font-semibold mb-2">Mindsprint</h4>
                                <p className="text-grey text-sm mb-2">
                                    Standalone global technology service provider (formerly Olam IT). 3,200+ professionals.
                                    Hubs in Chennai, Bengaluru, NJ, London.
                                </p>
                                <ul className="list-disc pl-5 text-grey text-xs">
                                    <li>AI-powered solutions</li>
                                    <li>GuardianEye platform (Cybersecurity)</li>
                                </ul>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <h4 className="text-emerald-400 font-semibold mb-1">Terrascope</h4>
                                    <p className="text-grey text-xs">Carbon measurement & decarbonization platform (Nupo Ventures).</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 opacity-70">
                                    <h4 className="text-grey font-semibold mb-1 line-through decoration-red-500">Jiva Ag</h4>
                                    <p className="text-grey text-xs">Digital farmer platform. Closed Aug 2025 to conserve cash.</p>
                                </div>
                            </div>
                        </div>
                    </Accordion>

                    <div className="mt-8 grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-white font-mono text-sm mb-4">SUBSIDIARY & BRAND PORTFOLIO</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-oxot-gold font-mono text-xs uppercase">
                                        <tr>
                                            <th className="p-3">Entity</th>
                                            <th className="p-3">Role</th>
                                            <th className="p-3">Location</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-grey text-xs">
                                        {SUBSIDIARY_TABLE.map((row, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-3 font-semibold text-white">{row.name}</td>
                                                <td className="p-3">{row.role}</td>
                                                <td className="p-3 text-cyan-400">{row.loc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-mono text-sm mb-4">KEY LEADERSHIP</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-white/5 text-oxot-gold font-mono text-xs uppercase">
                                        <tr>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Title</th>
                                            <th className="p-3">Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-grey text-xs">
                                        {LEADERSHIP_TABLE.map((row, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-3 font-semibold text-white">{row.name}</td>
                                                <td className="p-3">{row.title}</td>
                                                <td className="p-3 text-emerald-400">{row.unit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 3: Operational Footprint */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Crosshair className="text-red-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">3. OPERATIONAL FOOTPRINT</h2>
                    </div>

                    <div className="glass-panel p-6 rounded-xl mb-8">
                        <h3 className="text-cyan-400 font-mono text-sm mb-4">INNOVATION NETWORK</h3>
                        <div className="grid md:grid-cols-3 gap-6 text-sm">
                            <div>
                                <p className="text-white font-semibold mb-1">Customer Solution Centers (CSCs)</p>
                                <p className="text-grey text-xs">Hubs for co-creation. Locations: Chicago, Amsterdam, Bangalore, Shanghai, Singapore.</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold mb-1">Ingredient Excellence Centers (IECs)</p>
                                <p className="text-grey text-xs">Specialized tech hubs. Example: Spices IEC in Fresno, CA.</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold mb-1">Corporate HQs</p>
                                <p className="text-grey text-xs">Global: Singapore (Marina One). North America: Chicago, IL.</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-white font-mono text-sm mb-4">KEY MANUFACTURING ASSETS</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {PROCESSING_SITES.map((area, i) => (
                            <div key={area.region} className="p-5 border border-white/10 rounded-xl bg-white/5">
                                <h4 className="text-white font-bold mb-3">{area.region}</h4>
                                <ul className="space-y-2">
                                    {area.sites.map((site, j) => (
                                        <li key={j} className="text-grey text-xs flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                            {site}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 4: Tech & Ops */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Cpu className="text-emerald-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">4. TECHNICAL & OPERATIONAL ASSESSMENT</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {TECH_STACK.map((stack, i) => (
                            <div key={stack.category} className={`glass-panel p-6 rounded-xl border-t-4 ${stack.category.includes('IT') ? 'border-t-purple-500' : 'border-t-emerald-500'}`}>
                                <h3 className={`${stack.category.includes('IT') ? 'text-purple-400' : 'text-emerald-400'} font-mono text-sm mb-4`}>{stack.category.toUpperCase()}</h3>
                                <ul className="space-y-3">
                                    {stack.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-grey">
                                            <CheckCircleIcon className={stack.category.includes('IT') ? 'text-purple-400' : 'text-emerald-400'} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl">
                        <h3 className="text-cyan-400 font-bold mb-2">Braincube Impact Case Study</h3>
                        <p className="text-grey text-sm">
                            Implementation of Braincube IIoT "Product Clone" technology delivered:
                            <span className="text-white font-semibold ml-1">6.5% yield increase</span>,
                            <span className="text-white font-semibold ml-1">25% throughput improvement</span>, and
                            <span className="text-white font-semibold ml-1">100% quality scores</span> for 8 consecutive months.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 5: Chronology */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">5. CHRONOLOGY OF EVENTS</h2>
                    </div>

                    <div className="relative border-l border-white/10 ml-4 space-y-8">
                        {CHRONOLOGY.map((event, i) => (
                            <div key={i} className="pl-8 relative">
                                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-oxot-gold border-2 border-black" />
                                <span className="text-oxot-gold font-mono text-xs block mb-1">{event.date}</span>
                                <p className="text-white text-sm">{event.event}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 6: Discrepancies */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <AlertTriangle className="text-red-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">6. SOURCE DISCREPANCIES</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {DISCREPANCIES.map((disc, i) => (
                            <div key={i} className="p-5 border border-red-500/20 bg-red-900/5 rounded-xl">
                                <h3 className="text-red-400 font-bold text-sm mb-2">{disc.item}</h3>
                                <p className="text-grey text-xs">{disc.desc}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • Corporate Intelligence Brief
                    </div>
                    <div>
                        <span className="text-cyan-400">END OF REPORT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function CheckCircleIcon({ className }: { className?: string }) {
    return (
        <svg className={`w-5 h-5 flex-shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
