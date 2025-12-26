'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Layers, Activity, AlertTriangle, CheckCircle, ChevronRight, Server, Network, Database, Users, ArrowRight, FileDown, Crosshair, Eye, Target, Skull, UserX, Crown, Cpu } from 'lucide-react';

// --- DATA: FOUNDATIONAL REQUIREMENTS (FRs) ---
const FOUNDATIONAL_REQS = [
    {
        id: "FR1",
        name: "Identification & Authentication Control (IAC)",
        desc: "Protect the IACS by verifying the identity of any user requesting access.",
        slLevels: {
            1: "Unique user identification & authentication.",
            2: "Multifactor authentication for untrusted networks.",
            3: "Multifactor authentication for all networks.",
            4: "MFA with hardware tokens & continuous authentication."
        }
    },
    {
        id: "FR2",
        name: "Use Control (UC)",
        desc: "Enforce the authorized assignment of privileges to an authenticated user.",
        slLevels: {
            1: "Authorize access changes, limit privileges.",
            2: "Enforce least privilege, audit usage.",
            3: "Automated privilege revocation & monitoring.",
            4: "Dual approval for critical actions."
        }
    },
    {
        id: "FR3",
        name: "System Integrity (SI)",
        desc: "Ensure the integrity of the IACS to prevent unauthorized manipulation.",
        slLevels: {
            1: "Malware protection, patch management.",
            2: "Checking identifying information of code.",
            3: "Automated integrity checks on startup.",
            4: "Hardware root of trust (TPM) enforcement."
        }
    },
    {
        id: "FR4",
        name: "Data Confidentiality (DC)",
        desc: "Ensure the confidentiality of information on communication channels and in repositories.",
        slLevels: {
            1: "Cryptography for passwords/keys.",
            2: "Encryption for sensitive data in transit.",
            3: "Encryption for data at rest.",
            4: "Hardware-based encryption & key management."
        }
    },
    {
        id: "FR5",
        name: "Restricted Data Flow (RDF)",
        desc: "Segment the network via Zones and Conduits to limit unnecessary data flow.",
        slLevels: {
            1: "Network segmentation (VLANs).",
            2: "Firewalls with defined conduits (White-listing).",
            3: "Unidirectional Gateways (Data Diodes) for critical zones.",
            4: "Physical air gaps or verified hardware enforcement."
        }
    },
    {
        id: "FR6",
        name: "Timely Response to Events (TRE)",
        desc: "Respond to security violations by notifying the proper authority.",
        slLevels: {
            1: "Log security events.",
            2: "Centralized logging (SIEM) & alerting.",
            3: "Automated incident response workflows.",
            4: "Continuous forensic capture & AI containment."
        }
    },
    {
        id: "FR7",
        name: "Resource Availability (RA)",
        desc: "Ensure the availability of the IACS against the degradation or denial of services.",
        slLevels: {
            1: "DoS protection (Rate limiting).",
            2: "Redundant networks & power.",
            3: "High Availability (HA) clusters & failover.",
            4: "Fault-tolerant hardware & diverse path routing."
        }
    }
];

// --- DATA: THREAT ACTORS ---
const THREAT_ACTORS = [
    { id: 1, name: "Script Kiddie", icon: <UserX size={24} />, sl: 1, desc: "Low skill, uses publicly available tools. Opportunistic.", color: "text-gray-400", borderColor: "border-gray-500/30" },
    { id: 2, name: "Hacktivist", icon: <Crosshair size={24} />, sl: 2, desc: "Moderate skill, politically motivated. Targeted disruption.", color: "text-yellow-400", borderColor: "border-yellow-500/30" },
    { id: 3, name: "Organized Crime", icon: <Skull size={24} />, sl: 3, desc: "High skill, financially driven. Ransomware, extortion.", color: "text-orange-500", borderColor: "border-orange-500/30" },
    { id: 4, name: "Nation State (APT)", icon: <Crown size={24} />, sl: 4, desc: "Unlimited resources, strategic objectives. Persistent, stealthy.", color: "text-red-500", borderColor: "border-red-500/30" }
];

// --- SUB-COMPONENT: ZONE ARCHITECT ---
const ZoneArchitect = () => {
    return (
        <div className="bg-black/40 border border-white/10 rounded-xl p-8 relative overflow-hidden h-[400px]">
            <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] grid-rows-[repeat(auto-fill,minmax(20px,1fr))] opacity-10 pointer-events-none">
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-white/20" />
                ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
                <Network className="text-oxot-blue" size={24} />
                Zone & Conduit Architect <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-grey ml-2 font-mono">INTERACTIVE</span>
            </h3>

            <div className="relative z-10 grid grid-cols-2 gap-12 h-full pb-12">
                {/* Enterprise Zone */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-dashed border-blue-500/30 bg-blue-900/10 rounded-xl p-4 flex flex-col gap-4 relative"
                >
                    <div className="absolute -top-3 left-4 bg-black px-2 text-blue-400 font-mono text-xs font-bold">ENTERPRISE ZONE (SL-1)</div>
                    <div className="flex gap-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col items-center gap-2 min-w-[80px]">
                            <Server size={20} className="text-grey" />
                            <span className="text-[10px] text-grey">ERP</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col items-center gap-2 min-w-[80px]">
                            <Users size={20} className="text-grey" />
                            <span className="text-[10px] text-grey">Workstations</span>
                        </div>
                    </div>
                </motion.div>

                {/* DMZ Conduit */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                    <div className="h-16 w-1 bg-yellow-500/50"></div>
                    <div className="px-3 py-1 bg-black border border-yellow-500 text-yellow-500 text-[10px] font-mono rounded font-bold whitespace-nowrap">DMZ CONDUIT</div>
                    <div className="h-16 w-1 bg-yellow-500/50"></div>
                </div>

                {/* Control Zone */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-red-500/30 bg-red-900/10 rounded-xl p-4 flex flex-col gap-4 mt-auto relative"
                >
                    <div className="absolute -top-3 right-4 bg-black px-2 text-red-500 font-mono text-xs font-bold">CONTROL ZONE (SL-3)</div>
                    <div className="flex gap-4 justify-end">
                        <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col items-center gap-2 min-w-[80px]">
                            <Database size={20} className="text-red-400" />
                            <span className="text-[10px] text-grey">Historian</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col items-center gap-2 min-w-[80px]">
                            <Activity size={20} className="text-red-400" />
                            <span className="text-[10px] text-grey">HMI</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded flex flex-col items-center gap-2 min-w-[80px]">
                            <Server size={20} className="text-red-400" />
                            <span className="text-[10px] text-grey">PLC</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// --- NEW: SL-T REQUIREMENTS MATRIX ---
const SLTMatrix = () => (
    <div className="bg-black/40 border border-white/10 rounded-xl p-6 overflow-x-auto">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Layers className="text-oxot-blue" size={24} />
            SL-T Requirements Matrix
        </h3>
        <table className="w-full text-[11px] font-mono">
            <thead>
                <tr className="border-b border-white/10">
                    <th className="text-left p-2 text-grey">FR</th>
                    <th className="text-center p-2 text-gray-400">SL-1</th>
                    <th className="text-center p-2 text-yellow-400">SL-2</th>
                    <th className="text-center p-2 text-orange-400">SL-3</th>
                    <th className="text-center p-2 text-red-400">SL-4</th>
                </tr>
            </thead>
            <tbody>
                {FOUNDATIONAL_REQS.map(fr => (
                    <tr key={fr.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-2 text-oxot-blue font-bold">{fr.id}</td>
                        <td className="p-2 text-center text-gray-400">{fr.slLevels[1].split('.')[0]}</td>
                        <td className="p-2 text-center text-gray-300">{fr.slLevels[2].split('.')[0]}</td>
                        <td className="p-2 text-center text-gray-200">{fr.slLevels[3].split('.')[0]}</td>
                        <td className="p-2 text-center text-white">{fr.slLevels[4].split('.')[0]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- NEW: THREAT ACTOR PROFILES ---
const ThreatActorProfiles = ({ slTarget }: { slTarget: number }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {THREAT_ACTORS.map(actor => (
            <motion.div
                key={actor.id}
                whileHover={{ scale: 1.03 }}
                className={`p-4 bg-black/40 border rounded-xl text-center cursor-pointer transition-all ${slTarget >= actor.sl ? `border-green-500/50 bg-green-900/10` : `${actor.borderColor} opacity-60`}`}
            >
                <div className={`mb-2 ${actor.color}`}>{actor.icon}</div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">{actor.name}</div>
                <div className={`text-[10px] font-mono ${actor.color} mb-2`}>Requires SL-{actor.sl}</div>
                <div className="text-[10px] text-grey leading-relaxed">{actor.desc}</div>
                {slTarget >= actor.sl ? (
                    <div className="mt-2 text-[10px] text-green-400 font-bold flex items-center justify-center gap-1"><CheckCircle size={12} /> PROTECTED</div>
                ) : (
                    <div className="mt-2 text-[10px] text-red-400 font-bold flex items-center justify-center gap-1"><AlertTriangle size={12} /> EXPOSED</div>
                )}
            </motion.div>
        ))}
    </div>
);


export default function IECWorkshopTool() {
    const [step, setStep] = useState(1);
    const [slTarget, setSlTarget] = useState(3);

    return (
        <div className="bg-black border border-white/10 rounded-2xl overflow-hidden min-h-[800px] flex flex-col">
            {/* TOOLBAR */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-8">
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        <Shield className="text-oxot-blue" size={24} />
                        IEC 62443 Compliance Engine
                    </h2>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(s => (
                            <button
                                key={s}
                                onClick={() => setStep(s)}
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${step === s ? 'bg-oxot-blue text-black border-oxot-blue' : 'bg-transparent text-grey border-white/20'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="px-3 py-1 bg-green-900/20 border border-green-500/30 text-green-500 rounded text-[10px] font-mono uppercase tracking-widest">
                        System Status: Connected
                    </div>
                    <button className="px-4 py-2 bg-oxot-red text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-red-700 transition-colors rounded">
                        <FileDown size={14} /> Export PDF
                    </button>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="flex-1 p-8 bg-gradient-to-br from-black to-zinc-900 space-y-8">

                {/* STEP 1: ZONE DEFINITION */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">1. Define Zones & Conduits</h3>
                                <p className="text-gray-400 text-sm max-w-2xl">
                                    According to IEC 62443-3-2, assets must be grouped into zones based on security requirements.
                                </p>
                            </div>
                            <button onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-oxot-blue transition-colors">
                                Next: Risk Assessment <ArrowRight size={16} />
                            </button>
                        </div>
                        <ZoneArchitect />
                    </motion.div>
                )}

                {/* STEP 2: RISK ASSESSMENT & THREAT ACTORS */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">2. Risk Assessment & SL-T</h3>
                                <p className="text-gray-400 text-sm max-w-2xl">
                                    Evaluate potential impact and select your Target Security Level.
                                </p>
                            </div>
                            <button onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-oxot-blue transition-colors">
                                Next: Gap Analysis <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white uppercase tracking-widest">Target Security Level (SL-T)</label>
                                    <input
                                        type="range"
                                        min="1" max="4"
                                        value={slTarget}
                                        onChange={(e) => setSlTarget(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-oxot-blue"
                                    />
                                    <div className="flex justify-between text-[10px] text-grey font-mono"><span>SL-1</span><span>SL-2</span><span>SL-3</span><span>SL-4</span></div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                                <div className="text-sm text-grey uppercase tracking-widest mb-4">Selected Target Level</div>
                                <div className="text-8xl font-black text-white mb-2 relative">
                                    SL-{slTarget}
                                    <div className="absolute -top-2 -right-4 w-4 h-4 bg-oxot-blue rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white pt-4">Threat Actor Coverage</h3>
                        <ThreatActorProfiles slTarget={slTarget} />
                    </motion.div>
                )}

                {/* STEP 3: FOUNDATIONAL REQS */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">3. Foundational Requirements Gap Analysis</h3>
                                <p className="text-gray-400 text-sm max-w-2xl">
                                    Review compliance gaps against IEC 62443-3-3 FRs for Target Level SL-{slTarget}.
                                </p>
                            </div>
                            <button onClick={() => setStep(4)} className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-oxot-blue transition-colors">
                                Next: SL-T Matrix <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {FOUNDATIONAL_REQS.map((fr, i) => (
                                <div key={fr.id} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-oxot-blue/50 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-blue-900/20 text-oxot-blue font-bold flex items-center justify-center border border-oxot-blue/30">
                                                {fr.id}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold">{fr.name}</h4>
                                                <p className="text-gray-400 text-xs">{fr.desc}</p>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-red-900/20 text-red-500 border border-red-500/30 rounded text-[10px] font-mono uppercase">
                                            GAP DETECTED
                                        </div>
                                    </div>

                                    <div className="pl-14">
                                        <div className="p-4 bg-black/40 rounded border border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] text-grey uppercase tracking-widest">Requirement for SL-{slTarget}</span>
                                                <Lock size={12} className="text-oxot-blue" />
                                            </div>
                                            <p className="text-sm text-white font-mono">
                                                {fr.slLevels[slTarget as keyof typeof fr.slLevels]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: SL-T MATRIX */}
                {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">4. SL-T Requirements Reference</h3>
                                <p className="text-gray-400 text-sm max-w-2xl">
                                    A complete reference matrix of all 7 Foundational Requirements across all Security Levels.
                                </p>
                            </div>
                            <button onClick={() => setStep(5)} className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-oxot-blue transition-colors">
                                Generate Report <ArrowRight size={16} />
                            </button>
                        </div>
                        <SLTMatrix />
                    </motion.div>
                )}

                {/* STEP 5: REPORT */}
                {step === 5 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
                        <CheckCircle size={80} className="text-green-500" />
                        <div>
                            <h3 className="text-4xl font-black text-white mb-4">WORKSHOP COMPLETE</h3>
                            <p className="text-xl text-gray-300 max-w-xl mx-auto">
                                Your preliminary IEC 62443 Alignment Report has been generated.
                                AEON Digital Twin has automatically mapped 124 controls to your asset inventory.
                            </p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl flex gap-12 font-mono text-sm">
                            <div className="text-center">
                                <div className="text-grey text-[10px] uppercase mb-1">Compliance Score</div>
                                <div className="text-2xl font-bold text-yellow-500">64%</div>
                            </div>
                            <div className="text-center">
                                <div className="text-grey text-[10px] uppercase mb-1">Critical Gaps</div>
                                <div className="text-2xl font-bold text-red-500">12</div>
                            </div>
                            <div className="text-center">
                                <div className="text-grey text-[10px] uppercase mb-1">Est. Remediation Time</div>
                                <div className="text-2xl font-bold text-white">3 Weeks</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setStep(1)}
                            className="mt-8 text-grey hover:text-white underline text-sm transition-colors"
                        >
                            Start New Assessment
                        </button>
                    </motion.div>
                )}

            </div>
        </div>
    );
}

