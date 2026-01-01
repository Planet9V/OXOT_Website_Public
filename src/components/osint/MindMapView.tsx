'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Network, Building2, Globe, Cpu, Leaf, Users, ChevronRight,
    Lightbulb, Target, Package, ShieldCheck, Zap, MapPin
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import Image from 'next/image';

// =============================================================================
// MIND MAP DATA (structured from OFI_Mind Map.png content)
// =============================================================================

const MIND_MAP_DATA = {
    center: {
        name: 'ofi',
        fullName: 'Olam Food Ingredients',
        tagline: 'Be the change for good food and a healthy future'
    },
    branches: [
        {
            id: 'platforms',
            name: 'Product Platforms',
            icon: Package,
            color: '#eab308',
            items: [
                { name: 'Cocoa', details: 'Unicao/Macao brands, CDI/Spain facilities' },
                { name: 'Coffee', details: 'Club Coffee, Seda Outspan, soluble/roasted' },
                { name: 'Dairy', details: 'Tokoroa NZ, Johor MY, powder production' },
                { name: 'Nuts', details: 'Almonds, cashews, hazelnuts processing' },
                { name: 'Spices', details: 'Las Cruces NM, Vietnam, cryogenic milling' },
            ]
        },
        {
            id: 'geography',
            name: 'Global Footprint',
            icon: Globe,
            color: '#3b82f6',
            items: [
                { name: '51 Countries', details: 'Operations across 6 continents' },
                { name: '120+ Plants', details: 'Manufacturing facilities worldwide' },
                { name: '19 CSCs/IECs', details: 'Customer Solution Centers' },
                { name: '2.4M Farmers', details: 'Direct sourcing network' },
            ]
        },
        {
            id: 'digital',
            name: 'Digital Ecosystem',
            icon: Cpu,
            color: '#22c55e',
            items: [
                { name: 'AtSource', details: 'Traceability & sustainability platform' },
                { name: 'Olam Direct', details: '2.8M farmer mobile app' },
                { name: 'Braincube', details: 'IIoT manufacturing optimization' },
                { name: 'SAP S/4HANA', details: 'Enterprise ERP on AWS' },
                { name: 'GuardianEye', details: 'Mindsprint cybersecurity' },
            ]
        },
        {
            id: 'entities',
            name: 'Corporate Entities',
            icon: Building2,
            color: '#8b5cf6',
            items: [
                { name: 'ofi HQ', details: 'Singapore (Olam Group)' },
                { name: 'Mindsprint', details: '3,200+ tech professionals' },
                { name: 'Terrascope', details: 'Carbon measurement SaaS' },
                { name: 'ofi North America', details: 'Chicago unified HQ' },
            ]
        },
        {
            id: 'sustainability',
            name: 'Sustainability',
            icon: Leaf,
            color: '#10b981',
            items: [
                { name: 'Cocoa Compass', details: '2019 sustainability initiative' },
                { name: 'EUDR Compliance', details: 'Dec 30, 2025 deadline' },
                { name: 'Living Income', details: 'Farmer premium programs' },
                { name: 'Deforestation-Free', details: 'Traceable supply chains' },
            ]
        },
        {
            id: 'innovation',
            name: 'Innovation',
            icon: Lightbulb,
            color: '#f97316',
            items: [
                { name: 'Chicago CSC', details: 'US customer co-creation' },
                { name: 'Shanghai CSC', details: 'China pilot facility' },
                { name: 'Amsterdam CSC', details: 'European innovation hub' },
                { name: 'Fresno IEC', details: 'Spices excellence center' },
            ]
        },
    ]
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function MindMapBranch({ branch, index }: { branch: typeof MIND_MAP_DATA.branches[0]; index: number }) {
    const [expanded, setExpanded] = useState(true);
    const Icon = branch.icon;
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
        >
            {/* Connector */}
            <div className="flex items-center gap-2">
                <div
                    className="w-16 h-1 rounded-full"
                    style={{ backgroundColor: branch.color }}
                />
            </div>

            {/* Branch Card */}
            <div
                className="glass-panel p-4 rounded-xl min-w-64 max-w-80"
                style={{ borderLeft: `3px solid ${branch.color}` }}
            >
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full flex items-center gap-3 mb-3"
                >
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${branch.color}20` }}>
                        <Icon size={20} style={{ color: branch.color }} />
                    </div>
                    <h4 className="text-white font-semibold text-sm">{branch.name}</h4>
                </button>
                {expanded && (
                    <div className="space-y-2">
                        {branch.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 p-2 bg-black/30 rounded-lg">
                                <ChevronRight size={12} className="text-grey mt-1 flex-shrink-0" />
                                <div>
                                    <div className="text-white text-xs font-medium">{item.name}</div>
                                    <div className="text-grey text-[10px]">{item.details}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function MindMapView() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <ScrollReveal>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Network className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">CORPORATE MIND MAP</span>
                    </div>
                    <PageHeader
                        title="OFI Ecosystem Overview"
                        subtitle="Visual representation of Olam Food Ingredients - platforms, geography, digital assets, and strategic initiatives"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Original Image Reference */}
            <ScrollReveal>
                <div className="glass-panel p-4 rounded-xl mb-8">
                    <h3 className="text-sm font-mono text-oxot-gold mb-4">ORIGINAL MIND MAP</h3>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/30">
                        <Image
                            src="/Customer_OFI/OFI_Mind Map.png"
                            alt="OFI Corporate Mind Map"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </ScrollReveal>

            {/* Interactive Mind Map */}
            <ScrollReveal>
                <div className="mb-8">
                    <h3 className="text-sm font-mono text-oxot-gold mb-6">INTERACTIVE BREAKDOWN</h3>

                    {/* Center Node */}
                    <div className="flex justify-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="glass-panel p-6 rounded-2xl border-2 border-oxot-gold text-center"
                        >
                            <div className="text-3xl font-bold text-oxot-gold mb-1">{MIND_MAP_DATA.center.name}</div>
                            <div className="text-white text-sm mb-2">{MIND_MAP_DATA.center.fullName}</div>
                            <div className="text-grey text-xs italic">"{MIND_MAP_DATA.center.tagline}"</div>
                        </motion.div>
                    </div>

                    {/* Branches Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {MIND_MAP_DATA.branches.map((branch, i) => (
                            <MindMapBranch key={branch.id} branch={branch} index={i} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Quick Stats */}
            <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <Package className="text-yellow-400 mx-auto mb-2" size={24} />
                        <div className="text-2xl font-bold text-white">5</div>
                        <div className="text-xs text-grey">Product Platforms</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <Globe className="text-blue-400 mx-auto mb-2" size={24} />
                        <div className="text-2xl font-bold text-white">51</div>
                        <div className="text-xs text-grey">Countries</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <Users className="text-green-400 mx-auto mb-2" size={24} />
                        <div className="text-2xl font-bold text-white">2.4M</div>
                        <div className="text-xs text-grey">Farmers</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <Building2 className="text-purple-400 mx-auto mb-2" size={24} />
                        <div className="text-2xl font-bold text-white">120+</div>
                        <div className="text-xs text-grey">Plants</div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
