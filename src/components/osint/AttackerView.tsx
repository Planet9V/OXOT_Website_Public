'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Skull, Shield, AlertTriangle, Lock, Globe,
    Smartphone, Database, Server, Eye, Fingerprint,
    Network, Zap, Crosshair, UserX, Bug, ChevronLeft
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// ATTACKER PROFILE DATA
// =============================================================================

const ATTACK_VECTORS = {
    customApps: [
        {
            id: 'olam-direct',
            name: 'Olam Direct',
            users: '2.8M Farmers',
            risk: 'CRITICAL',
            vector: 'IDOR / API Enumeration',
            desc: 'Mobile platform for farm-gate sales. High probability of insecure API endpoints allowing pricing manipulation or user data scrapping.',
            icon: Smartphone
        },
        {
            id: 'atsource',
            name: 'AtSource',
            users: '300+ Enterprise Clients',
            risk: 'HIGH',
            vector: 'Tenant Isolation Failure',
            desc: 'Sustainability tracking platform. Potential for accessing competitor data (e.g., Nestlé vs. Mars) via broken access controls.',
            icon: Database
        },
        {
            id: 'jiva',
            name: 'Jiva AgAdvisory',
            users: 'Smallholder Farmers',
            risk: 'HIGH',
            vector: 'AI Model Poisoning',
            desc: 'AI-driven crop advice. Susceptible to adversarial data injection causing widespread crop yield failures.',
            icon: Zap
        }
    ],
    infrastructure: [
        {
            id: 'network',
            title: 'Network Perimeter',
            status: 'HARDENED',
            details: 'ISP: Tata (AS6453). No trivial broad-scans found. IPs: 180.87.142.0/24.',
            icon: Shield
        },
        {
            id: 'legacy',
            title: 'Acquisition Rot',
            status: 'VULNERABLE',
            details: 'Olde Thompson & BT Cocoa likely running legacy portals/VPNs separate from main OFI authentication.',
            icon: Server
        },
        {
            id: 'ot',
            title: 'OT/ICS Layer',
            status: 'MIXED',
            details: 'Greenfield (Tokoroa/Rockwell) vs. Brownfield (Zaan/Siemens S7-300). Inconsistent patching cycles.',
            icon: Network
        }
    ]
};

const RED_TEAM_SCENARIOS = [
    {
        id: 'harvest-rot',
        title: 'Project Harvest Rot',
        target: 'Jiva / Olam Direct',
        method: 'API Poisoning',
        impact: 'Disrupt supply chain pricing & crop yields',
        difficulty: 'Medium'
    },
    {
        id: 'golden-ticket',
        title: 'Golden Ticket',
        target: 'Mindsprint Devs',
        method: 'Spearphishing / GitHub Leak',
        impact: 'Root access to AtSource Platform',
        difficulty: 'High'
    },
    {
        id: 'logistics-jam',
        title: 'Logistics Jam',
        target: 'Olam Direct',
        method: 'DDoS / Logic Bomb',
        impact: 'Halt cocoa movement during peak harvest',
        difficulty: 'Low'
    }
];

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function VectorCard({ item }: { item: typeof ATTACK_VECTORS.customApps[0] }) {
    const Icon = item.icon;
    const riskColors = {
        CRITICAL: 'text-red-400 bg-red-500/10 border-red-500/30',
        HIGH: 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    };

    return (
        <div className="glass-panel p-4 rounded-xl border-l-[3px] border-l-red-500">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg">
                        <Icon size={20} className="text-oxot-gold" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <div className="text-xs text-grey">{item.users}</div>
                    </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${riskColors[item.risk as keyof typeof riskColors]}`}>
                    {item.risk}
                </span>
            </div>
            <div className="mb-2">
                <span className="text-xs text-red-300 font-mono bg-red-900/20 px-1.5 py-0.5 rounded">
                    VECTOR: {item.vector}
                </span>
            </div>
            <p className="text-sm text-grey leading-relaxed">
                {item.desc}
            </p>
        </div>
    );
}

function InfraRow({ item }: { item: typeof ATTACK_VECTORS.infrastructure[0] }) {
    const Icon = item.icon;
    const statusColor = item.status === 'HARDENED' ? 'text-green-400' :
        item.status === 'VULNERABLE' ? 'text-red-400' : 'text-yellow-400';

    return (
        <div className="flex items-center gap-4 p-4 bg-black/40 rounded-lg border border-white/5">
            <Icon size={20} className="text-grey" />
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{item.title}</span>
                    <span className={`text-xs font-mono ${statusColor}`}>{item.status}</span>
                </div>
                <div className="text-sm text-grey">{item.details}</div>
            </div>
        </div>
    );
}

function ScenarioCard({ scenario }: { scenario: typeof RED_TEAM_SCENARIOS[0] }) {
    return (
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/20 to-black border border-red-500/20 hover:border-red-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Skull size={64} />
            </div>
            <div className="p-5 relative z-10">
                <div className="text-xs text-red-400 font-mono mb-2">SCENARIO: {scenario.id.toUpperCase()}</div>
                <h3 className="text-xl font-bold text-white mb-2">{scenario.title}</h3>
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-grey">Target</span>
                        <span className="text-white">{scenario.target}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-grey">Method</span>
                        <span className="text-white">{scenario.method}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-grey">Difficulty</span>
                        <span className={`
                            ${scenario.difficulty === 'Low' ? 'text-green-400' :
                                scenario.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}
                        `}>{scenario.difficulty}</span>
                    </div>
                </div>
                <div className="p-3 bg-red-500/10 rounded-lg text-xs text-red-200 border border-red-500/20">
                    <span className="font-semibold">IMPACT:</span> {scenario.impact}
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function AttackerView() {
    return (
        <div className="min-h-screen space-y-12">
            {/* Header */}
            <ScrollReveal>
                <Link href="/corporate/osint-report" className="inline-flex items-center gap-2 text-grey hover:text-white text-sm mb-6 transition-colors">
                    <ChevronLeft size={16} />
                    Back to OSINT Report
                </Link>
                <div className="border-l-4 border-l-red-600 pl-6 py-2">
                    <div className="flex items-center gap-3 mb-2">
                        <Skull className="text-red-500" size={32} />
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            RED TEAM DOSSIER
                        </h1>
                    </div>
                    <p className="text-lg text-grey max-w-2xl">
                        Adversarial analysis of OFI's digital footprint.
                        Focus: <span className="text-red-400">Custom App Ecosystem</span> & <span className="text-red-400">Supply Chain Risks</span>.
                    </p>
                </div>
            </ScrollReveal>

            {/* Strategic Overview */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Eye className="text-red-400" size={24} />
                        Surveillance Summary
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-grey mb-4 leading-relaxed">
                                OFI exhibits a <span className="text-white font-semibold">"Hard Shell, Soft Underbelly"</span> posture.
                                While corporate IT (Olam Group) maintains strong OPSEC with minimal public leaks,
                                the sprawling AgriTech ecosystem (AtSource, Jiva, Olam Direct) represents a massive,
                                distributed attack surface used by millions of unmanaged external users.
                            </p>
                            <div className="flex gap-4">
                                <div className="text-center p-3 bg-black/30 rounded-lg flex-1">
                                    <div className="text-2xl font-bold text-green-400">Low</div>
                                    <div className="text-[10px] text-grey uppercase tracking-wider">Corp Breach Risk</div>
                                </div>
                                <div className="text-center p-3 bg-black/30 rounded-lg flex-1">
                                    <div className="text-2xl font-bold text-red-500">Critical</div>
                                    <div className="text-[10px] text-grey uppercase tracking-wider">App Supply Chain</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {ATTACK_VECTORS.infrastructure.map((infra) => (
                                <InfraRow key={infra.id} item={infra} />
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* The Soft Underbelly: Custom Apps */}
            <ScrollReveal>
                <div>
                    <h2 className="heading-3 text-white mb-6 flex items-center gap-2">
                        <Bug className="text-orange-400" />
                        Priority Targets: The "Soft Underbelly"
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {ATTACK_VECTORS.customApps.map((app) => (
                            <VectorCard key={app.id} item={app} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Red Team Scenarios */}
            <ScrollReveal>
                <div>
                    <h2 className="heading-3 text-white mb-6 flex items-center gap-2">
                        <Fingerprint className="text-red-400" />
                        Active Attack Paths
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {RED_TEAM_SCENARIOS.map((scenario) => (
                            <ScenarioCard key={scenario.id} scenario={scenario} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Footer Warning */}
            <div className="p-4 rounded-lg bg-red-900/10 border border-red-500/20 text-center">
                <p className="text-red-300 text-sm font-mono">
                    // END OF REPORT // OXOT-CONFIDENTIAL // DO NOT DISTRIBUTE
                </p>
            </div>
        </div>
    );
}
