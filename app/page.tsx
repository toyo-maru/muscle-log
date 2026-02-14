// ルートにアクセスしたときに表示される内容を定義する
// 役割：アプリのトップページを構成するコンポーネント

// このファイルはブラウザ側で動かすという意味の宣言。これがないとNext.jsはサーバー側で動かすコードと勘違いしてしまう
"use client";

// インポート
import { useEffect, useState } from "react";
import type { SetRecord, TrainingLog, TrainingRecord } from "./types";
import { loadData } from "./util/storage";
import TrainingForm from "./components/TrainingForm";

// データの初期化
// 1セットの記録の初期値
const emptySetRecord: SetRecord = {
  setNo: 0,
  weight: 0,
  reps: 0,
};

// 種目の記録の初期値
const emptyTrainingRecord: TrainingRecord = {
  trainingName: "",
  sets: [],
  totalVolume: 0,
};

// このページの本体
export default function Home() {
  // LocalStorageから読み込んだデータを保持
  const [log, setLog] = useState<TrainingLog>({ days: [] });

  useEffect(() => {
    // 初回表示時だけLocalStorageから読み込む
    const data = loadData();
    setLog(data);
  }, []);

  return (
    <div>
      <h1>筋トレ記録アプリ</h1>
      <p>記録日数: {log.days.length}日</p>
      <TrainingForm />
    </div>
  );
}
