'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
    Plus, X, GripVertical, DollarSign,
    Shield, Sparkles, Target, Calculator, ArrowRight,
    TrendingUp, LayoutGrid, CheckCircle2, RotateCcw
} from 'lucide-react';
import { services, ServiceData } from '@/data/services-portfolio';

export default function ServicePortfolioBuilder() {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [filterTier, setFilterTier] = useState<'all' | 'Gold' | 'Blue' | 'Red'>('all');

    // Derived lists
    const availableServices = useMemo(() => {
        return services.filter(s =>
            !selectedIds.includes(s.id) &&
            (filterTier === 'all' || s.tier === filterTier)
        );
    }, [selectedIds, filterTier]);

    const selectedServices = useMemo(() => {
        return selectedIds.map(id => services.find(s => s.id === id)!);
    }, [selectedIds]);

    // Calculations
    const totals = useMemo(() => {
        const annualValue = selectedServices.reduce((acc, s) => {
            const price = (s.pricing.medium.min + s.pricing.medium.max) / 2;
            return acc + price;
        }, 0);

        return {
            annualValue,
            count: selectedServices.length,
            goldCount: selectedServices.filter(s => s.tier === 'Gold').length,
            timeToValue: Math.max(0, ...selectedServices.map(s =>
                s.timeline.threeMonths.length > 5 ? 3 :
                    s.timeline.nineMonths.length > 5 ? 9 : 12
            ))
        };
    }, [selectedServices]);

    const toggleService = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(i => i !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'Gold': return { border: 'border-amber-500/50', text: 'text-amber-400', bg: 'bg-amber-500/10' };
            case 'Blue': return { border: 'border-blue-500/50', text: 'text-blue-400', bg: 'bg-blue-500/10' };
            case 'Red': return { border: 'border-red-500/50', text: 'text-red-400', bg: 'bg-red-500/10' };
            default: return { border: 'border-white/20', text: 'text-white', bg: 'bg-white/5' };
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Portfolio Builder</h3>
                    <p className="text-gray-400">Drag and drop or click to build your strategic service mix</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setSelectedIds([])}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                    <div className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium cursor-pointer transition-colors">
                        Export Configuration
                    </div>
                </div>
            </div>

            <LayoutGroup>
                <div className="grid lg:grid-cols-12 gap-8 h-[800px]">
                    {/* LEFT COLUMN: LIBRARY */}
                    <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col h-full overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold text-white flex items-center gap-2">
                                <LayoutGrid className="w-5 h-5 text-gray-400" />
                                Available Services
                            </h4>
                            <div className="flex gap-1 bg-black/40 p-1 rounded-lg">
                                {['all', 'Gold', 'Blue', 'Red'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setFilterTier(t as any)}
                                        className={`px-3 py-1 rounded text-xs transition-all ${filterTier === t
                                            ? 'bg-white/20 text-white'
                                            : 'text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                            <AnimatePresence>
                                {availableServices.map((service) => (
                                    <motion.div
                                        layoutId={`service-${service.id}`}
                                        key={service.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        onClick={() => toggleService(service.id)}
                                        className={`group relative p-4 rounded-xl border bg-black/40 hover:bg-white/5 cursor-pointer transition-all ${getTierColor(service.tier).border}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${getTierColor(service.tier).bg} ${getTierColor(service.tier).text}`}>
                                                        {service.tier}
                                                    </span>
                                                    <h5 className="font-bold text-white">{service.name}</h5>
                                                </div>
                                                <p className="text-xs text-gray-400 line-clamp-2">{service.description}</p>
                                            </div>
                                            <Plus className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {availableServices.length === 0 && (
                                <div className="text-center py-10 text-gray-600">
                                    No services match filter or all added.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MIDDLE: ARROW INDICATOR (Hidden on mobile) */}
                    <div className="hidden lg:flex col-span-1 items-center justify-center">
                        <ArrowRight className="w-8 h-8 text-white/10" />
                    </div>

                    {/* RIGHT COLUMN: PORTFOLIO */}
                    <div className="lg:col-span-6 flex flex-col h-full gap-4">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 rounded-2xl p-6">
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <div className="text-xs text-blue-300 uppercase tracking-wider mb-1">Annual Value</div>
                                    <div className="text-2xl font-mono font-bold text-white">
                                        €{(totals.annualValue / 1000).toFixed(0)}k
                                    </div>
                                    <div className="text-xs text-gray-500">Estimated Base</div>
                                </div>
                                <div>
                                    <div className="text-xs text-blue-300 uppercase tracking-wider mb-1">Service Count</div>
                                    <div className="text-2xl font-bold text-white">{totals.count}</div>
                                    <div className="text-xs text-amber-500">{totals.goldCount} Gold Tier</div>
                                </div>
                                <div>
                                    <div className="text-xs text-blue-300 uppercase tracking-wider mb-1">Time to Value</div>
                                    <div className="text-2xl font-bold text-green-400">
                                        {totals.timeToValue > 0 ? `~${totals.timeToValue} mo` : '-'}
                                    </div>
                                    <div className="text-xs text-gray-500">Implementation</div>
                                </div>
                            </div>
                        </div>

                        {/* Drop / List Area */}
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col overflow-hidden relative">
                            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-400" />
                                Your Strategic Portfolio
                            </h4>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                <AnimatePresence>
                                    {selectedServices.map((service) => (
                                        <motion.div
                                            layoutId={`service-${service.id}`}
                                            key={service.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className={`relative p-4 rounded-xl border bg-gradient-to-r from-white/10 to-transparent flex items-center justify-between group ${getTierColor(service.tier).border}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <GripVertical className="w-5 h-5 text-gray-600 cursor-grab active:cursor-grabbing" />
                                                <div>
                                                    <div className="font-bold text-white">{service.name}</div>
                                                    <div className="text-xs text-gray-400">
                                                        €{(service.pricing.medium.min / 1000).toFixed(0)}k - €{(service.pricing.medium.max / 1000).toFixed(0)}k
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => toggleService(service.id)}
                                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {selectedServices.length === 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 pointer-events-none">
                                        <Target className="w-16 h-16 mb-4 opacity-20" />
                                        <p>Select services from the left to build your portfolio</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutGroup>
        </div>
    );
}
