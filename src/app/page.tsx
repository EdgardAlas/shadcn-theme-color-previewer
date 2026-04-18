import type { Metadata } from 'next';
import { PreviewPane } from './_components/preview-pane';
import { ConfigPane } from './_components/config-pane';
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar';
import { AppHeader } from './_components/app-header';

export const metadata: Metadata = {
  title: 'Shadcn Theme Preview',
  description:
    'Visually customize shadcn/ui CSS variables and export your theme.',
  openGraph: {
    title: 'Shadcn Theme Preview',
    description:
      'Visually customize shadcn/ui CSS variables and export your theme.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <SidebarProvider
      className='flex-col h-screen! min-h-0! overflow-hidden bg-background'
      style={{ '--sidebar-width': '380px' } as React.CSSProperties}
    >
      <AppHeader />

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
