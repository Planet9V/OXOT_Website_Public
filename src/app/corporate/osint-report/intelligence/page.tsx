import IntelligenceReport from '@/components/osint/IntelligenceReport';

export const metadata = {
    title: 'Intelligence Report | OFI OSINT',
    description: 'Corporate intelligence overview of Olam Food Ingredients - structure, subsidiaries, leadership, and operational footprint.'
};

export default function IntelligencePage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <IntelligenceReport />
            </div>
        </main>
    );
}
