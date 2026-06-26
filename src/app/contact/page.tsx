import type { Metadata } from 'next';
import Link from 'next/link';
import CyberBackground from '@/components/CyberBackground';

export const metadata: Metadata = {
  title: '联系我们 - CarSound 车机音效下载平台',
  description: '联系 CarSound 团队，提供音效投稿、版权申诉、合作咨询等服务。您的反馈是我们持续改进的动力。',
  keywords: ['联系我们', 'CarSound', '音效投稿', '版权联系', '合作咨询'],
  openGraph: {
    title: '联系我们 - CarSound',
    description: '联系 CarSound 团队，音效投稿、版权申诉、合作咨询。',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: 'https://carsound.top/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#08080d] relative flex flex-col">
      <CyberBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            联系我们
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            联系我们
          </h1>
          <p className="text-lg text-slate-400">您的反馈是我们持续改进的动力</p>
        </div>

        <div className="space-y-8">
          {/* 联系邮箱 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl text-center">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-white mb-3">发送邮件</h2>
            <p className="text-slate-400 mb-6">有任何问题、建议或合作意向，欢迎发送邮件，我们会在 1-3 个工作日内回复。</p>
            <a
              href="mailto:contact@carsound.top"
              className="inline-flex items-center gap-2 px-8 py-3 bg-pink-500 text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@carsound.top
            </a>
          </section>

          {/* 联系我们做什么 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">你可以通过以下方式联系我们</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: '🎵',
                  title: '音效投稿',
                  desc: '你有好的车机音效资源想分享？欢迎投稿，我们会标注来源并感谢你的贡献。',
                },
                {
                  icon: '⚖️',
                  title: '版权申诉',
                  desc: '如果你的作品被本站收录且你希望移除，请提供相关证明，我们会及时处理。',
                },
                {
                  icon: '🤝',
                  title: '商务合作',
                  desc: '广告投放、品牌合作、资源置换等商务合作，欢迎洽谈。',
                },
                {
                  icon: '💡',
                  title: '建议反馈',
                  desc: '对网站功能、内容有任何建议或发现Bug，欢迎告诉我们。',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ 常见问题 */}
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">常见问题</h2>
            <div className="space-y-4">
              {[
                {
                  q: '音效下载收费吗？',
                  a: '不收费。本站所有车机音效均可免费下载，车载音乐歌曲也通过夸克网盘免费提供下载。我们通过广告获得运营支持。',
                },
                {
                  q: '下载的音效怎么导入车机？',
                  a: '下载音效文件后，通过 U 盘将文件传输到车机系统中，然后在车机的提示音/音效设置中选择导入的自定义音效。不同车型操作略有差异，建议查阅车辆使用手册。',
                },
                {
                  q: '修改车机音效会影响保修吗？',
                  a: '通常不会。替换提示音属于系统个性化设置，不影响车辆核心功能。但建议在操作前阅读车辆保修政策，或咨询售后服务中心。',
                },
                {
                  q: '支持哪些车型？',
                  a: '本站音效为通用 MP3/WAV 格式，理论上支持所有支持自定义提示音的车型。特斯拉、理想、蔚来、小鹏等主流智能电动车均经过用户验证可用。',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                  <h3 className="text-white font-bold mb-2">{item.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12 pt-8 border-t border-white/5">
          <Link href="/about" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">
            关于我们
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
