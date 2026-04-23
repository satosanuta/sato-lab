export default function WhisperHover() {
  return (
    <>
      <style>{`
        @keyframes whisper-hover__orb-1 {
          0%   { transform: translate(-50%, -50%) scale(0) translate(0, 0);    opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) translate(-36px, -32px); opacity: 0; }
        }
        @keyframes whisper-hover__orb-2 {
          0%   { transform: translate(-50%, -50%) scale(0) translate(0, 0);    opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) translate(28px, -40px);  opacity: 0; }
        }
        @keyframes whisper-hover__orb-3 {
          0%   { transform: translate(-50%, -50%) scale(0) translate(0, 0);    opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) translate(40px, 12px);   opacity: 0; }
        }
        @keyframes whisper-hover__orb-4 {
          0%   { transform: translate(-50%, -50%) scale(0) translate(0, 0);    opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) translate(-20px, 38px);  opacity: 0; }
        }
        @keyframes whisper-hover__orb-5 {
          0%   { transform: translate(-50%, -50%) scale(0) translate(0, 0);    opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) translate(-44px, 8px);   opacity: 0; }
        }
        @keyframes whisper-hover__orb-6 {
          0%   { transform: translate(-50%, -50%) scale(0) translate(0, 0);    opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1) translate(16px, 40px);   opacity: 0; }
        }

        .whisper-hover__card {
          position: relative;
          overflow: visible;
          padding: 32px 28px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          flex: 1;
          min-width: 0;
        }
        .whisper-hover__card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 24px rgba(255, 138, 110, 0.2);
        }

        .whisper-hover__orb {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          pointer-events: none;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        .whisper-hover__card:hover .whisper-hover__orb-1 {
          animation: whisper-hover__orb-1 0.6s ease-out forwards;
        }
        .whisper-hover__card:hover .whisper-hover__orb-2 {
          animation: whisper-hover__orb-2 0.6s ease-out 0.05s forwards;
        }
        .whisper-hover__card:hover .whisper-hover__orb-3 {
          animation: whisper-hover__orb-3 0.6s ease-out 0.1s forwards;
        }
        .whisper-hover__card:hover .whisper-hover__orb-4 {
          animation: whisper-hover__orb-4 0.6s ease-out 0.15s forwards;
        }
        .whisper-hover__card:hover .whisper-hover__orb-5 {
          animation: whisper-hover__orb-5 0.6s ease-out 0.05s forwards;
        }
        .whisper-hover__card:hover .whisper-hover__orb-6 {
          animation: whisper-hover__orb-6 0.6s ease-out 0.12s forwards;
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 24,
          padding: '40px 32px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.3em',
            marginBottom: 8,
          }}
        >
          — WHISPER HOVER / カードにホバーして
        </div>
        <div style={{ display: 'flex', gap: 20, width: '100%', maxWidth: 680 }}>
          {[
            { label: '詩', sub: 'poetry', desc: '言葉が静かに揺れる' },
            { label: '風', sub: 'wind', desc: '見えない流れを感じる' },
            { label: '光', sub: 'light', desc: '闇を照らす一筋の輝き' },
          ].map((card) => (
            <div key={card.label} className="whisper-hover__card">
              {/* 6 orbs */}
              <span className="whisper-hover__orb whisper-hover__orb-1" aria-hidden="true" />
              <span className="whisper-hover__orb whisper-hover__orb-2" aria-hidden="true" />
              <span className="whisper-hover__orb whisper-hover__orb-3" aria-hidden="true" />
              <span className="whisper-hover__orb whisper-hover__orb-4" aria-hidden="true" />
              <span className="whisper-hover__orb whisper-hover__orb-5" aria-hidden="true" />
              <span className="whisper-hover__orb whisper-hover__orb-6" aria-hidden="true" />

              <div
                style={{
                  fontFamily: 'var(--font-jp-mincho)',
                  fontSize: 48,
                  color: 'var(--text)',
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-en-serif)',
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: 'var(--accent)',
                  marginBottom: 8,
                  letterSpacing: '0.08em',
                }}
              >
                {card.sub}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jp-mincho)',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {card.desc}
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontSize: 12,
            color: 'var(--text-tertiary)',
            margin: 0,
            marginTop: 8,
          }}
        >
          ホバー時に光の粒が散る — CSS のみ、JS なし
        </p>
      </div>
    </>
  );
}
