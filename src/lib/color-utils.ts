import { parse, formatCss, converter, formatHex } from 'culori';

const toOklch = converter('oklch');

export function valueToOklch(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  try {
    const parsed = parse(trimmed);
    if (!parsed) return value;
    const ok = toOklch(parsed);
    if (!ok) return value;
    return formatCss(ok);
  } catch {
    return value;
  }
}

export function valueToHex(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '#000000';
  try {
    const parsed = parse(trimmed);
    if (!parsed) return '#000000';
    return formatHex(parsed) ?? '#000000';
  } catch {
    return '#000000';
  }
}
