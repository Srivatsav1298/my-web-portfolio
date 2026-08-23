/**
 * Technical Expertise Data
 * Capability → Stack → Proof model.
 * Every entry must be backed by a real project, employer, or repository.
 */

const RULEVERK_LIVE = 'https://regelverk-copilot.onrender.com';
const RULEVERK_GH = 'https://github.com/Srivatsav1298/Regelverk-Copilot';
const FINANCIAL_GH = 'https://github.com/Srivatsav1298/Financial_AI_ReAct_Agent';
const ENERGY_GH = 'https://github.com/Srivatsav1298/WeatherAndEnergyInsights';

export const expertiseHeader = {
  eyebrow: { en: 'Technical Expertise', no: 'Teknisk ekspertise' },
  title: {
    en: 'Engineering AI systems from model to product.',
    no: 'Bygger AI-systemer fra modell til produkt.',
  },
  subtitle: {
    en: 'My work spans the layers around the model: agentic workflows, retrieval with verified citations, backend services, data pipelines, and deployed products. Each capability below links to a system where it was applied.',
    no: 'Arbeidet mitt spenner over lagene rundt modellen: agentiske arbeidsflyter, henting med verifiserte kilder, backendsystemer, datapipelines og utplasserte produkter. Hver kapasitet under lenker til et system der den er brukt.',
  },
};

export const expertiseCategories = [
  {
    number: '01',
    level: 'core',
    featured: true,
    title: { en: 'AI & LLM Engineering', no: 'AI & LLM-engineering' },
    description: {
      en: 'Designing application workflows around language models — intent classification, prompt design, structured interfaces, and configuration-driven model selection across local and hosted runtimes (Ollama, OpenRouter).',
      no: 'Designer applikasjonsflyter rundt språkmodeller — intensjonsklassifisering, promptdesign, strukturerte grensesnitt og konfigurasjonsdrevet modellvalg på tvers av lokale og hostede kjøretøy (Ollama, OpenRouter).',
    },
    technologies: [
      'LLM Integration',
      'Prompt Engineering',
      'Intent Classification',
      'Model Selection',
      'Ollama',
      'OpenRouter',
      'LangChain',
      'ReAct Pattern',
    ],
    projects: [
      { name: 'Regelverk Copilot', href: RULEVERK_LIVE },
      { name: 'Financial AI Agent', href: FINANCIAL_GH },
    ],
  },
  {
    number: '02',
    level: 'core',
    title: { en: 'Agentic Workflows & Orchestration', no: 'Agentiske arbeidsflyter' },
    description: {
      en: 'Composing explicit, inspectable tools into multi-step workflows — not opaque chat loops. Tool manifests are transport-neutral and MCP-ready; a deterministic safety layer gates actions before execution.',
      no: 'Komponerer eksplisitte, inspiserbare verktøy til flertrinnsflyter — ikke ugjennomsiktige chat-løkker. Verktøymanifest er transportnøytrale og MCP-klare; et deterministisk sikkerhetslag styrer handlinger før kjøring.',
    },
    technologies: [
      'Tool Calling',
      'Agent Orchestration',
      'MCP-Ready Contracts',
      'Guardrails',
      'Failure Recovery',
      'Human-in-the-loop Escalation',
    ],
    projects: [
      { name: 'Regelverk Copilot', href: RULEVERK_GH },
      { name: 'Financial AI ReAct Agent', href: FINANCIAL_GH },
    ],
  },
  {
    number: '03',
    level: 'core',
    title: { en: 'Retrieval, Grounding & Evaluation', no: 'Henting, grunning & evaluering' },
    description: {
      en: 'Connecting model output to verifiable sources: citation gates that block ungrounded answers, freshness-aware corpora with stale-source warnings, lexical retrieval fallbacks, and automated evaluation suites scoring factual accuracy and scope refusal.',
      no: 'Knytter modelloutput til verifiserbare kilder: kildegater som blokkerer ugrunnede svar, versjonsbevisste korpus med advarsler om foreldete kilder, leksikalsk fallback og automatiserte evalueringsrunder for fakta og scope-nektelse.',
    },
    technologies: [
      'Grounded Generation',
      'Citation Verification',
      'Retrieval Fallbacks',
      'Freshness Tracking',
      'Automated Evaluations',
      'Confidence Scoring',
    ],
    projects: [{ name: 'Regelverk Copilot', href: RULEVERK_GH }],
  },
  {
    number: '04',
    level: 'supporting',
    title: { en: 'Backend Systems', no: 'Backendsystemer' },
    description: {
      en: 'Three years of production backend engineering at Orion Innovation: REST APIs, microservices, and large-scale migrations. Building the reliable software layer that turns AI capabilities into usable applications — caching, rate limits, readiness endpoints, graceful degradation.',
      no: 'Tre år med produksjonsbackend hos Orion Innovation: REST-APIer, mikrotjenester og storskala migreringer. Bygger det pålitelige programvarelaget som gjør AI-kapasiteter brukbare — caching, rate limits, readiness-endepunkter og grasiøs degradering.',
    },
    technologies: [
      'Python',
      'FastAPI',
      'Flask',
      'REST APIs',
      'Microservices',
      'SQL / PostgreSQL',
      'Caching & Rate Limiting',
    ],
    projects: [
      { name: 'Regelverk Copilot', href: RULEVERK_LIVE },
      { name: 'Energy Analytics Dashboard', href: ENERGY_GH },
    ],
  },
  {
    number: '05',
    level: 'supporting',
    title: { en: 'Data Engineering', no: 'Dataengineering' },
    description: {
      en: 'Pipelines that move real-world data into usable form: distributed processing of 1M+ hourly electricity records from Elhub Norway with PySpark, plus statistical grounding against official SSB datasets.',
      no: 'Pipelines som gjør virkelige data brukbare: distribuert prosessering av 1M+ timebaserte strømdata fra Elhub Norge med PySpark, samt statistisk grunning mot offisielle SSB-data.',
    },
    technologies: [
      'PySpark',
      'ETL Pipelines',
      'Data Modelling',
      'SSB Official Data',
      'Analytics',
    ],
    projects: [
      { name: 'Energy Analytics Dashboard', href: ENERGY_GH },
      { name: 'Financial AI Agent', href: FINANCIAL_GH },
    ],
  },
  {
    number: '06',
    level: 'supporting',
    title: { en: 'AI Product Frontend', no: 'AI-produktfrontend' },
    description: {
      en: 'Shipping the user-facing half of AI systems: React + TypeScript frontends built into the same container as the API, conversational interfaces, guest-first privacy flows, and print-ready decision briefs.',
      no: 'Leverer den brukernærme halvdelen av AI-systemer: React + TypeScript-frontend i samme container som API-et, samtalegrensesnitt, gjestevennlig personvern og utskriftsklare beslutningsrapporter.',
    },
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Conversational UX',
      'State Management',
    ],
    projects: [{ name: 'Regelverk Copilot', href: RULEVERK_LIVE }],
  },
];

export const technologyStack = [
  {
    label: { en: 'Languages', no: 'Språk' },
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    label: { en: 'AI / LLM', no: 'AI / LLM' },
    items: ['LangChain', 'Ollama', 'OpenRouter', 'LLaMA 3', 'MCP Contracts'],
  },
  {
    label: { en: 'Frameworks', no: 'Rammeverk' },
    items: ['FastAPI', 'Flask', 'React', 'Vite', 'PySpark'],
  },
  {
    label: { en: 'Data', no: 'Data' },
    items: ['PostgreSQL', 'SQL', 'SSB APIs', 'Elhub Energy Data'],
  },
  {
    label: { en: 'Infrastructure', no: 'Infrastruktur' },
    items: ['AWS', 'Azure', 'Render', 'REST', 'Readiness & Metrics Endpoints'],
  },
];

export const lifecycleStages = [
  { key: 'problem', label: 'Problem' },
  { key: 'data', label: 'Data' },
  { key: 'model', label: 'Model' },
  { key: 'retrieval', label: 'Retrieval / Tools' },
  { key: 'application', label: 'Application' },
  { key: 'evaluation', label: 'Evaluation' },
  { key: 'deployment', label: 'Deployment' },
  { key: 'observability', label: 'Observability' },
];

export const lifecycleCaption = {
  en: 'Every stage above is covered by shipped work — from problem framing through evaluation suites to deployed endpoints with health checks.',
  no: 'Hvert trinn over er dekket av levert arbeid — fra problemdefinisjon gjennom evalueringsrunder til utplasserte endepunkter med helsesjekk.',
};
