"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Cpu, Minimize2, Shield, Lock } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function QuantumBoundsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500 text-cyan-400 text-xs font-mono font-bold">
                                RSCH-20
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Quantum <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-200">
                                Bounds
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            The Holevo Capacity of a defended network. Why Zero Trust is a problem of Quantum Information Theory.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                QKD
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Holevo Bound
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Entanglement
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
                            <Cpu size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Information Leakage Limit
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                            <TypewriterEquation
                                equation="I(X; Y) \le S(\rho) - \sum_x p_x S(\rho_x)"
                                className="text-2xl md:text-3xl text-cyan-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The Holevo Bound sets the absolute physical limit on how much information a malicious observer can extract from our network channel."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">State $\rho$</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Limit</div>
                                <div className="text-sm font-bold text-cyan-400">Capacity $\chi$</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Defense</div>
                                <div className="text-sm font-bold text-white">Noise</div>
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
                                <Minimize2 className="text-cyan-400" />
                                Zero-Day as a Side-Channel
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We model a Zero-Day Vulnerability not as a "bug" but as an **ancillary quantum system E** that is entangled with the channel output.
                                    The attacker's ability to exploit the system is limited by the **Accessible Information** $I_&#123;acc&#125;(A; E)$.
                                </p>
                                <p>
                                    If the defense system creates enough "Quantum Noise" (entropy) in the channel, we can prove that $I_&#123;acc&#125; \to 0$, rendering the Zero-Day useless.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Shield className="text-oxot-gold" />
                                Quantum Zoning
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Agent Blue implements **Quantum Zoning**. By maximizing the von Neumann entropy of the system state from the attacker's perspective
                                    (via depolarizing channels), we reduce the Holevo Capacity of the inter-zone links to near zero.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-cyan-500">
                                    <p className="font-mono text-sm text-cyan-300">
                                        "You cannot exploit what you cannot measure."
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Capacity Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Lock size={16} /> Channel Capacity
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center p-6 bg-black/40 rounded border border-white/5">
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-cyan-400">0.02</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Holevo $\chi$ (bits)</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Total Entropy S($\rho$)</span>
                                        <span className="text-white font-mono">12.4</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Learned Info</span>
                                        <span className="text-white font-mono">~0.0</span>
                                    </div>
                                </div>
                                <div className="text-center pt-2">
                                    <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                                        Channel Secure (Provable)
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
                                    "Holevo, A. S. (1973). Bounds for Quantity of Information.",
                                    "Nielsen & Chuang. (2010). Quantum Computation.",
                                    "Shor, P. W. (2002). The Quantum Channel Capacity.",
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
