"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Brain, Target, MessageCircle, AlertTriangle, Fingerprint, PieChart } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function CognitiveBiasPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-violet-900/10 rounded-full blur-[120px]" />
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
                            <span className="px-3 py-1 rounded bg-pink-500/10 border border-pink-500 text-pink-400 text-xs font-mono font-bold">
                                RSCH-34
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Cognitive <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-200">
                                Bias
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            System 1 Exploitation. Measuring and predicting human heuristic failures in security decisions using the Kahneman-Tversky framework.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Behavioral Economics
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Social Engineering
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                BSS Score
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
                            <Brain size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Bias Susceptibility Score
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-pink-500" />
                            <TypewriterEquation
                                equation="BSS_i = \sum w_b \cdot S_{i,b}"
                                className="text-3xl md:text-4xl text-pink-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "A user's total vulnerability score is the weighted sum of their susceptibility to individual cognitive biases."
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg text-center">
                                <div className="text-[10px] text-gray-400 uppercase">System 1</div>
                                <div className="text-lg font-bold text-white">Fast</div>
                                <div className="text-[10px] text-red-400">Target</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg text-center">
                                <div className="text-[10px] text-gray-400 uppercase">System 2</div>
                                <div className="text-lg font-bold text-white">Slow</div>
                                <div className="text-[10px] text-green-400">Defense</div>
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
                                <AlertTriangle className="text-pink-400" />
                                The Vulnerability Catalog
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Social engineers do not hack computers; they hack human cognition. They exploit <strong>Heuristics</strong>—mental
                                    shortcuts evolved for survival that fail in digital contexts. We categorize these into high-impact biases:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                        <div className="text-white font-bold mb-1">Authority Bias</div>
                                        <p className="text-xs text-gray-400">Deference to perceived power (e.g., CEO Fraud).</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                        <div className="text-white font-bold mb-1">Scarcity Bias</div>
                                        <p className="text-xs text-gray-400">Fear of missing out (e.g., "Limited time offer").</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                        <div className="text-white font-bold mb-1">Social Proof</div>
                                        <p className="text-xs text-gray-400">Following the crowd (e.g., "10k downloads").</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                        <div className="text-white font-bold mb-1">Optimism Bias</div>
                                        <p className="text-xs text-gray-400">"It won't happen to me."</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Fingerprint className="text-oxot-gold" />
                                Unified Human Model
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We combine this Cognitive Bias data with the <strong>Psychometric Tensor</strong> (Big Five) and
                                    <strong>Dark Triad</strong> models to create a complete picture of human vulnerability.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-pink-500">
                                    <TypewriterEquation
                                        equation="R'' = (P_{B5} \oplus P_{DT} \oplus B)^T \cdot T'' \cdot A''"
                                        className="text-pink-300"
                                    />
                                </div>
                                <p>
                                    This model achieves <strong>81% accuracy</strong> in predicting specific social engineering susceptibility,
                                    far outperforming generic "security awareness" metrics.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Interactive Prediction */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <PieChart size={16} /> Susceptibility Profile
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Authority</span>
                                        <span className="text-red-400">High Risk</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full">
                                        <div className="h-full bg-red-500 w-[85%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Scarcity</span>
                                        <span className="text-yellow-400">Medium</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full">
                                        <div className="h-full bg-yellow-400 w-[45%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Social Proof</span>
                                        <span className="text-green-400">Low</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full">
                                        <div className="h-full bg-green-400 w-[15%]" />
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
                                    "Kahneman, D. (2011). Thinking, Fast and Slow.",
                                    "Tversky & Kahneman. (1974). Heuristics and Biases.",
                                    "Cialdini, R. B. (2006). Influence.",
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
