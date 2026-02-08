import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Github, ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { projects } from '../../data/portfolioData';
import {
  containerVariantsWide,
  titleVariants,
  projectCardVariants,
  lineVariants,
  smoothEase,
  sectionViewport,
  sectionLineStyle,
} from '../../utils/animations';
import '../../styles/sections.css';

const filterCategories = [
  { id: 'all', label: 'All Projects', count: projects.length },
  { id: 'ai-ml', label: 'AI & ML', count: projects.filter(p => p.category === 'ai-ml').length },
  { id: 'data-science', label: 'Data Science', count: projects.filter(p => p.category === 'data-science').length },
  { id: 'full-stack', label: 'Full Stack', count: projects.filter(p => p.category === 'full-stack').length },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="section">
      <motion.div
        className="section__container"
        variants={containerVariantsWide}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <motion.div className="section__header" variants={titleVariants}>
          <h2 className="section__title">Projects</h2>
          <motion.div
            className="section__line"
            variants={lineVariants}
            style={sectionLineStyle}
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filterCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`projects__filter-btn ${
                activeFilter === category.id ? 'projects__filter-btn--active' : ''
              }`}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="projects__filter-count">{category.count}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="projects__grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={projectCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="project-card">
                  {/* Project Image Preview */}
                  <div className="project-card__image-wrapper">
                    <motion.div
                      className="project-card__image"
                      style={project.image ? {
                        backgroundImage: `url(${project.image})`,
                      } : {}}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="project-card__image-overlay" />
                    </motion.div>

                    {/* Metrics Badges */}
                    {project.metrics && (
                      <div className="project-card__metrics">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <span key={key} className="project-card__metric-badge">
                            {value}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="project-card__content">
                    <div>
                      <motion.div
                        className="project-card__header"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      >
                        <motion.div
                          whileHover={{ rotate: -10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Folder size={32} className="project-card__icon" />
                        </motion.div>
                        <div className="project-card__links">
                          <motion.a
                            href={project.github}
                            className="project-card__link"
                            whileHover={{ y: -3, scale: 1.15 }}
                            transition={{ duration: 0.2 }}
                            title="View on GitHub"
                          >
                            <Github size={20} />
                          </motion.a>
                          <motion.a
                            href={project.live}
                            className="project-card__link"
                            whileHover={{ y: -3, scale: 1.15 }}
                            transition={{ duration: 0.2 }}
                            title="Live Demo"
                          >
                            <ExternalLink size={20} />
                          </motion.a>
                        </div>
                      </motion.div>

                      <h3 className="project-card__title">{project.title}</h3>
                      <p className="project-card__description">{project.description}</p>
                    </div>

                    <ul className="project-card__tags">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.li
                          key={tag}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.4 + tagIndex * 0.05,
                            duration: 0.4,
                            ease: smoothEase,
                          }}
                        >
                          {tag}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
