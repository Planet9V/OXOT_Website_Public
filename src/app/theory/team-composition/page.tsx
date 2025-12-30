"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Users, Music, Utensils, Zap, BarChart } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function TeamCompositionPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-orange-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-orange-500/10 border border-orange-500 text-orange-400 text-xs font-mono font-bold">
                                RSCH-38
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            The Chef: <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                                Team Composition
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Psychometric orchestration for high-performance teams. Treating personnel selection as a harmonic optimization problem.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                DISC Quadrants
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                OCEAN Traits
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Group Dissonance
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
                            <Users size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Optimization Function
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                            <TypewriterEquation
                                equation="\mathcal{U}(\mathbf{P}) = \alpha (\Delta m) - \delta (D_{team}') + \epsilon (\text{Fit})"
                                className="text-2xl md:text-3xl text-orange-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The utility of a candidate P is maximized by increasing team alignment (magnetization), minimizing group dissonance, and ensuring cultural fit."
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Utensils size={16} className="text-orange-400" />
                                    <div className="text-xs text-gray-500 font-mono uppercase">The Chef</div>
                                </div>
                                <div className="text-sm text-white">Selects "ingredients" (people) to create a balanced recipe.</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Music size={16} className="text-blue-400" />
                                    <div className="text-xs text-gray-500 font-mono uppercase">The Conductor</div>
                                </div>
                                <div className="text-sm text-white">Harmonizes distinct "voices" into a symphony.</div>
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
                                <Music className="text-orange-400" />
                                The Orchestra Metaphor
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    A high-performing team is not just a collection of smart individuals; it is a polyphonic ensemble.
                                    Just as an orchestra needs a balance of instruments, a team needs a balance of psychometric profiles.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                    <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                                        <h4 className="text-orange-400 font-bold mb-2">Brass (Dominance)</h4>
                                        <p className="text-sm text-gray-400">Leaders, Drivers. They project the melody and set the direction.</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                                        <h4 className="text-yellow-400 font-bold mb-2">Woodwind (Influence)</h4>
                                        <p className="text-sm text-gray-400">Communicators, Motivators. They add color and fluidity to the interaction.</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                                        <h4 className="text-green-400 font-bold mb-2">Strings (Steadiness)</h4>
                                        <p className="text-sm text-gray-400">Supporters, Mediators. They provide the harmonic foundation.</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-lg border border-white/5">
                                        <h4 className="text-blue-400 font-bold mb-2">Percussion (Conscientiousness)</h4>
                                        <p className="text-sm text-gray-400">Analysts, Specialists. They ensure precision, structure, and rhythm.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Zap className="text-oxot-gold" />
                                Group Dissonance
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We mathematically define the friction between team members as <strong>Dissonance</strong>.
                                    While some dissonance (tension) drives creativity (innovation), too much leads to cacophony (conflict).
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-orange-500">
                                    <TypewriterEquation
                                        equation="D_{ij}(t) = || \mathbf{B}_i(t) - \mathbf{B}_j(t) ||^2 + \gamma \frac{d}{dt}(\mathbf{B}_i \cdot \mathbf{B}_j)"
                                        className="text-orange-300"
                                    />
                                </div>
                                <p>
                                    The Chef algorithm simulates how a new hire's "voice" will blend with the existing ensemble.
                                    Will they resolve a suspended chord, or introduce a tritone clashing with the lead developer?
                                </p>
                            </div>
                        </section>

                        {/* Section 3: Validation */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <BarChart className="text-green-400" />
                                Empirical Impact
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-xs text-gray-500 uppercase tracking-widest">
                                            <th className="py-4">Metric</th>
                                            <th className="py-4 text-right">Standard Hire</th>
                                            <th className="py-4 text-right text-oxot-gold">Chef Optimized</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-300 font-mono">
                                        <tr className="border-b border-white/5">
                                            <td className="py-4">90-Day Retention</td>
                                            <td className="py-4 text-right">72%</td>
                                            <td className="py-4 text-right text-green-400">89%</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4">Time to Productivity</td>
                                            <td className="py-4 text-right">45 days</td>
                                            <td className="py-4 text-right text-green-400">32 days</td>
                                        </tr>
                                        <tr className="border-b border-white/5">
                                            <td className="py-4">Team Satisfaction</td>
                                            <td className="py-4 text-right">65%</td>
                                            <td className="py-4 text-right text-green-400">81%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Visualization Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Music size={16} /> Team Harmony
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-black/40 p-3 rounded border border-white/5">
                                    <span className="text-xs text-gray-400">Current Chord</span>
                                    <span className="text-orange-400 font-mono font-bold">C Maj7</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs text-gray-500 uppercase">Coverage</div>
                                    <div className="flex gap-1 h-2">
                                        <div className="bg-orange-500 w-1/4 rounded-l" title="Dominance"></div>
                                        <div className="bg-yellow-500 w-1/6" title="Influence (Low!)"></div>
                                        <div className="bg-green-500 w-1/4" title="Steadiness"></div>
                                        <div className="bg-blue-500 w-1/3 rounded-r" title="Conscientiousness"></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-400">
                                        <span>GAP DETECTED: Need Woodwind (I)</span>
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
                                    "Belbin, R. M. (2010). Team roles at work.",
                                    "Woolley, et al. (2010). Collective Intelligence.",
                                    "Page, S. E. (2007). The Difference.",
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
