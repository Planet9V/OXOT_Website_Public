'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Line, Html, Float, Stars, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Zap, Droplets, Wheat, Activity, AlertTriangle, Play } from 'lucide-react';

// --- SUSTENANCE PILLARS ---
const PILLARS = [
    { id: 'energy', label: 'Reliable Energy', icon: Zap, color: '#facc15', position: [-3.5, 0, 0] as [number, number, number] },
    { id: 'water', label: 'Clean Water', icon: Droplets, color: '#22d3ee', position: [3.5, 0, 0] as [number, number, number] },
    { id: 'food', label: 'Healthy Food', icon: Wheat, color: '#4ade80', position: [0, 3, 0] as [number, number, number] },
];

// --- 3D NODE COMPONENT ---
const PillarNode = ({ position, color, label, isActive, onClick }: { position: [number, number, number], color: string, label: string, isActive: boolean, onClick: () => void }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            const pulse = 1 + Math.sin(state.clock.elapsedTime * (isActive ? 4 : 2)) * (isActive ? 0.15 : 0.05);
            meshRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                <mesh
                    ref={meshRef}
                    onClick={onClick}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        emissive={color}
                        emissiveIntensity={isActive ? 3 : (hovered ? 1.5 : 0.5)}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Inner Glow */}
                <mesh scale={[0.7, 0.7, 0.7]}>
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={isActive ? 0.4 : 0.15} />
                </mesh>

                {/* Label */}
                <Html distanceFactor={10} position={[0, -1.8, 0]} center>
                    <div className="flex flex-col items-center pointer-events-none text-center w-32">
                        <div
                            className={`px-3 py-1.5 rounded-lg border backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isActive ? 'bg-black/80 border-white/50 text-white scale-110' : 'bg-black/50 border-white/20 text-gray-300'}`}
                            style={{ borderColor: isActive ? color : undefined, color: isActive ? color : undefined }}
                        >
                            {label}
                        </div>
                    </div>
                </Html>
            </Float>
        </group>
    );
};

// --- CONNECTOR ---
const Connector = ({ start, end, color, isActive }: { start: [number, number, number], end: [number, number, number], color: string, isActive: boolean }) => {
    const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
    return (
        <Line
            points={points}
            color={isActive ? color : "#444444"}
            opacity={isActive ? 0.8 : 0.2}
            transparent
            lineWidth={isActive ? 3 : 1}
        />
    );
};

// --- CASCADING PARTICLE SYSTEM ---
const CascadeParticles = ({ active, color }: { active: boolean, color: string }) => {
    if (!active) return null;
    return (
        <Sparkles
            count={150}
            scale={10}
            size={3}
            speed={1.5}
            opacity={0.6}
            color={color}
            noise={0.3}
        />
    );
};

// --- MAIN 3D SCENE ---
const SustenanceScene = ({ activePillar, setActivePillar }: { activePillar: string | null, setActivePillar: (id: string | null) => void }) => {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff5500" />
            <Stars radius={60} depth={50} count={3000} factor={5} saturation={0} fade speed={0.5} />

            {/* NODES */}
            {PILLARS.map((pillar) => (
                <PillarNode
                    key={pillar.id}
                    position={pillar.position}
                    color={pillar.color}
                    label={pillar.label}
                    isActive={activePillar === pillar.id}
                    onClick={() => setActivePillar(activePillar === pillar.id ? null : pillar.id)}
                />
            ))}

            {/* CONNECTIONS */}
            <Connector start={PILLARS[0].position} end={PILLARS[1].position} color="#facc15" isActive={!!activePillar} />
            <Connector start={PILLARS[1].position} end={PILLARS[2].position} color="#22d3ee" isActive={!!activePillar} />
            <Connector start={PILLARS[2].position} end={PILLARS[0].position} color="#4ade80" isActive={!!activePillar} />

            {/* CHAOS MODE */}
            <CascadeParticles active={!!activePillar} color={PILLARS.find(p => p.id === activePillar)?.color || '#ffffff'} />

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </>
    );
};

// --- MAIN EXPORT ---
interface CriticalSustenance3DProps {
    headline?: React.ReactNode;
    subheadline?: React.ReactNode;
    badgeText?: string;
}

export default function CriticalSustenance3D({ headline, subheadline, badgeText }: CriticalSustenance3DProps) {
    const [activePillar, setActivePillar] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const activePillarData = PILLARS.find(p => p.id === activePillar);

    return (
        // IMPORTANT: Using normal-case here to override any parent uppercase styling
        <section className="relative z-10 py-24 md:py-32 border-t border-b border-white/5 bg-gradient-to-b from-black via-gray-950 to-black normal-case">
            <div className="max-w-[1800px] mx-auto px-4 md:px-8">

                {/* --- MISSION STATEMENT (FRONT AND CENTER) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono tracking-widest mb-6">
                        <Activity size={14} /> {badgeText || "The Essential Mission"}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                        {headline || (
                            <>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
                                    Reliable Energy. Clean Water. Healthy Food.
                                </span>
                            </>
                        )}
                        <br />
                        <span className="text-white/80">{subheadline || "For Our (Grand)Children."}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        This is not an abstract goal. It is the <strong className="text-white">non-negotiable foundation</strong> of OXOT's existence.
                        We model the cascading failure dynamics between these interconnected systems to predict—and prevent—catastrophic collapse.
                    </p>
                </motion.div>

                {/* --- MAIN GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">

                    {/* LEFT: 3D CANVAS */}
                    <div className="lg:col-span-3 h-[500px] md:h-[600px] w-full relative rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-blue-900/10">
                        {/* HUD Overlay */}
                        <div className="absolute top-4 left-4 z-10 pointer-events-none">
                            <div className="text-[10px] font-mono text-cyan-400 opacity-80 tracking-wider">
                                LIVE BIFURCATION MODEL
                            </div>
                            <div className="text-xs font-bold text-white mt-1">
                                Critical Infrastructure Lattice
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 z-10 pointer-events-none text-right">
                            <div className={`text-[10px] font-mono uppercase tracking-wider ${activePillar ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                                {activePillar ? 'CASCADE IN PROGRESS' : 'SYSTEM STABLE'}
                            </div>
                        </div>

                        {/* 3D Scene */}
                        {isClient && (
                            <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                                <SustenanceScene activePillar={activePillar} setActivePillar={setActivePillar} />
                            </Canvas>
                        )}

                        {/* Interaction Hint */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-black/70 px-4 py-2 rounded-full border border-white/10">
                                <Play size={10} /> Click a Node to Simulate Cascade
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: ANALYSIS PANEL */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <AlertTriangle size={18} className="text-yellow-400" /> Cascading Failure Dynamics
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                A shock to the <strong className="text-yellow-400">Energy Grid</strong> creates a cascade:
                                water treatment plants fail (<strong className="text-cyan-400">Clean Water</strong>),
                                followed by agricultural collapse (<strong className="text-green-400">Healthy Food</strong>).
                                We use Granovetter Thresholds and Ising Dynamics to model these interdependencies.
                            </p>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                {PILLARS.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setActivePillar(activePillar === p.id ? null : p.id)}
                                        className={`p-3 rounded-xl border transition-all ${activePillar === p.id ? 'bg-white/10 border-white/30 scale-105' : 'bg-black/30 border-white/5 hover:border-white/20'}`}
                                    >
                                        <p.icon size={20} style={{ color: p.color }} className="mx-auto mb-1" />
                                        <div className="text-[10px] font-mono text-gray-400 uppercase">{p.label.split(' ')[0]}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Status Panel */}
                        <motion.div
                            key={activePillar || 'stable'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-2xl border backdrop-blur-sm"
                            style={{
                                backgroundColor: activePillarData ? `${activePillarData.color}10` : 'rgba(255,255,255,0.03)',
                                borderColor: activePillarData ? `${activePillarData.color}50` : 'rgba(255,255,255,0.1)'
                            }}
                        >
                            <div className="text-xs text-gray-500 font-mono uppercase mb-2">System State Analysis</div>
                            <div className="text-2xl font-black text-white mb-2">
                                {activePillarData ? `${activePillarData.label} Shock` : 'Equilibrium State'}
                            </div>
                            <div className="text-sm text-gray-400">
                                {activePillarData
                                    ? `Simulating cascading effects originating from the ${activePillarData.label.toLowerCase()} sector. Observe interconnected node responses in the lattice.`
                                    : 'The system is in a stable, low-entropy state. Click a node to introduce a perturbation and observe the cascade.'}
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="p-3 bg-black/30 rounded-lg">
                                    <div className="text-[10px] text-gray-500 font-mono uppercase">Entropy (∂S/∂t)</div>
                                    <div className={`text-lg font-bold ${activePillar ? 'text-red-400' : 'text-green-400'}`}>
                                        {activePillar ? '> 0 (Increasing)' : '≈ 0 (Stable)'}
                                    </div>
                                </div>
                                <div className="p-3 bg-black/30 rounded-lg">
                                    <div className="text-[10px] text-gray-500 font-mono uppercase">Threshold (R₀)</div>
                                    <div className={`text-lg font-bold ${activePillar ? 'text-orange-400' : 'text-cyan-400'}`}>
                                        {activePillar ? '> 1.0 (Critical)' : '< 1.0 (Subcritical)'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
