import {
  ChevronDown,
  BarChart2,
  FileText,
  LayoutDashboard,
  Users,
  Settings,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { buildStatuses } from './data';

export function ComponentsTab() {
  return (
    <div className='grid grid-cols-1 @2xl:grid-cols-2 gap-4'>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Interactive Elements</CardTitle>
          <CardDescription className='text-xs'>
            Overlays, menus, and dialogs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-xs h-8 gap-1'
                  />
                }
              >
                Actions
                <ChevronDown className='size-3' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-40'>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className='text-xs'>
                    Operations
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-xs'>
                    Edit record
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-xs'>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-xs'>
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-xs text-destructive'>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger
                render={
                  <Button variant='outline' size='sm' className='text-xs h-8' />
                }
              >
                Info
              </PopoverTrigger>
              <PopoverContent className='w-56 p-3'>
                <div className='flex flex-col gap-1'>
                  <p className='text-xs font-medium'>Project Alpha</p>
                  <p className='text-[11px] text-muted-foreground'>
                    Last updated 2 hours ago. 4 contributors active this week.
                  </p>
                </div>
              </PopoverContent>
            </Popover>

            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    variant='destructive'
                    size='sm'
                    className='text-xs h-8'
                  />
                }
              >
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The record will be permanently
                    removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant='secondary' size='sm' className='text-xs h-8'>
              Secondary
            </Button>
            <Button variant='ghost' size='sm' className='text-xs h-8'>
              Ghost
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Status Indicators</CardTitle>
          <CardDescription className='text-xs'>
            Badges, labels, and states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-wrap gap-1.5'>
              <Badge>Default</Badge>
              <Badge variant='secondary'>Secondary</Badge>
              <Badge variant='outline'>Outline</Badge>
              <Badge variant='destructive'>Destructive</Badge>
            </div>
            <div className='flex flex-wrap gap-1.5'>
              {(['⌘K', '⌃P', '⌥T', '⇧⌘P'] as const).map((key) => (
                <span
                  key={key}
                  className='inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-mono bg-accent text-accent-foreground border border-border'
                >
                  {key}
                </span>
              ))}
            </div>
            <Separator />
            <div className='flex flex-col gap-2'>
              {buildStatuses.map(({ label, status, color }) => (
                <div key={label} className='flex items-center justify-between'>
                  <span className='text-xs text-foreground'>{label}</span>
                  <div className='flex items-center gap-1.5'>
                    <span
                      className={cn('size-1.5 rounded-full bg-current', color)}
                    />
                    <span className={cn('text-[11px] font-medium', color)}>
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Selection & Highlight</CardTitle>
          <CardDescription className='text-xs'>
            Accent token in navigation and list items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-1'>
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: BarChart2, label: 'Analytics', active: false },
              { icon: FileText, label: 'Reports', active: false },
              { icon: Users, label: 'Users', active: false },
              { icon: Settings, label: 'Settings', active: false },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors',
                  active
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                )}
              >
                <Icon className='size-3.5 shrink-0' />
                {label}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
