# Motion ページ 一覧画面・全デモ展開 実装プラン

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/motion/` ページを 17 デモすべてがスクロールで順に現れるフルワイド縦積み構成に作り替える。個別の `/motion/{slug}/` 詳細ページはフルスクリーン版として温存する。

**Architecture:** `src/pages/motion/index.astro` を全面書き換え。全 17 コンポーネントを import しカテゴリ順に展開。標準デモは 700px の枠、スクロール連動 2 デモ（`ScrollStage` / `HorizontalScrollPin`）は 400vh の素埋め込み。ヒーロー直下にカテゴリジャンプナビを追加、各セクションにフラグメントアンカーを設定。

**Tech Stack:** Astro 5, React 18（`client:visible` アイランド）, TypeScript strict, Scoped CSS in Astro style blocks, CSS custom properties（`src/styles/tokens.css`）, `content-visibility: auto` によるオフスクリーン最適化。

**Verification philosophy:** このリポジトリは単体テストを持たない（CI は `astro check` / ESLint / Prettier / `astro build` のみ）。実装の検証はビルドと `npm run dev` での目視に依存する。各タスクの終わりに型・lint・build を通し、最後に dev サーバーで 17 デモすべての表示を確認する。

---

## File Structure

| ファイル                                    | 変更種別                  | 責務                                                                                   |
| ------------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| `src/pages/motion/index.astro`              | 全面書き換え              | 17 デモすべてを 1 ページに展開。ヒーロー・カテゴリジャンプナビ・カテゴリ区切り・デモ枠 |
| `src/pages/motion/[slug].astro`             | 変更なし                  | 各デモのフルスクリーン版（URL 互換のため温存）                                         |
| `src/data/motion.ts`                        | 変更なし                  | デモ定義（17 件）                                                                      |
| `src/components/motion/**/*.tsx`            | 変更なし                  | 既存 17 コンポーネント                                                                 |
| `src/components/shared/useReducedMotion.ts` | 変更なし（Task 2 で確認） | reduced-motion フック                                                                  |
| `src/pages/index.astro`                     | 変更なし                  | 既存リンク `/motion/{slug}/` はフルスクリーン版として生きたまま                        |

---

## Task 1: `src/pages/motion/index.astro` を全面書き換え

**Files:**

- Modify: `src/pages/motion/index.astro`（全面書き換え）

- [ ] **Step 1: 現在のファイルが想定通りか確認**

Run: `head -30 src/pages/motion/index.astro`
Expected: 先頭に `import BaseLayout from '@/layouts/BaseLayout.astro';` があり、`byCategory` の reduce が見える。一致しない場合は事前に状況を確認する。

- [ ] **Step 2: 新しい motion/index.astro を書き込む（完全上書き）**

以下の内容で `src/pages/motion/index.astro` を上書きする。

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import TopNav from '@/components/ui/TopNav.astro';
import SectionHeader from '@/components/ui/SectionHeader.astro';
import { motionDemos, countsByTrend } from '@/data/motion';

// Immersive (6)
import ScrollStage from '@/components/motion/immersive/ScrollStage';
import HorizontalScrollPin from '@/components/motion/immersive/HorizontalScrollPin';
import ParticleField from '@/components/motion/immersive/ParticleField';
import FlowFieldBg from '@/components/motion/immersive/FlowFieldBg';
import Card3DStack from '@/components/motion/immersive/Card3DStack';
import ParallaxLayers from '@/components/motion/immersive/ParallaxLayers';

// Text (4)
import Marquee from '@/components/motion/text/Marquee';
import SplitTextReveal from '@/components/motion/text/SplitTextReveal';
import TypingEffect from '@/components/motion/text/TypingEffect';
import TextGradient from '@/components/motion/text/TextGradient';

// Interaction (3)
import MagneticButton from '@/components/motion/interaction/MagneticButton';
import CursorArea from '@/components/motion/interaction/CursorArea';
import ImageHoverMask from '@/components/motion/interaction/ImageHoverMask';

// Visual (3)
import Glassmorphism from '@/components/motion/visual/Glassmorphism';
import GrainyGradient from '@/components/motion/visual/GrainyGradient';
import SvgLoaderDemo from '@/components/motion/visual/SvgLoaderDemo';

// Layout (1)
import ScrollProgressDemo from '@/components/motion/layout/ScrollProgressDemo';

const byCategory = motionDemos.reduce(
  (acc, d) => {
    (acc[d.category] ||= []).push(d);
    return acc;
  },
  {} as Record<string, typeof motionDemos>,
);

const categoryLabels: Record<string, { en: string; jp: string }> = {
  immersive: { en: 'Immersive', jp: '没入型' },
  text: { en: 'Text', jp: 'テキスト' },
  interaction: { en: 'Interaction', jp: 'インタラクション' },
  visual: { en: 'Visual', jp: 'ビジュアル' },
  layout: { en: 'Layout', jp: 'レイアウト' },
};

const categoryOrder = ['immersive', 'text', 'interaction', 'visual', 'layout'] as const;

// Demos whose animations depend on full window scroll (height: 400vh + position: sticky).
// These render their own natural height; no inner frame wrap.
const FULLSCREEN_SCROLL = new Set(['ScrollStage', 'HorizontalScrollPin']);

const total = motionDemos.length;
const displayOrder = categoryOrder.flatMap((cat) => byCategory[cat] ?? []);
const demoIndexMap = new Map<string, number>(displayOrder.map((d, i) => [d.slug, i + 1]));
---

<BaseLayout
  title="Motion / 砂糖さんの実験室"
  description="日本のWebで使われる17の演出を1ページに全展開。スクロールで順に体験できるリファレンス。"
>
  <TopNav current="motion" />

  {/* Hero */}
  <section class="wrap">
    <SectionHeader
      num="02"
      title="Motion"
      jpTitle="演出"
      desc="17デモを1枚のページに全展開。スクロールで順番に体験できます。各デモのフルスクリーン版は右上の「フルスクリーンで見る →」から。"
    />

    <div class="stats">
      <div class="stat">
        <div class="n">{motionDemos.length}</div>
        <div class="lbl">DEMOS</div>
      </div>
      <div class="stat">
        <div class="n">{countsByTrend['没入型'] ?? 0}</div>
        <div class="lbl">IMMERSIVE</div>
      </div>
      <div class="stat">
        <div class="n">{countsByTrend['定番'] ?? 0}</div>
        <div class="lbl">DEFAULT</div>
      </div>
      <div class="stat">
        <div class="n">{countsByTrend['最先端'] ?? 0}</div>
        <div class="lbl">LATEST</div>
      </div>
    </div>

    <nav class="jump-nav" aria-label="カテゴリへ移動">
      {
        categoryOrder.map(
          (cat) =>
            byCategory[cat] && (
              <a href={`#${cat}`} class="jump-link">
                <span class="jump-en">{categoryLabels[cat].en}</span>
                <span class="jump-count">{byCategory[cat]!.length}</span>
              </a>
            ),
        )
      }
    </nav>
  </section>

  {/* All demos, grouped by category, inline */}
  {
    categoryOrder.map(
      (cat) =>
        byCategory[cat] && (
          <section class="cat-section" id={cat}>
            <div class="cat-divider">
              <div class="cat-tag">— {categoryLabels[cat].en.toUpperCase()}</div>
              <h2>
                {categoryLabels[cat].jp}
                <span class="cat-ct">({byCategory[cat]!.length})</span>
              </h2>
            </div>

            {byCategory[cat]!.map((demo) => {
              const idx = demoIndexMap.get(demo.slug) ?? 0;
              const isFullscreenScroll = FULLSCREEN_SCROLL.has(demo.component);
              const idxLabel = `${String(idx).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

              return (
                <article
                  class="demo-block"
                  id={demo.slug}
                  data-fullscreen-scroll={isFullscreenScroll ? 'true' : 'false'}
                  aria-labelledby={`${demo.slug}-title`}
                >
                  <header class="meta-row">
                    <div class="meta-left">
                      <span class="idx">{idxLabel}</span>
                      <span class="trend" data-trend={demo.trend}>
                        {demo.trend}
                      </span>
                      <span class="tech">{demo.tech}</span>
                    </div>
                    <a href={`/motion/${demo.slug}/`} class="fullscreen-link">
                      フルスクリーンで見る →
                    </a>
                  </header>

                  <h3 id={`${demo.slug}-title`} class="demo-title">
                    {demo.title}
                  </h3>
                  <p class="demo-desc">{demo.desc}</p>

                  {/* Fullscreen scroll demos: 400vh natural embed, no inner frame */}
                  {demo.component === 'ScrollStage' && <ScrollStage client:visible />}
                  {demo.component === 'HorizontalScrollPin' && (
                    <HorizontalScrollPin client:visible />
                  )}

                  {/* Regular demos: 700px contained frame */}
                  {!isFullscreenScroll && (
                    <div class="demo-frame">
                      {demo.component === 'ParticleField' && <ParticleField client:visible />}
                      {demo.component === 'FlowFieldBg' && <FlowFieldBg client:visible />}
                      {demo.component === 'Card3DStack' && <Card3DStack client:visible />}
                      {demo.component === 'ParallaxLayers' && <ParallaxLayers client:visible />}
                      {demo.component === 'Marquee' && (
                        <>
                          <Marquee client:visible />
                          <Marquee reverse client:visible />
                        </>
                      )}
                      {demo.component === 'SplitTextReveal' && <SplitTextReveal client:visible />}
                      {demo.component === 'TypingEffect' && <TypingEffect client:visible />}
                      {demo.component === 'TextGradient' && <TextGradient client:visible />}
                      {demo.component === 'MagneticButton' && <MagneticButton client:visible />}
                      {demo.component === 'CursorArea' && <CursorArea client:visible />}
                      {demo.component === 'ImageHoverMask' && <ImageHoverMask client:visible />}
                      {demo.component === 'Glassmorphism' && <Glassmorphism client:visible />}
                      {demo.component === 'GrainyGradient' && <GrainyGradient client:visible />}
                      {demo.component === 'SvgLoaderDemo' && <SvgLoaderDemo client:visible />}
                      {demo.component === 'ScrollProgressDemo' && (
                        <ScrollProgressDemo client:visible />
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ),
    )
  }

  <footer class="mini-footer">
    <a href="/">← 索引に戻る</a>
    <a href="/fonts/">フォント一覧へ →</a>
  </footer>
</BaseLayout>

<style>
  /* Hero wrap */
  .wrap {
    background: var(--bg);
    color: var(--text);
    padding: 80px 5vw;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1px;
    background: var(--border);
    margin-bottom: 40px;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .stat {
    background: var(--bg-elevated);
    padding: 32px 24px;
  }
  .stat .n {
    font-family: var(--font-brand-display);
    font-size: 64px;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
  }
  .stat .lbl {
    font-family: var(--font-brand-en);
    font-size: 10px;
    color: var(--text-tertiary);
    letter-spacing: 0.2em;
    margin-top: 8px;
  }

  /* Category jump nav */
  .jump-nav {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .jump-link {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    padding: 10px 18px;
    border: 1px solid var(--border);
    border-radius: 100px;
    font-family: var(--font-brand-en);
    font-size: 12px;
    letter-spacing: 0.15em;
    color: var(--text-secondary);
    font-weight: 600;
    transition:
      color 0.2s,
      border-color 0.2s;
  }
  .jump-link:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
  .jump-count {
    font-size: 10px;
    color: var(--text-tertiary);
  }
  .jump-link:hover .jump-count {
    color: var(--accent);
  }

  /* Category section */
  .cat-section {
    border-top: 1px solid var(--border);
    scroll-margin-top: 80px;
  }
  .cat-divider {
    padding: 80px 5vw 40px;
  }
  .cat-tag {
    font-family: var(--font-brand-en);
    font-size: 11px;
    color: var(--text-tertiary);
    letter-spacing: 0.3em;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .cat-divider h2 {
    font-family: var(--font-brand-heading);
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    margin: 0;
    color: var(--text);
    display: flex;
    align-items: baseline;
    gap: 16px;
    flex-wrap: wrap;
  }
  .cat-ct {
    font-family: var(--font-brand-en);
    font-size: 14px;
    color: var(--text-tertiary);
    font-weight: 400;
  }

  /* Demo block */
  .demo-block {
    padding: 0 0 120px;
    scroll-margin-top: 80px;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;
    margin-bottom: 12px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .meta-left {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
  .idx {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-tertiary);
    letter-spacing: 0.15em;
  }
  .trend {
    display: inline-block;
    font-family: var(--font-brand-en);
    font-size: 9px;
    letter-spacing: 0.2em;
    padding: 3px 9px;
    border: 1px solid;
    border-radius: 100px;
    font-weight: 600;
  }
  .trend[data-trend='没入型'] {
    color: var(--accent);
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
    background: color-mix(in srgb, var(--accent) 8%, transparent);
  }
  .trend[data-trend='最先端'] {
    color: var(--purple);
    border-color: color-mix(in srgb, var(--purple) 40%, transparent);
    background: color-mix(in srgb, var(--purple) 8%, transparent);
  }
  .trend[data-trend='定番'] {
    color: var(--text-tertiary);
    border-color: var(--border);
  }
  .tech {
    font-family: var(--font-brand-en);
    font-size: 10px;
    color: var(--accent);
    letter-spacing: 0.15em;
    font-weight: 600;
  }
  .fullscreen-link {
    font-family: var(--font-brand-en);
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 0.15em;
    font-weight: 600;
    transition: opacity 0.2s;
  }
  .fullscreen-link:hover {
    opacity: 0.7;
    text-decoration: underline;
  }

  .demo-title {
    font-family: var(--font-brand-heading);
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 700;
    margin: 0 0 12px;
    padding: 0 5vw;
    color: var(--text);
    line-height: 1.3;
  }
  .demo-desc {
    font-family: var(--font-brand-body);
    font-size: 14px;
    line-height: 1.9;
    color: var(--text-secondary);
    margin: 0 0 32px;
    padding: 0 5vw;
    max-width: 800px;
  }

  /* Regular demo frame (700px fixed, clipped) */
  .demo-frame {
    position: relative;
    height: 700px;
    background: var(--bg);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
    content-visibility: auto;
    contain-intrinsic-size: 100vw 700px;
  }

  /* Fullscreen-scroll: let component's own 400vh bleed naturally */
  .demo-block[data-fullscreen-scroll='true'] {
    padding-bottom: 120px;
  }

  /* Mini footer */
  .mini-footer {
    padding: 32px 5vw;
    display: flex;
    justify-content: space-between;
    font-family: var(--font-brand-en);
    font-size: 11px;
    letter-spacing: 0.2em;
    border-top: 1px solid var(--border);
  }
  .mini-footer a {
    color: var(--text);
    transition: color 0.2s;
  }
  .mini-footer a:hover {
    color: var(--accent);
  }

  /* Responsive: <=860px */
  @media (max-width: 860px) {
    .wrap {
      padding: 60px 5vw;
    }
    .cat-divider {
      padding: 60px 5vw 32px;
    }
    .demo-block {
      padding-bottom: 80px;
    }
    .demo-frame {
      height: 500px;
      contain-intrinsic-size: 100vw 500px;
    }
    .meta-row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
```

- [ ] **Step 3: Prettier で整形**

Run: `npm run format`
Expected: `src/pages/motion/index.astro` が整形される（`unchanged` でも OK）。エラーなく完了すること。

- [ ] **Step 4: 型チェック**

Run: `npm run check`
Expected: `0 errors / 0 warnings / 0 hints`

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: エラーなしで終了（stdout 空）

- [ ] **Step 6: ビルド**

Run: `npm run build`
Expected: `Complete!` で終了。`[slug].astro` の個別ページ 17 枚と `/motion/index.html` が生成される。

- [ ] **Step 7: コミット（プッシュはまだしない）**

Run:

```bash
git add src/pages/motion/index.astro
git commit -m "$(cat <<'EOF'
feat(motion): inline all 17 demos on /motion/ index

Replace the list-then-detail structure with a single full-width
vertical stack. Each demo gets a meta row (index/trend/tech + a
"フルスクリーンで見る →" link to the existing slug page) and a
700px frame. ScrollStage and HorizontalScrollPin keep their 400vh
natural embed because their animation depends on window scroll.

The /motion/{slug}/ fullscreen pages are unchanged and still
generated from [slug].astro — external links and bookmarks
continue to work.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Expected: `[main <hash>] feat(motion): inline all 17 demos on /motion/ index` のログが出てコミット成立。

---

## Task 2: reduced-motion 対応の確認（コード変更なし予定）

**Files:**

- Read: `src/components/motion/immersive/ParticleField.tsx`
- Read: `src/components/motion/immersive/FlowFieldBg.tsx`
- Read: `src/components/motion/immersive/Card3DStack.tsx`
- Read: `src/components/motion/immersive/ScrollStage.tsx`
- Read: `src/components/motion/immersive/HorizontalScrollPin.tsx`
- Read: `src/components/shared/useReducedMotion.ts`

- [ ] **Step 1: Canvas / RAF 駆動コンポーネントが `useReducedMotion` を呼んでいるか確認**

Run:

```bash
grep -rn "useReducedMotion\|prefers-reduced-motion" src/components/motion/
```

Expected: `ParticleField.tsx`, `FlowFieldBg.tsx`, `Card3DStack.tsx` の 3 つで `useReducedMotion` が使われている行が見つかる。

- [ ] **Step 2: ScrollStage / HorizontalScrollPin を確認**

Run: `grep -n "useReducedMotion\|useScrollProgress" src/components/motion/immersive/ScrollStage.tsx src/components/motion/immersive/HorizontalScrollPin.tsx`
Expected: 両方とも `useScrollProgress` のみ使用。`useReducedMotion` は呼ばれていない。

これは既知の状態で、CSS の `tokens.css` の `@media (prefers-reduced-motion: reduce)` が `transition-duration: 0.001ms` を強制するため、視覚的には実質動かない。本プランではコード変更しない（仕様 §5「実装時に判断」に基づき、今回は現状維持）。

- [ ] **Step 3: 結論をメモ（ファイル変更なし）**

コード変更は発生しない。本タスクは確認のみで完了。次へ進む。

---

## Task 3: `npm run dev` で 17 デモを目視確認

**Files:** なし（目視確認のみ）

- [ ] **Step 1: dev サーバー起動**

Run (bash の run_in_background=true): `npm run dev`
Expected: ログに `Local: http://localhost:4321/` が表示される。

- [ ] **Step 2: `/motion/` を開いて表示を確認（ユーザー目視）**

ブラウザで http://localhost:4321/motion/ を開く。以下を目視チェック：

- [ ] ヒーローの統計カード 4 枚が並んでいる
- [ ] カテゴリジャンプナビ（Immersive/Text/Interaction/Visual/Layout）が表示・ホバーでオレンジ化
- [ ] カテゴリ見出し `IMMERSIVE / 没入型 (6)` が先頭に出る
- [ ] 01/17 〜 17/17 のメタ行が全デモに表示
- [ ] 標準デモ（15 個）は 700px の枠に収まる
- [ ] ScrollStage（01/17）が 400vh でスティッキーに貼り付いて動く
- [ ] HorizontalScrollPin（02/17）が横移動する
- [ ] 各デモに "フルスクリーンで見る →" リンク
- [ ] 下部の "← 索引に戻る / フォント一覧へ →" フッタ

- [ ] **Step 3: ジャンプナビのアンカー動作確認**

- [ ] `Immersive` クリック → `#immersive` にジャンプ
- [ ] `Text` クリック → テキスト系セクションにジャンプ
- [ ] 他カテゴリも同様

- [ ] **Step 4: フルスクリーンリンクの動作確認**

- [ ] 任意のデモの "フルスクリーンで見る →" をクリック
- [ ] `/motion/{slug}/` に遷移し、既存の詳細ページが表示される
- [ ] 戻ってきても /motion/ の位置が保持される（ブラウザ標準動作）

- [ ] **Step 5: モバイル幅（~375px）での表示確認**

Chrome DevTools で iPhone SE 相当（375×667）に切替：

- [ ] ヒーローがはみ出していない
- [ ] ジャンプナビが折返し正常
- [ ] デモ枠は 500px 高さ
- [ ] メタ行が縦積みになる

- [ ] **Step 6: dev サーバーを停止**

起動した bash プロセスを kill。問題があれば Task 1 に戻って修正。問題なければ Task 4 へ。

---

## Task 4: 本番への反映（push でオートデプロイ）

**Files:** なし

- [ ] **Step 1: git 状態確認**

Run: `git status`
Expected: `nothing to commit, working tree clean`（Task 1 Step 7 でコミット済み、Task 2/3 で変更なし）

- [ ] **Step 2: origin/main に push**

Run: `git push`
Expected: `c2a0bf0..xxxxxxx  main -> main` 形式の出力。

- [ ] **Step 3: GitHub Actions の CI 起動を確認**

Run: `gh run list --limit 2`
Expected: 最新行に今プッシュしたコミットのタイトル `feat(motion): inline all 17 demos on /motion/ index` が `queued` か `in_progress` で表示。

- [ ] **Step 4: CI の完了を確認（約 1 分）**

Run: `gh run watch` あるいは `gh run list --limit 1` を数回。
Expected: 最終的に `completed success` になる。失敗時はログを `gh run view <id> --log-failed` で確認。

- [ ] **Step 5: Cloudflare Pages への反映を確認**

ブラウザで https://sato-lab.pages.dev/motion/ を開き、Task 3 の目視チェックと同じ項目を確認。CDN キャッシュで遅れる場合は強制リロード（Ctrl+Shift+R）。

---

## Self-Review

仕様書 `docs/superpowers/specs/2026-04-21-motion-all-on-index-design.md` とこのプランを突き合わせた結果：

| 仕様の要求事項                                              | 対応タスク                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| §3 ルーティング：`/motion/` を全展開、`[slug].astro` は温存 | Task 1（index.astro 書換）、`[slug].astro` は変更なし        |
| §3 ディープリンク：`/motion/#slug` アンカー                 | Task 1 Step 2（`article id={demo.slug}`）                    |
| §3 カテゴリジャンプナビ `#immersive` 等                     | Task 1 Step 2（`<nav class="jump-nav">`）                    |
| §4 デモブロック構造（メタ行・タイトル・説明・枠）           | Task 1 Step 2（`.demo-block` の JSX）                        |
| §4 寸法（700px / 500px、860px ブレーク）                    | Task 1 Step 2（`.demo-frame` と `@media` 定義）              |
| §4 スクロール連動 2 デモの素埋め込み                        | Task 1 Step 2（`FULLSCREEN_SCROLL` Set + 条件分岐）          |
| §4 メタ行タイポ（mono / brand-en / brand-heading）          | Task 1 Step 2（style 内定義）                                |
| §4 カテゴリ区切り                                           | Task 1 Step 2（`.cat-divider` / `.cat-tag`）                 |
| §4 ヒーロー統計 4 枚維持                                    | Task 1 Step 2（`.stats` 既存そのまま）                       |
| §5 `content-visibility: auto`                               | Task 1 Step 2（`.demo-frame` に定義）                        |
| §5 `contain-intrinsic-size`                                 | Task 1 Step 2（`100vw 700px` / `100vw 500px`）               |
| §5 reduced-motion 対応確認                                  | Task 2 全体                                                  |
| §8 a11y: `aria-labelledby` / `aria-label`                   | Task 1 Step 2（`article aria-labelledby`、`nav aria-label`） |
| §8 SEO: description 更新                                    | Task 1 Step 2（`<BaseLayout description=...>`）              |
| §8 互換性: `/motion/{slug}/` 維持                           | Task 1 Step 2（`[slug].astro` 変更なし、リンクも維持）       |

**Placeholder scan:** TBD / TODO なし。すべてのコード・コマンドが具体的。

**Type consistency:** `FULLSCREEN_SCROLL` という Set 名と `isFullscreenScroll` 変数名は Task 1 全体で一貫。`demoIndexMap` も同様。

**Spec コヒーレンス:** `html` の `scroll-behavior: smooth` はスコープ外（Astro scoped style が `html` に刺さらないため。現状も指定していない & デフォルト挙動で問題ないため含めず）。`scroll-margin-top: 80px` を個別セクションに付けて解決。

Self-review 通過。プラン完成。

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-21-motion-all-on-index.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
