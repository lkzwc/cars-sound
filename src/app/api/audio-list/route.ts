import { NextResponse } from 'next/server';
import { listAudioFiles, getCategories } from '@/lib/r2';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
  try {
    const { env } = getRequestContext();
    const bucket = env?.MY_BUCKET;
    
    console.log('MY_BUCKET exists:', !!bucket);
    
    const files = await listAudioFiles(bucket);
    const categories = getCategories(files);
    return NextResponse.json({ files, categories });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
