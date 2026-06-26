import type { Metadata } from 'next';
import Link from 'next/link';
import CyberBackground from '@/components/CyberBackground';

export const metadata: Metadata = {
  title: '隐私政策 - CarSound 车机音效下载平台',
  description: 'CarSound 隐私政策，详细说明我们如何收集、使用和保护用户信息。我们承诺保护您的隐私，不收集不必要的个人信息。',
  keywords: ['隐私政策', 'CarSound', '用户隐私', '数据保护'],
  openGraph: {
    title: '隐私政策 - CarSound',
    description: 'CarSound 隐私政策，了解我们如何保护您的个人信息。',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: 'https://carsound.top/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#08080d] relative flex flex-col">
      <CyberBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex-1 w-full">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-6 backdrop-blur">
            隐私政策
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            隐私政策
          </h1>
          <p className="text-slate-400 text-sm">最后更新日期：2026年6月</p>
        </div>

        <div className="space-y-8">
          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">引言</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              CarSound（以下简称&ldquo;我们&rdquo;）深知个人信息对您的重要性，我们将按法律法规要求，采取相应的安全保护措施，尽力保护您的个人信息安全可控。我们希望通过本隐私政策向您说明我们在您使用我们的服务时，如何收集、使用、存储和共享您的信息。
            </p>
            <p className="text-slate-300 leading-relaxed">
              请您仔细阅读本隐私政策。如您不同意本隐私政策中的任何条款，请立即停止使用我们的服务。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">我们收集的信息</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              CarSound 是一个以浏览和下载音效文件为主要功能的网站，我们坚持最小化数据收集原则：
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold shrink-0">•</span>
                <div>
                  <p className="text-white font-medium mb-1">自动收集的技术信息</p>
                  <p className="text-slate-400 text-sm">当您访问我们的网站时，服务器会自动记录基本的访问日志，包括 IP 地址、浏览器类型、访问时间、访问页面等。这些信息仅用于网站运行的维护和优化。</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold shrink-0">•</span>
                <div>
                  <p className="text-white font-medium mb-1">Cookie 和类似技术</p>
                  <p className="text-slate-400 text-sm">我们使用必要的 Cookie 来维持网站的基本功能，以及 Google AdSense 等第三方服务可能使用的 Cookie。您可以在浏览器设置中管理或禁用 Cookie。</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold shrink-0">•</span>
                <div>
                  <p className="text-white font-medium mb-1">联系我们时提供的信息</p>
                  <p className="text-slate-400 text-sm">当您通过联系表单或邮箱与我们取得联系时，您主动提供的信息将仅用于回复您的咨询。</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">信息的使用</h2>
            <p className="text-slate-300 leading-relaxed mb-4">我们收集的信息将用于以下目的：</p>
            <ul className="space-y-2 text-slate-300">
              <li>• 提供、维护和改进我们的网站服务</li>
              <li>• 分析网站访问情况，优化用户体验</li>
              <li>• 检测和防止技术问题或安全风险</li>
              <li>• 响应您的咨询和反馈</li>
              <li>• 遵守适用的法律法规要求</li>
            </ul>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">第三方服务</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              我们的网站可能包含指向第三方网站或服务的链接，以及使用以下第三方服务：
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold shrink-0">•</span>
                <div>
                  <p className="text-white font-medium mb-1">Google AdSense</p>
                  <p className="text-slate-400 text-sm">我们使用 Google AdSense 展示广告。Google 使用 Cookie 来展示基于您兴趣的广告。您可以访问 Google 广告设置来管理个性化广告偏好。</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold shrink-0">•</span>
                <div>
                  <p className="text-white font-medium mb-1">Cloudflare</p>
                  <p className="text-slate-400 text-sm">我们的网站托管在 Cloudflare Pages 平台上，并可能使用其 CDN 和安全服务。</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-400 font-bold shrink-0">•</span>
                <div>
                  <p className="text-white font-medium mb-1">夸克网盘</p>
                  <p className="text-slate-400 text-sm">车载音乐的下载服务通过夸克网盘提供，使用夸克网盘服务时需遵守其隐私政策。</p>
                </div>
              </li>
            </ul>
            <p className="text-slate-400 text-sm mt-4">
              对于这些第三方网站的隐私实践，我们无法控制且不承担任何责任。建议您在访问前阅读其隐私政策。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">信息安全与存储</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              我们采取合理的技术和管理措施来保护您的信息免遭未经授权的访问、使用或泄露。我们存储的信息仅保留至实现收集目的所需的最短期限。
            </p>
            <p className="text-slate-300 leading-relaxed">
              请注意，尽管我们采取了安全措施，但没有任何互联网传输或电子存储方法是 100% 安全的。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">儿童隐私</h2>
            <p className="text-slate-300 leading-relaxed">
              我们的服务不针对 13 周岁以下的儿童。我们不会故意收集儿童的个人信息。如发现儿童向我们提供了个人信息，请与我们联系，我们将及时删除。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">隐私政策的更新</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              我们可能会不时更新本隐私政策。更新后的版本将在本页面发布，并更新顶部的&ldquo;最后更新日期&rdquo;。
            </p>
            <p className="text-slate-300 leading-relaxed">
              我们鼓励您定期查阅本隐私政策，以了解我们如何保护您的信息。
            </p>
          </section>

          <section className="p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-4">联系我们</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式联系我们：
            </p>
            <ul className="space-y-2 text-slate-300">
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
          <Link href="/terms" className="text-slate-400 hover:text-pink-400 transition-colors text-sm">
            使用条款
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
