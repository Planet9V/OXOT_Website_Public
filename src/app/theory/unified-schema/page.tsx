"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Database, Network, Share2, Layers } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function UnifiedSchemaPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[30%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-900/10 rounded-full blur-[100px]" />
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
                                RSCH-18
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Unified <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-200">
                                Schema
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            The synthesis of McKenney-Lacan Theory and Stochastic Dynamics into a single Neo4j Graph Ontology.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Graph Theory
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Ontology
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Psychohistory
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
                            Borromean Knot Ontology
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                            <div className="font-mono text-sm text-green-300 space-y-2">
                                <div>(:Subject)-[:DRIVEN_BY]-&gt;(:Symbolic)</div>
                                <div>(:Subject)-[:HAUNTED_BY]-&gt;(:Real)</div>
                                <div>(:Subject)-[:CAPTURED_BY]-&gt;(:Imaginary)</div>
                            </div>
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The schema maps the three registers of Lacanian psychoanalysis directly to graph nodes: Rules (Symbolic), Interfaces (Imaginary), and Zero-Days (Real)."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Symbolic</div>
                                <div className="text-sm font-bold text-white">RBAC / Logs</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Imaginary</div>
                                <div className="text-sm font-bold text-emerald-400">UX / Trust</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Real</div>
                                <div className="text-sm font-bold text-white">Entropy</div>
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
                                <Layers className="text-emerald-400" />
                                The Ontological Structure
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    AEON Core's "Unified Architecture" connects the abstract math of Volume 1 with the swarm dynamics of Volume 4.
                                    The Graph Schema is the bridge.
                                </p>
                                <p>
                                    We define four primary Node Types:
                                </p>
                                <ul className="list-disc pl-4 space-y-2 marker:text-emerald-500">
                                    <li><strong>Subject:</strong> The identity, compromised user, or analyst (Psychometric Tensor).</li>
                                    <li><strong>Object:</strong> The asset, honeypot, or file (Desirability Index).</li>
                                    <li><strong>PacketFlow:</strong> The vector of interaction (Hurst Exponent).</li>
                                    <li><strong>Symptom:</strong> The anomaly representing the irruption of the Real (Alert).</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Share2 className="text-oxot-gold" />
                                Prediction via Graph Topology
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    By monitoring the **Hurst Exponent ($H$)** of the `PacketFlow` edges connected to a `Subject` node, we can detect
                                    when the *Real* is breaking through the *Symbolic*.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-emerald-500">
                                    <p className="font-mono text-sm text-emerald-300">
                                        "A Seldon Crisis is defined as a topological collapse where the Symbolic order (Graph Connectivity) fails to contain the Real (Entropy)."
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Schema Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Database size={16} /> Neo4j Definition
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-black/40 p-4 rounded-lg border border-white/5 font-mono text-[10px] text-gray-300 overflow-x-auto whitespace-pre">
                                    {`CREATE (:Subject {
  uid: "usr_123",
  neuroticism: 0.8,
  risk_score: 0.1
});

CREATE (:ObjectA {
  name: "passwords.xlsx",
  desirability: 0.95
});

CREATE (:Subject)-[:DESIRES]->(:ObjectA);`}
                                </div>

                                <div className="flex justify-between text-xs pt-2 border-t border-white/10">
                                    <span className="text-gray-400">Schema Version</span>
                                    <span className="text-emerald-400 font-mono">v5.0 (Unified)</span>
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
                                    "AEON Volume 1: The Calculus of Defense.",
                                    "AEON Volume 4: Antifragile Swarm Math.",
                                    "McKenney, J. (2025). The Unified Theory.",
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
