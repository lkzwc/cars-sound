import type { Metadata } from 'next';
import Link from 'next/link';
import CyberBackground from '@/components/CyberBackground';

export const metadata: Metadata = {
  title: '关于我们 - 车机音效定制下载平台 | CarSound',
  description: 'CarSound 是国内专业的车机魔改音效下载平台，为特斯拉、理想、蔚来、小鹏等车主提供海量自定义音效，涵盖锁车音效、迎宾音效、搞笑语音、车载音乐等。',
  keywords: ['车机音效', 'CarSound', '车机魔改音效', '关于CarSound', '车机音效下载平台'],
  openGraph: {
    title: '关于我们 - CarSound 车机音效定制下载平台',
    description: 'CarSound 是国内专业的车机魔改音效下载平台，为车主提供海量自定义音效。',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: 'https://carsound.top/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#08080d] relative flex flex-col">
      <CyberBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            关于我们
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              关于 CarSound
            </span>
          </h1>
          <p className="text-lg text-slate-400">为车主打造个性化的驾乘体验</p>
        </div>

        {/* 内容 */}
        <div className="space-y-8">
          {/* 我们是谁 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">我们是谁</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              CarSound 是国内领先的车机魔改音效下载平台，致力于为每一位车主提供丰富、有趣、个性化的车机音效体验。
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              随着智能汽车时代的到来，汽车已不再是简单的交通工具，而是我们生活中的&ldquo;第三空间&rdquo;。CarSound 希望帮助每一位车主，通过个性化的音效定制，让每一次出行都充满仪式感和乐趣。
            </p>
            <p className="text-slate-300 leading-relaxed">
              无论你是想让爱车发出&ldquo;公主请上车&rdquo;的温馨提醒，还是想换装大黄蜂的机械变形音效，抑或是为特斯拉换上独特的锁车提示音，都能在这里找到满意的选择。
            </p>
          </section>

          {/* 我们提供什么 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">我们提供什么</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '海量车机音效', desc: '数千个精心筛选的音效文件，涵盖锁车音、迎宾音、提示音等各类场景。' },
                { title: '持续更新', desc: '团队持续关注最新网络热梗和流行文化，定期更新音效资源库。' },
                { title: '语音包定制', desc: '提供个性化语音包定制服务，让你的专属声音响彻爱车。' },
                { title: '车载音乐下载', desc: '收录抖音热门歌曲、经典老歌等车载音乐资源，免费下载。' },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 兼容车型 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">兼容车型</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              CarSound 的音效文件为通用音频格式（MP3/WAV），理论上兼容所有支持自定义提示音的车机系统。以下是经过用户验证的主流车型：
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['特斯拉 Model 3/Y', '特斯拉 Model S/X', '理想 L6/L7/L8/L9', '理想 ONE', '蔚来 ET5/ET7', '蔚来 ES6/ES8', '小鹏 P7/G6/G9', '小鹏 X9'].map((car) => (
                <div key={car} className="px-4 py-3 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center">
                  <p className="text-slate-300 text-sm">{car}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 使用方式 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">如何使用</h2>
            <ol className="space-y-4">
              {[
                { step: '01', title: '浏览选择', desc: '在首页按分类浏览，找到你喜欢的音效，支持在线试听。' },
                { step: '02', title: '下载音效', desc: '点击播放器右侧的下载按钮，将音效文件保存到本地。' },
                { step: '03', title: '导入车机', desc: '将下载的音效文件通过 U 盘等方式传输到车机系统中。' },
                { step: '04', title: '设置生效', desc: '在车机的提示音设置中选择你导入的自定义音效即可生效。' },
              ].map((item) => (
                <li key={item.step} className="flex gap-4 p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                  <span className="text-2xl font-black text-pink-400 shrink-0">{item.step}</span>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* 声明 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">免责声明</h2>
            <p className="text-slate-300 leading-relaxed">
              本站提供的音效文件仅供个人娱乐使用，音频资源来源于网络收集。如涉及版权问题，请联系我们进行处理。使用过程中请遵守车辆制造商的相关规定，自行承担因修改车机音效可能带来的风险。
            </p>
          </section>
        </div>

        {/* 底部链接 */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-white/5">
          <Link href="/contact" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">
            联系我们
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/privacy" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">
            隐私政策
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/terms" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">
            使用条款
          </Link>
        </div>
      </div>
    </div>
  );
}
