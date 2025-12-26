'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FacilityPoints() {
  const ref = useRef<THREE.Points>(null!)
  
  // Generate points in a stylized facility shape (cuboids/pipes)
  const count = 5000
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    // Random points within a bounded box to simulate infrastructure
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.1
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D60000"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

const PointCloudFacility: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 35 }}>
        <FacilityPoints />
      </Canvas>
    </div>
  )
}

export default PointCloudFacility
