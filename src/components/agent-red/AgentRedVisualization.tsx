"use client";

import React, { useState, useEffect, useRef } from 'react';
import ThreatModelCanvas from './ThreatModelCanvas';

interface LogEntry {
    message: string;
    timestamp: string;
}

const EXECUTION_STEPS = [
    "TARGET_IDENTIFICATION",
    "VULNERABILITY_SCANNING",
    "SERVICE_ENUMERATION",
    "GAP_ANALYSIS",
    "EXPLOIT_SYNTHESIS",
    "PAYLOAD_GENERATION",
    "DELIVERY_VECTOR_SELECTION",
    "INITIAL_BREACH",
    "PERIMETER_COMPROMISE",
    "REVERSE_SHELL_ESTABLISHED",
    "PRIVILEGE_ESCALATION_ROOT",
    "RED_LEADER_INJECTION",
    "SUBMIND_CONTAINERIZATION",
    "ASSET_LEARNING_PROFILING",
    "INTERNAL_RECONNAISSANCE",
    "LATERAL_MOVEMENT_PLANNING",
    "CREDENTIAL_HARVESTING",
    "PIVOT_TO_OT_NETWORK",
    "LIVING_OFF_THE_LAND",
    "CASCADING_EFFECT_INIT",
    "TOTAL_SYSTEM_COMPROMISE"
];

const AgentRedVisualization = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [code, setCode] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    useEffect(() => {
        const logNarrative = [
            { step: 0, msg: "[Red Leader] Initiating Sequence. Target locked: AEON_CORE_V1." },
            { step: 1, msg: "[Scanner] Port 443 Open. Port 8080 Open. Enumerating services..." },
            { step: 2, msg: "[Scanner] Service Identified: Apache Struts v2.3. Suspicious headers detected." },
            { step: 3, msg: "[Analyzer] Analyzing patrol gaps. Security posture calculated at 62% efficiency." },
            { step: 4, msg: "[Forge] Synthesizing custom buffer overflow chain. 0-day candidate identified." },
            { step: 5, msg: "[Forge] Compiling polyglot payload. Architecture: x86_64." },
            { step: 6, msg: "[Vector] Selecting delivery via fragmented packet injection." },
            { step: 7, msg: "[Breacher] Packet sequence delivered. Waiting for callback..." },
            { step: 8, msg: "[Target] Handshake received. Perimeter breached." },
            { step: 9, msg: "[Target] Shell established. User: www-data." },
            { step: 10, msg: "[Breacher] DirtyCOW exploit successful. UID: 0 (ROOT)." },
            { step: 11, msg: "[Red Leader] INJECTING AUTONOMOUS SUBMIND..." },
            { step: 12, msg: "[Submind] Container initialized. Docker image 'Ghost_V4' deployed." },
            { step: 13, msg: "[Submind] Learning environment topology. Mapping neighbors." },
            { step: 14, msg: "[Submind] Scanning internal subnet 192.168.1.0/24..." },
            { step: 15, msg: "[Planner] Path to Domain Controller identified. 3 hops required." },
            { step: 16, msg: "[Harvester] Mimikatz executed. NTLM hashes dumped." },
            { step: 17, msg: "[Pivot] Tunnelling traffic through compromised host. Targeting SCADA Gateway." },
            { step: 18, msg: "[Submind] Utilizing PowerShell for persistence. Living off the land." },
            { step: 19, msg: "[Red Leader] Initiating CASCADING FAILURE protocol. Synchronizing submind swarm..." },
            { step: 20, msg: "[System] TOTAL COMPROMISE ACHIEVED. Awaiting instructions." }
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < logNarrative.length) {
                const entry = logNarrative[index];

                setLogs(prev => [...prev.slice(-15), {
                    message: entry.msg,
                    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
                }]);

                // Update the visual step tracker roughly in sync with logs
                setCurrentStepIndex(entry.step);

                index++;
            } else {
                // Loop
                index = 0;
                setLogs([]);
                setCurrentStepIndex(0);
            }
        }, 1200); // Speed of updates

        // Code typewriter effect
        const codeSnippet = `
# SUBMIND: RED_LEADER_NODE
# MODE: AUTONOMOUS_PROPAGATION
# PIVOT_STRATEGY: ADAPTIVE

class CascadingFailure(AttackVector):
    def propagate(self, target):
        vuln = self.scan(target)
        if vuln.criticality > 9.0:
            self.inject_container(target)
            self.lateral_move(target.neighbors)
        return self.report_status()

# EXECUTING CHAIN REACTION...
    `;
        let charIndex = 0;
        const codeInterval = setInterval(() => {
            setCode(prev => {
                if (charIndex < codeSnippet.length) {
                    charIndex++;
                    return codeSnippet.slice(0, charIndex);
                }
                charIndex = 0;
                return "";
            });
        }, 30);

        return () => {
            clearInterval(interval);
            clearInterval(codeInterval);
        };
    }, []);

    return (
        <div className="w-full h-[800px] bg-dark/90 backdrop-blur-md text-primary font-mono p-6 grid grid-cols-12 grid-rows-6 gap-6 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden">

            {/* Background Grid Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(220,38,38,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.2)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

            {/* Header / Status Bar */}
            <div className="col-span-12 row-span-1 flex justify-between items-center border-b border-white/10 px-6 bg-white/5 rounded-t-2xl relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_#ef4444]"></div>
                    <span className="text-sm font-bold tracking-[0.2em] text-red-400 uppercase">Red Leader Squadron Deployed</span>
                </div>
                <div className="flex gap-8 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-2"><span className="text-red-500">MODE:</span> KILL_CHAIN_LVL_5</span>
                    <span className="flex items-center gap-2"><span className="text-white">ACTIVE NODES:</span> 243</span>
                    <span className="flex items-center gap-2"><span className="text-orange-500">CASCADE:</span> IMMINENT</span>
                </div>
            </div>

            {/* The Threat Model Canvas (Replaces Globe) */}
            <div className="col-span-4 row-span-3 border border-white/10 relative bg-black/40 rounded-xl group hover:border-red-500/30 transition-colors overflow-hidden">
                <ThreatModelCanvas currentStep={currentStepIndex} />
            </div>

            {/* The Code Forge */}
            <div className="col-span-4 row-span-3 border border-white/10 bg-black/60 p-5 overflow-hidden rounded-xl hover:border-red-500/30 transition-colors relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent opacity-50"></div>
                <div className="text-xs text-gray-500 mb-3 border-b border-white/5 pb-2 flex justify-between">
                    <span>{`>>`} CASCADING_FAILURE_ENGINE.py</span>
                </div>
                <pre className="text-xs text-red-400/90 whitespace-pre-wrap font-mono leading-relaxed">
                    {code}
                    <span className="animate-pulse bg-red-500 text-black ml-1">_</span>
                </pre>
            </div>

            {/* The 20-Step Kill Chain Scroll */}
            <div className="col-span-4 row-span-5 border border-white/10 flex flex-col bg-white/5 rounded-xl overflow-hidden relative">
                <div className="p-4 border-b border-white/10 bg-black/20 z-10">
                    <h3 className="text-xs font-bold text-gray-400 tracking-wider">TACTICAL EXECUTION CHAIN</h3>
                </div>
                <div className="overflow-hidden relative flex-1 p-2">
                    <div
                        className="transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateY(-${Math.max(0, currentStepIndex - 3) * 40}px)` }} // Auto-scroll logic
                    >
                        {EXECUTION_STEPS.map((step, i) => {
                            const isActive = i === currentStepIndex;
                            const isPast = i < currentStepIndex;
                            return (
                                <div key={step} className={`flex items-center gap-3 p-2 mb-1 rounded transition-all duration-300 ${isActive ? 'bg-red-500/20 border border-red-500/30 translate-x-1' : isPast ? 'opacity-30' : 'opacity-10'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : isPast ? 'bg-red-900' : 'bg-gray-700'}`}></div>
                                    <div className={`text-xs font-bold tracking-tight ${isActive ? 'text-white' : isPast ? 'text-gray-500' : 'text-gray-600'}`}>
                                        {i + 1}. {step.replace(/_/g, ' ')}
                                    </div>
                                    {isActive && <span className="ml-auto text-[10px] text-red-400 animate-blink">executing...</span>}
                                    {isPast && <span className="ml-auto text-[10px] text-red-900">done</span>}
                                </div>
                            );
                        })}
                    </div>
                    {/* Fade gradients */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
            </div>

            {/* The Terminal Logs */}
            <div className="col-span-8 row-span-2 border border-white/10 bg-black/80 p-5 overflow-hidden font-mono text-sm rounded-xl hover:border-red-500/30 transition-colors flex flex-col">
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2 shrink-0">
                    <span className="text-red-500">{'>>'}</span> SUBMIND_LOGS
                </div>
                <div ref={scrollRef} className="overflow-y-auto pr-2 space-y-1 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-transparent">
                    {logs.map((log, i) => (
                        <div key={i} className="text-gray-300 hover:text-white transition-colors flex gap-3 border-l-2 border-transparent hover:border-red-500 pl-2">
                            <span className="text-gray-600 text-xs whitespace-nowrap opacity-50">[{log.timestamp}]</span>
                            <span className={log.message.includes("Red Leader") ? "text-red-500 font-bold" : log.message.includes("Submind") ? "text-orange-400" : "text-gray-400"}>
                                {log.message}
                            </span>
                        </div>
                    ))}
                    <div className="animate-pulse text-red-500">_</div>
                </div>
            </div>

        </div>
    );
};

export default AgentRedVisualization;
