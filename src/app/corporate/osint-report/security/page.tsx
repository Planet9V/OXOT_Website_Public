import SecurityRiskSection from '@/components/osint/SecurityRiskSection';

export const metadata = {
    title: 'Cybersecurity Risk Assessment | OFI',
    description: 'Comprehensive cybersecurity risk assessment for Olam Food Ingredients - MITRE ATT&CK mapping, sector threats, technology risks, and IEC 62443 compliance.'
};

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <SecurityRiskSection />
            </div>
        </main>
    );
}
