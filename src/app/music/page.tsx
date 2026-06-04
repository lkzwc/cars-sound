'use client';

import CyberBackground from '@/components/CyberBackground';

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-[#08080d] relative flex flex-col">
      <CyberBackground />

      <div className="max-w-3xl mx-auto px-4 py-16 relative z-10 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            车载音乐U盘
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              车载音乐U盘
            </span>
          </h1>
          <p className="text-lg text-slate-400">即插即用，海量无损音乐，开车更享受</p>
        </div>

        {/* 商品卡片 */}
        <div className="mb-16">
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
        </div>

        {/* 产品亮点 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
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

      <footer className="relative z-10 text-center py-8 border-t border-white/5 mt-8">
        <p className="text-slate-500 text-xs">&copy; 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}
