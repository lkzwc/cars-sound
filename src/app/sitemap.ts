import { MetadataRoute } from 'next'
import { listAudioFiles, getCategories } from '@/lib/r2';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://carssound.com'
  
  // 获取所有分类
  let categories: { name: string; count: number }[] = [];
  try {
    const files = await listAudioFiles();
    categories = getCategories(files);
  } catch (error) {
    console.error('Failed to get categories for sitemap:', error);
  }
  
  // 首页
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
  
  // 分类页面
  categories.forEach((cat) => {
    routes.push({
      url: `${baseUrl}/category/${encodeURIComponent(cat.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });
  
  return routes;
}
