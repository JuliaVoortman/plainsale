import { 
  S3Client, 
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { z } from 'zod';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'image/jpeg',
  'image/png',
  'video/mp4'
];

export const fileSchema = z.object({
  name: z.string().min(1),
  type: z.enum(ALLOWED_FILE_TYPES as [string, ...string[]]),
  size: z.number().max(MAX_FILE_SIZE)
});

export type FileMetadata = z.infer<typeof fileSchema>;

export class StorageService {
  private bucket: string;

  constructor() {
    this.bucket = process.env.AWS_S3_BUCKET!;
  }

  async createUploadUrl(
    dealRoomId: string,
    fileMetadata: FileMetadata
  ) {
    const key = this.generateKey(dealRoomId, fileMetadata.name);

    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: this.bucket,
      Key: key,
      Conditions: [
        ['content-length-range', 0, MAX_FILE_SIZE],
        ['eq', '$Content-Type', fileMetadata.type]
      ],
      Expires: 600 // 10 minutes
    });

    return { url, fields, key };
  }

  async createDownloadUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key
    });

    return getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }

  async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    });

    await s3Client.send(command);
  }

  private generateKey(dealRoomId: string, fileName: string): string {
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `deals/${dealRoomId}/${timestamp}-${sanitizedFileName}`;
  }
}