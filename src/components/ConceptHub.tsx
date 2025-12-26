"use client";

import React from 'react';
import { Target, Cpu, Search, Layers, ArrowRight, Crosshair, Box, ZoomIn, Network, FileCode, FileJson, Brain, FileText, Sigma, TrendingUp, Shield, Radio, Briefcase, LayoutDashboard, Globe } from 'lucide-react';
import Link from 'next/link';

import { TypewriterEquation } from './TypewriterEquation';

export default function ConceptHub() {
    const concepts = [
        {
            path: "/offense",
            title: "AGENT RED OVERVIEW",
            subtitle: "Architectural Deep Dive",
            description: "Comprehensive overview of the Agent Red submind architecture, capabilities, and operational framework.",
            icon: <Target size={48} className="text-oxot-red" />,
            color: "text-oxot-red",
            math: "Ω(r) = \\lim_{n \\to \\infty} \\sum_{i=1}^n \\frac{1}{i^2}",
            features: ["Submind Personas", "Infrastructure", "Mission Control"]
        },
        {
            path: "/defense",
            title: "AGENT BLUE TEAM",
            subtitle: "Predictive Defensive Intelligence",
            description: "Proactive defense powered by the E27 Engine. Shifting the paradigm from reactive firefighting to predictive threat elimination.",
            icon: <Shield size={48} className="text-oxot-blue" />,
            color: "text-oxot-blue",
            math: "\\Psi(x,t) = Ae^{i(kx-\\omega t)}",
            features: ["Digital Twin Simulation", "gGGN Intelligence", "NOW/NEXT/NEVER"]
        },
        {
            path: "/architecture",
            title: "7-LEVEL ARCHITECTURE",
            subtitle: "Integrated Architecture",
            description: "From Metal to Mind. A vertical journey through the complete AEON Digital Twin ontology, combining technical and psychological layers.",
            icon: <Layers size={48} className="text-white" />,
            color: "text-white",
            math: "\\mathcal{L} = T - V",
            features: ["Ontology Mapping", "Data Flow Visualization", "Interoperability"]
        },
        {
            path: "/solutions",
            title: "16 SECTOR SOLUTIONS",
            subtitle: "Industrial Sovereignty",
            description: "Detailed engineering blueprints and threat models for all 16 critical infrastructure sectors.",
            icon: <Globe size={48} className="text-oxot-blue" />,
            color: "text-oxot-blue",
            math: "\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0}",
            features: ["Energy Grid", "Water Safety", "Transport Logistics"]
        },
        {
            path: "/logic",
            title: "E27 ENGINE CORE",
            subtitle: "Mathematical Core",
            description: "The mathematical framework of the Psychohistory Engine. State evolution, entropy, and influence equations.",
            icon: <Sigma size={48} className="text-oxot-red" />,
            color: "text-oxot-red",
            math: "S = -k_B \\sum p_i \\ln p_i",
            features: ["State Evolution", "Entropy", "Influence Propagation"]
        },
        {
            path: "/acquisitions",
            title: "M&A DUE DILIGENCE",
            subtitle: "Strategic Acquisition",
            description: "High-stakes risk quantification for international infrastructure acquisitions. Mathematical proof of technical entropy.",
            icon: <Briefcase size={48} className="text-white" />,
            color: "text-white",
            math: "E = mc^2 + \\text{Risk}",
            features: ["Forensic SBOM", "Valuation Adjustments", "Integration Roadmap"]
        }
    ];

    return (
        <div className="w-full min-h-screen bg-transparent text-white p-4 md:p-8 pt-12 overflow-y-auto custom-scrollbar flex flex-col items-center uppercase font-black">
            <div className="max-w-7xl w-full space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center mb-8">
                        <div className="px-6 py-2 bg-oxot-red/10 border border-oxot-red rounded-full">
                            <span className="text-oxot-red text-[10px] font-mono font-bold uppercase tracking-[0.5em]">
                                Sovereign_Knowledge_Base
                            </span>
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
                        Concept <span className="text-oxot-red italic font-light">Hub</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-normal lowercase tracking-tighter max-w-2xl mx-auto italic">
                        Explore the advanced modules of the AEON Cyber Digital Twin. Select a technical dossier to begin.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {concepts.map((concept, index) => (
                        <Link
                            key={index}
                            href={concept.path}
                            className={`
                                group relative bg-black/40 border-4 border-grey rounded-3xl p-10
                                backdrop-blur-md cursor-pointer overflow-hidden transition-all duration-500
                                hover:scale-[1.02] hover:border-oxot-red hover:shadow-[0_0_50px_rgba(214,0,0,0.2)]
                            `}
                        >
                            {/* Icon */}
                            <div className="relative z-10 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                                <div className="w-24 h-24 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-center shadow-2xl">
                                    {concept.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 space-y-6">
                                <div>
                                    <h3 className="text-3xl font-black tracking-tighter text-white group-hover:text-oxot-red transition-colors">
                                        {concept.title}
                                    </h3>
                                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-grey mt-2">
                                        {concept.subtitle}
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm font-normal lowercase tracking-tighter leading-relaxed min-h-[60px]">
                                    {concept.description}
                                </p>

                                {/* Equation Block */}
                                <div className="pt-4 border-t border-white/10 group-hover:border-oxot-red/50 transition-colors">
                                    <TypewriterEquation
                                        equation={concept.math}
                                        className="text-[10px] md:text-xs text-cyan-400 group-hover:text-oxot-red transition-colors"
                                        delay={0.2}
                                    />
                                </div>

                                {/* Features List */}
                                <ul className="space-y-3 pt-6 border-t border-white/10">
                                    {concept.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[10px] text-grey font-black tracking-widest group-hover:text-white transition-colors">
                                            <div className="w-1.5 h-1.5 bg-oxot-red rounded-full"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Button */}
                                <div className="mt-8 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-oxot-red opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    Initialize Protocol <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div >
    );
};
