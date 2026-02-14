// 型定義をまとめるファイル
// 役割：型定義を一箇所にまとめて管理しやすくする
// index.tsは最初に読み込まれるため、ここに型定義をまとめることで、他のファイルからインポートしやすくなる

// セットごとの記録
export type SetRecord = {
  setNo: number; // セット番号
  weight: number; // 重量
  reps: number; // 回数
};

// 種目ごとの記録
export type TrainingRecord = {
  trainingName: string; // 種目名
  sets: SetRecord[]; // 各セットの記録
  totalVolume: number; // 総重量
};

// 日ごとの記録
export type DailyRecord = {
  date: string; // YYYY-MM-DD
  trainings: TrainingRecord[]; // 種目ごとの記録一覧
};

// 週ごとの記録
export type WeeklyRecord = {
  weekStart: string; // 週の開始日 YYYY-MM-DD
  dailyRecords: DailyRecord[]; // 日ごとの記録一覧
};

// 月ごとの記録
export type MonthlyRecord = {
  month: string; // YYYY-MM
  weeklyRecords: WeeklyRecord[]; // 週ごとの記録一覧
};

// 全体データ
export type TrainingLog = {
  days: DailyRecord[]; // 日ごとの記録一覧
};
