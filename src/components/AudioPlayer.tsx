'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.error('播放失败:', err);
        setError(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = percent * duration;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('下载失败:', err);
      window.open(src, '_blank');
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
      {/* 播放按钮和标题 */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={togglePlay}
          disabled={error}
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full text-white transition-all duration-200 ${
            error 
              ? 'bg-slate-700 cursor-not-allowed' 
              : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-200 truncate text-sm group-hover:text-white transition-colors" title={title}>
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {duration > 0 ? formatTime(duration) : '加载中...'}
          </p>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
          title="下载音频"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>

      {/* 进度条 */}
      <div
        className="h-1.5 bg-slate-700/50 rounded-full cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 时间显示 */}
      <div className="flex justify-between text-xs text-slate-500 mt-1.5">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {error && (
        <div className="mt-2 text-xs text-red-400 text-center">
          加载失败
        </div>
      )}

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        preload="metadata"
      />
    </div>
  );
}
