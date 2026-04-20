import type { ThemeVars } from '@/types/theme';

const THEME_KEYS = new Set<keyof ThemeVars>([
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
]);

function extractVarsFromBlock(block: string): Partial<ThemeVars> {
  const result: Partial<ThemeVars> = {};
  const re = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    const key = m[1].trim() as keyof ThemeVars;
    const value = m[2].trim();
    if (THEME_KEYS.has(key)) {
      result[key] = value;
    }
  }
  return result;
}

export function parseThemeCSS(css: string): {
  light: Partial<ThemeVars>;
  dark: Partial<ThemeVars>;
} {
  const rootMatch = css.match(/:root\s*\{([^}]*)\}/);
  const darkMatch = css.match(/\.dark\s*\{([^}]*)\}/);
  return {
    light: rootMatch ? extractVarsFromBlock(rootMatch[1]) : {},
    dark: darkMatch ? extractVarsFromBlock(darkMatch[1]) : {},
  };
}
