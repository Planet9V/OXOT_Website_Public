'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Users, Search, ArrowRight, ShieldCheck, FileText, Lock } from 'lucide-react';

export default function CampaignsDashboard() {
    return (
        <div className="min-h-screen text-slate-300">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
                    Strategic Campaigns <span className="text-oxot-gold">GTM Dashboard</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Central command for active Go-To-Market campaigns. This dashboard provides access to public landing pages, internal strategy briefs, and the standard operating procedure for launching new cyber-physical targeted campaigns.
                </p>
            </div>

            {/* Active Campaigns Grid */}
            <div className="mb-20">
                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                    <ActivityIcon className="text-oxot-gold" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest">Active Campaigns</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* FrieslandCampina Card */}
                    <CampaignCard
                        title="Project: Dairy Shield"
                        target="FrieslandCampina"
                        status="Active"
                        description="Aligning OT Security with 'Expedition 2030' savings targets."
                        publicLink="/campaigns/friesland-campina"
                        internalLink="/campaigns/friesland-campina/internal"
                    />
                </div>
            </div>

            {/* GTM Playbook Section */}
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* Phase 1 */}
                    <PlaybookSection
                        step="01"
                        title="Target Definition & Intelligence"
                        icon={<Search className="text-oxot-blue" />}
                    >
                        <p className="mb-4">
                            Before a landing page is built, we must understand the <strong>Physics of the Business</strong>.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                            <li><strong>Sector Analysis:</strong> Identify macro-economic pressures (e.g., commodity fluctuation, regulatory mandates like NIS2).</li>
                            <li><strong>Corporate Strategy:</strong> Read annual reports. Identify the "North Star" (e.g., "Expedition 2030").</li>
                            <li><strong>Executive Pain Points:</strong> What keeps the C-Suite awake? (e.g., Supply Chain Fragility, Margin Protection).</li>
                        </ul>
                    </PlaybookSection>

                    {/* Phase 2 */}
                    <PlaybookSection
                        step="02"
                        title="Solution Mapping & Alignment"
                        icon={<ShieldCheck className="text-oxot-blue" />}
                    >
                        <p className="mb-4">
                            Map OXOT capabilities directly to the target's strategic initiatives.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                            <li><strong>The Gap:</strong> Where does their current strategy fail to account for Cyber-Physical risk?</li>
                            <li><strong>The Bridge:</strong> How does Agent Blue/Red bridge that gap?</li>
                            <li><strong>Value Prop:</strong> Translate technical features into business outcomes (e.g., "Sovereign Immunity" vs "Endpoint Protection").</li>
                        </ul>
                    </PlaybookSection>

                    {/* Phase 3 */}
                    <PlaybookSection
                        step="03"
                        title="Persona Positioning & Tone"
                        icon={<Users className="text-oxot-blue" />}
                    >
                        <p className="mb-4">
                            Adopt the language of the target.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                            <li><strong>Language:</strong> Use their internal terminology (e.g., "Grass to Glass").</li>
                            <li><strong>Tone:</strong> High-stakes, professional, slightly urgent but confident.</li>
                            <li><strong>Visuals:</strong> Dark, premium, focused on their specific industrial aesthetic.</li>
                        </ul>
                    </PlaybookSection>
                </div>

                {/* Sidebar Resources */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit">
                    <h3 className="text-oxot-gold font-bold uppercase tracking-widest mb-6">Resources</h3>
                    <ul className="space-y-4">
                        <ResourceLink title="GTM Template (Figma)" />
                        <ResourceLink title="Perplexity Research Prompts" />
                        <ResourceLink title="Competitor SWOT Analysis" />
                        <ResourceLink title="Outreach Email Scripts" />
                    </ul>
                </div>
            </div>
        </div>
    );
}

function ActivityIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}

function CampaignCard({ title, target, status, description, publicLink, internalLink }: any) {
    return (
        <div className="bg-black border border-white/10 rounded-xl p-6 group hover:border-oxot-gold/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-green-900/30 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    {status}
                </div>
                <Target className="text-gray-600 group-hover:text-oxot-gold transition-colors" size={20} />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <div className="text-xs font-mono text-oxot-gold mb-3">{target}</div>
            <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{description}</p>

            <div className="grid grid-cols-2 gap-3">
                <Link href={publicLink} className="flex items-center justify-center gap-2 py-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors border border-white/10">
                    Public Page <ArrowRight size={12} />
                </Link>
                <Link href={internalLink} className="flex items-center justify-center gap-2 py-2 rounded bg-oxot-gold/10 hover:bg-oxot-gold/20 text-xs font-bold text-oxot-gold transition-colors border border-oxot-gold/20">
                    <Lock size={12} /> Internal Brief
                </Link>
            </div>
        </div>
    )
}

function PlaybookSection({ step, title, icon, children }: any) {
    return (
        <div className="flex gap-6">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-oxot-blue/10 border border-oxot-blue/30 flex items-center justify-center text-oxot-blue font-mono font-bold">
                    {step}
                </div>
                <div className="w-px h-full bg-white/5 my-2"></div>
            </div>
            <div className="pb-12">
                <div className="flex items-center gap-3 mb-4">
                    {icon}
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                <div className="text-gray-400 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    )
}

function ResourceLink({ title }: { title: string }) {
    return (
        <li className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer group transition-colors">
            <FileText size={16} className="text-gray-600 group-hover:text-oxot-gold" />
            {title}
        </li>
    )
}
