'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageError, setImageError] = useState(false);
  
  // 3D Animation for the background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const particles: { x: number; y: number; radius: number; color: string; speedX: number; speedY: number }[] = [];
    const particleCount = width > 768 ? 50 : 30;
    const colors = ['rgba(99, 102, 241, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(217, 70, 239, 0.3)'];
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Recreate particles when resizing
      particles.length = 0;
      createParticles();
    };
    
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 7 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > height) {
          particle.speedY *= -1;
        }
      });
    };
    
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${(120 - distance) / 1200})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      drawParticles();
      connectParticles();
      requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const socialLinks = [
    { 
      href: 'https://github.com/devraikou', 
      icon: FiGithub, 
      label: 'GitHub' 
    },
    { 
      href: 'https://linkedin.com/in/ardagulez', 
      icon: FiLinkedin, 
      label: 'LinkedIn' 
    },
    { 
      href: 'https://twitter.com/devraikou', 
      icon: FiTwitter, 
      label: 'Twitter' 
    },
    { 
      href: 'https://instagram.com/ard4gulez', 
      icon: FiInstagram, 
      label: 'Instagram' 
    },
  ];

  // Bleach character svg as a fallback
  const renderBleachCharacterSVG = () => (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        <path 
          d="M250,100 C300,100 350,150 350,250 C350,350 300,400 250,400 C200,400 150,350 150,250 C150,150 200,100 250,100 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M190,180 C200,160 300,160 310,180 C320,200 300,230 250,230 C200,230 180,200 190,180 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M200,170 L200,150 L220,140 L240,150 L240,170" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M260,170 L260,150 L280,140 L300,150 L300,170" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M230,200 L270,200" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M250,230 L250,300" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M250,300 L200,350" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <path 
          d="M250,300 L300,350" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
    </div>
  );

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* 3D Animated Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Character Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 order-2 md:order-1"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
              <div className="relative aspect-square overflow-hidden rounded-full bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
                {!imageError ? (
                  <Image 
                    src="/images/profile.jpg" 
                    alt="Bleach Character" 
                    width={500}
                    height={500}
                    className="object-cover"
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : renderBleachCharacterSVG()}
              </div>
            </div>
          </motion.div>
          
          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left order-1 md:order-2"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-7xl font-bold mb-4"
            >
              <span className="gradient-text">Arda Gulez</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-3xl mb-8 inline-block relative"
            >
              <span>Full Stack Developer</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl max-w-2xl md:mx-0 mx-auto mb-10 opacity-80"
            >
              Building beautiful, responsive, and user-friendly web applications with modern technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center md:justify-start space-x-5 mb-12"
            >
              {socialLinks.map((link) => (
                <Link 
                  href={link.href} 
                  key={link.label}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 flex items-center justify-center rounded-full gradient-border hover:scale-110 transition-transform duration-300"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link 
                href="#projects" 
                className="gradient-border px-8 py-3 rounded-full inline-block hover:scale-105 transition-transform duration-300"
              >
                View My Work
              </Link>
              
              <Link 
                href="#contact" 
                className="px-8 py-3 rounded-full inline-block border border-gray-300 dark:border-gray-700 hover:border-transparent hover:gradient-border hover:scale-105 transition-all duration-300"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center pt-1"
          >
            <motion.div
              animate={{ height: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 