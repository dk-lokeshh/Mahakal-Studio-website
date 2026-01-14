import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/Mahakal-Logo.png'; // Adjust path if needed

const Preloader = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1], 
                opacity: 1,
                filter: ["blur(10px)", "blur(0px)"]
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <img src={logo} alt="Mahakal Studio" className="h-24 md:h-32 w-auto object-contain" />
            </motion.div>

            {/* Text Animation */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white font-[var(-font-display)] tracking-wider">
                MAHAKAL <span className="text-[var(--gold-primary)]">STUDIO</span>
              </h1>
              <motion.div 
                className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              <p className="mt-3 text-[var(--gold-light)] text-sm tracking-[0.3em] uppercase opacity-80">
                Capturing Moments
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
