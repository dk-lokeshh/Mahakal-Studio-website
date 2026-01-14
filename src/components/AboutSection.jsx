import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import leadPhotographer from '../assets/ashu-mosaji.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const frameRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image slide in from left
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Frame decoration
      gsap.fromTo(frameRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // Badge pop in
      gsap.fromTo(badgeRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // Content slide in from right
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          }
        }
      );

      // Stagger stats
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems?.length) {
        gsap.fromTo(statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 md:py-36 overflow-hidden bg-white"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F8F8F8] to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#B8860B]/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image with Parallax */}
          <div className="relative">
            {/* Main Image Container */}
            <div ref={imageRef} className="relative z-10">
              <div className="relative">
                <img
                  src={leadPhotographer}
                  alt="Lead Photographer"
                  className="w-full max-w-md mx-2 lg:mx-0 rounded-2xl shadow-2xl object-cover"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
            
            {/* Decorative Gold Frame */}
            <div
              ref={frameRef}
              className="absolute -bottom-6 -right-6 w-full max-w-md h-full border-2 border-[#B8860B]/40 rounded-2xl -z-10 hidden lg:block"
            />
            
            {/* Experience Badge */}
            <div
              ref={badgeRef}
              className="absolute -bottom-4 -left-4 lg:left-auto lg:-right-8 lg:-bottom-8 bg-gradient-to-br from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-black px-6 py-4 rounded-2xl shadow-xl z-20"
            >
              <div className="text-center">
                <span className="block text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>10+</span>
                <span className="text-sm font-medium">Years of Excellence</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={contentRef} className="text-gray-800">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-gradient-to-r from-[#B8860B] to-[#D4AF37]" />
              <span className="text-[#B8860B] font-medium uppercase tracking-widest text-sm">About Us</span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The Art Behind
              <span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-cursive)" }}
              >
                Mahakal Studio
              </span>
            </h2>

            {/* Description Paragraphs */}
            <p className="text-lg leading-relaxed mb-6 text-gray-600">
              At Mahakal Studio, we believe photography is more than just capturing images; it's about
              crafting timeless stories. With a keen eye for detail and a passion for artistic
              expression, our team is dedicated to transforming your precious moments into visual
              legacies.
            </p>
            
            <p className="text-lg leading-relaxed mb-10 text-gray-600">
              Based in the beautiful town of Udaipura, we extend our services globally,
              ensuring every client receives a personalized journey from consultation to the
              final masterpiece. Trust us to preserve your memories with elegance and grace.
            </p>

            {/* Stats Row */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 mb-10 py-8 border-y border-gray-200">
              {[
                { number: '500+', label: 'Weddings' },
                { number: '2000+', label: 'Happy Clients' },
                { number: '50+', label: 'Awards' },
              ].map((stat, index) => (
                <div key={index} className="stat-item text-center">
                  <span 
                    className="block text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] to-[#B8860B]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.number}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="group relative overflow-hidden bg-black text-white py-4 px-10 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Our Story</span>
              <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-[#B8860B] to-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;