'use client';

import { useState } from 'react';
import {
  ClipboardCopy,
  RotateCcw,
  Check,
  Eye,
  X,
  Search,
} from 'lucide-react';import { Button } from '@/components/ui/button';
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useThemeStore } from '@/store/theme-store';
import { VariableInput } from './variable-input';
import { ThemeManager } from './theme-manager';
import { ImportCSSDialog } from './import-css-dialog';
import { generateCSS } from '@/lib/theme-export';
import { cn } from '@/lib/utils';
import { VAR_GROUPS } from './var-groups';

export function ConfigPane({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();
  const {
    light,
    dark,
    editMode,
    setEditMode,
    setPreviewMode,
    resetToDefaults,
  } = useThemeStore();
  const [copied, setCopied] = useState(false);
  const [copiedInDialog, setCopiedInDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function handleCopyCSS(setFlag: (v: boolean) => void) {
    navigator.clipboard.writeText(generateCSS(light, dark)).then(() => {
      setFlag(true);
      setTimeout(() => setFlag(false), 2000);
    });
  }

  function handleCopy() {
    handleCopyCSS(setCopied);
  }

  function handleCopyInDialog() {
    handleCopyCSS(setCopiedInDialog);
  }

  const searchLower = searchQuery.trim().toLowerCase();
  const filteredGroups = searchLower
    ? VAR_GROUPS.map((group) => ({
        ...group,
        vars: group.vars.filter(({ key }) =>
          key.toLowerCase().includes(searchLower),
        ),
      })).filter((group) => group.vars.length > 0)
    : VAR_GROUPS;

  return (
    <div
      className={cn(
        'w-[380px] flex-shrink-0 flex flex-col overflow-hidden border-l border-border bg-background',
        className,
      )}
    >
      <div className='h-14 flex-shrink-0 flex items-center justify-between px-3 border-b border-border'>
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
              data-umami-event="edit-mode-switched"
              data-umami-event-mode="light"
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
              data-umami-event="edit-mode-switched"
              data-umami-event-mode="dark"
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
                  data-umami-event="variables-reset"
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

      <div className='px-2.5 py-1.5 border-b border-border'>
        <InputGroup className='h-7'>
          <InputGroupInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search variables...'
            className='text-[11px] font-mono'
          />
          <InputGroupAddon align='inline-start'>
            <Search className='size-3.5' />
          </InputGroupAddon>
          {searchQuery && (
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                onClick={() => setSearchQuery('')}
                aria-label='Clear search'
              >
                <X className='size-3' />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
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
              <ImportCSSDialog />
              <div className='flex gap-2'>
                <Button
                  onClick={handleCopy}
                  variant='outline'
                  size='sm'
                  className='flex-1 h-8 text-xs font-mono gap-1.5'
                  data-umami-event="css-copied"
                  data-umami-event-source="toolbar"
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
                        data-umami-event="css-preview-opened"
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
                        data-umami-event="css-copied"
                        data-umami-event-source="dialog"
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

          {filteredGroups.map((group) => (
            <div key={group.label}>
              <div className='px-3 py-1.5 bg-muted/50 border-y border-border text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground'>
                {group.label}
              </div>
              <div className='flex flex-col'>
                {group.vars.map(({ key, isRadius, description }) => (
                  <VariableInput
                    key={key}
                    varKey={key}
                    isRadius={isRadius}
                    description={description}
                  />
                ))}
              </div>
            </div>
          ))}
          {searchQuery.trim() && filteredGroups.length === 0 && (
            <div className='px-3 py-8 text-center text-[11px] font-mono text-muted-foreground'>
              No variables match &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>

        <div className='px-3 py-4 text-[10px] font-mono text-muted-foreground/60 text-center leading-relaxed'>
          This site uses anonymous analytics (no cookies, no personal data).
        </div>
      </ScrollArea>
    </div>
  );
}
