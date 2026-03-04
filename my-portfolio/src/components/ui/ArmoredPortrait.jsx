import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useSpring, useMotionValue, useTransform } from 'framer-motion';
import './ArmoredPortrait.css';

export default function ArmoredPortrait({ imageSrc }) {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();

    // Mouse tracking for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Springs for smooth, physical motion
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate normalized mouse position (-0.5 to 0.5)
        const normalizedX = (e.clientX - rect.left) / width - 0.5;
        const normalizedY = (e.clientY - rect.top) / height - 0.5;

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        controls.start("assembled");
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        controls.start("disassembled");
        mouseX.set(0);
        mouseY.set(0);
    };

    // Armor variants definitions for the cinematic lock-in
    const chestVariants = {
        disassembled: { y: "100%", opacity: 0, scale: 0.9, transition: { duration: 0.5, ease: "easeInOut" } },
        assembled: { y: "40%", opacity: 1, scale: 1, transition: { type: "spring", damping: 20, stiffness: 100, delay: 0.1 } }
    };

    const shoulderLeftVariants = {
        disassembled: { x: "-100%", y: "40%", opacity: 0, rotate: -20, transition: { duration: 0.4 } },
        assembled: { x: "-10%", y: "40%", opacity: 1, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 120, delay: 0.2 } }
    };

    const shoulderRightVariants = {
        disassembled: { x: "100%", y: "40%", opacity: 0, rotate: 20, transition: { duration: 0.4 } },
        assembled: { x: "10%", y: "40%", opacity: 1, rotate: 0, transition: { type: "spring", damping: 15, stiffness: 120, delay: 0.2 } }
    };

    const neckGuardVariants = {
        disassembled: { y: "50%", opacity: 0, scaleY: 0, transition: { duration: 0.3 } },
        assembled: { y: "20%", opacity: 1, scaleY: 1, transition: { type: "spring", damping: 20, stiffness: 100, delay: 0.3 } }
    };

    const helmetBaseVariants = {
        disassembled: { y: "-100%", opacity: 0, scale: 0.8, transition: { duration: 0.4 } },
        assembled: { y: "-15%", opacity: 1, scale: 1.05, transition: { type: "spring", damping: 18, stiffness: 110, delay: 0.4 } }
    };

    const facePlateVariants = {
        disassembled: { y: "-120%", rotateX: 45, opacity: 0, transition: { duration: 0.4 } },
        assembled: { y: "-15%", rotateX: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 120, delay: 0.6 } }
    };

    const eyeGlowVariants = {
        disassembled: { opacity: 0, scaleX: 0, filter: "blur(10px)", transition: { duration: 0.2 } },
        assembled: { opacity: 1, scaleX: 1, filter: "blur(0px)", transition: { duration: 0.4, delay: 0.8, ease: "circOut" } }
    };

    const arcReactorVariants = {
        disassembled: { opacity: 0, scale: 0, rotate: -180, transition: { duration: 0.3 } },
        assembled: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", damping: 10, stiffness: 80, delay: 0.5 } }
    };

    const nanoGridVariants = {
        disassembled: { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
        assembled: { opacity: 0.4, clipPath: "circle(100% at 50% 50%)", transition: { duration: 1, ease: "easeOut" } }
    };

    return (
        <motion.div
            ref={containerRef}
            className="armored-portrait__wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
        >
            <div className="armored-portrait__container">
                {/* The Base Image */}
                <motion.img
                    src={imageSrc}
                    alt="Portrait"
                    className="armored-portrait__base"
                    animate={controls}
                    variants={{
                        disassembled: { filter: "brightness(1) contrast(1) grayscale(0%)" },
                        assembled: { filter: "brightness(0.6) contrast(1.2) grayscale(40%)", transition: { duration: 0.8 } }
                    }}
                />

                {/* Nano grid backdrop (reveals over face/body) */}
                <motion.div
                    className="armored-portrait__nano-grid"
                    variants={nanoGridVariants}
                    initial="disassembled"
                    animate={controls}
                />

                <div className="armored-portrait__armor-layer">
                    {/* Shoulders */}
                    <motion.div className="armor-piece armor-shoulder armor-shoulder--left" variants={shoulderLeftVariants} initial="disassembled" animate={controls} />
                    <motion.div className="armor-piece armor-shoulder armor-shoulder--right" variants={shoulderRightVariants} initial="disassembled" animate={controls} />

                    {/* Neck Guard */}
                    <motion.div className="armor-piece armor-neck" variants={neckGuardVariants} initial="disassembled" animate={controls} />

                    {/* Chest Plate */}
                    <motion.div className="armor-piece armor-chest" variants={chestVariants} initial="disassembled" animate={controls}>
                        {/* Arc Reactor */}
                        <motion.div className="armor-arc-reactor" variants={arcReactorVariants}>
                            <div className="armor-arc-core" />
                            <div className="armor-arc-ring" />
                            <div className="armor-arc-glow" />
                        </motion.div>
                    </motion.div>

                    {/* Helmet Base */}
                    <motion.div className="armor-piece armor-helmet-base" variants={helmetBaseVariants} initial="disassembled" animate={controls} />

                    {/* Face Plate (slides down last to close) */}
                    <motion.div className="armor-piece armor-face-plate" variants={facePlateVariants} initial="disassembled" animate={controls}>
                        {/* Eyes */}
                        <div className="armor-eyes-container">
                            <motion.div className="armor-eye armor-eye--left" variants={eyeGlowVariants} />
                            <motion.div className="armor-eye armor-eye--right" variants={eyeGlowVariants} />
                        </div>
                        {/* Chin/Jaw details */}
                        <div className="armor-jaw-lines" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
