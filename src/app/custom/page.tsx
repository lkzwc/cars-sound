'use client';

import { useState } from 'react';
import CyberBackground from '@/components/CyberBackground';

const features = [
  { icon: '🎙️', title: '专业配音', desc: '专业配音演员，多种音色可选，男声女声童声任选' },
  { icon: '⚡', title: '快速交付', desc: '3-5个工作日完成定制，加急可24小时' },
  { icon: '🚗', title: '多车型支持', desc: '特斯拉、理想、蔚来、小鹏、比亚迪等主流品牌' },
  { icon: '🎵', title: '场景定制', desc: '锁车、解锁、迎宾、转向、加速等多种场景' },
  { icon: '📝', title: '文案定制', desc: '自备文案或我们帮你创作，脑洞越大越好' },
  { icon: '🔄', title: '售后无忧', desc: '免费修改直到满意，终身技术支持' },
];

const steps = [
  { step: '01', title: '沟通需求', desc: '告诉我们想要的风格、场景和文案' },
  { step: '02', title: '确认方案', desc: '提供配音样音，选择最喜欢的音色' },
  { step: '03', title: '开始制作', desc: '专业录音制作，品质把控' },
  { step: '04', title: '交付安装', desc: '提供音频文件+安装教程，轻松搞定' },
];

export default function CustomPage() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>('pro');

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
            个性化你的爱车，打造独一无二的语音体验
          </p>
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

        {/* 服务特色 */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">服务特色</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((item, i) => (
              <div
                key={i}
                className="group p-5 bg-[#1a1a30]/70 backdrop-blur border border-pink-500/20 rounded-xl hover:border-pink-400/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold mb-1 text-sm">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 套餐 */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">定制套餐</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Basic */}
            <button
              onClick={() => setSelectedPlan('basic')}
              className={`text-left p-6 rounded-2xl backdrop-blur border transition-all duration-300 ${
                selectedPlan === 'basic'
                  ? 'bg-[#1a1a30]/95 border-pink-400/50 shadow-[0_0_30px_rgba(236,72,153,0.25)]'
                  : 'bg-[#1a1a30]/50 border-slate-700/50 hover:border-pink-500/30'
              }`}
            >
              <h3 className="text-lg font-bold text-white mb-2">基础套餐</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-pink-400">¥99</span>
                <span className="text-slate-500 text-sm">/套</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 3个场景音效</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 标准音色</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 3天交付</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 1次免费修改</li>
              </ul>
            </button>

            {/* Pro */}
            <button
              onClick={() => setSelectedPlan('pro')}
              className={`relative text-left p-6 rounded-2xl backdrop-blur border transition-all duration-300 ${
                selectedPlan === 'pro'
                  ? 'bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]'
                  : 'bg-[#1a1a30]/50 border-slate-700/50 hover:border-pink-500/30'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full">
                🔥 推荐
              </div>
              <h3 className="text-lg font-bold text-white mb-2">高级套餐</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-pink-400">¥199</span>
                <span className="text-slate-500 text-sm">/套</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 5个场景音效</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 专业配音演员</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 5天交付（可加急）</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 不限修改次数</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 文案创作服务</li>
              </ul>
            </button>
          </div>
        </div>

        {/* 联系 */}
        <div id="contact" className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">开始定制</h2>
          <p className="text-slate-400 text-sm mb-8">添加微信，获取专属定制服务</p>

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
