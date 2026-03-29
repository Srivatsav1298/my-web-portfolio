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
            role: 'AI Engineer',
            tagline: 'Building systems at the intersection of AI and Data',
            chocolate: '',
            available: 'Available June 2026 · Oslo / Remote',
            yearsExp: '3+ Years Exp',
            aiData: 'AI & Data',
            viewWork: 'View Work',
            getInTouch: 'Get in Touch',
            scroll: 'Scroll',
            scrollTop: 'Scroll to top',
        },
        about: {
            title: 'About Vatsav',
            p1: 'Vatsav is an AI Engineer who turns complex data into practical, real-world systems. Over the past three years at Orion Innovation, he has built backend systems that scale reliably in production environments. He later moved into AI, where he focuses on developing systems that deliver measurable impact. He secured 3rd place at the AWS Norway GenAI Hackathon and has built financial AI agents powered by official Norwegian statistics. Currently pursuing a Master’s in Data Science at NMBU, he is driven by a clear goal: bridging the gap between advanced AI research and systems that people can actually use.',
            achievements: 'What I\'m Proud Of',
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
            role: 'AI-ingeniør',
            tagline: 'Bygger systemer i skjæringspunktet mellom AI og Data',
            chocolate: '',
            available: 'Tilgjengelig juni 2026 · Oslo / Fjernarbeid',
            yearsExp: '3+ års erfaring',
            aiData: 'AI & Data',
            viewWork: 'Se arbeid',
            getInTouch: 'Ta kontakt',
            scroll: 'Rull ned',
            scrollTop: 'Rull til toppen',
        },
        about: {
            title: 'Om Vatsav',
            p1: 'Vatsav er en AI-ingeniør som transformerer kompleks data til praktiske, virkelige systemer. I de siste tre årene hos Orion Innovation har han bygd backendsystemer som skalerer pålitelig i produksjonsmiljøer. Han gikk deretter over til AI, hvor han fokuserer på å utvikle systemer som leverer målbar effekt. Han sikret 3. plass i AWS Norway GenAI Hackathon og har bygget finans AI-agenter drevet av offisielle norske tall. Nå som han fullfører master i datavitenskap ved NMBU, er han drevet av et klart mål: å bygge bro mellom avansert AI-forskning og systemer som folk faktisk kan bruke.',
            achievements: 'Hva jeg er stolt av',
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
