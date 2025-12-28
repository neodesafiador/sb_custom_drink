export const CATEGORIES = [
  '季節のおすすめ',
  'コーヒー',
  'エスプレッソ',
  'フラペチーノ',
  'ティー',
  'その他',
] as const;

export type Category = typeof CATEGORIES[number];

export const CATEGORY_COLORS: Record<Category, string> = {
  '季節のおすすめ': 'bg-pink-100 text-pink-800 border-pink-200',
  'コーヒー': 'bg-amber-100 text-amber-800 border-amber-200',
  'エスプレッソ': 'bg-orange-100 text-orange-800 border-orange-200',
  'フラペチーノ': 'bg-blue-100 text-blue-800 border-blue-200',
  'ティー': 'bg-pink-100 text-pink-800 border-pink-200',
  'その他': 'bg-purple-100 text-purple-800 border-purple-200',
};
