"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Globe, Lock, Share2, Users } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function FederatedDefensePage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[30%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500 text-indigo-400 text-xs font-mono font-bold">
                                RSCH-35
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Federated <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-200">
                                Defense
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Collective immunity via privacy-preserving threat intelligence. The Global Immune System for cyber ecosystems.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Differential Privacy
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Secure MPC
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Herd Immunity
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
                            <Globe size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Private Aggregation
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                            <TypewriterEquation
                                equation="\tilde{x} = x + \text{Lap}\left(\frac{\Delta f}{\epsilon}\right)"
                                className="text-2xl md:text-3xl text-indigo-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "Differential Privacy adds calibrated noise to threat signals. Organizations can share 'what' they see without revealing 'who' they are."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Local IOCs</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Privacy</div>
                                <div className="text-sm font-bold text-indigo-400">SMPC + Noise</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Global</div>
                                <div className="text-sm font-bold text-white">Herd Immunity</div>
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
                                <Users className="text-indigo-400" />
                                The Tragedy of the Commons
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Cybersecurity often suffers because threat intel is siloed. Attackers cooperate; defenders don't.
                                    The **Federated Defense Network (FDN)** creates a "Global Immune System" where an attack on one entity
                                    immunizes all others instantly.
                                </p>
                                <p>
                                    We use **Granovetter Thresholds** to model adoption. Once 15% of a sector shares data, a cascade effect
                                    pushes the network to equilibrium (85% coverage).
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Lock className="text-oxot-gold" />
                                Privacy vs. Security
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    The barrier to sharing is privacy (revealing vulnerabilities). AEON solves this with **Secure Multi-Party Computation (SMPC)**.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-indigo-500">
                                    <p className="font-mono text-sm text-indigo-300">
                                        "We can calculate the sum of attacks across all banks without any single bank revealing its own number."
                                    </p>
                                </div>
                                <p>
                                    Combined with Federated Learning, we train detection models on decentralized data without raw logs ever leaving the premises.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Network Status Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Share2 size={16} /> Global Immunity
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                                        <div className="text-[10px] text-gray-500 uppercase">Participants</div>
                                        <div className="text-xl font-bold text-white">4,281</div>
                                    </div>
                                    <div className="p-3 bg-black/40 rounded border border-white/5 text-center">
                                        <div className="text-[10px] text-gray-500 uppercase">Blocked (24h)</div>
                                        <div className="text-xl font-bold text-indigo-400">1.2M</div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <div className="text-xs text-gray-400 mb-1">Sector Immunity Levels</div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="w-16 text-gray-500">Finance</span>
                                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-[92%]"></div>
                                        </div>
                                        <span className="text-green-400">92%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="w-16 text-gray-500">Energy</span>
                                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-500 w-[64%]"></div>
                                        </div>
                                        <span className="text-yellow-400">64%</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="w-16 text-gray-500">Retail</span>
                                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 w-[30%]"></div>
                                        </div>
                                        <span className="text-red-400">30%</span>
                                    </div>
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
                                    "Dwork, C. (2014). Differential Privacy.",
                                    "Gordon, L. A. (2003). Economic Analysis of Sharing.",
                                    "NIST SP 800-150. Cyber Threat Information Sharing.",
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
