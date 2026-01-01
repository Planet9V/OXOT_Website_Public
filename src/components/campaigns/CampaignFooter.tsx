'use client';

import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Globe } from 'lucide-react';

export default function CampaignFooter() {
    return (
        <footer className="bg-black border-t border-white/10 py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <div className="text-2xl font-black text-white tracking-tighter mb-6">OXOT</div>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Sovereign AI ensuring the resilience of critical infrastructure.
                            Reliable energy, clean water, and healthy food for our (grand) children.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Twitter size={18} />} href="#" />
                            <SocialIcon icon={<Linkedin size={18} />} href="#" />
                            <SocialIcon icon={<Github size={18} />} href="#" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="/services/agent-blue" className="hover:text-oxot-blue transition-colors">Agent Blue (Defense)</Link></li>
                            <li><Link href="/services/agent-red" className="hover:text-red-500 transition-colors">Agent Red (Offense)</Link></li>
                            <li><Link href="/services/agent-gold" className="hover:text-oxot-gold transition-colors">Agent Gold (Strategy)</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="/corporate/about" className="hover:text-white transition-colors">About/Manifesto</Link></li>
                            <li><Link href="/corporate/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/corporate/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Sovereignty Statement</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-white/40 text-xs font-mono">
                        © 2026 OXOT Industries. All rights reserved.
                    </div>
                    <div className="text-white/40 text-xs font-mono flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        SYSTEMS NOMINAL
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a href={href} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all">
            {icon}
        </a>
    );
}
