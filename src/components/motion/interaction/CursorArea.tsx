import { useRef, useState } from 'react';

export default function CursorArea() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('EXPLORE');

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const cards = [
    { t: 'Shippori', hint: 'Mincho' },
    { t: 'Playfair', hint: 'Italic' },
    { t: 'Dela', hint: 'Gothic One' },
  ];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
      style={{
        position: 'relative',
        padding: '60px 40px',
        cursor: active ? 'none' : 'default',
        background: 'var(--bg-elevated)',
        color: 'var(--text)',
        minHeight: 280,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'var(--accent)',
          marginBottom: 24,
        }}
      >
        — HOVER ANY CARD
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {cards.map((c, i) => (
          <div
            key={i}
            onMouseEnter={() => setLabel(c.t.toUpperCase())}
            style={{
              flex: '1 1 200px',
              minHeight: 160,
              padding: 24,
              border: '1px solid rgba(14, 14, 16, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              transition: 'background 0.3s',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-en-serif)',
                fontStyle: 'italic',
                fontSize: 14,
                color: 'var(--muted)',
              }}
            >
              {c.hint}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-jp-mincho)',
                fontSize: 36,
                fontWeight: 900,
                marginTop: 4,
              }}
            >
              {c.t}
            </div>
          </div>
        ))}
      </div>
      {active && (
        <div
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'var(--accent)',
            color: 'var(--paper)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            fontWeight: 700,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            mixBlendMode: 'difference',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
