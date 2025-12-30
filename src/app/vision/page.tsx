'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BootSequence from '@/components/BootSequence'
// Replaced PointCloudFacility with Site-4 BackgroundEffect
// Replaced PointCloudFacility with Site-4 BackgroundEffect
// Site-4 Migrated Components
import { PsychoHistorySphere } from '@/components/PsychoHistorySphere'
import { CalculusPanel } from '@/components/CalculusPanel'
import { IntegrationTicker } from '@/components/IntegrationTicker'
import { SimulationGraph } from '@/components/SimulationGraph'
import { SimulationParams } from '@/types'

// NEW COMPONENTS
import { PageHeader } from '@/components/branding/PageHeader'
import { TrinitySection } from '@/components/home/TrinitySection'
import { SectorGrid } from '@/components/home/SectorGrid'
import { EquationVisualizer } from '@/components/EquationVisualizer'
import SustenanceDashboard from '@/components/SustenanceDashboard'
import { NeuralGlobe } from '@/components/NeuralGlobe'
import TypewriterText from '@/components/TypewriterText'
import { TypewriterLog } from '@/components/TypewriterLog'
import { VisionHeroVisualization } from '@/components/VisionHeroVisualization'

import { ArrowRight, Activity, ChevronDown, Globe, Lock, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import ContactFormCTA from '@/components/ContactFormCTA'

const DEFAULT_PARAMS: SimulationParams = {
  socialInertia: 0.75,
  systemEntropy: 0.42,
  culturalViscosity: 0.89,
  adaptationRate: 45
};

export default function Home() {
  const [bootComplete, setBootComplete] = useState(true)
  const [simParams, setSimParams] = useState<SimulationParams>(DEFAULT_PARAMS);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('oxot_boot_complete')
    if (!hasBooted) {
      setBootComplete(false)
    }
  }, [])

  const handleBootComplete = React.useCallback(() => {
    sessionStorage.setItem('oxot_boot_complete', 'true')
    setBootComplete(true)
  }, [])

  const handleReset = () => {
    setSimParams(DEFAULT_PARAMS);
  };

  return (
    <main className="relative w-full overflow-hidden uppercase font-black tracking-tighter text-white selection:bg-oxot-blue selection:text-black">
      <AnimatePresence>
        {!bootComplete && (
          <BootSequence onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10"
      >




        {/* --- 1. HERO SECTION --- */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 mb-20">

          {/* New Hero Visualization */}
          <VisionHeroVisualization />

          <div className="relative z-10 w-full max-w-[1600px] -mt-32">

            <PageHeader
              title="AEON CYBER DIGITAL TWIN"
              subtitle="The Operating System for Sovereign Critical Infrastructure."
              variant="hero"
              accent="gold"
              className="mb-12"
            />

            <div className="flex flex-col items-center justify-center space-y-6 -mt-10">
              {/* Clean Version Tag */}
              <div className="mb-4 flex justify-center">
                <span className="text-oxot-blue/60 text-[10px] font-mono font-bold tracking-[0.4em] flex items-center gap-3 uppercase">
                  <span className="w-1.5 h-1.5 bg-oxot-blue rounded-full animate-pulse"></span>
                  OXOT TITAN // v2.4.1 [ONLINE]
                </span>
              </div>

              {/* Philosophical Kicker */}
              <div className="text-sm font-mono text-oxot-blue-light tracking-[0.5em] uppercase font-bold">
                <TypewriterText text="Think Creatively // Act Decisively" speed={80} pause={3000} />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-32 flex flex-col items-center animate-bounce opacity-50"
          >
            <div className="text-[10px] uppercase tracking-[0.2em] mb-2">Initialize Scroll</div>
            <ChevronDown />
          </motion.div>

          {/* Ticker at Bottom of Hero */}
          <div className="absolute bottom-12 w-full max-w-[1600px] border-t border-b border-white/10 py-4 bg-black/20 backdrop-blur-sm z-20">
            <IntegrationTicker />
          </div>
        </section>


        {/* --- 2. CRITICAL SUSTENANCE (Dynamic 3D Visuals) --- */}
        <SustenanceDashboard />


        {/* --- 3. GLOBAL NEURAL LATTICE (NEW SECTION) --- */}
        <section className="relative py-48 px-8 border-y border-white/10 bg-transparent">
          <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2">
                AEON <span className="text-oxot-red">CORE.</span>
              </h2>
              <h3 className="text-xl md:text-2xl text-oxot-blue font-bold font-mono tracking-widest uppercase mb-6">
                Gated Graph Neural Network
              </h3>
              <p className="text-lg text-gray-300 font-light leading-relaxed normal-case max-w-2xl text-justify">
                With distributed graphs and subminds collecting and dynamically growing, the network is curious to expand and gain knowledge. It gathers information on news, population, geo-politics, behavior, technologies, emerging threats, and crises, while ingesting telemetry from customers, public, and government sources 24/7 into a complex dynamic knowledge graph for our calculus to operate our digital twins and run simulations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-3xl font-black text-white">4ms</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Global Latency</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-3xl font-black text-white">99.99%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Uptime Guarantee</div>
                </div>
              </div>
            </div>
            {/* Visual Representation (Active 3D Globe) */}
            <div className="relative w-full max-w-[350px] h-[350px] flex items-center justify-center pointer-events-auto mx-auto">
              <NeuralGlobe />
            </div>
          </div>
        </section>


        {/* --- 4. TRINITY SECTION (Agents) --- */}
        <TrinitySection />


        {/* --- 5. E27 EQUATION VISUALIZER --- */}
        <EquationVisualizer />


        {/* --- 6. SECTOR GRID (16 Sectors) --- */}
        <SectorGrid />

        {/* --- 7. PROTOCOL LOG (ANIMATED) --- */}
        <TypewriterLog />

        {/* CTA Section */}
        <ContactFormCTA
          variant="blue"
          headline="The Future Belongs to the Prepared."
          subheadline="Join the Organizations Building Sovereign Digital Immunity."
        />

      </motion.div>
    </main>
  )
}