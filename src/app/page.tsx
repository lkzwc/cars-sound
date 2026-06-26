'use client';

import { useState, useEffect, useCallback } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import CyberBackground from '@/components/CyberBackground';
import JsonLd from '@/components/JsonLd';
import { setCachedCategories } from '@/lib/cache';

interface AudioFile {
  key: string;
  name: string;
  category: string;
  size: number;
  lastModified: string;
  url: string;
}

interface Category {
  slug: string;
  name: string;
  displayName: string;
  count: number;
}

const ITEMS_PER_PAGE = 20;

// 分类Tab骨架屏
function SkeletonTabs() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-shrink-0 h-10 w-24 bg-white/[0.03] rounded-full animate-pulse" />
      ))}
    </div>
  );
}

// 音频列表骨架屏
function SkeletonList() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-white/[0.02] rounded-xl animate-pulse" />
      ))}
    </div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>('');
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [page, setPage] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);

  // 首次加载：获取全部分类
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resp = await fetch('/api/audio-list');
        const data = await resp.json();
        const cats: Category[] = (data.categories || []).sort((a: Category, b: Category) => {
          if (a.name === '其他') return 1;
          if (b.name === '其他') return -1;
          return b.count - a.count;
        });
        setCategories(cats);
        setTotalFiles((data.files || []).length);
        // 缓存分类
        if (cats.length) {
          setCachedCategories(cats.map((c: Category) => ({
            slug: c.slug,
            name: c.name,
            displayName: c.displayName,
            count: c.count,
          })));
        }
        // 默认选中第一个分类
        if (cats.length > 0) {
          setActiveSlug(cats[0].slug);
        }
      } catch (err) {
        console.error('获取分类失败:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 切换分类时拉取该分类的音频文件
  useEffect(() => {
    if (!activeSlug) return;
    const cat = categories.find(c => c.slug === activeSlug);
    if (!cat) return;

    setPage(1);
    setFiles([]);
    setLoadingFiles(true);

    const fetchFiles = async () => {
      try {
        const resp = await fetch(`/api/audio-list?category=${encodeURIComponent(cat.name)}`);
        const data = await resp.json();
        setFiles(data.files || []);
      } catch (err) {
        console.error('获取文件失败:', err);
      } finally {
        setLoadingFiles(false);
      }
    };
    fetchFiles();
  }, [activeSlug, categories]);

  const activeCategory = categories.find(c => c.slug === activeSlug);
  const paginatedFiles = files.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedFiles.length < files.length;

  const loadMore = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-[#08080d] relative flex flex-col">
        <CyberBackground />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 flex-1 w-full">
          {/* 头部 */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
              <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
                为您的爱车定制专属音效
              </span>
            </h1>
            <p className="text-slate-400 text-sm">
              {totalFiles} 个音效 · {categories.length} 个分类
            </p>
          </div>

          {/* 分类Tab栏 */}
          <div className="mb-6">
            {loading ? (
              <SkeletonTabs />
            ) : (
              <div
                className="flex flex-wrap gap-2"
              >
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    data-slug={cat.slug}
                    onClick={() => setActiveSlug(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeSlug === cat.slug
                        ? 'bg-pink-500 text-black font-semibold shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                        : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/5'
                    }`}
                  >
                    {cat.displayName}
                    <span className={`ml-1.5 text-xs ${activeSlug === cat.slug ? 'text-black/60' : 'text-slate-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 音频列表 */}
          <div>
            {loadingFiles ? (
              <SkeletonList />
            ) : activeCategory && paginatedFiles.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">
                    {activeCategory.displayName}
                    <span className="text-sm text-slate-400 font-normal ml-2">
                      共 {files.length} 个
                    </span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {paginatedFiles.map(file => (
                    <AudioPlayer
                      key={file.key}
                      src={file.url}
                      title={file.name}
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={loadMore}
                      className="px-8 py-2.5 bg-white/[0.03] text-slate-300 rounded-full border border-white/5 hover:border-pink-500/30 hover:text-white transition-all duration-300 text-sm"
                    >
                      加载更多 ({files.length - paginatedFiles.length} 个)
                    </button>
                  </div>
                )}
              </>
            ) : activeCategory && !loadingFiles ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🎵</div>
                <p className="text-slate-400">该分类暂无音效</p>
              </div>
            ) : null}
          </div>        </main>

          {/* ====== 使用教程 ====== */}
          <section className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                如何<span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">使用</span>？
              </h2>
              <p className="text-slate-400 text-sm">简单四步，让你的爱车焕然一新</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: '01', icon: '🔍', title: '选择音效', desc: '按分类浏览，在线试听找到喜欢的音效。支持锁车音效、迎宾音效、搞笑语音等多种类型。' },
                { step: '02', icon: '📥', title: '下载文件', desc: '点击播放器右侧下载按钮，将音效文件保存到电脑或手机中。' },
                { step: '03', icon: '💾', title: '传到车机', desc: '将下载的 MP3 文件通过 U 盘传输到车机系统。特斯拉可放入 Boombox 文件夹。' },
                { step: '04', icon: '✅', title: '设置生效', desc: '在车机设置中找到提示音/锁车音选项，选择你导入的自定义音效即可生效。' },
              ].map((item) => (
                <div key={item.step} className="p-6 bg-white/[0.03] backdrop-blur border border-white/5 rounded-2xl hover:border-pink-500/20 hover:shadow-[0_0_20px_rgba(236,72,153,0.05)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-black text-pink-400/60">{item.step}</span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ====== 为什么选择我们 ====== */}
          <section className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                为什么选择 <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">CarSound</span>？
              </h2>
              <p className="text-slate-400 text-sm">打造最好用的车机音效下载平台</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '🎵', title: '海量资源', desc: '数千个精选音效，涵盖锁车音、迎宾音、搞笑段子、影视语音包、热门歌曲等，持续更新中。' },
                { icon: '⚡', title: '免费下载', desc: '所有车机音效完全免费下载，车载音乐通过夸克网盘免费提供，无需注册即可使用。' },
                { icon: '🔄', title: '持续更新', desc: '紧追网络热梗和流行文化，第一时间更新热门音效资源，让爱车音效永不过时。' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/[0.03] backdrop-blur border border-white/5 rounded-2xl text-center hover:border-pink-500/20 transition-all duration-300">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ====== 常见问题 FAQ ====== */}
          <section className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                常见<span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">问题</span>
              </h2>
              <p className="text-slate-400 text-sm">你想知道的基本都在这里</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  q: '音效下载要收费吗？',
                  a: '完全免费。本站所有车机音效均免费下载，车载音乐如有特殊需求可通过定制服务联系。我们的运营主要依靠广告收入。',
                },
                {
                  q: '支持哪些品牌的车型？',
                  a: '音效文件为通用 MP3/WAV 格式，理论上兼容所有支持自定义提示音的车机。经过用户验证的车型包括特斯拉全系、理想全系、蔚来全系、小鹏全系等主流智能电动车。',
                },
                {
                  q: '修改车机音效会影响保修吗？',
                  a: '替换提示音相当于更换铃声，不会动到底层系统，一般不影响保修。但如需在保修期内维修，建议咨询对应品牌的售后服务中心。不同品牌政策可能略有差异。',
                },
                {
                  q: '音效质量怎么样？',
                  a: '我们精选高品质音效文件，音质清晰，确保在车内播放效果良好。每个音效都支持在线试听，你可以先听后下。',
                },
                {
                  q: '如果有喜欢的音效找不到怎么办？',
                  a: '欢迎通过站内联系页面或邮箱 contact@carsound.top 告知我们，我们会尽量满足需求。你也可以选择语音包定制服务，制作专属音效。',
                },
                {
                  q: '车载音乐怎么下载？',
                  a: '点击导航栏「车载音乐」进入下载页面，抖音热门歌曲、经典老歌等都可以通过夸克网盘免费下载。另有京东自营车载音乐 U 盘可直接购买。',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                  <h3 className="text-white font-bold mb-2 text-sm">{item.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ====== 底部 CTA ====== */}
          <div className="mt-16 p-8 bg-white/[0.03] backdrop-blur border border-white/5 rounded-3xl text-center">
            <h3 className="text-xl font-bold text-white mb-3">还没找到满意的音效？</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
              我们提供个性化语音包定制服务，专属音色 + 定制内容，打造独一无二的车机音效。
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/custom"
                className="px-8 py-3 bg-pink-500 text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300 text-sm inline-block"
              >
                开始定制
              </a>
              <a
                href="/music"
                className="px-8 py-3 bg-white/[0.04] text-slate-300 rounded-full border border-white/10 hover:border-pink-500/30 hover:text-white transition-all duration-300 text-sm inline-block"
              >
                下载歌曲
              </a>
            </div>
          </div>

        {/* Footer */}
        <footer className="relative z-10 text-center py-8 border-t border-white/5 mt-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden">
              <img src="/logo.png" alt="CarSound" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-bold text-white">CarSound</span>
          </div>
          <p className="text-slate-400 text-sm mb-3">音频来源于网络，仅供娱乐</p>
          <div className="flex justify-center gap-4 mb-3">
            <a href="/about" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">关于我们</a>
            <a href="/privacy" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">隐私政策</a>
            <a href="/terms" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">使用条款</a>
            <a href="/contact" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">联系我们</a>
          </div>
          <p className="text-slate-500 text-xs">&copy; 2026 CarSound. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
