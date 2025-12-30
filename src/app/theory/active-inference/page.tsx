"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Share2, Shield, Radio } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function ActiveInferencePage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
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
                                RSCH-13
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Active <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">
                                Inference MARL
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Multi-Agent Reinforcement Learning with Graph Convolutional Communication. Decentralized defense reflex for emergent threats.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                MARL
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Graph Convolutions
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Free Energy
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
                            Latent Communication
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                            <TypewriterEquation
                                equation="h_a' = \sigma \left( \sum_{b \in \mathcal{N}(a)} W h_b + m_a \right)"
                                className="text-2xl md:text-3xl text-blue-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "Agents communicate not by sending large logs, but by diffusing latent state vectors (h) across the graph topology."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Training</div>
                                <div className="text-sm font-bold text-white">Centralized</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Execution</div>
                                <div className="text-sm font-bold text-blue-400">Decentralized</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Optimality</div>
                                <div className="text-sm font-bold text-white">Global Q</div>
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
                                <Share2 className="text-blue-400" />
                                From Agent to Swarm
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Single-agent AI (like a standalone firewall) fails against coordinated attacks because it lacks context.
                                    AEON treats every endpoint as an agent in a <strong>Multi-Agent Reinforcement Learning (MARL)</strong> swarm.
                                </p>
                                <p>
                                    Through <strong>Graph Convolutional Communication (GCC)</strong>, agents share "intuitions" (embeddings).
                                    Agent A knows Agent B is under stress without inspecting Agent B's packets directly.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Shield className="text-oxot-gold" />
                                Emergent Defense
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We maximize the global value function $Q&#123;tot&#125;$ (using QMIX). The result is <strong>emergent altruism</strong>:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-500">
                                    <p className="font-mono text-sm text-blue-300">
                                        Example: Agent A (Switch 1) voluntarily disconnects itself—sacrificing its own uptime 'reward'—to prevent
                                        lateral movement to the Core DB, maximizing the global Swarm Survival reward.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Swarm State Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Radio size={16} /> Swarm Consensus
                            </h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-400">Global Free Energy</span>
                                    <span className="text-green-400 font-mono">-12.4 dB</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-gray-300">Agent 1 (Firewall)</span>
                                        <span className="ml-auto text-blue-400 font-bold">BLOCK</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-gray-300">Agent 2 (EDR)</span>
                                        <span className="ml-auto text-yellow-400 font-bold">HOLDBACK</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-gray-300">Agent 3 (NDR)</span>
                                        <span className="ml-auto text-green-400 font-bold">MONITOR</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10 text-center">
                                    <div className="text-[10px] text-gray-500">Policy Source</div>
                                    <div className="text-xs font-mono text-white">CTDE_Epoch_9022</div>
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
                                    "Rashid, T. (2018). QMIX.",
                                    "Jiang, J. (2018). Graph Convolutional RL.",
                                    "Friston, K. (2010). The Free-Energy Principle.",
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
