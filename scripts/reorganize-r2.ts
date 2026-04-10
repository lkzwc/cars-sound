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

// 分类规则
function categorizeFile(filename: string): string {
  const name = filename.toLowerCase();
  
  // 汽车品牌
  if (name.includes('奥迪') || name.includes('aodi') || name.includes('audi')) return '汽车品牌';
  if (name.includes('宝马') || name.includes('bmw')) return '汽车品牌';
  if (name.includes('宾利') || name.includes('bentley')) return '汽车品牌';
  if (name.includes('哈雷') || name.includes('harley')) return '汽车品牌';
  if (name.includes('九号') || name.includes('ninebot')) return '汽车品牌';
  if (name.includes('大疆') || name.includes('dji')) return '汽车品牌';
  if (name.includes('电动车') || name.includes('锁车') || name.includes('挪车')) return '汽车品牌';
  if (name.includes('欢迎') && name.includes('公司')) return '汽车品牌';
  
  // 王者荣耀
  if (name.includes('王者荣耀') || name.includes('王者') || name.includes('五杀') || name.includes('击杀') || name.includes('第一滴血')) return '王者荣耀';
  if (name.includes('高渐离')) return '王者荣耀';
  
  // 游戏音效
  if (name.includes('穿越火线') || name.includes('fire')) return '游戏音效';
  if (name.includes('红警')) return '游戏音效';
  if (name.includes('斗地主')) return '游戏音效';
  if (name.includes('超级玛丽') || name.includes('mario')) return '游戏音效';
  if (name.includes('cs ')) return '游戏音效';
  if (name.includes('gta') || name.includes('任务完成') || name.includes('liftoff') || name.includes('升空')) return '游戏音效';
  if (name.includes('gba') || name.includes('xbox')) return '游戏音效';
  if (name.includes('windows') || name.includes('winxp') || name.includes('开机') || name.includes('关机')) return '游戏音效';
  if (name.includes('诺基亚')) return '游戏音效';
  
  // 动画音效
  if (name.includes('海绵宝宝')) return '动画音效';
  if (name.includes('蜡笔小新')) return '动画音效';
  if (name.includes('迪迦') || name.includes('奥特曼')) return '动画音效';
  if (name.includes('哆啦a梦') || name.includes('多啦a梦')) return '动画音效';
  if (name.includes('超级飞侠')) return '动画音效';
  if (name.includes('高达')) return '动画音效';
  if (name.includes('变形金刚') && !name.includes('语音包')) return '动画音效';
  if (name.includes('蛋仔')) return '动画音效';
  
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
  if (name.includes('伞兵')) return '网络热梗';
  if (name.includes('你干嘛')) return '网络热梗';
  if (name.includes('拉屎')) return '网络热梗';
  
  // 系统提示
  if (name.includes('贾维斯') || name.includes('jarvis') || name.includes('sir')) return '系统提示';
  if (name.includes('主人') || name.includes('先生')) return '系统提示';
  if (name.includes('公主请上车') || name.includes('王子请上车')) return '系统提示';
  if (name.includes('皇上')) return '系统提示';
  if (name.includes('欢迎回家') || name.includes('着陆')) return '系统提示';
  if (name.includes('电量') || name.includes('低电量')) return '系统提示';
  if (name.includes('下载') || name.includes('连接') || name.includes('设备')) return '系统提示';
  if (name.includes('久坐') || name.includes('来电') || name.includes('消息')) return '系统提示';
  
  // 生活音效
  if (name.includes('空调') || name.includes('飞机')) return '生活音效';
  if (name.includes('哈罗摩托') || name.includes('摩托')) return '生活音效';
  if (name.includes('tokyo')) return '生活音效';
  
  // 复古广告
  if (name.includes('因特尔') || name.includes('麦当劳') || name.includes('大运摩托')) return '复古广告';
  
  // 国外动画
  if (name.includes('beavis') || name.includes('jetsons') || name.includes('pink') || name.includes('pokemon') || name.includes('road') || name.includes('scooby')) return '国外动画';
  
  // 变形金刚语音包（保持原分类）
  if (name.includes('变形金刚语音包')) return '变形金刚语音包';
  
  return '其他';
}

async function reorganizeFiles() {
  console.log('开始扫描 R2 存储中的文件...\n');
  
  // 获取所有文件
  const listCommand = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
  const response = await r2Client.send(listCommand);
  
  if (!response.Contents) {
    console.log('没有找到文件');
    return;
  }
  
  const files = response.Contents.filter(item => {
    const ext = item.Key?.toLowerCase();
    return ext?.endsWith('.mp3') || ext?.endsWith('.wav') || ext?.endsWith('.ogg') || ext?.endsWith('.m4a');
  });
  
  console.log(`找到 ${files.length} 个音频文件\n`);
  
  // 统计分类
  const categoryStats: Record<string, number> = {};
  
  // 重新组织文件
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const oldKey = file.Key!;
    const filename = oldKey.split('/').pop() || oldKey;
    
    // 确定新分类
    let category: string;
    const parts = oldKey.split('/');
    if (parts.length > 1 && !['其他', 'Other'].includes(parts[0])) {
      // 已经有分类的，保持原分类
      category = parts[0];
    } else {
      // 根据文件名智能分类
      category = categorizeFile(filename);
    }
    
    // 统计
    categoryStats[category] = (categoryStats[category] || 0) + 1;
    
    // 构建新路径
    const newKey = `${category}/${filename}`;
    
    // 如果路径相同，跳过
    if (oldKey === newKey) {
      console.log(`[${i + 1}/${files.length}] ⏭️  跳过: ${filename} (已在正确位置)`);
      continue;
    }
    
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
      
      console.log(`[${i + 1}/${files.length}] ✅ ${filename} → ${category}/`);
    } catch (error) {
      console.error(`[${i + 1}/${files.length}] ❌ 失败: ${filename}`, error);
    }
  }
  
  console.log('\n分类统计:');
  Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count} 个文件`);
    });
  
  console.log('\n✅ 重组完成！');
}

reorganizeFiles().catch(console.error);
