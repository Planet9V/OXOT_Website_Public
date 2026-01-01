import OXOTGTMStrategy from '@/components/osint/OXOTGTMStrategy';

export const metadata = {
    title: 'GTM Strategy | OXOT ↔ OFI',
    description: 'Go-To-Market strategy for positioning OXOT as OFI specialized OT/ICS security partner complementing Mindsprint capabilities.'
};

export default function GTMPage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <OXOTGTMStrategy />
            </div>
        </main>
    );
}
