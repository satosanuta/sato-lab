'use client';

import { useState } from 'react';

type CardId = 'card-1' | 'card-2';

const CARDS: { id: CardId; title: string; titleEn: string; body: string; color: string }[] = [
  {
    id: 'card-1',
    title: '旅立ちの朝',
    titleEn: 'Dawn of Departure',
    body: '冒険者は夜明けと共に宿を出る。荷物は少なく、志は高く。View Transition API で DOM の変化をなめらかに補間する。',
    color: 'var(--accent)',
  },
  {
    id: 'card-2',
    title: '帰還の夕暮れ',
    titleEn: 'Return at Dusk',
    body: '長い旅を終えた冒険者がギルドの扉をくぐる。疲れと達成感が混ざり合う、その静けさ。',
    color: 'var(--purple)',
  },
];

export default function ViewTransitions() {
  const [selected, setSelected] = useState<CardId | null>(null);

  const isSupported =
    typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

  const select = (id: CardId | null) => {
    if (isSupported && typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        setSelected(id);
      });
    } else {
      setSelected(id);
    }
  };

  const selectedCard = CARDS.find((c) => c.id === selected);

  return (
    <>
      <style>{`
        @keyframes vt__fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes vt__slide-up { from { transform: translateY(16px); opacity: 0; } to { transform: none; opacity: 1; } }

        ::view-transition-old(card-1),
        ::view-transition-old(card-2) {
          animation: vt__fade-in 0.3s reverse ease;
        }
        ::view-transition-new(card-1),
        ::view-transition-new(card-2) {
          animation: vt__slide-up 0.35s ease;
        }

        .vt__card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 28px 24px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          flex: 1;
        }
        .vt__card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 20px rgba(255,138,110,0.15);
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          height: 500,
          overflow: 'hidden',
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.25em',
            marginBottom: 24,
          }}
        >
          — VIEW TRANSITIONS API / クリックで拡大
          {!isSupported && (
            <span
              style={{
                display: 'inline-block',
                marginLeft: 12,
                padding: '2px 8px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                fontSize: 10,
                color: 'var(--text-secondary)',
              }}
            >
              未対応 — フォールバック動作中 / Not supported — plain React state
            </span>
          )}
        </div>

        {selected && selectedCard ? (
          /* Expanded view */
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              viewTransitionName: selected,
            }}
          >
            <div
              style={{
                flex: 1,
                background: 'var(--bg-elevated)',
                border: `2px solid ${selectedCard.color}`,
                borderRadius: 16,
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: `0 0 40px color-mix(in srgb, ${selectedCard.color} 20%, transparent)`,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-en-serif)',
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: selectedCard.color,
                  margin: '0 0 12px',
                  letterSpacing: '0.08em',
                }}
              >
                {selectedCard.titleEn}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-jp-mincho)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  color: 'var(--text)',
                  margin: '0 0 20px',
                  letterSpacing: '0.06em',
                }}
              >
                {selectedCard.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-jp-mincho)',
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.9,
                  margin: 0,
                  maxWidth: 480,
                }}
              >
                {selectedCard.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => select(null)}
              style={{
                marginTop: 20,
                alignSelf: 'center',
                fontFamily: 'var(--font-jp-mincho)',
                fontSize: 14,
                color: 'var(--text-secondary)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '10px 24px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              ← 戻る / close
            </button>
          </div>
        ) : (
          /* Card grid */
          <div style={{ display: 'flex', gap: 20, flex: 1 }}>
            {CARDS.map((card) => (
              <div
                key={card.id}
                className="vt__card"
                onClick={() => select(card.id)}
                style={{ viewTransitionName: card.id }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && select(card.id)}
                aria-label={`${card.title} を拡大`}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-en-serif)',
                    fontStyle: 'italic',
                    fontSize: 12,
                    color: card.color,
                    margin: '0 0 10px',
                    letterSpacing: '0.08em',
                  }}
                >
                  {card.titleEn}
                </p>
                <h4
                  style={{
                    fontFamily: 'var(--font-jp-mincho)',
                    fontSize: 24,
                    color: 'var(--text)',
                    margin: '0 0 14px',
                    letterSpacing: '0.05em',
                  }}
                >
                  {card.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-jp-mincho)',
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {card.body.slice(0, 45)}…
                </p>
                <div
                  style={{
                    marginTop: 20,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: card.color,
                    letterSpacing: '0.1em',
                  }}
                >
                  クリックで拡大 →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
