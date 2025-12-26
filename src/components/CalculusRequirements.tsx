
'use client'

import React, { useState } from 'react';
import {
    FileText, Sigma, FunctionSquare, LayoutGrid, ChevronRight,
    ShieldCheck, Network, Zap, Brain, Target, AlertTriangle, TrendingUp, Cpu, Magnet, Timer
} from 'lucide-react';

type Tab = 'STRATEGY' | 'FRAMEWORKS';

export const CalculusRequirements: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('STRATEGY');
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);

    // Tailored for COO/CTO Persona - The "Story" of a Breach
    const questions = [
        {
            id: 1,
            q: "What happened?",
            headline: "Critical Failure at Chicago Water Plant",
            detail: "Cisco ASA 5500 Firewall failed heartbeat. Breach confirmed via unpatched CVE-2025-XXXX (Score 9.8) on firmware v9.12.",
            metric: "Time to Detect: 12ms"
        },
        {
            id: 2,
            q: "Who did it?",
            headline: "Attribution: APT29 (Cozy Bear)",
            detail: "Attack correlates with geopolitical tension. Actor targeted known 180-day patch lag typical of the Water Sector.",
            metric: "Confidence: 94%"
        },
        {
            id: 3,
            q: "How did they do it?",
            headline: "Vector: Buffer Overflow (MITRE T1190)",
            detail: "Exploited public-facing VPN port on legacy config. Lateral movement via compromised admin credentials.",
            metric: "Complexity: Low"
        },
        {
            id: 4,
            q: "What assets are at risk?",
            headline: "Blast Radius: 12 Sister Facilities",
            detail: "Digital Twin identifies 12 other Water/Chemical plants running identical Cisco ASA v9.12 configurations.",
            metric: "Exposure: High"
        },
        {
            id: 5,
            q: "What's the business impact?",
            headline: "Operational Risk: $45M/Day",
            detail: "Plant shutdown affects 2M residents. Regulatory fines pending (EPA/CISA). Stock impact estimated at -15%.",
            metric: "Loss Magnitude: Critical"
        },
        {
            id: 6,
            q: "What patterns exist?",
            headline: "Root Cause: Organizational Bias",
            detail: "Historical analysis shows organization ignores 'Medium' severity patches for >120 days (Normalcy Bias). Attackers profiled this behavior.",
            metric: "Bias Score: 0.82"
        },
        {
            id: 7,
            q: "What will happen next?",
            headline: "Forecast: Lateral Breach in <7 Days",
            detail: "gGNN model predicts 89% probability of attack spreading to the 'Detroit Facility' based on identical vulnerability profile.",
            metric: "Urgency: Immediate"
        },
        {
            id: 8,
            q: "How do we prevent it?",
            headline: "ROI: 1500% on Intervention",
            detail: "Emergency patch campaign for 12 assets costs $50k. Avoids projected $75M breach cost. Action recommended immediately.",
            metric: "Action: Patch Now"
        },
    ];

    return (
        <div className="h-full flex flex-col bg-surface/60 border border-gray-800 backdrop-blur-sm overflow-hidden">

            {/* Header Tabs */}
            <div className="flex border-b border-gray-800">
                <button
                    onClick={() => setActiveTab('STRATEGY')}
                    className={`flex-1 p-3 text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'STRATEGY' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    <Target size={12} />
                    Executive Brief
                </button>
                <button
                    onClick={() => setActiveTab('FRAMEWORKS')}
                    className={`flex-1 p-3 text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'FRAMEWORKS' ? 'bg-secondary/10 text-secondary border-b-2 border-secondary' : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    <FunctionSquare size={12} />
                    Math Models
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-4 custom-scrollbar relative">

                {activeTab === 'STRATEGY' && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">

                        {/* The Problem Narrative */}
                        <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-900/50 p-4 rounded-sm relative group">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-900/30 rounded-full mt-1">
                                    <AlertTriangle size={16} className="text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-red-400 font-bold text-xs uppercase mb-1">
                                        The Reactive Trap
                                    </h3>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">
                                        Traditional security detects the breach <span className="text-white italic">after</span> it happens. Organizations waste <strong>$3M</strong> on "Imaginary" APT defenses while ignoring the <strong>$500k</strong> operational fixes that actually prevent disasters.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-red-900/30 flex items-start gap-3">
                                <div className="p-2 bg-primary/20 rounded-full mt-1">
                                    <TrendingUp size={16} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-primary font-bold text-xs uppercase mb-1">
                                        The AEON Cyber Digital Twin Solution
                                    </h3>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">
                                        We don't just ask "What happened?". We model <strong>Human Bias + Tech Vulnerability</strong> to forecast "What will happen next?" giving you a 90-day predictive horizon.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 8 Questions Accordion */}
                        <div className="space-y-2">
                            <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2 pl-1">Digital Twin Analysis: Cisco ASA Incident</h4>
                            {questions.map((q) => (
                                <div
                                    key={q.id}
                                    onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                                    className={`
                            border bg-gray-900/30 p-3 cursor-pointer transition-all duration-300
                            hover:bg-gray-900/60
                            ${expandedQuestion === q.id ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(0,224,176,0.1)]' : 'border-gray-800'}
                        `}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] uppercase tracking-wider font-bold ${expandedQuestion === q.id ? 'text-primary' : 'text-gray-500'}`}>
                                                {q.q}
                                            </span>
                                            {expandedQuestion !== q.id && (
                                                <span className="text-xs text-gray-300 font-mono mt-1 truncate max-w-[250px]">{q.headline}</span>
                                            )}
                                        </div>
                                        <ChevronRight
                                            size={14}
                                            className={`text-gray-600 transition-transform duration-300 ${expandedQuestion === q.id ? 'rotate-90 text-primary' : ''}`}
                                        />
                                    </div>

                                    {expandedQuestion === q.id && (
                                        <div className="mt-3 pt-3 border-t border-primary/20 animate-in fade-in slide-in-from-top-1">
                                            <div className="text-sm text-white font-bold mb-2">{q.headline}</div>
                                            <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                                {q.detail}
                                            </p>
                                            <div className="bg-black/40 p-2 rounded border border-gray-800 flex justify-between items-center">
                                                <span className="text-[9px] text-gray-500 uppercase font-mono">Metric Analysis</span>
                                                <span className="text-[10px] text-secondary font-mono font-bold">{q.metric}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {activeTab === 'FRAMEWORKS' && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">

                        {/* gGNN Engine */}
                        <div className="bg-black/30 border border-gray-800 p-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <Cpu size={40} className="text-primary" />
                            </div>
                            <div className="flex items-center gap-2 mb-3 relative z-10">
                                <Brain size={14} className="text-primary" />
                                <h4 className="text-xs font-bold text-white uppercase">5.3 gGNN Predictor Engine</h4>
                            </div>
                            <p className="text-[10px] text-gray-400 mb-3 relative z-10">
                                The computational substrate running Agent-Based Models (ABM) where each node represents a system component.
                            </p>
                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                <div className="bg-gray-900/50 p-2 border border-gray-800">
                                    <div className="text-[9px] text-gray-500 uppercase">Architecture</div>
                                    <div className="text-white font-mono text-[10px]">Gated Graph Neural Net</div>
                                </div>
                                <div className="bg-gray-900/50 p-2 border border-gray-800">
                                    <div className="text-[9px] text-gray-500 uppercase">Optimization</div>
                                    <div className="text-primary font-mono text-[10px]">WASM / Native</div>
                                </div>
                            </div>
                        </div>

                        {/* McKenney-Lacan Topology */}
                        <div className="bg-black/30 border border-gray-800 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <LayoutGrid size={14} className="text-purple-400" />
                                <h4 className="text-xs font-bold text-white uppercase">McKenney-Lacan Topology</h4>
                            </div>
                            <p className="text-[10px] text-gray-500 mb-3">
                                Maps the critical gap between <span className="text-purple-400">Imaginary Risks</span> (what executives fear) and <span className="text-white">Real Threats</span> (operational reality).
                            </p>
                            <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-gray-700 to-white rounded-full"></div>
                            <div className="flex justify-between text-[9px] font-mono text-gray-500 mt-1">
                                <span>IMAGINARY (APTs)</span>
                                <span>REAL (Patching)</span>
                            </div>
                        </div>

                        {/* Ising Dynamics */}
                        <div className="bg-black/30 border border-gray-800 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Network size={14} className="text-blue-400" />
                                <h4 className="text-xs font-bold text-white uppercase">Ising Dynamics</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-gray-800 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto whitespace-nowrap scrollbar-none">
                                dm/dt = -m + tanh(β(Jzm + h))
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models the spread of <span className="text-blue-400">Ideology</span> and consensus. Predicts adoption of security standards or radicalization of threat groups.
                            </p>
                        </div>

                        {/* Granovetter Thresholds */}
                        <div className="bg-black/30 border border-gray-800 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap size={14} className="text-yellow-400" />
                                <h4 className="text-xs font-bold text-white uppercase">Granovetter Thresholds</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-gray-800 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto whitespace-nowrap scrollbar-none">
                                r(t+1) = N ∑ P(k) F(r(t)/N)
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models the <span className="text-yellow-400">Cascade</span> of attack techniques (TTPs). Predicts when a niche exploit (e.g., Log4j) hits the tipping point.
                            </p>
                        </div>

                        {/* The Bias Well */}
                        <div className="bg-black/30 border border-gray-800 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Magnet size={14} className="text-red-400" />
                                <h4 className="text-xs font-bold text-white uppercase">The Bias Well</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-gray-800 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto whitespace-nowrap scrollbar-none">
                                V(x) = 0.5 · k(x - x_bias)²
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models belief rigidity. To change a biased mind, the "Force" of new information must exceed the stiffness <span className="text-red-400">(k)</span> of the dogma.
                            </p>
                        </div>

                        {/* Critical Slowing Down */}
                        <div className="bg-black/30 border border-gray-800 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Timer size={14} className="text-orange-400" />
                                <h4 className="text-xs font-bold text-white uppercase">Critical Slowing Down</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-gray-800 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto whitespace-nowrap scrollbar-none">
                                τ = 1 / |λ| → ∞
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models <span className="text-orange-400">Analysis Paralysis</span>. As ambiguity rises, the potential flattens, and reaction time diverges to infinity (Freeze Response).
                            </p>
                        </div>

                    </div>
                )}

            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-800 bg-black/20 text-[9px] text-gray-600 font-mono flex justify-between">
                <span>AEON DIGITAL TWIN</span>
                <span className="text-primary">V4.2.1-RC</span>
            </div>
        </div>
    );
};
