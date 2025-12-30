"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calculator, Shield, TrendingDown, ClipboardCheck, BarChart } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function CyberActuarialPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[20%] w-[60%] h-[60%] bg-sky-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-sky-500/10 border border-sky-500 text-sky-400 text-xs font-mono font-bold">
                                RSCH-26
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Cyber <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-200">
                                Actuarial Engine
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Real-time insurance underwriting via graph topology risk scoring. Continuous premiums based on continuous defense.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Dynamic Premiums
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                AEON Risk Score (ARS)
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Pay-as-you-Risk
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
                            <Calculator size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Premium Algo
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
                            <TypewriterEquation
                                equation="P(t) = P_{base} \cdot e^{\alpha (\text{ARS}(t) - \text{Base})}"
                                className="text-3xl md:text-4xl text-sky-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "Premium P fluctuates in real-time based on the deviation of the AEON Risk Score (ARS) from the baseline."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Live Telemetry</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Output</div>
                                <div className="text-sm font-bold text-sky-400">Hourly Premium</div>
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
                                <ClipboardCheck className="text-sky-400" />
                                The Asymmetry Problem
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Cyber insurance underwriting is broken. It relies on annual, self-reported questionnaires ("Do you use MFA?").
                                    This creates massive information asymmetry and leads to catastrophic loss ratios.
                                </p>
                                <p>
                                    AEON replaces this with <strong>Continuous Graph-Based Assessment</strong>. We calculate risk every hour based on
                                    topology ($\lambda_&#123;max&#125;$), social engineering exposure ($T_&#123;ij&#125;$), and real-time hygiene.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <TrendingDown className="text-oxot-gold" />
                                ARS Components
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    The <strong>AEON Risk Score (ARS)</strong> is a weighted composite:
                                </p>
                                <ul className="list-none space-y-4 pl-0 mt-4">
                                    <li className="flex gap-4">
                                        <span className="text-sky-400 font-bold w-24">Spectral</span>
                                        <span>Viral capacity of the network graph ($\lambda_&#123;max&#125;$).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-sky-400 font-bold w-24">Cascade</span>
                                        <span>Probability of failure propagation (Granovetter).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-sky-400 font-bold w-24">Human</span>
                                        <span>Psychometric vulnerability of the workforce.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-sky-400 font-bold w-24">Hygiene</span>
                                        <span>Patch velocity, EDR coverage, MFA rates.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Premium Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <BarChart size={16} /> Live Quote
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                    <span className="text-xs text-gray-400">Base Premium</span>
                                    <span className="text-sm font-mono text-gray-300">$50,000/yr</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-400">Risk Factor</span>
                                    <span className="text-sm font-mono text-red-400">+35%</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                    <span className="text-xs text-gray-400 uppercase font-bold">Current Rate</span>
                                    <span className="text-xl font-bold font-mono text-white">$67,500</span>
                                </div>
                                <div className="p-2 bg-red-900/20 border border-red-500/30 rounded text-[10px] text-center text-red-300">
                                    Alert: Patch Velocity &gt; 90 days. Rate hike active.
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
                                    "Swiss Re. (2024). Cyber Insurance Growth.",
                                    "Eling, M. (2016). Cyber Risk Insurance.",
                                    "Woods, D. (2021). Quantifying Cyber Risk.",
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
