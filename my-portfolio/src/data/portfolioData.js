/**
 * Centralized Portfolio Data
 * Single source of truth for all portfolio content
 */

// ============================================
// Personal Information
// ============================================

export const personalInfo = {
  name: 'Vatsav Saravanan',
  role: 'Data Science Graduate Student & Software Engineer',
  location: 'Ås, Norway',
  email: 'srivatsavsaravanan@gmail.com',
  linkedin: 'linkedin.com/in/srivatsav-saravanan',
  languages: ['English (Fluent)', 'Norwegian (B1)'],
};

// ============================================
// Skills Data
// ============================================

export const skillCategories = [
  {
    id: 'backend',
    category: 'Programming & Backend',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'Flask', icon: 'flask' },
      { name: 'RestAPI', icon: 'fastapi' },
      { name: 'Microservices', icon: 'diagramsdotnet' },
    ],
    color: '#b0b0b5',
    shortName: 'Backend',
  },
  {
    id: 'data',
    category: 'Data Science',
    items: [
      { name: 'Pandas', icon: 'pandas' },
      { name: 'Matplotlib', icon: 'plotly' },
      { name: 'Seaborn', icon: 'anaconda' },
      { name: 'Data Modeling', icon: 'databricks' },
      { name: 'PySpark', icon: 'apachespark' },
      { name: 'Data Analytics', icon: 'googleanalytics' },
    ],
    color: '#8a9aaa',
    shortName: 'Data Science',
  },
  {
    id: 'database',
    category: 'Databases',
    items: [
      { name: 'SQL', icon: 'postgresql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Data Modelling', icon: 'dbt' },
    ],
    color: '#9aaa8a',
    shortName: 'Databases',
  },
  {
    id: 'cloud',
    category: 'Cloud & DevOps',
    items: [
      { name: 'Azure', icon: 'microsoftazure' },
      { name: 'AWS', icon: 'amazonaws' },
      { name: 'Docker', icon: 'docker' },
      { name: 'CI/CD', icon: 'githubactions' },
      { name: 'Cloud Architecture', icon: 'terraform' },
    ],
    color: '#8aaa8a',
    shortName: 'Cloud',
  },
  {
    id: 'dev',
    category: 'Software Development',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Clean Coding', icon: 'sonarlint' },
      { name: 'Software Architecture', icon: 'linkedin' },
      { name: 'Testing', icon: 'pytest' },
    ],
    color: '#9a8aaa',
    shortName: 'Dev',
  },
  {
    id: 'ai',
    category: 'AI',
    items: [
      { name: 'LangChain', icon: 'chainlink' },
      { name: 'LLM APIs', icon: 'openai' },
      { name: 'Claude', icon: 'anthropic' },
      { name: 'LLaMA', icon: 'meta' },
    ],
    color: '#aa9a8a',
    shortName: 'AI',
  },
];

// For Skills grid view - uses category and items
export const skillsForGrid = skillCategories.map(({ category, items }) => ({
  category,
  items: items.map(item => typeof item === 'string' ? item : item.name),
  itemsWithIcons: items,
}));

// Category colors lookup for SkillsNetwork
export const categoryColors = Object.fromEntries(
  skillCategories.map(({ id, color }) => [id, color])
);

// Category names lookup
export const categoryNames = Object.fromEntries(
  skillCategories.map(({ id, category }) => [id, category])
);

// ============================================
// Skills Network Nodes (for 3D visualization)
// ============================================

export const skillNodes = [
  // Programming & Backend (center)
  { id: 'python', label: 'Python', category: 'backend', x: 0, y: 0, size: 1.3 },
  { id: 'flask', label: 'Flask', category: 'backend', x: 1.8, y: -0.5, size: 0.95 },
  { id: 'restapi', label: 'RestAPI', category: 'backend', x: 1.5, y: 0.8, size: 0.9 },
  { id: 'microservices', label: 'Microservices', category: 'backend', x: 2.5, y: 0, size: 0.85 },

  // Data Science
  { id: 'pandas', label: 'Pandas', category: 'data', x: -1.5, y: -1.5, size: 1.0 },
  { id: 'matplotlib', label: 'Matplotlib', category: 'data', x: -2.5, y: -0.8, size: 0.9 },
  { id: 'seaborn', label: 'Seaborn', category: 'data', x: -3, y: -1.8, size: 0.8 },
  { id: 'datamodeling', label: 'Data Modeling', category: 'data', x: -2, y: 0.5, size: 0.85 },
  { id: 'analytics', label: 'Data Analytics', category: 'data', x: -3.2, y: 0.2, size: 0.9 },

  // Databases
  { id: 'sql', label: 'SQL', category: 'database', x: 0, y: 2.2, size: 1.1 },
  { id: 'postgres', label: 'PostgreSQL', category: 'database', x: 1.5, y: 2.5, size: 0.95 },

  // Cloud & DevOps
  { id: 'azure', label: 'Azure', category: 'cloud', x: 3.5, y: 1, size: 1.0 },
  { id: 'aws', label: 'AWS', category: 'cloud', x: 4, y: -0.5, size: 1.0 },
  { id: 'docker', label: 'Docker', category: 'cloud', x: 3.8, y: -1.5, size: 0.9 },
  { id: 'cicd', label: 'CI/CD', category: 'cloud', x: 4.5, y: 0.3, size: 0.85 },

  // Software Development
  { id: 'git', label: 'Git', category: 'dev', x: -1, y: 1.5, size: 0.9 },
  { id: 'cleancode', label: 'Clean Code', category: 'dev', x: -1.8, y: 2.2, size: 0.8 },
  { id: 'architecture', label: 'Software Arch', category: 'dev', x: 0.8, y: -2, size: 0.85 },
  { id: 'testing', label: 'Testing', category: 'dev', x: 2, y: -1.8, size: 0.8 },

  // AI
  { id: 'langchain', label: 'LangChain', category: 'ai', x: -0.5, y: -2.5, size: 0.95 },
  { id: 'llm', label: 'LLM APIs', category: 'ai', x: -2, y: -2.5, size: 0.9 },
  { id: 'claude', label: 'Claude', category: 'ai', x: -1.2, y: -3.2, size: 0.85 },
  { id: 'llama', label: 'LLaMA', category: 'ai', x: 0.5, y: -3.2, size: 0.85 },
];

// Skill connections for network visualization
export const skillConnections = [
  // Python connections (central hub)
  { from: 'python', to: 'flask' },
  { from: 'python', to: 'restapi' },
  { from: 'python', to: 'pandas' },
  { from: 'python', to: 'langchain' },
  { from: 'python', to: 'sql' },

  // Backend connections
  { from: 'flask', to: 'restapi' },
  { from: 'restapi', to: 'microservices' },
  { from: 'flask', to: 'docker' },

  // Data Science connections
  { from: 'pandas', to: 'matplotlib' },
  { from: 'matplotlib', to: 'seaborn' },
  { from: 'pandas', to: 'datamodeling' },
  { from: 'datamodeling', to: 'analytics' },
  { from: 'analytics', to: 'sql' },

  // Database connections
  { from: 'sql', to: 'postgres' },
  { from: 'postgres', to: 'datamodeling' },

  // Cloud connections
  { from: 'azure', to: 'aws' },
  { from: 'aws', to: 'docker' },
  { from: 'docker', to: 'cicd' },
  { from: 'azure', to: 'cicd' },
  { from: 'microservices', to: 'azure' },
  { from: 'microservices', to: 'docker' },

  // Software Dev connections
  { from: 'git', to: 'cicd' },
  { from: 'cleancode', to: 'git' },
  { from: 'architecture', to: 'microservices' },
  { from: 'testing', to: 'cicd' },
  { from: 'cleancode', to: 'architecture' },

  // AI connections
  { from: 'langchain', to: 'llm' },
  { from: 'llm', to: 'claude' },
  { from: 'llm', to: 'llama' },
  { from: 'langchain', to: 'llama' },

  // Cross-category
  { from: 'flask', to: 'postgres' },
  { from: 'pandas', to: 'sql' },
  { from: 'aws', to: 'postgres' },
];

// ============================================
// Projects Data
// ============================================

export const projects = [
  {
    title: 'Oil Spill Simulation System',
    description: 'Data-driven simulation system to model oil spill scenarios in offshore environments, visualize environmental impact, and support real-time monitoring for early detection and decision-making.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Mesh Data', 'Simulation'],
    category: 'data-science',
    image: '/my-web-portfolio/src/assets/project-images/oil-spill.png',
    github: '#',
    live: '#',
    metrics: {
      type: 'Environmental Monitoring',
    },
  },
  {
    title: 'Energy Analytics Dashboard',
    description: 'Data-intensive analytics platform processing 1M+ hourly electricity records from Elhub Norway. Engineered scalable ETL pipelines for near real-time monitoring and decision-making.',
    tags: ['Python', 'PySpark', 'ETL', 'Data Analytics'],
    category: 'data-science',
    image: '/my-web-portfolio/src/assets/project-images/energy-data-analytics.png',
    github: '#',
    live: '#',
    metrics: {
      records: '1M+ Records',
    },
  },
  {
    title: 'Financial AI Agent',
    description: 'AI agent providing Norwegian household budget insights with explainable reasoning, leveraging real-world Statistics Norway (SSB) data for financial planning.',
    tags: ['Python', 'LLaMA', 'LangChain', 'AI Agent'],
    category: 'ai-ml',
    image: '/my-web-portfolio/src/assets/project-images/financial-ai.png',
    github: '#',
    live: '#',
    metrics: {
      data: 'SSB Data',
    },
  },
  {
    title: 'AV Danse Studio Platform',
    description: 'Digital platform for a dance center in Norway achieving 99.99% uptime and 50% cost reduction. Implemented CI/CD pipeline doubling deployment velocity with 2x concurrent user capacity.',
    tags: ['AWS', 'S3', 'CloudFront', 'JavaScript', 'CI/CD'],
    category: 'full-stack',
    image: '/my-web-portfolio/project-previews/av-danse.jpg',
    github: '#',
    live: '#',
    metrics: {
      platform: 'Cloud Platform',
    },
  },
];

// ============================================
// Experience / Timeline Data
// ============================================

export const experienceData = [
  {
    id: 1,
    year: '2025',
    title: 'Teaching Assistant - DBMS',
    company: 'NMBU',
    description: 'Mentored 40+ students in SQL optimization, database design, and system thinking. Designed exercises simulating production-level data challenges.',
    technologies: ['SQL', 'PostgreSQL', 'Database Design', 'Mentoring'],
    type: 'work',
  },
  {
    id: 2,
    year: '2024',
    title: "Master's in Data Science",
    company: 'Norwegian University of Life Sciences (NMBU)',
    description: 'Pursuing advanced studies in Data Science. Coursework: Python Programming, Data-to-Decision, SQL for Data Handling and Analysis.',
    technologies: ['Python', 'SQL', 'Data Analytics', 'Machine Learning'],
    type: 'education',
  },
  {
    id: 3,
    year: '2020-24',
    title: 'Software Engineer',
    company: 'Orion Innovation',
    description: 'Developed backend services and APIs with clean coding practices. Migrated large-scale sports application reducing costs by 30%. Contributed to Tennis Australia architecture.',
    technologies: ['Python', 'Flask', 'Microservices', 'Azure'],
    type: 'work',
  },
  {
    id: 4,
    year: '2016-20',
    title: 'B.Tech Computer Science',
    company: 'India',
    description: 'Bachelor of Technology in Computer Science and Engineering. Coursework: Software Engineering, Web Development, System Design.',
    technologies: ['Software Engineering', 'Web Dev', 'System Design'],
    type: 'education',
  },
];

// ============================================
// Education Data (for AI Chat)
// ============================================

export const education = {
  masters: "Master's in Data Science at NMBU, Norway (2024-2026)",
  bachelors: "B.Tech Computer Science from India (2016-2020)",
};

// ============================================
// Certifications & Awards
// ============================================

export const certifications = [
  '3rd Place GenAI Hackathon AWS Norway',
  'AWS Cloud Computing Badge',
  'GenAI Concepts - DataCamp',
  'Star of the Month (2x) - Orion Innovation',
];
