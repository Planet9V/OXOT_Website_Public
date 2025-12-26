'use client';

import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const LOG_ENTRIES = [
    { time: '[23:54:12]', type: 'INIT', typeColor: 'text-oxot-blue', message: 'Handshake established with node NODE_091' },
    { time: '[23:54:14]', type: 'WARN', typeColor: 'text-oxot-gold', message: 'Latency spike detected in Sector 04 (Energy)' },
    { time: '[23:54:18]', type: 'CRIT', typeColor: 'text-oxot-red', message: 'Granovetter Threshold exceeded in Subnet B. Auto-dampening active.' },
    { time: '[23:54:22]', type: 'INFO', typeColor: 'text-oxot-blue', message: 'Predictive Model updated. Confidence interval: 95.2%' },
    { time: '[23:54:45]', type: 'OKAY', typeColor: 'text-oxot-gold', message: 'System Entropy stabilized at 0.42.' },
    { time: '[23:54:55]', type: 'USER', typeColor: 'text-white', message: 'Admin access granted for session.' },
];

const TypewriterLine = ({ entry, onComplete }: { entry: typeof LOG_ENTRIES[0], onComplete: () => void }) => {
    const [displayText, setDisplayText] = useState('');
    const fullText = entry.message;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
                onComplete();
            }
        }, 30); // Typing speed

        return () => clearInterval(interval);
    }, [fullText, onComplete]);

    return (
        <div className="flex gap-4">
            <span className="text-gray-500">{entry.time}</span>
            <span className={entry.typeColor}>{entry.type}</span>
            <span>{displayText}<span className="animate-pulse">▌</span></span>
        </div>
    );
};

export const TypewriterLog = () => {
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [cycleKey, setCycleKey] = useState(0);

    useEffect(() => {
        // Start the first line
        if (currentLineIndex === 0 && visibleLines.length === 0) {
            setVisibleLines([0]);
        }
    }, [cycleKey]);

    const handleLineComplete = () => {
        const nextIndex = currentLineIndex + 1;

        if (nextIndex < LOG_ENTRIES.length) {
            // Add next line after a short delay
            setTimeout(() => {
                setCurrentLineIndex(nextIndex);
                setVisibleLines(prev => [...prev, nextIndex]);
            }, 300);
        } else {
            // All lines complete - pause, then reset and loop
            setTimeout(() => {
                setVisibleLines([]);
                setCurrentLineIndex(0);
                setCycleKey(prev => prev + 1);
            }, 3000); // Pause before restarting
        }
    };

    return (
        <section className="py-24 px-8 bg-black border-t border-white/5 font-mono text-xs text-gray-600">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8 opacity-50">
                    <Activity size={16} />
                    <span className="uppercase tracking-widest">System Protocol Log</span>
                </div>
                <div className="space-y-2 min-h-[180px]" key={cycleKey}>
                    {visibleLines.map((lineIdx) => (
                        <TypewriterLine
                            key={`${cycleKey}-${lineIdx}`}
                            entry={LOG_ENTRIES[lineIdx]}
                            onComplete={lineIdx === currentLineIndex ? handleLineComplete : () => { }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
