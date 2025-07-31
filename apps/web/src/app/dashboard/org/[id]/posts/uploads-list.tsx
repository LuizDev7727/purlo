'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import getPostsHttp from '@/http/posts/get-posts.http';
import PostCard from './post-card';
import UploadsLoading from './uploads-loading';

type UploadsList = {
  organizationId: string;
};

export default function UploadsList({ organizationId }: UploadsList) {
  const { data: uploads = [], isLoading } = useQuery({
    queryKey: ['uploads'],
    queryFn: () => getPostsHttp(organizationId),
  });
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <UploadsLoading />
        ) : (
          uploads.map((upload, _) => {
            return <PostCard key={upload.id} post={upload} />;
          })
        )}
      </div>

      <Pagination className="!justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
