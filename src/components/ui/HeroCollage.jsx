import React from 'react';
import { cn } from '../../lib/utils';

// Keyframes for the floating animation
const animationStyle = `
  @keyframes float-up {
    0% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    50% { transform: translateY(-15px); box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3); }
    100% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
  }
  .animate-float-up {
    animation: float-up 6s ease-in-out infinite;
  }
`;

const HeroCollage = React.forwardRef(
  ({ className, title, subtitle, stats, images, ...props }, ref) => {
    // Use first 7 for desktop floating layout
    const floatingImages = images.slice(0, 7);
    // Use all images for mobile grid
    const allImages = images;

    return (
      <>
        <style>{animationStyle}</style>
        <section
          ref={ref}
          className={cn(
            'relative w-full bg-[var(--dark-primary)] py-16 sm:py-24 lg:py-20 overflow-hidden',
            className
          )}
          {...props}
        >
          {/* Main Content */}
          <div className="container relative z-10 mx-auto px-4 text-center">
            {/* Gold accent line */}
            {/* <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent" /> */}
            
            {/* <span className="mb-4 inline-block font-medium tracking-[0.3em] text-[var(--gold-primary)] uppercase text-sm">
              Portfolio
            </span> */}
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 px-4">
              {subtitle}
            </p>
          </div>

          {/* Desktop: Floating Image Collage (hidden on mobile) */}
          <div className="hidden lg:block relative z-0 mt-16 h-[600px]">
            <div className="relative h-full w-full max-w-6xl mx-auto">
              {/* Central Image */}
              {floatingImages[0] && (
                <img
                  src={floatingImages[0]}
                  alt="Wedding photography"
                  className="absolute left-1/2 top-1/2 h-[280px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl z-20 animate-float-up object-cover"
                  style={{ animationDelay: '0s' }}
                />
              )}
              {/* Top-Left */}
              {floatingImages[1] && (
                <img
                  src={floatingImages[1]}
                  alt="Pre-wedding shoot"
                  className="absolute left-[18%] top-[12%] h-[180px] w-[140px] rounded-xl shadow-lg z-10 animate-float-up object-cover"
                  style={{ animationDelay: '-1.2s' }}
                />
              )}
              {/* Top-Right */}
              {floatingImages[2] && (
                <img
                  src={floatingImages[2]}
                  alt="Couple portrait"
                  className="absolute right-[20%] top-[8%] h-[160px] w-[130px] rounded-xl shadow-lg z-10 animate-float-up object-cover"
                  style={{ animationDelay: '-2.5s' }}
                />
              )}
              {/* Bottom-Right */}
              {floatingImages[3] && (
                <img
                  src={floatingImages[3]}
                  alt="Wedding ceremony"
                  className="absolute right-[15%] bottom-[10%] h-[200px] w-[160px] rounded-xl shadow-lg z-30 animate-float-up object-cover"
                  style={{ animationDelay: '-3.5s' }}
                />
              )}
              {/* Far-Right */}
              {floatingImages[4] && (
                <img
                  src={floatingImages[4]}
                  alt="Bridal portrait"
                  className="absolute right-[5%] top-[35%] h-[170px] w-[140px] rounded-xl shadow-lg z-10 animate-float-up object-cover"
                  style={{ animationDelay: '-4.8s' }}
                />
              )}
              {/* Bottom-Left */}
              {floatingImages[5] && (
                <img
                  src={floatingImages[5]}
                  alt="Wedding moments"
                  className="absolute left-[12%] bottom-[8%] h-[190px] w-[150px] rounded-xl shadow-lg z-30 animate-float-up object-cover"
                  style={{ animationDelay: '-5.2s' }}
                />
              )}
              {/* Far-Left */}
              {floatingImages[6] && (
                <img
                  src={floatingImages[6]}
                  alt="Reception"
                  className="absolute left-[3%] top-[28%] h-[160px] w-[130px] rounded-xl shadow-lg z-10 animate-float-up object-cover"
                  style={{ animationDelay: '-6s' }}
                />
              )}
            </div>
          </div>

          {/* Mobile & Tablet: Responsive Grid (visible on small screens) */}
          <div className="lg:hidden mt-12 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-xl shadow-lg",
                    // Make first image larger on mobile
                    index === 0 ? "col-span-2 sm:col-span-1 row-span-2 sm:row-span-1" : ""
                  )}
                >
                  <img
                    src={image}
                    alt={`Wedding photo ${index + 1}`}
                    className={cn(
                      "w-full object-cover",
                      index === 0 ? "h-64 sm:h-48" : "h-32 sm:h-40"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="container relative z-10 mx-auto mt-12 sm:mt-16 px-4">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 lg:gap-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center min-w-[100px]">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gradient-gold">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
);

HeroCollage.displayName = 'HeroCollage';

export { HeroCollage };
