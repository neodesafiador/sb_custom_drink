export default function DisabledPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-3">
          現在ご利用いただけません
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed">
          ただいまシステム調整中のため、
          本サービスは一時的にご利用いただけません。
          <br />
          ご不便をおかけしますが、しばらくお待ちください。
        </p>

        <p className="text-xs text-gray-400 mt-4">
          ※ 店舗スタッフまでお声がけください
        </p>
      </div>
    </main>
  );
}
