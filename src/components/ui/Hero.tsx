import { useEffect, useState } from 'react';
import GrainOverlay from '../shared/GrainOverlay';
import { useReducedMotion } from '../shared/useReducedMotion';

export default function Hero() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), reduced ? 0 : 200);
    return () => clearTimeout(t);
  }, [reduced]);

  const title = '砂糖さんの実験室';
  const subtitle = 'Typography × Motion Reference';
  const animate = !reduced;

  return (
    <section
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ink)',
        color: 'var(--paper)',
      }}
    >
      <GrainOverlay opacity={0.12} id="hero-grain" />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-10vw',
          top: '10vh',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 92, 58, 0.67), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            marginBottom: 40,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: animate ? 'all 1s ease 0.1s' : 'none',
          }}
        >
          — SATO-LAB / 実験場 no.01
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontWeight: 900,
            fontSize: 'clamp(56px, 11vw, 180px)',
            lineHeight: 0.9,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {title.split('').map((c, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(100%)',
                transition: animate
                  ? `all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.2 + i * 0.06}s`
                  : 'none',
              }}
            >
              {c}
            </span>
          ))}
        </h1>

        <div
          style={{
            fontFamily: 'var(--font-en-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(18px, 2vw, 28px)',
            marginTop: 24,
            color: 'var(--accent-soft)',
            opacity: loaded ? 1 : 0,
            transition: animate ? 'opacity 1.2s ease 1.2s' : 'none',
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            marginTop: 60,
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
            fontFamily: 'var(--font-jp-gothic)',
            fontSize: 13,
            color: 'var(--muted)',
            opacity: loaded ? 1 : 0,
            transition: animate ? 'opacity 1s ease 1.4s' : 'none',
          }}
        >
          <a
            href="/fonts/"
            style={{
              color: 'var(--paper)',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            フォント 14書体 →
          </a>
          <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
            ●
          </span>
          <a
            href="/motion/"
            style={{
              color: 'var(--paper)',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            演出 17デモ →
          </a>
          <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
            ●
          </span>
          <span>没入型 6つ収録</span>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 40,
          left: '5vw',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.3em',
          color: 'var(--muted)',
          animation: animate ? 'hero-pulse 2s ease-in-out infinite' : 'none',
        }}
      >
        SCROLL ↓
      </div>

      <style>{`
        @keyframes hero-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
