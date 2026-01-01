'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Target, Shield, Cpu, Zap, AlertTriangle, CheckCircle2, Circle,
    Building2, Globe, Users, ChevronDown, ChevronRight, ChevronLeft, ExternalLink,
    Lock, Network, BarChart3, FileText, ArrowRight, Sparkles,
    AlertCircle, Star, TrendingUp, Layers, Eye, Radio
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// COMPREHENSIVE GTM DATA
// =============================================================================

const GTM_DATA = {
    executive: {
        target: 'Olam Food Ingredients (ofi)',
        phase: 'Pre-IPO (LSE Primary, SGX Secondary)',
        valuation: 'S$21.8B Revenue (FY2024)',
        growth: '29.1% YoY EBIT Growth',
        facilities: '120+ globally',
        urgency: 'HIGH - NIS2 & EUDR Dec 2025 deadlines'
    },

    currentPartners: {
        mindsprint: {
            name: 'Mindsprint (In-House MSSP)',
            role: 'Managed Security Service Provider',
            strengths: [
                'GuardianEye platform for external attack surface management',
                '24/7 SOC monitoring from Chennai/Bengaluru',
                'SAP S/4HANA on AWS management',
                'IT/OT boundary protection',
                'GenAI development and process mining (Celonis)'
            ],
            limitations: [
                'IT-centric heritage (former Olam IT department)',
                'Limited deep OT/ICS security specialization',
                'No dedicated IEC 62443 certification expertise',
                'Third-party AI platform auditing gaps (Braincube)',
                'FEED/greenfield security requirements unfamiliar',
                'Safety-critical PLC validation not core competency'
            ]
        },
        otVendors: {
            name: 'Claroty / Nozomi Networks (Suspected)',
            role: 'OT visibility tools',
            limitations: [
                'Point solutions, not strategic OT security partner',
                'No MITRE ATT&CK for ICS threat modeling',
                'No safety-critical attack scenario planning',
                'No converged IT/OT threat intelligence'
            ]
        }
    },

    oxotAlignment: {
        differentiators: [
            { point: 'Pure OT/ICS Focus', detail: 'Unlike IT-centric Mindsprint, OXOT specializes in industrial control systems and safety-critical processes' },
            { point: 'IEC 62443 Expertise', detail: 'Deep certification and FEED integration for new facilities like Shanghai CSC and Tokoroa' },
            { point: 'MITRE ATT&CK for ICS', detail: 'Threat modeling specifically for food manufacturing - Braincube "Trust Trap" scenarios' },
            { point: 'Third-Party OT Audits', detail: 'Validate AI platforms (Braincube, Ai Palette) that Mindsprint integrated but cannot audit' },
            { point: 'Safety-Critical Expertise', detail: 'Pasteurization, spray drying, sterilization - processes where cyber = physical safety' },
            { point: 'IPO Readiness Assurance', detail: 'Independent OT security validation for investor due diligence' }
        ],
        positioning: 'OXOT as OT/ICS specialist complementing Mindsprint\'s IT-focused MSSP - not replacement, but specialization'
    },

    goldTeam: {
        name: 'GOLD TEAM - Strategic Advisory',
        tagline: 'Executive Risk Intelligence',
        services: [
            {
                name: 'Board-Level Cyber Risk Quantification',
                fit: 'IPO preparation requires demonstrable cyber governance',
                ofiNeed: 'Personal liability under NIS2 for executives including Felix Mathew (Deputy CISO)',
                deliverable: 'Quarterly board report on OT cyber exposure across 120+ facilities'
            },
            {
                name: 'M&A Cyber Due Diligence',
                fit: 'Post-acquisition risk assessment for newly acquired entities',
                ofiNeed: 'Recent acquisitions: Olde Thompson ($950M), Club Coffee, BT Cocoa',
                deliverable: 'OT security posture assessment for integrated subsidiaries'
            },
            {
                name: 'Third-Party AI Risk Assessment',
                fit: 'Braincube, Ai Palette, Brightseed integrations create vendor attack surface',
                ofiNeed: 'Braincube has direct PLC write access - potential backdoor liability',
                deliverable: '"Braincube Trust Trap" audit - API security, setpoint validation'
            },
            {
                name: 'NIS2 Compliance Roadmap',
                fit: 'Food production is critical sector under NIS2 Directive',
                ofiNeed: 'Incident reporting timelines, management liability, supply chain security',
                deliverable: 'Gap analysis and remediation plan for EU facilities'
            }
        ]
    },

    blueTeam: {
        name: 'BLUE TEAM - Defensive Operations',
        tagline: 'Industrial Security Architecture',
        services: [
            {
                name: 'IEC 62443 FEED Integration',
                fit: 'New facilities need security-by-design',
                ofiNeed: 'Shanghai CSC greenfield, Tokoroa Phase 2, Linhares Brazil coffee plant',
                deliverable: 'Security requirements specification, SL-T assignments, vendor RFQ clauses'
            },
            {
                name: 'OT Asset Discovery & Inventory',
                fit: '120+ facilities with heterogeneous automation',
                ofiNeed: 'Rockwell, Siemens, AVEVA, EtherNet/IP, Modbus - inconsistent visibility',
                deliverable: 'Complete OT asset database with vulnerability correlation'
            },
            {
                name: 'Network Segmentation Design',
                fit: 'IT/OT convergence creates lateral movement risk',
                ofiNeed: 'SAP S/4HANA → Braincube → PLCs pathway needs isolation',
                deliverable: 'Zone/Conduit architecture per IEC 62443-3-3'
            },
            {
                name: 'Safety System Security',
                fit: 'Safety Instrumented Systems (SIS) require highest protection',
                ofiNeed: 'Pasteurization (72°C/15s), spray dryer explosion prevention, steam sterilization',
                deliverable: 'SL-3/SL-4 implementation for SIS zones'
            }
        ]
    },

    redTeam: {
        name: 'RED TEAM - Offensive Testing',
        tagline: 'Adversary Emulation',
        services: [
            {
                name: 'ICS Penetration Testing',
                fit: 'Validate security controls on industrial networks',
                ofiNeed: 'Cocoa roasting PLCs, dairy pasteurization, coffee extraction',
                deliverable: 'Controlled attack simulation with risk quantification'
            },
            {
                name: 'MITRE ATT&CK for ICS Adversary Emulation',
                fit: 'Realistic threat actor TTPs',
                ofiNeed: 'RansomHub, Akira targeting food sector - need specific playbooks',
                deliverable: 'Purple team exercises against 26 mapped ICS techniques'
            },
            {
                name: 'Braincube Compromise Simulation',
                fit: 'Third-party AI platform attack scenario',
                ofiNeed: 'What if Braincube API keys are stolen? Setpoint manipulation risk',
                deliverable: 'Controlled simulation of malicious setpoint injection'
            },
            {
                name: 'AtSource Data Integrity Testing',
                fit: 'Sustainability platform is "source of truth" for EUDR',
                ofiNeed: 'GPS spoofing, traceability manipulation could cause EU export ban',
                deliverable: 'Supply chain data integrity audit and pen test'
            }
        ]
    },

    attackScenarios: [
        {
            name: 'Braincube Trust Trap',
            target: 'Cocoa roasting PLCs',
            attack: 'Compromise Braincube API → inject malicious temperature setpoints',
            impact: 'Thermal runaway, fires, ruined batches, quality failures',
            severity: 'CRITICAL',
            coverage: 'Mindsprint unlikely to audit AI partner they integrated'
        },
        {
            name: 'Pasteurization Sabotage',
            target: 'Dairy facilities (Tokoroa, Johor)',
            attack: 'Manipulate time/temperature logic (72°C for 15 seconds)',
            impact: 'Pathogen survival → contamination → mass recall → deaths',
            severity: 'CRITICAL',
            coverage: 'Safety-critical process requires specialized SIS security'
        },
        {
            name: 'AtSource Data Poisoning',
            target: 'Sustainability traceability platform',
            attack: 'GPS spoofing in origin countries, backend manipulation',
            impact: 'Falsified deforestation claims → EU export ban → $billions',
            severity: 'HIGH',
            coverage: 'Data integrity audit requires security attestation expertise'
        },
        {
            name: 'Sterilization Bypass',
            target: 'Spices processing (Las Cruces, Vietnam)',
            attack: 'Skip or shorten steam sterilization cycles via PLC',
            impact: 'Salmonella survival → global recalls → brand destruction',
            severity: 'HIGH',
            coverage: 'Mindsprint IT focus misses CIP/sterilization logic'
        },
        {
            name: 'Spray Dryer Explosion',
            target: 'Dairy powder production',
            attack: 'Disable dust suppression or monitoring sensors',
            impact: 'Physical explosion, facility damage, casualties',
            severity: 'HIGH',
            coverage: 'SIS security requires IEC 61511 + 62443 expertise'
        }
    ],

    stakeholders: [
        { name: 'Felix Mathew', title: 'Deputy CISO', angle: 'Personal NIS2 liability, OT security gaps in Mindsprint portfolio', priority: 'HIGH' },
        { name: 'Stephen Byers', title: 'CDIO', angle: 'Digital transformation - ensure Braincube/AI integrations are secure', priority: 'HIGH' },
        { name: 'A. Shekhar', title: 'CEO', angle: 'IPO readiness - independent OT security assurance for investors', priority: 'MEDIUM' },
        { name: 'Rishi Kalra', title: 'CFO', angle: 'Margin protection, ROI on security investment vs ransomware cost', priority: 'MEDIUM' },
        { name: 'Kamesh Ellajosyula', title: 'Chief Innovation Officer', angle: 'CSC security for new facilities (Shanghai, Chicago)', priority: 'MEDIUM' },
    ],

    timeline: [
        { date: 'Q1 2025', milestone: 'Initial engagement - IEC 62443 FEED consultation for Shanghai CSC' },
        { date: 'Q2 2025', milestone: 'Braincube third-party security audit across cocoa facilities' },
        { date: 'Q3 2025', milestone: 'Red Team ICS penetration testing - dairy platform focus' },
        { date: 'Q4 2025', milestone: 'NIS2 compliance validation ahead of deadline' },
        { date: '2026', milestone: 'Strategic OT partner for IPO assurance and ongoing monitoring' },
    ],

    roiCase: {
        ransomwareCost: '$50M+ (based on JBS $11M ransom + operational losses)',
        recallCost: '$100M+ (pathogen contamination scenario)',
        eudrBanCost: 'Loss of European market access ($billions in cocoa/coffee exports)',
        oxotInvestment: 'Fraction of single incident cost',
        valueProposition: 'Independent OT assurance for IPO + NIS2 + operational resilience'
    }
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function PartnerGapAnalysis() {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="glass-panel p-6 rounded-xl mb-8">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between mb-4"
            >
                <div className="flex items-center gap-3">
                    <Eye className="text-oxot-gold" size={20} />
                    <h3 className="text-white font-semibold">Current Partner Gap Analysis</h3>
                </div>
                <ChevronDown className={`text-grey transition-transform ${expanded ? 'rotate-180' : ''}`} size={16} />
            </button>
            {expanded && (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Mindsprint */}
                    <div className="p-4 bg-black/30 rounded-lg border-l-4 border-l-blue-500">
                        <div className="flex items-center gap-2 mb-3">
                            <Shield className="text-blue-400" size={18} />
                            <h4 className="text-white font-medium">{GTM_DATA.currentPartners.mindsprint.name}</h4>
                        </div>
                        <p className="text-xs text-grey mb-3">Role: {GTM_DATA.currentPartners.mindsprint.role}</p>

                        <div className="mb-3">
                            <div className="text-green-400 text-xs font-medium mb-2">✓ Strengths</div>
                            <ul className="space-y-1">
                                {GTM_DATA.currentPartners.mindsprint.strengths.map((s, i) => (
                                    <li key={i} className="text-grey text-[10px] flex items-start gap-1">
                                        <span className="text-green-400">+</span> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="text-red-400 text-xs font-medium mb-2">⚠ Gaps (OXOT Opportunity)</div>
                            <ul className="space-y-1">
                                {GTM_DATA.currentPartners.mindsprint.limitations.map((l, i) => (
                                    <li key={i} className="text-grey text-[10px] flex items-start gap-1">
                                        <span className="text-red-400">−</span> {l}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* OXOT Positioning */}
                    <div className="p-4 bg-oxot-gold/10 rounded-lg border-l-4 border-l-oxot-gold">
                        <div className="flex items-center gap-2 mb-3">
                            <Target className="text-oxot-gold" size={18} />
                            <h4 className="text-white font-medium">OXOT Strategic Positioning</h4>
                        </div>
                        <p className="text-xs text-oxot-gold mb-3 italic">"{GTM_DATA.oxotAlignment.positioning}"</p>

                        <div className="space-y-2">
                            {GTM_DATA.oxotAlignment.differentiators.map((d, i) => (
                                <div key={i} className="p-2 bg-black/30 rounded">
                                    <div className="text-white text-xs font-medium">{d.point}</div>
                                    <div className="text-grey text-[10px]">{d.detail}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function TeamServiceCard({ team, teamData, color }: { team: string; teamData: any; color: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-xl overflow-hidden"
            style={{ borderTop: `3px solid ${color}` }}
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-5 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-white font-semibold mb-1">{teamData.name}</div>
                        <div className="text-xs" style={{ color }}>{teamData.tagline}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-grey">{teamData.services.length} services</span>
                        <ChevronDown className={`text-grey transition-transform ${expanded ? 'rotate-180' : ''}`} size={16} />
                    </div>
                </div>
            </button>

            {expanded && (
                <div className="border-t border-white/10 p-5 space-y-4">
                    {teamData.services.map((service: any, i: number) => (
                        <div key={i} className="p-4 bg-black/30 rounded-lg">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="p-2 rounded" style={{ backgroundColor: `${color}20` }}>
                                    <CheckCircle2 size={16} style={{ color }} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-medium text-sm">{service.name}</div>
                                    <div className="text-grey text-xs mt-1">{service.fit}</div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3 text-xs">
                                <div className="p-2 bg-red-500/10 rounded">
                                    <div className="text-red-400 font-medium mb-1">OFI Pain Point</div>
                                    <div className="text-grey">{service.ofiNeed}</div>
                                </div>
                                <div className="p-2 bg-green-500/10 rounded">
                                    <div className="text-green-400 font-medium mb-1">OXOT Deliverable</div>
                                    <div className="text-grey">{service.deliverable}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function AttackScenarioCard({ scenario }: { scenario: typeof GTM_DATA.attackScenarios[0] }) {
    return (
        <div className={`p-4 rounded-lg border-l-4 ${scenario.severity === 'CRITICAL' ? 'bg-red-500/10 border-l-red-500' : 'bg-orange-500/10 border-l-orange-500'
            }`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{scenario.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${scenario.severity === 'CRITICAL' ? 'text-red-400 bg-red-500/20' : 'text-orange-400 bg-orange-500/20'
                    }`}>{scenario.severity}</span>
            </div>
            <div className="space-y-1 text-xs">
                <div><span className="text-grey">Target:</span> <span className="text-white">{scenario.target}</span></div>
                <div><span className="text-grey">Attack:</span> <span className="text-white">{scenario.attack}</span></div>
                <div><span className="text-grey">Impact:</span> <span className="text-red-400">{scenario.impact}</span></div>
                <div className="pt-2 border-t border-white/10">
                    <span className="text-oxot-gold text-[10px]">OXOT Coverage: {scenario.coverage}</span>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function OXOTGTMStrategy() {
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
                        <Target className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">GO-TO-MARKET STRATEGY</span>
                    </div>
                    <PageHeader
                        title="OXOT ↔ OFI Strategic Alignment"
                        subtitle="Comprehensive GTM strategy for positioning OXOT as OFI's specialized OT/ICS security partner - complementing Mindsprint's IT-focused MSSP capabilities"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Executive Summary */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8 border-l-4 border-l-oxot-gold">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Sparkles size={20} className="text-oxot-gold" />
                        Executive Summary
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-black/30 rounded-lg text-center">
                            <div className="text-2xl font-bold text-white">{GTM_DATA.executive.facilities}</div>
                            <div className="text-[10px] text-grey">Global Facilities</div>
                        </div>
                        <div className="p-3 bg-black/30 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-400">{GTM_DATA.executive.growth}</div>
                            <div className="text-[10px] text-grey">EBIT Growth</div>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg text-center">
                            <div className="text-lg font-bold text-red-400">{GTM_DATA.executive.urgency}</div>
                            <div className="text-[10px] text-grey">Regulatory Deadlines</div>
                        </div>
                    </div>
                    <div className="p-3 bg-oxot-gold/10 rounded-lg">
                        <p className="text-white text-sm">
                            <strong>OFI is preparing for a London Stock Exchange IPO</strong> while simultaneously navigating
                            NIS2 Directive and EUDR compliance deadlines. Their existing partner <strong>Mindsprint</strong>
                            (formerly Olam IT) excels at IT/enterprise security but lacks specialized OT/ICS capabilities.
                            <strong className="text-oxot-gold"> OXOT fills this gap as the dedicated industrial cybersecurity specialist.</strong>
                        </p>
                    </div>
                </div>
            </ScrollReveal>

            {/* Partner Gap Analysis */}
            <ScrollReveal>
                <PartnerGapAnalysis />
            </ScrollReveal>

            {/* Team Services */}
            <ScrollReveal>
                <div className="mb-8">
                    <h3 className="text-sm font-mono text-oxot-gold mb-4">OXOT SERVICE ALIGNMENT</h3>
                    <div className="space-y-4">
                        <TeamServiceCard team="gold" teamData={GTM_DATA.goldTeam} color="#eab308" />
                        <TeamServiceCard team="blue" teamData={GTM_DATA.blueTeam} color="#3b82f6" />
                        <TeamServiceCard team="red" teamData={GTM_DATA.redTeam} color="#ef4444" />
                    </div>
                </div>
            </ScrollReveal>

            {/* Attack Scenarios */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-400" />
                        Priority Attack Scenarios (Mindsprint Coverage Gaps)
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {GTM_DATA.attackScenarios.map((scenario, i) => (
                            <AttackScenarioCard key={i} scenario={scenario} />
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Stakeholders */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Users size={20} className="text-oxot-gold" />
                        Target Stakeholders
                    </h3>
                    <div className="space-y-3">
                        {GTM_DATA.stakeholders.map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-full rounded ${s.priority === 'HIGH' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                    <div>
                                        <div className="text-white font-medium text-sm">{s.name}</div>
                                        <div className="text-oxot-blue text-xs">{s.title}</div>
                                    </div>
                                </div>
                                <div className="text-grey text-xs max-w-md text-right">{s.angle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-oxot-gold" />
                        Engagement Timeline
                    </h3>
                    <div className="relative">
                        <div className="absolute left-16 top-0 bottom-0 w-px bg-oxot-gold/30" />
                        <div className="space-y-4">
                            {GTM_DATA.timeline.map((t, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-16 text-oxot-gold font-mono text-xs text-right">{t.date}</div>
                                    <div className="w-3 h-3 rounded-full bg-oxot-gold relative z-10" />
                                    <div className="flex-1 p-3 bg-black/30 rounded-lg text-white text-sm">{t.milestone}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* ROI Case */}
            <ScrollReveal>
                <div className="p-6 bg-gradient-to-r from-oxot-gold/20 to-transparent rounded-xl border border-oxot-gold/30">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 size={20} className="text-oxot-gold" />
                        ROI Business Case
                    </h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="p-3 bg-red-500/10 rounded-lg text-center">
                            <div className="text-lg font-bold text-red-400">{GTM_DATA.roiCase.ransomwareCost}</div>
                            <div className="text-[10px] text-grey">Ransomware Impact</div>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg text-center">
                            <div className="text-lg font-bold text-red-400">{GTM_DATA.roiCase.recallCost}</div>
                            <div className="text-[10px] text-grey">Contamination Recall</div>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg text-center">
                            <div className="text-lg font-bold text-red-400">{GTM_DATA.roiCase.eudrBanCost}</div>
                            <div className="text-[10px] text-grey">EUDR Non-Compliance</div>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-400">FRACTION</div>
                            <div className="text-[10px] text-grey">OXOT Investment</div>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-black/30 rounded-lg">
                        <p className="text-oxot-gold text-sm font-medium">{GTM_DATA.roiCase.valueProposition}</p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
