"use client";

// 1日分のトレーニング記録を入力するフォームコンポーネント

// インポート
import { useState } from "react";
import type { DailyRecord, SetRecord, TrainingRecord } from "../types";

// このコンポーネントが受け取るpropsの型定義
type Props = {
    onSave: (dailyRecord: DailyRecord) => void; // 1日分のデータを保存時に親に渡す関数
};

export default function TrainingForm({ onSave }: Props) {
    // 本日入力した複数種目を保持
    const [todayTrainings, setTodayTrainings] = useState<TrainingRecord[]>([]);

    // 新規種目を本日のトレーニングに追加する関数
    const addTraining = () => {
        // 空のTrainingRecordを追加
        const emptyTraining: TrainingRecord = {
            trainingName: "",
            sets: [],
            totalVolume: 0,
        };
        setTodayTrainings([...todayTrainings, emptyTraining]);
    };

    // 本日のトレーニング内の種目名を更新する関数
    const updateTrainingName = (trainingIndex: number, name: string) => {
        const updated = [...todayTrainings];
        updated[trainingIndex].trainingName = name;
        setTodayTrainings(updated);
    };

    // 本日のトレーニングから種目を削除する関数
    const deleteTraining = (index: number) => {
        const updated = todayTrainings.filter((_, i) => i !== index);
        setTodayTrainings(updated);
    };
    // セットを追加する関数
    const addSet = (trainingIndex: number) => {
        const updated = [...todayTrainings];
        const newSet: SetRecord = {
            setNo: updated[trainingIndex].sets.length + 1,
            weight: 0,
            reps: 0,
        };
        updated[trainingIndex].sets = [...updated[trainingIndex].sets, newSet];
        // totalVolumeを再計算
        updated[trainingIndex].totalVolume = updated[trainingIndex].sets.reduce(
            (total, set) => total + set.weight * set.reps,
            0
        );
        setTodayTrainings(updated);
    };
    // セットを削除する関数
    const deleteSet = (trainingIndex: number, setIndex: number) => {
        const updated = [...todayTrainings];
        updated[trainingIndex].sets = updated[trainingIndex].sets.filter((_, i) => i !== setIndex);
        // totalVolumeを再計算
        updated[trainingIndex].totalVolume = updated[trainingIndex].sets.reduce(
            (total, set) => total + set.weight * set.reps,
            0
        );
        setTodayTrainings(updated);
    };

    // セット情報を更新する関数
    const updateSet = (trainingIndex: number, setIndex: number, weight: number, reps: number) => {
        const updated = [...todayTrainings];
        updated[trainingIndex].sets[setIndex].weight = weight;
        updated[trainingIndex].sets[setIndex].reps = reps;
        // totalVolumeを再計算
        updated[trainingIndex].totalVolume = updated[trainingIndex].sets.reduce(
            (total, set) => total + set.weight * set.reps,
            0
        );
        setTodayTrainings(updated);
    };



    // ========== 保存に関する関数 ==========
    // 1日分のトレーニングを保存する関数
    const saveDailyTraining = () => {
        // トレーニングが1つもない場合は警告を出して保存しない
        if (todayTrainings.length === 0) {
            alert("最低1種目追加してください");
            return;
        }

        // 本日の日付を YYYY-MM-DD 形式で取得
        const today = new Date();
        const dateString = today.toISOString().split("T")[0];

        // DailyRecord型のデータを作成
        const dailyRecord: DailyRecord = {
            date: dateString,
            trainings: todayTrainings,
        };

        // 親に渡して保存
        onSave(dailyRecord);

        // フォームをリセット
        setTodayTrainings([]);
    };

    return (
        <div>
            <h2>トレーニング記録フォーム</h2>
            {todayTrainings.length === 0 ? (
                <p>まだ種目が追加されていません</p>
            ) : (
                <div>
                    {todayTrainings.map((training, trainingIndex) => (
                        <div key={trainingIndex}>
                            <div className="flex items-center gap-2 mt-4 mb-2">
                                <span> {trainingIndex + 1}種目目： </span>
                                <input
                                    type="text"
                                    value={training.trainingName}
                                    onChange={(e) => updateTrainingName(trainingIndex, e.target.value)}
                                />
                                <button
                                    onClick={() => deleteTraining(trainingIndex)}
                                    className="px-3 py-1 bg-red-600 hover:opacity-80 text-white text-sm rounded transition"
                                >
                                    種目削除
                                </button>
                            </div>
                            <div className="flex gap-2 mt-2 mb-2">
                                <button
                                    onClick={() => addSet(trainingIndex)}
                                    className="px-3 py-1 bg-blue-700 hover:opacity-80 text-white text-sm rounded transition"
                                >
                                    セット追加
                                </button>
                                {training.sets.length > 0 && (
                                    <button
                                        onClick={() => deleteSet(trainingIndex, training.sets.length - 1)}
                                        className="px-3 py-1 bg-red-600 hover:opacity-80 text-white text-sm rounded transition"
                                    >
                                        セット削除
                                    </button>
                                )}
                            </div>
                            {training.sets.map((set, setIndex) => (
                                <div key={setIndex} className="flex gap-2 mt-2 mb-2">
                                    <span>セット{set.setNo}:</span>
                                    <input
                                        type="number"
                                        value={set.weight}
                                        onChange={(e) => updateSet(trainingIndex, setIndex, Number(e.target.value), set.reps)}
                                    />
                                    <span>kg ×</span>
                                    <input
                                        type="number"
                                        value={set.reps}
                                        onChange={(e) => updateSet(trainingIndex, setIndex, set.weight, Number(e.target.value))}
                                    />
                                    <span>回</span>
                                    <button
                                        onClick={() => deleteSet(trainingIndex, setIndex)}
                                        className="px-3 py-1 bg-red-600 hover:opacity-80 text-white text-xs rounded transition"
                                    >
                                        削除
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            <div className="flex gap-4 mt-6">
                <button
                    onClick={addTraining}
                    className="px-4 py-2 bg-blue-700 hover:opacity-80 text-white text-sm rounded transition"
                >
                    + 新しい種目を追加
                </button>

                <button
                    onClick={saveDailyTraining}
                    className="px-6 py-3 bg-green-600 hover:opacity-80 text-white text-sm rounded transition"
                >
                    本日のトレーニングを保存
                </button>
            </div>
        </div>
    );
}
