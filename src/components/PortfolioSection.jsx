import React from 'react';
import { PortfolioColumn } from './ui/PortfolioColumn';

// Indian Wedding Photography Portfolio
// High-quality Unsplash images showcasing traditional Indian weddings
const weddingPhotos = [
  // Column 1 - Bride & Bridal Details
  {
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&auto=format&q=80',
    alt: 'Beautiful Indian Bride',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=750&fit=crop&auto=format&q=80',
    alt: 'Bridal Mehendi Art',
  },
  {
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=800&fit=crop&auto=format&q=80',
    alt: 'Traditional Bridal Jewelry',
  },
  {
    src: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=600&h=700&fit=crop&auto=format&q=80',
    alt: 'Bridal Portrait',
  },

  // Column 2 - Ceremonies & Rituals
  {
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=800&fit=crop&auto=format&q=80',
    alt: 'Wedding Ceremony',
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=750&fit=crop&auto=format&q=80',
    alt: 'Sacred Wedding Rituals',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop&auto=format&q=80',
    alt: 'Couple Moments',
  },
  {
    src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=700&fit=crop&auto=format&q=80',
    alt: 'Wedding Celebration',
  },

  // Column 3 - Celebrations & Details
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=800&fit=crop&auto=format&q=80',
    alt: 'Wedding Venue',
  },
  {
    src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=750&fit=crop&auto=format&q=80',
    alt: 'Wedding Rings',
  },
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=800&fit=crop&auto=format&q=80',
    alt: 'Wedding Dance',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=700&fit=crop&auto=format&q=80',
    alt: 'Wedding Reception',
  },
];

// Split photos into 3 columns
const firstColumn = weddingPhotos.slice(0, 4);
const secondColumn = weddingPhotos.slice(4, 8);
const thirdColumn = weddingPhotos.slice(8, 12);

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative bg-[var(--dark-primary)] py-20 lg:py-32 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--gold-primary)] opacity-[0.03] blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[var(--gold-light)] opacity-[0.03] blur-3xl rounded-full" />
      
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-12 lg:mb-16 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold-primary)]/30 bg-[var(--glass-bg)] backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)] animate-pulse" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--gold-light)]">
              Portfolio
            </span>
          </div>
          
          {/* Title */}
          <h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Capturing <span className="text-gradient-gold">Timeless</span> Moments
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-400 text-lg max-w-xl">
            Every frame tells a story of love, tradition, and celebration. 
            Explore our collection of Indian wedding photography.
          </p>
        </div>
      </div>

      {/* Photo Columns */}
      <div 
        className="container mx-auto px-4 relative z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex justify-center gap-4 lg:gap-6 max-h-[700px] overflow-hidden">
          {/* Column 1 - Scrolls Up */}
          <PortfolioColumn 
            images={firstColumn} 
            duration={25} 
            direction="up"
            className="w-full max-w-[280px] lg:max-w-[320px]"
          />
          
          {/* Column 2 - Scrolls Down (hidden on mobile) */}
          <PortfolioColumn 
            images={secondColumn} 
            duration={30} 
            direction="down"
            className="hidden md:block w-full max-w-[280px] lg:max-w-[320px]"
          />
          
          {/* Column 3 - Scrolls Up (hidden on tablet) */}
          <PortfolioColumn 
            images={thirdColumn} 
            duration={22} 
            direction="up"
            className="hidden lg:block w-full max-w-[280px] lg:max-w-[320px]"
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="container mx-auto px-4 mt-16 lg:mt-20 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {[
            { value: '500+', label: 'Happy Couples' },
            { value: '1000+', label: 'Photos Delivered' },
            { value: '50+', label: 'Weddings Captured' },
            { value: '5+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-gradient-gold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;