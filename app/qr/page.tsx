import Link from 'next/link';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function QRPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
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
            トップに戻る
          </Link>
          <h1 className="text-3xl font-bold text-starbucks-green mb-2">
            QRコード
          </h1>
          <p className="text-gray-600">
            スマートフォンでスキャンしてアクセス
          </p>
        </div>

        {/* QRコード表示 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <QRCodeDisplay url={baseUrl} />

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 text-center break-all">
              {baseUrl}
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>このQRコードをプリントして、</p>
            <p>店舗やカフェに設置できます</p>
          </div>
        </div>
      </div>
    </main>
  );
}
