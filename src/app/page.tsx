'use client';

import { useState, useEffect, useRef } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import UploadZone from '@/components/UploadZone';
import JsonLd from '@/components/JsonLd';

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

export default function Home() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/audio-list');
      const data = await response.json();
      setFiles(data.files || []);
      const cats = data.categories || [];
      setCategories(cats);
      // 默认选中第一个分类
      if (cats.length > 0 && !selectedCategory) {
        setSelectedCategory(cats[0].name);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // 按分类分组
  const groupedFiles = files.reduce((acc, file) => {
    const category = file.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(file);
    return acc;
  }, {} as Record<string, AudioFile[]>);

  // 获取当前分类的文件
  const currentCategoryFiles = selectedCategory 
    ? (groupedFiles[selectedCategory] || []).filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* 汽车元素背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500/20 via-yellow-500/10 to-transparent" />
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-500/10 rounded-full" />
          <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-purple-500/10 rounded-full" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        {/* Header */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 relative">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
                  </svg>
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
                placeholder="搜索当前分类..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Category Navigation */}
          {!loading && categories.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat.name
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50 hover:border-blue-500/50'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              {selectedCategory ? `${selectedCategory}: ${currentCategoryFiles.length} 个音频` : `共 ${files.length} 个音频 · ${categories.length} 个分类`}
            </span>
          </div>

          {/* Audio List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mb-4" />
              <p className="text-slate-400">加载中...</p>
            </div>
          ) : !selectedCategory ? (
            <div className="text-center py-20 text-slate-400">
              请选择一个分类查看音频
            </div>
          ) : currentCategoryFiles.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              {searchQuery ? '没有找到匹配的音频' : '该分类暂无音频'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentCategoryFiles.map((file) => (
                <AudioPlayer
                  key={file.key}
                  src={file.url}
                  title={file.name.replace(/\.(mp3|wav|ogg|m4a)$/i, '')}
                />
              ))}
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
    </>
  );
}
