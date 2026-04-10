'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import UploadZone from '@/components/UploadZone';

interface AudioFile {
  key: string;
  name: string;
  category: string;
  size: number;
  lastModified: string;
  url: string;
}

interface Category {
  name: string;
  count: number;
}

const ITEMS_PER_PAGE = 30;

export default function Home() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/audio-list');
      const data = await response.json();
      setFiles(data.files || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 按分类分组
  const groupedFiles = filteredFiles.reduce((acc, file) => {
    const category = file.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(file);
    return acc;
  }, {} as Record<string, AudioFile[]>);

  // 获取要显示的文件（懒加载）
  const filesToShow = filteredFiles.slice(0, displayCount);
  const hasMore = displayCount < filteredFiles.length;

  // 无限滚动
  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount(prev => prev + ITEMS_PER_PAGE);
    }
  }, [hasMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    }, options);

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadMore]);

  // 重置分页当筛选条件改变
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  // 重新分组显示的文件
  const displayedGroupedFiles = filesToShow.reduce((acc, file) => {
    const category = file.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(file);
    return acc;
  }, {} as Record<string, AudioFile[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* 汽车元素背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 道路线条 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500/20 via-yellow-500/10 to-transparent" />
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-500/10 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-purple-500/10 rounded-full" />
        {/* 速度线 */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 方向盘图标 */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 relative">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
                </svg>
                {/* 光晕效果 */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Cars Sound
                </h1>
                <p className="text-sm text-slate-400">车机声音合集</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200 text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              上传音频
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Upload Zone */}
        {showUpload && (
          <UploadZone onUploadSuccess={fetchFiles} />
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="搜索音频..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder-slate-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
            }`}
          >
            全部 ({files.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.name
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            共 {files.length} 个音频
          </span>
          {searchQuery && <span>· 搜索到 {filteredFiles.length} 个结果</span>}
          {selectedCategory && <span>· 分类: {selectedCategory}</span>}
        </div>

        {/* Audio List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            {/* 加载动画 - 轮胎样式 */}
            <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-400">加载中...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            {searchQuery ? '没有找到匹配的音频' : '暂无音频文件，点击上方按钮上传'}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(displayedGroupedFiles).map(([category, categoryFiles]) => (
              <div key={category}>
                <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                  {category}
                  <span className="text-sm font-normal text-slate-500">({categoryFiles.length})</span>
                </h2>
                {/* Flex 布局，多列卡片 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryFiles.map((file) => (
                    <AudioPlayer
                      key={file.key}
                      src={file.url}
                      title={file.name.replace(/\.(mp3|wav|ogg|m4a)$/i, '')}
                    />
                  ))}
                </div>
              </div>
            ))}
            
            {/* 加载更多触发器 */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span>加载更多...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-slate-500 border-t border-slate-800 mt-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Cars Sound</span>
        </div>
        <p>音频来源于网络，仅供娱乐</p>
      </footer>
    </div>
  );
}
