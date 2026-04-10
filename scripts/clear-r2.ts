import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://ae32780581ce1b7c7495b91edf6ad810.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: '8e0ed3907e5c1d77f029d77e421058bc',
    secretAccessKey: '280badc78f6b89a689494a6c1e631d8ac218ab3d3a6c852eca1862be59f09476',
  },
});

const BUCKET_NAME = 'sound';

async function clearBucket() {
  console.log('开始清空 R2 bucket...\n');
  
  let deletedCount = 0;
  let continuationToken: string | undefined = undefined;
  
  do {
    // 列出所有对象
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      ContinuationToken: continuationToken,
    });
    
    const response = await r2Client.send(listCommand);
    
    if (!response.Contents || response.Contents.length === 0) {
      console.log('Bucket 已清空！');
      break;
    }
    
    // 批量删除
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: response.Contents.map(item => ({ Key: item.Key! })),
        Quiet: true,
      },
    });
    
    await r2Client.send(deleteCommand);
    deletedCount += response.Contents.length;
    console.log(`已删除 ${deletedCount} 个文件...`);
    
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  
  console.log(`\n✅ 清空完成！共删除 ${deletedCount} 个文件`);
}

clearBucket().catch(console.error);
