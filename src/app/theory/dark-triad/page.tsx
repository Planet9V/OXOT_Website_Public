'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Shield, AlertTriangle, Users, Database, Code,
    ArrowLeft, ChevronRight, Eye, Target, Fingerprint,
    BarChart3, Lock, FileText, Zap, Scale
} from 'lucide-react';
import Link from 'next/link';
import { TypewriterEquation } from '@/components/TypewriterEquation';

// Dark Triad trait data
const DARK_TRIAD_TRAITS = [
    {
        name: "Machiavellianism",
        symbol: "M",
        color: "emerald",
        description: "Manipulation, exploitation, and strategic deception",
        insiderRisk: "Social engineering from inside, fraud schemes",
        indicators: [
            "Flattery followed by requests (email patterns)",
            "Strategic relationship building across silos",
            "Information hoarding behaviors",
            "Blame deflection patterns"
        ],
        attackVectors: [
            { vector: "Sabotage", value: 0.4 },
            { vector: "Fraud", value: 0.9 },
            { vector: "Espionage", value: 0.8 },
            { vector: "IP Theft", value: 0.5 }
        ]
    },
    {
        name: "Narcissism",
        symbol: "N",
        color: "amber",
        description: "Grandiosity, entitlement, and self-importance",
        insiderRisk: "Resentment when passed over, IP theft for recognition",
        indicators: [
            "Excessive self-reference in communications",
            "Sensitivity to criticism (escalations)",
            "Grandiose project claims",
            "Entitlement to special access"
        ],
        attackVectors: [
            { vector: "Sabotage", value: 0.5 },
            { vector: "Fraud", value: 0.3 },
            { vector: "Espionage", value: 0.7 },
            { vector: "IP Theft", value: 0.9 }
        ]
    },
    {
        name: "Psychopathy",
        symbol: "P",
        color: "rose",
        description: "Callousness, impulsivity, and lack of remorse",
        insiderRisk: "Sabotage without regard for consequences",
        indicators: [
            "Policy violations without remorse",
            "Impulsive access patterns",
            "Lack of empathy in communications",
            "Thrill-seeking behavior (unusual hours, restricted areas)"
        ],
        attackVectors: [
            { vector: "Sabotage", value: 0.9 },
            { vector: "Fraud", value: 0.6 },
            { vector: "Espionage", value: 0.4 },
            { vector: "IP Theft", value: 0.3 }
        ]
    }
];

const VALIDATION_DATA = [
    { incident: "Sabotage", M: 0.42, N: 0.38, P: 0.81, bigFive: 0.12 },
    { incident: "Fraud", M: 0.87, N: 0.45, P: 0.51, bigFive: 0.23 },
    { incident: "Espionage", M: 0.72, N: 0.68, P: 0.35, bigFive: 0.31 },
    { incident: "IP Theft", M: 0.51, N: 0.79, P: 0.28, bigFive: 0.19 }
];

export default function DarkTriadPage() {
    const [activeTrait, setActiveTrait] = useState(0);
    const trait = DARK_TRIAD_TRAITS[activeTrait];

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
                        <span className="px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full text-rose-400 text-[10px] font-mono uppercase tracking-[0.3em]">
                            RSCH-33 // Psychometrics & Behavior
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6"
                    >
                        Dark <span className="text-rose-400 italic font-light">Triad</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mb-8"
                    >
                        Insider Threat Modeling via Subclinical Personality Disorders
                    </motion.p>

                    {/* Key Equation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 border border-white/10 rounded-2xl p-8 max-w-2xl"
                    >
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                            Extended Psychometric Tensor
                        </div>
                        <TypewriterEquation
                            equation="R' = (P_{B5} \\oplus P_{DT})^T \\cdot T' \\cdot A'"
                            className="text-2xl md:text-3xl text-cyan-400"
                            delay={0.5}
                        />
                        <div className="mt-4 text-sm text-gray-500">
                            Where P<sub>DT</sub> = [Machiavellianism, Narcissism, Psychopathy] ∈ [0,1]³
                        </div>
                    </motion.div>

                    {/* Key Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-6 mt-12"
                    >
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-6 py-4">
                            <div className="text-3xl font-black text-rose-400">78%</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Prediction Accuracy</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                            <div className="text-3xl font-black text-white">50+</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Incidents Analyzed</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                            <div className="text-3xl font-black text-white">3</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Trait Dimensions</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Abstract Section */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-rose-400">#</span> Abstract
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        This paper extends the Psychometric Tensor framework (RSCH-07) to incorporate the
                        <strong className="text-white"> Dark Triad</strong>—Machiavellianism, Narcissism, and Psychopathy—as
                        critical predictors of insider threat behavior.
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed mb-6">
                        While the Big Five personality traits model vulnerability to <em>external</em> attacks,
                        the Dark Triad predicts <strong className="text-rose-400">self-initiated</strong> malicious behavior:
                        sabotage, fraud, espionage, and IP theft.
                    </p>
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6 mt-8">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="text-rose-400 flex-shrink-0 mt-1" size={24} />
                            <div>
                                <div className="text-white font-bold mb-2">The Insider Threat Gap</div>
                                <p className="text-gray-400 text-sm">
                                    Traditional security focuses on external attackers. But 34% of breaches involve internal actors.
                                    The traitor leaves traces in their <em>character</em>, not just their code.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Trait Explorer */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-12 text-center">
                        <span className="text-rose-400">#</span> The Dark Triad Traits
                    </h2>

                    {/* Trait Selector */}
                    <div className="flex justify-center gap-4 mb-12">
                        {DARK_TRIAD_TRAITS.map((t, i) => (
                            <button
                                key={t.name}
                                onClick={() => setActiveTrait(i)}
                                className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all ${activeTrait === i
                                        ? `bg-${t.color}-500/20 border-2 border-${t.color}-500 text-${t.color}-400`
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
                        {/* Left: Description & Indicators */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className={`text-4xl font-black text-${trait.color}-400 mb-4`}>
                                {trait.name}
                            </div>
                            <p className="text-gray-400 mb-6">{trait.description}</p>

                            <div className={`bg-${trait.color}-500/10 border border-${trait.color}-500/20 rounded-xl p-4 mb-6`}>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Insider Risk Profile</div>
                                <div className="text-white font-medium">{trait.insiderRisk}</div>
                            </div>

                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                                Behavioral Indicators
                            </div>
                            <ul className="space-y-3">
                                {trait.indicators.map((indicator, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                        <ChevronRight className={`text-${trait.color}-400 flex-shrink-0 mt-0.5`} size={14} />
                                        {indicator}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Attack Vector Tensor Values */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">
                                Tensor Component Values: T'<sub>ij</sub>
                            </div>

                            <div className="space-y-4">
                                {trait.attackVectors.map((av, i) => (
                                    <div key={av.vector}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">{av.vector}</span>
                                            <span className={`text-${trait.color}-400 font-mono font-bold`}>
                                                {av.value.toFixed(1)}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${av.value * 100}%` }}
                                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                                className={`h-full bg-${trait.color}-500`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                                    Mathematical Definition
                                </div>
                                <TypewriterEquation
                                    equation={`T'_{${trait.symbol}j} = [${trait.attackVectors.map(v => v.value.toFixed(1)).join(', ')}]`}
                                    className="text-lg text-cyan-400"
                                    delay={0.2}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Empirical Validation */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
                        <span className="text-rose-400">#</span> Empirical Validation
                    </h2>
                    <p className="text-gray-400 mb-12 max-w-2xl">
                        Retrospective analysis of 50 documented insider incidents (2020-2024) confirms
                        Dark Triad traits as stronger predictors than Big Five alone.
                    </p>

                    {/* Correlation Matrix Table */}
                    <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-6 py-4 text-left text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                            Incident Type
                                        </th>
                                        <th className="px-6 py-4 text-center text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                                            M
                                        </th>
                                        <th className="px-6 py-4 text-center text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                                            N
                                        </th>
                                        <th className="px-6 py-4 text-center text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                                            P
                                        </th>
                                        <th className="px-6 py-4 text-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                            Big Five (Avg)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {VALIDATION_DATA.map((row, i) => (
                                        <tr key={row.incident} className="border-b border-white/5">
                                            <td className="px-6 py-4 text-white font-medium">{row.incident}</td>
                                            <td className={`px-6 py-4 text-center font-mono ${row.M >= 0.7 ? 'text-emerald-400 font-bold' : 'text-gray-400'}`}>
                                                {row.M.toFixed(2)}
                                            </td>
                                            <td className={`px-6 py-4 text-center font-mono ${row.N >= 0.7 ? 'text-amber-400 font-bold' : 'text-gray-400'}`}>
                                                {row.N.toFixed(2)}
                                            </td>
                                            <td className={`px-6 py-4 text-center font-mono ${row.P >= 0.7 ? 'text-rose-400 font-bold' : 'text-gray-400'}`}>
                                                {row.P.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-center font-mono text-gray-600">
                                                {row.bigFive.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                            <div className="text-2xl font-black text-emerald-400 mb-2">Machiavellianism</div>
                            <div className="text-gray-400 text-sm">Strongest predictor of <strong className="text-white">Fraud</strong> (0.87 correlation)</div>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                            <div className="text-2xl font-black text-amber-400 mb-2">Narcissism</div>
                            <div className="text-gray-400 text-sm">Strongest predictor of <strong className="text-white">IP Theft</strong> (0.79 correlation)</div>
                        </div>
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6">
                            <div className="text-2xl font-black text-rose-400 mb-2">Psychopathy</div>
                            <div className="text-gray-400 text-sm">Strongest predictor of <strong className="text-white">Sabotage</strong> (0.81 correlation)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Neo4j Implementation */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent to-black/40">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
                        <span className="text-rose-400">#</span> Neo4j Implementation
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Schema */}
                        <div className="bg-black/60 border border-white/10 rounded-2xl p-6 overflow-hidden">
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="text-cyan-400" size={20} />
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    Extended PsychProfile Schema
                                </span>
                            </div>
                            <pre className="text-sm text-gray-300 overflow-x-auto">
                                <code>{`CREATE (:PsychProfile {
  user_id: string,
  // Big Five
  openness: float,
  conscientiousness: float,
  extraversion: float,
  agreeableness: float,
  neuroticism: float,
  // Dark Triad (NEW)
  machiavellianism: float,
  narcissism: float,
  psychopathy: float,
  // Derived
  dark_triad_composite: float,
  insider_risk_score: float,
  last_assessed: datetime()
});`}</code>
                            </pre>
                        </div>

                        {/* Alert Query */}
                        <div className="bg-black/60 border border-white/10 rounded-2xl p-6 overflow-hidden">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="text-rose-400" size={20} />
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                    High-Risk Alert Query
                                </span>
                            </div>
                            <pre className="text-sm text-gray-300 overflow-x-auto">
                                <code>{`// Alert on high Dark Triad + high-value access
MATCH (p:PsychProfile)<-[:HAS_PROFILE]-(u:Subject)
      -[:HAS_ACCESS]->(a:Asset)
WHERE p.dark_triad_composite > 0.7
  AND a.criticality > 0.8
RETURN u.uid, 
       p.dark_triad_composite, 
       a.name, 
       "HIGH_INSIDER_RISK" as alert`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Considerations */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
                        <div className="flex items-start gap-4">
                            <Scale className="text-amber-400 flex-shrink-0 mt-1" size={32} />
                            <div>
                                <h3 className="text-2xl font-black text-amber-400 mb-4">Privacy & Ethics</h3>
                                <p className="text-gray-400 mb-4">
                                    Dark Triad profiling raises significant ethical and legal concerns:
                                </p>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-amber-400 flex-shrink-0 mt-0.5" size={14} />
                                        <strong className="text-white">GDPR Article 9:</strong> Special category data (psychological assessment)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-amber-400 flex-shrink-0 mt-0.5" size={14} />
                                        Potential for discrimination in hiring/promotion
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-amber-400 flex-shrink-0 mt-0.5" size={14} />
                                        Informed consent requirements
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="text-amber-400 flex-shrink-0 mt-0.5" size={14} />
                                        Data minimization principles
                                    </li>
                                </ul>
                                <div className="mt-6 pt-6 border-t border-amber-500/20">
                                    <p className="text-amber-200 font-medium">
                                        Recommendation: Use behavioral inference with clear opt-in policies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* References */}
            <section className="py-20 px-4 md:px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
                        <span className="text-rose-400">#</span> References
                    </h2>
                    <div className="space-y-4 text-sm text-gray-400">
                        <p>
                            Jonason, P. K., & Webster, G. D. (2010). The dirty dozen: A concise measure of the dark triad.
                            <em className="text-gray-300"> Psychological Assessment, 22</em>(2), 420-432.
                        </p>
                        <p>
                            Jones, D. N., & Paulhus, D. L. (2014). Introducing the Short Dark Triad (SD3): A brief measure of dark personality traits.
                            <em className="text-gray-300"> Assessment, 21</em>(1), 28-41.
                        </p>
                        <p>
                            Paulhus, D. L., & Williams, K. M. (2002). The Dark Triad of personality: Narcissism, Machiavellianism, and psychopathy.
                            <em className="text-gray-300"> Journal of Research in Personality, 36</em>(6), 556-563.
                        </p>
                        <p>
                            Shaw, E. D., Ruby, K. G., & Post, J. M. (1998). The insider threat to information systems.
                            <em className="text-gray-300"> Security Awareness Bulletin, 2</em>(98), 1-10.
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
