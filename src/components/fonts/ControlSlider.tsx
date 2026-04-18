type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  set: (v: number) => void;
  unit?: string;
};

export default function ControlSlider({ label, value, min, max, step = 1, set, unit = '' }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200 }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
        }}
      >
        {label}{' '}
        <span style={{ color: 'var(--accent)' }}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        style={{ accentColor: 'var(--accent)', width: '100%' }}
      />
    </div>
  );
}
