import { S3Client, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://ae32780581ce1b7c7495b91edf6ad810.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: '8e0ed3907e5c1d77f029d77e421058bc',
    secretAccessKey: '280badc78f6b89a689494a6c1e631d8ac218ab3d3a6c852eca1862be59f09476',
  },
});

const BUCKET_NAME = 'sound';
const AUDIO_DIR = '/Users/Coding/cars-sound-audio';
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.ogg', '.MP3', '.WAV', '.M4A', '.OGG'];

// 获取 R2 中已有的文件
async function getExistingFiles() {
  const files = new Set();
  let continuationToken = undefined;
  
  do {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      ContinuationToken: continuationToken,
    });
    
    const response = await client.send(command);
    
    if (response.Contents) {
      for (const obj of response.Contents) {
        files.add(obj.Key);
      }
    }
    
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  
  return files;
}

// 获取本地所有音频文件
function getAllAudioFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...getAllAudioFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (AUDIO_EXTENSIONS.map(e => e.toLowerCase()).includes(ext)) {
        const relativePath = path.relative(baseDir, fullPath);
        files.push({
          localPath: fullPath,
          r2Key: relativePath,
        });
      }
    }
  }
  
  return files;
}

// 上传文件
async function uploadFiles(files) {
  console.log(`📤 开始上传 ${files.length} 个文件...`);
  
  let uploadedCount = 0;
  let failedCount = 0;
  
  const contentTypes = {
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.ogg': 'audio/ogg',
  };
  
  for (const file of files) {
    try {
      const fileContent = fs.readFileSync(file.localPath);
      const ext = path.extname(file.localPath).toLowerCase();
      
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: file.r2Key,
        Body: fileContent,
        ContentType: contentTypes[ext] || 'audio/mpeg',
      });
      
      await client.send(command);
      uploadedCount++;
      
      if (uploadedCount % 10 === 0) {
        console.log(`  已上传 ${uploadedCount}/${files.length}...`);
      }
    } catch (error) {
      console.error(`  ❌ 失败: ${file.r2Key}`);
      failedCount++;
    }
  }
  
  console.log(`\n✅ 完成: 成功 ${uploadedCount}，失败 ${failedCount}`);
  return { uploadedCount, failedCount };
}

async function main() {
  console.log('🔄 继续上传音频文件\n');
  
  // 获取已有文件
  console.log('📋 检查 R2 中已有文件...');
  const existing = await getExistingFiles();
  console.log(`   已有 ${existing.size} 个文件\n`);
  
  // 获取本地文件
  console.log('📂 扫描本地文件...');
  const localFiles = getAllAudioFiles(AUDIO_DIR);
  console.log(`   本地有 ${localFiles.length} 个文件\n`);
  
  // 过滤出需要上传的文件
  const toUpload = localFiles.filter(f => !existing.has(f.r2Key));
  console.log(`📤 需要上传 ${toUpload.length} 个新文件\n`);
  
  if (toUpload.length === 0) {
    console.log('✅ 所有文件已上传完成！');
    return;
  }
  
  // 按分类统计待上传
  const categories = {};
  for (const file of toUpload) {
    const category = file.r2Key.split('/')[0];
    categories[category] = (categories[category] || 0) + 1;
  }
  console.log('待上传分类:');
  for (const [cat, cnt] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${cnt} 个`);
  }
  console.log('');
  
  await uploadFiles(toUpload);
  console.log('\n🎉 全部完成！');
}

main().catch(console.error);
