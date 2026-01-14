import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart, FaCamera, FaBaby, FaBabyCarriage, FaBirthdayCake, FaUsers } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// Premium Unsplash images for services
const services = [
  {
    icon: FaHeart,
    title: 'Weddings',
    description: 'Your love story, immortalized. Exquisite wedding photography that captures every emotion and detail.',
    // Wedding couple shot
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: FaCamera,
    title: 'Pre-Wedding',
    description: 'Romantic narratives. Beautifully crafted pre-wedding experiences that tell your unique journey.',
    // Romantic pre-wedding
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2070&auto=format&fit=crop', 
  },
  {
    icon: FaBaby,
    title: 'Newborn',
    description: 'Tiny treasures. Delicate and heartwarming newborn sessions, preserving their first precious moments.',
    // Cute newborn
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: FaBabyCarriage,
    title: 'Maternity',
    description: 'Celebrating motherhood. Elegant maternity portraits that capture the beauty of anticipation.',
    // Artistic maternity
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: FaBirthdayCake,
    title: 'Events',
    description: 'Milestones & memories. Expert coverage for all your special events, big or small.',
    // Celebration event
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop',
  },
  {
    icon: FaUsers,
    title: 'Family',
    description: 'Generational legacies. Timeless family portraits you\'ll cherish for years to come.',
    // Happy family
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=2070&auto=format&fit=crop',
  },
];

// Service card with tilt effect and background image
const ServiceCard = ({ icon: Icon, title, description, image, onMouseMove, onMouseLeave }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div 
      ref={cardRef}
      className="service-card service-card-parallax group relative bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden min-h-[400px] flex flex-col justify-end border-2 border-transparent hover:border-[#B8860B]/50"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark Overlay - Lighter on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 transition-opacity duration-500 opacity-90 group-hover:opacity-80" />
      </div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
      
      {/* Content Container - Relative to sit on top of bg */}
      <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
        {/* Icon Container */}
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center transition-transform duration-500" style={{ transform: 'translateZ(40px)' }}>
          {/* Icon Background Circle */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 border border-white/20" />
          <Icon className="relative z-10 text-3xl text-[#D4AF37] group-hover:text-[#FFD700] transition-colors duration-300" />
        </div>
        
        {/* Title */}
        <h3 
          className="text-2xl font-bold mb-3 text-white group-hover:text-[#D4AF37] transition-colors duration-300"
          style={{ fontFamily: "var(--font-display)", transform: 'translateZ(30px)' }}
        >
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out" style={{ transform: 'translateZ(20px)' }}>
          {description}
        </p>
        
        {/* Learn More Link */}
        <div style={{ transform: 'translateZ(25px)' }}>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-[#D4AF37] transition-colors group-hover:gap-4 text-sm uppercase tracking-wider"
          >
            Learn More
            <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const ctaRef = useRef(null);
  const floatingRef1 = useRef(null);
  const floatingRef2 = useRef(null);
  const floatingRef3 = useRef(null);

  // Split services into two rows
  const row1Services = services.slice(0, 3);
  const row2Services = services.slice(3, 6);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          }
        }
      );

      // Row 1 parallax - slower speed
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });

        // Initial reveal for row 1 cards
        const row1Cards = row1Ref.current.querySelectorAll('.service-card');
        gsap.fromTo(row1Cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 85%",
            }
          }
        );
      }

      // Row 2 parallax - faster speed (different direction for contrast)
      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });

        // Initial reveal for row 2 cards
        const row2Cards = row2Ref.current.querySelectorAll('.service-card');
        gsap.fromTo(row2Cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 85%",
            }
          }
        );
      }

      // Floating decorative elements parallax
      [floatingRef1, floatingRef2, floatingRef3].forEach((ref, index) => {
        if (ref.current) {
          gsap.to(ref.current, {
            yPercent: -30 - (index * 15),
            xPercent: index % 2 === 0 ? 10 : -10,
            rotation: index % 2 === 0 ? 15 : -15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            }
          });
        }
      });

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-36 bg-[#FAFAFA] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(184,134,11,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      {/* Floating Decorative Elements with Parallax */}
      <div 
        ref={floatingRef1}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-[#B8860B]/10 rounded-full blur-[100px] floating-element parallax-element" 
      />
      <div 
        ref={floatingRef2}
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] floating-element floating-element-delayed parallax-element" 
      />
      <div 
        ref={floatingRef3}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B8860B]/5 rounded-full blur-[150px] floating-element-slow parallax-element" 
      />
      
      {/* Additional floating geometric shapes */}
      <div className="absolute top-20 right-1/4 w-4 h-4 bg-[#B8860B]/30 rounded-full floating-element" />
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-[#D4AF37]/40 rounded-full floating-element floating-element-delayed" />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-[#B8860B]/50 rounded-full floating-element floating-element-slow" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#B8860B] font-medium uppercase tracking-widest text-sm">Our Services</span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          
          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tailored Services for
            <span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-cursive)" }}
            >
              Every Precious Occasion
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From intimate moments to grand celebrations, we offer specialized photography services 
            to capture every chapter of your life's beautiful journey.
          </p>
        </div>

        {/* Services Grid - Two Rows with Different Parallax Speeds */}
        <div className="space-y-8 lg:space-y-12">
          {/* Row 1 - Moves slower on scroll */}
          <div 
            ref={row1Ref} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 parallax-row"
          >
            {row1Services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          {/* Row 2 - Moves faster on scroll (opposite direction) */}
          <div 
            ref={row2Ref} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 parallax-row"
          >
            {row2Services.map((service, index) => (
              <ServiceCard key={index + 3} {...service} />
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <p className="text-gray-600 mb-6">Looking for something unique?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-black text-white py-4 px-10 rounded-full text-lg font-semibold hover:bg-[#B8860B] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Let's Discuss Your Vision
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;