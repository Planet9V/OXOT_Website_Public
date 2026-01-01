'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Activity } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FrieslandHero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/campaigns/friesland_hero.png"
                    alt="FrieslandCampina Future Factory"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oxot-blue/90 via-oxot-blue/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-oxot-blue/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="max-w-4xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 border border-oxot-gold/50 text-oxot-gold rounded-full text-xs font-mono tracking-widest uppercase bg-oxot-gold/10 backdrop-blur-md">
                            Strategic Proposal
                        </span>
                        <span className="text-white/60 text-xs font-mono tracking-widest uppercase">
                            // CONFIDENTIAL
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
                        Sovereign Immunity for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-oxot-gold">
                            Expedition 2030
                        </span>
                    </h1>

                    <p className="text-lg text-white/80 max-w-2xl mb-8 font-light leading-relaxed">
                        FrieslandCampina is transforming the future of nutrition. <br />
                        Protect your <span className="text-white font-medium">digital production lines</span> with autonomous, physics-based defense that respects data sovereignty.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-6 py-3 bg-oxot-gold text-oxot-blue font-bold rounded-lg hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 text-sm uppercase tracking-wider">
                            <ShieldCheck size={18} />
                            <span>Request Pilot Access</span>
                        </button>
                        <Link href="/services/agent-blue" className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Activity size={18} />
                            <span>Explore Agent Blue</span>
                        </Link>
                    </div>
                </motion.div>

                {/* KPI Cards at Bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-12 left-0 w-full px-6"
                >
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        <KPICard
                            icon={<Server size={24} className="text-oxot-gold" />}
                            title="100% On-Premise"
                            desc="Zero telemetry leaves your factory floor. Full data sovereignty."
                        />
                        <KPICard
                            icon={<Activity size={24} className="text-cyan-400" />}
                            title="< 8s Containment"
                            desc="Neural physics halts ransomware propagation instantly."
                        />
                        <KPICard
                            icon={<ShieldCheck size={24} className="text-emerald-400" />}
                            title="NIS2 Compliant"
                            desc="Automated reporting for critical infrastructure mandates."
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function KPICard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="glass-panel p-6 rounded-xl border border-white/10 backdrop-blur-md bg-black/40 hover:bg-black/60 transition-colors">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                    {icon}
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
            </div>
        </div>
    );
}
