'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Shield, Zap, Activity, Radio, Database, Search, BarChart3, Fingerprint,
    Terminal, Target, Layers, ArrowUp, ArrowDown, Brain, Network, Lock,
    ChevronRight, Users, Bot, Cpu, FileText
} from 'lucide-react'
import dynamic from 'next/dynamic'
import ContactFormCTA from '@/components/ContactFormCTA'
import { useTranslations } from '@/i18n'

// Dynamically import heavy components if needed from original page
const EngineeringCanvas = dynamic(() => import('@/components/EngineeringCanvas'), { ssr: false })
const HierarchyExplorer = dynamic(() => import('@/components/HierarchyExplorer'), { ssr: false })
const DatacenterDigitalTwin = dynamic(() => import('@/components/DatacenterDigitalTwin'), { ssr: false })
const GlobalActualityGlobe = dynamic(() => import('@/components/soc/GlobalActualityGlobe'), { ssr: false })
import { CoreLinkProvider } from '@/components/CoreLinkContext'
import EquationSolver from '@/components/core/EquationSolver'

export default function SOCHybridPage() {
    const { t } = useTranslations()
    const [activeMode, setActiveMode] = useState<'copilot' | 'autopilot'>('copilot')

    return (
        <CoreLinkProvider>
            <div className="max-w-7xl mx-auto space-y-32 pb-20 overflow-x-hidden">

                {/* =========================================================================================
          HERO: THE BI-CAMERAL DEFENSE (ARCHITECTURE)
          Narrative: "Two Minds. One Defense."
          Visual: Vertical Split - Mind (Cloud) vs Body (Local)
         ========================================================================================= */}
                <section className="min-h-screen flex flex-col pt-20">

                    {/* UPPER: THE MIND (AEON CORE) */}
                    <div className="relative h-[45vh] w-full bg-gradient-to-b from-blue-950/20 to-transparent border-b border-oxot-blue/20 overflow-hidden flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                        {/* Global Actuality Globe */}
                        <div className="absolute inset-0 z-0">
                            <GlobalActualityGlobe />
                        </div>

                        <div className="z-10 text-center space-y-4 relative pointer-events-none">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxot-blue/10 border border-oxot-blue/30 text-oxot-blue-light text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-sm">
                                <Brain size={12} /> {t.socV2.hero.mind.badge}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-oxot-blue-light uppercase tracking-tighter drop-shadow-xl">
                                {t.socV2.hero.mind.title}
                            </h1>
                            <p className="text-gray-300 max-w-lg mx-auto text-sm font-light drop-shadow-md">
                                {t.socV2.hero.mind.subtitle}
                            </p>
                        </div>
                    </div>
                    {/* CONNECTION: THE SYNAPSE */}
                    <div className="h-20 w-full relative -my-10 z-20 flex items-center justify-center">
                        <div className="absolute h-full w-[1px] bg-gradient-to-b from-oxot-blue to-oxot-gold"></div>
                        <div className="bg-black border border-white/20 p-4 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.2)] flex flex-col items-center gap-1 z-30">
                            <div className="flex gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                <span className="flex items-center gap-1 text-oxot-blue-light"><ArrowDown size={10} /> {t.socV2.hero.synapse.predictive}</span>
                                <span className="w-[1px] h-4 bg-white/20"></span>
                                <span className="flex items-center gap-1 text-oxot-gold"><ArrowUp size={10} /> {t.socV2.hero.synapse.telemetry}</span>
                            </div>
                        </div>
                    </div>

                    {/* LOWER: THE BODY (AGENT BLUE) */}
                    <div className="relative h-[45vh] w-full bg-gradient-to-t from-black to-slate-950 border-t border-white/10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

                        <div className="z-10 text-center space-y-4 mt-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxot-gold/10 border border-oxot-gold/30 text-oxot-gold text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                                <Zap size={12} /> {t.socV2.hero.body.badge}
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-oxot-gold uppercase tracking-tighter mb-4">
                                {t.socV2.hero.body.title}
                            </h2>
                            <p className="text-gray-400 max-w-lg mx-auto text-sm font-light">
                                {t.socV2.hero.body.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Unified Headline Overlay */}
                    <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:block">
                        <h2 className="text-8xl font-black text-white/5 uppercase tracking-tighter writing-mode-vertical rotate-180">
                            {t.socV2.hero.overlay.bicameral}
                        </h2>
                    </div>
                    <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block">
                        <h2 className="text-8xl font-black text-white/5 uppercase tracking-tighter writing-mode-vertical">
                            {t.socV2.hero.overlay.defense}
                        </h2>
                    </div>
                </section>

                {/* =========================================================================================
          THEORY: INDUSTRIAL ORIGINS
          Narrative: "Inspired by Smart Manufacturing."
          Context: Explains WHY we use this split, referencing factory optimization (like OFI/Siemens).
         ========================================================================================= */}
                {/* THEORY: INDUSTRIAL ORIGINS */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono tracking-widest uppercase">
                            <ArrowUp size={12} /> {t.socV2.origins.badge}
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                            {t.socV2.origins.title}
                        </h2>
                        <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                            <p dangerouslySetInnerHTML={{ __html: t.socV2.origins.p1.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                            <p dangerouslySetInnerHTML={{ __html: t.socV2.origins.p2.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            <p>
                                {t.socV2.origins.p3}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Cpu size={120} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{t.socV2.origins.card.title}</h3>
                        <ul className="space-y-4 font-mono text-xs">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-oxot-gold rounded-full animate-pulse"></div>
                                <span className="text-white">{t.socV2.origins.card.edge.label}</span>
                                <span className="text-gray-500">{t.socV2.origins.card.edge.desc}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-oxot-blue rounded-full animate-pulse"></div>
                                <span className="text-white">{t.socV2.origins.card.cloud.label}</span>
                                <span className="text-gray-500">{t.socV2.origins.card.cloud.desc}</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* THEORY: THE CALCULUS OF DEFENSE */}
                <section className="bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden mx-6">
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-oxot-blue/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h3 className="text-oxot-blue font-mono text-sm tracking-widest uppercase">
                                {t.socV2.calculus.badge}
                            </h3>
                            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                                {t.socV2.calculus.title}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                                {t.socV2.calculus.desc}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                <div className="p-4 bg-white/5 rounded-lg border-l-2 border-oxot-red">
                                    <code className="text-[10px] text-oxot-red block mb-1">{t.socV2.calculus.real.label}</code>
                                    <div className="text-xs text-gray-300 font-mono">
                                        R = &#123;x &isin; &Psi; : &#8708; S(x)&#125;
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2">
                                        {t.socV2.calculus.real.desc}
                                    </p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border-l-2 border-oxot-blue">
                                    <code className="text-[10px] text-oxot-blue block mb-1">{t.socV2.calculus.stability.label}</code>
                                    <div className="text-xs text-gray-300 font-mono">
                                        Lk(R,S,I) = 1
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2">
                                        {t.socV2.calculus.stability.desc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex justify-center w-full max-w-md">
                            {/* Interactive Equation Solver from Core */}
                            <div className="w-full transform scale-90 md:scale-100">
                                <EquationSolver />
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================================================
          FORCE MULTIPLIER: BUSINESS VALUE
          Narrative: "Co-Pilot or Autopilot."
          Visual: Capacity Stack & Toggle Switch
         ========================================================================================= */}
                <section className="px-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-8 mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            {t.socV2.multiplier.title} <span className="text-oxot-blue">{t.socV2.multiplier.titleHighlight}</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl font-light">
                            {t.socV2.multiplier.desc}
                        </p>

                        {/* TOGGLE SWITCH */}
                        <div className="flex gap-4 p-2 bg-white/5 rounded-full border border-white/10">
                            <button
                                onClick={() => setActiveMode('copilot')}
                                className={`px-8 py-3 rounded-full font-mono uppercase text-sm tracking-widest transition-all duration-300 flex items-center gap-2 ${activeMode === 'copilot' ? 'bg-oxot-blue text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Users size={16} /> {t.socV2.multiplier.toggles.copilot}
                            </button>
                            <button
                                onClick={() => setActiveMode('autopilot')}
                                className={`px-8 py-3 rounded-full font-mono uppercase text-sm tracking-widest transition-all duration-300 flex items-center gap-2 ${activeMode === 'autopilot' ? 'bg-oxot-gold text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'text-gray-500 hover:text-white'}`}
                            >
                                <Bot size={16} /> {t.socV2.multiplier.toggles.autopilot}
                            </button>
                        </div>
                    </div>

                    {/* DYNAMIC CONTENT CONTAINER */}
                    <div className="max-w-5xl mx-auto min-h-[500px] border border-white/10 rounded-3xl bg-black/40 relative overflow-hidden transition-all duration-500">

                        {/* MODE A: CO-PILOT CONTENT */}
                        {activeMode === 'copilot' && (
                            <motion.div
                                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                                className="p-12 grid md:grid-cols-2 gap-12 h-full"
                            >
                                <div className="space-y-6">
                                    <div className="text-oxot-blue-light font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-oxot-blue animate-pulse"></span> {t.socV2.multiplier.copilot.badge}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{t.socV2.multiplier.copilot.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {t.socV2.multiplier.copilot.desc}
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        <li className="flex items-center gap-3 text-sm text-gray-300">
                                            <Search className="text-oxot-blue" size={18} /> {t.socV2.multiplier.copilot.features[0]}
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-300">
                                            <FileText className="text-oxot-blue" size={18} /> {t.socV2.multiplier.copilot.features[1]}
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-300">
                                            <Cpu className="text-oxot-blue" size={18} /> {t.socV2.multiplier.copilot.features[2]}
                                        </li>
                                    </ul>
                                </div>
                                <div className="relative bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col justify-end">
                                    {/* Abstract Chart for Co-Pilot */}
                                    <div className="absolute inset-0 p-6 flex items-end gap-4 opacity-50">
                                        <div className="w-1/3 bg-gray-600/30 h-[20%] rounded-t relative group">
                                            <div className="absolute -top-6 w-full text-center text-xs text-gray-500">Human Only</div>
                                        </div>
                                        <div className="w-1/3 bg-oxot-blue/50 h-[80%] rounded-t relative group">
                                            <div className="absolute -top-6 w-full text-center text-xs text-oxot-blue-light font-bold">+500% ROI</div>
                                        </div>
                                        <div className="w-1/3 bg-oxot-blue h-[100%] rounded-t relative group animate-pulse"></div>
                                    </div>
                                    <div className="z-10 bg-black/80 backdrop-blur p-4 rounded-lg border border-oxot-blue/30 text-center">
                                        <div className="text-4xl font-black text-white">{t.socV2.multiplier.copilot.stat.value}</div>
                                        <div className="text-xs text-oxot-blue-light uppercase tracking-widest">{t.socV2.multiplier.copilot.stat.label}</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* MODE B: AUTOPILOT CONTENT */}
                        {activeMode === 'autopilot' && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                                className="p-12 grid md:grid-cols-2 gap-12 h-full"
                            >
                                <div className="space-y-6 order-2 md:order-1 relative">
                                    {/* Abstract Visual for Autopilot */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-64 h-64 border-2 border-oxot-gold/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                        <div className="w-48 h-48 border-2 border-oxot-gold/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                                        <Shield size={64} className="text-oxot-gold animate-pulse" />
                                    </div>
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/80 backdrop-blur p-4 rounded-lg border border-oxot-gold/30 text-center w-48">
                                        <div className="text-4xl font-black text-white">{t.socV2.multiplier.autopilot.stat.value}</div>
                                        <div className="text-xs text-oxot-gold uppercase tracking-widest">{t.socV2.multiplier.autopilot.stat.label}</div>
                                    </div>
                                </div>
                                <div className="space-y-6 order-1 md:order-2">
                                    <div className="text-oxot-gold font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-oxot-gold animate-pulse"></span> {t.socV2.multiplier.autopilot.badge}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{t.socV2.multiplier.autopilot.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {t.socV2.multiplier.autopilot.desc}
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        <li className="flex items-center gap-3 text-sm text-gray-300">
                                            <Shield className="text-oxot-gold" size={18} /> {t.socV2.multiplier.autopilot.features[0]}
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-300">
                                            <Lock className="text-oxot-gold" size={18} /> {t.socV2.multiplier.autopilot.features[1]}
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-300">
                                            <Target className="text-oxot-gold" size={18} /> {t.socV2.multiplier.autopilot.features[2]}
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                    </div>
                </section >

                {/* =========================================================================================
          MODULES: RETAINED ASSETS (Adapting the Cards from Original Page)
         ========================================================================================= */}
                <section className="space-y-12 px-6">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <h2 className="text-3xl font-bold uppercase tracking-tight text-white">{t.socV2.modules.title}</h2>
                        <div className="text-xs font-mono text-grey">{t.socV2.modules.badge}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Reusing the cards logic but hardcoded here for speed/clarity */}
                        <ModuleCard
                            icon={<Database size={28} />}
                            title={t.socV2.modules.cards.telemetry.title}
                            desc={t.socV2.modules.cards.telemetry.desc}
                            tags={t.socV2.modules.cards.telemetry.tags}
                        />
                        <ModuleCard
                            icon={<Fingerprint size={28} />}
                            title={t.socV2.modules.cards.profiling.title}
                            desc={t.socV2.modules.cards.profiling.desc}
                            tags={t.socV2.modules.cards.profiling.tags}
                        />
                        <ModuleCard
                            icon={<Target size={28} />}
                            title={t.socV2.modules.cards.validation.title}
                            desc={t.socV2.modules.cards.validation.desc}
                            tags={t.socV2.modules.cards.validation.tags}
                        />
                    </div>
                </section >

                {/* CTA Section */}
                <div id="contact-cta" className="px-6">
                    <ContactFormCTA
                        variant="blue"
                        headline={t.socV2.cta.headline}
                        subheadline={t.socV2.cta.subheadline}
                        serviceOptions={[
                            { value: 'copilot', label: t.socV2.cta.serviceOptions.copilot, color: 'cyan' },
                            { value: 'autopilot', label: t.socV2.cta.serviceOptions.autopilot, color: 'yellow' }
                        ]}
                    />
                </div >

            </div>
        </CoreLinkProvider>
    )
}

function ModuleCard({ icon, title, desc, tags }: { icon: React.ReactNode, title: string, desc: string, tags: string[] }) {
    return (
        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6 group hover:border-oxot-blue hover:bg-white/10 transition-all duration-300">
            <div className="p-3 bg-white/5 text-oxot-blue w-fit rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                {icon}
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-oxot-blue transition-colors">
                    {title}
                </h3>
                <p className="text-grey text-sm font-light leading-relaxed h-auto">
                    {desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 text-[10px] font-mono uppercase text-white/60 rounded">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
