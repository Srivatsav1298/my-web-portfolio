import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import './About.css';

const pick = (lang, field) => (field ? field[lang] || field.en : '');

const content = {
  eyebrow: { en: 'About', no: 'Om meg' },
  headline: {
    en: 'Building AI systems people can actually use.',
    no: 'Bygger AI-systemer folk faktisk kan bruke.',
  },
  intro: {
    en: "I'm an AI Engineer with three years of backend engineering at Orion Innovation, now focused on applied AI and data-driven systems. I build reliable software around real-world data, models, and users.",
    no: 'Jeg er AI-ingeniør med tre år innen backendutvikling hos Orion Innovation, nå fokusert på anvendt AI og datadrevne systemer. Jeg bygger pålitelig programvare rundt virkelige data, modeller og brukere.',
  },
  principles: [
    {
      number: '01',
      title: { en: 'Build', no: 'Bygg' },
      text: {
        en: 'Turn real-world data into working software.',
        no: 'Gjør virkelige data til fungerende programvare.',
      },
    },
    {
      number: '02',
      title: { en: 'Engineer', no: 'Ingeniør' },
      text: {
        en: 'Keep systems reliable enough for production.',
        no: 'Hold systemene pålitelige nok for produksjon.',
      },
    },
    {
      number: '03',
      title: { en: 'Measure', no: 'Mål' },
      text: {
        en: 'Prefer evidence over novelty.',
        no: 'Foretrekk bevis fremfor nyskapning.',
      },
    },
  ],
  expertiseLabel: { en: 'Technical Expertise', no: 'Teknisk ekspertise' },
  expertise: [
    { area: 'AI / LLM', items: 'LLM Applications · Agents · Tool Calling · Prompting' },
    { area: 'Backend', items: 'Python · FastAPI · Flask · REST APIs · PostgreSQL' },
    { area: 'Data', items: 'PySpark · SQL · ETL · Analytics' },
    { area: 'AI Systems', items: 'Retrieval · Grounding · Evaluation · Guardrails' },
    { area: 'Frontend', items: 'React · TypeScript · Conversational UX' },
    { area: 'Infrastructure', items: 'AWS · Azure · Production Systems' },
  ],
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  const { language } = useLanguage();

  return (
    <section id="about" className="section about-xp" aria-labelledby="about-title">
      <div className="section__container about-xp__container">
        <header className="about-xp__header">
          <Motion.p className="about-xp__eyebrow" {...fadeUp(0)}>
            {pick(language, content.eyebrow)}
          </Motion.p>
          <Motion.h2 id="about-title" className="about-xp__headline" {...fadeUp(0.05)}>
            {pick(language, content.headline)}
          </Motion.h2>
          <Motion.p className="about-xp__intro" {...fadeUp(0.1)}>
            {pick(language, content.intro)}
          </Motion.p>
        </header>

        <Motion.ol className="about-xp__principles" {...fadeUp(0.1)}>
          {content.principles.map((p) => (
            <li key={p.number} className="about-xp__principle">
              <span className="about-xp__principle-number" aria-hidden="true">
                {p.number}
              </span>
              <div>
                <h3 className="about-xp__principle-title">{pick(language, p.title)}</h3>
                <p className="about-xp__principle-text">{pick(language, p.text)}</p>
              </div>
            </li>
          ))}
        </Motion.ol>

        <Motion.div className="about-xp__expertise" {...fadeUp(0.15)}>
          <h3 className="about-xp__subheading">{pick(language, content.expertiseLabel)}</h3>
          <dl className="about-xp__map">
            {content.expertise.map((group) => (
              <div key={group.area} className="about-xp__map-row">
                <dt className="about-xp__map-area">{group.area}</dt>
                <dd className="about-xp__map-items">{group.items}</dd>
              </div>
            ))}
          </dl>
        </Motion.div>
      </div>
    </section>
  );
}
