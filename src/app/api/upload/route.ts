import { NextRequest, NextResponse } from 'next/server';
import { uploadAudioFile, setR2Bucket } from '@/lib/r2';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  // 获取R2 bucket从环境
  const env = (request as any).env;
  if (env?.MY_BUCKET) {
    setR2Bucket(env.MY_BUCKET);
  }
  
  try {
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
    
    const success = await uploadAudioFile(file, customKey || file.name);
    
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
