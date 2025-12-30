'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity, AlertTriangle, Zap,
    ArrowLeft, ChevronRight, Shield, Target,
    BarChart3, TrendingUp, Thermometer
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

// Phase states and critical points
const PHASE_STATES = [
    {
        name: "Paramagnetic (Disordered)",
        symbol: "T > T_c",
        state: "VULNERABLE",
        color: "rose",
        description: "High entropy. Nodes act independently. No coordinated defense. Attackers can traverse freely.",
        securityState: "Uncoordinated response. Each node makes individual decisions. No collective intelligence."
    },
    {
        name: "Critical Point",
        symbol: "T ≈ T_c",
        state: "TRANSITION",
        color: "amber",
        description: "Maximum susceptibility. Correlation length diverges. Small perturbations cascade globally.",
        securityState: "System at edge of chaos. Either order emerges or total collapse. Maximum leverage point."
    },
    {
        name: "Ferromagnetic (Ordered)",
        symbol: "T < T_c",
        state: "DEFENDED",
        color: "emerald",
        description: "Low entropy. Aligned security posture. Coordinated defense. Spontaneous order.",
        securityState: "Unified response. All nodes share threat intelligence. Collective immune system."
    }
];

const SOC_APPLICATIONS = [
    {
        title: "Critical Slowing Down Detection",
        equation: "\\tau \\propto |T - T_c|^{-1}",
        description: "Before phase transitions, system recovery time increases. Agent Blue monitors response latency as an early warning indicator.",
        metric: "Relaxation Time"
    },
    {
        title: "Susceptibility Monitoring",
        equation: "\\chi = \\frac{\\partial M}{\\partial B}",
        description: "Measures how easily the network 'flips' under external pressure. High susceptibility = high attack surface.",
        metric: "Flip Probability"
    },
    {
        title: "Correlation Length Analysis",
        equation: "\\xi \\propto |T - T_c|^{-\\nu}",
        description: "How far a local compromise spreads before dying out. At criticality, ξ → ∞ (global contagion).",
        metric: "Spread Radius"
    }
];

export default function IsingSocPage() {
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
                        <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-mono uppercase tracking-[0.3em]">
                            RSCH-14 // Complexity Theory
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6"
                    >
                        Ising <span className="text-emerald-400 italic font-light">SOC</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        Self-Organized Criticality in Security Operations Centers
                    </motion.p>

                    {/* Key Equation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 border border-white/10 rounded-2xl p-8 max-w-2xl"
                    >
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                            Ising Hamiltonian
                        </div>
                        <TypewriterEquation
                            equation="H = -J\\sum_{\\langle ij \\rangle} s_i s_j - B\\sum_i s_i"
                            className="text-2xl md:text-3xl text-cyan-400"
                            delay={0.5}
                        />
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-emerald-400 font-bold">J</div>
                                <div className="text-gray-500 text-xs">Coupling strength (trust/communication)</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-emerald-400 font-bold">B</div>
                                <div className="text-gray-500 text-xs">External field (policy enforcement)</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Abstract Section */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-emerald-400">#</span> Abstract
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        This capability applies the <strong className="text-white">Ising Model</strong> from statistical physics
                        to model security state transitions in complex organizations.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        Each network node is a "spin" that can be in state +1 (secure) or -1 (compromised). The collective
                        behavior exhibits <strong className="text-emerald-400">phase transitions</strong> between ordered
                        (defended) and disordered (vulnerable) states.
                    </p>

                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 mt-8">
                        <div className="flex items-start gap-4">
                            <Thermometer className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-white font-bold mb-2">The Temperature Metaphor</div>
                                <p className="text-gray-400 text-sm">
                                    "Temperature" T represents organizational entropy: communication breakdowns,
                                    distrust, conflicting policies. High T = chaos. Low T = coordination.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phase States */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">
                        <span className="text-emerald-400">#</span> Phase States
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {PHASE_STATES.map((phase, i) => (
                            <motion.div
                                key={phase.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-${phase.color}-500/10 border border-${phase.color}-500/20 rounded-2xl p-6`}
                            >
                                <div className={`text-xs font-mono text-${phase.color}-400 uppercase tracking-widest mb-2`}>
                                    {phase.state}
                                </div>
                                <div className={`text-2xl font-black text-${phase.color}-400 mb-2`}>
                                    {phase.name}
                                </div>
                                <div className="font-mono text-sm text-gray-500 mb-4">{phase.symbol}</div>
                                <p className="text-gray-400 text-sm mb-4">{phase.description}</p>
                                <div className="border-t border-white/10 pt-4">
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Security Interpretation</div>
                                    <p className="text-white text-xs">{phase.securityState}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOC Applications */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-emerald-400">#</span> SOC Applications
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                        The Ising model provides actionable metrics for Security Operations Centers
                        to predict and prevent phase transitions (collapses).
                    </p>

                    <div className="space-y-6">
                        {SOC_APPLICATIONS.map((app, i) => (
                            <motion.div
                                key={app.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-black/40 border border-white/10 rounded-2xl p-8"
                            >
                                <div className="grid md:grid-cols-3 gap-8 items-center">
                                    <div className="md:col-span-2">
                                        <h3 className="text-xl font-black text-white mb-3">{app.title}</h3>
                                        <p className="text-gray-400 text-sm">{app.description}</p>
                                        <div className="mt-3 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                                            Key Metric: {app.metric}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4">
                                        <TypewriterEquation
                                            equation={app.equation}
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

            {/* Agent Blue Integration */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-emerald-400">#</span> Agent Blue Integration
                    </h2>

                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-8">
                        <div className="flex items-start gap-4">
                            <Shield className="text-cyan-400 flex-shrink-0 mt-1" size={32} />
                            <div>
                                <h3 className="text-2xl font-black text-cyan-400 mb-4">Edge Coupling Control</h3>
                                <p className="text-gray-400 mb-6">
                                    Agent Blue operates at network edges to <strong className="text-white">modulate the coupling constant J</strong>.
                                    By increasing local coordination (trust flows, threat sharing), Agent Blue pushes the system
                                    toward the ordered phase without centralized command.
                                </p>
                                <div className="bg-black/40 rounded-xl p-4 mb-4">
                                    <TypewriterEquation
                                        equation="J_{eff} = J_0 + \\Delta J_{AgentBlue}"
                                        className="text-xl text-cyan-400"
                                        delay={0.3}
                                    />
                                </div>
                                <p className="text-gray-400 text-sm">
                                    When organizational temperature rises (crisis), Agent Blue increases local coupling
                                    to prevent phase transition into the disordered (compromised) state.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 mb-8">
                        <TypewriterEquation
                            equation="T_c = \\frac{2J}{k_B \\ln(1 + \\sqrt{2})}"
                            className="text-2xl md:text-3xl text-emerald-400 mb-6"
                            delay={0.3}
                        />
                        <p className="text-lg text-gray-400">
                            The critical temperature is a <strong className="text-white">design parameter</strong>.
                            AEON helps organizations raise T<sub>c</sub> so they remain ordered even under stress.
                        </p>
                    </div>
                </div>
            </section>

            {/* References */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                        <span className="text-emerald-400">#</span> References
                    </h2>
                    <div className="space-y-4 text-sm text-gray-400">
                        <p>
                            Ising, E. (1925). Beitrag zur Theorie des Ferromagnetismus.
                            <em className="text-gray-300"> Zeitschrift für Physik, 31</em>(1), 253-258.
                        </p>
                        <p>
                            Bak, P., Tang, C., & Wiesenfeld, K. (1987). Self-organized criticality.
                            <em className="text-gray-300"> Physical Review Letters, 59</em>(4), 381.
                        </p>
                        <p>
                            Sethna, J. P. (2006). <em className="text-gray-300">Statistical Mechanics: Entropy, Order Parameters, and Complexity</em>. Oxford University Press.
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
