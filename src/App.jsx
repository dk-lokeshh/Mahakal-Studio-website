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
import { TransitionProvider, useTransition } from './context/TransitionContext';
import Preloader from './components/ui/Preloader';
import PageTransitionOverlay from './components/ui/PageTransitionOverlay';

const AppContent = () => {
  const { isPreloading } = useTransition();

  return (
    <>
      <Preloader isLoading={isPreloading} />
      <PageTransitionOverlay />
      
      {/* Show content only after preloading? Or just hide it with z-index? 
          Preloader has z-100, so it covers everything. 
          We can render the app immediately so it mounts and is ready. */}
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
    </>
  );
};

function App() {
  return (
    <TransitionProvider>
      <AppContent />
    </TransitionProvider>
  );
}

export default App;