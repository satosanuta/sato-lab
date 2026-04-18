import { useInView } from '../../shared/useInView';
import { useReducedMotion } from '../../shared/useReducedMotion';

export default function SplitTextReveal() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const text = 'Typography is the voice of a brand,一文字ずつ積み重ねる。';
  const visible = reduced || inView;

  return (
    <div
      ref={ref}
      style={{
        padding: '80px 40px',
        background: 'rgba(245, 241, 234, 0.02)',
        borderRadius: 2,
        textAlign: 'center',
        border: '1px solid rgba(245, 241, 234, 0.08)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-jp-mincho)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 56px)',
          margin: 0,
          lineHeight: 1.4,
          color: 'var(--paper)',
          letterSpacing: '-0.01em',
        }}
      >
        {text.split('').map((c, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(60%)',
              transition: reduced
                ? 'none'
                : `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.035}s`,
              whiteSpace: c === ' ' ? 'pre' : 'normal',
            }}
          >
            {c}
          </span>
        ))}
      </h3>
    </div>
  );
}
