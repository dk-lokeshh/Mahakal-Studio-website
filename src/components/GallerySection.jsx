'use client';

import React from 'react';
import { ZoomParallax } from './ui/ZoomParallax';
import { cn } from '../lib/utils';

// Indian wedding and pre-wedding photography for Mahakal Studio
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Traditional Indian wedding ceremony',
  },
  {
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Indian pre-wedding couple shoot',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Beautiful Indian bride with mehendi',
  },
  {
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Bridal portrait with traditional jewelry',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Wedding couple first look',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Wedding rings and henna hands',
  },
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Joyful wedding celebration dance',
  },
];

export default function GallerySection() {
  return (
    <section id="portfolio" className="relative w-full bg-[var(--dark-primary)]">
      {/* Section Header */}
      <div className="relative flex min-h-[50vh] items-center justify-center px-4">
        {/* Radial spotlight effect */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.15),transparent_50%)]',
            'blur-[30px]'
          )}
        />
        
        <div className="relative z-10 text-center">
          {/* Gold accent line */}
          <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent" />
          
          <span className="mb-4 inline-block font-medium tracking-[0.3em] text-[var(--gold-primary)] uppercase text-sm">
            Portfolio
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[var(--font-display)]">
            Visual <span className="text-gradient-gold">Journey</span>
          </h2>
          
          <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg">
            Explore our collection of timeless moments and artistic storytelling
          </p>
          
          {/* Scroll indicator removed */}
        </div>
      </div>

      {/* Zoom Parallax Gallery */}
      <ZoomParallax images={galleryImages} />

      {/* Bottom spacing with fade transition */}
      <div className="h-[30vh] bg-gradient-to-b from-[var(--dark-primary)]" />
    </section>
  );
}
