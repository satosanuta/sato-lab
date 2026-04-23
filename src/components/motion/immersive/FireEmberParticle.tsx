import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../shared/useReducedMotion';

type Ember = {
  x: number;
  y: number;
  vy: number; // upward speed (negative = up)
  vx: number; // horizontal wobble
  r: number; // radius
  hue: number; // 0..1 → #ff6a3c → #ffb068
  phase: number; // wobble phase offset
};

function lerpColor(t: number): string {
  // #ff6a3c → #ffb068
  const r = Math.round(0xff + (0xff - 0xff) * t);
  const g = Math.round(0x6a + (0xb0 - 0x6a) * t);
  const b = Math.round(0x3c + (0x68 - 0x3c) * t);
  return `rgb(${r},${g},${b})`;
}

function makeEmber(w: number, h: number, randomY = true): Ember {
  return {
    x: Math.random() * w,
    y: randomY ? Math.random() * h : h + Math.random() * 20,
    vy: -(0.3 + Math.random() * 1.2),
    vx: 0,
    r: 1 + Math.random() * 3,
    hue: Math.random(),
    phase: Math.random() * Math.PI * 2,
  };
}

export default function FireEmberParticle() {
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
    let visible = true;
    let frame = 0;

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

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
    const w = () => canvas.width / dpr();
    const h = () => canvas.height / dpr();

    // Init ~80 particles
    const embers: Ember[] = [];
    for (let i = 0; i < 80; i++) {
      embers.push(makeEmber(w(), h(), true));
    }

    const draw = () => {
      const W = w();
      const H = h();
      frame++;

      // Dark background with slight trail fade
      ctx.fillStyle = reduced ? '#1a0f0a' : 'rgba(26,15,10,0.25)';
      ctx.fillRect(0, 0, W, H);

      // Bottom glow vignette
      const grad = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, W * 0.6);
      grad.addColorStop(0, 'rgba(255,100,40,0.18)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, H * 0.5, W, H * 0.5);

      embers.forEach((e) => {
        if (!reduced) {
          // Horizontal wobble using sine
          e.vx = Math.sin(frame * 0.04 + e.phase) * 0.3;
          e.x += e.vx;
          e.y += e.vy;

          // Respawn at bottom when particle exits top
          if (e.y < -e.r * 2) {
            const fresh = makeEmber(W, H, false);
            e.x = fresh.x;
            e.y = fresh.y;
            e.vy = fresh.vy;
            e.r = fresh.r;
            e.hue = fresh.hue;
            e.phase = fresh.phase;
          }
          // Wrap horizontally
          if (e.x < -4) e.x = W + 4;
          if (e.x > W + 4) e.x = -4;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor(e.hue);
        ctx.shadowColor = lerpColor(e.hue);
        ctx.shadowBlur = e.r * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const tick = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible && !reduced && raf === 0) {
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '50px' },
    );
    io.observe(container);

    if (reduced) {
      draw();
    } else {
      tick();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: 500, overflow: 'hidden', background: '#1a0f0a' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          pointerEvents: 'none',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontWeight: 900,
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            color: '#fff8f0',
            margin: 0,
            letterSpacing: '0.08em',
            textShadow: '0 0 40px rgba(255,120,60,0.6)',
          }}
        >
          炉端は冷めない
        </h3>
        <div
          style={{
            fontFamily: 'var(--font-en-serif)',
            fontStyle: 'italic',
            fontSize: 17,
            color: 'rgba(255,176,104,0.85)',
            marginTop: 14,
            letterSpacing: '0.04em',
          }}
        >
          Keep the hearth alive
        </div>
      </div>
    </div>
  );
}
