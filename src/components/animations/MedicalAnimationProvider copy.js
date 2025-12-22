'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const MedicalAnimationProvider = ({ type = 'home' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const animations = useMemo(() => {
    const configs = {
      home: {
        kidneyCount: 6,
        spermCount: 15,
        endoscopeCount: 3,
        cellCount: 25,
        dnaCount: 4,
      },
      urology: {
        kidneyCount: 10,
        spermCount: 5,
        endoscopeCount: 2,
        cellCount: 20,
        dnaCount: 3,
      },
      andrology: {
        kidneyCount: 3,
        spermCount: 20,
        endoscopeCount: 1,
        cellCount: 15,
        dnaCount: 5,
      },
      endourology: {
        kidneyCount: 5,
        spermCount: 3,
        endoscopeCount: 8,
        cellCount: 10,
        dnaCount: 2,
      },
    };
    return configs[type] || configs.home;
  }, [type]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation Classes
    class KidneyAnimation {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = 30 + Math.random() * 40;
        this.speed = 0.5 + Math.random() * 0.8;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.pulse = 0;
        this.pulseSpeed = 0.03 + Math.random() * 0.02;
        this.color = Math.random() > 0.5 ? '#E9756D' : '#F6CA97';
      }

      update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        this.pulse += this.pulseSpeed;
        if (this.y > canvas.height + this.size) this.reset();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const pulseFactor = 1 + Math.sin(this.pulse) * 0.1;
        
        // Kidney shape
        ctx.beginPath();
        ctx.fillStyle = `${this.color}${Math.floor((0.1 + Math.sin(this.pulse) * 0.05) * 255).toString(16).padStart(2, '0')}`;
        
        for (let i = 0; i < Math.PI * 2; i += 0.05) {
          const radius = this.size * pulseFactor * (0.8 + 0.2 * Math.sin(i * 2));
          const x = Math.cos(i) * radius;
          const y = Math.sin(i) * radius * 0.6;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Inner structure (ureter)
        ctx.beginPath();
        ctx.strokeStyle = `${this.color}${Math.floor((0.3 + Math.sin(this.pulse) * 0.1) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.moveTo(0, -this.size * 0.3);
        ctx.lineTo(0, -this.size * 0.8);
        ctx.stroke();

        ctx.restore();
      }
    }

    class SpermAnimation {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 4 + Math.random() * 6;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.angle = Math.random() * Math.PI * 2;
        this.wiggle = 0;
        this.wiggleSpeed = 0.1 + Math.random() * 0.1;
        this.tailLength = 10 + Math.random() * 15;
      }

      update() {
        this.x += this.speedX + Math.sin(this.wiggle) * 0.5;
        this.y += this.speedY;
        this.wiggle += this.wiggleSpeed;
        this.angle = Math.atan2(this.speedY, this.speedX);

        // Boundary check
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.y > canvas.height + 20) this.y = -20;
        if (this.y < -20) this.y = canvas.height + 20;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Head
        ctx.beginPath();
        ctx.fillStyle = 'rgba(233, 117, 109, 0.8)';
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(246, 202, 151, 0.6)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        
        let prevX = 0;
        let prevY = 0;
        
        for (let i = 0; i < this.tailLength; i++) {
          const segmentX = -i * 2;
          const segmentY = Math.sin(this.wiggle + i * 0.3) * 3;
          
          if (i === 0) {
            ctx.moveTo(segmentX, segmentY);
          } else {
            ctx.lineTo(segmentX, segmentY);
          }
          
          prevX = segmentX;
          prevY = segmentY;
        }
        ctx.stroke();

        ctx.restore();
      }
    }

    class EndoscopeAnimation {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = 60 + Math.random() * 90;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.01 + Math.random() * 0.02;
        this.segments = 6;
        this.progress = 0;
      }

      update() {
        this.angle += this.speed;
        this.progress += 0.02;
        
        // Follow a circular path
        this.x = canvas.width / 2 + Math.cos(this.angle) * (canvas.width / 4);
        this.y = canvas.height / 2 + Math.sin(this.angle) * (canvas.height / 4);
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Main tube
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(233, 117, 109, 0.4)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        ctx.lineTo(this.length, 0);
        ctx.stroke();

        // Segments
        ctx.strokeStyle = 'rgba(246, 202, 151, 0.6)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < this.segments; i++) {
          const pos = (i / this.segments) * this.length;
          ctx.beginPath();
          ctx.moveTo(pos, -2);
          ctx.lineTo(pos, 2);
          ctx.stroke();
        }

        // Camera tip with light
        ctx.fillStyle = '#E9756D';
        ctx.beginPath();
        ctx.arc(this.length, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        // Light glow
        ctx.beginPath();
        ctx.fillStyle = `rgba(246, 202, 151, ${0.3 + Math.sin(this.progress) * 0.2})`;
        ctx.arc(this.length, 0, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    class DNAHelix {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.height = 80 + Math.random() * 120;
        this.width = 20;
        this.speed = 0.02 + Math.random() * 0.03;
        this.rotation = 0;
        this.basePairs = 8;
      }

      update() {
        this.rotation += this.speed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw DNA double helix
        ctx.strokeStyle = 'rgba(233, 117, 109, 0.2)';
        ctx.lineWidth = 1;

        // Backbone strands
        for (let strand = 0; strand < 2; strand++) {
          ctx.beginPath();
          const offset = strand * Math.PI;
          
          for (let i = 0; i < this.basePairs; i++) {
            const y = (i / (this.basePairs - 1)) * this.height - this.height / 2;
            const x = Math.cos((i * 2 + this.rotation * 10 + offset) * 2) * this.width;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Base pairs (rungs)
        for (let i = 0; i < this.basePairs; i++) {
          const y = (i / (this.basePairs - 1)) * this.height - this.height / 2;
          const x1 = Math.cos((i * 2 + this.rotation * 10) * 2) * this.width;
          const x2 = Math.cos((i * 2 + this.rotation * 10 + Math.PI) * 2) * this.width;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(246, 202, 151, ${0.3 + Math.sin(i + this.rotation) * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    // Create animation instances
    const kidneyAnimations = Array.from({ length: animations.kidneyCount }, () => new KidneyAnimation());
    const spermAnimations = Array.from({ length: animations.spermCount }, () => new SpermAnimation());
    const endoscopeAnimations = Array.from({ length: animations.endoscopeCount }, () => new EndoscopeAnimation());
    const dnaAnimations = Array.from({ length: animations.dnaCount }, () => new DNAHelix());

    const allAnimations = [
      ...kidneyAnimations,
      ...spermAnimations,
      ...endoscopeAnimations,
      ...dnaAnimations,
    ];

    const animate = () => {
      // Clear with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(253, 245, 238, 0.02)');
      gradient.addColorStop(1, 'rgba(249, 240, 232, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connecting network (micro-level interactions)
      ctx.strokeStyle = 'rgba(233, 117, 109, 0.02)';
      ctx.lineWidth = 0.3;
      
      for (let i = 0; i < allAnimations.length; i++) {
        for (let j = i + 1; j < allAnimations.length; j++) {
          const a1 = allAnimations[i];
          const a2 = allAnimations[j];
          const dx = a1.x - a2.x;
          const dy = a1.y - a2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(a1.x, a1.y);
            ctx.lineTo(a2.x, a2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw all animations
      allAnimations.forEach(anim => {
        anim.update();
        anim.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [animations]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: type === 'home' ? 1 : 0.5 }}
    />
  );
};

export default MedicalAnimationProvider;