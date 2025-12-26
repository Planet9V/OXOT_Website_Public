'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, Box, Layers, ArrowRight, Eye, Terminal } from 'lucide-react';
import Link from 'next/link';


const GlowingIcon = ({ color, icon }: { color: 'red' | 'blue' | 'gold', icon: React.ReactNode }) => {
    const colorClasses = {
        red: 'border-oxot-red shadow-[0_0_15px_rgba(214,0,0,0.5)] text-oxot-red',
        blue: 'border-oxot-blue shadow-[0_0_15px_rgba(0,66,214,0.5)] text-oxot-blue',
        gold: 'border-oxot-gold shadow-[0_0_15px_rgba(255,215,0,0.5)] text-oxot-gold'
    };

    const bgColors = {
        red: 'bg-oxot-red/20',
        blue: 'bg-oxot-blue/20',
        gold: 'bg-oxot-gold/20'
    };

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Rotating Outer Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 rounded-full border border-dashed opacity-40 ${colorClasses[color].split(' ')[0]}`} // Use just the border color
            />
            {/* Reverse Rotating Inner Ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-1 rounded-full border border-dotted opacity-60 ${colorClasses[color].split(' ')[0]}`}
            />
            {/* Glowing Pulse Background */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-full blur-md ${bgColors[color]}`}
            />

            {/* The Icon Itself */}
            <div className={`relative z-10 ${colorClasses[color].split(' ').pop()}`}>
                {icon}
            </div>
        </div>
    );
};

export const TrinitySection = () => {
    return (
        <section className="relative z-10 py-32 border-y border-white/10 bg-transparent">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Trinity</span> Protocol
                    </h2>
                    <div className="text-sm font-mono uppercase tracking-[0.3em]">
                        <span className="text-oxot-red">Offense</span>
                        <span className="text-gray-600"> // </span>
                        <span className="text-oxot-blue">Defense</span>
                        <span className="text-gray-600"> // </span>
                        <span className="text-oxot-gold">Architecture</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10 rounded-3xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                    {/* Red Leader (Offense) */}
                    <TrinityCard
                        title="Red Leader"
                        role="Adversarial Emulation"
                        icon={<GlowingIcon color="red" icon={<Terminal size={28} />} />}
                        color="text-oxot-red"
                        bgHover="group-hover:bg-oxot-red/10"
                        desc="Autonomous AI threat actor that relentlessly probes your infrastructure for weaknesses before the enemy does."
                        features={['Automated Pentesting', 'Attack Path Mapping', 'Exploit Validation']}
                        link="/offense"
                    />

                    {/* Blue Team (Defense) */}
                    <TrinityCard
                        title="Blue Team"
                        role="Defensive Intelligence"
                        icon={<GlowingIcon color="blue" icon={<Shield size={28} />} />}
                        color="text-oxot-blue"
                        bgHover="group-hover:bg-oxot-blue/10"
                        desc="Proactive defense powered by the Gated Graph Neural Network (GGNN). Real-time threat triangulation and zero-trust verification."
                        features={['Zero-Day Prevention', 'Threat Hunting', 'Predictive Patching']}
                        link="/defense"
                    />

                    {/* Gold Team (Architecture & Consulting) */}
                    <TrinityCard
                        title="Gold Team"
                        role="Global Consulting & Eng."
                        icon={<GlowingIcon color="gold" icon={<Layers size={28} />} />}
                        color="text-oxot-gold"
                        bgHover="group-hover:bg-oxot-gold/10"
                        desc="Top-tier engineers empowered by AI. We design IEC 62443 architectures, manage SOCs, and lead digital transformation."
                        features={['Strategic Advisory', 'M&A Due Diligence', 'Crisis Management']}
                        link="/services"
                    />
                </div>
            </div>
        </section>
    );
};

const TrinityCard = ({ title, role, icon, color, bgHover, desc, features, link, glowColor }: any) => {
    // Extract base color for shadow effects
    const shadowColors: Record<string, string> = {
        'text-oxot-red': 'rgba(214, 0, 0, 0.3)',
        'text-oxot-blue': 'rgba(0, 66, 214, 0.3)',
        'text-oxot-gold': 'rgba(255, 215, 0, 0.3)',
    };
    const bgGradients: Record<string, string> = {
        'text-oxot-red': 'from-red-950/50 via-transparent to-transparent',
        'text-oxot-blue': 'from-blue-950/50 via-transparent to-transparent',
        'text-oxot-gold': 'from-yellow-950/50 via-transparent to-transparent',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`group relative p-12 bg-black/30 backdrop-blur-sm transition-all duration-500 ${bgHover} flex flex-col h-full overflow-hidden`}
            style={{
                boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.05), inset 0 0 60px ${shadowColors[color] || 'transparent'}`
            }}
        >
            {/* Gradient Overlay for Depth */}
            <div className={`absolute inset-0 bg-gradient-to-b ${bgGradients[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            {/* Subtle Top Edge Glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Corner Accent */}
            <motion.div
                className={`absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity`}
                style={{ background: `radial-gradient(circle at top right, ${shadowColors[color]}, transparent)` }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Icon Wrapper */}
                <motion.div
                    className="mb-8 origin-left"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    {icon}
                </motion.div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{title}</h3>
                <div className={`text-xs font-mono font-bold uppercase tracking-widest ${color} mb-8`}>{role}</div>

                <p className="text-gray-400 leading-relaxed mb-10 text-sm font-light normal-case">
                    {desc}
                </p>

                <ul className="space-y-4 mb-12">
                    {features.map((f: string, i: number) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0.5, x: 0 }}
                            whileHover={{ opacity: 1, x: 4 }}
                            className="flex items-center gap-3 text-sm font-bold text-gray-500 group-hover:text-white transition-colors cursor-default"
                        >
                            <motion.div
                                className={`w-1.5 h-1.5 rounded-full bg-current ${color}`}
                                whileHover={{ scale: 1.5 }}
                            />
                            {f}
                        </motion.li>
                    ))}
                </ul>

                <Link href={link} className={`mt-auto inline-flex items-center gap-2 text-white font-black uppercase tracking-widest hover:gap-4 transition-all group-hover:${color}`}>
                    Access Dossier <ArrowRight size={16} />
                </Link>
            </div>

            {/* Bottom Edge Accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-current to-transparent ${color}`}></div>
        </motion.div>
    )
}
