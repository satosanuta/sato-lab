# Motion 12 新演出追加 実装プラン

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development を使用して本プランをタスク単位で実行。チェックボックス `- [ ]` で進捗管理。

**Goal:** 既存 17 デモに 12 新演出を追加し、`/motion/` を 29 デモ構成に拡張する。

**Architecture:**

- 12 新コンポーネントを `src/components/motion/{category}/` 配下に追加
- `src/data/motion.ts` に 12 エントリ挿入、順序はカテゴリ末尾
- `src/pages/motion/index.astro` と `[slug].astro` のディスパッチに 12 分岐追加
- 既存パターン (React function default export + `useReducedMotion` + IntersectionObserver で RAF 停止) を踏襲

**Tech Stack:** Astro 5 + React 18 + TypeScript strict + CSS custom properties (既存)

**Verification:** `astro check` / `npm run lint` / `npm run format:check` / `npm run build` + dev server 目視 + 本番 Cloudflare Pages 疎通確認

**Spec reference:** `docs/superpowers/specs/2026-04-22-motion-add-12-effects-design.md` で 12 デモ 1 件ずつの visual spec を参照。実装者は必ずこれを読むこと。

---

## File Structure

| ファイル                                                | 変更種別 | 責務                     |
| ------------------------------------------------------- | -------- | ------------------------ |
| `src/components/motion/immersive/FireEmberParticle.tsx` | 新規     | 焚き火粒子 (Canvas)      |
| `src/components/motion/immersive/AuroraMesh.tsx`        | 新規     | オーロラ背景 (CSS)       |
| `src/components/motion/immersive/DepthFog.tsx`          | 新規     | 奥行き霧 (CSS 3D)        |
| `src/components/motion/text/VerticalJpWriting.tsx`      | 新規     | 縦書き (CSS)             |
| `src/components/motion/text/CalligraphyStroke.tsx`      | 新規     | 一筆書き (SVG)           |
| `src/components/motion/text/SealedTextUnlock.tsx`       | 新規     | 封印解除 (CSS mask)      |
| `src/components/motion/interaction/RuneCursor.tsx`      | 新規     | ルーン軌跡 (Canvas)      |
| `src/components/motion/interaction/WhisperHover.tsx`    | 新規     | 光のささやき (CSS)       |
| `src/components/motion/visual/AnchorPositioning.tsx`    | 新規     | Anchor 配置 (CSS)        |
| `src/components/motion/visual/ViewTransitions.tsx`      | 新規     | 遷移補間 (CSS)           |
| `src/components/motion/visual/ScrollDrivenNative.tsx`   | 新規     | スクロール連動 (CSS)     |
| `src/components/motion/layout/SeasonalAmbient.tsx`      | 新規     | 季節レイヤー (React)     |
| `src/data/motion.ts`                                    | 変更     | 12 エントリ追加          |
| `src/pages/motion/index.astro`                          | 変更     | ディスパッチ分岐 12 追加 |
| `src/pages/motion/[slug].astro`                         | 変更     | ディスパッチ分岐 12 追加 |

---

## Task 1: 12 新コンポーネントを作成

**Files:** 上記 12 の新規 `.tsx` ファイル

設計は `docs/superpowers/specs/2026-04-22-motion-add-12-effects-design.md` の §2 を参照。各デモの visual spec に従う。

### 共通実装ルール (必ず従うこと)

1. **React function default export**。props なし (`SealedTextUnlock` と `SeasonalAmbient` は自前で state 管理可)
2. **ReducedMotion 対応**: Canvas / RAF / 自動ループ系は `import { useReducedMotion } from '../../shared/useReducedMotion'` を使う
3. **コンポーネント root 要素**: `position: relative`, `overflow: hidden`, 高さ `500px` 固定 (既存 `ParticleField` を参照)
4. **色**: 既存 CSS 変数を最大活用。新規追加不要
5. **スタイル**: インラインスタイル or `<style jsx>` ではなく通常の React inline style。既存のパターンを踏襲
6. **Canvas / RAF**: IntersectionObserver で画面外時に停止。`ParticleField.tsx` のパターンをコピー推奨
7. **ブラウザ未対応 CSS** (View Transitions, Scroll-Driven, Anchor): `@supports` で分岐。非対応時は静止フォールバック + `explanation` ラベル表示
8. **装飾要素には `aria-hidden="true"`**

### 実装順 (推奨)

以下の順で作成すると依存関係の学習が進んで効率的:

1. **CSS-only 系 (易)**: `AuroraMesh`, `WhisperHover`, `VerticalJpWriting`, `SealedTextUnlock`
2. **SVG 系 (中)**: `CalligraphyStroke`
3. **CSS 3D / 新機能系 (中)**: `DepthFog`, `AnchorPositioning`, `ViewTransitions`, `ScrollDrivenNative`
4. **Canvas / RAF 系 (やや複雑)**: `FireEmberParticle`, `RuneCursor`
5. **ステート管理系 (複雑)**: `SeasonalAmbient`

### 検証ステップ

- [ ] **Step 1**: 12 コンポーネントの `.tsx` を作成
- [ ] **Step 2**: `npm run check` 実行 → 0 errors
- [ ] **Step 3**: `npm run lint` 実行 → エラーなし
- [ ] **Step 4**: コミット:

  ```bash
  git add src/components/motion/
  git commit -m "$(cat <<'EOF'
  feat(motion): add 12 new effect components

  12 new motion components spread across all 5 categories, following
  the design spec in docs/superpowers/specs/2026-04-22-motion-add-12-
  effects-design.md.

  Immersive (+3): FireEmberParticle, AuroraMesh, DepthFog
  Text (+3): VerticalJpWriting, CalligraphyStroke, SealedTextUnlock
  Interaction (+2): RuneCursor, WhisperHover
  Visual (+3): AnchorPositioning, ViewTransitions, ScrollDrivenNative
  Layout (+1): SeasonalAmbient

  All Canvas/RAF demos respect prefers-reduced-motion via
  useReducedMotion; browser-native features (Anchor, View
  Transitions, scroll-timeline) have @supports fallbacks.

  Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
  EOF
  )"
  ```

---

## Task 2: motion.ts と 2 つの astro ページを統合

**Files:**

- Modify: `src/data/motion.ts` (12 エントリ追加)
- Modify: `src/pages/motion/index.astro` (12 import + 12 分岐)
- Modify: `src/pages/motion/[slug].astro` (12 import + 12 分岐)

### Step 1: `src/data/motion.ts` に 12 エントリ追加

各カテゴリブロックの最後に新規エントリを挿入 (既存順は維持)。spec §2 の slug / title / desc / tech / trend / component を正確に転記。

**注意**: `component` フィールドは `.tsx` のデフォルトエクスポート名と完全一致させる (例: `FireEmberParticle`)。

### Step 2: `src/pages/motion/index.astro` に import + 分岐追加

Frontmatter に 12 import を各カテゴリブロックへ追加:

```astro
// Immersive (+3) import FireEmberParticle from '@/components/motion/immersive/FireEmberParticle';
import AuroraMesh from '@/components/motion/immersive/AuroraMesh'; import DepthFog from
'@/components/motion/immersive/DepthFog'; // Text (+3) import VerticalJpWriting from
'@/components/motion/text/VerticalJpWriting'; import CalligraphyStroke from
'@/components/motion/text/CalligraphyStroke'; import SealedTextUnlock from
'@/components/motion/text/SealedTextUnlock'; // Interaction (+2) import RuneCursor from
'@/components/motion/interaction/RuneCursor'; import WhisperHover from
'@/components/motion/interaction/WhisperHover'; // Visual (+3) import AnchorPositioning from
'@/components/motion/visual/AnchorPositioning'; import ViewTransitions from
'@/components/motion/visual/ViewTransitions'; import ScrollDrivenNative from
'@/components/motion/visual/ScrollDrivenNative'; // Layout (+1) import SeasonalAmbient from
'@/components/motion/layout/SeasonalAmbient';
```

そして `.demo-frame` 内のディスパッチ (15 `{demo.component === '...' && <... client:visible />}` が並んでいる箇所) に以下 12 行を追加。FULLSCREEN_SCROLL に該当するものはないので全て `.demo-frame` 内:

```astro
{demo.component === 'FireEmberParticle' && <FireEmberParticle client:visible />}
{demo.component === 'AuroraMesh' && <AuroraMesh client:visible />}
{demo.component === 'DepthFog' && <DepthFog client:visible />}
{demo.component === 'VerticalJpWriting' && <VerticalJpWriting client:visible />}
{demo.component === 'CalligraphyStroke' && <CalligraphyStroke client:visible />}
{demo.component === 'SealedTextUnlock' && <SealedTextUnlock client:visible />}
{demo.component === 'RuneCursor' && <RuneCursor client:visible />}
{demo.component === 'WhisperHover' && <WhisperHover client:visible />}
{demo.component === 'AnchorPositioning' && <AnchorPositioning client:visible />}
{demo.component === 'ViewTransitions' && <ViewTransitions client:visible />}
{demo.component === 'ScrollDrivenNative' && <ScrollDrivenNative client:visible />}
{demo.component === 'SeasonalAmbient' && <SeasonalAmbient client:visible />}
```

### Step 3: `src/pages/motion/[slug].astro` に同じ 12 import + 12 分岐を追加

index.astro と同じ 12 行を入れる。

### Step 4: `npm run format` でフォーマット

### Step 5: `npm run check` → 0 errors

### Step 6: `npm run lint` → エラーなし

### Step 7: `npm run build` → Complete! で終了、29 ページ生成

### Step 8: コミット

```bash
git add src/data/motion.ts src/pages/motion/
git commit -m "$(cat <<'EOF'
feat(motion): wire 12 new demos into motion.ts and pages

Add 12 new entries to motionDemos registry, and add dispatch
branches for the new components in both /motion/ (inline all)
and /motion/{slug}/ (fullscreen individual).

Total demos: 17 → 29.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: dev server で 29 デモ目視確認

**Files:** なし

### Step 1: dev サーバー起動 (run_in_background=true)

Run: `npm run dev`

### Step 2: ブラウザで `http://localhost:4321/motion/` を開く

目視チェック:

- [ ] 上部統計カード: DEMOS=29 (※実際の合計値を確認)
- [ ] ジャンプナビのカウント表記: Immersive 9 / Text 7 / Interaction 5 / Visual 6 / Layout 2
- [ ] 01/29 〜 29/29 のメタ行が全デモに表示
- [ ] 既存 17 デモが従来通り動く
- [ ] 新規 12 デモが各カテゴリ末尾に現れる
- [ ] 各デモが `height: 500px` 前後で収まる (FULLSCREEN_SCROLL の 2 つは 400vh のまま)
- [ ] モバイル幅 (375×667) でレイアウト崩れなし

### Step 3: 各新規 /motion/{slug}/ が 200 を返すか確認

12 slug 全てに curl する (or ブラウザで開く)。

### Step 4: ReducedMotion 確認

Chrome DevTools → Rendering → "prefers-reduced-motion: reduce" に切替。Canvas 系 (FireEmberParticle, RuneCursor) が RAF 停止・静止状態になることを確認。

### Step 5: 問題があれば Task 1 or Task 2 に戻って修正

### Step 6: dev サーバー停止

---

## Task 4: 本番 push + Cloudflare Pages 反映確認

**Files:** なし

### Step 1: `git status` → working tree clean

### Step 2: `git push origin main`

### Step 3: `gh run list --limit 2` → 最新の push が queued/in_progress

### Step 4: `gh run watch <run-id>` → success 完了

### Step 5: 本番疎通確認

- `curl -s -o /dev/null -w "%{http_code}" https://sato-lab.pages.dev/motion/` → 200
- 新規 12 slug の内、ランダム 3 つを curl (e.g., `/motion/fire-ember/`, `/motion/anchor-positioning/`, `/motion/seasonal-ambient/`) → 200

---

## Self-Review

仕様書との突合せ:

| 仕様要件                 | 対応タスク                                       |
| ------------------------ | ------------------------------------------------ |
| §2 12 デモの visual spec | Task 1 (各 .tsx 作成)                            |
| §3 番号とトレンド配分    | Task 2 (motion.ts 順序)                          |
| §4 ファイル変更一覧      | Task 1 + Task 2                                  |
| §5 共通実装規約          | Task 1 (実装ルール)                              |
| §6 パフォーマンス        | Task 1 (IO 停止) + 既存の content-visibility     |
| §7 a11y / SEO / 互換性   | Task 1 (aria-hidden) + Task 2 (既存 17 URL 温存) |
| §9 検証方針              | Task 3 + Task 4                                  |

Placeholder scan: TBD / TODO なし。各タスクのコード・コマンドが具体的。

Type consistency: `component` フィールド名は spec §2 と実装ルール共に `FireEmberParticle` 等の PascalCase で統一。

Self-review 通過。

---

## Execution Handoff

Plan complete. 次は subagent-driven-development で 4 タスク順次実行。
