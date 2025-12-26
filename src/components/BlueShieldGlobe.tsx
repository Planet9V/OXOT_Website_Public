'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Ring, Torus, MeshDistortMaterial, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ShieldRing = ({ radius, speed, color, dashArgs }: { radius: number, speed: number, color: string, dashArgs: [number, number] }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += speed;
            ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.05, 16, 100]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={0.6}
                wireframe
            />
        </mesh>
    );
};

const OuterShield = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y -= 0.005;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={ref}>
            <Icosahedron args={[3.5, 2]} scale={1}>
                <meshPhongMaterial
                    color="#00ffff"
                    wireframe
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                />
            </Icosahedron>
            {/* Glowing points at vertices handled by Icosahedron points if needed, 
           but wireframe is sufficient for 'forcefield' look */}
        </group>
    );
};

const CoreReactor = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.02); // Subtle Pulse
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <Sphere ref={ref} args={[1, 64, 64]}>
            <MeshDistortMaterial
                color="#0088ff"
                emissive="#00ffff"
                emissiveIntensity={1}
                distort={0.4}
                speed={2}
                roughness={0}
                toneMapped={false}
            />
        </Sphere>
    );
};

const FloatingParticles = () => {
    const count = 100;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useRef(new THREE.Object3D());
    const particles = useRef(new Array(count).fill(0).map(() => ({
        pos: new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ),
        vel: new THREE.Vector3(0, 0, 0),
        basePos: new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        )
    })));

    useFrame((state) => {
        if (!mesh.current) return;

        particles.current.forEach((particle, i) => {
            // Orbit logic or random float
            const t = state.clock.elapsedTime;
            particle.pos.y += Math.sin(t + particle.basePos.x) * 0.01;

            dummy.current.position.copy(particle.pos);
            dummy.current.scale.setScalar(0.05);
            dummy.current.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.current.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.4} />
        </instancedMesh>
    );
}

const MathRing = () => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z -= 0.005;
        }
    });

    return (
        <group ref={ref}>
            {[0, 1, 2, 3].map((i) => (
                <Html key={i} position={[3 * Math.cos(i * 1.57), 3 * Math.sin(i * 1.57), 0]} transform>
                    <div className="text-[10px] font-mono text-oxot-blue opacity-70 whitespace-nowrap">
                        {i === 0 && "∂ψ/∂t = -iĤψ"}
                        {i === 1 && "∇²V = -ρ/ε₀"}
                        {i === 2 && "∮ B⋅dl = μ₀I"}
                        {i === 3 && "E = mc²"}
                    </div>
                </Html>
            ))}
        </group>
    );
};

export const BlueShieldGlobe = () => {
    return (
        <div className="w-full h-full min-h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0000ff" />

                <CoreReactor />
                <OuterShield />
                <MathRing />

                {/* Rotating Rings */}
                <ShieldRing radius={1.8} speed={0.01} color="#00aaff" dashArgs={[0.5, 0.5]} />
                <ShieldRing radius={2.2} speed={-0.005} color="#00ffff" dashArgs={[0.2, 0.8]} />
                <ShieldRing radius={2.5} speed={0.02} color="#0044ff" dashArgs={[0.1, 0.9]} />

                <FloatingParticles />

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};
