import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import {
  experienceIntro,
  experienceStories,
  educationEntries,
  educationLabel,
} from '../../data/experienceStories';
import './Experience.css';

const pick = (lang, field) => (field ? field[lang] || field.en : '');

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

function StoryBlock({ story, index }) {
  const { language } = useLanguage();

  return (
    <Motion.article
      className={`xp-story${story.featured ? ' xp-story--featured' : ''}`}
      {...fadeUp(index * 0.05)}
      aria-labelledby={`xp-${story.id}-role`}
    >
      <div className="xp-story__text">
        <header className="xp-story__header">
          <span className="xp-story__number" aria-hidden="true">
            {story.number}
          </span>
          <h3 id={`xp-${story.id}-role`} className="xp-story__role">
            {pick(language, story.role)}
            {story.current && <span className="xp-story__current-badge">Current</span>}
          </h3>
          <p className="xp-story__company">{story.company}</p>
          <p className="xp-story__date">{pick(language, story.date)}</p>
        </header>

        <p className="xp-story__context">{pick(language, story.context)}</p>

        {story.impactMetric && (
          <div className="xp-story__metric">
            <span className="xp-story__metric-value">{story.impactMetric.value}</span>
            <span className="xp-story__metric-label">
              {pick(language, story.impactMetric.label)}
            </span>
          </div>
        )}

        {story.contributions.length > 0 && (
          <ul className="xp-story__contributions">
            {story.contributions.map((c) => (
              <li key={c.en}>{pick(language, c)}</li>
            ))}
          </ul>
        )}

        <p className="xp-story__tech" aria-label="Technologies">
          {story.technologies.join(' · ')}
        </p>
      </div>
    </Motion.article>
  );
}

function EducationBlock() {
  const { language } = useLanguage();
  return (
    <div className="xp-education">
      <h3 className="xp-education__label">{pick(language, educationLabel)}</h3>
      {educationEntries.map((entry) => (
        <div key={entry.school} className="xp-edu-entry">
          <div className="xp-edu-entry__main">
            <h4 className="xp-edu-entry__degree">{pick(language, entry.degree)}</h4>
            <p className="xp-edu-entry__school">{entry.school}</p>
          </div>
          <div className="xp-edu-entry__meta">
            <p className="xp-edu-entry__date">{pick(language, entry.date)}</p>
            {entry.note && <p className="xp-edu-entry__note">{pick(language, entry.note)}</p>}
            <p className="xp-edu-entry__coursework">
              {entry.coursework[language] || entry.coursework.en.join(' · ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const { language } = useLanguage();

  return (
    <section id="experience" className="section xp" aria-labelledby="xp-title">
      <div className="section__container">
        <header className="xp__header">
          <Motion.p className="xp__eyebrow" {...fadeUp(0)}>
            {pick(language, experienceIntro.eyebrow)}
          </Motion.p>
          <Motion.h2 id="xp-title" className="section__title" {...fadeUp(0.05)}>
            {pick(language, experienceIntro.title)}
          </Motion.h2>
          <Motion.p className="xp__subtitle" {...fadeUp(0.1)}>
            {pick(language, experienceIntro.subtitle)}
          </Motion.p>
        </header>

        <div className="xp__stories">
          {experienceStories.map((story, i) => (
            <StoryBlock key={story.id} story={story} index={i} />
          ))}
        </div>

        <EducationBlock />
      </div>
    </section>
  );
}
