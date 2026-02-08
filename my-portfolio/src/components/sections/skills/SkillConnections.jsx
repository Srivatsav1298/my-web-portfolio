/**
 * SkillConnections Component
 * Connections between skill nodes in the 3D visualization
 */

import React, { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SkillConnectionsBase({ nodes, connections, hoveredNode, selectedCategory }) {
  const linesRef = useRef();

  // Get node positions by ID
  const nodeMap = useMemo(() => {
    const map = {};
    nodes.forEach((n) => (map[n.id] = n));
    return map;
  }, [nodes]);

  // Create line geometry
  const { positions, opacities } = useMemo(() => {
    const pos = [];
    const ops = [];

    connections.forEach((conn) => {
      const from = nodeMap[conn.from];
      const to = nodeMap[conn.to];
      if (from && to) {
        pos.push(from.x, from.y, 0, to.x, to.y, 0);
        ops.push(0.25, 0.25);
      }
    });

    return {
      positions: new Float32Array(pos),
      opacities: new Float32Array(ops),
    };
  }, [connections, nodeMap]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [positions, opacities]);

  // Update line opacities based on hover
  useFrame((state) => {
    if (!linesRef.current) return;

    const opacityAttr = linesRef.current.geometry.attributes.opacity;
    const time = state.clock.elapsedTime;

    connections.forEach((conn, i) => {
      const fromNode = nodeMap[conn.from];
      const toNode = nodeMap[conn.to];

      const isConnectedToHover =
        hoveredNode && (conn.from === hoveredNode || conn.to === hoveredNode);

      const isCategoryFiltered = selectedCategory &&
        (fromNode?.category !== selectedCategory && toNode?.category !== selectedCategory);

      let baseOpacity = 0.2;

      if (isCategoryFiltered) {
        baseOpacity = 0.05;
      } else if (isConnectedToHover) {
        baseOpacity = 0.8;
      }

      const pulse = isConnectedToHover ? Math.sin(time * 4) * 0.15 : 0;

      opacityAttr.array[i * 2] = baseOpacity + pulse;
      opacityAttr.array[i * 2 + 1] = baseOpacity + pulse;
    });

    opacityAttr.needsUpdate = true;
  });

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
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
          gl_FragColor = vec4(0.65, 0.65, 0.7, vOpacity);
        }
      `,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
}

// Memoize to prevent unnecessary re-renders (GPU-intensive component)
const SkillConnections = memo(SkillConnectionsBase);

export default SkillConnections;
