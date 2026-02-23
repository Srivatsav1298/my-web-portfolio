import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  personalInfo,
  skillCategories,
  projects,
  experienceData,
  education,
  certifications,
} from '../data/portfolioData';
import './AIChatAssistant.css';

// ============================================
// ENHANCED NLP KNOWLEDGE BASE
// ============================================

const knowledgeBase = {
  name: personalInfo.name,
  role: personalInfo.role,
  education,
  location: personalInfo.location,
  email: personalInfo.email,
  linkedin: personalInfo.linkedin,
  languages: personalInfo.languages,

  // Flattened skills for easier search
  skills: skillCategories.flatMap(cat =>
    cat.items.map(item => ({
      name: typeof item === 'string' ? item : (item.name || ''),
      category: cat.category || cat.title || '',
      categoryId: cat.id
    }))
  ),

  // Detailed project info
  projects: projects.map(p => ({
    name: p.title,
    shortName: p.title.split(' ').slice(0, 2).join(' ').toLowerCase(),
    tech: p.tags,
    category: p.category,
    description: p.description,
    metrics: p.metrics || {},
  })),

  // Work experience
  experience: experienceData
    .filter(e => e.type === 'work')
    .map(e => ({
      role: e.title,
      company: e.company,
      period: e.year,
      description: e.description,
    })),

  certifications,
  funFacts: {
    en: "He absolutely loves chocolates! 🍫",
    no: "Han elsker sjokolade over alt på jord! 🍫"
  }
};

// ============================================
// ADVANCED INTENT CLASSIFICATION
// ============================================

const intentPatterns = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'morning', 'afternoon', 'evening', 'sup', 'yo', 'hei', 'hallo'],
    responses: (language) => language === 'no' ? [
      "Hei! Jeg er Starc, Vatsavs AI-assistent. Hvordan kan jeg hjelpe deg?",
      "Hei der! Spør meg om hva som helst angående Vatsavs arbeid.",
    ] : [
      `Hello! I'm Starc, ${knowledgeBase.name}'s AI assistant. How can I help you explore his portfolio?`,
      `Hey there! Ask me anything about ${knowledgeBase.name}'s work in AI, Data Science, and Software Engineering.`,
      `Hi! I'm here to help you learn about ${knowledgeBase.name}'s skills and projects. What interests you?`,
    ],
  },

  identity: {
    keywords: ['who are you', 'introduce yourself', 'starc identity', 'what is starc', 'vatsav bio'],
    responses: () => [
      `${knowledgeBase.name} is a ${knowledgeBase.role} currently pursuing his Master's at NMBU, Norway. He has 4 years of experience at Orion Innovation and specializes in Python, Data Science, and AI applications.`,
    ],
  },

  skills: {
    keywords: ['skill', 'tech', 'stack', 'know', 'proficient', 'expertise', 'technology', 'good at', 'capable', 'can you do', 'ferdighet', 'kan'],
    responses: (language, query) => {
      // Check for specific skill category
      const categories = {
        python: ['python', 'flask', 'backend'],
        data: ['data', 'pandas', 'analytics', 'matplotlib', 'visualization'],
        ai: ['ai', 'langchain', 'llm', 'machine learning', 'ml', 'artificial intelligence'],
        cloud: ['cloud', 'aws', 'azure', 'docker', 'devops'],
        database: ['database', 'sql', 'postgres', 'db'],
        web: ['web', 'frontend', 'react', 'javascript', 'html', 'css'],
      };

      for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some(k => query.includes(k))) {
          return getCategoryResponse(cat, language);
        }
      }

      if (language === 'no') {
        return [`Vatsavs tekniske ekspertise inkluderer:\n\n` +
          `• Backend: Python, Flask, RestAPI\n` +
          `• Datavitenskap: Pandas, NumPy, Matplotlib\n` +
          `• AI: LangChain, LLMs, Claude, LLaMA\n\n` +
          `Vil du ha detaljer om et spesifikt område?`];
      }

      return [`${knowledgeBase.name}'s technical expertise spans:\n\n` +
        `• Backend: Python, Flask, RestAPI\n` +
        `• Data Science: Pandas, NumPy, Matplotlib, Data Analytics\n` +
        `• AI/Machine Learning: LangChain, LLMs, Claude, LLaMA\n` +
        `• Cloud & DevOps: Azure, AWS, Docker, CI/CD\n` +
        `• Databases: SQL, PostgreSQL, Data Modeling\n\n` +
        `Want details on any specific area?`];
    },
  },

  projects: {
    keywords: ['project', 'work', 'built', 'portfolio', 'showcase', 'created', 'developed', 'made', 'oil', 'energy', 'financial', 'dance'],
    responses: (language, query) => {
      // Check for specific project
      const projectMatches = knowledgeBase.projects.filter(p =>
        query.includes(p.shortName.toLowerCase()) ||
        query.includes(p.name.toLowerCase()) ||
        (p.category && query.includes(p.category.toLowerCase()))
      );

      if (projectMatches.length === 1) {
        const p = projectMatches[0];
        const metrics = Object.entries(p.metrics).map(([k, v]) => v).join(' | ');
        return [`**${p.name}**\n\n${p.description}\n\nTechnologies: ${p.tech.join(', ')}${metrics ? `\nKey metrics: ${metrics}` : ''}`];
      }

      if (projectMatches.length > 1) {
        return [`I found ${projectMatches.length} relevant projects:\n\n` +
          projectMatches.map(p => `• **${p.name}**: ${p.description.slice(0, 80)}...`).join('\n\n') +
          `\n\nAsk about a specific one for more details!`];
      }

      return [`Here are ${knowledgeBase.name}'s key projects:\n\n` +
        knowledgeBase.projects.map(p => `• **${p.name}**: ${p.tech.slice(0, 3).join(', ')}`).join('\n\n') +
        `\n\nAsk me about any specific project for more details!`];
    },
  },

  experience: {
    keywords: ['experience', 'work', 'job', 'career', 'orion', 'company', 'employed', 'professional', 'history', 'background'],
    responses: () => [
      `${knowledgeBase.name}'s professional experience:\n\n` +
      knowledgeBase.experience.map(e =>
        `**${e.role}** at ${e.company}\n${e.period}: ${e.description.slice(0, 100)}...`
      ).join('\n\n'),
    ],
  },

  education: {
    keywords: ['education', 'degree', 'college', 'university', 'study', 'school', 'masters', 'bachelor', 'nmbu', 'learn'],
    responses: () => [
      `**Education:**\n\n` +
      `🎓 ${knowledgeBase.education.masters}\n` +
      `Courses: Python, Data-to-Decision, SQL\n\n` +
      `🎓 ${knowledgeBase.education.bachelors}\n` +
      `Courses: Software Engineering, System Design, Web Development`,
    ],
  },

  certifications: {
    keywords: ['certification', 'certified', 'award', 'hackathon', 'achievement', 'accomplishment', 'won', 'place'],
    responses: () => [
      `**Certifications & Achievements:**\n\n` +
      knowledgeBase.certifications.map(c => `• ${c}`).join('\n'),
    ],
  },

  contact: {
    keywords: ['contact', 'email', 'reach', 'hire', 'connect', 'linkedin', 'talk to', 'get in touch', 'message'],
    responses: () => [
      `You can connect with ${knowledgeBase.name}:\n\n` +
      `📧 ${knowledgeBase.email}\n` +
      `🔗 ${knowledgeBase.linkedin}\n` +
      `📍 ${knowledgeBase.location}\n\n` +
      `He's open to opportunities in Data Science, AI, and Software Engineering!`,
    ],
  },

  location: {
    keywords: ['where', 'location', 'live', 'based', 'from', 'norway', 'country', 'place'],
    responses: () => [
      `${knowledgeBase.name} is currently based in **${knowledgeBase.location}**, pursuing his Master's in Data Science at NMBU. He's originally from India and is currently learning Norwegian!`,
    ],
  },

  languages: {
    keywords: ['language', 'speak', 'english', 'norwegian', 'tamil', 'hindi', 'multilingual'],
    responses: () => [
      `${knowledgeBase.name} speaks:\n\n` +
      knowledgeBase.languages.map(l => `• ${l}`).join('\n') +
      `\n\nHe's actively improving his Norwegian while studying!`,
    ],
  },

  help: {
    keywords: ['help', 'what can', 'how do', 'options', 'assist', 'what do you', 'capabilities', 'features'],
    responses: () => [
      `I can help you with:\n\n` +
      `🔹 **Skills & Expertise** - Python, Data Science, AI, Cloud\n` +
      `🔹 **Projects** - Oil Spill Sim, Energy Dashboard, AI Agent\n` +
      `🔹 **Experience** - Orion Innovation, product development\n` +
      `🔹 **Education** - NMBU Master's, BS Computer Science\n` +
      `🔹 **Contact** - Email, LinkedIn, location\n\n` +
      `Just ask naturally! Try: "Tell me about his AI projects" or "What Python experience?"`,
    ],
  },

  thanks: {
    keywords: ['thank', 'thanks', 'appreciate', 'grateful', 'helpful'],
    responses: () => [
      "You're welcome! Feel free to ask more questions about Vatsav's work.",
      "Glad I could help! You can reach out to Vatsav directly for detailed discussions.",
    ],
  },

  goodbye: {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'ciao', 'farewell'],
    responses: () => [
      "Goodbye! Have a great day! 👋",
      "See you later! Feel free to come back if you have more questions.",
    ],
  },

  funFact: {
    keywords: ['chocolate', 'sjokolade', 'love', 'like', 'food'],
    responses: (language) => [knowledgeBase.funFacts[language] || knowledgeBase.funFacts.en],
  }
};

function getCategoryResponse(category, language = 'en') {
  const responses = {
    en: {
      python: `Python is ${knowledgeBase.name}'s primary language! He uses it for:\n\n• Backend development (Flask, RestAPI, Microservices)\n• Data Science (Pandas, NumPy, Matplotlib)\n• AI applications (LangChain, LLaMA, Claude integration)\n• 4+ years of professional experience at Orion Innovation`,
      data: `His Data Science expertise includes:\n\n• Analysis: Pandas, Data Modeling, Statistical Analysis\n• Visualization: Matplotlib, Seaborn, Dashboard Creation\n• Processing: PySpark, ETL Pipelines\n• Real-world project: Energy Analytics Dashboard with 1M+ Norwegian records`,
      ai: `${knowledgeBase.name}'s AI/ML capabilities:\n\n• LangChain for building intelligent agents\n• LLM integrations: Claude, LLaMA, OpenAI APIs\n• Built Financial AI Agent using SSB data\n• 3rd Place at AWS Norway GenAI Hackathon`,
      cloud: `Cloud & DevOps skills:\n\n• Azure: App Services, Cloud Architecture\n• AWS: S3, CloudFront, Route 53, Lambda\n• Docker containerization & CI/CD pipelines\n• Built AV Danse platform with high availability`,
      database: `Database expertise:\n\n• SQL & PostgreSQL (primary)\n• Data Modeling and Normalization\n• Query optimization and indexing\n• Teaching Assistant for DBMS at NMBU`,
      web: `Web Development skills:\n\n• Frontend: React, JavaScript, HTML/CSS\n• Backend: Flask, RESTful APIs\n• Full-stack projects including AV Danse Studio\n• Responsive design and modern UI patterns`,
    },
    no: {
      python: `Python er ${knowledgeBase.name}s hovedspråk! Han bruker det til:\n\n• Backend-utvikling (Flask, RestAPI, Mikrotjenester)\n• Datavitenskap (Pandas, NumPy, Matplotlib)\n• AI-applikasjoner (LangChain, LLaMA, Claude-integrasjon)\n• Over 3 års erfaring`,
      data: `Hans kompetanse innen datavitenskap inkluderer:\n\n• Analyse: Pandas, Datamodellering, Statistisk analyse\n• Visualisering: Matplotlib, Seaborn\n• Behandling: PySpark, ETL-pipelines`,
      ai: `${knowledgeBase.name}s AI/ML-kapasiteter:\n\n• LangChain for å bygge intelligente agenter\n• LLM-integrasjoner: Claude, LLaMA, OpenAI APIs\n• Bygget finansiell AI-agent med SSB-data`,
    }
  };

  const langResponses = responses[language] || responses.en;
  return [langResponses[category] || langResponses.python];
}

// ============================================
// DYNAMIC FACT BASE (For unexpected questions)
// ============================================

const flatFacts = [
  ...knowledgeBase.skills.map(s => ({ type: 'skill', text: `${s.name} is a ${s.category} skill.` })),
  ...knowledgeBase.projects.map(p => ({ type: 'project', text: `**${p.name}**: ${p.description}\nTechnologies: ${p.tech.join(', ')}` })),
  ...knowledgeBase.experience.map(e => ({ type: 'experience', text: `**${e.role} at ${e.company}** (${e.period}): ${e.description}` })),
  ...knowledgeBase.certifications.map(c => ({ type: 'certification', text: `Achievement: ${c}` })),
  { type: 'education', text: `Education: ${knowledgeBase.education.masters} & ${knowledgeBase.education.bachelors}` },
  { type: 'location', text: `Location: ${knowledgeBase.location}` },
  { type: 'contact', text: `Contact: ${knowledgeBase.email} | ${knowledgeBase.linkedin}` },
  { type: 'identity', text: `${knowledgeBase.name} is a ${knowledgeBase.role}` },
];

// ============================================
// INTELLIGENT QUERY PROCESSING
// ============================================

function calculateSimilarity(query, keywords) {
  if (!keywords || !Array.isArray(keywords)) return 0;
  const words = query.toLowerCase().split(/\s+/);
  let matches = 0;

  for (const keyword of keywords) {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    for (const kw of keywordWords) {
      if (words.some(w => w.includes(kw) || kw.includes(w))) {
        matches++;
      }
    }
  }

  return matches / Math.max(words.length, 1);
}

function extractEntities(query) {
  const entities = {
    skills: [],
    projects: [],
    companies: [],
    technologies: [],
  };

  const q = query.toLowerCase();

  // Extract skills
  knowledgeBase.skills.forEach(skill => {
    if (skill.name && typeof skill.name === 'string' && q.includes(skill.name.toLowerCase())) {
      entities.skills.push(skill);
    }
  });

  // Extract projects
  knowledgeBase.projects.forEach(project => {
    if (query.includes(project.shortName.toLowerCase()) || project.name.toLowerCase().split(' ').some(word => word.length > 3 && query.includes(word.toLowerCase()))) {
      entities.projects.push(project);
    }
  });

  return entities;
}

function findBestIntent(query) {
  let bestIntent = null;
  let bestScore = 0;

  for (const [intentName, intentData] of Object.entries(intentPatterns)) {
    const score = calculateSimilarity(query, intentData.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = { name: intentName, data: intentData };
    }
  }

  // Also check for project/technology matches
  const entities = extractEntities(query);
  if (entities.projects.length > 0 && bestScore < 0.3) {
    return { name: 'projects', data: intentPatterns.projects };
  }

  return bestIntent;
}

function getResponse(query, language = 'en') {
  const lowerQuery = query.toLowerCase().trim();

  // Empty query
  if (!lowerQuery) {
    return language === 'no' ? "Jeg er her for å hjelpe! Spør meg om Vatsavs ferdigheter." : "I'm here to help! Ask me about Vatsav's skills, projects, or experience.";
  }

  // Find best matching intent
  const intent = findBestIntent(lowerQuery);

  if (intent) {
    // If it's a fun fact or has enough similarity
    if (intent.name === 'funFact' || calculateSimilarity(lowerQuery, intent.data.keywords || []) > 0.08) {
      const responses = intent.data.responses(language, lowerQuery);
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Check for partial matches (keywords in query)
  for (const [name, data] of Object.entries(intentPatterns)) {
    if (data.keywords.some(k => lowerQuery.includes(k) && k.length > 3)) {
      const responses = data.responses(language, lowerQuery);
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // DYNAMIC FACT SEARCH (Handles any dynamic question)
  const queryWords = lowerQuery.split(/[^a-z0-9]+/);
  let bestFacts = [];

  for (const fact of flatFacts) {
    let score = 0;
    const factLower = fact.text.toLowerCase();

    for (const w of queryWords) {
      // Ignore common stop words
      if (['what', 'who', 'how', 'when', 'why', 'is', 'the', 'a', 'an', 'and', 'or', 'do', 'does', 'did', 'can', 'could'].includes(w)) continue;

      if (w.length > 2 && factLower.includes(w)) {
        score += w.length; // Weight longer word matches higher
      }
    }

    if (score > 0) {
      bestFacts.push({ ...fact, score });
    }
  }

  if (bestFacts.length > 0) {
    // Sort descending by score
    bestFacts.sort((a, b) => b.score - a.score);
    // Take top 2 most relevant facts
    const topFacts = bestFacts.slice(0, 2);

    if (language === 'no') {
      return `Basert på min kunnskapsbase, fant jeg dette for deg:\n\n` + topFacts.map(f => `• ${f.text}`).join('\n\n');
    } else {
      return `Based on my analysis, here is what I found:\n\n` + topFacts.map(f => `• ${f.text}`).join('\n\n') + `\n\nCan I provide more details on any of these?`;
    }
  }

  // Fallback with context-aware suggestions
  return getContextualFallback(lowerQuery, language);
}

function getContextualFallback(query, language) {
  if (language === 'no') {
    return `Jeg er ikke sikker på om jeg forstod det helt. Vatsavs portefølje fokuserer på Datavitenskap, AI og Programvareutvikling. Prøv å spørre:\n\n` +
      `• "Hva er hans ferdigheter?"\n` +
      `• "Fortell meg om hans prosjekter"\n` +
      `• "Hva er hans erfaring?"\n` +
      `• "Hvordan kan jeg kontakte ham?"`;
  }

  const suggestions = [];

  if (query.length > 10) {
    suggestions.push("I understand you're asking about something specific");
    suggestions.push("Could you rephrase? Try asking about:");
  } else {
    suggestions.push("I'm not sure I understood that correctly");
  }

  return `${suggestions[0]}. ${knowledgeBase.name}'s portfolio focuses on Data Science, AI, and Software Engineering. Try asking:\n\n` +
    `• "What are his skills?"\n` +
    `• "Tell me about his projects"\n` +
    `• "What's his experience?"\n` +
    `• "How can I contact him?"`;
}

// ============================================
// MESSAGE FORMATTING
// ============================================

function formatMessage(text) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Empty line
    if (!line.trim()) {
      elements.push(<br key={key++} />);
      continue;
    }

    // Bold headers (lines starting with ** or containing **)
    if (line.startsWith('**') && line.endsWith('**')) {
      const content = line.slice(2, -2);
      elements.push(
        <p key={key++} className="chat-message__line chat-message__line--header">
          {content}
        </p>
      );
      continue;
    }

    // Bullet points with bold labels
    if (line.startsWith('• ')) {
      const content = line.substring(2);
      const colonIndex = content.indexOf(':');

      if (colonIndex > 0 && !content.startsWith('**')) {
        const label = content.substring(0, colonIndex);
        const rest = content.substring(colonIndex + 1);
        elements.push(
          <p key={key++} className="chat-message__line chat-message__line--bullet">
            <strong>{label}:</strong>{rest}
          </p>
        );
      } else {
        elements.push(
          <p key={key++} className="chat-message__line chat-message__line--bullet">
            {formatInlineBold(content)}
          </p>
        );
      }
      continue;
    }

    // Section headers (emoji + text)
    if (/^[🔹🎓📧🔗📍•]/.test(line)) {
      elements.push(
        <p key={key++} className="chat-message__line chat-message__line--section">
          {line}
        </p>
      );
      continue;
    }

    // Regular line with inline bold
    elements.push(
      <p key={key++} className="chat-message__line">
        {formatInlineBold(line)}
      </p>
    );
  }

  return elements;
}

function formatInlineBold(text) {
  if (!text.includes('**')) return text;

  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// ============================================
// SUGGESTED QUESTIONS (DYNAMIC)
// ============================================

const suggestedQuestions = {
  en: [
    "What are his main skills?",
    "Tell me about his projects",
    "What's his experience at Orion?",
    "What AI projects has he built?",
    "How can I contact him?",
  ],
  no: [
    "Hva er hans ferdigheter?",
    "Fortell meg om hans prosjekter",
    "Hva er hans erfaring?",
    "Hvilke AI-prosjekter har han bygget?",
    "Hvordan kan jeg kontakte ham?",
  ]
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function AIChatAssistant() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const initialMessage = useMemo(() => ({
    id: 1,
    type: 'bot',
    text: t('assistant.greeting'),
    timestamp: new Date(),
  }), [t]);

  const [messages, setMessages] = useState([initialMessage]);

  // Update initial message when language changes if it's the only one
  useEffect(() => {
    if (messages.length === 1 && messages[0].type === 'bot') {
      setMessages([initialMessage]);
    }
  }, [language, initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const thoughts = useMemo(() => language === 'no' ? [
    "Analyserer spørring...",
    "Søker i Vatsavs kunnskapsbase...",
    "Evaluerer relevante prosjekter...",
    "Syntetiserer svar...",
    "Validerer tekniske detaljer..."
  ] : [
    "Analyzing query intent...",
    "Searching Vatsav's knowledge base...",
    "Evaluating relevant projects & skills...",
    "Synthesizing response...",
    "Validating technical accuracy..."
  ], [language]);

  const runThoughtCycle = async (duration) => {
    const cycleCount = Math.floor(duration / 600);
    for (let i = 0; i < cycleCount; i++) {
      setCurrentThought(thoughts[i % thoughts.length]);
      await new Promise(r => setTimeout(r, 600));
    }
  };

  const handleSend = async () => {
    const query = inputValue.trim();
    if (!query) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const responseRaw = getResponse(query, language);
    const response = typeof responseRaw === 'string' ? responseRaw : "I couldn't process that request correctly.";
    const typingDelay = Math.min(1200 + response.length * 5, 2500);

    // Run the reasoning terminal
    await runThoughtCycle(typingDelay);

    setIsTyping(false);
    setCurrentThought('');
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        type: 'bot',
        text: response,
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = async (question) => {
    setInputValue(question);
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: question,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const responseRaw = getResponse(question, language);
    const response = typeof responseRaw === 'string' ? responseRaw : "I couldn't process that request correctly.";
    const typingDelay = Math.min(1000 + response.length * 5, 2000);

    await runThoughtCycle(typingDelay);

    setIsTyping(false);
    setCurrentThought('');
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        type: 'bot',
        text: response,
        timestamp: new Date(),
      },
    ]);
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      type: 'bot',
      text: t('assistant.reset'),
      timestamp: new Date(),
    }]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? '0 0 0 rgba(150, 150, 155, 0)'
            : ['0 0 0 rgba(150, 150, 155, 0)', '0 0 20px rgba(150, 150, 155, 0.3)', '0 0 0 rgba(150, 150, 155, 0)'],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="chat-toggle__icon"
            >
              <MessageCircle size={24} />
              <Sparkles size={12} className="chat-toggle__sparkle" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="chat-window__header">
              <div className="chat-window__header-info">
                <div className="chat-window__avatar">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="chat-window__title">Starc</h3>
                  <span className="chat-window__status">
                    <span className="chat-window__status-dot" />
                    AI Assistant
                  </span>
                </div>
              </div>
              {messages.length > 2 && (
                <button className="chat-window__clear" onClick={clearChat} title={t('assistant.clear')}>
                  {t('assistant.clear')}
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="chat-window__messages">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`chat-message chat-message--${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0 : 0 }}
                >
                  <div className="chat-message__content">
                    {formatMessage(message.text)}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="chat-message chat-message--bot"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="chat-message__content">
                    <div className="chat-message__reasoning">
                      <span className="reasoning-dot" />
                      <span className="reasoning-text">{currentThought}</span>
                    </div>
                    <div className="chat-message__typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {!isTyping && messages.length <= 3 && (
              <div className="chat-window__suggestions">
                {suggestedQuestions[language].slice(0, 3).map((question, i) => (
                  <motion.button
                    key={i}
                    className="chat-suggestion"
                    onClick={() => handleSuggestionClick(question)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="chat-window__input-container">
              <input
                ref={inputRef}
                type="text"
                className="chat-window__input"
                placeholder={t('assistant.placeholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <motion.button
                className="chat-window__send"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
