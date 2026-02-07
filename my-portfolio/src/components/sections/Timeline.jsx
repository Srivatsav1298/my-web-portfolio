import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Timeline.css';

// Experience data
const timelineData = [
  {
    id: 1,
    year: '2024',
    title: 'Software Engineer',
    company: 'Caterpillar Inc',
    description: 'Developing enterprise-level applications using Java and Spring Boot. Implementing RESTful APIs and microservices architecture. Optimized database queries improving system performance by 30%.',
    technologies: ['Java', 'Spring Boot', 'Microservices', 'PostgreSQL'],
    type: 'work',
  },
  {
    id: 2,
    year: '2024',
    title: 'Software Development Intern',
    company: 'Caterpillar Inc',
    description: 'Built full-stack web applications using React.js and Node.js. Designed database schemas and contributed to CI/CD pipeline improvements using Jenkins and Docker.',
    technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Docker'],
    type: 'work',
  },
  {
    id: 3,
    year: '2022',
    title: 'Web Development Intern',
    company: 'The Sparks Foundation',
    description: 'Developed responsive web applications and interactive dashboards for data visualization. Implemented payment gateway integration for e-commerce platform.',
    technologies: ['HTML/CSS', 'JavaScript', 'Data Visualization', 'APIs'],
    type: 'work',
  },
  {
    id: 4,
    year: '2020',
    title: 'B.Tech Computer Science',
    company: 'SRM Institute of Science & Technology',
    description: 'Bachelor of Technology in Computer Science and Engineering with CGPA 8.8/10. Smart India Hackathon 2023 Finalist.',
    technologies: ['DSA', 'DBMS', 'OS', 'Machine Learning'],
    type: 'education',
  },
];

/**
 * Single timeline item
 */
function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'}`}
    >
      {/* Connecting line */}
      <motion.div
        className="timeline-item__line"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Node dot */}
      <motion.div
        className={`timeline-item__node ${item.type === 'project' ? 'timeline-item__node--project' : ''}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="timeline-item__node-inner" />
        <div className="timeline-item__node-pulse" />
      </motion.div>

      {/* Year label */}
      <motion.div
        className="timeline-item__year"
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 20 : -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {item.year}
      </motion.div>

      {/* Content card */}
      <motion.div
        className="timeline-item__content"
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="timeline-item__header">
          <h3 className="timeline-item__title">{item.title}</h3>
          <span className="timeline-item__company">{item.company}</span>
        </div>

        <p className="timeline-item__description">{item.description}</p>

        <div className="timeline-item__technologies">
          {item.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              className="timeline-item__tech"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Neural connection decoration */}
        <svg className="timeline-item__decoration" viewBox="0 0 100 20">
          <motion.path
            d="M0,10 Q25,5 50,10 T100,10"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </svg>
      </motion.div>

      {/* Bottom connection for last item */}
      {isLast && (
        <motion.div
          className="timeline-item__end"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <span>Present</span>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Timeline Component
 */
export default function Timeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <div ref={containerRef} className="timeline">
      {/* Main vertical line */}
      <motion.div
        className="timeline__main-line"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Traveling pulse effect */}
      <motion.div
        className="timeline__pulse"
        initial={{ top: '0%', opacity: 0 }}
        animate={isInView ? {
          top: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
        } : { top: '0%', opacity: 0 }}
        transition={{
          duration: 2,
          delay: 0.5,
          ease: 'easeInOut',
        }}
      />

      {/* Timeline items */}
      <div className="timeline__items">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === 0}
          />
        ))}
      </div>

      {/* Start marker */}
      <motion.div
        className="timeline__start"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <span>Journey Begins</span>
      </motion.div>
    </div>
  );
}
