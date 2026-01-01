'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    FileText, Building2, MapPin, Users, Clock, AlertTriangle,
    TrendingUp, Globe, Cpu, Leaf, ChevronRight, ExternalLink
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useTranslations } from '@/i18n';

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function IntelligenceReport() {
    const { t } = useTranslations();

    const INTEL_DATA = useMemo(() => ({
        entities: [
            { name: 'ofi (Olam Food Ingredients)', role: t.osint.intelligence.entities.ofi.role, focus: t.osint.intelligence.entities.ofi.focus },
            { name: 'Mindsprint', role: t.osint.intelligence.entities.mindsprint.role, focus: t.osint.intelligence.entities.mindsprint.focus },
            { name: 'Jiva Ag', role: t.osint.intelligence.entities.jiva.role, focus: t.osint.intelligence.entities.jiva.focus },
            { name: 'Terrascope', role: t.osint.intelligence.entities.terrascope.role, focus: t.osint.intelligence.entities.terrascope.focus },
        ],
        subsidiaries: [
            { name: 'Club Coffee', location: t.osint.intelligence.subsidiaries.list.locations.toronto, function: t.osint.intelligence.subsidiaries.list.clubCoffee.function },
            { name: 'Seda Outspan Iberia', location: t.osint.intelligence.subsidiaries.list.locations.palencia, function: t.osint.intelligence.subsidiaries.list.seda.function },
            { name: 'Unicao', location: t.osint.intelligence.subsidiaries.list.locations.abidjan, function: t.osint.intelligence.subsidiaries.list.unicao.function },
            { name: 'Macao', location: t.osint.intelligence.subsidiaries.list.locations.valencia, function: t.osint.intelligence.subsidiaries.list.macao.function },
            { name: 'ofi North America', location: t.osint.intelligence.subsidiaries.list.locations.chicago, function: t.osint.intelligence.subsidiaries.list.na.function },
            { name: 'Olam Cocoa B.V.', location: t.osint.intelligence.subsidiaries.list.locations.netherlands, function: t.osint.intelligence.subsidiaries.list.cocoaBV.function },
            { name: 'Olam Cocoa Deutschland', location: t.osint.intelligence.subsidiaries.list.locations.germany, function: t.osint.intelligence.subsidiaries.list.cocoaDE.function },
        ],
        facilities: [
            { region: t.osint.intelligence.facilities.regions.na, locations: ['Bolingbrook IL (Cocoa)', 'Las Cruces NM (Spices)', 'Hanford CA (Garlic)', 'Toronto (Coffee)'] },
            { region: t.osint.intelligence.facilities.regions.europe, locations: ['Koog aan de Zaan NL (deZaan Cocoa)', 'Mannheim DE (Cocoa)', 'Valencia ES (Macao)', 'Palencia ES (Coffee)'] },
            { region: t.osint.intelligence.facilities.regions.apac, locations: ['Tokoroa NZ (Dairy)', 'Vietnam (7 factories)', 'Johor MY (Dairy)'] },
            { region: t.osint.intelligence.facilities.regions.africaLatam, locations: ['Abidjan CDI (Unicao)', 'San Pedro CDI (Cocoa)', 'Ghana (Cocoa)', 'Linhares BR (Coffee)'] },
        ],
        chronology: [
            { date: 'October 2019', event: t.osint.intelligence.chronology.events.compass },
            { date: '2020', event: t.osint.intelligence.chronology.events.ofiEst },
            { date: 'Late 2023', event: t.osint.intelligence.chronology.events.tokoroa },
            { date: 'December 2024', event: t.osint.intelligence.chronology.events.mightyEarth },
            { date: 'February 2025', event: t.osint.intelligence.chronology.events.salic },
            { date: 'August 2025', event: t.osint.intelligence.chronology.events.jivaClose },
            { date: 'December 30, 2025', event: t.osint.intelligence.chronology.events.eudr },
        ],
        discrepancies: [
            { field: t.osint.intelligence.discrepancies.fields.employees, values: ['14,975 (Olam Factsheet)', '~10,000 (LeadIQ)'] },
            { field: t.osint.intelligence.discrepancies.fields.farmers, values: ['2.4M (Annual Report)', '3.5M (Factsheet)'] },
            { field: t.osint.intelligence.discrepancies.fields.innovation, values: ['12', '15-19', '19 (Annual Report)'] },
        ]
    }), [t]);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <ScrollReveal>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="text-oxot-gold" size={24} />
                        <span className="text-oxot-gold text-xs font-mono tracking-[0.3em]">OSINT INTELLIGENCE REPORT</span>
                    </div>
                    <PageHeader
                        title={t.osint.intelligence.title}
                        subtitle={t.osint.intelligence.subtitle}
                        variant="hero"
                        accent="gold"
                    />
                </div>
            </ScrollReveal>

            {/* Executive Summary */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8 border-l-4 border-l-oxot-gold">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-oxot-gold" />
                        {t.osint.intelligence.executive.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-grey text-sm mb-3">{t.osint.intelligence.executive.identity}</p>
                            <p className="text-oxot-gold italic text-sm mb-4">"{t.osint.intelligence.executive.purpose}"</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    t.osint.intelligence.executive.platforms.cocoa,
                                    t.osint.intelligence.executive.platforms.coffee,
                                    t.osint.intelligence.executive.platforms.dairy,
                                    t.osint.intelligence.executive.platforms.nuts,
                                    t.osint.intelligence.executive.platforms.spices
                                ].map(p => (
                                    <span key={p} className="px-3 py-1 text-xs bg-oxot-gold/20 text-oxot-gold rounded-full">{p}</span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-3 bg-black/30 rounded-lg">
                                <div className="text-2xl font-bold text-white">120+</div>
                                <div className="text-[10px] text-grey">{t.osint.intelligence.executive.scale.plants}</div>
                            </div>
                            <div className="text-center p-3 bg-black/30 rounded-lg">
                                <div className="text-2xl font-bold text-white">19</div>
                                <div className="text-[10px] text-grey">{t.osint.intelligence.executive.scale.innovation}</div>
                            </div>
                            <div className="text-center p-3 bg-black/30 rounded-lg">
                                <div className="text-2xl font-bold text-white">2.4M</div>
                                <div className="text-[10px] text-grey">{t.osint.intelligence.executive.scale.farmers}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Corporate Entities */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Building2 size={20} className="text-oxot-gold" />
                        {t.osint.intelligence.entities.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {INTEL_DATA.entities.map((entity, i) => (
                            <div key={i} className="p-4 bg-black/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-medium">{entity.name}</span>
                                    {entity.name.includes('Jiva') && (
                                        <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded">CLOSED</span>
                                    )}
                                </div>
                                <div className="text-oxot-blue text-xs mb-1">{entity.role}</div>
                                <div className="text-grey text-xs">{entity.focus}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Subsidiaries */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Globe size={20} className="text-oxot-gold" />
                        {t.osint.intelligence.subsidiaries.title}
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-2 text-grey font-normal">{t.osint.intelligence.subsidiaries.headers.name}</th>
                                    <th className="text-left py-2 text-grey font-normal">{t.osint.intelligence.subsidiaries.headers.location}</th>
                                    <th className="text-left py-2 text-grey font-normal">{t.osint.intelligence.subsidiaries.headers.function}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {INTEL_DATA.subsidiaries.map((sub, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 text-white">{sub.name}</td>
                                        <td className="py-3 text-oxot-blue">{sub.location}</td>
                                        <td className="py-3 text-grey">{sub.function}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ScrollReveal>

            {/* Facilities by Region */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-oxot-gold" />
                        {t.osint.intelligence.facilities.title}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {INTEL_DATA.facilities.map((region, i) => (
                            <div key={i} className="p-4 bg-black/30 rounded-lg">
                                <h4 className="text-oxot-gold font-medium mb-2">{region.region}</h4>
                                <ul className="space-y-1">
                                    {region.locations.map((loc, j) => (
                                        <li key={j} className="text-grey text-xs flex items-center gap-2">
                                            <ChevronRight size={12} className="text-grey/50" />
                                            {loc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal>
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-oxot-gold" />
                        {t.osint.intelligence.chronology.title}
                    </h3>
                    <div className="relative">
                        <div className="absolute left-3 top-0 bottom-0 w-px bg-oxot-gold/30" />
                        <div className="space-y-4 pl-8">
                            {INTEL_DATA.chronology.map((event, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-5 w-3 h-3 rounded-full bg-oxot-gold/50 border-2 border-oxot-gold" />
                                    <div className="p-3 bg-black/30 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-oxot-gold font-mono text-xs">{event.date}</span>
                                            {event.event.includes('Critical') || event.event.includes('CRITICAL') ? (
                                                <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded">CRITICAL</span>
                                            ) : null}
                                        </div>
                                        <div className="text-white text-sm">{event.event}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Source Discrepancies */}
            <ScrollReveal>
                <div className="p-5 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-orange-400 mt-1" size={20} />
                        <div>
                            <h4 className="text-orange-400 font-semibold mb-2">{t.osint.intelligence.discrepancies.title}</h4>
                            <p className="text-grey text-sm mb-3">
                                {t.osint.intelligence.discrepancies.intro}
                            </p>
                            <div className="space-y-2">
                                {INTEL_DATA.discrepancies.map((d, i) => (
                                    <div key={i} className="flex gap-2 text-xs">
                                        <span className="text-white font-medium w-32">{d.field}:</span>
                                        <span className="text-grey">{d.values.join(' vs ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
