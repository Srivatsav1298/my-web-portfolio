import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { Suspense } from "react";

export default function CanvasRoot() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#050607"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />

      <Suspense fallback={null}>
        <Float speed={0.4} rotationIntensity={0.3}>
          <Stars
            radius={40}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
          />
        </Float>
      </Suspense>
    </Canvas>
  );
}
