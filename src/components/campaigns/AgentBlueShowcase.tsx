'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Lock, Network, BrainCircuit, Shield } from 'lucide-react';

export default function AgentBlueShowcase() {
    return (
        <section className="py-24 bg-oxot-blue relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-oxot-gold/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 max-w-3xl">
                    <h2 className="heading-2 text-white mb-4">
                        The <span className="text-oxot-gold">Agent Blue</span> Advantage
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed">
                        Conventional IT security fails in OT environments. Agent Blue is an autonomous defensive AI purpose-built for the latency, determinism, and privacy requirements of industrial manufacturing.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Feature 1: On-Premise Threat Intel */}
                    <FeatureCard
                        title="On-Premise Threat Intelligence"
                        subtitle="Complete Data Sovereignty"
                        desc="Ingests telemetry from historians, SCADA, and IT systems to build a local digital twin. No sensor data ever leaves your network, guaranteeing compliance with strict privacy mandates."
                        icon={<Server size={32} className="text-emerald-400" />}
                        metrics={[
                            { label: "Data Egress", value: "0 Bytes" },
                            { label: "Analyst FTE", value: "-63%" },
                            { label: "Deployment", value: "Local VM" }
                        ]}
                    />

                    {/* Feature 2: Neural Physics Propagation */}
                    <FeatureCard
                        title="Neural Physics Containment"
                        subtitle="Mathematical Ransomware Extinction"
                        desc="Uses epidemic spectral radius calculations to identify and isolate 'super-spreader' nodes within seconds of infection relative to network topology."
                        icon={<BrainCircuit size={32} className="text-oxot-gold" />}
                        metrics={[
                            { label: "Containment", value: "< 8 sec" },
                            { label: "Guarantee", value: "100%" },
                            { label: "Downtime", value: "Avoided" }
                        ]}
                    />
                </div>

                {/* Integration Grid */}
                <div className="mt-20">
                    <h3 className="text-white text-lg font-bold mb-8 flex items-center gap-2">
                        <Network size={20} className="text-white/40" />
                        <span>Seamless OT Integration</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Siemens S7 / PCS7', 'Rockwell Automation', 'SAP ERP & MII', 'Azure IoT Edge'].map((tech) => (
                            <div key={tech} className="p-4 border border-white/10 rounded-lg bg-white/5 flex items-center justify-center text-white/70 font-mono text-sm hover:bg-white/10 transition-colors">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ title, subtitle, desc, icon, metrics }: any) {
    return (
        <div className="group relative p-8 rounded-2xl bg-black/40 border border-white/10 overflow-hidden hover:border-oxot-gold/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-oxot-gold/20 transition-colors">
                        {icon}
                    </div>
                    <Lock size={20} className="text-white/20" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-oxot-gold text-sm font-mono mb-6 uppercase tracking-wider">{subtitle}</p>

                <p className="text-white/60 leading-relaxed mb-8 h-20">
                    {desc}
                </p>

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    {metrics.map((m: any, i: number) => (
                        <div key={i}>
                            <div className="text-xl font-bold text-white mb-1">{m.value}</div>
                            <div className="text-xs text-white/40 font-mono uppercase">{m.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
