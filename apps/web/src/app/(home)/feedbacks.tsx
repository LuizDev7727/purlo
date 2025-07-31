import { StarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { reviews } from '@/constants/feedbacks';

export default function Feedbacks() {
  return (
    <div className="mx-auto mt-10 flex h-full w-full max-w-full flex-col items-center justify-between px-4 md:max-w-screen-xl md:px-12 lg:px-20">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
        <Badge>Nossos Clientes</Badge>
        <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
          O que nossos clientes estão dizendo.
        </h2>
        <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
          Aqui estão uma parte dos feedbacks de nossos usuários sobre o Purlo.
        </p>
      </div>

      <div className="grid grid-cols-1 place-items-start gap-4 py-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <div className="flex h-min flex-col items-start gap-6">
          {reviews.slice(0, 3).map((review, key) => {
            return (
              <Card
                className="flex h-min w-full flex-col border-none"
                // biome-ignore lint/suspicious/noArrayIndexKey: <a>
                key={key}
              >
                <CardHeader className="space-y-0">
                  <CardTitle className="font-medium text-lg text-muted-foreground">
                    {review.name}
                  </CardTitle>
                  <CardDescription>{review.username}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pb-4">
                  <p className="text-muted-foreground">{review.review}</p>
                </CardContent>

                <CardFooter className="mt-auto w-full space-x-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <StarIcon
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      // biome-ignore lint/suspicious/noArrayIndexKey: <a>
                      key={i}
                    />
                  ))}
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="flex h-min flex-col items-start gap-6">
          {reviews.slice(3, 6).map((review, key) => {
            return (
              <Card
                className="flex h-min w-full flex-col border-none"
                // biome-ignore lint/suspicious/noArrayIndexKey: <a>
                key={key}
              >
                <CardHeader className="space-y-0">
                  <CardTitle className="font-medium text-lg text-muted-foreground">
                    {review.name}
                  </CardTitle>
                  <CardDescription>{review.username}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pb-4">
                  <p className="text-muted-foreground">{review.review}</p>
                </CardContent>

                <CardFooter className="mt-auto w-full space-x-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <StarIcon
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      // biome-ignore lint/suspicious/noArrayIndexKey: <a>
                      key={i}
                    />
                  ))}
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="flex h-min flex-col items-start gap-6">
          {reviews.slice(6, 9).map((review, key) => {
            return (
              <Card
                className="flex h-min w-full flex-col border-none"
                // biome-ignore lint/suspicious/noArrayIndexKey: <a>
                key={key}
              >
                <CardHeader className="space-y-0">
                  <CardTitle className="font-medium text-lg text-muted-foreground">
                    {review.name}
                  </CardTitle>
                  <CardDescription>{review.username}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pb-4">
                  <p className="text-muted-foreground">{review.review}</p>
                </CardContent>

                <CardFooter className="mt-auto w-full space-x-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <StarIcon
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      // biome-ignore lint/suspicious/noArrayIndexKey: <a>
                      key={i}
                    />
                  ))}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
