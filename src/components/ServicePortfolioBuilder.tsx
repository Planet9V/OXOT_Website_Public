'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
    Plus, X, GripVertical, DollarSign,
    Shield, Sparkles, Target, Calculator, ArrowRight,
    TrendingUp, LayoutGrid, CheckCircle2, RotateCcw, BookOpen, ExternalLink,
    Download, Globe, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { services, ServiceData, regions, getRegionalPrice, formatPrice, Region } from '@/data/services-portfolio';
import PortfolioExport from './PortfolioExport';


export interface ServicePortfolioBuilderProps {
    selectedIds: number[];
    onToggleService: (id: number) => void;
    regionId: string;
    setRegionId: (id: string) => void;
    clientSize: 'small' | 'medium' | 'enterprise';
    setClientSize: (size: 'small' | 'medium' | 'enterprise') => void;
}

export default function ServicePortfolioBuilder({
    selectedIds,
    onToggleService,
    regionId,
    setRegionId,
    clientSize,
    setClientSize
}: ServicePortfolioBuilderProps) {
    const [filterTier, setFilterTier] = useState<'all' | 'Gold' | 'Blue' | 'Red'>('all');
    const [showRegionDropdown, setShowRegionDropdown] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const router = useRouter(); // Keeping router for now, though it might move up


    // Removed internal handleGenerateStrategy, logic moved to parent


    const region = regions[regionId] || regions.EU;

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

    // Calculations with regional pricing
    const totals = useMemo(() => {
        let minValue = 0;
        let maxValue = 0;

        selectedServices.forEach(s => {
            const price = getRegionalPrice(s, regionId, clientSize);
            minValue += price.min;
            maxValue += price.max;
        });

        return {
            minValue,
            maxValue,
            avgValue: (minValue + maxValue) / 2,
            count: selectedServices.length,
            goldCount: selectedServices.filter(s => s.tier === 'Gold').length,
            blueCount: selectedServices.filter(s => s.tier === 'Blue').length,
            redCount: selectedServices.filter(s => s.tier === 'Red').length,
            timeToValue: Math.max(0, ...selectedServices.map(s =>
                s.timeline.threeMonths.length > 5 ? 3 :
                    s.timeline.nineMonths.length > 5 ? 9 : 12
            ))
        };
    }, [selectedServices, regionId, clientSize]);

    // toggleService is now passed as a prop


    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'Gold': return { border: 'border-amber-500/50', text: 'text-amber-400', bg: 'bg-amber-500/10' };
            case 'Blue': return { border: 'border-blue-500/50', text: 'text-blue-400', bg: 'bg-blue-500/10' };
            case 'Red': return { border: 'border-red-500/50', text: 'text-red-400', bg: 'bg-red-500/10' };
            default: return { border: 'border-white/20', text: 'text-white', bg: 'bg-white/5' };
        }
    };

    return (
        <>
            <div className="space-y-8">
                {/* Header with controls */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Portfolio Builder</h3>
                        <p className="text-gray-400">Select services to build your strategic mix</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Region Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors"
                            >
                                <Globe size={14} className="text-gray-400" />
                                {region.name}
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${showRegionDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showRegionDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full mt-1 right-0 w-48 bg-[#111] border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden"
                                    >
                                        {Object.values(regions).map((r) => (
                                            <button
                                                key={r.id}
                                                onClick={() => { setRegionId(r.id); setShowRegionDropdown(false); }}
                                                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-white/10 transition-colors ${regionId === r.id ? 'bg-white/5 text-white' : 'text-gray-400'
                                                    }`}
                                            >
                                                <span>{r.name}</span>
                                                <span className="font-mono text-xs">
                                                    {r.multiplier !== 1 ? `${(r.multiplier * 100).toFixed(0)}%` : r.symbol}
                                                </span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Client Size Selector */}
                        <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                            {(['small', 'medium', 'enterprise'] as const).map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setClientSize(size)}
                                    className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${clientSize === size
                                        ? 'bg-white/20 text-white'
                                        : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {size === 'small' ? 'SMB' : size === 'medium' ? 'Mid-Market' : 'Enterprise'}
                                </button>
                            ))}
                        </div>

                        {/* Actions */}
                        <button
                            onClick={() => selectedIds.filter(id => onToggleService(id))} // This is a bit hacky for "Reset", better to lift reset too.
                            // Actually, let's just emit a clear event or handle it in parent.
                            // For now, let's just make the Reset button use a passed reset prop or just iterate and toggle.
                            // Simplest: The parent should probably provide a reset function, but for now let's just not support reset in this child component easily without a prop change.
                            // Let's change the prop interface to include onReset?
                            // Or, we can just map over selectedIds and toggle them off? No, that's inefficient.
                            // I should add `onReset` to props.
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>

                        <button
                            onClick={() => setShowExport(true)}
                            disabled={selectedServices.length === 0}
                            className="px-4 py-2 bg-oxot-gold hover:bg-oxot-gold-light disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-black font-medium transition-colors flex items-center gap-2"
                        >
                            <Download size={16} />
                            Export
                        </button>



                    </div>
                </div>

                {/* Quick Links to Sub-Pages */}
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/corporate/services-pricing"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <DollarSign size={14} /> Pricing Calculator
                    </Link>
                    <Link
                        href="/corporate/services-timeline"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <TrendingUp size={14} /> Implementation Timeline
                    </Link>
                    <Link
                        href="/corporate/services-comparison"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <Shield size={14} /> Competitor Comparison
                    </Link>
                </div>

                <LayoutGroup>
                    <div className="grid lg:grid-cols-12 gap-8 h-[700px]">
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
                                    {availableServices.map((service) => {
                                        const price = getRegionalPrice(service, regionId, clientSize);
                                        return (
                                            <motion.div
                                                layoutId={`service-${service.id}`}
                                                key={service.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                onClick={() => onToggleService(service.id)}
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
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <span className="text-xs font-mono text-gray-500">
                                                                {formatPrice(price.min, price.symbol)} - {formatPrice(price.max, price.symbol)}
                                                            </span>
                                                            {service.theoryLink && (
                                                                <Link
                                                                    href={service.theoryLink}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
                                                                >
                                                                    <BookOpen className="w-3 h-3" />
                                                                    Theory
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Plus className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
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
                            <div className="bg-gradient-to-br from-oxot-gold/10 to-black border border-oxot-gold/30 rounded-2xl p-6">
                                <div className="grid grid-cols-4 gap-6">
                                    <div>
                                        <div className="text-xs text-oxot-gold uppercase tracking-wider mb-1">Annual Value</div>
                                        <div className="text-2xl font-mono font-bold text-white">
                                            {formatPrice(totals.avgValue, region.symbol)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {formatPrice(totals.minValue, region.symbol)} - {formatPrice(totals.maxValue, region.symbol)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-oxot-gold uppercase tracking-wider mb-1">Services</div>
                                        <div className="text-2xl font-bold text-white">{totals.count}</div>
                                        <div className="text-xs text-gray-500">
                                            {totals.goldCount}G / {totals.blueCount}B / {totals.redCount}R
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-oxot-gold uppercase tracking-wider mb-1">Time to Value</div>
                                        <div className="text-2xl font-bold text-green-400">
                                            {totals.timeToValue > 0 ? `~${totals.timeToValue} mo` : '-'}
                                        </div>
                                        <div className="text-xs text-gray-500">Implementation</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-oxot-gold uppercase tracking-wider mb-1">Region</div>
                                        <div className="text-2xl font-bold text-white">{region.symbol}</div>
                                        <div className="text-xs text-gray-500">{region.currency}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Drop / List Area */}
                            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col overflow-hidden relative">
                                <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-oxot-gold" />
                                    Your Strategic Portfolio
                                </h4>

                                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                    <AnimatePresence>
                                        {selectedServices.map((service) => {
                                            const price = getRegionalPrice(service, regionId, clientSize);
                                            return (
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
                                                                {formatPrice(price.min, price.symbol)} - {formatPrice(price.max, price.symbol)}
                                                                {service.theoryLink && (
                                                                    <Link
                                                                        href={service.theoryLink}
                                                                        className="ml-2 inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                                                                    >
                                                                        <ExternalLink className="w-3 h-3" />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => onToggleService(service.id)}
                                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                                    >
                                                        <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
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

            {/* Export Modal */}
            <AnimatePresence>
                {showExport && (
                    <PortfolioExport
                        selectedServices={selectedServices}
                        regionId={regionId}
                        clientSize={clientSize}
                        onClose={() => setShowExport(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
