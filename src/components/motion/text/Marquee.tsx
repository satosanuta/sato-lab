type Props = { reverse?: boolean };

export default function Marquee({ reverse = false }: Props) {
  const items = [
    'TYPOGRAPHY',
    '没入する',
    'SCROLL',
    'アニメーション',
    'MOTION',
    '体験の設計',
    'KINETIC',
    '印象の記憶',
  ];
  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '32px 0',
        borderTop: '1px solid rgba(245, 241, 234, 0.13)',
        borderBottom: '1px solid rgba(245, 241, 234, 0.13)',
        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 64,
          whiteSpace: 'nowrap',
          width: 'max-content',
          animation: `${reverse ? 'marquee-r' : 'marquee-l'} 30s linear infinite`,
        }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: i % 2 ? 'var(--font-jp-mincho)' : 'var(--font-en-serif)',
              fontStyle: i % 2 ? 'normal' : 'italic',
              fontSize: 64,
              fontWeight: 700,
              color: i % 3 === 0 ? 'var(--accent)' : 'var(--paper)',
            }}
          >
            {t} <span style={{ color: 'var(--accent)' }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-l { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        @keyframes marquee-r { from { transform: translateX(-33.33%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
