"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, UserX, Database, ShieldCheck, Skull } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function MirrorStrikePage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/theory"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-mono"
                    >
                        <ArrowLeft size={16} /> Back to Theory Hub
                    </Link>
                </motion.div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500 text-purple-400 text-xs font-mono font-bold">
                                RSCH-30
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Mirror <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-200">
                                Strike
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Counter-reconnaissance and threat actor digital twin construction. We model the attacker as they scan us.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Active Defense
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Counter-Intel
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Actor Attribution
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-center"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <UserX size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Information Leakage
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                            <TypewriterEquation
                                equation="I_{leaked} = f(\text{packet}, \text{timing}, \text{payload}, \text{behavior})"
                                className="text-2xl md:text-3xl text-purple-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "Every attack packet reveals something about the sender: infrastructure, timezone, tooling, and even intent. We capture it all."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Attacker Scan</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Process</div>
                                <div className="text-sm font-bold text-purple-400">Twin Mapping</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Output</div>
                                <div className="text-sm font-bold text-white">Identity</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Left Column: Core Theory */}
                    <div className="md:col-span-2 space-y-16">

                        {/* Section 1 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <ShieldCheck className="text-purple-400" />
                                Inverting the Asymmetry
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Traditionally, the attacker knows everything about the target, and the defender knows nothing about the attacker.
                                    Mirror Strike reverses this. By feeding scanned data into a <strong>Threat Actor Digital Twin</strong> (Neo4j graph),
                                    we build a live model of their infrastructure.
                                </p>
                                <p>
                                    Using passive OSINT enrichment (Shodan, GreyNoise) on incoming IPs, we can infer the attacker's tools,
                                    vulnerabilities, and supply chain dependencies.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Database className="text-oxot-gold" />
                                Game Theoretic Deterrence
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Mirror Strike changes the equilibrium. Attackers face a dilemma:
                                </p>
                                <ul className="list-disc pl-4 space-y-2 marker:text-purple-500">
                                    <li><strong>Attack Aggressively:</strong> Leak more info, risking fast attribution and counter-measure.</li>
                                    <li><strong>Attack Cautiously:</strong> Slow down, increasing cost and reducing success probability.</li>
                                </ul>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-500 mt-4">
                                    <p className="font-mono text-sm text-purple-300">
                                        Result: 68% of sophisticated actors mapped within 72 hours.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Threat Actor Twin Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Skull size={16} /> Actor Twin Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-900/50 flex items-center justify-center border border-red-500/30">
                                        <UserX size={20} className="text-red-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">APT-29 (Cozy Bear)</div>
                                        <div className="text-xs text-gray-400">Confidence: 85%</div>
                                    </div>
                                </div>

                                <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Tool Detected</span>
                                        <span className="text-purple-400 font-mono">Cobalt Strike 4.7</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Infra</span>
                                        <span className="text-red-300 font-mono">3 C2 Nodes (DigitalOcean)</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Vuln</span>
                                        <span className="text-yellow-400 font-mono">CVE-2022-39197 (Beacon)</span>
                                    </div>
                                </div>

                                <div className="text-center pt-2">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                                        Profiled via Passive Recon
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* References */}
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                References
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Rid, T. & Buchanan, B. (2015). Attributing Cyber Attacks.",
                                    "Denning, D. E. (2014). Active Cyber Defense Principles.",
                                    "Stoll, C. (1989). The Cuckoo's Egg.",
                                ].map((ref, i) => (
                                    <li key={i} className="text-xs text-gray-500 font-mono leading-relaxed pl-3 border-l border-white/10">
                                        {i + 1}. {ref}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
