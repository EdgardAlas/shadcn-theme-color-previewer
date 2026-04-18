'use client';

import { SlidersHorizontal } from 'lucide-react';
import { PreviewPane } from './_components/preview-pane';
import { ConfigPane } from './_components/config-pane';
import { SidebarProvider, Sidebar, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

function ConfigPaneTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleSidebar}
      className='size-7 p-0'
    >
      <SlidersHorizontal className='size-4' />
    </Button>
  );
}

export default function Home() {
  return (
    <SidebarProvider
      className='flex-col h-screen! min-h-0! overflow-hidden'
      style={{ '--sidebar-width': '380px' } as React.CSSProperties}
    >
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
          <ConfigPaneTrigger />
        </div>
      </header>

      <div className='flex flex-1 overflow-hidden min-h-0'>
        <PreviewPane />
        <Sidebar
          side='right'
          collapsible='offcanvas'
          className='top-10! h-[calc(100svh-2.5rem)]! border-l border-border'
        >
          <ConfigPane className='h-full w-full border-l-0' />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
