import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Cloud,
  GitBranch,
  Brain,
  Server,
  LineChart,
  BarChart3,
  PieChart,
  Table2,
  Box,
  Layers,
  Cpu,
  Workflow,
  TestTube,
  Container,
  Globe,
  Binary,
  FileCode,
  Sparkles,
  Bot,
  MessageSquare,
  LayoutGrid,
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { skillsForGrid } from '../../data/portfolioData';
import {
  containerVariants,
  titleVariants,
  lineVariants,
  smoothEase,
  sectionViewport,
  sectionLineStyle,
} from '../../utils/animations';
import '../../styles/sections.css';

// Lazy load the heavy 3D component
const SkillsNetwork = lazy(() => import('./SkillsNetwork'));

// Simple loading fallback for network view
const NetworkFallback = () => (
  <div style={{
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
  }}>
    Loading 3D visualization...
  </div>
);

// Icon mapping for skills
const skillIcons = {
  // Programming & Backend
  'Python': Code2,
  'Flask': Server,
  'RestAPI': Globe,
  'Microservices': Layers,
  // Data Science
  'Pandas': Table2,
  'Matplotlib': LineChart,
  'Seaborn': BarChart3,
  'Data Modeling': Database,
  'PySpark': Sparkles,
  'Data Analytics': PieChart,
  // Databases
  'SQL': Database,
  'PostgreSQL': Database,
  'Data Modelling': LayoutGrid,
  // Cloud & DevOps
  'Azure': Cloud,
  'AWS': Cloud,
  'Docker': Container,
  'CI/CD': Workflow,
  'Cloud Architecture': Server,
  // Software Development
  'Git': GitBranch,
  'Clean Coding': FileCode,
  'Software Architecture': Box,
  'Testing': TestTube,
  // AI
  'LangChain': Workflow,
  'LLM APIs': Bot,
  'Claude': MessageSquare,
  'LLaMA': Brain,
  'Distributed Systems': Cpu,
};

// Skill item component with icon
const SkillItem = ({ skill, index, groupIndex }) => {
  const IconComponent = skillIcons[skill] || Binary;

  return (
    <motion.span
      key={skill}
      className="skill-card__item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.2 + groupIndex * 0.1 + index * 0.05,
        duration: 0.4,
        ease: smoothEase,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <IconComponent size={16} className="skill-card__icon" />
      <span className="skill-card__name">{skill}</span>
    </motion.span>
  );
};

const Skills = () => {
  const [showNetwork, setShowNetwork] = useState(true);

  return (
    <section id="skills" className="section">
      <motion.div
        className="section__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <motion.div className="section__header" variants={titleVariants}>
          <h2 className="section__title">Technical Skills</h2>
          <motion.div
            className="section__line"
            variants={lineVariants}
            style={sectionLineStyle}
          />
        </motion.div>

        {/* View toggle */}
        <motion.div
          className="skills__toggle"
          variants={titleVariants}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            margin: '30px 0',
          }}
        >
          <button
            className={`skills__toggle-btn ${showNetwork ? 'skills__toggle-btn--active' : ''}`}
            onClick={() => setShowNetwork(true)}
          >
            Network View
          </button>
          <button
            className={`skills__toggle-btn ${!showNetwork ? 'skills__toggle-btn--active' : ''}`}
            onClick={() => setShowNetwork(false)}
          >
            Grid View
          </button>
        </motion.div>

        {/* Interactive Network View */}
        {showNetwork && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<NetworkFallback />}>
              <SkillsNetwork />
            </Suspense>
          </motion.div>
        )}

        {/* Traditional Grid View with Icons */}
        {!showNetwork && (
          <motion.div
            className="skills__grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {skillsForGrid.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="skill-card" static>
                  <h3 className="skill-card__title">
                    <span className="skill-card__dot" />
                    {group.category}
                  </h3>
                  <div className="skill-card__list">
                    {group.items.map((skill, skillIndex) => (
                      <SkillItem
                        key={skill}
                        skill={skill}
                        index={skillIndex}
                        groupIndex={index}
                      />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Skills;
