import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import './SkillsNetwork.css';

// Skills data with categories and connections
const skillsData = {
  nodes: [
    // Core skills (center)
    { id: 'python', label: 'Python', category: 'language', x: 0, y: 0, size: 1.2 },
    { id: 'javascript', label: 'JavaScript', category: 'language', x: 2.5, y: 0.8, size: 1.0 },
    { id: 'sql', label: 'SQL', category: 'language', x: -2.5, y: 0.8, size: 1.0 },

    // Data Engineering
    { id: 'spark', label: 'Spark', category: 'data', x: -3, y: -1.2, size: 0.9 },
    { id: 'airflow', label: 'Airflow', category: 'data', x: -4, y: 0.3, size: 0.85 },
    { id: 'kafka', label: 'Kafka', category: 'data', x: -3.2, y: 1.8, size: 0.85 },
    { id: 'pandas', label: 'Pandas', category: 'data', x: -1.2, y: -1.8, size: 0.8 },

    // AI/ML
    { id: 'tensorflow', label: 'TensorFlow', category: 'ai', x: 1.2, y: -1.8, size: 0.9 },
    { id: 'pytorch', label: 'PyTorch', category: 'ai', x: 3, y: -1.2, size: 0.9 },
    { id: 'langchain', label: 'LangChain', category: 'ai', x: 2.2, y: -2.5, size: 0.8 },
    { id: 'openai', label: 'OpenAI', category: 'ai', x: 0, y: -2.5, size: 0.85 },

    // Cloud & Infrastructure
    { id: 'aws', label: 'AWS', category: 'cloud', x: 4, y: 0.3, size: 0.95 },
    { id: 'docker', label: 'Docker', category: 'cloud', x: 3.2, y: 1.8, size: 0.85 },
    { id: 'kubernetes', label: 'K8s', category: 'cloud', x: 4.2, y: -0.8, size: 0.8 },

    // Frontend
    { id: 'react', label: 'React', category: 'frontend', x: 1, y: 2.2, size: 0.9 },
    { id: 'nodejs', label: 'Node.js', category: 'frontend', x: -1, y: 2.2, size: 0.85 },
  ],
  connections: [
    // Python connections
    { from: 'python', to: 'spark' },
    { from: 'python', to: 'airflow' },
    { from: 'python', to: 'pandas' },
    { from: 'python', to: 'tensorflow' },
    { from: 'python', to: 'pytorch' },
    { from: 'python', to: 'langchain' },
    { from: 'python', to: 'openai' },

    // JavaScript connections
    { from: 'javascript', to: 'react' },
    { from: 'javascript', to: 'nodejs' },

    // Data pipeline
    { from: 'spark', to: 'kafka' },
    { from: 'airflow', to: 'spark' },
    { from: 'kafka', to: 'airflow' },
    { from: 'pandas', to: 'spark' },

    // AI/ML
    { from: 'tensorflow', to: 'pytorch' },
    { from: 'langchain', to: 'openai' },
    { from: 'pytorch', to: 'langchain' },

    // Cloud
    { from: 'aws', to: 'docker' },
    { from: 'docker', to: 'kubernetes' },
    { from: 'aws', to: 'kubernetes' },
    { from: 'spark', to: 'aws' },

    // Cross-category
    { from: 'sql', to: 'spark' },
    { from: 'sql', to: 'pandas' },
    { from: 'nodejs', to: 'docker' },
    { from: 'react', to: 'nodejs' },
  ],
};

const categoryColors = {
  language: '#b0b0b5',
  data: '#8a9aaa',
  ai: '#aa9a8a',
  cloud: '#8aaa8a',
  frontend: '#9a8aaa',
};

const categoryNames = {
  language: 'Languages',
  data: 'Data Engineering',
  ai: 'AI / ML',
  cloud: 'Cloud',
  frontend: 'Frontend',
};

/**
 * Single skill node in the 3D network
 */
function SkillNode({ node, isHovered, isConnected, onHover, onLeave, selectedCategory }) {
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

/**
 * Connections between skill nodes
 */
function SkillConnections({ nodes, connections, hoveredNode, selectedCategory }) {
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

/**
 * Main 3D scene
 */
function NetworkScene({ hoveredNode, setHoveredNode, selectedCategory }) {
  // Get connected nodes
  const connectedNodes = useMemo(() => {
    if (!hoveredNode) return new Set();
    const connected = new Set();
    skillsData.connections.forEach((conn) => {
      if (conn.from === hoveredNode) connected.add(conn.to);
      if (conn.to === hoveredNode) connected.add(conn.from);
    });
    return connected;
  }, [hoveredNode]);

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.3}
      />
      <SkillConnections
        nodes={skillsData.nodes}
        connections={skillsData.connections}
        hoveredNode={hoveredNode}
        selectedCategory={selectedCategory}
      />
      {skillsData.nodes.map((node) => (
        <SkillNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          isConnected={connectedNodes.has(node.id)}
          selectedCategory={selectedCategory}
          onHover={setHoveredNode}
          onLeave={() => setHoveredNode(null)}
        />
      ))}
    </>
  );
}

/**
 * Skills Network Component
 */
export default function SkillsNetwork() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showHint, setShowHint] = useState(true);

  // Hide hint after first interaction
  useEffect(() => {
    if (hoveredNode || selectedCategory) {
      setShowHint(false);
    }
  }, [hoveredNode, selectedCategory]);

  const categories = [
    { id: 'language', label: 'Languages', color: categoryColors.language },
    { id: 'data', label: 'Data', color: categoryColors.data },
    { id: 'ai', label: 'AI/ML', color: categoryColors.ai },
    { id: 'cloud', label: 'Cloud', color: categoryColors.cloud },
    { id: 'frontend', label: 'Frontend', color: categoryColors.frontend },
  ];

  // Get hovered node details
  const hoveredDetails = hoveredNode
    ? skillsData.nodes.find((n) => n.id === hoveredNode)
    : null;

  const connectionCount = hoveredNode
    ? skillsData.connections.filter(
        (c) => c.from === hoveredNode || c.to === hoveredNode
      ).length
    : 0;

  return (
    <div className="skills-network">
      {/* Instruction hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="skills-network__hint"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span>💡</span> Hover over skills to see connections • Click categories to filter • Drag to rotate
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category filter chips */}
      <div className="skills-network__categories">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            className={`skills-network__category ${
              selectedCategory === cat.id ? 'skills-network__category--active' : ''
            }`}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              '--category-color': cat.color,
            }}
          >
            <span
              className="skills-network__category-dot"
              style={{ backgroundColor: cat.color }}
            />
            {cat.label}
          </motion.button>
        ))}
        {selectedCategory && (
          <motion.button
            className="skills-network__clear"
            onClick={() => setSelectedCategory(null)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            Clear filter
          </motion.button>
        )}
      </div>

      {/* 3D Canvas */}
      <div className="skills-network__canvas">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <NetworkScene
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            selectedCategory={selectedCategory}
          />
        </Canvas>
      </div>

      {/* Hover info panel */}
      <AnimatePresence>
        {hoveredDetails && (
          <motion.div
            className="skills-network__info"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="skills-network__info-header">
              <span
                className="skills-network__info-dot"
                style={{ backgroundColor: categoryColors[hoveredDetails.category] }}
              />
              <span className="skills-network__info-label">{hoveredDetails.label}</span>
            </div>
            <div className="skills-network__info-meta">
              <span className="skills-network__info-category">
                {categoryNames[hoveredDetails.category]}
              </span>
              <span className="skills-network__info-connections">
                {connectionCount} connections
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="skills-network__stats">
        <span>{skillsData.nodes.length} skills</span>
        <span>•</span>
        <span>{skillsData.connections.length} connections</span>
      </div>
    </div>
  );
}
