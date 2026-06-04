'use client';

import { useState, useEffect, useCallback } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import CyberBackground from '@/components/CyberBackground';
import JsonLd from '@/components/JsonLd';
import { setCachedCategories } from '@/lib/cache';

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

// 分类Tab骨架屏
function SkeletonTabs() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-shrink-0 h-10 w-24 bg-[#1a1a30]/80 rounded-full animate-pulse" />
      ))}
    </div>
  );
}

// 音频列表骨架屏
function SkeletonList() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-[#1a1a30]/60 rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [page, setPage] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);

  // 首次加载：获取全部分类
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await fetch('/api/audio-list');
        const data = await resp.json();
        const cats: Category[] = (data.categories || []).sort((a: Category, b: Category) => {
          if (a.name === '其他') return 1;
          if (b.name === '其他') return -1;
          return b.count - a.count;
        });
        setCategories(cats);
        setTotalFiles((data.files || []).length);
        // 缓存分类
        if (cats.length) {
          setCachedCategories(cats.map((c: Category) => ({
            slug: c.slug,
            name: c.name,
            displayName: c.displayName,
            count: c.count,
          })));
        }
        // 默认选中第一个分类
        if (cats.length > 0) {
          setActiveSlug(cats[0].slug);
        }
      } catch (err) {
        console.error('获取分类失败:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 切换分类时拉取该分类的音频文件
  useEffect(() => {
    if (!activeSlug) return;
    const cat = categories.find(c => c.slug === activeSlug);
    if (!cat) return;

    setPage(1);
    setFiles([]);
    setLoadingFiles(true);

    const fetchFiles = async () => {
      try {
        const resp = await fetch(`/api/audio-list?category=${encodeURIComponent(cat.name)}`);
        const data = await resp.json();
        setFiles(data.files || []);
      } catch (err) {
        console.error('获取文件失败:', err);
      } finally {
        setLoadingFiles(false);
      }
    };
    fetchFiles();
  }, [activeSlug, categories]);

  const activeCategory = categories.find(c => c.slug === activeSlug);
  const paginatedFiles = files.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedFiles.length < files.length;

  const loadMore = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#13132b] to-[#0f0f1a] relative">
        <CyberBackground />

        <main className="max-w-5xl mx-auto px-4 py-6 relative z-10">
          {/* 头部 */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CarSound
              </span>
            </h1>
            <p className="text-slate-400 text-sm">
              {totalFiles} 个音效 · {categories.length} 个分类
            </p>
          </div>

          {/* 分类Tab栏 */}
          <div className="mb-6">
            {loading ? (
              <SkeletonTabs />
            ) : (
              <div
                className="flex flex-wrap gap-2"
              >
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    data-slug={cat.slug}
                    onClick={() => setActiveSlug(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeSlug === cat.slug
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]'
                        : 'bg-[#1a1a30]/80 text-slate-300 hover:text-white hover:bg-[#1e1e38]/90 border border-slate-700/40'
                    }`}
                  >
                    {cat.displayName}
                    <span className={`ml-1.5 text-xs ${activeSlug === cat.slug ? 'text-white/70' : 'text-slate-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 音频列表 */}
          <div>
            {loadingFiles ? (
              <SkeletonList />
            ) : activeCategory && paginatedFiles.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">
                    {activeCategory.displayName}
                    <span className="text-sm text-slate-400 font-normal ml-2">
                      共 {files.length} 个
                    </span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {paginatedFiles.map(file => (
                    <AudioPlayer
                      key={file.key}
                      src={file.url}
                      title={file.name}
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={loadMore}
                      className="px-8 py-2.5 bg-[#1a1a30]/90 text-slate-300 rounded-full border border-pink-500/30 hover:border-cyan-400/50 hover:text-white hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-300 text-sm"
                    >
                      加载更多 ({files.length - paginatedFiles.length} 个)
                    </button>
                  </div>
                )}
              </>
            ) : activeCategory && !loadingFiles ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🎵</div>
                <p className="text-slate-400">该分类暂无音效</p>
              </div>
            ) : null}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center py-8 border-t border-pink-500/20 mt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden">
              <img src="/logo.png" alt="CarSound" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-bold text-white">CarSound</span>
          </div>
          <p className="text-slate-400 text-sm">音频来源于网络，仅供娱乐</p>
          <p className="text-slate-500 text-xs mt-1">&copy; 2026 CarSound. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
