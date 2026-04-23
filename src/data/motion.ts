export type TrendLevel = '定番' | '最先端' | '没入型';

export type MotionDemo = {
  slug: string;
  title: string;
  desc: string;
  tech: string;
  trend: TrendLevel;
  category: 'immersive' | 'text' | 'interaction' | 'visual' | 'layout';
  component: string; // component name for reference
};

export const motionDemos: MotionDemo[] = [
  // 没入型
  {
    slug: 'scroll-stage',
    title: 'Scroll Stage / 起承転結',
    desc: 'スクロール進行で4シーンを展開する没入ステージ。sticky + scroll-drivenの定番構成。',
    tech: 'sticky · scroll-driven',
    trend: '没入型',
    category: 'immersive',
    component: 'ScrollStage',
  },
  {
    slug: 'horizontal-pin',
    title: 'Horizontal Pin / 横スクロール',
    desc: '縦スクロールを横移動に変換する固定パネル演出。採用・周年サイトで頻出。',
    tech: 'sticky · translateX',
    trend: '没入型',
    category: 'immersive',
    component: 'HorizontalScrollPin',
  },
  {
    slug: 'particles',
    title: 'Particle Field / 粒子場',
    desc: 'Canvas粒子がマウスに反応して反発。GTA VIサイトで話題になった没入UI。',
    tech: 'Canvas · RAF',
    trend: '没入型',
    category: 'immersive',
    component: 'ParticleField',
  },
  {
    slug: 'flow-field',
    title: 'Fluid Gradient / 液体背景',
    desc: '複数のラジアルグラデを時間で動かしブラー合成。WebGLシェーダー風の流動表現。',
    tech: 'Canvas · blur · grain',
    trend: '没入型',
    category: 'immersive',
    component: 'FlowFieldBg',
  },
  {
    slug: 'card-3d',
    title: '3D Card Tilt / 奥行きカード',
    desc: 'perspectiveとpreserve-3dでカードスタックを3D空間に配置。マウスで傾き操作。',
    tech: 'CSS 3D · perspective',
    trend: '没入型',
    category: 'immersive',
    component: 'Card3DStack',
  },
  {
    slug: 'parallax-layers',
    title: 'Parallax Layers / 視差',
    desc: '複数レイヤーに異なる速度。定番の奥行き表現。',
    tech: 'scroll · transform',
    trend: '没入型',
    category: 'immersive',
    component: 'ParallaxLayers',
  },
  {
    slug: 'fire-ember',
    title: 'Fire Ember / 焚き火の粒子',
    desc: '上昇する火の粉と残り火が空気に溶ける。ギルドの炉辺を想起させる暖色の粒子演出。',
    tech: 'Canvas · RAF · gradient',
    trend: '没入型',
    category: 'immersive',
    component: 'FireEmberParticle',
  },
  {
    slug: 'aurora-mesh',
    title: 'Aurora Mesh / 夜空のオーロラ',
    desc: '複数のconic-gradientを重ねて時間で回転。夜空のオーロラのような環境背景。JSなし。',
    tech: 'CSS conic-gradient · keyframes',
    trend: '没入型',
    category: 'immersive',
    component: 'AuroraMesh',
  },
  {
    slug: 'depth-fog',
    title: 'Depth Fog / 奥行きの霧',
    desc: '3D空間に複数のレイヤーを配置し遠いほど霞む。スクロールで霧が動き奥行き感を強調。',
    tech: 'CSS perspective · blur · translate3d',
    trend: '没入型',
    category: 'immersive',
    component: 'DepthFog',
  },

  // テキスト
  {
    slug: 'marquee',
    title: 'Marquee / キネティック',
    desc: 'CSS keyframesで無限横スクロール。ロゴ帯・大型タイポFVで頻出。',
    tech: 'CSS · keyframes',
    trend: '定番',
    category: 'text',
    component: 'Marquee',
  },
  {
    slug: 'split-text',
    title: 'SplitText Reveal',
    desc: 'IntersectionObserver + stagger。GSAP無料化で2025年普及。',
    tech: 'IO · stagger',
    trend: '最先端',
    category: 'text',
    component: 'SplitTextReveal',
  },
  {
    slug: 'typing',
    title: 'Typing / タイピング演出',
    desc: '書いては消え、書いては消える。ヒーローエリアの定番。',
    tech: 'setState · interval',
    trend: '定番',
    category: 'text',
    component: 'TypingEffect',
  },
  {
    slug: 'text-gradient',
    title: 'Flowing Text Gradient',
    desc: 'background-clip:textで文字をグラデで塗る。',
    tech: 'background-clip',
    trend: '定番',
    category: 'text',
    component: 'TextGradient',
  },
  {
    slug: 'vertical-jp',
    title: 'Vertical / 縦書き組版',
    desc: 'writing-mode: vertical-rl で右から左へ流れる古典的な縦書きレイアウト。横書き欧文との混植。',
    tech: 'CSS writing-mode · text-combine-upright',
    trend: '定番',
    category: 'text',
    component: 'VerticalJpWriting',
  },
  {
    slug: 'calligraphy-stroke',
    title: 'Calligraphy / 一筆書き',
    desc: 'SVG pathの stroke-dashoffset を時間で 0 に近づけて毛筆の一筆書きを再現。',
    tech: 'SVG · stroke-dasharray · stroke-dashoffset',
    trend: '定番',
    category: 'text',
    component: 'CalligraphyStroke',
  },
  {
    slug: 'sealed-text',
    title: 'Sealed Text / 封印解除',
    desc: 'マスクの輪が広がりながら封印が解け、隠された文字が徐々に現れる。',
    tech: 'CSS mask-image · animation',
    trend: '没入型',
    category: 'text',
    component: 'SealedTextUnlock',
  },

  // インタラクション
  {
    slug: 'magnetic',
    title: 'Magnetic Button / 吸着',
    desc: '2025年のホバー最前線。マウスに吸い寄せられるボタン。',
    tech: 'mousemove · lerp',
    trend: '最先端',
    category: 'interaction',
    component: 'MagneticButton',
  },
  {
    slug: 'custom-cursor',
    title: 'Custom Cursor',
    desc: 'エリア内のみ独自カーソル。ブランド体験の強化。',
    tech: 'mix-blend-mode',
    trend: '没入型',
    category: 'interaction',
    component: 'CursorArea',
  },
  {
    slug: 'hover-mask',
    title: 'Hover Image Mask',
    desc: 'clip-pathでマスクの巻き上げ。ギャラリーで定番。',
    tech: 'clip-path',
    trend: '定番',
    category: 'interaction',
    component: 'ImageHoverMask',
  },
  {
    slug: 'rune-cursor',
    title: 'Rune Cursor / 魔法軌跡',
    desc: 'カーソル軌跡にルーン文字が残って徐々に消える。冒険者の魔法痕をイメージ。',
    tech: 'Canvas · mouse trail · TTL particles',
    trend: '最先端',
    category: 'interaction',
    component: 'RuneCursor',
  },
  {
    slug: 'whisper-hover',
    title: 'Whisper / 光のささやき',
    desc: 'hoverで小さな光の粒が静かに散る。JSなし、CSS::before/::afterだけで実現。',
    tech: 'CSS pseudo-elements · keyframes',
    trend: '最先端',
    category: 'interaction',
    component: 'WhisperHover',
  },

  // ビジュアル
  {
    slug: 'glassmorphism',
    title: 'Glassmorphism',
    desc: 'backdrop-filter:blurで透過ガラス。Apple Vision Pro以降再燃。',
    tech: 'backdrop-filter',
    trend: '定番',
    category: 'visual',
    component: 'Glassmorphism',
  },
  {
    slug: 'grainy-gradient',
    title: 'Grainy Gradient',
    desc: 'SVG feTurbulenceで粒状ノイズ。温度感のあるグラデ。',
    tech: 'SVG filter',
    trend: '定番',
    category: 'visual',
    component: 'GrainyGradient',
  },
  {
    slug: 'svg-loaders',
    title: 'SVG Loaders / SMIL',
    desc: 'SMILアニメ。軽量でファイルサイズ最小。',
    tech: 'SVG · SMIL',
    trend: '定番',
    category: 'visual',
    component: 'SvgLoaderDemo',
  },
  {
    slug: 'anchor-positioning',
    title: 'Anchor / アンカー配置',
    desc: 'CSS anchor() でtooltipやpopoverを宣言的に配置。2026年stable入り、JS配置計算が不要に。',
    tech: 'CSS anchor() · position-anchor',
    trend: '最先端',
    category: 'visual',
    component: 'AnchorPositioning',
  },
  {
    slug: 'view-transitions',
    title: 'View Transitions / 遷移補間',
    desc: 'カード 2 枚をクリックで拡大表示。View Transition APIで DOM 変更をアニメで補間。',
    tech: 'CSS @view-transition · document.startViewTransition',
    trend: '最先端',
    category: 'visual',
    component: 'ViewTransitions',
  },
  {
    slug: 'scroll-driven-native',
    title: 'Scroll-Driven / CSSだけで進行',
    desc: 'JSなし、CSS scroll-timeline だけでスクロール連動アニメ。2026年 Chrome/Firefox stable。',
    tech: 'CSS scroll-timeline · animation-timeline',
    trend: '最先端',
    category: 'visual',
    component: 'ScrollDrivenNative',
  },

  // レイアウト
  {
    slug: 'scroll-progress',
    title: 'Scroll Progress',
    desc: 'IntersectionObserverで進捗追従。',
    tech: 'scroll · progress',
    trend: '定番',
    category: 'layout',
    component: 'ScrollProgressDemo',
  },
  {
    slug: 'seasonal-ambient',
    title: 'Seasonal Ambient / 季節の環境',
    desc: 'JST時刻と季節で背景の色合い・粒子が自動で変化。春:桜、夏:風鈴、秋:紅葉、冬:雪。',
    tech: 'React · date logic · CSS variables',
    trend: '没入型',
    category: 'layout',
    component: 'SeasonalAmbient',
  },
];

export const countsByTrend = motionDemos.reduce(
  (acc, d) => {
    acc[d.trend] = (acc[d.trend] || 0) + 1;
    return acc;
  },
  {} as Record<TrendLevel, number>,
);
