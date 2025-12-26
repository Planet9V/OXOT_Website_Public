'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Globe, Activity, Zap, AlertTriangle, Radio, Network } from 'lucide-react'
import { SovereignLogicTree } from '@/components/SovereignLogicTree'

export default function NationalDefensePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-20">
      {/* Hero */}
      <section className="text-center space-y-8 py-12">
        <div className="text-[10px] font-mono text-oxot-red uppercase tracking-[0.5em]">
          Sovereign_Defense // Agency_Uplink
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
          National Critical<br />
          <span className="text-oxot-blue">Resilience</span>
        </h1>
        <p className="text-xl text-grey max-w-4xl mx-auto font-light leading-relaxed">
          Partnering with international agencies to model and prevent nation-state threats. We calculate <span className="text-white font-medium italic underline decoration-oxot-red underline-offset-8">Epidemic Thresholds</span> for critical infrastructure grids.
        </p>
      </section>

      {/* Grid Logic */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <SovereignLogicTree />
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-oxot-blue/10 border-4 border-oxot-blue rounded-3xl text-center space-y-6">
            <div className="w-20 h-20 bg-oxot-blue/20 rounded-full mx-auto flex items-center justify-center text-oxot-blue">
              <Network size={40} />
            </div>
            <h4 className="text-xl font-bold uppercase tracking-widest text-white leading-tight">National Threat Modeling</h4>
            <p className="text-[10px] text-grey leading-relaxed">
              We leverage the AEON Core to simulate geopolitical impact cascades. If Sector A (Water) fails, we predict the precise moment Sector B (Emergency Services) enters a bifurcation state.
            </p>
            <div className="pt-4 border-t border-white/5">
              <div className="text-[10px] font-mono text-oxot-blue uppercase">Active Agency Uplink: [AMSTERDAM_OSINT]</div>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest">Global Reach</h4>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-grey">Americas</span>
              <span className="text-oxot-red font-bold">READY</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-grey">Europe (NL Base)</span>
              <span className="text-oxot-red font-bold">ACTIVE</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-grey">ANZ</span>
              <span className="text-oxot-red font-bold">READY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculus Section - National Scale */}
      <section className="bg-charcoal p-12 rounded-3xl border-4 border-grey text-center space-y-12">
        <h3 className="text-3xl font-black uppercase tracking-tighter">The Physics of National Resilience</h3>
        <p className="text-grey text-lg font-light max-w-3xl mx-auto">
          We apply **Grannovetter thresholds** to social and technical meshes to determine the exact "Tipping Point" of infrastructure failure during a hybrid warfare event.
        </p>
        <div className="flex justify-center gap-12 font-mono text-[10px] text-oxot-blue uppercase opacity-60">
          <div>[Bifurcation_Point: 0.82]</div>
          <div>[Ising_Phase_Transition: CALIBRATED]</div>
          <div>[Hamiltonian_Grid_Optimized: TRUE]</div>
        </div>
      </section>
    </div>
  )
}
