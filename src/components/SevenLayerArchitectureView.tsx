"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Layers, Database, Shield, Brain, Activity, Zap, FileCode, Network, Target, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { View, Float, PerspectiveCamera, Environment, MeshDistortMaterial, Stars, Sparkles, Cylinder, Sphere, TorusKnot, Line, Icosahedron, Box, Text, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { OXOTLogo } from './branding/OXOTLogo';
import { PageHeader } from './branding/PageHeader';

// --- 3D SCENE COMPONENTS ---

const SceneL0 = () => {
    const group = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.2;
            group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        }
    });

    return (
        <group ref={group}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#6b7280" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Icosahedron args={[1, 2]}>
                    <meshStandardMaterial color="#9ca3af" wireframe transparent opacity={0.3} />
                </Icosahedron>
                <Icosahedron args={[0.8, 0]}>
                    <meshPhysicalMaterial
                        color="#4b5563"
                        metalness={0.9}
                        roughness={0.1}
                        transmission={0.5}
                        thickness={2}
                    />
                </Icosahedron>
            </Float>
            {[1.5, 2, 2.5].map((r, i) => (
                <group key={i} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh rotation={[0, 0, i * 2]}>
                        <torusGeometry args={[r, 0.02, 16, 100]} />
                        <meshBasicMaterial color="#6b7280" transparent opacity={0.5} />
                    </mesh>
                    <mesh position={[r, 0, 0]}>
                        <boxGeometry args={[0.2, 0.05, 0.1]} />
                        <meshBasicMaterial color="#e5e7eb" />
                    </mesh>
                </group>
            ))}
            <Environment preset="city" />
        </group>
    );
};

const SceneL1 = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 100;
    const temp = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        let i = 0;
        const time = state.clock.elapsedTime;
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                const id = i++;
                const y = Math.sin(x / 2 + time) * Math.cos(z / 2 + time) * 0.5;
                temp.position.set(x - 4.5, y, z - 4.5);
                temp.scale.set(0.8, 1 + Math.max(0, y * 4), 0.8);
                temp.updateMatrix();
                meshRef.current.setMatrixAt(id, temp.matrix);
                const color = new THREE.Color();
                const intensity = (y + 0.5) * 0.5 + 0.2;
                color.setHSL(0.6, 0.8, intensity);
                meshRef.current.setColorAt(id, color);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <group rotation={[Math.PI / 6, Math.PI / 4, 0]}>
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={40} />
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 10, 5]} intensity={2} color="#3b82f6" />
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <boxGeometry args={[1, 0.2, 1]} />
                <meshStandardMaterial roughness={0.2} metalness={0.8} />
            </instancedMesh>
        </group>
    );
};

const SceneL2 = () => {
    const count = 50;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);
    const lines = useMemo(() => {
        const points = [];
        for (let i = 0; i < 20; i++) {
            const idx1 = Math.floor(Math.random() * count) * 3;
            const idx2 = Math.floor(Math.random() * count) * 3;
            points.push(new THREE.Vector3(positions[idx1], positions[idx1 + 1], positions[idx1 + 2]), new THREE.Vector3(positions[idx2], positions[idx2 + 1], positions[idx2 + 2]));
        }
        return points;
    }, [positions]);

    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
            <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
                <points>
                    <bufferGeometry><bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} /></bufferGeometry>
                    <pointsMaterial size={0.15} color="#22c55e" transparent opacity={0.8} sizeAttenuation />
                </points>
                <Sphere args={[0.8, 16, 16]}>
                    <meshPhysicalMaterial color="#22c55e" emissive="#14532d" roughness={0.2} metalness={0.8} wireframe />
                </Sphere>
                {lines.map((start, i) => (<Line key={i} points={[start, new THREE.Vector3(0, 0, 0)]} color="#22c55e" lineWidth={1} transparent opacity={0.2} />))}
            </Float>
            <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};

const SceneL3 = () => {
    const shieldRef = useRef<THREE.Mesh>(null);
    useFrame(() => { if (shieldRef.current) shieldRef.current.rotation.y += 0.005; });
    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
            <Sphere ref={shieldRef} args={[2.5, 32, 32]}>
                <meshPhysicalMaterial color="#ef4444" roughness={0} transmission={0.6} thickness={0.5} wireframe={false} side={THREE.DoubleSide} emissive="#7f1d1d" emissiveIntensity={0.5} />
            </Sphere>
            <Sphere args={[2.45, 16, 16]}>
                <meshBasicMaterial color="#fca5a5" wireframe transparent opacity={0.1} />
            </Sphere>
            <Sparkles count={30} scale={6} size={4} speed={0.4} opacity={1} color="#ef4444" />
            <mesh rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.05, 0.05, 7]} />
                <meshBasicMaterial color="#ef4444" opacity={0.5} transparent />
            </mesh>
            <pointLight position={[5, 0, 5]} intensity={1} color="#f87171" />
        </group>
    );
};

const SceneL4 = () => {
    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 10, 5]} intensity={2} color="#ec4899" />
            <Float speed={4} rotationIntensity={2} floatIntensity={1}>
                <TorusKnot args={[1.5, 0.4, 100, 16]}>
                    <MeshDistortMaterial color="#ec4899" speed={2} distort={0.4} radius={1} roughness={0.1} metalness={0.5} />
                </TorusKnot>
            </Float>
            <Sparkles count={50} scale={5} size={2} speed={0.2} opacity={0.5} color="#f472b6" />
        </group>
    );
};

const SceneL5 = () => {
    const count = 40;
    const items = useMemo(() => Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: Math.random() * -20,
        speed: Math.random() * 0.2 + 0.1
    })), []);
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const temp = useMemo(() => new THREE.Object3D(), []);
    useFrame(() => {
        if (!meshRef.current) return;
        items.forEach((item, i) => {
            item.z += item.speed;
            if (item.z > 5) item.z = -20;
            temp.position.set(item.x, item.y, item.z);
            temp.scale.set(0.05, 0.05, item.speed * 20);
            temp.updateMatrix();
            meshRef.current!.setMatrixAt(i, temp.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });
    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={1} />
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#f97316" />
            </instancedMesh>
        </group>
    );
};

const SceneL6 = () => {
    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                <Cylinder args={[0.2, 0.2, 4]} rotation={[0, 0, Math.PI / 2]} position={[-2, 0, 0]}>
                    <meshStandardMaterial color="#a855f7" transparent opacity={0.6} metalness={0.9} roughness={0.1} />
                </Cylinder>
                <Cylinder args={[0.1, 0.18, 3]} rotation={[0, 0, Math.PI / 2 - 0.3]} position={[1.2, 0.5, 0]}>
                    <meshStandardMaterial color="#c084fc" transparent opacity={0.4} metalness={0.9} roughness={0.1} />
                </Cylinder>
                <Cylinder args={[0.05, 0.18, 3]} rotation={[0, 0, Math.PI / 2 + 0.4]} position={[1.2, -0.6, 0]}>
                    <meshStandardMaterial color="#9333ea" transparent opacity={0.2} metalness={0.9} roughness={0.1} />
                </Cylinder>
                <Sphere position={[-4, 0, 0]} args={[0.4]}><meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={2} /></Sphere>
                <Sphere position={[0, 0, 0]} args={[0.4]}><meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={2} /></Sphere>
                <Sphere position={[2.5, 1.2, 0]} args={[0.3]}><meshStandardMaterial color="#d8b4fe" emissive="#a855f7" emissiveIntensity={1} /></Sphere>
                <Sphere position={[2.5, -1.5, 0]} args={[0.2]}><meshStandardMaterial color="#581c87" emissive="#3b0764" emissiveIntensity={0.5} /></Sphere>
            </Float>
            <Environment preset="night" />
        </group>
    );
};

// --- MAIN COMPONENT ---

const LEVELS_DATA = [
    { level: 0, title: "Equipment Catalog", subtitle: "Universal Product Definitions", icon: Database, color: "gray", gradient: "from-gray-400 to-gray-600", Theme: SceneL0, description: "The foundational reference layer defining standardized equipment types. This is the 'Platonic ideal' of equipment - not your specific deployed assets, but the universal blueprints and product definitions that those assets instantiate.", stats: [{ value: "6,000+", label: "Product Definitions" }, { value: "16", label: "Critical Sectors" }, { value: "100%", label: "Vendor Coverage" }], features: [{ title: "Universal Blueprints", desc: "Standardized definitions for SCADA, transformer, and medical devices." }, { title: "Vendor Intelligence", desc: "Tracks security responsiveness (e.g. Alstom vs Siemens patch cycles)." }, { title: "Vulnerability Inheritance", desc: "Automatically maps new CVEs to all product instances." }] },
    { level: 1, title: "Customer Equipment", subtitle: "Deployed Instances & State", icon: Network, color: "blue", gradient: "from-blue-400 to-blue-600", Theme: SceneL1, description: "The bridge between abstract catalogs and real-world operations. It answers: 'What do we have, where is it, and what is its state?' Verified physical assets with serial numbers and geo-location.", stats: [{ value: "48,288", label: "Active Nodes" }, { value: "5,000+", label: "Facilities Mapped" }, { value: "61.6%", label: "Sector Aligned" }], features: [{ title: "Real-Time State", desc: "Live integration with CMDBs and asset management systems." }, { title: "Geo-Spatial Mapping", desc: "Precise physical location tracking for kinetic impact analysis." }, { title: "Cross-Sector Graph", desc: "Mapping interdependencies between Energy, Water, and Telco." }] },
    { level: 2, title: "Software SBOM", subtitle: "Deep Dependency Tracking", icon: FileCode, color: "green", gradient: "from-green-400 to-green-600", Theme: SceneL2, description: "Transcends traditional inventory by achieving library-level granularity. We track not just applications, but specific library versions, transitive dependencies, and function-level code components.", stats: [{ value: "316k+", label: "CVE Database" }, { value: "140k+", label: "Components" }, { value: "1,800+", label: "Avg. Dependencies" }], features: [{ title: "Transitive Analysis", desc: "Uncovers vulnerabilities buried 5+ levels deep in the dependency tree." }, { title: "Auto-Resolution", desc: "Supports SPDX/CycloneDX and resolves npm, pip, maven, and go packages." }, { title: "EPSS Enrichment", desc: "Every CVE scored with real-time Exploit Prediction Simulator." }] },
    { level: 3, title: "Threat Intelligence", subtitle: "Active Attack Surface", icon: Shield, color: "red", gradient: "from-red-400 to-red-600", Theme: SceneL3, description: "Transforms passive inventory into active threat modeling. Maps who is attacking, how they operate, and which specific assets they are targeting based on real-world campaigns.", stats: [{ value: "691", label: "MITRE Techniques" }, { value: "150+", label: "APT Groups" }, { value: "10k+", label: "Active IoCs" }], features: [{ title: "Kill Chain Modeling", desc: "Full mapping of APT campaigns from Reconnaissance to Exfiltration." }, { title: "Attribution Engine", desc: "Links IPs and hashes to specific threat actors (e.g. Volt Typhoon)." }, { title: "Campaign Tracking", desc: "Monitors active campaigns against specific industry sectors." }] },
    { level: 4, title: "Psychology", subtitle: "The Human Element", icon: Brain, color: "pink", gradient: "from-pink-400 to-pink-600", Theme: SceneL4, description: "Models the most overlooked dimension: human decision-making. We quantify cognitive biases, organizational culture, and 'irrational' behaviors that lead to security failures.", stats: [{ value: "30", label: "Cognitive Biases" }, { value: "18k+", label: "Logic Paths" }, { value: "$7.3M", label: "Bias Cost/Yr" }], features: [{ title: "Lacanian Topology", desc: "Models the gap between 'Real' threats and 'Imaginary' fears." }, { title: "Bias Cascades", desc: "Simulates how Overconfidence leads to Sunk Cost logic loops." }, { title: "Organizational Risk", desc: "Quantifies 'Groupthink' and 'Normalcy Bias' in decision chains." }] },
    { level: 5, title: "Information Streams", subtitle: "Global Event Processing", icon: Activity, color: "orange", gradient: "from-orange-400 to-orange-600", Theme: SceneL5, description: "The 'NOW' layer. A real-time pipeline processing global cybersecurity events, geopolitical shifts, and news wires with sub-second latency.", stats: [{ value: "< 1s", label: "Event Latency" }, { value: "10k+", label: "Events / Sec" }, { value: "5,500", label: "Stream Nodes" }], features: [{ title: "Echo Chamber Detection", desc: "Measures media amplification and FUD propagation." }, { title: "Sentiment Analysis", desc: "Real-time BERT models analyzing global security sentiment." }, { title: "Geopolitical Correlation", desc: "Links kinetic warfare events to cyber activity spikes." }] },
    { level: 6, title: "Predictions", subtitle: "Psychohistory & Forecasting", icon: Zap, color: "purple", gradient: "from-purple-400 to-purple-600", Theme: SceneL6, description: "The apex capability. Mathematical prediction of future security states using statistical mechanics and historical baselines. Not magic—math.", stats: [{ value: "92%", label: "Accuracy (30d)" }, { value: "24k+", label: "Predictions" }, { value: "8,900", label: "Forecasts" }], features: [{ title: "Breach Forecasting", desc: "Probabilistic models of breach likelihood by sector and asset." }, { title: "Remediation Lag", desc: "Predicts how long specific organizations will take to patch." }, { title: "ROI Simulation", desc: "'What If' engine for security investment optimization." }] }
];

export default function SevenLayerArchitectureView({ isEmbedded = false }: { isEmbedded?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    // Create a stable array of refs for the Views to track. 
    // We use useMemo to ensure these refs persist across re-renders.
    const viewRefs = useMemo(() => LEVELS_DATA.map(() => React.createRef<HTMLDivElement>()), []);

    // Mount state to ensure we don't render canvas children until divs are in DOM.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        // Added bg-slate-950 to ensure dark background (user reported white background bug earlier)
        <div ref={containerRef} className="relative min-h-screen bg-slate-950 text-gray-300 font-sans selection:bg-blue-500/30 selection:text-white overflow-visible">

            {/* GLOBAL CANVAS - This renders ALL 3D content */}
            {/* z-0 ensures it is behind content. pointer-events-none passes clicks to content. */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <Canvas eventSource={containerRef as any} className="w-full h-full">
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <Preload all />

                    {/* DEBUG MESH: A small red cube at origin to verify WebGL context is working. */}
                    {/* If this is visible, the Canvas is working. If not, the Canvas or CSS is broken. */}
                    <mesh position={[0, 0, 0]} rotation={[0.4, 0.2, 0]}>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshBasicMaterial color="red" wireframe />
                    </mesh>

                    {/* Only render Views if we are mounted (so refs exist in DOM) */}
                    {mounted && LEVELS_DATA.map((layer, idx) => (
                        <View key={`view-${idx}`} index={idx + 1} track={viewRefs[idx] as React.MutableRefObject<HTMLElement>}>
                            <layer.Theme />
                        </View>
                    ))}
                </Canvas>
            </div>

            {/* Hero Section */}
            {!isEmbedded && (
                <section className="relative h-screen flex flex-col items-center justify-center z-10 p-4 pointer-events-none">
                    <div className="pointer-events-auto">
                        <motion.div style={{ opacity, scale }} className="text-center max-w-7xl mx-auto flex flex-col items-center">
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="mb-8">
                                <OXOTLogo size="lg" animated={true} />
                            </motion.div>
                            <PageHeader title="7-LAYER TWIN" subtitle="Structural Integrity Models // The Physical-Digital Convergence Architecture." variant="hero" accent="blue" className="mb-12" />
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-4xl mx-auto">
                                <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
                                    A comprehensive architectural framework spanning from physical equipment Blueprints (L0) to strategic Socio-Economic dynamics (L7). Standardized, interoperable, and resilient.
                                </p>
                            </motion.div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
                            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Map Layers</span>
                            <ChevronDown className="w-4 h-4 animate-bounce" />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Main Content List */}
            <div className={`relative z-10 max-w-7xl mx-auto px-4 ${isEmbedded ? 'pt-10' : 'py-20'} space-y-32`}>
                {LEVELS_DATA.map((layer, idx) => {
                    const Icon = layer.icon;
                    const isEven = idx % 2 === 0;
                    return (
                        <motion.section key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }} className="relative">
                            {/* Layer Header */}
                            <div className={`flex items-center gap-6 mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`relative group`}>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${layer.gradient} blur-2xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full`}></div>
                                    <div className={`relative w-24 h-24 bg-${layer.color}-900/20 border-2 border-${layer.color}-500/50 rounded-2xl flex items-center justify-center`}>
                                        <Icon className={`w-12 h-12 text-${layer.color}-400`} />
                                    </div>
                                </div>
                                <div className={isEven ? 'text-left' : 'text-right'}>
                                    <div className={`text-6xl font-black text-${layer.color}-500/20 mb-2`}>L{layer.level}</div>
                                    <h2 className="text-4xl font-black text-white mb-2">{layer.title}</h2>
                                    <p className={`text-lg text-${layer.color}-400`}>{layer.subtitle}</p>
                                </div>
                            </div>

                            {/* Main Card */}
                            <div className={`relative bg-black/40 border border-${layer.color}-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-${layer.color}-500/40 transition-all overflow-hidden`}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

                                    {/* 3D Viewport - The Canvas will render here via Portal/View Tracking */}
                                    <div className="h-64 rounded-xl border border-white/5 relative overflow-hidden group bg-black/20">
                                        {/* We attach the ref here. The Canvas (above) uses this ref to track position. */}
                                        <div ref={viewRefs[idx]} className="absolute inset-0 w-full h-full" />
                                    </div>

                                    {/* Stats & Content */}
                                    <div className="flex flex-col justify-center">
                                        <p className="text-xl text-gray-200 leading-relaxed mb-8 font-light border-l-2 border-white/10 pl-6">{layer.description}</p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {layer.stats.map((stat, sIdx) => (
                                                <div key={sIdx} className={`p-4 rounded-lg bg-${layer.color}-500/5 border border-${layer.color}-500/10 flex justify-between items-center hover:bg-${layer.color}-500/10 transition-colors`}>
                                                    <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">{stat.label}</span>
                                                    <span className={`text-2xl font-black text-${layer.color}-400`}>{stat.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Blocks */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {layer.features.map((feature, fIdx) => (
                                        <div key={fIdx} className={`p-6 rounded-xl bg-black/60 border border-white/5 hover:border-${layer.color}-500/30 transition-all hover:-translate-y-1 group cursor-default`}>
                                            <div className={`w-10 h-10 rounded-lg bg-${layer.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                <div className={`w-2 h-2 rounded-full bg-${layer.color}-400`}></div>
                                            </div>
                                            <h4 className={`text-lg font-bold text-white mb-2 group-hover:text-${layer.color}-400 transition-colors`}>{feature.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={`absolute -bottom-3 -right-3 w-32 h-32 bg-gradient-to-br ${layer.gradient} opacity-5 blur-3xl rounded-full`}></div>
                            </div>

                            {/* Layer Connector */}
                            {idx < LEVELS_DATA.length - 1 && (
                                <div className="flex justify-center mt-16">
                                    <div className={`w-0.5 h-16 bg-gradient-to-b from-${layer.color}-500/50 to-transparent`}></div>
                                </div>
                            )}
                        </motion.section>
                    );
                })}
            </div>
        </div>
    );
}
