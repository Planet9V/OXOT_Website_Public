import TechnologyRisks from '@/components/osint/TechnologyRisks';

export const metadata = {
    title: 'Technology Risks | OFI Security',
    description: 'CVE database and third-party risk analysis for OFI technology stack - Rockwell, Siemens, SAP, Braincube.'
};

export default function TechnologyPage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <TechnologyRisks />
            </div>
        </main>
    );
}
