import { useEffect, useRef, useState, type RefObject } from 'react';

type Options = {
  /** called each frame before state update; return false to skip setState */
  map?: (rect: DOMRect, vh: number) => number;
  /** only run while element intersects viewport; default true */
  onlyWhileVisible?: boolean;
};

/**
 * Tracks a scroll-driven progress value (0..1) for a target element.
 * Uses a single rAF-throttled scroll listener and pauses updates while off-screen.
 */
export function useScrollProgress<T extends HTMLElement>(
  opts: Options = {},
): [RefObject<T>, number] {
  const { map, onlyWhileVisible = true } = opts;
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let visible = !onlyWhileVisible;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (map) return map(rect, vh);
      const total = rect.height - vh;
      if (total <= 0) {
        const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        return p;
      }
      return Math.max(0, Math.min(1, -rect.top / total));
    };

    const schedule = () => {
      if (raf || !visible) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setProgress(compute());
      });
    };

    const io = onlyWhileVisible
      ? new IntersectionObserver(
          ([entry]) => {
            visible = !!entry?.isIntersecting;
            if (visible) schedule();
          },
          { rootMargin: '100px' },
        )
      : null;
    io?.observe(el);

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      io?.disconnect();
    };
  }, [map, onlyWhileVisible]);

  return [ref, progress];
}
