import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'text'
    const cursorRef = useRef(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring physics for the cursor
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isPointer = window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a');

            const isText = target.tagName === 'P' ||
                target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'H3' ||
                target.tagName === 'SPAN';

            if (isPointer) {
                setIsHovering(true);
                setCursorType('pointer');
            } else if (isText) {
                setCursorType('text');
            } else {
                setIsHovering(false);
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="custom-cursor-wrapper">
            {/* Outer Ring */}
            <motion.div
                className={`custom-cursor-outer ${isHovering ? 'custom-cursor-outer--hover' : ''} cursor-${cursorType}`}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Inner Dot / Node */}
            <motion.div
                className="custom-cursor-inner"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0.5 : 1,
                }}
            />

            {/* Connectivity Tracer (Subtle trailing nodes) */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        className="cursor-connectivity-ring"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 0.2, 0], scale: [0.5, 1.5, 2] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                            x: mouseX,
                            y: mouseY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomCursor;
