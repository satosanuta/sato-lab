export default function TextGradient() {
  return (
    <div
      style={{
        padding: '60px 40px',
        background: 'var(--ink)',
        textAlign: 'center',
        border: '1px solid rgba(245, 241, 234, 0.08)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-en-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(40px, 8vw, 120px)',
          fontWeight: 700,
          margin: 0,
          backgroundImage:
            'linear-gradient(90deg, var(--accent), #ffb89f, var(--violet), var(--accent))',
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          animation: 'flow-grad 6s ease infinite',
        }}
      >
        Sato san
      </h3>
      <div
        style={{
          fontFamily: 'var(--font-jp-mincho)',
          fontWeight: 900,
          fontSize: 'clamp(32px, 6vw, 80px)',
          backgroundImage: 'linear-gradient(135deg, var(--accent-soft), var(--paper))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        異世界冒険者
      </div>
      <style>{`
        @keyframes flow-grad {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
