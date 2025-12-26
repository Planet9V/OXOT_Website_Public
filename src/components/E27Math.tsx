"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sigma, Brain, Network, Activity, Database,
    GitBranch, Lock, Shield, Zap, Code,
    FileText, ArrowRight, Terminal, Cpu, Users,
    ChevronLeft
} from 'lucide-react';

interface E27MathProps {
    onBack?: () => void;
}

export default function E27Math({ onBack }: E27MathProps) {
    const [activeSection, setActiveSection] = useState(0);

    const sections = [
        { id: 'math', title: 'Mathematical Framework', icon: <Sigma size={16} /> },
        { id: 'schema', title: '16 Super Labels', icon: <Database size={16} /> },
        { id: 'pipeline', title: 'Prediction Pipeline', icon: <GitBranch size={16} /> },
        { id: 'neo4j', title: 'Graph Engine', icon: <Network size={16} /> }
    ];

    return (
        <div className="min-h-screen bg-transparent text-white font-mono selection:bg-oxot-red/30 uppercase font-black">
            {/* Background Matrix Effect */}
            <MatrixRain />

            {/* Sub-Header */}
            <div className="relative z-10 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 rounded-t-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-grey"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <div>
                            <h1 className="text-xl font-black flex items-center gap-3 tracking-tighter">
                                <Sigma className="text-oxot-red" />
                                E27 ENGINE CORE
                            </h1>
                            <div className="text-[9px] text-oxot-red opacity-50 tracking-[0.3em] font-black">SOVEREIGN_LOGIC_V3.5</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {sections.map((section, idx) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(idx)}
                                className={`
                                    px-4 py-2 rounded text-[10px] font-black flex items-center gap-2 transition-all border
                                    ${activeSection === idx
                                        ? 'bg-oxot-red text-white border-oxot-red shadow-[0_0_20px_rgba(214,0,0,0.3)]'
                                        : 'bg-white/5 text-grey border-white/10 hover:border-grey'}
                                `}
                            >
                                {section.icon}
                                <span className="hidden lg:inline tracking-widest">{section.title}</span>
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

const MathFramework: React.FC = () => (
    <div className="space-y-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter uppercase leading-none">
                SCIENTIFIC <span className="text-oxot-red italic font-light">PRIMACY.</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto lowercase tracking-tighter font-normal">
                Treating human behavior and technical entropy as mathematical objects in a high-dimensional topological space.
            </p>
        </div>

        <section className="py-16">
            <h2 className="text-2xl font-black text-white mb-12 text-center uppercase tracking-tighter">McKenney-Lacan Calculus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white/5 border-l-4 border-oxot-red rounded-r-xl space-y-6">
                    <Brain className="w-10 h-10 text-oxot-red" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter">The Psychometric Tensor</h3>
                    <div className="p-4 bg-black/60 rounded border border-white/5 font-mono text-xs text-oxot-red text-center italic">
                        P_i = [ D I ; S C ] ⊗ [ O C E A N ]
                    </div>
                    <p className="text-gray-400 text-sm lowercase tracking-tighter leading-relaxed font-normal">
                        Every actor is defined by a rank-2 tensor representing their personality structure. This allows us to mathematically model how individuals will react to stress and risk.
                    </p>
                </div>

                <div className="p-8 bg-white/5 border-l-4 border-oxot-blue rounded-r-xl space-y-6">
                    <Activity className="w-10 h-10 text-oxot-blue" />
                    <h3 className="text-2xl font-black uppercase tracking-tighter">The Interaction Hamiltonian</h3>
                    <div className="p-4 bg-black/60 rounded border border-white/5 font-mono text-xs text-oxot-blue text-center italic">
                        H = Σ ½ m v² + Σ V_ij(x_i, x_j)
                    </div>
                    <p className="text-gray-400 text-sm lowercase tracking-tighter leading-relaxed font-normal">
                        We model the &quot;energy&quot; of incident response. Dissonance and Consonance are calculated to predict team performance and potential system collapse.
                    </p>
                </div>
            </div>
        </section>

        <section className="py-16">
            <h2 className="text-2xl font-black text-white mb-12 text-center uppercase tracking-tighter">Core Equations</h2>
            <div className="space-y-6">
                {[
                    { title: "State Evolution", latex: "dP/dt = Σ α_i S_i(t) + ε(t)", color: "oxot-red" },
                    { title: "System Entropy", latex: "S = k_B ln Ω = -Σ p_i ln p_i", color: "white" },
                    { title: "Bifurcation Theory", latex: "dx/dt = μ + x²", color: "oxot-blue" },
                ].map((eq, i) => (
                    <div key={i} className={`p-8 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between group hover:border-${eq.color} transition-all`}>
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono text-grey tracking-widest uppercase">Equation_0{i + 1}</span>
                            <h3 className="text-xl font-black uppercase tracking-widest">{eq.title}</h3>
                        </div>
                        <div className={`font-mono text-lg md:text-2xl text-${eq.color} italic group-hover:scale-110 transition-transform`}>
                            {eq.latex}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

const SuperLabelsSchema = () => (
    <div className="space-y-12">
        <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tighter uppercase">The Ontology of Risk</h2>
            <p className="text-gray-400 lowercase tracking-tighter font-normal max-w-2xl mx-auto italic">
                Normalization of 197 entity types into 16 consistent processing labels.
            </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Control", "Impact", "Threat", "Behavior", "Resilience", "Asset", "Dependency", "Temporality"].map((label, i) => (
                <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-xl hover:border-oxot-red transition-all text-center">
                    <div className="text-2xl font-black text-oxot-red mb-2 opacity-20 font-mono">0{i + 1}</div>
                    <h4 className="font-black uppercase tracking-widest text-sm text-white">{label}</h4>
                </div>
            ))}
        </div>
    </div>
);

const PredictionPipeline = () => (
    <div className="max-w-4xl mx-auto space-y-16 py-12">
        <div className="text-center mb-16">
            <h2 className="text-2xl font-black tracking-tighter uppercase leading-none">Computational Pipeline</h2>
        </div>
        {[
            { step: "01", title: "Feature Extraction", desc: "Extract current state vector P(t) from Neo4j." },
            { step: "02", title: "Trajectory Sampling", desc: "Run 1,000 Monte Carlo simulations for shock response." },
            { step: "03", title: "Ensemble Aggregation", desc: "Compute posterior probability distribution via Eq 5." },
        ].map((s, i) => (
            <div key={i} className="flex gap-8 items-start group">
                <div className="w-16 h-16 rounded-full bg-oxot-red text-white flex items-center justify-center font-black text-xl italic shrink-0 group-hover:scale-110 transition-transform">
                    {s.step}
                </div>
                <div className="pt-2 border-b border-white/10 pb-8 flex-1">
                    <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">{s.title}</h3>
                    <p className="text-gray-400 lowercase tracking-tighter font-normal text-sm">{s.desc}</p>
                </div>
            </div>
        ))}
    </div>
);

const Neo4jEngine = () => (
    <div className="grid lg:grid-cols-2 gap-12 py-12">
        <div className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Operationalizing Psychohistory</h2>
            <p className="text-gray-400 lowercase tracking-tighter font-normal text-lg italic leading-relaxed">
                The E27 engine is implemented directly within Neo4j using custom Cypher functions.
            </p>
            <div className="space-y-2">
                {["epidemicThreshold(beta, gamma)", "isingDynamics(m, beta, J)", "granovetterCascade(adopters, pop)", "bifurcationMu(capacity, load)"].map((fn, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-lg font-mono text-xs text-oxot-blue lowercase tracking-tighter">
                        {fn}
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-black border-2 border-grey rounded-xl p-6 relative overflow-hidden font-mono text-[10px] md:text-xs">
            <div className="flex gap-2 mb-6 opacity-50 uppercase font-black border-b border-white/10 pb-4">
                <span>neo4j@oxot-core:~$</span>
            </div>
            <div className="space-y-4 text-green-400">
                <div>
                    <span className="text-oxot-red font-black uppercase">MATCH</span> (sc:SeldonCrisis &#123;id: &apos;SC001&apos;&#125;)<br />
                    <span className="text-oxot-red font-black uppercase">MATCH</span> (ci:Indicator)-[:INDICATES]-&gt;(sc)<br />
                    <span className="text-oxot-red font-black uppercase">WHERE</span> ci.value IS NOT NULL
                </div>
                <div className="bg-green-900/10 p-4 border border-green-500/20 rounded">
                    Result: &quot;Asset_Decay_Detected&quot;, 0.87 (CRITICAL)
                </div>
            </div>
        </div>
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
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        };
        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);
    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-10" />;
};
