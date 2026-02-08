/**
 * SkillsNetwork Component
 * Interactive 3D visualization of skills as a network graph
 */

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { NetworkScene, skillsData, categoryColors, categoryNames, categoryFilters } from './skills/index';
import './SkillsNetwork.css';

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
            <span>Hover over skills to see connections | Click categories to filter | Drag to rotate</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category filter chips */}
      <div className="skills-network__categories">
        {categoryFilters.map((cat) => (
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
        <span>|</span>
        <span>{skillsData.connections.length} connections</span>
      </div>
    </div>
  );
}
