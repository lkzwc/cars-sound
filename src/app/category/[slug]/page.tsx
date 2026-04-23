'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';

interface AudioFile {
  key: string;
  name: string;
  category: string;
  size: number;
  lastModified: string;
  url: string;
}

interface Category {
  slug: string;
  name: string;
  displayName: string;
  count: number;
}

const ITEMS_PER_PAGE = 20;

// 骨架屏
function SkeletonCard() {
  return (
    <div className="p-3 bg-slate-800/40 backdrop-blur border border-pink-500/20 rounded-xl animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-slate-700/50 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-slate-700/50 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-slate-700/50 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-1.5 bg-slate-700/50 rounded-full"></div>
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPage(1);
      try {
        const response = await fetch('/api/audio-list');
        const data = await response.json();
        const allFiles = data.files || [];
        const allCategories = data.categories || [];
        
        setFiles(allFiles);
        setCategories(allCategories);
        
        // 找到当前分类
        const currentCat = allCategories.find((c: Category) => c.slug === slug);
        if (currentCat) {
          setDisplayName(currentCat.displayName);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchData();
    }
  }, [slug]);

  // 找到当前分类名
  const currentCategory = categories.find(c => c.slug === slug);
  const categoryName = currentCategory?.name || '';
  
  // 筛选当前分类的音效
  const categoryFiles = files.filter(f => f.category === categoryName);
  
  // 分页
  const totalPages = Math.ceil(categoryFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = categoryFiles.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  if (!loading && !currentCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl text-white mb-4">分类不存在</h1>
          <a href="/" className="text-pink-400 hover:text-pink-300">返回首页</a>
        </div>
      </div>
    );
  }

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

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* 分类标题 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            分类音效
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {displayName || '加载中...'}
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            共 {categoryFiles.length} 个音效，适用于特斯拉、理想、蔚来、小鹏等车型
          </p>
        </div>

        {/* 其他分类导航 */}
        {!loading && categories.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories
              .filter(c => c.slug !== slug)
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
        )}

        {/* 音效列表 */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedFiles.map((file, index) => (
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

            {/* 加载更多 */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 bg-slate-800/60 backdrop-blur border border-pink-500/20 text-slate-300 hover:bg-slate-700/60 hover:border-pink-500/40 rounded-xl font-medium transition-all duration-300"
                >
                  加载更多 ({categoryFiles.length - page * ITEMS_PER_PAGE} 个剩余)
                </button>
              </div>
            )}
          </>
        )}

        {/* 空状态 */}
        {!loading && categoryFiles.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-slate-400 text-lg">该分类暂无音效</p>
            <a href="/" className="inline-block mt-4 text-pink-400 hover:text-pink-300">返回首页</a>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-pink-500/20 mt-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden">
              <img src="/logo.png" alt="CarSound" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white">CarSound</span>
          </a>
        </div>
        <p className="text-slate-500 text-sm">音频来源于网络，仅供娱乐</p>
        <p className="text-slate-600 text-xs mt-2">© 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}