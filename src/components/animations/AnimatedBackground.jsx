// components/AnimatedBackground.js (Updated with new colors)
'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse move effect
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Particle system for background effect
    const particles = [];
    const particleCount = 60;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // Use logo colors with different opacities
        const colors = [
          `rgba(233, 117, 109, ${Math.random() * 0.3 + 0.1})`, // #E9756D
          `rgba(246, 202, 151, ${Math.random() * 0.2 + 0.05})`, // #F6CA97
          `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }
        
        // Boundaries
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect for some particles
        if (Math.random() > 0.7) {
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Draw gradient background
    const drawGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(249, 240, 232, 0.1)'); // Very light peach
      gradient.addColorStop(0.5, 'rgba(255, 250, 245, 0.05)'); // Off-white
      gradient.addColorStop(1, 'rgba(253, 245, 238, 0.1)'); // Very light peach
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Animation loop
    const animate = () => {
      drawGradient();
      
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            // Use logo colors for connections
            const color1 = particles[i].color.includes('233, 117') ? 
              `rgba(233, 117, 109, ${0.08 * (1 - distance/120)})` : // #E9756D
              `rgba(246, 202, 151, ${0.06 * (1 - distance/120)})`; // #F6CA97
            ctx.strokeStyle = color1;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9F0E8]/20 via-white/5 to-[#FDF5EE]/10" />
    </>
  );
}