import { NextRequest, NextResponse } from 'next/server';
import { listAudioFiles, getCategories, AudioFile, Category } from '@/lib/r2';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const bucket = env?.MY_BUCKET;
    
    // 支持 ?category=参数，只返回指定分类的文件
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const allFiles = await listAudioFiles(bucket);
    const categories = getCategories(allFiles);
    
    let files = allFiles;
    if (category) {
      files = allFiles.filter(f => f.category === category);
    }
    
    return NextResponse.json({ 
      files, 
      categories,
      total: files.length,
    });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
