import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaFacebookF, FaYoutube, FaHeart, FaArrowUp } from 'react-icons/fa';
import { useTransition } from '../context/TransitionContext';

import logo from '../assets/Mahakal-Logo.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const columnsRef = useRef(null);
  const { startTransition } = useTransition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (e, href) => {
    e.preventDefault();
    startTransition(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Wedding Photography',
    'Pre-Wedding Shoots',
    'Newborn Sessions',
    'Maternity Portraits',
    'Event Coverage',
    'Family Portraits',
  ];

  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/mahakalstudio/', label: 'Instagram' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/mahakalstudioudaipur/', label: 'Facebook' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@mahakalstudio', label: 'YouTube' },
  ];

  // GSAP animations
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Stagger footer columns
      const columns = columnsRef.current?.querySelectorAll('.footer-column');
      if (columns?.length) {
        gsap.fromTo(columns,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 85%",
            }
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-b from-[#0a0a0a] via-[#111] to-black overflow-hidden">
      {/* Wave Divider */}
      <div className="absolute -top-1 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#F8F8F8"
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,50 1440,50 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#B8860B]/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px]" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-28 md:pt-36 pb-10 relative z-10">
        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="footer-column lg:col-span-1">
            <img src={logo} alt="Mahakal Studio" className="h-14 mb-6" />
            <p className="text-gray-400 leading-relaxed mb-6">
              Crafting visual legacies through the art of photography. Based in Udaipura, serving clients worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#B8860B] hover:text-white hover:border-[#B8860B] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 
              className="text-white text-lg font-semibold mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#B8860B] to-transparent" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className="text-gray-400 hover:text-[#B8860B] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-0 h-[1px] bg-[#B8860B] group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3 
              className="text-white text-lg font-semibold mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#B8860B] to-transparent" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavigation(e, '#services')}
                    className="text-gray-400 hover:text-[#B8860B] transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-0 h-[1px] bg-[#B8860B] group-hover:w-3 transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3 
              className="text-white text-lg font-semibold mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#B8860B] to-transparent" />
              Contact
            </h3>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-start gap-3">
                <span className="text-[#B8860B]">📍</span>
                Udaipura, Madhya Pradesh, India
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#B8860B]">📞</span>
                <a href="tel:+919876543210" className="hover:text-[#B8860B] transition-colors">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#B8860B]">✉️</span>
                <a href="mailto:info@mahakalstudio.com" className="hover:text-[#B8860B] transition-colors">
                  info@mahakalstudio.com
                </a>
              </p>
            </div>
            
            {/* Newsletter Mini Form */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-3">Subscribe for updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#B8860B] focus:outline-none transition-colors text-sm"
                />
                <button className="group relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-lg text-black font-semibold text-sm transition-transform hover:scale-105">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">→</span>
                  <div className="absolute inset-0 translate-y-[100%] bg-black transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Mahakal Studio. All rights reserved. Made with{' '}
              <FaHeart className="inline text-[#B8860B] mx-1" /> in Udaipura
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-[#B8860B] transition-colors group"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#B8860B] group-hover:border-[#B8860B] transition-all duration-300 group-hover:scale-110">
                <FaArrowUp className="text-sm group-hover:text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;