"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Compass, PenTool, Map, TrendingUp } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function InformationGeometryPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-teal-500/10 border border-teal-500 text-teal-400 text-xs font-mono font-bold">
                                RSCH-22
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Information <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-200">
                                Geometry
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Defense optimization via Natural Gradient Descent on the statistical manifold of attack distributions.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Fisher Metric
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Riemannian
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Geodesic
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
                            <Compass size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Fisher Information Matrix
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
                            <TypewriterEquation
                                equation="g_{ij}(\theta) = \mathbb{E} \left[ \partial_i \ell \cdot \partial_j \ell \right]"
                                className="text-2xl md:text-3xl text-teal-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The statistical manifold is curved. Distance is not Euclidean; it is defined by the Fisher metric g. We must follow the curvature."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Gradient</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Correct</div>
                                <div className="text-sm font-bold text-teal-400">× g⁻¹</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Result</div>
                                <div className="text-sm font-bold text-white">Geodesic</div>
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
                                <Map className="text-teal-400" />
                                The Manifold of Attacks
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    The space of all possible attack distributions is not flat. It is a Riemannian manifold.
                                    Standard optimization (Euclidean Gradient Descent) takes "straight lines" in parameter space, which are actually
                                    long, inefficient curves on the probability manifold.
                                </p>
                                <p>
                                    By using **Natural Gradient Descent**, we follow the **Geodesics** (shortest paths), adapting our defense policy
                                    orders of magnitude faster than the attacker can evolve.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <TrendingUp className="text-oxot-gold" />
                                AEON Core Tuning
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Agent Blue uses this geometry to auto-tune its detection thresholds. Instead of trial-and-error, it calculates the
                                    curvature of the local information geometry and jumps directly to the optimal configuration.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-teal-500">
                                    <p className="font-mono text-sm text-teal-300">
                                        "Convergence in O(log N) steps instead of O(N)."
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Optimization Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <PenTool size={16} /> Tuning Efficiency
                            </h3>
                            <div className="space-y-4">
                                <div className="relative h-32 bg-black/40 rounded border border-white/5 p-4">
                                    {/* Abstract visualization of a curve shortcut */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg width="100%" height="100%" viewBox="0 0 200 100">
                                            {/* Manifold curve */}
                                            <path d="M 20 80 Q 100 0 180 80" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="4 4" />
                                            {/* Natural Gradient Path (Straight on manifold, curved in Euclidean) */}
                                            <path d="M 20 80 L 180 80" fill="none" stroke="#2dd4bf" strokeWidth="3" />
                                            <circle cx="20" cy="80" r="4" fill="#666" />
                                            <circle cx="180" cy="80" r="4" fill="#fff" />
                                        </svg>
                                    </div>
                                    <div className="absolute bottom-2 left-2 text-[10px] text-teal-400 font-bold">Natural Gradient</div>
                                    <div className="absolute top-2 left-2 text-[10px] text-gray-500">Standard GD</div>
                                </div>
                                <div className="flex justify-between text-xs pt-2 border-t border-white/10">
                                    <span className="text-gray-400">Epochs to Converge</span>
                                    <span className="text-teal-400 font-mono">12 (vs 150)</span>
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
                                    "Amari, S. (1998). Natural Gradient Works Efficiently.",
                                    "Amari & Nagaoka. (2000). Methods of Information Geometry.",
                                    "Martens, J. (2020). New Insights on Natural Gradient.",
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
