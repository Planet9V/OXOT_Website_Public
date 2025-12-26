'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, CheckCircle2, AlertTriangle, Server, Zap, Cpu
} from 'lucide-react';

// Simplified sector data structure for tabbed interface
const SECTORS = [
    {
        id: 'dc',
        name: 'Data Centers',
        icon: Server,
        questions: [
            {
                q: 'What is our SOC 2 Type II compliance posture?',
                finding: 'Non-compliant with 14 of 64 TSC criteria',
                evidence: 'No MFA (CC6.1), SIEM 34% coverage (CC7.2), No CAB (CC8.1)',
                cost: '$2.8M + $420K annual',
                timeline: '120 days to compliance'
            },
            {
                q: 'Are we exposed to ransomware?',
                finding: 'Multiple critical gaps: flat network, 92-hour RTO',
                evidence: 'No segmentation, tape backups only, no immutable copies',
                cost: '$6.0M ($4.2M network + $1.8M backup)',
                timeline: '180 days full remediation'
            },
            {
                q: 'What customer data was breached?',
                finding: '14-month breach, 820K records compromised',
                evidence: 'CVE-2019-0708 exploited, multi-jurisdictional exposure (GDPR + CCPA)',
                cost: '$14.2M (notification + settlement + legal)',
                timeline: 'GDPR: 72 hours, settlements: 18-24 months'
            }
        ]
    },
    {
        id: 'energy',
        name: 'Energy/Grid',
        icon: Zap,
        questions: [
            {
                q: 'What is our NERC CIP compliance status?',
                finding: '$18M penalty exposure across CIP-005, CIP-007, CIP-010',
                evidence: 'Perimeter violations (18 access points), patch SLA misses (68 days avg vs 30), no change mgmt',
                cost: '$18M compliance + $8M remediation',
                timeline: '18 months to CIP-013 full compliance'
            },
            {
                q: 'Are we exposed to nation-state threats?',
                finding: 'Volt Typhoon IOCs detected, Chinese RTUs in 4 substations',
                evidence: 'Living-off-the-land TTPs, 220-day dwell time, FBI/CISA investigation',
                cost: '$21.2M (equipment replacement + IR + OT security)',
                timeline: 'Emergency IR: immediate, equipment swap: 12 months'
            },
            {
                q: 'What is our grid stability cyber risk?',
                finding: 'SCADA compromise could cascade blackout 2M customers',
                evidence: 'No ICS segmentation, shared IT/OT credentials, EOL GE D20 RTUs',
                cost: '$14.8M (SCADA upgrade + network segmentation)',
                timeline: '24 months full OT modernization'
            }
        ]
    },
    {
        id: 'semi',
        name: 'Semiconductors',
        icon: Cpu,
        questions: [
            {
                q: 'Is our IP adequately protected from theft?',
                finding: 'No DLP, 340+ BYOD devices, China R&D center has full access',
                evidence: '14nm process design docs on SharePoint, no classification labels, VPN logs show anomalous data egress',
                cost: '$9.2M (DLP + CASB + forensics + policy)',
                timeline: '90 days emergency lockdown, 180 days full deployment'
            },
            {
                q: 'Are we EAR/ITAR compliant?',
                finding: 'Probable violations: 90% of IP not classified, no export controls',
                evidence: 'Foreign nationals accessing controlled tech, no deemed export process, BIS audit risk',
                cost: '$11.6M (legal counsel + penalties + classification platform)',
                timeline: 'Immediate disclosure to BIS, 12-18 month remediation'
            },
            {
                q: 'What is our fab downtime cyber risk?',
                finding: '$280K/hour fab downtime, no OT IR plan',
                evidence: 'Windows XP on litho tools, flat fab network, ASML Twins can PLC vulnerability',
                cost: '$8.4M (OT segmentation + tool hardening + IR capability)',
                timeline: '6-9 months (fab downtime windows required)'
            }
        ]
    }
];

export default function GovernanceGates() {
    const [activeSector, setActiveSector] = useState('dc');

    const sector = SECTORS.find(s => s.id === activeSector) || SECTORS[0];
    const SectorIcon = sector.icon;

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        <span className="text-white">Board-Level </span>
                        <span className="text-oxot-blue">Questions</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-3xl">
                        Real questions Audit Committees and Boards ask during M&A due diligence - with detailed technical answers showing actual findings, costs, and timelines
                    </p>
                </motion.div>

                {/* Sector Tabs */}
                <div className="flex gap-2 mb-8 border-b border-white/10">
                    {SECTORS.map((s) => {
                        const Icon = s.icon;
                        const isActive = s.id === activeSector;

                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveSector(s.id)}
                                className={`flex items-center gap-2 px-6 py-3 transition-all relative ${isActive
                                    ? 'text-white'
                                    : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-medium">{s.name}</span>

                                {isActive && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-oxot-blue"
                                        layoutId="activeTab"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Questions Panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSector}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="space-y-4">
                            {sector.questions.map((question, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 bg-gradient-to-br from-white/5 to-transparent rounded-lg border border-white/10"
                                >
                                    {/* Question */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-2 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                                            <Shield className="text-oxot-blue" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-bold text-lg mb-1">{question.q}</h3>
                                        </div>
                                    </div>

                                    {/* Answer Grid */}
                                    <div className="grid md:grid-cols-2 gap-4 pl-12">
                                        {/* Finding */}
                                        <div>
                                            <div className="text-xs uppercase font-medium text-gray-500 mb-2">Finding</div>
                                            <div className="text-sm text-white mb-3">{question.finding}</div>

                                            <div className="text-xs uppercase font-medium text-gray-500 mb-2">Evidence</div>
                                            <div className="text-sm text-gray-400 leading-relaxed">{question.evidence}</div>
                                        </div>

                                        {/* Cost & Timeline */}
                                        <div className="space-y-4">
                                            <div className="p-4 bg-black/20 rounded border border-white/5">
                                                <div className="text-xs uppercase font-medium text-gray-500 mb-1">Total Cost</div>
                                                <div className="text-xl font-bold text-white">{question.cost}</div>
                                            </div>

                                            <div className="p-4 bg-black/20 rounded border border-white/5">
                                                <div className="text-xs uppercase font-medium text-gray-500 mb-1">Timeline</div>
                                                <div className="text-sm text-gray-300">{question.timeline}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
