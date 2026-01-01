'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Target, ShieldAlert, Zap, Lock, Eye, Users, FileText, Mail, Copy, AlertTriangle, Link as LinkIcon } from 'lucide-react';

export default function FrieslandInternalBrief() {
    return (
        <div className="min-h-screen text-slate-300 max-w-5xl mx-auto py-12 px-6">
            <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-8 transition-colors">
                <ChevronLeft size={16} /> Back to Dashboard
            </Link>

            {/* Header Section */}
            <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-red-900/20 border border-red-800 text-red-500 text-xs font-mono font-bold uppercase rounded tracking-wider">
                            Internal // Sensitive
                        </span>
                        <span className="text-xs text-gray-500 font-mono tracking-widest">
                            STRAT-OPS INTELLIGENCE v2.2
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-2">
                        Project: <span className="text-oxot-gold">Dairy Shield</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        A sovereign defense strategy for FrieslandCampina's <strong>"Expedition 2030"</strong> profitability roadmap.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/campaigns/friesland-campina" className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-sm font-medium transition-colors">
                        View Public Page
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content Column (2/3) */}
                <div className="lg:col-span-2 space-y-16">

                    {/* 1. Campaign Objective */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="text-oxot-gold" />
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Campaign Objective</h2>
                        </div>
                        <div className="bg-gradient-to-r from-oxot-gold/10 to-transparent border-l-4 border-oxot-gold p-6 rounded-r-xl">
                            <p className="text-lg leading-relaxed text-gray-200">
                                To position OXOT as the critical enabler of the <strong>€500M "Expedition 2030" savings target</strong>. By mapping the gap between their IT (Ricoh/AWS) and OT (Siemens), we sell "Operational Immunity" against the ransomware surge targeting the food sector.
                            </p>
                        </div>
                    </section>

                    {/* 2. Target Intelligence */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Eye className="text-oxot-blue" />
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Target Intelligence</h2>
                        </div>

                        {/* Operational Intelligence (Footprint & Revenue) */}
                        <div className="bg-black border border-white/10 p-6 rounded-xl mb-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <FileText size={16} className="text-purple-400" /> Operational Intelligence
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                                <div>
                                    <span className="text-gray-500 text-xs uppercase block mb-1">Global Footprint</span>
                                    <div className="font-medium text-white mb-1">65 Production Sites</div>
                                    <div className="text-gray-400 text-xs leading-relaxed">
                                        <span className="text-white">26 in The Netherlands</span>.
                                        Critical hubs: <strong>Veghel</strong> (World's largest dairy processing), <strong>Borculo</strong> (Ingredients/Whey), and <strong>Bedum</strong>.
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-xs uppercase block mb-1">Revenue Split (H1 2024)</span>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs"><span className="text-gray-400">Professional</span> <span className="text-white">€1.9B</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-gray-400">Specialized Nutrition</span> <span className="text-white">€834M</span></div>
                                        <div className="flex justify-between text-xs"><span className="text-gray-400">Ingredients</span> <span className="text-white">€718M</span></div>
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-2 border-t border-white/5 pt-4 grid grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase block mb-1">Total Rev</span>
                                        <span className="text-white font-bold">~€13B</span> <span className="text-red-400 text-xs">(-1.1%)</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase block mb-1">Employees</span>
                                        <span className="text-white font-bold">19,576</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase block mb-1">M&A Trigger</span>
                                        <span className="text-white font-bold">Milcobel</span> <span className="text-xs bg-red-900/30 text-red-300 px-1 rounded ml-1">Jan 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio & Strategic Context */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-black border border-white/10 p-6 rounded-xl">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Zap size={16} className="text-yellow-400" /> Portfolio Authority
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase block mb-1">Power Brands</span>
                                        <p className="text-sm text-gray-300">Campina, Chocomel, Fristi, Milner, Frico.</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase block mb-1">B2B Ingredients</span>
                                        <p className="text-sm text-gray-300"><strong>Debic</strong> (Food Service) & <strong>Kievit</strong>.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black border border-white/10 p-6 rounded-xl">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <ShieldAlert size={16} className="text-red-400" /> Sector Dynamics
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase block mb-1">Price Volatility</span>
                                        <p className="text-xs text-gray-300">"Grass to Glass" model exposes margins to raw milk price swings. <strong>8.6% EBITDA</strong> leaves no buffer.</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs uppercase block mb-1">Just-in-Time Risk</span>
                                        <p className="text-xs text-gray-300">Zero tolerance for downtime. Milk spoils in 48h.</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </section>

                    {/* 3. Threat Landscape */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert className="text-red-500" />
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Threat Landscape</h2>
                        </div>
                        <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6">
                            <div className="flex items-start gap-4 mb-6">
                                <AlertTriangle className="text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-white">Sector Alert: Food & Beverage</h3>
                                    <p className="text-sm text-red-200/70 mt-1">Ransomware attacks on this sector surged <strong>27% in 2024</strong>.</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                                    <h4 className="text-sm font-bold text-red-400 uppercase mb-2">Primary Threat Actors</h4>
                                    <ul className="text-sm text-gray-400 space-y-2">
                                        <li>• <strong>RansomHub:</strong> Top actor (23 incidents).</li>
                                        <li>• <strong>CL0P:</strong> Active in supply chain exploitation.</li>
                                        <li>• <strong>FunkSec:</strong> Emerging threat in late 2024.</li>
                                    </ul>
                                </div>
                                <div className="bg-black/40 p-4 rounded-lg border border-red-900/30">
                                    <h4 className="text-sm font-bold text-red-400 uppercase mb-2">Specific Vulnerabilities</h4>
                                    <ul className="text-sm text-gray-400 space-y-2">
                                        <li>• <strong>Just-in-Time Spoilage:</strong> Attackers know milk spoils in 48h; leverage this for rapid payment.</li>
                                        <li>• <strong>IT/OT Bridging:</strong> Cloud (AWS) to Shop Floor (Siemens) pivot points.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. Outreach Toolkit (Emails) */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Mail className="text-blue-400" />
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Outreach Toolkit</h2>
                        </div>
                        <div className="space-y-8">
                            {/* Email 1: Cold / Financial */}
                            <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                                <div className="bg-white/[0.05] px-6 py-3 border-b border-white/5 flex justify-between items-center">
                                    <span className="text-sm font-mono text-oxot-blue font-bold">ANGLE: FINANCIAL RISK (Effective for CFO/CEO)</span>
                                    <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1"><Copy size={12} /> Copy</button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm text-gray-300">
                                        <span className="text-gray-500">Subject:</span>
                                        <span className="font-medium text-white">Protecting the €500M savings target (Expedition 2030)</span>
                                    </div>
                                    <div className="border-t border-white/5 pt-4 text-sm text-gray-400 leading-relaxed font-mono">
                                        <p className="mb-4">Jan Derck / Hans,</p>
                                        <p className="mb-4">Expedition 2030's goal of €500M in annual savings is ambitious. However, the 27% surge in ransomware attacks on the Food & Beverage sector (RansomHub, CL0P) puts that entire margin at risk.</p>
                                        <p className="mb-4">A single 48-hour outage at Borculo would cost more than the annual savings from your restructuring.</p>
                                        <p className="mb-4">OXOT's "Operational Immunity" platform maps your Siemens OT environment to predict and neutralize threats before they impact production. We don't just secure the network; we secure the savings.</p>
                                        <p>Briefing attached.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email 2: Warm / Technical */}
                            <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                                <div className="bg-white/[0.05] px-6 py-3 border-b border-white/5 flex justify-between items-center">
                                    <span className="text-sm font-mono text-green-400 font-bold">ANGLE: TECHNICAL VISIBILITY (Effective for CISO/OT)</span>
                                    <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1"><Copy size={12} /> Copy</button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm text-gray-300">
                                        <span className="text-gray-500">Subject:</span>
                                        <span className="font-medium text-white">Visibility into Siemens OT Standardization</span>
                                    </div>
                                    <div className="border-t border-white/5 pt-4 text-sm text-gray-400 leading-relaxed font-mono">
                                        <p className="mb-4">Rob,</p>
                                        <p className="mb-4">Noticed the move to standardize OT via Siemens Xcelerator. Great for efficiency, but it creates a unified attack surface.</p>
                                        <p className="mb-4">Our analysis shows a gap between Ricoh's management of your AWS environment and the physical reality of your shop floor assets. If an attacker pivots from cloud to PLC (as seen in recent FunkSec campaigns), would you see it in time?</p>
                                        <p className="mb-4">We have modeled a "Dairy Shield" defense profile specifically for this IT/OT gap. Worth a 15-min deep dive?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Column (1/3) */}
                <div className="space-y-8">

                    {/* Key Executives Card - KEEPING EXISTING */}
                    <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-white/[0.05] px-5 py-3 border-b border-white/5 flex items-center gap-2">
                            <Users size={16} className="text-oxot-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Target Stakeholders</span>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <div className="text-white font-bold text-sm">Jan Derck van Karnebeek</div>
                                <div className="text-xs text-gray-500 uppercase">Chief Executive Officer</div>
                                <p className="text-xs text-slate-400 mt-1">Driver of "Expedition 2030". Focus: Profitability.</p>
                            </div>
                            <div className="border-t border-white/5 pt-3">
                                <div className="text-white font-bold text-sm">Rob Reijnders</div>
                                <div className="text-xs text-gray-500 uppercase">CISO</div>
                                <p className="text-xs text-slate-400 mt-1">Primary technical target. Focus: Business Continuity.</p>
                            </div>
                            <div className="border-t border-white/5 pt-3">
                                <div className="text-white font-bold text-sm">Hans Janssen</div>
                                <div className="text-xs text-gray-500 uppercase">CFO</div>
                                <p className="text-xs text-slate-400 mt-1">Owner of €500M savings target.</p>
                            </div>
                            <div className="border-t border-white/5 pt-3">
                                <div className="text-white font-bold text-sm">David Cutter</div>
                                <div className="text-xs text-gray-500 uppercase">Chief Supply Chain Officer</div>
                                <p className="text-xs text-slate-400 mt-1">Oversees "Grass to Glass" & Borculo expansion.</p>
                            </div>
                        </div>
                    </div>

                    {/* Signal Intelligence Card */}
                    <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-white/[0.05] px-5 py-3 border-b border-white/5 flex items-center gap-2">
                            <Zap size={16} className="text-blue-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Signal Intel</span>
                        </div>
                        <div className="p-5 text-sm space-y-4">
                            <div>
                                <span className="text-gray-500 text-xs uppercase block mb-1">Company Strategy</span>
                                <div className="font-medium text-white">Expedition 2030</div>
                                <div className="text-gray-400 text-xs">€500M Annual Savings target by 2026.</div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs uppercase block mb-1">Cloud Provider</span>
                                <div className="font-medium text-white">AWS (Managed by Ricoh)</div>
                                <div className="text-gray-400 text-xs">Ricoh Cloud Services handles patching/security.</div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs uppercase block mb-1">OT Standard</span>
                                <div className="font-medium text-white">Siemens Xcelerator</div>
                                <div className="text-gray-400 text-xs">Standardizing automation across global sites.</div>
                            </div>
                        </div>
                    </div>

                    {/* Resources Card */}
                    <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-white/[0.05] px-5 py-3 border-b border-white/5 flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Resources</span>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                                <LinkIcon size={12} /> Expedition 2030 Press Release
                            </a>
                            <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                                <LinkIcon size={12} /> 2024 Annual Report (PDF)
                            </a>
                            <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                                <LinkIcon size={12} /> Food/Agri Threat Report '24
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
