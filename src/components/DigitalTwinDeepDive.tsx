'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Lock, Shield, Server, Activity, Share2, Hexagon, Fingerprint, Zap } from 'lucide-react';

// --- SIEM INTEGRATIONS DATA ---
const SIEM_PARTNERS = [
    { name: "Splunk", type: "SIEM" },
    { name: "Dragos", type: "ICS/OT" },
    { name: "Nozomi", type: "ICS/OT" },
    { name: "Claroty", type: "ICS/OT" },
    { name: "Cisco", type: "Network" },
    { name: "Microsoft Sentinel", type: "SIEM" },
    { name: "CrowdStrike", type: "EDR" },
    { name: "Darktrace", type: "AI" }
];

// --- SUB-COMPONENT: LAYERED TWIN ARCHITECTURE ---
const ExplodedTwin = () => {
    const layers = [
        { label: 'Physical Asset Layer', sublabel: 'PLC • RTU • HMI • Sensors', color: 'from-gray-600 to-gray-700', borderColor: 'border-gray-500/50', icon: '⚙️' },
        { label: 'Asset Identity & SBOM', sublabel: 'Deep library analysis', color: 'from-blue-900 to-blue-800', borderColor: 'border-blue-500/50', icon: '🔍' },
        { label: 'Unidirectional Gateway', sublabel: 'Hardware data diode', color: 'from-red-900 to-red-800', borderColor: 'border-red-500/50', icon: '🔒' },
        { label: 'AEON Cloud Twin', sublabel: 'Threat simulation engine', color: 'from-cyan-900 to-purple-900', borderColor: 'border-cyan-500/50', icon: '🧠' },
    ];

    return (
        <div className="relative h-[500px] w-full flex items-center justify-center">
            {/* Central Stack */}
            <div className="relative flex flex-col gap-0">
                {layers.map((layer, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Layer Box */}
                        <div className={`w-[280px] h-[80px] bg-gradient-to-r ${layer.color} border ${layer.borderColor} rounded-lg flex items-center px-4 gap-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden`}>
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon */}
                            <div className="text-2xl">{layer.icon}</div>

                            {/* Text */}
                            <div>
                                <div className="text-white font-bold text-sm">{layer.label}</div>
                                <div className="text-gray-400 text-xs">{layer.sublabel}</div>
                            </div>
                        </div>

                        {/* Connection Line (except last) */}
                        {i < layers.length - 1 && (
                            <div className="flex items-center justify-center h-8">
                                <motion.div
                                    className="w-0.5 h-full bg-gradient-to-b from-white/30 to-white/10"
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    transition={{ delay: i * 0.15 + 0.3 }}
                                    viewport={{ once: true }}
                                />
                                {/* Animated Data Particle */}
                                <motion.div
                                    className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
                                    animate={{
                                        y: [0, 30],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        delay: i * 0.5,
                                        ease: "linear"
                                    }}
                                />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Side Labels */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-16 text-right pr-8">
                <div className="text-xs font-mono text-gray-500">
                    <div className="text-gray-400">ON-PREMISE</div>
                    <div className="text-[10px] text-gray-600">Customer Site</div>
                </div>
                <div className="text-xs font-mono text-red-400">
                    <div>SECURITY</div>
                    <div className="text-[10px] text-gray-600">Air-Gapped</div>
                </div>
                <div className="text-xs font-mono text-cyan-400">
                    <div>SOVEREIGN CLOUD</div>
                    <div className="text-[10px] text-gray-600">AEON Platform</div>
                </div>
            </div>

            {/* Right Side - Data Flow Indicator */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-center">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-cyan-400 text-xs font-mono"
                >
                    <div className="mb-2">↓</div>
                    <div className="writing-mode-vertical text-[10px] tracking-widest opacity-50">ONE-WAY DATA FLOW</div>
                </motion.div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: SWARM CONSENSUS VISUAL ---
const SwarmConsensus = () => {
    return (
        <div className="bg-black/40 border border-white/5 rounded-xl p-8 relative overflow-hidden h-full">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Share2 className="text-purple-400" />
                Decentralized Swarm Consensus
            </h3>
            <p className="text-sm text-gray-400 mb-8 max-w-sm">
                Single AI models hallucinate. AEON uses a "Swarm of Subminds" that must independently agree on a threat detection before alerting SOC.
            </p>

            <div className="relative h-[200px] flex items-center justify-center gap-8">
                {/* AGENT NODES */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -10, 0],
                            borderColor: ['rgba(255,255,255,0.1)', 'rgba(34, 211, 238, 0.8)', 'rgba(255,255,255,0.1)']
                        }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                        className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center relative z-10"
                    >
                        <Zap size={20} className="text-cyan-400" />

                        {/* Connecting Lines */}
                        <motion.div
                            className="absolute top-1/2 left-full w-8 h-[1px] bg-cyan-500/50"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, delay: i * 0.5, repeat: Infinity }}
                        />
                    </motion.div>
                ))}

                {/* CONSENSUS HUB */}
                <motion.div className="w-24 h-24 rounded-full bg-purple-900/20 border border-purple-500 flex flex-col items-center justify-center z-20 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <span className="text-xs font-bold text-purple-400">THREAT</span>
                    <span className="text-lg font-black text-white">CONFIRMED</span>
                    <span className="text-[9px] text-gray-400 mt-1">99.98% Confidence</span>
                </motion.div>
            </div>
        </div>
    );
};

export default function DigitalTwinDeepDive() {
    return (
        <section className="space-y-20 py-20 border-t border-white/10">

            {/* HEADER */}
            <div className="text-center max-w-4xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-widest">
                    <Activity size={14} /> SOC Architecture Deep Dive
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                    The Architected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Twin.</span>
                </h2>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                    Building a high-fidelity digital twin requires more than just scanning. It requires a rigorous
                    <span className="text-white font-bold"> molecular reconstruction</span> of your facility, from the physical layer to the cognitive layer.
                </p>
            </div>

            {/* MAIN TWIN BUILDER VISUAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <ExplodedTwin />
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white uppercase">Blueprint to Reality</h3>
                        <div className="pl-6 border-l-2 border-oxot-blue space-y-6">
                            <div>
                                <h4 className="text-oxot-blue font-bold text-sm uppercase tracking-widest mb-1">Step 1: Ingestion & SBOM</h4>
                                <p className="text-gray-400 text-sm">We ingest engineering diagrams and asset registers to map the physical reality. Every library and DLL is tracked via Deep SBOM.</p>
                            </div>
                            <div>
                                <h4 className="text-oxot-blue font-bold text-sm uppercase tracking-widest mb-1">Step 2: Data Diode Enforcement</h4>
                                <p className="text-gray-400 text-sm">
                                    Absolute security. Data flows <span className="text-white">One Way</span> out of the OT environment via hardware data diodes.
                                    The Cloud Twin cannot manipulate physical valves—it can only observe and predict.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-oxot-blue font-bold text-sm uppercase tracking-widest mb-1">Step 3: Threat Modeling</h4>
                                <p className="text-gray-400 text-sm">The Twin runs 1,000s of scenarios daily against the latest global intelligence to find attack vectors before they exist.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SWARM INTELLIGENCE & SIEM */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-black/40 border border-white/5 rounded-xl p-8 h-full">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                            <Server className="text-green-500" />
                            Ecosystem Integration
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {SIEM_PARTNERS.map((partner, i) => (
                                <div key={i} className="group p-4 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center gap-2 cursor-pointer">
                                    <div className="text-white font-bold group-hover:text-oxot-blue transition-colors">{partner.name}</div>
                                    <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{partner.type}</div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm text-gray-400 border-t border-white/5 pt-4">
                            AEON integrates bi-directionally with your existing SOC stack. We feed high-fidelity, validated alerts into your SIEM, reducing noise by <span className="text-white font-bold">94%</span>.
                        </p>
                    </div>
                </div>

                <SwarmConsensus />
            </div>

        </section>
    );
}
