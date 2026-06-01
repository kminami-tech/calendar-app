import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar App",
  description: "予定を管理するカレンダーアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
