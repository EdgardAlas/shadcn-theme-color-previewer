'use client';

import { useMemo } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/theme-store';
import { cn } from '@/lib/utils';
import { PreviewSidebar } from './preview/sidebar';
import { PreviewDashboard } from './preview/dashboard';

export function PreviewPane() {
  const { light, dark, previewMode, setPreviewMode } = useThemeStore();

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
      <div className='h-10 flex-shrink-0 flex items-center justify-between px-4 border-b border-border bg-background'>
        <span className='text-[11px] font-mono text-muted-foreground uppercase tracking-widest'>
          Preview
        </span>
        <div className='flex items-center gap-1 bg-muted rounded-md p-0.5'>
          <button
            onClick={() => setPreviewMode('light')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-all',
              previewMode === 'light'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Sun className='size-3' />
            Light
          </button>
          <button
            onClick={() => setPreviewMode('dark')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-all',
              previewMode === 'dark'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Moon className='size-3' />
            Dark
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: scopedStyle }} />

      <div
        data-preview=''
        className={cn(
          'flex-1 overflow-hidden flex',
          previewMode === 'dark' && 'dark',
        )}
      >
        <PreviewSidebar />
        <PreviewDashboard />
      </div>
    </div>
  );
}
