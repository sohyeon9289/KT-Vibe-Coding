import type { Metadata } from "next";
import { Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "핀포커스 라이트 | 투자 정보 플랫폼",
  description: "투자 상품의 수익률과 위험도 정보를 신뢰성 있게 제공하여 개인 투자자의 올바른 판단을 돕습니다.",
  keywords: ["투자", "금융", "예금", "펀드", "ETF", "채권", "수익률", "위험도"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
