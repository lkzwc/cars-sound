'use client';

import { useState, useEffect } from 'react';
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

  const groupedFiles = files.reduce((acc, file) => {
    const category = file.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(file);
    return acc;
  }, {} as Record<string, AudioFile[]>);

  const currentCategoryFiles = selectedCategory 
    ? (groupedFiles[selectedCategory] || []).filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
        {/* 动态背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* 渐变光晕 */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
          
          {/* 道路纹理 */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 50px,
                rgba(255,255,255,0.03) 50px,
                rgba(255,255,255,0.03) 51px
              )`
            }} />
          </div>
          
          {/* 速度线条 */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
          
          {/* 装饰圆环 */}
          <div className="absolute top-20 right-20 w-64 h-64 border border-blue-500/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-20 left-20 w-80 h-80 border border-purple-500/10 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          
          {/* 网格背景 */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Header */}
        <header className="bg-gray-900/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="relative group">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 transform group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                    Cars Sound
                  </h1>
                  <p className="text-sm text-slate-400 font-medium">车机魔改音效平台</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="relative z-10">上传音效</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          {/* Upload Zone */}
          {showUpload && (
            <div className="mb-8 animate-fadeIn">
              <UploadZone onUploadSuccess={fetchFiles} />
            </div>
          )}

          {/* Hero Section */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                发现你的车机声音
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              精选 {files.length} 个车机音效，涵盖 {categories.length} 个分类，让你的爱车独一无二
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="搜索音效..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-800/80 backdrop-blur border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-slate-500 text-lg shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          {!loading && categories.length > 0 && (
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {(() => {
                // 将"其他"分类放到最后
                const sortedCategories = [...categories].sort((a, b) => {
                  if (a.name === '其他') return 1;
                  if (b.name === '其他') return -1;
                  return 0;
                });
                return sortedCategories.map((cat, index) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSearchQuery('');
                    }}
                    className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === cat.name
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-800/60 backdrop-blur text-slate-300 hover:bg-slate-700/60 border border-white/5 hover:border-cyan-500/30'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative z-10">{cat.name}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.name
                        ? 'bg-white/20'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ));
              })()}
            </div>
          )}

          {/* Stats Bar */}
          {selectedCategory && (
            <div className="mb-6 flex items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span>{selectedCategory}</span>
              </div>
              <span>·</span>
              <span>{currentCategoryFiles.length} 个音效</span>
            </div>
          )}

          {/* Audio List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
              <p className="text-slate-400 mt-6 text-lg">加载中...</p>
            </div>
          ) : !selectedCategory ? (
            <div className="text-center py-32">
              <div className="text-6xl mb-4">🎵</div>
              <p className="text-slate-400 text-lg">请选择一个分类查看音效</p>
            </div>
          ) : currentCategoryFiles.length === 0 ? (
            <div className="text-center py-32">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-slate-400 text-lg">
                {searchQuery ? '没有找到匹配的音效' : '该分类暂无音效'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentCategoryFiles.map((file, index) => (
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
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center py-12 border-t border-white/5 mt-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Cars Sound
            </span>
          </div>
          <p className="text-slate-500 text-sm">音频来源于网络，仅供娱乐</p>
          <p className="text-slate-600 text-xs mt-2">© 2026 Cars Sound. All rights reserved.</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
