// LocalStorageへのデータ保存・読み込みを行う

import type { TrainingLog } from "../types";

// LocalStorageのキー名（保存場所の名前）
const STORAGE_KEY = "muscle-log";

// データを読み込む関数
export function loadData(): TrainingLog {
  try {
    // ブラウザのLocalStorageから文字列を取得
    const saved = localStorage.getItem(STORAGE_KEY);
    
    // データがない場合は空の初期値を返す
    if (!saved) {
      return { days: [] };
    }
    
    // JSON文字列をオブジェクトに変換して返す
    return JSON.parse(saved) as TrainingLog;
  } catch (error) {
    // エラーが起きた場合（データ破損など）は空データを返す
    console.error("データ読み込みエラー:", error);
    return { days: [] };
  }
}

// データを保存する関数
export function saveData(data: TrainingLog): void {
  try {
    // オブジェクトをJSON文字列に変換
    const json = JSON.stringify(data);
    
    // LocalStorageに保存
    localStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    // エラーが起きた場合（容量オーバーなど）はログ出力
    console.error("データ保存エラー:", error);
  }
}
