import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
    const { t } = useLanguage();
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="project-modal-overlay">
                    <motion.div
                        className="project-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="project-modal-container"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <button className="project-modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className="project-modal-content">
                            {/* Left Column: Visuals & Links */}
                            <div className="project-modal-visuals">
                                <div className="project-modal-image-wrapper">
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} />
                                    ) : (
                                        <div className="project-modal-placeholder">
                                            <span>{project.title.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="project-modal-image-glow" />
                                </div>

                                <div className="project-modal-actions">
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="modal-btn modal-btn--primary">
                                        <ExternalLink size={18} /> {t('ui.liveDemo')}
                                    </a>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-btn modal-btn--secondary">
                                        <Github size={18} /> {t('ui.sourceCode')}
                                    </a>
                                </div>

                                <div className="project-modal-tech-stack">
                                    <h4>{t('ui.techStack')}</h4>
                                    <div className="tech-tags">
                                        {project.details?.techStack.map(tech => (
                                            <span key={tech} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Narrative */}
                            <div className="project-modal-info">
                                <span className="modal-category">{project.categoryLabel}</span>
                                <h2 className="modal-title">{project.title}</h2>

                                <div className="modal-section">
                                    <h3><Target size={18} /> {t('ui.problem')}</h3>
                                    <p>{project.details?.problem}</p>
                                </div>

                                <div className="modal-section">
                                    <h3><Lightbulb size={18} /> {t('ui.solution')}</h3>
                                    <p>{project.details?.solution}</p>
                                </div>

                                <div className="modal-section">
                                    <h3><Cpu size={18} /> {t('ui.highlights')}</h3>
                                    <ul className="highlights-list">
                                        {project.details?.highlights.map((item, i) => (
                                            <li key={i}>
                                                <CheckCircle2 size={16} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {project.details?.techSnippet && (
                                    <div className="modal-section modal-section--code">
                                        <div className="code-header">
                                            <span className="code-dot red" />
                                            <span className="code-dot yellow" />
                                            <span className="code-dot green" />
                                            <span className="code-title">{project.details.techSnippet.title}</span>
                                        </div>
                                        <pre className="code-block">
                                            <code>{project.details.techSnippet.code}</code>
                                        </pre>
                                    </div>
                                )}

                                {project.metrics && (
                                    <div className="modal-metrics">
                                        {Object.entries(project.metrics).map(([key, value]) => (
                                            <div key={key} className="metric-box">
                                                <span className="metric-value">{value}</span>
                                                <span className="metric-label">{key}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
