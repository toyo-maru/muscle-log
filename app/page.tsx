// ルートにアクセスしたときに表示される内容を定義する
// 役割：アプリのトップページを構成するコンポーネント

// このファイルはブラウザ側で動かすという意味の宣言。これがないとNext.jsはサーバー側で動かすコードと勘違いしてしまう
"use client";

// インポート
import { useEffect, useState } from "react";
import type { DailyRecord, TrainingLog } from "./types";
import { loadData, saveData } from "./util/storage";
import TrainingForm from "./components/TrainingForm";
import Header from "./components/Header";

// このページの本体
export default function Home() {
  // LocalStorageから読み込んだデータを保持
  const [log, setLog] = useState<TrainingLog>({ days: [] });

  useEffect(() => {
    // 初回表示時だけLocalStorageから読み込む
    const data = loadData();
    setLog(data);
  }, []);

  // TrainingForm から 1日分のトレーニングを受け取って保存する関数
  const dailyTrainingSave = (dailyRecord: DailyRecord) => {
    // 新しい日付のレコードなので、daysに追加
    const updated: TrainingLog = {
      days: [...log.days, dailyRecord],
    };
    
    // LocalStorageに保存
    saveData(updated);

    // stateも更新（画面に反映させるため）
    setLog(updated);

    // 保存完了のメッセージを表示
    alert(`${dailyRecord.date} のトレーニングを保存しました！`);
  };

  // 全期間の総重量を計算する関数
  const calculateTotalWeight = (): number => {
    // 各日の総重量を計算
    return log.days.reduce((total, day) => {
      // 各日の中で、すべての種目のtotalVolumeを足し合わせる
      const dayTotal = day.trainings.reduce((daySum, training) => daySum + training.totalVolume, 0);
      // その日の合計を全体の合計に足す
      return total + dayTotal;
    }, 0); // 初期値：0
  };

  // 計算した総重量を取得
  const totalWeight = calculateTotalWeight();

  return (
    <div>
      <Header recordDays={log.days.length} totalWeight={totalWeight} />
      <div className="max-w-2xl mx-auto px-4">
        {/* TrainingFormで1日分のトレーニングを管理・保存 */}
        <TrainingForm onSave={dailyTrainingSave} />
      </div>
    </div>
  );
}
