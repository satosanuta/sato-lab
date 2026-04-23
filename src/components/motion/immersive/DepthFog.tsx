export default function DepthFog() {
  // 5 layers: z from -1000 to 0, blur 8→0, opacity 0.3→1
  const layers = [
    { z: -1000, blur: 8, opacity: 0.3, speed: 22, delay: 0 },
    { z: -750, blur: 6, opacity: 0.5, speed: 18, delay: -4 },
    { z: -500, blur: 4, opacity: 0.65, speed: 14, delay: -8 },
    { z: -250, blur: 2, opacity: 0.8, speed: 10, delay: -2 },
    { z: 0, blur: 0, opacity: 1.0, speed: 6, delay: -1 },
  ];

  // Mountain silhouette path data per layer (different profiles)
  const mountainPaths = [
    // Distant jagged range
    'M0,120 L40,60 L80,90 L120,30 L160,75 L200,20 L240,65 L280,40 L320,80 L360,25 L400,70 L440,45 L480,85 L520,55 L560,100 L600,120 Z',
    // Mid-distance rolling hills
    'M0,130 L60,70 L120,100 L180,50 L240,85 L300,40 L360,75 L420,55 L480,90 L540,65 L600,130 Z',
    // Closer peaks
    'M0,140 Q80,50 160,110 Q240,30 320,90 Q400,45 480,100 Q540,75 600,140 Z',
    // Near ridge
    'M0,150 Q100,90 200,120 Q300,60 400,110 Q500,80 600,150 Z',
    // Foreground silhouette
    'M0,160 Q150,120 300,140 Q450,110 600,160 L600,200 L0,200 Z',
  ];

  return (
    <>
      <style>{`
        @keyframes depth-fog__drift-1 { 0%,100% { transform: translate3d(0,0,-1000px); } 50% { transform: translate3d(8px,2px,-1000px); } }
        @keyframes depth-fog__drift-2 { 0%,100% { transform: translate3d(0,0,-750px);  } 50% { transform: translate3d(-10px,3px,-750px);  } }
        @keyframes depth-fog__drift-3 { 0%,100% { transform: translate3d(0,0,-500px);  } 50% { transform: translate3d(12px,-2px,-500px); } }
        @keyframes depth-fog__drift-4 { 0%,100% { transform: translate3d(0,0,-250px);  } 50% { transform: translate3d(-6px,4px,-250px);  } }
        @keyframes depth-fog__drift-5 { 0%,100% { transform: translate3d(0,0,0px);     } 50% { transform: translate3d(4px,-1px,0px);     } }

        .depth-fog__layer-1 { animation: depth-fog__drift-1 22s ease-in-out infinite; animation-delay: 0s; }
        .depth-fog__layer-2 { animation: depth-fog__drift-2 18s ease-in-out infinite; animation-delay: -4s; }
        .depth-fog__layer-3 { animation: depth-fog__drift-3 14s ease-in-out infinite; animation-delay: -8s; }
        .depth-fog__layer-4 { animation: depth-fog__drift-4 10s ease-in-out infinite; animation-delay: -2s; }
        .depth-fog__layer-5 { animation: depth-fog__drift-5 6s  ease-in-out infinite; animation-delay: -1s; }

        @media (prefers-reduced-motion: reduce) {
          .depth-fog__layer-1,
          .depth-fog__layer-2,
          .depth-fog__layer-3,
          .depth-fog__layer-4,
          .depth-fog__layer-5 {
            animation: none;
          }
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #0a1020 0%, #1a2540 50%, #0f1a30 100%)',
          perspective: '1500px',
          perspectiveOrigin: '50% 40%',
        }}
      >
        {/* Atmospheric fog gradient */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(100,140,200,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 5 depth layers */}
        {layers.map((layer, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`depth-fog__layer-${i + 1}`}
            style={{
              position: 'absolute',
              inset: '-10%',
              filter: `blur(${layer.blur}px)`,
              opacity: layer.opacity,
            }}
          >
            <svg
              viewBox="0 0 600 200"
              width="120%"
              height="55%"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: 'absolute', bottom: '15%', left: '-10%' }}
            >
              <path
                d={mountainPaths[i]}
                fill={
                  i === 4
                    ? 'rgba(15,25,50,0.95)'
                    : i === 3
                      ? 'rgba(20,35,65,0.85)'
                      : i === 2
                        ? 'rgba(30,50,90,0.7)'
                        : i === 1
                          ? 'rgba(40,65,110,0.55)'
                          : 'rgba(50,80,130,0.4)'
                }
              />
            </svg>
          </div>
        ))}

        {/* Center text overlay */}
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
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              color: 'rgba(220,235,255,0.95)',
              margin: 0,
              letterSpacing: '0.1em',
              textShadow: '0 2px 30px rgba(100,150,255,0.4)',
            }}
          >
            霧の向こうへ
          </h3>
          <div
            style={{
              fontFamily: 'var(--font-en-serif)',
              fontStyle: 'italic',
              fontSize: 17,
              color: 'rgba(180,210,255,0.7)',
              marginTop: 14,
              letterSpacing: '0.06em',
            }}
          >
            Through the mist
          </div>
        </div>
      </div>
    </>
  );
}
