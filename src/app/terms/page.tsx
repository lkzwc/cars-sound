import type { Metadata } from 'next';
import Link from 'next/link';
import CyberBackground from '@/components/CyberBackground';

export const metadata: Metadata = {
  title: '使用条款 - CarSound 车机音效下载平台',
  description: 'CarSound 使用条款，明确用户在使用本网站服务时的权利与义务。请在下载和使用音效前仔细阅读。',
  keywords: ['使用条款', 'CarSound', '免责声明', '用户协议'],
  openGraph: {
    title: '使用条款 - CarSound',
    description: 'CarSound 使用条款，了解您的权利与义务。',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: 'https://carsound.top/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#08080d] relative flex flex-col">
      <CyberBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            使用条款
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            使用条款
          </h1>
          <p className="text-slate-400 text-sm">最后更新日期：2026年6月</p>
        </div>

        <div className="space-y-8">
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">接受条款</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              欢迎访问 CarSound（以下简称&ldquo;本网站&rdquo;）。通过访问和使用本网站，即表示您同意遵守以下使用条款和条件。如果您不同意这些条款，请勿使用本网站。
            </p>
            <p className="text-slate-300 leading-relaxed">
              我们保留随时修改这些条款的权利，修改后的条款一经发布即生效。建议您定期查阅本页面以了解最新条款。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">服务说明</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              CarSound 是一个提供车机音效文件下载服务的平台。本网站提供的音效文件主要来源于网络收集和用户投稿，供个人娱乐和非商业用途使用。
            </p>
            <p className="text-slate-300 leading-relaxed">
              我们持续更新和扩充音效资源库，但不保证所有音效文件的可用性、准确性或完整性。我们保留随时修改、暂停或终止服务的权利。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">用户责任</h2>
            <p className="text-slate-300 leading-relaxed mb-4">在使用本网站时，您同意：</p>
            <ul className="space-y-3">
              {[
                '下载的音效文件仅用于个人娱乐，不得用于商业用途或再分发。',
                '不得利用本网站从事任何违法活动或侵犯他人合法权益的行为。',
                '不得干扰或破坏本网站的正常运行，包括但不限于使用自动化工具恶意抓取。',
                '自行承担因修改车机系统设置可能带来的风险，包括保修政策影响。',
                '遵守车辆制造商的相关规定和使用条款，本网站不对因使用音效导致的车辆问题负责。',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-pink-400 font-bold shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">知识产权</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              本网站的设计、代码、Logo 等原创内容归 CarSound 所有。网站中展示的音效文件的版权归原作者所有。我们尊重知识产权，如有版权问题请及时联系我们。
            </p>
            <p className="text-slate-300 leading-relaxed">
              如果您认为本网站上的内容侵犯了您的知识产权，请通过联系页面与我们取得联系，我们将及时处理。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">免责声明</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              本网站按&ldquo;现状&rdquo;提供，不作出任何明示或默示的保证，包括但不限于适销性、特定用途适用性和非侵权性的保证。
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              我们不对以下情况负责：
            </p>
            <ul className="space-y-2 text-slate-300">
              <li>• 因使用或无法使用本网站服务造成的任何直接或间接损失。</li>
              <li>• 因下载和使用音效文件导致车辆系统故障或保修问题。</li>
              <li>• 第三方网站链接内容的准确性或可靠性。</li>
              <li>• 因不可抗力或其他非我们控制的因素导致的服务中断。</li>
            </ul>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">第三方链接</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              本网站可能包含指向第三方网站或服务的链接（如京东、夸克网盘、Google AdSense 等）。这些链接仅为方便用户提供，我们不对第三方网站的内容、隐私政策或实践负责。
            </p>
            <p className="text-slate-300 leading-relaxed">
              您在访问第三方链接时，应自行阅读并遵守相关网站的使用条款和隐私政策。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">适用法律</h2>
            <p className="text-slate-300 leading-relaxed">
              本使用条款受中华人民共和国法律管辖并依其解释。因本条款引起的争议，双方应友好协商解决；协商不成的，任何一方均可向有管辖权的法院提起诉讼。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">联系我们</h2>
            <p className="text-slate-300 leading-relaxed">
              如果您对本使用条款有任何疑问，请通过以下方式联系我们：
            </p>
            <ul className="space-y-2 text-slate-300 mt-3">
              <li>• 邮箱：contact@carsound.top</li>
              <li>• 通过网站 <Link href="/contact" className="text-pink-400 hover:text-pink-300">联系页面</Link></li>
            </ul>
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
          <Link href="/contact" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
}
