import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import './AIChatAssistant.css';

// Knowledge base about Vatsav
const knowledgeBase = {
  name: 'Vatsav',
  role: 'Software Engineer',
  experience: '3+ years',
  focus: 'AI and Data Engineering',
  skills: {
    languages: ['Python', 'JavaScript', 'SQL'],
    data: ['Apache Spark', 'Kafka', 'Airflow', 'Pandas', 'dbt', 'Snowflake', 'BigQuery'],
    ai: ['PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Hugging Face', 'RAG'],
    cloud: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    frontend: ['React', 'Node.js', 'FastAPI'],
  },
  projects: [
    { name: 'Data Pipeline Platform', tech: ['Spark', 'Airflow', 'AWS'], desc: 'Scalable ETL pipelines processing millions of records' },
    { name: 'LLM-Powered Analytics', tech: ['LangChain', 'OpenAI', 'FastAPI'], desc: 'AI assistant for automated document analysis' },
    { name: 'Real-time Dashboard', tech: ['Kafka', 'React', 'PostgreSQL'], desc: 'Live streaming data visualization' },
  ],
  contact: {
    email: 'contact@vatsav.dev',
    github: 'github.com/vatsav',
    linkedin: 'linkedin.com/in/vatsav',
  },
};

// Intent patterns and responses
const intents = [
  {
    patterns: [/hi|hello|hey|howdy|greetings/i],
    responses: [
      "Hello! I'm Vatsav's AI assistant. How can I help you learn more about his work?",
      "Hey there! Ask me anything about Vatsav's skills, projects, or experience.",
      "Hi! I'm here to help you explore Vatsav's portfolio. What would you like to know?",
    ],
  },
  {
    patterns: [/who is|about|tell me about|introduce/i],
    responses: [
      `${knowledgeBase.name} is a ${knowledgeBase.role} with ${knowledgeBase.experience} of experience, focused on building intelligent systems at the intersection of ${knowledgeBase.focus}.`,
    ],
  },
  {
    patterns: [/experience|years|how long|background/i],
    responses: [
      `Vatsav has ${knowledgeBase.experience} of professional experience in software engineering, specializing in data pipelines, AI/ML systems, and full-stack development.`,
    ],
  },
  {
    patterns: [/skill|tech|stack|know|proficient|expertise/i],
    responses: [
      `Vatsav's technical expertise spans multiple domains:\n\n• Languages: ${knowledgeBase.skills.languages.join(', ')}\n• Data Engineering: ${knowledgeBase.skills.data.slice(0, 4).join(', ')}\n• AI/ML: ${knowledgeBase.skills.ai.slice(0, 4).join(', ')}\n• Cloud: ${knowledgeBase.skills.cloud.join(', ')}`,
    ],
  },
  {
    patterns: [/python/i],
    responses: [
      "Python is Vatsav's primary language! He uses it extensively for data engineering (Pandas, Spark), AI/ML (PyTorch, TensorFlow, LangChain), and backend development (FastAPI). It's at the core of most of his projects.",
    ],
  },
  {
    patterns: [/ai|machine learning|ml|llm|gpt|langchain|openai/i],
    responses: [
      `Vatsav is deeply experienced in AI/ML:\n\n• LLMs: Building applications with LangChain, OpenAI API, and RAG architectures\n• Deep Learning: PyTorch and TensorFlow for model development\n• NLP: Text processing, embeddings, and semantic search\n\nHe's particularly passionate about making AI practical and accessible.`,
    ],
  },
  {
    patterns: [/data|pipeline|etl|spark|kafka|airflow/i],
    responses: [
      `Data Engineering is one of Vatsav's core strengths:\n\n• Processing: Apache Spark for large-scale data processing\n• Orchestration: Airflow for workflow management\n• Streaming: Kafka for real-time data pipelines\n• Warehousing: Snowflake, BigQuery, dbt\n\nHe's built pipelines processing millions of records daily.`,
    ],
  },
  {
    patterns: [/project|work|built|portfolio|showcase/i],
    responses: [
      `Here are some of Vatsav's notable projects:\n\n${knowledgeBase.projects.map(p => `• ${p.name}: ${p.desc} (${p.tech.join(', ')})`).join('\n\n')}`,
    ],
  },
  {
    patterns: [/cloud|aws|docker|kubernetes|deploy/i],
    responses: [
      `Vatsav has strong cloud and DevOps skills:\n\n• AWS: EC2, S3, Lambda, ECS, RDS, and more\n• Containers: Docker for containerization, Kubernetes for orchestration\n• IaC: Terraform for infrastructure as code\n• CI/CD: Automated deployment pipelines`,
    ],
  },
  {
    patterns: [/frontend|react|web|ui/i],
    responses: [
      "While primarily a backend/data engineer, Vatsav is also proficient in frontend development with React, Node.js, and modern CSS. This portfolio itself showcases his full-stack capabilities!",
    ],
  },
  {
    patterns: [/contact|email|reach|hire|connect|linkedin|github/i],
    responses: [
      `You can connect with Vatsav through:\n\n• Email: ${knowledgeBase.contact.email}\n• GitHub: ${knowledgeBase.contact.github}\n• LinkedIn: ${knowledgeBase.contact.linkedin}\n\nFeel free to reach out for collaborations or opportunities!`,
    ],
  },
  {
    patterns: [/resume|cv|download/i],
    responses: [
      "You can download Vatsav's resume by clicking the document icon in the navigation bar, or scroll down to the Contact section for more details.",
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
      "I can help you learn about:\n\n• Vatsav's skills and technical expertise\n• His projects and work experience\n• AI/ML and Data Engineering capabilities\n• How to contact him\n\nJust ask naturally, like \"What projects has he worked on?\" or \"Tell me about his Python experience\"",
    ],
  },
];

// Default fallback responses
const fallbackResponses = [
  "I'm not sure about that specific topic, but I'd be happy to tell you about Vatsav's skills, projects, or experience. What would you like to know?",
  "That's an interesting question! I'm best at answering questions about Vatsav's technical skills, projects, and background. Try asking about his AI/ML experience or data engineering work!",
  "I don't have information on that, but I can tell you all about Vatsav's expertise in Python, AI, data engineering, and more. What interests you?",
];

// Suggested questions
const suggestedQuestions = [
  "What are his main skills?",
  "Tell me about his AI experience",
  "What projects has he built?",
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
      text: "Hi! I'm Vatsav's AI assistant. Ask me anything about his skills, projects, or experience!",
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
