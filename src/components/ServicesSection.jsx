import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart, FaCamera, FaBaby, FaBabyCarriage, FaBirthdayCake, FaUsers } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: FaHeart,
    title: 'Weddings',
    description: 'Your love story, immortalized. Exquisite wedding photography that captures every emotion and detail.',
  },
  {
    icon: FaCamera,
    title: 'Pre-Wedding',
    description: 'Romantic narratives. Beautifully crafted pre-wedding experiences that tell your unique journey.',
  },
  {
    icon: FaBaby,
    title: 'Newborn',
    description: 'Tiny treasures. Delicate and heartwarming newborn sessions, preserving their first precious moments.',
  },
  {
    icon: FaBabyCarriage,
    title: 'Maternity',
    description: 'Celebrating motherhood. Elegant maternity portraits that capture the beauty of anticipation.',
  },
  {
    icon: FaBirthdayCake,
    title: 'Events',
    description: 'Milestones & memories. Expert coverage for all your special events, big or small.',
  },
  {
    icon: FaUsers,
    title: 'Family',
    description: 'Generational legacies. Timeless family portraits you\'ll cherish for years to come.',
  },
];

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="service-card group relative bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden hover:-translate-y-4">
    {/* Gradient Background on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Top Accent Line */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    
    {/* Icon Container */}
    <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
      {/* Icon Background Circle */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/10 to-[#D4AF37]/10 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-transparent rounded-2xl" />
      <Icon className="relative z-10 text-4xl text-[#B8860B] group-hover:text-[#D4AF37] transition-colors duration-300" />
    </div>
    
    {/* Title */}
    <h3 
      className="text-2xl font-bold text-center mb-4 text-black group-hover:text-[#B8860B] transition-colors duration-300"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {title}
    </h3>
    
    {/* Description */}
    <p className="text-gray-600 text-center leading-relaxed mb-6">
      {description}
    </p>
    
    {/* Learn More Link */}
    <div className="text-center">
      <a 
        href="#contact" 
        className="inline-flex items-center gap-2 text-[#B8860B] font-semibold hover:text-[#8B6914] transition-colors group-hover:gap-4"
      >
        Learn More
        <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
      </a>
    </div>
    
    {/* Decorative Corner */}
    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#B8860B]/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

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

      // Stagger service cards
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            }
          }
        );
      }

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
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#B8860B]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px]" />
      
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

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
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