import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../shared/useReducedMotion';

const PHRASES = ['書体が、', 'ブランドを、', '物語を、', '記憶を、', 'つくる。'];

export default function TypingEffect() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const current = PHRASES[idx]!;
    let id: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      id = setTimeout(() => setText(current.slice(0, text.length + 1)), 120);
    } else if (deleting && text.length > 0) {
      id = setTimeout(() => setText(current.slice(0, text.length - 1)), 50);
    } else if (!deleting && text.length === current.length) {
      id = setTimeout(() => setDeleting(true), 1200);
    } else {
      // deleting && text.length === 0 — advance to next phrase
      id = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % PHRASES.length);
      }, 0);
    }

    return () => clearTimeout(id);
  }, [text, deleting, idx, reduced]);

  const displayed = reduced ? PHRASES[0]! : text;

  return (
    <div
      style={{
        padding: '60px 40px',
        background: 'var(--ink)',
        color: 'var(--paper)',
        border: '1px solid rgba(245, 241, 234, 0.08)',
        minHeight: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        aria-live={reduced ? undefined : 'polite'}
        aria-label="タイピングアニメーション"
        style={{
          fontFamily: 'var(--font-jp-mincho-alt)',
          fontSize: 'clamp(32px, 5vw, 72px)',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {displayed}
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '0.6ch',
            background: 'var(--accent)',
            marginLeft: 4,
            animation: reduced ? 'none' : 'typing-blink 0.8s step-end infinite',
          }}
        >
          &nbsp;
        </span>
      </div>
      <style>{`@keyframes typing-blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}
