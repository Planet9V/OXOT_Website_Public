"use client";

import React, { useRef, useEffect } from 'react';
import { Shield, Network, Brain, Database, GitBranch, Target, Zap, Eye, Search, Lock, TrendingUp, AlertTriangle, CheckCircle, Layers, Globe, Users, FileText, Activity, BarChart3, Cpu, Box as BoxIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

export default function AgentBlueDossier() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
        { icon: <Brain className="w-6 h-6" />, title: "gGGN Intelligence", desc: "Distributed AI subminds specializing in threat domains" },
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

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent text-gray-300 font-mono selection:bg-oxot-blue/30 selection:text-white overflow-hidden uppercase font-black">

            {/* Background Particles */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 flex items-center justify-center">
                    {DEFENSIVE_CONCEPTS.map((concept, i) => (
                        <div
                            key={i}
                            id={`defensive-concept-${i}`}
                            className={`absolute text-[10px] font-mono whitespace-nowrap transition-colors duration-1000
                                ${concept.type === 'PRINCIPLE' ? 'text-oxot-blue/20' :
                                    concept.type === 'STRATEGY' ? 'text-white/20' :
                                        concept.type === 'CAPABILITY' ? 'text-oxot-red/20' : 'text-grey/20'}`}
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {concept.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ opacity }}
                    className="text-center z-10"
                >
                    <div className="inline-block mb-6 px-6 py-2 border border-oxot-blue/50 bg-oxot-blue/10 rounded-full">
                        <span className="text-oxot-blue font-mono text-sm uppercase tracking-[0.3em] font-black">Defensive Intelligence</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                        AGENT BLUE TEAM
                    </h1>

                    <p className="text-xl md:text-2xl text-oxot-blue mb-4 max-w-4xl mx-auto font-black tracking-widest uppercase">
                        Predictive Threat Intelligence Powered by the AEON Cyber Digital Twin
                    </p>

                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed lowercase tracking-tighter font-normal">
                        Shifting the paradigm from <span className="text-oxot-red font-black uppercase tracking-normal">reactive firefighting</span> to <span className="text-oxot-blue font-black uppercase tracking-normal">proactive prediction</span>.
                        Combining technical vulnerabilities, human psychology, and geopolitical context.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center text-xs font-black uppercase tracking-widest">
                        <div className="px-6 py-3 bg-oxot-blue/20 border border-oxot-blue/30 rounded">
                            <Shield className="w-5 h-5 inline mr-2 text-oxot-blue" />
                            <span className="text-white">24/7 Protection</span>
                        </div>
                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded">
                            <Brain className="w-5 h-5 inline mr-2 text-oxot-blue" />
                            <span className="text-white">AI-Powered Analysis</span>
                        </div>
                        <div className="px-6 py-3 bg-oxot-red/10 border border-oxot-red/20 rounded">
                            <Zap className="w-5 h-5 inline mr-2 text-oxot-red" />
                            <span className="text-white">Predictive Intelligence</span>
                        </div>
                    </div>
                </motion.div>

                <div className="absolute bottom-10 animate-bounce">
                    <div className="w-6 h-10 border-2 border-oxot-blue/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-oxot-blue rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 space-y-32 font-black uppercase tracking-tighter">

                {/* Philosophy Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-5xl font-black text-white mb-8 leading-none">THE DEFENSIVE PARADIGM SHIFT</h2>
                        <div className="space-y-6 text-lg">
                            <div className="p-6 bg-oxot-red/10 border-l-4 border-oxot-red">
                                <h3 className="text-oxot-red font-black mb-2 flex items-center gap-2 tracking-widest">
                                    <AlertTriangle size={20} />
                                    REACTIVE DEFENSE (LEGACY)
                                </h3>
                                <ul className="space-y-2 text-gray-400 text-sm font-normal lowercase tracking-tighter">
                                    <li>• Wait for attacks to happen</li>
                                    <li>• Patch after exploitation</li>
                                    <li>• Rely on signature-based detection</li>
                                </ul>
                            </div>

                            <div className="p-6 bg-oxot-blue/10 border-l-4 border-oxot-blue">
                                <h3 className="text-oxot-blue font-black mb-2 flex items-center gap-2 tracking-widest">
                                    <CheckCircle size={20} />
                                    THE OXOT WAY: PROACTIVE PREDICTION
                                </h3>
                                <ul className="space-y-2 text-white text-sm font-normal lowercase tracking-tighter">
                                    <li>✓ Predict attacks before they are launched</li>
                                    <li>✓ Prioritize by actual exploit probability</li>
                                    <li>✓ Anticipate novel attack techniques</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 bg-black/60 border-4 border-grey rounded-3xl font-black uppercase">
                            <h3 className="text-2xl font-black text-white mb-6 tracking-tighter">NOW / NEXT / NEVER Framework</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-oxot-red flex items-center justify-center shrink-0">
                                        <span className="text-white font-mono font-black italic">NOW</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black tracking-widest text-sm">Immediate Threats</h4>
                                        <p className="text-gray-400 text-xs font-normal lowercase tracking-tighter mt-1">Active exploitation, critical EPSS scores.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 opacity-60">
                                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
                                        <span className="text-black font-mono font-black italic">NEXT</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black tracking-widest text-sm">Emerging Risks</h4>
                                        <p className="text-gray-400 text-xs font-normal lowercase tracking-tighter mt-1">Rising EPSS trends, geopolitical shifts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Capabilities */}
                <section>
                    <h2 className="text-5xl font-black text-white mb-12 text-center tracking-tighter">DEFENSIVE CAPABILITIES</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {defensiveCapabilities.map((cap, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, borderColor: '#0042D6' }}
                                className="p-8 bg-black/40 border border-white/10 rounded-xl hover:bg-oxot-blue/10 transition-all cursor-pointer group"
                            >
                                <div className="w-14 h-14 rounded-full bg-oxot-blue/10 flex items-center justify-center mb-6 text-oxot-blue group-hover:text-white transition-colors">
                                    {cap.icon}
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 tracking-tighter uppercase">{cap.title}</h3>
                                <p className="text-gray-400 text-xs font-normal lowercase tracking-tighter leading-relaxed">{cap.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Intelligence Sources */}
                <section className="bg-gradient-to-r from-oxot-blue/10 to-transparent border border-oxot-blue/20 rounded-2xl p-12 text-center">
                    <h2 className="text-5xl font-black text-white mb-12 tracking-tighter">INTELLIGENCE SOURCES</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {intelligenceSources.map((source, i) => (
                            <div key={i}>
                                <div className="text-4xl font-black text-oxot-blue mb-2 tracking-tighter">{source.count}</div>
                                <div className="text-white font-black text-xs tracking-widest">{source.name}</div>
                                <div className="text-gray-500 text-[9px] font-normal lowercase tracking-tighter mt-1">{source.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}