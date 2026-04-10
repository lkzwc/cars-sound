'use client';

import { useState, useEffect } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import UploadZone from '@/components/UploadZone';

interface AudioFile {
  key: string;
  name: string;
  size: number;
  lastModified: string;
  url: string;
}

export default function Home() {
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/audio-list');
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Cars Sound</h1>
                <p className="text-xs text-gray-500">特斯拉锁车搞笑段子合集</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              {showUpload ? '关闭上传' : '上传音频'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Upload Zone */}
        {showUpload && (
          <UploadZone onUploadSuccess={fetchFiles} />
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="搜索音频..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <span>共 {files.length} 个音频</span>
          {searchQuery && <span>· 搜索到 {filteredFiles.length} 个结果</span>}
        </div>

        {/* Audio List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            {searchQuery ? '没有找到匹配的音频' : '暂无音频文件，点击上方按钮上传'}
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredFiles.map((file) => (
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
      <footer className="text-center py-8 text-sm text-gray-400">
        <p>音频来源于网络，仅供娱乐</p>
      </footer>
    </div>
  );
}
