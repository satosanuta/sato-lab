import { useRef, useState } from 'react';
import GrainOverlay from '../../shared/GrainOverlay';
import { useReducedMotion } from '../../shared/useReducedMotion';

export default function Card3DStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const cards = [
    { t: '刹那', sub: 'Moment', depth: 0, color: '#ff5c3a' },
    { t: '記憶', sub: 'Memory', depth: 1, color: '#ff8a6e' },
    { t: '永遠', sub: 'Forever', depth: 2, color: '#6b4aff' },
  ];

  const rotX = reduced ? 0 : (mouse.y - 0.5) * 20;
  const rotY = reduced ? 0 : (mouse.x - 0.5) * -30;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: 0.5, y: 0.5 })}
      style={{
        height: 440,
        background: '#0a0a15',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GrainOverlay opacity={0.15} id="card3d-grain" />
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          letterSpacing: '0.3em',
        }}
      >
        — 3D TILT / マウスで傾ける
      </div>
      <div
        style={{
          position: 'relative',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 260,
              height: 340,
              left: -130 + i * 40,
              top: -170 + i * -10,
              background: `linear-gradient(135deg, ${c.color}, var(--ink))`,
              border: '1px solid rgba(245, 241, 234, 0.2)',
              padding: 32,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transform: `translateZ(${c.depth * 40}px)`,
              boxShadow: `0 ${20 + c.depth * 20}px ${40 + c.depth * 20}px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'rgba(245, 241, 234, 0.8)',
                letterSpacing: '0.3em',
              }}
            >
              0{i + 1} / 03
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-en-serif)',
                  fontStyle: 'italic',
                  fontSize: 16,
                  color: 'rgba(245, 241, 234, 0.8)',
                }}
              >
                {c.sub}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jp-mincho)',
                  fontSize: 72,
                  fontWeight: 900,
                  color: 'var(--paper)',
                  lineHeight: 1,
                  marginTop: 8,
                }}
              >
                {c.t}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
