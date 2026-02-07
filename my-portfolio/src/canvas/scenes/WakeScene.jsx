import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function WakeScene() {
  const eyeRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (eyeRef.current) {
      eyeRef.current.rotation.y = t * 0.15;
      eyeRef.current.material.emissiveIntensity =
        0.15 + Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <>
      {/* Ambient void */}
      <ambientLight intensity={0.25} />

      {/* Cold key light */}
      <directionalLight
        position={[4, 4, 6]}
        intensity={1.2}
        color="#c7ccd6"
      />

      {/* AI Eye Core */}
      <mesh ref={eyeRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshStandardMaterial
          color="#9da3ad"
          metalness={0.9}
          roughness={0.18}
          emissive="#0b0f14"
        />
      </mesh>
    </>
  );
}
