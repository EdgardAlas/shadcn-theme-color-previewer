import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export function StatCard({
  title,
  value,
  delta,
  positive,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
            {title}
          </CardTitle>
          <Icon className='size-4 text-muted-foreground' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold text-foreground'>{value}</div>
        <div className='flex items-center gap-1 mt-1'>
          {positive ? (
            <TrendingUp className='size-3 text-chart-2' />
          ) : (
            <TrendingDown className='size-3 text-destructive' />
          )}
          <span
            className={cn(
              'text-[11px] font-medium',
              positive ? 'text-chart-2' : 'text-destructive',
            )}
          >
            {delta}
          </span>
          <span className='text-[11px] text-muted-foreground'>
            vs last period
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
