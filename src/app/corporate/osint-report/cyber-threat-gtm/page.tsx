'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ChevronLeft, Target, Building2, Globe, Server, Users,
    DollarSign, Factory, Shield, AlertTriangle, Zap, Lock,
    Bean, Coffee, Milk, Leaf, Crosshair, MapPin, FileText
} from 'lucide-react';
import PageHeader from '@/components/branding/PageHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import OSINTNavigationMenu from '@/components/osint/OSINTNavigationMenu';

// =============================================================================
// CYBER THREAT GTM STRATEGY PAGE
// Complete content from OFI_Cyber_Threat_GTM_Strategy.md (263 lines)
// =============================================================================

const FINANCIAL_METRICS = [
    { metric: 'Revenue', value: 'S$21.8 Billion', growth: '+40.1%', implication: 'The massive revenue scale indicates a high volume of transactions and data flow. The 40% jump suggests critical reliance on the availability of ERP systems (SAP) and logistics platforms.' },
    { metric: 'EBIT', value: 'S$1.07 Billion', growth: '+29.1%', implication: 'ofi is the profit engine of the group. Executive protection of this margin is paramount. Cyber services must be framed as "margin protection" against downtime.' },
    { metric: 'Working Capital', value: 'Significant Increase', growth: 'N/A', implication: 'High commodity prices (Cocoa/Coffee) have tied up cash in inventory. Services must be pitched as CapEx (part of facility upgrades) or compliance-mandatory (NIS2).' },
    { metric: 'Gearing', value: '2.79x (Group Net)', growth: 'Increased', implication: 'High leverage increases sensitivity to financial shocks. A ransomware attack causing business interruption would be financially catastrophic.' },
];

const EXECUTIVE_PROFILES = [
    { name: 'A. Shekhar', title: 'CEO', focus: 'IPO Preparation', sensitivity: 'Reputational risk and governance issues that could derail a listing', icon: <Users size={18} /> },
    { name: 'Rishi Kalra', title: 'CFO', focus: 'Disciplined Capital Allocation', sensitivity: 'Requires robust ROI model for security spending', icon: <DollarSign size={18} /> },
    { name: 'Stephen Byers', title: 'Chief Digital & Information Officer', focus: 'Mindsprint Partnership', sensitivity: 'Values technical competence and integration', icon: <Server size={18} /> },
    { name: 'Sandeep Jain', title: 'CCO & CEO Dairy/F&B', focus: 'High-Growth Dairy Segment', sensitivity: 'Speed-to-market for new facilities', icon: <Factory size={18} /> },
    { name: 'Susanne Folkerts', title: 'Global Head Sustainability & Ops', focus: 'Biomass Boilers & AtSource', sensitivity: 'Integrity of sustainability data and NIS2 compliance', icon: <Leaf size={18} /> },
];

const PRODUCT_PLATFORMS = [
    {
        platform: 'Cocoa',
        icon: <Bean size={20} className="text-orange-400" />,
        processes: 'Alkalization, Roasting, Grinding, Pressing (Liquor/Butter)',
        hubs: 'Germany (Mannheim), Netherlands (Koog aan de Zaan), Singapore, Ivory Coast, Ghana',
        risks: ['Thermal Runaway: Manipulation of roasting temperatures could cause fires', 'Biomass Boilers: New energy assets in Mannheim are connected to IT/OT networks']
    },
    {
        platform: 'Dairy',
        icon: <Milk size={20} className="text-cyan-400" />,
        processes: 'Spray Drying, Pasteurization, Evaporation, Blending',
        hubs: 'New Zealand (Tokoroa), Malaysia',
        risks: ['Bio-Hazard: Tampering with pasteurization time/temp creates food safety risks', 'Explosion: Spray dryers are high-risk dust explosion zones; SIS are critical targets']
    },
    {
        platform: 'Spices',
        icon: <Leaf size={20} className="text-green-400" />,
        processes: 'Cryogenic Milling, Steam Sterilization, Irradiation',
        hubs: 'Vietnam (Ho Chi Minh, Dong Nai), USA (Las Cruces, NM)',
        risks: ['Sterilization Bypass: Disabling steam logic allows pathogens (Salmonella) through', 'Cryogenic Failure: Manipulation of liquid nitrogen systems poses safety risks']
    },
    {
        platform: 'Coffee',
        icon: <Coffee size={20} className="text-amber-700" />,
        processes: 'Freeze Drying, Spray Drying, Agglomeration',
        hubs: 'Vietnam, Brazil, India',
        risks: ['Process Quality: Precise control of extraction and drying determines flavor profiles', 'Cyber disruption destroys product value (batch spoilage)']
    },
    {
        platform: 'Nuts',
        icon: <div className="text-amber-400 font-bold">N</div>,
        processes: 'Shelling, Optical Sorting, Pasteurization (PPO/Steam)',
        hubs: 'USA (Hughson, CA), Vietnam, India',
        risks: ['Sorting Disruption: Ransomware on optical sorters halts high-speed lines', 'Allergen Cross-Contamination: Manipulation of schedules could lead to undeclared allergens']
    },
];

const ATTACK_SCENARIOS = [
    {
        title: 'Scenario A: The "Sterilization Bypass"',
        objective: 'Safety & Reputation',
        target: 'Steam sterilization units in Vietnam spice facility',
        techniques: [
            { id: 'T1133', name: 'Initial Access', detail: 'Compromise of remote maintenance vendor credential used for boiler support' },
            { id: 'T0866', name: 'Lateral Movement', detail: 'Pivot from IT network to OT VLAN due to poor segmentation' },
            { id: 'T0807', name: 'Execution', detail: 'Use Command-Line Interface to modify PLC logic' },
            { id: 'T0831', name: 'Impact', detail: 'Alter temperature setpoint by -5°C. Subtle enough to avoid alarms but sufficient for pathogens to survive' },
        ],
        consequence: 'Global recall of spice products, massive lawsuit liability, and brand devastation'
    },
    {
        title: 'Scenario B: The "Biomass Boiler Shutdown"',
        objective: 'Operational Downtime',
        target: 'Biomass boiler in Mannheim, Germany',
        techniques: [
            { id: 'T1190', name: 'Initial Access', detail: 'Exploit vulnerability in web-based HMI of boiler system' },
            { id: 'T0888', name: 'Discovery', detail: 'Identify the specific controllers managing steam pressure' },
            { id: 'T0813', name: 'Impact', detail: 'Flood the controller with traffic or send a "Stop" command' },
        ],
        consequence: 'Factory loses 90% of steam power. Production stops immediately. Cocoa butter solidifies in pipes, requiring weeks of manual cleaning'
    },
    {
        title: 'Scenario C: The "Sustainability Data Poisoning"',
        objective: 'Compliance Fraud',
        target: 'AtSource platform data pipeline',
        techniques: [
            { id: 'T1195', name: 'Supply Chain', detail: 'Compromise of ofi Direct mobile app used by farmers' },
            { id: 'T1059', name: 'Execution', detail: 'Inject false geolocation or yield data into upload stream' },
            { id: 'T1565', name: 'Impact', detail: 'AtSource reports sustainable sourcing for cocoa from deforested land' },
        ],
        consequence: 'EU audit, EUDR non-compliance finding, export bans and fines'
    },
];

const GTM_WEDGES = [
    {
        title: 'Industrial Facility Design & Commissioning',
        subtitle: 'The CapEx Play',
        context: 'ofi is investing $500m. New plants are being built.',
        offer: 'Cyber-Physical Site Acceptance Testing (CP-SAT)',
        detail: 'Integrate with EPC contractors. Check if the boiler\'s network is segmented, if default passwords are removed, and if remote access is secured before the site goes live.',
        targets: ['Tokoroa Dairy Expansion', 'Vietnam Spice Upgrades']
    },
    {
        title: 'NIS2 Compliance Readiness',
        subtitle: 'The Regulatory Play',
        context: 'Deadline passed; enforcement looming in Germany/Netherlands.',
        offer: 'NIS2 Gap Analysis & Remediation Roadmap for Food Processors',
        detail: 'Specialized audit for Mannheim and Koog facilities. Focus on "Supply Chain Security" (Article 21 of NIS2). Audit the security of suppliers feeding these plants, relieving ofi of the burden.',
        targets: ['European Operations Directors', 'Legal Counsel']
    },
    {
        title: 'Supply Chain Threat Monitoring',
        subtitle: 'The Operational Play',
        context: 'ofi relies on AtSource and farmer apps.',
        offer: 'Integrity Monitoring for Digital Agriculture',
        detail: 'Monitoring service focused on data integrity anomalies in AtSource pipeline. "We don\'t just watch for hackers; we watch for data manipulation that threatens your sustainability claims."',
        targets: ['Susanne Folkerts (Sustainability Head)']
    },
];

export default function CyberThreatGTMPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
            <OSINTNavigationMenu />

            {/* Classification Banner */}
            <div className="bg-black/60 border-b border-orange-500/30 py-2 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Target className="text-orange-400" size={16} />
                    <span className="text-orange-400 font-mono text-xs tracking-widest">
                        OSINT // STRATEGIC // GTM INTELLIGENCE DOSSIER
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-grey">
                    <span>Source: OFI_Cyber_Threat_GTM_Strategy.md</span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="min-h-[50vh] flex flex-col justify-center px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <Link href="/corporate/osint-report" className="inline-flex items-center gap-2 text-grey hover:text-white text-sm mb-6 transition-colors">
                        <ChevronLeft size={16} />
                        Back to OSINT Report
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Target className="text-orange-400" size={24} />
                        <span className="text-orange-400 text-xs font-mono tracking-[0.3em]">STRATEGIC INTELLIGENCE DOSSIER</span>
                    </div>

                    <PageHeader
                        title="Cyber Threat GTM Strategy"
                        subtitle="Comprehensive Account Analysis & Go-To-Market Strategy for Industrial Cyber Resilience"
                        variant="hero"
                        accent="gold"
                    />

                    <div className="mt-8 max-w-4xl space-y-4">
                        <p className="text-grey leading-relaxed">
                            The global agricultural and food processing sector stands at a precarious intersection of
                            <span className="text-oxot-gold"> digital transformation</span>,
                            <span className="text-red-400"> geopolitical volatility</span>, and
                            <span className="text-blue-400"> escalating regulatory rigor</span>.
                        </p>
                        <p className="text-grey leading-relaxed">
                            This report serves as a foundational intelligence dossier to inform a targeted GTM strategy,
                            synthesizing financial data, operational footprints, technological dependencies, and threat landscapes
                            to identify specific commercial entry points.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 1: Corporate Structure & Financial Health */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Building2 className="text-blue-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">1. CORPORATE STRUCTURE & FINANCIAL HEALTH</h2>
                    </div>

                    {/* Reorganization */}
                    <div className="glass-panel p-6 rounded-xl mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4">1.1 The Reorganization</h3>
                        <p className="text-grey mb-4">
                            ofi was established in 2020 following a strategic reorganization of Olam International Limited.
                            The parent entity split into three distinct operating groups to unlock shareholder value:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-oxot-gold/10 border border-oxot-gold/20 rounded-lg">
                                <h4 className="text-oxot-gold font-bold mb-2">ofi (Olam Food Ingredients)</h4>
                                <p className="text-grey text-xs">Value-added ingredients: Cocoa, Coffee, Dairy, Nuts, Spices</p>
                            </div>
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <h4 className="text-emerald-400 font-bold mb-2">Olam Agri</h4>
                                <p className="text-grey text-xs">Food, feed, and fiber commodities</p>
                            </div>
                            <div className="p-4 bg-grey/10 border border-grey/20 rounded-lg">
                                <h4 className="text-grey font-bold mb-2">Remaining Olam Group</h4>
                                <p className="text-grey text-xs">Legacy assets and incubator ventures</p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-blue-400 font-semibold text-sm mb-2">💰 US$500 Million Investment Signal</p>
                            <p className="text-grey text-xs">
                                The recently announced equity investment is targeted at "unlocking full potential value" — signaling
                                budget availability for strategic infrastructure projects tied to value creation or asset protection.
                            </p>
                        </div>
                    </div>

                    {/* Financial Performance Table */}
                    <h3 className="text-lg font-semibold text-white mb-4">1.2 Financial Performance (2024)</h3>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">METRIC</th>
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">PERFORMANCE (S$)</th>
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">YoY GROWTH</th>
                                    <th className="text-left py-3 px-4 text-oxot-gold font-mono text-xs">STRATEGIC IMPLICATION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FINANCIAL_METRICS.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-3 px-4 text-white font-semibold">{row.metric}</td>
                                        <td className="py-3 px-4 text-blue-400">{row.value}</td>
                                        <td className="py-3 px-4 text-emerald-400">{row.growth}</td>
                                        <td className="py-3 px-4 text-grey text-xs">{row.implication}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Executive Profiles */}
                    <h3 className="text-lg font-semibold text-white mb-4">1.3 Executive Leadership Profiles</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {EXECUTIVE_PROFILES.map((exec, i) => (
                            <motion.div
                                key={exec.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 rounded-lg bg-white/5 border border-white/10"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="text-oxot-gold">{exec.icon}</div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{exec.name}</p>
                                        <p className="text-grey text-[10px]">{exec.title}</p>
                                    </div>
                                </div>
                                <div className="text-xs">
                                    <p className="text-blue-400 mb-1">Focus: {exec.focus}</p>
                                    <p className="text-grey">Sensitivity: {exec.sensitivity}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 2: Operational Landscape */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Factory className="text-emerald-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">2. OPERATIONAL LANDSCAPE & INDUSTRIAL ASSET ANALYSIS</h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        ofi operates a vast industrial footprint comprising <span className="text-white font-semibold">120+ manufacturing facilities</span> and
                        <span className="text-white font-semibold"> 19 innovation centers</span> across 50 countries. This physical infrastructure is the primary
                        revenue generator and, consequently, the primary cyber-physical risk vector.
                    </p>

                    {/* Product Platforms */}
                    <div className="space-y-6">
                        {PRODUCT_PLATFORMS.map((platform, i) => (
                            <motion.div
                                key={platform.platform}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-white/5">{platform.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-bold text-lg mb-3">{platform.platform} Platform</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-blue-400 font-mono text-xs mb-2">KEY PROCESSES</h4>
                                                <p className="text-grey text-sm">{platform.processes}</p>
                                                <h4 className="text-emerald-400 font-mono text-xs mt-3 mb-2">MAJOR HUBS</h4>
                                                <p className="text-grey text-sm">{platform.hubs}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-red-400 font-mono text-xs mb-2">OT CYBER-PHYSICAL RISKS</h4>
                                                <ul className="space-y-2">
                                                    {platform.risks.map((risk, j) => (
                                                        <li key={j} className="text-grey text-xs flex items-start gap-2">
                                                            <AlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={12} />
                                                            {risk}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 3: Mindsprint Factor */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Server className="text-purple-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">3. THE "MINDSPRINT" FACTOR</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-purple-400 font-mono text-sm mb-4">THE MINDSPRINT ECOSYSTEM</h3>
                            <p className="text-grey text-sm mb-4">
                                Mindsprint functions as ofi's managed service provider and digital innovation engine.
                            </p>
                            <div className="space-y-3">
                                <div className="p-3 bg-black/40 rounded">
                                    <p className="text-white font-semibold text-sm">Capabilities</p>
                                    <p className="text-grey text-xs">AI-Powered Infra & Cybersecurity, covering cyber defense, identity management, and GRC</p>
                                </div>
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                                    <p className="text-red-400 font-semibold text-sm">⚠️ The Conflict</p>
                                    <p className="text-grey text-xs">Pitching generic "Cyber Threat Monitoring" (SOC) services puts you in direct competition with Mindsprint</p>
                                </div>
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded">
                                    <p className="text-emerald-400 font-semibold text-sm">✓ The Wedge</p>
                                    <p className="text-grey text-xs">Mindsprint emphasizes enterprise IT, digital platforms, and AI acceleration. Less evidence of deep heavy-industrial engineering capability.</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-oxot-gold">
                            <h3 className="text-oxot-gold font-mono text-sm mb-4">COMPETITIVE POSITIONING STRATEGY</h3>
                            <p className="text-grey text-sm mb-4">
                                Do not frame your firm as a replacement for Mindsprint. Frame it as a <span className="text-oxot-gold font-semibold">Specialist Augmentation</span>.
                            </p>
                            <div className="space-y-4">
                                <div className="p-3 bg-purple-500/10 rounded">
                                    <p className="text-purple-400 font-semibold text-sm">Mindsprint = IT & Enterprise</p>
                                    <p className="text-grey text-xs">Cloud, ERP, helpdesk</p>
                                </div>
                                <div className="p-3 bg-oxot-gold/10 rounded">
                                    <p className="text-oxot-gold font-semibold text-sm">OXOT = OT & Industrial</p>
                                    <p className="text-grey text-xs">PLCs, SCADA, safety systems, physical plant commissioning</p>
                                </div>
                                <div className="p-4 bg-black/40 rounded border border-oxot-gold/30">
                                    <p className="text-white text-sm font-semibold">Value Proposition:</p>
                                    <p className="text-oxot-gold text-sm italic">"Mindsprint connects your business; We protect the machines that power it."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 4: MITRE ATT&CK Scenarios */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="text-red-500" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">4. CYBER THREAT ASSESSMENT (MITRE ATT&CK)</h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        Using the <span className="text-red-400 font-semibold">MITRE ATT&CK for ICS</span> framework, we construct realistic attack scenarios
                        that threaten ofi's business objectives.
                    </p>

                    <div className="space-y-6">
                        {ATTACK_SCENARIOS.map((scenario, i) => (
                            <motion.div
                                key={scenario.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white font-bold text-lg">{scenario.title}</h3>
                                    <span className="text-[10px] px-2 py-1 bg-red-500/20 text-red-400 rounded font-mono">
                                        {scenario.objective}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <span className="text-grey text-xs">Target: </span>
                                    <span className="text-orange-400 text-sm">{scenario.target}</span>
                                </div>

                                <div className="overflow-x-auto mb-4">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-2 px-3 text-red-400 font-mono text-[10px]">TECHNIQUE ID</th>
                                                <th className="text-left py-2 px-3 text-red-400 font-mono text-[10px]">TACTIC</th>
                                                <th className="text-left py-2 px-3 text-red-400 font-mono text-[10px]">DETAIL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scenario.techniques.map((tech, j) => (
                                                <tr key={j} className="border-b border-white/5">
                                                    <td className="py-2 px-3 text-cyan-400 font-mono text-xs">{tech.id}</td>
                                                    <td className="py-2 px-3 text-white text-xs">{tech.name}</td>
                                                    <td className="py-2 px-3 text-grey text-xs">{tech.detail}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="p-3 bg-red-500/10 rounded">
                                    <span className="text-red-400 font-semibold text-xs">CONSEQUENCE: </span>
                                    <span className="text-grey text-xs">{scenario.consequence}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 5: NIS2 Compliance */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Lock className="text-cyan-400" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">5. REGULATORY THREAT HORIZON: NIS2</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-cyan-400 font-mono text-sm mb-4">THE NIS2 DIRECTIVE: A COMPLIANCE CLIFF</h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-black/40 rounded">
                                    <p className="text-white font-semibold text-sm">Scope</p>
                                    <p className="text-grey text-xs">
                                        ofi falls under "Production, processing and distribution of food" sector. Qualifies as "Important" or potentially "Essential" entity.
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                                    <p className="text-blue-400 font-semibold text-sm">🇩🇪 Germany (BSIG)</p>
                                    <p className="text-grey text-xs">
                                        Mannheim facility subjects ofi to German NIS2 implementation. Strict requirements for risk management, supply chain security, and 24-hour incident reporting.
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                                    <p className="text-orange-400 font-semibold text-sm">🇳🇱 Netherlands (Wbni)</p>
                                    <p className="text-grey text-xs">
                                        Koog aan de Zaan facility and significant Dutch presence require compliance with Dutch cybersecurity laws.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500">
                            <h3 className="text-red-400 font-mono text-sm mb-4">PENALTIES & PERSONAL LIABILITY</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-red-500/10 rounded">
                                    <p className="text-white font-bold text-2xl">€10M or 2%</p>
                                    <p className="text-grey text-xs">of global turnover for non-compliance</p>
                                </div>
                                <div className="p-4 bg-red-500/10 rounded">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="text-red-400" size={16} />
                                        <p className="text-red-400 font-semibold text-sm">DIRECTOR LIABILITY</p>
                                    </div>
                                    <p className="text-grey text-xs">
                                        Management bodies (Directors) can be held personally liable for failing to approve and oversee cybersecurity measures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Section 6: GTM Strategy */}
            <section className="px-6 lg:px-16  py-16">
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-8">
                        <Crosshair className="text-oxot-gold" size={24} />
                        <h2 className="text-2xl font-bold text-white font-mono">6. GO-TO-MARKET (GTM) STRATEGY</h2>
                    </div>

                    <p className="text-grey mb-8 max-w-4xl">
                        This GTM strategy is designed to penetrate ofi by addressing specific "Unsatisfied Requirements":
                        <span className="text-oxot-gold"> OT security specialization</span>,
                        <span className="text-blue-400"> NIS2 compliance validation</span>, and
                        <span className="text-emerald-400"> capital project commissioning</span>.
                    </p>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {GTM_WEDGES.map((wedge, i) => (
                            <motion.div
                                key={wedge.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-xl"
                            >
                                <div className="mb-4">
                                    <h3 className="text-white font-bold text-lg">{wedge.title}</h3>
                                    <span className="text-oxot-gold text-xs font-mono">{wedge.subtitle}</span>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-grey text-xs mb-1">Context:</p>
                                        <p className="text-white">{wedge.context}</p>
                                    </div>
                                    <div>
                                        <p className="text-grey text-xs mb-1">Offer:</p>
                                        <p className="text-oxot-gold font-semibold">"{wedge.offer}"</p>
                                    </div>
                                    <div>
                                        <p className="text-grey text-xs mb-1">Detail:</p>
                                        <p className="text-grey">{wedge.detail}</p>
                                    </div>
                                    <div className="pt-2 border-t border-white/10">
                                        <p className="text-grey text-xs mb-1">Target:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {wedge.targets.map((target, j) => (
                                                <span key={j} className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded">
                                                    {target}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Conclusion */}
            <section className="px-6 lg:px-16  py-16 bg-black/40">
                <ScrollReveal>
                    <div className="glass-panel p-8 rounded-xl border border-oxot-gold/30">
                        <h2 className="text-2xl font-bold text-white font-mono mb-6">CONCLUSION</h2>
                        <p className="text-grey leading-relaxed mb-4">
                            Olam Food Ingredients is a <span className="text-oxot-gold font-semibold">"Target Rich Environment"</span> for a specialized
                            cybersecurity firm. The organization is:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                                <p className="text-emerald-400 font-bold text-lg">$500M</p>
                                <p className="text-grey text-xs">Capital-rich investment</p>
                            </div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
                                <p className="text-blue-400 font-bold text-lg">120+</p>
                                <p className="text-grey text-xs">Asset-heavy plants</p>
                            </div>
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                                <p className="text-red-400 font-bold text-lg">NIS2</p>
                                <p className="text-grey text-xs">Regulation-bound</p>
                            </div>
                        </div>
                        <p className="text-grey leading-relaxed">
                            The strategy is not to sell "cybersecurity" in the abstract, but to sell
                            <span className="text-oxot-gold font-semibold"> "Industrial Resilience"</span> and
                            <span className="text-blue-400 font-semibold"> "Regulatory Assurance"</span> in the specific context
                            of their evolving business—safeguarding the very assets that generate their 29% profit growth.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="px-6 lg:px-16  py-8 border-t border-white/10">
                <div className="flex items-center justify-between text-xs font-mono text-grey">
                    <div>
                        <span className="text-oxot-gold">OXOT SOVEREIGN INTELLIGENCE</span> • Cyber Threat GTM Strategy
                    </div>
                    <div>
                        <span className="text-orange-400">END OF REPORT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
