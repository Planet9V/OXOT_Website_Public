'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    BarChart3, Shield, Sparkles, Target, ArrowLeft, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { BackgroundEffect } from './BackgroundEffect';
import ServicePricingCalculator from './ServicePricingCalculator';
import ExpansionTimelineBars from './ExpansionTimelineBars';
import ServicePortfolioBuilder from './ServicePortfolioBuilder';
import { PageHeader } from './branding/PageHeader';
import { OXOTLogo } from './branding/OXOTLogo';

export default function OXOTServicesPortfolio() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const [activeTab, setActiveTab] = useState<'calculator' | 'timeline' | 'builder'>('builder');

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-blue-500/30 text-slate-300">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-15 filter grayscale contrast-125">
                <BackgroundEffect />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-white origin-left z-50"
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
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400/80 text-xs font-mono tracking-[0.2em] mb-6 uppercase">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Services Portfolio 2025
                        </div>
                    </div>

                    <PageHeader
                        title="Services Portfolio"
                        subtitle="Interactive service selection, pricing models, and implementation timelines for leadership planning and strategic decision-making."
                        variant="hero"
                        accent="blue"
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

                {/* Tab Navigation */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('calculator')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'calculator'
                            ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <BarChart3 className="w-5 h-5" />
                        Pricing Calculator
                    </button>
                    <button
                        onClick={() => setActiveTab('timeline')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'timeline'
                            ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Target className="w-5 h-5" />
                        Implementation Timeline
                    </button>
                    <button
                        onClick={() => setActiveTab('builder')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'builder'
                            ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        <Sparkles className="w-5 h-5" />
                        Portfolio Builder
                    </button>
                </div>

                {/* Tier Legend */}
                <div className="flex gap-6 mb-8">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-gray-400">Gold: Psychometric & Organizational</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-400">Blue: Technical Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-gray-400">Red: Offensive Security</span>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'calculator' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ServicePricingCalculator />
                    </motion.div>
                )}

                {activeTab === 'timeline' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ExpansionTimelineBars showAll />
                    </motion.div>
                )}

                {activeTab === 'builder' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ServicePortfolioBuilder />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
