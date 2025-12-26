'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, MeshDistortMaterial, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';


// Common canvas setup for all icons to ensure consistency
const IconCanvas = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full h-full">
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#EAB308" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0042D6" />
            {children}
        </Canvas>
    </div>
);

// 1. Deep OT/ICS Expertise: Industrial Mechanism (Rotating Gear/Turbine assembly)
export const IconOT = () => {
    return (
        <IconCanvas>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    {/* Main Cog */}
                    <mesh rotation={[0, 0, 0]}>
                        <torusGeometry args={[1.2, 0.4, 16, 32]} />
                        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
                    </mesh>
                    {/* Inner glowing core */}
                    <mesh>
                        <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
                        <meshStandardMaterial color="#0042D6" emissive="#0042D6" emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                    {/* Orbiting Elements */}
                    <OTRotator />
                </group>
            </Float>
        </IconCanvas>
    );
};

const OTRotator = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (ref.current) ref.current.rotation.z -= delta * 0.5;
    });
    return (
        <group ref={ref}>
            <mesh position={[2, 0, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#EAB308" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[-2, 0, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#EAB308" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#EAB308" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[0, -2, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#EAB308" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    )
}

// 2. AI-Augmented Analysis: Neural Node (Icosahedron with distortion)
export const IconAI = () => {
    return (
        <IconCanvas>
            <Float speed={4} rotationIntensity={2} floatIntensity={2}>
                <AIMesh />
            </Float>
        </IconCanvas>
    );
};

const AIMesh = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[1.5, 1]} />
            <MeshDistortMaterial
                color="#EAB308"
                emissive="#E59000"
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={1}
                distort={0.4}
                speed={2}
                wireframe={true}
            />
            <mesh scale={[0.8, 0.8, 0.8]}>
                <icosahedronGeometry args={[1.2, 0]} />
                <meshBasicMaterial color="#000" />
            </mesh>
            {/* Inner glow kernel */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#fff" emissive="#EAB308" emissiveIntensity={3} toneMapped={false} />
            </mesh>
        </mesh>
    );
}

// 3. Global Infrastructure: Wireframe Globe with nodes
export const IconGlobal = () => {
    return (
        <IconCanvas>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <GlobalMesh />
            </Float>
        </IconCanvas>
    );
};

const GlobalMesh = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.2;
    });

    return (
        <group ref={ref} rotation={[0.3, 0, 0.1]}>
            <mesh>
                <sphereGeometry args={[1.6, 24, 24]} />
                <meshStandardMaterial color="#0088cc" wireframe transparent opacity={0.3} />
            </mesh>
            <mesh>
                <sphereGeometry args={[1.58, 24, 24]} />
                <meshBasicMaterial color="#000" />
            </mesh>
            {/* Satellites */}
            <Satellite radius={1.8} speed={1} color="#EAB308" />
            <Satellite radius={2.2} speed={-0.7} color="#fff" />
        </group>
    )
}

const Satellite = ({ radius, speed, color }: { radius: number, speed: number, color: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime() * speed;
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
    )
}


// 4. Executive Fluency: Strategic Monolith (Golden Pillar/Chess piece abstract)
export const IconExecutive = () => {
    return (
        <IconCanvas>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <ExecutiveMesh />
            </Float>
        </IconCanvas>
    );
};

const ExecutiveMesh = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.1;
    });

    return (
        <group ref={ref}>
            {/* The Monolith */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 2.5, 1]} />
                <meshStandardMaterial color="#EAB308" metalness={1} roughness={0.1} />
            </mesh>
            {/* Base */}
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Crown/Cap */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.0, 1.0, 0.5, 4]} />
                <meshStandardMaterial color="#fff" emissive="#EAB308" emissiveIntensity={0.5} />
            </mesh>

            {/* Floating Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.05, 16, 100]} />
                <meshStandardMaterial color="#fff" transparent opacity={0.5} />
            </mesh>
        </group>
    )
}
