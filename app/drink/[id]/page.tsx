import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CATEGORY_COLORS } from '@/lib/categories';
import type { CustomExample } from '@/lib/types';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DrinkDetailPage({ params }: PageProps) {
  const { id } = await params;

  const drink = await prisma.drink.findUnique({
    where: { id },
  });

  if (!drink) {
    notFound();
  }

  const customExamples = JSON.parse(drink.customExamples) as CustomExample[];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link
            href={`/menu/${encodeURIComponent(drink.category)}`}
            className="inline-flex items-center text-gray-600 hover:text-starbucks-green transition-colors mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {drink.category}に戻る
          </Link>
        </div>

        {/* ドリンク画像 */}
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl mb-6">
          <Image
            src={drink.imageUrl}
            alt={drink.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* ドリンク情報 */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
              CATEGORY_COLORS[drink.category as keyof typeof CATEGORY_COLORS] ||
              'bg-gray-100 text-gray-800'
            }`}
          >
            {drink.category}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {drink.name}
          </h1>

          {/* カスタム例 */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-starbucks-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              おすすめカスタマイズ
            </h2>
            <div className="space-y-6">
              {customExamples.map((example, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  {/* カスタム例のヘッダー */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-starbucks-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {example.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {example.description}
                      </p>
                    </div>
                  </div>

                  {/* カスタマイズ項目 */}
                  <div className="ml-11 space-y-2">
                    {example.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-starbucks-green flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* アクション */}
        <div className="space-y-3">
          <Link
            href={`/menu/${encodeURIComponent(drink.category)}`}
            className="block w-full bg-starbucks-green text-white text-center font-bold py-4 rounded-2xl hover:bg-starbucks-light-green transition-colors shadow-lg"
          >
            カテゴリに戻る
          </Link>
          <Link
            href="/"
            className="block w-full bg-white text-starbucks-green text-center font-bold py-4 rounded-2xl border-2 border-starbucks-green hover:bg-green-50 transition-colors"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
