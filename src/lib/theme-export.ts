import type { ThemeVars } from '@/types/theme';
import { valueToOklch } from './color-utils';

const THEME_BLOCK = `@theme inline {
\t--color-background: var(--background);
\t--color-foreground: var(--foreground);
\t--font-sans: var(--font-sans);
\t--font-mono: var(--font-geist-mono);
\t--color-sidebar-ring: var(--sidebar-ring);
\t--color-sidebar-border: var(--sidebar-border);
\t--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
\t--color-sidebar-accent: var(--sidebar-accent);
\t--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
\t--color-sidebar-primary: var(--sidebar-primary);
\t--color-sidebar-foreground: var(--sidebar-foreground);
\t--color-sidebar: var(--sidebar);
\t--color-chart-5: var(--chart-5);
\t--color-chart-4: var(--chart-4);
\t--color-chart-3: var(--chart-3);
\t--color-chart-2: var(--chart-2);
\t--color-chart-1: var(--chart-1);
\t--color-ring: var(--ring);
\t--color-input: var(--input);
\t--color-border: var(--border);
\t--color-destructive: var(--destructive);
\t--color-accent-foreground: var(--accent-foreground);
\t--color-accent: var(--accent);
\t--color-muted-foreground: var(--muted-foreground);
\t--color-muted: var(--muted);
\t--color-secondary-foreground: var(--secondary-foreground);
\t--color-secondary: var(--secondary);
\t--color-primary-foreground: var(--primary-foreground);
\t--color-primary: var(--primary);
\t--color-popover-foreground: var(--popover-foreground);
\t--color-popover: var(--popover);
\t--color-card-foreground: var(--card-foreground);
\t--color-card: var(--card);
\t--radius-sm: calc(var(--radius) * 0.6);
\t--radius-md: calc(var(--radius) * 0.8);
\t--radius-lg: var(--radius);
\t--radius-xl: calc(var(--radius) * 1.4);
\t--radius-2xl: calc(var(--radius) * 1.8);
\t--radius-3xl: calc(var(--radius) * 2.2);
\t--radius-4xl: calc(var(--radius) * 2.6);
}`;

const LIGHT_VAR_ORDER: (keyof ThemeVars)[] = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
  'radius',
  'sidebar',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
];

function sanitizeValue(value: string): string {
  return value.replace(/[<>]/g, '');
}

function toExportValue(key: keyof ThemeVars, value: string): string {
  const safe = sanitizeValue(value);
  if (key === 'radius') return safe;
  return valueToOklch(safe);
}

function buildVarBlock(
  selector: string,
  vars: ThemeVars,
  keys: (keyof ThemeVars)[],
): string {
  const lines = keys.map((k) => `\t--${k}: ${toExportValue(k, vars[k])};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}

export function generateCSS(light: ThemeVars, dark: ThemeVars): string {
  const lightBlock = buildVarBlock(':root', light, LIGHT_VAR_ORDER);
  const darkBlock = buildVarBlock(
    '.dark',
    dark,
    LIGHT_VAR_ORDER.filter((k) => k !== 'radius'),
  );
  return [THEME_BLOCK, '', lightBlock, '', darkBlock].join('\n');
}
