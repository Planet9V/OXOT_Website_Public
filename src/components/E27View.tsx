'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Sigma, Brain, Network, Activity, Database,
    GitBranch, ArrowRight, ChevronDown, MonitorIcon,
    Shield, Target, Zap, Lock, Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import E27HyperVisual from './E27HyperVisual';
import { OXOTLogo } from './branding/OXOTLogo';
import { PageHeader } from './branding/PageHeader';
import { Link as ScrollLink } from 'react-scroll';

interface E27ViewProps {
    heroTitle?: string;
    heroSubtitle?: string;
    navOffset?: number;
    isEmbedded?: boolean;
}

export default function E27View({
    heroTitle = "SOVEREIGN LOGIC",
    heroSubtitle = "E27 ENGINE CORE // The Calculus of McKenney-Lacan // Predictive Applications.",
    navOffset = 0,
    isEmbedded = false
}: E27ViewProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const sections = [
        { id: 'math', title: 'Mathematical Framework', icon: <Sigma size={16} /> },
        { id: 'schema', title: 'Ontology of Risk', icon: <Database size={16} /> },
        { id: 'pipeline', title: 'Prediction Pipeline', icon: <GitBranch size={16} /> },
        { id: 'neo4j', title: 'Graph Engine', icon: <Network size={16} /> }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white font-sans selection:bg-oxot-gold/30 pb-40 overflow-x-hidden">
            {/* Background Matrix Effect - Low Opacity */}
            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
                <MatrixRain />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-oxot-blue to-white origin-left z-[100]"
                style={{ scaleX: scrollYProgress, top: navOffset }}
            />

            {/* Hero Section with State Evolution Animation - Only render if NOT embedded */}
            {!isEmbedded && (
                <section className="relative h-screen flex flex-col items-center justify-center z-10 overflow-hidden">
                    {/* Background Animation */}
                    <div className="absolute inset-0 z-0">
                        <E27HyperVisual variant="hero" />
                    </div>

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0 pointer-events-none" />

                    <motion.div style={{ opacity, scale }} className="relative z-10 text-center max-w-7xl mx-auto flex flex-col items-center px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="mb-8"
                        >
                            <OXOTLogo size="lg" animated={true} />
                        </motion.div>

                        <PageHeader
                            title={heroTitle}
                            subtitle={heroSubtitle}
                            variant="hero"
                            accent="blue"
                            className="mb-12"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-6 rounded-2xl border border-white/5"
                        >
                            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light text-balance drop-shadow-md">
                                Exploring the 16 Super Labels, the E27 Prediction Pipeline, and the
                                Ontology of Risk that drives autonomous decision making.
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 z-10"
                    >
                        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Scroll to Initialize</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                    </motion.div>
                </section>
            )}

            {/* Sticky Navigation - Only render if NOT embedded, as Core Hub has its own nav */}
            {!isEmbedded && (
                <div
                    className="sticky z-50 border-y border-white/5 bg-black/80 backdrop-blur-md"
                    style={{ top: navOffset }}
                >
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center">
                        <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
                            {sections.map((section) => (
                                <ScrollLink
                                    key={section.id}
                                    to={section.id}
                                    smooth={true}
                                    offset={-100}
                                    duration={800}
                                    className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer text-gray-500 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
                                    activeClass="!bg-oxot-blue/10 !text-oxot-blue border-oxot-blue/20 shadow-[0_0_15px_rgba(0,170,255,0.2)]"
                                    spy={true}
                                >
                                    {section.icon}
                                    <span className="hidden sm:inline">{section.title}</span>
                                </ScrollLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content - Scrolling Layout with Varied Themes */}
            <div className="relative z-10 w-full">

                {/* 1. Mathematical Framework (Blue/Dark Theme) */}
                <div id="math" className="min-h-screen py-20 bg-gradient-to-b from-black to-slate-950 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <MathFramework />
                    </div>
                </div>

                {/* 2. Ontology of Risk (Gold/Dark Theme) */}
                <div id="schema" className="min-h-screen py-20 bg-gradient-to-b from-black via-slate-900/20 to-black border-b border-white/5 relative overflow-hidden">
                    {/* Subtle Gold Pulse Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,197,24,0.03)_0%,transparent_70%)] pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="mb-20 text-center">
                            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                                <Database className="w-4 h-4" />
                                Global Taxonomy
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                                Ontology of <span className="text-oxot-gold">Risk.</span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed text-balance">
                                A unified taxonomy mapping 197 NER11 entity types to 16 Super Labels. We drill down from the reference architecture of the sector (Layer 0) to the component level via a <strong>20-hop knowledge graph</strong>.
                            </p>
                        </div>
                        <SuperLabelsSchema />
                    </div>
                </div>

                {/* 3. Prediction Pipeline (Gold/Dark Theme) */}
                <div id="pipeline" className="min-h-screen py-20 bg-gradient-to-b from-black via-amber-950/10 to-black border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-20 text-center">
                            <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                                <GitBranch className="w-4 h-4" />
                                Forecasting Engine
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                                Prediction <span className="text-oxot-blue">Pipeline.</span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed text-balance">
                                Using math, not bias. We decompose external influences and internal decision-making to optimize prioritization via our <strong>NOW/NEXT/NEVER</strong> framework.
                            </p>
                        </div>
                        <PredictionPipeline />
                    </div>
                </div>

                {/* 4. Graph Engine (Green/Tech Theme) */}
                <div id="neo4j" className="py-20 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-6">
                        <Neo4jEngine />
                    </div>
                </div>

            </div>
        </div>
    );
}

// ==================== COMPONENTS ====================

const MathFramework: React.FC = () => {
    return (
        <div className="space-y-24">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                    <Sigma className="w-4 h-4" />
                    Formal Logic
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none text-white">
                    The Precision of <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-blue to-white">Logic.</span>
                </h2>

                {/* 
                   We preserve the E27HyperVisual here as requested ("do not remove"), 
                   even though it is also in the Hero. This serves as the dedicated "Precision of Logic" visualization.
                */}
                <div className="h-[600px] w-full mt-12 mb-12 bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none z-10" />
                    <E27HyperVisual variant="card" />
                </div>
            </div>

            {/* === 1. McKENNEY-LACAN CALCULUS SECTION === */}
            <section className="grid lg:grid-cols-2 gap-8">
                <div className="p-12 bg-white/[0.03] border border-white/10 rounded-3xl relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                        <Brain size={240} className="text-oxot-blue" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">The Psychometric Tensor</h3>
                        <div className="p-6 bg-black/60 rounded-xl border border-oxot-blue/30 font-mono text-sm md:text-base text-oxot-blue mb-8 shadow-inner inline-block">
                            P_i = [ D I ; S C ] ⊗ [ O C E A N ]
                        </div>
                        <p className="text-gray-400 leading-relaxed text-lg font-light text-balance">
                            We treat human behavior within the system not as a variable, but as a mathematical object—a <strong>Tensor in a Topological Space</strong>. By mapping static personality structures (DISC + Big 5) of workers, defenders, and APT groups, we can mathematically model their reaction to stress, authority, and risk.
                        </p>
                    </div>
                </div>

                <div className="p-12 bg-white/[0.03] border border-white/10 rounded-3xl relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
                        <Activity size={240} className="text-oxot-red" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">The Interaction Hamiltonian</h3>
                        <div className="p-6 bg-black/60 rounded-xl border border-oxot-red/30 font-mono text-sm md:text-base text-oxot-red mb-8 shadow-inner inline-block">
                            H = Σ ½ m v² + Σ V_ij(x_i, x_j)
                        </div>
                        <p className="text-gray-400 leading-relaxed text-lg font-light text-balance">
                            Modeling the "energy" of incident response. We calculate the <strong>Dissonance</strong> (friction) and <strong>Consonance</strong> (flow) between these human tensors to predict team performance and verify decision-making under the "fog of war."
                        </p>
                    </div>
                </div>
            </section>

            {/* === 2. PREDICTIVE APPLICATIONS SECTION === */}
            <section className="mt-32">
                <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] mb-12 text-center">Key Applications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Application 1: Epidemic Thresholds */}
                    <EquationBlock
                        num="01"
                        title="Epidemic Thresholds (R₀)"
                        subtitle="Malware Spread & Network Infection Dynamics"
                        latex="R₀ = (β/γ) × λ_max(A)"
                        desc="The Kill Switch: To stop an epidemic (R₀ < 1), decrease β (disable vulnerable service), or decrease λ_max (network segmentation)."
                        color="text-oxot-red"
                        borderColor="border-oxot-red"
                    />

                    {/* Application 2: Ising Dynamics */}
                    <EquationBlock
                        num="02"
                        title="Ising Dynamics"
                        subtitle="Opinion Propagation & Security Culture"
                        latex="dm/dt = -m + tanh(β(Jzm + h))"
                        desc="Phase Transition: Below critical temperature T_c, organizations spontaneously magnetize into strong security culture. Above T_c, chaos reigns."
                        color="text-oxot-blue"
                        borderColor="border-oxot-blue"
                    />

                    {/* Application 3: Granovetter Thresholds */}
                    <EquationBlock
                        num="03"
                        title="Granovetter Thresholds"
                        subtitle="Attack Cascades & Critical Mass"
                        latex="r(t+1) = N × F(r(t)/N)"
                        desc="Cascade Condition: The curve y = F(x) must cross y = x from above to trigger self-sustaining cascade. Insert high-threshold nodes (firewalls) to break the chain."
                        color="text-yellow-500"
                        borderColor="border-yellow-500"
                    />

                    {/* Application 4: Bifurcation Theory */}
                    <EquationBlock
                        num="04"
                        title="Bifurcation Theory"
                        subtitle="Seldon Crisis Detection"
                        latex="dx/dt = μ + x²"
                        desc="Seldon Crisis: Fixed points collide and annihilate. System has no stable state → collapse. Distance to bifurcation is proportional to √|μ|."
                        color="text-white"
                        borderColor="border-white"
                    />
                </div>
            </section>
        </div>
    );
};

const EquationBlock: React.FC<{ num: string, title: string, subtitle: string, latex: string, desc: string, color: string, borderColor: string }> = ({ num, title, subtitle, latex, desc, color, borderColor }) => (
    <div className={`p-10 bg-white/[0.02] border-l-4 ${borderColor} rounded-r-2xl flex flex-col gap-6 hover:bg-white/[0.05] transition-all duration-300 group h-full`}>
        <div className="flex justify-between items-start">
            <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h3>
                <p className={`text-xs font-mono uppercase tracking-widest ${color} opacity-80`}>{subtitle}</p>
            </div>
            <div className={`text-5xl font-black opacity-10 font-mono ${color}`}>{num}</div>
        </div>

        <div className="p-6 bg-black/40 rounded-xl border border-white/5 font-mono text-sm text-white shadow-inner overflow-x-auto">
            {latex}
        </div>
        <p className="text-gray-400 text-sm leading-relaxed font-light">
            {desc}
        </p>
    </div>
);


const SuperLabelsSchema: React.FC = () => {
    const [expandedId, setExpandedId] = React.useState<string | null>(null);

    // Complete 16 Super Labels from NER11 taxonomy mapped to E27 Engine
    // Using subdued OXOT brand palette: oxot-blue, oxot-gold, gray tones
    const labels = [
        {
            id: '01', name: 'Control', category: 'Governance',
            formula: '∫ |u(t)|² dt ≤ E_max',
            shortDesc: 'Access controls, governance, permissions',
            fullDesc: 'Quantifies the energy expenditure required to maintain security posture. Controls that require excessive "energy" (human effort, computational resources) are unsustainable. Optimal control minimizes this integral while achieving security objectives.',
            examples: ['IAM policies', 'RBAC configurations', 'Firewall rules', 'Encryption keys'],
            nerCount: 47,
            color: 'text-oxot-blue',
            bgColor: 'bg-oxot-blue/5',
            borderColor: 'border-oxot-blue/20'
        },
        {
            id: '02', name: 'Impact', category: 'Consequence',
            formula: 'I(x) = Σ wᵢ · Cᵢ(x)',
            shortDesc: 'Severity levels, consequence metrics',
            fullDesc: 'Weighted sum of consequence vectors across multiple dimensions: financial, operational, reputational, safety. Each weight reflects organizational priorities. Used in Seldon Crisis prediction to forecast cascade magnitude.',
            examples: ['Business interruption cost', 'Data loss severity', 'Regulatory fines', 'Safety incidents'],
            nerCount: 38,
            color: 'text-oxot-gold',
            bgColor: 'bg-oxot-gold/5',
            borderColor: 'border-oxot-gold/20'
        },
        {
            id: '03', name: 'Threat', category: 'Adversary',
            formula: 'T⃗ = ∇φ_risk',
            shortDesc: 'Attack vectors, adversary capabilities',
            fullDesc: 'Threat as a gradient field pointing toward maximum risk. Attackers follow this gradient like water flows downhill. Defense strategy: reshape the risk landscape to redirect adversary flow toward honeypots or away from crown jewels.',
            examples: ['APT groups', 'Insider threats', 'Supply chain attacks', 'Zero-days'],
            nerCount: 41,
            color: 'text-oxot-red',
            bgColor: 'bg-oxot-red/5',
            borderColor: 'border-oxot-red/20'
        },
        {
            id: '04', name: 'Behavior', category: 'Human Factors',
            formula: 'Bₜ = f(Sₜ, Aₜ) + ε',
            shortDesc: 'User/system actions, patterns',
            fullDesc: 'Behavior as a stochastic function of current state S and actions A, plus noise ε. Integrates with Psychometric Tensor (DISC ⊗ OCEAN) to predict human responses. Critical for social engineering resistance modeling.',
            examples: ['Login patterns', 'Data access frequency', 'Communication graphs', 'Anomaly detection'],
            nerCount: 18,
            color: 'text-slate-400',
            bgColor: 'bg-slate-500/5',
            borderColor: 'border-slate-500/20'
        },
        {
            id: '05', name: 'Resilience', category: 'Recovery',
            formula: 'R(t) = 1 - e^(-λt)',
            shortDesc: 'Recovery, redundancy, adaptation',
            fullDesc: 'Exponential recovery toward steady state. λ determines recovery rate—higher λ means faster bounce-back. System resilience is the integral of R(t) over the incident window. Target: R(t) > 0.9 within RTO.',
            examples: ['MTTR metrics', 'Backup systems', 'DR procedures', 'Auto-scaling'],
            nerCount: 21,
            color: 'text-oxot-blue',
            bgColor: 'bg-oxot-blue/5',
            borderColor: 'border-oxot-blue/20'
        },
        {
            id: '06', name: 'Asset', category: 'Resources',
            formula: 'A(x) = ∮_C F⃗ · dr⃗',
            shortDesc: 'Resources, infrastructure, data',
            fullDesc: 'Asset value as a path integral around the protection boundary. Closed loop integral reveals "leakage"—unauthorized data flows. Net value depends on the protection perimeter you define.',
            examples: ['Crown jewels', 'PII databases', 'Trade secrets', 'Critical infrastructure'],
            nerCount: 14,
            color: 'text-oxot-gold',
            bgColor: 'bg-oxot-gold/5',
            borderColor: 'border-oxot-gold/20'
        },
        {
            id: '07', name: 'Dependency', category: 'Architecture',
            formula: 'Dᵢⱼ = [A]ᵢⱼⁿ',
            shortDesc: 'Service chains, integration points',
            fullDesc: 'Dependency as the n-th power of adjacency matrix. D[i,j] reveals if node j is reachable from i in n hops. High n-hop dependencies indicate fragile supply chains. Spectral radius λ_max predicts cascade reach.',
            examples: ['API integrations', 'Third-party vendors', 'Cloud dependencies', 'SaaS platforms'],
            nerCount: 12,
            color: 'text-gray-400',
            bgColor: 'bg-gray-500/5',
            borderColor: 'border-gray-500/20'
        },
        {
            id: '08', name: 'Temporality', category: 'Dynamics',
            formula: 'ψ(t) = ψ(0)e^(-iHt/ℏ)',
            shortDesc: 'Time-dependent properties, windows',
            fullDesc: 'Security state evolves like a quantum wavefunction under Hamiltonian H. Time windows (maintenance windows, credential rotation) create periodic vulnerability surface. Phase matters—attacks synchronized to business cycles.',
            examples: ['Patch windows', 'Session timeouts', 'Log retention', 'Certificate expiry'],
            nerCount: 8,
            color: 'text-slate-400',
            bgColor: 'bg-slate-500/5',
            borderColor: 'border-slate-500/20'
        },
        {
            id: '09', name: 'Network', category: 'Topology',
            formula: 'λ_max(A) → R₀ threshold',
            shortDesc: 'Graph structure, connectivity patterns',
            fullDesc: 'Network spectral radius determines epidemic threshold. If R₀ = β/γ · λ_max > 1, malware spreads. Defense: reduce λ_max through network segmentation. Hub removal disproportionately reduces λ_max.',
            examples: ['Network topology', 'VLAN segmentation', 'Zero Trust architecture', 'Microsegmentation'],
            nerCount: 33,
            color: 'text-oxot-blue',
            bgColor: 'bg-oxot-blue/5',
            borderColor: 'border-oxot-blue/20'
        },
        {
            id: '10', name: 'Vulnerability', category: 'Weakness',
            formula: 'V = P(exploit) × P(access)',
            shortDesc: 'Weaknesses, exploitability, exposure',
            fullDesc: 'Vulnerability as joint probability of exploitation given access. CVSS base score approximates P(exploit). Exposure score approximates P(access). True risk is the product, not the sum.',
            examples: ['CVEs', 'Misconfigurations', 'Zero-days', 'Logic flaws'],
            nerCount: 56,
            color: 'text-oxot-red',
            bgColor: 'bg-oxot-red/5',
            borderColor: 'border-oxot-red/20'
        },
        {
            id: '11', name: 'Detection', category: 'Visibility',
            formula: 'D = TP / (TP + FN)',
            shortDesc: 'Monitoring, alerting, visibility',
            fullDesc: 'Detection as true positive rate (sensitivity). High detection rate means low FN (missed attacks). But D alone is misleading—must balance against FP rate. F1-score = 2·D·P/(D+P) is the true metric.',
            examples: ['SIEM rules', 'EDR alerts', 'NDR signatures', 'UEBA anomalies'],
            nerCount: 29,
            color: 'text-oxot-blue',
            bgColor: 'bg-oxot-blue/5',
            borderColor: 'border-oxot-blue/20'
        },
        {
            id: '12', name: 'Response', category: 'Action',
            formula: 'MTTD + MTTR → Dwell Time',
            shortDesc: 'Incident handling, remediation',
            fullDesc: 'Response effectiveness measured by dwell time reduction. MTTD (detect) + MTTR (respond) = total exposure window. Each hour of dwell time correlates with 10x increase in breach cost.',
            examples: ['Playbooks', 'Automation', 'Orchestration', 'War room procedures'],
            nerCount: 22,
            color: 'text-oxot-gold',
            bgColor: 'bg-oxot-gold/5',
            borderColor: 'border-oxot-gold/20'
        },
        {
            id: '13', name: 'Compliance', category: 'Regulatory',
            formula: 'C = Σ (req_met / req_total)',
            shortDesc: 'Regulatory requirements, standards',
            fullDesc: 'Compliance as coverage ratio across control frameworks. But compliance ≠ security. NIS2, IEC 62443, SOC 2 map to our Super Labels. Use compliance as baseline, not ceiling.',
            examples: ['NIS2', 'IEC 62443', 'SOC 2', 'ISO 27001', 'GDPR'],
            nerCount: 44,
            color: 'text-gray-400',
            bgColor: 'bg-gray-500/5',
            borderColor: 'border-gray-500/20'
        },
        {
            id: '14', name: 'Identity', category: 'Authentication',
            formula: 'I = f(who, what, where, when)',
            shortDesc: 'Authentication, authorization, identity',
            fullDesc: 'Identity as a multi-dimensional context vector. Zero Trust: "never trust, always verify" means continuous re-evaluation of the identity vector. Privilege = distance from least-privilege baseline.',
            examples: ['SSO', 'MFA', 'PKI certificates', 'Service accounts'],
            nerCount: 31,
            color: 'text-slate-400',
            bgColor: 'bg-slate-500/5',
            borderColor: 'border-slate-500/20'
        },
        {
            id: '15', name: 'Data', category: 'Information',
            formula: 'H(X) = -Σ p(x) log p(x)',
            shortDesc: 'Data classification, flow, protection',
            fullDesc: 'Data entropy measures information content and unpredictability. High-entropy data (encrypted) is protected. Low-entropy patterns (predictable formats) indicate classification. DLP uses entropy analysis to detect exfiltration.',
            examples: ['Data classification', 'DLP policies', 'Encryption at rest', 'Data lineage'],
            nerCount: 27,
            color: 'text-oxot-blue',
            bgColor: 'bg-oxot-blue/5',
            borderColor: 'border-oxot-blue/20'
        },
        {
            id: '16', name: 'Supply Chain', category: 'Third Party',
            formula: 'Risk_total = Σ P(breach_i) × Impact_i',
            shortDesc: 'Vendor risk, third-party dependencies',
            fullDesc: 'Supply chain risk as weighted sum of vendor breach probabilities times their access impact. SolarWinds, Log4j showed: your security = min(your security, vendor security). Trust but verify continuously.',
            examples: ['SBOM analysis', 'Vendor assessments', 'Fourth-party risk', 'Open source deps'],
            nerCount: 19,
            color: 'text-oxot-gold',
            bgColor: 'bg-oxot-gold/5',
            borderColor: 'border-oxot-gold/20'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-black/30 rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-3xl font-black text-oxot-gold">16</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Super Labels</div>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-3xl font-black text-oxot-blue">197</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">NER11 Entity Types</div>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-3xl font-black text-white">20-hop</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Knowledge Graph</div>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/10 text-center">
                    <div className="text-3xl font-black text-green-400">L0→L6</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Layer Coverage</div>
                </div>
            </div>

            {/* Label Grid - 2 columns for depth */}
            <div className="grid md:grid-cols-2 gap-6">
                {labels.map((label) => (
                    <motion.div
                        key={label.id}
                        layout
                        className={`rounded-2xl border ${label.borderColor} ${label.bgColor} overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg`}
                        onClick={() => setExpandedId(expandedId === label.id ? null : label.id)}
                    >
                        {/* Card Header */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${label.bgColor} border ${label.borderColor} flex items-center justify-center font-black text-lg ${label.color}`}>
                                        {label.id}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight">{label.name}</h3>
                                        <div className={`text-[10px] font-mono uppercase tracking-widest ${label.color}`}>{label.category}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-2xl font-black ${label.color}`}>{label.nerCount}</div>
                                    <div className="text-[9px] text-gray-500 uppercase">NER Types</div>
                                </div>
                            </div>

                            {/* Formula */}
                            <div className="mb-4 p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-sm">
                                <span className={label.color}>{label.formula}</span>
                            </div>

                            {/* Short Description */}
                            <p className="text-sm text-gray-400 leading-relaxed">{label.shortDesc}</p>

                            {/* Expand Indicator */}
                            <div className={`mt-4 flex items-center gap-2 text-xs ${label.color} transition-all`}>
                                <ArrowRight size={12} className={`transform transition-transform ${expandedId === label.id ? 'rotate-90' : ''}`} />
                                <span>{expandedId === label.id ? 'Collapse' : 'Expand for details'}</span>
                            </div>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {expandedId === label.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-white/10 bg-black/20"
                                >
                                    <div className="p-6 space-y-4">
                                        {/* Full Description */}
                                        <div>
                                            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Mathematical Interpretation</h4>
                                            <p className="text-sm text-gray-300 leading-relaxed">{label.fullDesc}</p>
                                        </div>

                                        {/* Examples */}
                                        <div>
                                            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-2">Mapped Entity Examples</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {label.examples.map((ex, i) => (
                                                    <span key={i} className={`text-xs px-2 py-1 rounded ${label.bgColor} ${label.color} border ${label.borderColor}`}>
                                                        {ex}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Usage Context */}
                                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                                            <span>Source: NER11 Gold Taxonomy</span>
                                            <span>→ E27 Prediction Pipeline</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="text-center py-8 border-t border-white/10 mt-8">
                <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                    Super Labels aggregate 197 NER11 entity types into 16 mathematically tractable categories.
                    Each label has a governing equation that enables prediction, not just classification.
                    Click any card to see the mathematical interpretation and mapped entities.
                </p>
            </div>
        </div>
    );
};


const PredictionPipeline: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <PipelineItem
                step="01"
                title="Feature Extraction"
                subtitle="T=0"
                desc="Extract current state vector P(t) from Neo4j. Compute aggregated Super Label values. Calculate instantaneous derivative dP/dt."
                icon={<Database />}
            />
            <PipelineItem
                step="02"
                title="Trajectory Sampling"
                subtitle="Simulation"
                desc="Run 1,000 Monte Carlo simulations. Apply Shock Response Equation (Eq 4). Apply Resilience damping factors."
                icon={<MonitorIcon />}
            />
            <PipelineItem
                step="03"
                title="Ensemble Aggregation"
                subtitle="T+Δt"
                desc="Compute posterior probability distribution (Eq 5). Calculate final Entropy H(t+Δt). Generate 95% Confidence Intervals."
                icon={<GitBranch />}
            />
        </div>
    );
};

const PipelineItem: React.FC<{ step: string, title: string, subtitle: string, desc: string, icon: any }> = ({ step, title, subtitle, desc, icon }) => (
    <div className="relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 group hover:border-oxot-blue hover:bg-white/[0.06] transition-all duration-300">
        <div className="absolute -top-6 left-8 w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-oxot-blue shadow-xl group-hover:scale-110 group-hover:shadow-oxot-blue/20 transition-all duration-300">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div className="mt-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">{title}</h3>
                    <div className="text-xs font-mono text-oxot-blue uppercase tracking-widest">{subtitle}</div>
                </div>
                <div className="text-5xl font-black text-white/5 font-mono">{step}</div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed text-balance">{desc}</p>
        </div>
    </div>
)

const Neo4jEngine: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Live Execution
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-white">Operationalizing<br /><span className="text-oxot-blue">Psychohistory.</span></h2>
                <p className="text-gray-400 mb-12 font-light text-xl leading-relaxed text-balance">
                    The E27 engine is not a simulation—it is live code running directly within the Neo4j Graph Data Science (GDS) library. We utilize custom Cypher procedures to execute the calculus in real-time.
                </p>

                <div className="space-y-4">
                    <FunctionItem name="custom.psychohistory.epidemicThreshold" args="(beta, gamma, connections)" desc="Calculates R0 for malware impact modeling" />
                    <FunctionItem name="custom.psychohistory.isingDynamics" args="(m, beta, J, z, h)" desc="Models security policy adoption spread" />
                    <FunctionItem name="custom.psychohistory.granovetterCascade" args="(adopters, pop, threshold)" desc="Predicts cascading failures in supply chains" />
                </div>
            </div>

            <div className="bg-black/80 rounded-2xl border border-white/10 p-8 font-mono text-sm relative overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-12 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-4 text-gray-500 text-[10px] uppercase tracking-widest">neo4j-console --admin</span>
                </div>
                <div className="mt-8 text-green-400 space-y-4 text-xs md:text-sm">
                    <p className="text-gray-500"># Detect Seldon Crisis Probability</p>
                    <p><span className="text-oxot-red font-bold">MATCH</span> (sc:SeldonCrisis &#123;id: 'SC001'&#125;)</p>
                    <p><span className="text-oxot-red font-bold">MATCH</span> (ci:Indicator)-[:INDICATES]-&gt;(sc)</p>
                    <p><span className="text-oxot-red font-bold">WHERE</span> ci.value IS NOT NULL</p>
                    <p><span className="text-oxot-red font-bold">WITH</span> sc, collect(ci) as indicators</p>
                    <p><span className="text-oxot-red font-bold">RETURN</span> sc.name,</p>
                    <p className="pl-8">custom.psychohistory.bifurcationMu(</p>
                    <p className="pl-12 text-yellow-400">0.5, 0.3</p>
                    <p className="pl-8">) <span className="text-oxot-red font-bold">AS</span> crisis_param</p>
                    <div className="h-4"></div>
                    <p className="text-black bg-green-500 inline-block px-2 font-bold">
                        Result: "Financial Instability", 0.87 (CRITICAL)
                    </p>
                </div>
            </div>
        </div>
    );
};

const FunctionItem: React.FC<{ name: string; args: string; desc: string }> = ({ name, args, desc }) => (
    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-1 font-mono text-xs hover:border-oxot-blue transition-colors cursor-default group hover:bg-white/[0.06]">
        <div className="text-oxot-blue font-bold group-hover:text-white transition-colors text-sm">{name}</div>
        <div className="text-gray-500">{args}</div>
        <div className="text-white mt-1 opacity-70 border-t border-white/5 pt-2">{desc}</div>
    </div>
);

const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.fillStyle = '#0CA4D8';
            ctx.font = '15px monospace';
        }

        handleResize(); // Initial set

        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = Array(columns).fill(1).map(() => Math.random() * -100); // Randomize start
        const chars = "0123456789ABCDEFΣΠΩΔΨΦ";

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0CA4D8'; // OXOT Cyan/Blue

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />;
};
