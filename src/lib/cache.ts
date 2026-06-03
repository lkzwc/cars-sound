/**
 * 客户端分类缓存
 * 使用 sessionStorage 缓存分类列表，避免每次切换分类都重新请求。
 * 首页首次加载后写入缓存，分类页读取缓存即可获取导航。
 */

export interface CachedCategory {
  slug: string;
  name: string;
  displayName: string;
  count: number;
}

const CACHE_KEY = 'carsound_categories';
const CACHE_TTL = 10 * 60 * 1000; // 10 分钟

export function getCachedCategories(): CachedCategory[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function setCachedCategories(categories: CachedCategory[]): void {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: categories, timestamp: Date.now() }),
    );
  } catch {
    // sessionStorage 不可用时静默失败
  }
}
