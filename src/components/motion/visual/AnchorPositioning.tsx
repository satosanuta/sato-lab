export default function AnchorPositioning() {
  return (
    <>
      <style>{`
        @supports (anchor-name: --a) {
          .anchor-pos__anchor-1 { anchor-name: --anchor-1; }
          .anchor-pos__anchor-2 { anchor-name: --anchor-2; }
          .anchor-pos__anchor-3 { anchor-name: --anchor-3; }

          .anchor-pos__tooltip-1 {
            position: absolute;
            position-anchor: --anchor-1;
            left: anchor(--anchor-1 right);
            top: anchor(--anchor-1 top);
            margin-left: 12px;
            position-try-fallbacks: --flip-left-1;
          }
          .anchor-pos__tooltip-2 {
            position: absolute;
            position-anchor: --anchor-2;
            left: anchor(--anchor-2 right);
            top: anchor(--anchor-2 top);
            margin-left: 12px;
            position-try-fallbacks: --flip-left-2;
          }
          .anchor-pos__tooltip-3 {
            position: absolute;
            position-anchor: --anchor-3;
            left: anchor(--anchor-3 right);
            top: anchor(--anchor-3 top);
            margin-left: 12px;
            position-try-fallbacks: --flip-left-3;
          }

          @position-try --flip-left-1 {
            left: auto;
            right: anchor(--anchor-1 left);
            top: anchor(--anchor-1 top);
            margin-left: 0;
            margin-right: 12px;
          }
          @position-try --flip-left-2 {
            left: auto;
            right: anchor(--anchor-2 left);
            top: anchor(--anchor-2 top);
            margin-left: 0;
            margin-right: 12px;
          }
          @position-try --flip-left-3 {
            left: auto;
            right: anchor(--anchor-3 left);
            top: anchor(--anchor-3 top);
            margin-left: 0;
            margin-right: 12px;
          }

          .anchor-pos__fallback-note { display: none; }
          .anchor-pos__native-badge { display: inline-block; }
        }

        @supports not (anchor-name: --a) {
          /* Fallback: simple absolute positioning */
          .anchor-pos__tooltip { position: absolute; }
          .anchor-pos__tooltip-1 { top: 100px; left: 260px; }
          .anchor-pos__tooltip-2 { top: 220px; left: 260px; }
          .anchor-pos__tooltip-3 { top: 340px; left: 260px; }

          .anchor-pos__native-badge { display: none; }
        }

        .anchor-pos__btn {
          font-family: var(--font-jp-mincho);
          font-size: 16px;
          color: var(--text);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 18px;
          cursor: default;
          white-space: nowrap;
        }
        .anchor-pos__tooltip {
          background: var(--bg-elevated);
          border: 1px solid var(--accent);
          border-radius: 6px;
          padding: 8px 14px;
          font-family: var(--font-jp-mincho);
          font-size: 13px;
          color: var(--text-secondary);
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          max-width: 240px;
          white-space: normal;
        }
        .anchor-pos__tooltip::before {
          content: '';
          position: absolute;
          left: -7px;
          top: 12px;
          border: 6px solid transparent;
          border-right-color: var(--accent);
          border-left: 0;
        }
        .anchor-pos__native-badge {
          background: var(--accent);
          color: #fff;
          font-size: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          padding: 2px 6px;
          border-radius: 3px;
          vertical-align: middle;
          margin-left: 6px;
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 32px 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.25em',
          }}
        >
          — CSS ANCHOR POSITIONING / アンカー配置
          <span className="anchor-pos__native-badge">NATIVE</span>
        </div>

        {/* Fallback note (shown only when @supports fails) */}
        <div
          className="anchor-pos__fallback-note"
          style={{
            margin: '8px 32px 0',
            padding: '10px 14px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            fontFamily: 'var(--font-jp-mincho)',
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}
        >
          このブラウザは CSS Anchor Positioning 未対応 (Chrome 125+ 必要) — 静的フォールバック表示中
          <br />
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
            Your browser does not support CSS Anchor Positioning (Chrome 125+) — static fallback
            shown.
          </span>
        </div>

        {/* Demo area */}
        <div style={{ position: 'relative', flex: 1, margin: '0 32px' }}>
          {/* Anchor buttons — left column */}
          <button
            type="button"
            className="anchor-pos__btn anchor-pos__anchor-1"
            style={{ position: 'absolute', left: 24, top: 80 }}
          >
            冒険の入口 ①
          </button>
          <button
            type="button"
            className="anchor-pos__btn anchor-pos__anchor-2"
            style={{ position: 'absolute', left: 24, top: 200 }}
          >
            ギルドの依頼 ②
          </button>
          <button
            type="button"
            className="anchor-pos__btn anchor-pos__anchor-3"
            style={{ position: 'absolute', left: 24, top: 320 }}
          >
            炉端の集い ③
          </button>

          {/* Tooltips — anchored to each button */}
          <div
            className="anchor-pos__tooltip anchor-pos__tooltip-1"
            style={{ position: 'absolute' }}
          >
            <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-jp-mincho)' }}>
              冒険の扉
            </strong>
            <br />
            CSS anchor() で宣言的に配置。JS 座標計算なし。
          </div>
          <div
            className="anchor-pos__tooltip anchor-pos__tooltip-2"
            style={{ position: 'absolute' }}
          >
            <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-jp-mincho)' }}>
              @position-try
            </strong>
            <br />
            フォールバック位置も宣言的に指定できる。
          </div>
          <div
            className="anchor-pos__tooltip anchor-pos__tooltip-3"
            style={{ position: 'absolute' }}
          >
            <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-jp-mincho)' }}>
              Chrome 125+
            </strong>
            <br />
            2026 年の stable 機能。Popover API とも連携。
          </div>
        </div>
      </div>
    </>
  );
}
