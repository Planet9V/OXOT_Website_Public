'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Skull, Cpu, Crosshair, Factory, AlertTriangle,
    FileText, Network, Users, Building2, ChevronDown, ChevronRight,
    Menu, X, Cog, Globe, Layers
} from 'lucide-react';
import { useTranslations } from '@/i18n';

interface NavItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    description: string;
    color: string;
    isNew?: boolean;
}

interface NavSection {
    section: string;
    items: NavItem[];
}

// =============================================================================
// COMPONENT: OSINT Navigation Menu
// =============================================================================
export default function OSINTNavigationMenu() {
    const { t } = useTranslations();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const navSections: NavSection[] = useMemo(() => [
        {
            section: t.osint.navigation.securityIntelligence,
            items: [
                {
                    title: t.osint.navigation.securityHub,
                    href: '/corporate/osint-report/security',
                    icon: <Shield size={18} />,
                    description: t.osint.navigation.securityHubDesc,
                    color: 'text-oxot-blue'
                },
                {
                    title: t.osint.navigation.redTeamDossier,
                    href: '/corporate/osint-report/security/attacker-view',
                    icon: <Skull size={18} />,
                    description: t.osint.navigation.redTeamDossierDesc,
                    color: 'text-red-500'
                },
                {
                    title: t.osint.navigation.strategicMindMap,
                    href: '/corporate/osint-report/mind-map',
                    icon: <Network size={18} />,
                    description: t.osint.navigation.strategicMindMapDesc,
                    color: 'text-cyan-500',
                    isNew: true
                },
                {
                    title: t.osint.navigation.nis2,
                    href: '/corporate/osint-report/nis2-requirements',
                    icon: <Shield size={18} />,
                    description: t.osint.navigation.nis2Desc,
                    color: 'text-red-500',
                    isNew: true
                },
            ]
        },
        {
            section: t.osint.navigation.strategicAnalysis,
            items: [
                {
                    title: t.osint.navigation.gtmStrategy,
                    href: '/corporate/osint-report/gtm',
                    icon: <Crosshair size={18} />,
                    description: t.osint.navigation.gtmStrategyDesc,
                    color: 'text-oxot-gold'
                },
                {
                    title: t.osint.navigation.cyberThreatGtm,
                    href: '/corporate/osint-report/cyber-threat-gtm',
                    icon: <AlertTriangle size={18} />,
                    description: t.osint.navigation.cyberThreatGtmDesc,
                    color: 'text-orange-400',
                    isNew: true
                },
                {
                    title: t.osint.navigation.executiveReport,
                    href: '/corporate/osint-report/executive-report',
                    icon: <FileText size={18} />,
                    description: t.osint.navigation.executiveReportDesc,
                    color: 'text-cyan-400',
                    isNew: true
                },
                {
                    title: t.osint.navigation.shanghaiFeed,
                    href: '/corporate/osint-report/shanghai-iec62443',
                    icon: <FileText size={18} />,
                    description: t.osint.navigation.shanghaiFeedDesc,
                    color: 'text-emerald-500',
                    isNew: true
                },
            ]
        },
        {
            section: t.osint.navigation.corporateStructure,
            items: [
                {
                    title: t.osint.navigation.groupStructure,
                    href: '/corporate/osint-report/group-structure',
                    icon: <Building2 size={18} />,
                    description: t.osint.navigation.groupStructureDesc,
                    color: 'text-emerald-400',
                    isNew: true
                },
                {
                    title: t.osint.navigation.structureIntel,
                    href: '/corporate/osint-report/structure-intelligence',
                    icon: <Building2 size={18} />,
                    description: t.osint.navigation.structureIntelDesc,
                    color: 'text-blue-400',
                    isNew: true
                },
                {
                    title: t.osint.navigation.aiPartnerships,
                    href: '/corporate/osint-report/ai-partnerships',
                    icon: <Network size={18} />,
                    description: t.osint.navigation.aiPartnershipsDesc,
                    color: 'text-violet-400',
                    isNew: true
                },
            ]
        },
        {
            section: t.osint.navigation.technicalDeepDives,
            items: [
                {
                    title: t.osint.navigation.technologyIntel,
                    href: '/corporate/osint-report/tech-intel',
                    icon: <Cpu size={18} />,
                    description: t.osint.navigation.technologyIntelDesc,
                    color: 'text-purple-400'
                },
                {
                    title: t.osint.navigation.braincube,
                    href: '/corporate/osint-report/braincube-analysis',
                    icon: <Cog size={18} />,
                    description: t.osint.navigation.braincubeDesc,
                    color: 'text-blue-400',
                    isNew: true
                },
                {
                    title: t.osint.navigation.thirdPartyRisk,
                    href: '/corporate/osint-report/braincube-third-party-risk',
                    icon: <AlertTriangle size={18} />,
                    description: t.osint.navigation.thirdPartyRiskDesc,
                    color: 'text-red-400',
                    isNew: true
                },
                {
                    title: t.osint.navigation.dairyFacility,
                    href: '/corporate/osint-report/dairy-facility-architecture',
                    icon: <Factory size={18} />,
                    description: t.osint.navigation.dairyFacilityDesc,
                    color: 'text-cyan-300',
                    isNew: true
                },
            ]
        },
    ], [t]);

    return (
        <>
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block fixed left-0 top-24 z-40 w-72">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-r-xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 bg-gradient-to-r from-oxot-gold/10 to-transparent">
                        <div className="flex items-center gap-2">
                            <Layers className="text-oxot-gold" size={20} />
                            <span className="text-white font-mono text-sm font-bold tracking-wider">
                                {t.osint.navigation.menuTitle}
                            </span>
                        </div>
                        <p className="text-grey text-[10px] mt-1 font-mono">
                            {t.osint.navigation.menuSubtitle}
                        </p>
                    </div>

                    {/* Navigation Sections */}
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                        {navSections.map((section) => (
                            <div key={section.section} className="border-b border-white/5">
                                <button
                                    onClick={() => toggleSection(section.section)}
                                    className="w-full p-3 flex items-center justify-between text-grey hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-[10px] font-mono uppercase tracking-wider">
                                        {section.section}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform ${expandedSection === section.section ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {(expandedSection === section.section || expandedSection === null) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="group flex items-start gap-3 p-3 pl-5 hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-oxot-gold"
                                                >
                                                    <span className={`mt-0.5 ${item.color} group-hover:scale-110 transition-transform`}>
                                                        {item.icon}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white text-xs font-medium group-hover:text-oxot-gold transition-colors">
                                                                {item.title}
                                                            </span>
                                                            {item.isNew && (
                                                                <span className="px-1.5 py-0.5 bg-oxot-gold/20 text-oxot-gold text-[8px] font-bold rounded">
                                                                    {t.osint.navigation.new}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-grey text-[10px] truncate">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    <ChevronRight
                                                        size={12}
                                                        className="text-grey opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-1"
                                                    />
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-white/10 bg-black/50">
                        <Link
                            href="/corporate/osint-report"
                            className="flex items-center gap-2 text-grey hover:text-oxot-gold text-[10px] font-mono transition-colors"
                        >
                            <Globe size={12} />
                            {t.osint.navigation.returnToOverview}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 bg-oxot-gold text-black rounded-full shadow-lg shadow-oxot-gold/20"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="lg:hidden fixed right-0 top-0 bottom-0 w-80 bg-black border-l border-white/10 z-50 overflow-y-auto"
                        >
                            <div className="p-4 border-b border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Layers className="text-oxot-gold" size={20} />
                                        <span className="text-white font-mono text-sm font-bold">
                                            {t.osint.navigation.menuTitle}
                                        </span>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} className="text-grey hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                {navSections.map((section) => (
                                    <div key={section.section}>
                                        <p className="text-grey text-[10px] font-mono uppercase mb-2">
                                            {section.section}
                                        </p>
                                        <div className="space-y-1">
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                                                >
                                                    <span className={item.color}>{item.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white text-sm">{item.title}</span>
                                                            {item.isNew && (
                                                                <span className="px-1.5 py-0.5 bg-oxot-gold/20 text-oxot-gold text-[8px] font-bold rounded">
                                                                    {t.osint.navigation.new}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-grey text-[10px]">{item.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
