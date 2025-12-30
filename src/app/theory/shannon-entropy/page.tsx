"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BarChart2, Activity, Zap, TrendingDown } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function ShannonEntropyPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500 text-amber-400 text-xs font-mono font-bold">
                                RSCH-05
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Shannon <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-200">
                                Entropy
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Thermodynamics of Cyber Defense. Using Information Theory to detect "Entropy Collapse" during attacks.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Anomaly Detection
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                DDoS Signatures
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Information Theory
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
                            <BarChart2 size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Information Content
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                            <TypewriterEquation
                                equation="S(X) = - \sum_{i=1}^{n} p(x_i) \ln p(x_i)"
                                className="text-2xl md:text-3xl text-amber-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The entropy S measures uncertainty. Normal traffic is high entropy (random). Attack traffic (DDoS, Exfiltration) is low entropy (ordered)."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Traffic</div>
                                <div className="text-sm font-bold text-white">Dst IP</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">DDoS</div>
                                <div className="text-sm font-bold text-amber-400">S &to; 0</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Result</div>
                                <div className="text-sm font-bold text-white">Alert</div>
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
                                <TrendingDown className="text-amber-400" />
                                Order is Suspicious
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    In a healthy network, user behavior is chaotic. People browse different sites at different times. This creates **High Entropy**.
                                    During an attack (e.g., a botnet flooding a target), everything synchronizes. Packets become identical. Destinations converge.
                                </p>
                                <p>
                                    This creates an **Entropy Collapse**. We don't need a signature for the malware; we just need to see that the laws of thermodynamics have been violated.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Zap className="text-oxot-gold" />
                                Detecting "Low and Slow"
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Even stealthy exfiltration (beaconing) has a regular heartbeat. This regularity reduces the entropy of Inter-Arrival Times (IAT).
                                    A human clicking links has random intervals. A script has fixed intervals.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-amber-500">
                                    <p className="font-mono text-sm text-amber-300">
                                        "If S(IAT) drops below 2.0, it's a machine."
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Entropy Monitor Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Activity size={16} /> Thermodynamic Monitor
                            </h3>
                            <div className="space-y-4">
                                <div className="relative h-24 bg-black/40 rounded border border-white/5 overflow-hidden flex items-end px-1 gap-0.5">
                                    {/* Simulated Entropy Drop */}
                                    {[80, 75, 82, 78, 85, 80, 40, 20, 15, 10, 10, 10, 10, 15].map((h, i) => (
                                        <div key={i} className={`flex-1 ${h < 30 ? 'bg-red-500' : 'bg-green-500'}`} style={{ height: `${h}%` }}></div>
                                    ))}
                                    <div className="absolute top-2 left-2 text-[10px] text-gray-500">Dst IP Entropy</div>
                                </div>
                                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                                    <span className="text-gray-400">Current Level</span>
                                    <span className="text-red-400 font-mono font-bold">0.82 bits</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold animate-pulse">
                                        CRITICAL: Entropy Collapse Detected
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
                                    "Shannon, C. E. (1948). Mathematical Theory of Communication.",
                                    "Feinstein, L. (2003). Statistical DDoS Detection.",
                                    "Nychis, G. (2008). Entropy-Based Anomaly Detection.",
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
