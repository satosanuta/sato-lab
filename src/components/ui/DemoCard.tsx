import type { ReactNode } from 'react';
import type { TrendLevel } from '@/data/motion';

type Props = {
  title: string;
  desc: string;
  tech: string;
  trend?: TrendLevel;
  children: ReactNode;
  wide?: boolean;
  full?: boolean;
};

const trendColor = (t?: TrendLevel) =>
  t === '没入型' ? 'var(--accent)' : t === '最先端' ? 'var(--violet)' : 'var(--muted)';

export default function DemoCard({
  title,
  desc,
  tech,
  trend,
  children,
  wide = false,
  full = false,
}: Props) {
  return (
    <div
      style={{
        background: full ? 'transparent' : 'rgba(245, 241, 234, 0.03)',
        border: full ? 'none' : '1px solid rgba(245, 241, 234, 0.08)',
        borderRadius: 2,
        padding: full ? 0 : 28,
        marginBottom: 24,
        gridColumn: wide ? 'span 2' : 'auto',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
          gap: 16,
          flexWrap: 'wrap',
          padding: full ? '28px 28px 0' : 0,
        }}
      >
        <div>
          {trend && (
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: trendColor(trend),
                  letterSpacing: '0.2em',
                  padding: '2px 8px',
                  border: `1px solid ${trendColor(trend)}66`,
                  display: 'inline-block',
                }}
              >
                {trend.toUpperCase()}
              </span>
            </div>
          )}
          <h3
            style={{
              fontFamily: 'var(--font-jp-mincho)',
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
              color: 'var(--paper)',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-jp-gothic)',
              fontSize: 13,
              color: 'var(--muted)',
              margin: '6px 0 0',
            }}
          >
            {desc}
          </p>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            whiteSpace: 'nowrap',
          }}
        >
          {tech}
        </div>
      </header>
      <div style={{ padding: full ? '0 28px 28px' : 0 }}>{children}</div>
    </div>
  );
}
