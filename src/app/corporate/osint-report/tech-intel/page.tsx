import TechIntelligence from '@/components/osint/TechIntelligence';

export const metadata = {
    title: 'Technology Intelligence | OFI OSINT',
    description: 'Inferred technology stack for OFI - technologies identified from job postings, publications, partnerships, and use cases.'
};

export default function TechIntelPage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <TechIntelligence />
            </div>
        </main>
    );
}
