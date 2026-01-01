'use client';

import { Metadata } from 'next';
import FrieslandHero from '@/components/campaigns/FrieslandHero';
import ServicePortfolioStrip from '@/components/campaigns/ServicePortfolioStrip';
import CampaignFooter from '@/components/campaigns/CampaignFooter';
import AgentBlueShowcase from '@/components/campaigns/AgentBlueShowcase';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import ContactFormCTA from '@/components/ContactFormCTA';

// export const metadata: Metadata = {
//     title: 'Sovereign Immunity for FrieslandCampina | OXOT',
//     description: 'Autonomous OT Security for the future of nutrition.',
// };
// Metadata cannot be exported from a client component, moving strictly to client logic

export default function FrieslandCampaignPage() {
    return (
        <main className="min-h-screen bg-black">
            {/* 1. Hero Section */}
            <FrieslandHero />

            {/* 2. The Challenge: Dairy OT Specifics */}
            <section className="py-24 bg-black relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <span className="text-oxot-gold font-mono text-xs tracking-widest uppercase mb-4 block">
                                The Threat Landscape
                            </span>
                            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                                Expedition 2030: <br />
                                <span className="text-white/40">Efficiency meets Vulnerability.</span>
                            </h2>
                            <p className="text-white/70 text-base leading-relaxed mb-4">
                                As production consolidates to efficiency hubs like <strong>Veghel</strong> and <strong>Borculo</strong> to achieve <strong>€500M</strong> in savings, the attack surface narrows—but system criticality deepens.
                            </p>
                            <p className="text-white/70 text-base leading-relaxed mb-4">
                                The impending <strong>Milcobel merger</strong> creates a "chaos window" where integration gaps become prime targets.
                            </p>
                            <p className="text-white/70 text-base leading-relaxed">
                                A single breach doesn't just halt production; it threatens the brands that drive your revenue—from <strong>Chocomel</strong> lines to <strong>Debic</strong> logistics.
                            </p>
                        </div>

                        <div className="md:w-1/2 grid gap-6">
                            <RiskCard
                                icon={<Clock className="text-red-500" size={24} />}
                                title="EBITDA Defense"
                                desc="With 8.6% margins and a 1.1% revenue decline, you cannot afford the 4-hour spoilage window. Downtime erases efficiency gains instantly."
                            />
                            <RiskCard
                                icon={<AlertTriangle className="text-orange-500" size={24} />}
                                title="Merger Integrity"
                                desc="De-risk the Milcobel integration (Jan 2026). Agent Blue provides a 'Clean Room' environment, ensuring acquired assets don't infect the core grid."
                            />
                            <RiskCard
                                icon={<TrendingUp className="text-oxot-blue" size={24} />}
                                title="65-Site Defense"
                                desc="From Bedum to Borneo, a unified Neural Physics layer protects all 65 production sites without requiring 65 local security teams."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Solution: Agent Blue Showcase */}
            <AgentBlueShowcase />

            {/* 4. Contact Form CTA */}
            <div className="max-w-5xl mx-auto py-24 px-6">
                <ContactFormCTA
                    variant="gold"
                    headline="Secure the Expedition."
                    subheadline="Schedule a technical briefing on the Dairy Shield architecture."
                    serviceOptions={[
                        { value: 'audit', label: 'OT Gap Analysis', color: 'yellow' },
                        { value: 'monitor', label: 'Grass-to-Glass Twin', color: 'blue' },
                        { value: 'strategy', label: 'Expedition 2030 Risk Review', color: 'cyan' }
                    ]}
                />
            </div>
            {/* 7. Service Portfolio Strip */}
            <ServicePortfolioStrip />

            {/* 8. Global Footer */}
            <CampaignFooter />
        </main>
    );
}

function RiskCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-6 rounded-lg bg-white/5 border border-white/10 flex gap-4 items-start hover:bg-white/10 transition-colors">
            <div className="mt-1">{icon}</div>
            <div>
                <h4 className="text-white font-bold mb-2">{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
