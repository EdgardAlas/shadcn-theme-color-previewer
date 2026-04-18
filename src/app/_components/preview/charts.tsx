'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  revenueData,
  sessionData,
  revenueChartConfig,
  sessionChartConfig,
} from './data';

export function PreviewCharts() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card className='col-span-2'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm'>Revenue Overview</CardTitle>
          <CardDescription className='text-xs'>
            Revenue vs Expenses — last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={revenueChartConfig}
            className='h-[160px] w-full'
          >
            <AreaChart
              data={revenueData}
              margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                className='stroke-border/50'
              />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type='monotone'
                dataKey='revenue'
                stroke='var(--color-revenue)'
                fill='var(--color-revenue)'
                fillOpacity={0.15}
                strokeWidth={1.5}
              />
              <Area
                type='monotone'
                dataKey='expenses'
                stroke='var(--color-expenses)'
                fill='var(--color-expenses)'
                fillOpacity={0.1}
                strokeWidth={1.5}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm'>Sessions</CardTitle>
          <CardDescription className='text-xs'>
            By source, this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={sessionChartConfig}
            className='h-[160px] w-full'
          >
            <BarChart
              data={sessionData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                className='stroke-border/50'
              />
              <XAxis
                dataKey='day'
                tick={{ fontSize: 9 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey='direct'
                stackId='a'
                fill='var(--color-direct)'
                radius={[0, 0, 2, 2]}
              />
              <Bar
                dataKey='organic'
                stackId='a'
                fill='var(--color-organic)'
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
