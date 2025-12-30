"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Target, EyeOff, Diamond, Lock } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function ObjectPetitAPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] bg-rose-900/10 rounded-full blur-[100px]" />
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
                                RSCH-10
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Object <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-200">
                                Petit a
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            The mathematical necessity of the missing piece. Why "Total Security" is a fantasy, and how to weaponize the lack.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Lacanian Topology
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Honeypot Theory
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                The Void
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
                            <EyeOff size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            The Formula of Fantasy
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-pink-500" />
                            <TypewriterEquation
                                equation="\$ \diamond a"
                                className="text-4xl md:text-5xl text-pink-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "The Barred Subject (The CISO) is defined by their relationship to the Object Cause (a) - the concept of Zero Breach that can never be attained."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Input</div>
                                <div className="text-sm font-bold text-white">Desire for Safety</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Reality</div>
                                <div className="text-sm font-bold text-pink-400">The Gap (a)</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Response</div>
                                <div className="text-sm font-bold text-white">Neurosis vs. Cure</div>
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
                                <Lock className="text-pink-400" />
                                The Impossibility of Closure
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Cybersecurity is driven by a neurotic pursuit of a perfect state ($\mathcal&#123;O&#125;$) where no breaches occur.
                                    Lacan teaches us that this state is a fantasy. The "remainder" of the security equation—the breach that *must* happen for the system to exist—is the **Object petit a**.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-pink-500">
                                    <TypewriterEquation
                                        equation="S \cup T \neq U"
                                        className="text-pink-300"
                                    />
                                    <p className="mt-2 text-sm text-gray-400">
                                        System (S) + Threat (T) does not equal the Universe (U). There is always a remainder.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Target className="text-oxot-gold" />
                                Weaponizing the Lack
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Instead of trying to fill the hole (which is infinite), AEON **secures the rim of the hole**.
                                    We use Honeypots as decoy objects that mimic $a$. The attacker is drawn to the "passwords.xlsx" file precisely because
                                    it represents the object of their desire.
                                </p>
                                <p>
                                    By defining *where* the lack is, we control the vector of attack.
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Topology Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Diamond size={16} /> Lacanian Topology
                            </h3>
                            <div className="space-y-4">
                                <div className="relative h-40 bg-black/40 rounded border border-white/5 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        {/* Abstract representation of a torus or hole */}
                                        <div className="w-32 h-32 rounded-full border-4 border-pink-500 blur-sm"></div>
                                        <div className="absolute w-16 h-16 rounded-full border-2 border-white blur-md"></div>
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <div className="text-2xl font-black text-white">VOID</div>
                                        <div className="text-xs text-pink-400 font-mono">Object a</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Total Surface</span>
                                        <span className="text-white font-mono">Finite</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Hole Center</span>
                                        <span className="text-pink-400 font-mono">Unreachable</span>
                                    </div>
                                </div>
                                <div className="text-center pt-2">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                                        Topological Structure: Torus
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
                                    "Lacan, J. (1964). The Four Fundamental Concepts.",
                                    "Zizek, S. (1989). The Sublime Object of Ideology.",
                                    "Schneier, B. (2000). Secrets and Lies.",
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
