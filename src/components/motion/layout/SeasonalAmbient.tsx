import { useState } from 'react';
import { useReducedMotion } from '../../shared/useReducedMotion';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

function detectSeason(): Season {
  const month = new Date().getMonth(); // 0-indexed
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

const SEASON_CONFIG: Record<
  Season,
  {
    label: string;
    bg: string;
    particles: string[];
    particleColor: string;
    textColor: string;
    titleJp: string;
    titleEn: string;
    drift: string;
  }
> = {
  spring: {
    label: '春',
    bg: 'linear-gradient(160deg, #f9e8f0 0%, #fce4ec 40%, #ede7f6 100%)',
    particles: ['🌸', '🌸', '🌸', '🌺', '🌸'],
    particleColor: '#e91e8c',
    textColor: '#6a1b4d',
    titleJp: '春は桜の季節',
    titleEn: 'Cherry blossoms in the spring air',
    drift: 'seasonal__drift-spring',
  },
  summer: {
    label: '夏',
    bg: 'linear-gradient(160deg, #e0f7fa 0%, #b2ebf2 40%, #e8f5e9 100%)',
    particles: ['🔔', '💧', '🔔', '💧', '🍃'],
    particleColor: '#00838f',
    textColor: '#004d40',
    titleJp: '夏は風鈴の声',
    titleEn: 'Wind chimes sing in summer heat',
    drift: 'seasonal__drift-summer',
  },
  autumn: {
    label: '秋',
    bg: 'linear-gradient(160deg, #fff3e0 0%, #ffe0b2 40%, #fbe9e7 100%)',
    particles: ['🍂', '🍁', '🍂', '🍁', '🍂'],
    particleColor: '#bf360c',
    textColor: '#4e342e',
    titleJp: '秋は紅葉の炎',
    titleEn: 'Crimson leaves drift in autumn wind',
    drift: 'seasonal__drift-autumn',
  },
  winter: {
    label: '冬',
    bg: 'linear-gradient(160deg, #e8eaf6 0%, #e3f2fd 40%, #f3e5f5 100%)',
    particles: ['❄️', '❄️', '⭐', '❄️', '❄️'],
    particleColor: '#5c6bc0',
    textColor: '#1a237e',
    titleJp: '冬は雪の静寂',
    titleEn: 'Snowflakes fall in winter silence',
    drift: 'seasonal__drift-winter',
  },
};

const BUTTONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

// Generate deterministic particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: '8%', animDelay: '0s', animDur: '6s', size: 22 },
  { left: '18%', animDelay: '-1.5s', animDur: '7.5s', size: 18 },
  { left: '29%', animDelay: '-3s', animDur: '5.5s', size: 24 },
  { left: '40%', animDelay: '-0.8s', animDur: '8s', size: 20 },
  { left: '52%', animDelay: '-2.2s', animDur: '6.5s', size: 16 },
  { left: '63%', animDelay: '-4s', animDur: '7s', size: 22 },
  { left: '74%', animDelay: '-1s', animDur: '5s', size: 20 },
  { left: '85%', animDelay: '-3.5s', animDur: '8.5s', size: 18 },
  { left: '22%', animDelay: '-5s', animDur: '6s', size: 14 },
  { left: '47%', animDelay: '-2s', animDur: '7s', size: 26 },
  { left: '68%', animDelay: '-0.5s', animDur: '6.5s', size: 18 },
  { left: '91%', animDelay: '-3s', animDur: '5.5s', size: 16 },
];

export default function SeasonalAmbient() {
  const [season, setSeason] = useState<Season>(detectSeason);
  const reduced = useReducedMotion();
  const cfg = SEASON_CONFIG[season];

  return (
    <>
      <style>{`
        @keyframes seasonal__drift-spring {
          0%   { transform: translateY(-40px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(520px) rotate(360deg); opacity: 0; }
        }
        @keyframes seasonal__drift-summer {
          0%   { transform: translateY(-40px) translateX(0px);    opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translateY(260px) translateX(12px);   opacity: 0.9; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(520px) translateX(-8px);   opacity: 0; }
        }
        @keyframes seasonal__drift-autumn {
          0%   { transform: translateY(-40px) rotate(0deg)   translateX(0px);   opacity: 0; }
          10%  { opacity: 1; }
          33%  { transform: translateY(160px) rotate(60deg)  translateX(16px);  opacity: 0.9; }
          66%  { transform: translateY(330px) rotate(120deg) translateX(-12px); opacity: 0.8; }
          100% { transform: translateY(520px) rotate(200deg) translateX(8px);   opacity: 0; }
        }
        @keyframes seasonal__drift-winter {
          0%   { transform: translateY(-40px) translateX(0px);     opacity: 0; }
          10%  { opacity: 0.9; }
          50%  { transform: translateY(260px) translateX(10px);    opacity: 0.7; }
          100% { transform: translateY(520px) translateX(-6px);    opacity: 0; }
        }

        .seasonal__particle {
          position: absolute;
          top: 0;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }
        .seasonal__btn {
          font-family: var(--font-jp-mincho);
          font-size: 18px;
          padding: 8px 20px;
          border-radius: 8px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: cfg.bg,
          transition: 'background 0.8s ease',
        }}
      >
        {/* Floating particles */}
        {PARTICLE_POSITIONS.map((pos, i) => {
          const emoji = cfg.particles[i % cfg.particles.length] ?? '✨';
          return (
            <span
              key={i}
              aria-hidden="true"
              className="seasonal__particle"
              style={{
                left: pos.left,
                fontSize: pos.size,
                animation: reduced
                  ? 'none'
                  : `${cfg.drift} ${pos.animDur} ${pos.animDelay} linear infinite`,
                // Static scatter when reduced motion
                ...(reduced
                  ? {
                      top: `${10 + ((i * 37) % 80)}%`,
                      opacity: 0.5,
                    }
                  : {}),
              }}
            >
              {emoji}
            </span>
          );
        })}

        {/* Center content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 12,
            pointerEvents: 'none',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-jp-mincho)',
              fontWeight: 900,
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              color: cfg.textColor,
              margin: 0,
              letterSpacing: '0.1em',
              transition: 'color 0.6s ease',
              textShadow: '0 2px 12px rgba(255,255,255,0.5)',
            }}
          >
            {cfg.titleJp}
          </h3>
          <div
            style={{
              fontFamily: 'var(--font-en-serif)',
              fontStyle: 'italic',
              fontSize: 16,
              color: cfg.particleColor,
              letterSpacing: '0.04em',
              transition: 'color 0.6s ease',
              opacity: 0.85,
            }}
          >
            {cfg.titleEn}
          </div>
        </div>

        {/* Season switcher controls */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            pointerEvents: 'auto',
          }}
        >
          {BUTTONS.map((s) => (
            <button
              key={s}
              type="button"
              className="seasonal__btn"
              onClick={() => setSeason(s)}
              style={{
                background: season === s ? cfg.particleColor : 'rgba(255,255,255,0.5)',
                color: season === s ? '#fff' : cfg.textColor,
                borderColor: season === s ? cfg.particleColor : 'rgba(0,0,0,0.12)',
              }}
              aria-pressed={season === s}
              aria-label={`${SEASON_CONFIG[s].label}に切り替え`}
            >
              {SEASON_CONFIG[s].label}
            </button>
          ))}
        </div>

        {/* Caption */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: cfg.textColor,
            opacity: 0.5,
            letterSpacing: '0.2em',
          }}
        >
          — SEASONAL AMBIENT / 季節切替
        </div>
      </div>
    </>
  );
}
