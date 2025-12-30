"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Box, GitMerge, AlertCircle, Tornado, Eye } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function SupplyChainButterflyPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-amber-900/10 rounded-full blur-[100px]" />
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
                                RSCH-28
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Supply Chain <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                                Butterfly Radar
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            N-th order dependency forecasting. Detecting the small flutter in a repo in Taiwan shortly before the tsunami hits your server.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Transitive Dependencies
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Diffusion Networks
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Leading Indicators
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
                            <Tornado size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Butterfly Score
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                            <TypewriterEquation
                                equation="B = 1 - \min_{chain} ( \prod H_i^{w_i} )"
                                className="text-3xl md:text-4xl text-orange-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The Butterfly Score (B) represents supply chain risk, driven by the health (H) of the weakest link in the deepest dependency chain."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">N-Order Graph</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Log4j Lead Time</div>
                                <div className="text-lg font-bold text-green-400">+18 Days</div>
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
                                <Box className="text-orange-400" />
                                The Visibility Gap
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Organizations see their direct dependencies (1st Order). They rarely see the dependencies of dependencies (N-th Order).
                                    The Log4j crisis was a "Butterfly Effect": a single vulnerability in a ubiquitous, deep library cascaded to millions of apps.
                                </p>
                                <p>
                                    The average enterprise app has 500+ transitive dependencies. This is the <strong>Dark Matter</strong> of the software supply chain.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Eye className="text-oxot-gold" />
                                Predict, Don't React
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Vulnerabilities display <strong>leading indicators</strong> before disclosure:
                                </p>
                                <ul className="list-none space-y-4 pl-0 mt-4">
                                    <li className="flex gap-4">
                                        <span className="text-orange-400 font-bold w-32">Maintainer Abandonment</span>
                                        <span>Commit Rate drops &gt; 50% (Lead time: 6-12 months).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-orange-400 font-bold w-32">Community Forking</span>
                                        <span>Spike in forks suggests fragmentation (Lead time: 2-4 months).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-orange-400 font-bold w-32">Researcher Chatter</span>
                                        <span>Social mentions of specific libraries (Lead time: 2-4 weeks).</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Weather Map Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <GitMerge size={16} /> Dependency Weather
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-green-900/10 border border-green-500/20 rounded-lg">
                                    <div className="text-xs text-green-400 font-bold mb-1">Direct (1st Order)</div>
                                    <div className="text-xs text-gray-400">React, Next.js, Tailwind</div>
                                    <div className="h-1 bg-green-500/50 rounded mt-1 w-full"></div>
                                </div>
                                <div className="p-3 bg-yellow-900/10 border border-yellow-500/20 rounded-lg">
                                    <div className="text-xs text-yellow-400 font-bold mb-1">Transitive (2nd Order)</div>
                                    <div className="text-xs text-gray-400">Webpack, PostCSS</div>
                                    <div className="h-1 bg-yellow-500/50 rounded mt-1 w-[80%]"></div>
                                </div>
                                <div className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                                    <div className="text-xs text-red-400 font-bold mb-1">Deep (4th Order)</div>
                                    <div className="text-xs text-gray-400">left-pad, lodash.template</div>
                                    <div className="h-1 bg-red-500/50 rounded mt-1 w-[40%] text-right text-[8px] text-red-300 pr-1">CRITICAL</div>
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
                                    "CISA. (2021). Log4j Guidance.",
                                    "Ohm, M. (2020). Backstabber's Knife Collection.",
                                    "Synopsys. (2024). Open Source Risk Report.",
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
