import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import Timeline from './Timeline';
import { useLanguage } from '../../context/LanguageContext';
import { certifications } from '../../data/portfolioData';
import '../../styles/sections.css';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about">
      <motion.div
        className="section__container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
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

        {/* Achievements & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ marginTop: '60px' }}
        >
          <h3 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            {t('about.achievements')}
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 14px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.03)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                <Award size={13} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
                {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
