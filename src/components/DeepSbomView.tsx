
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Database, Layers, Shield, Brain, Globe,
    Activity, AlertTriangle, Cpu,
    TrendingUp, CheckCircle,
    Terminal, Code, ChevronRight, ChevronDown, AlertCircle,
    Clock, Target, Eye, XCircle, GitBranch, Microscope,
    Waves, Info, Box, FileJson, Share2, Network, Lock, Zap, Search,
    ShieldAlert, BookOpen, FileCode, Sigma
} from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { FlipCard } from './ui/FlipCard';

// --- PARTICLES DATA FOR HERO ---
const LIBRARIES = [
    "OpenSSL 1.0.1", "Log4j 2.14", "glibc", "zlib", "Spring Boot",
    "PyYAML", "Jackson", "Netty", "Bouncy Castle", "Apache Struts",
    "jQuery", "Lodash", "React", "Angular", "Vue", "Moment.js"
];

const DeepSbomView: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    // Particle Animation Logic
    const particlesRef = useRef(LIBRARIES.map(() => ({
        x: 0, y: 0,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: 150 + Math.random() * 200,
        speed: 0.0005 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2
    })));

    useEffect(() => {
        let animationFrame: number;
        let time = 0;
        const animate = () => {
            time += 0.01;
            particlesRef.current.forEach((p, i) => {
                p.angle += p.speed;
                const r = p.orbitRadius + Math.sin(time + p.phase) * 30;
                const targetX = Math.cos(p.angle) * r;
                const targetY = Math.sin(p.angle * 0.8) * (r * 0.6);

                const el = document.getElementById(`lib-particle-${i}`);
                if (el) {
                    el.style.transform = `translate(${targetX}px, ${targetY}px)`;
                    el.style.opacity = `${0.3 + Math.sin(time + p.phase) * 0.2}`;
                }
            });
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const sections = [
        { id: 0, title: 'Executive Summary', icon: <Info className="w-4 h-4" /> },
        { id: 1, title: 'SBOM Architecture', icon: <Database className="w-4 h-4" /> },
        { id: 2, title: 'Vulnerability Variation', icon: <GitBranch className="w-4 h-4" /> },
        { id: 3, title: 'MITRE ATT&CK', icon: <Shield className="w-4 h-4" /> },
        { id: 6, title: 'Threat Modeling', icon: <ShieldAlert className="w-4 h-4" /> },
        { id: 4, title: 'Prioritization', icon: <Target className="w-4 h-4" /> },
        { id: 5, title: 'Psychohistory', icon: <Brain className="w-4 h-4" /> },
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-transparent text-gray-100 overflow-hidden font-sans">

            {/* Hero Section - PRESERVED FROM ORIGINAL */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ opacity }}
                    className="text-center z-10"
                >
                    <div className="inline-block mb-6 px-6 py-2 border border-green-500/50 bg-green-900/10 rounded-full">
                        <span className="text-green-400 font-mono text-sm uppercase tracking-widest">Architectural Core</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                        DEEP <span className="text-gradient bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">SBOM</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-green-400 mb-4 max-w-4xl mx-auto font-light">
                        The DNA of Risk // The Mathematical Foundation
                    </p>

                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Beyond simple inventory. A vertical journey from <span className="text-white font-bold">Metal to Mind</span>,
                        powered by the <span className="text-purple-400 font-bold">E27 Psychohistory Engine</span> and
                        <span className="text-pink-400 font-bold"> McKenney-Lacan Calculus</span>.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <div className="px-6 py-3 bg-green-900/20 border border-green-500/30 rounded">
                            <FileCode className="w-5 h-5 inline mr-2 text-green-400" />
                            <span className="text-white font-bold">Library-Level Analysis</span>
                        </div>
                        <div className="px-6 py-3 bg-blue-900/20 border border-blue-500/30 rounded">
                            <Layers className="w-5 h-5 inline mr-2 text-blue-400" />
                            <span className="text-white font-bold">6-Level Architecture</span>
                        </div>
                        <div className="px-6 py-3 bg-purple-900/20 border border-purple-500/30 rounded">
                            <Sigma className="w-5 h-5 inline mr-2 text-purple-400" />
                            <span className="text-white font-bold">E27 Prediction Engine</span>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-10 animate-bounce">
                    <div className="w-6 h-10 border-2 border-green-500/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-green-400 rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* NAVIGATION & CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                <div className="sticky top-4 z-50 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-2 mb-12 flex justify-center overflow-x-auto">
                    <div className="flex gap-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setSelectedSection(section.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all whitespace-nowrap ${selectedSection === section.id
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {section.icon}
                                {section.title}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {selectedSection === 0 && <ExecutiveSummary />}
                        {selectedSection === 1 && <SBOMArchitecture />}
                        {selectedSection === 2 && <VulnerabilityVariation />}
                        {selectedSection === 3 && <MITREIntegration />}
                        {selectedSection === 4 && <Prioritization />}
                        {selectedSection === 5 && <PsychohistoryPredictions />}
                        {selectedSection === 6 && <ThreatModelingSection />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div >
    );
};

// ==================== SECTION 1: EXECUTIVE SUMMARY ====================

const ExecutiveSummary: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
                <GlowCard className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <AlertTriangle className="text-red-500" /> The Blind Spot
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                        Traditional security tracks assets at the <strong>Equipment Level</strong> (e.g., "Cisco ASA Firewall"). This is insufficient. Vulnerabilities reside deep within the <strong>Library Level</strong> (e.g., "OpenSSL 1.0.2k").
                    </p>
                    <div className="bg-black/40 border border-red-500/20 p-4 rounded-lg">
                        <p className="text-red-400 text-xs font-mono">
                            "The board asks 'What's our risk?', but without visibility into the underlying software libraries, we are merely guessing."
                        </p>
                    </div>
                </GlowCard>

                <GlowCard className="p-8" glowColor="rgba(16, 185, 129, 0.15)">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Database className="text-emerald-500" /> The AEON Solution
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                        We extend the Digital Twin to the molecular level. By generating and analyzing dynamic SBOMs for every asset, we reveal the hidden dependency chains that attackers exploit.
                    </p>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono rounded">SPDX 2.3</span>
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono rounded">CycloneDX</span>
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono rounded">VEX</span>
                    </div>
                </GlowCard>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: "Precision", value: "100x", desc: "Granularity vs Asset Mgmt", color: "text-cyan-400" },
                    { label: "False Positives", value: "-87%", desc: "Context-aware filtering", color: "text-emerald-400" },
                    { label: "Prediction", value: "73%", desc: "Accuracy for future CVEs", color: "text-purple-400" },
                    { label: "Attack Paths", value: "691", desc: "MITRE Techniques Mapped", color: "text-red-400" }
                ].map((m, i) => (
                    <FlipCard
                        key={i}
                        height="h-40"
                        frontContent={
                            <div className="flex flex-col items-center justify-center h-full p-4">
                                <span className={`text-4xl font-bold ${m.color} mb-2`}>{m.value}</span>
                                <span className="text-xs text-slate-500 uppercase tracking-widest">{m.label}</span>
                            </div>
                        }
                        backContent={
                            <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-cyan-900/10">
                                <span className="text-sm text-white font-medium mb-2">{m.label}</span>
                                <span className="text-xs text-slate-400">{m.desc}</span>
                            </div>
                        }
                    />
                ))}
            </div>

            <GlowCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                    <Waves className="text-blue-500 w-8 h-8" />
                    <div>
                        <h4 className="text-lg font-bold text-white">Scenario: Los Angeles Water (LADWP)</h4>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Real-World Impact Analysis</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 bg-red-500/20 text-[9px] text-red-400 font-mono">PLANT A</div>
                        <div className="space-y-2 text-xs font-mono text-slate-400">
                            <div className="flex justify-between"><span className="text-slate-500">ASSET</span> <span>Cisco ASA 5500</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">FIRMWARE</span> <span className="text-red-400">9.8.4 (Old)</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">LIBRARY</span> <span className="text-red-400">OpenSSL 1.0.2k</span></div>
                            <div className="flex justify-between border-t border-red-500/20 pt-2"><span className="text-slate-500">RISK</span> <span className="text-red-500 font-bold">CRITICAL (87.3)</span></div>
                        </div>
                    </div>
                    <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 bg-emerald-500/20 text-[9px] text-emerald-400 font-mono">PLANT B</div>
                        <div className="space-y-2 text-xs font-mono text-slate-400">
                            <div className="flex justify-between"><span className="text-slate-500">ASSET</span> <span>Cisco ASA 5500</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">FIRMWARE</span> <span className="text-emerald-400">9.12.2 (New)</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">LIBRARY</span> <span className="text-emerald-400">OpenSSL 3.0.1</span></div>
                            <div className="flex justify-between border-t border-emerald-500/20 pt-2"><span className="text-slate-500">RISK</span> <span className="text-emerald-500 font-bold">LOW (23.1)</span></div>
                        </div>
                    </div>
                </div>
            </GlowCard>
        </div>
    );
};

// ==================== SECTION 2: SBOM ARCHITECTURE ====================

const SBOMArchitecture: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">The Dependency Graph</h3>
                <p className="text-slate-400 text-sm">
                    We construct a directed graph linking physical assets to their software DNA. This enables queries like "Show me every device running Log4j 2.14 across all 16 sectors."
                </p>
            </div>

            {/* Interactive Graph Visualizer Simulation */}
            <div className="relative h-[400px] bg-black/40 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                {/* Simulated Nodes */}
                <div className="relative w-full max-w-2xl h-64">
                    {/* Equipment Node */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center shadow-[0_0_20px_rgba(100,116,139,0.3)]">
                            <Box className="text-slate-400" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-black/50 px-2 py-1 rounded">EQUIPMENT</span>
                    </motion.div>

                    {/* Connection Line 1 */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                            d="M 80,128 L 220,128"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </svg>

                    {/* SBOM Node */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute left-[220px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-full bg-blue-900/30 border border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <FileJson className="text-blue-400" />
                        </div>
                        <span className="text-[10px] font-mono text-blue-400 bg-black/50 px-2 py-1 rounded">SBOM</span>
                    </motion.div>

                    {/* Connection Line 2 */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                            d="M 284,128 L 420,64"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                        />
                        <motion.path
                            d="M 284,128 L 420,192"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                        />
                    </svg>

                    {/* Library Nodes */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute left-[420px] top-16 flex flex-col items-center gap-2"
                    >
                        <div className="w-12 h-12 rounded-lg bg-purple-900/30 border border-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            <Code className="text-purple-400 w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-mono text-purple-400">OpenSSL</span>
                            <span className="block text-[9px] text-slate-500">v1.0.2k</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.7 }}
                        className="absolute left-[420px] top-48 flex flex-col items-center gap-2"
                    >
                        <div className="w-12 h-12 rounded-lg bg-emerald-900/30 border border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                            <Code className="text-emerald-400 w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-mono text-emerald-400">Log4j</span>
                            <span className="block text-[9px] text-slate-500">v2.17.1</span>
                        </div>
                    </motion.div>

                    {/* CVE Node */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        className="absolute left-[580px] top-8 flex flex-col items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                            <AlertCircle className="text-black w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono text-red-500 font-bold bg-black/50 px-2 py-1 rounded">CVE-2022-0778</span>
                    </motion.div>

                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                            d="M 468,76 L 580,48"
                            stroke="rgba(239,68,68,0.5)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 2.0 }}
                        />
                    </svg>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <GlowCard className="p-6">
                    <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2"><Search size={16} /> Impact Analysis Query</h4>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto border border-white/5">
                        MATCH (eq:Asset)-[:HAS_SBOM]-&gt;(s)-[:CONTAINS]-&gt;(lib:Library)<br />
                        WHERE lib.name = "OpenSSL" AND lib.version &lt; "3.0"<br />
                        RETURN eq.facility, eq.zone, lib.risk_score
                    </div>
                </GlowCard>
                <GlowCard className="p-6">
                    <h4 className="text-purple-400 font-bold mb-4 flex items-center gap-2"><GitBranch size={16} /> Transitive Dependency</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        We don't just see the top-level app. We see the library <em>inside</em> the framework <em>inside</em> the container <em>inside</em> the firmware. We map dependencies 5 levels deep.
                    </p>
                </GlowCard>
            </div>
        </div>
    );
};

// ==================== SECTION 3: VULNERABILITY VARIATION ====================

const VulnerabilityVariation: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6">The Homogeneity Fallacy</h3>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        Organizations assume "Standardization" means "Identical Risk". Our data proves otherwise. In a fleet of 2,014 identical PLCs, firmware drift created a "Toxic Tail" of 143 critical assets that were 4x more vulnerable than the rest.
                    </p>
                    <div className="flex gap-4 text-sm font-mono">
                        <div className="bg-white/5 px-4 py-2 border border-white/10 rounded">
                            <span className="block text-slate-500 text-[10px]">MEAN RISK</span>
                            <span className="text-white text-lg">42.5</span>
                        </div>
                        <div className="bg-red-900/20 px-4 py-2 border border-red-500/30 rounded">
                            <span className="block text-red-400 text-[10px]">OUTLIERS</span>
                            <span className="text-red-500 text-lg">7.1%</span>
                        </div>
                    </div>
                </div>
                <GlowCard className="p-8 h-64 flex items-end justify-between gap-1">
                    {/* Histogram Bars */}
                    {[5, 10, 20, 45, 80, 120, 150, 110, 80, 50, 30, 20, 15, 10, 8, 12, 25, 40, 20, 5].map((h, i) => (
                        <div key={i} className="w-full relative group">
                            <motion.div
                                className={`w-full rounded-t-sm ${i > 15 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-cyan-500/30'}`}
                                initial={{ height: 0 }}
                                animate={{ height: `${h / 2}%` }}
                                transition={{ duration: 1, delay: i * 0.05 }}
                            />
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-[9px] px-2 py-1 rounded border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                Assets: {h}
                            </div>
                        </div>
                    ))}
                </GlowCard>
            </div>
        </div>
    );
};

// ==================== SECTION 4: MITRE ATT&CK ====================

const MITREIntegration: React.FC = () => {
    return (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Closing the Semantic Gap</h3>

            <div className="relative">
                {/* Horizontal Flow Line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                        { title: "CVE", code: "CVE-2022-0778", desc: "Infinite Loop", color: "border-red-500 text-red-400 bg-red-950/20" },
                        { title: "CWE", code: "CWE-835", desc: "Loop w/o Exit", color: "border-orange-500 text-orange-400 bg-orange-950/20" },
                        { title: "CAPEC", code: "CAPEC-125", desc: "Flooding", color: "border-yellow-500 text-yellow-400 bg-yellow-950/20" },
                        { title: "TECHNIQUE", code: "T1499", desc: "DoS Endpoint", color: "border-blue-500 text-blue-400 bg-blue-950/20" },
                        { title: "TACTIC", code: "TA0040", desc: "IMPACT", color: "border-purple-500 text-purple-400 bg-purple-950/20" },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.15 }}
                            className={`relative z-10 p-4 rounded-lg border ${step.color} backdrop-blur-md flex flex-col items-center text-center h-32 justify-center group hover:scale-105 transition-transform`}
                        >
                            <span className="text-[10px] font-bold opacity-70 mb-1">{step.title}</span>
                            <span className="font-mono text-sm font-bold mb-2">{step.code}</span>
                            <span className="text-[10px] opacity-80">{step.desc}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <GlowCard className="p-8 mt-12 flex flex-col md:flex-row gap-8 items-center">
                <Target className="w-16 h-16 text-red-500 shrink-0" />
                <div>
                    <h4 className="text-xl font-bold text-white mb-2">Operational Consequence Analysis</h4>
                    <p className="text-slate-400 text-sm">
                        We don't just stop at "Denial of Service". We map the Tactic to the physical process. <br />
                        <span className="text-red-400">T1499 on PLC-04 &rarr; Loss of Cooling Control &rarr; Turbine Trip &rarr; $2M/hr Impact.</span>
                    </p>
                </div>
            </GlowCard>
        </div>
    );
};

// ==================== SECTION 6: THREAT MODELING (NEW) ====================

const ThreatModelingSection: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto mb-10">
                <h3 className="text-3xl font-bold text-white mb-4">Component Threat Modeling</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                    A multi-framework approach that maps abstract methodologies to concrete software libraries.
                    We analyze software components through the lens of <strong>STRIDE</strong> (Development), <strong>EMB3D</strong> (Device), and <strong>MITRE ATT&CK</strong> (Execution).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* STRIDE CARD */}
                <GlowCard className="p-6 h-full flex flex-col" glowColor="rgba(249, 115, 22, 0.2)">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="text-orange-500 w-8 h-8" />
                        <div>
                            <h4 className="text-xl font-bold text-white">STRIDE</h4>
                            <p className="text-[10px] text-orange-400 uppercase tracking-widest">Library-Level Analysis</p>
                        </div>
                    </div>
                    <div className="space-y-3 flex-1">
                        {[
                            { l: "S", t: "Spoofing", v: "Auth Lib Bypass (Shiro)" },
                            { l: "T", t: "Tampering", v: "Insecure Deserialization (Jackson)" },
                            { l: "R", t: "Repudiation", v: "Logging Failure (Log4j)" },
                            { l: "I", t: "Info Disclosure", v: "Memory Leak (OpenSSL Heartbleed)" },
                            { l: "D", t: "Denial of Service", v: "Regex ReDoS (axios)" },
                            { l: "E", t: "Elevation", v: "Logic Bug (Polkit)" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm p-2 rounded bg-orange-950/10 border border-orange-500/10">
                                <span className="font-bold text-orange-500 w-4">{item.l}</span>
                                <span className="text-slate-300 w-24">{item.t}</span>
                                <span className="text-slate-500 text-xs font-mono truncate">{item.v}</span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute right-4 bottom-4 text-xs font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        [&gt;] INITIATE_TRACE
                    </div>
                </GlowCard>

                {/* EMB3D CARD */}
                <GlowCard className="p-6 h-full flex flex-col" glowColor="rgba(16, 185, 129, 0.2)">
                    <div className="flex items-center gap-3 mb-6">
                        <Cpu className="text-emerald-500 w-8 h-8" />
                        <div>
                            <h4 className="text-xl font-bold text-white">EMB3D</h4>
                            <p className="text-[10px] text-emerald-400 uppercase tracking-widest">Embedded Context</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-6">
                        Applying the NREL/Red Balloon threat model to firmware components within OT devices.
                    </p>
                    <div className="space-y-4">
                        <div className="p-3 bg-emerald-900/10 border border-emerald-500/20 rounded">
                            <span className="block text-emerald-400 text-xs font-bold mb-1">FIRMWARE UPDATE</span>
                            <span className="text-slate-300 text-xs">Library: <code>libcurl</code></span>
                            <span className="block text-slate-500 text-[10px] mt-1">Threat: MITM leading to malicious firmware flash.</span>
                        </div>
                        <div className="p-3 bg-emerald-900/10 border border-emerald-500/20 rounded">
                            <span className="block text-emerald-400 text-xs font-bold mb-1">PHYSICAL ACCESS</span>
                            <span className="text-slate-300 text-xs">Library: <code>U-Boot</code></span>
                            <span className="block text-slate-500 text-[10px] mt-1">Threat: Bootloader glitching to bypass Secure Boot.</span>
                        </div>
                        <div className="p-3 bg-emerald-900/10 border border-emerald-500/20 rounded">
                            <span className="block text-emerald-400 text-xs font-bold mb-1">COMMUNICATION</span>
                            <span className="text-slate-300 text-xs">Library: <code>lwIP</code></span>
                            <span className="block text-slate-500 text-[10px] mt-1">Threat: Malformed packet handling causing kernel panic.</span>
                        </div>
                    </div>
                </GlowCard>

                {/* MITRE CARD */}
                <GlowCard className="p-6 h-full flex flex-col" glowColor="rgba(239, 68, 68, 0.2)">
                    <div className="flex items-center gap-3 mb-6">
                        <ShieldAlert className="text-red-500 w-8 h-8" />
                        <div>
                            <h4 className="text-xl font-bold text-white">MITRE ATT&CK</h4>
                            <p className="text-[10px] text-red-400 uppercase tracking-widest">Tactical Execution</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="border-l-2 border-red-500 pl-4 py-2">
                            <span className="block text-red-400 text-xs font-bold">INITIAL ACCESS (TA0001)</span>
                            <span className="text-slate-400 text-[10px]">Exploit Public Facing Application (T1190) via <strong>Spring4Shell</strong></span>
                        </div>
                        <div className="border-l-2 border-red-500/60 pl-4 py-2">
                            <span className="block text-red-400/80 text-xs font-bold">EXECUTION (TA0002)</span>
                            <span className="text-slate-400 text-[10px]">Command and Scripting Interpreter (T1059) via <strong>bash/sh</strong></span>
                        </div>
                        <div className="border-l-2 border-red-500/40 pl-4 py-2">
                            <span className="block text-red-400/60 text-xs font-bold">PERSISTENCE (TA0003)</span>
                            <span className="text-slate-400 text-[10px]">Create or Modify System Process (T1543) via <strong>systemd</strong></span>
                        </div>
                        <div className="border-l-2 border-red-500/20 pl-4 py-2">
                            <span className="block text-red-400/40 text-xs font-bold">LATERAL MOVEMENT (TA0008)</span>
                            <span className="text-slate-400 text-[10px]">Exploitation of Remote Services (T1210) via <strong>SMB/RPC</strong></span>
                        </div>
                    </div>
                </GlowCard>
            </div>
        </div>
    );
};

// ==================== SECTION 5: PRIORITIZATION ====================

const Prioritization: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">The Algorithm</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        In an environment with 10,000 alerts, "Fix Everything" is not a strategy. We use a multi-factor weighted algorithm to calculate a <strong>PriorityScore</strong> (0-100).
                    </p>
                    <div className="font-mono text-xs bg-black/50 p-4 rounded border border-white/10 text-cyan-400">
                        Score = (Criticality * 0.3) + (Exploitability * 0.35) + (Impact * 0.25) + (Exposure * 0.1)
                    </div>
                </div>
                <div className="space-y-4">
                    <FlipCard
                        height="h-24"
                        frontContent={
                            <div className="h-full flex items-center justify-between px-6 bg-red-950/20">
                                <span className="text-2xl font-bold text-red-500">NOW</span>
                                <span className="font-mono text-red-400">Score &gt; 80</span>
                            </div>
                        }
                        backContent={
                            <div className="h-full flex items-center justify-center p-4 bg-red-950/40 text-center">
                                <span className="text-xs text-red-200">Clear & Present Danger. <br />Active Exploit + Critical Asset. <br /><strong>SLA: 24h</strong></span>
                            </div>
                        }
                    />
                    <FlipCard
                        height="h-24"
                        frontContent={
                            <div className="h-full flex items-center justify-between px-6 bg-yellow-950/20">
                                <span className="text-2xl font-bold text-yellow-500">NEXT</span>
                                <span className="font-mono text-yellow-400">40 &lt; Score &lt; 80</span>
                            </div>
                        }
                        backContent={
                            <div className="h-full flex items-center justify-center p-4 bg-yellow-950/40 text-center">
                                <span className="text-xs text-yellow-200">Latent Risk. <br />High Value OR High Vuln. <br /><strong>SLA: 30 Days</strong></span>
                            </div>
                        }
                    />
                    <FlipCard
                        height="h-24"
                        frontContent={
                            <div className="h-full flex items-center justify-between px-6 bg-green-950/20">
                                <span className="text-2xl font-bold text-green-500">NEVER</span>
                                <span className="font-mono text-green-400">Score &lt; 40</span>
                            </div>
                        }
                        backContent={
                            <div className="h-full flex items-center justify-center p-4 bg-green-950/40 text-center">
                                <span className="text-xs text-green-200">Acceptable Residual Risk. <br />Monitor only. <br /><strong>SLA: None</strong></span>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

// ==================== SECTION 6: PSYCHOHISTORY ====================

const PsychohistoryPredictions: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <Brain className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold text-white mb-4">Predictive Cyber Immunity</h3>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Using Temporal Graph Networks (TGN), we analyze code churn, developer turnover, and dark web chatter to forecast vulnerabilities <strong>before</strong> a CVE is assigned.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <GlowCard className="p-6 text-center" glowColor="rgba(168, 85, 247, 0.2)">
                    <div className="text-4xl font-bold text-purple-400 mb-2">73%</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">Prediction Accuracy</div>
                    <p className="text-xs text-slate-400 mt-4">For library vulnerabilities within a 90-day window.</p>
                </GlowCard>
                <GlowCard className="p-6 text-center" glowColor="rgba(168, 85, 247, 0.2)">
                    <div className="text-4xl font-bold text-purple-400 mb-2">R0</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">Epidemiology Modeling</div>
                    <p className="text-xs text-slate-400 mt-4">Calculates the reproduction rate of a wormable exploit inside the LAN.</p>
                </GlowCard>
                <GlowCard className="p-6 text-center" glowColor="rgba(168, 85, 247, 0.2)">
                    <div className="text-4xl font-bold text-purple-400 mb-2">T-30</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">Pre-Patch Advantage</div>
                    <p className="text-xs text-slate-400 mt-4">Days of lead time gained by predicting "Next Vulnerable Component".</p>
                </GlowCard>
            </div>
        </div>
    );
};

export default DeepSbomView;
