'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Shield, Lock, Sigma, BookOpen, Layers, ChevronDown,
    AlertTriangle, CheckCircle, FileText, Building, Server, Activity
} from 'lucide-react'
import { GlowCard } from '@/components/ui/GlowCard'
import IECVolumetricLibrary from '@/components/IECVolumetricLibrary'
import CybersecurityLifecycle from '@/components/CybersecurityLifecycle'
import IECFoundationalRequirementsGrid from '@/components/IECFoundationalRequirementsGrid'
import TelemetryTicker from '@/components/TelemetryTicker'
import ContactFormCTA from '@/components/ContactFormCTA'

import OXOTToolkit from '@/components/OXOTToolkit'
import IECFrameworkMatrix from '@/components/IECFrameworkMatrix'
import IECUnifiedSystems from '@/components/IECUnifiedSystems'
import AdvancedEngineeringCanvas from '@/components/AdvancedEngineeringCanvas'
import dynamic from 'next/dynamic'

const DatacenterDigitalTwin = dynamic(() => import('@/components/DatacenterDigitalTwin'), { ssr: false })
const HierarchyExplorer = dynamic(() => import('@/components/HierarchyExplorer'), { ssr: false })

// ==================== MAIN COMPONENT ====================
export default function IEC62443Page() {
    return (
        <div className="min-h-screen bg-transparent text-gray-100 relative">

            {/* TELEMETRY TICKER */}
            <div className="fixed bottom-0 left-0 right-0 z-[100]">
                <TelemetryTicker />
            </div>

            {/* HERO SECTION */}
            <section className="h-screen flex flex-col justify-center items-center relative px-6 text-center">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-mono tracking-[0.2em] mb-8 uppercase"
                    >
                        <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse"></span>
                        IEC 62443 Educational Overview
                    </motion.div>

                    {/* Large Typography */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-12"
                    >
                        The <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">Global Standard</span><br />
                        <span className="text-oxot-blue-light">for Industrial Security.</span>
                    </motion.h1>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-12"
                    >
                        <div className="space-y-4 relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-4xl font-black text-white group-hover:text-oxot-gold transition-colors">14</div>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Interlinked documents across <strong className="text-white">4 series</strong>.
                            </p>
                        </div>
                        <div className="space-y-4 relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-4xl font-black text-white group-hover:text-oxot-blue transition-colors">SL-4</div>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Maximum Security Level for <strong className="text-white">nation-state</strong> threats.
                            </p>
                        </div>
                        <div className="space-y-4 relative group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-oxot-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="text-4xl font-black text-white group-hover:text-oxot-red transition-colors">7 FRs</div>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">
                                Foundational Requirements covering <strong className="text-white">access to availability</strong>.
                            </p>
                        </div>
                    </motion.div>
                </div>

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

            {/* SCROLLING CONTENT SECTIONS */}
            <div className="max-w-7xl mx-auto px-6 space-y-32 pb-32">

                {/* SECTION 1: Overview */}

                <section id="overview">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            The Challenge & Solution
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Understanding IEC 62443</h2>
                    </div>
                    <OverviewContent />
                </section>


                {/* SECTION 2: Security Lifecycle */}

                <section id="lifecycle">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-blue-light text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            From Design to Decommission
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Security Lifecycle</h2>
                    </div>
                    <div className="mt-8">
                        <CybersecurityLifecycle />
                    </div>
                </section>


                {/* SECTION 3: Document Library */}

                <section id="library">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-blue-light text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            14 Documents Across 4 Series
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">The Standard Library</h2>
                    </div>
                    <div className="mt-8">
                        <IECVolumetricLibrary />
                    </div>
                </section>


                {/* SECTION 4: OXOT AI Toolkit */}

                <section className="relative z-10 mb-24" id="toolkit">
                    <div className="mb-12 border-b border-oxot-gold/30 pb-6">
                        <div className="text-oxot-gold text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Interactive Implementation Suite
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">OXOT AI Toolkit</h2>
                    </div>
                    <div className="mt-8">
                        <OXOTToolkit />
                    </div>
                </section>


                {/* SECTION 5b: Digital Twin Core (Migrated from SOC) */}

                <section className="relative z-10 mb-24" id="digital-twin-core">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                            <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest">Digital Twin Core // TIER III</span>
                        </div>
                        <DatacenterDigitalTwin />
                    </div>
                </section>


                {/* SECTION 5c: Hierarchy Explorer (Migrated from SOC) */}

                <section className="relative z-10 mb-24" id="hierarchy-explorer">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-oxot-blue animate-pulse" />
                            <span className="text-xs font-mono text-oxot-blue uppercase tracking-widest">Hierarchy Tier III Data Center Asset Tree</span>
                        </div>
                        <HierarchyExplorer />
                    </div>
                </section>


                {/* SECTION 5: Zone & Conduit Editor */}

                <section className="relative z-10 mb-24" id="network-editor">

                    <div className="h-[800px] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative bg-slate-950">
                        <div className="absolute inset-0 pointer-events-none z-50 border-4 border-oxot-blue/10 rounded-2xl"></div>
                        <div className="h-full overflow-hidden">
                            <AdvancedEngineeringCanvas />
                        </div>
                    </div>
                </section>




                {/* SECTION 6: IEC 62443 Framework Matrix */}

                <section className="relative z-10 mb-24" id="framework-matrix">
                    <div className="mb-12 border-b border-white/10 pb-6">
                        <div className="text-oxot-blue-light text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Sigma className="w-4 h-4" />
                            Security Levels & Foundational Requirements
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Compliance Matrix</h2>
                    </div>
                    <div className="mt-8">
                        <IECFrameworkMatrix />
                    </div>
                </section>




                {/* CTA Section */}

                <section>
                    <ContactFormCTA
                        variant="gold"
                        headline="Ready to Get Certified?"
                        subheadline="70% of IEC 62443 failures come from misunderstood requirements. Get expert-led preparation."
                        serviceOptions={[
                            { value: 'gold', label: 'IEC 62443 Certification Prep', color: 'yellow' },
                            { value: 'blue', label: 'OT Security Assessment', color: 'cyan' }
                        ]}
                    />
                </section>

            </div>
        </div >
    )
}



// ==================== OVERVIEW CONTENT ====================
const OverviewContent = () => (
    <div className="grid lg:grid-cols-2 gap-8">
        {/* The Challenge */}
        <GlowCard className="p-8" glowColor="rgba(220, 38, 38, 0.15)">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-oxot-red/20 border border-oxot-red/30 flex items-center justify-center">
                    <AlertTriangle className="text-oxot-red" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">The Challenge</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Why Standards Matter</p>
                </div>
            </div>
            <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                    <span className="text-oxot-red text-lg">•</span>
                    <span>OT/ICS systems are increasingly connected to IT networks</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-oxot-red text-lg">•</span>
                    <span>Legacy equipment wasn't designed with security in mind</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-oxot-red text-lg">•</span>
                    <span>A single breach can halt production or endanger lives</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-oxot-red text-lg">•</span>
                    <span>Regulatory pressure is growing across all sectors</span>
                </li>
            </ul>
        </GlowCard>

        {/* The Solution */}
        <GlowCard className="p-8" glowColor="rgba(201, 157, 67, 0.15)">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-oxot-gold/20 border border-oxot-gold/30 flex items-center justify-center">
                    <Shield className="text-oxot-gold" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">The Solution</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">IEC 62443</p>
                </div>
            </div>
            <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-gold flex-shrink-0 mt-0.5" size={16} />
                    <span>Risk-based approach tailored to your threat landscape</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-gold flex-shrink-0 mt-0.5" size={16} />
                    <span>Covers operators, integrators, and manufacturers</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-gold flex-shrink-0 mt-0.5" size={16} />
                    <span>Internationally recognized certification path</span>
                </li>
                <li className="flex gap-3">
                    <CheckCircle className="text-oxot-gold flex-shrink-0 mt-0.5" size={16} />
                    <span>Defense-in-depth through zones and conduits</span>
                </li>
            </ul>
        </GlowCard>
    </div>
)


