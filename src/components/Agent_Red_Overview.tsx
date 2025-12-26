"use client";

import React, { useRef, useEffect } from 'react';
import AgentRedVisualization from './agent-red/AgentRedVisualization';
import ContactFormCTA from './ContactFormCTA';
import SectorGrid from './agent-red/SectorGrid';
import { Target, Terminal, Network, Zap, Crosshair, Shield, Globe, Database, Cloud, Wifi, GitBranch, Box as BoxIcon, Search, FileCode, CheckCircle, Eye, Share2, ChevronDown, AlertTriangle, GitMerge } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLiveNews } from '../services/liveData';
import { OXOTLogo } from './branding/OXOTLogo';
import { PageHeader } from './branding/PageHeader';

// --- PARTICLES DATA ---
const CONCEPTS = [
    { text: "Confirmation Bias", type: "BIAS" },
    { text: "Openness", type: "BIG5" },
    { text: "Dominance", type: "DISC" },
    { text: "Normalcy Bias", type: "BIAS" },
    { text: "Neuroticism", type: "BIG5" },
    { text: "Compliance", type: "DISC" },
    { text: "Groupthink", type: "SOC" },
    { text: "Authority Bias", type: "BIAS" },
    { text: "Anchoring", type: "BIAS" },
    { text: "Conscientiousness", type: "BIG5" },
    { text: "Influence", type: "DISC" },
    { text: "Sunk Cost", type: "BIAS" },
    { text: "Agreeableness", type: "BIG5" },
    { text: "Mimetic Desire", type: "SOC" },
    { text: "Steadiness", type: "DISC" }
];

export default function AgentRedPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const { news, loading: newsLoading } = useLiveNews('cybersecurity threat');

    // Fallback ticker items if news is loading or empty
    const defaultTickerItems = [
        "CRITICAL: APT29 lateral movement detected in Sector 4",
        "WARNING: Zero-day exploit identified in OpenSSL 3.0.1",
        "ALERT: New ransomware variant 'BlackBastion' targeting healthcare",
        "SYSTEM: Neural lattice re-calibration in progress...",
        "INTEL: Dark web chatter indicates imminent attack on energy grid"
    ];

    const tickerItems = news.length > 0
        ? news.map(n => `LIVE: ${n.title} - ${n.source.name}`)
        : defaultTickerItems;

    // Particle Animation Logic
    const particlesRef = useRef(CONCEPTS.map(() => ({
        x: 0, y: 0,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        angle: Math.random() * Math.PI * 2,
        orbitRadius: 120 + Math.random() * 180,
        speed: 0.001 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2
    })));

    useEffect(() => {
        let animationFrame: number;
        let time = 0;
        const animate = () => {
            time += 0.01;
            particlesRef.current.forEach((p, i) => {
                p.angle += p.speed;
                const r = p.orbitRadius + Math.sin(time + p.phase) * 20;
                const targetX = Math.cos(p.angle) * r;
                const targetY = Math.sin(p.angle * 0.8) * (r * 0.8);
                p.x += (targetX - p.x) * 0.05;
                p.y += (targetY - p.y) * 0.05;
                const el = document.getElementById(`concept-${i}`);
                if (el) {
                    const noiseX = Math.sin(time * 2 + p.phase) * 5;
                    const noiseY = Math.cos(time * 1.5 + p.phase) * 5;
                    el.style.transform = `translate(${p.x + noiseX}px, ${p.y + noiseY}px)`;
                    el.style.opacity = `${0.2 + Math.sin(time + p.phase) * 0.15}`;
                }
            });
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const squad = [
        {
            name: "CLOUD WRAITH",
            role: "External Pivot",
            desc: "Specializes in cloud infrastructure. Sets up 'Drive-by' websites and compromised S3 buckets to lure targets.",
            icon: <Cloud className="w-8 h-8 text-oxot-blue" />
        },
        {
            name: "SIGNAL PHANTOM",
            role: "Wireless Interceptor",
            desc: "Deploys 'Evil Twin' SSIDs. Captures handshakes and tricks users into fake corporate portals.",
            icon: <Wifi className="w-8 h-8 text-oxot-gold" />
        },
        {
            name: "THE MOLE",
            role: "Internal Pivot",
            desc: "Living off the land. Runs Responder & Bloodhound to map AD paths. Moves laterally without malware.",
            icon: <GitBranch className="w-8 h-8 text-oxot-blue-light" />
        },
        {
            name: "SANDBOX ZERO",
            role: "Virtualization Engine",
            desc: "Spins up exact replicas of target hardware for safe exploit testing before live deployment.",
            icon: <BoxIcon className="w-8 h-8 text-oxot-red" />
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent text-gray-300 font-sans selection:bg-primary/30 selection:text-white overflow-hidden">

            {/* Global Background (handled by TerminalFrame) */}


            {/* HERO SECTION: RED LEADER (Restored with Framer Motion) */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 p-4">
                <motion.div style={{ opacity, scale }} className="text-center max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-8 flex flex-col items-center gap-6"
                    >
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 bg-red-950 blur-[60px] opacity-20 animate-pulse"></div>
                            <div className="absolute inset-0 border border-red-900/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-4 border border-red-900/40 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                            <Target className="w-20 h-20 text-red-500 relative z-10 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                        </div>
                    </motion.div>

                    <PageHeader
                        title="AGENT RED LEADER"
                        subtitle="SUBMIND ORCHESTRATOR // Autonomous. Goal-Oriented. Unrelenting."
                        variant="hero"
                        accent="red"
                        className="mb-12"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
                            A fully autonomous adversarial submind equipped with the full capabilities of Kali Linux.
                            Give it a goal, set the Rules of Engagement, and it <span className="text-red-500 font-bold border-b border-red-500/50">will</span> find a way.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
                >
                    <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Initialize</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </motion.div>
            </section>

            {/* SECTION: THE ULTIMATE PREDATOR (Migrated Terminal) */}
            <section className="relative py-20 px-4 z-10 bg-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/30 text-red-400 text-xs font-mono tracking-widest mb-8">
                                <Zap className="w-3 h-3" /> ADVERSARIAL CORE
                            </div>
                            <h2 className="text-2xl font-black text-white mb-6 leading-tight">
                                THE ULTIMATE<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">PREDATOR.</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Red Leader is not a script. It is a dynamic, thinking entity. It builds custom threat models based on the target's specific architecture, then leverages the AEON Core to brainstorm attack vectors using Gated Graph Neural Networks.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
                                        <Terminal className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Full Kali Linux Arsenal</h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            Native access to Metasploit, Nmap, Burp Suite, and custom exploits. It doesn't just run tools; it understands their output and chains them together.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
                                        <Network className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">gGNN Brainstorming</h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            Leverages Gated Graph Neural Networks to model state propagation across the target topology, identifying non-obvious attack paths that standard traversal misses.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all duration-300">
                                        <GitMerge className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Swarm Divergence Theory</h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            Deploys diverse UAV-neural networks with divergent agents. Uses adaptive consensus algorithms to avoid local optima, mathematically guaranteeing convergence on the most devastating attack path.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl">
                                {/* Terminal Visualization */}
                                <div className="font-mono text-xs md:text-sm space-y-2">
                                    <div className="flex gap-2 text-gray-500 border-b border-white/5 pb-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-oxot-red/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-oxot-gold/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-oxot-blue/20"></div>
                                        <span className="ml-auto">red_leader@aeon-core:~</span>
                                    </div>

                                    <div className="text-oxot-gold">$ init_sequence --target="Energy_Sector_Grid_A"</div>
                                    <div className="text-gray-400">[+] Target Acquired: Industrial Control System (ICS)</div>
                                    <div className="text-gray-400">[+] Architecture Analysis: Siemens S7-1500 Detected</div>
                                    <div className="text-gray-400">[+] Vulnerability Scan: CVE-2024-XXXX (Critical)</div>
                                    <div className="text-oxot-gold">[!] GNN Optimization: Attack Path #472 Selected (Probability: 98.2%)</div>
                                    <div className="text-oxot-blue-light">[{">"}] Instantiating Submind: "Signal Phantom" for Wireless Entry...</div>
                                    <div className="text-gray-500 animate-pulse">_</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION: DASHBOARD VISUALIZATION (Existing) */}
            <section className="relative z-10 py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="flex items-center gap-4 text-xs md:text-sm uppercase tracking-widest text-gray-500 font-mono mb-8">
                        <span className="w-8 h-px bg-primary"></span>
                        <span>Live Operations Dashboard</span>
                    </div>
                    <AgentRedVisualization />
                </div>
            </section>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">

                {/* Section 4: Agent Zero Framework */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-8 md:p-12"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

                    {/* Live Ticker */}
                    <div className="bg-red-950/20 border-y border-red-900/30 py-2 overflow-hidden flex items-center gap-4 mb-12">
                        <div className="px-4 text-xs font-bold bg-red-900 text-red-100 animate-pulse whitespace-nowrap">
                            LIVE THREAT FEED
                        </div>
                        <div className="flex-1 overflow-hidden relative h-6">
                            <motion.div
                                animate={{ x: [1000, -2000] }}
                                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                                className="absolute whitespace-nowrap flex gap-16 text-sm text-red-400/80"
                            >
                                {tickerItems.map((item, i) => (
                                    <span key={i} className="flex items-center gap-2">
                                        <AlertTriangle size={12} />
                                        {item}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                        <span className="w-3 h-12 bg-primary mr-6 block rounded-full shadow-[0_0_15px_rgba(0,224,176,0.6)]"></span>
                        RED LEADER SQUADRON
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                        <div>
                            <h4 className="text-xl font-bold text-secondary mb-6 font-mono flex items-center gap-3">
                                <span className="text-gray-600">01 //</span> AUTONOMOUS SUBMIND PERSONAS
                            </h4>
                            <p className="mb-6 text-gray-400">
                                Agent Red does not just run scripts; it births <strong>Subminds</strong>. These are autonomous agents with distinct personas, goals, and capabilities, fit for purpose.
                            </p>

                            {/* Replaced Text List with Visual Cards */}
                            <div className="grid grid-cols-1 gap-4">
                                {squad.map((agent, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-primary/30 transition-colors group"
                                    >
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                {agent.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{agent.name}</h3>
                                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">{agent.role}</div>
                                            <p className="text-gray-400 text-sm leading-relaxed">{agent.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-secondary mb-6 font-mono flex items-center gap-3">
                                <span className="text-gray-600">02 //</span> SELF-PROVISIONING INFRASTRUCTURE
                            </h4>
                            <p className="mb-6 text-gray-400">
                                The Subminds have the authority to provision their own infrastructure in the real world and install small subminds on compromised infrastructure to move laterally.
                            </p>
                            <ul className="space-y-4 text-gray-400">
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-primary/30 transition-colors">
                                    <strong className="text-white block mb-1">Global Presence</strong>
                                    A Red One Leader can spin up a submind in a specific AWS region (e.g., us-east-1) to simulate an attacker operating from that geography.
                                </li>
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-primary/30 transition-colors">
                                    <strong className="text-white block mb-1">Tool Synthesis</strong>
                                    The submind can download tools (nmap, metasploit, sqlmap), install dependencies, and configure its own environment.
                                </li>
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-primary/30 transition-colors">
                                    <strong className="text-white block mb-1">Code Synthesis</strong>
                                    Using an embedded LLM optimized for offensive security, the submind can write custom Python, Go, or Rust scripts on the fly.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-12">
                        <h4 className="text-xl font-bold text-secondary mb-6 font-mono flex items-center gap-3">
                            <span className="text-gray-600">03 //</span> BACKEND TARGET SIMULATION (THE CYBER RANGE)
                        </h4>
                        <p className="mb-8 text-gray-400 max-w-3xl">
                            When a target environment is identified (e.g., a specific GitHub repo, a container image, or a firmware blob), Agent Red spins up an <strong>actual replica</strong> of the target server in the backend.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                            <div className="bg-black/40 p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 text-primary">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <strong className="text-white block mb-2 text-lg">Sandboxed Analysis</strong>
                                It performs full source-code analysis and dynamic testing in a safe, isolated environment.
                            </div>
                            <div className="bg-black/40 p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 text-primary">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <strong className="text-white block mb-2 text-lg">Exploit Verification</strong>
                                It finds vulnerabilities and tests exploits against the replica <em>before</em> deploying them against the live target.
                            </div>
                            <div className="bg-black/40 p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-all group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 text-primary">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <strong className="text-white block mb-2 text-lg">Zero-Risk Validation</strong>
                                This ensures that "destructive" tests can be run without risking the actual production environment.
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section 5: Deep Knowledge Graph */}
                <section>
                    <h3 className="text-2xl font-black text-white mb-12 text-center tracking-tight leading-tight">
                        DEEP KNOWLEDGE<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">GRAPH INTEGRATION</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {/* Deep OSINT Card */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                                        <Globe className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">DEEP OSINT & DARK WEB</h4>
                                </div>
                                <ul className="space-y-4 text-sm text-gray-400">
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">01</span><span><strong className="text-white">Public RFPs:</strong> Analyzes RFPs to identify specific technologies (e.g., "Seeking Cisco ISE vendor").</span></li>
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">02</span><span><strong className="text-white">Job Listings:</strong> Scrapes job boards to infer tech stacks (e.g., "Hiring: Kubernetes Expert").</span></li>
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">03</span><span><strong className="text-white">Employee Profiling:</strong> Maps the org chart via LinkedIn to identify key targets.</span></li>
                                    <li className="flex gap-3"><span className="text-red-500 font-mono">04</span><span><strong className="text-white">Dark Web:</strong> Monitors marketplaces for stolen credentials and "Access for Sale".</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Supply Chain Card */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-oxot-red/20 to-oxot-gold/20 rounded-2xl blur-2xl opacity-50 animate-pulse group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-oxot-red/10 rounded-xl border border-oxot-red/20 group-hover:bg-oxot-red/20 transition-colors">
                                        <Network className="w-8 h-8 text-oxot-red" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">SUPPLY CHAIN INTEL</h4>
                                </div>
                                <ul className="space-y-4 text-sm text-gray-400">
                                    <li className="flex gap-3"><span className="text-oxot-red font-mono">01</span><span><strong className="text-white">Common Suppliers:</strong> Knows the "Shared Fate" of the sector. If SolarWinds is hit, it knows who is affected.</span></li>
                                    <li className="flex gap-3"><span className="text-oxot-red font-mono">02</span><span><strong className="text-white">Operating Manuals:</strong> Ingests thousands of PDF manuals searching for default passwords (admin/1234) and hidden debug ports.</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dark-lighter/80 p-10 border border-white/5 rounded-xl relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
                        <h4 className="text-xl font-bold text-white mb-6 relative z-10">THE 16 CRITICAL INFRASTRUCTURE SECTORS</h4>
                        <p className="text-gray-400 mb-8 relative z-10 max-w-2xl">
                            Agent Red possesses a pre-loaded library of architectural patterns for all 16 sectors. It "knows" what a typical facility looks like, including equipment, processes, suppliers, operation, facility layouts, and common weak points.
                        </p>

                        {/* New Sector Grid Component */}
                        <SectorGrid />

                    </div>
                </section>

                {/* Section 6: 20-Hop Knowledge Graph Traversal */}
                <section className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-transparent"></div>

                    {/* Header */}
                    <div className="relative z-10 mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-widest mb-6">
                            <Network className="w-3 h-3" /> AEON CORE CAPABILITY
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                            20-Hop <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Knowledge Graph</span> Traversal
                        </h3>
                        <p className="text-gray-400 max-w-4xl text-sm leading-relaxed">
                            The AEON Digital Twin maintains a living knowledge graph of <span className="text-white">millions of entities</span>—libraries, CVEs, equipment, systems, applications, suppliers, and communication pathways.
                            Our <span className="text-red-400">Gated Graph Neural Network (GGNN)</span> navigates up to 20 relationship hops to discover attack paths that no human analyst could trace.
                        </p>
                    </div>

                    {/* The Core Value Proposition */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="text-red-500 text-3xl font-black mb-2">Level 0</div>
                            <div className="text-white font-bold mb-2">Reference Architecture</div>
                            <p className="text-gray-500 text-sm">Sector-specific templates: Power grids, water treatment, rail systems—the baseline design patterns for critical infrastructure.</p>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="text-orange-500 text-3xl font-black mb-2">Level 1</div>
                            <div className="text-white font-bold mb-2">Your Actual Environment</div>
                            <p className="text-gray-500 text-sm">Your equipment, your architecture, your operations—every PLC, every library, every supplier relationship mapped and contextualized.</p>
                        </div>
                        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
                            <div className="text-oxot-gold text-3xl font-black mb-2">GGNN</div>
                            <div className="text-white font-bold mb-2">McKenney-Lacan Calculus</div>
                            <p className="text-gray-500 text-sm">AI-powered graph traversal that models attacker behavior, exploits exponential relationship complexity, and predicts 20-hop attack chains.</p>
                        </div>
                    </div>

                    {/* Exponential Complexity Visualization */}
                    <div className="relative z-10 bg-black/50 border border-white/10 rounded-xl p-8 mb-8">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-white mb-4">Exponential Attack Surface Discovery</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-4">
                                        <span className="text-red-400 font-mono w-20">1 Library</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div></div>
                                        <span className="text-gray-500">→ 10 direct dependencies</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-orange-400 font-mono w-20">5 Hops</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div></div>
                                        <span className="text-gray-500">→ 10,000 entity relationships</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-oxot-gold font-mono w-20">10 Hops</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-oxot-gold h-2 rounded-full" style={{ width: '50%' }}></div></div>
                                        <span className="text-gray-500">→ 1M+ potential pathways</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-mono w-20 font-bold">20 Hops</span>
                                        <div className="flex-1 bg-white/5 rounded-full h-2"><div className="bg-gradient-to-r from-oxot-red via-oxot-gold to-oxot-gold h-2 rounded-full" style={{ width: '100%' }}></div></div>
                                        <span className="text-white font-bold">→ Billions of attack vectors</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-px h-32 bg-white/10 hidden lg:block"></div>
                            <div className="lg:w-80 text-center lg:text-left">
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">20</div>
                                <div className="text-white font-bold">Reasoning Hops</div>
                                <p className="text-gray-500 text-xs mt-2">From a single vulnerable library to physical process failure—discovered in milliseconds.</p>
                            </div>
                        </div>
                    </div>

                    {/* Example Attack Chain */}
                    <div className="relative z-10">
                        <h4 className="text-sm font-mono text-red-400 mb-4 uppercase tracking-widest">Example: Supply Chain → SCADA Attack Path</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {[
                                { hop: '1-3', label: 'Vuln Library', icon: <FileCode className="w-4 h-4" /> },
                                { hop: '4-8', label: 'Transitive Deps', icon: <GitBranch className="w-4 h-4" /> },
                                { hop: '9-12', label: 'App Servers', icon: <Database className="w-4 h-4" /> },
                                { hop: '13-17', label: 'OT Bridge', icon: <Network className="w-4 h-4" /> },
                                { hop: '18-20', label: 'PLC Impact', icon: <AlertTriangle className="w-4 h-4" /> }
                            ].map((step, i) => (
                                <div key={i} className="bg-black/40 border border-white/10 rounded-lg p-3 text-center hover:border-red-500/50 transition-colors">
                                    <div className="text-red-400 font-mono text-xs mb-1">Hop {step.hop}</div>
                                    <div className="text-white flex items-center justify-center gap-2">
                                        {step.icon}
                                        <span className="text-xs">{step.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 7: Golden Scenarios - Detailed Static Cards */}
                <section>
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/20 text-red-400 text-xs font-mono tracking-widest mb-6">
                            <Crosshair className="w-3 h-3" /> ATTACK SIMULATION LIBRARY
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4">
                            GOLDEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">SCENARIOS</span>
                        </h3>
                        <p className="text-gray-400 max-w-3xl">
                            Pre-built, high-fidelity attack simulations mapped to real-world adversary tradecraft. Each scenario is designed to stress-test specific detection, response, and recovery capabilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Scenario A: Supply Chain Injection */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                                        <FileCode className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Supply Chain Injection</h4>
                                        <div className="text-xs font-mono text-red-400">MITRE ATT&CK: T1195.001</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-red-500/20 text-red-400 rounded-full">HIGH IMPACT</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                Simulates an attacker compromising your software supply chain via typosquatted NPM/PyPI packages. The malicious package is ingested by your CI/CD pipeline, granting the attacker code execution on build servers and, ultimately, production environments.
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Kill Chain Execution</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">RECON:</strong> Identify internal package names via leaked package-lock.json or job postings mentioning specific libraries.</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">WEAPONIZE:</strong> Publish a typosquatted package (e.g., `lodasg` instead of `lodash`) with a malicious `postinstall` script.</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">DELIVER:</strong> Wait for a developer or CI/CD system to `npm install` the malicious package.</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-red-500 font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">EXPLOIT:</strong> Gain RCE on the build server, exfiltrate secrets (AWS keys, API tokens), and inject backdoors into production artifacts.</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">Strategic Impact</h5>
                                <p className="text-gray-500 text-xs">Tests SCA tooling, dependency verification, and CI/CD hardening. Exposes gaps in software provenance and SBOM integrity.</p>
                            </div>
                        </div>

                        {/* Scenario B: Insider Threat */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-orange-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                                        <Eye className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">The Insider Threat</h4>
                                        <div className="text-xs font-mono text-orange-400">MITRE ATT&CK: T1020, T1078</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full">STEALTH</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                Simulates a disgruntled or compromised employee with legitimate credentials. The "insider" uses their valid access to slowly exfiltrate sensitive data over weeks, blending into normal network traffic to avoid detection by DLP and SIEM systems.
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Kill Chain Execution</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">ACCESS:</strong> Utilize valid credentials (T1078). No exploitation needed; the attacker is already inside.</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">COLLECTION:</strong> Access SharePoint, Confluence, and internal Git repos. Download sensitive design docs and customer lists.</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">STAGING:</strong> Archive collected data into encrypted ZIPs. Rename files to benign names (`meeting_notes.zip`).</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-orange-500 font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">EXFIL:</strong> Exfiltrate via HTTPS to a personal cloud storage (Dropbox, Google Drive) during normal business hours.</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-orange-400 uppercase tracking-widest mb-2">Strategic Impact</h5>
                                <p className="text-gray-500 text-xs">Tests UEBA, DLP effectiveness, and data classification policies. Exposes blind spots in privileged access monitoring.</p>
                            </div>
                        </div>

                        {/* Scenario C: Ransomware Blitz */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-oxot-gold/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-oxot-gold/10 rounded-xl flex items-center justify-center border border-oxot-gold/20">
                                        <Zap className="w-6 h-6 text-oxot-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">Ransomware Blitz</h4>
                                        <div className="text-xs font-mono text-oxot-gold">MITRE ATT&CK: T1486, T1489</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-oxot-gold/20 text-oxot-gold rounded-full">DESTRUCTIVE</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                A full-speed, "Burn the House Down" simulation. The attacker gains initial access, disables defenses, and launches simultaneous encryption routines across the network. Designed to stress-test EDR "Time to Detect" and IR playbook execution speed.
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Kill Chain Execution</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">ACCESS:</strong> Exploit a public-facing web application (T1190) or use phished credentials for VPN access.</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">LATERAL:</strong> Use PsExec/WMI for rapid spread across Windows endpoints via SMB (T1021.002).</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">INHIBIT:</strong> Stop backup services (Veeam, Acronis), delete shadow copies (vssadmin), and disable AV (T1489).</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-gold font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">IMPACT:</strong> Deploy ransomware payload. Encrypt all accessible file shares and drop ransom note.</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-oxot-gold uppercase tracking-widest mb-2">Strategic Impact</h5>
                                <p className="text-gray-500 text-xs">Measures Mean Time To Detect (MTTD) and Mean Time To Respond (MTTR). Validates backup integrity and network segmentation.</p>
                            </div>
                        </div>

                        {/* Scenario D: OT Bridge Jump */}
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-oxot-blue/30 transition-colors">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-oxot-blue/10 rounded-xl flex items-center justify-center border border-oxot-blue/20">
                                        <Network className="w-6 h-6 text-oxot-blue" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">OT/ICS Bridge Jump</h4>
                                        <div className="text-xs font-mono text-oxot-blue-light">MITRE ATT&CK for ICS: T0886</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-1 bg-oxot-blue/20 text-oxot-blue-light rounded-full">CRITICAL</span>
                            </div>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                Simulates an attacker pivoting from the corporate IT network to Operational Technology (OT) networks controlling physical processes. The goal is to reach SCADA/ICS systems via dual-homed engineering workstations or misconfigured network paths.
                            </p>

                            <div className="mb-6">
                                <h5 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Kill Chain Execution</h5>
                                <div className="space-y-2">
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">01</span><span className="text-gray-300"><strong className="text-white">ACCESS:</strong> Spearphish an OT engineer with a tailored lure (fake P&ID diagram, vendor patch notice).</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">02</span><span className="text-gray-300"><strong className="text-white">DISCOVERY:</strong> Scan internal network to identify dual-homed hosts bridging IT/OT (Historian servers, Jump Hosts).</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">03</span><span className="text-gray-300"><strong className="text-white">PIVOT:</strong> Compromise the Jump Host. Use its OT-side NIC to access the SCADA network segment.</span></div>
                                    <div className="flex gap-3 text-sm"><span className="text-oxot-blue-light font-mono font-bold">04</span><span className="text-gray-300"><strong className="text-white">CONTROL:</strong> Send unauthorized commands to a PLC (T0836), causing a physical process disruption (e.g., open a valve, trip a relay).</span></div>
                                </div>
                            </div>

                            <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                                <h5 className="text-xs font-mono text-oxot-blue-light uppercase tracking-widest mb-2">Strategic Impact</h5>
                                <p className="text-gray-500 text-xs">Validates IT/OT segmentation, DMZ integrity, and ICS-specific monitoring. Exposes risks in converged environments per IEC 62443.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <ContactFormCTA
                    variant="red"
                    headline="Your Adversaries Are Already Working."
                    subheadline="Are You Ready to See What They See?"
                />
            </div>
        </div>
    );
}
