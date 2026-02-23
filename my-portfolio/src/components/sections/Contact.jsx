import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { personalInfo } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';
import {
  containerVariants,
  itemVariants,
  lineVariants,
  detailVariants,
  contactLineStyle,
} from '../../utils/animations';
import '../../styles/sections.css';

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="section contact">
      <motion.div
        className="section__container contact__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span className="contact__pre" variants={itemVariants}>
          {t('contact.whatsNext')}
        </motion.span>

        <motion.h2 className="contact__title" variants={itemVariants}>
          {t('contact.title')}
        </motion.h2>

        <motion.div
          className="section__line"
          variants={lineVariants}
          style={contactLineStyle}
        />

        <motion.p className="contact__text" variants={itemVariants}>
          {t('contact.text')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <MagneticButton
            className="glass-button glass-button--primary"
            onClick={() => window.location.href = `mailto:${personalInfo.email}`}
          >
            <Send size={16} style={{ marginRight: '8px' }} />
            {t('contact.sayHello')}
          </MagneticButton>
        </motion.div>

        <motion.div
          className="contact__details"
          variants={containerVariants}
        >
          <motion.div
            className="contact__detail-item"
            variants={detailVariants}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Mail size={16} />
            <span>{personalInfo.email}</span>
          </motion.div>
          <motion.div
            className="contact__detail-item"
            variants={detailVariants}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <MapPin size={16} />
            <span>{personalInfo.location}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p>{t('contact.footer')}</p>
      </motion.footer>
    </section>
  );
};

export default Contact;
