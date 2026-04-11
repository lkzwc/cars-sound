import { CATEGORY_SLUGS, CATEGORY_DISPLAY_NAMES, SLUG_TO_CATEGORY, CATEGORIES } from '@/config/categories';

// R2 Bucket类型
interface R2Bucket {
  list(options?: { prefix?: string; delimiter?: string; cursor?: string; limit?: number }): Promise<{
    objects: Array<{
      key: string;
      size: number;
      uploaded: Date;
      httpMetadata?: { contentType?: string };
    }>;
    truncated: boolean;
    cursor?: string;
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
export { CATEGORY_SLUGS, CATEGORY_DISPLAY_NAMES, SLUG_TO_CATEGORY };

export async function listAudioFiles(bucket?: R2Bucket | null): Promise<AudioFile[]> {
  if (!bucket) {
    console.warn('R2 bucket not available, returning empty list');
    return [];
  }
  
  try {
    const objects = await bucket.list({
      prefix: '',
    });
    
    const files: AudioFile[] = [];
    
    for (const obj of objects.objects) {
      if (!obj.key) continue;
      
      const ext = obj.key.toLowerCase();
      if (!ext.endsWith('.mp3') && !ext.endsWith('.wav') && !ext.endsWith('.ogg') && !ext.endsWith('.m4a')) {
        continue;
      }
      
      const parts = obj.key.split('/');
      const hasCategory = parts.length > 1;
      const category = hasCategory ? parts[0] : '其他';
      const name = parts.pop() || obj.key;
      
      files.push({
        key: obj.key,
        name,
        category,
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
  
  const allCategories = CATEGORIES.map(config => ({
    slug: config.slug,
    name: config.name,
    displayName: config.displayName,
    count: categoryMap.get(config.name) || 0,
  }));
  
  return allCategories.sort((a, b) => b.count - a.count);
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
