import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from '../../context/TransitionContext';

const PageTransitionOverlay = () => {
  const { isTransitioning, onTransitionCovered, onTransitionComplete } = useTransition();

  const variants = {
    initial: {
      scaleY: 0,
      transformOrigin: 'bottom',
    },
    animate: {
      scaleY: 1,
      transformOrigin: 'bottom',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom ease
      },
    },
    exit: {
      scaleY: 0,
      transformOrigin: 'top',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1, // Wait a tiny bit for the callback to finish
      },
    },
  };

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        onTransitionComplete();
      }}
    >
      {isTransitioning && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[90] bg-[#0a0a0a] pointer-events-none"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === 'animate') {
                onTransitionCovered();
              }
            }}
          >
            {/* Optional: Add a subtle loading or logo effect inside the transition overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0 }}
            >
               <div className="w-16 h-16 border-2 border-[var(--gold-primary)] rounded-full animate-ping opacity-20" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionOverlay;
