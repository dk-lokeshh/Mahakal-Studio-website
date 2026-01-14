import React, { createContext, useContext, useState, useEffect } from 'react';

const TransitionContext = createContext();

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const [isPreloading, setIsPreloading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionCallback, setTransitionCallback] = useState(null);

  // Complete preloading after a set time (simulating asset load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 2500); // 2.5s initial preloader
    return () => clearTimeout(timer);
  }, []);

  const startTransition = (callback) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionCallback(() => callback);
  };

  const endTransition = () => {
    if (transitionCallback) {
      transitionCallback();
      setTransitionCallback(null);
    }
    // Small delay to allow 'enter' animation to finish before 'exit' starts? 
    // Actually, usually we wait for 'enter' (cover screen), then call callback, then 'exit' (reveal).
    // The Overlay component will handle the timing of when to call 'endTransition' logic internally 
    // or expose a way to signal "covered".
    
    // Simplified flow: 
    // 1. set isTransitioning(true) -> Overlay animates IN.
    // 2. Overlay calls onCovered prop -> we execute callback -> Overlay animates OUT.
    // 3. Overlay calls onFinished prop -> set isTransitioning(false).
  };

  const onTransitionCovered = () => {
    // Execute navigation/scroll immediately when covered
    if (transitionCallback) {
      transitionCallback();
    }

    // Determine the delay before revealing the new page.
    // A small delay (e.g., 500ms) ensures the user perceives the "wipe" 
    // and gives the browser time to render the new scroll position while hidden.
    setTimeout(() => {
      setIsTransitioning(false); 
    }, 500); 
  };

  const onTransitionComplete = () => {
    setIsTransitioning(false);
    setTransitionCallback(null);
  };

  return (
    <TransitionContext.Provider
      value={{
        isPreloading,
        setIsPreloading,
        isTransitioning,
        startTransition,
        onTransitionCovered,
        onTransitionComplete
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};
