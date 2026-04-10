import { S3Client, ListObjectsV2Command, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://ae32780581ce1b7c7495b91edf6ad810.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: '8e0ed3907e5c1d77f029d77e421058bc',
    secretAccessKey: '280badc78f6b89a689494a6c1e631d8ac218ab3d3a6c852eca1862be59f09476',
  },
});

const BUCKET_NAME = 'sound';

async function moveUncategorizedFiles() {
  console.log('扫描 R2 中未分类的文件...\n');
  
  const listCommand = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
  const response = await r2Client.send(listCommand);
  
  if (!response.Contents) {
    console.log('没有找到文件');
    return;
  }
  
  // 找出没有文件夹的文件（key 中没有 /）
  const uncategorizedFiles = response.Contents.filter(item => {
    const key = item.Key!;
    const hasFolder = key.includes('/');
    const isAudio = key.toLowerCase().match(/\.(mp3|wav|ogg|m4a)$/);
    return !hasFolder && isAudio;
  });
  
  console.log(`找到 ${uncategorizedFiles.length} 个未分类的音频文件\n`);
  
  if (uncategorizedFiles.length === 0) {
    console.log('所有文件都已分类！');
    return;
  }
  
  // 移动到"其他文件"文件夹
  for (let i = 0; i < uncategorizedFiles.length; i++) {
    const file = uncategorizedFiles[i];
    const oldKey = file.Key!;
    const filename = oldKey.split('/').pop() || oldKey;
    const newKey = `其他文件/${filename}`;
    
    try {
      // 复制到新位置
      await r2Client.send(new CopyObjectCommand({
        Bucket: BUCKET_NAME,
        CopySource: `${BUCKET_NAME}/${encodeURIComponent(oldKey)}`,
        Key: newKey,
      }));
      
      // 删除旧文件
      await r2Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: oldKey,
      }));
      
      console.log(`[${i + 1}/${uncategorizedFiles.length}] ✅ ${filename} → 其他文件/`);
    } catch (error) {
      console.error(`[${i + 1}/${uncategorizedFiles.length}] ❌ 失败: ${filename}`, error);
    }
  }
  
  console.log('\n✅ 移动完成！');
}

moveUncategorizedFiles().catch(console.error);
