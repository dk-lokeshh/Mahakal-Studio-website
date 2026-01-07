import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheckCircle, FaStar } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const packagesData = [
  {
    name: 'Gold',
    description: 'Our essential offering for beautifully captured moments.',
    features: [
      '6 Hours of Coverage',
      '1 Lead Photographer',
      '200+ Edited High-Res Images',
      'Online Private Gallery',
      'Basic Album Design',
    ],
    highlight: false,
  },
  {
    name: 'Platinum',
    description: 'Elevate your experience with extended coverage and premium deliverables.',
    features: [
      '8-10 Hours of Coverage',
      '1 Lead + 1 Associate Photographer',
      '350+ Edited High-Res Images',
      'Deluxe Online Gallery',
      'Premium Photo Album (12x12)',
      'Pre-Shoot Consultation',
    ],
    highlight: true,
  },
  {
    name: 'Diamond',
    description: 'The ultimate luxury package for an unparalleled experience.',
    features: [
      'Full Day Coverage (Up to 12 Hours)',
      '2 Lead Photographers + Assistant',
      '500+ Edited High-Res Images',
      'Cinematic Highlight Video (3-5 min)',
      'Luxury Designer Album (15x15)',
      'Engagement/Pre-Wedding Shoot',
      'Priority Post-Production',
    ],
    highlight: false,
  },
];

const PackageCard = ({ name, description, features, highlight }) => (
  <div className={`package-card relative group flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 ${
    highlight
      ? 'bg-gradient-to-b from-[#1a1a1a] to-black text-white shadow-2xl lg:scale-105 z-10'
      : 'bg-white text-black shadow-xl hover:shadow-2xl'
  }`}>
    {/* Popular Badge */}
    {highlight && (
      <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-black text-sm font-bold px-6 py-2 rounded-b-xl shadow-lg flex items-center gap-2">
        <FaStar className="text-xs" />
        Most Popular
        <FaStar className="text-xs" />
      </div>
    )}
    
    {/* Animated Border for Highlighted */}
    {highlight && (
      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] opacity-100">
        <div className="w-full h-full bg-gradient-to-b from-[#1a1a1a] to-black rounded-3xl" />
      </div>
    )}
    
    {/* Top Gradient Line for Non-highlighted */}
    {!highlight && (
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    )}
    
    {/* Content Container */}
    <div className={`relative z-10 p-8 lg:p-10 flex flex-col h-full ${highlight ? 'pt-14' : ''}`}>
      {/* Package Name */}
      <h3 
        className={`text-3xl lg:text-4xl font-bold mb-3 ${highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8860B]' : 'text-black'}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {name}
      </h3>
      
      {/* Description */}
      <p className={`text-lg mb-8 ${highlight ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
      
      {/* Features List */}
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className={`feature-item flex items-start gap-3 ${highlight ? 'text-gray-200' : 'text-gray-700'}`}
          >
            <FaCheckCircle className={`mt-1 flex-shrink-0 ${highlight ? 'text-[#D4AF37]' : 'text-[#B8860B]'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* CTA Button */}
      <a
        href="#contact"
        className={`group relative overflow-hidden block w-full py-4 rounded-full text-center text-lg font-semibold transition-all duration-300 hover:scale-105 ${
          highlight
            ? 'bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-black shadow-lg hover:shadow-xl'
            : 'bg-black text-white'
        }`}
      >
        <span className={`relative z-10 transition-colors duration-300 ${highlight ? 'group-hover:text-white' : 'group-hover:text-black'}`}>
          Inquire for Pricing
        </span>
        <div className={`absolute inset-0 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0 ${
          highlight ? 'bg-black' : 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37]'
        }`} />
      </a>
    </div>
    
    {/* Decorative Corner */}
    {!highlight && (
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#B8860B]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    )}
  </div>
);

const PackagesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const noteRef = useRef(null);

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

      // Stagger package cards
      const cards = cardsRef.current?.querySelectorAll('.package-card');
      if (cards?.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Note animation
      gsap.fromTo(noteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: noteRef.current,
            start: "top 90%",
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="packages" className="relative py-24 md:py-36 bg-[#FAFAFA] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#B8860B] font-medium uppercase tracking-widest text-sm">Investment</span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Invest in <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-cursive)" }}
            >Memories</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package for your special day. Each option is crafted to deliver an exceptional photography experience.
          </p>
        </div>

        {/* Packages Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto">
          {packagesData.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
        
        {/* Custom Package Note */}
        <div ref={noteRef} className="text-center mt-16">
          <p className="text-gray-600 text-lg">
            Need something customized? <a href="#contact" className="text-[#B8860B] font-semibold hover:underline">Contact us</a> for a tailored package.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;