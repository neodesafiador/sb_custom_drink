import Link from 'next/link';
import { CATEGORIES, CATEGORY_COLORS } from '@/lib/categories';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="flex justify-center items-end gap-2">
            {/* Starbucks */}
            <span
              className={`${greatVibes.className} text-5xl text-green-800 drop-shadow`}
            >
              Starbucks
            </span>

            {/* UTAZU */}
            <span className="text-sm text-green-700 tracking-widest mb-1">
              UTAZU
            </span>
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
