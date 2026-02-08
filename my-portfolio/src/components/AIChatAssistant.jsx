import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import {
  personalInfo,
  skillCategories,
  projects,
  experienceData,
  education,
  certifications,
} from '../data/portfolioData';
import './AIChatAssistant.css';

// Build knowledge base from centralized data
const knowledgeBase = {
  name: personalInfo.name,
  role: personalInfo.role,
  education,
  location: personalInfo.location,
  skills: {
    backend: skillCategories.find(s => s.id === 'backend')?.items || [],
    datascience: skillCategories.find(s => s.id === 'data')?.items || [],
    databases: skillCategories.find(s => s.id === 'database')?.items || [],
    cloud: skillCategories.find(s => s.id === 'cloud')?.items || [],
    dev: skillCategories.find(s => s.id === 'dev')?.items || [],
    ai: skillCategories.find(s => s.id === 'ai')?.items || [],
  },
  certifications,
  projects: projects.map(p => ({
    name: p.title,
    tech: p.tags.slice(0, 3),
    desc: p.description.split('.')[0],
  })),
  experience: experienceData
    .filter(e => e.type === 'work')
    .map(e => ({
      role: e.title,
      company: e.company,
      period: e.year,
      desc: e.description.split('.')[0],
    })),
  languages: personalInfo.languages,
  contact: {
    email: personalInfo.email,
    linkedin: personalInfo.linkedin,
  },
};

// Intent patterns and responses
const intents = [
  {
    patterns: [/hi|hello|hey|howdy|greetings/i],
    responses: [
      "Hello! I'm Starc, Vatsav's AI assistant. How can I help you learn more about his work?",
      "Hey there! Ask me anything about Vatsav's skills, projects, or experience.",
      "Hi! I'm Starc, here to help you explore Vatsav's portfolio. What would you like to know?",
    ],
  },
  {
    patterns: [/who is|about|tell me about|introduce/i],
    responses: [
      `${knowledgeBase.name} is a Data Science graduate student at NMBU, Norway, with 4 years of software engineering experience at Orion Innovation. He specializes in Python, data analytics, and AI applications.`,
    ],
  },
  {
    patterns: [/experience|work|job|orion|company/i],
    responses: [
      `Vatsav's professional experience:\n\n${knowledgeBase.experience.map(e => `• ${e.role} at ${e.company} (${e.period}): ${e.desc}`).join('\n\n')}`,
    ],
  },
  {
    patterns: [/skill|tech|stack|know|proficient|expertise/i],
    responses: [
      `Vatsav's technical expertise:\n\n• Backend: ${knowledgeBase.skills.backend.join(', ')}\n• Data Science: ${knowledgeBase.skills.datascience.slice(0, 4).join(', ')}\n• Cloud: ${knowledgeBase.skills.cloud.slice(0, 4).join(', ')}\n• AI: ${knowledgeBase.skills.ai.join(', ')}`,
    ],
  },
  {
    patterns: [/python|flask|backend/i],
    responses: [
      "Python is Vatsav's primary language! He uses it extensively for backend development (Flask, RestAPI), data science (Pandas, Matplotlib), and AI applications (LangChain, LLaMA). He built scalable microservices at Orion Innovation.",
    ],
  },
  {
    patterns: [/ai|langchain|llm|llama|claude/i],
    responses: [
      `Vatsav has strong AI/LLM skills:\n\n• LangChain for building AI agents\n• LLM APIs: Claude, LLaMA\n• Built Financial AI Agent with SSB data\n• 3rd Place at AWS Norway GenAI Hackathon`,
    ],
  },
  {
    patterns: [/data|pandas|analytics|matplotlib/i],
    responses: [
      `Vatsav's Data Science stack:\n\n• Analysis: Pandas, Data Modeling, Data Analytics\n• Visualization: Matplotlib, Seaborn\n• Processing: PySpark, ETL pipelines\n• Built Energy Analytics Dashboard processing 1M+ records`,
    ],
  },
  {
    patterns: [/project|work|built|portfolio|showcase/i],
    responses: [
      `Here are Vatsav's notable projects:\n\n${knowledgeBase.projects.map(p => `• ${p.name}: ${p.desc} (${p.tech.join(', ')})`).join('\n\n')}`,
    ],
  },
  {
    patterns: [/cloud|aws|azure|docker|devops/i],
    responses: [
      `Vatsav's Cloud & DevOps skills:\n\n• Azure: App Services, Cloud Architecture\n• AWS: S3, CloudFront, Route 53\n• Docker & CI/CD pipelines\n• Built AV Danse platform with 99.99% uptime`,
    ],
  },
  {
    patterns: [/database|sql|postgres/i],
    responses: [
      `Vatsav's database expertise:\n\n• SQL & PostgreSQL\n• Data Modelling\n• Teaching Assistant for DBMS at NMBU\n• Mentored 40+ students in SQL optimization`,
    ],
  },
  {
    patterns: [/education|degree|college|nmbu|university|masters/i],
    responses: [
      `Education:\n\n• ${knowledgeBase.education.masters}\n  Coursework: Python, Data-to-Decision, SQL\n\n• ${knowledgeBase.education.bachelors}\n  Coursework: Software Engineering, Web Dev, System Design`,
    ],
  },
  {
    patterns: [/certif|award|hackathon/i],
    responses: [
      `Vatsav's certifications & awards:\n\n${knowledgeBase.certifications.map(c => `• ${c}`).join('\n')}`,
    ],
  },
  {
    patterns: [/contact|email|reach|hire|connect|linkedin/i],
    responses: [
      `You can connect with Vatsav:\n\n• Email: ${knowledgeBase.contact.email}\n• LinkedIn: ${knowledgeBase.contact.linkedin}\n• Location: ${knowledgeBase.location}\n\nFeel free to reach out!`,
    ],
  },
  {
    patterns: [/language|norwegian|english/i],
    responses: [
      `Languages:\n\n• ${knowledgeBase.languages.join('\n• ')}\n\nVatsav is currently studying in Norway and improving his Norwegian language skills.`,
    ],
  },
  {
    patterns: [/thank|thanks|bye|goodbye/i],
    responses: [
      "You're welcome! Feel free to ask if you have more questions. Have a great day!",
      "Glad I could help! Don't hesitate to reach out to Vatsav directly for more detailed discussions.",
    ],
  },
  {
    patterns: [/help|what can you|how do i|options/i],
    responses: [
      "I can help you learn about:\n\n• Vatsav's skills (Python, Data Science, AI, Cloud)\n• His projects (Oil Spill Simulation, Energy Analytics, AI Agent)\n• Work experience at Orion Innovation\n• Education at NMBU, Norway\n• How to contact him\n\nJust ask naturally!",
    ],
  },
];

// Default fallback responses
const fallbackResponses = [
  "I'm not sure about that specific topic, but I'd be happy to tell you about Vatsav's skills, projects, or experience at Orion Innovation and NMBU. What would you like to know?",
  "That's an interesting question! I'm best at answering questions about Vatsav's technical skills, projects, and background. Try asking about his data science or AI experience!",
  "I don't have information on that, but I can tell you all about Vatsav's expertise in Python, Data Science, Cloud, and AI. What interests you?",
];

// Suggested questions
const suggestedQuestions = [
  "What are his main skills?",
  "Tell me about his projects",
  "What's his experience?",
  "How can I contact him?",
];

function getResponse(message) {
  const lowerMessage = message.toLowerCase();

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (pattern.test(lowerMessage)) {
        const responses = intent.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// Simple text formatter (safe - only handles our predefined content)
function formatMessage(text) {
  return text.split('\n').map((line, i) => {
    // Handle bullet points
    if (line.startsWith('• ')) {
      const content = line.substring(2);
      const colonIndex = content.indexOf(':');
      if (colonIndex > 0) {
        const label = content.substring(0, colonIndex);
        const rest = content.substring(colonIndex + 1);
        return (
          <p key={i} className="chat-message__line chat-message__line--bullet">
            <strong>{label}:</strong>{rest}
          </p>
        );
      }
      return <p key={i} className="chat-message__line chat-message__line--bullet">{content}</p>;
    }
    return line ? <p key={i} className="chat-message__line">{line}</p> : <br key={i} />;
  });
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm Starc, Vatsav's AI assistant. Ask me about his skills, projects, or experience in Data Science and Software Engineering!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const response = getResponse(inputValue);

    setIsTyping(false);
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

  const handleSuggestionClick = (question) => {
    setInputValue(question);
    setTimeout(() => {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        text: question,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const response = getResponse(question);
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            type: 'bot',
            text: response,
            timestamp: new Date(),
          },
        ]);
      }, 800 + Math.random() * 700);
    }, 100);
    setInputValue('');
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
                  <h3 className="chat-window__title">AI Assistant</h3>
                  <span className="chat-window__status">
                    <span className="chat-window__status-dot" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-window__messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`chat-message chat-message--${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
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
                  <div className="chat-message__typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="chat-window__suggestions">
                {suggestedQuestions.map((question, i) => (
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
                placeholder="Ask about skills, projects, experience..."
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
