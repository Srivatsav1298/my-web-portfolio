import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import './AIChatAssistant.css';

// Knowledge base about Srivatsav
const knowledgeBase = {
  name: 'Srivatsav Saravanan',
  role: 'Software Engineer at Caterpillar Inc',
  education: 'B.Tech CSE from SRM Institute (CGPA: 8.8/10)',
  location: 'Chennai, India',
  skills: {
    languages: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
    web: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'REST APIs'],
    databases: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase'],
    cloud: ['AWS', 'Docker', 'Jenkins', 'Linux', 'Git'],
    ml: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'spaCy'],
    frameworks: ['Spring Boot', 'FastAPI', 'Flask', 'Socket.io', 'Microservices'],
  },
  certifications: ['AWS Certified Cloud Practitioner', 'Google Data Analytics Professional', 'HackerRank 5-star Problem Solving'],
  achievements: ['Smart India Hackathon 2023 Finalist'],
  projects: [
    { name: 'AI-Powered Resume Analyzer', tech: ['Python', 'TensorFlow', 'spaCy', 'Flask', 'React.js'], desc: 'NLP-based resume parsing with 92% accuracy in skill matching' },
    { name: 'Real-Time Chat Application', tech: ['Node.js', 'Socket.io', 'MongoDB', 'React.js'], desc: 'Scalable chat platform supporting 1000+ concurrent users' },
    { name: 'E-Commerce Analytics Dashboard', tech: ['Python', 'Pandas', 'Plotly', 'PostgreSQL', 'FastAPI'], desc: 'Business intelligence dashboard with automated ETL pipelines' },
  ],
  experience: [
    { role: 'Software Engineer', company: 'Caterpillar Inc', period: 'July 2024 - Present', desc: 'Enterprise applications with Java, Spring Boot, microservices' },
    { role: 'Software Development Intern', company: 'Caterpillar Inc', period: 'Jan - June 2024', desc: 'Full-stack development with React.js, Node.js, Docker' },
    { role: 'Web Development Intern', company: 'The Sparks Foundation', period: 'Sept - Oct 2022', desc: 'Responsive web apps and payment gateway integration' },
  ],
  contact: {
    email: 'srivatsavsaravanan@gmail.com',
    linkedin: 'linkedin.com/in/srivatsav-saravanan',
    phone: '+91 73581 63174',
  },
};

// Intent patterns and responses
const intents = [
  {
    patterns: [/hi|hello|hey|howdy|greetings/i],
    responses: [
      "Hello! I'm Srivatsav's AI assistant. How can I help you learn more about his work?",
      "Hey there! Ask me anything about Srivatsav's skills, projects, or experience at Caterpillar.",
      "Hi! I'm here to help you explore Srivatsav's portfolio. What would you like to know?",
    ],
  },
  {
    patterns: [/who is|about|tell me about|introduce/i],
    responses: [
      `${knowledgeBase.name} is a ${knowledgeBase.role}. He graduated with ${knowledgeBase.education} and is currently based in ${knowledgeBase.location}. He's AWS certified and a Smart India Hackathon 2023 Finalist!`,
    ],
  },
  {
    patterns: [/experience|work|job|caterpillar|company/i],
    responses: [
      `Srivatsav's professional experience:\n\n${knowledgeBase.experience.map(e => `• ${e.role} at ${e.company} (${e.period}): ${e.desc}`).join('\n\n')}`,
    ],
  },
  {
    patterns: [/skill|tech|stack|know|proficient|expertise/i],
    responses: [
      `Srivatsav's technical expertise:\n\n• Languages: ${knowledgeBase.skills.languages.join(', ')}\n• Web: ${knowledgeBase.skills.web.slice(0, 4).join(', ')}\n• Databases: ${knowledgeBase.skills.databases.join(', ')}\n• Cloud & Tools: ${knowledgeBase.skills.cloud.join(', ')}\n• ML: ${knowledgeBase.skills.ml.slice(0, 4).join(', ')}`,
    ],
  },
  {
    patterns: [/python|java/i],
    responses: [
      "Srivatsav is highly proficient in both Python and Java! He uses Python for ML/AI projects (TensorFlow, Pandas, spaCy) and backend APIs (FastAPI, Flask). Java with Spring Boot is his go-to for enterprise applications at Caterpillar.",
    ],
  },
  {
    patterns: [/ai|machine learning|ml|nlp|tensorflow/i],
    responses: [
      `Srivatsav has strong AI/ML skills:\n\n• Deep Learning: TensorFlow, Scikit-learn\n• NLP: spaCy for text processing\n• Data Science: Pandas, NumPy\n\nHis AI Resume Analyzer project achieved 92% accuracy in skill matching!`,
    ],
  },
  {
    patterns: [/react|node|frontend|web|javascript/i],
    responses: [
      `Srivatsav's web development stack:\n\n• Frontend: React.js, HTML5, CSS3\n• Backend: Node.js, Express.js, FastAPI\n• Real-time: Socket.io for WebSocket applications\n• APIs: RESTful services and microservices\n\nHe built a real-time chat app supporting 1000+ concurrent users!`,
    ],
  },
  {
    patterns: [/project|work|built|portfolio|showcase/i],
    responses: [
      `Here are Srivatsav's notable projects:\n\n${knowledgeBase.projects.map(p => `• ${p.name}: ${p.desc} (${p.tech.join(', ')})`).join('\n\n')}`,
    ],
  },
  {
    patterns: [/cloud|aws|docker|deploy|devops/i],
    responses: [
      `Srivatsav's cloud & DevOps skills:\n\n• AWS Certified Cloud Practitioner\n• Docker for containerization\n• Jenkins for CI/CD pipelines\n• Linux server administration\n• Git for version control\n\nHe contributed to CI/CD improvements at Caterpillar using Jenkins and Docker.`,
    ],
  },
  {
    patterns: [/database|sql|mongo|postgres/i],
    responses: [
      `Srivatsav works with multiple databases:\n\n• Relational: MySQL, PostgreSQL\n• NoSQL: MongoDB, Firebase\n• Optimized database queries improving system performance by 30% at Caterpillar`,
    ],
  },
  {
    patterns: [/education|degree|college|srm|university/i],
    responses: [
      `Education:\n\n• B.Tech in Computer Science and Engineering\n• SRM Institute of Science and Technology (2020-2024)\n• CGPA: 8.8/10\n• Smart India Hackathon 2023 Finalist`,
    ],
  },
  {
    patterns: [/certif|aws certified|google/i],
    responses: [
      `Srivatsav's certifications:\n\n• AWS Certified Cloud Practitioner\n• Google Data Analytics Professional Certificate\n• HackerRank Problem Solving (5-star rating)`,
    ],
  },
  {
    patterns: [/contact|email|reach|hire|connect|linkedin|phone/i],
    responses: [
      `You can connect with Srivatsav:\n\n• Email: ${knowledgeBase.contact.email}\n• LinkedIn: ${knowledgeBase.contact.linkedin}\n• Phone: ${knowledgeBase.contact.phone}\n\nFeel free to reach out for collaborations or opportunities!`,
    ],
  },
  {
    patterns: [/resume|cv|download/i],
    responses: [
      "You can download Srivatsav's resume by scrolling to the Contact section, or reach out directly via email at srivatsavsaravanan@gmail.com",
    ],
  },
  {
    patterns: [/thank|thanks|bye|goodbye/i],
    responses: [
      "You're welcome! Feel free to ask if you have more questions. Have a great day!",
      "Glad I could help! Don't hesitate to reach out to Srivatsav directly for more detailed discussions.",
    ],
  },
  {
    patterns: [/help|what can you|how do i|options/i],
    responses: [
      "I can help you learn about:\n\n• Srivatsav's skills and technical expertise\n• His projects (AI Resume Analyzer, Chat App, Analytics Dashboard)\n• Work experience at Caterpillar Inc\n• Education and certifications\n• How to contact him\n\nJust ask naturally!",
    ],
  },
];

// Default fallback responses
const fallbackResponses = [
  "I'm not sure about that specific topic, but I'd be happy to tell you about Srivatsav's skills, projects, or experience at Caterpillar. What would you like to know?",
  "That's an interesting question! I'm best at answering questions about Srivatsav's technical skills, projects, and background. Try asking about his experience or certifications!",
  "I don't have information on that, but I can tell you all about Srivatsav's expertise in Java, Python, React, AWS, and more. What interests you?",
];

// Suggested questions
const suggestedQuestions = [
  "What are his main skills?",
  "Tell me about his experience",
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
      text: "Hi! I'm Srivatsav's AI assistant. Ask me anything about his skills, projects, or experience at Caterpillar!",
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
