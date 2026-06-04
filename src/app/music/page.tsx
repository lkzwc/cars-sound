'use client';

import CyberBackground from '@/components/CyberBackground';

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#13132b] to-[#0f0f1a] relative">
      <CyberBackground />

      <div className="max-w-3xl mx-auto px-4 py-16 relative z-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-6 backdrop-blur">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            车载音乐U盘
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              车载音乐U盘
            </span>
          </h1>
          <p className="text-lg text-slate-400">即插即用，海量无损音乐，开车更享受</p>
        </div>

        {/* 商品卡片 */}
        <div className="mb-16">
          <div className="p-8 bg-[#1a1a30]/80 backdrop-blur border border-cyan-500/25 rounded-3xl hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 产品图 */}
              <div className="shrink-0">
                <div className="w-40 h-40 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 border-2 border-cyan-500/30 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                  <span className="text-6xl">💿</span>
                </div>
              </div>

              {/* 产品信息 */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs mb-3">
                  2026新款升级 · 京东自营正版
                </div>
                <h2 className="text-2xl font-black text-white mb-2">影子猩球 车载U盘</h2>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  原装正版无损音乐U盘，海量精选歌曲，即插即用免安装。
                  兼容市面上主流车型，让每一段旅途都有好音乐相伴。
                </p>

                {/* 价格 + 按钮 */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 text-sm">到手价</span>
                    <span className="text-4xl font-black text-cyan-400">¥63.10</span>
                  </div>
                  <a
                    href="https://u.jd.com/71zuWat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-all duration-300"
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
        </div>

        {/* 产品亮点 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: '🎵', title: '无损音质', desc: '高品质无损音乐' },
            { icon: '🔌', title: '即插即用', desc: '无需安装，插上就能听' },
            { icon: '🚗', title: '多车型兼容', desc: '兼容主流车机系统' },
            { icon: '📦', title: '京东自营', desc: '正品保障，售后无忧' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-[#1a1a30]/50 border border-cyan-500/15 rounded-xl text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white text-sm font-bold mb-1">{item.title}</h3>
              <p className="text-slate-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 底部 CTA */}
        <div className="text-center">
          <a
            href="https://u.jd.com/71zuWat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300"
          >
            🛒 立即购买
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="text-slate-500 text-xs mt-3">* 商品价格及库存以京东商城页面为准</p>
        </div>
      </div>

      <footer className="relative z-10 text-center py-8 border-t border-cyan-500/20 mt-8">
        <p className="text-slate-500 text-xs">&copy; 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}
