'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const description = 'An interactive area chart';

const chartData = [
  { date: '2024-04-01', youtube: 222, tiktok: 150 },
  { date: '2024-04-02', youtube: 97, tiktok: 180 },
  { date: '2024-04-03', youtube: 167, tiktok: 120 },
  { date: '2024-04-04', youtube: 242, tiktok: 260 },
  { date: '2024-04-05', youtube: 373, tiktok: 290 },
  { date: '2024-04-06', youtube: 301, tiktok: 340 },
  { date: '2024-04-07', youtube: 245, tiktok: 180 },
  { date: '2024-04-08', youtube: 409, tiktok: 320 },
  { date: '2024-04-09', youtube: 59, tiktok: 110 },
  { date: '2024-04-10', youtube: 261, tiktok: 190 },
  { date: '2024-04-11', youtube: 327, tiktok: 350 },
  { date: '2024-04-12', youtube: 292, tiktok: 210 },
  { date: '2024-04-13', youtube: 342, tiktok: 380 },
  { date: '2024-04-14', youtube: 137, tiktok: 220 },
  { date: '2024-04-15', youtube: 120, tiktok: 170 },
  { date: '2024-04-16', youtube: 138, tiktok: 190 },
  { date: '2024-04-17', youtube: 446, tiktok: 360 },
  { date: '2024-04-18', youtube: 364, tiktok: 410 },
  { date: '2024-04-19', youtube: 243, tiktok: 180 },
  { date: '2024-04-20', youtube: 89, tiktok: 150 },
  { date: '2024-04-21', youtube: 137, tiktok: 200 },
  { date: '2024-04-22', youtube: 224, tiktok: 170 },
  { date: '2024-04-23', youtube: 138, tiktok: 230 },
  { date: '2024-04-24', youtube: 387, tiktok: 290 },
  { date: '2024-04-25', youtube: 215, tiktok: 250 },
  { date: '2024-04-26', youtube: 75, tiktok: 130 },
  { date: '2024-04-27', youtube: 383, tiktok: 420 },
  { date: '2024-04-28', youtube: 122, tiktok: 180 },
  { date: '2024-04-29', youtube: 315, tiktok: 240 },
  { date: '2024-04-30', youtube: 454, tiktok: 380 },
  { date: '2024-05-01', youtube: 165, tiktok: 220 },
  { date: '2024-05-02', youtube: 293, tiktok: 310 },
  { date: '2024-05-03', youtube: 247, tiktok: 190 },
  { date: '2024-05-04', youtube: 385, tiktok: 420 },
  { date: '2024-05-05', youtube: 481, tiktok: 390 },
  { date: '2024-05-06', youtube: 498, tiktok: 520 },
  { date: '2024-05-07', youtube: 388, tiktok: 300 },
  { date: '2024-05-08', youtube: 149, tiktok: 210 },
  { date: '2024-05-09', youtube: 227, tiktok: 180 },
  { date: '2024-05-10', youtube: 293, tiktok: 330 },
  { date: '2024-05-11', youtube: 335, tiktok: 270 },
  { date: '2024-05-12', youtube: 197, tiktok: 240 },
  { date: '2024-05-13', youtube: 197, tiktok: 160 },
  { date: '2024-05-14', youtube: 448, tiktok: 490 },
  { date: '2024-05-15', youtube: 473, tiktok: 380 },
  { date: '2024-05-16', youtube: 338, tiktok: 400 },
  { date: '2024-05-17', youtube: 499, tiktok: 420 },
  { date: '2024-05-18', youtube: 315, tiktok: 350 },
  { date: '2024-05-19', youtube: 235, tiktok: 180 },
  { date: '2024-05-20', youtube: 177, tiktok: 230 },
  { date: '2024-05-21', youtube: 82, tiktok: 140 },
  { date: '2024-05-22', youtube: 81, tiktok: 120 },
  { date: '2024-05-23', youtube: 252, tiktok: 290 },
  { date: '2024-05-24', youtube: 294, tiktok: 220 },
  { date: '2024-05-25', youtube: 201, tiktok: 250 },
  { date: '2024-05-26', youtube: 213, tiktok: 170 },
  { date: '2024-05-27', youtube: 420, tiktok: 460 },
  { date: '2024-05-28', youtube: 233, tiktok: 190 },
  { date: '2024-05-29', youtube: 78, tiktok: 130 },
  { date: '2024-05-30', youtube: 340, tiktok: 280 },
  { date: '2024-05-31', youtube: 178, tiktok: 230 },
  { date: '2024-06-01', youtube: 178, tiktok: 200 },
  { date: '2024-06-02', youtube: 470, tiktok: 410 },
  { date: '2024-06-03', youtube: 103, tiktok: 160 },
  { date: '2024-06-04', youtube: 439, tiktok: 380 },
  { date: '2024-06-05', youtube: 88, tiktok: 140 },
  { date: '2024-06-06', youtube: 294, tiktok: 250 },
  { date: '2024-06-07', youtube: 323, tiktok: 370 },
  { date: '2024-06-08', youtube: 385, tiktok: 320 },
  { date: '2024-06-09', youtube: 438, tiktok: 480 },
  { date: '2024-06-10', youtube: 155, tiktok: 200 },
  { date: '2024-06-11', youtube: 92, tiktok: 150 },
  { date: '2024-06-12', youtube: 492, tiktok: 420 },
  { date: '2024-06-13', youtube: 81, tiktok: 130 },
  { date: '2024-06-14', youtube: 426, tiktok: 380 },
  { date: '2024-06-15', youtube: 307, tiktok: 350 },
  { date: '2024-06-16', youtube: 371, tiktok: 310 },
  { date: '2024-06-17', youtube: 475, tiktok: 520 },
  { date: '2024-06-18', youtube: 107, tiktok: 170 },
  { date: '2024-06-19', youtube: 341, tiktok: 290 },
  { date: '2024-06-20', youtube: 408, tiktok: 450 },
  { date: '2024-06-21', youtube: 169, tiktok: 210 },
  { date: '2024-06-22', youtube: 317, tiktok: 270 },
  { date: '2024-06-23', youtube: 480, tiktok: 530 },
  { date: '2024-06-24', youtube: 132, tiktok: 180 },
  { date: '2024-06-25', youtube: 141, tiktok: 190 },
  { date: '2024-06-26', youtube: 434, tiktok: 380 },
  { date: '2024-06-27', youtube: 448, tiktok: 490 },
  { date: '2024-06-28', youtube: 149, tiktok: 200 },
  { date: '2024-06-29', youtube: 103, tiktok: 160 },
  { date: '2024-06-30', youtube: 446, tiktok: 400 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  youtube: {
    label: 'youtube',
    color: '#FF0000',
  },
  tiktok: {
    label: 'tiktok',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = false;
  const [timeRange, setTimeRange] = useState('90d');

  useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            className="*:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex hidden"
            onValueChange={setTimeRange}
            type="single"
            value={timeRange}
            variant="outline"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select onValueChange={setTimeRange} value={timeRange}>
            <SelectTrigger
              aria-label="Select a value"
              className="flex @[767px]/card:hidden w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem className="rounded-lg" value="90d">
                Last 3 months
              </SelectItem>
              <SelectItem className="rounded-lg" value="30d">
                Last 30 days
              </SelectItem>
              <SelectItem className="rounded-lg" value="7d">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
          config={chartConfig}
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillyoutube" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-youtube)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-youtube)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="filltiktok" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tiktok)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tiktok)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
              }
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
            />
            <Area
              dataKey="tiktok"
              fill="url(#filltiktok)"
              stackId="a"
              stroke="var(--color-tiktok)"
              type="natural"
            />
            <Area
              dataKey="youtube"
              fill="url(#fillyoutube)"
              stackId="a"
              stroke="var(--color-youtube)"
              type="natural"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
