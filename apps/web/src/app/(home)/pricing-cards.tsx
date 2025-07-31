import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PLANS } from '@/constants/pricing';
import { cn } from '@/lib/utils';

const PricingCards = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 flex-wrap gap-5 pt-6 md:gap-8 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <Card
            className={cn('flex w-full flex-col rounded-xl border-border pt-0')}
            key={plan.name}
          >
            <CardHeader
              className={cn('border-border border-b bg-foreground/[0.03] p-4')}
            >
              <CardTitle className={cn('font-medium text-lg')}>
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.info}</CardDescription>
              <h5 className="font-semibold text-3xl">
                R${plan.price.monthly}
                <span className="font-normal text-base text-muted-foreground">
                  /month
                </span>
              </h5>
            </CardHeader>
            <CardContent className="space-y-4 px-4">
              {plan.features.map((feature) => (
                <div className="flex items-center gap-2" key={feature.limit}>
                  <CheckCircleIcon className="size-4 " />
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <p
                          className={cn(
                            feature.tooltip &&
                              '!border-dashed cursor-pointer border-border border-b'
                          )}
                        >
                          {feature.text}
                        </p>
                      </TooltipTrigger>
                      {feature.tooltip && (
                        <TooltipContent>
                          <p>{feature.tooltip}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </CardContent>
            <CardFooter className="mt-auto w-full">
              <Button asChild className="w-full">
                <Link href={plan.btn.href}>{plan.btn.text}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
