import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories } from '@/lib/r2';

export const runtime = 'edge';

export async function GET(request: Request, context: { env: Record<string, any> }) {
  // 尝试多种方式获取 R2 bucket
  const bucket1 = context?.env?.MY_BUCKET;
  const bucket2 = (request as any)?.env?.MY_BUCKET;
  const bucket3 = (globalThis as any)?.MY_BUCKET;
  const bucket = bucket1 || bucket2 || bucket3;
  
  console.log('=== audio-list API ===');
  console.log('1. context.env.MY_BUCKET:', typeof bucket1, bucket1 ? 'exists' : 'undefined');
  console.log('2. request.env.MY_BUCKET:', typeof bucket2, bucket2 ? 'exists' : 'undefined');
  console.log('3. globalThis.MY_BUCKET:', typeof bucket3, bucket3 ? 'exists' : 'undefined');
  console.log('4. context.env keys:', Object.keys(context?.env || {}));
  
  try {
    const files = await listAudioFiles(bucket);
    const categories = getCategories(files);
    return NextResponse.json({ files, categories });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
