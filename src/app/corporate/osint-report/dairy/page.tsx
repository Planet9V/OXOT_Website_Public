import DairyAnalysis from '@/components/osint/DairyAnalysis';

export const metadata = {
    title: 'Dairy Platform Analysis | OFI OSINT',
    description: 'Deep dive into OFI dairy processing operations - NZ/AU facilities, equipment, hygienic zones, and ICS cybersecurity risks.'
};

export default function DairyPage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <DairyAnalysis />
            </div>
        </main>
    );
}
