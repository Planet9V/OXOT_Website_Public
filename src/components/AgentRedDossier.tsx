"use client";

import React, { useRef, useEffect } from 'react';
import AgentRedVisualization from './agent-red/AgentRedVisualization';
import SectorGrid from './agent-red/SectorGrid';
import { Target, Terminal, Network, Zap, Crosshair, Shield, Globe, Database, Cloud, Wifi, GitBranch, Box as BoxIcon, Search, FileCode, CheckCircle, Eye, Share2, ChevronDown, AlertTriangle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

export default function AgentRedDossier() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const tickerItems = [
        "CRITICAL: APT29 lateral movement detected in Sector 4",
        "WARNING: Zero-day exploit identified in OpenSSL 3.0.1",
        "ALERT: New ransomware variant 'BlackBastion' targeting healthcare",
        "SYSTEM: Neural lattice re-calibration in progress...",
        "INTEL: Dark web chatter indicates imminent attack on energy grid"
    ];

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
            icon: <Wifi className="w-8 h-8 text-oxot-blue" />
        },
        {
            name: "THE MOLE",
            role: "Internal Pivot",
            desc: "Living off the land. Runs Responder & Bloodhound to map AD paths. Moves laterally without malware.",
            icon: <GitBranch className="w-8 h-8 text-oxot-blue" />
        },
        {
            name: "SANDBOX ZERO",
            role: "Virtualization Engine",
            desc: "Spins up exact replicas of target hardware for safe exploit testing before live deployment.",
            icon: <BoxIcon className="w-8 h-8 text-oxot-blue" />
        }
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent text-gray-300 font-mono selection:bg-oxot-red/30 selection:text-white overflow-hidden uppercase font-black">

            {/* Global Background Elements (Particles) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 flex items-center justify-center">
                    {CONCEPTS.map((concept, i) => (
                        <div
                            key={i}
                            id={`concept-${i}`}
                            className={`absolute text-[10px] font-mono whitespace-nowrap transition-colors duration-1000
                                ${concept.type === 'BIAS' ? 'text-oxot-red/20' :
                                    concept.type === 'BIG5' ? 'text-oxot-blue/20' :
                                        concept.type === 'DISC' ? 'text-grey/20' : 'text-white/20'}
                            `}
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {concept.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* HERO SECTION: RED LEADER */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 p-4">
                <motion.div style={{ opacity, scale }} className="text-center max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-12 flex justify-center"
                    >
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="absolute inset-0 bg-oxot-red blur-[60px] opacity-20 animate-pulse"></div>
                            <div className="absolute inset-0 border border-oxot-red/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-4 border border-oxot-red/40 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
                            <Target className="w-20 h-20 text-oxot-red relative z-10 drop-shadow-[0_0_15px_rgba(214,0,0,0.5)]" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-8xl md:text-[10rem] font-black tracking-tighter mb-8 text-white leading-none"
                    >
                        RED LEADER
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <p className="text-2xl md:text-4xl text-gray-400 font-light leading-tight mb-8 uppercase">
                            Autonomous. Goal-Oriented. <span className="text-white font-medium">Unrelenting.</span>
                        </p>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed lowercase tracking-tighter">
                            A fully autonomous adversarial submind equipped with the full capabilities of Kali Linux.
                            Give it a goal, set the Rules of Engagement, and it <span className="text-oxot-red font-black uppercase">will</span> find a way.
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

            {/* SECTION: THE ULTIMATE PREDATOR */}
            <section className="relative py-20 px-4 z-10 bg-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxot-red/5 border border-oxot-red/10 text-oxot-red text-xs font-mono tracking-widest mb-8 uppercase font-black">
                                <Zap className="w-3 h-3" /> ADVERSARIAL CORE
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight uppercase font-black tracking-tighter">
                                THE ULTIMATE<br />
                                <span className="text-oxot-red">PREDATOR.</span>
                            </h2>
                            <p className="text-xl text-gray-400 mb-8 leading-relaxed lowercase tracking-tighter">
                                Red Leader is not a script. It is a dynamic, thinking entity. It builds custom threat models based on the target&apos;s specific architecture, then leverages the AEON Core to brainstorm attack vectors using Gated Graph Neural Networks.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-oxot-red/50 group-hover:bg-oxot-red/10 transition-all duration-300">
                                        <Terminal className="w-6 h-6 text-oxot-red" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-oxot-red transition-colors uppercase font-black">Full Kali Linux Arsenal</h3>
                                        <p className="text-gray-500 leading-relaxed lowercase tracking-tighter text-sm">
                                            Native access to Metasploit, Nmap, Burp Suite, and custom exploits. It doesn&apos;t just run tools; it understands their output and chains them together.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="mt-2 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 shrink-0 group-hover:border-oxot-red/50 group-hover:bg-oxot-red/10 transition-all duration-300">
                                        <Network className="w-6 h-6 text-oxot-red" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-oxot-red transition-colors uppercase font-black">GNN Brainstorming</h3>
                                        <p className="text-gray-500 leading-relaxed lowercase tracking-tighter text-sm">
                                            Offloads complex pathfinding to the AEON Core, simulating millions of potential attack chains in seconds to find the path of least resistance.
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
                            <div className="absolute -inset-4 bg-gradient-to-r from-oxot-red/20 to-orange-500/20 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
                            <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl">
                                {/* Terminal Visualization */}
                                <div className="font-mono text-xs md:text-sm space-y-2 uppercase font-black">
                                    <div className="flex gap-2 text-gray-500 border-b border-white/5 pb-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-oxot-red/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-oxot-blue/20"></div>
                                        <span className="ml-auto">red_leader@oxot-core:~</span>
                                    </div>

                                    <div className="text-green-400">$ init_sequence --target="Energy_Sector_Grid_A"</div>
                                    <div className="text-gray-400">[+] Target Acquired: Industrial Control System (ICS)</div>
                                    <div className="text-gray-400">[+] Architecture Analysis: Siemens S7-1500 Detected</div>
                                    <div className="text-gray-400">[+] Vulnerability Scan: CVE-2024-XXXX (Critical)</div>
                                    <div className="text-yellow-400">[!] GNN Optimization: Attack Path #472 Selected</div>
                                    <div className="text-oxot-blue">[{">"}] Instantiating Submind: "Signal Phantom" for Wireless Entry...</div>
                                    <div className="text-gray-500 animate-pulse">_</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION: DASHBOARD VISUALIZATION */}
            <section className="relative z-10 py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-[1600px] mx-auto px-4">
                    <div className="flex items-center gap-4 text-xs md:text-sm uppercase tracking-widest text-gray-500 font-mono mb-8 font-black">
                        <span className="w-8 h-px bg-oxot-red"></span>
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
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md p-8 md:p-12"
                >
                    {/* Live Ticker */}
                    <div className="bg-oxot-red/10 border-y border-oxot-red/30 py-2 overflow-hidden flex items-center gap-4 mb-12">
                        <div className="px-4 text-xs font-black bg-oxot-red text-white animate-pulse whitespace-nowrap uppercase">
                            LIVE THREAT FEED
                        </div>
                        <div className="flex-1 overflow-hidden relative h-6">
                            <motion.div
                                animate={{ x: [1000, -2000] }}
                                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                                className="absolute whitespace-nowrap flex gap-16 text-sm text-oxot-red/80 uppercase font-black tracking-tighter"
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

                    <h3 className="text-3xl font-black text-white mb-12 flex items-center uppercase tracking-tighter">
                        <span className="w-3 h-12 bg-oxot-red mr-6 block rounded-full shadow-[0_0_15px_rgba(214,0,0,0.6)]"></span>
                        THE AGENT ZERO FRAMEWORK
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                        <div>
                            <h4 className="text-xl font-black text-oxot-blue mb-6 font-mono flex items-center gap-3 uppercase tracking-tighter">
                                <span className="text-gray-600">01 //</span> AUTONOMOUS SUBMIND PERSONAS
                            </h4>
                            <p className="mb-6 text-gray-400 lowercase tracking-tighter">
                                Agent Red does not just run scripts; it births <strong>Subminds</strong>. These are autonomous agents with distinct personas, goals, and capabilities, fit for purpose.
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {squad.map((agent, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4 p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-oxot-red/30 transition-colors group"
                                    >
                                        <div className="shrink-0">
                                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-oxot-red/10 transition-colors">
                                                {agent.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-white mb-1 group-hover:text-oxot-red transition-colors uppercase tracking-tighter">{agent.name}</h3>
                                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 font-black">{agent.role}</div>
                                            <p className="text-gray-400 text-sm leading-relaxed lowercase tracking-tighter">{agent.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                        <div>
                            <h4 className="text-xl font-black text-oxot-blue mb-6 font-mono flex items-center gap-3 uppercase tracking-tighter">
                                <span className="text-gray-600">02 //</span> SELF-PROVISIONING INFRASTRUCTURE
                            </h4>
                            <p className="mb-6 text-gray-400 lowercase tracking-tighter">
                                The Subminds have the authority to provision their own infrastructure in the real world and install small subminds on compromised infrastructure to move laterally.
                            </p>
                            <ul className="space-y-4 text-gray-400 lowercase tracking-tighter text-sm">
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-oxot-red/30 transition-colors">
                                    <strong className="text-white block mb-1 uppercase font-black">Global Presence</strong>
                                    A Red One Leader can spin up a submind in a specific AWS region to simulate an attacker operating from that geography.
                                </li>
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-oxot-red/30 transition-colors">
                                    <strong className="text-white block mb-1 uppercase font-black">Tool Synthesis</strong>
                                    The submind can download tools, install dependencies, and configure its own environment.
                                </li>
                                <li className="bg-black/40 p-4 rounded border border-white/5 hover:border-oxot-red/30 transition-colors">
                                    <strong className="text-white block mb-1 uppercase font-black">Code Synthesis</strong>
                                    Using an embedded LLM optimized for offensive security, the submind can write custom Python, Go, or Rust scripts on the fly.
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Section 5: Sector Grid */}
                <section>
                    <h3 className="text-4xl font-black text-white mb-12 text-center tracking-tighter uppercase">THE 16 CRITICAL INFRASTRUCTURE SECTORS</h3>
                    <p className="text-gray-400 mb-8 text-center max-w-2xl mx-auto lowercase tracking-tighter">
                        Agent Red possesses a pre-loaded library of architectural patterns for all 16 sectors. It &quot;knows&quot; what a typical facility looks like, including equipment, processes, and common weak points.
                    </p>
                    <SectorGrid />
                </section>

                {/* Section 6: Kill Chain */}
                <section className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-10 overflow-hidden relative font-black uppercase">
                    <h3 className="text-3xl font-black text-white mb-8 font-mono flex items-center gap-4 uppercase tracking-tighter">
                        <span className="text-oxot-red">{'>>'}</span> THE 20-HOP REASONING CHAIN
                    </h3>
                    <p className="text-gray-400 mb-12 max-w-3xl lowercase tracking-tighter font-normal text-lg leading-relaxed">Leveraging the AEON Core, Agent Red performs advanced reasoning up to 20 hops deep. It connects dots that no human analyst could see.</p>

                    <div className="space-y-0 relative pl-8 border-l border-white/10">
                        {[
                            { hop: 1, title: "OSINT", desc: "Identify Partner Portal." },
                            { hop: 5, title: "Discovery", desc: "Find hardcoded DB connection string." },
                            { hop: 10, title: "Access", desc: "Deploy Fake Access Point." },
                            { hop: 15, title: "Bridge Jump", desc: "Pivot into the SCADA Network." },
                            { hop: 20, title: "Impact", desc: "Simulate Physical Process Failure." }
                        ].map((step, i) => (
                            <div key={i} className="relative pb-10 last:pb-0 group">
                                <div className="absolute -left-[37px] top-1 w-4 h-4 bg-black border-2 border-gray-600 rounded-full group-hover:border-oxot-red group-hover:bg-oxot-red/20 transition-colors"></div>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                    <h4 className="text-sm font-black text-oxot-blue font-mono w-24 shrink-0 tracking-widest">HOP {step.hop}</h4>
                                    <div className="flex-1">
                                        <span className="text-white font-black mr-3">{step.title}</span>
                                        <span className="text-gray-500 text-xs lowercase tracking-tighter font-normal">{step.desc}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
