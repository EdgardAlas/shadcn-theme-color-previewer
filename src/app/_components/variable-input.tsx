'use client';

import { useRef } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { valueToOklch, valueToHex } from '@/lib/color-utils';
import type { ThemeVars } from '@/types/theme';

interface VariableInputProps {
  varKey: keyof ThemeVars;
  isRadius?: boolean;
}

export function VariableInput({
  varKey,
  isRadius = false,
}: VariableInputProps) {
  const { light, dark, editMode, setVar } = useThemeStore();
  const vars = editMode === 'light' ? light : dark;
  const value = vars[varKey];
  const pickerRef = useRef<HTMLInputElement>(null);

  function handlePickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVar(editMode, varKey, valueToOklch(e.target.value));
  }

  return (
    <div className='flex items-center gap-2 px-3 py-[5px] hover:bg-muted/40 transition-colors'>
      {isRadius ? (
        <div
          className='size-4 flex-shrink-0 border border-border'
          style={{ borderRadius: value }}
        />
      ) : (
        <>
          <input
            ref={pickerRef}
            type='color'
            value={valueToHex(value)}
            onChange={handlePickerChange}
            className='sr-only'
            tabIndex={-1}
            aria-hidden='true'
          />
          <button
            type='button'
            onClick={() => pickerRef.current?.click()}
            className={cn(
              'size-4 flex-shrink-0 border border-border rounded-[2px] cursor-pointer',
              'hover:ring-2 hover:ring-ring hover:ring-offset-1 transition-shadow',
            )}
            style={{ backgroundColor: value }}
            title='Click to pick color'
          />
        </>
      )}
      <span className='font-mono text-[11px] text-muted-foreground flex-1 min-w-0 truncate select-none'>
        --{varKey}
      </span>
      <Input
        value={value}
        onChange={(e) => setVar(editMode, varKey, e.target.value)}
        className='h-6 w-[190px] text-[11px] font-mono px-2 flex-shrink-0'
        spellCheck={false}
      />
    </div>
  );
}
