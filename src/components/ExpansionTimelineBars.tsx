'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { services, ServiceData } from '@/data/services-portfolio';

interface TimelineProps {
    selectedServices?: ServiceData[];
    showAll?: boolean;
}

export default function ExpansionTimelineBars({ selectedServices, showAll = false }: TimelineProps) {
    const [activeScenario, setActiveScenario] = useState<'threeMonths' | 'nineMonths' | 'oneYear'>('nineMonths');

    const displayServices = selectedServices || (showAll ? services : services.filter(s => s.priority === 'P1'));

    const scenarios = [
        {
            key: 'threeMonths' as const,
            label: '3 Months',
            color: 'green' as const,
            description: 'Quick wins and initial deployments',
            icon: Zap
        },
        {
            key: 'nineMonths' as const,
            label: '9 Months',
            color: 'blue' as const,
            description: 'Core capabilities operational',
            icon: TrendingUp
        },
        {
            key: 'oneYear' as const,
            label: '1 Year',
            color: 'gold' as const,
            description: 'Full platform maturity',
            icon: Clock
        }
    ];

    const colorClasses = {
        green: { bg: 'bg-green-500', bgLight: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-400' },
        blue: { bg: 'bg-blue-500', bgLight: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-400' },
        gold: { bg: 'bg-amber-500', bgLight: 'bg-amber-500/10', border: 'border-amber-500', text: 'text-amber-400' }
    };

    // Group services by tier
    const tierGroups = {
        Gold: displayServices.filter(s => s.tier === 'Gold'),
        Blue: displayServices.filter(s => s.tier === 'Blue'),
        Red: displayServices.filter(s => s.tier === 'Red')
    };

    return (
        <div className="space-y-6">
            {/* Scenario Selector */}
            <div className="flex flex-wrap gap-4">
                {scenarios.map((scenario) => {
                    const colors = colorClasses[scenario.color];
                    const isActive = activeScenario === scenario.key;

                    return (
                        <button
                            key={scenario.key}
                            onClick={() => setActiveScenario(scenario.key)}
                            className={`flex-1 min-w-[200px] p-4 rounded-xl border transition-all ${isActive
                                ? `${colors.bgLight} ${colors.border} border-2`
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <scenario.icon className={`w-5 h-5 ${isActive ? colors.text : 'text-gray-500'}`} />
                                <div className="text-left">
                                    <div className={`font-bold ${isActive ? colors.text : 'text-gray-300'}`}>
                                        {scenario.label}
                                    </div>
                                    <div className="text-xs text-gray-500">{scenario.description}</div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Timeline Visualization */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                {/* Timeline Header */}
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-bold text-white">
                        {scenarios.find(s => s.key === activeScenario)?.label} Milestones
                    </h4>
                    <div className="text-sm text-gray-500">
                        {displayServices.length} services
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="space-y-8">
                    {(['Gold', 'Blue', 'Red'] as const).map(tier => {
                        const tierServices = tierGroups[tier];
                        if (tierServices.length === 0) return null;

                        const tierColor = tier === 'Gold' ? '#F59E0B' : tier === 'Blue' ? '#3B82F6' : '#EF4444';

                        return (
                            <div key={tier}>
                                <div className="flex items-center gap-2 mb-4">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: tierColor }}
                                    />
                                    <span className="text-sm font-bold uppercase tracking-wider" style={{ color: tierColor }}>
                                        {tier} Tier
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {tierServices.map((service, i) => {
                                        const milestone = service.timeline[activeScenario];
                                        const colors = colorClasses[scenarios.find(s => s.key === activeScenario)!.color];

                                        return (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                                className="flex items-center gap-4"
                                            >
                                                {/* Service Name */}
                                                <div className="w-64 flex-shrink-0">
                                                    <div className="text-sm text-white font-medium truncate">
                                                        {service.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {service.priority} · Readiness {service.readiness}/5
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="flex-1 relative h-10">
                                                    <div className="absolute inset-0 bg-white/5 rounded-lg" />
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: activeScenario === 'oneYear' ? '100%' :
                                                                activeScenario === 'nineMonths' ? '75%' : '50%'
                                                        }}
                                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                                        className={`absolute inset-y-0 left-0 ${colors.bg} opacity-20 rounded-lg`}
                                                    />
                                                    <div className="absolute inset-0 flex items-center px-4">
                                                        <span className={`text-sm ${colors.text} font-medium`}>
                                                            {milestone}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Status Indicator */}
                                                <div className={`w-20 text-center text-xs font-mono ${colors.text}`}>
                                                    {activeScenario === 'threeMonths' ? 'Q1' :
                                                        activeScenario === 'nineMonths' ? 'Q3' : 'Q4'}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Comparison View */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-lg font-bold text-white mb-4">Full Timeline Comparison</h4>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 text-gray-500 font-normal uppercase tracking-wider">Service</th>
                                <th className="text-left py-3 text-gray-500 font-normal uppercase tracking-wider">Tier</th>
                                <th className="text-center py-3 text-green-400 font-normal uppercase tracking-wider">3 Months</th>
                                <th className="text-center py-3 text-blue-400 font-normal uppercase tracking-wider">9 Months</th>
                                <th className="text-center py-3 text-amber-400 font-normal uppercase tracking-wider">1 Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayServices.map((service, i) => (
                                <tr
                                    key={service.id}
                                    className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                                >
                                    <td className="py-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: service.tierColor }}
                                            />
                                            <span className="text-white">{service.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <span
                                            className="text-xs px-2 py-0.5 rounded"
                                            style={{
                                                backgroundColor: `${service.tierColor}20`,
                                                color: service.tierColor
                                            }}
                                        >
                                            {service.tier}
                                        </span>
                                    </td>
                                    <td className="py-3 text-center text-green-400">{service.timeline.threeMonths}</td>
                                    <td className="py-3 text-center text-blue-400">{service.timeline.nineMonths}</td>
                                    <td className="py-3 text-center text-amber-400">{service.timeline.oneYear}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
