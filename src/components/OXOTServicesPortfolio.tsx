'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    BarChart3, Shield, Sparkles, Target, ArrowLeft, ChevronDown, Check,
    ArrowRight, LayoutGrid, Settings, FileText, Download
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BackgroundEffect } from './BackgroundEffect';
import ServicePricingCalculator, { ProjectConfig, SelectedService } from './ServicePricingCalculator';
import ExpansionTimelineBars from './ExpansionTimelineBars';
import ServicePortfolioBuilder from './ServicePortfolioBuilder';
import { PageHeader } from './branding/PageHeader';
import { OXOTLogo } from './branding/OXOTLogo';
import { services, ServiceData } from '@/data/services-portfolio';

export default function OXOTServicesPortfolio() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const router = useRouter();

    // --- SHARED STATE ---
    const [step, setStep] = useState<number>(1);
    const [regionId, setRegionId] = useState<string>('EU');

    // Config includes clientSize, contractLength, etc.
    const [config, setConfig] = useState<ProjectConfig>({
        portfolioName: 'My Strategic Portfolio',
        clientSize: 'medium',
        contractLength: 24,
        paymentTerms: 'annual',
        pilotDiscount: false,
        bundleDiscount: false,
        timelineDay: 90
    });

    // We store full SelectedService objects (with custom prices/notes) in a Map
    const [selectedServices, setSelectedServices] = useState<Map<number, SelectedService>>(new Map());

    // Derived: simple list of IDs for the Builder
    const selectedIds = Array.from(selectedServices.keys());

    // --- HANDLERS ---

    const handleToggleService = (id: number) => {
        const newMap = new Map(selectedServices);
        if (newMap.has(id)) {
            newMap.delete(id);
        } else {
            const service = services.find(s => s.id === id);
            if (service) {
                newMap.set(id, { service });
            }
        }
        setSelectedServices(newMap);
    };

    // For the Calculator's toggle (which passes the whole object)
    const handleToggleServiceObj = (service: ServiceData) => {
        handleToggleService(service.id);
    };

    const handleUpdatePrice = (serviceId: number, price: number | undefined) => {
        const newMap = new Map(selectedServices);
        const item = newMap.get(serviceId);
        if (item) {
            newMap.set(serviceId, { ...item, customPrice: price });
            setSelectedServices(newMap);
        }
    };

    const handleUpdateName = (serviceId: number, name: string) => {
        const newMap = new Map(selectedServices);
        const item = newMap.get(serviceId);
        if (item) {
            newMap.set(serviceId, { ...item, customName: name });
            setSelectedServices(newMap);
        }
    };

    const handleReset = () => {
        setSelectedServices(new Map());
        setConfig(prev => ({ ...prev, pilotDiscount: false, bundleDiscount: false })); // Keep client size/region
        setStep(1);
    };

    const handleGenerateStrategy = () => {
        if (typeof window !== 'undefined') {
            const exportData = {
                // Convert Map to array of objects with custom details
                selectedServices: Array.from(selectedServices.values()).map(s => ({
                    id: s.service.id,
                    customPrice: s.customPrice,
                    customName: s.customName
                })),
                selectedIds: Array.from(selectedServices.keys()), // Keep for legacy if needed
                regionId,
                clientSize: config.clientSize,
                portfolioName: config.portfolioName,
                projectConfig: config,
            };
            localStorage.setItem('oxot_strategy_portfolio', JSON.stringify(exportData));
            router.push('/corporate/strategy-builder');
        }
    };

    // --- WIZARD STEPS ---
    const steps = [
        { id: 1, label: 'Select Services', icon: LayoutGrid },
        { id: 2, label: 'Configure & Plan', icon: Settings },
        { id: 3, label: 'Review Strategy', icon: FileText },
    ];

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
                <section className="min-h-[60vh] flex flex-col items-center justify-center relative text-center mb-12">
                    <div className="absolute top-0 left-0">
                        <Link
                            href="/corporate/strategic-planning"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Strategic Planning
                        </Link>
                    </div>

                    <div className="mb-8 flex flex-col items-center gap-6 mt-20">
                        <OXOTLogo size="lg" animated />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400/80 text-xs font-mono tracking-[0.2em] mb-6 uppercase">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                Services Portfolio 2025
                            </div>
                        </div>

                        <PageHeader
                            title="Strategic Portfolio Builder"
                            subtitle="Build, configure, and visualize your cyber defense strategy."
                            variant="hero"
                            accent="blue"
                            className="items-center"
                        />
                    </motion.div>
                </section>

                {/* Wizard Progress */}
                <div className="mb-12">
                    <div className="flex justify-center items-center gap-4">
                        {steps.map((s, idx) => {
                            const isActive = step === s.id;
                            const isCompleted = step > s.id;

                            return (
                                <React.Fragment key={s.id}>
                                    <div
                                        onClick={() => setStep(s.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all cursor-pointer ${isActive
                                            ? 'bg-blue-500/20 border-blue-500 text-white'
                                            : isCompleted
                                                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                                : 'bg-white/5 border-white/10 text-gray-500'
                                            }`}>
                                        {isCompleted ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                                        <span className="font-medium">{s.label}</span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className={`w-12 h-px ${step > idx + 1 ? 'bg-green-500/30' : 'bg-white/10'}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Wizard Content */}
                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ServicePortfolioBuilder
                                    selectedIds={selectedIds}
                                    onToggleService={handleToggleService}
                                    regionId={regionId}
                                    setRegionId={setRegionId}
                                    clientSize={config.clientSize}
                                    setClientSize={(size) => setConfig({ ...config, clientSize: size })}
                                />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ServicePricingCalculator
                                    selectedServices={selectedServices}
                                    config={config}
                                    setConfig={setConfig}
                                    onUpdatePrice={handleUpdatePrice}
                                    onUpdateName={handleUpdateName}
                                    onToggleService={handleToggleServiceObj}
                                    onReset={handleReset}
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-12"
                            >
                                <div className="max-w-4xl mx-auto text-center">
                                    <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/30 rounded-3xl p-12 backdrop-blur-sm">
                                        <Sparkles className="w-16 h-16 text-oxot-gold mx-auto mb-6" />
                                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Generate Strategy?</h2>
                                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                            You have selected {selectedServices.size} services. We will now generate a comprehensive
                                            Slide Deck including Executive Summary, Financial Analysis, and Implementation Roadmap.
                                        </p>

                                        <div className="flex justify-center gap-6">
                                            <button
                                                onClick={() => setStep(2)}
                                                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
                                            >
                                                Back to Config
                                            </button>
                                            <button
                                                onClick={handleGenerateStrategy}
                                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white rounded-xl font-bold shadow-xl shadow-blue-900/30 flex items-center gap-3 transition-all transform hover:scale-105"
                                            >
                                                <Sparkles className="w-5 h-5" />
                                                Generate Strategy Deck
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Review */}
                                <div className="max-w-[1200px] mx-auto">
                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Target className="w-6 h-6 text-blue-400" />
                                        Project Implementation Roadmap
                                    </h3>
                                    <ExpansionTimelineBars
                                        selectedServices={Array.from(selectedServices.values()).map(s => s.service)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Persistent Footer Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-md border-t border-white/10 p-4 z-40">
                    <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-400">
                                <span className="text-white font-bold">{selectedServices.size}</span> Services Selected
                            </div>
                            {selectedServices.size > 0 && (
                                <div className="hidden md:block h-4 w-px bg-white/10" />
                            )}
                            {selectedServices.size > 0 && (
                                <div className="hidden md:block text-sm text-gray-400">
                                    Region: <span className="text-white">{regionId}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                            )}

                            {step < 3 && (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    disabled={selectedServices.size === 0}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            )}

                            {step === 3 && (
                                <button
                                    onClick={handleGenerateStrategy}
                                    className="px-6 py-2 bg-oxot-gold hover:bg-amber-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2"
                                >
                                    Generate Deck <Sparkles className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
