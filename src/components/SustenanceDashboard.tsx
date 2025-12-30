'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
    Activity, Database, Cpu, Terminal, Target, AlertTriangle, TrendingUp, ChevronRight,
    Zap, Droplets, Wheat, Heart, Sigma, Network, Magnet, Timer, Brain, ShieldCheck, Percent
} from 'lucide-react';

// --- DATA GENERATORS ---
const NEWS_FRAGMENTS = [
    { source: 'GRID', content: 'Transformer 14-A voltage fluctuation detected in Midwest sector', severity: 'high' },
    { source: 'WATER', content: 'Treatment Plant 7 chlorine levels nominal - automated adjustment', severity: 'low' },
    { source: 'AGRI', content: 'Irrigation system failure predicted in 72h (Sector NE-12)', severity: 'critical' },
    { source: 'GRID', content: 'Solar farm output exceeding forecast by 12%', severity: 'low' },
    { source: 'WATER', content: 'Reservoir levels dropping below seasonal average', severity: 'medium' },
    { source: 'AGRI', content: 'Soil moisture sensors detecting drought stress in Zone C', severity: 'high' },
    { source: 'GRID', content: 'Peak demand warning for Eastern Interconnect', severity: 'critical' },
    { source: 'WATER', content: 'Aquifer recharge rate 23% below historical norm', severity: 'high' },
];

const CYPHER_QUERIES = [
    "MATCH (g:Grid)-[:POWERS]->(w:WaterPlant) RETURN g.stability",
    "CALL gds.pageRank.stream('InfraGraph') YIELD nodeId, score",
    "MATCH (f:Farm)-[:IRRIGATED_BY]->(r:Reservoir) WHERE r.level < 30 RETURN f",
    "CALCULATE d(Entropy)/dt WHERE cascade_risk > threshold",
    "MERGE (e:Drought)-[:IMPACTS]->(c:CropYield) SET c.forecast = -15%"
];

// --- EXECUTIVE BRIEF COMPONENT (WITH TABS) ---
type TabType = 'EXECUTIVE' | 'MATH';

const ExecutiveBrief = () => {
    const [activeTab, setActiveTab] = useState<TabType>('EXECUTIVE');
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);

    // Incident analysis questions
    const questions = [
        {
            id: 1,
            q: "What happened?",
            headline: "Critical Failure at Chicago Water Plant",
            detail: "Cisco ASA 5500 Firewall failed heartbeat. Breach confirmed via unpatched CVE-2025-XXXX (CVSS 9.8) on firmware v9.12.",
            metric: "EPSS: 15.3% (92nd)"
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
            headline: "Vector: Buffer Overflow (MITRE T1...",
            detail: "Exploited public-facing VPN port on legacy config. Lateral movement via compromised admin credentials.",
            metric: "EPSS Rank: Top 8%"
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
            headline: "Forecast: Lateral Breach in <7 Da...",
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
        <div className="h-full flex flex-col bg-black/60 border border-white/10 backdrop-blur-sm overflow-hidden rounded-xl">

            {/* Header Tabs */}
            <div className="flex border-b border-white/10">
                <button
                    onClick={() => setActiveTab('EXECUTIVE')}
                    className={`flex-1 p-3 text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'EXECUTIVE' ? 'bg-oxot-blue/10 text-oxot-blue border-b-2 border-oxot-blue' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <Target size={12} />
                    Executive Brief
                </button>
                <button
                    onClick={() => setActiveTab('MATH')}
                    className={`flex-1 p-3 text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'MATH' ? 'bg-oxot-blue/10 text-oxot-blue-light border-b-2 border-oxot-blue-light' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <Sigma size={12} />
                    Math Models
                </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">

                {activeTab === 'EXECUTIVE' && (
                    <div className="space-y-4">
                        {/* The Problem Narrative */}
                        <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-900/50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-900/30 rounded-full mt-1">
                                    <AlertTriangle size={16} className="text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-red-400 font-bold text-xs uppercase mb-1">The Reactive Trap</h3>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">
                                        Traditional security detects the breach <span className="text-white italic">after</span> it happens. Organizations waste <strong>$3M</strong> on "Imaginary" APT defenses while ignoring the <strong>$500k</strong> operational fixes that actually prevent disasters.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-red-900/30 flex items-start gap-3">
                                <div className="p-2 bg-oxot-blue/20 rounded-full mt-1">
                                    <TrendingUp size={16} className="text-oxot-blue" />
                                </div>
                                <div>
                                    <h3 className="text-oxot-blue font-bold text-xs uppercase mb-1">The AEON Cyber Digital Twin Solution</h3>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">
                                        We don't just ask "What happened?". We model <strong>Human Bias + Tech Vulnerability</strong> to forecast "What will happen next?" giving you a 90-day predictive horizon.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Questions Accordion */}
                        <div className="space-y-2">
                            <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-2 pl-1">Digital Twin Analysis: CISCO ASA Incident</h4>
                            {questions.map((q) => (
                                <div
                                    key={q.id}
                                    onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                                    className={`border bg-gray-900/30 p-3 cursor-pointer transition-all duration-300 hover:bg-gray-900/60 rounded-lg
                                        ${expandedQuestion === q.id ? 'border-oxot-blue/50 bg-oxot-blue/5' : 'border-white/10'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] uppercase tracking-wider font-bold ${expandedQuestion === q.id ? 'text-oxot-blue' : 'text-gray-500'}`}>
                                                {q.q}
                                            </span>
                                            {expandedQuestion !== q.id && (
                                                <span className="text-xs text-gray-300 font-mono mt-1 truncate max-w-[200px]">{q.headline}</span>
                                            )}
                                        </div>
                                        <ChevronRight
                                            size={14}
                                            className={`text-gray-600 transition-transform duration-300 flex-shrink-0 ${expandedQuestion === q.id ? 'rotate-90 text-oxot-blue' : ''}`}
                                        />
                                    </div>

                                    {expandedQuestion === q.id && (
                                        <div className="mt-3 pt-3 border-t border-oxot-blue/20">
                                            <div className="text-sm text-white font-bold mb-2">{q.headline}</div>
                                            <p className="text-xs text-gray-400 leading-relaxed mb-3">{q.detail}</p>
                                            <div className="bg-black/40 p-2 rounded border border-white/10 flex justify-between items-center">
                                                <span className="text-[9px] text-gray-500 uppercase font-mono">Metric Analysis</span>
                                                <span className="text-[10px] text-oxot-gold font-mono font-bold">{q.metric}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'MATH' && (
                    <div className="space-y-4">
                        {/* Ising Dynamics */}
                        <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Network size={14} className="text-blue-400" />
                                <h4 className="text-xs font-bold text-white uppercase">Ising Dynamics</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-white/10 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto">
                                dm/dt = -m + tanh(β(Jzm + h))
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models the spread of <span className="text-blue-400">Ideology</span> and consensus. Predicts adoption of security standards or radicalization of threat groups.
                            </p>
                        </div>

                        {/* Granovetter Thresholds */}
                        <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap size={14} className="text-yellow-400" />
                                <h4 className="text-xs font-bold text-white uppercase">Granovetter Thresholds</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-white/10 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto">
                                r(t+1) = N ∑ P(k) F(r(t)/N)
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models the <span className="text-yellow-400">Cascade</span> of attack techniques (TTPs). Predicts when a niche exploit hits the tipping point.
                            </p>
                        </div>

                        {/* The Bias Well */}
                        <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Magnet size={14} className="text-red-400" />
                                <h4 className="text-xs font-bold text-white uppercase">The Bias Well</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-white/10 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto">
                                V(x) = 0.5 · k(x - x_bias)²
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models belief rigidity. The "Force" of new information must exceed the stiffness <span className="text-red-400">(k)</span> of the dogma.
                            </p>
                        </div>

                        {/* Critical Slowing Down */}
                        <div className="bg-black/30 border border-white/10 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Timer size={14} className="text-oxot-red" />
                                <h4 className="text-xs font-bold text-white uppercase">Critical Slowing Down</h4>
                            </div>
                            <div className="bg-black p-3 rounded border border-white/10 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto">
                                τ = 1 / |λ| → ∞
                            </div>
                            <p className="text-[10px] text-gray-500">
                                Models <span className="text-oxot-red">Analysis Paralysis</span>. As ambiguity rises, reaction time diverges to infinity (Freeze Response).
                            </p>
                        </div>

                        {/* EPSS Predictor */}
                        <div className="bg-black/30 border border-white/10 p-4 rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <ShieldCheck size={40} className="text-oxot-gold" />
                            </div>
                            <div className="flex items-center gap-2 mb-3 relative z-10">
                                <ShieldCheck size={14} className="text-oxot-gold" />
                                <h4 className="text-xs font-bold text-white uppercase">EPSS Predictor (v4)</h4>
                            </div>
                            <p className="text-[10px] text-gray-500 mb-3 relative z-10">
                                Exploit Prediction Scoring System. Models the <span className="text-oxot-gold">Probability</span> of a vulnerability being exploited in the wild within 30 days.
                            </p>
                            <div className="bg-black p-3 rounded border border-white/10 font-mono text-[10px] text-gray-300 mb-3 overflow-x-auto relative z-10">
                                P(Exploit) = 1 / (1 + e^-(β₀ + ΣβᵢXᵢ))
                            </div>

                            {/* Mini-Chart for Probability-to-Percentile mapping */}
                            <div className="h-16 mb-3 bg-black/40 rounded border border-white/5 p-1 relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={[
                                        { p: 0, pct: 0 }, { p: 0.01, pct: 20 }, { p: 0.05, pct: 65 },
                                        { p: 0.1, pct: 88 }, { p: 0.2, pct: 95 }, { p: 0.5, pct: 99 }, { p: 1, pct: 100 }
                                    ]}>
                                        <Line type="monotone" dataKey="pct" stroke="#4ade80" strokeWidth={1} dot={false} />
                                        <ReferenceLine x={0.153} stroke="#0042D6" strokeDasharray="3 3" />
                                        <ReferenceLine y={92} stroke="#0042D6" strokeDasharray="3 3" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                                <div className="absolute bottom-1 right-2 text-[8px] text-gray-600 font-mono uppercase">Map: Prob → Pct</div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                <div className="bg-black/50 p-2 border border-white/10 rounded">
                                    <div className="text-[9px] text-gray-500 uppercase flex items-center gap-1"><Percent size={8} /> Probability</div>
                                    <div className="text-white font-mono text-[10px]">15.3% (Real-time)</div>
                                </div>
                                <div className="bg-black/50 p-2 border border-white/10 rounded">
                                    <div className="text-[9px] text-gray-500 uppercase">Percentile</div>
                                    <div className="text-oxot-blue font-mono text-[10px]">92nd (Top 8%)</div>
                                </div>
                            </div>
                        </div>

                        {/* gGNN Engine */}
                        <div className="bg-black/30 border border-white/10 p-4 rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <Brain size={40} className="text-oxot-blue" />
                            </div>
                            <div className="flex items-center gap-2 mb-3 relative z-10">
                                <Brain size={14} className="text-oxot-blue" />
                                <h4 className="text-xs font-bold text-white uppercase">5.3 gGNN Predictor Engine</h4>
                            </div>
                            <p className="text-[10px] text-gray-500 mb-3 relative z-10">
                                The computational substrate running Agent-Based Models (ABM) where each node represents a system component.
                            </p>
                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                <div className="bg-black/50 p-2 border border-white/10 rounded">
                                    <div className="text-[9px] text-gray-500 uppercase">Architecture</div>
                                    <div className="text-white font-mono text-[10px]">Gated Graph Neural Net</div>
                                </div>
                                <div className="bg-black/50 p-2 border border-white/10 rounded">
                                    <div className="text-[9px] text-gray-500 uppercase">Optimization</div>
                                    <div className="text-oxot-blue font-mono text-[10px]">WASM / Native</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-black/20 text-[9px] text-gray-600 font-mono flex justify-between">
                <span>AEON DIGITAL TWIN</span>
                <span className="text-oxot-blue">v4.2.1-RC</span>
            </div>
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function SustenanceDashboard() {
    const [feeds, setFeeds] = useState<Array<{ id: string; source: string; timestamp: string; content: string; severity: string }>>([]);
    const [activeQuery, setActiveQuery] = useState("");
    const [timeStep, setTimeStep] = useState(0);

    // Simulation Data
    const data = useMemo(() => {
        const points = [];
        const days = 90;
        let currentRealist = 0.2;
        let currentOptimistic = 0.2;
        let currentPessimistic = 0.2;

        for (let day = 0; day <= days; day++) {
            const phaseShift = Math.sin(timeStep * 0.1);
            const timeNoise = Math.sin(day * 0.1 + phaseShift) * 0.05;
            const entropyNoise = (Math.sin(day * 999 + timeStep) - 0.5) * 0.15;

            const riskDelta = 0.03;
            const mitigation = 0.025;

            currentRealist = currentRealist + riskDelta - mitigation + entropyNoise + (timeNoise * 0.2);
            currentRealist = Math.max(0.05, Math.min(0.95, currentRealist));
            currentOptimistic = Math.max(0.02, Math.min(currentRealist - 0.1, currentOptimistic - 0.01));
            currentPessimistic = Math.max(currentRealist + 0.1, Math.min(1.0, currentPessimistic + 0.015 + entropyNoise));

            points.push({
                day: day,
                label: `T+${day}`,
                optimistic: currentOptimistic.toFixed(3),
                realist: currentRealist.toFixed(3),
                pessimistic: currentPessimistic.toFixed(3),
                threshold: 0.8
            });
        }
        return points;
    }, [timeStep]);

    // Live Feed & Animation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.3) {
                const newItem = NEWS_FRAGMENTS[Math.floor(Math.random() * NEWS_FRAGMENTS.length)];
                setFeeds(prev => [{
                    id: Math.random().toString(36).substring(7),
                    source: newItem.source,
                    timestamp: new Date().toLocaleTimeString([], { hour12: false }),
                    content: newItem.content,
                    severity: newItem.severity,
                }, ...prev].slice(0, 8));
            }
            if (Math.random() > 0.7) {
                setActiveQuery(CYPHER_QUERIES[Math.floor(Math.random() * CYPHER_QUERIES.length)]);
            }
            setTimeStep(t => t + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const currentRisk = parseFloat(data[data.length - 1].realist);
    const riskColor = currentRisk > 0.8 ? '#ef4444' : currentRisk > 0.5 ? '#facc15' : '#4ade80';

    return (
        <section className="relative z-10 py-12 md:py-16 border-t border-b border-white/5 bg-transparent normal-case">
            <div className="max-w-[1800px] mx-auto px-4 md:px-8">

                {/* --- MISSION STATEMENT HEADER (ONE UNIFIED STATEMENT) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest mb-4">
                        <Activity size={14} /> Critical Sustenance Monitor
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-400 to-blue-500">
                            Reliable Energy, Clean Water, and Healthy Food for Our (Grand)Children.
                        </span>
                    </h2>
                </motion.div>

                {/* --- MAIN 3-COLUMN DASHBOARD --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* COLUMN 1: GRANOVETTER THRESHOLD CHART */}
                    <div className="lg:col-span-5 relative bg-black/60 border border-white/10 backdrop-blur-sm overflow-hidden flex flex-col rounded-xl h-[625px] lg:h-[700px]">
                        {/* Header */}
                        <div className="flex justify-between items-start p-4 border-b border-white/10 bg-white/5">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="text-oxot-blue animate-pulse" size={14} />
                                    <h3 className="text-xs font-bold font-mono text-white tracking-widest uppercase">Granovetter Threshold</h3>
                                </div>
                                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-3">
                                    <span>MODEL: GATED GRAPH NEURAL NET</span>
                                    <span className="text-oxot-blue">SYNCED</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-black font-mono tracking-tighter" style={{ color: riskColor, textShadow: `0 0 20px ${riskColor}40` }}>
                                    {(currentRisk * 100).toFixed(1)}%
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Collapse (Ψ)</div>
                            </div>
                        </div>

                        {/* Graph */}
                        <div className="flex-grow p-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPessimistic" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                                        </linearGradient>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                    <XAxis dataKey="label" tick={{ fill: '#444', fontSize: 10, fontFamily: 'monospace' }} tickLine={false} axisLine={{ stroke: '#333' }} interval={14} />
                                    <YAxis domain={[0, 1.1]} hide />

                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', fontFamily: 'monospace' }}
                                        itemStyle={{ fontSize: '12px' }}
                                    />

                                    <ReferenceLine y={0.8} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} label={{ value: "CRITICAL THRESHOLD", fill: "#ef4444", fontSize: 10, position: "insideTopRight" }} />

                                    <Area type="monotone" dataKey="pessimistic" stroke="transparent" fill="url(#colorPessimistic)" />
                                    <Area type="monotone" dataKey="optimistic" stroke="transparent" fill="url(#colorOptimistic)" />

                                    <Line type="monotone" dataKey="pessimistic" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" dot={false} opacity={0.6} />
                                    <Line type="monotone" dataKey="optimistic" stroke="#4ade80" strokeWidth={1} strokeDasharray="4 4" dot={false} opacity={0.6} />
                                    <Line type="monotone" dataKey="realist" stroke={riskColor} strokeWidth={3} dot={false} filter="url(#glow)" animationDuration={1000} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Query Footer */}
                        <div className="h-8 bg-black border-t border-white/10 flex items-center px-4 gap-2">
                            <Terminal size={12} className="text-oxot-blue" />
                            <span className="font-mono text-[10px] text-gray-500 truncate w-full animate-pulse">
                                {activeQuery || "Awaiting query..."}
                            </span>
                        </div>
                    </div>

                    {/* COLUMN 2: INGESTION STREAM */}
                    <div className="lg:col-span-3 flex flex-col gap-3 h-[625px] lg:h-[700px]">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-black/60 border border-white/10 p-3 backdrop-blur-sm rounded-lg">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <Database size={12} />
                                    <span className="text-[10px] uppercase font-mono">Data</span>
                                </div>
                                <div className="text-white font-mono font-bold text-xl">42.8M</div>
                            </div>
                            <div className="bg-black/60 border border-white/10 p-3 backdrop-blur-sm rounded-lg">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <Cpu size={12} />
                                    <span className="text-[10px] uppercase font-mono">Load</span>
                                </div>
                                <div className="text-oxot-blue font-mono font-bold text-xl">8%</div>
                            </div>
                        </div>

                        {/* Feed */}
                        <div className="flex-grow bg-black/60 border border-white/10 flex flex-col overflow-hidden rounded-xl">
                            <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
                                <h4 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">Ingestion Stream</h4>
                                <div className="w-2 h-2 rounded-full bg-oxot-blue animate-ping"></div>
                            </div>

                            <div className="flex-grow overflow-y-hidden relative p-2 space-y-2">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none z-10"></div>
                                {feeds.map((feed, idx) => (
                                    <div key={feed.id} className={`p-3 border border-white/10 bg-gray-900/30 backdrop-blur-sm transition-all duration-500 rounded-lg ${idx === 0 ? 'border-oxot-blue/50 bg-oxot-blue/5' : ''}`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-[10px] font-mono font-bold ${feed.source === 'GRID' ? 'text-yellow-400' :
                                                feed.source === 'WATER' ? 'text-oxot-blue-light' : 'text-oxot-gold'
                                                }`}>{feed.source}</span>
                                            <span className="text-[9px] text-gray-600 font-mono">{feed.timestamp}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-300 font-mono leading-tight">{feed.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 3: EXECUTIVE BRIEF */}
                    <div className="lg:col-span-4 h-[625px] lg:h-[700px]">
                        <ExecutiveBrief />
                    </div>
                </div>
            </div>
        </section>
    );
}
