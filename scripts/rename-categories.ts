import { S3Client, ListObjectsV2Command, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { readFileSync } from 'fs';
import { join } from 'path';

// 读取 .env.local 文件
const envPath = join(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    process.env[key.trim()] = values.join('=').trim();
  }
});

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'sound';

// 分类名称映射：中文 -> 英文
const CATEGORY_MAP: Record<string, string> = {
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

async function renameCategories() {
  console.log('开始重命名R2文件夹...\n');
  
  // 列出所有文件
  const listCommand = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
  const response = await r2Client.send(listCommand);
  
  if (!response.Contents) {
    console.log('没有找到文件');
    return;
  }
  
  // 按分类分组
  const filesByCategory = new Map<string, string[]>();
  
  for (const item of response.Contents) {
    const key = item.Key!;
    const parts = key.split('/');
    if (parts.length > 1) {
      const category = parts[0];
      if (!filesByCategory.has(category)) {
        filesByCategory.set(category, []);
      }
      filesByCategory.get(category)!.push(key);
    }
  }
  
  console.log(`找到 ${filesByCategory.size} 个分类:\n`);
  
  // 重命名每个分类
  for (const [oldCategory, files] of filesByCategory) {
    const newCategory = CATEGORY_MAP[oldCategory];
    
    if (!newCategory) {
      console.log(`⏭️  跳过 "${oldCategory}" (没有映射)`);
      continue;
    }
    
    console.log(`📁 重命名 "${oldCategory}" -> "${newCategory}" (${files.length} 个文件)`);
    
    for (const oldKey of files) {
      const newKey = oldKey.replace(oldCategory, newCategory);
      
      try {
        // 复制到新位置
        await r2Client.send(new CopyObjectCommand({
          Bucket: BUCKET_NAME,
          CopySource: `${BUCKET_NAME}/${oldKey}`,
          Key: newKey,
        }));
        
        // 删除旧文件
        await r2Client.send(new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: oldKey,
        }));
        
        console.log(`  ✅ ${oldKey} -> ${newKey}`);
      } catch (error) {
        console.error(`  ❌ 失败: ${oldKey}`, error);
      }
    }
    
    console.log('');
  }
  
  console.log('✅ 重命名完成！');
}

renameCategories().catch(console.error);
