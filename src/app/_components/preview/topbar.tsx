import { Bell, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function PreviewTopbar() {
  return (
    <div className='h-[52px] border-b border-border bg-background flex items-center px-6 gap-4'>
      <div className='flex-1'>
        <h1 className='text-sm font-semibold text-foreground'>Dashboard</h1>
        <p className='text-[11px] text-muted-foreground'>
          Overview / Analytics
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
          className='h-7 gap-1.5 text-xs text-foreground'
        >
          <Search className='size-3.5' />
          Search
        </Button>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant='ghost'
                size='sm'
                className='size-7 p-0 relative'
              />
            }
          >
            <Bell className='size-4' />
            <span className='absolute top-1 right-1 size-1.5 rounded-full bg-destructive' />
          </TooltipTrigger>
          <TooltipContent>3 notifications</TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant='ghost'
                size='sm'
                className='h-7 gap-1.5 text-xs'
              />
            }
          >
            <div className='size-5 rounded-full bg-primary flex items-center justify-center'>
              <span className='text-[9px] text-primary-foreground font-bold'>
                JD
              </span>
            </div>
            <ChevronDown className='size-3' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-44'>
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-xs'>
                John Doe
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-xs'>Profile</DropdownMenuItem>
              <DropdownMenuItem className='text-xs'>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-xs text-destructive'>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
