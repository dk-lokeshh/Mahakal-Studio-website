import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for performant parallax scroll effects
 * Uses GSAP ScrollTrigger with optimized settings for smooth animations
 */
export const useParallax = (options = {}) => {
  const elementRef = useRef(null);

  const {
    speed = 0.5, // Parallax speed factor (0-1, where 0.5 = 50% of scroll speed)
    direction = "vertical", // 'vertical' or 'horizontal'
    start = "top bottom",
    end = "bottom top",
    scrub = 1, // Smoothness of the animation (true = instant, number = smoothing time)
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Calculate movement based on speed and element height
    const movement =
      direction === "vertical"
        ? { yPercent: -100 * speed }
        : { xPercent: -100 * speed };

    const ctx = gsap.context(() => {
      gsap.to(element, {
        ...movement,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, direction, start, end, scrub]);

  return elementRef;
};

/**
 * Hook for multi-speed parallax rows (e.g., for grid layouts)
 * Returns refs for each row that moves at different speeds
 */
export const useParallaxRows = (rowCount = 2, baseSpeed = 0.2) => {
  const rowRefs = useRef([]);

  useEffect(() => {
    const contexts = [];

    rowRefs.current.forEach((row, index) => {
      if (!row) return;

      // Each row moves at progressively different speeds
      const speed = baseSpeed * (index + 1);

      const ctx = gsap.context(() => {
        gsap.to(row, {
          yPercent: -30 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      contexts.push(ctx);
    });

    return () => contexts.forEach((ctx) => ctx.revert());
  }, [rowCount, baseSpeed]);

  // Set ref for each row
  const setRowRef = useCallback(
    (index) => (el) => {
      rowRefs.current[index] = el;
    },
    []
  );

  return { setRowRef };
};

/**
 * Hook for mouse-following tilt effect on hover
 * Creates a 3D perspective tilt that follows cursor position
 */
export const useTiltEffect = (options = {}) => {
  const elementRef = useRef(null);
  const animationFrameRef = useRef(null);

  const {
    maxTilt = 10, // Maximum tilt angle in degrees
    scale = 1.02, // Scale on hover
    perspective = 1000,
    speed = 0.4, // Animation speed (0-1)
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set perspective on parent for 3D effect
    element.style.transformStyle = "preserve-3d";
    element.style.willChange = "transform";

    const handleMouseMove = (e) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on cursor position relative to center
        const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt;
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;

        gsap.to(element, {
          rotateX,
          rotateY,
          scale,
          duration: speed,
          ease: "power2.out",
          transformPerspective: perspective,
        });
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: speed * 1.5,
        ease: "power2.out",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [maxTilt, scale, perspective, speed]);

  return elementRef;
};

/**
 * Hook for floating elements that move on scroll with different speeds
 */
export const useFloatingElement = (options = {}) => {
  const elementRef = useRef(null);

  const {
    yOffset = 50, // Vertical movement range
    xOffset = 0, // Horizontal movement range
    rotation = 0, // Rotation range
    duration = 2, // Animation duration
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.style.willChange = "transform";

    const ctx = gsap.context(() => {
      // Initial floating animation
      gsap.to(element, {
        y: yOffset,
        x: xOffset,
        rotation,
        duration,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Parallax on scroll
      gsap.to(element, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    });

    return () => ctx.revert();
  }, [yOffset, xOffset, rotation, duration]);

  return elementRef;
};

export default useParallax;
