'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Activity, Shield, AlertTriangle, CheckCircle2,
    DollarSign, TrendingDown, TrendingUp, Search,
    Layout, Users, ArrowRight, BarChart3, Lock,
    Database, FileDigit, GripVertical
} from 'lucide-react';
import dynamic from 'next/dynamic';
import ContactFormCTA from './ContactFormCTA';
import { BackgroundEffect } from './BackgroundEffect';
import DealTimeline from './DealTimeline';
import DealProcessDeepDive from './DealProcessDeepDive';
import IndustrialDDGap from './IndustrialDDGap';
import CyberAdjustedValuation from './CyberAdjustedValuation';
import GovernanceGates from './GovernanceGates';

// Dynamic imports
const CriticalSustenance3D = dynamic(() => import('./CriticalSustenance3D'), { ssr: false });
const GoldTeamGraph = dynamic(() => import('./GoldTeamGraph'), { ssr: false });

export default function AcquisitionsView() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-oxot-blue/30 text-slate-300">
            {/* Professional Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 filter grayscale contrast-125">
                <BackgroundEffect />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-oxot-blue to-white origin-left z-50"
                style={{ scaleX }}
            />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 pb-40">

                {/* ==================== ACT 1: UNDERSTANDING THE DEAL ==================== */}

                {/* Hero: The Problem Space */}
                <HeroSection />

                {/* Deal Process Deep Dive */}
                <div className="max-w-7xl mx-auto mt-32">
                    <DealProcessDeepDive />
                </div>

                {/* ==================== ACT 2: THE RISK MANAGEMENT GAP ==================== */}

                {/* The Industrial Cybersecurity Blind Spot */}
                <div className="mt-32">
                    <IndustrialDDGap />
                </div>

                {/* Financial Impact Analysis (Waterfall Chart) */}
                <div className="max-w-7xl mx-auto mt-32">
                    <CyberAdjustedValuation />
                </div>

                {/* Asset Verification in Practice */}
                <div className="max-w-7xl mx-auto mt-32">
                    <AssetVerification />
                </div>

                {/* ==================== ACT 3: OXOT AS ENABLING PARTNER ==================== */}

                {/* Deal Timeline: De-Risking the 100-Day Plan */}
                <div className="max-w-7xl mx-auto mt-32 mb-32">
                    <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-12">
                        <div>
                            <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest mb-2">Risk Mitigation Timeline</div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight">De-Risking the First 100 Days</h2>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-xs text-gray-500 font-mono">SPECIALTY DD ADVANTAGE</div>
                            <div className="text-xl font-bold text-oxot-blue">3-10 Days vs 6-12 Months</div>
                        </div>
                    </div>
                    <DealTimeline />
                </div>

                {/* Sector-Specific Playbooks */}
                <div className="max-w-7xl mx-auto mt-32">
                    <div className="mb-12">
                        <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest mb-4">Sector Expertise</div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
                            Board-Level Questions. <span className="text-gray-500">Technical Answers.</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-3xl">
                            OXOT works alongside your existing DD advisors to provide sector-specific technical answers to the questions your Board will ask.
                        </p>
                    </div>
                    <GovernanceGates />
                </div>

                {/* Final CTA */}
                <div className="mt-40">
                    <ContactFormCTA
                        variant="blue"
                        headline="Enhance Your Due Diligence with Specialized Expertise"
                        subheadline="OXOT combines human expertise with AI-based tools to complement your DD team with industrial cybersecurity capabilities most financial and legal advisors don't possess."
                        serviceOptions={[
                            { value: 'assessment', label: 'Pre-Close Technical Assessment', color: 'cyan' },
                            { value: 'integration', label: '100-Day Integration Support', color: 'yellow' },
                            { value: 'valuation', label: 'Purchase Price Adjustment Analysis', color: 'red' }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

// ================= SUB-COMPONENTS =================

const HeroSection = () => {
    return (
        <section className="min-h-[85vh] flex flex-col justify-center relative">
            <div className="max-w-5xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-mono tracking-[0.2em] mb-8 uppercase">
                    <span className="w-2 h-2 rounded-full bg-oxot-blue animate-pulse"></span>
                    M&A Operating Partners
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-12"
                >
                    Managing <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">Cybersecurity Risk</span><br />
                    <span className="text-oxot-blue">in Infrastructure M&A.</span>
                </motion.h1>

                <div className="grid md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-12">
                    <div className="space-y-4 relative group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-4xl font-black text-white group-hover:text-oxot-red transition-colors">53%</div>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            Of M&A deals experience critical cybersecurity issues discovered <strong className="text-white">after</strong> the price is set.
                        </p>
                    </div>
                    <div className="space-y-4 relative group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-4xl font-black text-white group-hover:text-oxot-red transition-colors">$4.88M</div>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            Average cost of a data breach. For a mid-market target, this can erase <strong className="text-white">12-18 months of EBITDA</strong>.
                        </p>
                    </div>
                    <div className="space-y-4 relative group">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-4xl font-black text-white group-hover:text-oxot-blue transition-colors">6-12 Mo</div>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            Average time to discover hidden technical debt and cybersecurity gaps <strong className="text-white">post-close</strong>, delaying value realization.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AssetVerification = () => {
    return (
        <section>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative h-[600px] bg-black border border-white/10 rounded-3xl overflow-hidden group">
                    <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                        <CriticalSustenance3D
                            badgeText="ON-SITE VERIFICATION"
                            headline={<span className="text-2xl md:text-3xl lg:text-3xl block leading-tight">Bridging Paper <br /><span className="text-oxot-blue">to Reality.</span></span>}
                            subheadline={<span className="text-[12px] uppercase tracking-widest text-gray-400 block mt-2">Physical Infrastructure Validation Beyond the VDR.</span>}
                        />
                    </div>

                    <div className="absolute top-6 left-6 z-10 pointer-events-none">
                        <div className="px-3 py-1 bg-black/80 backdrop-blur border border-white/20 rounded text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2">
                            Example: Manufacturing Facility Assessment
                        </div>
                        <div className="text-xl font-bold text-white">Documented vs. Verified</div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 z-10 grid grid-cols-2 gap-2">
                        <div className="bg-black/80 backdrop-blur p-4 rounded border border-white/10">
                            <div className="text-[10px] text-gray-500 font-mono uppercase">VDR Listed</div>
                            <div className="text-xl font-bold text-gray-400">4,200 Endpoints</div>
                        </div>
                        <div className="bg-black/80 backdrop-blur p-4 rounded border border-white/10">
                            <div className="text-[10px] text-gray-500 font-mono uppercase">On-Site Verified</div>
                            <div className="text-xl font-bold text-oxot-red">4,342 (+142)</div>
                        </div>
                    </div>
                </div>

                <div className="order-1 lg:order-2 space-y-8">
                    <div className="text-oxot-blue text-xs font-mono uppercase tracking-widest">
                        Specialized Industrial Cybersecurity
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                        Beyond the<br />
                        <span className="text-gray-500">Data Room.</span>
                    </h2>
                    <p className="text-lg text-gray-400 font-light leading-relaxed">
                        Virtual data rooms contain documentation. On-site assessments verify physical reality. Industrial cybersecurity in energy, manufacturing, and data center environments requires specialized expertise that most financial and legal DD teams don't possess.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
                        <div className="text-sm font-bold text-white uppercase tracking-wide">Global Track Record</div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-3xl font-black text-oxot-blue">40+</div>
                                <div className="text-xs text-gray-400 uppercase">Facilities Assessed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-oxot-blue">12</div>
                                <div className="text-xs text-gray-400 uppercase">Countries</div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-white/10">
                            OXOT teams have conducted boots-on-ground assessments across energy grids, manufacturing plants, and data centers—identifying discrepancies between disclosed cybersecurity posture and actual operational reality.
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <CheckItem
                            title="Physical Site Validation"
                            desc="ICS panels, network architecture, and physical security controls verified on-site."
                        />
                        <CheckItem
                            title="Threat Landscape Assessment"
                            desc="Active compromise detection and backdoor identification in OT environments."
                        />
                        <CheckItem
                            title="Technical Debt Quantification"
                            desc="CapEx modeling for EOL system replacement and compliance remediation."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const CheckItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex gap-4 p-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
        <div className="mt-1">
            <CheckCircle2 size={20} className="text-oxot-blue" />
        </div>
        <div>
            <h4 className="text-white font-bold text-sm uppercase">{title}</h4>
            <div className="text-xs text-gray-400 mt-1">{desc}</div>
        </div>
    </div>
);
