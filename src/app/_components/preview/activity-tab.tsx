import { MoreHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { activityItems } from './data';

export function ActivityTab() {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-sm'>Recent Activity</CardTitle>
            <CardDescription className='text-xs'>
              Last 5 events in your workspace
            </CardDescription>
          </div>
          <Button variant='ghost' size='sm' className='size-7 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-0'>
          {activityItems.map(({ user, action, time }, i) => (
            <div
              key={i}
              className='flex items-start gap-3 py-2.5 border-b border-border last:border-0'
            >
              <div className='size-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5'>
                <span className='text-[9px] font-semibold text-muted-foreground'>
                  {user
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-xs text-foreground'>
                  <span className='font-medium'>{user}</span>{' '}
                  <span className='text-muted-foreground'>{action}</span>
                </p>
              </div>
              <span className='text-[11px] text-muted-foreground flex-shrink-0'>
                {time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
