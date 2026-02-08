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
            I'm an engineer focused on building intelligent systems at the intersection of data and AI.
            My work spans from architecting scalable data pipelines to developing machine learning
            solutions that deliver real impact.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            With a foundation in full-stack development and data engineering, I approach problems
            with both technical depth and product thinking. I believe the best systems are those
            that balance sophistication with simplicity.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Currently exploring the frontiers of AI engineering, from LLM applications to
            real-time data processing systems.
          </motion.p>
        </div>

        {/* Experience Timeline */}
        <motion.div
          className="about__timeline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ marginTop: '80px' }}
        >
          <Timeline />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
