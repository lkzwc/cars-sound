import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://ae32780581ce1b7c7495b91edf6ad810.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: '8e0ed3907e5c1d77f029d77e421058bc',
    secretAccessKey: '280badc78f6b89a689494a6c1e631d8ac218ab3d3a6c852eca1862be59f09476',
  },
});

const BUCKET_NAME = 'sound';
const AUDIO_DIR = '/Users/Coding/cars-sound-audio';

// 已上传的分类
const uploadedCategories = ['公主请上车', '其他', '变形金刚语音包'];

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const contentTypes: Record<string, string> = {
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

async function uploadDirectory(dirPath: string, category: string): Promise<number> {
  const files = fs.readdirSync(dirPath);
  let uploadedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      uploadedCount += await uploadDirectory(filePath, `${category}/${file}`);
    } else if (file.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      const key = `${category}/${file}`;
      const fileBuffer = fs.readFileSync(filePath);
      
      try {
        await r2Client.send(new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: fileBuffer,
          ContentType: getContentType(file),
        }));
        
        uploadedCount++;
        console.log(`✅ [${uploadedCount}] ${key}`);
      } catch (error) {
        console.error(`❌ 上传失败: ${key}`, error);
      }
    }
  }
  
  return uploadedCount;
}

async function uploadRemaining() {
  console.log('继续上传剩余分类...\n');
  
  const allCategories = fs.readdirSync(AUDIO_DIR)
    .filter(name => {
      const stat = fs.statSync(path.join(AUDIO_DIR, name));
      return stat.isDirectory() && !name.startsWith('.');
    });
  
  const remainingCategories = allCategories.filter(cat => !uploadedCategories.includes(cat));
  
  console.log(`待上传分类: ${remainingCategories.join(', ')}\n`);
  
  let totalUploaded = 0;
  
  for (const category of remainingCategories) {
    console.log(`\n📁 上传分类: ${category}`);
    const categoryPath = path.join(AUDIO_DIR, category);
    const count = await uploadDirectory(categoryPath, category);
    totalUploaded += count;
    console.log(`   上传了 ${count} 个文件`);
  }
  
  console.log(`\n\n✅ 上传完成！共上传 ${totalUploaded} 个文件`);
}

uploadRemaining().catch(console.error);
