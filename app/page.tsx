import Link from 'next/link';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/categories';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-starbucks-green mb-2">
            カスタムドリンク
          </h1>
          <p className="text-gray-600">お好みのカテゴリを選んでください</p>
        </div>

        {/* カテゴリ選択カード */}
        <div className="space-y-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/menu/${encodeURIComponent(category)}`}
              className="block"
            >
              <div
                className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${CATEGORY_COLORS[category]}`}
              >
                <h2 className="text-xl font-bold text-center">
                  {category}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        
      </div>
    </main>
  );
}
