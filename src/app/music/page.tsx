import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '车载音乐 - 精选歌单推荐 | Cars Sound',
  description: '精选车载音乐歌单，适合驾驶时聆听的音乐推荐。包含流行、摇滚、电子等多种风格，让驾驶更有趣。',
  keywords: ['车载音乐', '车载歌单', '驾驶音乐', '汽车音乐推荐'],
};

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            精选歌单
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              车载音乐推荐
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            精选适合驾驶时聆听的音乐，让每一段旅程都充满节奏
          </p>
        </div>
      </section>

      {/* Playlists */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">精选歌单</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '深夜驾驶',
                desc: '适合夜晚独自驾驶的轻音乐',
                cover: '🌙',
                songs: 30,
              },
              {
                title: '公路旅行',
                desc: '适合长途驾驶的经典歌曲',
                cover: '🛣️',
                songs: 45,
              },
              {
                title: '动感电音',
                desc: '让你精神抖擞的电子音乐',
                cover: '⚡',
                songs: 35,
              },
              {
                title: '经典老歌',
                desc: '怀旧金曲，回忆满满',
                cover: '📻',
                songs: 50,
              },
              {
                title: '轻快流行',
                desc: '轻松愉悦的流行歌曲',
                cover: '🎵',
                songs: 40,
              },
              {
                title: '摇滚力量',
                desc: '充满能量的摇滚乐',
                cover: '🎸',
                songs: 28,
              },
            ].map((playlist, i) => (
              <div
                key={i}
                className="group p-6 bg-slate-800/40 backdrop-blur border border-cyan-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 cursor-pointer"
              >
                <div className="text-6xl mb-4">{playlist.cover}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{playlist.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{playlist.desc}</p>
                <div className="text-cyan-400 text-sm">{playlist.songs} 首歌曲</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">定制专属歌单</h2>
          <p className="text-slate-300 mb-8">添加微信，获取更多精选歌单推荐</p>
          
          <div className="inline-flex flex-col items-center p-8 bg-slate-800/60 backdrop-blur border border-cyan-500/30 rounded-2xl">
            <div className="text-6xl mb-4">📱</div>
            <div className="text-2xl font-bold text-white mb-2">微信号</div>
            <div className="text-3xl font-black text-cyan-400 mb-4">15556355573</div>
            <p className="text-slate-400 text-sm">添加时请备注"车载音乐"</p>
          </div>
        </div>
      </section>
    </div>
  );
}
