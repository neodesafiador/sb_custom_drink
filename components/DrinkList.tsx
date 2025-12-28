'use client';

import { useState } from 'react';
import Image from 'next/image';
import { deleteDrink } from '@/app/admin/actions';
import DrinkForm from './DrinkForm';
import type { CustomExample } from '@/lib/types';

type Drink = {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  customExamples: string;
  createdAt: Date;
  updatedAt: Date;
};

type DrinkListProps = {
  drinks: Drink[];
};

export default function DrinkList({ drinks }: DrinkListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`「${name}」を削除してもよろしいですか？`)) {
      return;
    }

    const result = await deleteDrink(id);
    if (result?.error) {
      alert(result.error);
    }
  }

  if (drinks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        まだドリンクが登録されていません
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {drinks.map((drink) => {
        const customExamples = JSON.parse(drink.customExamples) as CustomExample[];

        return (
          <div
            key={drink.id}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            {editingId === drink.id ? (
              <DrinkForm drink={drink} onCancel={() => setEditingId(null)} />
            ) : (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={drink.imageUrl}
                      alt={drink.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium mb-2">
                        {drink.category}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {drink.name}
                      </h3>

                      {/* カスタム例の表示 */}
                      <div className="space-y-3 text-sm">
                        {customExamples.map((example, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                          >
                            <div className="font-bold text-gray-900 mb-1">
                              {example.name}
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              {example.description}
                            </div>
                            <div className="space-y-1">
                              {example.items.map((item, j) => (
                                <div
                                  key={j}
                                  className="flex items-center text-gray-600"
                                >
                                  <span className="text-starbucks-green mr-1">
                                    •
                                  </span>
                                  <span className="text-xs">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setEditingId(drink.id)}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors font-medium whitespace-nowrap"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDelete(drink.id, drink.name)}
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors font-medium whitespace-nowrap"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
