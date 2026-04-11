import { NextRequest, NextResponse } from 'next/server';
import { getAudioFile } from '@/lib/r2';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const { env } = getRequestContext();
    const bucket = env?.MY_BUCKET;
    const { key } = await params;
    const fileKey = key.join('/');
    
    const audioFile = await getAudioFile(fileKey, bucket);
    
    if (!audioFile || !audioFile.stream) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const arrayBuffer = await audioFile.stream.transformToByteArray();
    
    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': audioFile.contentType,
        'Content-Length': String(audioFile.contentLength || arrayBuffer.byteLength),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error serving audio:', error);
    return NextResponse.json({ error: 'Failed to serve audio' }, { status: 500 });
  }
}
