'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
    Users, UserPlus, Trash2, RotateCcw, TrendingUp, TrendingDown,
    AlertTriangle, CheckCircle, Music, Zap, Play, Pause, Settings,
    Target, Activity, ArrowRight
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// McKENNEY-LACAN MATHEMATICAL CORE
// ═══════════════════════════════════════════════════════════════════════════

// DISC Profile (4D vector mapped to 2x2 matrix)
interface DISCProfile {
    D: number; // Dominance [0,1]
    I: number; // Influence [0,1]
    S: number; // Steadiness [0,1]
    C: number; // Conscientiousness [0,1]
}

// OCEAN Profile (Big Five traits - 5D vector)
interface OCEANProfile {
    O: number; // Openness [0,1]
    C: number; // Conscientiousness [0,1]
    E: number; // Extraversion [0,1]
    A: number; // Agreeableness [0,1]
    N: number; // Neuroticism [0,1]
}

// Complete Psychometric Tensor: P_i = [D I; S C] ⊗ [O C E A N]
interface TeamMember {
    id: string;
    name: string;
    disc: DISCProfile;
    ocean: OCEANProfile;
    position: THREE.Vector3; // 3D position for visualization
    velocity: THREE.Vector3; // For dynamic simulation
    spin: number; // Ising spin state (+1 or -1)
}

// ═══════════════════════════════════════════════════════════════════════════
// MCKENNEY-LACAN CALCULUS FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// Compute the Psychometric Tensor magnitude (Frobenius norm)
const tensorMagnitude = (m: TeamMember): number => {
    const discNorm = Math.sqrt(m.disc.D ** 2 + m.disc.I ** 2 + m.disc.S ** 2 + m.disc.C ** 2);
    const oceanNorm = Math.sqrt(m.ocean.O ** 2 + m.ocean.C ** 2 + m.ocean.E ** 2 + m.ocean.A ** 2 + m.ocean.N ** 2);
    return discNorm * oceanNorm;
};

// Dissonance Function: D_ij = ||B_i - B_j||² + γ * (rate of change of alignment)
const calculateDissonance = (m1: TeamMember, m2: TeamMember, gamma: number = 0.1): number => {
    // DISC difference
    const dD = m1.disc.D - m2.disc.D;
    const dI = m1.disc.I - m2.disc.I;
    const dS = m1.disc.S - m2.disc.S;
    const dC = m1.disc.C - m2.disc.C;
    const discDiff = dD ** 2 + dI ** 2 + dS ** 2 + dC ** 2;

    // OCEAN difference  
    const oO = m1.ocean.O - m2.ocean.O;
    const oC = m1.ocean.C - m2.ocean.C;
    const oE = m1.ocean.E - m2.ocean.E;
    const oA = m1.ocean.A - m2.ocean.A;
    const oN = m1.ocean.N - m2.ocean.N;
    const oceanDiff = oO ** 2 + oC ** 2 + oE ** 2 + oA ** 2 + oN ** 2;

    // Combined dissonance with temporal coupling (gamma term approximated)
    const velocityDiff = m1.velocity.distanceTo(m2.velocity);
    return Math.sqrt(discDiff + oceanDiff) + gamma * velocityDiff;
};

// Ising Hamiltonian: H = -J Σ s_i s_j - h Σ s_i
// Models ferromagnetic coupling between team members
const isingHamiltonian = (members: TeamMember[], J: number = 1.0, h: number = 0.1): number => {
    if (members.length < 2) return 0;

    let coupling = 0;
    let field = 0;

    for (let i = 0; i < members.length; i++) {
        field += members[i].spin;
        for (let j = i + 1; j < members.length; j++) {
            // Coupling strength modulated by similarity
            const similarity = 1 - calculateDissonance(members[i], members[j]) / 3;
            coupling += similarity * members[i].spin * members[j].spin;
        }
    }

    return -J * coupling - h * field;
};

// Team Magnetization: m = (1/N) Σ s_i
// Measures overall team alignment/cohesion
const magnetization = (members: TeamMember[]): number => {
    if (members.length === 0) return 0;
    return members.reduce((sum, m) => sum + m.spin, 0) / members.length;
};

// State Evolution: dP/dt = Σ α_i S_i(t) + ε(t)
// Evolve team member positions based on interaction forces
const evolveState = (members: TeamMember[], dt: number, temperature: number = 0.5): TeamMember[] => {
    return members.map(member => {
        const force = new THREE.Vector3();

        // Attractive/repulsive forces from other members
        members.forEach(other => {
            if (other.id === member.id) return;

            const direction = new THREE.Vector3().subVectors(other.position, member.position);
            const distance = direction.length();
            if (distance < 0.1) return;

            const dissonance = calculateDissonance(member, other);
            // Similar members attract, dissimilar repel
            const forceMagnitude = (1 - dissonance) / (distance ** 2);
            force.add(direction.normalize().multiplyScalar(forceMagnitude * 0.05));
        });

        // Add thermal noise (ε(t))
        force.x += (Math.random() - 0.5) * temperature * 0.02;
        force.y += (Math.random() - 0.5) * temperature * 0.02;
        force.z += (Math.random() - 0.5) * temperature * 0.02;

        // Update velocity with damping
        const newVelocity = member.velocity.clone().multiplyScalar(0.95).add(force.multiplyScalar(dt));
        const newPosition = member.position.clone().add(newVelocity.clone().multiplyScalar(dt));

        // Constrain to sphere
        if (newPosition.length() > 3) {
            newPosition.normalize().multiplyScalar(3);
        }

        return {
            ...member,
            position: newPosition,
            velocity: newVelocity
        };
    });
};

// Candidate Utility Function: U(P) = α(Δm) - δ(D'_team) + ε(Fit)
const candidateUtility = (
    team: TeamMember[],
    candidate: TeamMember,
    weights = { alpha: 2.0, delta: 1.5, epsilon: 1.0 }
): { utility: number; magnetizationDelta: number; dissonanceNew: number; fit: number } => {
    if (team.length === 0) return { utility: 0, magnetizationDelta: 0, dissonanceNew: 0, fit: 0 };

    const currentMag = magnetization(team);
    const newTeam = [...team, candidate];
    const newMag = magnetization(newTeam);
    const magnetizationDelta = newMag - currentMag;

    // Average dissonance of candidate with existing team
    let totalDissonance = 0;
    team.forEach(m => {
        totalDissonance += calculateDissonance(m, candidate);
    });
    const dissonanceNew = totalDissonance / team.length;

    // Fit score based on filling gaps
    const avgDisc = {
        D: team.reduce((s, m) => s + m.disc.D, 0) / team.length,
        I: team.reduce((s, m) => s + m.disc.I, 0) / team.length,
        S: team.reduce((s, m) => s + m.disc.S, 0) / team.length,
        C: team.reduce((s, m) => s + m.disc.C, 0) / team.length
    };
    const targetDist = 0.5;
    const gaps = [
        targetDist - avgDisc.D,
        targetDist - avgDisc.I,
        targetDist - avgDisc.S,
        targetDist - avgDisc.C
    ];
    const candidateValues = [candidate.disc.D, candidate.disc.I, candidate.disc.S, candidate.disc.C];
    let fit = 0;
    gaps.forEach((gap, i) => {
        if (gap > 0.1 && candidateValues[i] > 0.6) fit += 0.25;
    });

    const utility = weights.alpha * magnetizationDelta * 10 - weights.delta * dissonanceNew + weights.epsilon * fit;

    return { utility, magnetizationDelta, dissonanceNew, fit };
};

// ═══════════════════════════════════════════════════════════════════════════
// 3D VISUALIZATION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

interface MemberNodeProps {
    member: TeamMember;
    isCandidate?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}

function MemberNode({ member, isCandidate = false, isSelected = false, onClick }: MemberNodeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    // Color based on dominant DISC trait
    const getColor = () => {
        const { D, I, S, C } = member.disc;
        if (D >= I && D >= S && D >= C) return '#f97316'; // Orange for Dominance
        if (I >= D && I >= S && I >= C) return '#eab308'; // Yellow for Influence
        if (S >= D && S >= I && S >= C) return '#22c55e'; // Green for Steadiness
        return '#3b82f6'; // Blue for Conscientiousness
    };

    // Pulse animation based on neuroticism (stress indicator)
    useFrame((state) => {
        if (meshRef.current) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * (2 + member.ocean.N * 3)) * 0.05 * member.ocean.N;
            meshRef.current.scale.setScalar(isCandidate ? pulse * 0.4 : pulse * 0.3);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group position={member.position}>
                <mesh
                    ref={meshRef}
                    onClick={onClick}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    <icosahedronGeometry args={[1, isCandidate ? 2 : 1]} />
                    <meshStandardMaterial
                        color={getColor()}
                        emissive={getColor()}
                        emissiveIntensity={hovered || isSelected ? 0.8 : 0.3}
                        wireframe={isCandidate}
                        transparent
                        opacity={isCandidate ? 0.7 : 0.9}
                    />
                </mesh>

                {/* Spin indicator ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.4, 0.02, 8, 32]} />
                    <meshStandardMaterial
                        color={member.spin > 0 ? '#22c55e' : '#ef4444'}
                        emissive={member.spin > 0 ? '#22c55e' : '#ef4444'}
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* Label */}
                {(hovered || isSelected) && (
                    <Html center distanceFactor={8}>
                        <div className="bg-black/90 border border-white/20 rounded-lg p-2 text-[10px] whitespace-nowrap pointer-events-none">
                            <div className="font-bold text-white">{member.name}</div>
                            <div className="text-gray-400 font-mono">
                                D:{(member.disc.D * 100).toFixed(0)} I:{(member.disc.I * 100).toFixed(0)} S:{(member.disc.S * 100).toFixed(0)} C:{(member.disc.C * 100).toFixed(0)}
                            </div>
                            <div className="text-gray-500 font-mono text-[8px]">
                                Spin: {member.spin > 0 ? '+1' : '-1'}
                            </div>
                        </div>
                    </Html>
                )}
            </group>
        </Float>
    );
}

// Connection lines between members
function ConnectionLines({ members, candidate }: { members: TeamMember[]; candidate: TeamMember | null }) {
    const connections = useMemo(() => {
        const conns: { start: THREE.Vector3; end: THREE.Vector3; dissonance: number }[] = [];
        const allMembers = candidate ? [...members, candidate] : members;

        for (let i = 0; i < allMembers.length; i++) {
            for (let j = i + 1; j < allMembers.length; j++) {
                const dissonance = calculateDissonance(allMembers[i], allMembers[j]);
                conns.push({
                    start: allMembers[i].position,
                    end: allMembers[j].position,
                    dissonance
                });
            }
        }
        return conns;
    }, [members, candidate]);

    return (
        <group>
            {connections.map((conn, i) => {
                const color = conn.dissonance < 0.5 ? '#22c55e' : conn.dissonance < 1.0 ? '#eab308' : '#ef4444';
                const opacity = Math.max(0.2, 1 - conn.dissonance);

                return (
                    <mesh key={i}>
                        <tubeGeometry args={[
                            new THREE.CatmullRomCurve3([conn.start, conn.end]),
                            8,
                            0.01 * opacity,
                            8,
                            false
                        ]} />
                        <meshStandardMaterial
                            color={color}
                            transparent
                            opacity={opacity}
                            emissive={color}
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

// Energy field visualization
function EnergyField({ energy, magnetization }: { energy: number; magnetization: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshStandardMaterial;
            const hue = magnetization > 0 ? 0.3 : 0.0; // Green for aligned, red for misaligned
            material.emissive.setHSL(hue, 0.8, 0.1 + Math.abs(magnetization) * 0.1);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[4, 32, 32]} />
            <meshStandardMaterial
                color="#111"
                transparent
                opacity={0.1}
                side={THREE.BackSide}
            />
        </mesh>
    );
}

// Main 3D Scene
function TeamScene({
    members,
    candidate,
    isSimulating,
    onMemberClick,
    selectedId
}: {
    members: TeamMember[];
    candidate: TeamMember | null;
    isSimulating: boolean;
    onMemberClick: (id: string) => void;
    selectedId: string | null;
}) {
    const energy = isingHamiltonian(candidate ? [...members, candidate] : members);
    const mag = magnetization(candidate ? [...members, candidate] : members);

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4488ff" />

            <EnergyField energy={energy} magnetization={mag} />
            <ConnectionLines members={members} candidate={candidate} />

            {members.map(member => (
                <MemberNode
                    key={member.id}
                    member={member}
                    isSelected={selectedId === member.id}
                    onClick={() => onMemberClick(member.id)}
                />
            ))}

            {candidate && (
                <MemberNode
                    member={candidate}
                    isCandidate
                />
            )}

            <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />

            {/* Axis indicators */}
            <Text position={[3.5, 0, 0]} fontSize={0.2} color="#f97316">D</Text>
            <Text position={[0, 3.5, 0]} fontSize={0.2} color="#eab308">I</Text>
            <Text position={[0, 0, 3.5]} fontSize={0.2} color="#22c55e">S</Text>
        </>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const createRandomMember = (id: string, name: string): TeamMember => ({
    id,
    name,
    disc: {
        D: Math.random(),
        I: Math.random(),
        S: Math.random(),
        C: Math.random()
    },
    ocean: {
        O: Math.random(),
        C: Math.random(),
        E: Math.random(),
        A: Math.random(),
        N: Math.random()
    },
    position: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
    ),
    velocity: new THREE.Vector3(),
    spin: Math.random() > 0.5 ? 1 : -1
});

const presetTeam: TeamMember[] = [
    {
        id: '1', name: 'Alex (Lead)',
        disc: { D: 0.85, I: 0.60, S: 0.30, C: 0.45 },
        ocean: { O: 0.7, C: 0.8, E: 0.9, A: 0.4, N: 0.3 },
        position: new THREE.Vector3(1.5, 0.5, 0),
        velocity: new THREE.Vector3(),
        spin: 1
    },
    {
        id: '2', name: 'Jordan (Analyst)',
        disc: { D: 0.25, I: 0.35, S: 0.50, C: 0.90 },
        ocean: { O: 0.4, C: 0.95, E: 0.3, A: 0.6, N: 0.5 },
        position: new THREE.Vector3(-1, -0.5, 1),
        velocity: new THREE.Vector3(),
        spin: 1
    },
    {
        id: '3', name: 'Sam (Developer)',
        disc: { D: 0.40, I: 0.45, S: 0.70, C: 0.75 },
        ocean: { O: 0.8, C: 0.7, E: 0.4, A: 0.7, N: 0.4 },
        position: new THREE.Vector3(0, 1, -1),
        velocity: new THREE.Vector3(),
        spin: -1
    },
    {
        id: '4', name: 'Casey (Support)',
        disc: { D: 0.20, I: 0.80, S: 0.85, C: 0.35 },
        ocean: { O: 0.5, C: 0.5, E: 0.8, A: 0.9, N: 0.2 },
        position: new THREE.Vector3(-0.5, -1, -0.5),
        velocity: new THREE.Vector3(),
        spin: 1
    }
];

export default function McKenneyLacanSimulator() {
    const [team, setTeam] = useState<TeamMember[]>(presetTeam);
    const [candidate, setCandidate] = useState<TeamMember | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [temperature, setTemperature] = useState(0.5);
    const [showCandidate, setShowCandidate] = useState(false);
    const animationRef = useRef<number | null>(null);

    // Simulation loop
    useEffect(() => {
        if (!isSimulating) {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            return;
        }

        const simulate = () => {
            setTeam(prev => evolveState(prev, 0.016, temperature));
            animationRef.current = requestAnimationFrame(simulate);
        };

        animationRef.current = requestAnimationFrame(simulate);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isSimulating, temperature]);

    // Computed metrics
    const metrics = useMemo(() => {
        const allMembers = candidate ? [...team, candidate] : team;
        const energy = isingHamiltonian(allMembers);
        const mag = magnetization(allMembers);

        let totalDissonance = 0;
        let count = 0;
        for (let i = 0; i < team.length; i++) {
            for (let j = i + 1; j < team.length; j++) {
                totalDissonance += calculateDissonance(team[i], team[j]);
                count++;
            }
        }
        const avgDissonance = count > 0 ? totalDissonance / count : 0;

        const utility = candidate ? candidateUtility(team, candidate) : null;

        // Team health based on energy and magnetization
        const health = Math.round(50 + mag * 25 - Math.abs(energy) * 2);

        return { energy, mag, avgDissonance, utility, health: Math.max(0, Math.min(100, health)) };
    }, [team, candidate]);

    const resetTeam = () => {
        setTeam(presetTeam.map(m => ({ ...m, position: m.position.clone(), velocity: new THREE.Vector3() })));
        setCandidate(null);
        setShowCandidate(false);
        setSelectedId(null);
        setIsSimulating(false);
    };

    const addCandidate = () => {
        const newCandidate = createRandomMember('candidate', 'New Candidate');
        newCandidate.position = new THREE.Vector3(0, 2, 0);
        setCandidate(newCandidate);
        setShowCandidate(true);
    };

    const hireCandidate = () => {
        if (!candidate) return;
        setTeam(prev => [...prev, { ...candidate, id: Date.now().toString(), name: `${candidate.name} (Hired)` }]);
        setCandidate(null);
        setShowCandidate(false);
    };

    const flipSpin = (id: string) => {
        setTeam(prev => prev.map(m => m.id === id ? { ...m, spin: -m.spin } : m));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Zap className="text-orange-400" />
                        McKenney-Lacan Team Dynamics
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 font-mono">
                        P_i = [D I; S C] ⊗ [O C E A N] | H = -J Σ s_i s_j
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsSimulating(!isSimulating)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isSimulating
                            ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                            : 'bg-green-500/20 border border-green-500/50 text-green-400'
                            }`}
                    >
                        {isSimulating ? <Pause size={14} /> : <Play size={14} />}
                        {isSimulating ? 'Pause' : 'Simulate'}
                    </button>
                    <button
                        onClick={resetTeam}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400 transition-colors"
                    >
                        <RotateCcw size={14} /> Reset
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* 3D Visualization */}
                <div className="lg:col-span-2 bg-black/40 border border-white/10 rounded-2xl overflow-hidden" style={{ height: '500px' }}>
                    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                        <TeamScene
                            members={team}
                            candidate={showCandidate ? candidate : null}
                            isSimulating={isSimulating}
                            onMemberClick={(id) => setSelectedId(selectedId === id ? null : id)}
                            selectedId={selectedId}
                        />
                    </Canvas>

                    {/* Overlay Instructions */}
                    <div className="absolute bottom-4 left-4 text-[10px] text-gray-500 font-mono">
                        DRAG TO ROTATE • SCROLL TO ZOOM • CLICK NODE TO SELECT
                    </div>
                </div>

                {/* Metrics Panel */}
                <div className="space-y-4">
                    {/* Hamiltonian Energy */}
                    <div className="p-5 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Activity className="text-red-400" size={18} />
                            <span className="text-xs uppercase tracking-widest text-gray-400">Hamiltonian H</span>
                        </div>
                        <div className="text-3xl font-mono font-bold text-white">
                            {metrics.energy.toFixed(3)}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2">
                            Lower = more stable configuration
                        </p>
                    </div>

                    {/* Magnetization */}
                    <div className="p-5 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Target className="text-blue-400" size={18} />
                            <span className="text-xs uppercase tracking-widest text-gray-400">Magnetization m</span>
                        </div>
                        <div className={`text-3xl font-mono font-bold ${metrics.mag > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {metrics.mag > 0 ? '+' : ''}{metrics.mag.toFixed(3)}
                        </div>
                        <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-red-500 via-gray-500 to-green-500"
                                style={{ width: '100%', marginLeft: `${(metrics.mag + 1) * 50 - 50}%` }}
                                animate={{ width: '50%', marginLeft: `${(metrics.mag + 1) * 25}%` }}
                            />
                        </div>
                    </div>

                    {/* Dissonance */}
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="text-yellow-400" size={18} />
                            <span className="text-xs uppercase tracking-widest text-gray-400">Avg Dissonance D</span>
                        </div>
                        <div className="text-3xl font-mono font-bold text-white">
                            {metrics.avgDissonance.toFixed(3)}
                        </div>
                    </div>

                    {/* Temperature Control */}
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Settings className="text-gray-400" size={18} />
                            <span className="text-xs uppercase tracking-widest text-gray-400">Temperature T</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={2}
                            step={0.1}
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                            <span>Cold (Ordered)</span>
                            <span className="font-mono">{temperature.toFixed(1)}</span>
                            <span>Hot (Chaotic)</span>
                        </div>
                    </div>

                    {/* Team Health Score */}
                    <div className="p-5 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="text-orange-400" size={18} />
                            <span className="text-xs uppercase tracking-widest text-gray-400">Team Health</span>
                        </div>
                        <div className="text-4xl font-black text-white">
                            {metrics.health}<span className="text-xl text-gray-500">%</span>
                        </div>
                        <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full rounded-full ${metrics.health > 70 ? 'bg-green-500' : metrics.health > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                animate={{ width: `${metrics.health}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Candidate Simulation */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <UserPlus className="text-orange-400" size={20} />
                        <span className="font-bold text-white">Candidate Simulation</span>
                    </div>
                    {!showCandidate ? (
                        <button
                            onClick={addCandidate}
                            className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg text-sm text-orange-400 transition-colors"
                        >
                            Add Random Candidate
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={hireCandidate}
                                disabled={!metrics.utility || metrics.utility.utility < 0}
                                className="px-4 py-2 bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-sm font-bold text-black transition-colors"
                            >
                                Hire Candidate
                            </button>
                            <button
                                onClick={() => { setCandidate(null); setShowCandidate(false); }}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-400"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}
                </div>

                {showCandidate && metrics.utility && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10"
                    >
                        <div className="text-center">
                            <div className={`text-2xl font-mono font-bold ${metrics.utility.utility > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {metrics.utility.utility.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase">U(P) Utility</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl font-mono ${metrics.utility.magnetizationDelta >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {metrics.utility.magnetizationDelta >= 0 ? '+' : ''}{(metrics.utility.magnetizationDelta * 100).toFixed(1)}%
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase">Δ Magnetization</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-mono text-yellow-400">
                                {metrics.utility.dissonanceNew.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase">Dissonance</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-mono text-blue-400">
                                {(metrics.utility.fit * 100).toFixed(0)}%
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase">Fit Score</div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
