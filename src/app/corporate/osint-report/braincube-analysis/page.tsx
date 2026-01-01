'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, ChevronDown, Cpu, Factory, TrendingUp, Shield,
    Server, Cloud, Zap, AlertTriangle, Lock, Users,
    Database, Activity, BarChart3, Leaf, Cog, Target
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// BRAINCUBE DEPLOYMENT & SECURITY ANALYSIS PAGE
// Complete content from OFI_Braincube Deployment and Security Analysis.md (288 lines)
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

const KEY_RESULTS = [
    { metric: 'Yield Increase', value: '+6.5%', mechanism: 'Optimized winnowing/breaking via AI-driven dynamic setpoints based on bean moisture profiles', impact: '$10M–$15M annually for 50k tonne facility' },
    { metric: 'Throughput Increase', value: '+25%', mechanism: 'De-bottlenecked line via AI control—reduced variance allows faster speeds without quality loss', impact: 'CapEx avoidance: equivalent to 25% of a new plant' },
    { metric: 'Quality Score', value: '100%', mechanism: '"Golden Batch" settings eliminated manual operator variance for 8 consecutive months', impact: '$500k–$1M in eliminated rework and penalties' },
];

const PRODUCT_CLONE_TIMELINE = [
    { time: 'T', stage: 'Cleaning', measurement: 'Bean weight' },
    { time: 'T+30min', stage: 'Roaster', measurement: 'Temperature' },
    { time: 'T+45min', stage: 'Winnower', measurement: 'Airflow' },
    { time: 'T+60min', stage: 'Grinder', measurement: 'Power consumption' },
    { time: 'T+120min', stage: 'Lab', measurement: 'Finished liquor tests' },
];

const EDGE_CLOUD_ARCH = [
    {
        layer: 'Edge Layer',
        device: 'Braincube Edge',
        functions: [
            'Interfaces with PLCs via Modbus TCP, OPC UA, EtherNet/IP',
            'Buffers high-frequency data during network outages',
            'Runs lightweight models for real-time operator dashboards',
        ],
        color: 'cyan'
    },
    {
        layer: 'Cloud Layer',
        device: 'Braincube Cloud',
        functions: [
            'Long-term historian storing terabytes of production data',
            'CrossRank AI: proprietary algorithm mining "Golden Batch"',
            'Model training and push to Edge for execution',
        ],
        color: 'purple'
    },
];

const ATTACK_SCENARIOS = [
    {
        type: 'Setpoint Manipulation',
        threat: 'Compromise Braincube platform or Edge connection to write malicious setpoints',
        impact: 'Roaster temperature set dangerously high → fire; disabled safety interlocks → equipment damage',
        severity: 'critical'
    },
    {
        type: 'Adversarial AI Attacks',
        threat: 'Inject subtle "noise" into sensor data (Sensor Spoofing) to fool AI',
        impact: 'AI makes bad recommendations based on corrupted Digital Twin data',
        severity: 'high'
    },
];

const NIS2_REQUIREMENTS = [
    { requirement: 'Risk Analysis', description: 'ofi must verify Braincube performs regular risk assessments' },
    { requirement: 'Incident Handling', description: 'Protocol for Braincube to report breaches within NIS2 timelines (24h early warning, 72h full report)' },
    { requirement: 'Vulnerability Management', description: 'Ensure Edge devices are patched against known CVEs' },
];

const BRAINCUBE_SECURITY = [
    { control: 'ISO 27001 Certification', description: 'Third-party validation of Information Security Management System (ISMS)' },
    { control: 'Unidirectional Connectivity', description: 'Edge initiates outbound connections via port 443 (HTTPS/TLS); no inbound firewall ports required' },
    { control: 'Data Encryption', description: 'All data in transit encrypted via HTTPS/SFTP; data at rest on dedicated VMs with tenant isolation' },
    { control: 'Role-Based Access Control', description: 'Only authorized personnel can approve setpoint changes' },
];

const ROI_TABLE = [
    { metric: 'Yield', improvement: '+6.5%', annualValue: '~$10M – $15M', logic: '6.5% of 50k tonnes = 3,250 tonnes recovered @ ~$4,000/tonne' },
    { metric: 'Throughput', improvement: '+25%', annualValue: 'CapEx Avoidance', logic: 'Equivalent to building 25% of a new plant without capital' },
    { metric: 'Quality', improvement: '100% Score', annualValue: '~$500k – $1M', logic: 'Elimination of rework energy, waste disposal, customer penalties' },
];

export default function BraincubeAnalysisPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-black/60 border-b border-cyan-500/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Cpu className="text-cyan-400" size={16} />
                    <span className="text-cyan-400 font-mono text-xs tracking-widest">
                        OSINT // TECHNICAL // DIGITAL TWIN ANALYSIS
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: OFI_Braincube Deployment and Security Analysis.md (288 lines)</span>
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
                        <Cpu className="text-cyan-400" size={24} />
                        <span className="text-cyan-400 text-xs font-mono tracking-[0.3em]">TECHNICAL DEEP DIVE</span>
                    </div>

                    <PageHeader
                        title="Braincube Deployment & Security Analysis"
                        subtitle="Digital Transformation in the Global Cocoa Supply Chain: A Comprehensive Analysis of the ofi and Braincube Strategic Partnership"
                        variant="hero"
                        accent="blue"
                    />

                    <div className="mt-8 max-w-4xl">
                        <p className="text-grey leading-relaxed">
                            This report provides an exhaustive analysis of the strategic digital transformation initiative undertaken by
                            <span className="text-cyan-400 font-semibold"> ofi</span> in collaboration with IIoT platform provider
                            <span className="text-cyan-400 font-semibold"> Braincube</span>. Centered on a critical cocoa processing facility—
                            one of the largest in ofi's global network—this initiative serves as a definitive case study in the application
                            of "<span className="text-white">Product Clone</span>" digital twin technology and AI to solve the chronic
                            challenge of biological variability in agricultural processing.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Key Results Banner */}
            <section className="px-6 lg:px-16  py-8 bg-cyan-500/5 border-y border-cyan-500/20">
                <ScrollReveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {KEY_RESULTS.map((result, i) => (
                            <motion.div
                                key={result.metric}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-cyan-400 font-bold text-4xl mb-2">{result.value}</p>
                                <p className="text-white font-semibold">{result.metric}</p>
                                <p className="text-grey text-xs mt-2">{result.mechanism}</p>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 1: Operational Context */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Factory className="text-orange-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">1. THE OPERATIONAL CONTEXT</h2>
                    </div>

                    <Accordion title="1.1 The High-Volume, Low-Margin Imperative" icon={<TrendingUp size={18} />} defaultOpen>
                        <p className="text-grey leading-relaxed mb-4">
                            Cocoa processing is characterized by <span className="text-white font-semibold">high volumes and thin margins</span>.
                            The cost of raw material (dried cocoa beans) constitutes a dominant percentage of COGS. Process yield—the ratio of
                            finished product (cocoa liquor, butter, powder) to raw material input—is the <span className="text-orange-400">
                                single most significant determinant of profitability</span>.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-orange-400 font-semibold mb-2">Industry Assumption</p>
                                <p className="text-grey text-sm">Mechanical efficiency had reached its theoretical limit. Improvements sought in increments of 0.1%.</p>
                            </div>
                            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                <p className="text-cyan-400 font-semibold mb-2">ofi Achievement</p>
                                <p className="text-grey text-sm">The 6.5% yield increase is <span className="text-white">statistically anomalous</span>—a fundamental paradigm shift enabled by digital intervention.</p>
                            </div>
                        </div>
                    </Accordion>

                    <Accordion title="1.2 The Challenge of Biological Variability" icon={<Activity size={18} />}>
                        <p className="text-grey leading-relaxed mb-4">
                            Unlike discrete manufacturing, food processing deals with <span className="text-white">biological inputs</span>. Cocoa beans are inherently variable:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-white font-semibold text-sm mb-1">Origin Diversity</p>
                                <p className="text-grey text-xs">Beans from Ghana, Côte d'Ivoire, Ecuador, Indonesia have different physical properties (size, shell thickness, hardness) and chemical compositions (fat content, moisture).</p>
                            </div>
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-white font-semibold text-sm mb-1">Harvest Conditions</p>
                                <p className="text-grey text-xs">Seasonality affects moisture content. Sun-drying vs artificial drying creates variances in shell brittleness.</p>
                            </div>
                            <div className="p-4 bg-black/40 rounded-lg">
                                <p className="text-white font-semibold text-sm mb-1">Fermentation</p>
                                <p className="text-grey text-xs">Degree of fermentation affects bean density and how it fractures during processing.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 font-semibold mb-2">The "Black Box" Problem</p>
                            <p className="text-grey text-sm">
                                Operators lack real-time visibility into the chemical state of the bean inside the machine. They rely on "hunches"
                                and reactive adjustments. By the time a quality test confirms a deviation, <span className="text-white">tonnes of material
                                    have already been processed sub-optimally</span>.
                            </p>
                        </div>
                    </Accordion>

                    <Accordion title="1.3 The Mechanics of Yield Loss: Winnowing" icon={<Cog size={18} />}>
                        <p className="text-grey leading-relaxed mb-4">
                            The critical control point for yield is <span className="text-cyan-400 font-semibold">Winnowing</span>—where roasted beans
                            are crushed and lighter shells are separated from heavier nibs using air classification (aspirators).
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <p className="text-red-400 font-semibold mb-2">Airflow Too Strong</p>
                                <p className="text-grey text-sm">Valuable small nib particles blown away with shells = <span className="text-red-400">Direct Yield Loss</span></p>
                            </div>
                            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                <p className="text-orange-400 font-semibold mb-2">Airflow Too Weak</p>
                                <p className="text-grey text-sm">Shell pieces remain with nibs = <span className="text-orange-400">Quality Defect</span> (damages grinders, affects flavor)</p>
                            </div>
                        </div>
                        <p className="text-grey text-sm mt-4">
                            Without AI, operators run conservatively—<span className="text-white">sacrificing yield to ensure quality specs</span>.
                            Digital transformation unlocked the ability to run closer to the edge of physical constraints without crossing them.
                        </p>
                    </Accordion>
                </ScrollReveal>
            </section>

            {/* Section 2: Braincube Architecture */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Server className="text-purple-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">2. TECHNOLOGICAL ARCHITECTURE: BRAINCUBE IIoT</h2>
                    </div>

                    {/* Product Clone Section */}
                    <div className="glass-panel p-6 rounded-xl mb-8">
                        <h3 className="text-cyan-400 font-mono text-sm mb-4">2.1 THE "PRODUCT CLONE" TECHNOLOGY</h3>
                        <p className="text-grey text-sm mb-6">
                            The central innovation is the <span className="text-white font-semibold">Product Clone (Digital Twin)</span>.
                            In continuous processing, data is generated by sensors at different times. A standard database sees these as unrelated timestamps.
                            Braincube's algorithm calculates dynamic lag times to align data points, virtually "tagging" material through the factory.
                        </p>

                        <div className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-cyan-500/30" />
                            <div className="space-y-4">
                                {PRODUCT_CLONE_TIMELINE.map((step, i) => (
                                    <motion.div
                                        key={step.stage}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="pl-12 relative"
                                    >
                                        <div className="absolute left-4 w-4 h-4 rounded-full bg-cyan-500 border-2 border-black" />
                                        <div className="p-3 bg-black/40 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <span className="text-cyan-400 font-mono text-sm">{step.time}</span>
                                                <span className="text-white font-semibold">{step.stage}</span>
                                            </div>
                                            <p className="text-grey text-xs mt-1">Measures: {step.measurement}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Edge-to-Cloud Architecture */}
                    <h3 className="text-lg font-semibold text-white mb-4">2.2 Edge-to-Cloud Hybrid Architecture</h3>
                    <div className="grid lg:grid-cols-2 gap-6 mb-8">
                        {EDGE_CLOUD_ARCH.map((layer, i) => (
                            <motion.div
                                key={layer.layer}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass-panel p-6 rounded-xl border-l-4 ${layer.color === 'cyan' ? 'border-l-cyan-500' : 'border-l-purple-500'}`}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    {layer.color === 'cyan' ? <Server className="text-cyan-400" size={20} /> : <Cloud className="text-purple-400" size={20} />}
                                    <h4 className={`font-mono text-sm ${layer.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`}>{layer.layer}</h4>
                                </div>
                                <p className="text-white font-semibold mb-3">{layer.device}</p>
                                <ul className="space-y-2">
                                    {layer.functions.map((func, j) => (
                                        <li key={j} className="text-grey text-xs flex items-start gap-2">
                                            <Zap className={`mt-0.5 flex-shrink-0 ${layer.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} size={12} />
                                            {func}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* CrossRank AI */}
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-oxot-gold font-mono text-sm mb-4">2.3 CROSSRANK AI: THE MATHEMATICS OF OPTIMIZATION</h3>
                        <p className="text-grey text-sm leading-relaxed mb-4">
                            CrossRank ranks input variables by their impact on the output. The system analyzed thousands of variables—roaster temperatures,
                            fan speeds, bed depths, moisture levels—to answer: <span className="text-white italic">"Which variables are the true drivers of yield loss?"</span>
                        </p>
                        <div className="p-4 bg-black/40 rounded-lg">
                            <p className="text-oxot-gold font-mono text-xs mb-2">EXAMPLE PRESCRIPTION</p>
                            <p className="text-grey text-sm">
                                For "Bean Type A" with "Moisture Level X," the "Winnower Airflow" must be exactly <span className="text-cyan-400">45.5 Hz</span>.
                                <br />At 48 Hz: yield drops by 1%. At 43 Hz: shell content spikes.
                                <br />The AI provides the <span className="text-white">precise, mathematically validated setpoint</span>.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 3: Implementation Case Study */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <BarChart3 className="text-emerald-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">3. THE OFI IMPLEMENTATION CASE STUDY</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-emerald-400 font-mono text-sm mb-4">PROJECT SCOPE</h3>
                            <p className="text-grey text-sm mb-4">
                                Implementation focused on a specific, high-volume production line at one of ofi's key cocoa plants.
                                Likely locations: <span className="text-white">Koog aan de Zaan (NL)</span>, <span className="text-white">Wormer (NL)</span>,
                                or <span className="text-white">Mannheim (DE)</span>.
                            </p>
                            <div className="space-y-2">
                                <div className="p-3 bg-black/40 rounded">
                                    <span className="text-grey text-xs">Initial Target:</span>
                                    <span className="text-white text-sm ml-2">Increase yield by 2-3%</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded">
                                    <span className="text-grey text-xs">Problem:</span>
                                    <span className="text-white text-sm ml-2">Line underperforming on throughput and yield</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded">
                                    <span className="text-grey text-xs">Current State:</span>
                                    <span className="text-white text-sm ml-2">Manual data collection (spreadsheets), intuition-based decisions</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-emerald-500">
                            <h3 className="text-emerald-400 font-mono text-sm mb-4">CHANGE MANAGEMENT</h3>
                            <p className="text-grey text-sm mb-4">
                                Championed by <span className="text-white font-semibold">G.K. Lee</span>, Process and Data Analytics Manager.
                                Strategy focused on <span className="text-emerald-400">Data Democratization</span>.
                            </p>
                            <div className="space-y-3">
                                <div className="p-3 bg-black/40 rounded">
                                    <p className="text-white font-semibold text-sm">Operator Empowerment</p>
                                    <p className="text-grey text-xs">Frontline operators given tablets showing real-time "Live" apps with prescriptive recommendations.</p>
                                </div>
                                <div className="p-3 bg-black/40 rounded">
                                    <p className="text-white font-semibold text-sm">Reactive → Proactive</p>
                                    <p className="text-grey text-xs">Proactive alerts from Digital Twin predict deviations; operators adjust setpoints BEFORE product goes out of spec.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    <h3 className="text-lg font-semibold text-white mb-4">3.3 The Results: Redefining Performance Limits</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">METRIC</th>
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">IMPROVEMENT</th>
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">EST. ANNUAL VALUE</th>
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">IMPACT LOGIC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ROI_TABLE.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-3 px-4 text-white font-semibold">{row.metric}</td>
                                        <td className="py-3 px-4 text-emerald-400 font-mono font-bold">{row.improvement}</td>
                                        <td className="py-3 px-4 text-cyan-400">{row.annualValue}</td>
                                        <td className="py-3 px-4 text-grey text-xs">{row.logic}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 4: OT Integration */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Cog className="text-blue-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">4. OPERATIONAL TECHNOLOGY (OT) INTEGRATION</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-blue-400 font-mono text-sm mb-4">CONTROL MODES EVOLUTION</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-black/40 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-400" />
                                        <span className="text-white font-semibold">Open Loop (Advisor Mode)</span>
                                    </div>
                                    <p className="text-grey text-xs">AI displays recommendation on dashboard. Human operator reads, decides, and manually types new setpoint into HMI. ("Human-in-the-Loop")</p>
                                </div>
                                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-cyan-400" />
                                        <span className="text-white font-semibold">Closed Loop (Autopilot)</span>
                                    </div>
                                    <p className="text-grey text-xs">AI writes setpoint directly to PLC memory register. Machine adjusts automatically without human intervention. ofi is trending toward this "Autonomous Factory".</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-blue-400 font-mono text-sm mb-4">PROTOCOL INTEROPERABILITY</h3>
                            <p className="text-grey text-sm mb-4">
                                A typical cocoa plant has heterogeneous equipment. Braincube's driver library normalizes diverse protocols:
                            </p>
                            <div className="space-y-2">
                                <div className="p-3 bg-black/40 rounded flex items-center justify-between">
                                    <span className="text-white text-sm">Roasters</span>
                                    <span className="text-blue-400 text-xs font-mono">Siemens S7 (Profibus/Profinet)</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded flex items-center justify-between">
                                    <span className="text-white text-sm">Grinders</span>
                                    <span className="text-blue-400 text-xs font-mono">Allen-Bradley ControlLogix (EtherNet/IP)</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded flex items-center justify-between">
                                    <span className="text-white text-sm">Legacy Conveyors</span>
                                    <span className="text-blue-400 text-xs font-mono">Modbus Serial</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 5: Cybersecurity & NIS2 */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="text-red-500" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">5. CYBERSECURITY GOVERNANCE & NIS2 COMPLIANCE</h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        The integration of cloud analytics with critical industrial infrastructure introduces significant cybersecurity risks.
                        As ofi operates in the EU, this infrastructure falls under the <span className="text-red-400 font-semibold">NIS2 Directive</span>,
                        which classifies food production as a critical sector.
                    </p>

                    {/* Threat Scenarios */}
                    <h3 className="text-lg font-semibold text-white mb-4">5.1 Threat Landscape: Attacks on Digital Twins and OT</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {ATTACK_SCENARIOS.map((scenario, i) => (
                            <motion.div
                                key={scenario.type}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-5 rounded-xl border-l-4 ${scenario.severity === 'critical' ? 'bg-red-500/10 border-l-red-500' : 'bg-orange-500/10 border-l-orange-500'}`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className={scenario.severity === 'critical' ? 'text-red-400' : 'text-orange-400'} size={16} />
                                    <span className="text-white font-semibold">{scenario.type}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ml-auto ${scenario.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                        {scenario.severity.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-grey text-xs mb-2"><span className="text-white">Threat:</span> {scenario.threat}</p>
                                <p className="text-grey text-xs"><span className="text-white">Impact:</span> {scenario.impact}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* NIS2 Requirements */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500">
                            <h3 className="text-red-400 font-mono text-sm mb-4">5.2 NIS2 ARTICLE 21: SUPPLY CHAIN SECURITY</h3>
                            <p className="text-grey text-sm mb-4">
                                NIS2 Article 21 mandates that essential entities (like ofi) must manage the cybersecurity risks of their
                                <span className="text-white font-semibold"> supply chain</span>. ofi is legally accountable for Braincube's security posture.
                            </p>
                            <div className="space-y-2">
                                {NIS2_REQUIREMENTS.map((req, i) => (
                                    <div key={i} className="p-3 bg-black/40 rounded">
                                        <span className="text-red-400 font-semibold text-xs">{req.requirement}:</span>
                                        <p className="text-grey text-xs mt-1">{req.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-emerald-500">
                            <h3 className="text-emerald-400 font-mono text-sm mb-4">5.3 BRAINCUBE SECURITY POSTURE</h3>
                            <p className="text-grey text-sm mb-4">
                                Braincube employs a "<span className="text-emerald-400">Defense in Depth</span>" architecture:
                            </p>
                            <div className="space-y-2">
                                {BRAINCUBE_SECURITY.map((control, i) => (
                                    <div key={i} className="p-3 bg-black/40 rounded">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Lock className="text-emerald-400" size={12} />
                                            <span className="text-white font-semibold text-xs">{control.control}</span>
                                        </div>
                                        <p className="text-grey text-xs">{control.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="text-yellow-400" size={16} />
                            <span className="text-yellow-400 font-semibold text-sm">IMPORTANT CLARIFICATION</span>
                        </div>
                        <p className="text-grey text-sm">
                            <span className="text-white">Braincube</span> (Industrial AI platform) must NOT be confused with
                            <span className="text-white"> Roundcube</span> (open-source webmail client). CVE databases list numerous critical vulnerabilities
                            for Roundcube. These are <span className="text-yellow-400 font-semibold">unrelated to Braincube</span>.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 6: Mindsprint Role */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Users className="text-purple-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">6. THE STRATEGIC ROLE OF MINDSPRINT</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-purple-400 font-mono text-sm mb-4">FROM INTERNAL IT TO STRATEGIC PARTNER</h3>
                            <p className="text-grey text-sm leading-relaxed">
                                <span className="text-white font-semibold">Mindsprint</span> (formerly Olam Group IT division) was spun out as a
                                separate entity providing technology services. For ofi, Mindsprint acts as the
                                <span className="text-purple-400"> implementation partner and system integrator</span>.
                            </p>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-purple-500">
                            <h3 className="text-purple-400 font-mono text-sm mb-4">ENTERPRISE INTEGRATION: THE "DIGITAL THREAD"</h3>
                            <p className="text-grey text-sm mb-4">
                                Mindsprint ensures Braincube data integrates with enterprise systems (Project Fajger: SAP S/4HANA migration).
                            </p>
                            <div className="space-y-2">
                                <div className="p-3 bg-black/40 rounded">
                                    <span className="text-white font-semibold text-xs">Costing:</span>
                                    <span className="text-grey text-xs ml-2">Real-time yield data updates SAP standard costing models</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded">
                                    <span className="text-white font-semibold text-xs">Inventory:</span>
                                    <span className="text-grey text-xs ml-2">Precise consumption data improves raw material planning</span>
                                </div>
                                <div className="p-3 bg-black/40 rounded">
                                    <span className="text-white font-semibold text-xs">Traceability:</span>
                                    <span className="text-grey text-xs ml-2">Product Clone supports sustainability certification (deforestation-free verification)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 7: Sustainability */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Leaf className="text-emerald-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">7. FINANCIAL & SUSTAINABILITY IMPACT</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <h3 className="text-emerald-400 font-semibold mb-4">Energy Intensity (Scope 2)</h3>
                            <p className="text-grey text-sm leading-relaxed">
                                Increasing throughput by 25% reduces specific energy consumption (kWh per tonne).
                                Baseload energy (lighting, HVAC, motors idling) is spread over larger production volume.
                            </p>
                        </div>
                        <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                            <h3 className="text-cyan-400 font-semibold mb-4">Waste Valorization (Scope 1)</h3>
                            <p className="text-grey text-sm leading-relaxed">
                                While ofi uses cocoa shells as biofuel in biomass boilers, the most sustainable outcome is turning
                                raw material into food, not fuel. Higher yield = more carbon-intensive cocoa crop feeds people.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 8: Future Outlook */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Target className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">8. FUTURE OUTLOOK</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-oxot-gold font-semibold mb-4">Generative AI for Operations</h3>
                            <p className="text-grey text-sm leading-relaxed">
                                Tools like "<span className="text-white">Companion AI</span>" (Braincube's answer to ChatGPT for factories) will allow
                                operators to query the system using natural language:
                            </p>
                            <p className="text-oxot-gold text-sm italic mt-3">"Why did the yield drop on Line 3 last night?"</p>
                            <p className="text-grey text-xs mt-2">The AI synthesizes Product Clone data to provide plain-text root cause analysis.</p>
                        </div>
                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-oxot-gold">
                            <h3 className="text-oxot-gold font-semibold mb-4">Prescriptive Automation</h3>
                            <p className="text-grey text-sm leading-relaxed">
                                Moving from "<span className="text-white">Human-in-the-Loop</span>" to full
                                "<span className="text-cyan-400 font-semibold">Closed Loop</span>" control across all unit operations—
                                effectively creating a <span className="text-white font-semibold">self-driving factory</span>.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Conclusion */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="glass-panel p-8 rounded-xl border border-cyan-500/30">
                        <h2 className="text-2xl font-bold text-white font-mono mb-6">9. CONCLUSION</h2>
                        <p className="text-grey leading-relaxed mb-6">
                            The collaboration between <span className="text-cyan-400 font-semibold">ofi</span> and
                            <span className="text-cyan-400 font-semibold"> Braincube</span>, orchestrated by
                            <span className="text-purple-400 font-semibold"> Mindsprint</span>, represents a benchmark in the digital
                            transformation of the process industries. By successfully deploying
                            <span className="text-white font-semibold"> Product Clone</span> technology to master the variability of
                            cocoa processing, ofi achieved a <span className="text-emerald-400 font-bold">6.5% yield increase</span> and
                            <span className="text-emerald-400 font-bold"> 25% throughput improvement</span>—figures that redefine the
                            operational limits of the sector.
                        </p>
                        <p className="text-grey leading-relaxed">
                            Crucially, this case study demonstrates that high-value digital transformation is compatible with rigorous governance.
                            By adhering to <span className="text-white">ISO 27001</span> standards and preparing for
                            <span className="text-red-400"> NIS2</span> compliance, ofi has built a secure, scalable platform.
                            The integration of OT data with cloud analytics has successfully turned the "Black Box" of cocoa manufacturing
                            into a <span className="text-oxot-gold font-semibold">transparent, data-driven engine of value creation</span>.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • Braincube Deployment Analysis
                    </div>
                    <div>
                        <span className="text-cyan-400">END OF REPORT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
