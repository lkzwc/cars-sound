import { S3Client, ListObjectsV2Command, DeleteObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// R2 配置
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

// 获取所有音频文件扩展名
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.ogg', '.MP3', '.WAV', '.M4A', '.OGG'];

// 步骤1: 清空 bucket
async function clearBucket() {
  console.log('🗑️  开始清空 R2 bucket...');
  
  let deletedCount = 0;
  let continuationToken = undefined;
  
  do {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      ContinuationToken: continuationToken,
    });
    
    const response = await client.send(listCommand);
    
    if (response.Contents && response.Contents.length > 0) {
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: BUCKET_NAME,
        Delete: {
          Objects: response.Contents.map(obj => ({ Key: obj.Key })),
        },
      });
      
      await client.send(deleteCommand);
      deletedCount += response.Contents.length;
      console.log(`  已删除 ${deletedCount} 个文件...`);
    }
    
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  
  console.log(`✅ 清空完成，共删除 ${deletedCount} 个文件\n`);
  return deletedCount;
}

// 步骤2: 递归获取所有音频文件
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
        // 相对于 baseDir 的路径作为 key
        const relativePath = path.relative(baseDir, fullPath);
        files.push({
          localPath: fullPath,
          r2Key: relativePath, // 保持目录结构
        });
      }
    }
  }
  
  return files;
}

// 步骤3: 上传文件到 R2
async function uploadFiles(files) {
  console.log(`📤 开始上传 ${files.length} 个音频文件...`);
  
  let uploadedCount = 0;
  let failedCount = 0;
  
  for (const file of files) {
    try {
      const fileContent = fs.readFileSync(file.localPath);
      const ext = path.extname(file.localPath).toLowerCase();
      
      // 根据扩展名设置 Content-Type
      const contentTypes = {
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.m4a': 'audio/mp4',
        '.ogg': 'audio/ogg',
      };
      
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: file.r2Key,
        Body: fileContent,
        ContentType: contentTypes[ext] || 'audio/mpeg',
      });
      
      await client.send(command);
      uploadedCount++;
      
      if (uploadedCount % 20 === 0) {
        console.log(`  已上传 ${uploadedCount}/${files.length}...`);
      }
    } catch (error) {
      console.error(`  ❌ 上传失败: ${file.localPath} - ${error.message}`);
      failedCount++;
    }
  }
  
  console.log(`\n✅ 上传完成: 成功 ${uploadedCount} 个，失败 ${failedCount} 个`);
  return { uploadedCount, failedCount };
}

// 主函数
async function main() {
  console.log('🚀 开始重新上传音频到 R2\n');
  console.log(`📁 音频目录: ${AUDIO_DIR}`);
  console.log(`🪣 R2 Bucket: ${BUCKET_NAME}\n`);
  
  // 1. 清空 bucket
  await clearBucket();
  
  // 2. 获取所有音频文件
  console.log('📂 扫描本地音频文件...');
  const files = getAllAudioFiles(AUDIO_DIR);
  console.log(`   找到 ${files.length} 个音频文件\n`);
  
  // 按分类统计
  const categories = {};
  for (const file of files) {
    const category = file.r2Key.split('/')[0];
    categories[category] = (categories[category] || 0) + 1;
  }
  console.log('📊 分类统计:');
  for (const [cat, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count} 个`);
  }
  console.log('');
  
  // 3. 上传文件
  await uploadFiles(files);
  
  console.log('\n🎉 全部完成！');
}

main().catch(console.error);
