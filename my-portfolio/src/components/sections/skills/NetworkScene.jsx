/**
 * NetworkScene Component
 * Main 3D scene containing skill nodes and connections
 */

import React, { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import SkillNode from './SkillNode';
import SkillConnections from './SkillConnections';
import { skillsData } from './skillsConfig';

export default function NetworkScene({ hoveredNode, setHoveredNode, selectedCategory }) {
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
