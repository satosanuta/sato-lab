import { useEffect, useState } from 'react';
import { useReducedMotion } from '../shared/useReducedMotion';

export default function Hero() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), reduced ? 0 : 150);
    return () => clearTimeout(t);
  }, [reduced]);

  const title = '砂糖さんの実験室';
  const animate = !reduced;

  return (
    <section
      style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      {/* soft orange glow — サブリミナルなキーカラー */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-10vw',
          top: '8vh',
          width: '42vw',
          height: '42vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, transparent), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-15vw',
          bottom: '-10vh',
          width: '36vw',
          height: '36vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--purple) 30%, transparent), transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 960 }}>
        <div
          style={{
            fontFamily: 'var(--font-brand-en)',
            fontSize: 12,
            letterSpacing: '0.3em',
            color: 'var(--accent)',
            marginBottom: 32,
            fontWeight: 600,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: animate ? 'all 0.8s ease 0.1s' : 'none',
          }}
        >
          — SATO-LAB / 異世界冒険者の活動リファレンス
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-brand-heading)',
            fontWeight: 700,
            fontSize: 'clamp(44px, 9vw, 120px)',
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: '-0.01em',
            color: 'var(--text)',
          }}
        >
          {title.split('').map((c, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(60%)',
                transition: animate
                  ? `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.15 + i * 0.04}s`
                  : 'none',
              }}
            >
              {c}
            </span>
          ))}
        </h1>

        <div
          style={{
            fontFamily: 'var(--font-brand-display)',
            fontWeight: 700,
            fontSize: 'clamp(20px, 2.2vw, 32px)',
            marginTop: 20,
            color: 'var(--accent)',
            opacity: loaded ? 1 : 0,
            transition: animate ? 'opacity 1s ease 0.9s' : 'none',
          }}
        >
          Typography × Motion × Branding
        </div>

        <p
          style={{
            fontFamily: 'var(--font-brand-body)',
            fontSize: 15,
            lineHeight: 1.9,
            color: 'var(--text-secondary)',
            margin: '28px 0 0',
            maxWidth: 560,
            opacity: loaded ? 1 : 0,
            transition: animate ? 'opacity 1s ease 1.1s' : 'none',
          }}
        >
          ファンタジー世界で、仕事を頑張る人たちをほっとさせる場所。
          <br />
          ここはその設計を残し、育てていく実験場。
        </p>

        <div
          style={{
            marginTop: 56,
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            fontFamily: 'var(--font-brand-en)',
            fontSize: 13,
            color: 'var(--text-secondary)',
            opacity: loaded ? 1 : 0,
            transition: animate ? 'opacity 1s ease 1.3s' : 'none',
            alignItems: 'center',
          }}
        >
          <a
            href="/branding/"
            style={{
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '12px 20px',
              borderRadius: 999,
              fontWeight: 600,
              transition: 'transform 0.25s, background 0.25s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            03 / Branding を読む →
          </a>
          <a
            href="/fonts/"
            style={{
              color: 'var(--text)',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            01 / Fonts 14書体
          </a>
          <span aria-hidden="true" style={{ color: 'var(--text-tertiary)' }}>
            ·
          </span>
          <a
            href="/motion/"
            style={{
              color: 'var(--text)',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            02 / Motion 17デモ
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '5vw',
          fontFamily: 'var(--font-brand-en)',
          fontSize: 10,
          letterSpacing: '0.3em',
          color: 'var(--text-tertiary)',
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
