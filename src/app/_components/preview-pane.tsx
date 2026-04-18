'use client';

import { useMemo, useState } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { cn } from '@/lib/utils';
import { PreviewPortalContext } from '@/lib/preview-portal-context';
import { PreviewSidebar } from './preview/sidebar';
import { PreviewDashboard } from './preview/dashboard';

export function PreviewPane() {
  const { light, dark, previewMode } = useThemeStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

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
    <div className='flex flex-col flex-1 overflow-hidden border-r border-border'>
      <style dangerouslySetInnerHTML={{ __html: scopedStyle }} />

      <div
        ref={setPortalContainer}
        data-preview=''
        className={cn(
          'flex-1 min-h-0 overflow-hidden flex relative @container/preview',
          previewMode === 'dark' && 'dark',
        )}
      >
        <PreviewPortalContext value={portalContainer}>
          <div
            className={cn(
              '@2xl/preview:hidden absolute inset-0 z-9',
              'bg-black/50 backdrop-blur-[2px]',
              'transition-opacity duration-200',
              sidebarOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none',
            )}
            onClick={() => setSidebarOpen(false)}
          />
          <PreviewSidebar open={sidebarOpen} />
          <PreviewDashboard
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
          />
        </PreviewPortalContext>
      </div>
    </div>
  );
}
