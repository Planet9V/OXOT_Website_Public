'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- MATH & UTILS ---
const randomInSphere = (numParticles: number, radius: number) => {
    const points = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
};

// --- COMPONENTS ---

// 1. The Central "State Manifold" (Distorted Sphere/Knot)
const StateManifold = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={2}>
                <icosahedronGeometry args={[1, 6]} />
                <MeshDistortMaterial
                    color="#00aaff" // OXOT Blue
                    emissive="#0044aa"
                    emissiveIntensity={0.5}
                    wireframe={true}
                    speed={2} // Fast distortion for "active calculation"
                    distort={0.6} // High distortion
                    roughness={0}
                    metalness={1}
                />
            </mesh>
            {/* Inner Core */}
            <mesh scale={1.5}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="black" transparent opacity={0.9} />
            </mesh>
        </Float>
    );
};

// 2. Entropy Field (Particles)
const EntropyField = () => {
    const ref = useRef<THREE.Points>(null);
    const sphere = useMemo(() => randomInSphere(3000, 6), []); // 3000 particles

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00ffff" // Cyan for data/entropy
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

// 3. Logic Rings (Representing Constraints)
const LogicRing = ({ radius, color, axes }: { radius: number, color: string, axes: [number, number, number] }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x += 0.01 * axes[0];
            ref.current.rotation.y += 0.01 * axes[1];
            ref.current.rotation.z += 0.01 * axes[2];
        }
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
    );
};

// --- MAIN VISUAL ---
export default function E27HyperVisual({ variant = 'card' }: { variant?: 'card' | 'hero' }) {
    const containerClasses = variant === 'hero'
        ? "absolute inset-0 w-full h-full z-0"
        : "w-full h-full min-h-[500px] relative rounded-3xl overflow-hidden bg-black/60 border border-white/5 shadow-2xl";

    return (
        <div className={containerClasses}>
            {/* Overlay Text - Only show in card mode or different styling for hero? */}
            {variant === 'card' && (
                <>
                    <div className="absolute top-6 left-6 z-10 pointer-events-none">
                        <div className="text-[10px] font-mono text-oxot-blue uppercase tracking-[0.3em] mb-1">
                            Real-time Kernel
                        </div>
                        <div className="text-2xl font-black text-white uppercase tracking-tighter">
                            State Evolution
                        </div>
                    </div>

                    <div className="absolute bottom-6 right-6 z-10 pointer-events-none text-right">
                        <div className="text-[10px] font-mono text-oxot-gold uppercase tracking-widest">
                            Entropy: 0.42 [NOMINAL]
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                            H(t) = -Σ p ln(p)
                        </div>
                    </div>
                </>
            )}

            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00aaff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#F5C518" />

                <StateManifold />
                <EntropyField />

                {/* Orbital Constraint Rings */}
                <LogicRing radius={3.5} color="#ffffff" axes={[1, 0.5, 0]} />
                <LogicRing radius={4.5} color="#00aaff" axes={[0, 1, 0.5]} />
                <LogicRing radius={5.5} color="#F5C518" axes={[0.5, 0, 1]} />
            </Canvas>
        </div>
    );
}
