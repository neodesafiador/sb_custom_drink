'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

type QRCodeDisplayProps = {
  url: string;
};

export default function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      url,
      {
        width: 300,
        margin: 2,
        color: {
          dark: '#00704A', // スターバックスグリーン
          light: '#FFFFFF',
        },
      },
      (err) => {
        if (err) {
          setError('QRコードの生成に失敗しました');
          console.error(err);
        }
      }
    );
  }, [url]);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="rounded-2xl shadow-lg"
      />
      <p className="mt-4 text-sm text-gray-600 text-center">
        長押しして画像を保存できます
      </p>
    </div>
  );
}
