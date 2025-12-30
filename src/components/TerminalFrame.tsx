'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Shield, Globe, Layers, Sigma,
  LayoutDashboard, Briefcase, Activity,
  Terminal, Search, Menu, X, BookOpen, Cpu,
  Eye, Factory, Radio, Box, Building, Brain
} from 'lucide-react'
import { BackgroundEffect } from './BackgroundEffect'

const NAV_GROUPS = [
  {
    title: "Operations",
    links: [
      { name: 'Gold Team', path: '/', icon: <Radio size={16} /> },
      {
        name: 'Agent Red Leader',
        path: '/offense',
        icon: <Terminal size={16} />,
        customHover: "group-hover:text-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
      },
      {
        name: 'Agent Blue Team',
        path: '/defense',
        icon: <Shield size={16} />,
        customHover: "group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
      },
      { name: 'OXOT Vision', path: '/vision', icon: <Eye size={16} /> },
    ]
  },
  {
    title: "Advisory",
    links: [
      { name: 'NIS2 Compliance', path: '/nis2', icon: <Globe size={16} /> },
      { name: 'IEC 62443 Compliance', path: '/iec62443', icon: <LayoutDashboard size={16} /> },
      { name: 'SOC Integration', path: '/soc', icon: <Activity size={16} /> },
      { name: 'M&A Due Diligence', path: '/acquisitions', icon: <Briefcase size={16} /> },
      { name: 'Operator Playbook', path: '/playbook-operator', icon: <BookOpen size={16} /> },
      { name: 'Manufacturer Guide', path: '/playbook-manufacturer', icon: <Cpu size={16} /> },
    ]
  },
  {
    title: "Core Systems",
    links: [

      { name: 'AEON Core', path: '/core', icon: <Activity size={16} /> },
      { name: '7-Layer Twin', path: '/architecture', icon: <Layers size={16} /> },
      { name: 'Sovereign Logic', path: '/logic', icon: <Sigma size={16} /> },
      { name: 'Concept Hub', path: '/concepts', icon: <Box size={16} /> },
      { name: 'Applied Theory', path: '/theory', icon: <Brain size={16} /> },
    ]
  },
  {
    title: "Corporate",
    links: [
      { name: 'About OXOT', path: '/about', icon: <Building size={16} /> },
      { name: 'Strategic Planning', path: '/corporate/strategic-planning', icon: <Briefcase size={16} />, customHover: "group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" },
      { name: 'Services Portfolio', path: '/corporate/services-portfolio', icon: <Activity size={16} /> },
      { name: 'API Enhancements', path: '/corporate/enhancements', icon: <Zap size={16} /> },
    ]
  }
]

export default function TerminalFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative min-h-screen p-0 flex flex-col md:flex-row overflow-hidden bg-black">

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-[100] p-3 bg-oxot-gold text-black rounded-full shadow-2xl"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Proportional & Professional */}
      <aside className={`
        fixed inset-0 z-[90] bg-black border-r border-white/5 md:relative md:inset-auto
        w-full md:w-[300px] h-screen flex flex-col transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-10 border-b border-white/5">
          <Link href="/" className="block group">

            {/* User Requested Logo (Black Background v3) */}
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/OXOT3Logo_Black.png"
                alt="OXOT Sovereign Intelligence"
                className="w-40 h-auto opacity-100 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono text-grey tracking-[0.4em] font-medium uppercase group-hover:text-white transition-colors">
                Sovereign Intelligence
              </div>
              <div className="text-[9px] font-mono text-oxot-gold tracking-[0.2em] font-bold uppercase">
                Uplink // Amsterdam_NL
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation - Clean Hierarchy */}
        <nav className="flex-1 overflow-y-auto px-8 py-8 space-y-10 scrollbar-hide">
          {NAV_GROUPS.map((group, i) => (
            <div key={i} className="space-y-4">
              {/* Reduced size headers as requested */}
              <h3 className="text-[9px] font-mono text-white/30 uppercase tracking-[0.1em] font-bold pl-1 border-l border-white/5">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.links.map((link: any) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 p-2 rounded-lg transition-all group relative
                      ${pathname === link.path
                        ? 'text-white'
                        : 'text-gray-500 hover:text-white'}
                    `}
                  >
                    <span className={`
                      transition-all duration-300
                      ${pathname === link.path ? 'text-oxot-gold' : `text-gray-600 ${link.customHover || 'group-hover:text-oxot-gold'}`}
                    `}>
                      {link.icon}
                    </span>
                    <span className="text-[11px] tracking-widest uppercase font-medium">
                      {link.name}
                    </span>
                    {pathname === link.path && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute left-[-18px] w-0.5 h-1/2 bg-oxot-gold rounded-full"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Mission */}
        <div className="p-12 border-t border-white/5 bg-white/[0.02]">
          <div className="text-[11px] font-mono text-grey uppercase tracking-widest leading-relaxed font-bold">
            Reliable Energy // Clean Water // Healthy Food<br />
            <span className="text-white opacity-60 mt-1 block">For our (grand)children.</span>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 relative z-10 bg-transparent h-screen overflow-y-auto overflow-x-hidden scrollbar-hide">
        {/* Background Effect and Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BackgroundEffect />
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none"></div>
        </div>

        <div className="p-8 md:p-16 lg:p-20 max-w-[1400px] mx-auto min-h-screen relative z-10">
          {/* Status Header */}
          <div className="flex justify-between items-center mb-20 opacity-20 pointer-events-none hidden md:flex font-mono text-[10px] uppercase tracking-[0.4em]">
            <div className="flex gap-12">
              <div>Secure_Lattice: [ACTIVE]</div>
              <div>Handshake: [TLS_1.3]</div>
            </div>
            <div>© 2025 OXOT B.V.</div>
          </div>

          <div className="relative z-20">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}