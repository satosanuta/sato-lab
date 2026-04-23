export default function VerticalJpWriting() {
  return (
    <>
      <style>{`
        @keyframes vertical-jp__drift {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(-20px); }
          100% { transform: translateX(0); }
        }
        .vertical-jp__tcy {
          text-combine-upright: all;
          -webkit-text-combine: horizontal;
        }
        .vertical-jp__columns {
          animation: vertical-jp__drift 20s ease-in-out infinite;
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: 'var(--bg-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 48px',
        }}
      >
        {/* Background decorative rule lines */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(to left, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 80px)',
            opacity: 0.25,
          }}
        />

        {/* Vertical text columns */}
        <div
          className="vertical-jp__columns"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontFamily: 'var(--font-jp-mincho)',
            fontSize: 'clamp(16px, 2.2vw, 22px)',
            lineHeight: 2.1,
            color: 'var(--text)',
            display: 'flex',
            flexDirection: 'row',
            gap: '2em',
            maxHeight: 420,
          }}
        >
          {/* Column 1 */}
          <p style={{ margin: 0 }}>墨の香り、紙の肌、線の運び。</p>
          {/* Column 2 */}
          <p style={{ margin: 0 }}>書物が旅の糧となる夜、月影が頁を照らす。</p>
          {/* Column 3 — contains numerals combined upright */}
          <p style={{ margin: 0 }}>
            <span className="vertical-jp__tcy">2026</span>
            年、冒険者の手帳に
          </p>
          {/* Column 4 */}
          <p style={{ margin: 0 }}>記された言葉は、永遠に風を呼ぶ。</p>
        </div>

        {/* Caption bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 28,
            fontFamily: 'var(--font-en-serif)',
            fontStyle: 'italic',
            fontSize: 12,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.08em',
          }}
        >
          vertical-rl · text-combine-upright
        </div>
      </div>
    </>
  );
}
