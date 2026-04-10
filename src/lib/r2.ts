import { S3Client, ListObjectsV2Command, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'sound';

export interface AudioFile {
  key: string;
  name: string;
  size: number;
  lastModified: Date;
  url: string;
}

export async function listAudioFiles(): Promise<AudioFile[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
    });
    
    const response = await r2Client.send(command);
    
    if (!response.Contents) {
      return [];
    }
    
    return response.Contents
      .filter(item => {
        const ext = item.Key?.toLowerCase();
        return ext?.endsWith('.mp3') || ext?.endsWith('.wav') || ext?.endsWith('.ogg') || ext?.endsWith('.m4a');
      })
      .map(item => ({
        key: item.Key!,
        name: item.Key!.split('/').pop() || item.Key!,
        size: item.Size || 0,
        lastModified: item.LastModified || new Date(),
        url: `/api/audio/${encodeURIComponent(item.Key!)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  } catch (error) {
    console.error('Error listing audio files:', error);
    return [];
  }
}

export async function getAudioFile(key: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    
    const response = await r2Client.send(command);
    
    return {
      stream: response.Body,
      contentType: response.ContentType || 'audio/mpeg',
      contentLength: response.ContentLength,
    };
  } catch (error) {
    console.error('Error getting audio file:', error);
    return null;
  }
}

export async function uploadAudioFile(file: File, key?: string): Promise<boolean> {
  try {
    const fileKey = key || file.name;
    const buffer = await file.arrayBuffer();
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: Buffer.from(buffer),
      ContentType: file.type || 'audio/mpeg',
    });
    
    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error('Error uploading audio file:', error);
    return false;
  }
}

export { r2Client, BUCKET_NAME };
