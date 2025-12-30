"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, GitMerge, AlertTriangle, ShieldAlert, ThermometerSnowflake } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function EpidemicR0Page() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-rose-500/10 border border-rose-500 text-rose-400 text-xs font-mono font-bold">
                                RSCH-03
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Epidemic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-200">
                                R0 Metric
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            The Basic Reproduction Number applied to malware topology. Spectral Graph Theory determines if an infection dies out or becomes an epidemic.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                SIR Model
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Spectral Radius
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Topology Control
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
                            <GitMerge size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Threshold Condition
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                            <TypewriterEquation
                                equation="R_0 \approx \left( \frac{\beta}{\gamma} \right) \cdot \lambda_{max}(A) < 1"
                                className="text-2xl md:text-3xl text-rose-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "Stability is achieved when the ratio of transmission (beta) to recovery (gamma), multiplied by the network's spectral radius (lambda), is less than 1."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Network Graph</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Analysis</div>
                                <div className="text-sm font-bold text-rose-400">Eigenvalues</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Goal</div>
                                <div className="text-sm font-bold text-white">R0 &lt; 1</div>
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
                                <AlertTriangle className="text-rose-400" />
                                Physics of Contagion
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Malware spreads like a virus. The SIR model (Susceptible-Infected-Recovered) dictates that an epidemic occurs only if $R_0 &gt; 1$.
                                    In cybersecurity, we control $R_0$ through three variables:
                                </p>
                                <ul className="list-disc pl-4 space-y-2 marker:text-rose-500">
                                    <li><strong>$\beta$ (Transmission):</strong> Probability of exploit (Phishing rate). Reduced by patching.</li>
                                    <li><strong>$\gamma$ (Recovery):</strong> Mean Time To Remediate. Increased by Agent Blue automation.</li>
                                    <li><strong>$\lambda_&#123;max&#125;$ (Topology):</strong> The connectivity of the graph. Reduced by segmentation.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <ShieldAlert className="text-oxot-gold" />
                                Topology as Defense
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Even if patching fails ($\beta$ is high) and recovery is slow ($\gamma$ is low), we can stop an epidemic by changing the geometry of the network.
                                    Targeting "Hub Nodes" (reducing $\lambda_&#123;max&#125;$) shatters the propagation paths.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-rose-500">
                                    <p className="font-mono text-sm text-rose-300">
                                        "Defense is a function of both Process and Topology."
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* R0 Monitor Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <ThermometerSnowflake size={16} /> Viral Monitor
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center p-6 bg-black/40 rounded border border-white/5">
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-green-400">0.42</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Current R0</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Transmission ($\beta$)</span>
                                        <span className="text-white font-mono">0.12</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Recovery Rate ($\gamma$)</span>
                                        <span className="text-white font-mono">0.85/s</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Topology ($\lambda_&#123;max&#125;$)</span>
                                        <span className="text-white font-mono">2.4</span>
                                    </div>
                                </div>
                                <div className="text-center pt-2">
                                    <span className="px-2 py-1 bg-green-900/30 border border-green-500/50 rounded text-[10px] text-green-300 font-bold uppercase">
                                        System Stable (Sub-critical)
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
                                    "Kermack & McKendrick. (1927). Theory of Epidemics.",
                                    "Chakrabarti, D. (2008). Epidemic Thresholds in Real Networks.",
                                    "Van Mieghem, P. (2011). Graph Spectra.",
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
