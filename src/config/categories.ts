// 分类配置文件
// R2中文文件夹名 -> 英文slug映射

export interface CategoryConfig {
  name: string;           // R2文件夹名（中文）
  slug: string;           // URL slug（英文）
  displayName: string;    // 界面显示名（中文）
  title: string;          // SEO title
  description: string;    // SEO description
}

export const CATEGORIES: CategoryConfig[] = [
  {
    name: '公主请上车',
    slug: 'princess',
    displayName: '公主请上车音效',
    title: '公主请上车音效下载 - 特斯拉锁车音效 | Cars Sound',
    description: '公主请上车音效下载，包含多个版本，适用于特斯拉、理想、蔚来、小鹏等车型，一键下载安装教程。',
  },
  {
    name: '公主请下车',
    slug: 'princess-leave',
    displayName: '公主请下车音效',
    title: '公主请下车音效下载 - 搞笑车机音效 | Cars Sound',
    description: '公主请下车音效下载，搞笑风格车机音效，让你的乘客会心一笑。',
  },
  {
    name: '王子请上车',
    slug: 'prince',
    displayName: '王子请上车音效',
    title: '王子请上车音效下载 - 搞笑车机音效 | Cars Sound',
    description: '王子请上车音效下载，搞笑风格车机音效，让你的乘客会心一笑。',
  },
  {
    name: '变形金刚语音包',
    slug: 'transformers',
    displayName: '变形金刚语音包',
    title: '变形金刚语音包下载 - 汽车人变形音效 | Cars Sound',
    description: '变形金刚语音包下载，汽车人变形出发等经典音效，让你的爱车变身变形金刚。',
  },
  {
    name: '贾维斯',
    slug: 'jarvis',
    displayName: '贾维斯/钢铁侠语音',
    title: '贾维斯/钢铁侠语音下载 - AI助手音效 | Cars Sound',
    description: '贾维斯语音包下载，钢铁侠AI助手音效，科技感十足的车机音效，支持特斯拉等车型。',
  },
  {
    name: '蛋仔派对',
    slug: 'eggy-party',
    displayName: '蛋仔派对音效',
    title: '蛋仔派对音效下载 - 可爱车机音效 | Cars Sound',
    description: '蛋仔派对音效下载，可爱风格车机音效，适合年轻车主。',
  },
  {
    name: '红警语音包',
    slug: 'red-alert',
    displayName: '红警语音包',
    title: '红警语音包下载 - 经典游戏音效 | Cars Sound',
    description: '红警语音包下载，经典游戏音效，怀旧玩家的最爱。',
  },
  {
    name: '王者荣耀',
    slug: 'honor-of-kings',
    displayName: '王者荣耀音效',
    title: '王者荣耀音效下载 - 王者荣耀语音包 | Cars Sound',
    description: '王者荣耀音效下载，击杀、五杀、胜利等经典音效，游戏玩家必备。',
  },
  {
    name: '大疆音效',
    slug: 'dji',
    displayName: '大疆音效',
    title: '大疆音效下载 - 无人机音效 | Cars Sound',
    description: '大疆音效下载，无人机经典音效，科技感十足。',
  },
  {
    name: '复古广告合集',
    slug: 'retro-ads',
    displayName: '复古广告音效',
    title: '复古广告音效下载 - 经典广告音效 | Cars Sound',
    description: '复古广告音效下载，经典广告音效，怀旧风格。',
  },
  {
    name: '国外动画',
    slug: 'anime',
    displayName: '动漫音效',
    title: '动漫音效下载 - 动漫车机音效 | Cars Sound',
    description: '动漫音效下载，国外动画风格车机音效，二次元车主必备。',
  },
  {
    name: '角色',
    slug: 'characters',
    displayName: '角色语音包',
    title: '角色语音包下载 - 人物车机音效 | Cars Sound',
    description: '角色语音包下载，各种人物角色音效，个性化你的车机。',
  },
  {
    name: '游戏',
    slug: 'games',
    displayName: '游戏音效',
    title: '游戏音效下载 - 王者荣耀/英雄联盟音效 | Cars Sound',
    description: '游戏音效下载，王者荣耀、英雄联盟等游戏经典音效，游戏玩家必备。',
  },
  {
    name: '其他',
    slug: 'others',
    displayName: '精选音效',
    title: '精选音效下载 - 热门车机音效 | Cars Sound',
    description: '精选音效下载，各种风格车机音效任你选择。',
  },
];

// 生成映射表
export const CATEGORY_SLUGS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.name, c.slug])
);

export const CATEGORY_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c.displayName])
);

export const CATEGORY_TITLES: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c.title])
);

export const CATEGORY_DESCRIPTIONS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c.description])
);

// 反向映射：英文slug -> 中文分类名
export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c.name])
);
