import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered animations
 * Provides consistent, modern animations across the site
 */

/**
 * Fade in from bottom animation
 * @param {Object} options - Animation options
 * @param {number} options.delay - Delay before animation starts
 * @param {number} options.duration - Animation duration
 * @param {number} options.y - Starting Y offset
 * @param {string} options.start - ScrollTrigger start position
 */
export function useFadeIn(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { delay = 0, duration = 1, y = 60, start = "top 85%" } = options;

    gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [options.delay, options.duration, options.y, options.start]);

  return ref;
}

/**
 * Slide in from left animation
 */
export function useSlideInLeft(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { delay = 0, duration = 1, x = -80, start = "top 85%" } = options;

    gsap.fromTo(
      element,
      { opacity: 0, x },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Slide in from right animation
 */
export function useSlideInRight(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { delay = 0, duration = 1, x = 80, start = "top 85%" } = options;

    gsap.fromTo(
      element,
      { opacity: 0, x },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Stagger animation for child elements
 * @param {string} childSelector - CSS selector for children to animate
 * @param {Object} options - Animation options
 */
export function useStaggerReveal(childSelector, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const {
      delay = 0,
      duration = 0.8,
      stagger = 0.15,
      y = 50,
      start = "top 80%",
    } = options;
    const children = container.querySelectorAll(childSelector);

    if (children.length === 0) return;

    gsap.fromTo(
      children,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [childSelector]);

  return ref;
}

/**
 * Scale up animation (for badges, buttons, etc.)
 */
export function useScaleIn(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      delay = 0,
      duration = 0.6,
      scale = 0.8,
      start = "top 85%",
    } = options;

    gsap.fromTo(
      element,
      { opacity: 0, scale },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Parallax effect on scroll
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [speed]);

  return ref;
}

/**
 * Text reveal animation (for headings)
 */
export function useTextReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { delay = 0, duration = 1.2, start = "top 85%" } = options;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 80,
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, []);

  return ref;
}

// Export GSAP for direct usage if needed
export { gsap, ScrollTrigger };
