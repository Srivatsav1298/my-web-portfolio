import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        nav: {
            about: 'About',
            work: 'Work',
            skills: 'Skills',
            contact: 'Contact',
        },
        intro: {
            greeting: "I'm", // greeting comes from ThemeContext (e.g., "Good night")
            role: 'Software Engineer',
            tagline: 'Building systems at the intersection of AI and Data',
            chocolate: 'I absolutely adore chocolates! 🍫✨',
            yearsExp: '3+ Years Exp',
            aiData: 'AI & Data',
            viewWork: 'View Work',
            getInTouch: 'Get in Touch',
            scroll: 'Scroll',
        },
        about: {
            title: 'About Vatsav',
            p1: 'Vatsav is an engineer focused on building intelligent systems at the intersection of data and AI. His work spans from architecting scalable data pipelines to developing machine learning solutions that deliver real impact.',
            p2: 'With a foundation in full-stack development and data engineering, he approaches problems with both technical depth and product thinking. He believes the best systems are those that balance sophistication with simplicity.',
            p3: 'Currently, he is exploring the frontiers of AI engineering, from LLM applications to real-time data processing systems.',
        },
        projects: {
            title: 'Selected Work',
            all: 'All Projects',
            ai: 'AI & ML',
            data: 'Data Science',
            fullstack: 'Full Stack'
        },
        skills: {
            title: 'Core Expertise',
        },
        assistant: {
            greeting: "Hi! I'm Starc, Vatsav's AI assistant. I can tell you about his skills in AI/Data Science, his projects, or how to get in touch. What interests you?",
            placeholder: 'Ask Vatsav\'s AI...',
            clear: 'Clear',
            reset: 'Chat reset! How can I help you learn about Vatsav?',
        },
        hud: {
            status: 'STATUS: ONLINE',
            loc: 'LOC:',
            latency: 'LATENCY:',
            focus: 'FOCUS:',
            init: 'CORE_INITIALIZATION'
        },
        ui: {
            caseStudy: 'Case Study',
            sourceCode: 'Source Code',
            liveDemo: 'Live Demo',
            techStack: 'Tech Stack',
            problem: 'The Problem',
            solution: 'The Solution',
            highlights: 'Technical Highlights'
        }
    },
    no: {
        nav: {
            about: 'Om',
            work: 'Arbeid',
            skills: 'Ferdigheter',
            contact: 'Kontakt',
        },
        intro: {
            greeting: "er jeg", // "God kveld, er jeg Vatsav"
            role: 'Programvareutvikler',
            tagline: 'Bygger systemer i skjæringspunktet mellom AI og Data',
            chocolate: 'Jeg elsker sjokolade over alt på jord! 🍫✨',
            yearsExp: '3+ års erfaring',
            aiData: 'AI & Data',
            viewWork: 'Se arbeid',
            getInTouch: 'Ta kontakt',
            scroll: 'Rull ned',
        },
        about: {
            title: 'Om Vatsav',
            p1: 'Vatsav er en ingeniør fokusert på å bygge intelligente systemer i skjæringspunktet mellom data og AI. Hans arbeid spenner fra arkitektering av skalerbare datapipelines til utvikling av maskinlæringsløsninger som gir reell effekt.',
            p2: 'Med et fundament i fullstack-utvikling og datateknikk, tilnærmer han seg problemer med både teknisk dybde og produkttenking. Han tror de beste systemene er de som balanserer sofistikerthet med enkelhet.',
            p3: 'For øyeblikket utforsker han grensene for AI-ingeniørkunst, fra LLM-applikasjoner til sanntids databehandlingssystemer.',
        },
        projects: {
            title: 'Utvalgte prosjekter',
            all: 'Alle prosjekter',
            ai: 'AI & ML',
            data: 'Datavitenskap',
            fullstack: 'Fullstack'
        },
        skills: {
            title: 'Kjernekompetanse',
        },
        contact: {
            title: 'La oss koble til',
            subtitle: 'Interessert i å jobbe sammen eller bare vil si hei?',
            send: 'Send melding',
        },
        assistant: {
            greeting: "Hei! Jeg er Starc, Vatsavs AI-assistent. Jeg kan fortelle deg om hans ferdigheter innen AI/Datavitenskap, hans prosjekter, eller hvordan du kan komme i kontakt. Hva interesserer deg?",
            placeholder: 'Spør Vatsavs AI...',
            clear: 'Nullstill',
            reset: 'Chat tilbakestilt! Hvordan kan jeg hjelpe deg med å lære om Vatsav?',
        },
        hud: {
            status: 'STATUS: ONLINE',
            loc: 'STED:',
            latency: 'LATENS:',
            focus: 'FOKUS:',
            init: 'KJERNE_INITIALISERING'
        },
        ui: {
            caseStudy: 'Prosjektgjennomgang',
            sourceCode: 'Kildekode',
            liveDemo: 'Se demo',
            techStack: 'Teknologier',
            problem: 'Problemet',
            solution: 'Løsningen',
            highlights: 'Tekniske høydepunkter'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'no' : 'en'));
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            if (value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
