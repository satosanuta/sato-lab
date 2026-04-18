export default function Glassmorphism() {
  return (
    <div
      style={{
        position: 'relative',
        height: 340,
        overflow: 'hidden',
        background: 'linear-gradient(120deg, #ff5c3a 0%, #ff8a6e 30%, #6b4aff 60%, #2a1a5a 100%)',
        padding: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 60 + i * 10,
            height: 60 + i * 10,
            borderRadius: '50%',
            background: i % 2 ? 'var(--accent)' : 'var(--violet)',
            left: `${(i * 37) % 90}%`,
            top: `${(i * 53) % 80}%`,
            opacity: 0.6,
            filter: 'blur(8px)',
          }}
        />
      ))}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '40px 56px',
          borderRadius: 16,
          color: 'var(--paper)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.3em',
            marginBottom: 12,
          }}
        >
          GLASSMORPHISM
        </div>
        <h4
          style={{
            fontFamily: 'var(--font-jp-mincho)',
            fontWeight: 900,
            fontSize: 36,
            margin: 0,
          }}
        >
          透明、しかし確か
        </h4>
      </div>
    </div>
  );
}
