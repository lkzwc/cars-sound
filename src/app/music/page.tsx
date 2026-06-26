'use client';

import type { Metadata } from 'next';
import CyberBackground from '@/components/CyberBackground';

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-[#08080d] relative flex flex-col">
      <CyberBackground />

      <div className="max-w-3xl mx-auto px-4 py-12 relative z-10 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            车载音乐下载
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              车载音乐下载
            </span>
          </h1>
          <p className="text-lg text-slate-400">海量热门歌曲免费下载 + 无损音乐U盘购买，一站式搞定车载音乐</p>
        </div>

        {/* ====== 歌曲下载板块 ====== */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📥</span>
            <h2 className="text-2xl font-black text-white">歌曲下载</h2>
            <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs font-medium">
              免费
            </span>
          </div>

          <div className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl hover:shadow-[0_0_30px_rgba(236,72,153,0.08)] transition-all duration-500">
            {/* 歌曲信息 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-4 backdrop-blur">
                🎵 抖音热门歌曲 · 经典老歌 · 无损音质
              </div>
              <h3 className="text-xl font-bold text-white mb-3">车载歌曲合集</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                收录抖音热门歌曲、经典老歌、流行新歌等海量车载音乐，无损音质，即下即用。
                覆盖各种风格，让你的驾驶旅程不再单调。
              </p>
            </div>

            {/* 歌曲亮点 */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: '歌曲类型', value: '抖音热门 / 经典 / 流行' },
                { label: '音质', value: '无损 / 高品质' },
                { label: '格式', value: 'MP3 / FLAC / WAV' },
                { label: '更新', value: '持续更新中' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center">
                  <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* 下载按钮 */}
            <div className="text-center">
              <a
                href="https://pan.quark.cn/s/cf296463c60f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                夸克网盘下载
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="text-slate-500 text-xs mt-3">* 点击跳转夸克网盘下载，建议使用夸克App或电脑浏览器打开</p>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['抖音热门歌曲', '车载音乐', '无损音质', '经典老歌', '流行歌曲', 'DJ舞曲', '民谣', '粤语经典'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/[0.02] border border-white/[0.05] rounded-full text-slate-400 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.06]" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#08080d] text-slate-500 text-sm">也可以</span>
          </div>
        </div>

        {/* ====== 车载音乐U盘板块 ====== */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">💿</span>
            <h2 className="text-2xl font-black text-white">车载音乐U盘</h2>
            <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs font-medium">
              京东自营
            </span>
          </div>

          <div className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl hover:shadow-[0_0_30px_rgba(236,72,153,0.08)] transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 产品图 */}
              <div className="shrink-0">
                <div className="w-40 h-40 bg-pink-500/5 border border-pink-500/20 rounded-3xl flex items-center justify-center">
                  <span className="text-6xl">💿</span>
                </div>
              </div>

              {/* 产品信息 */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs mb-3">
                  2026新款升级 · 京东自营正版
                </div>
                <h2 className="text-2xl font-black text-white mb-2">影子猩球 车载U盘</h2>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  原装正版无损音乐U盘，海量精选歌曲，即插即用免安装。
                  兼容市面上主流车型，让每一段旅途都有好音乐相伴。
                </p>

                {/* 按钮 */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="https://u.jd.com/71zuWat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-pink-500 text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300"
                  >
                    去京东购买
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <p className="text-slate-500 text-xs mt-4">* 点击跳转京东商城购买，价格以京东页面为准</p>
              </div>
            </div>
          </div>

          {/* 产品亮点 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { icon: '🎵', title: '无损音质', desc: '高品质无损音乐' },
              { icon: '🔌', title: '即插即用', desc: '无需安装，插上就能听' },
              { icon: '🚗', title: '多车型兼容', desc: '兼容主流车机系统' },
              { icon: '📦', title: '京东自营', desc: '正品保障，售后无忧' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-xl text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-white text-sm font-bold mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer className="relative z-10 text-center py-8 border-t border-white/5 mt-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden">
            <img src="/logo.png" alt="CarSound" className="w-full h-full object-contain" />
          </div>
          <span className="text-lg font-bold text-white">CarSound</span>
        </div>
        <p className="text-slate-400 text-sm mb-3">音频来源于网络，仅供娱乐</p>
        <div className="flex justify-center gap-4 mb-3">
          <a href="/about" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">关于我们</a>
          <a href="/privacy" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">隐私政策</a>
          <a href="/terms" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">使用条款</a>
          <a href="/contact" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">联系我们</a>
        </div>
        <p className="text-slate-500 text-xs mt-1">&copy; 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}
