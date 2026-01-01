'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import OFIMindMap from '@/components/osint/OFIMindMap';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

export default function MindMapPage() {
    return (
        <div className="h-screen w-full bg-black flex flex-col overflow-hidden">
            <OSINTNavigationMenu />

            <div className="flex-none p-4 border-b border-white/10 z-10 bg-black/80 backdrop-blur-sm flex justify-between items-center px-12 ">
                <div className="flex items-center gap-4">
                    <Link href="/corporate/osint-report" className="text-grey hover:text-white transition-colors flex items-center gap-2 text-sm">
                        <ChevronLeft size={16} />
                        Back to Report
                    </Link>
                    <div className="h-4 w-px bg-white/10" />
                    <h1 className="text-white font-mono text-sm tracking-widest">
                        <span className="text-cyan-400">STRATEGIC ALIGNMENT MAP</span> // INTERACTIVE CANVAS
                    </h1>
                </div>
                <div className="text-xs font-mono text-grey hidden md:block">
                    SCROLL TO ZOOM • DRAG TO PAN
                </div>
            </div>

            <div className="flex-grow relative">
                <OFIMindMap />
            </div>
        </div>
    );
}
