import { AlertTriangle, Trash2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';

function AccentCard() {
  const items = ['Dashboard', 'Analytics', 'Reports', 'Settings'];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xs font-medium'>Accent</CardTitle>
        <CardDescription className='text-[11px]'>
          Navigation hover &amp; focus highlight
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pb-3'>
        <div className='flex flex-col gap-0.5'>
          {items.map((item, i) => (
            <div
              key={item}
              className={`flex items-center px-2 py-1.5 rounded text-xs cursor-default ${
                i === 1
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DestructiveCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xs font-medium'>Destructive</CardTitle>
        <CardDescription className='text-[11px]'>
          Errors, warnings, and delete actions
        </CardDescription>
      </CardHeader>
      <CardContent className='px-3 pb-3 flex flex-col gap-2.5'>
        <div className='flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-2.5'>
          <AlertTriangle className='size-3.5 text-destructive mt-0.5 shrink-0' />
          <div className='flex flex-col gap-0.5'>
            <span className='text-xs font-medium text-destructive'>
              Action required
            </span>
            <span className='text-[11px] text-muted-foreground'>
              This cannot be undone.
            </span>
          </div>
        </div>
        <div
          className='flex items-center gap-2 rounded-md px-3 py-2'
          style={{
            backgroundColor: 'var(--destructive)',
            color: 'var(--destructive-foreground)',
          }}
        >
          <Trash2 className='size-3 shrink-0' />
          <span className='text-xs font-medium'>
            Delete item — destructive-foreground text
          </span>
        </div>
        <div className='flex gap-2 items-center'>
          <Button
            variant='destructive'
            size='sm'
            className='h-7 text-xs gap-1.5'
          >
            <Trash2 className='size-3' />
            Delete
          </Button>
          <Badge variant='destructive'>Error</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function MutedCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xs font-medium'>Muted</CardTitle>
        <CardDescription className='text-[11px]'>
          Subtitles, placeholders, and secondary content
        </CardDescription>
      </CardHeader>
      <CardContent className='px-3 pb-3 flex flex-col gap-2.5'>
        <div className='rounded-md bg-muted px-3 py-2'>
          <p className='text-[11px] text-muted-foreground'>
            Last synced 2 hours ago · 3 pending items
          </p>
        </div>
        <div className='flex flex-col gap-0.5'>
          <span className='text-xs font-medium text-foreground'>Workspace</span>
          <span className='text-[11px] text-muted-foreground'>
            Manage settings and preferences.
          </span>
        </div>
        <div className='flex gap-2'>
          <div className='h-2.5 w-20 rounded bg-muted' />
          <div className='h-2.5 w-14 rounded bg-muted' />
        </div>
      </CardContent>
    </Card>
  );
}

function PopoverCard() {
  const options = ['Edit', 'Duplicate', 'Archive', 'Delete'];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xs font-medium'>Popover</CardTitle>
        <CardDescription className='text-[11px]'>
          Dropdowns, menus, and floating panels
        </CardDescription>
      </CardHeader>
      <CardContent className='px-3 pb-3'>
        <div className='rounded-md border border-border bg-popover text-popover-foreground shadow-sm w-36 overflow-hidden'>
          {options.map((opt, i) => (
            <div key={opt}>
              <div
                className={`px-3 py-1.5 text-xs cursor-default hover:bg-accent hover:text-accent-foreground ${
                  opt === 'Delete' ? 'text-destructive' : ''
                }`}
              >
                {opt}
              </div>
              {i === 2 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const chartData = [
  { month: 'Jan', a: 42, b: 28, c: 35, d: 20, e: 15 },
  { month: 'Feb', a: 55, b: 38, c: 48, d: 30, e: 22 },
  { month: 'Mar', a: 36, b: 52, c: 29, d: 44, e: 31 },
  { month: 'Apr', a: 68, b: 33, c: 55, d: 25, e: 40 },
  { month: 'May', a: 49, b: 61, c: 42, d: 55, e: 28 },
];

const chartConfig = {
  a: { label: 'chart-1', color: 'var(--chart-1)' },
  b: { label: 'chart-2', color: 'var(--chart-2)' },
  c: { label: 'chart-3', color: 'var(--chart-3)' },
  d: { label: 'chart-4', color: 'var(--chart-4)' },
  e: { label: 'chart-5', color: 'var(--chart-5)' },
};

function ChartsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xs font-medium'>Charts</CardTitle>
        <CardDescription className='text-[11px]'>
          Data visualization — all 5 chart colors
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pb-3 flex flex-col gap-2'>
        <ChartContainer config={chartConfig} className='h-[120px] w-full'>
          <BarChart
            data={chartData}
            margin={{ top: 2, right: 2, bottom: 0, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              className='stroke-border/40'
              vertical={false}
            />
            <XAxis
              dataKey='month'
              tick={{ fontSize: 9 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey='a'
              fill='var(--chart-1)'
              radius={[2, 2, 0, 0]}
              maxBarSize={10}
            />
            <Bar
              dataKey='b'
              fill='var(--chart-2)'
              radius={[2, 2, 0, 0]}
              maxBarSize={10}
            />
            <Bar
              dataKey='c'
              fill='var(--chart-3)'
              radius={[2, 2, 0, 0]}
              maxBarSize={10}
            />
            <Bar
              dataKey='d'
              fill='var(--chart-4)'
              radius={[2, 2, 0, 0]}
              maxBarSize={10}
            />
            <Bar
              dataKey='e'
              fill='var(--chart-5)'
              radius={[2, 2, 0, 0]}
              maxBarSize={10}
            />
          </BarChart>
        </ChartContainer>
        <div className='flex flex-wrap gap-x-3 gap-y-1 px-1'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='flex items-center gap-1'>
              <div
                className='size-2 rounded-xs shrink-0'
                style={{ backgroundColor: `var(--chart-${i})` }}
              />
              <span className='text-[10px] text-muted-foreground'>
                chart-{i}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const sidebarItems = [
  { label: 'Home', active: false },
  { label: 'Analytics', active: true },
  { label: 'Messages', active: false },
  { label: 'Settings', active: false },
];

function SidebarCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xs font-medium'>Sidebar</CardTitle>
        <CardDescription className='text-[11px]'>
          Navigation panel background and states
        </CardDescription>
      </CardHeader>
      <CardContent className='px-3 pb-3'>
        <div
          className='rounded-md border border-border flex overflow-hidden'
          style={{ backgroundColor: 'var(--sidebar)' }}
        >
          <div className='w-28 flex flex-col gap-0.5 p-1.5'>
            <div className='px-2 py-1 mb-0.5'>
              <span
                className='text-[10px] font-semibold'
                style={{ color: 'var(--sidebar-foreground)' }}
              >
                Workspace
              </span>
            </div>
            {sidebarItems.map(({ label, active }) => (
              <div
                key={label}
                className='px-2 py-1.5 rounded text-[11px] cursor-default'
                style={{
                  backgroundColor: active
                    ? 'var(--sidebar-primary)'
                    : undefined,
                  color: active
                    ? 'var(--sidebar-primary-foreground)'
                    : 'var(--sidebar-foreground)',
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            className='flex-1 border-l p-2.5'
            style={{
              borderColor: 'var(--sidebar-border)',
              backgroundColor: 'var(--background)',
            }}
          >
            <span className='text-[11px] text-muted-foreground'>
              Content area
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function UtilityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xs font-medium'>Utility</CardTitle>
        <CardDescription className='text-[11px]'>
          Border, input border, and focus ring
        </CardDescription>
      </CardHeader>
      <CardContent className='px-3 pb-3 flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <span className='text-[11px] text-muted-foreground'>Border</span>
          <div className='rounded-md border border-border px-3 py-2'>
            <span className='text-xs text-muted-foreground'>
              Card with border
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-[11px] text-muted-foreground'>
            Input + Ring (focused)
          </span>
          <div
            className='flex h-8 w-full items-center rounded-md border px-3 text-xs'
            style={{
              borderColor: 'var(--input)',
              outline: '2px solid var(--ring)',
              outlineOffset: '1px',
            }}
          >
            <span className='text-foreground'>Focused input</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ColorsTab() {
  return (
    <div className='grid grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3 gap-4'>
      <AccentCard />
      <DestructiveCard />
      <MutedCard />
      <PopoverCard />
      <ChartsCard />
      <SidebarCard />
      <UtilityCard />
    </div>
  );
}
