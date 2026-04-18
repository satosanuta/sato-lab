import { useState } from 'react';
import GrainOverlay from '../../shared/GrainOverlay';

export default function ImageHoverMask() {
  const items = [
    { label: '寿司', sub: 'Sushi', bg: 'linear-gradient(135deg, #ff6b4a, #2a1a1a)' },
    { label: '茶', sub: 'Tea', bg: 'linear-gradient(135deg, #3a5a3a, #0a1a0a)' },
    { label: '墨', sub: 'Ink', bg: 'linear-gradient(135deg, #2a2a3a, #0a0a0a)' },
  ];
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
      {items.map((it, i) => (
        <div
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          style={{
            aspectRatio: '3/4',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            background: it.bg,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--ink)',
              zIndex: 2,
              clipPath: hover === i ? 'inset(100% 0 0 0)' : 'inset(0 0 0 0)',
              transition: 'clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
            }}
          />
          <GrainOverlay opacity={0.3} id={`hover-mask-grain-${i}`} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 20,
              color: 'var(--paper)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-en-serif)',
                fontStyle: 'italic',
                fontSize: 14,
                color: 'var(--accent-soft)',
              }}
            >
              {it.sub}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jp-mincho)',
                fontSize: 42,
                fontWeight: 900,
                marginTop: 4,
                transform: hover === i ? 'translateY(0)' : 'translateY(20px)',
                opacity: hover === i ? 1 : 0.6,
                transition: 'all 0.5s ease',
              }}
            >
              {it.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
