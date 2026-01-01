'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ShieldCheck, DollarSign } from 'lucide-react';

export default function SavingsProtectionVisualizer() {
    return (
        <div className="relative">
            {/* Context Header */}
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxot-gold/10 border border-oxot-gold/20 text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4">
                    <TrendingUp size={14} />
                    Expedition 2030 Analysis
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
                    Protecting the <span className="text-oxot-gold">€500M Target</span>
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Cost savings from operational efficiency are fragile. A single significant OT disruption can erase months of gains.
                </p>
            </div>

            {/* Waterfall Chart Representation */}
            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Scenario A: Unprotected */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <TrendingDown size={120} className="text-red-500/10 absolute -top-4 -right-4" />
                    </div>

                    <div className="text-sm text-gray-500 font-mono uppercase mb-6">Scenario A: Status Quo</div>

                    <div className="space-y-4">
                        {/* Base Savings */}
                        <div className="relative h-12 bg-gray-800 rounded flex items-center px-4 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 bg-green-500/20 w-full"></div>
                            <div className="relative z-10 flex justify-between w-full">
                                <span className="text-white font-bold">Planned Savings (2026)</span>
                                <span className="text-green-400 font-mono">+€500M</span>
                            </div>
                        </div>

                        {/* Impact: Disruption */}
                        <div className="relative h-12 bg-gray-800 rounded flex items-center px-4 ml-4 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 bg-red-500/20 w-[40%]"></div>
                            <div className="relative z-10 flex justify-between w-full">
                                <span className="text-white font-bold">14-Day Production Halt</span>
                                <span className="text-red-400 font-mono">-€180M</span>
                            </div>
                        </div>

                        {/* Impact: Recovery */}
                        <div className="relative h-12 bg-gray-800 rounded flex items-center px-4 ml-8 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 bg-red-500/20 w-[20%]"></div>
                            <div className="relative z-10 flex justify-between w-full">
                                <span className="text-white font-bold">Recovery & Remediation</span>
                                <span className="text-red-400 font-mono">-€95M</span>
                            </div>
                        </div>

                        {/* Net Result */}
                        <div className="pt-4 border-t border-white/10 mt-6">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-400 text-sm">Realized Gains</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-white">€225M</span>
                                    <span className="block text-xs text-red-500">55% Value Destruction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scenario B: OXOT Protected */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group overflow-hidden ring-1 ring-oxot-blue/50">
                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <ShieldCheck size={120} className="text-oxot-blue/10 absolute -top-4 -right-4" />
                    </div>

                    <div className="text-sm text-oxot-blue font-mono uppercase mb-6 flex items-center gap-2">
                        Scenario B: Agent Blue Protected
                        <span className="px-2 py-0.5 bg-oxot-blue text-white text-[10px] rounded font-bold">RECOMMENDED</span>
                    </div>

                    <div className="space-y-4">
                        {/* Base Savings */}
                        <div className="relative h-12 bg-gray-800 rounded flex items-center px-4 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 bg-green-500/20 w-full"></div>
                            <div className="relative z-10 flex justify-between w-full">
                                <span className="text-white font-bold">Planned Savings (2026)</span>
                                <span className="text-green-400 font-mono">+€500M</span>
                            </div>
                        </div>

                        {/* Impact: Prevention Cost */}
                        <div className="relative h-12 bg-gray-800 rounded flex items-center px-4 ml-2 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 bg-oxot-blue/20 w-[5%]"></div>
                            <div className="relative z-10 flex justify-between w-full">
                                <span className="text-white font-bold">OXOT Strategic Partnership</span>
                                <span className="text-oxot-blue font-mono">-€X.XM</span>
                            </div>
                        </div>

                        {/* Impact: Threat Neutralized */}
                        <div className="relative h-12 bg-gray-800 rounded flex items-center px-4 ml-4 overflow-hidden border border-green-500/30">
                            <div className="absolute left-0 top-0 bottom-0 bg-green-500/5 w-full"></div>
                            <div className="relative z-10 flex justify-between w-full">
                                <span className="text-white font-bold italic">Threat Neutralized (Pre-Execution)</span>
                                <span className="text-green-400 font-mono">€0 Impact</span>
                            </div>
                        </div>

                        {/* Net Result */}
                        <div className="pt-4 border-t border-white/10 mt-6">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-400 text-sm">Realized Gains</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-oxot-gold">€49X M</span>
                                    <span className="block text-xs text-green-500">99% Value Retention</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 font-mono">
                    *Based on average daily revenue and historical ransomware recovery timelines in the F&B manufacturing sector.
                </p>
            </div>
        </div>
    );
}
