import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import './SkillsNetwork.css';

// Skills data with categories and connections
const skillsData = {
  nodes: [
    // Programming & Backend (center)
    { id: 'python', label: 'Python', category: 'backend', x: 0, y: 0, size: 1.3 },
    { id: 'flask', label: 'Flask', category: 'backend', x: 1.8, y: -0.5, size: 0.95 },
    { id: 'restapi', label: 'RestAPI', category: 'backend', x: 1.5, y: 0.8, size: 0.9 },
    { id: 'microservices', label: 'Microservices', category: 'backend', x: 2.5, y: 0, size: 0.85 },

    // Data Science
    { id: 'pandas', label: 'Pandas', category: 'data', x: -1.5, y: -1.5, size: 1.0 },
    { id: 'matplotlib', label: 'Matplotlib', category: 'data', x: -2.5, y: -0.8, size: 0.9 },
    { id: 'seaborn', label: 'Seaborn', category: 'data', x: -3, y: -1.8, size: 0.8 },
    { id: 'datamodeling', label: 'Data Modeling', category: 'data', x: -2, y: 0.5, size: 0.85 },
    { id: 'analytics', label: 'Data Analytics', category: 'data', x: -3.2, y: 0.2, size: 0.9 },

    // Databases
    { id: 'sql', label: 'SQL', category: 'database', x: 0, y: 2.2, size: 1.1 },
    { id: 'postgres', label: 'PostgreSQL', category: 'database', x: 1.5, y: 2.5, size: 0.95 },

    // Cloud & DevOps
    { id: 'azure', label: 'Azure', category: 'cloud', x: 3.5, y: 1, size: 1.0 },
    { id: 'aws', label: 'AWS', category: 'cloud', x: 4, y: -0.5, size: 1.0 },
    { id: 'docker', label: 'Docker', category: 'cloud', x: 3.8, y: -1.5, size: 0.9 },
    { id: 'cicd', label: 'CI/CD', category: 'cloud', x: 4.5, y: 0.3, size: 0.85 },

    // Software Development
    { id: 'git', label: 'Git', category: 'dev', x: -1, y: 1.5, size: 0.9 },
    { id: 'cleancode', label: 'Clean Code', category: 'dev', x: -1.8, y: 2.2, size: 0.8 },
    { id: 'architecture', label: 'Software Arch', category: 'dev', x: 0.8, y: -2, size: 0.85 },
    { id: 'testing', label: 'Testing', category: 'dev', x: 2, y: -1.8, size: 0.8 },

    // AI
    { id: 'langchain', label: 'LangChain', category: 'ai', x: -0.5, y: -2.5, size: 0.95 },
    { id: 'llm', label: 'LLM APIs', category: 'ai', x: -2, y: -2.5, size: 0.9 },
    { id: 'claude', label: 'Claude', category: 'ai', x: -1.2, y: -3.2, size: 0.85 },
    { id: 'llama', label: 'LLaMA', category: 'ai', x: 0.5, y: -3.2, size: 0.85 },
  ],
  connections: [
    // Python connections (central hub)
    { from: 'python', to: 'flask' },
    { from: 'python', to: 'restapi' },
    { from: 'python', to: 'pandas' },
    { from: 'python', to: 'langchain' },
    { from: 'python', to: 'sql' },

    // Backend connections
    { from: 'flask', to: 'restapi' },
    { from: 'restapi', to: 'microservices' },
    { from: 'flask', to: 'docker' },

    // Data Science connections
    { from: 'pandas', to: 'matplotlib' },
    { from: 'matplotlib', to: 'seaborn' },
    { from: 'pandas', to: 'datamodeling' },
    { from: 'datamodeling', to: 'analytics' },
    { from: 'analytics', to: 'sql' },

    // Database connections
    { from: 'sql', to: 'postgres' },
    { from: 'postgres', to: 'datamodeling' },

    // Cloud connections
    { from: 'azure', to: 'aws' },
    { from: 'aws', to: 'docker' },
    { from: 'docker', to: 'cicd' },
    { from: 'azure', to: 'cicd' },
    { from: 'microservices', to: 'azure' },
    { from: 'microservices', to: 'docker' },

    // Software Dev connections
    { from: 'git', to: 'cicd' },
    { from: 'cleancode', to: 'git' },
    { from: 'architecture', to: 'microservices' },
    { from: 'testing', to: 'cicd' },
    { from: 'cleancode', to: 'architecture' },

    // AI connections
    { from: 'langchain', to: 'llm' },
    { from: 'llm', to: 'claude' },
    { from: 'llm', to: 'llama' },
    { from: 'langchain', to: 'llama' },

    // Cross-category
    { from: 'flask', to: 'postgres' },
    { from: 'pandas', to: 'sql' },
    { from: 'aws', to: 'postgres' },
  ],
};

const categoryColors = {
  backend: '#b0b0b5',
  data: '#8a9aaa',
  database: '#9aaa8a',
  cloud: '#8aaa8a',
  dev: '#9a8aaa',
  ai: '#aa9a8a',
};

const categoryNames = {
  backend: 'Backend',
  data: 'Data Science',
  database: 'Databases',
  cloud: 'Cloud & DevOps',
  dev: 'Development',
  ai: 'AI',
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
    { id: 'backend', label: 'Backend', color: categoryColors.backend },
    { id: 'data', label: 'Data Science', color: categoryColors.data },
    { id: 'database', label: 'Databases', color: categoryColors.database },
    { id: 'cloud', label: 'Cloud', color: categoryColors.cloud },
    { id: 'dev', label: 'Dev', color: categoryColors.dev },
    { id: 'ai', label: 'AI', color: categoryColors.ai },
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
