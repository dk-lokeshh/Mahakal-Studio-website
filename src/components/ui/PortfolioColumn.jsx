import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * PortfolioColumn - An infinite scrolling column of photos
 * @param {Object} props
 * @param {Array<{src: string, alt?: string}>} props.images - Array of image objects
 * @param {number} props.duration - Animation duration in seconds (default: 20)
 * @param {'up' | 'down'} props.direction - Scroll direction (default: 'up')
 * @param {string} props.className - Additional CSS classes
 */
export function PortfolioColumn({ 
  images = [], 
  duration = 10, 
  direction = 'up',
  className = '' 
}) {
  const columnRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const column = columnRef.current;
    if (!column || images.length === 0) return;

    const firstSet = column.querySelector('.image-set');
    if (!firstSet) return;
    
    // Function to setup/reset animation
    const setupAnimation = () => {
      const setHeight = firstSet.offsetHeight;
      
      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Set initial position based on direction
      const startY = direction === 'up' ? 0 : -setHeight;
      const endY = direction === 'up' ? -setHeight : 0;
      
      // Reset position to start to ensure clean loop
      // Note: This might cause a jump if resizing happens mid-animation, 
      // but it's necessary for the modulo logic to work correctly with new height
      gsap.set(column, { y: startY });

      // Create infinite scroll animation
      animationRef.current = gsap.to(column, {
        y: endY,
        duration: duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize(y => {
            // Loop the animation seamlessly with correctly updated height
            return parseFloat(y) % setHeight;
          })
        }
      });
    };

    // Initial setup
    setupAnimation();

    // Observe changes in height (e.g. image loads)
    const resizeObserver = new ResizeObserver(() => {
      setupAnimation();
    });

    resizeObserver.observe(firstSet);

    // Filter interaction
    const handleMouseEnter = () => animationRef.current?.pause();
    const handleMouseLeave = () => animationRef.current?.play();
    
    column.addEventListener('mouseenter', handleMouseEnter);
    column.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      resizeObserver.disconnect();
      column.removeEventListener('mouseenter', handleMouseEnter);
      column.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [images, duration, direction]);

  if (images.length === 0) return null;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={columnRef} className="flex flex-col">
        {/* First set of images */}
        <div className="image-set flex flex-col gap-4 pb-4">
          {images.map((image, index) => (
            <div 
              key={`first-${index}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-[var(--gold-glow)] transition-all duration-500"
            >
              <img
                src={image.src}
                alt={image.alt || `Wedding photo ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gold overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Optional caption */}
              {image.alt && (
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="image-set flex flex-col gap-4 pb-4">
          {images.map((image, index) => (
            <div 
              key={`second-${index}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-[var(--gold-glow)] transition-all duration-500"
            >
              <img
                src={image.src}
                alt={image.alt || `Wedding photo ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {image.alt && (
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioColumn;
