'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Milk, Thermometer, Droplets, Zap, Shield, Settings,
    AlertTriangle, ChevronDown, MapPin, Cpu, Network,
    Lock, Clock, Activity, BarChart3
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// DAIRY DATA
// =============================================================================

const DAIRY_DATA = {
    facilities: [
        { name: 'Tokoroa Dairy Plant', location: 'New Zealand', type: 'Powder Production', status: 'Operational (Phase 1)', opened: 'Late 2023' },
        { name: 'Johor Facility', location: 'Malaysia', type: 'Beverage Solutions', status: 'Operational', opened: 'Unknown' },
    ],
    equipment: {
        milking: { vendor: 'DeLaval / GEA', systems: ['Rotary E300', 'DairyRotor T8900', 'FastBail/FastExit'] },
        cooling: { vendor: 'OEM', systems: ['3:1 PHE ratio', 'Ice banks', 'Glycol snap-chilling'] },
        processing: { vendor: 'Alfa Laval / GEA', systems: ['MVR Evaporator', 'Nozzle Spray Dryer', 'Hermetic Separators'] },
        filling: { vendor: 'GEA / Tetra Pak', systems: ['Li Filler (Limited Intervention)', 'FIBC Bulk Bag', 'MAP Gassing'] },
        automation: { vendor: 'Rockwell / Siemens', systems: ['PlantPAx DCS', 'EtherNet/IP', 'IO-Link sensors', 'AS-i valve control'] },
    },
    regulations: [
        { region: 'New Zealand', framework: 'NZCP1 / MPI RMP', requirements: ['10°C in 4 hrs', '6°C in 6 hrs', 'HTST 72°C/15s'] },
        { region: 'Australia', framework: 'FSANZ 4.2.4 / DFSV', requirements: ['5°C in 3.5 hrs', 'Tanker CIP', 'Full traceability'] },
        { region: 'EU', framework: 'FSSC 22000 / NIS2', requirements: ['Cyber incident reporting', 'Supply chain security'] },
    ],
    criticalProcesses: [
        { process: 'HTST Pasteurization', params: '72°C for 15 seconds', risk: 'CRITICAL', impact: 'Pathogen survival if compromised' },
        { process: 'Spray Drying', params: 'Inlet 180-220°C, Outlet 80-90°C', risk: 'HIGH', impact: 'Powder quality, Cronobacter risk' },
        { process: 'Evaporation (MVR)', params: '45-52% solids concentration', risk: 'HIGH', impact: 'Product consistency' },
        { process: 'Rapid Cooling Curve', params: '10°C/4hrs, 6°C/6hrs', risk: 'CRITICAL', impact: 'Bacterial proliferation' },
        { process: 'MAP Packaging', params: '<2% residual O2', risk: 'MEDIUM', impact: 'Shelf life (rancidity)' },
    ],
    cyberRisks: [
        { risk: 'Pasteurization PLCs', severity: 'CRITICAL', attack: 'Temperature setpoint manipulation', impact: 'Pathogen survival, mass recall' },
        { risk: 'Cooling System', severity: 'CRITICAL', attack: 'Disable ice bank or PHE', impact: 'Regulatory non-compliance, spoilage' },
        { risk: 'Evaporator Controls', severity: 'HIGH', attack: 'Concentration parameter manipulation', impact: 'Off-spec powder, customer rejection' },
        { risk: 'Powder Silo Explosion', severity: 'HIGH', attack: 'Disable suppression or sensors', impact: 'Physical damage, safety incident' },
        { risk: 'CIP Systems', severity: 'MEDIUM', attack: 'Skip or shorten cleaning cycles', impact: 'Cross-contamination, Listeria' },
        { risk: 'Traceability Systems', severity: 'MEDIUM', attack: 'Data manipulation', impact: 'Recall scope uncertainty, regulatory fines' },
    ],
    zones: [
        { name: 'Black Zone', color: '#1f2937', description: 'Utilities, boilers, wastewater treatment' },
        { name: 'Gray Zone', color: '#6b7280', description: 'Raw milk reception, silos' },
        { name: 'White Zone (High Care)', color: '#e5e7eb', description: 'Pasteurization, evaporation, packing' },
        { name: 'Red Line (Sterile)', color: '#ef4444', description: 'Absolute barrier, HEPA air, no water' },
    ]
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function EquipmentCard({ category, data }: { category: string; data: { vendor: string; systems: string[] } }) {
    return (
        <div className="p-4 bg-black/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{category}</span>
                <span className="text-oxot-blue text-xs">{data.vendor}</span>
            </div>
            <div className="flex flex-wrap gap-1">
                {data.systems.map((sys, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-white/5 text-grey rounded">{sys}</span>
                ))}
            </div>
        </div>
    );
}

function CriticalProcessCard({ process }: { process: typeof DAIRY_DATA.criticalProcesses[0] }) {
    return (
        <div className={`p-4 rounded-lg border-l-4 ${process.risk === 'CRITICAL' ? 'bg-red-500/10 border-l-red-500' :
                process.risk === 'HIGH' ? 'bg-orange-500/10 border-l-orange-500' :
                    'bg-yellow-500/10 border-l-yellow-500'
            }`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{process.process}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${process.risk === 'CRITICAL' ? 'text-red-400 bg-red-500/20' :
                        process.risk === 'HIGH' ? 'text-orange-400 bg-orange-500/20' :
                            'text-yellow-400 bg-yellow-500/20'
                    }`}>{process.risk}</span>
            </div>
            <div className="text-oxot-gold text-xs font-mono mb-1">{process.params}</div>
            <div className="text-grey text-xs">{process.impact}</div>
        </div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function DairyAnalysis() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <ScrollReveal>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Milk className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">DAIRY PLATFORM ANALYSIS</span>
                    </div>
                    <PageHeader
                        title="Dairy Operations Deep Dive"
                        subtitle="OFI dairy processing facilities - NZ/AU architecture, critical processes, and ICS cybersecurity assessment"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Facilities */}
            <ScrollReveal>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {DAIRY_DATA.facilities.map((facility, i) => (
                        <div key={i} className="glass-panel p-5 rounded-xl">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="text-white font-semibold">{facility.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-grey">
                                        <MapPin size={12} />
                                        {facility.location}
                                    </div>
                                </div>
                                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">{facility.status}</span>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <div><span className="text-grey">Type:</span> <span className="text-white">{facility.type}</span></div>
                                <div><span className="text-grey">Opened:</span> <span className="text-oxot-blue">{facility.opened}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

            {/* Equipment Stack */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Settings size={20} className="text-oxot-gold" />
                        Equipment & Automation Stack
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(DAIRY_DATA.equipment).map(([cat, data]) => (
                            <EquipmentCard key={cat} category={cat.charAt(0).toUpperCase() + cat.slice(1)} data={data} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Hygienic Zones */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-oxot-gold" />
                        Hygienic Zoning Architecture
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                        {DAIRY_DATA.zones.map((zone, i) => (
                            <div
                                key={i}
                                className="p-4 rounded-lg text-center"
                                style={{ backgroundColor: `${zone.color}30`, borderTop: `3px solid ${zone.color}` }}
                            >
                                <div className="text-white text-sm font-medium mb-1">{zone.name}</div>
                                <div className="text-grey text-[10px]">{zone.description}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-red-400 text-xs">
                            <strong>Red Line Protocol:</strong> Bench-over barrier, positive pressure HEPA (H13), no sinks, vacuum cleaning only.
                            Crossing requires full footwear/clothing change through airlock.
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Critical Processes */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Thermometer size={20} className="text-oxot-gold" />
                        Safety-Critical Processes
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {DAIRY_DATA.criticalProcesses.map((process, i) => (
                            <CriticalProcessCard key={i} process={process} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Cyber Risks */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8 border-l-4 border-l-red-500">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-400" />
                        ICS/OT Cyber Risks
                    </h3>
                    <div className="space-y-3">
                        {DAIRY_DATA.cyberRisks.map((risk, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white text-sm">{risk.risk}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded ${risk.severity === 'CRITICAL' ? 'text-red-400 bg-red-500/20' :
                                                risk.severity === 'HIGH' ? 'text-orange-400 bg-orange-500/20' :
                                                    'text-yellow-400 bg-yellow-500/20'
                                            }`}>{risk.severity}</span>
                                    </div>
                                    <div className="text-grey text-xs">{risk.attack} → {risk.impact}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Regulations */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Lock size={20} className="text-oxot-gold" />
                        Regulatory Framework
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {DAIRY_DATA.regulations.map((reg, i) => (
                            <div key={i} className="p-4 bg-black/30 rounded-lg">
                                <div className="text-oxot-gold font-medium text-sm mb-1">{reg.region}</div>
                                <div className="text-white text-xs mb-2">{reg.framework}</div>
                                <ul className="space-y-1">
                                    {reg.requirements.map((req, j) => (
                                        <li key={j} className="text-grey text-[10px] flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-grey" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
