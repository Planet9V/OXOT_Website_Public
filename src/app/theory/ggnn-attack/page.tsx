"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Share2, BrainCircuit, Target, Footprints, Clock } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function GGNNAttackPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[20%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-900/10 rounded-full blur-[100px]" />
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
                                RSCH-06
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            GGNN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-200">
                                Attack Prediction
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Using Gated Graph Neural Networks (GGNN) to model vulnerability propagation. Learning the "Most Likely Attack Path" through message passing.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Gated Recurrent Units
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Message Passing
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Time-to-Pwn
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
                            <BrainCircuit size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Gated Node Update
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                            <TypewriterEquation
                                equation="h_v^{(t)} = GRU(h_v^{(t-1)}, \sum W \cdot h_u^{(t-1)})"
                                className="text-2xl md:text-3xl text-purple-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "A node updates its infection state (h) based on its previous state and the aggregated 'messages' from compromised neighbors."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Graph Topology</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5">
                                <div className="text-[10px] text-gray-400 uppercase">Process</div>
                                <div className="text-sm font-bold text-purple-400">Message Passing</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5">
                                <div className="text-[10px] text-gray-400 uppercase">Output</div>
                                <div className="text-sm font-bold text-white">Path Probability</div>
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
                                <Share2 className="text-purple-400" />
                                Beyond Static Graphs
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Traditional Attack Graphs suffer from combinatorial explosion ($2^&#123;N + M&#125;$ states). Finding the shortest path
                                    to Domain Admin is NP-hard. GGNNs solve this by treating propagation as a <strong>learning problem</strong> on a graph structure.
                                </p>
                                <p>
                                    Instead of exploring every possible path, the network "learns" to identify the most probable routes of infection
                                    by passing state vectors between connected nodes over time steps $t$.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Clock className="text-oxot-gold" />
                                Neural Propagation
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    If we simulate patient zero on Node A at $t=0$, and the Domain Controller's state flips to "Compromised"
                                    at $t=5$, we know the effective "Time to Pwn" is 5 hops.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-500">
                                    <TypewriterEquation
                                        equation="m_v^{(t)} = \sum_{u \in \mathcal{N}(v)} W \cdot h_u^{(t-1)}"
                                        className="text-purple-300"
                                    />
                                </div>
                                <p>
                                    The complexity is linear with time and edges ($O(T \times |E|)$), making it scalable for real-time
                                    risk scoring on large enterprise networks where traditional methods fail.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Simulation Result */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Footprints size={16} /> Path Analysis
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Target size={14} className="text-red-400" /> Target: Domain Controller
                                </div>
                                <div className="space-y-1 relative pl-4 border-l border-white/10">
                                    <div className="text-xs text-green-400 relative">
                                        <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-green-400"></div>
                                        Workstation (Phishing)
                                    </div>
                                    <div className="text-xs text-gray-500 py-1">↓ SMB Relay</div>
                                    <div className="text-xs text-yellow-400 relative">
                                        <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-yellow-400"></div>
                                        Print Server
                                    </div>
                                    <div className="text-xs text-gray-500 py-1">↓ Weak ACL</div>
                                    <div className="text-xs text-red-400 relative">
                                        <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-red-400"></div>
                                        DC01 (Compromised)
                                    </div>
                                </div>
                                <div className="text-center pt-2 border-t border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase">Probability</div>
                                    <div className="text-xl font-bold text-white">94.2%</div>
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
                                    "Li, Y., et al. (2016). Gated Graph Sequence NNs.",
                                    "Zhou, Y. (2020). Automated Vulnerability Detection.",
                                    "Scarselli, F. (2009). Graph Neural Network Model.",
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
