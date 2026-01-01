'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, UserPlus, Trash2, RotateCcw, TrendingUp, TrendingDown,
    AlertTriangle, CheckCircle, Music, Zap
} from 'lucide-react';

// DISC Profile type
interface TeamMember {
    id: string;
    name: string;
    D: number; // Dominance (0-100)
    I: number; // Influence (0-100) 
    S: number; // Steadiness (0-100)
    C: number; // Conscientiousness (0-100)
}

// Calculate pairwise dissonance D_ij = ||B_i - B_j||^2
const calculateDissonance = (m1: TeamMember, m2: TeamMember): number => {
    const dD = (m1.D - m2.D) / 100;
    const dI = (m1.I - m2.I) / 100;
    const dS = (m1.S - m2.S) / 100;
    const dC = (m1.C - m2.C) / 100;
    return Math.sqrt(dD * dD + dI * dI + dS * dS + dC * dC);
};

// Calculate team magnetization (alignment) - higher is more cohesive
const calculateMagnetization = (members: TeamMember[]): number => {
    if (members.length < 2) return 1;
    const avgD = members.reduce((s, m) => s + m.D, 0) / members.length;
    const avgI = members.reduce((s, m) => s + m.I, 0) / members.length;
    const avgS = members.reduce((s, m) => s + m.S, 0) / members.length;
    const avgC = members.reduce((s, m) => s + m.C, 0) / members.length;

    // Variance from mean (lower = more aligned)
    let variance = 0;
    members.forEach(m => {
        variance += Math.pow((m.D - avgD) / 100, 2);
        variance += Math.pow((m.I - avgI) / 100, 2);
        variance += Math.pow((m.S - avgS) / 100, 2);
        variance += Math.pow((m.C - avgC) / 100, 2);
    });
    variance /= members.length;
    return Math.max(0, 1 - variance * 2); // Invert: lower variance = higher magnetization
};

// Total team dissonance
const calculateTotalDissonance = (members: TeamMember[]): number => {
    if (members.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < members.length; i++) {
        for (let j = i + 1; j < members.length; j++) {
            total += calculateDissonance(members[i], members[j]);
        }
    }
    return total / (members.length * (members.length - 1) / 2); // Normalize
};

// DISC coverage balance (ideal is 25% each)
const calculateCoverage = (members: TeamMember[]): { D: number; I: number; S: number; C: number } => {
    if (members.length === 0) return { D: 0, I: 0, S: 0, C: 0 };
    const totalD = members.reduce((s, m) => s + m.D, 0);
    const totalI = members.reduce((s, m) => s + m.I, 0);
    const totalS = members.reduce((s, m) => s + m.S, 0);
    const totalC = members.reduce((s, m) => s + m.C, 0);
    const total = totalD + totalI + totalS + totalC;
    return {
        D: (totalD / total) * 100,
        I: (totalI / total) * 100,
        S: (totalS / total) * 100,
        C: (totalC / total) * 100
    };
};

// Calculate utility U(P) = α(Δm) - δ(D'_team) + ε(Fit)
const calculateUtility = (members: TeamMember[], candidate: TeamMember | null): {
    utility: number;
    magnetizationDelta: number;
    dissonanceNew: number;
    fit: number;
} => {
    if (!candidate || members.length === 0) {
        return { utility: 0, magnetizationDelta: 0, dissonanceNew: 0, fit: 0 };
    }

    const currentMag = calculateMagnetization(members);
    const newTeam = [...members, candidate];
    const newMag = calculateMagnetization(newTeam);
    const magnetizationDelta = newMag - currentMag;

    const newDissonance = calculateTotalDissonance(newTeam);

    // Fit: how well does candidate fill gaps?
    const coverage = calculateCoverage(members);
    const gaps = [
        25 - coverage.D,
        25 - coverage.I,
        25 - coverage.S,
        25 - coverage.C
    ];
    const candidateProfile = [candidate.D, candidate.I, candidate.S, candidate.C] as const;
    const discKeys: ('D' | 'I' | 'S' | 'C')[] = ['D', 'I', 'S', 'C'];
    let fit = 0;
    discKeys.forEach((_, idx) => {
        if (gaps[idx] > 0 && candidateProfile[idx] > 50) fit += 0.25;
    });

    // Weights
    const alpha = 2.0;
    const delta = 1.5;
    const epsilon = 1.0;

    const utility = alpha * magnetizationDelta * 10 - delta * newDissonance + epsilon * fit;

    return { utility, magnetizationDelta, dissonanceNew: newDissonance, fit };
};

// Preset team members
const presetMembers: TeamMember[] = [
    { id: '1', name: 'Alex (Lead)', D: 85, I: 60, S: 30, C: 45 },
    { id: '2', name: 'Jordan (Analyst)', D: 25, I: 35, S: 50, C: 90 },
    { id: '3', name: 'Sam (Developer)', D: 40, I: 45, S: 70, C: 75 },
    { id: '4', name: 'Casey (Support)', D: 20, I: 80, S: 85, C: 35 },
];

export default function TeamDynamicsSimulator() {
    const [team, setTeam] = useState<TeamMember[]>(presetMembers);
    const [candidate, setCandidate] = useState<TeamMember>({
        id: 'candidate',
        name: 'New Candidate',
        D: 50, I: 50, S: 50, C: 50
    });
    const [showCandidate, setShowCandidate] = useState(false);
    const [pulseDissonance, setPulseDissonance] = useState(false);

    // Computed metrics
    const metrics = useMemo(() => {
        const magnetization = calculateMagnetization(team);
        const dissonance = calculateTotalDissonance(team);
        const coverage = calculateCoverage(team);
        const candidateUtility = calculateUtility(team, showCandidate ? candidate : null);

        // Team health score (0-100)
        const health = Math.round((magnetization * 50) + ((1 - dissonance) * 50));

        // Musical chord based on coverage
        let chord = 'C Maj';
        if (coverage.D > 35) chord = 'D Power';
        else if (coverage.I > 35) chord = 'G Maj7';
        else if (coverage.S > 35) chord = 'F Maj';
        else if (coverage.C > 35) chord = 'A min';

        return { magnetization, dissonance, coverage, candidateUtility, health, chord };
    }, [team, candidate, showCandidate]);

    // Pulse effect when dissonance changes
    useEffect(() => {
        setPulseDissonance(true);
        const timer = setTimeout(() => setPulseDissonance(false), 500);
        return () => clearTimeout(timer);
    }, [metrics.dissonance]);

    const updateMember = (id: string, field: 'D' | 'I' | 'S' | 'C', value: number) => {
        setTeam(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const removeMember = (id: string) => {
        setTeam(prev => prev.filter(m => m.id !== id));
    };

    const resetTeam = () => {
        setTeam(presetMembers);
        setShowCandidate(false);
    };

    const addCandidateToTeam = () => {
        const newMember: TeamMember = {
            ...candidate,
            id: Date.now().toString(),
            name: `${candidate.name} (Added)`
        };
        setTeam(prev => [...prev, newMember]);
        setCandidate({ id: 'candidate', name: 'New Candidate', D: 50, I: 50, S: 50, C: 50 });
        setShowCandidate(false);
    };

    const DISCSlider = ({ label, value, onChange, color }: {
        label: string; value: number; onChange: (v: number) => void; color: string;
    }) => (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider">
                <span className={color}>{label}</span>
                <span className="font-mono">{value}%</span>
            </div>
            <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-125"
            />
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Users className="text-orange-400" />
                        Team Dynamics Simulator
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        Adjust DISC profiles and observe real-time team harmony metrics
                    </p>
                </div>
                <button
                    onClick={resetTeam}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 transition-colors"
                >
                    <RotateCcw size={14} /> Reset
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Team Members Column */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Current Team ({team.length})</div>
                    <AnimatePresence>
                        {team.map((member) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                className="p-4 bg-white/5 border border-white/10 rounded-xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold text-white">{member.name}</span>
                                    <button
                                        onClick={() => removeMember(member.id)}
                                        className="p-1.5 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <DISCSlider label="D" value={member.D} onChange={(v) => updateMember(member.id, 'D', v)} color="text-orange-400" />
                                    <DISCSlider label="I" value={member.I} onChange={(v) => updateMember(member.id, 'I', v)} color="text-yellow-400" />
                                    <DISCSlider label="S" value={member.S} onChange={(v) => updateMember(member.id, 'S', v)} color="text-green-400" />
                                    <DISCSlider label="C" value={member.C} onChange={(v) => updateMember(member.id, 'C', v)} color="text-blue-400" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {team.length === 0 && (
                        <div className="p-8 text-center text-gray-600 border border-dashed border-white/10 rounded-xl">
                            No team members. Click Reset to restore defaults.
                        </div>
                    )}

                    {/* Candidate Simulation */}
                    <div className="pt-4 border-t border-white/10">
                        <button
                            onClick={() => setShowCandidate(!showCandidate)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${showCandidate
                                ? 'bg-orange-500/20 border border-orange-500/50 text-orange-400'
                                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <UserPlus size={16} />
                            {showCandidate ? 'Simulating Candidate...' : 'Simulate New Hire'}
                        </button>

                        <AnimatePresence>
                            {showCandidate && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-bold text-orange-400">🎯 Candidate Profile</span>
                                        <button
                                            onClick={addCandidateToTeam}
                                            disabled={team.length === 0}
                                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-xs font-bold text-black transition-colors"
                                        >
                                            Add to Team
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <DISCSlider label="D" value={candidate.D} onChange={(v) => setCandidate(c => ({ ...c, D: v }))} color="text-orange-400" />
                                        <DISCSlider label="I" value={candidate.I} onChange={(v) => setCandidate(c => ({ ...c, I: v }))} color="text-yellow-400" />
                                        <DISCSlider label="S" value={candidate.S} onChange={(v) => setCandidate(c => ({ ...c, S: v }))} color="text-green-400" />
                                        <DISCSlider label="C" value={candidate.C} onChange={(v) => setCandidate(c => ({ ...c, C: v }))} color="text-blue-400" />
                                    </div>

                                    {/* Utility Calculation */}
                                    <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/5">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                                            Utility Function: U(P) = α(Δm) - δ(D&apos;) + ε(Fit)
                                        </div>
                                        <div className="grid grid-cols-4 gap-4 text-center">
                                            <div>
                                                <div className={`text-lg font-mono font-bold ${metrics.candidateUtility.utility > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {metrics.candidateUtility.utility.toFixed(2)}
                                                </div>
                                                <div className="text-[10px] text-gray-500">UTILITY</div>
                                            </div>
                                            <div>
                                                <div className={`text-lg font-mono ${metrics.candidateUtility.magnetizationDelta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {metrics.candidateUtility.magnetizationDelta >= 0 ? '+' : ''}{(metrics.candidateUtility.magnetizationDelta * 100).toFixed(1)}%
                                                </div>
                                                <div className="text-[10px] text-gray-500">Δ MAGNETIZATION</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-mono text-yellow-400">
                                                    {metrics.candidateUtility.dissonanceNew.toFixed(2)}
                                                </div>
                                                <div className="text-[10px] text-gray-500">NEW DISSONANCE</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-mono text-blue-400">
                                                    {(metrics.candidateUtility.fit * 100).toFixed(0)}%
                                                </div>
                                                <div className="text-[10px] text-gray-500">FIT SCORE</div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                                            {metrics.candidateUtility.utility > 0.2 ? (
                                                <><CheckCircle className="text-green-400" size={16} /><span className="text-green-400">Strong Hire Recommendation</span></>
                                            ) : metrics.candidateUtility.utility > 0 ? (
                                                <><TrendingUp className="text-yellow-400" size={16} /><span className="text-yellow-400">Marginal Improvement</span></>
                                            ) : (
                                                <><AlertTriangle className="text-red-400" size={16} /><span className="text-red-400">Poor Fit - Consider Alternatives</span></>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Metrics Sidebar */}
                <div className="space-y-4">
                    {/* Health Score */}
                    <div className="p-6 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="text-orange-400" size={18} />
                            <span className="text-xs uppercase tracking-widest text-gray-400">Team Health</span>
                        </div>
                        <div className="text-5xl font-black text-white mb-2">
                            {metrics.health}<span className="text-2xl text-gray-500">%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${metrics.health > 70 ? 'bg-green-500' : metrics.health > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${metrics.health}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Chord Display */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Music className="text-blue-400" size={18} />
                            <span className="text-xs uppercase tracking-widest text-gray-400">Team Chord</span>
                        </div>
                        <div className="text-3xl font-mono font-bold text-orange-400">{metrics.chord}</div>
                        <p className="text-xs text-gray-500 mt-2">Based on DISC profile distribution</p>
                    </div>

                    {/* Live Metrics */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                        <div className="text-xs uppercase tracking-widest text-gray-400">Live Metrics</div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Magnetization</span>
                            <span className="font-mono text-white">{(metrics.magnetization * 100).toFixed(1)}%</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Dissonance</span>
                            <motion.span
                                className={`font-mono ${pulseDissonance ? 'text-orange-400' : 'text-white'}`}
                                animate={{ scale: pulseDissonance ? 1.1 : 1 }}
                            >
                                {metrics.dissonance.toFixed(3)}
                            </motion.span>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <div className="text-xs text-gray-500 uppercase mb-2">DISC Coverage</div>
                            <div className="flex gap-1 h-3 rounded overflow-hidden">
                                <motion.div
                                    className="bg-orange-500"
                                    animate={{ width: `${metrics.coverage.D}%` }}
                                    title={`D: ${metrics.coverage.D.toFixed(0)}%`}
                                />
                                <motion.div
                                    className="bg-yellow-500"
                                    animate={{ width: `${metrics.coverage.I}%` }}
                                    title={`I: ${metrics.coverage.I.toFixed(0)}%`}
                                />
                                <motion.div
                                    className="bg-green-500"
                                    animate={{ width: `${metrics.coverage.S}%` }}
                                    title={`S: ${metrics.coverage.S.toFixed(0)}%`}
                                />
                                <motion.div
                                    className="bg-blue-500"
                                    animate={{ width: `${metrics.coverage.C}%` }}
                                    title={`C: ${metrics.coverage.C.toFixed(0)}%`}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                                <span>D: {metrics.coverage.D.toFixed(0)}%</span>
                                <span>I: {metrics.coverage.I.toFixed(0)}%</span>
                                <span>S: {metrics.coverage.S.toFixed(0)}%</span>
                                <span>C: {metrics.coverage.C.toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Gap Alert */}
                    {(metrics.coverage.D < 15 || metrics.coverage.I < 15 || metrics.coverage.S < 15 || metrics.coverage.C < 15) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
                        >
                            <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                                <AlertTriangle size={16} />
                                Gap Detected
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                {metrics.coverage.D < 15 && 'Low Dominance (D). '}
                                {metrics.coverage.I < 15 && 'Low Influence (I). '}
                                {metrics.coverage.S < 15 && 'Low Steadiness (S). '}
                                {metrics.coverage.C < 15 && 'Low Conscientiousness (C). '}
                                Consider hiring to fill gaps.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
