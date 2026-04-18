'use client';

import { LogOut, CircleUser, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { navItems } from './data';

export function PreviewSidebar({ open }: { open: boolean }) {
  return (
    <div
      className={cn(
        'absolute inset-y-0 left-0 z-20 w-56',
        'flex flex-col bg-sidebar text-sidebar-foreground',
        'border-r border-sidebar-border',
        'transition-transform duration-200 ease-linear',
        '@2xl/preview:shadow-none shadow-xl',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <SidebarHeader className='h-13 flex-row items-center border-b border-sidebar-border px-4 py-0 gap-2'>
        <div className='size-6 bg-sidebar-primary rounded-md flex items-center justify-center shrink-0'>
          <Layers className='size-3 text-sidebar-primary-foreground' />
        </div>
        <span className='text-sm font-semibold tracking-tight text-sidebar-foreground'>
          Dashboard
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className='p-2'>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.active}
                    className='text-[13px]'
                  >
                    <item.icon className='size-4' />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t border-sidebar-border p-2'>
        <div className='flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-sidebar-accent/60 cursor-pointer transition-colors'>
          <div className='size-6 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0'>
            <CircleUser className='size-4 text-sidebar-primary-foreground' />
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-[12px] font-medium truncate text-sidebar-foreground'>
              John Doe
            </p>
            <p className='text-[11px] text-sidebar-foreground/60 truncate'>
              Admin
            </p>
          </div>
          <LogOut className='size-3.5 text-sidebar-foreground/50' />
        </div>
      </SidebarFooter>
    </div>
  );
}
