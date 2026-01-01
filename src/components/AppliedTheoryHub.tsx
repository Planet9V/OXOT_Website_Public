"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
    Brain, Network, Shield, Target, Cpu, Activity, Scale,
    Fingerprint, Radio, Layers, Sigma, TrendingUp, Zap,
    GitBranch, Database, Users, Lock, Eye, Box, BarChart3,
    ArrowRight, Search, Filter, ChevronDown
} from 'lucide-react';
import { TypewriterEquation } from './TypewriterEquation';
import { OXOTLogo } from './branding/OXOTLogo';
import { PageHeader } from './branding/PageHeader';

// AEON Capability data organized by category
const CAPABILITY_CATEGORIES = [
    {
        name: "Topology & Stability",
        color: "oxot-gold",
        icon: <GitBranch size={20} />,
        capabilities: [
            {
                id: "RSCH-01",
                path: "/theory/borromean-stability",
                title: "BORROMEAN STABILITY",
                subtitle: "Topological Security Architecture",
                description: "Milnor Invariants and Lacanian Topology applied to bi-cameral defense. The breakdown of any register causes total collapse.",
                math: "\\bar{\\mu}(123) = \\pm 1",
                features: ["Borromean Knot", "R-S-I Registers", "Defense in Depth"]
            },
            {
                id: "RSCH-02",
                path: "/theory/real-register",
                title: "REAL REGISTER",
                subtitle: "The Unsymbolizable Layer",
                description: "Zero-day exploits and physical faults that resist symbolization. Agent Blue operates in this domain.",
                math: "R = \\{ x \\in \\Psi : \\nexists S(x) \\}",
                features: ["Zero-Day Response", "Physical Layer", "Pre-Symbolic Action"]
            },
            {
                id: "RSCH-09",
                path: "/theory/seldon-crisis",
                title: "SELDON CRISIS",
                subtitle: "Phase Transitions in Stability",
                description: "Topological failure where the symbolic order loses grip on the Real. Crisis probability metrics.",
                math: "Lk(R,S,I) \\to 0",
                features: ["Percolation Theory", "Critical Threshold", "Edge Sovereignty"]
            },
            {
                id: "RSCH-17",
                path: "/theory/antifragile-topology",
                title: "ANTIFRAGILE TOPOLOGY",
                subtitle: "Stress-Strengthening Networks",
                description: "Networks that gain strength from attacks through topological redundancy and adaptive reconfiguration.",
                math: "\\frac{\\partial R}{\\partial \\sigma} > 0",
                features: ["Stress Response", "Adaptive Networks", "Resilience Gain"]
            },
            {
                id: "RSCH-21",
                path: "/theory/sheaf-cohomology",
                title: "SHEAF COHOMOLOGY",
                subtitle: "Global from Local Data",
                description: "Deriving global network state from local sensor observations using algebraic topology.",
                math: "H^n(X, \\mathcal{F})",
                features: ["Local-to-Global", "Sensor Fusion", "Topological Data"]
            }
        ]
    },
    {
        name: "Psychometrics & Behavior",
        color: "violet-400",
        icon: <Brain size={20} />,
        capabilities: [
            {
                id: "RSCH-07",
                path: "/theory/psychometric-tensors",
                title: "PSYCHOMETRIC TENSORS",
                subtitle: "Personality Attack Surface",
                description: "Big Five personality traits mapped to social engineering vulnerability via tensor operations.",
                math: "R = P^T \\cdot T \\cdot A",
                features: ["Big Five Model", "Attack Vectors", "Vulnerability Mapping"]
            },
            {
                id: "RSCH-31",
                path: "/theory/cognitive-twin",
                title: "COGNITIVE TWIN",
                subtitle: "Digital Subject Modeling",
                description: "Creating psychological models of organizational actors for threat prediction.",
                math: "\\Psi_{org} = f(\\Psi_1, ..., \\Psi_n)",
                features: ["Actor Modeling", "Behavioral Prediction", "Threat Profiles"]
            },
            {
                id: "RSCH-33",
                path: "/theory/dark-triad",
                title: "DARK TRIAD",
                subtitle: "Insider Threat Modeling",
                description: "Machiavellianism, Narcissism, Psychopathy as predictors of insider threat behavior. 78% accuracy.",
                math: "P_{DT} = [M, N, P] \\in [0,1]^3",
                features: ["Insider Threats", "Behavioral Inference", "Risk Tensor"]
            },
            {
                id: "RSCH-34",
                path: "/theory/cognitive-bias",
                title: "COGNITIVE BIAS",
                subtitle: "Systematic Judgment Errors",
                description: "Mapping cognitive biases to security decision failures and defensive countermeasures.",
                math: "B(x) = \\mathbb{E}[x] - x_{true}",
                features: ["Bias Detection", "Decision Support", "Error Correction"]
            },
            {
                id: "RSCH-38",
                path: "/theory/team-composition",
                title: "TEAM COMPOSITION",
                subtitle: "Optimal Security Teams",
                description: "Chef-inspired team orchestration for optimal security operations and incident response.",
                math: "\\max\\sum_i \\alpha_i \\cdot S_i",
                features: ["Team Dynamics", "Role Optimization", "Performance Metrics"]
            },
            {
                id: "RSCH-39",
                path: "/theory/musical-psychometrics",
                title: "MUSICAL PSYCHOMETRIC NOTATION",
                subtitle: "McKenney-Lacan Symphonic Calculus",
                description: "Translating the Real-Symbolic-Imaginary registers into orchestral scores. Lacanian topology becomes audible through Neo-Riemannian transformations.",
                math: "\\mathcal{M}(\\Psi_{RSI}) \\to \\text{Score}",
                features: ["Conductor Score", "Tonnetz Grid", "Lab & Reference"]
            }
        ]
    },
    {
        name: "Network Science",
        color: "cyan-400",
        icon: <Network size={20} />,
        capabilities: [
            {
                id: "RSCH-04",
                path: "/theory/spectral-graph",
                title: "SPECTRAL GRAPH THEORY",
                subtitle: "Eigenvalue Network Analysis",
                description: "Using graph Laplacian eigenvalues to detect critical nodes and attack propagation paths.",
                math: "\\lambda_2(L) \\geq 0",
                features: ["Graph Laplacian", "Fiedler Value", "Centrality Metrics"]
            },
            {
                id: "RSCH-06",
                path: "/theory/ggnn-attack",
                title: "GGNN ATTACK PREDICTION",
                subtitle: "Graph Neural Networks",
                description: "Gated Graph Neural Networks for predicting attack propagation through infrastructure.",
                math: "h_v^{(t)} = \\sigma(W \\cdot AGG)",
                features: ["Message Passing", "Attack Paths", "Temporal Dynamics"]
            },
            {
                id: "RSCH-08",
                path: "/theory/edge-physics",
                title: "EDGE PHYSICS",
                subtitle: "Relationship Dynamics",
                description: "Modeling edge weights as physical forces governing information and trust flow.",
                math: "F_{ij} = k \\cdot \\frac{m_i m_j}{r_{ij}^2}",
                features: ["Trust Dynamics", "Information Flow", "Network Forces"]
            },
            {
                id: "RSCH-16",
                path: "/theory/adversarial-gnn",
                title: "ADVERSARIAL GNN",
                subtitle: "Robust Graph Learning",
                description: "Defending graph neural networks against adversarial perturbation attacks.",
                math: "\\min_\\theta \\max_{\\delta} \\mathcal{L}",
                features: ["Adversarial Training", "Robustness", "Perturbation Defense"]
            }
        ]
    },
    {
        name: "Risk & Economics",
        color: "amber-400",
        icon: <TrendingUp size={20} />,
        capabilities: [
            {
                id: "RSCH-24",
                path: "/theory/exploit-economics",
                title: "EXPLOIT ECONOMICS",
                subtitle: "Vulnerability Markets",
                description: "Economic modeling of zero-day markets and vulnerability disclosure dynamics.",
                math: "P(exploit) = f(value, cost, time)",
                features: ["Market Dynamics", "Pricing Models", "Disclosure Theory"]
            },
            {
                id: "RSCH-25",
                path: "/theory/adversarial-creativity",
                title: "ADVERSARIAL CREATIVITY",
                subtitle: "Attack Innovation",
                description: "Modeling attacker creativity and novel attack vector generation.",
                math: "C(A) = H(A) \\cdot U(A)",
                features: ["Innovation Models", "Threat Evolution", "Creative Attack"]
            },
            {
                id: "RSCH-26",
                path: "/theory/cyber-actuarial",
                title: "CYBER ACTUARIAL",
                subtitle: "Insurance Mathematics",
                description: "Actuarial science applied to cyber insurance pricing and risk transfer.",
                math: "\\mathbb{E}[L] = \\int_0^\\infty x \\cdot f(x) dx",
                features: ["Loss Distribution", "Premium Pricing", "Risk Transfer"]
            },
            {
                id: "RSCH-27",
                path: "/theory/ma-due-diligence",
                title: "M&A DUE DILIGENCE",
                subtitle: "Acquisition Cyber Risk",
                description: "Technical debt quantification for infrastructure acquisitions. OT/ICS assessment.",
                math: "V_{adj} = V_0 - \\sum TD_i",
                features: ["Technical Debt", "Valuation Impact", "Integration Risk"]
            },
            {
                id: "RSCH-28",
                path: "/theory/supply-chain-butterfly",
                title: "SUPPLY CHAIN BUTTERFLY",
                subtitle: "Cascade Risk",
                description: "Butterfly effect in supply chain dependencies. Small failures cascade to systemic risk.",
                math: "\\frac{\\partial S}{\\partial x_0} \\to \\infty",
                features: ["Cascade Effects", "Dependency Graphs", "Systemic Risk"]
            }
        ]
    },
    {
        name: "Complexity Theory",
        color: "emerald-400",
        icon: <Activity size={20} />,
        capabilities: [
            {
                id: "RSCH-11",
                path: "/theory/cliodynamics",
                title: "CLIODYNAMICS",
                subtitle: "Mathematical History",
                description: "Quantitative analysis of historical patterns applied to organizational security cycles.",
                math: "\\frac{dS}{dt} = f(S, E, t)",
                features: ["Secular Cycles", "Pattern Analysis", "Predictive History"]
            },
            {
                id: "RSCH-12",
                path: "/theory/threshold-dynamics",
                title: "THRESHOLD DYNAMICS",
                subtitle: "Cascade Activation",
                description: "Granovetter thresholds for collective action and attack propagation tipping points.",
                math: "\\theta_i \\sim U(0, 1)",
                features: ["Tipping Points", "Collective Action", "Cascade Models"]
            },
            {
                id: "RSCH-13",
                path: "/theory/active-inference",
                title: "ACTIVE INFERENCE",
                subtitle: "Predictive Processing",
                description: "Free energy principle applied to autonomous security decision-making.",
                math: "F = D_{KL}[q||p] - \\log p(o)",
                features: ["Free Energy", "Bayesian Brain", "Autonomous Decision"]
            },
            {
                id: "RSCH-14",
                path: "/theory/ising-soc",
                title: "ISING SOC",
                subtitle: "Self-Organized Criticality",
                description: "Ising model for security state transitions and critical phase behavior.",
                math: "H = -J\\sum_{\\langle ij \\rangle} s_i s_j",
                features: ["Phase Transitions", "Critical States", "Magnetic Analogy"]
            },
            {
                id: "RSCH-15",
                path: "/theory/levy-apts",
                title: "LÉVY FLIGHT APTs",
                subtitle: "Heavy-Tail Attacks",
                description: "Advanced Persistent Threats modeled as Lévy flights with heavy-tailed jump distributions.",
                math: "P(x) \\sim x^{-(1+\\alpha)}",
                features: ["Heavy Tails", "Jump Processes", "APT Behavior"]
            }
        ]
    },
    {
        name: "Compliance & Defense",
        color: "oxot-blue",
        icon: <Shield size={20} />,
        capabilities: [
            {
                id: "RSCH-29",
                path: "/theory/autopoietic-bulkheads",
                title: "AUTOPOIETIC BULKHEADS",
                subtitle: "Self-Maintaining Barriers",
                description: "Self-organizing security boundaries that maintain themselves without central control.",
                math: "\\frac{dB}{dt} = G(B) - D(B)",
                features: ["Self-Organization", "Boundary Maintenance", "Autonomous Defense"]
            },
            {
                id: "RSCH-30",
                path: "/theory/mirror-strike",
                title: "MIRROR STRIKE",
                subtitle: "Deception Operations",
                description: "Using adversary tactics against them through controlled deception and misdirection.",
                math: "R_{mirror} = T(A) \\circ D",
                features: ["Active Deception", "Counter-Operations", "Adversary Confusion"]
            },
            {
                id: "RSCH-32",
                path: "/theory/compliance-physics",
                title: "COMPLIANCE PHYSICS",
                subtitle: "Regulatory Dynamics",
                description: "Physical metaphors for compliance states and regulatory force fields.",
                math: "\\vec{F}_{reg} = -\\nabla V_{compliance}",
                features: ["Regulatory Forces", "Compliance States", "Control Dynamics"]
            },
            {
                id: "RSCH-35",
                path: "/theory/federated-defense",
                title: "FEDERATED DEFENSE",
                subtitle: "Distributed Security",
                description: "Cooperative defense across organizational boundaries without central authority.",
                math: "D_{fed} = \\bigcup_i D_i",
                features: ["Distributed Intel", "Cooperative Defense", "No Central Trust"]
            }
        ]
    },
    {
        name: "Information Theory",
        color: "rose-400",
        icon: <Radio size={20} />,
        capabilities: [
            {
                id: "RSCH-03",
                path: "/theory/epidemic-r0",
                title: "EPIDEMIC R₀",
                subtitle: "Malware Reproduction",
                description: "Basic reproduction number applied to malware spread. Containment thresholds.",
                math: "R_0 = \\beta \\cdot c \\cdot d",
                features: ["Reproduction Number", "Herd Immunity", "Containment"]
            },
            {
                id: "RSCH-05",
                path: "/theory/shannon-entropy",
                title: "SHANNON ENTROPY",
                subtitle: "Information Uncertainty",
                description: "Entropy metrics for anomaly detection and system state uncertainty.",
                math: "H(X) = -\\sum p(x) \\log p(x)",
                features: ["Anomaly Detection", "Uncertainty Quantification", "State Entropy"]
            },
            {
                id: "RSCH-20",
                path: "/theory/quantum-bounds",
                title: "QUANTUM BOUNDS",
                subtitle: "Information Limits",
                description: "Fundamental limits on information extraction and cryptographic security.",
                math: "I(A:B) \\leq S(\\rho_A)",
                features: ["Holevo Bound", "Quantum Limits", "Cryptographic Security"]
            },
            {
                id: "RSCH-22",
                path: "/theory/info-geometry",
                title: "INFORMATION GEOMETRY",
                subtitle: "Statistical Manifolds",
                description: "Fisher information and statistical manifolds for threat distribution analysis.",
                math: "g_{ij} = \\mathbb{E}[\\partial_i \\ell \\cdot \\partial_j \\ell]",
                features: ["Fisher Metric", "Statistical Manifolds", "Distribution Analysis"]
            },
            {
                id: "RSCH-23",
                path: "/theory/honeypot-avatar",
                title: "HONEYPOT AVATAR",
                subtitle: "Attractor Deception",
                description: "Information-theoretic design of optimal honeypots to maximize attacker capture.",
                math: "\\max I(A; H) - I(D; H)",
                features: ["Attractor Design", "Deception Optimization", "Intel Capture"]
            }
        ]
    },
    {
        name: "Architecture & Integration",
        color: "white",
        icon: <Layers size={20} />,
        capabilities: [
            {
                id: "RSCH-18",
                path: "/theory/unified-schema",
                title: "UNIFIED SCHEMA",
                subtitle: "Ontology Integration",
                description: "Unified data schema for cross-domain security information sharing.",
                math: "\\mathcal{S} = \\bigoplus_i S_i",
                features: ["Schema Unification", "Interoperability", "Data Standards"]
            },
            {
                id: "RSCH-19",
                path: "/theory/grand-unification",
                title: "GRAND UNIFICATION",
                subtitle: "Theory of Everything",
                description: "Unifying all security models into a single coherent mathematical framework.",
                math: "\\mathcal{L}_{total} = \\sum_i \\mathcal{L}_i",
                features: ["Model Integration", "Unified Framework", "Complete Theory"]
            },
            {
                id: "RSCH-36",
                path: "/theory/data-pipeline",
                title: "DATA PIPELINE",
                subtitle: "Information Flow",
                description: "Architecture for real-time security data ingestion, processing, and analysis.",
                math: "\\text{Throughput} = \\lim_{t \\to \\infty} \\frac{N(t)}{t}",
                features: ["Stream Processing", "Real-Time Analytics", "Data Architecture"]
            },
            {
                id: "RSCH-37",
                path: "/theory/mckenney-lacan-enhancement",
                title: "MCKENNEY-LACAN ENHANCEMENT",
                subtitle: "Framework Evolution",
                description: "Iterative improvements to the core McKenney-Lacan theoretical framework.",
                math: "\\Psi_{n+1} = f(\\Psi_n, \\Delta)",
                features: ["Framework Updates", "Theory Evolution", "Enhancement Cycles"]
            },
            {
                id: "RSCH-10",
                path: "/theory/object-petit-a",
                title: "OBJECT PETIT A",
                subtitle: "The Cause of Desire",
                description: "Lacanian object-cause applied to adversary motivation and attack targeting.",
                math: "a \\in \\mathcal{O}(desire)",
                features: ["Adversary Motivation", "Target Selection", "Desire Modeling"]
            },
            {
                id: "RSCH-100",
                path: "/theory/probability-field",
                title: "PROBABILITY FIELD ENGINE",
                subtitle: "Psychohistory Simulation",
                description: "Mean Field Game theory for organizational outcome prediction. The ERIKA Engine.",
                math: "\\Phi(x,t) = \\int m(x,t) dx",
                features: ["Mean Field Games", "Population Dynamics", "Psychohistory"]
            }
        ]
    }
];

export default function AppliedTheoryHub() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter capabilities by search term
    const filteredCategories = CAPABILITY_CATEGORIES.map(cat => ({
        ...cat,
        capabilities: cat.capabilities.filter(c =>
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(cat => selectedCategory === null || cat.name === selectedCategory);

    const totalCapabilities = CAPABILITY_CATEGORIES.reduce((acc, cat) => acc + cat.capabilities.length, 0);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <div ref={containerRef} className="w-full min-h-screen bg-transparent text-white p-4 md:p-8 pt-12 overflow-y-auto custom-scrollbar overflow-x-hidden">

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
                        title="APPLIED THEORY"
                        subtitle="McKenney-Lacan Framework // Topological Security Architecture // Digital Subject Modeling."
                        variant="hero"
                        accent="gold"
                        className="mb-12"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
                            The mathematical foundations of the AEON Cyber Digital Twin.
                            Spanning topology, psychometrics, network science, and beyond.
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
            <div className="max-w-7xl w-full px-4 py-24 mx-auto space-y-12">

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search capabilities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:border-oxot-gold focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === null
                                ? 'bg-oxot-gold text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            All ({totalCapabilities})
                        </button>
                        {CAPABILITY_CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${selectedCategory === cat.name
                                    ? 'bg-oxot-gold text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat.icon}
                                <span className="hidden lg:inline">{cat.name}</span>
                                <span className="text-[10px] opacity-70">({cat.capabilities.length})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Sections */}
                {filteredCategories.map((category) => (
                    category.capabilities.length > 0 && (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                                <div className={`p-3 rounded-xl bg-${category.color}/10 border border-${category.color}/30`}>
                                    {category.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                                        {category.name}
                                    </h2>
                                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                                        {category.capabilities.length} AEON Capabilities
                                    </p>
                                </div>
                            </div>

                            {/* Capabilities Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.capabilities.map((capability) => (
                                    <Link
                                        key={capability.id}
                                        href={capability.path}
                                        className={`
                                            group relative bg-black/40 border border-white/10 rounded-2xl p-6
                                            backdrop-blur-md cursor-pointer overflow-hidden transition-all duration-300
                                            hover:scale-[1.02] hover:border-${category.color} hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]
                                        `}
                                    >
                                        {/* Capability ID Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className={`text-[10px] font-mono font-bold text-${category.color} bg-${category.color}/10 px-2 py-1 rounded`}>
                                                {capability.id}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-black tracking-tight text-white group-hover:text-oxot-gold transition-colors uppercase">
                                                    {capability.title}
                                                </h3>
                                                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
                                                    {capability.subtitle}
                                                </div>
                                            </div>

                                            <p className="text-gray-400 text-xs font-normal leading-relaxed min-h-[48px]">
                                                {capability.description}
                                            </p>

                                            {/* Equation */}
                                            <div className="pt-3 border-t border-white/5">
                                                <TypewriterEquation
                                                    equation={capability.math}
                                                    className="text-[10px] text-cyan-400 group-hover:text-oxot-gold transition-colors"
                                                    delay={0.1}
                                                />
                                            </div>

                                            {/* Features */}
                                            <div className="flex flex-wrap gap-2 pt-3">
                                                {capability.features.map((feature, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[9px] font-mono uppercase tracking-wider text-gray-600 bg-white/5 px-2 py-1 rounded"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Action */}
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-oxot-gold opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                                                Access Capability <ArrowRight size={12} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )
                ))}

                {/* Empty State */}
                {filteredCategories.every(cat => cat.capabilities.length === 0) && (
                    <div className="text-center py-20">
                        <Search size={48} className="mx-auto text-gray-600 mb-4" />
                        <p className="text-gray-500">No capabilities match your search criteria.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
