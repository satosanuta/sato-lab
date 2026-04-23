export default function AuroraMesh() {
  return (
    <>
      <style>{`
        @keyframes aurora-rotate-a {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes aurora-rotate-b {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes aurora-rotate-c {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .aurora-mesh__layer-a {
          animation: aurora-rotate-a 30s linear infinite;
        }
        .aurora-mesh__layer-b {
          animation: aurora-rotate-b 60s linear infinite;
        }
        .aurora-mesh__layer-c {
          animation: aurora-rotate-c 90s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-mesh__layer-a,
          .aurora-mesh__layer-b,
          .aurora-mesh__layer-c {
            animation: none;
          }
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: '#0a0e1a',
        }}
      >
        {/* Layer A — Purple conic-gradient */}
        <div
          aria-hidden="true"
          className="aurora-mesh__layer-a"
          style={{
            position: 'absolute',
            inset: '-50%',
            background:
              'conic-gradient(from 0deg at 40% 50%, transparent 0deg, var(--purple) 60deg, transparent 120deg, #1a0a3a 180deg, transparent 240deg, var(--purple) 300deg, transparent 360deg)',
            mixBlendMode: 'screen',
            opacity: 0.8,
          }}
        />
        {/* Layer B — Teal conic-gradient */}
        <div
          aria-hidden="true"
          className="aurora-mesh__layer-b"
          style={{
            position: 'absolute',
            inset: '-50%',
            background:
              'conic-gradient(from 120deg at 60% 40%, transparent 0deg, var(--teal) 80deg, transparent 160deg, #001a2a 220deg, transparent 280deg, var(--teal) 340deg, transparent 360deg)',
            mixBlendMode: 'screen',
            opacity: 0.7,
          }}
        />
        {/* Layer C — Deep blue conic-gradient */}
        <div
          aria-hidden="true"
          className="aurora-mesh__layer-c"
          style={{
            position: 'absolute',
            inset: '-50%',
            background:
              'conic-gradient(from 240deg at 50% 60%, transparent 0deg, var(--blue) 100deg, transparent 200deg, #0a0020 260deg, transparent 320deg, var(--blue) 360deg)',
            mixBlendMode: 'screen',
            opacity: 0.6,
          }}
        />
        {/* Center text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            pointerEvents: 'none',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-jp-mincho)',
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 64px)',
              color: 'var(--paper)',
              margin: 0,
              letterSpacing: '0.08em',
              textShadow: '0 0 40px rgba(255,255,255,0.4)',
            }}
          >
            夜明けを待つ
          </h3>
          <div
            style={{
              fontFamily: 'var(--font-en-serif)',
              fontStyle: 'italic',
              fontSize: 18,
              color: 'rgba(255,255,255,0.7)',
              marginTop: 14,
              letterSpacing: '0.05em',
            }}
          >
            Awaiting the dawn
          </div>
        </div>
      </div>
    </>
  );
}
