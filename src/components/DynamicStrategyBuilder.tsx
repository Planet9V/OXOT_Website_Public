'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, ChevronLeft, Shield, TrendingUp, DollarSign, Target,
    CheckCircle2, ArrowRight, Zap, Globe, LayoutGrid, Clock, AlertTriangle
} from 'lucide-react';
import { services, ServiceData, regions, getRegionalPrice, formatPrice, Region } from '@/data/services-portfolio';
import Link from 'next/link';
import { generatePortfolioPDF } from '@/utils/portfolio-pdf';

interface SavedStrategy {
    selectedIds: number[];
    regionId: string;
    clientSize: 'small' | 'medium' | 'enterprise';
}

export default function DynamicStrategyBuilder() {
    const [strategy, setStrategy] = useState<SavedStrategy | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [aiState, setAiState] = useState<'idle' | 'analyzing' | 'synergy' | 'drafting' | 'finalizing'>('idle');
    const [aiProgress, setAiProgress] = useState(0);

    // AI Loading Overlay Component
    const AiOverlay = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 transition-opacity"
        >
            <div className="w-full max-w-md space-y-8 text-center relative z-50">
                <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-r-4 border-purple-500 rounded-full animate-spin-reverse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="text-white w-8 h-8 animate-pulse" />
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {aiState === 'analyzing' && 'Analyzing Portfolio...'}
                        {aiState === 'synergy' && 'Optimizing Synergy Matrix...'}
                        {aiState === 'drafting' && 'Composing Executive Strategy...'}
                        {aiState === 'finalizing' && 'Finalizing PDF Artifact...'}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono">
                        {aiState === 'analyzing' && `Scanning ${selectedServices.length} selected vectors.`}
                        {aiState === 'synergy' && 'Calculating cross-domain efficacy.'}
                        {aiState === 'drafting' && 'Writing narrative and financial justification.'}
                        {aiState === 'finalizing' && 'Packaging document.'}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-oxot-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${aiProgress}%` }}
                        transition={{ ease: "easeInOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('oxot_strategy_portfolio');
        if (saved) {
            try {
                setStrategy(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse strategy', e);
            }
        }
    }, []);

    const selectedServices = useMemo(() => {
        if (!strategy || !Array.isArray(strategy.selectedIds)) return [];
        return services.filter(s => strategy.selectedIds.includes(s.id));
    }, [strategy]);

    const region = useMemo(() => {
        if (!strategy) return null;
        return regions[strategy.regionId] || null;
    }, [strategy]);

    const financials = useMemo(() => {
        if (!selectedServices.length || !region || !strategy) return null;
        const total = selectedServices.reduce((acc, s) => {
            const price = getRegionalPrice(s, region.id, strategy.clientSize);
            return {
                min: acc.min + price.min,
                max: acc.max + price.max,
                avg: acc.avg + (price.min + price.max) / 2
            };
        }, { min: 0, max: 0, avg: 0 });
        return total;
    }, [selectedServices, region, strategy]);

    const slides = useMemo(() => [
        { id: 'title', title: 'Strategic Initiative', type: 'title' },
        { id: 'exec', title: 'Executive Summary', type: 'executive' },
        { id: 'portfolio', title: 'Service Composition', type: 'portfolio' },
        { id: 'financials', title: 'Financial Analysis', type: 'financials' },
        { id: 'roadmap', title: 'Implementation Timeline', type: 'timeline' },
        { id: 'competition', title: 'Competitive Advantage', type: 'competitors' },
        { id: 'closing', title: 'Execution', type: 'closing' }
    ], []);

    const nextSlide = () => setCurrentSlide(s => Math.min(s + 1, slides.length - 1));
    const prevSlide = () => setCurrentSlide(s => Math.max(s - 1, 0));

    const handleExport = async () => {
        if (!strategy) return;

        // Start AI Simulation
        setAiState('analyzing');
        setAiProgress(0);

        // SEQUENCE
        // 1. Analyzing
        await new Promise(r => setTimeout(r, 800));
        setAiProgress(30);

        // 2. Synergy
        setAiState('synergy');
        await new Promise(r => setTimeout(r, 1000));
        setAiProgress(60);

        // 3. Drafting
        setAiState('drafting');
        await new Promise(r => setTimeout(r, 800));
        setAiProgress(90);

        // 4. Finalizing (Actual Gen)
        setAiState('finalizing');
        try {
            await generatePortfolioPDF({
                selectedServices,
                regionId: strategy.regionId,
                clientSize: strategy.clientSize,
                clientName: 'Strategic Client' // In a real app, this would be from config
            });
            setAiProgress(100);
        } catch (error) {
            console.error('Export failed', error);
        } finally {
            // Reset after delay
            setTimeout(() => {
                setAiState('idle');
                setAiProgress(0);
            }, 1000);
        }
    };

    if (!mounted) return <div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>;
    if (!strategy || selectedServices.length === 0) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">No Strategy Found</h2>
            <p className="text-gray-400 mb-8">Please select services from the Portfolio Builder first.</p>
            <Link href="/corporate/services-portfolio" className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-500 transition-colors">
                Go to Portfolio Builder
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center relative">
            <AnimatePresence>
                {aiState !== 'idle' && <AiOverlay />}
            </AnimatePresence>

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />

            {/* Header / Progress */}
            <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center font-bold font-mono">
                        {currentSlide + 1}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest">{slides[currentSlide]?.title}</div>
                </div>
                <div className="flex gap-1">
                    {slides.map((_, idx) => (
                        <div key={idx} className={`h-1 w-8 rounded-full transition-colors ${idx === currentSlide ? 'bg-blue-500' : idx < currentSlide ? 'bg-blue-900' : 'bg-white/10'}`} />
                    ))}
                </div>
            </div >

            {/* Main Slide Area */}
            < div className="w-full max-w-7xl px-8 h-[80vh] relative z-10 flex items-center" >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full flex flex-col justify-center"
                    >
                        {slides[currentSlide].type === 'title' && (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="inline-block mb-6 px-6 py-2 border border-blue-500/30 bg-blue-500/10 rounded-full text-blue-400 font-mono tracking-widest uppercase"
                                >
                                    Strategic Proposal
                                </motion.div>
                                <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-8">
                                    Cyber Resilience Initiative
                                </h1>
                                <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                    Prepared for <span className="text-white font-bold capitalize">{strategy.clientSize} Enterprise</span> deployment in the <span className="text-white font-bold">{region?.name}</span> region.
                                </p>
                                <div className="mt-12 flex justify-center gap-8 text-sm font-mono text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <span className="text-white text-xl">{selectedServices.length}</span>
                                        <span>Services Selected</span>
                                    </div>
                                    <div className="w-px bg-white/10" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-white text-xl">{formatPrice(financials?.avg || 0, region?.symbol)}</span>
                                        <span>Annual Value</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'executive' && (
                            <div className="grid grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-4xl font-bold mb-8 text-blue-400">Executive Summary</h2>
                                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                        This strategic initiative consolidates {selectedServices.length} key capabilities to address critical gaps in your current security posture.
                                        By unifying these services, we project a significantly reduced Time-to-Value compared to fragmented vendor adoption.
                                    </p>
                                    <ul className="space-y-6">
                                        <li className="flex items-start gap-4">
                                            <div className="bg-green-500/20 p-2 rounded-lg"><TrendingUp className="text-green-400" /></div>
                                            <div>
                                                <h4 className="font-bold text-white">Consolidated Efficacy</h4>
                                                <p className="text-sm text-gray-400">Moving from point solutions to an integrated outcome-based portfolio.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-blue-500/20 p-2 rounded-lg"><Zap className="text-blue-400" /></div>
                                            <div>
                                                <h4 className="font-bold text-white">Accelerated Maturity</h4>
                                                <p className="text-sm text-gray-400">Rapid deployment model targeting Phase 1 efficacy within 90 days.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />
                                    <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Key Drivers</h3>
                                    <div className="space-y-4">
                                        {selectedServices.slice(0, 3).map(s => (
                                            <div key={s.id} className="flex items-center justify-between group">
                                                <span className="text-gray-300 group-hover:text-white transition-colors">{s.name}</span>
                                                <ArrowRight className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                                            </div>
                                        ))}
                                        {selectedServices.length > 3 && (
                                            <div className="text-sm text-gray-500 pt-2 italic">
                                                + {selectedServices.length - 3} other strategic services
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'portfolio' && (
                            <div className="h-full flex flex-col">
                                <h2 className="text-4xl font-bold mb-8 text-blue-400">Proposed Service Portfolio</h2>
                                <div className="flex-1 overflow-y-auto pr-4 grid grid-cols-3 gap-6 auto-rows-min custom-scrollbar">
                                    {selectedServices.map(s => (
                                        <div key={s.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group">
                                            <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider">{s.tier} Tier</div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{s.name}</h3>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{s.description}</p>
                                            <div className="text-xs text-gray-500 font-mono">
                                                Implementation: {s.timeline?.threeMonths || 'Planning'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'financials' && financials && (
                            <div className="grid grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-4xl font-bold mb-4 text-amber-500">Investment Analysis</h2>
                                    <p className="text-gray-400 mb-12">Total Contract Value based on standard regional pricing for {strategy.clientSize} organizations.</p>

                                    <div className="space-y-8">
                                        <div>
                                            <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Estimated Annual Value</div>
                                            <div className="text-6xl font-mono font-bold text-white">
                                                {formatPrice(financials.avg, region?.symbol)}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2 font-mono">
                                                Range: {formatPrice(financials.min, region?.symbol)} - {formatPrice(financials.max, region?.symbol)}
                                            </div>
                                        </div>

                                        <div className="flex gap-8">
                                            <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-xl flex-1">
                                                <div className="text-2xl font-bold text-amber-400 mb-1">~137%</div>
                                                <div className="text-xs text-gray-400 uppercase">Est. ROI (Year 1)</div>
                                            </div>
                                            <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl flex-1">
                                                <div className="text-2xl font-bold text-blue-400 mb-1">63%</div>
                                                <div className="text-xs text-gray-400 uppercase">Cost Efficiency vs Point Vendors</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-white mb-4">Cost Breakdown by Service</h3>
                                    {selectedServices.slice(0, 5).map(s => {
                                        const p = getRegionalPrice(s, strategy.regionId, strategy.clientSize);
                                        return (
                                            <div key={s.id} className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                                                <span className="text-gray-300">{s.name}</span>
                                                <span className="font-mono text-gray-500">{formatPrice((p.min + p.max) / 2, region?.symbol)}</span>
                                            </div>
                                        );
                                    })}
                                    {selectedServices.length > 5 && (
                                        <div className="text-center text-gray-500 italic pt-2">And {selectedServices.length - 5} more...</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'timeline' && (
                            <div className="h-full flex flex-col">
                                <h2 className="text-4xl font-bold mb-12 text-blue-400">Implementation Roadmap</h2>
                                <div className="relative flex-1">
                                    {/* Central Line */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent transform -translate-x-1/2" />

                                    <div className="space-y-12 relative">
                                        {/* Q1 */}
                                        <div className="flex items-center">
                                            <div className="w-1/2 pr-12 text-right">
                                                <h3 className="text-2xl font-bold text-white mb-2">Phase 1: Operational (0-90 Days)</h3>
                                                <p className="text-gray-400 text-sm">Rapid deployment and baseline establishment.</p>
                                            </div>
                                            <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black relative z-10" />
                                            <div className="w-1/2 pl-12">
                                                <ul className="space-y-2">
                                                    {selectedServices.slice(0, 3).map(s => (
                                                        <li key={s.id} className="text-sm text-green-400 flex items-center gap-2">
                                                            <CheckCircle2 size={12} /> {s.timeline?.threeMonths || 'Deploy'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Q3 */}
                                        <div className="flex items-center flex-row-reverse">
                                            <div className="w-1/2 pl-12 text-left">
                                                <h3 className="text-2xl font-bold text-white mb-2">Phase 2: Expansion (3-9 Months)</h3>
                                                <p className="text-gray-400 text-sm">Deepening integration and advanced features.</p>
                                            </div>
                                            <div className="w-4 h-4 bg-blue-700 rounded-full border-4 border-black relative z-10" />
                                            <div className="w-1/2 pr-12 text-right">
                                                <ul className="space-y-2 flex flex-col items-end">
                                                    {selectedServices.slice(0, 3).map(s => (
                                                        <li key={s.id} className="text-sm text-blue-400 flex items-center gap-2">
                                                            {s.timeline?.nineMonths || 'Expand'} <CheckCircle2 size={12} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Y1 */}
                                        <div className="flex items-center">
                                            <div className="w-1/2 pr-12 text-right">
                                                <h3 className="text-2xl font-bold text-white mb-2">Phase 3: Maturity (1 Year)</h3>
                                                <p className="text-gray-400 text-sm">Full operational maturity and optimization.</p>
                                            </div>
                                            <div className="w-4 h-4 bg-amber-500 rounded-full border-4 border-black relative z-10" />
                                            <div className="w-1/2 pl-12">
                                                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-sm text-amber-200">
                                                    Full ROI Realization across {selectedServices.length} service domains.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'competitors' && (
                            <div className="h-full flex flex-col">
                                <h2 className="text-4xl font-bold mb-8 text-white">Competitive Advantage</h2>
                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 grid gap-6">
                                    {selectedServices.filter(s => s.competitorAnalysis && s.competitorAnalysis.length > 0).map(s => (
                                        <div key={s.id} className="bg-white/5 border border-white/10 rounded-xl p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                                    <Shield className="text-blue-500" />
                                                    {s.name}
                                                </h3>
                                                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Market Context</div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                {s.competitorAnalysis?.slice(0, 2).map((comp, idx) => (
                                                    <div key={idx} className="relative pl-6">
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-700 to-transparent" />
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="font-bold text-gray-300">{comp.name}</h4>
                                                            <span className={`text-[10px] px-2 py-0.5 rounded border ${comp.pricePoint === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                                                                'border-green-500/30 text-green-400 bg-green-500/10'
                                                                }`}>{comp.pricePoint} Cost</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mb-3 italic">"{comp.notes}"</p>

                                                        {comp.swot && (
                                                            <div className="space-y-2">
                                                                <div className="text-[10px] text-gray-500 uppercase">Primary Weakness</div>
                                                                <div className="text-sm text-red-300 flex items-start gap-2">
                                                                    <AlertTriangle size={12} className="mt-0.5" />
                                                                    {comp.swot.weaknesses[0]}
                                                                </div>
                                                                <div className="text-[10px] text-gray-500 uppercase mt-2">Our Advantage</div>
                                                                <div className="text-sm text-green-300 flex items-start gap-2">
                                                                    <Zap size={12} className="mt-0.5" />
                                                                    {s.differentiator}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {slides[currentSlide].type === 'closing' && (
                            <div className="flex flex-col items-center justify-center text-center h-full">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/50"
                                >
                                    <Target size={48} className="text-white" />
                                </motion.div>
                                <h1 className="text-5xl font-bold text-white mb-6">Ready to Execute?</h1>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                                    The strategy is defined. The timeline is set. The value is clear.
                                </p>
                                <div className="flex gap-6">
                                    <button
                                        onClick={handleExport}
                                        disabled={aiState !== 'idle'}
                                        className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                                    >
                                        <span className="relative z-10">Download PDF Deck</span>
                                        {aiState !== 'idle' && (
                                            <div className="absolute inset-0 bg-blue-100 flex items-center justify-center z-20">
                                                <Zap className="w-5 h-5 text-blue-600 animate-bounce" />
                                            </div>
                                        )}
                                    </button>
                                    <Link href="/corporate/services-portfolio" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                                        Adjust Strategy
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div >

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className={`absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-opacity z-50 ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`
                }
            >
                <ChevronLeft size={32} />
            </button >
            <button
                onClick={nextSlide}
                className={`absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-opacity z-50 ${currentSlide === slides.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <ChevronRight size={32} />
            </button>
        </div >
    );
}
