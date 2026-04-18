import { useState } from 'react';
import { jpFonts, enFonts, pairings } from '@/data/fonts';
import FontCard from './FontCard';
import ControlSlider from './ControlSlider';

export default function FontsExplorer() {
  const [size, setSize] = useState(32);
  const [weightMul, setWeightMul] = useState(1);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '24px 28px',
          background: 'rgba(245, 241, 234, 0.03)',
          marginBottom: 48,
          border: '1px solid rgba(245, 241, 234, 0.08)',
          borderRadius: 2,
        }}
      >
        <ControlSlider label="サイズ" value={size} min={18} max={80} set={setSize} unit="px" />
        <ControlSlider
          label="ウェイト倍率"
          value={weightMul}
          min={0.5}
          max={1.5}
          step={0.1}
          set={setWeightMul}
          unit="x"
        />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-jp-mincho)',
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 24,
          color: 'var(--accent-soft)',
        }}
      >
        日本語フォント
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
          marginBottom: 80,
        }}
      >
        {jpFonts.map((f) => (
          <FontCard key={f.name} font={f} size={size} weightMul={weightMul} />
        ))}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-en-serif)',
          fontStyle: 'italic',
          fontSize: 40,
          fontWeight: 700,
          marginBottom: 24,
          color: 'var(--accent-soft)',
        }}
      >
        Latin Typefaces
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}
      >
        {enFonts.map((f) => (
          <FontCard key={f.name} font={f} size={size} weightMul={weightMul} />
        ))}
      </div>

      <div style={{ marginTop: 80 }}>
        <h3
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 8,
            color: 'var(--accent-soft)',
          }}
        >
          和欧混植の定番
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-jp-gothic)',
            fontSize: 14,
            color: 'var(--muted)',
            marginBottom: 32,
          }}
        >
          日本のWebで頻出する組み合わせパターン
        </p>
        {pairings.map((p, i) => (
          <div
            key={i}
            style={{
              padding: '28px 32px',
              marginBottom: 16,
              background: 'var(--paper)',
              color: 'var(--ink)',
              borderRadius: 2,
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: p.jp.family,
                  fontSize: 36,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                美意識 <span style={{ fontFamily: p.en.family, fontWeight: 700 }}>× Craft</span>
              </div>
              <div
                style={{
                  fontFamily: p.en.family,
                  fontSize: 16,
                  color: 'var(--muted)',
                  marginTop: 8,
                  fontStyle: p.en.name === 'Playfair Display' ? 'italic' : 'normal',
                }}
              >
                {p.jp.name} × {p.en.name}
              </div>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--accent)',
                letterSpacing: '0.2em',
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              {p.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
