import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: env.STORAGE_AWS_ACCESS_KEY_ID!,
    secretAccessKey: env.STORAGE_AWS_SECRET_ACCESS_KEY!,
  },
});

export const BUCKET_NAME = env.NEXT_PUBLIC_S3_BUCKET_NAME as string;

// Helper function to determine content type
function determineContentType(file: Blob | Buffer, filename: string): string {
  // For Blob objects that have type property
  if (file instanceof Blob && file.type) {
    return file.type;
  }

  // Try to determine by file extension
  const extension = filename.split('.').pop()?.toLowerCase();
  if (extension) {
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'txt': 'text/plain',
      'html': 'text/html',
      'csv': 'text/csv',
      'json': 'application/json',
      // Add more as needed
    };
    return mimeTypes[extension] || 'application/octet-stream';
  }

  // Default content type
  return 'application/octet-stream';
}

// -------------------------------------------- //
// ❌ OLD: Backend upload (deprecated in favor of presigned URL upload)
// Keeping it for fallback/future if needed
export async function uploadToS3(file: Blob | Buffer, key: string, contentType?: string): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: contentType || determineContentType(file, key),
  });

  await s3.send(command);

  return `https://${BUCKET_NAME!}.s3.${process.env.AWS_REGION!}.amazonaws.com/${key}`;
};

// ✅ NEW: Generate a presigned PUT URL for frontend direct upload
export async function generatePresignedUploadUrl(key: string, contentType: string, expiresIn = 3600): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3, command, { expiresIn });
}
// ---------------------------------------------- //

// Generate presigned URL for getting an object
export async function getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn });
}

// Delete file from S3
export async function deleteFromS3(key: string): Promise<unknown> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return s3.send(command);
}
