import { NextResponse } from 'next/server';
import { listAudioFiles } from '@/lib/r2';

export async function GET() {
  try {
    const files = await listAudioFiles();
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
