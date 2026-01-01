'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Sword, Crown, ArrowRight } from 'lucide-react';

export default function ServicePortfolioStrip() {
    return (
        <section className="bg-white/5 border-y border-white/10 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white">Full-Spectrum Sovereignty</h2>
                    <Link href="/services" className="hidden md:flex items-center gap-2 text-oxot-gold hover:text-white transition-colors text-sm font-medium">
                        View All Capabilities <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ServiceCard
                        title="Agent Blue"
                        subtitle="Autonomous Cyber Defense"
                        icon={<Shield size={24} className="text-oxot-blue" />}
                        href="/services/agent-blue"
                        color="blue"
                    />
                    <ServiceCard
                        title="Agent Red"
                        subtitle="Adversarial Validation"
                        icon={<Sword size={24} className="text-red-500" />}
                        href="/services/agent-red"
                        color="red"
                    />
                    <ServiceCard
                        title="Agent Gold"
                        subtitle="Strategic Intelligence"
                        icon={<Crown size={24} className="text-oxot-gold" />}
                        href="/services/agent-gold"
                        color="gold"
                    />
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ title, subtitle, icon, href, color }: { title: string, subtitle: string, icon: React.ReactNode, href: string, color: string }) {
    return (
        <Link href={href} className="group block">
            <div className={`h-full p-6 bg-black border border-white/10 rounded-xl hover:border-${color}-500/50 transition-all duration-300 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="mb-4 p-3 bg-white/5 inline-block rounded-lg text-white">
                            {icon}
                        </div>
                        <h3 className="text-white font-bold text-lg">{title}</h3>
                        <p className="text-white/50 text-sm mt-1">{subtitle}</p>
                    </div>
                    <ArrowRight className="text-white/20 group-hover:text-white transition-colors transform group-hover:translate-x-1" size={20} />
                </div>
            </div>
        </Link>
    );
}
