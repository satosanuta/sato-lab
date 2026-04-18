export type FontEntry = {
  name: string;
  family: string;
  weight: number;
  category: string;
  note: string;
  usage: string;
  lang: 'jp' | 'en';
};

export const jpFonts: FontEntry[] = [
  {
    name: 'Noto Sans JP',
    family: "'Noto Sans JP', sans-serif",
    weight: 500,
    category: '見出し / 本文',
    note: 'Google Fonts 最大手 / デジタル庁・ニトリ採用',
    usage: 'あらゆる場面で使える定番',
    lang: 'jp',
  },
  {
    name: 'Shippori Mincho',
    family: "'Shippori Mincho', serif",
    weight: 700,
    category: '見出し・装飾',
    note: '築地活版ベースの上品な明朝',
    usage: '和風・エディトリアル',
    lang: 'jp',
  },
  {
    name: 'Zen Old Mincho',
    family: "'Zen Old Mincho', serif",
    weight: 700,
    category: '見出し',
    note: 'レトロで味わいのある明朝',
    usage: 'ブランディング・和',
    lang: 'jp',
  },
  {
    name: 'BIZ UDPGothic',
    family: "'BIZ UDPGothic', sans-serif",
    weight: 700,
    category: '本文 (UD)',
    note: 'Google Fonts 唯一の日本語UDフォント',
    usage: 'アクセシビリティ重視',
    lang: 'jp',
  },
  {
    name: 'Dela Gothic One',
    family: "'Dela Gothic One', sans-serif",
    weight: 400,
    category: '装飾・インパクト',
    note: '超極太のアイキャッチ用',
    usage: 'サムネ・見出し強調',
    lang: 'jp',
  },
  {
    name: 'Klee One',
    family: "'Klee One', serif",
    weight: 600,
    category: '装飾・手書き風',
    note: '万年筆のような筆致',
    usage: '温かみ・個性',
    lang: 'jp',
  },
  {
    name: 'Yusei Magic',
    family: "'Yusei Magic', sans-serif",
    weight: 400,
    category: '装飾・手書き',
    note: '油性マジックの手書き風',
    usage: 'ポップ・カジュアル',
    lang: 'jp',
  },
  {
    name: 'RocknRoll One',
    family: "'RocknRoll One', sans-serif",
    weight: 400,
    category: '装飾',
    note: '勢いのあるモダンゴシック',
    usage: 'キャンペーン・LP',
    lang: 'jp',
  },
];

export const enFonts: FontEntry[] = [
  {
    name: 'Inter',
    family: "'Inter', sans-serif",
    weight: 500,
    category: '本文・UI',
    note: 'STUDIOランキング2位 / Figma製',
    usage: 'UI・コーポレート',
    lang: 'en',
  },
  {
    name: 'Montserrat',
    family: "'Montserrat', sans-serif",
    weight: 700,
    category: '見出し',
    note: 'ジオメトリックで存在感のある定番',
    usage: 'タイトル・ロゴ',
    lang: 'en',
  },
  {
    name: 'Poppins',
    family: "'Poppins', sans-serif",
    weight: 500,
    category: '見出し・本文',
    note: 'フレンドリーなジオメトリック',
    usage: 'LP・SaaS',
    lang: 'en',
  },
  {
    name: 'Playfair Display',
    family: "'Playfair Display', serif",
    weight: 700,
    category: '見出し・イタリック',
    note: '現代版Bodoni / Italic映え',
    usage: 'ファッション・エディトリアル',
    lang: 'en',
  },
  {
    name: 'DM Serif Display',
    family: "'DM Serif Display', serif",
    weight: 400,
    category: '見出し',
    note: 'ハイコントラストの華やかセリフ',
    usage: 'ヒーロー・大型見出し',
    lang: 'en',
  },
  {
    name: 'Space Grotesk',
    family: "'Space Grotesk', sans-serif",
    weight: 500,
    category: '本文・見出し',
    note: 'テック系の角ばったモダン',
    usage: 'スタートアップ・テック',
    lang: 'en',
  },
];

export type FontPairing = {
  jp: { family: string; name: string };
  en: { family: string; name: string };
  label: string;
};

export const pairings: FontPairing[] = [
  {
    jp: { family: "'Noto Sans JP', sans-serif", name: 'Noto Sans JP' },
    en: { family: "'Inter', sans-serif", name: 'Inter' },
    label: 'モダン・コーポレート定番',
  },
  {
    jp: { family: "'Shippori Mincho', serif", name: 'Shippori Mincho' },
    en: { family: "'Playfair Display', serif", name: 'Playfair Display' },
    label: 'エディトリアル・ラグジュアリー',
  },
  {
    jp: { family: "'Zen Old Mincho', serif", name: 'Zen Old Mincho' },
    en: { family: "'DM Serif Display', serif", name: 'DM Serif Display' },
    label: '和モダン・ブランディング',
  },
  {
    jp: { family: "'BIZ UDPGothic', sans-serif", name: 'BIZ UDPGothic' },
    en: { family: "'Inter', sans-serif", name: 'Inter' },
    label: 'アクセシビリティ重視',
  },
];
