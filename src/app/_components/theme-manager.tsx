'use client';

import { useState } from 'react';
import { Trash2, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useThemeStore } from '@/store/theme-store';
import { cn } from '@/lib/utils';

export function ThemeManager() {
  const { savedThemes, saveTheme, loadTheme, deleteTheme, duplicateTheme } =
    useThemeStore();
  const [themeName, setThemeName] = useState('');

  function handleSave() {
    const name = themeName.trim();
    if (!name) return;
    saveTheme(name);
    setThemeName('');
  }

  function handleDuplicate(id: string, originalName: string) {
    duplicateTheme(id, `${originalName} Copy`);
  }

  return (
    <div className='flex flex-col gap-0'>
      <div className='px-3 py-2 flex items-center gap-2 border-b border-border'>
        <Input
          placeholder='Theme name'
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className='h-7 text-xs font-mono flex-1'
        />
        <Button
          size='sm'
          onClick={handleSave}
          disabled={!themeName.trim()}
          className='h-7 px-3 text-xs'
          data-umami-event="theme-saved"
        >
          Save
        </Button>
      </div>

      {savedThemes.length === 0 ? (
        <div className='px-3 h-10 flex items-center text-[11px] font-mono text-muted-foreground'>
          No saved themes
        </div>
      ) : (
        <div className='flex flex-col'>
          {savedThemes.map((theme) => (
            <div
              key={theme.id}
              className={cn(
                'flex items-center gap-2 px-3 py-2 border-b border-border last:border-0',
                'hover:bg-muted/40 transition-colors group',
              )}
            >
              <button
                onClick={() => loadTheme(theme.id)}
                className='flex-1 text-left text-xs font-mono truncate text-foreground hover:text-primary transition-colors'
                data-umami-event="theme-loaded"
              >
                {theme.name}
              </button>
              <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDuplicate(theme.id, theme.name)}
                        className='size-6 p-0'
                        data-umami-event="theme-duplicated"
                      />
                    }
                  >
                    <Copy className='size-3' />
                  </TooltipTrigger>
                  <TooltipContent side='top'>Duplicate</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => loadTheme(theme.id)}
                        className='size-6 p-0'
                        data-umami-event="theme-loaded"
                      />
                    }
                  >
                    <Download className='size-3' />
                  </TooltipTrigger>
                  <TooltipContent side='top'>Load theme</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => deleteTheme(theme.id)}
                        className='size-6 p-0 text-destructive hover:text-destructive'
                        data-umami-event="theme-deleted"
                      />
                    }
                  >
                    <Trash2 className='size-3' />
                  </TooltipTrigger>
                  <TooltipContent side='top'>Delete</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
