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
  slug: string;        // 英文slug，用于URL
  name: string;        // R2原始分类名（中文）
  displayName: string; // 中文显示名
  count: number;
}

// 分类名称映射（R2中文文件夹名 -> 英文slug）
export const CATEGORY_SLUGS: Record<string, string> = {
  '公主请上车': 'princess',
  '王子请上车': 'prince',
  '变形金刚语音包': 'transformers',
  '贾维斯': 'jarvis',
  '蛋仔派对': 'eggy-party',
  '红警语音包': 'red-alert',
  '大疆音效': 'dji',
  '复古广告合集': 'retro-ads',
  '国外动画': 'anime',
  '角色': 'characters',
  '游戏': 'games',
  '其他': 'others',
};

// 英文slug -> 中文显示名
export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  'princess': '公主请上车音效',
  'prince': '王子请上车音效',
  'transformers': '变形金刚语音包',
  'jarvis': '贾维斯/钢铁侠语音',
  'eggy-party': '蛋仔派对音效',
  'red-alert': '红警语音包',
  'dji': '大疆音效',
  'retro-ads': '复古广告音效',
  'anime': '动漫音效',
  'characters': '角色语音包',
  'games': '游戏音效',
  'others': '精选音效',
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
      slug: CATEGORY_SLUGS[name] || name,  // 转换为英文slug
      name,
      displayName: CATEGORY_DISPLAY_NAMES[CATEGORY_SLUGS[name]] || name,
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
