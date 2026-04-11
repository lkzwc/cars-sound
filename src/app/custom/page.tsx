import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '语音包定制 - 专属车机音效 | Cars Sound',
  description: '定制专属车机语音包，个性化你的爱车。支持特斯拉、理想、蔚来等品牌，专业配音团队，快速交付。',
  keywords: ['语音包定制', '车机音效定制', '特斯拉音效定制', '专属音效'],
};

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            专业定制服务
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              专属语音包定制
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            个性化你的爱车，打造独一无二的语音体验
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">定制服务内容</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎙️',
                title: '专业配音',
                desc: '专业配音演员，多种音色可选',
              },
              {
                icon: '⚡',
                title: '快速交付',
                desc: '3-5个工作日完成定制',
              },
              {
                icon: '🚗',
                title: '多车型支持',
                desc: '支持特斯拉、理想、蔚来等主流品牌',
              },
              {
                icon: '🎵',
                title: '音效定制',
                desc: '锁车、解锁、迎宾等多种场景',
              },
              {
                icon: '📝',
                title: '文案定制',
                desc: '根据需求定制专属文案',
              },
              {
                icon: '🔄',
                title: '售后支持',
                desc: '不满意可修改，直到满意为止',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-slate-800/40 backdrop-blur border border-pink-500/20 rounded-2xl hover:border-pink-500/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">定制价格</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur border border-pink-500/30 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">基础套餐</h3>
              <div className="text-4xl font-black text-pink-400 mb-4">¥99<span className="text-lg text-slate-400">/套</span></div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 3个场景音效
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 标准音色
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 3天交付
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 1次修改机会
                </li>
              </ul>
            </div>
            
            <div className="p-8 bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur border border-pink-500/50 rounded-2xl relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                推荐
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">高级套餐</h3>
              <div className="text-4xl font-black text-pink-400 mb-4">¥199<span className="text-lg text-slate-400">/套</span></div>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 5个场景音效
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 专业配音演员
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 5天交付
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 不限修改次数
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">立即定制</h2>
          <p className="text-slate-300 mb-8">添加微信，获取专属定制服务</p>
          
          <div className="inline-flex flex-col items-center p-8 bg-slate-800/60 backdrop-blur border border-pink-500/30 rounded-2xl">
            <div className="text-6xl mb-4">📱</div>
            <div className="text-2xl font-bold text-white mb-2">微信号</div>
            <div className="text-3xl font-black text-pink-400 mb-4">15556355573</div>
            <p className="text-slate-400 text-sm">添加时请备注"语音包定制"</p>
          </div>
        </div>
      </section>
    </div>
  );
}
