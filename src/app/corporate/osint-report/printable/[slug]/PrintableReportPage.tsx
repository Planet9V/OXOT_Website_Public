'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Printer, Download, FileText, Calendar, Shield } from 'lucide-react';
import '../print.css';

// Import report content components
import ExecutiveSummaryContent from './content/ExecutiveSummaryContent';
import ThreatModelContent from './content/ThreatModelContent';
import SectorThreatsContent from './content/SectorThreatsContent';
import StructureIntelContent from './content/StructureIntelContent';
import PeopleJobsContent from './content/PeopleJobsContent';
import Shanghai62443Content from './content/Shanghai62443Content';

// =============================================================================
// TYPES
// =============================================================================

interface ReportMeta {
    title: string;
    subtitle: string;
    classification: string;
    date: string;
    pages: string;
}

interface PrintableReportPageProps {
    slug: string;
    report: ReportMeta;
}

// =============================================================================
// CONTENT ROUTER
// =============================================================================

function ReportContent({ slug }: { slug: string }) {
    switch (slug) {
        case 'executive-summary':
            return <ExecutiveSummaryContent />;
        case 'threat-model':
            return <ThreatModelContent />;
        case 'sector-threats':
            return <SectorThreatsContent />;
        case 'structure-intel':
            return <StructureIntelContent />;
        case 'people-jobs':
            return <PeopleJobsContent />;
        case 'shanghai-62443':
            return <Shanghai62443Content />;
        default:
            return <div className="text-center py-12 text-grey">Report content not found.</div>;
    }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PrintableReportPage({ slug, report }: PrintableReportPageProps) {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-oxot-black">
            {/* Screen-only Controls */}
            <div className="no-print sticky top-0 z-50 bg-oxot-black/95 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-[8.5in] mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/corporate/osint-report"
                        className="inline-flex items-center gap-2 text-grey hover:text-white text-sm transition-colors"
                    >
                        <ChevronLeft size={16} />
                        Back to OSINT Report
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-oxot-gold text-black font-semibold text-sm rounded-lg hover:bg-oxot-gold/90 transition-colors"
                        >
                            <Printer size={16} />
                            Print / Save PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Print Container */}
            <div ref={printRef} className="print-container max-w-[8.5in] mx-auto bg-white text-black">

                {/* Cover Page */}
                <div className="cover-page min-h-screen flex flex-col justify-center items-center text-center p-12 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]">
                    {/* Logo */}
                    <div className="mb-8">
                        <div className="w-24 h-24 mx-auto flex items-center justify-center">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <polygon
                                    points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                                    fill="none"
                                    stroke="#c9a227"
                                    strokeWidth="2"
                                />
                                <text x="50" y="58" textAnchor="middle" fill="#c9a227" fontSize="24" fontWeight="bold" fontFamily="monospace">
                                    OXOT
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="cover-title text-4xl font-bold text-white mb-2 tracking-wide">
                        {report.title}
                    </h1>
                    <p className="cover-subtitle text-sm text-oxot-gold uppercase tracking-[0.3em] mb-8">
                        {report.subtitle}
                    </p>

                    {/* Classification Banner */}
                    <div className="cover-classification px-6 py-3 border border-oxot-gold text-oxot-gold font-mono text-xs tracking-widest mb-12">
                        {report.classification}
                    </div>

                    {/* Decorative Element */}
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-oxot-gold to-transparent mb-12" />

                    {/* Meta Information */}
                    <div className="cover-meta text-grey text-sm space-y-2">
                        <p>
                            <span className="text-oxot-gold font-semibold">Prepared by</span> OXOT Sovereign Intelligence
                        </p>
                        <p>
                            <span className="text-oxot-gold font-semibold">Prepared for</span> Olam Food Ingredients (ofi)
                        </p>
                        <p className="pt-4 text-xs font-mono">
                            {report.date} • {report.pages} Pages
                        </p>
                    </div>
                </div>

                {/* Report Header (appears on each printed page) */}
                <div className="oxot-header hidden print:flex justify-between items-center px-0 py-4 border-b-2 border-oxot-gold mb-6">
                    <span className="text-xs font-mono text-grey">OXOT SOVEREIGN INTELLIGENCE</span>
                    <span className="text-xs font-mono text-oxot-gold">{report.classification}</span>
                </div>

                {/* Report Content */}
                <div className="p-8 print:p-0">
                    <ReportContent slug={slug} />
                </div>

                {/* Report Footer */}
                <div className="print-footer hidden print:flex fixed bottom-0 left-0 right-0 justify-between items-center px-8 py-4 border-t border-grey/20 bg-white text-xs text-grey">
                    <span>© 2025 OXOT Sovereign Intelligence</span>
                    <span>{report.title}</span>
                </div>
            </div>

            {/* Screen Footer */}
            <div className="no-print max-w-[8.5in] mx-auto px-6 py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-grey">
                    <span>OXOT Sovereign Intelligence • OSINT Collection Protocol v2.4</span>
                    <span className="font-mono">{report.date}</span>
                </div>
            </div>
        </div>
    );
}
