'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, Globe, FileAudio, Play } from 'lucide-react';

// =============================================================================
// VOICE REPORTS DATA
// =============================================================================

const REPORTS = [
    {
        id: 'cyber-risk-dutch',
        title: 'Cyber Risk Assessment',
        subtitle: 'Strategic Risk Analysis (Dutch)',
        description: 'Audio briefing covering key cyber risk indicators and strategic mitigation steps for OFI operations.',
        src: '/audio/OFI_OXOT_CyberRisk_dutch.mp3',
        duration: 'Audio Report',
        icon: <ShieldMicIcon />,
        color: 'text-oxot-gold',
        border: 'border-oxot-gold/30',
        bg: 'bg-oxot-gold/10'
    },
    {
        id: 'iec62443-dutch',
        title: 'IEC 62443 Analysis',
        subtitle: 'Compliance & Safety (Dutch)',
        description: 'Audio guide to IEC 62443 standards application within the context of OFI\'s industrial control systems.',
        src: '/audio/OFI_OXOT_62443_dutch.mp3',
        duration: 'Audio Report',
        icon: <IndustrialMicIcon />,
        color: 'text-cyan-400',
        border: 'border-cyan-400/30',
        bg: 'bg-cyan-400/10'
    }
];

function ShieldMicIcon() {
    return (
        <div className="relative">
            <Mic size={24} />
            <div className="absolute -bottom-1 -right-1">
                <Globe size={12} />
            </div>
        </div>
    );
}

function IndustrialMicIcon() {
    return (
        <div className="relative">
            <Volume2 size={24} />
            <div className="absolute -bottom-1 -right-1">
                <Globe size={12} />
            </div>
        </div>
    );
}

// =============================================================================
// REPORT CARD COMPONENT
// =============================================================================

function VoiceCard({ report, index }: { report: typeof REPORTS[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`glass-panel p-6 rounded-xl border ${report.border} h-full relative overflow-hidden`}
        >
            {/* Background Icon */}
            <div className={`absolute top-0 right-0 p-4 opacity-5 pointer-events-none ${report.color}`}>
                {report.icon}
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${report.bg}`}>
                    <span className={report.color}>{report.icon}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FileAudio className="text-grey" size={14} />
                    <span className="text-xs text-grey font-mono">{report.duration}</span>
                </div>
            </div>

            {/* Content */}
            <h3 className="text-white font-bold text-sm mb-1">
                {report.title}
            </h3>
            <p className={`text-xs font-mono mb-3 ${report.color}`}>
                {report.subtitle}
            </p>
            <p className="text-grey text-xs leading-relaxed mb-6">
                {report.description}
            </p>

            {/* Audio Player */}
            <div className="pt-4 border-t border-white/10">
                <audio
                    controls
                    className="w-full h-8 opacity-80 hover:opacity-100 transition-opacity"
                    style={{
                        height: '32px',
                        outline: 'none'
                    }}
                >
                    <source src={report.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </motion.div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function VoiceReports() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Mic className="text-oxot-gold" size={20} />
                    <div>
                        <h2 className="heading-2 text-white">VOICE REPORTS</h2>
                        <p className="text-grey text-sm">Strategic audio intelligence briefings</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-grey font-mono">
                    <span className="px-2 py-1 bg-oxot-gold/10 text-oxot-gold rounded">DUTCH</span>
                    <span>AUDIO BRIEFING</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {REPORTS.map((report, i) => (
                    <VoiceCard key={report.id} report={report} index={i} />
                ))}
            </div>
        </div>
    );
}
