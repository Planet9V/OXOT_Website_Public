'use client'

import React from 'react'
import { Activity, Radio, Database, Shield, CheckCircle, Zap, Terminal, Lock, Search, BarChart3, Fingerprint, Layers, Target, AlertTriangle, Thermometer, TrendingUp, FileText, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useTranslations } from '@/i18n'
import { PageHeader } from '@/components/branding/PageHeader'
import ContactFormCTA from '@/components/ContactFormCTA'
import { OXOTLogo } from '@/components/branding/OXOTLogo'


// Dynamically import heavy components
const EngineeringCanvas = dynamic(() => import('@/components/EngineeringCanvas'), { ssr: false })
const HierarchyExplorer = dynamic(() => import('@/components/HierarchyExplorer'), { ssr: false })
const DatacenterDigitalTwin = dynamic(() => import('@/components/DatacenterDigitalTwin'), { ssr: false })



export default function SOCPage() {
  const { t } = useTranslations()

  return (
    <div className="w-full space-y-32 pb-20">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Background Graphic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none w-full flex justify-center">
          <Terminal size={800} strokeWidth={0.5} className="text-oxot-blue" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-mono tracking-[0.2em] mb-8 uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-oxot-blue animate-pulse"></span>
            {t.soc.meta.serviceId}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8"
          >
            {t.soc.hero.title}<br />
            <span className="text-oxot-blue font-bold">{t.soc.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 max-w-3xl font-light leading-relaxed mb-12"
            dangerouslySetInnerHTML={{ __html: t.soc.hero.subtitle }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-oxot-blue hover:bg-white/10 transition-colors">
              <Shield size={16} /> {t.soc.hero.stats.coverage}
            </div>
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-oxot-red hover:bg-white/10 transition-colors">
              <Zap size={16} /> {t.soc.hero.stats.mttd}
            </div>
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
              <Activity size={16} /> {t.soc.hero.stats.noiseRef}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center animate-bounce"
        >
          <div className="text-[9px] uppercase tracking-[0.3em] mb-2 font-mono text-gray-500">{t.soc.hero.scroll}</div>
          <ChevronDown size={20} className="text-oxot-blue" />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto space-y-32">

        {/* Core Modules Grid */}

        <section className="space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white">{t.soc.modules.title}</h2>
            <div className="text-xs font-mono text-grey">{t.soc.modules.status}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Database className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">{t.soc.modules.telemetry.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.soc.modules.telemetry.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.soc.tags.telemetry.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light text-[10px] font-mono uppercase rounded border border-oxot-blue/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Search className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">{t.soc.modules.hunting.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.soc.modules.hunting.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.soc.tags.hunting.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-red/10 text-oxot-red text-[10px] font-mono uppercase rounded border border-oxot-red/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">{t.soc.modules.detection.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.soc.modules.detection.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.soc.tags.detection.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue text-[10px] font-mono uppercase rounded border border-oxot-blue/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-gold/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Fingerprint className="text-oxot-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-gold transition-colors">{t.soc.modules.psychometrics.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.soc.modules.psychometrics.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.soc.tags.psychometrics.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-gold/10 text-oxot-gold text-[10px] font-mono uppercase rounded border border-oxot-gold/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Terminal className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">{t.soc.modules.blueAI.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.soc.modules.blueAI.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.soc.tags.blueAI.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue text-[10px] font-mono uppercase rounded border border-oxot-blue/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-950/40 to-black border border-red-500/30 hover:border-red-400 transition-all group shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]">
              <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Target className="text-red-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-red-400 transition-colors">{t.soc.modules.redLeader.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t.soc.modules.redLeader.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.soc.tags.redLeader.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-mono uppercase rounded border border-red-500/20">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Digital Twin Architecture */}

        <section className="space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white">{t.soc.architecture.title} - <span className="text-oxot-blue">{t.soc.hero.titleHighlight}</span></h2>
              <p className="text-xs font-mono text-grey mt-1">{t.soc.architecture.layer}</p>
            </div>
            <div className="flex gap-3 text-xs font-mono text-grey">
              <span className="flex items-center gap-1"><Layers size={12} className="text-oxot-blue-light" /> IEC 62443</span>
              <span className="flex items-center gap-1"><Target size={12} className="text-oxot-red" /> SBOM/HBOM</span>
            </div>
          </div>

          {/* Introduction */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-oxot-blue/5 border border-oxot-blue/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Layers size={18} className="text-oxot-blue-light" />
                <h4 className="text-white font-bold uppercase text-sm">{t.soc.architecture.zones.title}</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.soc.architecture.zones.desc}
              </p>
            </div>
            <div className="p-6 bg-oxot-red/5 border border-oxot-red/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Database size={18} className="text-oxot-red" />
                <h4 className="text-white font-bold uppercase text-sm">{t.soc.architecture.sbom.title}</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.soc.architecture.sbom.desc}
              </p>
            </div>
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-red-400" />
                <h4 className="text-white font-bold uppercase text-sm">{t.soc.architecture.epss.title}</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t.soc.architecture.epss.desc}
              </p>
            </div>
          </div>

          {/* Datacenter Digital Twin HERO */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest">{t.soc.architecture.twinCore}</span>
            </div>
            <DatacenterDigitalTwin />
          </div>

          {/* Engineering Canvas - Full Width with Explanation */}
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-oxot-blue/10 to-oxot-blue/5 border border-oxot-blue/20 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-oxot-blue-light animate-pulse" />
                <span className="text-sm font-bold text-oxot-blue-light uppercase tracking-widest">{t.soc.architecture.canvas.title}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t.soc.architecture.canvas.desc }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] mb-4">
                <div className="p-2 bg-oxot-blue/10 border border-oxot-blue/20 rounded">
                  <div className="text-oxot-blue font-bold">{t.soc.architectureLegend.aeonCloud.title}</div>
                  <div className="text-gray-500">{t.soc.architectureLegend.aeonCloud.desc}</div>
                </div>
                <div className="p-2 bg-oxot-blue/10 border border-oxot-blue/20 rounded">
                  <div className="text-oxot-blue-light font-bold">{t.soc.architectureLegend.blueServer.title}</div>
                  <div className="text-gray-500">{t.soc.architectureLegend.blueServer.desc}</div>
                </div>
                <div className="p-2 bg-oxot-gold/10 border border-oxot-gold/20 rounded">
                  <div className="text-oxot-gold font-bold">{t.soc.architectureLegend.dataDiode.title}</div>
                  <div className="text-gray-500">{t.soc.architectureLegend.dataDiode.desc}</div>
                </div>
                <div className="p-2 bg-oxot-red/10 border border-oxot-red/20 rounded">
                  <div className="text-oxot-red font-bold">{t.soc.architectureLegend.otAssets.title}</div>
                  <div className="text-gray-500">{t.soc.architectureLegend.otAssets.desc}</div>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 italic border-l-2 border-oxot-blue/50 pl-3" dangerouslySetInnerHTML={{ __html: t.soc.architecture.canvas.interaction }} />
            </div>
            <EngineeringCanvas />
          </div>

          {/* Hierarchy Explorer - Full Width */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-oxot-blue animate-pulse" />
              <span className="text-xs font-mono text-oxot-blue uppercase tracking-widest">{t.soc.architecture.hierarchy}</span>
            </div>
            <HierarchyExplorer />
          </div>

          {/* NOW / NEXT / NEVER Decision Framework */}
          <div className="space-y-6">
            <div className="p-8 bg-gradient-to-br from-black/60 to-zinc-900/40 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-white font-bold uppercase text-lg flex items-center gap-2">
                  <Target size={18} className="text-oxot-red" /> {t.soc.framework.title}
                </h4>
                <span className="text-[10px] font-mono text-gray-500">{t.soc.meta.decisionFramework}</span>
              </div>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.soc.framework.desc }} />

              {/* Three Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* NOW */}
                <div className="p-5 bg-red-950/30 border border-red-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 font-mono font-black text-sm">{t.soc.framework.now.title}</span>
                    </div>
                    <span className="text-red-400 font-bold text-xs">{t.soc.framework.now.sub}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-400">
                    {t.soc.framework.now.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-2 bg-red-900/20 rounded text-[10px] text-red-300 font-mono">
                    {t.soc.framework.now.action}
                  </div>
                </div>

                {/* NEXT */}
                <div className="p-5 bg-yellow-950/30 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-yellow-400 font-mono font-black text-sm">{t.soc.framework.next.title}</span>
                    </div>
                    <span className="text-yellow-400 font-bold text-xs">{t.soc.framework.next.sub}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-400">
                    {t.soc.framework.next.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <TrendingUp size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-2 bg-yellow-900/20 rounded text-[10px] text-yellow-300 font-mono">
                    {t.soc.framework.next.action}
                  </div>
                </div>

                {/* NEVER */}
                <div className="p-5 bg-zinc-900/50 border border-zinc-600/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700/40 flex items-center justify-center">
                      <span className="text-zinc-400 font-mono font-black text-sm">{t.soc.framework.never.title}</span>
                    </div>
                    <span className="text-zinc-400 font-bold text-xs">{t.soc.framework.never.sub}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-500">
                    {t.soc.framework.never.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-zinc-500 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-2 bg-zinc-800/50 rounded text-[10px] text-zinc-400 font-mono">
                    {t.soc.framework.never.action}
                  </div>
                </div>
              </div>

              {/* Intelligence Inputs */}
              <div className="p-4 bg-black/40 border border-oxot-blue/20 rounded-xl">
                <h5 className="text-oxot-blue-light font-bold text-xs uppercase mb-3">{t.soc.framework.inputs.title}</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                  <div className="p-2 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                    <div className="text-oxot-blue-light font-bold">{t.soc.framework.inputsLegend.blue.title}</div>
                    <div className="text-gray-500">{t.soc.framework.inputsLegend.blue.desc}</div>
                  </div>
                  <div className="p-2 bg-oxot-red/10 rounded border border-oxot-red/20">
                    <div className="text-oxot-red font-bold">{t.soc.framework.inputsLegend.red.title}</div>
                    <div className="text-gray-500">{t.soc.framework.inputsLegend.red.desc}</div>
                  </div>
                  <div className="p-2 bg-oxot-gold/10 rounded border border-oxot-gold/20">
                    <div className="text-oxot-gold font-bold">{t.soc.framework.inputsLegend.gold.title}</div>
                    <div className="text-gray-500">{t.soc.framework.inputsLegend.gold.desc}</div>
                  </div>
                  <div className="p-2 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                    <div className="text-oxot-blue font-bold">{t.soc.framework.inputsLegend.twin.title}</div>
                    <div className="text-gray-500">{t.soc.framework.inputsLegend.twin.desc}</div>
                  </div>
                </div>
              </div>

              {/* Human-Centric Note */}
              <div className="mt-4 p-3 bg-gradient-to-r from-oxot-blue/10 to-oxot-blue/5 border-l-4 border-oxot-blue rounded-r-lg">
                <p className="text-gray-300 text-xs italic" dangerouslySetInnerHTML={{ __html: t.soc.framework.note }} />
              </div>
            </div>


          </div>
        </section>


        {/* Engagement Models Section */}

        <section className="space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white">{t.soc.engagement.title}</h2>
              <p className="text-sm text-gray-400 mt-2 max-w-2xl" dangerouslySetInnerHTML={{ __html: t.soc.engagement.desc }} />
            </div>
            <div className="text-xs font-mono text-grey">{t.soc.meta.globalDeployment}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* BLUE SERVICES - PRIMARY */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border-2 border-oxot-blue/50 hover:border-oxot-blue-light transition-all group shadow-[0_0_60px_rgba(0,66,214,0.2)] relative overflow-hidden">
              {/* Primary Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-oxot-blue/20 border border-oxot-blue-light/50 text-oxot-blue-light text-[10px] font-mono uppercase rounded-full">
                {t.soc.meta.primaryService}
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-oxot-blue-light mb-1">{t.soc.engagement.models.blue.title}</h3>
                  <p className="text-oxot-blue/60 font-mono text-xs">{t.soc.engagement.models.blue.sub}</p>
                </div>
                <div className="p-3 bg-oxot-blue/10 rounded-lg">
                  <Shield className="text-oxot-blue-light group-hover:scale-110 transition-transform" size={32} />
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {t.soc.engagement.models.blue.desc}
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-oxot-blue/10 border border-oxot-blue/20 rounded-lg">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Radio size={14} className="text-oxot-blue-light" /> {t.soc.engagement.models.blue.optionA.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t.soc.engagement.models.blue.optionA.desc}
                  </p>
                </div>
                <div className="p-4 bg-oxot-blue/10 border border-oxot-blue/20 rounded-lg">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Database size={14} className="text-oxot-blue-light" /> {t.soc.engagement.models.blue.optionB.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {t.soc.engagement.models.blue.optionB.desc}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {t.soc.engagement.models.blue.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle size={14} className="text-oxot-blue shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a href="#contact-cta" className="block w-full py-4 bg-oxot-blue hover:bg-oxot-blue-light text-white font-bold uppercase tracking-widest rounded-lg transition-colors text-center">
                {t.soc.engagement.models.blue.cta}
              </a>
            </div>

            {/* GOLD SERVICES - COMPLEMENTARY */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-950/30 to-black border border-yellow-500/20 hover:border-yellow-400 transition-all group shadow-[0_0_30px_rgba(234,179,8,0.1)]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-yellow-400 mb-1">{t.soc.engagement.models.gold.title}</h3>
                  <p className="text-yellow-200/60 font-mono text-xs">{t.soc.engagement.models.gold.sub}</p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Target className="text-yellow-400 group-hover:scale-110 transition-transform" size={32} />
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {t.soc.engagement.models.gold.desc}
              </p>

              <div className="p-4 bg-yellow-950/20 border border-yellow-500/20 rounded-lg mb-6">
                <h4 className="text-sm font-bold text-yellow-400 mb-2">{t.soc.engagement.models.gold.advisory.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {t.soc.engagement.models.gold.advisory.desc}
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {t.soc.engagement.models.gold.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle size={14} className="text-yellow-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a href="#contact-cta" className="block w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest rounded-lg transition-colors text-center">
                {t.soc.engagement.models.gold.cta}
              </a>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <div id="contact-cta">
          <ContactFormCTA
            variant="blue"
            headline={t.soc.cta.headline}
            subheadline={t.soc.cta.subheadline}
            serviceOptions={[
              { value: 'blue', label: t.soc.cta.options.blue, color: 'cyan' },
              { value: 'gold', label: t.soc.cta.options.gold, color: 'yellow' }
            ]}
          />
        </div>

      </div>
    </div>
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
        <p className="text-grey text-sm font-light leading-relaxed h-20">
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

function Step({ num, title, detail, status, color }: { num: string, title: string, detail: string, status: string, color: string }) {
  return (
    <div className="text-center space-y-4 relative bg-black p-4 rounded-xl border border-white/5 z-0 hover:border-white/20 transition-colors">
      <div className={`text-4xl font-black opacity-40 font-mono ${color}`}>{num}</div>
      <h4 className="font-bold uppercase tracking-widest text-sm text-white">{title}</h4>
      <div className="h-0.5 w-8 bg-white/10 mx-auto" />
      <p className="text-grey text-xs font-light h-10">{detail}</p>
      <div className={`text-[10px] font-mono uppercase tracking-widest pt-2 ${status === 'Ready' ? 'text-green-500 animate-pulse' : 'text-white/20'}`}>
        [{status}]
      </div>
    </div>
  )
}
