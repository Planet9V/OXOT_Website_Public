'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, CheckCircle, Shield, Zap, Clock, DollarSign } from 'lucide-react';

// Real CVE examples with specific data
const PRIORITY_TIERS = [
    {
        id: 'now',
        label: 'NOW',
        sublabel: 'IMMEDIATE ACTION',
        color: 'red',
        examples: [
            {
                cve: 'CVE-2019-0708 (BlueKeep)',
                epss: '23.4%',
                asset: '42 Windows Server 2008 R2 RDP servers',
                location: 'Corporate VPN endpoints (internet-facing)',
                finding: 'Red Team achieved RCE in Digital Twin simulation',
                cost: '$2.8M emergency remediation',
                exposure: '$12-18M ransomware exposure',
                timeline: '14-day emergency patch window',
                oxot: 'Discovered during QTS Realty M&A DD',
                isOxot: true,
                mitigation: undefined
            },
            {
                cve: 'CVE-2021-44228 (Log4Shell)',
                epss: '97.1%',
                asset: '340 Java applications, 18 SCADA HMIs',
                location: 'Production environment + ICS network',
                finding: 'Red Team confirmed lateral movement to ICS network',
                cost: '$8.4M full remediation (application rewrites)',
                timeline: '7-day emergency deployment',
                oxot: 'Prevented $45M production outage',
                isOxot: true,
                mitigation: undefined,
                exposure: undefined
            },
            {
                cve: 'Siemens S7-1500 CVE-2022-38465',
                epss: '8.2%',
                asset: '67 PLCs controlling safety systems (SIL-rated)',
                location: 'Reactor control systems',
                finding: 'No vendor patch available, only mitigations',
                cost: '$14.2M to replace EOL PLCs',
                timeline: 'Immediate compensating controls, 180-day replacement',
                oxot: 'Negotiated $15M price adjustment (KKR deal)',
                isOxot: true,
                mitigation: undefined,
                exposure: undefined
            }
        ]
    },
    {
        id: 'next',
        label: 'NEXT',
        sublabel: 'SCHEDULED REMEDIATION',
        color: 'yellow',
        examples: [
            {
                cve: 'GE Proficy Rising EPSS',
                epss: '2.1% → 8.4% (4x increase in 60 days)',
                asset: 'GE Intelligent Platforms Proficy HMI/SCADA',
                location: '12 manufacturing facilities',
                finding: 'Attack path exists in threat model, no active exploitation yet',
                cost: '$420K refit during scheduled maintenance',
                timeline: 'Q3 2025 maintenance window (140 days)',
                oxot: null,
                isOxot: false,
                mitigation: undefined,
                exposure: undefined
            },
            {
                cve: 'SBOM: OpenSSL 1.0.2 EOL',
                epss: '4.2%',
                asset: '89 embedded systems dependencies',
                location: 'Building management systems, HVAC controllers',
                finding: 'Upstream vulnerability in legacy OpenSSL library',
                cost: '$1.2M for vendor firmware updates',
                timeline: 'Next CapEx cycle (12-18 months)',
                oxot: null,
                isOxot: false,
                mitigation: undefined,
                exposure: undefined
            }
        ]
    },
    {
        id: 'never',
        label: 'NEVER',
        sublabel: 'ACCEPT RISK / BACKLOG',
        color: 'gray',
        examples: [
            {
                cve: 'CVE-2018-XXXX (Theoretical)',
                epss: '0.3%',
                asset: 'Air-gapped lab environment (12 systems)',
                location: 'Isolated research network',
                finding: 'No exploit in wild, 6 years old, no active campaigns',
                cost: '$1.8M to replace aged systems',
                mitigation: 'Network isolation + IDS monitoring ($40K/year)',
                timeline: 'Risk accepted - annual review',
                oxot: 'Below $250K risk appetite threshold',
                isOxot: false,
                exposure: undefined
            }
        ]
    }
];

export default function NowNextNeverTimeline() {
    const [activeTier, setActiveTier] = useState('now');

    const tier = PRIORITY_TIERS.find(t => t.id === activeTier) || PRIORITY_TIERS[0];
    const activeTierIndex = PRIORITY_TIERS.findIndex(t => t.id === activeTier);

    return (
        <div>
            {/* Timeline Navigator */}
            <div className="mb-8">
                <div className="relative">
                    {/* Progress line */}
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10 hidden md:block"></div>
                    <motion.div
                        className="absolute top-6 left-0 h-0.5 bg-oxot-blue hidden md:block"
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeTierIndex / (PRIORITY_TIERS.length - 1)) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Tier buttons */}
                    <div className="grid grid-cols-3 gap-4">
                        {PRIORITY_TIERS.map((t, idx) => {
                            const isActive = t.id === activeTier;
                            const isPast = idx < activeTierIndex;

                            return (
                                <motion.button
                                    key={t.id}
                                    onClick={() => setActiveTier(t.id)}
                                    className="relative"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {/* Node circle */}
                                    <div className={`relative z-10 w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center transition-all mb-3 ${isActive
                                        ? t.color === 'red' ? 'bg-red-950/50 border-red-950/70 shadow-[0_0_20px_rgba(220,38,38,0.4)]' :
                                            t.color === 'yellow' ? 'bg-yellow-900/50 border-yellow-900/70 shadow-[0_0_20px_rgba(161,98,7,0.4)]' :
                                                'bg-white/10 border-white/30'
                                        : isPast
                                            ? 'bg-white/5 border-white/20'
                                            : 'bg-black border-white/10'
                                        }`}>
                                        <span className={`font-mono font-black text-xs ${isActive
                                            ? t.color === 'red' ? 'text-red-400' :
                                                t.color === 'yellow' ? 'text-yellow-400' :
                                                    'text-gray-400'
                                            : 'text-gray-600'
                                            }`}>
                                            {t.label}
                                        </span>
                                    </div>

                                    {/* Label */}
                                    <div className="text-center">
                                        <div className={`text-xs font-bold mb-1 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                            {t.label}
                                        </div>
                                        <div className="text-[10px] text-gray-600">
                                            {t.sublabel}
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTier}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="space-y-4">
                        {tier.examples.map((example, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-5 rounded-lg border ${example.isOxot
                                    ? 'bg-gradient-to-br from-oxot-gold/10 to-transparent border-oxot-gold/30'
                                    : tier.color === 'red'
                                        ? 'bg-black/20 border-red-950/50'
                                        : tier.color === 'yellow'
                                            ? 'bg-black/20 border-yellow-900/40'
                                            : 'bg-black/20 border-white/10'
                                    }`}
                            >
                                {/* CVE Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-1">{example.cve}</h4>
                                        <div className="flex items-center gap-3 text-xs">
                                            <div className="flex items-center gap-1">
                                                <TrendingUp size={10} className={
                                                    tier.color === 'red' ? 'text-red-400' :
                                                        tier.color === 'yellow' ? 'text-yellow-400' :
                                                            'text-gray-500'
                                                } />
                                                <span className="text-gray-400">EPSS: <span className="font-mono text-white">{example.epss}</span></span>
                                            </div>
                                            {example.isOxot && (
                                                <div className="px-2 py-0.5 bg-oxot-gold/20 border border-oxot-gold/40 rounded text-[10px] text-oxot-gold font-bold">
                                                    OXOT DISCOVERY
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded border ${tier.color === 'red' ? 'bg-red-950/30 border-red-950/50' :
                                        tier.color === 'yellow' ? 'bg-yellow-900/30 border-yellow-900/50' :
                                            'bg-white/5 border-white/10'
                                        }`}>
                                        <AlertTriangle size={16} className={
                                            tier.color === 'red' ? 'text-red-400' :
                                                tier.color === 'yellow' ? 'text-yellow-400' :
                                                    'text-gray-500'
                                        } />
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid md:grid-cols-2 gap-4 text-xs">
                                    {/* Left Column */}
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-gray-500 text-[10px] uppercase mb-1">Affected Assets</div>
                                            <div className="text-gray-300">{example.asset}</div>
                                            <div className="text-gray-500 text-[10px] mt-0.5">{example.location}</div>
                                        </div>

                                        <div>
                                            <div className="text-gray-500 text-[10px] uppercase mb-1">Finding</div>
                                            <div className="text-gray-300">{example.finding}</div>
                                        </div>

                                        {example.mitigation && (
                                            <div>
                                                <div className="text-gray-500 text-[10px] uppercase mb-1">Mitigation</div>
                                                <div className="text-gray-300">{example.mitigation}</div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-3">
                                        <div className="p-3 bg-black/30 rounded border border-white/5">
                                            <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase mb-1">
                                                <DollarSign size={10} />
                                                Remediation Cost
                                            </div>
                                            <div className="text-white font-bold">{example.cost}</div>
                                            {example.exposure && (
                                                <div className="text-red-400 text-[10px] mt-1">vs {example.exposure}</div>
                                            )}
                                        </div>

                                        <div className="p-3 bg-black/30 rounded border border-white/5">
                                            <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase mb-1">
                                                <Clock size={10} />
                                                Timeline
                                            </div>
                                            <div className="text-white font-medium">{example.timeline}</div>
                                        </div>

                                        {example.oxot && (
                                            <div className={`p-3 rounded border ${example.isOxot
                                                ? 'bg-oxot-gold/10 border-oxot-gold/30'
                                                : 'bg-black/30 border-white/5'
                                                }`}>
                                                <div className="flex items-center gap-2 text-[10px] uppercase mb-1">
                                                    <Shield size={10} className={example.isOxot ? 'text-oxot-gold' : 'text-gray-500'} />
                                                    <span className={example.isOxot ? 'text-oxot-gold' : 'text-gray-500'}>
                                                        {example.isOxot ? 'OXOT Value' : 'Context'}
                                                    </span>
                                                </div>
                                                <div className={example.isOxot ? 'text-white font-medium' : 'text-gray-300'}>
                                                    {example.oxot}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Decision Inputs (bottom) */}
                    <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h5 className="text-oxot-blue font-bold text-xs uppercase mb-3">Decision Inputs from AEON Core</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                            <div className="text-center">
                                <div className="text-cyan-400 font-bold mb-1">Blue Team</div>
                                <div className="text-gray-400">CVE/EPSS, threat intel</div>
                            </div>
                            <div className="text-center">
                                <div className="text-red-400 font-bold mb-1">Red Team</div>
                                <div className="text-gray-400">Attack path validation</div>
                            </div>
                            <div className="text-center">
                                <div className="text-yellow-400 font-bold mb-1">Gold Team</div>
                                <div className="text-gray-400">Business ROI, windows</div>
                            </div>
                            <div className="text-center">
                                <div className="text-purple-400 font-bold mb-1">Digital Twin</div>
                                <div className="text-gray-400">Asset models, SBOMs</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
