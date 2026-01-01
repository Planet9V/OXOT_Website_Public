import MITREAttackProfile from '@/components/osint/MITREAttackProfile';

export const metadata = {
    title: 'MITRE ATT&CK Profile | OFI Security',
    description: 'MITRE ATT&CK for ICS, Enterprise, and Mobile matrices mapped to Olam Food Ingredients operations.'
};

export default function MITREPage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <MITREAttackProfile />
            </div>
        </main>
    );
}
