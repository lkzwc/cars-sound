import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories } from '@/lib/r2';

export const runtime = 'edge';

export async function GET(request: Request, context: { env: Record<string, any> }) {
  const bucket = context?.env?.MY_BUCKET;
  
  console.log('=== audio-list API ===');
  console.log('Context env keys:', Object.keys(context?.env || {}));
  console.log('MY_BUCKET exists:', !!bucket);
  console.log('MY_BUCKET type:', typeof bucket);
  if (bucket) {
    console.log('MY_BUCKET has list:', typeof bucket.list === 'function');
  }
  
  try {
    const files = await listAudioFiles(bucket);
    const categories = getCategories(files);
    return NextResponse.json({ files, categories });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
