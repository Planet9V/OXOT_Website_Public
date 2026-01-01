'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, ChevronDown, Factory, ShieldCheck, Thermometer,
    Truck, Droplet, Wind, Box, Cpu, Zap, Activity,
    FileText, CheckCircle2, AlertTriangle, Layers, Ruler, Anchor
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// DAIRY FACILITY ARCHITECTURE PAGE
// Complete content from OFI_Dairy Facility Arch NZ_AU.md (372 lines)
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
                    <div className="text-oxot-gold">{icon}</div>
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
                        <div className="p-6 bg-black/40">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const REGULATORY_FRAMEWORKS = [
    {
        country: 'New Zealand',
        authority: 'Ministry for Primary Industries (MPI)',
        keyDoc: 'NZCP1: Code of Practice',
        focus: 'Risk Management Programmes (RMP) - Validate safety BEFORE operation',
        icon: <ShieldCheck size={20} className="text-cyan-400" />
    },
    {
        country: 'Australia',
        authority: 'Food Standards (FSANZ)',
        keyDoc: 'Standard 4.2.4',
        focus: 'Supply Chain Continuity - Explicit link between farm, transport, and factory',
        icon: <ShieldCheck size={20} className="text-emerald-400" />
    }
];

const MILKING_PLATFORMS = [
    {
        name: 'GEA DairyRotor T8900',
        features: ['Quad-roller drive system', 'Nylon rollers (reduced friction)', 'Heavy-duty hydraulic entry/exit'],
        advantage: 'Durability for 24/7 autonomous milking'
    },
    {
        name: 'DeLaval Rotary E300',
        features: ['Cockpit central control', 'FastBail™ funnel entry', 'FastExit™ discharge bow'],
        advantage: 'Throughput speed (highest cows/hour)'
    }
];

const ZONING_PHILOSOPHY = [
    { zone: 'Black Zone', desc: 'Utilities, boilers, wastewater treatment', color: 'bg-grey/20 border-grey/30' },
    { zone: 'Gray Zone', desc: 'Raw milk reception, silos', color: 'bg-blue-500/10 border-blue-500/20' },
    { zone: 'White Zone', desc: 'Pasteurization, evaporation, packing (High Care)', color: 'bg-white/10 border-white/20' },
    { zone: 'Red Line', desc: 'Absolute barrier to sterile packing room. Positive pressure, HEPA filtration.', color: 'bg-red-500/10 border-red-500/30 text-red-400' }
];

const EQUIPMENT_MATRIX = [
    { component: 'Milking', tech: 'Rotary w/ Subway', feature: 'FastExit, Nylon Rollers', regulation: 'NZCP1 (Hygiene)' },
    { component: 'Cooling', tech: '3:1 Water:Milk PHE', feature: '2°C Approach Temp', regulation: 'MPI Cooling Curve' },
    { component: 'Reception', tech: 'Coriolis Mass Flow', feature: 'Air Elimination', regulation: 'FSANZ 4.2.4 (Traceability)' },
    { component: 'Valves', tech: 'Mixproof Double Seat', feature: 'Leakage Chamber', regulation: '3-A / EHEDG' },
    { component: 'Evaporator', tech: 'MVR (Mechanical)', feature: '~30 kWh/ton Efficiency', regulation: 'Sustainability' },
    { component: 'Dryer', tech: 'Nozzle Atomizer', feature: 'Agglomerated Powder', regulation: 'Market Spec' },
    { component: 'Filler', tech: 'Limited Intervention (Li)', feature: 'MAP Gassing, Enclosed', regulation: 'High Care Zoning' },
];

const NETWORK_ARCHITECTURE = [
    { layer: 'Sensor', tech: 'IO-Link', function: 'Smart Instrumentation', benefit: 'Auto-parameterization' },
    { layer: 'Actuator', tech: 'AS-Interface', function: 'Valve Control', benefit: '90% Wiring Reduction' },
    { layer: 'Fieldbus', tech: 'EtherNet/IP', function: 'PLC-to-Device Comms', benefit: 'IT Integration' },
    { layer: 'Control', tech: 'PlantPAx DCS', function: 'Process Logic', benefit: 'Validated Code Objects' },
    { layer: 'Supervisory', tech: 'AVEVA / Wonderware', function: 'Plant-wide HMI', benefit: 'Unified Dashboard' },
];

export default function DairyFacilityArchitecturePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-black/60 border-b border-oxot-gold/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Factory className="text-oxot-gold" size={16} />
                    <span className="text-oxot-gold font-mono text-xs tracking-widest">
                        OSINT // ENGINEERING // FACILITY ARCHITECTURE
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: OFI_Dairy Facility Arch NZ_AU.md (372 lines)</span>
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
                        <Factory className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">ENGINEERING REPORT</span>
                    </div>

                    <PageHeader
                        title="Dairy Processing Architecture: NZ & Australia"
                        subtitle="Strategic Compliance, Hygienic Design, and Digital Engineering for High-Throughput Facilities"
                        variant="hero"
                        accent="gold"
                    />

                    <div className="mt-8 max-w-4xl">
                        <p className="text-grey leading-relaxed">
                            The establishment of a dairy processing facility in the Oceania region is the creation of a
                            <span className="text-white font-semibold"> hygienic fortress</span>. Governed by the
                            strictest food safety frameworks globally (NZ MPI & Australian FSANZ), the architecture must integrate
                            regulatory compliance, advanced automation, and sterile zoning from the ground up.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 1: Regulatory Architecture */}
            <section className="px-6 lg:px-16  py-16 bg-cyan-900/5 border-y border-cyan-500/10">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <ShieldCheck className="text-cyan-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">1. STRATEGIC COMPLIANCE & REGULATORY ARCHITECTURE</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        {REGULATORY_FRAMEWORKS.map((reg, i) => (
                            <motion.div
                                key={reg.country}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-xl border-l-4 border-l-cyan-500"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    {reg.icon}
                                    <h3 className="text-lg font-bold text-white">{reg.country}</h3>
                                </div>
                                <p className="text-cyan-400 font-mono text-xs mb-2">{reg.authority}</p>
                                <p className="text-white font-semibold text-sm mb-4">{reg.keyDoc}</p>
                                <p className="text-grey text-sm mb-4">{reg.focus}</p>
                            </motion.div>
                        ))}
                    </div>

                    <Accordion title="1.1 NZCP1 Hygiene & Site Constraints" icon={<AlertTriangle size={18} />}>
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Siting & Separation</h4>
                                <p className="text-grey text-sm mb-4">
                                    Facilities must be located away from "offensive" areas (effluent ponds, silage stacks).
                                    Prevailing wind analysis is mandatory to prevent airborne pathogen drift.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Vat Room Construction</h4>
                                <p className="text-grey text-sm mb-4">
                                    Structurally separate from milking areas. Impervious surfaces required. Concrete floors must be
                                    sealed with high-grade epoxy/polyurethane to resist acid wash cycles and prevent <em>Listeria</em> harborage.
                                </p>
                            </div>
                        </div>
                    </Accordion>

                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-white mb-4">1.3 Strategic Zoning Philosophy</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {ZONING_PHILOSOPHY.map((zone, i) => (
                                <div key={zone.zone} className={`p-4 rounded-lg border ${zone.color}`}>
                                    <p className="font-bold text-sm mb-2">{zone.zone}</p>
                                    <p className="text-xs opacity-80">{zone.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 2: Farm-Side Architecture */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Factory className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">2. FARM-SIDE: HIGH-THROUGHPUT MILKING CENTER</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-oxot-gold font-mono text-sm mb-4">ROTARY PLATFORM ENGINEERING</h3>
                            <p className="text-grey text-sm mb-4">
                                The rotary platform is a continuous production line. Key systems include the <strong>DeLaval E300</strong> and <strong>GEA T8900</strong>.
                            </p>

                            <h4 className="text-white font-semibold text-xs mt-4 mb-2">Subway Architecture</h4>
                            <p className="text-grey text-xs mb-4">
                                "Subway" or basement designs place milk lines and vacuum pumps <em>underneath</em> the deck.
                                This separates mechanical noise from cows (calmer animals = faster let down) and allows maintenance during operation.
                            </p>

                            <h4 className="text-white font-semibold text-xs mt-4 mb-2">FastExit™ Geometry</h4>
                            <p className="text-grey text-xs">
                                Angled bails with physical "exit bows" guide cows off the platform without backing up. Increases throughput by up to 7%.
                            </p>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-oxot-gold">
                            <h3 className="text-oxot-gold font-mono text-sm mb-4">COOLING INFRASTRUCTURE: THE RAPID CURVE</h3>
                            <div className="space-y-4">
                                <div className="bg-black/40 p-3 rounded">
                                    <p className="text-white font-semibold text-xs text-red-400">MPI Constraint (NZ)</p>
                                    <p className="text-grey text-xs">Milk must be 6°C within 6 hours (or 2h after finish).</p>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm mb-1">Plate Heat Exchanger (PHE)</p>
                                    <p className="text-grey text-xs">
                                        Uses <strong>Counter-Current Flow</strong>. Requires 3:1 water-to-milk ratio.
                                        e.g., 600 cows/hr (15,000L milk) needs 45,000L water flow.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm mb-1">Thermal Storage (Ice Banks)</p>
                                    <p className="text-grey text-xs">Build ice at night (cheap power), melt during milking for massive cooling power without peak load spikes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 3: Logistics */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Truck className="text-blue-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">3. LOGISTICS ARCHITECTURE: RECEPTION INTERFACE</h2>
                    </div>

                    <Accordion title="3.1 Reception Bay Engineering" icon={<Box size={18} />} defaultOpen>
                        <p className="text-grey text-sm mb-4">
                            The reception bay is a sanitary processing zone, not just a parking spot.
                        </p>
                        <ul className="text-grey text-sm space-y-3">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <span><strong>Drive-Through Tunnels:</strong> Prevent reversing accidents. Heavily graded floors (1:40) to large trench drains.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <span><strong>De-aeration:</strong> "Air Eliminators" remove bubbles before flow meters to ensure accuracy.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <span><strong>Coriolis Mass Flow Meters:</strong> Measure mass directly (kg), unaffected by temperature/bubbles. Endress+Hauser Promass is standard.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <span><strong>CIP Integration:</strong> Tankers connect to the plant's CIP kitchen for automated hot caustic/acid cleaning after unloading.</span>
                            </li>
                        </ul>
                    </Accordion>
                </ScrollReveal>
            </section>

            {/* Section 4 & 5: Processing & Powder */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Layers className="text-emerald-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">4 & 5. PROCESSING & POWDER ARCHITECTURE</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Process Liquid */}
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-emerald-400 font-mono text-sm mb-4">THE LIQUID PHASE</h3>

                            <div className="mb-6">
                                <h4 className="text-white font-semibold text-sm mb-2">Mixproof Valve Matrix</h4>
                                <p className="text-grey text-xs italic mb-2">Double-Seat Mixproof Valves (Alfa Laval / Pentair)</p>
                                <p className="text-grey text-xs">
                                    Feature a <strong>leakage chamber</strong> between two seals. If a seal fails, fluid leaks to the floor
                                    (visual alert) but <em>never</em> crosses into the other line. Allows simultaneous CIP and Production.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Separation Tech</h4>
                                <p className="text-grey text-xs">
                                    <strong>Hermetic Design:</strong> Inlet submerged in liquid seal to prevent air entry (shearing/foaming).
                                    <br /><strong>Proplus:</strong> Extends sludge ejection intervals, saving product.
                                </p>
                            </div>
                        </div>

                        {/* Powder Production */}
                        <div className="glass-panel p-6 rounded-xl border-t-4 border-t-emerald-500">
                            <h3 className="text-emerald-400 font-mono text-sm mb-4">POWDER PRODUCTION (MVR vs TVR)</h3>

                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-white text-sm font-semibold">MVR (Mechanical Vapor Recompression)</span>
                                    <span className="text-emerald-400 text-xs">Modern Standard</span>
                                </div>
                                <p className="text-grey text-xs">
                                    Uses high-speed fans to compress vapor and reuse it as heat. Operates like a heat pump.
                                    Efficiency: ~10-30 kWh/ton water evaporated.
                                </p>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-white text-sm font-semibold">TVR (Thermal Vapor Recompression)</span>
                                    <span className="text-grey text-xs">Legacy / Finisher</span>
                                </div>
                                <p className="text-grey text-xs">
                                    Uses steam jets. Cheaper to build but high running cost. Used as "finisher" for high solids (52%).
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Explosion Suppression</h4>
                                <p className="text-grey text-xs">
                                    Milk powder dust Kst ~100-150. Requires <strong>Rupture Discs</strong> and <strong>CO2 Suppression</strong> systems
                                    capable of flooding the chamber in milliseconds.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 6: Packaging */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Box className="text-red-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">6. PACKAGING: THE HIGH-CARE ZONE</h2>
                    </div>

                    <div className="p-6 border border-red-500/30 rounded-xl bg-red-900/5">
                        <h3 className="text-red-400 font-bold mb-4">RED LINE PROTOCOL</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Detailed Barrier</h4>
                                <p className="text-grey text-xs">
                                    "Bench-over" architecture. Staff sit, remove shoes, swing legs over bench, put on captive "Red Zone" boots.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Positive Pressure</h4>
                                <p className="text-grey text-xs">
                                    HEPA-filtered air (H13) flows <em>out</em> of the room, preventing ingress of dust/pathogens.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-2">Dry Zone</h4>
                                <p className="text-grey text-xs">
                                    No water permitted. Sinks in airlocks only. Cleaning via vacuum/alcohol wipes to prevent <em>Cronobacter</em>.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>


            {/* Section 7: Automation */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Cpu className="text-purple-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">7. AUTOMATION & DIGITAL ARCHITECTURE</h2>
                    </div>

                    <Accordion title="Network Protocols (EtherNet/IP vs Profinet)" icon={<Activity size={18} />} defaultOpen>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-purple-400 font-semibold mb-2">EtherNet/IP (Rockwell)</p>
                                <p className="text-grey text-xs">Standard TCP/IP hardware. Seamless IT/OT integration. Dominant in NZ (Fonterra legacy sites).</p>
                            </div>
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-purple-400 font-semibold mb-2">Profinet (Siemens)</p>
                                <p className="text-grey text-xs">Isochronous Real-Time (IRT) for sub-microsecond motion sync. Preferred for high-speed packaging.</p>
                            </div>
                        </div>
                    </Accordion>

                    <Accordion title="IO Layer: AS-i vs IO-Link" icon={<Zap size={18} />}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-white font-semibold mb-2">AS-Interface (AS-i)</p>
                                <p className="text-grey text-xs">Simple yellow flat cable. Ideal for connecting hundreds of mixproof valves. Reduces wiring loom size by 90%.</p>
                            </div>
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-white font-semibold mb-2">IO-Link</p>
                                <p className="text-grey text-xs">Smart point-to-point. Sensors report health/diagnostics, not just values. Allows "parameter server" auto-configuration on replacement.</p>
                            </div>
                        </div>
                    </Accordion>
                </ScrollReveal>
            </section>

            {/* DATA APPENDICES: TABLES */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <FileText className="text-grey" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">DATA APPENDICES</h2>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-white font-mono text-sm mb-4">TABLE 1: EQUIPMENT SPECIFICATION MATRIX</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white/5 text-oxot-gold font-mono text-xs uppercase">
                                    <tr>
                                        <th className="p-3">Component</th>
                                        <th className="p-3">Preferred Technology</th>
                                        <th className="p-3">Key Feature</th>
                                        <th className="p-3">Regulatory Link</th>
                                    </tr>
                                </thead>
                                <tbody className="text-grey text-xs">
                                    {EQUIPMENT_MATRIX.map((row, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-3 font-semibold text-white">{row.component}</td>
                                            <td className="p-3">{row.tech}</td>
                                            <td className="p-3">{row.feature}</td>
                                            <td className="p-3 text-cyan-400">{row.regulation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-mono text-sm mb-4">TABLE 2: NETWORK & CONTROL ARCHITECTURE</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white/5 text-oxot-gold font-mono text-xs uppercase">
                                    <tr>
                                        <th className="p-3">Layer</th>
                                        <th className="p-3">Technology</th>
                                        <th className="p-3">Function</th>
                                        <th className="p-3">Benefit</th>
                                    </tr>
                                </thead>
                                <tbody className="text-grey text-xs">
                                    {NETWORK_ARCHITECTURE.map((row, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-3 font-semibold text-white">{row.layer}</td>
                                            <td className="p-3 text-purple-400">{row.tech}</td>
                                            <td className="p-3">{row.function}</td>
                                            <td className="p-3">{row.benefit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • Dairy Facility Architecture
                    </div>
                    <div>
                        <span className="text-cyan-400">END OF REPORT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
