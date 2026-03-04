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
            greeting: {
                morning: 'Good morning',
                afternoon: 'Good afternoon',
                evening: 'Good evening',
                night: 'Good night'
            },
            role: 'Software Engineer',
            tagline: 'Building systems at the intersection of AI and Data',
            chocolate: 'I absolutely adore chocolates! 🍫✨',
            yearsExp: '3+ Years Exp',
            aiData: 'AI & Data',
            viewWork: 'View Work',
            getInTouch: 'Get in Touch',
            scroll: 'Scroll',
            scrollTop: 'Scroll to top',
        },
        about: {
            title: 'About Vatsav',
            p1: 'Vatsav is a Software Engineer and Data Science student who builds stable, data-driven systems. With over three years of industry experience, he focuses on reliable backend architecture and practical machine learning applications. His core approach is to write clean, maintainable code that solves real problems without unnecessary complexity.',
        },
        projects: {
            title: 'Projects',
            all: 'All Projects',
            ai: 'AI & ML',
            data: 'Data Science',
            fullstack: 'Full Stack',
            drag: 'Drag to explore',
        },
        skills: {
            title: 'Technical Skills',
            networkView: 'Network View',
            gridView: 'Grid View',
            loading: 'Loading 3D visualization...',
        },
        contact: {
            whatsNext: "What's Next?",
            title: 'Get In Touch',
            text: "I'm currently pursuing my Master's in Data Science at NMBU, Norway and open to discussing opportunities, collaborations, or interesting projects. Feel free to reach out!",
            sayHello: 'Say Hello',
            form: {
                nameLabel: 'Name',
                namePlaceholder: 'Your full name',
                emailLabel: 'Email',
                emailPlaceholder: 'you@example.com',
                subjectLabel: 'Subject',
                subjectPlaceholder: 'Role, collaboration, or idea',
                messageLabel: 'Message',
                messagePlaceholder: 'Tell me about your project, role, or question...',
                websiteLabel: 'Website',
                send: 'Send Message',
                sending: 'Sending...',
                directEmail: 'Or email directly',
                required: 'This field is required.',
                invalidEmail: 'Please enter a valid email address.',
                messageMin: 'Please include at least 20 characters.',
                fixErrors: 'Please correct the highlighted fields.',
                defaultSubject: 'Portfolio inquiry',
                successApi: 'Thanks, your message has been sent successfully.',
                successMailto: 'Opening your email client to finish sending.',
                successFallback: 'Network submit failed. Opening your email client instead.',
            },
            footer: 'Designed & Built by Vatsav',
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
        },
        timeline: {
            present: 'Present',
            journeyBegins: 'Journey Begins',
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
            greeting: {
                morning: 'God morgen',
                afternoon: 'God ettermiddag',
                evening: 'God kveld',
                night: 'God natt'
            },
            role: 'Programvareutvikler',
            tagline: 'Bygger systemer i skjæringspunktet mellom AI og Data',
            chocolate: 'Jeg elsker sjokolade over alt på jord! 🍫✨',
            yearsExp: '3+ års erfaring',
            aiData: 'AI & Data',
            viewWork: 'Se arbeid',
            getInTouch: 'Ta kontakt',
            scroll: 'Rull ned',
            scrollTop: 'Rull til toppen',
        },
        about: {
            title: 'Om Vatsav',
            p1: 'Vatsav er en programvareutvikler og datavitenskap-student som bygger stabile, datadrevne systemer. Med over tre års bransjeerfaring fokuserer han på pålitelig backend-arkitektur og praktiske maskinlæringsapplikasjoner. Hans kjernetilnærming er å skrive ren, vedlikeholdbar kode som løser reelle problemer uten unødvendig kompleksitet.',
        },
        projects: {
            title: 'Prosjekter',
            all: 'Alle prosjekter',
            ai: 'AI & ML',
            data: 'Datavitenskap',
            fullstack: 'Fullstack',
            drag: 'Dra for å utforske',
        },
        skills: {
            title: 'Tekniske ferdigheter',
            networkView: 'Nettverksvisning',
            gridView: 'Rutenettvisning',
            loading: 'Laster 3D-visualisering...',
        },
        contact: {
            whatsNext: 'Hva skjer videre?',
            title: 'Ta kontakt',
            text: 'Jeg tar for øyeblikket en mastergrad i datavitenskap ved NMBU, Norge, og er åpen for å diskutere muligheter, samarbeid eller interessante prosjekter. Ta gjerne kontakt!',
            sayHello: 'Si hei',
            form: {
                nameLabel: 'Navn',
                namePlaceholder: 'Fullt navn',
                emailLabel: 'E-post',
                emailPlaceholder: 'deg@eksempel.no',
                subjectLabel: 'Emne',
                subjectPlaceholder: 'Stilling, samarbeid eller idé',
                messageLabel: 'Melding',
                messagePlaceholder: 'Fortell om prosjektet, rollen eller spørsmålet ditt...',
                websiteLabel: 'Nettside',
                send: 'Send melding',
                sending: 'Sender...',
                directEmail: 'Eller send e-post direkte',
                required: 'Dette feltet er påkrevd.',
                invalidEmail: 'Skriv inn en gyldig e-postadresse.',
                messageMin: 'Vennligst skriv minst 20 tegn.',
                fixErrors: 'Rett opp feltene som er markert.',
                defaultSubject: 'Henvendelse via portefølje',
                successApi: 'Takk, meldingen din er sendt.',
                successMailto: 'Åpner e-postklienten din for å fullføre sending.',
                successFallback: 'Nettverksinnsending feilet. Åpner e-postklienten i stedet.',
            },
            footer: 'Designet & bygget av Vatsav',
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
        },
        timeline: {
            present: 'Nå',
            journeyBegins: 'Reisen begynner',
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
