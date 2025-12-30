'use client'

import React from 'react'
import { Activity, Radio, Database, Shield, CheckCircle, Zap, Terminal, Lock, Search, BarChart3, Fingerprint, Layers, Target, AlertTriangle, Thermometer, TrendingUp, FileText, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/branding/PageHeader'
import ContactFormCTA from '@/components/ContactFormCTA'
import { OXOTLogo } from '@/components/branding/OXOTLogo'


// Dynamically import heavy components
const EngineeringCanvas = dynamic(() => import('@/components/EngineeringCanvas'), { ssr: false })
const HierarchyExplorer = dynamic(() => import('@/components/HierarchyExplorer'), { ssr: false })
const DatacenterDigitalTwin = dynamic(() => import('@/components/DatacenterDigitalTwin'), { ssr: false })



export default function SOCPage() {
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
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-6 mb-8"
          >
            <div className="text-xs font-mono text-oxot-blue uppercase tracking-[0.4em] py-2">
              Service_ID: 05 // SOC_Command
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8"
          >
            SOC Command<br />
            <span className="text-oxot-blue font-bold">Integration</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-grey max-w-3xl font-light leading-relaxed mb-12 uppercase tracking-[0.2em]"
          >
            Operationalize predictive intelligence. Transform your SOC from a reactive alert queue into a <span className="text-white font-medium">pre-cognitive defense engine</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-oxot-blue hover:bg-white/10 transition-colors">
              <Shield size={16} /> 95% MITRE Coverage
            </div>
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-oxot-red hover:bg-white/10 transition-colors">
              <Zap size={16} /> 40% Faster MTTD
            </div>
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
              <Activity size={16} /> 70% Noise Reduction
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
          <div className="text-[9px] uppercase tracking-[0.3em] mb-2 font-mono text-gray-500">Initialize Console</div>
          <ChevronDown size={20} className="text-oxot-blue" />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto space-y-32">

        {/* Core Modules Grid */}

        <section className="space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Active Defense Modules</h2>
            <div className="text-xs font-mono text-grey">SYS.MOD.LOADED</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Database className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">Telemetry Mirroring</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Direct high-fidelity telemetry injection from your SIEM (Splunk, Sentinel, QRadar) into the E27 Prediction Engine for real-time risk mapping.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Splunk", "Sentinel", "Elastic"].map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue-light text-[10px] font-mono uppercase rounded border border-oxot-blue/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Search className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">Automated Threat Hunting</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Hypothesis-driven hunt generation based on 293 APT-specific profiles. We tell your analysts exactly where to look before the beacon calls home.
              </p>
              <div className="flex flex-wrap gap-2">
                {["APT29", "Lazarus", "Volt Typhoon"].map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-red/10 text-oxot-red text-[10px] font-mono uppercase rounded border border-oxot-red/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">Detection Engineering</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Continuous Sigma rule generation and false positive tuning. Validate detection logic against real-world adversary TTPs in real-time.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Sigma", "YARA", "Snort"].map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue text-[10px] font-mono uppercase rounded border border-oxot-blue/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-gold/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Fingerprint className="text-oxot-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-gold transition-colors">Psychometric Profiling</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Enrich standard indicators with adversary psychology. Understand NOT just 'what' IP hit you, but 'why', 'who', and 'what they will do next'.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Big 5 Traits", "Dark Triad"].map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-gold/10 text-oxot-gold text-[10px] font-mono uppercase rounded border border-oxot-gold/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border border-oxot-blue/30 hover:border-oxot-blue-light transition-all group shadow-[0_0_30px_rgba(0,66,214,0.1)] hover:shadow-[0_0_40px_rgba(0,66,214,0.2)]">
              <div className="p-3 bg-oxot-blue/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Terminal className="text-oxot-blue-light" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-oxot-blue-light transition-colors">Blue Team AI</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Enhances human experience with playbooks, chat, and conversational voice interactions. Works autonomously on-premise while escalating to AEON Core for massive compute, rapid remediation, or aggression blocking.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Voice AI", "Playbooks", "Auto-Escalate"].map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-oxot-blue/10 text-oxot-blue text-[10px] font-mono uppercase rounded border border-oxot-blue/20">{t}</span>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-950/40 to-black border border-red-500/30 hover:border-red-400 transition-all group shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]">
              <div className="p-3 bg-red-500/10 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                <Target className="text-red-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white uppercase mb-3 group-hover:text-red-400 transition-colors">Red Leader Validation</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Continuous validation using Red Squadron Leader—scenario-based emulation across sophistication levels from opportunistic hackers to nation-state APTs.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Red Squadron", "APT Emulation", "Nation-State"].map((t, i) => (
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
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white">AEON Cyber Digital Twin Architecture - <span className="text-oxot-blue">Predictive Intelligence with SOC</span></h2>
              <p className="text-xs font-mono text-grey mt-1">LAYER_0: Component-Level Infrastructure Modeling</p>
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
                <h4 className="text-white font-bold uppercase text-sm">Zones & Conduits</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Visualize IEC 62443 security zones with SL color-coding. Click components to drill into SBOM details.
              </p>
            </div>
            <div className="p-6 bg-oxot-red/5 border border-oxot-red/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Database size={18} className="text-oxot-red" />
                <h4 className="text-white font-bold uppercase text-sm">SBOM Traceability</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Trace vulnerabilities from CVE → Library → Interface → Sub-Component → System → Facility.
              </p>
            </div>
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-red-400" />
                <h4 className="text-white font-bold uppercase text-sm">EPSS Integration</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Real-time exploit probability scores for every library in your OT infrastructure.
              </p>
            </div>
          </div>

          {/* Datacenter Digital Twin HERO */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest">Digital Twin Core // TIER III</span>
            </div>
            <DatacenterDigitalTwin />
          </div>

          {/* Engineering Canvas - Full Width with Explanation */}
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-oxot-blue/10 to-oxot-blue/5 border border-oxot-blue/20 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-oxot-blue-light animate-pulse" />
                <span className="text-sm font-bold text-oxot-blue-light uppercase tracking-widest">Interactive Engineering Canvas</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A complete <span className="text-white font-bold">IEC 62443 zone architecture</span> with 45+ assets across 8 security zones.
                The canvas shows the integration between <span className="text-oxot-blue">AEON Cloud (Digital Twin Core)</span>,
                the <span className="text-oxot-blue-light">on-premise Blue Team Server</span>, and the customer's
                <span className="text-oxot-gold"> IT/OT infrastructure</span> from enterprise DMZ down to Level 0 process equipment.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] mb-4">
                <div className="p-2 bg-oxot-blue/10 border border-oxot-blue/20 rounded">
                  <div className="text-oxot-blue font-bold">AEON Cloud</div>
                  <div className="text-gray-500">Core, Red/Gold Team, Threat Intel, Simulation Engine</div>
                </div>
                <div className="p-2 bg-oxot-blue/10 border border-oxot-blue/20 rounded">
                  <div className="text-oxot-blue-light font-bold">Blue Team Server</div>
                  <div className="text-gray-500">Local Twin, Telemetry Store, Decision Engine, Collector</div>
                </div>
                <div className="p-2 bg-oxot-gold/10 border border-oxot-gold/20 rounded">
                  <div className="text-oxot-gold font-bold">Data Diode</div>
                  <div className="text-gray-500">Unidirectional gateway for threat intel into OT environment</div>
                </div>
                <div className="p-2 bg-oxot-red/10 border border-oxot-red/20 rounded">
                  <div className="text-oxot-red font-bold">OT Assets</div>
                  <div className="text-gray-500">SCADA, PLCs, HMIs, Generators, Chillers, BMS, PDUs</div>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 italic border-l-2 border-oxot-blue/50 pl-3">
                <strong className="text-oxot-blue-light">Interaction:</strong> Drag to pan • Scroll to zoom • Click any asset for details.
                The Blue Team Server autonomously processes telemetry and makes local decisions, while syncing insights to AEON Cloud
                for advanced simulation, research, and crisis management support.
              </div>
            </div>
            <EngineeringCanvas />
          </div>

          {/* Hierarchy Explorer - Full Width */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-oxot-blue animate-pulse" />
              <span className="text-xs font-mono text-oxot-blue uppercase tracking-widest">Hierarchy Navigator</span>
            </div>
            <HierarchyExplorer />
          </div>

          {/* NOW / NEXT / NEVER Decision Framework */}
          <div className="space-y-6">
            <div className="p-8 bg-gradient-to-br from-black/60 to-zinc-900/40 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-white font-bold uppercase text-lg flex items-center gap-2">
                  <Target size={18} className="text-oxot-red" /> NOW / NEXT / NEVER
                </h4>
                <span className="text-[10px] font-mono text-gray-500">AEON DECISION FRAMEWORK</span>
              </div>

              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                A <span className="text-white font-bold">strategic prioritization framework</span> powered by the full AEON Cyber Digital Twin.
                Not just EPSS scores—but the synthesis of <span className="text-oxot-blue-light">Blue Team threat intelligence</span>,
                <span className="text-oxot-red"> Red Team attack simulations</span>, and <span className="text-oxot-gold">Gold Team business context</span>
                to drive CapEx/OpEx decisions based on <span className="text-white">actual data, not theoretical risks</span>.
              </p>

              {/* Three Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* NOW */}
                <div className="p-5 bg-red-950/30 border border-red-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 font-mono font-black text-sm">NOW</span>
                    </div>
                    <span className="text-red-400 font-bold text-xs">IMMEDIATE ACTION</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                      Active exploitation detected in customer telemetry
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity size={12} className="text-red-400 shrink-0 mt-0.5" />
                      EPSS &gt; 10% AND asset in critical path
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap size={12} className="text-red-400 shrink-0 mt-0.5" />
                      Red Team confirmed exploitability in Digital Twin
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield size={12} className="text-red-400 shrink-0 mt-0.5" />
                      Safety system (SIS/SIL) with known vulnerability
                    </li>
                  </ul>
                  <div className="mt-4 p-2 bg-red-900/20 rounded text-[10px] text-red-300 font-mono">
                    ACTION: Emergency change / OpEx justified
                  </div>
                </div>

                {/* NEXT */}
                <div className="p-5 bg-yellow-950/30 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <span className="text-yellow-400 font-mono font-black text-sm">NEXT</span>
                    </div>
                    <span className="text-yellow-400 font-bold text-xs">SCHEDULED REMEDIATION</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-start gap-2">
                      <TrendingUp size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                      Rising EPSS trend (1-10%) with attack path potential
                    </li>
                    <li className="flex items-start gap-2">
                      <Layers size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                      SBOM dependency with upstream vulnerability
                    </li>
                    <li className="flex items-start gap-2">
                      <Database size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                      Asset in threat model but no active exploitation
                    </li>
                    <li className="flex items-start gap-2">
                      <Radio size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                      Refit opportunity aligns with maintenance window
                    </li>
                  </ul>
                  <div className="mt-4 p-2 bg-yellow-900/20 rounded text-[10px] text-yellow-300 font-mono">
                    ACTION: CapEx planning / Next refit cycle
                  </div>
                </div>

                {/* NEVER */}
                <div className="p-5 bg-zinc-900/50 border border-zinc-600/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700/40 flex items-center justify-center">
                      <span className="text-zinc-400 font-mono font-black text-sm">NEVER</span>
                    </div>
                    <span className="text-zinc-400 font-bold text-xs">ACCEPT RISK / BACKLOG</span>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-500">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-zinc-500 shrink-0 mt-0.5" />
                      EPSS &lt; 1% with no attack path in threat model
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock size={12} className="text-zinc-500 shrink-0 mt-0.5" />
                      Network-isolated asset with compensating controls
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText size={12} className="text-zinc-500 shrink-0 mt-0.5" />
                      Theoretical CVE with no weapon in the wild
                    </li>
                    <li className="flex items-start gap-2">
                      <BarChart3 size={12} className="text-zinc-500 shrink-0 mt-0.5" />
                      Business impact below risk appetite threshold
                    </li>
                  </ul>
                  <div className="mt-4 p-2 bg-zinc-800/50 rounded text-[10px] text-zinc-400 font-mono">
                    ACTION: Document risk acceptance / Monitor
                  </div>
                </div>
              </div>

              {/* Intelligence Inputs */}
              <div className="p-4 bg-black/40 border border-oxot-blue/20 rounded-xl">
                <h5 className="text-oxot-blue-light font-bold text-xs uppercase mb-3">Decision Inputs from AEON Core</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                  <div className="p-2 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                    <div className="text-oxot-blue-light font-bold">Blue Team</div>
                    <div className="text-gray-500">Threat intel, CVE/EPSS, APT profiles</div>
                  </div>
                  <div className="p-2 bg-oxot-red/10 rounded border border-oxot-red/20">
                    <div className="text-oxot-red font-bold">Red Team</div>
                    <div className="text-gray-500">Attack path validation, exploitability</div>
                  </div>
                  <div className="p-2 bg-oxot-gold/10 rounded border border-oxot-gold/20">
                    <div className="text-oxot-gold font-bold">Gold Team</div>
                    <div className="text-gray-500">Business context, ROI, refit schedules</div>
                  </div>
                  <div className="p-2 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                    <div className="text-oxot-blue font-bold">Digital Twin</div>
                    <div className="text-gray-500">Asset models, SBOMs, telemetry</div>
                  </div>
                </div>
              </div>

              {/* Human-Centric Note */}
              <div className="mt-4 p-3 bg-gradient-to-r from-oxot-blue/10 to-oxot-blue/5 border-l-4 border-oxot-blue rounded-r-lg">
                <p className="text-gray-300 text-xs italic">
                  <strong className="text-oxot-blue-light">Enhancing human decisions, not replacing them.</strong> AEON synthesizes vast data into actionable intelligence,
                  but final prioritization decisions remain with your security and engineering teams—informed by <span className="text-white">real data</span>,
                  not vendor fear-mongering or theoretical threats.
                </p>
              </div>
            </div>


          </div>
        </section>


        {/* Engagement Models Section */}

        <section className="space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Engagement Models</h2>
              <p className="text-sm text-gray-400 mt-2 max-w-2xl">
                SOC-focused engagement options to transform your security operations.
                Available across <span className="text-oxot-blue-light font-bold">Americas</span>, <span className="text-oxot-gold font-bold">Europe</span>, and <span className="text-oxot-gold font-bold">APAC (ANZ)</span>.
              </p>
            </div>
            <div className="text-xs font-mono text-grey">GLOBAL_DEPLOYMENT</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* BLUE SERVICES - PRIMARY */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-oxot-blue/20 to-black border-2 border-oxot-blue/50 hover:border-oxot-blue-light transition-all group shadow-[0_0_60px_rgba(0,66,214,0.2)] relative overflow-hidden">
              {/* Primary Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-oxot-blue/20 border border-oxot-blue-light/50 text-oxot-blue-light text-[10px] font-mono uppercase rounded-full">
                Primary Service
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-oxot-blue-light mb-1">BLUE SERVICES</h3>
                  <p className="text-oxot-blue/60 font-mono text-xs">PREDICTIVE DEFENSE OPERATIONS</p>
                </div>
                <div className="p-3 bg-oxot-blue/10 rounded-lg">
                  <Shield className="text-oxot-blue-light group-hover:scale-110 transition-transform" size={32} />
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Transform your SOC from reactive to pre-cognitive. Choose your deployment model based on operational needs.
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-oxot-blue/10 border border-oxot-blue/20 rounded-lg">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Radio size={14} className="text-oxot-blue-light" /> Option A: SOC Enhancement
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    We host the AEON Engine and integrate with your existing SOC/SIEM (Splunk, Sentinel, QRadar) to enhance it with Agent Blue predictive intelligence and 293 adversary profiles.
                  </p>
                </div>
                <div className="p-4 bg-oxot-blue/10 border border-oxot-blue/20 rounded-lg">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Database size={14} className="text-oxot-blue-light" /> Option B: Managed SOC
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Full managed SOC with AEON Cyber Digital Twin, on-premise Blue Team Docker satellites for autonomous local operation, and 24/7 human oversight.
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {[
                  "Continuous Threat Hunting (293 APT Profiles)",
                  "Real-time EPSS Risk Prioritization",
                  "Sigma/YARA Detection Engineering",
                  "Incident Response (4hr SLA)",
                  "Monthly Purple Team Validation"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle size={14} className="text-oxot-blue shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a href="#contact-cta" className="block w-full py-4 bg-oxot-blue hover:bg-oxot-blue-light text-white font-bold uppercase tracking-widest rounded-lg transition-colors text-center">
                Deploy Blue Team
              </a>
            </div>

            {/* GOLD SERVICES - COMPLEMENTARY */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-950/30 to-black border border-yellow-500/20 hover:border-yellow-400 transition-all group shadow-[0_0_30px_rgba(234,179,8,0.1)]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-yellow-400 mb-1">GOLD SERVICES</h3>
                  <p className="text-yellow-200/60 font-mono text-xs">COMPLEMENTARY ADVISORY</p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Target className="text-yellow-400 group-hover:scale-110 transition-transform" size={32} />
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Strategic services that complement your SOC operations. Accelerate maturity and optimize your security posture.
              </p>

              <div className="p-4 bg-yellow-950/20 border border-yellow-500/20 rounded-lg mb-6">
                <h4 className="text-sm font-bold text-yellow-400 mb-2">SOC-Focused Advisory</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Gold Team services designed to enhance your Blue Team operations—from architecture to compliance.
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {[
                  "SOC Modernization Strategy",
                  "Detection Engineering Consulting",
                  "Crisis War Gaming & Tabletop Exercises",
                  "IEC 62443 Architecture & Certification",
                  "Executive & Board Advisory",
                  "Regulatory Compliance (NERC CIP, NIS2)"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle size={14} className="text-yellow-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <a href="#contact-cta" className="block w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest rounded-lg transition-colors text-center">
                Schedule Consultation
              </a>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <div id="contact-cta">
          <ContactFormCTA
            variant="blue"
            headline="Your Analysts Are Drowning in 70% Noise."
            subheadline="Attackers slip through when SOC teams chase false positives. Get predictive defense."
            serviceOptions={[
              { value: 'blue', label: 'Blue Team Operations', color: 'cyan' },
              { value: 'gold', label: 'Gold Team Advisory', color: 'yellow' }
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
