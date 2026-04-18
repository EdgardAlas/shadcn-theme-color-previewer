'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { valueToOklch, valueToHex } from '@/lib/color-utils';
import useDebounceState from '@/hooks/use-debounce-state';
import type { ThemeVars } from '@/types/theme';

interface VariableInputProps {
  varKey: keyof ThemeVars;
  isRadius?: boolean;
  description?: string;
}

export function VariableInput({
  varKey,
  isRadius = false,
  description,
}: VariableInputProps) {
  const { light, dark, editMode, setVar } = useThemeStore();
  const vars = editMode === 'light' ? light : dark;
  const value = vars[varKey];
  const pickerRef = useRef<HTMLInputElement>(null);
  const isUserInteracting = useRef(false);

  const [localHex, debouncedHex, setLocalHex] = useDebounceState(
    valueToHex(value),
    80,
  );

  useEffect(() => {
    if (isRadius) return;
    setLocalHex(valueToHex(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isRadius]);

  useEffect(() => {
    if (isRadius) return;
    if (!isUserInteracting.current) return;
    isUserInteracting.current = false;
    setVar(editMode, varKey, valueToOklch(debouncedHex));
  }, [debouncedHex, editMode, varKey, setVar, isRadius]);

  function handlePickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    isUserInteracting.current = true;
    setLocalHex(e.target.value);
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVar(editMode, varKey, e.target.value);
  }

  return (
    <div className='flex items-center gap-2 px-3 py-[5px] hover:bg-muted/40 transition-colors'>
      {isRadius ? (
        <div
          className='size-4 flex-shrink-0 border border-border'
          style={{ borderRadius: value }}
        />
      ) : (
        <div className='relative size-4 flex-shrink-0 cursor-pointer'>
          <div
            className={cn(
              'size-4 border border-border rounded-[2px]',
              'hover:ring-2 hover:ring-ring hover:ring-offset-1 transition-shadow',
            )}
            style={{ backgroundColor: localHex }}
          />
          <input
            ref={pickerRef}
            type='color'
            value={localHex}
            onChange={handlePickerChange}
            className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'
            tabIndex={-1}
            aria-hidden='true'
          />
        </div>
      )}
      <div className='flex flex-col flex-1 min-w-0 gap-0.5'>
        <span className='font-mono text-[11px] text-muted-foreground truncate select-none'>
          {varKey}
        </span>
        <Input
          value={value}
          onChange={handleTextChange}
          className='h-5 sm:hidden text-[10px] font-mono px-1.5 w-full'
          spellCheck={false}
        />
      </div>
      <Input
        value={value}
        onChange={handleTextChange}
        className='h-5 w-[155px] text-[10px] font-mono px-1.5 flex-shrink-0 hidden sm:flex'
        spellCheck={false}
      />
    </div>
  );
}
