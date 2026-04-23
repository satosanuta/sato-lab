import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../shared/useReducedMotion';

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
const TTL = 1500; // ms
const SPAWN_INTERVAL = 50; // ms
const MAX_RUNES = 40;
const FLOAT_DIST = 30; // px up over TTL

type RuneParticle = {
  x: number;
  y: number;
  char: string;
  born: number; // timestamp ms
  size: number;
};

export default function RuneCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let visible = true;
    let lastSpawn = 0;
    const particles: RuneParticle[] = [];

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

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawn < SPAWN_INTERVAL) return;
      lastSpawn = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (particles.length >= MAX_RUNES) particles.shift();
      particles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        char: RUNES[Math.floor(Math.random() * RUNES.length)] ?? 'ᚠ',
        born: now,
        size: 14 + Math.random() * 10,
      });
    };

    container.addEventListener('mousemove', onMove);

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      ctx.clearRect(0, 0, W, H);

      const now = Date.now();

      // Draw dots background
      ctx.fillStyle = 'rgba(255,138,110,0.06)';
      for (let x = 20; x < W; x += 40) {
        for (let y = 20; y < H; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw rune particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        const age = now - p.born;
        if (age > TTL) {
          particles.splice(i, 1);
          continue;
        }
        const t = age / TTL;
        const alpha = 1 - t;
        const offsetY = -FLOAT_DIST * t;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ff8a6e'; // --accent value
        ctx.font = `${p.size}px var(--font-mono, monospace)`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, p.x, p.y + offsetY);
        ctx.restore();
      }
    };

    const tick = () => {
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible && raf === 0) {
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '50px' },
    );
    io.observe(container);

    tick();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMove);
      io.disconnect();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: 'var(--bg-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 32,
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            opacity: 0.6,
          }}
          aria-hidden="true"
        >
          ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ
        </div>
        <div
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontSize: 14,
            color: 'var(--text-secondary)',
          }}
        >
          prefers-reduced-motion — アニメーション無効
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.25em',
          }}
        >
          — RUNE CURSOR / 魔法軌跡
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: 500,
        overflow: 'hidden',
        background: 'var(--bg-elevated)',
        cursor: 'crosshair',
      }}
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
          userSelect: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.3em',
          }}
        >
          — RUNE CURSOR / マウスを動かして
        </div>
      </div>
    </div>
  );
}
