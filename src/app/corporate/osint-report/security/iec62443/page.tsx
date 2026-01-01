import IEC62443Compliance from '@/components/osint/IEC62443Compliance';

export const metadata = {
    title: 'IEC 62443 Compliance | OFI Security',
    description: 'IEC 62443 industrial cybersecurity compliance checklist for OFI Shanghai Customer Solutions Center (CSC).'
};

export default function IEC62443Page() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <IEC62443Compliance />
            </div>
        </main>
    );
}
