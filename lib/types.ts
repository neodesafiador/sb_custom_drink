// カスタム例の型定義
export type CustomExample = {
  name: string;           // カスタム例の名前（例：「甘さ控えめカスタム」）
  description: string;    // 特徴や説明（例：「健康志向の方におすすめ」）
  items: string[];        // カスタマイズ項目のリスト
};

// ドリンクの型定義
export type Drink = {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  customExamples: string; // JSON文字列（CustomExample[]を格納）
  createdAt: Date;
  updatedAt: Date;
};
