import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTransition } from '../context/TransitionContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Array of stunning Indian wedding images
const heroImages = [
  'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop',
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Auto-advance images every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effects
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background parallax - moves slower than scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

      // Content parallax - moves slightly faster, creates depth
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          }
        });
      }

      // Orb parallax effects
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          yPercent: -40,
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          yPercent: -60,
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse-following effect for orbs
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage from center
      const xPercent = (clientX - innerWidth / 2) / (innerWidth / 2);
      const yPercent = (clientY - innerHeight / 2) / (innerHeight / 2);

      // Move orbs subtly based on mouse position
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: xPercent * 30,
          y: yPercent * 30,
          duration: 1,
          ease: "power2.out",
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -xPercent * 40,
          y: -yPercent * 40,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative h-screen w-full overflow-hidden bg-[var(--dark-primary)] text-white"
    >
      {/* Background Images Container - Parallax layer */}
      <div ref={bgRef} className="absolute inset-0 z-0 hero-bg-animate parallax-element" style={{ willChange: 'transform' }}>
        {heroImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img 
              src={src}
              alt={`Wedding photo ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--dark-primary)]" />
        
        {/* Dot Pattern Overlay for texture */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content Container - Faster parallax layer */}
      <div 
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center parallax-element"
        style={{ willChange: 'transform' }}
      >
        
        {/* Animated Badge */}
        <div className="animate-fade-in-down mb-6 inline-flex items-center rounded-full border border-[var(--gold-glow)] bg-[var(--glass-bg)] px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[var(--gold-primary)] animate-pulse shadow-[0_0_10px_var(--gold-primary)]" />
          <span className="ml-3 text-xs font-medium tracking-[0.2em] uppercase text-[var(--gold-light)]">
            Premium Wedding Photography
          </span>
        </div>

        {/* Main Title */}
        <h1 className="animate-reveal-text mb-6 max-w-4xl leading-tight tracking-tight">
          <span 
            className="block text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Mahakal
          </span>
          <br />
          <span 
            className="block text-gradient-gold mt-[-0.6rem] text-6xl sm:text-8xl md:text-8xl lg:text-[6rem]"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            Studio
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up mb-10 max-w-2xl text-lg text-gray-300 sm:text-xl font-light tracking-wide">
          Capturing the timeless elegance of your love story with cinematic grandeur and artistic vision.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col items-center gap-4 sm:flex-row sm:gap-6 delay-200">
          <button 
            onClick={() => {
              startTransition(() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'instant' });
              });
            }}
            className="btn-primary group relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold tracking-wide"
          >
            <span className="relative z-10">Book Your Date</span>
            <div className="absolute inset-0 -z-0 translate-y-[100%] bg-white transition-transform duration-300 group-hover:translate-y-0" />
          </button>
          
          <button 
            onClick={() => {
              startTransition(() => {
                const element = document.querySelector('#portfolio');
                element?.scrollIntoView({ behavior: 'instant' });
              });
            }}
            className="btn-outline group relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold tracking-wide backdrop-blur-sm hover:backdrop-blur-md"
          >
            <span className="relative z-10 group-hover:text-black">View Gallery</span>
          </button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 hero-indicators-animate">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'w-8 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)]' 
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative Gradient Orbs with mouse-following + scroll parallax */}
      <div 
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[var(--gold-primary)] blur-3xl filter hero-orb-animate floating-element parallax-element" 
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[var(--gold-light)] blur-3xl filter hero-orb-animate floating-element-delayed parallax-element" 
        style={{ animationDelay: '1s', willChange: 'transform' }} 
      />
      
      {/* Additional floating particles */}
      <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-[var(--gold-light)]/50 rounded-full floating-element" />
      <div className="absolute top-2/3 right-1/5 w-3 h-3 bg-[var(--gold-primary)]/40 rounded-full floating-element floating-element-delayed" />
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/30 rounded-full floating-element floating-element-slow" />
    </section>
  );
};

export default HeroSection;
