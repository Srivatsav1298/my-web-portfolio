import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// High-detail Tesla Optimus-inspired humanoid robot
const OptimusRobot = ({ isWaving = false, mousePosition = { x: 0, y: 0 } }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const rightShoulderRef = useRef();
  const rightElbowRef = useRef();
  const leftShoulderRef = useRef();
  const chestLightRef = useRef();
  const visorRef = useRef();

  // Premium materials
  const materials = useMemo(() => ({
    // Main body - dark titanium
    bodyDark: new THREE.MeshStandardMaterial({
      color: '#0a0a0a',
      metalness: 0.95,
      roughness: 0.15,
    }),
    // Secondary body - lighter panels
    bodyLight: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      metalness: 0.9,
      roughness: 0.2,
    }),
    // Accent panels - subtle silver
    accent: new THREE.MeshStandardMaterial({
      color: '#2a2a2a',
      metalness: 0.85,
      roughness: 0.25,
    }),
    // Joint material - darker
    joint: new THREE.MeshStandardMaterial({
      color: '#050505',
      metalness: 0.98,
      roughness: 0.1,
    }),
    // Visor - glowing blue
    visor: new THREE.MeshStandardMaterial({
      color: '#00d4ff',
      emissive: '#00d4ff',
      emissiveIntensity: 0.8,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95,
    }),
    // Chest arc reactor
    arcReactor: new THREE.MeshBasicMaterial({
      color: '#00d4ff',
      transparent: true,
      opacity: 0.9,
    }),
    // Inner glow
    innerGlow: new THREE.MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.6,
    }),
  }), []);

  // Animation loop
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Subtle breathing motion
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.02 - 1.2;

    // Head tracking (follows mouse subtly)
    if (headRef.current) {
      const targetRotY = mousePosition.x * 0.3;
      const targetRotX = mousePosition.y * 0.15;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, 0.05);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, 0.05);
    }

    // Wave animation
    if (isWaving && rightShoulderRef.current && rightElbowRef.current) {
      // Raise arm
      rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.z,
        -Math.PI / 2.5,
        0.08
      );
      rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(
        rightShoulderRef.current.rotation.x,
        -0.3,
        0.08
      );
      // Wave motion at elbow
      rightElbowRef.current.rotation.x = Math.sin(time * 5) * 0.4 - 0.5;
    } else if (rightShoulderRef.current && rightElbowRef.current) {
      // Return to idle
      rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.z, 0.1, 0.05);
      rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.x, 0, 0.05);
      rightElbowRef.current.rotation.x = THREE.MathUtils.lerp(rightElbowRef.current.rotation.x, 0, 0.05);
    }

    // Visor glow pulsing
    if (visorRef.current) {
      materials.visor.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.3;
    }

    // Arc reactor pulsing
    if (chestLightRef.current) {
      chestLightRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={1.1}>
      {/* ==================== TORSO ==================== */}
      <group position={[0, 0.5, 0]}>
        {/* Main chest */}
        <mesh material={materials.bodyDark}>
          <boxGeometry args={[0.95, 1.3, 0.45]} />
        </mesh>

        {/* Chest plate detail */}
        <mesh material={materials.bodyLight} position={[0, 0.15, 0.23]}>
          <boxGeometry args={[0.7, 0.8, 0.02]} />
        </mesh>

        {/* Side panels */}
        <mesh material={materials.accent} position={[-0.4, 0, 0.1]}>
          <boxGeometry args={[0.12, 1.1, 0.3]} />
        </mesh>
        <mesh material={materials.accent} position={[0.4, 0, 0.1]}>
          <boxGeometry args={[0.12, 1.1, 0.3]} />
        </mesh>

        {/* Arc reactor / chest light */}
        <group ref={chestLightRef} position={[0, 0.1, 0.24]}>
          <mesh material={materials.arcReactor}>
            <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          <mesh material={materials.innerGlow} position={[0, 0, 0.01]}>
            <circleGeometry args={[0.08, 32]} />
          </mesh>
          <pointLight color="#00d4ff" intensity={0.5} distance={2} />
        </group>

        {/* Collar / neck base */}
        <mesh material={materials.joint} position={[0, 0.7, 0]}>
          <boxGeometry args={[0.35, 0.15, 0.25]} />
        </mesh>
      </group>

      {/* ==================== PELVIS ==================== */}
      <mesh material={materials.bodyDark} position={[0, -0.2, 0]}>
        <boxGeometry args={[0.75, 0.35, 0.35]} />
      </mesh>

      {/* ==================== HEAD ==================== */}
      <group ref={headRef} position={[0, 1.45, 0]}>
        {/* Main head structure */}
        <mesh material={materials.bodyDark}>
          <boxGeometry args={[0.42, 0.48, 0.4]} />
        </mesh>

        {/* Face plate */}
        <mesh material={materials.bodyLight} position={[0, -0.02, 0.21]}>
          <boxGeometry args={[0.35, 0.38, 0.02]} />
        </mesh>

        {/* Visor / eyes - single strip like Optimus */}
        <mesh ref={visorRef} material={materials.visor} position={[0, 0.06, 0.22]}>
          <boxGeometry args={[0.28, 0.06, 0.02]} />
        </mesh>

        {/* Visor glow light */}
        <pointLight position={[0, 0.06, 0.3]} color="#00d4ff" intensity={0.3} distance={1.5} />

        {/* Head top detail */}
        <mesh material={materials.accent} position={[0, 0.22, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
        </mesh>

        {/* Side head panels */}
        <mesh material={materials.joint} position={[-0.19, 0, 0.05]}>
          <boxGeometry args={[0.06, 0.35, 0.25]} />
        </mesh>
        <mesh material={materials.joint} position={[0.19, 0, 0.05]}>
          <boxGeometry args={[0.06, 0.35, 0.25]} />
        </mesh>

        {/* Chin */}
        <mesh material={materials.bodyLight} position={[0, -0.18, 0.12]}>
          <boxGeometry args={[0.2, 0.1, 0.18]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh material={materials.joint} position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 12]} />
      </mesh>

      {/* ==================== LEFT ARM ==================== */}
      <group ref={leftShoulderRef} position={[-0.58, 0.7, 0]}>
        {/* Shoulder sphere */}
        <mesh material={materials.joint}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>

        {/* Shoulder armor */}
        <mesh material={materials.bodyDark} position={[-0.08, 0.02, 0]}>
          <boxGeometry args={[0.18, 0.2, 0.18]} />
        </mesh>

        {/* Upper arm */}
        <mesh material={materials.bodyLight} position={[-0.12, -0.32, 0]}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
        </mesh>

        {/* Elbow */}
        <group position={[-0.12, -0.6, 0]}>
          <mesh material={materials.joint}>
            <sphereGeometry args={[0.08, 12, 12]} />
          </mesh>

          {/* Forearm */}
          <mesh material={materials.bodyDark} position={[0, -0.3, 0]}>
            <boxGeometry args={[0.12, 0.45, 0.12]} />
          </mesh>

          {/* Wrist */}
          <mesh material={materials.joint} position={[0, -0.55, 0]}>
            <boxGeometry args={[0.08, 0.06, 0.08]} />
          </mesh>

          {/* Hand */}
          <mesh material={materials.bodyLight} position={[0, -0.65, 0]}>
            <boxGeometry args={[0.1, 0.14, 0.06]} />
          </mesh>
        </group>
      </group>

      {/* ==================== RIGHT ARM (waving) ==================== */}
      <group ref={rightShoulderRef} position={[0.58, 0.7, 0]}>
        {/* Shoulder sphere */}
        <mesh material={materials.joint}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>

        {/* Shoulder armor */}
        <mesh material={materials.bodyDark} position={[0.08, 0.02, 0]}>
          <boxGeometry args={[0.18, 0.2, 0.18]} />
        </mesh>

        {/* Upper arm */}
        <mesh material={materials.bodyLight} position={[0.12, -0.32, 0]}>
          <boxGeometry args={[0.14, 0.5, 0.14]} />
        </mesh>

        {/* Elbow group */}
        <group ref={rightElbowRef} position={[0.12, -0.6, 0]}>
          <mesh material={materials.joint}>
            <sphereGeometry args={[0.08, 12, 12]} />
          </mesh>

          {/* Forearm */}
          <mesh material={materials.bodyDark} position={[0, -0.3, 0]}>
            <boxGeometry args={[0.12, 0.45, 0.12]} />
          </mesh>

          {/* Wrist */}
          <mesh material={materials.joint} position={[0, -0.55, 0]}>
            <boxGeometry args={[0.08, 0.06, 0.08]} />
          </mesh>

          {/* Hand */}
          <group position={[0, -0.65, 0]}>
            <mesh material={materials.bodyLight}>
              <boxGeometry args={[0.1, 0.12, 0.06]} />
            </mesh>
            {/* Fingers */}
            <mesh material={materials.joint} position={[0, -0.08, 0]}>
              <boxGeometry args={[0.08, 0.06, 0.05]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ==================== LEFT LEG ==================== */}
      <group position={[-0.22, -0.45, 0]}>
        {/* Hip */}
        <mesh material={materials.joint}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>

        {/* Thigh */}
        <mesh material={materials.bodyDark} position={[0, -0.38, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.18]} />
        </mesh>

        {/* Knee */}
        <mesh material={materials.joint} position={[0, -0.72, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>

        {/* Shin */}
        <mesh material={materials.bodyLight} position={[0, -1.1, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
        </mesh>

        {/* Ankle */}
        <mesh material={materials.joint} position={[0, -1.45, 0]}>
          <boxGeometry args={[0.1, 0.08, 0.1]} />
        </mesh>

        {/* Foot */}
        <mesh material={materials.bodyDark} position={[0, -1.55, 0.06]}>
          <boxGeometry args={[0.16, 0.1, 0.3]} />
        </mesh>
      </group>

      {/* ==================== RIGHT LEG ==================== */}
      <group position={[0.22, -0.45, 0]}>
        {/* Hip */}
        <mesh material={materials.joint}>
          <sphereGeometry args={[0.1, 12, 12]} />
        </mesh>

        {/* Thigh */}
        <mesh material={materials.bodyDark} position={[0, -0.38, 0]}>
          <boxGeometry args={[0.18, 0.6, 0.18]} />
        </mesh>

        {/* Knee */}
        <mesh material={materials.joint} position={[0, -0.72, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>

        {/* Shin */}
        <mesh material={materials.bodyLight} position={[0, -1.1, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
        </mesh>

        {/* Ankle */}
        <mesh material={materials.joint} position={[0, -1.45, 0]}>
          <boxGeometry args={[0.1, 0.08, 0.1]} />
        </mesh>

        {/* Foot */}
        <mesh material={materials.bodyDark} position={[0, -1.55, 0.06]}>
          <boxGeometry args={[0.16, 0.1, 0.3]} />
        </mesh>
      </group>
    </group>
  );
};

export default OptimusRobot;
