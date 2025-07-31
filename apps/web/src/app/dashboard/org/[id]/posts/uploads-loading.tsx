import { CardContent } from '@/components/ui/card';

export default function UploadsLoading() {
  return Array.from({ length: 6 }).map(() => {
    return (
      <div
        className="rounded-lg border dark:bg-card"
        key={Math.floor(Math.random() * 100)}
      >
        <div className="group relative overflow-hidden rounded-t-lg">
          <div className="h-40 w-full animate-pulse bg-muted" />
          <div className="absolute top-2 right-2">
            <div className="h-8 w-8 animate-pulse rounded-md bg-muted/50" />
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <div className="mb-1 space-y-1">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </div>

            <div className="flex items-center justify-between border-t pt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 animate-pulse rounded bg-muted" />
                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </CardContent>
      </div>
    );
  });
}
