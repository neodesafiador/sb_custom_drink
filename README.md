# カスタムドリンクメニュー

スターバックス風のカスタムドリンクメニューアプリ。QRコードでスマホからアクセスでき、管理画面でドリンクの追加・編集・削除ができます。

## 特徴

- スマホ最適化（iPhone幅）
- カテゴリ別ドリンク一覧
- カスタム例の表示
- 簡易パスワード認証
- 管理画面でCRUD操作
- QRコード生成機能
- QRの遷移先を制御（ON / OFF）

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データベース**: PostgreSQL
- **ORM**: Prisma 5
- **QRコード**: qrcode

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env` を作成します。

```bash
cp .env.example .env
```

`.env` の内容を必要に応じて編集してください：

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/customdrink"
ADMIN_PASSWORD="admin123"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_QR_ENABLED=true
```

### 3. データベースのセットアップ

Prismaのマイグレーションを実行してデータベースを作成します。

```bash
npx prisma migrate dev
```

### 4. 初期データの投入

シードデータを投入して、サンプルのドリンクを登録します。

```bash
npx prisma db seed
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 使い方

### ユーザー向け機能

1. **トップページ** (`/`)
   - カテゴリを選択してドリンク一覧を表示

2. **ドリンク一覧** (`/menu/[category]`)
   - 選択したカテゴリのドリンクを表示
   - ドリンクをタップして詳細を表示

3. **ドリンク詳細** (`/drink/[id]`)
   - 大きな写真とカスタム例を表示

4. **QRコード** (`/qr`)
   - アプリのQRコードを表示
   - 画像を長押しして保存可能

### 管理者向け機能

1. **管理画面ログイン** (`/admin`)
   - 環境変数 `ADMIN_PASSWORD` で設定したパスワードでログイン

2. **ダッシュボード** (`/admin/dashboard`)
   - ドリンクの追加・編集・削除
   - 登録済みドリンクの一覧表示

## ディレクトリ構成

```
custom_drink/
├── app/                      # Next.js App Router
│   ├── admin/               # 管理画面
│   │   ├── dashboard/       # ダッシュボード
│   │   ├── actions.ts       # Server Actions
│   │   └── page.tsx         # ログインページ
│   ├── drink/[id]/          # ドリンク詳細
│   ├── menu/[category]/     # カテゴリ別ドリンク一覧
│   ├── qr/                  # QRコード表示
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # トップページ
├── components/              # Reactコンポーネント
│   ├── DrinkForm.tsx        # ドリンク登録・編集フォーム
│   ├── DrinkList.tsx        # ドリンク一覧
│   └── QRCodeDisplay.tsx    # QRコード表示
├── lib/                     # ユーティリティ
│   ├── auth.ts              # 認証処理
│   ├── categories.ts        # カテゴリ定義
│   └── prisma.ts            # Prismaクライアント
├── prisma/                  # Prismaスキーマ
│   ├── schema.prisma        # データベーススキーマ
│   └── seed.ts              # シードデータ
├── .env                     # 環境変数（gitignore）
├── .env.example             # 環境変数のテンプレート
├── next.config.ts           # Next.js設定
├── tailwind.config.ts       # Tailwind CSS設定
├── tsconfig.json            # TypeScript設定
└── package.json             # 依存パッケージ
```

## カテゴリ

固定で以下の6カテゴリがあります：

- 季節のおすすめ
- コーヒー
- エスプレッソ
- フラペチーノ
- ティー
- その他

## データベーススキーマ

```prisma
model Drink {
  id             String   @id @default(uuid())
  category       String
  name           String
  imageUrl       String
  customExamples String   // JSON配列
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

## 本番デプロイ

### Vercel へのデプロイ

1. Vercelにプロジェクトをインポート
2. 環境変数を設定：
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_BASE_URL`（本番URL）
   - `NEXT_PUBLIC_QR_ENABLED`
3. デプロイ

## カスタマイズ

### カテゴリの追加

`lib/categories.ts` を編集してカテゴリを追加できます。

