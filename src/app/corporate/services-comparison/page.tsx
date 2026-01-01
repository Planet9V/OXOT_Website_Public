'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, ArrowRight, CheckCircle, XCircle, Minus,
    Target, Layers, Award, AlertTriangle, Info, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { services, ServiceData } from '@/data/services-portfolio';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import { PageHeader } from '@/components/branding/PageHeader';

// Competitor mapping
const COMPETITORS: Record<number, { name: string; features: Record<string, boolean | 'partial'> }[]> = {
    1: [ // On-Premise Threat Intelligence
        { name: 'CrowdStrike Falcon', features: { 'On-Premise Option': false, 'Multi-Agent AI': false, 'Privacy Preservation': false, 'Real-time Detection': true } },
        { name: 'SentinelOne', features: { 'On-Premise Option': 'partial', 'Multi-Agent AI': false, 'Privacy Preservation': false, 'Real-time Detection': true } },
    ],
    4: [ // Neural Physics Propagation Control
        { name: 'Palo Alto XDR', features: { 'Sub-10s Containment': false, 'Spectral Analysis': false, 'Epidemic Math': false, 'Automated Response': true } },
        { name: 'Microsoft Defender', features: { 'Sub-10s Containment': false, 'Spectral Analysis': false, 'Epidemic Math': false, 'Automated Response': 'partial' } },
    ],
    7: [ // Real-Time Insurance Underwriting
        { name: 'CyberCube', features: { 'Real-time Scoring': false, 'Psychometric Risk': false, 'Graph-based Analysis': 'partial', 'Carrier Integration': true } },
        { name: 'SecurityScorecard', features: { 'Real-time Scoring': 'partial', 'Psychometric Risk': false, 'Graph-based Analysis': false, 'Carrier Integration': true } },
    ],
    11: [ // Team Composition Optimization
        { name: 'Predictive Index', features: { 'DISC×OCEAN Tensors': false, 'Team Dynamics Model': 'partial', 'Security Focus': false, 'Mathematical Optimization': false } },
        { name: 'Hogan Assessment', features: { 'DISC×OCEAN Tensors': false, 'Team Dynamics Model': 'partial', 'Security Focus': false, 'Mathematical Optimization': false } },
    ]
};

// Compliance frameworks
const COMPLIANCE_FRAMEWORKS = ['HIPAA', 'NERC CIP', 'PCI DSS', 'GDPR', 'NIS2', 'SOX', 'SOC2', 'EEOC'];

export default function ServicesComparisonPage() {
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [comparisonView, setComparisonView] = useState<'competitor' | 'compliance'>('competitor');

    const selectedServiceData = selectedService ? services.find(s => s.id === selectedService) : null;
    const competitors = selectedService ? COMPETITORS[selectedService] : null;

    return (
        <div className="min-h-screen">
            <BackgroundEffect />

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <PageHeader
                    title="TECHNOLOGY COMPARISON"
                    subtitle="Competitive Analysis // Feature Matrix"
                    variant="default"
                    accent="red"
                />

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/corporate/services-portfolio" className="hover:text-white transition-colors">
                        Services Portfolio
                    </Link>
                    <ArrowRight size={14} />
                    <span className="text-white">Technology Comparison</span>
                </div>

                {/* View Toggle */}
                <div className="flex gap-2 mb-8">
                    <button
                        onClick={() => setComparisonView('competitor')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${comparisonView === 'competitor' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                            }`}
                    >
                        Competitor Analysis
                    </button>
                    <button
                        onClick={() => setComparisonView('compliance')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${comparisonView === 'compliance' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
                            }`}
                    >
                        Compliance Coverage
                    </button>
                </div>

                {comparisonView === 'competitor' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Service Selector */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sticky top-24">
                                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                    <Layers size={16} /> Select Service
                                </h3>
                                <div className="space-y-2">
                                    {services.filter(s => COMPETITORS[s.id]).map((service) => {
                                        const isSelected = selectedService === service.id;
                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => setSelectedService(service.id)}
                                                className={`w-full text-left p-3 rounded-lg border transition-all ${isSelected
                                                    ? 'bg-white/20 border-white/30'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                <div className="font-medium text-white text-sm">{service.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    vs. {service.competitors.join(', ')}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-xs text-gray-500">
                                        <Info size={12} className="inline mr-1" />
                                        Comparison data based on publicly available information
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Comparison Matrix */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {selectedServiceData && competitors ? (
                                    <motion.div
                                        key={selectedService}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-6"
                                    >
                                        {/* Service Header */}
                                        <div className="bg-gradient-to-r from-white/10 to-transparent border border-white/10 rounded-xl p-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white">{selectedServiceData.name}</h3>
                                                    <p className="text-gray-400 mt-2">{selectedServiceData.description}</p>
                                                </div>
                                                <span className={`text-sm font-bold px-3 py-1 rounded ${selectedServiceData.disruptionLevel === 'Disruptor' ? 'bg-purple-500/20 text-purple-400' :
                                                    selectedServiceData.disruptionLevel === 'Very High' ? 'bg-red-500/20 text-red-400' :
                                                        selectedServiceData.disruptionLevel === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                    }`}>
                                                    {selectedServiceData.disruptionLevel}
                                                </span>
                                            </div>

                                            <div className="mt-4 p-3 bg-oxot-gold/10 border border-oxot-gold/20 rounded-lg">
                                                <div className="text-sm text-oxot-gold font-medium">Key Differentiator</div>
                                                <div className="text-white">{selectedServiceData.differentiator}</div>
                                            </div>
                                        </div>

                                        {/* Feature Comparison Table */}
                                        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-white/10">
                                                        <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500">Feature</th>
                                                        <th className="text-center p-4 text-xs uppercase tracking-wider text-oxot-gold">OXOT</th>
                                                        {competitors.map((comp, i) => (
                                                            <th key={i} className="text-center p-4 text-xs uppercase tracking-wider text-gray-500">
                                                                {comp.name}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(competitors[0].features).map((feature) => (
                                                        <tr key={feature} className="border-b border-white/5">
                                                            <td className="p-4 text-sm text-white">{feature}</td>
                                                            <td className="p-4 text-center">
                                                                <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                                                            </td>
                                                            {competitors.map((comp, i) => (
                                                                <td key={i} className="p-4 text-center">
                                                                    {comp.features[feature] === true ? (
                                                                        <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                                                                    ) : comp.features[feature] === 'partial' ? (
                                                                        <Minus className="w-5 h-5 text-yellow-400 mx-auto" />
                                                                    ) : (
                                                                        <XCircle className="w-5 h-5 text-red-400/50 mx-auto" />
                                                                    )}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Legend */}
                                        <div className="flex items-center gap-6 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <CheckCircle className="w-4 h-4 text-green-400" /> Full Support
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Minus className="w-4 h-4 text-yellow-400" /> Partial
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <XCircle className="w-4 h-4 text-red-400/50" /> Not Available
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center h-96 text-gray-500"
                                    >
                                        <Target className="w-16 h-16 mb-4 opacity-20" />
                                        <p>Select a service to view competitor comparison</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    /* Compliance Coverage View */
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/10">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Shield size={18} /> Compliance Coverage Matrix
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-3 text-xs uppercase tracking-wider text-gray-500 sticky left-0 bg-[#0a0a0a]">
                                            Service
                                        </th>
                                        {COMPLIANCE_FRAMEWORKS.map((framework) => (
                                            <th key={framework} className="text-center p-3 text-xs uppercase tracking-wider text-gray-500 min-w-[80px]">
                                                {framework}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((service) => (
                                        <tr key={service.id} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="p-3 sticky left-0 bg-[#0a0a0a]">
                                                <div className="font-medium text-white text-sm">{service.name}</div>
                                            </td>
                                            {COMPLIANCE_FRAMEWORKS.map((framework) => {
                                                const hasCompliance = service.compliance.includes(framework);
                                                return (
                                                    <td key={framework} className="p-3 text-center">
                                                        {hasCompliance ? (
                                                            <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                                                        ) : (
                                                            <span className="w-4 h-4 block mx-auto text-gray-700">—</span>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Compliance Summary */}
                        <div className="p-4 bg-white/5 border-t border-white/10">
                            <div className="grid grid-cols-4 gap-4">
                                {COMPLIANCE_FRAMEWORKS.slice(0, 4).map((framework) => {
                                    const count = services.filter(s => s.compliance.includes(framework)).length;
                                    return (
                                        <div key={framework} className="text-center">
                                            <div className="text-2xl font-bold text-white">{count}</div>
                                            <div className="text-xs text-gray-500">{framework} Services</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-12 bg-gradient-to-r from-white/10 to-transparent border border-white/10 rounded-xl p-8 flex items-center justify-between">
                    <div>
                        <h4 className="text-xl font-bold text-white">Ready to build your portfolio?</h4>
                        <p className="text-gray-400 mt-1">Select the services that match your requirements and compliance needs.</p>
                    </div>
                    <Link
                        href="/corporate/services-portfolio"
                        className="px-6 py-3 bg-oxot-gold hover:bg-oxot-gold-light text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                    >
                        Build Portfolio <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
