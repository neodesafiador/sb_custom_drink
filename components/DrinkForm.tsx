'use client';

import { useState } from 'react';
import { createDrink, updateDrink } from '@/app/admin/actions';
import { CATEGORIES } from '@/lib/categories';
import type { CustomExample } from '@/lib/types';

type DrinkFormProps = {
  drink?: {
    id: string;
    category: string;
    name: string;
    imageUrl: string;
    customExamples: string;
  };
  onCancel?: () => void;
};

export default function DrinkForm({ drink, onCancel }: DrinkFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // カスタム例の初期値を設定
  const initialExamples: CustomExample[] = drink
    ? (JSON.parse(drink.customExamples) as CustomExample[])
    : [
        {
          name: '',
          description: '',
          items: [''],
        },
      ];

  const [customExamples, setCustomExamples] =
    useState<CustomExample[]>(initialExamples);

  // カスタム例を追加
  function addCustomExample() {
    setCustomExamples([
      ...customExamples,
      {
        name: '',
        description: '',
        items: [''],
      },
    ]);
  }

  // カスタム例を削除
  function removeCustomExample(index: number) {
    setCustomExamples(customExamples.filter((_, i) => i !== index));
  }

  // カスタム例の項目を追加
  function addItem(exampleIndex: number) {
    const updated = [...customExamples];
    updated[exampleIndex].items.push('');
    setCustomExamples(updated);
  }

  // カスタム例の項目を削除
  function removeItem(exampleIndex: number, itemIndex: number) {
    const updated = [...customExamples];
    updated[exampleIndex].items = updated[exampleIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setCustomExamples(updated);
  }

  // カスタム例の名前を更新
  function updateExampleName(index: number, value: string) {
    const updated = [...customExamples];
    updated[index].name = value;
    setCustomExamples(updated);
  }

  // カスタム例の説明を更新
  function updateExampleDescription(index: number, value: string) {
    const updated = [...customExamples];
    updated[index].description = value;
    setCustomExamples(updated);
  }

  // カスタム例の項目を更新
  function updateItem(exampleIndex: number, itemIndex: number, value: string) {
    const updated = [...customExamples];
    updated[exampleIndex].items[itemIndex] = value;
    setCustomExamples(updated);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // カスタム例のバリデーション
    const validExamples = customExamples.filter(
      (ex) =>
        ex.name.trim() &&
        ex.description.trim() &&
        ex.items.some((item) => item.trim())
    );

    if (validExamples.length === 0) {
      setError('少なくとも1つのカスタム例を入力してください');
      setIsSubmitting(false);
      return;
    }

    // 空の項目を除外
    const cleanedExamples = validExamples.map((ex) => ({
      ...ex,
      items: ex.items.filter((item) => item.trim()),
    }));

    // FormDataにカスタム例を追加
    formData.set('customExamples', JSON.stringify(cleanedExamples));

    try {
      const result = drink
        ? await updateDrink(drink.id, formData)
        : await createDrink(formData);

      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        if (!drink) {
          // 新規作成の場合はフォームをリセット
          const form = document.getElementById('drink-form') as HTMLFormElement;
          form?.reset();
          setCustomExamples([
            {
              name: '',
              description: '',
              items: [''],
            },
          ]);
        }
        if (onCancel) {
          setTimeout(() => {
            onCancel();
          }, 1000);
        }
      }
    } catch (err) {
      setError('エラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form id="drink-form" action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
          {drink ? '更新しました！' : '追加しました！'}
        </div>
      )}

      {/* 基本情報 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            required
            defaultValue={drink?.category || ''}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-starbucks-green focus:border-transparent outline-none"
          >
            <option value="">選択してください</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ドリンク名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={drink?.name || ''}
            placeholder="例: キャラメルマキアート"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-starbucks-green focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            画像URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="imageUrl"
            required
            defaultValue={drink?.imageUrl || ''}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-starbucks-green focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* カスタム例 */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            カスタム例 <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={addCustomExample}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            + カスタム例を追加
          </button>
        </div>

        <div className="space-y-6">
          {customExamples.map((example, exampleIndex) => (
            <div
              key={exampleIndex}
              className="border-2 border-gray-200 rounded-2xl p-5 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">
                  カスタム例 #{exampleIndex + 1}
                </h3>
                {customExamples.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCustomExample(exampleIndex)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    削除
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    カスタム名
                  </label>
                  <input
                    type="text"
                    value={example.name}
                    onChange={(e) =>
                      updateExampleName(exampleIndex, e.target.value)
                    }
                    placeholder="例: ヘルシーカスタム"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-green focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    説明・特徴
                  </label>
                  <input
                    type="text"
                    value={example.description}
                    onChange={(e) =>
                      updateExampleDescription(exampleIndex, e.target.value)
                    }
                    placeholder="例: 健康志向の方におすすめ"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-green focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-medium text-gray-600">
                      カスタマイズ項目
                    </label>
                    <button
                      type="button"
                      onClick={() => addItem(exampleIndex)}
                      className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                    >
                      + 項目追加
                    </button>
                  </div>
                  <div className="space-y-2">
                    {example.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            updateItem(exampleIndex, itemIndex, e.target.value)
                          }
                          placeholder="例: ソイミルク変更"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-starbucks-green focus:border-transparent outline-none text-sm"
                        />
                        {example.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(exampleIndex, itemIndex)}
                            className="px-3 py-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-starbucks-green text-white font-bold py-4 rounded-xl hover:bg-starbucks-light-green transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '処理中...' : drink ? '更新する' : '追加する'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
