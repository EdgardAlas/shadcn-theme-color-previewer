'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useThemeStore } from '@/store/theme-store';
import { parseThemeCSS } from '@/lib/theme-import';
import { cn } from '@/lib/utils';

export function ImportCSSDialog() {
  const { importTheme } = useThemeStore();

  const [css, setCss] = useState('');
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result;
        if (typeof text === 'string') setCss(text);
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [],
  );

  function handleApply() {
    const parsed = parseThemeCSS(css);
    const lightCount = Object.keys(parsed.light).length;
    const darkCount = Object.keys(parsed.dark).length;
    if (lightCount === 0 && darkCount === 0) {
      setResult('No recognizable variables found.');
      return;
    }
    importTheme(parsed);
    setResult(`Applied ${lightCount} light + ${darkCount} dark variables.`);
  }

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) {
      setResult(null);
      setCss('');
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant='outline'
            size='sm'
            className='w-full h-8 text-xs font-mono gap-1.5'
            data-umami-event="css-import-opened"
          />
        }
      >
        <Upload className='size-3.5' />
        Import CSS
      </DialogTrigger>
      <DialogContent className='max-w-[calc(100vw-2rem)] sm:max-w-2xl w-full'>
        <DialogHeader>
          <DialogTitle className='font-mono text-sm'>
            Import CSS Variables
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          <p className='text-[11px] text-muted-foreground font-mono leading-relaxed'>
            Paste or upload a shadcn CSS file. Variables in{' '}
            <code>:root</code> map to light, <code>.dark</code> to dark.
          </p>
          <div className='flex gap-2'>
            <input
              ref={fileInputRef}
              type='file'
              accept='.css,text/css'
              onChange={handleFileUpload}
              className='hidden'
            />
            <Button
              variant='outline'
              size='sm'
              className='h-7 text-xs font-mono gap-1.5'
              onClick={() => fileInputRef.current?.click()}
              data-umami-event="css-file-uploaded"
            >
              <Upload className='size-3' />
              Upload file
            </Button>
          </div>
          <textarea
            value={css}
            onChange={(e) => {
              setCss(e.target.value);
              setResult(null);
            }}
            placeholder={`:root {
  --background: oklch(1 0 0);
  --primary: oklch(0.205 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  /* ... */
}`}
            className='h-52 w-full rounded-md border border-border bg-muted/40 p-3 text-[11px] font-mono leading-relaxed resize-none outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/50'
          />
          {result && (
            <p
              className={cn(
                'text-[11px] font-mono',
                result.startsWith('No')
                  ? 'text-destructive'
                  : 'text-chart-2',
              )}
            >
              {result}
            </p>
          )}
        </div>
        <DialogFooter showCloseButton>
          <Button
            onClick={handleApply}
            size='sm'
            className='h-8 text-xs font-mono gap-1.5'
            disabled={!css.trim()}
            data-umami-event="css-imported"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
