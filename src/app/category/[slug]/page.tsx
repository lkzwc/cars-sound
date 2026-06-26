'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';
import CyberBackground from '@/components/CyberBackground';
import { SLUG_TO_CATEGORY, CATEGORIES } from '@/lib/r2';
import { getCachedCategories } from '@/lib/cache';

interface AudioFile {
  key: string;
  name: string;
  category: string;
  size: number;
  lastModified: string;
  url: string;
}

const ITEMS_PER_PAGE = 20;

// 根据分类名生成描述文字
function getCategoryDescription(displayName: string): string {
  const descriptions: Record<string, string> = {
    '公主请上车': '火爆全网的"公主请上车"系列音效，让你的爱车在解锁时响起温柔的公主欢迎音，仪式感拉满。包含多种变体版本，适配不同场景使用。',
    '公主请下车': '下车也要有仪式感！"公主请下车"系列音效，温柔提醒乘客安全下车，让每一次到达都充满温馨。',
    '王子请上车': '男车主专属！"王子请上车"系列锁车迎宾音效，帅气又有范，给你不一样的驾驶仪式感。',
    '变形金刚': '大黄蜂、擎天柱等变形金刚经典角色语音包，解锁/锁车时唤起童年回忆，机械变形音效燃爆全场。',
    '贾维斯/钢铁侠': '钢铁侠战甲AI贾维斯风格语音包，科幻范十足。让你的特斯拉变身托尼·斯塔克的专属座驾。',
    '邪恶摇粒绒': '网络热梗"邪恶摇粒绒"音效合集，搞笑又魔性，最适合喜欢玩梗的车主。',
    '蛋仔派对': '蛋仔派对游戏经典音效与角色语音，可爱又欢乐，适合年轻车主和蛋仔爱好者。',
    '红警语音包': '红色警戒经典语音包，命令与征服风格提示音，怀旧游戏玩家的最爱。',
    '王者荣耀': '王者荣耀英雄语音与经典音效，游戏玩家专属，让爱车充满王者气息。',
    '国内动画': '国产经典动画音效与角色语音，喜羊羊、熊出没等国漫IP，回忆童年经典。',
    '国外动画': '海外经典动画音效合集，迪士尼、漫威、日漫等角色语音，国际范十足。',
    '角色语音包': '各类热门角色语音定制包，涵盖影视、动漫、游戏等多元IP角色，一人一音效。',
    '大疆音效': '大疆无人机风格音效，科技感十足，适合喜欢数码和无人机的车主。',
    '奥迪/宝马': '奥迪、宝马等豪华品牌风格音效，让每一辆车都能感受德系豪华的声音质感。',
    '复古广告': '经典广告词和复古音效，怀旧风格满满，让你的锁车音效别具一格。',
    '网络热梗': '紧跟网络热点，收录最新最火的网络热梗音效，让你的爱车走在潮流前线。',
    '游戏音效': '经典游戏音效大合集，涵盖FC红白机、街机、3A大作等游戏提示音和背景音效。',
    '系统提示': '各类科技感系统提示音效，仿手机、电脑操作系统风格，简洁利落适合商务车主。',
    '生活音效': '日常生活中的趣味音效，门铃声、动物叫声、自然声音等，贴近生活的个性化选择。',
    '搞笑/段子': '搞笑段子和幽默音效合集，让你的锁车音效成为街头最靓的风景线。',
    '精选音效': '综合精选的高品质车机音效，涵盖多种风格和使用场景，适合初次接触车机自定义音效的用户。',
  };
  return descriptions[displayName] || `${displayName}系列车机音效，精选高品质音频文件，适用于特斯拉、理想、蔚来、小鹏等车型的车机自定义提示音设置。在线试听，免费下载，让你的爱车与众不同。`;
}

// 多策略解析 slug → 分类名，确保无论 R2 文件夹是什么名都能匹配
function resolveCategoryBySlug(slug: string): { name: string; displayName: string } | null {
  // 1. 在 CATEGORIES 配置中按 slug 查找
  const config = CATEGORIES.find(c => c.slug === slug);
  if (config) return { name: config.name, displayName: config.displayName };

  // 2. English slug → Chinese name (如 princess → 公主请上车)
  const chineseName = SLUG_TO_CATEGORY[slug];
  if (chineseName) {
    const displayName = CATEGORIES.find(c => c.name === chineseName)?.displayName || chineseName;
    return { name: chineseName, displayName };
  }

  // 3. slug 可能就是中文分类名（如 游戏音效 → 游戏音效）
  const byName = CATEGORIES.find(c => c.name === slug);
  if (byName) return { name: byName.name, displayName: byName.displayName };

  // 4. 完全未知的 slug — 直接用 slug 作为分类名
  return { name: slug, displayName: slug };
}

// 骨架屏
function SkeletonCard() {
  return (
    <div className="p-3 bg-white/[0.02] backdrop-blur border border-white/5 rounded-xl animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-white/[0.05] rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-white/[0.05] rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-white/[0.05] rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-1.5 bg-slate-700/50 rounded-full"></div>
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // 多策略解析 slug → 分类名
  const resolved = useMemo(() => resolveCategoryBySlug(slug), [slug]);
  const categoryName = resolved?.name || '';
  const displayName = resolved?.displayName || slug;
  
  const [files, setFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // 从缓存读取全部分类（用于导航栏），不重新请求
  const allNavCategories = useMemo(() => {
    const cached = getCachedCategories();
    if (cached && cached.length > 0) {
      return cached;
    }
    // 缓存未命中时降级使用 CATEGORIES 配置
    return CATEGORIES.map(c => ({
      slug: c.slug,
      displayName: c.displayName,
      name: c.name,
      count: 0,
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPage(1);
      try {
        const response = await fetch(`/api/audio-list?category=${encodeURIComponent(categoryName)}`);
        const data = await response.json();
        setFiles(data.files || []);
        setTotalCount(data.total || 0);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (categoryName) {
      fetchData();
    }
  }, [categoryName]);
  
  const categoryFiles = files;
  
  // 分页
  const totalPages = Math.ceil(categoryFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = categoryFiles.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  if (!loading && !categoryName) {
    return (
      <div className="min-h-screen bg-[#08080d] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl text-white mb-4">分类不存在</h1>
          <a href="/" className="text-pink-400 hover:text-pink-300">返回首页</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080d] relative overflow-hidden flex flex-col">
      <CyberBackground />

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10 flex-1 w-full">
        {/* 分类标题 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm mb-4">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            分类音效
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              {displayName || '加载中...'}
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            共 {totalCount} 个音效，适用于特斯拉、理想、蔚来、小鹏等车型
          </p>
        </div>

        {/* 其他分类导航 - 始终显示全部分类 */}
        {/* 分类介绍 */}
        <div className="mb-10 max-w-2xl mx-auto text-center">
          <div className="p-6 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
            <h2 className="text-white font-bold mb-2">{displayName}音效有什么？</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {getCategoryDescription(displayName)}
            </p>
          </div>
        </div>

        {/* 其他分类导航 - 始终显示全部分类 */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {allNavCategories
            .filter(c => c.slug !== slug)
            .map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-4 py-2 bg-white/[0.03] backdrop-blur text-slate-300 hover:bg-white/[0.06] border border-white/5 hover:border-pink-500/30 rounded-xl font-medium transition-all duration-300 text-sm"
              >
                {cat.displayName}
              </a>
            ))}
        </div>

        {/* 音效列表 */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedFiles.map((file, index) => (
                <div
                  key={file.key}
                  className="transform hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <AudioPlayer
                    src={file.url}
                    title={file.name.replace(/\.(mp3|wav|ogg|m4a)$/i, '')}
                  />
                </div>
              ))}
            </div>

            {/* 加载更多 */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 bg-white/[0.03] backdrop-blur border border-white/5 text-slate-300 hover:bg-white/[0.06] hover:border-pink-500/30 rounded-xl font-medium transition-all duration-300"
                >
                  加载更多 ({categoryFiles.length - page * ITEMS_PER_PAGE} 个剩余)
                </button>
              </div>
            )}
          </>
        )}

        {/* 空状态 */}
        {!loading && categoryFiles.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-slate-400 text-lg">该分类暂无音效</p>
            <a href="/" className="inline-block mt-4 text-pink-400 hover:text-pink-300">返回首页</a>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-white/5 mt-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden">
              <img src="/logo.png" alt="CarSound" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white">CarSound</span>
          </a>
        </div>
        <p className="text-slate-400 text-sm mb-3">音频来源于网络，仅供娱乐</p>
        <div className="flex justify-center gap-4 mb-3">
          <a href="/about" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">关于我们</a>
          <a href="/privacy" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">隐私政策</a>
          <a href="/terms" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">使用条款</a>
          <a href="/contact" className="text-slate-500 hover:text-pink-400 transition-colors text-xs">联系我们</a>
        </div>
        <p className="text-slate-600 text-xs mt-2">© 2026 CarSound. All rights reserved.</p>
      </footer>
    </div>
  );
}
