"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Fingerprint, Layers, ShieldCheck } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function HoneypotAvatarPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[100px]" />
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
                                RSCH-23
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Honeypot <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-200">
                                Avatar
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Deterministic attribution via Identity Manifold Expansion. We don't predict who will attack; we force them to attack a clone.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Behavioral Cloning
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Identity Manifold
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Attribution
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
                            <UserPlus size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Detection Probability
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
                            <TypewriterEquation
                                equation="P(\text{detect}) \to 1 - \frac{1}{N+1}"
                                className="text-2xl md:text-3xl text-violet-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "If we create N=100 perfect clones of a high-value target, the attacker has only a 0.99% chance of hitting the real one."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Clones</div>
                                <div className="text-sm font-bold text-white">100</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Attribution</div>
                                <div className="text-sm font-bold text-violet-400">99.01%</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Base</div>
                                <div className="text-sm font-bold text-white">Determ.</div>
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
                                <Layers className="text-violet-400" />
                                The Identity Manifold
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    UBA (User Behavior Analytics) is a losing game because distinguishing a user from noise is hard ("Needle in a Haystack").
                                    Honeypot Avatar Theory inverts this.
                                </p>
                                <p>
                                    We expand the **Identity Manifold** $\mathcal&#123;M&#125;_i = \{`{`}u_i{`}`} \cup A_i$. We create 100 fake versions of your CEO.
                                    They have valid credentials, network presence, and even behave like the CEO (via generative AI).
                                </p>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Fingerprint className="text-oxot-gold" />
                                Controlled Revelation
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    The attacker cannot distinguish the real user from the avatars. But we can.
                                    Any interaction with an Avatar is, by definition, an attack. We move from **Probabilistic Prediction** (guessing) to
                                    **Deterministic Attribution** (knowing).
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-violet-500">
                                    <p className="font-mono text-sm text-violet-300">
                                        "A near-perfect trap. The noise becomes the signal."
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Avatar Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <ShieldCheck size={16} /> Avatar Status
                            </h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-4 gap-2">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className={`w-full aspect-square rounded border ${i === 7 ? 'bg-green-500 border-green-400' : 'bg-violet-900/30 border-violet-500/30'}`} title={i === 7 ? "Real Identity" : "Avatar"} />
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Target</span>
                                        <span className="text-white font-mono">CEO</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Active Avatars</span>
                                        <span className="text-violet-400 font-mono">15</span>
                                    </div>
                                </div>
                                <div className="text-center pt-2">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                                        Behavioral Cloning Active
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
                                    "Shannon, C. E. (1948). Information-Theoretic Traps.",
                                    "Pomerleau, D. (1991). Behavioral Cloning.",
                                    "Zhuang & Bier. (2011). Deception Game Theory.",
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
