import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../shared/useReducedMotion';

export default function FlowFieldBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    let visible = true;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      if (!reduced) t += 0.005;

      const blobs = [
        {
          cx: w * 0.3 + Math.sin(t) * 100,
          cy: h * 0.4 + Math.cos(t * 1.3) * 80,
          color: 'rgba(255, 92, 58, 0.6)',
        },
        {
          cx: w * 0.7 + Math.cos(t * 0.8) * 120,
          cy: h * 0.6 + Math.sin(t * 1.1) * 90,
          color: 'rgba(107, 74, 255, 0.5)',
        },
        {
          cx: w * 0.5 + Math.sin(t * 1.4) * 150,
          cy: h * 0.3 + Math.cos(t) * 60,
          color: 'rgba(255, 184, 159, 0.4)',
        },
      ];

      ctx.fillStyle = '#0a0a15';
      ctx.fillRect(0, 0, w, h);

      blobs.forEach((b) => {
        const grad = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, 300);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });
    };

    const tick = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible && !reduced && !raf) {
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '50px' },
    );
    io.observe(container);

    if (reduced) draw();
    else tick();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, filter: 'blur(40px)' }}
        aria-hidden="true"
      />
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'overlay',
          opacity: 0.4,
        }}
        aria-hidden="true"
      >
        <filter id="flow-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
        </filter>
        <rect width="100%" height="100%" filter="url(#flow-grain)" />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--paper)',
            letterSpacing: '0.3em',
            marginBottom: 16,
          }}
        >
          — FLUID GRADIENT
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-jp-impact)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: 'var(--paper)',
            margin: 0,
            letterSpacing: '0.02em',
            lineHeight: 1,
            textShadow: '0 0 40px rgba(0,0,0,0.5)',
          }}
        >
          液体的背景
        </h3>
      </div>
    </div>
  );
}
