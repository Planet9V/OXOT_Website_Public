"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Box, Activity, GitBranch, Shield, Zap, RefreshCw } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function AntifragileTopologyPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-oxot-gold/5 rounded-full blur-[120px]" />
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
                                RSCH-17
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Antifragile <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                                Topology
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Beyond resilience. Designing cyber-physical systems that strictly gain capability and strength from disorder, stress, and attack.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Self-Rewiring
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Nash Equilibrium
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Convex Response
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
                            <Activity size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            The Convexity Condition
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                            <TypewriterEquation
                                equation="f''(S) > 0"
                                className="text-4xl md:text-5xl text-emerald-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The second derivative of performance with respect to stress is positive. Mathematically proves the system gains from volatility."
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-red-900/10 rounded-lg border border-red-500/20 opacity-50">
                                <div className="text-[10px] text-gray-400 uppercase">Fragile</div>
                                <div className="text-lg font-bold text-red-400">f'' {'<'} 0</div>
                            </div>
                            <div className="p-3 bg-blue-900/10 rounded-lg border border-blue-500/20 opacity-70">
                                <div className="text-[10px] text-gray-400 uppercase">Resilient</div>
                                <div className="text-lg font-bold text-blue-400">f'' = 0</div>
                            </div>
                            <div className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-500">
                                <div className="text-[10px] text-white uppercase font-bold">Antifragile</div>
                                <div className="text-lg font-bold text-emerald-400">f'' {'>'} 0</div>
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
                                <RefreshCw className="text-emerald-400" />
                                The Rewiring Game
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We model the network not as a static graph, but as a dynamic game where the Adjacency Matrix
                                    $A(t)$ is a control variable. The system actively rewires itself in response to stress.
                                </p>
                                <div className="bg-white/5 p-6 rounded-lg border-l-4 border-emerald-500">
                                    <div className="text-xs text-gray-500 font-mono mb-2">Differential Rewiring Equation</div>
                                    <TypewriterEquation
                                        equation="\dot{A}(t) = \text{Reconnect}(A(t), \nabla \lambda_{max}) + \text{Noise}"
                                        className="text-emerald-300"
                                    />
                                </div>
                                <p>
                                    This creates a <strong>Nash Equilibrium</strong> where the attacker, attempting to maximize diffusion,
                                    unwittingly triggers a defensive reconfiguration that minimizes the spectral radius (spread potential)
                                    of the vulnerability.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Zap className="text-oxot-gold" />
                                Mycelial Reflex
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    AEON's Agent Blue implements this as a "Mycelial Reflex". In a DDOS scenario hitting a Login Server,
                                    the system doesn't just block IPs. It <strong>spawns</strong> 50 shadow-clones of the server and
                                    <strong>rewires</strong> the Ingress Controller to load-balance across them using a Consistent Hashing Ring.
                                </p>
                                <ul className="space-y-4 font-mono text-sm bg-black/40 p-6 rounded-xl border border-white/10">
                                    <li className="flex gap-4">
                                        <span className="text-red-400">[ATTACK]</span>
                                        <span>Stress $\sigma$ increases on Node $N_0$</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-emerald-400">[REFLEX]</span>
                                        <span>Spawn {'{'}N_1 ... N_50{'}'} with state replication</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-emerald-400">[REWIRE]</span>
                                        <span>Update $A(t)$: $\forall i, \text&#123;add_edge&#125;(Ingress, N_i)$</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-oxot-gold">[RESULT]</span>
                                        <span>$C&#123;def&#125;$ grows proportional to Attack Intensity</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Simulation Visual */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                                Stress Response
                            </h3>
                            <div className="relative h-48 w-full bg-black/50 rounded-lg overflow-hidden flex items-end justify-center gap-1 p-4">
                                {/* Pseudocode bars for graph */}
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: "20%" }}
                                        animate={{ height: ["20%", "40%", "80%", "30%"] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-full bg-emerald-500/40 rounded-t-sm"
                                    />
                                ))}
                                <div className="absolute top-2 left-2 text-[10px] font-mono text-emerald-400">Capacity(t)</div>
                            </div>
                            <div className="mt-4 text-xs text-gray-400 font-mono">
                                System capacity dynamically scales with load stress.
                            </div>
                        </div>

                        {/* References */}
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                References
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Taleb, N. N. (2012). Antifragile.",
                                    "Barabási, A. L. (2016). Network Science.",
                                    "Nash, J. F. (1950). Equilibrium Points.",
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
