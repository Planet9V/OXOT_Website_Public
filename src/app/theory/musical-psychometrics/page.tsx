'use client';

import React from 'react';
import Link from 'next/link';
import {
    Music, Shield, Zap, Activity, Mic2,
    ArrowLeft, Radio, Layout, Terminal,
    Info, Cpu, BarChart3, Layers, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MPNChatEngine } from '@/components/MPNChatEngine';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function MusicalPsychometricsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[10%] w-[60%] h-[60%] bg-teal-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[100px]" />

                {/* Floating Musical Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-px h-12 bg-gradient-to-t from-transparent via-teal-500/20 to-transparent"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded bg-teal-500/10 border border-teal-500 text-teal-400 text-xs font-mono font-bold">
                                RSCH-39
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Musical <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-200">
                                Psychometrics
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            The sonification of security state. Listening to the "hum" of the network to detect dissonance before the crash.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Seldon Crisis Detection
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Neo-Riemannian Theory
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Ambient Awareness
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
                            <Headphones size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Score Header
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative font-mono text-sm leading-relaxed">
                            <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
                            <div className="text-teal-400 mb-2">SCORE: AEON_SOC_MAIN</div>
                            <div className="text-gray-400">CLEF: ♮ Ops Floor (Normal)</div>
                            <div className="text-gray-400">KEY:  G Major (Compliance-First)</div>
                            <div className="text-gray-400">TIME: 4/4 (Hourly OODA)</div>
                            <div className="text-gray-400">TEMPO: 92 BPM (Andante)</div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 w-full">
                                <Activity size={24} className="text-teal-400" />
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase">Detection</div>
                                    <div className="text-sm text-white font-bold">Ear &gt; Eye</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* INTERACTIVE DEMO SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px bg-teal-500/50 flex-1" />
                        <span className="text-teal-400 font-mono text-xs uppercase tracking-widest border border-teal-500/30 px-3 py-1 rounded bg-teal-500/10">
                            Interactive Application
                        </span>
                        <div className="h-px bg-teal-500/50 flex-1" />
                    </div>
                    <MPNChatEngine />
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Left Column: Core Theory */}
                    <div className="md:col-span-2 space-y-16">

                        {/* Section 1 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Radio className="text-teal-400" />
                                Why Sonification?
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Visual dashboards lead to fatigue and "blindness". The human auditory cortex, however, is a massive
                                    pattern recognition engine optimized for detecting anomalies (a twig snapping in the woods) while background processing.
                                </p>
                                <p>
                                    <strong>Musical Psychometric Notation (MPN)</strong> converts the abstract state of the organization—its people,
                                    processes, and technology—into a continuous musical score.
                                </p>
                            </div>
                        </section>

                        {/* Theory Section 1: Symphonic Calculus */}
                        <section>
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <span className="text-teal-400">01</span> The Symphonic Calculus
                            </h2>
                            <div className="prose prose-invert max-w-none space-y-6 text-gray-400 font-light leading-relaxed">
                                <p>
                                    Musical Psychometric Notation (MPN) treats the organization as a resonant cavity. Every interaction—Slack messages, git commits, SOC alerts—is a "note" triggered on the staff of the Symbolic Order.
                                </p>
                                <div className="p-8 bg-teal-900/10 border border-teal-500/20 rounded-3xl my-8">
                                    <TypewriterEquation
                                        equation="D_{ij}(t) = || \mathbf{B}_i(t) - \mathbf{B}_j(t) ||^2 + \gamma \frac{d}{dt}(\mathbf{B}_i \cdot \mathbf{B}_j)"
                                        className="text-teal-300"
                                    />
                                    <p className="text-[10px] uppercase tracking-widest text-teal-500/50 mt-4 text-center">
                                        Equation 39.1: The Dissonance Function D(t)
                                    </p>
                                </div>
                                <p>
                                    By computing the dissonance between actor vectors {"\\( \\mathbf{B} \\)"}, we can hear the transition from consonance (alignment) to cluster-chord noise (Seldon Crisis).
                                </p>
                            </div>
                        </section>

                        {/* Theory Section 2: Lacanian Registers */}
                        <section>
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                <span className="text-teal-400">02</span> Neo-Riemannian Registers
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    {
                                        title: "The Symbolic (S)",
                                        op: "R Transformation",
                                        desc: "Law, protocol, and the formal structure of the SOC. Consonant and predictable.",
                                        icon: <Shield className="text-teal-400" size={20} />
                                    },
                                    {
                                        title: "The Imaginary (I)",
                                        op: "L Transformation",
                                        desc: "Interfaces, personas, and the ego-driven perception of security state.",
                                        icon: <Layout className="text-cyan-400" size={20} />
                                    },
                                    {
                                        title: "The Real (R)",
                                        op: "P Transformation",
                                        desc: "Trauma, the intrusion of the unrepresented. Dissonant shifts into the minor mode.",
                                        icon: <Zap className="text-red-400" size={20} />
                                    }
                                ].map((reg, i) => (
                                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-teal-500/30 transition-all">
                                        <div className="mb-4">{reg.icon}</div>
                                        <h4 className="text-sm font-black uppercase mb-1 tracking-tight">{reg.title}</h4>
                                        <div className="text-[10px] font-mono text-teal-400 uppercase mb-4">{reg.op}</div>
                                        <p className="text-xs text-gray-500 leading-relaxed font-light">{reg.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Music className="text-oxot-gold" />
                                The Harmonic System
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    We map organizational states to musical theory concepts:
                                </p>
                                <ul className="list-none space-y-4 pl-0">
                                    <li className="flex gap-4">
                                        <span className="text-teal-400 font-bold w-24">Clef</span>
                                        <span>Defines context. War Room (♯), Boardroom (♭), Ops Floor (♮).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-teal-400 font-bold w-24">Key</span>
                                        <span>Security Culture. C Major (Zero Trust), F Major (Risk Tolerant).</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-teal-400 font-bold w-24">Dissonance</span>
                                        <span>Psychological friction. Measures stress and conflict.</span>
                                    </li>
                                </ul>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-teal-500 mt-6">
                                    <TypewriterEquation
                                        equation="\text{Crisis} = \exists t : D_{group}(t) > \theta_D \land \alpha(t) > \theta_{\alpha}"
                                        className="text-teal-300"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Seldon Crisis */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Mic2 className="text-red-400" />
                                Early Warning System
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    A <strong>Seldon Crisis</strong> (systemic collapse) is rarely silent. It is preceded by a "harmonic breakdown."
                                    MPN detects this via <strong>Neo-Riemannian transformations</strong>. A shift from Relative (R) motions to Parallel (P)
                                    motions often signals trauma.
                                </p>
                                <p>
                                    Retrospective analysis shows MPN dissonance provides an average <strong>22-minute lead time</strong> before a cascade onset.
                                    "When the music sounds wrong, something IS wrong."
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Audio Player Widget (Mock) */}
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-teal-500/10 transition-colors" />

                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping" />
                                AEON Symphonic Feed
                            </h3>

                            <div className="space-y-6">
                                <div className="h-20 bg-black/40 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                                    {/* Waveform Animation */}
                                    <div className="absolute inset-x-4 flex items-center justify-center gap-1 opacity-60">
                                        {[...Array(24)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-gradient-to-t from-teal-600 to-teal-400 rounded-full"
                                                animate={{
                                                    height: [`${20 + Math.random() * 40}%`, `${40 + Math.random() * 50}%`, `${20 + Math.random() * 40}%`]
                                                }}
                                                transition={{
                                                    duration: 0.5 + Math.random(),
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Dissonance</div>
                                        <div className="text-sm text-white font-mono">0.024 Hz</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="text-[10px] text-teal-500/50 uppercase tracking-widest mb-1">Status</div>
                                        <div className="text-sm text-teal-400 font-bold font-mono">STABLE</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-2">
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-1 h-1 rounded-full bg-teal-500/30" />
                                        ))}
                                    </div>
                                    <div className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Buffer: 98% Synchronized</div>
                                </div>
                            </div>
                        </div>

                        {/* References */}
                        <div className="p-8 rounded-3xl bg-black/40 border border-white/10">
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 font-mono">
                                Theory Repository
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    { author: "McKenney, J.", year: 2025, title: "Symphonic Calculus" },
                                    { author: "Cohn, R.", year: 1998, title: "Neo-Riemannian Theory" },
                                    { author: "Kramer, G.", year: 1994, title: "Auditory Display" },
                                ].map((ref, i) => (
                                    <li key={i} className="group cursor-default">
                                        <div className="text-[10px] text-gray-500 font-mono mb-1">{ref.author} ({ref.year})</div>
                                        <div className="text-xs text-gray-300 group-hover:text-oxot-gold transition-colors font-bold uppercase tracking-tight">{ref.title}</div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <Link href="#" className="text-[10px] text-teal-400 hover:text-white transition-colors uppercase font-bold tracking-[0.2em] flex items-center gap-2">
                                    Download Whitepaper <ArrowLeft size={10} className="rotate-180" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
