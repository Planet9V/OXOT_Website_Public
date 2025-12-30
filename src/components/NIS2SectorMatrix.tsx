'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap, Plane, Building2, Heart, Droplets, Trash2, Wifi,
    Server, Shield, Rocket, Mail, FlaskConical, Utensils,
    Factory, Globe, Microscope, ChevronDown, ChevronUp,
    AlertTriangle, CheckCircle, Building, Users
} from 'lucide-react'

// Annex I - Sectors of High Criticality (Essential Entities)
const ANNEX_I_SECTORS = [
    {
        name: 'Energy',
        icon: Zap,
        color: '#D4AF37', // Gold
        subsectors: ['Electricity', 'District Heating/Cooling', 'Oil', 'Gas', 'Hydrogen'],
        entities: ['Power generators', 'Grid operators', 'Energy suppliers', 'EV charging operators'],
        classification: 'essential',
        notes: 'Includes entire supply chain from production to distribution'
    },
    {
        name: 'Transport',
        icon: Plane,
        color: '#D4AF37', // Gold
        subsectors: ['Air', 'Rail', 'Water', 'Road'],
        entities: ['Airlines', 'Airports', 'Rail operators', 'Ports', 'Shipping companies', 'ITS operators'],
        classification: 'essential',
        notes: 'Covers passenger and freight transport infrastructure'
    },
    {
        name: 'Banking',
        icon: Building2,
        color: '#D4AF37', // Gold
        subsectors: ['Credit institutions'],
        entities: ['Banks', 'Credit institutions as defined in Regulation 575/2013'],
        classification: 'essential',
        notes: 'May overlap with DORA requirements'
    },
    {
        name: 'Financial Market Infrastructure',
        icon: Building,
        color: '#D4AF37', // Gold
        subsectors: ['Trading venues', 'CCPs'],
        entities: ['Stock exchanges', 'Trading platforms', 'Central counterparties'],
        classification: 'essential',
        notes: 'Subject to sector-specific supervision'
    },
    {
        name: 'Health',
        icon: Heart,
        color: '#D4AF37', // Gold
        subsectors: ['Healthcare providers', 'Reference laboratories', 'Pharma R&D', 'Medical devices'],
        entities: ['Hospitals', 'Clinics', 'Pharmaceutical manufacturers', 'Medical device companies'],
        classification: 'essential',
        notes: 'Expanded significantly from NIS1'
    },
    {
        name: 'Drinking Water',
        icon: Droplets,
        color: '#D4AF37', // Gold
        subsectors: ['Water supply', 'Water treatment'],
        entities: ['Water utilities', 'Treatment plant operators', 'Distribution networks'],
        classification: 'essential',
        notes: 'Critical for public health'
    },
    {
        name: 'Wastewater',
        icon: Trash2,
        color: '#D4AF37', // Gold
        subsectors: ['Wastewater collection', 'Treatment', 'Disposal'],
        entities: ['Wastewater utilities', 'Treatment facilities'],
        classification: 'essential',
        notes: 'New sector added in NIS2'
    },
    {
        name: 'Digital Infrastructure',
        icon: Wifi,
        color: '#D4AF37', // Gold
        subsectors: ['IXPs', 'DNS providers', 'TLD registries', 'Cloud', 'Data centers', 'CDNs', 'Trust services'],
        entities: ['Internet exchange points', 'DNS service providers', 'Cloud computing providers', 'Data center operators'],
        classification: 'essential',
        notes: 'Significantly expanded coverage'
    },
    {
        name: 'ICT Service Management (B2B)',
        icon: Server,
        color: '#D4AF37', // Gold
        subsectors: ['Managed services', 'Managed security services'],
        entities: ['MSPs', 'MSSPs providing security services'],
        classification: 'essential',
        notes: 'New category targeting supply chain'
    },
    {
        name: 'Public Administration',
        icon: Shield,
        color: '#D4AF37', // Gold
        subsectors: ['Central government', 'Regional entities'],
        entities: ['Central government bodies', 'Regional government entities'],
        classification: 'essential',
        notes: 'Excludes judiciary, parliament, central banks'
    },
    {
        name: 'Space',
        icon: Rocket,
        color: '#D4AF37', // Gold
        subsectors: ['Ground-based infrastructure'],
        entities: ['Satellite operators', 'Ground station operators', 'Space data providers'],
        classification: 'essential',
        notes: 'New sector added in NIS2'
    }
]

// Annex II - Other Critical Sectors (Important Entities)
const ANNEX_II_SECTORS = [
    {
        name: 'Postal & Courier Services',
        icon: Mail,
        color: '#3B82F6', // Blue
        subsectors: ['Postal services', 'Courier services'],
        entities: ['Postal operators', 'Package delivery companies', 'Logistics providers'],
        classification: 'important',
        notes: 'Includes clearance and distribution'
    },
    {
        name: 'Waste Management',
        icon: Trash2,
        color: '#64748b', // Slate
        subsectors: ['Waste collection', 'Treatment', 'Disposal', 'Recovery'],
        entities: ['Waste management companies', 'Recycling facilities', 'Hazardous waste handlers'],
        classification: 'important',
        notes: 'Excludes wastewater (Annex I)'
    },
    {
        name: 'Chemicals',
        icon: FlaskConical,
        color: '#3B82F6', // Blue
        subsectors: ['Manufacturing', 'Production', 'Distribution'],
        entities: ['Chemical manufacturers', 'Chemical distributors'],
        classification: 'important',
        notes: 'Follows REACH regulation scope'
    },
    {
        name: 'Food',
        icon: Utensils,
        color: '#64748b', // Slate
        subsectors: ['Production', 'Processing', 'Wholesale distribution'],
        entities: ['Food manufacturers', 'Food processors', 'Wholesale distributors'],
        classification: 'important',
        notes: 'Industrial scale operations'
    },
    {
        name: 'Manufacturing',
        icon: Factory,
        color: '#3B82F6', // Blue
        subsectors: ['Medical devices', 'Computer/electronic products', 'Electrical equipment', 'Machinery', 'Motor vehicles', 'Transport equipment'],
        entities: ['Manufacturers of computers', 'Electronics', 'Medical devices', 'Vehicles', 'Machinery'],
        classification: 'important',
        notes: 'Covers critical product manufacturing per NACE codes'
    },
    {
        name: 'Digital Providers',
        icon: Globe,
        color: '#64748b', // Slate
        subsectors: ['Online marketplaces', 'Search engines', 'Social networks'],
        entities: ['E-commerce platforms', 'Search engine providers', 'Social media platforms'],
        classification: 'important',
        notes: 'Micro/small entities automatically included for specific services'
    },
    {
        name: 'Research',
        icon: Microscope,
        color: '#3B82F6', // Blue
        subsectors: ['Research organizations'],
        entities: ['Research institutions', 'Universities conducting research', 'R&D centers'],
        classification: 'important',
        notes: 'Broad coverage of research activities'
    }
]

// Size thresholds
const SIZE_THRESHOLDS = {
    large: { employees: '≥250', turnover: '>€50M', balance: '>€43M', classification: 'Essential (Annex I) or Important (Annex II)' },
    medium: { employees: '50-249', turnover: '>€10M', balance: '>€10M', classification: 'Important' },
    small: { employees: '<50', turnover: '≤€10M', balance: '≤€10M', classification: 'Generally excluded*' }
}

interface SectorCardProps {
    sector: typeof ANNEX_I_SECTORS[0]
    index: number
}

function SectorCard({ sector, index }: SectorCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const Icon = sector.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div
                className={`
                    bg-white/[0.02] border rounded-xl overflow-hidden cursor-pointer
                    transition-all duration-300 hover:bg-white/[0.04]
                    ${isExpanded ? 'border-white/20' : 'border-white/5'}
                `}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Header */}
                <div className="p-4 flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${sector.color}20` }}
                    >
                        <Icon size={20} style={{ color: sector.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm">{sector.name}</h4>
                        <p className="text-gray-500 text-xs truncate">
                            {sector.subsectors.slice(0, 3).join(', ')}{sector.subsectors.length > 3 ? '...' : ''}
                        </p>
                    </div>
                    <div
                        className={`
                            px-2 py-1 rounded text-[10px] font-mono uppercase
                            ${sector.classification === 'essential'
                                ? 'bg-oxot-gold/20 text-oxot-gold'
                                : 'bg-oxot-blue/20 text-oxot-blue'}
                        `}
                    >
                        {sector.classification}
                    </div>
                    <div className="text-gray-500">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                                {/* Subsectors */}
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Subsectors</div>
                                    <div className="flex flex-wrap gap-1">
                                        {sector.subsectors.map((sub, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400"
                                            >
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Entity Types */}
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Entity Types</div>
                                    <div className="space-y-1">
                                        {sector.entities.slice(0, 4).map((entity, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                                                <CheckCircle size={10} style={{ color: sector.color }} />
                                                {entity}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div
                                    className="flex items-start gap-2 p-2 rounded"
                                    style={{ backgroundColor: `${sector.color}10` }}
                                >
                                    <AlertTriangle size={12} style={{ color: sector.color }} className="mt-0.5 flex-shrink-0" />
                                    <span className="text-xs" style={{ color: sector.color }}>
                                        {sector.notes}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default function NIS2SectorMatrix() {
    const [activeTab, setActiveTab] = useState<'all' | 'essential' | 'important'>('all')

    return (
        <div className="space-y-8">
            {/* Size Thresholds */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Users size={16} className="text-cyan-400" />
                    <h3 className="text-white font-semibold">Entity Size Thresholds</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(SIZE_THRESHOLDS).map(([key, value]) => (
                        <div
                            key={key}
                            className={`
                                p-4 rounded-lg border
                                ${key === 'large' ? 'bg-oxot-gold/10 border-oxot-gold/30' :
                                    key === 'medium' ? 'bg-oxot-blue/10 border-oxot-blue/30' :
                                        'bg-gray-500/10 border-gray-500/30'}
                            `}
                        >
                            <div className={`
                                text-sm font-bold uppercase mb-2
                                ${key === 'large' ? 'text-oxot-gold' :
                                    key === 'medium' ? 'text-oxot-blue' : 'text-gray-400'}
                            `}>
                                {key} Enterprise
                            </div>
                            <div className="space-y-1 text-xs text-gray-400">
                                <div>Employees: <span className="text-white">{value.employees}</span></div>
                                <div>Annual Turnover: <span className="text-white">{value.turnover}</span></div>
                                <div>Balance Sheet: <span className="text-white">{value.balance}</span></div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/10 text-xs">
                                <span className={key === 'large' ? 'text-oxot-gold' : key === 'medium' ? 'text-oxot-blue' : 'text-gray-500'}>
                                    {value.classification}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                    *Small and micro entities are excluded unless specifically designated by national authorities or operating in specific digital/telecom categories.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {[
                    { id: 'all', label: 'All Sectors', count: ANNEX_I_SECTORS.length + ANNEX_II_SECTORS.length },
                    { id: 'essential', label: 'Essential (Annex I)', count: ANNEX_I_SECTORS.length },
                    { id: 'important', label: 'Important (Annex II)', count: ANNEX_II_SECTORS.length }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-all
                            ${activeTab === tab.id
                                ? 'bg-white/10 text-white border border-white/20'
                                : 'bg-white/[0.02] text-gray-500 border border-white/5 hover:bg-white/[0.05]'}
                        `}
                    >
                        {tab.label} <span className="text-xs opacity-60">({tab.count})</span>
                    </button>
                ))}
            </div>

            {/* Sector Columns */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Annex I - High Criticality */}
                {(activeTab === 'all' || activeTab === 'essential') && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <div className="w-3 h-3 rounded bg-oxot-gold" />
                            <h3 className="text-white font-bold uppercase text-sm tracking-wider">
                                Annex I — High Criticality
                            </h3>
                            <span className="text-xs text-gray-400">({ANNEX_I_SECTORS.length} sectors)</span>
                        </div>
                        <div className="space-y-3">
                            {ANNEX_I_SECTORS.map((sector, index) => (
                                <SectorCard key={sector.name} sector={sector} index={index} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Annex II - Other Critical */}
                {(activeTab === 'all' || activeTab === 'important') && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                            <div className="w-3 h-3 rounded bg-oxot-blue" />
                            <h3 className="text-white font-bold uppercase text-sm tracking-wider">
                                Annex II — Other Critical
                            </h3>
                            <span className="text-xs text-gray-400">({ANNEX_II_SECTORS.length} sectors)</span>
                        </div>
                        <div className="space-y-3">
                            {ANNEX_II_SECTORS.map((sector, index) => (
                                <SectorCard key={sector.name} sector={sector} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Total Coverage Stats */}
            <div className="grid md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl">
                <div className="text-center">
                    <div className="text-3xl font-black text-white">18</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Total Sectors</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-black text-oxot-gold">11</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">High Criticality</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-black text-oxot-blue">7</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Other Critical</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-black text-white">160K+</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Entities in Scope</div>
                </div>
            </div>
        </div>
    )
}
