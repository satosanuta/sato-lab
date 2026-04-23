import { useReducedMotion } from '../../shared/useReducedMotion';

// Three calligraphic strokes:
//  A: Sweeping arc (circle / 丸)
//  B: Bold diagonal slash (直)
//  C: S-curve wave (流)

const STROKE_LENGTH_A = 251; // circumference of circle r=40
const STROKE_LENGTH_B = 226; // diagonal line length
const STROKE_LENGTH_C = 280; // S-curve path length

export default function CalligraphyStroke() {
  const reduced = useReducedMotion();

  return (
    <>
      <style>{`
        @keyframes calligraphy__draw-a {
          0%   { stroke-dashoffset: ${STROKE_LENGTH_A}; opacity: 1; }
          40%  { stroke-dashoffset: 0; opacity: 1; }
          70%  { stroke-dashoffset: 0; opacity: 1; }
          90%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: ${STROKE_LENGTH_A}; opacity: 0; }
        }
        @keyframes calligraphy__draw-b {
          0%   { stroke-dashoffset: ${STROKE_LENGTH_B}; opacity: 0; }
          10%  { opacity: 1; }
          13%  { stroke-dashoffset: ${STROKE_LENGTH_B}; opacity: 1; }
          53%  { stroke-dashoffset: 0; opacity: 1; }
          70%  { stroke-dashoffset: 0; opacity: 1; }
          90%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: ${STROKE_LENGTH_B}; opacity: 0; }
        }
        @keyframes calligraphy__draw-c {
          0%   { stroke-dashoffset: ${STROKE_LENGTH_C}; opacity: 0; }
          27%  { opacity: 1; }
          30%  { stroke-dashoffset: ${STROKE_LENGTH_C}; opacity: 1; }
          73%  { stroke-dashoffset: 0; opacity: 1; }
          85%  { stroke-dashoffset: 0; opacity: 1; }
          95%  { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: ${STROKE_LENGTH_C}; opacity: 0; }
        }

        .calligraphy__stroke-a {
          stroke-dasharray: ${STROKE_LENGTH_A};
          stroke-dashoffset: ${reduced ? '0' : String(STROKE_LENGTH_A)};
          animation: ${reduced ? 'none' : `calligraphy__draw-a 8s ease-in-out infinite`};
        }
        .calligraphy__stroke-b {
          stroke-dasharray: ${STROKE_LENGTH_B};
          stroke-dashoffset: ${reduced ? '0' : String(STROKE_LENGTH_B)};
          animation: ${reduced ? 'none' : `calligraphy__draw-b 8s ease-in-out infinite`};
          opacity: ${reduced ? '1' : '0'};
        }
        .calligraphy__stroke-c {
          stroke-dasharray: ${STROKE_LENGTH_C};
          stroke-dashoffset: ${reduced ? '0' : String(STROKE_LENGTH_C)};
          animation: ${reduced ? 'none' : `calligraphy__draw-c 8s ease-in-out infinite`};
          opacity: ${reduced ? '1' : '0'};
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
          flexDirection: 'column',
          gap: 0,
        }}
      >
        <svg
          viewBox="0 0 600 340"
          width="100%"
          height="340"
          aria-label="一筆書き — 三つの筆跡が順に描かれる"
          style={{ maxWidth: 600, overflow: 'visible' }}
        >
          {/* Stroke A: sweeping circle arc (丸) — left */}
          <circle
            className="calligraphy__stroke-a"
            cx="110"
            cy="170"
            r="80"
            fill="none"
            stroke="var(--text)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Stroke B: bold diagonal slash (直) — center */}
          <line
            className="calligraphy__stroke-b"
            x1="250"
            y1="80"
            x2="370"
            y2="280"
            stroke="var(--text)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Stroke C: S-curve wave (流) — right */}
          <path
            className="calligraphy__stroke-c"
            d="M 450 90 C 490 120, 420 170, 460 210 C 500 250, 430 290, 470 320"
            fill="none"
            stroke="var(--text)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Labels */}
          <text
            x="110"
            y="290"
            textAnchor="middle"
            fontFamily="var(--font-jp-mincho)"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            丸
          </text>
          <text
            x="310"
            y="318"
            textAnchor="middle"
            fontFamily="var(--font-jp-mincho)"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            直
          </text>
          <text
            x="460"
            y="348"
            textAnchor="middle"
            fontFamily="var(--font-jp-mincho)"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            流
          </text>
        </svg>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.25em',
            marginTop: 16,
          }}
        >
          — CALLIGRAPHY STROKE / 一筆書き
        </div>
      </div>
    </>
  );
}
