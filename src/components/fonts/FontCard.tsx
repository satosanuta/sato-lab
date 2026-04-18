import type { FontEntry } from '@/data/fonts';

type Props = {
  font: FontEntry;
  size: number;
  weightMul: number;
};

export default function FontCard({ font, size, weightMul }: Props) {
  const sample =
    font.lang === 'jp'
      ? '百年先も残るデザインを、この手で紡ぐ。'
      : 'Typography is the craft of endurance.';
  const altSample =
    font.lang === 'jp' ? 'あいうえお カキクケコ 永 遠 無 限 創造' : 'The quick brown fox ABC 123';

  return (
    <article
      style={{
        background: 'var(--bg-elevated)',
        color: 'var(--text)',
        padding: '32px 28px',
        borderRadius: 8,
        position: 'relative',
        border: '1px solid var(--border)',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 20,
          gap: 12,
          paddingBottom: 16,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-brand-en)',
              fontSize: 10,
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              marginBottom: 4,
              fontWeight: 600,
            }}
          >
            {font.category}
          </div>
          <h3
            style={{
              fontFamily: font.family,
              fontWeight: font.weight,
              fontSize: 24,
              margin: 0,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
            }}
          >
            {font.name}
          </h3>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-brand-en)',
            fontSize: 10,
            color: 'var(--text-tertiary)',
            whiteSpace: 'nowrap',
          }}
        >
          w{Math.round(font.weight * weightMul)}
        </div>
      </header>

      <p
        style={{
          fontFamily: font.family,
          fontWeight: Math.min(900, Math.round(font.weight * weightMul)),
          fontSize: size,
          lineHeight: 1.4,
          margin: '0 0 16px',
          letterSpacing: '-0.005em',
          color: 'var(--text)',
        }}
      >
        {sample}
      </p>

      <p
        style={{
          fontFamily: font.family,
          fontWeight: 400,
          fontSize: Math.max(14, size * 0.55),
          lineHeight: 1.6,
          margin: '0 0 20px',
          color: 'var(--text-secondary)',
        }}
      >
        {altSample}
      </p>

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          fontFamily: 'var(--font-brand-body)',
          color: 'var(--text-tertiary)',
          paddingTop: 12,
          borderTop: '1px dashed var(--border)',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span>{font.note}</span>
        <span style={{ color: 'var(--accent)' }}>{font.usage}</span>
      </footer>
    </article>
  );
}
