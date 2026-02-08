/**
 * SkillNode Component
 * Single skill node in the 3D network visualization
 */

import React, { useRef, useState, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { categoryColors } from './skillsConfig';

function SkillNodeBase({ node, isHovered, isConnected, onHover, onLeave, selectedCategory }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hoverScale, setHoverScale] = useState(1);

  const color = categoryColors[node.category];
  const isDimmed = selectedCategory && selectedCategory !== node.category;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Floating animation
    if (meshRef.current) {
      meshRef.current.position.y = node.y + Math.sin(time * 0.5 + node.x) * 0.08;
    }

    // Scale animation on hover
    const targetScale = isHovered ? 1.5 : isConnected ? 1.2 : 1;
    setHoverScale((prev) => prev + (targetScale - prev) * 0.15);

    // Glow pulse
    if (glowRef.current) {
      const intensity = isHovered ? 0.9 : isConnected ? 0.6 : 0.35;
      const dimFactor = isDimmed ? 0.3 : 1;
      glowRef.current.material.opacity = (intensity + Math.sin(time * 2) * 0.1) * dimFactor;
    }
  });

  return (
    <group position={[node.x, node.y, 0]}>
      {/* Glow */}
      <mesh ref={glowRef} scale={node.size * hoverScale * 1.8}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDimmed ? 0.1 : 0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Core node */}
      <mesh
        ref={meshRef}
        scale={node.size * hoverScale}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          onHover(node.id);
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default';
          onLeave();
        }}
      >
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDimmed ? 0.3 : 1}
        />
      </mesh>

      {/* Label - always visible */}
      <Html
        position={[0, node.size * 0.5 + 0.3, 0]}
        center
        style={{
          opacity: isDimmed ? 0.3 : (isHovered ? 1 : 0.85),
          transform: `scale(${isHovered ? 1.15 : 1})`,
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        <div className={`skill-node__label ${isHovered ? 'skill-node__label--active' : ''}`}>
          {node.label}
        </div>
      </Html>
    </group>
  );
}

// Memoize to prevent unnecessary re-renders
const SkillNode = memo(SkillNodeBase);

export default SkillNode;
