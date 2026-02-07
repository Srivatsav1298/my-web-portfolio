import React from 'react';
import { motion } from 'framer-motion';
import { Github, FileText, Sun } from 'lucide-react';
import '../../styles/glass.css';

const sidebarVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 1.5,
            duration: 1,
            ease: "easeOut"
        }
    }
};

const RightSidebar = () => {
    return (
        <motion.aside
            className="right-sidebar glass-panel"
            initial="hidden"
            animate="visible"
            variants={sidebarVariants}
        >
            <div className="sidebar-container">
                <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-link"
                    whileHover={{ scale: 1.1, color: "#fff" }}
                >
                    <Github size={24} />
                </motion.a>

                <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    className="sidebar-link"
                    whileHover={{ scale: 1.1, color: "#fff" }}
                >
                    <FileText size={24} />
                </motion.a>

                <motion.button
                    className="sidebar-link"
                    whileHover={{ scale: 1.1, color: "#fff" }}
                >
                    <Sun size={24} />
                </motion.button>
            </div>
        </motion.aside>
    );
};

export default RightSidebar;
