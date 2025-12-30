"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Music, Users, Brain } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function EnhancementAnalysisPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-fuchsia-500/10 border border-fuchsia-500 text-fuchsia-400 text-xs font-mono font-bold">
                                RSCH-37
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Enhancement <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-200">
                                Analysis
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Deep Multi-Agent Analysis of the entire AEON Research Library. Identifying synthesis opportunities and novel capabilities.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Musical Notation
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Team Optimizer
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                M&A Harmony
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
                            <Sparkles size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Novel Capability: The Chef
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500" />
                            <div className="font-mono text-sm text-fuchsia-300 space-y-2">
                                <div>def optimize_team(team, role):</div>
                                <div className="pl-4">m_current = magnetization(team)</div>
                                <div className="pl-4">gaps = compute_disc_coverage(team)</div>
                                <div className="pl-4">score = 0.25 * (1 - dissonance) + ...</div>
                                <div>return best_candidate</div>
                            </div>
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The 'Chef' algorithm finds the optimal personality profile for a new hire to maximize team effectiveness while maintaining diversity."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Team Tensor</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Algo</div>
                                <div className="text-sm font-bold text-fuchsia-400">Ising + DISC</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Output</div>
                                <div className="text-sm font-bold text-white">Ideal Hire</div>
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
                                <Music className="text-fuchsia-400" />
                                Musical Psychometric Notation (MPN)
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We propose a formal notation system where the security state of an organization is represented as a musical score.
                                    **Clefs** represent context (War Room vs Boardroom), **Key Signatures** represent Security Culture (Zero Trust = C Major),
                                    and **Dissonance** represents impending crisis.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-fuchsia-500">
                                    <TypewriterEquation
                                        equation="\mathcal{M}(t) = \sum_i \mathbf{B}_i(t) \cdot e^{i\omega_i t}"
                                        className="text-fuchsia-300"
                                    />
                                    <p className="mt-2 text-sm text-gray-400">
                                        The Symphony of the SOC.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Brain className="text-oxot-gold" />
                                Confidence & Capability Delta
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Our analysis indicates massive confidence gains by integrating McKenney-Lacan theory across all papers.
                                    Specifically, adding **Psychometric Tensors** (DISC + OCEAN) to foundational models increases predictive confidence by **20-30%**.
                                </p>
                                <p>
                                    This enables "Total Psychohistory" - moving from probabilistic risk scoring to deterministic behavioral prediction.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Highlights Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Users size={16} /> Enhancement Targets
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Foundational (01-10)</span>
                                        <span className="text-green-400 font-mono">+20% Conf</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Unified (18-22)</span>
                                        <span className="text-green-400 font-mono">+28% Conf</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Capabilities (23-32)</span>
                                        <span className="text-green-400 font-mono">+20% Conf</span>
                                    </div>
                                </div>
                                <div className="text-center pt-2">
                                    <span className="text-[10px] text-fuchsia-400 uppercase tracking-widest font-bold">
                                        Total Upgrade
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
                                    "McKenney-Lacan Deep Enhancement Rpt.",
                                    "RSCH-38 Team Composition (The Chef)",
                                    "RSCH-39 Musical Notation (MPN)",
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
