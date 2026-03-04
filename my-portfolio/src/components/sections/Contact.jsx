import React, { useMemo, useState } from 'react';
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

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validateForm = (data) => {
    const nextErrors = {};

    if (!data.name.trim()) {
      nextErrors.name = t('contact.form.required');
    }

    if (!data.email.trim()) {
      nextErrors.email = t('contact.form.required');
    } else if (!emailRegex.test(data.email.trim())) {
      nextErrors.email = t('contact.form.invalidEmail');
    }

    if (!data.message.trim()) {
      nextErrors.message = t('contact.form.required');
    } else if (data.message.trim().length < 20) {
      nextErrors.message = t('contact.form.messageMin');
    }

    return nextErrors;
  };

  const buildMailtoLink = ({ name, email, subject, message }) => {
    const resolvedSubject = subject?.trim() || t('contact.form.defaultSubject');
    const body = [
      `${t('contact.form.nameLabel')}: ${name.trim()}`,
      `${t('contact.form.emailLabel')}: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n');

    return `mailto:${personalInfo.email}?subject=${encodeURIComponent(resolvedSubject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const fieldErrors = validateForm(formData);
    if (!fieldErrors[name]) return;
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitState.status === 'submitting') return;
    if (formData.website) return;

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitState({ status: 'error', message: t('contact.form.fixErrors') });
      return;
    }

    setSubmitState({ status: 'submitting', message: '' });

    if (!endpoint) {
      window.location.href = buildMailtoLink(formData);
      setSubmitState({ status: 'success', message: t('contact.form.successMailto') });
      setFormData(initialFormState);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('CONTACT_SUBMIT_FAILED');
      }

      setSubmitState({ status: 'success', message: t('contact.form.successApi') });
      setFormData(initialFormState);
    } catch {
      window.location.href = buildMailtoLink(formData);
      setSubmitState({ status: 'success', message: t('contact.form.successFallback') });
      setFormData(initialFormState);
    }
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
          className="contact__form-wrap"
          variants={itemVariants}
        >
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__form-row">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">
                  {t('contact.form.nameLabel')}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className={`contact__input ${errors.name ? 'contact__input--error' : ''}`}
                  placeholder={t('contact.form.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <span className="contact__error" id="contact-name-error">{errors.name}</span>
                )}
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">
                  {t('contact.form.emailLabel')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className={`contact__input ${errors.email ? 'contact__input--error' : ''}`}
                  placeholder={t('contact.form.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <span className="contact__error" id="contact-email-error">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-subject">
                {t('contact.form.subjectLabel')}
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="contact__input"
                placeholder={t('contact.form.subjectPlaceholder')}
                value={formData.subject}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-message">
                {t('contact.form.messageLabel')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                className={`contact__textarea ${errors.message ? 'contact__input--error' : ''}`}
                placeholder={t('contact.form.messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={6}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && (
                <span className="contact__error" id="contact-message-error">{errors.message}</span>
              )}
            </div>

            <div className="contact__field contact__field--honeypot" aria-hidden="true">
              <label htmlFor="contact-website">{t('contact.form.websiteLabel')}</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex="-1"
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="contact__form-actions">
              <MagneticButton
                type="submit"
                className="glass-button glass-button--primary"
                disabled={submitState.status === 'submitting'}
              >
                <Send size={16} style={{ marginRight: '8px' }} />
                {submitState.status === 'submitting' ? t('contact.form.sending') : t('contact.form.send')}
              </MagneticButton>
              <a className="contact__direct-link" href={`mailto:${personalInfo.email}`}>
                {t('contact.form.directEmail')}
              </a>
            </div>

            <div className="contact__form-status" aria-live="polite">
              {submitState.message && (
                <p className={`contact__status ${submitState.status === 'error' ? 'contact__status--error' : ''}`}>
                  {submitState.message}
                </p>
              )}
            </div>
          </form>
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
