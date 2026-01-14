import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTransition } from '../context/TransitionContext';

import logo from '../assets/Mahakal-Logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { startTransition } = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e, href) => {
    e.preventDefault();
    if (isOpen) setIsOpen(false);

    startTransition(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' }); // Instant jump while hidden
      }
    });
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-black/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => handleNavigation(e, '#home')}
        >
          <img
            src={logo}
            alt="Mahakal Studio Logo"
            className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`}
          />
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-10">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <a
                href={item.href}
                className="relative text-white/90 hover:text-white text-[15px] font-medium tracking-wide transition-colors duration-300 group"
                onClick={(e) => handleNavigation(e, item.href)}
              >
                {item.name}
                {/* Animated Underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Book Now Button - Desktop */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(184, 134, 11, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavigation(e, '#contact')}
            className="relative overflow-hidden bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-black py-2.5 px-7 rounded-full text-sm font-semibold shadow-lg"
          >
            <span className="relative z-10">Book Now</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 w-full sm:w-80 h-screen bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col pt-20 px-8"
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl p-2"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>

              {/* Mobile Nav Items */}
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="text-white/80 hover:text-[#B8860B] text-xl font-medium py-3 border-b border-white/10 transition-colors"
                    onClick={(e) => handleNavigation(e, item.href)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Book Now Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <button 
                  onClick={(e) => handleNavigation(e, '#contact')}
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-[#8B6914] via-[#B8860B] to-[#D4AF37] text-black py-4 rounded-full text-lg font-semibold shadow-lg"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book Now</span>
                  <div className="absolute inset-0 translate-y-[100%] bg-black transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              </motion.div>

              {/* Social Links in Mobile Menu */}
              <div className="mt-auto mb-10">
                <p className="text-white/40 text-sm mb-4">Follow Us</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white/60 hover:text-[#B8860B] text-xl transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-white/60 hover:text-[#B8860B] text-xl transition-colors">
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Animated Border Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8860B]/50 to-transparent"
        initial={{ width: '0%', left: '50%', translateX: '-50%' }}
        animate={{ 
          width: isScrolled ? '100%' : '0%',
          left: '50%',
          translateX: '-50%'
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.header>
  );
};

export default Header;