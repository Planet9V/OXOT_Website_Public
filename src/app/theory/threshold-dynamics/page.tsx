"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Activity, Target, Zap, Waves } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function ThresholdDynamicsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[120px]" />
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
                            <span className="px-3 py-1 rounded bg-red-500/10 border border-red-500 text-red-400 text-xs font-mono font-bold">
                                RSCH-12
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Threshold <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-200">
                                Dynamics
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Mean Field Games (MFG) for modeling flash botnet events. Understanding the singularity where individual infections collapse into a global threat.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Mean Field Games
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Fokker-Planck
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Finite-Time Blowup
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
                            <Zap size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            The Master Equation
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                            <TypewriterEquation
                                equation="-\partial_t V - \nu \Delta V + H(x, \nabla V, m) = 0"
                                className="text-2xl md:text-3xl text-red-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The Hamilton-Jacobi-Bellman equation governs the attacker's optimal strategy, coupled with the network's density evolution."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Strategy u(t)</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">System</div>
                                <div className="text-sm font-bold text-red-400">MFG Coupling</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Output</div>
                                <div className="text-sm font-bold text-white">Botnet Density</div>
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
                                <Target className="text-red-400" />
                                The Bathtub & The Plug
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    In massive IoT networks ($N \to \infty$), we cannot model individual nodes. We model the <strong>density</strong> of compromised devices.
                                    The attacker (Player 1) wants to maximize infection rate $u(t)$, while the defenders (the "Mean Field") passively resist via patching.
                                </p>
                                <p>
                                    This creates a game theoretical scenario described by two coupled Partial Differential Equations (PDEs):
                                    Backward HJB (Attacker Optimization) and Forward Fokker-Planck (Network State).
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Waves className="text-oxot-gold" />
                                Flash Botnets (Mirai)
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We analyze the conditions for "Blow-up Solutions"—where the density of compromised nodes concentrates
                                    into a Dirac delta function $\delta(x)$ in finite time $T^*$.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-red-500">
                                    <p className="font-mono text-sm text-red-300">
                                        Singularity Condition: Hamiltonian Feedback &gt; Critical Connectivity ($\lambda_&#123;max&#125;$)
                                    </p>
                                </div>
                                <p>
                                    This mathematical singularity corresponds to a <strong>Flash Botnet</strong> event (like Mirai), where infection spreads
                                    faster than human response is physically possible.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Phase Plot Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Activity size={16} /> Infection Phase Space
                            </h3>
                            <div className="aspect-square bg-black/40 rounded border border-white/5 relative overflow-hidden">
                                {/* Abstract Plot */}
                                <svg width="100%" height="100%" className="opacity-70">
                                    <path d="M 0 100 Q 50 100 100 20" stroke="gray" fill="none" strokeDasharray="4 4" />
                                    <path d="M 0 100 C 50 80, 80 50, 100 0" stroke="#f87171" strokeWidth="2" fill="none" />
                                    <circle cx="85" cy="15" r="4" fill="#ef4444" />
                                    <text x="60" y="30" fill="#f87171" fontSize="10" fontFamily="monospace">Singularity</text>
                                </svg>
                                <div className="absolute bottom-2 left-2 text-[10px] text-gray-500">Time (t)</div>
                                <div className="absolute top-2 left-2 text-[10px] text-gray-500">Density m(t)</div>
                            </div>
                            <div className="mt-4 text-center">
                                <div className="text-xs text-red-400 font-mono">Current State: Super-Linear Growth</div>
                                <div className="text-[10px] text-gray-500 uppercase mt-1">Status: CRITICAL</div>
                            </div>
                        </div>

                        {/* References */}
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                References
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Lasry, J. M., Lions, P. L. (2007). Mean Field Games.",
                                    "Carmona, R. (2018). Probabilistic Theory of MFG.",
                                    "Antonelli, F. (2008). Malware Propagation Dynamics.",
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
