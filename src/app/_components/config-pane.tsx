'use client';

import { useState, useRef, useCallback } from 'react';
import { ClipboardCopy, RotateCcw, Check, Eye, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useThemeStore } from '@/store/theme-store';
import { VariableInput } from './variable-input';
import { ThemeManager } from './theme-manager';
import { generateCSS } from '@/lib/theme-export';
import { parseThemeCSS } from '@/lib/theme-import';
import { cn } from '@/lib/utils';
import type { ThemeVars } from '@/types/theme';

type VarGroup = {
  label: string;
  vars: { key: keyof ThemeVars; isRadius?: boolean }[];
};

const VAR_GROUPS: VarGroup[] = [
  {
    label: 'Base',
    vars: [
      { key: 'background' },
      { key: 'foreground' },
      { key: 'border' },
      { key: 'input' },
      { key: 'ring' },
    ],
  },
  {
    label: 'Card',
    vars: [{ key: 'card' }, { key: 'card-foreground' }],
  },
  {
    label: 'Popover',
    vars: [{ key: 'popover' }, { key: 'popover-foreground' }],
  },
  {
    label: 'Primary',
    vars: [{ key: 'primary' }, { key: 'primary-foreground' }],
  },
  {
    label: 'Secondary',
    vars: [{ key: 'secondary' }, { key: 'secondary-foreground' }],
  },
  {
    label: 'Muted',
    vars: [{ key: 'muted' }, { key: 'muted-foreground' }],
  },
  {
    label: 'Accent',
    vars: [{ key: 'accent' }, { key: 'accent-foreground' }],
  },
  {
    label: 'Destructive',
    vars: [{ key: 'destructive' }, { key: 'destructive-foreground' }],
  },
  {
    label: 'Charts',
    vars: [
      { key: 'chart-1' },
      { key: 'chart-2' },
      { key: 'chart-3' },
      { key: 'chart-4' },
      { key: 'chart-5' },
    ],
  },
  {
    label: 'Radius',
    vars: [{ key: 'radius', isRadius: true }],
  },
  {
    label: 'Sidebar',
    vars: [
      { key: 'sidebar' },
      { key: 'sidebar-foreground' },
      { key: 'sidebar-primary' },
      { key: 'sidebar-primary-foreground' },
      { key: 'sidebar-accent' },
      { key: 'sidebar-accent-foreground' },
      { key: 'sidebar-border' },
      { key: 'sidebar-ring' },
    ],
  },
];

export function ConfigPane({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();
  const {
    light,
    dark,
    editMode,
    setEditMode,
    setPreviewMode,
    resetToDefaults,
    importTheme,
  } = useThemeStore();
  const [copied, setCopied] = useState(false);
  const [copiedInDialog, setCopiedInDialog] = useState(false);
  const [importCss, setImportCss] = useState('');
  const [importOpen, setImportOpen] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result;
        if (typeof text === 'string') setImportCss(text);
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [],
  );

  function handleApplyImport() {
    const parsed = parseThemeCSS(importCss);
    const lightCount = Object.keys(parsed.light).length;
    const darkCount = Object.keys(parsed.dark).length;
    if (lightCount === 0 && darkCount === 0) {
      setImportResult('No recognizable variables found.');
      return;
    }
    importTheme(parsed);
    setImportResult(
      `Applied ${lightCount} light + ${darkCount} dark variables.`,
    );
  }

  function handleCopy() {
    const css = generateCSS(light, dark);
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleCopyInDialog() {
    const css = generateCSS(light, dark);
    navigator.clipboard.writeText(css).then(() => {
      setCopiedInDialog(true);
      setTimeout(() => setCopiedInDialog(false), 2000);
    });
  }

  return (
    <div
      className={cn(
        'w-[380px] flex-shrink-0 flex flex-col overflow-hidden border-l border-border bg-background',
        className,
      )}
    >
      <div className='h-10 flex-shrink-0 flex items-center justify-between px-3 border-b border-border'>
        <span className='text-[11px] font-mono text-muted-foreground uppercase tracking-widest'>
          Variables
        </span>
        <div className='flex items-center gap-1'>
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleSidebar}
            className='md:hidden size-7 p-0 text-muted-foreground'
          >
            <X className='size-3.5' />
          </Button>
          <div className='flex items-center gap-0.5 bg-muted rounded-md p-0.5'>
            <button
              onClick={() => {
                setEditMode('light');
                setPreviewMode('light');
              }}
              className={`px-2.5 py-0.5 rounded text-[11px] transition-all ${
                editMode === 'light'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => {
                setEditMode('dark');
                setPreviewMode('dark');
              }}
              className={`px-2.5 py-0.5 rounded text-[11px] transition-all ${
                editMode === 'dark'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dark
            </button>
          </div>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={resetToDefaults}
                  className='size-7 p-0 text-muted-foreground'
                />
              }
            >
              <RotateCcw className='size-3.5' />
            </TooltipTrigger>
            <TooltipContent side='bottom'>Reset to defaults</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <ScrollArea className='flex-1 min-h-0'>
        <div className='flex flex-col'>
          <div>
            <div className='px-3 py-1.5 bg-muted/50 border-y border-border text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground'>
              Themes
            </div>
            <ThemeManager />
          </div>

          <div>
            <div className='px-3 py-1.5 bg-muted/50 border-y border-border text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground'>
              Export
            </div>
            <div className='p-3 flex flex-col gap-2'>
              <Dialog
                open={importOpen}
                onOpenChange={(v) => {
                  setImportOpen(v);
                  if (!v) {
                    setImportResult(null);
                    setImportCss('');
                  }
                }}
              >
                <DialogTrigger
                  render={
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full h-8 text-xs font-mono gap-1.5'
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
                      <code>:root</code> map to light, <code>.dark</code> to
                      dark.
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
                      >
                        <Upload className='size-3' />
                        Upload file
                      </Button>
                    </div>
                    <textarea
                      value={importCss}
                      onChange={(e) => {
                        setImportCss(e.target.value);
                        setImportResult(null);
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
                    {importResult && (
                      <p
                        className={cn(
                          'text-[11px] font-mono',
                          importResult.startsWith('No')
                            ? 'text-destructive'
                            : 'text-chart-2',
                        )}
                      >
                        {importResult}
                      </p>
                    )}
                  </div>
                  <DialogFooter showCloseButton>
                    <Button
                      onClick={handleApplyImport}
                      size='sm'
                      className='h-8 text-xs font-mono gap-1.5'
                      disabled={!importCss.trim()}
                    >
                      Apply
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className='flex gap-2'>
                <Button
                  onClick={handleCopy}
                  variant='outline'
                  size='sm'
                  className='flex-1 h-8 text-xs font-mono gap-1.5'
                >
                  {copied ? (
                    <>
                      <Check className='size-3.5 text-chart-2' />
                      Copied!
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className='size-3.5' />
                      Copy CSS
                    </>
                  )}
                </Button>

                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 text-xs font-mono gap-1.5'
                      />
                    }
                  >
                    <Eye className='size-3.5' />
                    Preview
                  </DialogTrigger>
                  <DialogContent className='max-w-[calc(100vw-2rem)] sm:max-w-3xl w-full'>
                    <DialogHeader>
                      <DialogTitle className='font-mono text-sm'>
                        CSS Output
                      </DialogTitle>
                    </DialogHeader>
                    <div className='h-[60vh] overflow-auto rounded-md border border-border bg-muted/40'>
                      <pre className='p-4 text-[11px] font-mono leading-relaxed text-foreground whitespace-pre'>
                        {generateCSS(light, dark)}
                      </pre>
                    </div>
                    <DialogFooter showCloseButton>
                      <Button
                        onClick={handleCopyInDialog}
                        variant='outline'
                        size='sm'
                        className='h-8 text-xs font-mono gap-1.5'
                      >
                        {copiedInDialog ? (
                          <>
                            <Check className='size-3.5 text-chart-2' />
                            Copied!
                          </>
                        ) : (
                          <>
                            <ClipboardCopy className='size-3.5' />
                            Copy to clipboard
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <p className='text-[10px] text-muted-foreground font-mono leading-relaxed'>
                Outputs @theme inline block, :root vars, and .dark vars in OKLCH
                format
              </p>
            </div>
          </div>

          {VAR_GROUPS.map((group) => (
            <div key={group.label}>
              <div className='px-3 py-1.5 bg-muted/50 border-y border-border text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground'>
                {group.label}
              </div>
              <div className='flex flex-col'>
                {group.vars.map(({ key, isRadius }) => (
                  <VariableInput key={key} varKey={key} isRadius={isRadius} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='h-8' />
      </ScrollArea>
    </div>
  );
}
