import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Moon, Sun, Monitor, Download, Mail,
    User, Briefcase, Code, FileText, ChevronRight,
    Globe
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import './CommandPalette.css';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);

    const { isDark, toggleTheme, resetToAutoTheme } = useTheme();
    const { toggleLanguage, t } = useLanguage();

    // Define commands
    const commands = [
        {
            group: 'Navigation',
            items: [
                { id: 'nav-intro', icon: <User size={16} />, label: 'Go to Home', action: () => scrollTo('intro') },
                { id: 'nav-about', icon: <FileText size={16} />, label: 'Go to About', action: () => scrollTo('about') },
                { id: 'nav-projects', icon: <Briefcase size={16} />, label: 'Go to Projects', action: () => scrollTo('projects') },
                { id: 'nav-skills', icon: <Code size={16} />, label: 'Go to Skills', action: () => scrollTo('skills') },
                { id: 'nav-contact', icon: <Mail size={16} />, label: 'Go to Contact', action: () => scrollTo('contact') },
            ],
        },
        {
            group: 'System',
            items: [
                { id: 'sys-theme-dark', icon: <Moon size={16} />, label: 'Switch to Dark Theme', action: toggleTheme },
                { id: 'sys-theme-light', icon: <Sun size={16} />, label: 'Switch to Light Theme', action: toggleTheme },
                { id: 'sys-theme-auto', icon: <Monitor size={16} />, label: 'Reset to Auto Theme', action: resetToAutoTheme },
                { id: 'sys-lang', icon: <Globe size={16} />, label: 'Toggle Language (EN/NO)', action: toggleLanguage },
            ],
        },
        {
            group: 'Actions',
            items: [
                { id: 'act-resume', icon: <Download size={16} />, label: 'Download Resume', action: downloadResume },
                { id: 'act-github', icon: <Code size={16} />, label: 'Open GitHub', action: () => window.open('https://github.com/Srivatsav1298', '_blank') },
                { id: 'act-linkedin', icon: <Briefcase size={16} />, label: 'Open LinkedIn', action: () => window.open('https://linkedin.com/in/srivatsav-saravanan', '_blank') },
            ],
        }
    ];

    // Helper functions
    function scrollTo(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function downloadResume() {
        const link = document.createElement('a');
        link.href = '/my-web-portfolio/resume.pdf';
        link.download = 'Vatsav_Saravanan_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Flatten items for filtering and keyboard navigation
    const flattenedItems = commands.flatMap(group => group.items);

    const filteredItems = query
        ? flattenedItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
        : flattenedItems;

    // Toggle shortcut listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Toggle on Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }

            // Close on Escape
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    // Keyboard navigation within palette
    const handleInputKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredItems[activeIndex]) {
                executeCommand(filteredItems[activeIndex]);
            }
        }
    };

    const executeCommand = (item) => {
        item.action();
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="command-palette-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        className="command-palette"
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="command-palette__search">
                            <Search size={18} className="command-palette__icon" />
                            <input
                                ref={inputRef}
                                className="command-palette__input"
                                placeholder="Type a command or search..."
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setActiveIndex(0);
                                }}
                                onKeyDown={handleInputKeyDown}
                            />
                            <span className="command-palette__help">ESC to close</span>
                        </div>

                        <div className="command-palette__content">
                            {filteredItems.length === 0 ? (
                                <div className="command-palette__empty">No results found for "{query}"</div>
                            ) : (
                                // When querying, show flat list. When empty query, show grouped.
                                query ? (
                                    <div>
                                        {filteredItems.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className={`command-palette__item ${index === activeIndex ? 'command-palette__item--active' : ''}`}
                                                onMouseEnter={() => setActiveIndex(index)}
                                                onClick={() => executeCommand(item)}
                                            >
                                                <span className="command-palette__item-icon">{item.icon}</span>
                                                <span className="command-palette__item-label">{item.label}</span>
                                                {index === activeIndex && <ChevronRight size={14} className="command-palette__item-icon" />}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    commands.map((group, groupIndex) => (
                                        <div key={group.group} className="command-palette__group">
                                            <div className="command-palette__group-title">{group.group}</div>
                                            {group.items.map((item) => {
                                                const absoluteIndex = flattenedItems.findIndex(i => i.id === item.id);
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={`command-palette__item ${absoluteIndex === activeIndex ? 'command-palette__item--active' : ''}`}
                                                        onMouseEnter={() => setActiveIndex(absoluteIndex)}
                                                        onClick={() => executeCommand(item)}
                                                    >
                                                        <span className="command-palette__item-icon">{item.icon}</span>
                                                        <span className="command-palette__item-label">{item.label}</span>
                                                        {absoluteIndex === activeIndex && <ChevronRight size={14} className="command-palette__item-icon" />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))
                                )
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
