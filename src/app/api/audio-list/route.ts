import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories } from '@/lib/r2';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { env }: { env: { MY_BUCKET?: any } }
) {
  const bucket = env?.MY_BUCKET;
  
  console.log('audio-list env:', JSON.stringify(Object.keys(env || {})));
  console.log('MY_BUCKET:', bucket ? 'exists' : 'undefined');
  
  try {
    const files = await listAudioFiles(bucket);
    const categories = getCategories(files);
    return NextResponse.json({ files, categories });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
