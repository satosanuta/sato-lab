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
];

export const countsByTrend = motionDemos.reduce(
  (acc, d) => {
    acc[d.trend] = (acc[d.trend] || 0) + 1;
    return acc;
  },
  {} as Record<TrendLevel, number>,
);
