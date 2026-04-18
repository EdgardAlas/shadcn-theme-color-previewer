import { LogOut, CircleUser, Layers } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { navItems } from './data';

export function PreviewSidebar() {
  return (
    <SidebarProvider className='!min-h-0 h-full w-auto flex-shrink-0'>
      <Sidebar
        collapsible='none'
        className='h-full border-r border-sidebar-border'
      >
        <SidebarHeader className='h-[52px] flex-row items-center border-b border-sidebar-border px-4 py-0 gap-2'>
          <div className='size-6 bg-sidebar-primary rounded-md flex items-center justify-center flex-shrink-0'>
            <Layers className='size-3 text-sidebar-primary-foreground' />
          </div>
          <span className='text-sm font-semibold tracking-tight text-sidebar-foreground'>
            Dasboard
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
            <div className='size-6 rounded-full bg-sidebar-primary flex items-center justify-center flex-shrink-0'>
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
      </Sidebar>
    </SidebarProvider>
  );
}
