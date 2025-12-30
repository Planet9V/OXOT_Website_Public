"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Box, Scissors, Repeat, HeartPulse, Network } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function AutopoieticBulkheadsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500 text-emerald-400 text-xs font-mono font-bold">
                                RSCH-29
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Autopoietic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-200">
                                Bulkheads
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Self-healing network segmentation via cascade dynamics. The network that amputates a limb to save the body.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Autopoiesis
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                SDN Actuation
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Cascade Halting
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
                            <Box size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Optimal Cut
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                            <TypewriterEquation
                                equation="\min_{B} |B| \text{ s.t. } \nexists \text{ path } C \to H \setminus N(B)"
                                className="text-2xl md:text-3xl text-emerald-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "We find the minimal set of network edges (B) to sever that completely isolates the compromised cluster (C) from the healthy graph (H)."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Detection</div>
                                <div className="text-sm font-bold text-white">30s</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Action</div>
                                <div className="text-sm font-bold text-emerald-400">Automated</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Result</div>
                                <div className="text-sm font-bold text-white">Containment</div>
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
                                <HeartPulse className="text-emerald-400" />
                                The Living Network
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Maturana & Varela defined <strong>Autopoiesis</strong> as the ability of a living system to maintain itself through self-production.
                                    A static network is dead. An autopoietic network senses pain (IoCs) and reacts reflexively.
                                </p>
                                <p>
                                    Traditional Incident Response takes hours. Ransomware like Ryuk takes 4 hours to encrypt everything.
                                    APB (Auto-Poietic Bulkheads) responds in 30 seconds using SDN.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Scissors className="text-oxot-gold" />
                                Coupling Surgery
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Using the Ising Model, we see contamination as "spin flips". To stop the cascade, we perform <strong>Coupling Surgery</strong>:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-emerald-500">
                                    <TypewriterEquation
                                        equation="J_{ij} \to 0 \quad \forall (i,j) \in \text{Bulkhead}"
                                        className="text-emerald-300"
                                    />
                                </div>
                                <p>
                                    We dynamically rewrite OpenFlow rules to drop packets between the infected subnet and the rest of the organism.
                                    Connectivity is sacrificed to preserve life.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Bulkhead Status Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Network size={16} /> Bulkhead Control
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <div className="text-xs text-gray-400 mb-2">Zone: Finance Subnet (VLAN 40)</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                        <div className="text-sm text-red-400 font-bold">Compromise Detected</div>
                                    </div>
                                    <div className="mt-2 h-1 bg-gray-700 w-full rounded overflow-hidden">
                                        <div className="h-full bg-red-500 w-[78%]"></div>
                                    </div>
                                    <div className="text-[10px] text-right text-gray-500 mt-1">Cascade Prob: 78%</div>
                                </div>

                                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                                    <span className="text-gray-400">Action</span>
                                    <span className="text-emerald-400 font-bold">SEVER LINKS (SDN)</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400">Est. Containment</span>
                                    <span className="text-white font-mono">2.4s</span>
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
                                    "Maturana, H. R. (1980). Autopoiesis and Cognition.",
                                    "McKeown, N. (2008). OpenFlow.",
                                    "Staniford, S. (2002). How to own the internet.",
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
