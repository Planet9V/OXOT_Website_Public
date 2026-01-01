'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import VoiceReports from '@/components/osint/VoiceReports';
import PrintableReports from '@/components/osint/PrintableReports';
import {
    Building2, Users, Globe, Server, Package, AlertTriangle,
    MapPin, Phone, Mail, Briefcase, Shield, TrendingUp,
    ChevronDown, ExternalLink, Network, Database, Lock,
    Cpu, Factory, Wheat, Coffee, Leaf, Nut,
    DollarSign, Calendar, Award, FileText, Crosshair, Skull, Milk
} from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

import GlobalOperationsMap from '@/components/osint/GlobalOperationsMap';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';
import OFIOrganizationMap from '@/components/osint/OFIOrganizationMap';



// Dynamic import for globe (client-side only) - REMOVED for Flat Map
// const Globe3D = dynamic(() => import('react-globe.gl'), { ssr: false });

// =============================================================================
// OFI COMPANY DATA - Real OSINT Profile (Olam Food Ingredients)
// =============================================================================
const OFI_DATA = {
    company: {
        name: "Olam Food Ingredients (ofi)",
        shortName: "ofi",
        industry: "Food Ingredients & Agricultural Processing",
        sector: "Agriculture & Food Manufacturing",
        founded: "1989 (Olam Group)",
        incorporated: "Singapore",
        headquarters: "Singapore (Global) / London (Commercial)",
        employees: "12,000+",
        revenue: "S$10.5B (2024)",
        ebit: "S$1.07B (2024)",
        parent: "Olam Group Limited",
        website: "www.ofi.com",
        classification: "OSINT // UNCLASSIFIED // COMMERCIAL",
        reportDate: "2025-01-01",
        reportId: "OSINT-OFI-2025-001"
    },
    locations: [
        // European Hub
        { name: "Koog aan de Zaan", type: "Cocoa HQ", lat: 52.4600, lng: 4.8100, employees: 350, color: '#FFD700', region: "Europe", address: "Stationsstraat 76, 1541 LJ" },
        { name: "Amsterdam", type: "Innovation Hub", lat: 52.3676, lng: 4.9041, employees: 120, color: '#06b6d4', region: "Europe", address: "Joan Muyskenweg 30" },
        { name: "Mannheim", type: "Cocoa Processing", lat: 49.4875, lng: 8.4660, employees: 200, color: '#3b82f6', region: "Europe", address: "Neckarvorlandstraße 36-42" },
        { name: "Palencia", type: "Soluble Coffee", lat: 42.0126, lng: -4.5286, employees: 180, color: '#f59e0b', region: "Europe", address: "Paseo Padre Faustino Calvo" },
        // Americas
        { name: "Fresno, CA", type: "Spices HQ", lat: 36.7378, lng: -119.7871, employees: 150, color: '#22c55e', region: "Americas", address: "205 E. River Park Circle" },
        { name: "Hanford, CA", type: "Garlic Processing", lat: 36.3275, lng: -119.6457, employees: 400, color: '#8b5cf6', region: "Americas", address: "9301 E. Lacey Blvd" },
        { name: "Bolingbrook, IL", type: "Cocoa Processing", lat: 41.6986, lng: -88.0684, employees: 180, color: '#ec4899', region: "Americas", address: "990 Veterans Parkway" },
        { name: "Linhares, Brazil", type: "Soluble Coffee", lat: -19.3919, lng: -40.0713, employees: 220, color: '#f97316', region: "Americas", address: "Rod. Gov. Mario Covas 220" },
        { name: "Toronto", type: "Club Coffee", lat: 43.6532, lng: -79.3832, employees: 150, color: '#14b8a6', region: "Americas", address: "55 Carrier Drive" },
        // APAC
        { name: "Singapore", type: "Global HQ", lat: 1.3521, lng: 103.8198, employees: 800, color: '#FFD700', region: "APAC", address: "342 Jalan Boon Lay" },
        { name: "Long An, Vietnam", type: "Soluble Coffee", lat: 10.5417, lng: 106.4139, employees: 450, color: '#06b6d4', region: "APAC", address: "Lot L1, Nhut Chanh Industrial Park" },
        { name: "Tokoroa, NZ", type: "Dairy Processing", lat: -38.2167, lng: 175.8667, employees: 180, color: '#22c55e', region: "APAC", address: "Corner Wiltsdown Road & SH1" },
        // Africa
        { name: "Abidjan", type: "Cocoa Processing", lat: 5.3600, lng: -4.0083, employees: 320, color: '#eab308', region: "Africa", address: "Zone Industrielle de Vridi" },
        { name: "Kumasi, Ghana", type: "Cocoa Processing", lat: 6.6884, lng: -1.6244, employees: 280, color: '#d97706', region: "Africa", address: "Plot 7-9 Kaase Industrial Area" },
    ],
    leadership: [
        { name: "A. Shekhar", title: "Chief Executive Officer", tenure: "2020-Present", background: "Former President, Olam Cocoa", linkedin: true },
        { name: "Rishi Kalra", title: "Chief Financial Officer", tenure: "2021-Present", background: "Ex-McKinsey, Olam Treasury", linkedin: true },
        { name: "Niall FitzGerald", title: "Chairman of the Board", tenure: "2020-Present", background: "Former Chairman, Unilever", linkedin: true },
        { name: "Joost van der Hoogte", title: "Site Director, Koog aan de Zaan", tenure: "2018-Present", background: "deZaan Operations", linkedin: true },
        { name: "Pilar Darre", title: "Head of Amsterdam CSC", tenure: "2021-Present", background: "Innovation & Customer Solutions", linkedin: true },
        { name: "Susanne Folkerts", title: "Global Ops Head of Sustainability", tenure: "2019-Present", background: "Circular Economy & Decarbonization", linkedin: true },
    ],
    orgStructure: {
        ceo: "A. Shekhar",
        directReports: [
            { title: "CFO", name: "Rishi Kalra", departments: ["Finance", "Investor Relations", "Treasury", "Risk Management"] },
            { title: "COO", name: "Operations Lead", departments: ["Manufacturing", "Supply Chain", "Logistics", "Quality"] },
            { title: "CTO", name: "Technology Lead", departments: ["IT Infrastructure", "Digital Innovation", "Cybersecurity", "Data Analytics"] },
            { title: "Chief Sustainability Officer", name: "Sustainability Lead", departments: ["ESG", "Net Zero", "AtSource Platform", "EUDR Compliance"] },
            { title: "President, Cocoa", name: "Cocoa President", departments: ["deZaan", "BT Cocoa", "Unicao", "Global Cocoa Trading"] },
        ]
    },
    platforms: [
        { name: "Cocoa", icon: "🍫", description: "deZaan premium cocoa powders, butters, and liquors", facilities: 12, countries: ["Netherlands", "Germany", "USA", "Singapore", "Indonesia", "Côte d'Ivoire", "Ghana", "Brazil"] },
        { name: "Coffee", icon: "☕", description: "Soluble coffee, green beans, and roast/ground", facilities: 8, countries: ["Vietnam", "Spain", "Brazil", "Canada", "USA"] },
        { name: "Spices", icon: "🌶️", description: "Garlic, onion, paprika, pepper - world's largest supplier", facilities: 15, countries: ["USA", "Vietnam", "India", "China"] },
        { name: "Nuts", icon: "🥜", description: "Almonds, cashews, peanuts - Hughson Nut brand", facilities: 18, countries: ["USA", "Vietnam", "India", "Australia"] },
        { name: "Dairy", icon: "🥛", description: "Functional dairy ingredients and milk powders", facilities: 4, countries: ["New Zealand", "Malaysia", "Indonesia"] },
    ],
    techStack: {
        erp: [
            { name: "SAP S/4HANA", category: "ERP", criticality: "Critical", version: "2023" },
            { name: "Oracle Financials", category: "Finance", criticality: "High", version: "21c" },
        ],
        manufacturing: [
            { name: "Braincube AI", category: "Smart Manufacturing", criticality: "Critical", notes: "6.5% yield increase, 25% throughput" },
            { name: "Rockwell ControlLogix", category: "PLC Systems", criticality: "Critical" },
            { name: "Siemens S7-1500", category: "PLC Systems", criticality: "Critical" },
            { name: "Siemens SIMATIC", category: "Process Automation", criticality: "High" },
        ],
        infrastructure: [
            { name: "Microsoft Azure", category: "Cloud Primary", criticality: "Critical" },
            { name: "AWS", category: "Cloud Secondary", criticality: "High" },
            { name: "VMware vSphere", category: "Virtualization", criticality: "High" },
        ],
        security: [
            { name: "Mindsprint GuardianEye", category: "MSSP/SOC", criticality: "Critical" },
            { name: "Claroty/Nozomi", category: "OT Security", criticality: "Critical" },
            { name: "Splunk Enterprise", category: "SIEM", criticality: "High" },
            { name: "CrowdStrike Falcon", category: "EDR", criticality: "High" },
        ],
        digital: [
            { name: "AtSource", category: "Sustainability Platform", criticality: "High" },
            { name: "Carbon Scenario Planner", category: "ESG Tools", criticality: "Medium" },
            { name: "Celonis Process Mining", category: "Operations Analytics", criticality: "Medium" },
        ]
    },
    subsidiaries: [
        { name: "Olam Cocoa B.V.", ownership: "100%", country: "Netherlands", focus: "European Cocoa Operations (deZaan)" },
        { name: "Olam Cocoa Deutschland GmbH", ownership: "100%", country: "Germany", focus: "Mannheim Processing" },
        { name: "BT Cocoa", ownership: "100%", country: "Indonesia", focus: "Asian Cocoa Processing" },
        { name: "Unicao", ownership: "100%", country: "Côte d'Ivoire", focus: "West African Origin Processing" },
        { name: "Seda Outspan Iberia", ownership: "100%", country: "Spain", focus: "Soluble Coffee Manufacturing" },
        { name: "Club Coffee", ownership: "100%", country: "Canada", focus: "Single-Serve & Roasting" },
        { name: "Olde Thompson", ownership: "100%", country: "USA", focus: "Retail Spices" },
        { name: "Hughson Nut", ownership: "100%", country: "USA", focus: "Almond Processing" },
        { name: "ofi Services", ownership: "100%", country: "Netherlands", focus: "Digital Transformation & AI" },
    ],
    ventures: [
        { name: "Mindsprint (OTBS)", type: "Subsidiary", focus: "Cybersecurity (GuardianEye), ServiceNow, SAP" },
        { name: "Terrascope", type: "Spin-off", focus: "Carbon Accounting SaaS Platform" },
        { name: "Jiva", type: "Incubation", focus: "Agri-tech for Smallholder Farmers" },
        { name: "AtSource", type: "Internal Platform", focus: "Supply Chain Sustainability Tracking" },
    ],
    riskProfile: {
        overall: "HIGH",
        categories: [
            { name: "Cyber Exposure", level: "HIGH", details: "120+ OT facilities, Braincube AI integration, direct PLC access" },
            { name: "Supply Chain", level: "HIGH", details: "Complex multi-tier dependencies, EUDR compliance requirements" },
            { name: "Regulatory (NIS2)", level: "MEDIUM", details: "EU facilities in NL, DE, ES fall under NIS2 'Important Entities'" },
            { name: "Third-Party Risk", level: "HIGH", details: "Braincube AI has direct PLC access - supply chain attack vector" },
            { name: "Geopolitical", level: "MEDIUM", details: "Heavy presence in Côte d'Ivoire, Vietnam, Indonesia" },
        ]
    },
    certifications: ["IEC 62443", "FSSC 22000", "ISO 9001", "Rainforest Alliance", "UTZ", "Fair Trade"],
    sectors: ["Food & Beverage", "Agriculture", "Critical Infrastructure", "Manufacturing"],
    markets: ["Europe (Primary)", "North America", "Asia-Pacific", "Africa", "Middle East"],
};

// =============================================================================
// COMPONENT: Organization Chart
// =============================================================================
function OrgChart() {
    const { orgStructure } = OFI_DATA;

    return (
        <div className="glass-panel p-8 rounded-xl">
            {/* CEO */}
            <div className="flex flex-col items-center mb-8">
                <div className="bg-gradient-to-br from-oxot-gold/20 to-transparent border border-oxot-gold/40 rounded-xl p-6 text-center min-w-[240px]">
                    <div className="text-oxot-gold text-xs font-mono mb-1">CHIEF EXECUTIVE OFFICER</div>
                    <div className="text-white font-bold text-lg">{orgStructure.ceo}</div>
                </div>
                <div className="w-px h-8 bg-white/20" />
            </div>

            {/* C-Suite */}
            <div className="flex flex-wrap justify-center gap-4">
                {orgStructure.directReports.map((exec, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center min-w-[180px] hover:border-oxot-blue/40 transition-colors">
                            <div className="text-oxot-blue text-xs font-mono mb-1">{exec.title}</div>
                            <div className="text-white font-semibold text-sm mb-2">{exec.name}</div>
                            <div className="flex flex-wrap gap-1 justify-center">
                                {exec.departments.slice(0, 2).map((dept, j) => (
                                    <span key={j} className="text-[9px] px-2 py-0.5 bg-white/5 rounded text-grey">{dept}</span>
                                ))}
                                {exec.departments.length > 2 && (
                                    <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded text-grey">+{exec.departments.length - 2}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// =============================================================================
// COMPONENT: Global Presence Map
// =============================================================================


// =============================================================================
// COMPONENT: Business Platforms
// =============================================================================
function BusinessPlatforms() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFI_DATA.platforms.map((platform, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel p-5 rounded-xl"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{platform.icon}</span>
                        <div className="text-oxot-gold font-mono text-sm">{platform.facilities} sites</div>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{platform.name}</h4>
                    <p className="text-grey text-xs leading-relaxed mb-3">{platform.description}</p>
                    <div className="flex flex-wrap gap-1">
                        {platform.countries.slice(0, 4).map((country, j) => (
                            <span key={j} className="text-[9px] px-2 py-0.5 bg-oxot-blue/10 text-oxot-blue rounded">{country}</span>
                        ))}
                        {platform.countries.length > 4 && (
                            <span className="text-[9px] px-2 py-0.5 bg-white/5 text-grey rounded">+{platform.countries.length - 4}</span>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// =============================================================================
// COMPONENT: Technology Stack Grid
// =============================================================================
function TechStackGrid() {
    const categories = [
        { key: 'manufacturing', label: 'Manufacturing & OT', icon: <Factory size={16} /> },
        { key: 'erp', label: 'ERP & Finance', icon: <Database size={16} /> },
        { key: 'infrastructure', label: 'IT Infrastructure', icon: <Server size={16} /> },
        { key: 'security', label: 'Cybersecurity', icon: <Shield size={16} /> },
        { key: 'digital', label: 'Digital Platforms', icon: <Cpu size={16} /> },
    ];

    const getCriticalityColor = (level: string) => {
        switch (level) {
            case 'Critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
            case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
            default: return 'text-grey bg-white/5 border-white/10';
        }
    };

    return (
        <div className="space-y-6">
            {categories.map((cat) => (
                <div key={cat.key} className="glass-panel p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-oxot-blue">{cat.icon}</span>
                        <h4 className="text-sm font-mono text-white">{cat.label}</h4>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {(OFI_DATA.techStack as any)[cat.key].map((tech: any, i: number) => (
                            <div key={i} className="bg-black/30 p-3 rounded-lg border border-white/5">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-white text-sm font-medium">{tech.name}</span>
                                    <span className={`text-[9px] px-2 py-0.5 rounded border ${getCriticalityColor(tech.criticality)}`}>
                                        {tech.criticality}
                                    </span>
                                </div>
                                <div className="text-grey text-xs">{tech.category}</div>
                                {tech.notes && <div className="text-[10px] text-oxot-gold mt-1">{tech.notes}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// =============================================================================
// COMPONENT: Leadership Profiles
// =============================================================================
function LeadershipProfiles() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFI_DATA.leadership.map((person, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel p-5 rounded-xl hover:border-oxot-gold/30 transition-colors"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-oxot-gold/30 to-oxot-blue/20 flex items-center justify-center text-white font-bold text-lg">
                            {person.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{person.name}</h4>
                            <div className="text-oxot-gold text-xs font-mono mb-2">{person.title}</div>
                            <div className="text-grey text-xs mb-2">{person.background}</div>
                            <div className="flex items-center gap-2 text-[10px] text-grey">
                                <Calendar size={10} />
                                <span>{person.tenure}</span>
                                {person.linkedin && (
                                    <span className="text-oxot-blue flex items-center gap-1">
                                        <ExternalLink size={10} /> LinkedIn
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// =============================================================================
// COMPONENT: Subsidiaries Tree
// =============================================================================
function SubsidiariesTree() {
    return (
        <div className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Subsidiaries */}
                <div className="glass-panel p-6 rounded-xl">
                    <h4 className="text-sm font-mono text-oxot-gold mb-4 flex items-center gap-2">
                        <Building2 size={16} /> KEY SUBSIDIARIES
                    </h4>
                    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {OFI_DATA.subsidiaries.map((sub, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                <div>
                                    <div className="text-white text-sm">{sub.name}</div>
                                    <div className="text-grey text-xs">{sub.focus} • {sub.country}</div>
                                </div>
                                <div className="text-oxot-blue font-mono text-sm">{sub.ownership}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ventures & Digital */}
                <div className="glass-panel p-6 rounded-xl">
                    <h4 className="text-sm font-mono text-oxot-gold mb-4 flex items-center gap-2">
                        <Network size={16} /> VENTURES & DIGITAL PLATFORMS
                    </h4>
                    <div className="space-y-2">
                        {OFI_DATA.ventures.map((venture, i) => (
                            <div key={i} className="p-3 bg-black/30 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-white text-sm font-medium">{venture.name}</div>
                                    <span className="text-[10px] px-2 py-0.5 bg-oxot-blue/10 text-oxot-blue rounded">
                                        {venture.type}
                                    </span>
                                </div>
                                <div className="text-grey text-xs">{venture.focus}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// COMPONENT: Risk Assessment
// =============================================================================
function RiskAssessment() {
    const getRiskColor = (level: string) => {
        switch (level) {
            case 'HIGH': return 'text-red-400 border-red-500/50 bg-red-500/10';
            case 'MEDIUM-HIGH': return 'text-orange-400 border-orange-500/50 bg-orange-500/10';
            case 'MEDIUM': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
            case 'LOW': return 'text-green-400 border-green-500/50 bg-green-500/10';
            default: return 'text-grey border-white/20 bg-white/5';
        }
    };

    return (
        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-mono text-white flex items-center gap-2">
                    <AlertTriangle className="text-red-400" size={20} />
                    RISK ASSESSMENT SUMMARY
                </h4>
                <span className={`px-4 py-1 rounded-full border font-mono text-sm ${getRiskColor(OFI_DATA.riskProfile.overall)}`}>
                    {OFI_DATA.riskProfile.overall}
                </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {OFI_DATA.riskProfile.categories.map((risk, i) => (
                    <div key={i} className="bg-black/40 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{risk.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded border ${getRiskColor(risk.level)}`}>
                                {risk.level}
                            </span>
                        </div>
                        <p className="text-grey text-xs">{risk.details}</p>
                    </div>
                ))}
            </div>

            {/* Key Finding Alert */}
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-400 mt-0.5" size={18} />
                    <div>
                        <h5 className="text-red-400 font-semibold text-sm mb-1">CRITICAL FINDING: Braincube Third-Party Risk</h5>
                        <p className="text-grey text-xs leading-relaxed">
                            Braincube AI has direct PLC access for manufacturing optimization. This creates a potential supply chain attack vector
                            similar to SolarWinds. Risks include AI model poisoning, command injection to PLCs, and data exfiltration of proprietary formulas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// COMPONENT: Report Modules Navigation
// =============================================================================
function ReportModules() {
    const modules = [
        {
            title: "EXECUTIVE REPORT",
            desc: "Consolidated Intelligence & Corporate Anatomy",
            icon: <FileText size={24} />,
            href: "/corporate/osint-report/executive-report",
            color: "text-cyan-400",
            border: "border-cyan-400/30"
        },
        {
            title: "SECURITY HUB",
            desc: "Comprehensive Risk Assessment & Threat Modeling",
            icon: <Shield size={24} />,
            href: "/corporate/osint-report/security",
            color: "text-oxot-blue",
            border: "border-oxot-blue/30"
        },
        {
            title: "RED TEAM DOSSIER",
            desc: "Attacker View & Threat Actor Intelligence",
            icon: <Skull size={24} />,
            href: "/corporate/osint-report/security/attacker-view",
            color: "text-red-500",
            border: "border-red-500/30"
        },
        {
            title: "GROUP STRUCTURE",
            desc: "Subsidiary Analysis & Operational Footprint",
            icon: <Building2 size={24} />,
            href: "/corporate/osint-report/group-structure",
            color: "text-emerald-400",
            border: "border-emerald-400/30"
        },
        {
            title: "STRUCTURE INTEL",
            desc: "Corporate Hierarchy & Entity Analysis",
            icon: <Building2 size={24} />,
            href: "/corporate/osint-report/structure-intelligence",
            color: "text-blue-400",
            border: "border-blue-400/30"
        },
        {
            title: "STRATEGIC MIND MAP",
            desc: "Interactive Alignment & Logic Visualization",
            icon: <Network size={24} />,
            href: "/corporate/osint-report/mind-map",
            color: "text-purple-400",
            border: "border-purple-400/30"
        },
        {
            title: "GTM STRATEGY",
            desc: "Go-to-Market Positioning & Entry Points",
            icon: <Crosshair size={24} />,
            href: "/corporate/osint-report/gtm",
            color: "text-oxot-gold",
            border: "border-oxot-gold/30"
        },
        {
            title: "CYBER THREAT GTM",
            desc: "Industrial Cyber Resilience Strategy",
            icon: <Crosshair size={24} />,
            href: "/corporate/osint-report/cyber-threat-gtm",
            color: "text-orange-400",
            border: "border-orange-400/30"
        },
        {
            title: "TECHNOLOGY INTEL",
            desc: "Inferred Technology Stack from OSINT",
            icon: <Cpu size={24} />,
            href: "/corporate/osint-report/tech-intel",
            color: "text-purple-400",
            border: "border-purple-400/30"
        },
        {
            title: "BRAINCUBE ANALYSIS",
            desc: "IIoT Platform Security & Digital Twin Risk",
            icon: <Cpu size={24} />,
            href: "/corporate/osint-report/braincube-analysis",
            color: "text-blue-400",
            border: "border-blue-400/30"
        },
        {
            title: "THIRD PARTY RISK",
            desc: "Braincube Supply Chain Attack Vectors",
            icon: <AlertTriangle size={24} />,
            href: "/corporate/osint-report/braincube-third-party-risk",
            color: "text-red-400",
            border: "border-red-400/30"
        },
        {
            title: "DAIRY ARCHITECTURE",
            desc: "Facility Engineering & Process Control",
            icon: <Milk size={24} />,
            href: "/corporate/osint-report/dairy-facility-architecture",
            color: "text-cyan-300",
            border: "border-cyan-300/30"
        },
        {
            title: "SHANGHAI IEC 62443",
            desc: "CSC FEED Industrial Security Requirements",
            icon: <FileText size={24} />,
            href: "/corporate/osint-report/shanghai-iec62443",
            color: "text-emerald-500",
            border: "border-emerald-500/30"
        },
        {
            title: "NIS2 COMPLIANCE",
            desc: "EU Cybersecurity Directive Requirements",
            icon: <Shield size={24} />,
            href: "/corporate/osint-report/nis2-requirements",
            color: "text-red-500",
            border: "border-red-500/50"
        },
        {
            title: "AI PARTNERSHIPS",
            desc: "Cybersecurity & AI Technology Alliances",
            icon: <Network size={24} />,
            href: "/corporate/osint-report/ai-partnerships",
            color: "text-violet-400",
            border: "border-violet-400/30"
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {modules.map((mod, i) => (
                <Link href={mod.href} key={i}>
                    <motion.div
                        whileHover={{ y: -5 }}
                        className={`glass-panel p-6 rounded-xl border ${mod.border} group cursor-pointer h-full relative overflow-hidden`}
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${mod.color}`}>
                            {mod.icon}
                        </div>
                        <div className={`mb-4 ${mod.color}`}>{mod.icon}</div>
                        <h3 className="text-white font-bold font-mono text-sm mb-2 group-hover:text-oxot-gold transition-colors">
                            {mod.title}
                        </h3>
                        <p className="text-grey text-xs leading-relaxed">
                            {mod.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-grey group-hover:text-white transition-colors">
                            ACCESS_MODULE <ExternalLink size={10} />
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function OSINTReportView() {
    return (
        <div className="min-h-screen">
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-black/60 border-b border-oxot-gold/30 py-2 px-4 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <span className="text-oxot-gold font-mono text-xs tracking-widest">{OFI_DATA.company.classification}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Report ID: {OFI_DATA.company.reportId}</span>
                    <span>Date: {OFI_DATA.company.reportDate}</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="min-h-[60vh] flex flex-col justify-center mb-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="text-oxot-gold" size={20} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">OPEN SOURCE INTELLIGENCE REPORT</span>
                    </div>
                    <PageHeader
                        title={OFI_DATA.company.name}
                        subtitle={`${OFI_DATA.company.industry} • ${OFI_DATA.company.headquarters}`}
                        variant="hero"
                        accent="gold"
                    />

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        {[
                            { label: "Employees", value: OFI_DATA.company.employees, icon: <Users size={16} /> },
                            { label: "Revenue", value: OFI_DATA.company.revenue, icon: <DollarSign size={16} /> },
                            { label: "EBIT 2024", value: OFI_DATA.company.ebit, icon: <TrendingUp size={16} /> },
                            { label: "Facilities", value: "120+ Global", icon: <Globe size={16} /> },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="glass-panel p-4 rounded-xl text-center"
                            >
                                <div className="flex justify-center mb-2 text-oxot-gold">{stat.icon}</div>
                                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-xs text-grey uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center mt-16"
                >
                    <span className="text-grey text-xs font-mono mb-2">SCROLL FOR FULL REPORT</span>
                    <ChevronDown className="text-oxot-gold animate-bounce" size={24} />
                </motion.div>
            </section>

            {/* Section: Report Modules Navigation */}
            <ScrollReveal>
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Network className="text-oxot-gold" size={20} />
                        <h2 className="heading-2 text-white">INTELLIGENCE MODULES</h2>
                    </div>
                    <ReportModules />
                </div>
            </ScrollReveal>


            {/* Section: Voice Reports */}
            <ScrollReveal>
                <section className="mb-20">
                    <VoiceReports />
                </section>
            </ScrollReveal>

            {/* Section: Printable Reports */}
            <ScrollReveal>
                <section className="mb-20">
                    <PrintableReports />
                </section>
            </ScrollReveal>

            {/* Section: Organization Structure */}
            <ScrollReveal>
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="text-oxot-gold" size={20} />
                        <h2 className="heading-2 text-white">ORGANIZATION STRUCTURE</h2>
                    </div>
                    <OrgChart />
                </section>
            </ScrollReveal>


            {/* Section: Global Presence */}
            <ScrollReveal>
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Globe className="text-oxot-gold" size={20} />
                        <h2 className="heading-2 text-white">GEOSPATIAL INTELLIGENCE GRID</h2>
                    </div>
                    <GlobalOperationsMap />
                </section>
            </ScrollReveal>

            {/* Section: Business Platforms */}
            <ScrollReveal>
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Package className="text-oxot-gold" size={20} />
                        <h2 className="heading-2 text-white">BUSINESS PLATFORMS</h2>
                    </div>
                    <BusinessPlatforms />
                </section>
            </ScrollReveal>

            {/* Section: Technology Stack */}
            <ScrollReveal>
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Server className="text-oxot-gold" size={20} />
                        <h2 className="heading-2 text-white">TECHNOLOGY STACK</h2>
                    </div>
                    <TechStackGrid />
                </section>
            </ScrollReveal>

            {/* Section: Key Personnel */}
            <ScrollReveal>
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Briefcase className="text-oxot-gold" size={20} />
                        <h2 className="heading-2 text-white">KEY PERSONNEL</h2>
                    </div>
                    <LeadershipProfiles />
                </section>
            </ScrollReveal>

            {/* Section: Corporate Structure */}
            <ScrollReveal>
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <Building2 className="text-oxot-gold" size={20} />
                        <h2 className="heading-2 text-white">SUBSIDIARIES & VENTURES</h2>
                    </div>
                    <SubsidiariesTree />
                </section>
            </ScrollReveal>

            {/* Section: Risk Assessment */}
            <ScrollReveal>
                <section className="mb-20">
                    <RiskAssessment />
                </section>
            </ScrollReveal>

            {/* Section: Certifications & Markets */}
            <ScrollReveal>
                <section className="mb-20">
                    <div className="glass-panel p-6 rounded-xl">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-sm font-mono text-oxot-gold mb-4">CERTIFICATIONS</h4>
                                <div className="flex flex-wrap gap-2">
                                    {OFI_DATA.certifications.map((cert, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs">
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-mono text-oxot-gold mb-4">SECTORS</h4>
                                <div className="flex flex-wrap gap-2">
                                    {OFI_DATA.sectors.map((sector, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-oxot-blue/10 border border-oxot-blue/30 rounded-full text-oxot-blue text-xs">
                                            {sector}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-mono text-oxot-gold mb-4">GEOGRAPHIC MARKETS</h4>
                                <div className="flex flex-wrap gap-2">
                                    {OFI_DATA.markets.map((market, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-grey text-xs">
                                            {market}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Footer */}
            <div className="border-t border-white/10 pt-8 pb-16">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • OSINT Collection Protocol v2.4
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Sources: Public Records, OSINT, Commercial Data</span>
                        <span className="text-oxot-gold">END OF REPORT</span>
                    </div>
                </div>
            </div>

            {/* ElevenLabs ConvAI Widget */}
            <Script
                src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                strategy="afterInteractive"
            />
            {/* @ts-expect-error - Custom element not fully typed in CI environment */}
            <elevenlabs-convai agent-id="agent_9601kdvywwtvfgx89pqyy9ex8s3h"></elevenlabs-convai>
        </div>
    );
}
