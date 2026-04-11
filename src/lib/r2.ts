import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { CATEGORY_SLUGS, CATEGORY_DISPLAY_NAMES, SLUG_TO_CATEGORY, CATEGORIES } from '@/config/categories';

// 检查凭证是否可用
function hasValidCredentials(): boolean {
  return !!(
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY
  );
}

// 凭证配置
const r2Config = hasValidCredentials() ? {
  region: 'auto' as const,
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
} : null;

// 仅在有凭证时创建客户端
const r2Client = r2Config ? new S3Client(r2Config) : null;

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'sound';

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
export { CATEGORY_SLUGS, CATEGORY_DISPLAY_NAMES, SLUG_TO_CATEGORY, BUCKET_NAME, r2Client };

export async function listAudioFiles(): Promise<AudioFile[]> {
  if (!r2Client) {
    console.warn('R2 client not available, returning empty list');
    return [];
  }
  
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
    });
    
    const response = await r2Client.send(command);
    
    if (!response.Contents) {
      return [];
    }
    
    return response.Contents
      .filter(item => {
        const ext = item.Key?.toLowerCase();
        return ext?.endsWith('.mp3') || ext?.endsWith('.wav') || ext?.endsWith('.ogg') || ext?.endsWith('.m4a');
      })
      .map(item => {
        const key = item.Key!;
        const parts = key.split('/');
        const hasCategory = parts.length > 1;
        const category = hasCategory ? parts[0] : '其他';
        const name = parts.pop() || key;
        
        return {
          key,
          name,
          category,
          size: item.Size || 0,
          lastModified: item.LastModified || new Date(),
          url: `/api/audio/${encodeURIComponent(key)}`,
        };
      })
      .sort((a, b) => {
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

export async function getAudioFile(key: string) {
  if (!r2Client) {
    return null;
  }
  
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    
    const response = await r2Client.send(command);
    
    return {
      stream: response.Body,
      contentType: response.ContentType || 'audio/mpeg',
      contentLength: response.ContentLength,
    };
  } catch (error) {
    console.error('Error getting audio file:', error);
    return null;
  }
}

export async function uploadAudioFile(file: File, category: string = '其他'): Promise<boolean> {
  if (!r2Client) {
    return false;
  }
  
  try {
    const fileKey = `${category}/${file.name}`;
    const buffer = await file.arrayBuffer();
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: Buffer.from(buffer),
      ContentType: file.type || 'audio/mpeg',
    });
    
    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error('Error uploading audio file:', error);
    return false;
  }
}
