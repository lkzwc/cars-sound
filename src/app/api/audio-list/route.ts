import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories, setR2Bucket } from '@/lib/r2';

export const runtime = 'edge';

export async function GET(request: Request) {
  // 获取R2 bucket从环境
  const env = (request as any).env;
  if (env?.MY_BUCKET) {
    setR2Bucket(env.MY_BUCKET);
  }
  
  try {
    const files = await listAudioFiles();
    const categories = getCategories(files);
    return NextResponse.json({ files, categories });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
