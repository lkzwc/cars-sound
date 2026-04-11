import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';

// 手动加载 .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key.trim()] = value;
    }
  });
}

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'sound';

// 需要创建的新文件夹
const newFolders = [
  '公主请下车',
  '王者荣耀',
];

async function createFolders() {
  for (const folder of newFolders) {
    try {
      // 创建一个占位文件（.gitkeep风格）
      await r2Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${folder}/.placeholder`,
        Body: 'This folder is reserved for audio files.',
        ContentType: 'text/plain',
      }));
      console.log(`✅ 创建文件夹: ${folder}`);
    } catch (error) {
      console.error(`❌ 创建失败: ${folder}`, error);
    }
  }
  console.log('\n完成！');
}

createFolders();
