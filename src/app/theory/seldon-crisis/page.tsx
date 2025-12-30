'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity, AlertTriangle, TrendingDown, Zap,
    ArrowLeft, ChevronRight, GitBranch, Shield,
    BarChart3, Radio, Target
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

// Crisis markers data
const CRISIS_MARKERS = [
    {
        name: "Critical Slowing Down",
        icon: <TrendingDown size={24} />,
        description: "Variance in system metrics (latency, CPU) increases before the crash. The system takes longer to recover from perturbations.",
        equation: "\\sigma^2(x) \\to \\infty \\text{ as } t \\to t_c",
        warning: "Rising variance = Pre-crisis indicator"
    },
    {
        name: "Decoupling",
        icon: <GitBranch size={24} />,
        description: "The correlation between the Dashboard (Imaginary) and the Logs (Real) drops to zero. This is the Psychotic Break of the organization.",
        equation: "C(Dashboard, Logs) \\to 0",
        warning: "When the map no longer describes the territory"
    },
    {
        name: "Percolation Threshold",
        icon: <Activity size={24} />,
        description: "When the percentage of compromised nodes exceeds the critical threshold, a giant connected component of 'Compromise' emerges.",
        equation: "p > p_c \\Rightarrow |C_{\\infty}| > 0",
        warning: "The infection becomes systemic"
    }
];

const PHASE_STATES = [
    { state: "Stable", symbol: "Lk = 1", color: "emerald", description: "All three registers linked. Symbolic order governs the Real." },
    { state: "Pre-Crisis", symbol: "C < 0.5", color: "amber", description: "Correlation dropping. Law losing grip on Territory." },
    { state: "Crisis", symbol: "Lk → 0", color: "rose", description: "The knot unlinks. Symbolic collapse imminent." }
];

export default function SeldonCrisisPage() {
    return (
        <div className="w-full min-h-screen bg-transparent text-white">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-8">
                {/* Back Link */}
                <Link
                    href="/theory"
                    className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-oxot-gold transition-colors text-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Applied Theory
                </Link>

                <div className="max-w-6xl mx-auto w-full">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-[10px] font-mono uppercase tracking-[0.3em]">
                            RSCH-09 // Phase Transitions
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6"
                    >
                        Seldon <span className="text-amber-400 italic font-light">Crisis</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        Analyzing Phase Transitions in Systemic Stability
                    </motion.p>

                    {/* Key Equations */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6"
                        >
                            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-3">
                                Stable State: The Knot
                            </div>
                            <TypewriterEquation
                                equation="Lk = 1"
                                className="text-2xl text-emerald-400"
                                delay={0.5}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6"
                        >
                            <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest mb-3">
                                Crisis State: The Unlink
                            </div>
                            <TypewriterEquation
                                equation="Lk = 0"
                                className="text-2xl text-rose-400"
                                delay={0.7}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Abstract Section */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> Abstract
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        This paper adapts the fictional concept of the <strong className="text-white">Seldon Crisis</strong> (Asimov's Foundation)
                        into a rigorous <strong className="text-amber-400">topological construct</strong> within the McKenney-Lacan framework.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        We define a Seldon Crisis not as a political event, but as a <strong className="text-white">Phase Transition</strong> where
                        the Borromean Knot unlinks (Lk → 0), causing the symbolic order (Governance/Compliance) to lose its grip on
                        the Real (Physics/Operations).
                    </p>

                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 mt-8">
                        <div className="flex items-start gap-4">
                            <Radio className="text-amber-400 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-white font-bold mb-2">From Foundation to Cybersecurity</div>
                                <p className="text-gray-400 text-sm">
                                    In Asimov's <em>Foundation</em>, a Seldon Crisis is a sociopolitical convergence where the "dead hand" of the past
                                    cannot control the present. In <strong className="text-white">AEON Cyber Psychohistory</strong>, a Crisis is when
                                    your governance policies no longer describe your actual security state.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phase Transition Model */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> The Phase Transition
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                        Using <strong className="text-white">Percolation Theory</strong>, we model the network as a lattice.
                        Let p be the percentage of nodes compromised (or "dead" / unpatchable).
                    </p>

                    <div className="bg-black/40 border border-white/10 rounded-2xl p-8 mb-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                                    Percolation Model
                                </div>
                                <TypewriterEquation
                                    equation="p < p_c \\Rightarrow \\text{Network Functions}"
                                    className="text-xl text-emerald-400 mb-4"
                                    delay={0.3}
                                />
                                <TypewriterEquation
                                    equation="p > p_c \\Rightarrow \\text{Symbolic Collapse}"
                                    className="text-xl text-rose-400"
                                    delay={0.5}
                                />
                            </div>
                            <div className="bg-white/5 rounded-xl p-6">
                                <div className="text-sm text-gray-400 space-y-3">
                                    <p><strong className="text-emerald-400">Below Threshold (p &lt; p<sub>c</sub>):</strong> The infinite cluster does not exist. The network functions normally.</p>
                                    <p><strong className="text-rose-400">Above Threshold (p &gt; p<sub>c</sub>):</strong> A giant connected component of "Compromise" emerges. The Symbolic Order collapses.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phase States */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {PHASE_STATES.map((phase, i) => (
                            <motion.div
                                key={phase.state}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-${phase.color}-500/10 border border-${phase.color}-500/20 rounded-2xl p-6`}
                            >
                                <div className={`text-3xl font-black text-${phase.color}-400 mb-2`}>
                                    {phase.state}
                                </div>
                                <div className="font-mono text-sm text-gray-500 mb-4">{phase.symbol}</div>
                                <p className="text-gray-400 text-sm">{phase.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Crisis Markers */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
                        <span className="text-amber-400">#</span> Detecting the Crisis
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                        The Seldon Crisis is preceded by specific <strong className="text-white">early warning signals</strong>.
                        These are mathematically predictable markers of impending phase transition.
                    </p>

                    <div className="space-y-6">
                        {CRISIS_MARKERS.map((marker, i) => (
                            <motion.div
                                key={marker.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-black/40 border border-white/10 rounded-2xl p-8"
                            >
                                <div className="grid md:grid-cols-3 gap-8 items-start">
                                    {/* Left: Title & Description */}
                                    <div className="md:col-span-2">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                                                {marker.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-white">{marker.name}</h3>
                                                <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                                                    {marker.warning}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm">{marker.description}</p>
                                    </div>

                                    {/* Right: Equation */}
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                                            Mathematical Signature
                                        </div>
                                        <TypewriterEquation
                                            equation={marker.equation}
                                            className="text-lg text-cyan-400"
                                            delay={0.2}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AEON Core Application */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> AEON Core: The Foundation Module
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Correlation Monitor */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart3 className="text-cyan-400" size={24} />
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    Correlation Monitoring
                                </span>
                            </div>

                            <p className="text-gray-400 mb-6">
                                AEON monitors the <strong className="text-white">Correlation Coefficient</strong> between Strategy and Reality.
                            </p>

                            <div className="bg-white/5 rounded-xl p-6 mb-6">
                                <TypewriterEquation
                                    equation="C(Strategy, Reality)"
                                    className="text-2xl text-cyan-400"
                                    delay={0.3}
                                />
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-gray-400">C &gt; 0.8 → Normal operations</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span className="text-gray-400">C ∈ [0.5, 0.8] → Warning state</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                    <span className="text-gray-400">C &lt; 0.5 → Pre-Crisis state</span>
                                </div>
                            </div>
                        </div>

                        {/* Edge Sovereignty */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="text-rose-400" size={24} />
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    Edge Sovereignty Protocol
                                </span>
                            </div>

                            <p className="text-gray-400 mb-6">
                                When the "Law" (Symbolic) no longer describes the "Territory" (Real),
                                <strong className="text-rose-400"> Agent Blue takes autonomous action</strong>.
                            </p>

                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6">
                                <div className="text-white font-bold mb-3">Hard Reset Protocol</div>
                                <p className="text-gray-400 text-sm mb-4">
                                    Agent Blue forces a "Hard Reset" of the local truth, bypassing the corrupted central command if necessary.
                                </p>
                                <div className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                                    This is Edge Sovereignty in action.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> Conclusion
                    </h2>

                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        A Seldon Crisis is <strong className="text-white">inevitable</strong> in any complex system
                        as entropy increases (S → ∞).
                    </p>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 mb-8">
                        <p className="text-lg text-white">
                            AEON does not prevent change; it manages the <strong className="text-amber-400">transition</strong> to
                            a new topological stability, ensuring the organization survives the collapse of its old symbolic order.
                        </p>
                    </div>
                </div>
            </section>

            {/* References */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> References
                    </h2>
                    <div className="space-y-4 text-sm text-gray-400">
                        <p>
                            Asimov, I. (1951). <em className="text-gray-300">Foundation</em>.
                        </p>
                        <p>
                            Scheffer, M., et al. (2009). Early-warning signals for critical transitions.
                            <em className="text-gray-300"> Nature</em>.
                        </p>
                        <p>
                            Lacan, J. (1953). The Symbolic, the Imaginary, and the Real.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/theory"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-oxot-gold text-black font-bold uppercase tracking-widest rounded-xl hover:bg-oxot-gold/80 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Return to Applied Theory Hub
                    </Link>
                </div>
            </section>
        </div>
    );
}
