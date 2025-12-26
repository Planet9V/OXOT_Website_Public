'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Plane, Droplets, Zap, Shield, 
  Activity, Factory, Truck, Waves, 
  Database, Radio, Building2, HardHat,
  Crosshair, Lock, Search, Cpu, Settings
} from 'lucide-react'

const SECTORS = [
  { id: 'ENERGY', name: 'Energy', icon: <Zap size={24}/>, desc: 'Grid resilience and renewable integration.' },
  { id: 'WATER', name: 'Water & Wastewater', icon: <Droplets size={24}/>, desc: 'Potable water safety and flow control.' },
  { id: 'FOOD', name: 'Food & Agriculture', icon: <Factory size={24}/>, desc: 'Sustainable supply chain protection.' },
  { id: 'TRANS', name: 'Transportation Systems', icon: <Truck size={24}/>, desc: 'Rail, maritime, and aviation logistics.' },
  { id: 'COMM', name: 'Communications', icon: <Radio size={24}/>, desc: 'Terrestrial and satellite network uptime.' },
  { id: 'MANU', name: 'Critical Manufacturing', icon: <Settings size={24}/>, desc: 'Layer 0 PLC and automation security.' },
  { id: 'CHEM', name: 'Chemical', icon: <Waves size={24}/>, desc: 'Hazardous material process safety.' },
  { id: 'HEALTH', name: 'Healthcare', icon: <Activity size={24}/>, desc: 'Medical device and clinical data resilience.' },
  { id: 'FIN', name: 'Financial Services', icon: <Database size={24}/>, desc: 'Algorithmic trading and asset protection.' },
  { id: 'GOV', name: 'Government Facilities', icon: <Building2 size={24}/>, desc: 'Sovereign infrastructure continuity.' },
  { id: 'DAMS', name: 'Dams', icon: <Waves size={24}/>, desc: 'Hydroelectric and flood control modeling.' },
  { id: 'DEF', name: 'Defense Industrial Base', icon: <Shield size={24}/>, desc: 'Secure aerospace and defense manufacturing.' },
  { id: 'EMER', name: 'Emergency Services', icon: <Radio size={24}/>, desc: 'Mission-critical dispatch and response.' },
  { id: 'NUC', name: 'Nuclear Reactors', icon: <Cpu size={24}/>, desc: 'Generation and waste lifecycle management.' },
  { id: 'INFO', name: 'Information Technology', icon: <Database size={24}/>, desc: 'Cloud and edge compute infrastructure.' },
  { id: 'COMMF', name: 'Commercial Facilities', icon: <Building2 size={24}/>, desc: 'High-density vertical infrastructure.' }
]

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-20 uppercase font-black">
      {/* Hero */}
      <section className="text-center space-y-8 py-12">
        <div className="text-[10px] font-mono text-oxot-blue uppercase tracking-[0.5em]">
          Infrastructure_Sovereignty // 16_Sectors
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
          The 16 Critical<br />
          <span className="text-oxot-red">Sectors</span>
        </h1>
        <p className="text-xl text-grey max-w-4xl mx-auto font-light leading-relaxed lowercase tracking-tighter italic">
          We possess the equipment, software, and dependency data to build facilities in all 16 sectors. We track threat actors and model impact from <span className="text-white font-black uppercase tracking-normal">Component to KPI.</span>
        </p>
      </section>

      {/* Sector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {SECTORS.map((s, i) => (
          <motion.div 
            key={s.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-black/40 border-4 border-grey rounded-3xl group hover:border-oxot-red transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-grey opacity-20 group-hover:opacity-100 transition-opacity">
              LAYER_0_SYNCED
            </div>
            <div className="text-oxot-blue mb-6 group-hover:text-oxot-red transition-colors">
              {s.icon}
            </div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white mb-2">{s.name}</h4>
            <p className="text-[10px] text-gray-400 leading-relaxed font-normal lowercase tracking-tighter italic">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Engineering Depth */}
      <section className="p-12 bg-black/60 border-4 border-grey rounded-3xl space-y-12 relative overflow-hidden font-black uppercase">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(214,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(214,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">Component to KPI Mapping</h3>
            <p className="text-grey text-lg font-normal lowercase tracking-tighter leading-relaxed mb-8 italic">
              Our Digital Twins aren&apos;t visual models; they are functional engineering replicas. We map the software libraries (SBOM) of individual PLCs directly to the operational KPIs of the facility.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="w-12 text-oxot-red">01</span>
                <span className="text-white">Layer 0: Physical Component Inventory</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="w-12 text-oxot-blue">02</span>
                <span className="text-white">Layer 1: Logic & Signal Emulation</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="w-12 text-grey">03</span>
                <span className="text-white">Layer 2: Network Packet Parity</span>
              </div>
            </div>
          </div>
          
          <div className="bg-charcoal p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="w-24 h-24 rounded-full border-4 border-oxot-red flex items-center justify-center animate-pulse">
              <Settings size={40} className="text-oxot-red" />
            </div>
            <h4 className="font-bold uppercase tracking-widest text-sm">Twin Sync Active</h4>
            <div className="text-[10px] font-mono text-grey uppercase tracking-widest">
              Processing 1.4M Simulation Iterations / Second
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}