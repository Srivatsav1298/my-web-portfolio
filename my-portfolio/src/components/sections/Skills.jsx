import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import SkillsNetwork from './SkillsNetwork';
import '../../styles/sections.css';

const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
  },
  {
    category: 'Web Technologies',
    items: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'REST APIs'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    category: 'Tools & Cloud',
    items: ['Git', 'Docker', 'AWS', 'Jenkins', 'Linux', 'Agile'],
  },
  {
    category: 'Machine Learning',
    items: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'NLP'],
  },
  {
    category: 'Frameworks',
    items: ['Spring Boot', 'FastAPI', 'Flask', 'Socket.io', 'Microservices'],
  },
];

const Skills = () => {
  const [showNetwork, setShowNetwork] = useState(true);

  // Uniform animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="skills" className="section">
      <motion.div
        className="section__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div className="section__header" variants={titleVariants}>
          <h2 className="section__title">Technical Skills</h2>
          <motion.div
            className="section__line"
            variants={lineVariants}
            style={{
              height: '2px',
              width: '60px',
              background: 'linear-gradient(90deg, transparent, #808080, transparent)',
              margin: '20px auto 0',
              transformOrigin: 'center',
            }}
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
            <SkillsNetwork />
          </motion.div>
        )}

        {/* Traditional Grid View */}
        {!showNetwork && (
          <motion.div
            className="skills__grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((group, index) => (
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
                      <motion.span
                        key={skill}
                        className="skill-card__item"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.2 + index * 0.1 + skillIndex * 0.05,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {skill}
                      </motion.span>
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
