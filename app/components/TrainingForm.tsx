"use client";

// トレーニング記録を入力するフォームコンポーネント

// インポート
import { useState } from "react";
import type { SetRecord, TrainingRecord } from "../types";

export default function TrainingForm() {
    // 種目名を保持
    const [trainingName, setTrainingName] = useState("");

    // セット一覧を保持
    const [sets, setSets] = useState<SetRecord[]>([]);

    // セットを追加する関数
    const addSet = () => {
        const newSet: SetRecord = {
            setNo: sets.length + 1, // 現在のセット数 + 1
            weight: 0,
            reps: 0,
        };
        setSets([...sets, newSet]); // 既存セットに新セットを追加
    };

    // セットを削除する関数
    const deleteSet = (index: number) => {
        const updated = sets.filter((_, i) => i !== index); // 指定位置のセットを削除
        setSets(updated); // stateを更新
    };

    // セットの重量を変更する関数
    const updateWeight = (index: number, weight: number) => {
        const updated = [...sets]; // 既存配列をコピー
        updated[index].weight = weight; // 指定位置の重量を変更
        setSets(updated); // stateを更新
    };

    // セットの回数を変更する関数
    const updateReps = (index: number, reps: number) => {
        const updated = [...sets];
        updated[index].reps = reps;
        setSets(updated);
    };

    return (
        <div>
            <h2>トレーニング記録フォーム</h2>

            {/* 種目名を入力するテキストボックス
      　入力値はtrainingNameに保存され、変更があるたびにsetTrainingNameで更新される*/}
            <div>
                <label>種目名:</label>
                <input
                    type="text"
                    value={trainingName}
                    onChange={(e) => setTrainingName(e.target.value)}
                    placeholder="例: ベンチプレス"
                />
            </div>

            <div>
                {/* セット追加ボタン */}
                <button onClick={addSet}>セット追加</button>

                {/* セット削除ボタン */}
                <button onClick={() => deleteSet(sets.length - 1)}>セット削除</button>
            </div>

            {/* セット一覧 */}
            {/* map関数でsetsをループして各セットを表示 */}
            {sets.map((set, index) => (
                <div key={index}>
                    <span>セット{set.setNo}</span>
                    <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => updateWeight(index, Number(e.target.value))}
                    />
                    kg x
                    <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateReps(index, Number(e.target.value))}
                    />
                    回
                </div>
            ))}

            {/* TODO 保存ボタン */}

        </div>
    );
}
