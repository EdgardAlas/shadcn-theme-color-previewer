import { parse, converter, formatHex } from 'culori';

const toOklch = converter('oklch');

export function valueToOklch(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  try {
    const parsed = parse(trimmed);
    if (!parsed) return value;
    const ok = toOklch(parsed);
    if (!ok) return value;
    const l = +ok.l.toFixed(4);
    const c = +ok.c.toFixed(4);
    const h = ok.h !== undefined ? +ok.h.toFixed(4) : 0;
    const alpha =
      ok.alpha !== undefined && ok.alpha < 1
        ? ` / ${+ok.alpha.toFixed(4)}`
        : '';
    return `oklch(${l} ${c} ${h}${alpha})`;
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
