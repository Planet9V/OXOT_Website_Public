'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Database, BarChart3, TrendingUp, Brain, Sparkles,
    ChevronDown, ChevronUp, ArrowLeft, Check, Clock,
    ExternalLink, Code, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { BackgroundEffect } from './BackgroundEffect';
import { PageHeader } from './branding/PageHeader';
import { OXOTLogo } from './branding/OXOTLogo';
import {
    enhancements,
    tiers,
    getEnhancementsByTier,
    enhancementStats,
    EnhancementTier,
    Enhancement
} from '@/data/enhancements-index';

export default function OXOTEnhancementsIndex() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const [activeTier, setActiveTier] = useState<EnhancementTier | 'all'>('all');
    const [expandedEnhancement, setExpandedEnhancement] = useState<string | null>(null);

    const displayEnhancements = activeTier === 'all'
        ? enhancements
        : getEnhancementsByTier(activeTier);

    const getTierIcon = (tier: EnhancementTier) => {
        switch (tier) {
            case 'foundation': return Database;
            case 'visualization': return BarChart3;
            case 'economic': return TrendingUp;
            case 'psychological': return Brain;
            case 'synthesis': return Sparkles;
        }
    };

    const getStatusColor = (status: Enhancement['status']) => {
        switch (status) {
            case 'COMPLETE': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'IN_PROGRESS': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'PLANNED': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            case 'RESEARCH': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-amber-500/30 text-slate-300">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-15 filter grayscale contrast-125">
                <BackgroundEffect />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-white origin-left z-50"
                style={{ scaleX }}
            />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 pb-40">


                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center relative text-center">
                    {/* Navigation */}
                    <div className="absolute top-20 left-0">
                        <Link
                            href="/corporate/strategic-planning"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Strategic Planning
                        </Link>
                    </div>

                    <div className="mb-8 flex flex-col items-center gap-6">
                        <OXOTLogo size="lg" animated />
                    </div>

                    <div className="mb-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400/80 text-xs font-mono tracking-[0.2em] mb-6 uppercase">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            API Enhancement Catalog
                        </div>
                    </div>

                    <PageHeader
                        title="API Enhancements"
                        subtitle="Comprehensive catalog of AEON Digital Twin API enhancements organized by tier, with implementation status, dependencies, and business value ratings."
                        variant="hero"
                        accent="gold"
                        className="items-center"
                    />

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                    >
                        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Explore</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                    </motion.div>
                </section>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                        <div className="text-2xl md:text-3xl font-black text-green-400">{enhancementStats.complete}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1">Complete</div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
                        <div className="text-2xl md:text-3xl font-black text-blue-400">{enhancementStats.inProgress}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1">In Progress</div>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center">
                        <div className="text-2xl md:text-3xl font-black text-amber-400">{enhancementStats.planned}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1">Planned</div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                        <div className="text-2xl md:text-3xl font-black text-white">{enhancementStats.totalApiEndpoints}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1">Endpoints</div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center col-span-2 md:col-span-1">
                        <div className="text-2xl md:text-3xl font-black text-white">{enhancementStats.tiers}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1">Tiers</div>
                    </div>
                </div>

                {/* Tier Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        onClick={() => setActiveTier('all')}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTier === 'all'
                            ? 'bg-white/20 border border-white/40 text-white'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        All ({enhancements.length})
                    </button>
                    {tiers.map(tier => {
                        const Icon = getTierIcon(tier.id);
                        const count = getEnhancementsByTier(tier.id).length;
                        return (
                            <button
                                key={tier.id}
                                onClick={() => setActiveTier(tier.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTier === tier.id
                                    ? 'border-2'
                                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                                    }`}
                                style={activeTier === tier.id ? {
                                    backgroundColor: `${tier.color}20`,
                                    borderColor: tier.color,
                                    color: tier.color
                                } : {}}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{tier.name.split(':')[0]}</span>
                                <span className="text-xs opacity-60">({count})</span>
                            </button>
                        );
                    })}
                </div>

                {/* Enhancement Cards */}
                <div className="space-y-4">
                    {displayEnhancements.map((enhancement, i) => {
                        const tierInfo = tiers.find(t => t.id === enhancement.tier)!;
                        const Icon = getTierIcon(enhancement.tier);
                        const isExpanded = expandedEnhancement === enhancement.id;

                        return (
                            <motion.div
                                key={enhancement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.02 }}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                            >
                                {/* Card Header */}
                                <div
                                    className="p-6 cursor-pointer hover:bg-white/[0.02] transition-all"
                                    onClick={() => setExpandedEnhancement(isExpanded ? null : enhancement.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* ID Badge */}
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${tierInfo.color}20` }}
                                        >
                                            <span className="text-sm font-bold" style={{ color: tierInfo.color }}>
                                                {enhancement.id}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-white">{enhancement.name}</h3>
                                                <span className={`px-2 py-0.5 rounded text-xs border ${getStatusColor(enhancement.status)}`}>
                                                    {enhancement.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">{enhancement.description}</p>
                                        </div>

                                        {/* Ratings */}
                                        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                                            <div className="text-center">
                                                <div className="text-xs text-gray-500 mb-1">Business Value</div>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <div
                                                            key={n}
                                                            className={`w-2 h-4 rounded-sm ${n <= enhancement.businessValue
                                                                ? 'bg-amber-400'
                                                                : 'bg-white/10'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs text-gray-500 mb-1">Complexity</div>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <div
                                                            key={n}
                                                            className={`w-2 h-4 rounded-sm ${n <= enhancement.technicalComplexity
                                                                ? 'bg-red-400'
                                                                : 'bg-white/10'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expand Button */}
                                        <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                                            {isExpanded
                                                ? <ChevronUp className="w-5 h-5 text-gray-400" />
                                                : <ChevronDown className="w-5 h-5 text-gray-400" />
                                            }
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 border-t border-white/10"
                                    >
                                        <div className="pt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {/* Capabilities */}
                                            <div>
                                                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                                                    Capabilities
                                                </h4>
                                                <ul className="space-y-2">
                                                    {enhancement.capabilities.map((cap, j) => (
                                                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                                                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                            {cap}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Dependencies */}
                                            <div>
                                                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                                                    Dependencies
                                                </h4>
                                                {enhancement.dependencies.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {enhancement.dependencies.map((dep, j) => (
                                                            <span
                                                                key={j}
                                                                className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400"
                                                            >
                                                                {dep}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500">No dependencies</span>
                                                )}
                                            </div>

                                            {/* Effort */}
                                            <div>
                                                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                                                    Estimated Effort
                                                </h4>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                    <span className="text-sm text-gray-300">{enhancement.estimatedEffort}</span>
                                                </div>
                                            </div>

                                            {/* API Endpoints */}
                                            <div>
                                                <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                                                    API Endpoints
                                                </h4>
                                                {enhancement.apiEndpoints ? (
                                                    <ul className="space-y-1">
                                                        {enhancement.apiEndpoints.map((endpoint, j) => (
                                                            <li key={j} className="flex items-center gap-2 text-sm">
                                                                <Code className="w-3 h-3 text-green-400" />
                                                                <code className="text-gray-400 text-xs">{endpoint}</code>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span className="text-sm text-gray-500">Documentation pending</span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Dependency Map Preview */}
                <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Enhancement Dependency Flow</h3>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {tiers.map((tier, i) => (
                            <React.Fragment key={tier.id}>
                                <div
                                    className="px-6 py-4 rounded-xl text-center"
                                    style={{
                                        backgroundColor: `${tier.color}10`,
                                        borderWidth: 2,
                                        borderColor: tier.color
                                    }}
                                >
                                    <div className="text-sm font-bold" style={{ color: tier.color }}>
                                        {tier.name.split(':')[0]}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {getEnhancementsByTier(tier.id).length} enhancements
                                    </div>
                                </div>
                                {i < tiers.length - 1 && (
                                    <div className="text-2xl text-gray-600">→</div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        E27 (Psychohistory Synthesis) integrates capabilities from all tiers into the unified prediction engine
                    </p>
                </div>
            </div>
        </div>
    );
}
