import React from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/sections.css';

const About = () => {
  const { t } = useLanguage();

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
            {t('about.title')}
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
            {t('about.p1')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('about.p2')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {t('about.p3')}
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
