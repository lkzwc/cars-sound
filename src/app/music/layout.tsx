import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '车载音乐下载 - 抖音热门歌曲免费下载 | CarSound',
  description: '车载音乐免费下载，收录抖音热门歌曲、经典老歌、流行歌曲、DJ舞曲等海量车载音乐。无损音质，持续更新，夸克网盘高速下载。另有车载音乐U盘京东自营购买。',
  keywords: [
    '抖音热门歌曲',
    '车载歌曲下载',
    '车载音乐下载',
    '车载MP3下载',
    '热门歌曲下载',
    '无损音乐下载',
    'DJ车载音乐',
    '经典老歌下载',
    '流行歌曲下载',
    '车载U盘音乐',
    '免费歌曲下载',
  ],
  openGraph: {
    title: '车载音乐下载 - 抖音热门歌曲免费下载 | CarSound',
    description: '车载音乐免费下载，抖音热门歌曲、经典老歌、流行歌曲，无损音质持续更新',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: 'https://carsound.top/music',
  },
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
