import GrainOverlay from '../../shared/GrainOverlay';
import { useScrollProgress } from '../../shared/useScrollProgress';

export default function ScrollStage() {
  const [stageRef, progress] = useScrollProgress<HTMLElement>();

  const title = '没入する、という体験';
  const scenes = [
    { t: '起', sub: 'スクロールが始まる', color: '#1a1a20' },
    { t: '承', sub: '光が差し込む', color: '#2a1a1a' },
    { t: '転', sub: '世界が反転する', color: '#ff5c3a' },
    { t: '結', sub: '記憶が残る', color: '#0a0a0c' },
  ];
  const sceneIdx = Math.min(scenes.length - 1, Math.floor(progress * scenes.length));
  const bg = scenes[sceneIdx]!.color;

  return (
    <section
      ref={stageRef}
      style={{ height: '400vh', position: 'relative', background: 'var(--ink)' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: bg,
          transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <GrainOverlay opacity={0.2} id="stage-grain" />

        <div
          style={{
            position: 'absolute',
            top: 32,
            left: '5vw',
            right: '5vw',
            display: 'flex',
            gap: 8,
            zIndex: 5,
          }}
        >
          {scenes.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 2,
                background: 'rgba(245, 241, 234, 0.13)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'var(--paper)',
                  width:
                    i < sceneIdx
                      ? '100%'
                      : i === sceneIdx
                        ? `${Math.max(0, (progress * scenes.length - i) * 100)}%`
                        : '0%',
                }}
              />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80vh',
            height: '80vh',
            transform: `translate(-50%, -50%) rotate(${progress * 540}deg) scale(${0.6 + progress * 0.8})`,
            border: '1px solid rgba(245, 241, 234, 0.2)',
            borderRadius: '50%',
            transition: 'transform 0.08s linear',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'var(--accent-soft)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 40px var(--accent)',
            }}
          />
        </div>

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
          <h2
            style={{
              fontFamily: 'var(--font-jp-mincho)',
              fontWeight: 900,
              fontSize: 'clamp(40px, 9vw, 140px)',
              color: 'var(--paper)',
              margin: 0,
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}
          >
            {title.split('').map((c, i) => {
              const delay = i * 0.05;
              const charProgress = Math.max(0, Math.min(1, (progress - delay) * 3));
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: charProgress,
                    transform: `translateY(${(1 - charProgress) * 60}px) rotateX(${(1 - charProgress) * 90}deg)`,
                    transformOrigin: 'bottom',
                  }}
                >
                  {c}
                </span>
              );
            })}
          </h2>
          <div
            style={{
              fontFamily: 'var(--font-en-serif)',
              fontStyle: 'italic',
              fontSize: 24,
              color: 'var(--paper)',
              marginTop: 24,
              opacity: progress > 0.3 ? 1 : 0,
              transform: `translateY(${progress > 0.3 ? 0 : 30}px)`,
              transition: 'all 0.8s ease',
            }}
          >
            — {scenes[sceneIdx]!.t}, {scenes[sceneIdx]!.sub}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '8vw',
            top: `${30 - progress * 40}vh`,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(245, 241, 234, 0.4)',
            letterSpacing: '0.3em',
            writingMode: 'vertical-rl',
          }}
        >
          PROGRESS · {Math.round(progress * 100)}%
        </div>
        <div
          style={{
            position: 'absolute',
            right: '8vw',
            bottom: `${20 + progress * 30}vh`,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(245, 241, 234, 0.4)',
            letterSpacing: '0.3em',
          }}
        >
          IMMERSIVE STAGE
        </div>
      </div>
    </section>
  );
}
