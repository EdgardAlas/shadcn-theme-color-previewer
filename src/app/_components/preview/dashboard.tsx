import { TrendingUp, Users, Activity, TicketCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { PreviewTopbar } from './topbar';
import { StatCard } from './stat-card';
import { PreviewCharts } from './charts';
import { FormTab } from './form-tab';
import { ComponentsTab } from './components-tab';
import { ActivityTab } from './activity-tab';
import { ColorsTab } from './colors-tab';

const statCards = [
  {
    title: 'Revenue',
    value: '$48,295',
    delta: '+12.4%',
    positive: true,
    icon: TrendingUp,
  },
  {
    title: 'Active Users',
    value: '2,891',
    delta: '+8.2%',
    positive: true,
    icon: Users,
  },
  {
    title: 'Conversion',
    value: '3.6%',
    delta: '-0.4%',
    positive: false,
    icon: Activity,
  },
  {
    title: 'Open Tickets',
    value: '142',
    delta: '+23 today',
    positive: false,
    icon: TicketCheck,
  },
];

export function PreviewDashboard({
  onToggleSidebar,
  sidebarOpen,
}: {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}) {
  return (
    <div
      className={cn(
        'flex-1 overflow-auto bg-background text-foreground @container',
        'transition-[margin-left] duration-200 ease-linear',
        sidebarOpen ? '@2xl/preview:ml-56' : 'ml-0',
      )}
    >
      <PreviewTopbar onToggleSidebar={onToggleSidebar} />

      <div className='p-3 @xl:p-5 @3xl:p-6 flex flex-col gap-3 @xl:gap-4 @3xl:gap-6'>
        <div className='grid grid-cols-2 @3xl:grid-cols-4 gap-3'>
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <PreviewCharts />

        <Tabs defaultValue='form'>
          <TabsList className='h-8'>
            <TabsTrigger value='form' className='text-xs h-7'>
              Form
            </TabsTrigger>
            <TabsTrigger value='components' className='text-xs h-7'>
              Components
            </TabsTrigger>
            <TabsTrigger value='data' className='text-xs h-7'>
              Data
            </TabsTrigger>
            <TabsTrigger value='colors' className='text-xs h-7'>
              Colors
            </TabsTrigger>
          </TabsList>
          <TabsContent value='form' className='mt-4'>
            <FormTab />
          </TabsContent>
          <TabsContent value='components' className='mt-4'>
            <ComponentsTab />
          </TabsContent>
          <TabsContent value='data' className='mt-4'>
            <ActivityTab />
          </TabsContent>
          <TabsContent value='colors' className='mt-4'>
            <ColorsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
