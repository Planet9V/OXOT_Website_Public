'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, Shield, Users, ChevronRight, Sparkles,
  BookOpen, Bot, Workflow, ArrowRight, Server,
  Layers, AlertTriangle, Database, Activity, Zap
} from 'lucide-react'
import ContactFormCTA from '@/components/ContactFormCTA'
import TelemetryTicker from '@/components/TelemetryTicker'
import AdvancedEngineeringCanvas from '@/components/AdvancedEngineeringCanvas'
import IECFoundationalRequirementsGrid from '@/components/IECFoundationalRequirementsGrid'
import { useTranslations } from '@/i18n'

// Dynamically import heavy SOC components
const EngineeringCanvas = dynamic(() => import('@/components/EngineeringCanvas'), { ssr: false })
const DatacenterDigitalTwin = dynamic(() => import('@/components/DatacenterDigitalTwin'), { ssr: false })

// ==================== MAIN COMPONENT ====================
export default function WorkshopPortalPage() {
  const { t } = useTranslations()

  return (
    <div className="min-h-screen bg-transparent text-gray-100 relative">

      {/* TELEMETRY TICKER */}
      <div className="fixed bottom-0 left-0 right-0 z-[100]">
        <TelemetryTicker />
      </div>

      {/* HERO SECTION */}
      <section className="min-h-[50vh] flex flex-col justify-center relative px-6 pt-20 pb-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-oxot-gold/10 border border-oxot-gold/30 rounded-full text-oxot-gold text-xs font-mono tracking-[0.2em] mb-8 uppercase"
          >
            <Sparkles className="w-4 h-4" />
            Interactive Training Platform
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8"
          >
            IEC 62443<br />
            <span className="text-oxot-blue-light">Workshop Portal</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Hands-on tools for risk assessment, architecture design, and compliance management.
            Explore the suite of AEON Cyber Digital Twin artifacts below.
          </motion.p>
        </div>
      </section>

      {/* PRIMARY TOOL: IEC 62443 WORKFLOW ARCHITECT */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tool Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-oxot-gold" />
              <div>
                <span className="font-bold text-white block leading-none">IEC 62443 Workflow Architect</span>
                <span className="text-xs text-gray-500 font-mono">Lifecycle Compliance & Risk Management</span>
              </div>
            </div>
            <a
              href="/Site-8-IEC62443_workshop/iec62443_dashboard.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              Open in new tab <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Iframe Container */}
          <div className="h-[75vh] bg-slate-950">
            <iframe
              src="/Site-8-IEC62443_workshop/iec62443_dashboard.html"
              className="w-full h-full border-0"
              title="IEC 62443 Workflow Architect"
            />
          </div>
        </div>
      </section>

      {/* ENDLESS SCROLL CONTENT BLOCKS */}
      <div className="max-w-7xl mx-auto px-6 space-y-32 pb-20">

        {/* BLOCK 1: DIGITAL TWIN ARCHITECTURE */}
        <section className="space-y-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Digital Twin Architecture</h2>
              <p className="text-xs font-mono text-gray-500 mt-1">LAYER_0: Component-Level Infrastructure Modeling</p>
            </div>
            <div className="flex gap-3 text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1"><Layers size={12} className="text-oxot-blue-light" /> IEC 62443</span>
              <span className="flex items-center gap-1"><Target size={12} className="text-oxot-red" /> SBOM/HBOM</span>
            </div>
          </div>

          {/* Introduction Cards */}
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

          {/* Datacenter Digital Twin 3D View */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest">Digital Twin Core // TIER III</span>
            </div>
            <DatacenterDigitalTwin />
          </div>
        </section>

        {/* BLOCK 2: WORKFLOW ARCHITECT (Supporting Artifact) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-2">IEC 62443 Workflow Architect</h2>
              <p className="text-gray-400 max-w-2xl">
                A dedicated Kanban-style tool for Suppliers and Integrators to manage Asset Risk, Implementation, and Verification phases.
              </p>
            </div>
            <div className="px-4 py-2 bg-oxot-blue/10 border border-oxot-blue/30 rounded-full text-oxot-blue-light text-xs font-mono">
              SUPPORTING_ARTIFACT_02
            </div>
          </div>

          <div className="h-[600px] border border-white/10 rounded-2xl overflow-hidden bg-slate-950 shadow-2xl">
            <iframe
              src="/Site-8-IEC62443_workshop/iec62443_dashboard.html"
              className="w-full h-full border-0"
              title="IEC 62443 Workflow Architect"
            />
          </div>
        </section>

        {/* BLOCK 3: INTERACTIVE ENGINEERING CANVAS */}
        <section className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-oxot-blue/10 to-oxot-blue/5 border border-oxot-blue/20 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-oxot-blue-light animate-pulse" />
              <span className="text-sm font-bold text-oxot-blue-light uppercase tracking-widest">Interactive Engineering Canvas</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A complete <span className="text-white font-bold">IEC 62443 zone architecture</span> with 45+ assets across 8 security zones.
              The canvas shows the integration between <span className="text-oxot-blue">AEON Cloud (Digital Twin Core)</span>,
              the <span className="text-oxot-blue-light">on-premise Blue Team Server</span>, and the customer&apos;s
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
        </section>

        {/* BLOCK 4: ZONE & CONDUIT EDITOR (Static) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Zone & Conduit Editor</h2>
              <p className="text-gray-400">Design your own secure zones and validate protocols against the reference library.</p>
            </div>
          </div>
          <div className="h-[800px] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 pointer-events-none z-50 border-4 border-oxot-blue/10 rounded-2xl"></div>
            <div className="h-full overflow-hidden">
              <AdvancedEngineeringCanvas />
            </div>
          </div>
        </section>

        {/* BLOCK 5: REFERENCE GRID */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Compliance Matrix</h2>
              <p className="text-gray-400">IEC 62443-3-3 System Requirements aligned with Foundational Requirements.</p>
            </div>
          </div>
          <IECFoundationalRequirementsGrid />
        </section>

      </div>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <ContactFormCTA
          variant="gold"
          headline={t.workshop.cta.headline}
          subheadline={t.workshop.cta.subheadline}
          serviceOptions={[
            { value: 'gold', label: t.workshop.cta.serviceOptions.workshop, color: 'yellow' },
            { value: 'blue', label: t.workshop.cta.serviceOptions.program, color: 'cyan' }
          ]}
        />
      </section>
    </div>
  )
}

// ==================== FEATURE CARD ====================
const FeatureCard = ({ icon, title, description, color }: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`p-6 rounded-2xl bg-${color}/10 border border-${color}/30 hover:border-${color}/60 transition-all`}
  >
    <div className={`w-12 h-12 rounded-xl bg-${color}/20 flex items-center justify-center mb-4 text-${color}`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </motion.div>
)
