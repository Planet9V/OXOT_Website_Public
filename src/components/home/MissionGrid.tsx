'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplets, Heart, Activity, Waves, Sun } from 'lucide-react';

export const MissionGrid = () => {
    return (
        <section className="relative z-10 py-32 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
                    Critical <span className="text-oxot-blue">Sustenance</span>
                </h2>
                <div className="h-1 w-24 bg-oxot-blue mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MissionCard
                    title="Reliable Energy"
                    subtitle="Grid Stability: 99.99%"
                    icon={<Zap size={32} className="text-yellow-400" />}
                    color="yellow"
                    data={[65, 59, 80, 81, 56, 55, 40, 70, 75, 85, 90, 88]}
                >
                    <div className="absolute inset-0 bg-yellow-400/5 z-0"></div>
                </MissionCard>

                <MissionCard
                    title="Clean Water"
                    subtitle="Purity Index: Optimal"
                    icon={<Droplets size={32} className="text-cyan-400" />}
                    color="cyan"
                    data={[45, 70, 75, 70, 65, 68, 72, 75, 80, 85, 82, 90]}
                >
                    <div className="absolute inset-0 bg-cyan-400/5 z-0"></div>
                </MissionCard>

                <MissionCard
                    title="Healthy Children"
                    subtitle="Future Continuity: Secured"
                    icon={<Heart size={32} className="text-oxot-red" />}
                    color="red"
                    data={[20, 30, 45, 50, 60, 75, 80, 85, 90, 95, 98, 99]}
                >
                    <div className="absolute inset-0 bg-oxot-red/5 z-0"></div>
                </MissionCard>
            </div>
        </section>
    );
};

const MissionCard = ({ title, subtitle, icon, color, data, children }: any) => {
    // Generate bars for the mini-graph
    const bars = data.map((val: number, i: number) => (
        <motion.div
            key={i}
            initial={{ height: '20%' }}
            animate={{ height: `${val}%` }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
                ease: "easeInOut"
            }}
            className={`w-full bg-${color}-500/50 rounded-t-sm`}
            style={{ backgroundColor: color === 'red' ? '#D60000' : color === 'cyan' ? '#22d3ee' : '#facc15' }}
        />
    ));

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden h-[400px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm group flex flex-col`}
        >
            {/* Background and children */}
            {children}

            {/* Header */}
            <div className="relative z-10 p-8">
                <div className={`p-4 rounded-xl bg-white/5 inline-flex mb-6 border border-white/10 group-hover:border-${color}-500/50 transition-colors`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{title}</h3>
                <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">{subtitle}</p>
            </div>

            {/* Graph Area */}
            <div className="mt-auto relative z-10 px-8 pb-8 h-32 flex items-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                {bars}
            </div>

            {/* Overlay Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10px] w-full animate-scan pointer-events-none"></div>
        </motion.div>
    );
};
