import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '语音包定制 - 专属车机音效 | Cars Sound',
  description: '定制专属车机语音包，个性化你的爱车。支持特斯拉、理想、蔚来等品牌，专业配音团队，快速交付。',
};

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/30 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            专业定制服务
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              专属语音包
            </span>
            <br />
            <span className="text-white">定制</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            个性化你的爱车，打造独一无二的语音体验
          </p>
          
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] hover:scale-105 transition-all duration-300">
            立即定制
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎙️', title: '专业配音', desc: '专业配音演员，多种音色可选' },
              { icon: '⚡', title: '快速交付', desc: '3-5个工作日完成定制' },
              { icon: '🚗', title: '多车型支持', desc: '支持特斯拉、理想、蔚来等' },
              { icon: '🎵', title: '场景定制', desc: '锁车、解锁、迎宾等多种场景' },
              { icon: '📝', title: '文案定制', desc: '根据需求定制专属文案' },
              { icon: '🔄', title: '售后支持', desc: '不满意可修改，直到满意' },
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-slate-800/40 backdrop-blur border border-pink-500/20 rounded-2xl hover:border-pink-500/40 hover:bg-slate-800/60 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">定制套餐</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic */}
            <div className="p-8 bg-slate-800/60 backdrop-blur border border-pink-500/20 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-2">基础套餐</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-pink-400">¥99</span>
                <span className="text-slate-400">/套</span>
              </div>
              <ul className="space-y-4 text-slate-300 mb-8">
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 3个场景音效</li>
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 标准音色</li>
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 3天交付</li>
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 1次修改机会</li>
              </ul>
              <a href="#contact" className="block text-center py-3 bg-slate-700/50 text-slate-300 rounded-xl font-semibold hover:bg-slate-700 transition-colors">
                选择套餐
              </a>
            </div>
            
            {/* Pro */}
            <div className="relative p-8 bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur border border-pink-500/50 rounded-3xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold rounded-full">
                推荐
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">高级套餐</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-pink-400">¥199</span>
                <span className="text-slate-400">/套</span>
              </div>
              <ul className="space-y-4 text-slate-300 mb-8">
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 5个场景音效</li>
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 专业配音演员</li>
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 5天交付</li>
                <li className="flex items-center gap-3"><span className="text-green-400 text-xl">✓</span> 不限修改次数</li>
              </ul>
              <a href="#contact" className="block text-center py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
                选择套餐
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">立即定制</h2>
          <p className="text-slate-300 mb-10">添加微信，获取专属定制服务</p>
          
          <div className="p-10 bg-slate-800/60 backdrop-blur border border-pink-500/30 rounded-3xl">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl">
              📱
            </div>
            <div className="text-slate-400 mb-2">微信号</div>
            <div className="text-4xl font-black text-pink-400 mb-4">15556355573</div>
            <p className="text-slate-500 text-sm">添加时请备注"语音包定制"</p>
          </div>
        </div>
      </section>
    </div>
  );
}
