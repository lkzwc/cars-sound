import { CATEGORY_SLUGS, CATEGORY_DISPLAY_NAMES, SLUG_TO_CATEGORY, CATEGORIES } from '@/config/categories';

// R2 Bucket类型 - 简化版
interface R2Bucket {
  list(options?: { prefix?: string }): Promise<{
    objects: Array<{
      key: string;
      size: number;
      uploaded: Date;
      httpMetadata?: { contentType?: string };
    }>;
  }>;
  get(key: string): Promise<{
    body: ReadableStream;
    size: number;
    httpMetadata?: { contentType?: string };
  } | null>;
  put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }): Promise<void>;
}

export interface AudioFile {
  key: string;
  name: string;
  category: string;
  size: number;
  lastModified: Date;
  url: string;
}

export interface Category {
  slug: string;
  name: string;
  displayName: string;
  count: number;
}

// 导出映射表
export { CATEGORY_SLUGS, CATEGORY_DISPLAY_NAMES, SLUG_TO_CATEGORY, CATEGORIES };

// 从 R2 对象键中提取顶层文件夹（分类名）
// 并归一化为 categories.ts 中定义的中文名称，解决 R2 文件夹名
// 可能是英文 slug（rename-categories.ts 导致）或原始中文名的兼容问题
function normalizeCategory(rawName: string): string {
  // 如果已经是已知的中文分类名，直接返回
  if (CATEGORY_SLUGS[rawName]) return rawName;
  // 如果是已知的英文 slug，转换为中文
  if (SLUG_TO_CATEGORY[rawName]) return SLUG_TO_CATEGORY[rawName];
  // 未知分类名 — 保留原始值
  return rawName;
}

function extractCategory(key: string): string | null {
  const parts = key.split('/');
  // 跳过非音频文件（如 README、.DS_Store 等）
  const fileName = parts[parts.length - 1];
  const isAudio = /\.(mp3|wav|ogg|m4a)$/i.test(fileName);
  if (!isAudio) return null;
  
  // 有子文件夹 → 第一级为分类名
  if (parts.length > 1) {
    return parts[0];
  }
  // 根目录下的文件 → 归为"其他"
  return '其他';
}

export async function listAudioFiles(bucket?: R2Bucket | null): Promise<AudioFile[]> {
  if (!bucket) {
    console.warn('listAudioFiles: bucket is null/undefined');
    console.warn('globalThis keys:', Object.keys(globalThis).filter(k => k.includes('BUCKET') || k.includes('R2')));
    return [];
  }
  
  try {
    const objects = await bucket.list({
      prefix: '',
    });
    
    const files: AudioFile[] = [];
    
    for (const obj of objects.objects) {
      if (!obj.key) continue;
      
      const category = extractCategory(obj.key);
      if (!category) continue; // 跳过非音频文件

      const normalized = normalizeCategory(category);
      
      const parts = obj.key.split('/');
      const name = parts.pop() || obj.key;
      
      files.push({
        key: obj.key,
        name,
        category: normalized,
        size: obj.size,
        lastModified: obj.uploaded || new Date(),
        url: `/api/audio/${encodeURIComponent(obj.key)}`,
      });
    }
    
    return files.sort((a, b) => {
      const categoryCompare = a.category.localeCompare(b.category, 'zh-CN');
      if (categoryCompare !== 0) return categoryCompare;
      return a.name.localeCompare(b.name, 'zh-CN');
    });
  } catch (error) {
    console.error('Error listing audio files:', error);
    return [];
  }
}

export function getCategories(files: AudioFile[]): Category[] {
  const categoryMap = new Map<string, number>();
  
  files.forEach(file => {
    const count = categoryMap.get(file.category) || 0;
    categoryMap.set(file.category, count + 1);
  });
  
  // 直接从 R2 数据派生分类，config 只提供 URL slug
  const allCategories: Category[] = [];
  
  categoryMap.forEach((count, catName) => {
    const config = CATEGORIES.find(c => c.name === catName);
    const slug = config?.slug || CATEGORY_SLUGS[catName] || pinyinSlug(catName);
    allCategories.push({
      slug,
      name: catName,
      displayName: catName,
      count,
    });
  });
  
  return allCategories.sort((a, b) => {
    // "其他"排最后
    if (a.name === '其他') return 1;
    if (b.name === '其他') return -1;
    return b.count - a.count;
  });
}

// 简单的中文转拼音 slug（用于 R2 中未知的中文分类名）
function pinyinSlug(name: string): string {
  return name
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'unknown';
}

export async function getAudioFile(key: string, bucket?: R2Bucket | null) {
  if (!bucket) {
    return null;
  }
  
  try {
    const object = await bucket.get(key);
    
    if (!object) {
      return null;
    }
    
    return {
      stream: object.body,
      contentType: object.httpMetadata?.contentType || 'audio/mpeg',
      contentLength: object.size,
    };
  } catch (error) {
    console.error('Error getting audio file:', error);
    return null;
  }
}

export async function uploadAudioFile(file: File | ArrayBuffer, name: string, bucket?: R2Bucket | null): Promise<boolean> {
  if (!bucket) {
    return false;
  }
  
  try {
    let body: ArrayBuffer;
    let contentType: string;
    
    if (file instanceof File) {
      body = await file.arrayBuffer();
      contentType = file.type || 'audio/mpeg';
    } else {
      body = file;
      contentType = 'audio/mpeg';
    }
    
    await bucket.put(name, body, {
      httpMetadata: {
        contentType,
      },
    });
    
    return true;
  } catch (error) {
    console.error('Error uploading audio file:', error);
    return false;
  }
}

const BUCKET_NAME = 'sound';
export { BUCKET_NAME };
