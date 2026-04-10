import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const R2_ACCOUNT_ID = 'ae32780581ce1b7c7495b91edf6ad810';
const R2_ACCESS_KEY_ID = '8e0ed3907e5c1d77f029d77e421058bc';
const R2_SECRET_ACCESS_KEY = '280badc78f6b89a689494a6c1e631d8ac218ab3d3a6c852eca1862be59f09476';
const R2_BUCKET_NAME = 'sound';

const AUDIO_DIR = '/Users/Coding/cars-sound-audio';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function getAllAudioFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllAudioFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = entry.name.toLowerCase();
      if (ext.endsWith('.mp3') || ext.endsWith('.wav') || ext.endsWith('.ogg') || ext.endsWith('.m4a')) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function uploadFile(localPath: string): Promise<boolean> {
  const relativePath = path.relative(AUDIO_DIR, localPath);
  const key = relativePath;

  try {
    const fileBuffer = fs.readFileSync(localPath);
    
    // 根据扩展名确定 Content-Type
    let contentType = 'audio/mpeg';
    if (localPath.toLowerCase().endsWith('.wav')) contentType = 'audio/wav';
    else if (localPath.toLowerCase().endsWith('.ogg')) contentType = 'audio/ogg';
    else if (localPath.toLowerCase().endsWith('.m4a')) contentType = 'audio/mp4';

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    });

    await r2Client.send(command);
    console.log(`✅ ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ ${key}:`, error);
    return false;
  }
}

async function main() {
  console.log('正在扫描音频文件...');
  const files = await getAllAudioFiles(AUDIO_DIR);
  console.log(`找到 ${files.length} 个音频文件\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    process.stdout.write(`[${i + 1}/${files.length}] `);
    const result = await uploadFile(file);
    if (result) success++;
    else failed++;
  }

  console.log(`\n\n上传完成！成功: ${success}, 失败: ${failed}`);
}

main().catch(console.error);
