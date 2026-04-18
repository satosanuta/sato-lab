import { useScrollProgress } from '../../shared/useScrollProgress';

export default function ScrollProgressDemo() {
  const [ref, p] = useScrollProgress<HTMLDivElement>({
    map: (rect, vh) => Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height))),
  });

  return (
    <div
      ref={ref}
      style={{
        padding: '48px 32px',
        background: 'var(--ink)',
        color: 'var(--paper)',
        border: '1px solid rgba(245, 241, 234, 0.08)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          letterSpacing: '0.3em',
          marginBottom: 20,
        }}
      >
        SCROLL PROGRESS · {Math.round(p * 100)}%
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(p * 100)}
        aria-label="スクロール進捗"
        style={{
          width: '100%',
          height: 4,
          background: 'rgba(245, 241, 234, 0.08)',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: `${p * 100}%`,
            height: '100%',
            background: 'var(--accent)',
            transition: 'width 0.15s linear',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-jp-mincho)',
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        スクロールと共に変わる指標
      </div>
    </div>
  );
}
