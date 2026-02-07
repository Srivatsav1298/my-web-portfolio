import React, { forwardRef, Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import OptimusRobot from './models/OptimusRobot';
import * as THREE from 'three';

// Dynamic lighting component that responds to isBright
const DynamicLights = ({ isBright }) => {
  const keyLightRef = useRef();
  const rimLightRef = useRef();
  const fillLightRef = useRef();

  useFrame(() => {
    if (!keyLightRef.current || !rimLightRef.current) return;

    // Smoothly interpolate light intensity
    const targetKeyIntensity = isBright ? 2.0 : 0.8;
    const targetRimIntensity = isBright ? 2.5 : 1.0;
    const targetFillIntensity = isBright ? 0.8 : 0.3;

    keyLightRef.current.intensity = THREE.MathUtils.lerp(
      keyLightRef.current.intensity,
      targetKeyIntensity,
      0.05
    );
    rimLightRef.current.intensity = THREE.MathUtils.lerp(
      rimLightRef.current.intensity,
      targetRimIntensity,
      0.05
    );
    fillLightRef.current.intensity = THREE.MathUtils.lerp(
      fillLightRef.current.intensity,
      targetFillIntensity,
      0.05
    );
  });

  return (
    <>
      {/* Ambient - very subtle */}
      <ambientLight intensity={0.1} />

      {/* Key light - main illumination */}
      <directionalLight
        ref={keyLightRef}
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill light - softer from left */}
      <directionalLight
        ref={fillLightRef}
        position={[-4, 3, 2]}
        intensity={0.3}
        color="#a0c4ff"
      />

      {/* Rim light - dramatic cyan backlight */}
      <spotLight
        ref={rimLightRef}
        position={[-3, 4, -3]}
        angle={0.5}
        penumbra={1}
        intensity={1.0}
        color="#00d4ff"
      />

      {/* Bottom fill */}
      <pointLight
        position={[0, -2, 2]}
        intensity={0.15}
        color="#ffffff"
      />
    </>
  );
};

const HeroCanvas = forwardRef(({ isWaving = false, isBright = false }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`hero-canvas ${isBright ? 'hero-canvas--bright' : ''}`}
    >
      <Canvas
        camera={{
          position: [0, 0.3, 4.2],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        shadows
      >
        <DynamicLights isBright={isBright} />

        <Suspense fallback={null}>
          <OptimusRobot
            isWaving={isWaving}
            mousePosition={mousePosition}
          />
          <Environment preset="night" />
        </Suspense>

        {/* Ground shadow */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2.8, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
});

HeroCanvas.displayName = 'HeroCanvas';

export default HeroCanvas;
