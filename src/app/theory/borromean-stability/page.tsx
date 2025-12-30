'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    GitBranch, Shield, AlertTriangle, Layers, Database,
    ArrowLeft, ChevronRight, Activity, Target, Lock,
    Cpu, RefreshCw, Eye, Zap
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

// Register data
const REGISTERS = [
    {
        name: "The Real (R)",
        symbol: "K₁",
        component: "Agent Blue",
        domain: "Edge Physics / Reflex",
        color: "cyan",
        description: "That which resists symbolization. Zero-day exploits and physical layer faults that exist before detection.",
        application: "Agent Blue operates in the Real. It responds to physics (voltage, packet heuristics) before the symbol (CVE ID) exists.",
        crisis: "When the Real irrupts without a Symbol, we face system trauma."
    },
    {
        name: "The Symbolic (S)",
        symbol: "K₂",
        component: "AEON Core",
        domain: "Cloud Strategy / Law",
        color: "oxot-gold",
        description: "The domain of Law, Language, and Code. SIEM, Compliance Matrix, and Governance Policies (IEC 62443).",
        application: "The Symbolic order defines what threats 'mean' and how they should be classified and responded to.",
        crisis: "A breach with no logs creates a Symbolic failure—the system cannot name its own wound."
    },
    {
        name: "The Imaginary (I)",
        symbol: "K₃",
        component: "SOC Visualization",
        domain: "Human Perception / Interface",
        color: "violet",
        description: "The domain of Image and Ego. Dashboards, 3D globes, threat maps, and analyst intuition.",
        application: "The Imaginary is how humans perceive and interact with the security state of the organization.",
        crisis: "If the Dashboard shows 'Green' while the Real is 'Red', the knot slips."
    }
];

export default function BorromeanStabilityPage() {
    const [activeRegister, setActiveRegister] = useState(0);
    const register = REGISTERS[activeRegister];

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
                        <span className="px-4 py-2 bg-oxot-gold/10 border border-oxot-gold/30 rounded-full text-oxot-gold text-[10px] font-mono uppercase tracking-[0.3em]">
                            RSCH-01 // Topology & Stability
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6"
                    >
                        Borromean <span className="text-oxot-gold italic font-light">Stability</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        A Topological Analysis of Interdependent Security Systems
                    </motion.p>

                    {/* Key Equation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 border border-white/10 rounded-2xl p-8 max-w-2xl"
                    >
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                            Milnor Invariant: Non-Zero Higher Linking
                        </div>
                        <TypewriterEquation
                            equation="\\bar{\\mu}(123) = \\pm 1"
                            className="text-2xl md:text-4xl text-cyan-400"
                            delay={0.5}
                        />
                        <div className="mt-6 text-sm text-gray-500">
                            The Borromean configuration binds three components such that removing any one causes the remaining two to fall apart.
                        </div>
                    </motion.div>

                    {/* Pairwise Linking */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 bg-black/30 border border-white/5 rounded-xl p-6 max-w-xl"
                    >
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">
                            Vanishing Pairwise Links
                        </div>
                        <TypewriterEquation
                            equation="lk(K_i, K_j) = 0 \\quad \\forall i \\neq j"
                            className="text-lg text-gray-400"
                            delay={0.7}
                        />
                        <div className="mt-3 text-xs text-gray-600">
                            No two rings hold each other, yet the structure binds all three.
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
                        This paper explores the application of <strong className="text-white">Milnor Invariants</strong> and
                        <strong className="text-white"> Lacanian Topology</strong> to cybersecurity architectures.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        The <strong className="text-oxot-gold">Borromean Knot</strong> models "Bi-Cameral Defense," demonstrating that
                        the breakdown of a single register (Real, Symbolic, or Imaginary) mathematically necessitates the
                        <strong className="text-white"> collapse of the entire security posture</strong>.
                    </p>

                    <div className="bg-oxot-gold/5 border border-oxot-gold/20 rounded-xl p-6 mt-8">
                        <div className="flex items-start gap-4">
                            <GitBranch className="text-oxot-gold flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-white font-bold mb-2">The Topological Insight</div>
                                <p className="text-gray-400 text-sm">
                                    Traditional "Defense in Depth" models are often <em>trivial links</em>—layers that can be peeled away independently.
                                    The Borromean model creates <strong className="text-white">interdependence</strong>: no layer is secure alone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Three Registers */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-oxot-gold/5 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">
                        <span className="text-oxot-gold">#</span> The Three Registers
                    </h2>

                    {/* Register Selector */}
                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        {REGISTERS.map((r, i) => (
                            <button
                                key={r.name}
                                onClick={() => setActiveRegister(i)}
                                className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${activeRegister === i
                                        ? `bg-${r.color}-500/20 border-2 border-${r.color}-500 text-${r.color === 'oxot-gold' ? 'oxot-gold' : r.color + '-400'}`
                                        : 'bg-white/5 border-2 border-white/10 text-gray-500 hover:border-white/30'
                                    }`}
                            >
                                {r.symbol} — {r.name.split(' ')[1].replace('(', '').replace(')', '')}
                            </button>
                        ))}
                    </div>

                    {/* Active Register Detail */}
                    <motion.div
                        key={register.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* Left: Description */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className={`text-4xl font-black text-${register.color === 'oxot-gold' ? 'oxot-gold' : register.color + '-400'} mb-2`}>
                                {register.name}
                            </div>
                            <div className="text-sm text-gray-500 font-mono mb-6">
                                {register.component} → {register.domain}
                            </div>

                            <p className="text-gray-400 mb-6">{register.description}</p>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">AEON Application</div>
                                <div className="text-white text-sm">{register.application}</div>
                            </div>
                        </div>

                        {/* Right: Crisis Mode */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle className="text-rose-400" size={24} />
                                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                                    Register Failure Mode
                                </span>
                            </div>

                            <p className="text-gray-400 mb-6">{register.crisis}</p>

                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6">
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                                    Proof of Instability
                                </div>
                                <TypewriterEquation
                                    equation={`\\text{If } ${register.symbol} \\text{ fails} \\Rightarrow \\bar{\\mu} = 0`}
                                    className="text-lg text-rose-400"
                                    delay={0.2}
                                />
                                <p className="text-gray-500 text-xs mt-4">
                                    The remaining sub-link has zero Milnor invariant—the components fall apart.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Borromean Diagram */}
                    <div className="mt-16 text-center">
                        <div className="inline-block bg-black/60 border border-white/10 rounded-2xl p-12">
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-8">
                                The Borromean Configuration
                            </div>

                            {/* ASCII Art Representation */}
                            <pre className="text-lg font-mono text-gray-400 leading-relaxed">
                                {`       ┌────────────┐
       │  SYMBOLIC  │  ← AEON Core (Law/Code)
       │    (S)     │
       └─────┬──────┘
             │
    ┌────────┴────────┐
    │                 │
┌───┴───┐       ┌─────┴────┐
│ REAL  │───────│ IMAGINARY│
│  (R)  │       │    (I)   │
└───────┘       └──────────┘
     ↑                 ↑
Agent Blue         SOC/Dashboard
(Edge Physics)   (Human Perception)`}
                            </pre>

                            <div className="mt-8 text-sm text-gray-500">
                                Remove any ring → The other two separate → <span className="text-rose-400">System Collapse</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industrial Application */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> Industrial Application
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-3xl">
                        The Borromean principle applies beyond cybersecurity. Our research into <strong className="text-white">Braincube</strong>
                        (Industrial AI) reveals the same topological necessity in manufacturing.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6">
                            <Cpu className="text-cyan-400 mb-4" size={32} />
                            <h3 className="text-xl font-black text-cyan-400 mb-3">Edge (Real)</h3>
                            <p className="text-gray-400 text-sm">
                                Millisecond sensor readings (vibration, heat) must trigger immediate reflexes
                                (stop machine) without cloud latency.
                            </p>
                        </div>
                        <div className="bg-oxot-gold/10 border border-oxot-gold/20 rounded-2xl p-6">
                            <Database className="text-oxot-gold mb-4" size={32} />
                            <h3 className="text-xl font-black text-oxot-gold mb-3">Cloud (Symbolic)</h3>
                            <p className="text-gray-400 text-sm">
                                Aggregate data must be symbolized into "Optimization Models" (OEE metrics)
                                to rewrite the Edge logic.
                            </p>
                        </div>
                        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6">
                            <Eye className="text-violet-400 mb-4" size={32} />
                            <h3 className="text-xl font-black text-violet-400 mb-3">Interface (Imaginary)</h3>
                            <p className="text-gray-400 text-sm">
                                Human operators interpret dashboards and make strategic decisions based on
                                visualized plant state.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <RefreshCw className="text-oxot-gold flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-white font-bold mb-2">Interdependence</div>
                                <p className="text-gray-400 text-sm">
                                    A factory with <em>only Edge</em> is reactive (dumb).
                                    A factory with <em>only Cloud</em> is latent (dangerous).
                                    The Borromean bind ensures <strong className="text-white">intelligent resilience</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-oxot-gold">#</span> Conclusion
                    </h2>

                    <div className="bg-oxot-gold/10 border border-oxot-gold/30 rounded-2xl p-8 mb-12">
                        <TypewriterEquation
                            equation="Lk(R, S, I) = 1"
                            className="text-3xl md:text-4xl text-oxot-gold mb-6"
                            delay={0.3}
                        />
                        <p className="text-lg text-gray-400">
                            This is not a metaphor; it is a <strong className="text-white">topological requirement</strong> for Resilience.
                        </p>
                    </div>

                    <p className="text-gray-400 mb-8">
                        AEON's "Co-Pilot" mode ensures the Imaginary (Analyst) remains linked to the Real (Agent Blue)
                        via the Symbolic (AEON Core), <strong className="text-white">maintaining the knot</strong>.
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
                            Milnor, J. (1957). Isotopy of Links.
                            <em className="text-gray-300"> Algebraic Geometry and Topology</em>.
                        </p>
                        <p>
                            Lacan, J. (1975-1976). Le Séminaire, Livre XXIII: Le Sinthome.
                        </p>
                        <p>
                            Olam Food Ingredients (OFI). AtSource: Sustainability Insights Platform.
                        </p>
                        <p>
                            Braincube. Industrial Internet of Things (IIoT) Implementation Guide.
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
