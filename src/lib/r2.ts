import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

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
  name: string;
  displayName: string;  // SEO友好的显示名称
  count: number;
}

// 分类名称映射（原始名称 -> SEO友好名称）
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  '公主请上车': '公主请上车音效',
  '王子请上车': '王子请上车音效',
  '变形金刚语音包': '变形金刚语音包',
  '贾维斯': '贾维斯/钢铁侠语音',
  '蛋仔派对': '蛋仔派对音效',
  '红警语音包': '红警语音包',
  '大疆音效': '大疆音效',
  '复古广告合集': '复古广告音效',
  '国外动画': '动漫音效',
  '角色': '角色语音包',
  '游戏': '游戏音效',
  '其他': '精选音效',
};

export async function listAudioFiles(): Promise<AudioFile[]> {
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
        // 先按分类排序，再按名称排序
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
  
  // 按数量排序，数量多的排前面
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ 
      name, 
      displayName: CATEGORY_DISPLAY_NAMES[name] || name,
      count 
    }))
    .sort((a, b) => b.count - a.count);
}

export async function getAudioFile(key: string) {
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

export { r2Client, BUCKET_NAME };
