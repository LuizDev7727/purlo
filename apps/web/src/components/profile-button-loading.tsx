import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

export default function ProfileButtonLoading() {
  return (
    <div className="flex cursor-pointer items-center gap-3 outline-none">
      <div className="flex flex-col items-end gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Avatar className="size-8">
        <AvatarFallback>
          <Skeleton className="h-full w-full rounded-full" />
        </AvatarFallback>
      </Avatar>
      <ChevronDown className="size-4 text-muted-foreground" />
    </div>
  );
}
