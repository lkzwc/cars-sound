'use client';

import CyberBackground from '@/components/CyberBackground';

const playlists = [
  { title: '深夜驾驶', desc: '适合夜晚独自驾驶的轻音乐，氛围感拉满', cover: '🌙', songs: 30, color: 'from-indigo-500 to-blue-600' },
  { title: '公路旅行', desc: '长途驾驶必备经典，一路风景一路歌', cover: '🛣️', songs: 45, color: 'from-cyan-500 to-teal-600' },
  { title: '动感电音', desc: 'EDM & House，一脚油门精神抖擞', cover: '⚡', songs: 35, color: 'from-yellow-500 to-orange-600' },
  { title: '经典老歌', desc: '708090怀旧金曲，满满回忆杀', cover: '📻', songs: 50, color: 'from-amber-500 to-red-600' },
  { title: '轻快流行', desc: '轻松愉悦的中文流行歌单', cover: '🎵', songs: 40, color: 'from-pink-500 to-rose-600' },
  { title: '摇滚力量', desc: '经典摇滚，释放驾驶激情', cover: '🎸', songs: 28, color: 'from-red-500 to-orange-600' },
];

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-cyan-950 relative">
      <CyberBackground />

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-6 backdrop-blur">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            精选歌单
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              车载音乐推荐
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            精选适合驾驶时聆听的音乐，让每一段旅程都充满节奏
          </p>
        </div>

        {/* 歌单 */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {playlists.map((item, i) => (
              <div
                key={i}
                className="group p-5 bg-slate-800/40 backdrop-blur border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 mb-4 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-2xl shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                  {item.cover}
                </div>
                <h3 className="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors text-sm">{item.title}</h3>
                <p className="text-slate-500 text-xs mb-3 leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-medium">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                  {item.songs} 首歌曲
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 说明 */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="p-6 bg-slate-800/40 backdrop-blur border border-cyan-500/10 rounded-2xl text-center">
            <h3 className="text-white font-bold mb-3 text-lg">🎧 更多歌单即将上线</h3>
            <p className="text-slate-500 text-sm">
              我们正在精选更多优质歌单，覆盖不同驾驶场景和心情。
              如果你有好的歌单推荐，欢迎联系我们！
            </p>
          </div>
        </div>

        {/* 联系 */}
        <div id="contact" className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">定制专属歌单</h2>
          <p className="text-slate-400 text-sm mb-8">添加微信，获取更多精选歌单推荐</p>

          <div className="p-8 bg-slate-800/60 backdrop-blur border border-cyan-500/20 rounded-3xl">
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              📱
            </div>
            <div className="text-slate-500 text-xs mb-1">微信号</div>
            <div className="text-3xl font-black text-cyan-400 mb-3 tracking-wider">15556355573</div>
            <p className="text-slate-600 text-xs">添加时请备注「车载音乐」</p>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center py-8 border-t border-cyan-500/20 mt-8">
        <p className="text-slate-600 text-xs">&copy; 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}
