import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://ae32780581ce1b7c7495b91edf6ad810.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: '8e0ed3907e5c1d77f029d77e421058bc',
    secretAccessKey: '280badc78f6b89a689494a6c1e631d8ac218ab3d3a6c852eca1862be59f09476',
  },
});

const BUCKET_NAME = 'sound';

async function listFiles() {
  let count = 0;
  let continuationToken = undefined;
  const files = [];
  
  do {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      ContinuationToken: continuationToken,
    });
    
    const response = await client.send(command);
    
    if (response.Contents) {
      for (const obj of response.Contents) {
        files.push(obj.Key);
        count++;
      }
    }
    
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);
  
  console.log(`当前 R2 中有 ${count} 个文件`);
  
  // 按分类统计
  const categories = {};
  for (const file of files) {
    const category = file.split('/')[0];
    categories[category] = (categories[category] || 0) + 1;
  }
  
  console.log('\n分类统计:');
  for (const [cat, cnt] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${cnt} 个`);
  }
}

listFiles().catch(console.error);
