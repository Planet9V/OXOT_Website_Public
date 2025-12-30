"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Cpu, Cloud, Zap, Cable, Timer } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function EdgePhysicsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-green-900/10 rounded-full blur-[100px]" />
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
                                RSCH-08
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Physics of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-200">
                                The Edge
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Latency, bandwidth, and the calculus of reflex. Why cloud security fails against light-speed threats like ransomware.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Bi-Cameral Defense
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Reflex Threshold
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Shannon Limit
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
                            <Cpu size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Latency Condition
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                            <TypewriterEquation
                                equation="L(x) + T_{process} < T_{attack}"
                                className="text-3xl md:text-4xl text-emerald-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The total latency to the decision engine must be less than the Time-to-Compromise. The cloud is too far away."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="flex justify-center mb-2"><Cloud size={20} className="text-gray-500" /></div>
                                <div className="text-[10px] text-gray-400 uppercase">Cloud (Ashburn)</div>
                                <div className="text-lg font-bold text-red-400">100ms</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="flex justify-center mb-2"><Cpu size={20} className="text-emerald-400" /></div>
                                <div className="text-[10px] text-gray-400 uppercase">Edge (Local)</div>
                                <div className="text-lg font-bold text-emerald-400">1ms</div>
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
                                <Timer className="text-emerald-400" />
                                The Ransomware Horizon
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Modern ransomware executes initial API hooks in microseconds. By the time a log telemetry packet reaches
                                    a Cloud SIEM (100ms round trip), the encryption keys are already generated. The <strong>Cloud is purely forensics</strong>
                                    (The Symbolic); it cannot intervene in The Real.
                                </p>
                                <p>
                                    Only the Edge, sitting physically on the wire or device, operates within the <strong>Reflex Threshold</strong> needed to block execution.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Cable className="text-oxot-gold" />
                                Bandwidth vs. Insight
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Shannon's Channel Capacity Theorem limits what we can upload. We cannot stream full PCAP to the cloud for every device.
                                    Therefore, the Edge performs <strong>Compression via Intelligence</strong>:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-emerald-500">
                                    <TypewriterEquation
                                        equation="C = B \log_2(1 + S/N)"
                                        className="text-emerald-300"
                                    />
                                </div>
                                <p>
                                    The Edge sees 100% of the high-fidelity signal (The Real) but only transmits the derived insight (The Symbol) to the cloud,
                                    optimizing the physics of the channel.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Industrial Parallel */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Zap size={16} /> Industrial Proof
                            </h3>
                            <div className="space-y-4">
                                <div className="text-sm text-gray-400 italic mb-2">
                                    "Smart Factory physics apply 1:1 to Smart Defense."
                                </div>
                                <div className="space-y-3">
                                    <div className="p-3 bg-black/40 rounded border border-white/5">
                                        <div className="text-xs text-emerald-400 font-bold">OFI Cocoa Plant</div>
                                        <div className="text-xs text-gray-500 mt-1">Roaster spike -&gt; PLC cuts gas (Reflex)</div>
                                    </div>
                                    <div className="flex justify-center">
                                        <ArrowLeft size={16} className="rotate-[-90deg] text-gray-600" />
                                    </div>
                                    <div className="p-3 bg-black/40 rounded border border-white/5">
                                        <div className="text-xs text-emerald-400 font-bold">AEON Defense</div>
                                        <div className="text-xs text-gray-500 mt-1">C2 Beacon -&gt; Agent Blue blocks (Reflex)</div>
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
                                    "Shannon, C. E. (1949). Communication in Noise.",
                                    "Shi, W. (2016). Edge Computing Challenges.",
                                    "Braincube. Edge vs Cloud Architecture.",
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
