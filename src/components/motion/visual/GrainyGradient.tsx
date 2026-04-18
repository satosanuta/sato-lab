export default function GrainyGradient() {
  return (
    <div
      style={{
        position: 'relative',
        height: 280,
        background: 'linear-gradient(135deg, var(--accent) 0%, #ffb89f 50%, var(--violet) 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'multiply',
          opacity: 0.4,
        }}
        aria-hidden="true"
      >
        <filter id="grainy-g">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainy-g)" />
      </svg>
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#2a2535' }}>
        <div
          style={{
            fontFamily: 'var(--font-en-serif)',
            fontStyle: 'italic',
            fontSize: 18,
            opacity: 0.7,
          }}
        >
          Grainy Gradient
        </div>
        <h4
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontWeight: 900,
            fontSize: 48,
            margin: '8px 0 0',
          }}
        >
          粒のある温度感
        </h4>
      </div>
    </div>
  );
}
