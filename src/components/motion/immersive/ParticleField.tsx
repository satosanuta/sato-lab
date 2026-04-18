import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../shared/useReducedMotion';

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
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

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const particles: P[] = [];
    const count = 80;
    const w0 = canvas.width / (window.devicePixelRatio || 1);
    const h0 = canvas.height / (window.devicePixelRatio || 1);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w0,
        y: Math.random() * h0,
        vx: reduced ? 0 : (Math.random() - 0.5) * 0.3,
        vy: reduced ? 0 : (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      });
    }

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    if (!reduced) {
      container.addEventListener('mousemove', onMove);
      container.addEventListener('mouseleave', onLeave);
    }

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        if (!reduced) {
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120 && d > 0) {
            p.vx += (dx / d) * 0.15;
            p.vy += (dy / d) * 0.15;
          }
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8a6e';
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 138, 110, ${(1 - d / 100) * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const tick = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    // Pause when off-screen
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

    if (reduced) {
      draw(); // single static render
    } else {
      tick();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: 500, overflow: 'hidden', background: '#0a0a15' }}
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
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: '0.3em',
            marginBottom: 20,
          }}
        >
          — INTERACTIVE PARTICLES / マウスで操作
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--paper)',
            margin: 0,
            letterSpacing: '0.05em',
          }}
        >
          粒子が呼応する
        </h3>
        <div
          style={{
            fontFamily: 'var(--font-en-serif)',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--accent-soft)',
            marginTop: 12,
          }}
        >
          Move your cursor
        </div>
      </div>
    </div>
  );
}
