'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Shield, TrendingUp, Anchor, Activity, Lock, Search } from 'lucide-react';
import { BackgroundEffect } from '@/components/BackgroundEffect';
import ContactFormCTA from '@/components/ContactFormCTA';
import DairySupplyChainRadar from '@/components/campaigns/DairySupplyChainRadar';
import SavingsProtectionVisualizer from '@/components/campaigns/SavingsProtectionVisualizer';

export default function FrieslandCampinaCampaign() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-oxot-gold/30 text-slate-300">
            {/* Professional Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 filter grayscale contrast-125">
                <BackgroundEffect />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-oxot-gold to-white origin-left z-50"
                style={{ scaleX }}
            />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 pb-40">

                {/* Hero Section */}
                <section className="min-h-[90vh] flex flex-col items-center justify-center text-center relative mb-32">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-mono tracking-[0.2em] mb-8 uppercase">
                        <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse"></span>
                        Project: Dairy Shield
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8"
                    >
                        Sovereign Immunity<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">For The Supply Chain.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-oxot-gold/80 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                    >
                        Aligning with <strong className="text-white">Expedition 2030</strong>. Securing the €500M efficiency target against asymmetric cyber threats. From Grass to Glass to Grid.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-12 flex flex-col items-center gap-2 text-gray-600"
                    >
                        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Deploy</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                    </motion.div>
                </section>

                {/* Challenge Section: The Efficiency Paradox */}
                <div className="max-w-7xl mx-auto mb-40">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                The Efficiency Paradox
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
                                Optimized for Speed,<br />
                                <span className="text-gray-600">Fragile by Design?</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                                Expedition 2030 is streamlining operations and consolidating production—like the capacity doubling at <strong className="text-white">Borculo</strong>.
                            </p>
                            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                                But hyper-connected, high-efficiency plants have a hidden cost: <strong className="text-white">Interdependency</strong>. A single ransomware infection in a legacy PLC can cascade across the entire value chain, turning efficiency into total paralysis.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="text-3xl font-black text-white mb-1">€500M</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">Savings Target</div>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="text-3xl font-black text-oxot-gold">1.8%</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">Margin (Thin)</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <SavingsProtectionVisualizer />
                        </div>
                    </div>
                </div>

                {/* Solution Section: Grass to Glass Visibility */}
                <div className="max-w-7xl mx-auto mb-40">
                    <div className="mb-12 text-center">
                        <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                            <Search className="w-4 h-4" />
                            Agent Blue Intelligence
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Total Supply Chain <span className="text-oxot-blue">Observability</span>
                        </h2>
                    </div>

                    <DairySupplyChainRadar />
                </div>

                {/* Strategic Alignment Section */}
                <div className="max-w-5xl mx-auto mb-40">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-oxot-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="relative z-10 text-center mb-12">
                            <h2 className="text-3xl font-black text-white uppercase mb-4">Why Partner with OXOT?</h2>
                            <p className="text-gray-400">We don't just secure networks. We secure the <strong className="text-white">business logic</strong> of dairy production.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-oxot-gold/10 rounded-xl flex items-center justify-center border border-oxot-gold/20">
                                    <Lock className="text-oxot-gold" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Sovereign Control</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Complete ownership of your threat data. No third-party cloud dependencies. Your formulas and process data stay on your soil.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-oxot-blue/10 rounded-xl flex items-center justify-center border border-oxot-blue/20">
                                    <Activity className="text-oxot-blue" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Neural Physics</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Predictive modeling that understands the physics of milk processing (temperature, pressure, flow) to detect anomalies before alarms trigger.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                                    <Anchor className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Legacy Integration</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    We speak S7, Modbus, and CIP. We secure the 20-year-old PLCs at Borculo without requiring a complete rip-and-replace.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto">
                    <ContactFormCTA
                        variant="gold"
                        headline="Secure the Expedition."
                        subheadline="Schedule a technical briefing on the Dairy Shield architecture."
                        serviceOptions={[
                            { value: 'audit', label: 'OT Gap Analysis', color: 'yellow' },
                            { value: 'monitor', label: 'Grass-to-Glass Twin', color: 'blue' },
                            { value: 'strategy', label: 'Expedition 2030 Risk Review', color: 'cyan' }
                        ]}
                    />
                </div>

            </div>
        </div>
    );
}
