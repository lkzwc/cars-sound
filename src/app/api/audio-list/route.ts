import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories } from '@/lib/r2';

export const runtime = 'edge';

export async function GET(request: Request, context: { env: Record<string, any> }) {
  // 尝试多种方式获取 R2 bucket
  const bucket1 = context?.env?.MY_BUCKET;
  const bucket2 = (request as any)?.env?.MY_BUCKET;
  const bucket = bucket1 || bucket2;
  
  const debug = {
    bucket1_exists: !!bucket1,
    bucket1_type: typeof bucket1,
    bucket2_exists: !!bucket2,
    bucket2_type: typeof bucket2,
    context_env_keys: Object.keys(context?.env || {}),
    request_env_keys: Object.keys((request as any)?.env || {}),
  };
  
  console.log('debug:', JSON.stringify(debug));
  
  try {
    const files = await listAudioFiles(bucket);
    const categories = getCategories(files);
    return NextResponse.json({ files, categories, debug });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files', debug }, { status: 500 });
  }
}
