'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { cn } from '@/lib/utils';
import { PreviewPortalContext } from '@/lib/preview-portal-context';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { PreviewSidebar } from './preview/sidebar';
import { PreviewDashboard } from './preview/dashboard';

const PREVIEW_SIDEBAR_BREAKPOINT = 640;

function PreviewOverlay() {
  const { open, setOpen, isMobile, openMobile, setOpenMobile } = useSidebar();
  const isOpen = isMobile ? openMobile : open;
  const close = () => (isMobile ? setOpenMobile(false) : setOpen(false));

  return (
    <div
      className={cn(
        '@sm/preview:hidden absolute inset-0 z-9',
        'bg-black/50 backdrop-blur-[2px]',
        'transition-opacity duration-200',
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      )}
      onClick={close}
    />
  );
}

export function PreviewPane() {
  const { light, dark, previewMode } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const wasNarrowRef = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const isNarrow = entry.contentRect.width < PREVIEW_SIDEBAR_BREAKPOINT;
      if (isNarrow && !wasNarrowRef.current) setSidebarOpen(false);
      if (!isNarrow && wasNarrowRef.current) setSidebarOpen(true);
      wasNarrowRef.current = isNarrow;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scopedStyle = useMemo(() => {
    const lightVars = Object.entries(light)
      .map(([k, v]) => `  --${k}: ${v.replace(/[<>]/g, '')};`)
      .join('\n');
    const darkVars = Object.entries(dark)
      .map(([k, v]) => `  --${k}: ${v.replace(/[<>]/g, '')};`)
      .join('\n');

    return `[data-preview] {\n${lightVars}\n}\n[data-preview].dark {\n${darkVars}\n}`;
  }, [light, dark]);

  return (
    <div
      ref={containerRef}
      className='flex flex-col flex-1 overflow-hidden border-r border-border'
    >
      <style dangerouslySetInnerHTML={{ __html: scopedStyle }} />

      <SidebarProvider
        ref={setPortalContainer}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        data-preview=''
        style={{ '--sidebar-width': '14rem' } as React.CSSProperties}
        className={cn(
          'flex-1 min-h-0 overflow-hidden relative @container/preview',
          previewMode === 'dark' && 'dark',
        )}
      >
        <PreviewPortalContext value={portalContainer}>
          <PreviewOverlay />
          <PreviewSidebar />
          <PreviewDashboard />
        </PreviewPortalContext>
      </SidebarProvider>
    </div>
  );
}
