import {
  ChevronDown,
  BarChart2,
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  Info,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Moon,
  Wifi,
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
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { buildStatuses } from './data';

export function ComponentsTab() {
  return (
    <div className='grid grid-cols-1 @2xl:grid-cols-2 gap-4'>
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Interactive Elements</CardTitle>
          <CardDescription className='text-xs'>
            Buttons, overlays, controls, and selects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-wrap gap-1.5'>
              <Button size='sm' className='text-xs h-7'>
                Primary
              </Button>
              <Button variant='secondary' size='sm' className='text-xs h-7'>
                Secondary
              </Button>
              <Button variant='outline' size='sm' className='text-xs h-7'>
                Outline
              </Button>
              <Button variant='ghost' size='sm' className='text-xs h-7'>
                Ghost
              </Button>
              <Button variant='destructive' size='sm' className='text-xs h-7'>
                Danger
              </Button>
            </div>

            <div className='flex flex-wrap gap-1.5'>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-xs h-7 gap-1'
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
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-xs h-7'
                    />
                  }
                >
                  Popover
                </PopoverTrigger>
                <PopoverContent className='w-52 p-3'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-xs font-medium'>Project Alpha</p>
                    <p className='text-[11px] text-muted-foreground'>
                      Last updated 2 hours ago. 4 contributors active.
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
                      className='text-xs h-7'
                    />
                  }
                >
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The record will be
                      permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-3'>
              <div className='flex flex-col gap-2.5'>
                {[
                  { icon: Bell, label: 'Notifications', defaultChecked: true },
                  { icon: Moon, label: 'Dark mode', defaultChecked: false },
                  { icon: Wifi, label: 'Auto-sync', defaultChecked: true },
                ].map(({ icon: Icon, label, defaultChecked }) => (
                  <div
                    key={label}
                    className='flex items-center justify-between gap-2'
                  >
                    <div className='flex items-center gap-1.5'>
                      <Icon className='size-3 text-muted-foreground' />
                      <Label className='text-[11px] font-normal cursor-pointer'>
                        {label}
                      </Label>
                    </div>
                    <Switch
                      defaultChecked={defaultChecked}
                      className='scale-75 origin-right'
                    />
                  </div>
                ))}
              </div>

              <div className='flex flex-col gap-2.5'>
                {[
                  { id: 'cb-1', label: 'Email alerts', checked: true },
                  { id: 'cb-2', label: 'SMS alerts', checked: false },
                  { id: 'cb-3', label: 'Push alerts', checked: true },
                ].map(({ id, label, checked }) => (
                  <div key={id} className='flex items-center gap-2'>
                    <Checkbox
                      id={id}
                      defaultChecked={checked}
                      className='size-3.5'
                    />
                    <Label
                      htmlFor={id}
                      className='text-[11px] font-normal cursor-pointer'
                    >
                      {label}
                    </Label>
                  </div>
                ))}
                <Select defaultValue='member'>
                  <SelectTrigger className='h-7 text-[11px] mt-0.5'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='admin' className='text-xs'>
                        Admin
                      </SelectItem>
                      <SelectItem value='member' className='text-xs'>
                        Member
                      </SelectItem>
                      <SelectItem value='viewer' className='text-xs'>
                        Viewer
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Loading States</CardTitle>
          <CardDescription className='text-xs'>
            Skeleton placeholders while content loads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <Skeleton className='size-9 rounded-full shrink-0' />
              <div className='flex flex-col gap-1.5 flex-1'>
                <Skeleton className='h-3 w-3/4 rounded' />
                <Skeleton className='h-2.5 w-1/2 rounded' />
              </div>
            </div>
            <div className='flex flex-col gap-1.5'>
              <Skeleton className='h-3 w-full rounded' />
              <Skeleton className='h-3 w-5/6 rounded' />
              <Skeleton className='h-3 w-4/6 rounded' />
            </div>
            <Skeleton className='h-16 w-full rounded-md' />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Input Variants</CardTitle>
          <CardDescription className='text-xs'>
            Form control states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2.5'>
            <Input className='h-8 text-xs' placeholder='Default input' />
            <Input
              className='h-8 text-xs'
              placeholder='Disabled input'
              disabled
            />
            <Input
              className='h-8 text-xs'
              placeholder='Invalid input'
              aria-invalid
              defaultValue='bad@value'
            />
            <Textarea
              className='text-xs min-h-14 resize-none'
              placeholder='Textarea field...'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm'>Notifications</CardTitle>
          <CardDescription className='text-xs'>
            Alert variants for feedback and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2.5'>
            <Alert>
              <Info className='size-4' />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                Your session will expire in 30 minutes.
              </AlertDescription>
            </Alert>
            <Alert className='border-chart-2/30 bg-chart-2/10 text-chart-2 *:data-[slot=alert-description]:text-chart-2/80'>
              <CheckCircle2 className='size-4' />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Changes saved and deployed successfully.
              </AlertDescription>
            </Alert>
            <Alert variant='destructive'>
              <AlertTriangle className='size-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to connect. Check your credentials.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
