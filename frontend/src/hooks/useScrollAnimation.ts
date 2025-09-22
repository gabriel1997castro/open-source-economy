import { useIntersectionObserver } from "./useIntersectionObserver";

export type AnimationType =
  | "fadeInUp"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "slideInFromBottom"
  | "slideInFromLeft"
  | "slideInFromRight";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  animationType?: AnimationType;
  triggerOnce?: boolean;
}

interface UseScrollAnimationReturn<T extends Element> {
  ref: React.RefObject<T | null>;
  className: string;
  style: React.CSSProperties;
}

/**
 * Hook for scroll-triggered animations with customizable timing and effects
 * @param options - Configuration for the animation
 * @returns Object with ref, className, and style for the animated element
 */
export function useScrollAnimation<T extends Element = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn<T> {
  const {
    threshold = 0.2,
    rootMargin = "0px 0px -50px 0px",
    delay = 0,
    animationType = "fadeInUp",
    triggerOnce = true,
  } = options;

  const { ref, isVisible } = useIntersectionObserver<T>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getAnimationClasses = (): string => {
    const baseClasses = "transform transition-all duration-700 ease-out";

    if (!isVisible) {
      switch (animationType) {
        case "fadeInUp":
        case "slideInFromBottom":
          return `${baseClasses} translate-y-8 opacity-0 scale-95`;
        case "fadeInLeft":
        case "slideInFromLeft":
          return `${baseClasses} translate-x-8 opacity-0`;
        case "fadeInRight":
        case "slideInFromRight":
          return `${baseClasses} -translate-x-8 opacity-0`;
        case "scaleIn":
          return `${baseClasses} scale-95 opacity-0`;
        default:
          return `${baseClasses} translate-y-8 opacity-0`;
      }
    }

    return `${baseClasses} translate-y-0 translate-x-0 opacity-100 scale-100`;
  };

  const style: React.CSSProperties = {
    transitionDelay: delay > 0 ? `${delay}ms` : undefined,
  };

  return {
    ref,
    className: getAnimationClasses(),
    style,
  };
}

/**
 * Hook specifically for animating page elements on mount
 */
export function usePageLoadAnimation<T extends Element = HTMLDivElement>(
  delay: number = 100
): UseScrollAnimationReturn<T> {
  return useScrollAnimation<T>({
    threshold: 0,
    rootMargin: "0px",
    delay,
    animationType: "fadeInUp",
    triggerOnce: true,
  });
}
