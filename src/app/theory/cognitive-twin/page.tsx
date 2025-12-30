"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Brain, User, AlertCircle, Clock, Zap, Target, Activity } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function CognitiveTwinPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[30%] w-[60%] h-[60%] bg-violet-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-violet-500/10 border border-violet-500 text-violet-400 text-xs font-mono font-bold">
                                RSCH-31
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Cognitive <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-200">
                                Digital Twin
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Simulating the human defender. Modeling SOC analyst decision-making under stress, fatigue, and cognitive load to predict and prevent errors.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Human-in-the-Loop
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Cognitive Load Theory
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Decision Modeling
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
                            <Brain size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Yerkes-Dodson Law
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
                            <TypewriterEquation
                                equation="P = a \cdot A - b \cdot A^2"
                                className="text-3xl md:text-4xl text-violet-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "Performance (P) is a quadratic function of Arousal (A). Too little stress leads to carelessness; too much leads to panic."
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="text-xs text-gray-500 font-mono uppercase">Simulation Goal</div>
                                <div className="text-sm text-white mt-1">Predict <strong>Defender Errors</strong> before they occur.</div>
                            </div>
                            <div className="p-4 bg-violet-900/10 rounded-lg border border-violet-500/30">
                                <div className="text-xs text-violet-400 font-mono uppercase">Impact</div>
                                <div className="text-sm text-white mt-1">35% Reduction in Incident Response Time.</div>
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
                                <User className="text-violet-400" />
                                Modeling the Defender
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Just as we model network topology, we must model the people defending it. Each defender $d$ is represented
                                    as an agent with a skill vector, a personality vector (Big Five), and a dynamic state:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-violet-500">
                                    <TypewriterEquation
                                        equation="\text{State}_d(t) = (\text{Load}_d, \text{Fatigue}_d, \text{Arousal}_d)"
                                        className="text-violet-300"
                                    />
                                </div>
                                <p>
                                    Under high cognitive load, decision quality degrades. Experts revert to heuristics (shortcuts),
                                    while novices may freeze (panic). The <strong>Cognitive Digital Twin</strong> tracks these states
                                    in real-time to intervene when human reliability fails.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Target className="text-oxot-gold" />
                                Human-Aware Optimization
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Traditional SOAR (Security Orchestration, Automation, and Response) playbooks are static steps.
                                    AEON playbooks are treated as policies $\pi$ in a Markov Decision Process, optimized not just for
                                    technical resolution, but for minimizing defender cognitive load:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-violet-500">
                                    <TypewriterEquation
                                        equation="R'(s, a) = R(s, a) - \lambda \cdot \text{CognitiveLoad}(a)"
                                        className="text-violet-300"
                                    />
                                </div>
                                <p>
                                    This prevents the system from assigning a high-complexity task to an analyst who is already
                                    showing signs of fatigue or panic, effectively "load-balancing" the human brain.
                                </p>
                            </div>
                        </section>

                        {/* Section 3: Empirical Data */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Activity className="text-green-400" />
                                Empirical Results
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs text-gray-500 uppercase tracking-widest">
                                            <th className="py-4">Metric</th>
                                            <th className="py-4 text-right">Without CDT</th>
                                            <th className="py-4 text-right text-oxot-gold">With CDT</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-300 font-mono">
                                        <tr className="border-b border-white/5">
                                            <td className="py-4">Mean Response Time</td>
                                            <td className="py-4 text-right">4.2 hours</td>
                                            <td className="py-4 text-right text-green-400">2.7 hours</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4">Panic Errors</td>
                                            <td className="py-4 text-right">18%</td>
                                            <td className="py-4 text-right text-green-400">7%</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4">Resolution Rate</td>
                                            <td className="py-4 text-right">78%</td>
                                            <td className="py-4 text-right text-green-400">91%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Fatigue Monitor */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Clock size={16} /> Analyst State
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-400">Cognitive Load</span>
                                        <span className="text-yellow-400">72%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 w-[72%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-gray-400">Fatigue Level</span>
                                        <span className="text-red-400">Low</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-400 w-[25%]" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <div className="text-[10px] text-green-400 font-mono uppercase mb-1">Recommendation</div>
                                <div className="text-sm font-bold text-white">Continue Assigning Tasks</div>
                            </div>
                        </div>

                        {/* References */}
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                References
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Klein, G. (1998). Sources of Power.",
                                    "Sweller, J. (1988). Cognitive Load Theory.",
                                    "Yerkes, R. M. (1908). Relation of Strength of Stimulus.",
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
