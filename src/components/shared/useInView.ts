import { useEffect, useRef, useState } from 'react';

type UseInViewOpts = {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
};

/**
 * Observes an element and reports when it first enters the viewport.
 * Stops observing after the first intersection (sticky true) unless `once: false`.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(opts: UseInViewOpts = {}) {
  const { threshold = 0.2, rootMargin = '0px', once = true } = opts;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView] as const;
}
