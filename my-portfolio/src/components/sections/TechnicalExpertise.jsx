import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  expertiseHeader,
  expertiseCategories,
  technologyStack,
  lifecycleStages,
  lifecycleCaption,
} from '../../data/expertiseData';
import './TechnicalExpertise.css';

const pick = (lang, field) => (field ? field[lang] || field.en : '');

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

function TechnologyChip({ label }) {
  return <span className="txp-chip">{label}</span>;
}

function ProjectEvidence({ project }) {
  const external = /^https?:/.test(project.href);
  return (
    <a
      className="txp-evidence"
      href={project.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`Applied in ${project.name} (opens in new tab)`}
    >
      <span className="txp-evidence__arrow" aria-hidden="true">→</span>
      {project.name}
    </a>
  );
}

function ExpertiseCard({ category, index }) {
  const { language } = useLanguage();
  return (
    <Motion.article
      className={`txp-card${category.featured ? ' txp-card--featured' : ''}`}
      {...fadeUp(index * 0.06)}
    >
      <div className="txp-card__top">
        <span className="txp-card__number">{category.number}</span>
        <span className="txp-card__level">
          <Check size={11} strokeWidth={2.5} aria-hidden="true" />
          {category.level === 'core' ? 'Core' : 'Supporting'}
        </span>
      </div>

      <h3 className="txp-card__title">{pick(language, category.title)}</h3>
      <p className="txp-card__description">{pick(language, category.description)}</p>

      <div className="txp-card__chips" role="list" aria-label="Technologies">
        {category.technologies.map((tech) => (
          <TechnologyChip key={tech} label={tech} />
        ))}
      </div>

      <div className="txp-card__divider" aria-hidden="true" />

      <div className="txp-card__evidence">
        <span className="txp-card__evidence-label">
          Applied in
        </span>
        <div className="txp-card__evidence-list">
          {category.projects.map((project) => (
            <ProjectEvidence key={project.name} project={project} />
          ))}
        </div>
      </div>
    </Motion.article>
  );
}

function TechnologyStack() {
  const { language } = useLanguage();
  return (
    <div className="txp-stack" {...fadeUp(0.05)} aria-label="Technologies">
      <h3 className="txp-subheading">Technologies</h3>
      <div className="txp-stack__grid">
        {technologyStack.map((group) => (
          <div key={group.label.en} className="txp-stack__group">
            <h4 className="txp-stack__label">{pick(language, group.label)}</h4>
            <p className="txp-stack__items">{group.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LifecycleStrip() {
  const { language } = useLanguage();
  return (
    <div className="txp-lifecycle" aria-label="AI engineering lifecycle">
      <ol className="txp-lifecycle__flow">
        {lifecycleStages.map((stage, i) => (
          <React.Fragment key={stage.key}>
            {i > 0 && (
              <li className="txp-lifecycle__connector" aria-hidden="true">
                ↓
              </li>
            )}
            <li className="txp-lifecycle__stage">{stage.label}</li>
          </React.Fragment>
        ))}
      </ol>
      <p className="txp-lifecycle__caption">{pick(language, lifecycleCaption)}</p>
    </div>
  );
}

export function ExpertiseCards({ compact = false }) {
  const { language } = useLanguage();
  void language;
  const featured = expertiseCategories.filter((c) => c.featured);
  const rest = expertiseCategories.filter((c) => !c.featured);

  return (
    <>
      <div className={`txp__featured-row${compact ? ' txp__featured-row--compact' : ''}`}>
        {featured.map((category, i) => (
          <ExpertiseCard key={category.number} category={category} index={i} />
        ))}
      </div>
      <div className="txp__grid">
        {rest.map((category, i) => (
          <ExpertiseCard key={category.number} category={category} index={i + 0.5} />
        ))}
      </div>
    </>
  );
}

export function TechnologyStackBlock() {
  return <TechnologyStack />;
}

export default function TechnicalExpertise() {
  const { language } = useLanguage();

  return (
    <section id="skills" className="section txp" aria-labelledby="txp-title">
      <div className="section__container">
        <header className="txp__header">
          <Motion.p className="txp__eyebrow" {...fadeUp(0)}>
            {pick(language, expertiseHeader.eyebrow)}
          </Motion.p>
          <Motion.h2
            id="txp-title"
            className="section__title"
            {...fadeUp(0.05)}
          >
            {pick(language, expertiseHeader.title)}
          </Motion.h2>
          <Motion.p
            className="txp__subtitle"
            {...fadeUp(0.1)}
          >
            {pick(language, expertiseHeader.subtitle)}
          </Motion.p>
        </header>

        <ExpertiseCards />

        <LifecycleStrip />
        <TechnologyStackBlock />
      </div>
    </section>
  );
}
