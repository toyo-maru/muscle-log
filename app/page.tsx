// ルートごとに作成するファイル
// 役割：ルートにアクセスしたときに表示される内容を定義する

// インポート
import type { SetRecord, ExerciseRecord } from "./types";

// データの初期化
// 1セットの記録の初期値
const emptySetRecord: SetRecord = {
  setNo: 0,
  weight: 0,
  reps: 0,
};

// 種目の記録の初期値
const emptyExerciseRecord: ExerciseRecord = {
  exerciseName: "",
  sets: [],
  totalVolume: 0,
};

export default function Home() {
  return (
    <div>
      <h1>筋トレ記録アプリ</h1>
      <p>ここに筋トレの記録を表示します。</p>
    </div>
  );
}
