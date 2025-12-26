'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Cpu, Globe, Shield, Zap, Lock,
    Network, Server, Activity, ArrowRight
} from 'lucide-react'

export default function LocalSubmindNode() {
    return (
        <div className="w-full relative h-[400px] bg-black/20 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">

            {/* Background Map Effect */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black" />

            {/* CONNECTION LINES */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Connection from SOC to Local */}
                <motion.line
                    x1="20%" y1="50%" x2="80%" y2="50%"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -20 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="opacity-50"
                />
            </svg>

            {/* NODES CONTAINER */}
            <div className="relative w-full max-w-4xl flex items-center justify-between px-10">

                {/* 1. GLOBAL SUPERMIND (Left) */}
                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="relative w-24 h-24 rounded-full bg-blue-900/30 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                        <Globe size={40} className="text-blue-400 animate-pulse" />

                        {/* Satellites */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-blue-400/30 w-32 h-32 -m-4 border-dashed"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-blue-400">AEON SUPERMIND</h3>
                        <div className="text-[10px] text-gray-500 font-mono">GLOBAL SOC INTELLIGENCE</div>
                    </div>
                </div>

                {/* DATA FLOW ANIMATION */}
                <div className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                        <div className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 rounded text-[10px] text-blue-300">
                            THREAT FEED
                        </div>
                        <ArrowRight size={14} className="text-gray-600" />
                        <ArrowRight size={14} className="text-gray-600" />
                        <div className="px-3 py-1 bg-green-900/40 border border-green-500/30 rounded text-[10px] text-green-300">
                            TELEMETRY
                        </div>
                    </div>
                </div>

                {/* 2. LOCAL SUBMIND (Right) */}
                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="relative w-24 h-24 rounded-xl bg-cyan-900/30 border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)]">
                        <Cpu size={40} className="text-cyan-400" />

                        {/* Processing Ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute w-28 h-28 border-2 border-cyan-500/20 rounded-xl"
                        />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-cyan-400">LOCAL SUBMIND</h3>
                        <div className="text-[10px] text-gray-500 font-mono">AUTONOMOUS DEFENSE NODE</div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex gap-2 mt-2">
                        <div className="flex items-center gap-1 text-[9px] text-green-400 border border-green-500/30 px-2 py-1 rounded bg-green-900/20">
                            <Shield size={10} /> AUTO-PATCH
                        </div>
                        <div className="flex items-center gap-1 text-[9px] text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded bg-yellow-900/20">
                            <Lock size={10} /> ISOLATION READY
                        </div>
                    </div>
                </div>

            </div>

            {/* DESCRIPTION */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-xs text-gray-400 max-w-lg mx-auto">
                    The Local Submind operates autonomously to mitigate immediate threats (ZCR 5) while synchronizing
                    long-term strategies with the Global Supermind.
                </p>
            </div>
        </div>
    )
}
