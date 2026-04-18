import { useScrollProgress } from '../../shared/useScrollProgress';

export default function ParallaxLayers() {
  // use raw -rect.top (pixels) instead of normalized progress
  const [ref, y] = useScrollProgress<HTMLDivElement>({
    map: (rect) => -rect.top,
  });

  return (
    <div
      ref={ref}
      style={{ height: 400, position: 'relative', overflow: 'hidden', background: '#1a1a2a' }}
    >
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, transform: `translateY(${y * 0.1}px)` }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 2,
              height: 2,
              borderRadius: '50%',
              background: 'rgba(245, 241, 234, 0.4)',
              left: `${(i * 13) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, transform: `translateY(${y * 0.3}px)` }}
      >
        <div
          style={{
            fontFamily: 'var(--font-jp-impact)',
            fontSize: 200,
            color: 'rgba(255, 92, 58, 0.13)',
            position: 'absolute',
            top: '30%',
            left: '5%',
            lineHeight: 1,
          }}
        >
          層
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${y * 0.5}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h4
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontWeight: 900,
            fontSize: 56,
            color: 'var(--paper)',
            margin: 0,
          }}
        >
          Parallax / 視差
        </h4>
      </div>
    </div>
  );
}
