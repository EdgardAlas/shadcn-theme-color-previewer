'use client';

import { Sun, Moon, Monitor, SlidersHorizontal } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AppHeader() {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();

  return (
    <header className='h-10 shrink-0 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-background z-30'>
      <div className='flex items-center gap-2 lg:gap-3'>
        <span className='text-[13px] font-mono font-medium tracking-tight text-foreground'>
          Shadcn Theme Preview
        </span>
        <span className='text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5'>
          v1.0
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <p className='hidden sm:block text-[11px] font-mono text-muted-foreground'>
          Edit variables — see changes live
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant='ghost'
                size='sm'
                className='size-7 p-0 text-muted-foreground'
                aria-label='Toggle app theme'
              />
            }
          >
            <Sun className='size-3.5 dark:hidden' />
            <Moon className='size-3.5 hidden dark:block' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className='size-3.5' />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className='size-3.5' />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Monitor className='size-3.5' />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant='ghost'
          size='sm'
          onClick={toggleSidebar}
          className='size-7 p-0'
        >
          <SlidersHorizontal className='size-4' />
        </Button>
      </div>
    </header>
  );
}
