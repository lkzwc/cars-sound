'use client';

import CyberBackground from '@/components/CyberBackground';

const toneTypes = [
  { icon: '🎤', title: '磁性男声', desc: '低沉有磁性，适合成熟稳重的车主，如"公主请上车"经典风格', tags: ['低沉', '成熟', '稳重'] },
  { icon: '👧', title: '甜美女声', desc: '甜美可爱，亲切温柔，适合女性车主或想给乘客温馨感', tags: ['甜美', '温柔', '亲切'] },
  { icon: '🤖', title: '科技AI', desc: '机械感、未来感十足，贾维斯/钢铁侠风格，科技控首选', tags: ['机械', '未来', '科幻'] },
  { icon: '🎮', title: '游戏角色', desc: '模仿热门游戏角色语音，如王者荣耀英雄、红警指挥官等', tags: ['角色', '游戏', '还原'] },
  { icon: '😂', title: '搞笑整活', desc: '夸张搞怪风格，网络热梗配音，让你的车成为显眼包', tags: ['搞怪', '热梗', '幽默'] },
  { icon: '🎬', title: '影视动漫', desc: '经典影视/动漫角色配音，变形金刚、奥特曼、蜡笔小新等', tags: ['动漫', '影视', '经典'] },
];

const contentTypes = [
  { icon: '🚪', title: '锁车/解锁', desc: '锁车告别、解锁欢迎音效，最常用的场景，第一印象很重要', examples: ['公主请上车', '恭候多时'] },
  { icon: '🏠', title: '迎宾语', desc: '上车自动播放的欢迎语音，给每天出行一个好心情', examples: ['早上好主人', '今天也要开心哦'] },
  { icon: '🏎️', title: '驾驶提示', desc: '加速、转向、刹车等驾驶场景语音提示，个性又实用', examples: ['坐稳了！', '秋名山见'] },
  { icon: '📢', title: '提醒播报', desc: '电量低、保养提醒、安全带未系等实用播报，有趣不枯燥', examples: ['该充电啦~', '系好安全带哟'] },
  { icon: '🎉', title: '节日彩蛋', desc: '春节、圣诞、生日等特殊日期的惊喜语音，仪式感拉满', examples: ['新年快乐！', '生日快乐！'] },
  { icon: '✨', title: '自定义文案', desc: '你有更好的创意？任何场景、任何文案，我们帮你实现', examples: ['我的车我做主', '无限可能'] },
];

const steps = [
  { step: '01', title: '选择音色', desc: '浏览音色库，听样音，选择你喜欢的声线' },
  { step: '02', title: '定制内容', desc: '确定场景和文案，自备或我们帮你创作' },
  { step: '03', title: '专业制作', desc: '录音师录制、后期精修、品质审核' },
  { step: '04', title: '交付安装', desc: '音频文件 + 安装教程，轻松搞定' },
];

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#13132b] to-[#0f0f1a] relative">
      <CyberBackground />

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            专业定制服务
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              专属语音包定制
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            音色随心选 · 内容随心定 · 打造独一无二的车载语音体验
          </p>
        </div>

        {/* ======== 音色定制 ======== */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-4 backdrop-blur">
              🎙️ 核心定制能力
            </div>
            <h2 className="text-3xl font-black text-white mb-3">
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                音色定制
              </span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              6 大音色风格，覆盖主流需求。专业配音演员录制，每种音色都提供样音试听
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {toneTypes.map((item, i) => (
              <div
                key={i}
                className="group p-5 bg-[#1a1a30]/70 backdrop-blur border border-pink-500/20 rounded-xl hover:border-pink-400/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-0.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======== 内容定制 ======== */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-3">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                内容定制
              </span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              6 大常用场景模板，支持文案自由创作。你出创意，我们来落地
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contentTypes.map((item, i) => (
              <div
                key={i}
                className="group p-5 bg-[#1a1a30]/70 backdrop-blur border border-purple-500/20 rounded-xl hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.examples.map((ex, j) => (
                    <span key={j} className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs">
                      「{ex}」
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 定制流程 */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">定制流程</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((item, i) => (
              <div key={i} className="relative group">
                <div className="p-5 bg-[#1a1a30]/70 backdrop-blur border border-pink-500/20 rounded-xl hover:border-pink-400/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300 text-center">
                  <div className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 text-pink-500/40 text-xl transform -translate-y-1/2">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 联系 */}
        <div id="contact" className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">开始定制</h2>
          <p className="text-slate-400 text-sm mb-8">告诉我们你想要的音色和内容，我们来搞定</p>

          <div className="p-8 bg-[#1a1a30]/80 backdrop-blur border border-pink-500/25 rounded-3xl">
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(236,72,153,0.3)]">
              📱
            </div>
            <div className="text-slate-400 text-xs mb-1">微信号</div>
            <div className="text-3xl font-black text-pink-400 mb-3 tracking-wider">15556355573</div>
            <p className="text-slate-500 text-xs">添加时请备注「语音包定制」</p>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center py-8 border-t border-pink-500/20 mt-8">
        <p className="text-slate-500 text-xs">&copy; 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}
