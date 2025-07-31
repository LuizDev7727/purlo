import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrganizationLoading() {
  return Array.from({ length: 6 }).map(() => {
    return (
      <Card key={Math.floor(Math.random() * 982)}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="absolute top-4 right-4">
            <Skeleton className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent />
        <Separator />
        <CardFooter className="gap-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </CardFooter>
      </Card>
    );
  });
}
