# sato-lab / 砂糖さんの実験室

日本のWebサイトで使われる **書体** と **演出** のリファレンス。触って確認できるショーケース。

URL: https://sato-lab.pages.dev

## 構成

- **Astro 5** + **React 18** (islands) + **TypeScript 5.7**
- **Cloudflare Pages** でホスティング
- 外部ライブラリ最小（GSAPやThree.js不使用、すべてCSS/Canvas/SVG）
- `prefers-reduced-motion` 対応、SEO/OG/PWAマニフェスト設定済み

## セットアップ

```bash
# 初回
npm install

# 開発サーバー
npm run dev          # → http://localhost:4321

# 型チェック・Lint・フォーマット
npm run check        # astro check（型）
npm run lint         # ESLint
npm run format       # Prettier で整形
npm run format:check # Prettier 差分チェック（CI用）

# 本番ビルド
npm run build        # → dist/ に静的ファイル出力
npm run preview      # ビルド結果をローカル確認
```

## デプロイ手順（Cloudflare Pages）

1. このディレクトリで `git init && git add . && git commit -m "initial"`
2. GitHubで新規リポジトリ（例: `sato-lab`）作成
3. `git remote add origin <URL> && git push -u origin main`
4. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
5. リポジトリ選択 → 設定：
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20`
6. Deploy。`sato-lab.pages.dev` でアクセス可能に。

`public/_headers` が自動で適用され、セキュリティヘッダーと静的アセットの長期キャッシュが有効になります。

## ディレクトリ構成

```
src/
├── pages/                    # ページ（ルーティング）
│   ├── index.astro           # トップ（索引）
│   ├── 404.astro             # Not Found
│   ├── fonts/index.astro     # フォント一覧
│   └── motion/
│       ├── index.astro       # 演出一覧
│       └── [slug].astro      # 各演出の個別ページ（動的生成）
├── components/
│   ├── fonts/                # フォント系コンポーネント
│   ├── motion/
│   │   ├── immersive/        # 没入型（6）
│   │   ├── text/             # テキスト（4）
│   │   ├── interaction/      # インタラクション（3)
│   │   ├── visual/           # ビジュアル（3）
│   │   └── layout/           # レイアウト（1）
│   ├── ui/                   # Hero, TopNav, SectionHeader, DemoCard
│   └── shared/               # GrainOverlay / useInView /
│                             # useReducedMotion / useScrollProgress
├── data/
│   ├── fonts.ts              # フォント14書体のメタデータ
│   └── motion.ts             # 演出17デモのメタデータ
├── layouts/
│   └── BaseLayout.astro      # 共通レイアウト（SEO・OG・Google Fonts）
├── styles/
│   └── tokens.css            # CSS変数（色・書体・reduced-motion）
└── assets/
    ├── og-image.svg          # OG画像ソース
    └── icon-src.svg          # アイコンソース

public/
├── _headers                  # Cloudflare Pages ヘッダー設定
├── robots.txt
├── manifest.webmanifest      # PWA manifest
├── favicon.svg / favicon-32.png
├── apple-touch-icon.png
├── icon-192.png / icon-512.png
└── og-image.png              # OGP画像（自動生成: npm 経由で再生成）

scripts/
└── gen-assets.mjs            # src/assets の SVG から PNG 群を生成
```

## 演出を追加する手順

1. `src/components/motion/<category>/NewDemo.tsx` を作成
2. `src/data/motion.ts` の `motionDemos` 配列に追記：
   ```ts
   {
     slug: 'new-demo',
     title: 'タイトル',
     desc: '説明',
     tech: 'CSS · keyframes',
     trend: '最先端',
     category: 'text',
     component: 'NewDemo',
   }
   ```
3. `src/pages/motion/[slug].astro` に `import NewDemo` を追加し、条件分岐に `{demo.component === 'NewDemo' && <NewDemo client:visible />}` を追加（フル画面演出の場合は `FULLSCREEN` Set にも追加）
4. `npm run dev` で確認 → push で自動デプロイ

## 書体を追加する手順

1. `src/layouts/BaseLayout.astro` のGoogle Fonts URLに書体を追加
2. `src/styles/tokens.css` に `--font-xxx` 変数を追加（任意）
3. `src/data/fonts.ts` の `jpFonts` または `enFonts` 配列に追記

## デザイントークン

`src/styles/tokens.css` に集約：

- `--accent` / `--accent-soft` / `--accent-deep`：差し色（暖色）
- `--violet`：補色
- `--ink` / `--ink-soft`：背景
- `--paper`：前景
- `--muted`：補助文字色
- `--font-jp-*` / `--font-en-*` / `--font-mono`：書体

## アセットの再生成

OG画像とアイコンは `src/assets/*.svg` を元に `sharp` で生成します。SVG を編集したら:

```bash
node scripts/gen-assets.mjs
```

## CI

`.github/workflows/ci.yml` で PR / `main` push 時に以下を検証:

- `npm run check`（型）
- `npm run lint`
- `npm run format:check`
- `npm run build`

## アクセシビリティ

- `prefers-reduced-motion: reduce` で CSS アニメーションを停止し、Canvas / RAF / マウス追従演出もフォールバック静止状態に切替
- `:focus-visible` でキーボード操作時のフォーカスリングを表示
- 主要な装飾要素は `aria-hidden="true"` を付与

## 既知の課題

### `yaml` パッケージの moderate 脆弱性（実害なし・upstream 待ち）

`npm audit` で moderate 5件が報告されるが、すべて以下の依存チェーン由来：

```
@astrojs/check (deps)
  └─ @astrojs/language-server
       └─ volar-service-yaml
            └─ yaml-language-server
                 └─ yaml  ← Stack Overflow via deeply nested YAML collections
                           (GHSA-48c2-rrv3-qjmp)
```

- **実行時への影響なし**: `astro check`（型チェッカ）でのみロードされ、本番バンドルには含まれない
- **`npm audit fix --force` はダウングレード**（`@astrojs/check@0.9.2` への退行）になるため使用不可
- **対応**: `@astrojs/check` の新バージョン（`@astrojs/language-server` を更新したもの）がリリースされたら `npm update @astrojs/check` で解消予定

確認コマンド:

```bash
npm audit --omit=dev   # 本番依存のみの脆弱性を確認（0件を維持）
npm outdated @astrojs/check  # 新バージョンが出たか定期確認
```

## ライセンス

個人リファレンス用途。掲載コードは自由に参照・流用可。
