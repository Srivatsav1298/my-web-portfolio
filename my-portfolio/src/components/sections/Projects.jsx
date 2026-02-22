import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/portfolioData';
import ProjectModal from '../ui/ProjectModal';
import {
  containerVariantsWide,
  titleVariants,
  lineVariants,
  sectionViewport,
  sectionLineStyle,
} from '../../utils/animations';
import '../../styles/sections.css';
import './ProjectsGallery.css';

const Projects = () => {
  const { t } = useLanguage();

  const filterCategories = [
    { id: 'all', label: t('projects.all') || 'All Projects', count: projects.length },
    { id: 'ai-ml', label: t('projects.ai') || 'AI & ML', count: projects.filter(p => p.category === 'ai-ml').length },
    { id: 'data-science', label: t('projects.data') || 'Data Science', count: projects.filter(p => p.category === 'data-science').length },
    { id: 'full-stack', label: t('projects.fullstack') || 'Full Stack', count: projects.filter(p => p.category === 'full-stack').length },
  ];
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
    setActiveIndex(0);
    if (galleryRef.current) {
      galleryRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap to nearest card
    const cardWidth = galleryRef.current.children[0].offsetWidth + 30;
    const newIndex = Math.round(galleryRef.current.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(newIndex, filteredProjects.length - 1)));
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollToCard = (index) => {
    if (!galleryRef.current || index < 0 || index >= filteredProjects.length) return;
    const cardWidth = galleryRef.current.children[0].offsetWidth + 30;
    galleryRef.current.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    scrollToCard(activeIndex - 1);
  };

  const handleNext = () => {
    scrollToCard(activeIndex + 1);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  // Update active index on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current || filteredProjects.length === 0) return;
      const cardWidth = galleryRef.current.children[0]?.offsetWidth + 30 || 0;
      const newIndex = Math.round(galleryRef.current.scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < filteredProjects.length) {
        setActiveIndex(newIndex);
      }
    };

    const gallery = galleryRef.current;
    if (gallery) {
      gallery.addEventListener('scroll', handleScroll);
      return () => gallery.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex, filteredProjects.length]);

  return (
    <section id="projects" className="section projects-section">
      <motion.div
        className="section__container"
        variants={containerVariantsWide}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <motion.div className="section__header" variants={titleVariants}>
          <h2 className="section__title">PROJECTS</h2>
          <motion.div
            className="section__line"
            variants={lineVariants}
            style={sectionLineStyle}
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filterCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`projects__filter-btn ${activeFilter === category.id ? 'projects__filter-btn--active' : ''
                }`}
              onClick={() => handleFilterChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="projects__filter-count">{category.count}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="gallery-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Navigation Arrows */}
            <button
              className="gallery-nav gallery-nav--prev"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="gallery-nav gallery-nav--next"
              onClick={handleNext}
              disabled={activeIndex === filteredProjects.length - 1}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            {/* Gallery */}
            <div
              ref={galleryRef}
              className={`gallery-container ${isDragging ? 'grabbing' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="gallery-card"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Card Number */}
                  <div className="gallery-card__number">
                    {String(index + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                  </div>

                  <div className="gallery-card__content">
                    {/* Left Side - Text */}
                    <div className="gallery-card__text">
                      <span className="gallery-card__tag">{project.categoryLabel}</span>
                      <h3 className="gallery-card__title">{project.title}</h3>
                      <p className="gallery-card__description">{project.description}</p>

                      {project.metrics && (
                        <div className="gallery-card__metrics">
                          {Object.entries(project.metrics).map(([key, value]) => (
                            <span key={key} className="gallery-card__metric">{value}</span>
                          ))}
                        </div>
                      )}

                      <div className="gallery-card__tags">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="gallery-card__tech-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="gallery-card__actions">
                        <button
                          onClick={() => openModal(project)}
                          className="gallery-card__btn gallery-card__btn--primary"
                        >
                          {t('ui.caseStudy')} <Info size={16} />
                        </button>
                        <a
                          href={project.github}
                          className="gallery-card__btn gallery-card__btn--secondary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} /> GitHub
                        </a>
                      </div>
                    </div>

                    {/* Right Side - Visual */}
                    <div className="gallery-card__visual">
                      {project.image ? (
                        <div className="gallery-card__image-container">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="gallery-card__project-image"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className={`gallery-card__icon-wrapper gallery-card__icon--${project.category}`}>
                          <span className="gallery-card__icon-emoji">{getProjectIcon(project.title)}</span>
                          <div className="gallery-card__shape gallery-card__shape--1"></div>
                          <div className="gallery-card__shape gallery-card__shape--2"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Drag Hint */}
                  <div className="gallery-card__drag-hint">
                    <span>Drag to explore</span>
                    <span className="drag-icon">←→</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="gallery-dots">
              {filteredProjects.map((_, index) => (
                <button
                  key={index}
                  className={`gallery-dot ${index === activeIndex ? 'gallery-dot--active' : ''}`}
                  onClick={() => scrollToCard(index)}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="gallery-progress">
              <div
                className="gallery-progress__bar"
                style={{ width: `${((activeIndex + 1) / filteredProjects.length) * 100}%` }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </motion.div>
    </section>
  );
};

export default Projects;
