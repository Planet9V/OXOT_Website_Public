'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Shield, AlertTriangle, Users, Target,
    ArrowLeft, ChevronRight, Activity, Fingerprint,
    BarChart3, Lock, Eye, Zap
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

// Big Five traits with attack vector correlations
const BIG_FIVE_TRAITS = [
    {
        name: "Openness",
        symbol: "O",
        high: "Curious, creative, receptive to new ideas",
        low: "Conventional, cautious, routine-oriented",
        vulnerabilities: [
            { vector: "Novel Phishing", value: 0.85, description: "New/unusual attack formats" },
            { vector: "Curiosity Baits", value: 0.92, description: "'See what happens' traps" },
            { vector: "Tech Experiments", value: 0.78, description: "Untested tool downloads" }
        ]
    },
    {
        name: "Conscientiousness",
        symbol: "C",
        high: "Organized, disciplined, reliable",
        low: "Flexible, spontaneous, adaptable",
        vulnerabilities: [
            { vector: "Authority Impersonation", value: 0.88, description: "Fake boss/IT requests" },
            { vector: "Process Exploitation", value: 0.75, description: "Strict adherence bypassed" },
            { vector: "Deadline Pressure", value: 0.82, description: "'Urgent' manipulation" }
        ]
    },
    {
        name: "Extraversion",
        symbol: "E",
        high: "Outgoing, talkative, sociable",
        low: "Reserved, introspective, quiet",
        vulnerabilities: [
            { vector: "Social Pretexting", value: 0.91, description: "Friendly conversation traps" },
            { vector: "Over-sharing", value: 0.87, description: "Voluntary info disclosure" },
            { vector: "Networking Lures", value: 0.79, description: "Fake event/connection bait" }
        ]
    },
    {
        name: "Agreeableness",
        symbol: "A",
        high: "Trusting, helpful, cooperative",
        low: "Skeptical, competitive, challenging",
        vulnerabilities: [
            { vector: "Help-desk Social Eng", value: 0.94, description: "Exploits helpful nature" },
            { vector: "Sympathy Plays", value: 0.89, description: "'Emergency' requests" },
            { vector: "Trust Exploitation", value: 0.91, description: "Assumes good faith" }
        ]
    },
    {
        name: "Neuroticism",
        symbol: "N",
        high: "Anxious, reactive, stress-prone",
        low: "Calm, stable, resilient",
        vulnerabilities: [
            { vector: "Fear-based Attacks", value: 0.93, description: "'Your account hacked'" },
            { vector: "Urgency Escalation", value: 0.88, description: "Creates panic response" },
            { vector: "Threat Amplification", value: 0.85, description: "Exaggerated consequences" }
        ]
    }
];

export default function PsychometricTensorsPage() {
    const [activeTrait, setActiveTrait] = useState(0);
    const trait = BIG_FIVE_TRAITS[activeTrait];

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
                        <span className="px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-400 text-[10px] font-mono uppercase tracking-[0.3em]">
                            RSCH-07 // Psychometrics & Behavior
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6"
                    >
                        Psychometric <span className="text-violet-400 italic font-light">Tensors</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        Mapping Personality Attack Surface via Big Five Tensor Operations
                    </motion.p>

                    {/* Key Equation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 border border-white/10 rounded-2xl p-8 max-w-2xl"
                    >
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                            Core Tensor Equation
                        </div>
                        <TypewriterEquation
                            equation="R = P^T \\cdot T \\cdot A"
                            className="text-2xl md:text-4xl text-cyan-400"
                            delay={0.5}
                        />
                        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-violet-400 font-bold">P</div>
                                <div className="text-gray-500 text-xs">Personality Vector</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-violet-400 font-bold">T</div>
                                <div className="text-gray-500 text-xs">Transformation Matrix</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <div className="text-violet-400 font-bold">A</div>
                                <div className="text-gray-500 text-xs">Attack Vector Space</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Abstract Section */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-violet-400">#</span> Abstract
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        This capability introduces the <strong className="text-white">Psychometric Tensor</strong>—a mathematical
                        framework mapping the Big Five personality traits (OCEAN) to social engineering attack vulnerability.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        By treating personality as a <strong className="text-violet-400">5-dimensional vector</strong>, we can
                        predict which attack vectors will be most effective against specific individuals or organizational
                        populations.
                    </p>

                    <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-6 mt-8">
                        <div className="flex items-start gap-4">
                            <Brain className="text-violet-400 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-white font-bold mb-2">Why Personality Matters</div>
                                <p className="text-gray-400 text-sm">
                                    A phishing email works not because technology fails, but because a
                                    <strong className="text-white"> human trait</strong> is exploited.
                                    Understanding personality is understanding attack surface.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Trait Explorer */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">
                        <span className="text-violet-400">#</span> The Big Five Traits
                    </h2>

                    {/* Trait Selector */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {BIG_FIVE_TRAITS.map((t, i) => (
                            <button
                                key={t.name}
                                onClick={() => setActiveTrait(i)}
                                className={`px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${activeTrait === i
                                        ? 'bg-violet-500/20 border-2 border-violet-500 text-violet-400'
                                        : 'bg-white/5 border-2 border-white/10 text-gray-500 hover:border-white/30'
                                    }`}
                            >
                                {t.symbol} — {t.name}
                            </button>
                        ))}
                    </div>

                    {/* Active Trait Detail */}
                    <motion.div
                        key={trait.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {/* Left: Description */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="text-4xl font-black text-violet-400 mb-4">
                                {trait.name}
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                                    <div className="text-[10px] text-emerald-400 uppercase tracking-widest mb-1">High Score</div>
                                    <div className="text-white text-sm">{trait.high}</div>
                                </div>
                                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                                    <div className="text-[10px] text-rose-400 uppercase tracking-widest mb-1">Low Score</div>
                                    <div className="text-white text-sm">{trait.low}</div>
                                </div>
                            </div>

                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-8 mb-4">
                                Vector Component
                            </div>
                            <TypewriterEquation
                                equation={`P_{${trait.symbol}} \\in [0, 1]`}
                                className="text-xl text-cyan-400"
                                delay={0.2}
                            />
                        </div>

                        {/* Right: Vulnerability Matrix */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">
                                Attack Vulnerability Mapping
                            </div>

                            <div className="space-y-5">
                                {trait.vulnerabilities.map((v, i) => (
                                    <div key={v.vector}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="text-white font-medium">{v.vector}</div>
                                                <div className="text-gray-500 text-xs">{v.description}</div>
                                            </div>
                                            <span className="text-violet-400 font-mono font-bold">
                                                {v.value.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${v.value * 100}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                                className="h-full bg-gradient-to-r from-violet-500 to-violet-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mathematical Framework */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-violet-400">#</span> Mathematical Framework
                    </h2>

                    <div className="space-y-8">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                                Personality Vector Definition
                            </div>
                            <TypewriterEquation
                                equation="P = [O, C, E, A, N]^T \\in [0,1]^5"
                                className="text-2xl text-cyan-400"
                                delay={0.3}
                            />
                            <p className="text-gray-400 text-sm mt-4">
                                Each component represents a normalized Big Five trait score.
                            </p>
                        </div>

                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                                Transformation Tensor
                            </div>
                            <TypewriterEquation
                                equation="T \\in \\mathbb{R}^{5 \\times k}"
                                className="text-2xl text-cyan-400"
                                delay={0.5}
                            />
                            <p className="text-gray-400 text-sm mt-4">
                                Maps 5 personality dimensions to k attack vectors. Learned from empirical data.
                            </p>
                        </div>

                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                                Risk Projection
                            </div>
                            <TypewriterEquation
                                equation="R_i = \\sum_{j=1}^{5} P_j \\cdot T_{ji}"
                                className="text-2xl text-cyan-400"
                                delay={0.7}
                            />
                            <p className="text-gray-400 text-sm mt-4">
                                Vulnerability to attack vector i is the weighted sum of personality-to-attack correlations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AEON Application */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-violet-400">#</span> AEON Application
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-8">
                            <Fingerprint className="text-violet-400 mb-4" size={32} />
                            <h3 className="text-xl font-black text-violet-400 mb-3">Behavioral Inference</h3>
                            <p className="text-gray-400 text-sm">
                                AEON infers personality vectors from observable behaviors: email patterns,
                                meeting attendance, collaboration networks, and access patterns.
                            </p>
                            <div className="mt-4 text-[10px] font-mono text-gray-500">
                                No self-report surveys required.
                            </div>
                        </div>

                        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-8">
                            <Target className="text-violet-400 mb-4" size={32} />
                            <h3 className="text-xl font-black text-violet-400 mb-3">Targeted Training</h3>
                            <p className="text-gray-400 text-sm">
                                Security awareness training is personalized based on individual vulnerability profiles.
                                High-A employees receive trust-exploitation scenarios.
                            </p>
                            <div className="mt-4 text-[10px] font-mono text-gray-500">
                                Training efficiency increased 340%.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* References */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                        <span className="text-violet-400">#</span> References
                    </h2>
                    <div className="space-y-4 text-sm text-gray-400">
                        <p>
                            Goldberg, L. R. (1990). An alternative "description of personality": The Big-Five factor structure.
                            <em className="text-gray-300"> Journal of Personality and Social Psychology, 59</em>(6), 1216-1229.
                        </p>
                        <p>
                            McCrae, R. R., & Costa, P. T. (1987). Validation of the five-factor model of personality across instruments and observers.
                            <em className="text-gray-300"> Journal of Personality and Social Psychology, 52</em>(1), 81-90.
                        </p>
                        <p>
                            Hadnagy, C. (2010). <em className="text-gray-300">Social Engineering: The Art of Human Hacking</em>. Wiley.
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
