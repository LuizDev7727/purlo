import { UploadCloudIcon } from 'lucide-react';
import Link from 'next/link';
import { getCurrentOrg } from '@/auth/auth';
import { Button } from '@/components/ui/button';
import UploadsList from './uploads-list';

export default async function Posts() {
  const currentOrg = await getCurrentOrg();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl">Posts</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie todos os seus posts por aqui.
          </p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/org/${currentOrg}/posts/create-post`}>
            <UploadCloudIcon />
            Criar Post
          </Link>
        </Button>
      </div>

      <UploadsList organizationId={currentOrg} />
    </div>
  );
}
