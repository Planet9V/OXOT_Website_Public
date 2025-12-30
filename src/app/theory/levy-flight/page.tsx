"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Activity, Search, AlertOctagon, TrendingUp } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function LevyFlightPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[100px]" />
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
                                RSCH-15
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Lévy Flight <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-200">
                                APT Detection
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Modeling heavy-tailed attack noise with anomalous diffusion. Why a 10-sigma event is not an anomaly, but a strategy.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Hurst Exponent
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Alpha-Stable
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Super-Diffusion
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
                            <Activity size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Fractional Lévy Motion
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
                            <TypewriterEquation
                                equation="X(t) = \int_{-\infty}^{t} (t-u)^{H-1/\alpha} dM(u)"
                                className="text-2xl md:text-3xl text-teal-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The trajectory X(t) is defined by the Hurst Exponent (H) and Stability parameter (alpha). It models bursty, super-diffusive behavior."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Packet Times</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Metric</div>
                                <div className="text-sm font-bold text-teal-400">Hurst Exp (H)</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Verdict</div>
                                <div className="text-sm font-bold text-white">Persistent?</div>
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
                                <AlertOctagon className="text-teal-400" />
                                The Gaussian Fallacy
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Standard IDS tools assume network noise is Gaussian (Normal). They look for 3-sigma anomalies.
                                    But human (and attacker) behavior is <strong>Heavy-Tailed</strong> ($\alpha$-Stable).
                                </p>
                                <p>
                                    Real APTs exhibit "Lévy Flights": long periods of silence (the wait) followed by extreme, high-velocity jumps (the exfiltration).
                                    In a Gaussian model, these are "impossible" outliers. In our model, they are the expected signal.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <TrendingUp className="text-oxot-gold" />
                                The Hurst Detector
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We measure the <strong>Hurst Exponent ($H$)</strong> of traffic flows:
                                </p>
                                <ul className="list-none space-y-4 pl-0 mt-4">
                                    <li className="flex gap-4">
                                        <span className="text-teal-400 font-bold w-24">H = 0.5</span>
                                        <span>Random Brownian noise (Normal Traffic).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-teal-400 font-bold w-24">H &lt; 0.5</span>
                                        <span>Anti-persistent (Mean reverting).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-teal-400 font-bold w-24">H &gt; 0.5</span>
                                        <span><strong>Persistent</strong> (Super-diffusive). This indicates a directed C2 channel.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Detection Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Search size={16} /> Signal Analysis
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-black/40 rounded border border-white/5 relative h-32 flex items-end gap-1 overflow-hidden">
                                    {/* Fake Bar Chart for Levy Flight */}
                                    {[10, 10, 10, 80, 10, 10, 10, 10, 95, 10, 10, 10].map((h, i) => (
                                        <div key={i} className={`flex-1 ${h > 50 ? 'bg-red-500' : 'bg-gray-700'}`} style={{ height: `${h}%` }}></div>
                                    ))}
                                    <div className="absolute top-2 right-2 text-[10px] text-gray-500">Flow: dst_port=443</div>
                                </div>
                                <div className="flex justify-between items-center text-xs border-t border-white/10 pt-2">
                                    <span className="text-gray-400">Calculated Hurst (H)</span>
                                    <span className="text-red-400 font-bold font-mono">0.82</span>
                                </div>
                                <div className="text-center">
                                    <span className="px-2 py-1 bg-red-900/30 border border-red-500/50 rounded text-[10px] text-red-300 font-bold uppercase">
                                        Action: Terminate
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
                                    "Mandelbrot, B. B. (1982). Fractal Geometry of Nature.",
                                    "Lillo, F. (2003). Power-Law Distributions in Cyber.",
                                    "Taqqu, M. S. (1997). Fractional Brownian Motion.",
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
