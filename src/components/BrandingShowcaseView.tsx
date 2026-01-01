'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, Download, Palette, FileText, Layers, Award,
    Globe, Codesandbox, Activity, Terminal, Cpu, Database, Lock, Server
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BackgroundEffect } from './BackgroundEffect';
import { PageHeader } from './branding/PageHeader';
import { OXOTLogo } from './branding/OXOTLogo';

interface AccordionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function Accordion({ title, icon, children, defaultOpen = false }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-white/10 rounded-xl overflow-hidden mb-4 bg-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="text-oxot-gold">{icon}</div>
                    <span className="text-white font-semibold text-left">{title}</span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="text-gray-500" size={20} />
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
                        <div className="p-6 border-t border-white/5">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface BrandAsset {
    title: string;
    description: string;
    src: string;
    category: 'logo' | 'template' | 'service';
    background: 'dark' | 'light';
}

const brandAssets: BrandAsset[] = [
    {
        title: 'Primary Logo — Dark',
        description: 'The definitive OXOT mark for dark-mode interfaces and presentations. Gold and white on charcoal substrate.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Dark.svg',
        category: 'logo',
        background: 'dark'
    },
    {
        title: 'Primary Logo — White',
        description: 'Inverse variant for light backgrounds and print applications.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_White.svg',
        category: 'logo',
        background: 'light'
    },
    {
        title: 'Brand Architecture',
        description: 'Complete brand logo system with sub-brand relationships and hierarchy.',
        src: '/Logos_OXOT_Gold_White/OXOT_Logo_Brands.svg',
        category: 'logo',
        background: 'dark'
    },
    {
        title: 'Report Template',
        description: 'Standard document styling for executive reports, assessments, and formal deliverables.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Report_template.svg',
        category: 'template',
        background: 'dark'
    },
    {
        title: 'Services Overview — Dark',
        description: 'Service portfolio visualization optimized for digital presentations and dark interfaces.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Services_Overview_Dark.svg',
        category: 'service',
        background: 'dark'
    },
    {
        title: 'Services Overview — Light',
        description: 'Print-optimized service portfolio for proposals and physical collateral.',
        src: '/Logos_OXOT_Gold_White/OXOT_GW_Services_Overview_Light.svg',
        category: 'service',
        background: 'light'
    }
];

const categoryMeta = {
    logo: { icon: Award, label: 'Brand Identity', color: 'oxot-gold' },
    template: { icon: FileText, label: 'Document Standards', color: 'blue-400' },
    service: { icon: Layers, label: 'Service Visualization', color: 'green-400' }
};

export default function BrandingShowcaseView() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-oxot-gold/30 text-slate-300">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 filter grayscale contrast-125">
                <BackgroundEffect />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-oxot-gold via-amber-400 to-white origin-left z-50"
                style={{ scaleX }}
            />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 pb-40">

                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center relative text-center">
                    {/* Navigation */}
                    <div className="absolute top-20 left-0">
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            <Palette className="w-4 h-4" />
                            Corporate Identity
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-12"
                    >
                        <OXOTLogo size="xl" animated />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-oxot-gold/10 border border-oxot-gold/30 rounded-full text-oxot-gold/80 text-xs font-mono tracking-[0.2em] mb-6 uppercase">
                                <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse" />
                                Brand Guidelines 2025
                            </div>
                        </div>

                        <PageHeader
                            title="Visual Identity"
                            subtitle="The sovereign essence of OXOT—precision, intelligence, and uncompromising excellence—distilled into visual form."
                            variant="hero"
                            accent="gold"
                            className="items-center"
                        />
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                    >
                        <span className="text-[10px] tracking-[0.2em] uppercase">Explore Assets</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                    </motion.div>
                </section>

                {/* Brand Philosophy */}
                <section className="py-32 border-t border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center mb-20"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">The OXOT Standard</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Our visual identity reflects our mission: to bring <span className="text-oxot-gold">sovereign intelligence</span> to
                            critical infrastructure protection. Every element—from the gold accents signifying value to the
                            charcoal depths representing security—is intentional.
                        </p>
                    </motion.div>

                    {/* Color Palette */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                        {[
                            { name: 'OXOT Gold', hex: '#C9A227', class: 'bg-oxot-gold' },
                            { name: 'Charcoal', hex: '#1A1A1A', class: 'bg-[#1A1A1A] border border-white/10' },
                            { name: 'Slate', hex: '#64748B', class: 'bg-slate-500' },
                            { name: 'Pure White', hex: '#FFFFFF', class: 'bg-white' }
                        ].map((color, i) => (
                            <motion.div
                                key={color.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className={`${color.class} h-24 rounded-xl mb-3 group-hover:scale-105 transition-transform shadow-lg`} />
                                <div className="text-sm font-medium text-white">{color.name}</div>
                                <div className="text-xs font-mono text-gray-500">{color.hex}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Asset Gallery */}
                <section className="py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Brand Assets</h2>
                        <p className="text-gray-400">Official visual assets for internal and external communications.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {brandAssets.map((asset, index) => {
                            const CategoryIcon = categoryMeta[asset.category].icon;
                            return (
                                <motion.div
                                    key={asset.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    {/* Glow Effect */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-oxot-gold/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className={`relative rounded-2xl border border-white/10 overflow-hidden ${asset.background === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
                                        }`}>
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase ${asset.background === 'dark'
                                                ? 'bg-white/10 text-white/70'
                                                : 'bg-black/10 text-black/70'
                                                }`}>
                                                <CategoryIcon className="w-3 h-3" />
                                                {categoryMeta[asset.category].label}
                                            </div>
                                        </div>

                                        {/* Asset Display */}
                                        <div className="p-8 pt-16 flex items-center justify-center min-h-[300px]">
                                            <Image
                                                src={asset.src}
                                                alt={asset.title}
                                                width={500}
                                                height={300}
                                                className="max-w-full h-auto object-contain"
                                            />
                                        </div>

                                        {/* Info Footer */}
                                        <div className={`p-6 border-t ${asset.background === 'dark'
                                            ? 'border-white/5 bg-black/50'
                                            : 'border-black/5 bg-gray-50'
                                            }`}>
                                            <h3 className={`text-lg font-bold mb-2 ${asset.background === 'dark' ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {asset.title}
                                            </h3>
                                            <p className={`text-sm mb-4 ${asset.background === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                {asset.description}
                                            </p>
                                            <a
                                                href={asset.src}
                                                download
                                                className={`inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase ${asset.background === 'dark'
                                                    ? 'text-oxot-gold hover:text-amber-300'
                                                    : 'text-amber-700 hover:text-amber-600'
                                                    } transition-colors`}
                                            >
                                                <Download className="w-3 h-3" />
                                                Download SVG
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Usage Guidelines */}
                <section className="py-32 border-t border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Usage Guidelines</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Do's */}
                            <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-sm">✓</span>
                                    Do
                                </h3>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Use dark logo variant on dark backgrounds
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Maintain minimum clear space around logo
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Use official OXOT Gold (#C9A227) for accents
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-400">•</span>
                                        Apply Report Template to formal documents
                                    </li>
                                </ul>
                            </div>

                            {/* Don'ts */}
                            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-sm">✕</span>
                                    Don&apos;t
                                </h3>
                                <ul className="space-y-4 text-gray-400">
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Stretch, rotate, or distort the logo
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Use unauthorized color variations
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Place logo on busy or low-contrast backgrounds
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400">•</span>
                                        Combine with competing visual elements
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* MOVED CONTENT: Deep OSINT & Architecture */}
                {/* Section 2: Data Layers */}
                <section className="py-20 border-t border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-12 justify-center">
                            <Layers className="text-cyan-400" size={24} />
                            <h2 className="text-2xl font-bold text-white font-mono">ARCHITECTURE OF DEEP OSINT</h2>
                        </div>

                        <div className="space-y-4 max-w-4xl mx-auto">
                            <Accordion title="Layer 1: Kinetic & Logical Infrastructure ('The Plumbing')" icon={<Globe size={18} />} defaultOpen>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-white text-sm mb-4">Answers: Where does this entity live and how does it connect?</p>
                                        <ul className="space-y-2 text-xs text-gray-400 font-mono">
                                            <li className="text-cyan-400">• ASNs (Autonomous System Numbers)</li>
                                            <li className="text-cyan-400">• IP Prefixes (CIDR Blocks)</li>
                                            <li className="text-cyan-400">• BGP Routing Tables (Hijacking/Leak detection)</li>
                                            <li className="text-cyan-400">• Geolocation (Data Sovereignty)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded border border-white/10">
                                        <h4 className="text-gray-500 text-xs uppercase mb-2">Visualization Implication</h4>
                                        <p className="text-white text-sm">Requires <span className="text-cyan-400">Force-Directed Graphs</span> for topology and <span className="text-cyan-400">3D Geospatial Maps (deck.gl)</span> for physical locations.</p>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Layer 2: Software Supply Chain ('The Code')" icon={<Codesandbox size={18} />}>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-white text-sm mb-4">Domain of SBOM (Software Bill of Materials) analysis.</p>
                                        <ul className="space-y-2 text-xs text-gray-400 font-mono">
                                            <li className="text-purple-400">• Tech Stack Fingerprinting (CMS, Web Servers)</li>
                                            <li className="text-purple-400">• Dependency Trees (Libraries, Frameworks)</li>
                                            <li className="text-purple-400">• Vulnerability Correlation (CVE Mapping)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded border border-white/10">
                                        <h4 className="text-gray-500 text-xs uppercase mb-2">Visualization Implication</h4>
                                        <p className="text-white text-sm">Hierarchical and fractal. Requires <span className="text-purple-400">Sunburst Charts</span>, <span className="text-purple-400">Treemaps</span>, and Dendrograms.</p>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Layer 3: Comparative Risk & Intelligence ('The Context')" icon={<Activity size={18} />}>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-white text-sm mb-4">Benchmarking against industry peers.</p>
                                        <ul className="space-y-2 text-xs text-gray-400 font-mono">
                                            <li className="text-oxot-gold">• Peer Grouping (NAICS, Revenue)</li>
                                            <li className="text-oxot-gold">• Statistical Baselines (Mean/Std Dev)</li>
                                            <li className="text-oxot-gold">• Dark Web Signals (Credential Dumps)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded border border-white/10">
                                        <h4 className="text-gray-500 text-xs uppercase mb-2">Visualization Implication</h4>
                                        <p className="text-white text-sm">Statistical and relativistic. Requires <span className="text-oxot-gold">Radar Charts</span> and <span className="text-oxot-gold">Box-and-Whisker Plots</span>.</p>
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                    </motion.div>
                </section>

                {/* Section 3: Industrial Design */}
                <section className="py-20 bg-white/5 border-y border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-12 justify-center">
                            <Terminal className="text-emerald-400" size={24} />
                            <h2 className="text-2xl font-bold text-white font-mono">"INDUSTRIAL CLEAN" DESIGN SYSTEM</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-8 border border-white/10 bg-black/40 rounded-xl">
                                <h3 className="text-emerald-400 font-mono text-sm mb-3">CHROMOPHOBIA</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Dark interfaces to reduce eye strain. Color is strictly semantic.
                                    <br /><span className="text-red-500">Red = Danger</span>
                                    <br /><span className="text-orange-400">Orange = Warning</span>
                                    <br /><span className="text-cyan-400">Cyan = Active Data</span>
                                </p>
                            </div>
                            <div className="p-8 border border-white/10 bg-black/40 rounded-xl">
                                <h3 className="text-emerald-400 font-mono text-sm mb-3">GRID IS GOD</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Rigid, visible grids. Data contained in demarcated "cells" or "panels." Helps the eye parse complex layouts quickly.
                                </p>
                            </div>
                            <div className="p-8 border border-white/10 bg-black/40 rounded-xl">
                                <h3 className="text-emerald-400 font-mono text-sm mb-3">TYPOGRAPHY</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Monospace fonts for all data (IPs, hashes, dates). Ensures vertical alignment and easy scanning for anomalies.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 4: Visualization Layouts */}
                <section className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-12 justify-center">
                            <Cpu className="text-purple-400" size={24} />
                            <h2 className="text-2xl font-bold text-white font-mono">STRATEGIC VISUALIZATION LAYOUTS</h2>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-white font-mono text-sm border-b border-white/10 pb-2 mb-4">CORE INTELLIGENCE VIEWS</h3>

                            <div className="grid gap-4">
                                {[
                                    { name: 'Supply Chain Kinetic Flow', desc: 'Sankey flows showing risk propagation through supplier tiers.', tech: 'Nivo / ECharts' },
                                    { name: 'Global Infrastructure Hologram', desc: 'Dark 3D globe with extruded data pillars for physical assets.', tech: 'deck.gl / Mapbox' },
                                    { name: 'Dependency Fractal', desc: 'Zoomable Sunburst chart for software supply chain depth.', tech: 'D3.js' },
                                    { name: 'Threat Horizon HUD', desc: 'Real-time sparklines and scrolling tickers for signal velocity.', tech: 'uPlot / SSE' },
                                    { name: 'Comparative Risk Radar', desc: '6-axis radar charts benchmarking against peer cohorts.', tech: 'Recharts' },
                                    { name: 'Network Topology Circuit', desc: 'Orthogonal node-link graph for BGP/Routing paths.', tech: 'React Flow' },
                                    { name: 'Attack Path Knowledge Graph', desc: 'DAG showing causal chains from internet to critical assets.', tech: 'Cytoscape.js' }
                                ].map((layout, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 border border-white/5 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="text-purple-400 font-mono text-xs whitespace-nowrap pt-1">LAYOUT {i + 1}</div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">{layout.name}</h4>
                                            <p className="text-gray-400 text-xs mt-1">{layout.desc}</p>
                                            <span className="text-[10px] text-white/40 font-mono mt-2 block">Stack: {layout.tech}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 5: Tech Stack Table */}
                <section className="py-20 bg-white/5 border-t border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="flex items-center gap-3 mb-12 justify-center">
                            <Database className="text-blue-400" size={24} />
                            <h2 className="text-2xl font-bold text-white font-mono">TECHNOLOGY IMPLEMENTATION</h2>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-black/50 text-blue-400 font-mono text-xs uppercase">
                                    <tr>
                                        <th className="p-4">Component</th>
                                        <th className="p-4">Technology Stack</th>
                                        <th className="p-4">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-400 text-xs font-mono bg-black/20">
                                    {[
                                        { comp: 'Frontend Framework', stack: 'React 19', purp: 'Concurrent rendering, Server Components, Suspense' },
                                        { comp: 'Styling Engine', stack: 'Tailwind CSS', purp: 'Industrial Clean design system, rigid grids' },
                                        { comp: 'Graph Viz', stack: 'Cosmograph / React Flow', purp: 'Rendering 100k+ node topologies via WebGL' },
                                        { comp: 'Geospatial Viz', stack: 'deck.gl / Kepler.gl', purp: '3D globes for infrastructure mapping' },
                                        { comp: 'Statistical Viz', stack: 'Recharts / Nivo', purp: 'Radar charts & Box plots for benchmarking' },
                                        { comp: 'Performance', stack: 'Web Workers', purp: 'Offloading physics calculations from main thread' },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b last:border-0 border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4 text-white font-semibold">{row.comp}</td>
                                            <td className="p-4 text-cyan-400">{row.stack}</td>
                                            <td className="p-4">{row.purp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </section>

                {/* Contact CTA */}
                <section className="py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-oxot-gold/5 to-amber-900/10 border border-oxot-gold/20 rounded-3xl p-12"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Need Custom Assets?</h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            For specialized applications, co-branding requests, or high-resolution assets,
                            contact the OXOT brand team.
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-oxot-gold text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
                        >
                            Contact Brand Team
                        </Link>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
