import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2 } from './r2';

type UploadFileProps = {
  file: File;
};

export async function uploadFile({ file }: UploadFileProps): Promise<void> {
  const uploadUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: 'purlo',
      Key: file.name,
      ContentType: file.type,
    })
  );

  fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });
}
