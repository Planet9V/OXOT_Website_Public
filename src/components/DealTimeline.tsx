'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Shield, AlertCircle, Server, DollarSign, Clock } from 'lucide-react';

// Extended timeline: Pre-Close + Post-Close
const MILESTONES = [
    { day: -60, label: 'Pre-LOI', description: 'Initial Assessment', phase: 'Due Diligence Start', preClose: true },
    { day: -30, label: 'LOI Signed', description: 'Exclusivity Period', phase: 'Deep DD', preClose: true },
    { day: 0, label: 'CLOSE', description: 'Deal Execution', phase: 'Day 1', preClose: false, isCritical: true },
    { day: 30, label: 'Day 30', description: 'Stabilization', phase: 'Quick Wins', preClose: false },
    { day: 60, label: 'Day 60', description: 'Integration', phase: 'Systems Consolidation', preClose: false },
    { day: 100, label: 'Day 100', description: 'Value Creation', phase: 'EBITDA Impact', preClose: false }
];

// KPI Categories
const KPI_CATEGORIES = [
    {
        id: 'risk_discovery',
        name: 'Risk Discovery Rate',
        icon: Shield,
        color: '#6366f1',
        description: 'Critical cyber issues identified',
        metric: 'Risks Found'
    },
    {
        id: 'synergies',
        name: 'Synergy Realization',
        icon: DollarSign,
        color: '#10b981',
        description: '% of target synergies achieved',
        metric: '% of Target'
    },
    {
        id: 'it_integration',
        name: 'IT Systems Integration',
        icon: Server,
        color: '#3b82f6',
        description: 'Platform consolidation progress',
        metric: '% Complete'
    },
    {
        id: 'deal_risk',
        name: 'Deal Risk Exposure',
        icon: AlertCircle,
        color: '#f59e0b',
        description: 'Unknown cybersecurity liabilities',
        metric: 'Risk Score'
    }
];

// Generate baseline timeline data (industry standard without OXOT)
const generateBaselineData = (category: string) => {
    const data = [];

    // Pre-close: -60 to 0
    for (let day = -60; day <= 0; day += 5) {
        let value;

        switch (category) {
            case 'risk_discovery':
                // Standard DD: Slow start, late discoveries
                value = day < -20 ? 0 : Math.min(35, ((day + 20) / 20) * 35);
                break;
            case 'synergies':
                value = 0; // Pre-close: just planning
                break;
            case 'it_integration':
                value = 0; // Pre-close: just assessment
                break;
            case 'deal_risk':
                // Risk remains high until close
                value = 100 - Math.min(30, ((day + 60) / 60) * 30);
                break;
            default:
                value = 0;
        }

        data.push({ day, value: Math.max(0, value), phase: 'pre' });
    }

    // Post-close: 0 to 100
    for (let day = 5; day <= 100; day += 5) {
        let value;

        switch (category) {
            case 'risk_discovery':
                // Continued discovery of missed issues
                value = 35 + (day / 100) * 35; // Climbs to 70
                break;
            case 'synergies':
                value = Math.min(60, (day / 100) * 65);
                break;
            case 'it_integration':
                value = day < 40 ? 10 : 10 + ((day - 40) / 60) * 60;
                break;
            case 'deal_risk':
                // Spike as issues surface, then slow decline
                value = day < 30 ? 70 + (day * 0.8) : 94 - ((day - 30) / 70) * 29;
                break;
            default:
                value = 0;
        }

        data.push({ day, value: Math.max(0, value), phase: 'post' });
    }

    return data;
};

// Generate OXOT-enhanced data
const generateOXOTData = (category: string) => {
    const data = [];

    // Pre-close with OXOT
    for (let day = -60; day <= 0; day += 5) {
        let value;

        switch (category) {
            case 'risk_discovery':
                // Early, comprehensive discovery
                value = day < -50 ? 0 : Math.min(85, ((day + 50) / 50) * 85);
                break;
            case 'synergies':
                value = 0;
                break;
            case 'it_integration':
                value = 0;
                break;
            case 'deal_risk':
                // Risk rapidly identified and quantified
                value = 100 - Math.min(80, ((day + 60) / 60) * 80);
                break;
            default:
                value = 0;
        }

        data.push({ day, value: Math.max(0, value), phase: 'pre' });
    }

    // Post-close with OXOT foundation
    for (let day = 5; day <= 100; day += 5) {
        let value;

        switch (category) {
            case 'risk_discovery':
                // Minimal post-close surprises
                value = 85 + (day / 100) * 5; // Plateaus at 90
                break;
            case 'synergies':
                value = Math.min(85, (day / 100) * 90);
                break;
            case 'it_integration':
                value = day < 20 ? 40 : 40 + ((day - 20) / 80) * 60;
                break;
            case 'deal_risk':
                // Low and stable
                value = 20 - (day / 100) * 5; // Decreases to 15
                break;
            default:
                value = 0;
        }

        data.push({ day, value: Math.max(0, value), phase: 'post' });
    }

    return data;
};

export default function DealTimeline() {
    const [activeKPI, setActiveKPI] = useState('risk_discovery');
    const [showOXOT, setShowOXOT] = useState(false);

    const selectedKPI = KPI_CATEGORIES.find(k => k.id === activeKPI)!;
    const baselineData = generateBaselineData(activeKPI);
    const oxotData = generateOXOTData(activeKPI);

    const baselineDay100 = baselineData[baselineData.length - 1].value;
    const oxotDay100 = oxotData[oxotData.length - 1].value;
    const improvement = oxotDay100 - baselineDay100;

    return (
        <div className="relative">
            {/* KPI Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {KPI_CATEGORIES.map(kpi => {
                    const Icon = kpi.icon;
                    const isActive = activeKPI === kpi.id;

                    return (
                        <button
                            key={kpi.id}
                            onClick={() => setActiveKPI(kpi.id)}
                            className={`relative group transition-all duration-200 p-4 rounded-lg border
                                ${isActive
                                    ? 'bg-white/10 border-white/20'
                                    : 'bg-white/5 border-white/10 hover:border-white/15'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10' : 'bg-white/5'}`}>
                                    <Icon size={18} className="text-gray-400" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">{kpi.metric}</div>
                                    <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                        {kpi.name}
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Chart Container */}
            <div className="relative backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">M&A Timeline: Pre-Close DD → Day 100</h3>
                        <p className="text-xs text-gray-400">{selectedKPI.description}</p>
                    </div>

                    {/* Simple Toggle */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">Compare with OXOT DD:</span>
                        <button
                            onClick={() => setShowOXOT(!showOXOT)}
                            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border
                                ${showOXOT
                                    ? 'bg-oxot-blue/20 border-oxot-blue/30 text-oxot-blue'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                }`}
                        >
                            {showOXOT ? 'Showing Comparison' : 'Show Comparison'}
                        </button>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-[450px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={baselineData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                            <defs>
                                <linearGradient id="baseline" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="oxot" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />

                            <XAxis
                                dataKey="day"
                                stroke="#6b7280"
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                label={{ value: 'Timeline (Days Relative to Close)', position: 'insideBottom', offset: -10, fill: '#6b7280', fontSize: 11 }}
                            />

                            <YAxis
                                stroke="#6b7280"
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                domain={[0, 120]}
                                label={{ value: selectedKPI.metric, angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #27272a',
                                    borderRadius: '8px'
                                }}
                                labelStyle={{ color: '#fff', fontSize: 12, fontWeight: 600 }}
                                itemStyle={{ color: '#9ca3af', fontSize: 11 }}
                                labelFormatter={(value) => `Day ${value} ${value < 0 ? '(Pre-Close)' : '(Post-Close)'}`}
                            />

                            {/* Milestone Lines */}
                            {MILESTONES.map(m => (
                                <ReferenceLine
                                    key={m.day}
                                    x={m.day}
                                    stroke={m.isCritical ? '#dc2626' : '#ffffff15'}
                                    strokeWidth={m.isCritical ? 2 : 1}
                                    strokeDasharray={m.isCritical ? '0' : '3 3'}
                                >
                                    <Label
                                        value={m.label}
                                        position="top"
                                        fill={m.isCritical ? '#dc2626' : '#6b7280'}
                                        fontSize={10}
                                        fontWeight={m.isCritical ? 600 : 400}
                                    />
                                </ReferenceLine>
                            ))}

                            {/* Baseline - Always visible */}
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#9ca3af"
                                strokeWidth={2}
                                fill="url(#baseline)"
                                name="Industry Baseline"
                            />

                            {/* OXOT Overlay - Only when toggled */}
                            {showOXOT && (
                                <Area
                                    data={oxotData}
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#38bdf8"
                                    strokeWidth={2}
                                    fill="url(#oxot)"
                                    name="With OXOT DD"
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Impact Callout */}
                {showOXOT && (
                    <div className="mt-6 p-4 bg-oxot-blue/10 border border-oxot-blue/20 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Day 100 Performance Impact</div>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <span className="text-xs text-gray-500">Baseline: </span>
                                        <span className="text-sm font-bold text-gray-400">{baselineDay100.toFixed(0)}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">With OXOT: </span>
                                        <span className="text-sm font-bold text-white">{oxotDay100.toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-oxot-blue/20 border border-oxot-blue/30 rounded-lg">
                                <div className="text-[9px] text-oxot-blue uppercase font-bold mb-0.5">Improvement</div>
                                <div className="text-lg font-black text-white">
                                    {improvement > 0 ? '+' : ''}{improvement.toFixed(0)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Milestones - Minimal */}
            <div className="mt-6">
                <div className="mb-4 pb-2 border-b border-white/5 flex items-center gap-2">
                    <div className="w-px h-3 bg-gradient-to-b from-oxot-blue to-transparent"></div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Milestones</h4>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {MILESTONES.map(m => (
                        <div key={m.day} className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-[9px] font-bold uppercase tracking-wider mb-1 text-gray-500">{m.label}</div>
                            <div className="text-[11px] font-bold text-white mb-1">{m.description}</div>
                            <div className="text-[9px] text-gray-500">{m.phase}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
