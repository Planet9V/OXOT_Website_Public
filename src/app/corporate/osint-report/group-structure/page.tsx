'use client';

import OFIOrganizationMap from '@/components/osint/OFIOrganizationMap';

export default function GroupStructurePage() {
    return (
        <main className="min-h-screen bg-black px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <OFIOrganizationMap />
            </div>
        </main>
    );
}
