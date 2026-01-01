'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Target, Shield, AlertTriangle, ChevronDown, ChevronRight,
    Zap, Lock, Eye, Settings, Database, Network, Server,
    Smartphone, Monitor, Globe
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// MITRE ATT&CK DATA
// =============================================================================

const ICS_TACTICS = [
    {
        id: 'initial-access', name: 'Initial Access', color: '#ef4444', techniques: [
            { id: 'T0886', name: 'Remote Services', relevance: 'HIGH', assets: 'AWS/Azure, VPN gateways' },
            { id: 'T0817', name: 'Drive-by Compromise', relevance: 'MEDIUM', assets: 'Supplier portals, Olam Direct' },
            { id: 'T0822', name: 'External Remote Services', relevance: 'HIGH', assets: 'Remote monitoring, AtSource' },
        ]
    },
    {
        id: 'execution', name: 'Execution', color: '#f97316', techniques: [
            { id: 'T0871', name: 'Execution through API', relevance: 'HIGH', assets: 'SAP APIs, Braincube, Salesforce' },
            { id: 'T0873', name: 'Project File Infection', relevance: 'HIGH', assets: 'Engineering workstations' },
        ]
    },
    {
        id: 'persistence', name: 'Persistence', color: '#eab308', techniques: [
            { id: 'T0839', name: 'Module Firmware', relevance: 'MEDIUM', assets: 'PLCs (cocoa, dairy, spice)' },
            { id: 'T0859', name: 'Valid Accounts', relevance: 'HIGH', assets: 'AD, SAP, OT credentials' },
        ]
    },
    {
        id: 'evasion', name: 'Evasion', color: '#84cc16', techniques: [
            { id: 'T0849', name: 'Masquerading', relevance: 'MEDIUM', assets: 'ICS maintenance tools' },
            { id: 'T0872', name: 'Indicator Removal', relevance: 'HIGH', assets: 'SIEM logs, audit trails' },
        ]
    },
    {
        id: 'discovery', name: 'Discovery', color: '#22c55e', techniques: [
            { id: 'T0840', name: 'Network Enumeration', relevance: 'HIGH', assets: 'Nutanix, AWS, Azure (51 countries)' },
            { id: 'T0846', name: 'Remote System Discovery', relevance: 'HIGH', assets: 'PLCs, SCADA, HMIs' },
            { id: 'T0888', name: 'Remote System Info', relevance: 'HIGH', assets: 'ICS inventory (dairy, cocoa)' },
        ]
    },
    {
        id: 'lateral-movement', name: 'Lateral Movement', color: '#06b6d4', techniques: [
            { id: 'T0866', name: 'Exploitation of Remote Services', relevance: 'HIGH', assets: 'Jump boxes, IT/OT zones' },
            { id: 'T0867', name: 'Lateral Tool Transfer', relevance: 'HIGH', assets: 'Remote access utilities' },
        ]
    },
    {
        id: 'collection', name: 'Collection', color: '#3b82f6', techniques: [
            { id: 'T0802', name: 'Automated Collection', relevance: 'HIGH', assets: 'Production formulas, quality data' },
            { id: 'T0861', name: 'Point & Tag Identification', relevance: 'HIGH', assets: 'Temp, pH, pressure tags' },
        ]
    },
    {
        id: 'command-control', name: 'Command & Control', color: '#8b5cf6', techniques: [
            { id: 'T0885', name: 'Commonly Used Port', relevance: 'MEDIUM', assets: 'Firewall rules (IT/OT boundary)' },
            { id: 'T0869', name: 'Standard App Layer Protocol', relevance: 'MEDIUM', assets: 'Web-based HMIs, HTTPS SCADA' },
        ]
    },
    {
        id: 'inhibit-response', name: 'Inhibit Response', color: '#ec4899', techniques: [
            { id: 'T0800', name: 'Activate Firmware Update Mode', relevance: 'CRITICAL', assets: 'PLCs during production' },
            { id: 'T0809', name: 'Data Destruction', relevance: 'CRITICAL', assets: 'Recipe DBs, traceability' },
            { id: 'T0816', name: 'Device Restart/Shutdown', relevance: 'CRITICAL', assets: 'Critical processing equipment' },
        ]
    },
    {
        id: 'impair-process', name: 'Impair Process Control', color: '#f43f5e', techniques: [
            { id: 'T0836', name: 'Modify Parameter', relevance: 'CRITICAL', assets: 'Dairy pasteurization, cocoa roasting' },
            { id: 'T0855', name: 'Unauthorized Command', relevance: 'CRITICAL', assets: 'Packaging, processing override' },
            { id: 'T0831', name: 'Manipulation of Control', relevance: 'CRITICAL', assets: 'Quality sensors, FSSC 22000' },
        ]
    },
    {
        id: 'impact', name: 'Impact', color: '#dc2626', techniques: [
            { id: 'T0826', name: 'Loss of Availability', relevance: 'CRITICAL', assets: 'All 120+ facilities' },
            { id: 'T0828', name: 'Loss of Productivity', relevance: 'CRITICAL', assets: 'Customer contracts, brand' },
        ]
    },
];

const ENTERPRISE_HIGHLIGHTS = [
    { id: 'T1566', name: 'Phishing', category: 'Initial Access', ofiRisk: 'HIGH', notes: '87K employees, primary entry vector' },
    { id: 'T1078', name: 'Valid Accounts', category: 'Persistence', ofiRisk: 'HIGH', notes: 'AD, SAP, cloud credentials' },
    { id: 'T1486', name: 'Data Encrypted for Impact', category: 'Impact', ofiRisk: 'CRITICAL', notes: 'Ransomware primary goal' },
    { id: 'T1567', name: 'Exfiltration Over Web Service', category: 'Exfiltration', ofiRisk: 'HIGH', notes: 'Double extortion' },
    { id: 'T1190', name: 'Exploit Public-Facing App', category: 'Initial Access', ofiRisk: 'HIGH', notes: 'AtSource, Olam Direct' },
];

const MOBILE_HIGHLIGHTS = [
    { id: 'T1474', name: 'Supply Chain Compromise', category: 'Initial Access', ofiRisk: 'HIGH', notes: 'Olam Direct (2.8M farmers)' },
    { id: 'T1430', name: 'Location Tracking', category: 'Collection', ofiRisk: 'MEDIUM', notes: 'GPS spoofing for EUDR' },
    { id: 'T1437', name: 'Standard Application Layer', category: 'C2', ofiRisk: 'MEDIUM', notes: 'Mobile app communications' },
];

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function TacticColumn({ tactic, isExpanded, onToggle }: {
    tactic: typeof ICS_TACTICS[0];
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const criticalCount = tactic.techniques.filter(t => t.relevance === 'CRITICAL').length;
    const highCount = tactic.techniques.filter(t => t.relevance === 'HIGH').length;

    return (
        <div className="glass-panel rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tactic.color }} />
                    <span className="text-white font-medium text-sm">{tactic.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    {criticalCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">
                            {criticalCount}C
                        </span>
                    )}
                    {highCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-orange-500/20 text-orange-400 rounded">
                            {highCount}H
                        </span>
                    )}
                    <ChevronDown
                        className={`text-grey transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        size={16}
                    />
                </div>
            </button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/5"
                    >
                        <div className="p-3 space-y-2">
                            {tactic.techniques.map((tech) => (
                                <TechniqueCard key={tech.id} technique={tech} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TechniqueCard({ technique }: { technique: { id: string; name: string; relevance: string; assets: string } }) {
    const relevanceColors: Record<string, string> = {
        CRITICAL: 'text-red-400 bg-red-500/10 border-red-500/30',
        HIGH: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        MEDIUM: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    };

    return (
        <div className="p-3 bg-black/40 rounded-lg">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <code className="text-oxot-blue text-xs">{technique.id}</code>
                    <span className="text-white text-sm">{technique.name}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${relevanceColors[technique.relevance]}`}>
                    {technique.relevance}
                </span>
            </div>
            <div className="text-grey text-xs">{technique.assets}</div>
        </div>
    );
}

function MatrixTab({ active, label, icon: Icon, onClick }: {
    active: boolean;
    label: string;
    icon: any;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${active
                ? 'bg-oxot-gold/20 text-oxot-gold border border-oxot-gold/40'
                : 'bg-white/5 text-grey hover:text-white border border-white/10'
                }`}
        >
            <Icon size={16} />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function MITREAttackProfile() {
    const [activeMatrix, setActiveMatrix] = useState<'ics' | 'enterprise' | 'mobile'>('ics');
    const [expandedTactics, setExpandedTactics] = useState<string[]>(['initial-access', 'impair-process']);

    const toggleTactic = (id: string) => {
        setExpandedTactics(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const totalCritical = ICS_TACTICS.reduce((acc, t) =>
        acc + t.techniques.filter(tech => tech.relevance === 'CRITICAL').length, 0);
    const totalHigh = ICS_TACTICS.reduce((acc, t) =>
        acc + t.techniques.filter(tech => tech.relevance === 'HIGH').length, 0);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <ScrollReveal>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">MITRE ATT&CK MAPPING</span>
                    </div>
                    <PageHeader
                        title="Threat Profile"
                        subtitle="MITRE ATT&CK framework mapping for OFI operations - ICS, Enterprise, and Mobile matrices"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-white mb-1">26</div>
                        <div className="text-xs text-grey">ICS Techniques</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-red-400 mb-1">{totalCritical}</div>
                        <div className="text-xs text-grey">Critical Risk</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-orange-400 mb-1">{totalHigh}</div>
                        <div className="text-xs text-grey">High Risk</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-oxot-gold mb-1">11</div>
                        <div className="text-xs text-grey">Tactics Covered</div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Matrix Tabs */}
            <ScrollReveal>
                <div className="flex gap-3 mb-6">
                    <MatrixTab
                        active={activeMatrix === 'ics'}
                        label="ICS Matrix"
                        icon={Settings}
                        onClick={() => setActiveMatrix('ics')}
                    />
                    <MatrixTab
                        active={activeMatrix === 'enterprise'}
                        label="Enterprise"
                        icon={Monitor}
                        onClick={() => setActiveMatrix('enterprise')}
                    />
                    <MatrixTab
                        active={activeMatrix === 'mobile'}
                        label="Mobile"
                        icon={Smartphone}
                        onClick={() => setActiveMatrix('mobile')}
                    />
                </div>
            </ScrollReveal>

            {/* Matrix Content */}
            <AnimatePresence mode="wait">
                {activeMatrix === 'ics' && (
                    <motion.div
                        key="ics"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {ICS_TACTICS.map((tactic) => (
                            <TacticColumn
                                key={tactic.id}
                                tactic={tactic}
                                isExpanded={expandedTactics.includes(tactic.id)}
                                onToggle={() => toggleTactic(tactic.id)}
                            />
                        ))}
                    </motion.div>
                )}

                {activeMatrix === 'enterprise' && (
                    <motion.div
                        key="enterprise"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-white font-semibold mb-4">Enterprise ATT&CK Highlights for OFI</h3>
                            <div className="space-y-3">
                                {ENTERPRISE_HIGHLIGHTS.map((tech) => (
                                    <div key={tech.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <code className="text-oxot-blue text-sm">{tech.id}</code>
                                                <span className="text-white">{tech.name}</span>
                                                <span className="text-grey text-xs">({tech.category})</span>
                                            </div>
                                            <div className="text-grey text-sm">{tech.notes}</div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${tech.ofiRisk === 'CRITICAL' ? 'text-red-400 bg-red-500/10' :
                                            tech.ofiRisk === 'HIGH' ? 'text-orange-400 bg-orange-500/10' :
                                                'text-yellow-400 bg-yellow-500/10'
                                            }`}>
                                            {tech.ofiRisk}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeMatrix === 'mobile' && (
                    <motion.div
                        key="mobile"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="glass-panel p-6 rounded-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Smartphone className="text-oxot-gold" size={20} />
                                <h3 className="text-white font-semibold">Mobile ATT&CK - Olam Direct (2.8M Farmers)</h3>
                            </div>
                            <p className="text-grey text-sm mb-4">
                                The Olam Direct mobile platform connects 2.8 million farmers globally.
                                Compromise of this app could affect supply chain traceability and EUDR compliance.
                            </p>
                            <div className="space-y-3">
                                {MOBILE_HIGHLIGHTS.map((tech) => (
                                    <div key={tech.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <code className="text-oxot-blue text-sm">{tech.id}</code>
                                                <span className="text-white">{tech.name}</span>
                                            </div>
                                            <div className="text-grey text-sm">{tech.notes}</div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${tech.ofiRisk === 'HIGH' ? 'text-orange-400 bg-orange-500/10' :
                                            'text-yellow-400 bg-yellow-500/10'
                                            }`}>
                                            {tech.ofiRisk}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer Note */}
            <ScrollReveal>
                <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 text-grey text-sm">
                        <Shield size={16} />
                        <span>
                            Framework aligned with MITRE ATT&CK for ICS v14, Enterprise v14, and Mobile v14.
                            OFI-specific relevance ratings based on technology stack and operational footprint analysis.
                        </span>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
