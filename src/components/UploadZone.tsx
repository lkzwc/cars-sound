'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;

interface UploadZoneProps {
  onUploadSuccess: () => void;
}

interface UploadItem {
  name: string;
  progress: string;
  status: 'uploading' | 'success' | 'error';
}

export default function UploadZone({ onUploadSuccess }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `文件 ${file.name} 超过 10MB 限制`;
    }
    return null;
  };

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setUploadItems(prev => [...prev, { name: file.name, progress: `❌ ${validationError}`, status: 'error' }]);
      return;
    }

    setUploadItems(prev => [...prev, { name: file.name, progress: '⏳ 正在上传...', status: 'uploading' }]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadItems(prev => prev.map(item =>
          item.name === file.name ? { ...item, progress: `✅ ${file.name} 上传成功`, status: 'success' } : item
        ));
      } else {
        setUploadItems(prev => prev.map(item =>
          item.name === file.name ? { ...item, progress: `❌ 上传失败: ${result.error}`, status: 'error' } : item
        ));
      }
    } catch (error) {
      setUploadItems(prev => prev.map(item =>
        item.name === file.name ? { ...item, progress: '❌ 上传失败，请重试', status: 'error' } : item
      ));
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a)$/i)
    );

    if (files.length > MAX_FILES) {
      setUploadProgress(`⚠️ 最多同时上传 ${MAX_FILES} 个文件`);
      setTimeout(() => setUploadProgress(null), 3000);
      return;
    }

    if (files.length > 0) {
      setUploading(true);
      files.forEach(uploadFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > MAX_FILES) {
      setUploadProgress(`⚠️ 最多同时上传 ${MAX_FILES} 个文件`);
      setTimeout(() => setUploadProgress(null), 3000);
      return;
    }

    if (files.length > 0) {
      setUploading(true);
      files.forEach(uploadFile);
    }
  };

  const allDone = uploading && uploadItems.length > 0 && uploadItems.every(item => item.status !== 'uploading');

  useEffect(() => {
    if (allDone) {
      const successCount = uploadItems.filter(i => i.status === 'success').length;
      if (successCount > 0) {
        setTimeout(() => {
          setUploadItems([]);
          onUploadSuccess();
        }, 2000);
      }
    }
  }, [allDone, uploadItems, onUploadSuccess]);

  return (
    <div className="relative">
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-amber-500/5 rounded-3xl blur-xl" />
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 backdrop-blur-xl ${
          isDragging
            ? 'border-amber-400 bg-amber-500/5 scale-105'
            : 'border-white/5 bg-white/[0.02] hover:border-amber-500/20 hover:bg-white/[0.04]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,.mp3,.wav,.ogg,.m4a"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        <div className="space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-amber-500 rounded-2xl opacity-10 animate-pulse" />
            <div className="relative w-full h-full bg-amber-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/10">
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
              或{' '}
              <span
                className="text-amber-400 font-medium cursor-pointer hover:text-amber-300"
                onClick={() => fileInputRef.current?.click()}
              >
                点击选择文件
              </span>
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500">
            <span className="px-3 py-1 bg-white/[0.03] rounded-full">MP3</span>
            <span className="px-3 py-1 bg-white/[0.03] rounded-full">WAV</span>
            <span className="px-3 py-1 bg-white/[0.03] rounded-full">OGG</span>
            <span className="px-3 py-1 bg-white/[0.03] rounded-full">M4A</span>
            <span className="px-3 py-1 bg-white/[0.03] rounded-full">最大 10MB</span>
          </div>
        </div>
      </div>

      {/* 上传结果列表 */}
      {uploadItems.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadItems.map((item, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl text-sm ${
                item.status === 'success'
                  ? 'bg-green-500/10 text-green-300'
                  : item.status === 'error'
                  ? 'bg-red-500/10 text-red-300'
                  : 'bg-amber-500/10 text-amber-300'
              }`}
            >
              {item.progress}
            </div>
          ))}
        </div>
      )}

      {/* 旧进度提示（兼容） */}
      {uploadProgress && !uploadItems.length && (
        <div className="mt-4 p-4 bg-amber-500/5 backdrop-blur border border-amber-500/20 rounded-xl text-sm text-amber-300 text-center">
          {uploadProgress}
        </div>
      )}
    </div>
  );
}
