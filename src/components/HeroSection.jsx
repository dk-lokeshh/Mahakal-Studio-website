import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    // Auto-advance images every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-[var(--dark-primary)] text-white">
      {/* Background Images Container - All images stacked */}
      <div className="absolute inset-0 z-0">
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

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        
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
          <span 
            className="block text-gradient-gold mt-2 text-6xl sm:text-8xl md:text-8xl lg:text-[6rem]"
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
          <a href="#contact" className="btn-primary group relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold tracking-wide">
            <span className="relative z-10">Book Your Date</span>
            <div className="absolute inset-0 -z-0 translate-y-[100%] bg-white transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          
          <a href="#portfolio" className="btn-outline group relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold tracking-wide backdrop-blur-sm hover:backdrop-blur-md">
            <span className="relative z-10 group-hover:text-black">View Gallery</span>
          </a>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
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
      
      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[var(--gold-primary)] opacity-[0.03] blur-3xl filter" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[var(--gold-light)] opacity-[0.03] blur-3xl filter" />
    </section>
  );
};

export default HeroSection;
