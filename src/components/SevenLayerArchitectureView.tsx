"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Layers, Database, Shield, Brain, Activity, Zap, FileCode, Network, Target, TrendingUp, Users, GitBranch, Lock, BarChart3, Cpu, Globe, Box, Hexagon, Radar, Radio } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- 3D VISUALIZATION COMPONENTS ---

const VisualL0_Catalog = () => (
    <div className="relative w-full h-48 flex items-center justify-center perspective-1000">
        <motion.div
            className="w-24 h-24 border-2 border-gray-400/50 bg-gray-900/30 backdrop-blur-sm relative transform-style-3d"
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <div className="absolute inset-0 border border-gray-500/30 translate-z-12"></div>
            <div className="absolute inset-0 border border-gray-500/30 -translate-z-12"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <Database className="w-12 h-12 text-gray-400 opacity-50" />
            </div>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                className="w-48 h-48 border border-gray-500/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-40 h-40 border border-dashed border-gray-500/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
        </div>
    </div>
);

const VisualL1_Equipment = () => (
    <div className="relative w-full h-48 flex items-center justify-center perspective-1000">
        <div className="flex gap-4 transform-style-3d rotate-x-12">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-12 h-32 bg-blue-900/20 border border-blue-500/30 rounded flex flex-col items-center justify-end pb-2 gap-1 relative overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 animate-pulse"></div>
                    {[...Array(5)].map((_, j) => (
                        <div key={j} className="w-8 h-1 bg-blue-500/20 rounded-full"></div>
                    ))}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                    />
                </motion.div>
            ))}
        </div>
    </div>
);

const VisualL2_SBOM = () => (
    <div className="relative w-full h-48 flex items-center justify-center">
        <div className="relative w-40 h-40">
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-green-500 rounded-full"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${i * 45}deg) translate(60px) rotate(-${i * 45}deg)`
                        }}
                    >
                        <div className="absolute inset-0 bg-green-500/50 blur-sm"></div>
                    </motion.div>
                ))}
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
                <FileCode className="w-12 h-12 text-green-400" />
            </div>
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`line-${i}`}
                    className="absolute top-1/2 left-1/2 w-20 h-[1px] bg-green-500/20 origin-left"
                    style={{ rotate: i * 30 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
            ))}
        </div>
    </div>
);

const VisualL3_Threats = () => (
    <div className="relative w-full h-48 flex items-center justify-center">
        <div className="relative w-48 h-48 rounded-full border border-red-900/30 bg-red-900/5 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 border border-red-500/20 rounded-full"></div>
            <div className="absolute w-[90%] h-[90%] border border-red-500/10 rounded-full"></div>
            <div className="absolute w-[70%] h-[70%] border border-red-500/10 rounded-full"></div>

            <motion.div
                className="absolute w-full h-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`
                    }}
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
            ))}
            <Target className="w-8 h-8 text-red-500/50" />
        </div>
    </div>
);

const VisualL4_Psychology = () => (
    <div className="relative w-full h-48 flex items-center justify-center">
        <div className="relative w-64 h-32">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pink-500 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                />
            ))}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.line
                        key={i}
                        x1={`${Math.random() * 100}%`}
                        y1={`${Math.random() * 100}%`}
                        x2={`${Math.random() * 100}%`}
                        y2={`${Math.random() * 100}%`}
                        stroke="rgba(236, 72, 153, 0.2)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: Math.random() }}
                    />
                ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-16 h-16 text-pink-500/30" />
            </div>
        </div>
    </div>
);

const VisualL5_InfoStreams = () => (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
        <div className="flex gap-2">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                    {[...Array(8)].map((_, j) => (
                        <motion.div
                            key={j}
                            className={`w-4 h-4 rounded-sm ${Math.random() > 0.7 ? 'bg-orange-500' : 'bg-orange-900/20'}`}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }}
                        />
                    ))}
                </div>
            ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
);

const VisualL6_Predictions = () => (
    <div className="relative w-full h-48 flex items-center justify-center">
        <div className="relative w-64 h-32 flex items-center justify-center">
            {/* Future Cone */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10"></div>

            {/* Probability Paths */}
            <svg className="absolute inset-0 w-full h-full overflow-visible">
                <motion.path
                    d="M 20 64 Q 100 20 240 10"
                    fill="none"
                    stroke="rgba(168, 85, 247, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.path
                    d="M 20 64 Q 100 64 240 64"
                    fill="none"
                    stroke="rgba(168, 85, 247, 0.8)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                />
                <motion.path
                    d="M 20 64 Q 100 108 240 118"
                    fill="none"
                    stroke="rgba(168, 85, 247, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                />
            </svg>

            {/* Outcome Nodes */}
            <motion.div
                className="absolute right-0 top-[10%] w-3 h-3 bg-purple-500/50 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
                className="absolute right-0 top-[50%] -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
                className="absolute right-0 bottom-[10%] w-3 h-3 bg-purple-500/50 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
        </div>
    </div>
);

// --- MAIN COMPONENT ---

// Background particles
const LAYER_PARTICLES = [
    { text: "L0", type: "LEVEL" },
    { text: "L1", type: "LEVEL" },
    { text: "L2", type: "LEVEL" },
    { text: "L3", type: "LEVEL" },
    { text: "L4", type: "LEVEL" },
    { text: "L5", type: "LEVEL" },
    { text: "L6", type: "LEVEL" },
    { text: "SBOM", type: "TECH" },
    { text: "CVE", type: "VULN" },
    { text: "APT", type: "THREAT" },
    { text: "MITRE", type: "THREAT" },
    { text: "Bias", type: "PSYCH" },
    { text: "EPSS", type: "METRIC" },
    { text: "ML", type: "TECH" },
];

export default function SevenLayerArchitectureView() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        const particles = LAYER_PARTICLES.map((_, i) => document.getElementById(`layer-particle-${i}`));

        const animate = () => {
            particles.forEach((p, i) => {
                if (!p) return;
                const speed = 0.08 + (i % 4) * 0.04;
                const currentY = parseFloat(p.style.top || '50') - speed;
                p.style.top = currentY < -10 ? '110%' : `${currentY}%`;
            });
            requestAnimationFrame(animate);
        };

        particles.forEach((p, i) => {
            if (p) {
                p.style.top = `${Math.random() * 100}%`;
                p.style.left = `${Math.random() * 100}%`;
            }
        });

        animate();
    }, []);

    const levels = [
        {
            level: 0,
            title: "Equipment Catalog",
            subtitle: "Universal Product Definitions",
            icon: Database,
            color: "gray",
            gradient: "from-gray-400 to-gray-600",
            visual: VisualL0_Catalog,
            description: "The foundational reference layer defining standardized equipment types. This is the 'Platonic ideal' of equipment - not your specific deployed assets, but the universal blueprints and product definitions that those assets instantiate.",
            stats: [
                { value: "6,000+", label: "Product Definitions" },
                { value: "16", label: "Critical Sectors" },
                { value: "100%", label: "Vendor Coverage" }
            ],
            features: [
                { title: "Universal Blueprints", desc: "Standardized definitions for SCADA, transformer, and medical devices." },
                { title: "Vendor Intelligence", desc: "Tracks security responsiveness (e.g. Alstom vs Siemens patch cycles)." },
                { title: "Vulnerability Inheritance", desc: "Automatically maps new CVEs to all product instances." }
            ]
        },
        {
            level: 1,
            title: "Customer Equipment",
            subtitle: "Deployed Instances & State",
            icon: Network,
            color: "blue",
            gradient: "from-blue-400 to-blue-600",
            visual: VisualL1_Equipment,
            description: "The bridge between abstract catalogs and real-world operations. It answers: 'What do we have, where is it, and what is its state?' Verified physical assets with serial numbers and geo-location.",
            stats: [
                { value: "48,288", label: "Active Nodes" },
                { value: "5,000+", label: "Facilities Mapped" },
                { value: "61.6%", label: "Sector Aligned" }
            ],
            features: [
                { title: "Real-Time State", desc: "Live integration with CMDBs and asset management systems." },
                { title: "Geo-Spatial Mapping", desc: "Precise physical location tracking for kinetic impact analysis." },
                { title: "Cross-Sector Graph", desc: "Mapping interdependencies between Energy, Water, and Telco." }
            ]
        },
        {
            level: 2,
            title: "Software SBOM",
            subtitle: "Deep Dependency Tracking",
            icon: FileCode,
            color: "green",
            gradient: "from-green-400 to-green-600",
            visual: VisualL2_SBOM,
            description: "Transcends traditional inventory by achieving library-level granularity. We track not just applications, but specific library versions, transitive dependencies, and function-level code components.",
            stats: [
                { value: "316k+", label: "CVE Database" },
                { value: "140k+", label: "Components" },
                { value: "1,800+", label: "Avg. Dependencies" }
            ],
            features: [
                { title: "Transitive Analysis", desc: "Uncovers vulnerabilities buried 5+ levels deep in the dependency tree." },
                { title: "Auto-Resolution", desc: "Supports SPDX/CycloneDX and resolves npm, pip, maven, and go packages." },
                { title: "EPSS Enrichment", desc: "Every CVE scored with real-time Exploit Prediction Simulator." }
            ]
        },
        {
            level: 3,
            title: "Threat Intelligence",
            subtitle: "Active Attack Surface",
            icon: Shield,
            color: "red",
            gradient: "from-red-400 to-red-600",
            visual: VisualL3_Threats,
            description: "Transforms passive inventory into active threat modeling. Maps who is attacking, how they operate, and which specific assets they are targeting based on real-world campaigns.",
            stats: [
                { value: "691", label: "MITRE Techniques" },
                { value: "150+", label: "APT Groups" },
                { value: "10k+", label: "Active IoCs" }
            ],
            features: [
                { title: "Kill Chain Modeling", desc: "Full mapping of APT campaigns from Reconnaissance to Exfiltration." },
                { title: "Attribution Engine", desc: "Links IPs and hashes to specific threat actors (e.g. Volt Typhoon)." },
                { title: "Campaign Tracking", desc: "Monitors active campaigns against specific industry sectors." }
            ]
        },
        {
            level: 4,
            title: "Psychology",
            subtitle: "The Human Element",
            icon: Brain,
            color: "pink",
            gradient: "from-pink-400 to-pink-600",
            visual: VisualL4_Psychology,
            description: "Models the most overlooked dimension: human decision-making. We quantify cognitive biases, organizational culture, and 'irrational' behaviors that lead to security failures.",
            stats: [
                { value: "30", label: "Cognitive Biases" },
                { value: "18k+", label: "Logic Paths" },
                { value: "$7.3M", label: "Bias Cost/Yr" }
            ],
            features: [
                { title: "Lacanian Topology", desc: "Models the gap between 'Real' threats and 'Imaginary' fears." },
                { title: "Bias Cascades", desc: "Simulates how Overconfidence leads to Sunk Cost logic loops." },
                { title: "Organizational Risk", desc: "Quantifies 'Groupthink' and 'Normalcy Bias' in decision chains." }
            ]
        },
        {
            level: 5,
            title: "Information Streams",
            subtitle: "Global Event Processing",
            icon: Activity,
            color: "orange",
            gradient: "from-orange-400 to-orange-600",
            visual: VisualL5_InfoStreams,
            description: "The 'NOW' layer. A real-time pipeline processing global cybersecurity events, geopolitical shifts, and news wires with sub-second latency.",
            stats: [
                { value: "< 1s", label: "Event Latency" },
                { value: "10k+", label: "Events / Sec" },
                { value: "5,500", label: "Stream Nodes" }
            ],
            features: [
                { title: "Echo Chamber Detection", desc: "Measures media amplification and FUD propagation." },
                { title: "Sentiment Analysis", desc: "Real-time BERT models analyzing global security sentiment." },
                { title: "Geopolitical Correlation", desc: "Links kinetic warfare events to cyber activity spikes." }
            ]
        },
        {
            level: 6,
            title: "Predictions",
            subtitle: "Psychohistory & Forecasting",
            icon: Zap,
            color: "purple",
            gradient: "from-purple-400 to-purple-600",
            visual: VisualL6_Predictions,
            description: "The apex capability. Mathematical prediction of future security states using statistical mechanics and historical baselines. Not magic—math.",
            stats: [
                { value: "92%", label: "Accuracy (30d)" },
                { value: "24k+", label: "Predictions" },
                { value: "8,900", label: "Forecasts" }
            ],
            features: [
                { title: "Breach Forecasting", desc: "Probabilistic models of breach likelihood by sector and asset." },
                { title: "Remediation Lag", desc: "Predicts how long specific organizations will take to patch." },
                { title: "ROI Simulation", desc: "'What If' engine for security investment optimization." }
            ]
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent text-gray-300 font-sans selection:bg-blue-500/30 selection:text-white overflow-hidden">

            {/* Background Particles */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    {LAYER_PARTICLES.map((particle, i) => (
                        <div
                            key={i}
                            id={`layer-particle-${i}`}
                            className={`absolute text-[10px] font-mono whitespace-nowrap transition-colors duration-1000
                                ${particle.type === 'LEVEL' ? 'text-blue-500' :
                                    particle.type === 'TECH' ? 'text-green-500' :
                                        particle.type === 'THREAT' ? 'text-red-500' :
                                            particle.type === 'PSYCH' ? 'text-pink-500' : 'text-purple-500'}`}
                        >
                            {particle.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ opacity }}
                    className="text-center z-10"
                >
                    <div className="inline-block mb-6 px-6 py-2 border border-blue-500/50 bg-blue-900/10 rounded-full">
                        <span className="text-blue-400 font-mono text-sm uppercase tracking-widest">Core Architecture</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                        7-LAYER <span className="text-gradient bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent">ARCHITECTURE</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-400 mb-4 max-w-4xl mx-auto font-light">
                        From Metal to Mind // The Vertical Stack
                    </p>

                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        A comprehensive journey through the foundational layers of the AEON Cyber Digital Twin.
                        From <span className="text-white font-bold">physical equipment catalogs</span> to
                        <span className="text-purple-400 font-bold"> predictive intelligence</span>,
                        spanning <span className="text-green-400 font-bold">316K+ CVEs</span>,
                        <span className="text-red-400 font-bold"> 691 MITRE techniques</span>, and
                        <span className="text-pink-400 font-bold"> 30 cognitive biases</span>.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <div className="px-6 py-3 bg-blue-900/20 border border-blue-500/30 rounded">
                            <Layers className="w-5 h-5 inline mr-2 text-blue-400" />
                            <span className="text-white font-bold">48,288 Equipment Instances</span>
                        </div>
                        <div className="px-6 py-3 bg-green-900/20 border border-green-500/30 rounded">
                            <FileCode className="w-5 h-5 inline mr-2 text-green-400" />
                            <span className="text-white font-bold">316,552 CVE Database</span>
                        </div>
                        <div className="px-6 py-3 bg-purple-900/20 border border-purple-500/30 rounded">
                            <Zap className="w-5 h-5 inline mr-2 text-purple-400" />
                            <span className="text-white font-bold">24,409 Predictions</span>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-10 animate-bounce">
                    <div className="w-6 h-10 border-2 border-blue-500/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-blue-400 rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Main Content - Layer Sections */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 space-y-32">

                {levels.map((layer, idx) => {
                    const Icon = layer.icon;
                    const Visual = layer.visual;
                    const isEven = idx % 2 === 0;

                    return (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative"
                        >
                            {/* Level Header */}
                            <div className={`flex items-center gap-6 mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`relative group`}>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${layer.gradient} blur-2xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full`}></div>
                                    <div className={`relative w-24 h-24 bg-${layer.color}-900/20 border-2 border-${layer.color}-500/50 rounded-2xl flex items-center justify-center`}>
                                        <Icon className={`w-12 h-12 text-${layer.color}-400`} />
                                    </div>
                                </div>
                                <div className={isEven ? 'text-left' : 'text-right'}>
                                    <div className={`text-6xl font-black text-${layer.color}-500/20 mb-2`}>
                                        L{layer.level}
                                    </div>
                                    <h2 className="text-4xl font-black text-white mb-2">{layer.title}</h2>
                                    <p className={`text-lg text-${layer.color}-400`}>{layer.subtitle}</p>
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className={`relative bg-black/40 border border-${layer.color}-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-${layer.color}-500/40 transition-all overflow-hidden`}>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                                    {/* Left: 3D Visual */}
                                    <div className="h-64 bg-black/20 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                                        <div className={`absolute inset-0 bg-${layer.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                        <Visual />
                                    </div>

                                    {/* Right: Key Stats & Description */}
                                    <div className="flex flex-col justify-center">
                                        <p className="text-xl text-gray-200 leading-relaxed mb-8 font-light border-l-2 border-white/10 pl-6">
                                            {layer.description}
                                        </p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {layer.stats.map((stat, sIdx) => (
                                                <div key={sIdx} className={`p-4 rounded-lg bg-${layer.color}-500/5 border border-${layer.color}-500/10 flex justify-between items-center hover:bg-${layer.color}-500/10 transition-colors`}>
                                                    <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">{stat.label}</span>
                                                    <span className={`text-2xl font-black text-${layer.color}-400`}>{stat.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {layer.features.map((feature, fIdx) => (
                                        <div key={fIdx} className={`p-6 rounded-xl bg-black/60 border border-white/5 hover:border-${layer.color}-500/30 transition-all hover:-translate-y-1 group cursor-default`}>
                                            <div className={`w-10 h-10 rounded-lg bg-${layer.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <div className={`w-2 h-2 rounded-full bg-${layer.color}-400`}></div>
                                            </div>
                                            <h4 className={`text-lg font-bold text-white mb-2 group-hover:text-${layer.color}-400 transition-colors`}>{feature.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Visual Accent */}
                                <div className={`absolute -bottom-3 -right-3 w-32 h-32 bg-gradient-to-br ${layer.gradient} opacity-5 blur-3xl rounded-full`}></div>
                            </div>

                            {/* Connector Line to Next Level */}
                            {idx < levels.length - 1 && (
                                <div className="flex justify-center mt-16">
                                    <div className={`w-0.5 h-16 bg-gradient-to-b from-${layer.color}-500/50 to-transparent`}></div>
                                </div>
                            )}
                        </motion.section>
                    );
                })}

                {/* Summary Section */}
                <section className="mt-32 p-12 bg-gradient-to-b from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-2xl">
                    <h2 className="text-4xl font-black text-white mb-8 text-center">The Complete Architecture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-black text-blue-400 mb-2">7</div>
                            <div className="text-sm uppercase tracking-wider text-gray-400">Architectural Levels</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-green-400 mb-2">48K+</div>
                            <div className="text-sm uppercase tracking-wider text-gray-400">Equipment Instances</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-purple-400 mb-2">75-92%</div>
                            <div className="text-sm uppercase tracking-wider text-gray-400">Prediction Accuracy</div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
