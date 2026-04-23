'use client';

import { useState, useEffect } from 'react';
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
  slug: string;
  name: string;
  displayName: string;
  count: number;
}

// 分类卡片骨架屏
function SkeletonCategory() {
  return (
    <div className="p-6 bg-slate-800/40 backdrop-blur border border-pink-500/20 rounded-2xl animate-pulse">
      <div className="h-6 bg-slate-700/50 rounded w-1/2 mb-3"></div>
      <div className="h-4 bg-slate-700/50 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-slate-700/50 rounded"></div>
    </div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/audio-list');
        const data = await response.json();
        setCategories(data.categories || []);
        setTotalFiles((data.files || []).length);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
        {/* 赛博朋克动态背景 */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[150px]" />
          
          {/* 霓虹线条 */}
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60 animate-pulse" />
          <div className="absolute top-2/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.6s' }} />
          
          {/* 赛博朋克网格 */}
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
          {/* Upload Zone */}
          {showUpload && (
            <div className="mb-8 animate-fadeIn">
              <UploadZone onUploadSuccess={() => setShowUpload(false)} />
            </div>
          )}

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CarSound
              </span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-8">
              精选 {totalFiles} 个车机音效，涵盖 {categories.length} 个分类，让你的爱车独一无二
            </p>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300 hover:scale-105"
            >
              {showUpload ? '关闭上传' : '上传音效'}
            </button>
          </div>

          {/* 分类网格 */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCategory key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories
                .sort((a, b) => {
                  if (a.name === '其他') return 1;
                  if (b.name === '其他') return -1;
                  return b.count - a.count;
                })
                .map((cat, index) => (
                  <a
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="group relative p-6 bg-slate-800/60 backdrop-blur border border-pink-500/20 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* 霓虹光效 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:via-cyan-500/5 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl" />
                    
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {cat.displayName}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4">
                        {cat.count} 个音效
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          点击查看
                        </span>
                        <svg className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          )}

          {/* 提示 */}
          {!loading && categories.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm">
                点击分类查看并播放音效，支持在线试听和下载
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center py-12 border-t border-pink-500/20 mt-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden">
              <img src="/logo.png" alt="CarSound" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white">
              CarSound
            </span>
          </div>
          <p className="text-slate-500 text-sm">音频来源于网络，仅供娱乐</p>
          <p className="text-slate-600 text-xs mt-2">© 2026 CarSound. All rights reserved.</p>
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