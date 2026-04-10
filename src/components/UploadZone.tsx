'use client';

import { useState, useCallback } from 'react';

interface UploadZoneProps {
  onUploadSuccess: () => void;
}

export default function UploadZone({ onUploadSuccess }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadProgress(`正在上传 ${file.name}...`);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadProgress(`✅ ${file.name} 上传成功！`);
        setTimeout(() => {
          setUploadProgress(null);
          onUploadSuccess();
        }, 1500);
      } else {
        setUploadProgress(`❌ 上传失败: ${result.error}`);
        setTimeout(() => setUploadProgress(null), 3000);
      }
    } catch (error) {
      setUploadProgress('❌ 上传失败，请重试');
      setTimeout(() => setUploadProgress(null), 3000);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a)$/i)
    );

    if (files.length > 0) {
      files.forEach(uploadFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(uploadFile);
  };

  return (
    <div className="relative">
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 backdrop-blur-xl ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10 scale-105'
            : 'border-white/10 bg-slate-800/50 hover:border-cyan-500/30 hover:bg-slate-800/70'
        }`}
      >
        <input
          type="file"
          accept="audio/*,.mp3,.wav,.ogg,.m4a"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        
        <div className="space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl opacity-20 animate-pulse" />
            <div className="relative w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>
          
          <div>
            <p className="text-white text-lg font-medium">
              拖拽音频文件到这里
            </p>
            <p className="text-slate-400 mt-1">
              或 <span className="text-cyan-400 font-medium cursor-pointer hover:text-cyan-300">点击选择文件</span>
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 bg-slate-700/50 rounded-full">MP3</span>
            <span className="px-3 py-1 bg-slate-700/50 rounded-full">WAV</span>
            <span className="px-3 py-1 bg-slate-700/50 rounded-full">OGG</span>
            <span className="px-3 py-1 bg-slate-700/50 rounded-full">M4A</span>
          </div>
        </div>
      </div>

      {uploadProgress && (
        <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur border border-cyan-500/20 rounded-xl text-sm text-cyan-300 text-center">
          {uploadProgress}
        </div>
      )}
    </div>
  );
}
