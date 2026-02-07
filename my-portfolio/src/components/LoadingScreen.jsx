import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

/**
 * LoadingScreen - Neural network boot-up animation
 * Shows a "system initializing" effect before revealing the site
 */
export default function LoadingScreen({ onLoadComplete }) {
  const [phase, setPhase] = useState(0); // 0: init, 1: connecting, 2: ready, 3: done
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Boot sequence messages
  const bootMessages = [
    'Initializing neural network...',
    'Loading synaptic connections...',
    'Establishing data pathways...',
    'Calibrating visual cortex...',
    'Synchronizing neural nodes...',
    'System ready.',
  ];

  // Canvas neural network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // Neural nodes
    const nodes = [];
    const nodeCount = 50;
    const connections = [];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        active: false,
        activationTime: 0,
      });
    }

    // Find connections
    const maxDist = 150;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          connections.push({ from: i, to: j, dist, pulseProgress: -1 });
        }
      }
    }

    let startTime = Date.now();
    let activatedCount = 0;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Activate nodes progressively
      const activationWave = elapsed * 15;
      nodes.forEach((node, i) => {
        if (!node.active && i < activationWave) {
          node.active = true;
          node.activationTime = elapsed;
          activatedCount++;
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        if (node.active) {
          const timeSinceActive = elapsed - node.activationTime;
          const pulse = Math.sin(timeSinceActive * 3) * 0.3 + 0.7;
          const alpha = Math.min(timeSinceActive * 2, 1) * pulse;

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 180, 185, ${alpha * 0.8})`;
          ctx.fill();

          // Glow
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 6
          );
          gradient.addColorStop(0, `rgba(200, 200, 205, ${alpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(200, 200, 205, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw and animate connections
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        if (fromNode.active && toNode.active) {
          // Start pulse if not started
          if (conn.pulseProgress < 0 && Math.random() < 0.02) {
            conn.pulseProgress = 0;
          }

          // Draw base line
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = 'rgba(100, 100, 105, 0.3)';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Draw pulse
          if (conn.pulseProgress >= 0 && conn.pulseProgress <= 1) {
            const px = fromNode.x + (toNode.x - fromNode.x) * conn.pulseProgress;
            const py = fromNode.y + (toNode.y - fromNode.y) * conn.pulseProgress;

            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(220, 220, 225, 0.9)';
            ctx.fill();

            conn.pulseProgress += 0.03;
            if (conn.pulseProgress > 1) {
              conn.pulseProgress = -1;
            }
          }
        }
      });

      // Update progress
      const progressPercent = Math.min((elapsed / 3.5) * 100, 100);
      setProgress(progressPercent);

      // Update phase
      if (elapsed < 0.5) setPhase(0);
      else if (elapsed < 2) setPhase(1);
      else if (elapsed < 3) setPhase(2);
      else if (elapsed >= 3.5) {
        setPhase(3);
        setTimeout(() => onLoadComplete?.(), 500);
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onLoadComplete]);

  // Update status text based on progress
  useEffect(() => {
    const messageIndex = Math.min(
      Math.floor(progress / 20),
      bootMessages.length - 1
    );
    setStatusText(bootMessages[messageIndex]);
  }, [progress]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <canvas ref={canvasRef} className="loading-screen__canvas" />

          <div className="loading-screen__content">
            {/* Logo / Name */}
            <motion.div
              className="loading-screen__logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="loading-screen__logo-text">V</span>
            </motion.div>

            {/* Progress bar */}
            <div className="loading-screen__progress-container">
              <div className="loading-screen__progress-bar">
                <motion.div
                  className="loading-screen__progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="loading-screen__progress-text">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Status text */}
            <motion.p
              className="loading-screen__status"
              key={statusText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {statusText}
            </motion.p>

            {/* System info */}
            <div className="loading-screen__info">
              <span>NEURAL.PORTFOLIO.SYS</span>
              <span>v2.0.26</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
