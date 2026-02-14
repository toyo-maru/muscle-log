// ルートにアクセスしたときに表示される内容を定義する
// 役割：アプリのトップページを構成するコンポーネント

// このファイルはブラウザ側で動かすという意味の宣言。これがないとNext.jsはサーバー側で動かすコードと勘違いしてしまう
"use client";

// インポート
import { useEffect, useState } from "react";
import type { DailyRecord, TrainingLog } from "./types";
import { loadData, saveData } from "./util/storage";
import TrainingForm from "./components/TrainingForm";

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

  return (
    <div>
      <h1>筋トレ記録アプリ</h1>
      <p>記録日数: {log.days.length}日</p>
      {/* TrainingFormで1日分のトレーニングを管理・保存 */}
      <TrainingForm onSave={dailyTrainingSave} />
    </div>
  );
}
