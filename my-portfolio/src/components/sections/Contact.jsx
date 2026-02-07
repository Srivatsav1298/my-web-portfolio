import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import '../../styles/sections.css';

const Contact = () => {
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

  const itemVariants = {
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

  const detailVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

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
          What's Next?
        </motion.span>

        <motion.h2 className="contact__title" variants={itemVariants}>
          Get In Touch
        </motion.h2>

        <motion.div
          className="section__line"
          variants={lineVariants}
          style={{
            height: '2px',
            width: '80px',
            background: 'linear-gradient(90deg, transparent, #808080, transparent)',
            margin: '0 auto 32px',
            transformOrigin: 'center',
          }}
        />

        <motion.p className="contact__text" variants={itemVariants}>
          I'm currently open to new opportunities in data engineering and AI.
          Whether you have a question or just want to connect, feel free to reach out.
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <MagneticButton
            className="glass-button glass-button--primary"
            onClick={() => window.location.href = 'mailto:hello@example.com'}
          >
            <Send size={16} style={{ marginRight: '8px' }} />
            Say Hello
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
            <span>hello@example.com</span>
          </motion.div>
          <motion.div
            className="contact__detail-item"
            variants={detailVariants}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <MapPin size={16} />
            <span>San Francisco, CA</span>
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
        <p>Designed & Built by Vatsav</p>
      </motion.footer>
    </section>
  );
};

export default Contact;
