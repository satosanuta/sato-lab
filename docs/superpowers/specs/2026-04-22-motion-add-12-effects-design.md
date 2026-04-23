# Motion 12 新演出追加 / 設計仕様

- **日付**: 2026-04-22
- **対象**: `sato-lab` の `/motion/` セクション
- **前提**: 前タスク (2026-04-21-motion-all-on-index) で `/motion/` は 17 デモ全展開構成に完了済
- **目的**: 2026 年時点で話題の CSS/JS 演出 12 種を、砂糖さんのブランド (冒険者の充電基地・大人のギルド・正統派) に合わせて追加。既存 17 + 新規 12 = 合計 29 デモ

## 1. スコープ

### 対象

- `src/data/motion.ts` に 12 エントリ追加 (既存順序は維持、各カテゴリ末尾に追加)
- `src/components/motion/{category}/` 下に 12 ファイル新設
- `src/pages/motion/index.astro` と `[slug].astro` のディスパッチ分岐に 12 行追加
- 必要なら `src/styles/tokens.css` に色・書体トークン追加 (極力既存活用)

### 対象外

- Seasonal Ambient Layer のサイト全体適用 (今回はデモ枠内のみ。別タスクで昇格判断)
- 既存 17 デモの挙動変更
- カテゴリの新設 (既存 5 カテゴリを維持)
- ヒーロー・TopNav・Fonts ページの変更

## 2. 追加 12 演出の仕様

### Immersive / 没入型 (+3)

#### 01. Fire Ember Particle (slug: `fire-ember`)

- **Component**: `FireEmberParticle.tsx` (`src/components/motion/immersive/`)
- **Trend**: 没入型
- **Tech**: `Canvas · RAF · gradient`
- **Title**: `Fire Ember / 焚き火の粒子`
- **Desc**: `上昇する火の粉と残り火が空気に溶ける。ギルドの炉辺を想起させる暖色の粒子演出。`
- **Visual spec**:
  - 暗背景 (`#1a0f0a`) 上にオレンジ〜赤の粒子 ~80 個が上昇
  - 粒子サイズ 1〜4px、上昇速度 0.3〜1.5 px/frame、水平揺れ ±0.3
  - 色相は `#ff6a3c` → `#ffb068` の間をランダム
  - 上端で消滅、下端からランダム位置で再生
  - ReducedMotion: 静止の粒子分布のみ描画
  - `PosterField` 風の中央テキスト: h3「炉端は冷めない」+ 英語小文字 `Keep the hearth alive`

#### 02. Aurora Gradient Mesh (slug: `aurora-mesh`)

- **Component**: `AuroraMesh.tsx` (`src/components/motion/immersive/`)
- **Trend**: 没入型
- **Tech**: `CSS conic-gradient · keyframes`
- **Title**: `Aurora Mesh / 夜空のオーロラ`
- **Desc**: `複数のconic-gradientを重ねて時間で回転。夜空のオーロラのような環境背景。JSなし。`
- **Visual spec**:
  - 3 レイヤーの `conic-gradient` (パープル→ティール→深青) を重ね、各 30〜90s で回転
  - `mix-blend-mode: screen`、背景 `#0a0e1a`
  - ReducedMotion: アニメ停止、静的グラデのみ
  - 中央テキスト: h3「夜明けを待つ」+ `Awaiting the dawn`

#### 03. Depth Fog Layer (slug: `depth-fog`)

- **Component**: `DepthFog.tsx` (`src/components/motion/immersive/`)
- **Trend**: 没入型
- **Tech**: `CSS perspective · blur · translate3d`
- **Title**: `Depth Fog / 奥行きの霧`
- **Desc**: `3D空間に複数のレイヤーを配置し遠いほど霞む。スクロールで霧が動き奥行き感を強調。`
- **Visual spec**:
  - 5 レイヤーの `div` を `translate3d(0, 0, -1000px → 0)` で配置
  - 遠いレイヤーほど `filter: blur(0 → 8px)`、`opacity: 0.3 → 1`
  - 各レイヤーにシルエット風のテキスト or 図形
  - マウス・スクロール未使用、時間軸のドリフトのみ
  - 中央テキスト: h3「霧の向こうへ」+ `Through the mist`

### Text / テキスト (+3)

#### 04. Vertical JP Writing (slug: `vertical-jp`)

- **Component**: `VerticalJpWriting.tsx` (`src/components/motion/text/`)
- **Trend**: 定番
- **Tech**: `CSS writing-mode · text-combine-upright`
- **Title**: `Vertical / 縦書き組版`
- **Desc**: `writing-mode: vertical-rl で右から左へ流れる古典的な縦書きレイアウト。横書き欧文との混植。`
- **Visual spec**:
  - 明朝系フォント (`var(--font-jp-mincho)`) で 3〜5 行の和文
  - 文中の半角数字を `text-combine-upright: all` で縦組
  - 右から左にスクロール (or 静的表示)
  - 和文: 「墨の香り、紙の肌、線の運び。書物が旅の糧となる夜、月影が頁を照らす。」

#### 05. Calligraphy Stroke Reveal (slug: `calligraphy-stroke`)

- **Component**: `CalligraphyStroke.tsx` (`src/components/motion/text/`)
- **Trend**: 定番
- **Tech**: `SVG · stroke-dasharray · stroke-dashoffset`
- **Title**: `Calligraphy / 一筆書き`
- **Desc**: `SVG pathの stroke-dashoffset を時間で 0 に近づけて毛筆の一筆書きを再現。`
- **Visual spec**:
  - 3〜4 文字の和風ロゴ文字 (SVG で用意、例: "冒険", "灯", "墨")
  - 各文字の stroke が順に描かれる (stagger)
  - 無限ループ (描く → 消える → 描く)
  - 線色: `var(--text)` 上、背景は `var(--bg-elevated)`
  - ReducedMotion: 完成状態を静止表示

#### 06. Sealed Text Unlock (slug: `sealed-text`)

- **Component**: `SealedTextUnlock.tsx` (`src/components/motion/text/`)
- **Trend**: 没入型
- **Tech**: `CSS mask-image · animation`
- **Title**: `Sealed Text / 封印解除`
- **Desc**: `マスクの輪が広がりながら封印が解け、隠された文字が徐々に現れる。`
- **Visual spec**:
  - 大きな見出し (例: `OPEN THE GATE / 門を開く`)
  - `mask-image: radial-gradient(...)` でマスクをかけ、サイズを 0 → 100% にアニメ
  - ReducedMotion: 完全表示状態を静止

### Interaction / インタラクション (+2)

#### 07. Trailing Rune Cursor (slug: `rune-cursor`)

- **Component**: `RuneCursor.tsx` (`src/components/motion/interaction/`)
- **Trend**: 最先端
- **Tech**: `Canvas · mouse trail · TTL particles`
- **Title**: `Rune Cursor / 魔法軌跡`
- **Desc**: `カーソル軌跡にルーン文字が残って徐々に消える。冒険者の魔法痕をイメージ。`
- **Visual spec**:
  - Canvas 上で mousemove に応じてルーン文字 (Unicode ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ 等) を配置
  - 各文字は opacity 1 → 0 を 1.5s で遷移、float up
  - 色: `var(--accent)` 相当 (#ff8a6e)
  - 画面外 or mouseleave で軌跡停止

#### 08. Whisper Hover (slug: `whisper-hover`)

- **Component**: `WhisperHover.tsx` (`src/components/motion/interaction/`)
- **Trend**: 最先端
- **Tech**: `CSS pseudo-elements · keyframes`
- **Title**: `Whisper / 光のささやき`
- **Desc**: `hoverで小さな光の粒が静かに散る。JSなし、CSS::before/::afterだけで実現。`
- **Visual spec**:
  - 複数のボタン or カードに hover すると `::before` の光粒 4〜6 個がふわっと広がる
  - アニメは 0.6s ease-out
  - ReducedMotion: hover 時の色変化のみ

### Visual / ビジュアル (+3)

#### 09. CSS Anchor Positioning (slug: `anchor-positioning`)

- **Component**: `AnchorPositioning.tsx` (`src/components/motion/visual/`)
- **Trend**: 最先端
- **Tech**: `CSS anchor() · position-anchor`
- **Title**: `Anchor / アンカー配置`
- **Desc**: `CSS anchor() でtooltipやpopoverを宣言的に配置。2026年stable入り、JS配置計算が不要に。`
- **Visual spec**:
  - 2〜3 個のアンカーターゲット (リンク or ボタン) + 対応する tooltip
  - `@position-try` のフォールバックも示す
  - ブラウザ未対応時はシンプルな absolute fallback + 説明キャプション

#### 10. View Transitions API (slug: `view-transitions`)

- **Component**: `ViewTransitions.tsx` (`src/components/motion/visual/`)
- **Trend**: 最先端
- **Tech**: `CSS @view-transition · document.startViewTransition`
- **Title**: `View Transitions / 遷移補間`
- **Desc**: `カード 2 枚をクリックで拡大表示。View Transition APIで DOM 変更をアニメで補間。`
- **Visual spec**:
  - 2 枚のカードが並ぶ、クリックで 1 枚が全画面に拡大
  - 戻るボタンで元に戻る
  - `view-transition-name` で個別カードを識別
  - 未対応ブラウザ: opacity fade のみ

#### 11. Scroll-Driven Animation (native) (slug: `scroll-driven-native`)

- **Component**: `ScrollDrivenNative.tsx` (`src/components/motion/visual/`)
- **Trend**: 最先端
- **Tech**: `CSS scroll-timeline · animation-timeline`
- **Title**: `Scroll-Driven / CSSだけで進行`
- **Desc**: `JSなし、CSS scroll-timeline だけでスクロール連動アニメ。2026年 Chrome/Firefox stable。`
- **Visual spec**:
  - デモ枠内に縦長のスクロール可能エリア (overflow-y: scroll)
  - 要素が `animation-timeline: scroll()` で進行に応じて変形
  - 例: タイムラインで 3 シーン (テキスト・画像・パララックス)
  - 未対応ブラウザ: 静的表示

### Layout / レイアウト (+1)

#### 12. Seasonal Ambient Layer (slug: `seasonal-ambient`)

- **Component**: `SeasonalAmbient.tsx` (`src/components/motion/layout/`)
- **Trend**: 没入型
- **Tech**: `React · date logic · CSS variables`
- **Title**: `Seasonal Ambient / 季節の環境`
- **Desc**: `JST時刻と季節で背景の色合い・粒子が自動で変化。春:桜、夏:風鈴、秋:紅葉、冬:雪。`
- **Visual spec**:
  - 現在の JST 月から季節を判定 (3-5 春 / 6-8 夏 / 9-11 秋 / 12-2 冬)
  - 各季節ごとに: 背景グラデ 2 色 + ゆっくり流れる粒子 (花びら / 雪 / 葉 / 光)
  - デモ枠内に 4 季節の切替ボタン (JS で強制切替できるようにする)
  - 本デモはサイト全体には適用しない (BaseLayout 未介入)

## 3. 番号とトレンド配分

### 番号体系

- `/motion/` 画面のメタ行: `NN / 29` (グローバルインデックス、既存 17 も再番号)
- 表示順: カテゴリ順 + 各カテゴリ内は既存を先、新規を末尾 (slug 順)

### 新規 12 のトレンド内訳

- 没入型: 5 (Fire Ember, Aurora, Depth Fog, Sealed Text, Seasonal Ambient)
- 最先端: 5 (Rune Cursor, Whisper, Anchor, View Transitions, Scroll-Driven)
- 定番: 2 (Vertical JP, Calligraphy Stroke)

### 合計 29 のトレンド内訳 (参考)

- 没入型: 7 (既存) + 5 = 12
- 最先端: 2 (既存) + 5 = 7
- 定番: 8 (既存) + 2 = 10

## 4. ファイル変更一覧

### 新規作成 (12)

- `src/components/motion/immersive/FireEmberParticle.tsx`
- `src/components/motion/immersive/AuroraMesh.tsx`
- `src/components/motion/immersive/DepthFog.tsx`
- `src/components/motion/text/VerticalJpWriting.tsx`
- `src/components/motion/text/CalligraphyStroke.tsx`
- `src/components/motion/text/SealedTextUnlock.tsx`
- `src/components/motion/interaction/RuneCursor.tsx`
- `src/components/motion/interaction/WhisperHover.tsx`
- `src/components/motion/visual/AnchorPositioning.tsx`
- `src/components/motion/visual/ViewTransitions.tsx`
- `src/components/motion/visual/ScrollDrivenNative.tsx`
- `src/components/motion/layout/SeasonalAmbient.tsx`

### 変更

- `src/data/motion.ts`: 12 エントリを既存 17 の後ろに挿入 (カテゴリ末尾ごと)
- `src/pages/motion/index.astro`: import 12 + ディスパッチ分岐 12 行追加
- `src/pages/motion/[slug].astro`: import 12 + ディスパッチ分岐 12 行追加

## 5. 実装ガイドライン

### 共通規約 (既存パターン踏襲)

- 全コンポーネントは React function default export
- RAF / Canvas 系は `useReducedMotion` で停止・フォールバック対応
- コンポーネント内部で `height: 500` 固定、`position: relative`, `overflow: hidden` の仕切り
- スタイルはインライン or scoped CSS、既存トークン (`var(--accent)` 等) を最大活用
- 非対応ブラウザ (View Transitions, Scroll-Driven, Anchor) は `@supports` で分岐、フォールバック静止

### 色・書体

- 既存トークンで賄う: `--accent` (オレンジ)、`--purple`、`--text`, `--bg`, `--bg-elevated`
- 新規トークン追加しない (YAGNI)

### a11y

- 装飾要素は `aria-hidden="true"`
- キャプション類のテキストは見える形で配置
- `prefers-reduced-motion` respect (既存の `useReducedMotion` フックを使用)

## 6. パフォーマンス

- `client:visible` (Astro) による遅延ハイドレート
- 各コンポーネントで IntersectionObserver で画面外の RAF 停止 (既存 `ParticleField` パターン)
- `/motion/` は既に `content-visibility: auto` + `contain-intrinsic-size` 適用済

## 7. 非機能要件

### a11y

- トレンドバッジ・番号は視認性維持
- SVG stroke アニメには `aria-label` 付与
- Rune Cursor は Canvas に `aria-hidden`

### SEO

- `/motion/{slug}/` 新規 12 ページが Astro 自動生成される
- sitemap.xml に自動反映

### 互換性

- 既存 17 デモの URL / 挙動は無変更

## 8. YAGNI / 対象外

- BaseLayout への Seasonal Ambient 統合 (本タスクではデモ枠内のみ)
- カテゴリ新設 (既存 5 維持)
- 演出の新しいトレンド分類 (既存 3 維持)
- 翻訳・多言語化
- デモ選択 UI (タグフィルタ等)

## 9. 検証方針

- `npm run check` / `lint` / `format:check` / `build` が全て通る
- `/motion/` の 29 デモが順に表示される
- 各 `/motion/{slug}/` が 200 を返す (合計 29 ページ)
- ReducedMotion 有効時に RAF 系が停止する (Canvas 含む)
- ブラウザ未対応 CSS (`@view-transition`, `scroll-timeline`, `anchor()`) のフォールバックが機能する
- Cloudflare Pages に反映後、本番でも同じ動作

## 10. フォローアップ (別タスク想定)

- Seasonal Ambient を BaseLayout に昇格するか検討 (本タスクの反映後、気に入ったら)
- 新規デモの中で特に気に入ったものを `/branding/` ページに組み込む検討
- Lighthouse パフォーマンス計測 (目標: desktop ≥ 85、29 デモに増えたため要確認)
