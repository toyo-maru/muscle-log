// ページ上部に表示されるヘッダー
// 役割：アプリのタイトルと記録日数・総重量を表示

type Props = {
  recordDays: number; // 親から受け取る記録日数
  totalWeight: number; // 親から受け取る総重量
};

export default function Header({ recordDays, totalWeight }: Props) {
  return (
    <header className="bg-blue-600 text-white py-4 mb-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Muscle Log</h1>
        <p className="text-xl font-bold mb-2-white"> ～筋トレ記録アプリ～</p>
        <div className="mt-4 text-m text-white">
          記録日数: <span>{recordDays}日</span>
          <br />
          総重量: <span>{totalWeight}kg</span>
        </div>
      </div>
    </header>
  );
}
