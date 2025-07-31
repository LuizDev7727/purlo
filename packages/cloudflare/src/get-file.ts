import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2 } from './r2';

export async function getFile(objectKey: string): Promise<string> {
  const url = await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: 'purlo',
      Key: objectKey,
    })
  );
  return url;
}
