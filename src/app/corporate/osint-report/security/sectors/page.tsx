import SectorThreats from '@/components/osint/SectorThreats';

export const metadata = {
    title: 'Sector Threats | OFI Security',
    description: 'Food & Agriculture sector threat intelligence - ransomware attacks, threat actors, and industry trends.'
};

export default function SectorsPage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <SectorThreats />
            </div>
        </main>
    );
}
