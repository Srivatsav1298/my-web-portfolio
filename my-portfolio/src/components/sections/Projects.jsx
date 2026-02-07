import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Github, ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import '../../styles/sections.css';

const projects = [
  {
    title: 'AI Neural Network Visualizer',
    description: 'A real-time 3D visualization of neural network layers learning patterns using React Three Fiber.',
    tags: ['React', 'Three.js', 'Python', 'TensorFlow'],
    github: '#',
    live: '#',
  },
  {
    title: 'Real-Time Analytics Pipeline',
    description: 'High-throughput data pipeline processing millions of events per second with sub-second latency.',
    tags: ['Apache Kafka', 'Spark', 'Python', 'AWS'],
    github: '#',
    live: '#',
  },
  {
    title: 'LLM Document Assistant',
    description: 'RAG-powered document analysis system with semantic search and conversational interface.',
    tags: ['LangChain', 'OpenAI', 'FastAPI', 'Pinecone'],
    github: '#',
    live: '#',
  },
];

const Projects = () => {
  // Uniform animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
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
    <section id="projects" className="section">
      <motion.div
        className="section__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div className="section__header" variants={titleVariants}>
          <h2 className="section__title">Projects</h2>
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

        <div className="projects__grid">
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <GlassCard className="project-card">
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
                      <Folder size={40} className="project-card__icon" />
                    </motion.div>
                    <div className="project-card__links">
                      <motion.a
                        href={project.github}
                        className="project-card__link"
                        whileHover={{ y: -3, scale: 1.15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        className="project-card__link"
                        whileHover={{ y: -3, scale: 1.15 }}
                        transition={{ duration: 0.2 }}
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
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {tag}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
