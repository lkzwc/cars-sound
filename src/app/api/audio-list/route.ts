import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories } from '@/lib/r2';

export const runtime = 'edge';

export async function GET(request: Request) {
  const env = (request as any).env;
  const bucket = env?.MY_BUCKET;
  
  try {
    const files = await listAudioFiles(bucket);
    const categories = getCategories(files);
    return NextResponse.json({ files, categories });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
