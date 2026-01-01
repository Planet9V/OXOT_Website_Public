'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Search, Briefcase, FileText, Users, Building2, ChevronDown, ChevronLeft,
    ExternalLink, Code, Server, Cloud, Database, Shield,
    Monitor, Cpu, Network, Lock, Zap
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

// =============================================================================
// INFERRED TECHNOLOGY DATA
// =============================================================================

const TECH_INTEL = {
    sources: [
        { type: 'Job Postings', confidence: 'HIGH', description: 'LinkedIn, Indeed, company careers' },
        { type: 'Publications', confidence: 'MEDIUM', description: 'Case studies, press releases, annual reports' },
        { type: 'Partnerships', confidence: 'HIGH', description: 'Vendor announcements, technology alliances' },
        { type: 'Use Cases', confidence: 'MEDIUM', description: 'Conference presentations, trade publications' },
    ],
    categories: [
        {
            id: 'erp',
            name: 'Enterprise Resource Planning',
            icon: Database,
            technologies: [
                { name: 'SAP S/4HANA', confidence: 95, source: 'Mindsprint Silver SAP Partner, job postings', status: 'CONFIRMED' },
                { name: 'SAP Cloud Private Edition (AWS)', confidence: 90, source: 'Mindsprint implementation notes', status: 'CONFIRMED' },
                { name: 'SAP Joule AI', confidence: 75, source: 'SAP partnership announcements', status: 'LIKELY' },
            ]
        },
        {
            id: 'ics',
            name: 'Industrial Control Systems',
            icon: Cpu,
            technologies: [
                { name: 'Rockwell PlantPAx DCS', confidence: 90, source: 'OFI_Attack.md, dairy architecture', status: 'CONFIRMED' },
                { name: 'Allen-Bradley ControlLogix', confidence: 85, source: 'OFI technology analysis', status: 'CONFIRMED' },
                { name: 'Siemens S7-1500 PLCs', confidence: 80, source: 'European facilities, job postings', status: 'LIKELY' },
                { name: 'AVEVA/Wonderware SCADA', confidence: 85, source: 'Dairy facility architecture document', status: 'CONFIRMED' },
                { name: 'EtherNet/IP Protocol', confidence: 90, source: 'NZ dairy architecture analysis', status: 'CONFIRMED' },
            ]
        },
        {
            id: 'iiot',
            name: 'Industrial IoT & AI',
            icon: Zap,
            technologies: [
                { name: 'Braincube IIoT Platform', confidence: 95, source: 'Press releases, 6.5% yield increase', status: 'CONFIRMED' },
                { name: 'Digital Twin (Product Clone)', confidence: 90, source: 'Braincube deployment documentation', status: 'CONFIRMED' },
                { name: 'IO-Link Smart Sensors', confidence: 80, source: 'Dairy automation architecture', status: 'LIKELY' },
                { name: 'AS-Interface Valve Control', confidence: 80, source: 'NZ dairy technical specs', status: 'LIKELY' },
            ]
        },
        {
            id: 'cloud',
            name: 'Cloud & Infrastructure',
            icon: Cloud,
            technologies: [
                { name: 'AWS (Primary Cloud)', confidence: 90, source: 'SAP S/4HANA deployment', status: 'CONFIRMED' },
                { name: 'Microsoft Azure', confidence: 75, source: 'AtSource platform, job postings', status: 'LIKELY' },
                { name: 'Nutanix Hybrid Cloud', confidence: 85, source: 'OFI_Attack.md analysis', status: 'CONFIRMED' },
                { name: 'Salesforce CRM', confidence: 80, source: 'Job postings, API references', status: 'LIKELY' },
            ]
        },
        {
            id: 'security',
            name: 'Cybersecurity',
            icon: Shield,
            technologies: [
                { name: 'GuardianEye (Mindsprint)', confidence: 95, source: 'Mindsprint product documentation', status: 'CONFIRMED' },
                { name: 'Claroty / Nozomi Networks', confidence: 60, source: 'Inferred OT security requirement', status: 'INFERRED' },
                { name: 'IEC 62443 Framework', confidence: 85, source: 'Shanghai CSC FEED requirements', status: 'CONFIRMED' },
            ]
        },
        {
            id: 'digital',
            name: 'Digital Platforms',
            icon: Monitor,
            technologies: [
                { name: 'AtSource (Traceability)', confidence: 95, source: 'Press releases, EUDR compliance', status: 'CONFIRMED' },
                { name: 'Olam Direct (Farmer App)', confidence: 95, source: '2.8M farmers documented', status: 'CONFIRMED' },
                { name: 'Agrotools (Brazil)', confidence: 85, source: 'Soy supplier compliance tool', status: 'CONFIRMED' },
                { name: 'Terrascope (Carbon)', confidence: 90, source: 'Nupo Ventures documentation', status: 'CONFIRMED' },
            ]
        },
    ],
    partners: [
        { name: 'Mindsprint', type: 'Technology Subsidiary', products: 'SAP, GuardianEye, AI ops' },
        { name: 'Braincube', type: 'IIoT Vendor', products: 'Manufacturing AI, Digital Twin' },
        { name: 'SAP', type: 'ERP Partner', products: 'S/4HANA, Integration Suite' },
        { name: 'Rockwell Automation', type: 'ICS Vendor', products: 'PlantPAx, ControlLogix, FactoryTalk' },
        { name: 'Siemens', type: 'ICS Vendor', products: 'S7 PLCs, TIA Portal' },
        { name: 'DeLaval / GEA', type: 'Dairy Equipment', products: 'Rotary platforms, milking systems' },
        { name: 'Alfa Laval', type: 'Processing Equipment', products: 'Separators, valves, heat exchangers' },
        { name: 'Tetra Pak', type: 'Packaging', products: 'Filling systems, tubular heat exchangers' },
    ],
    jobSignals: [
        { role: 'SAP S/4HANA Consultant', frequency: 'HIGH', signal: 'Active ERP modernization' },
        { role: 'OT Security Engineer', frequency: 'MEDIUM', signal: 'ICS security investment' },
        { role: 'Cloud Architect (AWS)', frequency: 'MEDIUM', signal: 'Cloud migration ongoing' },
        { role: 'Data Engineer (Braincube)', frequency: 'LOW', signal: 'IIoT platform expansion' },
        { role: 'Sustainability Analyst', frequency: 'HIGH', signal: 'EUDR/ESG compliance focus' },
    ]
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

function TechnologyCard({ tech }: { tech: { name: string; confidence: number; source: string; status: string } }) {
    const getStatusColor = () => {
        if (tech.status === 'CONFIRMED') return 'text-green-400 bg-green-500/20';
        if (tech.status === 'LIKELY') return 'text-yellow-400 bg-yellow-500/20';
        return 'text-grey bg-white/10';
    };

    return (
        <div className="p-3 bg-black/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">{tech.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${getStatusColor()}`}>{tech.status}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${tech.confidence >= 90 ? 'bg-green-500' :
                            tech.confidence >= 75 ? 'bg-yellow-500' : 'bg-grey'
                            }`}
                        style={{ width: `${tech.confidence}%` }}
                    />
                </div>
                <span className="text-xs text-grey">{tech.confidence}%</span>
            </div>
            <div className="text-grey text-[10px]">{tech.source}</div>
        </div>
    );
}

function CategorySection({ category, index }: { category: typeof TECH_INTEL.categories[0]; index: number }) {
    const [expanded, setExpanded] = useState(index < 3);
    const Icon = category.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel rounded-xl overflow-hidden"
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon className="text-oxot-gold" size={20} />
                    <span className="text-white font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-grey">{category.technologies.length} technologies</span>
                    <ChevronDown className={`text-grey transition-transform ${expanded ? 'rotate-180' : ''}`} size={16} />
                </div>
            </button>
            {expanded && (
                <div className="border-t border-white/10 p-4 grid md:grid-cols-2 gap-3">
                    {category.technologies.map((tech) => (
                        <TechnologyCard key={tech.name} tech={tech} />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function TechIntelligence() {
    const confirmedCount = TECH_INTEL.categories.reduce((acc, cat) =>
        acc + cat.technologies.filter(t => t.status === 'CONFIRMED').length, 0);
    const totalCount = TECH_INTEL.categories.reduce((acc, cat) => acc + cat.technologies.length, 0);

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
                        <Search className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">TECHNOLOGY INTELLIGENCE</span>
                    </div>
                    <PageHeader
                        title="Inferred Technology Stack"
                        subtitle="Technologies identified through OSINT analysis of job postings, publications, partnerships, and use cases"
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-white mb-1">{totalCount}</div>
                        <div className="text-xs text-grey">Technologies Identified</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-green-400 mb-1">{confirmedCount}</div>
                        <div className="text-xs text-grey">Confirmed</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-oxot-gold mb-1">{TECH_INTEL.partners.length}</div>
                        <div className="text-xs text-grey">Vendor Partners</div>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-oxot-blue mb-1">{TECH_INTEL.categories.length}</div>
                        <div className="text-xs text-grey">Categories</div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Sources */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-oxot-gold" />
                        Intelligence Sources
                    </h3>
                    <div className="grid md:grid-cols-4 gap-3">
                        {TECH_INTEL.sources.map((source, i) => (
                            <div key={i} className="p-3 bg-black/30 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-white text-sm">{source.type}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded ${source.confidence === 'HIGH' ? 'text-green-400 bg-green-500/20' : 'text-yellow-400 bg-yellow-500/20'
                                        }`}>{source.confidence}</span>
                                </div>
                                <div className="text-grey text-xs">{source.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Technology Categories */}
            <ScrollReveal>
                <div className="space-y-4 mb-8">
                    {TECH_INTEL.categories.map((category, i) => (
                        <CategorySection key={category.id} category={category} index={i} />
                    ))}
                </div>
            </ScrollReveal>

            {/* Partners */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Building2 size={20} className="text-oxot-gold" />
                        Technology Partners & Vendors
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {TECH_INTEL.partners.map((partner, i) => (
                            <div key={i} className="p-3 bg-black/30 rounded-lg">
                                <div className="text-white font-medium text-sm mb-1">{partner.name}</div>
                                <div className="text-oxot-blue text-[10px] mb-1">{partner.type}</div>
                                <div className="text-grey text-[10px]">{partner.products}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Job Signals */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Briefcase size={20} className="text-oxot-gold" />
                        Job Posting Signals
                    </h3>
                    <div className="space-y-2">
                        {TECH_INTEL.jobSignals.map((job, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-white text-sm">{job.role}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded ${job.frequency === 'HIGH' ? 'text-green-400 bg-green-500/20' :
                                        job.frequency === 'MEDIUM' ? 'text-yellow-400 bg-yellow-500/20' :
                                            'text-grey bg-white/10'
                                        }`}>{job.frequency}</span>
                                </div>
                                <span className="text-grey text-xs">{job.signal}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
