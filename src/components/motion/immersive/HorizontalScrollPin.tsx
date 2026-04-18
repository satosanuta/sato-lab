import GrainOverlay from '../../shared/GrainOverlay';
import { useScrollProgress } from '../../shared/useScrollProgress';

export default function HorizontalScrollPin() {
  const [wrapRef, x] = useScrollProgress<HTMLElement>();

  const panels = [
    { n: '01', t: '採用サイト', sub: 'Recruitment', color: '#1a2332' },
    { n: '02', t: '周年記念', sub: 'Anniversary', color: '#2a1f1a' },
    { n: '03', t: 'ブランディング', sub: 'Branding', color: '#1a2a1f' },
    { n: '04', t: 'プロダクト', sub: 'Product', color: '#2a1a2a' },
  ];

  return (
    <section
      ref={wrapRef}
      style={{ height: '400vh', position: 'relative', background: 'var(--ink)' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: '5vw',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: '0.3em',
            zIndex: 10,
          }}
        >
          — HORIZONTAL PIN / 横スクロール
        </div>
        <div
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(${-x * 75}vw)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {panels.map((p, i) => (
            <div
              key={i}
              style={{
                flex: '0 0 100vw',
                height: '100%',
                background: p.color,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10vw',
              }}
            >
              <GrainOverlay opacity={0.1} id={`hsp-grain-${i}`} />
              <div
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-jp-impact)',
                  fontSize: 'clamp(80px, 20vw, 280px)',
                  color: 'rgba(245, 241, 234, 0.07)',
                  position: 'absolute',
                  top: '50%',
                  left: '5vw',
                  transform: 'translateY(-50%)',
                  lineHeight: 0.8,
                  pointerEvents: 'none',
                }}
              >
                {p.n}
              </div>
              <div style={{ position: 'relative', zIndex: 2, color: 'var(--paper)' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-en-serif)',
                    fontStyle: 'italic',
                    fontSize: 18,
                    color: 'var(--accent-soft)',
                    marginBottom: 16,
                  }}
                >
                  {p.sub}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-jp-mincho)',
                    fontWeight: 900,
                    fontSize: 'clamp(56px, 9vw, 140px)',
                    margin: 0,
                    letterSpacing: '0.03em',
                    lineHeight: 1,
                  }}
                >
                  {p.t}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-jp-gothic)',
                    fontSize: 14,
                    color: 'rgba(245, 241, 234, 0.67)',
                    marginTop: 24,
                    maxWidth: 400,
                    lineHeight: 1.8,
                  }}
                >
                  縦スクロールを横方向の連続体験に変換するピン留め演出。GSAP ScrollTrigger の pin +
                  horizontal 変換をCSSで再現。
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '5vw',
            right: '5vw',
            height: 2,
            background: 'rgba(245, 241, 234, 0.13)',
          }}
        >
          <div style={{ height: '100%', background: 'var(--accent)', width: `${x * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
