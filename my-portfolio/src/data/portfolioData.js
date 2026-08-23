/**
 * Centralized Portfolio Data
 * Single source of truth for all portfolio content
 */

// ============================================
// Personal Information
// ============================================

export const personalInfo = {
  name: 'Vatsav Saravanan',
  role: 'AI Engineer',
  location: 'Asker, Norway',
  email: 'srivatsavs98@gmail.com',
  linkedin: 'linkedin.com/in/srivatsav-s',
  languages: ['English (Fluent)', 'Norwegian (B1)'],
};

// ============================================
// Skills Data
// ============================================

export const skillCategories = [
  {
    id: 'data',
    category: 'Data Science & Analytics',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'Data Analysis', icon: 'googleanalytics' },
    ],
    color: '#8a9aaa',
    shortName: 'Data',
  },
  {
    id: 'database',
    category: 'Data Engineering',
    items: [
      { name: 'SQL', icon: 'postgresql' },
      { name: 'Data Modelling', icon: 'dbt' },
    ],
    color: '#9aaa8a',
    shortName: 'Engineering',
  },
  {
    id: 'cloud',
    category: 'Cloud & Architecture',
    items: [
      { name: 'AWS', icon: 'amazonaws' },
      { name: 'System Design', icon: 'architecture' },
    ],
    color: '#8aaa8a',
    shortName: 'Cloud & Arch',
  },
  {
    id: 'ai',
    category: 'AI & LLM',
    items: [
      { name: 'LLM/AI', icon: 'openai' },
      { name: 'AI Agents', icon: 'langchain' },
      { name: 'RAG', icon: 'pinecone' },
      { name: 'MCP', icon: 'langchain' },
      { name: 'AI Models Integration', icon: 'openai' },
      { name: 'LangChain', icon: 'langchain' },
    ],
    color: '#aa9a8a',
    shortName: 'AI',
  }
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
  // Data Science
  { id: 'python', label: 'Python', category: 'data', x: 0, y: 0, size: 1.6 },
  { id: 'dataanalysis', label: 'Data Analysis', category: 'data', x: -2.5, y: -0.5, size: 1.2 },

  // AI & LLM
  { id: 'llmai', label: 'LLM/AI', category: 'ai', x: -1, y: 2, size: 1.3 },
  { id: 'aiagents', label: 'AI Agents', category: 'ai', x: -2.5, y: 2.5, size: 1.2 },
  { id: 'rag', label: 'RAG', category: 'ai', x: -0.5, y: 3.5, size: 1.1 },
  { id: 'langchain', label: 'LangChain', category: 'ai', x: -2, y: 4, size: 1.1 },
  { id: 'mcp', label: 'MCP', category: 'ai', x: 0.5, y: 4.5, size: 1.0 },
  { id: 'modelsint', label: 'AI Models Integration', category: 'ai', x: 1, y: 3, size: 1.1 },

  // Engineering
  { id: 'sql', label: 'SQL', category: 'database', x: 2, y: -1, size: 1.3 },
  { id: 'datamodelling', label: 'Data Modelling', category: 'database', x: 3, y: -2.5, size: 1.2 },

  // Cloud & Arch
  { id: 'aws', label: 'AWS', category: 'cloud', x: 1.5, y: 2, size: 1.4 },
  { id: 'systemdesign', label: 'System Design', category: 'cloud', x: 3, y: 1.5, size: 1.3 },
];

export const skillConnections = [
  { from: 'python', to: 'dataanalysis' },
  { from: 'python', to: 'llmai' },
  { from: 'python', to: 'sql' },
  { from: 'python', to: 'aws' },
  { from: 'llmai', to: 'aiagents' },
  { from: 'llmai', to: 'rag' },
  { from: 'llmai', to: 'langchain' },
  { from: 'llmai', to: 'modelsint' },
  { from: 'llmai', to: 'aws' },
  { from: 'aiagents', to: 'mcp' },
  { from: 'aiagents', to: 'rag' },
  { from: 'modelsint', to: 'mcp' },
  { from: 'sql', to: 'datamodelling' },
  { from: 'systemdesign', to: 'aws' },
  { from: 'systemdesign', to: 'datamodelling' },
];

// ============================================
// Projects Data
// ============================================

export const projects = [
  {
    title: 'Regelverk Copilot',
    shortName: 'regelverk-copilot',
    description: 'AI assistant answering Norwegian employment-termination law questions with grounded, cited answers — built for small business owners who currently guess or overpay a lawyer for simple questions.',
    tags: ['Python', 'FastAPI', 'React', 'Ollama', 'RAG'],
    category: 'ai-ml',
    categoryLabel: 'AI & ML',
    image: import.meta.env.BASE_URL + 'project-previews/regelverk-copilot.svg',
    github: 'https://github.com/Srivatsav1298/Regelverk-Copilot',
    live: 'https://regelverk-copilot.onrender.com',
    metrics: {
      type: 'Legal AI Assistant',
      impact: 'Grounded Citations',
    },
    details: {
      problem: "Small business owners facing Norwegian employment-termination questions either guess (risky) or overpay a lawyer for simple questions. Generic chatbots hallucinate legal rules and provide no verifiable sources.",
      solution: "Built a guest-first employment decision-support product around guided workflows, verified sources, and safe escalation. An agentic pipeline of explicit tools (classify_intent, retrieve_legal_sources, extract_case_signals, verify_citations) composes /ask and /assess workflows on an Ollama runtime, with a deterministic safety layer that calculates notice periods, detects protected situations, and blocks action when review is required.",
      highlights: [
        "Agentic building blocks: explicit classify_intent, retrieve_legal_sources, extract_case_signals, and verify_citations tools compose into /ask and /assess workflows.",
        "MCP-ready contracts: /tools publishes a transport-neutral tool manifest so building blocks can be exposed through an MCP server without framework coupling.",
        "Decision support, not generic chat: deterministic safety layer calculates notice periods, detects protected situations, flags missing facts, and blocks action when review is required.",
        "Print-ready decision brief: /brief produces an ephemeral HTML report separating employer-provided facts, retrieved rules, AI interpretation, and review items.",
        "Freshness-aware grounding: /sources and /ready expose corpus version, source references, ingestion dates, and stale-source warnings.",
        "Production controls: graceful model failure, local lexical retrieval fallback, caching, rate limits, readiness endpoint, provider/tool metrics, and citation gates.",
        "Evaluations: 20-question suite testing factual keywords, scope refusal, citation source, and confidence — runnable against Ollama locally.",
        "Guest-first privacy: no account required; assessment drafts live in browser storage and can be deleted or printed without server persistence.",
      ],
      techStack: ['Python', 'FastAPI', 'Ollama', 'OpenRouter (optional adapter)', 'React', 'TypeScript', 'Vite', 'MCP'],
      techSnippet: {
        title: "Agentic Tool Composition",
        language: "python",
        code: `@app.post("/assess")
async def assess(request: AssessRequest):
    intent = await classify_intent(request.message)
    if not intent.in_scope:
        return scope_refusal(intent)

    signals = extract_case_signals(request.case_facts)
    sources = retrieve_legal_sources(request.message)

    if SAFETY.requires_review(signals):
        return escalation_required(signals)

    answer = await generate_answer(request.message, sources)
    verify_citations(answer, sources)
    return DecisionBrief(answer, sources, signals)`
      }
    }
  },
  {
    title: 'Energy Analytics Dashboard',
    shortName: 'energy-data',
    description: 'Data-intensive analytics platform processing 1M+ hourly electricity records from Elhub Norway. Engineered scalable ETL pipelines for monitoring.',
    tags: ['Python', 'PySpark', 'ETL', 'Data Analytics'],
    category: 'data-science',
    categoryLabel: 'Data Science',
    image: import.meta.env.BASE_URL + 'project-previews/energy-data-analytics.png',
    github: 'https://github.com/Srivatsav1298/WeatherAndEnergyInsights',
    live: '#',
    metrics: {
      records: '1M+ Hourly Records',
      market: 'Elhub Norway',
    },
    details: {
      problem: "Elhub produces massive amounts of electricity data. Processing over 1 million records hourly for real-time analytics required a high-performance, scalable solution.",
      solution: "Built a distributed processing pipeline using PySpark. The solution automates data ingestion, cleaning, and aggregation, serving a real-time dashboard for market monitoring.",
      highlights: [
        "Engineered ETL pipelines capable of processing millions of records in sub-minute intervals.",
        "Implemented distributed data processing using PySpark for horizontal scalability.",
        "Developed custom statistical models to identify consumption anomalies.",
      ],
      techStack: ['Python', 'PySpark', 'Apache Spark', 'PostgreSQL', 'Grafana'],
      techSnippet: {
        title: "PySpark Aggregation Logic",
        language: "python",
        code: `df = spark.read.parquet("s3://elhub-raw-data/")
aggregated_df = df.groupBy("region", "hour") \\
    .agg(sum("consumption").alias("total_load")) \\
    .withColumn("timestamp", current_timestamp())

aggregated_df.write.mode("append").saveAsTable("meter_readings")`
      }
    }
  },
  {
    title: 'Financial AI Agent',
    shortName: 'financial-ai',
    description: 'AI agent providing Norwegian household budget insights with explainable reasoning, leveraging real-world Statistics Norway (SSB) data.',
    tags: ['Python', 'LLaMA', 'LangChain', 'AI Agent'],
    category: 'ai-ml',
    categoryLabel: 'AI & ML',
    image: import.meta.env.BASE_URL + 'project-previews/financial-ai.png',
    github: 'https://github.com/Srivatsav1298/Financial_AI_ReAct_Agent',
    live: '#',
    metrics: {
      data: 'SSB Official Data',
      engine: 'ReAct Agent',
    },
    details: {
      problem: "Household budgeting often lacks personalized, data-backed advice. Users need a way to understand how their spending compares to national statistics in a conversational way.",
      solution: "Architecture a ReAct agent using LangChain and LLaMA. The agent queries SSB datasets, performs comparative analysis, and provides natural language budgeting advice.",
      highlights: [
        "Implemented a custom ReAct (Reason + Act) loop for complex financial reasoning.",
        "Integrated official Statistics Norway (SSB) APIs for real-time demographic data.",
        "Developed a prompt engineering strategy to ensuring financial accuracy and explainability.",
      ],
      techStack: ['Python', 'LangChain', 'LLaMA 3', 'SSB API', 'VectorDB'],
      techSnippet: {
        title: "Agent Reasoning Loop",
        language: "python",
        code: `agent = initialize_agent(
    tools=[SSBQueryTool(), BudgetCalculator()],
    llm=ChatOpenAI(model="gpt-4-turbo"),
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    verbose=True
)

# Example: "How does my 5k NOK grocery spend compare to Oslo average?"`
      }
    }
  },
  {
    title: 'AV Danse Studio Platform',
    shortName: 'av-danse',
    description: 'Digital platform for a dance center in Norway achieving 99.99% uptime and 50% cost reduction with 2x concurrent user capacity.',
    tags: ['AWS', 'S3', 'CloudFront', 'JavaScript', 'CI/CD'],
    category: 'full-stack',
    categoryLabel: 'Full Stack',
    image: import.meta.env.BASE_URL + 'project-previews/av-danse.jpg',
    github: 'https://github.com/Srivatsav1298/NewProjectAVDS',
    live: 'https://avdanse.no',
    metrics: {
      uptime: '99.99% Uptime',
      users: '2x Capacity',
    },
    details: {
      problem: "The previous hosting infrastructure was costly and prone to downtime during peak enrollment periods. Scaling was manual and inefficient.",
      solution: "Migrated the entire platform to a serverless AWS architecture using S3 and CloudFront. Automated the entire delivery process with a robust CI/CD pipeline.",
      highlights: [
        "Reduced operational costs by 50% via serverless migration.",
        "Achieved 99.99% uptime during peak registration windows.",
        "Doubled deployment velocity by implementing GitHub Actions workflows.",
      ],
      techStack: ['JavaScript', 'AWS S3', 'CloudFront', 'GitHub Actions', 'Terraform'],
      techSnippet: {
        title: "CI/CD Deployment Flow",
        language: "yaml",
        code: `deploy:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v2
    - run: npm install && npm run build
    - name: Deploy to S3
      run: aws s3 sync ./dist s3://\${ secrets.AWS_S3_BUCKET }`
      }
    }
  },
  {
    title: 'PinTrip',
    shortName: 'pintrip',
    description: 'Location-based social discovery app where users share moments with geolocation, explore real-time feeds, and discover content near them.',
    tags: ['React', 'Supabase', 'Mapbox', 'TypeScript', 'Tailwind'],
    category: 'full-stack',
    categoryLabel: 'Full Stack',
    image: import.meta.env.BASE_URL + 'project-previews/pintrip.jpg',
    github: 'https://github.com/Srivatsav1298/PinTrip',
    live: 'https://github.com/Srivatsav1298/PinTrip',
    metrics: {
      users: 'Real-time Feed',
      tech: 'Location-based',
    },
    details: {
      problem: "People want to discover and share moments in the places they are, but existing platforms either lack location context or have poor user experience.",
      solution: "Built a full-stack social app with Supabase for real-time data and Mapbox for interactive maps. Users can post photos with precise location, explore a proximity-based feed, and search for content near them.",
      highlights: [
        "Implemented real-time feed using Supabase Realtime subscriptions",
        "Built custom proximity queries with PostGIS for location-based content",
        "Created smooth map interactions with Mapbox GL and react-map-gl",
        "Designed mobile-first responsive UI with Tailwind CSS",
      ],
      techStack: ['React 19', 'TypeScript', 'Supabase', 'Mapbox GL', 'Tailwind CSS', 'Vite'],
      techSnippet: {
        title: "Proximity Feed Query",
        language: "sql",
        code: `SELECT * FROM posts
WHERE ST_DWithin(
  location,
  ST_SetSRID(ST_MakePoint($1, $2), 4326),
  $3 * 1000
) AND is_public = true`
      }
    }
  },
  {
    title: 'Crave Station',
    shortName: 'crave-station',
    description: 'A stunning landing page for a social dining discovery platform in Oslo, Norway, featuring vibrant design and cinematic animations.',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'shadcn/ui'],
    category: 'full-stack',
    categoryLabel: 'Full Stack',
    image: import.meta.env.BASE_URL + 'project-previews/crave-station.jpg',
    github: '#',
    live: 'https://cravestation.no',
    metrics: {
      design: 'Vibrant Design System',
      animation: 'Cinematic GSAP',
    },
    details: {
      problem: "Existing restaurant discovery platforms lacked visual appeal and seamless user experience. There was a need for a modern, visually stunning platform that could showcase Oslo's dining scene with engaging animations.",
      solution: "Built a premium landing page with a 10-color palette inspired by Leoff Paris, using GSAP ScrollTrigger for cinematic transitions and shadcn/ui for accessible components. The platform features fully responsive design with smooth interactions.",
      highlights: [
        "Crafted a vibrant 10-color design system inspired by Leoff Paris aesthetics",
        "Implemented cinematic scroll animations using GSAP ScrollTrigger",
        "Built fully responsive layout with Tailwind CSS for optimal mobile experience",
        "Integrated shadcn/ui components for consistent, accessible UI patterns",
        "Developed with React 19 and TypeScript for type safety and future-proofing",
      ],
      techStack: ['React 19', 'TypeScript', 'Vite 7.2', 'Tailwind CSS 3.4', 'GSAP 3.14', 'shadcn/ui', 'Lucide React'],
      techSnippet: {
        title: "GSAP ScrollTrigger Animation",
        language: "typescript",
        code: `// Cinematic scroll-triggered animations
const sections = gsap.utils.toArray('.animate-section');
ScrollTrigger.create({
  trigger: sections[0],
  start: 'top top',
  end: 'bottom top',
  scrub: 1,
  animation: gsap.to(sections, {
    xPercent: -100,
    ease: 'none'
  })
});`
      }
    }
  },
];

// ============================================
// Experience / Timeline Data
// ============================================

export const experienceData = [
  {
    id: 1,
    year: '2026-Present',
    title: 'Software Engineer - Trainee',
    company: 'Agela AS',
    description: 'Working as a Software Engineer Trainee, building production software with a focus on AI and data-driven systems.',
    technologies: ['Python', 'AI', 'Data', 'Software Engineering'],
    type: 'work',
  },
  {
    id: 2,
    year: 'Sep 2025 - Dec 2025',
    title: 'Teaching Assistant - DBMS',
    company: 'NMBU',
    description: 'Mentored 40+ students in SQL optimization, database design, and system thinking. Designed exercises simulating production-level data challenges.',
    technologies: ['SQL', 'PostgreSQL', 'Database Design', 'Mentoring'],
    type: 'work',
  },
  {
    id: 3,
    year: '2024-2026',
    title: "Master's in Data Science",
    company: 'Norwegian University of Life Sciences (NMBU)',
    description: 'Completed Master\'s studies in Data Science, graduating June 2026. Coursework: Python Programming, Data-to-Decision, SQL for Data Handling and Analysis.',
    technologies: ['Python', 'SQL', 'Data Analytics', 'Machine Learning'],
    type: 'education',
  },
  {
    id: 4,
    year: '2020-24',
    title: 'Software Engineer',
    company: 'Orion Innovation',
    description: 'Developed backend services and APIs with clean coding practices. Migrated large-scale sports application reducing costs by 30%. Contributed to Tennis Australia architecture.',
    technologies: ['Python', 'Flask', 'Microservices', 'Azure'],
    type: 'work',
  },
  {
    id: 5,
    year: '2016-20',
    title: 'B.Tech Computer Science',
    company: 'Karpagam College of Engineering',
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
  bachelors: "B.Tech Computer Science from Karpagam College of Engineering, India (2016-2020)",
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
