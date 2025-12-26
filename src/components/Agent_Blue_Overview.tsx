"use client";

import React, { useRef, useEffect } from 'react';
import { Shield, Network, Brain, Database, GitBranch, Target, Zap, Eye, Search, Lock, TrendingUp, AlertTriangle, CheckCircle, Layers, Globe, Users, FileText, Activity, BarChart3, Cpu, Box as BoxIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BlueShieldGlobe } from './BlueShieldGlobe';
import DigitalTwinDeepDive from './DigitalTwinDeepDive';
import { BlueTeamLogo } from './BlueTeamLogo';
import ContactFormCTA from './ContactFormCTA';

import NowNextNeverTimeline from './NowNextNeverTimeline';
import { OXOTLogo } from './branding/OXOTLogo';
import { OXOTBadge } from './branding/OXOTBadge';
import { PageHeader } from './branding/PageHeader';

// Mock hook for now to avoid dependency hell, can be replaced with real hook if available
const useEPSS = (cve: string) => ({ score: { epss: 0.965 }, loading: false });

// Defensive concepts for background particles
const DEFENSIVE_CONCEPTS = [
    { text: "Zero Trust", type: "PRINCIPLE" },
    { text: "Assume Breach", type: "PRINCIPLE" },
    { text: "Defense in Depth", type: "STRATEGY" },
    { text: "Least Privilege", type: "PRINCIPLE" },
    { text: "Threat Hunting", type: "ACTIVITY" },
    { text: "Predictive Analytics", type: "CAPABILITY" },
    { text: "Digital Twin", type: "TECHNOLOGY" },
    { text: "Proactive Defense", type: "PARADIGM" },
    { text: "CVE Monitoring", type: "ACTIVITY" },
    { text: "EPSS Scoring", type: "METRIC" },
    { text: "Supply Chain Security", type: "DOMAIN" },
    { text: "Behavior Analysis", type: "TECHNIQUE" },
    { text: "Anomaly Detection", type: "CAPABILITY" },
    { text: "Risk Prioritization", type: "PROCESS" },
    { text: "NOW/NEXT/NEVER", type: "FRAMEWORK" },
];

export default function AgentBluePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Example EPSS integration
    const { score: epssScore, loading: epssLoading } = useEPSS('CVE-2023-3519');

    useEffect(() => {
        // Particle animation
        const particles = DEFENSIVE_CONCEPTS.map((_, i) => document.getElementById(`defensive-concept-${i}`));

        const animate = () => {
            particles.forEach((p, i) => {
                if (!p) return;
                const speed = 0.2 + (i % 3) * 0.1;
                const currentY = parseFloat(p.style.top || '50') + speed;
                const currentX = parseFloat(p.style.left || '50') + Math.sin(Date.now() * 0.001 + i) * 0.2;

                p.style.top = currentY > 100 ? '0%' : `${currentY}%`;
                p.style.left = `${currentX}%`;
            });
            requestAnimationFrame(animate);
        };

        // Initialize positions
        particles.forEach((p, i) => {
            if (p) {
                p.style.top = `${Math.random() * 100}%`;
                p.style.left = `${Math.random() * 100}%`;
            }
        });

        animate();
    }, []);

    const defensiveCapabilities = [
        { icon: <Database className="w-6 h-6" />, title: "Digital Twin Simulation", desc: "Virtual replicas of customer environments for risk-free vulnerability assessment" },
        { icon: <Brain className="w-6 h-6" />, title: "gGNN Intelligence", desc: "Gated Graph Neural Networks with McKenney-Lacan calculus and E27 prediction engine" },
        { icon: <Zap className="w-6 h-6" />, title: "E27 Prediction Engine", desc: "Mathematical models forecasting future threat vectors" },
        { icon: <Shield className="w-6 h-6" />, title: "6-Level Architecture", desc: "Comprehensive protection from equipment to geopolitics" },
        { icon: <Network className="w-6 h-6" />, title: "Deep SBOM Analysis", desc: "Supply chain security without active scanning" },
        { icon: <Users className="w-6 h-6" />, title: "McKenney-Lacan Psychology", desc: "Human factor and organizational bias detection" },
    ];

    const intelligenceSources = [
        { name: "CVE", count: "200K+", desc: "Common Vulnerabilities & Exposures" },
        { name: "CWE", count: "900+", desc: "Common Weakness Enumeration" },
        { name: "CAPEC", count: "500+", desc: "Attack Pattern Catalog" },
        { name: "MITRE ATT&CK", count: "14 Tactics", desc: "Adversary Tactics & Techniques" },
        { name: "EPSS", count: "Real-time", desc: "Exploit Prediction Scoring" },
        { name: "Global Feeds", count: "24/7", desc: "Worldwide threat intelligence" },
    ];

    const defensiveScenarios = [
        {
            title: "Predictive Patching",
            problem: "Unknown which vulnerabilities will be exploited next",
            solution: "E27 Engine analyzes EPSS scores, threat actor behavior, and geopolitical context to prioritize patching",
            outcome: "75% reduction in critical exposure window"
        },
        {
            title: "Supply Chain Defense",
            problem: "Third-party software dependencies create blind spots",
            solution: "Deep SBOM maps entire dependency tree, digital twin simulates malicious package injection",
            outcome: "100% visibility into transitive dependencies"
        },
        {
            title: "Human Factor Analysis",
            problem: "Social engineering bypasses technical controls",
            solution: "McKenney-Lacan calculus identifies high-risk personnel based on psychology and organizational culture",
            outcome: "Targeted training reduces phishing success by 90%"
        },
        {
            title: "Zero-Day Preparation",
            problem: "No signatures exist for unknown threats",
            solution: "gGNN subminds analyze attack patterns, predict novel techniques, pre-position defenses",
            outcome: "Detection of zero-days within 4 hours vs industry average 200+ days"
        },
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent text-gray-300 font-sans selection:bg-oxot-blue/30 selection:text-white overflow-hidden">

            {/* Background (Global applied in TerminalFrame) */}

            {/* Hero Section */}

            {/* Hero Section */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center relative px-4">

                <div className="mb-8 flex flex-col items-center gap-6">
                    <BlueTeamLogo />
                </div>

                <PageHeader
                    title="AGENT BLUE TEAM"
                    subtitle="Predictive Threat Intelligence Powered by the AEON Cyber Digital Twin"
                    variant="hero"
                    accent="blue"
                    className="mb-12"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ opacity }}
                    className="text-center z-10"
                >
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Shifting the paradigm from <span className="text-red-400 line-through">reactive firefighting</span> to <span className="text-oxot-blue-light font-bold">proactive prediction</span>.
                        Combining technical vulnerabilities, human psychology, organizational culture, and geopolitical context into a unified defensive intelligence platform.
                    </p>
                </motion.div>

                <div className="flex flex-wrap gap-4 justify-center text-sm">
                    <div className="px-6 py-3 bg-oxot-blue/10 border border-oxot-blue/30 rounded">
                        <Shield className="w-5 h-5 inline mr-2 text-oxot-blue-light" />
                        <span className="text-white font-bold">24/7 Protection</span>
                    </div>
                    <div className="px-6 py-3 bg-oxot-blue/10 border border-oxot-blue/30 rounded">
                        <Brain className="w-5 h-5 inline mr-2 text-oxot-blue" />
                        <span className="text-white font-bold">AI-Powered Analysis</span>
                    </div>
                    <div className="px-6 py-3 bg-oxot-gold/10 border border-oxot-gold/30 rounded">
                        <Zap className="w-5 h-5 inline mr-2 text-oxot-gold" />
                        <span className="text-white font-bold">Predictive Intelligence</span>
                    </div>
                </div>

                <div className="absolute bottom-10 animate-bounce">
                    <div className="w-6 h-10 border-2 border-oxot-blue/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-oxot-blue-light rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 space-y-32">

                {/* Philosophy Section */}
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-black text-white mb-4 leading-tight">THE DEFENSIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxot-blue-light to-oxot-blue">PARADIGM SHIFT</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-sm">Moving from reactive firefighting to proactive, data-driven defense.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 bg-black/40 border-l-4 border-red-500/50 rounded-r-xl backdrop-blur-sm hover:bg-red-950/10 transition-colors">
                            <h3 className="text-red-400 font-bold mb-4 flex items-center gap-3 text-xl">
                                <div className="p-2 bg-red-500/10 rounded-lg"><AlertTriangle size={24} /></div>
                                THE OLD WAY: Reactive
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li className="flex gap-3"><span className="text-red-500">•</span> Wait for attacks to happen</li>
                                <li className="flex gap-3"><span className="text-red-500">•</span> Patch after exploitation</li>
                                <li className="flex gap-3"><span className="text-red-500">•</span> Rely on signature-based detection</li>
                                <li className="flex gap-3"><span className="text-red-500">•</span> Respond to incidents post-breach</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-black/40 border-l-4 border-oxot-blue rounded-r-xl backdrop-blur-sm hover:bg-oxot-blue/5 transition-colors shadow-[0_0_20px_rgba(0,66,214,0.1)]">
                            <h3 className="text-oxot-blue-light font-bold mb-4 flex items-center gap-3 text-xl">
                                <div className="p-2 bg-oxot-blue/10 rounded-lg"><CheckCircle size={24} /></div>
                                THE AEON WAY: Proactive
                            </h3>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li className="flex gap-3"><span className="text-oxot-blue-light">✓</span> Predict attacks before they launch</li>
                                <li className="flex gap-3"><span className="text-oxot-blue-light">✓</span> Prioritize by exploit probability (EPSS)</li>
                                <li className="flex gap-3"><span className="text-oxot-blue-light">✓</span> Behavioral and anomaly-based detection</li>
                                <li className="flex gap-3"><span className="text-oxot-blue-light">✓</span> Pre-position defenses based on predictions</li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-oxot-blue/10 to-transparent rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-white font-black uppercase text-xl flex items-center gap-3">
                                    <Target size={20} className="text-oxot-blue" /> NOW / NEXT / NEVER
                                </h4>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 tracking-widest">DECISION FRAMEWORK</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-8 leading-relaxed border-b border-white/5 pb-8">
                                A <span className="text-white font-bold">strategic prioritization framework</span> powered by the full AEON Cyber Digital Twin.
                                Synthesis of <span className="text-oxot-blue-light">Blue Team threat intel</span>,
                                <span className="text-oxot-red"> Red Team simulations</span>, and <span className="text-oxot-gold">Gold Team context</span>.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {/* NOW */}
                                <div className="p-5 bg-black/40 border border-red-950/50 rounded-xl hover:bg-red-950/10 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-red-950/30 flex items-center justify-center border border-red-950/50">
                                            <span className="text-red-400 font-mono font-black text-sm">NOW</span>
                                        </div>
                                        <div>
                                            <span className="text-red-400 font-bold text-xs block">IMMEDIATE ACTION</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 text-xs text-gray-400">
                                        <li className="flex items-start gap-2">
                                            <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">CVE-2019-0708 (BlueKeep)</div>
                                                <div className="text-gray-500 text-[10px]">EPSS 23.4% • 42 servers • $2.8M cost</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Activity size={12} className="text-red-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">CVE-2021-44228 (Log4Shell)</div>
                                                <div className="text-gray-500 text-[10px]">EPSS 97.1% • 340 apps • $8.4M</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Zap size={12} className="text-red-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">Red Team confirmed exploitability in Digital Twin</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Shield size={12} className="text-red-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">Siemens S7-1500 CVE-2022-38465</div>
                                                <div className="text-gray-500 text-[10px]">67 PLCs • $14.2M replacement</div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="mt-4 p-2 bg-red-950/20 rounded text-[10px] text-red-300 font-mono border border-red-950/30">
                                        ACTION: Emergency change / OpEx justified
                                    </div>
                                    <div className="mt-2">
                                        <OXOTBadge>Discovered in QTS/KKR M&A DD</OXOTBadge>
                                    </div>
                                </div>

                                {/* NEXT */}
                                <div className="p-5 bg-black/40 border border-yellow-900/40 rounded-xl hover:bg-yellow-950/10 transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-yellow-900/20 flex items-center justify-center border border-yellow-900/40">
                                            <span className="text-yellow-400 font-mono font-black text-sm">NEXT</span>
                                        </div>
                                        <div>
                                            <span className="text-yellow-400 font-bold text-xs block">SCHEDULED REMEDIATION</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 text-xs text-gray-400">
                                        <li className="flex items-start gap-2">
                                            <TrendingUp size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">Rising EPSS trend (1-10%)</div>
                                                <div className="text-gray-500 text-[10px]">GE Proficy: 2.1% → 8.4% in 60 days</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Layers size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">SBOM: OpenSSL 1.0.2 EOL</div>
                                                <div className="text-gray-500 text-[10px]">89 systems • $1.2M firmware updates</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Database size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">Asset in threat model but no active exploitation</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Eye size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-300">$420K refit during maintenance window</div>
                                                <div className="text-gray-500 text-[10px]">Q3 2025 (140 days)</div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="mt-4 p-2 bg-yellow-900/20 rounded text-[10px] text-yellow-300 font-mono border border-yellow-900/30">
                                        ACTION: CapEx planning / Next refit cycle
                                    </div>
                                </div>

                                {/* NEVER */}
                                <div className="p-5 bg-black/40 border border-white/10 rounded-xl hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                            <span className="text-gray-400 font-mono font-black text-sm">NEVER</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 font-bold text-xs block">ACCEPT RISK / BACKLOG</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 text-xs text-gray-500">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle size={12} className="text-gray-600 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-400">EPSS &lt; 1% with no attack path</div>
                                                <div className="text-gray-600 text-[10px]">CVE-2018-XXXX: EPSS 0.3%</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Lock size={12} className="text-gray-600 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-400">Network-isolated asset with compensating controls</div>
                                                <div className="text-gray-600 text-[10px]">Air-gapped lab (12 systems)</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <FileText size={12} className="text-gray-600 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-400">No exploit in wild (6 years old)</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <BarChart3 size={12} className="text-gray-600 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-gray-400">Below risk appetite threshold</div>
                                                <div className="text-gray-600 text-[10px]">$40K/yr monitoring vs $1.8M replacement</div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="mt-4 p-2 bg-white/5 rounded text-[10px] text-gray-400 font-mono border border-white/10">
                                        ACTION: Document risk acceptance / Monitor
                                    </div>
                                </div>
                            </div>

                            {/* Intelligence Inputs */}
                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                <h5 className="text-oxot-blue font-bold text-xs uppercase mb-3 flex items-center gap-2">
                                    <Network size={14} /> Decision Inputs from AEON Core
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-[10px]">
                                    <div className="p-3 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                                        <div className="text-oxot-blue-light font-bold mb-1">Blue Team</div>
                                        <div className="text-gray-400 leading-tight">Threat intel, CVE/EPSS, APT profiles</div>
                                    </div>
                                    <div className="p-3 bg-oxot-red/10 rounded border border-oxot-red/20">
                                        <div className="text-oxot-red font-bold mb-1">Red Team</div>
                                        <div className="text-gray-400 leading-tight">Attack path validation, exploitability</div>
                                    </div>
                                    <div className="p-3 bg-oxot-gold/10 rounded border border-oxot-gold/20">
                                        <div className="text-oxot-gold font-bold mb-1">Gold Team</div>
                                        <div className="text-gray-400 leading-tight">Business context, ROI, refit schedules</div>
                                    </div>
                                    <div className="p-3 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                                        <div className="text-oxot-blue font-bold mb-1">Digital Twin</div>
                                        <div className="text-gray-400 leading-tight">Asset models, SBOMs, telemetry</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Capabilities */}
                {/* Core Capabilities */}
                <section>
                    <h2 className="text-2xl font-black text-white mb-8 text-center">DEFENSIVE CAPABILITIES</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {defensiveCapabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 66, 214, 0.5)' }}
                                className="p-6 bg-black/40 border border-white/10 rounded-xl hover:bg-oxot-blue/5 transition-all cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-full bg-oxot-blue/10 flex items-center justify-center mb-4 text-oxot-blue-light">
                                    {cap.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                                <p className="text-gray-400 text-xs">{cap.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Intelligence Sources */}
                <section className="bg-gradient-to-r from-oxot-blue/10 to-oxot-blue/5 border border-oxot-blue/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-black text-white mb-8 text-center">INTELLIGENCE SOURCES</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {intelligenceSources.map((source, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl font-black text-oxot-blue-light mb-1">{source.count}</div>
                                <div className="text-white font-bold text-xs mb-1 uppercase">{source.name}</div>
                                <div className="text-gray-500 text-[10px] leading-tight">{source.desc}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center text-gray-300 text-sm">
                        <Globe className="w-6 h-6 inline mr-2 text-oxot-blue-light" />
                        Continuously aggregating threat intelligence from <span className="text-oxot-blue-light font-bold">global sources</span> in real-time
                    </div>
                </section>

                {/* Digital Twin Advantage */}
                <section>
                    {/* Digital Twin Advantage */}

                    <h2 className="text-2xl font-black text-white mb-8">THE DIGITAL TWIN ADVANTAGE</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Traditional vulnerability scanning is <span className="text-oxot-red">disruptive, incomplete, and reactive</span>.
                                AEON creates a perfect <span className="text-oxot-blue-light font-bold">virtual replica</span> of your entire infrastructure.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-oxot-blue-light shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold">Non-Invasive Assessment</h4>
                                        <p className="text-gray-400 text-sm">No scanners touching production systems. Zero risk of disruption.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-oxot-blue-light shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold">Complete Asset Visibility</h4>
                                        <p className="text-gray-400 text-sm">Every device, every application, every dependency mapped automatically.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-oxot-blue-light shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold">Simulation-Based Testing</h4>
                                        <p className="text-gray-400 text-sm">Test attack scenarios in the twin without risking real infrastructure.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-oxot-blue-light shrink-0 mt-1" />
                                    <div>
                                        <h4 className="text-white font-bold">Continuous Monitoring</h4>
                                        <p className="text-gray-400 text-sm">Real-time updates as infrastructure changes, vulnerabilities emerge.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/60 border border-oxot-blue/30 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Customer Digital Twin</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center p-3 bg-oxot-blue/5 rounded">
                                    <span className="text-gray-300">Critical Infrastructure Facilities</span>
                                    <span className="text-oxot-blue-light font-mono font-bold">47</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-oxot-blue/5 rounded">
                                    <span className="text-gray-300">Industrial Equipment Mapped</span>
                                    <span className="text-oxot-blue-light font-mono font-bold">12,847</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-oxot-blue/5 rounded">
                                    <span className="text-gray-300">Software Components Tracked</span>
                                    <span className="text-oxot-blue-light font-mono font-bold">89,234</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-oxot-blue/5 rounded">
                                    <span className="text-gray-300">Vulnerability Simulations Run</span>
                                    <span className="text-oxot-blue-light font-mono font-bold">1.4M</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-oxot-blue/5 rounded">
                                    <span className="text-gray-300">Attack Paths Analyzed</span>
                                    <span className="text-oxot-blue-light font-mono font-bold">2.8M</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-oxot-blue/10 border border-oxot-blue/30 rounded">
                                <p className="text-oxot-blue-light text-xs font-mono text-center">
                                    TWIN ACCURACY: 99.7% | LAST SYNC: 14 seconds ago
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Digital Twin Deep Dive (New 5x Section) */}
                <DigitalTwinDeepDive />

                {/* gGNN Network */}
                <section>
                    {/* gGNN Network */}

                    <h2 className="text-2xl font-black text-white mb-6">THE gGNN NETWORK</h2>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-4xl">
                        The <span className="text-oxot-blue-light font-bold">Gated Graph Neural Networks</span> (gGNN) create a distributed AI system where specialized subminds
                        compartmentalize knowledge domains, become experts, and collaborate to make optimal defensive decisions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-gradient-to-br from-oxot-blue/10 to-oxot-blue/5 border border-oxot-blue/30 rounded-xl">
                            <Brain className="w-12 h-12 text-oxot-blue mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-4">Specialized Subminds</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-center gap-2"><Database size={16} className="text-oxot-blue-light" /> <strong>CVE Specialist:</strong> Monitors 200K+ vulnerabilities</li>
                                <li className="flex items-center gap-2"><Network size={16} className="text-oxot-blue-light" /> <strong>Network Analyst:</strong> Maps attack paths and lateral movement</li>
                                <li className="flex items-center gap-2"><Users size={16} className="text-oxot-blue-light" /> <strong>Psychology Expert:</strong> McKenney-Lacan behavioral analysis</li>
                                <li className="flex items-center gap-2"><Globe size={16} className="text-oxot-blue-light" /> <strong>Geopolitical Monitor:</strong> Tracks nation-state activities</li>
                                <li className="flex items-center gap-2"><FileText size={16} className="text-oxot-blue-light" /> <strong>Compliance Guardian:</strong> Industry regulations and standards</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-oxot-blue/5 to-oxot-gold/5 border border-oxot-blue/30 rounded-xl">
                            <Cpu className="w-12 h-12 text-oxot-blue-light mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-4">Autonomous Learning</h3>
                            <p className="text-gray-300 mb-4">
                                Each submind is <span className="text-oxot-blue-light font-bold">deeply curious</span> and continuously expands the knowledge graph:
                            </p>
                            <ul className="space-y-3 text-gray-300">
                                <li>• Discovers new threat patterns independently</li>
                                <li>• Correlates disparate intelligence sources</li>
                                <li>• Challenges assumptions and identifies biases</li>
                                <li>• Proposes novel defensive strategies</li>
                                <li>• Shares insights across the collective network</li>
                            </ul>
                            <div className="mt-4 p-3 bg-oxot-blue/10 rounded border border-oxot-blue/20">
                                <p className="text-oxot-blue-light text-xs font-mono">
                                    Active Subminds: 47 | New Insights Today: 1,284 | Collaboration Events: 89,432
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* E27 Engine */}
                <section className="bg-gradient-to-r from-oxot-blue/5 to-oxot-blue/10 border border-oxot-blue/20 rounded-2xl p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <Zap className="w-16 h-16 text-oxot-gold" />
                        <div>
                            <h2 className="text-2xl font-black text-white">THE E27 PREDICTION ENGINE</h2>
                            <p className="text-oxot-blue-light text-base">Mathematical Models of Future Threats</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-xl text-gray-300 leading-relaxed">
                                The E27 Engine applies <span className="text-oxot-gold font-bold">TRUE MATH</span> to cybersecurity.
                                Not heuristics. Not guesses. <span className="text-white font-bold">Mathematical certainty</span> about threat evolution.
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 bg-oxot-gold/5 border-l-4 border-oxot-gold">
                                    <h4 className="text-oxot-gold font-bold mb-2">Temporal Analysis</h4>
                                    <p className="text-gray-300 text-sm">Predicts when vulnerabilities will transition from theoretical to actively exploited</p>
                                </div>
                                <div className="p-4 bg-oxot-red/5 border-l-4 border-oxot-red">
                                    <h4 className="text-oxot-red font-bold mb-2">Pattern Projection</h4>
                                    <p className="text-gray-300 text-sm">Identifies emerging attack patterns before they're documented in threat intelligence</p>
                                </div>
                                <div className="p-4 bg-oxot-red/10 border-l-4 border-oxot-red">
                                    <h4 className="text-oxot-red font-bold mb-2">Risk Cascades</h4>
                                    <p className="text-gray-300 text-sm">Models how one vulnerability can trigger chain reactions across infrastructure</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-black/60 border border-oxot-gold/30 rounded-xl">
                                <h4 className="text-white font-bold mb-4 text-lg">Predictive Accuracy Metrics</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300 text-sm">0-Day Prediction</span>
                                            <span className="text-oxot-gold font-mono font-bold">87%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-800 rounded-full">
                                            <div className="w-[87%] h-2 bg-gradient-to-r from-oxot-gold to-oxot-red rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300 text-sm">TTP Evolution</span>
                                            <span className="text-oxot-red font-mono font-bold">92%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-800 rounded-full">
                                            <div className="w-[92%] h-2 bg-gradient-to-r from-oxot-red to-oxot-red rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300 text-sm">Threat Actor Targeting</span>
                                            <span className="text-oxot-red font-mono font-bold">83%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-800 rounded-full">
                                            <div className="w-[83%] h-2 bg-gradient-to-r from-oxot-red to-oxot-red rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-oxot-blue/5 border border-oxot-blue/30 rounded-xl">
                                <h4 className="text-oxot-blue-light font-bold mb-3">Integration with EPSS</h4>
                                <p className="text-gray-300 text-sm mb-4">
                                    E27 enhances FIRST.org's Exploit Prediction Scoring System by adding organizational context,
                                    industry-specific threats, and geopolitical factors.
                                </p>
                                {epssScore && (
                                    <div className="p-3 bg-black/40 rounded border border-oxot-blue/20">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-xs">Example CVE-2023-3519</span>
                                            <span className="text-oxot-blue-light font-mono text-sm">
                                                EPSS: {(Number(epssScore.epss) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* McKenney-Lacan Integration */}
                <section>
                    {/* McKenney-Lacan Integration */}

                    <h2 className="text-2xl font-black text-white mb-8">HUMAN FACTOR ANALYSIS</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <p className="text-xl text-gray-300 leading-relaxed">
                                The <span className="text-cyan-400 font-bold">McKenney-Lacan Calculus</span> is a mathematical framework
                                for modeling human psychology, organizational culture, and decision-making biases in security contexts.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-oxot-red/5 border border-oxot-red/30 rounded-xl">
                                    <Users className="w-8 h-8 text-oxot-red mb-3" />
                                    <h3 className="text-white font-bold mb-2">Individual Psychology</h3>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                        <li>• Big Five personality traits</li>
                                        <li>• DISC behavioral profiles</li>
                                        <li>• Cognitive bias mapping</li>
                                        <li>• Phishing susceptibility scoring</li>
                                    </ul>
                                </div>

                                <div className="p-6 bg-oxot-blue/5 border border-oxot-blue/30 rounded-xl">
                                    <Network className="w-8 h-8 text-oxot-blue mb-3" />
                                    <h3 className="text-white font-bold mb-2">Organizational Culture</h3>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                        <li>• Security awareness maturity</li>
                                        <li>• Decision-making hierarchies</li>
                                        <li>• Groupthink detection</li>
                                        <li>• Change resistance patterns</li>
                                    </ul>
                                </div>

                                <div className="p-6 bg-oxot-blue/5 border border-oxot-blue/30 rounded-xl">
                                    <BarChart3 className="w-8 h-8 text-oxot-blue-light mb-3" />
                                    <h3 className="text-white font-bold mb-2">Bias Identification</h3>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                        <li>• Confirmation bias in threat assessment</li>
                                        <li>• Normalcy bias in incident response</li>
                                        <li>• Authority bias in compliance</li>
                                        <li>• Availability heuristic in prioritization</li>
                                    </ul>
                                </div>

                                <div className="p-6 bg-oxot-gold/5 border border-oxot-gold/30 rounded-xl">
                                    <Target className="w-8 h-8 text-oxot-gold mb-3" />
                                    <h3 className="text-white font-bold mb-2">Targeted Interventions</h3>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                        <li>• Personalized training programs</li>
                                        <li>• Role-specific simulations</li>
                                        <li>• Cultural transformation roadmaps</li>
                                        <li>• Executive decision support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-oxot-red/10 to-oxot-blue/10 border border-oxot-red/30 rounded-xl">
                            <h3 className="text-2xl font-bold text-white mb-6">Why It Matters</h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-oxot-red/10 border-l-4 border-oxot-red">
                                    <p className="text-oxot-red font-bold mb-2">82% of breaches</p>
                                    <p className="text-gray-300 text-sm">involve the human element (Verizon DBIR)</p>
                                </div>
                                <div className="p-4 bg-oxot-red/5 border-l-4 border-oxot-red">
                                    <p className="text-oxot-red font-bold mb-2">$4.45M average cost</p>
                                    <p className="text-gray-300 text-sm">of data breaches in 2023 (IBM)</p>
                                </div>
                                <div className="p-4 bg-oxot-blue/10 border-l-4 border-oxot-blue">
                                    <p className="text-oxot-blue-light font-bold mb-2">90% reduction</p>
                                    <p className="text-gray-300 text-sm">in phishing success with targeted training</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm mt-6 italic">
                                "The weakest link is human. But humans are also the strongest asset when equipped with the right knowledge and tools."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Defensive Scenarios */}
                <section>

                    <h2 className="text-2xl font-black text-white mb-8 text-center">DEFENSE IN ACTION</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {defensiveScenarios.map((scenario, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-gradient-to-br from-oxot-blue/5 to-oxot-blue/10 border border-oxot-blue/30 rounded-xl hover:border-oxot-blue/60 transition-all"
                            >
                                <h3 className="text-2xl font-bold text-oxot-blue-light mb-4">{scenario.title}</h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle size={16} className="text-oxot-red" />
                                            <span className="text-oxot-red font-bold text-sm">PROBLEM</span>
                                        </div>
                                        <p className="text-gray-300 text-sm">{scenario.problem}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Shield size={16} className="text-oxot-blue-light" />
                                            <span className="text-oxot-blue-light font-bold text-sm">AEON SOLUTION</span>
                                        </div>
                                        <p className="text-gray-300 text-sm">{scenario.solution}</p>
                                    </div>

                                    <div className="pt-4 border-t border-oxot-blue/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp size={16} className="text-oxot-gold" />
                                            <span className="text-oxot-gold font-bold text-sm">OUTCOME</span>
                                        </div>
                                        <p className="text-oxot-gold font-bold text-sm">{scenario.outcome}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>



            </div>

            {/* CTA Section */}
            <ContactFormCTA
                variant="blue"
                headline="Every Hour Without Predictive Defense Is a Blind Spot."
                subheadline="CISOs can't protect what they can't predict. Get ahead of the threat curve."
            />

        </div >
    );
}
