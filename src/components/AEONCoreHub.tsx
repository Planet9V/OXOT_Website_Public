'use client'

import React from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CoreLinkProvider } from '@/components/CoreLinkContext'
import { Activity } from 'lucide-react'

// Dynamic Imports
const E27View = dynamic(() => import('@/components/E27View'), {
    loading: () => <div className="h-screen flex items-center justify-center text-oxot-blue animate-pulse">Initializing Neural Digital Twin...</div>
})

const SevenLayerArchitectureView = dynamic(() => import('@/components/SevenLayerArchitectureView'), {
    loading: () => <div className="h-screen flex items-center justify-center text-green-500 animate-pulse">Loading Structural Integrity Models...</div>
})

const NeuralPhysicsView = dynamic(() => import('@/components/NeuralPhysicsView'), {
    loading: () => <div className="h-screen flex items-center justify-center text-oxot-blue animate-pulse">Initializing Physics Engine...</div>
})

export default function AEONCoreHub() {
    return (
        <div className="min-h-screen w-full bg-[#050505] relative text-white font-sans selection:bg-oxot-gold/30">
            <CoreLinkProvider>
                <AEONCoreHubContent />
            </CoreLinkProvider>
        </div>
    )
}

function AEONCoreHubContent() {
    return (
        <main className="w-full">
            {/* HERO: Neural Physics - The Fundamental Laws */}
            <section className="relative h-screen flex flex-col items-center justify-center z-40 overflow-hidden bg-black">
                {/* Animated Background Grid */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_100%)]" />
                    {/* Subtle blue glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-oxot-blue/10 rounded-full blur-[150px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center max-w-5xl mx-auto px-6"
                >
                    <div className="text-oxot-blue text-xs font-mono uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-2">
                        <Activity className="w-4 h-4" />
                        AEON CORE // Titan v4.1
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                        Neural <span className="text-oxot-blue">Physics.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed text-balance mb-12">
                        The mathematical laws that govern the system. Detailed breakdowns of the
                        <span className="text-white font-medium"> McKenney-Lacan Calculus</span>,
                        <span className="text-white font-medium"> Gated Graph Neural Networks</span>, and
                        <span className="text-white font-medium"> Fluid Dynamics</span> models.
                    </p>

                    <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                        <span>Fundamental Laws</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <span>Sovereign Logic</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                        <span>Digital Immunity</span>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">Explore the Core</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-4 h-4"
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 1: Neural Physics Interactive Modules */}
            <div id="physics" className="relative z-30 bg-black border-t border-white/10">
                <div className="container mx-auto px-6 py-24">
                    <NeuralPhysicsView />
                </div>
            </div>

            {/* Section 2: The Mind (Sovereign Logic / E27 Engine) */}
            <div id="mind" className="relative z-20">
                <E27View
                    heroTitle="SOVEREIGN LOGIC"
                    heroSubtitle="E27 ENGINE CORE // The Calculus of McKenney-Lacan // Predictive Applications."
                    navOffset={80}
                    isEmbedded={true}
                />
            </div>

            {/* Section 3: The Body (7-Layer Architecture) */}
            <div id="body" className="relative z-10">
                <SevenLayerArchitectureView isEmbedded={true} />
            </div>
        </main>
    )
}
