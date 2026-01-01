'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FileText, Shield, AlertTriangle, Building2, Users, Settings,
    Printer, Download, ExternalLink
} from 'lucide-react';

// =============================================================================
// PRINTABLE REPORTS DATA
// =============================================================================

const REPORTS = [
    {
        slug: 'executive-summary',
        title: 'Executive Intelligence Report',
        subtitle: 'Consolidated Corporate Intelligence',
        description: 'Complete organizational analysis including corporate anatomy, operational footprint, and strategic positioning.',
        icon: <FileText size={24} />,
        pages: '15+',
        color: 'text-cyan-400',
        border: 'border-cyan-400/30',
        bg: 'bg-cyan-400/10'
    },
    {
        slug: 'threat-model',
        title: 'Ransomware Attack Paths',
        subtitle: 'Strategic Threat Model & MITRE Mapping',
        description: 'Comprehensive cyber threat analysis with Enterprise IT, ICS/OT, and Mobile attack vectors mapped to MITRE ATT&CK.',
        icon: <AlertTriangle size={24} />,
        pages: '25+',
        color: 'text-red-400',
        border: 'border-red-400/30',
        bg: 'bg-red-400/10'
    },
    {
        slug: 'sector-threats',
        title: 'Sector Threat Report',
        subtitle: 'Food & Agriculture Cybersecurity',
        description: 'Industry-wide threat landscape analysis covering ransomware trends, attack vectors, and threat actor profiles.',
        icon: <Shield size={24} />,
        pages: '8+',
        color: 'text-orange-400',
        border: 'border-orange-400/30',
        bg: 'bg-orange-400/10'
    },
    {
        slug: 'structure-intel',
        title: 'Structure Intelligence Report',
        subtitle: 'Corporate Anatomy Analysis',
        description: 'Detailed organizational hierarchy, key operating groups, leadership profiles, and subsidiary network analysis.',
        icon: <Building2 size={24} />,
        pages: '12+',
        color: 'text-emerald-400',
        border: 'border-emerald-400/30',
        bg: 'bg-emerald-400/10'
    },
    {
        slug: 'people-jobs',
        title: 'Human Capital Configuration',
        subtitle: 'Netherlands Operations Intelligence',
        description: 'Personnel analysis covering Amsterdam, Koog aan de Zaan, and Rotterdam hubs with leadership profiles and talent strategy.',
        icon: <Users size={24} />,
        pages: '20+',
        color: 'text-purple-400',
        border: 'border-purple-400/30',
        bg: 'bg-purple-400/10'
    },
    {
        slug: 'shanghai-62443',
        title: 'Shanghai IEC 62443 FEED',
        subtitle: 'Customer Solution Centre Requirements',
        description: 'IEC 62443 security checklist for FEED integration at Shanghai CSC including zones, conduits, and compliance requirements.',
        icon: <Settings size={24} />,
        pages: '6+',
        color: 'text-oxot-gold',
        border: 'border-oxot-gold/30',
        bg: 'bg-oxot-gold/10'
    }
];

// =============================================================================
// REPORT CARD COMPONENT
// =============================================================================

function ReportCard({ report, index }: { report: typeof REPORTS[0]; index: number }) {
    return (
        <Link href={`/corporate/osint-report/printable/${report.slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`glass-panel p-6 rounded-xl border ${report.border} group cursor-pointer h-full relative overflow-hidden`}
            >
                {/* Background Icon */}
                <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${report.color}`}>
                    {report.icon}
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${report.bg}`}>
                        <span className={report.color}>{report.icon}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Printer className="text-grey" size={14} />
                        <span className="text-xs text-grey font-mono">{report.pages} pages</span>
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-oxot-gold transition-colors">
                    {report.title}
                </h3>
                <p className={`text-xs font-mono mb-3 ${report.color}`}>
                    {report.subtitle}
                </p>
                <p className="text-grey text-xs leading-relaxed mb-4">
                    {report.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono text-grey">PDF READY</span>
                    <div className="flex items-center gap-2 text-grey group-hover:text-oxot-gold transition-colors">
                        <Download size={12} />
                        <span className="text-[10px] font-mono">VIEW & PRINT</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PrintableReports() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Printer className="text-oxot-gold" size={20} />
                    <div>
                        <h2 className="heading-2 text-white">PRINTABLE REPORTS</h2>
                        <p className="text-grey text-sm">Professional PDF-ready intelligence documents</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-grey font-mono">
                    <span className="px-2 py-1 bg-oxot-gold/10 text-oxot-gold rounded">8.5" × 11"</span>
                    <span>PRINT OPTIMIZED</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REPORTS.map((report, i) => (
                    <ReportCard key={report.slug} report={report} index={i} />
                ))}
            </div>
        </div>
    );
}
