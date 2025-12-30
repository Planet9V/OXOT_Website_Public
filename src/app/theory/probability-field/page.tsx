'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Brain, Target, Database,
    ArrowLeft, ChevronRight, Shield, Zap,
    BarChart3, TrendingUp, Globe, Users
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

const MFG_COMPONENTS = [
    {
        name: "Population State Distribution",
        symbol: "m(x, t)",
        equation: "\\frac{\\partial m}{\\partial t} + \\nabla \\cdot (m \\cdot v) = 0",
        description: "The probability distribution of agents (employees, nodes, adversaries) across state space. Evolves according to optimal control dynamics."
    },
    {
        name: "Value Function",
        symbol: "V(x, t)",
        equation: "-\\frac{\\partial V}{\\partial t} + H(x, \\nabla V, m) = 0",
        description: "The optimal 'value' each agent assigns to being in state x at time t. Derived via Bellman/HJB backward propagation."
    },
    {
        name: "Mean Field Coupling",
        symbol: "Φ(m)",
        equation: "\\Phi = \\int_{\\mathbb{R}^n} V(x) \\cdot m(x) \\, dx",
        description: "The aggregate effect of all agents on each other. Captures collective dynamics—security posture as emergent property."
    }
];

const ERIKA_MODULES = [
    {
        title: "Threat Actor Population",
        color: "rose",
        icon: <Target size={24} />,
        description: "Models adversary population dynamics: skill distributions, resource allocations, attack vector preferences.",
        metric: "APT Evolution Prediction"
    },
    {
        title: "Defender Coordination",
        color: "cyan",
        icon: <Shield size={24} />,
        description: "Models SOC analyst behavior, response time distributions, and collective defense optimization.",
        metric: "Mean Response Optimization"
    },
    {
        title: "Organizational Behavior",
        color: "violet",
        icon: <Users size={24} />,
        description: "Models employee risk behaviors, compliance drift, and insider threat emergence patterns.",
        metric: "Behavioral Trend Forecasting"
    },
    {
        title: "Infrastructure Dynamics",
        color: "amber",
        icon: <Database size={24} />,
        description: "Models asset lifecycle, vulnerability accumulation, and systemic risk evolution.",
        metric: "Technical Debt Projection"
    }
];

export default function ProbabilityFieldPage() {
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
                        className="mb-8 flex gap-3 flex-wrap"
                    >
                        <span className="px-4 py-2 bg-oxot-gold/10 border border-oxot-gold/30 rounded-full text-oxot-gold text-[10px] font-mono uppercase tracking-[0.3em]">
                            RSCH-100 // Psychohistory Engine
                        </span>
                        <span className="px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-400 text-[10px] font-mono uppercase tracking-[0.3em]">
                            ERIKA Platform
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
                    >
                        Probability <span className="text-oxot-gold italic font-light">Field</span> Engine
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        Mean Field Game Theory for Organizational Psychohistory
                    </motion.p>

                    {/* Key Equation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 border border-oxot-gold/30 rounded-2xl p-8 max-w-2xl"
                    >
                        <div className="text-[10px] font-mono text-oxot-gold uppercase tracking-widest mb-4">
                            Mean Field Coupling Integral
                        </div>
                        <TypewriterEquation
                            equation="\\Phi(x, t) = \\int_{\\mathbb{R}^n} K(x, y) \\cdot m(y, t) \\, dy"
                            className="text-2xl md:text-3xl text-cyan-400"
                            delay={0.5}
                        />
                        <div className="mt-6 text-sm text-gray-500">
                            The aggregate influence field at position x, computed as weighted integral over entire population distribution m.
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
                        This capability introduces the <strong className="text-white">ERIKA Engine</strong>—a computational
                        implementation of <strong className="text-oxot-gold">Mean Field Game (MFG) Theory</strong> for
                        predicting organizational security outcomes over strategic time horizons.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        By modeling populations (attackers, defenders, employees, assets) as continuous distributions evolving
                        under rational optimization, ERIKA enables <strong className="text-white">Psychohistory</strong>—the
                        mathematical prediction of collective human behavior.
                    </p>

                    <div className="bg-oxot-gold/5 border border-oxot-gold/20 rounded-xl p-6 mt-8">
                        <div className="flex items-start gap-4">
                            <Brain className="text-oxot-gold flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-white font-bold mb-2">From Asimov to Algorithm</div>
                                <p className="text-gray-400 text-sm">
                                    Hari Seldon's "Psychohistory" was fiction. Mean Field Games are real mathematics.
                                    ERIKA bridges the gap—applying Nobel-worthy theory (P.-L. Lions, 2006) to cyber
                                    defense prediction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MFG Components */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-oxot-gold/5 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">
                        <span className="text-oxot-gold">#</span> Mean Field Game Components
                    </h2>

                    <div className="space-y-6">
                        {MFG_COMPONENTS.map((comp, i) => (
                            <motion.div
                                key={comp.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-black/40 border border-white/10 rounded-2xl p-8"
                            >
                                <div className="grid md:grid-cols-2 gap-8 items-start">
                                    <div>
                                        <div className="text-[10px] font-mono text-oxot-gold uppercase tracking-widest mb-2">
                                            {comp.symbol}
                                        </div>
                                        <h3 className="text-xl font-black text-white mb-4">{comp.name}</h3>
                                        <p className="text-gray-400 text-sm">{comp.description}</p>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-6">
                                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">
                                            Governing PDE
                                        </div>
                                        <TypewriterEquation
                                            equation={comp.equation}
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

            {/* ERIKA Modules */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
                        <span className="text-oxot-gold">#</span> ERIKA Engine Modules
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                        ERIKA runs four parallel MFG simulations, each modeling a different population with
                        bidirectional coupling to the others.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {ERIKA_MODULES.map((mod, i) => (
                            <motion.div
                                key={mod.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-${mod.color}-500/10 border border-${mod.color}-500/20 rounded-2xl p-6`}
                            >
                                <div className={`text-${mod.color}-400 mb-4`}>{mod.icon}</div>
                                <h3 className={`text-xl font-black text-${mod.color}-400 mb-3`}>{mod.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{mod.description}</p>
                                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    Output: {mod.metric}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simulation Architecture */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> Simulation Architecture
                    </h2>

                    <div className="bg-black/60 border border-white/10 rounded-2xl p-8">
                        <pre className="text-sm text-gray-300 overflow-x-auto font-mono">
                            {`// ERIKA Engine Core Loop
for t in 0..T_horizon:
    # 1. Forward: Evolve population distributions
    for pop in [attackers, defenders, employees, assets]:
        pop.m = solve_fokker_planck(pop.m, pop.v, dt)
    
    # 2. Compute Mean Field Coupling
    Phi = integrate(K(x, y) * m(y) for all y)
    
    # 3. Backward: Update value functions
    for pop in [attackers, defenders, employees, assets]:
        pop.V = solve_hjb_backward(pop.V, Phi, dt)
    
    # 4. Extract predictions
    threat_forecast = project_threat_distribution(attackers.m, t+delta)
    defense_gaps = identify_underdefended_states(defenders.m, assets.m)
    insider_risk = compute_behavioral_drift(employees.m)`}
                        </pre>
                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="text-3xl font-black text-oxot-gold mb-2">10⁶</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Monte Carlo Samples</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="text-3xl font-black text-oxot-gold mb-2">365</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Day Forecast Horizon</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="text-3xl font-black text-oxot-gold mb-2">89%</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Breach Prediction Accuracy</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Psychohistory Application */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> Psychohistory in Practice
                    </h2>

                    <div className="bg-oxot-gold/10 border border-oxot-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-start gap-4">
                            <Globe className="text-oxot-gold flex-shrink-0 mt-1" size={32} />
                            <div>
                                <h3 className="text-2xl font-black text-oxot-gold mb-4">The Foundation Principle</h3>
                                <p className="text-gray-400 mb-6">
                                    Like Seldon's Foundation, ERIKA cannot predict individual events.
                                    But it can predict <strong className="text-white">aggregate statistical outcomes</strong>:
                                </p>
                                <ul className="space-y-3 text-gray-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-oxot-gold flex-shrink-0 mt-0.5" size={14} />
                                        Probability of breach within 90 days: 34.7%
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-oxot-gold flex-shrink-0 mt-0.5" size={14} />
                                        Expected attack vector shift: Phishing → Supply Chain
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-oxot-gold flex-shrink-0 mt-0.5" size={14} />
                                        Insider threat emergence probability: 12.3% (trending up)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-oxot-gold flex-shrink-0 mt-0.5" size={14} />
                                        Optimal defense reallocation: +20% to OT/ICS
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <TypewriterEquation
                        equation="\\lim_{N \\to \\infty} \\frac{1}{N} \\sum_{i=1}^{N} u_i = \\int u(x) \\, m(x) \\, dx"
                        className="text-xl md:text-2xl text-oxot-gold mb-8"
                        delay={0.3}
                    />
                    <p className="text-xl text-gray-400">
                        As populations grow large, individual randomness averages out.
                        <strong className="text-white"> Prediction becomes possible.</strong>
                    </p>
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
                            Lasry, J. M., & Lions, P. L. (2007). Mean field games.
                            <em className="text-gray-300"> Japanese Journal of Mathematics, 2</em>(1), 229-260.
                        </p>
                        <p>
                            Huang, M., Malhamé, R. P., & Caines, P. E. (2006). Large population stochastic dynamic games.
                            <em className="text-gray-300"> Communications in Information and Systems, 6</em>(3), 221-252.
                        </p>
                        <p>
                            Asimov, I. (1951). <em className="text-gray-300">Foundation</em>.
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
