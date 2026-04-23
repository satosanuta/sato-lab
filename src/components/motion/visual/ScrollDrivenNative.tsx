export default function ScrollDrivenNative() {
  return (
    <>
      <style>{`
        @supports (animation-timeline: scroll()) {
          .scroll-driven__scene {
            animation: scroll-driven__reveal linear both;
            animation-timeline: scroll(self);
            animation-range: entry 0% entry 100%;
          }
          .scroll-driven__progress-bar {
            animation: scroll-driven__progress linear;
            animation-timeline: scroll(nearest);
            transform-origin: left center;
          }
          @keyframes scroll-driven__reveal {
            from { opacity: 0.2; transform: translateX(-24px) scale(0.97); }
            to   { opacity: 1;   transform: translateX(0)     scale(1);    }
          }
          @keyframes scroll-driven__progress {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
          .scroll-driven__fallback { display: none; }
        }

        @supports not (animation-timeline: scroll()) {
          .scroll-driven__scene { opacity: 1; }
          .scroll-driven__progress-bar { display: none; }
          .scroll-driven__fallback { display: block; }
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
        {/* Sticky progress bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'var(--border)',
            zIndex: 10,
          }}
        >
          <div
            className="scroll-driven__progress-bar"
            style={{
              height: '100%',
              background: 'var(--accent)',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Header — fixed inside container */}
        <div
          style={{
            padding: '14px 28px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.25em',
            flexShrink: 0,
            borderBottom: '1px solid var(--border)',
          }}
        >
          — SCROLL-DRIVEN ANIMATION / CSSだけで進行 · animation-timeline: scroll()
        </div>

        {/* Fallback notice */}
        <div
          className="scroll-driven__fallback"
          style={{
            margin: '12px 28px',
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
          スクロール連動ネイティブは Chrome 115+ / Firefox 131+ が必要です — 静的表示中
          <br />
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
            Scroll-Driven Animations require Chrome 115+ or Firefox 131+ — static fallback shown.
          </span>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            padding: '4px 28px 6px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            flexShrink: 0,
          }}
        >
          ↓ SCROLL / スクロールしてください
        </div>

        {/* Scrollable content — 3 scenes × 500px */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '0 28px 28px',
          }}
        >
          {[
            {
              num: '01',
              title: '出発の夜明け',
              en: 'Scene 1 — The Dawn of Departure',
              body: '冒険者が荷を背に門を出る。空はまだ薄紫で、街は静まり返っている。CSS scroll-timeline はスクロール位置を animation に変換し、JS なしで位置連動を実現する。',
              color: 'var(--accent)',
            },
            {
              num: '02',
              title: '森の深み',
              en: 'Scene 2 — Depth of the Forest',
              body: '木漏れ日が揺れ、足元には苔が広がる。animation-timeline: scroll() で要素がビューポートに入るたびにフェードインする。スクロール進行がそのまま animaton-delay に変換される。',
              color: 'var(--teal)',
            },
            {
              num: '03',
              title: '星空のキャンプ',
              en: 'Scene 3 — Stars at Camp',
              body: 'たき火を囲み、旅の記録を綴る。animation-range を指定すると "entry" "exit" など、視差の開始・終了タイミングを細かく制御できる。これはすべて CSS の宣言のみ。',
              color: 'var(--purple)',
            },
          ].map((scene) => (
            <div
              key={scene.num}
              className="scroll-driven__scene"
              style={{
                height: 460,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border)',
                padding: '0 4px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: scene.color,
                  letterSpacing: '0.2em',
                  marginBottom: 12,
                }}
              >
                {scene.num} / 03 — {scene.en}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-jp-mincho)',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  color: 'var(--text)',
                  margin: '0 0 18px',
                  letterSpacing: '0.06em',
                }}
              >
                {scene.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-jp-mincho)',
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 2,
                  margin: 0,
                  maxWidth: 520,
                }}
              >
                {scene.body}
              </p>
              {/* Decorative accent line */}
              <div
                style={{
                  marginTop: 28,
                  height: 2,
                  width: 80,
                  background: scene.color,
                  borderRadius: 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
