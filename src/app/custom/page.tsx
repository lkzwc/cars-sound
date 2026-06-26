'use client';

import CyberBackground from '@/components/CyberBackground';

const toneTypes = [
  { icon: '🎤', title: '磁性男声', desc: '低沉有磁性，适合成熟稳重风格', tags: ['低沉', '成熟'] },
  { icon: '👧', title: '甜美女声', desc: '甜美可爱，亲切温柔', tags: ['甜美', '温柔'] },
  { icon: '🤖', title: '科技AI', desc: '机械感、未来感，贾维斯风格', tags: ['科幻', '未来'] },
  { icon: '🎮', title: '游戏角色', desc: '热门游戏角色配音', tags: ['角色', '游戏'] },
  { icon: '😂', title: '搞笑整活', desc: '夸张搞怪风格，热梗配音', tags: ['搞怪', '幽默'] },
  { icon: '🎬', title: '影视动漫', desc: '影视/动漫经典角色配音', tags: ['动漫', '经典'] },
];

const contentTypes = [
  { icon: '🚪', title: '锁车/解锁', desc: '锁车告别、解锁欢迎' },
  { icon: '🏠', title: '迎宾语', desc: '上车自动播放欢迎语音' },
  { icon: '🏎️', title: '驾驶提示', desc: '加速、转向等场景语音' },
  { icon: '📢', title: '提醒播报', desc: '电量、保养等实用提醒' },
  { icon: '🎉', title: '节日彩蛋', desc: '特殊日期的惊喜语音' },
  { icon: '✨', title: '自定义', desc: '任何场景、任何文案' },
];

const steps = [
  { step: '01', title: '选择音色', desc: '浏览音色库，选喜欢的声线' },
  { step: '02', title: '定制内容', desc: '确定场景和文案' },
  { step: '03', title: '专业制作', desc: '录制精修，品质审核' },
  { step: '04', title: '交付安装', desc: '音频文件 + 安装教程' },
];

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-[#08080d] relative flex flex-col">
      <CyberBackground />

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            专业定制服务
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              专属语音包定制
            </span>
          </h1>
          <p className="text-lg text-slate-400">音色随心选 · 内容随心定</p>
        </div>

        {/* ======== 音色定制 + 内容定制 双栏 ======== */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 音色定制 */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white mb-2">
                <span className="text-pink-400">
                  🎙️ 音色定制
                </span>
              </h2>
              <p className="text-slate-400 text-sm">专业配音演员录制，样音试听</p>
            </div>
            <div className="space-y-3">
              {toneTypes.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] backdrop-blur border border-white/5 rounded-xl hover:border-pink-500/25 transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-pink-500/10 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-white font-bold text-sm">{item.title}</h3>
                      {item.tags.map((tag, j) => (
                        <span key={j} className="px-1.5 py-px bg-pink-500/10 border border-pink-500/20 rounded text-pink-400 text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-400 text-xs truncate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 内容定制 */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white mb-2">
                <span className="text-pink-400">
                  📝 内容定制
                </span>
              </h2>
              <p className="text-slate-400 text-sm">你出创意，我们来实现</p>
            </div>
            <div className="space-y-3">
              {contentTypes.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] backdrop-blur border border-white/5 rounded-xl hover:border-pink-500/25 transition-all duration-200"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-pink-500/10 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm mb-0.5">{item.title}</h3>
                    <p className="text-slate-400 text-xs truncate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 定制流程 */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white text-center mb-8">定制流程</h2>
          <div className="grid grid-cols-4 gap-3">
            {steps.map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-pink-400 mb-2">
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          {/* 流程连线 */}
          <div className="hidden md:flex justify-center gap-12 mt-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-12 h-px bg-pink-500/20 mt-0" />
            ))}
          </div>
        </div>

        {/* 联系 */}
        <div id="contact" className="max-w-xl mx-auto">
          <div className="flex items-center justify-between gap-6 p-6 bg-white/[0.03] backdrop-blur border border-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
              </svg>
              <span className="text-white font-bold text-base">开启专属定制</span>
            </div>
            <div className="text-right">
              <a
                href="tel:15556355573"
                className="text-2xl font-black text-pink-400 tracking-wide hover:scale-105 transition-transform inline-block"
              >
                15556355573
              </a>
              <p className="text-slate-500 text-xs mt-0.5">微信电话同号</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center py-8 border-t border-white/5 mt-8">
        <div className="flex justify-center gap-4 mb-3">
          <a href="/about" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">关于我们</a>
          <a href="/privacy" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">隐私政策</a>
          <a href="/terms" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">使用条款</a>
          <a href="/contact" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">联系我们</a>
        </div>
        <p className="text-slate-500 text-xs">&copy; 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}
