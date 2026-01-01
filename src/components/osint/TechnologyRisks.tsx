'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Server, Bug, AlertTriangle, ChevronDown, ExternalLink, ChevronLeft,
    Shield, Lock, Cpu, Database, Cloud, Zap, Settings, Smartphone
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// CVE DATA
// =============================================================================

const TECHNOLOGY_DATA = {
    categories: [
        {
            id: 'rockwell',
            name: 'Rockwell Automation',
            icon: Settings,
            products: ['ControlLogix', 'CompactLogix', 'FactoryTalk'],
            usage: 'PLC control systems across processing facilities',
            cves: [
                { id: 'CVE-2024-10386', cvss: 9.3, product: 'FactoryTalk ThinManager', description: 'DB manipulation via crafted packets', status: 'Patch Available' },
                { id: 'CVE-2025-7353', cvss: 9.0, product: 'ControlLogix Ethernet', description: 'RCE via web debugger - memory dump/modify', status: 'Pending' },
                { id: 'CVE-2025-9364', cvss: 8.7, product: 'LogixAI (Redis)', description: 'Sensitive data access, no auth required', status: 'Patch Available' },
                { id: 'CVE-2025-7970', cvss: 8.7, product: 'FactoryTalk Activation Manager', description: 'Traffic decryption, session hijack', status: 'Update to v5.02+' },
                { id: 'CVE-2024-6077', cvss: 8.7, product: 'ControlLogix/CompactLogix', description: 'Remote DoS, manual restart required', status: 'Sept 2024 Patch' },
                { id: 'CVE-2024-3493', cvss: 8.6, product: 'ControlLogix 5580', description: 'DoS via malformed packet', status: 'April 2024 Patch' },
            ]
        },
        {
            id: 'siemens',
            name: 'Siemens Industrial',
            icon: Cpu,
            products: ['S7-1500', 'S7-300/400', 'WinCC SCADA', 'TIA Portal'],
            usage: 'Legacy S7-300/400 (Zaan Cluster) & S7-1500 (New Sites)',
            cves: [
                { id: 'CVE-2022-38465', cvss: 9.8, product: 'S7-1500 (multiple)', description: 'Private key extraction', status: 'Legacy - Mitigate' },
                { id: 'CVE-2023-28489', cvss: 9.8, product: 'CP-8050/8031', description: 'Web server RCE', status: 'Patch Available' },
                { id: 'CVE-2019-13945', cvss: 7.1, product: 'S7-1500 CPU', description: 'Boot sequence bypass', status: 'Legacy - Segment' },
            ]
        },
        {
            id: 'braincube',
            name: 'Braincube AI Platform',
            icon: Zap,
            products: ['Industrial IoT Platform', 'Digital Twin', 'PLC Optimization'],
            usage: 'Smart manufacturing AI with direct PLC access - 6.5% yield increase',
            cves: [],
            customRisks: [
                { risk: 'AI Model Poisoning', severity: 'HIGH', description: 'Compromised training data → Quality degradation' },
                { risk: 'Command Injection', severity: 'CRITICAL', description: 'Braincube API → Direct PLC commands' },
                { risk: 'Data Exfiltration', severity: 'HIGH', description: 'Proprietary formula/recipe theft' },
                { risk: 'Supply Chain Attack', severity: 'CRITICAL', description: 'SolarWinds-style compromise → 120 plants' },
            ]
        },
        {
            id: 'sap',
            name: 'SAP S/4HANA',
            icon: Database,
            products: ['S/4HANA Cloud (AWS)', 'Joule AI', 'Integration Suite'],
            usage: 'Enterprise ERP with IT/OT boundary exposure',
            cves: [],
            customRisks: [
                { risk: 'API Gateway Bypass', severity: 'CRITICAL', description: 'SAP → SCADA command injection' },
                { risk: 'Joule AI Data Leakage', severity: 'HIGH', description: 'Process recipes exposed via AI' },
                { risk: 'RFC Destination Exploits', severity: 'HIGH', description: 'Lateral movement to OT zone' },
            ]
        },
        {
            id: 'nutanix',
            name: 'Nutanix Hybrid Cloud',
            icon: Cloud,
            products: ['Prism', 'AHV Hypervisor'],
            usage: 'Hybrid cloud infrastructure (99.999% SLA)',
            cves: [],
            customRisks: [
                { risk: 'Hypervisor Escape', severity: 'HIGH', description: 'VM to host breakout' },
                { risk: 'Management Plane Exposure', severity: 'MEDIUM', description: 'Prism access from OT networks' },
                { risk: 'Snapshot Theft', severity: 'MEDIUM', description: 'OT configs in backups' },
            ]
        },
        {
            id: 'agritech',
            name: 'AgriTech Ecosystem',
            icon: Smartphone,
            products: ['Olam Direct', 'Jiva', 'AtSource'],
            usage: 'External facing apps for 2.8M farmers and 300+ customers',
            cves: [],
            customRisks: [
                { risk: 'IDOR / API Leaks', severity: 'CRITICAL', description: 'Olam Direct API pricing manipulation' },
                { risk: 'AI Model Poisoning', severity: 'HIGH', description: 'Jiva crop advisory data injection' },
                { risk: 'Tenant Isolation', severity: 'HIGH', description: 'AtSource client data exposure' },
            ]
        },
    ]
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function CVSSBadge({ score }: { score: number }) {
    const getColor = () => {
        if (score >= 9.0) return 'text-red-400 bg-red-500/20 border-red-500/40';
        if (score >= 7.0) return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
        if (score >= 4.0) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
        return 'text-green-400 bg-green-500/20 border-green-500/40';
    };

    return (
        <span className={`px-2 py-0.5 text-xs font-mono rounded border ${getColor()}`}>
            CVSS {score.toFixed(1)}
        </span>
    );
}

function TechnologyCard({ category, index }: { category: typeof TECHNOLOGY_DATA.categories[0]; index: number }) {
    const [expanded, setExpanded] = useState(index < 2);
    const Icon = category.icon;
    const hasCritical = category.cves.some(c => c.cvss >= 9.0) ||
        category.customRisks?.some(r => r.severity === 'CRITICAL');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`glass-panel rounded-xl overflow-hidden ${hasCritical ? 'border-l-4 border-l-red-500' : ''}`}
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${hasCritical ? 'bg-red-500/20' : 'bg-oxot-gold/20'}`}>
                        <Icon className={hasCritical ? 'text-red-400' : 'text-oxot-gold'} size={20} />
                    </div>
                    <div className="text-left">
                        <div className="text-white font-semibold">{category.name}</div>
                        <div className="text-grey text-xs">{category.products.join(' • ')}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {category.cves.length > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">
                            {category.cves.length} CVEs
                        </span>
                    )}
                    {category.customRisks && (
                        <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">
                            {category.customRisks.length} Risks
                        </span>
                    )}
                    <ChevronDown className={`text-grey transition-transform ${expanded ? 'rotate-180' : ''}`} size={20} />
                </div>
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10"
                    >
                        <div className="p-5 space-y-4">
                            <div className="text-grey text-sm">{category.usage}</div>

                            {category.cves.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-mono text-oxot-gold mb-2">KNOWN CVEs</h4>
                                    <div className="space-y-2">
                                        {category.cves.map((cve) => (
                                            <div key={cve.id} className="p-3 bg-black/30 rounded-lg">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-oxot-blue text-sm">{cve.id}</code>
                                                        <CVSSBadge score={cve.cvss} />
                                                    </div>
                                                    <span className="text-xs text-grey">{cve.status}</span>
                                                </div>
                                                <div className="text-grey text-xs">{cve.product}: {cve.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {category.customRisks && (
                                <div>
                                    <h4 className="text-xs font-mono text-oxot-gold mb-2">THIRD-PARTY RISKS</h4>
                                    <div className="space-y-2">
                                        {category.customRisks.map((risk) => (
                                            <div key={risk.risk} className="p-3 bg-black/30 rounded-lg">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-white text-sm">{risk.risk}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded ${risk.severity === 'CRITICAL' ? 'text-red-400 bg-red-500/10' :
                                                        risk.severity === 'HIGH' ? 'text-orange-400 bg-orange-500/10' :
                                                            'text-yellow-400 bg-yellow-500/10'
                                                        }`}>
                                                        {risk.severity}
                                                    </span>
                                                </div>
                                                <div className="text-grey text-xs">{risk.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function TechnologyRisks() {
    const totalCVEs = TECHNOLOGY_DATA.categories.reduce((acc, cat) => acc + cat.cves.length, 0);
    const criticalCVEs = TECHNOLOGY_DATA.categories.reduce((acc, cat) =>
        acc + cat.cves.filter(c => c.cvss >= 9.0).length, 0);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <ScrollReveal>
                <Link href="/corporate/osint-report" className="inline-flex items-center gap-2 text-grey hover:text-white text-sm mb-6 transition-colors">
                    <ChevronLeft size={16} />
                    Back to OSINT Report
                </Link>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Bug className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">VULNERABILITY ASSESSMENT</span>
                    </div>
                    <PageHeader
                        title="Technology Risks"
                        subtitle="CVE database and third-party risk analysis for OFI's industrial technology stack"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Summary Stats */}
            <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-white mb-1">{TECHNOLOGY_DATA.categories.length}</div>
                        <div className="text-xs text-grey">Technology Platforms</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-red-400 mb-1">{totalCVEs}</div>
                        <div className="text-xs text-grey">Known CVEs</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-orange-400 mb-1">{criticalCVEs}</div>
                        <div className="text-xs text-grey">Critical (CVSS ≥9.0)</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-oxot-gold mb-1">120+</div>
                        <div className="text-xs text-grey">Facilities Affected</div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Technology Cards */}
            <ScrollReveal>
                <div className="space-y-4 mb-8">
                    {TECHNOLOGY_DATA.categories.map((category, i) => (
                        <TechnologyCard key={category.id} category={category} index={i} />
                    ))}
                </div>
            </ScrollReveal>

            {/* Remediation Priority */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl border-l-4 border-l-oxot-gold">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-oxot-gold" size={20} />
                        <h3 className="text-white font-semibold">Remediation Priority</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <h4 className="text-red-400 font-semibold text-sm mb-2">Immediate (0-7 days)</h4>
                            <ul className="text-grey text-xs space-y-1">
                                <li>• CVE-2024-10386 (ThinManager)</li>
                                <li>• CVE-2025-7353 (ControlLogix)</li>
                                <li>• Braincube API monitoring</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <h4 className="text-orange-400 font-semibold text-sm mb-2">Short-term (30 days)</h4>
                            <ul className="text-grey text-xs space-y-1">
                                <li>• All CVSS ≥8.0 patches</li>
                                <li>• SAP/OT integration review</li>
                                <li>• Nutanix segmentation audit</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <h4 className="text-yellow-400 font-semibold text-sm mb-2">Long-term (90 days)</h4>
                            <ul className="text-grey text-xs space-y-1">
                                <li>• Full vulnerability assessment</li>
                                <li>• Standardized patching program</li>
                                <li>• OT vulnerability scanning</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
