"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Server, Activity, Database, GitBranch } from 'lucide-react';
import { TypewriterEquation } from '@/components/TypewriterEquation';

export default function DataPipelinePage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-oxot-gold selection:text-black font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/theory"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-mono"
                    >
                        <ArrowLeft size={16} /> Back to Theory Hub
                    </Link>
                </motion.div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500 text-blue-400 text-xs font-mono font-bold">
                                RSCH-36
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                                AEON CORE INTERNAL // TIER 1
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                            Data <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">
                                Pipeline
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-8">
                            Real-time ETL architecture for Psychohistory Intelligence. The circulatory system of AEON.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Kafka Cluster
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                Neo4j Sink
                            </span>
                            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-300">
                                100M+ Events/Day
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md flex flex-col justify-center"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Server size={120} />
                        </div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                            Throughput Specification
                        </h3>
                        <div className="bg-black/80 rounded-xl p-8 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                            <TypewriterEquation
                                equation="\Lambda_{throughput} \ge \sum_i \Phi_i(t) \cdot \alpha_{critical}"
                                className="text-2xl md:text-3xl text-blue-400 font-bold"
                            />
                            <p className="mt-6 text-gray-400 font-mono text-sm leading-relaxed">
                                "Latency for Threat Intelligence must be under 5 minutes. Network Telemetry must be sub-minute. The pipeline processes 100M+ events daily."
                            </p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Vuln Intel</div>
                                <div className="text-sm font-bold text-white">&lt; 1 hr</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Threat Intel</div>
                                <div className="text-sm font-bold text-blue-400">&lt; 5 min</div>
                            </div>
                            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 text-center">
                                <div className="text-[10px] text-gray-400 uppercase">Net Telemetry</div>
                                <div className="text-sm font-bold text-white">&lt; 1 min</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Left Column: Core Theory */}
                    <div className="md:col-span-2 space-y-16">

                        {/* Section 1 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <Database className="text-blue-400" />
                                7-Layer Ingestion Strategy
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    AEONingests data from seven primary categories to feed the Psychohistory models:
                                </p>
                                <ul className="list-disc pl-4 space-y-2 marker:text-blue-500">
                                    <li><strong>Vulnerability Intel:</strong> NVD, MITRE CVE, ExploitDB (for RSCH-02).</li>
                                    <li><strong>Threat Intel:</strong> VirusTotal, AlienVault, Shodan (for RSCH-10).</li>
                                    <li><strong>Network Telemetry:</strong> Splunk, NetFlow, EDR (for RSCH-08).</li>
                                    <li><strong>Psychometric Data:</strong> HRIS, DiSC, Training APIs (for RSCH-07).</li>
                                    <li><strong>Market Data:</strong> Bitsight, Chainalysis (for RSCH-24).</li>
                                    <li><strong>OSINT:</strong> NewsAPI, GDELT, Social Media (for RSCH-25).</li>
                                    <li><strong>Compliance:</strong> Scanners, IAM (for RSCH-32).</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                                <GitBranch className="text-oxot-gold" />
                                Stream Processing Topology
                            </h2>
                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
                                <p>
                                    Data flows from **Sources** to a **Kafka Cluster** (Raw -&gt; Normalized -&gt; Enriched topics).
                                    Apache Flink jobs perform real-time enrichment (e.g., adding EPSS scores to CVEs).
                                    Finally, the `neo4j-sink` topic streams relationships directly into the graph database.
                                </p>
                                <div className="bg-white/5 p-4 rounded-lg border-l-4 border-blue-500">
                                    <p className="font-mono text-sm text-blue-300">
                                        "Data is the lifeblood of prediction. This pipeline is the circulatory system."
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">

                        {/* Pipeline Widget */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                                <Activity size={16} /> Pipeline Health
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-white/5 text-sm">
                                    <span className="text-gray-400">Kafka Brokers</span>
                                    <span className="text-green-400 font-mono">3/3 Active</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-white/5 text-sm">
                                    <span className="text-gray-400">Ingestion Lag</span>
                                    <span className="text-blue-400 font-mono">12ms</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Throughput</span>
                                        <span className="text-white font-mono">15k events/sec</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/10 pb-1">
                                        <span className="text-gray-400">Error Rate</span>
                                        <span className="text-white font-mono">0.001%</span>
                                    </div>
                                </div>
                                <div className="text-center pt-2">
                                    <span className="text-[10px] text-green-500 uppercase tracking-widest font-bold">
                                        System Nominal
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* References */}
                        <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                                References
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Kreps, J. (2014). I Heart Logs.",
                                    "Kleppmann, M. (2017). Designing Data-Intensive Apps.",
                                    "Neo4j Operations Manual (2025).",
                                ].map((ref, i) => (
                                    <li key={i} className="text-xs text-gray-500 font-mono leading-relaxed pl-3 border-l border-white/10">
                                        {i + 1}. {ref}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
