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

// 智能分类映射
function smartCategorize(filename: string, originalCategory: string): string {
  const name = filename.toLowerCase();
  
  // 如果已经有分类且不是"其他"，保持原分类
  if (originalCategory && originalCategory !== '其他') {
    return originalCategory;
  }
  
  // 汽车品牌
  if (name.includes('奥迪') || name.includes('aodi') || name.includes('audi')) return '汽车品牌';
  if (name.includes('宝马') || name.includes('bmw')) return '汽车品牌';
  if (name.includes('宾利') || name.includes('bentley')) return '汽车品牌';
  if (name.includes('哈雷') || name.includes('harley')) return '汽车品牌';
  if (name.includes('九号') || name.includes('ninebot')) return '汽车品牌';
  if (name.includes('大疆') || name.includes('dji')) return '汽车品牌';
  if (name.includes('电动车') || name.includes('锁车') || name.includes('挪车')) return '汽车品牌';
  
  // 王者荣耀
  if (name.includes('王者荣耀') || name.includes('王者') || name.includes('五杀') || name.includes('击杀') || name.includes('第一滴血')) return '王者荣耀';
  if (name.includes('高渐离') || name.includes('鲁班') || name.includes('亚瑟')) return '王者荣耀';
  
  // 游戏音效
  if (name.includes('穿越火线') || name.includes('cf') || name.includes('fire')) return '游戏音效';
  if (name.includes('红警') || name.includes('cnc')) return '游戏音效';
  if (name.includes('斗地主')) return '游戏音效';
  if (name.includes('超级玛丽') || name.includes('mario')) return '游戏音效';
  if (name.includes('cs') || name.includes('counter')) return '游戏音效';
  if (name.includes('gta') || name.includes('任务完成') || name.includes('liftoff')) return '游戏音效';
  if (name.includes('gba') || name.includes('xbox') || name.includes('windows') || name.includes('winxp')) return '游戏音效';
  
  // 动画音效
  if (name.includes('海绵宝宝')) return '动画音效';
  if (name.includes('蜡笔小新')) return '动画音效';
  if (name.includes('迪迦') || name.includes('奥特曼')) return '动画音效';
  if (name.includes('哆啦a梦') || name.includes('多啦a梦') || name.includes('机器猫')) return '动画音效';
  if (name.includes('超级飞侠')) return '动画音效';
  if (name.includes('高达') || name.includes('gundam')) return '动画音效';
  if (name.includes('变形金刚') && !name.includes('语音包')) return '动画音效';
  
  // 网络热梗
  if (name.includes('雷军') || name.includes('are u ok')) return '网络热梗';
  if (name.includes('曾志伟')) return '网络热梗';
  if (name.includes('李云龙')) return '网络热梗';
  if (name.includes('来啦老弟') || name.includes('来了老弟')) return '网络热梗';
  if (name.includes('安红')) return '网络热梗';
  if (name.includes('表哥')) return '网络热梗';
  if (name.includes('刚满18')) return '网络热梗';
  if (name.includes('大爷')) return '网络热梗';
  if (name.includes('呱')) return '网络热梗';
  if (name.includes('钵钵鸡')) return '网络热梗';
  if (name.includes('番茄')) return '网络热梗';
  if (name.includes('当') && !name.includes('当然')) return '网络热梗';
  if (name.includes('哼') || name.includes('讨厌')) return '网络热梗';
  
  // 系统提示音
  if (name.includes('欢迎') || name.includes('提示') || name.includes('请')) return '系统提示';
  if (name.includes('主人') || name.includes('先生') || name.includes('sir')) return '系统提示';
  if (name.includes('成功') || name.includes('完成')) return '系统提示';
  if (name.includes('电量') || name.includes('低电量')) return '系统提示';
  if (name.includes('下载') || name.includes('连接') || name.includes('设备')) return '系统提示';
  if (name.includes('贾维斯') || name.includes('jarvis')) return '系统提示';
  if (name.includes('皇上') || name.includes('驾到')) return '系统提示';
  if (name.includes('公主') || name.includes('王子')) return '系统提示';
  
  // 生活音效
  if (name.includes('空调') || name.includes('飞机')) return '生活音效';
  if (name.includes('哈罗摩托') || name.includes('摩托')) return '生活音效';
  
  return '其他';
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
  name: string;
  count: number;
}

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
        const isCategory = parts.length > 1;
        const originalCategory = isCategory ? parts[0] : '其他';
        const name = parts.pop() || key;
        
        // 智能分类
        const category = smartCategorize(name, originalCategory);
        
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
  
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
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

export async function uploadAudioFile(file: File, key?: string): Promise<boolean> {
  try {
    const fileKey = key || file.name;
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
