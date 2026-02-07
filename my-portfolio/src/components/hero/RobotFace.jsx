import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Stylized "Head" Geometry
const AICore = ({ isWaking }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle "breathing" rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial
          color="#000000"
          emissive="#000000"
          roughness={0.2}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* "Eyes" or Core Light */}
      <mesh position={[0, 0, 1.35]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#4A90E2"
          emissiveIntensity={isWaking ? 2 : 0}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Halo */}
      <pointLight position={[0, 0, 2]} intensity={isWaking ? 2 : 0} color="#64D2FF" distance={10} decay={2} />
    </group>
  );
};

const RobotFace = ({ onWakeComplete }) => {
  const groupRef = useRef();
  const [waking, setWaking] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setWaking(true), 500);
    const timer2 = setTimeout(() => {
      onWakeComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onWakeComplete]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Mouse look
    const { x, y } = state.mouse;
    // Interpolate rotation for smooth looking
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.3, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3, 0.1);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}> {/* Centered */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <AICore isWaking={waking} />
      </Float>
    </group>
  );
};

export default RobotFace;
