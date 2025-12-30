"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Box, Network, Layers, GitMerge, AlertOctagon } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function SheafCohomologyPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500 text-indigo-400 text-xs font-mono font-bold">
                                RSCH-21
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Sheaf <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-200">
                                Cohomology
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Formalizing Byzantine Faults as topological obstructions. Using algebraic topology to glue local security states into a global consensus.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Distributed Consensus
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Cohomology Groups
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Global Sections
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
                            <Layers size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            The Byzantine Obstruction
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                            <TypewriterEquation
                                equation="[(g_{ij})] \ne 0 \in H^1(X, \mathcal{F})"
                                className="text-2xl md:text-3xl text-indigo-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The obstruction to gluing local data into a global state is a non-trivial element in the first cohomology group."
                            </p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                                <Box size={24} className="text-gray-500" />
                                <div>
                                    <div className="text-xs text-gray-500 uppercase">Local Section</div>
                                    <div className="text-sm text-white">Consistent data on node subset $U$</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                                <Network size={24} className="text-indigo-400" />
                                <div>
                                    <div className="text-xs text-indigo-400 uppercase">Global Section</div>
                                    <div className="text-sm text-white">Consensus across entire network $X$</div>
                                </div>
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
                                <GitMerge className="text-indigo-400" />
                                The Sheaf of Security States
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We model the network as a topological space $X$ and define a sheaf $\mathcal{'{'}F{'}'}$ where $\mathcal{'{'}F{'}'}(U)$
                                    is the set of consistent security states on the open set $U$. The challenge of distributed defense
                                    is to determine if local observations (sensor data) can be "glued" together to form a coherent
                                    global picture.
                                </p>
                                <p>
                                    A <strong>Global Section</strong> $s \in H^0(X, \mathcal{'{'}F{'}'})$ represents a state where all nodes agree.
                                    However, in the presence of <strong>Byzantine Faults</strong> (e.g., compromised nodes lying about their state),
                                    this gluing fails.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <AlertOctagon className="text-red-400" />
                                Fault Injection Map
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Mathematically, we use the <strong>Mayer-Vietoris</strong> sequence to pinpoint the fault.
                                    For a failing subnetwork $A$ and its complement $Z$, the failure to agree maps directly to
                                    the first cohomology group via the connecting homomorphism $\delta$:
                                </p>
                                <div className="bg-white/5 p-6 rounded-lg border-l-4 border-indigo-500 overflow-x-auto">
                                    <TypewriterEquation
                                        equation="\delta: H^0(A \cap Z, \mathcal{F}) \to H^1(X, \mathcal{F})"
                                        className="text-indigo-300 whitespace-nowrap"
                                    />
                                </div>
                                <p>
                                    We call this $\delta$ the <strong>"Fault Injection Map"</strong>. If the result is non-zero,
                                    it proves topologically that a consensus is impossible, pinpointing the obstruction (the attacker)
                                    within the network geometry.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* References */}
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                References
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Ghrist, R. (2014). Elementary Applied Topology.",
                                    "Kashiwara, M. (2006). Categories and Sheaves.",
                                    "Robinson, M. (2014). Topological Signal Processing.",
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
