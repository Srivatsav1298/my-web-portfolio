# VatsWebsite - Portfolio Project Context

## Project Overview
Personal portfolio website for a Data Engineer + AI Enthusiast. Currently in the theme exploration phase.

## Project Structure
```
/VatsWebsite
├── /public
│   └── /demos                    # Theme demo pages (created)
│       ├── theme-data-flow.html
│       ├── theme-neural-network.html
│       ├── theme-constellation.html
│       ├── theme-terminal.html
│       └── theme-ai-llm.html
├── /my-portfolio                 # React app (if using)
├── todo.md                       # Current tasks and progress
└── CLAUDE.md                     # This file
```

## Theme Demos Created

### 1. Data Flow / Pipeline Theme (`theme-data-flow.html`)
- **Concept**: Animated data particles flowing through pipeline nodes
- **Colors**: Dark background (#0a0a0f), cyan data streams (#00d4ff), purple nodes (#8b5cf6)
- **Elements**: Animated CSS particles, node connectors, flow lines, grid background
- **Hero**: "Data Engineer" with gradient text

### 2. Neural Network / AI Brain Theme (`theme-neural-network.html`)
- **Concept**: Glowing neural network with synaptic connections
- **Colors**: Deep black (#050505), electric blue nodes (#3b82f6), white connections
- **Elements**: 20 pulsing nodes, connection lines, brain glow, signal pulses
- **Hero**: "AI Engineer" with neural network background

### 3. Data Constellation Theme (`theme-constellation.html`)
- **Concept**: Data points as stars, connections forming patterns in space
- **Colors**: Space black (#000), star white (#fff), subtle purple nebula (#8b5cf6)
- **Elements**: 32 twinkling stars (4 sizes), constellation lines, shooting stars, parallax layers
- **Hero**: "Data Architect" with floating animation

### 4. Terminal / Hacker Theme (`theme-terminal.html`)
- **Concept**: CLI aesthetic with typing animations
- **Colors**: True black (#000), matrix green (#00ff00), amber (#ffb000)
- **Elements**: Matrix rain, scanlines, CRT glow, terminal window with typed commands
- **Hero**: "DATA_ENGINEER" typed out letter-by-letter

### 5. AI/LLM Theme (`theme-ai-llm.html`)
- **Concept**: Modern chat interface inspired by AI assistants
- **Colors**: Deep space (#0f0f1a), AI purple (#a855f7), indigo (#6366f1)
- **Elements**: Gradient orbs, token stream animation, chat UI with messages, typing indicator
- **Hero**: "AI/ML Engineer" in chat bubble format

## Design Decisions Made
- All themes use pure HTML/CSS (no JavaScript frameworks for demos)
- Animations are CSS-based for performance
- Each demo is self-contained for easy comparison
- Dark themes throughout (fits tech/data aesthetic)
- Monospace fonts for terminal theme, SF Pro for others

## Next Phase
Once theme is selected:
1. Convert chosen theme to React components
2. Build out full portfolio sections (About, Projects, Skills, Contact)
3. Add routing and navigation
4. Implement responsive design
5. Deploy

## Technical Notes
- React app exists in `/my-portfolio` directory
- Consider Three.js for more advanced 3D effects if desired
- Current demos work as standalone HTML files
