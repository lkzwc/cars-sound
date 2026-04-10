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
    <div className="mb-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
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
        
        <div className="space-y-2">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-600">
            拖拽音频文件到这里，或 <span className="text-blue-500 font-medium">点击选择</span>
          </p>
          <p className="text-xs text-gray-400">支持 MP3, WAV, OGG, M4A 格式</p>
        </div>
      </div>

      {uploadProgress && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 text-center">
          {uploadProgress}
        </div>
      )}
    </div>
  );
}
