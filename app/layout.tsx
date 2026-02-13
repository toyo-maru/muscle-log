// アプリ全体のレイアウトとメタデータを定義するファイル
// 役割：全ページ共通のレイアウトやメタデータを設定する

import type { Metadata } from "next";
import "./globals.css";

// ページ共通の設定（タイトルや説明）
export const metadata: Metadata = {
  title: "Muscle Log",
  description: "筋トレ記録アプリ",
};

// 全ページの外枠（HTML構造）
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
