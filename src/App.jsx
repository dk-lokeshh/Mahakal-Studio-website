import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioSection from './components/PortfolioSection';
import ServicesSection from './components/ServicesSection';
import PackagesSection from './components/PackagesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <SmoothScroll>
      <div className="bg-white text-dark-gray font-sans-body antialiased w-full overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <PackagesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;