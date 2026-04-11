import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { listAudioFiles, getCategories, AudioFile, SLUG_TO_CATEGORY, CATEGORY_DISPLAY_NAMES } from '@/lib/r2';
import { CATEGORY_TITLES, CATEGORY_DESCRIPTIONS } from '@/config/categories';
import AudioPlayer from '@/components/AudioPlayer';

// 静态生成所有分类页面
export async function generateStaticParams() {
  const files = await listAudioFiles();
  const categories = getCategories(files);
  
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

// 动态生成metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = SLUG_TO_CATEGORY[slug];
  const displayName = CATEGORY_DISPLAY_NAMES[slug] || slug;
  
  if (!categoryName) {
    return {
      title: '分类不存在 | Cars Sound',
    };
  }
  
  const title = CATEGORY_TITLES[slug] || `${displayName}下载 | Cars Sound`;
  const description = CATEGORY_DESCRIPTIONS[slug] || `${displayName}下载，精选车机音效，适用于特斯拉、理想、蔚来等车型。`;
  
  return {
    title,
    description,
    keywords: [
      displayName,
      categoryName,
      `${displayName}下载`,
      '特斯拉音效',
      '车机音效',
      '锁车音效',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const categoryName = SLUG_TO_CATEGORY[slug];
  const displayName = CATEGORY_DISPLAY_NAMES[slug] || slug;
  
  if (!categoryName) {
    notFound();
  }
  
  const files = await listAudioFiles();
  const categories = getCategories(files);
  
  // 筛选当前分类的音效
  const categoryFiles = files.filter(f => f.category === categoryName);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* 赛博朋克动态背景 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px]" />
        
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60 animate-pulse" />
        <div className="absolute top-2/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.6s' }} />
        
        <div className="absolute left-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-pink-500/40 to-transparent" />
        <div className="absolute left-2/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute left-3/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />
        
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
      </div>

      {/* Header */}
      <header className="bg-gray-900/60 backdrop-blur-xl border-b border-pink-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.4)] transform group-hover:scale-105 transition-transform duration-300">
                <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                  Cars Sound
                </h1>
                <p className="text-sm text-slate-400 font-medium">车机魔改音效平台</p>
              </div>
            </a>
            
            <a 
              href="/"
              className="px-5 py-2.5 bg-slate-800/60 backdrop-blur text-slate-300 hover:bg-slate-700/60 border border-pink-500/20 hover:border-pink-500/40 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首页
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* 分类标题 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            分类音效
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {displayName}
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            共 {categoryFiles.length} 个音效，适用于特斯拉、理想、蔚来、小鹏等车型
          </p>
        </div>

        {/* 其他分类导航 */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories
            .filter(c => c.name !== categoryName)
            .slice(0, 8)
            .map((cat) => (
              <a
                key={cat.name}
                href={`/category/${cat.slug}`}
                className="px-4 py-2 bg-slate-800/60 backdrop-blur text-slate-300 hover:bg-slate-700/60 border border-pink-500/20 hover:border-pink-500/40 rounded-xl font-medium transition-all duration-300 text-sm"
              >
                {cat.displayName}
                <span className="ml-2 text-xs text-slate-500">({cat.count})</span>
              </a>
            ))}
        </div>

        {/* 音效列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categoryFiles.map((file, index) => (
            <div
              key={file.key}
              className="transform hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <AudioPlayer
                src={file.url}
                title={file.name.replace(/\.(mp3|wav|ogg|m4a)$/i, '')}
              />
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {categoryFiles.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-slate-400 text-lg">该分类暂无音效</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-pink-500/20 mt-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Cars Sound
          </span>
        </div>
        <p className="text-slate-500 text-sm">音频来源于网络，仅供娱乐</p>
        <p className="text-slate-600 text-xs mt-2">© 2026 Cars Sound. All rights reserved.</p>
      </footer>
    </div>
  );
}
