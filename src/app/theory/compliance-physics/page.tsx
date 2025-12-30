"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Scale, Activity, FileCheck, RefreshCw } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function CompliancePhysicsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-sky-900/10 rounded-full blur-[100px]" />
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
                                RSCH-32
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Compliance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-200">
                                Physics
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Modeling regulatory audits as a continuous dynamical system with Kalman Filtering. Audit-proof your infrastructure in real-time.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Kalman Filter
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                State Space
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Phase Transition
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
                            <Scale size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            State Estimation
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                            <TypewriterEquation
                                equation="\hat{x}_{k} = \hat{x}_{k}^- + K_k(z_k - H \hat{x}_{k}^-)"
                                className="text-2xl md:text-3xl text-blue-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The Kalman Filter estimates the true state of compliance (x) from noisy telemetry (z), correcting for drift in real-time."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Config Change</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Filter</div>
                                <div className="text-sm font-bold text-blue-400">Drift Correction</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Output</div>
                                <div className="text-sm font-bold text-white">Trust Score</div>
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
                                <RefreshCw className="text-blue-400" />
                                From Snapshot to Stream
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Traditional compliance is a "snapshot" problem (Annual Audit). AEON redefines it as a "streaming" problem.
                                    We treat compliance as a physical state vector $x(t)$ that evolves over time according to:
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-500">
                                    <TypewriterEquation
                                        equation="\dot{x}(t) = A x(t) + B u(t) + w(t)"
                                        className="text-blue-300"
                                    />
                                </div>
                                <p>
                                    Where $u(t)$ are your controls (patches, policies) and $w(t)$ is entropy (shadow IT, drift).
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <FileCheck className="text-oxot-gold" />
                                Predicting Failure
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Sudden audit failure is actually a **Phase Transition**. By monitoring critical slowing down in the recovery rate of
                                    compliance metrics, we can predict an audit failure 72 hours before it happens (RSCH-09 correlation).
                                </p>
                                <p>
                                    This allows **Pre-emptive Remediation**. You don't fix it because an auditor found it; you fix it because the physics model predicted a crash.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Compliance Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Activity size={16} /> Continuous Audit
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-black/40 p-3 rounded border border-white/5">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase">Framework</div>
                                        <div className="text-white font-bold">PCI-DSS 4.0</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500 uppercase">Score</div>
                                        <div className="text-green-400 font-mono text-xl">99.2%</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-gray-300">Requirement 1 (Network)</span>
                                        <span className="ml-auto text-green-400">Stable</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                                        <span className="text-gray-300">Requirement 6 (Patching)</span>
                                        <span className="ml-auto text-yellow-400">Drifting (H=0.6)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-gray-300">Requirement 12 (Policy)</span>
                                        <span className="ml-auto text-green-400">Stable</span>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-white/10 text-center">
                                    <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">
                                        Next Formal Audit: 204 Days
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
                                    "Kalman, R. E. (1960). A New Approach to Linear Filtering.",
                                    "NIST SP 800-137. Information Security Continuous Monitoring.",
                                    "ISACA. (2019). COBIT 2019 Framework.",
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
