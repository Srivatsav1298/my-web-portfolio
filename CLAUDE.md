# VatsWebsite - Portfolio Project Context

## Project Overview
Personal portfolio website for Vatsav (Srivatsav) - Software Engineer focused on AI and Data. The site uses a React + Vite stack with Framer Motion for animations.

## Current State (Feb 8, 2026)
- **Hero Section**: Split layout (content left, profile right) - COMPLETED
- **Theme**: Silver (dark mode) + Apple colors (light mode) - COMPLETED
- **Projects**: Interactive filters + 3D glassmorphism - COMPLETED
- **AI Assistant**: Named "Starc" with enhanced animations - COMPLETED
- **Navbar**: Resume download button added - COMPLETED
- **Status**: All changes committed locally (c7d3ff1), ready to push to GitHub

## Project Structure
```
/VatsWebsite
├── /public
│   ├── /demos                           # Design mockups
│   │   ├── theme-*.html                 # 5 theme explorations
│   │   └── landing-*.html               # 4 landing page variations
│   └── /project-previews                # Project image generators
│       ├── oil-spill-generator.html
│       ├── energy-dashboard-generator.html
│       ├── financial-ai-generator.html
│       └── av-danse-generator.html
├── /my-portfolio                        # React app
│   ├── /src
│   │   ├── /assets                      # Images (profile.jpg)
│   │   ├── /components
│   │   │   ├── /sections
│   │   │   │   ├── IntroAnimation.jsx   # Hero section (split layout)
│   │   │   │   ├── IntroAnimation.css
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Projects.jsx         # Interactive filters + 3D glassmorphism
│   │   │   │   ├── Skills.jsx
│   │   │   │   ├── SkillsNetwork.jsx
│   │   │   │   ├── Timeline.jsx
│   │   │   │   └── Contact.jsx
│   │   │   ├── /ui                      # Reusable components
│   │   │   ├── /layout                  # Navbar, HUD
│   │   │   │   └── Navbar.jsx           # Resume download button
│   │   │   ├── AIChatAssistant.jsx      # AI assistant "Starc"
│   │   │   └── LoadTimeIndicator.jsx
│   │   ├── /data
│   │   │   └── portfolioData.js         # Centralized data
│   │   ├── /context
│   │   │   └── ThemeContext.jsx
│   │   ├── /canvas                      # Three.js/R3F components
│   │   ├── /utils                       # Utility functions
│   │   └── /styles
│   │       ├── sections.css             # Silver + Apple colors
│   │       └── utilities.css
│   ├── vite.config.js                   # Base: /my-web-portfolio/
│   └── package.json
├── todo.md                              # Current tasks
├── push-to-github.sh                    # Push script
└── CLAUDE.md                            # This file
```

## Hero Section Design (Implemented)
**File**: `my-portfolio/src/components/sections/IntroAnimation.jsx`

**Layout**: Split layout (50/50)
- **Left Side** (content, center-aligned):
  1. Greeting: "{time-based}, I'm"
  2. Large name: "Vatsav" (silver gradient, 48-80px)
  3. Role: "SOFTWARE ENGINEER"
  4. Tagline: "Building systems at the intersection of AI and Data"
  5. Stats: 3+ Years | 20+ Projects | AI & Data
  6. CTA buttons: View Work | Get in Touch

- **Right Side** (profile picture):
  - Rectangular with rounded corners (24px)
  - Max-width: 380px
  - Aspect ratio: 3:4 (portrait)
  - Center-aligned

**Behavior**:
- All content visible immediately on page load
- Staggered entrance animations (0.1s - 1.1s delays)
- Background photo at 6% opacity (grayscale, blurred)
- Both sides fade out and move up as user scrolls
- Section height: 150vh

## Key Technical Details
- **Framework**: React 18 + Vite
- **Animations**: Framer Motion (AnimatePresence for transitions)
- **3D Effects**: CSS 3D transforms (preserve-3d, translateZ, rotateX)
- **Glassmorphism**: backdrop-filter: blur() with rgba backgrounds
- **Styling**: CSS modules + global styles (sections.css, utilities.css)
- **State Management**: React useState for filters, ThemeContext for theme
- **Base URL**: `/my-web-portfolio/`
- **Dev Server**: `npm run dev` (port 5176, was 5173-5175)

## Current Features

### Hero Section (Split Layout)
- Content: Left side, center-aligned
- Profile: Right side, 380px rectangular with rounded corners
- Name: "Vatsav" with silver gradient (48-80px)
- Role: "SOFTWARE ENGINEER"
- Tagline: "Building systems at the intersection of AI and Data"
- Stats: 3+ Years | 20+ Projects | AI & Data
- Buttons: View Work, Get in Touch
- Scroll: Fade out effect for both sides

### Projects Section
- Interactive filtering (4 categories: All, AI & ML, Data Science, Full Stack)
- 3D glassmorphism cards with backdrop blur
- Floating glass panels (translateZ)
- Twinkling particles for depth
- Metrics badges over glassmorphic backgrounds
- Hover: 3D tilt + lift effect
- Smooth transitions with AnimatePresence

### Navbar
- Resume download button (left of theme toggle)
- Links: About, Work, Skills, Contact
- Icons: Resume (FileText), Theme Toggle, LinkedIn, GitHub
- Glassmorphic background when scrolled
- Silver (dark) / Black (light) colors

### AI Chat Assistant (Starc)
- Entrance animation (2s delay, bounce)
- Pulse animation (every 3s)
- Rotating sparkle effect
- Name: "Starc"
- Contextual responses about portfolio

### Skills Section
- Grid view with category-based organization
- 3D network visualization (SkillsNetwork component)
- Color-coded by category
- Interactive connections between related skills

## Design System

### Colors
**Dark Mode (Silver theme)**:
- Background: #050505 (near black)
- Primary text: #f0f0f0 (bright silver)
- Secondary text: #e0e0e0
- Tertiary text: #d0d0d0
- Muted text: #b0b0b0
- Borders: rgba(255, 255, 255, 0.1-0.2)

**Light Mode (Apple style)**:
- Background: #f5f5f5 (light gray)
- Primary text: #1d1d1f (near black)
- Secondary text: #6e6e73 (medium gray)
- Tertiary text: #86868b (light gray)
- Borders: rgba(0, 0, 0, 0.1-0.2)

### Typography
- **Font**: SF Pro Display (system font stack)
- **Hero name**: clamp(48px, 8vw, 80px)
- **Section titles**: Silver (dark) / Near black (light)

### Effects
- **Glassmorphism**: backdrop-filter: blur(20px)
- **3D transforms**: preserve-3d, translateZ, rotateX
- **Gradients**: Silver gradients for hero name
- **Buttons**: White with subtle glows

## Git Status
- **Last commit**: c7d3ff1 - "Update portfolio with complete redesign"
- **Commits ready to push**:
  - c7d3ff1: Portfolio redesign (36 files, 3546+, 1357-)
  - b10cc50: Redesign hero section with centered impact layout
  - f872408: Update portfolio with complete resume information
- **Branch**: main
- **Remote**: https://github.com/Srivatsav1298/my-web-portfolio.git
- **Status**: Ready to push (run `./push-to-github.sh`)

## Resume Context
When working on content, refer to:
- **Display Name**: Vatsav
- **Full Name**: Vatsav Saravanan (Srivatsav for external IDs)
- **Role**: Software Engineer | Data Science Graduate Student
- **Focus**: AI and Data
- **Experience**: 3+ years
- **Location**: Ås, Norway
- **Email**: srivatsavsaravanan@gmail.com
- **LinkedIn**: linkedin.com/in/srivatsav-saravanan

## Recent Changes (Feb 8, 2026)

### Hero Section Redesign
- Changed from centered to split layout (content left, profile right)
- Profile: rectangular with rounded corners (380px, 3:4 ratio)
- Name changed to "Vatsav" everywhere (was "Srivatsav")
- Reduced name font size (48-80px, was 64-140px)
- Both columns center-aligned and parallel
- Maintained fade-out scroll animation

### Color Scheme Updates
- Dark mode: Silver theme (#f0f0f0, #e0e0e0, #d0d0d0)
- Light mode: Apple style (#1d1d1f, #6e6e73, #86868b)
- Navbar: Bright readable text (no gradients)
- Removed all transparent gradient text effects
- Stats numbers: Enhanced brightness in both modes

### Projects Section Enhancement
- Interactive filter system (All, AI & ML, Data Science, Full Stack)
- 3D glassmorphism effects with backdrop blur
- Floating glass panels with translateZ transforms
- Twinkling particle effects for depth
- Project metrics badges (factual only, no hype)
- Smooth filter transitions with AnimatePresence
- Hover effects: 3D tilt (rotateX) + lift

### Navbar Updates
- Added resume download button (FileText icon)
- Special glassmorphic styling for download button
- Updated colors for readability (silver dark, black light)
- Logo changed to "VATSAV"

### AI Chat Assistant
- Renamed to "Starc"
- Enhanced entrance animation (bounce effect at 2s delay)
- Continuous pulse animation (every 3s)
- Enhanced sparkle effect (rotation + glow)

### Content Changes
- Removed "Experience Journey" title (minimal design)
- Removed hype metrics (3x faster, High, 99.99% uptime)
- Kept only factual badges (1M+ Records, SSB Data, etc.)
- Moved AWS Hackathon achievement to Certifications only

### Data Structure
- Centralized portfolio data in `src/data/portfolioData.js`
- Project categories: ai-ml, data-science, full-stack
- Skills network data with connections
- Consistent naming throughout

## Notes for Resuming
1. **Push to GitHub**: Run `./push-to-github.sh` in terminal
   - Username: `Srivatsav1298`
   - Password: Use Personal Access Token
2. Run `npm run dev` in my-portfolio/ to start server (port 5176)
3. Check todo.md for detailed task list
4. All major features complete - ready for deployment
5. Optional: Add resume.pdf to `my-portfolio/public/`
6. Optional: Generate project images using HTML generators in `/public/project-previews/`

## Dev Commands
```bash
# Start dev server
cd my-portfolio && npm run dev

# Current URL
http://localhost:5176/my-web-portfolio/

# Push to GitHub
./push-to-github.sh

# View commits ready to push
git log origin/main..HEAD --oneline
```
