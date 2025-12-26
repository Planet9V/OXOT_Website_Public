'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Factory, Zap, Droplet, Landmark, Radio,
    Ambulance, Truck, Server, Leaf, ShieldAlert,
    Atom, Building2, CircuitBoard, Plane, Ship
} from 'lucide-react';

const SECTORS = [
    { name: 'Chemical', icon: <Factory /> },
    { name: 'Commercial', icon: <Building2 /> },
    { name: 'Comms', icon: <Radio /> },
    { name: 'Manufacturing', icon: <CircuitBoard /> },
    { name: 'Dams', icon: <Droplet /> },
    { name: 'Defense', icon: <ShieldAlert /> },
    { name: 'Emergency', icon: <Ambulance /> },
    { name: 'Energy', icon: <Zap /> },
    { name: 'Financial', icon: <Landmark /> },
    { name: 'Food/Ag', icon: <Leaf /> },
    { name: 'Govt', icon: <Landmark /> },
    { name: 'Healthcare', icon: <HeartPulse /> },
    { name: 'IT', icon: <Server /> },
    { name: 'Nuclear', icon: <Atom /> },
    { name: 'Transport', icon: <Truck /> },
    { name: 'Water', icon: <Waves /> }
];

// Helper components for missing icons
function HeartPulse(props: any) { return <Activity {...props} /> }
function Waves(props: any) { return <Droplet {...props} /> } // reuse droplet or find better
function Activity(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    )
}

export const SectorGrid = () => {
    return (
        <section className="relative z-10 py-32 px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
                        Pan-Sector <br /><span className="text-gray-500">Surveillance.</span>
                    </h2>
                    <div className="text-sm font-mono text-oxot-blue uppercase tracking-[0.3em]">
                        Monitoring 16 Critical Infrastructure Sectors
                    </div>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-xs font-mono text-gray-500 mb-2">GLOBAL THREAT LEVEL</div>
                    <div className="text-2xl font-black text-oxot-red animate-pulse">ELEVATED</div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {SECTORS.map((sector, i) => (
                    <SectorTile key={i} sector={sector} index={i} />
                ))}
            </div>
        </section>
    );
};

const SectorTile = ({ sector, index }: any) => {
    const [status, setStatus] = useState<'nominal' | 'warning' | 'critical'>('nominal');

    // Randomly change status to simulate live monitoring
    useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.random();
            if (rand > 0.95) setStatus('critical');
            else if (rand > 0.8) setStatus('warning');
            else setStatus('nominal');
        }, 2000 + (index * 500)); // offset timing

        return () => clearInterval(interval);
    }, [index]);

    const getStatusColor = () => {
        if (status === 'critical') return 'bg-oxot-red animate-pulse text-white';
        if (status === 'warning') return 'bg-oxot-gold text-black';
        return 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white';
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`aspect-square p-4 rounded-xl border border-white/5 flex flex-col justify-between transition-colors duration-500 ${getStatusColor()}`}
        >
            <div className="text-xs font-mono uppercase tracking-widest opacity-60">
                {index < 9 ? `0${index + 1}` : index + 1}
            </div>
            <div className="self-center">
                {React.cloneElement(sector.icon, { size: 24 })}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-tight text-center leading-tight">
                {sector.name}
            </div>
        </motion.div>
    );
};
