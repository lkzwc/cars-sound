import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories } from '@/lib/r2';

export const runtime = 'edge';

export async function GET(
  request: Request,
  context: { env: Record<string, any> }
) {
  // 尝试多种方式获取R2 bucket
  const bucket = context?.env?.MY_BUCKET || (globalThis as any)?.MY_BUCKET;
  
  console.log('Context keys:', Object.keys(context?.env || {}));
  console.log('Bucket exists:', !!bucket);
  
  try {
    const files = await listAudioFiles(bucket);
    const categories = getCategories(files);
    return NextResponse.json({ files, categories });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
