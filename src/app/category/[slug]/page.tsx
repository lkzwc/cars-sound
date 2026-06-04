'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import CyberBackground from '@/components/CyberBackground';
import { SLUG_TO_CATEGORY, CATEGORIES } from '@/lib/r2';
import { getCachedCategories } from '@/lib/cache';

interface AudioFile {
  key: string;
  name: string;
  category: string;
  size: number;
  lastModified: string;
  url: string;
}

const ITEMS_PER_PAGE = 20;

// 多策略解析 slug → 分类名，确保无论 R2 文件夹是什么名都能匹配
function resolveCategoryBySlug(slug: string): { name: string; displayName: string } | null {
  // 1. 在 CATEGORIES 配置中按 slug 查找
  const config = CATEGORIES.find(c => c.slug === slug);
  if (config) return { name: config.name, displayName: config.displayName };

  // 2. English slug → Chinese name (如 princess → 公主请上车)
  const chineseName = SLUG_TO_CATEGORY[slug];
  if (chineseName) {
    const displayName = CATEGORIES.find(c => c.name === chineseName)?.displayName || chineseName;
    return { name: chineseName, displayName };
  }

  // 3. slug 可能就是中文分类名（如 游戏音效 → 游戏音效）
  const byName = CATEGORIES.find(c => c.name === slug);
  if (byName) return { name: byName.name, displayName: byName.displayName };

  // 4. 完全未知的 slug — 直接用 slug 作为分类名
  return { name: slug, displayName: slug };
}

// 骨架屏
function SkeletonCard() {
  return (
    <div className="p-3 bg-white/[0.02] backdrop-blur border border-white/5 rounded-xl animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-white/[0.05] rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-white/[0.05] rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-white/[0.05] rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-1.5 bg-slate-700/50 rounded-full"></div>
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // 多策略解析 slug → 分类名
  const resolved = useMemo(() => resolveCategoryBySlug(slug), [slug]);
  const categoryName = resolved?.name || '';
  const displayName = resolved?.displayName || slug;
  
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 从缓存读取全部分类（用于导航栏），不重新请求
  const allNavCategories = useMemo(() => {
    const cached = getCachedCategories();
    if (cached && cached.length > 0) {
      return cached;
    }
    // 缓存未命中时降级使用 CATEGORIES 配置
    return CATEGORIES.map(c => ({
      slug: c.slug,
      displayName: c.displayName,
      name: c.name,
      count: 0,
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPage(1);
      try {
        const response = await fetch(`/api/audio-list?category=${encodeURIComponent(categoryName)}`);
        const data = await response.json();
        setFiles(data.files || []);
        setTotalCount(data.total || 0);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (categoryName) {
      fetchData();
    }
  }, [categoryName]);
  
  const categoryFiles = files;
  
  // 分页
  const totalPages = Math.ceil(categoryFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = categoryFiles.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  if (!loading && !categoryName) {
    return (
      <div className="min-h-screen bg-[#08080d] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl text-white mb-4">分类不存在</h1>
          <a href="/" className="text-pink-400 hover:text-pink-300">返回首页</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080d] relative overflow-hidden flex flex-col">
      <CyberBackground />

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10 flex-1 w-full">
        {/* 分类标题 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            分类音效
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              {displayName || '加载中...'}
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            共 {totalCount} 个音效，适用于特斯拉、理想、蔚来、小鹏等车型
          </p>
        </div>

        {/* 其他分类导航 - 始终显示全部分类 */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {allNavCategories
            .filter(c => c.slug !== slug)
            .map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-4 py-2 bg-white/[0.03] backdrop-blur text-slate-300 hover:bg-white/[0.06] border border-white/5 hover:border-pink-500/30 rounded-xl font-medium transition-all duration-300 text-sm"
              >
                {cat.displayName}
              </a>
            ))}
        </div>

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
                  className="px-8 py-3 bg-white/[0.03] backdrop-blur border border-white/5 text-slate-300 hover:bg-white/[0.06] hover:border-pink-500/30 rounded-xl font-medium transition-all duration-300"
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
      <footer className="relative z-10 text-center py-12 border-t border-white/5 mt-12">
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
