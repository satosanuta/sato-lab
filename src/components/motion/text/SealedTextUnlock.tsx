'use client';

import { useEffect, useState } from 'react';

export default function SealedTextUnlock() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Animate mask from 0 → 100 over 3s, pause 1s, restart
    let start: number | null = null;
    let raf: number;
    const duration = 3000;
    const pause = 1000;
    const total = duration + pause;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = (now - start) % total;
      if (elapsed < duration) {
        const t = elapsed / duration;
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setPct(Math.round(eased * 100));
      } else {
        setPct(100);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const maskStyle = {
    WebkitMaskImage: `radial-gradient(circle at center, black ${pct}%, transparent ${pct + 5}%)`,
    maskImage: `radial-gradient(circle at center, black ${pct}%, transparent ${pct + 5}%)`,
  } as React.CSSProperties;

  return (
    <>
      <style>{`
        @keyframes sealed-text__shimmer {
          0%   { opacity: 0.15; }
          50%  { opacity: 0.35; }
          100% { opacity: 0.15; }
        }
        .sealed-text__seal-ring {
          animation: sealed-text__shimmer 2s ease-in-out infinite;
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {/* Decorative seal ring behind text */}
        <div
          aria-hidden="true"
          className="sealed-text__seal-ring"
          style={{
            position: 'absolute',
            width: 360,
            height: 360,
            borderRadius: '50%',
            border: '2px solid var(--accent)',
            boxShadow: '0 0 60px rgba(255,138,110,0.15), inset 0 0 60px rgba(255,138,110,0.05)',
          }}
        />

        {/* Masked heading */}
        <div style={maskStyle}>
          <h3
            style={{
              fontFamily: 'var(--font-en-serif)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(48px, 8vw, 80px)',
              color: 'var(--text)',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            OPEN THE GATE
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-jp-mincho)',
              fontSize: 'clamp(20px, 3vw, 32px)',
              color: 'var(--accent)',
              margin: '16px 0 0',
              letterSpacing: '0.2em',
              textAlign: 'center',
            }}
          >
            門を開く
          </p>
        </div>

        {/* Caption */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.25em',
          }}
        >
          — SEALED TEXT / 封印解除 · mask-image radial-gradient
        </div>
      </div>
    </>
  );
}
