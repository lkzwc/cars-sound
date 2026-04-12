import { NextRequest, NextResponse } from 'next/server';
import { uploadAudioFile } from '@/lib/r2';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const bucket = env?.MY_BUCKET;
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const customKey = formData.get('key') as string | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // 检查文件类型
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-wav'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
    
    const success = await uploadAudioFile(file, customKey || file.name, bucket);
    
    if (success) {
      return NextResponse.json({ success: true, key: customKey || file.name });
    } else {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
