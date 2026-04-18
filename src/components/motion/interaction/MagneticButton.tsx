import { useRef, useState } from 'react';
import { useReducedMotion } from '../../shared/useReducedMotion';

type Props = { label?: string };

export default function MagneticButton({ label = 'Touch me' }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    setPos({ x: dx, y: dy });
  };

  return (
    <div
      style={{
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(245, 241, 234, 0.02)',
        border: '1px solid rgba(245, 241, 234, 0.08)',
      }}
    >
      <button
        ref={ref}
        type="button"
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setPos({ x: 0, y: 0 });
          setHover(false);
        }}
        style={{
          fontFamily: 'var(--font-en-serif)',
          fontStyle: 'italic',
          fontSize: 32,
          fontWeight: 700,
          padding: '32px 56px',
          background: hover ? 'var(--accent)' : 'transparent',
          color: hover ? 'var(--ink)' : 'var(--paper)',
          border: `1px solid ${hover ? 'var(--accent)' : 'var(--paper)'}`,
          borderRadius: 999,
          cursor: 'pointer',
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: reduced
            ? 'background 0.3s, color 0.3s, border-color 0.3s'
            : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.3s, color 0.3s, border-color 0.3s',
        }}
      >
        {label} <span style={{ marginLeft: 8 }}>→</span>
      </button>
    </div>
  );
}
