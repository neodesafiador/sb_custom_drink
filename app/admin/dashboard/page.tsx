import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logout, deleteDrink } from '../actions';
import DrinkForm from '@/components/DrinkForm';
import DrinkList from '@/components/DrinkList';

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin');
  }

  const drinks = await prisma.drink.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">管理画面</h1>
            <p className="text-gray-600 mt-1">ドリンクの追加・編集・削除</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
            >
              ログアウト
            </button>
          </form>
        </div>

        {/* リンク */}
        <div className="mb-8 flex gap-4">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-starbucks-green transition-colors"
          >
            トップページを見る
          </a>
          <a
            href="/qr"
            className="text-sm text-gray-600 hover:text-starbucks-green transition-colors"
          >
            QRコードを表示
          </a>
        </div>

        {/* 新規追加フォーム */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            新規ドリンク追加
          </h2>
          <DrinkForm />
        </div>

        {/* ドリンク一覧 */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            登録済みドリンク ({drinks.length}件)
          </h2>
          <DrinkList drinks={drinks} />
        </div>
      </div>
    </main>
  );
}
