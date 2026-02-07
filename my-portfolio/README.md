# Future AI Portfolio

A cinematic, immersive 3D portfolio website built with React, Three.js, and Framer Motion. 

## Features
- **AI Wake-up Sequence**: Cinematic intro animation.
- **3D Robot Interface**: Interactive Three.js element reacting to mouse movement.
- **Glassmorphism Design**: High-end UI details.
- **Responsive System**: Fully responsive layout without frameworks like Tailwind (Vanilla CSS).

## Tech Stack
- React
- Vite
- @react-three/fiber (Three.js)
- Framer Motion
- Lucide React (Icons)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Customization
- **3D Model**: Replace `AICore` in `src/components/hero/RobotFace.jsx` with a `useGLTF` hook to load your `.glb` model.
- **Content**: Update data in components or move to a separate `data/` folder.
