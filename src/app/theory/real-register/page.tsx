"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Box, Activity, AlertTriangle, Shield, Terminal, Cpu } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function RealRegisterPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-oxot-gold/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
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
                            <span className="px-3 py-1 rounded bg-oxot-gold/10 border border-oxot-gold text-oxot-gold text-xs font-mono font-bold">
                                RSCH-02
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Real <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-gold to-white">
                                Register
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            The Calculus of the Unsymbolizable. Mathematical formalism for zero-day threats that exist outside the current symbolic order of detection.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Unsymbolizable Threat
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Zero-Day Detection
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Behavioral Physics
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
                            <AlertTriangle size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            The Formula of the Real
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-oxot-gold" />
                            <TypewriterEquation
                                equation="R = \{ x \in \Psi : \nexists S(x) \}"
                                className="text-2xl md:text-3xl text-oxot-gold font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The Real is the set of all events 'x' in the state space 'Psi' such that there does NOT exist a symbol 'S(x)' in the detection database."
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="text-xs text-gray-500 font-mono uppercase">Symbolic Set (S)</div>
                                <div className="text-lg font-bold text-white mt-1">Known Threats</div>
                                <div className="text-[10px] text-green-400 mt-1">Signatures, CVEs</div>
                            </div>
                            <div className="p-4 bg-red-900/10 rounded-lg border border-red-500/30">
                                <div className="text-xs text-red-400 font-mono uppercase">The Real (R)</div>
                                <div className="text-lg font-bold text-white mt-1">Zero-Days</div>
                                <div className="text-[10px] text-red-300 mt-1">Physics, Voltage, Latency</div>
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
                                <Terminal className="text-oxot-gold" />
                                The Unsymbolizable
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    In classical security (Symbolic Order), we attempt to map every possible threat to a signature
                                    or rule. We assume that if we ingest enough logs, we will cover the universe of threats.
                                    Mathematically, this is the limit:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-500">
                                    <TypewriterEquation equation="\lim_{t \to \infty} |\mathcal{S}_t| \to U" className="text-blue-300" />
                                </div>
                                <p>
                                    However, due to <strong>Gödel's Incompleteness</strong>, there will always be true statements
                                    (threats) that cannot be proven (detected) within the system. The <strong>Real</strong> represents
                                    these omissions. It is not just the "unknown"—it is that which resists symbolization entirely.
                                    It is the hardware fault, the cosmic bit flip, the novel exploit mechanism that has no name.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Shield className="text-oxot-gold" />
                                Agent Blue: Operating in the Real
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Because the Real cannot be detected by signatures ($S(x) = \emptyset$), AEON's <strong>Agent Blue</strong> operates
                                    on the raw physics of the signal, ignoring the symbolic content of the packets. It measures the physical
                                    perturbations caused by the intrusion.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                        <div className="text-xs text-gray-500 uppercase mb-2">Entropy</div>
                                        <TypewriterEquation equation="S = -\sum p \ln p" className="mx-auto text-yellow-400" delay={2} />
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                        <div className="text-xs text-gray-500 uppercase mb-2">Latency</div>
                                        <TypewriterEquation equation="L(t)" className="mx-auto text-yellow-400" delay={2.5} />
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                        <div className="text-xs text-gray-500 uppercase mb-2">Packet Velocity</div>
                                        <TypewriterEquation equation="v(x)" className="mx-auto text-yellow-400" delay={3} />
                                    </div>
                                </div>
                                <p>
                                    When a Zero-Day strikes, it has no signature, but it has <strong>Mass</strong> and <strong>Velocity</strong>.
                                    Agent Blue detects the perturbation in the Real—a spike in entropy or latency that defies statistical
                                    prediction—and terminates the process reflexively.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Key Metrics */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
                                Detection Physics
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-400">Time-to-Detect (Symbolic)</span>
                                        <span className="text-red-400">Unknown</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[10%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-400">Time-to-React (Real)</span>
                                        <span className="text-green-400">{'<'} 3 ms</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[95%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-400">Entropy Sensitivity</span>
                                        <span className="text-oxot-gold">High</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-oxot-gold w-[85%]" />
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
                                    "Lacan, J. (1964). The Four Fundamental Concepts.",
                                    "Badiou, A. (1988). Being and Event.",
                                    "AEON Cyber. Agent Blue Technical Spec v4.1.",
                                ].map((ref, i) => (
                                    <li key={i} className="text-xs text-gray-500 font-mono leading-relaxed pl-3 border-l border-white/10">
                                        {i + 1}. {ref}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Status */}
                        <div className="p-6 rounded-2xl bg-oxot-gold/5 border border-oxot-gold/20 flex items-center gap-4">
                            <div className="p-3 bg-oxot-gold/20 rounded-full text-oxot-gold">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <div className="text-xs font-mono uppercase text-oxot-gold">Agent Blue</div>
                                <div className="text-sm font-bold text-white">Active Monitor</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
