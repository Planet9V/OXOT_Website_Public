'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Atom, Sigma, GitMerge, Database,
    ArrowLeft, ChevronRight, Shield, Zap,
    Layers, Network, Activity, Lock
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

// The Seven Axioms
const AXIOMS = [
    {
        name: "Holevo Bound",
        equation: "I_{acc} \\le \\chi = S(\\bar{\\rho}) - \\sum_x p_x S(\\rho_x)",
        description: "Maximum classical information an attacker can extract is bounded by the Holevo quantity.",
        domain: "Quantum Information",
        application: "Fundamental limit on intelligence extraction"
    },
    {
        name: "Jarzynski Equality",
        equation: "\\langle e^{-\\beta W_{detect}} \\rangle = e^{-\\beta \\Delta F}",
        description: "Thermodynamic work cost of intrusion detection equals free energy difference between Ignorance and Awareness.",
        domain: "Non-Eq Thermodynamics",
        application: "Detection has an energy cost"
    },
    {
        name: "Fisher Metric",
        equation: "g_{ij}(\\theta) = \\mathbb{E}[\\partial_i \\ell \\cdot \\partial_j \\ell]",
        description: "Attack distribution manifold has curvature given by Fisher Information.",
        domain: "Information Geometry",
        application: "Natural gradient for defense optimization"
    },
    {
        name: "Wasserstein Bound",
        equation: "W_2(p_{benign}, p_{attack})^2 \\ge 2 \\Delta F_{defense}",
        description: "Cost of transporting from benign to attacked distribution bounds defense effort.",
        domain: "Optimal Transport",
        application: "Minimum defense investment"
    },
    {
        name: "Persistent Homology",
        equation: "\\beta_k = \\text{rank}(H_k(X))",
        description: "Betti numbers track topological invariants. DDoS loops manifest as β₁ spikes.",
        domain: "Algebraic Topology",
        application: "Attack pattern detection"
    },
    {
        name: "Sheaf Cohomology",
        equation: "H^1(X, \\mathcal{F}) \\ne 0",
        description: "Inconsistent local states obstruct global gluing. Mathematical definition of Byzantine Fault.",
        domain: "Category Theory",
        application: "Distributed system failure analysis"
    },
    {
        name: "Univalence",
        equation: "(A \\simeq B) \\simeq (A = B)",
        description: "Two security configurations are equivalent iff they are homotopy equivalent.",
        domain: "Homotopy Type Theory",
        application: "Configuration equivalence testing"
    }
];

export default function GrandUnificationPage() {
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
                        <span className="px-4 py-2 bg-white/10 border border-white/30 rounded-full text-white text-[10px] font-mono uppercase tracking-[0.3em]">
                            RSCH-19 // Architecture & Integration
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
                    >
                        Grand <span className="text-oxot-gold italic font-light">Unification</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        Quantum Information, Non-Equilibrium Thermodynamics, and Algebraic Topology — Unified
                    </motion.p>

                    {/* Master Equation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 border border-oxot-gold/30 rounded-2xl p-8 max-w-3xl"
                    >
                        <div className="text-[10px] font-mono text-oxot-gold uppercase tracking-widest mb-4">
                            The Master Equation (Lindblad Evolution)
                        </div>
                        <TypewriterEquation
                            equation="\\frac{d\\rho}{dt} = -i[H_{Blue}, \\rho] + \\mathcal{L}_{Red}[\\rho]"
                            className="text-2xl md:text-3xl text-cyan-400"
                            delay={0.5}
                        />
                        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-cyan-400 font-bold">ρ</div>
                                <div className="text-gray-500 text-xs">Network State</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-cyan-400 font-bold">H<sub>Blue</sub></div>
                                <div className="text-gray-500 text-xs">Defense Hamiltonian</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-rose-400 font-bold">ℒ<sub>Red</sub></div>
                                <div className="text-gray-500 text-xs">Attack Lindbladian</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Abstract Section */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> Abstract
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        The <strong className="text-white">Grand Unified Theory (GUT)</strong> of Cybersecurity synthesizes
                        seven mathematical frameworks developed by a 6-expert panel over 10 recursive deliberation rounds.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        This theory formalizes AEON Core "Psychohistory" by demonstrating that cybersecurity is not an
                        engineering problem but a <strong className="text-oxot-gold">Physical Law</strong>, governed by:
                    </p>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-center gap-3">
                            <ChevronRight className="text-oxot-gold flex-shrink-0" size={16} />
                            <span><strong className="text-white">Information-theoretic bounds</strong> (Holevo, Shannon)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <ChevronRight className="text-oxot-gold flex-shrink-0" size={16} />
                            <span><strong className="text-white">Thermodynamic constraints</strong> (Jarzynski, Landauer)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <ChevronRight className="text-oxot-gold flex-shrink-0" size={16} />
                            <span><strong className="text-white">Topological invariants</strong> (Persistent Homology, Sheaves)</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* The Seven Axioms */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-oxot-gold/5 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">
                        <span className="text-oxot-gold">#</span> The Seven Axioms
                    </h2>

                    <div className="space-y-6">
                        {AXIOMS.map((axiom, i) => (
                            <motion.div
                                key={axiom.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-black/40 border border-white/10 rounded-2xl p-6"
                            >
                                <div className="grid md:grid-cols-3 gap-6 items-start">
                                    <div className="md:col-span-2">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="w-8 h-8 bg-oxot-gold/20 rounded-full flex items-center justify-center text-oxot-gold font-bold text-sm">
                                                {i + 1}
                                            </span>
                                            <h3 className="text-xl font-black text-white">{axiom.name}</h3>
                                            <span className="text-[10px] font-mono text-gray-500 uppercase bg-white/5 px-2 py-1 rounded">
                                                {axiom.domain}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{axiom.description}</p>
                                        <div className="text-[10px] font-mono text-oxot-gold uppercase tracking-widest">
                                            Application: {axiom.application}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4">
                                        <TypewriterEquation
                                            equation={axiom.equation}
                                            className="text-sm text-cyan-400"
                                            delay={0.1}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Fundamental Theorem */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> The Fundamental Theorem
                    </h2>

                    <div className="bg-oxot-gold/10 border border-oxot-gold/30 rounded-2xl p-8 mb-8">
                        <div className="text-[10px] font-mono text-oxot-gold uppercase tracking-widest mb-4">
                            Theorem (Thermodynamic Impossibility)
                        </div>
                        <p className="text-xl text-white mb-6">
                            "Total Security" is thermodynamically impossible (ΔF {">"} 0)
                        </p>
                        <div className="text-gray-400">
                            But the defense can:
                        </div>
                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                            <div className="bg-black/40 rounded-xl p-4">
                                <TypewriterEquation
                                    equation="\\chi \\to 0"
                                    className="text-xl text-cyan-400 mb-2"
                                    delay={0.3}
                                />
                                <div className="text-gray-500 text-xs">Minimize Holevo capacity</div>
                            </div>
                            <div className="bg-black/40 rounded-xl p-4">
                                <TypewriterEquation
                                    equation="W_2 \\to \\infty"
                                    className="text-xl text-cyan-400 mb-2"
                                    delay={0.5}
                                />
                                <div className="text-gray-500 text-xs">Maximize Wasserstein transport cost</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nash Equilibrium */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> Steady State = Nash Equilibrium
                    </h2>

                    <div className="bg-black/60 border border-white/10 rounded-2xl p-8">
                        <p className="text-gray-400 mb-6">
                            The Master Equation's steady state <strong className="text-white">ρ<sub>∞</sub></strong> represents
                            the <strong className="text-oxot-gold">Nash Equilibrium</strong> of the attacker-defender game:
                        </p>
                        <div className="bg-white/5 rounded-xl p-6 mb-6">
                            <TypewriterEquation
                                equation="\\frac{d\\rho_\\infty}{dt} = 0 \\Rightarrow [H_{Blue}, \\rho_\\infty] = i\\mathcal{L}_{Red}[\\rho_\\infty]"
                                className="text-xl text-cyan-400"
                                delay={0.3}
                            />
                        </div>
                        <p className="text-gray-400 text-sm">
                            At equilibrium, the coherent defense (Hamiltonian) perfectly balances the
                            incoherent attack (Lindbladian). Neither player can unilaterally improve.
                        </p>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                        <Atom className="mx-auto text-oxot-gold mb-4" size={48} />
                        <p className="text-xl text-white">
                            Cybersecurity obeys <strong className="text-oxot-gold">physical laws</strong>.
                        </p>
                        <p className="text-gray-400 mt-4">
                            Stop treating it as an engineering problem. Start treating it as applied physics.
                        </p>
                    </div>
                </div>
            </section>

            {/* References */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> References
                    </h2>
                    <div className="space-y-4 text-sm text-gray-400">
                        <p>
                            Holevo, A. S. (1973). Bounds for the quantity of information transmitted by a quantum communication channel.
                            <em className="text-gray-300"> Problemy Peredachi Informatsii, 9</em>(3), 3-11.
                        </p>
                        <p>
                            Jarzynski, C. (1997). Nonequilibrium equality for free energy differences.
                            <em className="text-gray-300"> Physical Review Letters, 78</em>(14), 2690.
                        </p>
                        <p>
                            Amari, S., & Nagaoka, H. (2000). <em className="text-gray-300">Methods of Information Geometry</em>. AMS.
                        </p>
                        <p>
                            Ghrist, R. (2014). <em className="text-gray-300">Elementary Applied Topology</em>. Createspace.
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
