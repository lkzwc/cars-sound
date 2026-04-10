import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cars Sound - 车机魔改音效下载 | 特斯拉锁车音效 | 公主请上车",
  description: "车机魔改音效下载平台，提供特斯拉锁车音效、公主请上车、搞笑段子等车机自定义音效。支持特斯拉、理想、蔚来、小鹏等品牌，一键下载安装教程。",
  keywords: [
    "特斯拉锁车音效",
    "公主请上车音效",
    "车机魔改音效",
    "特斯拉车机音效",
    "车机自定义音效",
    "特斯拉Model 3锁车音效",
    "车机音效下载",
    "搞笑锁车音效",
    "迎宾音效",
    "解锁音效"
  ],
  openGraph: {
    title: "Cars Sound - 车机魔改音效下载",
    description: "车机魔改音效下载平台，特斯拉锁车音效、公主请上车等热门音效一键下载",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://carssound.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
