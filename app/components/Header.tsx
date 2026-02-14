// ページ上部に表示されるヘッダー
// 役割：アプリのタイトルと記録日数・総重量を表示

type Props = {
    recordDays: number; // 親から受け取る記録日数
    totalWeight: number; // 親から受け取る総重量
};

export default function Header({ recordDays, totalWeight }: Props) {
    return (
        <header className="bg-blue-600 text-white py-8 mb-8">
            {/* タイトル部分 */}
            <div className="flex items-baseline max-w-2xl mx-auto px-4 space-x-2">
                <h1 className="text-5xl font-bold">Muscle Log</h1>
                <div className="text-2xl font-bold">～筋トレ記録アプリ～</div>
            </div>

            {/* 下の記録部分 */}
            <div className="mt-4 text-4xl max-w-2xl mx-auto px-4">
                <div>記録日数: <span>{recordDays}日</span></div>
                <div>総重量: <span>{totalWeight}kg</span></div>
            </div>
        </header>
    );
}
