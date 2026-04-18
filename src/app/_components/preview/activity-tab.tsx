import { MoreHorizontal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { activityItems, teamMembers } from './data';

const rows = teamMembers.map((member, i) => ({
  ...member,
  action: activityItems[i]?.action ?? '—',
  time: activityItems[i]?.time ?? '—',
}));

export function ActivityTab() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-sm'>Team Activity</CardTitle>
            <CardDescription className='text-xs'>
              Members and their latest actions
            </CardDescription>
          </div>
          <Button variant='ghost' size='sm' className='size-7 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-[10px] pl-4 pr-2'>Member</TableHead>
              <TableHead className='text-[10px] px-2'>Role</TableHead>
              <TableHead className='text-[10px] px-2'>Last Action</TableHead>
              <TableHead className='text-[10px] px-2'>When</TableHead>
              <TableHead className='text-[10px] px-2 pr-4'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ name, role, status, initials, action, time }) => (
              <TableRow key={name}>
                <TableCell className='pl-4 pr-2 py-2.5'>
                  <div className='flex items-center gap-2'>
                    <div className='size-6 rounded-full bg-primary flex items-center justify-center shrink-0'>
                      <span className='text-[9px] text-primary-foreground font-semibold'>
                        {initials}
                      </span>
                    </div>
                    <span className='text-xs font-medium text-foreground'>
                      {name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className='text-xs text-muted-foreground px-2 py-2.5'>
                  {role}
                </TableCell>
                <TableCell className='text-xs text-muted-foreground px-2 py-2.5 max-w-[180px] truncate'>
                  {action}
                </TableCell>
                <TableCell className='text-[11px] text-muted-foreground px-2 py-2.5 whitespace-nowrap'>
                  {time}
                </TableCell>
                <TableCell className='px-2 pr-4 py-2.5'>
                  <Badge
                    variant={status === 'active' ? 'secondary' : 'outline'}
                    className='text-[10px] h-4 font-normal'
                  >
                    {status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
