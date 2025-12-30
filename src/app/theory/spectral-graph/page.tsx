"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Network, Activity, Zap, ShieldAlert, Scissors } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function SpectralGraphPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500 text-blue-400 text-xs font-mono font-bold">
                                RSCH-04
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Spectral <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">
                                Graph Theory
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Defining network robustness through eigenvalues. Using the spectral radius to mathematically guarantee virus extinction.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Spectral Radius
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Eigen-Centrality
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Hub Removal
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
                            <Network size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Extinction Condition
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                            <TypewriterEquation
                                equation="\tau < \frac{1}{\lambda_{max}}"
                                className="text-3xl md:text-4xl text-blue-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The transmission rate must be less than the reciprocal of the spectral radius of the adjacency matrix for the virus to die out."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Hub & Spoke</div>
                                <div className="text-lg font-bold text-red-400">High Risk</div>
                                <div className="text-[10px] text-gray-500">Large $\lambda_&#123;max&#125;$</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Daisy Chain</div>
                                <div className="text-lg font-bold text-green-400">Low Risk</div>
                                <div className="text-[10px] text-gray-500">Small $\lambda_&#123;max&#125;$</div>
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
                                <Activity className="text-blue-400" />
                                The Spectrum of Destruction
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    The adjacency matrix $A$ represents the connections in a network. Its eigenvalues $\lambda$ reveal
                                    hidden properties of the topology. The largest eigenvalue, $\lambda_&#123;max&#125;$ (Spectral Radius),
                                    specifically measures the network's capacity to propagate a virus.
                                </p>
                                <p>
                                    A "Star Network" (Hub) is a super-spreader with $\lambda_&#123;max&#125; = \sqrt&#123;N - 1&#125;$.
                                    A "Path Graph" is resilient with $\lambda_&#123;max&#125; &lt; 2$.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Scissors className="text-oxot-gold" />
                                Eigen-Centrality Pruning
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    AEON's "Neural Physics" engine calculates the Eigenvector Centrality $x$ for all nodes:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-500">
                                    <TypewriterEquation
                                        equation="Ax = \lambda_{max}x"
                                        className="text-blue-300"
                                    />
                                </div>
                                <p>
                                    Nodes with high centrality are "Seldon Points." To stop an outbreak, we don't need to patch everyone immediately.
                                    We simply need to <strong>cut edges</strong> on high-centrality nodes (Hub Removal) to lower $\lambda_&#123;max&#125;$
                                    below the critical threshold.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Strategy Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <ShieldAlert size={16} /> Defense Strategy
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                                    <div className="text-xs text-red-400 font-bold mb-1">Current Topology</div>
                                    <div className="text-sm text-gray-300">Hub-dominated. $\lambda_&#123;max&#125; = 14.2$</div>
                                    <div className="h-2 w-full bg-red-900/40 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-red-500 w-[90%] animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-900/10 rounded-xl border border-emerald-500/20">
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">Target State</div>
                                    <div className="text-sm text-gray-300">Segmented. $\lambda_&#123;max&#125; = 3.1$</div>
                                </div>
                                <div className="text-xs text-gray-500 text-center pt-2">
                                    Result: Virus Extinction Guaranteed
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
                                    "Van Mieghem, P. (2011). Graph Spectra.",
                                    "Wang, Y., et al. (2003). Epidemic Spreading.",
                                    "Preciado, V. M. (2013). Optimal Allocation.",
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
