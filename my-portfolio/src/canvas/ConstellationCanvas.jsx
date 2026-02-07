import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Stars from './Stars';
import NeuralLines from './NeuralLines';

/**
 * Scroll Beacon - Glowing orb that rises upward to prompt scrolling
 */
function ScrollBeacon({ initAnimRef }) {
  const beaconRef = useRef();
  const glowRef = useRef();
  const ringsRef = useRef([]);

  // Create beacon geometry
  const beaconGeometry = useMemo(() => new THREE.SphereGeometry(0.15, 32, 32), []);
  const glowGeometry = useMemo(() => new THREE.SphereGeometry(0.4, 32, 32), []);
  const ringGeometry = useMemo(() => new THREE.RingGeometry(0.3, 0.35, 32), []);

  // Beacon material - bright core
  const beaconMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.9, 0.9, 0.9),
    transparent: true,
    opacity: 0.9,
  }), []);

  // Glow material
  const glowMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      opacity: { value: 0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float opacity;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        float pulse = 0.5 + 0.5 * sin(time * 3.0);
        vec3 color = vec3(0.7, 0.7, 0.75);
        gl_FragColor = vec4(color, intensity * opacity * (0.6 + pulse * 0.4));
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  // Ring material
  const ringMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0.6, 0.6, 0.65),
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
  }), []);

  useFrame((state) => {
    const elapsed = initAnimRef.current?.elapsed || 0;
    const time = state.clock.elapsedTime;

    // Beacon appears after initial wave (2.5s)
    const beaconOpacity = Math.min(Math.max((elapsed - 2.5) / 1, 0), 1);

    // Hide beacon once user starts scrolling
    const scrollFade = Math.max(0, 1 - window.scrollY / 200);
    const finalOpacity = beaconOpacity * scrollFade;

    if (beaconRef.current) {
      // Rising motion - beacon floats upward
      const riseOffset = Math.sin(time * 0.8) * 0.3;
      const baseY = -6 + (elapsed - 2.5) * 0.5; // Rises from bottom
      beaconRef.current.position.y = Math.min(baseY + riseOffset, -4);
      beaconRef.current.material.opacity = finalOpacity * 0.9;
    }

    if (glowRef.current) {
      glowRef.current.position.copy(beaconRef.current.position);
      glowRef.current.material.uniforms.time.value = time;
      glowRef.current.material.uniforms.opacity.value = finalOpacity;

      // Pulsing scale
      const scale = 1 + Math.sin(time * 2) * 0.2;
      glowRef.current.scale.setScalar(scale);
    }

    // Animate rings expanding upward
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        const ringPhase = (time * 1.5 + i * 0.5) % 2;
        const ringY = beaconRef.current.position.y + ringPhase * 2;
        ring.position.y = ringY;
        ring.position.x = beaconRef.current.position.x;
        ring.position.z = beaconRef.current.position.z;

        const ringScale = 1 + ringPhase * 1.5;
        ring.scale.setScalar(ringScale);

        // Fade out as ring expands
        ring.material.opacity = finalOpacity * Math.max(0, 1 - ringPhase / 2) * 0.5;
      }
    });
  });

  return (
    <group>
      {/* Core beacon */}
      <mesh ref={beaconRef} geometry={beaconGeometry} material={beaconMaterial} position={[0, -6, 0]} />

      {/* Outer glow */}
      <mesh ref={glowRef} geometry={glowGeometry} material={glowMaterial} position={[0, -6, 0]} />

      {/* Rising rings */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          geometry={ringGeometry}
          material={ringMaterial.clone()}
          position={[0, -6, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      ))}
    </group>
  );
}

/**
 * Energy Lines - Neural connections that flow upward toward scroll indicator
 */
function EnergyLines({ initAnimRef }) {
  const linesRef = useRef();
  const particlesRef = useRef();

  // Create flowing line paths
  const { linePositions, particleCount } = useMemo(() => {
    const positions = [];
    const numLines = 5;
    const pointsPerLine = 20;

    for (let l = 0; l < numLines; l++) {
      const startX = (Math.random() - 0.5) * 16;
      const startY = -10;

      for (let p = 0; p < pointsPerLine - 1; p++) {
        const t1 = p / pointsPerLine;
        const t2 = (p + 1) / pointsPerLine;

        // Curved path converging toward center-top
        const x1 = startX * (1 - t1 * 0.8) + Math.sin(t1 * Math.PI * 2) * 0.5;
        const y1 = startY + t1 * 8;
        const z1 = Math.sin(t1 * Math.PI) * 2 - 5;

        const x2 = startX * (1 - t2 * 0.8) + Math.sin(t2 * Math.PI * 2) * 0.5;
        const y2 = startY + t2 * 8;
        const z2 = Math.sin(t2 * Math.PI) * 2 - 5;

        positions.push(x1, y1, z1, x2, y2, z2);
      }
    }

    return {
      linePositions: new Float32Array(positions),
      particleCount: numLines * 3,
    };
  }, []);

  // Line geometry
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  // Line material with gradient
  const lineMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      opacity: { value: 0 },
    },
    vertexShader: `
      varying float vY;
      void main() {
        vY = position.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float opacity;
      varying float vY;
      void main() {
        float normalizedY = (vY + 10.0) / 18.0;
        float wave = sin(normalizedY * 6.28 - time * 3.0) * 0.5 + 0.5;
        float alpha = wave * normalizedY * opacity * 0.3;
        gl_FragColor = vec4(0.5, 0.5, 0.55, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  // Particle geometry for flowing dots
  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = -10 + Math.random() * 2;
      positions[i * 3 + 2] = -5;
      sizes[i] = Math.random() * 2 + 1;
      phases[i] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    return geo;
  }, [particleCount]);

  // Particle material
  const particleMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      opacity: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      attribute float phase;
      uniform float time;
      varying float vAlpha;

      void main() {
        float t = fract(time * 0.3 + phase);
        vec3 pos = position;

        // Rise upward
        pos.y = -10.0 + t * 12.0;
        // Converge toward center
        pos.x *= (1.0 - t * 0.7);

        vAlpha = sin(t * 3.14159) * (1.0 - t * 0.5);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (200.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float opacity;
      varying float vAlpha;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = (1.0 - dist * 2.0) * vAlpha * opacity;
        gl_FragColor = vec4(0.7, 0.7, 0.75, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state) => {
    const elapsed = initAnimRef.current?.elapsed || 0;
    const time = state.clock.elapsedTime;

    // Show energy lines after initial wave
    const lineOpacity = Math.min(Math.max((elapsed - 2) / 1.5, 0), 1);
    const scrollFade = Math.max(0, 1 - window.scrollY / 300);
    const finalOpacity = lineOpacity * scrollFade;

    if (linesRef.current) {
      linesRef.current.material.uniforms.time.value = time;
      linesRef.current.material.uniforms.opacity.value = finalOpacity;
    }

    if (particlesRef.current) {
      particlesRef.current.material.uniforms.time.value = time;
      particlesRef.current.material.uniforms.opacity.value = finalOpacity;
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
      <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
    </group>
  );
}

/**
 * Mouse tracker component for Three.js scene with velocity tracking
 */
function MouseTracker({ mouseRef }) {
  const { camera, size } = useThree();
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const velocityHistory = useRef([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastPos.current.time);

      const x = (event.clientX / size.width) * 2 - 1;
      const y = -(event.clientY / size.height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);

      const worldX = vector.x * 10;
      const worldY = vector.y * 10;

      // Calculate velocity
      const dx = worldX - (mouseRef.current?.worldX || 0);
      const dy = worldY - (mouseRef.current?.worldY || 0);
      const speed = Math.sqrt(dx * dx + dy * dy) / (dt / 16.67);

      velocityHistory.current.push({ speed, time: now });
      velocityHistory.current = velocityHistory.current.filter(v => now - v.time < 500);

      const avgVelocity = velocityHistory.current.reduce((sum, v) => sum + v.speed, 0) /
        Math.max(1, velocityHistory.current.length);

      const isShaking = velocityHistory.current.length > 3 && avgVelocity > 0.5;

      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        worldX,
        worldY,
        velocity: speed,
        avgVelocity,
        isShaking,
        directionX: dx,
        directionY: dy,
      };

      lastPos.current = { x: worldX, y: worldY, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, size, mouseRef]);

  useFrame(() => {
    if (mouseRef.current && mouseRef.current.velocity > 0) {
      mouseRef.current.velocity *= 0.95;
      mouseRef.current.avgVelocity *= 0.98;
      if (mouseRef.current.velocity < 0.01) {
        mouseRef.current.velocity = 0;
        mouseRef.current.isShaking = false;
      }
    }
  });

  return null;
}

/**
 * Scroll parallax handler
 */
function ScrollHandler({ starsRef, scrollRef }) {
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  useFrame(() => {
    if (starsRef.current) {
      const parallaxY = scrollRef.current * 0.0003;
      starsRef.current.rotation.y = parallaxY;
      starsRef.current.position.y = -scrollRef.current * 0.001;
    }
  });

  return null;
}

/**
 * Initial animation controller - creates "neural network starting" effect
 */
function InitialAnimation({ initAnimRef }) {
  const startTime = useRef(Date.now());

  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000;

    // Animation phases:
    // 0-2s: Stars fade in from bottom to top (wave)
    // 2-4s: Lines connect progressively
    // 4s+: Continuous subtle pulse suggesting scroll

    const waveProgress = Math.min(elapsed / 2, 1); // 0 to 1 over 2 seconds
    const lineProgress = Math.min(Math.max((elapsed - 1) / 2, 0), 1); // 0 to 1 from 1s to 3s
    const pulsePhase = elapsed > 3 ? (elapsed - 3) : 0;

    // Upward pulse wave to suggest scrolling
    const pulseWave = Math.sin(pulsePhase * 1.5) * 0.5 + 0.5;

    initAnimRef.current = {
      waveProgress,
      lineProgress,
      pulsePhase,
      pulseWave,
      isInitializing: elapsed < 4,
      elapsed,
    };
  });

  return null;
}

/**
 * Main constellation scene
 */
function ConstellationScene() {
  const starsRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0, worldX: 0, worldY: 0, velocity: 0, avgVelocity: 0, isShaking: false, directionX: 0, directionY: 0 });
  const scrollRef = useRef(0);
  const initAnimRef = useRef({ waveProgress: 0, lineProgress: 0, pulsePhase: 0, pulseWave: 0, isInitializing: true, elapsed: 0 });

  // Generate star positions (reduced for less distraction)
  const starData = useMemo(() => {
    const count = 80;
    const positions = [];
    const sizes = [];
    const depths = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 15 - 5;

      positions.push(x, y, z);
      sizes.push(Math.random() * 1.5 + 0.3);
      depths.push(Math.abs(z) / 10);
    }

    return {
      positions: new Float32Array(positions),
      sizes: new Float32Array(sizes),
      depths: new Float32Array(depths),
      count,
    };
  }, []);

  return (
    <>
      <MouseTracker mouseRef={mouseRef} />
      <ScrollHandler starsRef={starsRef} scrollRef={scrollRef} />
      <InitialAnimation initAnimRef={initAnimRef} />

      {/* Scroll trigger elements */}
      <ScrollBeacon initAnimRef={initAnimRef} />
      <EnergyLines initAnimRef={initAnimRef} />

      <group ref={starsRef}>
        <Stars starData={starData} mouseRef={mouseRef} initAnimRef={initAnimRef} />
        <NeuralLines starData={starData} mouseRef={mouseRef} initAnimRef={initAnimRef} />
      </group>
    </>
  );
}

/**
 * Main ConstellationCanvas component
 */
export default function ConstellationCanvas() {
  const [isDark, setIsDark] = useState(true);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(!document.documentElement.classList.contains('light-mode'));
    };

    checkTheme();

    // Watch for class changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const darkBackground = `
    radial-gradient(
      ellipse 80% 50% at 50% 0%,
      #1a1a1a 0%,
      #0d0d0d 40%,
      #050505 70%,
      #000000 100%
    )
  `;

  const lightBackground = `
    radial-gradient(
      ellipse 80% 50% at 50% 0%,
      #ffffff 0%,
      #f5f5f5 40%,
      #e8e8e8 70%,
      #e0e0e0 100%
    )
  `;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        transition: 'background 0.5s ease',
      }}
    >
      {/* Dynamic gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark ? darkBackground : lightBackground,
          transition: 'background 0.5s ease',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        style={{ position: 'relative' }}
      >
        <ConstellationScene />
      </Canvas>
    </div>
  );
}
