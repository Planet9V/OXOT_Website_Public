import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Sigma, Brain, Network, Activity, Database,
    GitBranch, Lock, Shield, Zap, Code,
    FileText, ArrowRight, Terminal, Cpu, Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export const E27View: React.FC = () => {
    const [activeSection, setActiveSection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const sections = [
        { id: 'math', title: 'Mathematical Framework', icon: <Sigma /> },
        { id: 'schema', title: '16 Super Labels', icon: <Database /> },
        { id: 'pipeline', title: 'Prediction Pipeline', icon: <GitBranch /> },
        { id: 'neo4j', title: 'Graph Engine', icon: <Network /> }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-purple-500/30">
            {/* Background Matrix Effect */}
            <MatrixRain />

            {/* Header */}
            <div className="relative z-10 border-b border-purple-900/30 bg-black/80 backdrop-blur-md sticky top-0">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/concepts')}
                            className="p-2 hover:bg-purple-900/20 rounded-lg transition-colors text-purple-400"
                        >
                            ← BACK
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <Sigma className="text-purple-500" />
                                E27 ENGINE
                            </h1>
                            <div className="text-xs text-purple-400/60 tracking-widest">AEON CYBER DIGITAL TWIN v2.1</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {sections.map((section, idx) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(idx)}
                                className={`
                                    px-4 py-2 rounded text-sm flex items-center gap-2 transition-all
                                    ${activeSection === idx
                                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]'
                                        : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/40'}
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
        <div className="space-y-20">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                    The Precision of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Mathematics</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Modeling the dynamics of cyber-social systems through mathematical precision.
                </p>
            </div>

            {/* === 1. McKENNEY-LACAN CALCULUS SECTION (Moved to Beginning) === */}
            <section className="py-16">
                <h2 className="text-2xl font-black text-white mb-8 text-center">THE CALCULUS OF McKENNEY-LACAN</h2>
                <p className="text-xl text-pink-400 text-center mb-16 max-w-3xl mx-auto">
                    Treating human behavior as a mathematical object—a Tensor in a Topological Space.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-pink-900/10 border border-pink-500/30 rounded-xl">
                        <Brain className="w-12 h-12 text-pink-500 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">The Psychometric Tensor</h3>
                        <div className="p-4 bg-black/40 rounded border border-pink-500/20 font-mono text-sm text-pink-300 mb-6">
                            P_i = [ D I ; S C ] ⊗ [ O C E A N ]
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Every actor is defined by a rank-2 tensor representing their static personality structure
                            (DISC + Big 5). This allows us to mathematically model how specific individuals will
                            react to stress, authority, and risk.
                        </p>
                    </div>

                    <div className="p-8 bg-pink-900/10 border border-pink-500/30 rounded-xl">
                        <Activity className="w-12 h-12 text-pink-500 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">The Interaction Hamiltonian</h3>
                        <div className="p-4 bg-black/40 rounded border border-pink-500/20 font-mono text-sm text-pink-300 mb-6">
                            H = Σ ½ m v² + Σ V_ij(x_i, x_j)
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            We model the "energy" of a meeting or incident response.
                            <span className="text-white font-bold"> Dissonance</span> (friction) and
                            <span className="text-white font-bold"> Consonance</span> (flow) are calculated
                            to predict team performance and potential "Seldon Crises" (collapse of collaboration).
                        </p>
                    </div>
                </div>
            </section>

            {/* === 2. PREDICTIVE APPLICATIONS SECTION === */}
            <section className="py-16">
                <h2 className="text-2xl font-black text-white mb-8 text-center">PREDICTIVE APPLICATIONS</h2>
                <p className="text-xl text-cyan-400 text-center mb-16 max-w-3xl mx-auto">
                    Real-world mathematical models for forecasting cyber-social dynamics and system collapse.
                </p>

                <div className="space-y-12">
                    {/* Application 1: Epidemic Thresholds */}
                    <div className="p-8 bg-gradient-to-r from-red-900/10 to-orange-900/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Network className="w-8 h-8 text-red-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">1. Epidemic Thresholds (R₀)</h3>
                                <p className="text-red-400 mb-4">Malware Spread & Network Infection Dynamics</p>
                                <div className="p-4 bg-black/40 rounded border border-red-500/20 font-mono text-lg text-red-300 mb-6">
                                    R₀ = (β/γ) × λ_max(A)
                                </div>
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-black/20 rounded border border-red-500/20">
                                        <div className="text-red-400 font-bold mb-2">β (Infection Rate)</div>
                                        <p className="text-gray-400 text-sm">Vulnerability severity, exploit availability, user click rate</p>
                                    </div>
                                    <div className="p-4 bg-black/20 rounded border border-red-500/20">
                                        <div className="text-red-400 font-bold mb-2">γ (Recovery Rate)</div>
                                        <p className="text-gray-400 text-sm">MTTR, patch cycle frequency, automated remediation</p>
                                    </div>
                                    <div className="p-4 bg-black/20 rounded border border-red-500/20">
                                        <div className="text-red-400 font-bold mb-2">λ_max (Spectral Radius)</div>
                                        <p className="text-gray-400 text-sm">Network topology, lateral movement paths, AD trusts</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    <span className="text-white font-bold">The Kill Switch:</span> To stop an epidemic (R₀ &lt; 1),
                                    decrease β (disable vulnerable service), increase γ (faster remediation), or decrease λ_max
                                    (network segmentation). Prioritize patching "hub" nodes (Domain Controllers, Jump Boxes) to collapse the spectral radius.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application 2: Ising Dynamics */}
                    <div className="p-8 bg-gradient-to-r from-blue-900/10 to-cyan-900/10 border border-blue-500/30 rounded-xl">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Users className="w-8 h-8 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">2. Ising Dynamics</h3>
                                <p className="text-blue-400 mb-4">Opinion Propagation & Security Culture</p>
                                <div className="p-4 bg-black/40 rounded border border-blue-500/20 font-mono text-lg text-blue-300 mb-6">
                                    dm/dt = -m + tanh(β(Jzm + h))
                                </div>
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-black/20 rounded border border-blue-500/20">
                                        <div className="text-blue-400 font-bold mb-2">m (Magnetization)</div>
                                        <p className="text-gray-400 text-sm">Average group opinion: +1 = security aware, -1 = negligent</p>
                                    </div>
                                    <div className="p-4 bg-black/20 rounded border border-blue-500/20">
                                        <div className="text-blue-400 font-bold mb-2">J (Interaction)</div>
                                        <p className="text-gray-400 text-sm">Peer influence strength, team cohesion, social proof</p>
                                    </div>
                                    <div className="p-4 bg-black/20 rounded border border-blue-500/20">
                                        <div className="text-blue-400 font-bold mb-2">h (External Field)</div>
                                        <p className="text-gray-400 text-sm">Training programs, CEO mandates, phishing campaigns</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    <span className="text-white font-bold">Phase Transition:</span> Below critical temperature T_c,
                                    organizations spontaneously magnetize into strong security culture. Above T_c, chaos reigns.
                                    <span className="text-white font-bold"> Hysteresis Effect:</span> Once frozen in bad state (m = -1),
                                    small positive interventions won't flip it—requires strong shock (crisis) to overcome memory.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application 3: Granovetter Thresholds */}
                    <div className="p-8 bg-gradient-to-r from-purple-900/10 to-pink-900/10 border border-purple-500/30 rounded-xl">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <GitBranch className="w-8 h-8 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">3. Granovetter Thresholds</h3>
                                <p className="text-purple-400 mb-4">Attack Cascades & Critical Mass</p>
                                <div className="p-4 bg-black/40 rounded border border-purple-500/20 font-mono text-lg text-purple-300 mb-6">
                                    r(t+1) = N × F(r(t)/N)
                                </div>
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-black/20 rounded border border-purple-500/20">
                                        <div className="text-purple-400 font-bold mb-2">Instigators (τ = 0)</div>
                                        <p className="text-gray-400 text-sm">Vulnerable nodes infected immediately (zero-day targets)</p>
                                    </div>
                                    <div className="p-4 bg-black/20 rounded border border-purple-500/20">
                                        <div className="text-purple-400 font-bold mb-2">Followers (τ &gt; 0)</div>
                                        <p className="text-gray-400 text-sm">Infected only if neighbors compromised (lateral movement)</p>
                                    </div>
                                    <div className="p-4 bg-black/20 rounded border border-purple-500/20">
                                        <div className="text-purple-400 font-bold mb-2">Radicals (τ = 1)</div>
                                        <p className="text-gray-400 text-sm">Hardened nodes, never succumb unless everyone does</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    <span className="text-white font-bold">Cascade Condition:</span> The curve y = F(x) must cross
                                    y = x from above to trigger self-sustaining cascade.
                                    <span className="text-white font-bold"> Blocking Strategy:</span> Insert high-threshold nodes
                                    (firewalls, air gaps) to break the chain. Calculate minimum blocking set to stop propagation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application 4: Bifurcation Theory */}
                    <div className="p-8 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border border-yellow-500/30 rounded-xl">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Zap className="w-8 h-8 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">4. Bifurcation Theory</h3>
                                <p className="text-yellow-400 mb-4">Seldon Crisis Detection & System Collapse</p>
                                <div className="p-4 bg-black/40 rounded border border-yellow-500/20 font-mono text-lg text-yellow-300 mb-6">
                                    dx/dt = μ + x²
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-black/20 rounded border border-yellow-500/20">
                                        <div className="text-yellow-400 font-bold mb-2">Stable Regime (μ &lt; 0)</div>
                                        <p className="text-gray-400 text-sm">Two fixed points: stable node (x_s = -√(-μ)) and unstable tipping point (x_u = +√(-μ))</p>
                                    </div>
                                    <div className="p-4 bg-black/20 rounded border border-yellow-500/20">
                                        <div className="text-yellow-400 font-bold mb-2">Crisis (μ = 0)</div>
                                        <p className="text-gray-400 text-sm">Fixed points collide and annihilate. System has no stable state → collapse (x → ∞)</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    <span className="text-white font-bold">Seldon Crisis Example:</span> Database at 90% capacity
                                    (μ ≈ -0.1) is stable but slow. Traffic spike pushes μ &gt; 0, entering death spiral (thrashing).
                                    No amount of tuning fixes it—the stable state no longer exists.
                                    <span className="text-white font-bold"> Detection:</span> Distance to bifurcation ∝ √|μ|.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application 5: Critical Slowing Down */}
                    <div className="p-8 bg-gradient-to-r from-green-900/10 to-emerald-900/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Activity className="w-8 h-8 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">5. Critical Slowing Down</h3>
                                <p className="text-green-400 mb-4">Early Warning Signals & Resilience Loss</p>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-black/40 rounded border border-green-500/20">
                                        <div className="text-green-400 font-bold mb-3">Autocorrelation (ρ)</div>
                                        <div className="font-mono text-sm text-green-300 mb-3">ρ(τ) = E[(X_t - μ)(X_(t+τ) - μ)] / σ²</div>
                                        <p className="text-gray-400 text-sm">As system approaches collapse, autocorrelation increases (ρ → 1). State at time t highly predictive of t+1.</p>
                                    </div>
                                    <div className="p-4 bg-black/40 rounded border border-green-500/20">
                                        <div className="text-green-400 font-bold mb-3">Variance (σ²)</div>
                                        <div className="font-mono text-sm text-green-300 mb-3">σ² = E[(X_t - μ)²]</div>
                                        <p className="text-gray-400 text-sm">As system approaches collapse, variance increases (σ² → ∞). System wanders further from equilibrium.</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    <span className="text-white font-bold">The Canary Metric:</span> Traditional monitoring watches
                                    for threshold breaches (CPU &gt; 90%). CSD monitors <em>statistical anomalies in fluctuations</em>.
                                    <span className="text-white font-bold"> DDoS Example:</span> CPU at 50% looks "Green,"
                                    but autocorrelation jumped from 0.2 to 0.8—system losing elasticity. RED ALERT before metrics hit red zone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === 3. E27 PSYCHOHISTORY ENGINE SECTION === */}
            <section className="bg-gradient-to-b from-purple-900/10 to-black border-y border-purple-500/20 py-20 -mx-6 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-6 mb-12">
                        <Sigma className="w-16 h-16 text-purple-500" />
                        <div>
                            <h2 className="text-2xl font-black text-white">E27 PSYCHOHISTORY ENGINE</h2>
                            <p className="text-purple-400 text-lg">Mathematical Prediction of Cyber-Social Systems</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="p-6 bg-black/40 border border-purple-500/30 rounded-xl">
                                <h3 className="text-xl font-bold text-white mb-4">Core Equations</h3>
                                <div className="space-y-4 font-mono text-sm">
                                    <div className="p-3 bg-purple-900/20 rounded border border-purple-500/20">
                                        <div className="text-purple-300 mb-1">// State Evolution</div>
                                        <div className="text-white">dP/dt = f(C,D,R,A,B) + ε(t)</div>
                                    </div>
                                    <div className="p-3 bg-purple-900/20 rounded border border-purple-500/20">
                                        <div className="text-purple-300 mb-1">// System Entropy</div>
                                        <div className="text-white">H(t) = -Σ p_i * log(p_i)</div>
                                    </div>
                                    <div className="p-3 bg-purple-900/20 rounded border border-purple-500/20">
                                        <div className="text-purple-300 mb-1">// Influence Propagation</div>
                                        <div className="text-white">I_j(t) = Σ w_ij * s_i(t)</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">16 Super Labels</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Control", "Impact", "Threat", "Behavior", "Resilience", "Asset", "Dependency", "Temporality", "Probability", "Detection", "Prevention", "Configuration", "Performance", "Compliance", "Intelligence", "Relationship"].map((label, i) => (
                                        <span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-300">
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full"></div>
                            <div className="relative border-l-2 border-purple-500/30 pl-8 space-y-12">
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-black"></div>
                                    <h4 className="text-white font-bold mb-2">Input Layer</h4>
                                    <p className="text-gray-400 text-sm">NER11 Gold Entities (197 types) + Real-time Telemetry</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-black"></div>
                                    <h4 className="text-white font-bold mb-2">Schema Layer</h4>
                                    <p className="text-gray-400 text-sm">Normalization into 16 Super Labels for consistent processing</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-black"></div>
                                    <h4 className="text-white font-bold mb-2">Engine Processing</h4>
                                    <p className="text-gray-400 text-sm">Differential equations solve for future system state</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-black"></div>
                                    <h4 className="text-white font-bold mb-2">Prediction Output</h4>
                                    <p className="text-gray-400 text-sm">Short (7d), Mid (30d), and Long-term (90d) risk forecasts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === 4. CORE EQUATIONS SECTION (Moved to Bottom, Improved Styling) === */}
            <section className="py-16">
                <h2 className="text-2xl font-black text-white mb-8 text-center">CORE EQUATIONS</h2>
                <p className="text-xl text-purple-400 text-center mb-16 max-w-3xl mx-auto">
                    Five fundamental equations governing cyber-social system dynamics.
                </p>

                <div className="space-y-8">
                    {[
                        {
                            num: 1,
                            title: "State Evolution",
                            latex: "dP/dt = Σ α_i S_i(t) + ε(t)",
                            desc: "The fundamental equation governing the trajectory of an organization in the risk-state space. S_i(t) represents the aggregated signal strength of the 5 primary Super Labels.",
                            color: "purple"
                        },
                        {
                            num: 2,
                            title: "System Entropy & Microstates",
                            latex: "S = k_B \\ln \\Omega = -Σ p_i \\ln p_i",
                            desc: "Measures the 'missing information' about the system state. High entropy implies high 'Multiplicity' (Ω) of possible microstates (user actions), making the macrostate (risk) harder to predict.",
                            color: "pink"
                        },
                        {
                            num: 3,
                            title: "Influence Propagation",
                            latex: "I_j(t) = Σ w_ij s_i(t) + Σ c_k(t) r_jk",
                            desc: "Models how a signal (vulnerability, policy change) propagates through the graph, accounting for topology and contextual modifiers.",
                            color: "blue"
                        },
                        {
                            num: 4,
                            title: "Shock Response",
                            latex: "ΔP(t) = (dP/dt)|_t Δt + ∫ h(τ) x(t+Δt-τ) dτ",
                            desc: "Predicts the system's reaction to an exogenous shock (e.g., zero-day exploit). h(τ) characterizes resilience.",
                            color: "cyan"
                        },
                        {
                            num: 5,
                            title: "Prediction Integral",
                            latex: "P(t+Δt|H_t) = ∫ P(t+Δt|state) p(state|H_t) d(state)",
                            desc: "The Bayesian update step that generates the final probability distribution of future states.",
                            color: "emerald"
                        }
                    ].map((eq) => (
                        <div key={eq.num} className={`p-8 bg-gradient-to-r from-${eq.color}-900/10 to-black border border-${eq.color}-500/30 rounded-xl`}>
                            <div className="flex items-start gap-6">
                                <div className={`w-16 h-16 bg-${eq.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    <span className={`text-xl font-black text-${eq.color}-400`}>{eq.num}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-2xl font-bold text-white mb-4`}>{eq.title}</h3>
                                    <div className={`p-4 bg-black/40 rounded border border-${eq.color}-500/20 font-mono text-lg text-${eq.color}-300 mb-4`}>
                                        {eq.latex}
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{eq.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const EquationCard: React.FC<{ title: string; latex: string; desc: string; color: string }> = ({ title, latex, desc, color }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-8 rounded-2xl bg-gray-900/50 border border-${color}-500/30 backdrop-blur-sm relative overflow-hidden group`}
    >
        <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`}></div>
        <div className="relative z-10">
            <h3 className={`text-${color}-400 font-bold uppercase tracking-wider mb-4`}>{title}</h3>
            <div className="bg-black/50 p-6 rounded-lg mb-4 font-mono text-xl md:text-2xl text-center shadow-inner border border-white/5">
                {latex}
            </div>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
        </div>
        {/* Glow Effect */}
        <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-${color}-500/10 rounded-full blur-3xl group-hover:bg-${color}-500/20 transition-all duration-500`}></div>
    </motion.div>
);

const SuperLabelsSchema: React.FC = () => {
    const labels = [
        { id: 1, name: 'Control', count: 47, desc: 'Access controls, governance, permissions', tier: '7,8,9' },
        { id: 2, name: 'Impact', count: 38, desc: 'Severity levels, consequence metrics', tier: '5,6,7' },
        { id: 3, name: 'Threat', count: 41, desc: 'Attack vectors, adversary capabilities', tier: '5,7,8' },
        { id: 4, name: 'Behavior', count: 18, desc: 'User/system actions, patterns', tier: '5,9' },
        { id: 5, name: 'Resilience', count: 21, desc: 'Recovery, redundancy, adaptation', tier: '6,8,9' },
        { id: 6, name: 'Asset', count: 14, desc: 'Resources, infrastructure, data', tier: '5,6,8' },
        { id: 7, name: 'Dependency', count: 12, desc: 'Service chains, integration points', tier: '7,8,9' },
        { id: 8, name: 'Temporality', count: 8, desc: 'Time-dependent properties, windows', tier: '6,9' },
    ];

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">The Ontology of Risk</h2>
                <p className="text-gray-400">A unified taxonomy mapping 197 NER11 entity types to 16 Super Labels.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {labels.map((label) => (
                    <motion.div
                        key={label.id}
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-xl bg-gray-900/40 border border-purple-500/20 hover:border-purple-500/50 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">
                                {label.id}
                            </div>
                            <div className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                {label.count} Entities
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{label.name}</h3>
                        <p className="text-sm text-gray-400 mb-4 h-10">{label.desc}</p>
                        <div className="text-xs text-purple-500/60 font-mono">TIERS: {label.tier}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const PredictionPipeline: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-2xl font-bold mb-4">From Evidence to Forecast</h2>
                <p className="text-gray-400">The 3-stage computational pipeline executing the E27 algorithm.</p>
            </div>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent opacity-30"></div>

                <PipelineStage
                    step="01"
                    title="Feature Extraction (T=0)"
                    items={[
                        "Extract current state vector P(t) from Neo4j",
                        "Compute aggregated Super Label values",
                        "Calculate instantaneous derivative dP/dt"
                    ]}
                    color="purple"
                />
                <PipelineStage
                    step="02"
                    title="Trajectory Sampling (T=0 to T+Δt)"
                    items={[
                        "Run 1,000 Monte Carlo simulations",
                        "Apply Shock Response Equation (Eq 4)",
                        "Apply Resilience damping factors"
                    ]}
                    color="pink"
                />
                <PipelineStage
                    step="03"
                    title="Ensemble Aggregation (T+Δt)"
                    items={[
                        "Compute posterior probability distribution (Eq 5)",
                        "Calculate final Entropy H(t+Δt)",
                        "Generate 95% Confidence Intervals"
                    ]}
                    color="blue"
                />
            </div>
        </div>
    );
};

const PipelineStage: React.FC<{ step: string; title: string; items: string[]; color: string }> = ({ step, title, items, color }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="ml-20 mb-12 relative"
    >
        <div className={`absolute -left-[3.25rem] top-0 w-12 h-12 rounded-full bg-black border-2 border-${color}-500 flex items-center justify-center font-bold text-${color}-500 z-10`}>
            {step}
        </div>
        <div className={`p-6 rounded-xl bg-gray-900/40 border border-${color}-500/30`}>
            <h3 className={`text-xl font-bold text-${color}-400 mb-4`}>{title}</h3>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                        <ArrowRight className={`w-4 h-4 text-${color}-500`} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const Neo4jEngine: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <div>
                <h2 className="text-xl font-bold mb-6">Operationalizing Psychohistory</h2>
                <p className="text-gray-400 mb-8">
                    The E27 engine is implemented directly within Neo4j using custom Cypher functions and Graph Data Science (GDS) algorithms.
                </p>

                <div className="space-y-4">
                    <FunctionItem name="custom.psychohistory.epidemicThreshold" args="(beta, gamma, connections)" desc="Calculates R0 for epidemic spread" />
                    <FunctionItem name="custom.psychohistory.isingDynamics" args="(m, beta, J, z, h)" desc="Models policy adoption (Ising Model)" />
                    <FunctionItem name="custom.psychohistory.granovetterCascade" args="(adopters, pop, threshold)" desc="Predicts cascade adoption" />
                    <FunctionItem name="custom.psychohistory.bifurcationMu" args="(capacity, load)" desc="Calculates distance to bifurcation (Seldon Crisis)" />
                </div>
            </div>

            <div className="bg-black rounded-xl border border-gray-800 p-6 font-mono text-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-8 bg-gray-900 flex items-center px-4 gap-2 border-b border-gray-800">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-gray-500">neo4j-console</span>
                </div>
                <div className="mt-8 text-green-400 space-y-2">
                    <p className="text-gray-500">// Detect Seldon Crisis Probability</p>
                    <p><span className="text-purple-400">MATCH</span> (sc:SeldonCrisis &#123;id: 'SC001'&#125;)</p>
                    <p><span className="text-purple-400">MATCH</span> (ci:Indicator)-[:INDICATES]-&gt;(sc)</p>
                    <p><span className="text-purple-400">WHERE</span> ci.value IS NOT NULL</p>
                    <p><span className="text-purple-400">WITH</span> sc, collect(ci) as indicators</p>
                    <p><span className="text-purple-400">RETURN</span> sc.name,</p>
                    <p className="pl-8">custom.psychohistory.bifurcationMu(</p>
                    <p className="pl-12 text-yellow-400">0.5, 0.3</p>
                    <p className="pl-8">) <span className="text-purple-400">AS</span> crisis_param</p>
                    <div className="h-4"></div>
                    <p className="text-white bg-green-900/20 p-2 border-l-2 border-green-500">
                        Result: "Financial Instability", 0.87 (CRITICAL)
                    </p>
                </div>
            </div>
        </div>
    );
};

const FunctionItem: React.FC<{ name: string; args: string; desc: string }> = ({ name, args, desc }) => (
    <div className="p-4 rounded-lg bg-gray-900/30 border border-gray-800 flex flex-col gap-1">
        <div className="font-mono text-purple-400 text-sm">{name}</div>
        <div className="font-mono text-gray-500 text-xs">{args}</div>
        <div className="text-gray-400 text-sm mt-1">{desc}</div>
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

            ctx.fillStyle = '#a855f7'; // Purple
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
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20" />;
};

export default E27View;
