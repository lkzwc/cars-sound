'use client';

import { useState, useEffect, useRef } from 'react';

// 全局状态：当前正在播放的 AudioPlayer key
let currentPlayingKey: string | null = null;
let currentAudioEl: HTMLAudioElement | null = null;

interface AudioPlayerProps {
  src: string;
  title: string;
}

// 懒加载音频播放器 - 只有进入视口才加载 audio 元素
export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerKey = `${src}-${title}`;
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // IntersectionObserver 懒加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 当组件挂载/卸载时管理全局播放状态
  useEffect(() => {
    return () => {
      if (currentPlayingKey === playerKey && currentAudioEl) {
        currentAudioEl.pause();
        currentAudioEl.currentTime = 0;
        currentPlayingKey = null;
      }
    };
  }, [playerKey]);

  const stopAllOtherPlayers = () => {
    if (currentAudioEl && currentPlayingKey !== playerKey) {
      currentAudioEl.pause();
      currentAudioEl.currentTime = 0;
    }
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          currentPlayingKey = null;
        } else {
          // 先暂停其他正在播放的音频
          stopAllOtherPlayers();
          await audioRef.current.play();
          setIsPlaying(true);
          currentPlayingKey = playerKey;
          currentAudioEl = audioRef.current;
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
    if (currentPlayingKey === playerKey) {
      currentPlayingKey = null;
    }
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
    <div 
      ref={containerRef}
      className="group relative bg-white/[0.03] backdrop-blur-xl rounded-xl border border-white/5 p-3 hover:border-amber-500/25 hover:shadow-[0_0_20px_rgba(251,191,36,0.08)] transition-all duration-300 overflow-hidden"
    >
      {/* 微光效 */}
      <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.03] transition-all duration-500" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* 播放按钮和标题 */}
      <div className="relative flex items-center gap-3 mb-3">
        <button
          onClick={togglePlay}
          disabled={error || !isVisible}
          className={`relative w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full text-white transition-all duration-300 ${
            error || !isVisible
              ? 'bg-slate-700/50 cursor-not-allowed' 
              : 'bg-amber-500 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-110'
          }`}
        >
          {!isVisible ? (
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {isPlaying && (
            <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
          )}
          {/* 光环 */}
          <div className="absolute inset-0 rounded-full border border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white truncate text-sm group-hover:text-amber-400 transition-colors" title={title}>
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span className="w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
            {!isVisible ? '等待加载...' : duration > 0 ? formatTime(duration) : '加载中...'}
          </p>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all duration-200 group/btn"
          title="下载音频"
        >
          <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>

      {/* 进度条 */}
      <div className="relative">
        <div
          className="h-1.5 bg-slate-700/50 rounded-full cursor-pointer overflow-hidden"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        
        {/* 时间显示 */}
        <div className="flex justify-between text-xs text-slate-400 mt-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {error && (
        <div className="mt-3 text-xs text-red-400 text-center bg-red-500/10 py-2 rounded-lg">
          ⚠️ 加载失败
        </div>
      )}

      {/* 只有进入视口才创建 audio 元素 */}
      {isVisible && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onError={handleError}
          preload="metadata"
        />
      )}
    </div>
  );
}
