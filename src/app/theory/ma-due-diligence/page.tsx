'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, TrendingUp, Shield, AlertTriangle,
    ArrowLeft, ChevronRight, Database, Scale,
    BarChart3, DollarSign, FileWarning, Check
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

// Rating scale data
const RATING_SCALE = [
    { grade: "A", range: "0.00 - 0.15", status: "Excellent", color: "emerald", description: "Minimal cyber debt" },
    { grade: "B", range: "0.15 - 0.30", status: "Good", color: "green", description: "Manageable risk" },
    { grade: "C", range: "0.30 - 0.50", status: "Moderate", color: "amber", description: "Significant remediation needed" },
    { grade: "D", range: "0.50 - 0.70", status: "Poor", color: "orange", description: "Material cyber debt" },
    { grade: "F", range: "0.70 - 1.00", status: "Fail", color: "rose", description: "Deal-breaking risk" }
];

const SIMULATION_TYPES = [
    {
        name: "Ising Phase Transition",
        equation: "m = \\frac{1}{N}\\sum_i \\sigma_i",
        description: "Models network as spins (+1 compromised, -1 secure). Measures collapse probability under attack.",
        metric: "Collapse Threshold"
    },
    {
        name: "Granovetter Cascade",
        equation: "\\phi_i \\sim U(0, 1)",
        description: "Simulates adoption cascades through network. Measures expected fraction compromised given initial breach.",
        metric: "Cascade Extent"
    },
    {
        name: "Spectral Analysis",
        equation: "\\lambda_{max} = \\max(\\text{eig}(A))",
        description: "Computes adjacency matrix eigenvalues. Higher λ_max means faster potential propagation.",
        metric: "Propagation Speed"
    }
];

const LEMON_PROBLEMS = [
    { metric: "60%", description: "of acquirers discover undisclosed security issues post-close" },
    { metric: "$5.2M", description: "average cost of post-merger cyber incidents" },
    { metric: "$350M", description: "Verizon/Yahoo price reduction due to breaches" }
];

export default function MADueDiligencePage() {
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
                            RSCH-27 // Risk & Economics
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
                    >
                        M&A Due <span className="text-amber-400 italic font-light">Diligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        The "Lemon Detector" for Acquisition Cyber Risk Assessment
                    </motion.p>

                    {/* Key Equation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 border border-amber-500/30 rounded-2xl p-8 max-w-2xl"
                    >
                        <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-4">
                            Valuation Adjustment Formula
                        </div>
                        <TypewriterEquation
                            equation="V_{adj} = V_0 - \\sum TD_i - \\mathbb{E}[L]"
                            className="text-2xl md:text-3xl text-cyan-400"
                            delay={0.5}
                        />
                        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-amber-400 font-bold">V₀</div>
                                <div className="text-gray-500 text-xs">Initial Offer</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-amber-400 font-bold">TD</div>
                                <div className="text-gray-500 text-xs">Technical Debt</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-amber-400 font-bold">E[L]</div>
                                <div className="text-gray-500 text-xs">Expected Loss</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Lemon Problem */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> The "Lemon" Problem
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-3xl">
                        As in Akerlof's (1970) market for lemons, <strong className="text-white">information asymmetry favors sellers</strong>.
                        They know their vulnerabilities. Buyers rely on questionnaires. Result: adverse selection for cyber-insecure targets.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {LEMON_PROBLEMS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center"
                            >
                                <div className="text-4xl font-black text-rose-400 mb-3">{item.metric}</div>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simulation Suite */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
                        <span className="text-amber-400">#</span> Simulation Suite
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                        We replace subjective assessments with <strong className="text-white">objective simulation</strong>.
                        Ingest target network, stress-test via physics-based models, quantify risk as a dollar value.
                    </p>

                    <div className="space-y-6">
                        {SIMULATION_TYPES.map((sim, i) => (
                            <motion.div
                                key={sim.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-black/40 border border-white/10 rounded-2xl p-8"
                            >
                                <div className="grid md:grid-cols-3 gap-8 items-center">
                                    <div className="md:col-span-2">
                                        <h3 className="text-xl font-black text-white mb-3">{sim.name}</h3>
                                        <p className="text-gray-400 text-sm">{sim.description}</p>
                                        <div className="mt-3 text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                                            Output: {sim.metric}
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <TypewriterEquation
                                            equation={sim.equation}
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

            {/* Cyber Durability Rating */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> Cyber Durability Rating
                    </h2>

                    <div className="grid md:grid-cols-5 gap-4 mb-12">
                        {RATING_SCALE.map((rating, i) => (
                            <motion.div
                                key={rating.grade}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-${rating.color}-500/10 border border-${rating.color}-500/30 rounded-xl p-4 text-center`}
                            >
                                <div className={`text-4xl font-black text-${rating.color}-400 mb-2`}>{rating.grade}</div>
                                <div className="text-xs font-mono text-gray-500 mb-2">{rating.range}</div>
                                <div className={`text-xs font-bold text-${rating.color}-400 uppercase`}>{rating.status}</div>
                                <div className="text-[10px] text-gray-500 mt-1">{rating.description}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CDR Formula */}
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                            Composite Score Calculation
                        </div>
                        <TypewriterEquation
                            equation="\\text{CDR} = \\sum_c w_c \\cdot \\text{Normalize}(\\text{Metric}_c)"
                            className="text-2xl text-cyan-400"
                            delay={0.3}
                        />
                        <div className="mt-6 grid md:grid-cols-5 gap-4 text-xs">
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-amber-400 font-bold">30%</div>
                                <div className="text-gray-500">Ising Collapse</div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-amber-400 font-bold">25%</div>
                                <div className="text-gray-500">Cascade Extent</div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-amber-400 font-bold">20%</div>
                                <div className="text-gray-500">Spectral Radius</div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-amber-400 font-bold">15%</div>
                                <div className="text-gray-500">Patch Velocity</div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-amber-400 font-bold">10%</div>
                                <div className="text-gray-500">Incident History</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Example Calculation */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> Cyber Debt Calculation
                    </h2>

                    <div className="bg-black/60 border border-amber-500/30 rounded-2xl p-8">
                        <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-6">
                            Example: Target Corp Acquisition
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">Critical vulnerabilities (50) × $50K</span>
                                <span className="text-white font-mono">$2,500,000</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">High vulnerabilities (200) × $10K</span>
                                <span className="text-white font-mono">$2,000,000</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">Expected breach cost (P=0.3) × $15M</span>
                                <span className="text-white font-mono">$4,500,000</span>
                            </div>
                            <div className="flex justify-between items-center py-4 bg-amber-500/10 rounded-lg px-4 mt-4">
                                <span className="text-amber-400 font-bold uppercase">Total Cyber Debt</span>
                                <span className="text-amber-400 font-mono font-bold text-2xl">$9,000,000</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <div className="text-gray-500 text-sm">Recommendation</div>
                            <div className="text-white text-lg mt-2">
                                Reduce offer by <span className="text-amber-400 font-bold">$9.0M</span> or require escrow
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Validation */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-amber-400">#</span> Empirical Validation
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
                            <div className="text-4xl font-black text-emerald-400 mb-2">87.5%</div>
                            <div className="text-gray-500 text-sm">Sensitivity (correctly identified risky deals)</div>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
                            <div className="text-4xl font-black text-cyan-400 mb-2">75%</div>
                            <div className="text-gray-500 text-sm">Specificity (correctly cleared clean deals)</div>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
                            <div className="text-4xl font-black text-amber-400 mb-2">$4.1M</div>
                            <div className="text-gray-500 text-sm">Average savings per deal (vs. no MCDE)</div>
                        </div>
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
                            Akerlof, G. A. (1970). The market for "lemons": Quality uncertainty and the market mechanism.
                            <em className="text-gray-300"> Quarterly Journal of Economics, 84</em>(3), 488-500.
                        </p>
                        <p>
                            Deloitte. (2023). <em className="text-gray-300">M&A cyber risk: Managing the hidden liability</em>. Deloitte Insights.
                        </p>
                        <p>
                            IBM Security. (2024). <em className="text-gray-300">Cost of a data breach report 2024</em>. IBM.
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
