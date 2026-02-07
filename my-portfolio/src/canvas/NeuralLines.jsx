import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * NeuralLines - Connections between nearby stars with traveling pulse
 * Enhanced with mouse velocity reactivity and initial animation
 */
export default function NeuralLines({ starData, mouseRef, initAnimRef }) {
  const linesRef = useRef();
  const velocityBoostRef = useRef(0);

  // Calculate connections between nearby stars
  const { linePositions, connections } = useMemo(() => {
    const positions = starData.positions;
    const count = starData.count;
    const maxDistance = 4; // Reduced distance for fewer connections
    const linePoints = [];
    const conns = [];

    for (let i = 0; i < count; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      for (let j = i + 1; j < count; j++) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance && conns.length < 100) { // Reduced max connections
          linePoints.push(x1, y1, z1, x2, y2, z2);
          conns.push({
            start: { x: x1, y: y1, z: z1 },
            end: { x: x2, y: y2, z: z2 },
            distance: dist,
            pulseProgress: Math.random(),
            pulseSpeed: 0.12 + Math.random() * 0.08, // Slightly slower pulses
            pulseActive: Math.random() > 0.6, // Fewer active pulses
            basePulseSpeed: 0.12 + Math.random() * 0.08,
          });
        }
      }
    }

    return {
      linePositions: new Float32Array(linePoints),
      connections: conns,
    };
  }, [starData]);

  // Line opacity buffer - lower base opacity for subtlety
  const lineOpacity = useMemo(() => {
    return new Float32Array(connections.length * 2).fill(0.12);
  }, [connections]);

  // Create line geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute('opacity', new THREE.BufferAttribute(lineOpacity, 1));
    return geo;
  }, [linePositions, lineOpacity]);

  // Custom shader for lines with variable opacity - brighter color
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float opacity;
        varying float vOpacity;

        void main() {
          vOpacity = opacity;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vOpacity;

        void main() {
          // Brighter gray for more visibility
          gl_FragColor = vec4(0.5, 0.5, 0.5, vOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, []);

  // Update line visibility based on mouse and animate pulses
  useFrame((state, delta) => {
    if (!linesRef.current || !mouseRef.current) return;

    const mouseWorld = mouseRef.current;
    const opacityAttr = linesRef.current.geometry.attributes.opacity;
    const velocity = mouseWorld.velocity || 0;
    const avgVelocity = mouseWorld.avgVelocity || 0;
    const isShaking = mouseWorld.isShaking || false;

    // Get initial animation state
    const initAnim = initAnimRef?.current || { lineProgress: 1, isInitializing: false, elapsed: 10 };
    const { lineProgress, isInitializing, elapsed } = initAnim;

    // Smooth velocity boost tracking
    const targetVelocityBoost = Math.min(avgVelocity * 0.5, 1);
    velocityBoostRef.current += (targetVelocityBoost - velocityBoostRef.current) * 0.1;
    const velocityBoost = velocityBoostRef.current;

    // Interaction radius expands with velocity
    const interactionRadius = 6 + velocityBoost * 4;

    connections.forEach((conn, i) => {
      // Calculate midpoint of line
      const midX = (conn.start.x + conn.end.x) / 2;
      const midY = (conn.start.y + conn.end.y) / 2;

      // Normalize Y position for wave animation (-10 to 10 -> 0 to 1)
      const normalizedY = (midY + 10) / 20;

      // Initial animation: lines light up from bottom to top
      let initOpacity = 0;
      if (isInitializing) {
        // Wave sweeps from bottom to top
        const wavePosition = lineProgress * 1.5 - 0.25;
        const distFromWave = normalizedY - wavePosition;

        if (distFromWave < 0) {
          // Line is below wave - lit
          initOpacity = 0.2;
        } else if (distFromWave < 0.3) {
          // Line is at wave front - bright pulse
          initOpacity = 0.5 * (1 - distFromWave / 0.3);
        }

        // Add continuous upward pulse effect after initial wave
        if (elapsed > 2.5) {
          const pulseY = ((elapsed - 2.5) * 0.4) % 1.5 - 0.25;
          const pulseDist = Math.abs(normalizedY - pulseY);
          if (pulseDist < 0.2) {
            initOpacity = Math.max(initOpacity, 0.6 * (1 - pulseDist / 0.2));
            // Trigger pulse animation on lines hit by the wave
            if (!conn.pulseActive && Math.random() < 0.3) {
              conn.pulseActive = true;
              conn.pulseProgress = 0;
            }
          }
        }
      }

      // Distance from mouse to line midpoint
      const dx = midX - mouseWorld.worldX;
      const dy = midY - mouseWorld.worldY;
      const distToMid = Math.sqrt(dx * dx + dy * dy);

      // Calculate distance to line segment (for more accurate hover detection)
      const lineVecX = conn.end.x - conn.start.x;
      const lineVecY = conn.end.y - conn.start.y;
      const lineLen = Math.sqrt(lineVecX * lineVecX + lineVecY * lineVecY);

      // Project mouse onto line
      const t = Math.max(0, Math.min(1,
        ((mouseWorld.worldX - conn.start.x) * lineVecX +
         (mouseWorld.worldY - conn.start.y) * lineVecY) / (lineLen * lineLen)
      ));
      const closestX = conn.start.x + t * lineVecX;
      const closestY = conn.start.y + t * lineVecY;
      const distToLine = Math.sqrt(
        (mouseWorld.worldX - closestX) ** 2 +
        (mouseWorld.worldY - closestY) ** 2
      );

      // Direct hover detection (very close to line)
      const hoverRadius = 1.2;
      const isHovered = distToLine < hoverRadius;

      // Base opacity - use init animation during initialization
      let baseOpacity = isInitializing ? initOpacity : 0.1;

      if (isHovered) {
        // Direct hover - line lights up brightly
        const hoverIntensity = 1 - (distToLine / hoverRadius);
        baseOpacity = 0.5 + hoverIntensity * 0.4;

        // Trigger pulse on hover
        if (!conn.pulseActive && Math.random() < 0.1) {
          conn.pulseActive = true;
          conn.pulseProgress = t;
        }
      } else if (distToMid < interactionRadius) {
        // Nearby - moderate brightness
        const proximityFactor = 1 - (distToMid / interactionRadius);
        baseOpacity = Math.max(baseOpacity, 0.12 + proximityFactor * 0.3 + velocityBoost * 0.2);

        // Extra brightness burst when shaking
        if (isShaking) {
          baseOpacity = Math.min(0.85, baseOpacity + 0.25);
        }
      }

      // During initialization, ensure init animation is visible
      if (isInitializing) {
        baseOpacity = Math.max(baseOpacity, initOpacity);
      }

      // Update opacity for both vertices
      opacityAttr.array[i * 2] = baseOpacity;
      opacityAttr.array[i * 2 + 1] = baseOpacity;

      // Animate pulse - speed increases with mouse velocity or when hovered
      const speedMultiplier = isHovered ? 2.5 : (1 + velocityBoost * 2);
      conn.pulseSpeed = conn.basePulseSpeed * speedMultiplier;

      if (conn.pulseActive) {
        conn.pulseProgress += delta * conn.pulseSpeed;
        if (conn.pulseProgress > 1) {
          conn.pulseProgress = 0;
          conn.pulseActive = Math.random() > 0.3;
        }
      } else {
        // Higher chance to start a pulse when mouse is moving fast
        const pulseChance = 0.003 + velocityBoost * 0.02;
        if (Math.random() < pulseChance) {
          conn.pulseActive = true;
          conn.pulseProgress = 0;
        }
      }
    });

    opacityAttr.needsUpdate = true;
  });

  // Create pulse particles
  const pulseGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(connections.length * 3);
    const sizes = new Float32Array(connections.length);
    const opacities = new Float32Array(connections.length);

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('pulseOpacity', new THREE.BufferAttribute(opacities, 1));

    return geo;
  }, [connections]);

  const pulseMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute float pulseOpacity;
        varying float vOpacity;

        void main() {
          vOpacity = pulseOpacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= vOpacity;

          // Brighter silver pulse
          gl_FragColor = vec4(0.7, 0.7, 0.7, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Animate pulse positions
  useFrame(() => {
    if (!mouseRef.current) return;

    const posAttr = pulseGeometry.attributes.position;
    const sizeAttr = pulseGeometry.attributes.size;
    const opacityAttr = pulseGeometry.attributes.pulseOpacity;
    const velocityBoost = velocityBoostRef.current;
    const mouseWorld = mouseRef.current;

    connections.forEach((conn, i) => {
      if (conn.pulseActive && conn.pulseProgress > 0) {
        // Interpolate position along the line
        const t = conn.pulseProgress;
        const x = conn.start.x + (conn.end.x - conn.start.x) * t;
        const y = conn.start.y + (conn.end.y - conn.start.y) * t;
        const z = conn.start.z + (conn.end.z - conn.start.z) * t;

        posAttr.array[i * 3] = x;
        posAttr.array[i * 3 + 1] = y;
        posAttr.array[i * 3 + 2] = z;

        // Check if pulse is near mouse
        const dx = x - mouseWorld.worldX;
        const dy = y - mouseWorld.worldY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distToMouse < 2;

        // Fade in/out at edges - brighter pulse with velocity boost or near mouse
        const fadeIn = Math.min(1, t * 5);
        const fadeOut = Math.min(1, (1 - t) * 5);
        const intensityBoost = isNearMouse ? 1.2 : (0.8 + velocityBoost * 0.4);
        opacityAttr.array[i] = fadeIn * fadeOut * intensityBoost;
        sizeAttr.array[i] = isNearMouse ? 4 : (2 + velocityBoost * 1.5);
      } else {
        opacityAttr.array[i] = 0;
        sizeAttr.array[i] = 0;
      }
    });

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    opacityAttr.needsUpdate = true;
  });

  return (
    <>
      <lineSegments ref={linesRef} geometry={geometry} material={material} />
      <points geometry={pulseGeometry} material={pulseMaterial} />
    </>
  );
}
