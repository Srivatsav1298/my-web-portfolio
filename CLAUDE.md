# VatsWebsite - Portfolio Project Context

## Project Overview
Personal portfolio website for Srivatsav - Software Engineer focused on AI and Data. The site uses a React + Vite stack with Framer Motion for animations.

## Current State
- **Hero Section**: Redesigned with "Centered Impact" layout (completed)
- **Theme**: Dark theme with grayscale gradients
- **Status**: Development - hero section pushed, other sections have uncommitted changes

## Project Structure
```
/VatsWebsite
├── /public
│   └── /demos                           # Design mockups
│       ├── theme-*.html                 # 5 theme explorations
│       └── landing-*.html               # 4 landing page variations
├── /my-portfolio                        # React app
│   ├── /src
│   │   ├── /assets                      # Images (profile.jpg)
│   │   ├── /components
│   │   │   ├── /sections
│   │   │   │   ├── IntroAnimation.jsx   # Hero section (redesigned)
│   │   │   │   ├── IntroAnimation.css
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Projects.jsx
│   │   │   │   ├── Skills.jsx
│   │   │   │   ├── SkillsNetwork.jsx
│   │   │   │   ├── Timeline.jsx
│   │   │   │   └── Contact.jsx
│   │   │   ├── /ui                      # Reusable components
│   │   │   └── /layout                  # Navbar, HUD, etc.
│   │   ├── /context
│   │   │   └── ThemeContext.jsx         # Greeting based on time
│   │   ├── /canvas                      # Three.js/R3F components
│   │   └── /styles
│   ├── vite.config.js                   # Base: /my-web-portfolio/
│   └── package.json
├── todo.md                              # Current tasks
└── CLAUDE.md                            # This file
```

## Hero Section Design (Implemented)
**File**: `my-portfolio/src/components/sections/IntroAnimation.jsx`

Layout (top to bottom, centered):
1. Small circular photo (80px)
2. Greeting: "{time-based}, I'm"
3. Large name: "Srivatsav" (vertical gradient)
4. Role: "SOFTWARE ENGINEER"
5. Tagline: "Building systems at the intersection of AI and Data"
6. Stats: 3+ Years | 20+ Projects | AI & Data
7. CTA buttons: View Work | Get in Touch
8. Mouse scroll indicator

Behavior:
- All content visible immediately on page load
- Staggered entrance animations (0.1s - 1.1s delays)
- Background photo at 6% opacity (grayscale, blurred)
- Content fades out and moves up as user scrolls
- Section height: 150vh

## Key Technical Details
- **Framework**: React 18 + Vite
- **Animations**: Framer Motion
- **3D**: Three.js / React Three Fiber (canvas components)
- **Styling**: CSS modules + global styles
- **Base URL**: `/my-web-portfolio/`
- **Dev Server**: `npm run dev` (port 5173+)

## Design System
- **Background**: #050505 (near black)
- **Text Primary**: #ffffff → #606060 (vertical gradient)
- **Text Secondary**: #808080
- **Text Muted**: #505050
- **Borders**: rgba(255, 255, 255, 0.1-0.2)
- **Font**: SF Pro Display (system font stack)
- **Accent**: White buttons, subtle glows

## Git Status
- **Last commit**: b10cc50 - "Redesign hero section with centered impact layout"
- **Branch**: main
- **Remote**: https://github.com/Srivatsav1298/my-web-portfolio.git
- **Uncommitted**: Multiple files in sections, styles, and config (see todo.md)

## Resume Context
When working on content, refer to:
- Role: Software Engineer
- Focus: AI and Data
- Experience: 3+ years
- Name: Srivatsav (display) / Srivatsav (full)

## Notes for Resuming
1. Run `git status` to see uncommitted changes
2. Run `npm run dev` in my-portfolio/ to start server
3. Check todo.md for current task list
4. Hero section is complete - focus on other sections next
5. Consider reviewing/committing or discarding uncommitted changes
