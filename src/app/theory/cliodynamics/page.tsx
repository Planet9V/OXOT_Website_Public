"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, GitGraph, ShieldAlert, Key, Lock, Network } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function CliodynamicsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-900/10 rounded-full blur-[100px]" />
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
                            <span className="px-3 py-1 rounded bg-pink-500/10 border border-pink-500 text-pink-400 text-xs font-mono font-bold">
                                RSCH-11
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Cliodynamics <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-200">
                                in IAM
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Heterogeneous Graph Attention Networks for Zero Trust. Calculating the "Semantic Importance" of privilege escalation paths.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Meta-Path Analysis
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Attention Coefficients
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Silent Admin Detection
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
                            <GitGraph size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Semantic Attention
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-pink-500" />
                            <TypewriterEquation
                                equation="z_i^{\Phi} = \sigma \left( \sum_{j \in \mathcal{N}_i^{\Phi}} \alpha_{ij}^{\Phi} \cdot h_j \right)"
                                className="text-2xl md:text-3xl text-pink-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The embedding of user i is the attention-weighted sum of their actions, roles, and resource access, across all meta-paths."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">IAM Graph</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Detection</div>
                                <div className="text-sm font-bold text-pink-400">Silent Admin</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Result</div>
                                <div className="text-sm font-bold text-white">Privilege Revoked</div>
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
                                <Key className="text-pink-400" />
                                The Silent Admin Problem
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Traditional Role-Based Access Control (RBAC) only looks at direct assignment. It fails to detect "Silent Admins"—users
                                    who accumulate a chain of non-admin permissions that sum up to total control.
                                </p>
                                <p>
                                    AEON uses <strong>Heterogeneous Graph Attention Networks (HAN)</strong> to model the "flow of power".
                                    A user doesn't just "have" a role; they <em>attend</em> to a resource through a <strong>Meta-Path</strong>.
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Network className="text-oxot-gold" />
                                Differential Geometry of Privilege
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    By defining Meta-Paths (e.g., User $\to$ Group $\to$ Role $\to$ Resource), we compute the attention coefficient $\alpha&#123;ij&#125;$.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-pink-500">
                                    <TypewriterEquation
                                        equation="\text{Risk}(u) = \sum_{\Phi \in \text{Paths}} \beta_{\Phi} \cdot \| z_u^{\Phi} \|"
                                        className="text-pink-300"
                                    />
                                </div>
                                <p>
                                    High risk scores emerge not from broad access, but from access to <strong>semantically critical</strong> paths,
                                    even if the official role is low-level (e.g., "Contractor").
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Visualization Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <ShieldAlert size={16} /> Meta-Path Alert
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    High Attention Flow Detected
                                </div>
                                <div className="p-3 bg-black/40 rounded border border-white/5 font-mono text-xs space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="text-gray-500">Subject:</div>
                                        <div className="text-white">User: j_smith</div>
                                    </div>
                                    <div className="w-px h-2 bg-gray-600 ml-4"></div>
                                    <div className="flex items-center gap-2 pl-2 border-l-2 border-gray-600">
                                        <div className="text-gray-500">Path:</div>
                                        <div className="text-yellow-400">MemberOf -&gt; Group: Devs</div>
                                    </div>
                                    <div className="w-px h-2 bg-gray-600 ml-4"></div>
                                    <div className="flex items-center gap-2 pl-2 border-l-2 border-gray-600">
                                        <div className="text-gray-500">Path:</div>
                                        <div className="text-orange-400">Assumes -&gt; Role: Deployer</div>
                                    </div>
                                    <div className="w-px h-2 bg-gray-600 ml-4"></div>
                                    <div className="flex items-center gap-2 pl-2 border-l-2 border-gray-600">
                                        <div className="text-gray-500">Action:</div>
                                        <div className="text-red-500 font-bold">iam:PassRole (*)</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-red-400 font-bold uppercase tracking-wider">
                                        Risk Score: 0.98 (CRITICAL)
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
                                    "Wang, X. (2019). Heterogeneous Graph Attention Network.",
                                    "Zhang, C. (2019). Heterogeneous GNN.",
                                    "NIST (2020). Zero Trust Architecture.",
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
