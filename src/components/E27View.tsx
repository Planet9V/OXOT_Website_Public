'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Sigma, Brain, Network, Activity, Database,
    GitBranch, Lock, Shield, Zap, Code,
    FileText, ArrowRight, Terminal, Cpu, Users, ChevronLeft, ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import E27HyperVisual from './E27HyperVisual';
import { OXOTLogo } from './branding/OXOTLogo';
import { PageHeader } from './branding/PageHeader';

export default function E27View() {
    const [activeSection, setActiveSection] = useState(0);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const sections = [
        { id: 'math', title: 'Mathematical Framework', icon: <Sigma size={16} /> },
        { id: 'schema', title: '16 Super Labels', icon: <Database size={16} /> },
        { id: 'pipeline', title: 'Prediction Pipeline', icon: <GitBranch size={16} /> },
        { id: 'neo4j', title: 'Graph Engine', icon: <Network size={16} /> }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white font-mono selection:bg-oxot-red/30 pb-20 overflow-x-hidden">
            {/* Background Matrix Effect */}
            <MatrixRain />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 p-4">
                <motion.div style={{ opacity, scale }} className="text-center max-w-7xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8"
                    >
                        <OXOTLogo size="lg" animated={true} />
                    </motion.div>

                    <PageHeader
                        title="SOVEREIGN LOGIC"
                        subtitle="E27 ENGINE CORE // The Calculus of McKenney-Lacan // Predictive Applications."
                        variant="hero"
                        accent="red"
                        className="mb-12"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
                            A fully autonomous logic engine for cross-domain threat prediction.
                            Give it a scenario, define the variables, and it <span className="text-red-500 font-bold border-b border-red-500/50">will</span> reveal the outcome.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Initialize</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </motion.div>
            </section>

            {/* Header */}
            <div className="relative z-50 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/concepts')}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-xl font-black flex items-center gap-2 tracking-tighter uppercase">
                                <Sigma className="text-oxot-red" />
                                E27 Engine Core
                            </h1>
                            <div className="text-[9px] text-oxot-red opacity-70 tracking-[0.3em] font-black uppercase">Sovereign_Logic_V2.1</div>
                        </div>
                    </div>
                    <div className="flex gap-2 bg-black/50 p-1 rounded-lg border border-white/10 overflow-x-auto max-w-full">
                        {sections.map((section, idx) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(idx)}
                                className={`
                                    px-4 py-2 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap
                                    ${activeSection === idx
                                        ? 'bg-oxot-red text-white shadow-[0_0_15px_rgba(214,0,0,0.4)]'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                {section.icon}
                                <span className="hidden md:inline">{section.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeSection === 0 && <MathFramework />}
                        {activeSection === 1 && <SuperLabelsSchema />}
                        {activeSection === 2 && <PredictionPipeline />}
                        {activeSection === 3 && <Neo4jEngine />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// ==================== COMPONENTS ====================

const MathFramework: React.FC = () => {
    return (
        <div className="space-y-24">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
                    The Precision of <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-blue to-white">Logic.</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
                    Modeling the dynamics of cyber-social systems through rigorous mathematical formalism.
                </p>
                <div className="h-[600px] w-full">
                    <E27HyperVisual />
                </div>
            </div>

            {/* === 1. McKENNEY-LACAN CALCULUS SECTION === */}
            <section className="py-8">
                <div className="flex items-center gap-4 mb-12 justify-center">
                    <div className="h-px bg-white/20 w-12"></div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">The Calculus of McKenney-Lacan</h2>
                    <div className="h-px bg-white/20 w-12"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white/5 border-l-4 border-oxot-blue rounded-r-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Brain size={100} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">The Psychometric Tensor</h3>
                        <div className="p-4 bg-black/60 rounded border border-oxot-blue/30 font-mono text-xs md:text-sm text-oxot-blue mb-6 shadow-inner">
                            P_i = [ D I ; S C ] ⊗ [ O C E A N ]
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            We treat human behavior within the system not as a variable, but as a mathematical object—a <strong>Tensor in a Topological Space</strong>. By mapping static personality structures (DISC + Big 5) of workers, defenders, and APT groups, we can mathematically model their reaction to stress, authority, and risk.
                        </p>
                    </div>

                    <div className="p-8 bg-white/5 border-l-4 border-oxot-red rounded-r-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity size={100} />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">The Interaction Hamiltonian</h3>
                        <div className="p-4 bg-black/60 rounded border border-oxot-red/30 font-mono text-xs md:text-sm text-oxot-red mb-6 shadow-inner">
                            H = Σ ½ m v² + Σ V_ij(x_i, x_j)
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Modeling the "energy" of incident response. We calculate the <strong>Dissonance</strong> (friction) and <strong>Consonance</strong> (flow) between these human tensors to predict team performance and verify decision-making under the "fog of war."
                        </p>
                    </div>
                </div>
            </section>

            {/* === 2. PREDICTIVE APPLICATIONS SECTION === */}
            <section className="py-8">
                <div className="flex items-center gap-4 mb-12 justify-center">
                    <div className="h-px bg-white/20 w-12"></div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Predictive Applications</h2>
                    <div className="h-px bg-white/20 w-12"></div>
                </div>

                <div className="space-y-6">
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

            {/* === 3. CORE EQUATIONS === */}
            <section className="bg-white/5 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-tighter">Core Equations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <MiniEquation title="State Evolution" latex="dP/dt = Σ α_i S_i(t) + ε(t)" />
                        <MiniEquation title="System Entropy" latex="S = -Σ p_i ln p_i" />
                        <MiniEquation title="Influence Prop" latex="I_j(t) = Σ w_ij s_i(t)" />
                        <MiniEquation title="Shock Response" latex="ΔP(t) = (dP/dt)Δt + ∫..." />
                        <MiniEquation title="Prediction Integral" latex="P(t+Δt|H_t) = ∫..." />
                        <MiniEquation title="Bayesian Update" latex="P(A|B) = P(B|A)P(A)/P(B)" />
                    </div>
                </div>
            </section>
        </div>
    );
};

const EquationBlock: React.FC<{ num: string, title: string, subtitle: string, latex: string, desc: string, color: string, borderColor: string }> = ({ num, title, subtitle, latex, desc, color, borderColor }) => (
    <div className={`p-6 md:p-8 bg-black/40 border-l-4 ${borderColor} rounded-r-xl flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:bg-white/5 transition-colors group`}>
        <div className={`text-4xl font-black opacity-30 ${color} shrink-0`}>{num}</div>
        <div className="flex-1 space-y-4 w-full min-w-0">
            <div>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter break-words">{title}</h3>
                <p className={`text-xs md:text-sm font-mono uppercase tracking-widest ${color} opacity-80 break-words`}>{subtitle}</p>
            </div>
            <div className="py-4 px-4 md:px-6 bg-black rounded border border-white/10 font-mono text-sm md:text-lg text-white shadow-inner overflow-x-auto">
                {latex}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed border-l border-white/10 pl-4">
                {desc}
            </p>
        </div>
    </div>
);

const MiniEquation: React.FC<{ title: string, latex: string }> = ({ title, latex }) => (
    <div className="p-4 bg-black/60 rounded border border-white/10 hover:border-oxot-red transition-colors text-center h-full flex flex-col justify-center">
        <div className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-2">{title}</div>
        <div className="font-mono text-oxot-blue text-xs md:text-sm break-all">{latex}</div>
    </div>
)


const SuperLabelsSchema: React.FC = () => {
    const labels = [
        { id: '01', name: 'Control', count: 47, desc: 'Access controls, governance, permissions' },
        { id: '02', name: 'Impact', count: 38, desc: 'Severity levels, consequence metrics' },
        { id: '03', name: 'Threat', count: 41, desc: 'Attack vectors, adversary capabilities' },
        { id: '04', name: 'Behavior', count: 18, desc: 'User/system actions, patterns' },
        { id: '05', name: 'Resilience', count: 21, desc: 'Recovery, redundancy, adaptation' },
        { id: '06', name: 'Asset', count: 14, desc: 'Resources, infrastructure, data' },
        { id: '07', name: 'Dependency', count: 12, desc: 'Service chains, integration points' },
        { id: '08', name: 'Temporality', count: 8, desc: 'Time-dependent properties, windows' },
    ];

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Ontology of Risk</h2>
                <p className="text-gray-400 max-w-2xl mx-auto font-light">
                    A unified taxonomy mapping 197 NER11 entity types to 16 Super Labels. We drill down from the reference architecture of the sector (Layer 0) to the component level via a <strong>20-hop knowledge graph</strong>, ingesting telemetry from Dragos, Nozomi, and Cisco to inform the digital twin.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {labels.map((label) => (
                    <motion.div
                        key={label.id}
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-oxot-red transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-4xl font-black text-white/10 group-hover:text-oxot-red/20 transition-colors">
                                {label.id}
                            </div>
                            <div className="text-[10px] font-mono text-oxot-blue bg-oxot-blue/10 px-2 py-1 rounded uppercase tracking-wider">
                                {label.count} Entities
                            </div>
                        </div>
                        <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{label.name}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">{label.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const PredictionPipeline: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center">
                <h2 className="text-4xl font-black tracking-tighter uppercase">Prediction Pipeline</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-light">
                    Using math, not bias. We decompose external influences (CVES, CAPEC, MITRE) and internal decision-making to optimize prioritization via our <strong>NOW/NEXT/NEVER</strong> framework.
                </p>
                <div className="w-24 h-1 bg-oxot-red mx-auto mt-6"></div>
            </div>

            <div className="relative border-l-2 border-white/10 ml-8 md:ml-0 md:border-l-0 md:space-y-0 space-y-12">
                {/* Steps would be better as a vertical list with nice connectors */}
                <div className="space-y-12">
                    <PipelineItem
                        step="01"
                        title="Feature Extraction (T=0)"
                        desc="Extract current state vector P(t) from Neo4j. Compute aggregated Super Label values. Calculate instantaneous derivative dP/dt."
                    />
                    <PipelineItem
                        step="02"
                        title="Trajectory Sampling"
                        desc="Run 1,000 Monte Carlo simulations. Apply Shock Response Equation (Eq 4). Apply Resilience damping factors."
                    />
                    <PipelineItem
                        step="03"
                        title="Ensemble Aggregation"
                        desc="Compute posterior probability distribution (Eq 5). Calculate final Entropy H(t+Δt). Generate 95% Confidence Intervals."
                    />
                </div>
            </div>
        </div>
    );
};

const PipelineItem: React.FC<{ step: string, title: string, desc: string }> = ({ step, title, desc }) => (
    <div className="flex gap-8 group">
        <div className="w-16 h-16 bg-black border-2 border-white/20 rounded-full flex items-center justify-center font-black text-xl text-white group-hover:border-oxot-red group-hover:text-oxot-red transition-colors shrink-0 z-10 relative">
            {step}
        </div>
        <div className="flex-1 pt-2 pb-8 border-b border-white/10 group-last:border-0">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{title}</h3>
            <p className="text-gray-400 font-light leading-relaxed">{desc}</p>
        </div>
    </div>
)

const Neo4jEngine: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Operationalizing<br /><span className="text-oxot-blue">Psychohistory.</span></h2>
                <p className="text-gray-400 mb-8 font-light text-lg leading-relaxed">
                    The E27 engine is not a simulation—it is live code running directly within the Neo4j Graph Data Science (GDS) library. We utilize custom Cypher procedures to execute the calculus in real-time.
                </p>

                <div className="space-y-3">
                    <FunctionItem name="custom.psychohistory.epidemicThreshold" args="(beta, gamma, connections)" desc="Calculates R0" />
                    <FunctionItem name="custom.psychohistory.isingDynamics" args="(m, beta, J, z, h)" desc="Models policy adoption" />
                    <FunctionItem name="custom.psychohistory.granovetterCascade" args="(adopters, pop, threshold)" desc="Predicts adoption" />
                </div>
            </div>

            <div className="bg-black rounded-xl border border-white/20 p-6 font-mono text-sm relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-8 bg-white/5 flex items-center px-4 gap-2 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-oxot-red"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-500 text-[10px] uppercase tracking-widest">neo4j-console --admin</span>
                </div>
                <div className="mt-8 text-green-400 space-y-2 text-xs md:text-sm">
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
    <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex flex-col gap-1 font-mono text-xs hover:border-oxot-blue transition-colors cursor-default">
        <div className="text-oxot-blue font-bold">{name}</div>
        <div className="text-gray-500">{args}</div>
        <div className="text-white mt-1 opacity-70 border-t border-white/5 pt-1">{desc}</div>
    </div>
);

const MatrixRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = Array(columns).fill(1);
        const chars = "0123456789ABCDEFΣΠΩΔΨΦ";

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#D60000'; // OXOT Red
            ctx.font = '15px monospace';

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
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20" />;
};
