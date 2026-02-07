import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader for stars with mouse interaction, displacement, and size scaling
const starVertexShader = `
  attribute float size;
  attribute float brightness;
  attribute float sizeScale;
  attribute vec3 displacement;
  varying float vBrightness;

  void main() {
    vBrightness = brightness;
    vec3 pos = position + displacement;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * sizeScale * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying float vBrightness;

  void main() {
    // Create soft circular star
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Soft glow falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vBrightness;

    // Monochromatic gray color
    vec3 color = vec3(0.69); // #b0b0b0

    gl_FragColor = vec4(color, alpha * 0.8);
  }
`;

export default function Stars({ starData, mouseRef, initAnimRef }) {
  const pointsRef = useRef();
  const brightnessRef = useRef(new Float32Array(starData.count).fill(0));
  const sizeScaleRef = useRef(new Float32Array(starData.count).fill(1));
  const displacementRef = useRef(new Float32Array(starData.count * 3).fill(0));
  const originalPositions = useRef(new Float32Array(starData.positions));

  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(starData.positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(starData.sizes, 1));
    geo.setAttribute('brightness', new THREE.BufferAttribute(brightnessRef.current, 1));
    geo.setAttribute('sizeScale', new THREE.BufferAttribute(sizeScaleRef.current, 1));
    geo.setAttribute('displacement', new THREE.BufferAttribute(displacementRef.current, 3));
    return geo;
  }, [starData]);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Update brightness, size, and displacement based on mouse proximity and velocity
  useFrame((state, delta) => {
    if (!pointsRef.current || !mouseRef.current) return;

    const positions = originalPositions.current;
    const brightness = brightnessRef.current;
    const sizeScale = sizeScaleRef.current;
    const displacement = displacementRef.current;
    const mouseWorld = mouseRef.current;
    const velocity = mouseWorld.velocity || 0;
    const avgVelocity = mouseWorld.avgVelocity || 0;
    const isShaking = mouseWorld.isShaking || false;

    // Get initial animation state
    const initAnim = initAnimRef?.current || { waveProgress: 1, pulseWave: 0, isInitializing: false, elapsed: 10 };
    const { waveProgress, pulseWave, isInitializing, elapsed } = initAnim;

    // Calculate brightness and displacement for each star
    for (let i = 0; i < starData.count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      // Normalize Y position for wave animation (-10 to 10 -> 0 to 1)
      const normalizedY = (y + 10) / 20;

      // Initial animation: stars fade in from bottom to top
      let initBrightness = 0;
      if (isInitializing) {
        // Wave sweeps from bottom (y=-10) to top (y=10)
        const wavePosition = waveProgress * 1.5 - 0.25; // Offset for smoother start
        const distFromWave = normalizedY - wavePosition;

        if (distFromWave < 0) {
          // Star is below wave - fully lit
          initBrightness = 0.6;
        } else if (distFromWave < 0.3) {
          // Star is at wave front - bright pulse
          initBrightness = 0.8 * (1 - distFromWave / 0.3);
        }

        // Add upward pulse effect after initial wave
        if (elapsed > 2) {
          const pulseY = ((elapsed - 2) * 0.5) % 1.5 - 0.25;
          const pulseDist = Math.abs(normalizedY - pulseY);
          if (pulseDist < 0.15) {
            initBrightness = Math.max(initBrightness, 0.9 * (1 - pulseDist / 0.15));
          }
        }
      }

      // Distance to mouse in world space
      const dx = x - mouseWorld.worldX;
      const dy = y - mouseWorld.worldY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Hover detection - very close to mouse (direct hover)
      const hoverRadius = 1.5;
      const isHovered = dist < hoverRadius;

      // Interaction radius expands with velocity
      const interactionRadius = 4 + avgVelocity * 2;

      // Brightness and size: more intense when hovered or mouse moves fast
      let targetBrightness;
      let targetSizeScale;

      if (isHovered) {
        targetBrightness = 1.0;
        targetSizeScale = 2.0 + (1 - dist / hoverRadius) * 1.5;
      } else if (dist < interactionRadius) {
        const proximityFactor = 1 - (dist / interactionRadius);
        targetBrightness = 0.5 + proximityFactor * 0.4 + Math.min(velocity * 0.3, 0.4);
        targetSizeScale = 1.0 + proximityFactor * 0.8;

        if (isShaking) {
          targetBrightness = Math.min(1.0, targetBrightness + 0.3);
          targetSizeScale += 0.5;
        }
      } else {
        // Use init animation brightness during initialization, otherwise base brightness
        targetBrightness = isInitializing ? initBrightness : (0.25 + Math.random() * 0.08);
        targetSizeScale = 1.0;
      }

      // During initialization, boost brightness with init animation
      if (isInitializing) {
        targetBrightness = Math.max(targetBrightness, initBrightness);
      }

      // Smooth interpolation for brightness and size
      brightness[i] += (targetBrightness - brightness[i]) * 0.15;
      sizeScale[i] += (targetSizeScale - sizeScale[i]) * 0.12;

      // Displacement: stars repel from fast-moving mouse or when hovered
      const repelRadius = 4 + velocity * 3;
      if ((dist < repelRadius && velocity > 0.1) || isHovered) {
        const repelStrength = isHovered
          ? (1 - dist / hoverRadius) * 0.8
          : (1 - dist / repelRadius) * Math.min(velocity * 0.8, 1.5);
        const normDx = dx / (dist || 1);
        const normDy = dy / (dist || 1);

        const targetDx = normDx * repelStrength;
        const targetDy = normDy * repelStrength;
        const targetDz = Math.sin(state.clock.elapsedTime * 3 + i) * repelStrength * 0.3;

        displacement[i * 3] += (targetDx - displacement[i * 3]) * 0.12;
        displacement[i * 3 + 1] += (targetDy - displacement[i * 3 + 1]) * 0.12;
        displacement[i * 3 + 2] += (targetDz - displacement[i * 3 + 2]) * 0.12;
      } else {
        // Return to original position with spring-like motion
        displacement[i * 3] *= 0.92;
        displacement[i * 3 + 1] *= 0.92;
        displacement[i * 3 + 2] *= 0.92;
      }
    }

    // Update the attributes
    pointsRef.current.geometry.attributes.brightness.needsUpdate = true;
    pointsRef.current.geometry.attributes.sizeScale.needsUpdate = true;
    pointsRef.current.geometry.attributes.displacement.needsUpdate = true;
  });

  // Subtle twinkle animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const brightness = brightnessRef.current;

    for (let i = 0; i < starData.count; i++) {
      const baseVariation = Math.sin(time * 0.5 + i * 0.3) * 0.05;
      brightness[i] = Math.max(0.15, Math.min(1.0, brightness[i] + baseVariation * 0.01));
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
}
