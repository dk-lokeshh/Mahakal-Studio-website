import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import testimonial1 from '../assets/avatars/testimonial_1.png';
import testimonial2 from '../assets/avatars/testimonial_2.png';
import testimonial3 from '../assets/avatars/testimonial_3.png';
import testimonial4 from '../assets/avatars/testimonial_4.png';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Priya & Rohit Sharma',
    role: 'Wedding Clients',
    image: testimonial1,
    content: 'Mahakal Studio captured our wedding with such finesse and artistry. Every image is a precious memory. The team was professional, unobtrusive, and incredibly creative. We couldn\'t have asked for better!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anjali Mehta',
    role: 'Maternity & Newborn',
    image: testimonial2,
    content: 'From my maternity shoot to my baby\'s first photoshoot, Mahakal Studio was exceptional. They made us feel so comfortable and the photos are absolutely stunning. True artists at work!',
    rating: 5,
  },
  {
    id: 3,
    name: 'The Kapoor Family',
    role: 'Family Portrait',
    image: testimonial3,
    content: 'Getting everyone together for a family photo was challenging, but the Mahakal team handled it beautifully. The portraits are elegant and timeless. Highly recommend their services!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'Corporate Event',
    image: testimonial4,
    content: 'We hired Mahakal Studio for our company\'s annual gala, and they exceeded all expectations. Professional, punctual, and the quality of work is outstanding. Will definitely book again!',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);
  const contentRef = useRef(null);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  // GSAP animations
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

      // Carousel container
      gsap.fromTo(carouselRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate content change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [current]);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 md:py-36 bg-gradient-to-b from-black via-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#B8860B]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px]" />
      </div>
      
      {/* Large Quote Decoration */}
      <div className="absolute top-20 left-10 md:left-20 text-[#B8860B]/5 pointer-events-none">
        <FaQuoteLeft className="text-[200px] md:text-[300px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#B8860B]" />
            <span className="text-[#B8860B] font-medium uppercase tracking-widest text-sm">Testimonials</span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#B8860B]" />
          </div>
          
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Our <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-cursive)" }}
            >Clients Say</span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div ref={carouselRef} className="max-w-4xl mx-auto">
          <div className="relative min-h-[400px] flex items-center">
            <div ref={contentRef} key={current} className="w-full">
              <div className="text-center px-4">
                {/* Client Image */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#B8860B]/50"
                  />
                  {/* Gold Ring */}
                  <div className="absolute -inset-2 rounded-full border-2 border-[#B8860B]/30 animate-pulse" />
                </div>
                
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#D4AF37] text-lg" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light italic">
                  "{testimonials[current].content}"
                </blockquote>
                
                {/* Client Info */}
                <div>
                  <h4 
                    className="text-xl font-semibold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {testimonials[current].name}
                  </h4>
                  <p className="text-[#B8860B] font-medium mt-1">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white/60 hover:border-[#B8860B] hover:text-[#B8860B] transition-all duration-300 hover:scale-110"
            >
              <FaChevronLeft />
            </button>
            
            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === current 
                      ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] w-8'
                      : 'bg-white/30 hover:bg-white/50 w-3'
                  }`}
                />
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white/60 hover:border-[#B8860B] hover:text-[#B8860B] transition-all duration-300 hover:scale-110"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;