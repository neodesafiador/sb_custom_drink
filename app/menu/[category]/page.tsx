import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { CATEGORY_COLORS } from '@/lib/categories';
import { notFound } from 'next/navigation';
import 'animate.css';

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function MenuPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // カテゴリに属するドリンクを取得
  const drinks = await prisma.drink.findMany({
    where: {
      category: decodedCategory,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (drinks.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link
            href="/"
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
            カテゴリに戻る
          </Link>
          <div className="mt-4 flex justify-center">
            <div
              className={`inline-block px-4 py-2 rounded-full border-2 ${
                CATEGORY_COLORS[decodedCategory as keyof typeof CATEGORY_COLORS] ||
                'bg-gray-100 text-gray-800 border-gray-200'
              }`}
            >
              <h1 className="text-xl font-bold">{decodedCategory}</h1>
            </div>
          </div>
        </div>

        {/* ドリンク一覧 */}
        <div className="grid grid-cols-2 gap-4">
          {drinks.map((drink, index) => (
            <Link
              key={drink.id}
              href={`/drink/${drink.id}`}
              className="block group animate__animated animate__fadeInRight"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both',
              }}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                <div className="aspect-square relative bg-gray-100">
                  <Image
                    src={drink.imageUrl}
                    alt={drink.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-2">
                    {drink.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
