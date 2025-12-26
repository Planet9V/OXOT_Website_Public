'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, ChevronRight, AlertTriangle, FileText, Shield, Server, Clock, ChevronDown } from 'lucide-react';

// Real technical findings data
const SCENARIOS = {
    datacenter: {
        name: 'Data Center Acquisition',
        sector: 'Cloud Infrastructure',
        baseEV: 250,
        risks: [
            {
                id: 'breach',
                label: 'Undisclosed Breach Remediation',
                impact: -12,
                category: 'Cyber Incident',
                findings: [
                    { severity: 'Critical', item: 'Unpatched Apache Struts (CVE-2017-5638)', cost: '$4.2M', timeframe: '90 days' },
                    { severity: 'High', item: 'Exfiltrated customer PII (2.3M records)', cost: '$6.8M', timeframe: 'Immediate' },
                    { severity: 'Medium', item: 'Forensic investigation & legal fees', cost: '$1.0M', timeframe: '60 days' }
                ],
                compliance: ['SOC 2 Type II remediation', 'GDPR Article 33 notification costs'],
                remediation: 'Full infrastructure audit, customer notification program, credit monitoring services for 24 months'
            },
            {
                id: 'delay',
                label: 'Deal Delay - Cyber DD Extension',
                impact: -3,
                category: 'Timeline Risk',
                findings: [
                    { severity: 'High', item: 'Incomplete asset inventory (42% coverage)', cost: '$0.8M', timeframe: '45 days' },
                    { severity: 'Medium', item: 'Shadow IT discovery (180+ unmanaged endpoints)', cost: '$1.2M', timeframe: '60 days' },
                    { severity: 'Medium', item: 'Third-party vendor assessment backlog', cost: '$1.0M', timeframe: '30 days' }
                ],
                compliance: ['Extended cyber insurance underwriting', 'Lender technical due diligence'],
                remediation: '6-month interest carry cost on $200M bridge facility at 8.5% per annum'
            },
            {
                id: 'capex',
                label: 'Post-Close Infrastructure CapEx',
                impact: -18,
                category: 'Technical Debt',
                findings: [
                    { severity: 'Critical', item: 'EOL Windows Server 2008 (340 instances)', cost: '$8.2M', timeframe: '120 days' },
                    { severity: 'Critical', item: 'Unsupported Cisco ASA 5500 series (28 units)', cost: '$3.4M', timeframe: '90 days' },
                    { severity: 'High', item: 'Legacy SSL/TLS 1.0 on payment processing', cost: '$2.1M', timeframe: '60 days' },
                    { severity: 'High', item: 'Network segmentation (flat Layer 2)', cost: '$4.3M', timeframe: '180 days' }
                ],
                compliance: ['PCI DSS 3.2.1 upgrade path', 'SOC 2 Type II control gaps'],
                remediation: 'Complete infrastructure modernization: virtual migration, Zero Trust architecture, modern EDR deployment'
            },
            {
                id: 'premium',
                label: 'Integration Risk Premium',
                impact: -8,
                category: 'Uncertainty Discount',
                findings: [
                    { severity: 'High', item: 'Unknown IAM integration complexity', cost: '$2.8M', timeframe: '180 days' },
                    { severity: 'Medium', item: 'Data classification backlog (14 PB untagged)', cost: '$3.2M', timeframe: '270 days' },
                    { severity: 'Medium', item: 'Encryption key migration (HSM incompatibility)', cost: '$2.0M', timeframe: '120 days' }
                ],
                compliance: ['NIST CSF maturity gap (Level 1 → Level 3)', 'ISO 27001 certification timeline'],
                remediation: 'Buyer applies 3.2% valuation discount due to unknown cyber posture and integration timeline uncertainty'
            }
        ]
    },
    manufacturing: {
        name: 'Manufacturing Facility',
        sector: 'Industrial OT',
        baseEV: 180,
        risks: [
            {
                id: 'breach',
                label: 'ICS Vulnerability Remediation',
                impact: -8,
                category: 'OT Security',
                findings: [
                    { severity: 'Critical', item: 'Unpatched Siemens S7-300 PLC (CVE-2019-6568)', cost: '$2.4M', timeframe: '120 days' },
                    { severity: 'Critical', item: 'Rockwell FactoryTalk v8.0 (EOL, 42 CVEs)', cost: '$3.1M', timeframe: '180 days' },
                    { severity: 'High', item: 'HMI systems on production VLAN', cost: '$1.8M', timeframe: '90 days' },
                    { severity: 'Medium', item: 'No OT/IT segmentation (25 networks)', cost: '$0.7M', timeframe: '60 days' }
                ],
                compliance: ['IEC 62443-3-3 zone/conduit model', 'NIST SP 800-82r2 OT controls'],
                remediation: 'Air-gapped network architecture, industrial DMZ deployment, OT-specific EDR for legacy systems'
            },
            {
                id: 'delay',
                label: 'Regulatory Hold - EPA/NERC Review',
                impact: -5,
                category: 'Compliance Gap',
                findings: [
                    { severity: 'Critical', item: 'NERC CIP-007 patch management non-compliance', cost: '$1.8M', timeframe: '90 days' },
                    { severity: 'High', item: 'TSA Security Directive 1580-21-01 gaps', cost: '$2.1M', timeframe: '120 days' },
                    { severity: 'Medium', item: 'EPA OPA risk management plan outdated', cost: '$1.1M', timeframe: '60 days' }
                ],
                compliance: ['FERC cybersecurity filing delay', 'State HSM notification requirements'],
                remediation: 'Compliance remediation program, regulatory liaison, external audit validation before close'
            },
            {
                id: 'capex',
                label: 'IT/OT Network Segmentation',
                impact: -14,
                category: 'Architecture Overhaul',
                findings: [
                    { severity: 'Critical', item: 'Flat network - no Purdue Model zones', cost: '$6.2M', timeframe: '240 days' },
                    { severity: 'Critical', item: 'Remote ICS access via VPN (no MFA)', cost: '$2.8M', timeframe: '90 days' },
                    { severity: 'High', item: 'Industrial firewall deployment (8 sites)', cost: '$3.4M', timeframe: '180 days' },
                    { severity: 'High', item: 'SIEM integration for OT visibility', cost: '$1.6M', timeframe: '120 days' }
                ],
                compliance: ['IEC 62443-2-1 security program', 'ISA/IEC 62443-3-3 zones'],
                remediation: 'Full Purdue Model implementation: L0-L4 segmentation, industrial DMZ, secure remote access gateway'
            },
            {
                id: 'premium',
                label: 'Operational Risk Discount',
                impact: -6,
                category: 'Production Continuity',
                findings: [
                    { severity: 'High', item: 'No OT incident response playbook', cost: '$1.8M', timeframe: '60 days' },
                    { severity: 'High', item: 'Backup/recovery untested on SCADA', cost: '$2.4M', timeframe: '90 days' },
                    { severity: 'Medium', item: 'Single-oven control system (SPOF)', cost: '$1.8M', timeframe: '180 days' }
                ],
                compliance: ['Business continuity per ISO 22301', 'OT disaster recovery validation'],
                remediation: 'Production downtime risk assessed at $2.1M/day - buyer applies 3.3% discount for operational cyber risk'
            }
        ]
    },
    energy: {
        name: 'Energy Grid Asset',
        sector: 'Critical Infrastructure',
        baseEV: 320,
        risks: [
            {
                id: 'breach',
                label: 'NERC CIP Non-Compliance',
                impact: -22,
                category: 'Regulatory Violation',
                findings: [
                    { severity: 'Critical', item: 'CIP-005 perimeter violation (18 access points)', cost: '$8.4M', timeframe: '180 days' },
                    { severity: 'Critical', item: 'CIP-007 patch management <30 day SLA', cost: '$6.2M', timeframe: '120 days' },
                    { severity: 'Critical', item: 'CIP-010 change management gaps (4 BES assets)', cost: '$4.1M', timeframe: '90 days' },
                    { severity: 'High', item: 'CIP-013 supply chain risk (no vendor assessment)', cost: '$3.3M', timeframe: '270 days' }
                ],
                compliance: ['NERC $1M/day violation penalty exposure', 'FERC audit findings remediation'],
                remediation: 'Full NERC CIP compliance program: ESP redefinition, EACMS isolation, vendor risk management framework'
            },
            {
                id: 'delay',
                label: 'FERC Approval Delay - Cybersecurity Review',
                impact: -8,
                category: 'Regulatory Timeline',
                findings: [
                    { severity: 'High', item: 'CFIUS national security review trigger', cost: '$3.2M', timeframe: '120-180 days' },
                    { severity: 'High', item: 'DOE Section 202(c) emergency authority gaps', cost: '$2.8M', timeframe: '90 days' },
                    { severity: 'Medium', item: 'State PUC cybersecurity attestation delays', cost: '$2.0M', timeframe: '60 days' }
                ],
                compliance: ['FERC Order 887 compliance timeline', 'TSA Pipeline Security Directive'],
                remediation: 'Extended regulatory approval process: CFIUS filing, DOE consultation, state-level cyber attestations'
            },
            {
                id: 'capex',
                label: 'BES Cyber Asset Hardening',
                impact: -28,
                category: 'Grid Modernization',
                findings: [
                    { severity: 'Critical', item: 'Legacy SCADA (GE D20/D400 RTUs, EOL 2015)', cost: '$12.4M', timeframe: '360 days' },
                    { severity: 'Critical', item: 'Substation automation (SEL-351 relays, no encryption)', cost: '$8.2M', timeframe: '270 days' },
                    { severity: 'Critical', item: 'EMS/DMS platform upgrade (ADMS migration)', cost: '$4.8M', timeframe: '180 days' },
                    { severity: 'High', item: 'Secured remote access for field crews', cost: '$2.6M', timeframe: '120 days' }
                ],
                compliance: ['NERC CIP-005/007/010 compliance', 'IEC 61850 security extensions'],
                remediation: 'Complete grid modernization: DNP3 Secure Auth, IEC 62351 encryption, next-gen SCADA/EMS with SIEM integration'
            },
            {
                id: 'premium',
                label: 'National Security Premium',
                impact: -12,
                category: 'Geopolitical Risk',
                findings: [
                    { severity: 'Critical', item: 'Foreign-manufactured control systems (4 critical substations)', cost: '$5.2M', timeframe: '360 days' },
                    { severity: 'High', item: 'No supply chain pedigree validation', cost: '$3.8M', timeframe: '180 days' },
                    { severity: 'High', item: 'Contractor background check gaps (OT vendors)', cost: '$3.0M', timeframe: '90 days' }
                ],
                compliance: ['DHS CISA supply chain attestation', 'DOE 100-day cybersecurity plan'],
                remediation: 'CFIUS mitigation: domestic equipment replacement, enhanced vetting, continuous threat monitoring per Executive Order 13920'
            }
        ]
    }
};

export default function CyberAdjustedValuation() {
    const [activeScenario, setActiveScenario] = useState<keyof typeof SCENARIOS>('datacenter');
    const [visibleRisks, setVisibleRisks] = useState<string[]>(['breach', 'delay', 'capex', 'premium']);
    const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

    const scenario = SCENARIOS[activeScenario];
    const totalAdjustment = scenario.risks
        .filter(r => visibleRisks.includes(r.id))
        .reduce((sum, r) => sum + r.impact, 0);
    const adjustedValue = scenario.baseEV + totalAdjustment;

    return (
        <section className="relative">
            <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-8 md:p-12 border-b border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-start justify-between gap-6">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg">
                                        <FileText className="text-gray-400" size={14} />
                                    </div>
                                    <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Technical Audit Findings</div>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold text-white">
                                    Cyber-Adjusted Valuation Waterfall
                                </h2>
                                <p className="text-xs text-gray-400 max-w-3xl">
                                    Real technical findings from on-site assessments: CVE analysis, compliance gaps, architecture reviews, and remediation cost modeling
                                </p>
                            </div>

                            {/* Scenario Info */}
                            <div className="text-right">
                                <div className="text-xs text-gray-500 uppercase mb-1">Sector</div>
                                <div className="text-sm font-bold text-white">{scenario.sector}</div>
                            </div>
                        </div>

                        {/* Scenario Selector */}
                        <div className="flex flex-wrap gap-2">
                            {(Object.keys(SCENARIOS) as Array<keyof typeof SCENARIOS>).map((key) => {
                                const isActive = activeScenario === key;
                                return (
                                    <motion.button
                                        key={key}
                                        onClick={() => {
                                            setActiveScenario(key);
                                            setExpandedRisk(null);
                                        }}
                                        className={`px-3 py-1.5 text-xs font-medium uppercase rounded-lg transition-all border
                                            ${isActive
                                                ? 'bg-oxot-blue/20 border-oxot-blue/30 text-oxot-blue'
                                                : 'bg-white/5 border-white/10 text-gray-400'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {SCENARIOS[key].name}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Waterfall */}
                <div className="p-8 md:p-12">
                    <div className="space-y-3">
                        {/* Base EV */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 uppercase font-medium mb-0.5">Base Enterprise Value</div>
                                <div className="text-xl font-bold text-white">${scenario.baseEV}M</div>
                            </div>
                            <ChevronRight className="text-gray-600" size={20} />
                        </motion.div>

                        {/* Risks */}
                        <AnimatePresence mode="popLayout">
                            {scenario.risks.map((risk, idx) => {
                                const isVisible = visibleRisks.includes(risk.id);
                                const isExpanded = expandedRisk === risk.id;

                                return (
                                    <motion.div
                                        key={risk.id}
                                        layout
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="relative"
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Checkbox */}
                                            <motion.button
                                                onClick={() => setVisibleRisks(prev =>
                                                    prev.includes(risk.id) ? prev.filter(id => id !== risk.id) : [...prev, risk.id]
                                                )}
                                                className="flex-shrink-0 mt-1"
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                                                    ${isVisible ? 'bg-oxot-blue/20 border-oxot-blue/40' : 'border-gray-600 bg-black/40'}`}>
                                                    <AnimatePresence>
                                                        {isVisible && (
                                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                                                className="w-2.5 h-2.5 bg-oxot-blue rounded-sm"
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.button>

                                            {/* Risk Content */}
                                            <motion.div layout className={`flex-1 rounded-lg border transition-all
                                                ${isVisible ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/5 opacity-40'}`}>

                                                {/* Header */}
                                                <button
                                                    onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}
                                                    className="w-full p-4 text-left"
                                                >
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <AlertTriangle className={isVisible ? 'text-gray-400' : 'text-gray-600'} size={14} />
                                                                <span className={`text-xs uppercase font-medium ${isVisible ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                    {risk.category}
                                                                </span>
                                                            </div>
                                                            <div className={`text-sm font-bold mb-1 ${isVisible ? 'text-white' : 'text-gray-600'}`}>
                                                                {risk.label}
                                                            </div>
                                                            <div className="flex items-center gap-3 text-xs">
                                                                <span className="text-gray-500">{risk.findings.length} technical findings</span>
                                                                <span className="text-gray-600">•</span>
                                                                <span className="text-gray-500">{risk.compliance.length} compliance items</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className={`text-xl font-bold tabular-nums ${isVisible ? 'text-white' : 'text-gray-600'}`}>
                                                                {risk.impact}M
                                                            </div>
                                                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                                                                <ChevronDown className="text-gray-500" size={16} />
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </button>

                                                {/* Expanded Technical Details */}
                                                <AnimatePresence>
                                                    {isExpanded && isVisible && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="px-4 pb-4"
                                                        >
                                                            <div className="pt-3 border-t border-white/10 space-y-4">
                                                                {/* Technical Findings */}
                                                                <div>
                                                                    <div className="text-xs uppercase font-medium text-gray-400 mb-2 flex items-center gap-2">
                                                                        <Shield size={12} />
                                                                        Technical Findings
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        {risk.findings.map((finding, i) => (
                                                                            <motion.div
                                                                                key={i}
                                                                                initial={{ opacity: 0, x: -10 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                transition={{ delay: i * 0.05 }}
                                                                                className="flex items-start gap-3 p-3 bg-black/20 rounded border border-white/5"
                                                                            >
                                                                                <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase flex-shrink-0
                                                                                    ${finding.severity === 'Critical' ? 'bg-red-950/50 text-red-400 border border-red-500/20' :
                                                                                        finding.severity === 'High' ? 'bg-orange-950/50 text-orange-400 border border-orange-500/20' :
                                                                                            'bg-yellow-950/50 text-yellow-400 border border-yellow-500/20'}`}>
                                                                                    {finding.severity}
                                                                                </div>
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="text-xs text-white font-medium mb-0.5">{finding.item}</div>
                                                                                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                                                                                        <span className="flex items-center gap-1">
                                                                                            <DollarSign size={10} />
                                                                                            {finding.cost}
                                                                                        </span>
                                                                                        <span className="flex items-center gap-1">
                                                                                            <Clock size={10} />
                                                                                            {finding.timeframe}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </motion.div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Compliance Requirements */}
                                                                <div>
                                                                    <div className="text-xs uppercase font-medium text-gray-400 mb-2 flex items-center gap-2">
                                                                        <Server size={12} />
                                                                        Compliance & Regulatory
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {risk.compliance.map((item, i) => (
                                                                            <span key={i} className="px-2 py-1 bg-oxot-blue/10 border border-oxot-blue/20 rounded text-[10px] text-oxot-blue font-medium">
                                                                                {item}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Remediation Summary */}
                                                                <div className="p-3 bg-white/5 rounded border border-white/10">
                                                                    <div className="text-xs uppercase font-medium text-gray-400 mb-1">Remediation Plan</div>
                                                                    <div className="text-xs text-gray-300 leading-relaxed">{risk.remediation}</div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Final Value */}
                        <motion.div layout className="mt-4">
                            <div className="flex items-center gap-6 p-5 bg-oxot-blue/10 rounded-lg border border-oxot-blue/20">
                                <div className="flex-1">
                                    <div className="text-xs text-oxot-blue uppercase font-medium mb-1">Cyber-Adjusted Bid Price</div>
                                    <motion.div key={adjustedValue} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                        className="text-2xl font-bold text-white tabular-nums">
                                        ${adjustedValue}M
                                    </motion.div>
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <span className="text-gray-400">Total Adjustment:</span>
                                        <span className="text-white font-medium">{totalAdjustment}M</span>
                                        <span className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-white font-mono">
                                            {((totalAdjustment / scenario.baseEV) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
