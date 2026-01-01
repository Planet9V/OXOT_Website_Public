'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield, CheckCircle2, Circle, AlertTriangle, Lock,
    Layers, Network, Users, FileText, ChevronDown, ChevronRight,
    Building, MapPin, Target
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// IEC 62443 DATA
// =============================================================================

const IEC62443_DATA = {
    shanghai: {
        facility: 'Shanghai Customer Solutions Center (CSC)',
        type: 'Pilot Lines, Labs, Test Rigs, Building Automation',
        targetSL: 'SL-2 (Labs), SL-3 (Safety-Critical Demo Lines)',
        status: 'FEED Phase',
        completion: 35
    },
    checklist: [
        {
            section: 'Scope & Objectives',
            items: [
                { id: 'SO-1', text: 'Define IACS in scope for the CSC', status: 'complete', note: 'Pilot lines, labs, test rigs, building automation' },
                { id: 'SO-2', text: 'Add cybersecurity posture as FEED KPI', status: 'in-progress', note: 'Alongside throughput, OEE, safety, energy' },
                { id: 'SO-3', text: 'Decide target Security Levels (SL)', status: 'complete', note: 'SL-2 for labs, SL-3 for safety-critical' },
            ]
        },
        {
            section: 'Risk Assessment & CSRS',
            items: [
                { id: 'RA-1', text: 'Perform high-level cyber risk assessment', status: 'in-progress', note: 'IEC 62443-3-2 approach' },
                { id: 'RA-2', text: 'Define System under Consideration (SuC)', status: 'pending', note: 'Document external interfaces' },
                { id: 'RA-3', text: 'Create Cyber Security Requirements Specification', status: 'pending', note: 'Before major procurement' },
            ]
        },
        {
            section: 'Zones, Conduits & Architecture',
            items: [
                { id: 'ZC-1', text: 'Produce zones and conduits diagram', status: 'pending', note: 'Labs, OT network, DMZ, corporate IT, vendor access' },
                { id: 'ZC-2', text: 'Assign Security Level Targets to each zone', status: 'pending', note: 'Per IEC 62443-3-3' },
                { id: 'ZC-3', text: 'Specify network segmentation requirements', status: 'pending', note: 'OT/IT separation, DMZ, jump hosts' },
            ]
        },
        {
            section: 'Technical Requirements',
            items: [
                { id: 'TR-1', text: 'Identity & access: unique accounts, RBAC, MFA', status: 'pending', note: 'For all OT systems' },
                { id: 'TR-2', text: 'System integrity: hardening baselines for PLCs', status: 'pending', note: 'Patch and config management' },
                { id: 'TR-3', text: 'Data confidentiality: encryption for IT/OT and cloud', status: 'pending', note: 'Logging for critical parameters' },
                { id: 'TR-4', text: 'OT monitoring/logging with SIEM export', status: 'pending', note: 'Syslog, NetFlow, ICS sensors' },
            ]
        },
        {
            section: 'Supplier & Package Requirements',
            items: [
                { id: 'SP-1', text: 'State IEC 62443 compliance in RFQs', status: 'pending', note: 'Parts 4-1 (dev), 4-2 (components)' },
                { id: 'SP-2', text: 'Require vendor SDL evidence', status: 'pending', note: 'Patch policy, vulnerability disclosure' },
                { id: 'SP-3', text: 'Require hardening guides from vendors', status: 'pending', note: 'Firewall rules, default credential removal' },
            ]
        },
        {
            section: 'Testing & Commissioning',
            items: [
                { id: 'TC-1', text: 'Embed cybersecurity test cases in FAT/SAT', status: 'pending', note: 'Account mgmt, logging, segmentation' },
                { id: 'TC-2', text: 'Define acceptance criteria', status: 'pending', note: 'No defaults, no flat networks, logging enabled' },
                { id: 'TC-3', text: 'Cybersecurity punch-list in commissioning', status: 'pending', note: 'Ports, firewall rules, remote access' },
            ]
        },
    ],
    zones: [
        { name: 'Enterprise Zone (IT)', sl: 'SL-1', color: '#3b82f6', description: 'Corporate network, SAP, email' },
        { name: 'DMZ', sl: 'SL-2', color: '#eab308', description: 'Historians, Braincube, integration' },
        { name: 'Manufacturing Zone (OT)', sl: 'SL-2', color: '#22c55e', description: 'PLCs, SCADA, HMIs' },
        { name: 'Safety Zone', sl: 'SL-3', color: '#ef4444', description: 'SIS, Safety PLCs, interlocks' },
    ]
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function ChecklistSection({ section, items }: { section: string; items: typeof IEC62443_DATA.checklist[0]['items'] }) {
    const [expanded, setExpanded] = useState(true);
    const completedCount = items.filter(i => i.status === 'complete').length;
    const inProgressCount = items.filter(i => i.status === 'in-progress').length;

    return (
        <div className="glass-panel rounded-xl overflow-hidden mb-4">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <FileText className="text-oxot-gold" size={18} />
                    <span className="text-white font-medium">{section}</span>
                </div>
                <div className="flex items-center gap-3">
                    {completedCount > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">{completedCount} done</span>
                    )}
                    {inProgressCount > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">{inProgressCount} active</span>
                    )}
                    <ChevronDown className={`text-grey transition-transform ${expanded ? 'rotate-180' : ''}`} size={16} />
                </div>
            </button>
            {expanded && (
                <div className="border-t border-white/10 p-4 space-y-2">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-3 bg-black/30 rounded-lg">
                            {item.status === 'complete' ? (
                                <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                            ) : item.status === 'in-progress' ? (
                                <Circle className="text-yellow-400 mt-0.5 flex-shrink-0" size={18} />
                            ) : (
                                <Circle className="text-grey mt-0.5 flex-shrink-0" size={18} />
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <code className="text-oxot-blue text-xs">{item.id}</code>
                                    <span className="text-white text-sm">{item.text}</span>
                                </div>
                                <div className="text-grey text-xs mt-1">{item.note}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ZoneDiagram() {
    return (
        <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
                <Layers className="text-oxot-gold" size={20} />
                <h3 className="text-white font-semibold">Zones & Conduits Reference</h3>
            </div>
            <div className="space-y-3">
                {IEC62443_DATA.zones.map((zone, i) => (
                    <div key={zone.name} className="flex items-center gap-4">
                        <div className="w-24 flex items-center gap-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: zone.color }} />
                            <span className="text-xs text-white font-mono">{zone.sl}</span>
                        </div>
                        <div className="flex-1 p-3 rounded-lg" style={{ backgroundColor: `${zone.color}20`, borderLeft: `3px solid ${zone.color}` }}>
                            <div className="text-white text-sm font-medium">{zone.name}</div>
                            <div className="text-grey text-xs">{zone.description}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 text-grey text-xs">
                    <Network size={14} />
                    <span>Conduits (firewalls, DMZ) required between each zone per IEC 62443-3-3</span>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function IEC62443Compliance() {
    const totalItems = IEC62443_DATA.checklist.reduce((acc, s) => acc + s.items.length, 0);
    const completedItems = IEC62443_DATA.checklist.reduce((acc, s) =>
        acc + s.items.filter(i => i.status === 'complete').length, 0);
    const inProgressItems = IEC62443_DATA.checklist.reduce((acc, s) =>
        acc + s.items.filter(i => i.status === 'in-progress').length, 0);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <ScrollReveal>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">IEC 62443 COMPLIANCE</span>
                    </div>
                    <PageHeader
                        title="Shanghai CSC FEED Checklist"
                        subtitle="IEC 62443 requirements for the Shanghai Customer Solutions Center - Industrial Cybersecurity Framework"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Facility Info */}
            <ScrollReveal>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="glass-panel p-5 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Building className="text-oxot-gold" size={20} />
                            <h3 className="text-white font-semibold">Facility Details</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-grey">Facility:</span>
                                <span className="text-white">{IEC62443_DATA.shanghai.facility}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-grey">Scope:</span>
                                <span className="text-white text-right text-xs">{IEC62443_DATA.shanghai.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-grey">Target SL:</span>
                                <span className="text-oxot-gold font-mono text-xs">{IEC62443_DATA.shanghai.targetSL}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-grey">Status:</span>
                                <span className="text-yellow-400">{IEC62443_DATA.shanghai.status}</span>
                            </div>
                        </div>
                    </div>
                    <div className="glass-panel p-5 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                            <Target className="text-oxot-gold" size={20} />
                            <h3 className="text-white font-semibold">Progress</h3>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-grey">Overall Completion</span>
                                    <span className="text-white">{Math.round((completedItems / totalItems) * 100)}%</span>
                                </div>
                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-oxot-gold rounded-full" style={{ width: `${(completedItems / totalItems) * 100}%` }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="p-2 bg-green-500/10 rounded">
                                    <div className="text-green-400 font-bold">{completedItems}</div>
                                    <div className="text-[10px] text-grey">Complete</div>
                                </div>
                                <div className="p-2 bg-yellow-500/10 rounded">
                                    <div className="text-yellow-400 font-bold">{inProgressItems}</div>
                                    <div className="text-[10px] text-grey">In Progress</div>
                                </div>
                                <div className="p-2 bg-grey/10 rounded">
                                    <div className="text-grey font-bold">{totalItems - completedItems - inProgressItems}</div>
                                    <div className="text-[10px] text-grey">Pending</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Zone Diagram */}
            <ScrollReveal>
                <div className="mb-8">
                    <ZoneDiagram />
                </div>
            </ScrollReveal>

            {/* Checklist Sections */}
            <ScrollReveal>
                <div className="mb-8">
                    <h3 className="text-sm font-mono text-oxot-gold mb-4">FEED CHECKLIST</h3>
                    {IEC62443_DATA.checklist.map((section) => (
                        <ChecklistSection key={section.section} section={section.section} items={section.items} />
                    ))}
                </div>
            </ScrollReveal>

            {/* Reference */}
            <ScrollReveal>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 text-grey text-sm">
                        <Lock size={16} />
                        <span>
                            Reference: IEC 62443-3-2 (Risk Assessment), IEC 62443-3-3 (Security Technologies),
                            IEC 62443-4-1 (Secure Development), IEC 62443-4-2 (Component Requirements)
                        </span>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
