import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PrintableReportPage from './PrintableReportPage';

// =============================================================================
// REPORT METADATA
// =============================================================================

const REPORTS: Record<string, {
    title: string;
    subtitle: string;
    classification: string;
    date: string;
    pages: string;
}> = {
    'executive-summary': {
        title: 'Executive Intelligence Report',
        subtitle: 'Consolidated Corporate Intelligence Analysis',
        classification: 'OSINT // CONFIDENTIAL // FOR OFI',
        date: 'December 2025',
        pages: '15+'
    },
    'threat-model': {
        title: 'Ransomware Attack Paths',
        subtitle: 'Strategic Threat Model & MITRE ATT&CK Mapping',
        classification: 'OSINT // CONFIDENTIAL // FOR OFI',
        date: 'December 2025',
        pages: '25+'
    },
    'sector-threats': {
        title: 'Sector Threat Report',
        subtitle: 'Food & Agriculture Cybersecurity Analysis',
        classification: 'OSINT // UNCLASSIFIED',
        date: 'December 2025',
        pages: '8+'
    },
    'structure-intel': {
        title: 'Structure Intelligence Report',
        subtitle: 'Corporate Anatomy & Operational Footprint',
        classification: 'OSINT // CONFIDENTIAL // FOR OFI',
        date: 'December 2025',
        pages: '12+'
    },
    'people-jobs': {
        title: 'Human Capital Configuration',
        subtitle: 'Netherlands Operations Intelligence',
        classification: 'OSINT // CONFIDENTIAL // FOR OFI',
        date: 'December 2025',
        pages: '20+'
    },
    'shanghai-62443': {
        title: 'Shanghai IEC 62443 FEED Requirements',
        subtitle: 'Customer Solution Centre Security Checklist',
        classification: 'OSINT // INTERNAL',
        date: 'December 2025',
        pages: '6+'
    }
};

// =============================================================================
// DYNAMIC METADATA
// =============================================================================

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const report = REPORTS[slug];

    if (!report) {
        return {
            title: 'Report Not Found | OXOT'
        };
    }

    return {
        title: `${report.title} | OXOT Intelligence`,
        description: report.subtitle
    };
}

// =============================================================================
// STATIC PARAMS FOR BUILD
// =============================================================================

export function generateStaticParams() {
    return Object.keys(REPORTS).map((slug) => ({ slug }));
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default async function Page({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const report = REPORTS[slug];

    if (!report) {
        notFound();
    }

    return <PrintableReportPage slug={slug} report={report} />;
}
