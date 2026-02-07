import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroTitle from './HeroTitle';
import HeroContent from './HeroContent';
import HeroCanvas from '../../canvas/HeroCanvas';
import './ScrollHero.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollHero = ({ navbarLogoRef, onLogoReady }) => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  const [isWaving, setIsWaving] = useState(false);
  const [isBright, setIsBright] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      const title = titleRef.current;
      const content = contentRef.current;
      const canvas = canvasRef.current;

      if (!container || !title || !content || !canvas) {
        return;
      }

      // Initial states
      gsap.set(canvas, { opacity: 1, x: 0, y: 0 });
      gsap.set(title, {
        opacity: 0,
        scale: 1,
        xPercent: -50,
        yPercent: -50,
        top: '50%',
        left: '50%'
      });
      gsap.set(content, { opacity: 0, x: -100 });

      // Create smooth scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2, // Higher value = smoother
          onUpdate: (self) => {
            const progress = self.progress;

            // Robot brightens as name appears (10-40%)
            setIsBright(progress > 0.1 && progress < 0.6);

            // Wave when content visible
            setIsWaving(progress > 0.5 && progress < 0.8);

            // Navbar logo visibility
            if (onLogoReady) {
              onLogoReady(progress > 0.5);
            }
          },
        },
      });

      // Timeline: Smooth animations

      // 0-20%: VATSAV fades in (behind robot due to z-index)
      tl.to(title, {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out',
      }, 0);

      // 25-50%: VATSAV scales down smoothly
      tl.to(title, {
        scale: 0.06,
        duration: 0.25,
        ease: 'power2.inOut',
      }, 0.25);

      // 30-55%: VATSAV moves up to navbar area
      tl.to(title, {
        top: '45px',
        yPercent: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      }, 0.30);

      // 35-55%: Robot slides right
      tl.to(canvas, {
        x: '22%',
        duration: 0.2,
        ease: 'power2.inOut',
      }, 0.35);

      // 40-60%: Content fades in from left
      tl.to(content, {
        opacity: 1,
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, 0.40);

      // 50-60%: VATSAV fades out (navbar takes over)
      tl.to(title, {
        opacity: 0,
        duration: 0.1,
        ease: 'power1.out',
      }, 0.50);

      // 60-100%: Subtle parallax
      tl.to(content, {
        y: -25,
        duration: 0.4,
        ease: 'none',
      }, 0.60);

      tl.to(canvas, {
        y: -15,
        duration: 0.4,
        ease: 'none',
      }, 0.60);

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [onLogoReady]);

  return (
    <section ref={containerRef} className="scroll-hero">
      <div ref={viewportRef} className="scroll-hero__viewport">
        {/* Background */}
        <div className="scroll-hero__gradient" />

        {/* VATSAV title - z-index: 5 (BEHIND robot) */}
        <HeroTitle ref={titleRef} />

        {/* Robot canvas - z-index: 10 (IN FRONT of title) */}
        <HeroCanvas
          ref={canvasRef}
          isWaving={isWaving}
          isBright={isBright}
        />

        {/* Content - z-index: 15 */}
        <HeroContent ref={contentRef} />

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-indicator__line" />
        </div>
      </div>
    </section>
  );
};

export default ScrollHero;
