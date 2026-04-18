export default function SvgLoaderDemo() {
  return (
    <div
      style={{
        padding: '60px 40px',
        background: 'rgba(245, 241, 234, 0.02)',
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        flexWrap: 'wrap',
        border: '1px solid rgba(245, 241, 234, 0.08)',
      }}
    >
      {/* Orbit */}
      <div style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 60 60" width="80" height="80">
          <circle
            cx="30"
            cy="30"
            r="20"
            fill="none"
            stroke="rgba(245, 241, 234, 0.2)"
            strokeWidth="1"
          />
          <circle cx="30" cy="10" r="4" fill="var(--accent)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 30 30"
              to="360 30 30"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.2em',
            marginTop: 12,
          }}
        >
          ORBIT
        </div>
      </div>

      {/* Pulse */}
      <div style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 60 60" width="80" height="80">
          <circle cx="30" cy="30" r="15" fill="var(--accent)" opacity="0.3">
            <animate attributeName="r" values="15;25;15" dur="1.5s" repeatCount="indefinite" />
            <animate
              attributeName="opacity"
              values="0.3;0;0.3"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="30" cy="30" r="10" fill="var(--accent)" />
        </svg>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.2em',
            marginTop: 12,
          }}
        >
          PULSE
        </div>
      </div>

      {/* Wave */}
      <div style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 80 60" width="80" height="80">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={5 + i * 14} y="20" width="8" height="20" fill="var(--accent)">
              <animate
                attributeName="height"
                values="20;40;20"
                dur="1s"
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="20;10;20"
                dur="1s"
                begin={`${i * 0.1}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </svg>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.2em',
            marginTop: 12,
          }}
        >
          WAVE
        </div>
      </div>

      {/* Draw */}
      <div style={{ textAlign: 'center' }}>
        <svg viewBox="0 0 60 60" width="80" height="80">
          <path
            d="M 10,30 Q 30,5 50,30 T 10,30"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="200"
            strokeDashoffset="200"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="200"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.2em',
            marginTop: 12,
          }}
        >
          DRAW
        </div>
      </div>
    </div>
  );
}
