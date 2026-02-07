import React from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';
import '../../styles/sections.css';

const About = () => {
  return (
    <section id="about" className="section about">
      <motion.div
        className="section__container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section__header">
          <motion.h2
            className="section__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            About Me
          </motion.h2>
          <motion.div
            style={{
              height: '2px',
              width: '60px',
              background: 'linear-gradient(90deg, transparent, #808080, transparent)',
              margin: '20px auto 0',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="about__text">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I'm a Software Engineer at Caterpillar Inc, passionate about building enterprise-level
            applications and AI-powered solutions. With a strong foundation in full-stack development
            and machine learning, I specialize in creating scalable, high-performance systems.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I graduated with a B.Tech in Computer Science from SRM Institute of Science and Technology
            with a CGPA of 8.8/10. My expertise spans Java, Python, React, Node.js, and cloud technologies,
            with a keen interest in microservices architecture and data-driven applications.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            AWS Certified Cloud Practitioner and Google Data Analytics certified professional,
            I bring a blend of theoretical knowledge and hands-on experience in building robust,
            production-ready solutions.
          </motion.p>
        </div>

        {/* Experience Timeline */}
        <motion.div
          className="about__timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h3
            className="section__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              textAlign: 'center',
              marginTop: '80px',
              marginBottom: '20px',
            }}
          >
            Experience Journey
          </motion.h3>
          <Timeline />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
