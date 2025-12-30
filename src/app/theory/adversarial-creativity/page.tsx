"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, Dna, BookOpen, Database, Shuffle } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function AdversarialCreativityPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-fuchsia-900/10 rounded-full blur-[100px]" />
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
                                RSCH-25
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Adversarial <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-200">
                                Creativity Engine
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Anticipating novel TTPs via combinatorial evolution and Sci-Fi mining. "Generative Defense" against threats that don't exist yet.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Evolutionary Algorithms
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Sci-Fi Mining
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Cross-Domain Transfer
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
                            <Lightbulb size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Fitness Function
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                            <TypewriterEquation
                                equation="F(G) = \text{Feas} \times \text{Impact} \times \text{Novelty}"
                                className="text-3xl md:text-4xl text-purple-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "We evolve attack chains (G) to maximize Feasibility, Impact (CIA damage), and Novelty. We breed the hacks of tomorrow."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Techniques + Fiction</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Process</div>
                                <div className="text-sm font-bold text-purple-400">Evolution</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Output</div>
                                <div className="text-sm font-bold text-white">Novel TTPs</div>
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
                                <Shuffle className="text-purple-400" />
                                Generative Defense
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Machine Learning fails at predicting novel attacks because it relies on past data. To anticipate the unprecedented,
                                    we must use <strong>Generative Defense</strong>. The Adversarial Creativity Engine (ACE) systematically explores the "Possible Attack Space."
                                </p>
                                <p>
                                    ACE combines genetic algorithms (breeding TTP chains), cross-domain analogy (mapping biological virus evasion to malware),
                                    and semantic graph collision on the Digital Twin.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <BookOpen className="text-oxot-gold" />
                                The Gibson Heuristic
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    <em>"If a science fiction author imagined it, someone will eventually build it."</em>
                                </p>
                                <p>
                                    We explicitly mine sci-fi literature (Gibson, Stephenson, Suarez) for conceptual attack vectors.
                                    ACE extracts concepts like "Cyberspace" (1984) or "AI Malware" (Daemon, 2006) and attempts to
                                    instantiate them using current technology primitives.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-purple-500">
                                    <p className="font-mono text-sm text-purple-300">
                                        "Neuromancer" (1984) predicted BCI exploitation.
                                        ACE generates: T1200 → T1071 → T1485 (Neuralink Data Destruction).
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Genome Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Dna size={16} /> Attack Genome
                            </h3>
                            <div className="space-y-4">
                                <div className="text-xs text-center text-gray-500 mb-2">Generation #1402</div>
                                <div className="flex justify-center gap-1">
                                    <div className="w-8 h-12 bg-red-900/50 border border-red-500 rounded flex items-center justify-center text-[10px] font-mono" title="T1027">T1027</div>
                                    <div className="w-4 h-1 bg-gray-700 my-auto"></div>
                                    <div className="w-8 h-12 bg-purple-900/50 border border-purple-500 rounded flex items-center justify-center text-[10px] font-mono" title="T1055">T1055</div>
                                    <div className="w-4 h-1 bg-gray-700 my-auto"></div>
                                    <div className="w-8 h-12 bg-oxot-gold/20 border border-oxot-gold rounded flex items-center justify-center text-[10px] font-mono text-oxot-gold font-bold" title="Novel Mutation">NEW</div>
                                </div>
                                <div className="p-3 bg-black/40 rounded text-center">
                                    <div className="text-[10px] text-gray-500 uppercase">Mutation</div>
                                    <div className="text-sm font-bold text-white">API Call Shuffling</div>
                                    <div className="text-[10px] text-green-400 mt-1">Status: Plausible (Bio-Mimicry)</div>
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
                                    "Holland, J. H. (1992). Adaptation in Natural Systems.",
                                    "Fauconnier, G. (2002). Conceptual Blending.",
                                    "Gibson, W. (1984). Neuromancer.",
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
